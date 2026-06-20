import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "Inert Gas Sistemi (IGS)",
  sectionId: "fire-safety",
  topicIndex: 4,
  estimatedPages: 26,
  intro: `Inert gaz sistemi (IGS), tanker kargo tanklarındaki oksijen seviyesini yanma olamayacak düzeye (≤%8) düşürerek patlamayı önleyen, petrol tankerlerinin en kritik emniyet sistemidir. Tank atmosferi "too rich to burn" (yanmayacak kadar zengin) tutulur ve hidrokarbon buharı-oksijen-tutuşma üçgeni kırılır. Bu bölüm; IG üretimini (flue gas / inert gas generator), gaz şartlandırmayı (scrubber, soğutma, kurutma), emniyet bariyerlerini (deck water seal, non-return valf, P/V valf), oksijen ve basınç izlemeyi, kargo operasyonuyla ilişkisini (yükleme/boşaltma/tank temizliği) ve bakım/arızayı mühendislik derinliğinde ele alır.`,
  sources: [
    "SOLAS Ch. II-2 Reg. 4 — inert gas systems",
    "FSS Code Ch. 15 — inert gas",
    "ISGOTT 6th edition — inert gas & tank atmosphere",
    "IMO MSC.1/Circ.1582 — IG guidance",
  ],
  chapters: [
    {
      heading: "1. IGS Mantığı",
      sections: [
        {
          subheading: "1.1 Yangın üçgeni ve oksijen kontrolü",
          paragraphs: [
            `Yanma için yakıt, oksijen ve tutuşma kaynağı gerekir. Tanker tankında hidrokarbon buharı ve statik elektrik/kıvılcım kaçınılmaz olabilir; IGS oksijeni kontrol ederek üçgeni kırar. Tank atmosferi ≤%8 O₂'de tutulduğunda hangi buhar konsantrasyonu olursa olsun patlama oluşamaz.`,
          ],
          bullets: [
            `Hedef: tank O₂ ≤ %8 (genelde ~%5'te tutulur)`,
            `Pozitif basınç: dışarıdan hava girişini engeller`,
            `"Too rich to burn" güvenli bölge`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "%8 sınırı",
              text: `Kargo tankı atmosferi %8 hacimce oksijenin altında tutulmalı ve pozitif basınçta kalmalıdır; bu IGS'in temel emniyet kriteridir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. IG Üretimi ve Şartlandırma",
      sections: [
        {
          subheading: "2.1 Flue gas vs inert gas generator",
          paragraphs: [
            `IG iki şekilde üretilir: kazan baca gazından (flue gas, düşük O₂ içerir) veya bağımsız bir inert gas generator'dan (yakıt yakarak). Ürün tankerlerinde yüksek saflık için generator/nitrojen tercih edilebilir. Üretilen gaz sıcak, kükürtlü ve kurum yüklüdür; kullanılmadan önce şartlandırılmalıdır.`,
          ],
        },
        {
          subheading: "2.2 Scrubber, soğutma ve kurutma",
          paragraphs: [
            `Scrubber (yıkayıcı), gazı deniz suyuyla yıkayarak SOx ve kurumun çoğunu alır ve soğutur. Ardından demister/dryer nemi giderir. Temizlenmemiş gaz tankta korozyon ve kargo kontaminasyonu yapar.`,
          ],
          table: {
            headers: ["Aşama", "İşlev"],
            rows: [
              ["Scrubber", "SOx/kurum yıkama + soğutma"],
              ["Demister/dryer", "Nem giderme"],
              ["IG blower", "Tanka basma (pozitif basınç)"],
              ["O₂ analyzer", "Oksijen izleme"],
            ],
          },
        },
      ],
    },
    {
      heading: "3. Emniyet Bariyerleri",
      sections: [
        {
          subheading: "3.1 Deck water seal ve non-return",
          paragraphs: [
            `Kargo tankından gelen patlayıcı gazın makine dairesindeki üretim tarafına geri kaçmasını önlemek için deck water seal (su contası) ve mekanik non-return (çek) valf birlikte çalışır. Bu çift bariyer, alev/buharın geri tepmesini engeller; su contası seviyesi sürekli korunur.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Geri tepme tehlikesi",
              text: `Deck water seal kurursa veya non-return valf arızalanırsa kargo buharı üretim tarafına/makine dairesine kaçabilir; bu çok ciddi patlama riskidir.`,
            },
          ],
        },
        {
          subheading: "3.2 P/V valf ve basınç koruması",
          paragraphs: [
            `Basınç/vakum (P/V) valfleri tankı aşırı basınç ve vakuma karşı korur. PV breaker (sıvı dolu emniyet) ana hat için son koruma sağlar. Düşük IG basıncı alarmı ve otomatik blower durdurma sistemin bütünlüğünü korur.`,
          ],
        },
      ],
    },
    {
      heading: "4. Operasyon, Bakım ve Arıza",
      sections: [
        {
          subheading: "4.1 Kargo operasyonuyla ilişki",
          paragraphs: [
            `Boşaltma sırasında IG, inen sıvının yerini doldurur (tank vakuma girmez). Yükleme sırasında çıkan gaz vent edilir. Tank temizliği (COW/yıkama) inert atmosferde yapılır; "purging" ve "gas-freeing" prosedürleri O₂ ve hidrokarbon ölçümleriyle kontrol edilir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Boşaltmada IG şart",
              text: `IGS arızalıyken kargo boşaltma genelde durdurulur; aksi halde tank vakuma girer veya hava girerek patlayıcı atmosfer oluşur.`,
            },
          ],
        },
        {
          subheading: "4.2 Bakım ve arıza tablosu",
          paragraphs: [
            `Bakım; O₂ analizör kalibrasyonu, scrubber/demister temizliği, deck seal seviye ve non-return testi, blower ve P/V valf kontrolünü kapsar.`,
          ],
          table: {
            headers: ["Belirti", "Neden", "Müdahale"],
            rows: [
              ["Yüksek O₂ (>%8)", "Yanma/blower ayarı, hava girişi", "Kargo durdur, üretimi düzelt"],
              ["Düşük IG basıncı", "Blower/seal/kaçak", "Blower + deck seal kontrol"],
              ["O₂ analyzer şüpheli", "Kalibrasyon kayması", "Kalibrasyon/yedek ölçüm"],
              ["Deck seal seviyesi düşük", "Besleme/drenaj", "Su seviyesini geri kazan"],
            ],
          },
        },
      ],
    },
  ],
};

export default content;
