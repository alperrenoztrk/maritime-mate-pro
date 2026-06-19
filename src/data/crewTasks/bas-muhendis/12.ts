import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Yağlama yağı analiz programı (LO analysis)",
  roleSlug: "bas-muhendis",
  taskIndex: 12,
  estimatedPages: 24,
  intro: `Baş Mühendis (Chief Engineer), ana makine, jeneratörler ve yardımcı ekipmanların yağlama yağı (lube oil) analiz programının gözetiminden sorumludur. Periyodik numune alma, sertifikalı laboratuvar analizi ve sonuçların (viskozite, TBN, TAN, metal içerikleri, su, soot) yorumlanması; iç aşınma ve soğutma arızalarının erken teşhisini sağlar. Bu bölüm; numune alma disiplinini, analiz parametrelerini, trend yorumlamayı, condition-based yağ değişim kararını ve PMS entegrasyonunu detaylı ele alır.`,
  sources: [
    "ISO 4406 — Yağ temizlik (cleanliness) kodlama",
    "ASTM D445 (viskozite), D2896/D4739 (TBN), D664 (TAN) test metotları",
    "Yağ üreticisi kılavuzları (Shell, Castrol, ExxonMobil, Total) — Used oil analysis",
    "Engine maker guidelines (MAN ES / WinGD / Wärtsilä) — LO condition limits",
    "ASTM D6595 / D5185 — Spektrometrik metal analizi",
    "Class Rules / PMS — Yağ analizi kayıt gereklilikleri",
    "ICOMIA / SNAME — Tribology ve condition monitoring teknik bültenleri",
  ],
  chapters: [
    {
      heading: "1. Yağ Analizinin Amacı ve Kapsamı",
      lead: `Yağ analizi, makinenin "kan tahlilidir". Doğru yapıldığında, açmadan içeride neler olduğunu gösterir ve arızayı önceden haber verir.`,
      sections: [
        {
          subheading: "1.1 Neden yağ analizi?",
          paragraphs: [
            `Yağ analizi üç temel amaca hizmet eder: yağın kullanım uygunluğunun (kondisyonunun) izlenmesi, makine aşınmasının erken tespiti ve kontaminasyon (su, yakıt, kum) tespiti. Bu üçü birlikte, predictive maintenance'ın temel ayağıdır.`,
            `Baş Mühendis, analiz programını saatlik rutin yağ değişiminin yerine geçecek bir karar aracı olarak kullanır. Doğru yönetildiğinde hem ekipman ömrü uzar hem de gereksiz yağ değişimi maliyeti azalır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Condition-based vs. time-based",
              text: `Yağı sabit saat aralığıyla değiştirmek (time-based) yerine, analiz sonucuna göre değiştirmek (condition-based); iyi durumdaki yağı erken atmayı önler, bozulan yağı zamanında değiştirir. Bu yaklaşım hem teknik hem ekonomik olarak üstündür.`,
            },
          ],
        },
        {
          subheading: "1.2 Kapsam: hangi ekipmanlar",
          paragraphs: [
            `Program; ana makine system oil (crankcase), jeneratör karter yağları, T/C yağı, dümen makinesi hidroliği, deck machinery (vinç/winch) ve gerekirse cylinder drain oil'i kapsar. Her ekipman için farklı parametre ve limitler geçerlidir.`,
            `Cylinder drain oil analizi (scrape-down analysis) özellikle 2-stroke ana makinede liner/ring aşınmasını ve cylinder oil performansını izlemek için ayrı ve değerli bir tekniktir.`,
          ],
          table: {
            caption: `Ekipman bazında tipik analiz sıklığı`,
            headers: ["Ekipman", "Numune sıklığı", "Öncelikli parametreler"],
            rows: [
              ["ME system oil", "3 ayda bir", "Su, viskozite, Fe, TBN"],
              ["Generator karter", "3 ayda bir", "Soot, TBN, viskozite, metaller"],
              ["Cylinder drain", "Aylık", "Fe, BN reserve, residual oil"],
              ["Hidrolik (steering)", "6 ayda bir", "Temizlik (ISO 4406), su"],
              ["T/C oil", "Maker'a göre", "Viskozite, metaller, kontaminasyon"],
            ],
          },
        },
      ],
    },
    {
      heading: "2. Numune Alma Disiplini",
      sections: [
        {
          subheading: "2.1 Doğru numune = doğru sonuç",
          paragraphs: [
            `Analiz kalitesi, numune kalitesiyle başlar. Numune; makine çalışırken ve yağ sıcakken, sistemin temsil edici bir noktasından (running line / sampling valve) alınmalıdır. Tank dibinden veya durağan yağdan alınan numune yanıltıcıdır.`,
            `Numune kabı temiz, etiketleme doğru (ekipman, tarih, çalışma saati, yağ markası) olmalı ve alma noktası önceden flush edilmelidir. Yanlış numune, yanlış teşhise ve gereksiz/eksik müdahaleye yol açar.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Kontamine numune riski",
              text: `Kirli kap, yanlış nokta veya durağan yağdan alınan numune; gerçekte olmayan bir aşınma veya kontaminasyon gösterebilir (false positive) ya da gerçek sorunu maskeleyebilir (false negative). Numune disiplini, analiz programının temelidir.`,
            },
          ],
        },
        {
          subheading: "2.2 Numune alma prosedürü ve kayıt",
          paragraphs: [
            `Baş Mühendis, standart bir numune alma prosedürü uygular: aynı nokta, aynı koşullar, aynı yöntem. Tutarlılık, trend analizinin güvenilirliği için şarttır; her seferinde farklı yöntem trend'i bozar.`,
            `Her numunenin alma tarihi, ekipman çalışma saati ve yağın kullanım süresi kayıt altına alınır. Bu bilgiler, sonucun doğru yorumlanması ve PMS'e işlenmesi için gereklidir.`,
          ],
          bullets: [
            "Makine çalışırken, yağ sıcakken numune al",
            "Sampling valve'i önce flush et, sonra numuneyi al",
            "Temiz kap, doğru etiket (ekipman/tarih/saat/yağ)",
            "Her zaman aynı nokta ve aynı yöntem (tutarlılık)",
            "Çalışma saati ve yağ kullanım süresini kaydet",
          ],
        },
      ],
    },
    {
      heading: "3. Analiz Parametreleri ve Anlamları",
      sections: [
        {
          subheading: "3.1 Yağ kondisyon parametreleri",
          paragraphs: [
            `Viskozite (ASTM D445); yağın taşıma kapasitesinin göstergesidir. Artış genelde oksidasyon, soot veya ağır yakıt kontaminasyonunu; düşüş ise distilat/yakıt seyrelmesini (fuel dilution) işaret eder. Maker, kalkış değerinden tipik ±%10-20 sapma limiti verir.`,
            `TBN (Total Base Number); yağın asit nötralizasyon rezervidir, sülfürlü yanma ürünlerine karşı koruma sağlar. TBN'in kritik seviyeye düşmesi koruma kaybını gösterir. TAN (Total Acid Number) artışı ise oksidasyon ve asitleşmeyi gösterir.`,
          ],
          table: {
            caption: `Başlıca parametreler ve yorumu`,
            headers: ["Parametre", "Artış anlamı", "Düşüş anlamı"],
            rows: [
              ["Viskozite", "Oksidasyon, soot, HFO girişi", "Yakıt seyrelmesi"],
              ["TBN", "—", "Alkali rezerv tükenmesi"],
              ["TAN", "Oksidasyon, asitleşme", "—"],
              ["Su içeriği", "Cooler/jacket kaçağı, kondens", "—"],
              ["Soot (dizel)", "Eksik yanma, blow-by", "—"],
            ],
          },
        },
        {
          subheading: "3.2 Aşınma metalleri ve kontaminantlar",
          paragraphs: [
            `Spektrometrik analiz (ASTM D5185/D6595), ppm düzeyinde metalleri ölçer. Demir (Fe) ring/liner/krank aşınması; bakır (Cu) yatak/cooler tube; krom (Cr) ring/valve; alüminyum (Al) piston/yatak; kurşun-kalay (Pb/Sn) yatak yüzeyi aşınmasına işaret eder.`,
            `Silikon (Si) genelde dış kaynaklı kum/toz girişini (hava filtresi sorunu) gösterir ve abrazif aşınmayı hızlandırır. Sodyum (Na) deniz suyu girişini düşündürür. Her metal, belirli bir bileşene parmak izi gibi işaret eder.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "Trend, mutlak değerden önemli",
              text: `Tek bir analizdeki mutlak metal değeri kadar, o değerin zaman içindeki trend'i önemlidir. Yavaş ve istikrarlı bir Fe artışı normal aşınma; ani sıçrama ise gelişen bir arıza demektir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Trend Analizi ve Teşhis",
      sections: [
        {
          subheading: "4.1 Rolling trend ve baseline",
          paragraphs: [
            `Baş Mühendis, her parametreyi bir trend grafiğinde izler; yeni makine/yağ kombinasyonu için bir baseline oluşturur. Sapmalar baseline'a göre değerlendirilir; tek nokta değil, eğilim okunur.`,
            `Birden fazla parametrenin aynı anda anormalleşmesi (örn. su + Cu artışı) güçlü bir teşhis sinyalidir: bu örnekte cooler tube kaçağı (deniz suyu + cooler bakırı) güçlü ihtimaldir. Parametreler birlikte yorumlanır.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka dersi: Yağ analizi cooler kaçağını yakaladı",
              text: `Bir jeneratör yağında art arda analizlerde su ve Cu içeriği birlikte yükseldi. Açılmadan yapılan teşhis, LO cooler'da tube kaçağına işaret etti; planlı bir limanda cooler değiştirildi ve yatak hasarı, ani arıza önlendi.`,
            },
          ],
        },
        {
          subheading: "4.2 Anormal sonuçta aksiyon",
          paragraphs: [
            `Anormal sonuç alındığında Baş Mühendis önce numuneyi ve olası hatayı sorgular (re-sample), sonra mekanik teşhise geçer. Kritik sonuçta acil müdahale; orta seviyede izleme sıklığını artırma ve plan yapma uygulanır.`,
            `Her teşhis, somut bir aksiyona bağlanır: filtre kontrolü, cooler test, water leak araştırması, ek numune veya planlı açma. Sonuç dosyalanır ve PMS'e işlenir.`,
          ],
          bullets: [
            "Yüksek su → cooler/jacket kaçağı, kondens araştır",
            "Yüksek Fe → ring/liner aşınması, indicator/scavenge inspect",
            "Yüksek Si → hava filtresi / kum girişi kontrol",
            "Su + Na → deniz suyu girişi (cooler/sea side)",
            "Düşük TBN → yağ değişimi veya makeup, sülfür uyumu kontrol",
          ],
        },
      ],
    },
    {
      heading: "5. Condition-Based Yağ Değişim Kararı",
      sections: [
        {
          subheading: "5.1 Değişim mi, makeup mu, temizleme mi?",
          paragraphs: [
            `Analiz sonucu, üç olası kararı doğurur: yağı değiştir (kondisyon kritik), makeup ile takviye et (TBN/seviye düşük ama yağ sağlam), ya da purifier/filtrasyon ile temizle (su/partikül var ama yağ kimyası iyi). Baş Mühendis doğru kararı verir.`,
            `Sağlam bir yağı erken atmak israftır; bozulmuş bir yağı kullanmaya devam etmek ise makineye zarar verir. Analiz, bu dengeyi objektif veriyle kurar.`,
          ],
        },
        {
          subheading: "5.2 Purifikasyon ve filtrasyon yönetimi",
          paragraphs: [
            `System oil ve generator yağında purifier (centrifuge) ve fine filtration, su ve partikülü uzaklaştırarak yağ ömrünü uzatır. Baş Mühendis, purifier ayarının (gravity disc, sıcaklık) ve filtre durumunun analiz sonuçlarıyla uyumlu yönetilmesini sağlar.`,
            `Düzgün purifikasyon, çoğu zaman yağ değişimini geciktirir veya gereksiz kılar; bu da maliyet ve atık yağ (sludge) hacmini azaltır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Atık yağ ve çevre boyutu",
              text: `Gereksiz yağ değişimini azaltmak; sadece maliyeti değil, üretilen atık yağ (waste oil/sludge) hacmini de düşürür. Bu, MARPOL Annex I atık yönetimi ve çevresel sürdürülebilirlik açısından da olumludur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Laboratuvar Seçimi ve Sonuç Yönetimi",
      sections: [
        {
          subheading: "6.1 Sertifikalı laboratuvar",
          paragraphs: [
            `Numuneler, akredite ve denizcilik ekipmanına aşina bir laboratuvara gönderilir (örn. yağ üreticisinin programı veya bağımsız bir analiz hizmeti). Tutarlı laboratuvar kullanımı, trend güvenilirliği için önemlidir.`,
            `Modern programlar, online portal üzerinden sonuç, trend grafiği ve uzman yorumu sunar. Baş Mühendis bu yorumları kendi saha gözlemiyle birleştirerek nihai kararı verir; rapora körü körüne güvenmez.`,
          ],
        },
        {
          subheading: "6.2 Gemide hızlı test imkanları",
          paragraphs: [
            `Laboratuvar sonucu beklenirken, gemide basit test kitleri (su tespiti — crackle test/hot plate, TBN/TAN test kiti, viskozite karşılaştırması) ön değerlendirme sağlar. Bu, acil durumda hızlı karar için değerlidir.`,
            `Gemi-içi testler laboratuvarın yerini tutmaz ama erken uyarı ve doğrulama sağlar. Baş Mühendis, ikisini birbirini tamamlayan araçlar olarak kullanır.`,
          ],
        },
      ],
    },
    {
      heading: "7. PMS Entegrasyonu ve Belgeleme",
      sections: [
        {
          subheading: "7.1 Sonuçların PMS'e işlenmesi",
          paragraphs: [
            `Tüm analiz sonuçları PMS kayıtlarına işlenir; numune tarihleri, sonuçlar, alınan aksiyonlar ve yağ değişimleri izlenebilir bir geçmiş oluşturur. Bu kayıtlar, sınıf surveyor veya Superintendent talebinde sunulur.`,
            `Yağ analizi, condition monitoring'in resmi bir parçası olarak PMS scheme içinde yer alır; düzenli ve eksiksiz kayıt, programın denetimde kanıtıdır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "Survey kanıtı olarak yağ analizi",
              text: `Condition monitoring temelli survey scheme'lerinde, düzenli yağ analizi kayıtları; belirli ekipmanların açılmadan kondisyon kanıtı olarak sınıf tarafından kabul edilebilir. Bu, hem maliyet hem zaman tasarrufu sağlar.`,
            },
          ],
        },
        {
          subheading: "7.2 Süreklilik ve handover",
          paragraphs: [
            `Yağ analizi trend'i, kişiden bağımsız olarak korunmalıdır. Baş Mühendis değişiminde, açık takip kalemleri ve trend geçmişi handover'ın parçasıdır; yeni Baş Mühendis programı kesintisiz sürdürür.`,
            `Trend'in kesintiye uğraması, gelişen bir arızanın gözden kaçmasına yol açar. Bu nedenle program disiplini gemi yönetiminin sürekliliğini gerektirir.`,
          ],
        },
      ],
    },
    {
      heading: "8. Pratik Kontrol Listesi ve Sonuç",
      sections: [
        {
          subheading: "8.1 Pratik kontrol listesi",
          paragraphs: [
            `Aşağıdaki kontrol listesi, yağlama yağı analiz programının temel adımlarını özetler.`,
          ],
          bullets: [
            "Numune alma programı (ekipman/sıklık) tanımlı ve uygulanıyor mu?",
            "Numuneler çalışırken, doğru noktadan ve temiz kapla alınıyor mu?",
            "Etiketleme (ekipman/tarih/saat/yağ) eksiksiz mi?",
            "Analiz parametreleri (viskozite, TBN, TAN, metaller, su, soot) izleniyor mu?",
            "Trend grafikleri tutuluyor ve baseline ile karşılaştırılıyor mu?",
            "Anormal sonuçlar somut aksiyona bağlanıyor mu?",
            "Yağ değişimi karar bazlı mı (saat bazlı değil)?",
            "Purifier/filtrasyon analiz sonuçlarıyla uyumlu yönetiliyor mu?",
            "Sonuçlar PMS'e işleniyor ve dosyalanıyor mu?",
            "Trend geçmişi handover'da aktarılıyor mu?",
          ],
        },
        {
          subheading: "8.2 Sonuç",
          paragraphs: [
            `Yağlama yağı analiz programı, Baş Mühendis'in makineyi açmadan "içeriyi görmesini" sağlayan en güçlü predictive araçtır. Disiplinli numune, doğru parametre yorumu ve trend takibi; iç aşınmayı erken yakalar, gereksiz yağ değişimini önler ve hem ekipman ömrünü hem maliyet etkinliğini optimize eder. Modern Baş Mühendis, bir tribology uzmanı gibi yağın anlattığı hikâyeyi okur.`,
          ],
        },
      ],
    },
  ],
};

export default content;
