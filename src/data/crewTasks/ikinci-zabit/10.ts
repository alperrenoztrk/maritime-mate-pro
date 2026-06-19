import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Saat değişimi (clock change) ve seyir defteri zaman yönetimi",
  roleSlug: "ikinci-zabit",
  taskIndex: 10,
  estimatedPages: 25,
  intro: `İkinci Zabit, doğu-batı doğrultusunda yapılan seferlerde gemi saatinin (ship's clock) sistematik biçimde ileri veya geri alınmasından ve bu değişimin tüm resmî kayıtlara tutarlı yansıtılmasından sorumludur. Saat değişimi (clock change); seyir defteri (deck logbook), GMDSS radyo kaydı, dinlenme saati (rest hour) çizelgeleri ve ETA hesapları üzerinde doğrudan etki yaratır ve yanlış yönetildiğinde MLC 2006 dinlenme saati ihlaline veya kayıt sürekliliğinin kopmasına yol açar. Bu bölüm; standart saat dilimleri ve zone description mantığını, saatin ne zaman ve hangi vardiyada değiştirileceğini, UTC referansının sabit tutulmasını, retard/advance kavramlarını ve uluslararası tarih hattı (date line) geçişini STCW A-VIII/1 ve MLC 2006 çerçevesinde adım adım açıklar. İkinci Zabit, kaptan onayı alınmış bir saat değişim planı (clock change plan) hazırlar, mürettebata duyurur ve dinlenme saatlerinin ihlal edilmemesini güvence altına alır.`,
  sources: [
    "STCW Code Section A-VIII/1 — Fitness for Duty (Rest Hours)",
    "MLC 2006, Standard A2.3 — Hours of Work and Hours of Rest",
    "STCW 1978 (as amended) — Hours of Rest and Watchkeeping",
    "IMO Resolution A.1047(27) — Principles of Minimum Safe Manning",
    "SOLAS Chapter V, Regulation 28 — Records of Navigational Activities",
    "Admiralty List of Radio Signals (ALRS) Vol. 2 — Time Signals & Standard Times",
    "The Mariner's Handbook (NP100) — Time and Zone Time",
    "Bridge Procedures Guide (ICS, 5th Edition)",
    "Nautical Almanac — Standard Times of the World",
  ],
  chapters: [
    {
      heading: "1. Zaman Sistemlerinin Temeli: UTC, GMT, Zone Time ve LMT",
      lead: `Gemi seyrinde kullanılan farklı zaman sistemlerinin doğru ayrımı, hem astronomik seyrin hem de idari kayıtların doğruluğunun temelidir. İkinci Zabit her sistemin ne için kullanıldığını ve birbirine nasıl çevrildiğini bilmelidir.`,
      sections: [
        {
          subheading: "1.1 UTC, GMT ve zaman referansının sabitliği",
          paragraphs: [
            `Universal Time Coordinated (UTC), modern gemicilikte tüm uluslararası zaman referansının temelidir ve pratikte Greenwich Mean Time (GMT) ile eşdeğer kabul edilir. UTC atomik saat tabanlı, kesintisiz ve sabit bir referanstır; gemi nerede olursa olsun UTC değişmez. İkinci Zabit, saat değişimlerini yönetirken bir altın kuralı esas alır: gemi saati (zone time) sefer boyunca defalarca değişse de UTC referansı asla kaymaz.`,
            `GMDSS radyo kayıtları, distress/urgency/safety mesajları, EGC mesajları ve navigational warning'ler daima UTC ile zaman damgalanır. Bu sayede gemi hangi saat dilimindeyse olsun, kayıtlar dünya genelinde tek bir zaman ekseninde karşılaştırılabilir. Seyir defterindeki olaylar zone time ile yazılsa da, kritik olaylarda UTC karşılığının da not edilmesi iyi denizcilik pratiğidir.`,
            `Astronomik seyirde (celestial navigation) tüm gözlemler UTC ile zamanlanır; çünkü Nautical Almanac'taki Greenwich Hour Angle (GHA) ve declination değerleri UTC tabanlıdır. Saniyelik hata bile pozisyonda nautical mile mertebesinde sapmaya yol açtığından, kronometre ve UTC referansının doğruluğu hayati önemdedir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Altın kural: UTC sabit kalır",
              text: `Saat değişimi gemi saatini (zone time) değiştirir, UTC'yi değiştirmez. GMDSS log ve distress kayıtları her zaman UTC ile tutulur; böylece saat değişimi kayıt sürekliliğini bozmaz.`,
            },
          ],
        },
        {
          subheading: "1.2 Local Mean Time (LMT) ve zone time ayrımı",
          paragraphs: [
            `Local Mean Time (LMT), belirli bir boylamın güneşe göre ortalama zamanıdır; her boylam derecesi için 4 dakika değişir (360° / 24 saat = 15°/saat = 4 dakika/derece). LMT, gün doğumu/batımı, twilight ve ay gözlemleri için kullanılır. İkinci Zabit, gece seyrinde star sight planlaması yaparken LMT'yi esas alır, çünkü twilight zamanları boylama bağlıdır.`,
            `Zone time ise idari kolaylık için 15° genişliğindeki standart saat dilimlerini esas alan, tam saat farklarıyla UTC'ye bağlanmış zamandır. Gemi saati genellikle zone time olarak tutulur; böylece dakikalı kesirler yerine UTC'den tam saat farkı kullanılır. LMT ile zone time arasındaki fark, geminin dilim merkezinden ne kadar uzakta olduğuna bağlı olarak en fazla yarım saate (yaklaşık 7.5°) ulaşabilir.`,
          ],
          table: {
            caption: `Zaman Sistemleri ve Kullanım Alanları`,
            headers: ["Sistem", "Tanım", "Birincil Kullanım"],
            rows: [
              ["UTC / GMT", "Greenwich tabanlı sabit referans", "GMDSS log, almanac, distress"],
              ["Zone Time", "15° dilimli, tam saat farklı", "Gemi saati, vardiya, logbook"],
              ["LMT", "Boylama özgü güneş zamanı", "Gün doğumu/batımı, twilight"],
              ["Standard Time", "Ülkenin yasal sabit saati", "Liman operasyonu, ETA"],
            ],
          },
        },
      ],
    },
    {
      heading: "2. Standart Saat Dilimleri ve Zone Description Mantığı",
      sections: [
        {
          subheading: "2.1 15°'lik dilimler ve zone description (ZD)",
          paragraphs: [
            `Dünya, Greenwich'i (0° boylam) merkez alan 24 standart saat dilimine bölünür; her dilim 15° genişliğindedir ve UTC'den tam bir saat farkıyla ayrılır. Zone Description (ZD), o dilimin gemi saatinden UTC'ye ulaşmak için uygulanması gereken işareti ve değeri gösterir. Doğu boylamlarda ZD negatif (örn. ZD −5), batı boylamlarda pozitiftir (örn. ZD +5); kural: "doğu boylamda zone time UTC'den ileridedir".`,
            `ZD'yi hesaplamak için boylam 15'e bölünür ve en yakın tam sayıya yuvarlanır. Örneğin 67° W boylamı 15'e bölününce 4.47 çıkar; en yakın tam sayı 4 olduğundan ZD +4 olur. Greenwich merkezli sıfırıncı dilim ±7.5° aralığını kapsar; sınır dilimleri (±172.5° ile 180°) ise yarım dilimdir ve tarih hattıyla birleşir.`,
            `İkinci Zabit, gemi saatini ZD esas alarak ayarlar. UTC'den zone time'a geçişte: doğu boylamda ZD eklenir, batı boylamda çıkarılır (Zone Time = UTC − ZD, işaretli ZD ile). Bu mekanik tutarlılık, saat değişim planının doğru yön ve miktarda yapılmasını sağlar.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "Zone Description işareti",
              text: `Batı boylam → ZD pozitif (UTC = ZT + ZD). Doğu boylam → ZD negatif (UTC = ZT − |ZD|). Hatırlatıcı: "Longitude East, Greenwich Time Least" ve "Longitude West, Greenwich Time Best".`,
            },
          ],
        },
        {
          subheading: "2.2 Zone time ile standard time (legal time) farkı",
          paragraphs: [
            `Zone time tamamen coğrafi 15°'lik dilimlere dayanırken, ülkelerin yasal standart saati (standard / legal time) idari sınırlara göre belirlenir ve genellikle 15° dilimlerle birebir örtüşmez. Bazı ülkeler tek bir saat dilimi kullanırken (örn. Çin tek ZD ile yönetilir) bazıları yarım saatlik (örn. Hindistan UTC+5:30) veya çeyrek saatlik (örn. Nepal UTC+5:45) sapmalar uygular.`,
            `Yaz saati uygulaması (Daylight Saving Time / Summer Time) standart saati mevsime göre bir saat ileri kaydırır. İkinci Zabit, liman yaklaşımında ve ETA hesabında geminin zone time'ı yerine limanın yürürlükteki yasal saatini esas almalıdır; aksi halde pilot station randevusu, VTS reporting saati veya cargo operation başlangıcı bir veya daha fazla saat kayar.`,
          ],
          table: {
            caption: `Boylam – Zone Description İlişkisi (Örnekler)`,
            headers: ["Boylam", "15'e bölüm", "ZD", "UTC'ye göre"],
            rows: [
              ["7° E", "0.47", "−0", "Greenwich dilimi"],
              ["28° E", "1.87", "−2", "UTC +2 saat"],
              ["52° E", "3.47", "−3", "UTC +3 saat"],
              ["45° W", "3.00", "+3", "UTC −3 saat"],
              ["120° W", "8.00", "+8", "UTC −8 saat"],
            ],
          },
        },
      ],
    },
    {
      heading: "3. Retard ve Advance: Saatin Hangi Yöne Alınacağı",
      sections: [
        {
          subheading: "3.1 Doğuya seyirde saat ileri (advance / lose time)",
          paragraphs: [
            `Gemi doğuya doğru seyrederken boylam artar (E yönünde) ve her 15° geçildiğinde zone time bir saat ileri alınmalıdır (advance / put clocks forward). Bu durumda gemi "saat kaybeder"; yani o güne ait toplam saat 24 yerine 23 olur ve mürettebatın o gün için kullanabileceği zaman bir saat kısalır. Doğuya seferlerde dinlenme saati planlaması bu nedenle daha hassastır.`,
            `Saat ileri alındığında, ileri atlanan saat fiilen "yaşanmaz"; örneğin gemi saati 02:00'den 03:00'a alınırsa 02:00–03:00 arası saat dilimi o gün için kaybolur. İkinci Zabit, vardiya çizelgesini ve dinlenme bloklarını buna göre düzenler; ileri alınan saat, ilgili vardiyanın süresini bir saat kısaltacak veya bir mürettebatın dinlenme bloğunu daraltacak şekilde uygulanmamalıdır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Doğuya seyir dinlenme saatini sıkıştırır",
              text: `Saat ileri (advance) alındığında gün 23 saate iner. Bu saatin tek bir kişinin vardiyasından veya dinlenme bloğundan kesilmesi, MLC 2006'nın 24 saatte minimum 10 saat dinlenme kuralını ihlal edebilir. Kayıp saat ekibe adil dağıtılmalıdır.`,
            },
          ],
        },
        {
          subheading: "3.2 Batıya seyirde saat geri (retard / gain time)",
          paragraphs: [
            `Gemi batıya doğru seyrederken boylam azalır (W yönünde) ve her 15° geçildiğinde zone time bir saat geri alınmalıdır (retard / put clocks back). Bu durumda gemi "saat kazanır"; o güne ait toplam saat 24 yerine 25 olur. Batıya seferler dinlenme saati açısından daha rahattır çünkü ek bir saat oluşur.`,
            `Saat geri alındığında, geri alınan saat dilimi iki kez yaşanır; örneğin gemi saati 03:00'ten 02:00'a alınırsa 02:00–03:00 arası iki kez geçilir. Seyir defterinde bu durum açıkça belirtilmeli, mükerrer saat dilimine ait olaylar karışmaması için ikinci geçişe not düşülmelidir. İkinci Zabit, kazanılan saati genellikle gece vardiyasına dağıtarak dinlenmeyi iyileştirir.`,
          ],
          table: {
            caption: `Retard ve Advance Özeti`,
            headers: ["Seyir yönü", "Boylam", "İşlem", "Gün uzunluğu", "Dinlenme etkisi"],
            rows: [
              ["Doğuya", "E artar", "Saat ileri (advance)", "23 saat", "Sıkışır (kayıp saat)"],
              ["Batıya", "W artar", "Saat geri (retard)", "25 saat", "Rahatlar (kazanılan saat)"],
            ],
          },
        },
      ],
    },
    {
      heading: "4. Saat Değişim Planı: Ne Zaman ve Kaç Saat",
      sections: [
        {
          subheading: "4.1 Değişimin gece vardiyalarına bölünmesi",
          paragraphs: [
            `Uzun bir okyanus geçişinde gemi birden çok saat dilimi geçer; örneğin Atlantik'i batıya geçen bir gemi 5–6 saatlik toplam fark biriktirebilir. Bu farkın tek seferde uygulanması hem vardiya düzenini hem dinlenmeyi ciddi bozar. İkinci Zabit, toplam farkı sefer günlerine yayarak her gün en fazla bir saatlik değişim planlar.`,
            `Saat değişimi, mürettebatın en az etkileneceği şekilde genellikle gece vardiyalarına (00:00–04:00 ve 04:00–08:00) bölünür. Yaygın pratik, bir saatlik değişimi yarımşar saat halinde iki gece vardiyasına dağıtmaktır; örneğin 00–04 vardiyasına yarım saat, 04–08 vardiyasına yarım saat. Böylece tek bir vardiyacı tüm yükü taşımaz ve dinlenme blokları daha dengeli korunur.`,
            `Saat değişim planı yazılı hazırlanır ve kaptan onayına sunulur. Planda; her günün değişim miktarı (ör. +30 dk × 2 vardiya), hangi gece, hangi vardiyalara dağıtılacağı, yeni gemi saatinin UTC'ye göre ZD'si ve mürettebata duyuru zamanı açıkça belirtilir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Örnek — Atlantik batı geçişi saat planı",
              text: `Toplam fark +5 saat (retard), 5 günlük geçiş. Plan: her gece 04–08 vardiyasında saat 30 dk, 00–04 vardiyasında 30 dk geri alınır; günde toplam +1 saat. 5 gün sonunda gemi ZD +5 olur, dinlenme blokları her gün 30'ar dk genişlemiş, kimse mağdur olmamış olur.`,
            },
          ],
        },
        {
          subheading: "4.2 Liman varışına göre senkronizasyon",
          paragraphs: [
            `Saat değişim planı, gemi saatinin varış limanının yasal saatine sefer sonunda tam oturacak şekilde geriye doğru hesaplanır. İkinci Zabit, varış limanının standard time'ını (DST dahil) tespit eder, mevcut gemi saati ile arasındaki toplam farkı bulur ve bunu kalan sefer günlerine böler. Böylece gemi limana vardığında ekibin biyolojik saati liman saatine yakın, ETA ve operasyon saatleri tutarlı olur.`,
            `Eğer varış limanı zone time'dan farklı yarım saatlik bir yasal saat kullanıyorsa (örn. UTC+5:30), son değişim yarım saatlik bir düzeltmeyle yapılır. Pilot station ETA'sı, VTS reporting ve cargo readiness saatleri her zaman limanın yasal saatiyle bildirilir; gemi içi zone time ile karıştırılmamalıdır.`,
          ],
        },
      ],
    },
    {
      heading: "5. MLC 2006 Dinlenme Saatleri ve STCW Uyumu",
      sections: [
        {
          subheading: "5.1 Minimum dinlenme limitleri",
          paragraphs: [
            `MLC 2006 Standard A2.3 ve STCW Code A-VIII/1, denizcilerin dinlenme saatleri için iki temel limit koyar: herhangi bir 24 saatlik dönemde en az 10 saat dinlenme ve herhangi bir 7 günlük dönemde en az 77 saat dinlenme. 10 saatlik dinlenme en fazla iki bloğa bölünebilir ve bu blokların biri en az 6 saat kesintisiz olmalıdır; iki ardışık dinlenme bloğu arasındaki süre 14 saati aşamaz.`,
            `Saat değişimi bu limitleri doğrudan etkiler çünkü dinlenme saatleri "gerçek geçen zaman" üzerinden değil, gemi saatine göre tutulan çizelgeler üzerinden hesaplanır. Doğuya seyirde saat ileri alındığında 24 saatlik pencere fiilen 23 saate inerse, bir mürettebatın o pencerede 10 saatlik dinlenmeyi tamamlaması zorlaşır. İkinci Zabit bu daralmayı planda öngörmeli ve dinlenme bloklarını koruyacak şekilde değişimi dağıtmalıdır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MLC 2006 / STCW A-VIII/1 — Dinlenme limitleri",
              text: `Minimum dinlenme: 24 saatte ≥ 10 saat (en fazla 2 blok, biri ≥ 6 saat kesintisiz) ve 7 günde ≥ 77 saat. Bu limitlerin saat değişimi nedeniyle ihlali, PSC denetiminde non-conformity ve gerekçeli kayıt zorunluluğu doğurur.`,
            },
          ],
        },
        {
          subheading: "5.2 Saat değişiminin dinlenme kaydına yansıtılması",
          paragraphs: [
            `Dinlenme saati kayıtları (IMO/ILO formatındaki Records of Rest) gemi saatine göre tutulur. Saat değişimi olan günlerde, kayıt formuna o günün 24 yerine 23 veya 25 saat olduğu açıkça not edilmelidir; aksi halde denetimde dinlenme toplamı tutarsız görünür. İkinci Zabit, değişim günü için kayıt formunda saat değişiminin yönünü ve miktarını dipnot olarak işler.`,
            `Bazı şirketler ve ekipler, dinlenme hesaplarının doğruluğu için saat değişimi günlerinde dinlenmeyi UTC tabanlı kontrol eder. İkinci Zabit, planı hazırlarken her vardiyacının değişimden sonra hâlâ 24 saatte 10 saatlik dinlenmeye sahip olduğunu çizelge üzerinde doğrular; çakışma varsa değişimin başka vardiyaya kaydırılması veya iki güne bölünmesi gerekir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Kayıp saat tek kişiye yüklenmez",
              text: `Doğuya seyirde kaybedilen saat tek bir vardiyacının dinlenme bloğundan kesilirse o kişi 24 saatte 10 saat dinlenme kuralının altına düşebilir. Değişim, dinlenmesi en uygun vardiyaya yerleştirilir veya çalışma süresinden (vardiya boyu) düşülür.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Seyir Defteri ve GMDSS Kaydında Zaman Sürekliliği",
      sections: [
        {
          subheading: "6.1 Deck logbook'a saat değişiminin işlenmesi",
          paragraphs: [
            `SOLAS V/28, seyirle ilgili tüm faaliyetlerin ve olayların kaydını zorunlu kılar; saat değişimi de kayda geçirilmesi gereken bir seyir olayıdır. İkinci Zabit, saat değişimini deck logbook'a şu unsurlarla işler: değişim anı (eski gemi saati ve yeni gemi saati), değişim miktarı ve yönü (örn. "Clocks retarded 30 min"), yeni zone description ve kaptanın onay referansı.`,
            `Saat geri alındığında (retard) aynı saat dilimi iki kez geçildiğinden, defter girişlerinde karışıklığı önlemek için ikinci geçişe "2nd time" gibi bir not düşülür veya UTC karşılığı yazılır. Saat ileri alındığında (advance) atlanan saat dilimine ait boş satır bırakılmaz; girişler kesintisiz devam eder ve değişim satırı açıkça belirtilir.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "SOLAS V/28 — Seyir kayıtları",
              text: `Geminin seyriyle ilgili olaylar ve faaliyetler, sonradan yeniden oluşturulabilecek detayda kayıt altına alınmalıdır. Saat değişimi, kayıt sürekliliğini koruyacak biçimde (eski/yeni saat, miktar, yön, ZD) deftere işlenir.`,
            },
          ],
        },
        {
          subheading: "6.2 GMDSS radyo kaydı ve UTC tutarlılığı",
          paragraphs: [
            `GMDSS radyo kaydı (radio log), distress/urgency/safety haberleşmeleri ve test kayıtları daima UTC ile tutulur ve saat değişiminden etkilenmez. Bu, kazadan sonra yapılan soruşturmalarda zaman çizelgesinin tek bir referans eksende doğru kurulabilmesi için kritiktir. İkinci Zabit veya GMDSS sorumlusu, gemi zone time defalarca değişse de radyo kaydındaki UTC ekseninin kesintisiz aktığını güvence altına alır.`,
            `Köprüüstündeki saatlerden en az biri (master clock veya GMDSS console clock) sürekli UTC gösterecek şekilde ayarlı tutulmalıdır; diğer saatler zone time gösterir. EGC alıcısından gelen NAVTEX ve SafetyNET mesajları UTC damgalıdır; bunların gemi saatine göre değil UTC'ye göre değerlendirilmesi, navigational warning geçerlilik pencerelerinin doğru yorumlanması için gereklidir.`,
          ],
          table: {
            caption: `Kayıt Türü – Kullanılan Zaman Referansı`,
            headers: ["Kayıt", "Zaman referansı", "Saat değişiminden etkilenir mi?"],
            rows: [
              ["Deck logbook (olaylar)", "Zone time (+ UTC notu)", "Evet, satır işlenir"],
              ["GMDSS / radio log", "UTC", "Hayır"],
              ["Records of Rest", "Zone time (24/23/25 h notu)", "Evet, dipnotlanır"],
              ["EGC / NAVTEX mesaj", "UTC", "Hayır"],
              ["ETA / liman bildirimi", "Liman legal time", "Evet, dönüştürülür"],
            ],
          },
        },
      ],
    },
    {
      heading: "7. Uluslararası Tarih Hattı (International Date Line) Geçişi",
      sections: [
        {
          subheading: "7.1 Tarih hattının mantığı ve tarih atlama",
          paragraphs: [
            `Uluslararası Tarih Hattı (IDL), yaklaşık 180° boylamı izleyen, doğu ve batı yarımkürelerin tarih sınırıdır. Greenwich'ten doğuya ve batıya gidildiğinde biriken saat farkları 180°'de tam 24 saate ulaşır; bu nedenle hat geçilirken tarih bir gün değiştirilir. Batıdan doğuya (W'den E'ye) geçişte tarih bir gün geri alınır (aynı gün iki kez yaşanır); doğudan batıya (E'den W'ye) geçişte tarih bir gün ileri atlanır (bir gün atlanır).`,
            `Pratikte hat 180° boylamını birebir izlemez; ülkelerin idari tercihleriyle zikzak çizer (örn. Kiribati ve bazı Pasifik adaları için sapmalar vardır). İkinci Zabit, Pasifik geçişlerinde hattın gemi rotasını tam nerede kestiğini ALRS ve almanac'tan teyit eder, çünkü tarih değişimi saat değişiminden ayrı ve ek bir işlemdir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Tarih hattı yön kuralı",
              text: `Batıdan doğuya geçiş (saat ileri biriken yön) → tarih bir gün GERİ. Doğudan batıya geçiş → tarih bir gün İLERİ. Saat (zone time) ZD'ye göre ayrıca ayarlanır; tarih değişimi buna ek bir adımdır.`,
            },
          ],
        },
        {
          subheading: "7.2 Logbook, kayıt ve mürettebata etkisi",
          paragraphs: [
            `Tarih hattı geçişinde seyir defterine tarih değişimi açıkça işlenir: "Crossed International Date Line, date advanced/retarded by one day". Bir günün atlanması veya tekrarlanması, dinlenme saati kayıtlarında ve maaş/çalışma günü hesaplarında karışıklığa yol açabileceğinden, kayıtlar UTC ekseniyle çapraz kontrol edilir.`,
            `Tarih hattı geçişi GMDSS UTC kaydını etkilemez çünkü UTC kesintisizdir; etkilenen yalnızca gemi tarihidir. İkinci Zabit, hat geçişini saat değişim planından ayrı bir kalem olarak ele alır; tarih değişimi ve gerekli zone time değişimi aynı gün üst üste gelirse her ikisi de ayrı ayrı defterde belgelenir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Örnek — Doğuya Pasifik geçişi",
              text: `Gemi 180° hattını batıdan doğuya geçer (örn. Japonya → Hawaii). Tarih bir gün geri alınır: 15 Haziran Pazartesi tekrar yaşanır. Aynı sefer boyunca zone time da retard ile ZD +9'dan ZD −10 yönüne ayarlanır; tarih ve saat değişimi defterde iki ayrı satır olarak işlenir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "8. Saat Değişiminin Duyurusu ve Bridge Team Koordinasyonu",
      sections: [
        {
          subheading: "8.1 Mürettebata duyuru ve ilan",
          paragraphs: [
            `Saat değişimi, onaylandıktan sonra tüm gemiye duyurulmalıdır; aksi halde köprüüstü, makine dairesi ve serviste karışıklık doğar. Yaygın pratik, bir önceki gün veya değişim sabahı "Notice to Crew" ilanıyla değişimin yönünü, miktarını ve saatini bildirmektir. İlan, mess room ve ilan panolarına asılır; köprüüstü gece emir defterine (night order book) de işlenir.`,
            `Duyuru özellikle vardiya devri için kritiktir; saat ileri/geri alındığında devralan zabit yeni gemi saatini bilmeli, makine dairesi watch çizelgesini güncellemelidir. İkinci Zabit, değişimin tüm departmanlarca aynı anda uygulanmasını koordine eder; gemideki tüm saatlerin (köprüüstü, makine, kamara) eşzamanlı ayarlanması iyi pratiktir.`,
          ],
        },
        {
          subheading: "8.2 Night order book ve vardiya devri",
          paragraphs: [
            `Kaptanın night order book'una saat değişimi açıkça yazılır: hangi vardiyada, kaç dakika, hangi yöne. Gece vardiyacısı, değişimi köprüüstü saatinde uygular ve deck logbook'a işler. İkinci Zabit, gece vardiyasındaki zabite değişimin nasıl ve ne zaman yapılacağını brifingde net biçimde aktarır.`,
            `Vardiya devrinde devreden zabit, saat değişiminin yapılıp yapılmadığını ve yeni gemi saatinin ne olduğunu devralan zabite teyit ettirir. Eksik veya çift uygulanan saat değişimi (ör. iki vardiyacının da aynı değişimi yapması) hem zaman kaydını hem dinlenme hesabını bozar; bu nedenle devirde tek ve net bir uygulama doğrulaması yapılmalıdır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Çift uygulama tehlikesi",
              text: `Saat değişimi devirde net belgelenmezse iki vardiyacı aynı değişimi tekrar uygulayabilir; gemi saati hedeflenenden 1 saat sapar, ETA ve dinlenme hesabı bozulur. Değişim tek bir vardiyada, tek seferde ve logbook'a işlenerek yapılmalıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "9. ETA Yönetimi ve Tipik Hatalar",
      sections: [
        {
          subheading: "9.1 ETA hesabında zaman referansı tutarlılığı",
          paragraphs: [
            `ETA (Estimated Time of Arrival), liman, acente, VTS ve charterer için bağlayıcı bir bilgidir ve hangi zaman referansıyla verildiği mutlaka belirtilmelidir. İkinci Zabit, ETA'yı genellikle UTC olarak hesaplar (mesafe/hız tabanlı) ve ardından varış limanının yasal saatine çevirerek bildirir. Karışıklığı önlemek için bildirimlerde "ETA pilot station 0600 LT (0030 UTC)" gibi çift gösterim iyi pratiktir.`,
            `Sefer boyunca biriken saat değişimleri ETA üzerinde dolaylı etki yaratmaz çünkü ETA UTC tabanlı hesaplanır; ancak limana yaklaşırken gemi zone time'ı henüz liman saatine senkronize edilmemişse, gemi içi planlamada saat kayması yaşanabilir. Bu nedenle saat değişim planı, varıştan önce gemi saatini liman saatine getirecek şekilde tamamlanmalıdır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "ETA bildiriminde zaman dilimini belirt",
              text: `Her ETA bildirimi zaman referansını (UTC / LT) içermelidir. "ETA 0600" yetersizdir; pilot, acente veya VTS bunu kendi saatine göre yorumlarsa 1+ saatlik randevu kayması ve operasyon aksaması doğar.`,
            },
          ],
        },
        {
          subheading: "9.2 Sık görülen hatalar ve önlemler",
          paragraphs: [
            `En yaygın hatalar; saat değişiminin yanlış yöne yapılması (doğuya seyirde geri almak gibi), değişimin tek kişiye yüklenerek dinlenme ihlali doğurması, logbook'a işlenmemesi ve GMDSS kaydının yanlışlıkla zone time'a çevrilmesidir. Bir diğer hata, tarih hattı geçişini saat değişimiyle karıştırıp tarih düzeltmesini atlamaktır.`,
            `Önlem olarak İkinci Zabit; her sefer başında toplam saat farkını ve yönünü hesaplar, değişimi günlere böler, kaptan onayı alır, mürettebata duyurur ve her uygulamayı logbook ile dinlenme kaydına tutarlı işler. UTC referansının sabit tutulması ve kritik kayıtlarda UTC karşılığının not edilmesi, hataların büyük çoğunluğunu en baştan önler.`,
          ],
          table: {
            caption: `Tipik Saat Değişimi Hataları ve Önlemler`,
            headers: ["Hata", "Sonuç", "Önlem"],
            rows: [
              ["Yanlış yön (E'de retard)", "Gemi saati 2 saat sapar", "Yön kontrolü: E ileri, W geri"],
              ["Tek vardiyaya yükleme", "MLC dinlenme ihlali", "Değişimi vardiyalara böl"],
              ["Logbook'a işlememe", "Kayıt sürekliliği kopar", "Eski/yeni saat + ZD yaz"],
              ["GMDSS'i zone time'a çevirme", "Soruşturmada zaman karışır", "Radio log daima UTC"],
              ["Tarih hattını atlama", "Yanlış tarih, kayıt hatası", "IDL geçişini ayrı işle"],
            ],
          },
        },
      ],
    },
    {
      heading: "10. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "10.1 İkinci Zabit'in saat değişimi checklist'i",
          bullets: [
            `Sefer başında çıkış ve varış limanı arasındaki toplam zone farkı ve yönü hesaplandı mı?`,
            `Toplam fark sefer günlerine bölündü, günlük en fazla 1 saatlik değişim planlandı mı?`,
            `Değişim gece vardiyalarına (00–04 / 04–08) dengeli dağıtıldı mı?`,
            `Her vardiyacının değişim sonrası 24 saatte ≥ 10 saat dinlenmesi korunuyor mu?`,
            `7 günlük 77 saat dinlenme limiti değişimle ihlal edilmiyor mu?`,
            `Saat değişim planı yazılı hazırlandı ve kaptan onayı alındı mı?`,
            `Değişim mürettebata (notice + night order book) duyuruldu mu?`,
            `Değişim deck logbook'a (eski/yeni saat, miktar, yön, yeni ZD) işlendi mi?`,
            `GMDSS / radio log UTC ekseninde sabit tutuldu mu?`,
            `Records of Rest formunda 23/25 saatlik gün dipnotlandı mı?`,
            `Tarih hattı geçişi varsa tarih düzeltmesi ayrı olarak yapıldı ve işlendi mi?`,
            `Varış öncesi gemi saati liman yasal saatine senkronize edildi mi?`,
            `ETA bildirimleri zaman referansı (UTC/LT) belirtilerek yapıldı mı?`,
          ],
          paragraphs: [
            `Saat değişimi yönetimi, denizci dinlenmesini, kayıt bütünlüğünü ve operasyonel zamanlamayı aynı anda etkileyen, görünüşte basit ama hata payı yüksek bir görevdir. İkinci Zabit'in işi sadece saati ileri/geri almak değil; UTC referansını sabit tutarak, değişimi adil dağıtarak ve her uygulamayı tutarlı belgeleyerek MLC 2006 dinlenme limitlerini koruyan ve seyir kaydının sürekliliğini bozmayan disiplinli bir süreç yürütmektir. İyi planlanmış bir clock change, hem mürettebatın yorgunluk kaynaklı hatalarını azaltır hem de PSC ve şirket denetimlerinde kusursuz bir kayıt zinciri ortaya koyar.`,
          ],
        },
      ],
    },
  ],
};

export default content;
