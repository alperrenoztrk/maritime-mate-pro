import { useParams } from "react-router-dom";
import { machineTopicBySlug } from "@/data/machineTopicData";
import { BookOpen, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SourceRef } from "@/data/courseContent/types";

interface RuleSection {
  subtitle: string;
  content: string[];
}

interface RuleCategory {
  title: string;
  /** Gerçek standart/kaynak referansı (güverte RuleGroup ile parite). */
  source?: SourceRef;
  rules: RuleSection[];
}

export const machineTopicRules: Record<string, RuleCategory[]> = {
  thermodynamics: [
    { title: "SOLAS – Makine Dairesi Isı Yönetimi", source: { code: "SOLAS II-2/Reg.4", detail: "Sıcak yüzey ve yakıt sızıntısı koruması" }, rules: [
      { subtitle: "Isı Yalıtımı", content: ["Yüzey sıcaklığı 220°C'yi aşan borular ve yüzeyler yalıtılmalıdır (SOLAS II-2/Reg.4)", "Yakıt sızıntısının sıcak yüzeylere temasını önleyecek koruma sacları gereklidir", "Egzoz manifold ve turboşarjer çevreleri düzenli kontrol edilmelidir"] },
      { subtitle: "Isıtıcılar ve Isı Eşanjörleri", content: ["Buhar ısıtıcılarında emniyet valfi ve basınç göstergesi zorunludur", "Isı eşanjörlerinde bimetal termometre veya RTD ile sürekli sıcaklık izleme gereklidir"] },
    ]},
    { title: "Basınçlı Kaplar ve Buhar Sistemleri", source: { code: "Klas Kuralları (IACS) / PED", detail: "Basınçlı ekipman tasarım ve test" }, rules: [
      { subtitle: "Emniyet Valfleri", content: ["Buhar kazanlarında en az iki emniyet valfi bulunmalıdır", "Set basıncı tasarım basıncını aşmayacak şekilde ayarlanır (tipik ±%3)", "Valf açma kapasitesi tam yük buhar üretimini karşılamalıdır"] },
      { subtitle: "Periyodik Test", content: ["Basınçlı kaplar için periyodik hidrostatik test: ≈ 1,5 × çalışma basıncı", "Su seviye göstergeleri ve düşük-su alarmı/kesme test edilmelidir"] },
    ]},
    { title: "Egzoz ve Atık Isı Geri Kazanım (WHRS)", source: { code: "MARPOL Annex VI / SOLAS II-2", detail: "Egzoz gaz kazanı ve verim" }, rules: [
      { subtitle: "Egzoz Gaz Ekonomizeri", content: ["Soot fire (kurum yangını) riskine karşı kuru/ıslak temizleme prosedürleri uygulanmalıdır", "Düşük yükte ekonomizer giriş sıcaklığı çiy noktası ve asit korozyonu açısından izlenmelidir"] },
      { subtitle: "Atık Isı Değerlendirmesi", content: ["Atık ısı; tatlı su üreteci, yakıt/yağ ısıtma ve buhar üretimine yönlendirilerek verim artırılır"] },
    ]},
  ],
  "fluid-mechanics": [
    { title: "Pompa ve Boru Standartları", source: { code: "SOLAS II-1/Reg.21", detail: "Sintine pompalama düzenlemeleri" }, rules: [
      { subtitle: "SOLAS – Sintine Pompaları", content: ["En az 2 bağımsız pompa gereklidir (SOLAS II-1/Reg.21)", "Acil sintine pompası makine dairesi dışından çalıştırılabilmelidir", "Sintine borusu çapı: d = 25 + 1,68√(L(B+D)) mm"] },
      { subtitle: "Basınçlı Kaplar", content: ["Hava tankları klas kuruluşu sertifikalı olmalıdır", "Emniyet valfi set basıncı: nominal basıncın %10 fazlası", "Periyodik hidrostatik test: 1,5 × çalışma basıncı"] },
    ]},
    { title: "Balast ve Boru Devreleri", source: { code: "SOLAS II-1 / BWM Convention", detail: "Balast tertibatı ve arıtma" }, rules: [
      { subtitle: "Balast Sistemi", content: ["Balast pompaları ve borulaması yeterli yedeklilikte olmalıdır", "Ballast Water Management Convention (D-2) gereği arıtma sistemi kapasitesi balast pompa debisini karşılamalıdır"] },
      { subtitle: "Vana ve İzolasyon", content: ["Su geçmez bölmeler arası borularda uygun izolasyon valfleri bulunmalıdır", "Cross-flooding tertibatları damage control planına uygun olmalıdır"] },
    ]},
    { title: "Kavitasyon ve Basınçlı Hava", source: { code: "Klas / IACS UR", detail: "Pompa NPSH ve hava devresi" }, rules: [
      { subtitle: "NPSH ve Kavitasyon", content: ["Mevcut NPSH > gerekli NPSH olmalıdır; aksi halde kavitasyon ve aşınma oluşur", "Emme tarafı filtre/strainer basınç farkı izlenmelidir"] },
      { subtitle: "Basınçlı Hava Devresi", content: ["Marş havası tankları en az iki adet ve toplam 12 ardışık marş kapasiteli olmalıdır (Klas)", "Hava devresinde emniyet valfi ve drenaj (su/yağ ayırıcı) bulunmalıdır"] },
    ]},
  ],
  "machine-elements": [
    { title: "Malzeme ve Yapı Standartları", source: { code: "IACS UR M / ISO 10816-6", detail: "Malzeme, şaft ve titreşim" }, rules: [
      { subtitle: "Klas Gereklilikleri", content: ["Şaft hattı malzemeleri klas onaylı çelik olmalıdır", "Pervane şaftı çapı klas formülleriyle hesaplanır (IACS UR M68)", "Pervane malzemesi: CU1–CU4 sınıflandırmasına göre seçilir"] },
      { subtitle: "Titreşim Limitleri", content: ["ISO 10816-6: gemi makineleri titreşim sınıflandırması", "Alarm: 11,2 mm/s (rms), Tehlike: 18 mm/s (rms)", "Torsiyonel titreşim analizi: barred speed range uygulaması"] },
    ]},
    { title: "Şaft, Yatak ve Pervane", source: { code: "IACS UR M68 / klas kuralları", detail: "Sevk sistemi elemanları" }, rules: [
      { subtitle: "Şaft Boyutlandırma", content: ["Ara ve kuyruk şaftı çapları klas burulma/eğilme formülleriyle doğrulanır", "Stern tube yatak aşınması (wear-down) ölçülmeli, sınır değerleri izlenmelidir"] },
      { subtitle: "Yatak ve Yağlama", content: ["Beyaz metal (white metal) yatak sıcaklığı izlenmeli, sınır aşımında alarm verilmelidir", "Yağlama film kalınlığı için minimum devir/sıcaklık koşulları korunmalıdır"] },
    ]},
    { title: "Bağlantı Elemanları ve Muayene", source: { code: "Klas / NDT standartları", detail: "Cıvata, kaynak ve tahribatsız muayene" }, rules: [
      { subtitle: "Cıvata ve Kaynak", content: ["Kritik cıvatalar tork/germe değerleriyle, üretici talimatına göre sıkılmalıdır", "Kaynak dikişleri onaylı prosedür (WPS) ve kalifiye kaynakçı ile yapılmalıdır"] },
      { subtitle: "Tahribatsız Muayene (NDT)", content: ["Kritik bölgelerde MPI/UT/PT ile çatlak kontrolü periyodik yapılır", "Bulgular klas sörveyörüne raporlanır ve kayıt altına alınır"] },
    ]},
  ],
  "diesel-engines": [
    { title: "MARPOL Annex VI – Emisyon", source: { code: "MARPOL Annex VI Reg.13", detail: "NOx Tier I/II/III sınırları" }, rules: [
      { subtitle: "NOx Limitleri", content: ["Tier I: ≤ 17 g/kWh (n < 130 rpm)", "Tier II: ≤ 14,4 g/kWh (n < 130 rpm)", "Tier III (ECA): ≤ 3,4 g/kWh (n < 130 rpm) — SCR veya EGR gerektirir"] },
      { subtitle: "Motor Sertifikasyonu", content: ["EIAPP sertifikası her motor için zorunludur", "Teknik dosya (Technical File) gemide bulunmalıdır", "Motor parametreleri dosyadaki değerlerden sapmamalıdır"] },
    ]},
    { title: "Üretici ve Klas Gereklilikleri", source: { code: "Üretici / Klas PMS", detail: "Periyodik bakım aralıkları" }, rules: [
      { subtitle: "Periyodik Kontroller", content: ["Silindir kapağı: her 8.000–16.000 çalışma saatinde kontrol", "Piston ve segman: her 16.000–24.000 saatte değişim/kontrol", "Krank yatakları: her 24.000 saatte krankcase açılarak kontrol"] },
      { subtitle: "Performans İzleme", content: ["Maksimum yanma basıncı (Pmax), egzoz sıcaklıkları ve SFOC trend olarak izlenmelidir", "İndikatör diyagramı/PMI ile silindir dengesi kontrol edilir"] },
    ]},
    { title: "Krank Karteri ve Emniyet Tertibatı", source: { code: "SOLAS II-1 / IACS UR M", detail: "Patlama koruma ve emniyet" }, rules: [
      { subtitle: "Krank Karteri Koruması", content: ["≥ 200 mm çapındaki motorlarda krank karteri patlama tahliye valfi (relief valve) zorunludur", "Oil Mist Detector (OMD) veya yatak sıcaklık izleme sistemi bulunmalıdır"] },
      { subtitle: "Marş Havası Güvenliği", content: ["Marş hava manifoldunda alev tutucu (flame arrester) ve patlama tahliyesi bulunmalıdır", "Aşırı hız (overspeed) koruması ve acil durdurma test edilmelidir"] },
    ]},
  ],
  "ship-systems": [
    { title: "Yakıt Sistemi Kuralları", source: { code: "ISO 8217 / MARPOL Annex I", detail: "Yakıt kalitesi ve tank tertibatı" }, rules: [
      { subtitle: "ISO 8217 Yakıt Standardı", content: ["Bunker yakıtı ISO 8217 spesifikasyonlarına uygun olmalıdır", "BDN (Bunker Delivery Note) 3 yıl saklanmalıdır", "Yakıt numunesi MARPOL tahtında en az 12 ay muhafaza edilir"] },
      { subtitle: "Yakıt Tankları", content: ["Çift cidarlı yakıt tankı: 600 DWT üzeri gemilerde zorunlu (MARPOL Annex I)", "Quick-closing valve: tüm yakıt tanklarında zorunlu", "Taşma alarmı ve yüksek seviye alarmı gereklidir"] },
    ]},
    { title: "Yağlama ve Soğutma Sistemleri", source: { code: "Klas Kuralları / Üretici", detail: "LO ve soğutma devresi" }, rules: [
      { subtitle: "Yağlama Sistemi", content: ["LO basıncı düşük basınç alarmı ve otomatik durdurma ile korunmalıdır", "LO filtre basınç farkı izlenmeli, by-pass durumunda alarm verilmelidir"] },
      { subtitle: "Soğutma Sistemi", content: ["Merkezi soğutma (HT/LT) devrelerinde sıcaklık ve basınç izlenir", "Deniz suyu sistemi anti-fouling/anodik koruma ile bakımlı tutulur"] },
    ]},
    { title: "Dümen Donanımı", source: { code: "SOLAS II-1/Reg.29", detail: "Steering gear yedeklilik" }, rules: [
      { subtitle: "Yedeklilik ve Performans", content: ["Ana dümen donanımı dümeni 35°–35° (karşı) 28 sn'de basabilmelidir", "Yardımcı dümen donanımı veya iki bağımsız güç ünitesi bulunmalıdır"] },
      { subtitle: "Test ve Tatbikat", content: ["Kalkıştan önce 12 saat içinde dümen donanımı test edilmelidir", "Acil dümen tutma tatbikatı 3 ayda bir yapılmalıdır"] },
    ]},
  ],
  auxiliary: [
    { title: "Yardımcı Makine Kuralları", source: { code: "SOLAS II-1/Reg.44", detail: "Acil güç ve kazan emniyeti" }, rules: [
      { subtitle: "Jeneratör", content: ["Acil jeneratör 45 saniye içinde otomatik devreye girmelidir (SOLAS II-1/Reg.44)", "Acil jeneratör yakıt kapasitesi: min 18 saat (yolcu), min 18 saat (yük)", "Paralel çalışmada ters güç koruma (reverse power relay) zorunludur"] },
      { subtitle: "Kazan", content: ["Emniyet valfi: set basıncın %3'ü içinde açmalıdır", "Su seviye alarmı: düşük-düşük seviyede otomatik kapama", "Alev izleme (flame eye): 5 saniye içinde alev yoksa yakıt kesintisi"] },
    ]},
    { title: "Separatör ve Hava Kompresörleri", source: { code: "MARPOL Annex I / Klas", detail: "OWS ve basınçlı hava" }, rules: [
      { subtitle: "Yağlı Su Separatörü (OWS)", content: ["15 ppm alarm ve otomatik üç-yollu valf ile deniz deşarjı durdurulmalıdır", "OWS çıkış konsantrasyonu ≤ 15 ppm; Oil Record Book Part I kaydı tutulur"] },
      { subtitle: "Hava Kompresörü", content: ["Marş havası tankları toplam 12 ardışık marş kapasiteli olmalıdır", "Emniyet valfi, drenaj ve aşırı sıcaklık koruması bulunmalıdır"] },
    ]},
    { title: "Tatlı Su ve Hidrofor", source: { code: "Klas / Sağlık Yönetmelikleri", detail: "İçme suyu ve evaporatör" }, rules: [
      { subtitle: "Tatlı Su Üreteci", content: ["Limanlara/kıyıya yakın bölgelerde (genelde < 12 nm) evaporatör çalıştırılmamalıdır", "Üretilen su mineralizasyon/dezenfeksiyon (UV veya klorlama) ile içilebilir hale getirilir"] },
      { subtitle: "Hidrofor Sistemi", content: ["İçme suyu tankları kapalı ve kontamine olmayacak şekilde havalandırılmalıdır", "Periyodik su analizi (mikrobiyolojik) yapılmalıdır"] },
    ]},
  ],
  "fuel-technology": [
    { title: "Yakıt Kalite ve Yönetim Kuralları", source: { code: "MARPOL Annex VI Reg.14/18", detail: "Kükürt sınırı ve yakıt kalitesi" }, rules: [
      { subtitle: "MARPOL Annex VI – Kükürt", content: ["Global kükürt limiti: %0,50 m/m (2020 sonrası)", "ECA bölgeleri: %0,10 m/m", "Scrubber kullanımında yıkama suyu kriterleri: pH ≥ 6,5, PAH ≤ 50 μg/L"] },
      { subtitle: "Yakıt Değişim Prosedürü", content: ["HFO → MGO geçişinde sıcaklık farkı max 2°C/dk olmalıdır", "Termal şok riski: ani soğuma pompa ve enjektörlere zarar verir", "Değişim süresi ve tanklar seyir jurnalinde kayıt altına alınmalıdır"] },
    ]},
    { title: "Bunker Operasyonu", source: { code: "MARPOL Annex VI Reg.18 / ISGOTT", detail: "BDN, numune ve güvenlik" }, rules: [
      { subtitle: "Bunker Prosedürü", content: ["Bunker öncesi checklist, kör tapa kontrolü ve SOPEP/dökülme ekipmanı hazır olmalıdır", "Manifold çevresinde drip tray ve scupper tıpaları yerinde olmalıdır"] },
      { subtitle: "BDN ve Numune", content: ["BDN en az 3 yıl saklanır; MARPOL numunesi mühürlü olarak en az 12 ay muhafaza edilir", "Numune alma sürekli damlatma (drip) yöntemiyle temsil edici olmalıdır"] },
    ]},
    { title: "ISO 8217 Spesifikasyonu", source: { code: "ISO 8217", detail: "Marine fuel spesifikasyon parametreleri" }, rules: [
      { subtitle: "Kritik Parametreler", content: ["Viskozite, yoğunluk, kükürt, su, kül, CCAI ve sediment (TSP) sınır değerleri kontrol edilir", "Cat fines (Al+Si) ≤ 60 mg/kg (teslim); motor girişinde tipik hedef ≤ 15 mg/kg"] },
      { subtitle: "Uyumsuz Yakıt", content: ["Spesifikasyon dışı yakıt için tedarikçiye bildirim ve gerekirse de-bunkering değerlendirilir", "Stabilite/uyumsuzluk (sludge) riskine karşı farklı yakıtların karışımından kaçınılır"] },
    ]},
  ],
  "cooling-hvac": [
    { title: "Soğutucu Akışkan Kuralları", source: { code: "Kigali / Montreal Protokolü", detail: "HFC azaltımı ve kaçak yönetimi" }, rules: [
      { subtitle: "Kigali Değişikliği (Montreal Protokolü)", content: ["HFC akışkanların (R-134a, R-404A) kademeli azaltılması zorunludur", "Yeni sistemlerde düşük GWP akışkanlar tercih edilmelidir (R-290, R-744)", "Kaçak tespiti: yıllık kontrol ve kayıt zorunludur"] },
      { subtitle: "SOLAS – Soğutma Güvenliği", content: ["Soğutucu gaz kaçak alarmı: makine kontrol odasında gösterilmelidir", "NH₃ (R-717) sistemlerinde solunum cihazı ve alarm sistemi zorunludur", "Makine dairesi ventilatörleri kaçak durumunda otomatik devreye girmelidir"] },
    ]},
    { title: "Gıda Soğutma ve Hijyen", source: { code: "SOLAS / Sağlık Yönetmelikleri", detail: "Soğuk depo ve gıda güvenliği" }, rules: [
      { subtitle: "Soğuk Depo Sıcaklıkları", content: ["Donmuş gıda depoları tipik ≤ −18°C tutulur; sıcaklık sürekli izlenmelidir", "Farklı gıda grupları için ayrı soğutma odaları/sıcaklıkları sağlanmalıdır"] },
      { subtitle: "Hijyen ve Bakım", content: ["Defrost ve temizlik periyodik yapılmalı, drenajlar açık tutulmalıdır", "Sıcaklık kayıtları (data logger) tutulmalıdır"] },
    ]},
    { title: "Klima ve Havalandırma (HVAC)", source: { code: "ISO 7547 / Klas", detail: "Konfor klima ve mahal havalandırması" }, rules: [
      { subtitle: "Konfor Klima", content: ["Yaşam mahalleri için tasarım sıcaklık ve nem koşulları (ISO 7547) sağlanmalıdır", "Taze hava debisi ve filtrasyon iç hava kalitesi için yeterli olmalıdır"] },
      { subtitle: "Makine Dairesi Havalandırması", content: ["Yanma havası ve mahal soğutması için yeterli fan kapasitesi bulunmalıdır", "Yangında ventilatör uzaktan durdurma ve damper kapatma sağlanmalıdır"] },
    ]},
  ],
  electrical: [
    { title: "IEC 60092 – Gemi Elektrik Standartları", source: { code: "IEC 60092 / SOLAS II-1", detail: "Dağıtım ve acil güç" }, rules: [
      { subtitle: "Dağıtım Sistemi", content: ["Ana dağıtım sistemi genellikle IT (izole nötr) topraklı olmalıdır", "Toprak kaçağı izleme cihazı zorunludur (IEC 60092-502)", "Selektif koruma: kademe ayarları doğru yapılmalıdır"] },
      { subtitle: "Acil Güç", content: ["Acil switchboard ana switchboard'dan ayrı bölmede bulunmalıdır", "Acil güç kaynakları: navigasyon ışıkları, alarm sistemleri, acil aydınlatma, yangın pompaları", "Geçiş süresi: 45 saniye içinde tam yük beslemesi (SOLAS II-1/Reg.44)"] },
    ]},
    { title: "Akü ve Acil Aydınlatma", source: { code: "SOLAS II-1 / III", detail: "Geçici acil güç ve aydınlatma" }, rules: [
      { subtitle: "Akü Sistemleri", content: ["Akü odası uygun şekilde havalandırılmalı (hidrojen birikimi önlenmeli)", "Geçici acil güç kaynağı (akü) acil jeneratör devreye girene kadar besleme sağlar"] },
      { subtitle: "Acil Aydınlatma ve İşaret", content: ["Kaçış yolları ve toplanma yerlerinde acil aydınlatma süresi gereği karşılanmalıdır", "Düşük konumlu aydınlatma (LLL) ve işaretlemeler bakımlı olmalıdır"] },
    ]},
    { title: "Yüksek Gerilim (HV) Emniyeti", source: { code: "IEC 60092-503", detail: "HV sistem güvenliği" }, rules: [
      { subtitle: "HV Çalışma Güvenliği", content: ["HV ekipmanda çalışma için permit-to-work, izolasyon ve topraklama (LOTO) uygulanır", "Yetkili personel ve uygun KKD (ark flash) gereklidir"] },
      { subtitle: "Koruma ve Topraklama", content: ["Kilitleme (interlock) ve test/ölçüm prosedürleri uygulanmalıdır", "Toprak hatası ve aşırı akım koruması selektif ayarlanmalıdır"] },
    ]},
  ],
  automation: [
    { title: "Otomasyon Standartları", source: { code: "SOLAS II-1/Reg.51 / IACS UR E", detail: "Alarm ve UMS gereklilikleri" }, rules: [
      { subtitle: "Alarm Sistemi (SOLAS II-1/Reg.51)", content: ["Alarm sistemi bağımsız güç kaynağına sahip olmalıdır", "Kabul edilmemiş alarm 30 dakikada tekrar uyarı vermelidir", "Kabin alarmı: kritik alarmlar mürettebat kamaralarına iletilmelidir"] },
      { subtitle: "Periyodsuz Makine Dairesi (UMS)", content: ["UMS sertifikası için tüm kritik parametreler izlenmelidir", "Köprüüstü alarm paneli: ana makine, jeneratör ve tank seviyeleri", "Fire detection: makine dairesi yangın algılama bağımsız olmalıdır"] },
    ]},
    { title: "İzleme ve Kontrol Sistemleri", source: { code: "IACS UR E10/E22", detail: "Sensör, PLC ve tip onayı" }, rules: [
      { subtitle: "Sensör ve Ölçüm", content: ["Kritik ölçümlerde yedeklilik (redundancy) ve hata güvenli (fail-safe) tasarım uygulanır", "Sensör kalibrasyonu periyodik yapılmalı ve kayıt tutulmalıdır"] },
      { subtitle: "PLC/DCS ve Tip Onayı", content: ["Kontrol donanımı klas tip onaylı (EMC, çevresel test) olmalıdır", "Yazılım değişiklikleri yönetim altında (versiyon kontrol) yapılmalıdır"] },
    ]},
    { title: "Siber Güvenlik (OT)", source: { code: "IMO MSC-FAL.1/Circ.3 / IACS UR E26-E27", detail: "Gemi siber risk yönetimi" }, rules: [
      { subtitle: "Risk Yönetimi", content: ["Siber riskler SMS (ISM) kapsamında değerlendirilmelidir (2021 sonrası)", "OT/IT ağ ayrımı ve erişim kontrolü uygulanmalıdır"] },
      { subtitle: "Süreklilik ve Yedekleme", content: ["Kritik sistem yapılandırmaları yedeklenmeli, geri yükleme test edilmelidir", "USB/taşınabilir medya ve uzaktan erişim kontrol altında tutulmalıdır"] },
    ]},
  ],
  "engine-room-ops": [
    { title: "Operasyon Kuralları", source: { code: "STCW A-VIII/2 / ISM Code", detail: "Vardiya ve prosedürler" }, rules: [
      { subtitle: "STCW – Vardiya Tutma", content: ["Makine vardiyası: STCW Code A-VIII/2 bölümüne göre düzenlenir", "Min. dinlenme: 10 saat/24 saat periyodunda", "Vardiya devir teslimi: tüm çalışan sistemlerin durumu aktarılmalıdır"] },
      { subtitle: "ISM Code – Prosedürler", content: ["Tüm kritik operasyonlar için yazılı prosedür bulunmalıdır", "Prosedür sapmaları raporlanmalı ve kök neden analizi yapılmalıdır", "Acil durum tatbikatları: aylık yapılmalı ve kaydedilmelidir"] },
    ]},
    { title: "Çalışma ve Dinlenme Saatleri", source: { code: "STCW A-VIII/1 / MLC 2006", detail: "Yorgunluk önleme" }, rules: [
      { subtitle: "Dinlenme Limitleri", content: ["Min. 10 saat dinlenme/24 saat ve 77 saat/7 gün sağlanmalıdır", "Dinlenme en çok iki parçaya bölünebilir; bir parça ≥ 6 saat olmalıdır"] },
      { subtitle: "Kayıt ve İzleme", content: ["Çalışma/dinlenme saatleri kaydı tutulmalı ve denetime hazır olmalıdır", "İstisnalar (exemption) yönetmelik sınırları içinde kalmalıdır"] },
    ]},
    { title: "Manevra ve Köprü-Makine Koordinasyonu", source: { code: "ISM / Bridge-Engine Procedures", detail: "Stand-by ve iletişim" }, rules: [
      { subtitle: "Stand-by Operasyonu", content: ["Manevra öncesi ana makine, dümen ve yardımcılar test edilmeli (pre-arrival checklist)", "Telegraph/komut uyumu ve geri besleme doğrulanmalıdır"] },
      { subtitle: "İletişim", content: ["Köprü-makine arası net komut ve onay (closed-loop) iletişimi uygulanır", "Kritik durumlar (blackout, kontrol kaybı) için acil prosedürler hazır olmalıdır"] },
    ]},
  ],
  maintenance: [
    { title: "Bakım Kuralları", source: { code: "Klas Kuralları / ISM Code", detail: "PMS ve sörvey rejimi" }, rules: [
      { subtitle: "Klas Gereklilikleri", content: ["PMS (Planned Maintenance System): tüm ekipman bakım kayıtları tutulmalıdır", "Özel survey (Special Survey): her 5 yılda bir tam kapsamlı kontrol", "Intermediate survey: 2,5 yıl ± 6 ay aralığında", "Continuous survey: belirli makine grupları sıralı olarak kontrol edilir"] },
      { subtitle: "ISM Code – Bakım", content: ["Kritik ekipman tanımlanmalı ve öncelikli bakım planına alınmalıdır", "Bakım kayıtlarında: tarih, yapılan iş, yedek parça, ölçüm sonuçları", "Arıza ve yakın-arıza (near-miss) olayları raporlanmalıdır"] },
    ]},
    { title: "Sörvey Rejimi ve Durum İzleme", source: { code: "IACS / Klas", detail: "Survey tipleri ve CBM" }, rules: [
      { subtitle: "Survey Tipleri", content: ["Yıllık (Annual), Ara (Intermediate) ve Özel (Special/Renewal) sörveyler periyodik yapılır", "Karina (drydocking) sörveyi tipik 5 yılda iki kez (en çok 36 ay arayla)"] },
      { subtitle: "Durum Bazlı Bakım (CBM)", content: ["Titreşim, yağ analizi ve termografi ile durum izleme yapılır", "Onaylı PMS/CM düzeni ile sörvey kredisi alınabilir (klas onayı şart)"] },
    ]},
    { title: "Yedek Parça ve Kritik Ekipman", source: { code: "ISM Code", detail: "Kritik ekipman ve stok" }, rules: [
      { subtitle: "Kritik Ekipman Yönetimi", content: ["Ani arızada güvenliği etkileyen ekipman 'kritik' tanımlanır ve test rejimine alınır", "Yedek/standby ekipman için periyodik çalıştırma (changeover) yapılır"] },
      { subtitle: "Yedek Parça Stoğu", content: ["Klas/idare tarafından istenen minimum yedek parça gemide bulundurulur", "Stok seviyeleri ve teslim süreleri PMS ile takip edilir"] },
    ]},
  ],
  "engine-room-safety": [
    { title: "Makine Dairesi Güvenlik Kuralları", source: { code: "SOLAS II-2", detail: "Yangın güvenliği ve acil durdurma" }, rules: [
      { subtitle: "SOLAS II-2 – Yangın Güvenliği", content: ["Makine dairesi A-60 sınıfı bölmelerle çevrilmelidir", "Sabit CO₂ veya FM-200 söndürme sistemi zorunludur", "Hızlı kapatma (quick-closing) valfleri makine dairesi dışından çalışmalıdır", "Ventilatör kapatma: makine dairesi dışından durdurulabilmelidir"] },
      { subtitle: "Acil Durdurma", content: ["Ana makine acil durdurma: köprüüstünden ve makine kontrol odasından", "Yakıt pompaları: makine dairesi dışından durdurulabilmeli", "Ventilatörler: yangın durumunda otomatik veya uzaktan kapatılmalı"] },
    ]},
    { title: "Kapalı Alana Giriş", source: { code: "SOLAS III/19 / IMO Res.A.1050(27)", detail: "Enclosed space entry" }, rules: [
      { subtitle: "Atmosfer Ölçümü", content: ["Girişten önce O₂ ≥ %20,9, toksik gaz ve LEL ölçümü yapılmalıdır", "Ölçüm çoklu seviyelerde (üst/orta/alt) ve sürekli izlemeyle desteklenmelidir"] },
      { subtitle: "Permit ve Tatbikat", content: ["Permit-to-work, gözcü (stand-by) ve kurtarma planı zorunludur", "Kapalı alana giriş ve kurtarma tatbikatı 2 ayda bir yapılmalıdır (SOLAS III/19)"] },
    ]},
    { title: "Sabit Söndürme Sistemleri (FSS)", source: { code: "FSS Code", detail: "Sabit yangın söndürme" }, rules: [
      { subtitle: "Gazlı/Köpüklü Sistemler", content: ["CO₂ salımı öncesi sesli/ışıklı uyarı ve gecikme (time delay) bulunmalıdır", "Salım öncesi mahal tahliyesi ve ventilatör/yakıt kesintisi sağlanmalıdır"] },
      { subtitle: "Su Esaslı Sistemler", content: ["Yerel uygulamalı (local application) su sisi sistemleri yüksek riskli ekipmanı korur", "Sistem basınç/akış testleri periyodik yapılmalıdır"] },
    ]},
  ],
  "environment-machine": [
    { title: "MARPOL – Makine İlgili Hükümler", source: { code: "MARPOL Annex I/IV/VI", detail: "Yağ, atık su ve hava emisyonları" }, rules: [
      { subtitle: "Annex I – Yağlı Atıklar", content: ["15 ppm OWS: denize deşarj limiti", "Sludge tank: tüm gemilerde zorunlu", "Oil Record Book Part I: makine bölümü kayıtları tutulmalıdır", "400 GT üzeri gemiler: OWS veya yağ filtre cihazı zorunlu"] },
      { subtitle: "Annex IV – Atık Su", content: ["Arıtma tesisi çıkışı: coliform ≤ 250/100mL", "12 deniz milinden yakın: arıtılmamış deşarj yasaktır", "3 deniz milinden yakın: arıtılmış bile olsa deşarj yasaktır (kıyıya yakın)"] },
      { subtitle: "Annex VI – Hava Kirliliği", content: ["ODS (ozon tabakasını incelten maddeler): yeni kullanımı yasaktır", "Shipboard incineration: liman ve kıyıda yasaktır (bazı maddeler her yerde)", "IAPP sertifikası: 400 GT üzeri gemilerde zorunlu"] },
    ]},
    { title: "Enerji ve Emisyon İzleme", source: { code: "MARPOL Annex VI Ch.4", detail: "EEXI, CII ve raporlama" }, rules: [
      { subtitle: "EEXI / CII", content: ["EEXI (verimlilik endeksi) ve yıllık CII (A–E derecelendirme) gerekleri sağlanmalıdır", "D/E derecesi alan gemiler düzeltici eylem planı (SEEMP Part III) hazırlar"] },
      { subtitle: "Veri Raporlama", content: ["IMO DCS (≥ 5.000 GT) ve EU MRV kapsamında yakıt/CO₂ verisi raporlanır", "Bunker tüketim ve mesafe verileri doğrulanabilir şekilde tutulur"] },
    ]},
    { title: "Atık ve Madde Yönetimi", source: { code: "MARPOL Annex V/VI", detail: "Çöp, ozon ve VOC" }, rules: [
      { subtitle: "Çöp Yönetimi (Annex V)", content: ["Garbage Management Plan ve Garbage Record Book bulundurulur", "Plastik denize deşarjı kesinlikle yasaktır"] },
      { subtitle: "Ozon ve VOC", content: ["ODS Record Book tutulur; soğutucu kaçakları kayıt altına alınır", "Tankerlerde VOC yönetim planı (uygunsa) uygulanır"] },
    ]},
  ],
  erm: [
    { title: "ERM Kuralları ve Standartları", source: { code: "STCW A-III / ISM Code", detail: "ERM yeterlilik ve insan faktörü" }, rules: [
      { subtitle: "STCW – ERM Yeterlilikleri", content: ["STCW Code A-III/1 ve A-III/2: makine zabitlerinin ERM yeterliliği", "Liderlik ve takım çalışması: yeterlilik değerlendirmesinde zorunlu", "Durumsal farkındalık ve karar verme becerileri değerlendirilir"] },
      { subtitle: "ISM Code – İnsan Faktörü", content: ["İş güvenliği değerlendirmesi: her operasyon öncesi yapılmalıdır", "Yorgunluk yönetimi: çalışma ve dinlenme saatleri kayıt altındadır (MLC 2006)", "İletişim: makine ekibi ve köprüüstü arasında etkili iletişim protokolü"] },
    ]},
    { title: "Takım Çalışması ve İletişim", source: { code: "STCW A-III/1-2", detail: "Resource management" }, rules: [
      { subtitle: "Takım Yönetimi", content: ["Görev dağılımı, önceliklendirme ve iş yükü dengelenmesi yapılır", "Otorite gradyanı düşürülerek (assertiveness) güvenli geri bildirim teşvik edilir"] },
      { subtitle: "Brifing ve Debrief", content: ["Kritik operasyon öncesi brifing, sonrası debrief uygulanır", "Closed-loop iletişim ile komut/onay doğrulanır"] },
    ]},
    { title: "Yorgunluk ve Karar Verme", source: { code: "MLC 2006 / IMO Fatigue Guidelines", detail: "İnsan performansı" }, rules: [
      { subtitle: "Yorgunluk Yönetimi", content: ["Dinlenme saatleri limitlerine uyulmalı, yorgunluk riski değerlendirilmelidir", "Vardiya planlaması ve uyku hijyeni dikkate alınmalıdır"] },
      { subtitle: "Karar Verme", content: ["Durumsal farkındalık kaybı (fixation, complacency) belirtileri izlenir", "Yapılandırılmış karar yöntemleriyle riskler değerlendirilir"] },
    ]},
  ],
  "energy-efficiency": [
    { title: "Enerji Verimliliği Düzenlemeleri", source: { code: "MARPOL Annex VI Ch.4", detail: "EEDI/EEXI/CII/SEEMP" }, rules: [
      { subtitle: "MARPOL Annex VI – Bölüm 4", content: ["EEDI: 2013 sonrası kontrat edilen yeni gemiler için zorunlu", "EEXI: 2023 sonrası tüm mevcut gemiler (400 GT üzeri) için zorunlu", "CII: yıllık karbon yoğunluğu değerlendirmesi (A–E derecelendirme)", "SEEMP Part III: CII hesabı ve iyileştirme planı zorunlu"] },
      { subtitle: "EU MRV ve IMO DCS", content: ["EU MRV: AB limanlarına uğrayan gemiler CO₂ verisi raporlar", "IMO DCS: 5.000 GT üzeri gemiler yakıt tüketimi bildirir", "Her iki sistem de yıllık bazda veri toplar ve raporlar"] },
    ]},
    { title: "EEXI / CII Uygulaması", source: { code: "IMO MEPC.328(76)/MEPC.336(76)", detail: "Hesaplama ve derecelendirme" }, rules: [
      { subtitle: "EEXI Hesabı", content: ["EEXI, gemi tipine bağlı gerekli (required) değerin altında olmalıdır", "Uyum için EPL/ShaPoLi (güç sınırlama) gibi teknik önlemler uygulanabilir"] },
      { subtitle: "CII Derecelendirme", content: ["Yıllık operasyonel CII A–E ile derecelendirilir; eşik değerler her yıl sıkılaşır", "Üç yıl üst üste D veya bir kez E alan gemi düzeltici plan sunmalıdır"] },
    ]},
    { title: "Operasyonel Verimlilik", source: { code: "SEEMP / Best Practice", detail: "Yakıt ve enerji tasarrufu" }, rules: [
      { subtitle: "Seyir Optimizasyonu", content: ["Trim, hız (slow steaming) ve rota/hava optimizasyonu ile tüketim düşürülür", "Tekne/pervane temizliği ve hull performance izlenir"] },
      { subtitle: "Enerji Geri Kazanım", content: ["Atık ısı geri kazanım (WHRS) ve verimli yardımcı yük yönetimi uygulanır", "Shore power (soğuk ütüleme) uygun limanlarda kullanılır"] },
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
            {category.source && (
              <p className="text-xs text-muted-foreground pl-7">
                Kaynak: {category.source.code}
                {category.source.detail ? ` — ${category.source.detail}` : ""}
              </p>
            )}
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
      </div>
    </div>
  );
}
