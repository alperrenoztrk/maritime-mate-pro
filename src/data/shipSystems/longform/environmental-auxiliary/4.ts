import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "HVAC ve Klima Sistemi",
  sectionId: "environmental-auxiliary",
  topicIndex: 4,
  estimatedPages: 22,
  intro: `HVAC (Heating, Ventilation, Air Conditioning) sistemi, yaşam mahalli ve kontrol odalarında sıcaklık, nem ve hava kalitesini düzenleyerek mürettebat sağlığı ve ekipman güvenilirliğini sağlar; ayrıca makine dairesi ve tehlikeli mahaller için havalandırma kritik bir emniyet işlevidir. Bu bölüm; HVAC bileşenlerini (chiller/soğutma çevrimi, hava işleme ünitesi AHU, kanal/damper), soğutma ve nem kontrolünü, taze hava/sirkülasyon dengesini ve pozitif basıncı, tehlikeli mahal havalandırması ve damper emniyetini, hijyen (Legionella) konularını ve bakım/arızayı ele alır.`,
  sources: [
    "SOLAS Ch. II-2 — ventilation & dampers",
    "ISO 7547 — air conditioning design",
    "WHO/ILO — accommodation air quality (MLC)",
    "Klas kuralları — ventilation arrangements",
  ],
  chapters: [
    {
      heading: "1. Bileşenler ve Soğutma",
      sections: [
        {
          subheading: "1.1 Chiller ve AHU",
          paragraphs: [
            `HVAC merkezinde bir soğutma çevrimi (chiller / direct expansion) bulunur; kompresör-kondenser-evaporatör soğutucu akışkanla ısı çeker. Hava işleme ünitesi (AHU), havayı soğutur/ısıtır, nemini alır ve kanallarla mahallere dağıtır. Geri dönen hava tazeyle karıştırılır.`,
          ],
          bullets: [
            `Chiller: merkezi soğutma`,
            `AHU: ısıt/soğut/nem al + dağıt`,
            `Taze hava + resirkülasyon karışımı`,
          ],
        },
        {
          subheading: "1.2 Nem kontrolü",
          paragraphs: [
            `Hava soğutucu serpantinde yoğuşan nem alınır (dehumidification); gerekirse yeniden ısıtılarak (reheat) konfor sağlanır. Aşırı nem küf/korozyon, aşırı kuruluk konforsuzluk yaratır. Nem ve sıcaklık termostat/higrostatla ayarlanır.`,
          ],
        },
      ],
    },
    {
      heading: "2. Hava Dengesi ve Emniyet",
      sections: [
        {
          subheading: "2.1 Pozitif basınç ve taze hava",
          paragraphs: [
            `Yaşam mahalli genelde pozitif basınçta tutulur; böylece kapı/açıklıklardan dışarı hava akar, makine dairesi dumanı/kokusu ve (tankerlerde) kargo buharı içeri giremez. Yeterli taze hava değişimi CO₂ ve koku birikimini önler.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Tankerde önemli",
              text: `Tankerlerde yaşam mahallinin pozitif basıncı, güverteden gelen kargo buharının içeri sızmasını engelleyen bir emniyet bariyeridir.`,
            },
          ],
        },
        {
          subheading: "2.2 Tehlikeli mahal havalandırması ve damper",
          paragraphs: [
            `Pompa dairesi, boya deposu ve akü odası gibi tehlikeli mahaller, patlayıcı gaz birikimini önlemek için mekanik (ex-proof) havalandırma ile sürekli süpürülür. Yangın damperleri (fire damper), yangın anında kanalları kapatarak alev/dumanı izole eder ve söndürme için mahalli sızdırmaz yapar.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "Fire damper kapatma",
              text: `Yangında ilgili mahallin fan ve fire damperleri uzaktan kapatılabilmeli; bu, dumanın yayılmasını önler ve total flooding söndürme için sızdırmazlık sağlar.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Hijyen",
      sections: [
        {
          subheading: "3.1 Legionella ve filtre hijyeni",
          paragraphs: [
            `HVAC nemli yüzeyleri ve su soğutmalı kuleler Legionella üreyebileceği ortamlardır; düzenli temizlik, dezenfeksiyon ve filtre değişimi sağlık için zorunludur. Kirli filtre hem hava kalitesini hem sistem verimini düşürür.`,
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
            `Bakım; filtre temizlik/değişim, soğutucu akışkan şarjı ve kaçak kontrolü, drenaj tavası temizliği, fan/kayış ve damper hareketi ile termostat/sensör kontrolünü kapsar. Soğutucu gaz kaçağı çevre (F-gas) ve verim açısından önemlidir.`,
          ],
          bullets: [
            `Filtre temizlik/değişim periyodik`,
            `Soğutucu kaçak kontrolü`,
            `Damper hareket ve fire damper testi`,
          ],
        },
        {
          subheading: "4.2 Arıza tablosu",
          paragraphs: [`Yaygın sorunlar:`],
          table: {
            headers: ["Belirti", "Neden", "Müdahale"],
            rows: [
              ["Soğutmuyor", "Soğutucu kaçağı/kompresör", "Şarj/kaçak ve kompresör kontrol"],
              ["Zayıf hava akışı", "Filtre tıkalı/fan", "Filtre + fan/kayış kontrol"],
              ["Aşırı nem/küf", "Drenaj/reheat", "Drenaj temizlik, nem ayarı"],
              ["Mahal koku/duman alıyor", "Pozitif basınç kaybı/damper", "Basınç ve damper kontrolü"],
            ],
          },
        },
      ],
    },
  ],
};

export default content;
