import type { TopicDetailContent } from "@/data/navigationTopicContents";

export const communicationTopicContents: Record<string, TopicDetailContent> = {
  "GMDSS Mimarisi ve Deniz Alanları": {
    title: "GMDSS Mimarisi ve Deniz Alanları",
    introduction:
      "GMDSS, denizde tehlike ve emniyet haberleşmesini küresel ölçekte standartlaştıran sistemdir. A1-A4 deniz alanı sınıflandırması, gemide taşınacak cihazları ve operasyon prosedürlerini doğrudan belirler.",
    sections: [
      {
        title: "Deniz Alanları (Sea Area) Mantığı",
        content:
          "A1 alanı kıyı VHF-DSC kapsaması, A2 alanı MF-DSC kapsaması, A3 alanı Inmarsat kapsaması, A4 ise kutup ve zayıf uydu kapsama bölgelerini ifade eder. Sefer planı hazırlanırken geminin geçeceği alanlar belirlenir ve ekipman uygunluğu teyit edilir.",
      },
      {
        title: "Asgari Ekipman Seti",
        content:
          "Tipik bir ticari gemide VHF-DSC, MF/HF-DSC, EPIRB, SART/AIS-SART, NAVTEX alıcısı ve taşınabilir VHF setleri bulunur. Ekipman kombinasyonu bayrak devleti, gemi tipi ve seyir alanına göre değişebilir.",
      },
    ],
    keyPoints: [
      "Deniz alanı değiştikçe zorunlu cihaz seti de değişir.",
      "GMDSS uygunluğu yalnız cihaz varlığı değil, çalışırlık ve kayıt disiplini gerektirir.",
    ],
  },
  "VHF-DSC Operasyonları": {
    title: "VHF-DSC Operasyonları",
    introduction:
      "VHF, kıyıya yakın ve gemiler arası kısa-orta menzilde ana iletişim aracıdır. DSC ise çağrının dijital olarak otomatik ve izlenebilir şekilde yapılmasını sağlar.",
    sections: [
      {
        title: "DSC ve Ses Trafiği Akışı",
        content:
          "Acil veya rutin bir çağrıda önce uygun öncelikte DSC çağrısı yapılır, ardından belirtilen çalışma kanalında sesli haberleşmeye geçilir. Distress durumunda Ch.70 dijital çağrı sonrası Ch.16 MAYDAY mesajı uygulanır.",
      },
      {
        title: "Kanal Disiplini",
        content:
          "Ch.16 dinlemesi vardiya boyunca sürdürülür. Gereksiz uzun konuşma, standart dışı ifade ve teyitsiz komutlar köprüüstü emniyetini düşürür. SMCP (Standard Marine Communication Phrases) kullanımı yanlış anlamayı azaltır.",
      },
    ],
  },
  "Tehlike, Aciliyet ve Emniyet Haberleşmesi": {
    title: "Tehlike, Aciliyet ve Emniyet Haberleşmesi",
    introduction:
      "Deniz haberleşmesinde üç öncelik seviyesi vardır: distress (MAYDAY), urgency (PAN PAN) ve safety (SECURITE). Doğru öncelik seçimi, arama-kurtarma koordinasyonunun hızını doğrudan etkiler.",
    sections: [
      {
        title: "Öncelik Sırası",
        content:
          "MAYDAY, cana yönelik yakın ve ciddi tehlike için kullanılır. PAN PAN acil fakat hayati olmayan durumları, SECURITE ise seyir ve meteoroloji emniyet duyurularını kapsar.",
      },
      {
        title: "Mesaj Yapısı",
        content:
          "Standart bir tehlike mesajında çağrı işareti, MMSI, mevki, tehlikenin türü, talep edilen yardım ve gemideki kişi sayısı bulunmalıdır. Mesajlar kısa, net ve tekrar edilebilir formatta aktarılır.",
      },
    ],
  },
  "NAVTEX, SafetyNET ve MSI": {
    title: "NAVTEX, SafetyNET ve MSI",
    introduction:
      "Maritime Safety Information (MSI), seyir emniyeti için zorunlu yayınları içerir. NAVTEX ve SafetyNET bu bilgilerin gemiye kesintisiz ulaşmasında temel yayın sistemleridir.",
    sections: [
      {
        title: "NAVTEX Kullanımı",
        content:
          "NAVTEX 518 kHz üzerinden otomatik metin mesajları iletir. Uyarılar alındığında seyir zabiti mesajı değerlendirir, rota/plan etkisini köprüüstü ekibiyle paylaşır ve kayıt altına alır.",
      },
      {
        title: "SafetyNET Rolü",
        content:
          "Uydu tabanlı SafetyNET, özellikle ocean passage sırasında NAVAREA/METAREA duyurularını sağlar. Polar veya uzak deniz koşullarında kapsama planlaması önceden kontrol edilmelidir.",
      },
    ],
  },
  "EPIRB, SART ve Arama Kurtarma Entegrasyonu": {
    title: "EPIRB, SART ve Arama Kurtarma Entegrasyonu",
    introduction:
      "EPIRB ve SART cihazları, geminin terk edilmesi veya ağır acil durumlarda yer tespiti için kritik role sahiptir. Bu cihazların test ve bakım disiplini, gerçek olayda kurtarma süresini belirler.",
    sections: [
      {
        title: "EPIRB İşlevi",
        content:
          "406 MHz EPIRB, COSPAS-SARSAT sistemi üzerinden alarm ve kimlik bilgisi iletir. Float-free montaj, hidrolik ayırıcı tarihleri ve kayıt numaraları düzenli olarak doğrulanmalıdır.",
      },
      {
        title: "SART/AIS-SART Kullanımı",
        content:
          "SART, arama birimlerinin radar/AIS ekranında kurtarma aracını görünür kılar. Tatbikatlarda cihazın yerleşimi, aktive etme adımları ve cankurtarma araçlarına aktarım prosedürü tekrar edilmelidir.",
      },
    ],
    keyPoints: [
      "EPIRB/SART varlığı kadar doğru programlama ve batarya tarihleri de kritiktir.",
      "Aylık-haftalık test kayıtları PSC denetimlerinde ilk kontrol edilen alanlardandır.",
    ],
  },
};
