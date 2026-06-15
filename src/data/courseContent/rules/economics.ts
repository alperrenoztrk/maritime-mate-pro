import type { RuleGroup } from "@/data/courseContent/types";

/**
 * Deniz ticareti / ekonomi kuralları.
 *
 * Bu dosyada bağlı bir bespoke sayfa YOKTUR; içerik gerçek ticari deniz hukuku
 * ve standart formlardan ilke düzeyinde derlenmiştir. Uydurma sayısal eşik
 * verilmemiş, atıflar (Hague-Visby, Incoterms 2020, BIMCO formları vb.)
 * korunmuştur.
 */
export const economicsRules: RuleGroup[] = [
  {
    title: "Çarter Parti (Charter Party) Türleri",
    source: {
      code: "Çarter Parti Sözleşmeleri",
      detail: "BIMCO / standart deniz ticareti uygulaması",
    },
    rules: [
      {
        subtitle: "Temel Çarter Türleri",
        content: [
          "Voyage Charter (Sefer Çarteri): Donatan, belirli bir yükü bir limandan diğerine taşımayı taahhüt eder; navlun yük miktarı veya götürü (lumpsum) üzerinden ödenir.",
          "Time Charter (Zaman Çarteri): Gemi belirli bir süre için kiralanır; kiracı seferleri yönetir, kira (hire) genellikle günlük olarak peşin ödenir.",
          "Bareboat / Demise Charter (Çıplak Gemi Çarteri): Kiracı gemiyi mürettebatsız teslim alır; geminin işletim ve seyir sorumluluğunu tümüyle üstlenir.",
          "Contract of Affreightment (COA): Belirli bir dönemde, ardışık seferlerle toplam bir yük miktarının taşınmasını öngören çerçeve sözleşme.",
        ],
      },
      {
        subtitle: "Önemli Çarter Klozları",
        content: [
          "Safe Port / Safe Berth: Kiracı, geminin güvenle ulaşıp ayrılabileceği emniyetli liman ve rıhtım göstermekle yükümlüdür.",
          "Off-hire Klozu: Gemi arıza, kuru havuz veya kiracı kusuru dışı nedenlerle hizmet veremezse kira durur.",
          "Ice Clause / War Risk Clause: Buz ve savaş riski hâllerinde tarafların hak ve yükümlülüklerini düzenler.",
          "Cancelling (Canceling) Date: Gemi belirtilen tarihe kadar yükleme limanına hazır olmazsa kiracı sözleşmeyi feshedebilir.",
        ],
      },
    ],
  },
  {
    title: "Laytime, Demuraj ve Despatch",
    source: {
      code: "Laytime / Demurrage",
      detail: "Laytime Definitions for Charter Parties (BIMCO et al.)",
    },
    rules: [
      {
        subtitle: "Laytime (Yükleme/Boşaltma Süresi)",
        content: [
          "Laytime, yük elleçleme için kiracıya tanınan ve navluna dahil edilmiş süredir.",
          "Süre genellikle 'running days', 'weather working days' veya 'SHINC/SHEX' (Pazar ve tatiller dahil/hariç) esasıyla tanımlanır.",
          "Laytime, kural olarak geçerli bir NOR (Notice of Readiness) verilip kabul edildikten sonra işlemeye başlar.",
        ],
      },
      {
        subtitle: "Demuraj ve Despatch",
        content: [
          "Demurrage (Demuraj): Laytime aşıldığında kiracının donatana ödediği, sözleşmede belirlenen günlük gecikme tazminatıdır ('once on demurrage, always on demurrage' ilkesi geçerlidir).",
          "Despatch Money: Laytime'dan önce iş bitirilirse donatanın kiracıya ödediği prim olup tipik olarak demuraj oranının yarısıdır.",
          "Detention: Laytime ve demuraj kapsamı dışındaki süre kayıpları için talep edilen ayrı bir tazminattır.",
        ],
      },
    ],
  },
  {
    title: "Notice of Readiness (NOR)",
    source: {
      code: "NOR",
      detail: "Notice of Readiness — charter party uygulaması",
    },
    rules: [
      {
        subtitle: "NOR'un Geçerlilik Şartları",
        content: [
          "Gemi yükleme/boşaltma için fiilen ve hukuken hazır (ready in all respects) olmalıdır.",
          "Gemi sözleşmeye göre 'arrived ship' niteliği kazanmış olmalıdır (berth/port charter ayrımına göre).",
          "NOR, sözleşmede belirtilen yer, zaman ve şekilde (mesai saatleri içinde, belirtilen yöntemle) verilmelidir.",
          "Geçersiz NOR laytime'ı başlatmaz; bu durum demuraj hesaplarında ihtilaf yaratabilir.",
        ],
      },
    ],
  },
  {
    title: "Konişmento (Bill of Lading) ve Hague-Visby",
    source: {
      code: "Hague-Visby Kuralları",
      detail: "Hague Rules 1924 / Visby Protocol 1968",
    },
    rules: [
      {
        subtitle: "Konişmentonun İşlevleri",
        content: [
          "Yük teslim alındı makbuzu (receipt) işlevi görür.",
          "Taşıma sözleşmesinin delili (evidence of contract of carriage) niteliğindedir.",
          "Malı temsil eden kıymetli evrak (document of title) olup ciro ile devredilebilir.",
        ],
      },
      {
        subtitle: "Taşıyanın Sorumluluk ve İstisnaları",
        content: [
          "Taşıyan, geminin denize elverişliliğini (seaworthiness) sefer başlangıcında gerekli özeni göstererek sağlamakla yükümlüdür.",
          "Sorumluluk sınırı paket/birim veya brüt kilo başına SDR cinsinden belirlenir (Visby ile getirilen 'package or kilo' limiti).",
          "Nautical fault (seyir/yönetim hatası) ve yangın gibi belirli hâllerde taşıyan sorumluluktan kurtulabilir.",
          "Hamburg Kuralları ve Rotterdam Kuralları, Hague-Visby'ye alternatif rejimler olarak farklı sorumluluk dengeleri öngörür.",
        ],
      },
    ],
  },
  {
    title: "Incoterms 2020 Temelleri",
    source: {
      code: "Incoterms 2020",
      detail: "ICC International Commercial Terms",
    },
    rules: [
      {
        subtitle: "Her Türlü Taşıma Modu",
        content: [
          "EXW (Ex Works): Satıcı malı kendi işyerinde hazır eder; risk ve masraf büyük ölçüde alıcıdadır.",
          "FCA (Free Carrier): Satıcı malı belirlenen yerde taşıyıcıya teslim eder.",
          "CPT / CIP: Satıcı navlunu (ve CIP'te sigortayı) öder; risk ilk taşıyıcıya teslimle alıcıya geçer.",
          "DAP / DPU / DDP: Teslim varış yerinde gerçekleşir; DDP'de gümrük ve ithalat vergileri satıcıya aittir.",
        ],
      },
      {
        subtitle: "Yalnızca Deniz/İç Su Yolu Taşıması",
        content: [
          "FAS (Free Alongside Ship): Mal, yükleme limanında gemi doğrultusunda teslim edilir.",
          "FOB (Free On Board): Risk, mal gemiye yüklendiğinde alıcıya geçer.",
          "CFR (Cost and Freight): Satıcı navlunu öder; risk gemiye yükleme ile geçer.",
          "CIF (Cost, Insurance and Freight): CFR'ye ek olarak satıcı asgari deniz sigortasını da sağlar.",
        ],
      },
    ],
  },
  {
    title: "BIMCO Standart Formları",
    source: {
      code: "BIMCO",
      detail: "Baltic and International Maritime Council standart formları",
    },
    rules: [
      {
        subtitle: "Yaygın Standart Formlar",
        content: [
          "GENCON: Genel amaçlı sefer çarteri (voyage charter) formu.",
          "NYPE / BALTIME: Zaman çarteri (time charter) formları.",
          "BARECON: Çıplak gemi (bareboat) çarteri formu.",
          "CONGENBILL: GENCON ile uyumlu konişmento formu.",
          "SUPPLYTIME: Açık deniz (offshore) destek gemileri için zaman çarteri formu.",
        ],
      },
    ],
  },
  {
    title: "P&I ve H&M Sigortası Temelleri",
    source: {
      code: "Deniz Sigortası",
      detail: "P&I Clubs / Hull & Machinery uygulaması",
    },
    rules: [
      {
        subtitle: "Başlıca Sigorta Türleri",
        content: [
          "H&M (Hull & Machinery): Geminin gövde ve makine hasarlarını, çatma sorumluluğunun bir kısmını ve genel avaryayı kapsayan mal sigortasıdır.",
          "P&I (Protection & Indemnity): Karşılıklı sigorta kulüpleri tarafından sağlanan, üçüncü şahıs sorumluluklarını (yük zararı, çevre kirliliği, mürettebat ve yolcu zararları) kapsayan koruma.",
          "FD&D (Freight, Demurrage & Defence): Ticari ihtilaflarda hukuki masraf ve danışmanlığı kapsayan ek koruma.",
        ],
      },
      {
        subtitle: "Temel İlkeler",
        content: [
          "General Average (Genel Avarya): Ortak deniz sergüzeştinde gemi ve yükü kurtarmak için yapılan fedakârlık ve masrafların York-Antwerp Kuralları çerçevesinde menfaat sahipleri arasında paylaştırılmasıdır.",
          "Particular Average: Yalnızca ilgili menfaat sahibine ait kısmi zarardır; paylaşıma tabi değildir.",
          "Sigortalı, uberrimae fidei (azami iyi niyet) ilkesi gereği rizikoya ilişkin tüm önemli bilgileri sigortacıya açıklamakla yükümlüdür.",
        ],
      },
    ],
  },
];
