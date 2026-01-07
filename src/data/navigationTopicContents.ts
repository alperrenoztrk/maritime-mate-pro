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

// Import images - Boylam
import boylamWorldMap from "@/assets/navigation/boylam-world-map.jpg";
import boylamLocalNoon from "@/assets/navigation/boylam-local-noon.png";
import boylamDefinition from "@/assets/navigation/boylam-definition.jpg";
import boylamMeridians from "@/assets/navigation/boylam-meridians.jpg";
import boylamTimeZones from "@/assets/navigation/boylam-time-zones.png";
import boylamDeparture from "@/assets/navigation/boylam-departure.jpg";
import boylamCelestial from "@/assets/navigation/boylam-celestial.png";
import boylamSunLongitude from "@/assets/navigation/boylam-sun-longitude.jpg";

// Import images - Yön Kavramları
import yonNorthTypes from "@/assets/navigation/yon-north-types.png";
import yonCompassRose from "@/assets/navigation/yon-compass-rose.jpg";
import yonTrueBearing from "@/assets/navigation/yon-true-bearing.jpg";
import yonRelativeBearing from "@/assets/navigation/yon-relative-bearing.png";
import yonHeadingBearing from "@/assets/navigation/yon-heading-bearing.jpg";
import yonDiagram1 from "@/assets/navigation/yon-diagram-1.jpg";
import yonDiagram2 from "@/assets/navigation/yon-diagram-2.jpg";
import yonWindDrift from "@/assets/navigation/yon-wind-drift.png";
import yonRadarMotion from "@/assets/navigation/yon-radar-motion.jpg";

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
  },
  "Boylam": {
    title: "Boylam (Longitude)",
    introduction: "Boylam, seyirde doğu–batı konumunu belirleyen temel koordinattır. Enlem geminin kuzey–güney yerini söylerken, boylam geminin Greenwich'e göre nerede olduğunu ifade eder. Zaman, kronometre, göksel seyir ve elektronik mevki tayini boylam kavramı üzerine inşa edilmiştir. Bu nedenle boylam, seyirde en hassas ve hata affetmeyen konulardan biridir.",
    sections: [
      {
        title: "Boylamın Tanımı ve Geometrik Anlamı",
        content: "Boylam, Dünya üzerindeki bir noktanın Başlangıç Meridyeni'ne (Greenwich, 0°) olan açısal uzaklığıdır. Bu açı, Dünya'nın merkezinden ölçülür ve doğu–batı yönünü ifade eder.",
        image: boylamDefinition,
        imageAlt: "Boylam tanımı ve Greenwich meridyeni",
        bulletPoints: [
          "Greenwich Meridyeni: 0°",
          "Doğuya doğru: 0°–180° Doğu",
          "Batıya doğru: 0°–180° Batı",
          "Boylamlar, meridyenler olarak adlandırılır ve kutuplarda birleşir"
        ]
      },
      {
        title: "Meridyenlerin Yapısı ve Özellikleri",
        content: "Meridyenler, Kuzey Kutbu'ndan Güney Kutbu'na uzanan hayali yarım dairelerdir. Tüm meridyenler aynı uzunluktadır ve kutuplarda birleşirler.",
        image: boylamMeridians,
        imageAlt: "Meridyen özellikleri",
        bulletPoints: [
          "Meridyenler kutup–kutup arası uzanır",
          "Birbirini kutuplarda keser",
          "Ekvatoru dik keser",
          "Boylam mesafesi sabit değildir, enleme bağlı olarak değişir"
        ]
      },
      {
        title: "Dünya Üzerinde Boylam Dağılımı",
        content: "Boylam, Dünya'nın doğu–batı yönündeki konumunu belirler. Greenwich Meridyeni (0°) referans alınarak doğuya ve batıya doğru 180°'ye kadar ölçülür.",
        image: boylamWorldMap,
        imageAlt: "Dünya üzerinde boylam dağılımı",
        bulletPoints: [
          "Doğu yarımküre: 0°–180° Doğu (E)",
          "Batı yarımküre: 0°–180° Batı (W)",
          "180° meridyeni Tarih Değiştirme Çizgisi'dir"
        ]
      },
      {
        title: "Boylam ve Zaman Arasındaki Temel İlişki",
        content: "Dünya kendi ekseni etrafında 24 saatte 360° döner. Bu nedenle boylam ile zaman arasında doğrudan ve değişmez bir ilişki vardır.",
        image: boylamTimeZones,
        imageAlt: "Boylam ve zaman dilimleri",
        bulletPoints: [
          "15° boylam = 1 saat",
          "1° boylam = 4 dakika",
          "1′ boylam = 4 saniye"
        ],
        formula: {
          text: "Boylam (°) × 4 = Zaman farkı (dakika)",
          description: "Zamandaki her hata, doğrudan boylam hatasına dönüşür"
        }
      },
      {
        title: "Yerel Zaman ve Greenwich Zamanı",
        content: "Boylam hesabında iki zaman kullanılır: Greenwich zamanı (UTC) ve Yerel zaman (Local Apparent Time). Yerel zaman ile Greenwich zamanı arasındaki fark, gözlemcinin boylamını verir.",
        image: boylamLocalNoon,
        imageAlt: "Yerel öğle zamanı ve boylam",
        bulletPoints: [
          "Yerel zaman ileri ise → Doğu boylam",
          "Yerel zaman geri ise → Batı boylam",
          "Bu prensip, göksel seyirde kronometre kullanımının temelidir"
        ]
      },
      {
        title: "Boylam Değişimi ve Departure",
        content: "Bir gemi doğuya veya batıya hareket ettiğinde boylam değişimi (Difference of Longitude – DLo) meydana gelir. Boylam değişimi doğrudan mesafeyle ölçülemez, çünkü meridyenler kutuplara yaklaştıkça yaklaşır.",
        image: boylamDeparture,
        imageAlt: "Boylam değişimi ve departure kavramı",
        bulletPoints: [
          "Meridyenler kutuplara yaklaştıkça yaklaşır",
          "Aynı boylam farkı, farklı enlemlerde farklı mesafelere karşılık gelir",
          "Bu nedenle seyirde departure kavramı kullanılır"
        ],
        formula: {
          text: "Departure = DLong × cos(Lat)",
          description: "Bu ilişki düzlem seyirde, orta enlem seyirde ve akıntılı seyir hesaplarında kullanılır"
        }
      },
      {
        title: "Örnek – Boylam Değişimi Hesabı",
        content: "Ortalama enlem 40°N ve departure 90 deniz mili (doğuya) olan bir gemi için boylam değişimi hesaplanabilir.",
        bulletPoints: [
          "cos 40° ≈ 0.766",
          "DLo = Departure / cos(enlem) = 90 / 0.766 ≈ 117.5′",
          "DLo ≈ 1°57.5′ Doğu boylam"
        ]
      },
      {
        title: "Boylamın Göksel Seyirdeki Rolü",
        content: "Göksel seyirde boylam, zaman gözlemi ile bulunur. Gök cisminin gözlem anındaki Greenwich zamanı ile yerel zamanı arasındaki fark, doğrudan boylamı verir.",
        image: boylamCelestial,
        imageAlt: "Göksel seyir ve boylam",
        bulletPoints: [
          "Kronometre hatası → boylam hatası",
          "Zaman kaydı hatası → mevki hatası",
          "Yanlış UTC kullanımı büyük sapmalara yol açar"
        ]
      },
      {
        title: "Boylam ve Güneş Meridyen Geçişi",
        content: "Güneş'in meridyenden geçtiği an (yerel öğle) kullanılarak boylam hesaplanabilir. Bu yöntem göksel seyirde temel boylam tayini yöntemidir.",
        image: boylamSunLongitude,
        imageAlt: "Güneş meridyen geçişi ile boylam tayini",
        bulletPoints: [
          "Güneş meridyenden geçtiğinde yerel öğle olur",
          "Greenwich zamanı ile yerel öğle farkı boylam verir",
          "1 saniye zaman hatası ≈ 0.25′ boylam hatası"
        ]
      },
      {
        title: "Boylam ve Elektronik Seyir",
        content: "Elektronik seyirde boylam GPS tarafından doğrudan verilir. Ancak GPS hataları, datum uyuşmazlığı ve anten konumu farkı boylamda sapma yaratabilir.",
        bulletPoints: [
          "GPS boylam değerini doğrudan verir",
          "GPS hataları mevki sapmasına yol açabilir",
          "Datum uyuşmazlığı önemli hatalar oluşturabilir",
          "Boylam, klasik ve göksel yöntemlerle çapraz kontrol edilmelidir"
        ]
      }
    ],
    keyPoints: [
      "Boylam, Greenwich'e olan açısal uzaklıktır (0°–180° D/B)",
      "15° boylam = 1 saat zaman farkı",
      "Meridyenler kutuplarda birleşir, boylamlar kutup–kutup arası uzanır",
      "Departure = DLong × cos(Lat) formülü boylam–mesafe ilişkisini verir",
      "Göksel seyirde boylam, zaman gözlemi ile bulunur"
    ]
  },
  "Yön kavramları": {
    title: "Yön Kavramları",
    introduction: "Denizcilikte yön kavramı, geminin hareketinin matematiksel olarak tanımlanmasını ve harita üzerindeki tüm seyir hesaplarının tutarlı biçimde yapılmasını sağlar. Yön, belirli bir kuzey referansına göre ölçülen açısal bir büyüklüktür ve daima saat yönünde, 0° ile 360° arasında ifade edilir. Hakiki, manyetik veya pusula ayrımı yapılmadan kullanılan bir yön değeri, teknik olarak eksik ve uygulamada yanıltıcıdır.",
    sections: [
      {
        title: "Kuzey Türleri",
        content: "Denizcilikte üç farklı kuzey referansı kullanılır: Hakiki Kuzey (True North), Manyetik Kuzey (Magnetic North) ve Pusula Kuzeyi (Compass North). Bu referanslar arasındaki farklar, seyir hesaplarında kritik öneme sahiptir.",
        image: yonNorthTypes,
        imageAlt: "Hakiki, manyetik ve pusula kuzeyi arasındaki ilişki",
        bulletPoints: [
          "True North (Hakiki Kuzey): Dünya'nın coğrafi kuzey kutbunu gösteren referans",
          "Magnetic North (Manyetik Kuzey): Pusulanın gösterdiği manyetik kuzey kutbu",
          "Grid North (Şebeke Kuzeyi): Harita projeksiyonunda kullanılan kuzey referansı",
          "Magnetic Declination (Sapma): Hakiki kuzey ile manyetik kuzey arasındaki açı farkı"
        ]
      },
      {
        title: "Pusula Gülü ve Yön Sistemi",
        content: "Yön ölçümünün geometrik temeli dairesel sistemdir. Hakiki kuzey 0° kabul edilir, doğu 90°, güney 180° ve batı 270° olarak tanımlanır. Bu sistem sayesinde doğrultular sayısal hale getirilir ve vektörel hareket hesabı mümkün olur.",
        image: yonCompassRose,
        imageAlt: "Pusula gülü ve derece sistemi",
        bulletPoints: [
          "Kuzey: 0° veya 360°",
          "Doğu: 90°",
          "Güney: 180°",
          "Batı: 270°",
          "Ara yönler: NE (45°), SE (135°), SW (225°), NW (315°)"
        ]
      },
      {
        title: "Hakiki Kerteriz (True Bearing)",
        content: "Hakiki kerteriz, gemiden bir hedefe olan doğrultunun hakiki kuzeye göre açısıdır. Harita üzerindeki her rota hattı, her kerteriz doğrultusu ve her mevki değişimi bu dairesel açı sistemi üzerinden ifade edilir.",
        image: yonTrueBearing,
        imageAlt: "Hakiki kerteriz ve yön kavramı",
        bulletPoints: [
          "True Bearing: Hedefin hakiki kuzeye göre açısı",
          "True Heading: Geminin pruvasının hakiki kuzeye göre açısı",
          "Kerterizler T harfi ile ifade edilir (örn: 065°T)"
        ]
      },
      {
        title: "Nispi Kerteriz (Relative Bearing)",
        content: "Nispi kerteriz, hedefin geminin pruvasına göre görüldüğü açıdır ve gemi ekseni referans alınarak ölçülür. Nispi kerteriz sancakta veya iskelede ölçülmesine göre saat yönünde ya da saat yönünün tersinde değerlendirilir.",
        image: yonRelativeBearing,
        imageAlt: "Nispi kerteriz kavramı",
        bulletPoints: [
          "Sancak tarafı: Saat yönünde, pozitif değer",
          "İskele tarafı: Saat yönünün tersi, negatif değer",
          "Pruva: 0° nispi kerteriz",
          "Kıç: 180° nispi kerteriz"
        ]
      },
      {
        title: "Hakiki Rota, Hakiki Kerteriz ve Nispi Kerteriz İlişkisi",
        content: "Hakiki rota, geminin harita üzerinde izlediği hattın hakiki kuzeye göre yaptığı açıdır. Bu üç kavram arasındaki ilişki, göreli bir yönün mutlak sisteme dönüştürülmesi mantığına dayanır.",
        image: yonHeadingBearing,
        imageAlt: "Rota, kerteriz ve nispi kerteriz ilişkisi",
        formula: {
          text: "Hakiki Kerteriz = Hakiki Rota + Nispi Kerteriz",
          description: "Hesaplama sonucunda elde edilen değer 360°'yi aşarsa, 360° çıkarılarak sonuç dairesel sistem içine alınır"
        }
      },
      {
        title: "Örnek Hesaplama 1 - Sancak Tarafı",
        content: "Bir geminin hakiki rotası 065°T olsun. Gemiden bir fener sancak tarafından nispi 30° kerterizle görülüyor olsun. Nispi kerteriz pozitif kabul edilir ve hakiki rotaya eklenir.",
        image: yonDiagram1,
        imageAlt: "Sancak kerteriz hesabı örneği",
        bulletPoints: [
          "Hakiki Rota: 065°T",
          "Nispi Kerteriz: +30° (sancak)",
          "Hakiki Kerteriz = 065° + 030° = 095°",
          "Sonuç: Fener hakiki kuzeye göre 095° doğrultusundadır"
        ]
      },
      {
        title: "Örnek Hesaplama 2 - İskele Tarafı",
        content: "Aynı örnekte fener iskele tarafından nispi 20° ile görülseydi, nispi kerteriz −020° olarak alınır ve hakiki rotadan çıkarma işlemi yapılır.",
        image: yonDiagram2,
        imageAlt: "İskele kerteriz hesabı örneği",
        bulletPoints: [
          "Hakiki Rota: 065°T",
          "Nispi Kerteriz: −20° (iskele)",
          "Hakiki Kerteriz = 065° − 020° = 045°",
          "Sonuç: Fener hakiki kuzeye göre 045° doğrultusundadır"
        ]
      },
      {
        title: "Rüzgâr ve Akıntı Etkisi",
        content: "Yön kavramı, rüzgâr ve akıntı hesaplarında da kullanılır. Heading (pruva doğrultusu), Course Over Ground (COG - su üstü seyir yönü) ve drift (kayma) kavramları yön sistemi üzerine kuruludur.",
        image: yonWindDrift,
        imageAlt: "Rüzgâr ve akıntının seyire etkisi",
        bulletPoints: [
          "Heading: Geminin pruva doğrultusu",
          "COG (Course Over Ground): Gerçek zemin üzerindeki hareket yönü",
          "Drift: Rüzgâr veya akıntı nedeniyle oluşan kayma",
          "Track: Geminin gerçekte izlediği rota"
        ]
      },
      {
        title: "Ölü Hesap ve Yön",
        content: "Yön kavramının düzlem seyirdeki en önemli işlevlerinden biri, mesafenin vektörel anlam kazanmasını sağlamasıdır. Geminin aldığı yol yalnızca kaç deniz mili olduğu ile değil, bu mesafenin hangi hakiki rota doğrultusunda alındığı ile anlamlıdır.",
        image: yonRadarMotion,
        imageAlt: "Radar ve hareket vektörleri",
        bulletPoints: [
          "Aynı mesafe farklı yönlerde alındığında tamamen farklı bir mevki ortaya çıkar",
          "Yön, ölü hesap mevkii belirlemenin ayrılmaz bir parçasıdır",
          "Her yön hatası, mesafe doğru hesaplansa bile mevkiyi yanlış noktaya taşır"
        ]
      }
    ],
    keyPoints: [
      "Yön, 0°–360° arasında saat yönünde ölçülür",
      "Hakiki Kuzey, Manyetik Kuzey ve Pusula Kuzeyi ayrımını her zaman belirtmek gerekir",
      "Hakiki Kerteriz = Hakiki Rota + Nispi Kerteriz",
      "Sancak tarafı pozitif (+), iskele tarafı negatif (−) değer alır",
      "Yön kavramı, seyir hesaplarının matematik dilidir"
    ]
  },
  "Rota hız ve mesafe ilişkisi": {
    title: "Rota, Hız ve Mesafe İlişkisi",
    introduction: "Seyirde geminin hareketi, rota, hız ve mesafe arasındaki matematiksel ve geometrik ilişki ile tanımlanır. Bu ilişki düzlem seyirde yapılan tüm ölü hesap mevkii işlemlerinin temelini oluşturur. Rota, geminin hakiki kuzeye göre izlediği doğrultuyu; hız, bu doğrultu boyunca birim zamanda alınan yolu; mesafe ise belirli bir süre sonunda kat edilen toplam yolu ifade eder.",
    sections: [
      {
        title: "Rota–Hız–Mesafe Üçlüsü",
        content: "Bu üç büyüklükten herhangi biri yanlış veya eksik alındığında, elde edilen mevki gerçeği yansıtmaz. Rota, yön kavramının seyirdeki uygulamasıdır ve her zaman bir açı değeri olarak ifade edilir.",
        image: "https://image.jimcdn.com/app/cms/image/transf/none/path/sd6ea49279f075268/image/i008726a3101f5495/version/1604741284/image.jpg",
        imageAlt: "Rota, hız ve mesafe ilişkisini gösteren şema"
      },
      {
        title: "Ölü Hesap Mevkiinin Temeli",
        content: "Düzlem seyirde rüzgâr ve akıntı etkileri ihmal edildiğinde, geminin hareketi sabit rota ve sabit hız varsayımıyla modellenir. Bu durumda alınan mesafe, hız ile geçen zamanın çarpımıdır.",
        image: "https://www.marinepublic.com/_next/image?q=75&url=https%3A%2F%2Fik.imagekit.io%2Fmwakqpfup%2Fdead_reckoning_explained_example-diagram_cpxrvu.jpg&w=3840",
        imageAlt: "Ölü hesap (dead reckoning) örneği"
      },
      {
        title: "Birim Uyumu ve Zaman Üçgeni",
        content: "Hız denizcilikte knot birimiyle kullanılır ve bir knot saatte bir deniz miline eşittir. Mesafe ise deniz mili cinsindendir. Bu birim uyumu, seyir hesaplarının sade ve doğrudan yapılabilmesini sağlar.",
        image: "https://www.marinerescueportjackson.com.au/images/timetriangle.png",
        imageAlt: "Zaman üçgeni (mesafe-hız-zaman)"
      },
      {
        title: "Temel Bağıntı",
        content: "Mesafe, hız ile geçen zamanın çarpımıdır. Aynı bağıntı bilinmeyen büyüklüğe göre düzenlenerek hız veya zaman hesabında da kullanılır.",
        image: "https://www.tradewindssailing.com/wordpress/wp-content/uploads/2018/07/DST-2.jpg",
        imageAlt: "Mesafe-hız-zaman diyagramı",
        formula: {
          text: "Mesafe = Hız × Zaman",
          description: "Hız = Mesafe ÷ Zaman | Zaman = Mesafe ÷ Hız"
        }
      },
      {
        title: "Rüzgâr ve Akıntı Varsayımı",
        content: "Bu hesaplar geçerli olabilmesi için hızın gerçekten sabit kalması ve dış etkilerin (akıntı, rüzgâr, dalga) ihmal edilebilir düzeyde olması gerekir. Aksi durumda rota ve hız değerleri güncellenmelidir.",
        image: "https://www.nauticed.org/blog/wp-content/uploads/2009/02/true-wind.jpg",
        imageAlt: "Rüzgârın seyire etkisi"
      },
      {
        title: "Ölü Hesap Şeması",
        content: "Başlangıç mevkii bilinen bir gemi, belirli bir hakiki rota ve hızla hareket ettiğinde, geçen zaman sonunda ulaştığı mevki bu ilişkiyle hesaplanır.",
        image: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Dead-reckoning.svg",
        imageAlt: "Ölü hesap (dead reckoning) şeması"
      },
      {
        title: "Düzgün Doğrusal Hareket Modeli",
        content: "Rota–hız–mesafe ilişkisi düzgün doğrusal harekete dayanır. Düzlem seyirde geminin hareketi sabit rota ve sabit hız varsayımıyla modellenir.",
        image: "https://teachengineering.org/content/cub_/lessons/cub_images/cub_navigation_lesson02_activity1_clipart1.jpg",
        imageAlt: "Düzgün doğrusal hareket şeması"
      },
      {
        title: "ETA ve Seyir Planlaması",
        content: "Bu üçlü bağıntı, varış zamanı (ETA) hesapları, vardiya planlaması ve yakıt tahminleri için sürekli olarak kullanılır.",
        image: "https://image.jimcdn.com/app/cms/image/transf/none/path/sd6ea49279f075268/image/i008726a3101f5495/version/1604741284/image.jpg",
        imageAlt: "Hız ve mesafe ilişkisi görseli"
      },
      {
        title: "ETA Diyagramı",
        content: "ETA hesapları, hız ve mesafe değerlerinin sahada düzenli kontrolü ile güncellenir. Bu nedenle seyir boyunca zaman, hız ve mesafe üçgeni sürekli izlenir.",
        image: "https://www.marineinsight.com/wp-content/uploads/2021/01/ETDA-USE.png",
        imageAlt: "ETA ve mesafe diyagramı"
      },
      {
        title: "Seyir Günlüğü ve Kayıt",
        content: "Ölü hesap mevkiinde alınan her mesafe, seyir günlüğüne kaydedilerek güvenli takip ve geriye dönük kontrol sağlanır.",
        image: "https://cdn.vertex42.com/ExcelTemplates/Images/running-log_scr.png",
        imageAlt: "Seyir günlüğü örneği"
      },
      {
        title: "Sayısal Örnek",
        content: "Bir geminin hakiki rotası sabit kabul edilsin ve hızı 14 knot olsun. Gemi bu hızla 3,5 saat seyir yaptığında alınan mesafe 49 deniz milidir. Aynı geminin 70 deniz millik bir mesafeyi alması için gereken süre 5 saattir.",
        image: "https://www.myseatime.com/blogadm/wp-content/uploads/2018/02/Doppler-effect-graph.jpg",
        imageAlt: "Hız ölçümünde değişkenlik örneği",
        bulletPoints: [
          "Mesafe = 14 × 3,5 = 49 deniz mili",
          "Zaman = 70 ÷ 14 = 5 saat",
          "Hız sabit kalmazsa sonuçlar güncellenmelidir"
        ]
      },
      {
        title: "Hızın Değişkenliği",
        content: "Hız, makine devri, deniz durumu ve yükleme gibi etkenlere bağlı olarak değişebilir. Bu nedenle gerçek zamanlı hız takibi, rota ve mesafe hesaplarının doğruluğu açısından kritiktir.",
        image: "https://www.researchgate.net/publication/373787121/figure/fig1/AS%3A11431281187518414%401694270676599/The-diagram-of-changes-in-speed-parameters-in-two-different-mental-motivational-states.jpg",
        imageAlt: "Hız parametrelerindeki değişim grafiği"
      },
      {
        title: "Makine Performansı Etkisi",
        content: "Makine torku ve güç eğrileri, geminin hızını doğrudan etkiler. Hızdaki küçük sapmalar, uzun seyirlerde önemli mesafe hatalarına dönüşebilir.",
        image: "https://www.epi-eng.com/images/Engine/ET-TqCrv3.gif",
        imageAlt: "Makine torku ve hız ilişkisi"
      },
      {
        title: "Vektörel Anlam",
        content: "Rota, hız ve mesafe ilişkisi yalnızca doğrusal bir hesap değildir; vektörel bir anlam taşır. Mesafe, yönsüz bir büyüklüktür ve ancak rota doğrultusunda uygulandığında geminin mevkiini değiştirir.",
        image: "https://tdgil.com/wp-content/uploads/2020/04/DR-Plot.png",
        imageAlt: "Ölü hesap (DR) çizimi"
      },
      {
        title: "Harita Üzerinde Uygulama",
        content: "Başlangıç mevkii bilinen bir geminin, belirli bir hakiki rota ve hızla belirli bir süre sonunda ulaşacağı mevki, mesafenin rota doğrultusunda harita üzerine taşınmasıyla bulunur.",
        image: "https://uscaptainstraining.com/wp-content/uploads/parallel-ruler-chart-plot-tool.png",
        imageAlt: "Paralel cetvelle rota çizimi"
      },
      {
        title: "Hata Birikimi ve Sapmalar",
        content: "Küçük hız hataları zaman uzadıkça büyük mesafe sapmalarına dönüşür. Benzer şekilde rotadaki birkaç derecelik bir hata, uzun seyirlerde geminin planlanan hattın ciddi şekilde dışına çıkmasına neden olur.",
        image: "https://threepointsofthecompass.com/wp-content/uploads/2021/11/possible_edited-1.jpg",
        imageAlt: "Rota sapmalarına dair örnek"
      }
    ],
    keyPoints: [
      "Rota, hız ve mesafe birlikte değerlendirildiğinde anlamlıdır",
      "Mesafe = Hız × Zaman bağıntısı seyir hesaplarının temelidir",
      "Rota hatası ve hız sapması, uzun seyirde büyük mevki hatası doğurur",
      "Hızın sabit kalması ve kayıtların düzenli tutulması esastır"
    ]
  },
  "Zaman – mesafe – hız bağıntısı": {
    title: "Zaman – Mesafe – Hız Bağıntısı",
    introduction: "Zaman, mesafe ve hız bağıntısı, seyirde yapılan tüm nicel değerlendirmelerin temelini oluşturur. Bu üç büyüklük arasındaki ilişki, geminin belirli bir rota boyunca ne kadar sürede ne kadar yol alacağını öngörmeyi mümkün kılar. Düzlem seyirde rüzgâr ve akıntı etkileri ihmal edildiğinde, gemi hareketi sabit hızla gerçekleşen düzgün doğrusal hareket olarak kabul edilir ve hesaplamalar bu varsayım üzerine kurulur.",
    sections: [
      {
        title: "Temel Kavram",
        content: "Bu bağıntı ölü hesap mevkiinin matematiksel çekirdeğidir. Rota doğrultusunda alınan mesafe, sabit hız ve geçen zamanla doğrusal olarak artar; hız düşürüldüğünde aynı mesafeye ulaşmak için daha fazla zaman gerekir.",
        image: "https://image.jimcdn.com/app/cms/image/transf/none/path/sd6ea49279f075268/image/i008726a3101f5495/version/1604741284/image.jpg",
        imageAlt: "Zaman–mesafe–hız ilişkisini gösteren şema"
      },
      {
        title: "Birim Sistemi ve Knot",
        content: "Denizcilikte hız knot cinsinden ifade edilir ve 1 knot, saatte 1 deniz miline eşittir. Mesafe deniz mili, zaman saat olarak kullanılır. Bu birim uyumu, dönüşüm hatalarını azaltır ve hesapların doğrudan yapılmasını sağlar.",
        image: "https://maritimesa.org/grade-10/wp-content/uploads/sites/2/2015/10/02_Voyage_calculations.png",
        imageAlt: "Seyir hesaplamaları için birim uyumu"
      },
      {
        title: "Bağıntının Formülleri",
        content: "Bağıntı üç eşdeğer formülle ifade edilir. Hız, birim zamanda alınan yol olduğundan mesafe, hız ile zamanın çarpımıdır. Bilinmeyen büyüklüğe göre formül düzenlenir.",
        image: "https://www.getlostpowerboattraining.com/wp-content/uploads/2020/03/START.png",
        imageAlt: "Zaman-mesafe-hız formülleri",
        formula: {
          text: "Mesafe = Hız × Zaman",
          description: "Hız = Mesafe ÷ Zaman | Zaman = Mesafe ÷ Hız"
        }
      },
      {
        title: "Sayısal Örnek",
        content: "Bir geminin hızı 16 knot olsun. Gemi bu hızla 2 saat 30 dakika (2,5 saat) seyir yaptığında alınan mesafe 40 deniz milidir. Aynı geminin 100 deniz millik bir mesafeyi alması için gereken süre 6,25 saat yani 6 saat 15 dakikadır.",
        image: "https://www.myseatime.com/blogadm/wp-content/uploads/2018/02/doppler-log-working.jpg",
        imageAlt: "Doppler log çalışma prensibi",
        bulletPoints: [
          "Mesafe = 16 × 2,5 = 40 deniz mili",
          "Zaman = 100 ÷ 16 = 6,25 saat",
          "6,25 saat = 6 saat 15 dakika"
        ]
      },
      {
        title: "Hız Değişiminin Zaman Üzerindeki Etkisi",
        content: "Uzun mesafeli seyirlerde hızın yalnızca 1–2 knot düşmesi, varış zamanında saatlerce gecikmeye neden olabilir. Kısa mesafelerde yapılan hız artışları ise beklenen zaman kazancını her zaman sağlamaz. Bu nedenle hız planlaması, mesafe ve zaman birlikte değerlendirilerek yapılmalıdır.",
        image: "https://www.researchgate.net/publication/256503418/figure/fig3/AS%3A297700613476363%401447988765994/Speed-time-graph-arriving-as-late-as-possible.png",
        imageAlt: "Hız-zaman grafiği"
      },
      {
        title: "Geriye Dönük Analiz",
        content: "Seyir sonrası değerlendirmelerde, belirli bir sürede kat edilen mesafeden ortalama hız hesaplanır. Bu hız, makine performansı, deniz durumu ve akıntı etkilerinin dolaylı bir göstergesi olarak yorumlanır.",
        image: "https://images.marinelink.com/images/maritime/-99700.jpg",
        imageAlt: "Seyir ve hız verilerinin değerlendirilmesi"
      },
      {
        title: "Vektörel Rota ve Harita Üzerinde Uygulama",
        content: "Hesaplanan mesafe yalnızca bir rota doğrultusunda harita üzerine taşındığında geminin mevkiini değiştirir. Sayısal hesapların doğru olması tek başına yeterli değildir; mesafenin doğru rota doğrultusunda uygulanması gerekir. Aksi hâlde elde edilen mevki matematiksel olarak tutarlı görünse bile fiziksel olarak yanlıştır.",
        image: "https://tdgil.com/wp-content/uploads/2020/04/DR-Plot.png",
        imageAlt: "Ölü hesap (DR) çizimi"
      }
    ],
    keyPoints: [
      "Mesafe, hız ve zaman arasında doğrusal bir ilişki vardır",
      "Knot, saatte bir deniz miline eşittir",
      "Mesafe = Hız × Zaman bağıntısı tüm seyir hesaplarının temelidir",
      "Hızdaki küçük değişimler ETA üzerinde büyük farklar yaratabilir",
      "Hesaplanan mesafe, doğru rota doğrultusunda harita üzerine taşınmalıdır"
    ]
  },
  "Hakiki kuzey (True)": {
    title: "Hakiki Kuzey (True North)",
    introduction: "Hakiki kuzey, Dünya'nın dönme ekseninin yeryüzünü kestiği coğrafi kuzey noktasına yönelen doğrultudur. Bu doğrultu fiziksel ve astronomik olarak tanımlıdır; zamanla değişmez ve tüm seyir hesaplarının temel referansıdır.",
    sections: [
      {
        title: "Tanım ve Temel Referans",
        content: "Denizcilikte hakiki kuzey, teorik hesapların başlangıç noktasıdır. Haritalar, meridyenler, paraleller ve göksel seyir tabloları hakiki kuzey esas alınarak hazırlanır. Bu nedenle hakiki kuzey, diğer tüm kuzey türlerinin başlangıç noktası kabul edilir.",
        image: "https://images.theconversation.com/files/292137/original/file-20190912-190065-q685ai.jpg?auto=format&fit=clip&ixlib=rb-4.1.0&q=45&w=1000",
        imageAlt: "Coğrafi kuzey kutbu ve Dünya ekseni"
      },
      {
        title: "Sabit ve Evrensel Bir Doğrultu",
        content: "Hakiki kuzey, manyetik alanlardan, gemi yapısından veya çevresel etkilerden etkilenmeyen tek ve sabit bir referans sunar. Uzun mesafeli seyirlerde ve göksel gözlemlerde bu sabitlik vazgeçilmezdir.",
        image: "https://mapscaping.com/wp-content/uploads/2024/09/image-691.png",
        imageAlt: "Gerçek kuzey ve yön doğrultuları"
      },
      {
        title: "Meridyenler ve Hakiki Kuzey Doğrultusu",
        content: "Harita üzerindeki her dikey meridyen çizgisi, hakiki kuzey–hakiki güney doğrultusunu temsil eder. Bu çizgiler, yön ölçümünün geometrik temelini oluşturur.",
        image: "https://www.geographyrealm.com/wp-content/uploads/2021/05/Magnetic-North-Pole-Positions-cavit.jpg",
        imageAlt: "Kuzey referansları ve meridyenler"
      },
      {
        title: "Hakiki Yönlerin Ölçümü",
        content: "Hakiki kuzey referans alınarak ölçülen tüm yönler hakiki olarak adlandırılır. Bir doğrultu, meridyen ile yaptığı saat yönündeki açıyla ifade edilir ve bu açı 0° ile 360° arasındadır.",
        image: "https://mathspace-production-media.mathspace.co/media/upload/images/11-bearings/true-acute-bearing.png",
        imageAlt: "Hakiki yön ölçümü"
      },
      {
        title: "Hakiki Rota ve Hakiki Kerteriz",
        content: "Hakiki rota, geminin harita üzerinde izlediği hattın hakiki kuzeye göre yaptığı açıdır. Hakiki kerteriz ise gemiden bir hedefe olan doğrultunun hakiki kuzeye göre ölçülen açısıdır.",
        image: "https://blog.mytimezero.com/wp-content/uploads/2017/12/art-blog-course-heading-fr.png",
        imageAlt: "Hakiki rota ve kerteriz ilişkisi"
      },
      {
        title: "Hakiki Kerteriz Hesap Bağıntısı",
        content: "Hakiki kerteriz, nispi gözlemin hakiki sisteme taşınmasıyla elde edilir. Nispi kerteriz sancak yönünde ölçülmüşse pozitif, iskele yönünde ölçülmüşse negatif kabul edilir. Sonuç 360°’yi aşarsa 360° çıkarılır, 0°’nin altına düşerse 360° eklenir.",
        image: "https://tdgil.com/wp-content/uploads/2020/09/Compass-Rose.png",
        imageAlt: "Pusula gülü ve yön sistemi",
        formula: {
          text: "Hakiki Kerteriz = Hakiki Rota + Nispi Kerteriz",
          description: "Nispi kerteriz, gemi eksenine göre ölçülen açının hakiki kuzeye taşınmasını sağlar."
        }
      },
      {
        title: "Sayısal Örnek",
        content: "Bir geminin hakiki rotası 120°T olsun. Hedef sancakta nispi 35° ile görülüyor olsun. Nispi kerteriz pozitif kabul edilir ve hakiki rotaya eklenir. Aynı durumda hedef iskele tarafından nispi 25° ile görülseydi, nispi kerteriz negatif alınırdı.",
        image: "https://sailingissues.com/drie/magnetic-course-true-course.png",
        imageAlt: "Hakiki rota ve kerteriz örneği",
        bulletPoints: [
          "Hakiki Kerteriz = 120° + 035° = 155°",
          "Hedef hakiki kuzeye göre 155° doğrultusundadır",
          "İskele örneği: Hakiki Kerteriz = 120° − 025° = 095°"
        ]
      },
      {
        title: "Ölü Hesap ve Hakiki Kuzey",
        content: "Ölü hesap mevkiinde başlangıç noktası bilinir; hakiki rota ve hız sabit kabul edilerek geçen zaman sonunda alınan mesafe hesaplanır. Bu mesafe, hakiki rota doğrultusunda harita üzerinde taşınarak yeni mevki bulunur.",
        image: "https://tdgil.com/wp-content/uploads/2020/04/DR-Plot.png",
        imageAlt: "Ölü hesap mevkiinde hakiki rota kullanımı"
      }
    ],
    keyPoints: [
      "Hakiki kuzey, coğrafi kuzeye yönelen tek ve sabit referanstır",
      "Meridyenler hakiki kuzey–güney doğrultusunu temsil eder",
      "Hakiki kerteriz ve hakiki rota, tüm seyir hesaplarının temelidir",
      "Hakiki Kerteriz = Hakiki Rota + Nispi Kerteriz bağıntısı kullanılır",
      "Ölü hesap ve göksel seyirde doğrultu daima hakiki kuzeye bağlıdır"
    ]
  },
  "Manyetik kuzey": {
    title: "Manyetik Kuzey (Magnetic North)",
    introduction: "Manyetik kuzey, Dünya'nın manyetik alan çizgilerinin yeryüzüne giriş yaptığı noktaya yönelen doğrultudur. Bu doğrultu, Dünya'nın dönme ekseniyle tanımlanan hakiki kuzeyden farklıdır ve zamanla yer değiştirir. Denizcilikte manyetik kuzeyin önemi, manyetik pusulanın bu doğrultuyu esas almasıdır.",
    sections: [
      {
        title: "Tanım ve Temel Referans",
        content: "Manyetik pusula, elektriksel veya elektronik sistemlere ihtiyaç duymadan yön tayini sağlar. Bu pratiklik, değişken bir referansla çalışıldığı gerçeğini ortadan kaldırmaz; manyetik kuzey daima değişen bir doğrultudur.",
        image: "https://images.theconversation.com/files/292137/original/file-20190912-190065-q685ai.jpg?auto=format&fit=clip&ixlib=rb-4.1.0&q=45&w=1000",
        imageAlt: "Manyetik kuzey kutbu ve Dünya ekseni"
      },
      {
        title: "Dünya Manyetik Alanı ve Kutup Hareketi",
        content: "Dünya manyetik alanı dinamik bir yapıya sahiptir. Yer kabuğu altındaki erimiş metallerin hareketi nedeniyle manyetik kutuplar her yıl küçük miktarlarda yer değiştirir. Bu değişim, deniz haritalarında variation ve yıllık değişim değeri olarak belirtilir.",
        image: "https://www.researchgate.net/publication/279446083/figure/fig1/AS%3A294387369168900%401447198826980/The-Earths-magnetic-field-the-geomagnetic-field-Notice-that-the-southern-and-northern.png",
        imageAlt: "Dünya manyetik alanı ve manyetik kutuplar"
      },
      {
        title: "Variation Haritaları",
        content: "Seyir hesaplarında kullanılan manyetik yönlerin doğruluğu, variation bilgisinin doğru okunmasına ve güncel yıla uyarlanmasına doğrudan bağlıdır. Haritalar üzerinde yer alan izogon çizgileri, variation değerlerinin bölgesel dağılımını gösterir.",
        image: "https://d9-wret.s3.us-west-2.amazonaws.com/assets/palladium/production/s3fs-public/styles/full_width/public/thumbnails/image/Pattern%20of%20Magetic%20Declination.jpg?itok=DeuBC1o5",
        imageAlt: "Manyetik variation haritası"
      },
      {
        title: "Variation Yönü: Doğu ve Batı",
        content: "Hakiki kuzey ile manyetik kuzey arasındaki açısal fark variation olarak adlandırılır. Manyetik kuzey hakiki kuzeyin doğusunda yer alıyorsa variation doğu, batısında yer alıyorsa variation batıdır. Bu yönlendirme, hesaplamalarda işaretin doğru seçilmesi açısından belirleyicidir.",
        image: "https://i.sstatic.net/W91Fr.png",
        imageAlt: "Variation doğu/batı yönleri",
        bulletPoints: [
          "Variation doğu ise pozitif kabul edilir",
          "Variation batı ise negatif kabul edilir",
          "Her mevki için variation değeri farklıdır"
        ]
      },
      {
        title: "Manyetik Sistem ve Yönler",
        content: "Manyetik sistemde ölçülen tüm yönler manyetik olarak adlandırılır ve M harfi ile gösterilir. Manyetik rota, geminin manyetik kuzeye göre izlediği doğrultudur. Manyetik kerteriz ise bir hedefin manyetik kuzeye göre ölçülen doğrultusudur.",
        image: "https://gisgeography.com/wp-content/uploads/2015/06/Magnetic-North-300x297.png",
        imageAlt: "Manyetik kuzey ve yön farkı",
        bulletPoints: [
          "Manyetik rota: 110°M gibi ifade edilir",
          "Manyetik kerteriz: Hedefin manyetik kuzeye göre açısıdır",
          "Manyetik pusula değerleri doğrudan manyetiktir"
        ]
      },
      {
        title: "Hakiki–Manyetik Dönüşüm",
        content: "Hakiki ve manyetik sistemler arasındaki ilişki doğrusal bir açı dönüşümüne dayanır. Dönüşüm, bilinen variation kadar açı ekleme veya çıkarma işlemidir.",
        image: "https://sailingissues.com/drie/convert-east-west-magnetic-variation-true-courses.png",
        imageAlt: "Manyetik ve hakiki rota dönüşümü",
        formula: {
          text: "Hakiki Rota = Manyetik Rota + Variation",
          description: "Variation doğu ise pozitif, batı ise negatif kabul edilir."
        }
      },
      {
        title: "Sayısal Örnek",
        content: "Variation 7° doğu ise ve geminin manyetik rotası 110°M olarak belirlenmişse, hakiki rota hesaplamasında variation manyetik rotaya eklenir. Variation 5° batı olsaydı çıkarma işlemi yapılırdı.",
        image: "https://sailingissues.com/drie/magnetic-course-true-course.png",
        imageAlt: "Manyetik rotadan hakiki rotaya örnek",
        bulletPoints: [
          "Hakiki Rota = 110° + 007° = 117°",
          "Variation batı olursa: Hakiki Rota = 110° − 005° = 105°"
        ]
      },
      {
        title: "Manyetik Kerteriz Bağıntısı",
        content: "Manyetik kuzey, kerteriz hesaplarında da aynı mantıkla kullanılır. Nispi kerteriz gemi eksenine göre ölçülür, manyetik kerteriz ise manyetik kuzeye göre tanımlanır.",
        image: "https://www.researchgate.net/publication/341492181/figure/fig1/AS%3A892957544681472%401589909077213/Magnetic-bearings-and-relative-bearings-4.jpg",
        imageAlt: "Manyetik kerteriz ve nispi kerteriz ilişkisi",
        formula: {
          text: "Manyetik Kerteriz = Manyetik Rota + Nispi Kerteriz",
          description: "Sonuç 360°'yi aşarsa 360° çıkarılır, 0°'nin altına düşerse 360° eklenir."
        }
      },
      {
        title: "Seyirde Risk ve İhmal",
        content: "Manyetik kuzeyle yapılan seyirdeki temel risk, variation bilgisinin ihmal edilmesidir. Küçük görünen birkaç derecelik bir hata, uzun mesafelerde ciddi mevki sapmalarına dönüşür. Bu nedenle manyetik pusuladan elde edilen her yön bilgisi variation düzeltilmeden harita üzerinde kullanılmamalıdır.",
        image: "https://cockpitcards.co.uk/wp-content/uploads/2020/07/Deviation-and-Variation-sums.jpg",
        imageAlt: "Variation ve deviation etkileri"
      }
    ],
    keyPoints: [
      "Manyetik kuzey, pusulanın esas aldığı değişken bir referanstır",
      "Variation, hakiki kuzey ile manyetik kuzey arasındaki açıdır",
      "Variation doğu pozitif, batı negatif kabul edilir",
      "Hakiki Rota = Manyetik Rota + Variation bağıntısı kullanılır",
      "Variation düzeltmesi yapılmadan harita üzerinde yön kullanılmamalıdır"
    ]
  }
};
