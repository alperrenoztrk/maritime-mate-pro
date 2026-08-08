/**
 * Play Billing sunucu yapılandırması doğrulama kapısı.
 *
 * Abonelik akışının tamamı iki sunucu sırrına bağlıdır ve ikisi de repoda
 * DEĞİLDİR (Supabase Secrets'ta yaşarlar). Eksiklerse kod kusursuz çalışsa
 * bile sonuç şudur: kullanıcı ödeme yapar, Pro açılmaz.
 *
 *  - GOOGLE_PLAY_SERVICE_ACCOUNT_JSON → yoksa `verify-purchase` 503 döner,
 *    satın alma hiç doğrulanamaz. (Google onaylanmayan satın almayı 3 gün
 *    içinde iade eder, yani para geri gider — ama kullanıcı Pro alamaz.)
 *  - PLAY_RTDN_SECRET → yoksa/yanlışsa `play-rtdn` her bildirimi 401 ile
 *    reddeder; yenileme, iptal, ödeme sorunu ve iade olayları entitlement
 *    tablosuna hiç işlenmez. Erişim, süresi dolmuş abonelikte bile
 *    kullanıcı uygulamayı açana kadar açık kalır.
 *
 * Bu iki sırrı dışarıdan yalnızca uçlara istek atarak doğrulayabiliriz;
 * script tam olarak bunu yapar.
 *
 * Kullanım:
 *   SUPABASE_URL=https://<proje>.supabase.co \
 *   SUPABASE_PUBLISHABLE_KEY=sb_publishable_... \
 *   SUPABASE_ACCESS_TOKEN=<oturum açmış bir kullanıcının access_token'ı> \
 *   PLAY_RTDN_SECRET=<Play Console push URL'sindeki secret> \
 *   node scripts/check-play-billing-config.mjs
 *
 * SUPABASE_ACCESS_TOKEN nereden alınır: uygulamada giriş yapın, tarayıcı
 * konsolunda `JSON.parse(localStorage.getItem(Object.keys(localStorage)
 * .find(k => k.endsWith("-auth-token")))).access_token` çalıştırın.
 *
 * PLAY_RTDN_SECRET verilmezse o kontrol atlanır (hata sayılmaz).
 */

const url = (process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "").replace(/\/+$/, "");
const publishableKey =
  process.env.SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY || "";
const accessToken = process.env.SUPABASE_ACCESS_TOKEN || "";
const rtdnSecret = process.env.PLAY_RTDN_SECRET || "";

const failures = [];
const skipped = [];

function ok(msg) {
  console.log(`  ✅ ${msg}`);
}
function fail(msg, remedy) {
  console.log(`  ❌ ${msg}`);
  failures.push({ msg, remedy });
}
function skip(msg) {
  console.log(`  ⏭️  ${msg}`);
  skipped.push(msg);
}

if (!url || !publishableKey) {
  console.error(
    "SUPABASE_URL ve SUPABASE_PUBLISHABLE_KEY zorunludur.\n" +
      "Kullanım için dosyanın başındaki açıklamaya bakın.",
  );
  process.exit(2);
}

/** GOOGLE_PLAY_SERVICE_ACCOUNT_JSON kurulu mu? verify-purchase'ın sağlık ucu. */
async function checkPlayApi() {
  console.log("\n▸ verify-purchase → Google Play Developer API kimlik bilgisi");

  if (!accessToken) {
    skip("SUPABASE_ACCESS_TOKEN verilmedi; uç kimlik doğrulaması istiyor, kontrol atlandı.");
    return;
  }

  let resp;
  try {
    resp = await fetch(`${url}/functions/v1/verify-purchase`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: publishableKey,
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ test: true }),
    });
  } catch (e) {
    fail(`Uca ulaşılamadı: ${e.message}`, "Fonksiyon dağıtıldı mı? `supabase functions deploy verify-purchase`");
    return;
  }

  if (resp.status === 401) {
    fail(
      "401 — SUPABASE_ACCESS_TOKEN geçersiz veya süresi dolmuş.",
      "Uygulamada yeniden giriş yapıp token'ı tazeleyin.",
    );
    return;
  }
  if (resp.status === 404) {
    fail("404 — verify-purchase dağıtılmamış.", "`supabase functions deploy verify-purchase`");
    return;
  }
  if (!resp.ok) {
    fail(`Beklenmeyen HTTP ${resp.status}.`, "Fonksiyon loglarına bakın: `supabase functions logs verify-purchase`");
    return;
  }

  const body = await resp.json().catch(() => ({}));
  if (body.status === "configured") {
    ok("GOOGLE_PLAY_SERVICE_ACCOUNT_JSON kurulu; satın almalar doğrulanabilir.");
  } else {
    fail(
      "GOOGLE_PLAY_SERVICE_ACCOUNT_JSON TANIMLI DEĞİL — satın alma doğrulanamaz, Pro açılmaz.",
      "Play Console'a bağlı servis hesabının JSON anahtarının TAMAMINI ekleyin:\n" +
        "     supabase secrets set GOOGLE_PLAY_SERVICE_ACCOUNT_JSON=\"$(cat service-account.json)\"",
    );
  }
}

