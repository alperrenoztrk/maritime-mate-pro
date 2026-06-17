import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Yangın algılama ve alarm sistemi bakımı",
  roleSlug: "eto",
  taskIndex: 3,
  estimatedPages: 25,
  intro: `Yangın algılama ve alarm sistemi (Fire Detection and Alarm System — FDAS), bir geminin can ve mal emniyetinin elektronik ön cephesidir; saniyeler içinde bir yangının tespit edilip köprüüstüne bildirilmesi, müdahale ile felaket arasındaki farkı belirler. Elektro-Teknik Zabit (ETO), fire detection panel'inin, dedektör loop'larının (smoke/heat/flame), manual call point'lerin, alarm sounder ve flasher'larının ve bunların CCTV/güvenlik sistemiyle entegrasyonunun teknik sağlığından sorumludur. Bu bölüm; SOLAS II-2 ve FSS Code çerçevesinde dedektör temizliği, zone loop fault finding, fonksiyon testi ve spare yönetimini pratik değerler ve gerçek arıza senaryoları ile adım adım anlatır.`,
  sources: [
    "SOLAS Chapter II-2 — Fire Protection, Detection and Extinction",
    "FSS Code (Fire Safety Systems Code) Chapter 9 — Fixed Fire Detection and Fire Alarm Systems",
    "IMO Res. A.1021(26) — Code on Alerts and Indicators",
    "STCW Code A-III/6 — Electro-technical officer competence table",
    "IEC 60092-504 — Control and Instrumentation, Marine Fire Detection",
    "IACS UR / sınıf kuralları (DNV, LR, ABS) — fire detection survey gereklilikleri",
    "Ship's manufacturer fire panel manuals (Consilium, Salwico, Autronica)",
    "MSC.1/Circ.1313 — Maintenance of fire protection systems",
  ],
  chapters: [
    {
      heading: "1. Fire Detection Sisteminin Mimarisi ve ETO'nun Rolü",
      lead: `Modern bir gemi yangın algılama sistemi, addressable veya conventional mimaride çalışan, yüzlerce dedektörü tek bir merkezi panele bağlayan kritik bir emniyet ağıdır.`,
      sections: [
        {
          subheading: "1.1 Addressable ve conventional sistem farkı",
          paragraphs: [
            `Conventional sistemlerde dedektörler zone (bölge) bazında gruplanır; panel yalnızca hangi zone'da alarm olduğunu gösterir, tek tek hangi dedektörün tetiklendiğini bilemez. Addressable (adreslenebilir) sistemlerde ise her dedektörün benzersiz bir adresi vardır; panel tam olarak hangi kamarada, hangi koridorda alarm/fault olduğunu raporlar. Modern büyük gemilerde loop tabanlı addressable sistem standarttır ve fault finding'i büyük ölçüde kolaylaştırır.`,
            `ETO, sistemin tek hat şemasını (loop diagram) ve dedektör adres listesini eksiksiz bilmelidir: her loop kaç dedektör taşır, hat sonu (end-of-line) direnci nerededir, loop isolator'lar hangi noktalarda konumlanmıştır. Bu bilgi olmadan ne hızlı arıza teşhisi ne de doğru spare yerleştirme mümkündür.`,
          ],
          bullets: [
            `Conventional: zone bazlı, dedektör tek tek adreslenemez`,
            `Addressable: her dedektör benzersiz adresli, kesin lokasyon`,
            `Loop topolojisi: A/B uçlu (class A) hat kopmasında çift besleme`,
            `Loop isolator: kısa devrede loop'un sağlıklı kısmını korur`,
            `End-of-line (EOL) direnci: hat bütünlüğü izleme`,
          ],
        },
        {
          subheading: "1.2 SOLAS ve FSS Code kapsamı",
          paragraphs: [
            `SOLAS II-2, makine daireleri, kargo bölgeleri, kamaralar, koridorlar ve kaçış yollarının sabit yangın algılama ile korunmasını zorunlu kılar. FSS Code Chapter 9, sistemin tasarım, test ve onay kriterlerini detaylandırır: dedektörler bir arıza veya güç kaybında alarm verme yeteneğini koruyacak şekilde tasarlanmalı, sistem hem ana hem acil güç kaynağından beslenmelidir.`,
            `ETO, sistemin sınıf ve bayrak gerekliliklerine uygunluğunu PSC ve sörveyler için belgeler: dedektör yerleşim haritaları, test kayıtları ve arıza/onarım logları güncel tutulur. Sistemin köprüüstündeki tekrar panelinden (repeater) ve mümkünse machinery control room'dan izlenebilmesi de zorunludur.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS II-2 / FSS Code Ch.9",
              text: `Sabit yangın algılama ve alarm sistemi, herhangi bir tek arızanın tüm sistemi devre dışı bırakmayacağı şekilde tasarlanmalıdır. Sistem; ana güç kaybında acil güç kaynağından (batarya/emergency switchboard) beslenmeye devam etmeli ve bir arıza durumunu görsel/işitsel olarak köprüüstünde gösterebilmelidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Dedektör Tipleri ve Çalışma Prensipleri",
      sections: [
        {
          subheading: "2.1 Smoke (duman) dedektörleri — iyonizasyon ve fotoelektrik",
          paragraphs: [
            `İyonizasyon dedektörleri, küçük bir radyoaktif kaynak (Am-241) ile iyonlaşmış havadaki akımın duman partikülleriyle bozulmasını algılar; hızlı, alevli yangınlara duyarlıdır ama günümüzde radyoaktif kaynak nedeniyle azalmıştır. Fotoelektrik (optik) dedektörler, bir LED ışın demetinin duman partikülleri tarafından saçılmasını fotosel ile algılar; yavaş gelişen, dumanlı yangınlara daha duyarlıdır ve gemilerde yaygındır.`,
            `ETO, dedektör tipini bölgenin risk profiline göre seçer: kamaralar ve koridorlar için optik smoke, mutfak ve makine dairesi gibi yanlış alarm riski yüksek yerler için heat veya multi-criteria (kombine) dedektör tercih edilir. Yanlış dedektör seçimi ya geç algılama ya da kronik yanlış alarm yaratır.`,
          ],
        },
        {
          subheading: "2.2 Heat (ısı) ve flame (alev) dedektörleri",
          paragraphs: [
            `Heat dedektörleri iki tipte çalışır: fixed temperature (sabit sıcaklık, örn. 57°C veya 78°C eşiği) ve rate-of-rise (sıcaklık artış hızına duyarlı, örn. >8°C/dakika). Mutfak, çamaşırhane ve makine dairesi gibi normalde sıcak veya buharlı ortamlarda smoke yerine heat dedektör kullanılır. Flame dedektörleri ise UV/IR ışınımı algılar ve tanker güvertesi gibi açık alanlarda hızlı parlamalı yangınlar için kullanılır.`,
            `ETO, heat dedektörlerinin sıcaklık eşiğinin ortam koşuluna uygun olduğunu doğrular. Örneğin makine dairesi tavanında çalışan bir motor üstündeki dedektör yüksek sınıf (örn. 90°C) seçilmezse normal işletme sıcaklığında yanlış alarm üretir.`,
          ],
          table: {
            caption: `Dedektör Tipleri ve Tipik Uygulama Alanları`,
            headers: ["Dedektör Tipi", "Algılama Prensibi", "Tipik Uygulama", "Yanlış Alarm Riski"],
            rows: [
              ["Optik smoke", "Işın saçılması (fotoelektrik)", "Kamara, koridor, kaçış yolu", "Toz/buhar ile orta"],
              ["İyonizasyon smoke", "İyon akımı bozulması", "Hızlı alevli yangın", "Yüksek (azalmakta)"],
              ["Heat (fixed)", "57/78/90°C eşik", "Mutfak, çamaşırhane", "Düşük"],
              ["Heat (rate-of-rise)", "Sıcaklık artış hızı", "Makine dairesi", "Düşük-orta"],
              ["Flame (UV/IR)", "Alev ışınımı", "Tanker güvertesi, açık alan", "Güneş/ark ile orta"],
            ],
          },
        },
        {
          subheading: "2.3 Manual call point (MCP) ve aspirating sistemler",
          paragraphs: [
            `Manual call point (yangın ihbar butonu), bir kişinin yangını manuel olarak bildirmesini sağlar; break-glass veya push tipinde olur ve kaçış yolları boyunca SOLAS'a uygun aralıklarla konumlandırılır. ETO, MCP'lerin elektriksel sürekliliğini ve cam/buton mekanizmasının çalışırlığını periyodik test eder.`,
            `Aspirating smoke detection (ASD/VESDA) sistemleri, havayı bir boru ağıyla sürekli emerek lazer tabanlı dedektörden geçirir; çok erken algılama sağlar ve kargo ambarları, sunucu odaları gibi kritik alanlarda kullanılır. ETO bu sistemlerin filtre, fan ve numune alma deliklerinin tıkanıklık kontrolünü yapar.`,
          ],
        },
      ],
    },
    {
      heading: "3. Fire Panel İşletimi ve Yapılandırması",
      sections: [
        {
          subheading: "3.1 Panel arayüzü, alarm ve fault gösterimi",
          paragraphs: [
            `Fire detection panel, sistemin merkezi beynidir: alarm, fault, disablement ve test durumlarını LED/LCD ile gösterir; alarm sounder'ları, fire flap'leri ve ventilasyon kapatma röleleri için çıkış sağlar. ETO, panelin alarm (kırmızı), fault (sarı) ve power (yeşil) göstergelerini doğru yorumlamalı ve panel event log'unu düzenli inceleyerek tekrar eden (recurring) arızaları tespit etmelidir.`,
            `Bir bakım veya tadilat sırasında dedektör veya zone geçici olarak devre dışı (disabled/isolated) bırakılabilir; ancak ETO bunun permit sistemiyle kayıt altına alınmasını ve iş bitince mutlaka yeniden devreye alınmasını (re-enable) sağlamalıdır. Unutulan bir disablement, gerçek yangında algılama kaybı demektir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Unutulan disablement riski",
              text: `Bakım için izole edilen bir zone veya dedektör yeniden devreye alınmazsa, o bölgede yangın algılanamaz. Her disablement bir kayıt defterine ve panel log'una işlenmeli, vardiya devrinde devredilmeli ve iş bitiminde çift kişiyle teyit edilerek re-enable yapılmalıdır.`,
            },
          ],
        },
        {
          subheading: "3.2 Alarm setpoint, gecikme ve cause-and-effect matrisi",
          paragraphs: [
            `Modern panellerde her dedektörün hassasiyeti (sensitivity) ve gerekirse alarm gecikmesi (örn. day/night mode) yapılandırılabilir. Cause-and-effect matrisi; bir dedektör alarm verince hangi çıkışların tetikleneceğini (ventilasyon kapanması, fire damper, fixed gas release ön uyarısı) tanımlar. ETO bu matrisin manufacturer ve sınıf onaylı konfigürasyonla uyumlu kalmasını sağlar.`,
            `Yanlış yapılandırılmış gecikme veya hassasiyet, ya tehlikeli geç algılamaya ya da kronik yanlış alarma yol açar. ETO, hassasiyet değişikliklerini yalnızca yetkili kullanıcı seviyesinde ve kayıt altında yapar; değişiklikler sörvey kapsamındadır.`,
          ],
        },
      ],
    },
    {
      heading: "4. Periyodik Bakım ve Dedektör Temizliği",
      sections: [
        {
          subheading: "4.1 Dedektör temizliği ve kirlilik kompanzasyonu",
          paragraphs: [
            `Optik smoke dedektörleri zamanla toz, is ve böcek birikimi nedeniyle hassasiyet kaybeder veya yanlış alarm üretir. ETO, dedektörleri üretici talimatına göre (basınçlı hava, yumuşak fırça veya özel temizleyici) periyodik temizler. Addressable sistemlerde panel her dedektörün kirlilik (contamination) seviyesini raporlar; eşik aşılınca "compensation limit" uyarısı verir ve dedektör temizlik/değişim gerektirir.`,
            `Temizlik sırasında ilgili zone panelde test/isolate moduna alınır, gemi yangın devriyesi bilgilendirilir ve fixed extinguishing sistemiyle olası interlock geçici olarak güvene alınır. Temizlik sonrası dedektör test cihazıyla (test gas/smoke) fonksiyon doğrulanır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Kirlilik kompanzasyonu",
              text: `Addressable panel, kirlenen dedektörün hassasiyetini otomatik telafi eder ama bir sınıra kadar. "Dirty/Compensation limit" uyarısı görüldüğünde dedektör temizlenmeli; aksi halde ya geç algılama ya da ani yanlış alarm gelir. Bu uyarıları biriktirmek yerine planlı temizlik programına almak en iyi pratiktir.`,
            },
          ],
        },
        {
          subheading: "4.2 Fonksiyon testi ve test programı",
          paragraphs: [
            `Her dedektör periyodik olarak gerçek uyaranla test edilir: smoke dedektörü test aerosol/smoke, heat dedektörü test ısı kaynağı, MCP ise test anahtarı ile. Test, alarmın panelde doğru adres/zone ile göründüğünü ve sounder'ların çaldığını doğrulamalıdır. SOLAS ve şirket SMS'i tipik olarak haftalık panel kontrolü, aylık örnek dedektör testi ve yıllık tam test öngörür.`,
            `ETO, test edilen her cihazı, sonucu ve tarihi kaydeder; arızalı dedektörler değiştirilir. Test sırasında sabit gaz boşaltma (CO2/FM-200) interlock'larının kesinlikle güvene alınmış olması hayati önemdedir; aksi halde test, istenmeyen gaz boşalmasına yol açabilir.`,
          ],
          table: {
            caption: `Fire Detection Sistemi — Tipik Bakım Periyotları`,
            headers: ["İşlem", "Periyot", "Kapsam", "Kayıt"],
            rows: [
              ["Panel görsel kontrol", "Haftalık", "Alarm/fault/power LED, log", "Köprü jurnali"],
              ["Örnek dedektör testi", "Aylık", "Her zone'dan numune", "Bakım log"],
              ["Tam sistem testi", "Yıllık", "Tüm dedektör + MCP + sounder", "Sınıf sörvey"],
              ["Dedektör temizliği", "6-12 ay", "Kirli/uyarı veren dedektörler", "PMS"],
              ["Batarya backup testi", "Yıllık", "Acil güç ile çalışma süresi", "Sınıf sörvey"],
            ],
          },
        },
      ],
    },
    {
      heading: "5. Zone Loop Kontrolü ve Fault Finding",
      sections: [
        {
          subheading: "5.1 Loop arızası tipleri — open, short, earth fault",
          paragraphs: [
            `Loop arızaları üç ana tipte görülür: open circuit (hat kopması/gevşek terminal), short circuit (kablo kısa devresi, su girişi) ve earth fault (kablo izolasyon bozulması, toprağa kaçak). Addressable panel arızanın adresini veya iki adres arasındaki segmenti gösterir; bu, fault finding'i hızlandırır. Conventional sistemde ise ETO zone bazında, terminal terminal ölçümle ilerler.`,
            `ETO, loop direncini ve EOL değerini multimetre ile ölçer, loop isolator'ların açıp açmadığını kontrol eder. Kablo bağlantı kutularındaki (junction box) nem ve korozyon, gemilerde en sık open/earth fault nedenidir. Bağlantılar temizlenir, gerekirse contact cleaner ve yeniden sıkma uygulanır.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka: Tekrar eden zone faulti",
              text: `Bir kuru yük gemisinde aynı koridor zone'u her gece intermittent fault veriyordu. İnceleme, bir junction box'ın güverte yıkama suyundan nem aldığını ve sıcaklık değişimiyle direnç oynadığını gösterdi. Box conduit girişi yeniden sızdırmaz hale getirilince arıza kalktı. Ders: tekrar eden arızalar mutlaka kök nedene kadar takip edilmelidir.`,
            },
          ],
        },
        {
          subheading: "5.2 Loop isolator ve hat bütünlüğü",
          paragraphs: [
            `Class A (çift uçlu) loop'larda bir noktada hat kopsa bile panel her iki uçtan besleyerek dedektörlerin çalışmasını sürdürür. Loop isolator modülleri, bir segmentteki kısa devrede o segmenti izole edip loop'un geri kalanını korur. ETO, isolator'ların doğru aralıklarla konumlandığını ve çalıştığını doğrular; bir isolator arızası kısa devrede tüm loop'un düşmesine yol açabilir.`,
          ],
        },
      ],
    },
    {
      heading: "6. Alarm Bildirim Cihazları ve Acil Güç",
      sections: [
        {
          subheading: "6.1 Sounder, flasher ve genel yangın alarmı",
          paragraphs: [
            `Yangın algılandığında general alarm sounder'ları (kornalar/ziller) ve görsel flasher'lar devreye girer; gürültülü makine dairelerinde işitsele ek görsel uyarı zorunludur. ETO, sounder devrelerinin sürekliliğini, ses seviyesini (kamaralarda uyandırma seviyesi) ve flasher'ların çalışırlığını test eder. General alarm, yangın alarmından ayrı bir devre olabilir; ikisinin entegrasyonu doğrulanır.`,
          ],
        },
        {
          subheading: "6.2 Acil güç beslemesi ve batarya bakımı",
          paragraphs: [
            `Fire detection sistemi, ana güç kaybında acil güç kaynağından (emergency switchboard veya panel içi batarya) beslenmeye devam etmelidir; FSS Code tipik olarak ana kaynak kaybından sonra belirli bir süre (örn. dedektör + alarm çalışması) çalışabilme yeteneği ister. ETO, panel backup bataryalarının terminal voltajını, iç direncini ve değişim tarihini izler; yaşlanan bataryalar yıllık testte düşük süre verir ve değiştirilir.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "Acil güç süresi",
              text: `Fire alarm panelinin batarya yedeği, ana güç kaybında sistemi standby modda belirli bir süre (üretici/sınıf gerekliliğine göre, tipik 24-72 saat standby + alarm süresi) besleyebilmelidir. Batarya iç direnci ve kapasite testi yıllık sörvey kapsamındadır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. CCTV ve Güvenlik Sistemi Bakımı",
      sections: [
        {
          subheading: "7.1 CCTV sistemi ve yangın izlemeyle entegrasyon",
          paragraphs: [
            `Modern gemilerde CCTV; makine dairesi, kargo bölgeleri, mooring istasyonları ve güvenlik alanlarının köprüüstünden izlenmesini sağlar. Bazı sistemlerde CCTV, yangın algılama ile entegredir: bir zone alarm verince ilgili kamera otomatik olarak köprü monitörüne gelir, böylece yangın görsel teyit edilebilir. ETO; kameraların, kayıt cihazının (DVR/NVR), ağ anahtarlarının ve monitörlerin teknik bakımından sorumludur.`,
            `ETO, kamera lenslerinin temizliğini, gece görüş (IR) çalışmasını, kayıt cihazının disk sağlığını ve ağ bağlantılarını periyodik kontrol eder. Patlayıcı atmosfer bölgelerindeki (tanker güverte) kameralar Ex-onaylı (intrinsically safe / Ex d) olmalıdır.`,
          ],
        },
        {
          subheading: "7.2 Güvenlik ve erişim kontrol sistemleri",
          paragraphs: [
            `ISPS Code kapsamında gemi güvenlik sistemleri (Ship Security Alert System — SSAS, kapı erişim kontrolü, intrusion alarm) de ETO'nun teknik uhdesindedir. SSAS, gizli olarak aktive edildiğinde şirkete ve yetkili otoritelere sessiz alarm gönderir; ETO bu sistemin batarya ve haberleşme yolunu test eder ancak testleri yetkililerle koordine eder (yanlış alarm ciddi sonuç doğurur).`,
          ],
          callouts: [
            {
              type: "warning",
              title: "SSAS testinde koordinasyon",
              text: `Ship Security Alert System (SSAS) testleri, yanlış alarm önlemek için MUTLAKA şirket güvenlik zabiti (CSO) ve ilgili otoritelerle önceden koordine edilerek yapılır. İzinsiz/koordinasyonsuz SSAS aktivasyonu sahil güvenlik müdahalesine ve ciddi yasal sonuçlara yol açabilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "8. Spare Yönetimi ve Yanlış Alarm Önleme",
      sections: [
        {
          subheading: "8.1 Spare detector ve kritik yedek yönetimi",
          paragraphs: [
            `ETO, sınıf gerekliliklerine uygun spare dedektör, MCP, loop card ve panel modülü stokunu güncel tutar. Spare dedektörler doğru tip ve adresleme kapasitesinde olmalı, ESD'ye karşı korumalı (antistatik poşet) saklanmalıdır. Kritik spare listesi (sınıf onaylı) gemide bulundurulmalı ve kullanılan her parça stoktan düşülüp sipariş edilmelidir.`,
          ],
        },
        {
          subheading: "8.2 Yanlış alarm (false alarm) yönetimi",
          paragraphs: [
            `Sık yanlış alarm, mürettebatın alarma duyarsızlaşmasına (alarm fatigue) yol açar ve gerçek yangında geç tepkiye neden olur. ETO, yanlış alarmların kök nedenini (kirli dedektör, yanlış tip seçimi, buhar/toz, böcek, nem) tespit eder ve düzeltir. Çözüm; dedektör temizliği, doğru tipe geçiş, multi-criteria dedektör veya alarm doğrulama (verification) gecikmesi olabilir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Alarm verification",
              text: `Bazı paneller, alarmı tetikleyen dedektörü kısa bir süre (örn. 30 sn) yeniden örnekleyerek anlık parazitleri eler. Bu özellik mutfak gibi yanlış alarma yatkın bölgelerde yararlıdır; ancak gecikme, sınıf onaylı sınırları aşmamalı ve kaçış yolları gibi kritik bölgelerde dikkatli kullanılmalıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "9. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "9.1 ETO fire detection kontrol listesi",
          bullets: [
            `Panel haftalık görsel kontrolü yapıldı, log incelendi mi?`,
            `Tüm disablement/isolation kaydedildi ve iş sonunda re-enable edildi mi?`,
            `Aylık örnek dedektör ve MCP testi yapıldı, kayıt tutuldu mu?`,
            `Kirli/uyarı veren dedektörler temizlendi veya değiştirildi mi?`,
            `Zone loop fault'ları kök nedene kadar takip edildi mi?`,
            `Loop isolator ve hat bütünlüğü doğrulandı mı?`,
            `Sounder/flasher fonksiyonu ve ses seviyesi test edildi mi?`,
            `Panel backup batarya iç direnci ve süresi kontrol edildi mi?`,
            `Sabit gaz söndürme interlock'ları test sırasında güvene alındı mı?`,
            `CCTV ve güvenlik sistemleri çalışır, spare stok güncel mi?`,
          ],
          paragraphs: [
            `Yangın algılama sistemi, çoğu zaman sessizce bekleyen ama bir an geldiğinde hayat kurtaran bir emniyet ağıdır. ETO'nun başarısı; bu sistemin her dedektörünün temiz ve duyarlı, her loop'unun bütün, her alarmının gerçek ve güvenilir olmasını sağlamasıyla ölçülür. Disiplinli test, hızlı fault finding ve titiz disablement yönetimi, bu görevin temel taşlarıdır.`,
          ],
        },
      ],
    },
  ],
};

export default content;
