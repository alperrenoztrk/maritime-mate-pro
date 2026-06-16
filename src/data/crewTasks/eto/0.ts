import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Güç üretim ve dağıtım sistemlerinin yönetimi",
  roleSlug: "eto",
  taskIndex: 0,
  estimatedPages: 26,
  intro: `Elektro-Teknik Zabit (ETO), gemideki elektrik enerjisinin üretiminden son tüketiciye kadar olan tüm zincirin teknik sağlığından sorumludur. Bu zincir; diesel generator'ların AVR (Automatic Voltage Regulator) ve excitation sistemlerini, ana dağıtım panosu (main switchboard) ile acil dağıtım panosunu (emergency switchboard), koruma rölelerini, load sharing ve auto start/stop mantığını, preferential trip kademelerini ve shore power bağlantısını kapsar. Bu bölüm, ETO'nun güç üretim ve dağıtım sistemini güvenli, kararlı ve mevzuata uygun şekilde yönetmesi için gereken metodolojiyi pratik değerler ve sınıf kuralları ile birlikte adım adım anlatır.`,
  sources: [
    "SOLAS Chapter II-1 Part D — Electrical Installations (Reg. 40-45)",
    "STCW Code A-III/6 — Electro-technical officer competence table",
    "IEC 60092 — Electrical Installations in Ships",
    "IEC 61892 — Mobile and Fixed Offshore Units, Electrical Installations",
    "IACS UR E (Electrical) ve sınıf kuralları (DNV, LR, ABS Part 4)",
    "IEEE 45 — Recommended Practice for Electrical Installations on Shipboard",
    "MARPOL Annex VI / MEPC — enerji verimliliği ve emisyon bağlamı",
    "Ship Electrical Systems — D. T. Hall / Reeds Marine Electrical Technology",
  ],
  chapters: [
    {
      heading: "1. Gemi Güç Sistemi Mimarisi ve ETO'nun Rolü",
      lead: `Bir geminin elektrik şebekesi, kara şebekesinden farklı olarak izole, sınırlı kapasiteli ve ada (island) modunda çalışan bir mikro-şebekedir. ETO bu şebekenin kararlılığından ilk derecede sorumludur.`,
      sections: [
        {
          subheading: "1.1 Tipik şebeke topolojisi ve gerilim seviyeleri",
          paragraphs: [
            `Geleneksel ticari gemilerde ana üretim 440 V veya 690 V, 60 Hz üç fazlı sistemdir; Avrupa kökenli bazı gemilerde 380 V / 50 Hz görülür. Dağıtım kademeli yapılır: ana switchboard'tan 440 V büyük tüketicilere (pompalar, fanlar, vinçler) gider, transformatörler aracılığıyla 230 V / 220 V aydınlatma ve priz devrelerine düşürülür. Modern büyük gemilerde 6.6 kV veya 11 kV HV üretim ve elektrikli tahrik (diesel-electric) yaygındır.`,
            `ETO, single-line diagram (tek hat şeması) üzerinden tüm şebekeyi zihninde modelleyebilmelidir: hangi bara hangi generator'dan beslenir, bus-tie breaker açık mı kapalı mı, hangi tüketici preferential trip kademesindedir. Arıza anında doğru izolasyon ve restorasyon yapabilmek bu şemaya hakimiyetle mümkündür.`,
          ],
          bullets: [
            `Ana üretim: 440 V / 690 V / 60 Hz (HV gemilerde 6.6-11 kV)`,
            `Aydınlatma & priz: 230 V / 220 V trafodan beslenir`,
            `Emergency switchboard: ayrı, otomatik devreye giren bara`,
            `Bus-tie breaker: ana bara ile acil bara bağlantısı`,
            `Shore connection panel: liman/kara enerjisi girişi`,
          ],
        },
        {
          subheading: "1.2 ETO'nun STCW A-III/6 yetkinlik çerçevesi",
          paragraphs: [
            `STCW Manila değişiklikleri ile resmileşen ETO sertifikası (A-III/6), elektrik, elektronik ve kontrol mühendisliği yetkinliklerini bir araya getirir. ETO; güç üretim sistemlerinin işletimi, izlenmesi ve bakımından, otomasyon ve kontrol sistemlerinden, seyir/haberleşme elektroniğinin teknik bakımından ve gemi güvenlik/IT sistemlerinden sorumludur.`,
            `Görev hiyerarşisinde ETO, Baş Mühendis'e (Chief Engineer) bağlı çalışır ancak elektrik/elektronik konularında geminin en yetkin teknik personelidir. Vardiya mühendisleri ile koordineli çalışır; özellikle blackout, generator paralelleme ve switchboard manevralarında makine ekibiyle ortak hareket eder.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "STCW A-III/6",
              text: `ETO yetkinlik tablosu; "Monitor the operation of electrical, electronic and control systems", "Operate generators and distribution systems" ve "Operate and maintain power systems in excess of 1000 volts" fonksiyonlarını içerir. HV sistemlerde çalışacak ETO ek HV eğitimi belgelendirmek zorundadır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Diesel Generator Elektriksel Bakımı",
      sections: [
        {
          subheading: "2.1 AVR ve excitation sistemi",
          paragraphs: [
            `AVR (Automatic Voltage Regulator), alternatörün uç gerilimini yük değişimine rağmen sabit (±%2.5 SOLAS toleransı içinde, geçici %±3.5) tutar. Çalışma prensibi; çıkış gerilimini örnekler, referansla karşılaştırır ve excitation (uyartım) akımını brushless exciter veya statik uyartım üzerinden ayarlar. ETO, AVR'nin droop/quadrature droop ayarını paralel çalışan generator'lar arasındaki reaktif yük paylaşımını dengeleyecek şekilde kalibre eder.`,
            `Brushless alternatörlerde rotating diode (döner diyot) köprüsü kritik bir bileşendir; bir diyotun açık devre veya kısa devre olması gerilim dalgalanmasına ve excitation kaybına yol açar. ETO, periyodik olarak diyotları RDFM (Rotating Diode Failure Monitor) ile veya offline ölçümle test eder. AVR'nin sensing kablolarının ve voltage build-up için gereken residual magnetism'in varlığı da kontrol edilir; gerekirse "field flashing" ile alternatör yeniden uyartılır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Voltage build-up sorunu",
              text: `Uzun süre çalışmamış bir alternatör residual magnetism kaybederse gerilim üretemez. AVR'ye geçici olarak 12-24 V DC batarya ile field flashing yapılarak (doğru polarite ile) manyetik alan yeniden başlatılır. Yanlış polarite AVR'yi yakabilir.`,
            },
          ],
        },
        {
          subheading: "2.2 Koruma röleleri ve test programı",
          paragraphs: [
            `Her generator breaker'ı bir dizi koruma rölesiyle donatılır: reverse power (32), overcurrent (50/51), under/over voltage (27/59), under/over frequency (81), differential (87) ve büyük makinelerde negative sequence (46). ETO, bu rölelerin setpoint'lerini sınıf onaylı protection coordination study'ye göre ayarlar ve periyodik olarak secondary injection test cihazı ile doğrular.`,
            `Reverse power rölesi özellikle paralel çalışmada kritiktir: bir generator yakıt kaybederse motor (motoring) moduna geçer, diğer makineden güç çeker; röle bunu algılayıp breaker'ı açar (tipik setpoint %2-6 nominal güç, 3-5 sn gecikme). ETO yıllık test çizelgesinde her rölenin pickup ve timing değerini kayıt altına alır; bu kayıtlar PSC ve sınıf sörveylerinde istenir.`,
          ],
          table: {
            caption: `Generator Koruma Röleleri — Tipik Setpoint'ler`,
            headers: ["Röle (ANSI)", "Fonksiyon", "Tipik Setpoint", "Gecikme"],
            rows: [
              ["32 (Reverse Power)", "Motoring koruması", "%2-6 Pn", "3-5 sn"],
              ["51 (Overcurrent)", "Aşırı akım", "%110-150 In", "Ters zaman / 5-10 sn"],
              ["27 (Undervoltage)", "Düşük gerilim", "%80-85 Un", "1-3 sn"],
              ["81U/O (Frekans)", "Düşük/yüksek frekans", "57 / 63 Hz", "2-5 sn"],
              ["87G (Differential)", "İç arıza", "%5-10 In", "Anlık"],
            ],
          },
        },
        {
          subheading: "2.3 Stator/rotor sargı izolasyon kontrolü",
          paragraphs: [
            `Alternatör sargılarının izolasyon direnci, nem ve yaşlanmaya bağlı düşer. ETO, 500 V (LV) veya 1000-5000 V (HV) megger ile stator-toprak ve rotor-toprak IR ölçümü yapar. Polarization Index (PI = 10 dk / 1 dk değer oranı) ve düzeltilmiş minimum IR değeri (IEEE 43) değerlendirilir. Düşük değerler space heater ile kurutma veya sargı temizliği gerektirir.`,
          ],
        },
      ],
    },
    {
      heading: "3. Main Switchboard Operasyonu",
      sections: [
        {
          subheading: "3.1 Synchronizing ve paralel çalışma",
          paragraphs: [
            `İki generator'ı paralele almak için gelen makinenin gerilim, frekans ve faz sırasının çalışan bara ile eşleşmesi gerekir. ETO veya vardiya mühendisi, synchroscope'u (veya auto-synchronizer'ı) izleyerek frekansı baradan hafif yüksek (yavaş saat yönü) tutar ve synchroscope 11-12 yönüne yaklaşırken (faz farkı sıfıra giderken) breaker'ı kapatır. Yanlış faz açısında kapatma büyük geçici akım ve mekanik şok yaratır, mil ve dişlilere zarar verir.`,
            `Auto-synchronizing sistemi check-synch rölesi (25) ile donatılır; manuel kapatmada bile bu röle yanlış faz açısında breaker'ın kapanmasını engeller. ETO, sync panelinin lambalarını, voltmetre/frekansmetre çiftlerini ve sync switch seçicisini düzenli kontrol eder.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Out-of-phase synchronizing",
              text: `Faz farkı 30° üzerindeyken breaker kapatmak nominal kısa devre akımına yakın bir geçici akıma ve şiddetli tork darbesine yol açar. Check-synch rölesi devre dışıyken (test modu) ASLA manuel sync denemeyin.`,
            },
          ],
        },
        {
          subheading: "3.2 Load sharing — aktif ve reaktif",
          paragraphs: [
            `Paralel generator'lar arasında aktif güç (kW) paylaşımı governor (yakıt) üzerinden, reaktif güç (kVAr) paylaşımı ise AVR (excitation) üzerinden yapılır. Speed droop yöntemi yaygındır: her makine yük arttıkça frekansını az miktar düşürür, bu da yükü orantılı paylaştırır. Modern PMS'lerde isochronous load sharing ile frekans sabit tutulurken yük eşitlenir.`,
            `ETO, kW ve kVAr metrelerini izleyerek dengesiz paylaşımı tespit eder. Aktif güç dengesizliği governor karakteristiği veya load sharing line bağlantısıyla, reaktif dengesizlik ise AVR droop ayarıyla düzeltilir. Reaktif dengesizlik bir makinede aşırı stator akımı ve ısınma yaratır.`,
          ],
        },
        {
          subheading: "3.3 Power Management System (PMS) ve auto start/stop",
          paragraphs: [
            `PMS, şebeke yükünü sürekli izler; yük belirli eşiği aşınca standby generator'ı auto start eder, paralele alır ve yük paylaştırır; yük düşünce bir makineyi auto stop eder. ETO, auto start/stop setpoint'lerini (örn. %75'te start, %30'da stop), start gecikmelerini ve heavy consumer interlock'larını (bow thruster, mooring vinçleri çalışmadan önce yeterli güç teyidi) PMS HMI'dan kontrol eder.`,
          ],
          table: {
            caption: `PMS Auto Start/Stop — Örnek Parametreler`,
            headers: ["Olay", "Tetikleyici", "Aksiyon", "Tipik Gecikme"],
            rows: [
              ["Yük yükselmesi", "Bara yükü > %75", "Standby gen start + sync", "10-30 sn"],
              ["Yük düşmesi", "Bara yükü < %30", "Düşük öncelikli gen stop", "5-10 dk"],
              ["Heavy consumer talebi", "Bow thruster start isteği", "Yeterli güç teyidi/blokaj", "Anlık"],
              ["Blackout algısı", "Bara gerilimi = 0", "Emergency gen start", "≤45 sn (SOLAS)"],
            ],
          },
        },
      ],
    },
    {
      heading: "4. Acil Dağıtım Panosu ve Preferential Trip",
      sections: [
        {
          subheading: "4.1 Emergency switchboard ve otomatik devreye girme",
          paragraphs: [
            `Emergency switchboard, normal şartlarda ana baradan bus-tie üzerinden beslenir. Ana güç kaybında (blackout) bu bağlantı açılır, emergency generator otomatik start eder ve emergency bara'yı SOLAS gereği 45 saniye içinde besler. ETO, emergency generator'ın haftalık auto start testini yapar ve emergency switchboard'a bağlı zorunlu tüketicilerin (seyir fenerleri, acil aydınlatma, GMDSS, fire pump, dümen) doğru beslendiğini doğrular.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS II-1 Reg. 43-44",
              text: `Acil güç kaynağı, ana güç kaybından sonra otomatik devreye girmeli ve yolcu gemilerinde 36 saat, kargo gemilerinde 18 saat zorunlu tüketicileri beslemelidir. Geçiş süresi 45 saniyeyi aşmamalıdır; aksi halde geçici (transitional) acil güç kaynağı (batarya) devreye girer.`,
            },
          ],
        },
        {
          subheading: "4.2 Preferential trip kademeleri",
          paragraphs: [
            `Generator aşırı yüklendiğinde tüm baranın çökmesini (blackout) önlemek için preferential trip devreye girer: önce en az kritik tüketiciler (klima, ısıtma, soğutma kompresörleri) kademeli olarak atılır, böylece zorunlu yükler beslenmeye devam eder. ETO, preferential trip rölesinin akım setpoint'lerini ve kademe sıralamasını sınıf onaylı load study'ye göre ayarlar.`,
            `Tipik olarak 3 kademe tanımlanır: 1. kademe (örn. %110 yük, 5 sn) konfor yükleri, 2. kademe (örn. %115, 3 sn) ikincil pompalar, 3. kademe (%120, anlık) son çare. ETO bu kademeleri yıllık olarak test eder ve atılan tüketicilerin doğru olduğunu doğrular.`,
          ],
        },
      ],
    },
    {
      heading: "5. Shore Power (Cold Ironing) Bağlantısı",
      sections: [
        {
          subheading: "5.1 Bağlantı prosedürü ve faz uyumu",
          paragraphs: [
            `Limanda emisyonu azaltmak için gemi, kara şebekesinden (shore power / cold ironing) beslenebilir. ETO, shore connection panel'i hazırlar, gelen gerilim/frekansın gemi şebekesiyle uyumunu (kara 60 Hz mi 50 Hz mi, gerilim seviyesi) ve faz sırasını phase sequence indicator ile kontrol eder. Yanlış faz sırası motorların ters dönmesine yol açar.`,
            `Bağlantı; ya gemi generator'ları durdurulup dead-bus transfer ile, ya da modern sistemlerde shore-to-ship synchronizing ile kesintisiz yapılır. ETO, shore breaker'ın koruma ayarlarını, topraklama bağlantısını ve kara/gemi arası interlock'u doğrular.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "IEC/IEEE 80005 (HVSC)",
              text: `High Voltage Shore Connection standardı; kara-gemi bağlantısının gerilim, frekans, topraklama, kilitleme ve emniyet gereksinimlerini tanımlar. MARPOL Annex VI kapsamında liman hava kalitesi için cold ironing giderek zorunlu hale gelmektedir.`,
            },
          ],
        },
        {
          subheading: "5.2 Topraklama ve emniyet kilitleri",
          paragraphs: [
            `Shore power bağlantısında protective earth (PE) bağlantısı ilk yapılır, son sökülür. ETO, kara fişini takmadan önce voltage detector ile ölü olduğunu teyit eder ve mekanik/elektriksel interlock'un gemi generator breaker'ı ile shore breaker'ın aynı anda kapalı olmasını engellediğini kontrol eder.`,
          ],
        },
      ],
    },
    {
      heading: "6. Güç Kalitesi İzleme",
      sections: [
        {
          subheading: "6.1 Gerilim, frekans ve güç faktörü",
          paragraphs: [
            `ETO, şebeke güç kalitesini sürekli izler: gerilim toleransı sürekli ±%2.5 / geçici ±%3.5 (SOLAS), frekans toleransı ±%5 sürekli / ±%10 geçici. Düşük güç faktörü (cosφ < 0.8) reaktif yükün fazlalığını gösterir; alternatör akımını gereksiz yükler ve ısınma yaratır. ETO, kapasitör bankaları veya reaktif yük yönetimi ile güç faktörünü düzeltir.`,
          ],
          table: {
            caption: `Gemi Şebekesi Kabul Edilebilir Sınırlar`,
            headers: ["Parametre", "Sürekli", "Geçici", "Toparlanma"],
            rows: [
              ["Gerilim", "±2.5%", "±3.5%", "1.5 sn"],
              ["Frekans", "±5%", "±10%", "5 sn"],
              ["Güç faktörü", "≥0.8 ind.", "—", "—"],
              ["THD (gerilim)", "≤5% (≤8% tek harmonik)", "—", "—"],
            ],
          },
        },
        {
          subheading: "6.2 Harmonik analizi",
          paragraphs: [
            `VFD'ler, doğrultucular ve UPS'ler gibi non-linear yükler harmonik akımlar üretir; bunlar gerilim distorsiyonuna (THD), trafo ve kablo ısınmasına, nötr aşırı yüklenmesine ve röle hatalı tetiklemesine yol açar. ETO, power quality analyzer ile THD'yi ölçer (gerilim THD limiti tipik %5-8) ve gerekirse harmonic filter veya line reactor önerir.`,
            `Diesel-electric ve azipod tahrikli gemilerde harmonik yük çok yüksektir; active front-end drive'lar ve 12/18-puls doğrultucular harmoniği düşürmek için kullanılır. ETO bu sistemlerin filtre kapasitörlerini ve sigortalarını periyodik kontrol eder.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Harmonik kaynaklı trafo arızası",
              text: `Yüksek THD'li bir şebekede aydınlatma trafosu beklenen ömründen çok önce sargı yalıtım arızası verdi. Kök neden analizi, VFD harmoniklerinin trafoyu aşırı ısıttığını gösterdi; line reactor eklenince sorun çözüldü.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. Kablolama, Bara ve Bağlantı Bakımı",
      sections: [
        {
          subheading: "7.1 Termografi ve gevşek bağlantı tespiti",
          paragraphs: [
            `Switchboard içindeki gevşek bara bağlantıları ve terminaller direnç artışına, ısınmaya ve nihayetinde arc flash'a yol açabilir. ETO, termal kamera ile yük altındaki panoda hotspot taraması yapar; normalden 10-20°C üzeri fark gevşeklik veya aşırı yük işaretidir. Bara cıvataları kalibre tork anahtarı ile sıkılır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Termografi periyodu",
              text: `Ana switchboard ve büyük starter panoları için 6 ayda bir yük altında termografi taraması önerilir. Tespit edilen hotspot'lar enerjisizleştirilmiş durumda düzeltilir; ASLA enerjili bara üzerinde sıkma yapılmaz.`,
            },
          ],
        },
        {
          subheading: "7.2 İzolasyon ve toprak kaçağı izleme",
          paragraphs: [
            `Gemi şebekeleri genelde izole (IT) sistemdir; ilk toprak arızası işletimi durdurmaz ancak ikinci arıza kısa devreye dönüşür. ETO, insulation monitoring device (IMD) alarmlarını ciddiye alır, branch-by-branch test ile arızalı devreyi izole eder. Düzenli megger ölçümleri ile kademeli yalıtım bozulması erkenden yakalanır.`,
          ],
        },
      ],
    },
    {
      heading: "8. Enerji Verimliliği ve Çevre Bağlamı",
      sections: [
        {
          subheading: "8.1 Elektrik yükü yönetimi ve EEXI/CII",
          paragraphs: [
            `MARPOL Annex VI EEXI ve CII çerçevesinde, gemideki elektrik yükünün optimize edilmesi yakıt ve emisyon azaltımına katkı sağlar. ETO; gereksiz pompa/fan çalışmasını VFD ile kontrol eder, aydınlatmayı LED'e geçirir, generator'ları en verimli yük bölgesinde (%70-85) çalıştıracak şekilde PMS ayarını optimize eder.`,
          ],
        },
        {
          subheading: "8.2 Generator verimli yük bölgesi",
          paragraphs: [
            `Diesel generator'lar düşük yükte (örn. <%40) verimsiz çalışır, eksik yanma ve fouling (kurum) sorunları yaşar. ETO, PMS'i tek makineyle yüksek yükte çalışacak şekilde ayarlar; iki makineyi düşük yükte paralel tutmak hem yakıt israfı hem de motor sağlığı açısından sakıncalıdır.`,
          ],
        },
      ],
    },
    {
      heading: "9. Tipik Arıza Senaryoları ve Vaka Dersleri",
      sections: [
        {
          subheading: "9.1 Blackout ve restorasyon",
          paragraphs: [
            `Total blackout, gemi için en kritik elektriksel olaydır: tahrik, dümen ve seyir kaybı anlamına gelir. ETO ve makine ekibi, blackout recovery prosedürünü hızla uygular: emergency generator devrede mi teyidi, ana generator'ın yeniden start'ı, essential consumer'ların kademeli devreye alınması ve nedenin (yakıt, koruma trip, AVR arızası) tespiti. Düzenli blackout drill bu refleksi diri tutar.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Liman manevrasında blackout",
              text: `Bir konteyner gemisi, bow thruster start anında yetersiz güç teyidi ve preferential trip hatası nedeniyle dar suda blackout yaşadı. İnceleme PMS heavy consumer interlock ayarının yanlış olduğunu gösterdi. Ders: PMS interlock setpoint'leri saha testiyle doğrulanmalıdır.`,
            },
          ],
        },
        {
          subheading: "9.2 Reverse power ve AVR hunting",
          paragraphs: [
            `Paralel çalışmada bir makinenin governor'ı yavaş tepki verirse reverse power trip yaşanabilir. AVR'nin yanlış droop ayarı ise reaktif güç salınımına (hunting) ve gerilim dalgalanmasına yol açar. ETO, governor ve AVR ayarlarını saha testiyle ince ayar yaparak bu salınımları giderir.`,
          ],
        },
      ],
    },
    {
      heading: "10. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "10.1 ETO güç sistemi kontrol listesi",
          bullets: [
            `Generator koruma röleleri test edildi ve setpoint'ler kayıtlı mı?`,
            `AVR/excitation ve rotating diode sağlığı kontrol edildi mi?`,
            `Synchronizing paneli ve check-synch rölesi çalışıyor mu?`,
            `Load sharing (kW/kVAr) dengeli mi, PMS setpoint'leri doğru mu?`,
            `Emergency generator haftalık auto start testi yapıldı mı?`,
            `Preferential trip kademeleri test edildi mi?`,
            `Insulation monitoring (IMD) alarmları temiz mi, megger kayıtları güncel mi?`,
            `Switchboard termografi taraması ve bara tork kontrolü yapıldı mı?`,
            `Shore power interlock ve topraklama doğrulandı mı?`,
            `Güç kalitesi (gerilim/frekans/PF/THD) sınırlar içinde mi?`,
          ],
          paragraphs: [
            `ETO'nun güç sistemi yönetimindeki başarısı; bir blackout anında saniyeler içinde doğru kararı verebilmesi, koruma sistemlerinin sessizce ama güvenilir çalışması ve günlük disiplinli izleme ile arızaları büyümeden yakalamasıyla ölçülür. Güç sistemi, geminin kalbidir; ETO bu kalbin ritmini kusursuz tutmakla yükümlüdür.`,
          ],
        },
      ],
    },
  ],
};

export default content;
