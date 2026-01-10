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
  }
};
