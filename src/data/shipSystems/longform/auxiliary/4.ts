import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "Pompa Tipleri ve Uygulamaları",
  sectionId: "auxiliary",
  topicIndex: 4,
  estimatedPages: 24,
  intro: `Pompalar, gemide yakıt, yağlama, soğutma, balast, sintine, yangın ve kargo dahil hemen her sıvı transferinin kalbidir. Doğru pompa tipi seçimi (santrifüj, pozitif deplasmanlı), kavitasyon (NPSH), debi-basma yüksekliği (H-Q) eğrisi ve priming bu sistemin emniyet ve veriminin temelidir. Bu bölüm; pompa sınıflandırmasını (santrifüj, vidalı, dişli, pistonlu), santrifüj pompa karakteristiğini ve kavitasyonu (NPSH), pozitif deplasmanlı pompaları ve relief valf zorunluluğunu, priming ve seri/paralel çalışmayı ve bakım/arızayı mühendislik derinliğinde ele alır.`,
  sources: [
    "ISO / Hydraulic Institute pump standards",
    "Klas kuralları — essential pumps & redundancy",
    "Üretici el kitapları (IMO, Allweiler, Shinko, Naniwa)",
    "Pump Handbook (Karassik)",
  ],
  chapters: [
    {
      heading: "1. Pompa Sınıflandırması",
      sections: [
        {
          subheading: "1.1 Santrifüj vs pozitif deplasmanlı",
          paragraphs: [
            `Santrifüj (dinamik) pompalar, çark (impeller) ile sıvıya hız kazandırıp basınca çevirir; yüksek debi, düşük-orta basınç ve düşük viskozite için idealdir (deniz suyu, balast, yangın). Pozitif deplasmanlı (PD) pompalar her devirde sabit hacim taşır; yüksek viskozite ve basınç için uygundur (yakıt, yağ, hidrolik).`,
          ],
          table: {
            headers: ["Tip", "Uygun akışkan", "Tipik kullanım"],
            rows: [
              ["Santrifüj", "Düşük viskozite, yüksek debi", "Deniz suyu, balast, yangın"],
              ["Vidalı (screw)", "Yüksek viskozite", "HFO/yağ transferi"],
              ["Dişli (gear)", "Yağ", "Yağlama, hidrolik"],
              ["Pistonlu/diyafram", "Yüksek basınç/dozaj", "Kimyasal dozaj, bilge"],
            ],
          },
        },
      ],
    },
    {
      heading: "2. Santrifüj Pompa ve Kavitasyon",
      sections: [
        {
          subheading: "2.1 H-Q eğrisi",
          paragraphs: [
            `Santrifüj pompanın debisi (Q) arttıkça basma yüksekliği (H) düşer (H-Q eğrisi). Çalışma noktası, pompa eğrisi ile sistem direnç eğrisinin kesişimidir. Valf kısarak sistem direnci artar, debi düşer; pompa kapalı vanaya karşı (shut-off) çalışırsa ısınır.`,
          ],
        },
        {
          subheading: "2.2 NPSH ve kavitasyon",
          paragraphs: [
            `Pompa emişindeki mevcut net pozitif emme yükü (NPSHa) pompanın istediği değerin (NPSHr) altına düşerse sıvı buharlaşır ve kavitasyon oluşur; bu çark erozyonu, gürültü, titreşim ve debi kaybı yapar. Sıcak/uçucu sıvılarda, tıkalı süzgeçte veya yüksek emiş yüksekliğinde risk artar.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Kavitasyon işareti",
              text: `Çakıl sesi, titreşim ve dalgalı basınç kavitasyon işaretidir; emiş süzgeci/valfi açılır, sıvı sıcaklığı ve seviye kontrol edilir, gerekirse debi düşürülür.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Pozitif Deplasmanlı Pompa ve Emniyet",
      sections: [
        {
          subheading: "3.1 Relief valf zorunluluğu",
          paragraphs: [
            `PD pompa kapalı vanaya karşı çalışırsa basıncı sınırsız yükseltip hattı/pompayı patlatır. Bu yüzden her PD pompa hattında relief (emniyet/by-pass) valfi zorunludur. Santrifüjün aksine PD pompa asla kapalı deşarja karşı kısılmaz.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "PD pompada relief şart",
              text: `Vidalı/dişli/pistonlu pompalarda deşarj tarafı emniyet valfi olmadan çalıştırmak yasaktır; kapalı valf basıncı tehlikeli düzeye çıkarır.`,
            },
          ],
        },
        {
          subheading: "3.2 Priming ve seri/paralel",
          paragraphs: [
            `Santrifüj pompa kendiliğinden emiş yapamaz; priming (su ile doldurma) veya self-priming düzeneği gerekir. Pompalar paralel bağlanırsa debi, seri bağlanırsa basma yüksekliği artar. Yedek (standby) pompalar otomatik devreye girebilir.`,
          ],
          bullets: [
            `Paralel → debi artar (aynı H)`,
            `Seri → basınç artar (aynı Q)`,
            `Priming olmadan santrifüj hava yapar`,
          ],
        },
      ],
    },
    {
      heading: "4. Bakım ve Arıza",
      sections: [
        {
          subheading: "4.1 Bakım",
          paragraphs: [
            `Bakım; mekanik salmastra (mechanical seal)/gland packing, çark aşınma halkaları (wear ring), rulman/yağ, hizalama ve titreşim ile süzgeç temizliğini kapsar. Mekanik salmastra sızıntısı erken giderilir.`,
          ],
        },
        {
          subheading: "4.2 Arıza tablosu",
          paragraphs: [`Yaygın sorunlar:`],
          table: {
            headers: ["Belirti", "Neden", "Müdahale"],
            rows: [
              ["Debi/basınç yok", "Priming yok, hava, ters dönüş", "Priming, hava al, dönüş yönü"],
              ["Kavitasyon/gürültü", "Düşük NPSH, tıkalı süzgeç", "Emiş süzgeci/seviye/sıcaklık"],
              ["Salmastra sızıntısı", "Seal aşınması", "Mekanik seal değişimi"],
              ["Aşırı titreşim/ısınma", "Hizasızlık/rulman", "Hizalama + rulman kontrolü"],
            ],
          },
        },
      ],
    },
  ],
};

export default content;
