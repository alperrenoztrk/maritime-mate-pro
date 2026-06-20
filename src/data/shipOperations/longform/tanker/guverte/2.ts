import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Ullage ölçümü (el/otomatik, CPAS)",
  shipType: "tanker",
  dept: "guverte",
  opIndex: 2,
  estimatedPages: 18,
  intro: `Ullage, tank tavanı ile sıvı yüzeyi arasındaki boşluğun ölçüsüdür ve yük hacminin (dolayısıyla ticari miktarın) belirlenmesinde temel veridir. Tankerlerde toksik ve patlayıcı buhar nedeniyle ölçüm "closed" veya "restricted" gauging ile yapılır; açık ölçüm (open gauging) çoğu kargoda yasaktır. Bu bölüm CTS/CPAS ile kapalı ölçümü, trim/sıcaklık düzeltmelerini ve hacim hesabını ele alır.`,
  sources: [
    "MARPOL Annex I",
    "ISGOTT 6th edition",
    "API MPMS — Manual of Petroleum Measurement Standards",
    "ISO 91 — Petroleum measurement tables",
  ],
  chapters: [
    {
      heading: "1. Ölçüm Yöntemleri",
      sections: [
        {
          subheading: "1.1 Closed ve restricted gauging",
          paragraphs: [
            `Closed gauging'de tank atmosferi dışarı açılmadan, kalıcı kurulu sistem (CTS – Closed Tape System, CPAS – Cargo Pressure/level Automation System veya radar level gauge) ile ölçüm yapılır. Restricted gauging'de küçük bir vapour-lock vana üzerinden sınırlı açıklıkla ölçüm alınır. Open gauging (ullage hatch tam açık) toksik/patlayıcı buhar nedeniyle yasaktır.`,
          ],
          bullets: [
            `CPAS/radar: kalıcı, kapalı, otomatik`,
            `CTS portable: vapour-lock üzerinden`,
            `Restricted: sınırlı açıklık, gaz maruziyeti minimum`,
            `Open: yasak (özel istisnalar hariç)`,
          ],
        },
        {
          subheading: "1.2 Çapraz doğrulama",
          paragraphs: [
            `Otomatik sistem (radar/CPAS) ile manuel (CTS) ölçüm periyodik olarak karşılaştırılır; sapma varsa sistem kalibrasyonu sorgulanır. Custody transfer ölçümleri genelde kıyı surveyor'ı ile birlikte alınır.`,
          ],
        },
      ],
    },
    {
      heading: "2. Düzeltmeler ve Hacim Hesabı",
      sections: [
        {
          subheading: "2.1 Trim ve list düzeltmesi",
          paragraphs: [
            `Ölçülen ullage, geminin trim ve list değerine göre tank kalibrasyon tablolarındaki trim correction ile düzeltilir. Düzeltilmiş ullage, ullage tablosundan gross observed volume (GOV) verir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Sediment & water",
              text: `Free water dip (su seviyesi) su pastası (water finding paste) ile ölçülür; net standart hacim hesabında düşülür.`,
            },
          ],
        },
        {
          subheading: "2.2 Sıcaklık/density ve standart hacme dönüşüm",
          paragraphs: [
            `GOV, ortalama sıcaklık ve density ile ASTM/API tabloları (örn. 54B/6B) kullanılarak gross standard volume (GSV) ve ağırlığa (vacuum/air) dönüştürülür. Bu değer B/L ve cargo measurement raporunun temelidir.`,
          ],
        },
      ],
    },
    {
      heading: "3. Güvenlik ve Kayıt",
      sections: [
        {
          subheading: "3.1 Buhar maruziyeti",
          paragraphs: [
            `Manuel ölçümde dahi vapour'a maruz kalma riski vardır; doğru PPE (gas detector, uygun solunum koruması gerektiğinde) ve rüzgar üstü konumlanma esastır. H2S içeren kargolarda ek önlemler alınır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Toksik buhar",
              text: `Open ullage hatch kullanımı toksik buhar (özellikle H2S) nedeniyle yasaktır; ölçüm daima kapalı/kısıtlı yöntemle yapılır.`,
            },
          ],
        },
        {
          subheading: "3.2 Kayıt",
          bullets: [
            `Ullage Report (düzeltilmiş değerler dahil)`,
            `Free water dip kaydı`,
            `Sıcaklık/density ölçümleri`,
            `Otomatik ↔ manuel karşılaştırma notu`,
          ],
        },
      ],
    },
  ],
};

export default content;
