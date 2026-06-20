import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "VDR / S-VDR (Voyage Data Recorder)",
  sectionId: "gmdss-lsa",
  topicIndex: 7,
  estimatedPages: 22,
  intro: `VDR (Voyage Data Recorder), uçaklardaki "kara kutu"nun denizcilik eşdeğeridir: köprüdeki seyir verilerini, sesleri, radar/ECDIS görüntüsünü ve gemi sensörlerini sürekli kaydederek kaza sonrası araştırmaya (accident investigation) kanıt sağlar. S-VDR (Simplified VDR) daha az veri kaydeden basitleştirilmiş versiyondur. Bu bölüm; VDR kaydedilen veri setini, koruyucu kapsül (fixed + float-free) ve veri saklama süresini, S-VDR farkını, APT (Annual Performance Test) ve kaza sonrası veri koruma prosedürünü, SOLAS gereksinimini ve bakım/arızayı mühendislik derinliğinde ele alır.`,
  sources: [
    "SOLAS Ch. V Reg. 20 — VDR carriage",
    "IMO Res. MSC.333(90) — VDR performance standards",
    "IMO Res. MSC.163(78) — S-VDR",
    "Flag/klas VDR APT gereksinimleri",
  ],
  chapters: [
    {
      heading: "1. Kaydedilen Veri",
      sections: [
        {
          subheading: "1.1 Veri seti",
          paragraphs: [
            `VDR; köprü sesi (mikrofonlar), VHF haberleşmesi, radar/ECDIS görüntüsü, konum/hız/heading, derinlik, dümen ve makine komutları, alarmlar, rüzgar ve diğer sensörleri zaman damgasıyla kaydeder. Bu çok kaynaklı kayıt, kaza anının yeniden kurgulanmasını (reconstruction) sağlar.`,
          ],
          bullets: [
            `Köprü sesi + VHF`,
            `Radar/ECDIS ekran görüntüsü`,
            `Konum, hız, heading, derinlik`,
            `Dümen/makine komutları, alarmlar`,
          ],
        },
      ],
    },
    {
      heading: "2. Kapsül ve Saklama",
      sections: [
        {
          subheading: "2.1 Koruyucu kapsül",
          paragraphs: [
            `Veriler, yangın ve derin basınç/çarpmaya dayanıklı koruyucu bir kayıt ortamında (protective capsule) saklanır. Modern VDR'lerde hem sabit (fixed, geminin batışında kurtarılır) hem float-free (suyla yüzeye çıkıp EPIRB gibi sinyal veren) kapsül bulunur. Float-free kapsül batık gemiden veri kurtarmayı kolaylaştırır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Float-free avantajı",
              text: `Float-free kapsül, gemi batsa bile yüzeye çıkarak konum yayınlar; sabit kapsülün dalış kurtarma zorluğunu ortadan kaldırır.`,
            },
          ],
        },
        {
          subheading: "2.2 Saklama süresi",
          paragraphs: [
            `VDR son belirli süreyi (kapsülde tipik en az 48 saat, modern standartlarda iç hafızada daha uzun) sürekli üzerine yazarak (loop) saklar. Kaza/önemli olay sonrası bu döngü durdurulmalı ve veri korunmalıdır (save/lock), aksi halde üzerine yazılır.`,
          ],
        },
      ],
    },
    {
      heading: "3. S-VDR, APT ve Veri Koruma",
      sections: [
        {
          subheading: "3.1 S-VDR farkı",
          paragraphs: [
            `S-VDR (Simplified), tam VDR'ye göre daha az veri kaydeder (örn. radar görüntüsü zorunlu olmayabilir); mevcut (retrofit) gemilerde maliyet nedeniyle kullanılmıştır. Yeni gemilerde tam VDR standarttır.`,
          ],
        },
        {
          subheading: "3.2 APT ve kaza sonrası koruma",
          paragraphs: [
            `VDR yılda bir APT (Annual Performance Test) ile yetkili servis tarafından test edilir ve uygunluk belgesi düzenlenir. Kaza durumunda kaptan, verinin üzerine yazılmasını engellemek için kaydı durdurup veriyi korumalı (preserve) ve yetkililere teslim etmelidir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "Veriyi koru",
              text: `Ciddi kaza/olaydan sonra VDR kaydı derhal kaydedilip kilitlenmeli; döngüsel kayıt durdurulmazsa kritik veri kaybolur.`,
            },
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
            `Bakım; APT, mikrofon/ses kanalı kontrolü, sensör girişlerinin (radar, GPS, gyro) doğru kaydı, kapsül durumu, batarya (yedek güç) ve float-free HRU son kullanma kontrolünü kapsar.`,
          ],
          bullets: [
            `APT (yıllık yetkili test)`,
            `Mikrofon/ses kanalları çalışıyor`,
            `Float-free kapsül HRU son kullanma`,
          ],
        },
        {
          subheading: "4.2 Arıza tablosu",
          paragraphs: [`Yaygın sorunlar:`],
          table: {
            headers: ["Belirti", "Neden", "Müdahale"],
            rows: [
              ["Bir kaynak kaydedilmiyor", "Sensör girişi/kablo", "Giriş bağlantısı kontrolü"],
              ["Ses kaydı yok/zayıf", "Mikrofon arızası", "Mikrofon test/değişim"],
              ["Yedek güç çalışmıyor", "Batarya", "Batarya test/değişim"],
              ["APT başarısız", "Sistem/sensör uyumsuzluğu", "Yetkili servis onarımı"],
            ],
          },
        },
      ],
    },
  ],
};

export default content;
