import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "Sintine Separatörü (OWS / 15 ppm Bilge Separator)",
  sectionId: "environmental-auxiliary",
  topicIndex: 1,
  estimatedPages: 24,
  intro: `Sintine (bilge) separatörü — Oily Water Separator (OWS), makine dairesi sintinesinde biriken yağlı suyu denize basmadan önce yağ içeriğini 15 ppm'in altına indiren MARPOL Annex I gereği zorunlu çevre sistemidir. 15 ppm bilge alarmı ve otomatik üç-yollu (3-way) valf, kriteri aşan suyu denize değil slop/holding tanka yönlendirir. Bu bölüm; OWS çalışma prensibini (gravity + coalescer), 15 ppm monitörü ve otomatik valfi, MARPOL deşarj kriterlerini, "magic pipe" yasağını ve Oil Record Book'u, sahte by-pass tespitini ve bakım/arızayı mühendislik derinliğinde ele alır.`,
  sources: [
    "MARPOL Annex I Reg. 14 — oily water separating equipment",
    "IMO Res. MEPC.107(49) — 15 ppm bilge separator",
    "IMO Res. MEPC.108(49) — 15 ppm monitor",
    "PSC / port investigations (magic pipe cases)",
  ],
  chapters: [
    {
      heading: "1. Çalışma Prensibi",
      sections: [
        {
          subheading: "1.1 Gravity + coalescer",
          paragraphs: [
            `OWS iki aşamayla çalışır: birinci kademede yoğunluk farkıyla (gravity) büyük yağ damlacıkları üstte toplanır; ikinci kademede coalescer (birleştirici) elemanlar küçük yağ damlacıklarını büyütüp ayırır. Ayrılan yağ sludge/yağ tankına, temizlenen su 15 ppm monitörüne gider.`,
          ],
          bullets: [
            `1. kademe: gravity ayırma`,
            `2. kademe: coalescer ile ince yağ ayırma`,
            `Ayrılan yağ → sludge tank`,
          ],
        },
      ],
    },
    {
      heading: "2. 15 ppm Monitör ve Otomatik Valf",
      sections: [
        {
          subheading: "2.1 İzleme ve 3-way valf",
          paragraphs: [
            `15 ppm bilge alarmı (oil content monitor), çıkış suyundaki yağ konsantrasyonunu sürekli ölçer. Değer 15 ppm'i aşarsa otomatik 3-way valf suyu denize basmayı durdurup geri (bilge holding/slop tank) yönlendirir ve alarm verir. Böylece kriteri aşan su asla denize gitmez.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Monitör devre dışı bırakılamaz",
              text: `15 ppm monitör ve otomatik valf devre dışı bırakılırsa veya by-pass yapılırsa bu ciddi MARPOL suçudur; sistem her zaman aktif ve mühürlü olmalıdır.`,
            },
          ],
        },
        {
          subheading: "2.2 MARPOL deşarj kriteri",
          paragraphs: [
            `MARPOL, makine dairesi sintine suyunun denize deşarjını şu koşullara bağlar: gemi yolda, yağ oranı ≤15 ppm, onaylı OWS+monitör çalışır durumda. Özel alanlarda (special areas) kurallar daha katıdır.`,
          ],
          table: {
            headers: ["Koşul", "Gereksinim"],
            rows: [
              ["Yağ oranı", "≤ 15 ppm"],
              ["Ekipman", "Onaylı OWS + 15 ppm monitör"],
              ["Gemi durumu", "Yolda (en route)"],
              ["Kayıt", "Oil Record Book Part I"],
            ],
          },
        },
      ],
    },
    {
      heading: "3. Uyum ve 'Magic Pipe'",
      sections: [
        {
          subheading: "3.1 Magic pipe yasağı",
          paragraphs: [
            `"Magic pipe" — OWS'i by-pass ederek yağlı suyu doğrudan denize basan yasadışı düzenek — en ağır cezalandırılan MARPOL ihlallerinden biridir. Yetkililer flanş izleri, ek hortum bağlantıları ve Oil Record Book ile gerçek tüketim/üretim tutarsızlıklarını araştırır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "Oil Record Book bütünlüğü",
              text: `Oil Record Book gerçeği yansıtmalı; sludge üretimi, yakımı, kıyıya verme ve OWS işlemleri tutarlı olmalıdır. Sahte kayıt ağır yaptırım doğurur.`,
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
            `Bakım; coalescer eleman temizlik/değişimi, 15 ppm monitör cam/sensör temizliği ve kalibrasyonu, 3-way valf fonksiyon testi ve besleme pompası kontrolünü kapsar. Monitör test/kalibrasyon kayıtları tutulur.`,
          ],
          bullets: [
            `Coalescer eleman temizlik/değişim`,
            `15 ppm monitör kalibrasyonu`,
            `3-way valf otomatik dönüş testi`,
          ],
        },
        {
          subheading: "4.2 Arıza tablosu",
          paragraphs: [`Yaygın sorunlar:`],
          table: {
            headers: ["Belirti", "Neden", "Müdahale"],
            rows: [
              ["Çıkışta sürekli >15 ppm", "Coalescer tıkalı/doymuş", "Eleman değişimi"],
              ["Monitör hatalı okuma", "Cam kirli/kalibrasyon", "Temizlik + kalibrasyon"],
              ["3-way valf dönmüyor", "Solenoid/pnömatik", "Valf fonksiyon kontrolü"],
              ["Separasyon zayıf", "Emülsiyon/deterjan", "Sintineye deterjan girişini önle"],
            ],
          },
        },
      ],
    },
  ],
};

export default content;
