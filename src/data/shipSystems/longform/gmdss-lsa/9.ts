import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "Liferaft ve HRU (Hydrostatic Release Unit)",
  sectionId: "gmdss-lsa",
  topicIndex: 9,
  estimatedPages: 22,
  intro: `Can salı (liferaft), filikaya ek veya alternatif olarak gemi terk durumunda kullanılan, sıkıştırılmış gazla otomatik şişen taşınabilir can kurtarma aracıdır; HRU (Hydrostatic Release Unit), gemi batarsa salı belirli derinlikte otomatik serbest bırakıp yüzdüren mekanizmadır. Bu bölüm; liferaft tiplerini (throw-over, davit-launched) ve şişme mekanizmasını, HRU çalışma prensibini ve weak link mantığını, painter (bağlama halatı) ile aktivasyonu, kapasite ve donanımı (SOLAS pack), servis ve test gereksinimini ve bakım/arızayı mühendislik derinliğinde ele alır.`,
  sources: [
    "SOLAS Ch. III — liferafts",
    "LSA Code — inflatable liferafts & HRU",
    "IMO Res. — liferaft servicing",
    "Üretici/servis istasyonu el kitapları",
  ],
  chapters: [
    {
      heading: "1. Liferaft ve Şişme",
      sections: [
        {
          subheading: "1.1 Tipler",
          paragraphs: [
            `Throw-over (atılır) liferaft, kapsül (canister) içinde güvertede saklanır; denize atılınca painter çekilerek şişer. Davit-launched (davitle indirilen) liferaft ise davit ile gemiden binilerek indirilir; yüksek bordalı gemilerde suya atlama riskini azaltır. Her ikisi de aynı şişme prensibiyle çalışır.`,
          ],
          bullets: [
            `Throw-over: kapsülde, denize at + painter çek`,
            `Davit-launched: davitle binilerek indirilir`,
            `Şişme: CO₂/N₂ gaz tüpüyle otomatik`,
          ],
        },
        {
          subheading: "1.2 Şişme mekanizması",
          paragraphs: [
            `Painter (bağlama halatı) belirli uzunlukta çekilince gaz tüpü valfini açar; CO₂/azot karışımı salı saniyeler içinde şişirir ve kapsül ikiye ayrılır. Sal ters şişerse tek kişi righting strap ile düzeltebilir. Şişme sonrası painter gemiye bağlı kalır; sal binince kesilir/serbest bırakılır.`,
          ],
        },
      ],
    },
    {
      heading: "2. HRU ve Weak Link",
      sections: [
        {
          subheading: "2.1 HRU çalışma prensibi",
          paragraphs: [
            `HRU, liferaft kapsülünü krezete (cradle) bağlayan lashing'i, gemi batıp belirli su derinliğine (~1.5-4 m) ulaşınca su basıncıyla otomatik keser. Kapsül serbest kalıp yüzeye çıkar; bu sırada painter gemiye bağlı olduğundan sal otomatik şişer.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Otomatik kurtarma zinciri",
              text: `HRU lashing'i keser → kapsül yüzer → painter gerilince gaz tüpü açılır → sal şişer. Böylece kimse müdahale edemese bile sal hazır olur.`,
            },
          ],
        },
        {
          subheading: "2.2 Weak link",
          paragraphs: [
            `Painter, gemiye bir weak link (zayıf bağ) üzerinden bağlıdır. Sal şişip yüzdükten sonra gemi batmaya devam ederse, weak link belirli yükte kopar ve salı batan gemiyle birlikte çekilmekten kurtarır. Weak link, salın gemiye bağlı kalıp şişmesini sağlayacak kadar güçlü, ama batan gemiyi takip etmeyecek kadar zayıf olmalıdır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Doğru montaj kritik",
              text: `HRU ve weak link yanlış bağlanırsa sal ya hiç serbest kalmaz ya da batan gemiyle birlikte sürüklenir. Montaj üreticinin şemasına birebir uymalıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Kapasite, Donanım ve Servis",
      sections: [
        {
          subheading: "3.1 SOLAS pack ve kapasite",
          paragraphs: [
            `Liferaft, içindeki SOLAS donanım paketiyle (A veya B pack: işaret fişeği, su, gıda, ilkyardım, kürek, tutunma halatı, sünger, tamir kiti) gelir. Kapasite (kişi sayısı) kapsül üzerinde işaretlidir; gemideki toplam sal+filika kapasitesi tüm personeli karşılamalıdır.`,
          ],
        },
        {
          subheading: "3.2 Servis ve test",
          paragraphs: [
            `Liferaft, yetkili servis istasyonunda periyodik (genelde yıllık, bazı sistemlerde uzatılmış) açılır, şişirilir, basınç testi ve donanım yenilemesi yapılır ve yeniden paketlenir. HRU son kullanma tarihi (genelde 2 yıl) takip edilir ve zamanında değiştirilir.`,
          ],
          table: {
            headers: ["Öğe", "Periyot"],
            rows: [
              ["Liferaft servis (açma/test)", "Yıllık (uzatılabilir tipler hariç)"],
              ["HRU değişimi", "Son kullanma (genelde 2 yıl)"],
              ["Görsel kontrol", "Düzenli (kapsül/cradle/lashing)"],
            ],
          },
        },
      ],
    },
    {
      heading: "4. Bakım ve Arıza",
      sections: [
        {
          subheading: "4.1 Bakım",
          paragraphs: [
            `Gemide bakım; kapsül/cradle bütünlüğü, HRU ve weak link doğru montajı, painter bağlantısı, son servis/HRU tarihleri ve lashing kontrolünü kapsar. İç servis yalnızca yetkili istasyonda yapılır.`,
          ],
          bullets: [
            `HRU + weak link doğru montaj kontrolü`,
            `Painter gemiye bağlı (weak link üzerinden)`,
            `Servis ve HRU son kullanma takibi`,
          ],
        },
        {
          subheading: "4.2 Arıza tablosu",
          paragraphs: [`Yaygın sorunlar:`],
          table: {
            headers: ["Belirti", "Neden", "Müdahale"],
            rows: [
              ["HRU süresi dolmuş", "Yaşlanma", "HRU değişimi"],
              ["Servis tarihi geçmiş", "İhmal", "Yetkili servise gönder"],
              ["Painter bağlı değil/yanlış", "Montaj hatası", "Şemaya göre yeniden bağla"],
              ["Kapsül/cradle hasarı", "Korozyon/darbe", "Onarım/değişim"],
            ],
          },
        },
      ],
    },
  ],
};

export default content;
