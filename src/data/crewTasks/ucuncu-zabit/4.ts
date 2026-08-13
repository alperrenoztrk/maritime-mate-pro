import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Safety familiarization",
  roleSlug: "ucuncu-zabit",
  taskIndex: 4,
  estimatedPages: 24,
  intro: `Üçüncü Zabit (Safety Officer), ISM Code mantığı gereği gemiye yeni katılan her personelin güvenli işletime hızla uyum sağlamasından ve bunun kayıt altına alınmasından sorumludur. Safety familiarization; yeni mürettebatın can yeleğini nereden alacağını, muster station'ını, fire alarm butonlarını, kaçış yollarını, emergency escape'leri, fire/watertight door kullanımını ve raporlama zincirini öğrenmesini, gösterilmesini ve imza ile belgelenmesini kapsar. STCW, gemiye katılımdan önce veya hemen sonra temel emniyet familiarization'ını zorunlu kılar; bu kayıtlar, güvenli işletimin somut ve denetlenebilir delilidir.`,
  sources: [
    "STCW Code Section A-VI/1 — Familiarization, basic safety training and instruction",
    "SOLAS Chapter III/19 — Emergency training and drills",
    "ISM Code (Res. A.741(18)) madde 6 — Resources and personnel",
    "SOLAS Chapter II-2 — Fire safety (escape, fire doors)",
    "STCW Regulation I/14 — Responsibilities of companies",
    "MLC 2006 — Onboard induction ve çalışma koşulları",
    "Company SMS — Familiarization checklist / Induction procedure",
    "IMO Res. A.760(18) — Symbols related to LSA and arrangements",
  ],
  chapters: [
    {
      heading: "1. Familiarization'ın Amacı ve Yasal Temeli",
      lead: `Yeni personel gemiye katıldığı an, gemiyi tanımayan en riskli kişidir; familiarization bu riski sistemli biçimde düşürmenin yöntemidir.`,
      sections: [
        {
          subheading: "1.1 Neden familiarization zorunludur",
          paragraphs: [
            `STCW Code A-VI/1, gemiye atanan herkesin görev almadan önce temel emniyet familiarization'ından geçmesini zorunlu kılar: acil durumda toplanma, alarm sinyallerini tanıma, can yeleği konumu ve giyimi, alarm verme yöntemi ve kaçış yollarını bilme. Bu, denizcilik dünyasının "ilk gün hayat kurtaran" eğitimidir.`,
            `ISM Code, şirketin personelin görevlerini güvenle yapabilecek şekilde aşina olmasını sağlamasını ister. Safety Officer, bu sorumluluğun gemideki uygulayıcısıdır: yeni geleni karşılar, kritik bilgiyi gösterir, anladığını teyit eder ve imzalı kayıt tutar. "Anlattım" değil "gösterdim ve teyit ettim" esastır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "STCW A-VI/1 — Familiarization zamanlaması",
              text: `Personel, gemideki görevlere atanmadan önce kişisel hayatta kalma teknikleri konusunda yeterli talimatı almalı veya bu talimat, atamadan sonra mümkün olan en kısa sürede (genelde 24 saat içinde) verilmelidir.`,
            },
          ],
        },
        {
          subheading: "1.2 Familiarization türleri",
          paragraphs: [
            `Familiarization katmanlıdır: (1) safety/emergency familiarization (acil durum, LSA, kaçış), (2) şirket/SMS familiarization (prosedürler, raporlama), (3) job/role familiarization (kişinin kendi görevi). Safety Officer öncelikli olarak emniyet ayağından sorumludur; diğer ayaklar Birinci Zabit, Başmühendis veya ilgili amir tarafından yürütülür.`,
            `Bridge ve engine room watchkeeper'lar için ayrıca STCW gereği görev-spesifik familiarization (ekipman, alarm, prosedür) yapılır. Safety Officer, emniyet bölümünün tamamlandığını ve kaydedildiğini güvence altına alır; bu kayıt olmadan yeni personelin watch'a verilmesi uygun değildir.`,
          ],
        },
      ],
    },
    {
      heading: "2. Familiarization Kapsamı: Olmazsa Olmazlar",
      sections: [
        {
          subheading: "2.1 LSA ve acil durum temelleri",
          paragraphs: [
            `Yeni mürettebata önce hayat kurtaran temeller gösterilir: kendi can yeleğinin yeri (kamara + muster station yedeği), nasıl giyileceği (pratik demonstrasyon), immersion suit yeri ve giyimi, muster station'ı, abandon ship görevi ve hangi survival craft'a bineceği. Bu bilgiler station card ile pekiştirilir.`,
            `Alarm sinyalleri tanıtılır: general emergency alarm (≥7 kısa + 1 uzun), fire ve diğer sinyaller, abandon ship'in kaptan sözlü emriyle verildiği. Yeni personel, hangi sinyalde nereye gideceğini ve ne yapacağını refleks haline getirmelidir.`,
          ],
          bullets: [
            `Can yeleği yeri + giyme demonstrasyonu`,
            `Immersion suit / TPA yeri ve kullanımı`,
            `Muster station ve abandon ship görevi`,
            `Alarm sinyallerini tanıma`,
            `Atanan survival craft (filika/sal) numarası`,
          ],
        },
        {
          subheading: "2.2 Yangın güvenliği ve alarm verme",
          paragraphs: [
            `Yeni personele en yakın fire alarm call point (manual butonlar), portable extinguisher konumları ve tipleri, fire hydrant ve hortum yerleri gösterilir. Yangını fark edince nasıl alarm vereceği (call point, telefon, telsiz) ve kime rapor edeceği net olmalıdır.`,
            `Fire door ve watertight door kullanımı gösterilir: bunların neden kapalı tutulduğu, nasıl açılıp kapatıldığı ve acilde otomatik kapanma sistemi anlatılır. Fire door'u takoz/wedge ile açık tutmanın yasak ve tehlikeli olduğu vurgulanır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Fire door wedge yasağı",
              text: `Fire ve watertight door'ların takozla açık tutulması, yangın/su yayılımının önündeki tek bariyeri etkisiz kılar. Familiarization'da bu açıkça yasaklanmalı; yeni personelin bu davranışı normal saymaması sağlanmalıdır.`,
            },
          ],
        },
        {
          subheading: "2.3 Kaçış yolları ve escape donanımı",
          paragraphs: [
            `Yeni mürettebata kendi kamarasından ve çalışma alanından muster station'a giden birincil ve alternatif kaçış yolları bizzat yürütülerek gösterilir. Photoluminescent escape işaretleri, emergency lighting, EEBD (Emergency Escape Breathing Device) konumları ve makine dairesi escape trunk'ı tanıtılır.`,
            `EEBD'nin yangın/duman içinde sadece kaçış için (söndürme için değil) kullanıldığı, tipik 10-15 dakikalık kapasitesi ve nasıl giyileceği anlatılır. Safety Officer, yeni personelin karanlıkta/dumanlı koşulda kaçış yolunu bulabileceğine emin olana kadar gösterimi tekrarlar.`,
          ],
          table: {
            caption: `Familiarization — Gösterilecek Kritik Noktalar`,
            headers: ["Konu", "Gösterim", "Teyit yöntemi", "Kayıt"],
            rows: [
              ["Can yeleği", "Yer + giyme", "Personel kendi giyer", "İmza"],
              ["Muster station", "Yürüyerek gidiş", "Personel yolu gösterir", "İmza"],
              ["Fire alarm", "Call point konumu", "Personel butonu bulur", "İmza"],
              ["Kaçış yolu", "Birincil + alternatif", "Personel yürür", "İmza"],
              ["EEBD", "Yer + kullanım", "Personel giyer", "İmza"],
            ],
          },
        },
      ],
    },
    {
      heading: "3. Watertight ve Fire Door, Bölme Bütünlüğü",
      sections: [
        {
          subheading: "3.1 Door tipleri ve çalışma mantığı",
          paragraphs: [
            `Yeni personele fire door (yangın bölmesi) ve watertight door (su geçirmez bölme) farkı, hangi koşulda kapalı tutulduğu ve acil kapanma mekanizması anlatılır. Power-operated watertight door'ların köprüüstünden uzaktan kapatılabildiği ve lokal kontrolün de bulunduğu gösterilir.`,
            `Door'ların yanındaki uyarı levhaları, kapanma sırasında parmak/uzuv sıkışma riski ve doğru geçiş yöntemi öğretilir. Bu kapıların gemi bütünlüğünü (fire/flooding containment) koruyan kritik bariyerler olduğu vurgulanır.`,
          ],
        },
        {
          subheading: "3.2 Bölme bütünlüğünün önemi",
          paragraphs: [
            `Familiarization, kapıların neden önemli olduğunu kavratır: kapalı bir fire door yangının yayılmasını dakikalarca geciktirir, kapalı bir watertight door su basmasını bir bölmeyle sınırlayabilir. Yeni personel, bu bariyerlerin gemiyi ve kendisini koruduğunu anladığında kurallara uyumu içselleştirir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka: açık watertight door",
              text: `Birçok gemi kaybı soruşturmasında, açık bırakılan watertight kapıların su basmasını bir bölmeyle sınırlamak yerine geminin batmasını hızlandırdığı görülmüştür. Ders: familiarization'da kapıların açık bırakılmaması, soyut bir kural değil, hayatta kalma şartı olarak anlatılmalıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Raporlama Zinciri ve İletişim",
      sections: [
        {
          subheading: "4.1 Reporting chain (rapor zinciri)",
          paragraphs: [
            `Yeni personele kim kime rapor verir, acilde kime haber verilir, tehlikeli durum görülünce ne yapılır net biçimde anlatılır. Tipik zincir: gemici → lostromo/zabit → ilgili amir → kaptan. Acil durumda doğrudan köprüüstüne (OOW) bildirim hakkı her zaman vurgulanır.`,
            `Near-miss ve unsafe condition raporlamanın cezalandırılmadığı, aksine teşvik edildiği "just culture" anlayışı en baştan aktarılır. Yeni personelin korkmadan rapor verebileceğini bilmesi, gemideki emniyet kültürünün canlı kalmasının temelidir.`,
          ],
        },
        {
          subheading: "4.2 İş izinleri ve emniyet kuralları",
          paragraphs: [
            `Familiarization, geminin temel emniyet kurallarını da kapsar: enclosed space entry permit, hot work permit, working aloft/overside, lockout-tagout (LOTO) ve PPE zorunlulukları. Yeni personel, bu izinler olmadan ilgili işe başlamanın yasak olduğunu öğrenir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "Enclosed space — ilk günden farkındalık",
              text: `Kapalı alana izinsiz giriş, denizcilikteki en ölümcül kazalardandır ve genelde kurtarmaya koşan ikinci-üçüncü kişiyi de öldürür. Familiarization, yeni personele "izin ve gaz ölçümü olmadan asla girme" kuralını ilk günden kazandırmalıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Kayıt, İmza ve Belgeleme",
      sections: [
        {
          subheading: "5.1 Familiarization checklist ve imza",
          paragraphs: [
            `Her familiarization, şirket SMS'inde tanımlı bir checklist üzerinden yürütülür; her madde gösterildiğinde işaretlenir ve sonunda hem yeni personel hem familiarization'ı veren (Safety Officer) imzalar. İmza, "anladım ve gösterildi" beyanıdır; ISM denetiminde bu belge güvenli işletimin kanıtıdır.`,
            `Checklist, gemiye katılım tarihiyle birlikte personel dosyasında ve SMS kayıtlarında saklanır. Tarih, kişinin görevine başlamadan önce veya 24 saat içinde familiarization aldığını göstermelidir; geç veya eksik kayıt PSC/ISM bulgusu üretir.`,
          ],
          table: {
            caption: `Familiarization Kayıt Tablosu (Örnek)`,
            headers: ["Personel", "Katılım tarihi", "Familiarization tarihi", "İmza durumu"],
            rows: [
              ["Yeni gemici", "12.06", "12.06 (aynı gün)", "Tam"],
              ["Yeni yağcı", "12.06", "12.06", "Tam"],
              ["Yeni kamarot", "13.06", "13.06", "Tam"],
              ["Stajyer zabit", "12.06", "12.06", "Tam + role"],
            ],
          },
        },
        {
          subheading: "5.2 Drill'e katılım ve pekiştirme",
          paragraphs: [
            `SOLAS III/19.3.2 gereği, mürettebatın %25'inden fazlası bir önceki ayda gemideki drill'lere katılmamışsa, gemi limandan ayrıldıktan sonraki 24 saat içinde drill yapılır. Safety Officer, yeni personelin ilk drill'de aktif rol almasını sağlar; familiarization'da öğretilen bilgi gerçek senaryo provasıyla pekiştirilir.`,
          ],
        },
      ],
    },
    {
      heading: "6. PSC ve ISM Açısından Familiarization Kayıtları",
      sections: [
        {
          subheading: "6.1 Denetimde sorulan tipik sorular",
          paragraphs: [
            `PSC ve ISM denetiminde denetçi, familiarization kayıtlarını ister ve ardından sahaya iner: yeni bir mürettebata "muster station'ın nerede, can yeleğin nerede, fire alarm butonu nerede" diye sorar. Kayıt eksiksiz ama personel bilmiyorsa, familiarization'ın "kâğıt üzerinde" yapıldığı anlaşılır ve bulgu çıkar.`,
            `En sık deficiency'ler: imzasız/eksik familiarization checklist, geç yapılan familiarization, drill kayıtlarıyla uyumsuzluk ve yeni personelin temel emniyet bilgisinden yoksun olması. Safety Officer, kaydı yaparken sahadaki gerçek öğrenmeyi de güvence altına alır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Gösterimi pratik yaptır",
              text: `Familiarization'ı pasif anlatım değil aktif gösterim olarak yürütün: yeni personel can yeleğini kendi giysin, muster station'a kendi yürüsün, fire alarm butonunu kendi bulsun. Pratik yapılan bilgi, denetimde de gerçek acilde de kalıcı olur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. Pratik Kontrol Listesi ve Kapanış",
      sections: [
        {
          subheading: "7.1 Safety Officer familiarization kontrol listesi",
          bullets: [
            `Yeni personel gemiye katılır katılmaz (≤24 saat) emniyet familiarization yapıldı mı?`,
            `Can yeleği, immersion suit yeri ve giyimi pratik gösterildi mi?`,
            `Muster station, abandon ship görevi ve survival craft numarası öğretildi mi?`,
            `Fire alarm call point, extinguisher, hydrant konumları gösterildi mi?`,
            `Birincil ve alternatif kaçış yolları yürüyerek gösterildi mi, EEBD tanıtıldı mı?`,
            `Fire/watertight door kullanımı ve wedge yasağı anlatıldı mı?`,
            `Reporting chain ve permit-to-work kuralları aktarıldı mı?`,
            `Checklist iki imzayla (personel + Safety Officer) tarihli olarak tamamlandı mı?`,
          ],
          paragraphs: [
            `Safety familiarization, gemiye yeni katılan kişinin ilk birkaç saatinde verilen ama tüm yolculuk boyunca etkisini sürdüren bir yatırımdır. İyi yapılmış bir familiarization, gerçek bir acilde "gemiyi tanımayan" kişiyi "ne yapacağını bilen" kişiye dönüştürür. Kaydı imzalamak başlangıçtır; yeni personelin can yeleğini giyebilmesi, station'ına yürüyebilmesi ve alarmı tanıyabilmesi görevin tamamlanmış halidir.`,
          ],
        },
      ],
    },
  ],
};

export default content;
