import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Menü planlaması ve yemek hazırlığı",
  roleSlug: "asci",
  taskIndex: 0,
  estimatedPages: 25,
  intro: `Gemi Aşçısı (Ship's Cook), mürettebatın günlük üç ana öğünü ve ara öğünlerini planlamak, hazırlamak ve servis etmekten doğrudan sorumlu kişidir. Bu sorumluluk; seyir süresine ve kumanya stokuna göre menü adaptasyonu, farklı kültürel/dini tercihlerin ve diyet kısıtlamalarının gözetilmesi, alerjen yönetimi, dengeli beslenme prensiplerinin uygulanması ve servis kalitesini kapsar. MLC 2006 Kural 3.2, gemide yeterli miktar, besin değeri, kalite ve çeşitlilikte yiyecek sağlanmasını işverenin ve aşçının ortak yükümlülüğü olarak tanımlar. Bu bölüm, aşçının menü döngüsünü kurmadan servise kadar izlemesi gereken metodolojiyi adım adım açıklar.`,
  sources: [
    "MLC 2006 — Regulation 3.2 (Food and Catering) & Standard A3.2",
    "ILO/IMO Guidelines on the Training of Ships' Cooks",
    "WHO — Guide to Ship Sanitation (3rd Edition)",
    "Codex Alimentarius — General Principles of Food Hygiene (CXC 1-1969)",
    "FAO/WHO Nutrient Requirements & Dietary Reference Intakes",
    "STCW — Catering personnel familiarization & safety training",
    "Ship Catering Management — Best Practice Guides (Nautical Institute)",
  ],
  chapters: [
    {
      heading: "1. Menü Döngüsü: Planlama ve Onay Süreci",
      sections: [
        {
          subheading: "1.1 Sefer profiline göre menü döngüsü kurmak",
          paragraphs: [
            `Menü planlaması, seferin süresi, rota üzerindeki ikmal (provisioning) limanları ve mürettebat kompozisyonu üzerine kurulur. Aşçı, genellikle 7, 10 veya 14 günlük bir "menu rotation" (döngülü menü) hazırlar; bu döngü, tekrar yorgunluğunu (menu fatigue) önlerken stok planlamasını ve sipariş miktarlarını öngörülebilir kılar. Uzun okyanus geçişlerinde (örn. transpasifik 14-21 gün) taze ürünün tükenme sırasına göre menü kademelendirilir: ilk günler taze sebze/meyve ve taze et ağırlıklı, son günler dondurulmuş ve konserve ağırlıklı planlanır.`,
            `Aşçı menü döngüsünü kurarken her öğünü besin grubu dengesi açısından dengeler: ana öğünlerde bir protein kaynağı, bir kompleks karbonhidrat, en az iki sebze garnitür ve bir tatlı/meyve bulunur. Kahvaltıda yumurta, ekmek, peynir, reçel, tahıl ve sıcak içecek standarttır. Gece vardiyası (watchkeeper) için 24 saat erişilebilir "night lunch" (gece yemeği) ayrı planlanır; sandviç malzemesi, sıcak çorba ve atıştırmalıklar hazır bırakılır.`,
          ],
          bullets: [
            `Sefer süresi ve ikmal limanları arası gün sayısı`,
            `Mürettebat sayısı, milliyet ve dini kompozisyon`,
            `Taze ürün raf ömrüne göre öğün kademelendirme`,
            `Watchkeeper için 24 saat night lunch düzeni`,
            `Mevcut kumanya stoku ve bütçe (victualling rate)`,
          ],
        },
        {
          subheading: "1.2 Planın kaptan / steward department onayı",
          paragraphs: [
            `Hazırlanan menü döngüsü ve haftalık menü, gemilerde genellikle kaptan veya chief steward onayına sunulur. Onay, hem bütçe (kişi başı günlük victualling rate) hem de mürettebat memnuniyeti açısından bir kontrol noktasıdır. Onaylı menü, mess room'da ilan edilir; bu hem şeffaflık sağlar hem de aşçının günlük hazırlık disiplinini güçlendirir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MLC 2006 — Standard A3.2",
              text: `Gemide servis edilen yiyecek; miktar, besin değeri, kalite ve çeşitlilik bakımından mürettebatın ihtiyaçlarını karşılamalı, dini ve kültürel uygulamalar dikkate alınmalı ve ücretsiz sağlanmalıdır. Aşçı bu standardın saha uygulayıcısıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Kültürel, Dini ve Diyet Tercihlerinin Yönetimi",
      sections: [
        {
          subheading: "2.1 Çok uluslu mürettebatta menü uyarlaması",
          paragraphs: [
            `Modern gemilerde mürettebat çoğunlukla farklı milliyetlerden oluşur (örn. Filipinli, Hint, Türk, Ukraynalı, Çinli karışımı). Aşçı, mürettebatın dini gerekliliklerini (helal, vejetaryen, beef/pork kısıtı) ve damak alışkanlıklarını dikkate alır. Pratikte bir öğünde ana yemeğin yanında alternatif protein veya tarafsız bir seçenek (örn. tavuk/balık) sunmak, çatışan tercihleri tek menüde çözmenin standart yöntemidir.`,
            `Domuz eti taşıyan/servis eden gemilerde ayrı hazırlık ve depolama (cross-contact önleme) gerekir; helal gözeten mürettebat için ayrı kesim takımı ve servis kabı kullanılır. Hindu mürettebat için sığır eti, bazı mürettebat için ise sadece deniz ürünleri/vejetaryen alternatif planlanır. Bu uyarlamalar menü döngüsüne baştan işlenir, son dakika doğaçlamaya bırakılmaz.`,
          ],
          table: {
            caption: `Yaygın Diyet/Dini Tercihler ve Mutfak Karşılığı`,
            headers: ["Tercih", "Kısıt", "Mutfak Önlemi"],
            rows: [
              ["Helal", "Domuz, alkol, helal olmayan kesim", "Ayrı takım, etiketli depolama, helal tedarik"],
              ["Hindu (genel)", "Sığır eti", "Tavuk/balık/vejetaryen alternatif"],
              ["Vejetaryen", "Et/balık", "Baklagil, yumurta, süt bazlı protein"],
              ["Vegan", "Tüm hayvansal", "Bitkisel protein, ayrı pişirme yüzeyi"],
              ["Düşük tuz/diyabet", "Tuz, basit şeker", "Tıbbi öneriye göre porsiyon/içerik"],
            ],
          },
        },
        {
          subheading: "2.2 Alerjen yönetimi ve bilgilendirme",
          paragraphs: [
            `Gıda alerjisi olan mürettebat üyesi, gemiye katılırken (pre-employment medical / familiarization) bunu beyan etmelidir; aşçı bu bilgiyi kayda alır. Başlıca alerjenler gluten, süt, yumurta, fıstık, ağaç kuruyemişi, soya, balık ve kabuklu deniz ürünleridir. Aşçı, bu kişiye servis edilen öğünde çapraz bulaşmayı önler: ayrı kesme tahtası, ayrı kap, ortak yağ/su kullanımından kaçınma.`,
            `Hazır/işlenmiş ürünlerin etiketleri alerjen açısından okunur; "may contain" (içerebilir) uyarıları dikkate alınır. Şüphe halinde aşçı, alerjisi olan kişi için bilinen güvenli temel malzemelerden ayrı bir öğün hazırlar. Ağır alerjik reaksiyon (anafilaksi) ihtimaline karşı geminin tıbbi dolabındaki adrenalin oto-enjektörünün konumu ve telemedicine irtibatı bilinmelidir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Çapraz bulaşma = gizli risk",
              text: `Alerjen, görünmez miktarda bile ciddi reaksiyon tetikleyebilir. Aynı bıçağı, tahtayı veya kızartma yağını paylaşmak yeterlidir. Alerjik öğün her zaman ayrı ekipmanla ve temiz yüzeyde hazırlanır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Dengeli Beslenme Prensipleri",
      sections: [
        {
          subheading: "3.1 Makro besin dengesi ve porsiyonlama",
          paragraphs: [
            `Gemi çalışanı, vardiya temposu ve fiziksel işin getirdiği enerji ihtiyacı nedeniyle dengeli makro besin alımına gereksinim duyar. Genel hedef; günlük enerjinin yaklaşık %50-55'i karbonhidrattan, %15-20'si proteinden, %25-30'u yağdan gelecek şekilde dağıtılmasıdır. Aşçı, her öğüne bir kaliteli protein (et, balık, yumurta, baklagil), bir kompleks karbonhidrat (pirinç, makarna, patates, tam tahıl ekmek) ve renkli sebze ekleyerek bu dengeyi sahada kurar.`,
            `Aşırı kızartma, doymuş yağ ve şeker yükü uzun vadede mürettebatta kilo artışı, yorgunluk ve sağlık sorunlarına yol açar. Aşçı, kızartmayı sınırlar; fırınlama, buğulama, ızgara ve haşlama tekniklerini dönüşümlü kullanır. Tuz tüketimini kontrol etmek için masada ek tuz yerine pişirmede dengeli baharatlama tercih edilir.`,
          ],
        },
        {
          subheading: "3.2 Mikro besinler ve uzun seferde eksiklik önleme",
          paragraphs: [
            `Uzun okyanus geçişlerinde taze meyve/sebze tükendikçe C vitamini ve diğer mikro besin alımı düşer; tarih boyunca denizcilerin skorbüt (scurvy) yaşamasının nedeni budur. Aşçı, taze ürün biterken C vitamini kaynaklarını korur: turunçgil suları, lahana turşusu, dondurulmuş sebze ve gerektiğinde takviye/meyve suyu konsantresi devreye girer. Demir, kalsiyum ve B grubu vitaminleri için kırmızı et, baklagil, süt ürünleri ve tam tahıl menüde tutulur.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Taze ürün bitti, vitamin bitmesin",
              text: `Dondurulmuş sebze ve meyveler, taze ürünün çoğu vitaminini korur. Uzun seferin son haftasında öğünlere dondurulmuş bezelye, brokoli, mısır ve meyve eklemek mikro besin sürekliliğini sağlar.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Seyir Süresi ve Stoka Göre Menü Adaptasyonu",
      sections: [
        {
          subheading: "4.1 Taze ürünün raf ömrüne göre kademelendirme",
          paragraphs: [
            `Aşçı, menüyü taze ürünlerin bozulma hızına göre sıralar. En çabuk bozulanlar (yapraklı sebze, çilek, taze balık) seferin ilk 3-5 gününde, orta dayanıklılar (elma, havuç, lahana, patates, soğan) ortalama dönemde, en dayanıklılar (konserve, kuru baklagil, makarna, dondurulmuş) seferin sonunda planlanır. Bu kademelendirme hem gıda israfını azaltır hem de stok yönetimini kolaylaştırır.`,
            `Ara ikmal yapılmayan bir seferde aşçı, "tüketim hızı x gün sayısı" hesabıyla her ürünün ne zaman biteceğini öngörür. Stok tükenme tablosu, menü döngüsüne bire bir bağlanır; örneğin son haftada taze süt biterse menüde toz/UHT süte geçilir ve buna uygun tarifler seçilir.`,
          ],
          table: {
            caption: `Tipik Taze Ürün Raf Ömrü (Uygun Depolamada)`,
            headers: ["Ürün Grubu", "Yaklaşık Raf Ömrü", "Önerilen Kullanım Penceresi"],
            rows: [
              ["Yapraklı sebze, taze ot", "3-7 gün", "1. hafta"],
              ["Taze et/balık (soğutmada)", "2-5 gün", "İlk günler veya hemen dondur"],
              ["Domates, biber, salatalık", "5-10 gün", "1.-2. hafta"],
              ["Elma, turunçgil, lahana", "2-4 hafta", "Orta-son dönem"],
              ["Patates, soğan, kuru erzak", "1-3 ay+", "Tüm sefer / son dönem"],
            ],
          },
        },
        {
          subheading: "4.2 Beklenmedik gecikme ve acil durum menüsü",
          paragraphs: [
            `Hava muhalefeti, liman beklemesi (anchorage) veya makine arızası seferi uzatabilir. Aşçı, daima belirli bir gün için "emergency provisions" (acil kumanya) tamponu tutar; kuru ve konserve erzakla en az birkaç gün ek menü çıkarabilmelidir. Sefer uzarsa porsiyon disiplini sıkılaştırılır, israf sıfırlanır ve dayanıklı malzemeye ağırlık verilir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Uzayan anchorage beklemesi",
              text: `Liman tıkanıklığı nedeniyle 10 günlük demir bekleme, taze ürün biterken aşçıyı konserve/dondurulmuş ağırlıklı menüye geçmeye zorlar. Önceden kurulan stok tamponu ve kademeli menü, kalite düşüşünü minimize eder.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Günlük Üretim Planı ve Mise en Place",
      sections: [
        {
          subheading: "5.1 Hazırlık disiplini (mise en place)",
          paragraphs: [
            `Profesyonel mutfak prensibi olan "mise en place" (her şeyi yerli yerine), gemi mutfağında da temeldir. Aşçı, öğün servisinden önce tüm malzemeleri ayıklar, doğrar, tartar ve istasyonları hazırlar. Bu, tek kişilik veya iki kişilik bir galley ekibinin sınırlı zamanda üç öğünü zamanında çıkarabilmesinin anahtarıdır.`,
            `Aşçı, dondurulmuş ürünleri bir gün önceden buzdolabında kontrollü çözülmeye (thawing) alır; oda sıcaklığında çözme bakteriyel risk nedeniyle yapılmaz. Et ve balık çözülmesi planı, ertesi günün menüsüne göre bir gün önceden yürütülür.`,
          ],
        },
        {
          subheading: "5.2 Pişirme zamanlaması ve servis sıcaklığı",
          paragraphs: [
            `Sıcak yemekler servise yakın bitecek şekilde zamanlanır; uzun süre sıcak tutma hem kaliteyi düşürür hem de güvenlik riski (tehlikeli sıcaklık aralığı) yaratır. Servise kadar sıcak yemek 63°C üzerinde, soğuk hazırlıklar 5°C altında tutulur. Aşçı, ana yemeği ve garnitürü mümkün olduğunca servise yakın bitirerek hem lezzet hem güvenlik sağlar.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Zamanlama lezzeti korur",
              text: `Sebzeyi servise dakikalar kala pişirmek renk, doku ve vitamini korur. Çok önceden pişirip beklemek hem besin değerini hem damak tadını düşürür.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Servis Standardı ve Mess Room Yönetimi",
      sections: [
        {
          subheading: "6.1 Subay ve mürettebat mess düzeni",
          paragraphs: [
            `Çoğu gemide ayrı subay mess'i (officers' mess) ve mürettebat mess'i (crew mess) bulunur; aşçı her ikisine de aynı menüyü, uygun servis düzeniyle sunar. Self-servis (buffet) veya tabldot servis kullanılabilir; gece vardiyası için sıcak tutucularda yemek bırakılır. Servis alanının temizliği, çatal-bıçak hijyeni ve içecek istasyonu aşçının/mess man'in sorumluluğundadır.`,
          ],
        },
        {
          subheading: "6.2 Porsiyon kontrolü ve israf azaltma",
          paragraphs: [
            `Porsiyon disiplini, hem bütçe hem de gıda israfı (MARPOL Ek V kapsamında atık gıda) açısından önemlidir. Aşçı, tüketim verisini gözlemleyerek pişirilen miktarı kalibre eder; sürekli artan tabaklar fazla üretimi, biten tencere ise yetersizliği gösterir. Artan yemek güvenli ise bir sonraki öğünde uygun şekilde değerlendirilir, değilse Ek V kurallarına göre bertaraf edilir.`,
          ],
        },
      ],
    },
    {
      heading: "7. Mevzuat ve Belgelendirme Çerçevesi",
      sections: [
        {
          subheading: "7.1 Aşçının yeterlik ve eğitim zorunluluğu",
          paragraphs: [
            `MLC 2006 Standard A3.2, belirli mürettebat sayısının (genellikle 10) üzerinde çalışan gemilerde, eğitimli ve yeterli (qualified) bir gemi aşçısı bulundurulmasını zorunlu kılar. Aşçı; yemek hazırlama, gıda ve kişisel hijyen, gıda saklama, stok kontrolü ve çevre koruma konularında eğitim almış olmalıdır. Bayrak devleti, ulusal mevzuata göre Ship's Cook Certificate düzenler.`,
            `Aşçı dışındaki yemek hazırlık personeli (mess man, steward) de gıda hijyeni konusunda temel eğitim/familiarization almalıdır. Bu eğitimlerin kaydı, MLC denetiminde (PSC veya flag state) sunulur.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "ILO/IMO — Ships' Cooks eğitimi",
              text: `ILO ve IMO ortak rehberi, gemi aşçısı eğitiminin içeriğini (beslenme, hijyen, HACCP, stok, ekipman güvenliği) tanımlar. Sertifikasyon bayrak devleti yetkisindedir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "8. Tipik Sorunlar ve Çözümleri",
      sections: [
        {
          subheading: "8.1 Menü yorgunluğu ve düşük moral",
          paragraphs: [
            `Tekrarlayan menü, uzun seferde moral düşüklüğünün başlıca nedenlerindendir. Aşçı, döngü uzunluğunu artırarak, tema günleri (örn. milli mutfak günü) ekleyerek ve mürettebat geri bildirimini dikkate alarak çeşitliliği korur. Küçük dokunuşlar (taze ekmek kokusu, ev usulü tatlı) moral üzerinde orantısız büyük etki yapar.`,
          ],
        },
        {
          subheading: "8.2 Stok dengesizliği ve son dakika değişiklik",
          paragraphs: [
            `Beklenenden hızlı tükenen bir malzeme menüyü bozabilir. Aşçı, esnek tarif bilgisi sayesinde eldeki malzemeye göre menüyü uyarlar; örneğin taze et bittiğinde dondurulmuş/konserve protein ile dengeli bir alternatif çıkarır. Bu esneklik, deneyimli gemi aşçısını ayıran temel beceridir.`,
          ],
        },
      ],
    },
    {
      heading: "9. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "9.1 Aşçının günlük menü/üretim checklist'i",
          bullets: [
            `Bugünkü menü onaylı ve mess room'da ilan edildi mi?`,
            `Diyet/dini/alerjen istisnaları için ayrı hazırlık planlandı mı?`,
            `Dondurulmuş ürün bir gün önceden kontrollü çözülmeye alındı mı?`,
            `Mise en place tamam, istasyonlar hazır mı?`,
            `Sıcak yemek 63°C üzeri, soğuk hazırlık 5°C altında mı?`,
            `Watchkeeper için night lunch hazır bırakıldı mı?`,
            `Taze ürün tükenme sırasına göre menü kademelendirildi mi?`,
            `Acil kumanya tamponu korunuyor mu?`,
            `Porsiyon ve israf gözlemlenip kalibre edildi mi?`,
          ],
          paragraphs: [
            `Gemi aşçısının başarısı, fark edilmediğinde en iyi çalışan bir sistemden gelir: zamanında, dengeli, güvenli ve mürettebatın damak tadına uygun öğünler. İyi planlanmış bir menü döngüsü, disiplinli hazırlık ve esnek uyarlama yeteneği; uzun seferlerde mürettebat sağlığının ve morale'in sessiz ama belirleyici dayanağıdır.`,
          ],
        },
      ],
    },
  ],
};

export default content;
