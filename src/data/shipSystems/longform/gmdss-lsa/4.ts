import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "EPIRB (406 MHz Cospas-Sarsat)",
  sectionId: "gmdss-lsa",
  topicIndex: 4,
  estimatedPages: 21,
  intro: `EPIRB (Emergency Position-Indicating Radio Beacon), gemi battığında veya terk edildiğinde otomatik yüzeye çıkıp 406 MHz'de uydu (Cospas-Sarsat) üzerinden tehlike uyarısı ve konum gönderen, GMDSS'in son-çare tehlike işaretçisidir. Hidrostatik release (HRU) ile belirli derinlikte serbest kalır ve suyla otomatik aktive olur. Bu bölüm; EPIRB çalışmasını ve Cospas-Sarsat uydu sistemini, 406 MHz dijital kimlik ve GPS konumunu, float-free ve HRU mekanizmasını, kayıt (registration) ve yanlış alarm yönetimini, SOLAS gereksinimini ve bakım/arızayı mühendislik derinliğinde ele alır.`,
  sources: [
    "SOLAS Ch. IV — satellite EPIRB",
    "Cospas-Sarsat 406 MHz beacon specifications",
    "IMO Res. — EPIRB performance & float-free",
    "IMO MSC.1/Circ. — false alert reduction",
  ],
  chapters: [
    {
      heading: "1. Çalışma ve Uydu Sistemi",
      sections: [
        {
          subheading: "1.1 406 MHz ve Cospas-Sarsat",
          paragraphs: [
            `EPIRB aktive olunca 406 MHz'de dijital tehlike sinyali yayınlar; bu sinyali Cospas-Sarsat uyduları (LEO + GEO + MEOSAR) alır ve kara istasyonlarına (LUT) iletir. Dijital mesaj geminin benzersiz kimliğini (hex ID/MMSI) içerir; konum ise dahili GPS veya Doppler ile belirlenir. Ayrıca 121.5 MHz homing sinyali SAR aracına yön verir.`,
          ],
          bullets: [
            `406 MHz dijital → uydu → LUT → MRCC`,
            `Dahili GPS ile hızlı/kesin konum`,
            `121.5 MHz homing: SAR yön bulma`,
          ],
        },
      ],
    },
    {
      heading: "2. Float-Free ve HRU",
      sections: [
        {
          subheading: "2.1 Otomatik serbest kalma",
          paragraphs: [
            `EPIRB, float-free braket içinde dış güvertede saklanır. Gemi batarsa hidrostatik release unit (HRU) belirli su derinliğinde (~1.5-4 m) bağı keser; EPIRB yüzeye çıkar ve suyla temas edince otomatik aktive olur. Manuel aktivasyon da mümkündür.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Engelsiz montaj",
              text: `EPIRB'in float-free çalışması için üstünde engel olmamalı; serbestçe yüzeye çıkabilmeli. Üzerine bağlanmış halat/örtü onu suyun altında tutarak işlevsiz bırakır.`,
            },
          ],
        },
        {
          subheading: "2.2 HRU son kullanma",
          paragraphs: [
            `HRU'nun son kullanma tarihi vardır (genelde 2 yıl) ve zamanında değiştirilir; süresi geçmiş HRU serbest bırakmayabilir. EPIRB bataryası ve montaj braketi de periyodik kontrol edilir.`,
          ],
        },
      ],
    },
    {
      heading: "3. Kayıt ve Yanlış Alarm",
      sections: [
        {
          subheading: "3.1 Registration",
          paragraphs: [
            `EPIRB, gemi ve irtibat bilgileriyle ilgili otoriteye kaydedilmelidir (registration). Doğru kayıt, SAR'ın gemiyi hızla teşhis etmesini ve sahibine ulaşıp gerçek/yanlış alarmı ayırt etmesini sağlar. Gemi/sahip değişiminde kayıt güncellenir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "Yanlış alarm",
              text: `EPIRB yanlışlıkla aktive olursa derhal kapatılmalı ve en yakın MRCC/kıyı istasyonu bilgilendirilmelidir; aksi halde gereksiz SAR kaynağı seferber edilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Bakım ve Arıza",
      sections: [
        {
          subheading: "4.1 Bakım ve test",
          paragraphs: [
            `Bakım; self-test fonksiyonu (gerçek yayın yapmadan), batarya ve HRU son kullanma tarihi, braket/montaj ve gövde kontrolünü kapsar. Yıllık ve periyodik (shore-based) muayene yapılır. Test sırasında gerçek tehlike yayını gönderilmez.`,
          ],
          bullets: [
            `Self-test (yayın yapmadan)`,
            `Batarya + HRU son kullanma takibi`,
            `Float-free braket engel kontrolü`,
          ],
        },
        {
          subheading: "4.2 Arıza tablosu",
          paragraphs: [`Yaygın sorunlar:`],
          table: {
            headers: ["Belirti", "Neden", "Müdahale"],
            rows: [
              ["Self-test başarısız", "Batarya/elektronik", "Batarya/servis"],
              ["HRU süresi dolmuş", "Yaşlanma", "HRU değişimi"],
              ["Yanlış aktivasyon", "Yanlış kullanım/su", "Kapat + MRCC bilgilendir"],
              ["Float-free çalışmaz", "Engelli montaj/braket", "Montajı düzelt, engeli kaldır"],
            ],
          },
        },
      ],
    },
  ],
};

export default content;