/** PLAY_RTDN_SECRET doğru mu? Play'in gönderdiği test bildirimini taklit eder. */
async function checkRtdnSecret() {
  console.log("\n▸ play-rtdn → Gerçek Zamanlı Geliştirici Bildirimleri sırrı");

  if (!rtdnSecret) {
    skip("PLAY_RTDN_SECRET verilmedi; kontrol atlandı.");
    return;
  }

  // Play Console'un "Send test notification" düğmesiyle aynı gövde: fonksiyon
  // bunu erkenden 200 ile karşılar, yan etkisi yoktur.
  const payload = Buffer.from(
    JSON.stringify({ version: "1.0", packageName: "com.marinersbook.app", testNotification: { version: "1.0" } }),
  ).toString("base64");

  let resp;
  try {
    resp = await fetch(`${url}/functions/v1/play-rtdn?secret=${encodeURIComponent(rtdnSecret)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: { data: payload }, subscription: "config-check" }),
    });
  } catch (e) {
    fail(`Uca ulaşılamadı: ${e.message}`, "`supabase functions deploy play-rtdn`");
    return;
  }

  if (resp.status === 401) {
    fail(
      "401 — PLAY_RTDN_SECRET sunucuda tanımlı değil ya da verdiğinizden farklı.",
      "Sırrı kurun ve Play Console'daki push URL'siyle BİREBİR aynı olduğundan emin olun:\n" +
        "     supabase secrets set PLAY_RTDN_SECRET=<sır>\n" +
        "     Push URL: " + `${url}/functions/v1/play-rtdn?secret=<sır>`,
    );
    return;
  }
  if (resp.status === 404) {
    fail("404 — play-rtdn dağıtılmamış.", "`supabase functions deploy play-rtdn --no-verify-jwt`");
    return;
  }
  if (resp.ok) {
    ok("PLAY_RTDN_SECRET eşleşiyor; yenileme/iptal/iade bildirimleri işlenebilir.");
    return;
  }
  fail(`Beklenmeyen HTTP ${resp.status}.`, "`supabase functions logs play-rtdn`");
}

console.log("Play Billing sunucu yapılandırması kontrol ediliyor…");
console.log(`Proje: ${url}`);

await checkPlayApi();
await checkRtdnSecret();

console.log("\n" + "─".repeat(64));

// Hiçbir kontrol çalışmadıysa yeşil dönmek yalan olur: "doğrulandı" ile
// "doğrulanmadı" aynı çıktıyı vermemeli.
if (failures.length === 0 && skipped.length === 2) {
  console.log("⚠️  Hiçbir kontrol çalıştırılamadı — hiçbir şey doğrulanmadı.");
  console.log("   SUPABASE_ACCESS_TOKEN ve/veya PLAY_RTDN_SECRET verin.");
  process.exit(2);
}

if (failures.length === 0) {
  const suffix = skipped.length ? ` (${skipped.length} kontrol atlandı)` : "";
  console.log(`✅ Çalıştırılan kontrollerin tamamı geçti${suffix}.`);
  process.exit(0);
}

console.log(`❌ ${failures.length} sorun bulundu:\n`);
for (const { msg, remedy } of failures) {
  console.log(`  • ${msg}`);
  console.log(`     → ${remedy}\n`);
}
console.log("Bunlar giderilmeden abonelik akışı canlıda ÇALIŞMAZ.");
process.exit(1);
