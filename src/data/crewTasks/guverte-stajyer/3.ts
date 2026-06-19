import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Emniyet tatbikatlarına katılım",
  roleSlug: "guverte-stajyer",
  taskIndex: 3,
  estimatedPages: 22,
  intro: `Emniyet tatbikatları (drills), gerçek bir acil durumda doğru ve hızlı tepki vermeyi sağlayan kas hafızasını kurar. Güverte stajyeri, tüm drill'lerde muster station'da hazır bulunur, verilen görevleri yerine getirir ve can yeleği giyme, EEBD kullanma, yangın söndürücü kullanma ve kaçış yollarını öğrenir. Gözlemlerini Training Record Book'a (TRB) kaydeder. Bu bölüm stajyerin emniyet tatbikatlarına katılımını ele alır.`,
  sources: [
    "SOLAS Chapter III — drills ve muster",
    "STCW A-VI/1 — temel emniyet eğitimi",
    "FSS Code & LSA Code",
    "Muster List / Station Bill",
    "Şirket SMS — drill prosedürleri",
  ],
  chapters: [
    {
      heading: "1. Tatbikatın Amacı",
      sections: [
        {
          subheading: "1.1 Kas hafızası kurmak",
          paragraphs: [
            `Gerçek bir acil durumda insan düşünmez, tatbik ettiğini uygular. Drill'ler bu yüzden kritiktir: stajyer, can yeleği giymeyi, alarm sinyallerini ve görevini ezberden değil refleksle yapabilecek hale gelir. Tatbikata ciddiyetle katılmak, ileride hayat kurtarır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Ciddiye al",
              text: `Drill bir formalite değildir. Stajyer, tatbikatı gerçekmiş gibi yaparak doğru refleksi kazanır; baştan savma katılım, gerçek bir acilde panik demektir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Muster ve Station Bill",
      sections: [
        {
          subheading: "2.1 Toplanma ve görev",
          paragraphs: [
            `Alarm çaldığında stajyer, can yeleğiyle muster station'a gider ve Station Bill'de tanımlı görevini yapar. İlk günden itibaren toplanma yerini, alarm sinyallerini ve kendi görevini öğrenir. Muster, herkesin sayılması ve organize müdahalenin başlangıcıdır.`,
          ],
          bullets: [
            `Alarm sinyallerini tanı`,
            `Muster station'ı ve görevini bil`,
            `Can yeleği ve gerekli ekipmanla git`,
            `Sayıma katıl, talimat bekle`,
          ],
        },
      ],
    },
    {
      heading: "3. Temel Emniyet Becerileri",
      sections: [
        {
          subheading: "3.1 Can yeleği, EEBD, söndürücü",
          paragraphs: [
            `Stajyer; can yeleğini doğru ve hızlı giymeyi, EEBD (Emergency Escape Breathing Device) ile dumanlı ortamdan kaçmayı ve yangın söndürücüyü doğru kullanmayı (PASS: Pull-Aim-Squeeze-Sweep) öğrenir. Bu beceriler drill'lerde tekrar edilerek pekiştirilir.`,
          ],
          table: {
            caption: "Temel ekipman ve kullanım",
            headers: ["Ekipman", "Kullanım"],
            rows: [
              ["Can yeleği", "Hızlı giyme, kayış/ışık/düdük"],
              ["EEBD", "Dumanlı ortamdan kaçış (kullanım süresi sınırlı)"],
              ["Yangın söndürücü", "PASS: Pull-Aim-Squeeze-Sweep"],
              ["Immersion suit", "Soğuk suda hayatta kalma"],
            ],
          },
        },
        {
          subheading: "3.2 EEBD sınırı",
          paragraphs: [
            `EEBD yalnızca kaçış içindir, yangınla mücadele için değildir ve sınırlı süre (örn. ~10-15 dk) hava sağlar. Stajyer bu sınırı bilir; EEBD ile yangına girilmez, sadece güvenli alana kaçılır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "EEBD ile yangına girilmez",
              text: `EEBD bir kaçış cihazıdır; yangınla mücadele için SCBA gerekir. Bu ayrımı bilmemek ölümcül olabilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Kaçış Yolları",
      sections: [
        {
          subheading: "4.1 Yolları öğrenmek",
          paragraphs: [
            `Stajyer, gemideki kaçış yollarını, alternatif çıkışları ve toplanma noktalarını öğrenir. Karanlıkta/dumanda yön bulmayı (low-location lighting, escape route işaretleri) tanır. Bir yangında doğru kaçış yolunu bilmek hayat kurtarır.`,
          ],
        },
      ],
    },
    {
      heading: "5. TRB'ye Kayıt",
      sections: [
        {
          subheading: "5.1 Gözlem ve öğrenme kaydı",
          paragraphs: [
            `Stajyer, katıldığı her tatbikatı ve öğrendiği beceriyi TRB'ye kaydeder ve eğitmen zabite onaylatır. Bu kayıt hem öğrenmeyi pekiştirir hem de yetkinlik kanıtı oluşturur.`,
          ],
        },
      ],
    },
    {
      heading: "6. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "6.1 Tatbikat katılım kontrolü",
          bullets: [
            `Alarm sinyalleri ve muster station biliniyor mu?`,
            `Can yeleği hızlı ve doğru giyiliyor mu?`,
            `EEBD'nin kaçış amaçlı ve süreli olduğu biliniyor mu?`,
            `Yangın söndürücü (PASS) doğru kullanılıyor mu?`,
            `Kaçış yolları ve alternatif çıkışlar öğrenildi mi?`,
            `Tatbikat gözlemleri TRB'ye kaydedildi mi?`,
          ],
          paragraphs: [
            `Emniyet tatbikatlarına katılım, güverte stajyerinin denizcilik kariyerinin can güvenliği temelini atar. Drill'leri ciddiye almak, temel ekipmanı refleksle kullanabilmek ve kaçış yollarını bilmek; gerçek bir acil durumda hem stajyerin hem ekibin hayatını korur.`,
          ],
        },
      ],
    },
  ],
};

export default content;
