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

// Import images - Harita Sembolleri
import sembolIalaBuoyage from "@/assets/navigation/sembol-iala-buoyage.jpg";
import sembolCardinalMarks from "@/assets/navigation/sembol-cardinal-marks.png";
import sembolIsolatedDanger from "@/assets/navigation/sembol-isolated-danger.jpg";
import sembolLightCharacteristics from "@/assets/navigation/sembol-light-characteristics.jpg";
import sembolSectorLights from "@/assets/navigation/sembol-sector-lights.jpg";
import sembolRacon from "@/assets/navigation/sembol-racon.jpg";
import sembolDangers from "@/assets/navigation/sembol-dangers.jpg";

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
  "Departure (Doğu–batı mesafesi)": {
    title: "Departure (Doğu–Batı Mesafesi)",
    introduction:
      "Departure, düzlem seyirde geminin başlangıç mevkii ile varış mevkii arasında doğu–batı doğrultusunda kat ettiği mesafeyi ifade eder. Enlem değişimi olan DLat kuzey–güney bileşenini temsil ederken, departure aynı hareketin doğu–batı bileşenidir. Düzlem seyir varsayımında bu iki bileşen, geminin seyir mesafesini oluşturan dik üçgenin dik kenarları olarak ele alınır. Bu nedenle departure, DLat olmadan; DLat de departure olmadan tek başına anlamlı değildir.",
    sections: [
      {
        title: "Departure (Doğu–Batı Mesafesi) Genel Tanım",
        content: `Departure değeri daima **deniz mili** cinsindendir ve işareti, geminin doğuya mı yoksa batıya mı hareket ettiğini gösterir. Bu yön bilgisi, kurs hesaplarında ve boylam değişimi ilişkilerinde doğrudan kullanılır.

![Departure düzlem seyir örneği](https://marinegyaan.com/wp-content/uploads/2016/09/plane-sailing.jpg)

![Doğu–batı mesafe ilişkisi](https://astrolabesailing.com/wp-content/uploads/2014/10/distances.jpg)

![Düzlem seyir dik üçgeni](https://maritimesa.org/nautical-science-grade-11/wp-content/uploads/sites/6/2020/10/11.1.1.2_fig_1.jpg)`
      },
      {
        title: "Departure’ın Tanımı ve Yön İşareti",
        content: `Departure, başlangıç ve varış mevkileri arasındaki doğu–batı doğrultulu yatay mesafedir. İşaret mantığı şu şekildedir:

![Departure bileşenleri](https://cdn11.bigcommerce.com/s-nq6l4syi/images/stencil/1280x1280/products/70167/1997660/71367-1024__58100.1720803215.jpg?c=2)

![Lat & Dep bileşenleri](https://jerrymahun.com/images/open_access/trav_comps/lats_deps/img17.gif)`,
        bulletPoints: [
          "Doğuya doğru seyirde departure **doğu** yönlü kabul edilir ve pozitif alınır.",
          "Batıya doğru seyirde departure **batı** yönlü kabul edilir ve negatif alınır.",
          "Yanlış işaret, sayısal olarak doğru görünen ama geometrik olarak hatalı sonuçlar üretir."
        ]
      },
      {
        title: "Mesafe ve Kurs Kullanılarak Departure Hesabı",
        content: `Düzlem seyirde departure, mesafe ve hakiki rota kullanılarak trigonometrik olarak hesaplanır. Seyir, bir dik üçgen olarak kabul edilir. Hipotenüs, seyredilen mesafeyi; yatay kenar departure’ı; düşey kenar ise DLat’i temsil eder.

![Düzlem seyir dik üçgeni](https://maritimesa.org/nautical-science-grade-11/wp-content/uploads/sites/6/2020/10/11.1.1.2_fig_1.jpg)

![Kurs ve mesafe ile departure](https://static.wixstatic.com/media/bd1ea3_6a85245c73c7421bbc6c9c8ab9e3f995~mv2.jpg/v1/fill/w_568%2Ch_326%2Cal_c%2Cq_80%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/bd1ea3_6a85245c73c7421bbc6c9c8ab9e3f995~mv2.jpg)`,
        formula: {
          text: "Departure = Mesafe × sin Kurs",
          description: "Kurs hakiki rota olarak alınır; sonuç deniz mili cinsindendir."
        }
      },
      {
        title: "Sayısal Örnek: Mesafe ve Kurs ile Departure",
        content: `Seyredilen mesafe 40 deniz mili, hakiki rota 060° olsun.

sin 060° ≈ 0.866

Departure = 40 × 0.866

Departure ≈ **34.6 deniz mili doğu**

Bu sonuç, geminin 40 deniz millik seyir boyunca yaklaşık 34.6 deniz mili doğuya doğru ilerlediğini gösterir. Aynı seyirde kalan bileşen DLat olarak kuzey–güney doğrultusundadır.

![Plane sailing örneği](https://marinegyaan.com/wp-content/uploads/2016/09/plane-sailing.jpg)

![Sayısal örnek görseli](https://media.licdn.com/dms/image/v2/D4D12AQHE63U8jqsU4w/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1716369843487?e=2147483647&t=xaUQOBcwqVw1xTQW1oriqj9osyaAI52xveUaRFfCAns&v=beta)`
      },
      {
        title: "DLat ile Departure Arasındaki Geometrik İlişki",
        content: `Düzlem seyirde DLat ve departure, birbirine dik iki bileşendir. Bu iki değer birlikte kullanılarak kurs veya mesafe hesaplanabilir.

![Plane sailing dik üçgeni](https://marinegyaan.com/wp-content/uploads/2016/09/plane-sailing.jpg)

![DLat–Departure ilişkisi](https://maritimesa.org/nautical-science-grade-11/wp-content/uploads/sites/6/2020/10/11.1.1.2_fig_2.jpg)`,
        formula: {
          text: "tan Kurs = Departure ÷ DLat",
          description: "DLat ve departure bilindiğinde hakiki rota (kurs) bulunur."
        }
      },
      {
        title: "Departure’ın Harita Üzerindeki Anlamı",
        content: `Departure, harita üzerinde doğrudan ölçülen bir değer değildir; **hesaplanan** bir büyüklüktür. Harita üzerinde enlem çizgileri DLat’i temsil ederken, departure boylam doğrultusundaki yatay hareketi temsil eder. Ancak boylam aralıkları enleme bağlı olarak değiştiği için, departure doğrudan boylam skalasından okunmaz; önce hesaplanır, ardından boylam değişimi hesaplarında kullanılır.

![Harita üzerinde mevki ve hatlar](https://sailingissues.com/vier/position-fix-nautical-chart-navigation-3x.png)

![Boylam skalası örneği](https://i.sstatic.net/ih3fe.jpg)`
      },
      {
        title: "Departure’ın Düzlem Seyirde Kullanım Alanı",
        content: `Departure, özellikle şu hesaplamalarda temel bileşendir:

![Düzlem seyir örneği](https://maritimesa.org/nautical-science-grade-11/wp-content/uploads/sites/6/2020/10/11.1.1.2_fig_1.jpg)

![Kurs ve mesafe ilişkisi](https://cdn.britannica.com/41/2941-004-E9AB5656/triangle-course-aicraft-vector-compass-heading-aircraft.jpg)`,
        bulletPoints: [
          "Kurs ve mesafe çözümü",
          "Enlem ve boylam değişimi ilişkileri",
          "Ölü hesap mevkii ilerletme",
          "Running fix ve klasik mevki hesapları"
        ]
      }
    ],
    keyPoints: [
      "Departure, düzlem seyirde doğu–batı doğrultusundaki yatay mesafedir.",
      "Departure değeri daima deniz mili cinsindedir ve doğu/batı yönüne göre işaretlenir.",
      "Departure = Mesafe × sin Kurs bağıntısı düzlem seyirde temel hesaplamadır.",
      "DLat ve departure birlikte kurs/mesafe çözümlemelerini oluşturur.",
      "Departure haritada doğrudan okunmaz; boylam değişimi hesaplarında kullanılır."
    ]
  },
  "Düzlem seyirin sınırları": {
    title: "Düzlem Seyirin Sınırları",
    introduction:
      "Düzlem seyir, dünyanın şeklinin kısa mesafelerde düz kabul edilebileceği varsayımına dayanır. Bu yaklaşım meridyenleri paralel, boylam dakikalarını sabit kabul eder ve seyir üçgenini düzlemsel geometriyle çözer. Küçük mesafelerde yeterli doğruluk sağlayan bu yöntem, mesafe büyüdükçe ve enlem farkı arttıkça hatalar üretir.",
    sections: [
      {
        title: "Düzlem Seyirin Sınırlarını Belirleyen Temel Etken",
        content: `Düzlem seyirin sınırlarını belirleyen temel etken, **meridyenlerin kutuplara doğru yakınlaşmasıdır**. Gerçekte boylam dakikasının uzunluğu ekvatordan kutuplara gidildikçe azalır. Düzlem seyirde bu azalma göz ardı edilir. Bu ihmal, özellikle doğu–batı bileşeni büyüdüğünde, hesaplanan departure ile gerçek yatay mesafe arasında fark doğurur.

![Plane sailing diyagramı](https://marinegyaan.com/wp-content/uploads/2016/09/plane-sailing.jpg)

![Düzlem seyir şeması](https://astronavigationdemystified.com/wp-content/uploads/2016/09/diag15-mod.jpg)

![Seyir üçgeni görselleştirmesi](https://i0.wp.com/mathscinotes.com/wp-content/uploads/2017/12/GoodIllustration.png?ssl=1)`
      },
      {
        title: "Boylam Dakikasının Fiziksel Gerçeği",
        content: `Enlem dakikası her yerde yaklaşık olarak 1 deniz milidir. Buna karşılık boylam dakikasının uzunluğu sabit değildir ve bulunduğu enleme bağlıdır. Boylam dakikasının gerçek uzunluğu, ilgili enlemin kosinüsü ile orantılıdır. Düzlem seyir, bu gerçeği yok sayar ve her boylam dakikasını ekvatordaki uzunlukta kabul eder. Bu nedenle doğu–batı yönlü mesafe arttıkça hata büyür.

Bu fiziksel gerçek, düzlem seyirin **neden sınırlı bir yöntem** olduğunu açıklar ve orta enlem seyri yaklaşımının ortaya çıkış gerekçesini oluşturur.

![Enlem-boylam ilişkisi](https://www.thoughtco.com/thmb/rm9dvAnkcx11DANofgETkHViXt8%3D/1500x0/filters%3Ano_upscale%28%29%3Amax_bytes%28150000%29%3Astrip_icc%28%29/Latitude-and-Longitude-58b9d1f35f9b58af5ca889f1.jpg)

![Meridyen yakınsaması](https://webapps-cdn.esri.com/CDN/support-site/technical-articles-images/000020700/00N39000003LL2C-0EMf2000000Fx1g.png)`
      },
      {
        title: "Hatanın Mesafeyle Artışı",
        content: `Düzlem seyirde oluşan hata, seyredilen mesafe ile doğrusal değildir; doğu–batı bileşeni arttıkça hızlanarak büyür. Kısa mesafelerde ihmal edilebilir olan fark, orta mesafelerde birkaç deniz miline ulaşabilir. Bu durum, özellikle kıyı seyri ve dar sularda kabul edilemez sonuçlar doğurur.

Bu nedenle düzlem seyir, genellikle **yaklaşık 60 deniz miline kadar** olan seyirlerde tercih edilir. Mesafe büyüdüğünde, boylam değişiminin enleme bağlı olarak düzeltilmesi gerekir. Bu noktada orta enlem seyri devreye girer.

![Düzlem seyir örneği](https://marinegyaan.com/wp-content/uploads/2016/09/plane-sailing.jpg)

![Hata artışı grafiği](https://static.cambridge.org/binary/version/id/urn%3Acambridge.org%3Aid%3Abinary%3A20250412114813471-0756%3AS0373463324000183%3AS0373463324000183_fig12.png?pub-status=live)`
      },
      {
        title: "Düzlem Seyir ile Orta Enlem Seyri Arasındaki Geçiş Mantığı",
        content: `Orta enlem seyri, düzlem seyirin geometrisini tamamen terk etmez; yalnızca boylam bileşenini **ortalama enlem** üzerinden düzeltir. Böylece kısa ve orta mesafelerde, karmaşık projeksiyonlara ihtiyaç duymadan daha doğru sonuç elde edilir.

Bu yaklaşım, düzlem seyirin pratikliğini korurken, onun en büyük zayıflığını hedef alır. Düzlem seyirden orta enlem seyrine geçiş, yöntem değişimi değil, **varsayımın rafine edilmesidir**.

![Orta enlem üçgeni](https://deckskills.tripod.com/sitebuildercontent/sitebuilderpictures/mid_lat_triangle.jpg)

![Ortalama enlem diyagramı](https://astronavigationdemystified.com/wp-content/uploads/2016/09/diag15-mod.jpg)`
      },
      {
        title: "Düzlem Seyirin Kullanılabileceği ve Kullanılmaması Gereken Durumlar",
        content: `Düzlem seyir, kısa rota bacaklarında, enlem değişiminin sınırlı olduğu durumlarda ve yaklaşık hesapların yeterli olduğu seyirlerde kullanılabilir. Uzun doğu–batı bacakları, yüksek enlemler ve hassas mevki tayini gerektiren durumlar ise bu yöntemin sınırlarının dışındadır.

Bu sınırlar bilinmeden yapılan her düzlem seyir hesabı, doğru formüller kullanılsa bile **yanlış sonuç** üretir. Orta enlem seyri, bu sınırların farkında olarak geliştirilen bir ara yöntemdir.

![Düzlem seyir görseli](https://marinegyaan.com/wp-content/uploads/2016/09/plane-sailing.jpg)

![Mevki tayini örneği](https://sailingissues.com/vier/position-fix-nautical-chart-navigation-3x.png)`
      }
    ],
    keyPoints: [
      "Düzlem seyir, kısa mesafelerde ve küçük enlem farklarında yeterli doğruluk verir.",
      "Boylam dakikasının uzunluğu enleme bağlıdır; düzlem seyir bunu sabit varsayar.",
      "Doğu–batı bileşeni büyüdükçe düzlem seyir hatası hızlanarak artar.",
      "Yaklaşık 60 deniz milinden sonra orta enlem düzeltmesi gerekir.",
      "Orta enlem seyri, düzlem seyirin varsayımını rafine eden ara bir yöntemdir."
    ]
  },
  "Departure – boylam ilişkisi": {
    title: "Departure – Boylam İlişkisi",
    introduction:
      "Departure ile boylam değişimi arasındaki ilişki, orta enlem seyri yaklaşımının merkezinde yer alır. Bu ilişki, doğu–batı doğrultusunda kat edilen gerçek mesafenin, harita üzerindeki boylam farkına nasıl dönüştürüleceğini tanımlar. Düzlem seyirde boylam dakikasının uzunluğu sabit kabul edilirken, orta enlem seyrinde bu kabul terk edilir ve boylam dakikasının enleme bağlı olarak değiştiği gerçeği hesaba katılır.",
    sections: [
      {
        title: "Departure’ın Tanımı ve Boylam Değişimi",
        content: `Departure, geminin doğu–batı doğrultusunda kat ettiği **gerçek mesafedir** ve deniz mili cinsindendir. Boylam değişimi ise derece ve dakika cinsinden ifade edilir. Bu iki büyüklük doğrudan eşit değildir; aralarındaki dönüşüm, ilgili enlemin kosinüsü ile kurulur.

![Departure – boylam ilişkisi diyagramı](https://astronavigationdemystified.com/wp-content/uploads/2012/06/diag-16-mod.jpg?w=584)

![Departure – boylam ilişkisi diyagramı](https://astronavigationdemystified.com/wp-content/uploads/2016/09/diag15-mod.jpg)

![Departure – boylam ilişkisi diyagramı](https://astronavigationdemystified.com/wp-content/uploads/2017/08/new-diag-14-blue.jpg)`
      },
      {
        title: "Boylam Dakikasının Geometrik Temeli",
        content: `Dünya küresel bir şekle sahiptir ve meridyenler kutuplara doğru birbirine yaklaşır. Bu nedenle ekvatorda bir boylam dakikası yaklaşık 1 deniz mili uzunluğundayken, daha yüksek enlemlerde bu uzunluk azalır. Bu azalma, ilgili enlemin kosinüsüyle ifade edilir.

![Boylam dakikası geometrisi](https://astronavigationdemystified.com/wp-content/uploads/2015/10/drawing21.jpg)

![Meridyen yakınsaması](https://www.degruyterbrill.com/document/doi/10.1515/jag-2018-0021/asset/graphic/j_jag-2018-0021_fig_002.jpg)`,
        formula: {
          text: "1′ boylam = cos Enlem deniz mili",
          description: "Boylam dakikasının uzunluğu enleme bağlıdır; enlem arttıkça cos değerinin azalması nedeniyle boylam dakikası kısalır."
        }
      },
      {
        title: "Orta Enlem Üzerinden Kurulan Bağıntı",
        content: `Orta enlem seyrinde, seyir boyunca değişen enlem değeri tek bir temsilî değerle ifade edilir. Bu değer, başlangıç ve varış enlemlerinin aritmetik ortalamasıdır. Boylam değişimi hesaplanırken, boylam dakikasının uzunluğu bu **ortalama enleme** göre değerlendirilir.

![Orta enlem diyagramı](https://astronavigationdemystified.com/wp-content/uploads/2016/09/diag15-mod.jpg)

![Orta enlem üçgeni](https://thenauticalsite.in/NauticalNotes/TerresNav/MyTerrNav-Lesson06-Sailings_files/image034.jpg)`,
        formula: {
          text: "Departure = DLong × cos Ortalama Enlem",
          description: "Departure deniz mili, DLong dakika cinsindedir. Ortalama enlem, başlangıç ve varış enlemlerinin aritmetik ortalamasıdır."
        }
      },
      {
        title: "Boylam Değişiminin Departure’dan Hesaplanması",
        content: `Bazı seyir problemlerinde departure bilinir, boylam değişimi istenir. Bu durumda bağıntı ters çevrilir ve boylam farkı hesaplanır.

![Departure’dan boylam hesabı](https://astronavigationdemystified.com/wp-content/uploads/2016/09/diag15-mod.jpg)

![Boylam değişimi görseli](https://maritimesa.org/nautical-science-grade-10/wp-content/uploads/sites/5/2020/11/10.2.1_fig_4.jpg)`,
        formula: {
          text: "DLong = Departure ÷ cos Ortalama Enlem",
          description: "Departure deniz mili cinsindedir; sonuç dakika cinsinden boylam değişimidir (Doğu/Batı işareti ayrıca verilir)."
        }
      },
      {
        title: "Sayısal Uygulama: Departure’dan Boylam Değişimi",
        content: `Başlangıç enlemi 35° 20.0′ N, varış enlemi 36° 00.0′ N olsun. Seyir boyunca hesaplanan departure 48 deniz mili doğu yönlüdür.

Önce ortalama enlem bulunur:

Ortalama Enlem = (35° 20.0′ + 36° 00.0′) ÷ 2  
Ortalama Enlem = 35° 40.0′ N

cos 35° 40′ ≈ 0.812

Boylam değişimi hesaplanır:

DLong = 48 ÷ 0.812  
DLong ≈ 59.1′ Doğu

Bu sonuç, geminin başlangıç boylamından yaklaşık 59.1 dakika doğuya kaydığını ifade eder. Dakika cinsinden bulunan bu değer, gerektiğinde derece–dakika formatına çevrilerek varış boylamı hesaplarında kullanılır.

![Sayısal uygulama görseli](https://imgv2-1-f.scribdassets.com/img/document/771493460/original/10f03d0b96/1?v=1)

![Boylam görselleştirmesi](https://sailingissues.com/vier/longitude-latitude-explained-3x.png)`
      },
      {
        title: "İşaret Disiplini ve Yön Mantığı",
        content: `Departure ile boylam değişimi arasındaki hesaplamalarda işaret disiplini belirleyicidir. Doğu yönlü hareketlerde departure ve DLong doğu kabul edilir, batı yönlü hareketlerde batı kabul edilir. Matematiksel işlem mutlak değerlerle yapılır; yön bilgisi, hesaplamadan sonra uygulanır.

Bu disiplin bozulduğunda, sayısal olarak doğru görünen ancak coğrafi olarak yanlış sonuçlar elde edilir. Departure–boylam ilişkisi, bu nedenle yalnızca bir formül değil, **yön bilinciyle birlikte uygulanan bir seyir kuralıdır**.

![Boylam yön görselleştirmesi](https://sailingissues.com/vier/longitude-latitude-explained-3x.png)

![Yön ve işaret mantığı](https://www.clubmarine.com.au/explore-boating/articles/boating-navigational-markers/_jcr_content/root/parsys/wrapper_copy/wrapper/wrapper/wrapper/image.img.82.3360.png/1699935040950/navigation-map.png)`
      }
    ],
    keyPoints: [
      "Departure, doğu–batı doğrultusunda kat edilen gerçek mesafedir ve deniz mili cinsindendir.",
      "Boylam dakikasının uzunluğu enleme bağlıdır: 1′ boylam = cos enlem deniz mili.",
      "Orta enlem seyrinde boylam değişimi, ortalama enleme göre hesaplanır.",
      "Departure = DLong × cos Ortalama Enlem bağıntısı temel ilişkidir.",
      "Doğu–batı işaret disiplini, hesaplamanın doğru yorumlanması için zorunludur."
    ]
  },
  "İşaret Değişimi (Sign Change)": {
    title: "İşaret Değişimi (Sign Change)",
    introduction:
      "Seyir hesaplarında işaret, matematiksel bir işlem değil; yön bilgisidir. Enlem, boylam, DLat, DLong ve departure değerleri sayısal olarak hesaplanırken mutlak değerler kullanılır; **kuzey–güney ve doğu–batı yönü ise işaretle belirtilir**. İşaret değişimi kuralı doğru uygulanmazsa, tüm sonuçlar doğru görünse bile coğrafi olarak yanlış yönde kalır.",
    sections: [
      {
        title: "Enlem İşaret Kuralı",
        content:
          "Enlem için temel kural basittir: **kuzey (+), güney (−)**. DLat hesaplanırken her zaman mutlak fark alınır, ardından yön verilir. Seyir kuzeye ise DLat kuzey (+), güneye ise DLat güney (−) kabul edilir. Enlem işareti, yalnızca bulunduğunuz veya varacağınız yarımküreyi değil, hareket yönünü de ifade eder."
      },
      {
        title: "Boylam İşaret Kuralı",
        content:
          "Boylam için temel kural: **doğu (+), batı (−)**. DLong hesabında önce boylam farkı bulunur, sonra yön atanır. Doğuya gidiliyorsa DLong doğu (+), batıya gidiliyorsa batı (−) kabul edilir. Greenwich meridyeni işaretin referansıdır; doğusu (+), batısı (−) olarak değerlendirilir."
      },
      {
        title: "Aynı ve Farklı Yarımküre Mantığı",
        content:
          "Başlangıç ve varış aynı yarımküredeyse fark alınır; farklı yarımkürelerdeyse mutlak değerler toplanır ve sonuç **varış yönüne** göre işaretlenir. Örnek: 12°N’den 5°S’ye gidiliyorsa DLat = 12° + 5° = 17° **Güney**. Aynı kural boylam için de geçerlidir: 20°E’den 10°W’ye geçişte DLong = 20° + 10° = 30° **Batı**."
      },
      {
        title: "Kurs–Mesafe İşaret Disiplini",
        content:
          "Kurs–mesafe hesaplarında trigonometrik işlemler mutlak değerlerle yapılır. DLat ve departure hesaplandıktan sonra **işaretler çeyrekleştirme mantığına göre atanır**. DLat kuzey ise kursun kuzey bileşeni vardır; DLat güney ise güney bileşeni vardır. Departure doğu ise doğu bileşeni, batı ise batı bileşeni oluşur. Bu disiplin, kursun doğru çeyrekte (NE, SE, SW, NW) yer almasını sağlar."
      },
      {
        title: "Sayısal Örnek",
        content:
          "Başlangıç: 08° 20′ N, 023° 10′ E\nVarış: 05° 40′ S, 020° 30′ W\n\nDLat = 8°20′ + 5°40′ = 14°00′ **Güney**\nDLong = 23°10′ + 20°30′ = 43°40′ **Batı**\n\nBu örnekte sayıların büyüklüğü doğru olsa bile işaretler yanlış yazılırsa hareketin yönü tamamen ters anlaşılır. Bu nedenle işaret, sayının ayrılmaz parçasıdır."
      }
    ],
    keyPoints: [
      "İşaret, işlem değil yön bilgisidir.",
      "Kuzey (+), güney (−); doğu (+), batı (−) kuralı tüm hesapların temelidir.",
      "Farklı yarımkürelerde mutlak değerler toplanır ve yön varışa göre verilir.",
      "Kurs–mesafe problemlerinde işaretler çeyrek belirler."
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
    introduction: "Seyirde geminin hareketi, rota, hız ve mesafe arasındaki matematiksel ve geometrik ilişki ile tanımlanır. Bu ilişki düzlem seyirde yapılan tüm ölü hesap mevkii işlemlerinin temelini oluşturur. Rota, geminin hakiki kuzeye göre izlediği doğrultuyu; hız, bu doğrultu boyunca birim zamanda alınan yolu; mesafe ise belirli bir süre sonunda kat edilen toplam yolu ifade eder. Bu üç büyüklükten herhangi biri yanlış veya eksik alındığında, elde edilen mevki gerçeği yansıtmaz.",
    sections: [
      {
        title: "Rota–Hız–Mesafe Üçlüsü",
        content: "Rota, yön kavramının seyirdeki uygulamasıdır ve her zaman bir açı değeri olarak ifade edilir. Hız denizcilikte knot birimiyle kullanılır ve bir knot saatte bir deniz miline eşittir. Mesafe ise deniz mili cinsindendir. Bu birim uyumu, seyir hesaplarının sade ve doğrudan yapılabilmesini sağlar. Rota olmadan mesafe yönsüz, hız olmadan rota anlamsız, mesafe olmadan hız işlevsizdir; bu nedenle üçü birlikte değerlendirilir.",
        image: "https://image.jimcdn.com/app/cms/image/transf/none/path/sd6ea49279f075268/image/i008726a3101f5495/version/1604741284/image.jpg",
        imageAlt: "Rota, hız ve mesafe ilişkisini gösteren şema"
      },
      {
        title: "Ölü Hesap Mevkiinin Temeli",
        content: "Düzlem seyirde rüzgâr ve akıntı etkileri ihmal edildiğinde, geminin hareketi sabit rota ve sabit hız varsayımıyla modellenir. Bu durumda alınan mesafe, hız ile geçen zamanın çarpımıdır. Bu formül, seyirde kullanılan en temel bağıntıdır ve hızın birim zamanda alınan yol olması ilkesine dayanır.",
        image: "https://www.marinepublic.com/_next/image?q=75&url=https%3A%2F%2Fik.imagekit.io%2Fmwakqpfup%2Fdead_reckoning_explained_example-diagram_cpxrvu.jpg&w=3840",
        imageAlt: "Ölü hesap (dead reckoning) örneği"
      },
      {
        title: "Birim Uyumu ve Zaman Üçgeni",
        content: "Hız = Mesafe ÷ Zaman ve Zaman = Mesafe ÷ Hız bağıntıları, bilinmeyen büyüklüğe göre temel formülün yeniden düzenlenmiş hâlidir. Bu üçlü bağıntı, ETA hesapları, vardiya planlaması ve yakıt tahminleri için sürekli olarak kullanılır.",
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
        content: "Bu hesapların geçerli olabilmesi için hızın gerçekten sabit kalması gerekir. Dış etkilerin (akıntı, rüzgâr, dalga) ihmal edilemeyecek düzeyde olduğu durumlarda rota ve hız değerleri güncellenmelidir.",
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
        content: "Bu ilişkinin matematiksel temeli düzgün doğrusal harekete dayanır. Düzlem seyirde rüzgâr ve akıntı etkileri ihmal edildiğinde, geminin hareketi sabit rota ve sabit hız varsayımıyla modellenir.",
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
        content: "Bir geminin hakiki rotası sabit kabul edilsin ve hızı 14 knot olsun. Gemi bu hızla 3,5 saat seyir yaptığında alınan mesafe 49 deniz milidir. Aynı geminin 70 deniz millik bir mesafeyi alması için gereken süre 5 saattir. Bu tür hesaplamalar, varış zamanı tahminlerinde temel alınır.",
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
        content: "Hız, makine devri, deniz durumu ve yükleme gibi etkenlere bağlı olarak değişebilir. Bu nedenle gerçek zamanlı hız takibi, rota ve mesafe hesaplarının doğruluğu açısından kritiktir. Hızdaki küçük sapmalar, uzun seyirlerde önemli mesafe hatalarına dönüşebilir.",
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
        content: "Rota, hız ve mesafe ilişkisi yalnızca doğrusal bir hesap değildir; vektörel bir anlam taşır. Mesafe, yönsüz bir büyüklüktür. Bu mesafe ancak belirli bir rota doğrultusunda uygulandığında geminin mevkiini değiştirir. Aynı mesafe farklı rotalarda alındığında gemi tamamen farklı bir noktaya ulaşır.",
        image: "https://tdgil.com/wp-content/uploads/2020/04/DR-Plot.png",
        imageAlt: "Ölü hesap (DR) çizimi"
      },
      {
        title: "Harita Üzerinde Uygulama",
        content: "Başlangıç mevkii bilinen bir geminin, belirli bir hakiki rota ve hızla belirli bir süre sonunda ulaşacağı mevki, mesafenin rota doğrultusunda harita üzerine taşınmasıyla bulunur. Bu işlemde rota açısı kadar mesafe büyüklüğü de kritik öneme sahiptir.",
        image: "https://uscaptainstraining.com/wp-content/uploads/parallel-ruler-chart-plot-tool.png",
        imageAlt: "Paralel cetvelle rota çizimi"
      },
      {
        title: "Hata Birikimi ve Sapmalar",
        content: "Küçük hız hataları zaman uzadıkça büyük mesafe sapmalarına dönüşür. Benzer şekilde rotadaki birkaç derecelik bir hata, uzun seyirlerde geminin planlanan hattın ciddi şekilde dışına çıkmasına neden olur. Bu nedenle düzlem seyirde rota, hız ve mesafe hesapları yalnızca birer formül olarak değil, sürekli kontrol edilmesi gereken dinamik büyüklükler olarak ele alınır.",
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
    introduction: "Zaman, mesafe ve hız bağıntısı, seyirde yapılan tüm nicel değerlendirmelerin temelini oluşturur. Bu üç büyüklük arasındaki ilişki, geminin belirli bir rota boyunca ne kadar sürede ne kadar yol alacağını öngörmeyi mümkün kılar. Düzlem seyirde rüzgâr ve akıntı etkileri ihmal edildiğinde, gemi hareketi sabit hızla gerçekleşen düzgün doğrusal hareket olarak kabul edilir ve hesaplamalar bu varsayım üzerine kurulur. Bu nedenle zaman–mesafe–hız bağıntısı, ölü hesap mevkii belirlemenin matematiksel çekirdeğidir. Denizcilikte hız knot cinsinden ifade edilir ve 1 knot saatte 1 deniz miline eşittir. Mesafe deniz mili, zaman saat cinsindendir. Birimler arasındaki bu uyum, dönüşüm hatalarını ortadan kaldırır ve hesapların doğrudan yapılmasını sağlar.",
    sections: [
      {
        title: "Temel Kavram",
        content: "Rota doğrultusunda alınan mesafe, sabit hız ve geçen zamanla doğrusal olarak artar; hız düşürüldüğünde aynı mesafeye ulaşmak için daha fazla zaman gerekir. Hızın birim zamanda alınan yol olması, ilişkiyi sezgisel hâle getirir: süre arttıkça mesafe, hızla doğru orantılı olarak büyür.",
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
        title: "Birim Uyumunun Görsel Mantığı",
        content: "Birimlerin birbirine doğrudan oturması, seyirde hızlı ve hatasız hesap yapmayı mümkün kılar. Bu nedenle hızın knot olarak, mesafenin deniz mili ve zamanın saat olarak kullanılması temel standarttır.",
        image: "https://maritimesa.org/grade-10/wp-content/uploads/sites/2/2015/10/01_Voyage_calculations_R.png",
        imageAlt: "Zaman-mesafe-hız birim uyumu"
      },
      {
        title: "Bağıntının Formülleri",
        content: "Bağıntı üç eşdeğer formülle ifade edilir. Hız, birim zamanda alınan yol olduğundan mesafe, hız ile zamanın çarpımıdır. Bilinmeyen büyüklüğe göre formül düzenlenir. Bu üç formül, ETA hesaplarının temel dayanağıdır.",
        image: "https://www.mastersystems.com/wp-content/uploads/2024/08/speed-log-furuno1717127956.png",
        imageAlt: "Zaman-mesafe-hız formülleri",
        formula: {
          text: "Mesafe = Hız × Zaman",
          description: "Hız = Mesafe ÷ Zaman | Zaman = Mesafe ÷ Hız"
        }
      },
      {
        title: "Sayısal Örnek",
        content: "Bir geminin hızı 16 knot olsun. Gemi bu hızla 2 saat 30 dakika (2,5 saat) seyir yaptığında alınan mesafe 40 deniz milidir. Aynı geminin 100 deniz millik bir mesafeyi alması için gereken süre 6,25 saat yani 6 saat 15 dakikadır. Bu tür dönüşümler, ETA hesaplarında doğru zaman planlaması yapılabilmesi için zorunludur.",
        image: "https://www.getlostpowerboattraining.com/wp-content/uploads/2020/03/START.png",
        imageAlt: "Zaman-mesafe-hız formül şeması",
        bulletPoints: [
          "Mesafe = 16 × 2,5 = 40 deniz mili",
          "Zaman = 100 ÷ 16 = 6,25 saat",
          "6,25 saat = 6 saat 15 dakika"
        ]
      },
      {
        title: "Ölçüm Cihazları ve Hız Bilgisi",
        content: "Pratikte hız bilgisi log cihazlarıyla elde edilir. Hız ölçümü ne kadar doğruysa, zaman–mesafe hesabı da o kadar güvenilir olur.",
        image: "https://www.myseatime.com/blogadm/wp-content/uploads/2018/02/doppler-log-working.jpg",
        imageAlt: "Doppler log çalışma prensibi"
      },
      {
        title: "Hız Değişiminin Zaman Üzerindeki Etkisi",
        content: "Uzun mesafeli seyirlerde hızın yalnızca 1–2 knot düşmesi, varış zamanında saatlerce gecikmeye neden olabilir. Kısa mesafelerde yapılan hız artışları ise beklenen zaman kazancını her zaman sağlamaz. Bu nedenle hız planlaması, mesafe ve zaman birlikte değerlendirilerek yapılmalıdır.",
        image: "https://images.marinelink.com/images/maritime/-99700.jpg",
        imageAlt: "Seyirde hız planlaması"
      },
      {
        title: "Geriye Dönük Analiz",
        content: "Seyir sonrası değerlendirmelerde, belirli bir sürede kat edilen mesafeden ortalama hız hesaplanır. Bu hız, makine performansı, deniz durumu ve akıntı etkilerinin dolaylı bir göstergesi olarak yorumlanır.",
        image: "https://www.researchgate.net/publication/256503418/figure/fig3/AS%3A297700613476363%401447988765994/Speed-time-graph-arriving-as-late-as-possible.png",
        imageAlt: "Seyir ve hız verilerinin değerlendirilmesi"
      },
      {
        title: "Vektörel Rota ve Harita Üzerinde Uygulama",
        content: "Hesaplanan mesafe yalnızca bir rota doğrultusunda harita üzerine taşındığında geminin mevkiini değiştirir. Sayısal hesapların doğru olması tek başına yeterli değildir; mesafenin doğru rota doğrultusunda uygulanması gerekir. Aksi hâlde elde edilen mevki matematiksel olarak tutarlı görünse bile fiziksel olarak yanlıştır.",
        image: "https://tdgil.com/wp-content/uploads/2020/04/DR-Plot.png",
        imageAlt: "Ölü hesap (DR) çizimi"
      },
      {
        title: "Rota Doğrultusu ve Mevki Aktarımı",
        content: "Hesaplanan mesafenin harita üzerinde doğru rota doğrultusunda taşınması, ölü hesap mevkiinin güvenilirliğini belirler. Bu aşamada rota açısı ve ölçüm hassasiyeti kritik önemdedir.",
        image: "https://image.jimcdn.com/app/cms/image/transf/none/path/sd6ea49279f075268/image/ia488bbe2ca937abc/version/1604740630/image.png",
        imageAlt: "Rota doğrultusunda mevki aktarımı"
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
  "Rota ölçümü": {
    title: "Rota Ölçümü",
    introduction: "Rota ölçümü, deniz haritası üzerinde belirlenen iki nokta arasındaki doğrultunun hakiki kuzeye göre açısal değerinin bulunması işlemidir. Bu işlem, seyirde yön kavramının harita üzerindeki somut karşılığıdır ve tüm hız–zaman–mesafe hesaplarının doğru bir doğrultuda uygulanabilmesi için zorunludur. Rota ölçümü yalnızca bir açı okumak değildir; haritanın projeksiyonu, meridyen yapısı ve kullanılan ölçüm aracının doğru referansla kullanılması bu işlemin ayrılmaz parçalarıdır.",
    sections: [
      {
        title: "Hakiki Sistem ve Referans",
        content: "Deniz haritalarında rota her zaman hakiki sistemde ölçülür. Harita üzerindeki meridyenler hakiki kuzey–hakiki güney doğrultusunu temsil ettiği için, yapılan her açı ölçümü doğrudan hakiki rota değerini verir. Bu nedenle harita üzerinde ölçülen rota, manyetik veya pusula değil, daima hakiki rota olarak kabul edilir. Daha sonra gerekiyorsa variation ve deviation düzeltmeleriyle diğer sistemlere geçilir."
      },
      {
        title: "Ölçümün Temel Mantığı",
        content: "Rota ölçümünün temel mantığı, ölçülecek rota hattı ile bir meridyen doğrultusu arasındaki saat yönündeki açının bulunmasına dayanır. Bu açı, 0° ile 360° arasında ifade edilir. Ölçüm sırasında kullanılan referans çizgisi mutlaka meridyen olmalıdır; paralel çizgiler veya harita kenarı, yalnızca meridyen doğrultusuna paralel oldukları sürece referans olarak kullanılabilir."
      },
      {
        title: "Araçlar: Paralel Cetvel ve Üçgen Cetvel",
        content: "Pratikte rota ölçümü paralel cetvel veya üçgen cetvel yardımıyla yapılır. Paralel cetvel, seçilen doğrultunun bozulmadan haritanın kenarındaki meridyene taşınmasını sağlar. Üçgen cetvellerde ise bir üçgen sabit tutulur, diğeri onun üzerinden kaydırılarak aynı paralellik elde edilir. Kullanılan aracın türü değişse de mantık aynıdır: rota hattını, meridyen doğrultusuyla aynı noktada kesişecek şekilde taşımak ve açı değerini buradan okumak."
      },
      {
        title: "Uygulama Adımları",
        content: "Önce başlangıç ve varış noktaları harita üzerinde net olarak belirlenir. Bu iki nokta arasına ince, düz bir rota hattı çizilir. Paralel cetvel bu hatta yerleştirilir ve cetvel bozulmadan haritanın bir meridyen çizgisine taşınır. Cetvel meridyenle çakıştığında, cetvel üzerindeki rota hattı ile meridyen arasındaki açı, pusula gülü veya derece skalası üzerinden okunur. Okunan değer, hakiki rotadır."
      },
      {
        title: "Kritik Hata: Yönün Ters Okunması",
        content: "Bu ölçümde yapılan en kritik hata, açının yanlış yönde okunmasıdır. Denizcilikte rota, her zaman kuzeyden başlayarak saat yönünde ölçülür. Güneyden, doğudan veya ters yönde yapılan okumalar, sayısal olarak doğru görünen ancak fiziksel olarak yanlış bir rota üretir. Bu nedenle ölçüm sırasında zihinsel olarak “kuzeyden saat yönünde” kuralı sürekli korunmalıdır."
      },
      {
        title: "Karşı Rota",
        content: "Rota ölçümü ile birlikte sıkça kullanılan kavramlardan biri de karşı rotadır. Bir rotanın karşı rotası, aynı hattın ters yönde izlenmesi anlamına gelir ve hakiki rota değerine 180° eklenerek veya çıkarılarak bulunur.",
        formula: {
          text: "Karşı Rota = Hakiki Rota ± 180°",
          description: "Hakiki rota 180°’den küçükse 180° eklenir, 180°’den büyükse 180° çıkarılır."
        }
      },
      {
        title: "Projeksiyon ve Enlem Etkisi",
        content: "Rota ölçümünde harita projeksiyonunun etkisi de göz önünde bulundurulmalıdır. Mercator projeksiyonunda doğrultular düz çizgi olarak görünür; bu, sabit rota seyri için büyük bir avantajdır. Ancak yüksek enlemlerde meridyenler arasındaki mesafe arttığı için, ölçüm hassasiyeti düşebilir. Bu bölgelerde rota ölçümü daha dikkatli yapılmalı ve mümkünse daha büyük ölçekli haritalar tercih edilmelidir."
      },
      {
        title: "Ölçek Seçimi",
        content: "Rota ölçümünün her zaman uygun ölçekli harita üzerinde yapılması gerekir. Küçük ölçekli bir haritada ölçülen rota, genel seyir için yeterli olabilir; ancak dar sularda ve liman yaklaşmalarında büyük ölçekli haritalara geçilmeden bu rota kullanılmamalıdır. Aynı rota hattı, büyük ölçekli haritada sığlıklar veya engellerle çakışabilir."
      },
      {
        title: "Disiplinli Uygulama",
        content: "Rota ölçümü, denizcilikte en temel işlemlerden biri gibi görünse de, hataya en açık konulardan biridir. Yanlış referans çizgisi, yanlış yönde açı okuma veya yanlış ölçekli harita kullanımı, tüm seyir planını geçersiz hâle getirebilir. Bu nedenle rota ölçümü, mekanik bir cetvel hareketi değil; yön kavramı, harita yapısı ve matematiksel disiplinin birlikte uygulandığı bilinçli bir süreç olarak ele alınmalıdır."
      }
    ],
    keyPoints: [
      "Rota ölçümü haritada her zaman hakiki (true) sistemdedir",
      "Açı kuzeyden başlayarak saat yönünde okunur",
      "Referans çizgisi meridyen doğrultusu olmalıdır",
      "Paralel cetvel doğrultuyu meridyene taşımak için kullanılır",
      "Yanlış yön okuma ve yanlış ölçek seçimi ciddi rota hatası doğurur"
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
  },
  "Deniz haritasının yapısı": {
    title: "Deniz haritasının yapısı",
    introduction: "Deniz haritasının yapısı, harita üzerinde yer alan bilgilerin rastgele değil, belirli bir teknik düzen ve hiyerarşi içinde sunulmasına dayanır. Bir deniz haritası, seyir emniyetini doğrudan etkileyen veriler içerdiği için yalnızca çizgilerden ve rakamlardan oluşan bir görsel değil, uluslararası kurallarla standardize edilmiş teknik bir dokümandır.",
    sections: [
      {
        title: "Genel Yapı",
        content: "Deniz haritası iki ana bölümden oluşur: haritanın ana gövdesi ve kenar bilgileri. Ana gövde, seyir sırasında doğrudan kullanılan coğrafi ve hidrografik bilgileri içerirken, kenar bilgileri bu verilerin nasıl okunacağını ve hangi referanslara göre hazırlandığını açıklar. Bu iki bölüm birbirinden bağımsız değildir; kenar bilgileri okunmadan ana gövdedeki hiçbir bilgi tam anlamıyla yorumlanamaz."
      },
      {
        title: "Ana Gövde: Kıyı ve Hidrografi",
        content: "Haritanın ana gövdesinde kıyı çizgileri, adalar, kayalıklar, sığlıklar ve derinlik bilgileri yer alır. Derinlikler sayısal değerler ve izobatlar ile gösterilir. Sayısal derinlikler belirli bir referans su seviyesine göre verilmiştir ve bu referans seviye haritanın kenar bilgilerinde açıkça belirtilir. İzobatlar ise aynı derinlikteki noktaları birleştirerek deniz tabanının genel yapısını görsel olarak ortaya koyar.",
        bulletPoints: [
          "Sayısal derinlikler belirli bir chart datum seviyesine göre verilir",
          "İzobatlar, aynı derinlikteki noktaları birleştirir",
          "Derinlik yapısı, geminin su çekimiyle birlikte değerlendirilir"
        ]
      },
      {
        title: "Seyir Yardımcıları ve Tehlikeler",
        content: "Ana gövdede ayrıca fenerler, şamandıralar, sis düdükleri, trafik ayırım düzenleri, yasak sahalar ve batıklar gibi seyir yardımcıları ve tehlikeler bulunur. Bu unsurlar standart semboller ve kısaltmalarla gösterilir. Harita üzerindeki bir sembolün yanlış yorumlanması, yanlış bir derinlik hesabından çok daha ağır sonuçlar doğurabilir; bu nedenle sembol dili harita yapısının en kritik parçalarından biridir.",
        bulletPoints: [
          "Seyir yardımcıları standart sembollerle gösterilir",
          "Tehlikeler (batık, sığlık, kayalık) ayrı işaretlerle belirtilir",
          "Trafik ayırım düzenleri ve yasak sahalar açıkça işaretlenir"
        ]
      },
      {
        title: "Kenar Bilgileri (Teknik Kimlik)",
        content: "Haritanın kenar bilgileri, haritanın teknik kimliğini oluşturur. Burada haritanın adı ve numarası, ölçeği, kullanılan projeksiyon türü, datum bilgisi, variation değeri ve yıllık değişimi yer alır. Ayrıca haritanın hangi tarihe kadar düzeltildiği ve hangi Notice to Mariners yayınlarının işlendiği de bu bölümde belirtilir.",
        bulletPoints: [
          "Harita adı, numarası ve ölçeği",
          "Projeksiyon türü ve kullanılan datum",
          "Variation değeri ve yıllık değişim",
          "Düzeltme tarihi ve Notice to Mariners kayıtları"
        ]
      },
      {
        title: "Harita Ölçeği ve Bilgi Düzeyi",
        content: `Harita ölçeği, deniz haritasının neyi **ayrıntılı**, neyi **bilinçli olarak eksik** gösterdiğini belirleyen temel yapıdır. Seyirde ölçek yalnızca matematiksel bir oran değildir; hangi bilginin karar üretmeye yeterli olduğunu, hangi bilginin özellikle saklandığını ve hangi aşamada hangi haritanın kullanılacağını belirleyen pratik bir filtredir. Aynı rota, farklı ölçekli haritalarda farklı görünür çünkü harita, ölçeğine göre gerçeği yeniden yorumlar. Bu nedenle ölçek, “harita ne kadar doğru” sorusundan önce “harita hangi karar için doğru” sorusunu cevaplar.

![Harita ölçeği örnek harita 1](https://nauticalcharts.noaa.gov/learn/images/nautical-cartography/18020.jpg)

![Harita ölçeği karşılaştırma](https://cdn.shopify.com/s/files/1/0523/4189/9430/files/scales.png)

![Harita ölçeği detay örneği](https://nauticalcharts.noaa.gov/learn/images/nautical-cartography/18640-detail.jpg)

![Harita ölçeği detay karşılaştırması](https://www.bwsailing.com/cc/wp-content/uploads/2016/02/2776b.jpg)

Harita ölçeği, harita üzerindeki bir uzunluğun yeryüzündeki gerçek uzunluğa oranı olarak ifade edilir ve 1:50 000, 1:25 000, 1:10 000 gibi yazılır. Bu ifadede payda küçüldükçe ölçek büyür ve ayrıntı artar; payda büyüdükçe ölçek küçülür ve ayrıntı azalır. Denizcilikte büyük ölçekli harita, sayısal olarak küçük paydalı haritadır. Liman haritaları bu nedenle büyük ölçeklidir; açık deniz haritaları ise küçük ölçeklidir.

![Harita ölçeği sayısal örnek](https://study.com/cimages/multimages/16/scalefactorexample21631721535405625512.jpg)

![Harita ölçeği oran örneği](https://innoter.com/upload/medialibrary/ab4/occZYa.png)

Ölçek mantığını sayısal olarak kurmak, harita üzerinde yapılan her ölçümün sınırlarını bilmeyi sağlar. 1:50 000 ölçekli bir haritada harita üzerindeki 1 cm, gerçekte 50 000 cm’ye yani 500 metreye karşılık gelir. 1:25 000 ölçekli bir haritada aynı 1 cm, 250 metreyi temsil eder. Ölçek büyüdükçe, harita üzerindeki küçük çizgiler gerçek dünyada daha küçük mesafelere karşılık gelir ve hata toleransı azalır. Bu nedenle büyük ölçekli haritalar, dar sularda ve manevra safhasında zorunludur.

Harita ölçeğinin en kritik etkisi, **genelleştirme** üzerindedir. Küçük ölçekli haritalar, geniş bir alanı gösterebilmek için ayrıntıyı bilinçli olarak sadeleştirir. Küçük kayalıklar, sığlık uzantıları, dar kanal sınırları veya ikincil seyir yardımcıları bu haritalarda hiç gösterilmeyebilir ya da sembolik olarak küçültülür. Bu durum haritanın eksikliği değil, ölçeğin doğrudan sonucudur. Büyük ölçekli haritalarda ise aynı alan çok daha dar bir çerçevede gösterildiği için izobatlar sıklaşır, derinlik değerleri artar, şamandıra dizileri ve yasak saha sınırları netleşir.

![Harita ölçeği karşılaştırma](https://cdn.shopify.com/s/files/1/0523/4189/9430/files/scales.png)

![Harita ölçeği detay örneği](https://nauticalcharts.noaa.gov/learn/images/nautical-cartography/18640-detail.jpg)

Bu fark, seyirde yanlış yorumlandığında ciddi hatalar üretir. Küçük ölçekli bir haritada görünmeyen bir sığlık dili, büyük ölçekli haritada açıkça yer alabilir. Bu nedenle “haritada yok” ifadesi ancak doğru ölçekli harita kullanılıyorsa anlamlıdır. Yanlış ölçekli haritada görünmeyen bir tehlike, gerçekte yok değildir; yalnızca o ölçeğin dışında bırakılmıştır.

Harita ölçeği seçimi, seyir safhasına göre yapılır. Açık deniz seyri ve genel rota planlaması küçük ölçekli haritalarla yürütülür. Bu aşamada amaç, ana rota koridorunu belirlemek ve büyük engellerden kaçınmaktır. Kıyıya yaklaşma, boğaz geçişi, dar su seyri ve liman manevrası safhasında ise büyük ölçekli haritalar kullanılır. Bu haritalar, geminin su çekimiyle doğrudan ilişkili olan sığlıkları, yasak sahaları, sektörel ışıkları ve şamandıra dizilerini yönetmeye imkân verir.

![Harita ölçeği detay örneği](https://nauticalcharts.noaa.gov/learn/images/nautical-cartography/18640-detail.jpg)

![Harita işaretleri örneği](https://nauticalcharts.noaa.gov/updates/wp-content/uploads/2019/05/Chart-No-1.jpg)

Harita ölçeği, mesafe ölçümünün doğruluğunu da doğrudan etkiler. Ölçek küçüldükçe, harita üzerindeki milimetrelik bir ölçüm hatası gerçekte yüzlerce metreye karşılık gelebilir. Bu nedenle mesafe ölçümü, mevki işaretleme ve rota düzeltme işlemleri, mümkün olan en büyük ölçekli harita üzerinde yapılmalıdır. Aynı prensip rota ölçümü için de geçerlidir; küçük ölçekte önemsiz görünen birkaç derecelik hata, büyük ölçekte gemiyi kanal dışına taşıyabilir.

![Mesafe ölçüm hatası grafiği](https://www.researchgate.net/publication/35199451/figure/fig7/AS%3A614142532657199%401523434398845/Plot-of-distance-measurement-errors-Vs-distance-The-1-s-interval-superimposed-on-the.png)

![Harita ölçeği örnek sayfa](https://nauticalcharts.noaa.gov/learn/images/nautical-cartography/530.jpg)

Harita ölçeği, tek başına seyri güvenli hâle getirmez; ancak yanlış ölçek seçimi, doğru hesapları bile tehlikeli kılar. Marine Expert içinde bu konu, yalnızca “büyük–küçük ölçek” tanımıyla geçiştirilirse kullanıcı, liman yaklaşımını kıyı haritasıyla yönetmeye çalışır veya küçük ölçekli haritada görünmeyen tehlikeyi yok sanır. Bu nedenle ölçek, tanım olarak değil; **hangi safhada hangi harita ile karar verileceğini öğreten bir refleks** olarak sunulmalıdır. Bu refleks oluştuğunda harita, pasif bir çizim değil, aktif bir seyir aracı hâline gelir.`
      },
      {
        title: "Harita Datum’u ve Elektronik Seyir",
        content: "Harita datum’u, deniz haritası üzerindeki tüm koordinatların yeryüzü ile hangi matematiksel modele göre ilişkilendirildiğini belirleyen referans sistemidir. Bir datum, dünyanın şeklinin ve boyutlarının nasıl kabul edildiğini tanımlar; bu kabul, enlem ve boylam değerlerinin harita üzerinde hangi noktalara karşılık geleceğini belirler. Datum bilgisi doğru anlaşılmadan yapılan mevki işaretlemeleri sayısal olarak tutarlı görünse bile fiziksel olarak yanlış bir konuma karşılık gelir. Modern denizcilikte en yaygın kullanılan datum WGS-84’tür; çünkü GPS sistemleri de aynı datum’u kullanır. Ancak daha eski haritalarda farklı datum’lar bulunabilir ve bu durum seyirde ciddi hatalara yol açabilir.",
        bulletPoints: [
          "Datum bilgisi kenar bölümünde açıkça yazılıdır",
          "ECDIS/GPS ile birlikte kullanıldığında kritik öneme sahiptir",
          "Yanlış datum, mevki hatasına yol açar"
        ]
      },
      {
        title: "Datum Modelleri: Clarke 1866, WGS-84 ve GRS80",
        content: "Farklı datum’lar, dünyanın farklı bölgelerinde daha doğru sonuç verecek şekilde tanımlanmış elipsoidlere dayanır. Aynı coğrafi nokta farklı datum’larda farklı enlem–boylam değerlerine sahip olabilir. Bu nedenle kullanılan datum’un harita kenar bilgisinde kontrol edilmesi zorunludur.",
        image: "https://vdatum.noaa.gov/images/docs/clarke1866_wgs84_grs80.gif",
        imageAlt: "Clarke 1866, WGS-84 ve GRS80 datum karşılaştırması"
      },
      {
        title: "Chart Datum ve Gelgit Referansları",
        content: "Deniz haritalarında derinlikler belirli bir referans su seviyesine (chart datum) göre verilir. Bu referans, gelgit düzeyleriyle ilişkilidir ve harita kenarındaki datum notlarında belirtilir. Gelgit referansları doğru anlaşılmadan yapılan sığlık ve emniyet hesabı ciddi risk doğurabilir.",
        image: "https://upload.wikimedia.org/wikipedia/commons/1/19/Tide_legal_use.gif",
        imageAlt: "Gelgit seviyeleri ve chart datum ilişkisi"
      },
      {
        title: "Yatay ve Düşey Datum Ayrımı",
        content: "Datum kavramı yalnızca yatay koordinatları değil, düşey ölçümleri de etkiler. Yükseklikler ve derinlikler farklı düşey datumlara bağlıdır. Harita üzerinde verilen yükseklik ve derinliklerin hangi referansa göre ölçüldüğü net biçimde okunmalıdır.",
        image: "https://vdatum.noaa.gov/images/docs/heights.gif",
        imageAlt: "Yatay ve düşey datumların gösterimi"
      },
      {
        title: "Harita Kenar Bilgilerinde Datum Notları",
        content: "Datum bilgisi harita kenarında açıkça belirtilir. Bazı haritalarda datum dönüşümü için yön ve mesafe düzeltmeleri verilir. Bu notlar uygulanmadığında, GPS’ten alınan mevki harita üzerinde yanlış konuma taşınır.",
        image: "https://www.mibsar.com/LandNav/Datums/2002MNRDatumLegend.jpg",
        imageAlt: "Harita kenarında datum bilgisi örneği"
      },
      {
        title: "Nautical Chart Datum Blok Örneği",
        content: "Nautical chart datum blokları, haritanın hangi datum’a göre hazırlandığını ve varsa dönüşüm notlarını gösterir. Harita kenarındaki bu blok, datum uyumluluğunu kontrol etmek için ilk bakılması gereken yerdir.",
        image: "https://geographic.org/nautical_charts/mcd/nNTC_Block.jpg",
        imageAlt: "Nautical chart datum blok örneği"
      },
      {
        title: "Datum Uyuşmazlığının Seyre Etkisi",
        content: "Datum uyuşmazlığı özellikle kıyıya yakın seyirlerde ve dar sularda kritik hâle gelir. Gerçek mevki ile harita üzerinde işaretlenen mevki arasında onlarca hatta yüzlerce metre fark oluşabilir. Açık denizde fark küçük görünse de liman girişleri ve sığ sularda bu sapma tehlike doğurur.",
        image: "https://static.wixstatic.com/media/43d115_a2b4984a4a1b49628452db55424f4f78~mv2.png/v1/fill/w_568%2Ch_276%2Cal_c%2Cq_85%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/43d115_a2b4984a4a1b49628452db55424f4f78~mv2.png",
        imageAlt: "Datum uyuşmazlığı kaynaklı konum sapması örneği"
      },
      {
        title: "GPS Datum Ayarı ve Dönüşüm Uygulamaları",
        content: "GPS alıcıları datum ayarı sunar. Harita datum’u WGS-84 ise GPS de aynı datum’a ayarlanmalıdır. Farklı datum kullanılan haritalarda, harita üzerinde belirtilen düzeltme değerleri dikkatle uygulanmalıdır.",
        image: "https://www.siranah.de/pictures/sail022e_A.gif",
        imageAlt: "GPS datum ayarı ve harita mevki düzeltmesi örneği"
      },
      {
        title: "Dönüşüm Notları ve Emniyetli Uygulama",
        content: "Bazı haritalarda datum dönüşüm notları doğu–batı ve kuzey–güney yönlerinde metre cinsinden verilir. Bu düzeltmeler uygulanmadığında mevki işaretleme hatası kaçınılmaz hâle gelir. Datum bilgisi, seyir emniyetinin temel yapı taşlarından biridir.",
        image: "https://sailingissues.com/chart-symbols/clearing-heights-chart-datums-opt.svg",
        imageAlt: "Datum dönüşüm notları ve chart datum sembolleri"
      },
      {
        title: "Seyir Uygulamalarına Etkisi",
        content: "Deniz haritasının yapısı, seyirde yapılan tüm işlemlerin fiziksel karşılığını oluşturur. Rota çizimi, kurs ölçümü, mesafe hesaplaması ve mevki işaretleme işlemleri ancak haritanın yapısı doğru anlaşıldığında anlam kazanır. Harita, matematiğin deniz üzerindeki izdüşümüdür; bu izdüşümün dili ise haritanın yapısında saklıdır."
      }
    ],
    keyPoints: [
      "Deniz haritası ana gövde ve kenar bilgileri olarak iki ana bölümden oluşur",
      "Derinlikler ve izobatlar chart datum referansına göre verilir",
      "Seyir yardımcıları standart sembollerle gösterilir",
      "Kenar bilgileri haritanın teknik kimliğini ve geçerliliğini açıklar",
      "Datum bilgisi, elektronik seyirde mevki doğruluğunu belirler"
    ]
  },
  "Harita ölçeği": {
    title: "Harita Ölçeği",
    introduction: "Harita ölçeği, seyirde hangi kararın hangi harita ile verileceğini belirleyen ana filtredir.",
    sections: [
      {
        title: "Harita Ölçeği",
        content: `Harita ölçeği, deniz haritasının neyi **ayrıntılı**, neyi **bilinçli olarak eksik** gösterdiğini belirleyen temel yapıdır. Seyirde ölçek yalnızca matematiksel bir oran değildir; hangi bilginin karar üretmeye yeterli olduğunu, hangi bilginin özellikle saklandığını ve hangi aşamada hangi haritanın kullanılacağını belirleyen pratik bir filtredir. Aynı rota, farklı ölçekli haritalarda farklı görünür çünkü harita, ölçeğine göre gerçeği yeniden yorumlar. Bu nedenle ölçek, “harita ne kadar doğru” sorusundan önce “harita hangi karar için doğru” sorusunu cevaplar.

![Harita ölçeği örnek harita 1](https://nauticalcharts.noaa.gov/learn/images/nautical-cartography/18020.jpg)

![Harita ölçeği karşılaştırma](https://cdn.shopify.com/s/files/1/0523/4189/9430/files/scales.png)

![Harita ölçeği detay örneği](https://nauticalcharts.noaa.gov/learn/images/nautical-cartography/18640-detail.jpg)

![Harita ölçeği detay karşılaştırması](https://www.bwsailing.com/cc/wp-content/uploads/2016/02/2776b.jpg)

Harita ölçeği, harita üzerindeki bir uzunluğun yeryüzündeki gerçek uzunluğa oranı olarak ifade edilir ve 1:50 000, 1:25 000, 1:10 000 gibi yazılır. Bu ifadede payda küçüldükçe ölçek büyür ve ayrıntı artar; payda büyüdükçe ölçek küçülür ve ayrıntı azalır. Denizcilikte büyük ölçekli harita, sayısal olarak küçük paydalı haritadır. Liman haritaları bu nedenle büyük ölçeklidir; açık deniz haritaları ise küçük ölçeklidir.

![Harita ölçeği sayısal örnek](https://study.com/cimages/multimages/16/scalefactorexample21631721535405625512.jpg)

![Harita ölçeği oran örneği](https://innoter.com/upload/medialibrary/ab4/occZYa.png)

Ölçek mantığını sayısal olarak kurmak, harita üzerinde yapılan her ölçümün sınırlarını bilmeyi sağlar. 1:50 000 ölçekli bir haritada harita üzerindeki 1 cm, gerçekte 50 000 cm’ye yani 500 metreye karşılık gelir. 1:25 000 ölçekli bir haritada aynı 1 cm, 250 metreyi temsil eder. Ölçek büyüdükçe, harita üzerindeki küçük çizgiler gerçek dünyada daha küçük mesafelere karşılık gelir ve hata toleransı azalır. Bu nedenle büyük ölçekli haritalar, dar sularda ve manevra safhasında zorunludur.

Harita ölçeğinin en kritik etkisi, **genelleştirme** üzerindedir. Küçük ölçekli haritalar, geniş bir alanı gösterebilmek için ayrıntıyı bilinçli olarak sadeleştirir. Küçük kayalıklar, sığlık uzantıları, dar kanal sınırları veya ikincil seyir yardımcıları bu haritalarda hiç gösterilmeyebilir ya da sembolik olarak küçültülür. Bu durum haritanın eksikliği değil, ölçeğin doğrudan sonucudur. Büyük ölçekli haritalarda ise aynı alan çok daha dar bir çerçevede gösterildiği için izobatlar sıklaşır, derinlik değerleri artar, şamandıra dizileri ve yasak saha sınırları netleşir.

![Harita ölçeği karşılaştırma](https://cdn.shopify.com/s/files/1/0523/4189/9430/files/scales.png)

![Harita ölçeği detay örneği](https://nauticalcharts.noaa.gov/learn/images/nautical-cartography/18640-detail.jpg)

Bu fark, seyirde yanlış yorumlandığında ciddi hatalar üretir. Küçük ölçekli bir haritada görünmeyen bir sığlık dili, büyük ölçekli haritada açıkça yer alabilir. Bu nedenle “haritada yok” ifadesi ancak doğru ölçekli harita kullanılıyorsa anlamlıdır. Yanlış ölçekli haritada görünmeyen bir tehlike, gerçekte yok değildir; yalnızca o ölçeğin dışında bırakılmıştır.

Harita ölçeği seçimi, seyir safhasına göre yapılır. Açık deniz seyri ve genel rota planlaması küçük ölçekli haritalarla yürütülür. Bu aşamada amaç, ana rota koridorunu belirlemek ve büyük engellerden kaçınmaktır. Kıyıya yaklaşma, boğaz geçişi, dar su seyri ve liman manevrası safhasında ise büyük ölçekli haritalar kullanılır. Bu haritalar, geminin su çekimiyle doğrudan ilişkili olan sığlıkları, yasak sahaları, sektörel ışıkları ve şamandıra dizilerini yönetmeye imkân verir.

![Harita ölçeği detay örneği](https://nauticalcharts.noaa.gov/learn/images/nautical-cartography/18640-detail.jpg)

![Harita işaretleri örneği](https://nauticalcharts.noaa.gov/updates/wp-content/uploads/2019/05/Chart-No-1.jpg)

Harita ölçeği, mesafe ölçümünün doğruluğunu da doğrudan etkiler. Ölçek küçüldükçe, harita üzerindeki milimetrelik bir ölçüm hatası gerçekte yüzlerce metreye karşılık gelebilir. Bu nedenle mesafe ölçümü, mevki işaretleme ve rota düzeltme işlemleri, mümkün olan en büyük ölçekli harita üzerinde yapılmalıdır. Aynı prensip rota ölçümü için de geçerlidir; küçük ölçekte önemsiz görünen birkaç derecelik hata, büyük ölçekte gemiyi kanal dışına taşıyabilir.

![Mesafe ölçüm hatası grafiği](https://www.researchgate.net/publication/35199451/figure/fig7/AS%3A614142532657199%401523434398845/Plot-of-distance-measurement-errors-Vs-distance-The-1-s-interval-superimposed-on-the.png)

![Harita ölçeği örnek sayfa](https://nauticalcharts.noaa.gov/learn/images/nautical-cartography/530.jpg)

Harita ölçeği, tek başına seyri güvenli hâle getirmez; ancak yanlış ölçek seçimi, doğru hesapları bile tehlikeli kılar. Marine Expert içinde bu konu, yalnızca “büyük–küçük ölçek” tanımıyla geçiştirilirse kullanıcı, liman yaklaşımını kıyı haritasıyla yönetmeye çalışır veya küçük ölçekli haritada görünmeyen tehlikeyi yok sanır. Bu nedenle ölçek, tanım olarak değil; **hangi safhada hangi harita ile karar verileceğini öğreten bir refleks** olarak sunulmalıdır. Bu refleks oluştuğunda harita, pasif bir çizim değil, aktif bir seyir aracı hâline gelir.`
      }
    ]
  },
  "Büyük Daire ve Rhumb Line Seyri": {
    title: "Büyük Daire ve Rhumb Line Seyri",
    introduction:
      "Büyük daire, küre üzerinde iki mevki arasındaki **en kısa yüzey mesafesini** verir; rhumb line (loxodrome) ise Mercator projeksiyonunda **düz çizgi** olarak görünen ve tüm rota boyunca **sabit kurs** ile ilerlenen hattır. Rhumb line yönetimi daha kolaydır; büyük daire ise çoğu durumda daha kısa mesafe sağlar. Pratik seyirde karar yalnızca mesafe değil; meteoroloji, trafik, emniyet ve operasyonel kısıtlarla birlikte verilir.",
    sections: [
      {
        title: "Kavramsal Karşılaştırma",
        content: `Büyük dairede kurs sürekli değişir; rhumb line’da kurs sabittir. Bu nedenle büyük daire “yakıt ve süre” avantajı, rhumb line ise “uygulama sadeliği” avantajı sunar. Modern ECDIS ve rota planlama sistemleri, büyük daireyi ara noktalara bölerek rhumb line segmentleri şeklinde uygular; böylece sahada **hibrit** bir yöntem ortaya çıkar.

![Büyük daire ve rhumb line görünümü](https://www.mathworks.com/help/map/tutor4.png)

![Büyük daire ve rhumb line karşılaştırması](https://mapscaping.com/wp-content/uploads/2024/09/image-684.png)

![Mesafe farkı görsel karşılaştırma](https://astrolabesailing.com/wp-content/uploads/2014/10/distances.jpg)`
      },
      {
        title: "Büyük Daire Mesafesi",
        content: `İki mevki arasındaki büyük daire mesafesi için temel bağıntı:

▭ **cos θ = sin φ₁ × sin φ₂ + cos φ₁ × cos φ₂ × cos Δλ**  
▭ **Büyük daire mesafesi = θ × 60 deniz mili**

Bu ifade, büyük daire tarafının **referans mesafesini** verir.`
      },
      {
        title: "Rhumb Line Kursu ve Mesafesi",
        content: `Rhumb line, Mercator projeksiyonda düz çizgidir. Kurs sabittir ve aşağıdaki bağıntıyla belirlenir:

▭ **tan C = Δλ / Δψ**

Burada **Δψ**, meridyen parçaları farkına karşılık gelen Mercator enlemi farkıdır. Matematiksel temeli:

▭ **ψ = ln [ tan (45° + φ/2) ]**

Mesafe için pratik ilişki:

▭ **Rhumb line mesafesi = ΔLat (dakika) / cos C**  
(ΔLat sıfıra yakınsa doğu–batı ağırlıklı rotalarda farklı yaklaşım gerekir.)`
      },
      {
        title: "Sayısal Karşılaştırma – Aynı İki Mevki",
        content: `**Başlangıç:** 35° N, 020° W  
**Varış:** 50° N, 010° E  
▭ φ₁ = 35°, φ₂ = 50°, Δλ = 30°

### A) Büyük Daire Mesafesi

▭ sin 35° ≈ 0.574  
▭ sin 50° ≈ 0.766  
▭ cos 35° ≈ 0.819  
▭ cos 50° ≈ 0.643  
▭ cos 30° ≈ 0.866

▭ cos θ = (0.574 × 0.766) + (0.819 × 0.643 × 0.866)  
▭ cos θ ≈ 0.440 + 0.456  
▭ cos θ ≈ 0.896  
▭ θ ≈ 26.5°

▭ **Büyük daire mesafesi ≈ 26.5 × 60 = 1590 deniz mili**

### B) Rhumb Line Mesafesi (Pratik Yaklaşım)

▭ ΔLat = 50° − 35° = 15°  
▭ ΔLat = 15 × 60 = 900 dakika

▭ ψ₁ = ln [ tan 62.5° ] ≈ ln(1.92) ≈ 0.653  
▭ ψ₂ = ln [ tan 70° ] ≈ ln(2.747) ≈ 1.011  
▭ Δψ ≈ 0.358

▭ Δλ = 30° = 30 × π/180 ≈ 0.524 radyan  
▭ tan C = 0.524 / 0.358 ≈ 1.464  
▭ C ≈ 55.7°

▭ cos 55.7° ≈ 0.563  
▭ **Rhumb line mesafesi ≈ 900 / 0.563 ≈ 1598 deniz mili**

### Sonuç

▭ Büyük daire ≈ **1590 deniz mili**  
▭ Rhumb line ≈ **1598 deniz mili**  
▭ Fark ≈ **8 deniz mili**`
      }
    ]
  },
  "Mercator projeksiyonu": {
    title: "Mercator Projeksiyon",
    introduction: "Mercator projeksiyon, deniz haritalarında kullanılan ve seyir hesaplarının temelini oluşturan matematiksel harita projeksiyonudur. Bu projeksiyonun denizcilikte tercih edilmesinin nedeni estetik ya da coğrafi doğruluk değil, **seyirsel doğruluktur**. Mercator projeksiyon, yön ve doğrultu ilişkilerini korur; bu sayede denizcilikte kullanılan rota, kerteriz, mesafe ve mevki işlemleri harita üzerinde **doğrudan ve tutarlı** biçimde yapılabilir.",
    sections: [
      {
        title: "Silindirik Yapı ve Haritaya Aktarım",
        content: `Mercator projeksiyonda dünya, ekvatora teğet bir silindirin içine yerleştirilmiş gibi düşünülür. Dünya üzerindeki enlem ve boylamlar bu silindire aktarılır ve silindir açılarak düz bir harita hâline getirilir. Bu işlem sonucunda meridyenler birbirine paralel ve eşit aralıklı dikey çizgiler olarak, paraleller ise yatay çizgiler olarak görünür.

![Mercator projeksiyon temel görünüm](https://cdn.britannica.com/55/109155-050-9FE4B08C/simple-cylindrical-projection-earth-map-globe-mercator.jpg)

![Mercator projeksiyon silindir düzleştirme](https://www.math.ubc.ca/~israel/m103/mercator.png)

![Mercator projeksiyon harita örneği](https://sailingissues.com/chart-symbols/mercator-projection-navigation-course-3x.png)`
      },
      {
        title: "Mercator Projeksiyonun Temel Geometrisi",
        content: `Mercator projeksiyonun en ayırt edici özelliği, **meridyenlerin paralel ve eşit aralıklı**, paralellerin ise enleme gidildikçe **açılarak** çizilmesidir. Ekvatora yakın bölgelerde paraleller birbirine yakındır; kutuplara yaklaştıkça paraleller arasındaki mesafe artar. Bu bilinçli bir bozulmadır ve projeksiyonun matematiksel sonucudur.

Bu yapı sayesinde iki kritik seyir özelliği sağlanır:

Birincisi, **hakiki rota (loxodrome)** harita üzerinde düz çizgi olarak görünür.  
İkincisi, **enlem skalası mesafeyle doğru orantılıdır**.

Bu iki özellik, Mercator projeksiyonu denizcilik için vazgeçilmez kılar.

![Mercator projeksiyon temel görünüm](https://cdn.britannica.com/55/109155-050-9FE4B08C/simple-cylindrical-projection-earth-map-globe-mercator.jpg)

![Mercator projeksiyon silindir düzleştirme](https://www.math.ubc.ca/~israel/m103/mercator.png)`
      },
      {
        title: "Doğrultu Korunumu ve Loxodrome Mantığı",
        content: `Mercator projeksiyonda sabit bir hakiki rota ile seyreden bir geminin izi, harita üzerinde **düz bir çizgi** olarak temsil edilir. Bu çizgiye loxodrome denir. Seyirde rota çizimi, rota ölçümü ve rota takibi bu nedenle Mercator haritalarda doğrudan yapılabilir.

Bu özellik, seyir açısından kritiktir. Çünkü denizci köprüüstünde şu varsayımla çalışır:  
“Harita üzerinde çizdiğim doğrultu, denizde tuttuğum doğrultuyla aynıdır.”

Bu varsayım yalnızca Mercator projeksiyonda geçerlidir. Açı korunumu sayesinde, harita üzerindeki her açı gerçek dünyadaki açıya eşittir. Bu da kerteriz ölçümlerinin ve rota açılarının harita üzerinde doğrudan kullanılabilmesini sağlar.

![Loxodrome ve Mercator ilişkisi](https://gisgeography.com/wp-content/uploads/2016/11/RhumbLine-Loxodrome-Mercator.jpg)

![Mercator'da rhumb line çizimi](https://www.researchgate.net/publication/268872013/figure/fig3/AS%3A392212723585029%401470522208424/The-Mercator-map-projection-The-rhumb-lines-show-as-straight-lines.png)`
      },
      {
        title: "Mesafe Ölçümü ile Mercator Projeksiyon İlişkisi",
        content: `Mercator projeksiyonda mesafe ölçümü, yalnızca **enlem skalası** üzerinden yapılır. Bunun matematiksel temeli, projeksiyonun enlem doğrultusunda ölçeği bilinçli olarak genişletmesidir. Bu genişleme, enlem skalasını mesafe için güvenilir referans hâline getirir.

Tanım gereği:

1 dakika enlem = 1 deniz mili

Bu nedenle harita üzerindeki iki nokta arasındaki mesafe, divider ile ölçülür ve enlem skalasına taşınarak okunur. Boylam skalası mesafe ölçümünde kullanılmaz; çünkü Mercator projeksiyonda boylam aralıkları sabit uzunluk temsil etmez.

![Mercator projeksiyon mesafe ölçüm görseli](https://i.sstatic.net/Oh0ob.jpg)

![1 dakika enlem = 1 deniz mili görseli](https://easysextant.com/wp-content/uploads/2024/08/definition-mile.jpg.webp)`
      },
      {
        title: "Alan ve Şekil Bozulması",
        content: `Mercator projeksiyon, yön ve açıları korurken **alanları korumaz**. Enlemler büyüdükçe alanlar harita üzerinde gerçekte olduklarından çok daha büyük görünür. Kutuplara yaklaştıkça bu büyüme sonsuza gider; bu nedenle kutuplar Mercator haritalarda gösterilmez.

Bu bozulma, seyir açısından bir hata değildir; çünkü denizcilikte alan karşılaştırması değil, **yön, mesafe ve doğrultu** esastır. Ancak bu özellik bilinmezse, yüksek enlemlerde harita yorumlanırken sezgisel hatalar yapılabilir.

![Mercator alan bozulması](https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Mercator_projection_Square.JPG/1200px-Mercator_projection_Square.JPG)

![Greenland boyut yanılsaması](https://www.geospatialworld.net/wp-content/uploads/2017/05/Greenland_1.jpg)`
      },
      {
        title: "Mercator Projeksiyonun Seyirdeki Sınırları",
        content: `Mercator projeksiyon, orta ve düşük enlemlerde seyir için idealdir. Ancak yüksek enlemlerde paralellerin aşırı açılması, ölçek bozulmasını büyütür ve harita kullanımı pratik olmaktan çıkar. Bu nedenle kutup bölgelerinde farklı projeksiyonlar tercih edilir.

Bununla birlikte ticari denizciliğin büyük bölümü Mercator projeksiyonlu haritalar üzerinde yürütülür ve klasik seyir öğretisi bu projeksiyon üzerine kuruludur.

![Mercator projeksiyonda kare bozulması](https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Mercator_projection_Square.JPG/1200px-Mercator_projection_Square.JPG)

![Mercator projeksiyonda bozulma örneği](https://upload.wikimedia.org/wikipedia/commons/7/73/Mercator_projection_Square.JPG)`
      },
      {
        title: "Mercator Projeksiyonun Seyir Hesaplarına Etkisi",
        content: `Rota ölçümü, mesafe ölçümü, ölü hesap mevkii ilerletme, kerteriz kesişimi ve harita üzerinden yapılan tüm klasik seyir hesapları Mercator projeksiyon varsayımıyla çalışır. Bu projeksiyon olmadan, harita üzerindeki düz çizgi ile denizde tutulan rota arasında doğrudan bir ilişki kurulamazdı.

Bu nedenle Mercator projeksiyon, denizcilikte bir “harita türü” değil; **seyir matematiğinin çalıştığı zemin** olarak kabul edilir.

![Mercator projeksiyon seyir kullanımı](https://sailingissues.com/chart-symbols/mercator-projection-navigation-course-3x.png)

![Mercator projeksiyon seyir hesabı görseli](https://sidaerum.com/wp-content/uploads/2023/02/FRM-62_3.png)`
      }
    ]
  },
  "Harita sembolleri ve kısaltmalar": {
    title: "Harita Sembolleri ve Kısaltmalar",
    introduction: "Deniz haritasındaki semboller ve kısaltmalar, nesneleri çizmek için değil, seyir sırasında doğru kararı en kısa sürede verdirmek için kurulmuş standart bir dildir. Harita, gerçek dünyayı fotoğraf gibi çoğaltmaz; emniyetli suyun nerede bulunduğunu, tehlikenin neyi temsil ettiğini, bir hattın nasıl tutulacağını, hangi alanın hukuken veya operasyonel olarak kısıtlı olduğunu tek bakışta çözülecek şekilde kodlar. Bu dilin yükünü en çok taşıyan unsurlar şamandıralar, fenerler ve diğer seyir yardımcılarıdır; çünkü hem mevki doğrulamada hem de emniyetli geçişte doğrudan kullanılırlar.",
    sections: [
      {
        title: "Harita dilinin amacı ve temel okuma mantığı",
        content: "Bir işaretin anlamı yalnız renk veya isimle bitmez; şekil, üst marka, ışık karakteri, ses işareti, radar/elektronik tanıtıcıları ve haritadaki kısaltma dizilimi birlikte okunur. “Aşırı detay” gibi görünen bu yapı, pratikte tereddütü azaltıp kazayı engellemek için vardır; bu başlık ezberletmek için değil, sahada karar verdiren bir dil gibi öğretilmelidir.",
        image: "https://www.skippertips.com/members/images/211c.png?cb=20250701053020",
        imageAlt: "Deniz haritası sembolleri örneği"
      },
      {
        title: "Sembol standardı: Chart No.1",
        content: "Chart No.1, deniz haritalarında kullanılan sembollerin ve kısaltmaların standart referansıdır. Eğitimde ve pratik okumada bu görsel dilin aynı şekilde anlaşılması için temel kaynaktır.",
        image: "https://nauticalcharts.noaa.gov/updates/wp-content/uploads/2019/05/Chart-No-1.jpg",
        imageAlt: "Chart No.1 sembol standardı"
      },
      {
        title: "IALA sistemi ve şamandıra mantığı",
        content: "Şamandıra sistemi IALA düzenine göre yorumlanır ve dünya iki ana bölgeye ayrılır. Türkiye ve Avrupa suları IALA Bölge A mantığını kullanır; limana girişte kırmızı iskelede, yeşil sancakta kalır. Buradaki kritik nokta, bu ifadenin bir renk cümlesi değil, bir geçiş talimatı olmasıdır. Aynı renk farklı bölgede farklı tarafı ifade edebildiği için haritadaki bir şamandıra sembolünü gördüğünde ilk refleks, “hangi IALA bölgesindeyim” sorusunu içgüdü hâline getirmektir. Harita şamandırayı çoğu zaman bir nokta gibi çizse bile, o nokta bir koridorun kenarını, bir tehlikenin dolaşma yönünü veya yaklaşım hattının teyidini temsil eder; dolayısıyla sembolün amacı bilgi vermek değil, hareket ettirmektir.",
        image: "https://sailtrain.org.uk/wp-content/uploads/2017/10/iala_buoys_channel.jpg",
        imageAlt: "IALA şamandıra mantığı"
      },
      {
        title: "IALA A şamandıra örnekleri",
        content: "IALA A bölgesinde renk, şekil ve üst marka bir bütün hâlinde okunur. Limana girişte kırmızının iskelede kalması kuralı, sahada doğrudan bir geçiş talimatına dönüşür.",
        image: "https://safe-skipper.com/wp-content/uploads/2015/11/IALA-A-buoyage.jpg",
        imageAlt: "IALA A şamandıra düzeni"
      },
      {
        title: "Lateral işaretler ve haritadaki gösterimi",
        content: "Lateral işaretler, bir kanalın veya geçiş hattının kenarlarını tarif eder ve emniyetli suyu çizgisel olarak tanımlar. IALA A’da iskele işareti kırmızıdır ve tipik olarak silindirik (can) biçim ve buna karşılık gelen üst marka mantığını taşır; sancak işareti yeşildir ve tipik olarak konik (conical) biçim ve üst marka mantığı ile eşleştirilir. Haritada lateral işaretin sembolü, bunun şamandıra mı yoksa sabit beacon mı olduğunu, ışıklı mı ışıksız mı olduğunu ve bazen işaretin karakterini tek bakışta ayırmaya yarayacak şekilde çizilir. Lateral işaretin ışığı varsa haritada yanında ışık karakteristiği yazılır; bu yazı “yanıyor” demek değildir, gece ayırt etmenin şifresidir.",
        image: "https://sailingissues.com/light/lateral-marks-IALA-A-3x.png",
        imageAlt: "Lateral işaretler ve ışıkları"
      },
      {
        title: "Lateral ışık karakterlerini okuma",
        content: "Bir lateral işareti okurken pratik karar akışı, önce işaretin türü ve rengi, sonra varsa şekli ve üst markası, ardından ışık karakteri ve periyodu, en son nominal görünme mesafesi mantığıyla çözülür. Haritada “Fl R 5s” kırmızı çakarlı ışığın 5 saniyelik periyotla tekrar ettiğini anlarsın. “Q G” hızlı çakarlı yeşil ışığı ifade eder. “Oc” ışığın çoğunlukla yandığı, kısa süre söndüğü karakterdir. “Iso” yanma ve sönme sürelerinin eşit olduğunu anlatır. Aynı bölgede birden fazla ışıklı işaret varken bu ayrım, “hangisi hangisi” sorusunu saniyeler içinde çözer. Gece gözlemin haritadaki ritimle uyuşmaması, çoğu kazada ilk işarettir; burada doğru refleks, rotayı körlemesine düzeltmek değil, varsayımı sorgulayıp işareti yeniden teşhis etmektir.",
        image: "https://marinegyaan.com/wp-content/uploads/2016/06/Untitled-14.jpg",
        imageAlt: "Lateral şamandıra şekil eşleşmeleri"
      },
      {
        title: "Kardinal işaretler ve emniyetli su yönü",
        content: "Kardinal işaretler kanal kenarı anlatmaz; bir tehlikenin çevresinde emniyetli su yönünü tarif eder. Mantık yönseldir: kuzey kardinali tehlikenin kuzeyinden geç der, doğu kardinali doğusundan geç der, güney kardinali güneyinden geç der, batı kardinali batısından geç der. Bu işaretlerin haritadaki sembolü renk bandını ve üst markayı ima eder; fakat sahada en kritik kısım gece tanımadır, çünkü ışık ritmi yön bilgisini taşır.",
        image: "https://upload.wikimedia.org/wikipedia/commons/a/a7/Cardinal_Marks.gif",
        imageAlt: "Kardinal işaretlerin renk ve üst marka mantığı"
      },
      {
        title: "Kardinal ışık imzaları",
        content: "Kuzey kardinal, pratikte “kesintisiz seri” hissi veren bir ritimle tanınır ve haritada çoğunlukla Q veya VQ ile ifade edilir. Doğu kardinalin imzası üçlü gruptur; Fl(3), Q(3) veya VQ(3). Güney kardinalin imzası altılı grup artı uzun çakardır; Q(6)+LFl veya VQ(6)+LFl. Batı kardinalin imzası dokuzlu gruptur; Q(9) veya VQ(9). Haritada bir kardinal işaret yanında “VQ(6)+LFl 15s” yazdığını düşünelim. Bu ifade güney kardinali işaret eder. 15 saniyelik periyot içinde altı kısa çok hızlı çakar ve bir uzun çakar vardır; düzen tekrar eder. Buradaki doğru karar, “işareti nasıl bırakırım” gibi slogan düzeyinde değil, “tehlikenin güneyinden emniyetli geçiş yapılır” mantığıyla verilir. Harita üzerindeki tehlike sembolüyle birlikte okunduğunda, geçiş hattı netleşir.",
        image: "https://sailingissues.com/light/cardinal-buoys%2Blights-3x.png",
        imageAlt: "Kardinal ışık karakterleri"
      },
      {
        title: "İzole tehlike, emniyetli su ve özel işaretler",
        content: "İzole tehlike işareti, çevresinde dolaşılabilir su bulunan tekil bir tehlikeyi işaret eder; batık, kaya, sığlık gibi “noktadan” doğan riskler için kullanılır. Harita sembolünde bu işaret, tehlikenin üzerinde veya hemen yanında görülür ve ışık karakteri çoğu kez “Fl(2) W” şeklinde yazılır; iki beyaz çakar, gece ayırt etmenin en güçlü imzasıdır. Bu işaretin verdiği mesaj “burada tekil bir tehlike var, etrafı dolaşılabilir”dir; emniyetli taraf, yerel derinlik, izobatlar ve geminin draft’ı ile birlikte seçilir.",
        image: "https://www.zazbuoys.com/static/upload/image/20250815/1755250955703110.jpg",
        imageAlt: "İzole tehlike işareti"
      },
      {
        title: "Emniyetli su işareti örneği",
        content: "Emniyetli su işareti, kanal orta hattını, yaklaşım hattını veya çevresi emniyetli suyu tarif eden bir referans noktayı işaret eder. Haritada kırmızı-beyaz dikey bantlı görünümü çağrıştıran sembolle ve beyaz ışık karakteristiğiyle gösterilir; Iso, Oc veya LFl gibi karakterler sık görülür. Bu işaretin değeri, “geçiş talimatı” vermekten çok “doğru yerdeyim” teyidi sağlamasıdır; yaklaşımda hedeflenen hattın üzerinde olunduğunu güçlü biçimde doğrular.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Limfjord_safe_water_mark.jpg/250px-Limfjord_safe_water_mark.jpg",
        imageAlt: "Emniyetli su işareti"
      },
      {
        title: "Özel işaretler ve kullanım mantığı",
        content: "Özel işaretler sarı renkle gösterilir ve seyir emniyetinden ziyade “özel amaçlı alanı” ifade eder; kablo sahası, askeri saha sınırı, ölçüm alanı, yarış parkuru gibi. Haritada sarı işaret genellikle alan taraması ve kısaltmalarla birlikte gelir; mesaj, “burada bir düzenleme/aktivite var, planlamanı buna göre yap” şeklindedir. Özel işaretin ışığı varsa genellikle sarıdır ve karakteri yerel ihtiyaca göre değişir."
      },
      {
        title: "Fenerler ve ışık kısaltmaları",
        content: "Haritalarda fener bilgisi, kısa bir kısaltma dizisiyle verilir ve bu dizide her parça farklı bir gerçeği taşır. Fl çakarlı, Oc örtmeli, Iso eşit aralıklı, LFl uzun çakarlı, F sabit ışığı ifade eder. Q hızlı çakar, VQ çok hızlı çakar anlamına gelir; bunlar özellikle kardinal ve yaklaşım işaretlerinde gece ayırt etmenin bel kemiğidir. Al alternatif, Mo mors, Dir yönlü ışık gibi ifadeler de haritada görülebilir. Renkler W, R, G, Y harfleriyle yazılır ve çoğu kez karakterin yanında yer alır.",
        image: sembolLightCharacteristics,
        imageAlt: "Işık karakteristikleri"
      },
      {
        title: "Işık periyodu ve doğrulama mantığı",
        content: "Işık periyodu saniye cinsinden verilir. “Fl(3) 15s” ifadesi, üçlü çakar grubunun 15 saniyede bir tekrar ettiğini anlatır. Buradaki doğru yaklaşım periyodu saymak değil, gözle görülen ritmin haritadaki imzayla eşleşip eşleşmediğini doğrulamaktır. Eşleşmiyorsa iki ihtimal vardır: yanlış ışığa bakılıyordur veya mevki varsayımı hatalıdır; bu ikisi de gece seyirde kaza üretir."
      },
      {
        title: "Görünme mesafesi ve ufuk mesafesi",
        content: "Işıkların görünme mesafesi çoğu zaman deniz mili cinsinden verilir ve “12M” gibi yazılır. Bu değer nominal bir kavramdır; atmosferik şartlar, fon ışıkları ve görüş bunu etkiler. Ancak ışığı görüp görememenin bir diğer sert sınırı ufuk mesafesidir; bu da yükseklikle hesaplanır ve haritada fener yüksekliği çoğu kez metre cinsinden verilir. Geographical range hesabında pratik bağıntı şu şekilde kurulur. Seyirde iki sınır birlikte düşünülür; küçük olan sınır geçerlidir.",
        formula: {
          text: "D = 2,08 × ( √h1 + √h2 )",
          description: "D deniz mili cinsinden ufuk mesafesidir. h1 fener yüksekliğini, h2 göz yüksekliğini metre cinsinden temsil eder. h1=20 m ve h2=9 m alınırsa D ≈ 15,54 M olur; nominal range 12M ise sınırlayıcı parlaklıktır, 18M ise geometrik sınır 15,5 M’de devreye girer."
        }
      },
      {
        title: "Sektör ışıkları ve leading lights",
        content: "Sektör ışıkları, tek bir fenerin farklı yönlere farklı renk göstermesiyle güvenli sektör mantığı kurar. Haritada sektörler yaylar ve renk bantlarıyla gösterilir; çoğu uygulamada beyaz sektör emniyetli hattı, kırmızı sektör tehlike tarafını, yeşil sektör diğer sınırı anlatır ve ayrıntı haritadan okunur. Bu sistemin pratik değeri, özellikle yaklaşımda güvenli koridorun bir ışık üzerinden tutulabilmesidir.",
        image: sembolSectorLights,
        imageAlt: "Sektör ışıkları örneği"
      },
      {
        title: "Leading lights örneği",
        content: "Leading lights, iki ayrı fenerin aynı doğrultuda hizalanmasıyla bir range oluşturur. Haritada iki ışık sembolü ve aralarındaki hat çizgisiyle gösterilir. Gemide iki ışık üst üste geldiğinde hat üzerindesindir; biri sağa kayarsa hattın bir tarafına, sola kayarsa diğer tarafına çıkmışsındır. Dar yaklaşım kanallarında bu yöntem, pusula değerinden daha hızlı ve daha güvenilir bir hat tutma teyidi üretir.",
        image: "https://safe-skipper.com/wp-content/uploads/2020/06/leading-lights.jpg",
        imageAlt: "Leading lights örneği"
      },
      {
        title: "Radar ve elektronik tanıtıcılar: RACON, AIS AtoN",
        content: "Haritalarda bazı işaretler yalnız gözle değil, radar ve AIS üzerinden tanınacak şekilde donatılmıştır. RACON, radar ekranında mors kodlu bir yanıt üreten işarettir ve haritada özel bir sembolle gösterilir; mesajı, “radarda şu imzayı vereceğim”dir. AIS AtoN ise AIS üzerinden fiziksel veya sanal seyir yardımını yayınlar; haritada bu bilgi ilgili işaretin yanında belirtilir.",
        image: "https://marinegyaan.com/wp-content/uploads/2016/06/RACON.jpg",
        imageAlt: "RACON örneği"
      },
      {
        title: "AIS AtoN ve harita sembolleri",
        content: "Bu semboller elektronik seyirde mevki doğrulama ve hedef teşhisini güçlendirir; ancak yanlış yorumlandığında “radarda gördüğüm doğru şey mi” sorusunu yanıtsız bırakır ve hatalı teşhis zinciri oluşturur.",
        image: "https://marine-charts.com/wp-content/uploads/Abbreviations-symbols-used-nautical-charts-1.jpg",
        imageAlt: "Harita sembolleri ve kısaltmalar örneği"
      },
      {
        title: "Tehlike sembolleri: kayalar, sığlıklar, batıklar",
        content: "Kayalar ve sığlıklar, harita dilinde “su üstünde, su seviyesinde, su altında” ayrımıyla anlatılır. Bir kayanın sürekli su üstünde olmasıyla, dalgaya bağlı olarak örtünüp açılması veya tamamen su altında kalması aynı değildir; sembol bu farkı taşır. Sığlıkların tarama deseni ve izobat yapısı, geminin draft’ı ile birlikte riskin büyüklüğünü belirler. Batıklar da aynı şekilde tek tip değildir; bazıları üzerinde yeterli su bulunan bilgi batığı gibi gösterilirken, bazıları tehlikeli batık olarak vurgulanır ve çoğu kez en az derinlik değeri belirtilir. Least depth bilgisi varsa, bu sayı batığın en sığ noktasındaki suyu temsil eder ve planlamada doğrudan kullanılır.",
        image: "https://charts.gc.ca/images/publications/chart1-carte1/k-rocks/k12-iho.svg",
        imageAlt: "Kaya sembolleri örnekleri"
      },
      {
        title: "Sığlık ve batık örnekleri",
        content: "Bu bölümdeki en yaygın hata, tek bir sembolü mutlak tehlike sanmaktır. Haritada tehlikenin türü, derinlik rakamı, izobatların sıkılığı, bölgenin tarama kalitesi ve geminin su çekimi birlikte değerlendirilmeden karar verilmez. Harita dili tek işaretle hüküm vermez; bağlamla hüküm verir.",
        image: "https://www.skippertips.com/members/images/831b.jpg?cb=20250701052844",
        imageAlt: "Sığlık ve batık sembolleri"
      },
      {
        title: "Kısaltmaların pratik okunuşu ve hızlı doğrulama",
        content: "Bir fener yanında “Fl(2) W 10s 18m 15M” yazıyorsa, iki beyaz çakarın 10 saniyede bir tekrar ettiğini, ışığın 18 metre yükseklikte olduğunu ve nominal görünme mesafesinin 15 deniz mili olduğunu anlarsın. Gece vardiyasında gördüğün ritmi bu imzayla doğrular, mevki varsayımını güçlendirirsin. Bir işaret yanında “Q(9) 10s” görürsen bunun batı kardinal imzası olduğunu bilip, haritadaki tehlikeyi batısından dolaşma kararını netleştirirsin. Bir yaklaşımda leading lights ve range hattını görürsen, iki ışığı hizalayıp hattın üzerinde kalma disiplinini uygularsın; bu, çoğu durumda pusula sayısından daha güçlü bir doğrulama üretir."
      }
    ],
    keyPoints: [
      "Harita sembolleri bilgi vermekten çok doğru hareketi tetiklemek için tasarlanır",
      "IALA bölgesi ilk refleks olmalıdır; renkler bölgeye göre değişebilir",
      "Lateral ve kardinal işaretlerin ışık ritimleri gece tanımada belirleyicidir",
      "Emniyetli su ve izole tehlike işaretleri, mevki doğrulamada kritik rol oynar",
      "Semboller, derinlik değerleri ve geminin draft’ı birlikte değerlendirilmelidir"
    ]
  },
  "Harita düzeltmeleri (Notice to Mariners)": {
    title: "Harita Düzeltmeleri (Notice to Mariners)",
    introduction: "Harita düzeltmeleri, basılı bir deniz haritasının yayımlandığı tarihten sonra deniz ortamında meydana gelen değişikliklerin, harita üzerine **manuel olarak işlenmesi** işlemidir. Bir deniz haritası basıldığı anda eskimeye başlar; çünkü denizcilik altyapısı sabit değildir. Şamandıralar yer değiştirir, fenerlerin ışık karakterleri güncellenir, yeni batıklar tespit edilir, derinlikler yeniden ölçülür ve bazı alanlar hukuki olarak kısıtlanır veya serbest bırakılır. Harita bu değişiklikleri kendi kendine yansıtmaz. Bu nedenle düzeltmesi yapılmamış bir harita, üzerinde doğru rota ve hesap yapılsa bile seyir açısından **geçerli kabul edilmez**.",
    sections: [
      {
        title: "Harita Düzeltmeleri",
        content: `![Image](https://www.celestaire.com/wp-content/uploads/cm/images/stories/virtuemart/product/Chart_Correction_5088aae37cd311.jpg)

![Image](https://www.captainsnautical.com/cdn/shop/products/6162b6a837c4431f5ed98448a11171d3_2000x.png?v=1571461279)

![Image](https://marine-charts.com/wp-content/uploads/symbols-abbreviations-terms-navigational-charts-3-665x461-1.jpg)`
      },
      {
        title: "Harita Düzeltmelerinin Kaynağı",
        content: `Harita düzeltmeleri, resmî olarak yayımlanan **Notice to Mariners** bültenleri aracılığıyla yapılır. Bu bültenler, hangi haritanın etkilendiğini, değişikliğin türünü, coğrafi mevkiini ve harita üzerinde nasıl gösterileceğini açık şekilde belirtir. Her düzeltme numaralandırılmıştır ve tarih taşır. Bir haritanın geçerli sayılabilmesi için, yayımlanan en son Notice to Mariners’a kadar olan tüm düzeltmelerinin harita üzerine işlenmiş olması gerekir.

![Image](https://www.captainsnautical.com/cdn/shop/products/6162b6a837c4431f5ed98448a11171d3_2000x.png?v=1571461279)

![Image](https://jrramos84.weebly.com/uploads/2/1/1/8/21185574/7642529_orig.gif)`
      },
      {
        title: "Harita Düzeltme Türleri",
        content: `Harita düzeltmeleri üç ana grupta ele alınır ve her biri harita üzerinde farklı disiplinle işlenir.

**Kalıcı düzeltmeler**, uzun süreli veya kalıcı değişiklikleri kapsar. Yeni bir şamandıranın eklenmesi, bir fenerin yerinin veya ışık karakterinin değiştirilmesi, yeni bir batığın haritaya eklenmesi bu gruba girer. Bu düzeltmeler harita üzerine **kalıcı olarak** işlenir ve silinmez.

**Geçici düzeltmeler**, belirli bir süre için geçerli olan değişikliklerdir. Geçici olarak kaldırılan bir şamandıra, geçici çalışma alanı veya kısa süreli kısıtlamalar bu kapsamdadır. Harita üzerinde geçici olduğu açıkça anlaşılacak şekilde gösterilir ve süresi dolduğunda kaldırılır.

**Ön bilgi düzeltmeleri**, henüz kesinleşmemiş ancak seyri etkileyebilecek bilgiler için yayımlanır. Planlanan inşaatlar, ileride değişmesi beklenen düzenlemeler bu gruptadır. Harita üzerinde uyarı niteliğinde yer alır.

![Image](https://www.celestaire.com/wp-content/uploads/cm/images/stories/virtuemart/product/Chart_Correction_5088aae37cd311.jpg)

![Image](https://mdnautical.com/23949/chart-correction-kit-3rd-edition.jpg)`
      },
      {
        title: "Harita Üzerinde Düzeltme İşleme Usulü",
        content: `Bir harita düzeltmesi işlenirken amaç, haritayı yeniden çizmek değil; **mevcut bilgiyi doğru sembolle güncellemektir**. Önce düzeltmenin ilgili olduğu harita numarası kontrol edilir. Ardından düzeltmenin türü belirlenir. Kalıcı düzeltmeler harita üzerinde kalıcı şekilde işlenir, geçici ve ön bilgi düzeltmeleri ise geçici nitelikte gösterilir. Harita üzerindeki eski bilgi tamamen iptal edilir; eski sembolün üzerine ekleme yapılmaz.

Düzeltme tamamlandıktan sonra, haritanın kenar boşluğuna ilgili Notice to Mariners numarası ve tarihi yazılır. Bu kayıt, haritanın hangi tarihe kadar güncel olduğunu gösterir ve teknik olarak zorunludur.

![Image](https://www.alloutdoor.com/wp-content/uploads/2020/02/correctionchart-righthand.jpg)

![Image](https://sailingissues.com/vier/position-fix-nautical-chart-navigation-3x.png)`
      },
      {
        title: "Şamandıra Düzeltmeleri",
        content: `Şamandıra düzeltmeleri, seyir güvenliğini en doğrudan etkileyen harita düzeltmeleridir. Bir şamandıranın mevkiinin değişmesi, kaldırılması veya yeniden yerleştirilmesi durumunda, harita üzerindeki sembol tamamen iptal edilir ve yeni konum doğru sembolle işlenir. Eğer şamandıranın ışık karakteri, rengi veya tipi değişmişse, yalnızca sembol değil, **ilgili tüm tanımlayıcı bilgiler birlikte** güncellenir.

![Image](https://marine-charts.com/wp-content/uploads/nautical-chart-corrections-updates.jpg)

![Image](https://www.aurkacharts.net/wp-content/uploads/2023/09/20200323_130632.png)`
      },
      {
        title: "Fener ve Işık Karakteri Düzeltmeleri",
        content: `Bir fenerin ışık karakterinde yapılan değişiklik, harita düzeltmeleri içinde en kritik işlemlerden biridir. Eski ışık karakteri harita üzerinden tamamen kaldırılır ve yenisi doğru formatta yazılır. Bu işlem yapılmadan kullanılan bir harita, gece seyri için güvenilir değildir; çünkü fener tanıma mantığı doğrudan ışık karakterine dayanır.

![Image](https://lighthouses.wales/wp-content/uploads/2025/06/Screenshot-2025-06-11-170308-1.png)

![Image](https://shop.hamiltonmarine.com/inet/storefront/getimage.php?recid=87837)`
      },
      {
        title: "Derinlik, Batık ve Tehlike Düzeltmeleri",
        content: `Yeni yapılan taramalar sonucu derinlik değerleri değiştiğinde, eski değerler iptal edilir ve yenileri harita üzerine işlenir. Yeni tespit edilen batıklar ve kayalar, doğru sembol ve doğru konumla haritaya eklenir. Eğer batık için **least depth** bilgisi verilmişse, bu değer harita üzerinde açıkça gösterilir ve doğrudan draft hesaplarında kullanılır.

![Image](https://i1.wp.com/nauticalcharts.noaa.gov/updates/wp-content/uploads/2022/03/HuntingtonHarbourBefore.jpg?ssl=1)

![Image](https://www.skippertips.com/members/images/418b.jpg?cb=20250701052841)`
      },
      {
        title: "Harita Güncellik Kaydı",
        content: `Her deniz haritasının kenar boşluğunda, yapılan düzeltmelerin kaydedildiği bir alan bulunur. Bu alana, işlenen her Notice to Mariners numarası ve tarihi yazılır. Bu kayıtlar, haritanın teknik olarak güncel olup olmadığının tek kanıtıdır. Kayıt yoksa veya eksikse, harita seyirde kullanılabilir kabul edilmez.

![Image](https://www.captainsnautical.com/cdn/shop/products/6162b6a837c4431f5ed98448a11171d3_2000x.png?v=1571461279)

![Image](https://navyadministration.tpub.com/14220/img/14220_44_1.jpg)`
      }
    ],
    keyPoints: [
      "Düzeltmeler, Notice to Mariners bültenleriyle resmi olarak yayımlanır",
      "Kalıcı, geçici ve ön bilgi düzeltmeleri farklı şekilde işlenir",
      "Eski bilgi iptal edilir, yeni sembol doğru formatta eklenir",
      "Harita kenarındaki güncellik kaydı zorunludur",
      "Güncellenmemiş harita seyirde geçerli kabul edilmez"
    ]
  },
  "Mevki koyma": {
    title: "Mevki Koyma",
    introduction: "Mevki koyma, geminin deniz üzerindeki konumunun belirli bir zamana bağlı olarak deniz haritası üzerinde teknik kurallara uygun biçimde işaretlenmesi işlemidir. Seyirde alınan tüm kararlar — rota değişikliği, hız ayarlaması, emniyetli suya yönelme veya kaçınma manevrası — doğrudan bu mevki üzerinden şekillenir. Bu nedenle mevki koyma, çizgisel bir harita işlemi değil; matematik, geometri ve ölçüm disiplininin birleştiği temel bir seyir faaliyetidir. Kullanılan yöntemin doğruluğu, mevkinin karar üretme gücünü belirler.",
    sections: [
      {
        title: "Mevki Türleri ve Güvenilirlik Seviyeleri",
        content: `Denizcilikte mevki, kullanılan bilginin güvenilirliğine göre farklı sınıflarda değerlendirilir.

**Tahmini Mevki (Estimated Position – EP)**  
Gözlemsel veya ölçümsel bir doğrulama olmadan, yalnızca varsayıma dayalı olarak kabul edilen konumdur. Genellikle kötü görüş veya ölçüm yapılamayan anlarda kullanılır.

**Ölü Hesap Mevkii (Dead Reckoning – DR)**  
Bilinen bir son mevkiden itibaren rota, hız ve zaman kullanılarak hesaplanan mevkiyi ifade eder. Akıntı ve rüzgâr etkileri ihmal edilir.

**Kesin Mevki (Fix)**  
İki veya daha fazla bağımsız ölçümün kesişimiyle elde edilir. Kerteriz kesişimi, mesafe–kerteriz kombinasyonu ve elektronik mevki bu sınıfa girer.

![Mevki koyma örneği](https://sailingissues.com/vier/position4.png)

![Tahmini mevki şeması](https://www.nomadsailing.co.uk/images/easyblog_articles/23/b2ap3_amp_Estimated-Position.JPG)

![Mevki işaretleme örneği](https://usercontent.one/wp/www.getlostpowerboattraining.com/wp-content/uploads/2020/03/Screenshot-2020-03-28-at-14.21.05-1024x575.png?media=1759652400)

![Kerteriz kesişimi örneği](https://sailingissues.com/vier/crossbear2.png)`
      },
      {
        title: "Ölü Hesap Mevkii ile Mevki Koyma",
        content: `Ölü hesap mevkii, düzlem seyirde en temel ve en sık kullanılan mevki koyma yöntemidir. Mantık, düzgün doğrusal hareket varsayımına dayanır.

**Temel Bağıntı**  
Mesafe = Hız × Zaman

**Uygulama Mantığı**  
Bilinen bir başlangıç mevkiinden itibaren geminin sabit bir hakiki rota ile sabit hızda seyir yaptığı kabul edilir. Bu süre sonunda alınan mesafe, rota doğrultusunda harita üzerine taşınarak yeni mevki bulunur.

**Örnek**  
Hız 12 knot, hakiki rota 075° ve süre 2 saat ise:  
Mesafe = 12 × 2 = 24 deniz mili

![Ölü hesap görseli](https://www.nomadsailing.co.uk/images/easyblog_articles/23/b2ap3_large_Estimated-Position.JPG)

![DR uygulama şeması](https://image.jimcdn.com/app/cms/image/transf/none/path/sd6ea49279f075268/image/ia488bbe2ca937abc/version/1604740630/image.png)`
      },
      {
        title: "Kerteriz Kesişimi ile Kesin Mevki",
        content: `Kerteriz kesişimi, kesin mevki elde etmenin klasik ve güvenilir yöntemlerinden biridir. Sabit cisimlerden alınan hakiki kerterizlerin harita üzerinde kesiştirilmesine dayanır.

**Temel Bağıntı**  
Hakiki Kerteriz = Hakiki Rota + Nispi Kerteriz

**Uygulama**  
Gemiden görülebilen ve harita üzerinde yeri kesin olan en az iki sabit cisim seçilir. Bu cisimlere ait hakiki kerterizler alınır. Harita üzerinde bu kerterizler ters yönde çizilerek kesiştirilir.

![Kerteriz kesişimi örneği](https://sailingissues.com/vier/position4.png)

![Kerteriz çizimi](https://usercontent.one/wp/www.getlostpowerboattraining.com/wp-content/uploads/2020/03/Screenshot-2020-03-28-at-14.21.05-1024x575.png?media=1759652400)

![Üç kerterizle fix](https://upload.wikimedia.org/wikipedia/commons/d/dd/Visual-fix-by-three-bearings.png)`
      },
      {
        title: "Mesafe ve Kerteriz Kombinasyonu",
        content: `Bir sabit cisme olan mesafe ile başka bir cisme alınan kerterizin birlikte kullanılmasıyla mevki bulunur. Radar çağında çok yaygındır.

**İşlem Mantığı**  
Mesafe harita üzerinde yay, kerteriz doğrusal hat olarak temsil edilir. Yay ile hattın kesişimi kesin mevkiyi verir.

![Mevki örneği](https://sailingissues.com/vier/position4.png)

![Mesafe + kerteriz uygulaması](https://maritimesa.org/nautical-science-grade-12/wp-content/uploads/sites/7/2020/09/12-1-3-6-fig1.jpg)`
      },
      {
        title: "Elektronik Mevki ve Harita Üzerine Taşınması",
        content: `Elektronik mevki, GPS ve benzeri sistemlerden alınan enlem–boylam değerlerine dayanır. Bu koordinatlar doğrudan harita üzerinde işaretlenir.

**Temel Şart**  
Harita datum’u ile elektronik sistem datum’u aynı olmalıdır. Aksi hâlde mevki hatası oluşur.

![Elektronik mevki örneği](https://www.skippertips.com/members/images/821b.jpg?cb=20250701052844)

![Elektronik harita katmanı](https://developers.arcgis.com/net/static/752882802f2ded0cb1b58bc30a181f5a/4b190/enc-layer.jpg)`
      },
      {
        title: "Mevki Koymada Hata ve Kontrol Mantığı",
        content: `Üç kerterizle elde edilen küçük üçgen, hata üçgenidir. Bu üçgenin büyüklüğü ölçüm kalitesini gösterir. Geniş hata üçgeni, kerterizlerin güvensiz olduğunu gösterir.

Ölü hesap mevkii ile kesin mevki arasındaki fark, akıntı ve rüzgâr etkilerinin dolaylı göstergesidir. Bu fark bilinçli olarak izlenir ve seyir kararları buna göre ayarlanır.

![LOP ve fix açıklaması](https://sailingissues.com/vier/position-fix-lop-explained-3x.png)

![Hata üçgeni örneği](https://www.sailtrain.co.uk/navigation/images/cockedhat.gif)`
      }
    ],
    keyPoints: [
      "Mevki koyma, zamana bağlı karar üretmenin temelidir",
      "EP, DR ve Fix mevki güvenilirlik seviyelerine göre ayrılır",
      "DR hesapları hata birikimine açıktır ve düzenli doğrulama ister",
      "Kerteriz kesişimi ve mesafe-kerteriz kombinasyonu klasik kesin mevki yöntemleridir",
      "Elektronik mevki mutlaka datum uyumu ve saha doğrulamasıyla kontrol edilmelidir"
    ]
  },
  "Kurs – mesafe hesapları": {
    title: "Kurs – Mesafe Hesapları",
    introduction: "Kurs–mesafe hesapları, düzlem seyirde bir seyir hareketini tek bir doğru parçası olarak ele alıp, bu hareketin dik bileşenlerini çözerek ya da bu bileşenlerden hareketin kendisini yeniden kurarak yapılan hesaplamalardır. Düzlem seyir varsayımı altında seyir üçgeni, hipotenüsü seyredilen mesafe olan bir dik üçgen gibi düşünülür; dik kenarlar DLat ve departure’dır. Bu yaklaşım kısa mesafelerde ve orta enlemlerde pratik doğruluk verir.",
    sections: [
      {
        title: "Genel Bakış",
        content: `![Image](https://marinegyaan.com/wp-content/uploads/2016/09/plane-sailing.jpg)

![Image](https://imgv2-1-f.scribdassets.com/img/document/373015606/original/1b051a5aaf/1?v=1)

![Image](https://manoa.hawaii.edu/exploringourfluidearth/sites/default/files/M1U8-Fig8.31-NauticalChartKaneoheBay.png)

Kurs–mesafe hesapları düzlem seyir varsayımına dayanır. Seyir hareketi tek bir doğru parçası kabul edilir ve bu hareket, dik bileşenlerine ayrıştırılarak analiz edilir. Hipotenüs seyredilen mesafe, dik kenarlar DLat ve departure olarak düşünülür.`
      },
      {
        title: "Kullanılan Büyüklükler ve Birimler",
        content: `![Image](https://www.jove.com/files/ftp_upload/18110/18110_article_thumb_18110.jpg)

![Image](https://i.ebayimg.com/images/g/rc4AAOSwr99iQ4LJ/s-l400.jpg)

DLat enlem değişimidir ve dakika enlem cinsinden ifade edilir; pratikte 1 dakika enlem = 1 deniz mili kabul edildiği için DLat aynı zamanda deniz mili gibi de düşünülür. Departure doğu–batı mesafesidir ve deniz mili cinsindendir. Kurs düzlem seyirde hakiki rota olarak alınır ve 0°–360° aralığında ifade edilir. Mesafe deniz mili cinsindendir.

İşaret mantığı seyir geometrisini ayakta tutar. DLat kuzeye doğru pozitif, güneye doğru negatif kabul edilir. Departure doğuya doğru pozitif, batıya doğru negatif kabul edilir. Kurs hesabında ise sonucun hangi çeyreğe düştüğü bu işaretlerden çıkarılır.`
      },
      {
        title: "Tip 1: Kurs ve Mesafe Verildiğinde DLat ve Departure Bulma",
        content: `![Image](https://thenauticalsite.in/NauticalNotes/TerresNav/MyTerrNav-Lesson06-Sailings_files/image012.gif)

![Image](https://astronavigationdemystified.com/wp-content/uploads/2016/09/diag15-mod.jpg)

Kurs ve mesafe biliniyorsa, hareketin bileşenleri trigonometrik olarak ayrıştırılır. Mesafe hipotenüstür; DLat kursun kosinüs bileşeni, departure kursun sinüs bileşenidir.

DLat = Mesafe × cos Kurs  
Departure = Mesafe × sin Kurs

İşaret, kursun hangi çeyrekte olduğuna göre belirlenir. 0°–180° aralığı kuzey bileşeni, 180°–360° aralığı güney bileşeni üretir. 0°–180° aralığında doğu–batı için ayrıca 0°–90° ve 90°–180° ayrımı yapılır; 0°–180° içinde sin pozitif olduğundan doğu bileşeni çıkar, 180°–360° içinde sin negatifleştiği için batı bileşeni çıkar.

**Örnek Hesaplama**  
Mesafe 50 deniz mili, kurs 045° olsun.  
cos 045° ≈ 0.7071  
sin 045° ≈ 0.7071  

DLat = 50 × 0.7071 = 35.36′ Kuzey  
Departure = 50 × 0.7071 = 35.36 deniz mili Doğu  

Bu sonuç, 50 deniz millik seyrin hem kuzeye hem doğuya eşit bileşen ürettiğini gösterir.`
      },
      {
        title: "Tip 2: DLat ve Departure Verildiğinde Kurs ve Mesafe Bulma",
        content: `![Image](https://astronavigationdemystified.com/wp-content/uploads/2016/09/diag15-mod.jpg)

![Image](https://astronavigationdemystified.com/wp-content/uploads/2012/06/diag-16-mod.jpg)

DLat ve departure biliniyorsa önce mesafe bulunur, ardından kurs bulunur. Mesafe, dik üçgende Pisagor ile bulunur. Kurs, tanjant bağıntısıyla bulunur.

Mesafe² = DLat² + Departure²  
Mesafe = √(DLat² + Departure²)

tan θ = Departure ÷ DLat

Burada θ, kuzey–güney eksenine göre sapma açısıdır. Nihai kursu bulmak için DLat ve departure işaretlerinden hangi çeyrekte olunduğu belirlenir.

Çeyrek belirleme mantığı şu şekilde uygulanır:  
DLat pozitif ve departure pozitif ise kurs 0°–90° arasındadır.  
DLat pozitif ve departure negatif ise kurs 270°–360° arasındadır.  
DLat negatif ve departure pozitif ise kurs 90°–180° arasındadır.  
DLat negatif ve departure negatif ise kurs 180°–270° arasındadır.

**Örnek Hesaplama**  
DLat 24′ Kuzey, departure 18 deniz mili Doğu olsun.  

Mesafe = √(24² + 18²)  
Mesafe = √(576 + 324)  
Mesafe = √900  
Mesafe = 30 deniz mili  

tan θ = 18 ÷ 24 = 0.75  
θ ≈ 36.87°  

DLat kuzey, departure doğu olduğu için kurs 0°–90° aralığındadır.  
Kurs ≈ 037°`
      },
      {
        title: "Tip 3: Başlangıç ve Varış Mevkilerinden Kurs ve Mesafe Bulma",
        content: `![Image](https://astronavigationdemystified.com/wp-content/uploads/2016/09/diag15-mod.jpg)

![Image](https://deckskills.tripod.com/sitebuildercontent/sitebuilderpictures/mid_lat_triangle.jpg)

Başlangıç ve varış enlem–boylamları verildiğinde, önce DLat ve DLong bulunur. Ardından departure hesaplanır; son olarak kurs ve mesafe çözülür. Bu tür problem, düzlem seyirde en sık sorulan klasik kurs–mesafe problemidir.

**1) DLat Hesabı**  
DLat = Varış Enlemi − Başlangıç Enlemi  
Dakika cinsinden çalışılır. Derece farkı varsa dakikaya çevrilir. Kuzeye gidiyorsa DLat kuzey, güneye gidiyorsa DLat güney kabul edilir.

**2) DLong Hesabı**  
DLong = Varış Boylamı − Başlangıç Boylamı  
Dakika boylam cinsinden bulunur. Doğuya gidiyorsa DLong doğu, batıya gidiyorsa DLong batı kabul edilir.

**3) Departure Hesabı**  
Orta Enlem = (Başlangıç Enlemi + Varış Enlemi) ÷ 2  
Departure = DLong × cos Orta Enlem

**4) Kurs Hesabı**  
tan θ = Departure ÷ DLat  
Çeyrek, DLat ve departure yönlerine göre belirlenir.

**5) Mesafe Hesabı**  
Mesafe = √(DLat² + Departure²)

**Örnek Hesaplama**  
Başlangıç mevkii: 36° 10.0′ N, 029° 20.0′ E  
Varış mevkii: 36° 28.0′ N, 029° 50.0′ E  

DLat = 36° 28.0′ − 36° 10.0′ = 18.0′ Kuzey  
DLong = 029° 50.0′ − 029° 20.0′ = 30.0′ Doğu  

Orta Enlem = (36° 10.0′ + 36° 28.0′) ÷ 2  
Orta Enlem = 36° 19.0′  
cos 36° 19′ ≈ 0.806  

Departure = 30.0 × 0.806 = 24.18 deniz mili Doğu  

tan θ = 24.18 ÷ 18.0 = 1.343  
θ ≈ 53.4°  

DLat kuzey, departure doğu olduğu için kurs 0°–90° aralığındadır.  
Kurs ≈ 053°  

Mesafe = √(18.0² + 24.18²)  
Mesafe ≈ 30.1 deniz mili`
      },
      {
        title: "Tip 4: Kurs ve Mesafe Verildiğinde Varış Mevkii Bulma",
        content: `![Image](https://sailingissues.com/vier/double-angle-bow-running-fix-3x.png)

![Image](https://astronavigationdemystified.com/wp-content/uploads/2012/06/diag-16-mod.jpg?w=584)

Bu tür problem, ölü hesap mevkii ilerletmenin düzlem seyir versiyonudur. Kurs ve mesafe ile önce DLat ve departure bulunur; DLat ile varış enlemi, departure ile varış boylamı hesaplanır.

DLat = Mesafe × cos Kurs  
Departure = Mesafe × sin Kurs  
Varış Enlemi = Başlangıç Enlemi + DLat  

Boylam için önce DLong bulunur:  
DLong = Departure ÷ cos Orta Enlem  
Orta Enlem = (Başlangıç Enlemi + Varış Enlemi) ÷ 2  
Varış Boylamı = Başlangıç Boylamı + DLong

Burada dikkat edilmesi gereken nokta, varış enlemi bilinmeden orta enlemin kesinleşmemesidir. Düzlem seyirde pratik yöntem şu sırayla ilerler: önce DLat bulunur ve varış enlemi yazılır; sonra orta enlem bulunur; sonra DLong hesaplanır; en son varış boylamı yazılır.

**Örnek Hesaplama**  
Başlangıç: 35° 40.0′ N, 026° 10.0′ E  
Kurs: 070°  
Mesafe: 60 deniz mili  

cos 70° ≈ 0.342  
sin 70° ≈ 0.940  

DLat = 60 × 0.342 = 20.52′ Kuzey  
Departure = 60 × 0.940 = 56.40 deniz mili Doğu  

Varış enlemi = 35° 40.0′ + 20.52′  
Varış enlemi = 36° 00.52′ N  

Orta Enlem = (35° 40.0′ + 36° 00.52′) ÷ 2  
Orta Enlem ≈ 35° 50.26′  
cos 35° 50′ ≈ 0.810  

DLong = 56.40 ÷ 0.810 = 69.6′ Doğu  
69.6′ = 1° 09.6′  

Varış boylamı = 026° 10.0′ + 69.6′  
Varış boylamı = 027° 19.6′ E`
      },
      {
        title: "Kurs Hesabında Çeyrek Hatasını Sıfırlayan Uygulama",
        content: `![Image](https://thenauticalsite.in/NauticalNotes/TerresNav/MyTerrNav-Lesson06-Sailings_files/image039.jpg)

![Image](https://maritimesa.org/nautical-science-grade-11/wp-content/uploads/sites/6/2020/10/11.1.1.2_fig_5.jpg)

Tan θ bağıntısı yalnız açının büyüklüğünü verir; hangi yönde olduğuna DLat ve departure karar verir. Bu yüzden kurs çözümünde önce DLat’in kuzey mi güney mi olduğu, departure’ın doğu mu batı mı olduğu netleştirilir. Ardından bulunan açı uygun çeyreğe yerleştirilir. Bu disiplin uygulanmadan yapılan kurs hesapları, sayısal olarak doğru açı üretse bile 180° hatayla yanlış yöne yerleşebilir.`
      }
    ],
    keyPoints: [
      "Düzlem seyir üçgeninde hipotenüs mesafe, dik kenarlar DLat ve departure’dır",
      "DLat kuzeye (+), güneye (−); departure doğuya (+), batıya (−) kabul edilir",
      "Mesafe = √(DLat² + Departure²) ve tan θ = Departure ÷ DLat bağıntıları temel çözüm adımlarıdır",
      "Orta enlem, DLong–departure dönüşümünün anahtar varsayımıdır",
      "Çeyrek disiplini uygulanmadan kurs sonuçları 180° hata üretebilir"
    ]
  },
  "Enlem ve boylam değişimi": {
    title: "Enlem ve Boylam Değişimi",
    introduction: "Enlem ve boylam değişimi, düzlem seyirde bir geminin bir mevkiden diğerine geçişini koordinat sistemi içinde nicel olarak ifade eden temel hesap grubudur. Enlem değişimi (DLat) kuzey–güney bileşenini verir. Boylam değişimi (DLong) ise doğu–batı bileşenini koordinat düzeyinde verir; ancak DLong, enlem gibi sabit bir uzunluk birimine sahip olmadığı için doğrudan deniz mili sayılmaz. Bu nedenle düzlem seyirde boylam değişimi, departure ile ve orta enlem mantığıyla ilişkilendirilir.",
    sections: [
      {
        title: "Genel Bakış",
        content: `![Enlem ve boylam diyagramı](https://astronavigationdemystified.com/wp-content/uploads/2016/09/diag15-mod.jpg)

![Enlem ve boylam açıklaması](https://sailingissues.com/vier/longitude-latitude-explained-3x.png)

Enlem değişimi ve boylam değişimi, düzlem seyirde hareketi iki bileşene ayırır. Bu iki bileşen, daha sonra kurs–mesafe hesaplarının temelini oluşturur.`
      },
      {
        title: "DLat: Enlem Değişiminin Hesabı",
        content: `![DLat şeması](https://astronavigationdemystified.com/wp-content/uploads/2012/06/diag15-mod.jpg)

![Enlem-bileşen görseli](https://www.thoughtco.com/thmb/rm9dvAnkcx11DANofgETkHViXt8%3D/1500x0/filters%3Ano_upscale%28%29%3Amax_bytes%28150000%29%3Astrip_icc%28%29/Latitude-and-Longitude-58b9d1f35f9b58af5ca889f1.jpg)

DLat, varış enlemi ile başlangıç enlemi arasındaki farktır ve dakika cinsinden alınır. Kuzeye gidiliyorsa DLat kuzey yönlü, güneye gidiliyorsa DLat güney yönlü kabul edilir. Derece farkı varsa dakikaya çevrilir; çünkü düzlem seyirde 1 dakika enlem = 1 deniz mili eşleştirmesi doğrudan kullanılır.`,
        formula: {
          text: "DLat = Varış Enlemi − Başlangıç Enlemi",
          description: "Kuzeye gidiliyorsa DLat (+) kuzey; güneye gidiliyorsa DLat (−) güney kabul edilir."
        }
      },
      {
        title: "Örnek – DLat",
        content: `Başlangıç: 36° 10.0′ N  
Varış: 36° 34.0′ N

DLat = 36° 34.0′ − 36° 10.0′ = 24.0′ Kuzey`
      },
      {
        title: "DLong: Boylam Değişiminin Hesabı",
        content: `![DLong hesap şeması](https://www.researchgate.net/publication/259912499/figure/fig9/AS%3A297134860587011%401447853879125/Mercator-Calculation-of-Difference-in-Longitude.png)

![Boylam bileşeni görseli](https://geoinfo.sdsu.edu/hightech/LM3/Media/latitude.jpg)

DLong, varış boylamı ile başlangıç boylamı arasındaki farktır ve dakika cinsinden alınır. Doğuya gidiliyorsa DLong doğu yönlü, batıya gidiliyorsa DLong batı yönlü kabul edilir. Boylam dakika farkı, enlem dakikası gibi sabit bir deniz mili değeri değildir; bu nedenle DLong tek başına “kaç mil gidildi” sorusunu cevaplamaz.`,
        formula: {
          text: "DLong = Varış Boylamı − Başlangıç Boylamı",
          description: "DLong doğu yönlü (E) veya batı yönlü (W) olarak işaretlenir."
        }
      },
      {
        title: "Boylam Değişimi Hesapları",
        content: `Boylam değişimi, geminin seyri sırasında doğu–batı doğrultusunda ulaştığı coğrafi farkı ifade eder ve orta enlem seyri hesaplarının temel unsurlarından biridir. Boylamlar meridyenlerle tanımlanır ve bu meridyenler kutuplara yaklaştıkça birbirine yaklaşır. Bu geometrik gerçek, boylam dakikasının uzunluğunun sabit olmamasına neden olur. Bu nedenle boylam değişimi, enlemden bağımsız bir mesafe gibi ele alınamaz ve seyirde doğrudan kullanılmaz.

DLong, başlangıç boylamı ile varış boylamı arasındaki farktır. Hesaplamada tüm boylamlar aynı cins ifade edilir; doğu boylamları pozitif, batı boylamları negatif kabul edilerek fark alınır. Sonuç dakika cinsinden elde edilir ve yön bilgisi doğu veya batı olarak belirlenir. Bu aşamada bulunan değer yalnızca coğrafi farktır; geminin gerçekten kat ettiği doğu–batı mesafeyi ifade etmez.

---

**Boylam Dakikasının Enleme Bağlılığı**

Enlem dakikası dünyanın her yerinde yaklaşık 1 deniz mili kabul edilirken, boylam dakikasının uzunluğu enleme bağlı olarak değişir. Ekvatorda bir boylam dakikası yaklaşık 1 deniz miline eşittir; enlem arttıkça bu uzunluk kosinüs oranında azalır. Seyir hesaplarında bu ilişki, boylam değişiminin doğrudan mesafeye çevrilememesinin temel nedenidir.

Bu noktada departure kavramı devreye girer. Departure, geminin doğu–batı doğrultusunda kat ettiği gerçek mesafedir ve deniz mili cinsinden ifade edilir. Orta enlem seyri yaklaşımı, boylam değişimi ile departure arasındaki bağı tek bir katsayı üzerinden kurar.

---

**Temel Bağıntı: Departure – Boylam Değişimi**

⬛ Temel Orta Enlem Bağıntısı  
════════════════════  
Departure = DLong × cos Orta Enlem  
════════════════════

Bu bağıntıda:

DLong dakika cinsinden boylam değişimini,  
Orta Enlem, seyir boyunca temsil edici enlemi,  
cos Orta Enlem, boylam dakikasının kısalma oranını ifade eder.

Sonuç, geminin doğu–batı doğrultusunda kat ettiği gerçek mesafeyi verir.

Eğer problemde departure biliniyor ve boylam değişimi aranıyorsa bağıntı ters çevrilir.

⬛ Ters Bağıntı  
════════════════════  
DLong = Departure ÷ cos Orta Enlem  
════════════════════

Bu ifade, departure değerinden coğrafi boylam farkına ulaşmayı sağlar.

---

**Orta Enlemin Hesaplanması**

Orta enlem, başlangıç enlemi ile varış enleminin aritmetik ortalamasıdır ve boylam hesaplarının dayandığı referans değerdir.

⬛ Orta Enlem Tanımı  
════════════════════  
Orta Enlem = (Başlangıç Enlemi + Varış Enlemi) ÷ 2  
════════════════════

Bu değer, kosinüs katsayısının seçilmesinde kullanılır ve boylam dakikasının temsil edici uzunluğunu belirler.

---

**Sayısal Uygulama**

Başlangıç enlemi: 35° 40′ N  
Varış enlemi: 36° 00′ N  
Departure: 56,4 deniz mili (Doğu)

Önce orta enlem bulunur:

Orta Enlem = (35° 40′ + 36° 00′) ÷ 2 = 35° 50′

Bu enlemin kosinüsü yaklaşık 0,81’dir. Boylam değişimi hesaplanır:

════════════════════  
DLong = 56,4 ÷ 0,81 ≈ 69,6′  
════════════════════

69,6 dakika, 1° 09,6′ boylam değişimine karşılık gelir. Varış boylamı, başlangıç boylamına bu değer eklenerek elde edilir.

---

**Kurs ve Mesafeden Boylam Değişimine Giden Hesap Zinciri**

Orta enlem seyri içinde boylam değişimi çoğu zaman dolaylı olarak bulunur. Kurs ve mesafe verildiğinde izlenen tam hesap sırası aşağıdaki gibidir.

⬛ Tam Hesap Dizisi  
════════════════════  
Departure = Mesafe × sin Kurs  
DLat = Mesafe × cos Kurs  
Varış Enlemi = Başlangıç Enlemi + DLat  
Orta Enlem = (Başlangıç Enlemi + Varış Enlemi) ÷ 2  
DLong = Departure ÷ cos Orta Enlem  
Varış Boylamı = Başlangıç Boylamı + DLong  
════════════════════

Bu zincir, orta enlem seyri yaklaşımında boylam değişiminin nasıl ve hangi sırayla elde edildiğini eksiksiz biçimde gösterir. Boylam değişimi hesapları, yalnızca bu bütünlük korunarak yapıldığında doğru mevki tayinine hizmet eder.`
      },
      {
        title: "Örnek – DLong",
        content: `Başlangıç: 029° 20.0′ E  
Varış: 030° 05.0′ E

DLong = 030° 05.0′ − 029° 20.0′ = 45.0′ Doğu`
      },
      {
        title: "Departure ile DLong Arasındaki İlişki",
        content: `![Departure ve DLong ilişkisi](https://engineeringtraining.tpub.com/14070/img/14070_129_8.jpg)

![Boylam-departure diyagramı](https://astronavigationdemystified.com/wp-content/uploads/2016/09/diag15-mod.jpg)

Departure, doğu–batı doğrultusunda kat edilen gerçek mesafedir ve deniz mili cinsindendir. DLong ise boylam dakikasıdır. Boylam dakikasının gerçek uzunluğu enleme bağlıdır. Düzlem seyirde bu bağıntı orta enlem üzerinden kurulur.`,
        formula: {
          text: "Departure = DLong × cos(Orta Enlem)",
          description: "DLong dakika cinsinden alınır; sonuç deniz mili çıkar."
        }
      },
      {
        title: "Orta Enlem",
        content: `![Orta enlem diyagramı](https://sailingissues.com/vier/longitude-latitude-explained-3x.png)

![Orta enlem örneği](https://maritimesa.org/nautical-science-grade-11/wp-content/uploads/sites/6/2020/10/11.1.1.2_fig_1.jpg)

Orta enlem, başlangıç ve varış enlemlerinin aritmetik ortalamasıdır. Orta enlem, DLong’un gerçek yatay mesafeye dönüştürülmesinde kullanılan pratik referanstır.`,
        formula: {
          text: "Orta Enlem = (Başlangıç Enlemi + Varış Enlemi) ÷ 2",
          description: "Orta enlem derece cinsinden alınır; cos değeri bu enlemden hesaplanır."
        }
      },
      {
        title: "DLong Hesabını Departure Üzerinden Kurma",
        content: `![DLong dönüşümü](https://astronavigationdemystified.com/wp-content/uploads/2016/09/diag15-mod.jpg)

![Orta enlem kullanım örneği](https://maritimesa.org/nautical-science-grade-11/wp-content/uploads/sites/6/2020/10/11.1.1.2_fig_1.jpg)

Bazı problemlerde departure bilinir, DLong istenir. Bu durumda bağıntı ters çevrilir.`,
        formula: {
          text: "DLong = Departure ÷ cos(Orta Enlem)",
          description: "Departure deniz mili, cos orta enlem boyutsuz, sonuç dakika cinsinden DLong’dur."
        }
      },
      {
        title: "Klasik Problem: İki Mevkiden Kurs ve Mesafe Öncesi DLat–DLong Çıkarma",
        content: `![Klasik düzlem seyir örneği](https://thenauticalsite.in/NauticalNotes/TerresNav/MyTerrNav-Lesson06-Sailings_files/image039.jpg)

![Koordinat üzerinde ölçüm](https://sailingissues.com/chart-symbols/coordinates-dividers-nautical-chart-3x.png)

Başlangıç ve varış mevkileri verildiğinde işlem sırası disiplinlidir. Önce DLat ve DLong bulunur. Ardından orta enlem hesaplanır. Sonrasında DLong yardımıyla departure elde edilir. Bu departure, kurs–mesafe hesaplarında kullanılır.

**Örnek (tam işlem)**  
Başlangıç: 36° 10.0′ N, 029° 20.0′ E  
Varış: 36° 34.0′ N, 030° 05.0′ E  

DLat = 36° 34.0′ − 36° 10.0′ = 24.0′ Kuzey  
DLong = 030° 05.0′ − 029° 20.0′ = 45.0′ Doğu  

Orta Enlem = (36° 10.0′ + 36° 34.0′) ÷ 2 = 36° 22.0′  
cos 36° 22′ ≈ 0.806  
Departure = 45.0 × 0.806 = 36.3 deniz mili Doğu`
      },
      {
        title: "İleri Problem: Kurs ve Mesafe ile Varış Boylamını Bulma",
        content: `![Kurs ve mesafe örneği](https://cdn.morganscloud.com/wp-content/uploads/2021/10/13122925/No-Wind-docking-Right-scaled.jpg?strip=all)

![Mevki tahmini örneği](https://www.nomadsailing.co.uk/images/easyblog_articles/23/b2ap3_large_Estimated-Position.JPG)

Kurs ve mesafe verildiğinde önce DLat ve departure bulunur; sonra varış enlemi, ardından orta enlem ve DLong, en son varış boylamı hesaplanır.

DLat = Mesafe × cos Kurs  
Departure = Mesafe × sin Kurs  
Varış Enlemi = Başlangıç Enlemi + DLat  
Orta Enlem = (Başlangıç Enlemi + Varış Enlemi) ÷ 2  
DLong = Departure ÷ cos Orta Enlem  
Varış Boylamı = Başlangıç Boylamı + DLong  

**Örnek (tam işlem)**  
Başlangıç: 35° 40.0′ N, 026° 10.0′ E  
Kurs: 070°  
Mesafe: 60 deniz mili  

cos 70° ≈ 0.342  
sin 70° ≈ 0.940  

DLat = 60 × 0.342 = 20.52′ Kuzey  
Departure = 60 × 0.940 = 56.40 deniz mili Doğu  

Varış Enlemi = 35° 40.0′ + 20.52′ = 36° 00.52′ N  
Orta Enlem = (35° 40.0′ + 36° 00.52′) ÷ 2 = 35° 50.26′  
cos 35° 50′ ≈ 0.810  
DLong = 56.40 ÷ 0.810 = 69.6′ Doğu  
69.6′ = 1° 09.6′  
Varış Boylamı = 026° 10.0′ + 1° 09.6′ = 027° 19.6′ E`
      },
      {
        title: "İşaret ve Çeyrek Disiplini",
        content: `![İşaret disiplini](https://qph.cf2.quoracdn.net/main-qimg-9199a21a8fb385d50574b1252d72a5e6)

![Enlem-boylam işaretleri](https://maritimesa.org/nautical-science-grade-11/wp-content/uploads/sites/6/2020/10/11.1.1.2_fig_1.jpg)

DLat ve DLong’un kuzey–güney, doğu–batı yönleri netleştirilmeden yapılan hesaplar, doğru sayıları üretse bile yanlış yönde sonuç verir. Bu nedenle her işlemde önce yön belirlenir, sonra fark alınır, sonra trigonometrik veya orta enlem dönüşümü uygulanır.`
      }
    ],
    keyPoints: [
      "DLat, enlem farkıdır ve 1′ enlem = 1 deniz mili kabul edilir",
      "DLong, boylam farkıdır; mesafeye dönüşümü enleme bağlıdır",
      "Departure = DLong × cos(Orta Enlem) düzlem seyirde temel bağıntıdır",
      "Orta enlem, boylamı yatay mesafeye çevirmede pratik referanstır",
      "İşaret disiplini (N/S, E/W) sonuçların doğru yönlü olmasını sağlar"
    ]
  },
  "Orta Enlemde Seyir Hesaplamaları": {
    title: "Orta Enlemde Seyir Hesaplamaları",
    introduction:
      "Orta enlemde seyir hesaplamaları, düzlem seyir varsayımının yetersiz kaldığı orta mesafelerde kullanılan, boylam dakikasının enleme bağlı olarak değiştiği gerçeğini hesaba katan bir yöntemdir. Bu yaklaşımda dünya küresel kabul edilir; ancak tam küresel trigonometrik çözümlere girilmez. Hesapların merkezinde ortalama enlem yer alır ve doğu–batı mesafeler bu enleme göre düzeltilir. Bu yöntemin temel amacı, verilen kurs ve mesafeden varış mevkiini ya da iki mevkii arasındaki kurs ve mesafeyi, kabul edilebilir doğrulukla bulmaktır.",
    sections: [
      {
        title: "Orta Enlem Seyrinin Kullanım Gerekçesi",
        content: `Düzlem seyirde boylam dakikası her yerde 1 deniz mili kabul edilir. Bu kabul, kısa mesafelerde ihmal edilebilir hata üretir; ancak mesafe arttıkça hata büyür. Orta enlem seyri, bu hatayı boylam dakikasının kosinüs enlem oranında kısaldığını kabul ederek düzeltir. Böylece hesaplar, küresel seyre yaklaşır.`
      },
      {
        title: "Orta Enlem Kavramı",
        content: `Orta enlem, seyir boyunca geminin bulunduğu enlemi temsil eden tek bir değerdir. Başlangıç ve varış enlemlerinin aritmetik ortalaması alınarak bulunur.

⬛ Orta Enlem Tanımı

════════════════════
Orta Enlem = (Başlangıç Enlemi + Varış Enlemi) ÷ 2
════════════════════

Bu değer, boylam dakikasının gerçek uzunluğunu temsil eden kosinüs katsayısının seçiminde kullanılır.`
      },
      {
        title: "Orta Enlem Seyrinde Temel Bileşenler",
        content: `Orta enlem seyri, düzlem seyirdeki temel bileşenleri korur; ancak boylam–departure dönüşümünü ortalama enlemle düzeltir. Kullanılan ana büyüklükler şunlardır:

DLat: Enlem değişimi
Departure: Doğu–batı doğrultusunda gerçek mesafe
DLong: Boylam değişimi
Kurs: Hakiki kurs
Mesafe: Kat edilen yol`
      },
      {
        title: "Temel Trigonometrik Bağıntılar",
        content: `Orta enlem seyri hesaplamaları, düzlem seyir trigonometrisini temel alır.

⬛ Düzlem Bileşen Bağıntıları

════════════════════
DLat = Mesafe × cos Kurs
Departure = Mesafe × sin Kurs
════════════════════

Bu ifadelerle enlem ve doğu–batı mesafe bileşenleri elde edilir.`
      },
      {
        title: "Departure – Boylam Dönüşümü",
        content: `Boylam dakikasının enleme bağlı olarak kısalması nedeniyle, departure ile boylam değişimi doğrudan eşit değildir. Orta enlem seyri bu dönüşümü şu bağıntıyla kurar:

⬛ Orta Enlem Dönüşüm Bağıntısı

════════════════════
Departure = DLong × cos Orta Enlem
════════════════════

Buradan boylam değişimi şu şekilde bulunur:

════════════════════
DLong = Departure ÷ cos Orta Enlem
════════════════════`
      },
      {
        title: "Orta Enlemde Varış Mevkiinin Hesaplanması",
        content: `Başlangıç mevkii, kurs ve mesafe verildiğinde varış mevkii aşağıdaki sıra izlenerek bulunur.

⬛ Hesap Sırası

════════════════════
DLat = Mesafe × cos Kurs
Varış Enlemi = Başlangıç Enlemi + DLat
Orta Enlem = (Başlangıç Enlemi + Varış Enlemi) ÷ 2
Departure = Mesafe × sin Kurs
DLong = Departure ÷ cos Orta Enlem
Varış Boylamı = Başlangıç Boylamı + DLong
════════════════════`
      },
      {
        title: "Sayısal Uygulama: Orta Enlem Seyri",
        content: `Başlangıç mevkii: 35° 40′ N – 026° 10′ E
Kurs: 070°
Mesafe: 60 deniz mili

Önce enlem bileşeni hesaplanır:

════════════════════
DLat = 60 × cos 70° = 60 × 0.342 = 20.5′
════════════════════

Varış enlemi:

35° 40′ + 20.5′ = 36° 00.5′ N

Orta enlem:

(35° 40′ + 36° 00.5′) ÷ 2 = 35° 50.25′

Doğu–batı bileşeni:

════════════════════
Departure = 60 × sin 70° = 60 × 0.940 = 56.4
════════════════════

Boylam değişimi:

════════════════════
DLong = 56.4 ÷ cos 35° 50′ ≈ 56.4 ÷ 0.81 = 69.6′
════════════════════

Varış boylamı:

026° 10′ + 1° 09.6′ = 027° 19.6′ E`
      },
      {
        title: "Orta Enlem Seyrinin Hesap Mantığı",
        content: `Bu yöntemde kritik nokta, boylamla ilgili hiçbir işlemin ortalama enlem belirlenmeden yapılmamasıdır. Enlem değişimi düzlem seyir mantığıyla bulunur; boylam değişimi ise mutlaka departure üzerinden ve ortalama enlem düzeltmesiyle hesaplanır. Bu disiplin korunduğunda, orta mesafeli seyirlerde elde edilen mevki, küresel seyre oldukça yakın doğruluk sağlar.`
      }
    ]
  },
  "Ortalama enlem kavramı": {
    title: "Ortalama Enlem Kavramı",
    introduction:
      "Ortalama enlem, orta mesafeli seyirlerde boylam değişiminin gerçek yatay mesafeye dönüştürülmesinde kullanılan referans enlemdir. Bu kavram, düzlem seyirde yapılan en temel varsayımı kısmen düzelterek, boylam dakikasının enleme bağlı değişimini hesaba katar. Amaç, karmaşık projeksiyon hesaplarına girmeden, pratik ve yeterli doğrulukta bir çözüm elde etmektir.",
    sections: [
      {
        title: "Ortalama Enlem Kavramı",
        content: `![Orta enlem diyagramı](https://deckskills.tripod.com/sitebuildercontent/sitebuilderpictures/mid_lat_triangle.jpg)

![Boylam ve enlem görseli](https://sailingissues.com/vier/longitude-latitude-explained-3x.png)

![Orta enlem seyir örneği](https://maritimesa.org/nautical-science-grade-11/wp-content/uploads/sites/6/2020/10/11.1.1.2_fig_1.jpg)

Ortalama enlem, başlangıç ve varış enlemlerinin **aritmetik ortalaması** olarak tanımlanır. Bu enlem, seyir boyunca geminin bulunduğu enlemi tek bir değerle temsil eder. Orta enlem seyri yaklaşımında, doğu–batı yönlü mesafeler bu enlemdeki boylam dakikasının uzunluğuna göre değerlendirilir.`
      },
      {
        title: "Fiziksel Dayanak: Boylam Dakikasının Enleme Bağlılığı",
        content: `![Boylam dakikası şeması](https://astronavigationdemystified.com/wp-content/uploads/2017/08/new-diag-14-blue.jpg)

![Enlem-boylam geometrisi](https://www.themathdoctors.org/wp-content/uploads/2021/03/ADM51722-coordinates.png)

Dünya üzerinde enlem dakikası her yerde yaklaşık olarak 1 deniz milidir. Buna karşılık boylam dakikasının uzunluğu ekvatordan kutuplara doğru azalır. Bu azalma, ilgili enlemin kosinüsü ile ifade edilir. Ortalama enlem kavramı, seyir boyunca değişen bu uzunluğu tek bir sabit değerle temsil etmeyi hedefler.

Bu yaklaşımda, seyir boyunca boylam dakikasının uzunluğu sabit kabul edilir; ancak bu sabit değer, ekvatora değil, **seyir hattının ortalama enlemine** bağlanır. Böylece düzlem seyirdeki temel hata kaynağı azaltılır.`
      },
      {
        title: "Ortalama Enlemin Hesaplanması",
        content: `![Ortalama enlem hesabı](https://maritimesa.org/nautical-science-grade-11/wp-content/uploads/sites/6/2020/10/11.1.1.2_fig_3.jpg)

![Ortalama enlem diyagramı](https://astronavigationdemystified.com/wp-content/uploads/2016/09/diag15-mod.jpg)

Ortalama enlem, başlangıç ve varış enlemlerinin ortalaması alınarak bulunur.

Ortalama Enlem = (Başlangıç Enlemi + Varış Enlemi) ÷ 2

Enlemler derece ve dakika cinsinden ifade ediliyorsa, işlem aynı birimler içinde yapılır. Kuzey ve güney yönleri işaret disiplinine uygun olarak değerlendirilir.

**Örnek**

Başlangıç enlemi: 35° 20.0′ N  
Varış enlemi: 36° 00.0′ N

Ortalama Enlem = (35° 20.0′ + 36° 00.0′) ÷ 2  
Ortalama Enlem = 35° 40.0′ N

Bu değer, boylam bileşenine uygulanacak kosinüs katsayısının alınacağı enlemdir.`
      },
      {
        title: "Ortalama Enlemin Seyir Hesaplarına Etkisi",
        content: `![Seyir üçgeni](https://astronavigationdemystified.com/wp-content/uploads/2016/09/diag15-mod.jpg)

![Departure örneği](https://maritimesa.org/nautical-science-grade-10/wp-content/uploads/sites/5/2020/11/10.2.1_fig_4.jpg)

Orta enlem seyri yaklaşımında, doğu–batı yönlü mesafe olan departure ile boylam değişimi arasındaki ilişki, ortalama enlem üzerinden kurulur. Boylam dakikasının uzunluğu, cos Ortalama Enlem ile ölçeklenir. Böylece boylam farkı gerçek yatay mesafeye daha yakın bir değere dönüştürülür.

Bu yaklaşım, düzlem seyirde kullanılan geometrik üçgeni korur; yalnızca doğu–batı bileşeninin fiziksel karşılığını daha doğru tanımlar. Enlem bileşeni olan DLat, her yerde aynı uzunlukta kabul edildiği için bu düzeltmeden etkilenmez.`
      },
      {
        title: "Ortalama Enlemin Geçerli Olduğu Mesafe Aralığı",
        content: `![Orta enlem diyagramı](https://astronavigationdemystified.com/wp-content/uploads/2016/09/diag15-mod.jpg)

![Düzlem koordinatlar](https://www.e-education.psu.edu/geog862/sites/www.e-education.psu.edu.geog862/files/images/Lesson06/Plane%20Coordinates.png)

Orta enlem kavramı, kısa ve orta mesafeli seyirler için geliştirilmiştir. Enlem değişiminin aşırı büyük olmadığı, rota bacaklarının yüzlerce deniz miline ulaşmadığı durumlarda yeterli doğruluk sağlar. Enlem değişimi büyüdükçe veya seyir yüksek enlemlere yaklaştıkça, tek bir ortalama enlemle temsil etme varsayımı zayıflar.

Bu noktada daha gelişmiş projeksiyon tabanlı yöntemlere geçilmesi gerekir. Ortalama enlem, bu yöntemlere geçişten önce kullanılan pratik bir ara çözümdür.`
      }
    ]
  },
  "Set ve drift": {
    title: "Set ve Drift",
    introduction:
      "Set, akıntının hakiki yönüdür; drift ise akıntının hızıdır. Set pusula derecesiyle ifade edilir ve akıntının su kütlesini hangi yöne taşıdığını gösterir. Drift knot cinsindendir ve bu taşımanın hızını belirtir.",
    sections: [
      {
        title: "Set ve Drift Kavramı",
        content: `![Set ve drift diyagramı](https://navigationspreadsheets.wordpress.com/wp-content/uploads/2014/07/setanddrift.jpg)

![Apparent wind diyagramı](https://sailingissues.com/acht/apparent-wind-explanation-3x.png)

Set ve drift birlikte akıntı vektörünü oluşturur. Bu vektör, geminin suya göre hız vektörüne eklendiğinde geminin yer hız vektörü elde edilir. Akıntı, geminin “itildiği” bir kuvvet gibi değil, yer hareketini belirleyen bağımsız bir hız bileşeni olarak ele alınır.`
      },
      {
        title: "Set ve Drift Kaynakları",
        content:
          "Set ve drift değerleri harita üzerindeki tidal stream atlaslarından, akıntı tablolarından, gemi sensörlerinden veya pratikte COG–SOG ile suya göre değerlerin karşılaştırılmasından elde edilir. Akıntı seti geminin pruvasına göre değil, hakiki kuzeye göre tanımlanır. Akıntı set 135° dendiğinde, akıntı güneydoğuya akıyor demektir; geminin hangi yöne gittiğinden bağımsızdır."
      },
      {
        title: "Akıntı Vektörü Tanımı",
        content:
          "Bu tanım, akıntının vektörel çözümlerde hangi iki bilgiyle temsil edildiğini sabitler ve tüm hesapların başlangıç noktasını oluşturur.",
        formula: {
          text: "Akıntı Vektörü = (Set, Drift)",
          description: "Set yön, drift ise hız bilgisidir."
        }
      }
    ],
    keyPoints: [
      "Set akıntının yönünü, drift ise hızını ifade eder",
      "Set hakiki kuzeye göre tanımlanır; geminin pruvasına göre değildir",
      "Set ve drift birlikte akıntı vektörünü oluşturur"
    ]
  },
  "Akıntı vektörleri": {
    title: "Akıntı Vektörleri",
    introduction:
      "Akıntılı seyirde üç temel vektör bulunur: geminin suya göre hız vektörü, akıntı vektörü ve geminin yere göre hız vektörü. Suya göre vektör STW ve heading ile, akıntı vektörü set ve drift ile, yer vektörü ise COG ve SOG ile tanımlanır.",
    sections: [
      {
        title: "Akıntı Vektörlerinin Görsel Mantığı",
        content: `![Vektör toplamı](https://www.grc.nasa.gov/www/k-12/airplane/Images/vectadd.gif)

![Set ve drift diyagramı](https://navigationspreadsheets.wordpress.com/wp-content/uploads/2014/07/setanddrift.jpg?w=640)

Bu iki vektörün vektörel toplamı, geminin yer hız vektörünü verir. Bu ilişki, akıntılı seyir hesaplarının tamamını tek bir çerçeveye oturtur.`
      },
      {
        title: "Temel Vektör Eşitliği",
        content:
          "Bu eşitlikte büyüklükler ve yönler birlikte taşındığı için çözüm, ölçekli vektör çizimiyle veya sayısal olarak bileşenlere ayırarak yapılır.",
        formula: {
          text: "Yer Hız Vektörü = Suya Göre Hız Vektörü + Akıntı Vektörü",
          description: "COG/SOG, suya göre vektör ile akıntı vektörünün toplamıdır."
        }
      },
      {
        title: "Bileşenlere Ayırma",
        content:
          "Sayısal çözümde her vektör kuzey–güney ve doğu–batı bileşenlerine ayrılır. Hakiki kuzey referansı kullanıldığında bir vektörün bileşenleri trigonometrik olarak bulunur.",
        formula: {
          text: "Kuzey Bileşeni = Hız × cos Yön | Doğu Bileşeni = Hız × sin Yön",
          description: "Her vektör için N ve E bileşenleri ayrı ayrı hesaplanır."
        }
      },
      {
        title: "Bileşenden Büyüklük ve Yön",
        content:
          "Bileşenler toplandıktan sonra yer vektörünün büyüklüğü ve yönü geri hesaplanır. Yönün hangi çeyrekte olduğu, N ve E’nin işaretinden belirlenir.",
        formula: {
          text: "SOG = √(N² + E²) | tan(COG) = E ÷ N",
          description: "N ve E, yer vektörünün kuzey ve doğu bileşenleridir."
        }
      }
    ],
    keyPoints: [
      "Akıntılı seyirde üç vektör birlikte değerlendirilir: STW, set/drift ve COG/SOG",
      "Vektörlerin toplamı geminin yer hızını verir",
      "Sayısal çözümde N/E bileşenleri kullanılır"
    ]
  },
  "Heading – COG ilişkisi": {
    title: "Heading – COG İlişkisi",
    introduction:
      "Heading, geminin pruvasının baktığı hakiki yönü ifade eder. COG ise geminin yer üzerinde izlediği gerçek rota doğrultusudur. Akıntısız durumda heading ile COG aynı kabul edilebilir; akıntı varlığında ise heading ile COG arasına bir sapma girer.",
    sections: [
      {
        title: "Heading ile COG Arasındaki Sapma",
        content: `![Heading ve COG ilişkisi](https://www.researchgate.net/publication/340312372/figure/fig2/AS%3A875987097100291%401585863007511/Schematic-of-speed-over-ground-SOG-course-over-ground-COG-ship-heading-HDG-and.png)

![Tidal vektörler](https://keyassets.timeincuk.net/inspirewp/live/wp-content/uploads/sites/19/2016/06/Tidal-Vectors_Dick-Everitt.jpg)

Bu sapma, geminin suya göre hareketinin akıntı tarafından yan bileşenle sürüklenmesi sonucu oluşur. Akıntılı seyirde rota COG ile temsil edilir; heading ise COG’yi tutturmak için ayarlanan kontrol değişkenidir.`
      },
      {
        title: "Düzeltme Açısı Mantığı",
        content:
          "Bu ifade, işaretlendirme yapılmadan kullanılmaz; çünkü hangi tarafa düzeltme verileceği akıntı setine bağlıdır. Akıntı gemiyi istenen rotanın sağına itiyorsa, heading istenen COG’nin soluna alınır; gemiyi soluna itiyorsa, heading sağa alınır. Bu ilişki vektör üçgeniyle netleşir.",
        formula: {
          text: "Düzeltme Açısı = Heading − İstenen COG",
          description: "Düzeltme yönü akıntı setine göre belirlenir."
        }
      }
    ],
    keyPoints: [
      "Heading geminin pruvasının yönüdür, COG ise yer rotasını gösterir",
      "Akıntı, heading ile COG arasında sapmaya neden olur",
      "Düzeltme açısı vektör üçgeniyle belirlenir"
    ]
  },
  "STW – SOG ilişkisi": {
    title: "STW – SOG İlişkisi",
    introduction:
      "STW, geminin suya göre hızıdır; SOG ise geminin yere göre hızıdır. Akıntısız durumda STW ile SOG aynı kabul edilir; akıntılı durumda farklıdır.",
    sections: [
      {
        title: "STW ve SOG Farkı",
        content: `![SOG-STW kalibrasyon diyagramı](https://www.simrad-yachting.com/globalassets/simrad/world-of-simrad/technology/sog/fig-3-sog-stw-calibrating-web.jpg)

![SOG vektör diyagramı](https://www.sailtrain.co.uk/navigation/images/sog.gif)

Akıntı gemiyi aynı yönde destekliyorsa SOG artar, ters yönde karşı geliyorsa SOG azalır. Çapraz akıntı durumunda SOG yalnızca artıp azalmaktan ibaret değildir; aynı zamanda COG’yi değiştirir.`
      },
      {
        title: "Genel İfade",
        content:
          "STW ile SOG arasındaki ilişki vektöreldir; bu nedenle basit çıkarma her durumda geçerli değildir. Yalnızca akıntı seti geminin suya göre rotasıyla aynı doğrultudaysa bir boyutlu yaklaşım kullanılabilir.",
        formula: {
          text: "SOG = | Suya Göre Hız Vektörü + Akıntı Vektörü |",
          description: "SOG, bileşke vektörün büyüklüğüdür."
        }
      },
      {
        title: "SOG Hesabı",
        content:
          "Bileşen çözümü yapıldığında SOG, toplam vektörün kuzey ve doğu bileşenlerinden hesaplanır. Bu yaklaşım, STW ile drift’in yönleri farklı olduğunda dahi doğru sonucu verir.",
        formula: {
          text: "SOG = √(N² + E²)",
          description: "N ve E toplam vektörün kuzey ve doğu bileşenleridir."
        }
      }
    ],
    keyPoints: [
      "STW suya göre hız, SOG yere göre hızdır",
      "Akıntı aynı yönde ise SOG artar, ters yönde ise azalır",
      "Genel durumda SOG vektörel toplama ile bulunur"
    ]
  },
  "Akıntılı seyir hesapları": {
    title: "Akıntılı Seyir Hesapları",
    introduction:
      "Akıntılı seyir hesapları iki ana problem tipinde ele alınır. Birinci tipte suya göre rota ve STW bilinir; set ve drift bilindiğinde COG ve SOG bulunur. İkinci tipte istenen COG bilinir; set ve drift bilindiğinde bu rotayı tutmak için gerekli heading ve beklenen SOG bulunur.",
    sections: [
      {
        title: "Problem Tipleri",
        content: `![Akıntılı seyir diyagramı](https://maritimesa.org/nautical-science-grade-11/wp-content/uploads/sites/6/2020/10/11.1.8.7_fig_1.jpg)

![Akıntılı seyir örneği](https://imgv2-2-f.scribdassets.com/img/document/151674944/original/fad718bd48/1?v=1)

Köprüüstü uygulamasında en sık kullanılan ikinci tiptir; çünkü pratik hedef harita üzerinde belirlenmiş yer rotasını tutmaktır.`
      },
      {
        title: "Birinci Tip – Bileşen Toplamı",
        content:
          "Birinci tipte çözüm, vektörlerin toplanmasıdır. Suya göre vektör ve akıntı vektörü bileşenlere ayrılır, bileşenler toplanır.",
        formula: {
          text: "Ntoplam = STW × cos(Heading) + Drift × cos(Set) | Etoplam = STW × sin(Heading) + Drift × sin(Set)",
          description: "Ntoplam ve Etoplam, yer vektörünün bileşenleridir."
        }
      },
      {
        title: "Birinci Tip – COG ve SOG",
        content:
          "Toplam bileşenlerden COG ve SOG geri hesaplanır. Yön, bileşenlerin işaretine göre belirlenir.",
        formula: {
          text: "SOG = √(Ntoplam² + Etoplam²) | tan(COG) = Etoplam ÷ Ntoplam",
          description: "Bileşenlerden büyüklük ve yön geri hesaplanır."
        }
      },
      {
        title: "İkinci Tip – Vektör Çıkarma Mantığı",
        content:
          "İkinci tipte hedef COG doğrultusunda yer vektörü bilinmek istenir; ancak yer vektörünün büyüklüğü başlangıçta bilinmeyebilir. Grafik yöntemde, istenen COG doğrultusu çizilir ve akıntı vektörü buna göre çıkarılarak geminin suya göre vektörü bulunur. Sayısal yöntemde aynı mantık bileşenler üzerinden yürütülür.",
        formula: {
          text: "Suya Göre Hız Vektörü = Yer Hız Vektörü − Akıntı Vektörü",
          description: "İstenen yer vektöründen akıntı vektörü çıkarılır."
        }
      }
    ],
    keyPoints: [
      "Birinci tipte STW/heading bilinir, COG/SOG bulunur",
      "İkinci tipte hedef COG bilinir, gerekli heading hesaplanır",
      "Bileşen yöntemi her iki problem tipinde geçerlidir"
    ]
  },
  "Vektör üçgenleri": {
    title: "Vektör Üçgenleri",
    introduction:
      "Akıntılı seyir problemlerinin geometrik temsil biçimi vektör üçgenidir. Üçgende bir kenar geminin suya göre hız vektörünü, bir kenar akıntı vektörünü, üçüncü kenar yer hız vektörünü temsil eder.",
    sections: [
      {
        title: "Vektör Üçgeni Mantığı",
        content: `![Rüzgâr üçgeni](https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Wind_triangle.jpg/304px-Wind_triangle.jpg)

![Set ve drift diyagramı](https://navigationspreadsheets.wordpress.com/wp-content/uploads/2014/07/setanddrift.jpg?w=640)

Bu üçgen, yalnızca bir çizim değil; yön ve büyüklük ilişkilerini aynı anda taşıyan bir hesap aracıdır. Grafik çözüm, vektörlerin ölçekli çizilmesiyle uygulanır; sayısal çözüm ise aynı üçgenin trigonometrik ve bileşen temelli karşılığıdır.`
      },
      {
        title: "Üçgenin Kurulumu",
        content:
          "Vektör üçgeninin kurulumunda disiplin, tüm yönlerin hakiki kuzeye göre alınmasını ve aynı ölçeğin kullanılmasını gerektirir. Set doğrultusu akıntı vektörünün yönüdür; heading doğrultusu geminin suya göre vektörünün yönüdür; COG doğrultusu bileşke vektörün yönüdür."
      },
      {
        title: "Üçgenin Temel Kimliği",
        content:
          "Bu kimlik, akıntılı seyirde rota tutmanın özünü tek cümlede ifade eder: geminin suya göre hareketi, akıntının etkisiyle yer üzerinde başka bir harekete dönüşür; istenen yer hareketi için suya göre hareket, akıntıyı dengeleyecek şekilde seçilir.",
        formula: {
          text: "COG/SOG kenarı = Heading/STW kenarı + Set/Drift kenarı",
          description: "Yer vektörü, suya göre vektör ile akıntı vektörünün toplamıdır."
        }
      }
    ],
    keyPoints: [
      "Vektör üçgeni üç vektörü tek şemada gösterir",
      "Tüm yönler hakiki kuzeye göre alınır",
      "Üçgen, heading düzeltmesini geometrik olarak gösterir"
    ]
  },
  "Fix by Cross Bearings (Kerterizlerle Mevki Tayini)": {
    title: "Fix by Cross Bearings (Kerterizlerle Mevki Tayini)",
    introduction:
      "Fix by Cross Bearings yöntemi, iki veya daha fazla sabit objeye alınan kerterizlerin harita üzerinde Line of Position (LOP) olarak çizilmesi ve bu LOP’ların kesiştirilmesiyle kesin mevkiin (Fix) bulunmasına dayanır. Klasik (terrestrial) navigasyonun en temel ve en yaygın fix yöntemlerinden biridir.",
    sections: [
      {
        title: "Detaylı Anlatım",
        content: `![Image](https://pzsc.org.uk/wp-content/uploads/2016/04/3pointfix.jpg)

![Image](https://keyassets.timeincuk.net/inspirewp/live/wp-content/uploads/sites/19/2016/03/crossed-bearings.jpg)

![Image](https://usercontent.one/wp/www.getlostpowerboattraining.com/wp-content/uploads/2020/03/A-8-1024x576.png?media=1759652400)

![Image](https://www.getlostpowerboattraining.com/wp-content/uploads/2020/03/A-1.png)

---

### Temel Prensip

* En az **iki sabit obje** seçilir
* Objelerin **eş zamanlı kerterizleri** alınır
* Kerterizler **LOP**’a çevrilir
* LOP’ların kesişimi → **Fix**

⬛ **Ana İlke**

════════════════════
Bir objeye
alınan kerteriz
→ bir LOP
İki LOP
→ Fix
════════════════════

---

### Kullanılan Tanımlar

* **Obj A, Obj B** : Sabit ve tanımlı objeler
* **Brg** : Bearing (Kerteriz)
* **T** : True (Gerçek)
* **LOP** : Line of Position
* **Fix** : Kesin mevki

---

### Kerteriz Türleri

⬛ **Kerteriz Kaynağı**

════════════════════
• Pusula kerterizi
• Gyro kerterizi
• Radar kerterizi
════════════════════

* Haritada kullanılacak kerteriz **True (T)** olmalıdır

---

### Kerterizin LOP’a Dönüştürülmesi

⬛ **Kural**

════════════════════
LOP yönü
= Kerteriz + 180°
════════════════════

* Çünkü LOP, **objeden gemiye doğru** çizilir

---

### İki Kerterizle Fix

⬛ **Asgari Şart**

════════════════════
En az
iki farklı obje
iki LOP
════════════════════

* LOP’lar **mümkün olduğunca dik** kesişmelidir

---

### Geometrik Özellik

⬛ **En İyi Geometri**

════════════════════
LOP’lar
60° – 120°
açıyla
kesişmelidir
════════════════════

* Çok dar açı → **hata büyür**
* 90° → **ideal durum**

---

### Sayısal Uygulama Örneği (İki Kerteriz)

**Verilenler**

* Obj A kerterizi: **045°T**
* Obj B kerterizi: **320°T**

---

### Harita Çözümü

⬛ **Obj A LOP’u**

════════════════════
045°T + 180° = 225°T
Obj A’dan
225°T doğrultusunda
LOP çizilir
════════════════════

⬛ **Obj B LOP’u**

════════════════════
320°T + 180° = 140°T
Obj B’den
140°T doğrultusunda
LOP çizilir
════════════════════

---

### Fix

════════════════════
LOP A
∩
LOP B
= Fix
════════════════════

Bu nokta, kerterizlerin alındığı andaki **kesin gemi mevkii**dir.

---

### Üç Kerterizle Fix

⬛ **Avantaj**

════════════════════
Üç LOP
→ Hata üçgeni
→ Güvenilirlik
════════════════════

* İdeal durumda üç LOP **tek noktada kesişir**
* Küçük bir üçgen oluşursa → **ortalama merkez Fix** alınır

---

### Sayısal Uygulama Örneği (Üç Kerteriz)

**Verilenler**

* Obj A: **060°T**
* Obj B: **180°T**
* Obj C: **300°T**

---

### Harita Yorumu

════════════════════
Üç LOP
küçük bir
üçgen oluşturur
merkez
Fix’tir
════════════════════

---

### Hata Kaynakları

* Kerterizlerin eş zamanlı alınmaması
* Yanlış obje tanımı
* Pusula / gyro hataları
* Objelerin çok yakın veya aynı doğrultuda seçilmesi

---

### Harita Sembolizasyonu

* Sabit obje → ▲
* Kerteriz LOP’u → ince düz çizgi
* Fix → ●
* Hata üçgeni → küçük üçgen

---

### Kullanım Alanları

* Açık ve kıyı seyri
* Günlük rutin mevki tayini
* Eğitim ve sınav uygulamaları
* Elektronik sistemlerin teyidi

Fix by Cross Bearings, klasik seyrüseferde **hızlı, güvenilir ve temel** bir mevki tayin yöntemidir ve diğer tüm fix tekniklerinin **referans noktası** olarak kabul edilir.`
      }
    ]
  },
  "Mean Latitude Sailing": {
    title: "Mean Latitude Sailing",
    introduction:
      "Mean Latitude Sailing, orta enlemlerde dünya yüzeyinin eğriliğinin kısmen dikkate alındığı, boylam değişiminin (D.Long) paralel üzerindeki gerçek mesafeye Mean Latitude kullanılarak dönüştürüldüğü klasik bir seyir yöntemidir. Plane Sailing’in geliştirilmiş hâlidir ve daha uzun mesafelerde daha doğru sonuç verir.",
    sections: [
      {
        title: "Detaylı Anlatım",
        content: `![Image](https://astronavigationdemystified.com/wp-content/uploads/2016/09/diag15-mod.jpg)

![Image](https://deckskills.tripod.com/sitebuildercontent/sitebuilderpictures/mid_lat_triangle.jpg)

![Image](https://cdn.britannica.com/04/64904-050-D2054D06/cutaway-drawing-latitude-place-longitude-sizes-angles.jpg)

![Image](https://assets.ltkcontent.com/images/92435/longitude-versus-latitude-earth_7abbbb2796.jpg)

---

### Temel Prensip

* Seyir **orta enlemlerde** yapılır
* Enlem değişimi **gerçek mesafeyi temsil eder**
* Boylam değişimi, **Mean Latitude** ile düzeltilir
* Seyir üçgeni hâlâ **dik üçgen** kabul edilir

⬛ **Ana İlke**

════════════════════
Boylam mesafesi
= D.Long × cos Mean Lat
════════════════════

---

### Kullanılan Tanımlar

* **Lat₁, Lat₂** : Başlangıç ve varış enlemleri
* **Long₁, Long₂** : Başlangıç ve varış boylamları
* **D.Lat** : Difference of Latitude (′)
* **D.Long** : Difference of Longitude (′)
* **Mean Lat** : Ortalama enlem
* **Dep** : Departure (′)
* **C** : Course (°T)
* **D** : Distance (NM)

---

### Difference of Latitude (D.Lat)

⬛ **Formül**

════════════════════
D.Lat = Lat₂ − Lat₁
════════════════════

* Kuzeye → **N (+)**
* Güneye → **S (−)**
* 1′ enlem = **1 NM**

---

### Difference of Longitude (D.Long)

⬛ **Formül**

════════════════════
D.Long = Long₂ − Long₁
════════════════════

* Doğuya → **E (+)**
* Batıya → **W (−)**

---

### Mean Latitude

⬛ **Formül**

════════════════════
Mean Lat = (Lat₁ + Lat₂) / 2
════════════════════

* Enlemler **aynı isimde** olmalıdır
* Orta enlem, boylam mesafesinin düzeltmesinde kullanılır

---

### Departure (Dep)

⬛ **Formül**

════════════════════
Dep = D.Long × cos Mean Lat
════════════════════

* Paralel üzerindeki **gerçek doğu–batı mesafesi**
* Sonuç **deniz mili (NM)**

---

### Distance (D)

⬛ **Formül**

════════════════════
D = √[(D.Lat)² + (Dep)²]
════════════════════

* Seyrin gerçek uzunluğu

---

### Course (C)

⬛ **Formül**

════════════════════
tan C = Dep / D.Lat
════════════════════

* C, **meridyene göre** ölçülür
* Quadrant, D.Lat ve Dep işaretlerine göre belirlenir

---

### Seyir Üçgeni (Mean Latitude)

⬛ **Geometrik Yapı**

════════════════════
D.Lat → Meridyen
Dep → Paralel
Distance → Hipotenüs
════════════════════

* Üçgen hem **grafik**, hem **sayısal** çözülebilir

---

### Sayısal Uygulama Örneği

**Verilenler**

* Lat₁: **32°00′ N**
* Long₁: **015°00′ E**
* Lat₂: **34°00′ N**
* Long₂: **018°00′ E**

---

### Hesaplama

⬛ **D.Lat**

════════════════════
D.Lat = 34°00′ − 32°00′
D.Lat = 2° = 120′ (N)
════════════════════

---

⬛ **D.Long**

════════════════════
D.Long = 18°00′ − 15°00′
D.Long = 3° = 180′ (E)
════════════════════

---

⬛ **Mean Latitude**

════════════════════
Mean Lat = (32° + 34°) / 2
Mean Lat = 33°
cos 33° ≈ 0.84
════════════════════

---

⬛ **Departure**

════════════════════
Dep = 180 × 0.84
Dep ≈ 151′
════════════════════

---

⬛ **Distance**

════════════════════
D = √(120² + 151²)
D = √(14400 + 22801)
D = √37201
D ≈ 193 NM
════════════════════

---

⬛ **Course**

════════════════════
tan C = 151 / 120
tan C ≈ 1.26
C ≈ 51°
════════════════════

Yön: **N 51° E → 051°T**

---

### Sonuç

* **Course:** 051°T
* **Distance:** 193 NM

---

### Plane Sailing ile Farkı

* Plane Sailing → kısa mesafe
* Mean Latitude → **orta mesafe**
* Boylam mesafesi → **Mean Lat ile düzeltilir**

---

### Harita Sembolizasyonu

* Başlangıç → ●
* Varış → ×
* D.Lat → meridyen doğrultusu
* Dep → paralel doğrultusu
* Distance → iki nokta arası çizgi

---

### Uygulama Alanı

* Orta enlemde uzun geçişler
* Okyanus dışı seferler
* Eğitim, sınav ve manuel hesaplamalar
* Mercator harita üzerinde klasik seyir çözümü`
      }
    ]
  },
  "Running Fix (Zamana Bağlı Kerterizle Mevki Tayini)": {
    title: "Running Fix (Zamana Bağlı Kerterizle Mevki Tayini)",
    introduction:
      "Running Fix yöntemi, aynı sabit objeye farklı zamanlarda alınan kerterizlerin, geminin seyri ve hızı kullanılarak ilerletilmesi (advance) ve bu kerterizlerden elde edilen LOP’ların kesiştirilmesiyle mevkiin bulunmasına dayanır. Özellikle tek uygun obje bulunduğunda kullanılır.",
    sections: [
      {
        title: "Detaylı Anlatım",
        content: `![Image](https://usercontent.one/wp/www.getlostpowerboattraining.com/wp-content/uploads/2020/03/Screenshot-2020-03-28-at-14.35.54.png?media=1759652400)

![Image](https://www.getlostpowerboattraining.com/wp-content/uploads/2020/03/A-1.png)

![Image](https://usercontent.one/wp/www.getlostpowerboattraining.com/wp-content/uploads/2020/03/A-8-1024x576.png?media=1759652400)

Running Fix yöntemi, **aynı sabit objeye farklı zamanlarda alınan kerterizlerin**, geminin **seyri ve hızı** kullanılarak **ilerletilmesi (advance)** ve bu kerterizlerden elde edilen **LOP’ların kesiştirilmesiyle** mevkiin bulunmasına dayanır. Özellikle **tek uygun obje bulunduğunda** kullanılır.

---

### Temel Prensip

* Aynı objeye **iki farklı zamanda** kerteriz alınır
* Zamanlar arasında gemi **bilinen rota ve hızla** ilerler
* İlk kerteriz, **seyir mesafesi kadar ileri taşınır**
* İkinci kerterizle kesişim → **Running Fix**

⬛ **Ana İlke**

════════════════════
İlk LOP
seyir kadar
ileri alınır
+
ikinci LOP
= Fix
════════════════════

---

### Kullanılan Tanımlar

* **Obj A** : Sabit ve tanımlı obje
* **Brg₁, Brg₂** : 1. ve 2. kerteriz (°T)
* **t₁, t₂** : Kerteriz zamanları
* **C** : Course (°T)
* **V** : Speed (kn)
* **D** : t₁–t₂ arası seyir mesafesi (NM)
* **LOP** : Line of Position
* **Fix** : Mevki

---

### Zaman–Mesafe İlişkisi

⬛ **Formül**

════════════════════
D = V × Δt
════════════════════

* Δt saat cinsindendir
* Mesafe **deniz mili (NM)**

---

### Kerterizin LOP’a Dönüştürülmesi

⬛ **Kural**

════════════════════
LOP yönü
= Kerteriz + 180°
════════════════════

* LOP, **objeden gemiye** doğru çizilir

---

### İlk LOP’un İlerletilmesi (Advance)

⬛ **İlerletme Kuralı**

════════════════════
İlk LOP
C doğrultusunda
D kadar
taşınır
════════════════════

* Taşıma **paralel** yapılır
* Açı ve doğrultu korunur

---

### Sayısal Uygulama Örneği

**Verilenler**

* Obj A
* **t₁ = 10:00** → Brg₁ = **045°T**
* **t₂ = 10:30** → Brg₂ = **090°T**
* Course **C = 120°T**
* Speed **V = 12 kn**

---

### Hesaplama

⬛ **Zaman Farkı**

════════════════════
Δt = 30 dk = 0.5 saat
════════════════════

⬛ **Seyir Mesafesi**

════════════════════
D = 12 × 0.5
D = 6 NM
════════════════════

---

### Harita Çözümü

⬛ **Birinci LOP**

════════════════════
Brg₁ = 045°T
LOP₁ = 225°T
Obj A’dan çizilir
════════════════════

⬛ **LOP₁’in İlerletilmesi**

════════════════════
LOP₁
120°T doğrultusunda
6 NM
ileri taşınır
════════════════════

⬛ **İkinci LOP**

════════════════════
Brg₂ = 090°T
LOP₂ = 270°T
Obj A’dan çizilir
════════════════════

---

### Running Fix

════════════════════
İleri alınmış LOP₁
∩
LOP₂
= Running Fix
════════════════════

Bu nokta, **t₂ anındaki gemi mevkii**dir.

---

### Geometrik Özellikler

* Kerterizler arası açı büyüdükçe **hassasiyet artar**
* Seyir hatası, Fix’e **doğrudan yansır**
* Sabit rota ve hız varsayımı esastır

---

### Hata Kaynakları

* Hız veya rota değişimi
* Akıntının hesaba katılmaması
* Kerterizlerin eş zamanlı olmaması
* Objeye çok yakın kerteriz alınması

---

### Harita Sembolizasyonu

* Sabit obje → ▲
* İlk LOP → kesik çizgi
* İleri alınmış LOP → paralel kesik çizgi
* İkinci LOP → düz çizgi
* Running Fix → ●

---

### Kullanım Alanları

* Tek uygun obje bulunan kıyı seyri
* Radar veya görsel kerterizle seyir
* Eğitim ve klasik seyrüsefer uygulamaları
* Elektronik fix’in teyidi`
      }
    ]
  },
  "Transit (Leading Line)": {
    title: "Transit (Leading Line)",
    introduction:
      "Transit (Leading Line) yöntemi, iki sabit objenin tam doğrultuya girmesi (üst üste gelmesi) durumunda geminin bilinen bir hat üzerinde bulunduğunun kesin olarak tespit edilmesine dayanır. Bu yöntemle elde edilen hat, bir Line of Position (LOP)’tur ve klasik seyirde en güvenilir LOP kabul edilir.",
    sections: [
      {
        title: "Detaylı Anlatım",
        content: `![Image](https://keyassets.timeincuk.net/inspirewp/live/wp-content/uploads/sites/19/2015/08/lead-light1_cmyk.jpg)

![Image](https://usercontent.one/wp/www.getlostpowerboattraining.com/wp-content/uploads/2020/03/Screenshot-2020-03-28-at-14.21.27-1024x574.png?media=1759652400)

![Image](https://keyassets.timeincuk.net/inspirewp/live/wp-content/uploads/sites/19/2015/08/transit-hd_cmyk.jpg)

![Image](https://keyassets.timeincuk.net/inspirewp/live/wp-content/uploads/sites/19/2015/08/lead-light2_cmyk-533x400.jpg)

---

### Temel Prensip

* İki sabit obje seçilir
* Objeler **aynı doğrultuda hizalandığında** transit oluşur
* Bu doğrultu geminin bulunduğu **kesin LOP**’tur

⬛ **Ana İlke**

════════════════════
İki obje
aynı doğrultuda
= gemi
o hat üzerindedir
════════════════════

---

### Transit Fix (Leading Lines ile Mevki Tayini)

Transit Fix, iki sabit objenin gemiden bakıldığında aynı doğrultu üzerinde hizalanması (transit/leading line) prensibine dayanarak oluşturulan tek bir LOP ile, bu LOP’un başka bir LOP ile kesiştirilmesi sonucu kesin mevki (Fix) elde edilmesidir. Klasik (terrestrial) navigasyonda en yüksek doğruluğa sahip görsel yöntemlerden biridir.

---

### Temel Prensip

İki obje hizalandığında, gemi bu objeleri birleştiren doğru üzerinde bulunur. Bu doğru Transit LOP’tur.

⬛ **Ana İlke**

════════════════════
Hizalanan Objeler → Tek LOP (Transit)
Transit LOP ∩ Diğer LOP = Fix
════════════════════

---

### Kullanılan Tanımlar

Transit : İki objenin aynı doğrultuda görünmesi

Leading Line : Transit doğrultusu

LOP : Konum doğrusu

Fix : Kesin mevki

---

### Transit LOP’un Özelliği

Açı ölçümü yoktur

Pusula hatasından bağımsızdır

Görsel hassasiyeti çok yüksektir

⬛ **Pratik Kural**

════════════════════
Transit = En Güvenilir LOP
════════════════════

---

### Transit ile Fix Oluşturma

Transit tek başına fix vermez; mutlaka ikinci bir LOP gerekir:

Kerteriz

Kerteriz + Running Fix

Kerteriz + Mesafe (radar)

---

### Sayısal Uygulama Örneği (Transit + Kerteriz)

**Verilenler**

Obje A ve Obje B hizalı → Transit LOP

Aynı anda Obje C kerterizi: 060°T

---

### Hesaplama

⬛ **Kerteriz Tersi**

════════════════════
Bᵣ = 060° + 180°
Bᵣ = 240°
════════════════════

---

### Harita Uygulaması

1. Haritada A–B doğrusu çizilir → Transit LOP

2. Obje C’den 240° doğrultusunda LOP çizilir

3. Kesişim noktası → Fix

---

### Transit + Mesafe (Radar)

Transit LOP, radar mesafesi ile de kesiştirilebilir.

⬛ **Radar LOP**

════════════════════
Sabit Mesafe = Çember LOP
════════════════════

Radar mesafesi → çember

Transit → doğru

Kesişim → Fix

---

### Geometrik Hassasiyet

Transit doğrultusuna dik gelen ikinci LOP → en iyi fix

Paralel veya dar açılı kesişimler hatayı büyütür

⬛ **İdeal Kesişim**

════════════════════
60°–90°
════════════════════

---

### Harita Sembolizasyonu

Transit LOP → kalın çizgi

Kerteriz LOP → ince çizgi

Fix → ●

Zaman → fix yanına yazılır

---

### Kullanım Alanları

Liman girişleri

Dar kanal seyri

Tehlikeli sığlık hatlarının takibi

Pilotaj seyri

Transit Fix yöntemi, klasik (terrestrial) navigasyonda yüksek doğruluk, düşük hata ve hızlı uygulama avantajlarıyla özellikle kıyı ve liman seyirlerinde vazgeçilmez bir tekniktir.

---

### Kullanılan Tanımlar

* **Obj A (arka)** : Daha uzakta kalan obje
* **Obj B (ön)** : Gemiye daha yakın obje
* **Transit Line** : Objelerden geçen doğrultu
* **LOP** : Line of Position
* **Fix** : Mevki (başka bir LOP ile)

---

### Transit’in LOP Özelliği

⬛ **Önemli Kural**

════════════════════
Transit
hatasız
bir LOP’tur
════════════════════

* Açı ölçümü yoktur
* Kerteriz hatası içermez
* Görsel olarak teyit edilir

---

### Haritada Transit Çizimi

⬛ **Çizim Kuralı**

════════════════════
Obj A
ile
Obj B
arasına
düz çizgi
════════════════════

* Çizgi **iki objeden geçer**
* Bu çizgi geminin **mevki hattıdır**

---

### Transit + Başka Bir LOP = Fix

⬛ **Fix Prensibi**

════════════════════
Transit LOP
+
ikinci LOP
= Fix
════════════════════

İkinci LOP şu yöntemlerden biri olabilir:

* Kerteriz
* Mesafe (COP)
* Başka bir transit

---

### Sayısal Uygulama Örneği (Transit + Kerteriz)

**Verilenler**

* Obj A ve Obj B transit hâlinde
* Obj C kerterizi: **310°T**

---

### Harita Çözümü

⬛ **Transit LOP**

════════════════════
Obj A – Obj B
arasına
düz çizgi
════════════════════

⬛ **Kerteriz LOP’u**

════════════════════
310°T + 180° = 130°T
Obj C’den
130°T doğrultusunda
LOP çizilir
════════════════════

---

### Fix

════════════════════
Transit LOP
∩
Kerteriz LOP
= Fix
════════════════════

Bu nokta, ölçüm anındaki **kesin gemi mevkii**dir.

---

### İki Transit ile Fix

⬛ **Özellik**

════════════════════
İki transit
===========

doğrudan Fix
════════════════════

* Liman girişlerinde yaygındır
* Leading marks bu amaçla yerleştirilir

---

### Geometrik Avantajlar

* Hata payı **minimumdur**
* Görsel teyit kolaydır
* Eğitim ve sınavlarda **yüksek güvenilirlik**

---

### Hata Kaynakları

* Yanlış obje seçimi
* Objelerin birbirine çok yakın olması
* Perspektif yanılması
* Düşük görüş şartları

---

### Harita Sembolizasyonu

* Sabit obje → ▲
* Transit hattı → kalın düz çizgi
* Fix → ●

---

### Kullanım Alanları

* Liman yaklaşmaları
* Kanal ve dar geçit seyri
* Clearing line oluşturma
* Elektronik sistemlerin görsel teyidi

Transit (Leading Line), klasik seyirde **en güvenilir ve en basit** mevki tayin yöntemlerinden biridir ve özellikle **seyir emniyetinin kritik olduğu bölgelerde** vazgeçilmezdir.`
      }
    ]
  },
  "Course and Distance Given Mean Latitude": {
    title: "Course and Distance Given Mean Latitude",
    introduction:
      "Bu alt başlıkta, başlangıç mevkii, rota (Course) ve mesafe (Distance) bilindiğinde; enlem ve boylam değişimlerinin Mean Latitude yöntemiyle hesaplanması ele alınır. Bu çözüm, Middle Latitude Sailing’in doğrudan (direct) problemidir.",
    sections: [
      {
        title: "Detaylı Anlatım",
        content: `![Image](https://www.marinepublic.com/_next/image?q=75&url=https%3A%2F%2Fik.imagekit.io%2Fh53vszdxp%2Fillustration_Great_Circle_and_Composite_GC_comparison_fxcf5a.jpg&w=3840)

![Image](https://deckskills.tripod.com/sitebuildercontent/sitebuilderpictures/mid_lat_triangle.jpg)

![Image](https://www.onboardintelligence.com/CelestialNav/Images/astro6.gif)

![Image](https://sailingissues.com/vier/longitude-latitude-explained-3x.png)

---

### Temel Prensip

* Rota ve mesafe, bir **dik seyir üçgeni** oluşturur
* Mesafe, **D.Lat** ve **Departure** bileşenlerine ayrılır
* Boylam değişimi, **Mean Latitude** ile düzeltilir

⬛ **Ana İlke**

════════════════════
Distance
→ D.Lat + Dep
Dep → D.Long / cos Mean Lat
════════════════════

---

### Kullanılan Tanımlar

* **Lat₁, Long₁** : Başlangıç mevkii
* **Lat₂, Long₂** : Varış mevkii
* **C** : Course (°T)
* **D** : Distance (NM)
* **D.Lat** : Difference of Latitude (′)
* **Dep** : Departure (′)
* **D.Long** : Difference of Longitude (′)
* **Mean Lat** : Ortalama enlem

---

### Distance’in Bileşenlere Ayrılması

⬛ **Formüller**

════════════════════
D.Lat = D × cos C
════════════════════

════════════════════
Dep = D × sin C
════════════════════

* C, **meridyene göre** ölçülür
* İşaretler (N/S – E/W), rota quadrantına göre belirlenir

---

### Mean Latitude

⬛ **Formül**

════════════════════
Mean Lat = (Lat₁ + Lat₂) / 2
════════════════════

* İlk aşamada Lat₂ bilinmediğinden,
  **yaklaşık Mean Lat** kullanılır
* Hesap sonunda gerekiyorsa **düzeltme yapılır**

---

### Difference of Longitude

⬛ **Formül**

════════════════════
D.Long = Dep / cos Mean Lat
════════════════════

* Sonuç **dakika (′)** cinsindedir
* E (+), W (−) olarak işaretlenir

---

### Enlem ve Boylamın Bulunması

⬛ **Enlem**

════════════════════
Lat₂ = Lat₁ ± D.Lat
════════════════════

⬛ **Boylam**

════════════════════
Long₂ = Long₁ ± D.Long
════════════════════

* İşaretler rota yönüne göre seçilir

---

### Sayısal Uygulama Örneği

**Verilenler**

* Lat₁ = **30°00′ N**
* Long₁ = **020°00′ E**
* Course **C = 060°T**
* Distance **D = 200 NM**

---

### Hesaplama

⬛ **D.Lat**

════════════════════
D.Lat = 200 × cos 60°
D.Lat = 200 × 0.5
D.Lat = 100′ (N)
════════════════════

---

⬛ **Departure**

════════════════════
Dep = 200 × sin 60°
Dep = 200 × 0.866
Dep ≈ 173′ (E)
════════════════════

---

⬛ **Yeni Enlem**

════════════════════
Lat₂ = 30°00′ + 100′
Lat₂ = 31°40′ N
════════════════════

---

⬛ **Mean Latitude**

════════════════════
Mean Lat = (30°00′ + 31°40′) / 2
Mean Lat = 30°50′ ≈ 30.8°
cos 30.8° ≈ 0.86
════════════════════

---

⬛ **D.Long**

════════════════════
D.Long = 173 / 0.86
D.Long ≈ 201′
════════════════════

---

⬛ **Yeni Boylam**

════════════════════
Long₂ = 020°00′ + 201′
Long₂ = 023°21′ E
════════════════════

---

### Sonuç Mevkii

════════════════════
Lat₂ = 31°40′ N
Long₂ = 023°21′ E
════════════════════

---

### Seyir Üçgeni Özeti

* Hipotenüs → Distance
* Düşey kenar → D.Lat
* Yatay kenar → Departure
* Boylam → Mean Latitude ile düzeltilir

---

### Harita Sembolizasyonu

* Başlangıç mevkii → ●
* Varış mevkii → ×
* Course → ok işareti
* D.Lat → meridyen doğrultusu
* Dep → paralel doğrultusu

---

### Uygulama Alanı

* Orta enlemde seyir planlaması
* Varış mevkii öngörüsü
* Manuel sınav ve eğitim çözümleri
* Elektronik sistemlerin hesap teyidi`
      }
    ]
  },
  "Clearing Line (Emniyet Hattı)": {
    title: "Clearing Line (Emniyet Hattı)",
    introduction:
      "Clearing Line, geminin belirli bir tehlikeden (sığlık, kaya, resif, kıyı) güvenli tarafta kaldığını kesin olarak gösteren, önceden hesaplanmış ve harita üzerine çizilmiş bir Line of Position (LOP)’tur. Bu hattın tehlikeli tarafına geçilmediği sürece, gemi emniyetli bölgede kabul edilir.",
    sections: [
      {
        title: "Detaylı Anlatım",
        content: `![Image](https://keyassets.timeincuk.net/inspirewp/live/wp-content/uploads/sites/19/2015/08/Tacking-into-an-entrance.jpg)

![Image](https://imgv2-2-f.scribdassets.com/img/document/452965426/original/a1fe3b13d5/1?v=1)

![Image](https://keyassets.timeincuk.net/inspirewp/live/wp-content/uploads/sites/20/2020/07/LIGHT-RECOGNITION.png)

![Image](https://www.sailtrain.co.uk/gps/images/xteclearing.gif)

---

### Temel Prensip

* Tehlike belirlenir
* Tehlikeyi **emniyetle teğet geçen** bir doğrultu seçilir
* Bu doğrultu **Clearing Line** olarak çizilir
* Gemi bu hattın **güvenli tarafında** kalır

⬛ **Ana İlke**

════════════════════
Clearing Line
aşılmadığı sürece
tehlike yoktur
════════════════════

---

### Kullanılan Tanımlar

* **Hazard** : Sığlık, kaya, resif vb.
* **Clearing Point** : Tehlikeye en yakın emniyet noktası
* **Clearing Bearing** : Emniyet kerterizi (°T)
* **Clearing Line** : Emniyet hattı (LOP)
* **Safe Side** : Emniyetli taraf

---

### Clearing Line’ın Özelliği

⬛ **LOP Niteliği**

════════════════════
Clearing Line
=============

tek yönlü LOP
════════════════════

* Hat **aşılmaz**, sadece **taraf kontrolü** yapılır
* Fix için başka bir LOP gerekir

---

### Clearing Bearing’in Belirlenmesi

⬛ **Kural**

════════════════════
Tehlikeye
emniyet mesafesiyle
teğet doğrultu
════════════════════

* Tehlike ile gemi arasında **minimum mesafe** bırakılır
* Bu doğrultu haritadan **ölçülür**

---

### Haritada Clearing Line Çizimi

⬛ **Çizim Kuralı**

════════════════════
Tehlike noktası
üzerinden
Clearing Bearing
doğrultusunda
düz çizgi
════════════════════

* Çizgi, tehlikeden geçer
* Emniyetli taraf **işaretlenir**

---

### Sayısal Uygulama Örneği (Clearing Bearing)

**Verilenler**

* Tehlike: Kaya
* Kaya etrafında emniyet mesafesi: **0.5 NM**
* Haritadan ölçülen teğet doğrultu: **045°T**

---

### Clearing Line

════════════════════
Clearing Bearing
= 045°T
Clearing Line
kaya üzerinden
045°T doğrultusunda
════════════════════

* Gemi **045°T’nin güvenli tarafında** kaldığı sürece emniyettedir

---

### Clearing Line + Kerteriz Kullanımı

⬛ **Uygulama**

════════════════════
Gemi kerterizi
Clearing Bearing
ile karşılaştırılır
════════════════════

* Kerteriz **Clearing Bearing’i geçerse** → tehlike

---

### Sayısal Uygulama Örneği (Kerteriz Kontrolü)

**Verilenler**

* Clearing Bearing: **045°T**
* Tehlike objesi kerterizi: **030°T**

════════════════════
030°T < 045°T
→ Emniyetli tarafta
════════════════════

---

### Clearing Line + Başka LOP = Fix

⬛ **Fix Prensibi**

════════════════════
Clearing Line
+
Kerteriz / Mesafe / Transit
= Fix
════════════════════

* Clearing Line, **emniyeti**
* İkinci LOP, **mevkii** sağlar

---

### Geometrik Özellikler

* Clearing Line, genellikle **kıyıya paralel değildir**
* Tehlikeye **teğet** geçer
* Geniş açılı doğrultular tercih edilir

---

### Hata Kaynakları

* Yanlış tehlike seçimi
* Yetersiz emniyet mesafesi
* Harita ölçeğinin dikkate alınmaması
* Kerterizin yanlış yorumlanması

---

### Harita Sembolizasyonu

* Tehlike → ✖ / ★
* Clearing Line → kalın kesik çizgi
* Emniyetli taraf → ok veya tarama
* Gemi mevkii → ●

---

### Kullanım Alanları

* Kıyı seyri
* Dar geçitler
* Liman yaklaşmaları
* Elektronik sistemlerin emniyet teyidi

Clearing Line, klasik seyrüseferde **fix sağlamaz**, ancak geminin **tehlikeden uzak kaldığını kesin olarak garanti eden** en kritik emniyet araçlarından biridir.`
      }
    ]
  },
  "Distance Off by Vertical Angle": {
    title: "Distance Off by Vertical Angle",
    introduction:
      "Distance Off by Vertical Angle yöntemi, yüksekliği bilinen bir objenin tepe ve tabanı arasında ölçülen düşey açıdan, gemi ile obje arasındaki yatay mesafenin hesaplanmasına dayanır. Kıyı seyri ve liman yaklaşmalarında tek başına bir LOP olarak kullanılır veya başka bir LOP ile Fix oluşturur.",
    sections: [
      {
        title: "Detaylı Anlatım",
        content: `![Image](https://i0.wp.com/astrolabesailing.com/wp-content/uploads/2016/08/distance-off.jpg?fit=1200%2C901&ssl=1&w=640)

![Image](https://imgv2-2-f.scribdassets.com/img/document/670945450/original/8747219132/1?v=1)

![Image](https://d8it4huxumps7.cloudfront.net/bites/wp-content/banners/2024/3/6604eb9fe708f_angle_of_elevation.jpg)

![Image](https://www.researchgate.net/publication/233881034/figure/fig12/AS%3A214238104481818%401428089752752/Calculation-of-elevation-angle-from-two-GPS-measures.png)

---

### Temel Prensip

* Yüksekliği bilinen bir obje seçilir
* Objeye ait **düşey açı (Vertical Angle)** ölçülür
* Trigonometrik ilişki ile **mesafe** hesaplanır

⬛ **Ana İlke**

════════════════════
tan θ
=====

Obj Yüksekliği / Mesafe
════════════════════

---

### Kullanılan Tanımlar

* **H** : Objeye ait yükseklik (m)
* **θ** : Düşey açı (°)
* **D** : Yatay mesafe (m veya NM)
* **HA** : Height of Eye (m)
* **Effective Height** : Etkin yükseklik

---

### Etkin Yüksekliğin Belirlenmesi

⬛ **Formül**

════════════════════
Effective Height
= Obj Yüksekliği − Height of Eye
════════════════════

* Göz yüksekliği, objenin tabanı **deniz seviyesindeyse** düşülür
* Deniz fenerleri ve kulelerde standart uygulamadır

---

### Mesafe Hesabı

⬛ **Temel Formül**

════════════════════
D = Effective Height / tan θ
════════════════════

* Sonuç **metre** cinsindendir
* Deniz mili için dönüşüm gerekir

⬛ **Birim Dönüşümü**

════════════════════
1 NM = 1852 m
════════════════════

---

### Grafik Yorum

* Düşey açı **küçüldükçe** mesafe artar
* Yakın mesafelerde yöntem **çok hassastır**
* Uzak mesafede küçük açı hatası → **büyük mesafe hatası**

---

### Sayısal Uygulama Örneği

**Verilenler**

* Obje yüksekliği (**H**) = **30 m**
* Height of Eye (**HA**) = **5 m**
* Ölçülen düşey açı (**θ**) = **2°**

---

### Hesaplama

⬛ **Etkin Yükseklik**

════════════════════
Effective Height = 30 − 5
Effective Height = 25 m
════════════════════

---

⬛ **Mesafe (metre)**

════════════════════
D = 25 / tan 2°
tan 2° ≈ 0.0349
D ≈ 716 m
════════════════════

---

⬛ **Mesafe (NM)**

════════════════════
D = 716 / 1852
D ≈ 0.39 NM
════════════════════

---

### LOP Olarak Kullanımı

⬛ **LOP Niteliği**

════════════════════
Distance Off
============

yarıçapı bilinen
daire yayı
════════════════════

* Obje merkez alınır
* Hesaplanan mesafe yarıçap kabul edilir

---

### Distance Off + Kerteriz = Fix

⬛ **Fix Prensibi**

════════════════════
Mesafe yayı
+
Kerteriz LOP
= Fix
════════════════════

---

### Harita Çözümü

* Obje merkezli **yarıçap = D** daire yayı
* Objeden alınan kerteriz LOP’u
* Kesişim noktası → **Fix**

---

### Hata Kaynakları

* Yanlış yükseklik bilgisi
* Height of Eye’nin ihmal edilmesi
* Küçük açı ölçüm hataları
* Dalgadan kaynaklı göz hizası değişimi

---

### Harita Sembolizasyonu

* Sabit obje → ▲
* Mesafe yayı → kesik daire yayı
* Kerteriz LOP’u → düz çizgi
* Fix → ●

---

### Kullanım Alanları

* Liman yaklaşmaları
* Kıyıya mesafe kontrolü
* Tek obje bulunan seyir sahaları
* Elektronik mesafe ölçümünün teyidi

Distance Off by Vertical Angle, klasik seyrüseferde **tek ölçümle güvenilir mesafe** sağlayan, özellikle **kıyı emniyetinde** kritik öneme sahip bir yöntemdir.`
      }
    ]
  },
  "Course and Distance Between Two Positions (Mean Latitude)": {
    title: "Course and Distance Between Two Positions (Mean Latitude)",
    introduction:
      "Bu alt başlıkta, başlangıç ve varış mevkileri bilindiğinde, rota (Course) ve mesafenin (Distance) Mean Latitude yöntemiyle hesaplanması ele alınır. Bu çözüm, Middle Latitude Sailing’in ters (inverse) problemidir ve klasik seyirde en sık kullanılan hesaplamalardan biridir.",
    sections: [
      {
        title: "Detaylı Anlatım",
        content: `![Image](https://astronavigationdemystified.com/wp-content/uploads/2016/09/diag15-mod.jpg)

![Image](https://sailingissues.com/vier/running-fix-3x.png)

![Image](https://deckskills.tripod.com/sitebuildercontent/sitebuilderpictures/mid_lat_triangle.jpg)

![Image](https://marinegyaan.com/wp-content/uploads/2016/09/plane-sailing.jpg)

---

### Temel Prensip

* İki mevki arasındaki **D.Lat** ve **D.Long** bulunur
* Boylam farkı, **Mean Latitude** ile düzeltilerek **Departure** elde edilir
* Dik seyir üçgeninden **Course** ve **Distance** hesaplanır

⬛ **Ana İlke**

════════════════════
D.Lat + Dep
→
Course & Distance
════════════════════

---

### Kullanılan Tanımlar

* **Lat₁, Long₁** : Başlangıç mevkii
* **Lat₂, Long₂** : Varış mevkii
* **D.Lat** : Difference of Latitude (′)
* **D.Long** : Difference of Longitude (′)
* **Mean Lat** : Ortalama enlem
* **Dep** : Departure (′)
* **C** : Course (°T)
* **D** : Distance (NM)

---

### Difference of Latitude (D.Lat)

⬛ **Formül**

════════════════════
D.Lat = Lat₂ − Lat₁
════════════════════

* Kuzeye → **N (+)**
* Güney → **S (−)**
* 1′ enlem = **1 NM**

---

### Difference of Longitude (D.Long)

⬛ **Formül**

════════════════════
D.Long = Long₂ − Long₁
════════════════════

* Doğuya → **E (+)**
* Batıya → **W (−)**

---

### Mean Latitude

⬛ **Formül**

════════════════════
Mean Lat = (Lat₁ + Lat₂) / 2
════════════════════

* Enlemler **aynı isimde** olmalıdır
* Boylam mesafesinin düzeltilmesinde kullanılır

---

### Departure (Dep)

⬛ **Formül**

════════════════════
Dep = D.Long × cos Mean Lat
════════════════════

* Paralel üzerindeki **gerçek doğu–batı mesafesi**
* Sonuç **dakika (′)** cinsindedir

---

### Distance (D)

⬛ **Formül**

════════════════════
D = √[(D.Lat)² + (Dep)²]
════════════════════

* Seyrin gerçek uzunluğu
* Sonuç **deniz mili (NM)**

---

### Course (C)

⬛ **Formül**

════════════════════
tan C = Dep / D.Lat
════════════════════

* C, **meridyene göre** ölçülür
* Quadrant, D.Lat ve Dep işaretlerine göre belirlenir

---

### Sayısal Uygulama Örneği

**Verilenler**

* Lat₁ = **28°20′ N**
* Long₁ = **017°40′ E**
* Lat₂ = **31°50′ N**
* Long₂ = **021°10′ E**

---

### Hesaplama

⬛ **D.Lat**

════════════════════
31°50′ − 28°20′
= 3°30′
= 210′ (N)
════════════════════

---

⬛ **D.Long**

════════════════════
21°10′ − 17°40′
= 3°30′
= 210′ (E)
════════════════════

---

⬛ **Mean Latitude**

════════════════════
Mean Lat
= (28°20′ + 31°50′) / 2
= 30°05′ ≈ 30.1°
cos 30.1° ≈ 0.866
════════════════════

---

⬛ **Departure**

════════════════════
Dep = 210 × 0.866
Dep ≈ 182′
════════════════════

---

⬛ **Distance**

════════════════════
D = √(210² + 182²)
D = √(44100 + 33124)
D = √77224
D ≈ 278 NM
════════════════════

---

⬛ **Course**

════════════════════
tan C = 182 / 210
tan C ≈ 0.87
C ≈ 41°
════════════════════

Yön: **N 41° E → 041°T**

---

### Sonuç

════════════════════
Course = 041°T
Distance = 278 NM
════════════════════

---

### Seyir Üçgeni Özeti

* Düşey kenar → D.Lat
* Yatay kenar → Departure
* Hipotenüs → Distance
* Açı → Course

---

### Harita Sembolizasyonu

* Başlangıç mevkii → ●
* Varış mevkii → ×
* D.Lat → meridyen doğrultusu
* Dep → paralel doğrultusu
* Course → yön oku

---

### Uygulama Alanı

* İki mevki arası rota planlaması
* Seyir defteri hesapları
* Manuel sınav ve klasik çözümler
* Elektronik sistemlerin kontrolü`
      }
    ]
  },
  "Distance Off by Horizontal Angle": {
    title: "Distance Off by Horizontal Angle",
    introduction:
      "Distance Off by Horizontal Angle yöntemi, aynı doğrultuda olmayan iki sabit obje arasındaki yatay açının ölçülmesiyle, geminin bu objelere olan mesafesinin trigonometrik olarak tayin edilmesine dayanır. Kıyı seyirlerinde, özellikle iki belirgin obje mevcutken, tek ölçümle güvenilir bir LOP sağlar.",
    sections: [
      {
        title: "Detaylı Anlatım",
        content: `![Image](https://i0.wp.com/astrolabesailing.com/wp-content/uploads/2016/08/distance-off.jpg?fit=1200%2C901&ssl=1&w=640)

![Image](https://maritimesa.org/nautical-science-grade-10/wp-content/uploads/sites/5/2020/11/10.1.5.10_fig_1-1024x906.jpg)

![Image](https://maritimesa.org/nautical-science-grade-10/wp-content/uploads/sites/5/2020/12/10.1.5.16_fig_5.jpg)

![Image](https://jerrymahun.com/images/open_access/angles/hor_def.png)

---

### Temel Prensip

* İki sabit obje seçilir
* Objeler arasındaki **yatay açı (Horizontal Angle)** ölçülür
* Objelere olan mesafe, **üçgen geometrisi** ile hesaplanır

⬛ **Ana İlke**

════════════════════
sin A / a
=========

sin B / b

sin C / c
════════════════════

---

### Kullanılan Tanımlar

* **Obj A, Obj B** : Sabit objeler
* **θ** : Ölçülen yatay açı (°)
* **d** : Objeler arası bilinen mesafe (haritadan)
* **D** : Geminin objelere olan mesafesi
* **LOP** : Line of Position

---

### Geometrik Yapı

* Obj A ile Obj B arası mesafe **taban (d)**
* Gemi, bu tabana karşı **θ açısını** görür
* Oluşan üçgen **düzlemsel üçgendir**

---

### Temel Trigonometrik İlişki

⬛ **Formül (İkizkenar Olmayan Genel Durum)**

════════════════════
D = d / (2 × tan(θ / 2))
════════════════════

* D, geminin **iki objeye ortalama mesafesidir**
* θ derece cinsindendir

---

### Özel Durum (İkizkenar Yaklaşımı)

Objeler gemiye yaklaşık eşit mesafedeyse:

⬛ **Basitleştirilmiş Formül**

════════════════════
D ≈ d / (2 × tan(θ / 2))
════════════════════

Bu yaklaşım klasik sınav ve pratik seyirde yaygındır.

---

### Sayısal Uygulama Örneği

**Verilenler**

* Obj A – Obj B arası mesafe (**d**) = **1.2 NM**
* Ölçülen yatay açı (**θ**) = **20°**

---

### Hesaplama

⬛ **Yarım Açı**

════════════════════
θ / 2 = 10°
tan 10° ≈ 0.176
════════════════════

---

⬛ **Mesafe**

════════════════════
D = 1.2 / (2 × 0.176)
D = 1.2 / 0.352
D ≈ 3.41 NM
════════════════════

---

### Sonuç

════════════════════
Geminin
Obj A ve Obj B’ye
ortalama mesafesi
≈ 3.4 NM
════════════════════

---

### LOP Olarak Kullanımı

⬛ **LOP Niteliği**

════════════════════
Yatay açı
=========

dairenin
bir yayı
════════════════════

* Obj A ve Obj B, dairenin **kiriş noktalarıdır**
* Ölçülen açıya karşılık gelen **dairenin yayı**, geminin bulunduğu hattı verir

---

### Horizontal Angle + Kerteriz = Fix

⬛ **Fix Prensibi**

════════════════════
Yatay Açı LOP’u
+
Kerteriz LOP’u
= Fix
════════════════════

---

### Harita Çözümü

* Obj A ve Obj B işaretlenir
* Yatay açıya karşılık gelen **dairesel yay** çizilir
* İkinci LOP ile kesişim → **Fix**

---

### Hata Kaynakları

* Objelerin aynı hatta çok yakın olması
* Küçük yatay açı ölçümü
* Sextant hizalama hatası
* Haritadan mesafe ölçüm hatası

---

### Harita Sembolizasyonu

* Sabit objeler → ▲ ▲
* Yatay açı yayı → kesik daire yayı
* Kerteriz LOP’u → düz çizgi
* Fix → ●

---

### Kullanım Alanları

* Kıyı seyri
* Liman yaklaşmaları
* İki belirgin obje bulunan bölgeler
* Elektronik fix teyidi

Distance Off by Horizontal Angle, klasik seyrüseferde **tek ölçümle mesafe tayini** sağlayan, özellikle **görsel şartların iyi olduğu kıyı sularında** etkili bir yöntemdir.`
      }
    ]
  },
  "Running Fix (Koşmalı Mevki Tayini)": {
    title: "Running Fix (Koşmalı Mevki Tayini)",
    introduction:
      "Running Fix, tek bir sabit objeden farklı zamanlarda alınan iki (veya daha fazla) LOP’un, geminin seyri ve kat edilen mesafe kadar ileri taşınmasıyla mevkiin tayin edilmesi yöntemidir. Özellikle tek obje bulunan kıyı sahalarında ve görüş kısıtlıyken klasik seyrüseferin temel çözümlerindendir.",
    sections: [
      {
        title: "Detaylı Anlatım",
        content: `![Image](https://usercontent.one/wp/www.getlostpowerboattraining.com/wp-content/uploads/2020/03/Screenshot-2020-03-28-at-14.35.54.png?media=1759652400)

![Image](https://usercontent.one/wp/www.getlostpowerboattraining.com/wp-content/uploads/2020/03/A-8-1024x576.png?media=1759652400)

![Image](https://www.getlostpowerboattraining.com/wp-content/uploads/2020/03/A-1.png)

![Image](https://www.sailtrain.co.uk/navigation/images/runfix1.gif)

---

### Temel Prensip

* Aynı objeden **farklı zamanlarda** LOP alınır
* İlk LOP, geminin **seyri ve mesafesi** kadar ileri taşınır
* Taşınan LOP ile ikinci LOP’un kesişimi **Fix** verir

⬛ **Ana İlke**

════════════════════
İlk LOP
+
Advance
∩
İkinci LOP
= Fix
════════════════════

---

### Kullanılan Tanımlar

* **LOP₁** : İlk mevki hattı
* **LOP₂** : İkinci mevki hattı
* **Advance** : Seyir + Mesafe ile ileri taşıma
* **C** : Course (°T)
* **D** : Distance (NM)
* **Fix** : Koşmalı mevki

---

### Advance (İleri Taşıma)

⬛ **Tanım**

════════════════════
Advance
=======

Course yönünde
Distance kadar
LOP taşıma
════════════════════

* Advance, **vektörel** bir işlemdir
* Yön ve mesafe **mutlaka doğru** olmalıdır

---

### Running Fix’te Kullanılan LOP Türleri

* Kerteriz
* Transit
* Mesafe (Distance Off)
* Clearing Line

⬛ **En Yaygın Kombinasyon**

════════════════════
Kerteriz
+
Kerteriz
════════════════════

---

### Haritada Çözüm Adımları

1. İlk LOP çizilir
2. Geminin **Course** ve **Distance**’ı hesaplanır
3. İlk LOP, bu değerlerle **ileri taşınır**
4. İkinci LOP çizilir
5. Kesişim noktası → **Running Fix**

---

### Sayısal Uygulama Örneği (Kerteriz + Kerteriz)

**Verilenler**

* Sabit obje: Deniz feneri
* 1. kerteriz (T₁): **045°T**
* 2. kerteriz (T₂): **320°T**
* İki ölçüm arası seyir:

  * Course = **090°T**
  * Distance = **6 NM**

---

### Harita Çözümü

⬛ **İlk LOP**

════════════════════
045°T + 180°
= 225°T
Fenerden
225°T doğrultusunda
LOP₁
════════════════════

---

⬛ **Advance**

════════════════════
LOP₁
090°T yönünde
6 NM
ileri taşınır
════════════════════

---

⬛ **İkinci LOP**

════════════════════
320°T + 180°
= 140°T
Fenerden
140°T doğrultusunda
LOP₂
════════════════════

---

### Running Fix

════════════════════
Advance edilmiş LOP₁
∩
LOP₂
= Running Fix
════════════════════

Bu nokta, **ikinci kerteriz anındaki** gemi mevkiidir.

---

### Zaman Faktörü

⬛ **Kritik Kural**

════════════════════
İki ölçüm arası
seyir
doğru değilse
Fix hatalıdır
════════════════════

* Akıntı ve rüzgâr **hesaba katılmalıdır**
* Dead Reckoning hatası, Fix’i doğrudan etkiler

---

### Geometrik Özellikler

* LOP’lar **keskin açıyla** kesişmelidir
* Paralel LOP’lar → **zayıf Fix**
* Uzun advance → hata büyür

---

### Hata Kaynakları

* Yanlış Course veya Distance
* Akıntının ihmal edilmesi
* Kerteriz ölçüm hatası
* Objenin yanlış tanımlanması

---

### Harita Sembolizasyonu

* Sabit obje → ▲
* LOP → düz çizgi
* Advance edilmiş LOP → kesik çizgi
* Running Fix → ●

---

### Kullanım Alanları

* Tek belirgin obje bulunan kıyılar
* Liman yaklaşmaları
* Görüşün sınırlı olduğu seyirler
* Elektronik mevki teyidi

Running Fix, klasik seyrüseferde **zaman ve hareketi denkleme katan**, doğru uygulandığında **yüksek güvenilirlik** sağlayan temel mevki tayin yöntemlerinden biridir.`
      }
    ]
  },
  "Validity and Limitations of Mean Latitude Sailing": {
    title: "Validity and Limitations of Mean Latitude Sailing",
    introduction:
      "Mean Latitude Sailing, orta enlemlerde, kısa–orta mesafelerde ve meridyen yakınsamasının ihmal edilebileceği durumlarda kullanılan yaklaşık bir seyrüsefer yöntemidir. Bu alt başlıkta, yöntemin nerede güvenilir olduğu, nerede hata verdiği ve neden sınırlı kabul edildiği ele alınır.",
    sections: [
      {
        title: "Detaylı Anlatım",
        content: `![Image](https://www.marinepublic.com/_next/image?q=75&url=https%3A%2F%2Fik.imagekit.io%2Fh53vszdxp%2Fillustration_Great_Circle_and_Composite_GC_comparison_fxcf5a.jpg&w=3840)

![Image](https://astronavigationdemystified.com/wp-content/uploads/2016/09/diag15-mod.jpg)

![Image](https://marinegyaan.com/wp-content/uploads/2016/09/plane-sailing.jpg)

![Image](https://maritimesa.org/nautical-science-grade-11/wp-content/uploads/sites/6/2020/10/11.1.1.2_fig_1.jpg)

---

### Temel Varsayım

* Paraleller **birbirine paralel kabul edilir**
* Meridyenler **birbirine yaklaşmaz varsayılır**
* Dünya yüzeyi, küçük alan için **düzlemsel** kabul edilir

⬛ **Ana Varsayım**

════════════════════
Küçük alan
+
Orta enlem
→
Düzlem yaklaşımı
════════════════════

---

### Mean Latitude Düzeltmesinin Anlamı

Mean Latitude Sailing’de boylam farkı, **paralel üzerindeki gerçek mesafeye** dönüştürülür.

⬛ **Temel İlişki**

════════════════════
Dep = D.Long × cos Mean Lat
════════════════════

* cos Mean Lat, **paralelin kısalmasını** temsil eder
* Enlem arttıkça paralel **küçülür**

---

### Geçerlilik Alanı

⬛ **Güvenle Kullanılabilir**

════════════════════
Enlem:
15° – 60°
════════════════════

════════════════════
Mesafe:
≈ 300–400 NM
════════════════════

* Kıyı seyri
* Bölgesel rota planlaması
* Eğitim ve sınav uygulamaları

---

### Geçersiz veya Riskli Alanlar

⬛ **Kullanılması Sakıncalı**

════════════════════
Yüksek enlemler
(> 60°)
════════════════════

════════════════════
Uzun mesafeler
(> 600 NM)
════════════════════

════════════════════
E–W ağırlıklı
seyirler
════════════════════

---

### Meridyen Yakınsaması Hatası

Meridyenler, kutuplara doğru **birbirine yaklaşır**. Mean Latitude Sailing bu etkiyi **tam olarak hesaba katmaz**.

⬛ **Yakınsama Etkisi**

════════════════════
Gerçek rota
≠
Hesaplanan rota
════════════════════

* Boylam farkı büyüdükçe hata artar
* Yüksek enlem → büyük hata

---

### Hata Kaynağının Matematiksel Yorumu

Mean Latitude Sailing’de:

⬛ **Yaklaşım**

════════════════════
cos Lat
≈
cos Mean Lat
════════════════════

Gerçekte:

════════════════════
cos Lat
değişkendir
════════════════════

Bu fark, **uzun E–W seyirlerde** büyür.

---

### Sayısal Karşılaştırma Örneği

**Verilenler**

* Lat₁ = **20° N**
* Lat₂ = **40° N**
* D.Long = **600′**

---

⬛ **Mean Latitude**

════════════════════
Mean Lat = 30°
cos 30° = 0.866
════════════════════

---

⬛ **Departure (Yaklaşık)**

════════════════════
Dep = 600 × 0.866
Dep ≈ 520′
════════════════════

---

⬛ **Gerçek Durum**

* 20°’de cos = 0.94
* 40°’ta cos = 0.77

Paralel uzunluğu **sabit değildir**, bu nedenle sonuç **yaklaşıktır**.

---

### Plane Sailing ile Karşılaştırma

* Plane Sailing → cos Lat **hiç kullanılmaz**
* Mean Latitude Sailing → cos Mean Lat kullanılır

⬛ **Karşılaştırma**

════════════════════
Plane Sailing
= kısa mesafe
════════════════════

════════════════════
Mean Latitude
= daha geniş alan
════════════════════

---

### Great Circle ile Farkı

* Mean Latitude Sailing → **yaklaşık**
* Great Circle Sailing → **gerçek en kısa yol**

⬛ **Temel Ayrım**

════════════════════
Mean Latitude
≈ düz rota
════════════════════

════════════════════
Great Circle
= küresel rota
════════════════════

---

### Uygulamada Kabul Edilen Kural

⬛ **Altın Kural**

════════════════════
Mesafe uzadıkça
ve enlem büyüdükçe
Mean Latitude
terk edilir
════════════════════

Bu noktadan sonra:

* Mercator Sailing
* Great Circle Sailing
  tercih edilir.

---

### Harita Sembolizasyonu

* Mean Latitude rota → düz çizgi
* Gerçek küresel rota → hafif kavisli çizgi
* Hata alanı → taralı bölge

---

### Kullanım Özeti

* Eğitim ve manuel hesaplar
* Orta enlem kıyı seyri
* Kısa–orta mesafe planlama
* Elektronik sistem sonuçlarının yaklaşık kontrolü

Mean Latitude Sailing, **basitliği ve hızı** sayesinde klasik seyrüseferin temel taşlarından biridir; ancak **geçerlilik sınırları bilinmeden kullanılması**, özellikle **yüksek enlem ve uzun mesafelerde**, ciddi rota hatalarına yol açabilir.`
      }
    ]
  },
  "Dead Reckoning and Estimated Position (DR & EP)": {
    title: "Dead Reckoning and Estimated Position (DR & EP)",
    introduction:
      "Dead Reckoning (DR), geminin son bilinen mevkiden, rota (Course) ve sürat (Speed) kullanılarak dış etkiler hesaba katılmadan ilerletilmesiyle bulunan mevkiidir. Estimated Position (EP) ise DR üzerine akıntı ve rüzgâr etkileri eklenerek elde edilen tahmini gerçek mevkidir. Klasik seyrüseferin tüm mevki tayin yöntemlerinin temelini oluşturur.",
    sections: [
      {
        title: "Detaylı Anlatım",
        content: `![Image](https://upload.wikimedia.org/wikipedia/commons/e/ed/Dead-reckoning.svg)

![Image](https://usercontent.one/wp/www.getlostpowerboattraining.com/wp-content/uploads/2020/03/PLOTTING-SYMBOLS.png?media=1759652400)

![Image](https://cdn.britannica.com/41/2941-004-E9AB5656/triangle-course-aicraft-vector-compass-heading-aircraft.jpg)

![Image](https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Wind_drift.png/250px-Wind_drift.png)

---

### Temel Prensip

* Son güvenilir mevki alınır
* Course ve Speed ile mevki **ileri taşınır**
* Dış etkiler yoksa → **DR**
* Dış etkiler eklenirse → **EP**

⬛ **Ana İlke**

════════════════════
Mevki
+
(Course × Time × Speed)
= DR
════════════════════

════════════════════
DR
+
(Current / Wind)
= EP
════════════════════

---

### Kullanılan Tanımlar

* **DR** : Dead Reckoning Position
* **EP** : Estimated Position
* **C** : Course (°T)
* **S** : Speed (knots)
* **t** : Time (hours)
* **D** : Distance (NM)
* **Set** : Akıntı yönü (°T)
* **Drift** : Akıntı sürati (knots)

---

### Mesafe Hesabı (DR)

⬛ **Temel Formül**

════════════════════
D = S × t
════════════════════

* S → knot
* t → saat
* D → deniz mili (NM)

---

### DR Mevkiinin Çizimi

* Son Fix’ten başlanır
* Course doğrultusunda **D kadar** ilerlenir
* Ulaşılan nokta → **DR**

---

### Akıntı Etkisi (EP)

⬛ **Akıntı Mesafesi**

════════════════════
D₍c₎ = Drift × t
════════════════════

* Akıntı vektörel olarak uygulanır
* Yön → **Set**

---

### EP Mevkiinin Çizimi

* DR noktasından başlanır
* Set yönünde **D₍c₎ kadar** gidilir
* Ulaşılan nokta → **EP**

---

### Sayısal Uygulama Örneği

**Verilenler**

* Son Fix: **12:00**
* Course (**C**) = **090°T**
* Speed (**S**) = **12 kn**
* Seyir süresi (**t**) = **2 saat**
* Akıntı:

  * Set = **180°T**
  * Drift = **2 kn**

---

### DR Hesabı

⬛ **Mesafe**

════════════════════
D = 12 × 2
D = 24 NM
════════════════════

---

⬛ **DR Mevkii**

════════════════════
Son Fix’ten
090°T yönünde
24 NM
════════════════════

Bu nokta → **DR**

---

### Akıntı Hesabı

⬛ **Akıntı Mesafesi**

════════════════════
D₍c₎ = 2 × 2
D₍c₎ = 4 NM
════════════════════

---

### EP Mevkii

════════════════════
DR’den
180°T yönünde
4 NM
════════════════════

Bu nokta → **EP**

---

### DR ve EP Arasındaki Fark

* DR → **teorik**
* EP → **gerçeğe daha yakın**

⬛ **İlişki**

════════════════════
Gerçek mevki
≈ EP
≠ DR
════════════════════

---

### Zaman Faktörü

* Zaman uzadıkça hata artar
* DR/EP **sık Fix ile düzeltilmelidir**

⬛ **Kural**

════════════════════
Uzun süre
Fix yoksa
DR güvenilmez
════════════════════

---

### Harita Sembolizasyonu

* DR → ○ (boş daire)
* EP → ◐ (yarım taralı daire)
* Fix → ● (dolu daire)
* Akıntı → ok + hız değeri

---

### Kullanım Alanları

* Fix araları seyir takibi
* Elektronik mevki kaybı durumları
* Seyir defteri (Log Book)
* Tüm klasik mevki yöntemlerinin temeli

Dead Reckoning ve Estimated Position, klasik seyrüseferde **her an kullanılan**, fix bulunamadığında dahi geminin **kontrolsüz kalmasını önleyen** temel mevki tayin yöntemleridir.`
      }
    ]
  },
  "Course to Steer (CTS) with Current": {
    title: "Course to Steer (CTS) with Current",
    introduction:
      "Course to Steer (CTS), geminin akıntı etkisi altındayken, istenen gerçek rota (Course Made Good – CMG) üzerinde seyredebilmesi için dümenlenmesi gereken gerçek rotanın tayin edilmesidir. Klasik seyrüseferde CTS, vektör üçgeni kullanılarak çözülür ve özellikle akıntılı sahalarda temel bir uygulamadır.",
    sections: [
      {
        title: "Detaylı Anlatım",
        content: `![Image](https://maritimesa.org/nautical-science-grade-11/wp-content/uploads/sites/6/2020/10/11.1.8.7_fig_1.jpg)

![Image](https://keyassets.timeincuk.net/inspirewp/live/wp-content/uploads/sites/20/2022/03/edScreenshot-2022-02-18-at-11.26.42.png)

![Image](https://sailingissues.com/vier/running-fix-3x.png)

![Image](https://www.sailtrain.co.uk/navigation/images/ctsgroundtrack3.gif)

---

### Temel Prensip

* İstenen **CMG** ve gemi sürati bilinir
* Akıntının **Set** ve **Drift**’i bilinir
* Akıntı telafi edilerek **CTS** bulunur

⬛ **Ana İlke**

════════════════════
Ship’s Velocity
+
Current Vector
==============

Ground Track (CMG)
════════════════════

---

### Kullanılan Tanımlar

* **CTS** : Course to Steer (°T)
* **CMG** : Course Made Good (°T)
* **S** : Ship’s Speed (knots)
* **Set** : Akıntı yönü (°T)
* **Drift** : Akıntı sürati (knots)
* **t** : Zaman (hours)

---

### Vektör Üçgeni (Current Triangle)

* Bir kenar → **Gemi hızı ve CTS**
* Bir kenar → **Akıntı vektörü (Set & Drift)**
* Kapanan kenar → **CMG**

⬛ **Geometrik İlişki**

════════════════════
V⃗ ship
+
V⃗ current
==========

V⃗ ground
════════════════════

---

### Grafik Çözüm (Harita Üzerinde)

1. CMG doğrultusunda bir çizgi çizilir
2. Bu çizgi üzerinde **zaman ölçeği** seçilir
3. Akıntı vektörü (Set–Drift) eklenir
4. Başlangıç noktası ile kapanış noktası birleştirilir
5. Bulunan yön → **CTS**

---

### Analitik Yaklaşım (Trigonometrik)

⬛ **Akıntı Mesafesi**

════════════════════
D₍c₎ = Drift × t
════════════════════

⬛ **Gemi Mesafesi**

════════════════════
D₍s₎ = S × t
════════════════════

Bu iki mesafe ile **vektör üçgeni** çözülür.

---

### Sayısal Uygulama Örneği

**Verilenler**

* İstenen rota (**CMG**) = **090°T**
* Gemi sürati (**S**) = **10 kn**
* Akıntı:

  * Set = **180°T**
  * Drift = **3 kn**
* Zaman (**t**) = **1 saat**

---

### Hesaplama

⬛ **Akıntı Mesafesi**

════════════════════
D₍c₎ = 3 × 1
D₍c₎ = 3 NM
════════════════════

---

⬛ **Gemi Mesafesi**

════════════════════
D₍s₎ = 10 × 1
D₍s₎ = 10 NM
════════════════════

---

### Vektör Çözümü

* CMG doğrultusunda **10 NM** çizilir
* Akıntı, **180°T yönünde 3 NM** olarak eklenir
* Kapanış doğrultusu ölçülür

⬛ **Sonuç**

════════════════════
CTS ≈ 073°T
════════════════════

Bu rota dümenlenirse, gemi **090°T CMG** üzerinde ilerler.

---

### Leeway ile Birlikte Kullanım

Rüzgâr etkisi varsa:

⬛ **Düzeltilmiş CTS**

════════════════════
CTS₍final₎
= CTS ± Leeway
════════════════════

* Rüzgâr sancaktan → iskeleye düzelt
* Rüzgâr iskeleden → sancağa düzelt

---

### Hata Kaynakları

* Yanlış Set veya Drift bilgisi
* Akıntının sabit varsayılması
* Sürat değişimleri
* Ölçek hataları (grafik çözüm)

---

### Harita Sembolizasyonu

* CMG → düz kalın çizgi
* Akıntı → ok + hız
* CTS → ok başlı çizgi
* Başlangıç → ●
* Kapanış → ×

---

### Kullanım Alanları

* Akıntılı boğazlar
* Kıyı seyri
* Liman yaklaşmaları
* Elektronik seyir teyidi

Course to Steer, klasik seyrüseferde **akıntının fiilen telafi edildiği**, geminin **istenen rota üzerinde kalmasını sağlayan** temel rota tayin yöntemidir.`
      }
    ]
  },
  "Direct Problem of Mean Latitude Sailing": {
    title: "Direct Problem of Mean Latitude Sailing",
    introduction:
      "Mean Latitude Sailing’in doğrudan problemi, geminin başlangıç mevkii, rota (Course) ve mesafe (Distance) bilindiğinde, varış enlemi ve boylamının hesaplanmasıdır. Bu yöntem, orta enlemlerde yapılan klasik seyirde rota icrası ve mevki ileri taşıma için kullanılır.",
    sections: [
      {
        title: "Detaylı Anlatım",
        content: `![Image](https://www.marinepublic.com/_next/image?q=75&url=https%3A%2F%2Fik.imagekit.io%2Fh53vszdxp%2Fillustration_Great_Circle_and_Composite_GC_comparison_fxcf5a.jpg&w=3840)

![Image](https://astronavigationdemystified.com/wp-content/uploads/2016/09/diag15-mod.jpg)

![Image](https://marinegyaan.com/wp-content/uploads/2016/09/plane-sailing.jpg)

![Image](https://thenauticalsite.in/NauticalNotes/TerresNav/MyTerrNav-Lesson06-Sailings_files/image036.jpg)

---

### Temel Prensip

* Course ve Distance bilinir
* Seyir üçgeninden **D.Lat** ve **Departure** bulunur
* Departure kullanılarak **D.Long** hesaplanır
* Başlangıç mevkiine eklenerek **varış mevkii** elde edilir

⬛ **Ana İlke**

════════════════════
Course + Distance
→
D.Lat & Dep
→
D.Long
→
New Position
════════════════════

---

### Kullanılan Tanımlar

* **Lat₁, Long₁** : Başlangıç mevkii
* **Lat₂, Long₂** : Varış mevkii
* **C** : Course (°T)
* **D** : Distance (NM)
* **D.Lat** : Difference of Latitude (′)
* **Dep** : Departure (′)
* **D.Long** : Difference of Longitude (′)
* **Mean Lat** : Ortalama enlem

---

### Difference of Latitude (D.Lat)

⬛ **Formül**

════════════════════
D.Lat = D × cos C
════════════════════

* Kuzeye doğru → **N (+)**
* Güneye doğru → **S (−)**
* Sonuç **dakika (′)** cinsindedir

---

### Departure (Dep)

⬛ **Formül**

════════════════════
Dep = D × sin C
════════════════════

* Doğuya doğru → **E (+)**
* Batıya doğru → **W (−)**

---

### Varış Enlemi (Lat₂)

⬛ **Formül**

════════════════════
Lat₂ = Lat₁ ± D.Lat
════════════════════

* İşaret, Course yönüne göre seçilir

---

### Mean Latitude

⬛ **Formül**

════════════════════
Mean Lat = (Lat₁ + Lat₂) / 2
════════════════════

* Enlemler **aynı isimde** alınır
* D.Long hesabında kullanılır

---

### Difference of Longitude (D.Long)

⬛ **Formül**

════════════════════
D.Long = Dep / cos Mean Lat
════════════════════

* Sonuç **dakika (′)**
* Doğu veya batı yönü Dep işaretine göre belirlenir

---

### Varış Boylamı (Long₂)

⬛ **Formül**

════════════════════
Long₂ = Long₁ ± D.Long
════════════════════

* E → topla
* W → çıkar

---

### Sayısal Uygulama Örneği

**Verilenler**

* Lat₁ = **35°20′ N**
* Long₁ = **018°40′ E**
* Course (**C**) = **060°T**
* Distance (**D**) = **120 NM**

---

### Hesaplama

⬛ **Difference of Latitude**

════════════════════
D.Lat = 120 × cos 60°
D.Lat = 120 × 0.5
D.Lat = 60′ (N)
════════════════════

---

⬛ **Varış Enlemi**

════════════════════
Lat₂ = 35°20′ + 60′
Lat₂ = 36°20′ N
════════════════════

---

⬛ **Departure**

════════════════════
Dep = 120 × sin 60°
Dep = 120 × 0.866
Dep ≈ 104′ (E)
════════════════════

---

⬛ **Mean Latitude**

════════════════════
Mean Lat
= (35°20′ + 36°20′) / 2
= 35°50′ ≈ 35.8°
cos 35.8° ≈ 0.81
════════════════════

---

⬛ **Difference of Longitude**

════════════════════
D.Long = 104 / 0.81
D.Long ≈ 128′
════════════════════

---

⬛ **Varış Boylamı**

════════════════════
Long₂ = 018°40′ + 2°08′
Long₂ = 020°48′ E
════════════════════

---

### Sonuç Mevkii

════════════════════
Lat₂ = 36°20′ N
Long₂ = 020°48′ E
════════════════════

---

### Seyir Üçgeni Özeti

* Hipotenüs → Distance
* Düşey kenar → D.Lat
* Yatay kenar → Departure
* Açı → Course

---

### Harita Sembolizasyonu

* Başlangıç mevkii → ●
* Varış mevkii → ×
* Course → yön oku
* D.Lat → meridyen doğrultusu
* Dep → paralel doğrultusu

---

### Uygulama Alanı

* Rota icrası
* DR mevkii ileri taşıma
* Klasik seyir hesapları
* Elektronik mevki doğrulama

Mean Latitude Sailing’in doğrudan problemi, **rota ve mesafeden yeni mevki üretme** açısından klasik seyrüseferin temel hesaplarından biridir ve özellikle **orta enlem seyirlerinde** pratik ve hızlı bir çözüm sunar.`
      }
    ]
  },
  "Leeway": {
    title: "Leeway",
    introduction:
      "Leeway, rüzgâr etkisi altında seyreden geminin, dümenlenen rota (Heading / CTS) ile gerçek ilerleme doğrultusu arasında oluşan açısal farktır. Klasik seyrüseferde leeway, özellikle rüzgâra açık denizlerde ve yüksek bordalı gemilerde, rota ve mevki hatalarının başlıca nedenlerinden biridir.",
    sections: [
      {
        title: "Detaylı Anlatım",
        content: `![Image](https://maritimesa.org/nautical-science-grade-11/wp-content/uploads/sites/6/2020/10/11.1.8.8_fig_1.jpg)

![Image](https://sailzing.com/wp-content/uploads/2021/02/leeway-definition.jpg)

![Image](https://keyassets.timeincuk.net/inspirewp/live/wp-content/uploads/sites/20/2022/03/edScreenshot-2022-02-18-at-11.26.42.png)

![Image](https://maritimesa.org/nautical-science-grade-11/wp-content/uploads/sites/6/2020/10/11.1.8.7_fig_1.jpg)

---

### Temel Prensip

* Rüzgâr, gemiyi **yanal olarak** sürükler
* Gemi, pruvasını rüzgâra çevirse bile **yanal kaçma** oluşur
* Bu kaçma **açı** olarak ifade edilir → **Leeway Açısı**

⬛ **Ana İlke**

════════════════════
Heading (CTS)
≠
Gerçek İlerleme
════════════════════

---

### Tanımlar

* **Leeway (L)** : Rüzgâr kaynaklı sürüklenme açısı (°)
* **Heading / CTS** : Dümenlenen rota (°T)
* **CMG** : Course Made Good (°T)
* **Windward** : Rüzgârın geldiği yön
* **Lee side** : Rüzgâr altı taraf

---

### Leeway’in Yönü

* Rüzgâr **iskele** tarafından geliyorsa → gemi **sancağa** sürüklenir
* Rüzgâr **sancak** tarafından geliyorsa → gemi **iskeleye** sürüklenir

⬛ **Yön Kuralı**

════════════════════
Leeway
her zaman
rüzgâr altına
doğrudur
════════════════════

---

### Leeway’in Rota Üzerindeki Etkisi

⬛ **İlişki**

════════════════════
CMG = CTS ± Leeway
════════════════════

* Rüzgâr sancaktan → **CTS + L** (iskeleye düzelt)
* Rüzgâr iskeleden → **CTS − L** (sancağa düzelt)

---

### Leeway Açısının Büyüklüğü

Leeway sabit değildir; aşağıdaki faktörlere bağlıdır:

* Rüzgâr şiddeti
* Gemi formu ve borda yüksekliği
* Gemi sürati
* Yük durumu

⬛ **Pratik Aralık**

════════════════════
Leeway
≈ 2° – 10°
════════════════════

---

### Grafik Gösterim

* CTS → pruvalı düz çizgi
* CMG → rüzgâr altına kaymış çizgi
* İki çizgi arasındaki açı → **Leeway**

---

### Sayısal Uygulama Örneği

**Verilenler**

* Dümenlenen rota (**CTS**) = **090°T**
* Rüzgâr: **030°T** (iskele başomuzluk)
* Tahmini leeway = **5°**

---

### Hesaplama

Rüzgâr **iskele tarafından** geldiği için gemi **sancağa** sürüklenir.

⬛ **CMG**

════════════════════
CMG = 090° − 5°
CMG = 085°T
════════════════════

---

### CTS Düzeltmesi (İstenen CMG Verildiğinde)

**Verilenler**

* İstenen rota (**CMG**) = **090°T**
* Rüzgâr: **030°T** (iskele)
* Leeway = **5°**

---

⬛ **Dümenlenecek Rota**

════════════════════
CTS = 090° + 5°
CTS = 095°T
════════════════════

Bu rota dümenlenirse, gemi **085°T**’ye değil, **090°T CMG** üzerine oturur.

---

### Leeway ve Akıntı Birlikte

Leeway ve akıntı **ayrı ayrı** değerlendirilir.

⬛ **Sıra Kuralı**

════════════════════
Önce
Leeway
sonra
Akıntı (CTS)
════════════════════

* Leeway → rüzgâr kaynaklı **açı düzeltmesi**
* Akıntı → **vektör düzeltmesi**

---

### Harita Sembolizasyonu

* CTS → ok başlı düz çizgi
* CMG → rüzgâr altına kaymış çizgi
* Leeway → küçük yay + derece değeri

---

### Seyir Uygulaması

* Açık deniz seyri
* Uzun DR/EP aralıkları
* Elektronik rota teyidi
* Yelkenli ve düşük süratli gemiler

Leeway, klasik seyrüseferde **küçük açı** gibi görünmesine rağmen, **uzun seyirlerde büyük mevki hatalarına** yol açabileceğinden, rota ve mevki hesaplarında **mutlaka dikkate alınmalıdır**.`
      }
    ]
  },
  "Fix by Cross Bearings (Kesişen Kerterizlerle Mevki Tayini)": {
    title: "Fix by Cross Bearings (Kesişen Kerterizlerle Mevki Tayini)",
    introduction:
      "Cross Bearings ile Fix, iki veya daha fazla sabit objeden aynı anda alınan kerterizlerin, harita üzerinde çizilerek kesişim noktasının gemi mevkii olarak belirlenmesi yöntemidir. Klasik (terrestrial) seyrüseferde en güvenilir anlık mevki tayinlerinden biri kabul edilir.",
    sections: [
      {
        title: "Detaylı Anlatım",
        content: `![Image](https://www.splashmaritime.com.au/Marops/data/text/Navtex/Navplot_files/slide13.JPG)

![Image](https://www.sailtrain.co.uk/navigation/images/opposite.gif)

![Image](https://cdn.britannica.com/42/2942-004-687FE645.gif)

![Image](https://usercontent.one/wp/www.getlostpowerboattraining.com/wp-content/uploads/2020/03/A-8-1024x576.png?media=1759652400)

---

### Temel Prensip

* Aynı anda alınan **kerterizler** kullanılır
* Her kerteriz bir **LOP (Line of Position)** üretir
* LOP’ların kesişimi → **Fix**

⬛ **Ana İlke**

════════════════════
LOP₁
∩
LOP₂
= Fix
════════════════════

---

### Kullanılan Tanımlar

* **Bearing (B)** : Kerteriz (°T veya °M)
* **Back Bearing (BB)** : Geri kerteriz
* **LOP** : Mevki hattı
* **Fix** : Kesin mevki
* **Object** : Sabit, tanımlı kara objesi

---

### Kerterizden LOP Çizimi

Kerteriz, **gemiden objeye doğru** ölçülür. Haritada LOP çizmek için:

⬛ **Geri Kerteriz**

════════════════════
BB = B ± 180°
════════════════════

* 0°–180° arası → **+180°**
* 180°–360° arası → **−180°**

---

### İki Kerterizle Fix

* En az **iki sabit obje** gerekir
* Kerterizler **aynı anda** alınmalıdır
* Kesişim açısı **keskin** olmalıdır

⬛ **Geometrik Kural**

════════════════════
Açı ≈ 60° – 120°
→
Güçlü Fix
════════════════════

---

### Üç Kerterizle Fix

* Üç LOP idealde **tek noktada** kesişir
* Küçük bir üçgen oluşursa → **Hata Üçgeni**

⬛ **Yorum**

════════════════════
Üçgen merkezi
≈
Gerçek mevki
════════════════════

---

### Haritada Uygulama Adımları

1. Objeler harita üzerinde işaretlenir
2. Her kerteriz için **geri kerteriz** hesaplanır
3. Objeden geri kerteriz doğrultusunda LOP çizilir
4. LOP’ların kesişimi → **Fix**

---

### Sayısal Uygulama Örneği (2 Kerteriz)

**Verilenler**

* Obje A kerterizi = **045°T**
* Obje B kerterizi = **315°T**

---

⬛ **Geri Kerterizler**

════════════════════
A için BB = 045° + 180° = 225°T
B için BB = 315° − 180° = 135°T
════════════════════

---

⬛ **Fix**

* A’dan **225°T**
* B’den **135°T**
  doğrultusunda çizilen LOP’ların kesişimi → **Fix**

---

### Sayısal Uygulama (3 Kerteriz – Hata Üçgeni)

**Verilenler**

* A = **030°T** → BB = **210°T**
* B = **140°T** → BB = **320°T**
* C = **260°T** → BB = **080°T**

---

⬛ **Sonuç**

* Üç LOP küçük bir üçgen oluşturur
* Üçgenin **ağırlık merkezi** Fix olarak alınır

---

### Zaman Faktörü

⬛ **Kritik Kural**

════════════════════
Kerterizler
aynı anda
alınmalıdır
════════════════════

* Gecikme → **running error**
* Hareket halindeki gemide hata büyür

---

### Hata Kaynakları

* Yanlış obje tanımı
* Manyetik / pusula hatası
* Geniş kesişim açısı
* Geç alınan kerterizler

---

### Harita Sembolizasyonu

* Obje → ▲
* LOP → düz çizgi
* Fix → ●
* Hata üçgeni → küçük üçgen

---

### Kullanım Alanları

* Kıyı seyri
* Liman yaklaşmaları
* Elektronik mevki teyidi
* DR/EP düzeltmesi

Cross Bearings ile Fix, klasik seyrüseferde **hızlı, görsel ve güvenilir** bir mevki tayini sağlar; doğru objeler ve eş zamanlı ölçümlerle uygulandığında **en yüksek doğruluklu terrestrial fix** yöntemlerinden biridir.`
      }
    ]
  },
  "Inverse Problem of Mean Latitude Sailing": {
    title: "Inverse Problem of Mean Latitude Sailing",
    introduction:
      "Mean Latitude Sailing’in ters problemi, geminin başlangıç mevkii ve varış mevkii bilindiğinde, bu iki mevkii arasındaki rota (Course) ve mesafenin (Distance) hesaplanmasıdır. Bu problem, özellikle iki bilinen mevki arasındaki seyir planlamasında ve harita üzerinden rota tayininde kullanılır.",
    sections: [
      {
        title: "Detaylı Anlatım",
        content: `![Image](https://astronavigationdemystified.com/wp-content/uploads/2016/09/diag15-mod.jpg)

![Image](https://deckskills.tripod.com/sitebuildercontent/sitebuilderpictures/mid_lat_triangle.jpg)

![Image](https://sailingissues.com/vier/longitude-latitude-explained-3x.png)

![Image](https://maritimesa.org/nautical-science-grade-10/wp-content/uploads/sites/5/2020/11/10.2.1_fig_6.jpg)

---

### Temel Prensip

* Başlangıç ve varış mevkii bilinir
* **D.Lat** ve **D.Long** hesaplanır
* Ortalama enlem bulunur
* **Departure** elde edilir
* Seyir üçgeninden **Course** ve **Distance** bulunur

⬛ **Ana İlke**

════════════════════
Lat₁ / Long₁
+
Lat₂ / Long₂
→
D.Lat & D.Long
→
Dep
→
Course & Distance
════════════════════

---

### Kullanılan Tanımlar

* **Lat₁, Long₁** : Başlangıç mevkii
* **Lat₂, Long₂** : Varış mevkii
* **D.Lat** : Difference of Latitude (′)
* **D.Long** : Difference of Longitude (′)
* **Dep** : Departure (′)
* **Mean Lat** : Ortalama enlem
* **C** : Course (°T)
* **D** : Distance (NM)

---

### Difference of Latitude (D.Lat)

⬛ **Formül**

════════════════════
D.Lat = Lat₂ − Lat₁
════════════════════

* Kuzeye doğru → **N (+)**
* Güneye doğru → **S (−)**

---

### Difference of Longitude (D.Long)

⬛ **Formül**

════════════════════
D.Long = Long₂ − Long₁
════════════════════

* Doğuya doğru → **E (+)**
* Batıya doğru → **W (−)**

---

### Mean Latitude

⬛ **Formül**

════════════════════
Mean Lat = (Lat₁ + Lat₂) / 2
════════════════════

* Enlemler **aynı isimde** alınır
* Departure hesabında kullanılır

---

### Departure (Dep)

⬛ **Formül**

════════════════════
Dep = D.Long × cos Mean Lat
════════════════════

* Sonuç **dakika (′)** cinsindedir

---

### Course (C)

⬛ **Formül**

════════════════════
tan C = Dep / D.Lat
════════════════════

* Açının yönü **D.Lat** ve **Dep** işaretlerine göre belirlenir

---

### Distance (D)

⬛ **Formül**

════════════════════
D = D.Lat / cos C
════════════════════

veya

════════════════════
D = Dep / sin C
════════════════════

---

### Sayısal Uygulama Örneği

**Verilenler**

* Lat₁ = **34°20′ N**
* Long₁ = **015°40′ E**
* Lat₂ = **37°50′ N**
* Long₂ = **020°10′ E**

---

### Hesaplama

⬛ **Difference of Latitude**

════════════════════
D.Lat = 37°50′ − 34°20′
D.Lat = 3°30′ = 210′ (N)
════════════════════

---

⬛ **Difference of Longitude**

════════════════════
D.Long = 20°10′ − 15°40′
D.Long = 4°30′ = 270′ (E)
════════════════════

---

⬛ **Mean Latitude**

════════════════════
Mean Lat
= (34°20′ + 37°50′) / 2
= 36°05′ ≈ 36.1°
cos 36.1° ≈ 0.81
════════════════════

---

⬛ **Departure**

════════════════════
Dep = 270 × 0.81
Dep ≈ 219′
════════════════════

---

⬛ **Course**

════════════════════
tan C = 219 / 210
tan C ≈ 1.04
C ≈ 46°
════════════════════

Yön: **NE → 046°T**

---

⬛ **Distance**

════════════════════
D = 210 / cos 46°
D ≈ 210 / 0.694
D ≈ 303 NM
════════════════════

---

### Seyir Üçgeni Yorumu

* D.Lat → meridyen doğrultusu
* Dep → paralel doğrultusu
* Hipotenüs → Distance
* Açı → Course

---

### Harita Sembolizasyonu

* Başlangıç mevkii → ●
* Varış mevkii → ×
* Course → ok başlı çizgi
* D.Lat → kuzey–güney çizgisi
* Dep → doğu–batı çizgisi

---

### Uygulama Alanı

* İki mevki arası rota tayini
* Seyir planlaması
* Harita üzerinden mesafe ölçümü
* Klasik seyir problemleri

Inverse Problem of Mean Latitude Sailing, **bilinen iki mevkii arasında rota ve mesafe tayini** sağlayarak, orta enlem seyrinin **planlama aşamasındaki temel hesap yöntemlerinden biri** olarak kullanılır.`
      }
    ]
  },
  "Running Fix (Running Bearings)": {
    title: "Running Fix (Running Bearings)",
    introduction:
      "Running Fix, aynı sabit objeden farklı zamanlarda alınan iki veya daha fazla kerterizin, geminin ilerlemesi (Advance) hesaba katılarak taşınması (Transfer) yoluyla mevki tayin edilmesidir. Klasik (terrestrial) seyrüseferde, tek obje mevcutken kullanılan temel fix yöntemidir.",
    sections: [
      {
        title: "Detaylı Anlatım",
        content: `![Image](https://i0.wp.com/boatluv.com/wp-content/uploads/2019/08/7_running-fix_boatluv.png?fit=400%2C400&ssl=1)

![Image](https://usercontent.one/wp/www.getlostpowerboattraining.com/wp-content/uploads/2020/03/Screenshot-2020-03-28-at-14.35.54.png?media=1759652400)

![Image](https://www.sailtrain.co.uk/navigation/images/runningfix1.gif)

![Image](https://shipsnow.com/images/wiki/criteria/turning-circle.jpg)

---

### Temel Prensip

* Aynı objeden **en az iki kerteriz** alınır
* Kerterizler **farklı zamanlarda** ölçülür
* İlk LOP, geminin ilerlediği mesafe kadar **taşınır**
* Taşınan LOP ile ikinci LOP’un kesişimi → **Fix**

⬛ **Ana İlke**

════════════════════
LOP₁ (Transfer)
∩
LOP₂
= Fix
════════════════════

---

### Kullanılan Tanımlar

* **B₁, B₂** : Birinci ve ikinci kerteriz
* **BB** : Geri kerteriz
* **LOP** : Mevki hattı
* **Advance (A)** : İki kerteriz arası gemi ilerlemesi (NM)
* **Course (C)** : Gemi rotası (°T)
* **Speed (S)** : Gemi sürati (knots)
* **t** : Zaman farkı (hours)

---

### Advance (İlerleme)

⬛ **Formül**

════════════════════
A = S × t
════════════════════

* S → knot
* t → saat
* A → deniz mili (NM)

---

### Kerterizden LOP Çizimi

Kerteriz gemiden objeye alınır; haritada LOP çizmek için **geri kerteriz** kullanılır.

⬛ **Geri Kerteriz**

════════════════════
BB = B ± 180°
════════════════════

---

### Harita Üzerinde Uygulama Adımları

1. Obje haritada işaretlenir
2. İlk kerteriz için **BB₁** çizilir → **LOP₁**
3. İki kerteriz arası **Advance** hesaplanır
4. LOP₁, **Course** doğrultusunda **A kadar taşınır** → **Transferred LOP₁**
5. İkinci kerteriz için **BB₂** çizilir → **LOP₂**
6. Kesişim noktası → **Running Fix**

---

### Zaman Düzeltmesi (Transfer Kuralı)

⬛ **Kritik Kural**

════════════════════
LOP
her zaman
geminin hareketi
yönünde
taşınır
════════════════════

---

### Sayısal Uygulama Örneği

**Verilenler**

* Course (**C**) = **090°T**
* Speed (**S**) = **12 kn**
* Birinci kerteriz (**B₁**) = **045°T** @ 10:00
* İkinci kerteriz (**B₂**) = **090°T** @ 10:30

---

### Advance Hesabı

⬛ **Zaman Farkı**

════════════════════
t = 30 dk = 0.5 saat
════════════════════

⬛ **Advance**

════════════════════
A = 12 × 0.5
A = 6 NM
════════════════════

---

### Geri Kerterizler

⬛ **BB₁**

════════════════════
BB₁ = 045° + 180°
BB₁ = 225°T
════════════════════

⬛ **BB₂**

════════════════════
BB₂ = 090° + 180°
BB₂ = 270°T
════════════════════

---

### Fix’in Bulunması

* Obje’den **225°T** doğrultusunda **LOP₁** çizilir
* LOP₁, **090°T yönünde 6 NM** taşınır
* Obje’den **270°T** doğrultusunda **LOP₂** çizilir
* Taşınmış LOP₁ ile LOP₂’nin kesişimi → **Running Fix**

---

### Geometrik Güç Kriteri

⬛ **Kesişim Açısı**

════════════════════
≈ 30° – 90°
→
Kabul Edilebilir Fix
════════════════════

* Çok dar açı → zayıf doğruluk
* Çok geniş açı → zaman hatası artar

---

### Hata Kaynakları

* Sürat veya rota değişimi
* Akıntı ve leeway’in ihmal edilmesi
* Zaman kayıt hatası
* Yanlış obje tanımı

---

### Harita Sembolizasyonu

* Obje → ▲
* LOP → düz çizgi
* Taşınmış LOP → kesikli çizgi
* Running Fix → ●
* Advance → ok + mesafe

---

### Kullanım Alanları

* Tek kara objesi görülen sahalar
* Kıyıya paralel seyir
* Elektronik mevki kaybı durumları
* DR/EP teyidi

Running Fix, klasik seyrüseferde **tek obje ile mevki tayinine imkân veren**, zaman ve hareketin doğru uygulanmasıyla **yüksek doğruluk sağlayan** temel terrestrial fix yöntemlerinden biridir.`
      }
    ]
  },
  "Fix by Horizontal Angles": {
    title: "Fix by Horizontal Angles",
    introduction:
      "Horizontal Angle Fix, gemiden iki veya üç sabit kara objesi arasındaki yatay açıların sekstant ile ölçülmesi ve bu açıların harita üzerinde geometrik olarak uygulanmasıyla geminin mevkiinin tayin edilmesidir. Bu yöntem, özellikle kerteriz almanın zor olduğu veya yüksek doğruluk istendiği durumlarda klasik (terrestrial) seyrüseferde kullanılır.",
    sections: [
      {
        title: "Detaylı Anlatım",
        content: `![Image](https://knowledgeofsea.com/wp-content/uploads/2020/02/IMG_4143-1024x594.jpg)

![Image](https://maritimesa.org/nautical-science-grade-10/wp-content/uploads/sites/5/2020/11/10.1.5.10_fig_1-1024x906.jpg)

![Image](https://imgv2-1-f.scribdassets.com/img/document/860575796/original/609410781e/1?v=1)

---

### Temel Prensip

* Objeler arası **yatay açı** ölçülür
* Ölçülen açı, **gemi mevkiinden** görülür
* Aynı açıyı gören noktaların geometrik yeri bir **yay (arc)** oluşturur
* Yayların kesişimi → **Fix**

⬛ **Ana İlke**

════════════════════
Arc₁
∩
Arc₂
= Fix
════════════════════

---

### Kullanılan Tanımlar

* **Horizontal Angle (θ)** : Objeler arası yatay açı
* **Sextant** : Açı ölçme aleti
* **Arc of Position** : Mevki yayı
* **Fix** : Kesin mevki
* **Object A, B, C** : Sabit kara objeleri

---

### İki Objeyle Yatay Açı Fix’i

* İki obje (A ve B) seçilir
* A–B arasındaki yatay açı **θ** ölçülür
* Bu açıya karşılık gelen **çember yayı** çizilir
* Gemi, bu yay üzerinde bir noktadadır

⬛ **Geometrik Özellik**

════════════════════
A–B
görülen açı
sabit
→
çember yayı
════════════════════

---

### Üç Objeyle Fix

* İki ayrı yatay açı ölçülür

  * A–B → θ₁
  * B–C → θ₂
* Her açı için ayrı bir yay çizilir
* İki yayın kesişimi → **Fix**

---

### Harita Üzerinde Uygulama (2 Açı)

1. Objeler A, B, C haritada işaretlenir
2. A–B için **θ₁** açısına uygun yay çizilir
3. B–C için **θ₂** açısına uygun yay çizilir
4. Yayların kesişimi → **Fix**

---

### Sayısal Uygulama Örneği

**Verilenler**

* Obje A – B arası yatay açı

  * θ₁ = **40°**
* Obje B – C arası yatay açı

  * θ₂ = **55°**

---

### Grafik Çözüm

⬛ **Adım 1 – A–B Yayı**

* A ve B noktaları birleştirilir
* A–B doğrusu üzerinde, **40° gören çember yayı** çizilir

⬛ **Adım 2 – B–C Yayı**

* B ve C noktaları birleştirilir
* B–C doğrusu için **55° gören çember yayı** çizilir

⬛ **Sonuç**

════════════════════
Yay₁ ∩ Yay₂
= Fix
════════════════════

---

### Güç Kriterleri

⬛ **İdeal Şartlar**

════════════════════
Açılar
30° – 120°
Objeler
geniş yayılım
════════════════════

* Çok küçük açı → zayıf doğruluk
* Objelerin aynı doğrultuda olması → hatalı fix

---

### Hata Kaynakları

* Sekstant okuma hatası
* Yanlış obje seçimi
* Objelerin birbirine çok yakın olması
* Harita çizim hataları

---

### Harita Sembolizasyonu

* Objeler → ▲
* Yatay açı → yay + derece değeri
* Mevki yayı → ince eğri çizgi
* Fix → ●

---

### Kullanım Alanları

* Kerteriz alınamayan sahalar
* Liman girişleri
* Dar geçitler
* Yüksek doğruluk gerektiren kıyı seyri

Horizontal Angle Fix, klasik seyrüseferde **açı geometrisine dayalı**, doğru uygulandığında **çok hassas sonuç veren** bir mevki tayin yöntemidir ve özellikle **sekstant kullanımının aktif olduğu** terrestrial seyirlerde önemli bir yer tutar.`
      }
    ]
  },
  "Limitations and Applicability of Mean Latitude Sailing": {
    title: "Limitations and Applicability of Mean Latitude Sailing",
    introduction:
      "Mean Latitude Sailing, küresel Dünya yüzeyinin düzlemsel kabulüne dayanan yaklaşık bir seyir yöntemidir. Bu nedenle yalnızca belirli enlem aralıklarında ve sınırlı mesafelerde güvenilir sonuçlar verir. Bu bölümde yöntemin nerede kullanılabileceği ve nerede kullanılmaması gerektiği sistematik olarak açıklanır.",
    sections: [
      {
        title: "Detaylı Anlatım",
        content: `![Image](https://www.marinepublic.com/_next/image?q=75&url=https%3A%2F%2Fik.imagekit.io%2Fh53vszdxp%2Fillustration_Great_Circle_and_Composite_GC_comparison_fxcf5a.jpg&w=3840)

![Image](https://astronavigationdemystified.com/wp-content/uploads/2016/09/diag15-mod.jpg)

![Image](https://www.researchgate.net/publication/259912499/figure/fig9/AS%3A297134860587011%401447853879125/Mercator-Calculation-of-Difference-in-Longitude.png)

![Image](https://astrolabesailing.com/wp-content/uploads/2014/10/distances.jpg)

---

### Temel Varsayım

Mean Latitude Sailing’de şu kabuller yapılır:

* Meridyenler **paralel kabul edilir**
* Paraleller arası mesafe **sabit** varsayılır
* Küresel geometri yerine **düzlem geometri** kullanılır

⬛ **Ana Kabul**

════════════════════
Dünya
≈
Düzlem
════════════════════

Bu kabul, yalnızca **orta enlemlerde** yeterli doğruluğu sağlar.

---

### Enleme Bağlı Hata Davranışı

Enlem arttıkça meridyenler birbirine yaklaşır. Mean Latitude Sailing bu yakınlaşmayı **ortalama enlem** ile telafi etmeye çalışır.

⬛ **Kullanılan Yaklaşım**

════════════════════
D.Long = Dep / cos Mean Lat
════════════════════

Bu ifade, **küçük D.Lat** ve **orta enlem** şartlarında geçerlidir.

---

### Geçerli Enlem Aralığı

⬛ **Pratik Kural**

════════════════════
Lat < 60°
→
Kabul Edilebilir
════════════════════

* **0° – 30°** → Çok iyi doğruluk
* **30° – 60°** → Kabul edilebilir
* **> 60°** → Hatalı sonuçlar

---

### Mesafeye Bağlı Sınır

Mean Latitude Sailing, **kısa ve orta mesafeler** için uygundur.

⬛ **Mesafe Kuralı**

════════════════════
Distance < 600 NM
→
Uygun
════════════════════

* Uzun mesafelerde küresel hata büyür
* Büyük D.Long değerlerinde sapma artar

---

### Mercator Sailing ile Karşılaştırma

| Özellik      | Mean Latitude | Mercator      |
| ------------ | ------------- | ------------- |
| Geometri     | Düzlem        | Küresel       |
| Uzun Mesafe  | Zayıf         | Güçlü         |
| Hesaplama    | Basit         | Daha karmaşık |
| Yüksek Enlem | Uygun değil   | Uygun         |

⬛ **Seçim İlkesi**

════════════════════
Kısa / Orta Mesafe
→
Mean Latitude
════════════════════

════════════════════
Uzun Mesafe
→
Mercator
════════════════════

---

### Hata Kaynakları

* Yüksek enlem kullanımı
* Büyük D.Lat farkı
* Büyük boylam farkı
* Ortalama enlemin yanlış seçilmesi

---

### Grafiksel Hata Gösterimi

* Gerçek yol → eğri (küresel)
* Hesaplanan yol → düz çizgi
* Enlem arttıkça fark büyür

---

### Sayısal Karşılaştırma Örneği

**Verilenler**

* D.Lat = **600′**
* Dep = **600′**
* Mean Lat = **30°**

⬛ **Mean Latitude Sailing**

════════════════════
D.Long = 600 / cos 30°
D.Long = 600 / 0.866
D.Long ≈ 693′
════════════════════

⬛ **Yüksek Enlem (60°)**

════════════════════
D.Long = 600 / cos 60°
D.Long = 600 / 0.5
D.Long = 1200′
════════════════════

➡ Aynı geometrik hareket, yüksek enlemde **iki kat boylam farkı** üretir.

---

### Uygulama Kuralları

⬛ **Kullan**

════════════════════
Orta enlem
Kısa–orta mesafe
Planlama / DR
════════════════════

⬛ **Kullanma**

════════════════════
Yüksek enlem
Uzun okyanus geçişi
Kutuplara yakın seyir
════════════════════

---

### Harita Sembolizasyonu

* Mean Latitude → enlem yayı
* Hesaplanan yol → düz çizgi
* Gerçek yol → eğri çizgi
* Hata → iki yol arası mesafe

---

### Seyir Uygulamasındaki Yeri

* Eğitim amaçlı seyir hesapları
* Klasik chartwork
* DR / EP üretimi
* Hızlı rota değerlendirmesi

Mean Latitude Sailing, **basitliği ve hızı** nedeniyle klasik seyrüseferde önemli bir yere sahiptir; ancak **enlem ve mesafe sınırları bilinmeden kullanıldığında**, ciddi mevki hatalarına yol açabilir.`
      }
    ]
  },
  "Büyük Daire Vertex (En Yüksek Enlem) Hesaplamaları": {
    title: "Büyük Daire Vertex (En Yüksek Enlem) Hesaplamaları",
    introduction:
      "Büyük daire seyrinde vertex, büyük daire yayının kutba en çok yaklaştığı ve rota boyunca ulaşılan en yüksek enlemi veren kritik noktadır. Bu değer, özellikle buz sahaları, fırtına kuşağı ve operasyonel sınırlar açısından rota planlamasının emniyet kontrol parametresidir.",
    sections: [
      {
        title: "Vertex’in Seyirdeki Önemi",
        content: `Vertex, büyük daire rotasının **kutba en yakın** olduğu noktadır. Büyük daire, en kısa yol olduğu için yüksek enlemlere doğru “yukarı kıvrılır”; bu kıvrılma sınırının bilinmemesi, gemiyi istenmeyen meteorolojik ve operasyonel koşullara sokabilir.

![Great circle vertex görselleştirmesi](https://blog.evoatpl.com/wp-content/uploads/2024/08/GreatCircleVertices-1.png)

![Great circle ve composite rota karşılaştırması](https://www.marinepublic.com/_next/image?q=75&url=https%3A%2F%2Fik.imagekit.io%2Fh53vszdxp%2Fillustration_Great_Circle_and_Composite_GC_comparison_fxcf5a.jpg&w=3840)`
      },
      {
        title: "Geometrik Tanım",
        content: `Vertex noktası, büyük daire yayının bir paraleli **teğet geçtiği** konumdur. Bu noktada enlem değişimi anlık olarak sıfıra yaklaşır ve rota doğrultusu **doğu–batı** yönüne en çok yaklaşan halini alır.

![Büyük daire teğet noktası](https://i0.wp.com/captsschaudhari.com/wp-content/uploads/2022/05/9e654-untitled330-1.jpg?fit=523%2C287&ssl=1)`
      },
      {
        title: "Vertex Enlemi (Maksimum Enlem) Formülü",
        content: "En pratik yaklaşım, başlangıç enlemi ve başlangıç kursu üzerinden vertex enlemini bulmaktır. Mutlak değer, maksimum enlem büyüklüğünü verir; işaret, rota yarımküresi ve seyir yönüne göre değerlendirilir.",
        formula: {
          text: "sin φv = |sin C₁| × cos φ₁",
          description: "φv: vertex enlemi, C₁: başlangıç kursu, φ₁: başlangıç enlemi."
        }
      },
      {
        title: "Hesap Adımları (Özet)",
        content: "Uygulamada hızlı kontrol için aşağıdaki adımlar kullanılır:",
        bulletPoints: [
          "Başlangıç enlemi φ₁ ve başlangıç kursu C₁ belirlenir.",
          "sin C₁ ve cos φ₁ hesaplanır.",
          "sin φv = |sin C₁| × cos φ₁ bulunur.",
          "φv = arcsin(sin φv) ile maksimum enlem elde edilir.",
          "Yarımküre ve rota yönüne göre işaret değerlendirilir."
        ]
      },
      {
        title: "Örnek Hesap – Maksimum Enlem",
        content: `Bir gemi **37° N** enleminden büyük daire seyrine başlıyor ve başlangıç kursu **55°** olsun.

sin 55° ≈ 0.819  
cos 37° ≈ 0.799  

sin φv = 0.819 × 0.799 ≈ 0.654  
φv ≈ **40.9°**

Bu sonuç, geminin büyük daire seyri boyunca yaklaşık **40.9° N** enleminin üzerine çıkmayacağını gösterir. Kış sezonunda Kuzey Atlantik gibi bölgelerde bu değer kabul edilebilir sınırın üstündeyse rota **composite** veya **limit enlem** yaklaşımıyla revize edilmelidir.`
      },
      {
        title: "Operasyonel Değerlendirme",
        content: `Vertex enlemi bulunduğunda, bu değer aşağıdaki risk katmanlarıyla karşılaştırılır:

* Buz sahası ve düşük sıcaklık bölgeleri
* Fırtına kuşağı ve dalga rejimi
* Trafik yoğunluğu ve rota kısıtları

Eğer maksimum enlem riskli bölgelere giriyorsa, büyük daire rota doğrudan uygulanmaz; **composite great circle** veya **limit enlem** planlaması tercih edilir.`
      }
    ],
    keyPoints: [
      "Vertex, büyük daire yayının kutba en yakın ve en yüksek enleme ulaştığı noktadır.",
      "sin φv = |sin C₁| × cos φ₁ bağıntısı pratikte en sık kullanılan yöntemdir.",
      "Vertex enlemi, meteoroloji ve buz riski açısından rota emniyetinin temel kontrolüdür.",
      "Riskli enlemler için composite rota veya limit enlem yaklaşımı uygulanır."
    ]
  }
};
