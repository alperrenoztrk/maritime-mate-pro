import type { MachineSubTopicContent } from "./machineTopicDetailContent";

type ContentMap = Record<string, Record<string, MachineSubTopicContent>>;

const content5: ContentMap = {
  // ═══════════════════════════════════════════════════════════════
  // YARDIMCI MAKİNELER — Eksik alt başlıklar
  // ═══════════════════════════════════════════════════════════════
  auxiliary: {
    "Yük paylaşımı ve frekans regülasyonu": {
      title: "Yük Paylaşımı ve Frekans Regülasyonu",
      introduction: "Paralel çalışan jeneratörlerde yük paylaşımı, her jeneratörün kapasitesi oranında güç üretmesini sağlayan kontrol mekanizmasıdır.",
      sections: [
        { heading: "Aktif Güç Paylaşımı", paragraphs: ["Aktif güç (kW) paylaşımı frekans (hız) kontrolü ile yapılır. Governor droop ayarı eşit olan jeneratörler eşit yük paylaşır.", "Droop kontrol: Yük arttıkça frekans düşer. İki jeneratörün droop eğrileri kesişim noktasında yük paylaşımı belirlenir."], formula: { expression: "Droop (%) = [(fboş − ftam yük) / fnominal] × 100", variables: ["Tipik droop: %3-5", "Eşit droop → eşit yük paylaşımı"] } },
        { heading: "Reaktif Güç Paylaşımı", paragraphs: ["Reaktif güç (kVAr) paylaşımı gerilim (AVR droop) kontrolü ile yapılır. Reactive current compensation veya cross-current compensation kullanılır.", "Dengesiz reaktif güç paylaşımı jeneratör aşırı ısınmasına neden olur."] },
        { heading: "Sayısal Örnek", paragraphs: [], example: { problem: "500 kW ve 750 kW kapasiteli iki jeneratör paralel çalışmaktadır. Toplam yük 800 kW ise her jeneratörün yük paylaşımını bulunuz.", steps: ["Kapasite oranı: 500/(500+750) = 0.4 ve 750/(500+750) = 0.6", "G1 yükü: 0.4 × 800 = 320 kW", "G2 yükü: 0.6 × 800 = 480 kW"], result: "500 kW jeneratör 320 kW (%64), 750 kW jeneratör 480 kW (%64) yük taşır." } }
      ],
      keyPoints: ["Eşit olmayan droop ayarı dengesiz yük paylaşımına neden olur.", "İzochronous mod yalnızca tek jeneratör çalışmasında kullanılır.", "Güç yönetim sistemi (PMS) yük paylaşımını otomatik izler."]
    },
    "Acil jeneratör ve SOLAS gereklilikleri": {
      title: "Acil Jeneratör ve SOLAS Gereklilikleri",
      introduction: "Acil jeneratör, ana güç kaybında hayati önemdeki ekipmanların çalışmasını sağlayan bağımsız güç kaynağıdır.",
      sections: [
        { heading: "SOLAS Reg. II-1/42-44 Gereklilikleri", paragraphs: ["Acil jeneratör makine dairesi dışında, ana yangın sınırının üzerinde konumlandırılmalıdır.", "Ana güç kaybından itibaren 45 saniye içinde otomatik devreye girmelidir.", "Yakıt tankı en az 18 saat kesintisiz çalışma kapasitesinde olmalıdır (yolcu gemileri: 36 saat)."] },
        { heading: "Beslenmesi Gereken Kritik Yükler", paragraphs: [], table: { headers: ["Yük", "Süre"], rows: [["Seyir fenerleri", "18/36 saat"], ["Acil yangın pompası", "18/36 saat"], ["Dümen makinesi (bir set)", "18/36 saat"], ["GMDSS", "18/36 saat"], ["Genel alarm ve PA sistemi", "18/36 saat"], ["Acil aydınlatma", "18/36 saat"], ["Su geçirmez kapılar", "18/36 saat"], ["Yangın algılama", "18/36 saat"]] } }
      ],
      keyPoints: ["Acil jeneratör haftalık test çalıştırması yapılmalıdır.", "Otomatik başlatma sistemi (air start veya battery start) güvenilir olmalıdır.", "Acil jeneratör yakıt sistemi bağımsız olmalıdır."]
    },
    "Kompozit kazan tasarımı": {
      title: "Kompozit Kazan Tasarımı",
      introduction: "Kompozit kazan, hem yakıt yakarak hem de egzoz gazı ekonomizerinden gelen atık ısıyı kullanarak buhar üreten çift amaçlı gemi kazanıdır.",
      sections: [
        { heading: "Yapı ve Çalışma", paragraphs: ["Kompozit kazan, ateş borulu bölüm (oil-fired) ve ekonomizer bölüm (exhaust gas) olmak üzere iki bölümden oluşur. Her iki bölüm ortak bir buhar alanına ve su alanına sahiptir.", "Seyirde ana makine yeterli yükte çalışırken ekonomizer bölümü buhar ihtiyacını karşılar. Yakıt yanma bölümü otomatik olarak devre dışı kalır. Limanda veya düşük yükte yakıt yanma bölümü devreye girer."] },
        { heading: "Kapasite Bilgisi", paragraphs: [], table: { headers: ["Çalışma Modu", "Buhar Kaynağı", "Tipik Kapasite"], rows: [["Tam yük seyir", "Sadece ekonomizer", "1500-2500 kg/h"], ["Kısmi yük seyir", "Ekonomizer + yakıt", "Değişken"], ["Liman", "Sadece yakıt", "500-1500 kg/h"]] } }
      ],
      keyPoints: ["Kompozit kazan yakıt tasarrufu sağlar.", "Ekonomizer bölümünde is (soot) birikimi yangın riski oluşturur.", "Soot blowing düzenli yapılmalıdır."]
    },
    "Egzoz gazı ekonomizeri": {
      title: "Egzoz Gazı Ekonomizeri",
      introduction: "Egzoz gazı ekonomizeri (EGE), ana makine egzozundaki atık ısıyı geri kazanarak servis buharı üreten kritik bir ısı eşanjörüdür. Doğru işletildiğinde yardımcı kazan yükünü, yakıt tüketimini ve dolaylı CO₂ emisyonunu anlamlı biçimde düşürür; yanlış işletildiğinde ise asit korozyonu, soot fire, tüp hasarı ve buhar kalitesi sorunlarına yol açabilir.",
      sections: [
        {
          heading: "Temel Prensip ve Termodinamik Arka Plan",
          paragraphs: [
            "Ana makineden çıkan egzoz gazı, ekonomizerin gaz tarafında akarken boru içindeki besi suyuna ısı transfer eder. Bu süreçte su sıcaklığı yükselir, doymuş koşullara yaklaşır ve yeterli ısı akısında buhar üretimi başlar.",
            "Ekonomizer, atık ısı kazanı (waste heat boiler) olarak değerlendirilir. Amaç, bacadan atılan entalpinin bir bölümünü geri kazanarak yardımcı kazanın yakması gereken yakıt miktarını azaltmaktır.",
            "Isı geri kazanım performansı; motor yükü, egzoz debisi, egzoz giriş sıcaklığı, gaz/su tarafı kirlenme (fouling), su kimyası, drum seviye kontrol kalitesi ve otomasyon ayarlarının birlikte etkisiyle belirlenir."
          ],
          formula: {
            expression: "Q = ṁgaz · cp,gaz · (Tgiriş − Tçıkış)",
            variables: [
              "Q: Ekonomizerde geri kazanılan ısı (kW)",
              "ṁ_gaz: Egzoz gazı debisi (kg/s)",
              "cp,gaz: Egzoz gazı özgül ısısı (kJ/kg·K)",
              "Tgiriş, Tçıkış: Ekonomizer giriş/çıkış egzoz sıcaklığı (°C)"
            ]
          }
        },
        {
          heading: "Sistem Mimarisi ve Ana Ekipmanlar",
          paragraphs: [
            "Tipik bir EGE sisteminde ekonomizer gövdesi, buhar-su drum'u, sirkülasyon hattı, feedwater kontrol vanası, sürekli/dip blowdown hattı, by-pass damper, emniyet ventilleri, soot blower sistemi ve ilgili otomasyon loop'ları bulunur.",
            "Doğal sirkülasyonlu sistemlerde akış, yoğunluk farkı ile sürdürülür; zorlanmış sirkülasyonlu sistemlerde pompa ile akış güvence altına alınır. Yük değişiminin fazla olduğu operasyonlarda zorlanmış sirkülasyon, kontrol kararlılığı açısından avantaj sağlayabilir."
          ],
          table: {
            headers: ["Bileşen", "Temel Görev", "Arıza Belirtisi", "Operasyonel Sonuç"],
            rows: [
              ["By-pass damper", "Egzozu ekonomizerden yönlendirme", "Damper sıkışması / pozisyon sapması", "Buhar üretiminde ani dalgalanma"],
              ["Soot blower", "Gaz tarafı kurum temizliği", "ΔP artışı, baca sıcaklık trend bozulması", "Verim düşüşü ve soot fire riski"],
              ["Drum seviye kontrolü", "Emniyetli su seviyesi", "High/Low level alarm", "Carry-over veya tüp aşırı ısınması"],
              ["Feedwater control valve", "Buhar talebine göre su besleme", "Hunting/kararsızlık", "Buhar basıncında salınım"],
              ["Emniyet ventili", "Aşırı basınç koruması", "Sette açmama/sürekli sızdırma", "Emniyet riski / enerji kaybı"],
              ["Blowdown hattı", "TDS kontrolü", "Vana kaçırma/tıkanma", "Köpürme, carry-over, su kaybı"]
            ]
          }
        },
        {
          heading: "Gemide Kullanım: Seyir, Manevra ve Liman Senaryoları",
          paragraphs: [
            "Seyirde ana makine yükü arttıkça egzoz entalpisi yükselir ve ekonomizer buhar üretimi artar. Tipik yaklaşım, ekonomizer öncelikli buhar üretimi; eksik kalan kısmın yardımcı kazan ile tamamlanmasıdır.",
            "Manevra ve düşük yük geçişlerinde egzoz sıcaklığı/debisi azalacağından buhar üretimi kararsız hale gelebilir. Bu nedenle yardımcı kazan auto-standby modda tutulmalı, seviye kontrolünün düşük yükteki dinamiği yakından izlenmelidir.",
            "Liman koşullarında ana makine duruyorsa ekonomizer üretimi yoktur; tüm buhar talebi yardımcı kazana geçer. Liman öncesi geçiş planı yapılmazsa buhar tüketicilerinde basınç düşümü yaşanabilir."
          ],
          bulletPoints: [
            "Seyir başlangıcında damper pozisyon geri bildirimi ve kontrol loop doğrulaması yapılır.",
            "Yük düşüşlerinde low-water riskine karşı seviye trendi anlık takip edilir.",
            "Liman geçişinde yardımcı kazan devreye alma zamanı buhar tüketim profiline göre planlanır.",
            "Operatör vardiya notunda EGE ΔP, Tgiriş/Tçıkış, drum level ve blowdown durumunu birlikte kaydeder."
          ]
        },
        {
          heading: "Kritik Limitler, Alarm Felsefesi ve Erken Uyarı",
          paragraphs: [
            "Ekonomizer çıkış egzoz sıcaklığının asit çiğ noktası altına düşmesi, özellikle yüksek sülfürlü yakıtta düşük sıcaklık korozyonunu hızlandırır. Bu nedenle enerji geri kazanımı artırılırken minimum güvenli sıcaklık limiti korunmalıdır.",
            "Gaz tarafında kurum birikimi arttığında diferansiyel basınç yükselir, ısı transferi düşer ve lokal sıcak noktalar oluşabilir. Bu durum soot fire için erken uyarı kabul edilmelidir.",
            "Su tarafında düşük seviye tüp hasarı; yüksek seviye carry-over riski doğurur. Carry-over downstream ekipmanda su darbesi, vana/armatür hasarı ve kondens kalite sorunlarına neden olabilir."
          ],
          table: {
            headers: ["İzlenen Parametre", "Tipik Hedef/Aralık", "Uyarı İşareti", "Potansiyel Sonuç"],
            rows: [
              ["Tgiriş (egzoz)", "220-380°C", "Beklenenden düşük", "Yetersiz buhar üretimi"],
              ["Tçıkış (egzoz)", "> 160°C (yakıt ve üretici limitine bağlı)", "Hızla düşme", "Asit korozyonu"],
              ["Gaz tarafı ΔP", "Stabil trend", "Kademeli artış", "Kurum birikimi/yangın riski"],
              ["Drum seviye", "Normal band", "Hunting / ani sıçrama", "Low-level trip veya carry-over"],
              ["Buhar basıncı", "Talebe uygun stabil", "Dalgalanma", "Tüketicilerde performans kaybı"],
              ["TDS/iletkenlik", "SMS limitinde", "Yükselme", "Köpürme ve buhar saflığı sorunu"]
            ]
          }
        },
        {
          heading: "Yakıt Tipine Göre Operasyonel Riskler ve MARPOL Bağlamı",
          paragraphs: [
            "HFO operasyonunda sülfür ve kül kaynaklı etkiler daha belirgindir: asit çiğ noktası korozyonu, kurum birikimi ve ısı transfer yüzeylerinde kirlenme daha hızlı gelişebilir. Bu nedenle çıkış sıcaklığı ve temizlik periyodu daha konservatif yönetilir.",
            "VLSFO operasyonunda sülfür yükü azalsa da yakıt karışım karakteri nedeniyle kurum/fouling davranışı değişken olabilir. Bunker partileri arasında trend karşılaştırması yapılmadan sabit bakım periyodu uygulamak verimsiz olabilir.",
            "MGO kullanımında genel olarak kurum yükü düşer; ancak düşük makine yüklerinde egzoz entalpisi de düşeceği için ekonomizer buhar üretimi gerileyebilir. Operasyonel fayda, yük profili ile birlikte değerlendirilmelidir.",
            "LNG/dual-fuel modunda SOx neredeyse sıfırlanır; buna karşın bazı operasyon profillerinde egzoz sıcaklığı düşük kalabilir ve buhar üretim kapasitesi sınırlanabilir. Yardımcı kazan desteği daha sık gerekebilir.",
            "MARPOL Annex VI perspektifinde ekonomizer performansının korunması, dolaylı CO₂ azaltımı ve CII iyileşmesi için önemlidir. Ekonomizer kirlenmesi nedeniyle yardımcı kazanın fazla yakıt yakması, aynı seferde daha yüksek karbon yoğunluğu anlamına gelir."
          ],
          table: {
            headers: ["Yakıt", "Baskın Risk", "MARPOL/Operasyon Etkisi", "Önerilen Kontrol"],
            rows: [
              ["HFO", "Asit korozyonu + ağır kurum", "Yardımcı kazan yükü artarsa CO₂ artar", "Çıkış sıcaklık limiti + sık soot blowing"],
              ["VLSFO", "Değişken fouling davranışı", "Verim dalgalanması CII'yi etkiler", "Bunker bazlı trend analizi"],
              ["MGO", "Düşük yükte yetersiz ısı geri kazanımı", "Liman/seyir geçişinde buhar açığı", "Geçişte yardımcı kazan planı"],
              ["LNG (DF)", "Düşük egzoz sıcaklık profili", "Buhar üretim kapasitesi kısıtı", "Hibrit buhar stratejisi"]
            ]
          }
        },
        {
          heading: "Arıza Modları, Soot Fire ve Acil Müdahale Yaklaşımı",
          paragraphs: [
            "Soot fire, özellikle kurum birikimi yüksek ve yük değişimi fazla operasyonlarda kritik bir risktir. Belirtiler arasında baca sıcaklığında anormal artış, kıvılcım/alev gözlemi, ΔP anormalliği ve beklenmedik buhar davranışı yer alır.",
            "İlk müdahalede ana amaç yangının büyümesini önlemek ve termal şok yaratmamaktır. Bu nedenle üretici/SMS prosedürüne uygun yük azaltma, soot blowing'in durdurulması, kontrollü izolasyon ve gerektiğinde planlı soğutma uygulanır.",
            "Tube leak arızasında drum seviyesinde açıklanamayan düşüş, egzoz tarafında buhar izleri veya kontaminasyon belirtileri görülür. Kaçak şüphesinde ekonomizer izole edilmeli, yardımcı kazan devreye alınmalı ve güvenli onarım planı hazırlanmalıdır."
          ],
          bulletPoints: [
            "Acil durumda prosedür dışı ani soğutma termal şok kaynaklı ilave hasar doğurabilir.",
            "Soot fire sonrası devreye alma öncesi detaylı iç muayene ve kök neden analizi yapılmalıdır.",
            "Kök neden analizi: yakıt kalitesi, yük profili, soot blowing disiplini, seviye kontrol ayarı ve bakım kayıtlarıyla birlikte incelenmelidir."
          ]
        },
        {
          heading: "Bakım, Muayene ve Performans İzleme Programı",
          paragraphs: [
            "EGE'de güvenli ve verimli işletme için planlı bakım şarttır. Gaz tarafı temizlik (soot blowing / offline cleaning), su tarafı kimyasal kontrol, valf ve damper fonksiyon testleri, sensör kalibrasyonu periyodik yürütülmelidir.",
            "Sadece periyodik bakım değil, trend bazlı kestirimci yaklaşım da önemlidir. Özellikle ΔP artış hızı, çıkış sıcaklığı sapması, buhar üretim-güç oranı ve blowdown tüketimi birlikte izlenerek erken bakım kararı alınabilir.",
            "Klas ve şirket SMS gereksinimleri doğrultusunda test, muayene ve bakım kayıtlarının eksiksiz tutulması PSC denetimleri açısından da kritik önemdedir."
          ],
          table: {
            headers: ["Kontrol/Bakım Kalemi", "Önerilen Periyot", "Amaç"],
            rows: [
              ["Soot blowing", "Günlük-haftalık (yük/yakıta bağlı)", "Gaz tarafı ısı transferini korumak"],
              ["Drum level kontrol testi", "Vardiya/günlük", "Low/high level riskini azaltmak"],
              ["TDS ve blowdown kontrolü", "Günlük", "Buhar saflığını korumak"],
              ["Damper ve aktüatör fonksiyon testi", "Aylık", "Geçiş emniyetini sağlamak"],
              ["Sensör kalibrasyonu", "Planlı bakım döneminde", "Ölçüm güvenilirliği"],
              ["İç muayene (offline)", "Klas/SMS planına göre", "Korozyon, çatlak, fouling tespiti"]
            ]
          }
        },
        {
          heading: "Kısa Hesap Yaklaşımı, Buhar Tahmini ve Örnek Karşılaştırma",
          paragraphs: [
            "Vardiya mühendisliği açısından pratik hesap yöntemi, önce geri kazanılan ısıyı (Q), ardından yaklaşık buhar debisini hesaplamaktır. Böylece yardımcı kazanın hangi yükte destek vereceği hızlıca tahmin edilir.",
            "Aynı yükte ekonomik karşılaştırma yapılırken, ekonomizer aktif/pasif durumda yardımcı kazan yakıt tüketim farkı (kg/h) ve sefer süresine etkisi değerlendirilir."
          ],
          formula: {
            expression: "Q = ṁgaz · cp,gaz · (Tgiriş − Tçıkış)\nṁbuhar ≈ Q / hfg\nYakıt tasarrufu ≈ (Q / ηkazan) / LHV",
            variables: [
              "ṁbuhar: Yaklaşık buhar üretimi (kg/s)",
              "hfg: Buharlaşma gizli ısısı (kJ/kg)",
              "ηkazan: Yardımcı kazan verimi",
              "LHV: Yakıt alt ısıl değeri"
            ]
          },
          example: {
            problem: "ṁ_gaz = 20 kg/s, cp,gaz = 1.08 kJ/kg·K, Tgiriş = 340°C, Tçıkış = 220°C, hfg = 2100 kJ/kg için Q ve buhar debisini hesaplayınız.",
            steps: [
              "Q = 20 × 1.08 × (340 − 220) = 2592 kW",
              "ṁbuhar ≈ 2592 / 2100 = 1.234 kg/s",
              "Saatlik buhar ≈ 1.234 × 3600 = 4442 kg/h (~4.44 t/h)"
            ],
            result: "Bu çalışma noktasında ekonomizer yaklaşık 2.59 MW geri kazanım ve 4.44 t/h buhar üretim potansiyeli sağlar."
          }
        },
        {
          heading: "Operasyonel Karar Matrisi (Pratik Özet)",
          paragraphs: [
            "Aşağıdaki karşılaştırma, vardiya sırasında hızlı karar vermek için kullanılabilir. Amaç; güvenlik limitlerini ihlal etmeden maksimum ısı geri kazanımı sağlamaktır."
          ],
          table: {
            headers: ["Durum", "İlk Aksiyon", "İkinci Aksiyon", "Takip Edilecek Parametre"],
            rows: [
              ["ΔP artıyor", "Soot blowing planını sıklaştır", "Offline cleaning planla", "ΔP trendi + Tçıkış"],
              ["Tçıkış çok düşüyor", "Damper/yük optimizasyonu", "Korozyon kontrol muayenesi", "Tçıkış + metal sıcaklığı"],
              ["Drum level hunting", "Kontrol loop tuning kontrolü", "Feedwater vana/ölçüm doğrulaması", "Seviye trendi + buhar basıncı"],
              ["Buhar açığı oluştu", "Yardımcı kazan kademeli devreye al", "Buhar tüketicilerini önceliklendir", "Header basıncı + tüketim"],
              ["Soot fire belirtisi", "Prosedüre göre yük azalt/izole et", "Acil durum planını uygula", "Baca sıcaklığı + görsel belirti"]
            ]
          }
        }
      ],
      keyPoints: [
        "EGE, yakıt ekonomisi ve MARPOL Annex VI operasyon hedefleri için doğrudan etkili bir ekipmandır; performans kaybı CII sonuçlarına yansır.",
        "Asit çiğ noktası korozyonu, soot birikimi ve drum seviye kontrolü en kritik üç risk alanıdır.",
        "Trend bazlı izleme (Tgiriş/Tçıkış, ΔP, seviye, TDS, buhar basıncı) arıza öncesi erken uyarı sağlar.",
        "Yakıt tipine göre bakım/temizlik stratejisi değiştirilmeli; tek tip periyot yaklaşımından kaçınılmalıdır.",
        "Hızlı enerji dengesi hesabı, yardımcı kazan yük planlamasında pratik karar desteği sunar."
      ]
    },

    "Kazan su kimyası ve işlem": {
      title: "Kazan Su Kimyası ve İşlem",
      introduction: "Kazan suyunun kimyasal özelliklerinin kontrol altında tutulması, kazan ömrü ve güvenliği için kritiktir. Yanlış su kimyası korozyon, kireçlenme ve köpürmeye yol açar.",
      sections: [
        { heading: "Kontrol Parametreleri", paragraphs: [], table: { headers: ["Parametre", "Kabul Aralığı", "Yüksekliğinde Etki"], rows: [["pH", "10.5-11.5", "Düşükse korozyon, yüksekse köpürme"], ["Klorür (Cl⁻)", "< 300 ppm", "Yüksekse deniz suyu sızıntısı"], ["Toplam sertlik (TH)", "< 5 ppm CaCO₃", "Yüksekse kireçlenme"], ["Fosfat (PO₄)", "20-40 ppm", "Düşükse yetersiz koruma"], ["Alkalinite (P)", "100-300 ppm CaCO₃", "Yüksekse köpürme"], ["Çözünmüş oksijen", "< 0.02 ppm", "Yüksekse pitting korozyonu"]] } },
        { heading: "Kimyasal İşlem", paragraphs: ["Su yumuşatma: Kalsiyum ve magnezyum iyonlarının uzaklaştırılması.", "Oksijen giderme: Sodyum sülfit (Na₂SO₃) veya hidrazin (termal de-aerator ile birlikte). Sülfit, oksijenle reaksiyona girerek sülfata dönüşür.", "Alkalilik kontrolü: Sodyum hidroksit veya trisodyum fosfat dozajı.", "Blowdown: Çözünmüş katıların konsantrasyonunu kontrol etmek için kazan suyunun bir kısmının tahliye edilmesi."] }
      ],
      keyPoints: ["Günlük su testi zorunludur.", "Deniz suyu sızıntısı en tehlikeli durumdur (klorür kontrolü).", "Kimyasal dozaj otomatik veya manuel yapılabilir."]
    },
    "Kazan emniyet düzenleri": {
      title: "Kazan Emniyet Düzenleri",
      introduction: "Kazan güvenlik düzenleri, aşırı basınç, düşük su seviyesi ve alev arızası gibi tehlikeli durumları önleyen koruma sistemleridir.",
      sections: [
        { heading: "Emniyet Bileşenleri", paragraphs: [], table: { headers: ["Cihaz", "Fonksiyon", "Ayar"], rows: [["Emniyet supabı", "Aşırı basınçta buharı tahliye eder", "Çalışma basıncının 1.03-1.1 katı"], ["Düşük su seviye alarmı", "Su seviyesi düşüşünü uyarır", "2 seviye: alarm ve trip"], ["Alev gözetleyicisi", "Alevin sönmesini algılar", "UV veya IR sensör"], ["Basınç şalteri", "Aşırı/düşük basınç koruması", "Çalışma basıncına göre"], ["Sıcaklık sensörü", "Egzoz/su sıcaklık izleme", "Limit değerler"]] } },
        { heading: "Düşük Su Seviyesi Koruması", paragraphs: ["İki kademeli koruma: Birinci kademe alarm verir ve operatörü uyarır. İkinci kademe yakıcıyı (burner) otomatik olarak kapatır.", "Düşük su seviyesinde kazan çalıştırılması tüp/boru patlamasına neden olabilir. Bu durum en ciddi kazan kazalarının başında gelir."] }
      ],
      keyPoints: ["Emniyet supabı 6 ayda bir kaldırma testi yapılmalıdır.", "Su seviye gözetleme camı (gauge glass) günlük blowdown ile temizlenmelidir.", "Otomatik brülör kontrol sistemi periyodik test edilmelidir."]
    },
    "Kazan bakım ve muayene": {
      title: "Kazan Bakım ve Muayene",
      introduction: "Kazan bakımı, güvenli ve verimli çalışmayı sürdürmek için düzenli yapılması gereken teknik işlemlerdir.",
      sections: [
        { heading: "Periyodik Bakım İşleri", paragraphs: [], table: { headers: ["İşlem", "Periyot", "Amaç"], rows: [["Su testi", "Günlük", "Kimyasal değerleri kontrol"], ["Gauge glass blowdown", "Günlük", "Doğru seviye gösterimi"], ["Soot blowing", "Günlük/Haftalık", "Is birikimini temizleme"], ["Emniyet supap testi", "6 ay", "Açma basıncı doğrulama"], ["İç muayene", "2.5 yıl (klas)", "Korozyon, çatlak kontrolü"], ["Hidrostatik test", "5 yıl (klas)", "Yapısal bütünlük"]] } },
        { heading: "İç Muayene", paragraphs: ["Kazan soğutulur, boşaltılır ve havalandırılır. İç yüzeyler korozyon, pitting, kireçlenme ve çatlak açısından incelenir.", "Tüp/boru duvar kalınlığı ultrasonik ölçümle kontrol edilir."] }
      ],
      keyPoints: ["Kazan bakımı klas kuruluşu takvim ve koşullarına tabidir.", "İç muayene öncesi kapalı alan prosedürü uygulanmalıdır.", "Hidrostatik test basıncı çalışma basıncının 1.5 katıdır."]
    },
    "Ters ozmoz (RO) sistemi": {
      title: "Ters Ozmoz (RO) Sistemi",
      introduction: "Ters ozmoz, yarı geçirgen membran kullanarak deniz suyundan tuz ve safsızlıkları ayıran modern tatlı su üretim yöntemidir.",
      sections: [
        { heading: "Çalışma Prensibi", paragraphs: ["Deniz suyu 55-70 bar basınçla yarı geçirgen membrana basılır. Su molekülleri membrandan geçerken tuz ve mineraller geride kalır. Permeat (ürün su) ve konsantrat (reject) olmak üzere iki akış oluşur.", "Geri kazanım oranı (recovery rate) deniz suyunda %35-45 arasındadır."] },
        { heading: "Sistem Bileşenleri", paragraphs: [], table: { headers: ["Bileşen", "Fonksiyon"], rows: [["Ön filtre (5-25 μm)", "Partikülleri uzaklaştırma"], ["Yüksek basınç pompası", "Membrana gerekli basıncı sağlama"], ["RO membran modülleri", "Tuz ayrımı (%98-99.5)"], ["Enerji geri kazanım cihazı", "Konsantrat basıncından enerji geri kazanımı"], ["Mineralleştirme ünitesi", "İçme suyu kalitesi için mineral ekleme"]] } },
        { heading: "Performans Karşılaştırma", paragraphs: [], table: { headers: ["Parametre", "Evaporatör", "Ters Ozmoz"], rows: [["Enerji kaynağı", "Atık ısı", "Elektrik"], ["Üretim kapasitesi", "10-30 ton/gün", "5-100+ ton/gün"], ["Motor yükü bağımlılığı", "Yüksek", "Düşük"], ["Bakım", "Düşük", "Membran değişimi"], ["Enerji tüketimi", "~8 kWh/ton", "3-6 kWh/ton"]] } }
      ],
      keyPoints: ["RO sistemi motor yükünden bağımsız çalışabilir.", "Membran ömrü 3-5 yıldır; kimyasal temizlik (CIP) ömrü uzatır.", "Ön arıtma membran kirliğini (fouling) önlemek için kritiktir."]
    },
    "Su kalitesi standartları": {
      title: "Su Kalitesi Standartları",
      introduction: "Gemide üretilen tatlı suyun kalitesi WHO içme suyu standartlarına uygun olmalıdır.",
      sections: [
        { heading: "Kalite Parametreleri", paragraphs: [], table: { headers: ["Parametre", "İçme Suyu Limiti", "Teknik Su"], rows: [["Tuzluluk (TDS)", "< 500 ppm", "< 5 ppm (kazan)"], ["Klorür", "< 250 ppm", "< 10 ppm (kazan)"], ["pH", "6.5-8.5", "10.5-11.5 (kazan)"], ["Bakteri (koliform)", "0 / 100 ml", "Uygulanmaz"], ["Serbest klor", "0.2-0.5 ppm", "Uygulanmaz"]] } },
        { heading: "Dezenfeksiyon", paragraphs: ["UV sterilizasyon, klorlama veya gümüş iyonizasyonu ile içme suyunda bakteri kontrolü sağlanır. Salinometre ile tuzluluk sürekli izlenir."] }
      ],
      keyPoints: ["Salinometre alarmı 5 ppm'de set edilmelidir.", "İçme suyu tankları yılda en az bir kez temizlenip dezenfekte edilmelidir.", "Su numunesi analizi periyodik olarak yapılmalıdır."]
    },
    "Purifier ve clarifier farkı": {
      title: "Purifier ve Clarifier Farkı",
      introduction: "Santrifüj separatörler purifier veya clarifier modunda çalıştırılabilir. İki mod arasındaki temel fark su ayırma kapasitesidir.",
      sections: [
        { heading: "Karşılaştırma", paragraphs: [], table: { headers: ["Özellik", "Purifier", "Clarifier"], rows: [["Su ayırma", "Evet", "Hayır (çok az)"], ["Gravity disc", "Var", "Yok"], ["Çıkış", "Yağ + su (ayrı)", "Yalnızca temiz yağ"], ["Kullanım", "Birinci aşama", "İkinci aşama"], ["Katı ayırma", "İyi", "Çok iyi"]] } },
        { heading: "Arıtma Düzeni", paragraphs: ["Tipik yakıt arıtma düzeni: Settling tank → Purifier → Clarifier → Servis tank.", "Bazı modern sistemlerde (ALCAP gibi) purifier ve clarifier ayrımı otomatik olarak yapılır; gravity disc değişimi gerekmez."] }
      ],
      keyPoints: ["Gravity disc yanlış seçilirse yağ kaybı veya yetersiz su ayrımı olur.", "ALCAP sistemi yağ-su arayüzünü otomatik algılar.", "Purifier çalışma sıcaklığı yakıtın viskozitesine göre ayarlanır."]
    },
    "Gravity disc seçimi": {
      title: "Gravity Disc Seçimi",
      introduction: "Gravity disc (damper ring), purifier modunda çalışan separatörde yağ-su arayüzünün konumunu belirleyen kritik bileşendir.",
      sections: [
        { heading: "Seçim Prensibi", paragraphs: ["Gravity disc çapı, arıtılacak akışkanın yoğunluğuna göre seçilir. Yoğunluk arttıkça daha büyük çaplı disc kullanılır.", "Yanlış seçim: Çok büyük disc → yağ su çıkışından akar (yağ kaybı). Çok küçük disc → su yağ çıkışına karışır (yetersiz ayırma)."], formula: { expression: "Seçim kriteri: ρyakıt / ρsu oranına göre üretici tablosu", variables: ["ρyakıt: 15°C'de yakıt yoğunluğu (kg/m³)", "ρsu: 1000 kg/m³ (tatlı su)"] } },
        { heading: "Pratik Uygulama", paragraphs: ["Yakıt bunker delivery note (BDN) üzerindeki yoğunluk değeri ve arıtma sıcaklığındaki yoğunluk kullanılarak üretici nomogramından uygun disc seçilir.", "Sıcaklık yoğunluğu etkiler: Sıcaklık arttıkça yoğunluk düşer."] }
      ],
      keyPoints: ["Her yeni yakıt partisinde gravity disc uygunluğu kontrol edilmelidir.", "ALCAP sistemlerde gravity disc değişimi gerekmez.", "Deneme çalıştırma ile su çıkışından yağ gelip gelmediği kontrol edilir."]
    },
    "Otomatik desludge ve kontrol": {
      title: "Otomatik Desludge ve Kontrol",
      introduction: "Otomatik desludge, separatör tamburunda biriken katı atıkların ve suyun periyodik olarak otomatik boşaltılması işlemidir.",
      sections: [
        { heading: "Çalışma Mekanizması", paragraphs: ["Tambur alt kısmındaki slayt pistonlar (sliding piston) hidrolik kontrol suyu ile açılır. Biriken sludge merkezkaç kuvvetiyle sludge tank'a atılır.", "Desludge aralığı zamana veya sludge miktarına göre ayarlanır. Modern sistemlerde su sensörü sludge birikimini algılar ve optimum zamanda desludge yapar."] },
        { heading: "Operasyonel Parametreler", paragraphs: [], table: { headers: ["Parametre", "Tipik Değer"], rows: [["Desludge aralığı", "30-90 dakika (yakıta göre)"], ["Desludge süresi", "0.3-0.5 saniye"], ["Kontrol suyu basıncı", "2-3 bar"], ["Sludge tank kapasitesi", "Toplam yakıt kapasitesinin %2'si"]] } }
      ],
      keyPoints: ["Aşırı sık desludge yağ kaybına neden olur.", "Yetersiz desludge ayırma verimini düşürür.", "Kontrol suyu basıncı ve kalitesi düzgün desludge için kritiktir."]
    },
    "Yakıt arıtma sırası ve sıcaklık": {
      title: "Yakıt Arıtma Sırası ve Sıcaklık",
      introduction: "Yakıt arıtma, HFO'nun motorlarda güvenle yakılabilmesi için gerekli ön işlem sürecidir. Doğru sıralama ve sıcaklık kontrolü arıtma verimini belirler.",
      sections: [
        { heading: "Arıtma Sırası", paragraphs: ["1. Bunker tank → 2. Settling tank (60-70°C'de çökelme) → 3. Purifier (98°C'de arıtma) → 4. Clarifier (veya ikinci purifier) → 5. Servis tank → 6. Yakıt besleme ve sirkülasyon → 7. Viskozite kontrol ünitesi → 8. Motor enjektörleri."] },
        { heading: "Sıcaklık Gereklilikleri", paragraphs: [], table: { headers: ["Aşama", "Sıcaklık", "Amaç"], rows: [["Settling tank", "60-70°C", "Su ve katı çökelme"], ["Purifier girişi", "95-98°C", "Optimum viskozite, verimli ayrım"], ["Servis tank", "80-90°C", "Pompaya uygun viskozite"], ["Motor girişi (HFO)", "130-150°C", "Enjeksiyon viskozitesi (12-15 cSt)"]] } }
      ],
      keyPoints: ["Arıtma sıcaklığı yakıt tipi ve yoğunluğuna göre ayarlanmalıdır.", "Düşük sıcaklıkta arıtma verimsizdir; yüksek sıcaklık yakıtı bozabilir.", "VLSFO için arıtma sıcaklığı HFO'ya göre daha düşük olabilir."]
    },
    "Yağ arıtma ve su ayrımı": {
      title: "Yağ Arıtma ve Su Ayrımı",
      introduction: "Motor yağlama yağı kullanım sürecinde su, yakıt, karbon parçacıkları ve metal aşınma ürünleri ile kirlenir. Arıtma, yağ ömrünü uzatır ve motor korumasını sağlar.",
      sections: [
        { heading: "Yağ Arıtma Sistemi", paragraphs: ["Yağlama yağı sürekli by-pass filtrasyon ve santrifüj arıtmaya tabi tutulur. Ana yağ tankından alınan yağ purifier/clarifier'dan geçirilerek temizlenir ve tanka geri döner.", "Trunk piston motorlarda karter yağı hem yağlama hem silindir yağı olarak görev yapar; arıtma daha kritiktir."] },
        { heading: "Yağ Analizi Parametreleri", paragraphs: [], table: { headers: ["Parametre", "Limit", "Gösterge"], rows: [["Su içeriği", "< 0.2%", "Sızdırmazlık arızası"], ["BN (Base Number)", "> 15-20 (trunk)", "Nötralizasyon kapasitesi"], ["TAN (Acid Number)", "< 2.5", "Yağ oksidasyonu"], ["Viskozite değişimi", "±25%", "Yakıt dilüsyonu veya oksidasyon"], ["Fe (Demir)", "< 100 ppm", "Motor aşınması"], ["Katılık", "< 1%", "Filtre/arıtma yetersizliği"]] } }
      ],
      keyPoints: ["Yağ analizi kestirimci bakımın en önemli araçlarından biridir.", "Trunk piston motorlarda yağ değişim aralığı 5000-8000 saattir.", "Crosshead motorlarda sistem yağı değişim aralığı çok daha uzundur (15000+ saat)."]
    },
    "Mineral dozajı ve dezenfeksiyon": {
      title: "Mineral Dozajı ve Dezenfeksiyon",
      introduction: "Evaporatör veya RO sistemiyle üretilen saf su mineral açısından fakirdir ve korozif olabilir. İçilebilir hale getirmek için mineralleştirme ve dezenfeksiyon gereklidir.",
      sections: [
        { heading: "Mineralleştirme", paragraphs: ["Kalsit filtre veya kimyasal dozaj ile kalsiyum, magnezyum ve bikarbonat eklenir. pH 6.5-8.5 aralığına getirilir.", "Mineralsiz su (pH < 6) boru korozyonuna neden olur ve içme suyu olarak uygun değildir."] },
        { heading: "Dezenfeksiyon Yöntemleri", paragraphs: [], table: { headers: ["Yöntem", "Etki", "Avantaj/Dezavantaj"], rows: [["Klorlama (NaClO)", "Bakterisidal", "Ucuz; tat/koku sorunlu"], ["UV sterilizasyon", "Bakterisidal/Virisidal", "Kimyasal bırakmaz; rezidüel koruma yok"], ["Gümüş iyonizasyonu", "Bakteriostatik", "Uzun süreli koruma; yavaş etki"], ["Ozon", "Güçlü oksidan", "Çok etkili; pahalı ekipman"]] } }
      ],
      keyPoints: ["İçme suyunda serbest klor 0.2-0.5 ppm olmalıdır.", "UV lamba yoğunluğu düşerse etkinlik azalır; periyodik değişim gerekir.", "Tatlı su tankları yılda bir sterilize edilmelidir."]
    },
    "Üretim kapasitesi ve verim": {
      title: "Üretim Kapasitesi ve Verim",
      introduction: "Gemi tatlı su üretim sisteminin kapasitesi, mürettebat ihtiyacı, kazan besleme suyu ve teknik kullanım için yeterli olmalıdır.",
      sections: [
        { heading: "Kapasite Hesabı", paragraphs: ["Mürettebat su tüketimi: 150-200 litre/kişi/gün.", "Kazan besleme suyu: 2-5 ton/gün (kazan kapasitesine göre).", "Teknik kullanım (yıkama vb.): 1-3 ton/gün."], example: { problem: "25 mürettebatlı bir geminin günlük tatlı su ihtiyacını ve gerekli üretim kapasitesini hesaplayınız.", steps: ["Mürettebat: 25 × 200 L = 5000 L = 5 ton/gün", "Kazan: 3 ton/gün", "Teknik: 2 ton/gün", "Toplam: 10 ton/gün", "%20 güvenlik payı: 10 × 1.2 = 12 ton/gün"], result: "Gerekli üretim kapasitesi minimum 12 ton/gün olmalıdır." } }
      ],
      keyPoints: ["Evaporatör kapasitesi motor yüküne bağlıdır; RO bağımsızdır.", "Uzun seyirlerde su üretim güvenilirliği kritiktir.", "Tatlı su tank kapasitesi en az 3-5 günlük ihtiyacı karşılamalıdır."]
    },
    "Ara soğutma ve son soğutma": {
      title: "Ara Soğutma ve Son Soğutma",
      introduction: "Çok kademeli kompresörlerde kademeler arası soğutma (intercooling) ve son kademe sonrası soğutma (aftercooling), verim artışı ve güvenlik için zorunludur.",
      sections: [
        { heading: "Ara Soğutma (Intercooling)", paragraphs: ["Birinci kademe çıkışındaki sıcak hava, bir ısı eşanjöründen geçirilerek soğutulur. Havanın hacmi küçülür ve ikinci kademe sıkıştırma işi azalır.", "Soğutma ortamı: Tatlı su veya deniz suyu."], formula: { expression: "İdeal ara soğutma basıncı: Para = √(P₁ × P₂)", variables: ["P₁: Emme basıncı", "P₂: Son basınç"] } },
        { heading: "Son Soğutma (Aftercooling)", paragraphs: ["Son kademe çıkışındaki hava 200-250°C olabilir. Son soğutucu bu sıcaklığı ortam sıcaklığına yakın bir değere düşürür.", "Soğutma sonrası oluşan kondens otomatik drenaj vanası ile tahliye edilir."] }
      ],
      keyPoints: ["Yetersiz soğutma yağ tutuşması riskini artırır.", "Soğutucu yüzeyler periyodik temizlenmelidir.", "Kondens birikimi hava şişelerine su girmesine neden olur."]
    },
    "Otomatik boşaltma (auto-drain)": {
      title: "Otomatik Boşaltma (Auto-Drain)",
      introduction: "Kompresör ve hava sistemi bileşenlerinde oluşan kondens suyunun otomatik olarak tahliye edilmesi, hava kalitesi ve sistem güvenliği için gereklidir.",
      sections: [
        { heading: "Kondens Noktaları", paragraphs: ["Kompresör ara soğutucu çıkışı, son soğutucu çıkışı, hava şişesi alt kısmı ve dağıtım hatları kondens biriktiren noktalardır.", "Otomatik drenaj valfleri zamanlayıcı veya float mekanizması ile çalışır."] },
        { heading: "Bakım", paragraphs: ["Otomatik drenaj valflerinin düzgün çalışması periyodik kontrol edilmelidir. Tıkanma kondensin birikmesine, sızıntı ise hava kaybına neden olur."] }
      ],
      keyPoints: ["Kondens birikimi starting air sisteminde korozyona yol açar.", "Hava şişesi drenajı her vardiyada manuel kontrol edilmelidir.", "Yağlı kondens MARPOL gereği uygun şekilde bertaraf edilmelidir."]
    },
    "Kompresör bakım ve valf muayenesi": {
      title: "Kompresör Bakım ve Valf Muayenesi",
      introduction: "Kompresör bakımı, güvenilir basınçlı hava üretimi için düzenli yapılması gereken teknik işlemlerdir.",
      sections: [
        { heading: "Bakım İşleri", paragraphs: [], table: { headers: ["İşlem", "Periyot"], rows: [["Yağ seviye ve kalite kontrolü", "Günlük"], ["Emme/basma valfi kontrolü", "3000-6000 saat"], ["Piston ve segman kontrolü", "6000-12000 saat"], ["Silindir honing/ölçüm", "12000+ saat"], ["Emniyet valfi testi", "6 ay"], ["Karter emniyet valfi kontrolü", "Yıllık"]] } },
        { heading: "Valf Muayenesi", paragraphs: ["Emme ve basma valfleri kompresör verimini doğrudan etkiler. Valf plakasında çatlak, aşınma veya oturma yüzeyinde hasar performansı düşürür.", "Valf arızası belirtileri: Kademe çıkış sıcaklığı artışı, kapasite düşüşü, anormal ses."] }
      ],
      keyPoints: ["Yüksek çıkış sıcaklığı valf arızasının en güvenilir göstergesidir.", "Kompresör karter patlaması nadir ama tehlikeli bir durumdur.", "Emniyet kapağı (bursting disc) aşırı basınca karşı son korumadır."]
    },
    "Hava şişesi muayene gereklilikleri": {
      title: "Hava Şişesi Muayene Gereklilikleri",
      introduction: "Starting air şişeleri yüksek basınç altında çalışan basınçlı kaplardır ve düzenli muayene zorunluluğu vardır.",
      sections: [
        { heading: "Muayene Gereklilikleri", paragraphs: [], table: { headers: ["Muayene", "Periyot", "İçerik"], rows: [["İç muayene", "5 yıl", "Korozyon, pitting kontrolü"], ["Dış muayene", "2.5 yıl", "Dış yüzey, bağlantılar"], ["Hidrostatik test", "10 yıl", "Test basıncı: 1.5 × çalışma basıncı"], ["Emniyet valfi testi", "Yıllık", "Açma basıncı doğrulama"], ["Kalınlık ölçümü", "İç muayene ile", "Minimum et kalınlığı kontrolü"]] } },
        { heading: "Operasyonel Kontroller", paragraphs: ["Hava şişesi basıncı sürekli izlenir. Minimum basınç altında ana makine çalıştırılamaz.", "Her iki şişe de daima dolu tutulmalıdır. SOLAS gereği en az 12 ardışık başlatma kapasitesi olmalıdır."] }
      ],
      keyPoints: ["Muayene sertifikası olmadan hava şişesi kullanılamaz.", "İç korozyon nedeniyle kalınlık limitinin altına düşen şişe hizmet dışı bırakılır.", "Kondens birikimi şişe iç korozyonunun ana nedenidir."]
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // ELEKTRONİK, ÖLÇME VE OTOMASYON — Eksik alt başlıklar
  // ═══════════════════════════════════════════════════════════════
  automation: {
    "Basınç ölçüm cihazları (Bourdon, piezoelektrik)": {
      title: "Basınç Ölçüm Cihazları",
      introduction: "Basınç ölçümü makine dairesindeki tüm sistemlerin izlenmesinde temel öneme sahiptir. Farklı basınç aralıkları için farklı ölçüm prensipleri kullanılır.",
      sections: [
        { heading: "Bourdon Tüp Manometre", paragraphs: ["C şeklinde bükülmüş oval kesitli bir metal tüp, basınç uygulandığında düzleşme eğilimi gösterir. Bu hareket mekanik bağlantıyla ibreye aktarılır.", "0.5-1000 bar aralığında yaygın kullanılır. Basit, güvenilir ve ucuzdur. Gemi manometrelerin çoğu bu tiptedir."] },
        { heading: "Diğer Basınç Sensörleri", paragraphs: [], table: { headers: ["Tip", "Prensip", "Aralık", "Kullanım"], rows: [["Bourdon tüp", "Mekanik deformasyon", "0.5-1000 bar", "Genel amaç"], ["Diyafram", "Membran deformasyonu", "0-25 bar", "Düşük basınç, korozif"], ["Piezoelektrik", "Kristal deformasyonu → gerilim", "0-2000 bar", "Dinamik basınç (silindir)"], ["Kapasitif", "Kapasitans değişimi", "0-400 bar", "Proses kontrolü"], ["Strain gauge", "Direnç değişimi", "0-1000 bar", "Transmitter"]] } }
      ],
      keyPoints: ["Bourdon manometre periyodik kalibrasyon gerektirir.", "Piezoelektrik sensör motor indikatör ölçümlerinde kullanılır.", "4-20 mA çıkışlı transmitterlar otomasyon sistemine sinyal sağlar."]
    },
    "Seviye ölçüm yöntemleri": {
      title: "Seviye Ölçüm Yöntemleri",
      introduction: "Tank seviye ölçümü, yakıt, yağlama yağı, balast, tatlı su ve sludge tanklarının izlenmesinde kritik öneme sahiptir.",
      sections: [
        { heading: "Ölçüm Yöntemleri", paragraphs: [], table: { headers: ["Yöntem", "Prensip", "Doğruluk", "Kullanım"], rows: [["Float tip", "Şamandıra hareketi", "±5 mm", "Yakıt, su tankları"], ["Kapasitif", "Dielektrik değişimi", "±3 mm", "Temiz sıvılar"], ["Ultrasonik", "Ses dalgası yansıması", "±3 mm", "Genel amaç"], ["Radar", "Mikrodalga yansıması", "±1 mm", "Yüksek doğruluk"], ["Hidrostatik basınç", "Sıvı sütun basıncı", "±10 mm", "Basit, güvenilir"], ["Görsel (sight glass)", "Doğrudan okuma", "Görsel", "Yerinde kontrol"]] } },
        { heading: "Uzaktan Okuma", paragraphs: ["Modern gemilerde tank seviyeleri merkezi izleme sistemine aktarılır. Alarm seviyeleri (yüksek, düşük, yüksek-yüksek) programlanır.", "Kargo tankları için bağımsız seviye ölçüm sistemleri (closed/restricted/open) sınıflandırılır."] }
      ],
      keyPoints: ["Yakıt tankı seviye ölçümü yakıt tüketim hesabında kullanılır.", "Overflow alarmı çevre kirliliğini önler.", "Ballast tankı ölçüm doğruluğu stabilite hesapları için önemlidir."]
    },
    "Akış ölçüm cihazları (orifis, Coriolis)": {
      title: "Akış Ölçüm Cihazları",
      introduction: "Akış ölçümü, yakıt tüketimi izleme, soğutma suyu debisi kontrolü ve proses yönetiminde kullanılır.",
      sections: [
        { heading: "Akış Ölçüm Prensipleri", paragraphs: [], table: { headers: ["Tip", "Prensip", "Doğruluk", "Kullanım"], rows: [["Orifis plaka", "Basınç düşüşü (ΔP)", "±1-2%", "Buhar, gaz, su"], ["Venturi", "Basınç düşüşü (ΔP)", "±0.5-1%", "Büyük boru hatları"], ["Elektromanyetik", "Faraday yasası", "±0.5%", "İletken sıvılar"], ["Coriolis", "Kütle akış (Coriolis etkisi)", "±0.1%", "Yakıt tüketimi"], ["Türbin", "Rotor devri", "±0.5%", "Temiz sıvılar"], ["Ultrasonik", "Ses hızı farkı", "±1%", "Clamp-on (invaziv değil)"]] } },
        { heading: "Yakıt Tüketim Ölçümü", paragraphs: ["IMO DCS (Data Collection System) gereği yakıt tüketimi doğru ölçülmelidir. Coriolis debimetre en yüksek doğruluğu sağlar.", "Kütle akış ölçümü sıcaklık ve yoğunluk düzeltmesi gerektirmez."] }
      ],
      keyPoints: ["Orifis plaka en basit ve ucuz yöntemdir ancak basınç kaybı yüksektir.", "Coriolis debimetre yakıt ölçümünde altın standarttır.", "Clamp-on ultrasonik mevcut boru hattına müdahale gerektirmez."]
    },
    "Devir ve hız ölçümü": {
      title: "Devir ve Hız Ölçümü",
      introduction: "Motor devri, turboşarjer hızı, pompa ve fan devirleri sürekli izlenen kritik parametrelerdir.",
      sections: [
        { heading: "Ölçüm Yöntemleri", paragraphs: [], table: { headers: ["Yöntem", "Prensip", "Kullanım"], rows: [["Manyetik pick-up", "Dişli geçişinde manyetik alan değişimi", "Ana motor, jeneratör devri"], ["Optik (takometre)", "Yansıma algılama", "Portatif ölçüm"], ["Encoder", "Darbe sayma", "Hassas hız kontrolü"], ["Proximity sensör", "Metal algılama", "Turboşarjer devri"]] } },
        { heading: "Motor Devri İzleme", paragraphs: ["Ana motor devri governor ve otomasyon sistemi tarafından sürekli izlenir. Kritik hız aralıkları (barred speed range) torsiyonel titreşim nedeniyle sürekli çalışmaya uygun değildir ve bu bölgelerden hızla geçilmelidir."] }
      ],
      keyPoints: ["Turboşarjer devri performans izlemede önemli bir göstergedir.", "Barred speed range'de sürekli çalışma şaft hasarına yol açabilir.", "Governor arızasında motor over-speed koruması devreye girmelidir."]
    },
    "Sinyal dönüştürücüler (4-20 mA, 0-10V)": {
      title: "Sinyal Dönüştürücüler (4-20 mA, 0-10V)",
      introduction: "Sinyal dönüştürücüler (transmitter), fiziksel büyüklükleri standart elektriksel sinyale çevirerek otomasyon sistemine aktarır.",
      sections: [
        { heading: "Standart Sinyal Tipleri", paragraphs: [], table: { headers: ["Sinyal", "Tip", "Özellik", "Avantaj"], rows: [["4-20 mA", "Akım", "İki kablolu, 0% = 4 mA", "Kablo kaybından etkilenmez, kablo kopuğu algılanır (0 mA)"], ["0-10 V", "Gerilim", "Kablo direncine duyarlı", "Basit, ucuz"], ["0-5 V", "Gerilim", "Düşük aralık", "Mikrodenetleyici uyumlu"], ["HART", "Dijital + analog", "4-20 mA üzerine dijital veri", "Uzaktan kalibrasyon"]] } },
        { heading: "4-20 mA Avantajı", paragraphs: ["4 mA = %0 ölçüm aralığı, 20 mA = %100 ölçüm aralığı. 0 mA sinyal kopukluğu anlamına gelir ve otomasyon sistemi kablo arızasını algılayabilir.", "İki kablolu bağlantıda güç besleme ve sinyal aynı kablo çifti üzerinden taşınır."] }
      ],
      keyPoints: ["4-20 mA gemi otomasyonunda en yaygın analog sinyal standardıdır.", "Sinyal kalibrasyon hatası ölçüm hatasına doğrudan yansır.", "Dijital haberleşme (Modbus, Profibus) analog sinyallerin yerini almaktadır."]
    },
    "Açık ve kapalı döngü kontrol": {
      title: "Açık ve Kapalı Döngü Kontrol",
      introduction: "Kontrol sistemleri, çıkışın ölçülüp ölçülmediğine göre açık döngü ve kapalı döngü (geri beslemeli) olarak ikiye ayrılır.",
      sections: [
        { heading: "Açık Döngü Kontrol", paragraphs: ["Çıkış geri besleme ile kontrol edilmez. Operatör veya zamanlayıcı set değerini belirler ve sistem buna göre çalışır.", "Örnek: Kazan yakıcısının elle ayarlanması, zamanlayıcılı drenaj valfi."] },
        { heading: "Kapalı Döngü Kontrol", paragraphs: ["Çıkış sürekli ölçülerek set değeri ile karşılaştırılır. Hata sinyali kontrolcüye gider ve düzeltme yapılır.", "Örnek: Kazan buhar basıncı kontrolü — basınç sensörü ölçer, kontrolcü yakıcıyı ayarlar.", "Gemi otomasyon sistemlerinde kapalı döngü kontrol standarttır."] }
      ],
      keyPoints: ["Kapalı döngü kontrol bozucu etkilere otomatik tepki verir.", "Açık döngü kontrol basit ancak hassas kontrol sağlayamaz.", "Kontrol döngüsünün kararlılığı kontrolcü ayarlarına bağlıdır."]
    },
    "P, I, D parametrelerinin etkileri": {
      title: "P, I, D Parametrelerinin Etkileri",
      introduction: "PID kontrolcünün üç parametresi (Proportional, Integral, Derivative) sistemin kararlılığını, hızını ve doğruluğunu belirler.",
      sections: [
        { heading: "Parametre Etkileri", paragraphs: [], table: { headers: ["Parametre", "Artırılınca", "Azaltılınca"], rows: [["P (Orantısal)", "Hızlı tepki, salınım riski, kalıcı hata azalır ama sıfırlanmaz", "Yavaş tepki, kararlı"], ["I (İntegral)", "Kalıcı hata sıfırlanır, salınım riski artar, yavaş kararlılaşma", "Kalıcı hata kalır"], ["D (Türev)", "Salınım azalır, ani değişimlere hızlı tepki, gürültüye duyarlı", "Salınım artabilir"]] } },
        { heading: "Ayar Stratejisi", paragraphs: ["Ziegler-Nichols yöntemi: Önce sadece P ile kararlılık sınırı bulunur (Ku, Tu). Sonra P, I, D bu değerlere göre hesaplanır.", "Pratikte: Önce P ayarlanır, sonra I eklenir, son olarak D (gerekirse) eklenir."] }
      ],
      keyPoints: ["Sadece P kontrol → kalıcı hata (offset) her zaman kalır.", "I eklenmesi kalıcı hatayı sıfırlar ancak overshoot artırabilir.", "D parametresi gürültülü sinyal varsa sorun yaratabilir."]
    },
    "Kontrol döngüsü ayarı (tuning)": {
      title: "Kontrol Döngüsü Ayarı (Tuning)",
      introduction: "Kontrol döngüsü ayarı, PID parametrelerinin sistem performansını optimize edecek şekilde belirlenmesidir.",
      sections: [
        { heading: "Ayar Yöntemleri", paragraphs: ["1. Ziegler-Nichols (kapalı döngü): Sadece P ile çalıştırılır, Kp artırılarak sürekli salınım noktası (Ku) bulunur. Salınım periyodu (Tu) ölçülür.", "2. Cohen-Coon: Proses modeli (K, τ, θ) belirlenerek parametreler hesaplanır.", "3. Manuel ayar: Deneyimle P, I, D sırayla ayarlanır. En yaygın gemi pratiği budur."] },
        { heading: "Performans Kriterleri", paragraphs: ["Rise time (yükselme süresi): Set değerine ulaşma hızı.", "Overshoot: Set değerinin ne kadar aşıldığı (<%10-15 kabul edilir).", "Settling time (oturma süresi): ±%2 bandına girme süresi.", "Steady-state error (kalıcı hata): I parametresi ile sıfırlanır."] }
      ],
      keyPoints: ["Aşırı agresif ayar sistemi kararsız yapar (salınım).", "Çok yumuşak ayar yavaş tepki verir.", "Proses özellikleri değiştiğinde yeniden ayar gerekebilir."]
    },
    "Kaskad ve ileri besleme kontrol": {
      title: "Kaskad ve İleri Besleme Kontrol",
      introduction: "Kaskad ve ileri besleme kontrol, basit geri beslemeli kontrolün yetersiz kaldığı durumlarda kullanılan gelişmiş kontrol stratejileridir.",
      sections: [
        { heading: "Kaskad Kontrol", paragraphs: ["İki iç içe kontrol döngüsünden oluşur. Dış (master) döngü ana değişkeni kontrol eder, iç (slave) döngü ara değişkeni kontrol eder.", "Örnek: Kazan buhar sıcaklığı kontrolü — Dış döngü: sıcaklık kontrolcüsü, İç döngü: yakıt debisi kontrolcüsü.", "İç döngü bozucu etkilere hızlı tepki verir."] },
        { heading: "İleri Besleme (Feedforward)", paragraphs: ["Bozucu etki ölçülerek kontrol eylemine önceden yansıtılır. Geri beslemeyle birlikte kullanılır.", "Örnek: Kazan yük değişiminde buhar talebi önceden ölçülerek yakıcı ayarlanır (geri besleme hata düzeltir)."] }
      ],
      keyPoints: ["Kaskad kontrol iç döngünün hızlı olmasını gerektirir.", "İleri besleme bozucu etkinin ölçülebilir olmasını gerektirir.", "Gemi otomasyonunda kazan ve sıcaklık kontrolünde yaygın kullanılır."]
    },
    "Ladder diyagram programlama": {
      title: "Ladder Diyagram Programlama",
      introduction: "Ladder diyagram, PLC programlamada en yaygın kullanılan grafik dildir. Röle mantık devrelerini görsel olarak temsil eder.",
      sections: [
        { heading: "Temel Elemanlar", paragraphs: [], table: { headers: ["Sembol", "İsim", "Fonksiyon"], rows: [["−| |−", "Normalde açık kontak (NO)", "Giriş sinyali aktifse geçirir"], ["−|/|−", "Normalde kapalı kontak (NC)", "Giriş sinyali pasifse geçirir"], ["−( )−", "Çıkış bobini", "Koşul sağlandığında aktif"], ["−[TON]−", "Timer (On-delay)", "Belirli süre sonra aktif"], ["−[CTU]−", "Counter (Up)", "Darbe sayar"]] } },
        { heading: "Programlama Prensibi", paragraphs: ["Sol dikey hat güç hattı, sağ dikey hat nötr hattıdır. Güçten nötre doğru seri ve paralel bağlı kontaklar ve çıkışlar yerleştirilir.", "AND mantığı: Seri bağlı kontaklar. OR mantığı: Paralel bağlı kontaklar.", "Self-holding (tutma devresi): Çıkış kendi kontağıyla kendini tutar; ayrı bir NC kontakla durdurulur."] }
      ],
      keyPoints: ["Ladder diyagram elektrik teknisyenlerinin kolayca anlayabileceği bir dildir.", "IEC 61131-3 standardı PLC programlama dillerini tanımlar.", "Function Block Diagram (FBD) ve Structured Text (ST) alternatif dillerdir."]
    },
    "Alarm ve izleme sistemi (AMS)": {
      title: "Alarm ve İzleme Sistemi (AMS)",
      introduction: "AMS, gemi makine sistemlerinin parametrelerini sürekli izleyen ve anormal durumlarda alarm veren merkezi güvenlik sistemidir.",
      sections: [
        { heading: "Sistem Yapısı", paragraphs: ["Sensörler → veri toplama üniteleri → merkezi işlem ünitesi → operatör arayüzü (HMI).", "Alarm tipleri: Alarm (uyarı), Slowdown (güç kısıtlama), Shutdown (otomatik durdurma).", "Her alarm tarihi, saati ve değeri ile loglanır."] },
        { heading: "Alarm Yönetimi", paragraphs: [], table: { headers: ["Alarm Tipi", "Aksiyon", "Örnek"], rows: [["Alarm", "Operatör uyarısı", "Yağ basıncı düşük"], ["Slowdown", "Otomatik yük azaltma", "Soğutma suyu sıcaklık yüksek"], ["Shutdown", "Otomatik durdurma", "Yağ basıncı çok düşük"], ["Pre-alarm", "Erken uyarı", "Sıcaklık trendi yükselen"]] } }
      ],
      keyPoints: ["UMS çalışmada AMS güvenilirliği kritiktir.", "Alarm seli (alarm flood) operatör dikkatini azaltır; alarm yönetimi önemlidir.", "Dead band ve time delay yanlış alarm sayısını azaltır."]
    },
    "Dağıtık kontrol sistemi (DCS)": {
      title: "Dağıtık Kontrol Sistemi (DCS)",
      introduction: "DCS, kontrol fonksiyonlarının merkezi bir bilgisayar yerine sisteme dağıtılmış kontrolcüler tarafından gerçekleştirildiği otomasyon mimarisidir.",
      sections: [
        { heading: "DCS Mimarisi", paragraphs: ["Sahadan gelen sinyaller yerel kontrolcülere (remote I/O stations) bağlanır. Kontrolcüler haberleşme ağı üzerinden merkezi operatör istasyonlarına bağlıdır.", "Her kontrolcü bağımsız çalışabilir; merkezi istasyon devre dışı kalsa bile yerel kontrol devam eder."] },
        { heading: "DCS vs PLC", paragraphs: [], table: { headers: ["Özellik", "DCS", "PLC"], rows: [["Odak", "Sürekli proses kontrolü", "Mantık ve sıralı kontrol"], ["Ölçek", "Büyük (1000+ I/O)", "Küçük-orta"], ["Güvenilirlik", "Yedekli", "Tekil (genellikle)"], ["Maliyet", "Yüksek", "Düşük-orta"], ["Gemi kullanımı", "Büyük gemiler, FPSO", "Genel gemi otomasyonu"]] } }
      ],
      keyPoints: ["DCS haberleşme ağı arızası tüm sistemi etkileyebilir.", "Yedekli (redundant) haberleşme ve kontrolcü güvenilirliği artırır.", "Modern gemi otomasyonu PLC ve DCS özelliklerini birleştirir."]
    },
    "Gemi entegre otomasyon sistemi (IAS)": {
      title: "Gemi Entegre Otomasyon Sistemi (IAS)",
      introduction: "IAS, gemi makine dairesi, güverte, navigasyon ve güç yönetim sistemlerini tek bir platform üzerinde entegre eden kapsamlı otomasyon sistemidir.",
      sections: [
        { heading: "Entegre Fonksiyonlar", paragraphs: ["Alarm ve izleme (AMS)", "Güç yönetim sistemi (PMS)", "Makine kontrolü (ana motor, yardımcı)", "Kargo kontrol sistemi", "Yangın algılama ve söndürme", "Navigasyon veri entegrasyonu"] },
        { heading: "Üretici Sistemleri", paragraphs: [], table: { headers: ["Üretici", "Sistem Adı"], rows: [["Kongsberg", "K-Chief / AutoChief"], ["ABB", "Ability Marine"], ["Wärtsilä", "NACOS / Valmet DNA"], ["Honeywell", "Experion Marine"], ["Yokogawa", "CENTUM VP Marine"]] } }
      ],
      keyPoints: ["IAS, UMS (insansız makine dairesi) çalışmasının temel altyapısıdır.", "Siber güvenlik IAS için giderek artan bir endişedir.", "IMO MSC.428(98) deniz siber güvenlik yönetimini düzenler."]
    },
    "Uzaktan izleme ve tanı": {
      title: "Uzaktan İzleme ve Tanı",
      introduction: "Uzaktan izleme, gemi makine verilerinin uydu iletişimi ile kıyıya aktarılarak uzman analiz ve desteğe olanak sağlayan modern teknolojidir.",
      sections: [
        { heading: "Sistem Yapısı", paragraphs: ["Gemi üzerindeki data server, sensörlerden ve otomasyon sisteminden verileri toplar. VSAT veya Fleet Broadband üzerinden kıyıdaki sunuculara iletir.", "Kıyı ofisinde uzmanlar gerçek zamanlıya yakın verileri analiz ederek performans izleme, arıza teşhisi ve bakım planlaması yapar."] },
        { heading: "Uygulamalar", paragraphs: [], table: { headers: ["Uygulama", "Fayda"], rows: [["Motor performans izleme", "Erken arıza tespiti, SFOC optimizasyonu"], ["Enerji verimlilik izleme", "CII takibi, yakıt tasarrufu"], ["Kestirimci bakım", "Plansız duruş azaltma"], ["Uzaktan destek", "Uzman müdahale (video, veri paylaşımı)"], ["Filo yönetimi", "Tüm gemilerin karşılaştırmalı analizi"]] } }
      ],
      keyPoints: ["Veri güvenliği ve siber güvenlik kritik konulardır.", "Bant genişliği sınırlaması veri sıkıştırma ve önceliklendirme gerektirir.", "Uzaktan izleme bakım maliyetlerini %10-20 azaltabilir."]
    },
    "Diyot ve thyristor (SCR)": {
      title: "Diyot ve Thyristor (SCR)",
      introduction: "Diyot ve thyristor, güç elektroniğinin temel yarı iletken elemanlarıdır. Doğrultma, güç kontrolü ve motor sürme devrelerinde kullanılır.",
      sections: [
        { heading: "Diyot", paragraphs: ["Tek yönlü akım geçiren iki terminalli yarı iletken elemandır. Anot (+) ve katot (−) terminallerine sahiptir.", "Güç diyotları doğrultucu devrelerde AC'yi DC'ye çevirir. Geri gerilim dayanımı ve akım kapasitesi seçim kriterleridir."] },
        { heading: "Thyristor (SCR)", paragraphs: ["Üç terminalli (anot, katot, gate) yarı iletken elemandır. Gate sinyali ile tetiklenir ve anot akımı tutma akımının altına düşene kadar iletimde kalır.", "Kontrollü doğrultucularda kullanılır: Tetikleme açısı (firing angle) değiştirilerek çıkış gerilimi ayarlanır."], table: { headers: ["Eleman", "Terminal", "Kontrol", "Kullanım"], rows: [["Diyot", "Anot, Katot", "Yok (tek yönlü)", "Tam doğrultma"], ["SCR", "Anot, Katot, Gate", "Gate tetikleme", "Kontrollü doğrultma, motor hız kontrolü"], ["IGBT", "Collector, Emitter, Gate", "Gate gerilimi", "VFD, invertör"]] } }
      ],
      keyPoints: ["Diyot iletim düşüşü ~0.7V, güç kayıplarına neden olur.", "SCR doğal komütasyonla (AC) veya zorla söndürülür.", "Modern VFD'lerde IGBT transistörler kullanılır."]
    },
    "Doğrultucu devreler": {
      title: "Doğrultucu Devreler",
      introduction: "Doğrultucu devreler AC gerilimi DC gerilime çevirir. Gemi elektrik sistemlerinde akü şarj, uyarma beslemesi ve VFD giriş katında kullanılır.",
      sections: [
        { heading: "Doğrultucu Tipleri", paragraphs: [], table: { headers: ["Tip", "Diyot Sayısı", "Dalga Formu", "Kullanım"], rows: [["Yarım dalga (1-fazlı)", "1", "Yüksek dalgalanma", "Basit uygulamalar"], ["Tam dalga köprü (1-fazlı)", "4", "Orta dalgalanma", "Akü şarj"], ["6 darbeli (3-fazlı)", "6", "Düşük dalgalanma", "Genel endüstriyel"], ["12 darbeli (3-fazlı)", "12", "Çok düşük dalgalanma", "Büyük VFD, harmonik azaltma"]] } },
        { heading: "Filtreleme", paragraphs: ["Doğrultulmuş DC gerilimi düzleştirmek için kondansatör (kapasitif) veya bobin (endüktif) filtre kullanılır."] }
      ],
      keyPoints: ["6 darbeli doğrultucu gemi VFD'lerinde standarttır.", "12 darbeli sistem harmonik bozulmayı önemli ölçüde azaltır.", "Kontrollü doğrultucularda SCR ile çıkış gerilimi ayarlanabilir."]
    },
    "İnvertör ve frekans dönüştürücü": {
      title: "İnvertör ve Frekans Dönüştürücü",
      introduction: "İnvertör, DC gerilimi AC gerilime çeviren güç elektroniği devresir. Frekans dönüştürücünün (VFD) çıkış katını oluşturur.",
      sections: [
        { heading: "Çalışma Prensibi", paragraphs: ["IGBT anahtarlama elemanları PWM (Pulse Width Modulation) tekniği ile DC gerilimi değişken frekanslı AC'ye dönüştürür.", "PWM frekansı yükseldikçe çıkış dalga formu sinüsoidal formuna yaklaşır. Tipik PWM frekansı 2-16 kHz arasındadır."] },
        { heading: "VFD Blok Diyagramı", paragraphs: ["AC şebeke → Doğrultucu → DC bağlantı (DC bus) → İnvertör → Motor.", "V/f kontrolü: Gerilim/frekans oranı sabit tutularak motor manyetik akısı korunur.", "Vektör kontrol: Tork ve akı bağımsız kontrol edilir; yüksek performans sağlar."] }
      ],
      keyPoints: ["VFD motor hızını 0'dan nominal hıza (ve üstüne) kadar ayarlayabilir.", "Regeneratif frenleme ile enerji şebekeye geri verilebilir.", "Motor kablosu uzunluğu yansıma gerilimi nedeniyle sınırlıdır."]
    },
    "Yumuşak yol verici (soft starter)": {
      title: "Yumuşak Yol Verici (Soft Starter)",
      introduction: "Soft starter, motor başlangıç gerilimini kademeli artırarak düşük akım ve düzgün kalkış sağlayan cihazır.",
      sections: [
        { heading: "Çalışma Prensibi", paragraphs: ["Anti-paralel SCR (thyristor) çiftleri ile motor gerilimi kontrollü olarak artırılır. Tetikleme açısı azaltılarak gerilim kademeli yükseltilir.", "Başlangıç sonrası SCR'lar tam iletime geçer veya bypass kontaktör devreye girer."] },
        { heading: "VFD ile Karşılaştırma", paragraphs: [], table: { headers: ["Özellik", "Soft Starter", "VFD"], rows: [["Hız kontrolü", "Yalnızca kalkışta", "Sürekli"], ["Başlangıç akımı", "2-4 × Iₙ", "~Iₙ"], ["Maliyet", "Düşük", "Yüksek"], ["Enerji tasarrufu", "Kalkışta", "Sürekli"], ["Kullanım", "Pompa, fan kalkışı", "Değişken hız gereken tüm uygulamalar"]] } }
      ],
      keyPoints: ["Soft starter su darbesi (water hammer) riskini azaltır.", "By-pass kontaktör çalışma sırasında SCR kayıplarını ortadan kaldırır.", "Pompa ve fan uygulamalarında yaygındır."]
    },
    "Harmonik bozulma ve filtreleme": {
      title: "Harmonik Bozulma ve Filtreleme",
      introduction: "Harmonikler, temel frekansın tam katları olan istenmeyen gerilim ve akım bileşenleridir. VFD ve doğrultucular harmonik kaynağıdır.",
      sections: [
        { heading: "Harmonik Etkileri", paragraphs: ["Trafo ve motor aşırı ısınması, kablo kayıpları artışı, hassas ekipman arızası, devre kesici yanlış trip, iletişim paraziti.", "THD (Total Harmonic Distortion) harmonik kirliliğin ölçüsüdür. Gemi elektrik sistemlerinde THD <%8 olmalıdır (klas kuralları)."] },
        { heading: "Harmonik Azaltma Yöntemleri", paragraphs: [], table: { headers: ["Yöntem", "THD Azaltma", "Maliyet"], rows: [["12 darbeli doğrultucu", "%30 → %10", "Orta"], ["Aktif filtre", "%30 → <%5", "Yüksek"], ["Pasif filtre (LC)", "Belirli harmonikleri", "Düşük"], ["Line reactor (%3-5)", "%30 → %15-20", "Düşük"], ["Multi-pulse trafo", "%30 → %5-8", "Orta-Yüksek"]] } }
      ],
      keyPoints: ["5. ve 7. harmonikler en baskın bileşenlerdir.", "Harmonik akımlar nötr iletkeni aşırı yükleyebilir.", "Klas kuralları harmonik limitleri belirler (IEC 61000-3)."]
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // ÇEVRE VE MARPOL – MAKİNE — Eksik alt başlıklar
  // ═══════════════════════════════════════════════════════════════
  "environment-machine": {
    "MARPOL sözleşmesi tarihçesi": {
      title: "MARPOL Sözleşmesi Tarihçesi",
      introduction: "MARPOL 73/78 (Maritime Pollution), deniz ortamının gemilerden kaynaklanan kirlilikten korunması amacıyla IMO tarafından kabul edilen temel uluslararası sözleşmedir.",
      sections: [
        { heading: "Tarihsel Gelişim", paragraphs: ["1973: MARPOL sözleşmesi kabul edildi ancak yeterli onay alınamadı.", "1978: Tanker kazaları (Torrey Canyon, 1967; Amoco Cadiz, 1978) sonrasında Protokol eklendi; MARPOL 73/78 olarak yürürlüğe girdi (1983).", "1997: Annex VI (hava kirliliği) eklendi (yürürlük 2005).", "2011: EEDI ve SEEMP zorunlu hale getirildi.", "2020: Global kükürt limiti %0.50'ye düşürüldü."] },
        { heading: "MARPOL Ekleri", paragraphs: [], table: { headers: ["Ek", "Konu", "Yürürlük"], rows: [["Annex I", "Petrol kirliliği", "1983"], ["Annex II", "Zararlı sıvı maddeler (NLS)", "1983"], ["Annex III", "Ambalajlı zararlı maddeler", "1992"], ["Annex IV", "Pis su (sewage)", "2003"], ["Annex V", "Çöp (garbage)", "1988"], ["Annex VI", "Hava kirliliği", "2005"]] } }
      ],
      keyPoints: ["MARPOL tüm 500+ GT ticari gemiler için geçerlidir.", "Bayrak devleti ve liman devleti denetimi ile uygulanır.", "İhlaller para cezası, tutuklama ve hapis cezası ile sonuçlanabilir."]
    },
    "Ek I – Petrol kirliliği önleme": {
      title: "MARPOL Ek I – Petrol Kirliliği Önleme",
      introduction: "Annex I, gemilerden kaynaklanan petrol ve petrol ürünleri kirliliğinin önlenmesini düzenler. Tüm gemiler için zorunludur.",
      sections: [
        { heading: "Temel Kurallar", paragraphs: ["15 ppm kuralı: Sintine suyundaki yağ içeriği 15 ppm'in altında olmalıdır (OWS ile).", "ODMCS: 10000 GT üzeri gemilerde yağ deşarj izleme ve kontrol sistemi zorunludur.", "Oil Record Book: Tüm yağ transferi ve deşarj işlemleri kayıt altına alınır.", "SOPEP: Gemi yağ kirliliği acil planı tüm 150 GT üzeri gemilerde bulunmalıdır."] },
        { heading: "Özel Alanlar", paragraphs: ["Akdeniz, Baltık, Karadeniz, Kızıldeniz, Körfez, Antarktika ve Kuzey-batı Avrupa suları özel alan olarak tanımlanmıştır. Bu alanlarda deşarj kuralları daha sıkıdır."] }
      ],
      keyPoints: ["IOPP sertifikası 5 yılda bir yenilenir, yıllık ve ara survey gerekir.", "Çift cidarlı tanklar 5000 DWT üzeri tankerler için zorunludur.", "Slop tank kapasitesi toplam kargo kapasitesinin %3'ü olmalıdır."]
    },
    "Ek II – Zararlı sıvı maddeler": {
      title: "MARPOL Ek II – Zararlı Sıvı Maddeler",
      introduction: "Annex II, dökme halde taşınan zararlı sıvı maddelerin (NLS) denize deşarjını düzenler. Kimyasal tankerler için geçerlidir.",
      sections: [
        { heading: "Madde Sınıflandırması", paragraphs: [], table: { headers: ["Kategori", "Tehlike", "Deşarj"], rows: [["X", "Büyük tehlike", "Yasak (liman alım tesisi)"], ["Y", "Tehlike", "Sınırlı deşarj (koşullu)"], ["Z", "Düşük tehlike", "Daha gevşek koşullar"], ["OS (Diğer)", "Minimum tehlike", "Kısıtlama yok (genel kurallar)"]] } }
      ],
      keyPoints: ["P&A Manual (Prosedür ve Düzenleme El Kitabı) gemide bulunmalıdır.", "Ön yıkama (pre-wash) prosedürü zorunlu olabilir.", "Cargo Record Book tutulması zorunludur."]
    },
    "Ek III – Ambalajlı zararlı maddeler": {
      title: "MARPOL Ek III – Ambalajlı Zararlı Maddeler",
      introduction: "Annex III, ambalajlı veya konteynerde taşınan zararlı maddelerin deniz kirliliğini önlemeye yönelik kuralları belirler.",
      sections: [
        { heading: "Gereklilikler", paragraphs: ["Zararlı maddeler IMDG Code'a uygun olarak ambalajlanmalı, etiketlenmeli, işaretlenmeli ve istiflenmeli.", "Denize düşme riski minimize edilmeli, güverte istifi koşulları sağlanmalı.", "Doküman: Manifest veya ayrıntılı istifleme planı."] }
      ],
      keyPoints: ["IMDG Code sınıflandırması (Sınıf 1-9) uygulanır.", "Marine pollutant işareti taşıyan maddeler özel kurallara tabidir.", "Kazalarda bildirim yükümlülüğü vardır."]
    },
    "Ek IV – Pis su (sewage)": {
      title: "MARPOL Ek IV – Pis Su (Sewage)",
      introduction: "Annex IV, gemilerden kaynaklanan pis suyun denize deşarj koşullarını düzenler.",
      sections: [
        { heading: "Pis Su Deşarj Kuralları", paragraphs: [], table: { headers: ["Koşul", "Deşarj İzni"], rows: [["IMO onaylı STP ile arıtılmış", "Kıyıdan 3 nm sonra"], ["Onaylı STP + dezenfeksiyon", "Her yerde (bazı bölgeler hariç)"], ["Arıtılmamış (parçalanmış)", "Kıyıdan 12 nm sonra, 4+ knot hızda"], ["Arıtılmamış (parçalanmamış)", "Yasak"], ["Özel alanlar (Baltık)", "Sadece onaylı STP çıkışı"]] } },
        { heading: "STP (Sewage Treatment Plant)", paragraphs: ["Biyolojik arıtma (aerobik), membran biyoreaktör (MBR) veya elektro-kimyasal arıtma sistemleri kullanılır.", "Çıkış suyu kalitesi: BOD < 25 mg/L, TSS < 35 mg/L, koliform < 100/100 ml."] }
      ],
      keyPoints: ["400+ GT veya 15+ kişi taşıyan gemiler için zorunludur.", "ISPP (International Sewage Pollution Prevention) sertifikası gerekir.", "Yolcu gemilerinde gelişmiş arıtma sistemi zorunludur."]
    },
    "Ek V – Çöp (garbage)": {
      title: "MARPOL Ek V – Çöp (Garbage)",
      introduction: "Annex V, gemilerden denize çöp atılmasını düzenler. 2013 revizyonuyla kurallar önemli ölçüde sıkılaştırılmıştır.",
      sections: [
        { heading: "Çöp Deşarj Kuralları (2013 Revizyonu)", paragraphs: [], table: { headers: ["Çöp Tipi", "Özel Alan Dışı", "Özel Alan"], rows: [["Plastik", "Yasak", "Yasak"], ["Yemek atığı (öğütülmüş)", "3+ nm, seyirde", "12+ nm, seyirde"], ["Kargo kalıntısı", "12+ nm", "12+ nm (su ile çözünür)"], ["Hayvan leşi", "Mümkün olduğunca uzakta", "Yasak"], ["Diğer çöpler", "12+ nm", "Yasak"]] } },
        { heading: "Çöp Yönetim Planı", paragraphs: ["100+ GT veya 15+ kişi taşıyan gemiler çöp yönetim planı bulundurmalıdır.", "400+ GT gemilerde çöp kayıt defteri (Garbage Record Book) tutulmalıdır."] }
      ],
      keyPoints: ["Denize çöp atma genel olarak yasaktır; istisnalar sınırlıdır.", "Incinerator ile çöp yakılabilir ancak emisyon kurallarına uyulmalıdır.", "Plastik maddelerin denize atılması her yerde yasaktır."]
    },
    "Ek VI – Hava kirliliği ve emisyonlar": {
      title: "MARPOL Ek VI – Hava Kirliliği ve Emisyonlar",
      introduction: "Annex VI, gemi emisyonlarının (SOx, NOx, GHG, ODS, VOC) kontrolünü düzenler. 2020 kükürt limiti revizyonu en önemli değişikliktir.",
      sections: [
        { heading: "Kükürt Limitleri", paragraphs: [], table: { headers: ["Bölge", "Limit (2020 sonrası)", "Yürürlük"], rows: [["Global", "%0.50 m/m", "1 Ocak 2020"], ["ECA (SOx)", "%0.10 m/m", "1 Ocak 2015"], ["Liman (AB)", "%0.10 m/m", "2010"]] } },
        { heading: "Diğer Emisyon Kuralları", paragraphs: ["NOx: Tier I (2000-2010), Tier II (2011+), Tier III (NOx ECA'da 2016+).", "ODS: Halonlar ve CFC kullanımı yasak; HCFC faz-out.", "Shipboard incinerator: IMO standartlarına uygun olmalı.", "VOC: Tankerlerden uçucu organik bileşik kontrolü."] }
      ],
      keyPoints: ["IAPP sertifikası Annex VI uyumunu belgeler.", "Scrubber kullanımında wash water deşarj kuralları uygulanır.", "Yanlış yakıt beyanı ağır cezai yaptırımlara tabidir."]
    },
    "Yağ-su ayırıcı (OWS) 15 ppm standardı": {
      title: "Yağ-Su Ayırıcı (OWS) ve 15 ppm Standardı",
      introduction: "OWS, sintine suyundaki yağ içeriğini 15 ppm'in altına düşürerek denize güvenli deşarj sağlayan zorunlu çevre koruma ekipmanıdır.",
      sections: [
        { heading: "Sistem Yapısı", paragraphs: ["Birinci aşama: Gravite separasyonu ile büyük yağ damlacıkları ayrılır.", "İkinci aşama: Koalesans filtre ile ince damlacıklar birleştirilerek ayrılır.", "15 ppm bilge alarm: Çıkıştaki yağ içeriğini sürekli ölçer. 15 ppm aşılırsa deşarj valfi otomatik kapanır ve akış gemi içi sirkülasyona yönlenir."] },
        { heading: "ODMCS", paragraphs: ["Oil Discharge Monitoring and Control System (ODMCS) 10000 GT üzeri gemilerde zorunludur. Deşarj debisi, yağ içeriği, gemi hızı ve konumunu sürekli kaydeder."] }
      ],
      keyPoints: ["OWS by-pass edilmesi veya manipülasyonu ciddi suç teşkil eder.", "15 ppm bilge alarm IMO MEPC.107(49) standardına uygun olmalıdır.", "OWS bakımı ve filtre değişimi düzenli yapılmalıdır."]
    },
    "Yağ kayıt defteri (Oil Record Book)": {
      title: "Yağ Kayıt Defteri (Oil Record Book)",
      introduction: "Oil Record Book (ORB), tüm yağ operasyonlarının resmi kayıt altına alındığı zorunlu belgedir.",
      sections: [
        { heading: "Kayıt Gereklilikleri", paragraphs: ["Part I: Makine dairesi operasyonları (400+ GT gemiler).", "Part II: Kargo/balast operasyonları (150+ GT tankerler).", "Kaydedilen işlemler: Sintine tahliyesi, yağ transferi, bunker alımı, sludge bertarafı, OWS çalıştırma, kazara döküntü."] },
        { heading: "Kayıt Formatı", paragraphs: ["Her kayıt: Tarih, operasyon kodu, tank/ekipman bilgisi, miktar, imza.", "ORB liman devleti denetiminde (PSC) en sık kontrol edilen belgelerden biridir.", "Son 3 yıllık kayıtlar gemide tutulmalıdır."] }
      ],
      keyPoints: ["Yanlış veya eksik kayıt ciddi cezai yaptırımlara yol açar.", "Her operasyon anında kaydedilmelidir.", "Kaptan veya yetkili zabit imzalamalıdır."]
    },
    "Kükürt limitleri (global 0.50%, ECA 0.10%)": {
      title: "Kükürt Limitleri",
      introduction: "IMO 2020 kuralıyla global kükürt limiti %3.50'den %0.50'ye düşürülmüştür. ECA bölgelerinde limit %0.10'dur.",
      sections: [
        { heading: "Uyum Yöntemleri", paragraphs: [], table: { headers: ["Yöntem", "Açıklama", "Avantaj/Dezavantaj"], rows: [["Düşük kükürtlü yakıt (VLSFO/MGO)", "Uyumlu yakıt kullanımı", "Basit; pahalı yakıt"], ["Scrubber", "Egzoz gazı yıkama", "HFO devam; yatırım maliyeti"], ["LNG yakıt", "Doğalgaz kullanımı", "Sıfıra yakın SOx; altyapı gerekli"], ["Metanol/Amonyak", "Alternatif yakıtlar", "Gelecek çözüm; sınırlı altyapı"]] } },
        { heading: "ECA Bölgeleri", paragraphs: ["Baltık Denizi, Kuzey Denizi, Kuzey Amerika kıyıları (200 nm), ABD Karayip bölgesi SOx ECA olarak tanımlanmıştır."] }
      ],
      keyPoints: ["Yakıt değiştirme (fuel changeover) prosedürü ECA girişinden önce tamamlanmalıdır.", "BDN (Bunker Delivery Note) ve yakıt numunesi 3 yıl saklanmalıdır.", "FONAR (Fuel Oil Non-Availability Report) uyumlu yakıt bulunamadığında düzenlenir."]
    },
    "Egzoz gazı yıkama (scrubber) sistemi": {
      title: "Egzoz Gazı Yıkama (Scrubber) Sistemi",
      introduction: "Scrubber (EGCS), egzoz gazındaki kükürt oksitleri (SOx) yıkayarak HFO kullanımıyla kükürt limitlerini karşılayan alternatif uyum yöntemidir.",
      sections: [
        { heading: "Scrubber Tipleri", paragraphs: [], table: { headers: ["Tip", "Yıkama Suyu", "Deşarj", "Avantaj"], rows: [["Açık döngü", "Deniz suyu", "Denize deşarj", "Basit; bazı limanlarda yasak"], ["Kapalı döngü", "NaOH çözeltisi", "Holding tank", "Her yerde kullanılabilir"], ["Hibrit", "Her ikisi", "Değişken", "Esnek operasyon"]] } },
        { heading: "Çalışma Prensibi", paragraphs: ["Egzoz gazı scrubber kulesi içinde alkali çözelti ile temas ettirilir. SO₂ + H₂O + NaOH → Na₂SO₃ reaksiyonu ile kükürt bileşikleri nötralize edilir.", "Yıkama suyu çıkış pH'ı izlenir (pH > 6.5 gerekli). PAH (poliaromatik hidrokarbon) ve bulanıklık da izlenir."] }
      ],
      keyPoints: ["Açık döngü scrubber bazı limanlarda ve ülkelerde yasaklanmıştır.", "Scrubber residue (sludge) liman alım tesisine verilmelidir.", "SOx Emissions Compliance Plan (SECP) gemide bulunmalıdır."]
    },
    "NOx Tier I, II, III standartları": {
      title: "NOx Tier I, II, III Standartları",
      introduction: "MARPOL Annex VI, gemi motorlarından kaynaklanan NOx (azot oksit) emisyonlarını motor devrine göre sınırlandırır.",
      sections: [
        { heading: "NOx Limitleri", paragraphs: [], table: { headers: ["Tier", "Uygulama", "< 130 rpm", "130-2000 rpm", "> 2000 rpm"], rows: [["Tier I", "2000-2010 arası motorlar", "17.0 g/kWh", "45×n⁻⁰·² g/kWh", "9.8 g/kWh"], ["Tier II", "2011+ motorlar", "14.4 g/kWh", "44×n⁻⁰·²³ g/kWh", "7.7 g/kWh"], ["Tier III", "2016+ NOx ECA'da", "3.4 g/kWh", "9×n⁻⁰·² g/kWh", "2.0 g/kWh"]] } },
        { heading: "Tier III Uyum Teknolojileri", paragraphs: ["SCR (Selective Catalytic Reduction): Üre (urea) çözeltisi ile NOx'u N₂ ve H₂O'ya dönüştürür.", "EGR (Exhaust Gas Recirculation): Egzoz gazının bir kısmı emme havasına karıştırılarak yanma sıcaklığı düşürülür.", "LNG yakıt: Düşük yanma sıcaklığı doğal olarak düşük NOx sağlar."] }
      ],
      keyPoints: ["EIAPP sertifikası motor NOx uyumunu belgeler.", "NOx ECA: Kuzey Amerika ve ABD Karayip bölgesi (2016+), Baltık ve Kuzey Denizi (2021+).", "Motor modifikasyonu NOx uyumunu bozabilir; EIAPP güncellenmesi gerekir."]
    },
    "Balast su sözleşmesi (BWM Convention)": {
      title: "Balast Su Sözleşmesi (BWM Convention)",
      introduction: "BWM Convention (2004), gemilerin balast suyu ile taşınan istilacı deniz organizmalarının yayılmasını önlemeyi amaçlar. 2017'de yürürlüğe girmiştir.",
      sections: [
        { heading: "Standartlar", paragraphs: [], table: { headers: ["Standart", "Gereklilik", "Uygulama"], rows: [["D-1 (Değişim)", "Okyanus ortasında (%95) balast değişimi", "Geçici (BWTS kurulana kadar)"], ["D-2 (Performans)", "BWTS ile arıtma", "Tüm gemiler (takvime göre)"]] } },
        { heading: "BWTS Teknolojileri", paragraphs: ["UV arıtma: Ultraviolet ışınlarla organizmaları etkisizleştirir.", "Elektroliz (elektro-klorinasyon): Deniz suyundan aktif klorür üretir.", "Filtrasyon + UV: Ön filtre + UV kombinasyonu.", "Tüm sistemler IMO tip onayı (Type Approval) almalıdır."] }
      ],
      keyPoints: ["IBWMC (International Ballast Water Management Certificate) gereklidir.", "Ballast Water Record Book tutulmalıdır.", "Mevcut gemiler survey takvimi ile D-2 standardına geçmelidir."]
    },
    "Çöp yönetim planı (Garbage Management Plan)": {
      title: "Çöp Yönetim Planı (Garbage Management Plan)",
      introduction: "Çöp yönetim planı, gemi üzerinde üretilen çöplerin toplanması, depolanması, işlenmesi ve bertaraf edilmesine ilişkin prosedürleri tanımlayan zorunlu belgedir.",
      sections: [
        { heading: "Plan İçeriği", paragraphs: ["Çöp sınıflandırma kategorileri (A-I arası 9 kategori).", "Toplama ve ayrıştırma prosedürleri.", "Depolama yerleri ve kapasiteleri.", "İşleme ekipmanları (incinerator, compactor).", "Liman alım tesisine teslim prosedürü.", "Sorumlu personel görevlendirmesi."] },
        { heading: "Çöp Kategorileri", paragraphs: [], table: { headers: ["Kategori", "İçerik"], rows: [["A", "Plastik"], ["B", "Yemek atığı"], ["C", "Ev atığı"], ["D", "Pişirme yağı"], ["E", "Küller (incinerator)"], ["F", "Operasyonel atık"], ["G", "Hayvan leşi"], ["H", "Balıkçılık atığı"], ["I", "E-atık"]] } }
      ],
      keyPoints: ["100+ GT veya 15+ kişi taşıyan gemilerde zorunludur.", "Mürettebat eğitimi planın parçasıdır.", "Liman alım makbuzu saklanmalıdır."]
    },
    "Incinerator operasyonu": {
      title: "Incinerator Operasyonu",
      introduction: "Gemi incineratörü, katı atıkları ve sludge'ı yakarak hacimlerini azaltan ve bertarafını kolaylaştıran termal işleme ekipmanıdır.",
      sections: [
        { heading: "Operasyon Kuralları", paragraphs: ["IMO MEPC.244(66) standardına uygun olmalıdır.", "Yanma odası sıcaklığı minimum 850°C olmalıdır.", "Limanda ve özel alanlarda incinerator kullanımı yerel kurallara bağlıdır."], table: { headers: ["Yakılabilir", "Yakılamaz"], rows: [["Kağıt, karton, ahşap", "Plastik (PVC hariç)"], ["Yağlı paçavra", "PVC ve poliklorlu malzeme"], ["Sludge, atık yağ", "Asbest içeren malzeme"], ["Yemek atığı", "Rafine ürün kargo kalıntısı"]] } }
      ],
      keyPoints: ["İncinerator kapasitesi IMO standardına uygun olmalıdır.", "Soot blowing ve kül temizliği periyodik yapılmalıdır.", "Egzoz çıkışı iskele tarafına yönlendirilmemelidir."]
    },
    "Pis su arıtma tesisi (STP)": {
      title: "Pis Su Arıtma Tesisi (STP)",
      introduction: "STP, gemi tuvalet ve gri sularını arıtarak denize güvenli deşarj veya liman tesisine teslim edilebilir kaliteye getiren sistemdir.",
      sections: [
        { heading: "Arıtma Yöntemleri", paragraphs: [], table: { headers: ["Yöntem", "Prensip", "Çıkış Kalitesi"], rows: [["Biyolojik (aerobik)", "Bakterilerle organik ayrışma", "İyi"], ["MBR (Membran Biyoreaktör)", "Biyolojik + membran filtre", "Çok iyi"], ["Elektro-kimyasal", "Elektroliz ile arıtma", "İyi"], ["Gelişmiş arıtma (yolcu gemisi)", "Çoklu aşama", "En iyi"]] } },
        { heading: "Çıkış Suyu Standartları", paragraphs: [], table: { headers: ["Parametre", "IMO Standardı"], rows: [["BOD₅", "< 25 mg/L"], ["TSS", "< 35 mg/L"], ["Koliform", "< 100 cfu/100 mL"], ["pH", "6-8.5"]] } }
      ],
      keyPoints: ["STP bakımı (biyolojik kültür, havalandırma, dezenfeksiyon) düzenli yapılmalıdır.", "Kimyasal dezenfeksiyon (klorlama veya UV) son aşamada uygulanır.", "Yolcu gemilerinde gelişmiş arıtma sistemleri zorunludur."]
    },
    "Slop tank yönetimi": {
      title: "Slop Tank Yönetimi",
      introduction: "Slop tank, yağlı sintine suyu, yağ-su karışımları ve sludge'ın geçici olarak depolandığı tanklardır.",
      sections: [
        { heading: "Operasyon", paragraphs: ["Sintine suyunun OWS'den geçirildikten sonra geri kalan yağlı kalıntı slop tank'a yönlendirilir.", "Settling süresinden sonra alttaki su OWS'den geçirilerek tahliye edilebilir; üstteki yağ sludge tank'a aktarılır.", "Tankerler için cargo slop tank ayrı bir sistemdir."] },
        { heading: "Bertaraf", paragraphs: ["Slop tank içeriği liman alım tesisine teslim edilir. BDN/alım makbuzu alınır ve ORB'ye kaydedilir."] }
      ],
      keyPoints: ["Slop tank seviyesi düzenli izlenmelidir.", "Yeterli slop tank kapasitesi çevre ihlallerini önler.", "Slop tank ısıtması yağ-su ayrışmasını kolaylaştırır."]
    },
    "Özel deniz alanları ve deşarj kuralları": {
      title: "Özel Deniz Alanları ve Deşarj Kuralları",
      introduction: "MARPOL çeşitli ekleri kapsamında ekolojik açıdan hassas deniz bölgelerini 'Özel Alan' olarak tanımlar ve daha sıkı deşarj kuralları uygular.",
      sections: [
        { heading: "Özel Alanlar", paragraphs: [], table: { headers: ["Ek", "Özel Alanlar"], rows: [["Annex I (Yağ)", "Akdeniz, Baltık, Karadeniz, Kızıldeniz, Körfez, Antarktika, KB Avrupa"], ["Annex IV (Pis su)", "Baltık Denizi"], ["Annex V (Çöp)", "Annex I ile aynı + Wider Caribbean, Güney Afrika"], ["Annex VI (SOx ECA)", "Baltık, Kuzey Denizi, K. Amerika, ABD Karayip"]] } }
      ],
      keyPoints: ["Özel alanlarda deşarj kuralları standard kurallardan çok daha sıkıdır.", "PSSA (Particularly Sensitive Sea Area) ek koruma tedbirleri gerektirir.", "Rota planlamasında özel alan kuralları dikkate alınmalıdır."]
    },
    "SCR (seçici katalitik indirgeme)": {
      title: "SCR (Seçici Katalitik İndirgeme)",
      introduction: "SCR, egzoz gazındaki NOx'u üre çözeltisi (AdBlue / %40 üre) kullanarak zararsız azot ve su buharına dönüştüren emisyon kontrol teknolojisidir.",
      sections: [
        { heading: "Çalışma Prensibi", paragraphs: ["Üre çözeltisi egzoz hattına enjekte edilir. Yüksek sıcaklıkta (300-400°C) üre amonyağa (NH₃) dönüşür.", "Katalizör yüzeyinde: 4NO + 4NH₃ + O₂ → 4N₂ + 6H₂O reaksiyonu gerçekleşir.", "NOx dönüşüm verimi %90-95'e ulaşır."] },
        { heading: "Sistem Bileşenleri", paragraphs: ["Üre depolama tankı, dozaj pompası, enjeksiyon nozülü, karıştırma ünitesi, SCR reaktör (katalizör), kontrol sistemi."] }
      ],
      keyPoints: ["Tier III NOx uyumu için en yaygın teknolojdir.", "Katalizör ömrü 20000-40000 saat arasındadır.", "Üre tüketimi yakıt tüketiminin yaklaşık %5-7'si kadardır."]
    },
    "EGR (egzoz gazı resirkülasyonu)": {
      title: "EGR (Egzoz Gazı Resirkülasyonu)",
      introduction: "EGR, egzoz gazının bir kısmını emme havasına karıştırarak yanma sıcaklığını düşürüp NOx oluşumunu azaltan motor-içi emisyon kontrol yöntemidir.",
      sections: [
        { heading: "Çalışma Prensibi", paragraphs: ["Egzoz gazının %20-40'ı soğutulup temizlenerek emme manifolduna geri gönderilir. CO₂ ve su buharı ısı kapasitelerinin yüksek olması nedeniyle yanma sıcaklığını düşürür.", "NOx oluşumu sıcaklığa bağlıdır (Zeldovich mekanizması); sıcaklık düşünce NOx azalır."] },
        { heading: "SCR ile Karşılaştırma", paragraphs: [], table: { headers: ["Özellik", "EGR", "SCR"], rows: [["NOx azaltma", "%50-80", "%90-95"], ["Ek kimyasal", "Yok", "Üre çözeltisi"], ["Yer ihtiyacı", "Motor üzerinde", "Egzoz hattında"], ["SFOC etkisi", "Hafif artış", "Nötr"], ["Bakım", "Yıkama suyu sistemi", "Katalizör değişimi"]] } }
      ],
      keyPoints: ["MAN B&W iki zamanlı motorlarda EGR uygulanmaktadır.", "EGR yıkama suyu (scrubber water) arıtma sistemi gerektirir.", "HP-EGR (yüksek basınç) ve LP-EGR (düşük basınç) varyantları vardır."]
    },
    "EEDI ve EEXI gereklilikleri": {
      title: "EEDI ve EEXI Gereklilikleri",
      introduction: "EEDI yeni gemiler, EEXI mevcut gemiler için uygulanan enerji verimliliği tasarım indeksleridir. Gemilerin ton-mil başına CO₂ emisyonunu sınırlandırır.",
      sections: [
        { heading: "EEDI", paragraphs: ["Energy Efficiency Design Index: Yeni gemilerin tasarım aşamasında hesaplanır. Her gemi tipi ve tonaj aralığı için referans çizgisi belirlenmiştir.", "Faz 0 (2013): Referans çizgisi. Faz 1 (2015): %10 azaltma. Faz 2 (2020): %20 azaltma. Faz 3 (2025): %30+ azaltma."], formula: { expression: "EEDI = (P × SFC × CF) / (DWT × Vref)  [gCO₂/ton·nm]", variables: ["P: Motor gücü (kW)", "SFC: Özgül yakıt tüketimi (g/kWh)", "CF: Yakıt karbon dönüşüm faktörü", "DWT: Deadweight tonnage", "Vref: Referans hız (knot)"] } },
        { heading: "EEXI", paragraphs: ["Existing Energy Efficiency Index: Mevcut gemilere 2023'ten itibaren uygulanır. EEDI ile benzer hesaplama yapılır.", "Uyumsuz gemiler motor güç sınırlama (EPL/ShaPoLi) veya diğer teknik tedbirlerle uyum sağlar."] }
      ],
      keyPoints: ["IEE (International Energy Efficiency) sertifikası zorunludur.", "EEXI tek seferlik hesaplama ve doğrulamadır.", "EEDI deniz seferinde değil, tasarım koşullarında hesaplanır."]
    },
    "CII (Karbon Yoğunluğu Göstergesi)": {
      title: "CII (Karbon Yoğunluğu Göstergesi)",
      introduction: "CII, gemilerin operasyonel karbon yoğunluğunu yıllık bazda ölçen ve derecelendiren zorunlu IMO mekanizmasıdır.",
      sections: [
        { heading: "CII Hesabı", paragraphs: [], formula: { expression: "CII = Yıllık CO₂ emisyonu / (DWT × Kat edilen mesafe)\n[gCO₂/ton·nm]", variables: ["CO₂ = Yakıt tüketimi × CF", "DWT: Deadweight", "Mesafe: Yıllık toplam seyir mesafesi"] } },
        { heading: "Derecelendirme", paragraphs: [], table: { headers: ["Derece", "Performans", "Aksiyon"], rows: [["A", "Çok iyi", "Teşvik"], ["B", "İyi", "Teşvik"], ["C", "Orta (referans)", "İzleme"], ["D", "Kötü", "Düzeltici aksiyon planı (3 yıl içinde C'ye getir)"], ["E", "Çok kötü", "Acil düzeltici aksiyon planı"]] } }
      ],
      keyPoints: ["CII her yıl hesaplanır ve referans değer sıkılaştırılır.", "D veya E alan gemiler SEEMP Part III'te düzeltici plan sunmalıdır.", "Slow steaming, trim optimizasyonu ve WHRS CII'yı iyileştirir."]
    },
    "Liman atık alım tesisi kullanımı": {
      title: "Liman Atık Alım Tesisi Kullanımı",
      introduction: "MARPOL gereği limanlar, gemilerden kaynaklanan atıkları almak için yeterli alım tesisi sağlamakla yükümlüdür.",
      sections: [
        { heading: "Teslim Edilecek Atıklar", paragraphs: [], table: { headers: ["Atık Tipi", "İlgili Ek", "Zorunluluk"], rows: [["Sludge, atık yağ", "Annex I", "Zorunlu"], ["Kimyasal kalıntı", "Annex II", "Zorunlu"], ["Plastik dahil çöp", "Annex V", "Zorunlu"], ["Pis su", "Annex IV", "Gerektiğinde"], ["Scrubber kalıntısı", "Annex VI", "Zorunlu"], ["ODS (soğutucu gaz)", "Annex VI", "Zorunlu"]] } },
        { heading: "Prosedür", paragraphs: ["Atık teslim öncesi bildirim (advance notification) limana yapılır.", "Atık alım makbuzu alınır ve ilgili kayıt defterine işlenir.", "EU Port Reception Facilities Directive uyarınca AB limanlarında tüm gemiler atıklarını teslim etmelidir."] }
      ],
      keyPoints: ["Atık teslim makbuzu PSC denetiminde istenir.", "Yetersiz alım tesisi MARPOL ihlali raporlanmalıdır.", "Atık teslim ücreti genellikle liman ücretine dahildir (no-special-fee sistemi)."]
    },
    "D-1 ve D-2 standartları": {
      title: "Balast Su D-1 ve D-2 Standartları",
      introduction: "BWM Convention kapsamında D-1 balast su değişimini, D-2 ise arıtma performans standardını tanımlar.",
      sections: [
        { heading: "D-1 Standardı (Değişim)", paragraphs: ["Açık denizde (200 nm+, 200 m+ derinlik) balast suyunun en az %95 oranında değiştirilmesidir.", "Sıralı (sequential), akıtmalı (flow-through) veya dilüsyon yöntemleri kullanılır.", "D-1 geçici bir çözümdür; tüm gemiler takvime göre D-2'ye geçecektir."] },
        { heading: "D-2 Standardı (Performans)", paragraphs: [], table: { headers: ["Organizma", "Limit"], rows: [["Canlı organizma (≥50 μm)", "< 10 / m³"], ["Canlı organizma (10-50 μm)", "< 10 / mL"], ["Vibrio cholerae", "< 1 cfu / 100 mL"], ["E. coli", "< 250 cfu / 100 mL"], ["İntestinal Enterococci", "< 100 cfu / 100 mL"]] } }
      ],
      keyPoints: ["D-2 uyumu BWTS (onaylı arıtma sistemi) kurulumu gerektirir.", "Commissioning test gemide yapılmalıdır.", "BWTS bakımı ve performans izlemesi operasyonel sorumluluktur."]
    },
    "Çöp sınıflandırma ve kayıt": {
      title: "Çöp Sınıflandırma ve Kayıt",
      introduction: "MARPOL Annex V gereği gemi çöpleri 9 kategoride sınıflandırılmalı ve Garbage Record Book'a kaydedilmelidir.",
      sections: [
        { heading: "Sınıflandırma ve Kayıt", paragraphs: ["Her atık türü için ayrı toplama kabı bulundurulmalıdır. Renk kodlama sistemi uygulanır.", "Garbage Record Book kayıtları: Atık türü, tahmini miktar, bertaraf yöntemi (denize atma, liman teslimi, incinerator), tarih, konum, imza."] },
        { heading: "Bertaraf Yöntemleri", paragraphs: [], table: { headers: ["Yöntem", "Uygun Atık"], rows: [["Liman teslimi", "Tüm atıklar"], ["İncinerator", "Kağıt, ahşap, yağlı paçavra, sludge"], ["Denize atma (koşullu)", "Yemek atığı (öğütülmüş, 3+ nm)"], ["Kompaktör", "Hacim azaltma (her tür)"]] } }
      ],
      keyPoints: ["Plastik denize atılması her koşulda yasaktır.", "Garbage Record Book 2 yıl gemide saklanmalıdır.", "Mürettebata çöp ayrıştırma eğitimi verilmelidir."]
    },
    "UV, elektroliz ve filtrasyon yöntemleri": {
      title: "Balast Su Arıtma: UV, Elektroliz ve Filtrasyon",
      introduction: "BWTS'ler farklı arıtma teknolojileri kullanarak D-2 performans standardını karşılar. Filtrasyon genellikle ön aşama olarak uygulanır.",
      sections: [
        { heading: "Arıtma Teknolojileri", paragraphs: [], table: { headers: ["Teknoloji", "Prensip", "Avantaj", "Dezavantaj"], rows: [["Filtrasyon (25-50 μm)", "Fiziksel ayırma", "Basit, güvenilir", "Tek başına yetersiz"], ["UV (orta basınç)", "DNA hasar", "Kimyasal bırakmaz", "Bulanık suda etkinlik düşer"], ["Elektro-klorinasyon", "Aktif klorür üretimi", "Yüksek etkinlik", "TRO nötralizasyonu gerekir"], ["Ozonlama", "Güçlü oksidan", "Çok etkili", "Pahalı, bakım gerektirir"]] } }
      ],
      keyPoints: ["Çoğu sistem filtrasyon + UV veya filtrasyon + elektroliz kombinasyonu kullanır.", "Aktif madde kullanan sistemler (elektroliz) IMO G9 onayına tabidir.", "Deballastlama sırasında da arıtma gerekebilir (sisteme göre)."]
    },
    "Balast su değişim bölgeleri": {
      title: "Balast Su Değişim Bölgeleri",
      introduction: "D-1 standardı kapsamında balast su değişimi belirli koşulları sağlayan açık deniz bölgelerinde yapılmalıdır.",
      sections: [
        { heading: "Değişim Koşulları", paragraphs: ["Kıyıdan en az 200 deniz mili uzakta ve su derinliği en az 200 metre olan bölgelerde yapılmalıdır.", "200 nm mümkün değilse, kıyıdan en az 50 nm uzakta ve 200 m+ derinlikte yapılabilir.", "IMO tarafından belirlenen özel değişim bölgeleri de kullanılabilir."] },
        { heading: "Güvenlik", paragraphs: ["Balast değişimi geminin stabilitesini ve yapısal bütünlüğünü riske atmamalıdır.", "Sıralı (sequential) yöntemde tanklar teker teker boşaltılıp doldurulur. Stabilite her aşamada kontrol edilir.", "Kötü hava koşullarında değişim ertelenebilir; kaptan kararı geçerlidir."] }
      ],
      keyPoints: ["Balast değişim kaydı Ballast Water Record Book'a işlenir.", "Bazı kıyı devletleri ek değişim bölgeleri belirlemiştir.", "D-2 uyumlu BWTS kurulduğunda D-1 değişimi gerekli değildir."]
    },
    "Balast su kayıt defteri": {
      title: "Balast Su Kayıt Defteri",
      introduction: "Ballast Water Record Book, tüm balast su operasyonlarının kaydedildiği zorunlu resmi belgedir.",
      sections: [
        { heading: "Kayıt Gereklilikleri", paragraphs: ["Her balast alımı, deşarjı, değişimi ve arıtma operasyonu kaydedilmelidir.", "Kayıt bilgileri: Tarih, saat, konum (enlem/boylam), tank numarası, miktar (m³), arıtma yöntemi.", "Kaptan veya yetkili zabit imzalar. Kaptan her sayfayı onaylar."] },
        { heading: "Denetim", paragraphs: ["PSC (liman devleti kontrolü) denetiminde BWM Plan ve Record Book birlikte incelenir.", "Kayıt defteri son 2 yılı gemide tutulmalıdır."] }
      ],
      keyPoints: ["Eksik veya tutarsız kayıtlar PSC deficiency olarak raporlanır.", "Elektronik kayıt sistemleri kabul edilebilir (bayrak devleti onayıyla).", "BWM Plan ile kayıtlar tutarlı olmalıdır."]
    },
  },
};

export default content5;
