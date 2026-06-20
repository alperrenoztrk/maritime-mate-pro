import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "Buhar Kazanları",
  sectionId: "auxiliary",
  topicIndex: 1,
  estimatedPages: 24,
  intro: `Gemi buhar kazanları (boilers), yakıt ve tank ısıtması, HFO ısıtma, ısıtma/sıhhi su ve (buharlı gemilerde) tahrik için buhar üreten yardımcı tesislerdir. Modern motor gemilerinde yardımcı (auxiliary/oil-fired) kazan ile ana makine egzozundan ısı geri kazanan ekonomizer (exhaust gas economizer — EGE) birlikte çalışır. Bu bölüm; kazan tiplerini (water-tube/fire-tube, composite), su/buhar devresini ve drum'ı, yanma kontrolü ve emniyet sistemlerini (low water, flame failure), kazan suyu kimyasını ve EGE özelinde soot fire riskini ve bakım/arızayı mühendislik derinliğinde ele alır.`,
  sources: [
    "SOLAS Ch. II-1 — boilers & pressure systems",
    "IACS UR — boilers & economizers",
    "Klas kuralları — boiler mountings & safety valves",
    "Üretici el kitapları (Aalborg/Alfa Laval, Kangrim)",
  ],
  chapters: [
    {
      heading: "1. Kazan Tipleri ve Devre",
      sections: [
        {
          subheading: "1.1 Water-tube ve fire-tube",
          paragraphs: [
            `Fire-tube (alev borulu) kazanda sıcak gazlar borulardan geçer, su gövdededir; basit ve düşük basınçlıdır. Water-tube (su borulu) kazanda su borulardan geçer, gazlar dışarıdadır; yüksek basınç ve hızlı buhar üretimi sağlar. Birçok motor gemisinde composite kazan hem yakıtla hem egzozla ısıtır.`,
          ],
          bullets: [
            `Fire-tube: basit, düşük basınç, yavaş`,
            `Water-tube: yüksek basınç, hızlı, karmaşık`,
            `Composite/EGE: egzoz ısısını geri kazanır`,
          ],
        },
        {
          subheading: "1.2 Su/buhar devresi",
          paragraphs: [
            `Besleme suyu (feed water), besleme pompasıyla kazana basılır; ısı ile buhara dönüşür, kullanıldıktan sonra kondens olarak cascade/hotwell tankına döner ve yeniden beslenir. Buhar tuzağı (steam trap) kondensi buhardan ayırır. Su seviyesi gauge glass ve seviye sensörü ile izlenir.`,
          ],
        },
      ],
    },
    {
      heading: "2. Yanma ve Emniyet Sistemleri",
      sections: [
        {
          subheading: "2.1 Yanma kontrolü",
          paragraphs: [
            `Oil-fired kazanda brülör (burner) yakıtı atomize eder, fan hava sağlar ve buhar basıncına göre ateşleme açılıp kapanır (on/off veya modülasyonlu). Hava/yakıt oranı verim ve emisyon için optimize edilir; eksik hava is/duman, fazla hava verim kaybı yapar.`,
          ],
        },
        {
          subheading: "2.2 Emniyet kilitleri",
          paragraphs: [
            `Kazan en kritik emniyet sistemlerinden biridir. Düşük su seviyesi koruması (low-low water cut-off), alev kaybı koruması (flame failure), yüksek basınç ve emniyet valfleri (safety valve) zorunludur. Düşük su, boruların aşırı ısınıp patlamasına yol açabilir.`,
          ],
          table: {
            headers: ["Koruma", "Algılar", "Aksiyon"],
            rows: [
              ["Low water cut-off", "Su seviyesi düşük", "Brülörü durdurur"],
              ["Flame failure", "Alev yok", "Yakıtı keser (UV/foto)"],
              ["High pressure", "Aşırı basınç", "Brülör stop / safety valve"],
              ["Safety valve", "Set üstü basınç", "Buharı atmosfere boşaltır"],
            ],
          },
          callouts: [
            {
              type: "warning",
              title: "Düşük su tehlikesi",
              text: `Su seviyesi kritik altına inerse ısınan metal deforme olur/patlar. Low water alarmı asla devre dışı bırakılmaz, gauge glass düzenli purge edilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Kazan Suyu Kimyası ve EGE",
      sections: [
        {
          subheading: "3.1 Su şartlandırma",
          paragraphs: [
            `Kazan suyu; korozyon, kireç (scale) ve köpürme (carryover) önlemek için şartlandırılır. pH/alkalinite, klorür, fosfat ve çözünmüş oksijen düzenli test edilir; kimyasal dozaj ve blow-down (dip atma) ile kontrol edilir. Sertlik ve oksijen korozyonu boru ömrünü doğrudan etkiler.`,
          ],
          bullets: [
            `pH/alkalinite: korozyon kontrolü`,
            `Fosfat: sertliği çamur olarak çöktürür`,
            `Blow-down: çamur ve tuz birikimini atar`,
            `Oksijen tutucu (deaerator/kimyasal)`,
          ],
        },
        {
          subheading: "3.2 EGE ve soot fire",
          paragraphs: [
            `Exhaust gas economizer, ana makine egzoz ısısını buhara çevirir; düşük yükte birikmiş kurum (soot) ve yağ tutuşabilir (soot fire / iron fire). Düzenli soot blowing, su yıkama (water washing) ve düşük yük uyarıları bu riski azaltır. Yüksek egzoz çıkış sıcaklığı erken işaret olabilir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "EGE su sirkülasyonu",
              text: `Ana makine düşük yükte/manevradayken EGE'de yeterli su sirkülasyonu korunmalı; kuru çalışma soot fire ve boru hasarına davetiyedir.`,
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
            `Bakım; brülör temizliği, gauge glass purge, emniyet valf testi, su tarafı/duman tarafı temizliği, refraktör (ateş tuğlası) kontrolü ve EGE soot blow/water wash işlemlerini kapsar. Safety valve set basıncı düzenli doğrulanır.`,
          ],
        },
        {
          subheading: "4.2 Arıza tablosu",
          paragraphs: [`Yaygın sorunlar:`],
          table: {
            headers: ["Belirti", "Neden", "Müdahale"],
            rows: [
              ["Brülör ateşlemiyor", "Yakıt/atomizasyon, flame eye", "Brülör tip/foto sel kontrolü"],
              ["Buhar basıncı tutmuyor", "Sızıntı/yük fazla", "Kaçak ve yük kontrolü"],
              ["Su tarafı köpürme/carryover", "Su kimyası bozuk", "Blow-down + kimyasal düzelt"],
              ["EGE yüksek egzoz çıkış sıc.", "Soot birikimi/yangın", "Soot blow, su sirkülasyonu, soğut"],
            ],
          },
        },
      ],
    },
  ],
};

export default content;
