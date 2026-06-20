import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "Pervane Tipleri ve Performansı",
  sectionId: "main-engine",
  topicIndex: 3,
  estimatedPages: 25,
  intro: `Pervane (propeller), ana makinenin dönme enerjisini suyu geriye iterek itki (thrust) kuvvetine çeviren tahrik elemanıdır. Sabit hatveli (FPP) ve kontrol edilebilir hatveli (CPP) pervaneler, kavitasyon, slip, verim ve hatve (pitch) kavramları gemi performansının merkezindedir. Bu bölüm; pervane geometrisi (pitch, çap, kanat sayısı, BAR), FPP/CPP farkını, slip ve verim hesabını, kavitasyon ve erozyonu, pervane-gövde-makine eşleşmesini (propeller law) ve bakım/arızayı mühendislik derinliğinde ele alır.`,
  sources: [
    "ITTC — propeller performance procedures",
    "MAN/Wärtsilä propulsion & propeller guides",
    "Klas kuralları — propeller survey",
    "Pounder's Marine Diesel Engines / Ship Resistance & Propulsion",
  ],
  chapters: [
    {
      heading: "1. Pervane Geometrisi",
      sections: [
        {
          subheading: "1.1 Pitch, çap ve kanat",
          paragraphs: [
            `Pitch (hatve), pervanenin bir tam dönüşte teorik olarak ilerlemesi gereken mesafedir. Çap, kanat sayısı ve disk alan oranı (BAR — blade area ratio) itki ve verimi belirler. Büyük çap/düşük devir verimi artırır; kanat sayısı titreşim ve kavitasyonu etkiler.`,
          ],
          bullets: [
            `Pitch yüksek → tur başına ilerleme fazla, yük artar`,
            `Büyük çap + düşük devir → yüksek verim`,
            `Kanat sayısı: titreşim/kavitasyon dengesi`,
          ],
        },
        {
          subheading: "1.2 FPP ve CPP",
          paragraphs: [
            `FPP (Fixed Pitch Propeller) sabit hatvelidir; manevra ve geri yol için makine yön değiştirir. CPP (Controllable Pitch Propeller) kanat açısını değiştirerek sabit devirde itki ve yönü ayarlar; manevra kabiliyeti yüksek, shaft generator ile uyumludur ama mekanik olarak karmaşık ve pahalıdır.`,
          ],
          table: {
            headers: ["Özellik", "FPP", "CPP"],
            rows: [
              ["Geri yol", "Makine ters döner", "Kanat açısı değişir"],
              ["Manevra", "Sınırlı", "Çok iyi"],
              ["Karmaşıklık", "Basit, dayanıklı", "Hidrolik hub, karmaşık"],
              ["Shaft generator", "Zor", "Uyumlu (sabit devir)"],
            ],
          },
        },
      ],
    },
    {
      heading: "2. Slip, Verim ve Propeller Law",
      sections: [
        {
          subheading: "2.1 Slip kavramı",
          paragraphs: [
            `Slip, teorik ilerleme (pitch × devir) ile gerçek ilerleme arasındaki farktır. Apparent slip GPS hızıyla, real slip ise su içindeki gerçek hızla hesaplanır. Slip'in normalin üstüne çıkması; tekne kirliliği (fouling), hava/akıntı veya pervane hasarına işaret eder.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Slip ne anlatır?",
              text: `Aynı devirde slip'in zamanla artması genelde tekne/pervane kirlenmesinin (artan direnç) işaretidir; performans takibinin temel göstergesidir.`,
            },
          ],
        },
        {
          subheading: "2.2 Propeller law",
          paragraphs: [
            `Pervane yükü tahmininde "propeller law" kullanılır: tork ~ devir², güç ~ devir³. Bu yüzden hızı bir miktar artırmak güç ihtiyacını kübik artırır. Kirli tekne veya ağır hava pervaneyi ağırlaştırır; motor aynı devre daha fazla yakıtla ulaşır (heavy running).`,
          ],
          table: {
            headers: ["Büyüklük", "Devirle ilişki"],
            rows: [
              ["İtki (thrust)", "~ devir²"],
              ["Tork", "~ devir²"],
              ["Güç", "~ devir³"],
            ],
            caption: "Pervane yasası (yaklaşık)",
          },
        },
      ],
    },
    {
      heading: "3. Kavitasyon ve Erozyon",
      sections: [
        {
          subheading: "3.1 Kavitasyon mekanizması",
          paragraphs: [
            `Kanat üzerindeki basınç buhar basıncının altına düşünce su buhar kabarcığına döner (kavitasyon); kabarcıklar yüksek basınç bölgesinde patlayarak kanat yüzeyini aşındırır (erozyon), gürültü ve titreşim üretir, verimi düşürür. Aşırı yük, hasarlı kanat veya yanlış pitch kavitasyonu artırır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Erozyon hasarı",
              text: `Süreğen kavitasyon kanat kenarlarında pitting/erozyon oluşturur; bu da dengesizlik ve daha fazla kavitasyona yol açan kısır döngü yaratır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Bakım ve Arıza",
      sections: [
        {
          subheading: "4.1 Bakım ve survey",
          paragraphs: [
            `Havuzlamada pervane yüzeyi parlatılır (polishing — verim için), kanat kenarı hasarları onarılır ve denge kontrol edilir. CPP'de hub sızdırmazlığı ve hatve mekanizması test edilir. Rope guard ve pervane göbeği kontrol edilir.`,
          ],
          bullets: [
            `Pervane parlatma → sürtünme/verim iyileştirir`,
            `Kanat kenarı (leading edge) onarımı`,
            `CPP hub yağ/sızdırmazlık testi`,
          ],
        },
        {
          subheading: "4.2 Arıza tablosu",
          paragraphs: [`Yaygın sorunlar:`],
          table: {
            headers: ["Belirti", "Neden", "Müdahale"],
            rows: [
              ["Aşırı titreşim", "Kanat hasarı/dengesizlik, kavitasyon", "Havuzda muayene/denge"],
              ["Slip yüksek, hız düşük", "Fouling/pervane kirli", "Tekne+pervane temizliği"],
              ["CPP pitch yanıt vermiyor", "Hidrolik/hub arızası", "OD box ve hidrolik kontrolü"],
              ["Kanat erozyonu", "Süreğen kavitasyon", "Onarım + yük/pitch incelemesi"],
            ],
          },
        },
      ],
    },
  ],
};

export default content;
