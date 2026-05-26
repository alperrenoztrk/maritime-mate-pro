// Navigation topic detailed content
// Import images - Dünya'nın Şekli (gerçek NASA fotoğrafları + teknik SVG diyagramlar)
import earthBlueMarble from "@/assets/navigation/real/earth-blue-marble.jpg";
import earthNightLights from "@/assets/navigation/real/earth-night-lights.jpg";
const earthOblate = earthBlueMarble; // NASA Apollo-tip Earth görüntüsü
const earthShape1 = earthBlueMarble;
const earthRotation = earthNightLights;
const earthTilt = "/diagrams/navigation/eksen-egikligi.svg";
const earthSeasons = "/diagrams/navigation/mevsimler.svg";
const earthTimezone1 = "/diagrams/navigation/zaman-dilimleri.svg";
const earthTimezone2 = "/diagrams/navigation/zaman-dilimleri.svg";


// Coğrafi Koordinat Sistemi + Enlem — Tur 2: Teknik SVG diyagramlar (AI görseller değiştirildi)
const coordinateSystem1 = "/diagrams/navigation/koordinat-sistemi.svg";
const coordinateSystem2 = "/diagrams/navigation/paraleller-meridyenler.svg";
const coordinateSystem3 = "/diagrams/navigation/enlem-bolgeleri.svg";
const latitudeParallels = "/diagrams/navigation/enlem-paralelleri.svg";
const latitudeConcept = "/diagrams/navigation/enlem-tanimi.svg";
const latitudeMeasurement1 = "/diagrams/navigation/enlem-gokyuzu.svg";
const latitudeMeasurement2 = "/diagrams/navigation/enlem-gokyuzu.svg";
import longitudeConcept from "@/assets/navigation/longitude-concept.jpg";
import longitudeTime1 from "@/assets/navigation/longitude-time-1.png";
import longitudeTime2 from "@/assets/navigation/longitude-time-2.png";
import chartPlotting from "@/assets/navigation/chart-plotting.jpg";
import longitudeDistance1 from "@/assets/navigation/longitude-distance-1.jpg";
import longitudeDistance2 from "@/assets/navigation/longitude-distance-2.jpg";

// Enlem — Tur 2 teknik diyagramlar
const enlemParallels = "/diagrams/navigation/enlem-paralelleri.svg";
const enlemDefinition = "/diagrams/navigation/enlem-tanimi.svg";
const enlemRegions = "/diagrams/navigation/enlem-bolgeleri.svg";
const enlemNauticalMile = "/diagrams/navigation/deniz-mili.svg";
const enlemPlaneSailing = "/diagrams/navigation/duzlem-seyir.svg";
const enlemNewOrleans = "/diagrams/navigation/enlem-bolgeleri.svg";

// Import images - Boylam
import boylamWorldMap from "@/assets/navigation/boylam-world-map.jpg";
import boylamLocalNoon from "@/assets/navigation/boylam-local-noon.png";
import boylamDefinition from "@/assets/navigation/boylam-definition.jpg";
import boylamMeridians from "@/assets/navigation/boylam-meridians.jpg";
import boylamTimeZones from "@/assets/navigation/boylam-time-zones.png";
import boylamDeparture from "@/assets/navigation/boylam-departure.jpg";
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

// Import images - Göksel Küre
import celestialTriangle from "@/assets/navigation/celestial-triangle.svg";
import azimuthalProjection from "@/assets/navigation/azimuthal-projection.svg";
import enlemCelestial from "@/assets/navigation/enlem-celestial.png";
import boylamCelestial from "@/assets/navigation/boylam-celestial.png";

// Import images - Harita Sembolleri
import sembolIalaBuoyage from "@/assets/navigation/sembol-iala-buoyage.jpg";
import sembolCardinalMarks from "@/assets/navigation/sembol-cardinal-marks.png";
import sembolIsolatedDanger from "@/assets/navigation/sembol-isolated-danger.jpg";
import sembolLightCharacteristics from "@/assets/navigation/sembol-light-characteristics.jpg";
import sembolSectorLights from "@/assets/navigation/sembol-sector-lights.jpg";
import sembolRacon from "@/assets/navigation/sembol-racon.jpg";
import sembolDangers from "@/assets/navigation/sembol-dangers.jpg";
import mercatorProjection from "@/assets/navigation/mercator-projection.svg";
import gnomonicProjection from "@/assets/navigation/gnomonic-projection.svg";
import gpsSatellites from "@/assets/navigation/gps-satellites.svg";
import radarDisplay from "@/assets/navigation/radar-display.svg";
import ecdisDisplay from "@/assets/navigation/ecdis-display.svg";
import tideCurrent from "@/assets/navigation/tide-current.svg";
import weatherSystems from "@/assets/navigation/weather-systems.svg";
import aisTargets from "@/assets/navigation/ais-targets.svg";
import navtexReceiver from "@/assets/navigation/navtex-receiver.svg";
import autopilotControl from "@/assets/navigation/autopilot-control.svg";
import vhfRadio from "@/assets/navigation/vhf-radio.svg";
import safetyEquipment from "@/assets/navigation/safety-equipment.svg";
import compassImg from "@/assets/navigation/compass.svg";
import ialaLateralMarks from "@/assets/navigation/iala-lateral-marks.svg";
import cardinalMarks from "@/assets/navigation/cardinal-marks.svg";
import safeWaterMark from "@/assets/navigation/safe-water-mark.svg";
import isolatedDangerMark from "@/assets/navigation/isolated-danger-mark.svg";
import greatCircleVsRhumb from "@/assets/navigation/great-circle-vs-rhumb.svg";
import sextantSvg from "@/assets/navigation/sextant.svg";

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
  "Yükseklik düzeltmeleri": {
    title: "Yükseklik düzeltmeleri",
    introduction:
      "Yükseklik düzeltmeleri, sextant ile ölçülen alet yüksekliğinin gerçek geometrik yüksekliğe dönüştürülmesi için uygulanan zorunlu işlemlerdir. Sextanttan okunan değer doğrudan gök cisminin gerçek yüksekliği değildir; göz yüksekliği, atmosfer, gök cisminin fiziksel boyutu ve Dünya merkezinden bakış varsayımı gibi etkiler bu ölçümü sistematik olarak saptırır. Bu nedenle düzeltmeler uygulanmadan yapılan hesaplar mevki tayininde güvenilir sonuç vermez.",
    sections: [
      {
        title: "Görsel Referanslar",
        content: `![Image](https://astronavigationdemystified.com/wp-content/uploads/2015/09/nonum-diag26.jpg)

![Image](https://astronavigationdemystified.com/wp-content/uploads/2015/09/diag-27.jpg)

![Image](https://i0.wp.com/mathscinotes.com/wp-content/uploads/2015/10/lc-nav-fig3.gif?ssl=1)

![Image](https://upload.wikimedia.org/wikipedia/commons/3/39/Atmospheric_refraction_-_sunset_and_sunrise.png)`
      },
      {
        title: "Amaç ve Genel Çerçeve",
        content:
          "Düzeltmelerin amacı, ölçümü ideal kabul edilen gözlem koşullarına indirgemektir. Uygulama sırası ve işaretler kritiktir. Yanlış sırada veya hatalı işaretle yapılan tek bir düzeltme, Ho değerini dakikalar mertebesinde değiştirerek mevki hattını mil ölçeğinde kaydırır. Pratik seyirde bu, özellikle düşük yükseklikli gözlemlerde belirgin bir hata kaynağıdır."
      },
      {
        title: "Düzeltmelerin Uygulama Sırası",
        content: "Hs üzerinden Ho’ya geçerken temel sıra aşağıdaki gibidir:",
        bulletPoints: [
          "İndeks hatası (IE) uygulanır: Hs ± IE",
          "Dip düzeltmesi çıkarılır",
          "Atmosferik refraksiyon çıkarılır",
          "Yarıçap (SD) ve paralaks (P) gök cismi türüne göre eklenir/çıkarılır"
        ]
      },
      {
        title: "Dip Düzeltmesi",
        content: "Göz yüksekliği arttıkça görülen ufuk düşer; bu nedenle dip her zaman çıkarılır.",
        formula: {
          text: "Dip = 1.76 × √h",
          description: "h: göz yüksekliği (metre). Sonuç dakikadır ve çıkarma işaretiyle uygulanır."
        }
      },
      {
        title: "Atmosferik Refraksiyon",
        content:
          "Atmosfer ışığı kırarak gök cismini olduğundan daha yüksek gösterir. Bu nedenle refraksiyon her zaman çıkarılır. Basit yaklaşım:",
        formula: {
          text: "R ≈ 1 / tan h",
          description: "R dakikadır, h gözlenen yükseklik açısıdır. Düşük yüksekliklerde hata büyür."
        }
      },
      {
        title: "Yarıçap (SD) ve Paralaks",
        content:
          "Yıldız gözlemlerinde yarıçap ve paralaks ihmal edilebilirken, Güneş ve Ay gözlemlerinde bu terimler zorunludur.",
        bulletPoints: [
          "Güneş alt kenar gözlemi: +SD",
          "Güneş üst kenar gözlemi: −SD",
          "SD yaklaşık 16′ alınır",
          "Paralaks: özellikle Ay’da belirgindir"
        ],
        formula: {
          text: "P = HP × cos h",
          description: "HP yatay paralakstır; h gözlenen yüksekliktir."
        }
      },
      {
        title: "Toplam Bağıntı",
        content: "Tüm düzeltmelerin uygulanmasıyla elde edilen düzeltilmiş yükseklik aşağıdaki bağıntıyla ifade edilir:",
        formula: {
          text: "Ho = Hs ± IE − Dip − R ± SD ± P",
          description: "Ho: düzeltilmiş gözlemsel yükseklik, Hs: sextant ölçümü."
        }
      },
      {
        title: "Örnek Hesap",
        content: `Sextanttan okunan alet yüksekliği **Hs = 27° 18.4′** olsun. İndeks hatası **−1.6′**, göz yüksekliği **16 m** ve Güneş **alt kenar** gözlemi yapılmış olsun.

Dip düzeltmesi:

Dip = 1.76 × √16  
Dip = 1.76 × 4  
Dip = **7.0′**

Atmosferik refraksiyon:

h ≈ 27°  
tan 27° ≈ 0.509  
R ≈ 1 / 0.509 ≈ **2.0′**

Yarıçap düzeltmesi:

SD = **+16.0′**

Düzeltilmiş yükseklik:

Ho = 27° 18.4′ − 1.6′ − 7.0′ − 2.0′ + 16.0′  
Ho = **27° 23.8′**

Elde edilen Ho değeri, gözlem koşullarından ve alet etkilerinden arındırılmış geometrik yüksekliktir. Bu değer, astronomik tablolarla hesaplanan Hc ile karşılaştırılarak intercept belirlenir; düzeltmelerdeki ihmal, mevki tayinini doğrudan zayıflatır.`
      }
    ],
    keyPoints: [
      "Hs değeri doğrudan gerçek yükseklik değildir; dip ve refraksiyon mutlaka çıkarılır.",
      "Güneş ve Ay gözlemlerinde yarıçap ve paralaks zorunlu düzeltmelerdir.",
      "Sıra ve işaret hatası, Ho değerini dakikalar düzeyinde kaydırabilir.",
      "Toplam bağıntı Ho = Hs ± IE − Dip − R ± SD ± P şeklindedir."
    ]
  },
  "Sextant kullanımı": {
    title: "Sextant kullanımı (göksel seyir — aşama aşama)",
    introduction:
      "Sextant kullanımı, göksel seyirde tek fiziksel ölçüm adımıdır. Yapılan tüm hesaplar, çizimler ve fix işlemleri, sextant ile ölçülen yükseklik açısına dayanır. Bu nedenle sextant kullanımı bir “alet tanıtımı” değil, ölçüm disiplini olarak ele alınmalıdır. Aşağıdaki anlatım, hesaplamaya girmeden önce yapılan işlemleri görsel aşamalar üzerinden açıklar.",
    sections: [
      {
        title: "Görsel Referanslar",
        content: `![Image](https://future-seafarer.com/wp-content/uploads/2017/09/sextent_with_parts.jpg)

![Image](https://easysextant.com/wp-content/uploads/2022/10/Hv-anglais.jpg.webp)

![Image](https://ik.imagekit.io/nnxh9whs7ca/wp-content/uploads/2015/11/Using-Sextant.jpg)

![Image](https://www.prosmarine.com/wp-content/uploads/2017/07/how-to-adjust-marine-sextant-errors.jpg)`
      },
      {
        title: "Aşama 1: Sextantın geometrik mantığının kurulması",
        content:
          "Sextantın iki aynası (indeks aynası ve ufuk aynası) ve teleskop, gök cisminin görüntüsünü ufuk düzlemiyle çakıştırmak için kullanılır. Sextant, gök cisminin görüntüsünü aynalar yardımıyla ufukla çakıştırarak aradaki açıyı ölçer. Ölçülen açı, gök cisminin ufka göre yüksekliğidir; burada ölçülen şey mesafe değil açıdır."
      },
      {
        title: "Aşama 2: İndeks hatasının kontrol edilmesi (ölçüm öncesi)",
        content:
          "Ufuk–ufuk veya Güneş–Güneş yöntemiyle indeks hatası kontrol edilir. Sextant sıfırdayken görüntüler tam çakışmıyorsa, ölçülen tüm yükseklikler sistematik hata içerir. Bu kontrol her gözlem serisinden önce yapılır ve sonuç not edilir. İndeks hatası düzeltilmeden yapılan gözlem, sonraki tüm aşamaları geçersiz kılar."
      },
      {
        title: "Aşama 3: Gök cisminin ufukla çakıştırılması",
        content:
          "Sextant dik tutulur, teleskoptan bakılarak gök cisminin görüntüsü yavaşça ufka indirilir. Amaç, gök cisminin alt kenarının ufka tam temas ettiği anı yakalamaktır. Gemi hareketli olduğu için bu işlem birkaç salınım içinde yapılır ve ortalama alınır."
      },
      {
        title: "Aşama 4: Alet yüksekliğinin okunması (Hs)",
        content:
          "Ölçüm tamamlandığında sextanttan okunan değer alet yüksekliği (Hs) olarak adlandırılır. Hs henüz geometrik bir yükseklik değildir. Bu aşamada ölçüm tamamlanır; hesaplama henüz başlamaz. Ölçüm anına ait zaman bilgisi (UTC) bu noktada kronometreden not edilir."
      },
      {
        title: "Temel ilişkiler (bağlam)",
        content:
          "Bu aşamada yalnızca Hs ve IE (indeks hatası) elde edilir; diğer terimler sonraki başlıklara aittir.",
        formula: {
          text: "Ho = Hs ± IE − Dip − R ± SD ± P",
          description: "Düzeltilmiş yükseklik bağıntısı. Hs sextanttan okunan değerdir."
        }
      },
      {
        title: "Örnek uygulama (görsel mantıkla ölçüm süreci)",
        content:
          "Güneş gözlemi yapılırken sextant dik tutulur. İndeks kolu hareket ettirilerek Güneş’in alt kenarı ufka temas ettirilir. Gemi dalga nedeniyle yukarı–aşağı hareket ederken temas anları birkaç kez gözlenir ve ortalama bir temas noktası seçilir. Ölçüm tamamlandığında sextanttan **Hs = 46° 12.4′** okunur ve aynı anda kronometreden gözlem zamanı kaydedilir. Bu değer henüz mevki tayini değildir; sextant kullanımı burada biter. Bundan sonra yapılan tüm işlemler bu ölçümün düzeltmeye ve yoruma tabi tutulmasıdır. Sextant doğru kullanılmadığında, hesaplar ne kadar düzgün yapılırsa yapılsın sonuç güvenilir olmaz."
      }
    ],
    keyPoints: [
      "Sextant ölçümü, göksel seyirde tek fiziksel ölçüm adımıdır",
      "İndeks hatası kontrolü her gözlem serisinden önce yapılır",
      "Alt kenarın ufka temas ettiği an yakalanır ve salınımlardan ortalama alınır",
      "Okunan değer Hs’dir; hesaplama bundan sonra başlar"
    ]
  },
  "Öğle mevkii (enlem)": {
    title: "Öğle mevkii (enlem)",
    introduction:
      "Öğle mevkii, Güneş’in yerel meridyenden geçişi anında yapılan tek gözlemle enlemin doğrudan bulunmasını sağlar. Bu yöntem LOP üretmez; yerel öğlede Güneş’in en büyük yüksekliği temel alınır ve zenit uzaklığı üzerinden enlem hesaplanır.",
    sections: [
      {
        title: "Görsel Referanslar",
        content: `![Image](https://www.myseatime.com/blogadm/wp-content/uploads/2018/09/ship-position-by-sun-sight.jpg)

![Image](https://easysextant.com/wp-content/uploads/2025/09/L-D-alpha.jpg.webp)

![Image](https://astronavigationdemystified.com/wp-content/uploads/2015/07/altitude-and-zenith-distance.jpg)

![Image](https://www.onboardintelligence.com/CelestialNav/Images/astro2.gif)`
      },
      {
        title: "Aşama 1: Yerel öğle anının tespiti",
        content:
          "Güneş’in yükselip alçaldığı yay izlenir; **yerel öğle**, yüksekliğin **en büyük** olduğu andır. Bu an, saat bilgisine göre değil, **yüksekliğin maksimuma ulaştığı nokta** olarak belirlenir. Boylam bu aşamada gerekli değildir."
      },
      {
        title: "Aşama 2: En büyük yükseklikten Ho’nun elde edilmesi",
        content:
          "Sextant ile ölçülen en büyük yükseklik, tüm düzeltmeler (IE, dip, refraksiyon, SD, paralaks) uygulanarak **Ho (düzeltilmiş yükseklik)** değerine çevrilir. Öğle mevkiinde Ho, Güneş’in meridyendeki gerçek yüksekliğini temsil eder."
      },
      {
        title: "Aşama 3: Zenit uzaklığının (Z) kurulması",
        content:
          "Ho değeri, gözlemcinin zenit noktasına göre açısal uzaklığa çevrilir. Zenit uzaklığı, Güneş ile zenit arasındaki geometrik mesafedir.",
        formula: {
          text: "Z = 90° − Ho",
          description: "Z: zenit uzaklığı, Ho: düzeltilmiş gözlemsel yükseklik."
        }
      },
      {
        title: "Aşama 4: Enlemin belirlenmesi (kuzey/güney yorumu)",
        content:
          "Güneş’in **deklinasyonu (δ)** ve zenit uzaklığı birlikte yorumlanır. Güneş gözlemcinin **kuzeyinde** veya **güneyinde** meridyenden geçer; bu durum işaret kuralını belirler ve enlem doğrudan elde edilir.",
        formula: {
          text: "φ = Z ± δ",
          description: "φ: enlem | Z: zenit uzaklığı | δ: deklinasyon."
        },
        bulletPoints: [
          "Güneş ve gözlemci **aynı yarımkürede** → φ = Z + δ",
          "Güneş ve gözlemci **karşı yarımkürede** → φ = Z − δ"
        ]
      },
      {
        title: "Formül Özeti (Trigonometrisiz Uygulama)",
        content:
          "Öğle mevkii yöntemi, yalnızca Ho ve δ ile çalışır; küresel trigonometri gerektirmez. Bu nedenle hızlı enlem kontrolü sağlar.",
        bulletPoints: [
          "Z = 90° − Ho",
          "φ = Z ± δ (işaret yorumu meridyen geçiş yönüne göre yapılır)"
        ]
      },
      {
        title: "Örnek Uygulama",
        content: `Yerel öğle anında **Ho = 63° 20.0′** ölçülsün.

Z = 90° − 63° 20.0′ = **26° 40.0′**

Astronomik tablodan Güneş deklinasyonu **δ = 18° 10.0′ N** olsun. Güneş meridyende **güneyde** geçiyorsa (kuzey yarımkürede klasik durum):

φ = Z − δ  
φ = 26° 40.0′ − 18° 10.0′  
φ = **08° 30.0′ N**

Bu sonuç, geminin yerel öğle anında **8° 30.0′ Kuzey enleminde** bulunduğunu gösterir. Öğle mevkii, açık denizde hızlı ve güvenilir bir enlem kontrolü sağlar; ancak bulutlu havada ve Güneş’in meridyene net çıkmadığı koşullarda operasyonel olarak zayıflar.`
      }
    ],
    keyPoints: [
      "Öğle mevkii, Güneş’in meridyenden geçiş anındaki en büyük yükseklikte yapılır.",
      "Ho’dan zenit uzaklığı bulunur: Z = 90° − Ho.",
      "Enlem, φ = Z ± δ bağıntısıyla doğrudan elde edilir.",
      "İşaret yorumu, Güneş’in gözlemciye göre kuzeyde mi güneyde mi geçtiğine göre belirlenir."
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
        title: "Zamanla Boylam — Göksel Seyir (Görsel Aşamalı)",
        content: `Zamanla boylam tayini, Dünya'nın kendi ekseni etrafındaki dönüşü ile **zaman–açı** ilişkisinin doğrudan kullanılmasına dayanır. Bu yöntemde amaç, **yerel zaman** ile **Greenwich zamanı** arasındaki farktan **boylamı** elde etmektir. Anlatım, hesaplama adımlarını **aşama aşama ve görseller üzerinden** izler.

![Greenwich–yerel meridyen ilişkisi](https://astronavigationdemystified.com/wp-content/uploads/2017/10/diag4-with-greenwich.jpg?w=584)

**Aşama 1: Referans zamanların kurulması**  
Greenwich meridyeni ve gözlemcinin yerel meridyeni birlikte düşünülür. Greenwich zamanı kronometreden okunur. Yerel zaman ise astronomik bir olaya (çoğunlukla Güneş’in yerel meridyenden geçişi) bağlanır. Burada kritik nokta, yerel zamanın **olaya göre** belirlenmesidir; saat ayarına göre değil.

![Yerel öğle ve kronometre okuması](https://astronavigationdemystified.com/wp-content/uploads/2015/07/gmt-white.jpg)

**Aşama 2: Yerel öğle anının belirlenmesi**  
Yerel öğle, Güneş’in gün içindeki yüksekliğinin **maksimum** olduğu andır. Bu an, yerel meridyen geçişidir. Aynı anda kronometrede okunan Greenwich zamanı not edilir. Boylam hesabının tek girişi bu zaman farkıdır.

![Zaman farkı → açı dönüşümü](https://www.eso.org/public/outreach/eduoff/seaspace/navigation/navastro/images/nava13a.gif)

**Aşama 3: Zaman farkının açıya çevrilmesi**  
Dünya 24 saatte 360° döndüğü için zaman doğrudan açıya çevrilebilir. Bu aşamada trigonometrik hesap yoktur; yalnızca **sabit dönüşüm** kullanılır.

![Doğu–batı yorum kuralı](https://www.thestargarden.co.uk/Images/Longitude-time-zones.jpg)

**Aşama 4: Doğu–batı yorumunun yapılması**  
Yerel olay Greenwich’ten **daha erken** gerçekleşmişse gözlemci **doğu** boylamındadır; **daha geç** gerçekleşmişse **batı** boylamındadır. Bu yorum yapılmadan bulunan açı tek başına anlamlı değildir.

**Formüller (zamanla boylam — ders uyumlu)**  
360° = 24 saat  
1 saat = 15°  
1 dakika zaman = 15′  
1 saniye zaman = 15″  
**Boylam bağıntısı:** λ = Δt × 15°

**İşaret kuralı**  
Yerel zaman Greenwich’ten ileri → **Doğu boylam**  
Yerel zaman Greenwich’ten geri → **Batı boylam**

**Örnek uygulama (görsel mantıkla)**  
Yerel öğle anında kronometrede okunan Greenwich zamanı **09:48:00** olsun. Yerel öğle, yerel saatle **12:00:00** kabul edilir.

Δt = 12:00:00 − 09:48:00 = **2 saat 12 dakika**  
2 saat × 15° = 30°  
12 dakika × 15′ = 180′ = 3°  
**λ = 33°**

Yerel olay Greenwich’ten **daha geç** gerçekleştiği için boylam **batıdır**. Sonuç: Gemi yaklaşık **33° Batı boylamındadır**.

Bu yöntem, kronometre disiplini sağlandığında açık denizde hızlı ve etkilidir. Ancak birkaç saniyelik zaman hatasının dahi mil mertebesinde boylam hatası üretebildiği unutulmamalıdır; bu nedenle sonuçlar diğer göksel verilerle birlikte kontrol edilmelidir.`
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
  "Zamanla boylam": {
    title: "Zamanla Boylam Tayini",
    introduction:
      "Zamanla boylam tayini, Dünya’nın kendi ekseni etrafındaki dönüşü ile zaman arasındaki sabit ilişkiye dayanır. Yerel meridyenden geçen bir gök cisminin zamanı ile Greenwich meridyenindeki aynı olayın zamanı karşılaştırıldığında, iki meridyen arasındaki açısal fark doğrudan boylamı verir. Bu yöntem, göksel seyirde zaman bilgisinin neden merkezi bir rol oynadığını açık biçimde ortaya koyar.",
    sections: [
      {
        title: "Temel İlke: Dünya Dönüşü ve Zaman",
        content:
          "Dünya 24 saatte 360° döndüğü için zaman farkı doğrudan boylam farkına karşılık gelir. Bu sabit oran, kronometre zamanını yerel zamanla karşılaştırarak boylam bulmayı mümkün kılar.",
        image: boylamTimeZones,
        imageAlt: "Boylam ve zaman dilimleri ilişkisi",
        bulletPoints: ["24 saat = 360° dönüş", "1 saat = 15°", "1 dakika zaman = 15′", "1 saniye zaman = 15″"],
        formula: {
          text: "λ = Δt × 15°",
          description: "Δt, Greenwich zamanı ile yerel zaman arasındaki farktır."
        }
      },
      {
        title: "Yerel Zaman ve Greenwich Zamanı",
        content:
          "Yerel zaman, gök cisminin yerel meridyenden geçişine (yerel öğle) veya belirli bir saat açısına göre belirlenir. Greenwich zamanı ise kronometre ile okunur. İki zaman arasındaki fark doğrudan boylamı verir; işaret, doğu veya batı yönünü belirler.",
        image: boylamLocalNoon,
        imageAlt: "Yerel öğle, Greenwich zamanı ve boylam ilişkisi",
        bulletPoints: ["Yerel zaman Greenwich’ten ileri ise → Doğu boylamı", "Yerel zaman Greenwich’ten geri ise → Batı boylamı"]
      },
      {
        title: "Hata Kaynakları ve Uygulama Disiplini",
        content:
          "Zamanla boylam yöntemi teorik olarak nettir; ancak pratikte kronometre hatası, gözlem anının yanlış tespiti ve düzeltilmiş yükseklik hataları boylam sonucunu doğrudan etkiler. Bu nedenle yöntem, açık denizde kontrol amaçlı güvenilir bir araç olmakla birlikte, tek başına dar alan seyri için yeterli emniyeti sağlamaz.",
        image: boylamCelestial,
        imageAlt: "Göksel seyirde kronometre disiplini"
      },
      {
        title: "Örnek Hesap: Zaman Farkından Boylam",
        content:
          "Yerel meridyenden Güneş geçişi anı yerel saatle 12:00 olarak belirlensin. Aynı anda kronometrede okunan Greenwich zamanı 09:40 olsun. Zaman farkı 2 saat 20 dakika olduğundan boylam yaklaşık 35° bulunur ve yerel zaman Greenwich’ten ileri olduğundan sonuç doğu boylamıdır.",
        bulletPoints: [
          "Δt = 12:00 − 09:40 = 2 saat 20 dakika",
          "20 dakika = 0.333 saat → Δt = 2.333 saat",
          "λ = 2.333 × 15° ≈ 35.0° Doğu"
        ],
        formula: {
          text: "1 saat = 15° | 1 dakika = 15′ | 1 saniye = 15″",
          description: "Zaman farkı doğrudan boylam farkına çevrilir."
        }
      }
    ],
    keyPoints: [
      "Boylam, yerel zaman ile Greenwich zamanı farkından bulunur",
      "1 saat zaman farkı = 15° boylam",
      "Yerel zaman ileri ise doğu, geri ise batı boylamı kabul edilir",
      "Zaman hatası doğrudan boylam hatasına dönüşür"
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
        image: greatCircleVsRhumb,
        imageAlt: "Rota, hız ve mesafe ilişkisini gösteren şema"
      },
      {
        title: "Ölü Hesap Mevkiinin Temeli",
        content: "Düzlem seyirde rüzgâr ve akıntı etkileri ihmal edildiğinde, geminin hareketi sabit rota ve sabit hız varsayımıyla modellenir. Bu durumda alınan mesafe, hız ile geçen zamanın çarpımıdır. Bu formül, seyirde kullanılan en temel bağıntıdır ve hızın birim zamanda alınan yol olması ilkesine dayanır.",
        image: greatCircleVsRhumb,
        imageAlt: "Ölü hesap (dead reckoning) örneği"
      },
      {
        title: "Birim Uyumu ve Zaman Üçgeni",
        content: "Hız = Mesafe ÷ Zaman ve Zaman = Mesafe ÷ Hız bağıntıları, bilinmeyen büyüklüğe göre temel formülün yeniden düzenlenmiş hâlidir. Bu üçlü bağıntı, ETA hesapları, vardiya planlaması ve yakıt tahminleri için sürekli olarak kullanılır.",
        image: greatCircleVsRhumb,
        imageAlt: "Zaman üçgeni (mesafe-hız-zaman)"
      },
      {
        title: "Temel Bağıntı",
        content: "Mesafe, hız ile geçen zamanın çarpımıdır. Aynı bağıntı bilinmeyen büyüklüğe göre düzenlenerek hız veya zaman hesabında da kullanılır.",
        image: greatCircleVsRhumb,
        imageAlt: "Mesafe-hız-zaman diyagramı",
        formula: {
          text: "Mesafe = Hız × Zaman",
          description: "Hız = Mesafe ÷ Zaman | Zaman = Mesafe ÷ Hız"
        }
      },
      {
        title: "Rüzgâr ve Akıntı Varsayımı",
        content: "Bu hesapların geçerli olabilmesi için hızın gerçekten sabit kalması gerekir. Dış etkilerin (akıntı, rüzgâr, dalga) ihmal edilemeyecek düzeyde olduğu durumlarda rota ve hız değerleri güncellenmelidir.",
        image: yonWindDrift,
        imageAlt: "Rüzgârın seyire etkisi"
      },
      {
        title: "Ölü Hesap Şeması",
        content: "Başlangıç mevkii bilinen bir gemi, belirli bir hakiki rota ve hızla hareket ettiğinde, geçen zaman sonunda ulaştığı mevki bu ilişkiyle hesaplanır.",
        image: greatCircleVsRhumb,
        imageAlt: "Ölü hesap (dead reckoning) şeması"
      },
      {
        title: "Düzgün Doğrusal Hareket Modeli",
        content: "Bu ilişkinin matematiksel temeli düzgün doğrusal harekete dayanır. Düzlem seyirde rüzgâr ve akıntı etkileri ihmal edildiğinde, geminin hareketi sabit rota ve sabit hız varsayımıyla modellenir.",
        image: greatCircleVsRhumb,
        imageAlt: "Düzgün doğrusal hareket şeması"
      },
      {
        title: "ETA ve Seyir Planlaması",
        content: "Bu üçlü bağıntı, varış zamanı (ETA) hesapları, vardiya planlaması ve yakıt tahminleri için sürekli olarak kullanılır.",
        image: greatCircleVsRhumb,
        imageAlt: "Hız ve mesafe ilişkisi görseli"
      },
      {
        title: "ETA Diyagramı",
        content: "ETA hesapları, hız ve mesafe değerlerinin sahada düzenli kontrolü ile güncellenir. Bu nedenle seyir boyunca zaman, hız ve mesafe üçgeni sürekli izlenir.",
        image: radarDisplay,
        imageAlt: "ETA ve mesafe diyagramı"
      },
      {
        title: "Seyir Günlüğü ve Kayıt",
        content: "Ölü hesap mevkiinde alınan her mesafe, seyir günlüğüne kaydedilerek güvenli takip ve geriye dönük kontrol sağlanır.",
        image: chartPlotting,
        imageAlt: "Seyir günlüğü örneği"
      },
      {
        title: "Sayısal Örnek",
        content: "Bir geminin hakiki rotası sabit kabul edilsin ve hızı 14 knot olsun. Gemi bu hızla 3,5 saat seyir yaptığında alınan mesafe 49 deniz milidir. Aynı geminin 70 deniz millik bir mesafeyi alması için gereken süre 5 saattir. Bu tür hesaplamalar, varış zamanı tahminlerinde temel alınır.",
        image: radarDisplay,
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
        image: radarDisplay,
        imageAlt: "Seyirde hız takibini gösteren speed log ekranı"
      },
      {
        title: "Makine Performansı Etkisi",
        content: "Makine torku ve güç eğrileri, geminin hızını doğrudan etkiler. Hızdaki küçük sapmalar, uzun seyirlerde önemli mesafe hatalarına dönüşebilir.",
        image: radarDisplay,
        imageAlt: "Makine torku ve hız ilişkisi"
      },
      {
        title: "Vektörel Anlam",
        content: "Rota, hız ve mesafe ilişkisi yalnızca doğrusal bir hesap değildir; vektörel bir anlam taşır. Mesafe, yönsüz bir büyüklüktür. Bu mesafe ancak belirli bir rota doğrultusunda uygulandığında geminin mevkiini değiştirir. Aynı mesafe farklı rotalarda alındığında gemi tamamen farklı bir noktaya ulaşır.",
        image: chartPlotting,
        imageAlt: "Ölü hesap (DR) çizimi"
      },
      {
        title: "Harita Üzerinde Uygulama",
        content: "Başlangıç mevkii bilinen bir geminin, belirli bir hakiki rota ve hızla belirli bir süre sonunda ulaşacağı mevki, mesafenin rota doğrultusunda harita üzerine taşınmasıyla bulunur. Bu işlemde rota açısı kadar mesafe büyüklüğü de kritik öneme sahiptir.",
        image: chartPlotting,
        imageAlt: "Paralel cetvelle rota çizimi"
      },
      {
        title: "Hata Birikimi ve Sapmalar",
        content: "Küçük hız hataları zaman uzadıkça büyük mesafe sapmalarına dönüşür. Benzer şekilde rotadaki birkaç derecelik bir hata, uzun seyirlerde geminin planlanan hattın ciddi şekilde dışına çıkmasına neden olur. Bu nedenle düzlem seyirde rota, hız ve mesafe hesapları yalnızca birer formül olarak değil, sürekli kontrol edilmesi gereken dinamik büyüklükler olarak ele alınır.",
        image: chartPlotting,
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
        image: greatCircleVsRhumb,
        imageAlt: "Zaman–mesafe–hız ilişkisini gösteren şema"
      },
      {
        title: "Birim Sistemi ve Knot",
        content: "Denizcilikte hız knot cinsinden ifade edilir ve 1 knot, saatte 1 deniz miline eşittir. Mesafe deniz mili, zaman saat olarak kullanılır. Bu birim uyumu, dönüşüm hatalarını azaltır ve hesapların doğrudan yapılmasını sağlar.",
        image: chartPlotting,
        imageAlt: "Seyir hesaplamaları için birim uyumu"
      },
      {
        title: "Birim Uyumunun Görsel Mantığı",
        content: "Birimlerin birbirine doğrudan oturması, seyirde hızlı ve hatasız hesap yapmayı mümkün kılar. Bu nedenle hızın knot olarak, mesafenin deniz mili ve zamanın saat olarak kullanılması temel standarttır.",
        image: chartPlotting,
        imageAlt: "Zaman-mesafe-hız birim uyumu"
      },
      {
        title: "Bağıntının Formülleri",
        content: "Bağıntı üç eşdeğer formülle ifade edilir. Hız, birim zamanda alınan yol olduğundan mesafe, hız ile zamanın çarpımıdır. Bilinmeyen büyüklüğe göre formül düzenlenir. Bu üç formül, ETA hesaplarının temel dayanağıdır.",
        image: radarDisplay,
        imageAlt: "Zaman-mesafe-hız formülleri",
        formula: {
          text: "Mesafe = Hız × Zaman",
          description: "Hız = Mesafe ÷ Zaman | Zaman = Mesafe ÷ Hız"
        }
      },
      {
        title: "Sayısal Örnek",
        content: "Bir geminin hızı 16 knot olsun. Gemi bu hızla 2 saat 30 dakika (2,5 saat) seyir yaptığında alınan mesafe 40 deniz milidir. Aynı geminin 100 deniz millik bir mesafeyi alması için gereken süre 6,25 saat yani 6 saat 15 dakikadır. Bu tür dönüşümler, ETA hesaplarında doğru zaman planlaması yapılabilmesi için zorunludur.",
        image: chartPlotting,
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
        image: radarDisplay,
        imageAlt: "Doppler log çalışma prensibi"
      },
      {
        title: "Hız Değişiminin Zaman Üzerindeki Etkisi",
        content: "Uzun mesafeli seyirlerde hızın yalnızca 1–2 knot düşmesi, varış zamanında saatlerce gecikmeye neden olabilir. Kısa mesafelerde yapılan hız artışları ise beklenen zaman kazancını her zaman sağlamaz. Bu nedenle hız planlaması, mesafe ve zaman birlikte değerlendirilerek yapılmalıdır.",
        image: chartPlotting,
        imageAlt: "Seyirde hız planlaması"
      },
      {
        title: "Geriye Dönük Analiz",
        content: "Seyir sonrası değerlendirmelerde, belirli bir sürede kat edilen mesafeden ortalama hız hesaplanır. Bu hız, makine performansı, deniz durumu ve akıntı etkilerinin dolaylı bir göstergesi olarak yorumlanır.",
        image: radarDisplay,
        imageAlt: "Seyir ve hız verilerinin değerlendirilmesi"
      },
      {
        title: "Vektörel Rota ve Harita Üzerinde Uygulama",
        content: "Hesaplanan mesafe yalnızca bir rota doğrultusunda harita üzerine taşındığında geminin mevkiini değiştirir. Sayısal hesapların doğru olması tek başına yeterli değildir; mesafenin doğru rota doğrultusunda uygulanması gerekir. Aksi hâlde elde edilen mevki matematiksel olarak tutarlı görünse bile fiziksel olarak yanlıştır.",
        image: chartPlotting,
        imageAlt: "Ölü hesap (DR) çizimi"
      },
      {
        title: "Rota Doğrultusu ve Mevki Aktarımı",
        content: "Hesaplanan mesafenin harita üzerinde doğru rota doğrultusunda taşınması, ölü hesap mevkiinin güvenilirliğini belirler. Bu aşamada rota açısı ve ölçüm hassasiyeti kritik önemdedir.",
        image: chartPlotting,
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
        image: yonNorthTypes,
        imageAlt: "Coğrafi kuzey kutbu ve Dünya ekseni"
      },
      {
        title: "Sabit ve Evrensel Bir Doğrultu",
        content: "Hakiki kuzey, manyetik alanlardan, gemi yapısından veya çevresel etkilerden etkilenmeyen tek ve sabit bir referans sunar. Uzun mesafeli seyirlerde ve göksel gözlemlerde bu sabitlik vazgeçilmezdir.",
        image: compassImg,
        imageAlt: "Gerçek kuzey ve yön doğrultuları"
      },
      {
        title: "Meridyenler ve Hakiki Kuzey Doğrultusu",
        content: "Harita üzerindeki her dikey meridyen çizgisi, hakiki kuzey–hakiki güney doğrultusunu temsil eder. Bu çizgiler, yön ölçümünün geometrik temelini oluşturur.",
        image: yonNorthTypes,
        imageAlt: "Kuzey referansları ve meridyenler"
      },
      {
        title: "Hakiki Yönlerin Ölçümü",
        content: "Hakiki kuzey referans alınarak ölçülen tüm yönler hakiki olarak adlandırılır. Bir doğrultu, meridyen ile yaptığı saat yönündeki açıyla ifade edilir ve bu açı 0° ile 360° arasındadır.",
        image: yonTrueBearing,
        imageAlt: "Hakiki yön ölçümü"
      },
      {
        title: "Hakiki Rota ve Hakiki Kerteriz",
        content: "Hakiki rota, geminin harita üzerinde izlediği hattın hakiki kuzeye göre yaptığı açıdır. Hakiki kerteriz ise gemiden bir hedefe olan doğrultunun hakiki kuzeye göre ölçülen açısıdır.",
        image: yonHeadingBearing,
        imageAlt: "Hakiki rota ve kerteriz ilişkisi"
      },
      {
        title: "Hakiki Kerteriz Hesap Bağıntısı",
        content: "Hakiki kerteriz, nispi gözlemin hakiki sisteme taşınmasıyla elde edilir. Nispi kerteriz sancak yönünde ölçülmüşse pozitif, iskele yönünde ölçülmüşse negatif kabul edilir. Sonuç 360°’yi aşarsa 360° çıkarılır, 0°’nin altına düşerse 360° eklenir.",
        image: yonCompassRose,
        imageAlt: "Pusula gülü ve yön sistemi",
        formula: {
          text: "Hakiki Kerteriz = Hakiki Rota + Nispi Kerteriz",
          description: "Nispi kerteriz, gemi eksenine göre ölçülen açının hakiki kuzeye taşınmasını sağlar."
        }
      },
      {
        title: "Sayısal Örnek",
        content: "Bir geminin hakiki rotası 120°T olsun. Hedef sancakta nispi 35° ile görülüyor olsun. Nispi kerteriz pozitif kabul edilir ve hakiki rotaya eklenir. Aynı durumda hedef iskele tarafından nispi 25° ile görülseydi, nispi kerteriz negatif alınırdı.",
        image: compassImg,
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
        image: chartPlotting,
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
        image: yonNorthTypes,
        imageAlt: "Manyetik kuzey kutbu ve Dünya ekseni"
      },
      {
        title: "Dünya Manyetik Alanı ve Kutup Hareketi",
        content: "Dünya manyetik alanı dinamik bir yapıya sahiptir. Yer kabuğu altındaki erimiş metallerin hareketi nedeniyle manyetik kutuplar her yıl küçük miktarlarda yer değiştirir. Bu değişim, deniz haritalarında variation ve yıllık değişim değeri olarak belirtilir.",
        image: yonNorthTypes,
        imageAlt: "Dünya manyetik alanı ve manyetik kutuplar"
      },
      {
        title: "Variation Haritaları",
        content: "Seyir hesaplarında kullanılan manyetik yönlerin doğruluğu, variation bilgisinin doğru okunmasına ve güncel yıla uyarlanmasına doğrudan bağlıdır. Haritalar üzerinde yer alan izogon çizgileri, variation değerlerinin bölgesel dağılımını gösterir.",
        image: compassImg,
        imageAlt: "Manyetik variation haritası"
      },
      {
        title: "Variation Yönü: Doğu ve Batı",
        content: "Hakiki kuzey ile manyetik kuzey arasındaki açısal fark variation olarak adlandırılır. Manyetik kuzey hakiki kuzeyin doğusunda yer alıyorsa variation doğu, batısında yer alıyorsa variation batıdır. Bu yönlendirme, hesaplamalarda işaretin doğru seçilmesi açısından belirleyicidir.",
        image: compassImg,
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
        image: yonNorthTypes,
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
        image: compassImg,
        imageAlt: "Manyetik ve hakiki rota dönüşümü",
        formula: {
          text: "Hakiki Rota = Manyetik Rota + Variation",
          description: "Variation doğu ise pozitif, batı ise negatif kabul edilir."
        }
      },
      {
        title: "Sayısal Örnek",
        content: "Variation 7° doğu ise ve geminin manyetik rotası 110°M olarak belirlenmişse, hakiki rota hesaplamasında variation manyetik rotaya eklenir. Variation 5° batı olsaydı çıkarma işlemi yapılırdı.",
        image: compassImg,
        imageAlt: "Manyetik rotadan hakiki rotaya örnek",
        bulletPoints: [
          "Hakiki Rota = 110° + 007° = 117°",
          "Variation batı olursa: Hakiki Rota = 110° − 005° = 105°"
        ]
      },
      {
        title: "Manyetik Kerteriz Bağıntısı",
        content: "Manyetik kuzey, kerteriz hesaplarında da aynı mantıkla kullanılır. Nispi kerteriz gemi eksenine göre ölçülür, manyetik kerteriz ise manyetik kuzeye göre tanımlanır.",
        image: yonRelativeBearing,
        imageAlt: "Manyetik kerteriz ve nispi kerteriz ilişkisi",
        formula: {
          text: "Manyetik Kerteriz = Manyetik Rota + Nispi Kerteriz",
          description: "Sonuç 360°'yi aşarsa 360° çıkarılır, 0°'nin altına düşerse 360° eklenir."
        }
      },
      {
        title: "Seyirde Risk ve İhmal",
        content: "Manyetik kuzeyle yapılan seyirdeki temel risk, variation bilgisinin ihmal edilmesidir. Küçük görünen birkaç derecelik bir hata, uzun mesafelerde ciddi mevki sapmalarına dönüşür. Bu nedenle manyetik pusuladan elde edilen her yön bilgisi variation düzeltilmeden harita üzerinde kullanılmamalıdır.",
        image: compassImg,
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
        image: mercatorProjection,
        imageAlt: "Clarke 1866, WGS-84 ve GRS80 datum karşılaştırması"
      },
      {
        title: "Chart Datum ve Gelgit Referansları",
        content: "Deniz haritalarında derinlikler belirli bir referans su seviyesine (chart datum) göre verilir. Bu referans, gelgit düzeyleriyle ilişkilidir ve harita kenarındaki datum notlarında belirtilir. Gelgit referansları doğru anlaşılmadan yapılan sığlık ve emniyet hesabı ciddi risk doğurabilir.",
        image: tideCurrent,
        imageAlt: "Gelgit seviyeleri ve chart datum ilişkisi"
      },
      {
        title: "Yatay ve Düşey Datum Ayrımı",
        content: "Datum kavramı yalnızca yatay koordinatları değil, düşey ölçümleri de etkiler. Yükseklikler ve derinlikler farklı düşey datumlara bağlıdır. Harita üzerinde verilen yükseklik ve derinliklerin hangi referansa göre ölçüldüğü net biçimde okunmalıdır.",
        image: tideCurrent,
        imageAlt: "Yatay ve düşey datumların gösterimi"
      },
      {
        title: "Harita Kenar Bilgilerinde Datum Notları",
        content: "Datum bilgisi harita kenarında açıkça belirtilir. Bazı haritalarda datum dönüşümü için yön ve mesafe düzeltmeleri verilir. Bu notlar uygulanmadığında, GPS’ten alınan mevki harita üzerinde yanlış konuma taşınır.",
        image: mercatorProjection,
        imageAlt: "Harita kenarında datum bilgisi örneği"
      },
      {
        title: "Nautical Chart Datum Blok Örneği",
        content: "Nautical chart datum blokları, haritanın hangi datum’a göre hazırlandığını ve varsa dönüşüm notlarını gösterir. Harita kenarındaki bu blok, datum uyumluluğunu kontrol etmek için ilk bakılması gereken yerdir.",
        image: mercatorProjection,
        imageAlt: "Nautical chart datum blok örneği"
      },
      {
        title: "Datum Uyuşmazlığının Seyre Etkisi",
        content: "Datum uyuşmazlığı özellikle kıyıya yakın seyirlerde ve dar sularda kritik hâle gelir. Gerçek mevki ile harita üzerinde işaretlenen mevki arasında onlarca hatta yüzlerce metre fark oluşabilir. Açık denizde fark küçük görünse de liman girişleri ve sığ sularda bu sapma tehlike doğurur.",
        image: mercatorProjection,
        imageAlt: "Datum uyuşmazlığı kaynaklı konum sapması örneği"
      },
      {
        title: "GPS Datum Ayarı ve Dönüşüm Uygulamaları",
        content: "GPS alıcıları datum ayarı sunar. Harita datum’u WGS-84 ise GPS de aynı datum’a ayarlanmalıdır. Farklı datum kullanılan haritalarda, harita üzerinde belirtilen düzeltme değerleri dikkatle uygulanmalıdır.",
        image: mercatorProjection,
        imageAlt: "GPS datum ayarı ve harita mevki düzeltmesi örneği"
      },
      {
        title: "Dönüşüm Notları ve Emniyetli Uygulama",
        content: "Bazı haritalarda datum dönüşüm notları doğu–batı ve kuzey–güney yönlerinde metre cinsinden verilir. Bu düzeltmeler uygulanmadığında mevki işaretleme hatası kaçınılmaz hâle gelir. Datum bilgisi, seyir emniyetinin temel yapı taşlarından biridir.",
        image: mercatorProjection,
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
  "Büyük daire kavramı": {
    title: "Büyük Daire Kavramı",
    introduction:
      "Büyük daire, küre şeklindeki Dünya üzerinde merkezden geçen bir düzlemin yüzeyi kestiği çemberdir. Bu çemberin düzlemi Dünya merkezinden geçtiği için elde edilen yaylar, küre üzerindeki iki nokta arasındaki **en kısa mesafeyi** temsil eder.",
    sections: [
      {
        title: "Tanım ve Temel Geometri",
        content: `Büyük daire, Dünya merkezinden geçen bir düzlemin küre yüzeyiyle oluşturduğu çemberdir. Ekvator ve tüm meridyenler büyük daire örnekleridir; diğer enlemler ise merkezden geçmedikleri için küçük daire niteliğindedir.

![Büyük daire kavramı](https://www.caliper.com/glossary/xmaptitude-great-circle-map.jpg.pagespeed.ic.ho-3Oj1XIA.jpg)

![Büyük daire, eksen ve kutuplar](https://upload.wikimedia.org/wikipedia/commons/4/46/Great_circle%2C_axis%2C_and_poles.svg)`
      },
      {
        title: "Seyirde En Kısa Yol İlkesi",
        content: `İki mevki arasındaki en kısa küresel yol büyük daire yayıdır. Bu özellik, enerji tüketimi ve zaman açısından avantaj sağlar. Ancak büyük daire rotası sabit kurs vermez; seyir boyunca gerçek pusula kursu sürekli değişir. Bu durum dümen tutma, trafik yoğunluğu, meteorolojik şartlar ve operasyonel emniyet açısından kısıtlar yaratır.

![Büyük daire ve rhumb line karşılaştırması](https://www.kavas.com/storage/media/wysiwyg/blog/great_circle-vs-rhumb_line.jpg)`
      },
      {
        title: "Teorik-Pratik İlişki",
        content: `Büyük daire seyri tamamen küresel trigonometriye dayanır ve hesaplamalar Dünya’nın küreye yakın kabul edildiği varsayımıyla yapılır. Elipsoidal farklar uzun mesafelerde küçük sapmalar doğursa da klasik denizcilik hesaplarında ihmal edilir.

Bu nedenle büyük daire kavramı tek başına bir seyir yöntemi değil, rota planlamasında referans alınan geometrik bir ilkedir. Pratik uygulamada rhumb line veya composite rota ile birlikte değerlendirilir.

────────────
**Büyük Daire Tanım İlişkileri ve Temel İfade**

Merkezden geçen düzlem → Büyük daire  
Merkezden geçmeyen düzlem → Küçük daire

İki mevki arasındaki en kısa küresel yol → Büyük daire yayı
────────────`
      },
      {
        title: "Sayısal Açıklayıcı Örnek",
        content: `A noktasının enlemi 40° Kuzey, B noktasının enlemi 40° Kuzey olsun ve boylam farkı 60° olsun. Aynı enlem üzerinde seyir yapılırsa rota küçük daire olur ve mesafe artar. Aynı iki nokta arasında büyük daire yayı hesaplandığında rota kuzeye ve güneye saparak ilerler ve toplam mesafe azalır.

Bu fark orta enlemlerde sınırlı, yüksek enlemlerde ise belirgin hâle gelir. Özellikle 50° ve üzeri enlemlerde büyük daire ile rhumb line arasındaki mesafe farkı ticari açıdan anlamlı seviyelere ulaşır.`
      }
    ],
    keyPoints: [
      "Büyük daire, Dünya merkezinden geçen düzlemin oluşturduğu en büyük çemberdir",
      "İki mevki arasındaki en kısa küresel yol büyük daire yayıdır",
      "Büyük daire rotası sabit kurs vermez; kurs seyir boyunca değişir",
      "Pratik uygulamada meteoroloji, trafik ve emniyet kısıtlarıyla birlikte değerlendirilir",
      "Orta enlemlerde fark sınırlı, yüksek enlemlerde ise belirginleşir"
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
        content: `Rhumb line (loxodrom), küre üzerindeki tüm meridyenleri **sabit bir açıyla** kesen ve seyir boyunca **sabit kurs** veren bir eğridir. Mercator projeksiyonunda düz bir doğru olarak görünmesi, pratik seyirde büyük kolaylık sağlar.

![Loxodrome örneği](https://upload.wikimedia.org/wikipedia/commons/d/d6/Loxodrome.png)

![Büyük daire ve rhumb line görünümü](https://www.mathworks.com/help/map/tutor4.png)

![Büyük daire vs rhumb line](https://www.kavas.com/storage/media/wysiwyg/blog/great_circle-vs-rhumb_line.jpg)

────────────  
**Rhumb Line Temel Geometrik Özelliği**  
Meridyenlerle yapılan açı = **sabit**  
Kurs değişimi = **yok**  
Mesafe = **büyük daireye göre daha uzun**  
────────────

**Rhumb line mesafesi ve kurs bağıntıları**

▭ **tan C = Δλ / Δψ**  
Burada **Δλ** boylam farkı, **Δψ** izometrik enlem farkıdır. Mercator projeksiyonunda izometrik enlem:

▭ **ψ = ln [ tan (45° + φ/2) ]**

Mesafe için pratik ilişki:

▭ **Mesafe = Δφ / cos C × 60**  
(Δφ derece cinsinden enlem farkı; sonuç deniz mili)

**Tam çözümlü örnek (orta enlem yaklaşımı)**

**Başlangıç:** φ₁ = 20° N, λ₁ = 010° W  
**Varış:** φ₂ = 40° N, λ₂ = 030° E

▭ Δφ = 40° − 20° = 20°  
▭ Δλ = 10° + 30° = 40°  
▭ Ortalama enlem ≈ 30° → cos 30° ≈ 0.866

Kurs:  
▭ tan C = Δλ / Δφ = 40 / 20 = 2  
▭ **C ≈ 63.4°**

Mesafe:  
▭ cos 63.4° ≈ 0.447  
▭ **Mesafe ≈ (20 / 0.447) × 60 ≈ 2682 deniz mili**

Bu değer sabit kurslu rhumb line mesafesidir; büyük daire mesafesi aynı iki mevki arasında daha kısa çıkar.`
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
  "GPS doğruluğu": {
    title: "GPS Doğruluğu",
    introduction:
      "GPS doğruluğu, hesaplanan konumun gerçek konuma ne kadar yakın olduğunu ifade eder ve denizcilikte seyir emniyetini doğrudan etkiler. Doğruluk; uydu saat hataları, alıcı saat hatası, iyonosfer ve troposfer gecikmeleri, çok yollu sinyal yayılımı ve uydu geometrisi gibi birden fazla etkenin toplam etkisidir. Bu hataların her biri küçük görünse de özellikle dar sular ve kıyı seyrinde toplam etki kritik hale gelir.",
    sections: [
      {
        title: "Doğruluğu Belirleyen Hata Kaynakları",
        content:
          "GPS alıcısında oluşan toplam konum hatası, farklı hata bileşenlerinin birleşimidir. Uydu saat ve yörünge hataları, atmosferik gecikmeler (iyonosfer/troposfer), alıcı saat hatası, çok yollu (multipath) yansıma ve alıcı gürültüsü toplam hatayı büyütür. Uydu geometrisinin zayıf olduğu anlarda (yüksek DOP) aynı hata büyüklüğü konumda daha büyük sapma üretir.",
        image: gpsSatellites,
        imageAlt: "Multipath kaynaklı GPS hata oluşumu"
      },
      {
        title: "Uydu Geometrisi ve DOP Etkisi",
        content:
          "Uydu geometrisi, hesaplanan konum hatasının büyüklüğünü doğrudan etkiler. HDOP değeri küçüldükçe yatay hata azalır; büyüdükçe hata elipsi genişler. Bu nedenle aynı UERE değeri, farklı HDOP koşullarında farklı doğruluk seviyeleri üretir.",
        image:
          "https://www.researchgate.net/publication/335127650/figure/fig5/AS%3A791127594655751%401565630925940/Error-ellipses-calculated-using-DOP-analysis-procedureThe-orientations-of-the-error.png",
        imageAlt: "DOP analiziyle hata elipsleri ve yönelim"
      },
      {
        title: "Tipik Doğruluk Seviyeleri",
        content:
          "Sivil GPS alıcılarında yatay doğruluk genellikle metre mertebesindedir. Açık denizde bu seviye çoğu zaman yeterlidir; ancak liman yaklaşmaları ve manevra sahalarında aynı doğruluk seviyesi operasyonel risk oluşturabilir. Bu nedenle denizcilikte DGPS/SBAS destekli sistemler, radar mesafeleri ve görsel mevki tayini gibi doğrulama yöntemleri birlikte kullanılır.",
        image: gpsSatellites,
        imageAlt: "GPS doğruluk dağılımı ve hata yüzdeleri"
      },
      {
        title: "Temel Formüller",
        content:
          "GPS doğruluğu çoğunlukla istatistiksel bir kavramdır. Konum hatası sabit bir değer değildir; zamana bağlı olarak değişir ve belirli bir olasılık dağılımı gösterir. Bu nedenle doğruluk, çoğu zaman belirli bir güven aralığı içinde ifade edilir.",
        bulletPoints: [
          "Toplam hata = √(Uydu hatası² + Saat hatası² + Atmosfer hatası² + Çok yollu hata² + Gürültü²)",
          "Yatay hata ≈ HDOP × UERE",
          "HDOP: Yatay geometrik seyreltme katsayısı",
          "UERE: Eşdeğer kullanıcı mesafe hatası"
        ]
      },
      {
        title: "Örnek Hesap",
        content: `Bir gemide kullanılan GPS alıcısı için aşağıdaki değerler verilmiştir:

UERE = 5 m  
HDOP = 1,8

Adım 1: Yatay hata formülünün yazılması  
Yatay hata = HDOP × UERE

Adım 2: Sayısal değerlerin yerine konması  
Yatay hata = 1,8 × 5

Adım 3: Sonucun hesaplanması  
Yatay hata = 9 m

Bu sonuç, geminin hesaplanan konumunun gerçek konumdan yaklaşık 9 metre sapabileceğini gösterir. Açık denizde bu hata kabul edilebilirken, dar bir kanalda veya yanaşma manevrasında emniyet payını ciddi biçimde azaltır.`,
        image:
          "https://www.researchgate.net/publication/275594171/figure/fig2/AS%3A375689560772609%401466582779334/Comparison-of-DGPS-based-KODGIS-NAWGIS-and-embedded-GPS-receiver-positioning-accuracy.png",
        imageAlt: "GPS doğruluk karşılaştırması grafiği"
      },
      {
        title: "Operasyonel Değerlendirme",
        content:
          "GPS doğruluğu tek başına yeterli görülmemelidir. Radar mesafeleri, görsel mevki tayini ve ECDIS alarm limitleri ile birlikte değerlendirilerek emniyetli seyir sağlanır."
      }
    ],
    keyPoints: [
      "GPS doğruluğu, uydu saatleri, atmosfer, multipath ve geometri gibi çoklu hata kaynaklarının toplam etkisine bağlıdır.",
      "HDOP küçüldükçe yatay hata azalır; büyüdükçe hata elipsi genişler.",
      "Yatay hata, pratikte HDOP × UERE yaklaşımıyla değerlendirilir.",
      "Metre seviyesindeki doğruluk açık denizde yeterli olabilir; dar sularda risk oluşturabilir.",
      "GPS verisi radar, görsel mevki ve ECDIS alarmlarıyla birlikte kullanılmalıdır."
    ]
  },
  "Composite (bileşik) rota": {
    title: "Composite (bileşik) rota",
    introduction:
      "Composite rota, büyük daire seyrinin mesafe avantajını, rhumb line seyrinin operasyonel kolaylığıyla birleştiren karma bir rota planlama yöntemidir. Planlama büyük daire prensibine göre yapılır; ancak belirli bir **sınırlayıcı enlem**in ötesine çıkılmadan, orta kısımda sabit enlem boyunca rhumb line segmenti uygulanır. Böylece yüksek enlemlerde ortaya çıkan aşırı kurs değişimleri ve operasyonel riskler kontrol altına alınır.",
    sections: [
      {
        title: "Genel Mantık",
        content: `Büyük daire seyrinde rota genellikle yüksek enlemlere doğru kavis yapar. Bu durum kış şartlarında, buz riski bulunan bölgelerde veya geminin operasyonel sınırlarının zorlandığı durumlarda pratik değildir. Composite rota, büyük daireye göre **daha güvenli ve öngörülebilir** bir alternatif üretir: büyük daireye girilir, sınırlayıcı enleme ulaşmadan önce rota terk edilir, sabit enlem boyunca ilerlenir ve uygun noktada tekrar büyük daireye bağlanılır.

![Composite rota şeması](https://www.researchgate.net/publication/352001267/figure/fig3/AS%3A11431281417326427%401746106806144/Elements-of-composite-great-circle-navigation.tif)

![Great circle ve composite rota karşılaştırması](https://www.marinepublic.com/_next/image?q=75&url=https%3A%2F%2Fik.imagekit.io%2Fh53vszdxp%2Fillustration_Great_Circle_and_Composite_GC_comparison_fxcf5a.jpg&w=3840)`
      },
      {
        title: "Rota Bileşenleri",
        content: `Composite rota üç temel parçadan oluşur:

1) **Başlangıç → sınırlayıcı enlem:** Büyük daire yayı  
2) **Sınırlayıcı enlem boyunca:** Sabit enlemde rhumb line  
3) **Sınırlayıcı enlem → varış:** İkinci büyük daire yayı

Her parça ayrı hesaplanır; toplam mesafe, bu parçaların toplamıdır.`
      },
      {
        title: "Sınırlayıcı Enlem (Limit Enlem) Kavramı",
        content:
          "Sınırlayıcı enlem, geminin çıkmasına izin verilen maksimum enlemdir. Bu değer; mevsim, meteoroloji, buz durumu, gemi tipi ve ticari gerekliliklere bağlı olarak belirlenir. Matematiksel olarak bu enlem, büyük daire rotasının maksimum enlemi (vertex) ile karşılaştırılarak seçilir.",
        formula: {
          text: "sin φmax = |sin C₁| × cos φ₁",
          description: "φmax: büyük dairenin ulaştığı maksimum enlem, C₁: büyük daire başlangıç kursu, φ₁: başlangıç enlemi."
        }
      },
      {
        title: "Tam Çözümlü Örnek",
        content: `**Başlangıç mevkii:**  
Enlem φ₁ = 35° Kuzey  
Boylam λ₁ = 020° Batı  

**Varış mevkii:**  
Enlem φ₂ = 40° Kuzey  
Boylam λ₂ = 060° Doğu  

**Büyük daire başlangıç kursu (verilmiş):**  
C₁ ≈ 045°

**Maksimum enlem hesabı:**  
sin φmax = |sin 45°| × cos 35°  
sin 45° ≈ 0.707  
cos 35° ≈ 0.819  
sin φmax ≈ 0.707 × 0.819 ≈ 0.579  
φmax ≈ arcsin 0.579 ≈ **35.4° Kuzey**

Bu örnekte büyük daire rotası yüksek enlemlere çıkmamaktadır. Ancak φmax değeri örneğin **55° Kuzey** olsaydı ve operasyonel sınır **50° Kuzey** olarak belirlenseydi, **50° Kuzey** sınırlayıcı enlem alınarak composite rota uygulanacaktı.`
      },
      {
        title: "Operasyonel Değerlendirme",
        content: `Composite rota, büyük daireye göre biraz daha uzun mesafe doğurur; ancak **emniyet**, **rota takibi** ve **operasyonel öngörülebilirlik** açısından ticari denizcilikte dengeli bir çözümdür. Özellikle **Kuzey Atlantik** ve **Kuzey Pasifik** geçişlerinde standart uygulama niteliğindedir.`
      }
    ],
    keyPoints: [
      "Composite rota: büyük daire + sabit enlem rhumb line + büyük daire kombinasyonudur.",
      "Amaç; mesafeyi makul düzeyde kısa tutarken yüksek enlem risklerini sınırlamaktır.",
      "Sınırlayıcı enlem; meteoroloji, buz ve operasyonel sınırlar üzerinden belirlenir.",
      "Her parça ayrı hesaplanır ve toplam mesafe parçaların toplamıdır."
    ]
  },
  "Mercator – rhumb line ilişkisi": {
    title: "Mercator – Rhumb Line İlişkisi",
    introduction:
      "Mercator projeksiyonu, küresel Dünya yüzeyinin silindirik bir yüzeye açılması esasına dayanır ve denizcilikte rhumb line (loxodrome) seyrinin temelini oluşturur. Meridyenler dikey ve birbirine paralel, paraleller ise yatay doğrular olarak gösterilir. Enlem arttıkça paraleller arası mesafe büyür ve kutuplara yaklaştıkça sonsuza gider. Bu bilinçli bozulma, **sabit kursla seyri** harita üzerinde düz çizgi hâline getirir.",
    sections: [
      {
        title: "Rhumb Line’ın Mercator’da Düz Görünmesi",
        content: `Rhumb line, küre üzerinde meridyenleri **sabit açıyla kesen** bir eğridir. Mercator projeksiyonu açısal doğruluğu koruduğu için bu eğri harita üzerinde **tam olarak düz bir doğru** gibi görünür. Bu sayede denizci, sabit kursla seyir yapan geminin rotasını harita üzerinde cetvelle tek hamlede çizebilir.

Büyük daire ise küre üzerindeki **en kısa yol** olmasına rağmen Mercator haritasında eğri olarak görünür; yalnızca ekvator ve meridyenler düz çizgi hâlindedir.

![Mercator haritasında rhumb line](https://www.researchgate.net/publication/268872013/figure/fig3/AS%3A392212723585029%401470522208424/The-Mercator-map-projection-The-rhumb-lines-show-as-straight-lines.png)

![Büyük daire ve rhumb line karşılaştırması](https://mapscaping.com/wp-content/uploads/2024/09/image-684.png)

![Mercator projeksiyonda alan bozulması](https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Mercator_projection_Square.JPG/1280px-Mercator_projection_Square.JPG)`
      },
      {
        title: "Temel İlişkiler (Özet)",
        content: `Rhumb line kürede → **eğri**  
Rhumb line Mercator’da → **düz doğru**

Büyük daire kürede → **en kısa yol**  
Büyük daire Mercator’da → **eğri**

Mercator projeksiyonunun bu avantajı, **alan ve mesafe bozulmalarının** enlemle hızla büyümesi karşılığında elde edilir. Bu nedenle Mercator haritada ölçülen mesafeler doğrudan gerçek mesafeyi vermez; yalnızca **enlem skalası** üzerinden okunmalıdır.`
      },
      {
        title: "İzometrik Enlem (Mercator Enlemi)",
        content: `Mercator projeksiyonunda enlemler arası açılma **izometrik enlem** ile ifade edilir. Rhumb line hesaplarının temel büyüklüğü bu dönüşümdür:

────────────  
**ψ = ln [ tan (45° + φ / 2) ]**  
────────────

Burada **ψ**, Mercator enlemi; **φ** ise küresel enlemdir. Bu dönüşüm, enlemlerin harita üzerindeki gerçek yerlerini temsil eder.`
      },
      {
        title: "Tam Çözümlü Örnek (Rhumb Line Kursu)",
        content: `**Başlangıç mevkii:**  
φ₁ = 15° N, λ₁ = 005° E

**Varış mevkii:**  
φ₂ = 45° N, λ₂ = 035° E

**1) İzometrik enlemler**

ψ₁ = ln [ tan (45° + 15° / 2) ]  
ψ₁ = ln [ tan 52.5° ] ≈ ln (1.279) ≈ 0.246

ψ₂ = ln [ tan (45° + 45° / 2) ]  
ψ₂ = ln [ tan 67.5° ] ≈ ln (2.414) ≈ 0.881

Δψ = 0.881 − 0.246 = **0.635**

**2) Boylam farkı (radyan)**  
Δλ = 35° − 5° = 30° = **0.5236 rad**

**3) Rhumb line kursu**

tan C = Δλ / Δψ  
tan C ≈ 0.5236 / 0.635 ≈ 0.825  
**C ≈ 39.4°**

Bu örnek, Mercator projeksiyonunda kurs hesaplarının **izometrik enlem** üzerinden yapıldığını ve **Δλ’nin radyan** alınması gerektiğini açıkça gösterir.`
      }
    ],
    keyPoints: [
      "Rhumb line, Mercator’da düz çizgi görünür; bu, sabit kursla seyri harita üzerinde pratikleştirir.",
      "Büyük daire en kısa yol olmasına rağmen Mercator’da eğri görünür.",
      "Mercator projeksiyonu açıları korur; alan ve mesafe bozulmaları enlemle büyür.",
      "Rhumb line kursu, izometrik enlem (ψ) farkı kullanılarak hesaplanır."
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
  "Büyük daire geometrisi": {
    title: "Büyük Daire Geometrisi",
    introduction:
      "Büyük daire geometrisi, Dünya’nın küresel kabulü altında küresel trigonometri esaslarına dayanır. İki mevki arasındaki büyük daire yayı, Dünya merkezinden geçen bir düzlemin küreyi kesmesiyle oluşur. Bu düzlem, başlangıç ve varış mevkileri ile Dünya merkezini içeren tekil bir düzlemdir. Seyir problemleri bu nedenle küresel üçgenler üzerinden çözülür.",
    sections: [
      {
        title: "Büyük Daire ve Küresel Üçgen",
        content: `Küresel üçgen, kenarları büyük daire yaylarından oluşan ve köşeleri küre yüzeyinde bulunan geometrik yapıdır. Denizcilikte kullanılan temel küresel üçgen, **Kuzey Kutbu – başlangıç mevkii – varış mevkii** köşeleriyle kurulur. Bu üçgende kenarlar enlemlerin tamamlayıcıları ve boylam farkı ile ifade edilir; açılar ise büyük daire başlangıç kursu ve bitiş kursu gibi seyirle doğrudan ilişkili büyüklüklerdir.

![Büyük daire üçgeni](https://www.researchgate.net/publication/307477485/figure/fig4/AS%3A401098465660931%401472640734814/Spherical-triangle-for-Great-circle-computations.png)

![Küresel üçgen ve kutup ilişkisi](https://www.onboardintelligence.com/CelestialNav/Images/astro6.gif)

![Büyük daire, eksen ve kutuplar](https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Great_circle%2C_axis%2C_and_poles.svg/1280px-Great_circle%2C_axis%2C_and_poles.svg.png)`
      },
      {
        title: "Temel Küresel Geometri İlişkileri",
        content: `Meridyen yayı = 90° − enlem  
Boylam farkı = Δλ

Merkez açı **d** derece cinsinden bulunduğunda, deniz mili karşılığı doğrudan hesaplanabilir:  
**Büyük daire mesafesi = d × 60 deniz mili**.`,
        formula: {
          text: "cos d = sin φ₁ · sin φ₂ + cos φ₁ · cos φ₂ · cos Δλ",
          description: "d merkez açı, φ₁–φ₂ enlemler, Δλ boylam farkıdır."
        }
      },
      {
        title: "Kurs Geometrisi ve Başlangıç Kursu",
        content:
          "Büyük daire seyri boyunca kurs sabit değildir. Bunun geometrik nedeni, büyük daire yayının meridyenleri farklı açılarla kesmesidir. Yalnızca ekvator ve meridyenler meridyenlerle sabit açı yapar. Diğer tüm büyük daireler seyir ilerledikçe gerçek kurs değişimine neden olur.",
        formula: {
          text: "sin C₁ = (cos φ₂ · sin Δλ) / sin d",
          description: "C₁ başlangıç kursudur."
        }
      },
      {
        title: "Tam Çözümlü Örnek",
        content: `**Başlangıç mevkii:** φ₁ = 30° N, λ₁ = 020° E  
**Varış mevkii:** φ₂ = 50° N, λ₂ = 060° E  
**Boylam farkı:** Δλ = 60° − 20° = 40°

Kosinüs teoremi uygulanır:

cos d = sin 30° · sin 50° + cos 30° · cos 50° · cos 40°

Yaklaşık trigonometrik değerler:  
sin 30° = 0.500  
sin 50° ≈ 0.766  
cos 30° ≈ 0.866  
cos 50° ≈ 0.643  
cos 40° ≈ 0.766

cos d = (0.500 × 0.766) + (0.866 × 0.643 × 0.766)  
cos d = 0.383 + 0.426  
cos d ≈ 0.809

Merkez açı: d ≈ arccos 0.809 ≈ 36°

**Büyük daire mesafesi:** 36° × 60 = **2160 deniz mili**

Bu hesaplama, büyük daire geometrisinin küresel üçgen esasına dayandığını ve düzlem trigonometriyle çözülemeyeceğini açık biçimde gösterir.`
      }
    ],
    keyPoints: [
      "Büyük daire yayı, Dünya merkezinden geçen tek düzlemin küreyi kesmesiyle oluşur.",
      "Küresel üçgen, büyük daire seyir hesaplarının temel geometrik yapısıdır.",
      "Kurs sabit değildir; meridyenleri farklı açılarla kestiği için rota boyunca değişir.",
      "Merkez açı, büyük daire mesafesinin doğrudan karşılığıdır."
    ]
  },
  "Büyük daire başlangıç kursu": {
    title: "Büyük Daire Başlangıç Kursu",
    introduction:
      "Büyük daire başlangıç kursu, geminin başlangıç mevkiinden büyük daire rotasına girdiği andaki **gerçek pusula doğrultusudur**. Büyük daire seyri boyunca kurs sabit olmadığından, pratik seyirde hesaplanan bu değer yalnızca başlangıç anı için geçerlidir. Kursun seyir ilerledikçe değişmesinin nedeni, büyük daire yayının meridyenleri farklı açılarla kesmesidir.",
    sections: [
      {
        title: "Küresel Üçgen Yaklaşımı",
        content: `Başlangıç kursu hesabı, Kuzey Kutbu, başlangıç mevkii ve varış mevkiinden oluşan küresel üçgenin çözümüne dayanır. Bu üçgende başlangıç noktasındaki açı, büyük daire başlangıç kursunu verir. Hesaplama tamamen küresel trigonometri esaslıdır ve düzlem seyir bağıntıları bu problemde geçerli değildir.

![Büyük daire başlangıç kursu görseli](https://thenauticalsite.in/NauticalNotes/TerresNav/MyTerrNav-Lesson06-Sailings_files/image039.jpg)

![Küresel üçgen şeması](https://www.nosco.ch/mathematics/inc/img/sphericaltriangle.png)`
      },
      {
        title: "Temel Bağıntılar",
        content: `Önce merkez açı **d** hesaplanır:

cos d = sin φ₁ · sin φ₂ + cos φ₁ · cos φ₂ · cos Δλ

Ardından başlangıç kursu **C₁** için:

sin C₁ = (cos φ₂ · sin Δλ) / sin d  
cos C₁ = (sin φ₂ − sin φ₁ · cos d) / (cos φ₁ · sin d)

C₁ açısı, sin ve cos değerleri birlikte değerlendirilerek doğru kadranda bulunur. Boylam farkının doğu ya da batı yönlü olması, kursun doğuya veya batıya açılmasını belirler.`,
        formula: {
          text: "sin C₁ = (cos φ₂ · sin Δλ) / sin d",
          description: "C₁ başlangıç kursu, d merkez açı, φ₁–φ₂ enlemler, Δλ boylam farkıdır."
        }
      },
      {
        title: "Büyük Daire – Rhumb Line Karşılaştırması",
        content: `Büyük dairede kurs sürekli değişirken, rhumb line (loxodrome) rota boyunca sabit kurs verir. Bu nedenle büyük daire hesapları, sadece başlangıç kursu için kesin değer üretir; seyir ilerledikçe rota yeni değerlere sapar.

![Büyük daire ve rhumb line karşılaştırması](https://www.kavas.com/storage/media/wysiwyg/blog/great_circle-vs-rhumb_line-02.jpg)`
      },
      {
        title: "Tam Çözümlü Örnek",
        content: `**Başlangıç mevkii:**  
Enlem φ₁ = 25° Kuzey  
Boylam λ₁ = 010° Doğu

**Varış mevkii:**  
Enlem φ₂ = 55° Kuzey  
Boylam λ₂ = 070° Doğu

**Boylam farkı:**  
Δλ = 70° − 10° = 60°

**Merkez açı:**

sin 25° ≈ 0.423  
sin 55° ≈ 0.819  
cos 25° ≈ 0.906  
cos 55° ≈ 0.574  
cos 60° = 0.500

cos d = (0.423 × 0.819) + (0.906 × 0.574 × 0.500)  
cos d = 0.346 + 0.260  
cos d ≈ 0.606  
d ≈ arccos 0.606 ≈ 52.6°

sin d ≈ sin 52.6° ≈ 0.795

**Başlangıç kursu:**

sin C₁ = (0.574 × sin 60°) / 0.795  
sin 60° ≈ 0.866  
sin C₁ ≈ 0.625

cos C₁ = (0.819 − 0.423 × 0.606) / (0.906 × 0.795)  
cos C₁ ≈ 0.782

Bu değerlere göre:

**C₁ ≈ 39°**

Başlangıç kursu yaklaşık **039° gerçek** kurstur. Seyir ilerledikçe bu kurs değişir, orta noktalarda maksimum sapmaya ulaşır ve varışa doğru farklı bir değere döner.`
      }
    ],
    keyPoints: [
      "Başlangıç kursu, büyük daire rotasına giriş anındaki gerçek kurstur.",
      "Hesaplama küresel üçgene dayanır; düzlem seyir bağıntıları geçerli değildir.",
      "Meridyenleri farklı açılarla kesmesi nedeniyle kurs seyir boyunca değişir.",
      "C₁ değeri sin ve cos birlikte değerlendirilerek doğru kadranda bulunur."
    ]
  },
  "Büyük daire mesafesi": {
    title: "Büyük Daire Mesafesi Hesaplamaları",
    introduction: "Büyük daire mesafesi, küre üzerindeki iki mevki arasındaki büyük daire yayı uzunluğudur ve Dünya merkezinden bakıldığında oluşan merkez açı ile doğrudan ilişkilidir. Denizcilikte pratik kabul, Dünya çevresinin 360 dereceye bölünmesi ve her bir derecenin 60 deniz miline karşılık gelmesidir. Bu nedenle mesafe hesabının özü, merkez açıyı doğru ve güvenilir biçimde bulmaktır.",
    sections: [
      {
        title: "Büyük Daire Mesafesinin Geometrisi",
        content: `Büyük daire mesafesi, küre üzerindeki iki mevkii birleştiren **en kısa yüzey yoludur**. Bu mesafe, Dünya merkezinde görülen **merkez açı** ile tanımlanır. Merkez açı büyüdükçe büyük daire yayı doğrusal olarak uzar.

![Büyük daire mesafesi görseli](https://astrolabesailing.com/wp-content/uploads/2014/10/distances.jpg?w=396)

![Merkez açı diyagramı](https://study.com/cimages/multimages/16/central_angle_diagram_22020434325126197092.png)`
      },
      {
        title: "Merkez Açı Formülü (Küresel Kosinüs)",
        content: `Büyük daire mesafesi düzlem trigonometrisiyle hesaplanamaz. Enlem ve boylam farkları yalnızca **küresel trigonometrinin** içinde anlam kazanır. Bu nedenle ilk adım, iki mevki arasındaki merkez açıyı doğru bulmaktır. Küresel kosinüs teoremi, merkez açıyı doğrudan verir:

![Büyük daire vs rhumb line](https://www.kavas.com/storage/media/wysiwyg/blog/great_circle-vs-rhumb_line.jpg)`,
        formula: {
          text: "cos θ = sin φ₁ · sin φ₂ + cos φ₁ · cos φ₂ · cos Δλ",
          description: "θ merkez açı, φ₁–φ₂ enlemler, Δλ boylam farkıdır."
        }
      },
      {
        title: "Merkez Açıdan Mesafeye Geçiş",
        content: "Merkez açı hesaplandıktan sonra mesafe doğrudan yay uzunluğuna çevrilir. Denizcilikte standart kabul: **1° büyük daire yayı = 60 deniz mili**. Böylece bulunan merkez açı, büyük daire mesafesinin doğrudan karşılığıdır.",
        formula: {
          text: "Büyük daire mesafesi (nm) = θ × 60",
          description: "θ derece cinsinden merkez açıdır."
        }
      },
      {
        title: "Örnek Hesap (Adım Adım)",
        content: `Başlangıç mevkii:  
**Enlem φ₁ = 10° Kuzey**  
**Boylam λ₁ = 030° Batı**

Varış mevkii:  
**Enlem φ₂ = 40° Kuzey**  
**Boylam λ₂ = 020° Doğu**

Boylam farkı:  
Δλ = 30° + 20° = **50°**

Yaklaşık trigonometrik değerler:  
sin 10° ≈ 0.174, sin 40° ≈ 0.643  
cos 10° ≈ 0.985, cos 40° ≈ 0.766  
cos 50° ≈ 0.643

Formüle yerleştirme:  
cos θ = (0.174 × 0.643) + (0.985 × 0.766 × 0.643)  
cos θ = 0.112 + 0.484  
cos θ ≈ 0.596

Merkez açı:  
θ ≈ arccos 0.596 ≈ **53.4°**

Büyük daire mesafesi:  
53.4 × 60 ≈ **3204 deniz mili**

Bu değer, iki mevki arasındaki **teorik en kısa deniz yolunu** temsil eder. Rhumb line seyirde mesafe daha uzun çıkar ve fark özellikle orta–yüksek enlemlerde belirginleşir.`
      }
    ],
    keyPoints: [
      "Büyük daire, küre üzerindeki iki nokta arasındaki en kısa yüzey yoludur.",
      "Mesafe hesabının özü merkez açının bulunmasına dayanır.",
      "Küresel kosinüs teoremi, merkez açıyı doğrudan veren pratik formüldür.",
      "1° büyük daire yayı = 60 deniz mili kabulü denizcilikte standarttır.",
      "Rhumb line, özellikle yüksek enlemlerde büyük daireye göre daha uzundur."
    ]
  },
  "Harita sembolleri ve kısaltmalar": {
    title: "Harita Sembolleri ve Kısaltmalar",
    introduction: "Deniz haritasındaki semboller ve kısaltmalar, nesneleri çizmek için değil, seyir sırasında doğru kararı en kısa sürede verdirmek için kurulmuş standart bir dildir. Harita, gerçek dünyayı fotoğraf gibi çoğaltmaz; emniyetli suyun nerede bulunduğunu, tehlikenin neyi temsil ettiğini, bir hattın nasıl tutulacağını, hangi alanın hukuken veya operasyonel olarak kısıtlı olduğunu tek bakışta çözülecek şekilde kodlar. Bu dilin yükünü en çok taşıyan unsurlar şamandıralar, fenerler ve diğer seyir yardımcılarıdır; çünkü hem mevki doğrulamada hem de emniyetli geçişte doğrudan kullanılırlar.",
    sections: [
      {
        title: "Harita dilinin amacı ve temel okuma mantığı",
        content: "Bir işaretin anlamı yalnız renk veya isimle bitmez; şekil, üst marka, ışık karakteri, ses işareti, radar/elektronik tanıtıcıları ve haritadaki kısaltma dizilimi birlikte okunur. “Aşırı detay” gibi görünen bu yapı, pratikte tereddütü azaltıp kazayı engellemek için vardır; bu başlık ezberletmek için değil, sahada karar verdiren bir dil gibi öğretilmelidir.",
        image: sembolDangers,
        imageAlt: "Deniz haritası sembolleri örneği"
      },
      {
        title: "Sembol standardı: Chart No.1",
        content: "Chart No.1, deniz haritalarında kullanılan sembollerin ve kısaltmaların standart referansıdır. Eğitimde ve pratik okumada bu görsel dilin aynı şekilde anlaşılması için temel kaynaktır.",
        image: sembolDangers,
        imageAlt: "Chart No.1 sembol standardı"
      },
      {
        title: "IALA sistemi ve şamandıra mantığı",
        content: "Şamandıra sistemi IALA düzenine göre yorumlanır ve dünya iki ana bölgeye ayrılır. Türkiye ve Avrupa suları IALA Bölge A mantığını kullanır; limana girişte kırmızı iskelede, yeşil sancakta kalır. Buradaki kritik nokta, bu ifadenin bir renk cümlesi değil, bir geçiş talimatı olmasıdır. Aynı renk farklı bölgede farklı tarafı ifade edebildiği için haritadaki bir şamandıra sembolünü gördüğünde ilk refleks, “hangi IALA bölgesindeyim” sorusunu içgüdü hâline getirmektir. Harita şamandırayı çoğu zaman bir nokta gibi çizse bile, o nokta bir koridorun kenarını, bir tehlikenin dolaşma yönünü veya yaklaşım hattının teyidini temsil eder; dolayısıyla sembolün amacı bilgi vermek değil, hareket ettirmektir.",
        image: sembolIalaBuoyage,
        imageAlt: "IALA şamandıra mantığı"
      },
      {
        title: "IALA A şamandıra örnekleri",
        content: "IALA A bölgesinde renk, şekil ve üst marka bir bütün hâlinde okunur. Limana girişte kırmızının iskelede kalması kuralı, sahada doğrudan bir geçiş talimatına dönüşür.",
        image: sembolIalaBuoyage,
        imageAlt: "IALA A şamandıra düzeni"
      },
      {
        title: "Lateral işaretler ve haritadaki gösterimi",
        content: "Lateral işaretler, bir kanalın veya geçiş hattının kenarlarını tarif eder ve emniyetli suyu çizgisel olarak tanımlar. IALA A’da iskele işareti kırmızıdır ve tipik olarak silindirik (can) biçim ve buna karşılık gelen üst marka mantığını taşır; sancak işareti yeşildir ve tipik olarak konik (conical) biçim ve üst marka mantığı ile eşleştirilir. Haritada lateral işaretin sembolü, bunun şamandıra mı yoksa sabit beacon mı olduğunu, ışıklı mı ışıksız mı olduğunu ve bazen işaretin karakterini tek bakışta ayırmaya yarayacak şekilde çizilir. Lateral işaretin ışığı varsa haritada yanında ışık karakteristiği yazılır; bu yazı “yanıyor” demek değildir, gece ayırt etmenin şifresidir.",
        image: ialaLateralMarks,
        imageAlt: "Lateral işaretler ve ışıkları"
      },
      {
        title: "Lateral ışık karakterlerini okuma",
        content: "Bir lateral işareti okurken pratik karar akışı, önce işaretin türü ve rengi, sonra varsa şekli ve üst markası, ardından ışık karakteri ve periyodu, en son nominal görünme mesafesi mantığıyla çözülür. Haritada “Fl R 5s” kırmızı çakarlı ışığın 5 saniyelik periyotla tekrar ettiğini anlarsın. “Q G” hızlı çakarlı yeşil ışığı ifade eder. “Oc” ışığın çoğunlukla yandığı, kısa süre söndüğü karakterdir. “Iso” yanma ve sönme sürelerinin eşit olduğunu anlatır. Aynı bölgede birden fazla ışıklı işaret varken bu ayrım, “hangisi hangisi” sorusunu saniyeler içinde çözer. Gece gözlemin haritadaki ritimle uyuşmaması, çoğu kazada ilk işarettir; burada doğru refleks, rotayı körlemesine düzeltmek değil, varsayımı sorgulayıp işareti yeniden teşhis etmektir.",
        image: ialaLateralMarks,
        imageAlt: "Lateral şamandıra şekil eşleşmeleri"
      },
      {
        title: "Kardinal işaretler ve emniyetli su yönü",
        content: "Kardinal işaretler kanal kenarı anlatmaz; bir tehlikenin çevresinde emniyetli su yönünü tarif eder. Mantık yönseldir: kuzey kardinali tehlikenin kuzeyinden geç der, doğu kardinali doğusundan geç der, güney kardinali güneyinden geç der, batı kardinali batısından geç der. Bu işaretlerin haritadaki sembolü renk bandını ve üst markayı ima eder; fakat sahada en kritik kısım gece tanımadır, çünkü ışık ritmi yön bilgisini taşır.",
        image: cardinalMarks,
        imageAlt: "Kardinal işaretlerin renk ve üst marka mantığı"
      },
      {
        title: "Kardinal ışık imzaları",
        content: "Kuzey kardinal, pratikte “kesintisiz seri” hissi veren bir ritimle tanınır ve haritada çoğunlukla Q veya VQ ile ifade edilir. Doğu kardinalin imzası üçlü gruptur; Fl(3), Q(3) veya VQ(3). Güney kardinalin imzası altılı grup artı uzun çakardır; Q(6)+LFl veya VQ(6)+LFl. Batı kardinalin imzası dokuzlu gruptur; Q(9) veya VQ(9). Haritada bir kardinal işaret yanında “VQ(6)+LFl 15s” yazdığını düşünelim. Bu ifade güney kardinali işaret eder. 15 saniyelik periyot içinde altı kısa çok hızlı çakar ve bir uzun çakar vardır; düzen tekrar eder. Buradaki doğru karar, “işareti nasıl bırakırım” gibi slogan düzeyinde değil, “tehlikenin güneyinden emniyetli geçiş yapılır” mantığıyla verilir. Harita üzerindeki tehlike sembolüyle birlikte okunduğunda, geçiş hattı netleşir.",
        image: sembolCardinalMarks,
        imageAlt: "Kardinal ışık karakterleri"
      },
      {
        title: "İzole tehlike, emniyetli su ve özel işaretler",
        content: "İzole tehlike işareti, çevresinde dolaşılabilir su bulunan tekil bir tehlikeyi işaret eder; batık, kaya, sığlık gibi “noktadan” doğan riskler için kullanılır. Harita sembolünde bu işaret, tehlikenin üzerinde veya hemen yanında görülür ve ışık karakteri çoğu kez “Fl(2) W” şeklinde yazılır; iki beyaz çakar, gece ayırt etmenin en güçlü imzasıdır. Bu işaretin verdiği mesaj “burada tekil bir tehlike var, etrafı dolaşılabilir”dir; emniyetli taraf, yerel derinlik, izobatlar ve geminin draft’ı ile birlikte seçilir.",
        image: sembolCardinalMarks,
        imageAlt: "İzole tehlike işareti"
      },
      {
        title: "Emniyetli su işareti örneği",
        content: "Emniyetli su işareti, kanal orta hattını, yaklaşım hattını veya çevresi emniyetli suyu tarif eden bir referans noktayı işaret eder. Haritada kırmızı-beyaz dikey bantlı görünümü çağrıştıran sembolle ve beyaz ışık karakteristiğiyle gösterilir; Iso, Oc veya LFl gibi karakterler sık görülür. Bu işaretin değeri, “geçiş talimatı” vermekten çok “doğru yerdeyim” teyidi sağlamasıdır; yaklaşımda hedeflenen hattın üzerinde olunduğunu güçlü biçimde doğrular.",
        image: safeWaterMark,
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
        image: sembolSectorLights,
        imageAlt: "Leading lights örneği"
      },
      {
        title: "Radar ve elektronik tanıtıcılar: RACON, AIS AtoN",
        content: "Haritalarda bazı işaretler yalnız gözle değil, radar ve AIS üzerinden tanınacak şekilde donatılmıştır. RACON, radar ekranında mors kodlu bir yanıt üreten işarettir ve haritada özel bir sembolle gösterilir; mesajı, “radarda şu imzayı vereceğim”dir. AIS AtoN ise AIS üzerinden fiziksel veya sanal seyir yardımını yayınlar; haritada bu bilgi ilgili işaretin yanında belirtilir.",
        image: sembolRacon,
        imageAlt: "RACON örneği"
      },
      {
        title: "AIS AtoN ve harita sembolleri",
        content: "Bu semboller elektronik seyirde mevki doğrulama ve hedef teşhisini güçlendirir; ancak yanlış yorumlandığında “radarda gördüğüm doğru şey mi” sorusunu yanıtsız bırakır ve hatalı teşhis zinciri oluşturur.",
        image: sembolDangers,
        imageAlt: "Harita sembolleri ve kısaltmalar örneği"
      },
      {
        title: "Tehlike sembolleri: kayalar, sığlıklar, batıklar",
        content: "Kayalar ve sığlıklar, harita dilinde “su üstünde, su seviyesinde, su altında” ayrımıyla anlatılır. Bir kayanın sürekli su üstünde olmasıyla, dalgaya bağlı olarak örtünüp açılması veya tamamen su altında kalması aynı değildir; sembol bu farkı taşır. Sığlıkların tarama deseni ve izobat yapısı, geminin draft’ı ile birlikte riskin büyüklüğünü belirler. Batıklar da aynı şekilde tek tip değildir; bazıları üzerinde yeterli su bulunan bilgi batığı gibi gösterilirken, bazıları tehlikeli batık olarak vurgulanır ve çoğu kez en az derinlik değeri belirtilir. Least depth bilgisi varsa, bu sayı batığın en sığ noktasındaki suyu temsil eder ve planlamada doğrudan kullanılır.",
        image: sembolDangers,
        imageAlt: "Kaya sembolleri örnekleri"
      },
      {
        title: "Sığlık ve batık örnekleri",
        content: "Bu bölümdeki en yaygın hata, tek bir sembolü mutlak tehlike sanmaktır. Haritada tehlikenin türü, derinlik rakamı, izobatların sıkılığı, bölgenin tarama kalitesi ve geminin su çekimi birlikte değerlendirilmeden karar verilmez. Harita dili tek işaretle hüküm vermez; bağlamla hüküm verir.",
        image: sembolDangers,
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
  "GPS’in seyirde kullanımı ve sensör entegrasyonu": {
    title: "GPS’in Seyirde Kullanımı ve Sensör Entegrasyonu",
    introduction:
      "GPS, modern seyirde doğrudan bir mevki tayin sistemi olmaktan ziyade entegre seyir altyapısının bir veri kaynağıdır. ECDIS, radar, gyro pusula ve hız ölçer sistemleri GPS’ten gelen konum ve zaman bilgisini ortak referans olarak kullanır. Bu bütünleşik resim, GPS’e mutlak güven anlamına gelmez; aksine çapraz kontrol gerektirir.",
    sections: [
      {
        title: "Görsel Referanslar",
        content: `![Image](https://www.researchgate.net/publication/332914204/figure/fig1/AS%3A756106720727040%401557281298029/A-typical-configuration-of-ship-ECDIS-system.ppm)

![Image](https://optim.tildacdn.net/tild3836-3661-4332-a265-663434346237/-/resize/640x/-/format/webp/21_Types_of_Navigati.png.webp)

![Image](https://www.nautinst.org/static/derivatives/600x394_highestperformance_/505a9188-7ac0-4afc-80daa47ec365c46e.1dea365c-7673-4979-8065d97915b61207.jpg)

![Image](https://www.myseatime.com/blogadm/wp-content/uploads/2017/05/position-by-running-fix-on-ECDIS.jpg)`
      },
      {
        title: "Entegre Seyir Mantığı",
        content:
          "ECDIS üzerinde gösterilen gemi konumu doğrudan GPS verisine dayanır. Radar hedefleri, AIS bilgileri ve seyir alarmları bu konuma referanslanır. GPS konumunda oluşan sistematik bir hata, aynı anda tüm bu sistemlere yansır. Bu nedenle elektronik seyirde “tek hata noktası” riski vardır ve profesyonel uygulama, sensörler arası çapraz kontrol ile yürütülür."
      },
      {
        title: "Hız Verisinin Yorumlanması (SOG vs STW)",
        content:
          "Hız bilgisi çoğu zaman GPS’ten alınan SOG değeridir. Ancak SOG yere göre hızdır; suya göre hız değildir. Akıntı bulunan bölgelerde GPS hızına dayanarak yapılan manevra ve durdurma hesapları ciddi hatalara yol açabilir. Bu nedenle log (STW) hızı ile GPS (SOG) hızı birlikte değerlendirilmelidir."
      },
      {
        title: "Gyro – GPS İlişkisi",
        content:
          "GPS, gerçek kuzeye referanslı konum üretirken gyro pusula yön bilgisini sağlar. Gyro hatası ile GPS hatası aynı anda fark edilmezse, ECDIS üzerindeki seyir hattı gerçek durumu yansıtmayabilir. Bu nedenle gyro ve GPS verileri görsel kerteriz, radar overlay ve transit kontrolleriyle sürekli doğrulanmalıdır."
      },
      {
        title: "Formüller",
        content: `Yere göre hız ile suya göre hız ilişkisi:

V yere göre = V suya göre + Akıntı hızı

Konum doğrulama mantığı:

Konum güvenilirliği ≈ GPS konumu ± Sensör farkı

Sensör farkı; radar mesafesi, kerteriz veya görsel mevki ile ölçülen sapmayı ifade eder.`
      },
      {
        title: "Örnek Hesap",
        content: `**Veriler**

GPS yere göre hız = 14 kn  
Log suya göre hız = 11 kn

**Adım 1: Akıntı hızının hesaplanması**

Akıntı hızı = 14 − 11  
Akıntı hızı = 3 kn

**Adım 2: Operasyonel değerlendirmenin yapılması**

Gemi makine komutlarını GPS hızına göre değil, suya göre hıza göre vermelidir.

**Adım 3: Seyir güvenliğinin yorumu**

Akıntının 3 knot olduğu bir bölgede, GPS’e bakılarak yapılan yaklaşma manevrası beklenenden daha uzun durma mesafesi yaratır. Bu örnek, GPS verisinin tek başına kullanılmasının neden riskli olduğunu gösterir.`
      }
    ],
    keyPoints: [
      "GPS, entegre seyir altyapısının merkezindedir ancak tek başına karar verdirmez.",
      "SOG ve STW birlikte değerlendirilmezse akıntı etkisi hatalı yorumlanır.",
      "Sistematik GPS hatası tüm sensörlere aynı anda yansıyabilir.",
      "Gyro/GPS sapmaları görsel ve radar doğrulamalarıyla kontrol edilmelidir."
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
  "Ho – Hc kavramı": {
    title: "Ho – Hc kavramı",
    introduction:
      "Ho–Hc yaklaşımı, göksel seyirde gözlemden elde edilen düzeltilmiş yükseklik ile varsayılan mevkiye göre hesaplanan teorik yükseklik arasındaki farkı yorumlamaya dayanır. Bu fark, gözlemcinin varsayılan mevkiye göre gök cismine olan doğrusal uzaklığını verir ve mevki hattının (LOP) geometrik temelini oluşturur.",
    sections: [
      {
        title: "Görsel Kavramlar",
        content: `![GP mesafe ilişkisi](https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Diagram_showing_GP_distance_%3D_ZD.jpg/500px-Diagram_showing_GP_distance_%3D_ZD.jpg)

![Intercept geometrisi](https://flyandwire.com/wp-content/uploads/2020/12/intercept-geometry-n-p2-definitions-rate-of-closure-tid-as-2.png?w=780)

![Toward / Away yönü](https://easysextant.com/wp-content/uploads/2024/05/towards-or-away-from-the-sun-677x1024.jpg.webp)

![Mevki hattı oluşumu](https://www.myseatime.com/blogadm/wp-content/uploads/2018/03/Position-line-from-intercept-method-concept.jpg)`
      },
      {
        title: "Aşama 1: Varsayılan mevkinin (AP) kurulması",
        content:
          "Varsayılan mevki (AP), DR mevkiine yakın bir noktadır ve Hc ile Zn’nin hesaplandığı referans noktadır. Amaç “doğru nokta” olmak değil, **gerçek mevkiye yeterince yakın** olmaktır. Intercept yöntemi bu yakınlık varsayımı üzerine çalışır."
      },
      {
        title: "Aşama 2: Gözlemsel ve teorik yüksekliklerin karşılaştırılması",
        content:
          "Ho, sextant ölçümü ve tüm düzeltmeler sonrası elde edilen **gerçek gözlemsel yüksekliktir**. Hc, varsayılan mevkiye göre almanak ve tablolarla hesaplanan **teorik yüksekliktir**. Bu iki değer arasındaki fark, geminin varsayılan mevkiye göre gök cismine olan açısal uzaklığını temsil eder."
      },
      {
        title: "Aşama 3: Intercept mesafesinin elde edilmesi",
        content:
          "Ho ile Hc farkı **doğrusal mesafeye** dönüştürülür. Dakika cinsinden bulunan fark, doğrudan deniz mili olarak yorumlanır. Bu aşamada yön bilgisi yoktur; yalnızca “ne kadar” sapma olduğu belirlenir."
      },
      {
        title: "Aşama 4: Yönün belirlenmesi (toward / away)",
        content:
          "Ho, Hc’den büyükse gözlemci varsayılan mevkiden **gök cismine daha yakındır** ve taşıma gök cismine doğru yapılır. Ho, Hc’den küçükse gözlemci gök cisminden daha uzaktadır ve taşıma gök cisminden uzağa yapılır."
      },
      {
        title: "Formüller (Intercept yöntemi)",
        content:
          "Intercept tanımı ve mesafe yorumu aşağıdaki gibidir. Yön, Ho ile Hc arasındaki işaret üzerinden belirlenir.",
        formula: {
          text: "a = Ho − Hc",
          description: "a: intercept (nm), Ho: düzeltilmiş gözlemsel yükseklik, Hc: hesaplanan teorik yükseklik."
        },
        bulletPoints: [
          "Ho > Hc → gök cismine doğru (towards)",
          "Ho < Hc → gök cisminden uzağa (away)",
          "1′ yükseklik farkı = 1 deniz mili"
        ]
      },
      {
        title: "Örnek Uygulama (Intercept yorumu)",
        content: `Düzeltilmiş gözlemsel yükseklik Ho = 41° 28.0′ olsun.  
Varsayılan mevkiye göre hesaplanan teorik yükseklik Hc = 41° 21.5′ olsun.

a = Ho − Hc  
a = 41° 28.0′ − 41° 21.5′  
a = 6.5′

Bu fark **6.5 deniz milidir**. Ho, Hc’den büyük olduğu için gemi varsayılan mevkiden gök cismine doğru 6.5 deniz mili daha yakındır. Bu bilgi, Zn doğrultusu ile birleştirildiğinde mevki hattının çizilmesini sağlar.`
      }
    ],
    keyPoints: [
      "Ho, düzeltmeler sonrası gerçek gözlemsel yükseklik; Hc ise varsayılan mevkiye göre hesaplanan teorik yüksekliktir.",
      "Intercept bağıntısı a = Ho − Hc ile bulunur; 1′ fark = 1 deniz mili.",
      "Ho > Hc ise gök cismine doğru, Ho < Hc ise gök cisminden uzağa gidilir.",
      "Varsayılan mevki gerçek mevkiye yakın seçilmezse yöntem doğruluk kaybeder."
    ]
  },
  "Azimut hesapları": {
    title: "Azimut hesapları (göksel seyir — trigonometrisiz, görsel mantık)",
    introduction:
      "Azimut, gök cisminin **gerçek kuzeye göre doğrultusudur** ve Zn ile gösterilir. Göksel seyirde azimut, intercept mesafesinin hangi doğrultuda taşınacağını ve LOP’un hangi yönde çizileceğini belirleyen tek yön bilgisidir. Azimut **rota değildir**, seyir yönü değildir; yalnızca **gök cismine bakış doğrultusudur**.",
    sections: [
      {
        title: "Görsel Referanslar",
        content: `![Azimut geometrisi](https://www.onboardintelligence.com/CelestialNav/Images/astro2.gif)

![Göksel üçgen gösterimi](https://ars.els-cdn.com/content/image/1-s2.0-S0038092X13002612-fx1.jpg)

![Zn yerleşimi (PZX üçgeni)](https://astronavigationdemystified.com/wp-content/uploads/2013/07/diag22nonum.jpeg)

![Zn ve LOP ilişkisi](https://astronavigationdemystified.com/wp-content/uploads/2013/07/diag-23-mod-pzx.jpeg?w=584)`
      },
      {
        title: "Aşama 1: Girdilerin hazırlanması (AP merkezli)",
        content:
          "Azimut hesabı **her zaman varsayılan mevkiye (AP)** göre yapılır. Gerekli bilgiler: gök cisminin **deklinasyonu (δ)**, gözlemcinin **enlemi (φ)** ve gök cisminin **yerel saat açısı (LHA)**. Bu üç bilgi, astronomik almanak ve zaman–açı ilişkisi üzerinden bulunur; bu aşamada henüz yön çizimi yapılmaz."
      },
      {
        title: "Aşama 2: Tablodan Zn’nin okunması (Sight Reduction mantığı)",
        content:
          "AP merkezli soyut göksel üçgen pratikte **Sight Reduction Tables (HO-249/HO-229)** ile çözülür. Tablolar, verilen φ, δ ve LHA için **Hc** (teorik yükseklik) ve **Zn** (azimut) değerlerini **doğrudan** verir. Bu aşamada trigonometrik işlem yapılmaz; Zn **okunan** bir değerdir."
      },
      {
        title: "Aşama 3: Doğu–batı kontrolü (Zn’nin yerleştirilmesi)",
        content:
          "Gök cisminin **doğuda mı batıda mı** olduğu bilgisi LHA’dan gelir. Tablodan okunan azimut açısı, bu bilgiye göre **gerçek kuzeyden saat yönünde** yerleştirilir.\n\n- **LHA 0°–180° → gök cismi batıda**\n- **LHA 180°–360° → gök cismi doğuda**\n\nZn’nin yanlış yarımküreye yerleştirilmesi, azimut hatalarının en yaygın nedenidir."
      },
      {
        title: "Aşama 4: Zn’nin LOP ile ilişkilendirilmesi",
        content:
          "Zn doğrultusu çizilir; bunun **LOP’un kendisi olmadığı** özellikle vurgulanır. LOP, Zn’ye **dik** çizilir. Böylece azimutun görevi tamamlanır: Zn yalnızca **yön referansı** sağlar.",
        formula: {
          text: "LOP doğrultusu = Zn ± 90°",
          description: "LOP, azimut doğrultusuna dik çizilir."
        }
      },
      {
        title: "Formüller (ders uyumlu, trigonometrisiz)",
        content:
          "Saat açısı ilişkisi:\n\n- **LHA = GHA ± λ**\n\nYarımküre kontrolü:\n\n- **LHA 0°–180° → batı**\n- **LHA 180°–360° → doğu**"
      },
      {
        title: "Örnek uygulama (tablo mantığıyla Zn yorumu)",
        content:
          "Varsayılan mevki enlemi **36° N** olsun. Gök cisminin deklinasyonu **12° N** ve **LHA = 245°** olsun. Sight Reduction Tables kullanılarak bu değerler için **Zn = 118°** okunmuş olsun.\n\nLHA 180°’den büyük olduğu için gök cismi **doğudadır**. Zn, gerçek kuzeyden saat yönünde **118°** olarak yerleştirilir. Harita üzerinde AP’den 118° doğrultusunda bir bakış doğrultusu çizilir. LOP, bu doğrultuya **dik** olarak çizilecektir.\n\nAzimut doğru hesaplanıp doğru yarımkürede yerleştirilmediği sürece, intercept mesafesi doğru olsa bile mevki hattı yanlış konumlanır. Bu nedenle göksel seyirde azimut, **hesaptan çok yorum disiplini** gerektirir."
      }
    ],
    keyPoints: [
      "Azimut, gök cisminin gerçek kuzeye göre bakış doğrultusudur; rota değildir.",
      "Zn, Sight Reduction Tables ile doğrudan okunur; trigonometrik işlem gerekmez.",
      "LHA, Zn’nin doğu/batı yarımkürede doğru yerleştirilmesinin ana kontrolüdür.",
      "LOP, Zn doğrultusuna dik çizilir; azimut yalnızca yön referansıdır."
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
  },
  "Uzun okyanus seyri uygulamaları": {
    title: "Uzun okyanus seyri uygulamaları",
    introduction:
      "Uzun okyanus seyri, binlerce deniz milini kapsayan ve seyir süresinin günler veya haftalarla ölçüldüğü geçişlerdir. Bu tür seferlerde rota seçimi yalnızca geometrik kısalık üzerinden yapılamaz; meteoroloji, akıntılar, trafik ayırım düzenleri ve geminin operasyonel sınırları planlamanın ayrılmaz parçasıdır.",
    sections: [
      {
        title: "Görsel Referanslar",
        content: `![Büyük daire örnek rotası](https://gisgeography.com/wp-content/uploads/2019/07/Great-Circle-NewYork-Madrid.jpg)

![Okyanus akıntıları ve rotalar](https://keyassets.timeincuk.net/inspirewp/live/wp-content/uploads/sites/20/2015/09/LRATLANTIC_CIRCUIT_ROUTE_CURRENTS.jpg)

![Okyanus seyri örnek harita](https://www.nauticalchartsonline.com/thumbs/56.jpg)`
      },
      {
        title: "Büyük Daire – Rhumb Line – Composite Karşılaştırması",
        content: `**Büyük daire** teorik olarak iki mevki arasındaki en kısa küresel yolu verir. Ancak uzun okyanus seyrinde bu rota çoğu zaman yüksek enlemlere taşar. Yüksek enlemler; sert hava sistemleri, buz riski, dalga boyu artışı ve sıcaklık kaynaklı operasyonel kısıtlar nedeniyle ticari açıdan dezavantajlıdır. Bu yüzden saf büyük daire rotası nadiren uygulanır.

**Rhumb line** (loxodrom) sabit kurs avantajı sağlar; ancak uzun mesafelerde mesafe kaybı belirgin hale gelir. Özellikle Atlantik ve Pasifik geçişlerinde rhumb line kullanımı yakıt tüketimini ve seyir süresini ölçülebilir şekilde artırır. Bu nedenle çoğunlukla kısa mesafe veya kıyıya yakın seyirlerde tercih edilir.

**Composite rota**, büyük dairenin mesafe avantajını korurken, belirlenen sınırlayıcı enlemin üzerinde seyri engeller. Böylece gemi, meteorolojik olarak daha öngörülebilir kuşaklarda tutulur. Rota genellikle birden fazla büyük daire segmenti ve bunları bağlayan sabit enlem parçalarından oluşur.`
      },
      {
        title: "Uzun Okyanus Seyrinde Temel Uygulama Mantığı",
        content: `Teorik referans → **Büyük daire**  
Operasyonel kontrol → **Composite rota**  
Yerel ve kısa seyir → **Rhumb line**`
      },
      {
        title: "Uygulamalı Örnek Senaryo",
        content: `Bir konteyner gemisinin Avrupa’dan Kuzey Amerika’nın batı kıyısına sefer yaptığını varsayalım. Saf büyük daire rotası, gemiyi **55–60° Kuzey** enlemlerine çıkaracaktır. Kış aylarında bu bölge, yoğun alçak basınç sistemleri ve yüksek dalga karakteristiği ile bilinir. Bu durumda sınırlayıcı enlem **48° Kuzey** olarak belirlenir.

Planlama şu şekilde yapılır:

* Başlangıçtan **48° Kuzey**’e kadar büyük daire seyri uygulanır.
* **48° Kuzey** boyunca sabit enlem rhumb line segmenti ile ilerlenir.
* Uygun boylamda tekrar büyük daireye girilerek varış limanına yönelinir.

Her segmentin mesafesi ayrı hesaplanır ve toplam rota uzunluğu bulunur. Bu toplam mesafe, saf büyük daireden daha uzun; ancak saf rhumb line’dan daha kısa çıkar. Buna karşılık rota, operasyonel olarak daha emniyetli ve ticari açıdan daha öngörülebilir olur.`
      },
      {
        title: "Planlama Notları",
        content: `Bu yaklaşım, modern seyir planlamasında elektronik haritalar, hava rota optimizasyon sistemleri ve performans modelleri ile birlikte kullanılır. Matematiksel doğruluk, pratik denizcilik gerçekleriyle dengelenmeden yapılan rota planları, uzun okyanus seyrinde sürdürülebilir değildir.`
      }
    ],
    keyPoints: [
      "Saf büyük daire, kısa mesafe avantajı sunsa da yüksek enlem riskleri nedeniyle çoğu zaman sınırlandırılır.",
      "Rhumb line sabit kurs sağlar ancak uzun mesafede mesafe kaybı belirgindir.",
      "Composite rota, mesafe avantajı ile operasyonel güvenlik arasında denge kurar.",
      "Uzun okyanus planlamasında meteoroloji, akıntılar ve operasyonel sınırlar temel belirleyicilerdir."
    ]
  },
  "Göksel küre": {
    title: "Göksel Küre",
    introduction:
      "Göksel küre, gözlemcinin Dünya üzerinde merkezde kabul edildiği ve gök cisimlerinin bu hayali kürenin iç yüzeyine izdüşürülerek tanımlandığı geometrik bir modeldir. Amaç fiziksel gerçekliği temsil etmek değil; gök cisimlerinin açısal konumlarını sade ve hesaplanabilir hale getirmektir. Sextant ölçümleri, zaman bilgisi ve astronomik tablolar; bu model üzerinde birleştirilerek seyirde mevki tayinine temel oluşturur.",
    sections: [
      {
        title: "Modelin Temel Referansları",
        content:
          "Göksel kürede gözlemcinin bulunduğu nokta **merkez**, baş üstü noktası **zenit**, tam karşısı **nadir** olarak alınır. Gözlemciye teğet düzlemin küreyle kesişimi **ufuk dairesini** oluşturur. Dünya’nın dönme ekseninin küreyi kestiği noktalar **gök kutupları**, ekvator düzleminin küreyle kesişimi ise **gök ekvatoru**dur.",
        image: celestialTriangle,
        imageAlt: "Göksel küre üzerinde ufuk, zenit ve temel daireler"
      },
      {
        title: "Koordinat ve Açısal Tanımlar",
        content:
          "Bir gök cisminin gök ekvatoruna göre açısal uzaklığı **deklinasyon (δ)**, yerel meridyene göre açısal konumu ise **saat açısı (LHA)** ile ifade edilir. Gözlemcinin enlemi **φ**, gözlenen cismin ufuk üzerindeki yüksekliği **h** olarak alınır. Bu büyüklükler, göksel küre üzerindeki küresel üçgenin kenarlarını ve açılarını belirler.",
        image: enlemCelestial,
        imageAlt: "Göksel kürede enlem, deklinasyon ve yükseklik ilişkisi"
      },
      {
        title: "Zenit Uzaklığı ve Saat Açısı İlişkileri",
        content:
          "Zenit uzaklığı, cismin gök kubbede gözlemci başüstü noktasına olan açısal mesafesidir. Seyirde kullanılan temel dönüşümler aşağıdaki gibidir.",
        formula: {
          text: "Z = 90° − h",
          description: "Z: zenit uzaklığı, h: gök cisminin ölçülen yüksekliği"
        }
      },
      {
        title: "Greenwich Saat Açısından Yerel Saat Açısına",
        content:
          "Astronomik tablolarda verilen Greenwich Saat Açısı (GHA), gözlemcinin boylamıyla birleştirilerek Yerel Saat Açısı (LHA) bulunur. Doğu boylamları çıkarma, batı boylamları ekleme işaretiyle alınır.",
        formula: {
          text: "LHA = GHA ± λ",
          description: "λ: boylam (Doğu çıkarılır, Batı eklenir)"
        },
        image: boylamCelestial,
        imageAlt: "GHA, LHA ve boylam ilişkisi"
      },
      {
        title: "Küresel Üçgende Temel Kosinüs Bağıntısı",
        content:
          "Göksel seyirde kullanılan temel bağıntı, gözlemci enlemi (φ), gök cisminin deklinasyonu (δ) ve LHA yardımıyla cismin yüksekliğini verir.",
        formula: {
          text: "sin h = sin φ · sin δ + cos φ · cos δ · cos LHA",
          description: "h: yükseklik | φ: gözlemci enlemi | δ: deklinasyon | LHA: yerel saat açısı"
        },
        image: azimuthalProjection,
        imageAlt: "Göksel küre küresel üçgen geometrisi"
      },
      {
        title: "Örnek Hesap",
        content:
          "Varsayım: **φ = 36° N**, **δ = 10° N**, **LHA = 40°**\n\n" +
          "sin h = sin 36° · sin 10° + cos 36° · cos 10° · cos 40°\n\n" +
          "sin 36° = 0.588 | sin 10° = 0.174 | cos 36° = 0.809 | cos 10° = 0.985 | cos 40° = 0.766\n\n" +
          "sin h = (0.588 × 0.174) + (0.809 × 0.985 × 0.766)\n\n" +
          "sin h = 0.102 + 0.611 = **0.713**\n\n" +
          "h = arcsin 0.713 ≈ **45.5°**\n\n" +
          "Bu değer, cismin ufuk üzerinde yaklaşık **45.5°** yükseklikte görülmesi gerektiğini gösterir. Pratikte bu değer sextant ile ölçülen düzeltilmiş yükseklikle karşılaştırılır ve intercept yönteminde kullanılır."
      }
    ],
    keyPoints: [
      "Göksel küre fiziksel bir gerçeklik değil, açısal ilişkileri sadeleştiren bir geometrik modeldir.",
      "Zenit, nadir, ufuk dairesi, gök kutupları ve gök ekvatoru temel referansları oluşturur.",
      "Deklinasyon ve saat açısı, gök cisimlerinin göksel küre üzerindeki konumunu tanımlar.",
      "Küresel üçgen bağıntısı, ölçülen yükseklikten mevki hesaplarının temelini oluşturur."
    ]
  },
  "Zaman – açı ilişkisi": {
    title: "Zaman – Açı İlişkisi (Göksel Seyir)",
    introduction:
      "Zaman–açı ilişkisi, göksel seyirde yapılan tüm hesapların temel dayanağıdır. Dünya’nın kendi ekseni etrafındaki düzenli dönüşü, zamanı doğrudan açısal bir büyüklüğe dönüştürür. Göksel seyirde mesafe değil açı ölçülür; zaman bilgisi bu açının anahtarıdır.",
    sections: [
      {
        title: "Aşama 1: Dünya’nın dönüşünün kurulması",
        content:
          "Dünya 24 saatte bir tam tur yapar. Bu tam tur, 360°’lik açısal bir harekettir. Göksel seyirde zaman hesabı, bu fiziksel gerçeğin üzerine kurulur.",
        image: earthRotation,
        imageAlt: "Dünya'nın ekseni etrafındaki dönüşü"
      },
      {
        title: "Aşama 2: Zamanın açısal karşılığının gösterilmesi",
        content:
          "360°’lik dönüş 24 saate bölündüğünde, her saatlik zaman farkının gök küresi üzerinde belirli bir açısal kaymaya karşılık geldiği görülür. Burada yalnızca oran vardır; trigonometrik bir ilişki yoktur.",
        image: earthTimezone1,
        imageAlt: "Zaman dilimleri ve açısal kayma ilişkisi"
      },
      {
        title: "Aşama 3: Greenwich meridyeni ve yerel meridyen",
        content:
          "Greenwich meridyeni sabit referans kabul edilir. Gök cisimlerinin konumu **Greenwich Saat Açısı (GHA)** ile, gözlemcinin meridyenine göre konumu ise **Yerel Saat Açısı (LHA)** ile ifade edilir. İki meridyen arasındaki açısal fark boylamdır.",
        image: boylamMeridians,
        imageAlt: "Greenwich ve yerel meridyen ilişkisi"
      },
      {
        title: "Aşama 4: Zaman farkının boylam ve saat açısına dönüşmesi",
        content:
          "Greenwich zamanı ile yerel zaman arasındaki fark, gök cisminin konumunu değiştirir. Bu fark, hem boylam tayininde hem de Hc ve azimut hesaplarının girişinde kullanılır. Böylece **zaman farkı → açısal fark → konum değişimi** zinciri açıkça kurulmuş olur.",
        image: longitudeTime1,
        imageAlt: "Zaman farkının boylam ve saat açısına dönüşümü"
      },
      {
        title: "Formüller (ders uyumlu)",
        content:
          "Dünya dönüşü: **360° = 24 saat**\n\n" +
          "Dönüşümler:\n" +
          "- **1 saat = 15°**\n" +
          "- **1 dakika zaman = 15′**\n" +
          "- **1 saniye zaman = 15″**\n\n" +
          "Saat açısı ilişkisi:\n" +
          "- **LHA = GHA ± λ**\n\n" +
          "Doğu boylamları çıkarma, batı boylamları ekleme işaretiyle alınır.",
        formula: {
          text: "360° = 24 saat → 1 saat = 15° → 1 dakika = 15′ → 1 saniye = 15″ | LHA = GHA ± λ",
          description: "Zaman–açı dönüşümleri ve saat açısı ilişkisi"
        }
      },
      {
        title: "Örnek uygulama (görsel mantıkla)",
        content:
          "Kronometrede okunan Greenwich zamanı ile yerel gözlem zamanı arasında **2 saat 20 dakika** fark olsun.\n\n" +
          "**Saat karşılığı:** 2 saat × 15° = **30°**\n\n" +
          "**Dakika karşılığı:** 20 dakika × 15′ = **300′ = 5°**\n\n" +
          "**Toplam açısal fark:** **35°**\n\n" +
          "Bu değer, gözlemcinin Greenwich meridyenine göre **35° boylam farkında** olduğunu gösterir. Yerel zaman Greenwich’ten ilerideyse boylam doğu, gerideyse batı olarak yorumlanır.",
        image: longitudeTime2,
        imageAlt: "Zaman farkının açısal karşılığı ile boylam hesaplama"
      }
    ],
    keyPoints: [
      "Dünya’nın düzenli dönüşü, zamanı doğrudan açısal bir büyüklüğe dönüştürür.",
      "Göksel seyirde temel ilişki: 1 saat = 15° ve bu oran tüm saat açısı hesaplarının merkezidir.",
      "GHA, LHA ve boylam arasındaki işaret ilişkisi doğru kurulmadan hesap güvenilir olmaz.",
      "Zaman hatası saniye mertebesinde bile mevkii mil mertebesinde kaydırabilir."
    ]
  },
  "Running fix (göksel)": {
    title: "Running fix (göksel)",
    introduction:
      "Running fix, göksel seyirde **aynı anda elde edilemeyen mevki hatlarının (LOP)** geminin hareketi dikkate alınarak **aynı zamana taşınması** esasına dayanır. Farklı zamanlarda yapılan gözlemler tek zaman düzleminde birleştirilerek fix elde edilir. Gök cismi sayısının sınırlı olduğu veya hava koşulları nedeniyle eşzamanlı gözlemin mümkün olmadığı durumlarda pratik bir çözümdür.",
    sections: [
      {
        title: "Detaylı Anlatım",
        content: `![Image](https://easysextant.com/wp-content/uploads/2024/03/running-fix.jpg)

![Image](https://easysextant.com/wp-content/uploads/2024/08/The-process-of-transferring-a-line-of-position.jpg.webp)

![Image](https://www.navsoft.com/assets/images/Transferred_Position_Line.png)

![Image](https://astronavigationdemystified.com/wp-content/uploads/2013/09/diag44mod-new.jpg)

---

### Aşama 1: İlk LOP’un elde edilmesi (t₁)

İlk gözlem anında (t₁) elde edilen LOP, geminin t₁ anında bulunabileceği tüm noktaları temsil eder. Bu aşamada henüz fix yoktur ve LOP kendi zamanına aittir.

---

### Aşama 2: Zaman farkının ve gemi hareketinin belirlenmesi

t₁ ile ikinci gözlem zamanı t₂ arasındaki zaman farkı (Δt) ve geminin bu süredeki seyri hesaplanır. Gemi hızının sabit, rotanın değişmediği kabulü yapılır. Bu kabul zayıfsa running fix’in güvenilirliği düşer.

---

### Aşama 3: İlk LOP’un taşınması (transported LOP)

t₁ anına ait LOP, geminin seyir doğrultusunda ve kat edilen mesafe kadar **paralel** olarak ötelenir. Bu işlem LOP’un yönünü değiştirmez; yalnızca konumunu t₂ zamanına taşır.

⬛ **Kullanılan ilişki**

════════════════════
Δs = V × Δt
════════════════════

---

### Aşama 4: İkinci LOP ile kesişim — running fix

t₂ anında elde edilen ikinci LOP çizilir. Bu LOP ile taşınmış ilk LOP’un kesişim noktası, geminin t₂ anındaki mevkiidir. Bu nokta running fix’tir.

---

### Formüller (ders uyumlu)

⬛ **Taşınan mesafe**

════════════════════
Δs = V × Δt
════════════════════

* Δs: taşınan mesafe (deniz mili)
* V: gemi hızı (knot)
* Δt: zaman farkı (saat)

⬛ **Taşınmış LOP ilkesi**

Taşınan LOP, orijinal LOP’a **paralel** kalır.

---

### Örnek Uygulama (görsel mantıkla)

Birinci gök cismi gözlemi saat **08:20**’de yapılmış ve bir LOP elde edilmiştir. İkinci gözlem saat **08:50**’de farklı bir gök cisminden yapılmıştır. Gemi hızı **12 knot**, rota sabit kabul edilsin.

⬛ **Zaman farkı**

════════════════════
Δt = 30 dakika = 0.5 saat
════════════════════

⬛ **Taşınan mesafe**

════════════════════
Δs = 12 × 0.5
Δs = 6 deniz mili
════════════════════

Saat 08:20’de elde edilen LOP, geminin seyir doğrultusunda **6 deniz mili** paralel ötelenir. Saat 08:50’de elde edilen ikinci LOP ile kesişim noktası, geminin **08:50’deki running fix** mevkiidir.

---

### Kullanım Notu

Running fix, açık denizde pratik ve işlevseldir; ancak rota veya hız değişimi varsa ya da DR disiplini zayıfsa sonuç güvenilir kabul edilmez. Bu nedenle yöntem, mümkün olduğunda eşzamanlı LOP’larla elde edilen fix’lerin yerine değil, **tamamlayıcı** olarak kullanılmalıdır.`
      }
    ]
  },
  "LOP çizimi": {
    title: "Mevki Hattı (LOP) Çizimi",
    introduction:
      "LOP çizimi, gök cismi gözleminden elde edilen açısal bilginin geometrik sonuca dönüştürülmesidir. Bu işlem düzlem seyir değildir; harita yalnızca sonuçların aktarıldığı yüzeydir. Esas olan, varsayılan mevki ile gök cismi doğrultusu arasındaki geometrik ilişkidir.",
    sections: [
      {
        title: "Görsel Referanslar",
        content: `![Güneşe doğru/uzak yön](https://easysextant.com/wp-content/uploads/2024/05/towards-or-away-from-the-sun-677x1024.jpg.webp)

![Mevki hattı şeması](https://i0.wp.com/astrolabesailing.com/wp-content/uploads/2016/11/fullsizerender-70.jpg?fit=835%2C1200&ssl=1)

![Zenit uzaklığı ve LOP](https://www.myseatime.com/blogadm/wp-content/uploads/2017/09/celestial-position-line-from-zenith-distance.jpg)

![Azimut ve LOP ilişkisi](https://easysextant.com/wp-content/uploads/2024/11/line-of-position-and-point-GP-2.jpg.webp)`
      },
      {
        title: "Aşama 1: Varsayılan Mevkinin (AP) Gösterilmesi",
        content:
          "İlk görselde yalnızca soyut bir enlem–boylam ızgarası ve varsayılan mevki yer alır. Bu nokta, DR mevkiine yakın ve tam derece koordinatlardan seçilmiş referans noktadır. Burada herhangi bir rota, kıyı veya seyir hattı anlamı yoktur. AP yalnızca hesaplanan Hc ve Zn’nin geçerli olduğu geometrik merkezdir."
      },
      {
        title: "Aşama 2: Gök Cismi Doğrultusunun (Zn) Kurulması",
        content:
          "İkinci görselde AP’den başlayan tek bir doğrultu çizilir. Bu doğrultu Zn’dir ve gök cismine bakış doğrultusunu temsil eder. Zn bir rota değildir, geminin gittiği yön değildir. Bu doğru yalnızca “gök cismi bu yöndedir” bilgisini taşır; gerçek kuzeye göre ölçülen bir doğrultudur."
      },
      {
        title: "Aşama 3: Ho − Hc Farkının Geometrik Taşınması",
        content:
          "Üçüncü görselde, Ho ile Hc arasındaki fark yalnızca bir mesafe olarak ele alınır. 1′ = 1 deniz mili kabul edilir. Bu mesafe, Zn doğrultusu üzerinde taşınır. Ho > Hc ise gök cismine doğru; Ho < Hc ise gök cisminden uzağa ilerlenir. Bu aşamada hâlâ LOP yoktur; yalnızca AP’den ne kadar ve hangi yönde sapma olduğu belirlenir.",
        formula: {
          text: "a = Ho − Hc",
          description: "1′ = 1 deniz mili."
        }
      },
      {
        title: "Aşama 4: Mevki Hattının (LOP) Ortaya Çıkışı",
        content:
          "Dördüncü görselde, intercept ile ulaşılan noktadan Zn doğrultusuna dik bir doğru çizilir. Bu doğru LOP’tur. Bu hat, gözlem anında bulunulabilecek tüm noktaları temsil eder; gemi bu hat üzerinde bir yerdedir.",
        formula: {
          text: "LOP doğrultusu = Zn ± 90°",
          description: "Zn: gök cisminin azimut doğrultusu."
        }
      },
      {
        title: "Örnek – Harita Üzerinde LOP Çizimi",
        content:
          "Varsayılan mevki **36° 00′ N, 029° 00′ E** olsun. Hesaplanan azimut **Zn = 120°**, Ho − Hc farkı **+6.0′**.\n\n" +
          "Intercept mesafesi: **d = 6.0 deniz mili**\n\n" +
          "Ho, Hc’den büyük olduğundan gök cismine doğru ilerlenir. Harita üzerinde varsayılan mevkiden **120°** doğrultusunda bir doğru çizilir ve bu doğru üzerinde **6 deniz mili** ilerlenir. Bu yeni noktadan, **120° doğrultusuna dik** olacak şekilde **030°–210°** doğrultusunda bir doğru çizilir. Çizilen bu doğru, gözlem anındaki mevki hattıdır."
      },
      {
        title: "LOP Kesişimi ve Güvenilirlik",
        content:
          "Tek bir mevki hattı kesin mevki vermez. En az iki, tercihen üç farklı gök cisminden elde edilen mevki hatlarının kesişimi gerçek mevkiyi belirler. Hatlar paralel veya çok dar açılı kesişiyorsa sonuç güvenilir değildir. Bu durum özellikle aynı azimuta yakın gök cisimleri kullanıldığında ortaya çıkar ve uygulamada ciddi bir hata kaynağıdır."
      }
    ],
    keyPoints: [
      "LOP, azimut doğrultusuna dik çizilen geometrik bir mevki doğrusudur.",
      "Intercept mesafesi yalnızca uzaklıktır; doğru yön ve referansla taşınmalıdır.",
      "En az iki LOP kesişimi gerekir; paralel LOP’lar güvenilir sonuç vermez.",
      "Çizim tamamen geometriktir ve harita üzerinde uygulanır."
    ]
  },
  "2 LOP ve 3 LOP fix": {
    title: "2 LOP ve 3 LOP Fix (Göksel Seyir)",
    introduction:
      "Göksel seyirde tek bir mevki hattı (LOP), geminin yalnızca **olası konum doğrusu**nu verir. Kesin mevki, iki veya üç bağımsız LOP’un birlikte değerlendirilmesiyle geometrik olarak daraltılır. Bu yaklaşım, **tek bir hesap sonucu nokta** değil; **çoklu kısıtların ortak çözümü** olarak fix kavramını tanımlar.",
    sections: [
      {
        title: "Görsel Referanslar",
        content: `![Running fix ve LOP taşıma mantığı](https://easysextant.com/wp-content/uploads/2024/03/running-fix.jpg)

![İki ve üç LOP kesişim örneği](https://www.onboardintelligence.com/CelestialNav/Images/InFix.jpg)

![LOP kesişim geometrisi](https://www.mdpi.com/energies/energies-14-01492/article_deploy/html/images/energies-14-01492-g001-550.jpg)

![Kesişim türleri ve hata etkisi](https://www.researchgate.net/publication/352523373/figure/fig1/AS%3A1038230812102656%401624544923281/Different-types-of-intersections.png)`
      },
      {
        title: "Aşama 1: Birinci LOP’un Kurulması",
        content:
          "İlk gök cismi gözleminden elde edilen LOP, harita düzleminde bir doğru olarak çizilir. Bu çizgi, geminin **gözlem anında** bu doğru üzerinde bir yerde olduğunu ifade eder. Ancak tek bir LOP, tek başına kesin mevki vermez."
      },
      {
        title: "Aşama 2: İkinci LOP’un Eklenmesi – 2 LOP Fix",
        content:
          "İkinci bir gök cismi gözlemi ile ikinci LOP çizilir. İki LOP’un **kesiştiği nokta**, her iki gözlemin aynı anda doğru olabildiği tek konumdur ve **2 LOP fix** olarak kabul edilir.\n\n" +
          "Kesişim açısı kritik önemdedir: Açının **dar** olması durumunda küçük ölçüm hataları mevkiyi ciddi şekilde kaydırır. Bu nedenle 2 LOP fix için **dik veya dikliğe yakın** kesişim tercih edilir."
      },
      {
        title: "Aşama 3: Üçüncü LOP’un Eklenmesi – 3 LOP Fix",
        content:
          "Üçüncü bir gök cisminden elde edilen LOP eklendiğinde, üç hat çoğu zaman tek noktada kesişmez. Bunun yerine küçük bir üçgen oluşur. Bu üçgen **cocked hat** olarak adlandırılır.\n\n" +
          "Gemi mevkiinin bu üçgenin içinde olduğu kabul edilir. Üçgenin alanı, gözlemlerin tutarlılığını ve zaman bilgisinin doğruluğunu doğrudan gösterir: **küçük cocked hat** güvenilir fix, **büyük cocked hat** sistematik hata göstergesidir."
      },
      {
        title: "Aşama 4: Zaman Farkı Varsa LOP Taşıma (Running Fix Mantığı)",
        content:
          "LOP’lar aynı anda alınmadıysa, ilk LOP **zaman farkı kadar taşınır**. Taşıma, geminin seyri ve hızı kullanılarak yapılır; LOP doğrultusu değişmez, yalnızca **paralel ötelenir**. Taşınmış LOP ile sonraki LOP’un kesişimi, ilgili zamandaki fix’i verir."
      },
      {
        title: "Temel İlişkiler",
        content: "LOP kesişim ilkesi ve zamanla taşıma mantığı aşağıdaki temel bağıntılarla ifade edilir.",
        formula: {
          text: "Fix = LOP₁ ∩ LOP₂",
          description: "İki LOP’un kesişimi, 2 LOP fix’i verir."
        }
      },
      {
        title: "Zamana Bağlı Taşıma",
        content: "Zaman farkı varsa LOP taşıma mesafesi aşağıdaki bağıntı ile bulunur.",
        formula: {
          text: "Δs = V × Δt",
          description: "Δs: taşınan mesafe (NM) | V: hız (knot) | Δt: zaman farkı (saat)"
        }
      },
      {
        title: "Örnek Uygulama (Görsel Mantıkla)",
        content:
          "Saat **09:30**’da birinci gök cisminden LOP çizilsin. Saat **09:35**’te ikinci gök cisminden ikinci LOP çizilsin. İki LOP harita üzerinde **yaklaşık dik** açıyla kesişiyorsa, bu kesişim noktası geminin **09:35 civarındaki 2 LOP fix’idir**.\n\n" +
          "Aynı zaman aralığında üçüncü gök cisminden bir LOP daha alındığında, üç hat küçük bir üçgen oluşturuyorsa bu **cocked hat**’tir. Üçgenin küçük olması gözlemlerin tutarlı olduğunu; büyük olması ise gözlemlerde veya zaman bilgisinde hata olabileceğini gösterir."
      }
    ],
    keyPoints: [
      "Tek LOP kesin mevki vermez; en az iki LOP gerekir.",
      "2 LOP fix’te kesişim açısı ne kadar dikse güvenilirlik o kadar artar.",
      "3 LOP fix’te oluşan cocked hat, hata büyüklüğünü görsel olarak gösterir.",
      "Zaman farkı varsa LOP, seyir ve hızla paralel taşınır."
    ]
  },
  "Intercept yöntemi": {
    title: "Intercept Yöntemi (St. Hilaire Metodu)",
    introduction:
      "Intercept yöntemi, modern göksel seyirde en yaygın kullanılan mevki tayini tekniğidir. 19. yüzyılın sonunda Fransız subay Marcq St. Hilaire tarafından geliştirilen bu yöntem, gözlem ile hesaplama arasındaki farkı geometrik olarak yorumlayarak mevki hattı (LOP) elde etmeyi sağlar. Yöntemin gücü, doğrudan mesafe veya açı hesabı yapmadan, yalnızca 'ne kadar sapma var?' sorusunu yanıtlamasıdır.",
    sections: [
      {
        title: "Görsel Referanslar",
        content: `![Intercept geometrisi](https://www.onboardintelligence.com/CelestialNav/Images/astro2.gif)

![Toward / Away kuralı](https://easysextant.com/wp-content/uploads/2024/05/towards-or-away-from-the-sun-677x1024.jpg.webp)

![Intercept ve LOP ilişkisi](https://www.myseatime.com/blogadm/wp-content/uploads/2018/03/Position-line-from-intercept-method-concept.jpg)

![St. Hilaire metodu adımları](https://flyandwire.com/wp-content/uploads/2020/12/intercept-geometry-n-p2-definitions-rate-of-closure-tid-as-2.png?w=780)`
      },
      {
        title: "Yöntemin Temel Mantığı",
        content:
          "Intercept yöntemi şu basit soruyu yanıtlar: Varsayılan mevkiye (AP) göre hesaplanan teorik yükseklik (Hc) ile gerçekte gözlenen yükseklik (Ho) arasındaki fark nedir? Bu fark, gözlemcinin AP'den gök cismine olan doğrusal uzaklığını verir. Yöntem, doğrudan mevki vermez; ancak mevkinin üzerinde olması gereken bir doğru (LOP) tanımlar.",
        bulletPoints: [
          "AP, DR mevkiine yakın seçilen varsayılan mevkidir",
          "Hc, AP'ye göre hesaplanan teorik yüksekliktir",
          "Ho, sextant ölçümü ve düzeltmeler sonrası elde edilen gözlemsel yüksekliktir",
          "Intercept, Ho ile Hc arasındaki farktır ve doğrudan deniz miline dönüşür"
        ]
      },
      {
        title: "Adım 1: Varsayılan Mevki (AP) Seçimi",
        content:
          "AP seçimi, yöntemin başarısı için kritiktir. AP genellikle DR mevkiinin yakınında, hesaplamayı kolaylaştırmak için **tam derece enlem ve tam dakika boylam** olarak seçilir. Bunun nedeni, Sight Reduction Tablolarının (HO-249, HO-229) tam derece girişleri kabul etmesidir.",
        bulletPoints: [
          "DR mevkii 35° 42.5′ N, 028° 17.3′ E ise → AP: 36° 00′ N, 028° 00′ E seçilebilir",
          "AP ile gerçek mevki arasındaki fark tipik olarak 30-60 NM'den az tutulmalıdır",
          "Çok uzak AP seçimi, yöntemin geometrik doğruluğunu azaltır"
        ]
      },
      {
        title: "Adım 2: GHA, LHA ve Deklinasyon Hesabı",
        content:
          "Gözlem anının UTC zamanı ve Nautical Almanac kullanılarak gök cisminin Greenwich Hour Angle (GHA) ve Declination (Dec) değerleri bulunur. LHA, AP boylamı kullanılarak hesaplanır.",
        formula: {
          text: "LHA = GHA ± λ",
          description: "Doğu boylamda (+), Batı boylamda (−). Sonuç 0°–360° arasına normalize edilir."
        }
      },
      {
        title: "Adım 3: Sight Reduction ile Hc ve Zn Bulunması",
        content:
          "HO-249 veya HO-229 tabloları kullanılarak, AP enlemi (φ), gök cismi deklinasyonu (δ) ve LHA değerleri ile teorik yükseklik (Hc) ve azimut (Zn) okunur. Bu aşamada trigonometrik hesap gerekmez; tablolar doğrudan değer verir.",
        bulletPoints: [
          "Tabloya giriş: φ (AP enlemi), δ (deklinasyon), LHA",
          "Tablondan çıkış: Hc (hesaplanan yükseklik), Zn (azimut)",
          "İnterpolasyon gerekebilir (dakika değerleri için)"
        ]
      },
      {
        title: "Adım 4: Intercept (a) Hesabı",
        content:
          "Sextant ölçümü düzeltildikten sonra elde edilen Ho ile tablolardan bulunan Hc karşılaştırılır. Fark, intercept değerini verir.",
        formula: {
          text: "a = Ho − Hc",
          description: "a: intercept (dakika cinsinden, 1′ = 1 NM). Pozitif ise toward, negatif ise away."
        }
      },
      {
        title: "Adım 5: Toward / Away Kuralı",
        content:
          "Intercept'in yönü, geminin AP'ye göre gök cismine olan konumunu belirler. Bu kural, LOP çizimi için zorunludur.",
        bulletPoints: [
          "**Ho > Hc (a > 0)**: Gemi, AP'den gök cismine **daha yakındır** → TOWARD (gök cismine doğru)",
          "**Ho < Hc (a < 0)**: Gemi, AP'den gök cisminden **daha uzaktadır** → AWAY (gök cisminden uzağa)",
          "Hafıza kuralı: **HoMoTo** (Ho More, Toward) veya **Coast Guard Academy: 'Computed Greater Away'**"
        ]
      },
      {
        title: "Adım 6: LOP Çizimi",
        content:
          "Harita üzerinde AP işaretlenir. Zn doğrultusunda intercept mesafesi kadar ilerlenir (toward ise gök cismine doğru, away ise uzağa). Ulaşılan noktadan Zn'ye dik bir doğru çizilir. Bu doğru LOP'tur.",
        formula: {
          text: "LOP doğrultusu = Zn ± 90°",
          description: "LOP her zaman azimut doğrultusuna diktir."
        }
      },
      {
        title: "Tam Hesap Örneği",
        content: `**Gözlem Verileri:**
- UTC: 10:24:35
- DR mevkii: 36° 42′ N, 029° 18′ E
- Sextant ölçümü (Hs): 41° 23.4′
- Göz yüksekliği: 12 m
- İndeks hatası: +1.2′

**Adım 1 – AP Seçimi:**
AP: 37° N, 029° E

**Adım 2 – Düzeltilmiş Yükseklik (Ho):**
- Dip (12 m göz yüksekliği için tablo değeri): 6.1′
- Refraksiyon (tablo değeri): 1.2′
- SD = +16′ (Güneş alt kenar)

Ho = 41° 23.4′ + 1.2′ − 6.1′ − 1.2′ + 16′ = **41° 33.3′**

**Adım 3 – Almanak ve Sight Reduction:**
- GHA Güneş (10:24 UTC): 335° 42.5′
- Dec Güneş: 12° 15.3′ N
- LHA = 335° 42.5′ + 29° = 364° 42.5′ → **4° 42.5′**

HO-249 tablosu: φ = 37°, δ = 12°, LHA = 5° için:
- **Hc = 41° 26.8′**
- **Zn = 118°**

**Adım 4 – Intercept:**
a = Ho − Hc = 41° 33.3′ − 41° 26.8′ = **+6.5′ = 6.5 NM TOWARD**

**Adım 5 – LOP Çizimi:**
AP'den 118° doğrultusunda 6.5 NM ilerlenir. Ulaşılan noktadan 028°–208° doğrultusunda LOP çizilir.`
      },
      {
        title: "Yaygın Hatalar ve Önlemler",
        content:
          "Intercept yöntemi uygulamasında sık karşılaşılan hatalar ve bunlardan kaçınma yolları:",
        bulletPoints: [
          "**Yanlış AP seçimi**: AP'nin DR mevkiinden çok uzak olması geometrik hatayı artırır",
          "**LHA hesap hatası**: Doğu/Batı boylam işareti karıştırılması sık görülür",
          "**Toward/Away karışıklığı**: İşaret hatasının farkına varılmadan çizilen LOP tamamen yanlış konumlanır",
          "**İnterpolasyon ihmali**: Tablolarda ara değer alınmaması Hc'yi birkaç dakika kaydırabilir",
          "**Zn yarımküre hatası**: Doğu/Batı yarımküre kontrolü yapılmadan azimut yanlış yerleştirilir"
        ]
      }
    ],
    keyPoints: [
      "Intercept yöntemi, Ho ile Hc farkını geometrik mesafeye çevirir (1′ = 1 NM).",
      "AP, tam derece değerlerle seçilerek tablo kullanımı kolaylaştırılır.",
      "Toward/Away kuralı LOP yönünü belirler: Ho > Hc → gök cismine doğru.",
      "LOP, azimut doğrultusuna dik çizilir; intercept mesafesi bu doğrultuda taşınır.",
      "HO-249 veya HO-229 tabloları trigonometrik hesap ihtiyacını ortadan kaldırır."
    ]
  },
  "Göksel seyir hata analizi": {
    title: "Göksel Seyir Hata Analizi",
    introduction:
      "Göksel seyirde mevki tayini, birden fazla gözlem ve hesap adımının birleşimidir. Sextant ölçümünden başlayarak zaman, almanak, düzeltmeler ve çizim aşamalarına kadar her adımda yapılan küçük hatalar, nihai mevkide belirgin sapmalara yol açar. Hata analizi, hangi kaynakların mevki güvenilirliğini ne ölçüde etkilediğini anlamak ve bu etkileri minimize etmek için gereklidir. Profesyonel denizcilik pratiğinde, bir fix'in güvenilirliği yalnızca LOP kesişimiyle değil, hata kaynaklarının sistematik değerlendirilmesiyle belirlenir.",
    sections: [
      {
        title: "Görsel Referanslar",
        content: `![Cocked hat ve hata üçgeni](https://www.mdpi.com/energies/energies-14-01492/article_deploy/html/images/energies-14-01492-g001-550.jpg)

![LOP kesişim açılarının etkisi](https://www.researchgate.net/publication/352523373/figure/fig1/AS%3A1038230812102656%401624544923281/Different-types-of-intersections.png)

![Hata elipsi kavramı](https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Error_ellipse.svg/400px-Error_ellipse.svg.png)

![Zaman-boylam hata ilişkisi](https://astronavigationdemystified.com/wp-content/uploads/2015/09/nonum-diag26.jpg)`
      },
      {
        title: "Hata Türleri: Sistematik ve Rastgele",
        content:
          "Göksel seyirde hatalar iki ana kategoriye ayrılır. Bu ayrım, hatanın kaynağını ve düzeltme yöntemini belirler.",
        bulletPoints: [
          "**Sistematik hatalar**: Her gözlemde aynı yönde ve benzer büyüklükte tekrarlayan hatalardır. Örnek: Kalibre edilmemiş sextant, yanlış indeks hatası, hatalı kronometr.",
          "**Rastgele hatalar**: Ölçümden ölçüme değişen, tahmin edilemeyen hatalardır. Örnek: Gemi salınımı sırasında tepe yakalama, ufuk belirsizliği, atmosferik bozulmalar.",
          "Sistematik hatalar **tespit edilip düzeltilebilir**; rastgele hatalar yalnızca **çoklu gözlemle azaltılabilir**."
        ]
      },
      {
        title: "Zaman Hatası ve Boylam Etkisi",
        content:
          "Kronometredeki zaman hatası, boylam hesabını doğrudan etkiler. Dünya dakikada 15′ açı döndüğünden, zaman hatası geometrik olarak boylam hatasına dönüşür. Bu ilişki, göksel seyirdeki en kritik hata kaynaklarından biridir.",
        formula: {
          text: "Δλ = Δt × 15′/dakika",
          description: "4 saniye zaman hatası ≈ 1′ boylam hatası ≈ 1 NM (ekvatorda)"
        },
        bulletPoints: [
          "4 saniye zaman hatası → ekvatorda ~1 deniz mili boylam kayması",
          "1 dakika zaman hatası → ekvatorda ~15 deniz mili boylam kayması",
          "Yüksek enlemlerde boylam hatası azalır (cos φ etkisi)",
          "Kronometr kontrolü ve UTC senkronizasyonu zorunludur"
        ]
      },
      {
        title: "Sextant Ölçüm Hataları",
        content:
          "Sextant ile yapılan ölçümler, alet kaynaklı ve gözlemci kaynaklı hatalar içerir. Bu hatalar düzeltilmediğinde veya yanlış düzeltildiğinde, Ho değeri dakikalar mertebesinde sapabilir.",
        bulletPoints: [
          "**İndeks hatası (IE)**: Kontrol edilmeden yapılan gözlem sistematik olarak yanlıştır. Her seans öncesi kontrol zorunludur.",
          "**Göz yüksekliği tahmini**: Dip düzeltmesinde yanlış değer kullanımı. Her metre hata ≈ 0.5′ etki yaratır.",
          "**Tepe yakalama hatası**: Gemi salınımında yanlış an seçimi, 2-5′ hata yaratabilir.",
          "**Paralaks ve ufuk belirsizliği**: Düşük yüksekliklerde ufuk seçimi zorlaşır."
        ]
      },
      {
        title: "Yükseklik Düzeltme Hataları",
        content:
          "Her düzeltme adımı potansiyel bir hata kaynağıdır. Sıra ve işaret hataları, kümülatif olarak birikir.",
        bulletPoints: [
          "**Dip düzeltmesi**: Göz yüksekliği yanlış tahmin edilirse Dip değeri hatalı olur",
          "**Refraksiyon**: Standart atmosfer varsayımı her zaman geçerli değildir. Aşırı sıcak/soğuk havada ek düzeltme gerekir",
          "**SD (Yarıçap)**: Güneş/Ay kenar seçiminde hata, ±16′ sapma yaratır",
          "**Paralaks**: Özellikle Ay gözlemlerinde ihmal edilemez"
        ],
        formula: {
          text: "1′ yükseklik hatası ≈ 1 NM mevki hatası",
          description: "Yükseklik ile mevki arasında doğrudan ilişki vardır."
        }
      },
      {
        title: "LOP Kesişim Geometrisi ve Hata Büyütmesi",
        content:
          "İki veya daha fazla LOP'un kesişim açısı, fix güvenilirliğini doğrudan etkiler. Dar açılı kesişimler, küçük ölçüm hatalarını büyük mevki hatalarına dönüştürür.",
        bulletPoints: [
          "**90° kesişim (ideal)**: Hatalar minimum büyütülür, en güvenilir fix",
          "**60°-120° kesişim**: Kabul edilebilir güvenilirlik",
          "**30°'den dar kesişim**: Hata büyütmesi ciddi, fix güvenilmez",
          "**Paralel LOP'lar**: Kesişim noktası belirsiz, pratik değeri yoktur"
        ],
        formula: {
          text: "Dar açılı kesişim → Hata büyür | Dik açılı kesişim → Hata minimize",
          description: "30° kesişimde hata yaklaşık 2 kat, 15° kesişimde hata yaklaşık 4 kat büyür."
        }
      },
      {
        title: "Cocked Hat (Hata Üçgeni) Analizi",
        content:
          "Üç LOP'un bir noktada kesişmemesi normaldir. Oluşan üçgen, 'cocked hat' olarak adlandırılır ve hata büyüklüğünün görsel göstergesidir.",
        bulletPoints: [
          "**Küçük cocked hat** (< 2 NM kenar): Gözlemler tutarlı, fix güvenilir",
          "**Orta cocked hat** (2-5 NM kenar): Kabul edilebilir, ancak dikkatli yorumlanmalı",
          "**Büyük cocked hat** (> 5 NM kenar): Sistematik hata işareti, gözlemler kontrol edilmeli",
          "Üçgen büyüklüğü, zaman bilgisi veya gözlemlerdeki hatayı gösterir"
        ]
      },
      {
        title: "Most Probable Position (MPP)",
        content:
          "Cocked hat oluştuğunda, geminin en olası konumu (MPP) belirlenir. MPP, üçgenin geometrik merkezi olmayabilir; LOP güvenilirliklerine göre ağırlıklı ortalama alınır.",
        bulletPoints: [
          "Tüm LOP'lar eşit güvenilirlikte ise: MPP, üçgenin ağırlık merkezidir (centroid)",
          "Bir LOP daha güvenilir ise: MPP, o LOP'a daha yakın konumlanır",
          "Tehlike yakınında: MPP, tehlikeye en yakın noktada varsayılır (emniyet prensibi)",
          "Pratikte en kötü durum senaryosu tercih edilir"
        ]
      },
      {
        title: "Sayısal Örnek: Hata Analizi",
        content: `**Senaryo:**
- Üç yıldızdan gözlem alındı
- Kronometr hatası: ±2 saniye
- Sextant okunuşunda tahmin edilen hata: ±0.5′
- LOP kesişim açıları: 60°, 75°, 45°

**Zaman Kaynaklı Hata:**
Δt = 2 s → Δλ ≈ 0.5′ → ~0.5 NM (ekvatorda)

**Yükseklik Kaynaklı Hata:**
0.5′ yükseklik hatası → ~0.5 NM mevki hatası

**Kesişim Geometrisi Etkisi:**
En dar açı 45° → Hata büyütme faktörü ≈ 1.4
0.5 NM × 1.4 ≈ 0.7 NM

**Tahmini Toplam Hata:**
Cocked hat boyutu: ~1-2 NM beklenir
Bu senaryoda fix güvenilirdir.`
      },
      {
        title: "Hata Minimizasyonu İçin Pratik Öneriler",
        content:
          "Göksel seyirde hata kaynaklarını azaltmak için sistematik bir yaklaşım gereklidir.",
        bulletPoints: [
          "**Kronometr kontrolü**: Her gözlem serisinden önce UTC doğrulaması yapılmalı",
          "**İndeks hatası kontrolü**: Her gözlem seansında ufuk-ufuk veya Güneş-Güneş yöntemiyle kontrol",
          "**Çoklu gözlem**: En az 3, tercihen 5-7 gözlem ortalaması alınmalı",
          "**Gök cismi seçimi**: 60°-120° azimut farkı olan cisimler tercih edilmeli",
          "**Twilight kullanımı**: Yıldız gözlemleri için ufuk görünürlüğü kritik",
          "**Hesap çapraz kontrolü**: Farklı yöntemlerle (tablo + hesap makinesi) doğrulama"
        ]
      },
      {
        title: "Emniyet Prensibi",
        content:
          "Belirsizlik durumunda, seyir emniyeti her zaman önceliklidir. Fix'in güvenilirliği sorgulandığında, tehlikeye en yakın yorumlama yapılmalıdır.",
        bulletPoints: [
          "Cocked hat tehlikeye yakınsa: MPP tehlike tarafında varsayılır",
          "Büyük hata üçgeni: Fix'e güvenilmemeli, ek gözlem alınmalı",
          "Tek LOP: Riskli bölgelerde kesinlikle tek LOP'a güvenilmemeli",
          "Prensip: 'Şüphe durumunda emniyet tarafında kal'"
        ]
      }
    ],
    keyPoints: [
      "Sistematik hatalar tespit edilip düzeltilebilir; rastgele hatalar çoklu gözlemle azaltılır.",
      "4 saniye zaman hatası ≈ 1 NM boylam hatası (ekvatorda).",
      "1′ yükseklik hatası ≈ 1 NM mevki hatası.",
      "LOP kesişim açısı 90°'ye ne kadar yakınsa fix o kadar güvenilirdir.",
      "Cocked hat büyüklüğü, gözlem tutarlılığının görsel göstergesidir.",
      "MPP, tehlike yakınında en kötü senaryoya göre belirlenir."
    ]
  },
  "GPS sınırlamaları ve operasyonel riskler": {
    title: "GPS Sınırlamaları ve Operasyonel Riskler",
    introduction:
      "GPS yüksek doğruluk sağlar; ancak denizcilikte mutlak güvenilir bir sistem değildir. Sinyalin dış kaynağa bağımlı olması, elektromanyetik ortamdan etkilenmesi ve fiziksel engellerle zayıflaması nedeniyle operasyonel sınırlamalar oluşur. Bu sınırlamalar göz ardı edildiğinde özellikle dar sularda ve yoğun trafikte ciddi seyir riskleri ortaya çıkar.",
    sections: [
      {
        title: "Görsel Referanslar",
        content: `![Image](https://www.researchgate.net/publication/251910114/figure/fig1/AS%3A666789058973702%401535986308510/GPS-environment-and-multipath-signals.jpg)

![Image](https://www.groundcontrol.com/wp-content/uploads/2025/05/Diagram-of-RockBLOCK-APNT-in-Maritime-Application.jpg)

![Image](https://cruisingclub.org/sites/default/files/inline-images/Picture6.png)

![Image](https://cruisingclub.org/sites/default/files/inline-images/Picture5.png)`
      },
      {
        title: "Operasyonel Sınırlamalar",
        content:
          "Gemi üstyapısı, vinçler, radar direkleri ve konteyner yığınları GPS anteni için gölgeleme yaratabilir. Bu durum belirli yönlerden gelen uydu sinyallerinin kaybına ve uydu geometrisinin bozulmasına neden olur. Geometri bozulduğunda konum hâlâ hesaplanabilir; ancak hata büyür ve alıcı bunu her zaman açıkça kullanıcıya bildirmez."
      },
      {
        title: "Çok Yollu (Multipath) Sinyal Yayılımı",
        content:
          "Sinyalin metal yüzeylerden yansıyarak alıcıya gecikmeli ulaşması, sözde mesafenin olduğundan uzun hesaplanmasına yol açar. Liman sahaları ve iskele bölgeleri bu etkinin en yoğun görüldüğü alanlardır."
      },
      {
        title: "Kasıtlı Bozma ve Aldatma Tehdidi",
        content:
          "Modern seyirde giderek artan bir tehdit de kasıtlı sinyal bozma ve aldatmadır. GPS karıştırma ve sahte sinyal yayını, alıcının yanlış konum üretmesine neden olabilir. Bu durumda sistem çalışıyor gibi görünür; ancak üretilen mevki gerçek dışıdır. Denizcilikte bu durum, açıkça fark edilmediği sürece en tehlikeli GPS arızası türüdür."
      },
      {
        title: "Formüller",
        content: `**Çok yollu etkisiyle ölçülen mesafe**  
Ölçülen mesafe = Gerçek mesafe + Yansıma gecikmesi × Işık hızı

**Geometri bozulmasının yatay hataya etkisi**  
Yatay hata = HDOP × UERE

HDOP’un büyümesi, hata büyümesini doğrusal olarak artırır.`
      },
      {
        title: "Örnek Hesap",
        content: `**Koşullar**  
UERE = 5 m  
Normal seyirde HDOP = 1,2  
Gölgeleme sonrası HDOP = 3,5

**Adım 1: Normal şartlarda yatay hata**  
Yatay hata = 1,2 × 5 = 6 m

**Adım 2: Gölgeleme sonrası yatay hata**  
Yatay hata = 3,5 × 5 = 17,5 m

**Adım 3: Sonucun değerlendirilmesi**  
Hata artışı = 17,5 − 6 = 11,5 m

Bu sonuç, geminin gerçek konumundan yaklaşık 18 metre sapabileceğini gösterir. Açık denizde bu fark tolere edilebilirken, rıhtıma yaklaşma veya dar kanal geçişinde kabul edilemez bir emniyet açığı yaratır. Bu nedenle GPS, denizcilikte tek başına bir seyir sistemi olarak değil; radar, pusula, görsel mevki ve seyir tecrübesi ile birlikte kullanılan yardımcı bir sistem olarak ele alınmak zorundadır.`
      }
    ],
    keyPoints: [
      "Gölgeleme ve uydu geometrisi bozulması HDOP’u büyütür, hata artar.",
      "Multipath, sözde mesafeyi uzatarak mevki sapması üretir.",
      "Karıştırma ve aldatma, çalışıyor görünen fakat yanlış mevki üreten en kritik risktir.",
      "GPS tek başına değil, radar, pusula ve görsel mevki ile çapraz kontrol edilmelidir."
    ]
  },
  "Düzlem seyir varsayımı": {
    title: "Düzlem Seyir Varsayımı (Plane Sailing Assumption)",
    introduction:
      "Düzlem seyir, kısa mesafelerde Dünya'nın küresel şeklinin ihmal edilebilir kabul edildiği ve seyir hesaplarının düzlem geometri ile yapıldığı bir yaklaşımdır. Bu varsayım, meridyenlerin paralel olduğunu ve boylam dakikasının sabit uzunlukta olduğunu kabul eder. Bowditch'e göre düzlem seyir, meridyenlerin yakınsamamasını göz ardı ederek kısa rotalar için basit ve pratik çözümler sunar.",
    sections: [
      {
        title: "Görsel Referanslar",
        content: `![Image](https://marinegyaan.com/wp-content/uploads/2016/09/plane-sailing.jpg)

![Image](https://astronavigationdemystified.com/wp-content/uploads/2016/09/diag15-mod.jpg)

![Image](https://maritimesa.org/nautical-science-grade-11/wp-content/uploads/sites/6/2020/10/11.1.1.2_fig_1.jpg)`
      },
      {
        title: "Temel Varsayım",
        content:
          "Düzlem seyirde Dünya'nın küreselliği göz ardı edilir. Meridyenler paralel kabul edilir ve boylam dakikasının uzunluğu her enlemde sabit alınır. Bu varsayım, yaklaşık 60 deniz miline kadar olan seyirlerde kabul edilebilir doğruluk sağlar.",
        bulletPoints: [
          "Meridyenler paralel kabul edilir",
          "Boylam dakikası uzunluğu sabit varsayılır",
          "Dünya yüzeyi düz düzlem olarak modellenir",
          "Kısa mesafelerde hata ihmal edilebilir düzeydedir"
        ]
      },
      {
        title: "Düzlem Seyir Üçgeni",
        content:
          "Düzlem seyirde geminin hareketi, dik açılı bir üçgen olarak temsil edilir. Hipotenüs seyredilen mesafeyi (D), bir dik kenar DLat'i (kuzey-güney bileşeni), diğer dik kenar departure'ı (doğu-batı bileşeni) temsil eder. Kurs açısı (C), hakiki kuzey ile seyir hattı arasındaki açıdır.",
        formula: {
          text: "DLat = D × cos(C) | Departure = D × sin(C)",
          description: "D: seyredilen mesafe (NM), C: hakiki rota, DLat ve Departure dakika/NM cinsinden."
        }
      },
      {
        title: "Ters Problem: Kurs ve Mesafe Hesabı",
        content:
          "DLat ve departure bilindiğinde, kurs ve mesafe hesaplanabilir. Bu problem, iki noktanın koordinatları verildiğinde aralarındaki rota ve mesafeyi bulmak için kullanılır.",
        formula: {
          text: "tan(C) = Departure ÷ DLat | D = DLat ÷ cos(C)",
          description: "DLat ve departure bilinen değerlerdir; kurs ve mesafe hesaplanır."
        }
      },
      {
        title: "Sınırlamalar",
        content:
          "Düzlem seyir varsayımı, mesafe arttıkça ve özellikle doğu-batı bileşeni büyüdükçe artan hatalar üretir. Bu nedenle orta ve uzun mesafelerde orta enlem seyri veya büyük daire seyri tercih edilmelidir.",
        bulletPoints: [
          "Yaklaşık 60 NM'ye kadar güvenilir sonuç verir",
          "Yüksek enlemlerde hata daha hızlı büyür",
          "Doğu-batı seyirlerinde departure hatası belirginleşir",
          "Uzun mesafelerde orta enlem düzeltmesi gerekir"
        ]
      }
    ],
    keyPoints: [
      "Düzlem seyir, kısa mesafelerde Dünya'nın düz kabul edildiği pratik bir yöntemdir.",
      "Seyir üçgeni: DLat = D × cos(C), Departure = D × sin(C).",
      "Ters problem: tan(C) = Departure ÷ DLat.",
      "Yaklaşık 60 NM'ye kadar kabul edilebilir doğruluk sağlar.",
      "Uzun mesafelerde meridyen yakınsaması nedeniyle hata artar."
    ]
  },
  "DLat (Enlem değişimi)": {
    title: "DLat (Enlem Değişimi / Difference of Latitude)",
    introduction:
      "DLat (Difference of Latitude), bir geminin seyir sırasında enlem doğrultusunda kat ettiği açısal değişimi ifade eder. Bu değer, dakika (') cinsinden ölçülür ve 1' enlem = 1 deniz mili eşitliği nedeniyle doğrudan kuzey-güney mesafesine karşılık gelir. Bowditch'e göre DLat, düzlem seyirin temel bileşenlerinden biridir ve seyir üçgeninin dikey kenarını oluşturur.",
    sections: [
      {
        title: "Görsel Referanslar",
        content: `![Image](https://maritimesa.org/nautical-science-grade-11/wp-content/uploads/sites/6/2020/10/11.1.1.2_fig_1.jpg)

![Image](https://jerrymahun.com/images/open_access/trav_comps/lats_deps/img17.gif)

![Image](https://marinegyaan.com/wp-content/uploads/2016/09/plane-sailing.jpg)`
      },
      {
        title: "Tanım",
        content:
          "DLat, varış noktasının enlemi ile kalkış noktasının enlemi arasındaki farktır. Kuzeye gidildiğinde DLat pozitif (N), güneye gidildiğinde negatif (S) kabul edilir.",
        formula: {
          text: "DLat = Varış Enlemi − Kalkış Enlemi",
          description: "Sonuç dakika (') veya derece-dakika formatında ifade edilir."
        }
      },
      {
        title: "Mesafe ile DLat İlişkisi",
        content:
          "Düzlem seyirde DLat, seyredilen mesafe ve kursun kosinüsü çarpımı ile hesaplanır. Bu, seyir üçgeninin dikey bileşenidir.",
        formula: {
          text: "DLat = Mesafe × cos(Kurs)",
          description: "Mesafe deniz mili, kurs hakiki rota (°T) cinsindendir. Sonuç dakika olarak DLat'i verir."
        }
      },
      {
        title: "Sayısal Örnek",
        content: `**Verilen:**
- Kalkış enlemi: 34° 20.0' N
- Seyredilen mesafe: 85 NM
- Hakiki rota: 035°

**Hesap:**
DLat = 85 × cos(35°)
DLat = 85 × 0.8192
DLat = 69.6' N (≈ 1° 09.6' N)

**Varış Enlemi:**
34° 20.0' + 1° 09.6' = 35° 29.6' N`,
        bulletPoints: [
          "cos(35°) ≈ 0.8192",
          "DLat pozitif olduğundan kuzey yönünde hareket var",
          "Sonuç varış enlemini bulmak için kalkış enlemine eklenir"
        ]
      },
      {
        title: "İşaret Kuralları",
        content:
          "DLat'in işareti, geminin hareket yönünü gösterir. Kuzey yarımkürede kuzeye giderken DLat pozitif, güneye giderken negatiftir. Ekvatorun geçildiği durumlarda işaret değişimi dikkatle hesaba katılmalıdır.",
        bulletPoints: [
          "Kuzeye hareket: DLat pozitif (N)",
          "Güneye hareket: DLat negatif (S)",
          "Ekvator geçişi: İşaret değişimi zorunlu",
          "Farklı yarımküreler arası: Mutlak değerler toplanır"
        ]
      }
    ],
    keyPoints: [
      "DLat, enlem doğrultusundaki açısal değişimdir (dakika cinsinden).",
      "1' DLat = 1 deniz mili kuzey-güney mesafesi.",
      "DLat = Mesafe × cos(Kurs) formülü düzlem seyirde temeldir.",
      "Kuzeye hareket pozitif, güneye hareket negatif işaretlidir.",
      "Ekvator geçişlerinde işaret kurallarına dikkat edilmelidir."
    ]
  },
  "Akıntısız seyir hesapları": {
    title: "Akıntısız Seyir Hesapları (Sailing Without Current)",
    introduction:
      "Akıntısız seyir hesapları, rüzgâr ve akıntı etkilerinin ihmal edildiği ideal koşullarda yapılan temel seyir hesaplamalarıdır. Bowditch'e göre bu hesaplar, geminin su üzerindeki hızı (STW) ve pusuladan okunan rotanın (heading) doğrudan kullanıldığı en basit seyir senaryosunu temsil eder. Gerçek koşullarda akıntı ve rüzgâr eklendiğinde, bu temel hesaplar üzerine vektörel düzeltmeler uygulanır.",
    sections: [
      {
        title: "Görsel Referanslar",
        content: `![Image](https://tdgil.com/wp-content/uploads/2020/04/DR-Plot.png)

![Image](https://upload.wikimedia.org/wikipedia/commons/e/ed/Dead-reckoning.svg)

![Image](https://marinegyaan.com/wp-content/uploads/2016/09/plane-sailing.jpg)`
      },
      {
        title: "Temel Varsayımlar",
        content:
          "Akıntısız seyir hesaplarında geminin rotası (heading) ve su üzerindeki hızı (STW) sabit ve biliniyor kabul edilir. Dış etkiler olmadığından COG = Heading ve SOG = STW olur.",
        bulletPoints: [
          "Akıntı hızı: 0 knot",
          "Rüzgâr kayması (leeway): 0°",
          "COG = Heading (Geminin rotası)",
          "SOG = STW (Su üzerindeki hız)"
        ]
      },
      {
        title: "Ölü Hesap (Dead Reckoning) Mantığı",
        content:
          "Akıntısız koşullarda ölü hesap, en basit formunda uygulanır. Son bilinen mevkiden itibaren rota ve hız kullanılarak belirli bir süre sonundaki mevki hesaplanır.",
        formula: {
          text: "Mesafe = Hız × Zaman | DLat = D × cos(C) | Dep = D × sin(C)",
          description: "Bu üç formül akıntısız DR hesabının temelini oluşturur."
        }
      },
      {
        title: "Sayısal Örnek",
        content: `**Verilen:**
- Son bilinen mevki: 35° 00.0' N, 010° 00.0' E
- Rota: 060°T
- Hız: 12 knots
- Süre: 3 saat

**Adım 1: Mesafe**
D = 12 × 3 = 36 NM

**Adım 2: DLat**
DLat = 36 × cos(60°) = 36 × 0.5 = 18.0' N

**Adım 3: Departure**
Dep = 36 × sin(60°) = 36 × 0.866 = 31.2 NM E

**Adım 4: DLong**
Ortalama Enlem ≈ 35° 09'
DLong = 31.2 ÷ cos(35° 09') = 31.2 ÷ 0.817 = 38.2' E

**Adım 5: Varış Mevkii**
Enlem: 35° 00.0' + 18.0' = 35° 18.0' N
Boylam: 010° 00.0' + 38.2' = 010° 38.2' E

**DR Mevkii: 35° 18.0' N, 010° 38.2' E**`
      },
      {
        title: "Akıntısız Hesabın Sınırlamaları",
        content:
          "Gerçek deniz koşullarında tamamen akıntısız seyir nadiren mümkündür. Bu hesaplar, gerçek mevkinin kabaca tahmin edilmesi için başlangıç noktası oluşturur; ancak fix alınarak doğrulanmalıdır.",
        bulletPoints: [
          "Sadece teorik koşullarda tam doğrudur",
          "Akıntı ve rüzgâr etkisi gerçekte her zaman mevcuttur",
          "DR mevkii fix ile doğrulanmalıdır",
          "EP (Estimated Position) için akıntı ve leeway eklenir"
        ]
      }
    ],
    keyPoints: [
      "Akıntısız seyirde COG = Heading ve SOG = STW varsayılır.",
      "Mesafe = Hız × Zaman temel bağıntısıdır.",
      "DR mevkii: DLat ve Dep hesaplanarak elde edilir.",
      "Gerçek koşullarda akıntı ve rüzgâr düzeltmesi eklenir.",
      "DR mevkii her zaman fix ile doğrulanmalıdır."
    ]
  },
  "Kerteriz türleri": {
    title: "Kerteriz Türleri (Types of Bearings)",
    introduction:
      "Kerteriz (bearing), seyirde bir hedefin gözlemciye göre yönünü ifade eden açısal değerdir. Bowditch'e göre kerterizler, referans sistemine göre üç ana türe ayrılır: hakiki kerteriz (true bearing), manyetik kerteriz (magnetic bearing) ve nispi kerteriz (relative bearing). Bu türlerin doğru anlaşılması ve birbirine dönüştürülmesi, mevki tayini ve seyir emniyeti için kritik öneme sahiptir.",
    sections: [
      {
        title: "Görsel Referanslar",
        content: `![Image](https://sailingissues.com/drie/convert-east-west-magnetic-variation-true-courses.png)

![Image](https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Compass_rose_en.svg/800px-Compass_rose_en.svg.png)

![Image](https://www.researchgate.net/publication/341492181/figure/fig1/AS%3A892957544681472%401589909077213/Magnetic-bearings-and-relative-bearings-4.jpg)`
      },
      {
        title: "Hakiki Kerteriz (True Bearing)",
        content:
          "Hakiki kerteriz, bir hedefin hakiki kuzeye göre ölçülen açısal yönüdür. Harita üzerinde çizilen tüm kerterizler hakiki sistemdedir. Hakiki kerteriz 000°T ile 360°T arasında ifade edilir ve meridyenlerle doğrudan ilişkilidir.",
        bulletPoints: [
          "Referans: Hakiki kuzey (True North)",
          "Gösterim: 045°T, 180°T, 270°T gibi",
          "Harita üzerinde doğrudan ölçülür",
          "Göksel seyir ve GPS çıktılarında standart"
        ]
      },
      {
        title: "Manyetik Kerteriz (Magnetic Bearing)",
        content:
          "Manyetik kerteriz, bir hedefin manyetik kuzeye göre ölçülen açısal yönüdür. Manyetik pusula ile alınan ham okumalar manyetik sistemdedir. Hakiki kerterize dönüşüm için variation düzeltmesi gerekir.",
        formula: {
          text: "Hakiki Kerteriz = Manyetik Kerteriz + Variation",
          description: "Variation doğu (+), batı (−) olarak uygulanır."
        },
        bulletPoints: [
          "Referans: Manyetik kuzey",
          "Gösterim: 045°M, 180°M gibi",
          "Manyetik pusula ile ölçülür",
          "Variation düzeltmesi ile hakikiye çevrilir"
        ]
      },
      {
        title: "Pusula Kerterizi (Compass Bearing)",
        content:
          "Pusula kerterizi, gemideki manyetik pusuladan doğrudan okunan değerdir. Bu değer hem variation hem de deviation (gemi manyetik sapması) içerir. Hakiki kerterize dönüşüm için her iki düzeltme de uygulanmalıdır.",
        formula: {
          text: "Hakiki Kerteriz = Pusula Kerterizi + Variation + Deviation",
          description: "Deviation, geminin rotasına göre değişen tablolardan okunur."
        }
      },
      {
        title: "Nispi Kerteriz (Relative Bearing)",
        content:
          "Nispi kerteriz, bir hedefin geminin baş doğrultusuna (heading) göre ölçülen açısal konumudur. Saat yönünde 000° (tam baş) ile 360° arasında ifade edilir. Radar ve görsel gözlemlerde yaygın kullanılır.",
        formula: {
          text: "Hakiki Kerteriz = Geminin Hakiki Rotası + Nispi Kerteriz",
          description: "Sonuç 360°'yi aşarsa 360° çıkarılır."
        },
        bulletPoints: [
          "000° = Tam baş (dead ahead)",
          "090° = Sancak tam trabzan (starboard beam)",
          "180° = Tam kıç (dead astern)",
          "270° = İskele tam trabzan (port beam)"
        ]
      },
      {
        title: "Sayısal Örnek: Nispi → Hakiki Dönüşümü",
        content: `**Verilen:**
- Geminin hakiki rotası: 045°T
- Hedef nispi kerterizi: 120° (sancak tarafta)

**Hesap:**
Hakiki Kerteriz = 045° + 120° = 165°T

**Sonuç:**
Hedef, hakiki kuzeye göre 165° doğrultusundadır.

---

**İkinci Örnek:**
- Geminin hakiki rotası: 320°T
- Hedef nispi kerterizi: 080°

**Hesap:**
Hakiki Kerteriz = 320° + 080° = 400°
400° > 360° → 400° − 360° = 040°T

**Sonuç:**
Hedef, hakiki kuzeye göre 040° doğrultusundadır.`
      },
      {
        title: "Dönüşüm Özeti",
        content:
          "Kerteriz türleri arasındaki dönüşümler, seyirde sürekli kullanılan temel işlemlerdir.",
        bulletPoints: [
          "Pusula → Manyetik: Deviation ekle",
          "Manyetik → Hakiki: Variation ekle",
          "Nispi → Hakiki: Geminin hakiki rotasını ekle",
          "Doğu variation/deviation: Pozitif (+)",
          "Batı variation/deviation: Negatif (−)"
        ]
      }
    ],
    keyPoints: [
      "Hakiki kerteriz: Hakiki kuzeye göre, harita standardı.",
      "Manyetik kerteriz: Manyetik kuzeye göre, pusula okuması.",
      "Nispi kerteriz: Gemi başına göre, radar/görsel gözlem.",
      "Dönüşüm formülü: Hakiki = Pusula + Var + Dev.",
      "Nispi → Hakiki: Geminin hakiki rotası + nispi kerteriz."
    ]
  },
  "Running fix (klasik)": {
    title: "Running Fix (Koşmalı Mevki Tayini)",
    introduction:
      "Running fix, yalnızca tek bir seyir yardımcısının (NAVAID) görünür olduğu durumlarda, farklı zamanlarda alınan iki kerteriz kullanılarak mevki tayini yapılmasıdır. Bowditch'e göre bu yöntem, ilk kerteriz hattının (LOP) geminin hareketi kadar ilerletilmesi ve ikinci kerteriz ile kesiştirilmesi esasına dayanır. Açık denizde tek fener görünüyorken veya kıyı boyunca seyirde kritik bir tekniktir.",
    sections: [
      {
        title: "Görsel Referanslar",
        content: `![Image](https://sailingissues.com/courses/images/runningfix.png)

![Image](https://tdgil.com/wp-content/uploads/2020/04/Running-Fix.png)

![Image](https://maritimesa.org/nautical-science-grade-11/wp-content/uploads/sites/6/2020/10/11.1.2.3_fig_1.jpg)`
      },
      {
        title: "Temel Prensip",
        content:
          "Running fix, aynı hedefe farklı zamanlarda alınan iki kerterizin birlikte değerlendirilmesiyle elde edilir. İlk kerteriz alındığında geminin mevkii bu hat üzerindedir ancak tam yeri belirsizdir. Gemi hareket ettikten sonra ikinci kerteriz alındığında, ilk kerteriz geminin aldığı mesafe ve rota kadar ilerletilir. Bu ilerletilmiş LOP ile ikinci LOP'un kesişimi running fix'tir.",
        bulletPoints: [
          "Tek NAVAID ile mevki tayini sağlar",
          "İki farklı zamanda kerteriz alınır",
          "İlk LOP, rota ve mesafe kadar ilerletilir",
          "Kesişim noktası running fix olarak işaretlenir"
        ]
      },
      {
        title: "Uygulama Adımları",
        content: `**Adım 1:** İlk kerterizi al ve zamanı kaydet (T₁)
**Adım 2:** İlk LOP'u haritaya çiz
**Adım 3:** Seyire devam et, ikinci kerterizi al (T₂)
**Adım 4:** Geçen süre ve hızdan mesafeyi hesapla: D = V × (T₂ − T₁)
**Adım 5:** İlk LOP üzerinde herhangi bir noktadan, geminin rotası doğrultusunda hesaplanan mesafe kadar ilerlet
**Adım 6:** İlerletilmiş LOP'u çiz (orijinal LOP'a paralel)
**Adım 7:** İkinci LOP ile kesişim noktasını bul → Running Fix`,
        formula: {
          text: "D = V × Δt",
          description: "D: ilerletme mesafesi (NM), V: hız (kn), Δt: zaman farkı (saat)."
        }
      },
      {
        title: "Sayısal Örnek",
        content: `**Verilen:**
- Saat 10:00'da fener kerterizi: 045°T
- Saat 10:30'da fener kerterizi: 090°T
- Geminin rotası: 270°T
- Geminin hızı: 12 knot

**Adım 1: Mesafe hesabı**
Δt = 30 dakika = 0.5 saat
D = 12 × 0.5 = 6 NM

**Adım 2: İlerletme**
İlk LOP (045°T) üzerinden herhangi bir nokta seçilir
Bu noktadan 270° doğrultusunda 6 NM ilerletilir
İlerletilmiş LOP çizilir (045°T'ye paralel)

**Adım 3: Kesişim**
İlerletilmiş LOP ile ikinci LOP (090°T) kesiştirilir
Kesişim noktası = Running Fix (10:30)

**Sonuç:** Gemi saat 10:30'da bu noktadadır.`
      },
      {
        title: "Doubled Angle on the Bow",
        content:
          "Özel bir running fix tekniğidir. İlk kerteriz açısı, ikinci kerterizde tam iki katına ulaştığında, alınan mesafe ile hedefe olan mesafe eşit olur (ikizkenar üçgen prensibi).",
        bulletPoints: [
          "İlk açı: a (örn. 30°)",
          "İkinci açı: 2a (örn. 60°)",
          "Log mesafesi = Hedefe mesafe",
          "Four Point Fix: a=45°, 2a=90° özel durumu"
        ],
        formula: {
          text: "Açı ikiye katlandığında: d₁ = d₂ (ikizkenar üçgen)",
          description: "d₁: alınan mesafe, d₂: hedefe mesafe"
        }
      },
      {
        title: "Sınırlamalar ve Dikkat Edilecekler",
        content:
          "Running fix, akıntı ve rüzgâr etkilerini hesaba katmaz. Bu nedenle elde edilen mevki, gerçek mevkiden sapabilir. Akıntılı sularda EP (Estimated Position) yaklaşımı ile birleştirilmelidir.",
        bulletPoints: [
          "Akıntı etkisi dahil değildir",
          "İki kerteriz arası süre uzadıkça hata artar",
          "Açı farkı büyük olmalı (ideal: 45°-90°)",
          "Akıntılı sularda EP düzeltmesi gerekir"
        ]
      }
    ],
    keyPoints: [
      "Running fix, tek NAVAID ile iki kerteriz kullanarak mevki tayini yapar.",
      "İlk LOP, rota ve mesafe kadar ilerletilir.",
      "D = V × Δt formülüyle ilerletme mesafesi hesaplanır.",
      "Doubled angle tekniği: Açı 2 katına ulaşınca log mesafesi = hedefe mesafe.",
      "Akıntı ve rüzgâr etkisi dahil edilmediğinden hata payı vardır."
    ]
  },
  "Harita datum": {
    title: "Harita Datum",
    introduction:
      "Harita datum, coğrafi koordinatların (enlem–boylam) hangi referans elipsoidine göre verildiğini ifade eder. Aynı koordinat değerleri, farklı datumlarda farklı coğrafi noktaları gösterebilir.",
    sections: [
      {
        title: "Datum Nedir?",
        content:
          "Datum; harita ve elektronik sistemlerin kullandığı referans modelidir. WGS-84, modern GPS ve ECDIS sistemlerinde standart datumdur.",
        image: chartPlotting,
        imageAlt: "Harita datum ve mevki referansı"
      },
      {
        title: "Seyirde Etkisi",
        content:
          "Haritada yazan datum ile cihaz datumunun uyuşmaması, mevkiyi yüzlerce metre kaydırabilir. Bu nedenle GPS/ECDIS datum ayarı, kullanılan kağıt haritanın datumuna eşitlenmelidir.",
        bulletPoints: [
          "Harita kenar bilgisinden datum kontrol edilir",
          "Cihaz datum ayarı doğrulanır",
          "Farklı datumlar arasında offset düzeltmesi yapılır"
        ]
      }
    ],
    keyPoints: [
      "Datum, koordinatların referans modelidir.",
      "WGS-84, güncel navigasyon sistemlerinde standarttır.",
      "Yanlış datum ayarı mevkiyi kaydırır."
    ]
  },
  "Mesafe ölçümü": {
    title: "Mesafe Ölçümü",
    introduction:
      "Deniz haritalarında mesafe ölçümü, haritanın kenarındaki enlem skalası üzerinden yapılır. Çünkü 1′ enlem = 1 deniz milidir.",
    sections: [
      {
        title: "Doğru Ölçüm Pratiği",
        content:
          "Mesafe ölçerken parakete veya pergel ucu, ölçüm yapılacak enleme yakın yerleştirilir. Böylece ölçek hatası minimize edilir.",
        image: chartPlotting,
        imageAlt: "Harita üzerinde mesafe ölçümü"
      },
      {
        title: "Sık Hatalar",
        content:
          "Boylam skalası mesafe için kullanılmaz. Harita ölçeği büyüdükçe ölçüm hassasiyeti artar.",
        bulletPoints: [
          "Enlem skalası kullanılır",
          "Ölçüm, en yakın enlemde yapılır",
          "Ölçek büyüdükçe hassasiyet artar"
        ]
      }
    ],
    keyPoints: [
      "1′ enlem = 1 deniz mili kabul edilir.",
      "Mesafe, enlem skalasından ölçülür.",
      "Boylam skalası mesafe ölçümü için uygun değildir."
    ]
  },
  "Boylam değişimi hesapları": {
    title: "Boylam Değişimi Hesapları",
    introduction:
      "Boylam değişimi, seyredilen doğu–batı mesafenin enleme bağlı olarak boylama çevrilmesiyle bulunur. Enlem arttıkça 1′ boylamın uzunluğu küçülür.",
    sections: [
      {
        title: "Temel Mantık",
        content:
          "Doğu–batı mesafe (departure), ortalama enlemdeki boylam dakikasıyla ilişkilidir. Bu ilişki, orta enlem seyri hesaplarının temelidir.",
        image: mercatorProjection,
        imageAlt: "Boylam değişimi ve Mercator projeksiyonu"
      },
      {
        title: "Uygulama Notu",
        content:
          "Boylam değişimi hesaplarında enlem işareti ve doğu–batı yönü doğru yorumlanmalıdır.",
        bulletPoints: [
          "Ortalama enlem kullanılır",
          "Doğu (+) / Batı (−) yönü belirtilir",
          "Harita üzerinde doğrulama yapılır"
        ]
      }
    ],
    keyPoints: [
      "Boylam değişimi enleme bağlıdır.",
      "Ortalama enlem üzerinden hesaplanır.",
      "Yön işareti doğru verilmelidir."
    ]
  },
  "Sayısal orta enlem seyri uygulamaları": {
    title: "Sayısal Orta Enlem Seyri Uygulamaları",
    introduction:
      "Orta enlem seyri, iki mevki arasındaki kurs ve mesafenin hesaplandığı pratik bir yöntemdir. Sayısal uygulama, teorik adımların hesapla doğrulanmasını sağlar.",
    sections: [
      {
        title: "Adım Adım Hesap",
        content:
          "DLat, departure ve ortalama enlem kullanılarak kurs ve mesafe bulunur. Bulunan değerler, haritada kontrol edilerek doğrulanır.",
        image: chartPlotting,
        imageAlt: "Orta enlem seyri uygulaması"
      },
      {
        title: "Doğrulama",
        content:
          "Hesap sonucu rota çizimiyle uyuşmuyorsa, işaret hatası veya yanlış enlem kullanımı kontrol edilir.",
        bulletPoints: [
          "DLat ve departure işaretleri kontrol edilir",
          "Ortalama enlem doğru alınır",
          "Harita çizimiyle karşılaştırılır"
        ]
      }
    ],
    keyPoints: [
      "Sayısal uygulama, teoriyi doğrular.",
      "Ortalama enlem hatası sonucu bozar.",
      "Harita kontrolü zorunludur."
    ]
  },
  "Kerterizle mevki tayini": {
    title: "Kerterizle Mevki Tayini",
    introduction:
      "Kerterizle mevki tayini, sabit ve tanınabilir iki veya üç noktadan alınan kerterizlerin kesişimiyle gemi mevkisinin bulunmasıdır.",
    sections: [
      {
        title: "Temel Yöntem",
        content:
          "En az iki kerteriz alınır ve haritada ilgili doğrular çizilir. Kesişim noktası gemi mevkisidir.",
        image: chartPlotting,
        imageAlt: "Kerterizlerle mevki tayini"
      },
      {
        title: "Hata Kaynakları",
        content:
          "Kerteriz açılarının küçük olması, pusula hatası ve zaman farkı mevkiyi etkiler.",
        bulletPoints: [
          "Kerterizler mümkün olduğunca geniş açıyla alınır",
          "Zaman farkı minimize edilir",
          "Pusula sapmaları düzeltilir"
        ]
      }
    ],
    keyPoints: [
      "İki veya üç kerterizle fix yapılır.",
      "Açı ne kadar genişse doğruluk artar.",
      "Zaman farkı azaltılmalıdır."
    ]
  },
  "Mesafe + kerteriz fix": {
    title: "Mesafe + Kerteriz Fix",
    introduction:
      "Tek bir sabit objeye olan mesafe ve kerteriz birlikte kullanılarak gemi mevkisi belirlenir.",
    sections: [
      {
        title: "Uygulama",
        content:
          "Objeye olan mesafe, radar veya görsel yöntemlerle ölçülür; kerterizle birleştirilerek haritada tek bir nokta bulunur.",
        image: radarDisplay,
        imageAlt: "Mesafe ve kerterizle mevki tayini"
      },
      {
        title: "Kullanım Alanı",
        content:
          "Kıyıya yakın seyirlerde veya sınırlı NAVAID bulunan bölgelerde hızlı mevki kontrolü sağlar.",
        bulletPoints: [
          "Radar mesafesi + pusula kerterizi",
          "Hızlı doğrulama amacıyla kullanılır",
          "Tek objeye bağlı olduğundan dikkat gerektirir"
        ]
      }
    ],
    keyPoints: [
      "Mesafe ve kerteriz aynı anda alınmalıdır.",
      "Radar ölçümü yaygın kullanılır.",
      "Tek objeye bağlılık hata riskini artırır."
    ]
  },
  "Paralel indeks": {
    title: "Paralel İndeks",
    introduction:
      "Paralel indeks (Parallel Index), radar veya ECDIS üzerinde planlanan rota çizgisine paralel biçimde çizilen ve sabit bir referans noktasıyla (genellikle belirgin bir kıyı noktası, burun, fener veya radar yansıtıcısı) gemi arasındaki yatay mesafeyi sürekli olarak gösteren bir navigasyon izleme tekniğidir. Teknik özü itibarıyla çok basittir: geminin belirli bir noktaya olan mesafesi, o noktanın radar veya ECDIS ekranındaki konumuna göre rota çizgisine paralel bir çizgi çizilerek her an kontrol altında tutulur.\n\nParalel indeks, özellikle dar boğazlarda, limanların yaklaşma rotalarında, sığ sularda ve görüşün kısıtlı olduğu durumlarda köprüüstünün en kritik seyir araçlarından biridir. Bu teknik sayesinde zabitan, planlı rotadan ne kadar saptığını anlık olarak görebilir; küçük sapmalar büyümeden müdahale edebilir. Görsel işaret olmadan veya GPS bozulmuş olsa bile radar ile uygulanabilmesi, tekniğin güvenilirliğini artırır.\n\nParalel indeks uygulaması, gerçekten işe yarayan tek seyir kontrolünün anlık, sürekli ve görsel doğrulama olduğu ilkesine dayanır. Sadece gemi mevkiini bilmek yeterli değildir; geminin doğru yönde, doğru mesafede ilerlediğinden emin olmak gerekir. Bu nedenle IMO ve STCW mevzuatı, paralel indeks tekniğini köprüüstü yeterlilik programlarının zorunlu bir bileşeni olarak tanımlar.",
    sections: [
      {
        title: "Paralel İndeks Çiziminin Prensibi",
        content:
          "Paralel indeksin kurulumu için önce bir referans noktası belirlenir. Bu nokta radar ekranında net bir yansıma veren, haritada konumu kesin olarak bilinen sabit bir nesne olmalıdır (ör. burun, fener, ada, rıhtım başı). Ardından gemi ile bu referans noktası arasındaki planlanan yatay mesafe ölçülür; bu mesafe haritadan önceden hesaplanır.\n\nRadar ekranında (veya ECDIS üzerinde) referans noktasına karşılık gelen yansıma ile gemi simgesi arasındaki mesafe, belirlenen planlı mesafeye eşit olacak şekilde EBL (Electronic Bearing Line) veya PI çizgisi konumlandırılır. Gemi seyir sırasında bu çizgiye paralel kalması gerekiyorken referans yansıması çizginin üzerinde izlenmelidir. Yansımanın çizginin üzerinde mi, altında mı kaldığına bakılarak sapma yönü ve büyüklüğü anında okunur.",
        image: radarDisplay,
        imageAlt: "Paralel indeks kurulumu ve radar görüntüsü"
      },
      {
        title: "Uygulama Adımları ve Önemli Noktalar",
        content:
          "Paralel indeks uygulamasında şu adımlar takip edilir: (1) Seyir öncesinde harita üzerinde, rotanın her kritik bölümü için en uygun referans noktası seçilir ve planlanan mesafeler ölçülür. (2) Bu mesafeler PI tablosuna veya plan notuna kaydedilir ve vardiya tesliminde aktarılır. (3) Seyir sırasında referans noktasının yansıması ekranda tespit edilerek PI çizgisi o yansımayı gösterecek şekilde ayarlanır. (4) Referans noktası çizginin gerisinde kalıyorsa gemi planlanan rotadan uzaklaşıyor; önündeyse yaklaşıyor demektir.\n\nUygulama sırasında dikkat edilmesi gereken nokta, radar ölçek değişikliklerinde PI mesafesinin otomatik ölçeklendiğinin doğrulanmasıdır. Bunun yanında, birden fazla PI çizgisi aynı anda kullanılabilir; bu, iki farklı tehlikeden eşzamanlı uzaklığı izlemek için son derece yararlıdır.",
        bulletPoints: [
          "Referans noktası haritada kesin konumu bilinen, radar yansıması net olan nesnelerden seçilir",
          "Planlanan mesafe harita üzerinde önceden ölçülüp kaydedilir",
          "Radar ölçek değişikliğinde PI çizgisinin güncellenmesi gerekebilir",
          "Birden fazla PI çizgisi eş zamanlı kullanılabilir",
          "PI, görsel kılavuz olmaksızın da uygulanabilir – bu kısıtlı görüşte kritik önemdedir"
        ]
      },
      {
        title: "ECDIS ile Paralel İndeks",
        content:
          "Modern ECDIS sistemleri, paralel indeks fonksiyonunu yerleşik olarak sunar. ECDIS'te XTE (Cross Track Error) çizgileri aslında birer paralel indeksi işlevi görür; ancak ECDIS PI'ı radar PI'ından farklıdır: ECDIS PI, GPS konumunu esas alırken radar PI, gerçek zamanlı radar yansımalarını kullanır. Bu fark, GPS hatasının olası olduğu durumlarda radar PI'ının bağımsız doğrulama değerini artırır.\n\nDenizcilik fakültesi öğrencileri açısından önemli nokta şudur: Elektronik sistemlerin çoğalmasına rağmen radar paralel indeks, bağımsız ve çapraz doğrulama aracı olarak önemini korumaktadır. Özellikle GPS sinyal bütünlüğünün sorgulayıcı bir şekilde değerlendirilmesi gereken durumlarda radar PI, gerçek dünya referansını sağlar."
      }
    ],
    keyPoints: [
      "Paralel indeks, rotaya paralel çizilen referans hattıyla gemi-kıyı mesafesini anlık izler.",
      "Referans noktası net radar yansıması veren, haritada kesin konumlu bir nesne olmalıdır.",
      "Radar ölçeği değiştiğinde PI mesafesi güncellenmeli ya da otomatik ölçekleme doğrulanmalıdır.",
      "ECDIS'teki XTE sınırları paralel indeks işlevi görse de, GPS hatasına karşı radar PI bağımsız doğrulama sağlar.",
      "Dar sular ve kısıtlı görüşte paralel indeks hayat kurtarıcı bir kontrol aracıdır."
    ]
  },
  "Kıyı seyri teknikleri": {
    title: "Kıyı Seyri Teknikleri",
    introduction:
      "Kıyı seyri (Coastal Navigation), geminin kıyıya görsel mesafede veya radar kapsamında seyrettiği, sürekli mevki teyidinin yapılabildiği seyir biçimidir. Açık deniz seyrine kıyasla hem daha fazla güvenli referans noktası sunar hem de daha yoğun trafik, daha az meydan ve daha fazla tehlike barındırır. Bu çelişkili özellik, kıyı seyri tekniklerini hem zengin hem de kritik bir konu haline getirir.\n\nKıyı seyri tekniklerinin özünde güvenilir mevki belirleme ve sürdürülebilir emniyet sağlama ilkeleri yatar. Tek bir yönteme bağlı kalmak yerine, görsel referans, kerteriz, transit hat, clearing line ve elektronik sistemlerin birlikte kullanılması, güvenilirlik hiyerarşisi oluşturur. Bir yöntemde hata olduğunda diğeri devreye girerek hatayı ortaya koyar; bu çapraz doğrulama yaklaşımı tüm seyirde uygulanmalıdır.",
    sections: [
      {
        title: "Transit Hatları (Leading Lines)",
        content:
          "Transit hat (leading line), iki sabit nesnenin aynı doğrultu üzerinde hizalandığında oluşturduğu görsel çizgidir. Bu çizgi üzerinde gemi bulunduğu sürece hem mevkii kesin olarak bilinir hem de tehlikeli bölgeden uzak tutulur. Liman girişlerinde, boğazlarda ve güvenli kanalların orta eksenini işaret etmek için yaygın biçimde kullanılır.\n\nTransit hatlar, Admiralty haritalarında iki paralel çizgi sembolüyle gösterilir ve genellikle özel ayırtman ışıkları (leading lights) ile gece de kullanılabilir hale getirilir. Gemi hangi noktada olursa olsun, her iki nesne aynı dikey düzlemde göründüğü sürece kanalın ekseni üzerinde demektir.",
        image: chartPlotting,
        imageAlt: "Transit hat ve leading line uygulaması"
      },
      {
        title: "Clearing Lines (Emniyet Hatları)",
        content:
          "Clearing line, geminin belirli bir tehlikeden uzak kalmasını sağlamak amacıyla kullanılan ve genellikle bir coğrafi kerteriz veya izobar olarak tanımlanan güvenli sınırdır. Clearing line’ın kullanım mantığı şudur: tehlikenin hangi tarafında olunduğu, mutlak bir mevki bilgisi olmaksızın dahi belirlenebilir.\n\nÖrneğin, bir kayanın batı yakasından güvenli geçiş için ‘sahil feneri 047° veya daha küçük bir kerterizde kalındığı sürece kaya güvende’ gibi bir kural tanımlanır. Bu kural, mevki hatasına karşı pasif emniyet sağlar: kerteriz sınırını aşmadan herhangi bir mevkide bulunmak, tehlikeden uzak olduğunu garanti eder. Clearing line’lar haritaya çizilir ve sefer planına işlenir; seyir sırasında anlık gözlemle kontrol edilir.",
        bulletPoints: [
          "Transit hatlar iki sabit nesnenin hizalanmasıyla oluşur; kanal eksenini gösterir",
          "Clearing line, tehlikeden hangi tarafta bulunulduğunu anlık olarak gösterir",
          "Mevki bilgisi olmadan da emniyet sağlar – çok güçlü bir yöntemdir",
          "Clearing bearings (emniyet kerterizleri) haritaya önceden işlenmeli ve sefer planına dahil edilmelidir",
          "Geceleyin leading lights ile transit hatlar kolayca takip edilebilir"
        ]
      },
      {
        title: "Radar ve ECDIS ile Çapraz Doğrulama",
        content:
          "Kıyı seyri sırasında görsel yöntemlerin yanı sıra radar ve ECDIS’in birlikte kullanılması, her bir sistemin zayıf noktalarını kapatan entegre bir doğrulama yaklaşımı oluşturur. Radar, gerçek zamanlı ve GPS’ten bağımsız mesafe ölçümü sağlar; kıyı silüetini, tombazları ve sabit referansları tespit eder. ECDIS ise elektronik haritayı GPS konumuyla üst üste getirir ve tehlikelere göre alarmsallık sağlar.\n\nÇapraz doğrulama prensibi şöyle uygulanır: ECDIS’teki GPS konumu, radar mesafe veya kerterizi ile doğrulanır; bu iki değer uyuşuyorsa sistem güvenilirdir, uyuşmuyorsa nedeni araştırılır. Herhangi bir uyumsuzluk, GPS hatası, radar kalibrasyon sorunu veya harita hatasına işaret edebilir. Bu nedenle kıyı seyri boyunca mevki güncelleme sıklığı ve yöntemler çeşitliliği artırılmalıdır."
      }
    ],
    keyPoints: [
      "Kıyı seyri, trafik yoğunluğu ve tehlike çeşitliliği nedeniyle açık deniz seyrine göre daha yoğun dikkat gerektirir.",
      "Transit hatlar kanal eksenini görsel olarak işaret eder; clearing line’lar tehlikeden uzaklığı garanti eder.",
      "Görsel, radar ve ECDIS yöntemlerinin çapraz doğrulaması güvenilirlik hiyerarşisi oluşturur.",
      "Clearing bearings sefer planına önceden işlenmeli ve seyir boyunca aktif olarak kontrol edilmelidir.",
      "Kıyı seyri planlamasında mevki güncelleme sıklığı ve yöntem çeşitliliği açık denize göre belirgin biçimde artırılmalıdır."
    ]
  },
  "Rhumb line (loxodrom)": {
    title: "Rhumb Line (Loxodrom)",
    introduction:
      "Rhumb line veya loxodrom, tüm meridyenleri sabit bir açıyla kesen yüzey eğrisidir. Başka bir deyişle, gemi kuzey-güney meridyenlerine her zaman aynı açıyı (hakiki rota) yaparak seyrederse izlediği hat loxodromdur. Bu teknik tanımın pratik sonucu son derece güçlüdür: yolculuk boyunca rotanın değiştirilmesine gerek yoktur; dümen sabit tutulur.\n\nMercator projeksiyonunda bir loxodrom, başlangıç ve bitiş noktasını birleştiren düz bir çizgi olarak görünür. Bu özellik, Mercator haritasını deniz seyiri için standart kılan ana nedenlerden biridir: rotayı haritada cetvel ve iletki kullanarak doğrudan çizmek ve okumak mümkündür. Bu pratiklik, loxodromu kısa ve orta mesafeli seyirlerde tercih edilen hat biçimi yapar.\n\nAncak küresel geometri nedeniyle loxodrom, iki nokta arasındaki en kısa yolu göstermez. En kısa yol büyük daire (ortodrom) üzerinde bulunur. İki hat arasındaki mesafe farkı, seyredilen enleme ve mesafeye bağlı olarak önemli boyutlara ulaşabilir; özellikle yüksek enlemlerde ve uzun transatlantik güzergahlarda bu fark yüzlerce deniz miline çıkabilir.",
    sections: [
      {
        title: "Loxodromun Matematiksel Temeli",
        content:
          "Bir loxodrom, küre üzerinde meridyenleri sabit açıyla kesen eğridir. Kutuplara yaklaştıkça spiralleşir ve eğer kutba ulaşmazsa kutup noktasını sonsuz kez dönerek sarar. Bu nedenle loxodrom, kutuplar dışında tam anlamıyla kapanmaz.\n\nMercator haritasında loxodromun düz çizgi olarak görünmesi, Mercator projeksiyonunun özellikle bu konformal (açı koruyan) özelliği için tasarlanmış olmasının sonucudur. Meridyenler Mercator haritasında dikey paralel çizgilerdir; dolayısıyla tüm meridyenlerle sabit açı yapan loxodrom, haritada bu dikey çizgilerle sabit açı yapan düz bir çizgiye dönüşür.",
        image: mercatorProjection,
        imageAlt: "Loxodromun Mercator haritada düz çizgi olarak gösterimi",
        formula: {
          text: "D_lox = Δλ · cos φ_m (yaklaşık, orta enlemde) | Gerçek hesap: Mercator sailing formülleri ile",
          description: "Loxodrom mesafesi, orta enlem yöntemiyle veya Mercator sailing formülleriyle hesaplanır"
        }
      },
      {
        title: "Loxodrom ile Büyük Dairenin Karşılaştırılması",
        content:
          "Mesafe farkı: Ekvator üzerinde veya yakınında loxodrom ve büyük daire neredeyse aynı yolu izler, fark ihmal edilebilir. Ancak 50° enlemde iki nokta arasındaki 3000 deniz millik bir seyirde loxodrom, büyük daireye göre 100–200 deniz mili daha uzun olabilir.\n\nRota farkı: Büyük daire rotası sürekli değişir ve sabit tutulmaz; loxodromda ise rota baştan sona sabittir. Bu nedenle büyük daire seyri, gerçekte waypoint'lere bölünmüş bir loxodrom dizisiyle (bileşik rota – composite sailing) yaklaşık olarak uygulanır.\n\nKullanım: Tropik ve subtropik bölgelerde kısa–orta mesafelerde loxodrom yeterlidir. Kuzey Atlantik, Kuzey Pasifik ve Güney Okyanus gibi yüksek enllemlerdeki uzun seyirlerde büyük daire rotası yakıt ve zaman tasarrufu sağlar.",
        bulletPoints: [
          "Loxodrom: sabit rota, kolay uygulama, Mercator haritada düz çizgi",
          "Büyük daire: en kısa yol, değişen rota, gnomonic haritada düz çizgi",
          "Yüksek enllemlerde mesafe farkı yüzlerce deniz miline ulaşabilir",
          "Bileşik seyir (composite sailing): büyük daireyi loxodrom dilimlerine böler"
        ]
      },
      {
        title: "Mercator Sailing – Loxodrom Hesabı",
        content:
          "Mercator sailing yöntemi, iki nokta arasındaki loxodrom mesafesini ve rotasını hesaplar. Temel formüller meridional farkı (m) ve boylam farkını (DLo) kullanır. Rota açısı (C) şu şekilde hesaplanır: tan C = DLo / m, burada m = M₂ – M₁ (meridional parts farkı).\n\nMesafe ise D = ΔLat / cos C formülüyle bulunur; ΔLat, derece cinsinden enlem farkının deniz mili karşılığıdır (1° = 60 NM). Bu hesaplar, denizcilik sınavlarında ve çalışma tablolarında standart olarak uygulanır ve Mercator harita cetvelinin pratikte nasıl çalıştığını matematiksel olarak açıklar."
      }
    ],
    keyPoints: [
      "Loxodrom, tüm meridyenleri sabit açıyla keser; bu nedenle gemi boyunca aynı rotayı korur.",
      "Mercator haritasında loxodrom düz bir çizgidir – bu navigasyonda rota ölçümünü kolaylaştırır.",
      "Loxodrom, iki nokta arasındaki en kısa yol değildir; büyük daire en kısa yoldur.",
      "Yüksek enlemlerde ve uzun mesafelerde loxodrom ile büyük daire arasındaki mesafe farkı büyür.",
      "Mercator sailing formülleri, loxodrom rota ve mesafesini kesin olarak hesaplar."
    ]
  },
  "GPS prensibi": {
    title: "GPS Prensibi",
    introduction:
      "GPS (Global Positioning System), Amerikan Savunma Bakanlığı tarafından geliştirilen ve 1995'ten itibaren sivil kullanıma tam kapasite açılan, uzay tabanlı uydu navigasyon sistemidir. Sistem, Dünya'nın çeşitli yörüngelerinde konumlandırılmış en az 24 etkin uydudan oluşur ve bu uydular sürekli olarak güçlü zaman sinyalleri yayar. Yeryüzündeki bir alıcı bu sinyalleri alarak kendi konumunu hesaplar.\n\nGPS'in denizcilik açısından devrimsel önemi, sürekli, otomatik ve yüksek doğruluklu konum belirleme imkânı sunmasındadır. Gece gündüz, her hava koşulunda, her okyanusta çalışan GPS; sextant, radar ve görsel mevki tayininin tamamlayıcısı haline gelmiş, modern ECDIS sistemlerinin birincil veri kaynağı olmuştur.\n\nBununla birlikte GPS, kör bir güven tehlikesi de barındırır. Uydulardan gelen sinyalin kesilmesi, boğulması (jamming) veya kandırılması (spoofing), GNSS sistemlerini devre dışı bırakabilir ya da yanlış konum gösterilmesine yol açabilir. Bu nedenle STCW ve IMO, GPS'i destekleyici bir araç olarak tanımlar; navigatörler radar, astronomi ve geleneksel mevki tayini yeterliliklerini korumak zorundadır.",
    sections: [
      {
        title: "Sistemin Bileşenleri: Uzay, Kontrol, Kullanıcı",
        content:
          "GPS üç ana bölümden oluşur. Uzay segmenti: yaklaşık 20.200 km yükseklikte 6 yörüngede dağıtılmış en az 24 uydudan oluşur; her yörüngede 4 uydu bulunur. Bu düzenleme, dünyanın herhangi bir noktasında eş zamanlı olarak en az 4 uyduyu ufuk üzerinde görünür kılar. Kontrol segmenti: Colorado'daki ana kontrol istasyonu ve dünyadaki izleme istasyonları; uyduların orbital parametrelerini ve saat düzeltmelerini günceller. Kullanıcı segmenti: gemideki, uçaktaki veya elde taşınan GPS alıcılarından oluşur; sinyalleri alır ve hesaplar.",
        image: gpsSatellites,
        imageAlt: "GPS uydu konstellasyonu ve konum belirleme prensibi"
      },
      {
        title: "Konum Belirleme: Pseudo-Range ve Trilateration",
        content:
          "GPS alıcısı, her uydunun göndermekte olduğu sinyal ile alıcının kendi ürettiği kopya sinyal arasındaki zaman farkını ölçer. Bu zaman farkı, ışık hızıyla çarpılarak uyduya olan mesafe (pseudo-range) hesaplanır. 'Pseudo' (sözde) ifadesi, alıcı saatindeki hatanın mesafeye hata kattığına işaret eder.\n\nSaati tam senkronize olan bir alıcı, teorik olarak 3 uyduyla konumunu belirleyebilir (3 boyutlu trilateration). Ancak alıcı saati uydu atomik saatlerine göre hatalı olduğundan dördüncü bir uydu, saat hatasını matematiksel olarak ortadan kaldırmak için kullanılır. Böylece 4 uyduyla hem 3D konum (enlem, boylam, yükseklik) hem de kesin zaman elde edilir.",
        formula: {
          text: "Pseudo-range = c × Δt | Gerçek mesafe = Pseudo-range − (saat hatası × c)",
          description: "c = ışık hızı (≈ 3×10⁸ m/s), Δt = sinyal gecikmesi. Dördüncü uydu saat hatasını eliminate eder."
        }
      },
      {
        title: "GPS Hataları ve Denizcilik Açısından Sınırları",
        content:
          "GPS doğruluğunu etkileyen başlıca hata kaynakları şunlardır: (1) İyonosferik gecikme: iyonosfer tabakası sinyali yavaşlatır; çift frekanslı alıcılar bunu düzeltebilir. (2) Troposferik gecikme: atmosferin alt katmanlarındaki nem ve basınç sinyali etkiler. (3) Çok yollu yansıma (multipath): sinyal binalara veya diğer yapılara çarparak alıcıya farklı yollardan ulaşırsa hata oluşur; liman girişlerinde ve şehir yakınlarında belirginleşir. (4) Uydu geometrisi (DOP): uydular gökyüzüne iyi dağılmamışsa hesap doğruluğu düşer. (5) Ephemeris hataları: uyduların yayımladığı orbital parametrelerde oluşan küçük hatalar.\n\nAynı zamanda GPS, GNSS sistemlerine yönelik elektronik tehditlerden etkilenebilir. GPS jamming (sinyal karıştırma), alıcıyı işlevsiz kılar. Spoofing ise çok daha sinsi bir tehdittir: sahte GPS sinyalleri üretilerek alıcının yanlış konum hesaplaması sağlanır. Bu tür siber tehditler, özellikle stratejik sularda ve çatışma bölgelerindeki gemiler için ciddi bir operasyonel risktir.",
        bulletPoints: [
          "Sivil GPS doğruluğu genellikle ±3–5 metre (iyi koşullarda daha az)",
          "DGPS ve SBAS sistemleri metre altı doğruluğa ulaşabilir",
          "Jamming: sinyal paraziti – konum kaybı",
          "Spoofing: sahte sinyal – yanlış konum gösterimi, en tehlikeli GNSS tehdidi",
          "GPS, tek navigasyon aracı olarak asla kullanılmamalı; çapraz doğrulama zorunludur"
        ]
      }
    ],
    keyPoints: [
      "GPS, en az 24 uydudan gelen zaman sinyallerinin trilaterasyonuyla konum belirler.",
      "4 uydu gereklidir: 3'ü 3D konum için, 4.'sü alıcı saat hatasını düzeltmek için.",
      "Pseudo-range, alıcı saat hatasını içeren ham mesafedir; 4. uydu ile saat hatası çözülür.",
      "Jamming ve spoofing, GPS güvenilirliğini tehdit eden başlıca siber tehlikelerdir.",
      "STCW: GPS, geleneksel ve radar navigasyon becerilerinin yerini alamaz; bağımsız doğrulama şarttır.",
      "DOP değerleri, uydu geometrisinin konum doğruluğuna etkisini sayısal olarak gösterir."
    ]
  },
  "Trilaterasyon": {
    title: "Trilaterasyon",
    introduction:
      "Trilaterasyon, bir noktanın konumunu, konumu bilinen birden fazla referans noktasına olan mesafeleri kullanarak belirleme yöntemidir. Triangulasyondan temel farkı şudur: triangulasyon açı ölçümüne, trilaterasyon ise mesafe ölçümüne dayanır. GPS, trilaterasyon prensibini küresel ölçekte uygular; uyduların konumları tam olarak bilinmekte ve alıcıya olan mesafeler sinyal gecikme süresiyle ölçülmektedir.\n\nTrilaterasyonun temel geometrik mantığı şöyle açıklanabilir: bilinen konumdaki tek bir noktadan r₁ mesafesindeyseniz, o noktayı merkez alan r₁ yarıçaplı bir küre (ya da 2D’de daire) üzerinde herhangi bir yerde olabilirsiniz. İkinci bir referans noktası eklendiğinde iki kürenin kesişimi bir daire oluşturur. Üçüncü referans eklendiğinde iki nokta elde edilir. Yeryüzü şartları bu iki noktadan birini anlamsız kılar; böylece tek bir konum saptanır.",
    sections: [
      {
        title: "GPS’te Trilaterasyonun Uygulanması",
        content:
          "GPS’te trilaterasyon uygulaması şöyle işler: her uydu kendi konumunu ve sinyal gönderim zamanını içeren bir mesaj yayımlar. Alıcı bu sinyali aldığında, sinyal gecikmesini (Δt) ışık hızıyla (c) çarparak uyduya olan sözde mesafeyi (pseudo-range) hesaplar. Bu sözde mesafe, küre yüzeyini tanımlar ve alıcının bu küre üzerinde bir yerde bulunduğunu gösterir. 3 uyduyla elde edilen 3 kürenin kesişimi teorik olarak iki nokta verir; yeryüzü dışındaki nokta otomatik elenir ve 3D konum elde edilir.\n\nAncak gerçekte 4 uydu zorunludur. Bunun nedeni alıcı saatinin uydu atomik saatleri kadar hassas olmayışıdır. Alıcı saat hatası (dt_r), her ölçüme eşit miktarda hata katar. Dördüncü uyduyla 4 denklemden oluşan bir sistem kurulur ve hem 3D konum (x, y, z) hem de saat hatası (dt_r) bilinmeyeni birlikte çözülür.",
        image: gpsSatellites,
        imageAlt: "GPS trilaterasyon: dört uyduyla konum ve saat hatası çözümü",
        formula: {
          text: "√[(x−xᵢ)²+(y−yᵢ)²+(z−zᵢ)²] = c·(tᵢ − dt_r) | i = 1,2,3,4 uydu",
          description: "Her uydu için bir denklem; 4 denklem 4 bilinmeyeni (x, y, z, dt_r) çözer"
        }
      },
      {
        title: "Geometrinin Doğruluğa Etkisi",
        content:
          "Trilaterasyonun doğruluğu yalnızca mesafe ölçüm hassasiyetine değil, aynı zamanda referans noktalarının (uydular) geometrik dağılımına da bağlıdır. Uydular gökyüzüne iyi dağılmışsa her ölçüm farklı yönlerden kısıt sağlar ve konum kesin olarak belirlenir. Uydular bir arada kümelenirse, ölçüm hatalarının konuma yansıması büyür.\n\nBu geometrik etki DOP (Dilution of Precision) değerleriyle sayısal olarak ifade edilir. DOP değeri düştükçe uydu geometrisi iyileşir ve aynı ölçüm hatası daha küçük konum hatasına yol açar. Tersine, yüksek DOP küçük bir ölçüm hatasını bile büyük bir konum belirsizliğine dönüştürür.",
        bulletPoints: [
          "İyi uydu geometrisi: uydular gökyüzüne homojen dağılmış, düşük DOP",
          "Kötü uydu geometrisi: uydular kümelemiş, yüksek DOP → büyük konum hatası",
          "4 uydu minimum; modern alıcılar 8–12 uydu kullanarak aşırı belirlenmiş sistem kurar",
          "Aşırı belirleme, en küçük kareler (least squares) yöntemiyle çözülür ve hassasiyeti artırır"
        ]
      }
    ],
    keyPoints: [
      "Trilaterasyon, mesafe ölçümünden konum belirleme yöntemidir; triangulasyon açı kullanır.",
      "3 uyduyla 2 olası konum elde edilir; yeryüzü geometrisi gerçekçi olanı seçer.",
      "4. uydu, alıcı saat hatasını (dt_r) ortadan kaldırmak için zorunludur.",
      "DOP (Dilution of Precision), uydu geometrisinin konum hatasına katkısını gösterir.",
      "Aşırı belirlenmiş sistemler (4’ten fazla uydu) least squares yöntemiyle daha hassas çözüm üretir."
    ]
  },
  "HDOP": {
    title: "HDOP – Yatay Konum Seyreltme Katsayısı",
    introduction:
      "DOP (Dilution of Precision – Hassasiyet Seyreltme Katsayısı), GNSS sistemlerinde uydu geometrisinin konum doğruluğuna yaptığı etkinin sayısal göstergesidir. DOP, ölçüm hassasiyetini doğrudan etkilemez; ölçüm hatalarının geometri nedeniyle konum hatasına nasıl dönüştüğünü gösterir. Düşük DOP değeri, uyduların geometrik olarak iyi konumlandığını ve küçük bir ölçüm hatasının da küçük bir konum hatasına yol açacağını ifade eder.\n\nHDOP (Horizontal DOP), yatay konumdaki (enlem ve boylam) hassasiyet seyreltmesini gösterir. Deniz seyirinde HDOP en kritik DOP türüdür çünkü gemilerin birincil endişesi yatay konumdur; yükseklik bilgisi genellikle ikincil öneme sahiptir. HDOP = 1 mükemmel geometri anlamına gelir. HDOP < 2 iyi; HDOP 2–5 kabul edilebilir; HDOP > 5 zayıf; HDOP > 10 çok zayıf olarak değerlendirilir.",
    sections: [
      {
        title: "HDOP'un Hesaplanması ve Fiziksel Anlamı",
        content:
          "HDOP değeri, görünen uydular için kurulan tasarım matrisi (H matrisi) aracılığıyla hesaplanır. Matematiksel detaylar yerine fiziksel yorumu şöyle özetlenebilir: uydular yatay düzlemde gökyüzüne homojen biçimde dağılmışsa ve birbirlerine göre geniş açılar yapıyorsa, her ölçüm farklı bir yönden 'kısıt' getirir ve yatay konum güçlü şekilde belirlenir. Uydular bir grupta kümelenmişse, birbiriyle benzer yönlerden gelen bilgi tekrar eder ve yatay konum belirsizleşir.\n\nÖrneğin, dört uydudan biri tam tepede (zenit), diğerleri kuzey, doğu ve batı ufkuna yakın dağılmışsa HDOP mükemele yakın olacaktır. Öte yandan tüm uydular güney ufku yakınında kümelenmişse HDOP çok yüksek olacak ve yatay konum büyük hata içerecektir.",
        image: gpsSatellites,
        imageAlt: "HDOP ve uydu geometrisi ilişkisi",
        formula: {
          text: "σ_yatay = HDOP × σ_ölçüm",
          description: "σ_yatay = yatay konum standart sapması; σ_ölçüm = pseudorange ölçüm standart sapması"
        }
      },
      {
        title: "DOP Türleri ve Kullanım Alanları",
        content:
          "GPS alıcıları farklı DOP türlerini raporlar. HDOP: yatay konum (enlem, boylam) – deniz seyirinde en önemli. VDOP: dikey konum (yükseklik) – havacılıkta kritik. PDOP (Position DOP): 3 boyutlu konum, √(HDOP²+VDOP²). TDOP: zaman doğruluğu. GDOP: Geometri DOP, tüm bileşenleri kapsar.\n\nDenizcilik uygulamalarında alıcı ekranında görülen HDOP < 2 değerinde, GPS konumunun yeterince güvenilir olduğu kabul edilir. HDOP > 4 olduğunda sonuçlar kritik mevki tayinlerinde dikkatle değerlendirilmeli; mümkünse radar veya görsel teyit alınmalıdır. Dar limanlarda yüksek binalar veya kıyı yapıları uydulardan gelen sinyali engelleyerek HDOP değerini artırabilir.",
        bulletPoints: [
          "HDOP < 1: ideal (teorik limit)",
          "HDOP 1–2: mükemmel – hassas mevki tayini için idealdir",
          "HDOP 2–5: iyi – çoğu seyreltme için yeterlidir",
          "HDOP 5–10: orta – sonuçlar şüpheyle değerlendirilmeli",
          "HDOP > 10: zayıf – GPS tek başına güvenilmez, çapraz kontrol şarttır"
        ]
      }
    ],
    keyPoints: [
      "HDOP, uydu geometrisinin yatay konum hatasını ne kadar büyüttüğünü gösterir.",
      "σ_yatay = HDOP × σ_ölçüm: DOP düştükçe aynı ölçüm hatası daha küçük konum hatasına yol açar.",
      "Uydular gökyüzüne homojen dağıldığında HDOP düşer, doğruluk artar.",
      "Dar limanlarda yüksek yapılar uydulara görüş hattını engelleyerek HDOP'u artırabilir.",
      "HDOP > 4 durumunda GPS mevkiini radar veya görsel yöntemlerle teyit etmek gerekir."
    ]
  },
  "PDOP": {
    title: "PDOP – 3 Boyutlu Konum Seyreltme Katsayısı",
    introduction:
      "PDOP (Position Dilution of Precision – 3 Boyutlu Konum Hassasiyet Seyreltme Katsayısı), GNSS alıcısının hem yatay hem de düşey konum bileşenlerindeki toplam geometrik hassasiyet seyreltmesini ifade eder. PDOP, HDOP ve VDOP'un kareleri toplamının kareköküne eşittir:\n\nPDOP = √(HDOP² + VDOP²)\n\nBu ilişki açıkça gösterir ki PDOP, her zaman HDOP'tan büyük veya eşittir; çünkü düşey belirsizlik eklenince toplam konum belirsizliği artar. Deniz seyirinde PDOP, 3 boyutlu konum doğruluğuna genel bir bakış sağlar; ancak HDOP genellikle birincil izleme parametresidir.",
    sections: [
      {
        title: "PDOP, HDOP ve VDOP İlişkisi",
        content:
          "GNSS konum belirsizliği üç boyuta ayrıştırılabilir: yatay düzlem (enlem ve boylam) ve düşey eksen (yükseklik). HDOP yatay belirsizlik geometrisini, VDOP düşey belirsizlik geometrisini, PDOP ise her ikisinin bileşimini ifade eder. Tipik olarak VDOP, HDOP'tan 1.5–2 kat daha büyüktür; çünkü tüm uydular ufuktan yukarıda olmak zorundadır ve bu asimetri yükseklik çözümünü zorlaştırır.\n\nDeniz seyirinde yükseklik bilgisi navigasyon açısından genellikle önemli değildir; ancak PDOP, genel uydu konstellasyon kalitesini tek bir sayıyla özetlemek için kullanışlıdır.",
        image: gpsSatellites,
        imageAlt: "PDOP, HDOP ve VDOP ilişkisi",
        formula: {
          text: "PDOP = √(HDOP² + VDOP²) | GDOP = √(PDOP² + TDOP²)",
          description: "GDOP tüm bileşenleri kapsar (konum + zaman). Deniz seyirinde HDOP/PDOP öncelikli izlenir."
        }
      },
      {
        title: "DOP Değerlerinin Operasyonel Yorumlanması",
        content:
          "Denizcilik uygulamalarında kabul gören DOP kalite eşikleri şöyledir: PDOP ≤ 2 mükemmel konum kalitesi; PDOP 2–4 iyi kalite; PDOP 4–6 orta kalite; PDOP 6–8 zayıf kalite; PDOP > 8 güvenilmez düzey. IMO ve bazı liman otoriteleri dar sularda ve kritik manevralarda PDOP < 4 veya HDOP < 2 şartını belirler.\n\nPratik bir not: birçok modern GPS alıcısı, DOP değeri belirlenen eşiği aştığında kullanıcıyı otomatik olarak uyarır. Köprüüstü zabiti bu uyarıya güvenmemeli; DOP değerini sürekli izlemeli ve yüksek DOP dönemlerinde radar veya görsel doğrulama yapmalıdır.",
        bulletPoints: [
          "PDOP ≤ 2: mükemmel – kritik manevralar için idealdir",
          "PDOP 2–4: iyi – rutin seyirde yeterlidir",
          "PDOP 4–6: orta – dikkatli olunmalı, çapraz kontrol önerilir",
          "PDOP > 6: zayıf – GPS tek başına güvenilmez",
          "Liman yaklaşımı ve dar su geçişi gibi kritik anlarda DOP izleme zorunludur"
        ]
      }
    ],
    keyPoints: [
      "PDOP = √(HDOP² + VDOP²): yatay ve düşey belirsizliğin geometrik bileşimi.",
      "Deniz seyirinde HDOP öncelikli izlenir; PDOP genel kalite özeti sağlar.",
      "PDOP > 4 durumunda GPS bağımsız navigasyon aracı olarak yeterli değildir.",
      "VDOP tipik olarak HDOP'tan büyüktür; tüm uydular ufuktan yukarıdadır.",
      "Liman otoriteleri kritik manevralarda HDOP ve PDOP eşik değerleri belirleyebilir."
    ]
  },
  "Radar prensibi": {
    title: "Radar Prensibi",
    introduction:
      "Radar (Radio Detection And Ranging), mikro dalga bandında (tipik olarak 3 GHz / S-bandı veya 9 GHz / X-bandı) elektromanyetik enerji darbelerini hedef yönüne yayımlayan ve yansıyan sinyali analiz ederek hedefin mesafesini, kerterizini ve hareket bilgilerini çıkaran aktif bir algılama sistemidir. Deniz radarı, görüş mesafesinden bağımsız olarak çalışır; sis, yağmur, karanlık veya yoğun deniz püskürtüsü koşullarında bile hedef tespiti yapabilir.\n\nDenizcilik radarı, köprüüstünün en kritik elektronik aracıdır. COLREG Kural 5 ve 7 kapsamında uygun gözcülük ve çatışma riski değerlendirmesi için radar kullanımı zorunlu tutulmuştur. SOLAS Bölüm V, 500 GT ve üzeri gemilerde en az iki bağımsız radar bulundurulmasını şart koşar. Modern ARPA (Automatic Radar Plotting Aid) sistemleri, hedefleri otomatik olarak izler, CPA ve TCPA hesaplar ve çatışma riski konusunda alarm üretir.",
    sections: [
      {
        title: "Radar Çalışma Prensibi: Zaman-Mesafe İlişkisi",
        content:
          "Radar anteni kısa süreli güçlü elektromanyetik darbeler (pulse) gönderir ve ardından kısa bir süre dinleme (reception) moduna geçer. Bu gönderme–dinleme döngüsü saniyede yüzlerce kez tekrarlanır. Gönderilen darbenin bir hedefe çarpıp geri dönmesi için geçen süre (two-way travel time, t) ölçülerek hedefe olan mesafe hesaplanır.\n\nElektromanyetik dalgalar ışık hızıyla (c ≈ 3×10⁸ m/s) yayıldığından, mesafe R = c × t / 2 formülüyle doğrudan hesaplanır. Bölü 2 ifadesi, darbeın hedefe gidip gelmesi gereken toplam yolu ikiye böler. Anten aynı anda hem gönderici hem alıcı olamayacağından, gönderme sonrasında çok kısa bir süre var olan 'kör bölge' (minimum range), anten yakınındaki hedeflerin tespitini engeller.",
        image: radarDisplay,
        imageAlt: "Radar çalışma prensibi: darbe gönderme ve yansıma",
        formula: {
          text: "R = c × t / 2 | c = 3×10⁸ m/s, t = iki yönlü sinyal süresi",
          description: "Mesafe, sinyalin hedefe gidip-gelme süresinin yarısı ve ışık hızının çarpımıdır"
        }
      },
      {
        title: "Bant, Frekans ve Yayılma Özellikleri",
        content:
          "Deniz radarları iki ana frekans bandında çalışır. X-bandı (9 GHz, 3 cm dalga boyu): daha yüksek çözünürlük, küçük hedefleri daha iyi tespit eder, kıyı seyri ve liman yaklaşmaları için tercih edilir; ancak yağmur ve sis tarafından daha fazla zayıflatılır. S-bandı (3 GHz, 10 cm dalga boyu): daha uzun menzil, hava koşullarından daha az etkilenir, açık deniz seyri ve kötü hava koşulları için uygundur.\n\nRadar darbelerinin yayılma etkisi atmosfere bağlıdır. Süper refraksiyon koşullarında radar menzili olağanüstü uzar; sub-refraksiyon koşullarında kısalır. Yüksek nem ve sıcaklık inversiyonları bu etkileri belirginleştirir.",
        bulletPoints: [
          "X-bandı (9 GHz): yüksek çözünürlük, kısa menzil, hava etkisine duyarlı",
          "S-bandı (3 GHz): düşük çözünürlük, uzun menzil, hava koşullarına dirençli",
          "Pulse Width (darbe genişliği): kısa darbe → iyi mesafe çözünürlüğü; uzun darbe → uzun menzil",
          "PRF (Pulse Repetition Frequency): saniyedeki darbe sayısı – menzil ile ters orantılıdır"
        ]
      },
      {
        title: "ARPA ve Hedef Takibi",
        content:
          "ARPA (Automatic Radar Plotting Aid), birden fazla radarhedefini eşzamanlı olarak izleyen, her hedef için COURSE, SPEED, CPA (Closest Point of Approach) ve TCPA (Time to CPA) hesaplayan otomatik sistemdir. ARPA olmadan bu hesaplar elle çizim yapılarak (radar plotting) yapılmaktaydı; ARPA bu süreci saniyeler içinde tamamlar ve köprüüstü zabitine değerli karar destek bilgisi sunar.\n\nAncak ARPA'nın sınırlarını bilmek şarttır: ARPA hedefi önce 'korele etmelidir' – yani birkaç tarama döngüsünde aynı hedefi izlemeli ve stabil bir iz oluşturmalıdır. Bu süreç sırasında (tipik olarak 1–3 dakika) CPA/TCPA bilgileri güvenilir değildir. Ayrıca ARPA, radar ekranında görünen hedefleri izler; sis içindeki küçük bir tekne veya yeterince güçlü yansıma yapamayan bir nesne ARPA tarafından görülmeyebilir. COLREG, ARPA verileri yerine navigatörün bütüncül durumsal farkındalığını esas alır."
      }
    ],
    keyPoints: [
      "Radar, elektromanyetik darbe gönderip dönüş süresini ölçerek mesafeyi bulur: R = c×t/2.",
      "Anten dönüş yönü kerterizi verir; her taramada 360° ufuk taranır.",
      "X-bandı: yüksek çözünürlük; S-bandı: uzun menzil ve hava direnci.",
      "ARPA: çoklu hedef izleme, CPA/TCPA hesaplama; ancak 1–3 dakikalık başlangıç gecikmesi göz önüne alınmalıdır.",
      "SOLAS: 500 GT üzeri gemilerde iki bağımsız radar zorunludur.",
      "Radar, COLREG Kural 5 kapsamında sürekli gözcülük aracı olarak kullanılmalıdır."
    ]
  },
  "Radar ile mevki tayini": {
    title: "Radar ile Mevki Tayini",
    introduction:
      "Radar mevki tayini (Radar Fixing), kıyı hattı veya belirgin nesnelerden alınan radar mesafeleri ve kerterizler kullanılarak geminin haritadaki kesin konumunun belirlenmesi işlemidir. GPS erişiminin olmadığı veya sorgulandığı durumlarda radar fix, bağımsız ve güvenilir bir mevki kaynağı sağlar. Radar mevki tayini aynı zamanda GPS konumunun doğrulanmasında da kullanılır.\n\nRadar ile fix yapmanın temel avantajı gerçek dünya referansına dayanmasıdır: radar, fiziksel nesneleri gerçek zamanlı olarak tespit eder ve GPS veya harita veritabanlarına bağımlı değildir. Bu nedenle elektronik harita hataları veya GPS bozulmaları radar fixini olumsuz etkilemez. Ancak radar ölçümlerinin de kendi sistematik ve tesadüfi hataları vardır; bu hataları anlamak ve minimize etmek navigatörün sorumluluğundadır.",
    sections: [
      {
        title: "Radar Fix Yöntemleri",
        content:
          "En güvenilir radar fix yöntemi iki veya üç noktadan mesafe çemberleri çizilerek elde edilen mesafe fix'idir. Radar mesafe ölçümü, kerteriz ölçümüne göre genellikle daha doğrudur çünkü mesafe, elektronik sayaçlarla kesin şekilde ölçülürken kerteriz, anten dönme hızı ve hedef boyutundan etkilenir. İki mesafe çemberinin kesişimi iki olası mevki verir; üçüncü bir mesafe veya kerteriz belirsizliği ortadan kaldırır.\n\nMesafe-kerteriz yöntemi: tek noktadan hem mesafe hem de kerteriz alınarak 'range-bearing fix' yapılır. Pratik ve hızlıdır ancak tek noktaya dayandığından hata kontrolü sınırlıdır. Kıyı hattı siluet yöntemi: radar görüntüsündeki kıyı konturu, haritadaki kıyı hattıyla örtüştürülerek mevki bulunur. Bu yöntem hassasiyeti düşük olmasına karşın uygun referans noktası olmadığında kullanışlıdır.",
        image: radarDisplay,
        imageAlt: "Radar ile mesafe ve kerteriz fix teknikleri"
      },
      {
        title: "Radar Hataları ve Düzeltme",
        content:
          "Radar ölçümlerini etkileyen sistematik hatalar bilinmeli ve mümkünse düzeltilmelidir. Index error: radarın mesafe sıfırını yanlış ayarlaması; test prosedürleriyle tespit edilir ve düzeltme değeri uygulanır. Beam width (demet genişliği) hatası: radar demeti belirli bir açısal genişliktedir; geniş hedeflerin radar ekranındaki yansıması gerçek boyuttan büyük görünür ve kerteriz ölçümü merkez yerine kenardan yapılırsa hata oluşur. Yansıma noktası seçimi: mesafe fixinde kullanılan noktanın haritadaki konumuyla örtüşmesi şarttır – aynı nesnenin bir ucu ile haritadaki işaretlenen nokta uyuşmuyorsa sistematik hata oluşur.\n\nDeniz durumu etkisi: yüksek dalgalanmada deniz clutterı (geri saçılım) küçük hedefleri maskeleyebilir; gain ve clutter kontrollerinin doğru ayarlanması gerekir. Bu kontrollerin aşırı kullanımı küçük teknelerin veya önemli nesnelerin kaybedilmesine yol açabilir.",
        bulletPoints: [
          "İki veya üç mesafe fix: en güvenilir yöntem – mesafe ölçümü kerterizden daha kesindir",
          "Index error: düzenli testlerle tespit edilmeli ve uygulanmalıdır",
          "Beam width hatası: kerteriz ölçümünde hedefin merkezi kullanılmalıdır",
          "Fix noktaları eş zamanlı alınmalı; hareket eden gemide zaman farkı fix'i bozar",
          "Deniz clutterını bastırmak için gain/clutter ayarları optimize edilmeli, ancak abartılmamalıdır"
        ]
      }
    ],
    keyPoints: [
      "Radar mesafe fix'i, mesafe-kerteriz fix'inden genellikle daha güvenilirdir.",
      "Üç nokta fix (üçgen hatası), ölçüm güvenilirliğini doğrulamada kullanılır.",
      "Index error düzenli olarak kontrol edilmeli ve düzeltme katsayısı uygulanmalıdır.",
      "Radar fix, GPS bağımsız konum doğrulaması için kritik bir araçtır.",
      "Deniz koşulları (clutter), beam width hatası ve yansıma noktası seçimi başlıca hata kaynaklarıdır."
    ]
  },
  "Paralel indeks (radar)": {
    title: "Paralel İndeks (Radar Uygulaması)",
    introduction:
      "Radar paralel indeksi, köprüüstü seyir tekniklerinin en pratik ve en önemli uygulamalarından biridir. Temel fikir basittir: radar ekranında, sabit bir referans noktasının gemiye olan yatay mesafesini temsil eden bir çizgi çizilir ve gemi seyri boyunca bu çizgiye göre konumunu izler. Referans noktasının radar ekranındaki yansıması bu çizginin üzerinde kaldığı sürece gemi doğru mesafede doğru rotada demektir; herhangi bir sapma anında görsel olarak fark edilir.\n\nRadar PI, kıyı seyri boyunca, dar boğaz geçişlerinde, liman yaklaşmalarında ve kısıtlı görüş koşullarında köprüüstünün rutin seyir izleme aracıdır. STCW yeterlilik standartları, zabitlerden radar PI kurma ve yorumlama becerisi bekler; MCA ve IMO kılavuzları bu tekniği passage plan hazırlığının ayrılmaz bir parçası olarak tanımlar.",
    sections: [
      {
        title: "Radar PI Kurulumu: Adım Adım",
        content:
          "Seyir öncesi planlama aşamasında: harita üzerinde rotanın kritik her bölümü için uygun bir referans noktası seçilir (açık bir burun ucu, tekil kaya, baca gibi net yansıma yapan nesne). Planlanan rota çizgisiyle bu referans noktası arasındaki dik mesafe ölçülür; bu değer 'PI mesafesi' olarak tabloya kaydedilir.\n\nSeyir sırasında: radar ekranında referans noktasının yansıması tespit edilir. EBL (Electronic Bearing Line) veya PI fonksiyonu kullanılarak, referans yansımasından PI mesafesine eşit uzaklıkta rota çizgisine paralel bir çizgi çizilir. Seyir boyunca referans yansıması bu çizgiyi izlemelidir. Yansıma çizginin kıyı tarafına geçerse gemi kıyıya yaklaşıyor; uzak tarafa geçerse uzaklaşıyor demektir.",
        image: radarDisplay,
        imageAlt: "Radar PI kurulumu: referans noktası ve paralel çizgi"
      },
      {
        title: "Çoklu PI Kullanımı ve Kritik Noktalar",
        content:
          "İleri düzey uygulamada iki veya daha fazla PI çizgisi eş zamanlı kullanılabilir. Örneğin, bir kıyıya olan minimum mesafeyi ve bir sığlığa olan minimum mesafeyi aynı anda izlemek için iki farklı referans noktasından iki PI çizgisi kurulabilir. Bu yaklaşım, özellikle kanalda birden fazla tehlike bulunduğunda son derece etkindir.\n\nPratik dikkat noktaları: (1) Radar ölçeği değiştirildiğinde PI çizgisinin ölçekle güncellenmesi gerekir; birçok modern radar bu güncellemeyi otomatik yapar ancak doğrulanmalıdır. (2) Referans noktasının radar yansıması kötü veya belirsizse PI güvenilir olmaz; yağmur/deniz clutterında referans yansımasının kaybolmaması için gain ayarları optimize edilmelidir. (3) Tide, current ve leeway etkisiyle gemi rotadan saptıysa PI bu sapmayı anlık gösterir; rota düzeltmesi gecikmeden yapılmalıdır.",
        bulletPoints: [
          "Seyir öncesinde harita üzerinde PI mesafeleri hesaplanıp passage planına işlenmelidir",
          "Birden fazla PI eş zamanlı kullanılabilir – kanalda iki tehlike varsa iki PI çizgisi",
          "Radar ölçek değişikliğinde PI mesafesinin güncellenmesi doğrulanmalıdır",
          "Referans noktasının net ve sürekli radar yansıması yapması gerekir",
          "Kısıtlı görüşte radar PI, görsel PI'nın yerini alır ve kritik öneme sahiptir"
        ]
      }
    ],
    keyPoints: [
      "Radar PI, rotaya paralel çizgiyle referans noktasının gemiye olan anlık mesafesini gösterir.",
      "PI mesafesi seyir öncesinde haritadan ölçülür ve passage planına kaydedilir.",
      "Referans yansımasının PI çizgisini aşması, planlanan rota hattından sapma demektir.",
      "Çoklu PI, birden fazla tehlike için eş zamanlı mesafe izleme imkânı sunar.",
      "Radar PI, GPS bağımsız çalışır ve kısıtlı görüşte en değerli seyir izleme aracıdır."
    ]
  },
  "ECDIS": {
    title: "ECDIS – Elektronik Harita Gösterim ve Bilgi Sistemi",
    introduction:
      "ECDIS (Electronic Chart Display and Information System), IMO standartlarını karşılaması koşuluyla kağıt haritanın resmi yerine geçebilen, elektronik seyir haritalarını (ENC – Electronic Navigational Chart) gemi sensör verileriyle entegre eden gelişmiş köprüüstü seyir sistemidir. SOLAS Bölüm V düzenlemesiyle 2012–2018 yılları arasında aşamalı olarak zorunlu hale getirilmiştir; 10.000 GT ve üzeri yolcu gemileri ile 3000 GT ve üzeri ticari gemiler ECDIS taşımak zorundadır.\n\nECDIS'in temel değeri, coğrafi konumu (GPS/GNSS) ile harita tehlikeleri arasında sürekli ve otomatik karşılaştırma yapmasında yatar. Gemi tehlikeli bir alana yaklaştığında sistem alarm üretir. Ancak bu güç, 'otomasyon güveni' adı verilen tehlikeli bir tuzağa da yol açar: navigatörün ECDIS'e aşırı güvenmesi ve manuel doğrulama ve bağımsız düşüncenin geri plana atılması. Son yıllardaki birçok deniz kazası, ECDIS kullanımındaki prosedür hatalarından kaynaklanmıştır.",
    sections: [
      {
        title: "ECDIS Bileşenleri ve Veri Kaynakları",
        content:
          "ECDIS, birkaç temel bileşenden oluşur. ENC (Electronic Navigational Chart): UKHO, NOAA veya diğer yetkili hidrografik kurumlar tarafından üretilen vektörel seyir haritasıdır. IHO S-57 standardına göre kodlanır; derinlikler, tehlikeler, yardımcı seyir işaretleri, kıyı yapıları gibi katmanlardan oluşur. ECDIS bu katmanları seçilebilir biçimde gösterir.\n\nSensör entegrasyonu: ECDIS, GPS/GNSS (konum), giroscope (heading), log (hız/mesafe), AIS ve radar verilerini entegre eder. Gemi simgesi gerçek zamanlı konum ve başı gösterecek biçimde haritada hareket eder. NAVTEX ve SafetyNET uyarıları ECDIS'e beslenebilir. Bazı ECDIS sistemleri radar görüntüsünü de haritanın üzerine bindirerek radar/chart overlay sunar.",
        image: ecdisDisplay,
        imageAlt: "ECDIS ekranı: ENC, sensör entegrasyonu ve alarm katmanları"
      },
      {
        title: "ECDIS Alarm Sistemi ve Emniyet Parametreleri",
        content:
          "ECDIS'in en kritik emniyet işlevleri alarm parametrelerinde yatar. Yanlış ayarlanan parametreler ya gereksiz alarmlara (alarm yorgunluğu) ya da tehlikelerin kaçırılmasına yol açar.\n\nSafety contour (Emniyet kontur derinliği): geminin güvenli geçiş yapabildiği minimum su derinliğidir; bu konturun kıyı tarafındaki suya ECDIS alarm üretir. Safety depth (Emniyet derinliği): bu değerin altındaki su derinlikleri haritada farklı renkte gösterilir. XTE limit: planlanan rotadan enine maksimum izin verilen sapma mesafesi. Anti-grounding alarm: gemi, look-ahead çizgisi boyunca belirlenen süre içinde tehlikeli bir alana girecekse erken uyarı verir.\n\nBu parametreler gemi drafı, trim, UKC şartı ve köprüüstü politikasına göre belirlenmelidir. Varsayılan değerler büyük olasılıkla uygun değildir; her sefer başında kontrol ve doğrulama gerekir.",
        bulletPoints: [
          "ENC güncelliği kritik: eski ENC'ler yanlış derinlik veya tehlike bilgisi içerebilir – düzenli güncelleme şarttır",
          "Safety contour drafttan büyük tutulmalı; UKC ve squat payı eklenmeli",
          "Alarm yorgunluğu: aşırı alarm köprüüstü zabitinin önemli uyarıları görmezden gelmesine neden olabilir",
          "ECDIS Paper Chart ile çapraz kontrol edilmeli; ne ECDIS ne de kağıt harita tek başına yeterlidir",
          "ECDIS tip onayı: her ECDIS markası ayrı eğitim ve tip onayı gerektirir (STCW zorunluluğu)"
        ]
      },
      {
        title: "ECDIS Kazaları ve Öğrenilen Dersler",
        content:
          "Uluslararası kazalar ve MAIB raporları, ECDIS hatalarının belli örüntüler izlediğini gösterir: yanlış safety contour ayarı, ENC güncellemelerinin yapılmaması, alarm sesini kapatma ve ECDIS'e körce güven. 2013'te İskoçya açıklarında MV Ovit'in karaya oturması, safety contour değerinin geminin drafının altında ayarlanmasından kaynaklanmıştır – ECDIS alarm vermemiş çünkü yanlış parametre girilmişti.\n\nBu nedenle STCW ve IMO, her zabitin kendi gemisindeki ECDIS sisteminin tip eğitimini (manufacturer-specific training) almış olmasını şart koşar. Genel ECDIS eğitimi yeterli değildir; farklı üreticilerin arayüz ve alarm yönetimleri önemli farklılıklar gösterir."
      }
    ],
    keyPoints: [
      "ECDIS, ENC haritasını GNSS konumuyla birleştirerek gerçek zamanlı tehlike uyarısı sağlar.",
      "Safety contour, safety depth ve XTE limitlerinin doğru ayarlanması ECDIS emniyetinin temelidir.",
      "ENC düzenli olarak güncellenmeli; eski ENC yanlış tehlike bilgisi içerebilir.",
      "ECDIS tip onayı ve üretici eğitimi STCW kapsamında zorunludur.",
      "Otomasyon güveni en büyük ECDIS riski: alarm yorgunluğu ve manuel doğrulamayı ihmal etme.",
      "ECDIS, radar ve GPS ile çapraz doğrulanmalıdır; tek başına yeterli değildir."
    ]
  },
  "Rota planlama": {
    title: "Rota Planlama (Passage Planning)",
    introduction:
      "Passage planning (rota / sefer planlama), geminin kalkış noktasından varış yerine emniyetli, verimli ve mevzuata uygun biçimde ulaşması için seyirden önce yapılan kapsamlı hazırlık sürecidir. IMO Karar A.893(21), bu süreci dört zorunlu aşamaya ayırır: Appraisal, Planning, Execution ve Monitoring. Bu çerçeve SOLAS Bölüm V ile de desteklenir; tüm uluslararası sefer yapan gemiler için kaptan ve seyir zabitleri üzerinde yasal bir sorumluluk yaratır.\n\nRota planlamasının önemi, tehlikeleri ve kısıtları önceden tanımlayarak köprüüstünün ‘reaktif’ yerine ‘proaktif’ çalışmasını sağlamasından kaynaklanır. Plan olmadan seyirde, tehlikeler yaklaştıkça fark edilir; bu anlarda hem zaman hem de hareket alanı sınırlıdır. Plan varsa tehlikeler çok önceden bilinir, alternatif kararlar önceden verilmiş olur ve kriz anında köprüüstü kararlı biçimde hareket edebilir.",
    sections: [
      {
        title: "Appraisal: Bilgi Toplama ve Değerlendirme",
        content:
          "Appraisal aşamasında seyire dair tüm bilgiler toplanır ve değerlendirilir. Kontrol edilecekler: tüm güncel seyir haritaları (kalkış noktasından varışa), Admiralty Pilot Books, List of Lights, Tide Tables, Tidal Atlas, Sailing Directions, Notice to Mariners güncellemeleri, liman yaklaşım kılavuzları (port approach guides), meteoroloji tahminleri, VTS (Vessel Traffic Service) gereklilikleri, draft kısıtları ve köprü/kanal açıklık bilgileri.\n\nBu aşamanın amacı seyrin tüm risklerini, kısıtlarını ve özel gereksinimlerini önceden tanımlamaktır. Planlama appraisal olmadan başlanamaz; eksik bilgiyle çizilen plan gerçekçi olmaz.",
        image: chartPlotting,
        imageAlt: "Passage planning: harita ve kaynaklar"
      },
      {
        title: "Planning: Detaylı Rota Hazırlığı",
        content:
          "Planning aşamasında appraisal verileri kullanılarak rota haritaya veya ECDIS’e işlenir. Waypoint listesi hazırlanır, her waypoint için XTE limitleri belirlenir ve tehlikeler işaretlenir. Safety contour, clearing lines, no-go areas ve kritik noktalardaki gerekli başlık değişiklikleri planlanır.\n\nSeyir notu (voyage note) hazırlanır: önemli bölgelerde hız planı, gelgit penceresi, dar geçişler için tahmini zamanlar, VHF kanalları ve kanallar için görev dağılımı. Alternatif rotalar ve acil durum (emergency) waypoint’leri eklenir. Yakıt planlaması, ETA hesabı ve karbon raporlaması da bu aşamada tamamlanır. Plan kaptan tarafından incelenir ve onaylanır.",
        bulletPoints: [
          "Waypoint listesi: koordinatlar, rota, mesafe, hız ve tahmini zamanlar",
          "XTE limitleri: her segment için rota genişliğini ve emniyet koridor belirleme",
          "Safety contour ECDIS’te doğru ayarlanmalı – draft + UKC + squat payı",
          "Clearing bearings ve leading lines sefer notuna işlenmeli",
          "Alternatif rotalar ve aile limanları (ports of refuge) önceden belirlenmeli"
        ]
      },
      {
        title: "Plan Kalitesi ve Sık Yapılan Hatalar",
        content:
          "Rota planlama kalitesi, köprüüstü yönetiminin gerçek testlerinden biridir. Sık yapılan hatalar: eski haritaların kullanılması, Notice to Mariners güncellemelerinin atlanması, XTE limitlerinin varsayılan geniş değerlerde bırakılması, safety contour’un doğru ayarlanmaması ve alternatifsiz tek rota planlaması.\n\nPSC (Port State Control) denetimleri, rota planının mevcudiyetini, güncelliğini ve kalitesini kontrol eder. Yetersiz passage plan, geminin tutulmasına (detention) yol açan sık deficiency nedenlerinden biridir. Bir rota planı, üç soruyu yanıtlamalıdır: gemi nerede olacak? Hangi tehlikeler var? Tehlikeleri geçerken ne yapılacak?"
      }
    ],
    keyPoints: [
      "Passage planning, IMO A.893(21) ve SOLAS V kapsamında yasal bir yükümlülüktür.",
      "Dört aşama: Appraisal (bilgi toplama) → Planning (rota hazırlığı) → Execution (uygulama) → Monitoring (izleme).",
      "XTE limitleri, safety contour ve clearing lines passage planının temel güvenlik unsurlarıdır.",
      "Plan kaptan tarafından onaylanmalı, köprüüstü ekibiyle briefing yapılarak paylaşılmalıdır.",
      "Alternatifsiz plan yetmez: acil durum waypoint’leri ve aile limanları önceden belirlenmeli.",
      "PSC denetimleri passage plan kalitesini sorgular; eksik plan detention gerekçesi olabilir."
    ]
  },
  "XTE": {
    title: "XTE – Cross Track Error (Enine Rota Sapması)",
    introduction:
      "XTE (Cross Track Error), geminin anlık konumunun planlanan rota çizgisinden yaptığı dik (enine) uzaklığı ifade eder. Gemi rotanın sağına saptıysa pozitif (+) XTE, soluna saptıysa negatif (−) XTE değeri raporlanır; yön işareti seyir yazılımına göre değişebilir. ECDIS'te ve GPS alıcılarında otomatik olarak hesaplanır ve görüntülenir.\n\nXTE, passage planlamasının en temel izleme parametrelerinden biridir. Planlama aşamasında her rota segmenti için XTE limiti belirlenir; bu limit, rota hattının her iki yanında belirlenen emniyetli koridorun yarı genişliğini ifade eder. ECDIS, XTE bu limiti aştığında alarm üretir.",
    sections: [
      {
        title: "XTE Limitlerinin Belirlenmesi",
        content:
          "XTE limiti, iki ayrı düşünce çizgisiyle belirlenir: (1) Tehlikelere olan mesafe: rota hattının her iki yanındaki en yakın tehlike, tehlikeden minimum güvenli mesafe ile XTE limitini belirler. Örneğin, rota hattının kıyı tarafında 0.5 NM ötede bir sığlık varsa ve minimum emniyet mesafesi 0.2 NM ise kıyı tarafi için XTE limiti en fazla 0.3 NM olabilir. (2) Yerel trafik ve kanal genişliği: dar kanallarda veya yoğun trafik alanlarında XTE limiti daha kısıtlı tutulur.\n\nXTE limitinin açık denizde gevşek, kıyıya yakın bölgelerde sıkı tutulması doğru bir yaklaşımdır. Sabit bir XTE limiti uygulamak yerine tehlike yoğunluğuna göre değişken limit belirlemek, hem alarm yorgunluğunu azaltır hem de kritik anlarda sıkı kontrolü sağlar.",
        image: ecdisDisplay,
        imageAlt: "XTE gösterimi: rota hattı ve enine sapma"
      },
      {
        title: "XTE ve Passage Plan Koridoru",
        content:
          "Passage planlama mantığında XTE limiti, rota hattının etrafında bir 'güvenli koridor' (safe corridor) oluşturur. Bu koridorun içinde kaldığı sürece gemi tehlikeden uzak demektir. Koridorun dışına çıkıldığında alarm üretir ve acil müdahale gerekebilir.\n\nHierarchik limit yapısı: ECDIS'te genellikle iki kademeli XTE alarmı kurulur. Birinci kademe (warning) hafif sapmayı gösterir – rotaya dönme zamanının geldiğini işaret eder. İkinci kademe (alarm) kritik eşiği aştığını gösterir – acil müdahale gerekir. Bu yapı, köprüüstünü hem proaktif hem de acil durum müdahalesine hazırlar.",
        bulletPoints: [
          "XTE limiti = rota hattı ile en yakın tehlike arasındaki mesafeden emniyet payı düşülerek hesaplanır",
          "Açık denizde geniş XTE (örn. 0.5–1.0 NM), dar sularda dar XTE (örn. 0.05–0.1 NM)",
          "Çift kademeli alarm (warning + alarm) alarm yorgunluğunu azaltır",
          "XTE alarm limiti ECDIS'te rota planına bireysel segment bazında ayarlanmalıdır",
          "XTE aşımı derhal kaptan ve ilgili zabitlere raporlanmalıdır"
        ]
      }
    ],
    keyPoints: [
      "XTE, geminin planlanan rota çizgisinden enine uzaklığıdır; pozitif/negatif işaret sapma tarafını gösterir.",
      "XTE limiti, tehlikelere olan mesafeye göre her segment için ayrıca belirlenir.",
      "Açık denizde geniş, dar sularda dar XTE limiti alarm yorgunluğunu azaltır.",
      "ECDIS'te çift kademeli XTE alarmı (warning + alarm) en iyi uygulamadır.",
      "XTE aşımı passage planının gözden geçirilmesi ve gerekirse rotanın yeniden değerlendirilmesi sinyalidir."
    ]
  },
  "ETA": {
    title: "ETA – Estimated Time of Arrival (Tahmini Varış Zamanı)",
    introduction:
      "ETA (Estimated Time of Arrival), geminin planlanan varış noktasına (liman, kılavuz istasyonu veya ara waypoint) ulaşacağı tahmini zamanı ifade eden operasyonel bir göstergedir. Geminin liman operasyonları, römorkör ve pilotaj servisi, kargo hazırlığı ve bunkerleme programının tamamı ETA etrafında organize edilir.\n\nBir ETA hesabının doğruluğu girdi verilerinin kalitesine bağlıdır: ortalama SOG, kalan mesafe, beklenen akıntı ve rüzgâr etkileri, kanalda düşük hız bölgeleri ve olası bekleme ihtimali. ETA sabit bir tahmin değil, sürekli güncellenmesi gereken dinamik bir parametredir.",
    sections: [
      {
        title: "ETA Hesabı: Temel Yöntem",
        content:
          "ETA hesabının temeli basittir: ETA = Kalkış Zamanı + (Kalan Mesafe / Ortalama SOG). Ancak pratikte bu hesap birçok düzeltme gerektirir. Tailwind ve favourable current SOG’u artırırken, headwind ve adverse current azaltır. Yüksek dalga ve ağır hava hız düşüşü ve dolayısıyla ETA gecikmesi yaratır.\n\nLiman yaklaşma süreci: kılavuz bekleme süresi, bölge geçiş hız kısıtlamaları, TSS içindeki rota uzaması ve demirde bekleme ihtimali ETA’ya eklenmesi gereken tampon süreleri oluşturur. Tidal window bazı limanlarda giriş için belirli gelgit zamanı gerektirir; bu pencere ETA’nın en kritik kısıtı olabilir.",
        image: chartPlotting,
        imageAlt: "ETA hesabı ve sefer planlaması",
        formula: {
          text: "ETA = ETD + (D / SOG_ort) + Kılavuz bekleme + TSS gecikmesi",
          description: "ETD = kalkış zamanı, D = toplam mesafe, SOG = ortalama zemin hızı. Tampon süreler eklenmeli."
        }
      },
      {
        title: "ETA Güncelleme ve İletişim",
        content:
          "ETA, günlük noon raporu, her vardiya devri ve hava durumu değişiklikleri gibi koşullar değiştikçe güncellenir. Planlanan ETA’dan önemli sapmalar (genellikle ±30 dakika veya daha fazla) derhal armatore, operatöre ve liman ajanına bildirilir.\n\nETA baskısı ve emniyet dengesi: IMO ve ISM Kodu, hız kararının emniyete dayanması gerektiğini açıkça vurgular. ETA tutturmak için hız artırmak, köprüüstü üzerinde hatalı karar almanın önemli bir tetikleyicisidir.",
        bulletPoints: [
          "ETA günlük noon raporu ve vardiya devirlerinde güncellenir",
          "±30 dakika veya daha büyük sapma derhal tüm paydaşlara bildirilmeli",
          "Tidal window kısıtı ETA’nın en katı sınırını oluşturabilir",
          "ETA baskısı emniyetsiz hız kararlarının önemli bir nedenidir – ISM kodla çatışır",
          "Liman ajanı için ETA kritiktir: kılavuz, römorkör, berth ve kargo hazırlığı ETA’ya göre organize edilir"
        ]
      }
    ],
    keyPoints: [
      "ETA = ETD + (Mesafe/SOG) + liman süreçleri; akıntı ve hava etkisi dahil edilmeli.",
      "ETA dinamik bir parametredir; koşullar değiştikçe güncellenmeli ve paydaşlara iletilmelidir.",
      "Tidal window bazı limanlarda ETA’nın en katı kısıtını oluşturur.",
      "ETA baskısı, emniyetsiz hız kararlarının yaygın nedenidir; ISM Kodu emniyeti öncelikli kılar.",
      "Noon raporu ve vardiya devri ETA güncelleme zorunluluğu gerektirir."
    ]
  },
  "Turn radius": {
    title: "Turn Radius – Dönüş Yarıçapı",
    introduction:
      "Turn radius (dönüş yarıçapı), bir geminin belirli bir dümen açısı ve hızda tam dönüş yaptığında izlediği dairesel yayın yarıçapıdır. Dümen açısı, gemi hızı ve geminin hidrodinamik karakteristikleri dönüş yarıçapını belirler. Küçük dönüş yarıçapı, manevra kabiliyetinin yüksek olduğunu gösterir.\n\nDönüş yarıçapı kavramı, dar kanallarda, boğazlarda ve liman içi manevralarında rota planlamasının temel girdisidir. Bir waypoint'te yapılacak başlık değişikliğinin kaç metre önünden başlayacağı, doğrudan dönüş yarıçapına bağlıdır. Gemi doğrultma gecikmesi (advance) ve enine kayma (transfer) miktarları da dönüş karakteristiğinin parçasıdır.",
    sections: [
      {
        title: "Dönüş Manevrası Parametreleri",
        content:
          "Bir geminin dönüş davranışı birkaç temel parametreyle tanımlanır. Advance (ilerleme): dönüş emri verildiği andan, geminin yeni başlıktan 90° dönmesine kadar geçen sürede orijinal rota yönünde kat edilen mesafe. Transfer: aynı aşamada orijinal rota çizgisinin enine geçilen mesafe. Tactical Diameter: 180° dönüş tamamlandığında orijinal rota çizgisinden enine uzaklık – bu değer genellikle dönüş için kritik meydan gereksinimini belirler.\n\nWaypoint alternatifi olan Steady Turning Radius (sabit dönüş yarıçapı): gemi tam dönüş tamamlandığında izlediği dairesel yayın yarıçapı. Tactical diameter, genellikle steady turning radius'un iki katına yakındır. Gemi manevralar kitapçığında (ship's manoeuvring booklet) bu değerler farklı hız ve dümen açısı için tablo olarak verilir.",
        image: autopilotControl,
        imageAlt: "Dönüş yarıçapı, advance, transfer ve tactical diameter",
        formula: {
          text: "Wheel-over point mesafesi ≈ Advance | Güvenli mesafe = Turn Radius + emniyet payı",
          description: "Wheel-over point, waypoint'ten önceki başlık değişikliği noktasıdır; advance mesafesi kadar öne alınır"
        }
      },
      {
        title: "Hız ve Dümen Açısının Etkisi",
        content:
          "Dümen açısı artırıldıkça dönüş yarıçapı küçülür ve dönüş hızlanır; ancak aşırı dümen açısı hız kaybına ve yalpa artışına neden olabilir. Hız arttıkça dönüş yarıçapı büyür; yani yüksek hızda dar dönüş yapmak istiyorsanız büyük dümen açısı gerekir. Ağır yük durumu (deep draught), yüklü olmayan duruma kıyasla dönüş kabiliyetini değiştirebilir; bu nedenle manevralar kitapçığı hem yüklü hem ballast koşullar için değerler içerir.\n\nNarrow channel turn planning: dar kanallarda wheel-over point, waypoint'in yeterince gerisine konumlandırılır. Hesaplama: geminin mevcut rota üzerinde yavaşlama, advance ve transfer miktarları haritaya çizilerek tam güzergah izlenir. Bu planlama ECDIS'te turn radius veya wheel-over point fonksiyonuyla otomatik yapılabilir.",
        bulletPoints: [
          "Dümen açısı ↑ → dönüş yarıçapı ↓, dönüş hızı ↑",
          "Hız ↑ → dönüş yarıçapı ↑ – yüksek hızda dar dönüş için büyük dümen açısı gerekir",
          "Tactical diameter = 180° dönüşün enine uzaklığı – kanal genişliği planlamasının temel değeri",
          "Manevralar kitapçığı farklı hız ve dümen açısı için tablo içerir",
          "ECDIS'te wheel-over point otomatik hesaplanabilir; doğrulanması gerekir"
        ]
      }
    ],
    keyPoints: [
      "Turn radius, hız ve dümen açısına bağlıdır; hız artınca yarıçap büyür.",
      "Tactical diameter, 180° dönüşün enine genişliğidir – dar su planlamasının temel girdisi.",
      "Wheel-over point, waypoint'ten önce başlık değişikliğine başlanacak noktadır; advance mesafesi kadar öne alınır.",
      "Manevralar kitapçığı her gemi için yüklü/ballast ve farklı hız değerlerine ait dönüş tablolarını içerir.",
      "Narrow channel geçişlerinde dönüş planlaması seyir planının kritik bir parçasıdır."
    ]
  },
  "Elektronik seyirde çapraz kontrol": {
    title: "Elektronik Seyirde Çapraz Kontrol",
    introduction:
      "Elektronik navigasyon sistemlerinin yaygınlaşması, köprüüstünün birden fazla dijital bilgi akışını yönetmesini gerektirmiştir. Çapraz kontrol (cross-checking), farklı ve bağımsız kaynaklardan elde edilen konum ve çevre bilgilerinin karşılaştırılmasıyla her kaynağın doğrulanması ilkesine dayanır. Bu ilke, tek bir sensöre kör güven tehlikesini doğrudan ele alır ve COLREG'in uygun gözcülük yükümlülüğünü karşılamak için zorunludur.\n\nÇapraz kontrol yalnızca bir 'iyi uygulama' değil; IMO ve STCW'nin elektronik navigasyona ilişkin kılavuzlarında açıkça öngörülen bir prosedürdür. SOLAS Bölüm V Kural 19, uygun navigasyon araçlarının kullanımını ve bunların güvenilirliğinin doğrulanmasını şart koşar. Çapraz kontrol disiplini, navigatörün sistem hatalarını ve GPS/ECDIS anomalilerini gerçek tehlike haline gelmeden fark etmesini sağlar.",
    sections: [
      {
        title: "Çapraz Kontrol Hiyerarşisi",
        content:
          "Etkin çapraz kontrol, bağımsız veri kaynaklarının karşılaştırılmasını gerektirir. Bağımsızlık kritiktir: GPS ve ECDIS'i karşılaştırmak anlamsızdır çünkü ECDIS'teki konum doğrudan GPS'ten gelir; bu iki sistem bağımsız değildir. Gerçek çapraz kontrol şu şekillerde sağlanır:\n\n(1) GPS mevkii ↔ Radar mesafe/kerterizi: Radar, GPS'ten bağımsız olarak gerçek dünya referansına dayanır. GPS konumu, radar ile alınan mesafelerle örtüşüyor mu? (2) ECDIS mevkii ↔ Görsel kerteriz: Belirli bir kara noktasının görsel kerterizi ECDIS'teki konumla tutarlı mı? (3) GPS SOG/COG ↔ Gyro başı + log hız: Zemin hız ve yön (GPS'ten), su hız ve yön (log + gyro) ile karşılaştırılarak akıntı vektörü hesaplanabilir.",
        image: ecdisDisplay,
        imageAlt: "Elektronik seyirde çapraz kontrol şeması"
      },
      {
        title: "Sensör Uyuşmazlığı Tespiti ve Müdahale",
        content:
          "Çapraz kontrol sırasında uyuşmazlık tespit edildiğinde sistematik bir tanı yaklaşımı uygulanır. Uyuşmazlık büyüklüğü ve yönü değerlendirilir: GPS konumu ile radar fix arasında küçük tutarlı bir fark varsa, radar mesafe hataları veya harita datum farklılığı nedeni olabilir. Büyük ve tutarsız fark, GPS spoofing, sensör arızası veya haritada yanlış datum/referans sistemine işaret edebilir.\n\nMüdahale protokolü: (1) Varsa bağımsız ikinci GPS alıcısının değeri kontrol edilir. (2) Radar ile kıyı konturunun harita silüetiyle örtüşmesi görsel olarak incelenir. (3) Astronomik gözlem veya sextant ile konum kontrol edilir (eğer uygunsa). (4) Durum kaptana bildirilir ve geminin emniyetli bir tutumda olduğu teyit edilir. (5) Log tutulur.",
        bulletPoints: [
          "GPS ↔ Radar: en güçlü bağımsız çapraz kontrol çifti",
          "GPS + ECDIS karşılaştırması bağımsız değildir – ECDIS konumu GPS'ten alır",
          "SOG/COG (GPS) ile Heading (gyro) + STW (log) uyuşmazlığı akıntı hesabıyla açıklanabilir",
          "Uyuşmazlık > belirlenen eşik → kaptan derhal bilgilendirilmeli",
          "Tüm uyuşmazlıklar ve alınan tedbirler log defterine kaydedilmeli"
        ]
      }
    ],
    keyPoints: [
      "Çapraz kontrol, bağımsız veri kaynaklarını karşılaştırarak tek sensör hatalarını yakalar.",
      "GPS ↔ Radar en güçlü bağımsız kontrol çiftidir; ECDIS ↔ GPS bağımsız değildir.",
      "Sensör uyuşmazlığı sistematik tanı protokolüyle incelenmeli ve log'a kaydedilmelidir.",
      "SOLAS Bölüm V ve STCW, navigasyon araçlarının güvenilirliğinin düzenli doğrulanmasını şart koşar.",
      "Çapraz kontrol, GPS spoofing ve ECDIS hata tesbitinin en pratik savunma hattıdır."
    ]
  },
  "Gelgitin fiziksel mantığı": {
    title: "Gelgitin Fiziksel Mantığı",
    introduction:
      "Gelgit (tide), Ay ve Güneş’in yerçekimsel etkisiyle okyanus ve denizlerdeki su seviyesinin periyodik olarak yükselip alçalmasıdır. Bu etki, astronomik olarak öngörülebilir olduğundan gelgit tabloları uzun süreler öncesinden hesaplanabilir. Gelgit, dünya genelinde farklı karakterler gösterir: bazı limanlarda günde iki kez yükselip alçalma (semidiurnal), bazılarında günde bir kez (diurnal), bazılarında ise karma (mixed) bir döngü gözlenir.\n\nGelgitin denizcilik açısından önemi çok yönlüdür: liman giriş-çıkış zamanlaması, UKC (Under Keel Clearance) hesabı, köprü altı geçiş yüksekliği, kıyı geçiş emniyeti ve kurtarma operasyonlarında su yüzeyi tahmini gibi alanlarda gelgit bilgisi kritik rol oynar. Denizcilik fakültesi öğrencilerinin gelgitin hem fiziksel temelini hem de tablolardan hesaplama yöntemlerini eksiksiz bilmesi zorunludur.",
    sections: [
      {
        title: "Ay’ın Yerçekimi ve Merkez Kaç Kuvvet",
        content:
          "Gelgitin ana kaynağı, Ay’ın Dünya üzerindeki diferansiyel çekim kuvvetidir. Ay Dünya’ya yakın taraftaki su kütlesini daha güçlü çeker; bu tarafta su kabarır. Öte yandan Dünya’nın karşı tarafında, merkez kaç etkisiyle (Dünya-Ay sistemi ağırlık merkezi etrafındaki dönüşten kaynaklanan kuvvet) de bir kabartı oluşur. Bu nedenle Dünya üzerinde aynı anda iki karşıt gelgit kabartısı bulunur.\n\nAy, Dünya’yı 24 saat 50 dakikada çevrelediğinden, bir konum bir günde yaklaşık 2 kez yüksek su ve 2 kez alçak su yaşar (semidiurnal gelgit). Ay etkisi, Güneş etkisinden yaklaşık 2.2 kat daha güçlüdür; bu oran hem kütleye hem de mesafenin küpüyle değişen diferansiyel çekim etkisine bağlıdır.",
        image: tideCurrent,
        imageAlt: "Gelgit oluşumu: Ay’ın diferansiyel çekimi ve iki kabartı"
      },
      {
        title: "Güneş’in Etkisi: Spring ve Neap Gelgitler",
        content:
          "Güneş de gelgit yaratır; ancak büyük kütlesine karşın çok daha uzak olduğundan etkisi Ay’ın yaklaşık %46’sı kadardır. Ay ve Güneş hizalandığında (yeni ay veya dolunay dönemleri) etkileri üst üste gelir ve gelgit genliği maksimum olur – bu duruma spring gelgit (kuvvetli gelgit) denir.\n\nAy ile Güneş birbirine dik konumda olduğunda (ilk ve son dördün dönemleri), etkileri kısmen sıfırlar ve gelgit genliği minimumdur – buna neap gelgit (zayıf gelgit) denir. Spring gelgit, neap gelgite göre yaklaşık %20 daha büyük genlik üretir. Bu döngü yaklaşık 14–15 günde bir tekrarlanır ve gelgit tablolarının hazırlandığı temel astronomik parametredir.",
        bulletPoints: [
          "Spring gelgit: Ay + Güneş hizalı (yeni ay / dolunay) – maksimum genlik",
          "Neap gelgit: Ay + Güneş dik (dördün) – minimum genlik",
          "Semidiurnal: günde 2 HW + 2 LW (Kuzey Atlantik ve Avrupa kıyıları için tipik)",
          "Diurnal: günde 1 HW + 1 LW (Körfez Meksika gibi bazı bölgeler)",
          "Mixed: karmaşık döngü (Hint Okyanusu ve Pasifik kıyılarının bir kısmı)"
        ]
      },
      {
        title: "Yerel Faktörler: Coğrafya ve Rezonans",
        content:
          "Teorik astronomik gelgit, yerel coğrafya ve okyanus havzası dinamikleri tarafından büyük ölçüde değiştirilebilir. Kanallar, körfezler ve sığ sularda rezonans etkisi gelgit genliğini aşırı artırabilir. Fundy Körfezi (Kanada), dünyanın en yüksek gelgit genliğine (15–16 metre) sahiptir; bu etki körfez geometrisinin gelgit periyoduyla rezonansa girmesinden kaynaklanır.\n\nTürkiye’nin Karadeniz kıyılarında ve Ege’nin bazı bölgelerinde gelgit genliği yalnızca birkaç onlarca santimetre iken Adriyatik veya İngiliz Kanalı’nda 5–8 metre gelgit genliği gözlenebilir. Bu nedenle limana özgü tablolar ve yerel hydrografik bilgi her zaman kullanılmalı; dünya ortalaması temel alınmamalıdır."
      }
    ],
    keyPoints: [
      "Gelgit, Ay ve Güneş’in diferansiyel çekim kuvvetleri sonucu oluşur; Ay etkisi Güneş’ten 2.2 kat güçlüdür.",
      "Dünya’da aynı anda iki karşıt gelgit kabartısı bulunur; bu nedenle semidiurnal gelgitte günde 2 yüksek su yaşanır.",
      "Spring gelgit: Ay+Güneş hizalı, maksimum genlik; Neap gelgit: dik konum, minimum genlik.",
      "Yerel coğrafya (körfez, kanal, rezonans) astronomi tabanlı tahminden çok farklı genlikler üretebilir.",
      "Gelgit bilgisi UKC, tidal window ve köprü altı geçiş hesaplarında doğrudan kullanılır."
    ]
  },
  "Spring tide – Neap tide": {
    title: "Spring Tide – Neap Tide (Kuvvetli ve Zayıf Gelgit)",
    introduction:
      "Spring tide (kuvvetli gelgit veya büyük gelgit), Ay ve Güneş’in Dünya’ya göre aynı doğrultuda – yeni ay veya dolunay döneminde – bulunduğunda meydana gelen ve gelgit genliğinin en yüksek değerine ulaştığı dönemdir. Neap tide (zayıf gelgit veya küçük gelgit) ise Ay ve Güneş’in Dünya’ya göre birbirine dik konumda – ilk veya son dördün döneminde – bulunduğu, gelgit genliğinin en düşük olduğu dönemdir.\n\nBu iki uç arasında her 7 günde bir döngü yaşanır: spring → neap → spring. Döngünün periyodik yapısı, denizcilik açısından kritik bir planlamakoşulu yaratır; bir limanın tidal window’u spring döneminde çok daha uzun, neap döneminde ise çok daha kısıtlı olabilir.",
    sections: [
      {
        title: "Spring Tide: Operasyonel Etkileri",
        content:
          "Spring döneminde HW (Yüksek Su) seviyesi yıllık ortalamanın üzerinde, LW (Alçak Su) seviyesi ise ortalamanın altında olur. Bu durum iki önemli operasyonel etki yaratır: (1) Olumlu: Derin draftlı gemiler normalde giremeyen sığ limanlara spring döneminde giriş yapabilir; köprü altı yükseklikleri artar. (2) Olumsuz: LW sırasında normalde yeterli UKC’ye sahip limanlarda bile UKC kritik düzeye düşebilir; sığlıklar su altında kalmaya devam edebilir.\n\nSpring döneminde tidal stream (gelgit akıntısı) da güçlenir; çünkü gelgit farkı arttıkça su kütlelerinin hareketi hızlanır. Bu durum dar kanallarda ve boğazlarda akıntı hızını önemli ölçüde artırır.",
        image: tideCurrent,
        imageAlt: "Spring ve neap tide karşılaştırması"
      },
      {
        title: "Neap Tide: Operasyonel Etkileri ve Tablolara Yansıması",
        content:
          "Neap döneminde gelgit farkı (range) azalır; HW beklenen ortalamanın altında, LW ise ortalamanın üzerinde olur. Bu durum: (1) Küçük tidal window: büyük draftlı gemilerin girişi için gereken minimum su seviyesine daha kısa bir süre için ulaşılır. (2) Daha sakin akıntı: tidal stream hızı azaldığından dar geçişler veya akıntılı kanallar daha kolay yönetilir.\n\nGelgit tablolarında spring ve neap arasındaki geçiş, her günkü HW/LW yükseklik değerlerindeki sistematik artış veya azalmadan izlenebilir. Almanac veya yıllık tablolarda ay evreleri ile gelgit genliği arasındaki korelasyon açıkça görülür.",
        bulletPoints: [
          "Spring (yeni ay/dolunay): maksimum HW yüksekliği, minimum LW yüksekliği, maksimum range",
          "Neap (dördün): minimum HW yüksekliği, maksimum LW yüksekliği, minimum range",
          "Spring’de tidal stream güçlenir – dar kanallarda akıntı artışı dikkate alınmalı",
          "Tidal window planlaması için ay takvimi ve tidal tables birlikte kullanılmalı",
          "Range = HW − LW: spring’de büyük, neap’te küçük"
        ]
      }
    ],
    keyPoints: [
      "Spring tide: Ay+Güneş hizalı (yeni ay/dolunay), en büyük gelgit genliği.",
      "Neap tide: Ay+Güneş dik (dördün), en küçük gelgit genliği.",
      "Spring’de tidal stream güçlenir; neap’te akıntı zayıflar.",
      "Tidal window planlaması, ay takvimiyle gelgit tablolarının birlikte kullanılmasını gerektirir.",
      "Range = HW − LW; spring’de büyük range geniş tidal window yaratır."
    ]
  },
  "Chart datum (LAT)": {
    title: "Chart Datum ve LAT (Lowest Astronomical Tide)",
    introduction:
      "Chart datum, seyir haritalarında derinliklerin ve gelgit tablolarındaki su yüksekliklerinin ölçüldüğü referans sıfır seviyesidir. Kullanılan datum, ülkeden ülkeye ve haritadan haritaya farklılık gösterebilir; ancak IHO (International Hydrographic Organization) LAT’ın (Lowest Astronomical Tide) uluslararası standart datum olarak kullanılmasını tavsiye etmiştir ve çoğu modern Admiralty haritası bunu esas alır.\n\nLAT (Lowest Astronomical Tide), yalnızca astronomik (Ay ve Güneş konumu) faktörler dikkate alındığında teorik olarak elde edilebilecek en düşük su seviyesidir. Meteorolojik faktörler (fırtına gelgiti, alçak basınç etkisi) hesaba katılmaz. Bu nedenle gerçek su seviyesi teorik olarak LAT’ın altına düşebilir; ancak bu, yalnızca düşük basınç ve rüzgâr gibi meteotsunamiler gibi istisnai koşullarda gerçekleşir.",
    sections: [
      {
        title: "Datum Kavramı ve Farklı Datum Türleri",
        content:
          "Dünya genelinde kullanılan birkaç farklı chart datum türü mevcuttur. LAT (Lowest Astronomical Tide): en düşük öngörülen astronomik gelgit seviyesi – modern uluslararası standart. MLLW (Mean Lower Low Water): ABD’de yaygın kullanılan, en düşük günlük alçak suların uzun dönem ortalaması. MLW (Mean Low Water): ortalama alçak su seviyesi. LLWS (Lowest Low Water Springs): spring gelgitlerinin ortalama alçak su seviyesi – bazı Avrupa haritalarında kullanılır.\n\nBu farklı datumlar, seyircinin farklı haritalar arasında geçiş yaparken datum farklılığına dikkat etmesini gerektirir. Bazı durumlarda komşu ülke haritalarında farklı datumlar kullanılabilir; bu durum bağlantı noktalarındaki derinlik referanslarının uyumsuzluğuna yol açabilir.",
        image: tideCurrent,
        imageAlt: "Chart datum: LAT referansı ve derinlik ölçümü"
      },
      {
        title: "Gerçek Derinlik Hesabı: Datum + Gelgit Yüksekliği",
        content:
          "Harita üzerindeki derinlik değerleri (sounding), daima seçilen datuma göre ölçülmüştür. Gerçek anlık su derinliği hesabı şu formülle yapılır:\n\nGerçek Derinlik = Chart sounding (harita derinliği) + Height of Tide (gelgit yüksekliği)\n\nGelgit yüksekliği (height of tide), ilgili andaki su seviyesinin datumun kaç metre üzerinde olduğunu ifade eder. LAT datum kullanılıyorsa, gelgit yüksekliği daima pozitiftir veya sıfırdır (çünkü LAT en düşük düzeydir). Eğer gerçek su seviyesi LAT’ın altına düşmüş olsaydı, gelgit yüksekliği negatif olurdu; bu olağandışı bir durumdur.",
        formula: {
          text: "Gerçek derinlik = Harita derinliği (sounding) + Gelgit yüksekliği (height of tide)",
          description: "UKC hesabı: Gerçek derinlik − Gemi drafı − Squat − Hava kabarması payı = UKC"
        },
        bulletPoints: [
          "LAT: en düşük teorik astronomik gelgit – harita sıfır referansı",
          "Gerçek derinlik = harita derinliği + gelgit yüksekliği",
          "Gelgit yüksekliği LAT datum kullanılıyorsa ≥ 0 (teorik olarak negatif olabilir)",
          "Datum farklılığı: geçiş yapılan haritalar aynı datumu kullanıyor mu kontrol edilmeli",
          "Chart datum, Clear of Datum olan köprü altı yüksekliklerinde de kullanılır"
        ]
      }
    ],
    keyPoints: [
      "Chart datum, haritadaki derinliklerin ölçüldüğü referans sıfır seviyesidir.",
      "LAT (Lowest Astronomical Tide): IHO tavsiyeli modern uluslararası standart datum.",
      "Gerçek derinlik = harita derinliği + gelgit yüksekliği.",
      "LAT datumunda gelgit yüksekliği teorik olarak her zaman ≥ 0’dır.",
      "Farklı haritalar farklı datumlar kullanabilir; geçişlerde datum uyumsuzluğuna dikkat edilmeli."
    ]
  },
  "Tidal table okuma": {
    title: "Gelgit Tablolarını Okuma",
    introduction:
      "Gelgit tabloları (tidal tables), belirli bir referans limanı (standard port) için her günkü Yüksek Su (High Water – HW) ve Alçak Su (Low Water – LW) zamanlarını ve yüksekliklerini, genellikle UT (UTC) cinsinden ve chart datum'a göre metre olarak verir. Admiralty Tide Tables (ATT), Türkiye için Seyir, Hidrografi ve Oşinografi Dairesi yayınları ve yerel idarelerin tabloları başlıca kaynaklar arasındadır.\n\nGelgit tabloları iki temel yapıda düzenlenir: (1) Standart limanlar (standard ports): Tam yıllık HW/LW zamanı ve yükseklikleri tablo halinde verilir. (2) İkincil limanlar (secondary/subordinate ports): Standart bir referans limana göre zaman ve yükseklik düzeltme faktörleri verilir; bu faktörler standart limanın tablolarına uygulanarak ikincil liman için hesap yapılır.",
    sections: [
      {
        title: "Standart Liman Tablosundan Değer Okuma",
        content:
          "Standart liman tablosunda her satır genellikle şu sütunları içerir: Tarih (ve gün), Zaman (UT), Yükseklik (m, chart datum'a göre). Bir günde tipik olarak 2 HW ve 2 LW değeri bulunur (semidiurnal); diurnal bölgeler için 1 HW ve 1 LW yeterlidir.\n\nOkuma örneği: 15 Temmuz için Tablo → HW 03:22 / 5.6 m ve LW 09:45 / 0.9 m görünüyorsa; bu gün saat 03:22 UT'de su seviyesi chart datum üzerinde 5.6 metre, saat 09:45 UT'de ise 0.9 metre olacaktır. Tidal range = 5.6 − 0.9 = 4.7 metre; bu günün range değeridir. Zaman dilimi: tablolar genellikle UT'dedir; yerel zamana çevirmek için bölgenin UTC offset'i eklenmeli ve yazın DST (yaz saati) dikkate alınmalıdır.",
        image: tideCurrent,
        imageAlt: "Gelgit tablosu örneği ve tablo okuma"
      },
      {
        title: "İkincil Liman Düzeltmesi",
        content:
          "Çoğu küçük liman, tidal table yayınlarında doğrudan yer almaz; bunun yerine bir standart referans limana bağlı ikincil liman olarak listelenir. İkincil liman bölümünde şu düzeltmeler verilir: Zaman farkı (Time Differences): HW ve LW için standart limana göre +/− dakika farkı. Yükseklik faktörü (Height Differences veya Factors): bazı yayınlarda fark olarak (metre), bazılarında çarpan olarak (oran) verilir.\n\nUygulama: Standart limanın tablosundan HW zamanı ve yüksekliğini oku → Zaman farkını ekle/çıkar → Yükseklik düzeltmesini uygula → İkincil liman için HW zamanı ve yüksekliğini bul. Aynı işlem LW için tekrar edilir.",
        formula: {
          text: "İkincil HW zamanı = Standart HW zamanı + Zaman farkı (HW) | İkincil HW yüksekliği = Standart HW yüksekliği × Faktör (veya + Fark)",
          description: "Standart ATT yöntemine göre; bazı tablolarda interpolasyon gerekebilir"
        },
        bulletPoints: [
          "Saat dilimi kritik: tablolar UT, yerel zaman UTC offset + DST ile hesaplanır",
          "Standart liman referansı doğrulanmalı – birkaç standart limana bağlı ikincil limanlar karıştırılabilir",
          "İkincil liman düzeltmesi bazen interpolasyon gerektirir (spring/neap arasında)",
          "Her HW ve her LW için ayrı zaman ve yükseklik düzeltmesi uygulanır",
          "Tidal range düşük (neap) iken küçük bir hata bile UKC üzerinde orantısız etki yapabilir"
        ]
      }
    ],
    keyPoints: [
      "Gelgit tabloları standart limanlar için HW/LW zaman ve yüksekliklerini UT cinsinden verir.",
      "İkincil limanlar için standart limana göre zaman ve yükseklik düzeltmesi uygulanır.",
      "Tidal range = HW yüksekliği − LW yüksekliği; bu değer height of tide hesaplarının temelidir.",
      "Saat dilimi ve yazın DST (yaz saati) her zaman kontrol edilmelidir.",
      "Tablo değerleri astronomi tabanlıdır; meteoroloji etkisini (storm surge) içermez."
    ]
  },
  "Height of tide hesapları": {
    title: "Height of Tide Hesapları",
    introduction:
      "Height of Tide (gelgit yüksekliği), belirli bir zamanda ve limanda su seviyesinin chart datum’ın kaç metre üzerinde olduğunu ifade eder. Gelgit tablosundan yalnızca HW ve LW zamanları ve yükseklikleri doğrudan okunabilir; bunlar arasındaki her an için su yüksekliği hesaplanmalıdır.\n\nBu hesap, üç temel yöntemle yapılabilir: (1) 12’ler kuralı (Rule of Twelfths): basit ve hızlı, ancak yaklaşık; (2) Sinüs eğrisi interpolasyonu: daha doğru bir matematiksel yöntem; (3) Admiralty gelgit eğrisi (tidal curve): en doğru yöntem, özellikle karmaşık veya düzensiz gelgit profiline sahip limanlarda kullanılır. Denizcilik sınavlarında genellikle 12’ler kuralı ve gelgit eğrisi yöntemi istenir.",
    sections: [
      {
        title: "12’ler Kuralı ile Height of Tide",
        content:
          "12’ler kuralı, altı saatlik standart gelgit döngüsü boyunca su yüksekliğinin nasıl değiştiğini oran olarak yaklaşık biçimde ifade eder. Gelgit, ilk saatte Range’in 1/12’si kadar değişir; ikinci saatte 2/12; üçüncü saatte 3/12; dördüncü saatte 3/12; beşinci saatte 2/12; altıncı saatte 1/12. Toplam 12/12 = tam range, yani HW’den LW’ye veya LW’den HW’ye geçiş tamamlanmış olur.\n\nUygulama: Tablo → LW yüksekliği 0.8 m, HW yüksekliği 5.6 m, Range = 4.8 m. LW zamanından 2 saat sonraki height of tide = LW + (1/12 + 2/12) × Range = 0.8 + (3/12 × 4.8) = 0.8 + 1.2 = 2.0 m.",
        image: tideCurrent,
        imageAlt: "12’ler kuralı ile gelgit yüksekliği hesabı",
        formula: {
          text: "Birikimli değişim: 1st hr 1/12 | 2nd hr 3/12 | 3rd hr 6/12 | 4th hr 9/12 | 5th hr 11/12 | 6th hr 12/12",
          description: "Birikimli oranlar: LW’den itibaren hesaplama yapılıyorsa bu oranlar eklenerek height of tide bulunur"
        }
      },
      {
        title: "Admiralty Tidal Curve Yöntemi",
        content:
          "Admiralty Tide Tables (ATT) Part I’de her standart liman için bir tidal curve (gelgit eğrisi) verilir. Bu eğri, liman özelinde kalibre edilmiştir ve gerçek gelgit profilini 12’ler kuralından çok daha doğru yansıtır. Özellikle kıyı geometrisi nedeniyle düzensiz gelgit döngüsü yaşayan limanlarda tidal curve yöntemi zorunludur.\n\nTidal curve kullanımı adımları: (1) Standart liman tablosundan HW/LW zamanı ve yüksekliği okunur. (2) Range (= HW − LW) hesaplanır. (3) Hesaplanacak andaki HW’ye olan zaman farkı (x ekseni) bulunur. (4) Eğri üzerinden bu zaman farkına karşılık gelen interpolasyon faktörü (F) okunur. (5) Height of tide = LW + F × Range formülüyle hesaplanır.",
        bulletPoints: [
          "12’ler kuralı 6 saatlik standart gelgit için yaklaşıktır; yavaş veya hızlı gelgitlerde hata artar",
          "Tidal curve yöntemi her liman için kalibre edilmiştir – daha doğru",
          "Range değeri spring/neap için farklıdır; tabloda hangi tarih için hesap yapıldığı belirtilmeli",
          "ATT Part I: standart limanlar için tidal curve grafiği içerir",
          "Height of tide hesabı doğrudan UKC ve tidal window hesabına girer"
        ]
      }
    ],
    keyPoints: [
      "12’ler kuralı: her saatte 1, 2, 3, 3, 2, 1 oranında yükseklik değişimi (toplam 12/12 = tam range).",
      "Tidal curve yöntemi daha doğru; her standart liman için ATT Part I’de verilir.",
      "Height of tide = LW + F × Range; F, tidal curve’den veya 12’ler kuralından elde edilir.",
      "Hesaplanan height of tide doğrudan harita derinliğine eklenerek gerçek derinlik bulunur.",
      "Karmaşık veya düzensiz gelgit profiline sahip limanlarda tidal curve zorunludur."
    ]
  },
  "12’ler kuralı": {
    title: "12’ler Kuralı (Rule of Twelfths)",
    introduction:
      "12’ler kuralı, LW’den HW’ye veya HW’den LW’ye geçen altı saatlik standart gelgit döngüsünde her saatte gerçekleşen su yüksekliği değişiminin toplam range’e oranını yaklaşık olarak veren pratik bir mnemonikal kuraldır. Kuralın temel dayanağı, gelgit eğrisinin sinüs formuna yakın olduğu ve bu nedenle gelgitin ortasında en hızlı, uçlarda (HW ve LW civarında) en yavaş değiştiğidir.\n\nKural: toplam range (HW − LW) 12 eşit parçaya bölünür. Her saatte gerçekleşen değişim sırasıyla 1/12, 2/12, 3/12, 3/12, 2/12, 1/12 oranlarındadır. Bu oranların toplamı 12/12 = 1 (tam range) eder. Yöntem özellikle hızlı ve görsel hesap için son derece pratiktir; not defterine çizmek veya zihinsel hesap yapmak mümkündür.",
    sections: [
      {
        title: "12’ler Kuralının Adım Adım Uygulaması",
        content:
          "Adım 1: Tablondan LW ve HW zamanları ile yüksekliklerini oku. Adım 2: Range = HW − LW hesapla. Adım 3: Range’i 12’ye böl → 1 birim değeri bul. Adım 4: Hedef zamanın LW (veya HW) üzerinden kaçıncı saat olduğunu belirle. Adım 5: Birikimli oranı uygula: 1. saat +1/12; 2. saat kümülatif +3/12; 3. saat kümülatif +6/12; 4. saat kümülatif +9/12; 5. saat kümülatif +11/12; 6. saat kümülatif +12/12.\n\nÖrnek: LW = 0.6 m, HW = 5.4 m, Range = 4.8 m. LW’den 3 saat sonraki height of tide = 0.6 + (6/12 × 4.8) = 0.6 + 2.4 = 3.0 m. LW’den 4 saat sonraki height of tide = 0.6 + (9/12 × 4.8) = 0.6 + 3.6 = 4.2 m.",
        image: tideCurrent,
        imageAlt: "12’ler kuralı: 1-2-3-3-2-1 oranları ve örnek hesap",
        formula: {
          text: "Kümülatif: 1h → 1/12 | 2h → 3/12 | 3h → 6/12 | 4h → 9/12 | 5h → 11/12 | 6h → 12/12",
          description: "Height of tide = LW yüksekliği + (Kümülatif oran × Range)"
        }
      },
      {
        title: "Kural Sınırları ve Ne Zaman Tidal Curve Kullanılmalı",
        content:
          "12’ler kuralı şu varsayımları gerektirir: (1) gelgit döngüsü tam altı saattir; (2) HW ve LW arasındaki geçiş simetrik sinüs formuna uyar. Bu koşullar sağlandığında kural makul bir yaklaşım verir; ancak birçok limanda bu koşullar sağlanmaz.\n\nKuralın yetersiz kaldığı durumlar: (a) Gelgit periyodu altı saatten farklı: bazı bölgelerde HW–LW aralığı 5 saat veya 7–8 saattir; kuralın 6 saatlik oranları bu limanlarda hatalı sonuç verir. (b) Asimetrik gelgit profili: bazı limanlarda yükselen gelgit hızlı, alçalan gelgit yavaş (veya tersi) olabilir; 12’ler kuralı bu asimetriyi yakalayamaz. (c) Kritik UKC hesabı: dar emniyet marjı olan hesaplarda 12’ler kuralı yeterli değildir; tidal curve kullanılmalıdır.",
        bulletPoints: [
          "12’ler kuralı 1–2–3–3–2–1: kümülatif olarak 1/12, 3/12, 6/12, 9/12, 11/12, 12/12",
          "Gelgit ortasında (3. saat) en hızlı değişim; HW ve LW yakınında en yavaş",
          "Pratik avantaj: kağıt, hesap makinesi olmadan zihinsel hesap mümkün",
          "6 saatlik simetrik döngü varsayımı: farklı limanlarda periyot değişir",
          "Kritik UKC hesabında tidal curve yöntemi tercih edilmeli"
        ]
      }
    ],
    keyPoints: [
      "12’ler kuralı: gelgit her saatte 1, 2, 3, 3, 2, 1 oranında (range’in 1/12’si cinsinden) değişir.",
      "Kümülatif oranlar: 1/12, 3/12, 6/12, 9/12, 11/12, 12/12 → LW’den HW’ye geçişi gösterir.",
      "Height of tide = LW yüksekliği + (Kümülatif oran × Range).",
      "Altı saatten farklı periyotlu veya asimetrik gelgit profilinde kural hatalı sonuç verir.",
      "Kritik UKC ve tidal window hesaplarında tidal curve yöntemi kullanılmalıdır."
    ]
  },
  "İnterpolasyon": {
    title: "İnterpolasyon – Gelgit Hesaplarında Ara Değer Bulma",
    introduction:
      "İnterpolasyon (interpolation), iki bilinen değer arasında kalan bir ara değeri, bu iki değer arasındaki ilişkiyi modelleyerek tahmin etme yöntemidir. Gelgit hesaplarında interpolasyon iki farklı bağlamda kullanılır: (1) Zaman interpolasyonu: HW veya LW'nin tam olarak tablodaki saat başlarına denk gelmediği durumlarda geçiş zamanı hesabı. (2) İkincil liman yükseklik interpolasyonu: ikincil liman düzeltme faktörlerinin spring ve neap değerleri arasında interpolasyonla bulunması.",
    sections: [
      {
        title: "Lineer İnterpolasyon Prensibi",
        content:
          "Lineer interpolasyon, iki bilinen nokta arasındaki değişimin doğrusal (orantılı) olduğunu varsayar. Formül:\n\ny = y₁ + (x − x₁) / (x₂ − x₁) × (y₂ − y₁)\n\nBurada x₁, x₂ bilinen zaman veya parametre değerleri; y₁, y₂ bu değerlere karşılık gelen gelgit yükseklikleri veya düzeltme faktörleridir. x, hesaplanmak istenen andaki değerdir.\n\nGelgit hesabında doğrudan uygulama: Bir ikincil limanın spring ve neap için zaman düzeltmeleri farklı tablolarda veriliyorsa (örneğin spring için +20 dak, neap için +35 dak) ve o gün spring-neap arası bir dönem yaşanıyorsa, günün HW yüksekliği oransal olarak bir düzeltme değerine interpolasyon yapılır.",
        image: tideCurrent,
        imageAlt: "Lineer interpolasyon ve gelgit düzeltmesi",
        formula: {
          text: "y = y₁ + [(x − x₁) / (x₂ − x₁)] × (y₂ − y₁)",
          description: "Lineer interpolasyon formülü: x₁,y₁ ve x₂,y₂ bilinen noktalar; x istenen değer; y bulunan sonuç"
        }
      },
      {
        title: "Gelgit Hesaplarında İnterpolasyon Örnekleri",
        content:
          "ATT ikincil liman tablosundaki interpolasyon: Standart limanda spring HW yüksekliği 6.0 m için düzeltme +0.3 m; neap HW yüksekliği 3.5 m için düzeltme −0.1 m. O gün standart limanda HW = 5.0 m ise:  Düzeltme = +0.3 + [(5.0 − 6.0) / (3.5 − 6.0)] × (−0.1 − 0.3) = +0.3 + [0.4] × (−0.4) = +0.3 − 0.16 = +0.14 m (yaklaşık +0.1 m). Bu ikincil liman için uygulanacak yükseklik düzeltmesidir.\n\nZaman interpolasyonu: Standart limanda tablodan HW zamanı 14:30 UT; zaman dilimi +3 (Türkiye), yaz saati +1 = yerel saat 14:30 + 4 = 18:30. Bu hesap lineer olmakla birlikte yaz/kış saati geçiş tarihlerine dikkat edilmeli; tablo datumunun hangi yılı kapsadığı doğrulanmalıdır.",
        bulletPoints: [
          "Lineer interpolasyon iki bilinen değer arasında orantılı hesap sağlar",
          "ATT ikincil liman düzeltmeleri spring/neap için iki ayrı değer içerir – interpolasyon gerekir",
          "Gelgit profili doğrusal değildir; interpolasyon yalnızca yaklaşık sonuç verir",
          "Tidal curve üzerinde interpolasyon, tidal curve grafiğinden oran okuyarak yapılır",
          "Kesin sınır değerleri gerektiren hesaplarda (UKC, tidal window) interpolasyon sonucu bir emniyetli marjla desteklenmeli"
        ]
      }
    ],
    keyPoints: [
      "Lineer interpolasyon: y = y₁ + [(x−x₁)/(x₂−x₁)] × (y₂−y₁).",
      "ATT ikincil liman tablolarında spring ve neap düzeltme değerleri arasında interpolasyon yapılır.",
      "Gelgit profili sinüsoidal; lineer interpolasyon yaklaşıktır – kritik hesaplarda tidal curve tercih edilmeli.",
      "Zaman interpolasyonunda saat dilimi ve yaz saati dönüşümü dikkatli yapılmalıdır.",
      "Güvenlik gerektiren hesaplarda interpolasyon sonucuna emniyetli marj eklenmesi önerilir."
    ]
  },
  "Tidal stream": {
    title: "Tidal Stream – Gelgit Akıntısı",
    introduction:
      "Tidal stream (gelgit akıntısı), denizlerdeki periyodik su yüksekliği değişiminin (gelgitin) neden olduğu yatay su hareketidir. Gelgit hareketi yukarı-aşağı olduğu halde, bu hareket kıyı geometrisi ve havza şekli nedeniyle yatay akıntılara dönüşür. Gelgit akan su, set (akıntı yönü) ve drift (akıntı hızı, knot cinsinden) parametreleriyle tanımlanır.\n\nTidal stream, nehir akıntısı veya okyanus sirkülasyonu gibi kalıcı akıntılardan farklı olarak periyodik ve yön değiştiricidir. Bir gelgit döngüsünde akıntı hem hız hem de yön bakımından değişir: alçalan gelgit sırasında bir yönde akarken, HW slack water (durgun su) döneminin ardından yükselen gelgitle birlikte ters yönde akmaya başlar. Bu periyodik karakteri, tidal stream'i tahmin edilebilir kılmaktadır; tidal atlas ve akıntı tabloları, her konumdaki akıntıyı saat bazında önceden gösterir.",
    sections: [
      {
        title: "Tidal Atlas ve Akıntı Tablolarının Kullanımı",
        content:
          "Tidal atlas (akıntı atlası), bir deniz bölgesindeki tidal stream'i her saat için ok işaretleri ve sayısal değerlerle gösteren seri haritalar topluluğudur. Admiralty Tidal Atlas'larda her sayfa, HW'den belirli saat önce veya sonraki akıntı durumunu gösterir: HW−6, HW−5, ..., HW−0, HW+1, ..., HW+6. Okların yönü set'i, yanındaki sayılar neap/spring hızlarını (genellikle 0.x/0.y knot biçiminde) verir.\n\nAkıntı tabloları (tidal stream tables), belirli referans noktaları için saat bazında set ve drift değerlerini liste halinde sunar. Tidal atlas'a kıyasla belirli bir noktaya özgü daha detaylı bilgi sağlar; ancak atlasın görseLliği seyir planlamasında bütüncül bir bakış açısı sunar.",
        image: tideCurrent,
        imageAlt: "Tidal atlas örneği ve akıntı yönü işaretleri"
      },
      {
        title: "Slack Water ve Akıntı Geçişi",
        content:
          "Tidal stream'in yön değiştirmesi anında akıntı hızı sıfıra yaklaşır; bu dönem slack water (durgun su) olarak adlandırılır. Slack water, dar kanallarda ve boğazlarda manevra için en uygun zamandır; çünkü akıntı kuvveti minimumdur ve gemi üzerindeki yan kuvvet azalmıştır.\n\nSlack water zamanı, HW veya LW zamanından farklıdır; aradaki fark konuma ve coğrafyaya göre değişir. Bazı dar kanallarda slack water, HW'den 2–3 saat sonra oluşabilir. Bu nedenle tidal stream geçiş zamanı, yalnızca gelgit tablosundan değil, tidal atlas veya akıntı tablolarından belirlenmelidir. Boğaz geçişini slack water'a planlamak, manevra emniyetini önemli ölçüde artırır.",
        bulletPoints: [
          "Tidal stream: periyodik, yön değiştiren gelgit kaynaklı akıntı",
          "Set = akıntı yönü (True); Drift = akıntı hızı (knot)",
          "Slack water: akıntı geçişinde hız sıfıra iner – dar kanal geçişi için en uygun zaman",
          "Slack water zamanı HW/LW zamanından farklı olabilir; tidal atlas'tan belirlenmeli",
          "Spring'de tidal stream hızı neap'e kıyasla yaklaşık 1.5–2 kat daha yüksek olabilir"
        ]
      }
    ],
    keyPoints: [
      "Tidal stream, gelgit hareketinin neden olduğu yatay su akıntısıdır; set ve drift ile ifade edilir.",
      "Tidal atlas: HW'ye göre saat başı akıntı yönü ve hızını harita üzerinde gösterir.",
      "Slack water: yön geçişinde akıntı hızı sıfıra iner – dar kanal geçişleri için idealdir.",
      "Slack water zamanı gelgit zamanından farklı olabilir; atlasla belirlenmeli.",
      "Spring'de tidal stream neap'e kıyasla belirgin biçimde güçlenir."
    ]
  },
  "Set – drift": {
    title: "Set ve Drift",
    introduction:
      "Set ve drift, herhangi bir akıntının (gelgit, okyanus sirkülasyonu veya rüzgâr kaynaklı yüzey sürükleme) denizcilik açısından tanımlanmasında kullanılan iki temel parametredir. Set, akıntının hareket ettiği yönü (gerçek kuzeyden saat yönünde derece cinsinden, akıntının gittiği yön); Drift ise akıntının hızını (deniz mili/saat – knot cinsinden) ifade eder.\n\nBu tanımlama, rüzgâr yönünden farklıdır: rüzgâr geldiği yönden tarif edilirken (örn. kuzeybatı rüzgârı kuzey batıdan gelir), akıntı gittiği yönden tarif edilir (örn. set 090° akıntı doğuya doğru akmaktadır). Bu fark, özellikle akıntı ve rüzgâr etkilerini aynı hesap içinde yorumlarken kritik önem taşır.",
    sections: [
      {
        title: "Set ve Drift'in Vektörel Kullanımı",
        content:
          "Seyir hesaplarında set ve drift, gemi hız vektörüne (STW ve heading) eklenerek gerçek zemin hareketi (COG ve SOG) elde edilir. Bu vektör toplamı, üç farklı bileşeni kapsar: gemi hız vektörü (heading ve STW), akıntı vektörü (set ve drift), ve sonuç vektörü (COG ve SOG).\n\nÖrnek: Gemi heading 270° (gerçek), STW 12 knot. Akıntı set 180° (güneye gidiyor), drift 2 knot. Vektörel toplam: batıya giden gemi aynı zamanda 2 knot güneye sürükleniyor; COG yaklaşık 264° ve SOG yaklaşık 12.2 knot olur. Bu hesap grafiksel olarak vektör üçgeni çizilerek ya da trigonometrik bileşen yöntemiyle analitik olarak yapılabilir.",
        image: tideCurrent,
        imageAlt: "Set, drift ve vektör üçgeni",
        formula: {
          text: "SOG² = STW² + Drift² + 2×STW×Drift×cos(Set − Heading) | COG trigonometrik hesap",
          description: "Vektör toplamı: gemi hız vektörü + akıntı vektörü = COG/SOG vektörü"
        }
      },
      {
        title: "Gözlemsel Set ve Drift Tespiti",
        content:
          "Uygulamada set ve drift iki şekilde belirlenir: (1) Kaynaklardan (tidal atlas, akıntı tabloları, pilot books): bölgenin akıntısı önceden bilinir ve seyir planına dahil edilir. (2) Gözlem: belirli bir süre boyunca GPS COG/SOG ile gyro heading ve log STW değerleri karşılaştırılır; fark, fiili set ve drift'i verir.\n\nGözlemsel yöntem: Gemi belli bir süre sabit heading ve STW ile seyretsin; GPS SOG ve COG değerleri ölçülsün. Set = COG − intended COG (akıntı olmadan elde edilmesi beklenen rota); bu fark vektörünün yönü set'i, büyüklüğü drift'i yaklaşık olarak verir. Bu yöntem, gerçek fiili akıntı koşullarını ölçer ve mevcut tahminlerle karşılaştırma fırsatı sunar.",
        bulletPoints: [
          "Set: akıntının gittiği yön (True kuzeyden derece); Drift: akıntı hızı (knot)",
          "Akıntı yön tanımı rüzgârın tersidir: geldiği değil, gittiği yön",
          "COG/SOG = heading/STW + set/drift vektörel toplamı",
          "Gözlemsel set-drift: GPS COG/SOG ile gyro/log karşılaştırmasından elde edilir",
          "Seyir planlamasında akıntı etkisi ETA ve yakıt hesabına dahil edilmeli"
        ]
      }
    ],
    keyPoints: [
      "Set = akıntının gittiği yön (gerçek kuzeyden derece); Drift = akıntı hızı (knot).",
      "Akıntı gittiği yönden tarif edilir; rüzgâr geldiği yönden tarif edilir – bu fark kritik.",
      "COG/SOG, heading/STW ve set/drift vektörlerinin toplamıdır.",
      "Gözlemsel set-drift: GPS COG/SOG ile gyro heading/log STW karşılaştırmasından elde edilir.",
      "Set ve drift, ETA hesabına ve yakıt planlamasına dahil edilmelidir."
    ]
  },
  "UKC + gelgit hesapları": {
    title: "UKC ve Gelgit Hesapları",
    introduction:
      "UKC (Under Keel Clearance – Omurga Altı Mesafesi), geminin omurgası ile deniz tabanı arasında kalan su sütununun yüksekliğidir. Bu değer sıfıra ulaşırsa gemi karaya oturur; bu nedenle UKC, seyir emniyetinin en temel kritik göstergelerinden biridir. Herhangi bir andaki gerçek UKC, harita derinliği, gelgit yüksekliği, gemi draftı, squat ve hava kabarması payı (swell allowance) gibi birden fazla faktörün bileşimidir.\n\nUKC hesabı, özellikle liman girişlerinde, dar kanallarda ve sığ sularda kritik önem taşır. Çoğu şirket, ISM Kodu kapsamında minimum UKC politikası belirler; bu politika genellikle açık denizde draftın %10–15’i ve limanlarda 0.5–1.0 metre gibi sabit değerler biçiminde ifade edilir. Bu limitlerin altına inmek güvensiz olarak kabul edilir.",
    sections: [
      {
        title: "UKC Hesabının Bileşenleri",
        content:
          "Bir UKC hesabının tam doğruluğu için şu bileşenler göz önüne alınmalıdır:\n\n(1) Harita derinliği (chart sounding): datum’a göre haritadaki değer.\n(2) Gelgit yüksekliği (height of tide): hesaplama anında suyun datumdan yüksekliği.\n(3) Gemi draftı: genellikle orta kesitteki maksimum; trim düzeltmesi gerekebilir.\n(4) Squat: hızdan kaynaklanan dinamik batma – ilerleyen bölümde ayrıntılı ele alınır.\n(5) Hava kabarması (wave allowance veya swell allowance): özellikle açık denizde swell etkisiyle gemi hareket eder; bu hareket anlık draftı artırır.\n(6) Balast ve akıntı değişkeni: transit sırasında balast veya yakıt tüketimi draftı değiştirebilir.",
        image: safetyEquipment,
        imageAlt: "UKC bileşenleri: harita derinliği, gelgit, draft ve squat",
        formula: {
          text: "UKC = (Harita derinliği + Gelgit yüksekliği) − (Draft + Squat + Hava kabarması payı)",
          description: "Tüm değerler metre cinsinden; sonuç ≥ minimum UKC politikası olmalıdır"
        }
      },
      {
        title: "Tidal Window Hesabı ve Uygulama",
        content:
          "Tidal window (gelgit penceresi), bir limana giriş veya çıkış için gereken minimum su derinliğinin sağlandığı zaman aralığıdır. Hesap şu adımları içerir: (1) Minimum gereken su derinliği = Draft + Squat + Hava payı + Minimum UKC. (2) Bu derinliği sağlayan gelgit yüksekliği = Minimum gereken su derinliği − Harita derinliği. (3) Tidal table ve 12’ler kuralı veya tidal curve kullanılarak bu gelgit yüksekliğine ne zaman ulaşıldığı ve ne kadar süre o seviyenin üzerinde kalındığı hesaplanır.\n\nÖrnek: Kanal derinliği 9.0 m (haritadan), Gemi draftı 8.2 m, Squat 0.3 m, Minimum UKC 0.5 m, Hava payı 0.3 m. Minimum su = 8.2 + 0.3 + 0.5 + 0.3 = 9.3 m. Gereken minimum gelgit yüksekliği = 9.3 − 9.0 = 0.3 m. Tidal table’dan bu değerin ne zaman ve ne kadar süre aşıldığı hesaplanır – işte bu süre tidal window’dur.",
        bulletPoints: [
          "UKC = (Harita derinliği + Height of Tide) − (Draft + Squat + Hava payı)",
          "Squat: hızla artar – dar kanallarda hız azaltma UKC’yi korur",
          "Tidal window: minimum gereken su derinliğinin sağlandığı zaman aralığı",
          "Spring’de tidal window neap’e göre genellikle daha uzundur",
          "UKC hesabında tidal table ve 12’ler kuralı/tidal curve birlikte kullanılır"
        ]
      }
    ],
    keyPoints: [
      "UKC = (Harita derinliği + Gelgit yüksekliği) − (Draft + Squat + Hava payı).",
      "Minimum UKC şirket politikası ve yerel liman kurallarınca belirlenir; bu limitin altına inilmez.",
      "Tidal window: minimum UKC’yi karşılayan gelgit yüksekliğinin sağlandığı zaman aralığı.",
      "Squat, draft üzerine eklenmeli; hız azaltma squat’ı ve dolayısıyla UKC riskini azaltır.",
      "Spring tidal window neap’e göre genişler; büyük draftlı gemiler için spring geçişi planlanmalıdır."
    ]
  },
  "Tidal window (liman giriş zamanı)": {
    title: "Tidal Window – Liman Giriş ve Çıkış Zamanı",
    introduction:
      "Tidal window (gelgit penceresi), bir geminin belirli draft değeriyle bir limana veya kanala güvenli biçimde giriş ya da çıkış yapabilmesi için yeterli su derinliğinin mevcut olduğu zaman aralığıdır. Özellikle sığ barlar (bar), kanal girişleri ve gelgitin belirleyici olduğu limanlarda tidal window, tüm operasyonel takvimin merkezini oluşturur.\n\nTidal window hesabı, UKC hesabının doğal devamıdır: minimum UKC koşulunu sağlayan gelgit yüksekliği bulunur ve bu yüksekliğin ne zaman aşıldığı, ne kadar süreyle aşıldığı ve ne zaman yeniden altına düştüğü belirlenir. Bu süre tidal window’dur; giriş/çıkış operasyonu bu pencere içinde tamamlanmalıdır.",
    sections: [
      {
        title: "Tidal Window Hesabı: Adım Adım",
        content:
          "Adım 1: Minimum su derinliği (MSD) hesapla. MSD = Draft + Squat + Hava payı + Min. UKC. Adım 2: Gereken minimum gelgit yüksekliği (MHoT) bul. MHoT = MSD − Chart derinliği. Adım 3: Tidal table’dan o gün için HW/LW zamanları ve yüksekliklerini oku. Adım 4: 12’ler kuralı veya tidal curve kullanarak MHoT’nin kaçıncı saatte aşıldığını ve kaçıncı saatte yeniden bu değerin altına düştüğünü hesapla. Bu iki zaman arasındaki süre tidal window’dur.\n\nÖrnek: Kanal sounding 8.0 m, Draft 7.5 m, Squat 0.2 m, Min. UKC 0.5 m, Hava payı 0.2 m. MSD = 8.4 m. MHoT = 8.4 − 8.0 = 0.4 m. Bugün LW = 0.2 m, HW = 5.2 m, gelgit period ≈ 6 saat. LW’den başlayarak 12’ler kuralıyla MHoT = 0.4 m ne zaman aşılıyor? LW + 0.4 m = 1. saatin hemen başında. HW’den sonra aynı değere ne zaman dönüyor? Simetriden ≈ LW+5 saat. Tidal window ≈ 5 saatlik bir aralıktır.",
        image: tideCurrent,
        imageAlt: "Tidal window hesabı: gelgit eğrisi ve giriş zamanı",
        formula: {
          text: "MHoT = MSD − Chart sounding = (Draft + Squat + Hava payı + Min.UKC) − Chart sounding",
          description: "MHoT = tidal window’u açan minimum gelgit yüksekliği"
        }
      },
      {
        title: "Operasyonel Planlama ve Emniyet Payları",
        content:
          "Tidal window belirlendikten sonra liman ajanına, pilota, römorköre ve güvertede liman operasyonuna hazırlık için yeterli süre bırakılmalıdır. Gerçekçi bir tidal window planı şu payları içerir: (1) Erken giriş payı: window açılısından hemen sonra girmek yerine, 30–60 dakika ilave beklemek UKC marjını artırır. (2) İşletme payı: transit sırasında beklenmedik hız kayıpları, trafik gecikmesi veya pilot koordinasyon süresi hesaba katılmalıdır. (3) Emniyet payı: gelgit tahmini meteoroloji etkisini içermez; fırtına gelgiti (storm surge) veya alçak basınç, beklenen su seviyesini 0.5–1.0 metre düşürebilir. Bu nedenle kritik geçişlerde meteoroloji tabanlı su seviyesi tahmini de kullanılmalıdır.",
        bulletPoints: [
          "Tidal window: MHoT’nin sağlandığı zaman aralığı – hesaptan önce MSD ve MHoT belirlenmeli",
          "Spring’de tidal window genişler, neap’te daralır – giriş tarihi spring dönemi için planlanmalı",
          "Tidal window’un ortası, maksimum UKC’nin sağlandığı andır – en güvenli giriş zamanı",
          "Meteorolojik storm surge, tidal window’u daraltabilir – sadece gelgit tablolarına güvenilmemeli",
          "Pilot, römorkör ve operasyon hazırlığı tidal window içinde tamamlanabilecek şekilde planlanmalı"
        ]
      }
    ],
    keyPoints: [
      "Tidal window: minimum UKC koşulunu karşılayan gelgit yüksekliğinin sağlandığı zaman aralığı.",
      "MHoT = (Draft + Squat + Hava payı + Min.UKC) − Harita derinliği.",
      "Window’un ortası maksimum UKC’ye karşılık gelir – en güvenli giriş anıdır.",
      "Storm surge ve meteoroloji etkisi tidal window hesabını değiştirebilir; sadece astronomi tablolarına güvenilmemeli.",
      "Spring döneminde tidal window genellikle neap’e göre daha uzundur."
    ]
  },
  "Rüzgârın gemiye etkisi": {
    title: "Rüzgârın Gemiye Etkisi",
    introduction:
      "Rüzgâr, gemi üzerinde iki temel hidrodinamik etki yaratır: sürükleme kuvveti (drag force) ve kaldırma/itme kuvveti (lift force). Bu iki kuvvetin bileşimi, geminin denizde tuttuğu rotayı, hızını ve manevra kabiliyetini etkiler. Rüzgâr etkisi hem açık deniz seyir planlamasında hem de limanlarda manevralar sırasında kritik değişken olarak ele alınmalıdır.\n\nRüzgârın gemiye etkisi, geminin fribord yüksekliğine (suyun üzerindeki yan yüzey alanı), üst yapı şekline ve yükleme durumuna bağlıdır. Boş gemi (ballast) koşulunda fribord yüksek olduğundan rüzgâr etkisi çok daha belirgindir; yüklü gemide su hattı yüksek, fribord düşük olduğundan rüzgâr etkisi görece azalır.",
    sections: [
      {
        title: "Rüzgârın Yarattığı Kuvvetler: Leeway ve Hız Etkisi",
        content:
          "Yan rüzgâr (beam wind): geminin baş-kıç eksenine dik açıyla esen rüzgâr, gemi üzerinde rüzgâr altına doğru bir yan kuvvet oluşturur. Bu kuvvet geminin rüzgâr altına doğru kaymasına – leeway (rüzgâr kayması) – neden olur. Gemi heading yönünde ilerlese de gerçek iz (COG) leeway açısı kadar rüzgâr altına saptırılır.\n\nBaş rüzgâr (head wind): gemiye doğrudan pruva yönünden esen rüzgâr, ilerleyişe karşı direnç (drag) yaratır ve hızı düşürür. Bu hız düşüşü SOG'u azaltır ve ETA'yı olumsuz etkiler. Yakıt tüketimi aynı makine gücünde artabilir ya da aynı hızı korumak için daha yüksek makine gücü gerekebilir.\n\nKıç rüzgâr (following wind): geminin arkasından esen rüzgâr ilerleyişe katkı sağlar ve SOG'u artırır; ancak dalga ve rüzgâr aynı yönden geliyorsa broaching (kıç alabanda tehlikesi) riski oluşabilir.",
        image: yonWindDrift,
        imageAlt: "Rüzgâr kuvvetleri ve leeway etkisi"
      },
      {
        title: "Liman Manevralarında Rüzgâr Etkisi",
        content:
          "Açık deniz seyri ile liman manevrası arasındaki en belirgin fark, liman manevralarında rüzgârın anlık ve büyük ölçekli etkilerinin çok daha kısa sürede hissedilmesidir. Boş geminin yüksek friborduna güçlü yan rüzgâr etki ettiğinde gemi yan rüzgâr altına doğru hızla sürüklenebilir; bu durum, iskelede veya demirleme manevrasında ciddi kontrol güçlüğü yaratır.\n\nOperasyonel değerlendirme: liman manevrası öncesinde hangi tarafın rüzgâra karşı olacağı belirlenir; rüzgâr etkisine göre römorkör pozisyonları ve güç gereksinimleri planlanır. İskele bağlama işlemlerinde rüzgâr durumu, baş ve kıç rıhtım halatlarının gergiliğini etkilediğinden uygun halatlar sabitlenmeli ve gevşetilmemelidir.",
        bulletPoints: [
          "Yan rüzgâr leeway üretir – COG, heading'den rüzgâr altına sapar",
          "Baş rüzgâr hız kaybı ve yakıt tüketim artışına yol açar",
          "Kıç rüzgâr SOG artışı sağlar; ancak broaching riski izlenmeli",
          "Ballast/boş gemi yüklü gemiye göre çok daha fazla rüzgâr etkisine maruz kalır",
          "Liman manevrası öncesinde rüzgâr gücü ve yönü, römorkör planına dahil edilmeli"
        ]
      }
    ],
    keyPoints: [
      "Rüzgâr, sürükleme (drag) ve yanal kuvvet (lift) yaratarak rota ve hızı etkiler.",
      "Yan rüzgâr leeway üretir; gemi heading yönünde ilerler ama COG rüzgâr altına saptırılır.",
      "Baş rüzgâr hız kaybı, kıç rüzgâr hız kazancı yaratır.",
      "Ballast/boş gemi yüksek fribord nedeniyle rüzgâr etkisine en duyarlı durumdadır.",
      "Liman manevralarında rüzgâr gücü ve yönü römorkör planlamasının temel girdisidir."
    ]
  },
  "Leeway kavramı": {
    title: "Leeway Kavramı",
    introduction:
      "Leeway (rüzgâr kayması), rüzgâr kuvvetinin etkisiyle geminin izlediği gerçek yolun (COG – Course Over Ground), geminin baş yönünün (heading) gösterdiği rotadan rüzgâr altına doğru sapması olgusudur. Başka bir ifadeyle: gemi dümenini belirli bir yöne tutsa da, rüzgâr onu yanal olarak iter ve gerçek iz hedeflenen rotadan ayrılır.\n\nLeeway, derece cinsinden ifade edilir ve her zaman rüzgâr altı yönündedir; yani kuzeyden esen bir rüzgârda (rüzgâr üstü = kuzey, rüzgâr altı = güney) gemi güneye doğru kayar. Leeway açısının büyüklüğü; rüzgâr şiddetine, geminin fribord yüksekliğine, hıza ve gemi formuna bağlıdır.",
    sections: [
      {
        title: "Leeway Açısının Fiziksel Temeli",
        content:
          "Geminin su üstündeki lateral alanı (fribord + üst yapı yüzeyleri), rüzgâr kuvvetini emer. Su altındaki lateral alan ise bu kuvvete direnç gösterir; omurga, san ve trim tabı yan harekete karşı direncin temel kaynağıdır. Su altı lateral alan, su üstü lateral alandan çok daha büyük olduğu için gemi tamamen rüzgâr altına sürüklenmez; ancak denge noktasında belirli bir açı tutturulur – bu leeway açısıdır.\n\nLeeway açısını artıran faktörler: rüzgâr şiddeti artışı, geminin hafif yüklü (ballast) olması (fribord artışı), düşük seyir hızı (hydrodynamik direnç azalır), geniş üst yapı, düz şekilli gemi gövdesi. Leeway açısını azaltan faktörler: dolu yüklü durum, yüksek hız, dar ve derin bir gemi gövdesi.",
        image: yonWindDrift,
        imageAlt: "Leeway açısı: heading ile COG arasındaki fark"
      },
      {
        title: "Leeway’in Seyir Planlamasına Yansıması",
        content:
          "Leeway, geminin gerçek iz (COG) ve hedeflenen rota arasında sistematik bir açı oluşturur. Seyir planlamasında leeway dikkate alınmazsa gemi istenen rotadan saparak tehlikeli bölgelere yaklaşabilir; özellikle kıyı seyri ve dar kanallarda bu risk belirginleşir.\n\nLeeway’i kompanse etmek için iki temel yaklaşım kullanılır: (1) Heading düzeltmesi: gemi, leeway açısı kadar rüzgâr üstüne doğru çevrilir. Örneğin hedeflenen COG 090°, leeway açısı 5° ve rüzgâr kuzeyden esiyorsa (gemi güneye kayıyor) heading 085°’ye alınır. (2) GPS COG izleme: modern seyirde GPS sürekli COG verir; başın bu değere göre sürekli düzeltilmesi leeway’i otomatik kompanse eder. Ancak bu, GPS hatası durumunda yedek bilgi kaynağının olmadığı bir yaklaşımdır.",
        bulletPoints: [
          "Leeway daima rüzgâr altı yönündedir",
          "Ballast gemi yüklü gemiden çok daha büyük leeway yapar",
          "Hız artışı leeway açısını azaltır",
          "Heading düzeltmesi: hedeflenen COG için heading rüzgâr üstüne çekilir",
          "GPS COG sürekli izlenerek heading dinamik olarak düzeltilir"
        ]
      }
    ],
    keyPoints: [
      "Leeway: rüzgâr kuvvetinin neden olduğu COG ile heading arasındaki açısal fark; daima rüzgâr altına yönelir.",
      "Büyük fribord, düşük hız ve güçlü yan rüzgâr leeway’i artırır.",
      "Leeway kompansasyonu: heading, leeway açısı kadar rüzgâr üstüne çekilir.",
      "GPS COG izleme, heading düzeltmesini otomatize eder; yedek bağımsız kontrol gereklidir.",
      "Kıyı seyri ve dar sularda leeway göz ardı edilemez; passage planında leeway payı olarak dikkate alınmalıdır."
    ]
  },
  "Leeway hesapları": {
    title: "Leeway Hesapları",
    introduction:
      "Leeway açısının sayısal olarak belirlenmesi, seyir planlamasında rota ve heading hesabı için gereklidir. Ancak leeway'i önceden kesin olarak tahmin etmek zordur; zira gemi dinamiği, rüzgâr şiddeti ve yönündeki anlık değişimler, deniz durumu ve balast/yük koşulu gibi birden fazla değişkene bağlıdır. Bu nedenle leeway hesabı, pratikte gözlem ve tahmin yöntemlerinin bir kombinasyonuyla yapılır.",
    sections: [
      {
        title: "Leeway Açısının Tahmin Yöntemleri",
        content:
          "Pratik denizcilik uygulamalarında leeway açısı şu yollarla tahmin edilir:\n\n(1) Gemi manevralar belgesi veya deneysel tablo: bazı gemilerin manevralar kitapçığında veya safety management sisteminde belirli rüzgâr hızları ve yükleme durumları için leeway açısı değerleri bulunabilir. Bu değerler gemi özgüdür.\n\n(2) GPS COG ve gyro heading karşılaştırması: En pratik ve gerçek zamanlı yöntem. Gemi sabit bir heading'de ve sabit hızda yol alırken GPS COG ile gyro heading arasındaki fark, akıntı ve rüzgâr toplamının etkisini verir. Akıntı biliniyorsa leeway bileşeni ayrıştırılabilir.\n\n(3) Beaufort skalası tabanlı tahmin: bazı pratik rehberlerde rüzgâr kuvvetine ve gemi tipine göre yaklaşık leeway açıları verilir; örneğin 10°–15° beam wind ile tam ballast bir büyük tanker için 5°–8° leeway.",
        image: yonWindDrift,
        imageAlt: "Leeway hesabı: GPS COG ve gyro heading karşılaştırması",
        formula: {
          text: "Leeway açısı ≈ COG − Heading (akıntı etkisi sıfır veya biliniyorsa düzeltilmiş)",
          description: "Pozitif fark: sancak leeway (sancağa kayma); negatif fark: iskele leeway"
        }
      },
      {
        title: "Heading Düzeltmesi ve Rota Planlaması",
        content:
          "Leeway açısı belirlendikten sonra, hedeflenen COG'u elde etmek için heading şu şekilde düzeltilir:\n\nHeading = Hedeflenen COG − Leeway açısı (sol leeway için: heading sağa, yani rüzgâr üstüne)\n\nÖrnek: Hedeflenen COG 180° (güneye). Rüzgâr doğudan (sancaktan) esiyor. Leeway açısı 6°. Gemi batıya (iskeleye) doğru kayıyor. Düzeltme: heading = 180° − 6° = 174° (biraz doğuya / sancağa yönelmek gerekiyor). Böylece gerçek iz hedeflenen 180°'ye yaklaşır.\n\nBu düzeltme, statik bir değer değildir; rüzgâr güçlenince leeway artar ve heading düzeltmesi güncellenmeli; rüzgâr kesilince düzeltme azaltılmalıdır. ECDIS veya GPS COG sürekli izlenerek heading anlık olarak optimize edilir.",
        bulletPoints: [
          "Heading = Hedeflenen COG − Leeway açısı (rüzgâr üstüne düzeltme)",
          "GPS COG ile heading karşılaştırması, fiili leeway + akıntı toplamını verir",
          "Leeway değişkeni: rüzgâr güçlenince artır, zayıflayınca azalt",
          "Dar su ve kıyıya yakın seyirde leeway payı XTE limitine dahil edilmeli",
          "Uzun geçişlerde ortalama leeway açısı, toplam rota sapmasını tahmin eder"
        ]
      }
    ],
    keyPoints: [
      "Leeway açısı GPS COG ile gyro heading farkından pratik olarak elde edilebilir.",
      "Heading = Hedeflenen COG − Leeway açısı; düzeltme rüzgâr üstüne doğrudur.",
      "Rüzgâr değiştikçe leeway değişir; heading dinamik olarak güncellenmelidir.",
      "Kıyı seyri ve dar sularda leeway, XTE güvenlik koridoruna dahil edilmelidir.",
      "Uzun seyirlerde kümülatif leeway etkisi önemli rota sapmasına yol açabilir."
    ]
  },
  "Rüzgâr + akıntı + gemi hareketi": {
    title: "Rüzgâr, Akıntı ve Gemi Hareketinin Bileşimi",
    introduction:
      "Gerçek deniz seyirinde bir geminin SOG (Speed Over Ground) ve COG (Course Over Ground) değerleri, yalnızca makine gücü ve dümen açısına bağlı değildir; akıntı (set ve drift) ve rüzgâr kayması (leeway) da denkleme girer. Bu üç bileşenin vektörel olarak birleşimi, geminin gerçek zemin hareketini oluşturur.\n\nBu bileşik etki, seyircinin 'nerede olduğumu mu düşünmeliyim?' yerine 'nereye gittiğimi' bilerek navigasyon yapmasını zorunlu kılar. GPS COG ve SOG bu gerçek hareketi doğrudan ölçer; ancak GPS olmadığında veya GPS güvenilirliği sorgulandığında, bu üç bileşeni vektörel olarak hesaplamak tek seçenektir.",
    sections: [
      {
        title: "Üç Bileşenli Vektör Modeli",
        content:
          "Modelin üç bileşeni şunlardır: (1) Gemi hız vektörü: heading yönünde, büyüklüğü STW (Speed Through Water – log hızı). Bu vektör geminin su kütlesine göre hareketini ifade eder; akıntıyı ve rüzgârı kapsamaz. (2) Akıntı vektörü: set yönünde, büyüklüğü drift. Bu vektör tüm su kütlesinin hareketidir – gemi ister hareket etsin ister dursun, su kütlesi bu vektörle hareket eder. (3) Leeway vektörü: rüzgâr altı yönünde, büyüklüğü STW × tan(leeway açısı) – bu, rüzgârın yarattığı yatay sapmadır.\n\nVektör toplamı: COG/SOG vektörü = Gemi hız vektörü + Akıntı vektörü + Leeway vektörü. Grafik çözüm için vektör üçgeni (veya dörtgeni) çizilir; analitik çözüm için bileşen yöntemi kullanılır.",
        image: yonWindDrift,
        imageAlt: "Rüzgâr, akıntı ve gemi hareketi vektör toplamı"
      },
      {
        title: "Rota Düzeltmesi: Hedeflenen COG'u Elde Etme",
        content:
          "Seyirde hedeflenen COG verildiğinde ve akıntı/leeway bilindiğinde, doğru heading ve STW'yi bulmak için ters vektör problemi çözülür. Bu problem grafiksel veya analitik olarak çözülebilir.\n\nGrafiksel yöntem: Hedef mevkiden COG yönünde sonuç vektörü çizilir. Başlangıç noktasından akıntı vektörü (set-drift) çizilir. Bu vektörün ucundan, STW büyüklüğünde bir yay çizilir; yayın sonuç vektörüyle kesişim noktası, gereken heading ve STW yönünü gösterir.\n\nPratik sonuç: Bu hesap, özellikle akıntılı dar kanallarda hedefe doğru ilerlemenin hangi heading'de yapılacağını belirler; gereksiz XTE oluşumunu önler ve ETA'yı optimize eder.",
        bulletPoints: [
          "COG/SOG = Gemi vektörü (heading, STW) + Akıntı (set, drift) + Leeway",
          "GPS COG doğrudan bu bileşik hareketi ölçer",
          "Vektör üçgeni grafiksel çözüme imkân verir; bileşen yöntemi analitik çözüm sağlar",
          "Ters problem: hedef COG için gereken heading ve STW hesabı – akıntılı kanallarda kritik",
          "Tüm bileşenler bilindiğinde ETA ve yakıt planlaması daha doğru yapılır"
        ]
      }
    ],
    keyPoints: [
      "COG/SOG = Gemi hız vektörü (heading, STW) + Akıntı vektörü (set, drift) + Leeway.",
      "GPS COG ve SOG bu bileşik hareketi doğrudan ölçer; GPS olmadığında vektör hesabı zorunludur.",
      "Hedeflenen COG için gereken heading, ters vektör problemi çözülerek bulunur.",
      "Akıntılı dar kanallarda bu hesabı yapmadan heading seçimi XTE ve emniyet sorunlarına yol açar.",
      "Vektör üçgeni grafiği, bu bileşik hareketi görsel ve hızlı biçimde çözer."
    ]
  },
  "Dalga etkileri": {
    title: "Dalga Etkileri",
    introduction:
      "Deniz dalgaları, geminin yapısal bütünlüğü, stabilitesi, hızı ve mürettebat konforu üzerinde kapsamlı etkiler yaratır. Dalga etkisi, seyir kararlarının en önemli dış belirleyicilerinden biridir; ağır dalga koşullarında hız azaltma, rota değişikliği veya bölgeden çıkma zorunlu hale gelebilir.\n\nDalgaların gemiye etkisi, dalganın boyuna (wavelength), dönemine (period), yüksekliğine (significant wave height – Hs) ve özellikle geliş yönüne bağlıdır. Aynı dalga yüksekliği bile geliş yönüne göre çok farklı etkiler yaratabilir: baş dalgası (head sea) hız kaybı ve pounding'e neden olurken, yan dalga (beam sea) yalpayı ve devrilme riskini artırır; kıç dalgası (following sea) broaching tehlikesini doğurur.",
    sections: [
      {
        title: "Dalganın Gemiye Yük Etkileri",
        content:
          "Yapısal yük: Baş taraftan gelen dalga, geminin prupava çarptığında (slamming veya pounding) çok kısa sürede devasa ani kuvvetler oluşturur. Bu kuvvetler baş güverte, kemere bağlantıları ve baş pik tankı üzerinde yorulma çatlaklarına ve hasara yol açabilir. Slamming, ağır yük koşullarında özellikle büyük tehlike oluşturur; hız azaltma bu kuvvetleri dramatik biçimde düşürür.\n\nGreen water: Baş güverteye dalga yığılması (green water) olarak adlandırılan bu olgu, dalga kütlesinin güverte üstüne yüklenmesidir. Güverte makineleri, luks kapakları, köprüüstü penceresi ve mürettebatı tehdit eder. Green water riski, draftın azaldığı (ballast) koşullarda veya düşük fribordlu gemilerde belirginleşir.",
        image: weatherSystems,
        imageAlt: "Dalga etkileri: slamming, green water ve yalpa"
      },
      {
        title: "Hız Kaybı ve Yalpa Etkisi",
        content:
          "Dalga koşullarında gemi, aynı makine gücüyle daha yavaş ilerler; buna added wave resistance (ek dalga direnci) denir. Bu direnç, dalga yüksekliği ve periyoduna bağlı olarak SOG'u belirgin biçimde düşürebilir. Ağır koşullarda %20–40 hız kaybı yaşanabilir; bu durum ETA hesabına dahil edilmeli ve yakıt planlamasına yansıtılmalıdır.\n\nYalpa (rolling): Yan dalga (beam sea), geminin enine salınımını artırır. Eğer dalga periyodu gemi doğal yalpa periyoduna yaklaşırsa, rezonans yalpası (parametric rolling veya senkronize yalpa) oluşabilir; bu durum aşırı yalpa açıları ve kargo kayması riskini beraberinde getirir. Hız veya rotanın değiştirilerek dalga periyodundan uzaklaşılması bu riski azaltır.",
        bulletPoints: [
          "Baş dalga: slamming ve green water – hız azalt, dalga periyodunu gözlemle",
          "Yan dalga: yalpa ve rezonans riski – rota veya hız değiştirerek periyot uyumsuzluğu sağla",
          "Kıç dalga: broaching riski – otopilot yerine dikkatli elle yönetim",
          "Added wave resistance: ağır dalga koşullarında %20–40 SOG kaybı beklenebilir",
          "Hız azaltma: slamming kuvvetini kübik yaklaşımla azaltır – en etkili müdahale"
        ]
      }
    ],
    keyPoints: [
      "Dalga etkisi: yapısal yük (slamming), hız kaybı (added resistance), yalpa ve kargo kayması riski.",
      "Baş dalga hız kaybına ve slamming'e yol açar; hız azaltma en etkili müdahaledir.",
      "Yan dalga rezonans yalpasına neden olabilir; periyot uyumsuzluğu için rota veya hız değiştirilmeli.",
      "Kıç dalga broaching tehlikesi doğurur; özellikle yüksek hızda ve büyük dalgada risklidir.",
      "Dalga kaynaklı hız kaybı ETA ve yakıt planlamasına sistematik olarak dahil edilmelidir."
    ]
  },
  "Heavy weather navigation": {
    title: "Ağır Hava Seyri (Heavy Weather Navigation)",
    introduction:
      "Ağır hava seyri, kuvvetli rüzgâr ve dalga koşullarında geminin yapısal bütünlüğünü, stabilitesini ve mürettebat emniyetini korumak amacıyla belirli hız, rota ve operasyon kararlarının alındığı özel bir seyir rejimidir. Bu rejimin temel ilkesi, ETA veya ticari takvim baskısına rağmen gemi emniyetinin her zaman birinci öncelik olmasıdır.\n\nAğır hava seyri salt reaktif bir yaklaşım değildir; iddialı bir öngörü ve karar sürecidir. İyi bir navigator, ağır hava bölgesine girmeden önce meteoroloji verilerini yorumlar, rota alternatifleri değerlendirir ve ağır havayı en az riskle yönetecek hız-rota kombinasyonunu belirler.",
    sections: [
      {
        title: "Hız Seçimi: Kritik Karar",
        content:
          "Ağır havada hız seçimi, yapısal ve stabilite açısından en kritik karardır. Hız yüksek tutulursa slamming kuvvetleri küpsel (hız³) yaklaşımla artar; bu çok küçük hız artışlarının bile yapısal yükü dramatik biçimde büyüttüğü anlamına gelir. Hız azaltma, slamming ve green water riskini en etkili biçimde düşürür.\n\nAngular resonance (parametrik yalpa): gemi ve dalga periyotlarının örtüşmesi, rezonans yalpası oluşturabilir. Hızı azaltmak veya artırmak bu rezonansı bozabilir; IMO MSC.1/Circ.1228, bu konuda kılavuzluk sağlar. Safe speed (emniyet hızı): ağır havada 'güvenli hız' hem dalga yükü hem de stabilite kriterlerini karşılamalıdır. Gemi stability criteria kötüleşen dalga koşullarında her zaman kontrol edilmelidir.",
        image: weatherSystems,
        imageAlt: "Ağır hava seyri: hız ve rota seçimi"
      },
      {
        title: "Rota Seçimi ve Heaving-to",
        content:
          "Ağır havada rota seçimi, dalganın geliş yönüne göre optimize edilir. Genel ilke: yan dalgadan (beam sea) mümkün olduğunca kaçınılır; baş açısı büyük olan bir konuş (geniş bow sea) veya kıçtan dalga (following sea) tercih edilebilir. Ancak kıçtan gelişen büyük dalga broaching riskini artırır; bu nedenle kıç denizinde de belirli hız limitleri gözetilmelidir.\n\nHeaving-to (derin enlem): Gemi, küçük dümen açısıyla seyir edecek şekilde minimum hıza düşürülür ve dalga ile belirli bir açı tutturulur. Bu, gemi üzerindeki baskıyı azaltır ve acil durum müdahalesi, onarım veya ekip dinlenmesi için kontrollü bir tutum sağlar. Her gemi tipi farklı heaving-to pozisyonu gerektirebilir; bu manevralar kitapçığında belirtilmiş olmalıdır.",
        bulletPoints: [
          "Slamming kuvveti hız³ ile artar – küçük hız azaltması büyük yük azalması sağlar",
          "Yan dalgadan (beam sea) kaçın – rezonans yalpası ve stabilite riski",
          "Kıç dalgasında yüksek hız broaching tehlikesi yaratır",
          "Heaving-to: kontrollü minimum hız tutumu – acil onarım ve bekleme için",
          "ISM Kodu: kaptan, gemi emniyetini tehdit eden koşullarda sürati azaltma yetkisine sahiptir"
        ]
      }
    ],
    keyPoints: [
      "Ağır havada hız azaltma en öncelikli karardır; slamming kuvveti hız küpüyle orantılıdır.",
      "Yan dalgadan kaçınılmalı; rezonans yalpası için hız veya rota değişikliği yapılmalıdır.",
      "Heaving-to: çok zor koşullarda kontrolü koruyarak minimum hızda tutma pozisyonu.",
      "ISM Kodu kapsamında kaptan ticari baskıya rağmen hızı azaltma ve güzergahı değiştirme yetkisine sahiptir.",
      "Heavy weather öncesi meteoroloji takibi ve erken rota alternatifi değerlendirmesi yapılmalıdır."
    ]
  },
  "Fırtınada rota ve hız kararı": {
    title: "Fırtınada Rota ve Hız Kararı",
    introduction:
      "Fırtına koşullarında rota ve hız kararı, belki de tüm seyir karlarının en karmaşığıdır: çünkü yanlış karar hem gemi güvenliğini hem de mürettebat hayatını tehlikeye atar. Bu karar birden fazla değişkeni – gemi tipi, yükleme durumu, fırtınanın şiddeti ve hareketi, mevki ve alternatif rotalar – eş zamanlı değerlendirmeyi gerektirir. Bir fırtına kararı salt 'hızı düşür' veya 'rotayı değiştir' düzeyinde değil, sistematik ve belgelenmiş bir süreç olarak ele alınmalıdır.",
    sections: [
      {
        title: "Fırtına Öncesi Hazırlık ve Karar Penceresi",
        content:
          "En iyi fırtına kararı, fırtına başlamadan önce verilen karardır. Synoptik harita analizi, GRIB verileri ve pilot chart bilgisiyle fırtına bölgesi 24–48 saat öncesinden tespit edilir. Bu aşamada üç ana seçenek değerlendirilir:\n\n(1) Rota değişikliği – fırtınayı tamamen veya kısmen dolaşmak: Uzun rotada ek mesafe ve zaman maliyeti olmakla birlikte, fırtına rotasında hız kaybı ve yakıt tüketimi hesaba katıldığında çoğu zaman daha ekonomik ve güvenlidir.\n\n(2) Hız optimizasyonu – fırtına penceresi dışında geçmek: Fırtınanın hareketini modelleyerek geminin fırtına merkezine göre zamanlamasını ayarlamak. Fırtına erken geçiyorsa hızlanmak, geç geçiyorsa yavaşlamak bölgeden sonradan daha iyi koşullarda geçilmesini sağlar.\n\n(3) Bekleme – Aile limanı veya demirde bekleme: Çok şiddetli fırtına koşullarında güvenli bir limanda veya korunaklı demirleme alanında bekleme, en güvenli seçenektir.",
        image: weatherSystems,
        imageAlt: "Fırtına rotası kararı ve alternatif seçenekler"
      },
      {
        title: "Fırtına İçindeyken: Anlık Kararlar",
        content:
          "Fırtına içindeyken kararlar daha sınırlı olmakla birlikte kritik önemi değişmez. Temel prensip: her 1/2 saatte bir stabilite, trim, güverte hasarı ve makine durumu değerlendirilmeli ve log'a kaydedilmelidir.\n\nHız kararı: slamming ve yapısal geri bildirime göre hız dinamik olarak ayarlanır. Makine dairesi, ani hız değişikliklerinin motor yüklenmesine etkisi konusunda köprüüstüyle koordineli olmalıdır. Rota kararı: fırtına içinde iken tam 90° rota değişikliği yerine yavaş ve aşamalı değişiklik yapılır; ani manevra kıç dalgası veya çifte dalga riskini artırabilir. Kargo ve balast: fırtına öncesinde ballast tankları ve kargoların bağlamaları kontrol edilmeli, serbest yüzey etkisi minimize edilmelidir.",
        bulletPoints: [
          "En iyi karar: fırtına öncesi 24–48 saat değerlendirmesi – rota/hız/bekleme seçimi",
          "Fırtına içinde hız azaltma birinci öncelik; slamming ve yapısal geri bildirim rehber",
          "Fırtına içinde ani rota değişikliğinden kaçın – aşamalı düzeltme tercih edilir",
          "Balast ve kargo bağlamaları fırtına öncesinde tamamlanmış olmalı",
          "Her kritik karar log'a kaydedilmeli ve kaptan onayıyla alınmalı"
        ]
      }
    ],
    keyPoints: [
      "En etkili fırtına kararı, fırtınaya girmeden önce verilen erken karardır.",
      "Rota değişikliği, hız optimizasyonu ve bekleme seçenekleri sistematik biçimde karşılaştırılmalıdır.",
      "Fırtına içindeyken hız azaltma birinci öncelik; anlık yapısal geri bildirim rehber alınmalıdır.",
      "Ani ve büyük rota değişikliklerinden kaçınılmalı; aşamalı düzeltmeler tercih edilmeli.",
      "Tüm kararlar log'a kaydedilmeli, kaptan onayı ve ISM prosedürü çerçevesinde alınmalıdır."
    ]
  },
  "IMO A.893(21)": {
    title: "IMO A.893(21) – Passage Planning Standardı",
    introduction:
      "IMO Karar A.893(21), 'Guidelines for Voyage Planning' başlığıyla 1999 yılında yürürlüğe girmiştir ve uluslararası sefer yapan tüm gemilerde uygulanması gereken yolculuk planlama standartlarını belirler. Karar, seyir planlamasını dört zorunlu aşamaya ayırır: Appraisal (Bilgi Toplama ve Değerlendirme), Planning (Planlama), Execution (Uygulama) ve Monitoring (İzleme). Bu dört aşama, geminin kalkıştan varışa kadar her adımda yapılandırılmış bir emniyet çerçevesinde çalışmasını sağlar.\n\nIMO A.893(21), SOLAS Bölüm V Kural 34 ile birlikte değerlendirildiğinde yasal bir zorunluluk haline gelir. SOLAS V/34, 'yolculuğun ve beklentilerin önceden planlanması' için uygun seyir planlaması yapılmasını şart koşar. Bu iki düzenlemenin birlikte uygulanması, passage planning'i hem teknik hem de hukuki bir yükümlülük olarak tanımlar.",
    sections: [
      {
        title: "A.893(21)'in Dört Aşaması: Özet",
        content:
          "Appraisal: Seyire özgü tüm bilgilerin toplanması ve değerlendirilmesi. Güncel haritalar, pilot books, list of lights, NtM güncellemeleri, meteoroloji, tidal data, VTS gereklilikleri ve gemi kısıtlamaları bu aşamada incelenir. Planlamadan önce tüm risklerin ve kısıtların tanımlanması amaçlanır.\n\nPlanning: Toplanan bilgiler ışığında detaylı rota planlanır. Waypoint listesi, XTE limitleri, safety contour, clearing lines, tehlikeler, alternatif rotalar, kanallar için özel notlar ve yakıt/ETA planı hazırlanır. Plan kaptan tarafından onaylanır.\n\nExecution: Plan uygulamaya konur. Köprüüstü ekibi planla briefing yapılır; başlık, hız ve vardiya düzeni plan doğrultusunda yürütülür. Plan dışı değişiklikler dokümante edilir.\n\nMonitoring: Seyir planıyla uyum sürekli izlenir. XTE, hız ve ETA gerçek değerlerle karşılaştırılır; sapmalar kaydedilir ve düzeltilir.",
        image: chartPlotting,
        imageAlt: "IMO A.893(21): dört aşamalı passage planning çerçevesi"
      },
      {
        title: "Hukuki Bağlam ve PSC Değerlendirmesi",
        content:
          "SOLAS Bölüm V Kural 34, passage planning için genel yasal çerçeveyi oluşturur; A.893(21) bu çerçeveyi uygulama kılavuzuyla detaylandırır. PSC denetimlerinde (USCG, Tokyo MOU, Paris MOU) passage plan varlığı, güncelliği ve içerik kalitesi önemli bir değerlendirme kriteridir. Passage planın bulunmaması veya yetersiz olması, detention gerekçesi olabilecek bir deficiency'dir.\n\nHukuki sorumluluk boyutu: bir kaza sonrasında soruşturmacılar, passage planning sürecinin IMO A.893(21) ve SOLAS V/34 gerekliliklerini karşılayıp karşılamadığını inceler. Planlama eksiklikleri, kaptan ve şirkete ihmal sorumluluğu doğurabilir. Bu nedenle passage plan yalnızca operasyonel bir araç değil, hukuki bir belge olarak da titizlikle hazırlanmalıdır.",
        bulletPoints: [
          "SOLAS V/34 + IMO A.893(21) = yasal passage planning yükümlülüğü",
          "PSC denetiminde passage plan hem mevcudiyet hem kalite açısından incelenir",
          "Dört aşama: Appraisal → Planning → Execution → Monitoring",
          "Plan kaptan tarafından onaylanmalı ve köprüüstü brifingiyle ekiple paylaşılmalı",
          "Kaza soruşturmalarında passage planning kalitesi ihmal değerlendirmesinde temel kriter"
        ]
      }
    ],
    keyPoints: [
      "IMO A.893(21): Voyage Planning Kılavuzu – dört zorunlu aşamayı tanımlar.",
      "SOLAS V/34 ile birlikte passage planning uluslararası sefer gemileri için yasal yükümlülüktür.",
      "Dört aşama: Appraisal, Planning, Execution, Monitoring – her aşamanın belgelenmiş çıktısı olmalıdır.",
      "PSC denetiminde passage plan mevcudiyeti ve kalitesi detention gerekçesi olabilecek bir değerlendirme kriteridir.",
      "Passage plan, kaza soruşturmalarında hukuki sorumluluk değerlendirmesinde temel belgedir."
    ]
  },
  "Appraisal": {
    title: "Appraisal – Passage Planning Birinci Aşaması",
    introduction:
      "Appraisal (Bilgi Toplama ve Değerlendirme), IMO A.893(21) çerçevesindeki passage planning sürecinin birinci ve temel aşamasıdır. Bu aşamada seyire özgü tüm bilgiler sistematik olarak toplanır, güncellikleri kontrol edilir ve planlama aşamasına temel oluşturulur. Appraisal yapılmadan hazırlanan passage plan, eksik veya yanlış varsayımlarla inşa edilmiş anlamına gelir ve emniyeti tehlikeye atar.\n\nAppraisal, yalnızca haritaları açıp bakma değildir; tüm seyire ilişkin kaynakların sistematik olarak gözden geçirilmesidir. Bu süreç saat alabilir ve ikinci zabiti (navigating officer) yeterli zaman ayırması için güçlendirmek bir yönetim sorumluluğudur.",
    sections: [
      {
        title: "Appraisal'da Kontrol Edilecek Kaynaklar",
        content:
          "Haritalar ve yayınlar: Rota boyunca tüm haritaların güncel olup olmadığı kontrol edilir. Güncellik iki şekilde sağlanır: basım sonrası kağıt haritalar için Notice to Mariners (NtM) düzeltmeleri uygulanmış olmalı; ECDIS için ENC güncellemeleri yapılmış olmalıdır. Ocean Pilot Books (Sailing Directions), Admiralty List of Lights, List of Radio Signals, ALRS (Admiralty List of Radio Signals), Tide Tables ve Tidal Atlas bu aşamada incelenir.\n\nMeteoroloji: Kalkış tarihi için ve transit süresince beklenen hava tahminleri, pilot charts ve synoptik haritalar değerlendirilir. Tropikal siklon sezonunun aktif olup olmadığı ve bölgede uyarı olup olmadığı kontrol edilir. Özellikle uzun seferler için çoklu tahmin kaynakları karşılaştırılır.",
        image: navtexReceiver,
        imageAlt: "Appraisal: kaynaklar ve bilgi kontrolü"
      },
      {
        title: "Gemi ve Rota Kısıtlamalarının Değerlendirilmesi",
        content:
          "Gemi kısıtlamaları: Mevcut draft, air draft (su üstü yüksekliği), gemi genişliği ve güzergah boyunca bunlara karşılık gelen kanal derinlikleri, köprü açıklıkları ve kanalların maksimum geçiş boyutları karşılaştırılır. Squat etkisi hesaplanır ve belirli kanallar için UKC hesabı yapılır.\n\nYerel düzenlemeler: VTS (Vessel Traffic Service) zorunluluğu, compulsory pilotage (zorunlu kılavuzluk), traffic separation scheme (trafik ayrım planı), seyir kısıtlamaları, gemi raporlama sistemleri (GMDSS raporlama alanları), karantina ve gümrük gereksinimleri appraisal kapsamında araştırılır. Bu bilgiler liman ajanından, ALRS'den ve ilgili ülkenin yetkili makamından temin edilir.",
        bulletPoints: [
          "Harita güncelliği: kağıt haritalar NtM düzeltmeleri, ECDIS ENC güncellemeleri – ikisi de zorunlu",
          "Meteoroloji: pilot charts + güncel tahmin + tropikal uyarı taraması",
          "Draft/air draft: kanal derinlikleri ve köprü açıklıklarıyla karşılaştırılmalı",
          "VTS, compulsory pilotage, TSS ve raporlama gereklilikleri: her liman için araştırılmalı",
          "Yetersiz appraisal, passage planın en yaygın eksikliğidir – PSC tarafından sıkça sorgulanır"
        ]
      }
    ],
    keyPoints: [
      "Appraisal: tüm seyir bilgilerini sistematik olarak toplama ve değerlendirme aşaması.",
      "Harita güncelliği, meteoroloji, kısıtlamalar ve yerel düzenlemeler bu aşamada incelenir.",
      "Eksik appraisal, planlamanın hatalı temeller üzerine inşa edilmesi anlamına gelir.",
      "Liman ajanı ve ALRS, yerel düzenlemeler için birincil bilgi kaynaklarıdır.",
      "PSC denetimleri, appraisal kalitesini passage plan dokümantasyonu üzerinden değerlendirir."
    ]
  },
  "Planning": {
    title: "Planning – Passage Planning İkinci Aşaması",
    introduction:
      "Planning (Planlama), appraisal sonrası toplanan bilgilerin somut bir seyir planına dönüştürüldüğü ikinci aşamadır. Bu aşamada rota haritaya işlenir, waypoint’ler koordinatlarıyla listelenir, emniyet parametreleri tanımlanır ve köprüüstü ekibine yönelik seyir notları hazırlanır. Planning, passage planın en görünür ve dokümante bölümüdür; hem köprüüstü ekibinin rehberi hem de PSC denetiminin incelediği belgedir.",
    sections: [
      {
        title: "Rota ve Waypoint Planlaması",
        content:
          "Rota, başlangıç noktasından varışa kadar harita üzerinde (kağıt veya ECDIS) çizilir. Her rota değişim noktasına bir waypoint atanır; waypoint’lerin koordinatları (WGS84 datum), planlanan başlık, rota mesafesi ve o noktada gerekli özel dikkat (hız kısıtlaması, VHF kanal değişimi, kılavuz alımı gibi) waypoint listesinde kaydedilir.\n\nXTE limitleri: her segment için tehlikelere olan mesafe dikkate alınarak XTE limitleri belirlenir. Açık denizde geniş XTE (0.5–1.0 NM), dar sularda dar XTE (0.05–0.2 NM). Safety contour ECDIS’te doğru ayarlanmalı; draft + UKC + squat payı safety contour değerini belirler. No-go areas (girilmez bölgeler): tehlikeli sığlıklar, kablo güzergahları, atış alanları harita üzerinde işaretlenir.",
        image: chartPlotting,
        imageAlt: "Planning: waypoint listesi ve rota çizimi"
      },
      {
        title: "Seyir Notu ve Kaptan Onayı",
        content:
          "Seyir notu (voyage note veya master’s passage plan), kritik bölgeler için özel talimatları, hız planını, gelgit pencerelerini, VTS bildirim noktalarını, alternatif rotaları ve acil durum waypoint’lerini içerir. Bu not, plan dosyasına eklenir ve kaptan tarafından imzalanarak onaylanır.\n\nBriefing: Plan hazırlandıktan ve kaptan onayladıktan sonra tüm köprüüstü ekibiyle bir brifing yapılır. Her zabitin planı anlaması, kritik noktaları bilmesi ve soru sorma fırsatı bulması sağlanır. Bu brifing, bridge resource management (BRM) çerçevesinde tüm ekibin ortak durumsal farkındalığa sahip olmasını garantiler.",
        bulletPoints: [
          "Waypoint listesi: koordinat, başlık, mesafe, XTE limiti ve özel notlar içermeli",
          "Safety contour: draft + UKC + squat → ECDIS’te doğru ayarlanmalı",
          "No-go areas harita üzerinde açıkça işaretlenmeli",
          "Alternatif rotalar ve acil durum waypoint’leri plan dosyasında olmalı",
          "Kaptan onayı zorunlu; köprüüstü brifingi TÜM zabitlere yapılmalı"
        ]
      }
    ],
    keyPoints: [
      "Planning: appraisal bilgilerini somut rota planına dönüştürme aşaması.",
      "Waypoint listesi, XTE limitleri, safety contour ve no-go areas planın temel bileşenleridir.",
      "Seyir notu kritik bölgeler için özel talimatları ve alternatifleri içermelidir.",
      "Plan kaptan onayıyla kesinleşir ve köprüüstü brifingiyle ekiple paylaşılır.",
      "PSC denetiminde bu aşamanın belgeleri (waypoint listesi, onaylı plan) doğrudan incelenir."
    ]
  },
  "Execution": {
    title: "Execution – Passage Planning Üçüncü Aşaması",
    introduction:
      "Execution (Uygulama), planlanan seyrin fiilen yürütüldüğü üçüncü aşamadır. Bu aşama kalkıştan varışa kadar sürer ve planın gerçek dünya koşullarıyla karşılaştırıldığı, uyum sorunlarının giderildiği ve dinamik kararların alındığı süreçtir. Execution'ın başarısı, doğrudan planın kalitesiyle ve köprüüstü ekibinin BRM (Bridge Resource Management) becerisiyle orantılıdır.\n\nExecution, pasif bir plan izleme değildir; aktif, eleştirel ve durumsal farkındalığa dayalı bir süreçtir. Her vardiya zabiti, kalkışta yapılan planın hâlâ geçerli olup olmadığını, koşulların planla uyumlu olup olmadığını ve gerekirse hangi kapsamda değişiklik gerektiğini değerlendirmelidir.",
    sections: [
      {
        title: "Köprüüstü Prosedürleri ve Vardiya Yönetimi",
        content:
          "Execution'ın köprüüstü boyutu; vardiya devir-teslimi, sürekli izleme ve plan uyumunun sağlanmasından oluşur. Vardiya devir-teslimi: gelen zabit, mevcut pozisyon, hız, XTE, yakın tehlikeler, gelecek 4 saat için plan notları ve barometre trendi hakkında bilgilendirilir. Plan dokümanı köprüüstünde her zaman erişilebilir olmalıdır.\n\nSürekli izleme: Fiziksel konum (GPS, radar, görsel) planlanan konumla karşılaştırılır. XTE, heading, SOG ve ETA anlık olarak takip edilir. ECDIS alarmları aktif ve doğru ayarlı tutulur. Kritik waypoint'lere yaklaşımda artan dikkat ve mevki güncelleme sıklığı uygulanır.",
        image: autopilotControl,
        imageAlt: "Execution: köprüüstü izleme ve plan uyumu"
      },
      {
        title: "Plan Değişikliği Yönetimi",
        content:
          "Execution sırasında planın değiştirilmesi gerekebilir: meteoroloji beklentilerden farklı gelişmiş, trafik beklenmedik yoğunluğa ulaşmış veya gemi teknik durumu değişmiştir. Bu değişiklikler log'a kaydedilmeli ve kaptan bilgilendirilmelidir.\n\nDeğişiklik yönetimi prosedürü: (1) Değişiklik nedenini belgele. (2) Alternatifleri değerlendir (devam, hız değişikliği, rota değişikliği). (3) Kaptan onayı al. (4) Köprüüstüne bildir ve ECDIS/kağıt haritayı güncelle. (5) Liman ajanına yeni ETA bildir. Planın değiştirilmesi anlamına gelen deviation, şirket SMS (Safety Management System) prosedürü kapsamında raporlanmalıdır.",
        bulletPoints: [
          "Vardiya devir-teslimi: mevcut mevki, XTE, plan notları ve alarm durumu aktarılır",
          "Plan dokümanı her zaman köprüüstünde erişilebilir olmalı",
          "Plan değişikliği: belgelenmiş, kaptan onaylı ve ajan bildirimli",
          "ECDIS alarmları aktif ve doğru ayarlı tutulmalı – devre dışı bırakma kaydedilmeli",
          "Kritik waypoint yaklaşımlarında mevki güncelleme sıklığı artırılmalı"
        ]
      }
    ],
    keyPoints: [
      "Execution: planın fiilen uygulandığı aşama – aktif izleme ve durumsal farkındalık gerektirir.",
      "Vardiya devir-teslimi: mevzi, XTE, plan notları ve tehlikeler aktarılmalıdır.",
      "Plan değişikliği: nedenini belgele, kaptan onayı al, log'a kaydet.",
      "ECDIS alarmları her zaman aktif ve doğru ayarlı olmalıdır.",
      "Kritik waypoint yaklaşımlarında dikkat artırılmalı ve mevki güncelleme sıklığı yükseltilmelidir."
    ]
  },
  "Monitoring": {
    title: "Monitoring – Passage Planning Dördüncü Aşaması",
    introduction:
      "Monitoring (İzleme), passage planning sürecinin son ve seyir boyunca devam eden aşamasıdır. Bu aşamada, seyir planının gerçek uygulama koşullarıyla uyumu düzenli olarak kontrol edilir; sapmalar tespit edildiğinde nedenler araştırılır ve gerekli düzeltici tedbirler alınır. Monitoring, reaktif bir alarm yönetimi değil; proaktif bir uyum izleme sürecidir.\n\nMonitoring'in etkinliği, köprüüstü ekibinin durumsal farkındalığıyla doğrudan ilişkilidir. Sapmayı fark eden zabit, bunun nedenini anlamalı (akıntı mı, rüzgâr mı, hız kaybı mı, hedefleme hatası mı?), boyutunu değerlendirmeli ve uygun düzeltici eylemi zamanında yapmalıdır.",
    sections: [
      {
        title: "İzleme Parametreleri ve Sıklığı",
        content:
          "Monitoring kapsamındaki temel parametreler: (1) Konum (mevki): GPS COG ve konumu; radar fix veya görsel teyit ile belirli aralıklarla doğrulanır. Açık denizde saatlik, kıyıda sık mevki güncellemesi yapılır. (2) XTE: ECDIS üzerinde anlık izlenir; alarm eşiği aşıldığında müdahale edilir. (3) SOG ve ETA: Planlanan hız ve varış zamanıyla karşılaştırılır; önemli sapmalar güncelleme gerektirir. (4) Meteoroloji: Barometre trendi, görsel gözlemler ve NAVTEX/SafetyNET mesajları plan beklentileriyle karşılaştırılır.\n\nLoglama: Monitoring sonuçları seyir log defterine kayıt edilir. Seyir log defteri (voyage log), belirli aralıklarla mevzi, hız, heading, meteoroloji, deniz durumu ve önemli olayları içerir. Bu kayıtlar PSC denetimlerinde ve kaza soruşturmalarında temel delil niteliği taşır.",
        image: ecdisDisplay,
        imageAlt: "Monitoring: mevzi, XTE ve plan-gerçek karşılaştırması"
      },
      {
        title: "Sapma Tespiti ve Düzeltici Eylem",
        content:
          "Monitoring sırasında tespit edilen bir sapma, sistematik bir süreçle ele alınır: (1) Sapmayı tespit et ve boyutunu ölç (XTE miktarı, ETA farkı, hız farkı). (2) Nedenini tanı: akıntı beklenenden güçlü mü? Rüzgâr planlanmamış yönde mi? Makine sorununa bağlı hız kaybı mı? (3) Düzeltici eylemi belirle: heading düzeltmesi, hız ayarı veya plan revizyonu. (4) Gerekirse kaptanı bilgilendir. (5) Log'a kaydet.\n\nPlan ile gerçeğin önemli ölçüde ayrışması – örneğin aşılamayan XTE limitleri, gerçekleşmeyen ETA veya meteorolojinin planı geçersiz kılması – planning aşamasına dönülmesi ve planın revize edilmesi anlamına gelebilir.",
        bulletPoints: [
          "Açık denizde saatlik, kıyıda sık mevki kaydı ve plan karşılaştırması",
          "XTE ECDIS'te anlık izlenmeli; alarm eşiği seyrin tehlike düzeyine göre ayarlanmalı",
          "Sapma tespitinde neden-sonuç analizi yapılmalı – sadece düzeltme değil, anlama önemli",
          "Önemli sapmalar log'a kaydedilmeli ve kaptan bilgilendirilmeli",
          "Plan ile gerçek büyük ölçüde ayrışıyorsa plan revizyonu gerekebilir"
        ]
      }
    ],
    keyPoints: [
      "Monitoring: seyir boyunca plan-gerçek uyumunu izleme ve sapmaları düzeltme aşaması.",
      "Temel izleme parametreleri: konum, XTE, SOG/ETA ve meteoroloji.",
      "Seyir log defteri monitoring bulgularının resmi kaydıdır; PSC denetiminde incelenir.",
      "Sapma tespitinde nedenini anlamak, yalnızca düzeltmek kadar önemlidir.",
      "Plan-gerçek büyük ayrışması planlama revizyonunu tetikleyebilir."
    ]
  },
  "UKC ve squat": {
    title: "UKC ve Squat",
    introduction:
      "Squat, ilerleme halindeki bir geminin hız nedeniyle suya normalden daha fazla gömülme olgusudur. Bu olgu, gemi hareket ettikçe alt su basıncının azalması ve gemi etrafındaki akışın gemiyi aşağı çekmesiyle açıklanır. Squat değeri, geminin draftının üstüne eklenerek gerçek dinamik draft hesaplanır; bu değer UKC hesabında kritik rol oynar.\n\nSquat, sığ sularda (shallow water – su derinliği geminin draftının 1.5–2 katından az) ve dar kanallarda (kanal kesiti kısıtlı) en belirgin biçimde ortaya çıkar. Açık derin suda squat etkisi ihmal edilebilir düzeydedir; ancak kanallarda, rıhtım yaklaşımlarında ve sığ seferlerde squat hesabını atlamak ciddi UKC hatasına yol açabilir.",
    sections: [
      {
        title: "Squat Hesabı: Barras Formülü ve Basit Yaklaşım",
        content:
          "Squat hesabı için birçok ampirik formül geliştirilmiştir. Barras formülü, denizcilik sektöründe en yaygın kullanılan yöntemdir:\n\nS = Cb × V² / 100\n\nBurada S = squat (metre), Cb = block katsayısı (geminin doluluk oranı; tipik olarak bulk carrier ve tanker için 0.75–0.85, konteyner gemisi için 0.60–0.70), V = geminin hızı (knot cinsinden). Bu formül, açık sular için geçerlidir; kanallarda düzeltme faktörü uygulanır.\n\nÖrnek: Cb = 0.80, V = 8 knot → S = 0.80 × 64 / 100 = 0.51 metre. Gemi hızını 10 knot'a çıkarırsa squat = 0.80 × 100 / 100 = 0.80 metre. Hız %25 arttığında squat %57 artar – hızın karesel etkisi çok belirgindir.",
        image: safetyEquipment,
        imageAlt: "Squat etkisi ve UKC hesabı",
        formula: {
          text: "S = Cb × V² / 100 (Barras formülü, açık su) | Kanal içi: S_kanal = S × (1 + As/Ac)",
          description: "Cb = block katsayısı; V = hız (knot); As = gemi kesit alanı; Ac = kanal kesit alanı"
        }
      },
      {
        title: "Squat Yönetimi ve UKC'ye Entegrasyonu",
        content:
          "UKC hesabında squat değeri statik drafta eklenir: Dinamik draft = Statik draft + Squat. UKC = (Harita derinliği + Gelgit yüksekliği) − (Statik draft + Squat + Hava payı). Bu denklemdeki her değişken hata payı içerdiğinden, toplamda yeterli bir emniyet marjı bırakılmalıdır.\n\nSquat'ı azaltmanın tek yolu hız azaltmadır. Özellikle sığ sulara girerken veya dar kanallarda squat etkisi hız kısıtlamalarına doğrudan yansıtılır. Örneğin belirli bir kanala giriş için maksimum güvenli hız, squat değeri UKC limitinin içinde kalacak biçimde hesaplanır. Bu hesap, kanal geçiş planının zorunlu bir parçasıdır.",
        bulletPoints: [
          "Squat = Cb × V² / 100 (Barras, açık su) – kanal koşulları için düzeltme eklenir",
          "Hız iki katına çıkınca squat dört katına çıkar – hızın kare etkisi",
          "Dinamik draft = Statik draft + Squat",
          "UKC = (Harita derinliği + HoT) − (Dinamik draft + Hava payı)",
          "Sığ su kanallarında maksimum güvenli hız squat sınırlamasıyla belirlenir"
        ]
      }
    ],
    keyPoints: [
      "Squat: ilerleme halindeki geminin hız nedeniyle normalden fazla suya gömülmesi.",
      "Barras formülü: S = Cb × V² / 100 – hız kareyle orantılı, güçlü etki.",
      "Dinamik draft = Statik draft + Squat; UKC hesabında dinamik draft kullanılır.",
      "Sığ su ve dar kanallarda squat belirginleşir; açık derin suda ihmal edilebilir.",
      "Hız azaltma squatı düşürmenin tek yoludur; kanal hız limitleri squat sınırlamasından kaynaklanır."
    ]
  },
  "Bridge Resource Management (BRM)": {
    title: "Bridge Resource Management (BRM)",
    introduction:
      "Bridge Resource Management (BRM), köprüüstü ekibinin sahip olduğu tüm kaynakları — insan, teknoloji, bilgi ve prosedür — en etkin biçimde kullanarak gemi emniyetini sağlama disiplinidir. 1970’lerde havacılıkta geliştirilen Crew Resource Management (CRM) kavramından türetilen BRM, insan hatasının deniz kazalarının %80’inden fazlasındaki rolünü azaltmayı hedefler. IMO’nun STCW Manila Değişiklikleri (2010) ile BRM eğitimi, tüm denizcilik yeterlilik seviyelerinde zorunlu hale getirilmiştir. BRM; yalnızca teknik beceri değil, liderlik, durumsal farkındalık, iletişim kalitesi ve karar alma süreçlerini kapsayan bütüncül bir yaklaşımdır. Denizcilik fakültesi öğrencileri için BRM’yi kavramak, hem sınav süreçlerinde hem de kariyerlerinin ilk günlerinden itibaren köprüüstü emniyetine katkı sağlamak açısından kritik önem taşır.",
    sections: [
      {
        title: "BRM’nin Temel Bileşenleri: Liderlik, İletişim ve Durumsal Farkındalık",
        content:
          "BRM’nin çekirdeğinde üç temel bileşen bulunur: liderlik ve otorite yönetimi, açık ve net iletişim ile sürekli durumsal farkındalık. Liderlik açısından kaptan, köprüüstü ekibini yönlendiren ve nihai kararı veren kişidir; ancak etkili bir lider, ast görüşlerini aktif olarak talep eder ve otorite gradyanının (otorite farkının) aşırı büyümesine izin vermez. Aşırı otorite gradyanı, ast personelin kritik bilgileri bildirememesine yol açarak kazalara zemin hazırlar. İletişimde standart terminoloji ve kapalı döngü doğrulama (read-back/hear-back) prensibi esastır: verilen her talimat tekrar edilmeli ve onaylanmalıdır. Durumsal farkındalık ise ekibin gemi konumu, trafik, meteoroloji ve seyir planı hakkında ortak bir zihinsel model paylaşmasıdır; bu model bozulduğunda ‘durumsal farkındalık kaybı’ yaşanır ve büyük kazaların en yaygın öncüsüdür.",
        image: vhfRadio,
        imageAlt: "BRM iletişimi ve köprüüstü koordinasyonu",
        bulletPoints: [
          "Kapalı döngü iletişim: her talimat tekrar edilip onaylanır",
          "Otorite gradyanı yönetimi: ast personelin sesinin duyulması sağlanır",
          "Durumsal farkındalık paylaşımı: tüm ekip aynı zihinsel modeli taşır",
          "Görev dağılımı net yapılır ve kritik görevlerde çapraz kontrol uygulanır",
          "Briefing ve debriefing kültürü: vardiya öncesi ve sonrası bilgi aktarımı"
        ]
      },
      {
        title: "Görev Paylaşımı ve İş Yükü Yönetimi",
        content:
          "Köprüüstünde iş yükünün eşitsiz dağılması — bir kişinin aşırı yüklenmesi, diğerinin boş kalması — hata riskini artırır. Etkin BRM, özellikle yoğun trafik bölgelerine giriş, limana yaklaşma ve kötü hava gibi kritik manevra dönemlerinde iş yükünü önceden planlar. STCW Kural VIII/2 altında düzenlenen ‘Minimum güvenli vardiya personeli’ ve IMO MSC Sirküleri çerçevesinde belirlenen köprüüstü organizasyonu, iş yükü yönetiminin yasal zeminini oluşturur. Prosedürel olarak ‘tek nokta arızasını’ önlemek için kritik görevler paylaşılır: seyir haritasını izleyen subay ile VHF trafiğini takip eden subay farklı kişiler olmalıdır. Navigator rolünde bulunan kişi çok sayıda ekrana aynı anda bakıp birden fazla görevi üstlenirse ‘tünel vizyonu’ (tek göreve odaklanma) riski artar.",
        bulletPoints: [
          "Kritik manevralarda görevler önceden tanımlanır ve ekibe duyurulur",
          "Bir kişi navigasyon, diğeri iletişim, diğeri gözcülük rolünü üstlenir",
          "Yoğun dönemlerde ekstra personel köprüüstüne çağrılır",
          "ECDIS, radar ve haritayı aynı anda izleme görevi dönüşümlü yapılır",
          "İş yükü azaldığında briefing yapılarak sonraki kritik dönem planlanır"
        ]
      },
      {
        title: "Karar Alma Süreçleri ve Hata Yönetimi",
        content:
          "BRM’de karar alma, tek kişinin sezgisine değil yapılandırılmış süreçlere dayanır. Özellikle manevra kararlarında FORDEC modeli (Facts, Options, Risks/benefits, Decision, Execution, Check) veya benzer yapılı çerçeveler kullanılır. Ekip üyelerinin ‘soru sormaktan çekinmeme’ kültürü, hataların erken yakalanmasını sağlar. Hata yönetiminde ‘tuzak-hata-sonuç’ modeli (Threat and Error Management, TEM) benimsenir: önce tehdit tespit edilir, hata oluşmadan önlenmez ise hatanın sonucu yönetilir. BRM eğitimlerinde simülatör senaryoları kullanılarak ekiplerin baskı altında iletişim kalitesi ve karar süreçleri değerlendirilir. STCW’nin A-VIII bölümü, köprüüstü vardiya tutma standartlarını, navigasyon donanımının kullanımını ve emniyetli gemi yönetimini yasal çerçevede tanımlar.",
        formula: {
          text: "TEM Modeli: Tehdit → Hata → Sonuç yönetimi",
          description: "Tehdit: dış risk faktörleri (hava, trafik, ekipman arızası) | Hata: insan davranışı sapması | Sonuç: emniyetsiz durumun önlenmesi"
        }
      },
      {
        title: "Simülatör Eğitimi ve BRM Sertifikasyonu",
        content:
          "STCW Manila değişiklikleri ile BRM eğitimi, II/1 (zabit), II/2 (kaptan/güverte zabiti) ve II/3 (kılavuz kaptan dahil) yeterlilik sertifikaları için zorunlu hale getirilmiştir. Eğitim genellikle GMDSS köprüüstü simülatörü üzerinde saatlik senaryolarla gerçekleştirilir; senaryo içerikleri standart STCW müfredatına uygun olmakla birlikte her kurumun kendine özgü senaryoları da bulunabilir. Değerlendirme kriterleri arasında iletişim kalitesi, görev paylaşımı etkinliği, durumsal farkındalık, liderlik ve karar alma hızı yer alır. Öte yandan simülatör eğitimi tek başına yeterli değildir; gerçek gemide gözetim altında deneyim kazanma, BRM prensiplerinin içselleştirilmesinde belirleyicidir.",
        bulletPoints: [
          "STCW A-II/1 ve A-II/2 kapsamında BRM eğitimi zorunludur",
          "Köprüüstü simülatörü: tam misyonlu veya masaüstü (desktop) türleri kullanılır",
          "Senaryo değerlendirmesi: iletişim, liderlik, durumsal farkındalık ölçülür",
          "Denizcilik fakültesi müfredatında BRM genellikle ‘köprüüstü uygulamaları’ dersiyle entegre edilir",
          "Yenileme eğitimi 5 yılda bir STCW Kural I/11 kapsamında gereklidir"
        ]
      }
    ],
    keyPoints: [
      "BRM, insan kaynaklı deniz kazalarını azaltmaya yönelik STCW zorunlu eğitim programıdır.",
      "Kapalı döngü iletişim, otorite gradyanı yönetimi ve durumsal farkındalık BRM’nin üç temel sütunudur.",
      "İş yükü yönetimi: kritik manevralarda görevler önceden tanımlanır ve ekip arasında net şekilde paylaşılır.",
      "TEM (Threat and Error Management) modeli, tehdit-hata-sonuç zincirini her aşamada kesmek üzere uygulanır.",
      "STCW Manila 2010 değişiklikleri ile BRM, tüm güverte zabitleri ve kaptanlar için zorunlu hale gelmiştir.",
      "Simülatör eğitimi senaryolarında iletişim, liderlik ve karar alma kalitesi değerlendirilir."
    ]
  },
  "PSC bakış açısı": {
    title: "PSC Bakış Açısı: Seyir Planlaması Denetimi",
    introduction:
      "Port State Control (PSC), taraf devletlerin kendi limanlarında yabancı bayraklı gemileri uluslararası sözleşmelere — SOLAS, MARPOL, STCW, MLC 2006 ve COLREG dahil — uygunluk açısından denetleme hakkı ve yükümlülüğüdür. Paris MOU, Tokyo MOU, Akdeniz MOU ve diğer bölgesel anlaşmalar çerçevesinde koordineli şekilde yürütülen bu denetimler, subzero performanslı gemilere 'detention' (alıkoyma) uygulanmasıyla sonuçlanabilir. Güverte zabitleri ve kaptanlar için PSC denetim süreci, yalnızca resmi bir kontrol olmaktan öte; mevcut seyir planı, köprüüstü prosedürleri ve dokümantasyonun gerçek dünya standartlarını karşılayıp karşılamadığının sorgulandığı profesyonel bir test niteliği taşır. Bu nedenle PSC bakış açısından seyir planlaması, navitasyon donanımı ve köprüüstü organizasyonunu anlamak, denizcilik eğitimi açısından temel yeterlilik sayılır.",
    sections: [
      {
        title: "PSC Denetim Süreci ve Hukuki Dayanak",
        content:
          "PSC müfettişi, gemiye çıkışından itibaren kaptan ve kıdemli zabitten sertifikaları, güvenlik belgeleri ve önemli kayıtları talep eder. SOLAS Bölüm V'in 34. Kuralı uyarınca her sefer için seyir planı hazırlanmış olmalı ve köprüüstünde erişilebilir konumda bulunmalıdır. Denetim iki aşamada gerçekleşir: ilk aşamada sertifikalar ve belgeler kontrol edilir (belge denetimi); ikinci aşamada fiziksel ekipman, prosedür ve kayıtlar incelenir (ayrıntılı denetim). Paris MOU kriterlerine göre yüksek risk profili taşıyan gemiler — bayrak, sınıflandırma geçmişi ve önceki detention sayısına göre — daha sık ve daha kapsamlı denetime tabi tutulur. Eksiklikler 'deficiency' olarak kayıt altına alınır; belirli eşiği aşan veya emniyet açısından kritik eksiklikler detention ile sonuçlanır.",
        image: safetyEquipment,
        imageAlt: "PSC denetimi ve köprüüstü kontrolleri",
        bulletPoints: [
          "SOLAS V/34: her sefer için seyir planı zorunludur, köprüüstünde bulunmalıdır",
          "Müfettiş köprüüstünü ziyaret ederek ECDIS/kağıt harita kullanımını, alarm yönetimini ve seyir planı detaylarını inceler",
          "Sertifikalar: SMC, DOC, ISSC, DMLC Part I–II ve personel STCW sertifikaları kontrol edilir",
          "VDR (Voyage Data Recorder) ve ECDIS güncelleme kayıtları sıkça istenir",
          "Detention: geminin limanda tutulması — ciddi eksiklik varlığında uygulanır"
        ]
      },
      {
        title: "Seyir Planı ve ECDIS: PSC'nin Odak Noktaları",
        content:
          "PSC müfettişleri, seyir planının yalnızca varlığını değil içeriğini ve uygulanabilirliğini sorgular. IMO Resolution A.893(21) çerçevesinde değerlendirilen seyir planı; appraisal (ön değerlendirme), planning (planlama), execution (uygulama) ve monitoring (izleme) aşamalarının tümünü kapsamalıdır. ECDIS kullanılıyorsa ilave kontroller devreye girer: ECDIS yazılımının sertifikalı ve güncel olması, ENCs'lerin güncel lisans altında olması, alarm eşiklerinin uygun değerlere ayarlanması ve ECDIS'te kullanılan datum ile GPS datum uyumunun belgelenmesi gerekir. Ayrıca pilot board planı, acil cast off prosedürü ve contingency planının bulunması istenir. Müfettiş, köprüüstünde olan zabiti sezin rotası üzerindeki tehlikeleri göstermesini, güvenli hız gerekçesini açıklamasını ve passage plan onay sürecini anlatmasını isteyebilir.",
        bulletPoints: [
          "ECDIS: yazılım versiyonu ve ENC güncellik tarihleri defterle belgelenmelidir",
          "Seyir planı: en az appraisal, planlama, waypoint listesi ve acil prosedürleri içermelidir",
          "Seyir planı kaptan tarafından onaylanmış olmalı ve imzası bulunmalıdır",
          "NAVTEX ve yayın güncelleme kaydı — Notice to Mariners — belgelenmeli",
          "Kağıt harita kullanılıyorsa düzeltme kaydı (correction log) eksiksiz tutulmalı"
        ]
      },
      {
        title: "Köprüüstü Prosedürleri ve STCW Uyumu",
        content:
          "PSC denetiminde köprüüstü prosedürleri; vardiya tutma standartları, seyir donanımı kullanım talimatları ve acil durum prosedürlerini kapsar. STCW Bölüm VIII/2 kapsamında güvenli vardiya tutma ilkeleri, söz konusu seyrin özelliklerine göre uyarlanmış köprüüstü prosedürlerine yansıtılmış olmalıdır. Müfettiş köprüüstü log defterini, radar ve ARPA kayıtlarını ve GMDSS log defterini inceleyebilir. Bridge Procedures Guide (ICS, 5. Baskı) referans alınarak hazırlanan Ship Specific Operations Manual, müfettişe prosedürlerin sistematik şekilde belgelendiğini gösterir. Ayrıca SOLAS Bölüm II-1/49 kapsamında köprüüstünden iletişim sistemi testi — bridge-to-emergency generator communication — ile SOLAS V/26 kapsamında pilot transfer düzenlemelerinin hazırlığı da kontrol edilebilir.",
        formula: {
          text: "PSC Risk Skoru = f(Bayrak, Sınıflandırma, Önceki Detention, Yaş, Tip)",
          description: "Paris MOU concentrated inspection kampanyaları belirli ekipman veya prosedür konusuna odaklanır; güncel kampanya konusu başlık sefer öncesinde araştırılmalıdır"
        }
      },
      {
        title: "Deficiency ve Detention Yönetimi",
        content:
          "PSC denetiminde tespit edilen her eksiklik CIC (Concentrated Inspection Campaign) formuna ya da Paris/Tokyo MOU sistemine kaydedilir. 'Detention' kararı, emniyet açısından kritik eksiklik — güvenlik ekipmanı çalışmıyor, sertifika geçersiz, mürettebat yeterlilikleri uygunsuz, köprüüstü donanımı arızalı — halinde verilir. Detention, gemi armatoruna hem maddi hem de itibar kaybı açısından ciddi sonuçlar doğurur. Kaptan ve zabitler açısından detention, kişisel kariyer üzerinde de olumsuz iz bırakabilir. Bu nedenle PSC denetimine hazırlık; belgelerin güncelliği, ekipmanların çalışırlığı ve mürettebatın prosedürlere hakimiyeti açısından sistematik öz-denetim (internal audit) ile desteklenmelidir.",
        bulletPoints: [
          "Detention kararı sonrasında müfettişin tespit ettiği eksikliklerin giderilmesi şart",
          "Detention kaydı, gemi Paris/Tokyo MOU veritabanına işlenir ve gemi daha sık denetime tabi olur",
          "Kaptan, müfettiş tespitlerini imzalamadan önce itiraz hakkını kullanabilir",
          "ISM kapsamında 'non-conformity' tespiti, SMS (Safety Management System) güncellemesini tetikler",
          "Proaktif hazırlık: SMS prosedürlerinin köprüüstünde uygulanması, detention riskini büyük ölçüde azaltır"
        ]
      }
    ],
    keyPoints: [
      "PSC, SOLAS V/34 kapsamında her geminin seyir planı hazırlayıp hazırlamadığını denetler.",
      "ECDIS kullanıyorsa yazılım sürümü ve ENC güncelleme tarihleri müfettişe belgelenebilir olmalıdır.",
      "Müfettiş zabitten seyir planının içeriğini, tehlikelerin konumunu ve acil prosedürleri sözlü açıklamasını isteyebilir.",
      "Paris MOU'nun risk endeksi; bayrak, sınıflandırma kuruluşu, önceki detention sayısı ve yaşa göre hesaplanır.",
      "Detention kararı maddi ve itibar kaybına yol açar; proaktif iç denetim ile büyük ölçüde önlenebilir.",
      "STCW sertifikalarının geçerliliği, yazılı prosedürlere uyum ve köprüüstü günlük kayıtları PSC'nin temel odaklanma noktalarıdır."
    ]
  },
  "COLREG temel prensipleri": {
    title: "COLREG Temel Prensipleri",
    introduction:
      "COLREG (Convention on the International Regulations for Preventing Collisions at Sea, 1972), deniz kazalarının en yıkıcı türü olan çatışmaları önlemek amacıyla IMO bünyesinde hazırlanmış ve 1977 yılında yürürlüğe girmiş uluslararası sözleşmedir. 38 kural ve eklerden oluşan COLREG, açık deniz ve liman giriş kanalları dahil tüm sularda geçerlidir; yalnızca iç suya özgü kuralları olan ülkelerin yetkisi saklı kalmak üzere. Kurallar üç sütun üzerine inşa edilmiştir: sürekli ve etkin gözcülük (Kural 5), koşullara göre belirlenen güvenli hız (Kural 6) ve erken aşamada belirlenip yönetilen çatışma riski (Kural 7–8). Tüm bu teknik kurallar, Kural 2'nin 'iyi denizcilik uygulamaları' genel hükmüyle tamamlanır: olağandışı koşullarda kurallara sıkı biçimde bağlı kalmak tehlike yaratıyorsa kaptan inisiyatif kullanabilir. Denizcilik fakültesi öğrencileri için COLREG, hem sınav hem de gerçek deniz hayatında günlük karşılaşılan durumları yöneten temel hukuki çerçevedir.",
    sections: [
      {
        title: "Kural 5: Gözcülük ve Kural 6: Güvenli Hız",
        content:
          "Kural 5, geminin görme ve işitme dahil mevcut tüm araçlarla sürekli ve etkin gözcülük yapmasını zorunlu kılar; ARPA ve AIS bu araçların başında gelir, ancak bunların salt teknolojik çıktısına dayanmak yetersizdir. 'Sürekli' gözcülük, vardiya zabiti dahil tüm köprüüstü personelinin durumsal farkındalık içinde kalmasını gerektirir. Kural 6 ise her koşulda 'güvenli hız' uygulanması zorunluluğunu getirir; güvenli hız, geminin mevcut görüş, trafik yoğunluğu, rüzgâr, akıntı ve su derinliğini dikkate alarak tam durdurma mesafesi (stopping distance) içinde kalabileceği azami hızdır. Tam manevra kabiliyeti (full maneuverability) olmayan gemilerde — draft kısıtlaması, makine arızası — güvenli hız buna göre düşürülür. Kısıtlı görüşte güvenli hız özellikle önem kazanır: Kural 19(b) radar menzili ile orantılı hız yapılmasını açıkça zorunlu tutar.",
        image: aisTargets,
        imageAlt: "COLREG gözcülük ve güvenli hız",
        bulletPoints: [
          "Kural 5: görme, işitme, radar ve AIS ile sürekli ve etkin gözcülük zorunludur",
          "Kural 6: güvenli hız; görüş, trafik, manevra kabiliyeti ve deniz durumuna göre belirlenir",
          "Güvenli hızın aşılması çatışma davasında kusur olarak değerlendirilir",
          "Tam durdurma mesafesi (crash-stop distance) seyir öncesinde bilinmeli ve kayıtlı olmalıdır",
          "Kısıtlı görüşte güvenli hız genellikle önemli ölçüde düşürülür"
        ]
      },
      {
        title: "Kural 7 ve 8: Çatışma Riski ve Önleyici Manevra",
        content:
          "Kural 7, çatışma riskinin belirlenmesini düzenler. Risk, kompass yöntemle (sabit pusula yönü) veya ARPA ile hesaplanan CPA/TCPA değerleriyle tespit edilir. Pusulanın değişmediği bir gemi çatışma riski taşır; CPA sıfıra yaklaşıyor ve TCPA azalıyorsa risk yüksektir. Kuralın kilit ifadesi 'eğer şüphe varsa, risk var sayılır' — bu ilke muhafazakârlığa zorlar. Kural 8, önleyici manevralar için üç temel kriteri öngörür: (1) manevra erken yapılmalı; (2) manevra geniş açılı ve net biçimde uygulanmalı (küçük dümen değişiklikleri karşı gemiyi yanıltır); (3) manevra sonucunda yeni bir çatışma riski yaratılmamalıdır. 'Erken ve belirgin' ilkesi COLREG'in vazgeçilmez kavramıdır; son dakika Kural 17(b) manevrası beklenmeden çok önce harekete geçilmesi şarttır.",
        bulletPoints: [
          "CPA (Closest Point of Approach) ve TCPA (Time to CPA) risk değerlendirmesinin nicel araçlarıdır",
          "Sabit pusula yönü + azalan mesafe kombinasyonu çatışma riskinin klasik göstergesidir",
          "Kural 8: manevra erken, büyük açılı ve net biçimde uygulanmalıdır",
          "Çoklu gemi senaryosunda her gemi için ayrı risk değerlendirmesi yapılır",
          "ARPA vector modunu kullanarak tahmin edilen konumları izlemek Kural 7 yükümlülüğünü karşılar"
        ]
      },
      {
        title: "Kural 2: İyi Denizcilik Uygulamaları ve Özel Koşullar",
        content:
          "Kural 2, COLREG'in 'istisnai koşullara kapı açan' maddesidir: sözleşmenin diğer hiçbir hükmünün ihmalden doğan sonuçları ortadan kaldırmadığını ve olağandışı tehlikeyi önlemek için kurallardan sapmanın gerekebileceğini açıkça kabul eder. Bu madde aynı zamanda kurallara körü körüne uymak yerine durumu bütünüyle değerlendiren, yargılayan bir kaptan profilini öngörür. COLREG kuralları belirli durumlar için (crossing, head-on, overtaking) net talimatlar verse de açık denizde bütün senaryoları öngörmek mümkün değildir; Kural 2 bu boşluğu kapatır. Uygulamada 'iyi denizcilik uygulamaları' kavramı mahkeme kararlarında yaygın biçimde kullanılır: makul bir kaptan bu koşullarda ne yapardı? Bu standardın içselleştirilmesi, kuralları ezberlemekten çok daha kalıcı bir mesleki yetkinlik sağlar.",
        formula: {
          text: "Risk Değerlendirmesi: ΔBearing ≈ 0 + ΔRange azalıyor → Çatışma riski VAR",
          description: "Bearing = pusula yönü (°); CPA → 0'a yaklaşırsa risk kritik; TCPA = süre (dk); erken manevra için TCPA > 15–20 dk iken harekete geçmek standart uygulamadır"
        }
      },
      {
        title: "COLREG Hiyerarşisi: Yol Verme Öncelik Sıralaması",
        content:
          "COLREG'in 38 kuralı tematik gruplara ayrılır: Bölüm A (Genel: Kural 1–3 tanımlar), Bölüm B (Yönetim ve Seyir: Kural 4–19), Bölüm C (Fenerlerin ve Işık Şekillerinin Gösterilmesi: Kural 20–31), Bölüm D (Ses ve Işık İşaretleri: Kural 32–37). Bölüm B'nin manevra kabiliyeti hiyerarşisi kritiktir: manevra kabiliyeti kısıtlı gemiler (RAM), sığlıkta kısıtlı gemiler (CBD), balıkçı gemileri, yelken gemileri ve motor gemileri arasında sıralama belirlenmiş olup motor gemisi hiyerarşinin en altındadır. Bu hiyerarşiyi bilmek, yol verme yükümlülüğünün kime ait olduğunu doğru belirlemenin ön koşuludur.",
        bulletPoints: [
          "NUC (Not Under Command): manevra kabiliyetini yitirmiş gemi — en üst öncelik",
          "RAM (Restricted in Ability to Manoeuvre): manevra kabiliyeti kısıtlı gemi",
          "CBD (Constrained by Draught): draftı nedeniyle, içinde seyrettiği suyun derinliği ve genişliği ile orantılı olarak rotasından sapma kabiliyeti ciddi ölçüde kısıtlı motorlu gemi (Kural 3(h)) — yalnızca dar kanallarla sınırlı değildir",
          "Balıkçı (fishing): olta değil, ağ veya trol kullanan gemi",
          "Yelken altında seyreden gemi: motor gemisine karşı öncelikli, kendi üstündeki sınıflara yol verir"
        ]
      }
    ],
    keyPoints: [
      "COLREG 1972, tüm denizlerde geçerli uluslararası çatışma önleme sözleşmesidir; 38 kural ve eklerden oluşur.",
      "Kural 5: sürekli ve etkin gözcülük — görme, işitme ve elektronik araçların tümü kullanılır.",
      "Kural 6: güvenli hız — tam durdurma mesafesi içinde kalınabilecek azami hız; kısıtlı görüşte özellikle kritik.",
      "Kural 7–8: çatışma riski sabit pusula yönü + azalan mesafeyle belirlenir; manevra erken, büyük açılı ve net yapılır.",
      "Kural 2: iyi denizcilik uygulamaları — kurallara körü körüne bağlılık yerine durumu bütünüyle değerlendiren kaptan profili.",
      "Hiyerarşi: NUC > RAM > CBD > Balıkçı > Yelken > Motor gemisi; yol verme yükümlülüğü alt sınıftaki gemidedir."
    ]
  },
  "Crossing": {
    title: "Crossing: COLREG Kural 15",
    introduction:
      "Crossing (kesişme) durumu, COLREG'in en sık karşılaşılan ve aynı zamanda en çok yanlış yorumlanan senaryolarından biridir. İki motorlu gemi aynı anda çatışma riski oluşturacak biçimde birbirinin rotasını kesiyor ve bu durum head-on ya da overtaking kapsamına girmiyorsa Kural 15 devreye girer. Crossing, dünya genelindeki deniz kazası istatistiklerinde önemli yer tutar: yanlış gemi görev belirlenmesi (hangisinin 'give-way' olduğu), geç ya da yetersiz manevra ve VHF üzerinden yanlış anlaşmalar başlıca hata kaynaklarıdır. Denizcilik fakültesi öğrencileri için crossing senaryosunu geometrik, yasal ve operasyonel boyutlarıyla kavramak, STCW sınavlarında ve gerçek deniz hayatında en kritik yetkinliklerden biridir.",
    sections: [
      {
        title: "COLREG Kural 15: Temel Tanım ve Yükümlülükler",
        content:
          "Kural 15 yalnızca iki motorlu gemi arasında uygulanır ve şunu belirtir: çatışma riski varsa, diğer gemiye kendi sancak tarafından sahip olan gemi yol verme yükümlülüğündedir (give-way vessel). Kural 15'in uygulanabilmesi için crossing senaryosunun önce tanımlanması gerekir: iki geminin rotaları kesişmeli ve Kural 14 (head-on) ile Kural 13 (overtaking) koşulları geçerli olmamalıdır. Give-way gemisi, diğerinin kıçından geçerek manevra yapmalıdır — pratikte bu büyük çoğunlukla sancağa dönüp diğerinin kıçından geçmek anlamına gelir. Stand-on gemisi ise rotasını ve hızını korumalı; ancak çatışma tehlikesi son ana kadar yaklaştığında Kural 17(b) kapsamında harekete geçmek zorunda kalabilir.",
        image: aisTargets,
        imageAlt: "Crossing — COLREG Kural 15 yol verme senaryosu",
        bulletPoints: [
          "Sancak tarafında bulunan gemiye yol verilir: 'The vessel which has the other on her starboard side shall keep out of the way'",
          "Give-way gemisi: erken, büyük açılı ve net manevra yapmalıdır (Kural 8)",
          "Stand-on gemisi: rota ve hızını korur; ancak çatışma kaçınılmaz görünürse Kural 17(b) devreye girer",
          "Crossing senaryosu, head-on ile karıştırılmamalıdır: head-on'da her iki gemi birden sancağa döner",
          "VHF üzerinden düzenleme girişimi tehlikeli olabilir: kural uygulansın, VHF koordinasyonu ona ek yapılsın"
        ]
      },
      {
        title: "Crossing Senaryolarında Geometri ve ARPA Uygulaması",
        content:
          "Crossing riskinin doğru belirlenmesi için bearing (pusula yönü) ve range (mesafe) verisini birlikte değerlendirmek gerekir. Sabit bearing + azalan range kombinasyonu çatışma riskini gösterir. ARPA üzerinde relative vector ile diğer geminin yakın geçiş noktasını (CPA) ve TCPA'yı hesaplamak, give-way manevrası için gereken zamanı belirlemenin en doğru yoludur. Pratikte TCPA > 15 dakika iken harekete geçmek standarttır; daha geç bırakmak stand-on gemisini Kural 17(b) manevrası yapmak zorunda bırakabilir. Kuralda 'sancak tarafında' olan geminin belirlenmesi zaman zaman güçtür: iki gemi neredeyse aynı rotadaysa ve küçük bir açı farkıyla kesişiyorsa head-on–crossing ayrımı gri bölge yaratabilir.",
        bulletPoints: [
          "ARPA CPA < 0.5 nm ve TCPA < 20 dk: kritik risk, hemen harekete geç",
          "Bearing değişimi yoksa (steady bearing): çatışma riski kesindir",
          "Give-way manevrasının 'büyük açılı' olması kritik: 30° üzeri dümen değişimi karşı gemiye açık sinyal gönderir",
          "Kendi rotanun kıçından geçmek 'alma' (taking the stern) olarak bilinir ve crossing için tercih edilen manevradır",
          "Gündüzleri görsel, geceleri fener ve ARPA ile durum teyit edilir"
        ]
      },
      {
        title: "Kural 17: Stand-On Gemisinin Hakları ve Sınırları",
        content:
          "Stand-on gemisi Kural 17(a)(i) kapsamında rota ve hızını korumalıdır. Kural 17(a)(ii), stand-on gemisinin kendi manevrası sonucunda çatışmayı önleyemeyeceği anlaşılırsa harekete geçebileceğini söyler. Kural 17(b) ise çatışma kaçınılmaz hale geldiğinde stand-on gemisine en etkili manevrayı yapma zorunluluğu getirir. Bu hiyerarşik yapı kritiktir: stand-on gemisi erkenden müdahale ederek give-way gemisinin manevralarını karıştırmamalı; ancak son an geldiğinde çatışmayı önlemek için harekete geçmelidir. Mahkemeler, her iki geminin de kusurlu bulunduğu pek çok çatışma davasında stand-on gemisinin Kural 17 kapsamındaki gecikmiş eylemsizliğini de sorumluluk faktörü olarak değerlendirmiştir.",
        formula: {
          text: "Crossing Riski: Sabit Bearing (°) + Azalan Range (nm) + Sancak Tarafı → Give-way gemisi belirlenir",
          description: "Give-way gemisi: diğerini sancağında gören | Stand-on gemisi: diğerini iskelesinde gören — Kural 17 kapsamında rota/hız korur"
        }
      }
    ],
    keyPoints: [
      "Crossing, Kural 15 kapsamında çatışma riski oluşturan iki motorlu geminin rota kesişmesidir.",
      "Yol verme yükümlülüğü: diğerini sancak tarafında gören gemi give-way'dir; genellikle kıçtan geçer.",
      "Give-way gemisi Kural 8 uyarınca erken, büyük açılı ve net manevra yapmalıdır.",
      "Stand-on gemisi Kural 17(a)(i) kapsamında rota ve hızını korur; son anda 17(b) devreye girer.",
      "ARPA ile CPA ve TCPA hesaplanarak kritik risk zamanı belirlenir; TCPA > 15 dk iken manevra standarttır.",
      "VHF koordinasyonu kurala ek yapılır; kuralın uygulanmasının yerini almaz."
    ]
  },
  "Head-on": {
    title: "Head-on: COLREG Kural 14",
    introduction:
      "Head-on (karşılıklı yaklaşma) durumu, COLREG'in en net ve tartışmasız manevralarından birini zorunlu kılar: her iki motorlu gemi de sancağa (sağa) dönerek birbirlerinin sancak tarafından geçer. Kural 14, symmetrical — her iki gemiye de eşit yükümlülük yükleyen — tek kuraldır. Dünya genelinde analiz edilen çatışma vakalarında head-on senaryosunun katkısı yüksektir; bunun başlıca nedenleri arasında sisin veya gecelerin görüşü kısıtlaması, ARPA yorumundaki hatalar ve head-on ile crossing arasındaki sınırda yaşanan belirsizlik sayılabilir. Kural 14'ün doğru anlaşılması; manevraya şüphe ile yaklaşıldığında head-on varsayımının tercih edilmesi gerektiği ilkesini de kapsar.",
    sections: [
      {
        title: "COLREG Kural 14: Tanım ve Koşullar",
        content:
          "Kural 14(a) şunu belirtir: iki motorlu gemi karşılıklı veya neredeyse karşılıklı rotalarda birbirlerine yaklaşıyorsa çatışma riski oluşur ve her iki gemi de sancağa dönmelidir. Kural 14(b) ise head-on durumunun pratik tanımını yapar: gece boyundan gemi feneri (masthead light) ile yan fenerin aynı anda karşıdan görülmesi; gündüzleri ise geminin diğerinin rotasına tam veya neredeyse tam karşı yönde olması. Kural 14(c) kritik bir hüküm içerir: şüphe halinde head-on durumunun var olduğu varsayılmalıdır. Bu varsayım ilkesi, belirsiz durumlarda her iki geminin de sancağa dönmesini güvenceye alır ve yanlış yorumdan kaynaklanan çatışma riskini büyük ölçüde azaltır.",
        image: aisTargets,
        imageAlt: "Head-on — Kural 14 karşılıklı yaklaşma senaryosu",
        bulletPoints: [
          "Head-on tanımı: iki motorlu gemi karşılıklı rotalarda birbirine yaklaşıyorsa",
          "Kural 14(c): şüphe varsa head-on varsayılır — her iki gemi de sancağa döner",
          "Gece tanımı: boydan gemi feneri + her iki yan fener aynı anda görülür",
          "Kural 14 crossing ile karıştırılmamalı: head-on'da simülasyon yükümlülük eşit, crossing'de asimetrik",
          "Genel kural: 10–15° veya daha az farklılık varsa crossing değil head-on varsay"
        ]
      },
      {
        title: "Manevra Uygulaması ve Sık Yapılan Hatalar",
        content:
          "Head-on senaryosunda her iki gemi de sancağa (sağa) dönerek birbirlerinin sancak tarafından geçer; bu simetrik manevra, trafik ayrım düzenlemelerine (TSS) benzer şekilde 'sağda kal' prensibini pekiştirer. Manevradan doğan sık hatalar şunlardır: (1) gemilerin farklı yönde dönmesi — biri sancağa, diğeri iskeleye dönerse mesafe kapanır; (2) küçük dümen değişiklikleri — 5°'lik bir değişimi karşı gemi fark etmez ve crossing ile baş omuz etkisi yaratılır; (3) VHF üzerinden 'iskeleye iskeleye' gibi kural dışı anlaşmalar yapılması. IMO rehberlerine göre yalnızca Kural 14 uygulanmalı; VHF üzerinden 'hangi tarafa' sorgusu COLREG'in yerini alamaz çünkü iletişim hatası halinde riski artırır.",
        bulletPoints: [
          "Her iki gemi sancağa döner — asimetrik manevra çatışma riskini artırır",
          "Manevra büyük açılı yapılmalı: en az 15–20° dümen değişimi, karşı gemi tarafından görünür olmalı",
          "VHF 'iskele geçişi' anlaşması: güvenli görünse de COLREG'i override edemez — kaçınılmalı",
          "Geç fark edilen head-on: radar P-PI (parallel index) ile yaklaşma geometrisi erken analiz edilmeli",
          "Sound signal: iki kısa düdük (port side passing) vs bir kısa düdük (starboard side passing) — Kural 34"
        ]
      },
      {
        title: "Head-on ve Crossing Sınırındaki Gri Alan",
        content:
          "Pratikte head-on ile crossing arasındaki sınır her zaman net değildir. Kural 14(c)'nin 'şüphe halinde head-on varsay' ilkesi bu gri alanı yönetmek içindir. ARPA'da iki geminin birbirine 170–180° üzerinde yaklaştığı görülüyorsa head-on; 90–135° üzerinde yaklaşıyorsa crossing; arası için dikkatli analiz gerekir. Sınır senaryolarında her iki kuralın uygulanması — head-on kapsamında her ikisi sancağa, crossing kapsamında give-way sancağa — farklı manevralar doğuracak ve iki gemi aynı yönde dönerse crossing manevrası oluşacaktır. Bu belirsizlik, ARPA kullanımı ve erken sabit bearing takibini zorunlu kılar.",
        formula: {
          text: "Head-on Koşulu: Relative Bearing ≈ 180° ± ~10° → Her iki gemi sancağa döner",
          description: "Relative bearing = karşı geminin pusula yönü; 180°'ye yakın ise head-on, 90–135° arası ise crossing senaryosu; şüphe halinde head-on varsayılır (Kural 14c)"
        }
      }
    ],
    keyPoints: [
      "Head-on, iki motorlu geminin karşılıklı rotalarda birbirine yaklaştığı COLREG Kural 14 senaryosudur.",
      "Her iki gemi de sancağa döner — simetrik yükümlülük, diğer kuralların aksine her iki gemiye eşit uygulanır.",
      "Kural 14(c): şüphe halinde head-on varsayılır ve her iki gemi sancağa döner.",
      "Manevralar büyük açılı ve erken yapılmalı; küçük dümen değişiklikleri karşı gemiyi yanıltır.",
      "VHF ile 'iskele geçişi' anlaşması COLREG'in yerini alamaz; kuralın uygulanması esastır.",
      "Head-on ve crossing sınırındaki senaryolarda Kural 14(c) gri alanı yönetir: şüphe = head-on varsayımı."
    ]
  },
  "Overtaking": {
    title: "Overtaking: COLREG Kural 13",
    introduction:
      "Overtaking (geçme manevrası), COLREG’in en uzun süre sorumluluk yükleyen senaryosudur: geçme işlemini başlatan gemi, geçiş tamamen tamamlanana kadar — diğer geminin gemiden çok uzaklaşana kadar — yol verme yükümlülüğü altında kalmaya devam eder. Kural 13, geçen geminin hiyerarşide nerede durduğundan bağımsızdır: overtaking durumunu yaratan gemi, karşılaşma her ne olursa olsun give-way yükümlülüğünü üstlenir. Bu prensip, overtaking’in hem dar su yollarında hem de açık denizde kazara çatışma potansiyelini barındıran kritik bir manevra olduğunu ortaya koyar.",
    sections: [
      {
        title: "COLREG Kural 13: Tanım ve Sınırlar",
        content:
          "Kural 13(b) overtaking’i geometrik olarak tanımlar: bir gemi, diğerine kemere hattının (beam) 22.5°’den daha gerisinden — yani yalnızca kıç fenerini (sternlight, 135° kapsam alanı) görebileceği bir doğrultudan — yaklaşıyorsa overtaking durumu söz konusudur. Geceleri bu, diğer geminin yan fenerlerini değil yalnızca kıç fenerini görmek demektir; gündüzleri ise kemerenin 22.5° kıçından daha geriden yaklaşmak anlamına gelir. Kural 13(c) ise kritik bir hüküm içerir: overtaking durumundan şüphe edildikçe, gemi overtaking durumunda olduğunu varsaymalıdır. Kural 13(d) ise geçme manevrası başladıktan sonra iki geminin konumsal ilişkisi crossing konumuna geçse bile Kural 13’ün geçerliliğini koruduğunu açıklar — böylece overtaking gemisi kural değiştirme yoluyla sorumluluğu üzerinden atamaz.",
        image: aisTargets,
        imageAlt: "Overtaking — Kural 13 geçme manevrası senaryosu",
        bulletPoints: [
          "Kural 13(b): kıç ışığının 135° yayı içinden yaklaşma = overtaking",
          "Kural 13(c): şüphe halinde overtaking varsayılır",
          "Kural 13(d): geçiş başladıktan sonra crossing konumuna geçilse de Kural 13 devam eder",
          "Geçen gemi (overtaking vessel): hiyerarşik statüsünden bağımsız olarak her zaman give-way",
          "Geçilen gemi (vessel being overtaken): stand-on — rota ve hız korunur"
        ]
      },
      {
        title: "Overtaking Manevrası: Sancak mı, İskele mi?",
        content:
          "Overtaking senaryosunda geçen gemi sancaktan mı yoksa iskeledan mı geçeceğine karar vermelidir. Kural 13 bu konuda açık tercih belirtmez; ancak trafik ayrım düzenlemelerinde (TSS) sancak geçiş tercih edilir. Dar su yollarında (Kural 9) ise geçme ancak güvenli ve pratik olduğunda yapılmalıdır. Overtaking sırasında geçen gemi karşı geminin sancak veya iskele tarafında yeterli açıklık yaratmalı, iki gemi arasındaki boşluktan kaynaklanan ‘bank etki’ veya ‘interaction’ (etkileşim) kuvvetlerine karşı dikkatli olmalıdır. Büyük gemilerde bu etkileşim, sürüklenme ve dümen tepkisizliği yaratarak çatışma riskini artırabilir.",
        bulletPoints: [
          "Overtaking geçişi sırasında iki gemi arasındaki mesafe genellikle en az 2-3 gemi genişliği olmalı",
          "Hydrodynamic interaction: yakın mesafede geçiş; geçilen gemiyi itme veya çekme etkisi yaratır",
          "Dar sularda overtaking: karşı tarafı sesli işaretle uyar (Kural 34(c)(i): iki uzun + bir kısa düdük)",
          "Geçilen geminin geçişe izin sinyali: iki uzun + iki kısa düdük (Kural 34(c)(ii))",
          "Geçiş tamamlanana kadar overtaking gemisi yol verir — kesintisiz sorumluluk"
        ]
      },
      {
        title: "Overtaking ve Dar Su Yolları Etkileşimi",
        content:
          "Kural 9 (Dar Kanallar), overtaking senaryosunu kısıtlayan ek düzenlemeler içerir. Dar kanallarda geçme manevrası yalnızca güvenli ve pratik olduğunda yapılabilir; geçilen geminin de manevra için yeterli alan açması gerekmektedir. Bu durum, overtaking gemisinin Kural 9(e)(i) uyarınca ses sinyali vermesini — 2 uzun 1 kısa — ve geçilen geminin onay vermesini — 2 uzun 2 kısa — zorunlu kılar. Geçilen gemi itiraz edebilir: 5 kısa hızlı düdük tehlike veya şüphe sinyali olarak kullanılır. Pilot alınan sularda pilot, overtaking kararını limancı otoritesi kuralları ve kanal trafik düzenlemeleri çerçevesinde verir; ancak sorumluluk yasal olarak hâlâ kaptana aittir.",
        formula: {
          text: "Overtaking Tanımı: Kemere hattının 22.5°’den daha gerisinden (kıç fenerinin 135° yayı içinden) yaklaşma → Overtaking durumu",
          description: "22.5° kıç-omuz hattı, yan fenerlerin (her biri 112.5°) bittiği ve yalnızca kıç fenerinin (135°) görüldüğü sınırdır; bu hattın gerisinden yaklaşan gemi overtaking gemisidir ve her zaman give-way yükümlülüğündedir"
        }
      }
    ],
    keyPoints: [
      "Overtaking (Kural 13): kıç ışığının 135° kapsam yayı içinden yaklaşan gemi overtaking durumundadır.",
      "Geçen gemi, hiyerarşik statüsünden bağımsız olarak her zaman give-way yükümlülüğü taşır.",
      "Kural 13(d): geçiş başladıktan sonra crossing konumuna geçilse bile Kural 13 devam eder.",
      "Dar su yollarında geçme için ses sinyali (2 uzun 1 kısa) ve karşı geminin onayı gereklidir.",
      "Hydrodynamic interaction: yakın geçişte iki gemi arasında sürükleme/itme kuvvetleri oluşur.",
      "Sorumluluk geçiş tamamen tamamlanana kadar — geçen gemi tamamen önde ve uzakta olmayan kadar — sürer."
    ]
  },
  "Restricted visibility": {
    title: "Restricted Visibility: COLREG Kural 19",
    introduction:
      "Kısıtlı görüş (restricted visibility), denizcilik tarihinde en fazla can ve mal kaybına yol açan seyir koşullarının başında gelir. Sis, yoğun yağış, kar, kum fırtınası veya diğer benzer durumlar görüşü kısıtladığında COLREG Kural 19 devreye girer. Kural 19'un diğer tüm kurallardan temel farkı şudur: bu kural görsel temas olmaksızın yaklaşan gemilere uygulanır ve give-way / stand-on ayrımını ortadan kaldırır — her gemi, karşı geminin konumunu ve niyetini tam olarak göremeden manevra yapmak zorundadır. Bu durum radar okumasını, ARPA analizini ve ses sinyallerini kritik hale getirirken aynı zamanda yanlış yorumların daha hızlı geliştiği bir seyir ortamı yaratır. Denizcilik fakültesi öğrencileri için Kural 19'un tüm gereksinimleri — hız, radar, ses sinyalleri ve manevra kısıtlamaları — bütün olarak kavranmalıdır.",
    sections: [
      {
        title: "Kural 19: Kapsamı ve Temel Yükümlülükler",
        content:
          "Kural 19(a), düzenlemenin uygulanacağı durumu tanımlar: birbirini göremeyen gemiler arasındaki veya kısıtlı görüş bölgelerine yakın gemilere uygulanır. Kural 19(b) en kritik hükmü içerir: kısıtlı görüşte güvenli hız, radar menziliyle orantılı olmalı ve tam durdurma mesafesi içinde kalabilecek hızla seyredilmelidir. Yalnızca radar izine dayanılarak ani manevra yapılmamalıdır: Kural 19(d)(i) 'bir gemi çatışma riskini yalnızca radar izine dayanarak tespit ederse, tek başına rotayı iskeleye almaktan kaçınmalıdır' — çünkü baş omuzdan gelen bir gemi rotayı iskeleye alırsa iki gemi aynı yöne dönmüş olabilir. Kural 19(e) ise çatışmanın hemen gerçekleşeceği noktaya gelindiğinde manevranın hız azaltma, tam durdurma veya öne hareketini sonlandırma şeklinde yapılabileceğini belirtir.",
        image: radarDisplay,
        imageAlt: "Kısıtlı görüşte seyir — radar gözcülüğü",
        bulletPoints: [
          "Kural 19(b): güvenli hız radar menziliyle orantılı olmalı; tam durabilme mesafesi içinde kalınmalı",
          "Kural 19(d)(i): sadece radar izine dayanarak gemi baş omuzdan geliyorsa rota iskeleye alınmamalı",
          "Kural 19(d)(ii): baş omuz dışından yaklaşan gemiye yol verme için sancağa dönüş tercih edilir",
          "Kural 19(e): çatışma kaçınılmaz ise hız azalt, dur veya astern ver",
          "Give-way / stand-on ayrımı kısıtlı görüşte uygulanmaz — her gemi erken ve muhafazakâr manevra yapar"
        ]
      },
      {
        title: "Sis Prosedürleri ve GMDSS Yükümlülükleri",
        content:
          "Kısıtlı görüş koşullarına giren gemi için standart prosedürler: (1) makineyi hazır konuma al (engines on standby); (2) ses şaretlerini başlat — motorlu gemi: her 2 dakikada bir uzun düdük (Kural 35(a)); (3) ek gözcü köprüüstüne al ve iş yükünü yeniden dağıt; (4) tüm navigasyon fenerleri yak; (5) radar ve ARPA'yı en yüksek çözünürlükte kullan; (6) AIS'i aktive et ve kanal 16'yı dinle. GMDSS kapsamında söz konusu sularda NAVTEX sis uyarıları ve yerel liman kanalından duyurular izlenmelidir. ISM kapsamındaki SMS (Safety Management System), geminin sis prosedürlerini yazılı olarak belgelemesini zorunlu kılar; kaptan bu prosedürleri uyguladığını log defterine kaydetmelidir.",
        bulletPoints: [
          "Makine hazır (standby): ani hız değişikliği için fiziksel hazırlık",
          "Ses sinyali (Kural 35a): 2 dakikada bir uzun düdük — motorlu gemi, yolda",
          "Demir atmış gemi (Kural 35g): 1 dakikada 5 saniye çan — arka çan da olabilir",
          "NUC/RAM gemisi (Kural 35c): 2 dakikada bir uzun + 2 kısa düdük",
          "Radar: her iki menzil skalasını da kullan — kısa menzil yakın tehdidi, uzun menzil genel tabloyu gösterir"
        ]
      },
      {
        title: "Radar ARPA Analizi ve Manevra Kısıtlamaları",
        content:
          "Kısıtlı görüşte ARPA, çatışma riskini belirlemenin birincil aracıdır. Her hedefin CPA ve TCPA değerleri izlenmeli; hedefler arasında öncelik sıralaması yapılmalıdır. Kural 19(d)(i)'nin 'iskeleye dönme' kısıtlaması, ARPA'da hangi yönden yaklaştığı belli olduğunda uygulanır: baş omuzdan gelen hedef için sancağa ya da hız azaltma tercih edilmelidir. 'Seçici manevra' (selective avoidance) prensibi: ARPA'da birden fazla hedef olduğunda, en yakın ve en tehlikeli hedefe yönelik manevra diğerlerine zarar vermemelidir. Simülatör eğitimlerinde sıklıkla sis senaryoları uygulanır; öğrencilerden çoklu hedeflerde doğru CPA/TCPA analizi ve Kural 19'a uygun manevra kararı beklenir.",
        formula: {
          text: "Sis Güvenli Hızı: V_sis ≤ (R_radar × 60) / T_stop_dk",
          description: "R_radar = kullanılan radar menzili (nm); T_stop = tam durdurma süresi (dk); geminin tam durdurma mesafesi radar menzilin yarısını geçmemeli kuralı pratikte kullanılır"
        }
      },
      {
        title: "Kural 19 ile Diğer Kurallar Arasındaki İlişki",
        content:
          "Kural 19(a) açıkça belirtir: bu kural görsel temas olmaksızın yaklaşan gemilere uygulanır ve 'birbirini gören gemilere yönelik' kuralların (Kural 12, 13, 14, 15, 16, 17) uygulanmasını geçersiz kılar. Bu, give-way/stand-on hiyerarşisinin kısıtlı görüşte çalışmadığı anlamına gelir. Karşı gemi ARPA'da görülse de COLREG anlamında 'görsel temas' yoksa Kural 19 uygulanır. Bununla birlikte, gemilerin göz görüşüne girmeye başladığı geçiş döneminde (hem radar hem de görsel temas) hangi kuralın uygulanacağına dair yorumlar tartışmalıdır; pratikte bu an için gemi durumunu log defterine kaydetmek, hukuki sorumlulukta önemli belge niteliği taşır.",
        bulletPoints: [
          "Kural 19 uygulanırken Kural 12–17 (give-way/stand-on kuralları) devre dışıdır",
          "Görsel temas başladığı anda Kural 19'dan çıkılır ve ilgili kural devreye girer",
          "Geçiş döneminde log defterine zaman, koşul ve uygulanan kural kaydedilmeli",
          "Kısıtlı görüşte çatışma davalarında ARPA kayıtları kritik kanıt niteliği taşır",
          "VDR (Voyage Data Recorder) kayıtları kaza sonrası soruşturmalarda Kural 19 uyumunu kanıtlar"
        ]
      }
    ],
    keyPoints: [
      "Kural 19, birbirini göremeyen gemilere uygulanır; give-way/stand-on ayrımını ortadan kaldırır.",
      "Güvenli hız radar menziline orantılı olmalı ve tam durdurma mesafesi içinde kalınmalıdır.",
      "Kural 19(d)(i): yalnızca radar izine dayanarak baş omuzdan gelen gemiye karşı iskeleye dönülmez.",
      "Sis prosedürleri: makine hazır, ses sinyalleri başlat, ek gözcü al, tüm fenerleri yak.",
      "ARPA CPA/TCPA analizi kısıtlı görüşte temel navigasyon aracıdır; seçici manevra prensibine uyulur.",
      "Görsel temas başlar başlamaz Kural 19'dan çıkılır ve ilgili COLREG kuralı devreye girer."
    ]
  },
  "Seyir fenerleri: yay ve menzil": {
    title: "Seyir Fenerleri: Yay ve Menzil (COLREG Kural 20-22)",
    introduction:
      "Seyir fenerleri, gece ve kısıtlı görüşte bir geminin tipini, durumunu ve hareket yönünü diğer gemilere bildiren temel görsel iletişim aracıdır. COLREG Kural 20, fenerlerin gün batımından gün doğumuna ve kısıtlı görüşte gösterilmesini zorunlu kılar. Kural 21 her fenerin renk ve ufuk üzerindeki görünürlük yayını (sektör), Kural 22 ise gemi boyuna göre asgari görünürlük menzilini tanımlar. Yay ve menzilleri doğru bilmek, karşılaşılan geminin aspektini (baş/kıç/borda) ve yol verme yükümlülüğünü gece doğru değerlendirmenin ön koşuludur.",
    sections: [
      {
        title: "Fener Yayları (Kural 21)",
        content:
          "Her seyir feneri, ufuk üzerinde belirli bir yay (sektör) boyunca kesintisiz ışık gösterecek şekilde yerleştirilir. Yan fenerlerin dış sınırı ile silyon fenerinin dış sınırı kemere hattının 22.5° kıçında birleşir; bu hattın gerisi yalnızca kıç fenerinin yayıdır. Yan + silyon (225°) ile kıç (135°) yaylarının toplamı 360°'yi tamamlar.",
        bulletPoints: [
          "Silyon (direk) feneri — beyaz, 225°: baş bodoslamadan her iki yanda kemerenin 22.5° kıçına kadar.",
          "Yan fenerler — sancak yeşil / iskele kırmızı, her biri 112.5°: baş bodoslamadan ilgili yanda kemerenin 22.5° kıçına kadar.",
          "Kıç feneri — beyaz, 135°: tam kıçtan her iki yanda 67.5°.",
          "Yedekleme (towing) feneri — sarı, 135°: kıç feneri ile aynı özelliklerde, onun üzerinde gösterilir.",
          "Her yönden görünür (all-round) fener — 360°: demir, NUC, RAM, CBD, balıkçı, kılavuz vb. işaretlerde kullanılır.",
          "Çakar (flashing) fener — 360°, dakikada 120 veya daha fazla düzenli çakış.",
        ],
      },
      {
        title: "Görünürlük Menzilleri (Kural 22)",
        content:
          "Asgari görünürlük menzili gemi boyuna göre belirlenir; fener şiddeti bu menzili sağlayacak şekilde hesaplanır (Ek I). 50 m ve üzeri gemilerde silyon feneri en uzaktan görülmesi gereken fenerdir (6 NM). Aşağıdaki değerler asgari (minimum) değerlerdir.",
        bulletPoints: [
          "≥ 50 m gemiler: silyon 6 NM, yan fenerler 3 NM, kıç 3 NM, yedekleme 3 NM, all-round 3 NM.",
          "12 m – 50 m gemiler: silyon 5 NM (boy < 20 m ise 3 NM), yan fenerler 2 NM, kıç 2 NM, yedekleme 2 NM, all-round 2 NM.",
          "< 12 m gemiler: silyon 2 NM, yan fenerler 1 NM, kıç 2 NM, yedekleme 2 NM, all-round 2 NM.",
          "Belirsiz, kısmen batık yedeklenen gemi/cisimler: beyaz all-round fener 3 NM.",
        ],
      },
      {
        title: "Tipik Fener Düzenleri (Kural 23-31)",
        content:
          "Fenerlerin renk, sayı ve düşey diziliş kombinasyonu geminin tipini ve durumunu belirtir. Aşağıda en sık karşılaşılan düzenler özetlenmiştir; 'kırmızı üstünde kırmızı' (NUC) gibi kalıplar ezberlenmelidir.",
        bulletPoints: [
          "Motorlu gemi yolda (Kural 23): silyon feneri/fenerleri (≥ 50 m'de önde-arkada iki silyon), yan fenerler ve kıç feneri.",
          "Demirde gemi (Kural 30): bir beyaz all-round (≥ 50 m'de önde yüksek, kıçta alçak iki adet); ≥ 100 m'de güverteler ayrıca aydınlatılır.",
          "Karaya oturmuş gemi (Kural 30): demir fenerleri + düşey iki kırmızı all-round.",
          "Kumanda altında değil (NUC, Kural 27): düşey iki kırmızı all-round; yol varsa ayrıca yan + kıç fenerleri.",
          "Manevra kabiliyeti kısıtlı (RAM, Kural 27): düşey kırmızı-beyaz-kırmızı all-round.",
          "Draftından kısıtlı (CBD, Kural 28): düşey üç kırmızı all-round (motorlu gemi fenerlerine ek).",
          "Balıkçı — trol (Kural 26): yeşil üstünde beyaz all-round; trol dışı balıkçı: kırmızı üstünde beyaz.",
          "Kılavuz gemisi (Kural 29): beyaz üstünde kırmızı all-round.",
          "Yelkenli (Kural 25): yan fenerler + kıç feneri; isteğe bağlı direk başında kırmızı üstünde yeşil.",
        ],
      },
    ],
    keyPoints: [
      "Yaylar: silyon 225°, yan fenerler 112.5° (her biri), kıç 135°, all-round 360° (Kural 21).",
      "Yan + silyon yayları kemerenin 22.5° kıçında biter; gerisi kıç feneri yayıdır.",
      "≥ 50 m'de silyon 6 NM, yan fenerler 3 NM, kıç 3 NM (Kural 22).",
      "Renk/diziliş kalıpları gemi tipini belirtir: NUC kırmızı-kırmızı, RAM kırmızı-beyaz-kırmızı, CBD üç kırmızı.",
    ]
  },
  "Gündüz işaretleri (top/koni/silindir)": {
    title: "Gündüz İşaretleri: Top, Koni, Silindir ve Baklava (COLREG Kural 24-30)",
    introduction:
      "Gündüz, fenerlerin yerine geminin durumunu bildiren siyah şekiller (gündüz işaretleri) gösterilir. COLREG Ek I/6, şekillerin siyah renkte ve asgari boyutlarda olmasını şart koşar (top çapı ≥ 0.6 m; şekiller arası düşey aralık ≥ 1.5 m). Dört temel şekil vardır: top (küre), koni (külah), silindir ve baklava (eşkenar dörtgen). Bu şekillerin sayısı ve düşey dizilişi, gece gösterilen fener kalıplarının gündüz karşılığıdır.",
    sections: [
      {
        title: "Temel Şekiller ve Anlamları",
        content:
          "Her şeklin tek başına veya kombinasyon hâlinde belirli bir anlamı vardır. Şekiller en iyi görülecek yerde, düşey hatta gösterilir.",
        bulletPoints: [
          "Top (küre): tek top = demirde gemi; düşey iki top = kumanda altında değil (NUC); düşey üç top = karaya oturmuş.",
          "Top-baklava-top (düşey): manevra kabiliyeti kısıtlı (RAM).",
          "Silindir: draftından kısıtlı gemi (CBD).",
          "Koni: yelkenle + makineyle giden gemide sivri ucu aşağı bakan koni; balıkçıda ucu yukarı koni (av takımı yönünü gösterir).",
          "Baklava (eşkenar dörtgen): boyu 200 m'yi aşan yedek dizisinde hem çeken hem çekilen gemide gösterilir.",
        ],
      },
      {
        title: "Kurallara Göre Gündüz İşaretleri",
        content:
          "Aşağıdaki eşleşmeler, ilgili COLREG kurallarındaki gündüz işaretlerini özetler. Gece fener kalıbı ile gündüz şekli birbirinin karşılığıdır (ör. NUC gece kırmızı-kırmızı, gündüz iki top).",
        bulletPoints: [
          "Kural 24 (yedekleme): yedek dizisinin boyu > 200 m ise hem çeken hem çekilen gemide bir baklava şekli.",
          "Kural 25 (yelkenli + makine): baş tarafta sivri ucu aşağı bakan bir koni — gemi hem yelken hem makineyle ilerliyor demektir.",
          "Kural 26 (balıkçı): düşey, uçları birbirine bakan iki koni (boyu < 20 m gemi bir sepet gösterebilir); av takımı yatayda 150 m'den fazla uzanıyorsa o yöne ucu yukarı bir koni.",
          "Kural 27 (NUC): düşey iki top; (RAM): düşey top-baklava-top; tarama/sualtı işinde engel olan tarafta iki top, geçilebilir tarafta iki baklava.",
          "Kural 28 (CBD): bir silindir.",
          "Kural 30 (demir): baş tarafta bir top; (karaya oturmuş): düşey üç top.",
          "Kural 27 (mayın tarama): biri direk başında, ikisi ön seren uçlarında olmak üzere üç top.",
        ],
      },
    ],
    keyPoints: [
      "Şekiller siyahtır; top çapı ≥ 0.6 m, düşey aralık ≥ 1.5 m (Ek I/6).",
      "Demir = 1 top, NUC = 2 top, karaya oturmuş = 3 top.",
      "RAM = top-baklava-top, CBD = silindir, motorsailer = ucu aşağı koni.",
      "Yedek > 200 m = baklava; balıkçı = uçları birbirine bakan iki koni.",
    ]
  },
  "Gerçek çatışma kazaları": {
    title: "Gerçek Çatışma Kazaları: Vaka İncelemeleri",
    introduction:
      "Deniz kazası soruşturmaları, COLREG kurallarının gerçek dünyada nasıl ihlal edildiğini, insan hatasının ve durumsal farkındalık kaybının felaketlere nasıl yol açtığını somut kanıtlarla ortaya koyar. IMO'nun MSC/Circ. kararları, ulusal kaza soruşturma raporları (MAIB, NTSB, EMSA, TSB) ve Lloyds List gibi yayınlarda belgelenen vakalar, denizcilik eğitiminin temel öğretim kaynaklarından biridir. Gerçek kazaları incelemek; teknik hata ile prosedürel hata arasındaki farkı, 'normalization of deviance' (sapmanın normalleşmesi) olgusunu ve savunma katmanlarının art arda nasıl çöktüğünü anlamayı sağlar. Denizcilik fakültesi öğrencileri bu vakaları yalnızca tarihsel bilgi olarak değil, kariyerleri boyunca benzer hataları öngörmek için bir zihinsel çerçeve olarak kullanmalıdır.",
    sections: [
      {
        title: "Vaka 1: MV Bright Field – Mississippi Nehri, 1996",
        content:
          "Panama bandıralı bulk carrier Bright Field, Mississippi Nehri'nde seyir ederken makine arızası yaşadı ve akıntının etkisiyle New Orleans rıhtımına çarptı; 116 kişi yaralandı. Soruşturma; makine bakımındaki sistemik yetersizlikleri, kaptan ile makine zabiti arasındaki iletişim eksikliğini ve acil durum tatbikatlarının yetersizliğini tespit etti. Bu vaka, 'kıyı seyri güvenlidir' varsayımının dar sularda ve akıntılı kanallarda nasıl yanlış olduğunu ve makine arızası senaryosu için köprüüstü-makine koordinasyon planlamasının kritikliğini gözler önüne serdi. ISM Kodu'nun zorunlu hale getirilmesinde bu türden vakalar belirleyici rol oynadı.",
        image: aisTargets,
        imageAlt: "Çatışma kazası analizi — vaka incelemeleri",
        bulletPoints: [
          "İhlal edilen kural: Kural 5 (gözcülük) ve Kural 6 (güvenli hız dar sularda)",
          "Temel neden: makine bakım yetersizliği + köprüüstü-makine iletişim kopukluğu",
          "Ders: dar su seyirlerinde makine her zaman hazır konumda (standby) olmalı",
          "ISM'deki acil durum prosedürleri gerçek tatbikatlarla desteklenmeli",
          "Normalization of deviance: kronik bakım eksikliğinin 'olağan' sayılması"
        ]
      },
      {
        title: "Vaka 2: MV Doña Paz – Tablas Boğazı, 1987",
        content:
          "Filipinler'de MT Vector ile çarpışan feribot Doña Paz, yaklaşık 4.000 can kaybıyla tarihin en büyük barış dönemi deniz felaketlerinden biri olarak kayıtlara geçti. Soruşturma, her iki gemide de yetersiz gözcülük, aşırı yolcu kapasitesi ve köprüüstü ekibinin uykuda ya da görev başında olmadığına dair kanıtlar ortaya koydu. Vector yakıt tankeri olmasına karşın hem seyir fenerleri çalışmıyordu hem de gözcülük yapılmıyordu. Bu vaka, Kural 5'in (etkin gözcülük) hayati önemini, SOLAS yaşam kurtarma ekipmanı gerekliliklerini ve gece seyiri öncesi köprüüstü hazırlığını dramatik biçimde örneklemektedir.",
        bulletPoints: [
          "İhlal edilen kural: Kural 5 (etkin gözcülük), Kural 20 (fenerlerin gösterilmesi)",
          "Temel neden: köprüüstü terk edilmesi, gözcülük yapılmaması, fenerler arızalı",
          "Ders: gece seyiri öncesinde tüm navigasyon fenerlerinin testi zorunludur",
          "SOLAS yaşam kurtarma ekipmanı taşıma kapasitesi gerçekçi şekilde belgelenmelidir",
          "İnsan hatası: 'routine becomes risky' — rutin seyirlerde dikkatsizlik artma eğilimi"
        ]
      },
      {
        title: "Vaka 3: MV MSC Napoli – İngiliz Kanalı, 2007",
        content:
          "Container gemisi MSC Napoli İngiliz Kanalı'nda sert hava koşullarıyla karşılaşarak ciddi yapısal hasar aldı ve kıyıya oturdu. Soruşturma, geminin yapısal bütünlüğünün zaten yetersiz olduğunu ve hava durumu değerlendirmesinin yetersiz kaldığını ortaya koydu. Bu vaka, passage planning'de meteorolojik değerlendirme sürecini, kötü hava senaryolarında hız azaltma kararını ve ISM kapsamındaki conditional assessment of structural integrity prosedürlerini yeniden gündeme taşıdı. Denizcilik fakültesi perspektifinden bakıldığında, passage plan appraisal aşamasında gemi yapısal limitlerini bilmek ve hava penceresini doğru değerlendirmek kritik dersler arasındadır.",
        bulletPoints: [
          "İhlal edilen prosedür: hava koşulları değerlendirmesinde yetersiz appraisal aşaması",
          "Yapısal sınırlar passage plan aşamasında göz önünde bulundurulmalı",
          "Kötü hava senaryosunda 'hava penceresi bekleme' kararı erken verilmeli",
          "ISM: yapısal muayene raporları köprüüstü bilgisi dahilinde olmalı",
          "Yük dağılımı ve trim, ağır hava dayanıklılığını doğrudan etkiler"
        ]
      },
      {
        title: "Çatışma Kazalarının Ortak Paydaları",
        content:
          "Düzinelerce deniz kazası soruşturma raporu incelendiğinde şu ortak faktörler öne çıkmaktadır: (1) Kural 5 ihlali — yetersiz veya dikkatssiz gözcülük; (2) geç ve yetersiz manevra — Kural 8'in erken ve belirgin manevra ilkesinin uygulanmaması; (3) VHF bağımlılığı — COLREG kuralları uygulanmadan önce VHF üzerinden anlaşmaya çalışılması; (4) otorite gradyanı — ast personelin uyarılarını bildirememesi; (5) aşırı güven — teknoloji (ARPA, AIS) insan gözcülüğünün yerini tutamaz. EMSA ve MAIB istatistikleri, tüm deniz kazalarının %80'inden fazlasında insan hatasının birincil veya katkıda bulunan faktör olduğunu tutarlı biçimde göstermektedir.",
        formula: {
          text: "Kaza Zinciri: Latent Failure → Active Failure → Savunma Katmanı Çöküşü → Kaza",
          description: "Reason'ın İsviçre Peyniri Modeli: her savunma katmanı (prosedür, ekipman, eğitim, denetim) deliklere sahiptir; delikler hizalandığında kaza meydana gelir"
        }
      }
    ],
    keyPoints: [
      "Gerçek kaza vakaları, COLREG ihlallerinin ve insan hatasının somut sonuçlarını göstererek en etkili öğretim aracıdır.",
      "En yaygın ihlal: Kural 5 (gözcülük eksikliği) + Kural 8 (geç ve yetersiz manevra).",
      "VHF bağımlılığı: kuralları uygulamadan önce VHF üzerinden anlaşmaya çalışmak riski artırır.",
      "Reason'ın İsviçre Peyniri Modeli: latent ve aktif hatalar art arda savunma katmanlarını delerek kazaya yol açar.",
      "Normalization of deviance: küçük prosedür ihlallerinin zamanla 'normal' sayılması sistemik riski gizler.",
      "EMSA/MAIB: tüm deniz kazalarının %80'inden fazlasında insan hatası birincil faktördür."
    ]
  },
  "Neden – sonuç – ihlal – önlem analizi": {
    title: "Neden – Sonuç – İhlal – Önlem Analizi",
    introduction:
      "Deniz kazası analizinde 'neden–sonuç–ihlal–önlem' çerçevesi, olayı yalnızca sonuçtan geriye doğru değil, kök nedenlerden ileriye doğru da izleyerek sistematik bir anlayış geliştirir. Bu yaklaşım, IMO'nun 'Casualties and incidents' raporlama çerçevesinden, MAIB (Marine Accident Investigation Branch) ve EMSA kaza inceleme metodolojilerinden türetilmektedir. Denizcilik eğitiminde bu çerçeveyi kavramak kritik önem taşır: hem sınav sorularında vaka analizleri bu yapıya göre sorulur hem de gerçek kariyer hayatında kaza raporlama (Near Miss, Non-Conformity, Incident Report) ISM Kodu kapsamında bu mantıkla yürütülür. Analiz, yalnızca 'ne oldu'yu değil, 'neden oldu, hangi kural ihlal edildi ve bir daha olmaması için ne yapılacak'ı da yanıtlar.",
    sections: [
      {
        title: "Neden (Root Cause) Analizi: Kök Neden Tespiti",
        content:
          "Kök neden analizi, yüzeysel hatanın (active failure) arkasındaki sistemik zayıflıkları (latent failure) ortaya çıkarmayı hedefler. '5 Neden Tekniği' (5 Whys), kök nedene ulaşmak için her bir hatanın nedenini beş katmana kadar sorgular. Örnek: Çatışma neden oldu? → Gemi rotayı değiştirmedi. Neden? → Gözcü uyarı vermedi. Neden? → Radarı izlemiyordu. Neden? → İş yükü aşırıydı. Neden? → Vardiya organizasyonu yetersizdi. Kök neden: vardiya planlaması ve köprüüstü organizasyonu. Bu teknik, tek bir kişiyi suçlamak yerine sistemin tasarımındaki boşlukları hedef alır — bu nedenle IMO'nun 'just culture' (adil kültür) anlayışıyla da uyumludur.",
        image: aisTargets,
        imageAlt: "Neden-sonuç-ihlal-önlem sistematik analiz çerçevesi",
        bulletPoints: [
          "5 Neden Tekniği: yüzey hatadan kök nedene kadar her katmanı sorgula",
          "Active failure: doğrudan hatayı yapan kişinin eylemi veya eylemsizliği",
          "Latent failure: sistemde gömülü, tetikleyici koşul gelene kadar görünmez zayıflık",
          "Kök neden genellikle yönetim, eğitim veya prosedür tasarımıyla ilgilidir",
          "Just culture: bireysel suçlama değil, sistem iyileştirmesi hedeflenir"
        ]
      },
      {
        title: "Sonuç Analizi: Hasar, Can Kaybı ve Operasyonel Etki",
        content:
          "Kaza sonuçları dört boyutta değerlendirilir: (1) insani boyut — yaralanma, ölüm, psikolojik etki; (2) çevresel boyut — yakıt dökülmesi, kirlilik, deniz ekosistemi hasarı; (3) maddi boyut — gemi hasarı, kargo kaybı, kurtarma masrafları; (4) operasyonel/hukuki boyut — geminin alıkonması, sigorta talepleri, cezai kovuşturma. Sonuç analizi aynı zamanda 'son savunma katmanı' kavramını değerlendirir: emniyet donanımı (EPIRB, yaşam kurtarma araçları, yangın bastırma) hasar sınırlamada ne kadar etkili oldu? Bu sorunun yanıtı, sonraki önlem planlamasını doğrudan şekillendirir.",
        bulletPoints: [
          "İnsani boyut: yaralanma/ölüm sayısı, psikolojik etki, mürettebat rehabilitasyonu",
          "Çevresel boyut: MARPOL kapsamı, temizleme yükümlülükleri, uzun vadeli ekosistem etkisi",
          "Maddi boyut: P&I kulübü bildirimi, H&M sigortası talebi, kurtarma sözleşmesi (LOF)",
          "Hukuki boyut: bayrağın soruşturması, liman devleti denetim kararları, cezai kovuşturma riski",
          "VDR kayıtları: sonuç değerlendirmesinde ve sorumluluk belirlenmesinde birincil kanıt"
        ]
      },
      {
        title: "İhlal Analizi: Hangi Kural, Prosedür veya Standart İhlal Edildi?",
        content:
          "İhlal analizi, kazaya katkıda bulunan her aktörün hangi yasal veya prosedürel yükümlülüğü yerine getirmediğini belirler. COLREG ihlalleri — Kural 5, 6, 7, 8, 13, 14, 15 veya 19 — en sık karşılaşılan kategorilerdir. SOLAS ihlalleri; yetersiz yaşam kurtarma ekipmanı, donanım bakım yetersizliği. STCW ihlalleri; niteliksiz personel, dinlenme süreleri ihlali. ISM ihlalleri; SMS prosedürlerine uyumsuzluk, risk değerlendirmesinin yapılmaması. İhlal analizi aynı zamanda 'contributing factors' (katkıda bulunan faktörler) kavramını kapsar: doğrudan ihlal eden kişinin ötesinde sistemi zayıflatan faktörler nelerdir?",
        formula: {
          text: "İhlal Kategorileri: COLREG Kural X + SOLAS Bölüm Y + STCW Kural Z + ISM Non-Conformity",
          description: "Her ihlal için: kural maddesi — yükümlülüğün içeriği — ihlal biçimi — katkıda bulunan faktörler; çoklu ihlal katmanları analiz edilir"
        }
      },
      {
        title: "Önlem Analizi: Koruyucu ve Düzeltici Tedbirler",
        content:
          "Önlem analizi iki katmanlıdır: (1) düzeltici önlemler — kazanın tekrar oluşmaması için mevcut sistemdeki boşlukları kapatan müdahaleler; (2) önleyici önlemler — benzer risklerin başka gemilerde de oluşmasını önlemek için sektör genelinde yayılan tedbirler. IMO'nun emniyet kültürüne katkısı bu ikinci katmanda yoğunlaşır: MSC Dairesellerle yayılan ders özeti (safety lessons learned), ISM ile şirket genelinde prosedür revizyonu ve STCW ile eğitim standartlarının güncellenmesi. Denizcilik eğitiminde önlem analizi pratiği; öğrencilerin 'bu senaryo bende yaşanırsa ne yapardım?' sorusunu yapılandırılmış biçimde yanıtlamasını sağlar.",
        bulletPoints: [
          "Düzeltici önlem: doğrudan kazadan kaynaklanan prosedür revizyonu, ekipman yenileme, eğitim",
          "Önleyici önlem: benzer riski taşıyan tüm gemiler için sektör genelinde yayılan güvenlik tedbirleri",
          "ISM Non-Conformity kapatma süreci: kök neden analizi → düzeltici eylem → doğrulama",
          "Near Miss raporlama kültürü: küçük olayların raporlanması büyük kazaları önler",
          "IMO MSC Dairesellerle yayılan 'lessons learned': sektörün ortak belleği olarak işlev görür"
        ]
      }
    ],
    keyPoints: [
      "Neden–sonuç–ihlal–önlem çerçevesi, kazayı kök nedenlerden sonuçlara ve tedbirlere kadar sistematik biçimde analiz eder.",
      "5 Neden Tekniği: her hatanın nedenini beş katmana kadar sorgulayarak sistemik zayıflıkları ortaya çıkarır.",
      "Active failure + Latent failure: doğrudan hatanın ardında daima sistemde gömülü organizasyonel zayıflıklar vardır.",
      "İhlal analizi; COLREG, SOLAS, STCW ve ISM katmanlarını birlikte değerlendirir.",
      "Önlem planlaması iki katmanlıdır: düzeltici (mevcut gemi) ve önleyici (sektör geneli).",
      "Near Miss raporlama ve ISM Non-Conformity kültürü, büyük kazaları erken sinyal aşamasında önlemenin temel aracıdır."
    ]
  },
  "Meteoroloji Bağlantılı Seyir": {
    title: "Meteoroloji Bağlantılı Seyir",
    introduction:
      "Meteoroloji bağlantılı seyir, rota planlamasında yalnızca mesafe ve zamanın değil; rüzgâr, dalga, akıntı, görüş ve barometrik değişimlerin birlikte değerlendirilmesini ifade eder. Amaç, emniyeti artırırken gemi ve yük üzerindeki zorlamayı azaltmaktır.",
    sections: [
      {
        title: "Planlama Aşamasında Meteorolojik Entegrasyon",
        content:
          "Sefer öncesinde pilot chart, grib verileri, sinoptik haritalar ve rota üzerindeki liman tahminleri birlikte incelenmelidir. Tek bir kaynağa bağlı kalmak yerine farklı kaynakların karşılaştırılması, yanlış tahmin riskini azaltır. Özellikle açık deniz geçişlerinde 24–72 saatlik trendin izlenmesi kritik önem taşır.",
        bulletPoints: [
          "Rota boyunca beklenen rüzgâr yönü ve şiddeti belirlenir",
          "Dalgaların periyot, yön ve yükseklik bilgisi değerlendirilir",
          "Basınç düşüşü ve cephe geçişi alarm kriteri olarak izlenir"
        ]
      },
      {
        title: "Seyir Sırasında Karar Noktaları",
        content:
          "Meteorolojik şartlar değiştikçe rota, hız ve vardiya organizasyonu dinamik biçimde güncellenmelidir. Baş omuzluktan gelen sert dalga koşullarında hız azaltma, rotayı birkaç derece kaydırma veya hava penceresi bekleme gibi seçenekler karşılaştırılır. Bu yaklaşım, slam ve yeşil su riskini düşürür.",
        bulletPoints: [
          "ETA baskısı emniyet kriterlerinin önüne geçmemelidir",
          "Kritik eşikler aşıldığında kaptan onayıyla yeni seyir planı uygulanır",
          "Köprüüstü-makine iletişimi hız/mani̇vra kararlarıyla senkron yürütülür"
        ]
      }
    ],
    keyPoints: [
      "Meteorolojik seyirde temel hedef emniyetli ve sürdürülebilir ilerlemedir.",
      "Rota optimizasyonu, yakıt ekonomisi kadar gemi zorlanmasını da dikkate almalıdır.",
      "Tahminler güncellenmedikçe plan geçerliliğini hızla kaybeder."
    ]
  },
};
