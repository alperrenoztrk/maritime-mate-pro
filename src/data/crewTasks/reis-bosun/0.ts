import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Güverte ekibinin günlük yönetimi ve iş dağılımı",
  roleSlug: "reis-bosun",
  taskIndex: 0,
  estimatedPages: 25,
  intro: `Reis (Bosun), güverte ekibinin saha komutanıdır. Birinci Zabit'ten aldığı PMS iş emirlerini tayfalara dağıtır, işlerin öncelik sırasını ve ekip kompozisyonunu belirler, sahada gözetim yapar ve günün sonunda tamamlanan işleri raporlar. Toolbox meeting yönetimi, PPE denetimi, iş güvenliği kurallarına uyum, eğitim ve disiplin onun liderlik kalitesine bağlıdır. Bu bölüm; günlük iş akışının planlanması, iş-kişi eşleştirmesi, dinlenme saati uyumu, saha gözetimi, raporlama ve liderlik pratiklerini detaylı olarak ele alır.`,
  sources: [
    "STCW Code — Watchkeeping & Rest Hours (Section A-VIII/1)",
    "MLC 2006 — Hours of work and rest (Regulation 2.3)",
    "ISM Code — Resources and Personnel (Element 6)",
    "ICS/UK MCA — Code of Safe Working Practices for Merchant Seafarers (COSWP)",
    "OCIMF TMSA Element 6 — Maintenance and surveys",
    "ILO Guidelines on safety and health in shipbreaking / deck work",
    "Bridge & Deck Procedures Guide (ICS)",
  ],
  chapters: [
    {
      heading: "1. Reis'in Konumu: Köprü ile Güverte Arasında",
      lead: `Reis, zabit ile tayfa arasındaki köprüdür; talimatı emre, emri de güvenli ve verimli işe çevirir.`,
      sections: [
        {
          subheading: "1.1 Hiyerarşideki yeri ve yetki sınırı",
          paragraphs: [
            `Reis, güverte bölümünün en kıdemli tayfasıdır ve doğrudan Birinci Zabit'e bağlı çalışır. Yetkisi; iş emrini yorumlamak, ekibi dağıtmak, saha güvenliğini sağlamak ve işin kalitesini denetlemekle sınırlıdır. Planlama ve önceliklendirme yetkisi Birinci Zabit'te kalır; Reis bu planı sahaya çevirir. Bu ayrımı bilmek, gereksiz inisiyatif alıp güvenlik dışına çıkmayı önler.`,
            `Reis aynı zamanda tayfanın "abisi"dir; teknik bilgiyi, gemi adabını ve güvenlik kültürünü aktarır. İyi bir Reis, emir vermekten çok örnek olur; en zor işi kendisi gösterir, en riskli noktada en önde durur. Ekip disiplini, korkudan değil bu güvenden doğar.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Yetki ve sorumluluk dengesi",
              text: `Reis bir işi durdurma yetkisine her zaman sahiptir (stop-work authority). Hiçbir iş, hiçbir program bir tayfanın hayatından önemli değildir. Tereddüt varsa iş durdurulur, zabit bilgilendirilir.`,
            },
          ],
        },
        {
          subheading: "1.2 Günün başlaması: 06:00-08:00 ritmi",
          paragraphs: [
            `Tipik bir bakım gününde Reis, ekipten önce kalkar; hava durumunu, gemi durumunu (limanda/seyirde), aktif iş emirlerini ve dünden kalan işleri gözden geçirir. Birinci Zabit ile kısa bir senkronizasyon yapar: bugün hangi iş öncelikli, hangi alan operasyon nedeniyle kapalı, hangi permit gerekecek.`,
            `08:00'de güverte ekibi toplanır. Reis, günün işini, ekip dağılımını, riskleri ve PPE gereksinimini açıklar. Bu toolbox meeting, günün en önemli 15 dakikasıdır; iyi planlanan bir sabah, kazasız ve verimli bir gün demektir.`,
          ],
        },
      ],
    },
    {
      heading: "2. İş Emrinin Yorumlanması ve Önceliklendirme",
      sections: [
        {
          subheading: "2.1 PMS iş emrinin okunması",
          paragraphs: [
            `Birinci Zabit, PMS (Planned Maintenance System) yazılımından çıkan iş emirlerini Reis'e verir. Her emir; ekipman, yapılacak iş, malzeme listesi, gerekli PPE, ilgili risk değerlendirmesi (risk assessment) referansı, tahmini süre ve tamamlanma kanıtını (fotoğraf, ölçüm, imza) içerir. Reis, emri uygulamadan önce malzeme ve aletlerin mevcut olduğunu doğrular.`,
            `Reis emri yorumlarken sahanın gerçeğini katar: hava, deniz durumu, geminin liman/seyir programı, ekibin mevcut yorgunluğu ve eş zamanlı yürüyen operasyonlar. Kağıt üzerinde mükemmel bir plan, fırtınada güvertede yapılamaz; Reis bu farkı görür ve zabite geri bildirir.`,
          ],
        },
        {
          subheading: "2.2 Önceliklendirme mantığı",
          paragraphs: [
            `İşler; emniyet kritikliği, klas/PSC takvimi, hava penceresi ve operasyon bağımlılığına göre sıralanır. Emniyet ekipmanı (can salı servisi, yangın hattı, LSA) ve denetime hazırlık işleri her zaman önceliklidir. Bunu sefer kritik işler (lashing, hatch sızdırmazlık), sonra kozmetik bakım (boya, temizlik) takip eder.`,
          ],
          table: {
            caption: `İş Önceliklendirme Matrisi (Reis için kılavuz)`,
            headers: ["Öncelik", "İş Tipi", "Örnek", "Erteleme Toleransı"],
            rows: [
              ["1 - Kritik", "Emniyet/denetim", "LSA, yangın hattı, PSC hazırlığı", "Yok"],
              ["2 - Sefer kritik", "Operasyon emniyeti", "Lashing, hatch sızdırmazlık", "Saatler"],
              ["3 - Önleyici", "Korozyon/PMS", "Chipping, primer, greasing", "Günler"],
              ["4 - Kozmetik", "Görünüm", "Topcoat, işaret/yazı yenileme", "Haftalar"],
            ],
          },
        },
      ],
    },
    {
      heading: "3. İş-Kişi Eşleştirmesi",
      sections: [
        {
          subheading: "3.1 Yetkinliğe göre dağıtım",
          paragraphs: [
            `Her tayfanın yetkinliği, sertifikası ve deneyimi farklıdır. Reis; ehliyetli (AB - Able Seaman), genel (OS - Ordinary Seaman) ve acemi (deck cadet/trainee) personeli işin riskine göre eşleştirir. Yüksek riskli işler (working aloft, overside, enclosed space, hot work) yalnızca eğitimli ve gözetim altındaki personele verilir.`,
            `Reis, ekibi tanır: kimin yüksekte rahat çalıştığını, kimin boyada titiz, kimin halatla hızlı olduğunu bilir. Doğru kişiyi doğru işe koymak hem güvenliği hem verimi artırır; yanlış eşleştirme yarım kalan iş veya yaralanma demektir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Reis'in altın kuralı",
              text: `Bir tayfaya yapamayacağı bir işi verirsen ya yarım kalır ya da yaralanma çıkar. İş kişinin yetkinliğine göre dağıtılır; yetkinlik kazandırılacaksa eşliğinde bir deneyimli isim atanır.`,
            },
          ],
        },
        {
          subheading: "3.2 Ekip büyüklüğü ve eşleştirme",
          paragraphs: [
            `Bazı işler tek kişiyle yapılamaz: working aloft için yer seviyesinde bir standby, enclosed space için standby + atmosfer ölçüm, overside için MOB hazır bir gözcü gerekir. Reis, ekip büyüklüğünü işin minimum güvenli personel sayısına göre belirler; eksik personelle riskli iş başlatılmaz.`,
            `Genç personel, deneyimli bir tayfa ile eşleştirilerek "buddy system" içinde çalıştırılır. Bu hem öğretme hem de güvenlik amaçlıdır; acemi asla tek başına yüksek riskli bir alanda bırakılmaz.`,
          ],
        },
      ],
    },
    {
      heading: "4. Toolbox Meeting Yönetimi",
      sections: [
        {
          subheading: "4.1 Etkili bir toolbox meeting",
          paragraphs: [
            `Toolbox meeting (toolbox talk), iş başlamadan yapılan kısa güvenlik brifingidir. Reis; o işin ne olduğunu, adımlarını, risklerini, alınacak önlemleri ve acil durumda ne yapılacağını açıklar. Katılım çift yönlüdür; tayfalardan tehlike gördükleri noktaları söylemeleri istenir.`,
            `İyi bir toolbox; somut, kısa ve işe özeldir. "Dikkatli olun" demek yetmez; "grinder diskini değiştirirken havayı kes, flanşı kontrol et, yüz siperini tak" gibi spesifik talimat verilir. Önemli işlerde job-specific risk assessment (JSA) doldurulur ve katılımcılar imzalar.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka dersi — atlanan toolbox",
              text: `Bir gemide rutin sayılan needle scaler işi öncesi toolbox atlandı; tayfa kulaklık takmadan, eldivensiz çalıştı. Sonuç: el yaralanması + işitme şikayeti. Soruşturma "rutin işin de brifing gerektirdiğini" vurguladı. Rutinlik, güvenlik brifingini ortadan kaldırmaz.`,
            },
          ],
        },
        {
          subheading: "4.2 Dil ve iletişim engelleri",
          paragraphs: [
            `Çok uluslu ekiplerde ortak çalışma dili (genelde İngilizce + denizcilik jargonu) kullanılır. Reis, talimatın anlaşıldığını "geri okutma" (read-back) ile teyit eder. Anlaşılmayan bir emir, sahada yanlış uygulanır; bu da kaza demektir. Görsel gösterim ve elle yapıp gösterme dil engelini aşmanın en etkili yoludur.`,
          ],
        },
      ],
    },
    {
      heading: "5. PPE Denetimi ve İş Güvenliği Uyumu",
      sections: [
        {
          subheading: "5.1 PPE kontrolü",
          paragraphs: [
            `Reis, ekibin baret, emniyet ayakkabısı, tulum, eldiven, gözlük, kulaklık ve işe özel ekipmanı (harness, yüz siperi, toz maskesi, can yeleği) eksiksiz ve sağlam taşıdığını denetler. Hasarlı PPE derhal değiştirilir. PPE en son savunma hattıdır; risk kaynağında giderildikten sonra bile vazgeçilmezdir.`,
          ],
          table: {
            caption: `İşe Göre Asgari PPE Matrisi`,
            headers: ["İş", "Asgari PPE", "Ek Ekipman"],
            rows: [
              ["Chipping/grinding", "Gözlük, kulaklık, maske, eldiven", "Yüz siperi, chaps"],
              ["Boyama (sprey)", "Tulum, organik buhar maskesi, eldiven", "Gözlük, başlık"],
              ["Working aloft", "Harness double lanyard, baret", "Secondary attachment"],
              ["Mooring", "Baret, can yeleği*, eldiven", "*Riske göre, snap-back disiplini"],
              ["Enclosed space", "Atmosfer ölçer, SCBA/SAA", "Lifeline, harness"],
            ],
          },
        },
        {
          subheading: "5.2 Kurallara uyumu denetlemek",
          paragraphs: [
            `Reis, sahada sürekli dolaşır; permit kapsamı dışına çıkan, PPE'siz çalışan veya tehlikeli kestirme yapan personeli anında uyarır. Tolere edilen küçük bir ihlal, normalleşir ve büyük kazanın zeminini hazırlar. "Görmezden gelinen güvensiz davranış, onaylanmış demektir" prensibi geçerlidir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "COSWP ve ISM Element 6",
              text: `UK MCA Code of Safe Working Practices (COSWP), güverte işlerinin güvenli standardını tanımlar. ISM Code Element 6, şirketin yeterli ve eğitimli personel sağlamasını ve görev tanımlarını zorunlu kılar. Reis bu standartların saha uygulayıcısıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Dinlenme Saatleri ve Yorgunluk Yönetimi",
      sections: [
        {
          subheading: "6.1 Rest hours uyumu",
          paragraphs: [
            `STCW ve MLC 2006, mürettebatın asgari dinlenme saatlerini düzenler: 24 saatte en az 10 saat, 7 günde en az 77 saat dinlenme; dinlenme en fazla iki bölüme ayrılabilir ve biri en az 6 saat kesintisiz olmalıdır. Reis, ekibin work-rest hours kayıtlarını ihlal edecek şekilde iş planlamaz.`,
            `Yorgunluk, denizdeki kazaların başlıca insan faktörüdür. Liman/manevra döneminde uzun saatler çalışan bir tayfaya ertesi sabah riskli iş verilmez. Reis, ekibin gerçek dinlenmesini gözeterek hem mevzuata uyar hem de kazayı önler.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MLC 2006 Reg. 2.3 / STCW A-VIII/1",
              text: `Dinlenme saati ihlalleri PSC tarafından detention sebebi olabilir. Reis, ekip planlamasında bu limitleri Birinci Zabit ile koordineli takip eder; planlama belgesi ile gerçek çalışma örtüşmelidir.`,
            },
          ],
        },
        {
          subheading: "6.2 Yorgunluk belirtileri ve müdahale",
          paragraphs: [
            `Reis; dikkat dağınıklığı, yavaşlama, sinirlilik ve hata artışı gibi yorgunluk belirtilerini erken görür. Böyle bir durumda iş tempo değiştirilir, ekip rotasyona alınır veya iş ertelenir. Saha komutanının en değerli özelliği, ekibini "okuyabilmesi"dir.`,
          ],
        },
      ],
    },
    {
      heading: "7. Saha Gözetimi ve İş Takibi",
      sections: [
        {
          subheading: "7.1 Aktif gözetim",
          paragraphs: [
            `Reis, masaya oturup işi izlemez; sahada dolaşır, işin tekniğine ve güvenliğine bizzat müdahale eder. Bir işin yanlış başladığını görürse durdurur ve doğru yöntemi gösterir. Aynı anda birden fazla iş yürüyorsa, en riskli olanına en çok zaman ayırır.`,
            `Reis, işin ilerlemesini takip eder ve gecikme veya engel (malzeme yetersizliği, hava değişimi, ekipman arızası) çıktığında Birinci Zabit'i zamanında bilgilendirir. Sahadaki sorunu zabite geç iletmek, gün boyu verim kaybı demektir.`,
          ],
        },
        {
          subheading: "7.2 Eş zamanlı operasyonların çakışması",
          paragraphs: [
            `Limanda yük operasyonu, bunkering, store alımı ve bakım aynı anda yürüyebilir. Reis; bu işlerin birbirini tehlikeye atmamasını sağlar — örneğin yük vinci çalışırken altında boyama yaptırılmaz, hot work bunkering sırasında yapılmaz. Çakışma yönetimi, saha komutanının en kritik becerilerindendir.`,
          ],
        },
      ],
    },
    {
      heading: "8. Raporlama ve Kayıt",
      sections: [
        {
          subheading: "8.1 Günlük raporlama",
          paragraphs: [
            `Gün sonunda Reis, tamamlanan işleri, kullanılan malzemeyi, eksik kalan işleri ve sahadaki gözlemleri (yeni pas bölgeleri, arızalanan ekipman, tükenen stok) Birinci Zabit'e raporlar. PMS iş emirleri tamamlanma kanıtıyla (fotoğraf, ölçüm) kapatılır.`,
            `Bu raporlama yalnızca bürokrasi değildir; geminin teknik hafızasıdır. Bir denetimde, bir kazadan sonra veya yeni ekip geldiğinde bu kayıtlar "ne yapıldı, ne kaldı" sorusunun tek güvenilir cevabıdır.`,
          ],
        },
        {
          subheading: "8.2 Near-miss ve gözlem raporlama",
          paragraphs: [
            `Reis, ucuz atlatılan olayları (near-miss) ve güvensiz koşulları teşvik edici bir tutumla raporlar. Near-miss kültürü, büyük kazaların önündeki en güçlü erken uyarı sistemidir. Cezalandırıcı değil, öğretici bir yaklaşım ekibi rapor vermeye cesaretlendirir.`,
          ],
        },
      ],
    },
    {
      heading: "9. Liderlik, Disiplin ve Motivasyon",
      sections: [
        {
          subheading: "9.1 Adalet ve tutarlılık",
          paragraphs: [
            `Ekip disiplini, Reis'in adil ve tutarlı olmasından doğar. Aynı kural herkese eşit uygulanır; iltimas, ekip moralini en hızlı bozan şeydir. Reis, eleştirisini özelde, takdirini açıkta yapar; bu basit ilke yıllarca ekip sağlığını korur.`,
            `Zor koşullarda (kötü hava, uzun saatler, monoton iş) Reis'in tutumu ekibe yansır. Sakin, kararlı ve önde duran bir Reis ekibi taşır; paniğe kapılan veya sürekli bağıran bir Reis ekibi dağıtır.`,
          ],
        },
        {
          subheading: "9.2 Kültürlerarası ekip yönetimi",
          paragraphs: [
            `Gemilerde çok uluslu ekipler standarttır. Reis; farklı dil, din ve kültürden tayfaları ortak bir güvenlik ve iş kültüründe buluşturur. Saygı ve net iletişim temel araçlardır. Yemekhane düzeni, dinlenme alanı kullanımı ve görev paylaşımında hakkaniyet, ekip uyumunu sağlar.`,
          ],
        },
      ],
    },
    {
      heading: "10. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "10.1 Reis'in günlük checklist'i",
          bullets: [
            `Hava/gemi durumu ve aktif iş emirleri Birinci Zabit ile senkronize mi?`,
            `Günün işleri önceliklendirildi mi (emniyet > sefer kritik > önleyici > kozmetik)?`,
            `İş-kişi eşleştirmesi yetkinlik ve risk düzeyine uygun mu?`,
            `Toolbox meeting yapıldı, riskler ve PPE açıklandı mı, JSA imzalandı mı?`,
            `PPE kontrolü yapıldı, hasarlı ekipman değiştirildi mi?`,
            `Permit gerektiren işler için izinler alındı mı (hot work, enclosed space, aloft)?`,
            `Dinlenme saatleri (MLC/STCW) ihlal edilmiyor mu?`,
            `Eş zamanlı operasyonlar çakışmıyor mu (vinç altı, bunkering, hot work)?`,
            `Gün sonu rapor + PMS kapanışı + near-miss kayıtları tamamlandı mı?`,
          ],
          paragraphs: [
            `Reis'in günlük yönetimdeki başarısı, "kimsenin fark etmediği" sorunsuz günlerde gizlidir. İyi dağıtılmış iş, iyi denetlenmiş güvenlik ve iyi motive edilmiş bir ekip; gemiyi hem verimli hem kazasız tutar. Reis, güvertenin saha komutanı olarak bu dengeyi her gün yeniden kurar.`,
          ],
        },
      ],
    },
  ],
};

export default content;
