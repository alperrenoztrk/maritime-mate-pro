import type { RuleGroup } from "@/data/courseContent/types";

export const stabilityRules: RuleGroup[] = [
  {
    title: "2008 IS Code — Hasarsız (Intakt) Stabilite",
    source: { code: "IMO 2008 IS Code (MSC.267(85))", url: "https://www.imo.org/en/publications" },
    rules: [
      {
        subtitle: "Kriterler",
        content: [
          "GZ eğrisi alanı: 0°–30° ≥ 0.055 m·rad; 0°–40° (veya taşma açısına kadar) ≥ 0.090 m·rad; 30°–40° ≥ 0.030 m·rad.",
          "Maksimum GZ ≥ 0.20 m ve tepe açısı θ ≥ 30°.",
          "Başlangıç GM (GM0) ≥ 0.15 m (çelik kuru yük, genel kargo vb. için tipik taban değer).",
          "Pozitif stabilite menzili en az 30°; borda kesim hattı (deck edge) tercihen 30°’den sonra batmalı.",
          "Hava koşulu kriteri (Weather Criterion): 26–40 m/s rüzgârda denge açısı θw ≤ 16° veya θdeck’in %80’i (hangisi küçükse).",
          "Hava koşulu kriteri (Weather Criterion): Aynı sınırlayıcı açıya kadar kalan GZ alanı, rüzgâr devirmesine karşı en az %40 fazlalık göstermeli.",
        ],
      },
    ],
  },
  {
    title: "International Grain Code — Tahıl Yükleri",
    source: { code: "International Grain Code", url: "https://www.imo.org/en/publications" },
    rules: [
      {
        subtitle: "Tahıl Stabilite Şartları",
        content: [
          "Düzeltilmiş GM (GMcorr) ≥ 0.30 m (serbest yüzey ve tahıl kayması düzeltmeleri dahil).",
          "Tahıl kaymasıyla oluşan denge açısı θ ≤ 12° veya borda kesim hattı batma açısından küçük olanı.",
          "Her yükleme durumu için onaylı Grain Loading Manual’daki kriterler doğrulanmalı ve DOA (Document of Authorization) gemide bulundurulmalı.",
        ],
      },
    ],
  },
  {
    title: "SOLAS II‑1 — Olasılıksal Hasar Stabilitesi",
    source: { code: "SOLAS 1974, Bölüm II‑1", url: "https://www.imo.org/en/publications" },
    rules: [
      {
        subtitle: "Olasılıksal Yöntem ve Kriterler",
        content: [
          "Olasılıksal yöntem: A = Σ(s × p). Burada s: hasar sonrası sağkalım katsayısı, p: o hasarın meydana gelme olasılığı (bölme uzunluğu/konumuna bağlı).",
          "R: Gemi boyuna bağlı olarak yönetmelikte tablolarla verilen “gerekli” değerdir.",
          "Kriter: A ≥ R sağlanmalıdır; değilse bölümlendirme/stabilite yetersiz kabul edilir.",
          "Hasarlı durumda son durum: serbest yüzey/trim etkileriyle birlikte can salı indirme ve erişim koşulları sağlanmalı.",
          "Damage Control Plan/Booklet gemide; su geçmez kapılar ve uzaktan kumandalar ile ölçüm noktaları plan üzerinde gösterilmeli.",
        ],
      },
    ],
  },
  {
    title: "Timber Deck Cargo Code — Güverte Tomruk",
    source: { code: "2011 Timber Deck Cargo Code", url: "https://www.imo.org/en/publications" },
    rules: [
      {
        subtitle: "Güverte Tomruk Yükü Şartları",
        content: [
          "Yığın yüksekliği/eğim ve bağlama (stanchion, tel, çember) MSL esaslı hesaplarla doğrulanmalı.",
          "Kötü hava için işletme talimatları: güverte drenajı, güverte erişimi ve görüş koşulları sağlanmalı.",
          "Yükleme örnekleri için IS Code kriterlerine ilave emniyet marjı korunmalı.",
        ],
      },
    ],
  },
  {
    title: "IBC/IGC — Kimyasal ve Gaz Tankerleri",
    source: { code: "IBC Code / IGC Code", url: "https://www.imo.org/en/publications" },
    rules: [
      {
        subtitle: "Stabilite Şartları",
        content: [
          "Kargo tipine bağlı intakt ve hasar stabilitesi şartları (survival capability) sağlanmalı.",
          "Her onaylı yükleme durumu için stabilite cihazı ile doğrulama yapılmalı; model/doğrulama sertifikaları güncel olmalı.",
        ],
      },
      {
        subtitle: "Eklenebilecekler",
        content: [
          "Sızıntı senaryoları: Kargo sızıntısı halinde serbest yüzey, KG değişimi ve heeling moment etkilerini içeren hassasiyet analizleri.",
          "Buharlaşma etkileri: Uçucu kargolarda buharlaşmanın kütle/yoğunluk ve KG üzerindeki etkilerini dikkate alan yöntemler.",
        ],
      },
      {
        subtitle: "Güncellenmesi Gerekenler",
        content: [
          "Kargo tipleri: Yeni kimyasal ve gaz kargo tipleri için (IBC/IGC son ekleri uyarınca) ilave stabilite gereksinimlerinin eklenmesi.",
        ],
      },
    ],
  },
  {
    title: "Polar Code — Kutup Suları Operasyonları",
    source: { code: "Polar Code (MSC.385(94))", url: "https://www.imo.org/en/publications" },
    rules: [
      {
        subtitle: "Kutup Suları Şartları",
        content: [
          "Buz tutması (icing) için KG artışı muhafaza edilerek yeterli GM ve GZ marjı korunmalı.",
          "PWOM’da belirtilen operasyon limitleri ve acil durum prosedürleri uygulanmalı.",
        ],
      },
    ],
  },
  {
    title: "CSS Code (Annex 13) — CSM Bağlama Hesaplarına Esas Sayılar",
    source: { code: "CSS Code, Annex 13", url: "https://www.imo.org/en/publications" },
    rules: [
      {
        subtitle: "Bağlama Hesabı Sayıları",
        content: [
          "Tipik sürtünme katsayıları: çelik/çelik μ ≈ 0.10; çelik/ahşap μ ≈ 0.30; ahşap/ahşap μ ≈ 0.40; kauçuk/çelik μ ≈ 0.60 (kuru, yağsız yüzey varsayımı).",
          "MSL (Maximum Securing Load) ve ivme katsayıları (long., transv., vert.) gemi boyu ve servis hızına göre Annex 13 tablolarından seçilir.",
        ],
      },
    ],
  },
  {
    title: "Stockholm Agreement — Ro‑Ro Yolcu (Bölgesel Ek Şartlar)",
    source: { code: "Stockholm Agreement (Ro‑Ro Passenger Ships)", url: "https://www.imo.org/en/publications" },
    rules: [
      {
        subtitle: "Ek Hasar Stabilitesi Şartları",
        content: [
          "Araç güvertesinde su birikmesi etkisi: hesabında tipik varsayım 0.50 m su yüksekliği (yönergedeki tablolara göre) ve uygun permeabilite ile dikkate alınır.",
          "Su birikmesi dahil hasar stabilitesi değerlendirmesinde A ≥ R şartı korunmalı; can salı/evakuasyon koşulları sağlanmalı.",
        ],
      },
    ],
  },
  {
    title: "Balıkçı Gemileri — Güvenlik Kodu (2005/2012) ve Cape Town Agreement",
    source: { code: "FAO/ILO/IMO Code of Safety for Fishermen & Fishing Vessels (2005/2012); Cape Town Agreement (2012)", url: "https://www.imo.org/en/OurWork/Safety/Pages/CTA.aspx" },
    rules: [
      {
        subtitle: "Balıkçı Gemisi Stabilite Şartları",
        content: [
          "Başlangıç GM (GM0) için tipik taban değer ≥ 0.35 m (boy ve tasarıma bağlı idare talimatları esas).",
          "GZ alan kriterleri çoğunlukla IS Code ile uyumlu (örn. 0°–30° ≥ 0.055 m·rad).",
          "Düşük serbest borda ve icing riski için ek GM marjı ve operasyon sınırlamaları uygulanmalı.",
        ],
      },
    ],
  },
  {
    title: "OSV / SPS — Offshore Supply ve Special Purpose Ships",
    source: { code: "OSV Code (2006/2020); SPS Code (2008)", url: "https://www.imo.org/en/publications" },
    rules: [
      {
        subtitle: "OSV/SPS Stabilite Şartları",
        content: [
          "IS Code kriterleri taban alınır; yük ve personel yoğunluğuna göre minimum GM genellikle ≥ 0.15 m olarak idarelerce talep edilir.",
          "Yük güvertesi serbest yüzey ve yüksek KG etkileri için ek marj ve operasyon limitleri uygulanır.",
        ],
      },
    ],
  },
  {
    title: "HSC Code — Yüksek Hızlı Tekneler",
    source: { code: "HSC Code (1994/2000)", url: "https://www.imo.org/en/publications" },
    rules: [
      {
        subtitle: "Yüksek Hızlı Tekne Şartları",
        content: [
          "Yolcu taraflanması/viraj testi altında statik yalpa açısı tipik sınır ≤ 10°.",
          "Minimum GM çoğu konfigürasyonda ≥ 0.15 m; fakat hız, gövde tipi ve seakeeping gereksinimlerine bağlı özel denge testleri uygulanır.",
        ],
      },
    ],
  },
  {
    title: "MODU Code — Mobil Açık Deniz Üniteleri",
    source: { code: "MODU Code (2009)", url: "https://www.imo.org/en/publications" },
    rules: [
      {
        subtitle: "MODU Stabilite Şartları",
        content: [
          "Rüzgâr hızları: işletme durumu için tipik 36 m/s, fırtına/survival durumu için 51.5 m/s eşdeğer rüzgâr; heeling moment buna göre alınır.",
          "Righting/Heeling moment eğrisi karşılaştırması ile yeterli emniyet marjı gösterilir; pozitif stabilite menzili ve hava boşluğu (air gap) kontrol edilir.",
        ],
      },
    ],
  },
  {
    title: "Load Line (LL) — Yükleme Sınırı Sözleşmesi Bağlantıları",
    source: { code: "International Load Line Convention (1966/1988)", url: "https://www.imo.org/en/publications" },
    rules: [
      {
        subtitle: "Fribord ve Taşma Açısı Bağlantıları",
        content: [
          "Minimum fribord ve kaporta/üstyapı bütünlüğü; downflooding açıları ve muhtemel su giriş yolları stabilite analizinde sınırlandırıcıdır.",
          "Stabilite kitapçığındaki taşma (downflooding) açısı gemi bütünlük şartları ile tutarlı olmalı; LL işaretlemeleri ile çelişmemelidir.",
        ],
      },
    ],
  },
];
