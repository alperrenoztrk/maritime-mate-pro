import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Crankcase inspection ve oil mist takibi",
  roleSlug: "ikinci-muhendis",
  taskIndex: 11,
  estimatedPages: 24,
  intro: `Ana makine karteri (crankcase) inspection'ı, motorun en kritik hareketli parçalarının — main/crank/crosshead yatakları, crank pin, tie bolt — sağlığını gözlemleme imkânıdır; ancak aynı zamanda crankcase explosion (karter patlaması) riski nedeniyle en dikkatli güvenlik prosedürünü gerektirir. İkinci Mühendis; programlı veya alarm sonrası inspection'da yatak durumunu ve white metal smear belirtilerini kontrol eder, oil mist detector alarmında ise patlama riskine karşı katı bekleme kuralına uyar. Bu bölüm crankcase inspection ve oil mist takibini ele alır.`,
  sources: [
    "Üretici (MAN B&W / WinGD) crankcase inspection prosedürleri",
    "Oil Mist Detector (OMD) çalışma ve alarm prosedürleri",
    "Crankcase explosion önleme — relief valve/oil mist",
    "Bearing condition monitoring",
    "LOTO / turning gear güvenlik prosedürleri",
  ],
  chapters: [
    {
      heading: "1. Crankcase'in Kritikliği",
      sections: [
        {
          subheading: "1.1 Hareketli parçaların kalbi",
          paragraphs: [
            `Crankcase, motorun ana hareketli parçalarını barındırır; bir yatak hasarı veya gevşek tie bolt, katastrofik arızaya yol açabilir. İkinci Mühendis, düzenli inspection ile bu parçaların durumunu izler ve sorunları erken yakalar. Aynı zamanda crankcase, patlama riski nedeniyle en dikkatli yaklaşılan bölgedir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Crankcase explosion riski",
              text: `Aşırı ısınan bir yatak, yağı buharlaştırıp oil mist (yağ sisi) oluşturur; bu sis tutuşursa karter patlaması olur. Bu yüzden oil mist alarmı asla göz ardı edilmez ve sıcakken crankcase açılmaz.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Oil Mist Detector (OMD)",
      sections: [
        {
          subheading: "2.1 Erken uyarı sistemi",
          paragraphs: [
            `Oil Mist Detector, crankcase içindeki yağ sisi yoğunluğunu izler; bir yatak ısınıp yağı buharlaştırdığında sis artar ve OMD alarm verir. Bu alarm, yaklaşan bir yatak hasarının ve potansiyel patlamanın erken uyarısıdır. İkinci Mühendis, OMD'nin çalışır ve kalibrasyonlu olmasını sağlar.`,
          ],
        },
        {
          subheading: "2.2 Alarm sonrası bekleme kuralı",
          paragraphs: [
            `Oil mist alarmında motor yavaşlatılır/durdurulur ve crankcase explosion riski nedeniyle yatakların soğuması için katı bir bekleme uygulanır (genelde en az ~30 dakika); bearing sıcaklığı stabilize olmadan crankcase kapağı AÇILMAZ. Sıcak crankcase'e taze hava girişi, ikincil bir patlamayı tetikleyebilir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "Açmadan önce soğut",
              text: `Oil mist alarmı sonrası crankcase kapağını hemen açmak, içeri hava sokarak patlamaya yol açabilir. Üreticinin öngördüğü soğuma süresi (genelde ≥30 dk) beklenir; bu kural hayat kurtarır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. İnceleme Noktaları",
      sections: [
        {
          subheading: "3.1 Yatak ve tie bolt",
          paragraphs: [
            `Crankcase inspection'da; main bearing, crank pin (bottom end) bearing, crosshead bearing durumu, white metal smear (beyaz metal sıvanması — aşırı ısınma belirtisi), tie bolt gevşekliği ve genel yağ filmi durumu kontrol edilir. White metal smear veya renk değişimi, bir yatağın aşırı ısındığını ve müdahale gerektiğini gösterir.`,
          ],
          table: {
            caption: "Crankcase inspection bulguları",
            headers: ["Gözlem", "Anlamı"],
            rows: [
              ["White metal smear", "Yatak aşırı ısınması"],
              ["Renk değişimi/ısı izi", "Lokal aşırı sıcaklık"],
              ["Tie bolt gevşek", "Bağlantı bütünlüğü riski"],
              ["Metal partikül", "Yatak aşınması"],
            ],
          },
        },
      ],
    },
    {
      heading: "4. Güvenlik Prosedürü",
      sections: [
        {
          subheading: "4.1 LOTO ve turning gear",
          paragraphs: [
            `Inspection, motor durdurulmuş, soğutulmuş, LOTO ile izole ve turning gear devrede/kilitli halde yapılır. Crankcase'e giriş enclosed space ve sıcak yüzey kurallarına tabidir. Açık alev/kıvılcım kaynağı uzak tutulur. İkinci Mühendis tüm bu adımları doğrular.`,
          ],
          bullets: [
            `Motor durdurulmuş ve yeterince soğumuş`,
            `LOTO uygulanmış, turning gear kilitli`,
            `Oil mist alarmı sonrası bekleme süresine uyulmuş`,
            `Açık alev/kıvılcım yok, KKD tam`,
          ],
        },
      ],
    },
    {
      heading: "5. Kayıt ve Takip",
      sections: [
        {
          subheading: "5.1 Bulgu ve trend",
          paragraphs: [
            `Inspection bulguları (yatak durumu, ölçümler, foto) kaydedilir ve trend izlenir. Bir yatakta tekrarlayan ısınma veya artan partikül, kök neden araştırması ve planlı müdahale gerektirir. Bu kayıtlar, büyük bir arıza öncesi karar vermenin temelidir.`,
          ],
        },
      ],
    },
    {
      heading: "6. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "6.1 Crankcase inspection kontrolü",
          bullets: [
            `Oil mist detector çalışır ve kalibrasyonlu mu?`,
            `Oil mist alarmında bekleme kuralına (≥30 dk soğuma) uyuldu mu?`,
            `Bearing sıcaklığı stabilize olmadan crankcase açılmadı mı?`,
            `Yatak/crank pin/crosshead ve white metal smear kontrol edildi mi?`,
            `Tie bolt durumu kontrol edildi mi?`,
            `LOTO/turning gear kilitli ve motor soğutulmuş muydu?`,
            `Bulgular kaydedilip trend izleniyor mu?`,
          ],
          paragraphs: [
            `Crankcase inspection ve oil mist takibi, İkinci Mühendisin hem ana makinenin en kritik parçalarını koruduğu hem de en ciddi güvenlik kuralına uyduğu görevdir. Oil mist alarmına saygı, soğuma kuralına katı uyum ve dikkatli yatak incelemesi; hem karter patlamasını hem katastrofik yatak hasarını önleyerek hayat ve makine güvenliğini birlikte korur.`,
          ],
        },
      ],
    },
  ],
};

export default content;
