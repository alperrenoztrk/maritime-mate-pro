import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "MF/HF DSC Telsizi (Inmarsat Alternatifi)",
  sectionId: "gmdss-lsa",
  topicIndex: 2,
  estimatedPages: 23,
  intro: `MF (Medium Frequency) ve HF (High Frequency) telsizleri, VHF menzilinin ötesinde — A2 (MF) ve A4 dahil tüm dünyada (HF) — tehlike uyarısı ve haberleşme sağlar; uydu (Inmarsat) kapsamı dışındaki kutup bölgeleri (A4) için HF zorunludur. DSC entegrasyonu ile dijital tehlike çağrısı gönderilir. Bu bölüm; MF/HF yayılım fiziğini (ground wave/sky wave) ve menzili, tehlike frekanslarını (2187.5 kHz MF DSC, HF DSC bantları), DSC ve sesli/NBDP modlarını, anten/tuner ve toprak sistemini, A2/A4 ekipman rolünü ve bakım/arızayı mühendislik derinliğinde ele alır.`,
  sources: [
    "SOLAS Ch. IV — MF/HF installations",
    "ITU Radio Regulations — distress frequencies",
    "ITU-R M.493 / M.541 — DSC procedures",
    "IMO GMDSS Manual",
  ],
  chapters: [
    {
      heading: "1. Yayılım ve Menzil",
      sections: [
        {
          subheading: "1.1 Ground wave ve sky wave",
          paragraphs: [
            `MF (yaklaşık 1.6-4 MHz) gündüz ground wave (yüzey dalgası) ile ~150-300 mil menzil verir; gece sky wave ile uzar. HF (3-30 MHz) iyonosferden yansıyarak (sky wave) binlerce mil, hatta küresel menzile ulaşır; ancak menzil frekansa, günün saatine ve iyonosfer koşullarına bağlı değişir.`,
          ],
          bullets: [
            `MF: ground wave, A2 menzili (~150 mil)`,
            `HF: sky wave, küresel (A4 dahil)`,
            `HF menzili frekans/saat/iyonosfere bağlı`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Doğru HF frekansı",
              text: `HF'te menzil için doğru bandı seçmek gerekir: gündüz yüksek, gece düşük frekanslar daha iyi yayılır. Yanlış bant menzili düşürür.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Tehlike Frekansları ve Modlar",
      sections: [
        {
          subheading: "2.1 DSC frekansları",
          paragraphs: [
            `MF DSC tehlike frekansı 2187.5 kHz'tir; HF'te ise 4, 6, 8, 12, 16 MHz bantlarında ayrı DSC tehlike frekansları vardır. Tehlike çağrısı uygun frekanstan DSC ile gönderilir; alıcı kıyı istasyonu otomatik alır. Sesli (radiotelephony) ve NBDP (telex) tehlike frekansları da tanımlıdır.`,
          ],
          table: {
            headers: ["Bant", "DSC tehlike frekansı"],
            rows: [
              ["MF", "2187.5 kHz"],
              ["HF 8 MHz", "8414.5 kHz"],
              ["HF 16 MHz", "16804.5 kHz"],
              ["Sesli (MF)", "2182 kHz"],
            ],
            caption: "Başlıca tehlike frekansları (örnek)",
          },
        },
        {
          subheading: "2.2 DSC ve NBDP",
          paragraphs: [
            `DSC ile çağrı kurulduktan sonra sesli (RT) veya NBDP (Narrow Band Direct Printing/telex) ile içerik aktarılır. NBDP, gürültülü HF ortamında metni güvenilir iletir. Tehlike sonrası kıyı istasyonu çoğunlukla sesli takip yapar.`,
          ],
        },
      ],
    },
    {
      heading: "3. Anten, Tuner ve A2/A4 Rolü",
      sections: [
        {
          subheading: "3.1 Anten ve toprak",
          paragraphs: [
            `MF/HF, uzun tel/whip anten ve otomatik anten tuner (ATU) ile farklı frekanslara uyumlanır. İyi bir RF toprak (ground) sistemi (gövde/deniz toprağı) verimi belirler; kötü toprak menzili ve çıkış gücünü düşürür. ATU arızası belirli bantlarda yayını engeller.`,
          ],
        },
        {
          subheading: "3.2 A2/A4 ekipman rolü",
          paragraphs: [
            `A2 gemisi MF DSC taşır; A4 (kutup) gemisi HF DSC zorunludur çünkü Inmarsat GEO uyduları kutuplarda kapsama vermez. A3 gemileri MF/HF'i Inmarsat'a alternatif/yedek olarak da taşıyabilir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "A4'te HF şart",
              text: `Kutup bölgelerinde uydu kapsaması olmadığından HF DSC tek küresel tehlike haberleşme yoludur; A4 gemisi HF olmadan sefer yapamaz.`,
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
            `Günlük/haftalık DSC testi, anten/tuner ve toprak sistemi kontrolü, batarya testi ve radyo log tutulur. Test gerçek tehlike frekansında değil, uygun test prosedürüyle yapılır.`,
          ],
        },
        {
          subheading: "4.2 Arıza tablosu",
          paragraphs: [`Yaygın sorunlar:`],
          table: {
            headers: ["Belirti", "Neden", "Müdahale"],
            rows: [
              ["Belirli bantta yayın yok", "ATU/anten uyumsuzluğu", "Tuner ve anten kontrolü"],
              ["Menzil zayıf", "Toprak sistemi/güç", "RF ground ve çıkış gücü kontrol"],
              ["DSC alınmıyor/gitmiyor", "Frekans/konfig", "Frekans ve MMSI kontrol"],
              ["Aşırı parazit", "Gemi içi gürültü", "Parazit kaynağı izolasyonu"],
            ],
          },
        },
      ],
    },
  ],
};

export default content;
