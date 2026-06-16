import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Harita ve nautikal yayın yönetimi",
  roleSlug: "ikinci-zabit",
  taskIndex: 1,
  estimatedPages: 25,
  intro: `İkinci Zabit (Second Officer / Navigation Officer), gemideki kâğıt ve elektronik haritalar ile tüm nautikal yayınların (publications) güncel, düzeltilmiş ve sefere hazır tutulmasının baş sorumlusudur. Haftalık Notices to Mariners (NtM), T&P (Temporary & Preliminary) bildirimleri, NAVAREA/NAVTEX seyir uyarıları ve ENC (Electronic Navigational Chart) güncelleme CD/online servisleriyle harita portföyünü sürekli güncel tutar. Bu bölüm; haftalık NtM uygulaması, tracing tekniği, block correction, chart correction log, ECDIS veri tabanı güncelleme, AIO (Admiralty Information Overlay), folio yönetimi, CATZOC/kaynak veri güvenilirliği ve PSC denetimi için kayıt tutma konularını SOLAS V/27 ve V/19 çerçevesinde adım adım açıklar. Amaç; her seferde "düzeltilmiş ve onaylı" bir harita/yayın setiyle yola çıkmaktır.`,
  sources: [
    "SOLAS Chapter V, Regulation 27 — Nautical Charts and Nautical Publications",
    "SOLAS Chapter V, Regulation 19 — Carriage Requirements for Shipborne Navigational Systems and Equipment",
    "SOLAS Chapter V, Regulation 34 — Safe Navigation and Avoidance of Dangerous Situations",
    "IMO Resolution MSC.232(82) — Revised Performance Standards for ECDIS",
    "Admiralty Guide to the Practical Use of ENCs (NP231) ve Guide to ECDIS Implementation (NP232)",
    "The Mariner's Handbook (NP100) — UKHO",
    "Admiralty Notices to Mariners (Weekly Editions) ve Annual Summary of Admiralty Notices to Mariners",
    "IHO S-57 / S-63 (ENC Product Specification ve Data Protection Scheme)",
    "Bridge Procedures Guide (ICS, 5th Edition)",
  ],
  chapters: [
    {
      heading: "1. Yasal Çerçeve ve Harita/Yayın Taşıma Yükümlülüğü",
      lead: `Güncel ve düzeltilmiş harita taşımak bir tercih değil, SOLAS gereği zorunlu bir emniyet yükümlülüğüdür. Düzeltilmemiş tek bir harita, planlanan seferin tamamını geçersiz kılabilir ve karaya oturma riskini doğurur.`,
      sections: [
        {
          subheading: "1.1 SOLAS V/27 ve V/19 taşıma gereklilikleri",
          paragraphs: [
            `SOLAS Chapter V Regulation 27, geminin yapacağı sefer için yeterli ve güncel (adequate and up-to-date) nautikal harita ve yayın bulundurmasını şart koşar. Bu güncellik, en son yayımlanmış Notices to Mariners'a göre düzeltme yapılmış olmasını gerektirir; "adequate" ifadesi, seferin başından sonuna kadar tüm sahaları kapsayacak çözünürlük ve ölçekte harita demektir.`,
            `Regulation 19, taşınacak seyir cihazlarını ve ECDIS gerekliliğini tanımlar. ECDIS, onaylı ENC ile beslendiğinde ve uygun yedek (back-up) düzenlemesiyle birlikte kullanıldığında kâğıt haritanın yerine geçebilir. İkinci Zabit, geminin "ECDIS-only" mı yoksa "paper-backed" mı çalıştığını ve bunun düzeltme iş akışına etkisini net bilmelidir.`,
            `Yayınlar (publications) da bu kapsamdadır: Sailing Directions (Pilot Books), List of Lights, List of Radio Signals, Tide Tables, Tidal Stream Atlases, The Mariner's Handbook (NP100) ve Admiralty Tide Tables (ATT). Bunların düzeltilmemiş veya tarihi geçmiş olması, PSC denetiminde eksiklik (deficiency) olarak kayda geçer.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS V/27 — Bağlayıcılık",
              text: `Düzeltilmemiş harita/yayın ile sefere çıkmak, Port State Control denetiminde deficiency, ciddi durumlarda detention (tutma) gerekçesidir. Chart correction log eksikliği veya boş bırakılması da denetimde olumsuz değerlendirilir.`,
            },
          ],
        },
        {
          subheading: "1.2 İkinci Zabit'in sorumluluk sınırları",
          paragraphs: [
            `İkinci Zabit, harita ve yayın yönetiminin günlük operatörüdür; düzeltmeleri uygular, kayıtları tutar, folio'yu yönetir ve eksikleri kaptana raporlar. Ancak nihai seyir emniyeti sorumluluğu kaptandadır; bu nedenle kritik düzeltmeler (örn. yeni bir tehlike) brifingle iletilir.`,
            `Sorumluluk, sadece "damga vurmak" değildir. Her düzeltmenin doğru harita, doğru pozisyon ve doğru sembolle işlendiğini, ENC veri tabanının ilgili sefere ait tüm hücreleri (cells) içerdiğini ve güncelleme yüzdesinin %100 olduğunu güvence altına almak da bu role aittir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Devir teslimde harita durumu",
              text: `Gemiye yeni katılan İkinci Zabit, ilk iş olarak chart correction log'un son NtM haftasını ve ECDIS güncelleme tarihini kontrol etmelidir. Geride kalmış (in arrears) düzeltmeler, sefer öncesi giderilmesi gereken ilk önceliktir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Notices to Mariners Sistemi ve Haftalık İş Akışı",
      sections: [
        {
          subheading: "2.1 NtM yapısı: kalıcı, T&P ve uyarılar",
          paragraphs: [
            `Admiralty Notices to Mariners (NtM) haftalık olarak yayımlanır ve her hafta numaralandırılmış bildirimler içerir. Bildirimler; kalıcı (permanent) düzeltmeler, Temporary (T) ve Preliminary (P) notice'ler, NAVAREA uyarıları özetleri, yeni harita/yayın duyuruları ve düzeltme blokları (block corrections) olarak gruplanır.`,
            `Kalıcı düzeltmeler haritanın üzerine mürekkeple işlenir ve süreklidir. T notice'ler geçici bir durumu (örn. seyir fenerinin geçici sönmesi, geçici şamandıra), P notice'ler ise yakında kalıcılaşacak ön bilgiyi (örn. inşaat halindeki yeni rıhtım) bildirir. T&P'ler kurşun kalemle işlenir çünkü kaldırıldığında silinmeleri gerekir.`,
            `Her haftalık baskı, o hafta etkilenen haritaların listesini (chart index) ve düzeltme metinlerini verir. İkinci Zabit, geminin folio'sundaki haritalarla bu listeyi karşılaştırarak yalnızca ilgili düzeltmeleri seçer ve uygular.`,
          ],
          table: {
            caption: `NtM Bildirim Türleri ve İşleme Yöntemi`,
            headers: ["Tür", "Anlam", "İşleme Yöntemi", "Kalıcılık"],
            rows: [
              ["Permanent", "Kalıcı düzeltme", "Mor/siyah mürekkep", "Sürekli"],
              ["Temporary (T)", "Geçici durum", "Kurşun kalem", "Notice iptaline kadar"],
              ["Preliminary (P)", "Ön bilgi", "Kurşun kalem", "Kalıcılaşana kadar"],
              ["Block correction", "Hazır yapışkan blok", "Kesme + yapıştırma", "Sürekli"],
              ["NAVAREA warning", "Acil seyir uyarısı", "ECDIS/manuel update", "Uyarı iptaline kadar"],
            ],
          },
        },
        {
          subheading: "2.2 Haftalık düzeltme rutini ve sıralama",
          paragraphs: [
            `Düzeltme, kronolojik sırayla ve hiçbir hafta atlanmadan yapılır; çünkü sonraki bir düzeltme önceki bir düzeltmenin üzerine inşa edilebilir. İkinci Zabit, gelen haftalık baskıyı önce Section II "Charts" üzerinden tarar, etkilenen folio haritalarını tespit eder ve her birini chart correction log'a işler.`,
            `İş akışı genelde şöyledir: haftalık NtM PDF/online indirilir, geminin chart maintenance record'u (NP133A veya elektronik eşdeğeri) açılır, ilgili harita numaraları eşleştirilir, düzeltmeler haritaya işlenir, son düzeltme numarası haritanın sol alt köşesine yazılır ve log imzalanır.`,
            `Geride kalan düzeltmeler için UKHO'nun cumulative/back-correction servisleri (örn. Annual Summary, NP234 NtM cumulative list) kullanılır; böylece uzun süre düzeltilmemiş bir harita hangi notice'lerin eksik olduğunu görerek hızla güncellenir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Hafta atlamak zincirleme hatadır",
              text: `Bir hafta atlanırsa, sonraki düzeltmeler yanlış başlangıç durumuna uygulanır ve harita sessizce hatalı hale gelir. Düzeltmeler her zaman ardışık ve eksiksiz uygulanmalı; eksik hafta tespit edilirse derhal tamamlanmalıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Kâğıt Harita Düzeltme Teknikleri",
      sections: [
        {
          subheading: "3.1 Manuel düzeltme, tracing ve sembol standardı",
          paragraphs: [
            `Kalıcı düzeltmeler standart hidrografik sembollerle (INT1 / NP5011 "Symbols and Abbreviations used on Admiralty Charts" referansıyla) işlenir. Mor renkli (veya siyah) ince uçlu mürekkep kullanılır; silinti veya bulanıklık kabul edilmez çünkü harita yasal bir belgedir.`,
            `Karmaşık değişiklikler için tracing (asetat kopya) tekniği kullanılır: NtM ekindeki tracing, haritadaki referans noktalarına (örn. lat/long kesişimi veya belirgin bir fener) hizalanır, kalemle bastırılarak yeni semboller haritaya aktarılır. Bu, pozisyon hatasını önleyen en güvenilir yöntemdir.`,
            `Düzeltme tamamlandığında haritanın sol alt köşesindeki düzeltme satırına notice yılı ve numarası eklenir (örn. "2026-1542"). Bu satır, haritanın hangi düzeltmeye kadar güncel olduğunu gösteren resmi izdir ve PSC kontrolünde ilk bakılan yerdir.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "NP5011 — Sembol referansı",
              text: `Tüm manuel düzeltmelerde NP5011 (INT1) sembol kataloğu esas alınır. Yanlış sembol, doğru pozisyonda dahi tehlikeyi yanlış sınıflandırır (örn. batık ile sığlık karışması). Düzeltirken bu katalog daima erişilebilir olmalıdır.`,
            },
          ],
        },
        {
          subheading: "3.2 Block correction ve yeni baskı (new edition)",
          paragraphs: [
            `Bazı düzeltmeler manuel çizilemeyecek kadar yoğundur; bu durumda NtM, basılı bir "block correction" (yapışkan ya da kesilip yapıştırılan harita parçası) yayımlar. İkinci Zabit bu bloğu dikkatle keser, hizalama işaretlerine (register marks) göre yerleştirir ve haritaya yapıştırır; ardından log'a işler.`,
            `Değişiklikler bir bloğun ötesine geçtiğinde UKHO haritanın "New Edition"ını yayımlar; eski baskı geçersiz olur ve yeni baskı temin edilene kadar harita "düzeltilemez" durumdadır. İkinci Zabit bu durumu kaptana bildirir ve folio yenileme talebini başlatır.`,
            `New Edition ile "Reprint" farklıdır: reprint sadece mevcut düzeltmeleri içeren yeniden basımdır ve ilave düzeltme gerektirmeyebilir; New Edition ise yeni seyir bilgisi içerir ve eski baskının kullanımdan kaldırılmasını gerektirir.`,
          ],
        },
      ],
    },
    {
      heading: "4. ECDIS ve ENC Güncelleme Yönetimi",
      sections: [
        {
          subheading: "4.1 ENC veri tabanı, hücreler ve güncelleme servisleri",
          paragraphs: [
            `ECDIS, IHO S-57 standardında üretilen ve S-63 ile şifrelenen ENC hücreleriyle (cells) çalışır. Güncelleme; haftalık ENC update servisleriyle (Admiralty Vessel ENC Service / AVCS gibi) CD-DVD veya online (e-posta, broadband) yoluyla gelir ve her hücreye ait güncelleme dosyaları (.001, .002 ...) sırayla yüklenir.`,
            `İkinci Zabit, sefere ait tüm hücrelerin lisanslı (permits) ve yüklü olduğunu, güncelleme oranının %100 olduğunu doğrular. ECDIS, her hücrenin son güncelleme tarihini ve eksik güncellemeleri raporlar; bu rapor PSC denetiminde kâğıt log'un dijital karşılığıdır.`,
            `Güncelleme sırasında "base CD" (taban veri) ile "update CD" (haftalık değişiklikler) ayrımı önemlidir: taban veri belirli aralıklarla, güncellemeler ise her hafta gelir. Yanlış sırada yükleme veya eksik permit, hücrelerin yüklenmemesine ve seyir sahasının boş görünmesine yol açar.`,
          ],
          table: {
            caption: `Kâğıt ve ENC Güncelleme İş Akışı Karşılaştırması`,
            headers: ["Unsur", "Kâğıt Harita", "ENC / ECDIS"],
            rows: [
              ["Kaynak", "Haftalık NtM (basılı/PDF)", "AVCS / haftalık ENC update"],
              ["İşleme", "Manuel mürekkep + tracing", "Otomatik dosya yükleme"],
              ["Kayıt", "Chart correction log (NP133A)", "ECDIS güncelleme raporu"],
              ["Eksik kontrol", "Cumulative list (NP234)", "Update status / %100 kontrolü"],
              ["T&P", "Kurşun kalem", "AIO katmanı / manuel update"],
            ],
          },
        },
        {
          subheading: "4.2 AIO ve manuel chart update layer",
          paragraphs: [
            `Admiralty Information Overlay (AIO), ENC üzerinde gösterilebilen ek bir katmandır; ENC'ye henüz işlenmemiş Admiralty T&P notice'leri ve ENC ile kâğıt harita arasındaki farkları (ENC Preliminary Notices, EP) gösterir. Bu sayede ECDIS-only gemiler, kâğıt dünyasında bilinen geçici tehlikeleri de görebilir.`,
            `Otomatik güncellemelerin yetişmediği acil durumlar (örn. yeni NAVAREA uyarısı, henüz ENC'ye işlenmemiş tehlike) için ECDIS manuel update özelliğiyle nokta, çizgi, alan ve metin eklenebilir. İkinci Zabit bu manuel girişleri tarih ve kaynakla kayıt altına alır, geçici olanları zamanı gelince siler.`,
            `AIO'nun açık tutulması ve manuel update disiplini, ECDIS-only gemilerde kâğıt T&P avantajının kaybını telafi eder. Bu katman kapalı bırakılırsa geçici tehlikeler gözden kaçar.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "ENC güncel ≠ AIO güncel",
              text: `ENC veri tabanı %100 güncel olsa bile, T&P bilgisi AIO'da taşınır. AIO katmanı kapalıysa veya güncellenmemişse, geçici fenerler/şamandıralar ve inşaat sahaları ECDIS'te görünmez. AIO her sefer açık ve güncel tutulmalıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. NAVAREA, NAVTEX ve Seyir Uyarılarının Entegrasyonu",
      sections: [
        {
          subheading: "5.1 Uyarı hiyerarşisi: NAVAREA, coastal ve local",
          paragraphs: [
            `Dünya, World-Wide Navigational Warning Service (WWNWS) kapsamında NAVAREA bölgelerine ayrılmıştır; her bölgenin bir koordinatörü NAVAREA uyarılarını yayımlar. Bunun altında ulusal coastal warnings ve liman/VTS düzeyinde local warnings yer alır. İkinci Zabit, geminin geçtiği NAVAREA'ların uyarılarını sefer boyunca takip eder.`,
            `Uyarılar; söndürülen fenerler, sürüklenen şamandıralar, batıklar, askeri tatbikat sahaları, sismik araştırma gemileri ve buz gibi geçici/acil tehlikeleri bildirir. Bu bilgi, henüz NtM veya ENC güncellemesine girmemiş olabilir; bu nedenle haritaya/ECDIS'e manuel işlenmesi gerekebilir.`,
            `NAVTEX (518 kHz uluslararası İngilizce, 490/4209.5 kHz ulusal) ve EGC SafetyNET (Inmarsat) bu uyarıların başlıca alınma kanallarıdır. İkinci Zabit, alınan uyarıyı seferle ilgili olup olmadığına göre filtreler ve ilgili olanı plana/haritaya yansıtır.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "WWNWS ve IMO/IHO ortaklığı",
              text: `World-Wide Navigational Warning Service, IMO ve IHO ortak yürütümündedir. NAVAREA uyarıları SOLAS kapsamında MSI (Maritime Safety Information) olarak değerlendirilir ve köprüüstünde sürekli izlenmesi gerekir.`,
            },
          ],
        },
        {
          subheading: "5.2 Uyarıların haritaya ve plana yansıtılması",
          paragraphs: [
            `Sefere ilişkin bir uyarı alındığında İkinci Zabit; uyarının pozisyonunu, geçerlilik süresini ve niteliğini değerlendirir, gerekirse kâğıt haritaya kurşun kalemle, ECDIS'e manuel update veya AIO referansıyla işler. İptal (cancellation) uyarısı geldiğinde bu işaret silinir.`,
            `Aktif uyarıların bir listesi köprüüstünde tutulur; iptal edilmeyen uyarılar geçerli kabul edilir. Vardiya devrinde aktif uyarılar sözlü ve yazılı olarak aktarılır; aksi halde kritik bir geçici tehlike izleme zincirinden düşebilir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka dersi — Söndürülmüş fenere güven",
              text: `Birçok kaza analizinde, NAVTEX'le bildirilen "light unlit" uyarısının köprüüstünde dikkate alınmaması, gece seyrinde yanlış fener teyidi ve pozisyon hatasına yol açmıştır. Ders: aktif uyarılar haritaya işlenmeden ve devirde aktarılmadan geçerli sayılamaz.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Folio Yönetimi ve Yayın Envanteri",
      sections: [
        {
          subheading: "6.1 Route-based folio listeleri ve harita seçimi",
          paragraphs: [
            `Folio, geminin ticaret sahasına göre düzenlenmiş harita gruplarıdır. İkinci Zabit, planlanan sefere göre gerekli haritaları (passage chart, approach chart, harbour chart ve uygun ölçekler) folio'dan seçer; eksik ölçek veya kapsam varsa folio yenileme talebi açar.`,
            `Route-based folio yönetiminde, geminin tipik rotaları için "standard folio" tanımlanır; yeni bir sefer bu standardın dışına çıkarsa ek haritalar temin edilir. AVCS'de bu, dijital folio ve hücre permit yönetimi olarak yürür; lisans süreleri ve yenileme tarihleri izlenir.`,
            `Folio yönetimi, harita "yeterliliği" (adequacy) ile doğrudan ilişkilidir: en küçük ölçekli harita yerine, kritik sahalarda en büyük (en detaylı) ölçekli güncel harita kullanılmalıdır. İkinci Zabit, passage plan'da her leg için doğru ölçek haritanın mevcut ve düzeltilmiş olduğunu güvence altına alır.`,
          ],
          table: {
            caption: `Örnek Sefer Bazlı Harita/Yayın Kontrol Listesi`,
            headers: ["Saha", "Gerekli Ürün", "Ölçek/Tür", "Düzeltme Durumu"],
            rows: [
              ["Açık deniz geçişi", "Passage chart", "Küçük ölçek", "Son NtM"],
              ["Yaklaşma", "Approach chart", "Orta ölçek", "Son NtM"],
              ["Liman/manevra", "Harbour chart / ENC", "Büyük ölçek", "Son NtM + T&P"],
              ["Gelgit", "ATT / Tidal Stream Atlas", "Yıllık", "Geçerli yıl"],
              ["Fenerler", "List of Lights", "Bölgesel cilt", "Son NtM"],
            ],
          },
        },
        {
          subheading: "6.2 Yayın envanteri güncelliği ve yıllık ürünler",
          paragraphs: [
            `Sailing Directions (Pilot Books), List of Lights, List of Radio Signals gibi yayınlar haftalık NtM'in "Updates to Admiralty Sailing Directions / Lists" bölümleriyle güncellenir. Bu güncellemeler yayının ilgili sayfalarına işlenir veya ekli sayfa (supplement) olarak saklanır.`,
            `Tide Tables (ATT) ve Tidal Stream Atlases yıllık ürünlerdir; geçerli yılın baskısı bulundurulmalıdır çünkü gelgit tahminleri yıla özgüdür. The Mariner's Handbook (NP100), Annual Summary of Admiralty Notices to Mariners ve ilgili Catalogue of Admiralty Charts (NP131) de güncel tutulur.`,
            `İkinci Zabit, yayın envanterini bir kayıt defterinde (publication record) izler: her yayının numarası, baskı yılı, son düzeltme NtM'i ve geçerlilik durumu listelenir. Süresi dolan ya da yeni baskısı çıkan yayınlar için temin talebi açılır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Yıllık ürünleri takvimle yönet",
              text: `ATT ve Tidal Stream Atlas gibi yıllık yayınların yeni baskısı genelde yıl sonunda çıkar. Bir hatırlatma takvimiyle temini önceden planlamak, yıl başında geçerli yayın bulundurma yükümlülüğünün aksamasını önler.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. Kaynak Veri Güvenilirliği: CATZOC ve Ölçek Disiplini",
      sections: [
        {
          subheading: "7.1 CATZOC kavramı ve UKC üzerindeki etkisi",
          paragraphs: [
            `ENC'lerde derinlik verisinin güvenilirliği CATZOC (Category of Zone of Confidence) ile ifade edilir; A1 (en güvenilir) ile D ve U (değerlendirilmemiş) arasında sınıflandırılır. Düşük CATZOC, derinliklerin eski/yetersiz survey'e dayandığını ve gerçekte daha sığ olabileceğini gösterir.`,
            `İkinci Zabit, passage plan'da kritik sahaların CATZOC değerini kontrol eder ve UKC hesabına belirsizlik (uncertainty) payı ekler. Örneğin CATZOC C/D bölgesinde aynı kâğıt/ECDIS derinliği için daha geniş bir emniyet payı bırakılmalıdır.`,
            `CATZOC, ECDIS'te ZOC sembolleriyle (yıldız sayısı) gösterilebilir. Bu katmanın sorgulanması, "harita doğru görünüyor ama veri eski olabilir" riskinin farkında olunmasını sağlar; özellikle az seyredilen, eski survey'li sularda hayatidir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Düşük CATZOC = artırılmış UKC payı",
              text: `CATZOC C, D veya U bölgelerinde derinlik verisine tam güvenilemez. Bu sahalarda şirket UKC policy'sinin üzerine ek belirsizlik payı eklenmeli ve mümkünse daha derin/güvenli rota seçilmelidir.`,
            },
          ],
        },
        {
          subheading: "7.2 Ölçek (over-scale/under-scale) ve harita seçimi",
          paragraphs: [
            `ECDIS'te ENC'yi kendi derleme ölçeğinin (compilation scale) ötesinde büyütmek (over-zoom / over-scale) yanıltıcıdır; veri görünür şekilde detaylanmaz, sadece sembol büyür ve eksik detay yokmuş gibi algılanır. ECDIS bunu "over-scale" uyarısıyla bildirir.`,
            `İkinci Zabit, her saha için uygun derleme ölçeğine sahip ENC/kâğıt haritayı kullanır; yaklaşma ve manevrada daha büyük ölçekli (usage band 5-6) hücreler tercih edilir. Yanlış ölçek harita kullanımı, no-go area ve tehlikelerin gözden kaçmasına yol açar.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "ENC usage bands",
              text: `ENC'ler 1 (overview) ile 6 (berthing) arasında usage band'lere ayrılır. Seyir, her zaman ilgili saha için en uygun (genelde en büyük) band ENC'siyle yapılmalı; over-scale çalışmaktan kaçınılmalıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "8. Kayıt Tutma ve PSC Denetimine Hazırlık",
      sections: [
        {
          subheading: "8.1 Chart correction log ve kanıt zinciri",
          paragraphs: [
            `Chart correction log (NP133A veya elektronik eşdeğeri), her haritanın hangi NtM'e kadar düzeltildiğini gösteren resmi kayıttır. Her satır; harita numarası, uygulanan notice numarası, tarih ve düzeltmeyi yapanın imzası/parafını içerir. Bu log, PSC denetiminde harita güncelliğinin birincil kanıtıdır.`,
            `ECDIS tarafında bu kanıt; güncelleme durum raporu, lisans/permit listesi ve son güncelleme tarihidir. İkinci Zabit, hem kâğıt hem dijital kayıtların tutarlı ve eksiksiz olduğunu, "geride kalmış" düzeltme bulunmadığını güvence altına alır.`,
            `Kayıtlar, yalnızca uyum için değil, sorumluluk için de önemlidir: bir kaza sonrası soruşturmada haritanın hangi tarihte hangi düzeltmeyle güncel olduğu bu loglardan okunur. Boş, geç veya geriye dönük doldurulmuş bir log ciddi bir zafiyettir.`,
          ],
          table: {
            caption: `PSC Denetimi — Harita/Yayın Kontrol Noktaları`,
            headers: ["Kontrol Noktası", "Beklenen Durum", "Kanıt"],
            rows: [
              ["Harita güncelliği", "Son NtM'e düzeltilmiş", "Chart correction log"],
              ["ENC güncelliği", "%100, lisanslı", "ECDIS update raporu"],
              ["T&P uygulaması", "Geçici düzeltmeler işlenmiş", "Kurşun kalem / AIO"],
              ["Yayın envanteri", "Güncel baskı + düzeltme", "Publication record"],
              ["Yıllık ürünler", "Geçerli yıl (ATT vb.)", "Baskı yılı kontrolü"],
            ],
          },
        },
        {
          subheading: "8.2 İç denetim, eksik tespiti ve raporlama",
          paragraphs: [
            `İkinci Zabit periyodik iç kontrol (self-audit) yapar: rastgele seçilen haritaların log ile haritadaki son düzeltme satırının uyumunu, ENC güncelleme yüzdesini ve yayın baskı yıllarını karşılaştırır. Bu, PSC veya şirket denetimi öncesi eksikleri proaktif yakalar.`,
            `Tespit edilen eksiklikler (eksik harita, geride kalan düzeltme, süresi dolan yayın) kaptana ve şirket DPA'ya raporlanır; temin talepleri açılır. SMS (Safety Management System) kapsamında bu süreç dokümante edilir ve kapanışı izlenir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka dersi — Geride kalan düzeltmeler",
              text: `Bir PSC denetiminde, gemideki haritaların aylarca düzeltilmediği ve chart correction log'un boş bırakıldığı tespit edilince gemi tutulmuştur (detention). Ders: düzeltme her hafta yapılmalı ve log eş zamanlı tutulmalıdır; toplu/geriye dönük doldurma kabul edilmez.`,
            },
          ],
        },
      ],
    },
    {
      heading: "9. Tipik Hatalar ve İyi Uygulamalar",
      sections: [
        {
          subheading: "9.1 Sık görülen hatalar",
          paragraphs: [
            `En yaygın hatalar; hafta atlayarak veya yanlış sırada düzeltme yapmak, T&P'leri mürekkeple (silinmez) işlemek, ENC güncellemesini eksik/yanlış sırada yüklemek, AIO katmanını kapalı bırakmak ve over-scale ENC ile seyretmektir.`,
            `Diğer hatalar; yıllık yayınların (ATT) eski baskısını kullanmak, folio'da kritik bir saha için yeterli ölçek harita bulundurmamak, New Edition çıkmış bir haritayı düzeltmeye çalışmak ve chart correction log'u eş zamanlı tutmamaktır.`,
          ],
        },
        {
          subheading: "9.2 İyi uygulama ilkeleri",
          paragraphs: [
            `Düzeltme rutini sabit bir güne bağlanır (örn. her Cuma) ve kesintisiz sürdürülür; gelen baskı aynı hafta işlenir. Her düzeltme sonrası log eş zamanlı imzalanır; ECDIS güncellemesi yüklendikten sonra %100 oranı ve hücre listesi doğrulanır.`,
            `Sefer öncesi, passage plan ile folio çapraz kontrol edilir; her leg için doğru ölçek, güncel ve düzeltilmiş harita teyit edilir. CATZOC ve over-scale durumları passage plan'a not düşülür. Bu disiplin, harita kaynaklı karaya oturma riskini en baştan keser.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Düzeltme = seyir emniyetinin sessiz temeli",
              text: `İyi yürütülen harita yönetimi görünmez bir emniyet katmanıdır; aksaması ise genellikle bir kaza anına kadar fark edilmez. Rutini asla "sonra yaparım" diye ertelememek, bu görevin altın kuralıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "10. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "10.1 İkinci Zabit'in harita ve yayın checklist'i",
          bullets: [
            `Haftalık NtM zamanında indirildi ve ilgili haritalar tespit edildi mi?`,
            `Düzeltmeler kronolojik sırayla, hafta atlamadan uygulandı mı?`,
            `T&P notice'ler kurşun kalemle işlendi, iptal edilenler silindi mi?`,
            `Block correction'lar register marks'a göre doğru yerleştirildi mi?`,
            `Chart correction log eş zamanlı, eksiksiz ve imzalı tutuldu mu?`,
            `ENC güncellemesi yüklendi, güncelleme oranı %100 mü, permit'ler geçerli mi?`,
            `AIO katmanı açık ve güncel mi; manuel update'ler kayıtlı mı?`,
            `NAVAREA/NAVTEX uyarıları değerlendirildi, ilgili olanlar haritaya işlendi mi?`,
            `Sefer folio'su her leg için doğru ölçekte ve güncel harita içeriyor mu?`,
            `Yayın envanteri (Sailing Directions, List of Lights, ATT) güncel baskı ve düzeltilmiş mi?`,
            `CATZOC ve over-scale durumları passage plan'a yansıtıldı mı?`,
          ],
          paragraphs: [
            `Harita ve nautikal yayın yönetimi, seyir emniyetinin görünmeyen ama en temel katmanlarından biridir; doğru rota, güncel olmayan bir harita üzerine çizildiğinde değersizdir. İkinci Zabit'in görevi yalnızca düzeltme uygulamak değil, kâğıt ve dijital tüm seyir bilgisini eksiksiz, izlenebilir ve sefere hazır tutmaktır. Disiplinli, eş zamanlı ve eksiksiz yürütülen bir düzeltme rutini; karaya oturma istatistiklerinde tekrar eden "düzeltilmemiş harita" ve "kaynak veri güvenilmezliği" zincirini en başından kıran sessiz fakat en güçlü savunmadır.`,
          ],
        },
      ],
    },
  ],
};

export default content;
