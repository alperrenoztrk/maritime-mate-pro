import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Manevra ve bağlama operasyonlarına gözlem",
  roleSlug: "guverte-stajyer",
  taskIndex: 9,
  estimatedPages: 22,
  intro: `Manevra ve bağlama, denizciliğin en yoğun ve en öğretici anlarındandır; geminin fiziği, ekip koordinasyonu ve karar verme aynı anda iş başındadır. Güverte stajyeri, köprüüstünden veya bağlama istasyonundan manevranın tüm evrelerini (pilot boarding, swing, berthing, line ashore, tug operasyonları) gözlemler ve TRB'ye not alır. Pilot card içeriği, manoeuvring booklet ve turning circle/stopping distance verilerini öğrenir. Bu bölüm stajyerin manevra ve bağlama gözlemini ele alır.`,
  sources: [
    "ICS Bridge Procedures Guide",
    "IMO Res. A.601 — manoeuvring information display",
    "STCW — manoeuvring ve mooring yetkinlikleri",
    "Pilot card / wheelhouse poster / manoeuvring booklet",
    "Şirket SMS — mooring/berthing prosedürleri",
  ],
  chapters: [
    {
      heading: "1. Manevranın Öğreticiliği",
      sections: [
        {
          subheading: "1.1 Her şey bir arada",
          paragraphs: [
            `Manevrada geminin atalet, dümen/pervane tepkisi, rüzgâr/akıntı etkisi, römorkör kullanımı ve ekip koordinasyonu aynı anda gözlenir. Stajyer, kitaptaki bilgiyi gerçek harekette görür. İyi bir gözlem, ileride kendi manevra kararlarının temelini kurar.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Gözlemle ve sor",
              text: `Manevra sırasında stajyer işin akışını bozmadan gözlemler ve sonradan sorularını sorar. "Neden o anda dümen kırıldı?" gibi sorular, manevra mantığını öğrenmenin anahtarıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Manevra Evreleri",
      sections: [
        {
          subheading: "2.1 Pilot boarding'den berthing'e",
          paragraphs: [
            `Stajyer; pilot boarding (kılavuz biniş), approach, swing (dönüş), berthing (yanaşma), line ashore (halat verme) ve tug (römorkör) operasyonlarının her evresini gözlemler. Her evrenin amacını ve ekip görevini TRB'ye not alır. Evreler arası geçişte hız, açı ve römorkör kullanımı dikkatle izlenir.`,
          ],
          table: {
            caption: "Manevra evreleri",
            headers: ["Evre", "Odak"],
            rows: [
              ["Pilot boarding", "Güvenli transfer, MPX"],
              ["Approach/swing", "Hız, açı, akıntı/rüzgâr"],
              ["Tug operations", "Römorkör bağlama/itme-çekme"],
              ["Berthing", "Yanaşma açısı, fender teması"],
              ["Line ashore", "Halat verme sırası, make fast"],
            ],
          },
        },
      ],
    },
    {
      heading: "3. Manevra Verileri",
      sections: [
        {
          subheading: "3.1 Pilot card ve booklet",
          paragraphs: [
            `Stajyer; pilot card (geminin manevra özet bilgisi), manoeuvring booklet ve wheelhouse poster içeriğini öğrenir. Turning circle (dönüş çapı), stopping distance (durma mesafesi) ve crash stop gibi verilerin ne anlama geldiğini kavrar. Bu veriler, manevranın "fizik sınırlarını" gösterir.`,
          ],
          bullets: [
            `Pilot card: özet manevra verisi`,
            `Turning circle: dönüş çapı`,
            `Stopping/crash stop distance`,
            `Manoeuvring booklet detayları`,
          ],
        },
      ],
    },
    {
      heading: "4. Bağlama İstasyonu Gözlemi",
      sections: [
        {
          subheading: "4.1 Saha perspektifi",
          paragraphs: [
            `Stajyer, bağlama istasyonundan gözlem yaptığında halat işlerini, winch operasyonunu ve snap-back tehlikesini yakından görür. Köprüüstü ve istasyon arasındaki haberleşmenin önemini kavrar. Güvenli konumlanma ve KKD kuralları burada da geçerlidir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Gözlemde bile snap-back",
              text: `Bağlama istasyonunda gözlem yaparken bile stajyer gergin halat ve snap-back bölgesinden uzak durur. Manevra alanı, gözlemci için de tehlikelidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. TRB ve Değerlendirme",
      sections: [
        {
          subheading: "5.1 Gözlemi kayda dökmek",
          paragraphs: [
            `Stajyer, gözlemlediği manevraları ve öğrendiği verileri TRB'ye işler ve eğitmen zabitle değerlendirir. Bu kayıt, hem öğrenmeyi pekiştirir hem yetkinlik kanıtı oluşturur.`,
          ],
        },
      ],
    },
    {
      heading: "6. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "6.1 Manevra gözlem kontrolü",
          bullets: [
            `Manevranın tüm evreleri (pilot/swing/berth/line/tug) gözlemlendi mi?`,
            `Pilot card içeriği öğrenildi mi?`,
            `Turning circle/stopping distance verisi kavrandı mı?`,
            `Bağlama istasyonu ve snap-back tehlikesi gözlendi mi?`,
            `Köprüüstü-istasyon haberleşmesinin önemi anlaşıldı mı?`,
            `Gözlemler TRB'ye işlendi ve değerlendirildi mi?`,
          ],
          paragraphs: [
            `Manevra ve bağlama gözlemi, güverte stajyerinin denizciliğin en dinamik anlarını canlı öğrendiği bir fırsattır. Evreleri gözlemlemek, manevra verilerini anlamak ve güvenli gözlem disiplini; stajyeri ileride kendi manevra kararlarını güvenle verecek bir zabite hazırlar.`,
          ],
        },
      ],
    },
  ],
};

export default content;
