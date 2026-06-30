import type { CSSProperties } from "react";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { calculationCategories } from "@/data/calculationCenterConfig";
import { getTopicContentTitlesByCategory } from "@/data/topicContents";
import { GraduationCap, BookOpen, FileText, Lightbulb, ChevronRight, ChevronDown } from "lucide-react";

interface SubTopic {
  title: string;
  hasContent?: boolean;
}

interface TopicContent {
  title: string;
  description: string;
  keyTopics: { title: string; description: string; subTopics?: SubTopic[] }[];
  resources: { title: string; href: string }[];
  contentStandards?: {
    minPagesPerTopic: number;
    imageFormat: string;
  };
}

const topicsData: Record<string, TopicContent> = {
  stability: {
    title: "Stabilite Konu Anlatımı",
    description: "Gemi stabilitesinin temel prensipleri, hesaplama yöntemleri ve IMO kriterleri hakkında kapsamlı bilgi.",
    keyTopics: [
      { title: "Metacentric Height (GM)", description: "Başlangıç stabilitesinin temel ölçüsü ve hesaplama yöntemleri" },
      { title: "GZ Eğrisi", description: "Dinamik stabilite analizi ve kritik açılar" },
      { title: "Free Surface Effect", description: "Tankların stabiliteye etkisi ve düzeltme hesapları" },
      { title: "IMO Kriterleri", description: "Uluslararası stabilite standartları ve gereklilikleri" },
      { title: "Ağırlık Kaydırma", description: "Yük ve balast operasyonlarının stabilite hesapları" },
      { title: "Grain Stability", description: "Tahıl yükünün özel stabilite gereksinimleri" }
    ],
    resources: [
      { title: "Stabilite Hesaplamaları", href: "/stability/calculations" },
      { title: "Stabilite Formülleri", href: "/stability/formulas" },
      { title: "IMO Kuralları", href: "/stability/rules" }
    ]
  },
  navigation: {
    title: "Seyir Konu Anlatımı",
    description: "Deniz seyir teknikleri, klasik ve modern navigasyon sistemleri hakkında kapsamlı eğitim içeriği.",
    keyTopics: [
      {
        title: "Seyrin Temelleri",
        description: "Dünya geometrisi, koordinat sistemleri ve temel seyir kavramları",
        subTopics: [
          { title: "Dünya'nın şekli ve hareketleri", hasContent: true },
          { title: "Coğrafi koordinat sistemi", hasContent: true },
          { title: "Enlem", hasContent: true },
          { title: "Boylam", hasContent: true },
          { title: "Yön kavramları", hasContent: true },
          { title: "Hakiki kuzey (True)", hasContent: true },
          { title: "Manyetik kuzey", hasContent: true },
          { title: "Dead Reckoning and Estimated Position (DR & EP)", hasContent: true },
          { title: "Rota hız ve mesafe ilişkisi", hasContent: true },
          { title: "Zaman – mesafe – hız bağıntısı", hasContent: true }
        ]
      },
      {
        title: "Harita Bilgisi ve Harita Kullanımı",
        description: "Deniz haritalarının yapısı, projeksiyon sistemleri ve pratik kullanımı",
        subTopics: [
          { title: "Deniz haritasının yapısı", hasContent: true },
          { title: "Harita ölçeği", hasContent: true },
          { title: "Mercator projeksiyonu", hasContent: true },
          { title: "Harita datum", hasContent: true },
          { title: "Harita sembolleri ve kısaltmalar", hasContent: true },
          { title: "Mesafe ölçümü", hasContent: true },
          { title: "Rota ölçümü", hasContent: true },
          { title: "Mevki koyma", hasContent: true },
          { title: "Harita düzeltmeleri (Notice to Mariners)", hasContent: true }
        ]
      },
      {
        title: "Düzlem Seyir (Plane Sailing)",
        description: "Kısa mesafeler için düzlem geometri varsayımına dayalı seyir hesapları",
        subTopics: [
          { title: "Düzlem seyir varsayımı", hasContent: true },
          { title: "DLat (Enlem değişimi)", hasContent: true },
          { title: "Departure (Doğu–batı mesafesi)", hasContent: true },
          { title: "Kurs – mesafe hesapları", hasContent: true },
          { title: "Enlem ve boylam değişimi", hasContent: true },
          { title: "Akıntısız seyir hesapları", hasContent: true },
          { title: "Running fix (klasik)", hasContent: true }
        ]
      },
      {
        title: "Orta Enlem Seyri (Middle Latitude)",
        description: "Orta mesafeler için enlem ortalamasına dayalı seyir hesapları",
        subTopics: [
          { title: "Mean Latitude Sailing", hasContent: true },
          { title: "Course and Distance Given Mean Latitude", hasContent: true },
          { title: "Course and Distance Between Two Positions (Mean Latitude)", hasContent: true },
          { title: "Direct Problem of Mean Latitude Sailing", hasContent: true },
          { title: "Inverse Problem of Mean Latitude Sailing", hasContent: true },
          { title: "Validity and Limitations of Mean Latitude Sailing", hasContent: true },
          { title: "Limitations and Applicability of Mean Latitude Sailing", hasContent: true },
          { title: "Düzlem seyirin sınırları", hasContent: true },
          { title: "Ortalama enlem kavramı", hasContent: true },
          { title: "Departure – boylam ilişkisi", hasContent: true },
          { title: "Orta Enlemde Seyir Hesaplamaları", hasContent: true },
          { title: "Boylam değişimi hesapları", hasContent: true },
          { title: "İşaret Değişimi (Sign Change)", hasContent: true },
          { title: "Sayısal orta enlem seyri uygulamaları", hasContent: true }
        ]
      },
      {
        title: "Akıntı ve Rüzgâr Hesapları",
        description: "Akıntı ve rüzgâr etkilerinin seyir üzerindeki hesaplamaları",
        subTopics: [
          { title: "Set ve drift", hasContent: true },
          { title: "Akıntı vektörleri", hasContent: true },
          { title: "Heading – COG ilişkisi", hasContent: true },
          { title: "STW – SOG ilişkisi", hasContent: true },
          { title: "Akıntılı seyir hesapları", hasContent: true },
          { title: "Vektör üçgenleri", hasContent: true },
          { title: "Course to Steer (CTS) with Current", hasContent: true }
        ]
      },
      {
        title: "Klasik (Terrestrial) Seyir",
        description: "Kerteriz, transit ve kıyı seyir teknikleri",
        subTopics: [
          { title: "Kerteriz türleri", hasContent: true },
          { title: "Kerterizle mevki tayini", hasContent: true },
          { title: "Mesafe + kerteriz fix", hasContent: true },
          { title: "Fix by Cross Bearings (Kerterizlerle Mevki Tayini)", hasContent: true },
          { title: "Fix by Cross Bearings (Kesişen Kerterizlerle Mevki Tayini)", hasContent: true },
          { title: "Running Fix (Zamana Bağlı Kerterizle Mevki Tayini)", hasContent: true },
          { title: "Running Fix (Koşmalı Mevki Tayini)", hasContent: true },
          { title: "Running Fix (Running Bearings)", hasContent: true },
          { title: "Transit (Leading Line)", hasContent: true },
          { title: "Clearing Line (Emniyet Hattı)", hasContent: true },
          { title: "Distance Off by Vertical Angle", hasContent: true },
          { title: "Distance Off by Horizontal Angle", hasContent: true },
          { title: "Fix by Horizontal Angles", hasContent: true },
          { title: "Running fix (klasik)", hasContent: true },
          { title: "Paralel indeks", hasContent: true },
          { title: "Kıyı seyri teknikleri", hasContent: true },
          { title: "Demirleme ve demir tarama hesapları", hasContent: true }
        ]
      },
      {
        title: "Büyük Daire ve Rhumb Line Seyri",
        description: "Uzun mesafe okyanus seyri için büyük daire ve loxodrom rotaları",
        subTopics: [
          { title: "Büyük daire kavramı", hasContent: true },
          { title: "Büyük daire geometrisi", hasContent: true },
          { title: "Büyük daire mesafesi", hasContent: true },
          { title: "Büyük daire başlangıç kursu", hasContent: true },
          { title: "Büyük Daire Vertex (En Yüksek Enlem) Hesaplamaları", hasContent: true },
          { title: "Rhumb line (loxodrom)", hasContent: true },
          { title: "Mercator – rhumb line ilişkisi", hasContent: true },
          { title: "Composite (bileşik) rota", hasContent: true },
          { title: "Uzun okyanus seyri uygulamaları", hasContent: true }
        ]
      },
      {
        title: "Göksel Seyir (Celestial Navigation)",
        description: "Güneş, yıldızlar ve gezegenler kullanılarak mevki tayini",
        subTopics: [
          { title: "Göksel küre", hasContent: true },
          { title: "Zaman – açı ilişkisi", hasContent: true },
          { title: "Sextant kullanımı", hasContent: true },
          { title: "Yükseklik düzeltmeleri", hasContent: true },
          { title: "Ho – Hc kavramı", hasContent: true },
          { title: "Intercept yöntemi", hasContent: true },
          { title: "Azimut hesapları", hasContent: true },
          { title: "LOP çizimi", hasContent: true },
          { title: "2 LOP ve 3 LOP fix", hasContent: true },
          { title: "Öğle mevkii (enlem)", hasContent: true },
          { title: "Zamanla boylam", hasContent: true },
          { title: "Running fix (göksel)", hasContent: true },
          { title: "Göksel seyir hata analizi", hasContent: true }
        ]
      },
      {
        title: "Elektronik Seyir",
        description: "GPS, Radar ve ECDIS sistemleri ile modern navigasyon",
        subTopics: [
          { title: "GPS prensibi", hasContent: true },
          { title: "Trilaterasyon", hasContent: true },
          { title: "GPS doğruluğu", hasContent: true },
          { title: "GPS sınırlamaları ve operasyonel riskler", hasContent: true },
          { title: "HDOP", hasContent: true },
          { title: "PDOP", hasContent: true },
          { title: "Radar prensibi", hasContent: true },
          { title: "Radar ile mevki tayini", hasContent: true },
          { title: "Paralel indeks (radar)", hasContent: true },
          { title: "ECDIS", hasContent: true },
          { title: "Rota planlama", hasContent: true },
          { title: "XTE", hasContent: true },
          { title: "ETA", hasContent: true },
          { title: "Turn radius", hasContent: true },
          { title: "Elektronik seyirde çapraz kontrol", hasContent: true },
          { title: "GPS’in seyirde kullanımı ve sensör entegrasyonu", hasContent: true },
          { title: "Cayro pusula ve hataları", hasContent: true },
          { title: "SOLAS V seyir cihazı taşıma gereklilikleri", hasContent: true },
          { title: "Manyetik pusula deviasyonu ve tashihi", hasContent: true },
          { title: "Echo sounder (iskandil)", hasContent: true },
          { title: "Hız parakete (speed log) tipleri", hasContent: true },
          { title: "AIS - Otomatik Tanımlama Sistemi", hasContent: true }
        ]
      },
      {
        title: "Tides & Tidal Navigation",
        description: "Gelgit hesapları ve gel-git akıntıları",
        subTopics: [
          { title: "Gelgitin fiziksel mantığı", hasContent: true },
          { title: "Spring tide – Neap tide", hasContent: true },
          { title: "Chart datum (LAT)", hasContent: true },
          { title: "Tidal table okuma", hasContent: true },
          { title: "Height of tide hesapları", hasContent: true },
          { title: "12’ler kuralı", hasContent: true },
          { title: "İnterpolasyon", hasContent: true },
          { title: "Tidal stream", hasContent: true },
          { title: "Set – drift", hasContent: true },
          { title: "UKC + gelgit hesapları", hasContent: true },
          { title: "Tidal window (liman giriş zamanı)", hasContent: true }
        ]
      },
      {
        title: "Meteoroloji Bağlantılı Seyir",
        description: "Rüzgâr, dalga ve hava koşullarının seyire etkisi",
        subTopics: [
          { title: "Rüzgârın gemiye etkisi", hasContent: true },
          { title: "Leeway", hasContent: true },
          { title: "Leeway kavramı", hasContent: true },
          { title: "Leeway hesapları", hasContent: true },
          { title: "Rüzgâr + akıntı + gemi hareketi", hasContent: true },
          { title: "Dalga etkileri", hasContent: true },
          { title: "Heavy weather navigation", hasContent: true },
          { title: "Fırtınada rota ve hız kararı", hasContent: true },
          { title: "Buz ve kutup bölgesi seyri (Polar Code)", hasContent: true }
        ]
      },
      {
        title: "Passage Planning & Seyir Emniyeti",
        description: "IMO standartlarına uygun seyir planlaması ve köprüüstü yönetimi",
        subTopics: [
          { title: "IMO A.893(21)", hasContent: true },
          { title: "Appraisal", hasContent: true },
          { title: "Planning", hasContent: true },
          { title: "Execution", hasContent: true },
          { title: "Monitoring", hasContent: true },
          { title: "UKC ve squat", hasContent: true },
          { title: "Bridge Resource Management (BRM)", hasContent: true },
          { title: "PSC bakış açısı", hasContent: true }
        ]
      },
      {
        title: "COLREG & Çatışma Analizleri",
        description: "Denizde çatışmadan kaçınma kuralları ve kaza analizleri",
        subTopics: [
          { title: "COLREG temel prensipleri", hasContent: true },
          { title: "Emniyetli hız (Kural 6)", hasContent: true },
          { title: "Çatışmadan kaçınma manevrası (Kural 8)", hasContent: true },
          { title: "Crossing", hasContent: true },
          { title: "Head-on", hasContent: true },
          { title: "Overtaking", hasContent: true },
          { title: "Restricted visibility", hasContent: true },
          { title: "Dar kanallar ve trafik ayırım düzenleri (Kural 9-10)", hasContent: true },
          { title: "Seyir fenerleri: yay ve menzil", hasContent: true },
          { title: "Gündüz işaretleri (top/koni/silindir)", hasContent: true },
          { title: "Ses ve işaret kuralları (Kural 32-37)", hasContent: true },
          { title: "Gerçek çatışma kazaları", hasContent: true },
          { title: "Neden – sonuç – ihlal – önlem analizi", hasContent: true }
        ]
      }
    ],
    resources: [
      { title: "Seyir Hesaplamaları", href: "/navigation" },
      { title: "Seyir Formülleri", href: "/navigation/formulas" },
      { title: "COLREG Kuralları", href: "/navigation/rules" }
    ]
  },
  cargo: {
    title: "Yük Elleçleme Konu Anlatımı",
    description: "Yük operasyonları, draft survey hesapları ve güvenli istifleme teknikleri.",
    keyTopics: [
      { title: "Draft Survey", description: "Yük miktarı hesaplama yöntemleri" },
      { title: "Trim ve List", description: "Gemi durumunun yük dağılımına etkisi" },
      { title: "Lashing ve Securing", description: "Yük bağlama ve sabitleme teknikleri" },
      { title: "IMSBC Code", description: "Dökme yük taşıma kuralları" },
      { title: "Container Stowage", description: "Konteyner istiflemesi ve ağırlık dağılımı" },
      { title: "Grain Loading", description: "Tahıl yükleme özel prosedürleri" }
    ],
    resources: [
      { title: "Yük Hesaplamaları", href: "/cargo/calculations" },
      { title: "Draft Survey Formülleri", href: "/cargo/formulas" },
      { title: "Yük Kuralları", href: "/cargo/rules" }
    ]
  },
  meteorology: {
    title: "Meteoroloji Konu Anlatımı",
    description: "Deniz meteorolojisi, hava tahminleri ve fırtına kaçınma stratejileri.",
    keyTopics: [
      {
        title: "Atmosfer Sistemleri",
        description: "Basınç sistemleri ve hava kütleleri",
        subTopics: [
          { title: "Basınç merkezleri (alçak/yüksek)", hasContent: true },
          { title: "İzobar yapısı ve gradyan", hasContent: true },
          { title: "Hava kütleleri ve kaynak bölgeler", hasContent: true },
          { title: "Cephe tipleri ve geçiş etkileri", hasContent: true }
        ]
      },
      {
        title: "Rüzgar ve Dalga",
        description: "Beaufort skalası ve dalga tahminleri",
        subTopics: [
          { title: "Gerçek rüzgar ve görünen rüzgar", hasContent: true },
          { title: "Beaufort skalası uygulamaları", hasContent: true },
          { title: "Dalga yüksekliği ve periyot", hasContent: true },
          { title: "Swell ve wind sea ayrımı", hasContent: true }
        ]
      },
      {
        title: "Tropikal Siklonlar",
        description: "Kasırga ve tayfun navigasyonu",
        subTopics: [
          { title: "Siklon yapısı ve gelişim evreleri", hasContent: true },
          { title: "Tehlikeli/seyir yapılabilir yarım daire", hasContent: true },
          { title: "Barometre ve rüzgarla konum tayini", hasContent: true },
          { title: "Kaçınma manevrası prensipleri", hasContent: true }
        ]
      },
      {
        title: "Sis ve Görüş",
        description: "Kısıtlı görüş koşulları ve tedbirler",
        subTopics: [
          { title: "Sis oluşum türleri", hasContent: true },
          { title: "Görüş sınıflandırması", hasContent: true },
          { title: "Kısıtlı görüşte seyir kuralları", hasContent: true },
          { title: "Radar ve ses işaretleri", hasContent: true }
        ]
      },
      {
        title: "Okyanus Akıntıları",
        description: "Akıntı sistemleri ve rota etkisi",
        subTopics: [
          { title: "Küresel akıntı sistemleri", hasContent: true },
          { title: "Set ve drift değerlendirmesi", hasContent: true },
          { title: "Akıntının ETA ve yakıta etkisi", hasContent: true },
          { title: "Mevsimsel akıntı değişimleri", hasContent: true }
        ]
      },
      {
        title: "Hava Haritaları",
        description: "Synoptik harita okuma ve yorumlama",
        subTopics: [
          { title: "Synoptik harita sembolleri", hasContent: true },
          { title: "Cephe analizi ve hareket tahmini", hasContent: true },
          { title: "Rüzgar/deniz tahmini çıkarımı", hasContent: true },
          { title: "Rota üzerinde risk işaretleme", hasContent: true },
          { title: "SOLAS V tehlike mesajları ve hava raporlama", hasContent: true }
        ]
      }
    ],
    resources: [
      { title: "Meteoroloji Konu Anlatımı", href: "/meteorology/topics" },
      { title: "Meteoroloji Formülleri", href: "/meteorology/formulas" },
      { title: "Meteoroloji Kuralları", href: "/meteorology/rules" }
    ]
  },
  communication: {
    title: "Denizde Haberleşme Konu Anlatımı",
    description: "GMDSS, VHF/DSC, NAVTEX ve acil durum mesajlaşma prosedürleri ile denizde profesyonel haberleşme disiplini.",
    keyTopics: [
      {
        title: "GMDSS Altyapısı",
        description: "Deniz alanları, zorunlu ekipman ve operasyonel uygunluk",
        subTopics: [
          { title: "GMDSS Mimarisi ve Deniz Alanları", hasContent: true },
          { title: "VHF-DSC Operasyonları", hasContent: true },
          { title: "Tehlike, Aciliyet ve Emniyet Haberleşmesi", hasContent: true },
          { title: "NAVTEX, SafetyNET ve MSI", hasContent: true },
          { title: "EPIRB, SART ve Arama Kurtarma Entegrasyonu", hasContent: true },
          { title: "SMCP - Standart Deniz Haberleşme İfadeleri", hasContent: true }
        ]
      },
      {
        title: "Operasyonel Haberleşme ve İşaretleşme",
        description: "Telsiz konuşma disiplini, nöbet, uydu sistemleri, görsel işaretler ve mevzuat",
        subTopics: [
          { title: "Fonetik Alfabe ve Telsiz Konuşma Disiplini", hasContent: true },
          { title: "Telsiz Nöbeti ve Radyo Log Defteri", hasContent: true },
          { title: "Inmarsat ve Uydu Haberleşme Sistemleri", hasContent: true },
          { title: "MF/HF Telsiz ve Dalga Yayılımı", hasContent: true },
          { title: "AIS — Otomatik Tanımlama Sistemi", hasContent: true },
          { title: "VTS ve Gemi Raporlama Sistemleri", hasContent: true },
          { title: "Gemi İçi Haberleşme Sistemleri", hasContent: true },
          { title: "Arama-Kurtarma Haberleşmesi ve Olay Yeri Koordinasyonu", hasContent: true },
          { title: "Görsel İşaretleşme: Bayraklar ve Mors Lambası", hasContent: true },
          { title: "Telsiz Mevzuatı ve Operatör Lisansları", hasContent: true }
        ]
      },
      {
        title: "Uydu Tespit, Güvenlik ve İzleme Sistemleri",
        description: "Cospas-Sarsat/MEOSAR uydu tespiti, SSAS güvenlik alarmı ve LRIT uzaktan izleme",
        subTopics: [
          { title: "Cospas-Sarsat ve MEOSAR Uydu Tespit Sistemi", hasContent: true },
          { title: "SSAS - Gemi Güvenlik Alarm Sistemi", hasContent: true },
          { title: "LRIT - Uzun Menzilli Tanımlama ve İzleme", hasContent: true }
        ]
      },
      {
        title: "Ekipman Altyapısı ve Sistemin Geleceği",
        description: "Telsiz anten/güç sistemleri ile GMDSS modernizasyonu ve e-navigasyon",
        subTopics: [
          { title: "Telsiz Anten Sistemleri ve Acil Güç Kaynakları", hasContent: true },
          { title: "GMDSS Modernizasyonu ve E-Navigasyon", hasContent: true }
        ]
      }
    ],
    resources: [
      { title: "Haberleşme Hesaplamaları", href: "/calculations/communication/calculations" },
      { title: "Haberleşme Formülleri", href: "/calculations/communication/formulas" },
      { title: "Haberleşme Kuralları", href: "/calculations/communication/rules" }
    ]
  },
  seamanship: {
    title: "Gemicilik Konu Anlatımı",
    description: "Temel gemicilik becerileri, manevra teknikleri ve güverte operasyonları.",
    keyTopics: [
      { title: "Düğümler ve Bağlar", description: "Temel denizci düğümleri ve kullanım alanları" },
      { title: "Demirleme", description: "Demir atma ve alma prosedürleri" },
      { title: "Palamar Operasyonları", description: "Bağlama halatları ve güvenlik" },
      { title: "Römorkaj", description: "Römorkör operasyonları ve hesapları" },
      { title: "Manevra", description: "Gemi manevra karakteristikleri" },
      { title: "Vardiya Tutma", description: "Köprüüstü vardiya prosedürleri" }
    ],
    resources: [
      { title: "Gemicilik Hesaplamaları", href: "/seamanship/calculations" },
      { title: "Gemicilik Formülleri", href: "/seamanship/formulas" },
      { title: "Gemicilik Kuralları", href: "/seamanship/rules" }
    ]
  },
  safety: {
    title: "Denizde Güvenlik Konu Anlatımı",
    description: "Denizde can ve mal güvenliği, acil durum prosedürleri ve emniyet ekipmanları.",
    keyTopics: [
      { title: "SOLAS Gereklilikleri", description: "Denizde can güvenliği sözleşmesi" },
      { title: "Yangın Güvenliği", description: "Yangın önleme, tespit ve söndürme" },
      { title: "Can Kurtarma", description: "LSA ekipmanları ve kullanımı" },
      { title: "Terk Gemi", description: "Gemiyi terk prosedürleri" },
      { title: "İlk Yardım", description: "Denizde tıbbi müdahale" },
      { title: "SAR Operasyonları", description: "Arama kurtarma prosedürleri" }
    ],
    resources: [
      { title: "Güvenlik Hesaplamaları", href: "/safety" },
      { title: "Güvenlik Formülleri", href: "/safety/formulas" },
      { title: "Güvenlik Kuralları", href: "/safety/rules" }
    ]
  },
  machine: {
    title: "Gemi Makineleri Konu Anlatımı",
    description: "Gemi makine sistemleri, bakım prosedürleri ve performans optimizasyonu.",
    keyTopics: [
      {
        title: "Termodinamik ve Isı Tekniği",
        description: "Isı, iş ve enerji kavramları; enerji dönüşümleri; termodinamik çevrimler; verim hesapları; ısı kayıpları."
      },
      {
        title: "Akışkanlar Mekaniği",
        description: "Basınç, debi ve akış türleri; pompa karakteristikleri; boru kayıpları; valfler ve fittingler."
      },
      {
        title: "Makine Elemanları ve Malzeme Bilgisi",
        description: "Miller, yataklar ve kaplinler; titreşim ve balans; malzeme özellikleri; korozyon ve korunma."
      },
      {
        title: "Deniz Dizel Makineleri",
        description: "İki/dört zamanlı makineler; silindir, piston, biyel ve krank; yanma süreci; enjeksiyon; supap zamanlaması; performans parametreleri; tipik arızalar."
      },
      {
        title: "Gemi Makine Sistemleri",
        description: "Yakıt, yağlama, soğutma, hava/egzoz ve buhar sistemleri; sistemler arası etkileşim."
      },
      {
        title: "Yardımcı Makineler",
        description: "Jeneratörler, kazanlar, separatörler, tatlı su jeneratörleri, hava kompresörleri ve pompa türleri."
      },
      {
        title: "Yakıt Teknolojisi ve Yönetimi",
        description: "HFO, MGO, LNG; yakıt arıtma; viskozite kontrolü; yakıt kaynaklı arızalar."
      },
      {
        title: "Soğutma ve Klima Sistemleri",
        description: "Soğutma çevrimi; soğutucu akışkanlar; provision soğutma; reefer ve klima sistemleri."
      },
      {
        title: "Gemi Elektrik Sistemleri",
        description: "AC/DC sistemler, alternatörler, ana ve acil dağıtım panoları, koruma sistemleri, black-out nedenleri."
      },
      {
        title: "Elektronik, Ölçme ve Otomasyon",
        description: "Alarm/izleme sistemleri, sensörler, transmitterler, PLC temelleri ve uzaktan izleme."
      },
      {
        title: "Makine Dairesi Operasyonları",
        description: "Makine vardiyası, seyir öncesi kontroller, seyir izleme, liman operasyonları, devreye alma/durdurma prosedürleri."
      },
      {
        title: "Bakım ve Tutum",
        description: "Planlı bakım sistemleri, önleyici bakım, arıza bakımı, yağ analizleri, klas ve bayrak gereklilikleri."
      },
      {
        title: "Makine Dairesi Güvenliği",
        description: "Makine dairesi yangınları, yangın söndürme sistemleri, patlama riskleri, acil durdurma sistemleri, makine kazaları."
      },
      {
        title: "Çevre ve MARPOL – Makine",
        description: "Sintine sistemleri, atık yağ ve sludge, sewage sistemleri ve emisyonlar."
      },
      {
        title: "Engine Resource Management",
        description: "Vardiya yönetimi, insan faktörü ve risk değerlendirme."
      },
      {
        title: "Enerji Verimliliği",
        description: "EEDI, EEXI, SEEMP, yakıt optimizasyonu ve atık ısı geri kazanımı."
      }
    ],
    resources: [
      { title: "Makine Hesaplamaları", href: "/machine/calculations" },
      { title: "Makine Formülleri", href: "/machine/formulas" },
      { title: "Makine Kuralları", href: "/machine/rules" }
    ]
  },
  environment: {
    title: "Çevre Koruma Konu Anlatımı",
    description: "Deniz çevresi koruma, emisyon kontrolü ve sürdürülebilir denizcilik.",
    keyTopics: [
      { title: "MARPOL Ekleri", description: "Uluslararası deniz kirliliği önleme" },
      { title: "Emisyon Kontrolü", description: "SOx, NOx ve CO2 düzenlemeleri" },
      { title: "Balast Yönetimi", description: "BWM Convention gereklilikleri" },
      { title: "Atık Yönetimi", description: "Gemi atıklarının bertarafı" },
      { title: "EEXI ve CII", description: "Enerji verimliliği göstergeleri" },
      { title: "Yeşil Denizcilik", description: "Sürdürülebilirlik stratejileri" }
    ],
    resources: [
      { title: "Çevre Hesaplamaları", href: "/environment/calculations" },
      { title: "Çevre Formülleri", href: "/environment/formulas" },
      { title: "Çevre Kuralları", href: "/environment/rules" }
    ]
  },
  economics: {
    title: "Deniz İşletmeciliği Konu Anlatımı",
    description: "Deniz ticareti, charter operasyonları ve ticari hesaplamalar.",
    keyTopics: [
      { title: "Charter Parties", description: "Voyage, time ve bareboat charter" },
      { title: "Navlun Hesapları", description: "Freight rate ve TCE hesaplamaları" },
      { title: "Laytime", description: "Yükleme/boşaltma süresi hesapları" },
      { title: "Demurrage", description: "Gecikme tazminatı hesaplamaları" },
      { title: "Voyage Estimation", description: "Sefer karlılık analizi" },
      { title: "Bunker Yönetimi", description: "Yakıt maliyeti optimizasyonu" }
    ],
    resources: [
      { title: "Ekonomi Hesaplamaları", href: "/economics" },
      { title: "Ekonomi Formülleri", href: "/economics/formulas" },
      { title: "Ekonomi Kuralları", href: "/economics/rules" }
    ]
  }
};

