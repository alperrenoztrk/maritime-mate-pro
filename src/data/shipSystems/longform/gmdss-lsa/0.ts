import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "GMDSS Genel Mimarisi ve Sea Areas",
  sectionId: "gmdss-lsa",
  topicIndex: 0,
  estimatedPages: 25,
  intro: `GMDSS (Global Maritime Distress and Safety System), tehlike (distress) durumunda geminin otomatik ve hızlı olarak kıyı arama-kurtarma (SAR) ve yakın gemilerle haberleşmesini garanti eden, SOLAS gereği zorunlu küresel haberleşme sistemidir. Sistemin temel mantığı, "ne aranır" değil "hangi deniz alanında hangi ekipman" yaklaşımıdır. Bu bölüm; GMDSS'in temel fonksiyonlarını (distress alerting, SAR coordination, MSI), sea area tanımlarını (A1-A4) ve her alana göre ekipman gereksinimini, DSC mantığını, MSI yayınlarını (NAVTEX/SafetyNET) ve yedeklilik/güç gereksinimlerini ile bakım/sertifikasyonu mühendislik derinliğinde ele alır.`,
  sources: [
    "SOLAS Ch. IV — Radiocommunications (GMDSS)",
    "ITU Radio Regulations",
    "IMO GMDSS Manual",
    "IMO Res. — MSI / NAVTEX / SafetyNET",
  ],
  chapters: [
    {
      heading: "1. GMDSS Mantığı",
      sections: [
        {
          subheading: "1.1 Temel fonksiyonlar",
          paragraphs: [
            `GMDSS dokuz işlevi garanti eder; en kritikleri: tehlike uyarısı (gemi→kıyı, kıyı→gemi, gemi→gemi), SAR koordinasyonu, olay yeri (on-scene) haberleşmesi, locating (SART), denizcilik emniyet bilgisi (MSI) ve genel haberleşmedir. Amaç, hiçbir tehlike çağrısının fark edilmeden kalmamasıdır.`,
          ],
          bullets: [
            `Distress alerting: 3 yönlü (gemi-kıyı-gemi)`,
            `SAR koordinasyon ve on-scene haberleşme`,
            `MSI: seyir/hava/tehlike uyarıları`,
            `Locating: SART ile konum belirleme`,
          ],
        },
        {
          subheading: "1.2 DSC mantığı",
          paragraphs: [
            `DSC (Digital Selective Calling), tehlike çağrısını dijital olarak (gemi kimliği MMSI, konum, tehlike türü ile) tek tuşla gönderir; kıyı istasyonu ve gemiler bu çağrıyı otomatik alır ve alarm verir. Böylece sesli çağrıyı sürekli dinleme zorunluluğu kalkar, çağrı kaçırılmaz.`,
          ],
        },
      ],
    },
    {
      heading: "2. Sea Areas (A1-A4)",
      sections: [
        {
          subheading: "2.1 Alan tanımları",
          paragraphs: [
            `GMDSS ekipmanı, geminin seyrettiği deniz alanına göre belirlenir. A1: VHF kıyı istasyonu menzili (~20-30 mil). A2: MF kıyı istasyonu menzili (~100-150 mil). A3: Inmarsat (GEO uydu) kapsama alanı (~70°K-70°G). A4: kutup bölgeleri (Inmarsat kapsamı dışı, HF gerekli).`,
          ],
          table: {
            headers: ["Alan", "Kapsama", "Birincil ekipman"],
            rows: [
              ["A1", "VHF kıyı (~20-30 mil)", "VHF DSC"],
              ["A2", "MF kıyı (~150 mil)", "MF DSC + VHF"],
              ["A3", "Inmarsat (uydu)", "Inmarsat-C / MF-HF + VHF"],
              ["A4", "Kutup bölgeleri", "HF DSC + VHF (Inmarsat yok)"],
            ],
          },
        },
        {
          subheading: "2.2 Kümülatif ekipman",
          paragraphs: [
            `Ekipman gereksinimi kümülatiftir: A3 gemisi A1 ve A2 ekipmanını da taşır. Her gemi ayrıca EPIRB, SART ve taşınabilir VHF (survival craft) bulundurur. Ekipman seçimi, geminin en uzak çalışma alanına göre yapılır.`,
          ],
        },
      ],
    },
    {
      heading: "3. MSI, Güç ve Yedeklilik",
      sections: [
        {
          subheading: "3.1 MSI: NAVTEX ve SafetyNET",
          paragraphs: [
            `Denizcilik emniyet bilgisi (MSI) — seyir uyarıları, hava raporları, SAR bilgisi — otomatik alınır. NAVTEX (518 kHz) kıyıya yakın bölgede, Inmarsat SafetyNET ise açık denizde (A3/A4) MSI sağlar. Bu yayınlar sürekli ve otomatik kaydedilir.`,
          ],
        },
        {
          subheading: "3.2 Güç ve yedeklilik",
          paragraphs: [
            `GMDSS, ana güç kaybında bile çalışmalıdır; bu yüzden ayrı akü (reserve source of energy) GMDSS ekipmanını belirli süre (tipik 1-6 saat, konfigürasyona göre) besler. Ekipman yedekliliği "duplication" veya "shore-based maintenance" yöntemiyle sağlanır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "Yedek enerji",
              text: `GMDSS yedek akü kapasitesi ve şarjı düzenli test edilir; tehlike anında ana güç gitse bile haberleşme sürmelidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Sertifikasyon, Bakım ve Arıza",
      sections: [
        {
          subheading: "4.1 Operatör ve bakım",
          paragraphs: [
            `GMDSS ekipmanını yetkili operatör (GOC/ROC sertifikalı) kullanır. Yedeklilik yöntemine göre periyodik testler (günlük/haftalık/aylık) ve radyo log kaydı tutulur. Yanlış (false) tehlike uyarısı verilirse derhal iptal edilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Yanlış alarm iptali",
              text: `Yanlışlıkla gönderilen DSC distress derhal ilgili kıyı istasyonuna bildirilerek iptal edilmelidir; aksi halde gereksiz SAR seferberliği başlar.`,
            },
          ],
        },
        {
          subheading: "4.2 Arıza tablosu",
          paragraphs: [`Yaygın sorunlar:`],
          table: {
            headers: ["Belirti", "Neden", "Müdahale"],
            rows: [
              ["DSC çağrı gitmiyor", "Anten/güç/MMSI", "Anten + güç + konfig kontrol"],
              ["Konum çağrıya girmiyor", "GNSS besleme yok", "GPS girişini kontrol et"],
              ["NAVTEX almıyor", "Anten/alıcı/frekans", "Anten ve alıcı kontrolü"],
              ["Yedek akü zayıf", "Batarya yaşlanması", "Akü test/değişim"],
            ],
          },
        },
      ],
    },
  ],
};

export default content;
