// Navigation topic detailed content
// Import images - Dünya'nın Şekli
import earthShape1 from "@/assets/navigation/earth-shape-1.jpg";
import earthShape2 from "@/assets/navigation/earth-shape-2.jpg";
import earthOblate from "@/assets/navigation/earth-oblate.jpg";
import earthRotation from "@/assets/navigation/earth-rotation.jpg";
import earthTilt from "@/assets/navigation/earth-tilt.jpg";
import earthSeasons from "@/assets/navigation/earth-seasons.jpg";
import earthTimezone1 from "@/assets/navigation/earth-timezone-1.png";
import earthTimezone2 from "@/assets/navigation/earth-timezone-2.png";

// Import images - Coğrafi Koordinat Sistemi
import coordinateSystem1 from "@/assets/navigation/coordinate-system-1.jpg";
import coordinateSystem2 from "@/assets/navigation/coordinate-system-2.jpg";
import coordinateSystem3 from "@/assets/navigation/coordinate-system-3.jpg";
import latitudeParallels from "@/assets/navigation/latitude-parallels.jpg";
import latitudeConcept from "@/assets/navigation/latitude-concept.jpg";
import latitudeMeasurement1 from "@/assets/navigation/latitude-measurement-1.jpg";
import latitudeMeasurement2 from "@/assets/navigation/latitude-measurement-2.jpg";
import longitudeConcept from "@/assets/navigation/longitude-concept.jpg";
import longitudeTime1 from "@/assets/navigation/longitude-time-1.png";
import longitudeTime2 from "@/assets/navigation/longitude-time-2.png";
import chartPlotting from "@/assets/navigation/chart-plotting.jpg";
import longitudeDistance1 from "@/assets/navigation/longitude-distance-1.jpg";
import longitudeDistance2 from "@/assets/navigation/longitude-distance-2.jpg";

// Import images - Enlem
import enlemParallels from "@/assets/navigation/enlem-parallels.jpg";
import enlemDefinition from "@/assets/navigation/enlem-definition.jpg";
import enlemRegions from "@/assets/navigation/enlem-regions.jpg";
import enlemNauticalMile from "@/assets/navigation/enlem-nautical-mile.jpg";
import enlemPlaneSailing from "@/assets/navigation/enlem-plane-sailing.jpg";
import enlemCelestial from "@/assets/navigation/enlem-celestial.png";
import enlemNewOrleans from "@/assets/navigation/enlem-new-orleans.jpg";

export interface TopicSection {
  title: string;
  content: string;
  image?: string;
  imageAlt?: string;
  bulletPoints?: string[];
  formula?: {
    text: string;
    description: string;
  };
}

export interface TopicDetailContent {
  title: string;
  introduction: string;
  sections: TopicSection[];
  keyPoints?: string[];
}

