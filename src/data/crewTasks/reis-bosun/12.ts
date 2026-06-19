import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Painting program ve corrosion management",
  roleSlug: "reis-bosun",
  taskIndex: 12,
  estimatedPages: 24,
  intro: `Boya, bir geminin estetiği değil; çelik gövdeyi korozyondan koruyan birincil savunma hattıdır. İyi yönetilen bir boya programı, geminin yapısal ömrünü uzatır ve maliyetli onarımları önler. Reis (Bosun), Birinci Zabitin onayladığı boya planına (paint scheme) uygun olarak yüzey hazırlığı (chipping, grinding, descaling), primer, ara kat ve son kat uygulamalarını yönetir; boya stoğu, batch kaydı ve hava koşullarına (dew point, sıcaklık) göre uygulama planını yapar. Bu bölüm boya programı ve korozyon yönetimini ele alır.`,
  sources: [
    "Boya üreticisi (paint maker) teknik veri sayfaları (TDS)",
    "ISO 8501 — yüzey hazırlık standartları (Sa 2.5 vb.)",
    "IMO PSPC — Performance Standard for Protective Coatings",
    "Code of Safe Working Practices (COSWP)",
    "Klas — yapısal korozyon ve coating condition",
  ],
  chapters: [
    {
      heading: "1. Korozyonla Mücadele",
      sections: [
        {
          subheading: "1.1 Boya = yapısal koruma",
          paragraphs: [
            `Deniz ortamı çeliği hızla korozyona uğratır; boya, bu korozyona karşı birincil bariyerdir. İyi yönetilen bir coating, gövde ve güverte çeliğinin ömrünü onyıllarca uzatır; ihmal edilen korozyon ise yapısal zayıflığa ve pahalı çelik yenilemeye yol açar. Reis bu mücadelenin saha lideridir.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "Coating condition",
              text: `Klas ve PSC, özellikle balast tankı ve kritik alanlarda coating durumunu (good/fair/poor) değerlendirir. Kötü coating, daha sık denetim ve onarım yükümlülüğü getirir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Yüzey Hazırlığı",
      sections: [
        {
          subheading: "2.1 Hazırlık = boyanın yarısı",
          paragraphs: [
            `Boyanın tutması, tümüyle yüzey hazırlığına bağlıdır. Chipping (raspa), grinding (taşlama), descaling (tufal/pas giderme) ile yüzey temizlenir; gevşek pas, eski boya ve tuz kalıntısı kaldırılır. Reis, hazırlık seviyesinin (örn. Sa 2.5 blast cleanliness) plana uygun olmasını sağlar. Kötü hazırlanan yüzeyde en iyi boya bile tutmaz.`,
          ],
          bullets: [
            `Chipping/grinding ile pas/tufal giderme`,
            `Salt contamination testi (tuz kalıntısı)`,
            `Blast cleanliness standardı (Sa 2.5 vb.)`,
            `Toz/yağ temizliği`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Tuz testini atlamayın",
              text: `Görünür temiz bir yüzeyde bile tuz kalıntısı kalabilir ve boyanın altından korozyon başlatır. Salt contamination testi, kalıcı bir boya için kritik ama sık atlanan bir adımdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Kat Sistemi",
      sections: [
        {
          subheading: "3.1 Primer, ara kat, son kat",
          paragraphs: [
            `Boya sistemi katmanlıdır: primer (yapışma/korozyon koruması), intermediate (kalınlık/bariyer) ve topcoat (dış koruma/estetik). Reis, paint scheme'e uygun kat sırasını, kuru film kalınlığını (DFT) ve katlar arası bekleme (overcoat) sürelerini uygular. Yanlış sıra veya yetersiz kalınlık koruma ömrünü kısaltır.`,
          ],
          table: {
            caption: "Kat sistemi (genel)",
            headers: ["Kat", "İşlev"],
            rows: [
              ["Primer", "Yapışma + korozyon koruması"],
              ["Intermediate", "Bariyer + film kalınlığı"],
              ["Topcoat", "Dış koruma + estetik/UV"],
            ],
          },
        },
      ],
    },
    {
      heading: "4. Hava Koşulları ve Uygulama",
      sections: [
        {
          subheading: "4.1 Dew point ve sıcaklık",
          paragraphs: [
            `Boya, hava ve yüzey koşulları uygun olduğunda uygulanır. Yüzey sıcaklığı çiğ noktasının (dew point) genelde en az 3°C üzerinde olmalı; aksi halde yüzeyde nem yoğuşur ve boya tutmaz. Nem, sıcaklık ve rüzgâr ölçülür. Reis, uygulamayı bu koşullara göre planlar.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Dew point ihlali = boya hatası",
              text: `Çiğ noktasına yakın veya altında boya yapmak, yüzeyde görünmez nem nedeniyle yapışma hatası (blistering, delaminasyon) yaratır. Koşullar uygun değilse iş ertelenir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Stok ve Kayıt",
      sections: [
        {
          subheading: "5.1 Boya stoğu ve batch kaydı",
          paragraphs: [
            `Reis; boya stoğunu, karışım oranlarını (iki bileşenli boyalar) ve batch number kayıtlarını izler. Uygulanan kat, alan, DFT ve koşullar kaydedilir. Bu kayıtlar hem garanti/uyum hem de bir sonraki bakım planlaması için değerlidir.`,
          ],
        },
      ],
    },
    {
      heading: "6. Güvenlik",
      sections: [
        {
          subheading: "6.1 Boya işinde KKD",
          paragraphs: [
            `Chipping/grinding göz/solunum riski, boya ise solvent buharı ve yangın riski taşır. Uygun KKD (gözlük, solunum maskesi, eldiven), havalandırma ve ateş kaynağından uzaklık şarttır. Kapalı alanda boyama enclosed space ve atmosfer kurallarına tabidir.`,
          ],
        },
      ],
    },
    {
      heading: "7. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "7.1 Boya programı kontrolü",
          bullets: [
            `Paint scheme Birinci Zabit onaylı mı?`,
            `Yüzey hazırlığı (chipping/grinding, tuz testi, cleanliness) yapıldı mı?`,
            `Primer/ara/son kat sırası ve DFT plana uygun mu?`,
            `Dew point/sıcaklık/nem ölçülüp uygun mu?`,
            `Boya stoğu, karışım oranı ve batch kaydı tutuluyor mu?`,
            `KKD, havalandırma ve yangın güvenliği sağlandı mı?`,
            `Uygulama (alan/kat/koşul) kaydedildi mi?`,
          ],
          paragraphs: [
            `Boya programı ve korozyon yönetimi, Reisin geminin yapısal ömrüne doğrudan katkı yaptığı bir görevdir. İyi yüzey hazırlığı, doğru kat sistemi ve hava koşullarına saygı; çeliği korozyondan koruyan kalıcı bir savunma kurar ve geminin uzun vadeli sağlığını güvence altına alır.`,
          ],
        },
      ],
    },
  ],
};

export default content;
