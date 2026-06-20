import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "Acil Tahliye ve Yangın Devre Dışı Bırakma (Quick Closing & Shut-off)",
  sectionId: "fire-safety",
  topicIndex: 8,
  estimatedPages: 23,
  intro: `Bir makine dairesi yangınında, yangının yakıt ve havayla beslenmesini kesmek söndürme kadar kritiktir. Quick closing valve (hızlı kapama valfi), emergency stop, fan/damper kapatma ve fuel oil transfer pump trip gibi remote shut-off düzenekleri, mahalli güvenli biçimde "kapatarak" CO₂/foam deşarjına hazırlar. Bu bölüm; quick closing valf sistemini ve uzaktan tetiklemeyi, makine dairesi acil durdurma (emergency stops) matrisini, havalandırma ve damper kapatmayı, skylight/kapı kapatmayı, bu sistemlerin söndürme sistemiyle ilişkisini ve bakım/arızayı mühendislik derinliğinde ele alır.`,
  sources: [
    "SOLAS Ch. II-2 Reg. 4 & 8 — fuel oil arrangements & shut-off",
    "FSS Code — closing appliances",
    "IACS UR — remote stops & quick closing valves",
    "Klas kuralları — machinery space fire safety",
  ],
  chapters: [
    {
      heading: "1. Quick Closing Valve",
      sections: [
        {
          subheading: "1.1 Görev ve tetikleme",
          paragraphs: [
            `Quick closing valve, yakıt/yağ tanklarının (settling, service, lub oil, HFO storage) çıkışına takılı, uzaktan tek hareketle kapatılabilen valftir. Yangın anında makine dairesi dışındaki bir noktadan (genelde bir kablo/pnömatik/hidrolik kabin) hepsi birden tetiklenir; böylece yangına yakıt akışı kesilir.`,
          ],
          bullets: [
            `Tank çıkışlarında uzaktan kapanır valf`,
            `Makine dairesi dışından tek noktadan tetiklenir`,
            `Yangının yakıt beslemesini keser`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Yakıtı kesmeden söndürme zor",
              text: `Sürekli yakıt beslenen bir makine dairesi yangını söndürülemez veya yeniden alevlenir; quick closing valfler CO₂ deşarjından önce kapatılır.`,
            },
          ],
        },
        {
          subheading: "1.2 Reset ve kötüye kullanım",
          paragraphs: [
            `Quick closing valfler kapandıktan sonra tek tek elle (mahalde) reset edilir; yanlışlıkla tetikleme makineyi durdurur. Bu yüzden tetikleme noktaları korumalı ve işaretlidir. Düzenli test, valflerin gerçekten kapandığını doğrular.`,
          ],
        },
      ],
    },
    {
      heading: "2. Emergency Stops ve Trip Matrisi",
      sections: [
        {
          subheading: "2.1 Uzaktan durdurma kapsamı",
          paragraphs: [
            `Makine dairesi dışından uzaktan durdurulabilmesi gereken ekipmanlar: yakıt transfer/booster pompaları, yağlama yağı pompaları, separatörler, fanlar (havalandırma) ve kazan brülörü. Bu "emergency stop" düzeni, mahalli yakıt ve havadan izole eder.`,
          ],
          table: {
            headers: ["Ekipman", "Neden durdurulur"],
            rows: [
              ["Yakıt transfer/booster pompası", "Yangına yakıt akışını keser"],
              ["Yağ (LO) pompaları", "Yağ püskürmesini durdurur"],
              ["Separatörler", "Sıcak yağ kaynağını keser"],
              ["Havalandırma fanları", "Oksijeni keser / CO₂ tutar"],
              ["Kazan brülörü", "Alev kaynağını keser"],
            ],
          },
        },
      ],
    },
    {
      heading: "3. Havalandırma ve Açıklık Kapatma",
      sections: [
        {
          subheading: "3.1 Damper ve fan kapatma",
          paragraphs: [
            `CO₂/köpük deşarjı öncesi havalandırma fanları durdurulmalı ve damperler (fire damper) kapatılmalıdır; aksi halde söndürücü gaz kaçar ve dışarıdan oksijen gelir. Damperler genelde uzaktan, mahallin dışından kapatılabilir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "Sızdırmazlık şart",
              text: `Total flooding söndürme için mahal sızdırmaz hale getirilmeli: fanlar dursun, damperler/skylight/kapılar kapansın. Aksi halde söndürme konsantrasyonuna ulaşılamaz.`,
            },
          ],
        },
        {
          subheading: "3.2 Skylight, kapı ve açıklıklar",
          paragraphs: [
            `Makine dairesi skylight'ları, kapıları ve diğer açıklıkları yangın anında kapatılabilmeli; uzaktan kapatma veya hızlı manuel kapama düzenleri bulunur. Kapatma sırası ve sorumluları yangın planında ve acil durum prosedüründe tanımlıdır.`,
          ],
        },
      ],
    },
    {
      heading: "4. Söndürmeyle İlişki, Bakım ve Arıza",
      sections: [
        {
          subheading: "4.1 Söndürme öncesi kapatma sırası",
          paragraphs: [
            `Tipik sıra: personel tahliyesi ve sayımı → emergency stop (pompalar, fanlar) → quick closing valfler → açıklık/damper kapatma → mahal sızdırmazlık doğrulama → CO₂/foam deşarjı. Bu sıra hem can güvenliği hem söndürme etkinliği için kritiktir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Neden sıra önemli?",
              text: `Yakıt ve hava kesilmeden yapılan deşarj genelde yetersiz kalır; kapatma adımları atlanırsa yangın söndürülemez ve değerli CO₂ stoğu boşa harcanır.`,
            },
          ],
        },
        {
          subheading: "4.2 Bakım ve arıza tablosu",
          paragraphs: [
            `Bakım; quick closing valf test (kapanma doğrulama) ve reset, emergency stop devre testi, damper hareket ve sızdırmazlık kontrolünü kapsar.`,
          ],
          table: {
            headers: ["Belirti", "Neden", "Müdahale"],
            rows: [
              ["Quick closing valf kapanmıyor", "Mekanizma sıkışması/kablo", "Test + mekanizma bakımı"],
              ["Emergency stop çalışmıyor", "Devre/rölе arızası", "Stop devresi testi"],
              ["Damper tam kapanmıyor", "Korozyon/menteşe", "Damper bakımı, conta"],
              ["Reset edilemiyor", "Yay/mekanizma", "Mahalde reset ve servis"],
            ],
          },
        },
      ],
    },
  ],
};

export default content;
