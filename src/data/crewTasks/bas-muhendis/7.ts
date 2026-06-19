import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Denetim ve survey hazırlığı",
  roleSlug: "bas-muhendis",
  taskIndex: 7,
  estimatedPages: 26,
  intro: `Baş Mühendis (Chief Engineer), geminin sınıf (class) ve bayrak devleti sörveylerinde makine departmanı açısından nihai hazırlık sorumlusudur. Annual, intermediate ve special survey döngülerini, Continuous Machinery Survey (CMS) programını, condition of class notlarını ve PSC/vetting denetimlerini sistematik olarak yönetir. Bu bölüm; survey takvimi yönetimini, PMS'in survey kanıtı olarak kullanımını, test/trial planlamasını ve denetimlerde sık karşılaşılan bulguları detaylı ele alır.`,
  sources: [
    "IACS — Unified Requirements (UR Z) ve survey prosedürleri",
    "SOLAS Bölüm I — Survey ve sertifikasyon",
    "MARPOL Annex I & VI — IOPP ve IAPP sertifika sörveyleri",
    "Class Rules (Lloyd's Register / DNV / ABS / BV) — Machinery survey",
    "OCIMF SIRE 2.0 / TMSA — Vetting hazırlığı",
    "Paris MoU / Tokyo MoU — Port State Control prosedürleri",
    "ISM Code — Internal/external audit gereklilikleri",
  ],
  chapters: [
    {
      heading: "1. Survey Rejiminin Genel Yapısı",
      lead: `Bir geminin sertifikaları, düzenli sörvey döngüleriyle geçerliliğini korur. Baş Mühendis bu döngünün makine tarafını eksiksiz yönetmek zorundadır.`,
      sections: [
        {
          subheading: "1.1 Sörvey türleri ve periyotları",
          paragraphs: [
            `Sınıf sertifikası beş yıllık döngüde yenilenir. Bu döngüde Annual Survey (her yıl ±3 ay window), Intermediate Survey (2.-3. yıl arası) ve Special/Renewal Survey (5. yıl) yer alır. Bayrak devleti sertifikaları (Safety Construction, IOPP, IAPP, MARPOL) da benzer döngüde sörvey edilir.`,
            `Baş Mühendis, tüm sertifikaların geçerlilik tarihlerini ve sörvey window'larını takip eder. Bir sertifikanın süresinin geçmesi gemiyi seferden alıkoyar; bu nedenle planlama proaktif yapılmalıdır.`,
          ],
          table: {
            caption: `Başlıca sörvey türleri ve makine departmanı kapsamı`,
            headers: ["Sörvey", "Periyot", "Makine Kapsamı"],
            rows: [
              ["Annual", "Her yıl (±3 ay)", "Genel inceleme, safety devices, kayıt"],
              ["Intermediate", "2.-3. yıl", "Genişletilmiş ME/aux, tank inceleme"],
              ["Special/Renewal", "5. yıl", "Tam survey, açma (opening up), şaft"],
              ["Docking", "Drydock döngüsü", "Şaft, pervane, sea valve, hull"],
              ["CMS", "Sürekli (5 yıl)", "Ekipman bazlı planlı survey"],
            ],
          },
        },
        {
          subheading: "1.2 Continuous Machinery Survey (CMS)",
          paragraphs: [
            `Modern gemilerin çoğu CMS programıyla yönetilir: makine ekipmanları beş yıla yayılan bir program dahilinde, her biri 5 yılda bir denetlenecek şekilde sırayla survey edilir. Bu, tüm makinenin tek seferde durdurulması yükünü ortadan kaldırır.`,
            `Onaylı Chief Engineer Survey (CHE) yetkisi varsa, belirli CMS kalemleri Baş Mühendis tarafından açılıp denetlenebilir ve raporlanabilir; surveyor bunu doğrular. Bu yetki, survey ekonomisi için önemli bir araçtır.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "Chief Engineer Survey yetkisi",
              text: `Sınıf kuralları, deneyimli Baş Mühendislere belirli ekipmanları kendi gözetiminde açıp survey kanıtı sunma yetkisi verebilir. Bu kalemlerin kayıtları (fotoğraf, ölçüm, açıklama) titizlikle tutulmalıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. PMS'in Survey Kanıtı Olarak Kullanımı",
      sections: [
        {
          subheading: "2.1 Planned Maintenance System (PMS) survey scheme",
          paragraphs: [
            `Onaylı PMS scheme'i altında, makine bakımları sınıf survey kanıtı olarak kabul edilir. Baş Mühendis, PMS kayıtlarının (iş emri, tarih, ölçüm, açıklama, kullanılan yedek parça) eksiksiz ve sahadaki gerçekle tutarlı olmasını sağlar.`,
            `PMS kayıtlarının "kâğıt üstünde" tutulup sahada yapılmaması, sörveyde tespit edildiğinde sistemin onayının iptaline ve ağır sonuçlara yol açar. Kayıt-saha tutarlılığı denetlenir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Kayıt-saha uyumsuzluğu",
              text: `Surveyor, PMS'te "yapıldı" görünen bir overhaul'ın sahada yapılmadığını tespit ederse, sadece o kalem değil tüm PMS scheme onayı sorgulanır. Dürüst ve gerçek kayıt esastır.`,
            },
          ],
        },
        {
          subheading: "2.2 Sörvey için kritik kayıtlar",
          paragraphs: [
            `Baş Mühendis, sörvey öncesi şu kayıtları hazır tutar: crank deflection ölçümleri, exhaust valve overhaul, T/C overhaul, fuel injector pop test, safety device test (overspeed, low LO pressure trip), boiler safety valve test, ve relief valve setting kayıtları.`,
            `Ayrıca ORB (Oil Record Book), OWS 15 ppm alarm testi, emergency generator/fire pump test kayıtları, bilge alarm testleri ve sentinel valve test kayıtları sörvey ve PSC için birincil kanıttır.`,
          ],
          bullets: [
            "Crank deflection (web deflection) ölçüm kayıtları",
            "Main engine safety devices test sertifikaları",
            "Boiler/pressure vessel safety valve setting kayıtları",
            "Exhaust valve, fuel pump, injector overhaul kayıtları",
            "Emergency equipment test logları (generator, fire pump, steering)",
          ],
        },
      ],
    },
    {
      heading: "3. Special Survey ve Açma (Opening Up) İşlemleri",
      sections: [
        {
          subheading: "3.1 Ana makine ve yardımcı makine açma",
          paragraphs: [
            `Special survey'de surveyor, belirli silindirlerin, pistonların, yatakların ve exhaust valve'lerin açılıp incelenmesini isteyebilir. Baş Mühendis, açma işini planlar; ölçümleri (liner wear, ring gap, bearing clearance) alır ve sınıf kabul kriterleriyle karşılaştırır.`,
            `Açma işlemleri yorucu ve zaman alıcıdır; iyi bir plan, doğru takım, yedek parça mevcudiyeti ve deneyimli ekip gerektirir. CMS ile bu yük yıllara yayılarak hafifletilebilir.`,
          ],
          table: {
            caption: `Tipik açma sonrası ölçüm ve kabul kriterleri`,
            headers: ["Ölçüm", "Yöntem", "Kabul Kriteri"],
            rows: [
              ["Liner wear", "Inside micrometer", "< %0.6-0.8 bore (manuel)"],
              ["Piston ring gap", "Feeler gauge", "Manuel limit içinde"],
              ["Main bearing clearance", "Bridge gauge / feeler", "Manuel limit içinde"],
              ["Crank deflection", "Deflection gauge", "Sınıf limiti içinde"],
              ["Exhaust valve seat", "Görsel + lapping", "Sızdırmazlık testi OK"],
            ],
          },
        },
        {
          subheading: "3.2 Şaft ve tail-shaft survey",
          paragraphs: [
            `Tail-shaft (pervane şaftı) survey'i, yağlama tipine ve seal koşuluna göre 5 yıl veya uzatılmış aralıklarla yapılır. Oil-lubricated stern tube ve onaylı seal sistemi olan gemilerde survey aralığı uzatılabilir (Extended Tail Shaft Survey).`,
            `Şaft draw (çekme) gerektiren survey'lerde wear-down ölçümü, seal yenileme ve NDT (non-destructive testing) yapılır. Baş Mühendis bu planı drydock master plan'ına entegre eder.`,
          ],
        },
      ],
    },
    {
      heading: "4. Condition of Class ve Düzeltici Aksiyonlar",
      sections: [
        {
          subheading: "4.1 Condition of Class (CoC) takibi",
          paragraphs: [
            `Bir sörveyde tespit edilen ve hemen giderilemeyen eksiklik, "Condition of Class" (veya Memorandum) olarak kayıt edilir ve belirli bir tarihe kadar giderilmesi şart koşulur. Baş Mühendis, açık CoC'leri bir register'da izler ve son tarihten önce kapatır.`,
            `Süresi geçen bir CoC, sertifikanın askıya alınmasına yol açabilir. Bu nedenle CoC yönetimi, sörvey hazırlığının kritik bir parçasıdır ve karadaki teknik ofisle koordineli yürütülür.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "Açık CoC ve sefer riski",
              text: `Açık ve süresi yaklaşan bir Condition of Class, vetting ve PSC denetiminde olumsuz değerlendirilir; süresi geçerse gemi class'ını ve dolayısıyla seferden kalkma yetkisini kaybedebilir.`,
            },
          ],
        },
        {
          subheading: "4.2 Düzeltici aksiyon planlaması",
          paragraphs: [
            `Her bulgu için Baş Mühendis bir root cause analizi ve düzeltici aksiyon (corrective action) planı oluşturur. Bu, sadece sorunu gidermeyi değil, tekrarını önlemeyi hedefler ve şirket SMS'ine işlenir.`,
            `Yedek parça temini gereken aksiyonlar için sipariş süreci başlatılır; geçici önlem (temporary repair) gerekiyorsa sınıf onayı alınır ve kalıcı çözüm planlanır.`,
          ],
        },
      ],
    },
    {
      heading: "5. PSC (Port State Control) Hazırlığı",
      sections: [
        {
          subheading: "5.1 Sık karşılaşılan makine bulguları",
          paragraphs: [
            `PSC denetiminde makine tarafında en sık görülen bulgular: ORB hatalı/eksik tutulması, OWS 15 ppm alarm arızası, emergency generator çalışmaması, fire damper/quick-closing valve arızası, bilge alarm devre dışı, ve emergency fire pump start sorunu.`,
            `Baş Mühendis, bu sık bulguları proaktif kontrol eder; PSC inspector gemiye gelmeden önce kritik emergency ekipmanlarını test eder ve kayıtlarını günceller. Bir tutuklama (detention), şirket ve gemi için ciddi finansal ve itibar kaybıdır.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka dersi: OWS bulgusu detention'a dönüştü",
              text: `Bir gemide PSC inspector, OWS 15 ppm alarm'ının manuel bypass edildiğini ve ORB ile bilge transfer kayıtlarının tutarsız olduğunu tespit etti. Bu, "magic pipe" şüphesiyle detention ve detaylı soruşturmaya yol açtı. Dürüst kayıt ve çalışır OWS, hayatî önemdedir.`,
            },
          ],
        },
        {
          subheading: "5.2 Concentrated Inspection Campaign (CIC)",
          paragraphs: [
            `Paris ve Tokyo MoU'lar her yıl belirli bir tema üzerine yoğun denetim (CIC) yürütür: örneğin MARPOL Annex VI, fire safety, veya stability. Baş Mühendis, yıllık CIC temasını takip eder ve gemiyi o alanda özel hazırlar.`,
            `CIC döneminde ilgili alandaki ekipman, kayıt ve personel yetkinliği detaylı sorgulanır; proaktif hazırlık denetim sonucunu doğrudan etkiler.`,
          ],
        },
      ],
    },
    {
      heading: "6. Vetting ve TMSA Hazırlığı",
      sections: [
        {
          subheading: "6.1 OCIMF SIRE 2.0 makine soruları",
          paragraphs: [
            `Özellikle tankerlerde vetting (SIRE inspection) kritiktir; olumsuz vetting, gemiyi charter dışı bırakır. SIRE 2.0, risk-based ve insan faktörü odaklıdır; inspector makine ekibinin yetkinliğini doğrudan sorgular (open questions, hardware/process/human element).`,
            `Baş Mühendis, makine dairesinin temizliği, sızıntısızlığı, etiketleme, permit-to-work sistemi ve ekip cevaplarının tutarlılığını hazır tutar. Makine dairesinin görsel düzeni, denetçide ilk izlenimi belirler.`,
          ],
          table: {
            caption: `Vetting'te makine departmanı odak alanları`,
            headers: ["Alan", "Beklenti", "Kanıt"],
            rows: [
              ["Engine room housekeeping", "Sızıntısız, temiz, etiketli", "Görsel inceleme"],
              ["Permit-to-work", "Hot work / ESE doğru uygulanıyor", "Permit kayıtları"],
              ["Critical equipment", "Test edilmiş, çalışır", "Test logları"],
              ["Crew competency", "Tutarlı, yetkin cevaplar", "Sözlü + saha"],
              ["MARPOL compliance", "ORB, OWS, sludge yönetimi", "Kayıt + ekipman"],
            ],
          },
        },
        {
          subheading: "6.2 TMSA element 8 ve 9",
          paragraphs: [
            `TMSA Element 8 (Engine Room and Cargo Control Room Operations) ve Element 9 (General Environmental Management) makine departmanını doğrudan ilgilendirir. Baş Mühendis, bu elementlerin KPI ve best practice gerekliliklerini gemi düzeyinde karşılar.`,
            `Energy management, emisyon takibi (EEXI/CII), kritik ekipman güvenilirliği ve sürekli iyileştirme bu elementlerin temel beklentileridir ve dökümante edilmelidir.`,
          ],
        },
      ],
    },
    {
      heading: "7. Test ve Trial Planlaması",
      sections: [
        {
          subheading: "7.1 Sörvey öncesi fonksiyon testleri",
          paragraphs: [
            `Sörvey ve trial öncesi Baş Mühendis bir test programı hazırlar: ana makine safety trip testleri, jeneratör black-out/auto-start, emergency generator load test, steering gear changeover, ve fire pump remote start. Her test sonucu kayıt altına alınır.`,
            `Testler sörvey günü değil, öncesinde yapılır ki bulunan arızalar zamanında giderilebilsin. Sörvey günü beklenmedik bir arıza, hem zaman hem itibar kaybıdır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Pre-survey dry run",
              text: `Önemli sörveylerden bir hafta önce iç bir "dry run" denetimi yapmak; eksik kayıtları, arızalı testleri ve hazırlık boşluklarını ortaya çıkarır. Bu disiplin, sörvey başarısını dramatik biçimde artırır.`,
            },
          ],
        },
        {
          subheading: "7.2 Sea trial ve performans doğrulama",
          paragraphs: [
            `Drydock veya büyük tamirat sonrası sea trial'da ana makine yük testleri, kademeli yük artışı, vibration ölçümleri ve performans doğrulaması yapılır. Baş Mühendis, sonuçları baseline ile karşılaştırır ve sınıf surveyor'ına sunar.`,
            `Trial verileri, gelecekteki performans izlemesi için referans noktası oluşturur ve EEXI/CII doğrulaması için de kullanılır.`,
          ],
        },
      ],
    },
    {
      heading: "8. Belgeleme, Koordinasyon ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "8.1 Karadaki ofisle koordinasyon",
          paragraphs: [
            `Sörvey hazırlığı gemi-kara ortak işidir. Baş Mühendis, Superintendent ile sörvey takvimini, gereken yedek parça/servis ekibini ve attendance planlamasını koordine eder. Surveyor attendance'ı limanla senkronize edilir.`,
            `İyi bir koordinasyon; sörveyin gecikmeden, eksik kanıt olmadan ve ek maliyet doğurmadan tamamlanmasını sağlar.`,
          ],
        },
        {
          subheading: "8.2 Pratik kontrol listesi",
          paragraphs: [
            `Aşağıdaki kontrol listesi, her sörvey öncesi makine departmanı hazırlığını özetler.`,
          ],
          bullets: [
            "Tüm sertifikaların geçerlilik tarihleri ve window'ları kontrol edildi mi?",
            "CMS programı güncel ve gecikmiş kalem yok mu?",
            "PMS kayıtları eksiksiz ve saha ile tutarlı mı?",
            "Açık Condition of Class'lar listelendi ve süresinde mi?",
            "Safety devices ve emergency equipment test edildi ve kayıtlandı mı?",
            "ORB / OWS / sludge kayıtları doğru ve tutarlı mı?",
            "Crank deflection ve şaft ölçümleri hazır mı?",
            "Pre-survey dry run yapıldı ve eksikler giderildi mi?",
            "Engine room housekeeping ve etiketleme tamam mı?",
            "Karadaki ofisle attendance ve yedek parça koordinasyonu yapıldı mı?",
          ],
        },
        {
          subheading: "8.3 Sonuç",
          paragraphs: [
            `Sörvey hazırlığı, Baş Mühendis'in planlama disiplininin ve dürüst kayıt kültürünün sınavıdır. Proaktif, dökümante ve gemi-kara koordineli bir hazırlık; gemiyi sertifikalı, denetimden temiz çıkmış ve charter'a uygun tutar. Sörvey, son güne bırakılan bir telaş değil, sürekli yürütülen bir disiplin olmalıdır.`,
          ],
        },
      ],
    },
  ],
};

export default content;
