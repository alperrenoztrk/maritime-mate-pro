import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Teknik bilgi ve sistem öğrenimi",
  roleSlug: "guverte-stajyer",
  taskIndex: 6,
  estimatedPages: 22,
  intro: `Bir güverte zabiti, gemiyi gerçekten anlamadan güvenle yönetemez. Güverte stajyeri; ballast, sintine (bilge), yangın ana hattı (fire main), dümen donanımı (steering gear) ve demir donanımı (anchoring) gibi gemi sistemlerini, köprüüstü cihazlarını ve yük operasyon prensiplerini sistematik olarak öğrenir. Kaptan ve zabitlerin verdiği eğitim modüllerini tamamlar. Bu bölüm stajyerin teknik bilgi ve sistem öğrenimini ele alır.`,
  sources: [
    "STCW — OICNW yetkinlikleri (teknik bilgi)",
    "Gemi sistem diyagramları ve maker el kitapları",
    "SOLAS Chapter V — köprüüstü ekipmanı",
    "IMO model courses — onboard training",
    "Şirket eğitim modülleri",
  ],
  chapters: [
    {
      heading: "1. Sistematik Öğrenme",
      sections: [
        {
          subheading: "1.1 Gemiyi tanımak",
          paragraphs: [
            `Stajyer, gemiyi bir sistemler bütünü olarak öğrenir: her sistemin amacı, çalışma mantığı, kontrolleri ve acil durumdaki davranışı. Bu öğrenme, ezber değil anlama üzerine kuruludur; bir sistemin "neden" öyle çalıştığını bilmek, arıza ve acil durumda doğru karar vermeyi sağlar.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Diyagramı takip et",
              text: `Bir sistemi öğrenirken hattı fiziksel olarak takip etmek (valf, pompa, tank) çok değerlidir. Kâğıttaki diyagramı gerçek borularla eşleştirmek, kalıcı anlama sağlar.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Gemi Sistemleri",
      sections: [
        {
          subheading: "2.1 Temel sistemler",
          paragraphs: [
            `Stajyer; ballast (stabilite/trim), bilge (sintine tahliyesi), fire main (yangın suyu), steering gear (dümen) ve anchoring (demir) sistemlerini öğrenir. Her birinin amacı, kontrolü ve emniyetteki rolü kavranır. Örneğin fire main'in her zaman basınçlı tutulmasının neden hayati olduğunu öğrenir.`,
          ],
          table: {
            caption: "Temel gemi sistemleri",
            headers: ["Sistem", "Amaç"],
            rows: [
              ["Ballast", "Stabilite, trim, draft kontrolü"],
              ["Bilge", "Sintine suyu tahliyesi"],
              ["Fire main", "Yangın suyu dağıtımı"],
              ["Steering gear", "Dümen kontrolü"],
              ["Anchoring", "Demirleme donanımı"],
            ],
          },
        },
      ],
    },
    {
      heading: "3. Köprüüstü Cihazları",
      sections: [
        {
          subheading: "3.1 Seyir ekipmanı",
          paragraphs: [
            `Stajyer; ECDIS, radar/ARPA, AIS, GMDSS, gyro/manyetik pusula ve echo sounder gibi köprüüstü cihazlarını tanır. Her cihazın yeteneği ve sınırı öğrenilir; cihazların çapraz kontrolle birlikte kullanılması gerektiği kavranır. Bu temel, ileride güvenli vardiya tutmanın anahtarıdır.`,
          ],
        },
      ],
    },
    {
      heading: "4. Yük Operasyon Prensipleri",
      sections: [
        {
          subheading: "4.1 Gemi tipine göre yük",
          paragraphs: [
            `Stajyer; gemi tipine göre (bulk, tanker, container, ro-ro) yük operasyonunun temel prensiplerini, stabilite/mukavemet etkisini ve emniyet tedbirlerini öğrenir. Tehlikeli yük (IMDG/IMSBC) farkındalığı bu dönemde başlar. Yükün gemiyi nasıl etkilediğini anlamak, zabitlik için temeldir.`,
          ],
        },
      ],
    },
    {
      heading: "5. Eğitim Modülleri",
      sections: [
        {
          subheading: "5.1 Yapılandırılmış eğitim",
          paragraphs: [
            `Kaptan ve zabitler, stajyere yapılandırılmış eğitim modülleri verir. Stajyer bunları tamamlar, sorular sorar ve öğrendiklerini TRB'ye işler. Aktif katılım — izlemek yerine yapmak ve sormak — öğrenmeyi kalıcı kılar.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Soru sormanın değeri",
              text: `Bir sistemin "neden" öyle olduğunu sormak, stajyeri yüzeysel bilgiden gerçek anlayışa taşır. Zabitler, meraklı ve soru soran stajyeri değerli bulur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "6.1 Sistem öğrenimi kontrolü",
          bullets: [
            `Ballast/bilge/fire main/steering/anchoring sistemleri öğrenildi mi?`,
            `Köprüüstü cihazlarının yeteneği ve sınırı kavrandı mı?`,
            `Yük operasyonu prensipleri (gemi tipine göre) öğrenildi mi?`,
            `Sistem diyagramları fiziksel hatla eşleştirildi mi?`,
            `Eğitim modülleri tamamlandı ve TRB'ye işlendi mi?`,
            `Bilinmeyenler zabitlere soruldu mu?`,
          ],
          paragraphs: [
            `Teknik bilgi ve sistem öğrenimi, güverte stajyerini geleceğin yetkin zabitine dönüştüren çekirdektir. Gemiyi gerçekten anlamak — ezber değil mantık — stajyerin ileride arıza, acil durum ve karmaşık operasyonlarda doğru karar vermesinin temelini kurar.`,
          ],
        },
      ],
    },
  ],
};

export default content;
