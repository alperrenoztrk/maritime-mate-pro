import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "Dört Zamanlı Orta Devirli Motorlar",
  sectionId: "main-engine",
  topicIndex: 1,
  estimatedPages: 25,
  intro: `Dört zamanlı (4-stroke) orta devirli dizel motorlar; yardımcı jeneratör (auxiliary/diesel generator), feribot, ro-ro, balıkçı ve diesel-electric tahrik sistemlerinin temel makinesidir. İki zamanlıdan farklı olarak güç stroku iki krank dönüşünde bir kez üretilir; kompakt, yüksek devirli ve dişli kutusu/jeneratör ile eşleşmeye uygundur. Bu bölüm; dört zamanlı çevrimi ve supap zamanlamasını, ana parçaları ve trunk piston yapısını, yakıt sistemi ve devir regülasyonunu (governor), turboşarj ve performans izlemeyi, MDO/HFO yakıt esnekliğini ve bakım/arızayı ele alır.`,
  sources: [
    "MAN Energy Solutions / Wärtsilä 4-stroke manuals",
    "MARPOL Annex VI — NOx Technical Code",
    "IACS UR M — machinery",
    "Pounder's Marine Diesel Engines",
  ],
  chapters: [
    {
      heading: "1. Dört Zamanlı Çevrim",
      sections: [
        {
          subheading: "1.1 Dört strok ve supap zamanlaması",
          paragraphs: [
            `Çevrim dört stroktan oluşur: emme (intake), sıkıştırma (compression), güç (power) ve egzoz. İki krank dönüşünde (720°) bir güç stroku üretilir. Emme ve egzoz supapları kam mili ile zamanlanır; supap bindirmesi (valve overlap) silindirin taze hava ile süpürülmesini ve turboşarj veriminin artmasını sağlar.`,
          ],
          bullets: [
            `Emme → Sıkıştırma → Güç → Egzoz (720°)`,
            `Supaplar kam mili ile sürülür`,
            `Valve overlap: süpürme + turbo verimi`,
          ],
        },
        {
          subheading: "1.2 İki zamanlıdan farklar",
          paragraphs: [
            `Dört zamanlı motor daha yüksek devirde (~500-1000 rpm) çalışır, trunk piston (crosshead yok) kullanır ve tek yağ devresi (silindir ve karter ortak) ile yağlanır. Güç yoğunluğu yüksektir; ancak büyük gemi tahriki için genelde dişli kutusu veya elektrik tahrikiyle eşleştirilir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Trunk piston",
              text: `Dört zamanlıda piston yan kuvveti doğrudan gömleğe biner (trunk piston); ayrı stuffing box yoktur, bu yüzden yakıt/yağ kalitesi karter yağını daha çok etkiler.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Yakıt Sistemi ve Devir Kontrolü",
      sections: [
        {
          subheading: "2.1 Yakıt esnekliği (MDO/HFO)",
          paragraphs: [
            `Orta devirli motorlar MDO/MGO ile çalışabildiği gibi, ısıtma ve viskozite kontrolüyle HFO da yakabilir. Jeneratör motorları manevra/limanda hafif yakıta (MGO) geçebilir. Yakıtın doğru viskoziteye (enjeksiyonda ~10-15 cSt) ısıtılması atomizasyon ve verim için kritiktir.`,
          ],
        },
        {
          subheading: "2.2 Governor ve devir regülasyonu",
          paragraphs: [
            `Jeneratör motorlarında sabit devir (frekans) gerekir; bu yüzden governor (regülatör) yük değişiminde yakıtı ayarlayarak devri sabit tutar. Tahrik motorlarında ise governor devri operatör komutuna göre ayarlar. Paralel çalışan jeneratörlerde yük paylaşımı (load sharing) governor droop ayarıyla yönetilir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "Frekans kararlılığı",
              text: `Jeneratör motorunda devir/frekans kararlılığı şebeke kalitesini belirler; governor arızası blackout veya yük paylaşım sorununa yol açabilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Turboşarj ve Performans",
      sections: [
        {
          subheading: "3.1 Turboşarj ve intercooler",
          paragraphs: [
            `Egzozla çevrilen turboşarj, emme havasını basar; intercooler (charge air cooler) havayı soğutarak yoğunluğu artırır ve NOx'u düşürür. Charge air sıcaklığı ve basıncı performansın doğrudan göstergesidir.`,
          ],
          table: {
            headers: ["Parametre", "İzlenen", "Sapma anlamı"],
            rows: [
              ["Egzoz sıc. (silindir)", "Dengeli", "Yüksek tek silindir: enjektör/yük"],
              ["Charge air basıncı", "Yüke uygun", "Düşük: TC/air cooler kirli"],
              ["TC devri", "Stabil", "Düşük: kirlenme/surging"],
              ["Charge air sıc.", "Soğutucuya bağlı", "Yüksek: cooler tıkalı"],
            ],
          },
        },
      ],
    },
    {
      heading: "4. Bakım ve Arıza",
      sections: [
        {
          subheading: "4.1 Periyodik bakım",
          paragraphs: [
            `Bakım; supap klerans ayarı, enjektör testi, segman/gömlek aşınma ölçümü, yatak açıklık kontrolü, turboşarj ve cooler temizliği ile yağ/yakıt filtre değişimini kapsar. Çalışma saatine göre PMS uygulanır.`,
          ],
          bullets: [
            `Supap klerans (tappet) ayarı periyodik`,
            `Enjektör pop test ve sprey kontrolü`,
            `Yağ analizi ile aşınma takibi`,
          ],
        },
        {
          subheading: "4.2 Arıza tablosu",
          paragraphs: [`Yaygın sorunlar:`],
          table: {
            headers: ["Belirti", "Neden", "Müdahale"],
            rows: [
              ["Zor çalışma/teklemeli", "Enjektör/yakıt havası", "Enjektör + yakıt sistem purge"],
              ["Devir/frekans dalgalı", "Governor ayarı/arıza", "Governor kontrol/servis"],
              ["Aşırı duman", "Yük dengesiz, enjeksiyon", "Yük dağılımı, enjektör"],
              ["Yatak/yağ basıncı uyarısı", "Yağ basıncı/açıklık", "Yağ pompası, yatak muayenesi"],
            ],
          },
        },
      ],
    },
  ],
};

export default content;
