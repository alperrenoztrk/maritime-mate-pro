import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Crown, Check, RefreshCw, ExternalLink, WifiOff, Infinity as InfinityIcon, LogIn, Lock } from "lucide-react";
import { toast } from "sonner";
import { MobileLayout } from "@/components/MobileLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuthContext";
import { useEntitlement } from "@/contexts/useEntitlement";
import {
  fetchProOffers,
  isBillingAvailable,
  isUserCanceled,
  BillingPendingError,
  BillingNotConfiguredError,
  type ProOffers,
} from "@/services/billing";
import { getPlaySubscriptionManagementUrl, PRODUCT_IDS, type ProPlan } from "@/config/products";
import { getTermsOfUseUrl } from "@/config/legal";
import { useLanguage } from "@/contexts/useLanguage";

/**
 * Pro paywall sayfası (/pro).
 *
 * Model: ücretsiz indirme + freemium. Ana teklif YILLIK aboneliktir;
 * aylık abonelik ve ömür boyu satın alma yanında sunulur. Fiyatlar Google
 * Play'den canlı okunur (bölgesel fiyatlandırma), uygulamada sabit fiyat yok.
 */

const PRO_FEATURES = [
  "Tüm kitaplar ve profesyonel içerikler",
  "Gelişmiş hesaplamalar ve simülasyonlar",
  "Tüm quizler ve sınav hazırlık modülleri",
  "3D gemi sistemleri",
  "Yapay zekâ asistanında yüksek aylık kota",
];

const FREE_FEATURES = [
  "Denizcilik sözlüğü",
  "Temel COLREG ve emniyet içeriği",
  "Seçili kitaplar ve temel hesaplayıcılar",
  "Haberler ve hava durumu",
  "Sınırlı quiz ve AI kotası",
];

interface PlanCardData {
  plan: ProPlan;
  title: string;
  period: string;
  highlight: boolean;
  note?: string;
}

const PLAN_CARDS: PlanCardData[] = [
  { plan: "yearly", title: "Pro Yıllık", period: "/ yıl", highlight: true, note: "En avantajlı" },
  { plan: "monthly", title: "Pro Aylık", period: "/ ay", highlight: false },
  { plan: "lifetime", title: "Ömür Boyu", period: "tek ödeme", highlight: false, note: "Sınırsız AI hariç" },
];

const ProPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const gatedFeature = useMemo(() => searchParams.get("feature"), [searchParams]);
  const { user } = useAuth();
  const { tier, hasProAccess, fromCache, lastSyncedAt, purchase, restore, refresh } = useEntitlement();
  const { currentLanguage } = useLanguage();

  const [billingReady, setBillingReady] = useState<boolean | null>(null);
  const [offers, setOffers] = useState<ProOffers | null>(null);
  const [busyPlan, setBusyPlan] = useState<ProPlan | null>(null);
  const [restoring, setRestoring] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const available = await isBillingAvailable();
      if (!mounted) return;
      setBillingReady(available);
      if (available) {
        try {
          const loaded = await fetchProOffers();
          if (mounted) setOffers(loaded);
        } catch {
          if (mounted) toast.error("Fiyat bilgileri yüklenemedi. Lütfen tekrar deneyin.");
        }
      }
    })();
    return () => { mounted = false; };
  }, []);

  const priceFor = (plan: ProPlan): string | null => {
    if (!offers) return null;
    if (plan === "lifetime") return offers.lifetime?.formattedPrice ?? null;
    const product = plan === "yearly" ? offers.yearly : offers.monthly;
    const phases = product?.offers?.[0]?.pricingPhases;
    return phases && phases.length > 0 ? phases[phases.length - 1].formattedPrice : null;
  };

  const handlePurchase = async (plan: ProPlan) => {
    if (!user) {
      navigate("/auth?next=/pro");
      return;
    }
    setBusyPlan(plan);
    try {
      const newTier = await purchase(plan);
      if (newTier === "pro" || newTier === "lifetime") {
        toast.success("Pro erişiminiz açıldı. İyi seyirler! ⚓");
      } else {
        toast.error("Satın alma doğrulanamadı. Lütfen 'Satın almaları geri yükle'yi deneyin.");
      }
    } catch (e) {
      if (isUserCanceled(e)) {
        // kullanıcı vazgeçti; sessiz geç
      } else if (e instanceof BillingPendingError) {
        toast.info(e.message);
      } else if (e instanceof BillingNotConfiguredError) {
        // Sunucu yapılandırma hatası: "tekrar deneyin" demek yanıltıcı olur.
        toast.error(e.message, { duration: 10_000 });
      } else {
        toast.error("Satın alma tamamlanamadı. Lütfen tekrar deneyin.");
      }
    } finally {
      setBusyPlan(null);
    }
  };

  const handleRestore = async () => {
    if (!user) {
      navigate("/auth?next=/pro");
      return;
    }
    setRestoring(true);
    try {
      const newTier = await restore();
      if (newTier === "pro" || newTier === "lifetime") {
        toast.success("Satın almalarınız geri yüklendi.");
      } else {
        toast.info("Bu Google hesabında geri yüklenecek satın alma bulunamadı.");
      }
    } catch {
      toast.error("Geri yükleme başarısız oldu. İnternet bağlantınızı kontrol edin.");
    } finally {
      setRestoring(false);
    }
  };

  return (
    <MobileLayout>
      <div className="min-h-screen p-4">
        <div className="max-w-4xl mx-auto space-y-6">

          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-3">
              <Crown className="h-10 w-10 text-amber-400" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                <span data-translatable>Mariner's Book Pro</span>
              </h1>
            </div>
            <p className="text-muted-foreground text-sm">
              <span data-translatable>
                Tüm kitaplar, gelişmiş hesaplamalar ve yapay zekâ asistanı ile denizcilik bilgin hep yanında — gemide çevrimdışıyken bile.
              </span>
            </p>
          </div>

          {fromCache && (
            <Card className="border-amber-500/40 bg-amber-500/10">
              <CardContent className="flex items-center gap-3 py-3 text-sm">
                <WifiOff className="w-4 h-4 shrink-0 text-amber-400" />
                <span data-translatable>
                  Çevrimdışı mod: Pro durumunuz son eşitlemeden hatırlanıyor. Bağlantı kurulunca otomatik güncellenir.
                </span>
              </CardContent>
            </Card>
          )}

          {gatedFeature && !hasProAccess && (
            <Card className="border-amber-400/40 bg-amber-500/10">
              <CardContent className="flex items-center gap-3 py-3 text-sm">
                <Lock className="w-4 h-4 shrink-0 text-amber-400" />
                <span data-translatable>{`${gatedFeature} Pro paketine dahildir. Erişim için bir plan seçin.`}</span>
              </CardContent>
            </Card>
          )}



          {hasProAccess ? (
            <Card className="border-emerald-500/40 bg-emerald-500/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-400">
                  {tier === "lifetime" ? <InfinityIcon className="w-5 h-5" /> : <Crown className="w-5 h-5" />}
                  <span data-translatable>{tier === "lifetime" ? "Ömür Boyu erişiminiz etkin" : "Pro aboneliğiniz etkin"}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {lastSyncedAt && (
                  <p className="text-muted-foreground">
                    <span data-translatable>Son eşitleme</span>: {new Date(lastSyncedAt).toLocaleString()}
                  </p>
                )}
                {tier === "pro" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={() => window.open(getPlaySubscriptionManagementUrl(PRODUCT_IDS.yearly), "_blank")}
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span data-translatable>Aboneliği Google Play'de yönet</span>
                  </Button>
                )}
                <Button variant="ghost" size="sm" className="gap-2" onClick={() => void refresh()}>
                  <RefreshCw className="w-4 h-4" />
                  <span data-translatable>Durumu yenile</span>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              {billingReady === false && (
                <Card className="border-blue-500/40 bg-blue-500/10">
                  <CardContent className="py-3 text-sm">
                    <span data-translatable>
                      Satın alma yalnızca Google Play'den indirilen Android uygulamasında yapılabilir.
                    </span>
                  </CardContent>
                </Card>
              )}

              <div className="grid gap-4 md:grid-cols-3">
                {PLAN_CARDS.map(({ plan, title, period, highlight, note }) => {
                  const price = priceFor(plan);
                  return (
                    <Card
                      key={plan}
                      className={highlight
                        ? "relative border-amber-400/70 shadow-lg shadow-amber-500/10 md:-translate-y-1"
                        : "relative border-border/60"}
                    >
                      {note && (
                        <Badge
                          className={`absolute -top-2.5 left-1/2 -translate-x-1/2 ${highlight ? "bg-amber-500 text-black" : "bg-muted text-muted-foreground"}`}
                        >
                          <span data-translatable>{note}</span>
                        </Badge>
                      )}
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg text-center">
                          <span data-translatable>{title}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4 text-center">
                        <div className="min-h-12">
                          {price ? (
                            <div className="text-2xl font-bold">
                              {price}
                              <span className="text-sm font-normal text-muted-foreground"> <span data-translatable>{period}</span></span>
                            </div>
                          ) : (
                            <div className="text-sm text-muted-foreground">
                              <span data-translatable>{billingReady ? "Fiyat yükleniyor…" : "Fiyat Google Play'de"}</span>
                            </div>
                          )}
                        </div>
                        <Button
                          className={`w-full gap-2 ${highlight ? "bg-amber-500 text-black hover:bg-amber-400" : ""}`}
                          variant={highlight ? "default" : "outline"}
                          disabled={billingReady !== true || busyPlan !== null}
                          onClick={() => void handlePurchase(plan)}
                        >
                          {busyPlan === plan ? (
                            <RefreshCw className="w-4 h-4 animate-spin" />
                          ) : !user ? (
                            <LogIn className="w-4 h-4" />
                          ) : (
                            <Crown className="w-4 h-4" />
                          )}
                          <span data-translatable>{!user ? "Giriş yap ve satın al" : "Satın al"}</span>
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Crown className="w-4 h-4 text-amber-400" />
                      <span data-translatable>Pro ile gelenler</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      {PRO_FEATURES.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <Check className="w-4 h-4 mt-0.5 shrink-0 text-emerald-400" />
                          <span data-translatable>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">
                      <span data-translatable>Ücretsiz pakette her zaman</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      {FREE_FEATURES.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <Check className="w-4 h-4 mt-0.5 shrink-0 text-blue-400" />
                          <span data-translatable>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center">
                <Button variant="ghost" size="sm" className="gap-2" disabled={restoring} onClick={() => void handleRestore()}>
                  <RefreshCw className={`w-4 h-4 ${restoring ? "animate-spin" : ""}`} />
                  <span data-translatable>Satın almaları geri yükle</span>
                </Button>
                {/* Play, abonelik satın alma ekranında koşulların tam metnine
                    bağlantı verilmesini bekliyor; özet burada, tamamı şartlarda. */}
                <p className="text-xs text-muted-foreground mt-2 max-w-xl mx-auto">
                  <span data-translatable>
                    Ödemeler Google Play hesabınızdan alınır. Abonelikler dönem sonunda otomatik yenilenir; dilediğiniz zaman Google Play &gt; Abonelikler bölümünden iptal edebilirsiniz. Ömür boyu paket tek seferlik ödemedir ve sınırsız yapay zekâ kotası içermez.
                  </span>{" "}
                  <span data-translatable>İadeler Google Play iade politikasına tabidir. Koşulların tamamı için bkz.</span>{" "}
                  <a
                    href={getTermsOfUseUrl(currentLanguage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-4"
                  >
                    <span data-translatable>Terms of Use</span>
                  </a>
                  .
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </MobileLayout>
  );
};

export default ProPage;
