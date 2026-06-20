import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "Köpüklü (Foam) Söndürme Sistemi",
  sectionId: "fire-safety",
  topicIndex: 2,
  estimatedPages: 23,
  intro: `Köpük (foam) söndürme sistemi, yanan sıvı yüzeyini köpük tabakasıyla örterek oksijeni kesen ve buharlaşmayı bastıran, özellikle tanker güverteleri ve makine dairesi sıvı yakıt yangınları için tasarlanmış sistemdir. Köpük; su, köpük konsantresi ve havanın belirli oranda karışımından oluşur. Bu bölüm; köpük söndürme mekanizmasını, köpük tiplerini (AFFF, protein, alcohol-resistant), düşük/orta/yüksek genleşmeli köpüğü, tanker güverte foam ve makine dairesi sistemini, oranlama (proportioning) ve uygulama oranını ve bakım/arızayı mühendislik derinliğinde ele alır.`,
  sources: [
    "SOLAS Ch. II-2 — foam systems",
    "FSS Code — fixed foam fire-extinguishing",
    "MSC.1/Circ.1312 — foam concentrate guidelines",
    "Klas kuralları — tanker deck foam",
  ],
  chapters: [
    {
      heading: "1. Köpük Mekanizması ve Tipleri",
      sections: [
        {
          subheading: "1.1 Söndürme mekanizması",
          paragraphs: [
            `Köpük, yanan sıvı üzerinde sürekli bir battaniye oluşturur: yakıt yüzeyini havadan keser (oksijen yalıtımı), yanıcı buhar çıkışını bastırır ve içerdiği su ile soğutur. Yüzeyi örtme süreklidir; köpük battaniyesi bozulursa yeniden alevlenme olur.`,
          ],
          bullets: [
            `Yüzeyi örter → oksijeni keser`,
            `Buhar çıkışını bastırır`,
            `Su içeriği ile soğutur`,
          ],
        },
        {
          subheading: "1.2 Köpük tipleri",
          paragraphs: [
            `AFFF (aqueous film-forming foam) yakıt üstünde su filmi oluşturarak hızlı söndürür; protein/fluoroprotein köpük dayanıklı battaniye verir; alcohol-resistant (AR) köpük, polar çözücüler (alkol, aseton) için poliмerik tabaka oluşturur. Yakıt tipine uygun köpük seçilmelidir.`,
          ],
          table: {
            headers: ["Köpük", "Güçlü yön", "Kullanım"],
            rows: [
              ["AFFF", "Hızlı film, etkili", "Hidrokarbon yakıt"],
              ["Protein/FP", "Dayanıklı battaniye", "Büyük tank yangını"],
              ["Alcohol-resistant", "Polar sıvıya dayanıklı", "Alkol/çözücü kargo"],
            ],
          },
        },
      ],
    },
    {
      heading: "2. Genleşme ve Uygulama",
      sections: [
        {
          subheading: "2.1 Düşük/orta/yüksek genleşme",
          paragraphs: [
            `Genleşme oranı (expansion ratio), köpük hacminin sıvı karışım hacmine oranıdır. Düşük genleşme (≤20:1) uzun menzilli monitör/nozul için; orta (20-200:1) sınırlı alan için; yüksek genleşme (>200:1) bir hacmi tamamen doldurmak (makine dairesi) için kullanılır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Hangi genleşme nerede?",
              text: `Tanker güvertesinde düşük genleşmeli köpük (menzil/dayanıklılık), kapalı makine dairesinde yüksek genleşmeli köpük (hacmi doldurma) tercih edilir.`,
            },
          ],
        },
        {
          subheading: "2.2 Oranlama (proportioning)",
          paragraphs: [
            `Köpük konsantresi su ile doğru oranda (tipik %1, %3 veya %6) karıştırılmalıdır; karışım inductor (venturi), balanced pressure veya bladder tank ile yapılır. Yanlış oran zayıf veya hiç köpük üretir.`,
          ],
        },
      ],
    },
    {
      heading: "3. Gemi Uygulamaları",
      sections: [
        {
          subheading: "3.1 Tanker güverte foam",
          paragraphs: [
            `Tankerlerde güverte köpük sistemi; köpük tankı/oranlayıcı, ana hat, monitörler (köpük topu) ve hydrant uygulayıcılarından oluşur. Tüm kargo güverte alanını belirli debide belirli süre (örn. en az 20 dk) örtecek köpük stoğu zorunludur.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "Köpük stoğu süresi",
              text: `Tanker güverte foam sistemi, en kötü senaryo yangınını belirli bir süre besleyecek konsantre stoğuna sahip olmalıdır; eksik stok klas/PSC bulgusudur.`,
            },
          ],
        },
        {
          subheading: "3.2 Makine dairesi foam",
          paragraphs: [
            `Makine dairesi sıvı yakıt yangınları için sabit yüksek genleşmeli köpük veya yerel uygulama (local application) sistemi bulunabilir; ayrıca taşınabilir köpük üreteçleri (portable foam applicator) ana hattan beslenir.`,
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
            `Bakım; köpük konsantresi periyodik analizi (bozulma/çökelme), oranlayıcı ve monitör testi, hat blow-through, tank seviye ve son kullanma tarihi kontrolünü kapsar. Konsantre yaşlanırsa söndürme verimi düşer.`,
          ],
          bullets: [
            `Konsantre numune analizi (yıllık)`,
            `Monitör hareket ve debi testi`,
            `Oranlama doğruluğu kontrolü`,
          ],
        },
        {
          subheading: "4.2 Arıza tablosu",
          paragraphs: [`Yaygın sorunlar:`],
          table: {
            headers: ["Belirti", "Neden", "Müdahale"],
            rows: [
              ["Köpük üretmiyor/zayıf", "Oranlama hatası, hava yok", "Inductor/proportioner kontrol"],
              ["Konsantre bozulmuş", "Yaşlanma/çökelme", "Numune analizi, değişim"],
              ["Monitör hareketsiz", "Korozyon/yatak", "Gres, hareket testi"],
              ["Hat tıkalı", "Kalıntı/korozyon", "Blow-through, temizlik"],
            ],
          },
        },
      ],
    },
  ],
};

export default content;
