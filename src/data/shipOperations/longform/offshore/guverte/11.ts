import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "DP alarmı, pozisyon kaybı ve alert response",
  shipType: "offshore",
  dept: "guverte",
  opIndex: 11,
  estimatedPages: 20,
  intro: `DP alarmlarına verilen tepki, önceden planlanmış ve drill'le çalışılmış olmalıdır; olay anında karar üretmeye çalışmak çok geç kalır. Advisory, Yellow ve Red tetikleyicilerinde öncelik insan, sonra ekipman ve tesis güvenliğidir. Bu bölüm alarmın tanınmasından acil ayrılma/kaçışa kadar olan tepki zincirini ele alır.`,
  sources: [
    "IMCA M220",
    "IMCA M103",
    "Vessel ASOG & Emergency response plan",
  ],
  chapters: [
    {
      heading: "1. Alarmın Tanınması",
      sections: [
        {
          subheading: "1.1 Kaynağı oku, aceleyle acknowledge etme",
          paragraphs: [
            `Alarm tanınır; acknowledge etmeden önce kaynağı ve zamanı okunur, mevki-baş trendi kontrol edilir. ASOG statüsü ilan edilip Master, ECR ve görev kontrol merkezleri belirlenmiş kanaldan bilgilendirilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Araştırmak için gecikme",
              text: `Nedeni araştırmak için acil eylemi geciktirmek, temas veya umbilical/riser hasarına yol açabilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Kademeli Tepki",
      sections: [
        {
          subheading: "2.1 Yellow ve Red aksiyonları",
          bullets: [
            `Yellow: faaliyeti güvenli safhaya al; dalış çanı, ROV, gangway, hortum veya yük için hazırlık aksiyonu`,
            `Red / kontrolsüz hareket: acil ayırma/geri alma, manual/independent joystick veya kaçış manevrası`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Yanlış kontrol modu",
              text: `Yanlış kontrol moduna geçiş drive-off'u büyütebilir; bu görevler drill ile önceden çalışılmalıdır.`,
            },
          ],
        },
        {
          subheading: "2.2 Kanıt ve yeniden başlama",
          paragraphs: [
            `Alarm, DP, PMS/VMS ve iletişim kayıtları korunur; olay sonrası yeniden başlama yetkisi resmi süreçle alınır.`,
          ],
        },
      ],
    },
    {
      heading: "3. Kontrol Listesi",
      sections: [
        {
          subheading: "3.1 Alert response son kontrol",
          bullets: [
            `Alarm kaynağı ve trend okundu mu?`,
            `ASOG ilan edilip taraflar bilgilendirildi mi?`,
            `Yellow/Red için planlı aksiyon uygulandı mı?`,
            `Kayıtlar korundu ve restart resmi süreçle mi verildi?`,
          ],
        },
      ],
    },
  ],
};

export default content;
