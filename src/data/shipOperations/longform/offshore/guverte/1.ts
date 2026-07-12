import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "DP ekipman sınıfı ve yedeklilik seviyesinin doğrulanması",
  shipType: "offshore",
  dept: "guverte",
  opIndex: 1,
  estimatedPages: 20,
  intro: `DP Class 1, 2 ve 3 arasındaki fark, tek hata (single failure) sonrası geminin mevkisini koruyabilme kabiliyetidir. Class notasyonu kâğıt üzerinde doğru görünse bile bir valfin, bus-tie'nin ya da bakım dışı bir bileşenin gerçek yedekliliği yok ettiği çok sık görülür. Bu bölüm, gerekli sınıfın görevle ve geminin gerçek durumuyla nasıl doğrulandığını ele alır.`,
  sources: [
    "IMO MSC.1/Circ.1580",
    "IMCA M103",
    "IMCA M166 (FMEA Management)",
    "Class DP notation & rules",
  ],
  chapters: [
    {
      heading: "1. DP Sınıfı ve Tek Hata Kriteri",
      sections: [
        {
          subheading: "1.1 Class 1/2/3 ayrımı",
          paragraphs: [
            `Class 1'de tek hata pozisyon kaybına yol açabilir; Class 2'de tek aktif bileşen hatası mevki kaybına yol açmamalıdır; Class 3'te ek olarak yangın/su basması gibi tek bölme kaybı da tolere edilir. Görev, hangi sınıfı gerektirdiğini kendi risk düzeyiyle belirler.`,
          ],
          table: {
            headers: ["Sınıf", "Tek hata kapsamı", "Tipik görev"],
            rows: [
              ["Class 1", "Yedeklilik yok", "Düşük riskli survey"],
              ["Class 2", "Aktif bileşen hatası", "Dalış, PSV, pipelay"],
              ["Class 3", "Bölme (yangın/flood) dahil", "Drilling, doygun dalış"],
            ],
          },
        },
        {
          subheading: "1.2 WCF / WCFDI tanımı",
          paragraphs: [
            `Worst Case Failure Design Intent (WCFDI), geminin tasarımca kabul ettiği en ağır tek hatadır. Online ekipmanın bu senaryoya göre elde kalan itki ve güç kapasitesi teyit edilir; gerçek konfigürasyon WCFDI'yi aşan bir kayıp üretiyorsa görev başlatılmaz.`,
          ],
        },
      ],
    },
    {
      heading: "2. Doğrulama Süreci",
      sections: [
        {
          subheading: "2.1 Belge ve konfigürasyon kontrolü",
          bullets: [
            `Class sertifikası, DP notation ve güncel FMEA'yı incele`,
            `Son proving/annual trials bulgularını ve açık limitasyonları oku`,
            `Tek hatada kaybedilebilecek DG, switchboard, thruster, kontrol PC, sensör ve PRS'yi listele`,
            `Online ekipmanın yedek gruplara doğru dağıldığını ve ortak hata kaynaklarının izole olduğunu kontrol et`,
          ],
        },
        {
          subheading: "2.2 Gizli yedeklilik kaybı",
          callouts: [
            {
              type: "warning",
              title: "Kâğıt yedekliliği aldatır",
              text: `Kâğıt üzerindeki yedeklilik; açık bir crossover valfi, yanlış bus-tie konumu veya bakım dışı tek bir bileşen nedeniyle fiilen kaybolmuş olabilir. Bu WCF sonucunu değiştirir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. TAM ve Karar",
      sections: [
        {
          subheading: "3.1 Sınıf sağlanmıyorsa",
          paragraphs: [
            `Görev için gerekli sınıf sağlanamıyorsa iş başlatılmaz. Task Appropriate Mode (TAM) yalnızca onaylı, risk temelli bir süreçle ve azaltılmış operasyon zarfıyla kullanılabilir; eksik yedekliliği otomatik olarak kabul edilebilir hale getirmez.`,
          ],
          bullets: [
            `DP class certificate güncel mi?`,
            `FMEA/FMECA ve trials bulguları kapalı mı?`,
            `WCF sonrası kalan kapasite görevi karşılıyor mu?`,
            `Redundancy checklist bağımsız kişiyle doğrulandı mı?`,
          ],
        },
      ],
    },
  ],
};

export default content;
