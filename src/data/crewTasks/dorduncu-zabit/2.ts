import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Harita ve yayın düzeltmelerine destek",
  roleSlug: "dorduncu-zabit",
  taskIndex: 2,
  estimatedPages: 25,
  intro: `Dördüncü Zabit, İkinci Zabit'in (Navigator / Second Officer) sorumluluğundaki harita ve seyir yayını yönetimine gözetim altında destek vererek hem geminin seyir bilgisinin güncel kalmasına katkı sağlar hem de bu kritik idari görevi öğrenir. Bu destek; Notices to Mariners (NtM) takibi, kağıt harita ve ECDIS düzeltmeleri, T&P (Temporary & Preliminary) Notice işlenmesi, folio listelerinin hazırlanması ve yayın envanterinin güncel tutulmasını kapsar. SOLAS V/27, gemideki haritaların ve yayınların güncel olmasını yasal bir zorunluluk haline getirir. Bu bölüm, kıdemsiz zabit perspektifinden harita-yayın bakımının metodolojisini adım adım açıklar.`,
  sources: [
    "SOLAS Chapter V Regulation 27 — Nautical Charts and Publications",
    "SOLAS Chapter V Regulation 19 — Carriage Requirements for Shipborne Navigational Systems",
    "IMO Resolution A.1106(29) — Guidelines for AIS / charts up-to-date",
    "Admiralty Notices to Mariners (Weekly Edition) — UKHO",
    "IMO Performance Standards for ECDIS (MSC.232(82))",
    "IHO S-52 / S-57 / S-63 (ENC Presentation, Product, Data Protection)",
    "ICS Bridge Procedures Guide (5th Edition)",
    "Admiralty Guide to ENC Maintenance (NP133A)",
  ],
  chapters: [
    {
      heading: "1. Harita ve Yayın Yönetiminin Yasal Çerçevesi",
      lead: `Güncel olmayan bir harita, geminin seyir güvenliğindeki en sinsi tehlikedir; tehlikenin haritada olmaması, denizde olmadığı anlamına gelmez.`,
      sections: [
        {
          subheading: "1.1 SOLAS V/27 ve güncellik yükümlülüğü",
          paragraphs: [
            `SOLAS V/27, geminin yapacağı sefer için gerekli tüm seyir haritalarının ve yayınlarının "adequate and up-to-date" (yeterli ve güncel) bulundurulmasını zorunlu kılar. Bu yükümlülük yalnızca haritaları değil; List of Lights, Sailing Directions (Pilot books), List of Radio Signals, Tide Tables ve Mariner's Handbook gibi temel yayınları da kapsar. Dördüncü Zabit, bu yükümlülüğün kapsamını öğrenerek hangi belgenin neden güncel tutulduğunu kavrar.`,
            `Güncellik, son yayınlanan Notice to Mariners'a kadar düzeltmenin işlenmiş olması demektir. PSC (Port State Control) denetiminde en sık tespit edilen eksikliklerden biri, harita düzeltmelerinin geride kalmış olmasıdır. Bu nedenle düzeltme işlemi günlük rutin haline getirilir ve İkinci Zabit'in defterinde takip edilir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS V/27 — Up-to-date charts",
              text: `Gemi, yapacağı sefere uygun, yeterli ölçekte ve son NtM'e kadar düzeltilmiş haritalar ile yayınlar bulundurmak zorundadır. Bu yükümlülük kağıt ve ECDIS sistemleri için eşit geçerlidir. Eksiklik PSC detention sebebidir.`,
            },
          ],
        },
        {
          subheading: "1.2 Dördüncü Zabit'in gözetim altındaki rolü",
          paragraphs: [
            `Harita ve yayın bakımının nihai sorumluluğu İkinci Zabit'tedir. Dördüncü Zabit; NtM ayrıştırma, düzeltme işleme, kayıt tutma ve envanter sayımı gibi işlerde yardımcı olur, ancak her işlenen düzeltme İkinci Zabit tarafından çapraz kontrol edilir. Bu çift-kontrol, hatalı veya atlanmış düzeltmelerin yakalanmasını sağlar.`,
            `Bu görev, kıdemsiz zabitin gelecekte İkinci Zabit olarak üstleneceği seyir hazırlığının temelini oluşturur. Düzeltmenin neden ve nasıl yapıldığını öğrenmek, mekanik bir işlem değil; geminin seyir güvenliği zincirinin halkalarını anlamaktır.`,
          ],
        },
      ],
    },
    {
      heading: "2. Notices to Mariners (NtM) Sistemi",
      sections: [
        {
          subheading: "2.1 Weekly NtM yapısı ve bölümleri",
          paragraphs: [
            `UKHO Admiralty Notices to Mariners haftalık olarak yayınlanır ve numaralı bölümlerden oluşur: Bölüm I (açıklama/index), Bölüm II (harita düzeltmeleri), Bölüm III (yayın düzeltmeleri reprint/new edition), Bölüm IV (ENC düzeltmeleri), Bölüm V (Distances) ve Bölüm VI (Radio signals). Dördüncü Zabit, gelen NtM dosyasını bölümlerine ayırarak geminin folio'suna ait olanları seçer.`,
            `Her Notice, etkilediği harita numaralarını ve düzeltmenin tipini belirtir. NtM'ler kümülatiftir; bir hafta atlanırsa düzeltme zinciri kopar. Bu nedenle ardışık hafta numaralarının eksiksiz işlendiği "Chart Correction Log" (NP133A formatı veya muadili) üzerinden takip edilir.`,
          ],
          table: {
            caption: `Admiralty Weekly NtM Bölümleri ve İçerik`,
            headers: ["Bölüm", "İçerik", "Etkilediği belge"],
            rows: [
              ["I", "Index / açıklayıcı notlar", "Genel"],
              ["II", "Kağıt harita düzeltmeleri", "Paper charts"],
              ["III", "Yayın düzeltmeleri (NP)", "Sailing Directions, Lights vb."],
              ["IV", "ENC / digital düzeltmeler", "ECDIS / ENC"],
              ["V", "Amendments to distances", "NP350 vb."],
              ["VI", "Amendments to Radio Signals", "ALRS (NP281-NP286)"],
            ],
          },
        },
        {
          subheading: "2.2 NtM dağıtım kanalları",
          paragraphs: [
            `NtM, gemiye CD/DVD ile, e-posta abonelik servisi (Admiralty Updating Service - AUS) ile veya internet üzerinden ulaşır. Dördüncü Zabit, gelen dosyaların doğru hafta numarasına ait olduğunu ve eksik hafta bulunmadığını kontrol eder. Eksik bir hafta tespit edilirse derhal İkinci Zabit'e bildirilir ve temin edilmesi sağlanır.`,
            `Block correction (parçalı yapışkan düzeltme) içeren NtM'ler için ayrıca basılı block correction sayfaları gerekir. Bunlar haritanın üzerine yapıştırılarak geniş alanlı değişiklikler (yeni rıhtım, değişen derinlik alanı vb.) işlenir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Hafta sırasını asla atlama",
              text: `NtM düzeltmeleri kümülatif olduğundan haftalar sırayla işlenmelidir. 2415. haftayı atlayıp 2416'yı işlemek, atlanan haftadaki tehlike değişikliğini gizler. Eksik hafta varsa düzeltme durdurulur, eksik temin edilene kadar beklenir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Kağıt Harita Düzeltme Tekniği",
      sections: [
        {
          subheading: "3.1 El ile düzeltme uygulaması",
          paragraphs: [
            `Kağıt harita düzeltmeleri menekşe rengi (violet/magenta) mürekkeple yapılır; bu renk, orijinal baskı renklerinden ayırt edilir ve düzeltmenin sonradan eklendiğini gösterir. Silinen objeler ince çift çizgiyle iptal edilir, yeni objeler sembolojiye uygun çizilir. Dördüncü Zabit, NtM'deki tarif edilen pozisyonu (enlem/boylam) hassas biçimde haritaya işler.`,
            `Her düzeltme işlendikten sonra haritanın sol alt köşesine NtM numarası ve yılı kaydedilir (örn. "2415/24"). Bu kayıt, haritanın hangi haftaya kadar güncel olduğunu gösterir. Block correction'larda yapıştırma işlemi, kabarcık ve kayma olmadan, doğru hizalama ile yapılır.`,
          ],
          bullets: [
            `Violet/magenta mürekkep, ince uçlu teknik kalem`,
            `Silinen obje çift çizgiyle iptal, asla tamamen silinmez`,
            `Pozisyon enlem/boylam ile hassas işaretlenir`,
            `Düzeltme sonrası NtM no. sol alt köşeye yazılır`,
            `Block correction doğru hizalama ile yapıştırılır`,
          ],
        },
        {
          subheading: "3.2 Düzeltme doğrulama ve kayıt",
          paragraphs: [
            `İşlenen her düzeltme, Chart Correction Log'a (Form NP133A) kaydedilir. Bu defter, her harita için işlenen son NtM numarasını ve tarihi tutar; bir denetimde haritaların güncelliğinin kanıtıdır. Dördüncü Zabit'in işlediği düzeltmeler İkinci Zabit tarafından imza/parafla onaylanmadan tamamlanmış sayılmaz.`,
            `Düzeltme sırasında haritanın eski edition (basım) olduğu fark edilirse, yeni edition gelene kadar T&P ve devam eden düzeltmeler işlenmeye devam eder; ancak New Edition ilan edildiğinde eski harita seferden çekilir ve yenisiyle değiştirilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Yanlış pozisyon = sahte güvenlik",
              text: `Bir düzeltmenin yanlış pozisyona işlenmesi, var olmayan bir güvenli alan veya görünmeyen bir tehlike yaratır. Bu, hiç işlememekten daha tehlikelidir. Her işlenen pozisyon, NtM metniyle ikinci kez karşılaştırılarak doğrulanır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. T&P (Temporary & Preliminary) Notice Yönetimi",
      sections: [
        {
          subheading: "4.1 T&P Notice'ların doğası",
          paragraphs: [
            `Temporary (T) Notice'lar geçici durumları bildirir: kapalı seyir alanı (atış talimi, tahkimat), geçici fener arızası, geçici şamandıra kaldırılması vb. Preliminary (P) Notice'lar ise yakında olacak kalıcı değişiklikleri önceden duyurur (yeni rıhtım inşaatı, derinlik taraması). Bunlar haritaya kalıcı işlenmez; kurşunkalemle işaretlenir veya ayrı T&P dosyasında tutulur.`,
            `Dördüncü Zabit, geminin sefer rotasını etkileyen aktif T&P Notice'ları İkinci Zabit ile birlikte tarar. İptal edilen (canceled) T&P Notice'lar listeden çıkarılır; iptal edildikleri NtM'de ilan edilir. Aktif T&P listesi, voyage planning sırasında mutlaka kontrol edilir.`,
          ],
          table: {
            caption: `T ve P Notice Karşılaştırması`,
            headers: ["Özellik", "Temporary (T)", "Preliminary (P)"],
            rows: [
              ["Süre", "Geçici, belirli süre", "Kalıcı değişimin habercisi"],
              ["Örnek", "Atış alanı, geçici fener arızası", "Yeni rıhtım, planlanan tarama"],
              ["Haritaya işleme", "Kurşunkalem / dosya", "Kurşunkalem / dosya"],
              ["İptal", "NtM ile canceled", "Kalıcı NtM ile değişir"],
              ["Voyage etkisi", "Rotada kontrol zorunlu", "Rotada kontrol zorunlu"],
            ],
          },
        },
        {
          subheading: "4.2 T&P dosyasının seferde kullanımı",
          paragraphs: [
            `Birçok gemi, T&P Notice'ları ayrı bir klasörde harita numarasına göre tutar. Seyir planlama sırasında, planlanan rotanın geçtiği her harita için ilgili aktif T&P kontrol edilir. Dördüncü Zabit bu kontrolün yapıldığını ve İkinci Zabit tarafından onaylandığını öğrenir; rotayı etkileyen bir T varsa passage plan'a not düşülür.`,
          ],
        },
      ],
    },
    {
      heading: "5. ECDIS ve ENC Güncellemeleri",
      sections: [
        {
          subheading: "5.1 ENC update mekanizması",
          paragraphs: [
            `ENC (Electronic Navigational Chart) düzeltmeleri kağıttan farklı olarak el ile değil; dijital update dosyaları (S-63 şifreli) ile yapılır. Admiralty Vessel Update veya muadili servis, haftalık update CD'si veya e-mail dağıtımıyla gelir. Dördüncü Zabit, update dosyasının ECDIS'e doğru yüklendiğini ve sistemin "update applied" onayı verdiğini gözlemler.`,
            `Update sonrası ECDIS, hangi haftaya kadar güncel olduğunu gösteren bir durum bilgisi tutar. Permit (lisans) süresi dolan ENC'ler için yeni permit alınmadan harita gösterilemez. Dördüncü Zabit, permit son kullanma tarihlerini İkinci Zabit ile birlikte izler.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "S-63 Data Protection",
              text: `ENC'ler IHO S-63 standardı ile şifrelidir; her ENC, gemiye özel User Permit ve Cell Permit ile açılır. Yanlış permit veya süresi dolan permit, haritanın ECDIS'te görüntülenememesine yol açar. Permit yönetimi güncelleme kadar kritiktir.`,
            },
          ],
        },
        {
          subheading: "5.2 Kağıt-ENC tutarlılığı ve manuel düzeltme",
          paragraphs: [
            `Bazı acil değişiklikler (Navigational Warning kaynaklı) henüz ENC update'ine girmemiş olabilir. Bu durumda ECDIS'in manuel düzeltme (manual update / mariner's note) fonksiyonu ile geçici obje eklenir. Dördüncü Zabit, bu manuel düzeltmelerin kaynağını ve geçerliliğini İkinci Zabit gözetiminde kaydeder.`,
            `ECDIS birincil seyir sistemi ise (paperless ship), backup ECDIS de aynı update seviyesinde tutulmalıdır. İki sistem arasındaki update tutarsızlığı, yedeklilik prensibini bozar. Dördüncü Zabit, her iki sistemin de aynı haftaya kadar güncel olduğunu doğrular.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka — eski ENC ile seyir",
              text: `Birçok karaya oturma soruşturması, ENC permit'inin süresinin dolması veya update'in atlanması nedeniyle güncel olmayan derinlik bilgisiyle seyredilmesini neden göstermiştir. Ders: ENC güncelliği kağıt kadar disiplin ister; "dijital olduğu için kendiliğinden güncel" varsayımı yanlıştır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Yayın Envanteri ve Folio Yönetimi",
      sections: [
        {
          subheading: "6.1 Folio listelerinin hazırlanması",
          paragraphs: [
            `Folio, harita ve yayınların coğrafi bölgelere göre gruplandırılmış kataloğudur. Sefer rotasına göre hangi folio'ların gerektiği belirlenir; eksik harita varsa temin edilir. Dördüncü Zabit, planlanan sefer için gerekli harita listesini Admiralty Chart Catalogue (NP131) veya ADP (Admiralty Digital Publications) üzerinden çıkararak İkinci Zabit'e sunar.`,
            `Gemideki tüm haritaların kayıtlı olduğu Chart Folio'su periyodik olarak fiziksel sayımla karşılaştırılır. Kayıp, hasarlı veya New Edition ile değiştirilmesi gereken haritalar listelenir ve sipariş edilir. Bu envanter çalışması, kıdemsiz zabite geminin seyir kütüphanesinin yapısını öğretir.`,
          ],
          bullets: [
            `Sefer rotasına göre gerekli harita listesi çıkarma`,
            `Eksik / hasarlı / eski edition harita tespiti`,
            `Yayın güncellik durumunun kontrolü (Lights, ALRS, Pilots)`,
            `Sipariş listesi hazırlama ve İkinci Zabit'e sunma`,
            `Fiziksel sayım ile kayıt karşılaştırması`,
          ],
        },
        {
          subheading: "6.2 Temel yayınların güncel tutulması",
          paragraphs: [
            `List of Lights (NP74-NP84 serisi), Sailing Directions (Pilot Books), Admiralty List of Radio Signals (ALRS, NP281-286), Tide Tables (NP201-204) ve Mariner's Handbook (NP100) NtM Bölüm III ile düzeltilir. Bu yayınlardaki amendment'lar ilgili sayfalara işlenir veya yapışkan section ile güncellenir.`,
            `Dördüncü Zabit, bu yayınların düzeltme kayıtlarının (her yayının ön sayfasındaki record of corrections) güncel tutulduğunu öğrenir. Tide Tables ve Almanac gibi yıllık yayınlar her yıl yenilenir; eski sürümle seyir yasaktır.`,
          ],
        },
      ],
    },
    {
      heading: "7. Navtex, Navigational Warning ve Güncel Bilgi Akışı",
      sections: [
        {
          subheading: "7.1 Navtex ve Navigational Warning takibi",
          paragraphs: [
            `Haritalara henüz işlenmemiş en güncel tehlikeler Navtex (518 kHz) ve SafetyNET üzerinden Navigational Warning olarak yayınlanır. Dördüncü Zabit, vardiyası sırasında gelen Navtex mesajlarını izler, rotayı etkileyenleri seçer ve İkinci Zabit ile birlikte ECDIS/haritaya geçici olarak işler.`,
            `Navigational Warning'lar coğrafi NAVAREA bölgelerine göre yayınlanır. Gemi hangi NAVAREA'da seyrediyorsa o bölgenin uyarıları takip edilir. Bu mesajlar, NtM henüz yayınlamadan önce acil tehlikeleri (sürüklenen mayın, kayıp konteyner, fener arızası) bildirir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Navtex = en taze veri",
              text: `Bir tehlike sırasıyla önce Navigational Warning (Navtex), sonra T&P Notice, sonra kalıcı düzeltme olarak yayınlanır. En güncel bilgi her zaman Navtex/SafetyNET'tedir; bu mesajları izlemek harita düzeltmesinin canlı tamamlayıcısıdır.`,
            },
          ],
        },
        {
          subheading: "7.2 Bilgi akışının seyir planına bağlanması",
          paragraphs: [
            `Tüm bu bilgi kaynakları (NtM, T&P, ENC update, Navtex) seyir planlama aşamasında bir araya getirilir. Dördüncü Zabit, gözetim altında, planlanan rotanın geçtiği bölgeler için tüm güncel uyarıların kontrol edildiğini ve passage plan'a yansıtıldığını öğrenir. Bu bütüncül bakış, izole düzeltme işleminden çok daha değerlidir.`,
          ],
        },
      ],
    },
    {
      heading: "8. Tipik Hatalar ve Kalite Kontrol",
      sections: [
        {
          subheading: "8.1 En sık görülen düzeltme hataları",
          paragraphs: [
            `Atlanmış NtM haftası, yanlış pozisyona işlenmiş düzeltme, iptal edilen T&P'nin listeden çıkarılmaması, ENC permit süresinin dolması ve düzeltme log'unun güncellenmemesi en sık görülen hatalardır. Dördüncü Zabit, bu hataların her birinin nasıl PSC tespitine veya seyir tehlikesine dönüşebileceğini öğrenir.`,
            `Kalite kontrol için çift-kontrol prensibi uygulanır: bir zabit düzeltmeyi işler, diğeri (genelde İkinci Zabit) doğrular. Periyodik olarak rastgele seçilen haritalarda düzeltme zincirinin eksiksizliği denetlenir.`,
          ],
          table: {
            caption: `Hata Türü ve Sonuçları`,
            headers: ["Hata", "Sonuç", "Önlem"],
            rows: [
              ["Atlanmış NtM haftası", "Eksik tehlike bilgisi", "Sıralı işleme + log kontrolü"],
              ["Yanlış pozisyon", "Sahte güvenli alan", "İkinci kez doğrulama"],
              ["İptal T&P listede kalır", "Gereksiz rota kısıtı", "NtM cancellation takibi"],
              ["ENC permit dolması", "Harita görüntülenemez", "Permit son tarih izleme"],
              ["Log güncellenmemesi", "PSC tespiti", "Her düzeltmede kayıt"],
            ],
          },
        },
        {
          subheading: "8.2 PSC denetimine hazırlık",
          paragraphs: [
            `PSC denetçisi, rastgele harita seçer ve son NtM'e kadar düzeltilmiş olduğunu, Chart Correction Log'un güncel olduğunu kontrol eder. Dördüncü Zabit, bu denetime hazırlık olarak düzeltme kayıtlarının ve yayın güncelliklerinin düzenli tutulmasının önemini kavrar. Düzenli rutin, denetim anında telaş yaşanmasını önler.`,
          ],
        },
      ],
    },
    {
      heading: "9. Pratik Kontrol Listesi ve Kapanış",
      sections: [
        {
          subheading: "9.1 Dördüncü Zabit harita-yayın destek kontrol listesi",
          bullets: [
            `Gelen NtM dosyaları doğru hafta ve eksiksiz mi?`,
            `Folio'ya ait Notice'lar ayrıştırıldı mı?`,
            `Kağıt düzeltmeler violet mürekkeple ve doğru pozisyona işlendi mi?`,
            `Her düzeltme sonrası NtM no. harita köşesine yazıldı mı?`,
            `Chart Correction Log (NP133A) güncel ve İkinci Zabit onaylı mı?`,
            `Aktif/iptal T&P Notice'lar güncellendi mi?`,
            `ENC update yüklendi ve "applied" onayı alındı mı?`,
            `ENC permit son kullanma tarihleri izleniyor mu?`,
            `Temel yayınlar (Lights, ALRS, Pilots, Tide Tables) güncel mi?`,
            `Navtex/Navigational Warning rotaya işlendi mi?`,
          ],
          paragraphs: [
            `Harita ve yayın düzeltmesi, görünürde tekdüze bir idari iş gibi dursa da geminin seyir güvenliğinin sessiz omurgasıdır. Dördüncü Zabit bu görevde kazandığı titizlik, sıralı işleme disiplini ve çapraz doğrulama alışkanlığını ileride İkinci Zabit olarak doğrudan kullanacaktır. Güncel bir harita, denizdeki tehlikeyi gemiye zamanında haber veren en sadık nöbetçidir; o nöbetçiyi uyanık tutmak bu görevin özüdür.`,
          ],
        },
      ],
    },
  ],
};

export default content;
