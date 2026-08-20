// Google Play Developer API istemcisi (satın alma doğrulama).
//
// Servis hesabı anahtarıyla (GOOGLE_PLAY_SERVICE_ACCOUNT_JSON) OAuth2 erişim
// jetonu üretir ve androidpublisher v3 uçlarını çağırır. Harici bağımlılık
// kullanılmaz; JWT imzası Deno WebCrypto (RS256) ile atılır.
//
// Gerekli ortam değişkenleri:
//  - GOOGLE_PLAY_SERVICE_ACCOUNT_JSON: Play Console'a bağlı servis hesabının
//    JSON anahtarının tamamı (client_email + private_key alanları kullanılır).
//  - GOOGLE_PLAY_PACKAGE_NAME: uygulama paketi (varsayılan com.marinersbook.app).

const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const SCOPE = 'https://www.googleapis.com/auth/androidpublisher';
const API_BASE = 'https://androidpublisher.googleapis.com/androidpublisher/v3/applications';

export function getPackageName(): string {
  return Deno.env.get('GOOGLE_PLAY_PACKAGE_NAME') || 'com.marinersbook.app';
}

interface ServiceAccount {
  client_email: string;
  private_key: string;
}

function getServiceAccount(): ServiceAccount | null {
  const raw = Deno.env.get('GOOGLE_PLAY_SERVICE_ACCOUNT_JSON');
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed.client_email === 'string' && typeof parsed.private_key === 'string') {
      return { client_email: parsed.client_email, private_key: parsed.private_key };
    }
  } catch {
    // aşağıda null döner; çağıran taraf NOT_CONFIGURED üretir
  }
  return null;
}

export function isPlayApiConfigured(): boolean {
  return getServiceAccount() !== null;
}

function base64UrlEncode(data: Uint8Array | string): string {
  const bytes = typeof data === 'string' ? new TextEncoder().encode(data) : data;
  let binary = '';
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function pemToArrayBuffer(pem: string): ArrayBuffer {
  const body = pem
    .replace(/-----BEGIN PRIVATE KEY-----/, '')
    .replace(/-----END PRIVATE KEY-----/, '')
    .replace(/\s+/g, '');
  const binary = atob(body);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

// Basit süreç içi jeton önbelleği: erişim jetonu ~1 saat geçerli.
let cachedToken: { token: string; expiresAt: number } | null = null;

export async function getAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) {
    return cachedToken.token;
  }

  const sa = getServiceAccount();
  if (!sa) throw new Error('GOOGLE_PLAY_SERVICE_ACCOUNT_JSON is not configured');

  const now = Math.floor(Date.now() / 1000);
  const header = base64UrlEncode(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = base64UrlEncode(JSON.stringify({
    iss: sa.client_email,
    scope: SCOPE,
    aud: TOKEN_URL,
    iat: now,
    exp: now + 3600,
  }));
  const signingInput = `${header}.${claims}`;

  const key = await crypto.subtle.importKey(
    'pkcs8',
    pemToArrayBuffer(sa.private_key),
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    key,
    new TextEncoder().encode(signingInput),
  );
  const jwt = `${signingInput}.${base64UrlEncode(new Uint8Array(signature))}`;

  const resp = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });
  if (!resp.ok) {
    throw new Error(`Google OAuth token request failed: ${resp.status}`);
  }
  const data = await resp.json();
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + (data.expires_in ?? 3600) * 1000,
  };
  return cachedToken.token;
}

