import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "Isı Değiştiriciler ve Soğutucular",
  sectionId: "auxiliary",
  topicIndex: 9,
  estimatedPages: 24,
  intro: `Isı değiştiriciler (heat exchanger), iki akışkan arasında ısıyı — akışkanları karıştırmadan — bir ayırıcı yüzey üzerinden aktaran temel yardımcı makinelerdir. Gemide L.O. cooler, jacket water (ceket suyu) cooler, charge air cooler, F.O./L.O. heater ve kondenserler bu gruba girer. Modern gemilerde deniz suyu korozyonunu makinelerden uzak tutan merkezi soğutma (central cooling) mimarisi standarttır. Bu bölüm; ısı değiştirici tiplerini (plakalı, gövde-boru, hava soğutucu), ısı transferi temelini (U, LMTD, fouling), merkezi soğutma devresini (SW/LT/HT), su kimyası ve korozyonu ve bakım/arızayı mühendislik derinliğinde ele alır.`,
  sources: [
    "Alfa Laval / Kelvion / API plate & shell-and-tube manuals",
    "IACS UR — coolers & essential cooling arrangements",
    "TEMA — Standards of Tubular Exchanger Manufacturers Association",
    "Pounder's Marine Diesel Engines & Gas Turbines",
  ],
  chapters: [
    {
      heading: "1. Tipler ve Yapı",
      lead: "Gemide en yaygın üç aile: plakalı, gövde-boru ve hava soğutuculardır. Seçim; basınç, sıcaklık, akışkan ve bakım kolaylığına göre yapılır.",
      sections: [
        {
          subheading: "1.1 Plakalı (plate) ısı değiştirici",
          paragraphs: [
            `Plakalı tip, ince oluklu (chevron desenli) paslanmaz veya titanyum plakaların contalarla (gasket) sıkıştırılmasından oluşur. Sıcak ve soğuk akışkan komşu kanallardan zıt yönde akar; oluklar türbülans yaratarak ısı transferini artırır. Kompakt hacimde çok yüksek transfer yüzeyi sağlar ve plakalar sökülüp mekanik/kimyasal temizlenebilir.`,
          ],
          bullets: [
            `Yüksek verim, küçük hacim/ağırlık`,
            `Sökülüp temizlenebilir; plaka eklenerek kapasite artırılabilir`,
            `Deniz suyu tarafında titanyum plaka korozyona dayanır`,
            `Gasket sıcaklık/basınç sınırına duyarlıdır`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Central/L.O./J.W. cooler",
              text: `Plakalı tip; merkezi soğutucu, yağlama yağı (L.O.) ve ceket suyu (J.W.) cooler'larında baskın seçimdir. Yüksek verim küçük deniz suyu debisiyle iş görmeyi sağlar.`,
            },
          ],
        },
        {
          subheading: "1.2 Gövde-boru (shell & tube)",
          paragraphs: [
            `Bir akışkan boru demetinin içinden (tube side), diğeri gövde içinde borular arasından (shell side) geçer; baffle'lar shell tarafı akışı yönlendirir. Yüksek basınç ve sıcaklığa dayanıklıdır, sağlamdır ve tıkanmaya toleranslıdır. F.O. heater, buhar ısıtıcılar ve bazı büyük kondenserlerde tercih edilir.`,
          ],
          table: {
            headers: ["Tip", "Güçlü yön", "Zayıf yön"],
            rows: [
              ["Plakalı", "Verim, kompaktlık, temizlik", "Gasket ömrü, basınç sınırı"],
              ["Gövde-boru", "Yüksek basınç/sıcaklık, sağlam", "Hacimli, temizlik zor"],
              ["Charge air cooler", "Büyük hava debisi", "Su tarafı kirlenir/tıkanır"],
            ],
          },
        },
        {
          subheading: "1.3 Charge air cooler (hava soğutucu)",
          paragraphs: [
            `Turboşarj sonrası sıkışan (ve ısınan) emme havası, kanatlı boru demetli bir cooler'da soğutulur. Soğuk hava daha yoğundur; silindire daha çok oksijen girer, güç ve yanma verimi artar. Su tarafı deniz suyu veya LT tatlı su ile beslenir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Yoğuşma (condensate) drenajı",
              text: `Nemli havada charge air cooler çıkışında su yoğuşur. Drenaj (drain trap) tıkalıysa su silindire taşınıp korozyon ve mekanik hasara yol açar.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Isı Transferi Temeli",
      sections: [
        {
          subheading: "2.1 Q = U·A·ΔTlm",
          paragraphs: [
            `Transfer edilen ısı; toplam ısı transfer katsayısı (U), yüzey alanı (A) ve logaritmik ortalama sıcaklık farkına (ΔTlm) bağlıdır. ΔTlm, giriş ve çıkışta iki akışkan arasındaki sıcaklık farklarının logaritmik ortalamasıdır ve zıt akış (counter-flow) düzeninde en yüksektir. Bu yüzden ısı değiştiriciler mümkün olduğunca ters akışlı tasarlanır.`,
          ],
          table: {
            headers: ["Sembol", "Anlam", "Birim"],
            rows: [
              ["Q", "Isı transfer hızı", "W (kW)"],
              ["U", "Toplam ısı transfer katsayısı", "W/m²·K"],
              ["A", "Isı transfer yüzey alanı", "m²"],
              ["ΔTlm", "Logaritmik ortalama sıcaklık farkı", "K"],
            ],
          },
          callouts: [
            {
              type: "example",
              title: "Örnek hesap",
              text: `U = 3000 W/m²·K, A = 8 m², ΔTlm = 15 K → Q = 3000 × 8 × 15 = 360.000 W ≈ 360 kW. Cooler bu ısıyı yağdan soğutucu suya aktarır.`,
            },
          ],
        },
        {
          subheading: "2.2 Fouling (kirlenme) ve performans",
          paragraphs: [
            `Yüzeyde biriken tortu, biyofilm, kireç veya yağ tabakası ilave bir ısıl direnç (fouling factor) oluşturur; U düşer, aynı alanla daha az ısı aktarılır. Belirti: soğutulan akışkanın çıkış sıcaklığının yükselmesi ve basınç farkının (ΔP) artması. Performans, temiz haldeki referans değerlerle karşılaştırılarak izlenir.`,
          ],
          bullets: [
            `Deniz suyu tarafı → deniz canlısı/çamur/kireç`,
            `Yağ tarafı → oksidasyon çamuru, karbon`,
            `ΔP artışı ve çıkış sıcaklığı yükselmesi = temizlik zamanı`,
          ],
        },
      ],
    },
    {
      heading: "3. Merkezi Soğutma (Central Cooling)",
      lead: "Deniz suyunu makinelerden uzak tutan modern mimari; korozyon ve bakımı büyük ölçüde azaltır.",
      sections: [
        {
          subheading: "3.1 SW / LT / HT devreleri",
          paragraphs: [
            `Merkezi soğutmada deniz suyu (SW) yalnızca central cooler'a girer ve buradan denize döner. Makineler, düşük tuzluluklu ve inhibitörlü tatlı su (FW) devreleriyle soğutulur. Yüksek sıcaklık (HT) devresi ana makine ceket suyunu; düşük sıcaklık (LT) devresi L.O. cooler, charge air cooler ve yardımcıları soğutur. Termostatik üç-yollu valf sıcaklığı sabit tutar.`,
          ],
          table: {
            headers: ["Devre", "Akışkan", "Soğuttuğu yer"],
            rows: [
              ["SW (deniz suyu)", "Deniz suyu", "Sadece central cooler"],
              ["HT (yüksek sıcaklık)", "Tatlı su ~80–85 °C", "Ana makine ceket suyu"],
              ["LT (düşük sıcaklık)", "Tatlı su ~36 °C", "L.O., charge air, yardımcılar"],
            ],
          },
        },
        {
          subheading: "3.2 Avantajlar",
          paragraphs: [
            `Deniz suyu korozyonu ve deniz canlısı kirlenmesi yalnızca central cooler ve kısa SW hattıyla sınırlı kalır. İç FW devresi temiz ve kontrollü kaldığı için makine cooler'ları uzun ömürlü olur, bakım aralıkları uzar ve sıcaklık kontrolü daha kararlı olur.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "Klas gereği yedeklilik",
              text: `Esas soğutma pompaları ve central cooler düzeni, bir ünite devre dışı kaldığında geminin soğutma kapasitesini koruyacak şekilde (yedekli) tasarlanır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Su Kimyası ve Korozyon",
      sections: [
        {
          subheading: "4.1 İnhibitör ve galvanik korozyon",
          paragraphs: [
            `İç tatlı su devresine korozyon inhibitörü (tipik nitrit esaslı) dozlanır ve periyodik test edilir; seviye düşerse iç yüzeylerde korozyon başlar. Deniz suyu tarafında farklı metallerin (çelik–bronz–titanyum) teması galvanik korozyon üretir; bu yüzden feda anotları (sacrificial anode) ve uygun malzeme seçimi kullanılır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "İki akışkanın karışması",
              text: `Plaka çatlağı, delinen boru veya bozuk gasket, yüksek basınçlı tarafın düşük basınçlı tarafa sızmasına yol açar (ör. deniz suyunun yağa/ceket suyuna karışması). Basınç testi ile tespit edilir; hasarlı eleman değişmeden servise alınmaz.`,
            },
          ],
        },
        {
          subheading: "4.2 Deniz suyu tarafı temizliği",
          paragraphs: [
            `SW tarafı en hızlı kirlenen bölümdür. Strainer düzenli temizlenir; plakalar/borular periyodik olarak kimyasal (asit) ile kireçten arındırılır ve mekanik olarak fırçalanır. Klorlama (MGPS — marine growth prevention system) deniz canlısı üremesini baskılar.`,
          ],
        },
      ],
    },
    {
      heading: "5. Bakım ve Arıza",
      sections: [
        {
          subheading: "5.1 Rutin bakım",
          paragraphs: [
            `Giriş/çıkış sıcaklık ve ΔP değerleri düzenli kaydedilir; referanstan sapma kirlenmeyi gösterir. Plakalı cooler açıldığında plaka sırası/yönü işaretlenir, gasket kontrol edilir ve gerekiyorsa yenilenir. Deniz suyu strainer'ı sık, plaka/boru kimyasal temizliği planlı aralıklarla yapılır.`,
          ],
          bullets: [
            `ΔP ve sıcaklık trendini izle (fouling erken uyarısı)`,
            `Plaka sökümünde diziliş/yön işaretle`,
            `Gasket'i sıcaklık/basınç sınıfına uygun seç`,
            `İnhibitör (nitrit) ve pH'ı test et ve dozla`,
          ],
        },
        {
          subheading: "5.2 Arıza tablosu",
          paragraphs: [`Yaygın sorunlar ve müdahaleler:`],
          table: {
            headers: ["Belirti", "Neden", "Müdahale"],
            rows: [
              ["Çıkış sıcaklığı yüksek", "Fouling, düşük SW debisi, hava kilidi", "Temizlik, strainer, vent (hava alma)"],
              ["Yüksek ΔP", "Tortu/çamur birikimi", "Backflush, kimyasal temizlik"],
              ["Akışkanlar karışıyor", "Plaka çatlağı/boru delinmesi/gasket", "Basınç testi, hasarlı eleman değişimi"],
              ["FW devresinde korozyon", "İnhibitör tükenmiş, hava girişi", "Nitriti test/dozla, hava girişini gider"],
              ["Charge air cooler tıkalı", "Su tarafı kir/kireç", "Kimyasal temizlik, drenajı kontrol et"],
            ],
          },
        },
        {
          subheading: "5.3 Emniyet notları",
          paragraphs: [
            `Basınçlı sistemde flanş/cıvata gevşetmeden önce izole edilip basınç boşaltılır. Kimyasal (asit) temizlikte uygun PPE kullanılır ve işlem sonrası nötralizasyon + bol durulama yapılır. Deniz suyu tarafında anot/kaplama durumu düzenli kontrol edilir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "İzole et, basınç boşalt",
              text: `Bir cooler'ı açmadan önce ilgili SW/FW valfleri kapatılır, drenaj açılır ve basınç sıfırlanır. Aksi halde ani boşalma ve sıcak akışkan yanığı riski vardır.`,
            },
          ],
        },
      ],
    },
  ],
};

export default content;
