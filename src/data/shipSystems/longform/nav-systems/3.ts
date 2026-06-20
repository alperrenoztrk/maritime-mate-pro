import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "GPS ve Konum Belirleme Sistemleri",
  sectionId: "nav-systems",
  topicIndex: 3,
  estimatedPages: 23,
  intro: `GNSS (Global Navigation Satellite System) — GPS, GLONASS, Galileo, BeiDou — uydulardan gelen zaman damgalı sinyallerle geminin konumunu, hızını ve zamanını belirleyen birincil elektronik konumlama sistemidir. Modern köprüde ECDIS, AIS, ARPA ve dümen sistemleri GNSS konumuna bağlıdır; bu yüzden doğruluk, bütünlük (integrity) ve yedeklilik kritiktir. Bu bölüm; GNSS çalışma prensibini ve trilaterasyonu, hata kaynaklarını (iyonosfer, multipath, geometri/DOP), DGPS düzeltmesini, jamming/spoofing tehdidini ve yedek konumlama (terrestrial/dead reckoning) yaklaşımlarını ele alır.`,
  sources: [
    "SOLAS Ch. V Reg. 19 — position-fixing equipment",
    "IMO Res. A.915(22) / A.1046(27) — GNSS policy & performance",
    "IALA DGPS yönergeleri",
    "IMO MSC.1/Circ.1575 — GNSS jamming/spoofing rehberi",
  ],
  chapters: [
    {
      heading: "1. Çalışma Prensibi",
      sections: [
        {
          subheading: "1.1 Trilaterasyon ve zaman",
          paragraphs: [
            `GPS alıcısı, en az dört uydudan gelen sinyalin gidiş süresini ölçer. Her uydunun bilinen konumu ve sinyal süresinden hesaplanan mesafe (pseudorange) ile trilaterasyon yapılır; üç uydu konum, dördüncüsü alıcı saat hatasını çözer. Sinyal ışık hızıyla yayıldığından nanosaniye düzeyinde zamanlama gerekir.`,
          ],
          bullets: [
            `≥4 uydu: 3 boyut + saat çözümü`,
            `Atomik uydu saatleri referans zaman sağlar`,
            `Alıcı pseudorange'leri çözerek konum üretir`,
          ],
        },
      ],
    },
    {
      heading: "2. Hata Kaynakları ve Doğruluk",
      sections: [
        {
          subheading: "2.1 Başlıca hatalar",
          paragraphs: [
            `Konum hatasına iyonosferik/troposferik gecikme, uydu yörünge ve saat hatası, multipath (yapı/su yüzeyinden yansıma) ve alıcı gürültüsü katkı yapar. Bu hataların toplamı standart GPS'te birkaç metre seviyesindedir.`,
          ],
          table: {
            headers: ["Hata kaynağı", "Tipik etki", "Azaltma"],
            rows: [
              ["İyonosfer", "Birkaç m", "Çift frekans / DGPS"],
              ["Multipath", "Değişken", "Anten yerleşimi"],
              ["Uydu saat/yörünge", "~m", "DGPS düzeltmesi"],
              ["Geometri (DOP)", "Çarpan etki", "İyi uydu dağılımı"],
            ],
          },
        },
        {
          subheading: "2.2 DOP ve geometri",
          paragraphs: [
            `DOP (Dilution of Precision), uyduların gökyüzündeki dağılımının doğruluğa etkisidir. Uydular birbirine yakınsa (kötü geometri) HDOP yükselir ve konum hatası büyür. Alıcı genelde HDOP yüksekken uyarı verir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "HDOP izleme",
              text: `Dar kanal ve hassas manevrada HDOP değeri izlenmeli; yüksek HDOP'ta konuma tek başına güvenilmemeli, görsel/radar teyidi yapılmalıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. DGPS ve İyileştirme",
      sections: [
        {
          subheading: "3.1 Diferansiyel düzeltme",
          paragraphs: [
            `DGPS (Differential GPS), konumu bilinen kıyı referans istasyonunun ölçtüğü hatayı yayınlamasıyla çalışır; gemi bu düzeltmeyi uygulayarak doğruluğu birkaç metreden sub-metre seviyesine indirir. IALA radyo işaretçileri ve SBAS (örn. EGNOS/WAAS) bu düzeltmeyi sağlar.`,
          ],
        },
      ],
    },
    {
      heading: "4. Tehditler, Yedeklilik ve Arıza",
      sections: [
        {
          subheading: "4.1 Jamming ve spoofing",
          paragraphs: [
            `GNSS sinyali çok zayıf olduğundan karıştırma (jamming, sinyali boğma) ve aldatma (spoofing, sahte sinyalle yanlış konum) tehdidine açıktır. Belirli bölgelerde GPS kaybı veya ani konum sıçraması spoofing işareti olabilir; bu durumda bağımsız konumlama (radar fix, terrestrial, çift GNSS) devreye alınır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Konum sıçraması",
              text: `Ani, açıklanamayan konum atlaması veya tüm köprü sistemlerinde eşzamanlı GPS kaybı spoofing/jamming işareti olabilir; gemi seyri görsel ve radar ile doğrulanmalıdır.`,
            },
          ],
        },
        {
          subheading: "4.2 Yedeklilik ve arıza tablosu",
          paragraphs: [
            `İki bağımsız GNSS alıcısı, dead reckoning (DR) yeteneği ve terrestrial fix becerisi yedekliliği sağlar. GNSS kaybında zabit DR ve radar/visual fix ile seyri sürdürebilmelidir.`,
          ],
          table: {
            headers: ["Belirti", "Neden", "Müdahale"],
            rows: [
              ["Konum yok / 'no fix'", "Anten, uydu görüşü, jamming", "Anten kontrolü, yedek alıcı, DR'a geç"],
              ["Düşük doğruluk", "Yüksek HDOP, DGPS kaybı", "Geometri/DGPS kontrolü"],
              ["Konum sıçraması", "Multipath / spoofing", "Bağımsız fix ile teyit"],
              ["Zaman/UTC hatası", "Alıcı saat sorunu", "Alıcı reset/servis"],
            ],
          },
        },
      ],
    },
  ],
};

export default content;
