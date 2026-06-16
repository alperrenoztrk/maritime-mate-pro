import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Seyir vardiyasında lookout ve dümen nöbeti",
  roleSlug: "ustagemici",
  taskIndex: 0,
  estimatedPages: 25,
  intro: `Usta Gemici (Able Seaman / AB), köprüüstü seyir vardiyasının "gözü ve eli"dir; lookout (gözcü) olarak çevre gözetimini, helmsman (dümenci) olarak verilen rota komutlarının doğru ve zamanında uygulanmasını üstlenir. COLREG Rule 5 gereğince her gemi, görsel ve işitsel uygun gözetimi (proper look-out) hem gündüz hem gece, her görüş koşulunda sürekli sürdürmek zorundadır; bu görevin saha uygulayıcısı AB'dir. Bu bölüm; lookout raporlama disiplinini, standart dümen komutlarını (helm orders), pusula/rota takibini, gece görüşü ve kör nokta yönetimini, hava/görüş koşullarına göre vardiya takviyesini ve vardiya devir-teslim prosedürünü adım adım açıklar.`,
  sources: [
    "COLREG 1972 (Denizde Çatışmayı Önleme Uluslararası Kuralları) — özellikle Rule 5, 6, 7, 19, 35",
    "STCW Code Section A-VIII/2 — Watchkeeping at Sea",
    "SOLAS Chapter V — Safety of Navigation (Reg. 14 Manning, Reg. 24 Use of heading/track control)",
    "IMO Resolution A.890(21) / A.1047(27) — Principles of Minimum Safe Manning",
    "ICS Bridge Procedures Guide (5th Edition)",
    "IAMSAR ve Standard Marine Communication Phrases (SMCP) — IMO Resolution A.918(22)",
    "Watchkeeping Safety — MAIB ve TAIB kaza raporları (lookout failure vakaları)",
  ],
  chapters: [
    {
      heading: "1. Köprüüstü Vardiya Düzeni ve AB'nin Rolü",
      lead: `Seyir vardiyasında AB, vardiya zabitinin (OOW — Officer of the Watch) emrinde lookout ve/veya helmsman görevini üstlenir. Görevin niteliği görüş koşullarına, trafik yoğunluğuna ve dar suyolu durumuna göre değişir.`,
      sections: [
        {
          subheading: "1.1 Lookout ve helmsman görevlerinin kapsamı",
          paragraphs: [
            `Lookout görevi; çevredeki tüm gemilerin, küçük teknelerin, şamandıraların, kıyı hatlarının, buz/enkaz/yüzen cisimlerin, seyir fenerlerinin ve ses sinyallerinin gözetlenmesi ve OOW'a anında raporlanmasıdır. AB karar vermez; gözlemini bildirir, manevra kararı OOW'a aittir. Bu ayrım vardiyanın temel disiplinidir: lookout "rapor eder", zabit "yorumlar ve manevra yapar".`,
            `Helmsman (dümenci) görevinde AB, OOW veya pilot tarafından verilen rota/dümen komutlarını tekrar ederek (repeat-back) ve doğru uygulayarak gemiyi istenen rotada tutar. Otomatik pilot (autopilot) devredeyken bile, dar sular, trafik ayrım düzenleri ve manevra durumlarında derhal el dümenine (manual/hand steering) geçilebilmesi için dümenci hazır bekler.`,
            `Tek kişi aynı anda hem lookout hem helmsman olamaz; el dümeninde iken kişi dümene ve pusulaya odaklandığından "proper look-out" sağlanamaz. Bu nedenle el dümeni devredeyken ayrı bir lookout konumlandırılır. STCW A-VIII/2 ve birçok kaza raporu, "sole lookout" uygulamasının sadece gündüz, iyi görüş ve düşük trafikte ve OOW'un tüm faktörleri değerlendirmesiyle kabul edilebilir olduğunu vurgular.`,
          ],
          bullets: [
            `Lookout: gözle ve kulakla çevre gözetimi + anında raporlama`,
            `Helmsman: rota/dümen komutlarını repeat-back ile uygulama`,
            `AB karar vermez; gözlemini OOW'a iletir`,
            `El dümeninde lookout görevi ayrı bir kişiye verilir`,
          ],
        },
        {
          subheading: "1.2 Vardiya takviyesi: ne zaman ekstra lookout?",
          paragraphs: [
            `OOW; kısıtlı görüş (sis, yağmur, kar), gece, yoğun trafik, dar suyolu/kanal, kıyıya yakın seyir, balıkçı tekne kümeleri veya yorgunluk gibi faktörler oluştuğunda lookout takviyesi ister. AB, "stand by the wheel" (dümen başında hazır) veya "extra lookout on bridge wing" gibi komutlarla göreve çağrılır.`,
            `STCW dinlenme saatleri (her 24 saatte min. 10 saat, her 7 günde min. 77 saat) lookout etkinliğini doğrudan etkiler; yorgun lookout bir tehlikedir. AB, kendini görev yapamayacak kadar yorgun hissederse OOW'a bildirmekle yükümlüdür.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "COLREG Rule 5 — Look-out",
              text: `"Her gemi, mevcut koşullara ve şartlara tam uygun bir değerlendirme yapabilmek için her zaman görme, işitme ve mevcut tüm uygun araçlarla uygun bir gözetim bulundurur." Lookout sadece görsel değil; işitsel (ses sinyalleri) ve radar/AIS gibi araçların kullanımını da kapsar.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Lookout Görevi: Gözetim ve Raporlama Tekniği",
      sections: [
        {
          subheading: "2.1 Sistematik tarama ve raporlama formatı",
          paragraphs: [
            `Etkili lookout, ufku sistematik tarar: baş omuzdan (bow) başlayıp her iki bordoyu ve kıçı düzenli aralıklarla gözden geçirir. Sadece pruvaya bakmak değil, 360° farkındalık esastır; özellikle overtaking (yetişen) gemiler kıçtan yaklaşır. Tarama hem çıplak gözle hem dürbünle yapılır.`,
            `Rapor formatı kerteriz (bearing) + cisim + mesafe/durum şeklindedir. Kerteriz "saat yönü" (one o'clock, dead ahead) veya "iskele/sancak ... derece" şeklinde verilir. Örnek raporlar: "Light dead ahead!", "Vessel two points on the starboard bow!", "Object red one-zero!" (iskele 10°). Tehlike algılanırsa derhal yüksek sesle ve net bildirilir.`,
            `Sabit kerteriz / azalan mesafe (constant bearing, decreasing range — CBDR) çarpışma riskinin klasik göstergesidir. AB, bir gemiyi gözlemlerken kerterizin değişmediğini fark ederse bunu mutlaka raporlar; OOW bu bilgiyi radar plot ile teyit ederek manevra kararı verir.`,
          ],
          table: {
            caption: `Standart Lookout Rapor İfadeleri (örnekler)`,
            headers: ["Gözlem", "Rapor İfadesi", "Anlamı"],
            rows: [
              ["Önde fener", "Light dead ahead!", "Tam pruvada ışık"],
              ["Sancak baş omuz", "Vessel on the starboard bow!", "Sağ baş tarafta gemi"],
              ["İskele kıç", "Light on the port quarter!", "Sol kıç tarafta ışık"],
              ["Ses sinyali", "Fog signal ahead!", "Önden sis düdüğü"],
              ["Yüzen cisim", "Object in the water, port bow!", "Suda cisim, sol baş"],
            ],
          },
        },
        {
          subheading: "2.2 Gece görüşü ve fener tanıma",
          paragraphs: [
            `Gece lookout'ta karanlığa adaptasyon (dark adaptation) 20-30 dakika sürer; bu yüzden köprüüstü aydınlatması kısılır, beyaz ışık kullanılmaz, kırmızı aydınlatma tercih edilir. Telefon/tablet ekranı, sigara ışığı bile gece görüşünü bozar. AB, ufka doğrudan değil hafif yan bakışla (off-center vision) baktığında zayıf ışıkları daha iyi seçer; çünkü gözün periferik kısmı düşük ışıkta daha duyarlıdır.`,
            `Fener tanıma lookout'un en kritik becerisidir: yeşil (sancak) - kırmızı (iskele) yan fenerler, beyaz pruva/kıç fenerleri, demirli gemi all-round beyaz, balıkçı/çekme/kısıtlı manevra özel fener kombinasyonları COLREG Part C'de tanımlıdır. AB tüm fener anlamını ezbere bilmek zorunda olmasa da gördüğünü doğru ve net tarif etmeli (renk, sayı, düzen) ve OOW'a iletmelidir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Kırmızıyı kırmızıya, yeşili yeşile",
              text: `Karşıdan gelen gemide kırmızı yan fener görüyorsanız onun iskele tarafını görüyorsunuz demektir; iki gemi de birbirine kırmızı gösteriyorsa güvenli geçiş başlangıçtadır. Ancak karar OOW'undur; lookout sadece gördüğü ışık düzenini doğru raporlar.`,
            },
            {
              type: "warning",
              title: "Gece görüşünü koruyun",
              text: `Köprüüstünde beyaz ışık yakmak, ekrana bakmak veya dışarı çıkıp tekrar girmek karanlık adaptasyonunu bozar ve dakikalarca lookout'u körleştirir. Gece nöbetinde ışık disiplinine titizlikle uyulur.`,
            },
          ],
        },
        {
          subheading: "2.3 Kısıtlı görüşte işitsel gözetim",
          paragraphs: [
            `Sis, yoğun yağmur veya kar gibi kısıtlı görüşte (restricted visibility) görsel gözetim yetersiz kalır; işitsel lookout öne çıkar. COLREG Rule 35 kapsamında diğer gemilerin sis sinyalleri (uzun düdük, kısa-kısa düdükler, demirli gemi çanı/gong'u) dinlenir. Bridge wing'de (köprü kanadı) açık havada dinlemek motor/jeneratör gürültüsünden uzak daha etkilidir.`,
            `Kısıtlı görüşte AB, radar/AIS değerlendirmesinin OOW'a ait olduğunu bilir ama kendi işitsel ve sınırlı görsel gözetimini sürdürür. Duyulan her sis sinyali kerteriz tahminiyle birlikte ("fog signal, fine on the port bow") raporlanır.`,
          ],
        },
      ],
    },
    {
      heading: "3. Helmsman (Dümenci) Nöbeti: Standart Dümen Komutları",
      lead: `Dümen komutları (helm orders) uluslararası standarttır ve SMCP'de tanımlıdır. Her komut dümenci tarafından aynen tekrar edilir, uygulanır ve uygulandığında geri raporlanır. Bu üçlü döngü (order — repeat — report) hata payını yok eder.`,
      sections: [
        {
          subheading: "3.1 Temel dümen komutları ve repeat-back disiplini",
          paragraphs: [
            `Komut verildiğinde dümenci komutu birebir tekrarlar (örn. OOW: "Starboard ten" — Helmsman: "Starboard ten"), dümeni uygular ve dümen istenen açıya geldiğinde bildirir ("Ten of starboard wheel on"). Rota tutturulduğunda OOW yeni rota verir ("Steady on one-two-zero"), dümenci pusulada rotayı yakaladığında "Steady on one-two-zero" diye teyit eder. Bu disiplin, gürültü/aksan/yorgunluk kaynaklı yanlış anlamayı önler.`,
            `"Midships" dümeni tam ortaya alır. "Steady" / "Steady as she goes" o anki başı koru anlamındadır; dümenci pusuladaki anlık başı okuyup OOW'a bildirir ve o başta tutar. "Hard a-starboard / Hard a-port" dümeni o yöne tam basar (acil manevra). "Ease to five" verilen büyük açıyı 5°'ye azalt demektir.`,
          ],
          table: {
            caption: `Standart Dümen Komutları (Helm Orders — SMCP)`,
            headers: ["Komut", "Türkçe karşılığı", "Uygulama"],
            rows: [
              ["Starboard / Port ten", "Sancak / İskele on", "Dümeni o yöne 10° bas"],
              ["Hard a-starboard", "Alabanda sancak", "Dümeni sancağa tam bas"],
              ["Midships", "Boşta / orta", "Dümeni ortaya al"],
              ["Steady (as she goes)", "Böyle tut", "O anki başı koru ve raporla"],
              ["Steady on 120", "120'de tut", "120° rotaya gel ve tut"],
              ["Ease to five", "Beşe indir", "Açıyı 5°'ye azalt"],
              ["Nothing to port", "İskeleye kaçma", "Verilen başın iskelesine geçme"],
            ],
          },
        },
        {
          subheading: "3.2 Rota tutma, yalpa ve akıntı telafisi",
          paragraphs: [
            `Dümenci, pusula başını (compass heading) referans alır ama dümeni sürekli oynatmaz; gemi yalpalarken (yaw) "meeting the swing" tekniğiyle başın salınımını küçük, zamanında dümen hareketleriyle karşılar. Aşırı dümen (over-steering) gemiyi yorgun, hatlı seyir yaptırır ve yakıt kaybettirir; yetersiz dümen ise rotadan sapmaya yol açar. İyi dümenci minimum dümenle stabil rota tutar.`,
            `Rüzgâr ve akıntı (leeway/set) gemiyi rotadan saptırır; dümenci başı pusulada tutsa da gemi yana kayabilir. Pilotaj ve dar sularda OOW/pilot ürün hattı (transit/leading lines) ve dümen komutlarıyla bunu telafi eder; dümenci verilen komutları harfiyen uygular ve fark ettiği sürekli sapmayı (örn. "she's carrying port helm") raporlar.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Komut karışıklığı — 'wrong helm'",
              text: `Birçok temas/karaya oturma vakası, dümencinin komutu yanlış anlaması (sancak yerine iskele basması) ve repeat-back yapılmamasından kaynaklanmıştır. Repeat-back disiplini ihmal edilince hata fark edilmeden gemi yanlış yöne döner. Bu yüzden her komut tekrar edilmeli ve OOW tekrarı dinlemelidir.`,
            },
          ],
        },
        {
          subheading: "3.3 Autopilot ile el dümeni arasında geçiş",
          paragraphs: [
            `Açık denizde otomatik pilot rotayı tutar; ancak trafik, manevra, dar su ve sistem arızasında el dümenine geçilir. Geçiş bir prosedürdür: OOW "hand steering" der, dümenci modu manuele alır, pusulayı kontrol eder ve "hand steering, on course one-two-zero" diye teyit eder. SOLAS V/24, manevra gerektiren alanlarda hemen el dümenine geçilebilecek şekilde dümencinin hazır olmasını ister.`,
            `Otomatik pilot devredeyken dümenci dümenden ayrılabilir ama OOW emrederse "stand by the wheel" konumunda kalır. Steering gear arızası (steering failure) durumunda alarm çalar; dümenci derhal alternatif steering moduna/emergency steering'e geçişe hazır olur ve OOW'u uyarır.`,
          ],
        },
      ],
    },
    {
      heading: "4. Pusula, Rota ve Köprüüstü Aletleri",
      sections: [
        {
          subheading: "4.1 Gyro ve manyetik pusula, sapma kontrolü",
          paragraphs: [
            `Dümenci hem gyro repeater hem manyetik pusulayı kullanır. Gyro pusula gerçek (true) başı verir; manyetik pusula yedek olarak kritiktir (gyro arızasında). Gyro ile manyetik arasındaki fark periyodik kontrol edilir; sapma artıyorsa OOW'a bildirilir. Vardiya değişiminde rota ve pusula durumu devredilir.`,
            `Steering konsolundaki rate-of-turn göstergesi, geminin dönüş hızını (°/dk) gösterir; özellikle büyük gemilerde dümenci dönüşü bu aletle de kontrol ederek aşırı dönmeyi önler. Rudder angle indicator dümen açısını teyit eder; verilen komutla göstergedeki açının uyumu sürekli izlenir.`,
          ],
        },
        {
          subheading: "4.2 VHF, sis düdüğü ve sinyal donanımı kullanımı",
          paragraphs: [
            `AB, OOW komutuyla sis düdüğünü (manuel veya otomatik), gündüz işaretleri (shapes — küre, koni, silindir) ve gerektiğinde projektör/Aldis lamba ile ışık sinyallerini hazırlar. Demir atma/vira, manevra ve kısıtlı görüş sinyalleri OOW kontrolünde verilir; dümenci/lookout bu donanımın yerini ve çalışmasını bilir.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "SMCP — ortak dil",
              text: `Standard Marine Communication Phrases, köprüüstünde farklı milletten mürettebatın aynı dümen ve manevra terimlerini tek biçimde kullanmasını sağlar. AB'nin SMCP dümen komutlarını ezbere ve aksansız uygulaması, çok uluslu ekiplerde hayati önemdedir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Çatışmayı Önleme: AB'nin COLREG Farkındalığı",
      sections: [
        {
          subheading: "5.1 Lookout ile risk değerlendirmesinin desteklenmesi",
          paragraphs: [
            `COLREG Rule 7 (çatışma riski) ve Rule 8 (önleyici manevra) kararları OOW'a ait olsa da, AB'nin sağladığı doğru ve zamanında lookout bilgisi bu kararların temelidir. Sabit kerteriz, fenerin yaklaşması, yeni bir hedefin belirmesi gibi gözlemler anında raporlanırsa OOW erken ve küçük manevrayla riski giderebilir.`,
            `AB, "ben gördüm ama önemli değildir" diye filtreleme yapmaz; küçük tekneler, yelkenliler, fenersiz balıkçı tekneleri ve şamandıralar dahil her cismi raporlar. Birçok çarpışmada lookout bir hedefi görmüş ama "zabit zaten görmüştür" varsayımıyla raporlamamıştır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Varsayım yapma",
              text: `"OOW zaten radarda görmüştür" varsayımı tehlikelidir. Lookout her gözlemini rapor eder; OOW'un radarda gördüğü, sizin gözle gördüğünüzü teyit eder ya da yeni bilgi sağlar. Sessizlik bilgi kaybıdır.`,
            },
          ],
        },
        {
          subheading: "5.2 Dar sular, TSS ve yoğun trafik",
          paragraphs: [
            `Trafik Ayrım Düzenlerinde (TSS), kanallarda ve boğazlarda lookout yükü artar; çok sayıda hedef, hızlı gelişen durumlar ve sık dümen komutları vardır. Bu koşullarda OOW genelde el dümeni ister; dümenci komutlara odaklanır, ayrı lookout çevreyi tarar. AB, bu yüksek tempolu ortamda komutları daha da net repeat-back yapmalı ve dikkatini dağıtmamalıdır.`,
          ],
        },
      ],
    },
    {
      heading: "6. Vardiya Devir-Teslimi ve Kayıtlar",
      sections: [
        {
          subheading: "6.1 Devir-teslim (handover) prosedürü",
          paragraphs: [
            `Vardiya değişiminde, görevi devralan AB göreve hazır (uyanık, gece görüşü adapte) olarak köprüüstüne çıkar. Devralan dümenci, mevcut rotayı, dümen modunu (auto/hand), pusula durumunu ve OOW'un özel talimatlarını devralır ve teyit eder. Devir, geminin manevra anında veya kritik bir geçişte yapılmaz; uygun ana ertelenir.`,
            `Devralan lookout; mevcut trafik durumunu, izlenen hedefleri, hava/görüş koşulunu ve özel dikkat noktalarını (örn. "balıkçı kümesi sancak baş tarafta") devralır. STCW A-VIII/2, devralan personelin görme adaptasyonu tamamlanana kadar tam görevli sayılmamasını öngörür.`,
          ],
          bullets: [
            `Devralan personel uyanık ve adapte olmalı`,
            `Rota, dümen modu, pusula durumu devredilir`,
            `İzlenen hedefler ve özel talimatlar aktarılır`,
            `Manevra/kritik geçiş anında devir yapılmaz`,
          ],
        },
        {
          subheading: "6.2 Kayıt ve raporlama yükümlülüğü",
          paragraphs: [
            `El dümenine geçiş/çıkış zamanları, steering gear testleri ve dümenci değişimleri köprüüstü jurnaline (bridge logbook) kaydedilir; bu kayıtların doğruluğuna AB de katkı sağlar. Steering gear, limana giriş/çıkış öncesi SOLAS V/26 gereği test edilir; AB bu testte dümeni komutlara göre hareket ettirerek katkı verir.`,
          ],
        },
      ],
    },
    {
      heading: "7. Tipik Hatalar ve Vaka Dersleri",
      sections: [
        {
          subheading: "7.1 Lookout yetersizliği kaynaklı vakalar",
          paragraphs: [
            `Çok sayıda çarpışma ve karaya oturma raporunda ortak unsur "inadequate look-out"tur: tek kişilik vardiyada OOW'un radar/ECDIS/evrak işiyle meşgul olup dışarı bakmaması, gece görüş disiplinin bozulması veya lookout'un göreve çağrılmaması. AB'nin varlığı ve etkin raporlaması bu zinciri kırar.`,
            `Yorgunluk (fatigue) lookout etkinliğini düşüren bir numaralı faktördür. Gece geç saatlerde, uzun vardiyalarda mikro-uyku riski artar. AB, yorgunluk veya uyuklama riskini OOW'a bildirmeli, ayakta durma/hareket etme/temiz havaya çıkma gibi uyanık kalma stratejilerini uygulamalıdır.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Tek kişilik vardiya tuzağı",
              text: `Birçok gece çarpışmasında OOW tek başına vardiyadaydı, evrak/ekran ile meşguldü ve lookout çağrılmamıştı. Karşı gemi dakikalarca görülmedi. Ders: gece, kısıtlı görüş ve trafik artışında lookout takviyesi ihmal edilmemeli; AB göreve hazır beklemelidir.`,
            },
          ],
        },
        {
          subheading: "7.2 Dümen ve komut hataları",
          paragraphs: [
            `Repeat-back yapılmaması, komut yönünün karıştırılması (port/starboard) ve autopilot'un manuele alındığının sanılması (oysa hâlâ otomatik moddadır) klasik dümenci hatalarıdır. Her geçişte modun gerçekten doğru olduğunu rudder angle indicator ve geminin tepkisiyle teyit etmek hayat kurtarır.`,
          ],
        },
      ],
    },
    {
      heading: "8. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "8.1 Lookout / helmsman vardiya checklist'i",
          bullets: [
            `Göreve uyanık ve (gece) görüşü adapte çıktım mı?`,
            `Çevreyi 360° sistematik tarıyor, her cismi/ışığı/ses sinyalini raporluyor muyum?`,
            `Sabit kerteriz / yaklaşan hedefi anında bildirdim mi?`,
            `Gece görüş disiplinine (ışık, ekran) uyuyor muyum?`,
            `Her dümen komutunu repeat-back yapıp uyguladım, raporladım mı?`,
            `Autopilot/el dümeni modunu teyit ettim mi (rudder angle + tepki)?`,
            `Pusula (gyro/manyetik) ve rota durumu kontrol/devredildi mi?`,
            `Steering failure / alarm durumunda yapacağımı biliyor muyum?`,
            `Vardiya devrini doğru zamanda ve eksiksiz yaptım mı?`,
          ],
          paragraphs: [
            `Usta Gemici'nin köprüüstü vardiyasındaki değeri, "hiçbir şey olmadığında" görünmez kalan ama "bir hedef tehlikeye dönüştüğünde" geminin ilk savunma hattı olan disiplinli gözetim ve hatasız dümen uygulamasından gelir. Doğru raporlanan bir kerteriz, zamanında verilen küçük bir dümen, gece korunan bir göz adaptasyonu; bunların her biri bir çarpışmayı önleyebilir. Lookout ve helmsman nöbeti rutin görünür, ama denizciliğin en temel can güvenliği görevidir.`,
          ],
        },
      ],
    },
  ],
};

export default content;
