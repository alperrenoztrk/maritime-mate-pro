import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "Can Filikası (Lifeboat) ve Davit",
  sectionId: "gmdss-lsa",
  topicIndex: 8,
  estimatedPages: 25,
  intro: `Can filikası (lifeboat), gemi terk durumunda mürettebatı güvenle denize indirip uzaklaştıran birincil can kurtarma aracıdır; davit (matafora) ise filikayı denize indiren/geri alan vinç-kol sistemidir. SOLAS/LSA Code, filika kapasitesi, indirme süresi, davit mukavemeti ve on-load release sistemini ayrıntılı düzenler. Bu bölüm; filika tiplerini (totally enclosed, free-fall), davit tiplerini (gravity, free-fall) ve indirme mekanizmasını, on-load/off-load release ve maalum kazaları, brake/winch ve embarkasyon prosedürünü, periyodik test ve tatbikatı ve bakım/arızayı mühendislik derinliğinde ele alır.`,
  sources: [
    "SOLAS Ch. III — life-saving appliances",
    "LSA Code — lifeboats & launching appliances",
    "IMO Res. MSC.1/Circ.1206 — lifeboat release safety",
    "Üretici el kitapları (davit/lifeboat)",
  ],
  chapters: [
    {
      heading: "1. Filika ve Davit Tipleri",
      sections: [
        {
          subheading: "1.1 Filika tipleri",
          paragraphs: [
            `Modern gemilerde tamamen kapalı (totally enclosed) filikalar standarttır; alev/su geçirmez, kendinden dengeli (self-righting) ve motorludur. Serbest düşüşlü (free-fall) filikalar kıçtan rampa ile denize bırakılır; hızlı tahliye sağlar, dökme yük/tankerlerde yaygındır. Tankerlerde yangına dayanıklı (fire-protected) filika gerekebilir.`,
          ],
          bullets: [
            `Totally enclosed: kapalı, self-righting`,
            `Free-fall: rampadan bırakma, hızlı`,
            `Fire-protected: tanker/yangın riski`,
          ],
        },
        {
          subheading: "1.2 Davit tipleri",
          paragraphs: [
            `Gravity davit, filikayı kendi ağırlığıyla (frenli) dışarı ve aşağı indirir; en yaygın tiptir. Free-fall davit ise filikayı serbest düşüşe bırakır ve geri almak için ayrı vinç kullanır. Davit, dolu filika ağırlığını emniyetle taşıyacak mukavemette olmalıdır.`,
          ],
        },
      ],
    },
    {
      heading: "2. Release Sistemi ve Kazalar",
      sections: [
        {
          subheading: "2.1 On-load / off-load release",
          paragraphs: [
            `Filika kancası (release hook); off-load (yalnızca suya değince yüksüz açılır) veya on-load (yük altında, suya değmeden açılabilir) olabilir. On-load release hızlı serbest bırakma sağlar ama yanlış kullanımda filikanın yükseklikten düşmesine yol açar. Bu nedenle interlock ve hidrostatik kilit (suya değmeden açılmayı engelleyen) önemlidir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Release kazaları",
              text: `Tarihsel olarak en çok ölüm, tatbikat sırasında on-load release kancasının yanlış açılıp filikanın düşmesiyle olmuştur. SOLAS, fall preventer device ve geliştirilmiş kanca tasarımını şart koşar.`,
            },
          ],
        },
        {
          subheading: "2.2 Embarkasyon ve indirme",
          paragraphs: [
            `Mürettebat embarkasyon güvertesinde filikaya biner; davit freni serbest bırakılınca filika kontrollü iner. Brake (santrifüj/band fren) iniş hızını sınırlar. Suya değince release açılır, painter (bağlama halatı) ile gemiden uzaklaşılır. Tüm süreç tatbikatlarla provasız bilinmelidir.`,
          ],
        },
      ],
    },
    {
      heading: "3. Test ve Tatbikat",
      sections: [
        {
          subheading: "3.1 Periyodik test",
          paragraphs: [
            `SOLAS, filikaların düzenli denize indirilmesini ve motor çalıştırılmasını ister; davit freni, winch ve release sistemi periyodik yük testinden geçer. Abandon ship drill (gemi terk tatbikatı) düzenli yapılır; mürettebat görev ve istasyonunu (muster list) bilir.`,
          ],
          table: {
            headers: ["İşlem", "Periyot"],
            rows: [
              ["Abandon ship drill", "Aylık (yolcu gemisinde haftalık)"],
              ["Filika denize indirme", "3 ayda bir (rotasyonla)"],
              ["Motor çalıştırma", "Haftalık (kısa)"],
              ["On-load release yük testi", "5 yıl + yıllık muayene"],
            ],
          },
        },
        {
          subheading: "3.2 Donanım ve provizyon",
          paragraphs: [
            `Filika; SOLAS donanımı (kürek, işaret fişeği, ilkyardım, su/gıda, pusula, SART/VHF, painter) ile donatılır. Bu malzemelerin tam ve geçerli (son kullanma) olduğu düzenli kontrol edilir.`,
          ],
        },
      ],
    },
    {
      heading: "4. Bakım ve Arıza",
      sections: [
        {
          subheading: "4.1 Bakım",
          paragraphs: [
            `Bakım; davit winch/fren, tel halat (fall wire) aşınma/değişim periyodu, release mekanizması ve hidrostatik interlock, motor ve batarya, gövde bütünlüğü ve donanım son kullanma kontrolünü kapsar. Fall wire belirli periyotta uçtan değiştirilir/ters çevrilir.`,
          ],
          bullets: [
            `Fall wire aşınma ve değişim periyodu`,
            `Release + interlock fonksiyon testi`,
            `Motor/batarya ve donanım kontrolü`,
          ],
        },
        {
          subheading: "4.2 Arıza tablosu",
          paragraphs: [`Yaygın sorunlar:`],
          table: {
            headers: ["Belirti", "Neden", "Müdahale"],
            rows: [
              ["Davit inmiyor/fren tutmuyor", "Winch/fren arızası", "Fren + winch bakımı"],
              ["Release açılmıyor/erken", "Mekanizma/interlock", "Release ayarı, interlock kontrol"],
              ["Motor çalışmıyor", "Batarya/yakıt", "Batarya/yakıt kontrolü"],
              ["Fall wire hasarlı", "Aşınma/korozyon", "Halat değişimi"],
            ],
          },
        },
      ],
    },
  ],
};

export default content;
