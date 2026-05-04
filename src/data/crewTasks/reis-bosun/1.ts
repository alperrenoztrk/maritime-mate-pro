import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Güverte bakım operasyonlarının yürütülmesi",
  roleSlug: "reis-bosun",
  taskIndex: 1,
  estimatedPages: 24,
  intro: `Reis (Bosun), güverte bakımının sahadaki nihai uygulayıcısıdır. Birinci Zabit'in PMS (Planned Maintenance System) iş emirlerini alır, ekibe dağıtır ve işin tekniğine, güvenliğine ve kalitesine bizzat odaklanır. Bu bölüm; korozyon kontrolü, boyama sistemleri, halat ve tel bakımı, hatch cover ve güverte makinaları rutinleri, raspa-zımpara güvenliği, surface preparation standartları ve liderlik pratiklerini detaylı olarak ele alır.`,
  sources: [
    "ISO 8501-1 — Surface Preparation Standards (SA 1, SA 2, SA 2.5, SA 3)",
    "SOLAS PSPC (Performance Standard for Protective Coatings)",
    "ISGOTT 6 — Mooring & deck operations",
    "OCIMF — Mooring Equipment Guidelines (MEG4)",
    "TMSA Element 6.1 — Maintenance and surveys",
    "Bridge Procedures Guide",
  ],
  chapters: [
    {
      heading: "1. Güverte Bakımının Felsefesi: Önle, Bul, Düzelt",
      sections: [
        {
          subheading: "1.1 Korozyon: gemiye sessiz düşman",
          paragraphs: [
            `Çelik gemi gövdesi, deniz suyu, klorür, oksijen ve UV ışınımının yoğun saldırısı altındadır. Korozyon başladığında geometrik olarak hızlanır: küçük bir pas noktası 6 ayda yüzeyin yüzlerce metrekaresini etkileyebilir. Reis'in temel görevi, "küçük pasları" büyümeden bulup gidermek ve koruyucu boya sisteminin bütünlüğünü korumaktır.`,
            `Korozyonun tipleri farklıdır: uniform corrosion (geniş yüzeylerde ince katman), pitting (lokal derin oyuklar — özellikle ballast tankları ve hold ortalarında), galvanic corrosion (farklı metal birleşimlerinde), crevice corrosion (sıkışık kesişimlerde) ve stress corrosion cracking (yorulan bölgelerde). Her tip farklı önlem ister.`,
          ],
        },
        {
          subheading: "1.2 PMS akışı ve iş emrinin yorumu",
          paragraphs: [
            `Reis sabah toolbox toplantısından sonra Birinci Zabit ile iş emirlerini gözden geçirir. İş emri; ekipman, yapılacak iş, malzeme listesi, gerekli PPE, risk değerlendirmesi referansı, tahmini süre ve tamamlanma kanıtını (foto, ölçüm) içerir. Reis bu emri ekibe dağıtırken; iş yetkinliği, ekip büyüklüğü, hava koşulu ve liman/seyir durumunu birleştirir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Reis'in altın kuralı",
              text: `Bir tayfaya yapamayacağı bir işi verirsen ya yarım kalır ya da yaralanma çıkar. İş, kişinin yetkinliğine göre dağıtılır; yetkinlik kazandırılacaksa eşliğinde bir deneyimli isim atanır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Surface Preparation: Boyamanın Temeli",
      sections: [
        {
          subheading: "2.1 ISO 8501 standartları",
          paragraphs: [
            `Yüzey hazırlığı, boyanın ömrünü %60-80 oranında belirler. ISO 8501-1, yüzey temizliği için pratik standartları tanımlar. SA 1 (light brush-off blast), SA 2 (thorough blast), SA 2.5 (very thorough — endüstri normu), SA 3 (white metal — özel uygulamalar için) seviyeleri vardır. Mekanik temizlik için ST 2 (thorough manual cleaning) ve ST 3 (very thorough) kullanılır.`,
            `Gemide saha şartlarında SA 2.5 zor sağlanır; çoğu yer ST 2 - ST 3 mertebesinde el aletleriyle hazırlanır. Reis, boyama yapılacak alanın görsel referansla (renkli tablo) hangi standardı tutturduğunu kayıt altına alır; bu boya garanti süresinde kritiktir.`,
          ],
          table: {
            caption: `Yüzey Hazırlık Seviyeleri ve Tipik Kullanım`,
            headers: ["Standart", "Yöntem", "Tipik Yer", "Sonraki Boya Ömrü"],
            rows: [
              ["SA 2.5", "Kumlama", "Ballast tank, drydock", "10-15 yıl"],
              ["ST 3", "Power tool — açısal", "Güverte, hatch", "3-7 yıl"],
              ["ST 2", "El raspa + tel fırça", "Küçük rötuş", "1-3 yıl"],
              ["Spot touch-up", "Tel fırça + boya", "Acil rötuş", "<1 yıl"],
            ],
          },
        },
        {
          subheading: "2.2 Chipping, grinding ve power tool güvenliği",
          paragraphs: [
            `Pneumatic chipping hammer, needle scaler, angle grinder ve disc sander en yaygın araçlardır. Reis; uygun PPE'yi (gözlük, kulaklık, maske, eldiven, chaps), elektrik/havalı aletlerin günlük kontrolünü, hortum bağlantılarını ve ground'u denetler. Hot work permit gerektiren grinder kullanımı (özellikle tanker güvertesinde) Birinci Zabit + Kaptan + Baş Mühendis onayı ister.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Tanker güvertesinde hot work",
              text: `Hot work, herhangi bir kıvılcım üretebilen iş demektir. Tanker güvertesinde hot work; gas-free certificate + permit + standby fire watch + boundary cooling olmadan asla yapılmaz. Sadece needle scaler bile bazı şirketlerde "hot work" sınıfındadır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Boya Sistemleri ve Uygulama",
      sections: [
        {
          subheading: "3.1 Marine boya sistemlerinin katmanları",
          paragraphs: [
            `Tipik bir güverte boya sistemi: primer (zinc rich epoxy, 75 µm DFT) → intermediate coat (epoxy, 125 µm) → topcoat (polyurethane, 50 µm). Toplam DFT (Dry Film Thickness) 250-300 µm. Hatch top, ana güverte ve forecastle gibi açık alanlarda UV dayanıklı topcoat şarttır.`,
            `Underwater hull için anti-fouling sistemi (genelde drydock'ta uygulanır): anti-corrosion epoxy + tie coat + self-polishing copolymer (SPC) anti-fouling. Yaşam alanlarının dış cephe boyası enamel finish; iç mekânlarda intumescent (yangın geciktirici) boya kullanılır.`,
          ],
        },
        {
          subheading: "3.2 Uygulama koşulları",
          paragraphs: [
            `Boya tatbiki için ortam koşulları kritiktir: surface temperature dew point'ten en az 3 °C üstte, relative humidity %85 altında, hava sıcaklığı +5 °C üzerinde, yağmur veya tuz spray olmamalı. Reis bu parametreleri psikrometre ve sıcaklık prob'u ile ölçer. Yanlış koşulda atılan boya 6 ayda kalkar.`,
            `Boya inceltme oranı (genelde max %5-10), karıştırma süresi, pot-life (epoxylerde 4-6 saat) ve aplikasyon yöntemi (brush, roller, airless spray) ürünün TDS'sine (Technical Data Sheet) göre belirlenir.`,
          ],
        },
      ],
    },
    {
      heading: "4. Halat ve Tel Bakımı",
      sections: [
        {
          subheading: "4.1 Mooring rope (sentetik) bakımı",
          paragraphs: [
            `Modern gemilerde yüksek mukavemetli HMPE (Dyneema) ve polyester karışımı halatlar yaygındır. Halatın her sefer sonrası gözlem ile kontrolü yapılır: chafe, glazing (sıcaklık hasarı), kink, broken yarn, UV solgunlaşma. OCIMF MEG4 kapsamında halatlar; LDBF (Line Design Break Force), MBL ve "tail" kullanımı bakımından kayıt altında tutulur.`,
            `Halatın "retirement criteria" şirket tarafından belirlenir; tipik kriter: dış lif hasarı %10'u geçince, iç inceleme dönüşümlü çekirdek hasarı görüldüğünde. Reis, eski halatları tag'leyip Birinci Zabit'e raporlar.`,
          ],
        },
        {
          subheading: "4.2 Tel halat (wire rope) bakımı",
          paragraphs: [
            `Cargo wire, mooring wire ve crane wire için periyodik greasing (OEM lubricant), broken wire count ve diameter ölçümü yapılır. ISO 4309 ve şirket standardına göre; lay length içinde >10% broken wire, kink, severe wear veya görünür şişme retirement sebebidir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Snap-back zone",
              text: `Bağlama operasyonunda kopan halat, lastiklenmiş bir kamçı gibi geri tepebilir. Snap-back zone (genelde halat genişliğinin 5 katı yarıçap, koniler ve oklarla işaretlenmiş) içinde durmak yasaktır. Onlarca ölümlü kazanın temel nedenidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Hatch Cover, Güverte Makinaları ve Vinçler",
      sections: [
        {
          subheading: "5.1 Hatch cover bakımı ve sızdırmazlık",
          paragraphs: [
            `Hatch cover; rubber gasket, compression bar, cleat, hydraulic cylinder ve drainage channel'dan oluşur. Sızdırmazlık testleri (chalk test, hose test, ultrasonic test) Birinci Zabit + Reis tarafından yapılır. Hold içine deniz suyu girişi, MOL Comfort gibi büyük kazaların ön habercisidir.`,
            `Reis, kapanan hatch çevresinde rubber compression marks'ı kontrol eder; eşit baskı yoksa gasket veya compression bar değişimi gerekir. Hydraulic system için yağ seviyesi, hortum kontrolü ve lift/close fonksiyon testi rutindir.`,
          ],
        },
        {
          subheading: "5.2 Vinç (crane) ve windlass / winch bakımı",
          paragraphs: [
            `Cargo crane periyodik load test (yıllık + 5 yıllık 1.25× SWL) klas survey ister. Reis günlük kontrolleri yapar: yağ seviyesi, hidrolik sızıntı, brake test, limit switch çalışması, wire rope durumu, hook safety latch.`,
            `Windlass ve mooring winch bakımında; brake band yıpranması, gear oil seviyesi, pawl mekanizması ve brake holding capacity (yıllık test) kritik noktalardır. SOLAS Chapter II-1 ve IACS UR A2 uyumluluğu denetlenir.`,
          ],
        },
      ],
    },
    {
      heading: "6. Anchoring ve Demir Donatımı",
      sections: [
        {
          subheading: "6.1 Demir ve zincir bakımı",
          paragraphs: [
            `Anchor ve chain cable, klas survey'inde hassas inceleme görür; her 5 yılda bir tüm zincir extracted, kontrol edilen ve gerekirse end-for-end (uçtan uca) çevrilen bir programa tabidir. Reis günlük olarak; chain locker ventilation, mud accumulation drainage, chain stopper, bow stopper ve devil's claw kontrolünü yapar.`,
            `Anchor windlass bakımı vinç bakımıyla benzerdir; ek olarak chain compressor (anchor secured at sea) ve riding pawl periyodik test edilir.`,
          ],
        },
      ],
    },
    {
      heading: "7. Liman ve Seyir İşleri Ayrımı",
      sections: [
        {
          subheading: "7.1 Limanda öncelikler",
          paragraphs: [
            `Limanda gürültülü ve toz yapan işler (chipping, grinding, painting) öncelik kazanır; çünkü seyir sırasında ekibin önemli kısmı vardiya alır. Liman süresinin %30'u operasyona, %50'si bakıma, %20'si dinlenme + dokümantasyona ayrılır (kabaca).`,
          ],
        },
        {
          subheading: "7.2 Seyirde öncelikler",
          paragraphs: [
            `Seyirde havaya bağlı işler yapılamaz; bunun yerine ekipman içi bakımlar (vinç servis, hatch hidrolik, atölye işleri), inventory toplaması ve eğitim aktiviteleri ön plandadır. Hava müsaitse touch-up paint, lashing inspection, lifeboat exterior maintenance gibi işler programlanır.`,
          ],
        },
      ],
    },
    {
      heading: "8. İş Güvenliği ve Permit-To-Work Sistemi",
      sections: [
        {
          subheading: "8.1 PTW sistemi",
          paragraphs: [
            `Çalışmalar; risk seviyesine göre permit gerektirebilir: hot work permit, enclosed space entry permit, working aloft permit, working overside permit, electrical isolation permit. Reis, ekibin permit kapsamı dışına çıkmamasını saha gözetimiyle sağlar.`,
            `Working aloft (yüksekte çalışma) için harness double lanyard, secondary attachment point, deck below cordon, üzerinde geçiş yasak, hava koşulu uygunluk şartları aranır. Working overside için liferaft hazır, MOB equipment, communication ile başlar.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "ILO MLC 2006 ve Code of Safe Working Practices",
              text: `MLC ekipman bakımının güvenli koşullarda yapılmasını şart koşar. UK MCA'nın yayımladığı Code of Safe Working Practices (COSWP), saha standardı kabul edilir.`,
            },
          ],
        },
        {
          subheading: "8.2 Toolbox meeting ve risk assessment",
          paragraphs: [
            `Her sabah Reis, ekibe günün işini, riskleri, kullanılacak ekipmanı ve PPE'yi açıklayan toolbox meeting yapar. Önemli işlerde job-specific risk assessment (JSA) doldurulur ve katılımcılar imza atar. Bu kayıt, kazanın ardından "due diligence" kanıtıdır.`,
          ],
        },
      ],
    },
    {
      heading: "9. Tipik Saha Senaryoları",
      sections: [
        {
          subheading: "9.1 Forecastle bakım sezonu",
          paragraphs: [
            `Klasik bir baş gemi (forecastle) bakım programı: gün 1-2 chipping (mevcut pas + flaking paint kaldırma), gün 3-4 ST 3 power tool ile finish surface preparation, gün 5 primer, gün 6 intermediate, gün 7-8 topcoat. Hava ve sea spray ihtimaline göre tatbik kademelendirilir.`,
          ],
        },
        {
          subheading: "9.2 Hatch coaming pas tedavisi",
          paragraphs: [
            `Hatch coaming, tuz suya en açık bölgelerden biridir. Reis, drainage çukurlarındaki birikmiş tuz/su için periyodik yıkama planlar. Pas başlangıcı görüldüğünde derhal yerel rötuş yapılmaz; önce surface preparation yapılır (ST 3), sonra epoxy primer + topcoat uygulanır.`,
          ],
        },
      ],
    },
    {
      heading: "10. Liderlik, Eğitim ve Sonuç",
      sections: [
        {
          subheading: "10.1 Genç tayfanın yetiştirilmesi",
          paragraphs: [
            `Reis sadece denetçi değil, eğitici rolündedir. Genç tayfaya halat hazırlama, knot bağlama, halat splicing, raspa-boya, hot work güvenliği, enclosed space disiplini gibi temel becerileri pratik olarak gösterir. Bu eğitim "deck training book"a kaydedilir; STCW familiarization gerekliliklerinin önemli bir parçasıdır.`,
          ],
        },
        {
          subheading: "10.2 Sonuç",
          paragraphs: [
            `Güverte bakımı; sadece "boya atmak" değildir. Korozyonu önlemek, ekipmanın işletme ömrünü uzatmak, denetimlerden alınla geçmek ve ekibi güvenli tutmak için disiplinli, sistematik ve sürekli bir uğraştır. Reis bu uğraşın saha komutanıdır; başarısı, gemiyi 10-15 yıl boyunca dik, sağlam ve sertifikalı tutar.`,
          ],
        },
      ],
    },
  ],
};

export default content;
