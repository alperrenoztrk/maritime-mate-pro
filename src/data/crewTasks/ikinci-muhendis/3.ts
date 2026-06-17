import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Makine dairesi vardiya düzeni ve personel yönetimi",
  roleSlug: "ikinci-muhendis",
  taskIndex: 3,
  estimatedPages: 23,
  intro: `İkinci Mühendis, makine dairesi personelinin operasyonel amiri olarak vardiya düzeninin kurulmasından, vardiya teslim-devir prosedürlerinin standardize edilmesinden ve iş gücü dağılımından sorumludur. Bu görev; vardiya çizelgesinin (watch bill) hazırlanması, UMS (vardiyasız) ve geleneksel vardiya düzenlerinin yönetimi, overtime ve çalışma/dinlenme saatlerinin MLC 2006 ve STCW kurallarına uygun tutulması, yorgunluk yönetimi ve disiplin/ekip moralinin korunmasını kapsar. Düzgün kurulmuş bir vardiya düzeni, hem emniyetin hem de personel haklarının teminatıdır. Bu bölüm bu yönetimi adım adım açıklar.`,
  sources: [
    "STCW Convention & Code — Chapter VIII (Watchkeeping) ve Reg. VIII/2",
    "STCW — Section A-VIII/1 (Fitness for duty — rest hours) ve B-VIII/1",
    "MLC 2006 — Regulation 2.3 (Hours of work and hours of rest)",
    "ILO/IMO Guidelines on Fatigue (MSC.1/Circ.1598)",
    "SOLAS Chapter II-1 — Periodically Unattended Machinery Spaces (UMS)",
    "ISM Code — Madde 6 (Resources and Personnel) ve Madde 7 (Shipboard Operations)",
    "Flag State / Class requirements for engine room watchkeeping",
    "Ship's SMS watchkeeping ve rest-hours procedures",
  ],
  chapters: [
    {
      heading: "1. Vardiya Düzeninin Temelleri",
      lead: `Makine dairesi vardiyası, ana makinenin ve yardımcı sistemlerin emniyetli işletimini her an güvence altına alan organizasyondur.`,
      sections: [
        {
          subheading: "1.1 Geleneksel vardiya ve UMS",
          paragraphs: [
            `Geleneksel düzende makine dairesi 7/24 vardiyalı tutulur: tipik 4-on/8-off saat dilimleriyle vardiya mühendisi ve yağcı görev başındadır. UMS (Unattended Machinery Space) onaylı gemilerde makine dairesi geceleri vardiyasız bırakılabilir; bu durumda kapsamlı alarm sistemi, dead-man alarmı ve duty engineer çağrı sistemi devreye girer. İkinci Mühendis, hangi düzenin uygulanacağını sefer profili ve klas onayına göre belirler.`,
            `UMS'te "duty engineer" rotasyonu kurulur; sorumlu mühendis sürekli ulaşılabilir olur, alarm panel/çağrı cihazı yanındadır ve makine dairesini periyodik rounds (tur) ile kontrol eder. UMS'in geçerliliği, tüm güvenlik alarmlarının ve yedek sistemlerin çalışır olmasına bağlıdır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "STCW VIII/2 — Watchkeeping arrangements",
              text: `Vardiya düzeni; geminin güvenli işletilmesini her koşulda sağlayacak şekilde kurulmalıdır. Vardiya mühendisi, baş mühendisin temsilcisi olarak makine dairesinin emniyetli işletiminden o vardiyada sorumludur. UMS'te dahi alarm ve çağrı sistemi vardiyanın yerini tutar.`,
            },
          ],
        },
        {
          subheading: "1.2 Manevra ve özel durum vardiyaları",
          paragraphs: [
            `Liman manevrası, dar su geçişi, ağır hava ve kritik operasyonlarda "stand-by engine" durumuna geçilir; makine dairesi tam kadro vardiyalı tutulur, ana makine UMS'ten manuel kontrole alınır ve duty engineer makine kumandasında hazır bulunur. İkinci Mühendis bu geçişleri köprüüstü programıyla koordine eder ve vardiya çizelgesini manevra ihtiyacına göre ayarlar.`,
          ],
        },
      ],
    },
    {
      heading: "2. Vardiya Çizelgesi (Watch Bill) Hazırlama",
      sections: [
        {
          subheading: "2.1 Kadro, yetkinlik ve rotasyon",
          paragraphs: [
            `İkinci Mühendis, mevcut kadroyu (Üçüncü/Dördüncü Mühendis, fitter, yağcılar) yetkinlik ve sertifika durumuna göre vardiyalara dağıtır. Her vardiyada yeterli yetkinlik (competent watchkeeper) bulunması, tecrübeli-acemi dengesinin gözetilmesi ve dil/iletişim engellerinin aşılması esastır. Çizelge, dinlenme saatleri kurallarını ihlal etmeyecek şekilde kurulur.`,
            `Çizelge, gemiye katılım/iniş (crew change), izin ve hastalık durumlarına göre güncellenir. Açık (uncovered) vardiya bırakılmaz; kadro eksikse Baş Mühendis ve şirket bilgilendirilir, geçici düzenleme (örn. iş yükü azaltma, liman duruşunu kullanma) yapılır.`,
          ],
          table: {
            caption: `Örnek makine dairesi vardiya rotasyonu (geleneksel 4-on/8-off)`,
            headers: ["Vardiya", "Saat", "Sorumlu", "Destek"],
            rows: [
              ["08–12 / 20–24", "Sabah/akşam", "Üçüncü Mühendis", "Yağcı"],
              ["00–04 / 12–16", "Gece/öğle", "Dördüncü Mühendis", "Yağcı"],
              ["04–08 / 16–20", "Şafak/ikindi", "İkinci Mühendis (genelde gündüz day-work)", "Fitter"],
              ["UMS gece", "Tüm gece", "Duty engineer (rotasyonlu)", "Çağrı üzerine"],
            ],
          },
        },
        {
          subheading: "2.2 Çizelgenin ilanı ve görünürlüğü",
          paragraphs: [
            `Vardiya çizelgesi makine kontrol odası ve ortak alanda asılı, herkesçe okunabilir tutulur. Değişiklikler imzalı/onaylı şekilde işlenir. İkinci Mühendis, her personelin kendi vardiyasını, sorumluluğunu ve acil durum görevini (muster list ile uyumlu) bildiğinden emin olur.`,
          ],
        },
      ],
    },
    {
      heading: "3. Vardiya Teslim-Devir (Handover) Standardı",
      sections: [
        {
          subheading: "3.1 Devir esnasında aktarılacaklar",
          paragraphs: [
            `Vardiya teslimi yapılandırılmış olmalıdır: makinelerin durumu, devrede/standby ekipman, devam eden bakım/by-pass'lar, alarmlar ve geçici düzenlemeler, yakıt/yağ durumu, sintine seviyesi, beklenen operasyonlar (manevra, bunker) ve köprüüstünden gelen talimatlar aktarılır. Devralan mühendis, ekipman durumunu fiziken doğrulamadan vardiyayı teslim almaz.`,
            `İkinci Mühendis, devir standardını (checklist/format) belirler ve uygulanmasını denetler. "Sözlü, eksik" devir hataların başlıca kaynağıdır; özellikle by-pass edilmiş bir koruma veya devam eden bir izolasyon aktarılmazsa kaza doğar.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Devralmadan imzalama",
              text: `Vardiyayı devralan, ekipmanın durumunu gözle/turla doğrulamadan devir defterini imzalamamalıdır. Şüphe varsa devir tamamlanmaz; sorumluluk net olmayan bir an bırakılmaz. Devir defteri (engine log/handover book) hukuki kanıttır.`,
            },
          ],
        },
        {
          subheading: "3.2 Engine log ve kayıt disiplini",
          paragraphs: [
            `Her vardiya; ana makine devri, yük, egzoz sıcaklıkları, basınçlar, yakıt tüketimi, yardımcı makine durumu, alarm/olaylar ve yapılan müdahaleleri engine log'a işler. İkinci Mühendis günlük log'ları gözden geçirir, anormallikleri Baş Mühendise raporlar ve eksik/tutarsız kayıtları düzelttirir.`,
          ],
        },
      ],
    },
    {
      heading: "4. Çalışma/Dinlenme Saatleri ve Yorgunluk Yönetimi",
      sections: [
        {
          subheading: "4.1 MLC/STCW dinlenme saatleri kuralı",
          paragraphs: [
            `Personelin asgari dinlenme saatleri yasal olarak korunur: herhangi bir 24 saatte en az 10 saat ve herhangi bir 7 günde en az 77 saat dinlenme; dinlenme en çok iki bölüme ayrılabilir ve bölümlerden biri en az 6 saat kesintisiz olmalı, ardışık dinlenme bölümleri arası en çok 14 saat. İkinci Mühendis, vardiya ve bakım planını bu sınırları ihlal etmeyecek şekilde kurar.`,
            `Rest-hours kayıtları (work/rest record) günlük tutulur, personel ve sorumlu tarafından imzalanır; ihlal varsa gerekçesi ve telafisi kaydedilir. Bu kayıtlar PSC ve MLC denetiminde incelenir; sistematik ihlal ciddi bulgudur.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MLC 2006 Reg. 2.3 / STCW A-VIII/1",
              text: `Minimum dinlenme: 24 saatte ≥10 saat, 7 günde ≥77 saat. İstisnalar (drill, emergency) tanımlıdır ancak telafi (compensatory rest) gerektirir. Kayıtlar gerçeği yansıtmalı; "kâğıt üzerinde uyumlu, gerçekte ihlal" en ağır denetim bulgularındandır.`,
            },
          ],
        },
        {
          subheading: "4.2 Yorgunluk (fatigue) belirtileri ve önlemler",
          paragraphs: [
            `Yorgunluk; dikkat dağınıklığı, gecikmiş tepki, hata artışı ve karar bozulması olarak görülür ve makine dairesinde ölümcül olabilir. İkinci Mühendis, yoğun liman duruşları ve art arda manevralardan sonra dinlenmeyi önceler, kritik işleri yorgun personele vermez ve iş yükünü ekibe dengeli dağıtır. Tek kişiye yığılan yük hem ihlal hem kaza riskidir.`,
          ],
          bullets: [
            `Art arda manevra/bunker sonrası telafi dinlenmesi planla`,
            `Kritik bakımı yorgunluk penceresine denk getirme`,
            `İş yükünü ekibe dengeli dağıt, tek kişiye yığma`,
            `Gece çağrıları sık olan duty engineer'a gündüz dinlenme tanı`,
            `Rest-hours kaydını gerçeğe uygun ve günlük tut`,
          ],
        },
      ],
    },
    {
      heading: "5. Overtime ve Çalışma Kayıtları",
      sections: [
        {
          subheading: "5.1 Overtime takibi ve adalet",
          paragraphs: [
            `Garanti edilen mesai dışındaki çalışma (overtime) kaydedilir ve sözleşmeye/CBA'ya göre ücretlendirilir. İkinci Mühendis, overtime'ın adil dağıtılmasını ve dinlenme kuralını ihlal etmemesini gözetir. Aşırı overtime, hem yorgunluk hem moral sorunudur; yapısal bir gerekçesi varsa (kadro yetersizliği) Baş Mühendis aracılığıyla şirkete eskale edilir.`,
          ],
        },
        {
          subheading: "5.2 Kayıt bütünlüğü ve denetime hazırlık",
          paragraphs: [
            `Çalışma/dinlenme ve overtime kayıtları tutarlı olmalı; engine log, watch bill, bakım kayıtları ve rest-hours birbiriyle çelişmemelidir. İkinci Mühendis, MLC/PSC denetimi öncesi bu kayıtların tutarlılığını kontrol eder. Çelişkili kayıtlar hem bulgu hem güven kaybı yaratır.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka — çelişen kayıtlar",
              text: `Bir denetimde rest-hours kaydı "uyumlu" görünürken engine log ve overtime kayıtları aynı personelin gece boyunca arıza onardığını gösterdi. Çelişki, sahte kayıt şüphesi doğurdu ve geniş bir MLC bulgusuna dönüştü. Ders: tek bir gerçek kaydedilir; kayıtlar birbirini tutmalıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Ekip Yönetimi, Disiplin ve İletişim",
      sections: [
        {
          subheading: "6.1 Familiarization ve görev netliği",
          paragraphs: [
            `Gemiye yeni katılan personel, vardiyaya başlamadan makine dairesi familiarization'ından geçirilir: kaçış yolları, acil durum görevleri, kritik ekipman, alarm ve haberleşme. İkinci Mühendis, herkesin görev tanımını ve raporlama hattını net bilmesini sağlar. Belirsiz sorumluluk, kazada "kimse sorumlu değildi" boşluğu yaratır.`,
          ],
        },
        {
          subheading: "6.2 Moral, kültür ve stop-work yetkisi",
          paragraphs: [
            `Çok uluslu ekiplerde ortak dil (working language) ve açık iletişim kazaları azaltır. İkinci Mühendis, adil iş dağılımı, saygılı liderlik ve herkesin "dur" deme (stop-work authority) hakkını teşvik ederek emniyet kültürünü güçlendirir. Bildirilen hata/near-miss cezalandırılmaz, öğrenmeye dönüştürülür (just culture).`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Near-miss bildirimini ödüllendir",
              text: `Ramak kala (near-miss) bildirimleri büyük kazaların erken uyarısıdır. İkinci Mühendis, bildirimi suçlama değil öğrenme fırsatı olarak ele alırsa, ekip riskleri saklamak yerine erken paylaşır ve emniyet sürekli iyileşir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. Manevra, Acil Durum ve Özel Operasyon Düzeni",
      sections: [
        {
          subheading: "7.1 Stand-by ve all-hands durumları",
          paragraphs: [
            `Manevra, ağır hava, bunker ve kritik bakım gibi durumlarda ek personel görev başına çağrılır. İkinci Mühendis, bu çağrıları önceden planlar (örn. limana giriş saatine göre dinlenmeyi ayarlama) ve düzeni acil durum muster list'i ile uyumlu tutar. Acil durumda makine dairesi rolleri (yangın ekibi, bilge/flooding, blackout recovery) net atanmıştır.`,
          ],
        },
        {
          subheading: "7.2 Drill ve tatbikat katılımı",
          paragraphs: [
            `Düzenli tatbikatlar (engine room fire, blackout, flooding, enclosed space rescue) vardiya düzeniyle çakışmayacak şekilde planlanır; her vardiyadan personelin katılımı sağlanır. İkinci Mühendis, tatbikat sonrası dersleri vardiya prosedürlerine yansıtır.`,
          ],
        },
      ],
    },
    {
      heading: "8. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "8.1 İkinci Mühendisin vardiya/personel checklist'i",
          bullets: [
            `Vardiya çizelgesi yetkinlik ve dinlenme kurallarına uygun mu?`,
            `UMS alarm/çağrı sistemi ve dead-man alarmı çalışır mı?`,
            `Manevra/stand-by düzeni köprüüstü programıyla koordine mi?`,
            `Vardiya devri yapılandırılmış ve fiziken doğrulanarak mı yapılıyor?`,
            `Engine log ve handover book eksiksiz ve imzalı mı?`,
            `Rest-hours kayıtları gerçeği yansıtıyor ve uyumlu mu?`,
            `Overtime adil dağıtıldı, ihlal yaratmıyor mu?`,
            `Yeni personel familiarization'dan geçti mi, görevini biliyor mu?`,
            `Near-miss/hata bildirimi açık ve cezalandırıcı olmayan kültürle mi ele alınıyor?`,
            `Kayıtlar (watch bill, log, rest-hours, overtime) birbiriyle tutarlı mı?`,
          ],
          paragraphs: [
            `İyi yönetilen bir vardiya düzeni, makine dairesinin "görünmez güvencesidir": her an yetkin biri görev başındadır, devirler eksiksizdir, personel dinlenmiştir ve kayıtlar gerçeği yansıtır. İkinci Mühendisin buradaki liderliği; hem yasal uyumu hem emniyeti hem de ekip moralini aynı anda korur. Disiplinli düzen, kazanın olmadan önlendiği yerdir.`,
          ],
        },
      ],
    },
  ],
};

export default content;
