import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Köprüüstü vardiyasına eğitim amaçlı katılım",
  roleSlug: "guverte-stajyer",
  taskIndex: 0,
  estimatedPages: 25,
  intro: `Güverte Stajyeri (Deck Cadet), köprüüstü vardiyasına bağımsız bir nöbetçi olarak değil, vardiya zabitinin (OOW) doğrudan gözetimi altında, eğitim ve gözlem amacıyla katılan kişidir. Bu katılımın amacı, STCW Tablo A-II/1'de tanımlanan seyir vardiyası yetkinliklerini gerçek operasyonel ortamda kademeli olarak kazanmaktır. Stajyer; radar/ARPA, ECDIS, AIS ve diğer köprüüstü cihazlarını gözlemler, pozisyon belirleme ve plottlama pratiği yapar, COLREG kurallarını sahada öğrenir ve seyir jurnali (log) tutmaya alışır. Bu bölüm, stajyerin köprüüstünde nasıl çalışacağını, neyi öğrenmesi gerektiğini ve emniyet sınırlarını ayrıntılı olarak açıklar.`,
  sources: [
    "STCW Convention & Code — Table A-II/1 (Functions at the operational level)",
    "STCW Regulation VIII/2 — Watchkeeping arrangements and principles",
    "COLREG 1972 (International Regulations for Preventing Collisions at Sea)",
    "SOLAS Chapter V — Safety of Navigation",
    "IMO Model Course 7.03 — Officer in Charge of a Navigational Watch",
    "Bridge Procedures Guide (ICS — International Chamber of Shipping)",
    "IMO Resolution A.893(21) — Guidelines for Voyage Planning",
    "Admiralty Manual of Navigation / Nicholls's Seamanship and Nautical Knowledge",
  ],
  chapters: [
    {
      heading: "1. Stajyerin Köprüüstündeki Rolü ve Sınırları",
      lead: `Köprüüstü, geminin emniyetli seyrinin yönetildiği merkezdir; stajyer buraya gözlemci ve öğrenci sıfatıyla, ama aktif bir çift göz olarak katılır.`,
      sections: [
        {
          subheading: "1.1 Eğitim amaçlı katılımın çerçevesi",
          paragraphs: [
            `Güverte stajyeri vardiya zabitinin gözetiminde köprüüstü nöbetine katılır; ancak bağımsız karar alma yetkisi yoktur. Stajyer, her durumda OOW'nin onayını alarak hareket eder. Bu hiyerarşi tesadüfi değildir: STCW VIII/2, vardiyadan sorumlu zabitin "geminin emniyetli seyrinden tek başına sorumlu olduğu" ilkesini koyar. Stajyer bu sorumluluğu paylaşamaz, ancak gözlem ve sınırlı pratik yoluyla bu sorumluluğa hazırlanır.`,
            `Stajyer köprüüstüne çıktığında ilk yapması gereken, OOW'ye katılım amacını bildirmek ve "extra lookout" olarak mı yoksa "training" amaçlı mı bulunduğunu netleştirmektir. Karanlık seyirde stajyer, OOW'nin gece görüşünü bozmamak için kırmızı aydınlatma kurallarına ve "lookout" disiplinine uyar. Görev devralma ve teslim (handover) süreçlerini baştan sona izlemek, stajyerin vardiya kültürünü öğrenmesinin temelidir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Lookout görevi ihmal edilemez",
              text: `Stajyer köprüüstünde eğitim alırken aynı anda "sole lookout" (tek gözcü) olarak görevlendirilmemelidir. COLREG Rule 5, sürekli ve uygun gözcülüğü zorunlu kılar; eğitim faaliyeti gözcülüğü gölgede bırakamaz.`,
            },
          ],
        },
        {
          subheading: "1.2 Master's Standing Orders ve Night Order Book",
          paragraphs: [
            `Stajyer, her vardiyadan önce Kaptan'ın Standing Orders (sürekli emirler) ve Night Order Book (gece emir defteri) içeriğini okumalıdır. Bu belgeler; en yakın geçiş mesafesi (CPA), kaptanın ne zaman çağrılacağı, hangi koşullarda makine standby'a alınacağı gibi kritik talimatları içerir. Stajyer bu emirleri imzalayarak okuduğunu teyit eder ve OOW'nin bu emirler çerçevesinde nasıl karar verdiğini gözlemler.`,
            `Kaptanı çağırma kriterleri (calling the master) stajyerin ezberlemesi gereken en önemli listelerden biridir: görüş mesafesi belirli bir sınırın altına düştüğünde, trafik yoğunluğu arttığında, navigasyonel şüphe doğduğunda, ekipman arızasında veya verilen CPA sağlanamadığında kaptan derhal çağrılır. Stajyer, "şüphe varsa kaptanı çağır" prensibinin asla bir zayıflık değil, profesyonel bir refleks olduğunu içselleştirir.`,
          ],
        },
      ],
    },
    {
      heading: "2. Radar ve ARPA Kullanımının Gözlemi ve Pratiği",
      sections: [
        {
          subheading: "2.1 Radar ayarları ve yorumlama",
          paragraphs: [
            `Stajyer, radarın temel kontrollerini OOW gözetiminde öğrenir: gain, sea clutter (STC), rain clutter (FTC), tuning, range scale seçimi ve EBL/VRM (Electronic Bearing Line / Variable Range Marker) kullanımı. Yanlış ayarlanmış bir radarın gerçek hedefleri bastırabileceğini veya parazit yaratabileceğini pratikte görür. Uzun mesafede genel trafik resmini, kısa mesafede ise yakın tehlikeleri izlemek için range değiştirmenin disiplinini kavrar.`,
            `Head-up, course-up ve north-up gösterim modları ile relative motion ve true motion arasındaki fark stajyerin net anlaması gereken kavramlardır. North-up + true motion modunda kendi gemisinin ve hedeflerin gerçek hareketinin nasıl göründüğünü, relative motion modunda ise çarpışma riskinin nasıl daha kolay değerlendirildiğini öğrenir.`,
          ],
          table: {
            caption: `Radar Kontrolleri ve İşlevleri (Eğitim Özeti)`,
            headers: ["Kontrol", "İşlevi", "Yanlış Ayar Sonucu"],
            rows: [
              ["Gain", "Alıcı hassasiyeti", "Düşük: hedef kaybı / Yüksek: parazit"],
              ["Sea clutter (STC)", "Deniz yansımalarını bastırır", "Aşırı: yakın hedef kaybı"],
              ["Rain clutter (FTC)", "Yağmur yansımasını azaltır", "Aşırı: zayıf hedef kaybı"],
              ["EBL/VRM", "Kerteriz ve mesafe ölçümü", "Plotting hatası"],
              ["Range scale", "Görüntü menzili", "Yanlış durum farkındalığı"],
            ],
          },
        },
        {
          subheading: "2.2 ARPA ile hedef takibi ve çarpışma değerlendirmesi",
          paragraphs: [
            `ARPA (Automatic Radar Plotting Aid), hedefleri otomatik olarak takip ederek CPA (Closest Point of Approach) ve TCPA (Time to CPA) değerlerini hesaplar. Stajyer, bir hedefi acquire ettikten sonra ARPA'nın vektör çözümünün stabilize olması için zaman gerektiğini öğrenir; ilk birkaç dakikalık veriye körü körüne güvenilmez. Trial manoeuvre fonksiyonu ile bir rota/hız değişikliğinin trafiği nasıl etkileyeceğini OOW'nin nasıl test ettiğini gözlemler.`,
            `Stajyer, ARPA'nın bir karar verici değil, bir karar destek aracı olduğunu kavramak zorundadır. ARPA hedef takibini kaybedebilir (target swap), küçük teknelerde hedefi tam yakalayamayabilir ve dar sularda manevra eden hedeflerde gecikmeli veri verebilir. Bu nedenle ARPA verisi her zaman görsel gözlem ve klasik radar plotting ile çapraz doğrulanır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "COLREG Rule 7 — Risk of collision",
              text: `Çarpışma riski; uygun radar kullanımı (uzun menzilli tarama dahil) ve kerteriz değişiminin izlenmesiyle değerlendirilir. Yetersiz bilgiye ve özellikle yetersiz radar gözlemine dayanarak varsayımda bulunulamaz.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. ECDIS Kullanımının Öğrenilmesi",
      sections: [
        {
          subheading: "3.1 ECDIS temelleri ve emniyet ayarları",
          paragraphs: [
            `ECDIS (Electronic Chart Display and Information System), kağıt haritanın yerini alan onaylı elektronik seyir sistemidir. Stajyer; safety contour, safety depth, shallow/deep contour ve safety frame (look-ahead) ayarlarının ne anlama geldiğini ve bunların nasıl belirlendiğini öğrenir. Yanlış ayarlanmış bir safety contour, sığ su uyarısının çok geç gelmesine yol açabilir; bu nedenle bu ayarlar geminin draftına ve UKC (Under Keel Clearance) politikasına göre yapılır.`,
            `Stajyer, ENC (Electronic Navigational Chart) ile raster haritalar arasındaki farkı, ölçek seçiminin (overscale/underscale uyarıları) önemini ve "chart 1" sembol kütüphanesini kullanmayı öğrenir. ECDIS üzerinde route planlama, route check ve route monitoring modlarının nasıl çalıştığını OOW ile birlikte takip eder.`,
          ],
        },
        {
          subheading: "3.2 ECDIS alarmları ve aşırı güven tuzağı",
          paragraphs: [
            `ECDIS, cross-track error, anchor watch, safety contour crossing ve dangerous target gibi pek çok alarm üretir. Stajyer, bu alarmların hiçbirinin sessize alınmaması veya rutin olarak "acknowledge" edilmemesi gerektiğini öğrenir; her alarmın bir nedeni vardır. Aşırı ECDIS güveninin (over-reliance) yol açtığı kazalar denizcilik tarihinde önemli bir yer tutar.`,
            `Stajyer, ECDIS'in tek başına yeterli olmadığını, pozisyonun bağımsız kaynaklarla (görsel kerteriz, radar mesafesi, ikinci GNSS) doğrulanması gerektiğini içselleştirir. ECDIS güncellemelerinin (ENC updates) zamanında yapılması ve sensör girdilerinin (GPS, gyro, log) doğruluğunun kontrol edilmesi de stajyerin gözlemlemesi gereken günlük rutinlerdendir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka dersi: ECDIS aşırı güveni",
              text: `Birçok karaya oturma soruşturmasında ortak nedenler tespit edilmiştir: safety contour'un draft'a göre değil varsayılan değerde bırakılması, look-ahead alarmlarının kapatılması ve pozisyonun bağımsız doğrulanmaması. Ders: ECDIS bir araçtır, gözcülüğün ve teyit kültürünün yerini almaz.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. AIS ve Diğer Köprüüstü Cihazları",
      sections: [
        {
          subheading: "4.1 AIS verisinin kullanımı ve sınırları",
          paragraphs: [
            `AIS (Automatic Identification System), diğer gemilerin kimlik, pozisyon, rota, hız ve manevra bilgilerini yayınlar. Stajyer; AIS hedefinin MMSI, gemi adı, tipi ve CPA/TCPA bilgisini okumayı öğrenir. Ancak AIS'in çarpışma önlemede asla tek başına kullanılamayacağını da kavrar: tüm hedefler AIS taşımaz, AIS verisi yanlış girilmiş olabilir ve AIS gecikmeli güncellenebilir. COLREG Rule 7, çarpışma değerlendirmesinin radar/ARPA temelli olmasını öngörür; AIS bunu tamamlar.`,
            `Stajyer, AIS hedef bilgisinin radar hedefiyle ilişkilendirilmesini (AIS-radar association) ve OOW'nin bu iki kaynağı nasıl çapraz doğruladığını gözlemler. Manevra niyeti belirsiz bir gemiyle VHF üzerinden iletişim kurmanın faydaları ve riskleri (VHF-assisted collision tuzağı) de bu aşamada tartışılır.`,
          ],
        },
        {
          subheading: "4.2 Gyro/manyetik pusula, log, echo sounder ve GMDSS",
          paragraphs: [
            `Stajyer; gyro pusula ile manyetik pusula arasındaki farkı, gyro error ve compass error (deviation + variation) kavramlarını ve azimut/transit ile pusula hatasının nasıl bulunduğunu öğrenir. Speed log (hıza), echo sounder (su derinliği) ve rate of turn göstergesinin okunması da köprüüstü farkındalığının parçasıdır.`,
            `GMDSS (Global Maritime Distress and Safety System) ekipmanları — VHF DSC, MF/HF, EPIRB, SART, NAVTEX — stajyere tanıtılır. Stajyer, kazara distress (false alert) göndermenin ciddi sonuçları olduğunu öğrenir ve bu cihazlara yetkisiz dokunmaz; ancak alarm ve mesaj akışını gözlemleyerek GMDSS mantığını kavrar.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Çapraz doğrulama alışkanlığı",
              text: `İyi bir zabit hiçbir tek cihaza güvenmez. GPS pozisyonunu radar mesafesi/kerterizi ile, gyro başını manyetik pusula + bilinen pusula hatasıyla, echo sounder derinliğini ECDIS sounding ile karşılaştır. Bu alışkanlık stajyerlikte kazanılır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Pozisyon Belirleme ve Plottlama Pratiği",
      sections: [
        {
          subheading: "5.1 Görsel ve elektronik fix yöntemleri",
          paragraphs: [
            `Stajyer, pozisyon belirlemenin (fixing) birden çok yöntemini pratikte uygular: üç kerterizli görsel fix (three-bearing fix), radar mesafesi + kerteriz, transit (leading line) ve dead reckoning (DR) / estimated position (EP) hesabı. Üç kerterizden oluşan "cocked hat" üçgeninin büyüklüğünün fix kalitesini gösterdiğini öğrenir; küçük üçgen iyi fix, büyük üçgen ise hata kaynağı (gyro error, yanlış nesne tanımlama) demektir.`,
            `Açık denizde fix aralığı seyrek olabilirken, kıyıya yakın ve dar sularda fix sıklığı artar. Stajyer, kıyı seyrinde her birkaç dakikada bir pozisyon almanın, parallel indexing tekniğinin ve clearing bearing/clearing range kullanımının önemini kavrar. Tüm pozisyonların seyir jurnaline ve haritaya (veya ECDIS'e) zamanı ile kaydedilmesi temel disiplindir.`,
          ],
          table: {
            caption: `Fix Aralığı Kılavuzu (Eğitim Amaçlı)`,
            headers: ["Seyir Durumu", "Tipik Fix Aralığı", "Birincil Yöntem"],
            rows: [
              ["Açık deniz (ocean)", "Saatte bir veya daha seyrek", "GNSS + DR kontrol"],
              ["Kıyı seyri (coastal)", "Her 6-15 dakika", "Görsel/radar fix"],
              ["Dar su / kanal", "Her 3-6 dakika veya sürekli", "Parallel index, transit"],
              ["Pilotaj / manevra", "Sürekli izleme", "Görsel + radar + ECDIS"],
            ],
          },
        },
        {
          subheading: "5.2 Plotting hataları ve özeleştiri",
          paragraphs: [
            `Stajyerin en değerli öğrenme aracı, kendi plotting hatalarını fark etmesidir. Yanlış nesne tanımlama, parallax hatası, gyro error'un göz ardı edilmesi ve yanlış zaman damgası en sık görülen hatalardır. OOW, stajyerin fix'lerini gözden geçirerek geri bildirim verir; stajyer bu geri bildirimi Training Record Book'a not eder.`,
          ],
        },
      ],
    },
    {
      heading: "6. COLREG Kurallarının Sahada Öğrenilmesi",
      sections: [
        {
          subheading: "6.1 Sorumluluk durumları ve manevra kuralları",
          paragraphs: [
            `Stajyer, COLREG'in en çok uygulanan kurallarını gerçek karşılaşmalarda gözlemler: head-on (Rule 14), crossing (Rule 15), overtaking (Rule 13) durumlarında hangi geminin "stand-on" (yol verecek olan değil, rotasını koruyacak olan) ve hangisinin "give-way" (yol veren) olduğunu öğrenir. Manevranın erken, belirgin ve yeterli olması (Rule 8) ilkesinin neden önemli olduğunu pratikte görür: küçük ve geç manevralar diğer gemi tarafından fark edilmeyebilir.`,
            `Stajyer, "vessels in sight of one another" (Part B Section II) ile "restricted visibility" (Rule 19) kurallarının farklı olduğunu kavrar. Sınırlı görüşte stand-on/give-way ayrımı yoktur; her gemi güvenli hızla seyreder ve radar plotting'e göre çarpışmadan kaçınma manevrası yapar. Stajyer ayrıca dar kanal (Rule 9), trafik ayrım düzenleri (Rule 10) ve manevra kabiliyeti kısıtlı/komuta altında olmayan gemilerin önceliklerini (Rule 18) öğrenir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "COLREG Rule 2 — Responsibility",
              text: `Hiçbir kural, geminin, sahibinin, kaptanının veya mürettebatının ihmalin sonuçlarından sorumluluğunu ortadan kaldırmaz. "İyi denizcilik" (good seamanship) ve durumun özel koşulları her zaman göz önünde bulundurulur; gerekirse kurallardan sapılarak çarpışma önlenir.`,
            },
          ],
        },
        {
          subheading: "6.2 Fenerler, şekiller ve ses işaretleri",
          paragraphs: [
            `Stajyer, gece köprüüstü vardiyalarında diğer gemilerin fenerlerini (Part C) okuyarak gemi tipini, büyüklüğünü ve aspect'ini (geliş açısını) belirlemeyi öğrenir: yan fenerler (kırmızı iskele, yeşil sancak), pruva/kıç direk fenerleri, çekme/itme fenerleri, balıkçı, kılavuz ve manevra kısıtlı gemilerin özel fenerleri. Gündüz şekilleri (top, koni, silindir, bilye) ve sis/manevra ses işaretleri de pratik olarak tanınır.`,
          ],
        },
      ],
    },
    {
      heading: "7. Seyir Jurnali (Logbook) ve Kayıt Disiplini",
      sections: [
        {
          subheading: "7.1 Deck logbook ve bell book",
          paragraphs: [
            `Seyir jurnali, geminin resmi ve hukuki kaydıdır; mahkemede delil değeri taşır. Stajyer, deck logbook'a hangi bilgilerin kaydedildiğini öğrenir: pozisyonlar, rota ve hız değişiklikleri, hava ve deniz durumu, görüş, geçilen önemli noktalar, makine emirleri, drill'ler ve olağandışı olaylar. Manevra ve pilotaj sırasında tutulan bell book (course and engine movement book) ise tüm dümen ve makine emirlerinin saniye hassasiyetinde kaydını içerir.`,
            `Stajyer, kayıtların gerçek zamanlı, okunaklı, kalıcı mürekkeple ve düzeltme yapıldığında üstü çizilerek (asla silinmeden veya karalanmadan) tutulması gerektiğini öğrenir. Sahte veya sonradan değiştirilmiş kayıtlar ciddi disiplin ve hukuki sonuçlar doğurur. Bu disiplin, stajyerin denizci olarak güvenilirliğinin temelidir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Kayıt sahteciliği yapılamaz",
              text: `Logbook üzerinde geçmişe dönük değişiklik, silme veya kaybı gizleme, hem ISM/SMS ihlali hem de hukuki suçtur. PSC ve kaza soruşturmacıları logbook ile diğer kayıtları (ECDIS, VDR) çapraz kontrol eder; tutarsızlık ağır sonuç doğurur.`,
            },
          ],
        },
        {
          subheading: "7.2 VDR ve elektronik kayıtlarla ilişki",
          paragraphs: [
            `Stajyer, VDR (Voyage Data Recorder) ve S-VDR'ın köprüüstü seslerini, radar/ECDIS görüntüsünü, dümen/makine emirlerini ve sensör verilerini sürekli kaydettiğini öğrenir. Bir olay sonrası VDR verisi korunmalıdır (save/preserve butonu). Manuel logbook ile elektronik kayıtların tutarlı olması, geminin ve mürettebatın hukuki korunmasının anahtarıdır.`,
          ],
        },
      ],
    },
    {
      heading: "8. Trafik Değerlendirmesi ve Durum Farkındalığı",
      sections: [
        {
          subheading: "8.1 Bilgi toplama ve önceliklendirme",
          paragraphs: [
            `Yoğun trafikte stajyer, OOW'nin tüm hedefleri eşzamanlı değerlendirmeyi nasıl yönettiğini gözlemler. En yakın CPA/TCPA değerine sahip ve en hızlı yaklaşan hedefe öncelik verilir. Stajyer, "büyük resmi" kaybetmeden tek bir hedefe takılmamak (target fixation) gerektiğini öğrenir; periyodik olarak tüm horizon ve tüm radar menzilleri taranmalıdır.`,
            `Durum farkındalığı (situational awareness); algılama, anlama ve geleceği öngörme olmak üzere üç katmandır. Stajyer, mevcut trafiğin birkaç dakika sonra nasıl gelişeceğini zihinsel olarak projekte etmeyi öğrenir. Yorgunluk, monotonluk ve dikkat dağınıklığının bu farkındalığı nasıl bozduğunu da fark eder.`,
          ],
        },
        {
          subheading: "8.2 BRM ve closed-loop iletişim",
          paragraphs: [
            `BRM (Bridge Resource Management), köprüüstündeki tüm insan ve teknik kaynakların etkin kullanılmasıdır. Stajyer, dümenciye verilen emirlerin nasıl tekrarlandığını (closed-loop communication: "Starboard ten" → "Starboard ten" → "Ten of starboard wheel on") gözlemler ve bu disiplinin yanlış anlamaları nasıl önlediğini öğrenir. Stajyer, fark ettiği bir tehlikeyi çekinmeden ve net biçimde OOW'ye bildirmeyi (challenge and response) öğrenir; hiyerarşi, emniyet bilgisinin paylaşılmasının önüne geçemez.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Stajyerin sesi önemlidir",
              text: `Köprüüstünde bir tehlike, bir alarm veya bir tutarsızlık fark edersen sessiz kalma. "Speak up" kültürü, BRM'nin temelidir; en deneyimsiz kişinin uyarısı bile bir kazayı önleyebilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "9. Eğitim Değerlendirmesi ve TRB ile Bağlantı",
      sections: [
        {
          subheading: "9.1 Yetkinliklerin kayıt altına alınması",
          paragraphs: [
            `Köprüüstü vardiyasında kazanılan her beceri, Training Record Book'taki ilgili STCW yetkinlik maddesine işlenir: fix alma, radar plotting, COLREG uygulaması, ECDIS kullanımı, log tutma vb. Stajyer, her görevden sonra eğitmen zabitin imzasını ve değerlendirmesini alır. Bu kayıtlar, ileride OICNW yeterlilik belgesi başvurusunun temel kanıtıdır.`,
            `Stajyer, öğrendiği her cihaz ve prosedür için kendi notlarını da tutmalıdır: cihazın markası/modeli, özel ayarları, gemiye özgü prosedürler ve karşılaştığı sorunlar. Bu kişisel "bridge familiarisation" defteri, bir sonraki gemiye geçişte ve sertifika sınavına hazırlıkta paha biçilmez olur.`,
          ],
        },
        {
          subheading: "9.2 Geri bildirim döngüsü",
          paragraphs: [
            `Etkili eğitim, düzenli geri bildirimle olur. Stajyer, OOW ve Kaptan'dan aldığı geri bildirimi savunmacı olmadan kabul eder ve bir sonraki vardiyada uygular. Yapılan hatalar (yanlış fix, geç manevra önerisi, eksik kayıt) öğrenme fırsatıdır; önemli olan aynı hatayı tekrarlamamaktır.`,
          ],
        },
      ],
    },
    {
      heading: "10. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "10.1 Köprüüstü vardiyası stajyer kontrol listesi",
          bullets: [
            `Standing Orders ve Night Order Book okundu ve imzalandı mı?`,
            `Kaptanı çağırma kriterleri ezberlendi mi?`,
            `Radar/ARPA temel kontrolleri ve CPA/TCPA okuması yapılabiliyor mu?`,
            `ECDIS emniyet ayarları (safety contour/depth) anlaşıldı mı?`,
            `AIS verisi radar ile çapraz doğrulanıyor mu?`,
            `Pozisyon fix'i (görsel/radar) bağımsız olarak alınabiliyor mu?`,
            `COLREG sorumluluk durumları ve fenerler tanınıyor mu?`,
            `Seyir jurnali doğru ve eksiksiz tutuluyor mu?`,
            `Lookout görevi her zaman önceliklendiriliyor mu?`,
            `Eğitmen zabitin imza/değerlendirmesi TRB'ye işlendi mi?`,
          ],
          paragraphs: [
            `Köprüüstü vardiyasına eğitim amaçlı katılım, güverte stajyerinin geleceğin vardiya zabitine dönüşeceği en kritik sahnedir. Stajyer burada teknik beceriyi, mevzuat bilgisini ve en önemlisi profesyonel disiplini birlikte kazanır. Bağımsız karar yetkisi olmaması bir kısıtlama değil, hata yapmadan ve sorumluluk baskısı olmadan öğrenme ayrıcalığıdır. Bu ayrıcalığı sürekli gözlem, soru sorma ve titiz kayıt ile en verimli şekilde kullanmak, stajyerin kendi sorumluluğundadır.`,
          ],
        },
      ],
    },
  ],
};

export default content;