// Content map for navigation sub-topics
export const navigationTopicContents: Record<string, TopicDetailContent> = {
  "Dünya'nın şekli ve hareketleri": {
    title: "Dünya'nın Şekli ve Hareketleri",
    introduction: "Seyrin temeli, Dünya'nın gerçek fiziksel özelliklerinin doğru anlaşılmasına dayanır. Enlem, boylam, zaman, yön, hız ve mesafe gibi tüm seyir hesapları; Dünya'nın şekli ve hareketleri üzerine kuruludur. Bu nedenle seyir dersinin ilk ve en kritik konusu Dünya'nın geometrik ve dinamik yapısıdır.",
    sections: [
      {
        title: "Dünya'nın Şekli",
        content: "Dünya, mükemmel bir küre değildir. Kendi ekseni etrafındaki dönüşü nedeniyle ekvator bölgesinde şişkin, kutuplarda basık bir yapı gösterir. Bu şekle geoit veya matematiksel olarak basık küre (oblate spheroid) denir.",
        image: earthOblate,
        imageAlt: "Dünya'nın basık küre şekli",
        bulletPoints: [
          "Ekvator yarıçapı, kutup yarıçapından daha büyüktür",
          "Yerçekimi her noktada eşit değildir",
          "Deniz seviyesi, yerçekimi alanına göre şekillenir"
        ]
      },
      {
        title: "Seyir Açısından Önemi",
        content: "Enlem ve boylam çizgileri, gerçek bir küreye değil, bu basık küreye göre tanımlanır. Büyük mesafelerde yapılan hesaplarda bu fark ihmal edilemez."
      },
      {
        title: "Dünya'nın Coğrafi Eksenleri",
        content: "Dünya'nın hayali bir dönme ekseni vardır. Bu eksen, Kuzey Kutbu ile Güney Kutbunu birleştirir. Bu eksene dik olan en büyük daire ekvatordur.",
        image: earthShape1,
        imageAlt: "Dünya'nın ekseni ve ekvator",
        bulletPoints: [
          "Ekvator, Dünya'yı kuzey ve güney yarımküreye ayırır",
          "Enlem ölçümü ekvatordan başlar",
          "Boylam ölçümü, bu eksene göre tanımlanan meridyenler üzerinden yapılır",
          "Bu eksen, seyirde kullanılan gerçek kuzey (True North) kavramının temelidir"
        ]
      },
      {
        title: "Dünya'nın Kendi Ekseni Etrafındaki Dönüşü (Rotasyon)",
        content: "Dünya, kendi ekseni etrafında batıdan doğuya doğru döner. Bu dönüşün süresi yaklaşık 24 saattir.",
        image: earthRotation,
        imageAlt: "Dünya'nın rotasyonu - gece ve gündüz",
        bulletPoints: [
          "Gece–gündüz oluşur",
          "Zaman kavramı ortaya çıkar",
          "Boylam hesapları mümkün olur"
        ],
        formula: {
          text: "Dünya 24 saatte 360° döner → 1 saatte 15° → 1 dakikada 15′ → 1 saniyede 15″",
          description: "Bu ilişki, göksel seyirde boylam bulmanın temelidir"
        }
      },
      {
        title: "Dünya'nın Güneş Etrafındaki Dönüşü (Revolüsyon)",
        content: "Dünya, Güneş etrafında yaklaşık 365 gün 6 saatte bir tur atar. Bu hareket sırasında Dünya'nın dönme ekseni, yörünge düzlemine yaklaşık 23.5° eğiktir.",
        image: earthSeasons,
        imageAlt: "Dünya'nın mevsimsel hareketi ve eksen eğikliği",
        bulletPoints: [
          "Mevsimler oluşur",
          "Güneş'in gökyüzündeki yüksekliği yıl boyunca değişir",
          "Gün ve gece süreleri farklılaşır",
          "Göksel seyirde Güneş'in deklinasyonu bu hareketin doğrudan sonucudur"
        ]
      },
      {
        title: "Eksen Eğikliği (Obliquity)",
        content: "Dünya'nın dönme ekseni, yörünge düzlemine dik olan eksene göre yaklaşık 23.5° eğiktir. Bu eğiklik nedeniyle ekinoks ve solstis olayları meydana gelir.",
        image: earthTilt,
        imageAlt: "Dünya'nın 23.5° eksen eğikliği",
        bulletPoints: [
          "21 Mart: İlkbahar ekinoksu (Vernal Equinox)",
          "21 Haziran: Yaz gündönümü (Summer Solstice)",
          "23 Eylül: Sonbahar ekinoksu (Autumnal Equinox)",
          "22 Aralık: Kış gündönümü (Winter Solstice)"
        ]
      },
      {
        title: "Zaman ve Dünya Hareketleri Arasındaki İlişki",
        content: "Dünya'nın dönüşü, zaman dilimlerini oluşturur. Başlangıç meridyeni Greenwich Meridyeni (0°) olarak kabul edilir.",
        image: earthTimezone1,
        imageAlt: "Zaman dilimleri ve boylam ilişkisi",
        bulletPoints: [
          "Doğuya gidildikçe saat ileri alınır",
          "Batıya gidildikçe saat geri alınır"
        ],
        formula: {
          text: "15° boylam farkı = 1 saat | 1° boylam farkı = 4 dakika",
          description: "Bu ilişki, zaman–boylam hesaplarının temel formülüdür"
        }
      },
      {
        title: "Dünya'nın Şeklinin Seyir Hesaplarına Etkisi",
        content: "Dünya'nın basık küre olması nedeniyle farklı seyir yöntemleri kullanılır:",
        image: earthTimezone2,
        imageAlt: "Koordinat sistemi ve zaman dilimleri",
        bulletPoints: [
          "Düzlem seyir yalnızca kısa mesafelerde geçerlidir",
          "Uzun mesafelerde orta enlem ve büyük daire seyri kullanılır",
          "Göksel seyirde küresel trigonometri zorunludur",
          "Bu yüzden seyirde kullanılan her yöntem, Dünya'nın gerçek şekline göre seçilir"
        ]
      }
    ],
    keyPoints: [
      "Dünya mükemmel bir küre değil, basık küre (oblate spheroid) şeklindedir",
      "Rotasyon (24 saat) gece-gündüz ve boylam kavramını oluşturur",
      "Revolüsyon (365.25 gün) ve 23.5° eksen eğikliği mevsimleri oluşturur",
      "1 saat = 15° boylam ilişkisi seyir hesaplarının temelidir",
      "Seyir yöntemi seçimi, Dünya'nın gerçek şekline bağlıdır"
    ]
  },
  "Coğrafi koordinat sistemi": {
    title: "Coğrafi Koordinat Sistemi: Enlem ve Boylam",
    introduction: "Seyirde mevki tayini, Dünya üzerindeki herhangi bir noktanın enlem (latitude) ve boylam (longitude) değerleriyle ifade edilmesine dayanır. Bu iki açı, Dünya'nın merkezinden ölçülen küresel koordinatlardır ve tüm seyir hesaplarının ortak dilidir.",
    sections: [
      {
        title: "Koordinat Sistemine Genel Bakış",
        content: "Dünya üzerindeki herhangi bir noktayı tanımlamak için iki temel referans çizgisi kullanılır: Ekvator ve Greenwich Meridyeni. Bu iki çizginin kesişimi, koordinat sisteminin başlangıç noktasını oluşturur.",
        image: coordinateSystem1,
        imageAlt: "Paraleller ve meridyenler - koordinat sistemi",
        bulletPoints: [
          "Enlem çizgileri (paraleller) ekvatora paralel yatay dairelerdir",
          "Boylam çizgileri (meridyenler) kutupları birleştiren dikey yarım dairelerdir",
          "Her nokta benzersiz bir enlem-boylam çifti ile tanımlanır"
        ]
      },
      {
        title: "Paraleller ve Meridyenler",
        content: "Paraleller, ekvatora paralel olarak çizilen hayali dairelerdir ve enlem değerlerini belirler. Meridyenler ise Kuzey Kutbu'ndan Güney Kutbu'na uzanan hayali yarım dairelerdir ve boylam değerlerini belirler.",
        image: coordinateSystem2,
        imageAlt: "Paraleller ve meridyenler detaylı görünüm",
        bulletPoints: [
          "Ekvator en büyük paralel dairesidir (çevresi yaklaşık 40.075 km)",
          "Tüm meridyenler aynı uzunluktadır (yaklaşık 20.004 km)",
          "Meridyenler kutuplarda birleşir, paraleller ise asla kesişmez"
        ]
      },
      {
        title: "Enlem (Latitude) Kavramı",
        content: "Enlem, bir noktanın ekvatora olan açısal uzaklığıdır. Ölçüm, Dünya merkezinden yapılır ve kuzey–güney yönünü ifade eder.",
        image: coordinateSystem3,
        imageAlt: "Enlem ve boylam üç boyutlu görünüm",
        bulletPoints: [
          "Ekvator: 0° enlem",
          "Kuzey Kutbu: 90° Kuzey (90°N)",
          "Güney Kutbu: 90° Güney (90°S)"
        ]
      },
      {
        title: "Enlem Paralelleri",
        content: "Enlemler, ekvatora paralel daireler hâlinde çizilir ve bu nedenle paraleller olarak adlandırılır. Her paralel dairesi, ekvatordan uzaklaştıkça küçülür.",
        image: latitudeParallels,
        imageAlt: "Enlem paralelleri",
        bulletPoints: [
          "Geminin kuzey–güney konumunu belirler",
          "Güneş ve yıldızların yükseklik hesabının temelidir",
          "Harita ölçeği ve mesafe hesabı için kullanılır"
        ],
        formula: {
          text: "1° enlem = 60 deniz mili | 1′ enlem = 1 deniz mili",
          description: "Bu nedenle harita üzerinde enlem çizgileri doğrudan mesafe ölçeği olarak kullanılır"
        }
      },
      {
        title: "Enlemin Ölçüm Mantığı",
        content: "Enlem, bir noktanın zenit doğrultusu ile ekvator düzlemi arasındaki açıdır. Göksel seyirde bu açı, gök cisimlerinin yükseklikleri kullanılarak dolaylı biçimde bulunur.",
        image: latitudeMeasurement1,
        imageAlt: "Enlem ölçümü - Kutup Yıldızı ile",
        bulletPoints: [
          "Kutup Yıldızı'nın yüksekliği yaklaşık olarak enleme eşittir",
          "Güneş'in öğle yüksekliği enlem hesabında kullanılır",
          "Sextant ile yapılan ölçümler enlem tayininin temelidir"
        ]
      },
      {
        title: "Boylam (Longitude) Kavramı",
        content: "Boylam, bir noktanın başlangıç meridyenine (Greenwich) olan açısal uzaklığıdır. Ölçüm doğu–batı yönündedir.",
        image: longitudeConcept,
        imageAlt: "Boylam kavramı ve meridyenler",
        bulletPoints: [
          "Greenwich Meridyeni: 0° boylam",
          "Doğuya doğru: 0°–180° Doğu (E)",
          "Batıya doğru: 0°–180° Batı (W)"
        ]
      },
      {
        title: "Boylam ve Zaman İlişkisi",
        content: "Boylamın en kritik özelliği, zamanla doğrudan ilişkili olmasıdır. Dünya 24 saatte 360° döndüğünden, boylam farkı zaman farkına dönüştürülebilir.",
        image: longitudeTime1,
        imageAlt: "Boylam ve zaman ilişkisi",
        bulletPoints: [
          "15° boylam farkı = 1 saat",
          "1° boylam farkı = 4 dakika",
          "1′ boylam farkı = 4 saniye"
        ],
        formula: {
          text: "Boylam (°) × 4 = Zaman farkı (dakika)",
          description: "Kronometre zamanı ile yerel zaman karşılaştırılarak boylam bulunur"
        }
      },
      {
        title: "Zaman ile Boylam Tayini",
        content: "Bu ilişki sayesinde kronometre zamanı ile yerel zaman karşılaştırılarak boylam bulunur. Göksel seyirde zaman hatası, doğrudan boylam hatasına dönüşür.",
        image: longitudeTime2,
        imageAlt: "Yerel öğle ve boylam",
        bulletPoints: [
          "Yerel öğle zamanı, güneşin meridyenden geçtiği andır",
          "Greenwich zamanı ile yerel zaman farkı boylamı verir",
          "1 saniye zaman hatası ≈ 0.25′ boylam hatası"
        ]
      },
      {
        title: "Enlem ve Boylamın Birlikte Kullanımı",
        content: "Bir noktanın Dünya üzerindeki yeri tek başına enlem veya boylamla belirlenemez. İkisi birlikte kullanıldığında tekil bir mevki tanımlar.",
        image: chartPlotting,
        imageAlt: "Harita üzerinde mevki işaretleme sembolleri",
        bulletPoints: [
          "Enlem: kuzey–güney konumu belirler",
          "Boylam: doğu–batı konumu belirler",
          "Kesişim noktası geminin mevkiidir"
        ]
      },
      {
        title: "Boylamda Mesafe Kavramının Değişmesi",
        content: "Enlemde mesafe sabittir; boylamda değildir. Çünkü meridyenler kutuplara doğru yaklaşır ve paralel daireleri küçülür.",
        image: longitudeDistance1,
        imageAlt: "Boylam mesafesinin enlemle değişimi",
        bulletPoints: [
          "Ekvatorda 1° boylam = 60 deniz mili",
          "60° enlemde 1° boylam = 30 deniz mili",
          "Kutuplarda 1° boylam = 0 deniz mili"
        ],
        formula: {
          text: "Departure = DLong × cos(Lat)",
          description: "Bu formül düzlem seyirde departure kavramını ve orta enlem seyirde boylam hesaplarını temel alır"
        }
      }
    ],
    keyPoints: [
      "Enlem: Ekvatora olan açısal uzaklık (0°–90° K/G)",
      "Boylam: Greenwich'e olan açısal uzaklık (0°–180° D/B)",
      "1 dakika enlem = 1 deniz mili (sabit)",
      "15° boylam = 1 saat zaman farkı",
      "Boylam mesafesi enlemle birlikte değişir: Dep = DLong × cos(Lat)"
    ]
  },
  "Enlem": {
    title: "Enlem (Latitude)",
    introduction: "Enlem, seyirde konumun bel kemiğidir. Bir geminin kuzeyde mi güneyde mi olduğunu, kutuplara mı yoksa ekvatora mı yaklaştığını enlem belirler. Harita üzerindeki mesafe ölçümleri, göksel seyirde yapılan yükseklik hesapları ve düzlem seyirdeki tüm matematik, doğrudan enlem kavramına dayanır. Bu nedenle enlem, sadece bir koordinat değil, seyir hesaplarının referans eksenidir.",
    sections: [
      {
        title: "Enlemin Tanımı ve Geometrik Anlamı",
        content: "Enlem, Dünya üzerindeki bir noktanın ekvatora olan açısal uzaklığıdır. Bu açı, Dünya'nın merkezinden ölçülür ve ekvator düzlemi referans alınır.",
        image: enlemDefinition,
        imageAlt: "Enlemin geometrik tanımı",
        bulletPoints: [
          "Kuzey Kutbu: 90° Kuzey (90°N)",
          "Ekvator: 0°",
          "Güney Kutbu: 90° Güney (90°S)",
          "Enlem her zaman Kuzey (N) veya Güney (S) olarak ifade edilir",
          "Enlem yalnızca kuzey–güney konumunu tanımlar, doğu–batı yönü hakkında bilgi vermez"
        ]
      },
      {
        title: "Paraleller ve Enlem Çizgileri",
        content: "Enlemler, ekvatora paralel hayali dairelerdir ve bu yüzden paralel olarak adlandırılırlar. Ekvator en büyük paraleldir; kutuplara yaklaştıkça paralellerin çevresi küçülür.",
        image: enlemParallels,
        imageAlt: "Enlem paralelleri",
        bulletPoints: [
          "Paraleller birbirini kesmez",
          "Aynı enlem üzerindeki tüm noktalar, ekvatora eşit uzaklıktadır",
          "Harita üzerinde kuzey–güney hareket doğrudan enlem değişimi olarak ölçülür"
        ]
      },
      {
        title: "Coğrafi Bölgeler ve Enlem",
        content: "Enlem değerleri, Dünya üzerindeki coğrafi bölgeleri tanımlamak için kullanılır. Önemli enlem çizgileri arasında Yengeç Dönencesi (23.5°N), Oğlak Dönencesi (23.5°S), Kuzey Kutup Dairesi (66.5°N) ve Güney Kutup Dairesi (66.5°S) bulunur.",
        image: enlemRegions,
        imageAlt: "Dünya üzerinde enlem bölgeleri",
        bulletPoints: [
          "Tropikal bölge: 23.5°N ile 23.5°S arasında",
          "Ilıman bölgeler: 23.5° ile 66.5° arasında",
          "Kutup bölgeleri: 66.5° ile 90° arasında"
        ]
      },
      {
        title: "Enlem Birimleri ve Deniz Mili İlişkisi",
        content: "Enlem, derece (°), dakika (′) ve saniye (″) ile ifade edilir. Seyirde temel kabul olarak 1° enlem = 60 deniz mili ve 1′ enlem = 1 deniz mili ilişkisi kullanılır.",
        image: enlemNauticalMile,
        imageAlt: "Enlem ve deniz mili ilişkisi",
        bulletPoints: [
          "1° enlem = 60 deniz mili",
          "1′ enlem = 1 deniz mili",
          "Deniz haritalarında mesafe ölçümü için enlem ölçeği kullanılır",
          "Boylam ölçeği mesafe için güvenilir değildir"
        ],
        formula: {
          text: "1° = 60′ (dakika) = 3600″ (saniye)",
          description: "Bu ilişki, düzlem seyirde mesafe hesaplarının ve hız–zaman ilişkilerinin temelidir"
        }
      },
      {
        title: "Örnek Konum: New Orleans",
        content: "New Orleans, ABD'de 30°N enlem ve 90°W boylam koordinatlarında bulunur. Bu konum, enlemi somut bir örnekle anlamak için kullanılabilir.",
        image: enlemNewOrleans,
        imageAlt: "New Orleans koordinatları örneği",
        bulletPoints: [
          "30° Kuzey enlemi, ekvatordan 30° kuzeyde olduğunu gösterir",
          "Bu noktadan kutba mesafe: (90° - 30°) × 60 = 3600 deniz mili",
          "Ekvatora mesafe: 30° × 60 = 1800 deniz mili"
        ]
      },
      {
        title: "Enlem Değişimi (DLat) Kavramı",
        content: "Bir gemi kuzeye veya güneye hareket ettiğinde enlem değişimi (Difference of Latitude – DLat) meydana gelir. DLat kuzeye gidiliyorsa artı (+), güneye gidiliyorsa eksi (−) kabul edilir.",
        image: enlemPlaneSailing,
        imageAlt: "Düzlem seyir ve enlem değişimi formülleri",
        bulletPoints: [
          "DLat = Mesafe × cos(kurs)",
          "Bu ifade, geminin gerçek hareketinin kuzey–güney bileşenini verir",
          "Düzlem seyirde temel hesaplama formülüdür"
        ],
        formula: {
          text: "DLat = Mesafe × cos(Kurs)",
          description: "Örnek: 120 NM mesafe, 030° kurs → DLat = 120 × cos(30°) ≈ 103.9′"
        }
      },
      {
        title: "Örnek – Enlem Değişimi Hesabı",
        content: "Başlangıç enlemi 36°20′N, kurs 030° ve mesafe 120 deniz mili olan bir gemi için yeni enlem hesaplanabilir.",
        bulletPoints: [
          "DLat = 120 × cos(30°) = 120 × 0.866 ≈ 103.9′",
          "DLat ≈ 1°43.9′",
          "Yeni enlem: 36°20′ + 1°43.9′ = 38°03.9′N"
        ]
      },
      {
        title: "Enlemin Göksel Seyirdeki Rolü",
        content: "Göksel seyirde enlem, özellikle öğle mevkii hesaplarında kritik rol oynar. Güneşin en büyük yüksekliği ile gözlemcinin enlemi arasında doğrudan ilişki vardır.",
        image: enlemCelestial,
        imageAlt: "Göksel seyir ve enlem ilişkisi",
        bulletPoints: [
          "Gök cisminin yüksekliği arttıkça, gözlemci ekvatora yaklaşır",
          "Güneş zenitte ise, gözlemci Güneş'in deklinasyonu enlemindedir",
          "Kutup Yıldızı'nın yüksekliği yaklaşık olarak enleme eşittir"
        ]
      },
      {
        title: "Enlem ve Seyir Yöntemleri Arasındaki Bağlantı",
        content: "Enlem, farklı seyir yöntemlerinde farklı şekillerde kullanılır ve hesaplanır, ancak fiziksel anlamı her zaman aynıdır.",
        bulletPoints: [
          "Düzlem seyirde: Enlem doğrudan hesaplanır",
          "Orta enlem seyirde: Boylam hesabına girer",
          "Göksel seyirde: Gözlemle bulunur",
          "Elektronik seyirde: GPS çıktısı olarak alınır"
        ]
      }
    ],
    keyPoints: [
      "Enlem, Dünya merkezinden ölçülen ekvator-nokta arası açıdır (0°–90° K/G)",
      "1′ enlem = 1 deniz mili (seyirde temel mesafe birimi)",
      "Paraleller ekvatora paralel dairelerdir ve birbirini kesmez",
      "DLat = Mesafe × cos(Kurs) formülü düzlem seyirin temelidir",
      "Göksel seyirde enlem, gök cismi yükseklikleri ile bulunur"
    ]
  }
};
