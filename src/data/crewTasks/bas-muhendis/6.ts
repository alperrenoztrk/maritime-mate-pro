import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Makine personelinin yönetimi ve eğitimi",
  roleSlug: "bas-muhendis",
  taskIndex: 6,
  estimatedPages: 25,
  intro: `Baş Mühendis (Chief Engineer), makine departmanının operasyonel başarısını yalnızca teknik bilgiyle değil; doğru görev dağılımı, vardiya disiplini, yetkinlik geliştirme ve güçlü bir emniyet kültürüyle sağlar. İkinci Mühendis'ten makine tayfasına kadar tüm ekibin STCW yeterliliklerini, familiarization süreçlerini ve sürekli eğitimini yönetir. Bu bölüm; rol ve sorumluluk matrisini, watchkeeping düzenini, yetkinlik değerlendirmesini, vendor-specific ve safety eğitimlerini ve insan faktörü (human element) yönetimini Baş Mühendis perspektifinden detaylı ele alır.`,
  sources: [
    "STCW 1978 (2010 Manila amendments) — Bölüm A-III/1, A-III/2, A-VIII/2",
    "ISM Code ( International Safety Management) — Eleman 6: Resources and Personnel",
    "MLC 2006 — Çalışma/dinlenme saatleri ve istihdam koşulları",
    "OCIMF TMSA — Element 3 (Personnel Management) ve Element 1 (Management)",
    "IMO Model Course 1.21 — Personal Safety and Social Responsibilities",
    "Company SMS — Manning ve training prosedürleri",
    "INTERTANKO / INTERCARGO crewing guidelines",
  ],
  chapters: [
    {
      heading: "1. Makine Departmanının Organizasyon Yapısı",
      lead: `Etkin yönetim, net bir organizasyon şemasıyla başlar. Her ekip üyesinin yetki, sorumluluk ve raporlama hattı belirsizliğe yer bırakmadan tanımlanmalıdır.`,
      sections: [
        {
          subheading: "1.1 Hiyerarşi ve raporlama hattı",
          paragraphs: [
            `Tipik bir ticari gemide makine departmanı; Baş Mühendis (C/E), İkinci Mühendis (2/E), Üçüncü Mühendis (3/E), Dördüncü Mühendis (4/E), Elektro-Teknik Zabit (ETO/Electrician) ve makine tayfalarından (Fitter, Motorman, Oiler, Wiper) oluşur. Baş Mühendis doğrudan Kaptan'a ve karada Superintendent'a raporlar; departman içinde İkinci Mühendis günlük operasyonun yürütücüsüdür.`,
            `İkinci Mühendis, bakım planlamasının ve vardiya organizasyonunun fiilî sorumlusudur; Baş Mühendis'in stratejik kararlarını sahaya taşır. ETO, otomasyon, elektrik ve high-voltage sistemlerden sorumludur ve modern gemilerde kritik bir roldür. Tayfalar belirli bir mühendise raporlar ve görev emirlerini ondan alır.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "STCW yeterlilik seviyeleri",
              text: `Operasyonel seviye (Officer in charge of an engineering watch) A-III/1; yönetim seviyesi (Chief/Second Engineer) A-III/2 kapsamındadır. Baş Mühendis, ekibindeki her zabitin sertifika ve endorsement geçerliliğini gemi binişinde doğrular.`,
            },
          ],
        },
        {
          subheading: "1.2 Rol ve sorumluluk matrisi (RACI)",
          paragraphs: [
            `Görev karmaşasını önlemek için Baş Mühendis bir RACI matrisi (Responsible, Accountable, Consulted, Informed) kullanır. Örneğin bunker operasyonunda Baş Mühendis Accountable, İkinci Mühendis Responsible, Üçüncü Mühendis sounding'lerden Consulted olabilir.`,
            `Bu matris, yeni binen personelin sorumluluk sınırlarını hızla anlamasını sağlar ve denetimlerde (vetting/PSC) departman organizasyonunun olgunluğunu gösterir.`,
          ],
          table: {
            caption: `Örnek makine departmanı sorumluluk matrisi`,
            headers: ["Görev", "Baş Müh.", "İkinci Müh.", "Üçüncü Müh.", "ETO"],
            rows: [
              ["Ana makine operasyonu", "A", "R", "C", "I"],
              ["PMS iş emri yönetimi", "A", "R", "R", "C"],
              ["Bunker operasyonu", "A", "R", "C", "I"],
              ["Elektrik/otomasyon", "A", "C", "I", "R"],
              ["Jeneratör bakımı", "A", "C", "R", "C"],
              ["Yedek parça stok", "A", "R", "C", "C"],
            ],
          },
        },
      ],
    },
    {
      heading: "2. Vardiya Düzeni ve Watchkeeping",
      sections: [
        {
          subheading: "2.1 UMS (Unmanned Machinery Space) ve geleneksel vardiya",
          paragraphs: [
            `Modern gemilerin çoğu UMS (E0/AUT notation) sınıflıdır; makine dairesi gece vardiyasız çalışır ve alarmlar ECR ile köprüye iletilir. Duty Engineer çağrı sistemiyle (dead-man alarm, engineer's call) sorumludur. Geleneksel vardiyalı gemilerde ise 4-saatlik watch sistemi (0000-0400, 0400-0800 vb.) uygulanır.`,
            `Baş Mühendis, UMS'e geçiş öncesi günlük "rounds" disiplinini, alarm sisteminin test edildiğini ve dead-man alarm'ın çalıştığını güvence altına alır. Manevra, limana giriş/çıkış ve hava koşullarının kötü olduğu durumlarda makine dairesi manuel kontrole (manned) alınır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "STCW Bölüm A-VIII/2 — Watch arrangements",
              text: `Vardiya tutan personel; dinlenmiş, görevine uygun ve fit-for-duty olmalıdır. Vardiya devir-teslimi (handover) eksiksiz yapılmadan görev terk edilemez.`,
            },
          ],
        },
        {
          subheading: "2.2 Çalışma/dinlenme saatleri (MLC 2006)",
          paragraphs: [
            `MLC 2006 ve STCW, yorgunluk (fatigue) yönetimini zorunlu kılar: herhangi 24 saatte minimum 10 saat, herhangi 7 günde minimum 77 saat dinlenme. Dinlenme en fazla iki periyoda bölünebilir ve bir periyot en az 6 saat kesintisiz olmalıdır.`,
            `Baş Mühendis, yoğun liman/bakım dönemlerinde rest hour kayıtlarını izler; ihlal riskini önler. Yorgunluk, makine dairesindeki kazaların önde gelen insan faktörüdür ve bilinçli olarak yönetilmelidir.`,
          ],
          bullets: [
            "Günlük rest hour kaydı her ekip üyesi için tutulur ve imzalanır",
            "Acil durum, drill ve manevra istisnaları kayıt altına alınır",
            "Üst üste ihlaller Baş Mühendis tarafından düzeltilir ve raporlanır",
            "Watch rotasyonu yorgunluğu dengeleyecek şekilde planlanır",
          ],
        },
      ],
    },
    {
      heading: "3. Familiarization ve Gemi Tanıma Süreci",
      sections: [
        {
          subheading: "3.1 Binişte ilk 24 saat",
          paragraphs: [
            `Yeni binen her ekip üyesi, görevine başlamadan önce ISM Code gereği familiarization sürecinden geçer. Baş Mühendis veya görevlendirdiği İkinci Mühendis; emergency escape route'ları, fire stations, EEBD/SCBA konumları, emergency stop ve quick-closing valve'leri, bilge ve ballast sistemini tanıtır.`,
            `Familiarization checklist imzalanmadan personel bağımsız vardiyaya verilmez. Bu süreç, özellikle dil bariyeri olan çok-uluslu ekiplerde kritiktir ve görsel/uygulamalı anlatımla desteklenir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Yetersiz familiarization riski",
              text: `Acil durumda escape route'u bilmeyen veya emergency stop'un yerini bilmeyen personel, hem kendini hem ekibi tehlikeye atar. PSC denetimleri eksik familiarization kaydını ciddi bulgu olarak işler.`,
            },
          ],
        },
        {
          subheading: "3.2 Ekipman-spesifik tanıtım",
          paragraphs: [
            `Genel tanıtımı, sorumlu olunacak ekipmanların detaylı tanıtımı izler. Örneğin Üçüncü Mühendis'e jeneratör, purifier ve boiler; ETO'ya switchboard, PMS otomasyonu ve high-voltage sistemler tanıtılır. Vendor manualleri, P&ID şemaları ve önceki personelin notları kullanılır.`,
            `Baş Mühendis, ekipman tanıtımının teorik bilgi yanında pratik (start/stop, alarm reset, normal parametreler) içermesini sağlar; "kâğıt üstünde" tanıtım kabul edilmez.`,
          ],
        },
      ],
    },
    {
      heading: "4. Yetkinlik Değerlendirmesi ve Performans İzleme",
      sections: [
        {
          subheading: "4.1 Competency assessment",
          paragraphs: [
            `Baş Mühendis, her zabitin pratik yetkinliğini gözlemleyerek değerlendirir: indicator card alımı, purifier overhaul, fuel changeover, paralelleme ve arıza giderme. TMSA Element 3, dökümante edilmiş yetkinlik değerlendirmesini bekler.`,
            `Eksik görülen alanlar için kişiye özel gelişim planı (training need analysis) oluşturulur. Güçlü performans terfi önerisiyle, zayıf performans yapıcı geri bildirimle yönetilir.`,
          ],
          table: {
            caption: `Yetkinlik değerlendirme alanları ve seviyeleri`,
            headers: ["Yetkinlik Alanı", "Beklenen Seviye", "Değerlendirme Yöntemi"],
            rows: [
              ["Ana makine operasyonu", "Bağımsız", "Gözlem + sözlü"],
              ["PMS / iş emri", "Bağımsız", "Kayıt incelemesi"],
              ["Arıza giderme (troubleshooting)", "Gözetimli → Bağımsız", "Senaryo + saha"],
              ["Emniyet prosedürleri (LOTO, ESE)", "Bağımsız", "Drill + checklist"],
              ["Otomasyon/elektrik (ETO)", "Uzman", "Saha + sertifika"],
            ],
          },
        },
        {
          subheading: "4.2 Geri bildirim ve appraisal",
          paragraphs: [
            `Sefer sonu veya periyodik appraisal formları, şirket SMS'ine işlenir ve karadaki crewing departmanının terfi/yeniden istihdam kararlarını besler. Baş Mühendis'in adil, somut ve gelişim odaklı değerlendirmesi, ekip motivasyonunu doğrudan etkiler.`,
            `Olumsuz değerlendirmeler somut örneklerle desteklenmeli; kişiselleştirilmemelidir. Geri bildirim, mümkünse olay sonrası mümkün olan en kısa sürede verilir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Mentörlük yaklaşımı",
              text: `En etkili Baş Mühendisler, junior zabitlere "neden" sorusunu sorduran, hata yapılan güvenli ortamlar yaratan ve bilgi aktarımını sistematikleştiren liderlerdir. Bu, gelecek nesil mühendisleri yetiştirir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Eğitim Planlaması ve Onboard Training",
      sections: [
        {
          subheading: "5.1 Drill ve tatbikat programı",
          paragraphs: [
            `Makine departmanı; black-out recovery, engine room fire, flooding, steering gear failure ve enclosed space rescue drill'lerine katılır. Baş Mühendis bu tatbikatları planlar, gözlemler ve eksikleri raporlar. Drill'ler gerçekçi senaryolarla yürütülmeli; rutin "kâğıt doldurma" alıştırmasına dönüşmemelidir.`,
            `Her drill sonrası debrief yapılır: ne iyi gitti, ne geliştirilmeli, hangi eksik tespit edildi. Bu çıktılar bir sonraki tatbikatın senaryosunu şekillendirir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka dersi: Eğitimli ekip black-out'u yönetti",
              text: `Bir bulk carrier'da fırtınada yaşanan ani black-out'ta, ayda bir düzenli dead-ship drill yapan ekip emergency generator'ı 40 saniyede devreye aldı, ana makineyi 8 dakikada restart etti. Tatbikat disiplini, gerçek acil durumda kaybı önledi.`,
            },
          ],
        },
        {
          subheading: "5.2 Vendor-specific ve sertifikalı eğitim",
          paragraphs: [
            `Belirli ekipmanlar (MAN ES ME-C engine, Alfa Laval separator, high-voltage switchboard, BWMS) üretici eğitimi gerektirir. Baş Mühendis, hangi personelin hangi sertifikaya ihtiyaç duyduğunu izler ve karada eğitim taleplerini Superintendent'a iletir.`,
            `High-voltage (1 kV üstü) sistemler için STCW gereği özel eğitim zorunludur. Yeni teknolojiler (scrubber, LNG dual-fuel, methanol) gemiye girdikçe eğitim ihtiyacı güncellenir.`,
          ],
          bullets: [
            "High-voltage safety eğitimi (STCW gereği, switchboard çalışması için)",
            "BWMS operasyon ve sampling eğitimi",
            "Scrubber / EGCS operasyon eğitimi (varsa)",
            "Enclosed space entry ve rescue eğitimi",
            "Refrigerant handling (F-gas / ozone-depleting substances)",
          ],
        },
      ],
    },
    {
      heading: "6. Emniyet Kültürü ve İnsan Faktörü",
      sections: [
        {
          subheading: "6.1 Just culture ve raporlama",
          paragraphs: [
            `Baş Mühendis, ekibinde "just culture" yani hataların cezalandırılmadan dürüstçe raporlandığı bir ortam kurar. Near-miss ve unsafe condition raporlaması teşvik edilir; bu raporlar büyük kazaların erken uyarısıdır.`,
            `Susturulan küçük hatalar, büyük kazaların habercisidir. İnsan faktörü kaynaklı makine kazalarının çoğu, zamanında raporlanmayan küçük anormalliklerin birikmesiyle oluşur.`,
          ],
        },
        {
          subheading: "6.2 Çok-uluslu ekip ve iletişim",
          paragraphs: [
            `Modern gemi ekipleri çok-uluslu ve çok-dillidir. Baş Mühendis, ortak çalışma dilinin (genellikle İngilizce) emniyet-kritik iletişimde net kullanıldığından emin olur. Toolbox talk'lar, permit-to-work brifingleri ve drill'ler herkesin anlayacağı şekilde yürütülür.`,
            `Kültürel duyarlılık ve adil davranış, ekip uyumunu ve dolayısıyla operasyonel emniyeti doğrudan etkiler. Dil bariyeri, kritik bir bilginin aktarılamamasına ve kazaya yol açabilir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Toolbox talk disiplini",
              text: `Her riskli iş öncesi 5-10 dakikalık toolbox talk; görevi, riskleri, kullanılacak PPE'yi ve acil durum planını gözden geçirir. Bu kısa konuşmalar kaza önlemenin en etkili araçlarından biridir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. İş Yükü Dağılımı ve Planlama",
      sections: [
        {
          subheading: "7.1 Bakım iş yükünün dengelenmesi",
          paragraphs: [
            `Baş Mühendis, PMS'ten gelen iş emirlerini ekip kapasitesine göre dağıtır. Yoğun sefer dönemleri, liman kalışları ve drydock öncesi yük dengelenmelidir; aksi halde yorgunluk artar ve bakım kalitesi düşer.`,
            `Kritik görevler (örneğin exhaust valve overhaul) deneyimli zabitlere, rutin görevler junior'lara verilir; ancak öğrenme fırsatı için junior'lar deneyimli refakatinde zorlu görevlere dahil edilir.`,
          ],
        },
        {
          subheading: "7.2 Liman ve drydock organizasyonu",
          paragraphs: [
            `Limanda bunker, store alımı, survey ve tamirat aynı anda yürür. Baş Mühendis görev çakışmalarını önler; her işe sorumlu atar ve emniyet önceliğini korur. Riser işleri (hot work, enclosed space) için ayrı permit ve gözetim planlanır.`,
            `Drydock döneminde iş yükü zirve yapar; Baş Mühendis bir master plan ile kritik path işleri (shaft survey, tail-shaft draw, main engine overhaul) önceliklendirir ve tersane ekibiyle koordinasyonu yönetir.`,
          ],
        },
      ],
    },
    {
      heading: "8. Belgeleme, Devir-Teslim ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "8.1 Handover ve süreklilik",
          paragraphs: [
            `Baş Mühendis değişiminde detaylı bir handover raporu hazırlanır: ana makine durumu, açık iş emirleri, kritik yedek parça stoğu, survey takvimi, bekleyen sorunlar ve ekip yetkinlik notları. Bu süreklilik, departman performansının kişiden bağımsız korunmasını sağlar.`,
            `Eksik handover, yeni gelen Baş Mühendis'in kör noktalarla yola çıkmasına ve önlenebilir sorunların büyümesine yol açar. Handover yüz yüze, gemideyken ve yazılı olarak yapılır.`,
          ],
        },
        {
          subheading: "8.2 Pratik kontrol listesi",
          paragraphs: [
            `Aşağıdaki kontrol listesi, makine personeli yönetiminin temel unsurlarını özetler ve her sefer döngüsünde gözden geçirilmelidir.`,
          ],
          bullets: [
            "Tüm ekibin STCW sertifika/endorsement geçerliliği binişte doğrulandı mı?",
            "Familiarization checklist'leri imzalandı ve dosyalandı mı?",
            "Vardiya düzeni ve rest hour kayıtları MLC uyumlu mu?",
            "RACI / sorumluluk matrisi güncel ve görünür mü?",
            "Yetkinlik değerlendirmeleri dökümante edildi mi?",
            "Drill programı planlandı, yürütüldü ve debrief edildi mi?",
            "Vendor-specific eğitim ihtiyaçları karaya raporlandı mı?",
            "Near-miss / unsafe condition raporlama teşvik ediliyor mu?",
            "Toolbox talk'lar riskli işler öncesi yapılıyor mu?",
            "Handover raporu eksiksiz ve devir süreklilik sağlıyor mu?",
          ],
        },
        {
          subheading: "8.3 Sonuç",
          paragraphs: [
            `Makine personelinin yönetimi, Baş Mühendis'in teknik liderliğinin en görünür yansımasıdır. İyi yönetilen bir ekip; daha az kaza, daha yüksek bakım kalitesi ve daha güçlü bir emniyet kültürü üretir. Modern Baş Mühendis; bir mühendis olduğu kadar bir mentör, planlamacı ve insan kaynakları yöneticisidir.`,
          ],
        },
      ],
    },
  ],
};

export default content;
