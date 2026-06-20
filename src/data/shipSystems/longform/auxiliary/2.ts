import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "Separatör ve Purifier",
  sectionId: "auxiliary",
  topicIndex: 2,
  estimatedPages: 24,
  intro: `Separatör (centrifugal separator / purifier), yakıt ve yağdan su ve katı kirleticileri merkezkaç kuvvetiyle ayıran kritik yardımcı makinedir. Ağır yakıt (HFO), motora gönderilmeden önce su, çamur ve katalitik kalıntılardan (cat fines) arındırılmalıdır; aksi halde enjeksiyon ekipmanı ve gömlek hızla aşınır. Bu bölüm; merkezkaç ayırma prensibini, purifier ve clarifier farkını, gravity disc (dam ring) seçimini, modern self-cleaning ve su izleme sistemlerini, cat fines tehlikesini ve bakım/arızayı mühendislik derinliğinde ele alır.`,
  sources: [
    "Alfa Laval / Westfalia separator manuals",
    "ISO 8217 — marine fuel standard (cat fines limit)",
    "CIMAC fuel handling guidelines",
    "IACS — fuel treatment",
  ],
  chapters: [
    {
      heading: "1. Çalışma Prensibi",
      sections: [
        {
          subheading: "1.1 Merkezkaç ayırma",
          paragraphs: [
            `Separatör, yüksek devirde dönen bowl (kase) içinde sıvıyı döndürür; yoğunluk farkı nedeniyle ağır faz (su, katı) dışa, hafif faz (temiz yakıt/yağ) içe toplanır. Disk seti (disc stack) ayırma yüzeyini büyütüp çökelmeyi hızlandırır. Çamur periyodik veya otomatik boşaltılır.`,
          ],
          bullets: [
            `Merkezkaç = binlerce g, hızlı ayırma`,
            `Disc stack ayırma alanını artırır`,
            `Su dışa, temiz yakıt içe, çamur dipte`,
          ],
        },
        {
          subheading: "1.2 Purifier vs clarifier",
          paragraphs: [
            `Purifier modunda su fazı vardır ve su sürekli boşaltılır; gravity disc ile su/yakıt arayüzü (interface) ayarlanır. Clarifier modunda su yoktur, yalnızca katı ayrılır; su girişi olmadığından gravity disc yerine kör tapa kullanılır. Sırayla purifier→clarifier dizilimi en iyi temizliği verir.`,
          ],
          table: {
            headers: ["Mod", "Ayırır", "Su contası"],
            rows: [
              ["Purifier", "Su + katı", "Var (gravity disc)"],
              ["Clarifier", "Katı (su yok)", "Yok (blank disc)"],
            ],
          },
        },
      ],
    },
    {
      heading: "2. Ayar ve Modern Sistemler",
      sections: [
        {
          subheading: "2.1 Gravity disc seçimi",
          paragraphs: [
            `Purifier'da gravity disc (dam ring) çapı, yakıtın yoğunluğuna ve sıcaklığına göre seçilir; yanlış disc su/yakıt arayüzünü bozar (yakıt suya, su yakıta kaçar). Doğru seçim için üretici nomogramı ve yakıt yoğunluğu/sıcaklığı kullanılır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Sıcaklık etkisi",
              text: `Yüksek besleme sıcaklığı viskoziteyi düşürüp ayırmayı iyileştirir; HFO genelde ~98 °C civarında ayrıştırılır. Düşük sıcaklık ayırma verimini düşürür.`,
            },
          ],
        },
        {
          subheading: "2.2 Self-cleaning ve su izleme",
          paragraphs: [
            `Modern separatörler self-cleaning (otomatik bowl boşaltma) ve su muhtevası izlemeli (water transducer) çalışır; gravity disc'siz, su deşarjı sensörle kontrol edilir. Bu, geniş yoğunluk aralığında elle ayar gereksinimini azaltır.`,
          ],
        },
      ],
    },
    {
      heading: "3. Cat Fines ve Yakıt Kalitesi",
      sections: [
        {
          subheading: "3.1 Cat fines tehlikesi",
          paragraphs: [
            `Cat fines (alüminyum-silikon katalizör kalıntısı), HFO içinde sert aşındırıcı partiküllerdir; gömlek, segman ve enjeksiyon ekipmanını hızla aşındırır. ISO 8217 bunker Al+Si limiti koyar, ancak motor girişinde değer çok daha düşük olmalıdır. Separatör verimi cat fines'ı azaltmanın ana yoludur.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Al+Si limiti",
              text: `Bunker'da Al+Si yüksekse, düşük debi ve doğru sıcaklıkta separasyon ile motor girişindeki değer kabul edilebilir seviyeye indirilmelidir; aksi halde ağır aşınma kaçınılmazdır.`,
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
            `Bakım; bowl/disc seti sökme-temizleme, conta (o-ring) değişimi, dişli kutusu/sürtünme kavraması (friction clutch) kontrolü, su contası testi ve titreşim izlemeyi kapsar. Düzenli temizlik ayırma verimini korur.`,
          ],
          bullets: [
            `Disc stack ve bowl temizliği periyodik`,
            `O-ring/conta yenileme (sızdırmazlık)`,
            `Friction clutch ve fren kontrolü`,
          ],
        },
        {
          subheading: "4.2 Arıza tablosu",
          paragraphs: [`Yaygın sorunlar:`],
          table: {
            headers: ["Belirti", "Neden", "Müdahale"],
            rows: [
              ["Temiz çıkışta su var", "Gravity disc yanlış/contadan kaçak", "Disc seçimi + conta kontrol"],
              ["Yakıt suya kaçıyor (sealing kaybı)", "Su contası kurulamıyor", "Sealing water/ayar kontrolü"],
              ["Aşırı titreşim", "Bowl dengesizliği/birikim", "Bowl temizliği + denge"],
              ["Devire çıkmıyor", "Friction clutch aşınmış", "Clutch balata değişimi"],
            ],
          },
        },
      ],
    },
  ],
};

export default content;
