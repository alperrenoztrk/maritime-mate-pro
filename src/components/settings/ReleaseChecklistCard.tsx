import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Smartphone, ShieldCheck, FileText, CheckCircle2, Circle, Copy, Rocket } from "lucide-react";
import { toast } from "sonner";
import {
  APP_NAME,
  APP_VERSION,
  BUILD_NUMBER,
  PACKAGE_ID,
  MIN_SDK,
  TARGET_SDK,
} from "@/lib/appVersion";

type Permission = {
  name: string;
  purpose: string;
  used: boolean;
};

const permissions: Permission[] = [
  { name: "INTERNET", purpose: "Haberler, AI ve hava durumu içerikleri", used: true },
  { name: "ACCESS_NETWORK_STATE", purpose: "Çevrimdışı durum tespiti", used: true },
  { name: "VIBRATE", purpose: "Haptik geri bildirim (Haptics plugin)", used: true },
  { name: "POST_NOTIFICATIONS", purpose: "Push bildirimleri (Android 13+)", used: true },
  { name: "CAMERA", purpose: "Kullanılmıyor", used: false },
  { name: "ACCESS_FINE_LOCATION", purpose: "Kullanılmıyor", used: false },
  { name: "READ_CONTACTS", purpose: "Kullanılmıyor", used: false },
];

type ChecklistItem = { label: string; done: boolean };

const releaseChecklist: ChecklistItem[] = [
  { label: "Capacitor Android platformu eklenmiş", done: true },
  { label: "Uygulama ikonu ve splash ekranı yapılandırılmış", done: true },
  { label: "Benzersiz applicationId tanımlı", done: true },
  { label: "Release keystore yapılandırması (capacitor.config)", done: false },
  { label: "ProGuard / R8 minify ayarları", done: false },
  { label: "Yayınlanmış Privacy Policy URL", done: false },
  { label: "Play Store ekran görüntüleri (telefon + tablet)", done: false },
  { label: "İçerik derecelendirmesi (IARC) formu", done: false },
  { label: "Data Safety formu (Play Console)", done: false },
];

const privacyTextTr = `${APP_NAME} – Gizlilik Özeti

Topladığımız veriler:
• Hesap bilgileri: e-posta adresi ve ad (yalnızca giriş yapan kullanıcılar için).
• Kullanım analitiği: Toplanmaz.
• Konum, kişiler, fotoğraf, mikrofon: Toplanmaz.

Üçüncü taraf servisler:
• Lovable Cloud (Supabase) – kimlik doğrulama, içerik depolama.
• Lovable AI Gateway – soru/cevap özellikleri için (kullanıcı içeriği geçici olarak işlenir, saklanmaz).

Güvenlik:
• Tüm veri aktarımı HTTPS üzerinden şifrelenir.
• Veritabanı erişimi Row Level Security (RLS) ile sınırlandırılmıştır.

Veri silme:
• Kullanıcı uygulama içinden hesabını silebilir veya destek e-postası ile talep gönderebilir.

Yaş sınırı: 13+`;

const privacyTextEn = `${APP_NAME} – Privacy Summary

Data we collect:
• Account info: email and name (only for signed-in users).
• Usage analytics: none.
• Location, contacts, photos, microphone: none.

Third-party services:
• Lovable Cloud (Supabase) – authentication and content storage.
• Lovable AI Gateway – Q&A features (user content processed transiently, not stored).

Security:
• All traffic is encrypted via HTTPS.
• Database access is restricted via Row Level Security (RLS).

Data deletion:
• Users can delete their account in-app or request deletion via support email.

Age rating: 13+`;

