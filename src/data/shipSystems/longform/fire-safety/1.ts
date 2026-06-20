import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "CO₂ Sabit Söndürme Sistemi",
  sectionId: "fire-safety",
  topicIndex: 1,
  estimatedPages: 25,
  intro: `CO₂ sabit söndürme sistemi, makine dairesi, kargo ambarı ve pompa dairesi gibi kapalı hacimleri karbondioksit ile boğarak (oksijeni seyrelterek) söndüren toplam basma (total flooding) sistemidir. Çok etkili ama insan için ölümcül olduğundan, deşarj öncesi tahliye, alarm ve gecikme (time delay) gibi katı emniyet prosedürleri vardır. Bu bölüm; CO₂'in söndürme mekanizmasını, sistem mimarisini (tüp bataryası/bulk, pilot ve master valf), boğma konsantrasyonu ve hesabını, deşarj emniyet zincirini (alarm, time delay, interlock), insan güvenliği risklerini ve bakım/arızayı mühendislik derinliğinde ele alır.`,
  sources: [
    "SOLAS Ch. II-2 — fixed gas fire-extinguishing",
    "FSS Code Ch. 5 — CO₂ systems",
    "IMO MSC.1/Circ.1318 — CO₂ system maintenance",
    "Klas kuralları — fixed fire-fighting",
  ],
  chapters: [
    {
      heading: "1. Söndürme Mekanizması ve Mimari",
      sections: [
        {
          subheading: "1.1 Boğma (oksijen seyreltme)",
          paragraphs: [
            `CO₂ yanmayı, ortamdaki oksijeni yanmayı sürdüremeyecek seviyeye (genelde ~%15 altına) düşürerek söndürür; ayrıca bir miktar soğutma sağlar. Yanıcı buharı kimyasal olarak kesmez, sadece oksijeni seyreltir; bu yüzden hacmin kapatılması (sızdırmazlık) şarttır.`,
          ],
          bullets: [
            `Oksijeni seyreltir → yanma durur`,
            `İletken değil → elektrikli mahallerde uygun`,
            `Kapalı hacim ve sızdırmazlık gerekli`,
          ],
        },
        {
          subheading: "1.2 Sistem bileşenleri",
          paragraphs: [
            `Sistem; yüksek basınçlı CO₂ tüpleri bataryası (veya düşük basınçlı bulk tankı), manifold, pilot tüpleri, master valf, dağıtım borusu ve nozullardan oluşur. Deşarj, CO₂ odasındaki release kabininden (pilot CO₂ ile) başlatılır; pilot gaz hem master valfi açar hem ilgili hacme yönlendirir.`,
          ],
        },
      ],
    },
    {
      heading: "2. Konsantrasyon ve Hesap",
      sections: [
        {
          subheading: "2.1 Tasarım konsantrasyonu",
          paragraphs: [
            `Makine daireleri için CO₂ miktarı, korunan hacmin (ve makine yapısının) belirli yüzdesini dolduracak şekilde hesaplanır; SOLAS makine daireleri için brüt hacmin yaklaşık %40'ına (veya makine kasası dahil daha büyük hesaba) karşılık CO₂ ister. Kargo hacimleri için farklı (daha düşük) oran kullanılır.`,
          ],
          table: {
            headers: ["Mahal", "Tipik CO₂ tasarımı"],
            rows: [
              ["Makine dairesi", "Hacmin ~%40'ı (büyük hesap esas)"],
              ["Kargo ambarı", "Hacmin ~%30'u"],
              ["Boşaltma süresi (M/E)", "~%85'i ≤ 2 dk"],
            ],
            caption: "Yaklaşık değerler; kesin hesap FSS Code'a göre yapılır",
          },
        },
        {
          subheading: "2.2 Hızlı deşarj",
          paragraphs: [
            `Makine daireleri için gazın büyük kısmı kısa sürede (yaklaşık 2 dakikada) verilmelidir ki konsantrasyon hızla söndürme seviyesine ulaşsın ve yeniden alevlenme önlensin. Boru çapı ve nozul tasarımı bu debiyi sağlar.`,
          ],
        },
      ],
    },
    {
      heading: "3. Emniyet Zinciri ve İnsan Riski",
      sections: [
        {
          subheading: "3.1 Deşarj emniyet adımları",
          paragraphs: [
            `CO₂ insanı boğarak öldürür. Bu yüzden deşarj öncesi: hacim tahliye edilir, otomatik sesli/görsel alarm çalar, kapı kapatma kabini açılınca fan/yakıt/havalandırma durur (interlock), zaman gecikmesi (time delay) personelin çıkması için süre tanır ve ancak sonra gaz boşalır. Personel sayımı (muster) yapılmadan deşarj edilmez.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Ölümcül risk",
              text: `CO₂ ile boğulma sessiz ve hızlıdır. Deşarjdan önce mutlaka tüm personel tahliye edilip sayılmalı; gaz dolu hacme SCBA olmadan girilmez.`,
            },
          ],
        },
        {
          subheading: "3.2 Interlock ve havalandırma",
          paragraphs: [
            `Deşarj için havalandırma fanları durmalı, yakıt valfleri kapanmalı ve damperler kapanmalıdır; aksi halde gaz dışarı kaçar, konsantrasyon düşer. Söndürme sonrası hacim, yeniden girişten önce iyice havalandırılır ve gaz ölçümü yapılır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "Yeniden alevlenme",
              text: `Söndürmeden hemen sonra hacim açılırsa taze oksijen sıcak yüzeyleri yeniden tutuşturabilir. Hacim yeterince soğumadan ve kontrol edilmeden açılmaz.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Bakım ve Arıza",
      sections: [
        {
          subheading: "4.1 Periyodik bakım",
          paragraphs: [
            `Bakım; tüp tartımı/seviye (CO₂ kaybı tespiti), pilot hat ve valf testi (gaz boşaltmadan), alarm ve time delay testi, nozul/boru tıkanıklık kontrolü ve release kabin fonksiyon testini kapsar. Tüpler periyodik basınç testine tabidir.`,
          ],
          bullets: [
            `Tüp tartımı: %10 kayıpta yeniden dolum`,
            `Alarm + time delay fonksiyon testi`,
            `Boru blow-through (gazsız) tıkanıklık kontrolü`,
          ],
        },
        {
          subheading: "4.2 Arıza tablosu",
          paragraphs: [`Yaygın sorunlar:`],
          table: {
            headers: ["Belirti", "Neden", "Müdahale"],
            rows: [
              ["Tüp ağırlığı düşük", "Sızıntı", "Valf/conta kontrol, yeniden dolum"],
              ["Alarm/time delay çalışmıyor", "Elektrik/pnömatik arıza", "Devre testi ve onarım"],
              ["Pilot sistem açmıyor", "Pilot tüp boş/valf", "Pilot hat ve valf kontrolü"],
              ["Interlock yok (fan durmuyor)", "Damper/limit switch", "Interlock ve damper testi"],
            ],
          },
        },
      ],
    },
  ],
};

export default content;
