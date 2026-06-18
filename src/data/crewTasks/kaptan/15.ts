import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Yorgunluk (fatigue) yönetimi ve dinlenme saatleri denetimi",
  roleSlug: "kaptan",
  taskIndex: 15,
  estimatedPages: 23,
  intro: `Yorgunluk (fatigue), deniz kazalarının en sinsi ve en yaygın insan faktörü nedenlerinden biridir; dikkati, karar verme hızını ve refleksleri sarhoşluğa benzer biçimde köreltir. STCW A-VIII/1 ve MLC 2006, mürettebatın asgari dinlenme saatlerini bağlayıcı biçimde belirler. Kaptan, kadronun yorgunluk seviyesini izlemek, kritik operasyonlar öncesi dinlenmeyi güvence altına almak ve rest hours kayıtlarının dürüst tutulmasını denetlemekten sorumludur. Bu bölüm fatigue yönetimini ve dinlenme saatleri uyumunu ele alır.`,
  sources: [
    "STCW Code A-VIII/1 — fitness for duty / minimum rest hours",
    "MLC 2006 — hours of work and rest",
    "ILO/IMO Guidelines on fatigue (MSC.1/Circ.1598)",
    "ISM Code — emniyetli işletim ve insan faktörü",
    "Şirket SMS — rest hours kayıt ve izleme prosedürleri",
  ],
  chapters: [
    {
      heading: "1. Yorgunluğun Riski",
      sections: [
        {
          subheading: "1.1 Fatigue neden tehlikelidir?",
          paragraphs: [
            `Yorgunluk; tepki süresini uzatır, dikkati dağıtır, muhakemeyi bozar ve "mikro uyku" (microsleep) gibi tehlikeli durumlara yol açar. Köprüüstü ve makine kazalarının çoğunda yorgunluk doğrudan veya dolaylı rol oynar. Kaptan, yorgunluğu bir "zayıflık" değil, yönetilmesi gereken ciddi bir operasyonel risk olarak görür.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Yorgunluk ve grounding",
              text: `Birçok karaya oturma ve çatışma incelemesinde tek başına vardiya tutan, uykusuz bir zabit bulunmuştur. Yorgun bir göz, en iyi ekipmanı bile etkisiz kılar.`,
            },
          ],
        },
        {
          subheading: "1.2 Yorgunluğun nedenleri",
          paragraphs: [
            `Yetersiz uyku, bölünmüş dinlenme, ağır iş yükü, liman içi yoğun operasyon, gürültü/titreşim, sirkadiyen ritim bozulması (gece vardiyası, sık zone change) ve stres başlıca etkenlerdir. Az kadrolu gemilerde liman/manevra yoğunluğu yorgunluğu hızla artırır.`,
          ],
        },
      ],
    },
    {
      heading: "2. Dinlenme Saatleri Rejimi",
      sections: [
        {
          subheading: "2.1 Asgari dinlenme",
          paragraphs: [
            `STCW/MLC; her 24 saatte en az 10 saat ve her 7 günde en az 77 saat dinlenme öngörür. Dinlenme en fazla iki periyoda bölünebilir; periyotlardan biri en az 6 saat kesintisiz olmalı ve ardışık dinlenme periyotları arası 14 saati geçmemelidir. Kaptan bu sınırların ihlal edilmemesini gözetir.`,
          ],
          table: {
            caption: "Asgari dinlenme kuralları (STCW/MLC)",
            headers: ["Kural", "Sınır"],
            rows: [
              ["24 saatte dinlenme", "≥ 10 saat"],
              ["7 günde dinlenme", "≥ 77 saat"],
              ["Bölünme", "En fazla 2 periyot"],
              ["Kesintisiz periyot", "≥ 6 saat (biri)"],
            ],
          },
        },
        {
          subheading: "2.2 İstisna ve telafi",
          paragraphs: [
            `Acil durum ve drill'ler için sınırlı istisnalar tanımlanmış olsa da, bunlar suistimal edilemez; istisna sonrası telafi dinlenmesi verilir. Kaptan, "kâğıt üzerinde uyumlu ama gerçekte yorgun" bir kadrodan kaçınır.`,
          ],
        },
      ],
    },
    {
      heading: "3. Kayıt Dürüstlüğü",
      sections: [
        {
          subheading: "3.1 Gerçek rest hours kaydı",
          paragraphs: [
            `Rest hours kayıtları, gerçek dinlenmeyi yansıtmalıdır. Uyum göstermek için sahte kayıt tutmak (record falsification), hem MLC ihlali hem de güvenlik kültürünün çöküşüdür; çünkü gerçek yorgunluğu gizler ve riski görünmez kılar. Kaptan dürüst kaydı şart koşar.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "PSC ve rest hours",
              text: `Rest hours ihlali ve kayıt tutarsızlığı, PSC'de en sık çıkan MLC bulgularındandır ve gemi tutmaya kadar gidebilir. "Düzgün görünen" sahte kayıt, gerçek ihlalden daha büyük bir sorundur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. İş Yükü ve Planlama",
      sections: [
        {
          subheading: "4.1 Kritik operasyon öncesi dinlenme",
          paragraphs: [
            `Manevra, dar su geçişi, yoğun yük operasyonu veya kötü hava öncesinde ilgili personelin dinlenmiş olması sağlanır. Kaptan, liman programını ve görev dağılımını yorgunluğu düşürecek biçimde planlar; gerekirse operasyon yavaşlatılır veya ek dinlenme verilir.`,
          ],
          bullets: [
            `Manevra/dar su öncesi köprüüstü ekibi dinlenmiş`,
            `Uzun liman operasyonunda vardiya rotasyonu`,
            `Zone change'lerin dinlenmeye etkisi planlı`,
            `Acil iş sonrası telafi dinlenmesi`,
          ],
        },
      ],
    },
    {
      heading: "5. Yorgunluk Belirtileri ve Kültür",
      sections: [
        {
          subheading: "5.1 Belirtileri tanımak",
          paragraphs: [
            `Esneme, dikkat dağınıklığı, gecikmiş tepki, sinirlilik ve hata artışı yorgunluğun işaretleridir. Kaptan, mürettebatın yorgunluğu çekinmeden bildirebileceği bir kültür kurar; "yorgunum" demek cezalandırılmaz, ciddiye alınır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Açık iletişim",
              text: `Yorgunluğunu söyleyebilen bir mürettebat, sessizce hata yapan bir mürettebattan çok daha güvenlidir. Kaptanın tutumu, bu açıklığı belirler.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "6.1 Fatigue yönetimi kontrolü",
          bullets: [
            `Rest hours STCW/MLC sınırları içinde mi (24/77 saat)?`,
            `Kayıtlar gerçek dinlenmeyi dürüstçe yansıtıyor mu?`,
            `Kritik operasyon öncesi ilgili personel dinlenmiş mi?`,
            `İstisna sonrası telafi dinlenmesi verildi mi?`,
            `Zone change'lerin yorgunluğa etkisi planlandı mı?`,
            `Yorgunluk belirtileri izleniyor, bildirim teşvik ediliyor mu?`,
          ],
          paragraphs: [
            `Yorgunluk yönetimi, kaptanın hem yasal yükümlülüğü hem de en etkili kaza önleme araçlarından biridir. Dürüst kayıt, gerçekçi iş yükü planlaması ve açık bir kültür; yorgun bir mürettebatın yol açabileceği görünmez riski en aza indirir.`,
          ],
        },
      ],
    },
  ],
};

export default content;
