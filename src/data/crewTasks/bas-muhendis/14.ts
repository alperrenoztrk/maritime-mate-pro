import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Şaft ve pervane sistemi (stern tube) yönetimi",
  roleSlug: "bas-muhendis",
  taskIndex: 14,
  estimatedPages: 26,
  intro: `Baş Mühendis (Chief Engineer), şaft hattının ve özellikle stern tube (kuyruk borusu) sisteminin sağlığından sorumludur. Stern tube bearing yağlaması, aft/fore seal sızdırmazlığı, oil sampling programı, propeller boss cap injection takibi, şaft alignment ve weardown ölçümü kritik öğelerdir. Stern tube oil sızıntısı MARPOL Annex I kapsamında deniz kirliliğidir. Bu bölüm; stern tube tiplerini, seal yönetimini, yağ analizini, weardown takibini, titreşim izlemeyi ve MARPOL boyutunu detaylı ele alır.`,
  sources: [
    "MARPOL Annex I — Oil pollution prevention (stern tube oil dahil)",
    "IACS UR M & Class Rules — Shafting ve stern tube survey",
    "ISO 4406 — Yağ temizlik (cleanliness) kodu",
    "Stern tube üreticisi kılavuzları (Wärtsilä/Blohm+Voss/Kemel — seal/bearing)",
    "ISO 10816 / 20816 — Şaft ve yatak titreşim ölçümü",
    "OCIMF / INTERTANKO — Stern tube oil pollution best practices",
    "EAL (Environmentally Acceptable Lubricant) — VGP gereklilikleri",
  ],
  chapters: [
    {
      heading: "1. Şaft Hattı ve Stern Tube Sisteminin Anatomisi",
      lead: `Şaft hattı, motorun gücünü pervaneye taşıyan ve geminin gövde bütünlüğünü deniz suyundan ayıran kritik bir sistemdir.`,
      sections: [
        {
          subheading: "1.1 Sistem bileşenleri",
          paragraphs: [
            `Şaft hattı; thrust bearing, intermediate shaft(s), intermediate bearings, stern tube (forward + aft bearing) ve propeller shaft (tail shaft) ile pervaneden oluşur. Stern tube, şaftı gövdeden geçiren ve hem yatak hem sızdırmazlık görevi gören kritik bölümdür.`,
            `Stern tube içinde aft bearing (pervaneye yakın, en yüklü yatak) ve forward bearing bulunur; uçlarda aft seal (deniz tarafı) ve fore seal (makine dairesi tarafı) sistemi su girişini ve yağ çıkışını önler.`,
          ],
          table: {
            caption: `Şaft hattı bileşenleri ve işlevi`,
            headers: ["Bileşen", "İşlev", "Kritik izleme"],
            rows: [
              ["Thrust bearing", "İtki kuvvetini gövdeye iletir", "Sıcaklık, yük"],
              ["Intermediate bearing", "Şaftı destekler", "Sıcaklık, alignment"],
              ["Stern tube aft bearing", "En yüklü yatak", "Weardown, sıcaklık"],
              ["Aft / fore seal", "Su girişi/yağ çıkışını önler", "Sızıntı, yağ tüketimi"],
              ["Propeller / boss cap", "İtki üretir", "Cavitation, su girişi"],
            ],
          },
        },
        {
          subheading: "1.2 Yağlama tipleri",
          paragraphs: [
            `Stern tube iki temel tipte olabilir: oil-lubricated (white metal bearing, yağ ile yağlanan — en yaygın) ve water-lubricated (genelde composite/sentetik yatak, deniz suyu ile yağlanan). Su yağlamalı sistem, oil pollution riskini ortadan kaldırır ama yatak ömrü ve weardown yönetimi farklıdır.`,
            `Oil-lubricated sistemlerde, çevre düzenlemeleri (özellikle ABD VGP) nedeniyle giderek EAL (Environmentally Acceptable Lubricant) yağlar kullanılır. Baş Mühendis, sistem tipine uygun yağ ve seal yönetimini uygular.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "EAL ve VGP gerekliliği",
              text: `ABD sularında çalışan gemiler, oil-to-sea interface'lerde (stern tube dahil) Environmentally Acceptable Lubricant kullanmalıdır (VGP). EAL'ler biyolojik olarak parçalanabilir; sızıntı durumunda çevresel etki azalır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Stern Tube Yağ Sistemi ve Gravity Tank",
      sections: [
        {
          subheading: "2.1 Header / gravity tank ve basınç dengesi",
          paragraphs: [
            `Oil-lubricated stern tube sisteminde, yağ basıncı aft seal'deki deniz suyu basıncını dengeleyecek şekilde gravity (header) tank ile ayarlanır. Tank yüksekliği, draft'a göre stern tube basıncını deniz basıncının biraz üstünde tutar; böylece deniz suyu içeri girmez, yağ kontrollü kalır.`,
            `Baş Mühendis, header tank seviyesini günlük izler. Seviye düşüşü (yağ tüketimi) aft veya fore seal sızıntısını; ani değişim ciddi seal arızasını gösterir. Tank seviyesi, sistemin en önemli erken uyarı göstergesidir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Header tank seviye düşüşü = sızıntı",
              text: `Stern tube header/gravity tank seviyesinin sürekli düşmesi, aft seal'den denize yağ sızıntısına (MARPOL kirliliği) veya fore seal'den makine dairesine sızıntıya işaret eder. Her ikisi de derhal araştırılmalı ve kayıt altına alınmalıdır.`,
            },
          ],
        },
        {
          subheading: "2.2 Yağ tüketimi ve su girişi takibi",
          paragraphs: [
            `Normal stern tube yağ tüketimi düşük ve istikrarlıdır. Tüketim artışı sızıntıyı; yağda su artışı (analizde) ise aft seal'den deniz suyu girişini gösterir. Baş Mühendis bu iki göstergeyi birlikte değerlendirir.`,
            `Su girişi, white metal aft bearing'i ciddi şekilde aşındırır ve weardown'ı hızlandırır. Erken tespit, pahalı bir tail-shaft draw onarımını önleyebilir.`,
          ],
        },
      ],
    },
    {
      heading: "3. Seal Yönetimi (Aft / Fore Seal)",
      sections: [
        {
          subheading: "3.1 Seal tipleri ve çalışması",
          paragraphs: [
            `Modern stern tube seal'leri genelde lip-seal (dudak contası) tipindedir; aft seal (deniz tarafı) birden fazla lip ile su girişini ve yağ çıkışını önler. Lip'ler aşındıkça sızdırmazlık bozulur; çoğu sistemde liner üzerinde lip'in temas noktasını değiştirebilen ayar imkânı vardır.`,
            `Bazı modern sistemlerde air seal veya emergency seal donanımı bulunur; aft seal arızasında geçici olarak su girişini durdurur ve drydock'a kadar zaman kazandırır. Baş Mühendis bu emergency imkânların mevcudiyetini ve çalışmasını bilir.`,
          ],
        },
        {
          subheading: "3.2 Seal arızası ve geçici önlem",
          paragraphs: [
            `Aft seal arızası, ya denize yağ sızıntısı (kirlilik) ya da içeri su girişi (yatak hasarı) ile sonuçlanır. Baş Mühendis, sızıntı yönünü ve şiddetini değerlendirir; gravity tank seviyesini ayarlayarak veya emergency seal devreye alarak geçici kontrol sağlar.`,
            `Kalıcı seal değişimi genellikle drydock veya in-water seal repair (bazı tiplerde mümkün) gerektirir. Baş Mühendis, sızıntıyı kayıt altına alır, sınıf/şirketle koordine eder ve onarım planlar.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka dersi: Seal sızıntısı erken yakalandı",
              text: `Bir gemide header tank seviyesinin haftalık düşüş trend'i ve yağ analizinde su artışı, aft seal lip aşınmasını erken gösterdi. Emergency seal ile sızıntı kontrol altına alındı, gemi planlı drydock'a kadar güvenle seyretti ve kontrolsüz su girişi/yatak hasarı önlendi.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Stern Tube Oil Sampling ve Analiz",
      sections: [
        {
          subheading: "4.1 Analiz parametreleri",
          paragraphs: [
            `Stern tube yağı periyodik olarak analiz edilir: su içeriği (deniz suyu girişi), white metal (Sn/Pb — aft bearing aşınması), demir (Fe — şaft/liner), viskozite (kontaminasyon) ve temizlik (ISO 4406 partikül). Bu parametreler, açmadan yatak ve seal durumunu gösterir.`,
            `White metal (kalay/kurşun) içeriğinin artışı, aft bearing'in ciddi aşınmaya başladığının erken işaretidir ve weardown ölçümüyle birlikte değerlendirilir. Su + white metal birlikte artışı, seal arızası + yatak hasarı zincirini gösterir.`,
          ],
          table: {
            caption: `Stern tube yağ analizi göstergeleri`,
            headers: ["Parametre", "Artış anlamı", "Aksiyon"],
            rows: [
              ["Su içeriği", "Aft seal deniz suyu girişi", "Seal kontrol, weardown"],
              ["White metal (Sn/Pb)", "Aft bearing aşınması", "Weardown ölç, plan"],
              ["Demir (Fe)", "Liner/şaft aşınması", "Trend izle, inspect"],
              ["Viskozite değişimi", "Kontaminasyon/su", "Kaynak araştır"],
              ["Partikül (ISO 4406)", "Aşınma/kontaminasyon", "Filtrasyon, izleme"],
            ],
          },
        },
        {
          subheading: "4.2 Extended survey ve analiz şartı",
          paragraphs: [
            `Oil-lubricated stern tube ve onaylı seal sistemli gemilerde, düzenli yağ analizi tail-shaft survey aralığının uzatılması (Extended Tail Shaft Survey) için sınıf tarafından şart koşulur. Analiz sonuçları kabul kriterleri içinde olmalı ve trend bozulmamalıdır.`,
            `Baş Mühendis, bu analiz disiplinini sürdürerek hem makine sağlığını izler hem de pahalı/zaman alıcı şaft çekme survey'ini erteleyebilir. Eksik analiz, survey uzatma hakkını kaybettirir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "Extended Tail Shaft Survey şartı",
              text: `Tail-shaft survey aralığının uzatılması; oil-lubricated bearing, onaylı seal ve düzenli (kabul kriterleri içinde) yağ analizi kaydı gerektirir. Bu şartlar sağlanmazsa survey aralığı kısalır ve şaft çekilmesi gerekebilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Weardown Ölçümü ve Alignment",
      sections: [
        {
          subheading: "5.1 Bearing weardown (poker gauge)",
          paragraphs: [
            `Aft bearing weardown, şaftın yatak içindeki aşınma kaynaklı düşüşünü ölçer; genelde poker gauge / wear-down gauge ile aft seal bölgesinden ölçülür. Düzenli ölçüm, yatağın aşınma trend'ini ve kalan ömrünü gösterir.`,
            `Weardown sınıf limitine yaklaştığında, aft bearing yenileme planlanır. Hızlanan weardown, genelde su girişi (kötü yağlama) veya yüksek yük/misalignment kaynaklıdır ve kök neden araştırılır.`,
          ],
        },
        {
          subheading: "5.2 Şaft alignment ve hot bearing",
          paragraphs: [
            `Yanlış şaft alignment, belirli yataklarda aşırı yük, hot bearing, titreşim ve uzun vadede şaft yorulma çatlağına yol açar. Alignment, gap & sag ölçümleri ve bearing reaction (jack-up) testleriyle drydock'ta doğrulanır.`,
            `Baş Mühendis, seyirde intermediate ve thrust bearing sıcaklıklarını izler; ani sıcaklık artışı alignment veya yağlama sorununu işaret eder. Hot bearing, derhal müdahale gerektiren bir uyarıdır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Hot bearing uyarısı",
              text: `Bir şaft yatağının sıcaklığının ani/anormal yükselmesi; misalignment, yağlama kaybı veya aşırı yük göstergesidir. Ihmal edilirse white metal erir (wiping) ve şaft hasarı oluşur. Sıcaklık artışında yük düşürülür ve sebep araştırılır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Propeller ve Boss Cap Yönetimi",
      sections: [
        {
          subheading: "6.1 Propeller boss cap injection",
          paragraphs: [
            `Controllable Pitch Propeller (CPP) veya bazı fixed pitch sistemlerde, propeller hub/boss cap içindeki yağın deniz suyu basıncına karşı korunması için injection/monitoring sistemi bulunur. Bu sistem, hub yağına deniz suyu girişini (sea water leak) önler ve izler.`,
            `Baş Mühendis, boss cap/hub oil seviyesini ve basıncını izler; su girişi tespitinde (analizde su artışı) seal/o-ring sorununu değerlendirir. CPP sistemlerinde hidrolik pitch kontrolü ve yağ temizliği ayrıca yönetilir.`,
          ],
        },
        {
          subheading: "6.2 Cavitation ve verim",
          paragraphs: [
            `Pervane cavitation, kanat yüzeyinde pitting (erozyon), gürültü ve verim kaybı yaratır. Aşırı cavitation, kanat hasarına ve titreşime yol açar. Düzenli propeller polishing ve doğru pitch/yük yönetimi cavitation'ı sınırlar.`,
            `Pervane fouling ve erozyon verimi düşürdüğünden, in-water survey sırasında pervane durumu değerlendirilir ve polishing planlanır. Bu, hem verim hem CII açısından önemlidir.`,
          ],
        },
      ],
    },
    {
      heading: "7. Titreşim İzleme ve MARPOL Boyutu",
      sections: [
        {
          subheading: "7.1 Şaft titreşim izleme",
          paragraphs: [
            `Şaft hattında torsional, axial ve lateral titreşimler izlenir. ISO 20816 standardına göre yatak/şaft titreşim ölçümleri, gelişen bir misalignment, yatak aşınması veya pervane hasarını erken gösterir. Barred speed range (kritik devir bölgesi) seyirde mümkün olduğunca hızlı geçilir.`,
            `Sürekli titreşim monitoring (varsa) trend sağlar; periyodik el ölçümleri de değerlidir. Trend yükselişi, planlı inceleme ve müdahaleyi tetikler.`,
          ],
        },
        {
          subheading: "7.2 Stern tube oil pollution ve ORB",
          paragraphs: [
            `Stern tube aft seal'den denize yağ sızıntısı, MARPOL Annex I kapsamında deniz kirliliğidir. Sızıntı tespit edilirse, ilgili kayıt (örneğin ORB ve sızıntı raporu) tutulmalı ve gerekiyorsa otoritelere bildirilmelidir.`,
            `Baş Mühendis, header tank seviye trend'ini ve yağ tüketimini izleyerek görünmeyen küçük sızıntıları bile yakalamaya çalışır. EAL kullanımı, sızıntı durumunda çevresel etkiyi azaltır ama kayıt yükümlülüğünü kaldırmaz.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "Stern tube sızıntısı ve MARPOL Annex I",
              text: `Stern tube'dan denize yağ sızıntısı operasyonel bir oil pollution'dır. Tespit, gerekli kayıt (ORB / sızıntı raporu) ve uygunsa bildirim yükümlülüğü doğurur. Görünmeyen kronik sızıntılar dahi izlenmeli ve giderilmelidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "8. Pratik Kontrol Listesi ve Sonuç",
      sections: [
        {
          subheading: "8.1 Pratik kontrol listesi",
          paragraphs: [
            `Aşağıdaki kontrol listesi, şaft ve stern tube sistemi yönetiminin temel unsurlarını özetler.`,
          ],
          bullets: [
            "Header/gravity tank seviyesi günlük izleniyor mu?",
            "Stern tube yağ tüketimi ve su girişi trend'i takip ediliyor mu?",
            "Stern tube oil sampling programı düzenli uygulanıyor mu?",
            "Yağ analizinde white metal/Fe/su trend'i değerlendiriliyor mu?",
            "Aft/fore seal durumu ve emergency seal imkânı biliniyor mu?",
            "Weardown ölçümü periyodik alınıyor ve limite karşı izleniyor mu?",
            "Intermediate/thrust bearing sıcaklıkları izleniyor mu (hot bearing)?",
            "Şaft titreşimi (ISO 20816) ve barred speed range yönetiliyor mu?",
            "Propeller boss cap / hub su girişi izleniyor mu?",
            "Stern tube sızıntısı durumunda MARPOL kayıt/bildirim biliniyor mu?",
          ],
        },
        {
          subheading: "8.2 Sonuç",
          paragraphs: [
            `Şaft ve stern tube sistemi yönetimi, görünmeyen ama hayatî bir Baş Mühendis sorumluluğudur. Header tank seviyesi, yağ analizi ve weardown disipliniyle erken yakalanan bir seal arızası; pahalı bir drydock onarımını, yatak hasarını ve bir MARPOL kirliliğini birlikte önler. Modern Baş Mühendis, açamadığı bir sistemi veriyle "görür" ve trend'ler büyümeden müdahale eder.`,
          ],
        },
      ],
    },
  ],
};

export default content;
