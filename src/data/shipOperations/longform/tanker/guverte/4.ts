import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Inert Gas System (IGS) operasyonu ve O2 seviyesi takibi",
  shipType: "tanker",
  dept: "guverte",
  opIndex: 4,
  estimatedPages: 24,
  intro: `Inert Gas System (IGS), cargo tank atmosferini yanma için gereken oksijenden yoksun bırakarak (O2 < %8, pratikte < %5 hedefi) ve tankı pozitif basınçta tutarak patlayıcı atmosfer oluşumunu önleyen, tanker güvenliğinin belkemiği sistemdir. Bu bölüm IGS başlatma, deck seal/scrubber, O2 izleme, pozitif basınç yönetimi ve P/V valf ayarlarını ele alır.`,
  sources: [
    "SOLAS II-2 Reg. 4 (Inert gas systems)",
    "ISGOTT 6th edition — Ch. 7",
    "IMO Revised IGS Guidelines",
  ],
  chapters: [
    {
      heading: "1. IGS Prensibi",
      sections: [
        {
          subheading: "1.1 Neden inert gaz?",
          paragraphs: [
            `Yanma için yakıt (HC buharı), oksijen ve ateşleme kaynağı gerekir. IGS, oksijeni kritik eşiğin altına çekerek üçgenin bir kenarını kaldırır. O2 %8'in altında HC/hava karışımı patlamaz; pratikte güvenlik payıyla %5 hedeflenir.`,
          ],
          bullets: [
            `Inert gaz kaynağı: flue gas (kazan) veya inert gas generator`,
            `Hedef: tank O2 < %8 (pratikte < %5)`,
            `Tank daima pozitif basınçta (hava girişi engellenir)`,
          ],
        },
      ],
    },
    {
      heading: "2. Sistem Bileşenleri ve Başlatma",
      sections: [
        {
          subheading: "2.1 Scrubber ve deck seal",
          paragraphs: [
            `Flue gas; scrubber'da soğutulur ve SOx/partikülden arındırılır. Deck water seal, kargo tanklarından makine dairesine gaz/geri-akışı önleyen kritik bariyerdir; su seviyesi sürekli izlenir. Deck seal'ın kuruması geri-akış ve patlama riski yaratır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Deck seal su seviyesi",
              text: `Deck water seal seviyesi düşerse kargo buharı makine dairesine geri kaçabilir; seviye ve alarm sürekli kontrol edilir.`,
            },
          ],
        },
        {
          subheading: "2.2 Başlatma checklist'i",
          paragraphs: [
            `IGS startup; scrubber su akışı, deck seal seviyesi, O2 analyzer kalibrasyonu ve blower devreye alma adımlarını içeren checklist ile yapılır. Tank'a inert verilmeden önce çıkış O2 değeri (< %5) doğrulanır.`,
          ],
        },
      ],
    },
    {
      heading: "3. Operasyon Boyunca Yönetim",
      sections: [
        {
          subheading: "3.1 Discharge ve pozitif basınç",
          paragraphs: [
            `Boşaltma sırasında tank seviyesi düştükçe yerini inert gaz alır; tank pozitif basınçta (tipik +200 mmWG civarı) tutulur. Negatif basınç dış havanın girmesine ve tank implozyonuna yol açabilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Negatif basınç = implozyon",
              text: `Pozitif basınç kaybı hem hava girişiyle patlayıcı atmosfer hem de vakumla tank gövdesi çökmesi riski yaratır.`,
            },
          ],
          table: {
            caption: "Tipik O2/basınç hedefleri",
            headers: ["Parametre", "Hedef"],
            rows: [
              ["Inert gas O2 (deck'e giriş)", "< %5"],
              ["Tank atmosferi O2", "< %8"],
              ["Tank basıncı", "pozitif (örn. +200 mmWG)"],
            ],
          },
        },
        {
          subheading: "3.2 P/V valf ve alarm",
          paragraphs: [
            `P/V (pressure/vacuum) valfleri tankı aşırı basınç ve vakuma karşı korur; flame screen'leri temiz tutulur. Düşük basınç, yüksek O2 ve deck seal alarmları aktif ve test edilmiş olmalıdır.`,
          ],
        },
      ],
    },
    {
      heading: "4. Kayıt ve Kontrol Listesi",
      sections: [
        {
          subheading: "4.1 IGS log ve son kontrol",
          bullets: [
            `Scrubber su akışı ve deck seal seviyesi normal mi?`,
            `O2 analyzer kalibre, çıkış O2 < %5 mi?`,
            `Tüm tanklar pozitif basınçta mı?`,
            `P/V valf ve flame screen kontrol edildi mi?`,
            `IGS log (O2, basınç) düzenli işleniyor mu?`,
          ],
          paragraphs: [
            `IGS arızası kargo operasyonunu durdurma sebebidir; sistem güvenli çalışmadan yükleme/boşaltma yapılmaz.`,
          ],
        },
      ],
    },
  ],
};

export default content;