export const ReleaseChecklistCard = () => {
  const handleCopy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} kopyalandı`);
    } catch {
      toast.error("Kopyalama başarısız");
    }
  };

  return (
    <Card className="shadow-lg dark:bg-gray-800 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Rocket className="w-5 h-5 text-primary" />
          <span data-translatable>Google Play Yayın Kontrol Listesi</span>
        </CardTitle>
        <CardDescription>
          <span data-translatable>
            Android sürümü mağazaya hazırlamak için gerekli bilgiler ve kontroller
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Version & Build */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Smartphone className="w-4 h-4 text-primary" />
            <span data-translatable>Sürüm Bilgileri</span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <InfoRow label="Uygulama" value={APP_NAME} />
            <InfoRow label="Versiyon" value={APP_VERSION} />
            <InfoRow label="Build" value={String(BUILD_NUMBER)} />
            <InfoRow label="Min SDK" value={String(MIN_SDK)} />
            <InfoRow label="Target SDK" value={String(TARGET_SDK)} />
            <InfoRow label="Package" value={PACKAGE_ID} mono />
          </div>
        </section>

        {/* Permissions */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span data-translatable>İzinler</span>
          </div>
          <ul className="space-y-2">
            {permissions.map((p) => (
              <li
                key={p.name}
                className="flex items-start justify-between gap-3 rounded-md border border-border/60 bg-muted/30 px-3 py-2"
              >
                <div className="min-w-0">
                  <div className="font-mono text-xs font-semibold truncate">{p.name}</div>
                  <div className="text-xs text-muted-foreground">
                    <span data-translatable>{p.purpose}</span>
                  </div>
                </div>
                <Badge
                  variant={p.used ? "default" : "secondary"}
                  className="shrink-0 text-[10px]"
                >
                  <span data-translatable>{p.used ? "kullanılıyor" : "kullanılmıyor"}</span>
                </Badge>
              </li>
            ))}
          </ul>
        </section>

        {/* Privacy text */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <FileText className="w-4 h-4 text-primary" />
            <span data-translatable>Gizlilik Metni (Play Console için)</span>
          </div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="tr">
              <AccordionTrigger className="text-sm">
                <span data-translatable>Türkçe gizlilik özeti</span>
              </AccordionTrigger>
              <AccordionContent>
                <pre className="whitespace-pre-wrap text-xs font-sans bg-muted/40 p-3 rounded-md">
                  {privacyTextTr}
                </pre>
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-2"
                  onClick={() => handleCopy(privacyTextTr, "Türkçe gizlilik metni")}
                >
                  <Copy className="w-3.5 h-3.5 mr-1.5" />
                  <span data-translatable>Kopyala</span>
                </Button>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="en">
              <AccordionTrigger className="text-sm">
                <span data-translatable>English privacy summary</span>
              </AccordionTrigger>
              <AccordionContent>
                <pre className="whitespace-pre-wrap text-xs font-sans bg-muted/40 p-3 rounded-md">
                  {privacyTextEn}
                </pre>
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-2"
                  onClick={() => handleCopy(privacyTextEn, "English privacy text")}
                >
                  <Copy className="w-3.5 h-3.5 mr-1.5" />
                  <span data-translatable>Kopyala</span>
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* Release checklist */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            <span data-translatable>Yayın Hazırlık Kontrol Listesi</span>
          </div>
          <ul className="space-y-1.5">
            {releaseChecklist.map((item) => (
              <li key={item.label} className="flex items-start gap-2 text-sm">
                {item.done ? (
                  <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-500 shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                )}
                <span
                  data-translatable
                  className={item.done ? "text-foreground" : "text-muted-foreground"}
                >
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-muted-foreground">
            <span data-translatable>
              Bu liste yalnızca bilgilendirme amaçlıdır. Mağaza gönderiminden önce her madde
              elle doğrulanmalıdır.
            </span>
          </p>
        </section>
      </CardContent>
    </Card>
  );
};

const InfoRow = ({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) => (
  <div className="rounded-md border border-border/60 bg-muted/30 px-3 py-2">
    <div className="text-[10px] uppercase tracking-wide text-muted-foreground">
      <span data-translatable>{label}</span>
    </div>
    <div className={`text-sm ${mono ? "font-mono text-xs break-all" : "font-semibold"}`}>
      {value}
    </div>
  </div>
);

export default ReleaseChecklistCard;
