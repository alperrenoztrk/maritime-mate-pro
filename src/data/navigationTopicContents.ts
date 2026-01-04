// Navigation topic detailed content
// Import images
import earthShape1 from "@/assets/navigation/earth-shape-1.jpg";
import earthShape2 from "@/assets/navigation/earth-shape-2.jpg";
import earthOblate from "@/assets/navigation/earth-oblate.jpg";
import earthRotation from "@/assets/navigation/earth-rotation.jpg";
import earthTilt from "@/assets/navigation/earth-tilt.jpg";
import earthSeasons from "@/assets/navigation/earth-seasons.jpg";
import earthTimezone1 from "@/assets/navigation/earth-timezone-1.png";
import earthTimezone2 from "@/assets/navigation/earth-timezone-2.png";

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
  }
};