export default function LessonTopicsPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = calculationCategories.find(c => c.id === categoryId);
  const topicContent = categoryId ? topicsData[categoryId] : null;
  const [expandedTopics, setExpandedTopics] = useState<number[]>([]);
  const isNavigation = categoryId === "navigation";
  const contentTitles = getTopicContentTitlesByCategory(categoryId);
  const hasDerivedContent = contentTitles.size > 0;

  const toggleTopic = (index: number) => {
    setExpandedTopics(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };

  const buildSubTopicLink = (subTopicTitle: string) =>
    categoryId ? `/lessons/${categoryId}/topics/${encodeURIComponent(subTopicTitle)}` : "#";

  const highRefreshRateStyles: CSSProperties = {
    ["--frame-rate" as string]: "120",
    ["--animation-duration" as string]: "8.33ms",
    ["--transition-duration" as string]: "16.67ms",
  };

  const missingNavigationTopics = isNavigation && topicContent && hasDerivedContent
    ? topicContent.keyTopics
        .map(topic => ({
          title: topic.title,
          missing: (topic.subTopics ?? []).filter(sub => !contentTitles.has(sub.title))
        }))
        .filter(item => item.missing.length > 0)
    : [];
  const missingNavigationCount = missingNavigationTopics.reduce((total, item) => total + item.missing.length, 0);
  if (!category || !topicContent) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Kategori bulunamadı</p>
      </div>
    );
  }

  const CategoryIcon = category.icon;

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 px-4 py-8 dark:from-[hsl(220,50%,6%)] dark:via-[hsl(220,50%,8%)] dark:to-[hsl(220,50%,10%)]"
      data-no-translate
      style={highRefreshRateStyles}
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/4 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute top-10 right-10 h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col gap-6">
        {/* Header */}
        <header className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground backdrop-blur">
            <GraduationCap className="h-4 w-4" />
            Konu Anlatımı
          </div>
          
          <div className="flex items-center justify-center gap-3">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${category.accent} text-white shadow-lg`}>
              <CategoryIcon className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">{topicContent.title}</h1>
          </div>
          
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground">
            {topicContent.description}
          </p>
        </header>

        {/* Key Topics */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Ana Konular</h2>
            {topicContent.keyTopics.some(t => t.subTopics && t.subTopics.length > 0) && (
              <span className="ml-auto text-xs text-muted-foreground">
                {topicContent.keyTopics.length} başlık
              </span>
            )}
          </div>
          
          {/* Check if has subTopics - use different layout */}
          {topicContent.keyTopics.some(t => t.subTopics && t.subTopics.length > 0) ? (
            <div className="flex flex-col gap-3">
          {topicContent.keyTopics.map((topic, index) => {
                const isExpanded = expandedTopics.includes(index);
                const hasSubTopics = topic.subTopics && topic.subTopics.length > 0;
                
                return (
                  <div
                    key={index}
                    className="rounded-xl border border-border/40 bg-card/80 backdrop-blur transition-all overflow-hidden"
                  >
                    <button
                      onClick={() => hasSubTopics && toggleTopic(index)}
                      className={`w-full p-4 text-left transition-colors ${hasSubTopics ? 'cursor-pointer hover:bg-card' : 'cursor-default'}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${category.accent} text-white text-sm font-bold`}>
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-foreground">{topic.title}</h3>
                            {hasSubTopics && (
                              <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full">
                                {topic.subTopics!.length} alt başlık
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{topic.description}</p>
                        </div>
                        {hasSubTopics && (
                          <ChevronDown 
                            className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
                          />
                        )}
                      </div>
                    </button>
                    
                    {hasSubTopics && isExpanded && (
                      <div className="border-t border-border/40 bg-background/50 p-4">
                        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                          {topic.subTopics!.map((sub, subIndex) => (
                            (() => {
                              const hasContent = hasDerivedContent ? contentTitles.has(sub.title) : sub.hasContent;
                              return (
                            <Link
                              key={subIndex}
                              to={buildSubTopicLink(sub.title)}
                              className="flex items-center gap-2 rounded-lg border border-transparent bg-card/60 px-3 py-2 text-left text-sm transition-all hover:border-primary/30 hover:bg-primary/10"
                            >
                              <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                              <span className="text-foreground/90 flex-1">{sub.title}</span>
                              {/* status badge removed per request */}

                              <ChevronRight className="h-3.5 w-3.5 text-primary/60" />
                            </Link>
                              );
                            })()
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {topicContent.keyTopics.map((topic, index) => (
                <div
                  key={index}
                  className="group rounded-xl border border-border/40 bg-card/80 p-4 backdrop-blur transition-all hover:border-primary/30 hover:bg-card hover:shadow-md"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${category.accent} text-white text-xs font-bold`}>
                      {index + 1}
                    </div>
                    <h3 className="font-medium text-foreground">{topic.title}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">{topic.description}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {isNavigation && missingNavigationCount > 0 && (
          <section className="rounded-2xl border border-amber-500/20 bg-amber-50/70 p-6 text-amber-900 backdrop-blur dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-100">
            <div className="mb-4 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-amber-500" />
              <h2 className="text-lg font-semibold">Eksik Konular (Seyir)</h2>
              <span className="ml-auto rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700 dark:bg-amber-500/20 dark:text-amber-200">
                {missingNavigationCount} başlık
              </span>
            </div>
            <div className="space-y-4 text-sm">
              {missingNavigationTopics.map(item => (
                <div key={item.title} className="rounded-xl border border-amber-200/60 bg-white/70 p-4 dark:border-amber-500/20 dark:bg-amber-500/10">
                  <p className="font-semibold text-amber-800 dark:text-amber-100">{item.title}</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-amber-800/90 dark:text-amber-100/90">
                    {item.missing.map(sub => (
                      <li key={sub.title}>{sub.title}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Quick Links */}
        <section className="rounded-2xl border border-border/40 bg-card/80 p-6 backdrop-blur">
          <div className="mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Hızlı Erişim</h2>
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            {topicContent.resources.map((resource, index) => (
              <Link
                key={index}
                to={resource.href}
                className="group flex items-center justify-between rounded-lg border border-border/40 bg-background/50 px-4 py-3 transition-all hover:border-primary/40 hover:bg-background"
              >
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">{resource.title}</span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            ))}
          </div>
          {topicContent.contentStandards && (
            <div className="mt-5 rounded-xl border border-border/40 bg-background/60 px-4 py-3 text-xs text-muted-foreground">
              Her başlık en az{" "}
              <span className="font-semibold text-foreground">
                {topicContent.contentStandards.minPagesPerTopic}
              </span>{" "}
              sayfa olarak planlanır. Görseller{" "}
              <span className="font-semibold text-foreground">
                {topicContent.contentStandards.imageFormat}
              </span>{" "}
              formatında hazırlanır.
            </div>
          )}
        </section>

        {/* Back to Lessons */}
        <div className="flex justify-center pt-2">
          <Link
            to="/lessons"
            className="inline-flex items-center gap-2 rounded-full bg-card/60 px-4 py-2 text-xs text-muted-foreground backdrop-blur transition-colors hover:bg-card hover:text-foreground"
          >
            <BookOpen className="h-4 w-4" />
            Tüm Derslere Dön
          </Link>
        </div>
      </div>

    </div>
  );
}
