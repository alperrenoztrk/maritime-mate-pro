import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Güverte personeli yönetimi",
  roleSlug: "birinci-zabit",
  taskIndex: 6,
  estimatedPages: 24,
  intro: `Birinci Zabit, güverte departmanının (deck department) doğrudan amiri ve günlük iş hayatının orkestratörüdür. Reis (Bosun) aracılığıyla güverte tayfalarını yönetir, iş dağılımını yapar, eğitim ve familiarization süreçlerini yürütür, disiplini sağlar ve çalışma/dinlenme saatlerini MLC 2006 ve STCW dinlenme rejimine uygun tutar. Bu bölüm; vardiya düzeni, iş planlaması, yeni personel uyumu, performans takibi ve personel refahı konularında Birinci Zabit'in izlemesi gereken yönetim metodolojisini ayrıntılı olarak ele alır.`,
  sources: [
    "MLC 2006 (Maritime Labour Convention) — Title 2 & 4",
    "STCW Convention & Code — Section A-VIII/1 (Fitness for duty / Rest hours)",
    "ILO Hours of Work and Rest (Work in Fishing / Seafarers)",
    "ISM Code — Section 6 (Resources and Personnel)",
    "SOLAS Chapter V — Safe Manning",
    "IMO Resolution A.1047(27) — Principles of Minimum Safe Manning",
    "Company SMS — Deck Department Procedures & Familiarization Checklists",
    "Bridge & Deck Team Management (Nautical Institute)",
  ],
  chapters: [
    {
      heading: "1. Güverte Departmanının Yapısı ve Hiyerarşi",
      lead: `Güverte departmanı, geminin emniyetli seyri, yük emniyeti ve gövde bakımının insan gücünü oluşturur. Birinci Zabit bu yapının başındadır.`,
      sections: [
        {
          subheading: "1.1 Departman organizasyonu ve görev zinciri",
          paragraphs: [
            `Güverte departmanı tipik olarak Birinci Zabit'in altında İkinci Zabit, Üçüncü Zabit, Reis (Bosun), usta gemiciler (AB — Able Seaman), gemiciler (OS — Ordinary Seaman) ve kadetlerden oluşur. Birinci Zabit, zabitler için seyir vardiyası ve yük operasyonu sorumluluklarını düzenlerken, tayfalar için günlük bakım ve operasyon işlerini Reis aracılığıyla yönetir. Bu çift kanallı yapı (vardiya düzeni + gündüz iş düzeni) çatışmamalı; dinlenme saatleri her iki kanalda da korunmalıdır.`,
            `Reis, Birinci Zabit'in saha temsilcisidir; sabah toolbox toplantısında verilen işleri tayfalara dağıtır, ekipman ve malzeme temin eder, işin kalitesini denetler. Birinci Zabit ise haftalık iş planını (weekly work plan) hazırlar, öncelikleri belirler ve PMS (Planned Maintenance System) güverte kalemlerini zamanında kapatır.`,
          ],
          bullets: [
            `Birinci Zabit → haftalık plan, öncelik, kalite denetimi, kayıt`,
            `Reis (Bosun) → günlük dağıtım, malzeme, saha denetimi`,
            `AB / OS → bakım, boya, lashing, mooring, watch duties`,
            `Kadet → eğitim odaklı görevlendirme + süpervizyon`,
          ],
        },
        {
          subheading: "1.2 Safe manning ve iş yükü dengesi",
          paragraphs: [
            `Geminin Minimum Safe Manning Document (MSMD) bayrak devleti tarafından düzenlenir ve gemide bulunması gereken asgari nitelikli personeli belirler. Birinci Zabit, mevcut personelle planlanan iş yükünün dinlenme saatlerini ihlal etmeden tamamlanabilir olduğunu değerlendirmek zorundadır. Liman operasyonu, ağır hava, tank temizliği gibi yoğun dönemlerde iş planı gerçekçi şekilde önceliklendirilmeli, kritik olmayan işler ertelenmelidir.`,
            `Yorgunluk (fatigue), denizcilik kazalarının arka planındaki en yaygın insan faktörüdür. Birinci Zabit, kâğıt üzerinde dinlenme saatlerinin tutması için değil, gerçek dinlenmenin sağlanması için planlama yapar; "adjusting the records" (kayıt manipülasyonu) hem MLC ihlali hem de ciddi bir emniyet riskidir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "STCW A-VIII/1 — Dinlenme Saatleri",
              text: `Her personele 24 saatlik dönemde en az 10 saat, 7 günlük dönemde en az 77 saat dinlenme verilir. Dinlenme en fazla iki periyoda bölünebilir; periyotlardan biri en az 6 saat olmalı ve ardışık periyotlar arası en fazla 14 saat olmalıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Günlük İş Dağılımı ve Planlama",
      sections: [
        {
          subheading: "2.1 Haftalık ve günlük iş planı",
          paragraphs: [
            `Birinci Zabit, PMS çıktıları, klas/PSC takvimi, charterer talepleri ve gövde durumu temelinde haftalık iş planını oluşturur. Plan; hangi alanın boyanacağı, hangi ekipmanın bakıma alınacağı, hangi lashing/securing işinin yapılacağı ve hangi survey hazırlığının yürütüleceğini içerir. Her sabah Reis ile yapılan kısa toplantıda (toolbox talk) günün işleri, riskleri ve gerekli izinler (hot work, enclosed space, working aloft) gözden geçirilir.`,
            `İyi bir plan, hava durumunu, geminin demir/seyir/liman durumunu ve personel sayısını dikkate alır. Boya işi yağmurda yapılamaz; overside (gemi dışı) çalışma ağır havada planlanmaz; yüksekte çalışma (working aloft) seyir titreşimi varken ertelenir. Birinci Zabit esneklik payı bırakır.`,
          ],
          table: {
            caption: `Örnek Haftalık Güverte İş Planı (özet)`,
            headers: ["Gün", "Öncelikli İş", "İzin Gereği", "Sorumlu"],
            rows: [
              ["Pzt", "Hatch coaming chipping & priming", "Working aloft", "Reis + 2 AB"],
              ["Sal", "Mooring wire muayene + greasing", "Yok", "AB ekibi"],
              ["Çar", "Ballast tank inspection hazırlığı", "Enclosed space", "1/O + 1 AB"],
              ["Per", "Deck crane PMS / wire renewal", "LOTO / aloft", "Reis"],
              ["Cum", "LSA / FSS haftalık kontrol", "Yok", "3/O + OS"],
            ],
          },
        },
        {
          subheading: "2.2 Vardiya düzeni ve liman nöbeti",
          paragraphs: [
            `Seyirde tayfalar zabitlerle birlikte 4-saatlik watch sistemine (örn. 4-on/8-off) girer; lookout görevi STCW gereği gece ve sınırlı görüşte zorunludur. Limanda ise gangway watch, cargo watch ve security watch (ISPS) düzeni kurulur. Birinci Zabit, vardiya çizelgesini dinlenme rejimini ihlal etmeden hazırlar ve görev değişimlerinde devir-teslimin (handover) eksiksiz yapılmasını sağlar.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Handover kalitesi",
              text: `Vardiya devrinde yük durumu, ballast durumu, açık permitler, mooring tension, hava trendi ve bekleyen işler açıkça aktarılmalıdır. Eksik handover, en sık görülen liman kazası nedenidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Yeni Personel Familiarization'ı",
      sections: [
        {
          subheading: "3.1 Gemiye katılım ve emniyet familiarization'ı",
          paragraphs: [
            `Gemiye yeni katılan her personel, görev başına geçmeden önce ISM Code Bölüm 6 ve SOLAS gereği emniyet familiarization'ından geçirilir. Birinci Zabit (veya görevlendirdiği zabit), can yelekleri, immersion suit, muster station, can salları/filikaları, yangın söndürücü konumları, alarm sinyalleri, acil kaçış yolları ve toplanma prosedürlerini gösterir. Bu eğitim belgelenir ve imzalatılır.`,
            `Görev-özel familiarization ise personelin asıl işiyle ilgilidir: mooring istasyonu, vinç kullanımı, enclosed space prosedürü, kişisel koruyucu donanım (PPE), permit-to-work sistemi ve şirket SMS'inin ilgili bölümleri. Yeni personel, tam familiarization tamamlanana kadar tek başına riskli işe verilmez.`,
          ],
          bullets: [
            `Muster list ve bireysel acil durum görevi tebliği`,
            `Can kurtarma ve yangın ekipmanı konumu / kullanımı`,
            `Enclosed space, working aloft, hot work permit sistemi`,
            `PPE standardı ve doğru kullanım`,
            `Raporlama hattı: kime, ne zaman rapor edilir`,
          ],
        },
        {
          subheading: "3.2 Buddy sistemi ve adaptasyon takibi",
          paragraphs: [
            `Yeni personel, deneyimli bir AB ile eşleştirilerek (buddy system) ilk haftalarda gözetim altında çalıştırılır. Birinci Zabit, ilk 2 hafta içinde gözden geçirme yaparak personelin uyumunu, dil/iletişim yeterliliğini ve becerilerini değerlendirir. Çok-uluslu mürettebatta ortak çalışma dili (genelde İngilizce) ve net komut yapısı, emniyet açısından kritiktir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "İlk 90 gün riski",
              text: `İstatistikler, kişisel yaralanmaların büyük kısmının personelin gemiye katılımından sonraki ilk 3 ayda gerçekleştiğini gösterir. Familiarization'ı baştan savma yapmak, doğrudan kaza riskidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Eğitim ve Yetkinlik Geliştirme",
      sections: [
        {
          subheading: "4.1 Gemi içi eğitim (onboard training) ve drill'ler",
          paragraphs: [
            `Birinci Zabit, güverte personelinin yetkinliğini drill ve onboard training ile sürekli geliştirir. Yangın, can kurtarma (abandon ship), enclosed space rescue, man overboard, kirlilik (SOPEP) ve security tatbikatları takvime bağlanır ve Reis ile koordine edilir. Her tatbikat sonrası debrief yapılır; eksiklikler kayıt altına alınır ve bir sonraki tatbikatta düzeltilir.`,
            `Kadet eğitimi ayrı bir sorumluluktur: Training Record Book (TRB) görevleri planlı şekilde imzalatılır, kadet gerçek operasyonlara süpervizyon altında dahil edilir. Birinci Zabit, kadetin hem teorik hem pratik gelişimini izler.`,
          ],
        },
        {
          subheading: "4.2 Yetkinlik matrisi ve sertifika takibi",
          paragraphs: [
            `Her personelin STCW sertifikaları, sağlık raporu (medical fitness), GMDSS/tanker endorsement gibi belgelerinin geçerlilik tarihleri izlenir. Birinci Zabit, departman personelinin belge geçerliliğini bir matris üzerinden takip eder ve süresi dolacak belgeleri Kaptan ve şirkete önceden bildirir; süresi dolmuş sertifikalı personel görevde kalamaz ve PSC tutuklamasına (detention) yol açar.`,
          ],
          table: {
            caption: `Güverte Personeli Yetkinlik / Belge Takip Matrisi (örnek)`,
            headers: ["Personel", "STCW Belge", "Medical", "Tanker End.", "Son Drill"],
            rows: [
              ["AB-1", "Geçerli (2028)", "Geçerli (2027)", "—", "Yangın 06/2026"],
              ["AB-2", "Geçerli (2027)", "12/2026 ⚠", "Geçerli", "Can kurt. 05/2026"],
              ["OS-1", "Geçerli (2029)", "Geçerli (2028)", "—", "Enclosed 06/2026"],
              ["Kadet", "Eğitimde / TRB", "Geçerli (2027)", "—", "Tümüne katıldı"],
            ],
          },
        },
      ],
    },
    {
      heading: "5. Disiplin ve İş Düzeni",
      sections: [
        {
          subheading: "5.1 Davranış kuralları ve disiplin prosedürü",
          paragraphs: [
            `Gemide disiplin, can ve mal emniyetinin temelidir. Birinci Zabit, departman içi davranış standardını net şekilde ortaya koyar; PPE kullanımı, alkol/uyuşturucu politikası (drug & alcohol policy), iş izinlerine uyum ve hiyerarşiye saygı tartışmaya kapalı kurallardır. İhlal durumunda şirket SMS'inde tanımlı kademeli disiplin süreci (sözlü uyarı → yazılı uyarı → resmi rapor) işletilir.`,
            `Disiplin, cezalandırmadan çok güvenli ve adil bir çalışma ortamı yaratmayı amaçlar. Birinci Zabit, tutarlı ve önyargısız davranarak ekibin güvenini kazanır; ayrımcılık, taciz ve zorbalık (harassment & bullying) MLC kapsamında sıfır toleransla ele alınır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MLC 2006 — Şikâyet Prosedürü",
              text: `Gemide adil bir onboard complaint procedure bulunmalı; personel misilleme korkusu olmadan şikâyetini iletebilmelidir. Birinci Zabit bu mekanizmanın işlemesini sağlar.`,
            },
          ],
        },
        {
          subheading: "5.2 İletişim ve ekip motivasyonu",
          paragraphs: [
            `İyi bir Birinci Zabit, otorite ile erişilebilirliği dengeler. Düzenli departman toplantıları, açık geri bildirim ve adil iş dağılımı motivasyonu yüksek tutar. Çok-uluslu ekiplerde kültürel farklara duyarlılık ve net iletişim, yanlış anlaşılmaları ve gerilimi azaltır. Motive bir ekip, hem daha güvenli hem daha verimli çalışır.`,
          ],
        },
      ],
    },
    {
      heading: "6. Çalışma/Dinlenme Saatleri ve MLC Uyumu",
      sections: [
        {
          subheading: "6.1 Dinlenme saatleri kaydı ve denetimi",
          paragraphs: [
            `Her personel için günlük çalışma/dinlenme saatleri kayıt altına alınır (rest hours record). Birinci Zabit, bu kayıtların hem doğru tutulduğunu hem de STCW/MLC limitlerini ihlal etmediğini denetler. Yazılım tabanlı sistemler (örn. rest hours planlama modülleri) ihlalleri otomatik işaretler. PSC ve MLC denetimlerinde bu kayıtlar ilk istenen belgeler arasındadır.`,
            `İhlal kaçınılmazsa (örn. acil durum, uzun manevra), bunun gerçek nedeniyle kayda geçirilmesi ve telafi dinlenmesinin sağlanması gerekir. Kaydı sistematik olarak limit içine "uydurmak" tespit edildiğinde ciddi bulgu (deficiency) ve hatta detention sebebidir.`,
          ],
        },
        {
          subheading: "6.2 İstihdam koşulları ve refah (welfare)",
          paragraphs: [
            `MLC 2006; barınma, beslenme, sağlık, eğlence imkânları ve ücretli izin gibi konularda asgari standartları belirler. Birinci Zabit, güverte personelinin yaşam mahalli koşullarını, çamaşır/temizlik düzenini ve genel refahını gözetir; sorunları Kaptan'a ileterek çözüm üretir. Mürettebat memnuniyeti, sürekli sirkülasyonu (turnover) azaltır ve deneyim birikimini korur.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka: Yorgunluk kaynaklı seyir kazası",
              text: `Birçok grounding ve çatışma soruşturmasında, vardiya zabitinin ihlal edilmiş dinlenme rejimi nedeniyle mikro-uykuya (microsleep) girdiği tespit edilmiştir. Dinlenme yönetimi soyut bir uyum kalemi değil, doğrudan seyir emniyeti meselesidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. Performans Takibi ve Değerlendirme",
      sections: [
        {
          subheading: "7.1 Performans değerlendirme (appraisal)",
          paragraphs: [
            `Birinci Zabit, güverte personelinin performansını şirket appraisal formları üzerinden periyodik olarak değerlendirir. Değerlendirme; teknik yetkinlik, emniyet bilinci, iş ahlakı, takım çalışması ve liderlik potansiyelini kapsar. Objektif gözlem ve örneklere dayanır; subjektif önyargıdan kaçınılır. Sonuçlar personelle paylaşılır ve gelişim alanları birlikte belirlenir.`,
            `İyi performans gösteren personelin terfi/yeniden istihdam (re-employment) için şirkete önerilmesi, ekipte motivasyon ve aidiyet yaratır. Zayıf performans ise koçluk ve ek eğitimle desteklenir; düzelme olmazsa kayıtlı şekilde raporlanır.`,
          ],
        },
        {
          subheading: "7.2 Olay ve near-miss kültürü",
          paragraphs: [
            `Sağlıklı bir güverte departmanında near-miss (ramak kala) raporlaması teşvik edilir; cezalandırma değil öğrenme amaçlanır. Birinci Zabit, raporlanan olayları analiz eder, kök neden bulur ve düzeltici önlemleri iş planına yansıtır. Bir near-miss'i bastırmak, bir sonraki gerçek kazaya zemin hazırlamaktır.`,
          ],
        },
      ],
    },
    {
      heading: "8. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "8.1 Personel yönetimi günlük/haftalık checklist'i",
          bullets: [
            `Haftalık iş planı hazır ve dinlenme rejimine uygun mu?`,
            `Sabah toolbox talk yapıldı, riskler ve izinler konuşuldu mu?`,
            `Yeni personelin familiarization'ı tamamlandı ve imzalandı mı?`,
            `Vardiya/nöbet çizelgesi STCW/MLC limitleri içinde mi?`,
            `Rest hours kayıtları güncel ve gerçeği yansıtıyor mu?`,
            `Sertifika/medical geçerlilik matrisi güncel mi?`,
            `Drill takvimi takip ediliyor, debrief yapıldı mı?`,
            `Disiplin ve şikâyet prosedürü adil işletiliyor mu?`,
            `Near-miss raporları analiz edilip plana yansıtıldı mı?`,
          ],
          paragraphs: [
            `Birinci Zabit'in personel yönetimindeki başarısı, geminin görünmeyen sigortasıdır: iyi eğitilmiş, dinlenmiş, motive ve disiplinli bir güverte ekibi; ağır havada, acil durumda ve yoğun yük operasyonunda farkı yaratan unsurdur. İnsan kaynağını doğru yönetmek, ekipmanı doğru yönetmenin önündedir; çünkü her ekipmanı sonuçta insan kullanır.`,
          ],
        },
      ],
    },
  ],
};

export default content;
