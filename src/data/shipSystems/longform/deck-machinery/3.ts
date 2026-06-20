import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "Kapak (Hatch Cover) Mekanizmaları",
  sectionId: "deck-machinery",
  topicIndex: 3,
  estimatedPages: 24,
  intro: `Ambar kapakları (hatch covers), yük ambarını deniz suyu girişinden koruyan ve geminin su geçirmezliğini (weathertight integrity) sağlayan kritik yapısal/mekanik sistemdir. Hatch cover sızdırmazlığındaki kusur, dünya çapında dökme yük gemisi kayıplarının başlıca nedenlerinden biridir. Bu bölüm; kapak tiplerini (folding, side-rolling, pontoon, piggy-back), açma-kapama mekanizmalarını (hidrolik, zincir, tel), conta (rubber packing) ve drenaj sistemini, su geçirmezlik testlerini (hortum/ultrasonik) ve bakım/arıza yönetimini mühendislik derinliğinde ele alır.`,
  sources: [
    "ICLL 1966 (Load Lines) — weathertight integrity",
    "SOLAS Ch. VI & XII — bulk carrier safety",
    "IACS UR S21 — hatch cover strength",
    "P&I Club loss prevention (hatch cover surveys)",
    "Üretici el kitapları (MacGregor, TTS, Coops & Nieborg)",
  ],
  chapters: [
    {
      heading: "1. Kapak Tipleri",
      sections: [
        {
          subheading: "1.1 Folding ve side-rolling",
          paragraphs: [
            `Folding (katlanır) kapaklar, panelleri menteşeyle birbirine bağlı olup hidrolik silindirle akordeon gibi katlanır; konteyner ve genel kargo gemilerinde yaygındır. Side-rolling (yana kayan) kapaklar dökme yük gemilerinde tercih edilir; paneller yana doğru tekerlekler üzerinde kayar ve ambar ağzını tamamen açar.`,
          ],
          bullets: [
            `Folding: hızlı açma, makine üstü alan gerektirir`,
            `Side-rolling: geniş açıklık, ağır panel`,
            `Pontoon: ayrı paneller, vinçle kaldırılır (lift-away)`,
            `Piggy-back / stacking: paneller üst üste biner`,
          ],
        },
      ],
    },
    {
      heading: "2. Açma-Kapama Mekanizması",
      sections: [
        {
          subheading: "2.1 Hidrolik tahrik ve cleat sistemi",
          paragraphs: [
            `Kapaklar hidrolik silindir, zincir veya tel halat ile hareket ettirilir. Kapatıldıktan sonra cleat (mandal/kelepçe) ve quick-acting cleat sistemi panelleri coaming'e bastırarak contayı sıkıştırır. Kapağın su geçirmezliği bu baskı kuvvetine bağlıdır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Compression bar",
              text: `Coaming üzerindeki compression bar, conta lastiğine batarak sızdırmazlık sağlar. Bar ile conta arasındaki temas izi (set-down) düzgün ve sürekli olmalıdır.`,
            },
          ],
        },
        {
          subheading: "2.2 Conta ve drenaj",
          paragraphs: [
            `Conta (rubber packing), panel çevresindeki kanala oturur ve compression bar ile sıkışır. Conta ile coaming arasında biriken su, drenaj kanalı ve non-return (çek) valf üzerinden tahliye edilir. Drenaj valfinin tıkanması ambar içine su sızdırır.`,
          ],
        },
      ],
    },
    {
      heading: "3. Su Geçirmezlik ve Test",
      sections: [
        {
          subheading: "3.1 Hortum testi (hose test)",
          paragraphs: [
            `Klasik weathertight testi, kapalı kapağa belirli basınç ve mesafeden su sıkılarak içeri sızıntı olup olmadığının gözlenmesidir. Ancak yük doluyken veya soğukta uygulanması zordur.`,
          ],
          table: {
            headers: ["Test", "Avantaj", "Sınır"],
            rows: [
              ["Hortum testi", "Basit, doğrudan", "Yük varken zor, içeri girilmeli"],
              ["Ultrasonik test", "Yük varken, sayısal", "Cihaz/eğitim gerektirir"],
              ["Chalk test", "Set-down izini gösterir", "Sızdırmazlığı kanıtlamaz"],
            ],
          },
        },
        {
          subheading: "3.2 Ultrasonik test",
          paragraphs: [
            `Ultrasonik (ses) sızdırmazlık testinde ambar içine yerleştirilen verici sesi yayar, dışarıdaki alıcı conta hattı boyunca taranır. Ses kaçağı ölçülen seviyeyi (% veya dB) belirli eşiğin üstüne çıkarırsa o noktada sızdırmazlık kusuru vardır. Yük varken bile uygulanabilir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "Sınıf onaylı operatör",
              text: `Ultrasonik test sonucunun resmi kabulü için cihazın klas onaylı ve operatörün sertifikalı olması beklenir.`,
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
            `Bakım; conta esnekliği/yırtık kontrolü, compression bar düzgünlüğü, drenaj valf temizliği, cleat fonksiyonu, tekerlek/ray durumu ve hidrolik sistemi kapsar. Conta kalıcı olarak ezildiğinde (set) sızdırmazlık kaybolur ve değişmelidir.`,
          ],
          bullets: [
            `Conta set-down izi sürekli ve ~conta genişliğinin %50'si olmalı`,
            `Drenaj non-return valfleri açık ve temiz tutulur`,
            `Coaming korozyon ve deformasyon kontrolü`,
          ],
        },
        {
          subheading: "4.2 Arıza tablosu",
          paragraphs: [`Yaygın arızalar ve müdahale:`],
          table: {
            headers: ["Belirti", "Neden", "Müdahale"],
            rows: [
              ["Ambara su sızıyor", "Conta ezik/yırtık, drenaj tıkalı", "Conta değişimi, drenaj temizliği"],
              ["Kapak açılmıyor/sıkışık", "Hidrolik basınç, ray/tekerlek", "Basınç + ray temizliği"],
              ["Cleat sıkmıyor", "Aşınma, ayar bozuk", "Cleat ayarı/değişimi"],
              ["Düzensiz set-down izi", "Coaming deformasyonu", "Coaming düzeltme/conta ayarı"],
            ],
          },
          callouts: [
            {
              type: "example",
              title: "Neden önemli?",
              text: `Hatch cover sızıntısı ambarda yük ıslanması, ağırlık artışı ve stabilite kaybına yol açar; tarihsel olarak birçok bulk carrier kaybının kök nedenidir.`,
            },
          ],
        },
      ],
    },
  ],
};

export default content;
