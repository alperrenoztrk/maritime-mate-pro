import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "Ramp ve Cargo Door (Ro-Ro)",
  sectionId: "cargo-systems",
  topicIndex: 6,
  estimatedPages: 23,
  intro: `Ro-ro (roll-on/roll-off) gemilerinde rampalar ve kargo kapıları (stern/bow/side ramp, bow visor, internal ramp), tekerlekli yükün gemiye girip çıkmasını sağlar; aynı zamanda bunlar geminin su geçirmezliğinin ve emniyetinin kritik elemanlarıdır. Bow door/visor bütünlüğündeki kusur, tarihsel olarak ölümcül ro-ro kazalarının (örn. Herald of Free Enterprise, Estonia) kök nedenidir. Bu bölüm; rampa/kapı tiplerini ve hidrolik mekanizmayı, kilitleme (locking/securing) ve sızdırmazlık sistemini, gösterge/indikasyon ve köprü izlemeyi, yük dağılımı ve emniyet kilitlerini ve bakım/arızayı mühendislik derinliğinde ele alır.`,
  sources: [
    "SOLAS Ch. II-1 — bow/stern doors & watertight integrity",
    "SOLAS Ch. II-2 — ro-ro spaces",
    "IACS UR — bow/stern door securing & indication",
    "MAIB/accident reports (Herald, Estonia)",
  ],
  chapters: [
    {
      heading: "1. Rampa/Kapı Tipleri ve Mekanizma",
      sections: [
        {
          subheading: "1.1 Tipler",
          paragraphs: [
            `Ro-ro gemilerinde stern ramp/door (kıç), bow visor + bow ramp (baş), side ramp (bordo) ve dahili rampalar (internal ramp/lift) bulunur. Rampalar hem yük yolu hem de kapanınca su geçirmez bariyer işlevi görür. Hareketleri genelde hidrolik silindir/vinçle sağlanır.`,
          ],
          bullets: [
            `Stern ramp/door: en yaygın yük girişi`,
            `Bow visor + ramp: baştan giriş (kapatma kritik)`,
            `Side ramp: liman tarafı erişim`,
            `Internal ramp/lift: güverteler arası`,
          ],
        },
      ],
    },
    {
      heading: "2. Kilitleme ve Sızdırmazlık",
      sections: [
        {
          subheading: "2.1 Securing ve cleat",
          paragraphs: [
            `Kapı/rampa kapandıktan sonra çok sayıda hidrolik/mekanik kilit (locking device/cleat) paneli gövdeye sızdırmaz biçimde bastırır. Tüm kilitlerin tam oturması şarttır; eksik kilitlenme açık denizde kapı açılmasına ve su almaya yol açar.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Tarihsel ders",
              text: `Herald of Free Enterprise faciası, baş kapısının açık bırakılmasıyla yaşandı. Kapı/rampa kapanışının doğrulanması ve köprüye gösterilmesi hayati önemdedir.`,
            },
          ],
        },
        {
          subheading: "2.2 Conta ve drenaj",
          paragraphs: [
            `Rampa/kapı çevresinde conta (rubber seal) deniz suyu girişini önler; ara boşluklarda biriken su drenaj ve non-return ile dışarı atılır. Conta ezilmesi/yırtılması sızıntı yapar. Bow visor ve iç rampa arasındaki ikinci bariyer (inner door) ek koruma sağlar.`,
          ],
        },
      ],
    },
    {
      heading: "3. İndikasyon ve Emniyet",
      sections: [
        {
          subheading: "3.1 Köprü gösterimi",
          paragraphs: [
            `Bow/stern door açık/kapalı ve kilitli durumu köprüde sürekli gösterilmelidir (indication system); ayrıca su girişi için sızıntı/TV izleme bulunabilir. Kapı tam kapanıp kilitlenmeden gemi açık denize çıkamaz; bu durum prosedürle ve göstergeyle güvence altına alınır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "Indication zorunluluğu",
              text: `SOLAS/IACS, baş ve kıç kapılarının kapalı ve kilitli durumunun köprüde gösterilmesini ister; ayrıca su girişi izlemesi (leakage detection/TV) öngörülür.`,
            },
          ],
        },
        {
          subheading: "3.2 Yük dağılımı",
          paragraphs: [
            `Rampa, ağır araç yükünü yapısal olarak taşıyacak mukavemette olmalı; eksenel yük (axle load) limitleri aşılmamalıdır. Araç trafiği rampa üzerinde kontrollü ve hız sınırlı yapılır.`,
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
            `Bakım; hidrolik sistem (sızıntı/basınç), kilit ve menteşe pimi, conta durumu, indikasyon sensörleri ve drenaj non-return kontrolünü kapsar. İndikasyon sisteminin doğru çalıştığı (yanlış 'kapalı' vermemesi) düzenli test edilir.`,
          ],
          bullets: [
            `Tüm kilitlerin tam oturması doğrulanır`,
            `İndikasyon sensör testi (yanlış pozitif yok)`,
            `Conta ve drenaj non-return kontrolü`,
          ],
        },
        {
          subheading: "4.2 Arıza tablosu",
          paragraphs: [`Yaygın sorunlar:`],
          table: {
            headers: ["Belirti", "Neden", "Müdahale"],
            rows: [
              ["Kapı tam kapanmıyor/kilitlenmiyor", "Hidrolik/kilit/menteşe", "Hidrolik + kilit bakımı"],
              ["İndikasyon yanlış/yok", "Sensör/kablo arızası", "Sensör test/değişim"],
              ["Conta sızdırıyor", "Conta ezik/yırtık", "Conta değişimi"],
              ["Drenaj geri su veriyor", "Non-return tıkalı/ters", "Drenaj valf temizliği"],
            ],
          },
        },
      ],
    },
  ],
};

export default content;
