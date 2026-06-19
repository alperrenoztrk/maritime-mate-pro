import { useParams, Link } from "react-router-dom";
import { machineTopicBySlug } from "@/data/machineTopicData";
import { BookOpen, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RuleSection {
  subtitle: string;
  content: string[];
}

interface RuleCategory {
  title: string;
  rules: RuleSection[];
}

export const machineTopicRules: Record<string, RuleCategory[]> = {
  thermodynamics: [
    { title: "SOLAS – Makine Dairesi Isı Yönetimi", rules: [
      { subtitle: "Isı Yalıtımı", content: ["Yüzey sıcaklığı 220°C'yi aşan borular ve yüzeyler yalıtılmalıdır (SOLAS II-2/Reg.4)", "Yakıt sızıntısının sıcak yüzeylere temasını önleyecek koruma sacları gereklidir", "Egzoz manifold ve turboşarjer çevreleri düzenli kontrol edilmelidir"] },
      { subtitle: "Isıtıcılar ve Isı Eşanjörleri", content: ["Buhar ısıtıcılarında emniyet valfi ve basınç göstergesi zorunludur", "Isı eşanjörlerinde bimetal termometre veya RTD ile sürekli sıcaklık izleme gereklidir"] },
    ]},
  ],
  "fluid-mechanics": [
    { title: "Pompa ve Boru Standartları", rules: [
      { subtitle: "SOLAS – Sintine Pompaları", content: ["En az 2 bağımsız pompa gereklidir (SOLAS II-1/Reg.21)", "Acil sintine pompası makine dairesi dışından çalıştırılabilmelidir", "Sintine borusu çapı: d = 25 + 1,68√(L(B+D)) mm"] },
      { subtitle: "Basınçlı Kaplar", content: ["Hava tankları klas kuruluşu sertifikalı olmalıdır", "Emniyet valfi set basıncı: nominal basıncın %10 fazlası", "Periyodik hidrostatik test: 1,5 × çalışma basıncı"] },
    ]},
  ],
  "machine-elements": [
    { title: "Malzeme ve Yapı Standartları", rules: [
      { subtitle: "Klas Gereklilikleri", content: ["Şaft hattı malzemeleri klas onaylı çelik olmalıdır", "Pervane şaftı çapı klas formülleriyle hesaplanır (IACS UR M68)", "Pervane malzemesi: CU1–CU4 sınıflandırmasına göre seçilir"] },
      { subtitle: "Titreşim Limitleri", content: ["ISO 10816-6: gemi makineleri titreşim sınıflandırması", "Alarm: 11,2 mm/s (rms), Tehlike: 18 mm/s (rms)", "Torsiyonel titreşim analizi: barred speed range uygulaması"] },
    ]},
  ],
  "diesel-engines": [
    { title: "MARPOL Annex VI – Emisyon", rules: [
      { subtitle: "NOx Limitleri", content: ["Tier I: ≤ 17 g/kWh (n < 130 rpm)", "Tier II: ≤ 14,4 g/kWh (n < 130 rpm)", "Tier III (ECA): ≤ 3,4 g/kWh (n < 130 rpm) — SCR veya EGR gerektirir"] },
      { subtitle: "Motor Sertifikasyonu", content: ["EIAPP sertifikası her motor için zorunludur", "Teknik dosya (Technical File) gemide bulunmalıdır", "Motor parametreleri dosyadaki değerlerden sapmamalıdır"] },
    ]},
    { title: "Üretici ve Klas Gereklilikleri", rules: [
      { subtitle: "Periyodik Kontroller", content: ["Silindir kapağı: her 8.000–16.000 çalışma saatinde kontrol", "Piston ve segman: her 16.000–24.000 saatte değişim/kontrol", "Krank yatakları: her 24.000 saatte krankcase açılarak kontrol"] },
    ]},
  ],
  "ship-systems": [
    { title: "Yakıt Sistemi Kuralları", rules: [
      { subtitle: "ISO 8217 Yakıt Standardı", content: ["Bunker yakıtı ISO 8217 spesifikasyonlarına uygun olmalıdır", "BDN (Bunker Delivery Note) 3 yıl saklanmalıdır", "Yakıt numunesi MARPOL tahtında en az 12 ay muhafaza edilir"] },
      { subtitle: "Yakıt Tankları", content: ["Çift cidarlı yakıt tankı: 600 DWT üzeri gemilerde zorunlu (MARPOL Annex I)", "Quick-closing valve: tüm yakıt tanklarında zorunlu", "Taşma alarmı ve yüksek seviye alarmı gereklidir"] },
    ]},
  ],
  auxiliary: [
    { title: "Yardımcı Makine Kuralları", rules: [
      { subtitle: "Jeneratör", content: ["Acil jeneratör 45 saniye içinde otomatik devreye girmelidir (SOLAS II-1/Reg.44)", "Acil jeneratör yakıt kapasitesi: min 18 saat (yolcu), min 18 saat (yük)", "Paralel çalışmada ters güç koruma (reverse power relay) zorunludur"] },
      { subtitle: "Kazan", content: ["Emniyet valfi: set basıncın %3'ü içinde açmalıdır", "Su seviye alarmı: düşük-düşük seviyede otomatik kapama", "Alev izleme (flame eye): 5 saniye içinde alev yoksa yakıt kesintisi"] },
    ]},
  ],
  "fuel-technology": [
    { title: "Yakıt Kalite ve Yönetim Kuralları", rules: [
      { subtitle: "MARPOL Annex VI – Kükürt", content: ["Global kükürt limiti: %0,50 m/m (2020 sonrası)", "ECA bölgeleri: %0,10 m/m", "Scrubber kullanımında yıkama suyu kriterleri: pH ≥ 6,5, PAH ≤ 50 μg/L"] },
      { subtitle: "Yakıt Değişim Prosedürü", content: ["HFO → MGO geçişinde sıcaklık farkı max 2°C/dk olmalıdır", "Termal şok riski: ani soğuma pompa ve enjektörlere zarar verir", "Değişim süresi ve tanklar seyir jurnalinde kayıt altına alınmalıdır"] },
    ]},
  ],
  "cooling-hvac": [
    { title: "Soğutucu Akışkan Kuralları", rules: [
      { subtitle: "Kigali Değişikliği (Montreal Protokolü)", content: ["HFC akışkanların (R-134a, R-404A) kademeli azaltılması zorunludur", "Yeni sistemlerde düşük GWP akışkanlar tercih edilmelidir (R-290, R-744)", "Kaçak tespiti: yıllık kontrol ve kayıt zorunludur"] },
      { subtitle: "SOLAS – Soğutma Güvenliği", content: ["Soğutucu gaz kaçak alarmı: makine kontrol odasında gösterilmelidir", "NH₃ (R-717) sistemlerinde solunum cihazı ve alarm sistemi zorunludur", "Makine dairesi ventilatörleri kaçak durumunda otomatik devreye girmelidir"] },
    ]},
  ],
  electrical: [
    { title: "IEC 60092 – Gemi Elektrik Standartları", rules: [
      { subtitle: "Dağıtım Sistemi", content: ["Ana dağıtım sistemi genellikle IT (izole nötr) topraklı olmalıdır", "Toprak kaçağı izleme cihazı zorunludur (IEC 60092-502)", "Selektif koruma: kademe ayarları doğru yapılmalıdır"] },
      { subtitle: "Acil Güç", content: ["Acil switchboard ana switchboard'dan ayrı bölmede bulunmalıdır", "Acil güç kaynakları: navigasyon ışıkları, alarm sistemleri, acil aydınlatma, yangın pompaları", "Geçiş süresi: 45 saniye içinde tam yük beslemesi (SOLAS II-1/Reg.44)"] },
    ]},
  ],
  automation: [
    { title: "Otomasyon Standartları", rules: [
      { subtitle: "Alarm Sistemi (SOLAS II-1/Reg.51)", content: ["Alarm sistemi bağımsız güç kaynağına sahip olmalıdır", "Kabul edilmemiş alarm 30 dakikada tekrar uyarı vermelidir", "Kabin alarmı: kritik alarmlar mürettebat kamaralarına iletilmelidir"] },
      { subtitle: "Periyodsuz Makine Dairesi (UMS)", content: ["UMS sertifikası için tüm kritik parametreler izlenmelidir", "Köprüüstü alarm paneli: ana makine, jeneratör ve tank seviyeleri", "Fire detection: makine dairesi yangın algılama bağımsız olmalıdır"] },
    ]},
  ],
  "engine-room-ops": [
    { title: "Operasyon Kuralları", rules: [
      { subtitle: "STCW – Vardiya Tutma", content: ["Makine vardiyası: STCW Code A-VIII/2 bölümüne göre düzenlenir", "Min. dinlenme: 10 saat/24 saat periyodunda", "Vardiya devir teslimi: tüm çalışan sistemlerin durumu aktarılmalıdır"] },
      { subtitle: "ISM Code – Prosedürler", content: ["Tüm kritik operasyonlar için yazılı prosedür bulunmalıdır", "Prosedür sapmaları raporlanmalı ve kök neden analizi yapılmalıdır", "Acil durum tatbikatları: aylık yapılmalı ve kaydedilmelidir"] },
    ]},
  ],
  maintenance: [
    { title: "Bakım Kuralları", rules: [
      { subtitle: "Klas Gereklilikleri", content: ["PMS (Planned Maintenance System): tüm ekipman bakım kayıtları tutulmalıdır", "Özel survey (Special Survey): her 5 yılda bir tam kapsamlı kontrol", "Intermediate survey: 2,5 yıl ± 6 ay aralığında", "Continuous survey: belirli makine grupları sıralı olarak kontrol edilir"] },
      { subtitle: "ISM Code – Bakım", content: ["Kritik ekipman tanımlanmalı ve öncelikli bakım planına alınmalıdır", "Bakım kayıtlarında: tarih, yapılan iş, yedek parça, ölçüm sonuçları", "Arıza ve yakın-arıza (near-miss) olayları raporlanmalıdır"] },
    ]},
  ],
  "engine-room-safety": [
    { title: "Makine Dairesi Güvenlik Kuralları", rules: [
      { subtitle: "SOLAS II-2 – Yangın Güvenliği", content: ["Makine dairesi A-60 sınıfı bölmelerle çevrilmelidir", "Sabit CO₂ veya FM-200 söndürme sistemi zorunludur", "Hızlı kapatma (quick-closing) valfleri makine dairesi dışından çalışmalıdır", "Ventilatör kapatma: makine dairesi dışından durdurulabilmelidir"] },
      { subtitle: "Acil Durdurma", content: ["Ana makine acil durdurma: köprüüstünden ve makine kontrol odasından", "Yakıt pompaları: makine dairesi dışından durdurulabilmeli", "Ventilatörler: yangın durumunda otomatik veya uzaktan kapatılmalı"] },
    ]},
  ],
  "environment-machine": [
    { title: "MARPOL – Makine İlgili Hükümler", rules: [
      { subtitle: "Annex I – Yağlı Atıklar", content: ["15 ppm OWS: denize deşarj limiti", "Sludge tank: tüm gemilerde zorunlu", "Oil Record Book Part I: makine bölümü kayıtları tutulmalıdır", "400 GT üzeri gemiler: OWS veya yağ filtre cihazı zorunlu"] },
      { subtitle: "Annex IV – Atık Su", content: ["Arıtma tesisi çıkışı: coliform ≤ 250/100mL", "12 deniz milinden yakın: arıtılmamış deşarj yasaktır", "3 deniz milinden yakın: arıtılmış bile olsa deşarj yasaktır (kıyıya yakın)"] },
      { subtitle: "Annex VI – Hava Kirliliği", content: ["ODS (ozon tabakasını incelten maddeler): yeni kullanımı yasaktır", "Shipboard incineration: liman ve kıyıda yasaktır (bazı maddeler her yerde)", "IAPP sertifikası: 400 GT üzeri gemilerde zorunlu"] },
    ]},
  ],
  erm: [
    { title: "ERM Kuralları ve Standartları", rules: [
      { subtitle: "STCW – ERM Yeterlilikleri", content: ["STCW Code A-III/1 ve A-III/2: makine zabitlerinin ERM yeterliliği", "Liderlik ve takım çalışması: yeterlilik değerlendirmesinde zorunlu", "Durumsal farkındalık ve karar verme becerileri değerlendirilir"] },
      { subtitle: "ISM Code – İnsan Faktörü", content: ["İş güvenliği değerlendirmesi: her operasyon öncesi yapılmalıdır", "Yorgunluk yönetimi: çalışma ve dinlenme saatleri kayıt altındadır (MLC 2006)", "İletişim: makine ekibi ve köprüüstü arasında etkili iletişim protokolü"] },
    ]},
  ],
  "energy-efficiency": [
    { title: "Enerji Verimliliği Düzenlemeleri", rules: [
      { subtitle: "MARPOL Annex VI – Bölüm 4", content: ["EEDI: 2013 sonrası kontrat edilen yeni gemiler için zorunlu", "EEXI: 2023 sonrası tüm mevcut gemiler (400 GT üzeri) için zorunlu", "CII: yıllık karbon yoğunluğu değerlendirmesi (A–E derecelendirme)", "SEEMP Part III: CII hesabı ve iyileştirme planı zorunlu"] },
      { subtitle: "EU MRV ve IMO DCS", content: ["EU MRV: AB limanlarına uğrayan gemiler CO₂ verisi raporlar", "IMO DCS: 5.000 GT üzeri gemiler yakıt tüketimi bildirir", "Her iki sistem de yıllık bazda veri toplar ve raporlar"] },
    ]},
  ],
};

export default function MachineTopicRulesPage() {
  const { topicSlug } = useParams<{ topicSlug: string }>();
  const topic = topicSlug ? machineTopicBySlug[topicSlug] : null;
  const rules = topicSlug ? machineTopicRules[topicSlug] : null;

  if (!topic || !rules) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Konu bulunamadı</p>
      </div>
    );
  }

  const TopicIcon = topic.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 dark:from-[hsl(220,50%,6%)] dark:via-[hsl(220,50%,8%)] dark:to-[hsl(220,50%,10%)]">
      <div className="container mx-auto max-w-4xl p-4 space-y-6">
        <header className="space-y-3">
          <div className="flex items-center gap-3">
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${topic.accent} text-white shadow-lg`}>
              <TopicIcon className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">{topic.title}</h1>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <BookOpen className="h-3.5 w-3.5" /> Kurallar
              </p>
            </div>
          </div>
        </header>

        {rules.map((category, catIdx) => (
          <section key={catIdx} className="space-y-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">{category.title}</h2>
            </div>
            {category.rules.map((rule, rIdx) => (
              <Card key={rIdx} className="bg-card/80 backdrop-blur border-border/40">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold">{rule.subtitle}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1.5">
                    {rule.content.map((item, iIdx) => (
                      <li key={iIdx} className="flex items-start gap-2 text-sm text-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </section>
        ))}

        <div className="flex justify-center pt-4">
          <Link to="/lessons" className="inline-flex items-center gap-2 rounded-full bg-card/60 px-4 py-2 text-xs text-muted-foreground backdrop-blur transition-colors hover:bg-card hover:text-foreground">
            Tüm Derslere Dön
          </Link>
        </div>
      </div>
    </div>
  );
}
