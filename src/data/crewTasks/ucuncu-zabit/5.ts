import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Drill hazırlığı, icrası ve kayıtları",
  roleSlug: "ucuncu-zabit",
  taskIndex: 5,
  estimatedPages: 26,
  intro: `Üçüncü Zabit (Safety Officer) için drill (talim), geminin acil durum hazırlığının canlı kanıtıdır. Drill yapılıp "geçilmez"; iyi bir Safety Officer drill'i üç aşamada yönetir: öncesi (ekipman hazır mı, personel dağılımı/station bill net mi, senaryo gerçekçi mi), sırası (doğru prosedür izlendi mi, zamanlama tutuyor mu, eksiklikler not edildi mi) ve sonrası (ne hata çıktı, ne düzeltilecek, ne log'a girecek). PSC denetiminde bazen kayda hiç bakılmaz; iki kişiye "Where is your muster station?" ve "How do you start the rescue boat engine?" diye sorulur. Burada patlayan ekipman değil, eğitimdir. Bu bölüm SOLAS Chapter III muster ve drill rejimini, senaryo tasarımını, kayıt disiplinini ve "yapmış görünmek" tuzaklarını ele alır.`,
  sources: [
    "SOLAS Chapter III, Reg. 19 — Emergency training and drills",
    "SOLAS III/8 — Muster lists and emergency instructions",
    "SOLAS III/30 — Drills (abandon ship & fire)",
    "STCW Code Section A-VI/1 — Familiarization and basic safety training",
    "ISM Code 8 — Emergency Preparedness",
    "MSC.1/Circ.1206/Rev.1 — Measures to prevent accidents with lifeboats (drill safety)",
    "IMO Res. A.1072(28) — Revised guidelines for SAR cooperation",
    "Company SMS — Drill schedule & emergency station bill",
  ],
  chapters: [
    {
      heading: "1. Drill Rejiminin Yasal Çerçevesi",
      lead: `Drill, keyfi bir tatbikat değil; SOLAS ve STCW ile dayatılmış asgari periyot ve içeriğe sahip yasal bir yükümlülüktür.`,
      sections: [
        {
          subheading: "1.1 SOLAS III/19 ve periyotlar",
          paragraphs: [
            `SOLAS III/19, her mürettebat üyesinin ayda en az bir abandon ship drill ve bir fire drill'e katılmasını şart koşar. Mürettebatın %25'inden fazlası bir önceki ayda gemideki drill'lere katılmamışsa, gemi limandan ayrıldıktan sonraki 24 saat içinde abandon ship ve fire drill yapılmalıdır. Bu kural, personel devri yüksek gemilerde Safety Officer'ın drill planını sefer takvimine göre kurmasını zorunlu kılar.`,
            `Her abandon ship drill'de muster, can yeleğinin doğru giyilmesi, filika/sal istasyonlarında toplanma, embarkation prosedürünün anlatılması ve en az bir filikanın indirilmesi yer alır. Filikalar 3 ayda bir suya indirilip manevra yaptırılır (free-fall filikalarda serbest düşüş veya simulated launch). Rescue boat ise mümkün olduğu ölçüde her ay, her hâlükârda en az 3 ayda bir suya indirilip manevra yaptırılır (SOLAS III/19.3.4.4).`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS III/19.3.4.3 — Filika indirme",
              text: `Her abandon ship drill'de farklı bir filika, mümkün olduğunca rotasyonla suya indirilmeli ve manevra yaptırılmalıdır; en az 3 ayda bir her filika personelle indirilerek suda manevra ettirilmelidir.`,
            },
          ],
        },
        {
          subheading: "1.2 Drill çeşitleri ve özel talimler",
          paragraphs: [
            `Aylık zorunlu abandon ship ve fire drill'lerin yanında; enclosed space entry & rescue drill (en az 2 ayda bir, SOLAS III/19.3.3), man overboard (MOB), collision/grounding, oil spill (SOPEP), steering gear failure, blackout, security (ISPS) ve medical emergency drill'leri de SMS gereği periyodik yapılır. Safety Officer bu talimlerin tümünün takvimini tek bir matriste izler.`,
            `Tanker, gas carrier ve yolcu gemilerinde ek talimler (cargo emergency, enclosed space, mass rescue) devreye girer. Safety Officer, gemi tipine özgü zorunlu drill'leri SMS ve flag ek gerekliliklerinden çıkartıp yıllık plana işler; hiçbir periyodun kaçmaması için "due date" tablosu tutar.`,
          ],
          table: {
            caption: `Asgari Drill Periyotları (SOLAS III & SMS)`,
            headers: ["Drill", "Asgari Periyot", "Dayanak", "Kayıt"],
            rows: [
              ["Abandon ship", "Aylık", "SOLAS III/19.3.2", "Official log + drill record"],
              ["Fire drill", "Aylık", "SOLAS III/19.3.2", "Official log + drill record"],
              ["Filika suya indirme + manevra", "3 aylık", "SOLAS III/19.3.4.3", "PMS + logbook"],
              ["Enclosed space entry & rescue", "2 aylık", "SOLAS III/19.3.3", "Drill record"],
              ["Rescue boat suya indirme", "Aylık (mümkünse), en az 3 aylık", "SOLAS III/19.3.4.4", "Logbook"],
              ["Damage control / steering gear", "SMS'e göre", "Company SMS", "Drill record"],
            ],
          },
        },
      ],
    },
    {
      heading: "2. Muster List ve Station Bill",
      sections: [
        {
          subheading: "2.1 Muster list'in hazırlanması",
          paragraphs: [
            `Muster list (toplanma cetveli), her mürettebat üyesinin acil durumda nereye gideceğini ve hangi görevi üstleneceğini gösterir. SOLAS III/8 gereği köprüüstü, makine kontrol odası ve mürettebat yaşam alanlarında görünür yerlerde asılı olmalıdır. Genel alarm sinyali, abandon ship sinyali, her kişinin görevi ve yedek görevlisi muster list'te yer alır.`,
            `Safety Officer, personel değişiminde muster list'i derhal günceller; ayrılan kişinin görevi atanmadan boşta kalmamalıdır. Yeni binen her mürettebat üyesi, gemiye katılmadan önce (ideal olarak kalkıştan önce, en geç 2 hafta içinde) familiarization ile muster station'ını, can yeleği konumunu ve kaçış yolunu öğrenir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Boş görev = ölü nokta",
              text: `Muster list'te bir görevin (örn. forward fire party hose operator) personel değişimi sonrası atanmadan kalması, gerçek acilde o işin kimsesiz olması demektir. Crew change sonrası muster list güncellemesi 24 saat içinde tamamlanmalıdır.`,
            },
          ],
        },
        {
          subheading: "2.2 Sembol ve dil gereklilikleri",
          paragraphs: [
            `Muster list ve emergency instruction'lar, mürettebatın anladığı çalışma dilinde olmalıdır; çok uluslu ekiplerde IMO standard symbol'leri (Res. A.760(18) / A.1116(30)) ile desteklenir. Her kabinde lifejacket donning talimatı ve muster station yönlendirmesi bulunmalıdır.`,
            `Safety Officer, yolcu gemilerinde yolculara yönelik muster prosedürünü (kalkıştan önce 24 saat içinde passenger muster) de koordine eder. Ticaret gemisinde ise odak crew familiarization'dır; checklist imzalatılır ve familiarization record olarak saklanır.`,
          ],
        },
      ],
    },
    {
      heading: "3. Drill Öncesi Hazırlık",
      sections: [
        {
          subheading: "3.1 Senaryo tasarımı",
          paragraphs: [
            `İyi bir drill gerçekçi bir senaryoyla başlar: "makine dairesi purifier odasında yangın", "no.2 kargo ambarında enclosed space'te baygın personel", "köprü kanadından MOB". Genel, somut olmayan "yangın var" senaryoları öğretmez. Safety Officer senaryoyu önceden kaptan ve Chief Officer ile paylaşır, hedef öğrenim çıktısını belirler.`,
            `Senaryo, her ay farklı olmalıdır; aynı "lifeboat indir" rutini tekrarlanırsa ekip ezberler ama düşünmez. Boundary cooling, re-flash watch, enclosed space rescue, casualty handling gibi farklı becerileri sırayla hedeflemek, ekibin tüm acil durum yelpazesinde yetkinleşmesini sağlar.`,
          ],
          bullets: [
            `Senaryo: yer, başlangıç koşulu, gelişim ve eskalasyon noktası belirli mi?`,
            `Öğrenim hedefi (ör. SCBA donning süresi, hose handling) tanımlı mı?`,
            `Risk değerlendirmesi yapıldı mı (drill'in kendisi tehlike yaratmasın)?`,
            `Gözlemci/değerlendirici atandı mı, kriterler net mi?`,
          ],
        },
        {
          subheading: "3.2 Ekipman ve güvenlik ön kontrolü",
          paragraphs: [
            `Drill öncesi kullanılacak ekipman çalışır durumda olmalı: SCBA dolu silindirler, fire pump basınç, fire hose ve nozzle, rescue boat motoru, davit ve release gear. Safety Officer, drill'de hangi ekipmanın gerçekten çalıştırılacağını planlar; kuru (tabletop) mu yoksa fiziksel mi olacağı netleşir.`,
            `Drill'in kendisi en büyük kaza riskidir. MSC.1/Circ.1206/Rev.1 gereği filika indirme drill'lerinde personel hook üzerinde değilken release test edilir, maintenance pin yönetimi titizlikle uygulanır. Hava/deniz durumu, personel yorgunluğu ve manevra alanı drill öncesi değerlendirilir; risk yüksekse drill ertelenir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Drill kazası gerçek kazadır",
              text: `Filika indirme drill'lerinde yaşanan ölümlü kazalar, on-load release gear'ın personel filikadayken kazara açılmasından kaynaklanmıştır. Drill bir öğretme aracıdır; can riski yaratacaksa adımı simulated launch'a çevirin.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Drill İcrası",
      sections: [
        {
          subheading: "4.1 Alarm, muster ve head count",
          paragraphs: [
            `Drill genel alarm (yedi kısa + bir uzun) veya senaryoya uygun sinyalle başlar. Mürettebat muster station'a can yeleği/immersion suit ile gelir; her station leader head count yapar ve köprüüstüne raporlar. Eksik kişi anında belirlenmeli; gerçek acilde "kim eksik" sorusunun cevabı dakikalar içinde net olmalıdır.`,
            `Safety Officer veya atanan gözlemci, muster süresini, donanım giyme kalitesini ve raporlama zincirinin işleyişini ölçer. Tipik hedef: tüm mürettebatın belirlenen sürede (gemiye göre genelde birkaç dakika) muster'da toplanıp head count'un tamamlanması.`,
          ],
        },
        {
          subheading: "4.2 Görev icrası ve gözlem",
          paragraphs: [
            `Fire drill'de fire party SCBA donar, hose run yapar, boundary cooling kurulur, makine durdurma/ventilasyon kesme prosedürü uygulanır. Abandon ship'te filika/sal istasyonu kurulur, embarkation anlatılır, motor çalıştırılır. Enclosed space drill'inde permit-to-work, atmosfer ölçümü, rescue ve casualty handling gösterilir.`,
            `Gözlemci, her adımda "doğru prosedür izlendi mi" diye not tutar: SCBA pre-use check yapıldı mı, buddy system uygulandı mı, communication net mi, ekipman doğru kullanıldı mı. Bu notlar debrief'in ve kaydın temelini oluşturur; sadece "drill yapıldı" demek yetersizdir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka: rescue boat motoru çalışmadı",
              text: `Bir drill'de rescue boat motoru üç denemede çalışmadı; battery zayıftı ve fuel'de su vardı. Drill bu kusuru ortaya çıkardı, defect açıldı ve gerçek bir MOB'dan önce sorun giderildi. Drill'in asıl değeri budur: kazadan önce zayıf halkayı bulmak.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Debrief ve Düzeltici Aksiyon",
      sections: [
        {
          subheading: "5.1 Debrief'in yapısı",
          paragraphs: [
            `Drill bittiğinde mutlaka debrief yapılır: ne iyi gitti, ne kötü gitti, hangi ekipman eksik/arızalıydı, hangi prosedür yavaştı. Debrief suçlama değil öğrenme oturumudur; "kim hata yaptı" değil "sistem nerede zayıf" sorulur. Çıkan her bulgu somut bir aksiyona bağlanır.`,
            `Safety Officer, debrief'te ortaya çıkan ekipman defect'lerini work order'a, prosedür eksiklerini eğitim/familiarization'a, kişisel beceri eksiklerini hedefli koçluğa dönüştürür. Bir sonraki drill'in senaryosu, bu drill'in en zayıf noktasını hedefleyebilir.`,
          ],
          bullets: [
            `Muster süresi ve head count doğruluğu`,
            `Ekipman performansı ve ortaya çıkan defect'ler`,
            `Prosedür uyumu (SCBA, buddy, communication)`,
            `İletişim ve komuta zincirinin işleyişi`,
            `Belirlenen düzeltici aksiyonlar ve sorumlu/tarih`,
          ],
        },
        {
          subheading: "5.2 Aksiyon takibi",
          paragraphs: [
            `Debrief'te belirlenen aksiyonlar bir takip listesine girer ve kapanana kadar izlenir. "Rescue boat battery değiştirilecek — sorumlu 2/E — tarih X" gibi net atamalar yapılır. Kapanmayan aksiyon, bir sonraki Safety Committee toplantısının gündemine taşınır.`,
          ],
        },
      ],
    },
    {
      heading: "6. Drill Kayıtları ve Belgeleme",
      sections: [
        {
          subheading: "6.1 Kayıt içeriği",
          paragraphs: [
            `Her drill official log book'a ve ayrıca detaylı drill record'a işlenir. Kayıt; tarih, drill tipi, senaryo, katılan personel, kullanılan ekipman, gözlemler, eksiklikler ve düzeltici aksiyonları içerir. SOLAS III/19.5 gereği drill'lerin tarih ve detayları kayıt altına alınır; eksik/kısa drill ise bu durumun nedeni de yazılır.`,
            `Safety Officer'ın altın kuralı LSA bölümüyle aynıdır: yapılmayan kaydedilmez, kaydedilmeyen yapılmamış sayılır. Ancak gerçek drill yapmadan kayıt "doldurmak" (paper drill) hem ISM ihlali hem de gerçek acilde ölümcül bir aldatmadır. Kayıt gerçeği yansıtmalıdır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Paper drill tuzağı",
              text: `Yapılmamış drill'i logbook'a "yapıldı" diye yazmak, ISM ve SOLAS ihlalidir ve gerçek acilde eğitimsiz ekip demektir. PSC, kayıttaki drill'i crew'a sorarak doğrular: "Geçen ay enclosed space drill yaptınız mı, nasıldı?" Cevap boşsa kayıt yalan çıkar.`,
            },
          ],
        },
        {
          subheading: "6.2 Kayıt-uygulama tutarlılığı",
          paragraphs: [
            `Drill kaydı ile mürettebatın gerçek bilgisi tutarlı olmalıdır. Eğer kayıt aylık enclosed space drill diyorsa, rastgele bir mürettebat permit-to-work ve atmosfer ölçümünü anlatabilmelidir. Safety Officer, drill'leri gerçekten yaparak ve katılımı rotasyonla sağlayarak bu tutarlılığı korur.`,
            `Kayıtlar survey ve PSC için kritik delildir; ancak asıl amaç denetimi geçmek değil, gerçek acilde hazır ekip oluşturmaktır. İyi tutulmuş, gerçeğe dayalı drill kaydı, hem denetimi hem de gerçek krizi geçirir.`,
          ],
        },
      ],
    },
    {
      heading: "7. PSC ve İnsan Faktörü",
      sections: [
        {
          subheading: "7.1 Denetçinin sorduğu sorular",
          paragraphs: [
            `PSC, drill kaydını okumaktan çok crew'ı sınar: "Muster station'ın nerede? Bu yangında görevin ne? Rescue boat motorunu nasıl çalıştırırsın? EEBD'yi nasıl kullanırsın?" Cevap akıcı ve doğruysa drill rejimi gerçektir; tutuk veya yanlışsa kayıt ne derse desin eğitim eksiktir ve deficiency çıkar.`,
            `Safety Officer, denetim öncesi mürettebatla mini provalar yapar; özellikle yeni binenlere muster station, lifejacket donning ve kendi acil durum görevlerini hatırlatır. Bu, "kayıt iyi ama insan boş" tablosunu önler.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "İki soru testi",
              text: `Denetim öncesi rastgele iki mürettebata "Where is your muster station?" ve "How do you start the rescue boat engine?" diye sorun. Cevap net değilse drill rejiminiz kağıt üstündedir; gerçek bir drill yapın.`,
            },
          ],
        },
      ],
    },
    {
      heading: "8. Pratik Kontrol Listesi ve Kapanış",
      sections: [
        {
          subheading: "8.1 Safety Officer drill kontrol listesi",
          bullets: [
            `Aylık abandon ship + fire drill yapıldı ve kayda geçti mi?`,
            `Periyodik talimler (enclosed space, MOB, rescue boat) takvimde mi?`,
            `Muster list güncel, crew change sonrası boş görev kaldı mı?`,
            `Senaryo gerçekçi, öğrenim hedefi tanımlı, risk değerlendirildi mi?`,
            `Drill ekipmanı (SCBA, rescue boat, fire pump) çalışır mı?`,
            `Head count ve muster süresi ölçüldü, raporlama zinciri işledi mi?`,
            `Debrief yapıldı, düzeltici aksiyonlar atandı ve takipte mi?`,
            `Kayıt gerçeği yansıtıyor, crew sorulara cevap verebiliyor mu?`,
          ],
          paragraphs: [
            `Drill'in başarısı, hiçbir gerçek acil yaşanmadığında görünmez kalır; ama gerçek bir yangın veya terk durumunda mürettebatın refleksi tam da bu disiplinli, gerçekçi ve kayıtlı talim rutinine bağlıdır. "Drill yapıldı" demek başlangıçtır; "ekip biliyor, ekipman çalışıyor, eksikler kapandı ve kayıt gerçeği yansıtıyor" demek görevin tamamlanmış halidir.`,
          ],
        },
      ],
    },
  ],
};

export default content;
