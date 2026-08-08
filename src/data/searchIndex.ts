export interface SearchItem {
  title: string;
  description?: string;
  path: string;
  category: string;
  keywords?: string[];
}

export const searchIndex: SearchItem[] = [
  // Ana Sayfalar
  { title: "Ana Sayfa", path: "/", category: "Genel" },
  { title: "Hesaplamalar", path: "/calculations", category: "Genel", keywords: ["calculator", "hesap"] },
  { title: "Dersler", path: "/lessons", category: "Genel", keywords: ["ders", "konu", "eğitim"] },
  { title: "Denizcilik Sözlüğü", path: "/glossary", category: "Genel", keywords: ["sözlük", "terim", "kelime"] },
  { title: "Personel Hiyerarşisi", path: "/crew", category: "Genel", keywords: ["mürettebat", "kaptan", "zabitan"] },
  { title: "Gemi Sistemleri", path: "/ship-systems", category: "Genel", keywords: ["sistem", "makine", "elektrik"] },
  { title: "Gemi Operasyonları", path: "/ship-operations", category: "Genel", keywords: ["operasyon", "yanaşma", "kalkış"] },
  { title: "Offshore / DP Operasyonları", path: "/ship-operations/offshore", category: "Operasyonlar", keywords: ["offshore", "DP", "dynamic positioning", "dinamik konumlandırma", "PSV", "AHTS", "ROV", "FMEA", "ASOG", "CAMO", "TAM", "DPO"] },
  { title: "Marine Technologies Bridge Mate DP", description: "Bridge Mate DP ürün ailesi, dağıtık mimari, sınıf farkları ve operasyonel kullanımı", path: "/ship-operations/offshore", category: "Operasyonlar", keywords: ["Marine Technologies", "Bridge Mate", "MT", "RadaScan", "CyScan", "TCS", "thruster control", "DP Chair", "JX", "DP 0", "IBS", "MFW", "NAUT-AW", "majority voting"] },
  { title: "Köprüüstü Cihazları", path: "/bridge", category: "Genel", keywords: ["radar", "AIS", "ECDIS", "GPS"] },
  { title: "Seyir Planı", path: "/passage-plan", category: "Seyir", keywords: ["rota", "passage planning"] },
  
  // Seyir
  { title: "Seyir Hesaplamaları", path: "/navigation", category: "Seyir", keywords: ["navigasyon", "mevki"] },
  { title: "Seyir Konu Anlatımları", path: "/lessons/navigation/topics", category: "Seyir", keywords: ["ders"] },
  { title: "COLREG – Denizde Çatışmayı Önleme", path: "/regulations/colreg", category: "Seyir", keywords: ["deniz trafik", "kural", "çatışma", "colreg", "1972"] },
  { title: "IALA Şamandıra Sistemi", path: "/navigation/buoyage", category: "Seyir", keywords: ["şamandıra", "samandira", "buoy", "IALA", "kardinal", "lateral", "izole tehlike", "emniyetli su", "batık", "EWMB", "bölge A", "bölge B"] },
  { title: "Ses İşaretleri (COLREG Kural 32-37)", path: "/navigation/sound-signals", category: "Seyir", keywords: ["ses", "düdük", "sound signal", "sis düdüğü", "kısıtlı görüş", "çan", "gong", "tornistan", "şüphe işareti"] },

  // Haberleşme
  { title: "İşaret Bayrakları (ICS)", path: "/communication/flags", category: "Haberleşme", keywords: ["bayrak", "flag", "işaret kodu", "ICS", "alfa", "bravo", "oscar", "flama", "ikame", "cevap flaması"] },
  { title: "Mors Alfabesi", path: "/communication/morse", category: "Haberleşme", keywords: ["mors", "morse", "aldis", "mors lambası", "SOS", "nokta çizgi", "ITU"] },
  { title: "Haberleşme Asistanı", path: "/communication/assistant", category: "Haberleşme", keywords: ["GMDSS", "VHF", "telsiz"] },

  // Stabilite
  { title: "Stabilite Hesaplamaları", path: "/stability/calculations", category: "Stabilite", keywords: ["denge", "GM", "KG"] },
  { title: "GM Hesaplama", path: "/stability/gm", category: "Stabilite", keywords: ["metacentric height", "metacentre"] },
  { title: "GZ Eğrisi", path: "/stability/gz-curve", category: "Stabilite", keywords: ["cross curve", "righting lever"] },
  { title: "GZ-IMO Kriterleri", path: "/stability/gz-imo", category: "Stabilite", keywords: ["IMO criteria"] },
  { title: "Ağırlık Kaydırma", path: "/stability/weight-shift", category: "Stabilite", keywords: ["weight shift", "moment"] },
  { title: "Serbest Yüzey Etkisi", path: "/stability/free-surface", category: "Stabilite", keywords: ["free surface effect", "FSE", "FSC"] },
  { title: "Tahıl Stabilitesi", path: "/stability/grain", category: "Stabilite", keywords: ["grain", "tahıl"] },
  { title: "Tahıl Hesaplaması", path: "/stability/grain-calculation", category: "Stabilite", keywords: ["grain calculation"] },
  { title: "Rüzgâr-Hava Kriteri", path: "/stability/wind-weather", category: "Stabilite", keywords: ["weather criterion", "severe wind"] },
  { title: "IMO Kriterleri", path: "/stability/imo-criteria", category: "Stabilite", keywords: ["IMO A.749"] },
  { title: "Kesme-Bükme Momentleri", path: "/stability/shearing-bending", category: "Stabilite", keywords: ["shearing force", "bending moment"] },
  { title: "Stabilite Formülleri", path: "/stability/formulas", category: "Stabilite" },
  { title: "Stabilite Quiz", path: "/stability/quiz", category: "Stabilite" },
  { title: "Stabilite Asistanı", path: "/stability/assistant", category: "Stabilite", keywords: ["danışman", "GM", "GZ"] },
  { title: "Pratik Stabilite", path: "/stability/practical", category: "Stabilite" },
  { title: "FWA Hesaplama", path: "/stability/practical/fwa", category: "Stabilite", keywords: ["fresh water allowance", "tatlı su"] },
  { title: "Tank Hesabı", path: "/stability/practical/tank", category: "Stabilite" },
  { title: "Stabilite Analizi", path: "/stability/analysis", category: "Stabilite" },
  
  // Meteoroloji
  { title: "Meteoroloji Konu Anlatımları", path: "/meteorology/topics", category: "Meteoroloji", keywords: ["hava", "rüzgâr", "basınç"] },
  { title: "Meteoroloji Formülleri", path: "/meteorology/formulas", category: "Meteoroloji" },
  { title: "Meteoroloji Quiz", path: "/meteorology/quiz", category: "Meteoroloji" },
  { title: "Meteoroloji Asistanı", path: "/meteorology/assistant", category: "Meteoroloji" },

  // Kargo
  { title: "Kargo Hesaplamaları", path: "/cargo/calculations", category: "Kargo", keywords: ["yük"] },
  { title: "Draft Survey", path: "/cargo/calculations/draft-survey", category: "Kargo", keywords: ["draft", "su çekimi"] },
  { title: "Draft Survey - Yükleme Öncesi", path: "/cargo/calculations/preloading", category: "Kargo" },
  { title: "Draft Survey - Ara Hesap", path: "/cargo/calculations/intermediate", category: "Kargo" },
  { title: "Draft Survey - Tahliye Sonrası", path: "/cargo/calculations/postdischarge", category: "Kargo" },
  { title: "Draft Survey - Karşılaştırma", path: "/cargo/calculations/comparative", category: "Kargo" },
  { title: "Draft Survey - Balast", path: "/cargo/calculations/ballast", category: "Kargo" },
  { title: "Draft Survey - Yoğunluk", path: "/cargo/calculations/density", category: "Kargo" },
  { title: "Draft Survey - Bunker", path: "/cargo/calculations/bunker", category: "Kargo" },
  { title: "Kargo Formülleri", path: "/cargo/formulas", category: "Kargo" },
  { title: "Kargo Asistanı", path: "/cargo/assistant", category: "Kargo" },
  { title: "Kargo Quiz", path: "/cargo/quiz", category: "Kargo" },
  { title: "Kargo Konu Anlatımları", path: "/lessons/cargo/topics", category: "Kargo" },
  
  // Güvenlik
  { title: "Güvenlik Hesaplamaları", path: "/safety", category: "Güvenlik", keywords: ["safety", "emniyet"] },
  { title: "SOLAS Düzenlemeleri", path: "/solas/regulations", category: "Güvenlik", keywords: ["SOLAS"] },
  { title: "SOLAS Sertifikaları", path: "/solas/certificates", category: "Güvenlik" },
  { title: "Güvenlik Konu Anlatımları", path: "/lessons/safety/topics", category: "Güvenlik" },
  
  // Makine
  { title: "Makine Hesaplamaları", path: "/engine", category: "Makine", keywords: ["motor", "dizel"] },
  { title: "Makine Dairesi", path: "/machinery", category: "Makine", keywords: ["engine room"] },
  
  // Çevre
  { title: "Emisyon Hesaplamaları", path: "/emissions", category: "Çevre", keywords: ["CO2", "CII", "EEXI", "karbon"] },
  { title: "Çevre Formülleri", path: "/environment/formulas", category: "Çevre" },
  { title: "Çevre Quiz", path: "/environment/quiz", category: "Çevre" },
  { title: "Çevre Konu Anlatımları", path: "/lessons/environment/topics", category: "Çevre" },

  // Tank & Balast
  { title: "Tank Hesaplamaları", path: "/tank", category: "Hesaplamalar", keywords: ["sounding", "hacim"] },
  { title: "Balast Yönetimi", path: "/ballast", category: "Hesaplamalar", keywords: ["BWM", "balast suyu"] },
  { title: "Hidrodinamik", path: "/hydrodynamics", category: "Hesaplamalar", keywords: ["akış", "direnç"] },
  { title: "Yapısal Hesaplamalar", path: "/structural", category: "Hesaplamalar", keywords: ["mukavemet", "stress"] },
  { title: "Özel Gemi Hesaplamaları", path: "/special-ships", category: "Hesaplamalar" },

  // Dersler - Diğer
  { title: "Stabilite Konu Anlatımları", path: "/lessons/stability/topics", category: "Dersler" },
  { title: "Gemicilik Konu Anlatımları", path: "/lessons/seamanship/topics", category: "Dersler", keywords: ["halat", "düğüm", "manevra"] },
  { title: "Ekonomi Konu Anlatımları", path: "/lessons/economics/topics", category: "Dersler" },
  { title: "Ticari Operasyonlar Asistanı", path: "/economics/assistant", category: "Ekonomi", keywords: ["charter", "navlun", "freight", "TCE", "laytime", "demurrage", "danışman", "deniz işletmeciliği"] },
  { title: "Ticari Operasyonlar Quiz", path: "/economics/quiz", category: "Ekonomi", keywords: ["charter", "TCE", "laytime", "demurrage", "sefer ekonomisi"] },

  // Gemi Görevleri
  { title: "Gemi Görevleri", path: "/ship-tasks", category: "Operasyonlar" },
  
  // Deniz Haberleri  
  { title: "Denizcilik Haberleri", path: "/maritime-news", category: "Genel", keywords: ["haber", "news"] },
  
  // Widget
];
