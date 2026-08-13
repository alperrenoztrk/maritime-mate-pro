import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Acil durumlara katılım",
  roleSlug: "yagci-fitter",
  taskIndex: 5,
  estimatedPages: 25,
  intro: `Bir acil durumda makine dairesi personeli, gemiyi kurtaran ekibin omurgasıdır. Yağcı/Fitter; muster (toplanma) listesindeki rolünü, yangın partisi (fire party) ve sınır soğutma (boundary cooling) görevlerini, makine dairesi tahliye prosedürünü, blackout (elektrik kesintisi) ve flooding (su basması) müdahalesini, acil kapatma (emergency shutdown) butonlarının ve kaçış yollarının konumlarını ezbere bilmek zorundadır. Bu bölüm; acil durum organizasyonunu, makine dairesine özgü senaryoları ve Yağcı'nın her senaryodaki somut görevlerini adım adım açıklar.`,
  sources: [
    "SOLAS Chapter II-2 — Fire safety (yangın müdahalesi, sabit sistemler)",
    "SOLAS Chapter III — Life-saving appliances ve muster",
    "SOLAS III/19 & III/30 — Drills ve onboard training",
    "FSS Code — Fire Safety Systems (CO₂, foam, water mist)",
    "STCW Code A-VI/1 ve A-VI/3 — Fire prevention/fighting, advanced",
    "ISM Code — Emergency preparedness (Section 8)",
    "ICS Engine-Room Procedures Guide / Bridge & Engine emergency checklists",
    "Company SMS — Muster list, station bill ve emergency procedures",
  ],
  chapters: [
    {
      heading: "1. Acil Durum Organizasyonu ve Muster Listesi",
      lead: `Kriz anında düşünmek için zaman yoktur; herkes ne yapacağını önceden bilmek zorundadır. Muster listesi, bu hazırlığın belgesidir.`,
      sections: [
        {
          subheading: "1.1 Muster list ve istasyon görevleri",
          paragraphs: [
            `Muster list (station bill), her acil durum türünde (yangın, su basması, terk, adam denize) her kişinin nereye gideceğini ve ne yapacağını belirler. Yağcı/Fitter'ın görevi genelde fire party (yangın partisi) üyesi, boundary cooling, emergency generator/pump operasyonu veya kapatma valfleri gibi makine dairesi odaklıdır.`,
            `Yağcı, kendi muster station'ını, görev rolünü, taşıyacağı ekipmanı (örn. nozzle, hortum, SCBA) ve alternatif görevini (asıl görevli yoksa) ezbere bilir. Muster list panoda asılıdır ama gerçek hazırlık, kişinin görevini kâğıda bakmadan yapabilmesidir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS III — Muster list ve emergency instructions",
              text: `Muster list açıkça görünür yerlerde asılı olmalı; her gemiadamının acil durum görevi, muster station'ı ve alarm sinyalleri tanımlı olmalıdır. Yeni katılan personele bu bilgiler bindikten sonra ilk fırsatta (familiarization) verilir.`,
            },
          ],
        },
        {
          subheading: "1.2 Alarm sinyalleri ve haberleşme",
          paragraphs: [
            `Genel acil durum alarmı (general emergency alarm) yedi kısa + bir uzun düdük/zil sinyalidir; herkesi muster station'a çağırır. Yangın alarmı, abandon ship sinyali ve diğer sinyaller SMS'te tanımlıdır. Yağcı, makine dairesinin yüksek gürültüsünde alarmı duyabilmek için görsel alarm flaşörlerini ve telefon/UHF iletişimini de takip eder.`,
            `Acil durumda iletişim disiplinlidir: köprüüstü (komuta), makine kontrol odası ve sahadaki ekipler UHF/dahili telefonla koordine olur. Yağcı, gözlemlerini (yangının yeri, yayılma, duman) net ve kısa raporlar; panik yaratacak belirsiz mesaj vermez.`,
          ],
        },
      ],
    },
    {
      heading: "2. Makine Dairesi Yangını",
      sections: [
        {
          subheading: "2.1 En yaygın senaryo: yağ sızıntısı + sıcak yüzey",
          paragraphs: [
            `Makine dairesi yangınlarının çoğunluğu, basınçlı yakıt/yağ sızıntısının sıcak bir yüzeye (egzoz manifoldu, türbin gövdesi >220°C) püskürmesiyle başlar. İnce bir sis halinde sıçrayan yakıt anında tutuşur. Yağcı, sızıntıyı erken yakalayarak (rutin tur) yangını daha çıkmadan önler; ilk savunma budur.`,
            `Yangın çıktığında ilk adımlar: alarmı ver, yangının yerini bildir, mümkünse yakıt kaynağını kes (quick-closing valve, pompayı durdur), taşınabilir söndürücüyle ilk müdahaleyi yap (eğitimliysen ve güvenliyse). Yangın büyürse sabit sisteme geçiş için makine dairesi tahliye edilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Yakıt kaynağını kesmek esastır",
              text: `Yakıt beslemeyi kesmeden yangını söndürmeye çalışmak boşunadır; alev sürekli beslenir. Quick-closing valve'leri ve emergency pump stop'ları ezbere bilin. Yakıtı kesmek, çoğu makine dairesi yangınını söndürmenin ilk ve en kritik adımıdır.`,
            },
          ],
        },
        {
          subheading: "2.2 Taşınabilir söndürücü ve hortum müdahalesi",
          paragraphs: [
            `İlk müdahalede doğru söndürücü seçilir: yağ/akaryakıt yangınında (B sınıfı) köpük veya kuru kimyevi toz, elektrik yangınında (C/E) CO₂ veya kuru toz kullanılır; su sıvı yakıt yangınına doğrudan püskürtülmez (alevi yayar). Yağcı, söndürücü tiplerini, menzilini ve kullanımını (PASS: pull-aim-squeeze-sweep) bilir.`,
            `Yangın büyükse yangın hortumuyla müdahale edilir; fog (sis) ayarı hem koruma hem söndürme sağlar. Yangın partisi ikişerli ilerler, geri çekilme yolu açık tutulur ve sıcaklık/duman arttığında geri çekilinir. SCBA olmadan dumanlı ortama girilmez.`,
          ],
          bullets: [
            `Alarm ver + yangın yerini bildir`,
            `Yakıt/enerji kaynağını kes (QCV, pompa stop)`,
            `Doğru söndürücü ile ilk müdahale (B sınıfı için köpük/toz)`,
            `SCBA tak, ikişerli ilerle, geri çekilme yolunu koru`,
            `Büyürse: tahliye + sabit sistem hazırlığı`,
          ],
        },
      ],
    },
    {
      heading: "3. Sabit Yangın Söndürme Sistemleri (CO₂ / Su Sisi / Köpük)",
      sections: [
        {
          subheading: "3.1 CO₂ total flooding sistemi",
          paragraphs: [
            `Makine dairesi yangını kontrol edilemezse, sabit CO₂ total flooding sistemi devreye sokulur. Bu sistem oksijeni boğarak yangını söndürür; ancak CO₂ insan için öldürücüdür. Bu yüzden salınmadan önce makine dairesi tamamen tahliye edilir, personel sayımı (head count) yapılır ve tüm açıklıklar (ventilasyon flap, kapı) kapatılır.`,
            `CO₂ salımı iki kademeli güvenlik kontrolü gerektirir (önce alarm/gecikme, sonra release); yetkili kişi (genelde Baş Mühendis/Kaptan onayı) komutu verir. Salımdan sonra makine dairesi belli süre kapalı tutulur (re-ignition önleme) ve içeri yalnızca SCBA ve gaz testiyle girilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "CO₂ salımından önce tam tahliye + head count",
              text: `CO₂ ortamdaki oksijeni boğar; içeride kalan kişi saniyeler içinde bilincini kaybeder. Salım öncesi makine dairesinin BOŞ olduğu head count ile doğrulanmadan sistem ASLA çalıştırılmaz. Bu, hayatların bağlı olduğu mutlak bir kuraldır.`,
            },
          ],
        },
        {
          subheading: "3.2 Su sisi (water mist) ve yerel köpük sistemleri",
          paragraphs: [
            `Modern gemilerde su sisi (water mist) ve yerel uygulama köpük (local application foam) sistemleri, makineyi tahliye etmeden ME/AE/incinerator çevresindeki yangına müdahale eder. Su sisi, hem soğutma hem oksijen seyreltme etkisiyle çalışır ve CO₂'ye göre daha az tehlikelidir. Yağcı, bu sistemlerin manuel tetikleme noktalarını ve kapsadığı bölgeleri bilir.`,
          ],
          table: {
            caption: `Yangın Söndürme Ortamı Seçimi (Makine Dairesi)`,
            headers: ["Yangın Türü", "Uygun Ortam", "Kaçınılacak", "Not"],
            rows: [
              ["Yağ/yakıt (B)", "Köpük, KKT, su sisi", "Düz su jeti", "Yakıt kaynağı kesilmeli"],
              ["Elektrik (C/E)", "CO₂, KKT", "Su (çarpma riski)", "Önce enerji kes"],
              ["Sabit boğma", "CO₂ total flooding", "—", "Tam tahliye + head count şart"],
              ["Yerel/erken", "Su sisi, lokal köpük", "—", "Makine dairesi boşaltılmadan"],
            ],
          },
        },
      ],
    },
    {
      heading: "4. Sınır Soğutma (Boundary Cooling)",
      sections: [
        {
          subheading: "4.1 Boundary cooling görevi",
          paragraphs: [
            `Yangın bir bölmede kontrol altına alınmaya çalışılırken, komşu bölmelerin sınır perdeleri (bulkhead) ve güverteleri ısınır; bu ısı yangının yayılmasına ve komşu alandaki yanıcı maddelerin tutuşmasına yol açabilir. Boundary cooling, yangının olduğu bölmeyi çevreleyen yüzeyleri su püskürterek soğutma görevidir.`,
            `Yağcı, muster list'te boundary cooling görevindeyse, yangın bölmesine komşu güverte/perdeleri hortumla soğutur; buharlaşan su yüzeyin aşırı ısınmadığını gösterir. Su birikiminin (free surface) stabiliteyi bozmaması ve drenajın açık olması için aşırı su kullanımından kaçınılır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Soğutmada su birikimine dikkat",
              text: `Boundary cooling ve yangın söndürmede biriken su, geminin stabilitesini bozabilir (free surface effect) ve list/trim yaratabilir. Drenajı açık tutun, gereğinden fazla su basmayın. Yangını söndürürken gemiyi batırmamak da bir denge işidir.`,
            },
          ],
        },
        {
          subheading: "4.2 Geri çekilme ve sınır kontrolü",
          paragraphs: [
            `Yangının kontrol edildiği veya yayıldığı sürekli değerlendirilir. Sınır perdesi el ile dokunulamayacak kadar ısınıyorsa yangın komşuya geçme riskindedir; soğutma yoğunlaştırılır veya bölge tahliye edilir. Boundary cooling ekibi, ana yangın ekibiyle koordineli çalışır ve durumu komuta merkezine raporlar.`,
          ],
        },
      ],
    },
    {
      heading: "5. Makine Dairesi Tahliyesi ve Acil Kapatmalar",
      sections: [
        {
          subheading: "5.1 Emergency shutdown ve quick-closing valve",
          paragraphs: [
            `Makine dairesi tahliye/CO₂ salımı öncesi, uzaktan kumandalı acil kapatmalar devreye sokulur: yakıt servis/settling tanklarının quick-closing valve'leri kapatılır (yakıt beslemeyi keser), yakıt transfer/booster pompaları, ventilasyon fanları ve purifier'lar uzaktan durdurulur, ventilasyon flap/damper'ları kapatılır. Bunlar genelde makine dairesi dışındaki bir panel/kutudan yapılır.`,
            `Yağcı, bu acil kapatma noktalarının (emergency stop ve QCV kontrol kutuları) yerini ezbere bilir ve karanlıkta/dumanda bulabilir. Bu kapatmalar, yangını yakıttan ve havadan keserek sabit sistemin etkili olmasını sağlar.`,
          ],
          bullets: [
            `Yakıt QCV'leri kapat (servis/settling/storage)`,
            `Yakıt transfer/booster pompalarını durdur`,
            `Ventilasyon fanlarını durdur, flap/damper'ları kapat`,
            `Purifier ve incinerator'ı durdur`,
            `Tüm açıklıkları kapat (CO₂ öncesi)`,
          ],
        },
        {
          subheading: "5.2 Kaçış yolları ve tahliye disiplini",
          paragraphs: [
            `Makine dairesinin en az iki ayrı kaçış yolu vardır; en az biri korunaklı (escape trunk). Yağcı, normal ve alternatif kaçış yolunu, EEBD (Emergency Escape Breathing Device) konumlarını ve acil aydınlatmayı ezbere bilir. EEBD, dumanlı ortamdan kaçışta ~10-15 dakika solunum sağlar; söndürme için değil, kaçış için kullanılır.`,
            `Tahliye sırasında panik değil disiplin esastır: en kısa güvenli yoldan çıkılır, geride kimse kalmadığı doğrulanır (head count), kapılar arkadan kapatılır. Yağcı, tahliye yolu üzerindeki engelleri (housekeeping) normal zamanda temizleyerek bu anı önceden kolaylaştırır.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "EEBD — Kaçış içindir, söndürme için değil",
              text: `Emergency Escape Breathing Device yalnızca dumanlı bölgeden güvenli kaçış için kısa süreli hava sağlar. Yangınla mücadele veya kapalı alan girişinde kullanılmaz; o görevler için SCBA gerekir. EEBD'lerin yerini ve takma şeklini herkes bilmelidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Blackout (Elektrik Kesintisi) Müdahalesi",
      sections: [
        {
          subheading: "6.1 Blackout anı ve emergency generator",
          paragraphs: [
            `Blackout, tüm jeneratörlerin devre dışı kalmasıyla geminin elektriğini kaybetmesidir; ana makine durur, dümen ve pompalar çalışmaz, gemi seyir kontrolünü kaybeder. Bu çok tehlikeli bir durumdur, özellikle dar suda/manevrada. Emergency generator otomatik devreye girerek kritik tüketicileri (dümen, acil aydınlatma, haberleşme) besler.`,
            `Yağcı, blackout anında sahada gözlem yapar ve mühendise gerçek zamanlı bilgi verir: hangi jeneratör attı, alarm ne, yakıt/yağ basıncı durumu. Emergency generator'ın devreye girdiğini ve emergency switchboard'ın enerjilendiğini doğrular.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS II-1 — Acil güç kaynağı",
              text: `Gemilerde, ana güç kaybında otomatik devreye giren bir emergency generator ve emergency switchboard bulunmalıdır; dümen, acil aydınlatma, haberleşme ve seyir fenerleri gibi kritik sistemleri besler. Bu sistemin düzenli test edilmesi zorunludur.`,
            },
          ],
        },
        {
          subheading: "6.2 Blackout recovery (toparlanma) desteği",
          paragraphs: [
            `Blackout recovery, jeneratörleri ve ana makineyi kademeli devreye alma sürecidir. Mühendis, standby jeneratörü başlatır, busbar'ı enerjiler ve tüketicileri sırayla yükler; ana makine yeniden çalıştırılır. Yağcı; pompaların, yağlama ve soğutmanın yeniden kurulmasında saha desteği verir, yakıt/start havası basıncını izler ve mühendisin talimatlarını uygular.`,
            `Recovery sırasında start havası tüplerinin yeterliliği kritiktir; tekrarlayan başlatma denemeleri start havasını tüketir. Yağcı, hava kompresörlerinin ve hava basıncının durumunu izler. Toparlanma sırasında her aksiyon sırasıyla ve mühendis komutuyla yapılır.`,
          ],
        },
      ],
    },
    {
      heading: "7. Su Basması (Flooding) ve Sintine Acil Durumu",
      sections: [
        {
          subheading: "7.1 Flooding kaynağı ve ilk müdahale",
          paragraphs: [
            `Makine dairesine su girişi; deniz suyu hattı patlaması, sea chest/valf arızası, gövde hasarı, soğutma hattı çatlağı veya geri akış (back-flooding) kaynaklı olabilir. Sintine yüksek seviye alarmı erken uyarı verir. Yağcı, su girişini fark ettiğinde derhal alarm verir, kaynağı (hangi valf/hat) belirlemeye çalışır ve mümkünse izole eder.`,
            `İlk müdahale: kaynağı kes/izole et (valf kapat), bilge/balast pompalarını devreye al, gerekirse emergency bilge suction (ana deniz suyu pompasının doğrudan sintineden emiş yapması) kullan. Su seviyesi elektrik panolarına/makinelere ulaşmadan kontrol altına alınmaya çalışılır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Emergency bilge suction'ı bil",
              text: `Ağır su basmasında ana deniz suyu sirkülasyon pompasının emergency bilge suction valfi açılarak büyük debide su basılabilir. Bu valfin yeri ve kullanımı ezbere bilinmelidir; dakikalar geminin batıp batmamasını belirleyebilir.`,
            },
          ],
        },
        {
          subheading: "7.2 Stabilite ve önceliklendirme",
          paragraphs: [
            `Su basması hem makine kaybı hem stabilite kaybı riskidir; serbest su yüzeyi (free surface) GM'i düşürür ve gemiyi devirebilir. Bu yüzden flooding aynı anda hem teknik (su atma) hem stabilite (köprüüstü ile koordinasyon) olarak yönetilir. Yağcı, su seviyesini ve atma debisini mühendise sürekli raporlar.`,
          ],
        },
      ],
    },
    {
      heading: "8. Diğer Acil Roller ve Yardımcı Görevler",
      sections: [
        {
          subheading: "8.1 Emergency fire pump ve emergency steering",
          paragraphs: [
            `Makine dairesi yangınında ana yangın pompası kullanılamayabilir; bu durumda makine dairesi dışında, kendi güç kaynağına sahip emergency fire pump devreye sokulur ve yangın hattını basınçlandırır. Yağcı, emergency fire pump'ın yerini, çalıştırma prosedürünü ve emiş hattını bilir.`,
            `Dümen sistemi arızasında emergency steering (acil dümen) prosedürü uygulanır; dümen makinesi dairesinde manuel/yerel kumandayla dümen kontrol edilir ve köprüüstüyle telefon/sinyal üzerinden koordine olunur. Yağcı, bu pozisyondaki görevini ve emergency steering drill'lerini bilir.`,
          ],
        },
        {
          subheading: "8.2 Abandon ship ve adam denize düştü desteği",
          paragraphs: [
            `Terk gemi (abandon ship) durumunda Yağcı, muster list'teki rolüne göre filika/sal hazırlığına, taşınabilir ekipman taşınmasına veya head count'a destek olur. Adam denize düştü (man overboard) durumunda makine, manevra için hazır tutulur; Yağcı makine dairesinde manevra desteğindeki görevini yerine getirir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka — Hızlı yakıt kesimi yangını sınırladı",
              text: `Bir gemide türbin gövdesine yakıt sızıntısı yangın başlattığında, sahadaki Yağcı saniyeler içinde alarm verip quick-closing valve'leri kapatmış ve booster pompasını durdurmuştur. Yakıt beslemesi kesildiği için yangın hızla küçülmüş, taşınabilir köpük söndürücüyle kontrol altına alınmış; CO₂ salımına ve büyük hasara gerek kalmamıştır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "9. Tatbikatlar (Drills) ve Hazırlık",
      sections: [
        {
          subheading: "9.1 Düzenli drill ve gerçekçilik",
          paragraphs: [
            `Acil durum becerileri ancak düzenli, gerçekçi tatbikatlarla canlı kalır. SOLAS III/19 gereği yangın ve abandon ship drill'leri ayda en az bir kez (III/19.3.2), kapalı alan giriş ve kurtarma drill'i ise en az iki ayda bir (III/19.3.3) yapılır. "Kâğıt üzerinde" yapılan, herkesin sırayla beklediği drill işe yaramaz; gerçek koşulları (duman makinesi, karartma, gerçek ekipman) taklit eden drill öğretir.`,
            `Yağcı, her drill'i kendi görevini gerçek bir acil durummuş gibi prova etme fırsatı olarak görür: ekipmanı bulma süresi, SCBA takma, valf kapatma, kaçış yolu. Drill sonrası debrief'te çıkan eksikler (ekipman arızası, görev belirsizliği) raporlanır ve düzeltilir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS III/19 — Drills ve eğitim",
              text: `Gemiadamları, acil durum ekipmanını kullanma ve görevlerini yerine getirme konusunda düzenli tatbikatlarla eğitilir. Yangın ve terk tatbikatları ayda en az bir kez yapılır; gemiye katılan personele can kurtarma ve yangın donanımı eğitimi en geç iki hafta içinde verilir (SOLAS III/19.4.1). Göreve başlamadan önceki emniyet familiarizasyonu ise STCW ve ISM kapsamındadır.`,
            },
          ],
        },
        {
          subheading: "9.2 Ekipman bilgisi ve familiarization",
          paragraphs: [
            `Acil durumda kullanılacak ekipmanın yeri ve kullanımı barış zamanında öğrenilir: SCBA, EEBD, taşınabilir söndürücüler, yangın istasyonları, emergency stop ve QCV kutuları, kaçış yolları, emergency generator/pump. Yeni katılan Yağcı, gemiye bindiğinde ilk fırsatta bu noktaları gezerek öğrenir (familiarization) ve kaydı tutulur.`,
          ],
        },
      ],
    },
    {
      heading: "10. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "10.1 Yağcı/Fitter'ın acil durum checklist'i",
          bullets: [
            `Muster list'teki görevim, station'ım ve alternatif görevim biliniyor mu?`,
            `Alarm sinyalleri ve haberleşme prosedürü net mi?`,
            `Yangında: yakıt kaynağını kesme (QCV/pompa stop) noktaları ezbere mi?`,
            `Doğru söndürücü seçimi (B sınıfı yağ yangını) biliniyor mu?`,
            `CO₂ salımı öncesi tam tahliye + head count kuralı içselleşti mi?`,
            `Boundary cooling görevinde su birikimi/stabilite dengesi gözetiliyor mu?`,
            `Kaçış yolları, EEBD ve emergency aydınlatma konumları biliniyor mu?`,
            `Blackout/flooding'de saha gözlem ve mühendis raporlama rolü net mi?`,
            `Emergency generator, fire pump ve steering konumu/prosedürü biliniyor mu?`,
            `Drill'lere aktif katılıyor, eksikler raporlanıyor mu?`,
          ],
          paragraphs: [
            `Acil durumda Yağcı/Fitter'ın değeri, paniğe değil prosedüre dayanmasındadır. Yakıt kaynağını kesmek, doğru söndürücüyü seçmek, tahliyeyi disiplinle yapmak ve mühendise net rapor vermek; küçük bir olayı felakete dönüşmeden durdurur. En iyi acil durum müdahalesi, yangını çıkmadan önleyen rutin tur; en iyi tahliye ise normal zamanda açık tutulan kaçış yoludur. Hazırlık, kriz anında değil çok önce kazanılır.`,
          ],
        },
      ],
    },
  ],
};

export default content;