async function playApiFetch(path: string, init?: RequestInit): Promise<Response> {
  const token = await getAccessToken();
  return fetch(`${API_BASE}/${getPackageName()}${path}`, {
    ...init,
    headers: {
      ...(init?.headers ?? {}),
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
}

// --- Abonelik doğrulama (subscriptionsv2) ---

export type SubscriptionState =
  | 'SUBSCRIPTION_STATE_ACTIVE'
  | 'SUBSCRIPTION_STATE_IN_GRACE_PERIOD'
  | 'SUBSCRIPTION_STATE_ON_HOLD'
  | 'SUBSCRIPTION_STATE_PAUSED'
  | 'SUBSCRIPTION_STATE_CANCELED'
  | 'SUBSCRIPTION_STATE_EXPIRED'
  | string;

export interface VerifiedSubscription {
  kind: 'subscription';
  productId: string;
  state: SubscriptionState;
  expiresAt: string | null;      // ISO
  autoRenewing: boolean;
  acknowledged: boolean;
  orderId: string | null;
  obfuscatedAccountId: string | null;
  raw: Record<string, unknown>;
}

export async function verifySubscription(purchaseToken: string): Promise<VerifiedSubscription | null> {
  const resp = await playApiFetch(`/purchases/subscriptionsv2/tokens/${encodeURIComponent(purchaseToken)}`);
  if (resp.status === 404 || resp.status === 410) return null; // token invalid/unknown
  if (!resp.ok) throw new Error(`subscriptionsv2.get failed: ${resp.status}`);
  const data = await resp.json();

  const lineItem = Array.isArray(data.lineItems) && data.lineItems.length > 0
    ? data.lineItems[data.lineItems.length - 1]
    : null;

  return {
    kind: 'subscription',
    productId: lineItem?.productId ?? '',
    state: data.subscriptionState ?? 'SUBSCRIPTION_STATE_EXPIRED',
    expiresAt: lineItem?.expiryTime ?? null,
    autoRenewing: lineItem?.autoRenewingPlan?.autoRenewEnabled === true,
    acknowledged: data.acknowledgementState === 'ACKNOWLEDGEMENT_STATE_ACKNOWLEDGED',
    orderId: data.latestOrderId ?? null,
    obfuscatedAccountId: data.externalAccountIdentifiers?.obfuscatedExternalAccountId ?? null,
    raw: {
      subscriptionState: data.subscriptionState,
      latestOrderId: data.latestOrderId,
      startTime: data.startTime,
      lineItems: data.lineItems,
      acknowledgementState: data.acknowledgementState,
    },
  };
}

// Onaylama v1 ucundadır (subscriptionsv2'de acknowledge yok).
export async function acknowledgeSubscription(productId: string, purchaseToken: string): Promise<void> {
  const resp = await playApiFetch(
    `/purchases/subscriptions/${encodeURIComponent(productId)}/tokens/${encodeURIComponent(purchaseToken)}:acknowledge`,
    { method: 'POST', body: JSON.stringify({}) },
  );
  // 400 "already acknowledged" yarışı zararsızdır; diğer hataları yükselt.
  if (!resp.ok && resp.status !== 400) {
    throw new Error(`subscriptions.acknowledge failed: ${resp.status}`);
  }
}

// --- Tek seferlik ürün doğrulama (ömür boyu) ---

export interface VerifiedProduct {
  kind: 'product';
  productId: string;
  purchaseState: number;         // 0 purchased, 1 cancelled, 2 pending
  acknowledged: boolean;
  orderId: string | null;
  obfuscatedAccountId: string | null;
  raw: Record<string, unknown>;
}

export async function verifyProduct(productId: string, purchaseToken: string): Promise<VerifiedProduct | null> {
  const resp = await playApiFetch(
    `/purchases/products/${encodeURIComponent(productId)}/tokens/${encodeURIComponent(purchaseToken)}`,
  );
  if (resp.status === 404 || resp.status === 410) return null;
  if (!resp.ok) throw new Error(`purchases.products.get failed: ${resp.status}`);
  const data = await resp.json();

  return {
    kind: 'product',
    productId,
    purchaseState: typeof data.purchaseState === 'number' ? data.purchaseState : 1,
    acknowledged: data.acknowledgementState === 1,
    orderId: data.orderId ?? null,
    obfuscatedAccountId: data.obfuscatedExternalAccountId ?? null,
    raw: {
      purchaseState: data.purchaseState,
      acknowledgementState: data.acknowledgementState,
      orderId: data.orderId,
      purchaseTimeMillis: data.purchaseTimeMillis,
    },
  };
}

export async function acknowledgeProduct(productId: string, purchaseToken: string): Promise<void> {
  const resp = await playApiFetch(
    `/purchases/products/${encodeURIComponent(productId)}/tokens/${encodeURIComponent(purchaseToken)}:acknowledge`,
    { method: 'POST', body: JSON.stringify({}) },
  );
  if (!resp.ok && resp.status !== 400) {
    throw new Error(`products.acknowledge failed: ${resp.status}`);
  }
}
