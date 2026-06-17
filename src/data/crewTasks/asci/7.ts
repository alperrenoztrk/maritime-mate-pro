import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Sağlık ve moral katkısı",
  roleSlug: "asci",
  taskIndex: 7,
  estimatedPages: 23,
  intro: `Mürettebatın beslenme kalitesi, gemi gibi izole ve zorlu bir ortamda yalnızca fiziksel sağlığı değil, doğrudan iş performansını, dikkat seviyesini ve morali belirler. Aşçı, üç öğün hazırlayan bir teknisyen olmanın ötesinde, geminin moral mühendisidir: iyi bir yemek, uzun ve yorucu bir seferde mürettebatın en somut konfor kaynağıdır. Bu bölüm; beslenme-performans bağını, yorgunluk (fatigue) yönetimine katkıyı, özel günlerde (doğum günü, bayram, festival) özel menü hazırlamayı, mürettebat geri bildiriminin dikkate alınmasını ve menü çeşitliliğini artırmayı; MLC 2006 ve gemi refahı (welfare) çerçevesinde adım adım açıklar.`,
  sources: [
    "MLC 2006 — Regulation 3.2 (Food & Catering) & Title 4 (Health & Welfare)",
    "ILO/IMO — Guidelines on Fatigue & Seafarer Welfare",
    "WHO — Guide to Ship Sanitation & nutrition guidance",
    "FAO/WHO — Dietary Reference Intakes / Nutrient Requirements",
    "ISWAN — Seafarer welfare & mental health resources",
    "Nautical Institute — Ship Catering Management Best Practice",
    "IMO — Human Element guidance (well-being onboard)",
  ],
  chapters: [
    {
      heading: "1. Beslenme, Performans ve Emniyet Bağı",
      lead: `İyi beslenme bir konfor değil, bir emniyet faktörüdür.`,
      sections: [
        {
          subheading: "1.1 Beslenmenin iş performansına etkisi",
          paragraphs: [
            `Gemi çalışanı, vardiya temposu ve fiziksel işin getirdiği enerji ihtiyacı nedeniyle düzenli, dengeli ve zamanında beslenmeye gereksinim duyar. Dengeli kan şekeri ve yeterli enerji; köprüüstünde dikkat, makine dairesinde reflekS ve güvertede güç anlamına gelir. Aç, dengesiz veya ağır yemekle çalışan bir personelin dikkati dağılır; bu, denizde doğrudan bir emniyet riskidir.`,
            `Aşırı kızartma, ağır ve şekerli öğünler kısa vadede uyuşukluk (postprandial dip), uzun vadede kilo artışı, yorgunluk ve sağlık sorunları yaratır. Aşçı, menüyü hem enerji verecek hem de ağırlık yapmayacak şekilde dengeleyerek vardiya performansını destekler; özellikle gece vardiyası için hafif ama doyurucu seçenekler sunar.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MLC 2006 — yeterli ve kaliteli gıda",
              text: `Gemide miktar, besin değeri, kalite ve çeşitlilik bakımından yeterli gıda sağlanması bir mürettebat hakkıdır. Beslenme kalitesi, refah ve emniyetin ayrılmaz parçasıdır.`,
            },
          ],
        },
        {
          subheading: "1.2 Yorgunluk (fatigue) yönetimine katkı",
          paragraphs: [
            `Yorgunluk, deniz kazalarının önde gelen insan faktörlerindendir; beslenme bu denklemin önemli bir parçasıdır. Düzenli öğün saatleri, vardiya değişimlerine uygun planlanmış sıcak yemek ve 24 saat erişilebilir "night lunch", uyku-uyanıklık döngüsü bozuk olan watchkeeper'ı destekler. Aşçı, kafein, şeker ve ağır yağdan kaynaklı sahte enerji yerine sürdürülebilir enerji veren öğünler tasarlar.`,
            `Hidrasyon da performansın görünmez ayağıdır; özellikle sıcak iklimde ve makine dairesinde su ve elektrolit kaybı yüksektir. Aşçı, içecek istasyonunu (su, çay, kahve, gerekirse elektrolitli içecek) erişilebilir tutarak hidrasyonu destekler.`,
          ],
          bullets: [
            `Düzenli öğün saatleri ve vardiyaya uygun sıcak yemek`,
            `24 saat erişilebilir night lunch (gece vardiyası için)`,
            `Sürdürülebilir enerji veren dengeli öğünler`,
            `Erişilebilir içecek istasyonu (hidrasyon)`,
          ],
        },
      ],
    },
    {
      heading: "2. Moral ve Psikolojik Refaha Katkı",
      sections: [
        {
          subheading: "2.1 Yemeğin moral üzerindeki orantısız etkisi",
          paragraphs: [
            `Denizde aylarca aileden ve karadan uzak yaşayan mürettebat için yemek saati, günün en beklenen sosyal anıdır. İyi bir öğün; ev özlemini hafifleten, ekibi mess'te bir araya getiren ve günü olumlu kapatan bir ritüeldir. Aşçının küçük dokunuşları (taze ekmek kokusu, ev usulü bir tatlı, beklenmedik bir favori yemek) moral üzerinde orantısız büyük etki yapar.`,
            `Tersine, sürekli aynı, özensiz veya kalitesiz yemek moral düşüklüğünün, gerginliğin ve şikayetin başlıca kaynağıdır. Aşçı, mess'teki atmosferi bir gösterge olarak okur; düşen moral çoğu zaman menüye yansıtılacak bir mesajdır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Küçük dokunuş, büyük moral",
              text: `Taze pişmiş ekmek, bir favori yemek sürprizi veya özenli bir tabak sunumu, maliyeti düşük ama moral etkisi yüksek hamlelerdir. Aşçının en güçlü araçları çoğu zaman bunlardır.`,
            },
          ],
        },
        {
          subheading: "2.2 Mental sağlık ve sosyal bağ",
          paragraphs: [
            `Mürettebat ruh sağlığı (yalnızlık, izolasyon, stres) giderek daha fazla önemsenen bir konudur; ortak yemek anları, mess room'daki sosyal etkileşimi ve aidiyeti güçlendirir. Aşçı, çok uluslu ekipte herkesin damak tadına dokunan menüler sunarak kimsenin "dışarıda" kalmadığı bir sofra kültürü yaratır. Bu, sessiz ama gerçek bir refah katkısıdır.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "MLC Title 4 & ISWAN — refah",
              text: `MLC 2006 ve denizci refah kuruluşları, beslenme ve sosyal yaşamı mürettebat sağlığının bütünleyici parçası sayar. Mess room ve yemek kültürü bu refahın merkezindedir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Özel Günler ve Kutlama Menüleri",
      sections: [
        {
          subheading: "3.1 Doğum günü, bayram ve festival menüleri",
          paragraphs: [
            `Özel günler, monoton sefer rutinini kıran ve morali yükselten önemli fırsatlardır. Aşçı; doğum günleri için pasta/özel tatlı, dini bayramlar (örn. Ramazan/Kurban, Noel, Diwali) ve milli günler için o kültüre özgü özel menüler hazırlar. Çok uluslu ekipte her büyük grubun önemli günlerini gözetmek, kimsenin unutulmadığı hissini yaratır.`,
            `Bu menüler önceden planlanır: özel malzemeler ikmal listesine zamanında eklenir (bkz. stok yönetimi görevi), çünkü denizdeyken son dakika temin imkanı yoktur. Aşçı, takvimi izleyerek önemli günleri sefer planına işler ve gerekli malzemeyi peşinen sipariş eder.`,
          ],
          table: {
            caption: `Özel Gün Menü Planlama Örnekleri`,
            headers: ["Vesile", "Menü Fikri", "Planlama Notu"],
            rows: [
              ["Doğum günü", "Pasta / özel tatlı", "Tarih listesi tut, malzemeyi önceden al"],
              ["Dini bayram", "Kültüre özgü özel öğün", "İlgili gruba danış, helal/diyet gözet"],
              ["Milli gün", "Milli mutfak günü", "O milliyetten tarif/öneri al"],
              ["Sefer bitişi / liman", "Kutlama yemeği", "Taze ürünle planla"],
            ],
          },
          callouts: [
            {
              type: "example",
              title: "Çok uluslu ekipte bayram",
              text: `Filipinli, Hint ve Türk mürettebatın bulunduğu gemide aşçı, her grubun önemli gününde o kültüre dokunan bir menü çıkararak ekipte güçlü bir aidiyet ve moral yarattı. Ders: kapsayıcı menü = güçlü moral.`,
            },
          ],
        },
        {
          subheading: "3.2 Tema günleri ve menü yorgunluğunu kırma",
          paragraphs: [
            `Uzun seferlerde tekrar (menu fatigue) morali düşürür; aşçı, tema günleri (milli mutfak günü, barbekü/ızgara günü, sokak yemeği temalı öğün) ekleyerek çeşitliliği canlı tutar. Bu küçük varyasyonlar, döngüsel menüyü öngörülemez ve keyifli kılar. İyi havada güverte barbeküsü gibi etkinlikler, hem menüyü hem sosyal yaşamı tazeler.`,
          ],
        },
      ],
    },
    {
      heading: "4. Geri Bildirim ve Menü Çeşitliliği",
      sections: [
        {
          subheading: "4.1 Mürettebat geri bildirimini toplama",
          paragraphs: [
            `Aşçının en değerli bilgi kaynağı mürettebatın kendisidir. Tüketim gözlemi (hangi yemek bitiyor, hangisi tabakta kalıyor), birebir konuşma ve gemilerde uygulanan memnuniyet anketleri/öneri kutusu menü kararlarını besler. Aşçı bu geri bildirimi kişisel eleştiri olarak değil, hizmeti iyileştiren veri olarak okur ve menü döngüsünü buna göre ince ayar yapar.`,
            `Geri bildirim aynı zamanda diyet/alerjen/kültürel ihtiyaçların güncel kalmasını sağlar: yeni katılan mürettebatın tercihleri kayda alınır, değişen ihtiyaçlar (örn. sağlık nedeniyle düşük tuz) menüye yansıtılır. Açık ve saygılı bir geri bildirim kültürü, hem menü kalitesini hem mess atmosferini iyileştirir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Tabak en dürüst geri bildirimdir",
              text: `Sürekli tabakta kalan bir yemek "beğenilmedi", anında biten tencere "az pişti/çok sevildi" der. Aşçı bu sessiz veriyi okuyup üretimi ve menüyü kalibre eder.`,
            },
          ],
        },
        {
          subheading: "4.2 Menü döngüsünü zenginleştirme",
          paragraphs: [
            `Çeşitlilik, menü döngüsünü uzatarak (örn. 7 günden 10-14 güne), pişirme tekniğini değiştirerek (fırın, ızgara, buğulama, haşlama dönüşümü) ve farklı mutfak kültürlerinden tarifler ekleyerek sağlanır. Aşçı, eldeki sınırlı malzemeden bile yaratıcı varyasyonlar çıkararak monotonluğu kırar. Çeşitlilik aynı zamanda dengeli beslenmeyi (farklı besin grupları) ve mikro besin sürekliliğini destekler.`,
          ],
          bullets: [
            `Menü döngüsünü uzat (menu fatigue önleme)`,
            `Pişirme tekniğini çeşitlendir (sağlık + lezzet)`,
            `Farklı mutfak kültürlerinden tarifler ekle`,
            `Geri bildirimi düzenli menüye yansıt`,
          ],
        },
      ],
    },
    {
      heading: "5. Sağlık-Bilinçli Menü ve Özel İhtiyaçlar",
      sections: [
        {
          subheading: "5.1 Dengeli ve sağlık-bilinçli seçenekler",
          paragraphs: [
            `Sağlık katkısı, lezzetten ödün vermeden daha sağlıklı seçenekler sunmakla derinleşir: kızartmayı sınırlamak ve fırın/ızgara/buğulamayı artırmak, tuz ve şekeri dengeli kullanmak, taze sebze/meyveyi her öğünde tutmak ve tam tahıl seçenekleri sunmak. Aşçı, menüde her zaman dengeli bir "lighter" alternatif bulundurarak sağlığına dikkat eden mürettebata da hizmet eder.`,
            `Uzun seferde mikro besin sürekliliği (özellikle C vitamini) korunur; taze ürün biterken dondurulmuş sebze/meyve, turunçgil suları ve takviyeler devreye girer. Bu, hem genel sağlığı hem de uzun seferin sonunda görülebilen yorgunluk/halsizliği önler (detay beslenme/bütçe görevinde).`,
          ],
          table: {
            caption: `Sağlık-Bilinçli Pişirme/Menü Tercihleri`,
            headers: ["Yerine", "Tercih", "Sağlık Katkısı"],
            rows: [
              ["Kızartma", "Fırın / ızgara / buğulama", "Daha az doymuş yağ"],
              ["Masada ek tuz", "Pişirmede dengeli baharat", "Düşük sodyum"],
              ["Basit şekerli tatlı", "Meyve / yoğurt", "Daha az basit şeker"],
              ["Beyaz ekmek/pirinç", "Tam tahıl alternatifi", "Lif ve B vitamini"],
            ],
          },
          callouts: [
            {
              type: "regulation",
              title: "Besin dengesi mürettebat hakkıdır",
              text: `MLC 2006, gıdanın besin değeri açısından da yeterli olmasını ister. Dengeli, mikro besin açısından sürdürülebilir menü, aşçının sağlık katkısının çekirdeğidir.`,
            },
          ],
        },
        {
          subheading: "5.2 Bireysel sağlık ihtiyaçlarına duyarlılık",
          paragraphs: [
            `Diyabet, hipertansiyon, alerji veya geçici sağlık durumları (mide rahatsızlığı vb.) olan mürettebat için aşçı uygun alternatif sunar. Bu duyarlılık hem fiziksel sağlığı korur hem de o kişiye "görüldüğü/önemsendiği" hissini vererek morale katkı yapar. Ciddi durumlar gemi sağlık sorumlusuyla/telemedicine ile koordine edilir.`,
          ],
        },
      ],
    },
    {
      heading: "6. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "6.1 Sağlık ve moral checklist'i",
          bullets: [
            `Öğünler düzenli, dengeli ve vardiyaya uygun zamanlanıyor mu?`,
            `Night lunch ve içecek istasyonu (hidrasyon) erişilebilir mi?`,
            `Menü çeşitliliği (döngü uzunluğu, teknik, kültür) korunuyor mu?`,
            `Özel günler takvime işlendi, malzeme önceden sipariş edildi mi?`,
            `Çok uluslu ekipte her grup gözetiliyor (kapsayıcı menü) mu?`,
            `Mürettebat geri bildirimi toplanıp menüye yansıtılıyor mu?`,
            `Sağlık-bilinçli (lighter) alternatifler menüde var mı?`,
            `Bireysel sağlık/diyet ihtiyaçları gözetiliyor mu?`,
            `Mikro besin sürekliliği (özellikle uzun seferde) korunuyor mu?`,
          ],
          paragraphs: [
            `Aşçının sağlık ve moral katkısı, gemideki en az görünen ama en çok hissedilen değerdir. İyi beslenen bir ekip daha uyanık, daha güvenli ve daha mutludur; özenli bir özel gün menüsü veya bir favori yemek sürprizi, uzun bir seferin gerginliğini dağıtabilir. Aşçı, tabağı bir performans aracı ve bir moral köprüsü olarak kullanarak, mürettebatın hem sağlığının hem de dayanışmasının sessiz ama belirleyici dayanağı olur.`,
          ],
        },
      ],
    },
  ],
};

export default content;
