import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Mürettebat beslenme kalitesi ve bütçe yönetimi",
  roleSlug: "asci",
  taskIndex: 10,
  estimatedPages: 26,
  intro: `Gemi aşçısı, mürettebatın beslenme kalitesini MLC tarafından belirlenen kişi başı günlük gıda bütçesi (USD/day victualling rate) çerçevesinde sağlamakla yükümlüdür: bu, "kaliteli beslenme" ile "bütçe disiplini"ni aynı anda yönetmek demektir. Protein, karbonhidrat, vitamin ve mineral dengesi gözetilir; uzun seyirlerde scurvy (C vitamini eksikliği) ve diğer nutritional deficiency'leri önlemek için taze meyve/sebze stoku planlanır. Mürettebat memnuniyet anketleri ve menü rotasyon sistemi gemide morali doğrudan etkiler. Bu bölüm; victualling rate yönetimini, makro/mikro besin dengesini, uzun sefer eksiklik önlemeyi, maliyet kontrol tekniklerini ve memnuniyet/rotasyon sistemini adım adım açıklar.`,
  sources: [
    "MLC 2006 — Regulation 3.2 & Standard A3.2 (Food & Catering)",
    "FAO/WHO — Nutrient Requirements & Dietary Reference Intakes",
    "WHO — Guide to Ship Sanitation & nutrition guidance",
    "ILO/IMO — Guidelines on the Training of Ships' Cooks",
    "Codex Alimentarius — General Principles of Food Hygiene (CXC 1-1969)",
    "Nautical Institute — Ship Catering Management Best Practice",
    "Company victualling / provisioning budget procedures",
  ],
  chapters: [
    {
      heading: "1. Victualling Rate ve Bütçe Çerçevesi",
      lead: `İyi aşçı, sınırlı bütçeyle dengeli ve çeşitli menü çıkarandır.`,
      sections: [
        {
          subheading: "1.1 Kişi başı günlük gıda bütçesi (victualling rate)",
          paragraphs: [
            `Gemilerde gıda harcaması, kişi başı günlük bir bütçe (victualling rate, USD/kişi/gün) üzerinden yönetilir; bu oran şirket/charter politikasına ve bölgesel fiyatlara göre belirlenir. Aşçı, bu oranı aşmadan MLC'nin gerektirdiği yeterli miktar, besin değeri, kalite ve çeşitliliği sağlamak zorundadır. Toplam bütçe = victualling rate × mürettebat sayısı × gün sayısı; aşçı menü ve siparişlerini bu çerçeveye oturtur.`,
            `Bütçe yönetimi bir kısıt değil bir disiplindir: doğru sipariş (fazla/eksik almamak), FIFO ile israfı azaltmak, mevsimsel/ucuz ama besleyici malzemeyi (baklagil, yumurta, mevsim sebzesi) akıllıca kullanmak ve ikmal limanlarında fiyat avantajını değerlendirmek bütçeyi korur. Amaç, en düşük maliyetle değil, bütçe içinde en yüksek beslenme kalitesini elde etmektir.`,
          ],
          table: {
            caption: `Victualling Bütçe Hesabı — Örnek Mantık`,
            headers: ["Değişken", "Açıklama", "Etki"],
            rows: [
              ["Victualling rate", "USD/kişi/gün", "Bütçe tavanını belirler"],
              ["Mürettebat sayısı", "Toplam tüketici", "Toplam bütçeyi çarpan"],
              ["Sefer/ikmal arası gün", "Stok ve harcama dönemi", "Sipariş miktarını belirler"],
              ["İsraf oranı", "Bozulan/atılan gıda", "Düşükse bütçe verimi artar"],
            ],
          },
          callouts: [
            {
              type: "regulation",
              title: "MLC — bütçe kaliteyi düşüremez",
              text: `MLC 2006, gıdanın yeterli miktar, besin değeri, kalite ve çeşitlilikte ve ücretsiz sağlanmasını ister. Bütçe disiplini bu standardı düşürmek için bir mazeret olamaz; aşçı ikisini birlikte dengeler.`,
            },
          ],
        },
        {
          subheading: "1.2 Maliyet kayıt ve takibi",
          paragraphs: [
            `Aşçı, harcamaları (provision faturaları, teslim alınan miktarlar) düzenli kaydeder ve dönemsel olarak bütçeyle karşılaştırır; sapma erken görülürse menü/sipariş ayarlanabilir. Bu kayıtlar şirkete raporlanır ve denetimde sunulur. Şeffaf maliyet takibi, hem bütçe kontrolünü hem de aşırı harcama/eksik beslenme uçlarına kaymayı önler.`,
          ],
        },
      ],
    },
    {
      heading: "2. Makro Besin Dengesi",
      sections: [
        {
          subheading: "2.1 Protein, karbonhidrat ve yağ dengesi",
          paragraphs: [
            `Gemi çalışanının enerji ihtiyacı, vardiya temposu ve fiziksel iş nedeniyle yüksektir. Genel hedef; günlük enerjinin yaklaşık %50-55'i karbonhidrattan, %15-20'si proteinden, %25-30'u yağdan gelecek şekilde dağıtılmasıdır. Aşçı, her ana öğüne bir kaliteli protein (et, balık, yumurta, baklagil), bir kompleks karbonhidrat (pirinç, makarna, patates, tam tahıl) ve renkli sebze ekleyerek bu dengeyi sahada kurar.`,
            `Bütçe baskısı altında protein dengesi, pahalı et yerine yumurta, baklagil, süt ürünleri ve dönüşümlü deniz ürünü gibi ekonomik ama kaliteli kaynaklarla korunabilir. Doymuş yağ, kızartma ve basit şeker sınırlanır; fırın/ızgara/buğulama dönüşümlü kullanılır. Bu, hem sağlığı hem bütçeyi birlikte gözetir.`,
          ],
          table: {
            caption: `Makro Besin Hedef Dağılımı (Kılavuz)`,
            headers: ["Makro Besin", "Enerji Payı", "Örnek Kaynak"],
            rows: [
              ["Karbonhidrat", "~%50-55", "Pirinç, makarna, patates, tam tahıl"],
              ["Protein", "~%15-20", "Et, balık, yumurta, baklagil, süt"],
              ["Yağ", "~%25-30", "Sıvı yağ, balık yağı, kuruyemiş"],
            ],
          },
          callouts: [
            {
              type: "tip",
              title: "Ekonomik protein dengesi",
              text: `Yumurta, baklagil ve süt ürünleri; pahalı eti tamamen değiştirmeden protein dengesini bütçe dostu biçimde korur. Haftalık menüde bunları dönüşümlü kullanmak hem maliyeti hem dengeyi yönetir.`,
            },
          ],
        },
        {
          subheading: "2.2 Porsiyon kontrolü ve enerji yeterliliği",
          paragraphs: [
            `Porsiyon disiplini hem yeterli enerji vermeyi hem de israfı/aşırı maliyeti önlemeyi sağlar. Aşçı, tüketim gözlemiyle porsiyonu kalibre eder: sürekli artan tabak fazla üretimi, biten tencere yetersizliği gösterir. Fiziksel iş yapan mürettebatın yeterli kalori alması önemlidir; bütçe disiplini, yetersiz beslenmeye dönüşmemelidir.`,
          ],
        },
      ],
    },
    {
      heading: "3. Mikro Besinler ve Uzun Seferde Eksiklik Önleme",
      sections: [
        {
          subheading: "3.1 Vitamin ve mineral dengesi",
          paragraphs: [
            `Mikro besinler (vitaminler ve mineraller) görünmez ama kritiktir: C vitamini bağışıklık ve doku için, demir kansızlığı önlemek için, kalsiyum/D vitamini kemik için, B grubu enerji metabolizması için gereklidir. Aşçı; taze meyve/sebze, kırmızı et, baklagil, süt ürünleri ve tam tahılı menüde tutarak bu dengeyi sağlar. Çeşitlilik, mikro besin yeterliliğinin doğal garantisidir.`,
            `Uzun okyanus geçişlerinde taze ürün tükendikçe mikro besin alımı düşer; bu yüzden aşçı eksiklik önlemeyi baştan planlar. Dondurulmuş sebze/meyve (vitaminin çoğunu korur), turunçgil suları ve gerektiğinde takviye, taze ürün bittiğinde devreye girer.`,
          ],
        },
        {
          subheading: "3.2 Scurvy ve nutritional deficiency önleme",
          paragraphs: [
            `Tarih boyunca denizcilerin yaşadığı skorbüt (scurvy), C vitamini eksikliğinin klasik örneğidir; diş eti kanaması, halsizlik ve yara iyileşmesinde gecikmeyle kendini gösterir. Aşçı, uzun seferin son haftalarında C vitamini kaynaklarını koruyarak (turunçgil, lahana turşusu, dondurulmuş sebze, meyve suyu konsantresi) bunu önler. Demir eksikliği (anemi), D vitamini ve B12 eksikliği de uzun seferde gözetilmesi gereken risklerdir.`,
            `Eksiklik önleme, taze meyve/sebze stokunun sefer süresine göre planlanmasıyla başlar (bkz. stok yönetimi görevi): taze ürün çabuk bozulanlardan dayanıklılara doğru kademelendirilir, biterken dondurulmuş/konserve/takviye köprü kurar. Bu öngörü, uzun seferin sonunda görülebilen yorgunluk ve sağlık sorunlarını önler.`,
          ],
          table: {
            caption: `Uzun Seferde Mikro Besin Köprüsü`,
            headers: ["Besin", "Risk", "Taze Bitince Kaynak"],
            rows: [
              ["C vitamini", "Scurvy", "Dondurulmuş sebze, turunçgil suyu, lahana turşusu"],
              ["Demir", "Anemi", "Kırmızı et, baklagil, tam tahıl"],
              ["Kalsiyum / D", "Kemik sağlığı", "Süt ürünü (UHT/toz), takviye"],
              ["B grubu / B12", "Enerji, sinir", "Et, yumurta, süt, tam tahıl"],
            ],
          },
          callouts: [
            {
              type: "example",
              title: "Skorbüt: tarihten ders",
              text: `Uzun seferlerde taze ürün bitince C vitamini eksikliği denizcileri hasta etmiştir. Modern aşçı, dondurulmuş sebze/meyve ve turunçgil konsantresiyle bu köprüyü kurarak skorbütü tarihte bırakır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Maliyet Kontrol Teknikleri",
      sections: [
        {
          subheading: "4.1 İsrafı azaltma ve verimli kullanım",
          paragraphs: [
            `Bütçenin en büyük sızıntısı israftır. Aşçı; FIFO rotasyonu, doğru porsiyonlama, taze ürünü raf ömrüne göre kademelendirme ve güvenli artıkları (uygun soğutma/ısıtma ile) bir sonraki öğünde değerlendirme yoluyla israfı kaynağında azaltır. Et/sebze kırpıntılarını çorba/sos/stok olarak değerlendirmek (nose-to-tail / root-to-stem mantığı) hem maliyeti hem atığı düşürür.`,
            `Doğru sipariş, fazla alıp bozulmayı ve eksik alıp menü bozulmasını birlikte önler; bu, stok yönetimiyle (bkz. ilgili görev) iç içedir. İyi planlanmış sipariş + düşük israf, bütçe içinde daha yüksek kalite demektir.`,
          ],
          bullets: [
            `FIFO + raf ömrüne göre kademeli kullanım`,
            `Doğru porsiyon ve güvenli artık değerlendirme`,
            `Kırpıntıları çorba/sos/stok olarak kullanma`,
            `Fazla/eksik almayan doğru sipariş`,
          ],
        },
        {
          subheading: "4.2 İkmal limanında fiyat ve kalite dengesi",
          paragraphs: [
            `İkmal (provisioning) limanları arasında fiyat farkı büyük olabilir; aşçı, ucuz ve kaliteli ürün bulunan limanlarda dayanıklı erzakı (kuru, konserve, dondurulmuş) stoklayarak bütçe avantajı yaratır. Ancak taze ürün kalitesi fiyattan önce gelir; düşük kaliteli ucuz ürün israfa dönüşürse tasarruf olmaz. Teslim alımda kalite kontrolü (bkz. stok yönetimi) bütçe yönetiminin ayrılmaz parçasıdır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Ucuz ama bozuk = pahalı",
              text: `Fiyatına aldanıp kalitesiz/yakın tarihli ürün almak israfa dönüşür ve gerçek maliyeti yükseltir. Bütçe yönetimi, fiyat ile kaliteyi birlikte gözetmektir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Memnuniyet Anketi ve Menü Rotasyon Sistemi",
      sections: [
        {
          subheading: "5.1 Mürettebat memnuniyet anketleri",
          paragraphs: [
            `Beslenme kalitesi öznel bir boyut da taşır: aynı besin değeri farklı sunum/lezzetle çok farklı algılanır. Aşçı, memnuniyet anketleri, öneri kutusu ve birebir geri bildirimle mürettebatın beğeni ve şikayetlerini izler. Bu veri, hem menü kalitesini iyileştirir hem de morali yükseltir; mürettebat "sesinin duyulduğunu" hissettiğinde memnuniyet artar. Anket sonuçları menü kararlarına yansıtılır ve şirket raporlamasına girebilir.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "MLC — şikayet ve refah",
              text: `MLC 2006, gıda/catering dahil yaşam koşulları için şikayet mekanizmaları ve düzenli denetim öngörür. Memnuniyet izleme, bu refah çerçevesinin pratik aracıdır.`,
            },
          ],
        },
        {
          subheading: "5.2 Menü rotasyon sistemi ve çeşitlilik",
          paragraphs: [
            `Menü rotasyonu (örn. 7/10/14 günlük döngü), menü yorgunluğunu (menu fatigue) önlerken bütçe ve stok planlamasını öngörülebilir kılar. Aşçı, döngüyü yeterince uzun tutarak ve tema günleri/özel gün menüleriyle (bkz. moral görevi) zenginleştirerek hem çeşitliliği hem maliyet kontrolünü dengeler. Rotasyon ayrıca makro/mikro besin dağılımının haftalık dengelenmesini de kolaylaştırır.`,
            `Aşçı, rotasyonu sefer profiline (süre, ikmal, iklim, mürettebat kompozisyonu) göre uyarlar ve geri bildirimle sürekli ince ayar yapar. İyi kurulmuş bir rotasyon, hem mürettebat memnuniyetini hem bütçe disiplinini hem de beslenme dengesini aynı sistemde buluşturur.`,
          ],
          table: {
            caption: `Menü Rotasyonu — Dengelenen Hedefler`,
            headers: ["Hedef", "Rotasyonun Katkısı"],
            rows: [
              ["Çeşitlilik / moral", "Menu fatigue'i önler"],
              ["Bütçe", "Sipariş ve harcamayı öngörülebilir kılar"],
              ["Beslenme dengesi", "Makro/mikro besni haftalık dağıtır"],
              ["Stok yönetimi", "Tüketim hızını planlanabilir kılar"],
            ],
          },
        },
      ],
    },
    {
      heading: "6. Beslenme Kalitesi, Bütçe ve Denetim",
      sections: [
        {
          subheading: "6.1 İki hedefi birlikte yönetmek",
          paragraphs: [
            `Aşçının asıl ustalığı, "kaliteli beslenme" ile "bütçe disiplini"ni çatıştırmadan birlikte yönetmesidir. Aşırı tasarruf yetersiz/sağlıksız beslenmeye, kontrolsüz harcama ise bütçe ihlaline yol açar; doğru yer ikisinin dengesidir. Bu denge; doğru sipariş, düşük israf, ekonomik ama kaliteli kaynak seçimi, çeşitlilik ve mikro besin sürekliliğiyle kurulur.`,
            `MLC denetimi ve şirket gözetimi her iki tarafı da kontrol eder: gıdanın yeterliliği/kalitesi ve harcama disiplini. Aşçı, menü, sipariş, maliyet ve memnuniyet kayıtlarını tutarak hem beslenme kalitesini hem bütçe uyumunu kanıtlar.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Bütçe için kaliteyi feda etme",
              text: `Aşırı tasarruf adına gıdayı yetersiz/dengesiz kılmak MLC ihlali ve sağlık/moral riskidir. Bütçe, kaliteyi düşürerek değil israfı/yanlış siparişi azaltarak korunur.`,
            },
          ],
        },
        {
          subheading: "6.2 Raporlama ve sürekli iyileştirme",
          paragraphs: [
            `Aşçı, dönemsel olarak menü, harcama ve memnuniyet verisini değerlendirir ve iyileştirme yapar: israfı düşüren, beğeniyi artıran ve dengeyi koruyan ayarlar. Bu sürekli iyileştirme döngüsü, hem bütçe verimini hem mürettebat sağlığını hem de morali zamanla yükseltir. İyi tutulan kayıt, hem denetimde hem de bir sonraki seferin planlamasında değerli bir referanstır.`,
          ],
        },
      ],
    },
    {
      heading: "7. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "7.1 Beslenme kalitesi ve bütçe checklist'i",
          bullets: [
            `Menü ve siparişler victualling rate çerçevesine oturuyor mu?`,
            `Makro denge (protein/karbonhidrat/yağ) her öğünde gözetildi mi?`,
            `Ekonomik protein kaynakları (yumurta/baklagil) dengeli kullanıldı mı?`,
            `Mikro besin sürekliliği (özellikle C vitamini) planlandı mı?`,
            `Uzun sefer için taze meyve/sebze stoku kademelendirildi mi?`,
            `İsraf FIFO, porsiyon ve artık değerlendirmeyle azaltıldı mı?`,
            `İkmalde fiyat-kalite dengesi gözetildi mi?`,
            `Memnuniyet anketi/geri bildirim menüye yansıtıldı mı?`,
            `Menü rotasyonu çeşitlilik + bütçe + denge sağlıyor mu?`,
            `Menü/maliyet/memnuniyet kayıtları güncel ve denetime hazır mı?`,
          ],
          paragraphs: [
            `Mürettebat beslenme kalitesi ve bütçe yönetimi, aşçının en üst düzey ustalığını gerektiren görevdir: sınırlı bir victualling rate içinde dengeli, çeşitli ve mikro besin açısından sürdürülebilir bir beslenme sunmak. Doğru sipariş, düşük israf, ekonomik-kaliteli kaynak seçimi, scurvy gibi eksiklikleri önleyen öngörü ve memnuniyet/rotasyon sistemi; hem mürettebat sağlığının hem morale'in hem de bütçe uyumunun aynı anda korunmasını sağlar. İyi bir aşçı, bütçeyi bir kısıt değil, kaliteyi disipline eden bir çerçeve olarak kullanır.`,
          ],
        },
      ],
    },
  ],
};

export default content;
