import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Seyir emniyetinin nihai sorumluluğu",
  roleSlug: "kaptan",
  taskIndex: 0,
  estimatedPages: 26,
  intro: `Kaptanın seyir emniyetine ilişkin sorumluluğu, denizcilik mevzuatının en eski ve en açık prensiplerinden biridir. SOLAS Chapter V/34 hükümleri, geminin emniyetli seyrine dair nihai kararın kaptana ait olduğunu söyler ve bu yetkinin hiçbir ticari, idari veya kıyı kaynaklı baskı tarafından kısıtlanamayacağını teyit eder. Bu bölüm, "nihai sorumluluk" kavramını yalnızca soyut bir hukuki ilke olarak değil; passage planning, köprüüstü disiplini, kritik karar noktaları, kılavuz kaptanla ilişki, weather routing kararları, abort point yönetimi ve "overriding authority" hakkının pratik kullanımı bağlamında somut olarak ele alır.`,
  sources: [
    "SOLAS Chapter V — Safety of Navigation (Reg. 34, 34-1)",
    "IMO Resolution A.893(21) — Guidelines for Voyage Planning",
    "ISM Code (IMO Resolution A.741(18) ve değişiklikleri)",
    "STCW 2010 (Manila Amendments) — Bridge Resource Management",
    "MSC.1/Circ.1503 — ECDIS Guidance for Good Practice",
    "Bridge Procedures Guide (ICS, 5th Edition)",
    "MAIB ve TSB kaza raporları (Costa Concordia, El Faro, MOL Comfort vb.)",
  ],
  chapters: [
    {
      heading: "1. Hukuki Çerçeve: Nihai Sorumluluğun Kökeni",
      lead: `Kaptanın seyir emniyetine ilişkin yetkisi tek bir maddeden değil, birbirini tamamlayan çok katmanlı bir mevzuat bütününden doğar. Bu bölüm, bu katmanları açıkça ayırır.`,
      sections: [
        {
          subheading: "1.1 SOLAS Chapter V/34 — Safe Navigation",
          paragraphs: [
            `SOLAS V/34, geminin sefere çıkmadan önce kaptanın "passage plan"ı kontrol etmesi ve onaylaması gerektiğini açıkça söyler. Plan; berth-to-berth mantığıyla hazırlanmalı; rota seçimi, derinlik yeterliliği, tahmini hava ve akıntı, trafik yoğunluğu, demir yerleri, abort points ve contingency anchorage'lar bu planın ayrılmaz parçaları olarak yer almalıdır. Kaptanın bu planı sadece "imzalaması" yeterli değildir; planın gemi tipi, sefer karakteri ve mürettebat yetkinliğine uygun olduğunu fiilen gözden geçirmesi beklenir.`,
            `V/34-1 maddesi ise kaptanın seyir emniyetine ilişkin kararlarının "professional judgement"a dayandığını ve hiçbir şirket, charterer ya da üçüncü tarafın bu kararı engelleyici biçimde davranamayacağını açıkça düzenler. Pratikte bu hüküm, "overriding authority" olarak anılır ve ISM Code madde 5.2'de de aynen tekrarlanır. ISM iç denetimleri, şirketin kaptana bu yetkiyi engellemediğine dair somut kanıt arar.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS V/34-1",
              text: `Kaptan, gemi ve mürettebatın güvenliğini, koruma seviyesini ve deniz çevresinin korunmasını gerektiren herhangi bir durumda, profesyonel kanaatine göre seyir veya işletim açısından gerekli gördüğü her kararı almakta serbest bırakılır.`,
            },
          ],
        },
        {
          subheading: "1.2 ISM Code madde 5: Master's Responsibility and Authority",
          paragraphs: [
            `ISM Code'un 5. maddesi, şirket SMS'inde kaptanın görevlerinin açıkça tanımlanmasını, kaptana SMS'i sahada uygulama ve sapmaları şirkete raporlama yetkisi verilmesini ve "overriding authority"nin yazılı olarak teyit edilmesini şart koşar. Bir gemiye yeni katılan her kaptan, şirketin Master's Standing Orders ve Master's Review prosedürlerini imzalı olarak gemiye taşır; bu belgeler iç denetimlerde aranır.`,
            `Master's Review, ISM'in kalp atışıdır. Yılda en az bir kez (genelde 6 ayda bir) kaptan, gemideki SMS uygulamasının etkinliğini değerlendirir, eksiklikleri ve iyileştirme önerilerini yazılı olarak şirkete iletir. Bu raporlar DPA (Designated Person Ashore) tarafından incelenir ve şirket yönetim gözden geçirme toplantısının (management review) girdisidir.`,
          ],
        },
        {
          subheading: "1.3 STCW 2010 ve Köprüüstü Kaynak Yönetimi (BRM)",
          paragraphs: [
            `Manila değişiklikleriyle birlikte STCW Tablo A-II/1 ve A-II/2, kaptan ve zabitlere Bridge Resource Management ve Bridge Team Management yetkinliklerini zorunlu kıldı. Bu yetkinlikler salt teorik bilgi değil; hiyerarşinin emniyeti baltalamadan korunması, "challenge & response" kültürü, situational awareness paylaşımı ve human factor riskleri konusunda davranışsal yeterliliklerdir.`,
            `Köprüüstü kaynak yönetiminin başarısız olduğu birçok kazada (Royal Majesty 1995, Sea Empress 1996, Costa Concordia 2012) ortak motif şudur: vardiya zabiti ya da pilot şüphe duymuş ama kaptanın otoritesi nedeniyle sesini yükseltmemiştir. Modern kaptan, hiyerarşik gücünü kullanırken aynı zamanda "challenge"ı teşvik eden bir köprüüstü kültürü kurmak zorundadır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Otorite gradient'i",
              text: `Köprüüstünde "authority gradient" (otorite eğimi) çok dikse, junior zabit veya pilot kaptanın hatasını söyleyemez. Çok yatıksa, komuta zinciri kaybolur. İdeal kaptan, eğimi kriz anında dikleştiren, normal seyirde yatık tutan kişidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Passage Planning: Berth-to-Berth Yaklaşım",
      lead: `Passage plan, IMO Res. A.893(21) çerçevesinde dört aşamadan oluşur: appraisal, planning, execution, monitoring. Kaptanın sorumluluğu her dört aşamayı da kapsar.`,
      sections: [
        {
          subheading: "2.1 Appraisal — Bilgi toplama aşaması",
          paragraphs: [
            `Appraisal, sefere ait tüm verilerin toplanması ve değerlendirilmesidir. Yayınlar (Sailing Directions, List of Lights, Tide Tables, Routeing Charts), elektronik haritalar (ENC) ve gerekli T&P NM düzeltmeleri kontrol edilir. Hava tahminleri (uzun ve kısa vadeli), buz raporları, korsanlık bölgeleri (HRA, VRA), savaş risk bölgeleri ve sağlık otoritesi uyarıları (yellow fever, sıtma, COVID benzeri salgınlar) bu aşamada derlenir.`,
            `Kaptanın bu aşamadaki rolü, 2. Zabit'in (genelde navigation officer) hazırladığı appraisal'ı eleştirel okumaktır. Charterer'in talep ettiği rota ile mevsimsel emniyet rotasının çatıştığı noktaları bulmak, bunları şirkete ve charterer'e gerekçeli olarak bildirmek kaptanın görevidir. Örneğin Kuzey Atlantik kışında "great circle" ekonomik görünebilir ama sentinel buoy verileri ve weather routing servisi (örn. WNI, AWT) ışığında daha güneye sapmak gerekebilir.`,
          ],
          bullets: [
            `ENC kapsamı (sefer boyunca tüm bölgeler ENC mevcut mu? RNC fallback gerekiyor mu?)`,
            `Squat hesabı için planlanan hız ve UKC marjları`,
            `No-go area'ların tanımı (derinlik, korsan, askeri vb.)`,
            `Pilotaj noktaları, pilot boarding pozisyonları ve VHF kanalları`,
            `Acil durumda güvenli sığınak (port of refuge) listesi`,
          ],
        },
        {
          subheading: "2.2 Planning — Rotanın çizilmesi ve kritik noktalar",
          paragraphs: [
            `Planning aşamasında waypoint'ler belirlenir, course alteration noktaları, parallel index hatları, contour following hatları ve XTD (cross-track distance) limitleri tanımlanır. Kaptanın özellikle dikkat etmesi gereken üç kritik nokta vardır: abort point, contingency anchorage ve point of no return.`,
            `Abort point, geminin manevrayı iptal edip emniyetli sulara çekilebileceği son noktadır. Daha ileri gidildiğinde manevra geri alınamaz hale gelir. Point of no return ise yakıt, gel-git veya hava penceresi nedeniyle artık geriye dönmenin mümkün olmadığı noktadır. Bu noktaların plan üzerinde açıkça işaretlenmemesi, MAIB raporlarında en sık tekrarlanan bulgulardan biridir.`,
          ],
          table: {
            caption: `UKC (Under-Keel Clearance) Politikası — Tipik Şirket Standartları`,
            headers: ["Bölge", "Min. UKC", "Notlar"],
            rows: [
              ["Açık deniz, tablalı dip", "%20 draft veya 5 m (büyük olan)", "Squat dahil"],
              ["Kıyısal sular", "%15 draft veya 2.0 m", "Akıntı + dalga + squat"],
              ["Kanallar / nehirler", "%10 draft veya 0.6 m", "Pilot ve VTS koordinasyonu"],
              ["Bağlama / iskele yanaşma", "0.3 m", "Squat ihmal edilmez"],
            ],
          },
        },
        {
          subheading: "2.3 Execution — Planın uygulamaya konması",
          paragraphs: [
            `Execution, planın gerçek seyir koşullarında uygulanmasıdır. Hava değişiklikleri, trafik durumu veya VTS talimatları nedeniyle plan üzerinde küçük revizyonlar gerekebilir. Bu revizyonlar mutlaka log book'a ve passage plan üzerine işlenir; kaptanın inisiyatifi olmadan vardiya zabiti, planın temel mantığını değiştiremez.`,
            `Yakıt yönetimi (slow steaming, eco speed), CII performansı ve charterer'a karşı taahhüt edilen ETA'nın aynı anda yönetilmesi, modern kaptanın günlük matematiğidir. Hava kötüleşiyorsa hız düşürmek, daha güvenli rotaya kaymak ya da heave-to gibi taktiksel kararlar ticari ETA'yı etkiler; ama emniyet kararı her zaman önceliklidir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Pratik örnek — El Faro davası",
              text: `2015 yılında kaptan, Joaquin kasırgasının rotasına yaklaşan bir rotada ısrar etti. Köprüüstündeki junior zabitler endişelerini açıkça ifade edemedi. Gemi battı ve 33 mürettebat hayatını kaybetti. NTSB raporu, "challenge culture" eksikliğini ve kaptanın situational awareness kaybını başlıca neden olarak gösterdi. Bu vaka modern BRM eğitimlerinin temel ders çalışmasıdır.`,
            },
          ],
        },
        {
          subheading: "2.4 Monitoring — Sürekli durum farkındalığı",
          paragraphs: [
            `Monitoring, gerçek pozisyonun planlanan rota ile karşılaştırılması ve sapmaların erkenden fark edilmesidir. ECDIS'te route monitoring alarmları, XTD alarmları, anti-grounding ve depth alarmları doğru ayarlanmalıdır. Vardiya değişimlerinde mutlaka durum brifingi yapılır; "I have the conn" ve "you have the conn" gibi standart fraseolojiler kullanılır.`,
            `Kaptan kendisini köprüüstüne çağırma kriterlerini Master's Standing Orders'a açıkça yazar. Tipik kriterler: görüş 2 mil altına düşerse, CPA 1 mil altına yaklaşırsa, ECDIS arızalanırsa, kötü hava beklenenden farklı seyrederse, herhangi bir cihaz arızasında, dar boğaz öncesi, kılavuz kaptan beklentisinden önce vb. Bu liste her gemi ve sefer için özelleştirilmelidir.`,
          ],
        },
      ],
    },
    {
      heading: "3. Köprüüstü Komutası ve Kritik Geçişler",
      lead: `Bu bölüm, kaptanın köprüüstünde fiilen ne zaman ve nasıl komuta alması gerektiğini, hangi geçişlerde "I have the conn" demesi gerektiğini ele alır.`,
      sections: [
        {
          subheading: "3.1 Manevra ve dar boğaz disiplini",
          paragraphs: [
            `Boğaz, kanal ve dar geçişlerde (Çanakkale-İstanbul Boğazları, Süveyş, Panama, Singapur Boğazı, Dover Strait) kaptan köprüüstünde bizzat bulunur ve genelde komutayı doğrudan üstlenir. Köprüüstü ekibi standart ve tekrarlı; helmsman direksiyonda (otopilot kapalı), 2. Zabit pozisyon takibi, 3. Zabit lookout veya assist ve kaptan komutada. Pilot varsa tavsiyeleri değerlendirilir; kaptanın komutası sürer.`,
            `Manevra sırasında "double watchkeeping" prensibi uygulanır: pozisyon hem ECDIS, hem radar parallel index, hem de gözle bearing alma yoluyla kontrol edilir. Tek bir cihaza güvenmek MAIB raporlarında "single point failure" olarak işaretlenir.`,
          ],
        },
        {
          subheading: "3.2 Sınırlı görüş, gece seyir ve ağır hava",
          paragraphs: [
            `Sınırlı görüş (görüş < 2 mil) anında COLREG Rule 19 kapsamında özel önlemler devreye girer: emniyetli hız, sis düdüğü, makine hazır, ekstra lookout. Kaptan derhal köprüüstüne çağrılır. Radar ARPA çalıştırma, hedef takip kalitesi (true vs relative motion), sea clutter ve rain clutter ayarları kaptanın kontrolü altında olmalıdır.`,
            `Ağır havada (Beaufort 8 ve üzeri) gemi yönetimi taktikleri değişir: heave-to, scudding, riding it out, shelter arama. Kaptan; rolling period, parametric rolling riski ve synchronous rolling riskini değerlendirir. GM değeri ve dalga periyoduna göre rota ve hız değişikliği yapar.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Parametric rolling alarm değerleri",
              text: `Doğal yalpa periyodu dalga karşılaşma periyodunun 2 katına yakınsa, parametric rolling riski yüksektir. Container gemilerinde ve ro-ro'larda büyük yük kayıplarına neden olmuştur. Kaptan, encounter periyodunu hesaplayıp baş veya kıç alarak periyodu değiştirir.`,
            },
          ],
        },
        {
          subheading: "3.3 Trafik yoğun bölgeler ve TSS geçişleri",
          paragraphs: [
            `Traffic Separation Schemes (TSS), COLREG Rule 10 kapsamında düzenlenir. Geminin ana akıntı yönünde olması, lane içinde mümkün olduğunca uzakta crossing yapmaması ve kıyıyla TSS arasındaki inshore traffic zone'a yalnızca <20 m gemiler veya yerel trafiğin girmesi temel kuraldır. Dover, Ouessant ve Bosporus gibi yoğun TSS'lerde kaptan bizzat komuta alır.`,
          ],
        },
      ],
    },
    {
      heading: "4. Kılavuz Kaptan (Pilot) ile Çalışma",
      sections: [
        {
          subheading: "4.1 Master-Pilot Exchange (MPX)",
          paragraphs: [
            `Pilot köprüüstüne çıkar çıkmaz Master-Pilot Exchange kartı doldurulur: pilot rotası, hız profili, romorkör sayısı/ayarı, tug position, beklenen UKC, hava ve akıntı, contingency planı ve haberleşme kanalları teyit edilir. Bu kart sadece bürokratik bir form değil, ortak situational awareness'in yazılı kanıtıdır.`,
            `Kaptan komutayı pilota devretmez. Pilotun tavsiyeleri profesyonel olarak değerlendirilir; emniyete aykırı tavsiyeler reddedilir. Pilot, gemiyi tanımayan bir danışmandır; kaptan ise gemiyi en iyi tanıyan kişi.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Pilotun reddedilmesi",
              text: `Pilotun açıkça emniyetsiz bir manevra istemesi durumunda kaptan tavsiyeyi reddeder, log'a kaydeder ve şirkete bildirir. Costa Concordia davasında kaptan-pilot ilişkisi kötü yönetimin örneği olarak kayıtlara geçti.`,
            },
          ],
        },
        {
          subheading: "4.2 Pilot ladder güvenliği — IMO Res. A.1045(27)",
          paragraphs: [
            `Pilot ladder hazırlığı SOLAS V/23 ve IMO Res. A.1045(27) ile düzenlenir. Basamak sayısı, halat kalınlığı, manrope, magnet yerine sabit deniz tarafına bağlama, intermediate platform, lighting, life buoy with self-igniting light ve responsible officer (genelde 3. veya 4. zabit) hazırlığın temel unsurlarıdır. Hatalı pilot ladder, pilot ölümlerinin başlıca nedenidir ve PSC denetiminde Code 30 detention sebebidir.`,
          ],
        },
      ],
    },
    {
      heading: "5. Weather Routing ve Iklim Riskleri",
      sections: [
        {
          subheading: "5.1 Weather routing servisleri ve kaptanın değerlendirmesi",
          paragraphs: [
            `Weather routing servisleri (örn. AWT, WNI, StormGeo) günlük rota tavsiyeleri sunar. Bu tavsiyeler bağlayıcı değildir; kaptan değerlendirir, kabul eder veya reddeder. Reddetme kararı her zaman gerekçeli olarak log'a yazılır. Charterer ile yapılan sözleşmede "weather routing follow" maddesi varsa, sapma şirket ve charterer'e bildirilir.`,
            `Kaptanın yorum becerisi, ham sinoptik hava verisini (500 hPa pattern, jet stream, polar vortex pozisyonu) gemi performansına çevirebilmektir. Modern köprüüstü ECDIS overlay olarak hava ve dalga verilerini gösterir; ancak veriler 6 saatte bir güncellenir ve mikro ölçekte yanılabilir.`,
          ],
        },
        {
          subheading: "5.2 Tropikal siklon yönetimi",
          paragraphs: [
            `Tropik siklon yönetiminin temel kuralı "Bowditch — Avoiding the Storm" bölümünde özetlenmiştir: kuzey yarımkürede sağ yarı (dangerous semicircle) tehlikeli, sol yarı (navigable semicircle) görece güvenlidir. Güney yarımkürede tam tersi. Kaptan; siklon merkezini bulmak için Buys Ballot kuralını, basınç düşüş hızını, dalga geliş yönünü ve cloud signature'ı kullanır.`,
            `Modern uydulardan elde edilen besttrack verileri kaptanın işini kolaylaştırır ama 72 saatten uzun tahminlerde belirsizlik yüksektir. Kaptan "1-2-3 rule" ile 24/48/72 saat tahmin yarıçapına 100/200/300 NM güvenlik marjı ekler.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS V/31 — Danger Messages",
              text: `Tropik siklon, ağır buz, terkedilmiş gemi veya seyir tehlikesi gözleyen kaptan, derhal yakındaki gemilere ve uygun yetkililere bildirim göndermek zorundadır. Bu, hukuki bir yükümlülüktür.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. ECDIS, Radar ve Cihaz Yönetimi",
      sections: [
        {
          subheading: "6.1 ECDIS — Type-specific eğitim ve ayar disiplini",
          paragraphs: [
            `ECDIS, kâğıt haritanın yerini almıştır ancak aynı zamanda bir "single point of failure" potansiyelidir. Kaptan, gemideki ECDIS marka/modeline yönelik type-specific eğitimin tüm zabitler tarafından alındığını teyit eder. ENC güncellemeleri (haftalık), official chart catalogue ile sefer ENC'lerinin örtüşmesi, safety contour, safety depth, shallow contour ve deep contour ayarları sefer öncesi gözden geçirilir.`,
            `ECDIS'in over-reliance riski MAIB tarafından defalarca raporlanmıştır (CFL Performer 2008, Ovit 2013). Kaptan, ECDIS'i tek başına değil; radar parallel index, visual bearing ve GPS ile çapraz kontrolle kullanmayı şart koşar.`,
          ],
        },
        {
          subheading: "6.2 Radar/ARPA ve AIS",
          paragraphs: [
            `Radar tuning (gain, sea clutter, rain clutter), antenna height, blind sectors ve yan sektör kontrolü kaptanın denetimi altındadır. ARPA hedef edinme kalitesi (true motion vs relative motion), CPA/TCPA limitleri ve trial maneuver kullanımı vardiya zabitince yapılır; kaptan eğitim ve denetimle bunu garanti eder.`,
            `AIS, COLREG manevra yorumu için tek başına yeterli değildir; radar ile teyit edilmelidir. AIS spoofing veya hatalı verilerin sıkça görüldüğü bölgelerde (Karadeniz, Basra Körfezi) kaptan ekstra dikkat ister.`,
          ],
        },
      ],
    },
    {
      heading: "7. Karar Anı: Overriding Authority Pratiği",
      sections: [
        {
          subheading: "7.1 Ne zaman overriding authority kullanılır?",
          paragraphs: [
            `Overriding authority; charterer'in fast steaming talebi, şirketin maliyet baskısı, terminal operatörünün acele etmesi, charterer'in tehlikeli liman talimatı, hatalı pilot manevrası, deficient ekipmanla sefere zorlama gibi durumlarda kullanılır. Karar, "professional judgement" olarak gerekçelendirilir ve şirkete yazılı bildirilir.`,
            `Bu yetkinin kullanılması nadiren popüler bir karardır; ancak kaptanın geri çekilmesi gereken hallerde geri çekilmemesi, ölümcül kazaların ortak motifidir. Şirketler, ISM iç denetimlerde "overriding authority kullanım kayıtlarını" örnek olarak inceler; hiç kullanılmamış olması bile bazen "korku kültürü" göstergesi sayılır.`,
          ],
        },
        {
          subheading: "7.2 Yazılı kayıt ve şirkete bildirim",
          paragraphs: [
            `Karar alındığında: log book'a tam metin olarak yazılır, e-posta ile şirketin DPA'sına ve operasyon yöneticisine bildirilir, charterer'a NOR/SOF üzerinden bildirim yapılır. Bu üçlü kayıt, ileride doğacak hukuki ihtilaflarda kaptanı ve şirketi koruyan en güçlü kanıttır.`,
          ],
        },
      ],
    },
    {
      heading: "8. Vaka Çalışmaları — Pratik Dersler",
      sections: [
        {
          subheading: "8.1 Costa Concordia (2012)",
          paragraphs: [
            `Kaptan, Giglio Adası'na yakın "salute" manevrası yaparken karaya oturdu. 32 ölü. Soruşturma; passage plan'da bu manevranın olmaması, kıyıdan emniyetsiz mesafe, BRM eksikliği ve kaptan-pilot ilişkisinin kaotik yönetimini ortaya koydu.`,
            `Ders: planlanmamış manevra yapılmaz. Yapılacaksa risk değerlendirmesi yazılı olarak hazırlanır ve şirkete onaylatılır.`,
          ],
        },
        {
          subheading: "8.2 El Faro (2015)",
          paragraphs: [
            `Kasırga rotasında ısrar, 33 ölü. Ders: weather routing servisinin tavsiyesi göz ardı edilemez; junior zabitin "challenge"ı bastırılamaz.`,
          ],
        },
        {
          subheading: "8.3 Wakashio (2020)",
          paragraphs: [
            `Mauritius açıklarında karaya oturma, doğum günü kutlaması için kıyıya yaklaşma + Wi-Fi sinyali için planlanmamış rota. Ders: passage plan'dan sapma yazılı gerekçe ister; "küçük" kişisel motivasyonlar büyük kazaların tetikleyicisidir.`,
          ],
        },
      ],
    },
    {
      heading: "9. Master's Standing Orders ve Night Orders",
      sections: [
        {
          subheading: "9.1 Master's Standing Orders",
          paragraphs: [
            `Standing orders, kaptanın gemi süresince sabit olarak vardiya zabitlerinden beklediği davranışları yazılı olarak tanımlar. Tüm zabitler imzalar. Tipik içerik: kaptanı çağırma kriterleri, otopilot kullanım kuralları, helmsman çağırma anları, lookout ekleme koşulları, log book yazım disiplini, alarm yönetimi, GMDSS test takvimi.`,
          ],
        },
        {
          subheading: "9.2 Night Orders",
          paragraphs: [
            `Her akşam kaptan, ertesi 24 saatlik sefer için spesifik talimatları night order book'a yazar: beklenen course alteration noktaları, hava beklentisi, trafik bilgisi, kaptanı çağırma anları, ETA güncellemeleri. Night orders, vardiya zabitinin gece kararlarına yardımcı olan en pratik araçtır.`,
          ],
        },
      ],
    },
    {
      heading: "10. Sürekli Mesleki Gelişim ve Sonuç",
      sections: [
        {
          subheading: "10.1 Kaptanın kendi yetkinliğini güncel tutması",
          paragraphs: [
            `Mevzuat sürekli güncellenir (IMO MSC ve MEPC toplantıları yılda iki kez). Kaptan; SOLAS, MARPOL, STCW değişikliklerini, IMO sirkülerlerini, P&I bültenlerini, MAIB ve TSB raporlarını düzenli takip eder. Şirket bültenleri, vetting raporları (RightShip, OCIMF SIRE), klas teknik bültenleri kaptanın günlük okuma listesidir.`,
          ],
        },
        {
          subheading: "10.2 Sonuç",
          paragraphs: [
            `Seyir emniyetinin nihai sorumluluğu, kaptana hem büyük yetki hem de büyük yük yükler. Bu yetki bir "ünvan ayrıcalığı" değildir; her gün, her kararla yeniden hak edilen profesyonel bir konumdur. SOLAS V/34, ISM 5.2 ve STCW, kaptanı korumak için değil; deniz emniyetini korumak için bu yetkiyi tanımlamıştır. Bilge kaptan, yetkisini "kullanmak zorunda kalmadığı" bir köprüüstü kültürü inşa eder; ama gerektiği an tereddütsüz kullanır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Bir cümlede özet",
              text: `Geminin emniyeti gemideki en yaşlı belge değil, gemideki en hazırlıklı insandır. O insan kaptandır.`,
            },
          ],
        },
      ],
    },
  ],
};

export default content;
