import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Yedek parça ve malzeme yönetimi",
  roleSlug: "bas-muhendis",
  taskIndex: 5,
  estimatedPages: 25,
  intro: `Baş Mühendis, geminin makine departmanı için kritik yedek parça (spare parts) ve sarf malzemesinin (consumables) kesintisiz tedarikinden, doğru stok seviyesinden ve bütçe disiplininden sorumludur. Bu sorumluluk; MARPOL ve klas tarafından zorunlu kılınan minimum yedeklerin bulundurulması, kritiklik bazlı önceliklendirme, requisition (talep) hazırlığı, tedarik zinciri yönetimi ve servis sertifikalarının takibini kapsar. Bu bölüm, modern bir gemide yedek parça yönetiminin tüm döngüsünü — ihtiyaç tespitinden teslim alıma, stok kontrolünden bütçe raporlamasına kadar — detaylı olarak ele alır.`,
  sources: [
    "IACS UR Z (Unified Requirements — Survey & Certification)",
    "SOLAS Ch. II-1 Reg. 26-28 (machinery spares)",
    "MARPOL Annex I & VI (mandatory spares & equipment)",
    "IMO MSC/Circ. — Minimum spare parts requirements",
    "TMSA (Tanker Management & Self Assessment) Element 5 & 6",
    "OCIMF SIRE 2.0 — Inspection guidelines",
    "Manufacturer Spare Parts Catalogues (MAN ES / WinGD / Wärtsilä)",
  ],
  chapters: [
    {
      heading: "1. Yedek Parça Yönetiminin Temel Çerçevesi",
      lead: `Yedek parça yönetimi, sadece bir depo işlemi değil; geminin operasyonel sürekliliğini ve emniyetini koruyan stratejik bir mühendislik fonksiyonudur.`,
      sections: [
        {
          subheading: "1.1 Kritiklik bazlı sınıflandırma",
          paragraphs: [
            `Her yedek parça, ekipmanın kritikliğine göre sınıflandırılır. "Critical spare", arızası gemiyi seyirden alıkoyacak (off-hire) veya emniyeti tehlikeye atacak parçadır: ana makine exhaust valve, fuel injector, fuel pump plunger, T/C şaft yatağı, jeneratör krank yatağı gibi. Bu parçalar her zaman gemide minimum belirlenen adette bulundurulur.`,
            `İkinci kategori "insurance spare"dır — nadir arızalanan ancak temin süresi uzun, arıza halinde ciddi off-hire yaratan parçalar (örn. ana makine silindir kapağı, krank şaftı yatak yarımı). Üçüncü kategori "running spare/consumable"dır: conta, o-ring, filtre, V-kayışı, gland packing gibi sık değişen kalemler. Baş Mühendis bu üç kategoriyi ayrı stok stratejisiyle yönetir.`,
          ],
        },
        {
          subheading: "1.2 Zorunlu (mandatory) yedekler",
          paragraphs: [
            `SOLAS ve klas kuralları, ana makine ve essential auxiliary için minimum yedek parça listesini zorunlu kılar (örn. yedek piston ring seti, exhaust valve, fuel injector, yatak yarımları). Single-engine gemilerde bu liste daha geniştir. MARPOL Annex I & VI ise OWS membranları, 15 ppm alarm yedek hücresi, scrubber kimyasalları gibi çevre ekipmanı yedeklerini gerektirir.`,
            `PSC ve klas surveyor, bu zorunlu yedeklerin fiziksel mevcudiyetini ve sertifika eşleşmesini denetler. Eksik bir mandatory spare, "deficiency" kaydı ve ağır durumda detention sebebidir. Baş Mühendis, bu listeyi inventory'de ayrı bir "do-not-use without replenishment" etiketiyle yönetir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS II-1 ve klas zorunlu yedekleri",
              text: `Ana makine ve essential auxiliary için minimum spare listesi klas kuralıyla sabittir. Bu yedeklerin tüketilmesi durumunda derhal ikmal talebi açılır; survey öncesi liste fiziksel sayımla doğrulanır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Stok Kontrolü ve Envanter Yönetimi",
      sections: [
        {
          subheading: "2.1 Min-Max stok seviyeleri",
          paragraphs: [
            `Her kalem için minimum (reorder point) ve maksimum stok seviyesi tanımlanır. Minimum seviye; tüketim hızı (consumption rate), tedarik süresi (lead time) ve emniyet stoğu (safety stock) dikkate alınarak hesaplanır. Reorder point = (ortalama günlük tüketim × lead time) + safety stock formülüyle belirlenir.`,
            `PMS/ERP yazılımı (AMOS, ShipManager, Star IPS, TM Master) bu seviyeleri otomatik izler ve minimum altına düşen kalemler için uyarı üretir. Baş Mühendis bu uyarıları haftalık gözden geçirir ve requisition'a dönüştürür.`,
          ],
          table: {
            caption: `Örnek kritik yedek stok yönetim matrisi`,
            headers: ["Kalem", "Kategori", "Min. Stok", "Lead Time", "Strateji"],
            rows: [
              ["Fuel injector (ME)", "Critical", "1 set/silindir", "2-4 hafta", "Daima stokta"],
              ["Exhaust valve spindle", "Critical", "1 adet", "4-8 hafta", "Daima stokta"],
              ["Yağ/yakıt filtre eleman", "Consumable", "2-3 ay tüketim", "1-2 hafta", "Sürekli ikmal"],
              ["O-ring / conta seti", "Consumable", "6 ay tüketim", "1 hafta", "Toplu sipariş"],
              ["Jeneratör yatak yarımı", "Insurance", "1 set", "6-12 hafta", "Stok + sigorta"],
              ["Silindir kapağı (ME)", "Insurance", "1 adet", "8-16 hafta", "Stok zorunlu"],
            ],
          },
        },
        {
          subheading: "2.2 Fiziksel envanter ve lokasyon yönetimi",
          paragraphs: [
            `Yedekler, makine deposu (engine store) içinde sistematik bin/rack numarasıyla etiketlenir. Her parçanın PMS'teki kayıtla (part number, manufacturer, location) eşleşmesi şarttır. Yanlış lokasyon kaydı, acil arızada parçanın bulunamamasına ve gereksiz mükerrer siparişe yol açar.`,
            `Yılda en az bir kez fiziksel sayım (stock-take) yapılır; PMS kaydı ile fiili stok karşılaştırılır ve sapmalar düzeltilir. Survey ve handover öncesi sayım kritiktir. Nemli ortamda korozyona açık parçalar VCI (Volatile Corrosion Inhibitor) ambalajda ve gres koruyuculu saklanır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Lokasyon disiplini",
              text: `Acil bir gece arızasında doğru parçayı 5 dakikada bulabilmek, sistematik bin numaralandırma ve güncel PMS lokasyon kaydının doğrudan sonucudur. "Parça var ama yeri bilinmiyor" durumu, fiilen "parça yok" demektir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Sipariş Planlaması ve Requisition Süreci",
      sections: [
        {
          subheading: "3.1 Requisition hazırlığı ve önceliklendirme",
          paragraphs: [
            `Requisition, parçanın tam tanımıyla hazırlanır: maker, type/model, part number (drawing/position no), miktar, gerekçe ve aciliyet kodu. Belirsiz tanım ("pompa için conta") yanlış tedarike ve gecikmeye yol açar; her zaman maker katalog pozisyon numarası kullanılır.`,
            `Aciliyet kodlaması tipiktir: AOG/urgent (vessel operasyonu durma riski), normal (planlı bakım için), routine (stok tamamlama). Baş Mühendis, urgent siparişleri gerçekten kritik olanlarla sınırlar; aşırı "urgent" kullanımı hem maliyet hem güvenilirlik kaybıdır.`,
          ],
        },
        {
          subheading: "3.2 Tedarik zinciri ve teslim limanı planlaması",
          paragraphs: [
            `Sipariş, geminin sefer planına göre uygun bir teslim limanına yönlendirilir. Spares, ship's agent aracılığıyla veya forwarder ile teslim edilir; gümrük (in-transit/under bond) süreçleri ve teslimat penceresi sefer planıyla senkronize edilmelidir. Yanlış zamanlanmış teslim, parçanın gemiye yetişememesine neden olur.`,
            `Ağır/büyük parçalar (silindir kapağı, krank yatağı) için drydock veya uygun liman planlaması yapılır; vinç kapasitesi ve manifold/erişim hazırlığı önceden değerlendirilir. Tehlikeli madde içeren consumable (kimyasal, gaz tüpü) için IMDG sevkiyat dokümantasyonu gereklidir.`,
          ],
        },
      ],
    },
    {
      heading: "4. Bütçe Yönetimi ve Maliyet Kontrolü",
      sections: [
        {
          subheading: "4.1 OPEX bütçesi ve harcama disiplini",
          paragraphs: [
            `Makine yedek parça ve sarf bütçesi, geminin yıllık OPEX'inin önemli bir kalemidir. Baş Mühendis, şirketin (Superintendent) onayladığı yıllık bütçe çerçevesinde harcama yapar ve aylık olarak gerçekleşen/bütçe (actual vs budget) sapmasını raporlar. Plansız büyük arızalar bütçeyi zorlar; bu nedenle predictive maintenance ile arızayı öngörmek doğrudan maliyet tasarrufudur.`,
            `Harcama kontrolünde "total cost of ownership" yaklaşımı esastır: ucuz ama düşük kaliteli (örn. OEM olmayan) yedek, kısa ömrü ve arıza riskiyle uzun vadede daha pahalıya gelebilir. Baş Mühendis kalite-maliyet dengesini ekipman kritikliğine göre kurar.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka dersi: ucuz conta pahalıya patladı",
              text: `OEM dışı bir HT cooling pump mekanik salmastrası, %40 daha ucuza temin edildi. Üç ay içinde sızdırdı; jacket cooling kaybı yaşandı, motor yükü düşürüldü ve acil yedek için urgent sipariş ile yüksek nakliye masrafı çıktı. Toplam maliyet, OEM parçanın 3 katı oldu. Ders: kritik ekipmanda OEM esastır.`,
            },
          ],
        },
        {
          subheading: "4.2 Sürdürülebilir tüketim ve israf kontrolü",
          paragraphs: [
            `Sarf malzemesi tüketimi (yağ, gres, kimyasal, filtre) trend olarak izlenir. Anormal tüketim artışı; ya bir gizli arızanın (örn. yağ kaçağı) ya da disiplinsiz kullanımın işaretidir. Baş Mühendis, consumption log'u inceleyerek hem maliyeti kontrol eder hem de gizli teknik problemleri erken yakalar.`,
            `Atık ve sona eren raf ömürlü kimyasalların (shelf-life expired) yönetimi de maliyet ve çevre açısından önemlidir. FIFO (first-in-first-out) prensibiyle eski stok önce tüketilir; raf ömrü dolan kimyasal MARPOL Annex V/uygun atık prosedürüyle bertaraf edilir.`,
          ],
        },
      ],
    },
    {
      heading: "5. Servis Sertifikaları ve Ekipman İzlenebilirliği",
      sections: [
        {
          subheading: "5.1 Sertifikalı ekipman ve geçerlilik takibi",
          paragraphs: [
            `Belirli ekipman ve donanım, periyodik servis ve sertifika gerektirir: yangın söndürücüler, can salları (life rafts), EEBD, SCBA, kaldırma ekipmanı (lifting gear/LOLER), basınçlı kaplar, kalibre ölçüm cihazları (gas detectors, OWS 15 ppm monitor). Baş Mühendis, makine departmanına ait bu kalemlerin sertifika geçerlilik tarihlerini PMS'te takip eder.`,
            `Süresi dolmuş bir servis sertifikası (örn. CO2 sistem servisi, lifting gear test) hem PSC deficiency hem emniyet riskidir. Servis pencereleri, sefer planına ve uygun servis sağlayıcı bulunan limanlara göre önceden planlanır.`,
          ],
          table: {
            caption: `Tipik makine departmanı sertifikalı kalemler ve servis aralıkları`,
            headers: ["Ekipman", "Servis/Sertifika Aralığı", "Sorumlu Otorite"],
            rows: [
              ["CO2 fixed system", "Yıllık + 5 yıl basınç testi", "Onaylı servis firması"],
              ["Lifting gear (LOLER)", "12 ay", "Yetkili kuruluş"],
              ["OWS 15 ppm monitor", "Üreticiye göre kalibrasyon", "Maker/onaylı servis"],
              ["Portable gas detectors", "6-12 ay kalibrasyon", "Onaylı lab"],
              ["Yangın söndürücüler", "Yıllık + hidrostatik test", "Onaylı servis"],
              ["Emergency air compressor", "Klas survey döngüsü", "Klas surveyor"],
            ],
          },
        },
        {
          subheading: "5.2 İzlenebilirlik ve dokümantasyon",
          paragraphs: [
            `Kritik parçaların (örn. krank yatağı, exhaust valve) batch/serial number izlenebilirliği tutulur; bu, bir maker recall veya tekrarlayan arıza analizinde gereklidir. Takılan yedek parçanın takılış tarihi, çalışma saati ve sökülen parçanın durumu PMS work order'a kaydedilir.`,
          ],
        },
      ],
    },
    {
      heading: "6. PMS Entegrasyonu ve Dijital Yönetim",
      sections: [
        {
          subheading: "6.1 PMS-stok entegrasyonu",
          paragraphs: [
            `Modern PMS sistemlerinde her work order, kullanılan yedek parçayı otomatik stoktan düşer (issue). Bu entegrasyon, gerçek tüketimi izlenebilir kılar ve manuel hata payını azaltır. Baş Mühendis, work order kapatılırken parça tüketiminin doğru işlendiğini denetler; aksi halde envanter güvenilirliği bozulur.`,
            `Şirket merkezi (ofis) ile gemi arasında veri senkronizasyonu (replication) düzenli yapılır; böylece Superintendent gemi stoğunu uzaktan görür ve filo bazında toplu satınalma (frame agreement) avantajı kurulabilir.`,
          ],
        },
        {
          subheading: "6.2 Veri kalitesi ve master data yönetimi",
          paragraphs: [
            `Yedek parça veritabanının doğruluğu (master data quality) tüm sistemin temelidir: yanlış part number, eksik maker bilgisi veya kopya kayıtlar, hem siparişte hem stokta hataya yol açar. Baş Mühendis ve makine ekibi, yeni ekipman gemiye girdiğinde maker spare list'ini PMS'e eksiksiz işlemekle sorumludur.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Hayalet stok riski",
              text: `Work order'da tüketilen ama stoktan düşülmeyen parça, sistemde "var" görünür ama fiilen "yoktur" (hayalet stok). Bu durum, acil arızada parçanın bulunamamasıyla ortaya çıkar. Tüketimin anında ve doğru işlenmesi şarttır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. Survey, Vetting ve Denetim Hazırlığı",
      sections: [
        {
          subheading: "7.1 Vetting ve TMSA beklentileri",
          paragraphs: [
            `Tanker vetting (OCIMF SIRE 2.0) ve TMSA denetiminde, kritik yedek parçaların mevcudiyeti, stok yönetim sisteminin işlerliği ve consumption kayıtlarının tutarlılığı sorgulanır. Inspector, rastgele bir kritik parçayı fiziksel olarak görmek isteyebilir; PMS kaydı ile fiili stok eşleşmemesi gözlem (observation) yaratır.`,
            `TMSA Element 5 ve 6 (technical management ve maintenance) kapsamında, planlı satınalma, frame agreement kullanımı ve maliyet kontrolü kanıtlanmalıdır. Baş Mühendis, requisition geçmişi ve bütçe raporlarıyla bu yetkinliği belgeler.`,
          ],
        },
        {
          subheading: "7.2 Survey öncesi yedek kontrolü",
          paragraphs: [
            `Klas survey öncesi, zorunlu (mandatory) yedek listesi fiziksel sayımla doğrulanır; eksik kalemler için acil ikmal başlatılır. Survey'de kullanılacak yedek parçalar (örn. overhaul edilecek exhaust valve için yeni spindle/seat) önceden gemiye getirilir; aksi halde survey ertelenir ve maliyet/off-hire artar.`,
          ],
        },
      ],
    },
    {
      heading: "8. Devir-Teslim ve Süreklilik",
      sections: [
        {
          subheading: "8.1 Handover ve stok devri",
          paragraphs: [
            `Baş Mühendis değişiminde (handover), açık requisition'lar, beklenen teslimatlar, kritik stok durumu ve bütçe gerçekleşmesi yazılı handover notunda devredilir. Gelen Baş Mühendis, fiziksel stok ile PMS kaydını karşılaştırarak göreve başlar; tespit edilen sapmalar handover'da kayıt altına alınır.`,
            `Bu süreklilik, geminin yedek parça güvenilirliğinin tek kişiye bağlı kalmamasını sağlar. İyi tutulan envanter ve net handover, yeni Baş Mühendisin ilk günden itibaren doğru kararlar almasını mümkün kılar.`,
          ],
        },
        {
          subheading: "8.2 Pratik Kontrol Listesi",
          paragraphs: [
            `Aşağıdaki kontrol listesi, Baş Mühendisin yedek parça ve malzeme yönetiminde sistematik kalmasını sağlar:`,
          ],
          bullets: [
            "Zorunlu (mandatory) klas/MARPOL yedek listesi fiziksel olarak doğrulandı mı?",
            "Kritik yedeklerin min-max stok seviyeleri PMS'te tanımlı ve güncel mi?",
            "Minimum altına düşen kalemler için requisition açıldı mı?",
            "Requisition'larda maker part number ve doğru aciliyet kodu kullanıldı mı?",
            "Teslimat limanı sefer planıyla senkronize mi?",
            "Aylık actual vs budget sapması raporlandı mı?",
            "Sertifikalı ekipmanın (CO2, lifting gear, gas detector) geçerlilikleri takipte mi?",
            "Work order'larda parça tüketimi doğru işlendi mi (hayalet stok yok)?",
            "Yıllık fiziksel stok sayımı (stock-take) yapıldı ve sapmalar düzeltildi mi?",
            "Handover notu açık siparişler ve kritik stok durumunu içeriyor mu?",
          ],
        },
        {
          subheading: "8.3 Sonuç",
          paragraphs: [
            `Yedek parça ve malzeme yönetimi, geminin operasyonel güvenilirliği ile maliyet etkinliğini aynı anda korumayı gerektiren bir denge sanatıdır. Baş Mühendis; ne aşırı stok bağlayarak sermaye israf eder, ne de kritik parçayı eksik bırakarak off-hire riskini göze alır. Sistematik kritiklik analizi, disiplinli envanter ve doğru zamanlı tedarik, bu dengenin teknik temelidir.`,
          ],
        },
      ],
    },
  ],
};

export default content;
