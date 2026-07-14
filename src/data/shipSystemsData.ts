// Gemi Sistemleri ve Ekipmanları — Alt konu içerikleri

export interface ShipSystemFault {
  fault: string;
  cause: string;
  action: string;
}

export interface ShipSystemTopic {
  title: string;
  introduction: string;
  image?: string;
  sections: {
    heading: string;
    paragraphs: string[];
    table?: { headers: string[]; rows: string[][] };
    formula?: { expression: string; variables: string[] };
    example?: { problem: string; steps: string[]; result: string };
  }[];
  keyPoints: string[];
  workingPrinciple?: string[];
  operation?: string[];
  faults?: ShipSystemFault[];
  precautions?: string[];
}

export interface ShipSystemCategory {
  title: string;
  description: string;
  topics: ShipSystemTopic[];
}

export const shipSystemsData: Record<string, ShipSystemCategory> = {
  "deck-machinery": {
    title: "Güverte Makineleri",
    description: "Yük operasyonları, demir atma ve bağlama işlemlerinde kullanılan güverte ekipmanları",
    topics: [
      {
        title: "Demir Irgadı (Windlass)",
        introduction: "Demir ırgadı, geminin demir zincirini funda etme ve vira etme işlemlerini gerçekleştiren güverte makinesidir. Baş kasarada konumlandırılır ve geminin emniyetli bir şekilde demirlenmesini sağlar.",
        sections: [
          {
            heading: "Windlass Tipleri",
            paragraphs: [
              "Dikey tip (vertical shaft) windlass, zincir dişlisi (wildcat/gypsy) güverte altında, tahrik mekanizması güverte altı bölmesinde bulunur. Baş kasara alanından tasarruf sağlar ve büyük ticari gemilerde tercih edilir.",
              "Yatay tip (horizontal shaft) windlass, tüm bileşenleri güverte üzerindedir. Bakım kolaylığı sağlar; orta boy gemilerde yaygındır.",
              "Kombine windlass/mooring winch, hem zincir hem halat tamburu aynı şaft üzerinde bulunur. Alan ve maliyet tasarrufu sağlar."
            ],
            table: {
              headers: ["Özellik", "Dikey Tip", "Yatay Tip"],
              rows: [
                ["Tahrik konumu", "Güverte altı", "Güverte üzeri"],
                ["Alan kullanımı", "Güvertede az yer", "Güvertede çok yer"],
                ["Bakım erişimi", "Zor", "Kolay"],
                ["Tercih alanı", "Büyük gemiler", "Orta boy gemiler"]
              ]
            }
          },
          {
            heading: "Tahrik Sistemleri",
            paragraphs: [
              "Elektrik tahrikli windlass: AC veya DC motor ile çalışır. Hız kontrolü kolaydır. Modern gemilerin çoğunda kullanılır.",
              "Hidrolik tahrikli windlass: Hidrolik pompa ve motor ile çalışır. Yüksek tork kapasitesi, kompakt boyut ve aşırı yük koruması avantaj sağlar. Tanker ve bulk carrier'larda yaygındır.",
              "Elektro-hidrolik windlass, elektrik motoruyla tahrik edilen hidrolik pompanın beslediği hidrolik motor veya silindirle çalışır."
            ]
          },
          {
            heading: "Kapasite ve Hesaplama",
            paragraphs: [
              "Windlass kapasitesi Equipment Number (EN) ile belirlenir. EN değeri geminin deplasmanı, baş yüksekliği ve yanal alanına bağlıdır."
            ],
            formula: {
              expression: "EN = Δ^(2/3) + 2·B·H + A/10",
              variables: [
                "Δ: Deplasman (ton)",
                "B: Genişlik (m)",
                "H: Baş yüksekliği, su hattından güverteye (m)",
                "A: Rüzgâra maruz yanal alan (m²)"
              ]
            },
            example: {
              problem: "18 000 ton deplasmanı, 28 m genişliği, 14 m baş yüksekliği ve 3 200 m² yanal alanı olan bir geminin Equipment Number'ını hesaplayınız.",
              steps: [
                "Δ^(2/3) = 18000^(2/3) = 685.4",
                "2 × B × H = 2 × 28 × 14 = 784",
                "A/10 = 3200/10 = 320",
                "EN = 685.4 + 784 + 320 = 1789.4"
              ],
              result: "EN ≈ 1789. Bu değer, sınıf kuralları tablosundan gereken zincir kalınlığı, demir ağırlığı ve windlass çekme kapasitesini belirler."
            }
          }
        ],
        keyPoints: [
          "Windlass chain stopper'lar (zincir freni) yardımıyla zincir tutulur; windlass yük altında bırakılmaz.",
          "Funda ve vira hızı şakel/dakika gibi sabit bir ezber değerle yönetilmez; fren testi, su derinliği, zincir yükü ve üretici limitlerine göre metre/dakika olarak izlenir, şakel işaretleri ise verilen zincir boyunu takip etmek içindir.",
          "Fren bandı kuru tutulmalıdır; yağlı fren tutma kapasitesini kaybeder.",
          "Demir fundası sırasında zincir hızı kontrol altında tutulmalıdır; serbest funda kayıp demire neden olabilir."
        ],
        workingPrinciple: [
          "Elektrik veya hidrolik motor, redüktör üzerinden zincir dişlisini (wildcat) döndürür.",
          "Wildcat dişleri zincir baklalarına geçerek funda/vira hareketini sağlar.",
          "Bant freni (band brake) ve disk fren, motor durduğunda yükü tutar.",
          "Kavrama (clutch) wildcat'i şafttan ayırarak serbest funda yapılmasına izin verir.",
          "Hidrolik tipte yön valfi yağ akışını yönlendirerek dönüş yönü ve hızı belirler."
        ],
        operation: [
          "Çalıştırmadan önce lokal kumandayı, yağ seviyelerini ve fren durumunu kontrol et.",
          "Hidrolik sistemi devreye al, basınç yükselene kadar bekle.",
          "Frenleri aç, kavramayı bağla; köprüden veya lokal panelden komut ver.",
          "Funda sırasında her şak (shackle) geçişinde hız düşür; vira sırasında ampermetreyi izle.",
          "İşlem bitince kavramayı boşa al, bant freni sık, devre dışı bırak ve emniyet kilidini tak."
        ],
        faults: [
          { fault: "Wildcat dönmüyor", cause: "Elektrik beslemesi yok / hidrolik basınç düşük / fren sıkışık", action: "Şalter ve sigortayı kontrol et, pompa basıncını ölç, freni gevşet." },
          { fault: "Vira sırasında aşırı ısınma", cause: "Aşırı yük, yetersiz yağlama, yatak aşıntısı", action: "İşlemi durdur, soğut, yağ seviyesini ve yatakları kontrol et." },
          { fault: "Zincir kaymalı funda yapıyor", cause: "Bant fren balatası aşınmış veya yağlı", action: "Funda durdur, freni temizle/balata değiştir, kuru havada test et." },
          { fault: "Hidrolik yağ kaçağı", cause: "Hortum/keçe arızası, yüksek basınç darbesi", action: "Sistem basıncını boşalt, hortum/keçe değiştir, yağ seviyesini tamamla." },
          { fault: "Wildcat zincirden atlıyor", cause: "Diş aşıntısı veya yanlış zincir kalibresi", action: "İşlemi durdur, wildcat ve zincir kalibresini kontrol et, gerekirse değiştir." }
        ],
        precautions: [
          "Çalışma alanında baret, eldiven, çelik burunlu bot ve gözlük kullan.",
          "Funda sırasında zincir uçuşma alanına kimse girmemeli; bow stopper devrede tutulmalı.",
          "Bakım öncesi enerji izolasyonu (LOTO) yap, hidrolik basıncı tahliye et.",
          "Soğuk havada operasyondan önce yağı sirküle ettirerek ısıt.",
          "Demir kontrolünü kaybetmemek için her zaman bant fren elinin altında olmalı."
        ]
      },
      {
        title: "Yük Vinçleri ve Kaldırma Kapasitesi",
        introduction: "Gemi vinçleri, yük operasyonlarında kargo ambarlarına yükleme ve boşaltma işlemi yapan kaldırma donanımlarıdır. Safe Working Load (SWL) değerine göre sınıflandırılır ve düzenli teste tabi tutulur.",
        sections: [
          {
            heading: "Vinç Tipleri",
            paragraphs: [
              "Tek bumbalı jib vinç: En yaygın gemi vinci tipidir. Elektro-hidrolik veya tam elektrik tahrikli olabilir. Kaldırma, devirme (luffing), bocurgat (slewing) hareketleri vardır.",
              "Çift bumbalı vinç: İki bumba ile daha geniş çalışma alanı sağlar.",
              "Gantry crane (portal vinç): Konteyner gemilerinde ambar kapağı üzerinde hareket eden vinç. Yüksek hız ve hassas konumlandırma sağlar.",
              "Derrick (çubuk bumba): Eski tip gemilerde görülen, çubuk bumba ve halatlarla çalışan kaldırma düzeni. Union purchase yöntemi ile iki derrick eşzamanlı çalıştırılarak hızlı operasyon sağlanabilir."
            ]
          },
          {
            heading: "SWL ve Test Gereklilikleri",
            paragraphs: [
              "Safe Working Load (SWL), onaylı yük diyagramındaki bom açısı/radyus ve çalışma düzeni için izin verilen üst sınırdır; kanca bloğu, spreader ve gevşek donanım ağırlıkları hesaba katılır.",
              "Muayene, kapsamlı muayene ve proof-load kapsamı sabit bir internet tablosundan değil; bayrak devleti uygulaması, SOLAS II-1/3-13, MSC.1/Circ.1663, ILO 152 uygulanabilirliği ve geminin Register of Lifting Appliances/Cargo Gear Book kayıtlarından doğrulanır."
            ],
            table: {
              headers: ["Kontrol", "Doğrulama kaynağı", "Objektif kanıt"],
              rows: [
                ["SWL / yük diyagramı", "Onaylı plan ve üretici manual'i", "Okunur marking ve güncel load chart"],
                ["Proof-load", "İdarenin kabul ettiği test yükü ve yöntem", "Yetkili test sertifikası"],
                ["Periyodik muayene", "Bayrak/class/PMS aralığı", "Register ve kusur-kapatma kaydı"]
              ]
            }
          },
          {
            heading: "Kaldırma Kapasitesi Hesabı",
            paragraphs: [],
            formula: {
              expression: "M = F × R; R = L × cos(θ)",
              variables: [
                "M: Devirme momenti (kN·m)",
                "F: Kaldırılan yük (kN)",
                "L: Bumba uzunluğu (m)",
                "θ: Yataydan ölçülen bumba açısı (derece); R yatay çalışma yarıçapıdır"
              ]
            },
            example: {
              problem: "SWL 25 ton olan, 18 m bumba uzunluğunda ve 30° açıda çalışan bir vincin devirme momentini hesaplayınız.",
              steps: [
                "F = 25 × 9.81 = 245.25 kN",
                "M = 245.25 × 18 × cos(30°)",
                "M = 245.25 × 18 × 0.866",
                "M = 3 823 kN·m"
              ],
              result: "Devirme momenti 3 823 kN·m olup, vinç fundament tasarımı bu değere göre yapılır."
            }
          }
        ],
        keyPoints: [
          "SWL değeri vinç üzerinde net olarak işaretlenmelidir.",
          "Bumbayı düşük açıda (yüksekte) kullanmak momenti azaltır; güvenlik artar.",
          "Vinç operatörü sertifikalı olmalıdır.",
          "Halat, kanca ve blok gibi donanımlar yıllık muayenede kontrol edilir."
        ],
        workingPrinciple: [
          "Elektrik veya hidrolik motor, kaldırma (hoist) ve dönme (slewing) hareketlerini sağlar.",
          "Halat tamburu üzerinde sarılan tel halat, makaralar üzerinden kanca/grab'a iletilir.",
          "Limit anahtarları yüksek/alçak limit ve dönüş açısını sınırlar.",
          "Aşırı yük (overload) sensörü SWL aşıldığında motoru otomatik durdurur."
        ],
        operation: [
          "Operasyon öncesi SWL etiketini, halat ve sapan durumunu, fren testini doğrula.",
          "Hidrolik/elektrik sistemini ısıtarak çalıştır.",
          "Yükü dengeli sapanla bağla, ağırlık merkezini doğrula, yavaşça gerdir.",
          "Kaldırma sırasında ani durmalardan kaçın, sallanmayı kontrol et.",
          "İşlem sonunda kancayı emniyetli pozisyona al, frenleri sık, sistemi devre dışı bırak."
        ],
        faults: [
          { fault: "Kaldırma yapamıyor", cause: "Aşırı yük koruması devrede / hidrolik basınç düşük", action: "Yükü kontrol et, sensörü sıfırla, basıncı doğrula." },
          { fault: "Yük serbest düşüyor", cause: "Fren arızası, balata aşıntısı", action: "Operasyonu durdur, frenleri test et ve değiştir." },
          { fault: "Slewing tutukluk", cause: "Slewing yatağı yağsız veya hasarlı", action: "Greslenmesini yap, hasarlıysa değiştir." },
          { fault: "Halat üzerinde kuş yuvası (kink)", cause: "Hatalı sarım, gevşek tambur", action: "Halatı kontrol et, hasarlıysa değiştir, doğru sarım yap." },
          { fault: "Aşırı titreşim", cause: "Yatak aşıntısı, dengesiz tambur", action: "Yatakları ve tamburu incele, gerekirse değiştir." }
        ],
        precautions: [
          "SWL kesinlikle aşılmamalı; rüzgâr hızı limitinde operasyon durdurulmalı.",
          "Yük altında ve dönüş alanında personel bulunmamalı.",
          "Wire rope inspection; broken wire, çap kaybı, korozyon, ezilme/kink, ısı hasarı ve lubrication durumunu maker/ISO discard criteria ile kapsar. NDT yöntemi ancak uygun ekipman/prosedür özellikle gerektiriyorsa kullanılır.",
          "Operasyon sırasında haberleşme (telsiz/işaret) sürekli olmalı.",
          "Sertifikalı sapan ve kanca kullan, etiketi okunamayan ekipmanı kullanma."
        ]
      },
      {
        title: "Mooring Vinçleri ve Bağlama Sistemleri",
        introduction: "Mooring (bağlama) vinçleri, geminin rıhtıma güvenli şekilde bağlanmasını sağlar. Otomatik gerilim (auto-tension) özellikli modern vinçler, gelgit ve yükleme değişimlerinde halatı otomatik olarak ayarlar.",
        sections: [
          {
            heading: "Mooring Halat Düzeni",
            paragraphs: [
              "Head line: Baş taraftan rıhtıma ileriye doğru uzanan halat. Gemiyi rıhtıma çeker.",
              "Stern line: Kıç taraftan rıhtıma geriye doğru uzanan halat.",
              "Breast line: Gemiden rıhtıma dik olarak uzanan halat. Gemiyi rıhtıma yakın tutar.",
              "Spring line: Gemiden rıhtıma boylamasına uzanan halat. Fore spring geminin geriye kaymasını, aft spring ileri kaymasını önler.",
              "Halat türleri: Polipropilen (PP), poliamid (nylon), poliester, HMPE (Dyneema), tel halat. Farklı türlerin esneme ve kopma özellikleri farklıdır; karışık kullanım tehlikelidir."
            ]
          },
          {
            heading: "Snap-Back Tehlikesi",
            paragraphs: [
              "Gergin halat koptuğunda depolanan enerji serbest kalır ve halat geri seker (snap-back). OCIMF tavsiyelerine göre güvertede snap-back zone'lar işaretlenir.",
              "Sentetik halatlar tel halatlardan çok daha fazla enerji depolar; kopma anında çok daha tehlikelidir. Mooring operasyonlarında en çok ölüm nedeni snap-back'tir."
            ]
          },
          {
            heading: "Auto-Tension (Otomatik Gerilim)",
            paragraphs: [
              "Otomatik gerilim özellikli vinçler, halat gerilimini ayarlanan değerde sabit tutar. Gelgit, yükleme değişimi ve rüzgâr etkilerini kompanse eder.",
              "Hidrolik veya frekans kontrollü elektrik motoru ile çalışır. Gerilim sensörü (load cell) halat kuvvetini sürekli ölçer."
            ]
          }
        ],
        keyPoints: [
          "Farklı tip halatlar aynı bollard'a bağlanmamalıdır (esneme farkı tehlikelidir).",
          "Snap-back zone'larda durulmamalıdır.",
          "OCIMF MEG4 mooring ekipmanları için kılavuz standarttır.",
          "Mooring plan, geminin boyuna ve rüzgâr/akıntı koşullarına göre hazırlanır."
        ],
        workingPrinciple: [
          "Tambur (drum) bağlama halatını sarar; tension modunda halat gerginliğini otomatik ayarlar.",
          "Warping head (gypsy) ek bağlama halatlarının elle çekilmesinde kullanılır.",
          "Render tipi vinç, ayarlanan tension aşıldığında halatı kontrollü serbest bırakır.",
          "Self-tensioning sistem, gel-git veya draft değişimine göre halat boyunu otomatik ayarlar."
        ],
        operation: [
          "Operasyon öncesi halat durumu, fren ve tension ayarını kontrol et.",
          "Halatı doğru fairlead üzerinden geçir, tambura düzgün sar.",
          "Bağlama tamamlandığında bant freni sıkıca uygula ve tamburu kavramadan ayır.",
          "Auto-tension modunda set değerini gemi ve liman koşullarına göre belirle.",
          "Gel-git ve hava değişikliklerinde halat gerginliğini periyodik kontrol et."
        ],
        faults: [
          { fault: "Halat tension'ı tutmuyor", cause: "Fren balatası aşınmış / kavrama gevşek", action: "Frenleri ayarla/değiştir, kavramayı kontrol et." },
          { fault: "Auto-tension devreye girmiyor", cause: "Sensör/PLC arızası, basınç düşük", action: "Sensörü kalibre et, hidrolik basıncı kontrol et." },
          { fault: "Halat tambur üzerinde sıkışıyor", cause: "Düzgün sarılmamış halat", action: "Halatı tamamen boşalt ve yeniden düzgün sar." },
          { fault: "Snap-back zonunda halat kopması", cause: "Aşırı tension, eski halat", action: "Operasyonu durdur, halatı değiştir, snap-back zonunu boşalt." }
        ],
        precautions: [
          "Snap-back zonu boyalı olarak işaretli olmalı; bu alanda kimse durmamalı.",
          "MEG4 standardına uygun halat ve fairlead kullan.",
          "Halatı koruyucu (chafing gear) ile aşıntıdan koru.",
          "Tüm vardiyalarda mooring kontrolü yap, kayıt tut.",
          "Acil durumda halat kesme baltası (axe) erişilebilir olmalı."
        ]
      },
      {
        title: "Kapak (Hatch Cover) Mekanizmaları",
        introduction: "Ambar kapakları, yük ambarlarını deniz suyu, yağmur ve dalga etkilerinden koruyan kapama sistemleridir. Açık güverte kargo hatch cover'larında aranan temel nitelik çoğunlukla weathertight bütünlüktür; watertight terimi yalnız onaylı tasarım gerçekten bunu gerektiriyorsa kullanılmalıdır.",
        sections: [
          {
            heading: "Hatch Cover Tipleri",
            paragraphs: [],
            table: {
              headers: ["Tip", "Çalışma Şekli", "Kullanım"],
              rows: [
                ["Side-rolling", "Yana kayarak açılır", "Bulk carrier (yaygın)"],
                ["Folding (piggyback)", "Katlanarak üst üste biner", "Genel kargo"],
                ["End-rolling", "Boylamasına kayar", "Büyük ambarlar"],
                ["Lift-away", "Vinçle kaldırılır", "Eski tip gemiler"],
                ["Pontoon type", "Vinçle yerleştirilen ayrı paneller", "Büyük açıklıklar"]
              ]
            }
          },
          {
            heading: "Sızdırmazlık ve Test",
            paragraphs: [
              "Kauçuk contalar (rubber packing), compression bar, cross-joint ve drenajlar birlikte weathertight bütünlüğü sağlar; yalnız contayı değiştirmek hatalı panel hizasını veya yetersiz cleat ayarını düzeltmez.",
              "Hose test: Onaylı test düzenine göre dışarıdan su uygulanır ve içeriden giriş gözlenir; su basıncı, nozül mesafesi ve ilerleme hızı rastgele seçilmez.",
              "Ultrasonic test: Daha güvenilir bir yöntem olup, ambar içine ultrasonik verici, dışarıda alıcı ile conta sızdırmazlığı ölçülür.",
              "Tebeşir testi: Contaya tebeşir sürülerek kapatılır; kapak açıldığında çelik yüzeydeki tebeşir izi düzgün dağılmış olmalıdır."
            ]
          }
        ],
        keyPoints: [
          "Sızıntılı hatch cover yük hasarı ve stabilite kaybının ana nedenlerindendir.",
          "IACS UR S21, hatch cover dayanımını dalga yüküne göre belirler.",
          "Contalar düzenli olarak kontrol edilmeli, sertleşmiş veya hasarlı contalar değiştirilmelidir.",
          "Quick-acting cleats düzgün sıkılmazsa conta sıkıştırma yetersiz kalır."
        ],
        workingPrinciple: [
          "Hidrolik silindirler kapak panellerini açma/kapama yönünde hareket ettirir.",
          "Folding tip kapaklar menteşeli olarak katlanır; rolling tip ray üzerinde yuvarlanır.",
          "Lastik conta (rubber packing) ve clip/cleat sistemi su sızdırmazlığı sağlar.",
          "Coaming (mezarna) yüksekliği denizden gelecek suyun ambara girmesini engeller."
        ],
        operation: [
          "Açmadan önce coaming üstünü ve drenajları temizle.",
          "Hidrolik sistemi devreye al, basıncı kontrol et.",
          "Kapağı yavaş aç, hareket eden parçalara dikkat et.",
          "Kapatmadan önce conta yüzeyini kontrol et, hortum testi (hose test) yap.",
          "Tüm cleat/clip ve cross joint'leri sıkıca tespit et."
        ],
        faults: [
          { fault: "Su sızıntısı", cause: "Conta aşınmış, cleat gevşek, drenaj tıkalı", action: "Conta değişimi, cleat sıkma, drenaj temizliği yap." },
          { fault: "Hidrolik açma yapmıyor", cause: "Basınç düşük, valf arızalı", action: "Pompa ve valfleri kontrol et." },
          { fault: "Panel rayda sıkışıyor", cause: "Pas, kir, deformasyon", action: "Rayı temizle, hasarlı tekerleri değiştir." },
          { fault: "Coaming üstü çatlak", cause: "Yorulma, korozyon", action: "Hasarı kayıt altına al, sınıf onayı ile tamir et." }
        ],
        precautions: [
          "Kapak hareketi sırasında ambar ağzında kimse bulunmamalı.",
          "Yükleme öncesi/sonrası ultrasonik veya hose test ile sızdırmazlık doğrulanmalı.",
          "Conta yüzeyi yağ ve kir içermemeli; hasarlı conta hemen değiştirilmeli.",
          "Açık konumda emniyet pimleri (safety pins) takılmalı.",
          "Hidrolik bakım öncesi basınç tahliye edilmeli (LOTO)."
        ]
      },
      {
        title: "Capstan ve Güverte Donanımları",
        introduction: "Capstan, dikey eksende dönen bir tambur olup halat çekme, bağlama ve genel güverte işlerinde kullanılan yardımcı güverte makinesidir.",
        sections: [
          {
            heading: "Capstan Özellikleri",
            paragraphs: [
              "Capstan, windlass'tan farklı olarak yalnızca halat çekme amacıyla kullanılır; zincir tutma özelliği yoktur. Dikey tamburun üzerine halat birkaç tur sarılarak sürtünme kuvveti ile çekilir.",
              "Elektrik veya hidrolik tahriklidir. Baş ve kıç kasarada konumlandırılır. Mooring halatlarını çekmek ve warping operasyonları için kullanılır."
            ]
          },
          {
            heading: "Sürtünme ile Kuvvet Çoğaltma",
            paragraphs: [
              "Capstan tamburuna sarılan halattaki sürtünme kuvveti Euler formülü ile hesaplanır."
            ],
            formula: {
              expression: "T₁ = T₂ × e^(μθ)",
              variables: [
                "T₁: Yüklü taraftaki gerilim (N)",
                "T₂: Serbest taraftaki gerilim (N)",
                "μ: Sürtünme katsayısı (çelik-halat ≈ 0.25)",
                "θ: Sarım açısı (radyan)"
              ]
            },
            example: {
              problem: "Capstan üzerinde 3 tam tur sarılmış bir halat ile 200 N çekme kuvveti uygulandığında ne kadar yük tutulabilir?",
              steps: [
                "θ = 3 × 2π = 18.85 rad",
                "μ = 0.25",
                "T₁ = 200 × e^(0.25 × 18.85)",
                "T₁ = 200 × e^(4.71)",
                "T₁ = 200 × 111.3 = 22 260 N ≈ 22.3 kN"
              ],
              result: "İdeal capstan denklemi yaklaşık 22,3 kN verir; bu değer güvenli çalışma yükü değildir. Rope construction, wet/contaminated drum, fleeting angle, human tailing ve fitting SWL nedeniyle operasyon yalnız maker limitleriyle yapılır."
            }
          },
          {
            heading: "Diğer Güverte Donanımları",
            paragraphs: [
              "Bollard: Halatın bağlandığı sabit sütun. Tek, çift veya T-tip olabilir. SWL değeri üzerine işaretlidir.",
              "Fairlead (panama chock): Halatı yönlendirmek için kullanılan kılavuz. Roller veya kapalı tip olabilir.",
              "Pedestal roller: Halat yönlendirme makarası. Sürtünmeyi azaltır.",
              "Bitts: İkili bağlama babası. Halat 8 şeklinde sarılarak bağlanır."
            ]
          }
        ],
        keyPoints: [
          "Capstan'da halatı tutarken asla halat ile tambur arasına el sokulmaz.",
          "Sarım sayısı teorik sürtünme kapasitesini artırır; bunu insanın daha ağır yükü güvenle tutabileceği anlamında kullanma ve riding turn oluşmasına izin verme.",
          "Bollard/fairlead SWL'si sabit bir halat kopma yükü yüzdesinden türetilmez; onaylı mooring arrangement, fitting marking'i, tasarım yükü ve kullanılan halatın LDBF/MBL değerleri birlikte doğrulanır.",
          "Fairlead açısı halatın aşırı bükülmesini engelleyecek şekilde seçilmelidir."
        ],
        workingPrinciple: [
          "Capstan, dikey eksenli warping head'tir; halat çekme işlemini operatör eli ile yönlendirir.",
          "Elektrik veya hidrolik motorla tahrik edilir.",
          "Bollard, fairlead, chock, panama klips ve roller halatın güvenli yönlendirilmesini sağlar.",
          "Halat durdurucu (stopper) bağlama halatını vinçten bollard'a aktarırken kullanılır."
        ],
        operation: [
          "Capstan'ı çalıştırmadan önce alanı boşalt, halat üzerinde el eldivenli olmalı.",
          "Halatı capstan üzerinde 3-4 sarım yap, sürekli gergin tut.",
          "Halat yönlendirilmesinde fairlead ve chock kullan; keskin köşelerden kaçın.",
          "Halatı bollard'a 'figure of eight' (sekiz) şeklinde sar."
        ],
        faults: [
          { fault: "Capstan dönmüyor", cause: "Motor arızası, kontaktör problemi", action: "Elektrik/hidrolik beslemeyi kontrol et." },
          { fault: "Halat capstan üzerinde dönüyor (ride)", cause: "Yetersiz sarım, yağlı halat", action: "Halatı serbest bırak, yeniden doğru sar." },
          { fault: "Bollard çatlağı", cause: "Aşırı yük, korozyon", action: "Kullanımı durdur, sınıf onayı ile tamir/değiştir." }
        ],
        precautions: [
          "Capstan üzerinde halat varken motoru durdurma; halat sıkışabilir.",
          "Eldiven halat dolanma riski yarattığından sıkı kavrama yapılmamalı.",
          "Snap-back alanında durulmamalı.",
          "Deck fitting, foundation, weld, marking ve movable parts onaylı PMS/survey planıyla muayene edilir; NDT yöntemi kusur mekanizması ve yetkili survey talebine göre seçilir."
        ]
      }
    ]
  },

  "nav-systems": {
    title: "Seyir Sistemleri ve Cihazları",
    description: "Köprüüstü seyir cihazları, elektronik seyir sistemleri ve iletişim ekipmanları",
    topics: [
      {
        title: "Radar Sistemi",
        introduction: "Deniz radarı; sabit ve hareketli hedefleri tespit etmek, mesafe ile kerteriz ölçmek, kıyı seyrini ve çatışma riski değerlendirmesini desteklemek için kullanılan aktif bir seyir sensörüdür. Radarın taşınma adedi ve X/S-band düzeni geminin tipi, gros tonajı ve yapım tarihine göre SOLAS V/19 ile ilgili Record of Equipment üzerinden belirlenir; 'her ticari gemide aynı radar düzeni zorunludur' şeklinde genellenmez.",
        sections: [
          {
            heading: "Radarın Görevi ve Sinyal Zinciri",
            paragraphs: [
              "Magnetronlu veya solid-state verici, scanner üzerinden elektromanyetik enerji yollar. Hedeften dönen ekonun gidiş-dönüş süresi mesafeyi; antenin azimut konumu relative bearing'i verir. Gyro heading eklenince true bearing ve north-up/cours-up sunum üretilebilir.",
              "Receiver ve signal processor çok zayıf ekoyu yükseltirken sea clutter, rain clutter ve interference'i bastırmaya çalışır. Gain veya clutter kontrolünün aşırı kullanılması yalnız paraziti değil küçük tekne, şamandıra, düşük kıyı veya dalga arasındaki gerçek hedefi de silebilir.",
              "Radarın operasyonel değeri yalnız ekoyu göstermesi değildir: doğru presentation/motion seçimi, uygun range scale, EBL/VRM ölçümü, parallel index, trails ve ARPA target tracking aynı resmin farklı kanıt katmanlarıdır."
            ],
            formula: {
              expression: "R = (c × t) / 2",
              variables: [
                "R: Hedef mesafesi (m)",
                "c: Işık hızı (3 × 10⁸ m/s)",
                "t: Gidiş-dönüş süresi (s)"
              ]
            },
            example: {
              problem: "Bir radarın gönderdiği darbe 12.4 μs sonra geri dönüyorsa hedef ne kadar uzaktadır?",
              steps: [
                "t = 12.4 × 10⁻⁶ s",
                "R = (3 × 10⁸ × 12.4 × 10⁻⁶) / 2",
                "R = 3 720 / 2 = 1 860 m",
                "R = 1 860 / 1 852 ≈ 1.0 NM"
              ],
              result: "Hedef yaklaşık 1.0 deniz mili mesafededir."
            }
          },
          {
            heading: "X-Band ve S-Band: Birbirinin Yedeği Değil, Farklı Görüş",
            paragraphs: [
              "X-band yaklaşık 9 GHz/3 cm dalga boyunda çalışır; ince hedef ve kıyı detayında yüksek ayrım sağlar, radar SART'ı interrogate eder fakat yağıştan daha fazla etkilenebilir. S-band yaklaşık 3 GHz/10 cm dalga boyundadır; şiddetli yağış ve bazı deniz koşullarında daha kararlı uzun menzil resmi verebilir fakat klasik radar SART yanıtını göstermez.",
              "İki radar varsa aynı ayar ve range'de kopya ekran gibi kullanılmamalıdır. Farklı band, range, pulse/presentation ve clutter ayarıyla ortak kör noktaları azaltan bağımsız resimler oluşturulur."
            ],
            table: {
              headers: ["Operasyonel özellik", "X-Band (yaklaşık 9 GHz)", "S-Band (yaklaşık 3 GHz)"],
              rows: [
                ["Yaklaşık dalga boyu", "3 cm", "10 cm"],
                ["Küçük hedef/kıyı detayı", "Genellikle daha iyi", "Genellikle daha kaba fakat yağışta daha kararlı olabilir"],
                ["Yağış zayıflaması", "Daha belirgin", "Daha az belirgin"],
                ["Klasik radar SART", "Gösterir", "Göstermez"],
                ["Taşıma hükmü", "Gemi tipi/GT/yapım tarihine göre", "İkinci radar hükmü ve onaylı düzenlemeye göre"]
              ]
            }
          },
          {
            heading: "Ekranı Kurma: Range, Presentation, Gain ve Clutter",
            paragraphs: [
              "Önce brilliance/contrast ve background, sonra uygun range scale ile orientation ve motion seçilir. Head-up unstabilized basit relative resmi verir; gyro-stabilized course-up veya north-up harita ve true bearing karşılaştırmasını kolaylaştırır. Relative motion ve true motion, hedef vektörü değil bütün radar resminin hareket referansıdır.",
              "Gain, boş alanda hafif speckle görülecek seviyeden az miktar geri alınarak manuel doğrulanır. Sea clutter yakın çevrede dalga ekolarını; rain clutter yağış hücrelerini bastırır. Kontroller en düşük gerekli seviyede tutulur ve küçük hedeflerin kaybolmadığı farklı range'lerde tekrar kontrol edilir.",
              "Kısa pulse yakın hedef ayrımını, uzun pulse/uygun processing uzak hedef enerjisini destekler. Solid-state cihazdaki pulse-compression/auto modes üreticiye özgüdür; kullanıcı hangi otomatik fonksiyonun aktif olduğunu ekrandan bilmelidir."
            ]
          },
          {
            heading: "Eko Okuma, Kör Sektörler ve Sahte Hedefler",
            paragraphs: [
              "Shadow/blind sector; mast, baca, crane veya yük nedeniyle belirli kerterizde hedefin zayıflaması ya da kaybolmasıdır. Bu sektörler bridge poster/inspection bilgisi ve diğer radar/görsel gözcülükle yönetilir.",
              "Side-lobe, multiple echo, indirect echo, second-trace ve interference gerçek hedefe benzeyebilir. Sabit objeye göre hareket, range değişimindeki davranış, başka radar ve görsel kontrol ile ayrıştırılır.",
              "Ducting, yoğun yağış, sea state, hedef radar cross-section'ı ve anten yüksekliği detection range'i değiştirir. Radar ufkunun ötesindeki veya düşük RCS'li hedefin görünmemesi hedefin bulunmadığı anlamına gelmez."
            ]
          },
          {
            heading: "EBL/VRM, Parallel Index ve Clearing Range",
            paragraphs: [
              "EBL/VRM ile ölçülen bearing/range; cursor veya ekran göz kararı yerine karar verilebilir nicel kanıt sağlar. Relative bearing kullanılıyorsa gyro/heading error ve own-ship heading referansı ayrıca ele alınır.",
              "Parallel index, sabit bir radar objesinin planlanmış PI çizgisine göre hareketini izleyerek cross-track durumunu gösterir; elektronik rota çizgisinin kopyası değildir. PI, uygun radar-conspicuous obje, doğru range/bearing ve passage plan üzerinde hesaplanmış clearing distances ile hazırlanır.",
              "Bir sabit objenin EBL bearing trendi, radar bearing alignment ve compass error kontrolünü destekler. Radar overlay hizası aynı GNSS/gyro hatasını paylaşabileceğinden tek başına bağımsız mevki kontrolü sayılmaz."
            ]
          },
          {
            heading: "ARPA, Vektörler ve Trial Manoeuvre",
            paragraphs: [
              "ARPA ardışık radar ölçümlerinden hedef track'i kurar; own-ship heading ve speed girdisiyle relative/true course-speed, CPA ve TCPA tahmini üretir. Yeni acquire edilen, manevra yapan, ekosu birleşen veya clutter içinde kalan hedefin çözümü kararsız olabilir.",
              "Relative vector, mevcut hareketler sürerse hedefin own ship'e göre izleyeceği yolu; true vector, seçilen ground/water speed referansına göre gerçek yön ve sürati gösterir. Vector mode/time okunmadan yalnız okun ucuna bakmak yanlış manevra yorumuna yol açar.",
              "Trial manoeuvre karar desteğidir; gecikme süresi, planlanan course/speed change ve hedeflerin mevcut track varsayımına bağlıdır. Sonuç COLREG sorumluluğunu, görsel gözcülüğü veya köprüüstü takım değerlendirmesini devralmaz."
            ],
            table: {
              headers: ["ARPA girdisi/durumu", "Bozulursa görülen etki", "OOW kontrolü"],
              rows: [
                ["Gyro heading", "True vector/course ve bearing yanlışlaşır", "Radar heading ile master/repeater değerini karşılaştır"],
                ["Speed through water/ground", "True motion ve target true vector değişir", "Seçili speed source/mode'u doğrula"],
                ["Target track history", "Manevrada CPA/TCPA geç tepki verir", "Bearing/range trendini manuel izle"],
                ["Echo continuity", "Target swap/lost target oluşabilir", "Eko ile sembolün aynı hedefte kaldığını kontrol et"]
              ]
            }
          },
          {
            heading: "COLREG İçinde Radar Karar Zinciri",
            paragraphs: [
              "Rule 5 tüm uygun araçlarla gözcülük; Rule 6 emniyetli hız; Rule 7 çatışma riskinin mevcut tüm araçlarla belirlenmesi; Rule 8 erken, belirgin ve emniyetli kaçınma hareketi ister. Sabit kalan veya yeterince değişmeyen bearing, azalan range ile birlikte ciddi risk işaretidir; yakın mesafede bearing değişse bile risk bulunabilir.",
              "Kısıtlı görüşte Rule 19 uygulanır. Radar hedefinin forward/abaft the beam konumu, close-quarters risk ve course alteration yönü birlikte düşünülür; yalnız AIS adı veya VHF anlaşmasıyla COLREG manevrası kurulmaz.",
              "Radar plotting bir defalık CPA okuması değildir. Hedef acquire edilir, çözümün oturması beklenir, bearing/range-vektör trendi izlenir, yapılan manevranın etkisi yeterli süre sonra yeniden kontrol edilir."
            ]
          },
          {
            heading: "Performans, Sensör Kaybı ve Yedek Kullanım",
            paragraphs: [
              "Performance monitor/BITE sonucu, sea return ve bilinen radar-conspicuous objelerin görünümü günlük operasyonel performans kanıtıdır. Magnetronlu sistemlerde warm-up/tuning davranışı; solid-state sistemlerde self-test ve module status üretici kitabına göre izlenir.",
              "Heading/speed input kaybında radar ekosu bulunabilir fakat stabilization ve ARPA true data güvenilirliği bozulur. Kullanıcı arızalı katmanı ayırır, relative ölçüm ve manuel plotting/diğer radar-görsel yöntemlere döner, Kaptanı bilgilendirir ve arızayı kaydeder.",
              "Radar arızasında hedefi 'onarım yaparak' değil, önce safe speed, ek gözcü, alternatif radar/seyir sensörü ve gerekirse rota/alan değişikliği ile operasyonel olarak emniyete almak vardiya zabitinin ilk görevidir."
            ]
          }
        ],
        keyPoints: [
          "Radar resmi ayardan bağımsız değildir; aşırı sea/rain clutter gerçek hedefi silebilir.",
          "Range, bearing ve bearing trendi, tek bir CPA/TCPA sayısından daha temel kanıttır.",
          "Relative/true motion ile relative/true vector farklı kavramlardır ve her vardiyada bilinçli seçilir.",
          "ARPA target symbol'ü gerçek ekodan ayrılmamalı; target swap/lost target ihtimali izlenmelidir.",
          "Parallel index bir clearing ve cross-track tekniğidir; elektronik mevkiyi bağımsız doğrulayan tek araç değildir.",
          "Radar COLREG kararını destekler; görsel gözcülük, safe speed ve erken/substantial action sorumluluğunu devralmaz."
        ],
        workingPrinciple: [
          "Verici-scanner hedefe enerji yollar; receiver dönen ekoyu işler.",
          "Gidiş-dönüş zamanı range'i, antenna azimuth relative bearing'i üretir.",
          "Gyro heading true bearing ve stabilized presentation; seçili log/GNSS speed ise true motion/ARPA çözümünü besler.",
          "Gain ve clutter processing detection ile false echo bastırma arasında bir denge kurar.",
          "ARPA ardışık range/bearing ölçümlerinden track ve CPA/TCPA tahmin eder.",
          "Kullanıcı EBL/VRM, PI, trails, ikinci radar ve görsel bilgiyle çıktıyı doğrular."
        ],
        operation: [
          "Power/BITE, scanner area, heading ve speed sensor status ile radar time/alarm durumunu doğrula; magnetronlu tipte maker warm-up süresini bekle.",
          "Seyir safhasına uygun range, orientation ve relative/true motion seç; ikinci radar varsa farklı band/range ile tamamlayıcı resim kur.",
          "Brilliance/contrast ve gain'i manuel referansla ayarla; sea/rain clutter'ı minimum gerekli seviyede kullanıp küçük hedefleri farklı range'lerde kontrol et.",
          "Known heading/bearing alignment, range accuracy ve performance monitor/sea-return kontrolünü gemi checklist'ine göre yap.",
          "EBL/VRM ile nicel range/bearing al; coastal passage'ta passage plan PI ve clearing ranges'i kur.",
          "Önemli hedefleri acquire et; echo-symbol eşleşmesini, vector mode/time, speed source ve tracking history'yi oku.",
          "CPA/TCPA'yı bearing/range trendi, visual lookout, AIS identity ve ikinci radar bilgisiyle çaprazla.",
          "Trial manoeuvre kullanılıyorsa delay ve planlanan course/speed change'i doğru gir; COLREG ve bridge-team değerlendirmesiyle karar ver.",
          "Manevra sonrası hedefleri yeniden plot et; passing distance açılmasını ve close-quarters riskinin gerçekten bittiğini doğrula."
        ],
        faults: [
          { fault: "Zayıf/eksik eko", cause: "Aşırı clutter/gain ayarı, yanlış range/pulse, shadow sector, ağır yağış veya transmitter/receiver performansı", action: "Önce ayarı ve bilinen objeyi farklı range/band ile doğrula; ikinci radar/görsel gözcülüğe geç, PM/BITE sonucunu kaydet ve Kaptanı bilgilendir." },
          { fault: "Heading line/ekolar haritayla hizasız", cause: "Gyro input/repeater farkı, antenna azimuth alignment veya heading source seçimi", action: "Master/repeater ve radar heading'i karşılaştır; true bearing/overlay/ARPA true data'ya güveni kes, relative ölçüm ve bağımsız fix kullan." },
          { fault: "Anten/scanner alarmı", cause: "Drive, obstruction, interlock veya power fault", action: "Transmit'i maker prosedürüne göre kes; anten alanına LOTO olmadan çıkma, diğer radar ve safe-navigation önlemlerini kur." },
          { fault: "ARPA target swap/lost target", cause: "Ekoların birleşmesi, clutter, hedef manevrası veya tracking discontinuity", action: "Sembolü gerçek eko ile yeniden eşleştir; manuel EBL/VRM plotting ve görsel/radar çapraz kontrol yap." },
          { fault: "True vector/CPA mantıksız", cause: "Yanlış speed source, gyro/log kaybı, vector mode/time veya target solution kararsızlığı", action: "Source ve mode'u doğrula; bearing/range trendine dön, çözüm oturmadan manevra kararı verme." },
          { fault: "Radar display/power kaybı", cause: "Besleme, PSU/display veya network fault", action: "Stand-by/ikinci radara geç; safe speed, ek gözcü ve Master call uygula, yeniden başlatmayı maker/SMS sınırında yap." }
        ],
        precautions: [
          "Scanner/anten alanında çalışma için transmit inhibit tek başına yeterli kabul edilmez; üretici LOTO ve permit prosedürünü uygula.",
          "Radar ayarını bir önceki vardiyadan körlemesine alma; visibility, sea state, traffic ve range değiştikçe yeniden optimize et.",
          "Radar/AIS association, overlay veya ARPA sembolünü gerçek radar ekosunun yerine koyma.",
          "Alarmı yalnız susturma; sensor source, mode ve hedef çözümüne etkisini değerlendir.",
          "Bakım/kalibrasyon ve magnetron/module değişimi yetkili personel/maker prosedürü işidir; OOW'un ilk görevi seyri emniyete almaktır.",
          "MSC.192(79), maker manual, bridge checklist ve passage plan PI kayıtlarını gemiye özgü referans olarak kullan."
        ]
      },
      {
        title: "ECDIS (Elektronik Harita Sistemi)",
        introduction: "ECDIS; type-approved donanım/yazılım, resmî ve güncel ENC/uygun olduğunda RNC verisi, yetkin kullanıcı ve yeterli bağımsız backup düzeni birlikte sağlandığında SOLAS V/19 ve V/27 kapsamındaki harita/yayın taşıma yükümlülüğünü karşılayabilen emniyet-kritik bir seyir sistemidir. Tek başına bir ekran veya rota çizgisi 'kâğıt haritanın otomatik eşdeğeri' değildir.",
        sections: [
          {
            heading: "Yasal Statü, Taşıma Kapsamı ve Backup",
            paragraphs: [
              "ECDIS carriage requirement tüm SOLAS gemileri için aynı değildir; gemi tipi, GT, yapım tarihi ve uygulanabilir geçiş hükümleri Record of Equipment'tan doğrulanır. Carriage zorunluluğu ile backup düzeni de ayrı konulardır: ikinci bağımsız ECDIS, güncel kâğıt folyo veya İdarenin kabul ettiği başka yeterli düzen geminin onaylı dokümanında tanımlanır.",
              "ECDIS ancak resmî Hydrographic Office yetkisiyle yayımlanmış ve güncel ENC/ENDS ile onaylı çalışma modunda kullanıldığında yasal chart function sağlar. ECS, web haritası, pilot uygulaması veya unofficial chart ECDIS ekranında görünse bile SOLAS harita taşıma şartını karşılamaz.",
              "RNC'nin bulunduğu RCDS modunda ECDIS'in vektör alarm/sorgu kabiliyetleri azalır. RCDS kullanımı, gerekli güncel kâğıt haritalar ve flag/route kapsamına ilişkin prosedürle birlikte yönetilir; ekranda raster harita açmak otomatik yasal eşdeğerlik sağlamaz."
            ]
          },
          {
            heading: "Veri Zinciri: ENC, SENC, Permit, Update ve Presentation",
            paragraphs: [
              "Legacy ECDIS'te resmî vektör ENC esas olarak IHO S-57 transfer standardında dağıtılır; S-63 veri koruma/permit mekanizmasıyla yüklenir ve üretici iç formatındaki SENC'e lossless dönüştürülür. Ekrandaki sembol/renk ve display category IHO S-52 Presentation Library ile cihaz performans standardına uyar.",
              "S-101, S-100 tabanlı yeni nesil ENC ürünüdür ve her mevcut S-57 ECDIS'te açılamaz. MSC.530(106), 1 Ocak 2026-31 Aralık 2028 arasında kurulan ekipmanda MSC.232(82) veya yeni standardı kabul eder; 1 Ocak 2029'dan itibaren kurulan ECDIS yeni/S-100 yetenekli standarda göre olacaktır. Bu bir gecede bütün gemi ENC'lerinin S-101'e döndüğü anlamına gelmez.",
              "Base cell, new edition ve incremental update sırası, permit süresi, update log/rejection ve presentation library/software compatibility birlikte kontrol edilir. Update'ler resmî servis tarafından yayımlandıkça uygulanır; çoğu servis haftalık paket kullansa da 'haftada bir düğmeye basmak' güncelliğin tek kanıtı değildir."
            ],
            table: {
              headers: ["Katman", "Görevi", "OOW'un doğruladığı kanıt"],
              rows: [
                ["ENC/ENDS", "Yetkili hidrografi verisi", "Producer, edition/update status, coverage ve usage band"],
                ["Permit/S-63", "Lisans ve veri bütünlüğü", "Geçerlilik, cell permit ve rejected update raporu"],
                ["SENC", "ECDIS'in kullandığı iç veri tabanı", "Load/update success ve correct cell edition"],
                ["Presentation", "Sembol, renk, display category ve SCAMIN", "Standard/All/Custom display, scale ve object query"]
              ]
            }
          },
          {
            heading: "Appraisal: Harita Kapsamı ve Veri Kalitesi",
            paragraphs: [
              "Passage appraisal, kalkıştan varışa ve contingency/abort limanlarına kadar resmî ENC kapsamını, appropriate usage band/compilation scale'i, permit'leri, latest updates'i, T&P/AVCS information overlay benzeri servisleri ve gerekli nautical publications'i kontrol eder.",
              "Overscale, underscale, no data, better-scale ENC available ve datum shift göstergeleri anlamıyla okunur. Zoom yapmak yeni detay üretmez; source/compilation scale aşıldığında konum ve obje geometrisi sahte hassasiyet hissi verebilir.",
              "CATZOC/quality of bathymetric data ve source diagram, derinlik bilgisinin survey kalitesini ve belirsizliğini anlatır; güvenli su 'mavi-beyaz renk' kadar kesin değildir. UKC/route kararında bu kalite, squat, tide ve gemi hareketiyle birlikte değerlendirilir."
            ]
          },
          {
            heading: "Safety Settings: Safety Depth, Safety Contour, XTD ve Look-Ahead",
            paragraphs: [
              "Safety depth, spot sounding'lerin vurgulanma eşiğidir; tek başına alarm sınırı değildir. Safety contour, user value'ya eşit kontur yoksa ENC'deki bir sonraki daha derin mevcut konturun seçilmesiyle güvenli/tehlikeli su sınırı gibi kullanılır ve crossing/approach uyarı mantığını besler.",
              "Shallow ve deep contour esas olarak renk bandı ve durum farkındalığını düzenler. XTD rota koridorudur; her bacakta channel width, traffic, positioning accuracy, bank/turning ve abort alanına göre farklı olabilir. Look-ahead/time-or-distance sector ise üretici arayüzüne bağlıdır ve geminin gerçek stopping/turning ihtiyacına göre ayarlanır.",
              "Safety settings şirket UKC politikası ve Master-approved passage plan'dan türetilir. Static draft'a squat, heel/list, wave response/density allowance, required UKC ve height of tide etkisi açık işaret kuralıyla eklenir; ECDIS'teki tek draft alanı bu hesabı kendi başına yapmış sayılmaz."
            ],
            table: {
              headers: ["Ayar", "Ne kontrol eder", "Yaygın hata"],
              rows: [
                ["Safety depth", "Sounding vurgusu", "Alarm veren kontur sanmak"],
                ["Safety contour", "Safe/unsafe water sınırı ve crossing alarmı", "Girilen sayının aynen kontur olarak çizileceğini sanmak"],
                ["XTD", "Route corridor/off-track limiti", "Tüm bacaklarda aynı değer kullanmak"],
                ["Look-ahead", "İleri yöndeki tehlike taraması", "Aşırı kısa tutmak veya alarm yükü nedeniyle kapatmak"],
                ["Shallow/deep contour", "Renk bandı ve durum farkındalığı", "UKC alarmı sanmak"]
              ]
            },
            formula: {
              expression: "Gerekli charted depth ≈ static draft + squat + dynamic allowances + minimum UKC − height of tide",
              variables: [
                "Terimler ve işaret kuralı şirket UKC politikasına göre yazılır.",
                "Dynamic allowances: heel/list, wave response, density ve ölçüm/survey belirsizliği gibi gemiye/sefere özgü paylar.",
                "Safety contour değeri sonuçtan türetilir; ENC'de eşit kontur yoksa ECDIS bir sonraki daha derin konturu kullanır."
              ]
            }
          },
          {
            heading: "Route Planning: Otomatik Check'ten Sonra İnsan Kontrolü",
            paragraphs: [
              "Route, berth-to-berth hazırlanır; waypoint/leg, turn radius/wheel-over, speed plan, XTD, clearing range/PI, reporting point, no-go/limiting danger line, abort point, contingency anchorage ve pilotage notları tek passage plan mantığında bağlanır.",
              "Automatic route check seçili safety contour ve mariner objects'e göre uyarı üretir fakat ekran dışında kalan obje, yanlış display/scale, user chart, T&P information, chart quality veya software interpretation eksiklerini garantiyle yakalayamaz. Zero warning, safe route sertifikası değildir.",
              "OOW rotayı appropriate largest scale/usage band üzerinde leg-by-leg görsel inceler, her alarm/indication'ı resolve edip gerekçelendirir ve Master approval sonrası protected route olarak kullanır. Son dakika route revision aynı appraisal-check-visual review-approval zincirinden geçer."
            ]
          },
          {
            heading: "Route Monitoring ve Bağımsız Mevki Kontrolü",
            paragraphs: [
              "Monitoring modunda active route/leg, cross-track, next waypoint/turn, selected position-heading-speed sensors, chart scale ve alarms aynı anda izlenir. Track-control/autopilot bağlantısı varsa mode awareness ve manual takeover hazırlığı özellikle korunur.",
              "Primary GNSS position, mümkün olan bağımsız ikinci PNT kaynağı ve radar/visual/terrestrial fix ile çaprazlanır. İki ECDIS'in aynı GNSS/gyro/log'u kullanması iki bağımsız doğrulama değildir. Radar overlay de çoğu zaman aynı heading/position input'u paylaşır.",
              "Manual fix yalnız sembol koymak değil; source, time, accuracy ve discrepancy'nin kaydıdır. Position jump/freeze, spoofing/jamming, datum uyuşmazlığı veya charted object misalignment görüldüğünde track-control bağımlılığı kesilir, Kaptan çağrılır ve safe speed/sea room yeniden değerlendirilir."
            ]
          },
          {
            heading: "Alarm Yönetimi ve Over-Reliance",
            paragraphs: [
              "Alarm, warning ve caution/indication üreticiye ve geçerli performance standardına göre farklı öncelik ve ses davranışı gösterebilir. Acknowledge yalnız sesi yönetir; tehlike veya sensor failure'ı gidermez. Alarm listesi, source ve consequence okunmadan toplu susturma yapılmaz.",
              "Alarm yorgunluğu çoğunlukla yanlış safety settings, gereksiz user layers, uygun olmayan look-ahead/XTD veya çözülmemiş chart object'lerden doğar. Çözüm sistemi duyarsızlaştırmak değil passage plan ve ayarı operasyon bağlamına göre düzeltmektir.",
              "Over-reliance yalnız pencereden dışarı bakmamak değildir: automatic route check'i mutlak kabul etmek, same-source iki ekranı bağımsız sanmak, chart zoom'u doğruluk artışı sanmak ve predicted position'ı measured fix gibi okumak da over-reliance örnekleridir."
            ]
          },
          {
            heading: "Arıza ve Backup'a Geçiş",
            paragraphs: [
              "ECDIS failure; black screen kadar position/heading source loss, frozen data, corrupted SENC, permit/update failure, wrong time, network lag, unsafe settings veya backup unit'in aynı common-mode hataya bağlı olması da olabilir.",
              "Backup arrangement primary ECDIS arızalandığı anda kullanıma hazır, güncel ve passage plan transferi/yeniden oluşturma yöntemi bilinir olmalıdır. İkinci ECDIS aynı switchboard, GNSS veya network failure'dan etkileniyorsa gerçek bağımsızlık şirket risk değerlendirmesinde ele alınır.",
              "Arızada OOW önce seyri emniyete alır: manual steering/appropriate mode, safe speed, ek gözcü/fix sıklığı, alternatif chart/navigation method ve Master call. Reboot/servis işlemi, navigational risk kontrol altına alındıktan sonra maker/SMS'e göre yapılır."
            ]
          },
          {
            heading: "Yetkinlik, Familiarization ve 2026-2029 Geçişi",
            paragraphs: [
              "STCW'ye göre ECDIS kullanan zabit gerekli generic ECDIS competence'a sahip olmalıdır. Gemiye katıldığında ISM/SMS kapsamında o üretici/model, menu logic, alarms, route transfer, sensor selection ve backup için familiarization gerekir. Her durumda uluslararası bir 'type-specific certificate' adıyla tek tip ayrı sertifika zorunluymuş gibi yazılmaz; flag/company şartları ayrıca kontrol edilir.",
              "1 Ocak 2026-2028 arasında yeni kurulan ECDIS MSC.232(82) veya MSC.530(106) ailesine uygun olabilir; 1 Ocak 2029'dan itibaren yeni kurulumlar S-100 ürün ailesini destekleyen revize standarda geçer. Kullanıcı, kendi cihazının type-approval baseline ve software/presentation library sürümünü servis kayıtlarından bilmelidir."
            ]
          }
        ],
        keyPoints: [
          "Yasal ECDIS işlevi; type approval + resmî/güncel veri + yetkin kullanım + yeterli backup zinciridir.",
          "Safety depth sounding vurgusudur; safety contour alarm sınırını besleyen seçili/sonraki daha derin ENC konturudur.",
          "Automatic route check gerekli fakat yeterli değildir; uygun ölçekte leg-by-leg görsel kontrol zorunlu iş akışıdır.",
          "İki ekran aynı GNSS/gyro/log'u kullanıyorsa ortak hata bakımından bağımsız değildir.",
          "Overscale/zoom, CATZOC, datum ve source scale bilgisi ekrandaki geometrinin belirsizliğini belirler.",
          "S-101/S-100 geçişi cihaz kurulum tarihine ve type approval'a bağlıdır; legacy S-57 ENC bir anda geçersiz olmaz."
        ],
        workingPrinciple: [
          "Resmî ENC/permit/update paketi doğrulanır ve ECDIS içindeki SENC'e dönüştürülür.",
          "Presentation library, seçili display category ve scale'e göre chart objects'i standardize sembollerle sunar.",
          "GNSS, gyro, log ve diğer sensörler own-ship position/heading/speed katmanını besler; source/status kullanıcı tarafından izlenir.",
          "Safety settings ile route geometry, automatic check ve monitoring alerts birlikte çalışır.",
          "Bridge team resmî chart data'yı publications, manual fixes, radar/visual bilgi ve UKC/passsage plan varsayımlarıyla çaprazlar.",
          "Backup arrangement, update/route data ve bağımsız güç/sensör riskleriyle primary failure'da seyri sürdürebilir durumda tutulur."
        ],
        operation: [
          "Record of Equipment, type approval baseline ve onaylı backup düzenini; primary/backup güç ve sensör kaynaklarını doğrula.",
          "Berth-to-berth resmî ENC/RNC kapsamı, usage band/scale, permit, edition/update status, rejected updates ve publications'i appraisal aşamasında kontrol et.",
          "Static draft, squat, dynamic allowances, tide ve minimum UKC politikasından safety depth/contour; her leg riskinden XTD ve look-ahead ayarlarını türet.",
          "Waypoint, turn/wheel-over, speed, clearing/PI, no-go, abort/contingency ve reporting bilgileriyle rotayı planla.",
          "Automatic route check'i çalıştır; tüm uyarıları çöz ve rotayı appropriate largest scale'de leg-by-leg görsel incele.",
          "Master approval/revision control ile active route'u koru; primary ve backup'a doğru/current route transferini doğrula.",
          "Monitoring'de active leg, source/status, chart scale, XTD, safety/look-ahead alarms ve next turn'ü sürekli izle.",
          "Primary GNSS'i bağımsız fix/second PNT ve radar-visual bilgiyle planlı aralıkta çaprazla; discrepancy'yi kaydet ve Master'a yükselt.",
          "Alarmı neden/consequence ile yönet; acknowledgement sonrası düzeltici hareketi ve rota/ayar değişikliğini kaydet.",
          "Arıza/position doubt'ta backup prosedürüne geç, safe speed/steering/fix sıklığını yeniden kur ve primary sistemi ancak seyir emniyete alındıktan sonra troubleshoot et."
        ],
        faults: [
          { fault: "Position freeze/jump veya impossible COG/SOG", cause: "GNSS loss, jamming/spoofing, network latency, wrong source veya dead reckoning", action: "Track-control bağımlılığını kes; radar/visual/independent fix'e dön, source/time/status'u kontrol et ve Kaptanı çağır." },
          { fault: "Chart ile radar/görsel obje hizasız", cause: "Position/heading error, datum/ENC quality, radar alignment veya common sensor fault", action: "Overlay'i bağımsız kanıt sayma; position ve heading'i ayrı ayrı kontrol et, manual fix koy ve safe-navigation margin'i büyüt." },
          { fault: "ENC update rejected/missing cell", cause: "Yanlış sıra, expired permit, corrupted media, SENC/software incompatibility", action: "Update log ve cell status'u incele; resmî servisten doğru base/new edition/update'i yükle, etkilenmiş rota için alternative chart/backup kur." },
          { fault: "Route check çok sayıda alarm veriyor", cause: "Yanlış safety contour/XTD/look-ahead, inappropriate route geometry veya custom layers", action: "Alarmı disable etme; UKC/passage assumptions ve her leg'i yeniden değerlendir, gerçek tehlike ile nuisance kaynağını ayır." },
          { fault: "Route check sıfır alarm veriyor", cause: "Safety settings/scan extent yanlış, display/data eksik veya rota yeterince incelenmemiş", action: "Bunu emniyet kanıtı sayma; appropriate scale'de leg-by-leg visual inspection ve independent review yap." },
          { fault: "Primary ECDIS dondu/black screen", cause: "Power, workstation, network veya software fault", action: "Onaylı backup'a geç; route/update/source durumunu doğrula, safe speed/ek fix/bridge team önlemlerini kur ve sonra maker restart prosedürünü uygula." },
          { fault: "Primary ve backup aynı anda yanlış", cause: "Common GNSS/gyro/network/power veya aynı corrupted route/data", action: "Common-mode kaynağı izole et; kâğıt/alternative navigation, manual fixing ve Master/company contingency prosedürüne geç." }
        ],
        precautions: [
          "Backup tipini varsayma; Cargo/Passenger Ship Safety Equipment Record ve şirket onaylı arrangement'tan doğrula.",
          "Generic ECDIS competence ile gemideki üretici/model familiarization'ını ayrı gereklilikler olarak yönet.",
          "ENC, permit ve update'i yalnız resmî/authorized chart service zincirinden al; unofficial overlay'i chart source gibi sunma.",
          "Safety settings'i sabit şablon kopyası değil, güncel draft/UKC/tide/squat ve leg riskine göre kayıtlı hesapla kur.",
          "Custom display ile kritik object'i saklama; planning/monitoring için standard display ve object query kullanımını bilinçli yap.",
          "MSC.232(82), MSC.530(106) revizyonu, MSC.1/Circ.1503/Rev.2 ve IHO S-52/S-66'yı maker manual/SMS ile birlikte kullan."
        ]
      },
      {
        title: "AIS (Otomatik Tanımlama Sistemi)",
        introduction: "AIS, gemilerin kimlik bilgilerini, konumunu, kursunu ve hızını otomatik olarak yayınlayan ve diğer gemilerden gelen bilgileri alan VHF tabanlı bir sistemdir.",
        sections: [
          {
            heading: "AIS Sınıfları ve Veri Türleri",
            paragraphs: [],
            table: {
              headers: ["Bilgi Türü", "Güncelleme", "İçerik"],
              rows: [
                ["Statik", "Yaklaşık 6 dakikada bir", "MMSI, IMO no, gemi adı, gemi tipi, boyutlar"],
                ["Dinamik", "Sınıf, hız ve manevraya göre yaklaşık 2 sn–3 dk", "Konum, COG/SOG, heading ve ROT; alanların kaynağı farklı olabilir"],
                ["Sefere ilişkin", "Yaklaşık 6 dk ve veri değiştiğinde", "Draft, tehlikeli yük göstergesi, varış limanı, ETA"]
              ]
            }
          },
          {
            heading: "Class A ve Class B",
            paragraphs: [
              "Class A taşıma zorunluluğu 'tüm SOLAS gemileri' şeklinde genellenemez; SOLAS V/19'daki gemi tipi, sefer türü ve GT eşikleri ile Record of Equipment üzerinden doğrulanır. Class A, SOTDMA tabanlı daha yüksek öncelikli raporlama yapar.",
              "Class B, ilgili ulusal kurallar veya gönüllü donatım kapsamında küçük ticari gemi ve teknelerde görülebilir. Güç, erişim yöntemi ve rapor aralığı cihaz alt sınıfına göre değişir."
            ]
          },
          {
            heading: "AIS Kullanım Kuralları",
            paragraphs: [
              "AIS sürekli açık tutulmalıdır; kaptan güvenlik nedeniyle kapatabilir ancak bu karar seyir jurnalına kaydedilmelidir.",
              "AIS verileri tek başına çatışma önleme kararı için kullanılmamalıdır; radar ve görsel gözetleme ile birlikte değerlendirilmelidir.",
              "MMSI numarası bayrak devleti tarafından atanır ve benzersizdir."
            ]
          }
        ],
        keyPoints: [
          "AIS, COLREG Rule 7 çerçevesinde tamamlayıcı bir bilgi kaynağıdır; birincil değildir.",
          "Yanlış veya güncellenmeyen AIS verileri güvenlik riski oluşturur.",
          "Balıkçı tekneleri ve küçük teknelerin çoğunda AIS bulunmaz; radar taraması gereklidir.",
          "AIS SART, MOB durumunda kişisel konumlandırma için kullanılır."
        ],
        workingPrinciple: [
          "VHF üzerinden 161.975 ve 162.025 MHz'de SOTDMA protokolü ile veri yayını yapar.",
          "GPS, gyro ve log'dan aldığı dinamik veriyi statik veriyle birlikte yayınlar.",
          "Class A ve Class B cihazları farklı erişim, güç ve raporlama özellikleri kullanır; bir hedefin AIS'te görünmemesi onun mevcut olmadığı anlamına gelmez."
        ],
        operation: [
          "Trip öncesi statik veriyi (MMSI, ad, IMO, tip, draft) doğrula.",
          "Voyage data: destination, ETA, navigational status'u güncelle.",
          "Liman manevrası sırasında durumu 'moored' veya 'underway' olarak değiştir.",
          "Anormal hedef veya spoofing şüphesinde radar ile çapraz doğrula."
        ],
        faults: [
          { fault: "Diğer gemilerden veri alınmıyor", cause: "VHF anten/kablo arızası, alıcı arızası", action: "Anteni ve kabloyu kontrol et, BIT testi yap." },
          { fault: "Pozisyon yayınlanmıyor", cause: "GPS kayıp", action: "GPS girdisini kontrol et." },
          { fault: "Statik veri hatalı", cause: "Yanlış programlama", action: "Yetkili teknisyenle güncelle." }
        ],
        precautions: [
          "AIS'i sadece güvenlik nedeni varsa (kaptan kararı) kapat; kapatma deftere işlenmeli.",
          "MMSI ve gemi bilgisi her sefer kontrol edilmeli.",
          "AIS, çatışmadan kaçınmada radar/görsel gözlemi tek başına ikame etmez."
        ]
      },
      {
        title: "GPS ve Konum Belirleme Sistemleri",
        introduction: "GNSS alıcısı, uydu sinyallerinden konum, zaman, COG ve SOG üreten bir seyir sensörüdür. SOLAS V/19 elektronik position-fixing düzenini gemi tipi/GT ve sefer kapsamına göre tarif eder; gemideki onaylı donanım Record of Equipment ve köprüüstü sensör planından doğrulanır.",
        sections: [
          {
            heading: "GPS Çalışma Prensibi",
            paragraphs: [
              "GPS, en az 4 uydudan gelen sinyal ile alıcının konumunu ve saatini hesaplar. Her uydu kendi konumunu ve sinyal gönderim zamanını yayınlar. Alıcı, sinyalin ulaşma süresinden mesafeyi hesaplar.",
              "Gösterilen fix kalitesi; uydu geometrisi, anten görüşü, iyonosfer, multipath, bütünlük izleme ve kullanılan augmentasyona bağlıdır. Tek bir '± metre' değeri, o andaki konumun güvenilirliğini kanıtlamaz."
            ]
          },
          {
            heading: "Diğer GNSS Sistemleri",
            paragraphs: [],
            table: {
              headers: ["Sistem", "Ülke", "Uydu Sayısı", "Doğruluk"],
              rows: [
                ["GPS", "ABD", "31+", "±10 m"],
                ["GLONASS", "Rusya", "24+", "±10 m"],
                ["Galileo", "AB", "30", "±1-4 m"],
                ["BeiDou", "Çin", "35+", "±10 m"],
                ["IRNSS/NavIC", "Hindistan", "7", "±20 m (bölgesel)"]
              ]
            }
          },
          {
            heading: "DGPS ve Düzeltme Kaynakları",
            paragraphs: [
              "Differential GPS, kıyı istasyonlarından alınan düzeltme verileriyle doğruluğu artırır. Liman yaklaşmalarında ve kıyı seyrinde önemlidir.",
              "SBAS (Satellite Based Augmentation System): WAAS (ABD), EGNOS (Avrupa), MSAS (Japonya) gibi uydu tabanlı düzeltme sistemleri bölgesel olarak doğruluğu artırır."
            ]
          }
        ],
        keyPoints: [
          "GPS tek başına yeterli konumlandırma aracı değildir; bağımsız ikinci bir konum doğrulama sistemi gerekir.",
          "GPS spoofing ve jamming tehditlerinden haberdar olunmalıdır.",
          "Konum bilgisi WGS-84 datumundadır; harita datumu ile uyumsuzluk kontrol edilmelidir.",
          "IMO, Multi-system alıcıları (GPS+GLONASS) tavsiye eder."
        ],
        workingPrinciple: [
          "Alıcı, en az 4 uydudan zaman sinyali alır ve trilateration ile pozisyon hesaplar.",
          "DGNSS/SBAS düzeltmesi uygun kapsama ve sağlıklı correction age ile doğruluğu ve bütünlük bilgisini geliştirebilir; metre-altı sonuç her alıcı ve ortam için garanti değildir.",
          "GNSS, GPS + GLONASS + Galileo + BeiDou'yu birlikte kullanarak güvenilirliği artırır."
        ],
        operation: [
          "Anteni gölgesiz açık alana monte et.",
          "Cold/warm start süresini üretici manual'ine göre değerlendir; fix geldiğinde datum, antenna offset, selected source, integrity/RAIM ve alarm durumunu doğrula.",
          "DGNSS/SBAS düzeltmesi varsa correction age ve integrity durumunu izle; HDOP tek başına sabit bir 'iyi/kötü' eşiği değildir.",
          "Pozisyonu radar/celestial ile periyodik çapraz doğrula."
        ],
        faults: [
          { fault: "Pozisyon yok / kayıp", cause: "Anten arızası, gölgeleme, jamming", action: "Anteni kontrol et, secondary GPS'e geç, celestial fix kullan." },
          { fault: "Pozisyonda atlama (jump)", cause: "Multipath, spoofing", action: "Radar/visual fix ile doğrula, raporla." },
          { fault: "HDOP yüksek", cause: "Az uydu görüş, kötü geometri", action: "Bekle, antenin önündeki engelleri kontrol et." }
        ],
        precautions: [
          "GPS tek başına primer pozisyon kaynağı olarak değil, çapraz kontrol ile kullanılmalı.",
          "Anten kabloları periyodik kontrol edilmeli.",
          "Spoofing/jamming şüphesinde derhal alternatif pozisyon yöntemine geçilmeli."
        ]
      },
      {
        title: "Gyro Pusula ve Manyetik Pusula",
        introduction: "Pusula, geminin pruva yönünü belirleyen temel seyir aracıdır. Gyro pusula mekanik/lazer jiroskop prensibiyle gerçek kuzeyi, manyetik pusula dünyanın manyetik alanını kullanarak manyetik kuzeyi gösterir.",
        sections: [
          {
            heading: "Gyro Pusula",
            paragraphs: [
              "Jiroskopik prensiple çalışan pusula, dünyanın dönme eksenine göre kendini hizalar ve gerçek kuzeyi gösterir. Sapması (gyro error) küçüktür ve düzeltilebilir.",
              "Fiber optik jiroskop (FOG) ve ring laser jiroskop (RLG) modern solid-state türlerdir. Hareketli parçası yoktur, daha güvenilirdir.",
              "Gyro pusula tekrarlayıcıları (repeater) köprüüstü, kanat ve dümen dairesinde bulunur."
            ]
          },
          {
            heading: "Manyetik Pusula",
            paragraphs: [
              "Manyetik pusula, gemideki demir ve çelik yapılardan kaynaklanan deviation (sapma) hatası taşır. Bu hata Flinders bar, yumuşak demir küreler ve mıknatıslarla düzeltilir (compass adjustment).",
              "Variation (iğne sapması) coğrafi konuma bağlıdır ve haritadan okunur. Yıllık değişimi vardır.",
              "Toplam hata = Variation + Deviation. CDMVT kuralı: Compass → Deviation → Magnetic → Variation → True"
            ],
            formula: {
              expression: "True Bearing = Compass Bearing + Deviation + Variation",
              variables: [
                "Deviation: Gemi kaynaklı sapma (derece, E veya W)",
                "Variation: Coğrafi manyetik sapma (derece, E veya W)",
                "East (+), West (−) olarak uygulanır"
              ]
            },
            example: {
              problem: "Pusula kerterizi 245°, deviation 3°W, variation 5°E ise gerçek keretriz nedir?",
              steps: [
                "Deviation = −3° (W)",
                "Variation = +5° (E)",
                "True = 245 + (−3) + (+5) = 247°"
              ],
              result: "Gerçek kerteriz 247°'dir."
            }
          }
        ],
        keyPoints: [
          "Manyetik pusula, gyro veya diğer heading düzenlerinin uygulanabilirliği gemi tipi, GT ve yapım tarihine göre SOLAS V/19 ile Record of Equipment'tan doğrulanır; her gemide aynı kombinasyon aranmaz.",
          "Gyro/compass error uygun fırsatta ve SMS sıklığında azimut, transit veya karşılaştırma ile belirlenir; sonuç ve kullanılan yöntem kaydedilir.",
          "Manyetik pusula yedek pusula olarak daima çalışır durumda tutulmalıdır.",
          "Deviation card, anlamlı sapma, onarım/yapısal değişiklik, manyetik yük etkisi veya survey gereği oluştuğunda yetkili ayar ve swing ile güncellenir."
        ],
        workingPrinciple: [
          "Gyro pusula, hızla dönen rotorun hareketsizlik (gyroscopic inertia) prensibiyle gerçek kuzeyi bulur.",
          "Sıvı veya elektrostatik damping ile salınımı söndürür.",
          "Manyetik pusula, kart üzerindeki mıknatısın yer manyetik alanına yönelmesi ile manyetik kuzeyi gösterir.",
          "Compass error = Variation + Deviation."
        ],
        operation: [
          "Gyro'yu üreticinin settling ve restart prosedürüne göre zamanında çalıştır; bazı modern sensörlerde süre klasik rotor gyrodan farklıdır.",
          "Latitude ve speed correction'ı manuel ayar gerektiriyorsa gir.",
          "Uygun kerteriz/transit ile compass error belirle; variation ve mevcut deviation card ile tutarlılığı değerlendir.",
          "Repeater'ları (köprü, dümen, pelorus) gyro ile senkron tut."
        ],
        faults: [
          { fault: "Gyro yön hatası büyük (drift)", cause: "Latitude/speed correction hatalı, follow-up arızası", action: "Düzeltmeleri kontrol et, servis çağır." },
          { fault: "Repeater senkron değil", cause: "Step motor/sigorta arızası", action: "Sigortayı değiştir, manuel sync yap." },
          { fault: "Manyetik pusula sıvısı kabarcıklı", cause: "Sıvı kaçağı, sıcaklık", action: "Sıvı tamamla, conta değiştir." },
          { fault: "Deviation kart eski", cause: "Manyetik değişim, yeni demir kütlesi", action: "Deviation kartını yetkili kişiyle yeniden çıkart (compass adjuster)." }
        ],
        precautions: [
          "Manyetik pusula çevresine demir/manyetik malzeme yerleştirilmemeli.",
          "Gyro alarmı (power failure) sürekli izlenmeli.",
          "Compass adjustment sıklığını bayrak/class/SMS ve gözlenen hata belirler; sabit yıllık ezberi yerine geçerli deviation card ve hata trendini doğrula.",
          "Acil durumda manyetik pusula primer kaynak olduğundan her zaman çalışır durumda olmalı."
        ]
      },
      {
        title: "Echo Sounder (İskandil)",
        introduction: "Echo sounder, transducer altındaki su derinliğini ultrasonik darbelerle ölçer. Taşıma gereği SOLAS V/19'daki gemi tipi, GT ve yapım tarihi eşiklerine bağlıdır; 'tüm gemilerde zorunlu' şeklinde genellenmez.",
        sections: [
          {
            heading: "Çalışma Prensibi",
            paragraphs: [
              "Transducer, ses darbesi gönderir ve deniz tabanından yansıyan yankıyı alır. Gidiş-dönüş süresinden derinlik hesaplanır."
            ],
            formula: {
              expression: "D = (v × t) / 2",
              variables: [
                "D: Su derinliği (m)",
                "v: Suda ses hızı (yaklaşık 1 500 m/s)",
                "t: Gidiş-dönüş süresi (s)"
              ]
            },
            example: {
              problem: "Echo sounder sinyali 0.04 saniye sonra geri dönüyorsa su derinliği nedir?",
              steps: [
                "D = (1500 × 0.04) / 2",
                "D = 60 / 2 = 30 m"
              ],
              result: "Su derinliği 30 metredir."
            }
          },
          {
            heading: "Ses Hızı Düzeltmesi",
            paragraphs: [
              "Suda ses hızı sıcaklık, tuzluluk ve basınca göre değişir. Standart kalibrasyon 1 500 m/s kabul eder ancak gerçek değer 1 450-1 540 m/s arasında değişebilir.",
              "Bar check: Transducer altına bilinen derinliğe metal plaka indirilerek echo sounder kalibre edilir."
            ]
          }
        ],
        keyPoints: [
          "Okunan derinlik transducer konumuna göredir; omurga altı (UKC) ayrıca hesaplanmalıdır.",
          "Çift frekanslı (dual-frequency) echo sounder hem sığ hem derin su ölçümü yapabilir.",
          "Yanlış ses hızı ayarı hatalı derinlik okumasına neden olur.",
          "Seyir planında echo sounder düzenli olarak kaydedilir."
        ],
        workingPrinciple: [
          "Transducer, su altına ses darbesi (genellikle 50/200 kHz) yayar.",
          "Deniz dibinden yansıyan eko alınır; gidiş-dönüş süresinden derinlik hesaplanır.",
          "Derinlik = (ses hızı × süre) / 2; ses hızı suda ~1500 m/s kabul edilir."
        ],
        operation: [
          "Trip öncesi gain ve range ayarını yap.",
          "Shallow water alarm değerini draft + UKC marjı ile ayarla.",
          "Frekans seçimini su derinliği ve dip yapısına göre yap (sığ: 200 kHz, derin: 50 kHz).",
          "Voyage boyunca derinlik kaydını VDR'a aktarmayı sürdür."
        ],
        faults: [
          { fault: "Derinlik okuması yok", cause: "Transducer kirli/arızalı, kablo kopuk", action: "Transducer'ı kontrol et, kabloyu izole et." },
          { fault: "Hatalı/zıplayan derinlik", cause: "Hava kabarcığı, balık sürüsü, ikincil yansıma", action: "Gain'i ayarla, çapraz kontrol için çift frekans kullan." },
          { fault: "Alarm çalmıyor", cause: "Alarm devre dışı veya hatalı set", action: "Alarm setini ve hoparlörü kontrol et." }
        ],
        precautions: [
          "Sığ su/UKC riski olan etaplarda echo sounder, passage plan ve standing order'a göre etkin izlenir; okuma harita derinliği, tide ve bağımsız konumla çapraz kontrol edilir.",
          "Transducer havuzlamada sürekli su altında kalmalı.",
          "Derinlik bilgisi tek başına yeterli değil; harita ve gel-git ile birlikte değerlendirilmeli."
        ]
      }
    ]
  },

  "main-engine": {
    title: "Ana Makine / Tahrik Sistemi",
    description: "Ana dizel motor, şaft hattı, pervane ve güç aktarma sistemleri",
    topics: [
      {
        title: "İki Zamanlı Düşük Devirli Motorlar",
        introduction: "İki zamanlı crosshead düşük devirli dizel motorlar, büyük ticari gemilerde çoğunlukla pervaneyi doğrudan tahrik eder. Devir/güç aralığı motor ve pervane tasarımına bağlıdır; MAN Energy Solutions, WinGD ve Japan Engine Corporation bu pazardaki üretici örnekleridir.",
        sections: [
          {
            heading: "Çalışma Prensibi",
            paragraphs: [
              "İki zamanlı motorda her krank mili dönüşünde bir iş stroku vardır. Piston aşağı inerken egzoz portlarını açar, süpürme havası silindir içindeki yanmış gazları dışarı atar ve taze hava doldurur.",
              "Uniflow scavenging: Hava alttan girer, egzoz üstteki egzoz valfinden çıkar. Modern iki zamanlı motorlarda standart yöntemdir.",
              "Crosshead yapısı sayesinde piston kolu ve krank mili arasında crosshead pini bağlantısı vardır; piston yalnızca düşey hareket yapar. Bu sayede silindir yağlaması ve karter yağlaması birbirinden ayrıdır."
            ]
          },
          {
            heading: "Performans Parametreleri",
            paragraphs: [],
            formula: {
              expression: "BHP = (Pmep × L × A × N × n) / (60 × 1000)",
              variables: [
                "Pmep: Ortalama efektif basınç (kPa)",
                "L: Strok boyu (m)",
                "A: Piston alanı (m²)",
                "N: Devir sayısı (rpm)",
                "n: Silindir sayısı"
              ]
            },
            example: {
              problem: "6 silindirli, 900 mm çapında, 2 500 mm stroklu, 100 rpm'de çalışan ve Pmep = 1 800 kPa olan bir motorun gücünü hesaplayınız.",
              steps: [
                "A = π/4 × 0.9² = 0.6362 m²",
                "BHP = (1800 × 2.5 × 0.6362 × 100 × 6) / (60 × 1000)",
                "BHP = 1 717 200 / 60 000",
                "BHP = 28 620 kW"
              ],
              result: "Motor gücü yaklaşık 28 620 kW (≈ 38 900 BHP) olarak hesaplanır."
            }
          },
          {
            heading: "Yakıt Enjeksiyon ve Yanma",
            paragraphs: [
              "Common-rail, elektronik-hidrolik veya kam tahrikli mekanik enjeksiyon kullanılabilir. Rail/servo ve enjeksiyon basınçları yük noktasına ve motor tasarımına göre değişir; alarm/trip ve bakım limitleri yalnız maker manual ve shop-trial verisinden alınır.",
              "VIT (Variable Injection Timing): Yük durumuna göre enjeksiyon zamanlaması değiştirilir. Düşük yüklerde erken enjeksiyon, yüksek yüklerde geç enjeksiyon optimum yanma sağlar."
            ]
          }
        ],
        keyPoints: [
          "İki zamanlı motor tek yönlü döner; geri yol için motor durdurulup ters yönde çalıştırılır (FPP ile).",
          "Silindir yağlaması ayrı bir yağlama sistemiyle (alpha lubricator veya pulse jet) yapılır.",
          "Scavenge fire (süpürme yangını), süpürme havasındaki yağ birikimiyle oluşur; scavenge drain düzenli boşaltılmalıdır.",
          "SFOC; motor rating'i, test toleransı, yakıt alt ısıl değeri, çevre düzeltmesi ve yardımcı tüketim sınırına bağlıdır; performans değerlendirmesinde onaylı shop/sea-trial baseline'ı kullanılır."
        ],
        workingPrinciple: [
          "Her krank turunda bir iş çevrimi (emme+sıkıştırma+iş+egzoz) tamamlanır.",
          "Egzoz uniflow scavenging ile silindirin üst tarafından, hava süpürme alttan yapılır.",
          "Düşük devirli crosshead motor çoğunlukla doğrudan şaft/pervaneyi döndürür; gerçek çalışma aralığı engine layout diagram ve combinator/limit eğrilerinden izlenir.",
          "Crosshead yapısı sayesinde piston kuvveti yan kuvvete çevrilmeden krank şaftına iletilir."
        ],
        operation: [
          "Start receiver basıncını, pre-lube basıncını ve tüm permissive/interlock durumunu maker'ın minimum start limitlerine göre kontrol et.",
          "Pre-lub pompasını çalıştırarak yatakları yağla.",
          "Turning gear'ı devre dışı bırak, indicator cock'lar açık iken blow-through yap.",
          "Kademeli olarak dead slow → slow → half → full ahead'e çık.",
          "Stop sonrası turning gear ile soğuma süresince çevir."
        ],
        faults: [
          { fault: "Start havası ile dönmüyor", cause: "Hava basıncı düşük, distribütör arızası", action: "Kompresör ve hava distribütörünü kontrol et." },
          { fault: "Egzoz sıcaklığı bir silindirde yüksek", cause: "Yakıt enjektör arızası, supap problemi", action: "Enjektörü ve supabı kontrol et/değiştir." },
          { fault: "Crankcase yüksek sıcaklık alarmı", cause: "Yatak sürtünmesi, oil mist", action: "ACİL slow down, oil mist detector ve yatakları kontrol et." },
          { fault: "Scavenge fire", cause: "Yağ ve kömür birikimi + yüksek sıcaklık", action: "Yakıtı kes, scavenge space söndürme sistemini devreye al, soğut." },
          { fault: "Turbocharger surging", cause: "Tıkalı egzoz/yakıt sorunu", action: "Yükü düşür, egzoz ve T/C'yi kontrol et." }
        ],
        precautions: [
          "Oil-mist/hot-bearing şüphesinde motoru durdurduktan sonra crankcase'i hemen açma; yangın/OGMD prosedürü, maker'ın bekleme-soğutma süresi, uzaktan sıcaklık kontrolü ve izin olmadan kapağı gevşetme.",
          "Tüm enerji kaynakları izole edilip turning gear takılmadan müdahale yapma.",
          "Yakıt sıcaklık ve viskozitesi spec içinde tutulmalı.",
          "Sülfür içeriğine göre uygun silindir yağı (BN) seçilmeli.",
          "Periyodik bumper, eksantrik ve yatak clearance ölçümü yapılmalı."
        ]
      },
      {
        title: "Dört Zamanlı Orta Devirli Motorlar",
        introduction: "Dört zamanlı orta devirli motorlar, 400-1000 rpm arasında çalışır ve genellikle dişli kutusu (gearbox) üzerinden pervaneyi tahrik eder. Wärtsilä, MAN, Caterpillar ve Yanmar başlıca üreticilerdir.",
        sections: [
          {
            heading: "Çalışma Prensibi ve Farklar",
            paragraphs: [
              "Dört zamanlı motorda emme, sıkıştırma, iş ve egzoz olmak üzere 4 strok bulunur. Her iki krank devrine bir iş stroku gelir.",
              "Trunk piston tasarımı kullanılır; crosshead yoktur. Motor daha kompakt ve hafiftir ancak silindir başına güç iki zamanlıdan düşüktür.",
              "Turbocharger ile doldurulan hava, intercooler'dan geçerek soğutulur ve emme manifolduna verilir."
            ],
            table: {
              headers: ["Özellik", "2 Zamanlı", "4 Zamanlı"],
              rows: [
                ["Devir", "80-120 rpm", "400-1000 rpm"],
                ["Tahrik", "Direkt", "Dişli kutusu"],
                ["Güç/ağırlık", "Düşük", "Yüksek"],
                ["SFOC", "160-180 g/kWh", "180-210 g/kWh"],
                ["Bakım", "Kolay (büyük parça)", "Kompakt (sık)"],
                ["Kullanım", "Büyük tanker, bulk", "Feribot, konteyner, offshore"]
              ]
            }
          }
        ],
        keyPoints: [
          "Dört zamanlı motor her iki yöne de dönebilir; CPP ile geri manevra yapılır.",
          "Yardımcı makine olarak da jeneratör tahrikinde yaygın kullanılır.",
          "Dual-fuel (DF) versiyonları LNG ve dizel ile çalışabilir.",
          "Turbocharger arızası motor gücünü önemli ölçüde düşürür."
        ],
        workingPrinciple: [
          "İki krank turunda bir iş çevrimi tamamlanır (emme, sıkıştırma, iş, egzoz).",
          "Trunk piston yapısı; eksantrik mili krank devrinin yarısında döner.",
          "Genellikle 400-1000 rpm arası çalışır; redüktör veya jeneratör tahriki yapar."
        ],
        operation: [
          "Yağ ve soğutma suyu sıcaklığını çalıştırma öncesi kontrol et.",
          "Pre-lub yap, jacket water'ı sirküle ettir.",
          "Start havası veya elektrik marş ile çalıştır.",
          "Yükü kademeli artır, exhaust temp ve T/C basıncını izle.",
          "Stop sonrası soğutma sirkülasyonunu sürdür."
        ],
        faults: [
          { fault: "Çalışmıyor", cause: "Yakıt yok, hava karışık, rack tutuk", action: "Yakıt sistemini havasız al, rack'i serbestleştir." },
          { fault: "Karter basıncı yüksek", cause: "Piston ring kaçırma, yağ buharı", action: "Yükü düşür, ring/yatak kontrolü yap." },
          { fault: "Knocking", cause: "Hatalı injection timing, su girişi", action: "Timing ve enjektörü kontrol et." },
          { fault: "Yağ basıncı düşük", cause: "Filtre tıkalı, pompa aşıntısı", action: "Filtre değiştir, pompa kontrolü yap." }
        ],
        precautions: [
          "Yakıt değişiminde sıcaklık-viskozite eğrisini takip et (HFO/MGO geçişi).",
          "Karter kapağını alarm/yangın şüphesinden hemen sonra açma; maker'ın bekleme-soğutma süresi, sıcaklık kontrolü, havalandırma ve permit/LOTO şartları sağlanmadan müdahale etme.",
          "Periyodik valve clearance ayarı kritiktir.",
          "Aşırı yüklemeden kaçın; turbo aşıntısını hızlandırır."
        ]
      },
      {
        title: "Şaft Hattı ve Güç Aktarma",
        introduction: "Şaft hattı, ana makineden pervaneye mekanik gücü ileten ve pervane itme kuvvetini gemi yapısına aktaran sistemdir. Hizalama (alignment) hassasiyeti motorun ve yatakların ömrü için kritiktir.",
        sections: [
          {
            heading: "Şaft Hattı Bileşenleri",
            paragraphs: [
              "Krank mili → Ara şaft (intermediate shaft) → İtme yatağı (thrust bearing) → Pervane şaftı → Pervane.",
              "İtme yatağı (Michell tipi): Tilting pad yatak tasarımıyla pervane itme kuvvetini gemi yapısına aktarır. Yağ filmi üzerinde çalışır.",
              "Stern tube: Pervane şaftının gemi gövdesinden çıktığı noktada yatak ve sızdırmazlık sağlar.",
              "Flanşlı kaplin: Şaft segmentlerini birbirine bağlar; kalibrasyon ayarlanabilir."
            ]
          },
          {
            heading: "İtme Gücü Hesabı",
            paragraphs: [],
            formula: {
              expression: "T = (PD × ηP) / VA",
              variables: [
                "T: İtme kuvveti (N)",
                "PD: Pervaneye iletilen güç (W)",
                "ηP: Pervane verimi",
                "VA: İlerleme hızı (m/s)"
              ]
            },
            example: {
              problem: "12 000 kW güç, %65 pervane verimi ve 7.2 m/s ilerleme hızında itme kuvvetini hesaplayınız.",
              steps: [
                "T = (12 000 000 × 0.65) / 7.2",
                "T = 7 800 000 / 7.2",
                "T = 1 083 333 N ≈ 1 083 kN"
              ],
              result: "İtme kuvveti yaklaşık 1 083 kN (≈ 110 ton) olarak hesaplanır."
            }
          },
          {
            heading: "Şaft Hizalaması ve Titreşim",
            paragraphs: [
              "Şaft hizalaması lazer alignment veya sag-gap yöntemiyle yapılır. Hizalama hatası yatak aşınması, titreşim ve şaft kırılmasına neden olabilir.",
              "Torsional vibration (burulma titreşimi): Motor silindirlerinin farklı zamanlarda ateşlemesinden kaynaklanan periyodik burulma momenti. Kritik devir sayılarında rezonans oluşabilir; barred speed range (yasak devir bölgesi) belirlenir."
            ]
          }
        ],
        keyPoints: [
          "Barred speed range'de sürekli çalışma şaft yorulma kırılmasına neden olabilir.",
          "İtme yatağı arızası geminin seyir kabiliyetini tamamen ortadan kaldırır.",
          "Şaft muylu aşınması periyodik olarak mikrometre ile ölçülür.",
          "Stern tube yağ seviyesi ve sızdırmazlık sürekli izlenmelidir."
        ],
        workingPrinciple: [
          "Ana motorun krank şaftı, intermediate ve tail shaft üzerinden pervaneye torku aktarır.",
          "Stern tube yatakları (white metal veya su yağlamalı) şaftı destekler.",
          "Thrust bearing pervaneden gelen ileri/geri itkiyi gemiye aktarır.",
          "Stern tube seal (Simplex tipi) yağ kaçağını ve deniz suyu girişini engeller."
        ],
        operation: [
          "Trip öncesi yatak sıcaklıkları, yağ seviyesi ve seal hava basıncını kontrol et.",
          "Vibrasyon ölçümünü periyodik yap.",
          "Stern tube yağ tankı seviyesini ve sıcaklığını izle."
        ],
        faults: [
          { fault: "Stern tube yağ tüketimi yüksek", cause: "Aft seal aşıntısı", action: "Havuzlamada seal değişimi planla." },
          { fault: "Thrust bearing sıcaklık alarmı", cause: "Yağ akışı yetersiz, white metal aşıntısı", action: "Yağ basıncını kontrol et, gerekirse motoru durdur." },
          { fault: "Aşırı titreşim", cause: "Pervane hasarı, şaft eğikliği, hizalama bozukluğu", action: "Devri düşür, dalgıç ile pervane kontrolü, alignment ölç." },
          { fault: "Yağ kontaminasyonu (su)", cause: "Aft seal kaçağı", action: "Yağ analizi yap, seal bakımı/değişimi planla." }
        ],
        precautions: [
          "Stern tube yağ tankı head pressure'ı sea draft üstünde tutulmalı.",
          "Periyodik shaft alignment ve crank deflection ölçümü yapılmalı.",
          "Tüm yatak alarmları kritik sayılmalı; alarmda hız düşürülmeli."
        ]
      },
      {
        title: "Pervane Tipleri ve Performansı",
        introduction: "Pervane, motordan aldığı dönme hareketini itme kuvvetine çeviren gemi tahrik elemanıdır. Tasarım ve tip seçimi geminin operasyon profiline göre yapılır.",
        sections: [
          {
            heading: "FPP ve CPP Karşılaştırması",
            paragraphs: [],
            table: {
              headers: ["Özellik", "FPP (Sabit Hatve)", "CPP (Değişken Hatve)"],
              rows: [
                ["Kanat açısı", "Sabit", "Değişken (hidrolik)"],
                ["Hız kontrolü", "Motor devri", "Hatve ayarı"],
                ["Geri manevra", "Motor ters dönmeli", "Hatve tersine çevrilir"],
                ["Verim", "Yüksek (tasarım noktasında)", "FPP'den %1-3 düşük"],
                ["Maliyet", "Düşük", "Yüksek"],
                ["Bakım", "Az", "Karmaşık (sızdırmazlık)"],
                ["Kullanım", "Bulk, tanker", "Feribot, offshore, RoRo"]
              ]
            }
          },
          {
            heading: "Kavitasyon",
            paragraphs: [
              "Pervane kanat yüzeyinde yerel basıncın suyun buhar basıncının altına düşmesiyle oluşan buhar kabarcıklarının çökmesidir. Erozyona, gürültüye, titreşime ve verim kaybına neden olur.",
              "Kavitasyon türleri: Sheet (yüzey), tip vortex (kanat ucu), bubble (kabarcık), cloud (bulut) ve superkavitasyon.",
              "Kavitasyonu azaltmak için kanat profili optimizasyonu, kanat ucu şekillendirmesi ve uygun yükleme yapılır."
            ]
          }
        ],
        keyPoints: [
          "Heavy running (aşırı yüklenme) pervane verimini düşürür ve kavitasyonu artırır.",
          "Pervane parlatması (polishing) düzenli aralıklarla yapılarak verim korunur.",
          "Azimuth thruster hem itme hem yönlendirme sağlar; ayrı dümen gerektirmez.",
          "Pervane yüzeyi sualtı muayenesinde (diving inspection) kontrol edilir."
        ],
        workingPrinciple: [
          "Sabit yapraklı (FPP) pervane, motor devri ile itki üretir; yön değişimi motor reverse ile yapılır.",
          "Kontrol edilebilir pillaki (CPP) pervane, yaprak açısı (pitch) hidrolik mekanizma ile değiştirilerek itki kontrol edilir.",
          "Kavitasyon, yaprak üzerinde basınç düşüşüyle oluşan buhar kabarcıklarının patlamasıdır; aşıntı ve titreşime yol açar."
        ],
        operation: [
          "CPP pitch göstergesini kontrol et; hidrolik basıncı izle.",
          "Manevra sırasında ani pitch değişiminden kaçın.",
          "Devir/pitch kombinasyonunu yakıt verimliliği için optimize et."
        ],
        faults: [
          { fault: "CPP pitch yanıt vermiyor", cause: "Hidrolik basınç düşük, OD kutusu arızası", action: "Basıncı kontrol et, OD box bakımı yap." },
          { fault: "Aşırı titreşim", cause: "Pervane yaprağı hasarlı, balansı bozulmuş", action: "Dalış/havuzlama ile incele, gerekirse değiştir." },
          { fault: "Kavitasyon erozyonu", cause: "Hatalı yaprak profili, aşırı yük", action: "Yaprak yüzeyini kontrol et, profil restorasyonu yap." }
        ],
        precautions: [
          "Pervane civarında dalış öncesi şaft kilitlenmeli.",
          "CPP hidrolik yağı temiz tutulmalı; analiz periyodik yapılmalı.",
          "Sığ sularda squat etkisi nedeniyle kavitasyon riskine dikkat."
        ]
      },
      {
        title: "Dümen Sistemi ve Manevra",
        introduction: "Dümen sistemi, geminin yön değiştirmesini sağlayan kritik emniyet ekipmanıdır. SOLAS II-1/29 ana ve yardımcı steering gear düzenini, performansını ve arıza toleransını gemi özelliklerine göre tarif eder; geminin onaylı steering gear arrangement'i esas alınır.",
        sections: [
          {
            heading: "Dümen Tipleri",
            paragraphs: [],
            table: {
              headers: ["Tip", "Dengeli Oran", "Tork İhtiyacı", "Kullanım"],
              rows: [
                ["Unbalanced", "0%", "Yüksek", "Küçük tekneler"],
                ["Semi-balanced", "20-30%", "Orta", "Ticari gemiler (en yaygın)"],
                ["Balanced (spade)", "35-40%", "Düşük", "Büyük gemiler"],
                ["Flap (Becker)", "Değişken", "Düşük", "Manevra gerektiren gemiler"]
              ]
            }
          },
          {
            heading: "Elektro-Hidrolik Dümen Makinesi",
            paragraphs: [
              "Elektrik motoru ile tahrik edilen hidrolik pompa, basınçlı yağı dümen silindirine gönderir. Rapson slide veya rotary vane tip silindirler kullanılır.",
              "Güç ünitesi, kontrol devresi ve ayrım düzeni; gemi boyutu ile SOLAS II-1/29'un uygulanabilir paragraflarına göre onaylanır. İki pompa görülmesi, tek başına tam bağımsızlık kanıtı değildir.",
              "Ana steering gear için yaygın SOLAS kriteri, en derin draftta ve azami ileri servis hızında dümeni 35°'den karşı tarafta 35°'ye; her durumda karşı tarafta 30°'ye 28 saniyeyi aşmadan getirmektir.",
              "Auxiliary steering gear için kriter, yine tanımlı draft ve en az 7 knot veya azami ileri servis hızının yarısı koşulunda 15°'den karşı 15°'ye 60 saniyeyi aşmamaktır; istisna ve eşdeğer düzenler onaylı dokümandan kontrol edilir."
            ]
          },
          {
            heading: "Dümen Kuvveti Hesabı",
            paragraphs: [],
            formula: {
              expression: "FN = K × A × V² × sin(α)",
              variables: [
                "FN: Dümen normal kuvveti (N)",
                "K: Katsayı (≈ 580 N·s²/m⁴ tuzlu suda)",
                "A: Dümen palet alanı (m²)",
                "V: Gemi hızı (m/s)",
                "α: Dümen açısı (derece)"
              ]
            },
            example: {
              problem: "10 m² palet alanı, 12 knot hız ve 35° dümen açısında dümen kuvvetini hesaplayınız.",
              steps: [
                "V = 12 × 0.5144 = 6.17 m/s",
                "FN = 580 × 10 × 6.17² × sin(35°)",
                "FN = 580 × 10 × 38.07 × 0.574",
                "FN = 126 700 N ≈ 126.7 kN"
              ],
              result: "Dümen paletine etkiyen kuvvet yaklaşık 127 kN'dur."
            }
          }
        ],
        keyPoints: [
          "Dümen testi her kalkış öncesi yapılır ve seyir jurnalına kaydedilir.",
          "Dar sularda her iki dümen pompası birlikte çalıştırılır.",
          "Dümen açı göstergesi köprüüstü ve dümen dairesinde bulunmalıdır.",
          "NFU (Non-Follow-Up) kumanda acil durumda doğrudan dümen kontrolü sağlar."
        ],
        workingPrinciple: [
          "Hidrolik silindir veya rotary vane aktüatör, tiller üzerinden dümen şaftını döndürür.",
          "İki bağımsız güç ünitesi (steering gear power unit) yedeklilik sağlar.",
          "Otopilot, gyro/heading sensörü ile dümen makinesi arasında PID kontrolü yapar.",
          "Emergency steering, dümen makinesi dairesinden lokal manuel kontrolle yapılır."
        ],
        operation: [
          "Trip öncesi (departure öncesi 12 saat içinde) steering gear testini yap (her iki ünite, lokal/uzaktan).",
          "Heading lock veya track modunu deniz koşullarına göre seç.",
          "Manevra alanlarında her iki pompayı paralel çalıştır.",
          "Periyodik olarak emergency steering tatbikatı yap."
        ],
        faults: [
          { fault: "Dümen verilen komuta tepki vermiyor", cause: "Hidrolik basınç düşük, follow-up arızası, valf sıkışması", action: "Diğer üniteye geç, emergency steering'e al, hidrolik sistemi kontrol et." },
          { fault: "Dümen kendi başına hareket ediyor (hunting)", cause: "Sensör/feedback arızası", action: "Otopilotu manuele al, sensörü kalibre et." },
          { fault: "Hidrolik yağ kaçağı", cause: "Conta/silindir arızası", action: "Acilen kaçağı durdur, basıncı düşür, contayı değiştir." },
          { fault: "Heading sapması (otopilot)", cause: "Gyro arızası, rüzgâr/akıntı", action: "Manuele geç, gyro hatalıysa manyetik pusula ile manuel kullan." }
        ],
        precautions: [
          "SOLAS gereği steering gear testleri kayıt altına alınmalı.",
          "Emergency steering haberleşmesi (telefon/telsiz) test edilmeli.",
          "Hidrolik yağ seviyesi ve sıcaklığı sürekli izlenmeli.",
          "Köprüden lokal kontrole geçiş prosedürü tüm zabitler tarafından bilinmelidir."
        ]
      }
    ]
  },

  "auxiliary": {
    title: "Yardımcı Makineler",
    description: "Jeneratör, kompresör, pompa, separatör, kazanlar, insinerator, sintine separatörü, atık su arıtma, ısı değiştiriciler, soğuk depo ve tüm yardımcı sistemler",
    topics: [
      {
        title: "Dizel Jeneratörler",
        introduction: "Gemi elektrik enerjisi, yardımcı dizel motorlarla tahrik edilen alternatörler (AC jeneratör) tarafından üretilir. Geminin elektrik ihtiyacı yükleme durumu, seyir koşulları ve liman operasyonlarına göre değişir.",
        sections: [
          {
            heading: "Jeneratör Sistemi",
            paragraphs: [
              "Yardımcı dizel motor genellikle dört zamanlı, orta devirli tiptir. 720 veya 900 rpm'de çalışarak 50 Hz veya 60 Hz elektrik üretir.",
              "Alternatör, 3 fazlı AC gerilim üretir. Gemi ana bara gerilimi genellikle 440 V veya 6.6 kV'tur."
            ],
            formula: {
              expression: "f = (N × P) / 120",
              variables: [
                "f: Frekans (Hz)",
                "N: Motor devri (rpm)",
                "P: Kutup sayısı"
              ]
            },
            example: {
              problem: "720 rpm'de çalışan 8 kutuplu bir jeneratörün ürettiği frekansı hesaplayınız.",
              steps: [
                "f = (720 × 8) / 120",
                "f = 5760 / 120 = 48 Hz"
              ],
              result: "Bu değer 50 Hz'den düşüktür; motor devri 750 rpm'ye ayarlanmalıdır (750 × 8 / 120 = 50 Hz)."
            }
          },
          {
            heading: "Paralel Bağlama (Synchronizing)",
            paragraphs: [
              "İki jeneratörü aynı baraya bağlamak için frekans, gerilim, faz sırası ve faz açısının eşit olması gerekir.",
              "Synchroscope veya synchronizing lamps ile faz uyumu kontrol edilir. Breaker, synchroscope ibresi 12 konumuna yaklaşırken kapatılır.",
              "Otomatik senkronizasyon sistemleri frekans ve gerilim farkını otomatik ayarlar ve uygun anda breaker'ı kapatır."
            ]
          },
          {
            heading: "Yük Paylaşımı",
            paragraphs: [
              "Paralel çalışan jeneratörler arasında aktif güç (kW) paylaşımı governor ayarıyla, reaktif güç (kVAR) paylaşımı AVR (Automatic Voltage Regulator) ayarıyla yapılır.",
              "Droop mode: Her jeneratörün frekansı yük arttıkça hafifçe düşer; doğal yük paylaşımı sağlanır.",
              "Isochronous mode: Frekans sabit tutulur; load sharing kontrolörü ile yük eşit dağıtılır."
            ]
          }
        ],
        keyPoints: [
          "Acil güç düzeninin otomatik başlama ve kritik yükleri besleme süresi, gemi tipine uygulanabilir SOLAS II-1 hükümlerinden doğrulanır; 45 saniye birçok düzen için temel sınırdır ancak transitional source ve yolcu/yük gemisi ayrımı ayrıca kontrol edilir.",
          "Acil jeneratör su hattının üzerinde ve ana makine dairesinin dışında konumlandırılmalıdır.",
          "Blackout recovery prosedürü tüm personel tarafından bilinmelidir.",
          "Preferential trip sistemi, aşırı yüklenme durumunda kritik olmayan tüketicileri otomatik keser."
        ],
        workingPrinciple: [
          "Dizel motor, alternatörü tahrik ederek 3-faz AC üretir (genelde 440 V, 60 Hz).",
          "AVR (Automatic Voltage Regulator) çıkış voltajını sabit tutar.",
          "Governor, motor devri kontrolü ile frekansı sabit tutar.",
          "Paralel çalışmada synchroscope veya auto-sync ile bara ile faz uyumu sağlanır."
        ],
        operation: [
          "Çalıştırmadan önce yağ, su, yakıt seviyelerini kontrol et.",
          "Motoru rölantide ısıt; voltaj ve frekans nominal değere geldiğinde paralele al.",
          "Yük dağılımını eşitle (governor droop ayarı).",
          "Devre dışı alırken önce yükü diğer jeneratörlere aktar, breaker'ı aç, motoru rölantide soğut."
        ],
        faults: [
          { fault: "Çalışmıyor", cause: "Yakıt yok, marş yok, low oil pressure trip", action: "Yakıt hattını havasız al, akü/marşı kontrol et, alarmı sıfırla." },
          { fault: "Reverse power trip", cause: "Yük transferi sırasında geri besleme", action: "Breaker açıldıysa motoru kontrol et, sebebi araştır." },
          { fault: "Yük kabul etmiyor", cause: "Governor arızası, AVR sorunu", action: "Manuel governor moda geç, AVR'yi kontrol et." },
          { fault: "Bobinaj sıcaklığı yüksek", cause: "Aşırı yük, soğutma fan arızası", action: "Yükü azalt, fan/filtre kontrolü yap." },
          { fault: "Black-out", cause: "Tüm jen trip, ESD aktivasyonu", action: "Emergency generator otomatik devreye girmeli; manuel reset ve restart prosedürünü uygula." }
        ],
        precautions: [
          "Senkronizasyonda phase sequence aynı olmalı.",
          "Kara şalter (breaker) açma/kapama sırası prosedüre uygun olmalı.",
          "Yakıt değişimi ve viskozite kontrolü düzenli yap.",
          "Emergency generator testini geminin PMS/SMS sıklığında hem auto-start dizisini hem de mümkün olduğunda emniyetli yük altında beslemeyi doğrulayacak şekilde yap; yalnız yüksüz çalıştırmayı yeterli sayma."
        ]
      },
      {
        title: "Buhar Kazanları",
        introduction: "Gemi kazanları, yakıt ısıtma, yük tankı ısıtma, tatlı su üretimi ve yaşam alanı ısıtması için buhar üretir. Tanker gemilerinde ayrıca yük pompaları için büyük kapasiteli kazanlar bulunur.",
        sections: [
          {
            heading: "Kazan Tipleri",
            paragraphs: [],
            table: {
              headers: ["Tip", "Özellik", "Kullanım"],
              rows: [
                ["Ateş borulu (fire-tube)", "Yanma gazı borulardan geçer, su boruların dışında", "Yardımcı kazan, düşük basınç"],
                ["Su borulu (water-tube)", "Su borulardan geçer, yanma gazı dışarıda", "Ana kazan, yüksek basınç/kapasite"],
                ["Kompozit", "Yakıt brülörü + egzoz ekonomizer birleşik", "Motor gemilerinde yaygın"],
                ["Egzoz ekonomizer", "Ana motor egzoz gazı ısısını kullanır", "Seyirde buhar üretimi"]
              ]
            }
          },
          {
            heading: "Kazan Su Kimyası",
            paragraphs: [
              "pH, alkalinite, iletkenlik/TDS, klorür, fosfat ve oksijen scavenger hedefleri; kazan basıncı, metalürji ve kullanılan treatment programına göre belirlenir. İnternetten alınmış tek bir aralık bütün kazanlara uygulanmaz.",
              "Klorür trendi condenser/deniz suyu kaçağını gösterebilir; kabul ve blowdown limiti water-treatment supplier ile maker manual'deki değerdir.",
              "Sertlik ve besi suyu kontaminasyonu scale/overheating riski yaratır; ölçüm yöntemi ve düzeltme adımı test-kit prosedürüne göre kaydedilir.",
              "Kimyasal seçimi gelişigüzel yapılmaz; bazı oksijen tutucuların sağlık/çevre kısıtları vardır. Doz yalnız onaylı treatment programı ve SDS ile verilir."
            ]
          },
          {
            heading: "Emniyet Düzenleri",
            paragraphs: [
              "Emniyet valfi: Kazan basıncı ayar değerini aştığında otomatik açılır. En az 2 adet bulunmalıdır.",
              "Su seviye alarmı: Düşük su seviyesi (low water) alarmı ve düşük-düşük su seviyesi (low-low water) trip'i.",
              "Alev gözü (flame eye): Brülör alevini izler; alev sönerse yakıt kesilir.",
              "Kapak kilitleme (interlock): Furnace kapağı açıkken brülör çalışamaz."
            ]
          }
        ],
        keyPoints: [
          "Kazan patlaması en tehlikeli makine dairesi kazalarından biridir.",
          "Dry firing (susuz ateşleme) mutlak olarak önlenmelidir.",
          "Blowdown (kazan dip tahliyesi) düzenli yapılarak çamur ve tortu uzaklaştırılır.",
          "Egzoz ekonomizer kurum yangını (soot fire) riski taşır; düzenli su yıkama gerekir."
        ],
        workingPrinciple: [
          "Yakıt brulörde yakılarak baca gazıyla su borularını ısıtır; su kaynayarak buhar üretir.",
          "Atık ısı kazanı (composite/economiser), ana motor egzoz gazı ile buhar üretir.",
          "Buhar tamburu (steam drum), buhar ve suyu ayırır.",
          "Safety valve, set basıncın üstünde otomatik açarak basıncı tahliye eder."
        ],
        operation: [
          "Yakmadan önce burner management system'in tamamladığı purge hava değişimi/süresini doğrula; interlock'u bypass etme ve sabit '3 dakika' değerini maker sekansının yerine kullanma.",
          "Brulörü tutuştur, alev güvenlik sensörü ile alevi izle.",
          "Su seviyesini gauge glass ile sürekli kontrol et.",
          "Basıncı yavaş yükselt; set basınçta safety valve testini periyodik yap.",
          "Soot blowing'i belirli aralıklarla yap."
        ],
        faults: [
          { fault: "Düşük su seviyesi alarmı", cause: "Besleme pompası arızası, kaçak", action: "Brulörü kes, sebebi bul, su tamamla; kuru çalışma kazanı yakar." },
          { fault: "Yüksek basınç alarmı", cause: "Buhar tüketimi düşük, basınç kontrolü arızalı", action: "Yakıt akışını kıs, safety valve setini kontrol et." },
          { fault: "Alev tutuşmuyor", cause: "İgnition arızası, yakıt basıncı düşük, atomizer tıkalı", action: "Igniter'ı kontrol et, atomizer'ı temizle, yakıt basıncı." },
          { fault: "Tüp patlaması (tube failure)", cause: "Korozyon, aşırı sıcaklık, scaling", action: "Hemen yakıtı kes, izole et, su besleme kapat, soğut." }
        ],
        precautions: [
          "Su kalitesi (chloride, pH, oxygen) periyodik analiz edilmeli.",
          "Safety valve test sertifikası geçerli olmalı.",
          "Furnace açılmadan önce tam soğuma ve havalandırma şart.",
          "Brulör bakımı sırasında yakıt vanaları çift izolasyonla kapatılmalı."
        ]
      },
      {
        title: "Separatör ve Purifier",
        introduction: "Santrifüj separatörler, yakıt ve yağlama yağından su, tortu ve katı partikülleri ayırmak için kullanılır. Doğru arıtma, motor ömrü ve performansı için kritik öneme sahiptir.",
        sections: [
          {
            heading: "Çalışma Prensibi",
            paragraphs: [
              "Santrifüj kuvvet, ağır partikülleri dışa doğru atar. Diskli yapı (disc stack) ayrışma yüzeyini artırır. Bowl 6 000-9 000 rpm'de döner.",
              "Purifier: Hem su hem katı madde ayırır. Gravity disc (su halkası) ile arayüzey konumu kontrol edilir.",
              "Clarifier: Yalnızca katı partikülleri ayırır; su çıkışı yoktur."
            ]
          },
          {
            heading: "Gravity Disc Seçimi",
            paragraphs: [
              "Gravity disc çapı, yakıtın yoğunluğuna göre seçilir. Yanlış disc seçimi yakıtın su çıkışından kaçmasına veya suyun yakıta karışmasına neden olur."
            ],
            formula: {
              expression: "ri = ro × √(ρw / ρf)",
              variables: [
                "ri: Gravity disc iç yarıçapı",
                "ro: Dış yarıçap (sabit)",
                "ρw: Su yoğunluğu (1.025 g/cm³)",
                "ρf: Yakıt yoğunluğu (g/cm³)"
              ]
            },
            example: {
              problem: "Dış yarıçapı 150 mm olan separatörde 0.960 g/cm³ yoğunluktaki yakıt için gravity disc yarıçapını hesaplayınız.",
              steps: [
                "ri = 150 × √(1.025 / 0.960)",
                "ri = 150 × √(1.0677)",
                "ri = 150 × 1.0333",
                "ri = 155.0 mm"
              ],
              result: "155 mm iç yarıçaplı gravity disc kullanılmalıdır. Katalogdan en yakın değer seçilir."
            }
          },
          {
            heading: "Arıtma Sırası",
            paragraphs: [
              "HFO arıtma sırası: Settling tank → Purifier → Clarifier → Service tank → Motor.",
              "Yakıt ön ısıtmasını sabit 98 °C'ye değil, analizdeki yoğunluk/viskozite ve separator maker'ın separation-temperature nomogramına göre ayarla; flash point ve kapalı sistem limitlerini aşma.",
              "Debi ayarı kritiktir; yüksek debi ayrışma kalitesini düşürür. Üretici tavsiye debisinin aşılmaması gerekir."
            ]
          }
        ],
        keyPoints: [
          "Yanlış gravity disc su veya yakıt kaybına neden olur.",
          "Otomatik desludge (çamur boşaltma) zamanlaması yakıt kalitesine göre ayarlanır.",
          "Separatör dengesi (balance) bozulursa titreşim ve mekanik hasar oluşur.",
          "Çıkış kalitesi tek bir evrensel su yüzdesiyle değerlendirilmez; yakıt/yağ analizi, su ve sediment trendi ile motor-maker kabul kriteri esas alınır."
        ],
        workingPrinciple: [
          "Yüksek devirde dönen bowl içinde merkezkaç kuvvet ile yağ-su-tortu ayrışır.",
          "Yoğun olan su ve tortu çevreye, hafif olan yağ merkeze yönelir.",
          "Gravity disc çapı, yakıt-su arayüzü konumunu belirler; yakıt yoğunluğuna göre seçilir.",
          "Otomatik desludging sistemi tortu boşaltma kapağını periyodik açar."
        ],
        operation: [
          "Yakıt ön ısıtmasını yakıt analizi, viskozite ve separator nomogramına göre ayarla.",
          "Pre-water seal yap, sonra yakıtı bowl'a al.",
          "Akış debisini ve sıcaklığı izle.",
          "Periyodik desludging zamanını yakıta göre ayarla.",
          "Stop'tan önce su ile yıka."
        ],
        faults: [
          { fault: "Vibration alarm", cause: "Bowl dengesizliği, yatak aşıntısı", action: "Hemen durdur, bowl ve yatakları kontrol et." },
          { fault: "Çıkış yakıtında su", cause: "Hatalı gravity disc, yüksek debi", action: "Doğru gravity disc seç, debiyi düşür." },
          { fault: "Desludging gerçekleşmiyor", cause: "Operasyon suyu basıncı düşük, valf arızası", action: "Operasyon suyunu kontrol et, valfleri temizle." },
          { fault: "Düşük devir", cause: "Kayış aşıntısı, motor problemi, fren takılı", action: "Kayış/motor/freni kontrol et." }
        ],
        precautions: [
          "Bowl açılmadan önce tam durma onaylanmalı (rotation indicator).",
          "Bowl montajında işaretler (matchmark) hizalanmalı; aksi halde patlama riski.",
          "PPE: kulaklık zorunlu; sıcak yakıt ile çalışırken eldiven.",
          "Periyodik bowl açıp temizleme (overhaul) yapılmalı."
        ]
      },
      {
        title: "Kompresörler ve Basınçlı Hava Sistemi",
        introduction: "Basınçlı hava sistemi, ana makine çalıştırma (starting air), kontrol havası ve servis havası olarak gemide üç temel amaçla kullanılır.",
        sections: [
          {
            heading: "Kompresör Tipleri",
            paragraphs: [],
            table: {
              headers: ["Tip", "Basınç", "Kullanım"],
              rows: [
                ["Çok kademeli pistonlu", "25-30 bar", "Starting air"],
                ["Vidalı (screw)", "7-10 bar", "Servis havası"],
                ["Pistonlu (tek kademe)", "7 bar", "Küçük gemiler"]
              ]
            }
          },
          {
            heading: "Starting Air Sistemi",
            paragraphs: [
              "Ana makine starting-air receiver sayısı, izolasyonu ve toplam kapasitesi SOLAS II-1 ile class/maker düzenine göre doğrulanır. Reversible motorlar için genel kapasite kriteri kompresörle takviye olmadan 12 ardışık start, non-reversible motorlarda 6 starttır; 'her receiver 6 start' şeklinde genellenmez.",
              "Kompresör kademeleri arasında ara soğutma (intercooler) ve son soğutma (aftercooler) yapılır. Her kademe çıkışında otomatik drenaj (auto-drain) bulunur.",
              "Hava şişesi emniyet valfi, basınç şişenin tasarım basıncını aştığında açılır."
            ]
          },
          {
            heading: "Kontrol ve Servis Havası",
            paragraphs: [
              "Kontrol havası (instrument air): 5-7 bar basınçta, kurutulmuş ve filtrelenmiş hava. Pnömatik kontrol valfleri ve otomasyon sistemleri için kullanılır.",
              "Servis havası (general service air): Güverte işleri, tank temizliği ve genel amaçlı kullanım. Hava kurutucu sonrası basınç regülatörü ile 5-7 bar'a düşürülür."
            ]
          }
        ],
        keyPoints: [
          "Starting air hattında mutlaka alev tutucu (flame arrester) bulunmalıdır.",
          "Hava şişesi iç muayenesi sınıf kurallarına göre periyodik yapılır.",
          "Kompresör yağ taşıması (oil carry-over) hava şişesinde patlama riski oluşturur.",
          "Kontrol havası kurutucu arızası otomasyon sistem arızalarına neden olabilir."
        ],
        workingPrinciple: [
          "Pistonlu (reciprocating) kompresör, krank-piston ile havayı emer ve sıkıştırır.",
          "İki kademeli sıkıştırma + intercooler ile ısıyı düşürür.",
          "Hava deposu (air receiver) start havası için 30 bar civarında basınçlı hava bulundurur.",
          "Otomatik drain ve safety valve ile su ve aşırı basınç tahliye edilir."
        ],
        operation: [
          "Yağ seviyesi, soğutma suyu, drenaj durumunu kontrol et.",
          "Otomatik modda alt basınçta start, üst basınçta stop yapar; manuel modda izle.",
          "Air receiver'ı günlük drenaj yap.",
          "Çıkış sıcaklığını izle (yüksek sıcaklık = intercooler veya valve sorunu)."
        ],
        faults: [
          { fault: "Basınç yükselmiyor", cause: "Suction/discharge valve aşıntısı, ring kaçak", action: "Valveleri ve ring'leri kontrol et/değiştir." },
          { fault: "Aşırı sıcaklık", cause: "Soğutma yetersiz, valve aşıntısı", action: "Cooler temizle, valve revizyonu yap." },
          { fault: "Yağ basıncı düşük", cause: "Filtre tıkalı, pompa aşıntısı", action: "Filtre değiştir, pompa kontrol et." },
          { fault: "Karter patlaması", cause: "Yağ buharı + sıcaklık + kıvılcım", action: "Acil durdur; ring/yatak inceleme; karter havalandırma kontrolü." }
        ],
        precautions: [
          "Air receiver safety valve test sertifikası güncel olmalı.",
          "Kademe çıkış sıcaklıklarını maker alarm/trip değerleri ve normal trend ile izle; evrensel 140 °C sınırı kullanma.",
          "Bakım sırasında basınç tam olarak tahliye edilmeli.",
          "Yağ kalitesi ve değişim periyodu üretici tavsiyesinde olmalı."
        ]
      },
      {
        title: "Pompa Tipleri ve Uygulamaları",
        introduction: "Gemide çok sayıda pompa, farklı amaçlarla (balast, sintine, yük, yakıt, yağlama, soğutma, yangın) kullanılır. Pompa tipi, iletilen sıvının özelliklerine ve gerekli basınç/debi değerlerine göre seçilir.",
        sections: [
          {
            heading: "Pompa Sınıflandırması",
            paragraphs: [],
            table: {
              headers: ["Tip", "Çalışma Şekli", "Kullanım Alanı"],
              rows: [
                ["Santrifüj", "Çark ile kinetik enerji", "Soğutma suyu, balast, yangın"],
                ["Dişli (gear)", "İç/dış dişli çift", "Yağlama yağı, yakıt transfer"],
                ["Vidalı (screw)", "İç içe vidalar", "Yük pompası (tanker)"],
                ["Pistonlu", "Piston ileri-geri hareketi", "Yüksek basınç, küçük debi"],
                ["Membran (diaphragm)", "Esnek membran", "Kimyasal, sintine"],
                ["Ejektör", "Tahrik sıvısı ile vakum", "Sintine, egzoz gazı"]
              ]
            }
          },
          {
            heading: "Pompa Performans Hesabı",
            paragraphs: [],
            formula: {
              expression: "P = (ρ × g × H × Q) / (η × 1000)",
              variables: [
                "P: Pompa gücü (kW)",
                "ρ: Sıvı yoğunluğu (kg/m³)",
                "g: Yerçekimi (9.81 m/s²)",
                "H: Toplam basma yüksekliği (m)",
                "Q: Debi (m³/s)",
                "η: Pompa verimi"
              ]
            },
            example: {
              problem: "Deniz suyu pompası 200 m³/saat debi ve 25 m basma yüksekliğinde çalışıyorsa, %70 verimle gerekli motor gücünü hesaplayınız.",
              steps: [
                "Q = 200/3600 = 0.0556 m³/s",
                "P = (1025 × 9.81 × 25 × 0.0556) / (0.70 × 1000)",
                "P = 13 988 / 700",
                "P = 19.98 kW"
              ],
              result: "Pompa motor gücü yaklaşık 20 kW olmalıdır."
            }
          }
        ],
        keyPoints: [
          "Santrifüj pompa kendi kendine emme yapamaz; priming gerekir.",
          "Pozitif deplasmanli pompalar (dişli, vidalı) basınçtan bağımsız sabit debi sağlar.",
          "Kavitasyon, NPSH yetersiz olduğunda pompa performansını düşürür.",
          "Acil yangın pompası ana makine dairesinin dışında konumlandırılmalıdır."
        ],
        workingPrinciple: [
          "Santrifüj pompa, impeller dönüşü ile sıvıya kinetik enerji verir; volüt'te basınca dönüşür.",
          "Pozitif deplasmanlı pompa (gear, screw, vida) sabit hacmi her devirde basar.",
          "Eductor (jet pump), yüksek hızlı sıvının basınç düşürmesiyle vakum oluşturarak sıvı çeker.",
          "Pompa kavitasyonu, emiş tarafında basıncın buhar basıncının altına düşmesi sonucu oluşur."
        ],
        operation: [
          "Çalıştırmadan önce pompayı priming ile doldur (santrifüj kuru çalışmamalı).",
          "Suction/discharge valflerini doğru sırayla aç.",
          "Çıkış basıncını ve akımı izle.",
          "Stop ederken önce discharge valve, sonra motor kapat (water hammer'ı önlemek için)."
        ],
        faults: [
          { fault: "Suction yapamıyor", cause: "Hava girişi, foot valve arızası, filtre tıkalı", action: "Hava sızıntısını kapat, foot valve/filtre kontrolü." },
          { fault: "Düşük basınç", cause: "Impeller aşıntısı, ring clearance büyük, kavitasyon", action: "Impeller değiştir, suction koşullarını iyileştir." },
          { fault: "Aşırı titreşim", cause: "Misalignment, yatak aşıntısı, kavitasyon", action: "Alignment kontrolü, yatak değişimi, NPSH kontrolü." },
          { fault: "Mekanik salmastra kaçağı", cause: "Yüzey aşıntısı, kuru çalışma", action: "Salmastrayı değiştir, soğutma akışını sağla." }
        ],
        precautions: [
          "Fire/emergency pump testini PMS/SMS sıklığında, seçilmiş hidrantta priming, pressure, akış ve bağımsız suction/enerji kaynağını doğrulayacak şekilde yap.",
          "Tank içine kuru pompa salmamak için seviyeyi izle.",
          "Pompa motoru elektriksel izolasyon ve LOTO ile bakıma alınmalı.",
          "Yağlı/zehirli sıvı pompalarında salmastra kaçağı kayıt altına alınmalı."
        ]
      },
      {
        title: "Tatlı Su Üretim Sistemleri",
        introduction: "Gemide tatlı su, vakumlu evaporatör veya ters ozmoz (RO) sistemi ile deniz suyundan üretilir. Üretilen su içme, kazan besleme ve genel amaçlı kullanım için arıtılır.",
        sections: [
          {
            heading: "Vakumlu Evaporatör",
            paragraphs: [
              "Ana motor jacket water ısısı (yaklaşık 80°C) ile deniz suyunu düşük basınçta (vakumda) buharlaştırır. Buharlaşma sıcaklığı 40-60°C'ye düşürüldüğünden ekstra yakıt harcanmaz.",
              "Plate tipi veya shell-tube tipi ısı eşanjörü kullanılır. Buhar kondenser'da soğutma suyu ile yoğuşturularak tatlı su elde edilir.",
              "Salinometre (tuzluluk ölçer) üretilen suyun kalitesini sürekli kontrol eder. Tuzluluk 10 ppm'in üzerine çıkarsa su otomatik olarak denize geri gönderilir."
            ]
          },
          {
            heading: "Ters Ozmoz (RO) Sistemi",
            paragraphs: [
              "Yüksek basınç pompası (55-70 bar) deniz suyunu yarı geçirgen membrandan geçirir. Tuz ve mineraller membranın diğer tarafında kalır.",
              "RO sistemi motor ısısına bağlı değildir; limanda da çalışabilir. Membran ömrü 3-5 yıldır; kimyasal temizlik (CIP) düzenli yapılmalıdır.",
              "Enerji tüketimi evaporatöre göre daha yüksektir ancak modern enerji geri kazanımlı sistemlerde düşürülmüştür."
            ]
          }
        ],
        keyPoints: [
          "FWG/RO çalıştırma bölgesi sabit bir 20 NM kuralıyla belirlenmez; liman/nehir kirliliği, ballast/sanitary deşarjları, yerel talimat, sea-chest durumu ve şirket su emniyet planına göre üretim durdurulur.",
          "WHO standartlarına göre içme suyu klorür < 250 ppm, pH 6.5-8.5 olmalıdır.",
          "Mineral dozajı üretilen suyun pH'ını yükseltir ve korozif etkisini azaltır.",
          "UV sterilizasyon veya klorlama dezenfeksiyon için kullanılır."
        ],
        workingPrinciple: [
          "Vakum evaporatörü, deniz suyunu düşük basınç altında ~50 °C'de buharlaştırır.",
          "Buhar yoğuşturucuda (condenser) deniz suyu ile soğutularak tatlı suya dönüşür.",
          "Salinometer, üretilen suyun tuzluluğunu izler; eşik üzerindeyse dump valve devreye girer.",
          "Reverse osmosis (RO) sistemleri, yarı geçirgen membran ile yüksek basınç altında saf su üretir."
        ],
        operation: [
          "Vakum pompasını çalıştır, vakum -90 kPa civarına ulaştır.",
          "Jacket water'ı buharlaştırıcıya yönlendir.",
          "Salinometer kalibrasyonunu kontrol et.",
          "Üretilen suyu ilk dakikalarda dump'a al, kalite stabilize olunca tank'a yönlendir."
        ],
        faults: [
          { fault: "Üretim düşük", cause: "Vakum yetersiz, evaporatör scaling", action: "Vakum pompasını kontrol et, evaporatörü asit ile temizle." },
          { fault: "Yüksek tuzluluk alarmı", cause: "Demister arızası, salinometer kalibrasyon", action: "Demister kontrol, sensör kalibre, dump devre." },
          { fault: "RO membran düşük debi", cause: "Membran tıkanma, basınç düşük", action: "Membranı temizle, gerekirse değiştir." }
        ],
        precautions: [
          "Liman, nehir ağzı veya kirlenme şüphesinde Water Safety Plan/SMS gereğine göre FWG/RO'yu izole et; tank ve ürün suyu kalitesini yeniden doğrula.",
          "Üretilen su içme amaçlı kullanılacaksa UV/silver/klorlama yapılmalı.",
          "Periyodik mikrobiyolojik analiz yapılmalı.",
          "Asit temizliğinde uygun PPE (yüz maskesi, eldiven) kullanılmalı."
        ]
      },
      {
        title: "İnsinerator (Atık Yakma Fırını)",
        introduction: "Insinerator, gemide üretilen sludge (atık yağ), oily rags, plastik dışı katı atık ve sewage çamurunu IMO MEPC.244(66) standardına göre yakarak hacmini ve çevresel etkisini azaltan yardımcı makinedir. 850–1200 °C aralığında çalışır ve baca gazı emisyonları regule edilir.",
        sections: [
          {
            heading: "Yapı ve Bileşenler",
            paragraphs: [
              "Yanma odası refrakter tuğla ile kaplı, sludge tank, dosing pompası, brulor (burner) ve hava fanı içerir.",
              "Sludge ön ısıtması/viskozitesi burner ve dosing-pump manual'indeki atomization bandına göre ayarlanır; sabit 90 °C her sludge bileşimi için güvenli değildir.",
              "Katı atık (kağıt, gıda) charge door'dan yüklenir; ön ısıtma sonrası alev yakar.",
              "Baca: cyclone/scrubber + sıcaklık sensörü + emisyon kontrolü."
            ],
            table: {
              headers: ["Akış / kontrol", "Karar kaynağı", "İzlenen kanıt"],
              rows: [
                ["Onboard-generated oil/sewage sludge", "MARPOL VI/16 + type-approval + maker feed spec", "Feed rate, chamber/outlet temperature, alarm log"],
                ["Katı garbage", "Garbage Management Plan ve prohibited-material ayrımı", "Batch mass/volume, position ve GRB kaydı"],
                ["PVC/halojenli içerik", "Yalnız uygun IMO type-approved incinerator ve yerel izin", "Waste segregation ve equipment approval"]
              ]
            }
          }
        ],
        keyPoints: [
          "MARPOL Annex VI/16 prohibited materials listesini Garbage Management Plan'dan uygula: PCB, ağır metal izinden fazlasını içeren garbage ve ilgili cargo residues/contaminated packing gibi maddeleri yakma; PVC yalnız buna uygun IMO type-approved incinerator'da ve yerel izinle işlenebilir.",
          "Incineration yasağı atık türü ve operasyon yerine göre MARPOL Annex VI Reg. 16 ile liman/terminal/yerel kurallardan kontrol edilir; bütün special area'larda her türlü incinerator çalışması mutlak yasaktır denemez.",
          "Garbage Record Book (Part I) yakılan atık türü ve miktarı kayıt altına alınır.",
          "Low/high-temperature feed cut-out ve shutdown setleri incinerator type-approval ile maker BMS sequence'inden doğrulanır; her model için sabit 850 °C trip varsayılmaz."
        ],
        workingPrinciple: [
          "Burner, chamber'i type-approved feed-enable sıcaklığına getirir; control system izin vermeden sludge/garbage beslenmez.",
          "Sludge dosing pompası ısıtılmış sludge'ı atomize ederek yanma odasına püskürtür.",
          "Hava fanı yanma için yeterli oksijen sağlar; oran kontrol edilir.",
          "Baca gazı sıcaklık sensörüyle izlenir; düşerse oto-shutdown."
        ],
        operation: [
          "Sludge tankı seviyesini, yakıt tankını ve hava fanını kontrol et.",
          "Burner ile maker start sequence'ini tamamla; sludge/solid feed'i yalnız type-approval ve interlock'un izin verdiği chamber sıcaklığında başlat.",
          "Chamber/combustion-gas sıcaklığını type-approved çalışma bandında tut; aşırı dosing ve görünür dumanı normal kabul etme.",
          "Çalışma sonunda dosingi kes, brulor ile odayı temiz yakıtla soğut (purge).",
          "Garbage Record Book'a tür, hacim, başlangıç-bitiş saati yaz."
        ],
        faults: [
          { fault: "Brulor ateşlemiyor", cause: "Yakıt yok, ignition elektrot kirli, fotosel arızalı", action: "Yakıt valfini aç, elektrotları temizle, fotoseli kontrol et." },
          { fault: "Siyah duman çıkıyor", cause: "Hava yetersiz, atomizer tıkalı, sludge çok viskoz", action: "Hava fanı debisi artır, atomizer söküm temizlik, sludge ön ısıtma kontrol." },
          { fault: "Oda sıcaklığı düşük alarmı", cause: "Refrakter hasarı, fazla sludge dosingi, yakıt düşük kalori", action: "Refrakter inspeksiyon, dosing kıs, yakıtı pis sludge ile karıştırma." },
          { fault: "Charge door kilit alarm", cause: "Limit switch arızalı, contası eskimiş", action: "Switch ve conta değişimi, kilit test." }
        ],
        precautions: [
          "Çalışırken charge door kesinlikle açılmaz; alev geri tepme (flashback) riski.",
          "Plastik veya PVC içeren atık dioxin/furan üretir, sağlığa ve çevreye zararlıdır.",
          "Refrakteri termal şoktan korumak için maker'ın controlled cool-down/purge süresini tamamla; sabit 4 saat bütün modeller için geçerli değildir.",
          "Stack çıkışı çevresinde personel olmamalı; soğuk havada görünmeyen sıcak gaz tehlikesi."
        ]
      },
      {
        title: "Sintine Separatörü (OWS / 15 ppm Bilge Separator)",
        introduction: "OWS (Oily Water Separator), makine dairesi sintinesindeki yağlı suyun MARPOL Annex I gereği denize basılmadan önce yağ içeriğinin 15 ppm altına düşürülmesini sağlayan yardımcı makinedir. Yer çekimi ayırma + koalesan filtre + bazen membran teknolojisi ile çalışır ve 15 ppm alarm/stop ünitesine bağlıdır.",
        sections: [
          {
            heading: "Sistem Bileşenleri",
            paragraphs: [
              "1. kademe (gravity separator): yoğunluk farkıyla serbest yağ ve büyük damlacıklar üstte ayrışır.",
              "2. kademe (coalescer / filter): emülsifiye damlacıklar koalesan ortamda birleştirilip ayrılır.",
              "15 ppm bilge alarm (OCM — Oil Content Monitor): IMO MEPC.107(49) onaylı; ≥15 ppm olduğunda 3-yollu valfi tank tarafına yönlendirir.",
              "Sludge ve yağ toplama tankı (slop/sludge tank) ve overboard hattı."
            ],
            table: {
              headers: ["Kademe", "Amaç", "Tipik Verim"],
              rows: [
                ["Gravity stage", "Serbest yağ ayrımı", ">100 ppm → 50–100 ppm"],
                ["Coalescer", "Emülsiyon kırma", "<15 ppm"],
                ["Polishing filter", "Son kademe", "<5 ppm"]
              ]
            }
          }
        ],
        keyPoints: [
          "Machinery-space bilge deşarjı için MARPOL Annex I Reg. 15'te genel bir 12 NM şartı yoktur: uygulanabilir gemide seyir halinde olma, onaylı 15 ppm ekipmanı/alarm-otomatik durdurma düzeni, seyreltilmemiş effluent ve ≤15 ppm şartları birlikte sağlanır.",
          "Special area, Antarctic area, gemi tipi/GT, kıyı devleti ve IOPP Supplement düzeni ayrıca doğrulanır; overboard valfin açılabilir olması deşarjın hukuken uygun olduğunu kanıtlamaz.",
          "ORB (Oil Record Book) Bölüm I'de her separatör operasyonu kayıt altına alınır.",
          "Magic pipe (bypass) kullanımı ağır cezai yaptırım gerektirir."
        ],
        workingPrinciple: [
          "Sintine pompası yağlı suyu separatöre besler; ilk hücrede serbest yağ üst kısma çıkar ve toplama tankına alınır.",
          "Su, koalesan filtre elemanından geçer; mikron damlacıklar birleşip yüzeye çıkar.",
          "Çıkış suyu OCM'den geçer; numune sürekli ölçülür ve veri loglanır.",
          "≥15 ppm okumada 3-yollu solenoid valf otomatik olarak çıkışı bilge tankına geri çevirir, alarm verir."
        ],
        operation: [
          "Çalıştırmadan önce sealing water hattını aç (bazı modellerde gerekli).",
          "Pompa başlat, ilk birkaç dakika resirkülasyon modunda OCM'yi prime et.",
          "Deşarj koşulları checklist ile doğrulandıktan ve sorumlu zabit izin verdikten sonra maker sekansıyla overboard yönünü seç; OCM değeri, sample flow ve automatic stopping device işlevini izle.",
          "ORB Code'a uygun operasyon kodu, start/stop zamanı, pozisyon, miktar ve yöntemi sorumlu zabitçe gecikmeden kaydet; Master kontrol/imza düzenini uygula.",
          "Bitirince hatları temiz su ile flush et, OCM sensörünü temiz tut."
        ],
        faults: [
          { fault: "Sürekli 15 ppm alarmı", cause: "OCM sensörü kirli, koalesan element doymuş", action: "OCM cell temizliği, koalesan element değişimi." },
          { fault: "Pompa basınç vermiyor", cause: "Sintine kuyusu boş, hava emiyor", action: "Suction kontrol, hava al, valfleri kontrol." },
          { fault: "Yağ toplama tankı dolu alarmı", cause: "Slop tank dolmuş", action: "Sludge tankına transfer et, ORB'a yaz." },
          { fault: "OCM kalibrasyon hatası", cause: "Lamba/optik bozuk, sıfır kalibrasyon kayıp", action: "Üretici prosedürüne göre temiz su ile zero, span kalibrasyonu." }
        ],
        precautions: [
          "OCM mührü (seal) PSC inspeksiyonunda kontrol edilir; mühür kırılmış olmamalı.",
          "Bypass hattı veya sahte OCM bağlantısı kesinlikle yapılmaz; ağır ceza ve hapis cezası vardır.",
          "Numune hattı sürekli akışlı olmalı; tıkanma alarm üretmez ama hatalı düşük okuma yapar.",
          "Slop tankı transferi shore reception facility'ye verilirken receipt ORB'ye yapıştırılır."
        ]
      },
      {
        title: "Sewage Treatment Plant (STP)",
        introduction: "Sewage Treatment Plant, gemideki tuvalet (black water) ve bazen mutfak/lavabo (grey water) atık sularını MARPOL Annex IV ve IMO MEPC.227(64) standardına göre arındıran yardımcı makinedir. Biyolojik (aerobik aktif çamur), elektroliz veya MBR (membran bioreaktör) tipinde olabilir.",
        sections: [
          {
            heading: "Sistem Tipleri",
            paragraphs: [
              "Biyolojik (extended aeration): 3 hücreli — aerobik (mikroorganizma sindirimi) → settling (çökelti) → klorinasyon → discharge. Geleneksel ve yaygın tip.",
              "Elektrolitik: deniz suyu elektrolizle hipoklorit üretir; doğrudan kimyasal dezenfeksiyon yapar.",
              "MBR (Membrane Bioreactor): biyolojik proses + ultrafiltrasyon membran; çıkış suyu çok yüksek kalitede olur."
            ],
            table: {
              headers: ["Parametre", "MEPC.227(64) type-approval test kriteri", "Örnek MBR trendi; garanti değil"],
              rows: [
                ["Fekal koliform", "<100 CFU/100mL", "<10"],
                ["TSS (askıda katı)", "<35 mg/L", "<10"],
                ["BOD5", "<25 mg/L", "<10"],
                ["pH", "6–8.5", "7–8"]
              ]
            }
          }
        ],
        keyPoints: [
          "Untreated sewage ancak en yakın karadan 12 NM'den uzakta, gemi en route iken ve İdarenin onayladığı moderate-rate düzenine göre boşaltılabilir; MEPC.157(55) hesabında hızın 4 knot'tan az olmaması esas alınır.",
          "Approved comminuting/disinfecting sisteminden geçen sewage için 3 NM şartı ayrı bir yoldur. Operasyonel ve type-approved STP effluent'i bu mesafe ezberinden farklıdır; Annex IV, ISPP Supplement ve yerel kural birlikte kontrol edilir.",
          "Baltık Sea special-area hükümleri özellikle yolcu gemilerinin sewage deşarjına, uygulama tarihleri ve onaylı nutrient-removal STP/reception seçenekleriyle uygulanır; bütün gemiler için tek cümlelik mutlak yasak değildir.",
          "ISPP sertifikasının geçerliliği ve endorsment/survey durumu sertifikanın üzerinde doğrulanır; normal azami süre beş yıldır."
        ],
        workingPrinciple: [
          "Aerobik tankta blower hava verir; aktif çamur içindeki bakteriler organik maddeyi CO₂ ve H₂O'ya çevirir.",
          "Settling tankında çamur çöker; dipte biriken çamur aerobik tanka geri sirküle edilir.",
          "Üst sıvı kontak tankında klor (kalsiyum hipoklorit tableti veya elektrolitik) ile dezenfekte edilir.",
          "Discharge pompası işlenmiş su tankından deniz tarafına basar; level switch otomatik kontrol sağlar."
        ],
        operation: [
          "Aerobik tank seviyesini kontrol et (genelde 50–70%).",
          "Biyolojik proseste blower duty/standby ve çalışma çevrimini maker manual'e göre sürdür; uzun hava kaybında biomass sağlığını analiz et ve kontrollü recovery uygula.",
          "Dezenfeksiyon tipine göre dozaj/elektroliz, residual ve sarf durumunu maker manual ile discharge standardına göre kontrol et.",
          "Discharge pompasını ancak Annex IV, special-area/port kuralı ve geminin Sewage Management Plan koşulları doğrulandıktan sonra devreye al.",
          "Haftalık olarak çamur seviyesini ölç; gerekirse fazla çamuru sludge tankına al."
        ],
        faults: [
          { fault: "Ağır koku, tank köpürüyor", cause: "Blower yetersiz, aşırı yükleme, deterjan fazla", action: "Hava debisini artır, mutfak greywater'ı bypass et, mikroorganizma kültürü ekle." },
          { fault: "Çıkış bulanık, koliform yüksek", cause: "Klor bitmiş, settling bozuk", action: "Klor tabletini doldur, settling'i temizle, sistemi yeniden seed et." },
          { fault: "Discharge pompa çalışmıyor", cause: "Level switch arızalı, impeller tıkalı (peçete vb.)", action: "Switch test, pompa söküm temizlik." },
          { fault: "Blower aşırı sıcak", cause: "Hava filtresi tıkalı, kayış gevşek", action: "Filtre değiştir, kayış gerginlik kontrolü." }
        ],
        precautions: [
          "STP girişine wet wipe, peçete, bez atılmamalı; pompa ve nozülleri tıkar.",
          "Klor/dezenfektan ile çalışırken SDS'de belirtilen kimyasal PPE, havalandırma ve acil müdahale düzenini kullan; uygunsuz asit karışımı zehirli gaz çıkarabilir.",
          "Sistem 24+ saat durduğunda bakteri kültürü ölebilir; tekrar devreye almada seed gerekebilir.",
          "Holding tank kapasitesi POB, üretim debisi, rota/liman kısıtları ve reception planına göre hesaplanır; high-level alarm ile kalan bekletme süresi watch handover'da izlenir."
        ]
      },
      {
        title: "Isı Değiştiriciler ve Soğutucular (Heat Exchanger / Cooler)",
        introduction: "Isı değiştiriciler, iki akışkan arasında ısı transferi sağlayan temel yardımcı makinelerdir. Gemide L.O. cooler, jacket water (ceket suyu) cooler, charge air cooler, F.O./L.O. heater ve central cooling kondenserleri bu gruba girer. Modern gemilerde deniz suyu korozyonunu makinelerden uzak tutan merkezi soğutma (central cooling) sistemi yaygındır.",
        sections: [
          {
            heading: "Isı Değiştirici Tipleri",
            paragraphs: [
              "Plakalı (plate): İnce oluklu paslanmaz/titanyum plakalar; yüksek verim, küçük hacim, kolay temizlik. Central cooler ve L.O. cooler'da yaygın.",
              "Gövde-boru (shell & tube): Bir akışkan borulardan, diğeri gövdeden geçer. Yüksek basınç/sıcaklığa dayanıklı; F.O. heater ve buhar ısıtıcılarda kullanılır.",
              "Charge air cooler (hava soğutucu): Turboşarj sonrası sıkışan emme havasını soğutur; dolgu yoğunluğunu (ve gücü) artırır."
            ],
            table: {
              headers: ["Tip", "Özellik", "Kullanım"],
              rows: [
                ["Plakalı (plate)", "Yüksek verim, kompakt, sökülüp temizlenebilir", "Central/L.O./J.W. cooler"],
                ["Gövde-boru (shell&tube)", "Yüksek basınç/sıcaklık, sağlam", "F.O. heater, buhar ısıtıcı"],
                ["Charge air cooler", "Hava/su, kanatlı boru demeti", "Dolgu havası soğutma"],
                ["Titanyum plaka", "Deniz suyu korozyonuna dayanıklı", "Central cooler SW tarafı"]
              ]
            }
          },
          {
            heading: "Isı Transferi (LMTD)",
            paragraphs: [
              "Transfer edilen ısı, toplam ısı transfer katsayısı (U), alan (A) ve logaritmik ortalama sıcaklık farkına (ΔTlm) bağlıdır.",
              "Kirlenme (fouling) U değerini düşürür; performans düşüşü çıkış sıcaklığı yükselmesiyle fark edilir."
            ],
            formula: {
              expression: "Q = U × A × ΔTlm",
              variables: [
                "Q: Isı transfer hızı (W)",
                "U: Toplam ısı transfer katsayısı (W/m²·K)",
                "A: Isı transfer yüzey alanı (m²)",
                "ΔTlm: Logaritmik ortalama sıcaklık farkı (K)"
              ]
            },
            example: {
              problem: "U = 3000 W/m²·K, A = 8 m², ΔTlm = 15 K olan bir L.O. cooler'ın ısı transfer kapasitesini bulun.",
              steps: [
                "Q = U × A × ΔTlm",
                "Q = 3000 × 8 × 15 = 360.000 W"
              ],
              result: "Cooler yaklaşık 360 kW ısıyı yağdan deniz/tatlı suya aktarır."
            }
          },
          {
            heading: "Merkezi Soğutma (Central Cooling)",
            paragraphs: [
              "Deniz suyu (SW) yalnızca merkezi (central) cooler'a girer; makineler düşük tuzluluklu tatlı su (LT/HT FW) devresiyle soğutulur.",
              "Yüksek sıcaklık (HT) devresi ceket suyunu, düşük sıcaklık (LT) devresi L.O., charge air ve yardımcıları soğutur; termostatik valf sıcaklığı sabit tutar.",
              "Avantaj: deniz suyu korozyonu sadece central cooler ve SW hattıyla sınırlı kalır; bakım ve ömür kazanılır."
            ]
          }
        ],
        keyPoints: [
          "Plakalı cooler gasket'leri sıcaklık/basınç uyumlu (NBR/EPDM) olmalı; yanlış gasket kaçak yapar.",
          "Deniz suyu tarafında titanyum plaka veya CuNi boru korozyonu azaltır.",
          "Central cooling FW devresine korozyon inhibitörü (nitrit) dozlanır ve periyodik test edilir.",
          "Charge air cooler tıkanması egzoz sıcaklığını ve yakıt tüketimini artırır."
        ],
        workingPrinciple: [
          "Sıcak akışkan (yağ, ceket suyu, hava) bir taraftan; soğutucu akışkan (deniz suyu veya LT tatlı su) diğer taraftan zıt yönde (counter-flow) akar.",
          "İnce ayırıcı yüzey (plaka/boru) üzerinden ısı iletimle sıcaktan soğuğa geçer.",
          "Termostatik/üç-yollu valf çıkış sıcaklığını izleyerek soğutucu debisini ayarlar.",
          "Central sistemde SW yalnızca central cooler'ı soğutur, iç devre temiz FW ile döner."
        ],
        operation: [
          "Devreye almadan önce hava kilidini gider (vent); SW ve FW pompalarını başlat.",
          "Giriş/çıkış sıcaklık ve basınç farkını (ΔP) not et; ΔP artışı kirlenme işaretidir.",
          "Termostatik valfin set sıcaklığını (ör. ceket suyu ~ 80–85 °C) kontrol et.",
          "Deniz suyu strainer'ını düzenli temizle; SW debisi düşerse çıkış sıcaklığı yükselir.",
          "Plakalı cooler'ı periyodik aç, plakaları kimyasal (asit) ile temizle, gasket'i kontrol et."
        ],
        faults: [
          { fault: "Çıkış sıcaklığı yüksek", cause: "Plaka/boru kirli (fouling), SW debisi düşük, hava kilidi", action: "Cooler temizliği, SW strainer temizliği, hava alma (vent)." },
          { fault: "İki akışkan karışıyor (kaçak)", cause: "Plaka çatlağı, gasket bozuk, boru delinmesi", action: "Basınç testi, hasarlı plaka/boru değişimi, gasket yenileme." },
          { fault: "Yüksek basınç farkı (ΔP)", cause: "Tortu/çamur birikimi, tıkanma", action: "Ters yıkama (backflush), kimyasal temizlik." },
          { fault: "FW devresinde korozyon", cause: "İnhibitör tükenmiş, oksijen girişi", action: "Nitrit seviyesini test et ve dozla, hava girişini gider." }
        ],
        precautions: [
          "Kimyasal temizlikte (asit) uygun PPE kullan ve nötralizasyon sonrası bolca durula.",
          "Plakalı cooler'ı sökerken plaka sırasını ve yönünü işaretle; yanlış diziliş kaçak yapar.",
          "Basınçlıyken flanş/cıvata gevşetilmez; önce izole edip basınç boşalt.",
          "Deniz suyu tarafı galvanik korozyon için anot/kaplama durumu kontrol edilmeli."
        ]
      },
      {
        title: "Provision Refrigeration (Soğuk Depo) Sistemi",
        introduction: "Provision refrigeration, gemide kumanya odalarının (et, balık, sebze, süt ürünleri) belirli sıcaklıkta tutulmasını sağlayan yardımcı makinedir. Tipik olarak R404A/R407F/R513A soğutucu akışkan, kompresör, kondenser, ekspansiyon valfi ve her oda için ayrı evaporator içerir.",
        sections: [
          {
            heading: "Oda Sıcaklıkları ve Komponentler",
            paragraphs: [
              "Et odası -18 °C, balık -25 °C, sebze +4 °C, süt ürünü +2 °C, kuru kumanya +10 °C tipik.",
              "Genellikle iki kompresör (duty/standby), bir kondenser (su soğutmalı), ekspansiyon valfli her oda.",
              "Defrost: sıcak gaz veya elektrikli rezistans ile periyodik buz çözme.",
              "Solenoid valf, oda termostatına göre evaporator'a gaz akışını açar/kapar."
            ],
            table: {
              headers: ["Oda", "Sıcaklık", "Bağıl Nem"],
              rows: [
                ["Et (frozen)", "-18 °C", "—"],
                ["Balık (frozen)", "-25 °C", "—"],
                ["Sebze/meyve", "+4 °C", "%85–90"],
                ["Süt ürünü", "+2 °C", "%80"],
                ["Kuru kumanya", "+10 °C", "%50"]
              ]
            }
          }
        ],
        keyPoints: [
          "İçeriden açma, alarm ve mahsur kalma önlemlerini geminin cold-room risk assessment'i, MLC/flag ve onaylı arrangement üzerinden doğrula; yanlışlıkla kilitlenme halinde içeriden kaçış işlevini operasyon öncesi test et.",
          "Düşük sıcaklık alarmı bridge ve ECR'da görünür olmalı.",
          "Defrost sırasında oda sıcaklığı geçici olarak yükselir; defrost frekansı ayarlanmalı.",
          "Et ve balık odası ayrı evaporator gerektirir; çapraz koku önlemi."
        ],
        workingPrinciple: [
          "Kompresör soğutucu gazı sıkıştırır → kondenser deniz suyuyla yoğunlaştırır (sıvı) → likit receiver → ekspansiyon valfi (basınç düşer) → evaporator (oda havasını soğutur, gaz olur) → kompresör.",
          "Termostat oda sıcaklığını okur; set noktasına ulaşınca solenoid valfi kapatır, kompresör pump-down yapar.",
          "Defrost timer/sensör tetiklendiğinde sıcak gaz veya elektrik rezistansı evaporator'a yönlendirilir."
        ],
        operation: [
          "Sefere çıkmadan kumanya yüklendiğinde tüm odalar set sıcaklığa indirilir.",
          "Sıcaklık ve alarm kayıtlarını Food Safety Management Plan/MLC, company procedure ve cargo/provision gereğine göre tut; 'HACCP her gemide aynı biçimde zorunlu' diye genelleme yapma.",
          "Evaporator coil'inde aşırı buz birikimi varsa defrost manuel başlatılır.",
          "Refrigerant level (sight glass) ve oil level (kompressor) kontrol edilir.",
          "Condenser sea-water strainer'ını differential pressure, akış/sıcaklık trendi ve PMS'e göre temizle; sabit haftalık aralığı kirlenme kanıtının yerine kullanma."
        ],
        faults: [
          { fault: "Oda soğumuyor", cause: "Gaz kaçağı, evaporator buzlu, solenoid valf kapalı", action: "Sızdırmazlık, defrost, solenoid test." },
          { fault: "Kompresör kısa devirli (short-cycle)", cause: "LP switch ayarsız, gaz az, sıvı geri dönüşü", action: "Switch ayar, gaz şarj, ekspansiyon valf bakım." },
          { fault: "Kapıda buzlanma", cause: "Conta bozuk, defrost yetersiz", action: "Conta değişim, defrost frekansı artır." },
          { fault: "HP trip", cause: "Deniz suyu yok, kondenser kirli", action: "SW pompa, strainer, kondenser temizlik." }
        ],
        precautions: [
          "Soğuk depoya tek başına girilmez; içeride mahsur kalma riski (panic alarm + radio).",
          "Defrost sırasında üretilen sıvı drain hattı tıkanmamalı (don/sızıntı).",
          "Refrigerant kaçağı boğulma, toksisite veya yanıcılık riski yaratabilir; fixed detector gereği refrigerant sınıfı/şarjı, mahal ve class/flag risk assessment'inden doğrulanır, portable ölçüm ve havalandırma hazır tutulur.",
          "Kompresör çalışırken suction valf kapatılmaz (sıvı kompresyon = kırılma)."
        ]
      }
    ]
  },
  "fire-safety": {
    title: "Yangın ve Emniyet Sistemleri",
    description: "Sabit ve seyyar yangın söndürme sistemleri, dedektörler ve kişisel emniyet ekipmanları",
    topics: [
      {
        title: "Yangın Devre Pompası ve Hattı (Fire Main)",
        introduction: "Fire main; onaylı pompa, sea suction, izolasyon, hidrant, hortum/nozül ve gerektiğinde emergency fire pump düzeninden oluşur. Pompa sayısı, kapasitesi ve emergency pump gereği gemi tipi/GT ile SOLAS II-2/10'un uygulanabilir hükümlerinden doğrulanır.",
        sections: [
          {
            heading: "Yangın Hattı Donanımı",
            paragraphs: [
              "Ana yangın pompaları makine dairesinde, acil yangın pompası ise makine dairesi dışında ayrı bir bölmede yer alır.",
              "Yangın hattı (fire main) hidrantlar, ISC (international shore connection) ve sabit söndürme sistemlerini besler.",
              "Hat üzerinde basıncı koruyan jokey pompa (jockey/pressure maintenance pump) ve hidrofor tankı bulunabilir."
            ],
            table: {
              headers: ["Bileşen", "İşlevi"],
              rows: [
                ["Ana yangın pompası", "Normal yangın söndürme basıncı sağlar"],
                ["Acil yangın pompası", "Makine dairesi devre dışı kaldığında devreye girer"],
                ["Hidrant valfi", "Hortum bağlantısı için yangın suyu çıkışı"],
                ["ISC bağlantısı", "Karadan/başka gemiden yangın suyu alımı"]
              ]
            }
          }
        ],
        keyPoints: [
          "Gerekli ana/emergency pompa sayısı ve ortak yangında devre dışı kalmama düzeni Safety Equipment Record, Fire Control Plan ve onaylı piping diagram'dan doğrulanır.",
          "Emergency fire pump elektrik, dizel veya onaylı başka tahrikte olabilir; gerçekten bağımsız sea suction, erişim, havalandırma ve yakıt/enerji dayanımı birlikte test edilir.",
          "Hidrant basıncı/debisi sabit 2.7–4 bar ezberi değildir; SOLAS minimum jet koşulu ve onaylı pump curve üzerinden en olumsuz hidrantlarda ölçülür."
        ],
        workingPrinciple: [
          "Pompa deniz suyunu kingstondan alır, basınçlandırarak fire main hattına basar.",
          "Hat boyunca basınç sensörü ve PSV (pressure safety valve) bulunur.",
          "Hidrant açıldığında basınç düşer; otomatik start sensörü pompayı devreye alır."
        ],
        operation: [
          "Suction valfini aç, kingston filtresini kontrol et.",
          "Pompayı yerel veya uzaktan (köprüüstü/kontrol odası) çalıştır.",
          "Hat basıncını manometreden izle (2.7–4 bar normal).",
          "PMS/SMS testinde seçilmiş en olumsuz hidrant(lar) üzerinden start, priming, pressure/debi ve bağımsız suction işlevini doğrula."
        ],
        faults: [
          { fault: "Pompa basınç vermiyor", cause: "Suction tıkalı, hava emiyor, impeller aşınmış", action: "Strainer temizle, pompayı priming et, impeller kontrol et." },
          { fault: "Acil yangın pompası start almıyor", cause: "Akü zayıf, yakıt yok", action: "Akü ve yakıt seviyesini kontrol et, manuel start dene." },
          { fault: "Hat basıncı düşüyor", cause: "Hat üzerinde sızıntı, valfler tam kapanmamış", action: "Hattı izle, valfleri sıkıştır, sızıntı noktasını ara." }
        ],
        precautions: [
          "Acil yangın pompasını PMS/SMS sıklığında, gerçek suction ve hidrant basıncı dahil test et; sadece kısa no-load startı yeterli sayma.",
          "Hidrant valfleri ve hortumları açık/kapalı pozisyonda korozyona karşı denetlenmeli.",
          "ISC bağlantısı kolay erişilebilir yerde, gri renk ve etiketli olmalı.",
          "Kış aylarında açık güverte hatlarında donma önlemi alınmalı."
        ]
      },
      {
        title: "CO₂ Sabit Söndürme Sistemi",
        introduction: "Sabit CO₂ sistemi, onaylandığı makine mahalli veya kargo mahalli gibi kapalı hacimlere hesaplanmış miktarda gaz vererek yangını bastırır. Korunan mahaller Fire Control Plan ve release-station marking'inden doğrulanır; yakıt tankını kendiliğinden 'korunan mahal' saymak tehlikelidir.",
        sections: [
          {
            heading: "Sistem Bileşenleri",
            paragraphs: [
              "Yüksek basınç (HP) CO₂ silindirleri ~50 bar basınçta sıvı CO₂ içerir; en yaygın gemi tipi.",
              "Pilot silindir, master valfi ve manifold valflerini açan kontrol gazını sağlar.",
              "Time delay (zaman geciktirici) personelin tahliyesi için 20–60 sn bekleme süresi sağlar.",
              "Discharge nozülleri korunan hacme dağıtılır; CO₂ miktarı, boşaltma süresi ve dağılımı FSS Code tasarım hesabı ile mahal net/gross hacim tanımına göre onaylanır."
            ],
            table: {
              headers: ["Bileşen", "İşlev"],
              rows: [
                ["CO₂ silindirleri", "Söndürme gazını depolar"],
                ["Master valfi", "Korunan hacme gaz akışını başlatır"],
                ["Pilot hattı", "Silindir valflerini pnömatik açar"],
                ["Time delay ünitesi", "Tahliye için süre tanır"],
                ["Alarm sireni", "Tahliye uyarısı verir"]
              ]
            }
          }
        ],
        keyPoints: [
          "Aktivasyon öncesi tüm personel tahliye edilmeli, kapı/jaluzi/fan kapatılmalıdır.",
          "CO₂ kaçağı veya boşaltım şüphesinde mahal tehlikeli atmosfer kabul edilir; EEBD yalnız kaçış içindir, giriş ekipmanı değildir. Giriş ancak permit, gaz ölçümü, havalandırma, standby/rescue ve gerektiğinde SCBA ile yapılır.",
          "Silindir miktar kontrolü, hose/valf testi ve hydrostatic test aralığı bayrak İdaresi, MSC.1/Circ.1318/Rev.1, üretici ve tüp standardından doğrulanır; sabit '5 yıl/%10' cümlesi bütün filolara uygulanmaz."
        ],
        workingPrinciple: [
          "CO₂ ortamdaki oksijeni seyrelterek yanma reaksiyonunu durdurur.",
          "Pilot silindiri açıldığında pnömatik basınç master valfi ve istenen sayıda silindiri tetikler.",
          "Gaz manifolddan dağıtılır; nozüllerden hacme yayılır.",
          "CO₂, oksijen parsiyel basıncını ve alev reaksiyonunu sürdürülemez seviyeye indirir; yeterlilik, onaylı ajan miktarı/dağılım hesabıyla doğrulanır ve tekrar giriş için güvenli O₂ anlamına gelmez."
        ],
        operation: [
          "Yangın doğrulandıktan sonra makine dairesi tahliye edilir.",
          "Quick closing valves, fan, jaluzi ve yakıt valfleri kapatılır (uzaktan).",
          "Release box açılır: önce alarm/time delay devreye girer, sonra master + silindir valfleri açılır.",
          "Boşaltım sonrası hacim soğuyana ve gaz analiz yapılana kadar girilmez."
        ],
        faults: [
          { fault: "Silindir basıncı düşük", cause: "Sızıntı veya valf gevşek", action: "Silindiri tart, %10 kayıpta yeniden doldur veya değiştir." },
          { fault: "Sistem boşalmıyor", cause: "Pilot hattı tıkalı, valf yapışmış", action: "Pilot hattını kontrol et, manuel boşaltım koluna geç." },
          { fault: "Time delay çalışmıyor", cause: "Pnömatik kaçak", action: "Hatları sızdırmazlık testi, yedek pilot silindirine geç." }
        ],
        precautions: [
          "CO₂ odası iyi havalandırılmalı, sıcaklık < 55 °C olmalı.",
          "Hacme girmeden önce oksimetre ile O₂ ölçülmeli (> %20.5 olmalı).",
          "Release box erişilebilir, işaretli ve kazara çalıştırmaya karşı korunmuş tutulur; mühür/interlock/alarm fonksiyonu geminin onaylı düzenine göre test edilir.",
          "Personel kazara aktivasyona karşı eğitilmeli, alarm anlamı bilinmelidir."
        ]
      },
      {
        title: "Köpüklü (Foam) Söndürme Sistemi",
        introduction: "Foam sistemi, hidrokarbon yakıt yangınlarında yakıt yüzeyini örterek oksijen temasını kesen ve buhar oluşumunu engelleyen söndürme yöntemidir. Tankerlerde güverte foam, makine dairesinde ise lokal foam sistemi bulunur.",
        sections: [
          {
            heading: "Foam Tipleri",
            paragraphs: [
              "AFFF (Aqueous Film Forming Foam), hidrokarbonların üzerinde ince film oluşturur; yaygın deniz tipi.",
              "Alcohol Resistant (AR-AFFF), polar çözücü yangınlarında (alkol, keton) kullanılır.",
              "High-expansion foam (genleşme oranı 200–1000), kapalı hacimleri hızla doldurur."
            ],
            table: {
              headers: ["Genleşme", "Oran", "Kullanım"],
              rows: [
                ["Düşük", "< 20:1", "Güverte foam, tanker"],
                ["Orta", "20–200:1", "Makine dairesi"],
                ["Yüksek", "200–1000:1", "Kargo ambarı, kapalı hacim"]
              ]
            }
          }
        ],
        keyPoints: [
          "Tanker deck-foam gereği MARPOL'dan değil, gemi/kargo tipine uygulanabilir SOLAS II-2, FSS Code, IBC/IGC Code ve Safety Equipment Record'dan doğrulanır.",
          "Foam konsantresi yalnız onaylandığı yakıt/polar solvent ve üretici proportioning oranında kullanılır; %1, %3 veya %6 gibi oranlar birbirinin yerine geçirilemez.",
          "Foam monitor ve aplikatörler güverte boyunca dağıtılmıştır."
        ],
        workingPrinciple: [
          "Yangın pompası deniz suyunu basınçlandırır.",
          "Inductor (proportioner) venturi etkisiyle foam konsantresini ana hatta belirli oranda enjekte eder.",
          "Foam–su karışımı nozüldeki hava ile çırpılarak köpük oluşturur.",
          "Köpük yüzey üzerine örtülerek yangını boğar ve yakıt buharını bastırır."
        ],
        operation: [
          "Yangın pompasını çalıştır ve hatta basınç ver.",
          "Foam tankı valfini aç, inductor seçim valflerini ayarla.",
          "Monitor/aplikatörü yangının kenarından merkeze doğru süpür.",
          "Söndürme sonrası örtü tabakasını bozma; yeniden alevlenmeyi önle."
        ],
        faults: [
          { fault: "Köpük üretmiyor", cause: "Konsantre yok, inductor tıkalı", action: "Tank seviyesini kontrol et, inductor sökerek temizle." },
          { fault: "Köpük kalitesiz (suluk)", cause: "Karışım oranı yanlış, hava emilimi düşük", action: "Proportioner kalibrasyonu yap, nozülü kontrol et." },
          { fault: "Konsantre tankı kontamine", cause: "Su kaçağı, yaşlanma", action: "Foam numunesini test et, gerekirse tankı boşaltıp yenisiyle doldur." }
        ],
        precautions: [
          "Foam konsantresinin yıllık laboratuvar testi yapılmalı.",
          "AFFF cilde temas ederse bol su ile yıkanmalı.",
          "Tatbikat sonrası hat tatlı suyla yıkanmalı, korozyon önlenmeli.",
          "Foam genişleme oranı ve drenaj süresi periyodik ölçülmeli."
        ]
      },
      {
        title: "Sprinkler ve Su Sisleme Sistemi (Water Mist)",
        introduction: "Sprinkler sistemi otomatik olarak ısıyı algılayıp basınçlı su püskürten sabit söndürme sistemidir. Su sisleme (water mist), düşük su debisiyle yüksek basınçta çok ince damla üreterek hem söndürme hem soğutma sağlar.",
        sections: [
          {
            heading: "Sistem Mantığı",
            paragraphs: [
              "Sprinkler başlığındaki cam ampul belirli sıcaklıkta (genelde 68 °C) patlar ve suyu serbest bırakır.",
              "Hat basınçlı tutulur (wet pipe); su deşarjı anında alarm valfi aktif olur.",
              "Water mist, 70–200 bar basınçta 100 µm altı damlacık üretir; oksijen yer değiştirmesi ve buhar soğutması ile söndürür."
            ],
            table: {
              headers: ["Sistem", "Avantaj", "Kullanım Alanı"],
              rows: [
                ["Sprinkler (wet)", "Otomatik, basit", "Yatakhane, salonlar"],
                ["Water mist HP", "Düşük su, hızlı söndürme", "Makine dairesi, gali"],
                ["Deluge", "Tüm başlıklar açık, manuel start", "Helikopter güvertesi, tanker"]
              ]
            }
          }
        ],
        keyPoints: [
          "Accommodation sprinkler kapsamı gemi tipi, yapım tarihi ve yangın emniyet metoduna göre SOLAS II-2/7 ve ilgili FSS bölümünden doğrulanır; bütün yolcu mahalleri için tek cümleyle genellenmez.",
          "Water mist, CO₂'ye alternatif olarak makine dairelerinde IMO MSC.1/Circ.1387 kapsamında onaylanır.",
          "Sistem basıncı sürekli izlenir; basınç düşüşü alarm verir."
        ],
        workingPrinciple: [
          "Cam ampul ısıyla genleşip patlar, başlık açılır.",
          "Hat basıncı düşer, alarm valfi açılır ve pompa devreye girer.",
          "Deluge sisteminde manuel veya dedektör tetikleme ile tüm bölge başlıkları aynı anda boşalır."
        ],
        operation: [
          "Sistemi her zaman basınçlı (charged) konumda tut.",
          "Manometre, tank/pump ve alarm testlerini PMS ile maker/FSS test düzenine göre yap.",
          "Test valfinden örnek deşarj alarak alarm valfini test et.",
          "Deşarj sonrası ıslanan sigorta panelleri ve elektronik kontrol edilir."
        ],
        faults: [
          { fault: "Hat basıncı düşmüş", cause: "Sızıntı, jokey pompa arızalı", action: "Sızıntıyı tespit et, jokey pompayı kontrol et." },
          { fault: "Sprinkler başlığı sürekli sızdırıyor", cause: "Cam ampul bozuk, yataklama hatalı", action: "Başlığı değiştir, doğru moment ile sık." },
          { fault: "Pompa otomatik start almıyor", cause: "Pressure switch arızalı", action: "Switch test, kontak temizle veya değiştir." }
        ],
        precautions: [
          "Sprinkler başlıklarına boya, izolasyon veya ek yapılmamalı.",
          "Başlık çevresinde 50 cm açık alan bırakılmalı.",
          "Donma riskli alanlarda kuru tip (dry pipe) tercih edilmeli.",
          "Muayene, flow test ve basınç test aralıklarını maker, class/bayrak ve MSC guidance/PMS'den doğrula; hidrolik test her yıl bütün sisteme uygulanan genel bir kural değildir."
        ]
      },
      {
        title: "Inert Gas Sistemi (IGS)",
        introduction: "Inert gas sistemi, uygulanabilir tankerlerde kargo tank atmosferini yanıcı aralığın dışında ve pozitif basınçta tutar. Teslim edilen inert gazın O₂ içeriği ile tank atmosferi limiti farklıdır: supply main için ≤%5, inertlenmiş tank atmosferi için normal üst sınır ≤%8'dir.",
        sections: [
          {
            heading: "Sistem Bileşenleri",
            paragraphs: [
              "Flue gas scrubber, kazan baca gazını deniz suyu ile yıkayarak SO₂ ve karbonu temizler.",
              "Blower'lar gazı tank atmosferine basar; tipik basınç 800–1500 mmWC.",
              "Deck water seal ve non-return valf, hidrokarbonların makine dairesine geri kaçışını önler.",
              "P/V kırıcı (pressure/vacuum breaker) tank basıncını koruyan en son emniyet ekipmanıdır."
            ],
            table: {
              headers: ["Bileşen", "İşlev"],
              rows: [
                ["Scrubber", "Gazı yıkar ve soğutur"],
                ["IG Blower", "Tanklara gaz basar"],
                ["Deck water seal", "Geri akışı önler"],
                ["O₂ analizör", "Çıkış O₂'sini ölçer (< %5)"],
                ["P/V valve", "Tank aşırı basınç/vakumu tahliye eder"]
              ]
            }
          }
        ],
        keyPoints: [
          "IGS applicability; oil/chemical tanker tipi, DWT, yapım tarihi ve taşınan kargonun inerting yöntemiyle SOLAS II-2/4.5.5, IBC Code ve Record of Equipment'tan doğrulanır; 8 000 DWT eşiği tek başına yeterli değildir.",
          "Deck main'e verilen inert gaz ≤%5 O₂ olmalı; tank atmosferi ≤%8 O₂ ve pozitif basınçta tutulmalıdır. Daha düşük şirket limitleri ayrıca uygulanabilir.",
          "Discharge, tank temizleme ve gas-freeing operasyonlarında inert ortam korunur."
        ],
        workingPrinciple: [
          "Boiler exhaust ~%4 O₂ ile scrubber'a girer; deniz suyu yıkamasıyla soğutulur ve temizlenir.",
          "Blower bu gazı deck main hattına basar.",
          "Deck water seal sıvı bariyer oluşturarak geri akışı önler.",
          "Hat basıncı düşerse alarm; çok artarsa P/V breaker tahliye eder."
        ],
        operation: [
          "Boiler'ı yeterli yükte tut, scrubber pompasını çalıştır.",
          "Blower'ı low/high speed devreye al, çıkış O₂'sini izle.",
          "O₂ %5'in altına inince main isolation valfi aç.",
          "Discharge sırasında tank pozitif basınçta tutulur (~200 mmWC)."
        ],
        faults: [
          { fault: "Çıkış O₂ yüksek", cause: "Boiler düşük yük, blower kaçırıyor", action: "Boiler yükünü artır, blower seal/conta kontrol." },
          { fault: "Deck water seal seviyesi düşük", cause: "Make-up su valfi kapalı", action: "Seviye otomatiğini kontrol et, manuel besle." },
          { fault: "Hat basıncı düşüyor", cause: "Tank valfi sızdırıyor, P/V valve açık kalmış", action: "Valfleri kontrol, P/V'yi test et." }
        ],
        precautions: [
          "Tank atmosferine giriş öncesi mutlaka gas-free + O₂ ölçümü yapılmalı.",
          "IGS kapalıyken kargo discharge yasaktır.",
          "Scrubber'da yıkama suyu sürekli akmalı, aksi halde aşırı sıcaklık ve korozyon olur.",
          "Sistem üzerinde her zaman iki bağımsız non-return bariyer olmalı."
        ]
      },
      {
        title: "Yangın Dedektörleri ve Alarm Sistemi",
        introduction: "Sabit yangın dedeksiyon sistemi, yangını erken aşamada algılayıp köprüüstüne ve mahallere uyarı veren elektronik sistemdir. Algılama tipi mahalle göre seçilir.",
        sections: [
          {
            heading: "Dedektör Tipleri",
            paragraphs: [
              "İyonizasyon ve fotoelektrik duman dedektörleri yatakhane, koridor ve kontrol odalarında kullanılır.",
              "Sıcaklık dedektörleri (sabit veya ROR – rate of rise) gali, çamaşırhane gibi yüksek nemli/buharlı yerlerde tercih edilir.",
              "Alev dedektörü (UV/IR) hidrokarbon yangınlarında kullanılır; helikopter güvertesi, pump room.",
              "Aspirating smoke detection (HSSD/VESDA) kargo ambarı için yüksek hassasiyetli erken algılama sağlar."
            ],
            table: {
              headers: ["Dedektör", "Algılama", "Tipik Yer"],
              rows: [
                ["Foto/iyon duman", "Duman partikülü", "Yatakhane, ofis"],
                ["Sabit sıcaklık", "Belirli sıcaklık (68 °C)", "Gali"],
                ["ROR sıcaklık", "Hızlı sıcaklık artışı", "Makine dairesi"],
                ["UV/IR alev", "Alev radyasyonu", "Pump room, helideck"]
              ]
            }
          }
        ],
        keyPoints: [
          "Dedektör ve sprinkler kapsamı Fire Control Plan ile gemiye uygulanabilir SOLAS II-2 yangın emniyet metodundan doğrulanır; her accommodation mahalline aynı kombinasyon varsayılmaz.",
          "Alarm panelinde yangın bölgesi, gözetim arızası ve test fonksiyonları bulunur.",
          "Fail-safe: kablo kopması arıza alarmı vermelidir."
        ],
        workingPrinciple: [
          "Duman dedektöründe optik oda; partikül girince ışık saçılır ve fotosel sinyali artar.",
          "Sabit sıcaklık dedektöründe bimetal/eutektik elemanı eşik sıcaklıkta devreyi kapatır.",
          "Sinyal merkezi panel tarafından bölgeye eşleştirilir, görsel + sesli alarm verilir."
        ],
        operation: [
          "Panel lamp, fault, isolator ve zone/loop testlerini Fire Safety Operational Booklet ile PMS sıklığında yap.",
          "Dedektörleri onaylı test gazı/ısı/alev simülatörüyle maker ve MSC.1/Circ.1432 bakım planına göre fonksiyonel test et.",
          "Dedektör temizleme/değişim aralığını çevresel kirlilik, self-monitoring, maker limiti ve test trendine göre planla.",
          "Yanlış alarm sonrası bölge önce silinir, sonra reset edilir."
        ],
        faults: [
          { fault: "Sürekli yanlış alarm", cause: "Toz, nem, böcek", action: "Dedektörü temizle, gerekirse değiştir." },
          { fault: "Bölge gözetim arızası", cause: "Kablo kopuk, dedektör çıkık", action: "Hattı ölç, terminasyonu kontrol et." },
          { fault: "Panel batarya alarmı", cause: "Yedek akü zayıf", action: "Aküyü değiştir, şarj devresini test et." }
        ],
        precautions: [
          "Dedektör altında 50 cm açık koni olmalı, eşya konmamalı.",
          "Boya/dekorasyon sırasında dedektörler sökülmemeli, üzerleri kapatılmamalı.",
          "Test sırasında köprüüstüne ve makine kontrol odasına önceden bilgi verilmeli.",
          "Yıllık sertifika ve test raporları gemi kayıtlarında tutulmalı."
        ]
      },
      {
        title: "Seyyar Yangın Söndürücüler",
        introduction: "Seyyar (portable) yangın söndürücüler, başlangıç yangınında ilk müdahale için tüm gemiye dağıtılan ekipmanlardır. Yangın sınıfına ve mahalle göre tip seçilir.",
        sections: [
          {
            heading: "Sınıf ve Söndürücü Eşleşmesi",
            paragraphs: [
              "A sınıfı (katılar): su, AFFF köpük, çok amaçlı kuru kimyasal.",
              "B sınıfı (sıvılar): köpük, CO₂, kuru kimyasal.",
              "C sınıfı (gazlar): kuru kimyasal — önce gaz akışı kesilmeli.",
              "D sınıfı (metaller): özel D tozu (alümünyum, magnezyum yangınları için).",
              "Elektrik (eski E): CO₂ veya kuru kimyasal — su asla kullanılmaz."
            ],
            table: {
              headers: ["Tip", "Kapsama Sınıfı", "Mahaller"],
              rows: [
                ["Su (9 L)", "A", "Yatakhane, koridor"],
                ["Köpük (9 L)", "A, B", "Makine dairesi, mooring"],
                ["CO₂ (5 kg)", "B, elektrik", "Switchboard, kontrol odası"],
                ["Kuru kimyasal (6 kg)", "A, B, C, elektrik", "Genel kullanım"],
                ["D tozu", "D", "Atölye, metal işleme"]
              ]
            }
          }
        ],
        keyPoints: [
          "SOLAS, gemide minimum söndürücü sayısını mahalle göre belirler.",
          "Söndürücüler onaylı Fire Control Plan'daki yerde görünür, sabitlenmiş ve kolay erişilebilir tutulur; ağır tüpler için keyfî 1.5 m montaj yüksekliği uygulanmaz.",
          "Servis, recharge ve hydrostatic test aralıkları söndürücü tipi, tüp standardı, bayrak İdaresi ve MSC.1/Circ.1432'den doğrulanır; evrensel '10 yılda bir' kuralı yoktur."
        ],
        workingPrinciple: [
          "Su: soğutma ile söndürür (yangın üçgeninden ısıyı çeker).",
          "Köpük: yakıt yüzeyini örter, oksijeni keser.",
          "CO₂: oksijeni seyreltir, soğutur (-78 °C).",
          "Kuru kimyasal: yanma reaksiyonunu kimyasal olarak keser (zincir kırma)."
        ],
        operation: [
          "P-A-S-S: Pin çek, Aim (alevin tabanına nişan al), Squeeze (kolu sık), Sweep (süpürerek uygula).",
          "Rüzgârı arkana al, alevin tabanına yönlendir.",
          "Söndürdükten sonra geri çekil, yeniden alevlenmeyi bekle.",
          "Kullanılan veya boşalmış söndürücü hemen değiştirilir, kullanım kaydı tutulur."
        ],
        faults: [
          { fault: "Manometre kırmızı bölgede (basınç düşük)", cause: "Sızıntı, sıcaklık değişimi", action: "Servise gönder, yeniden doldurt." },
          { fault: "Tetik çekilmiyor", cause: "Pin sıkışmış, korozyon", action: "Söndürücüyü servise ver." },
          { fault: "Hortum çatlak", cause: "Yaşlanma, UV", action: "Hortumu değiştir, yıllık servis kontrolünde işaretle." }
        ],
        precautions: [
          "Söndürücüye yakın elektrik tablosu varsa CO₂/kuru kimyasal seçilmeli; su yasaktır.",
          "CO₂ kapalı küçük hacimde kullanırsa boğulma riski vardır.",
          "Kuru kimyasal sonrası elektronik ekipman kuruluk + temizlik gerektirir.",
          "Personel yıllık tatbikatla söndürücü kullanımı konusunda eğitilmeli."
        ]
      },
      {
        title: "EEBD ve SCBA (Solunum Cihazları)",
        introduction: "EEBD (Emergency Escape Breathing Device) sadece kaçış için, SCBA (Self-Contained Breathing Apparatus) ise yangın söndürme ve kapalı mahal girişi için kullanılan basınçlı hava solunum cihazlarıdır.",
        sections: [
          {
            heading: "EEBD vs SCBA",
            paragraphs: [
              "EEBD minimum 10 dakikalık hava sağlar, sadece tahliye amaçlıdır; yangın söndürmede kullanılmaz.",
              "SCBA tipik 1200/1800/2000 L hava ile 30–45 dakika çalışma süresi sunar.",
              "SCBA seti: tüp, basınç regülatörü, demand valf, tam yüz maskesi, sırt taşıma çatısı, alçak basınç düdüğü içerir."
            ],
            table: {
              headers: ["Özellik", "EEBD", "SCBA"],
              rows: [
                ["Amaç", "Sadece kaçış", "Müdahale + giriş"],
                ["Süre", "≥ 10 dk", "30–45 dk"],
                ["Maske", "Başlık", "Tam yüz maskesi"],
                ["Basınç", "Kapalı devre / hood", "Açık devre, ~300 bar"]
              ]
            }
          }
        ],
        keyPoints: [
          "EEBD sayısı ve konumu accommodation ile machinery-space escape düzenine göre Fire Control Plan/Safety Equipment Record'da gösterilir; EEBD yangınla mücadele veya enclosed-space giriş cihazı değildir.",
          "Fire-fighter outfit/SCBA ve yedek charge sayısı gemi tipi/GT, FSS Code ve gemideki recharge düzenine bağlıdır; sabit '2 set + set başına 2 tüp' her gemiye uygulanmaz.",
          "Yangın takımı: SCBA + yangın elbisesi + eldiven + bot + kask + can ipi + balta + el feneri."
        ],
        workingPrinciple: [
          "Yüksek basınçlı tüp (200–300 bar) hava regülatörden orta basınca düşer.",
          "Demand valf, kullanıcı nefes aldıkça maskeye hava verir.",
          "Low-pressure warning maker set değerinde çalışır; ekip giriş kontrolünde basınç-zaman hesabı ve turn-around pressure belirleyerek düdüğü beklemeden geri dönüşe başlar."
        ],
        operation: [
          "Kullanım öncesi tüp basıncını sıcaklık düzeltmesi ve maker full-charge değeriyle kontrol et; takımın giriş süresi/geri dönüş rezervine yeterli olduğunu kaydet.",
          "Maske sızdırmazlık testi: tüm girişi kapat, derin nefes al — vakum tutmalı.",
          "Cihazı tak, ana valfi tam aç, demand valfini bağla.",
          "Görev sırasında basıncı izle; düdük çaldığında geri dön."
        ],
        faults: [
          { fault: "Tüp basıncı düşük", cause: "Sızıntı veya yetersiz dolum", action: "Conta kontrol et, kompresörden yeniden doldur." },
          { fault: "Demand valf sürekli açık (free flow)", cause: "Diyafram arızalı", action: "Servise gönder; yedek setle değiştir." },
          { fault: "Maske sızdırıyor", cause: "Yanlış boy/sakal/conta yıpranmış", action: "Doğru boy seç, contayı değiştir, sakal traşı." }
        ],
        precautions: [
          "SCBA tüpünün hydrostatic test ve ömür limitini tüp standardı, üretici ve bayrak gereğinden doğrula; sertifika/marking'i yalnız sabit 5 yıl ezberiyle değerlendirme.",
          "Hava kompresöründe CO/CO₂/yağ buharı filtreleri periyodik değiştirilmelidir.",
          "EEBD eğitimi yapılmadan kullanılmamalı; hood göz korumasını sağlamalı.",
          "Yangın takımı yerinde, mühürlü ve eksiksiz tutulmalı; aylık kontrol kayda alınmalı."
        ]
      },
      {
        title: "Acil Tahliye ve Yangın Devre Dışı Bırakma (Quick Closing & Shut-off)",
        introduction: "Yangın anında yakıt, havalandırma ve elektrik devrelerini hızla kesen uzaktan kumandalı sistemlerdir. Quick closing valves, fan stop, fuel pump stop ve emergency stop butonları içerir.",
        sections: [
          {
            heading: "Sistem Mantığı",
            paragraphs: [
              "Quick closing valves (QCV) makine dairesi dışındaki bir panelden tetiklenir; yakıt tankı, lubrikasyon yağı tankları ve servis tanklarındaki valfleri kapatır.",
              "Fan stop ve damper kapatma sistemi makine dairesi havalandırmasını keser, oksijeni azaltır.",
              "Yakıt pompası ve purifier emergency stop butonları yangın bölgesi dışına yerleştirilir.",
              "Skylight, jaluzi ve havalandırma kanalı kapakları manuel veya pnömatik kapatılabilir."
            ]
          }
        ],
        keyPoints: [
          "Tüm acil stop ve QCV kontrolleri makine dairesi dışında, kolay ulaşılır panelde olmalı.",
          "Sistemler aylık test edilmeli, kayıt tutulmalıdır.",
          "Pnömatik QCV'lerde yedek azot/hava şişesi her zaman dolu olmalıdır."
        ],
        workingPrinciple: [
          "QCV sapanı çekildiğinde önceden kurulmuş yay kuvveti valf tabağını kapatır.",
          "Pnömatik tipte ise kontrol valfi açılınca silindir QCV'yi kapatır.",
          "Fan stop kontağı motor kontaktörünü açar, fan durur.",
          "Yakıt servis pompası emergency stop kontağı koruma rölesi üzerinden devreyi keser."
        ],
        operation: [
          "Yangın doğrulanıp tahliye sağlandıktan sonra: yakıtı kes (QCV) → fanları durdur → yakıt pompalarını durdur → CO₂ release.",
          "Aylık testlerde her QCV ayrı ayrı kapatılır, açılır, gres yapılır.",
          "Emergency stop butonları PSC denetiminde fonksiyonel test edilir.",
          "Test sonrası ilgili sistemlerin yeniden hatta alındığı log defterine yazılır."
        ],
        faults: [
          { fault: "QCV kapanmıyor", cause: "Yay korozyonu, kablo gevşek, hava basıncı yok", action: "Mekanik kontrol, yağla, hava şişesi basıncını doldur." },
          { fault: "Fan stop çalışmıyor", cause: "Kontaktör bobini arızalı", action: "Kontaktörü test et, bobini değiştir." },
          { fault: "QCV sızdırıyor", cause: "Tabak/seat aşınmış", action: "Valf revize edilmeli, gerekirse değiştirilmeli." }
        ],
        precautions: [
          "Tatbikat dışında QCV asla kapatılmamalı (ana makine durabilir).",
          "Test öncesi köprüüstü ve makine kontrol odası bilgilendirilmeli.",
          "Re-set sonrası yakıt hattında havayı al, sızıntı kontrol et.",
          "Etiketleme net olmalı: hangi tank/pompa hangi sapana bağlı belirtilmeli."
        ]
      }
    ]
  },
  "cargo-systems": {
    title: "Yük Sistemleri ve Ekipmanları",
    description: "Kargo pompaları, COW, lashing, hatch cover, ramp ve reefer ekipmanları",
    topics: [
      {
        title: "Kargo Pompaları (Cargo / Stripping / Booster)",
        introduction: "Kargo pompaları, sıvı yük taşıyan tankerlerde yükün boşaltılması, son sıyırma (stripping) ve yüksek terminal basıncı ihtiyacını karşılayan boost (booster) operasyonlarında kullanılan büyük debili pompalardır. Tipik olarak ana kargo pompaları santrifüj, stripping pompaları ise pozitif deplasmanlıdır.",
        sections: [
          {
            heading: "Pompa Tipleri ve Kullanım Alanları",
            paragraphs: [
              "Santrifüj kargo pompaları: ham petrol ve ürün tankerlerinde 1500–6000 m³/h debide çalışır; pump room'da bulunur ve buhar/elektrik motoruyla tahrik edilir.",
              "Submerged (deepwell) pompalar: kimyasal tankerlerde her tank için ayrı, tank tabanına yerleştirilmiş hidrolik tahrikli pompalar; cross-contamination riskini ortadan kaldırır.",
              "Stripping pompaları: pozitif deplasmanlı (vidalı veya pistonlu) tip; tank dibinde kalan son ~5–20 m³ yükü çekmek için kullanılır.",
              "Booster pompası: terminalin manifold basıncı yüksekse hat basıncını artırmak için ana pompa çıkışına seri bağlanır."
            ],
            table: {
              headers: ["Pompa", "Tip", "Tipik Görev"],
              rows: [
                ["Cargo pump", "Santrifüj / submerged", "Ana boşaltım"],
                ["Stripping pump", "Pozitif deplasman", "Tank dibi sıyırma"],
                ["Booster pump", "Santrifüj", "Terminal basıncını yenmek"],
                ["Eductor", "Venturi (jet)", "Slop tankı boşaltma"]
              ]
            }
          }
        ],
        keyPoints: [
          "Pump room atmosferi sürekli ventile edilir; gas detection sistemine bağlıdır.",
          "Pompa keçesi sıcaklığı pillow block ile sürekli izlenir; aşırı ısınma yangın riskidir.",
          "Discharge debisi; terminal agreement, manifold/shore pressure limitleri, ship-shore checklist ve cargo pump operating envelope içinde artırılır; MARPOL'a atfedilen sabit '5 cm/sn' limiti kullanılmaz."
        ],
        workingPrinciple: [
          "Santrifüj pompada impeller döner; merkezkaç kuvveti sıvıyı çevreden volute'e fırlatır ve discharge basıncı oluşur.",
          "Submerged pompada tank içi pompa motoru hidrolik yağ ile tahrik edilir; sıvı doğrudan pompa içinden riser borusuna yükselir.",
          "Pozitif deplasmanlı stripping pompası her devirde sabit hacim hareket ettirir; düşük debi ama yüksek vakum sağlar.",
          "Booster pompa ana pompanın discharge'ını alıp tekrar basınçlandırır."
        ],
        operation: [
          "Tank discharge planına göre suction valfi aç, manifold valfini terminale yönlendir.",
          "Pump room'u ventile et, gas detection sistemini aktif tut.",
          "Pompayı düşük rpm'de çalıştır, prime tamamlandığında akışı yavaş yavaş artır.",
          "Tank seviyesi ~%10'a düştüğünde stripping pompasına geç; vakum-cleared lamp ile kontrol et.",
          "Boşaltım sonunda hatları nitrogen/inert gazla pürjle, manifold'u bodu içerikle yıka."
        ],
        faults: [
          { fault: "Pompa basınç vermiyor", cause: "Hava emiyor, valf kapalı, impeller aşınmış", action: "Suction line ve valfleri kontrol et, prime al, impeller bakım." },
          { fault: "Pompa sıcaklık alarmı", cause: "Yatak yağı yetersiz, mekanik conta sızıntı", action: "Yağı kontrol et, mechanical seal değiştir, hemen durdur." },
          { fault: "Vibrasyon yüksek", cause: "Kavitasyon, hizalama bozuk, impeller dengesiz", action: "NPSH kontrol, hizalamayı yeniden yap, balanslama." },
          { fault: "Stripping pompa vakum vermiyor", cause: "Vidanın kuru çalışması, conta yıpranmış", action: "Sıvı seal sağla, conta değişimi yap." }
        ],
        precautions: [
          "Pump room'a girmeden önce O₂, LEL ve H₂S ölçümü yapılmalı; gerekirse SCBA kullanılmalı.",
          "Statik biriktiren cargo ve boş tanka ilk yüklemede, inlet örtülene kadar düşük line velocity uygulanır; kesin hız/yükseklik ISGOTT, terminal ve cargo planından alınır, her kargoya körlemesine 1 m/s uygulanmaz.",
          "Cargo ESD/remote stop istasyonlarının yeri ve etkilediği ekipman approved plan ile ship-shore checklist'ten doğrulanır; istenmeyen valf surge etkisi önceden değerlendirilir.",
          "Boşaltım sırasında trim ve heel sürekli izlenmeli; serbest yüzey momenti hesaba katılmalı."
        ]
      },
      {
        title: "Crude Oil Washing (COW) Sistemi",
        introduction: "COW, ham petrol tankerlerinde tank duvarlarındaki tortu ve mum birikintilerini, yüke ait sıcak ham petrolün yüksek basınçla püskürtülmesiyle temizleyen IMO/MARPOL onaylı bir yıkama sistemidir. ROB (remaining on board) miktarını azaltır ve tank temizliği için ek ballast/su kullanımını ortadan kaldırır.",
        sections: [
          {
            heading: "Sistem Bileşenleri",
            paragraphs: [
              "Programlı dönen tank washing makineleri (Butterworth, Toftejorg) tank tepesi ve dibinde belirli açı/devirde çalışır.",
              "COW pompası ham petrolü 8–12 bar basınçla makinelere besler.",
              "IGS, COW boyunca tank atmosferini ≤%8 O₂ ve pozitif basınçta tutar; deck main'e verilen inert gaz ≤%5 O₂ olmalıdır. Analizör reading'i uygun sampling ve calibration ile doğrulanır.",
              "Fixed gas freeing fan ve hat purje düzeni, yıkama sonrası tankı gas-free yapar."
            ],
            table: {
              headers: ["Bileşen", "İşlev"],
              rows: [
                ["Tank washing machine", "Yüksek basınçla yıkama jeti"],
                ["COW pump", "Yıkama basıncını sağlar"],
                ["Stripping system", "Yıkama suyunu/sökülen petrolü tahliye eder"],
                ["IGS", "Supply ≤%5 O₂; tank atmosferi ≤%8 O₂ ve pozitif basınç"],
                ["Pressure gauge", "Hat basıncını izler"]
              ]
            }
          }
        ],
        keyPoints: [
          "COW applicability yalnız '20 000 DWT üzeri' cümlesiyle belirlenmez; MARPOL Annex I Reg. 33'ün yapım tarihi/ship definition hükümleri, IOPP Supplement ve onaylı COW Operations and Equipment Manual kontrol edilir.",
          "COW sırasında tank atmosferi ≤%8 O₂ ve pozitif basınçta tutulur; inert-gas supply ≤%5 O₂ olmalıdır. Manual'deki daha düşük stop limiti uygulanır.",
          "Discharge planında COW programı, makine sayısı ve süreleri belirtilmelidir."
        ],
        workingPrinciple: [
          "Tank seviyesi belirli bir oranda boşaltıldıktan sonra COW pompası devreye girer.",
          "Makine, tank içinde belirli açıda dönerken jet ham petrolü duvarlara çarptırarak tortuyu çözer.",
          "Çözünen tortu yükle birlikte stripping pompası ile slop tankına aktarılır.",
          "İkinci aşama (bottom wash) tank dibine odaklanır; ROB minimize edilir."
        ],
        operation: [
          "Top wash'i yalnız onaylı COW Manual'deki tank-specific ullage, machine pattern ve discharge sequence noktasında başlat.",
          "Bottom wash/stripping zamanını tank planı, suction coverage ve terminal discharge sequence ile onaylı COW programından uygula.",
          "Yıkama süresince hat basıncını ve makine devrini izle.",
          "Yıkama sonrası tankı stripping ile boşalt, IGS ile basınçta tut.",
          "Yıkama kayıtlarını COW Operations Manual ve Oil Record Book'a işle."
        ],
        faults: [
          { fault: "Düşük yıkama basıncı", cause: "Pompa arızası, hat sızıntısı, makine tıkalı", action: "Pompa kontrol, hat sızıntı testi, makine sökerek temizle." },
          { fault: "Makine dönmüyor", cause: "Türbin kanadı tıkalı, hidrolik motor arızalı", action: "Makineyi sök, türbini temizle veya motoru değiştir." },
          { fault: "Tank O₂/IG basıncı limit dışı", cause: "IGS yetersiz, analizör/sampling hatası veya tank kaçakları", action: "COW'u derhal durdur; onaylı manual'deki tank O₂ ve supply O₂ limitlerini, pozitif basıncı ve analizör doğruluğunu yeniden sağla." }
        ],
        precautions: [
          "COW sırasında fixed/portable O₂ ölçümleri onaylı manual sıklığında karşılaştırılır; tank %8 O₂ sınırına yaklaşmadan manual'deki stop criteria uygulanır.",
          "Yıkama makineleri için onaylı operasyonel zarf (envelope) dışına çıkılmamalı.",
          "Statik şarj birikimini önlemek için yıkama akışı kontrol edilmeli.",
          "Personel pump room'a girmeden önce H₂S ölçümü yapmalı (özellikle sour crude)."
        ]
      },
      {
        title: "Tank Seviye Ölçüm ve İzleme Sistemleri",
        introduction: "Tank gauging sistemleri, kargo ve ballast tanklarındaki sıvı seviyesi, sıcaklık, basınç ve gaz konsantrasyonunu uzaktan ve sürekli izleyen sensör ve ekran ağıdır. UTI (Ullage-Temperature-Interface) cihazı manuel sondaj için kullanılır.",
        sections: [
          {
            heading: "Sensör Tipleri",
            paragraphs: [
              "Radar gauge: tank tepesinden mikrodalga sinyaliyle ullage'ı ölçer; ham petrol/ürün tankerlerinde standart.",
              "Float gauge: şamandıralı mekanik sistem; servisi kolay ama hassasiyeti düşük.",
              "Pressure gauge (hidrostatik): tank dibi basıncını ölçerek seviye hesaplar; ballast ve double bottom için yaygın.",
              "Independent overfill alarm (IOA): yüksek seviyede ana sistemden bağımsız alarm verir."
            ],
            table: {
              headers: ["Sensör", "Hassasiyet", "Tipik Yer"],
              rows: [
                ["Radar", "± 3 mm", "Kargo tankı"],
                ["Float", "± 10 mm", "Slop, ballast"],
                ["Pressure", "± 50 mm", "Double bottom"],
                ["IOA", "Set point alarm", "Tüm kargo tankları"]
              ]
            }
          }
        ],
        keyPoints: [
          "Independent high-level/overfill alarm gereği MARPOL'a genellenmez; tanker tipi, SOLAS/IBC/IGC hükümleri, terminal şartı ve onaylı cargo-system arrangement'tan doğrulanır.",
          "UTI cihazı interface (su/yağ sınırı) ölçümünde kullanılır.",
          "Tank atmosferi inert ise vapor lock valfinden geçilmeli."
        ],
        workingPrinciple: [
          "Radar gauge, tank tepesindeki anten 6–10 GHz mikrodalga gönderir; sıvı yüzeyinden yansıyan sinyalin gecikmesi ullage'a çevrilir.",
          "Hidrostatik sensör tank dibindeki basıncı sıvı yoğunluğuna bölerek seviye hesaplar.",
          "PT100 sıcaklık sensörü tankın 3 farklı yüksekliğinde sıcaklık ortalaması verir.",
          "Sinyaller CCR (cargo control room) ekranında grafiksel olarak gösterilir."
        ],
        operation: [
          "Yükleme/boşaltım öncesi radar gauge'ı manuel UTI ile çapraz kontrol et.",
          "High level alarm test butonu ile çalışırlığını doğrula.",
          "Ullage, sıcaklık ve trim'i CCR'da sürekli izle.",
          "Inerted tank'a UTI sokmadan önce vapor lock valfi açılmalı, statik bonding sağlanmalı."
        ],
        faults: [
          { fault: "Radar okuması atlamalı", cause: "Anten kirli, vapor space yoğun buhar", action: "Anteni temizle, kalibrasyon yap." },
          { fault: "Yüksek seviye alarmı çalışmıyor", cause: "Sensör arızalı, kablo kopuk", action: "Sensörü test et, hattı ölç, yedek devreye al." },
          { fault: "Sıcaklık okuması düşük", cause: "PT100 contact resistance", action: "Bağlantıyı sıkı, gerekirse PT100 değiştir." }
        ],
        precautions: [
          "UTI manuel ölçümde statik bonding kablosu mutlaka takılmalı.",
          "Yükleme sırasında bağımsız overfill alarm fonksiyonel olmalı.",
          "Tank ullage planı ve sıcaklık logu shift bazlı tutulmalı.",
          "Sensör kalibrasyon sertifikası periyodik olarak yenilenmelidir."
        ]
      },
      {
        title: "Hatch Cover (Ambar Kapağı) Sistemi",
        introduction: "Hatch cover, kuru yük gemilerinde ambar ağzını kapatan; yük emniyetini, su geçirmezliği ve yapısal mukavemeti sağlayan büyük çelik kapak sistemidir. Folding, side-rolling, piggyback ve pontoon tipleri yaygındır.",
        sections: [
          {
            heading: "Tipleri",
            paragraphs: [
              "Folding (katlanır) tip: hidrolik silindirlerle kapak panelleri açılarak ambar başına katlanır.",
              "Side-rolling tip: panel raylar üzerinde yana doğru kayar; kapasiteler büyük, container gemilerinde yaygın.",
              "Pontoon tip: tek parça paneller vinçle kaldırılır; küçük gemilerde tercih edilir.",
              "Piggyback: iki panel arka arkaya kayar, üstüste biner."
            ],
            table: {
              headers: ["Tip", "Kullanım", "Avantaj"],
              rows: [
                ["Folding", "Bulker", "Hızlı açılma"],
                ["Side-rolling", "Container/bulker", "Büyük açıklık"],
                ["Pontoon", "Genel kuru yük", "Basit, ucuz"],
                ["Piggyback", "Küçük gemiler", "Az alan ihtiyacı"]
              ]
            }
          }
        ],
        keyPoints: [
          "Weathertight integrity ve survey dayanağı Load Line Convention, gemi tipi/yapım tarihi, class kuralları ve onaylı hatch-cover planından doğrulanır.",
          "Hose veya ultrasonic test; IACS/flag/class kabul ettiği prosedür, kalibrasyon, nozül mesafesi ve acceptance criteria ile yapılır; yalnız ≥2 bar göstergesi geçer sonuç değildir.",
          "Ambar kapağı yük taşıma kapasitesi (kPa) yük tipine göre belirlenir."
        ],
        workingPrinciple: [
          "Hidrolik güç ünitesi (HPU), silindirleri ve kilit mekanizmalarını çalıştırır.",
          "Açma sırasında: kilitler açılır → kapak yükselir → silindir paneli yana/aşağı katlar.",
          "Sızdırmazlık coaming çevresindeki rubber gasket ile sağlanır; kapak kapanırken bastırılır.",
          "Drainage channel sızan suyu over-board veya bilge'a yönlendirir."
        ],
        operation: [
          "Açmadan önce kapağın üstündeki yük ve buz/kar temizlenmeli.",
          "HPU'yu çalıştır, basıncı set değere getir.",
          "Kilitleri sırasıyla aç, kapak hareketi sırasında kimseyi yaklaştırma.",
          "Kapatma sonrası gasket'in tam oturduğunu kontrol et, kilitleri sık.",
          "Denize çıkmadan önce hose test ile sızdırmazlığı doğrula."
        ],
        faults: [
          { fault: "Kapak tam kapanmıyor", cause: "Coaming üzerinde tortu, hidrolik basınç düşük", action: "Coaming temizle, HPU basıncı kontrol et." },
          { fault: "Sızıntı tespit edildi", cause: "Gasket aşınmış, kompresyon bar bozuk", action: "Gasket yenile, kompresyon bar düzelt." },
          { fault: "Hidrolik silindir hareket etmiyor", cause: "Hava kilidi, valf arızası, sızıntı", action: "Sistemi havadan al, valf ve seal kontrol et." }
        ],
        precautions: [
          "Açık kapak fırtınalı havada operasyon yapılmamalı.",
          "Kapak üzerinde personel çalışacaksa kilit emniyeti (chock pin) takılmalı.",
          "Periyodik gasket kontrolü ve hose/ultrasonic test kayıtları tutulmalı.",
          "Hatch cover load capacity stowage planında dikkate alınmalı."
        ]
      },
      {
        title: "Lashing & Securing (Bağlama ve Sabitleme) Donanımı",
        introduction: "Konteyner ve özel yük gemilerinde yükün denizde hareket etmesini önlemek amacıyla kullanılan twist-lock, lashing rod, turnbuckle, stacking cone ve buzzbar gibi ekipmanların bütünüdür. Cargo Securing Manual (CSM) zorunlu referanstır.",
        sections: [
          {
            heading: "Ekipmanlar",
            paragraphs: [
              "Twist-lock: container köşelerine geçen, kilitlenebilir bağlantı; semi-automatic ve fully-automatic varyantları vardır.",
              "Lashing rod: container köşesinden güverte D-ring'e uzanan çelik çubuk; turnbuckle ile gerilir.",
              "Turnbuckle: lashing rod'un gerilimini ayarlayan vidalı germe elemanı.",
              "Stacking cone: container'ları üst üste hizalayan pasif eleman.",
              "Bridge fitting: yan yana iki container'ı üst köşelerinden birbirine kilitler."
            ],
            table: {
              headers: ["Ekipman", "Yük (MSL)", "Tipik Kullanım"],
              rows: [
                ["Twist-lock", "250 kN", "Tüm kat seviyeleri"],
                ["Lashing rod (uzun)", "245 kN", "2. ve 3. kat"],
                ["Turnbuckle", "245 kN", "Rod germe"],
                ["Stacking cone", "—", "İstifleme hizalama"]
              ]
            }
          }
        ],
        keyPoints: [
          "MSL (Maximum Securing Load) = breaking load × 0.5 (genel kural).",
          "Lashing planı CSM'e göre kapasite, hava şartı ve istif yüksekliğine göre yapılır.",
          "Periyodik MPI/visual inspection ile çatlak, korozyon ve deformasyon takip edilir."
        ],
        workingPrinciple: [
          "Twist-lock üst container'ın corner casting'ine girer ve 90° döndürülerek kilitlenir.",
          "Lashing rod'un alt ucu D-ring'e takılır, üst ucu container köşesine; turnbuckle ile gerdirilir.",
          "Yükün eylemsizliği (acceleration × mass), lashing'in MSL toplamından küçük olmalı.",
          "CSM, geminin GM ve roll periyoduna göre lashing kuvveti hesabı verir."
        ],
        operation: [
          "Yükleme öncesi tüm ekipman görsel kontrolden geçirilir.",
          "Stowage planına göre twist-lock'lar konteyner altına yerleştirilir.",
          "Container indirilip locked edildikten sonra lashing rod'lar takılır.",
          "Turnbuckle hand-tight + 1/2 tur ile sıkılır, gevşeklik kontrolü deniz seyri sırasında günlük yapılır.",
          "Heavy weather raporu sonrası lashing kontrolü tekrarlanır."
        ],
        faults: [
          { fault: "Twist-lock kilitlenmiyor", cause: "Yay arızası, kir, deformasyon", action: "Yedek twist-lock ile değiştir, arızalıyı servise gönder." },
          { fault: "Turnbuckle gevşiyor", cause: "Self-loosening, vibrasyon", action: "Locknut/wire ile emniyete al, periyodik sıkma." },
          { fault: "Lashing rod eğilmiş", cause: "Aşırı yük, çarpma", action: "Hemen değiştir, MPI testi." }
        ],
        precautions: [
          "Lashing operasyonu sırasında baret, eldiven ve emniyet ayakkabısı zorunlu.",
          "Yüksek seviyelere lashing eldiveni ile mast climber/cherry picker kullanılmalı.",
          "Aşırı sıkmaktan kaçın; turnbuckle thread bozulur.",
          "Heavy weather durumunda güverteye lashing kontrolü için çıkış yasaklanabilir."
        ]
      },
      {
        title: "Reefer Container Plug ve Soğutma Devresi",
        introduction: "Reefer (refrigerated) container'lar, gemi şebekesinden 380–460 V / 60 Hz beslenen, kendi kompresörlü soğutma ünitesi olan kapalı container'lardır. Sıcaklık aralığı genellikle -30 °C ile +30 °C arasıdır.",
        sections: [
          {
            heading: "Sistem Bileşenleri",
            paragraphs: [
              "Reefer plug socket: 32 A / 4 pin / 440 V CEE-form; her container'ın güç bağlantısı için.",
              "Reefer monitoring system (RMS): set sıcaklık, return-air, supply-air ve alarm durumlarını izler.",
              "Power management system (PMS): toplam reefer yükünü jeneratör kapasitesine göre dengeler.",
              "Container içi ünitede kompresör, kondenser, evaporatör ve fan bulunur."
            ]
          }
        ],
        keyPoints: [
          "Şebeke: 60 Hz reefer için karada/gemide 60 Hz besleme zorunludur (50 Hz ünite verimini düşürür).",
          "RMS uyarıları en az 4 saatte bir kontrol edilmeli ve loglanmalıdır.",
          "Reefer manifest'i: container no, set sıcaklık, vent açıklığı, ürün tipi içerir."
        ],
        workingPrinciple: [
          "Plug bağlantısı yapıldığında container içi PLC sıcaklığı set değere getirmek için kompresörü çalıştırır.",
          "Soğutucu gaz (R-134a, R-404A vb.) kompresörde sıkıştırılır → kondenserde dış havayla yoğuşur → expansion valve'de basınç düşer → evaporatörde container içi havayı soğutur.",
          "Defrost cycle (otomatik) periyodik olarak evaporatördeki buzu eritir.",
          "RMS, alarmları gemi şebekesine ethernet/PLC üzerinden iletir."
        ],
        operation: [
          "Container'ı plug'a takmadan önce socket voltajını ölçerek kontrol et.",
          "Set sıcaklık, vent ve hava değişim oranını manifest'e göre ayarla.",
          "Pre-trip inspection (PTI) raporunu doğrula.",
          "Günlük RMS kontrolü yap; alarm varsa yedek socket'e bağla.",
          "Boşaltımdan önce sıcaklık logu çıktısını al."
        ],
        faults: [
          { fault: "Container'a güç gitmiyor", cause: "Soketin sigortası attı, kablo arızalı", action: "Sigortayı reset et, kabloyu test et." },
          { fault: "Yüksek return air alarm", cause: "Kondenser tıkalı, kompresör arızalı", action: "Kondenseri temizle, gaz şarjını kontrol et." },
          { fault: "Defrost çalışmıyor", cause: "Heater arızalı, defrost kontrolü bozuk", action: "Heater test, kontrol kartı kontrol." },
          { fault: "PMS reefer yükü trip", cause: "Toplam yük jeneratör kapasitesini aştı", action: "Reefer'leri kademeli devreye al, PMS limit ayarı." }
        ],
        precautions: [
          "Plug ve cable bağlantısı yapılırken eldiven ve yalıtkan ayakkabı kullanılmalı.",
          "IMDG sınıfı tehlikeli yük varsa reefer'lar segregation kurallarına göre dağıtılmalı.",
          "Yangın riski: reefer plug yangınları sıkça görülür; sigorta panosu ısı izlenmeli.",
          "RMS kayıtları konişmento (BL) için kanıt niteliğindedir, korunmalıdır."
        ]
      },
      {
        title: "Ramp ve Cargo Door (Ro-Ro)",
        introduction: "Ro-Ro gemilerinde araç/yük yüklemesi için kullanılan stern ramp, side ramp, bow visor ve interior ramp sistemleri; hidrolik tahrikli, weathertight kapanan büyük çelik konstrüksiyonlardır. Estonia kazasından sonra bow visor güvenliği SOLAS ile sıkılaştırılmıştır.",
        sections: [
          {
            heading: "Tipler ve İşlevler",
            paragraphs: [
              "Stern ramp: kıç tarafta açılan, en yaygın yükleme rampası; quarter ramp varyantı belirli açıyla yana açılır.",
              "Side ramp: gemi yan tarafından açılır, terminal yapısına bağlı kullanılır.",
              "Bow visor + ramp: baş tarafta açılan kapaklar; visor weathertight koruma, ramp yükleme sağlar.",
              "Internal ramp: güverteler arası araç hareketi için sabit veya hareketli rampalar."
            ],
            table: {
              headers: ["Tip", "Yer", "Tipik Yük"],
              rows: [
                ["Stern ramp", "Kıç", "Tır, otomobil, MAFI"],
                ["Quarter ramp", "Kıç-yan", "Heavy lift, trailer"],
                ["Side ramp", "Yan", "Otomobil"],
                ["Internal ramp", "Decks arası", "Geçiş"]
              ]
            }
          }
        ],
        keyPoints: [
          "SOLAS Reg. II-1/17: weathertight closure ve closure indicator zorunlu.",
          "Ramp eğimi tipik 1:6 – 1:8; aşırı eğim araç emniyetini bozar.",
          "Closure indicator köprüüstünde sürekli izlenir."
        ],
        workingPrinciple: [
          "HPU hidrolik silindirleri besler; ramp menteşelerinden açılır.",
          "Locking pinler kapalı pozisyonda otomatik veya manuel kilitlenir.",
          "Weathertight gasket coaming üzerinde sızdırmazlığı sağlar.",
          "Inclination ve closure switch sinyali bridge alarm sistemine gider."
        ],
        operation: [
          "Açmadan önce trim/list kontrol et, ramp ucu rıhtıma denk gelmeli.",
          "Kilitleri açıp HPU'yu devreye al; ramp'ı yavaş indir.",
          "Yükleme sonrası ramp'ı kaldır, kilitle ve sızdırmazlığı kontrol et.",
          "Closure indicator'ın 'closed' sinyali bridge'te görünmeli.",
          "Denizde fırtınada ramp ekstra securing pin/wire ile emniyete alınır."
        ],
        faults: [
          { fault: "Ramp inmiyor", cause: "HPU basıncı yok, kilit takılı, kontrol valfi arızalı", action: "HPU ve kilitleri kontrol et, valfi devre dışı bırakıp manuel hareket dene." },
          { fault: "Closure indicator alarmı", cause: "Switch arızalı, kapak tam oturmamış", action: "Switch test, kapak yeniden kapatma." },
          { fault: "Sızıntı (su girişi)", cause: "Gasket aşınmış, locking gevşek", action: "Gasket yenile, kilit sık." }
        ],
        precautions: [
          "Ramp altında personel/araç bulunduğunda hareket yasaktır.",
          "Bow ramp/visor weathertight integrity'si denize çıkış öncesi mutlaka doğrulanır.",
          "Trim ve list ramp eğiminden ±2° aşmamalı.",
          "Yıllık class survey kapsamında ramp yapısal muayenesi yapılmalıdır."
        ]
      },
      {
        title: "Cargo Gear (Vinç ve Derikler)",
        introduction: "Genel kuru yük ve heavy lift gemilerinde yük elleçleme için kullanılan ship's cargo gear; deck crane, derrick (Stülcken, swinging), heavy lift derrick ve gantry crane gibi türlerdir. SWL (Safe Working Load) ve register testleri zorunludur.",
        sections: [
          {
            heading: "Tipler",
            paragraphs: [
              "Deck crane: 360° döner, hidrolik tahrikli; bulker ve general cargo gemilerinde 25–60 t SWL.",
              "Derrick: tek veya çift halatlı sistem; basit, hafif yükler için.",
              "Stülcken derrick: iki direk arasında ağır yükleri (200+ t) elleçleyebilir.",
              "Gantry crane: konteyner gemilerinde rays üzerinde hareket eder."
            ]
          }
        ],
        keyPoints: [
          "ILO 152 ve Register of Cargo Gear yıllık tutulmalı, sertifikalar geçerli olmalı.",
          "Thorough examination ve proof-load aralığı/yükü Cargo Gear Book, bayrak uygulaması, SOLAS II-1/3-13, MSC.1/Circ.1663 ve ilgili ILO 152 düzeninden doğrulanır; 1.25 × SWL her kapasite/donanım için evrensel değildir.",
          "SWL plate vinç üzerinde okunaklı olmalı."
        ],
        workingPrinciple: [
          "Hidrolik motor → ana tambur (hoist) → wire rope → blok → kanca akışı.",
          "Slewing (dönüş) hidrolik veya elektrik motor + dişli üzerinden sağlanır.",
          "Luffing silindiri bom açısını değiştirir (SWL bom açısına göre değişir).",
          "Limit switch'ler aşırı yük, aşırı yükselme ve son nokta korumasını sağlar."
        ],
        operation: [
          "Vinci çalıştırmadan önce yağ seviyesi, tel halat ve kanca emniyetini kontrol et.",
          "Yük ağırlığını SWL × açı tablosundan doğrula.",
          "Slewing sırasında ani durdurmadan kaçın; yük salınımı engellenir.",
          "Tag line (rehber halat) ile yük dönüşü kontrol edilir.",
          "Operasyon bitince bom kavrama bracket'ine yerleştirilir."
        ],
        faults: [
          { fault: "Hoist çalışmıyor", cause: "Hidrolik basınç düşük, valf bobin arızası", action: "Pompa basıncını kontrol et, bobini değiştir." },
          { fault: "Slewing salınımlı", cause: "Bearing aşınmış, yağ kontamine", action: "Slewing bearing yağı kontrol, gerektiğinde değişim." },
          { fault: "Tel halat çatlağı", cause: "Aşınma, korozyon, yorulma", action: "Halatı segment olarak inceleme, kriter aşıldıysa değiştir." },
          { fault: "Limit switch trip", cause: "Yanlış kalibrasyon, mekanik takıntı", action: "Limit switch ayarı, mekanik mafsal kontrol." }
        ],
        precautions: [
          "Yük altında veya salınım yörüngesinde personel bulunamaz.",
          "Wind, list/trim ve sea-state stop limitlerini onaylı load chart/operating manual'den uygula; sabit 15 m/s ve 5° bütün crane/configuration'lar için güvenli sınır değildir.",
          "Wire rope'u maker/ISO discard criteria ile görsel ve ölçümsel olarak değerlendir; klasik MPI/UT'yi halata rutin ezber olarak yazma, yağlamayı rope-construction ve PMS'e göre yap.",
          "Sertifikalı operatör + sinyalist ile çalışılmalı; el işaretleri standardize edilmiş olmalı."
        ]
      },
      {
        title: "Tank Temizleme ve Slop / Eductor Sistemi",
        introduction: "Tank cleaning, kargo değişimleri sırasında veya yard girişi öncesi tank içi yıkama, gas freeing ve atık yönetimi operasyonudur. Tankerlerde slop tankı ve eductor sistemi atık yönetiminin merkezindedir.",
        sections: [
          {
            heading: "Sistem Bileşenleri",
            paragraphs: [
              "Tank washing makineleri (portable Butterworth veya fixed) sıcak/soğuk su veya kimyasal çözeltiyle yıkama yapar.",
              "Slop tankı, yıkama suyunu ve yağlı atığı bir süre tutarak ayrışmasını sağlar (decanting).",
              "Eductor (jet pump): yıkama suyunu vakum ile çekip slop'a aktarır; mekanik parça yoktur.",
              "Heated washing line, viskoz ürünler için 60–80 °C su sağlar."
            ]
          }
        ],
        keyPoints: [
          "MARPOL Annex I Reg. 34: load on top (LOT) prosedürü ile slop dekantasyonu yapılır.",
          "Yıkama suyu doğrudan denize basılamaz; ODME (Oil Discharge Monitoring) zorunludur.",
          "Yıkama sıcaklığı, kimyasalı ve debisi kargo compatibility, coating limitleri, flash-point/static precautions ve onaylı tank-cleaning guide'a göre seçilir; sabit 60 °C eşiği her kargoya uygulanmaz."
        ],
        workingPrinciple: [
          "Yıkama makinesi yüksek basınçlı suyu tank duvarlarına püskürtür.",
          "Yıkama suyu tank dibinde toplanır; eductor venturi etkisi ile bu suyu emer ve slop'a basar.",
          "Slop ayrışma süresi sıcaklık, emülsiyon ve interface ölçümüne göre belirlenir; sabit 24 saat beklemek deşarj kalitesini tek başına kanıtlamaz.",
          "Üstteki yağ tabakası bir sonraki yüke karıştırılır (LOT), alttaki su ODME ile kontrollü deşarj edilir."
        ],
        operation: [
          "Yıkama programını cargo planına göre hazırla (sıcak/soğuk, kimyasal vs.).",
          "İnertlenen tankta tank atmosferini ≤%8 O₂ ve pozitif basınçta tut; supply gas için ≤%5 O₂ limitini ayrıca izle.",
          "Yıkama makinesini approved cycle/program, shadow diagram ve coating/cargo kısıtlarına göre çalıştır; keyfî 90° pozisyon kullanma.",
          "Slop interface ve sample'ı doğrula; yalnız MARPOL Annex I Reg. 34, ODME operational manual ve discharge criteria eksiksiz sağlanıyorsa kontrollü deşarja başla.",
          "Tank gas free yapılmadan girişe izin verme; permit-to-enter düzenle."
        ],
        faults: [
          { fault: "Eductor vakum vermiyor", cause: "Driving water basıncı düşük, nozül tıkalı", action: "Pompa basıncı, nozül söküm temizlik." },
          { fault: "Yıkama makinesi dönmüyor", cause: "Türbin yatak arızası, tortu", action: "Sökerek bakım, yatak değişimi." },
          { fault: "ODME yüksek ppm okuyor", cause: "Filtre tıkalı, sensor kalibrasyon", action: "Filtre temizliği, sensör kalibrasyon ve test." }
        ],
        precautions: [
          "Tank içi giriş Enclosed Space Entry permit ile, gas test sonuçları olumlu olmalı.",
          "Settling time, portable conductive/non-conductive ekipman ve water-mist/static precaution sürelerini ISGOTT, cargo SDS ve onaylı tank-cleaning procedure'den doğrula; sabit 30 dakika bütün operasyonlara yeterli değildir.",
          "ODME logu Oil Record Book'a işlenir; PSC kontrolünde sorulur.",
          "Sıcak yıkamada personel yanık önlemi (PPE) almalı."
        ]
      }
    ]
  },
  "environmental-auxiliary": {
    title: "Çevre ve Yardımcı Sistemler",
    description: "BWMS, OWS, sewage treatment, insinerator, HVAC, hidrofor, soğuk depo, sıkıştırılmış hava ve buhar sistemleri",
    topics: [
      {
        title: "Balast Suyu Yönetim Sistemi (BWMS)",
        introduction: "BWMS (Ballast Water Management System), gemilerin aldığı balast suyundaki istilacı türleri (planktonik organizmalar, bakteri, virüs) IMO BWM Convention D-2 standardına göre arındıran sistemdir. Genellikle filtre + UV veya filtre + elektroklorinasyon prensibiyle çalışır.",
        sections: [
          {
            heading: "Sistem Tipleri",
            paragraphs: [
              "Filtre + UV (ultraviyole) sistemleri: 40 µm disk/screen filtre büyük organizmaları tutar; UV reaktör DNA hasarı vererek üreme yeteneğini ortadan kaldırır. Tatlı/tuzlu su ayrımı gerektirmez.",
              "Filtre + Elektroklorinasyon (EC) sistemleri: deniz suyundan elektrolizle aktif klor üretir; tankta klor ile dezenfeksiyon olur. Deballast'ta nötralizasyon (sodyum tiyosülfat) gerekir.",
              "Kimyasal dozajlı sistemler: peraset asit veya klordioksit dozajıyla çalışır; rezerv kimyasal stoklanır."
            ],
            table: {
              headers: ["Sistem", "Avantaj", "Dezavantaj"],
              rows: [
                ["Filtre + UV", "Kimyasal yok, basit", "Bulanık suda verim düşer"],
                ["Filtre + EC", "Tüm su tiplerinde", "Nötralizasyon, korozyon riski"],
                ["Kimyasal dozaj", "Sürekli etkin", "Kimyasal lojistik"]
              ]
            }
          }
        ],
        keyPoints: [
          "D-2 standardı: <10 canlı organizma/m³ (≥50 µm) ve <10 canlı organizma/mL (10–50 µm) sınırı.",
          "BWRB (Ballast Water Record Book) her balast/deballast operasyonunda doldurulur.",
          "USCG onayı IMO onayından farklıdır; ABD sularına girecek gemide USCG type-approved sistem gerekir."
        ],
        workingPrinciple: [
          "Ballast in: deniz suyu pompası → filtre (40 µm) → UV reaktör veya EC ünitesi → balast tankı.",
          "Ballast out: tank → bypass filtre → UV (gerekirse tekrar) → nötralizasyon (EC için) → overboard.",
          "UV reaktörde lambalar yüksek yoğunluklu UV-C üretir; sensör şiddet ve transmittansı izler.",
          "EC ünitesinde elektrotlar deniz suyunu elektrolize eder; üretilen TRO (Total Residual Oxidant) 2–10 mg/L tutulur."
        ],
        operation: [
          "Operasyon öncesi BWMS'i hazırla, lamba ısınma süresini bekle (UV sistemleri).",
          "Pompa başlat, akış BWMS rated capacity altında tutulmalı.",
          "TRO/UV intensity sensörlerini izle; alarm halinde bypass moduna alınmaz, operasyon durdurulur.",
          "Deballast sonunda nötralizasyon ünitesini çalıştır (EC sistemlerde) ve overboard TRO < 0.1 mg/L doğrula.",
          "BWRB'a tarih, koordinat, hacim, yapılan işlem ve sistem durumunu yaz."
        ],
        faults: [
          { fault: "UV intensity düşük alarmı", cause: "Lamba ömrü dolmuş, kuvars kılıf kirli", action: "Lambaları değiştir, kuvars kılıfları temizle (asit yıkama)." },
          { fault: "Filtre yüksek diferansiyel basınç", cause: "Sediment/biota tıkamış", action: "Otomatik backflush devrede mi kontrol et, manuel temizlik yap." },
          { fault: "EC ünitesi TRO üretmiyor", cause: "Düşük tuzluluk, elektrot kireçlenmiş", action: "Tuzluluk ölç, asit yıkama yap, elektrot kontrol." },
          { fault: "Sistem bypass moduna geçti", cause: "Kritik sensor arızası", action: "Operasyonu durdur, PSC bildirim ve servis çağır." }
        ],
        precautions: [
          "UV lambalarına çıplak gözle bakma (göz hasarı); bakım sırasında lamba enerjisi kesilmiş olmalı.",
          "EC ünitesinde hidrojen birikimi olabilir; havalandırma her zaman çalışır olmalı (patlama riski).",
          "Kimyasal nötralizasyon ürünleri (sodyum tiyosülfat) MSDS'e göre depolanmalı.",
          "Sistem arızasında 'Contingency Measure' (port state'e bildirim, alternatif liman) prosedürü uygulanır."
        ]
      },
      {
        title: "Sintine Separatörü (OWS / 15 ppm Bilge Separator)",
        introduction: "OWS (Oily Water Separator), makine dairesi sintinesindeki yağlı suyun MARPOL Annex I gereği denize basılmadan önce yağ içeriğinin 15 ppm altına düşürülmesini sağlayan sistemdir. Yer çekimi ayırma + koalesan filtre + bazen membran teknolojisi ile çalışır ve 15 ppm alarm/stop ünitesine bağlıdır.",
        sections: [
          {
            heading: "Sistem Bileşenleri",
            paragraphs: [
              "1. kademe (gravity separator): yoğunluk farkıyla serbest yağ ve büyük damlacıklar üstte ayrışır.",
              "2. kademe (coalescer / filter): emülsifiye damlacıklar koalesan ortamda birleştirilip ayrılır.",
              "15 ppm bilge alarm (OCM — Oil Content Monitor): IMO MEPC.107(49) onaylı; ≥15 ppm olduğunda 3-yollu valfi tank tarafına yönlendirir.",
              "Sludge ve yağ toplama tankı (slop/sludge tank) ve overboard hattı."
            ],
            table: {
              headers: ["Kademe", "Amaç", "Tipik Verim"],
              rows: [
                ["Gravity stage", "Serbest yağ ayrımı", ">100 ppm → 50–100 ppm"],
                ["Coalescer", "Emülsiyon kırma", "<15 ppm"],
                ["Polishing filter", "Son kademe", "<5 ppm"]
              ]
            }
          }
        ],
        keyPoints: [
          "Machinery-space bilge deşarjı için MARPOL Annex I Reg. 15'te genel bir 12 NM şartı yoktur: uygulanabilir gemide seyir halinde olma, onaylı 15 ppm ekipmanı/alarm-otomatik durdurma düzeni, seyreltilmemiş effluent ve ≤15 ppm şartları birlikte sağlanır.",
          "Special area, Antarctic area, gemi tipi/GT, kıyı devleti ve IOPP Supplement düzeni ayrıca doğrulanır; overboard valfin açılabilir olması deşarjın hukuken uygun olduğunu kanıtlamaz.",
          "ORB (Oil Record Book) Bölüm I'de her separatör operasyonu kayıt altına alınır.",
          "Magic pipe (bypass) kullanımı ağır cezai yaptırım gerektirir."
        ],
        workingPrinciple: [
          "Sintine pompası yağlı suyu separatöre besler; ilk hücrede serbest yağ üst kısma çıkar ve toplama tankına alınır.",
          "Su, koalesan filtre elemanından geçer; mikron damlacıklar birleşip yüzeye çıkar.",
          "Çıkış suyu OCM'den geçer; numune sürekli ölçülür ve veri loglanır.",
          "≥15 ppm okumada 3-yollu solenoid valf otomatik olarak çıkışı bilge tankına geri çevirir, alarm verir."
        ],
        operation: [
          "Çalıştırmadan önce sealing water hattını aç (bazı modellerde gerekli).",
          "Pompa başlat, ilk birkaç dakika resirkülasyon modunda OCM'yi prime et.",
          "Deşarj koşulları checklist ile doğrulandıktan ve sorumlu zabit izin verdikten sonra maker sekansıyla overboard yönünü seç; OCM değeri, sample flow ve automatic stopping device işlevini izle.",
          "ORB Code'a uygun operasyon kodu, start/stop zamanı, pozisyon, miktar ve yöntemi sorumlu zabitçe gecikmeden kaydet; Master kontrol/imza düzenini uygula.",
          "Bitirince hatları temiz su ile flush et, OCM sensörünü temiz tut."
        ],
        faults: [
          { fault: "Sürekli 15 ppm alarmı", cause: "OCM sensörü kirli, koalesan element doymuş", action: "OCM cell temizliği, koalesan element değişimi." },
          { fault: "Pompa basınç vermiyor", cause: "Sintine kuyusu boş, hava emiyor", action: "Suction kontrol, hava al, valfleri kontrol." },
          { fault: "Yağ toplama tankı dolu alarmı", cause: "Slop tank dolmuş", action: "Sludge tankına transfer et, ORB'a yaz." },
          { fault: "OCM kalibrasyon hatası", cause: "Lamba/optik bozuk, sıfır kalibrasyon kayıp", action: "Üretici prosedürüne göre temiz su ile zero, span kalibrasyonu." }
        ],
        precautions: [
          "OCM mührü (seal) PSC inspeksiyonunda kontrol edilir; mühür kırılmış olmamalı.",
          "Bypass hattı veya sahte OCM bağlantısı kesinlikle yapılmaz; ağır ceza ve hapis cezası vardır.",
          "Numune hattı sürekli akışlı olmalı; tıkanma alarm üretmez ama hatalı düşük okuma yapar.",
          "Slop tankı transferi shore reception facility'ye verilirken receipt ORB'ye yapıştırılır."
        ]
      },
      {
        title: "Sewage Treatment Plant (STP)",
        introduction: "Sewage Treatment Plant, gemideki tuvalet (black water) ve bazen mutfak/lavabo (grey water) atık sularını MARPOL Annex IV ve IMO MEPC.227(64) standardına göre arındıran sistemdir. Biyolojik (aerobik aktif çamur), elektroliz veya MBR (membran bioreaktör) tipinde olabilir.",
        sections: [
          {
            heading: "Sistem Tipleri",
            paragraphs: [
              "Biyolojik (extended aeration): 3 hücreli — aerobik (mikroorganizma sindirimi) → settling (çökelti) → klorinasyon → discharge. Geleneksel ve yaygın tip.",
              "Elektrolitik: deniz suyu elektrolizle hipoklorit üretir; doğrudan kimyasal dezenfeksiyon yapar.",
              "MBR (Membrane Bioreactor): biyolojik proses + ultrafiltrasyon membran; çıkış suyu çok yüksek kalitede olur."
            ],
            table: {
              headers: ["Parametre", "MEPC.227(64) type-approval test kriteri", "Örnek MBR trendi; garanti değil"],
              rows: [
                ["Fekal koliform", "<100 CFU/100mL", "<10"],
                ["TSS (askıda katı)", "<35 mg/L", "<10"],
                ["BOD5", "<25 mg/L", "<10"],
                ["pH", "6–8.5", "7–8"]
              ]
            }
          }
        ],
        keyPoints: [
          "Untreated sewage ancak en yakın karadan 12 NM'den uzakta, gemi en route iken ve İdarenin onayladığı moderate-rate düzenine göre boşaltılabilir; MEPC.157(55) hesabında hızın 4 knot'tan az olmaması esas alınır.",
          "Approved comminuting/disinfecting sisteminden geçen sewage için 3 NM şartı ayrı bir yoldur. Operasyonel ve type-approved STP effluent'i bu mesafe ezberinden farklıdır; Annex IV, ISPP Supplement ve yerel kural birlikte kontrol edilir.",
          "Baltık Sea special-area hükümleri özellikle yolcu gemilerinin sewage deşarjına, uygulama tarihleri ve onaylı nutrient-removal STP/reception seçenekleriyle uygulanır; bütün gemiler için tek cümlelik mutlak yasak değildir.",
          "ISPP sertifikasının geçerliliği ve endorsment/survey durumu sertifikanın üzerinde doğrulanır; normal azami süre beş yıldır."
        ],
        workingPrinciple: [
          "Aerobik tankta blower hava verir; aktif çamur içindeki bakteriler organik maddeyi CO₂ ve H₂O'ya çevirir.",
          "Settling tankında çamur çöker; dipte biriken çamur aerobik tanka geri sirküle edilir.",
          "Üst sıvı kontak tankında klor (kalsiyum hipoklorit tableti veya elektrolitik) ile dezenfekte edilir.",
          "Discharge pompası işlenmiş su tankından deniz tarafına basar; level switch otomatik kontrol sağlar."
        ],
        operation: [
          "Aerobik tank seviyesini kontrol et (genelde 50–70%).",
          "Biyolojik proseste blower duty/standby ve çalışma çevrimini maker manual'e göre sürdür; uzun hava kaybında biomass sağlığını analiz et ve kontrollü recovery uygula.",
          "Dezenfeksiyon tipine göre dozaj/elektroliz, residual ve sarf durumunu maker manual ile discharge standardına göre kontrol et.",
          "Discharge pompasını ancak Annex IV, special-area/port kuralı ve geminin Sewage Management Plan koşulları doğrulandıktan sonra devreye al.",
          "Haftalık olarak çamur seviyesini ölç; gerekirse fazla çamuru sludge tankına al."
        ],
        faults: [
          { fault: "Ağır koku, tank köpürüyor", cause: "Blower yetersiz, aşırı yükleme, deterjan fazla", action: "Hava debisini artır, mutfak greywater'ı bypass et, mikroorganizma kültürü ekle." },
          { fault: "Çıkış bulanık, koliform yüksek", cause: "Klor bitmiş, settling bozuk", action: "Klor tabletini doldur, settling'i temizle, sistemi yeniden seed et." },
          { fault: "Discharge pompa çalışmıyor", cause: "Level switch arızalı, impeller tıkalı (peçete vb.)", action: "Switch test, pompa söküm temizlik." },
          { fault: "Blower aşırı sıcak", cause: "Hava filtresi tıkalı, kayış gevşek", action: "Filtre değiştir, kayış gerginlik kontrolü." }
        ],
        precautions: [
          "STP girişine wet wipe, peçete, bez atılmamalı; pompa ve nozülleri tıkar.",
          "Klor/dezenfektan ile çalışırken SDS'de belirtilen kimyasal PPE, havalandırma ve acil müdahale düzenini kullan; uygunsuz asit karışımı zehirli gaz çıkarabilir.",
          "Sistem 24+ saat durduğunda bakteri kültürü ölebilir; tekrar devreye almada seed gerekebilir.",
          "Holding tank kapasitesi POB, üretim debisi, rota/liman kısıtları ve reception planına göre hesaplanır; high-level alarm ile kalan bekletme süresi watch handover'da izlenir."
        ]
      },
      {
        title: "İnsinerator (Atık Yakma Fırını)",
        introduction: "Insinerator, gemide üretilen sludge (atık yağ), oily rags, plastik dışı katı atık ve sewage çamurunu IMO MEPC.244(66) standardına göre yakarak hacmini ve çevresel etkisini azaltan ekipmandır. 850–1200 °C aralığında çalışır ve baca gazı emisyonları regule edilir.",
        sections: [
          {
            heading: "Yapı ve Bileşenler",
            paragraphs: [
              "Yanma odası refrakter tuğla ile kaplı, sludge tank, dosing pompası, brulor (burner) ve hava fanı içerir.",
              "Sludge ön ısıtması/viskozitesi burner ve dosing-pump manual'indeki atomization bandına göre ayarlanır; sabit 90 °C her sludge bileşimi için güvenli değildir.",
              "Katı atık (kağıt, gıda) charge door'dan yüklenir; ön ısıtma sonrası alev yakar.",
              "Baca: cyclone/scrubber + sıcaklık sensörü + emisyon kontrolü."
            ],
            table: {
              headers: ["Akış / kontrol", "Karar kaynağı", "İzlenen kanıt"],
              rows: [
                ["Onboard-generated oil/sewage sludge", "MARPOL VI/16 + type-approval + maker feed spec", "Feed rate, chamber/outlet temperature, alarm log"],
                ["Katı garbage", "Garbage Management Plan ve prohibited-material ayrımı", "Batch mass/volume, position ve GRB kaydı"],
                ["PVC/halojenli içerik", "Yalnız uygun IMO type-approved incinerator ve yerel izin", "Waste segregation ve equipment approval"]
              ]
            }
          }
        ],
        keyPoints: [
          "MARPOL Annex VI/16 prohibited materials listesini Garbage Management Plan'dan uygula: PCB, ağır metal izinden fazlasını içeren garbage ve ilgili cargo residues/contaminated packing gibi maddeleri yakma; PVC yalnız buna uygun IMO type-approved incinerator'da ve yerel izinle işlenebilir.",
          "Incineration yasağı atık türü ve operasyon yerine göre MARPOL Annex VI Reg. 16 ile liman/terminal/yerel kurallardan kontrol edilir; bütün special area'larda her türlü incinerator çalışması mutlak yasaktır denemez.",
          "Garbage Record Book (Part I) yakılan atık türü ve miktarı kayıt altına alınır.",
          "Low/high-temperature feed cut-out ve shutdown setleri incinerator type-approval ile maker BMS sequence'inden doğrulanır; her model için sabit 850 °C trip varsayılmaz."
        ],
        workingPrinciple: [
          "Burner, chamber'i type-approved feed-enable sıcaklığına getirir; control system izin vermeden sludge/garbage beslenmez.",
          "Sludge dosing pompası ısıtılmış sludge'ı atomize ederek yanma odasına püskürtür.",
          "Hava fanı yanma için yeterli oksijen sağlar; oran kontrol edilir.",
          "Baca gazı sıcaklık sensörüyle izlenir; düşerse oto-shutdown."
        ],
        operation: [
          "Sludge tankı seviyesini, yakıt tankını ve hava fanını kontrol et.",
          "Burner ile maker start sequence'ini tamamla; sludge/solid feed'i yalnız type-approval ve interlock'un izin verdiği chamber sıcaklığında başlat.",
          "Chamber/combustion-gas sıcaklığını type-approved çalışma bandında tut; aşırı dosing ve görünür dumanı normal kabul etme.",
          "Çalışma sonunda dosingi kes, brulor ile odayı temiz yakıtla soğut (purge).",
          "Garbage Record Book'a tür, hacim, başlangıç-bitiş saati yaz."
        ],
        faults: [
          { fault: "Brulor ateşlemiyor", cause: "Yakıt yok, ignition elektrot kirli, fotosel arızalı", action: "Yakıt valfini aç, elektrotları temizle, fotoseli kontrol et." },
          { fault: "Siyah duman çıkıyor", cause: "Hava yetersiz, atomizer tıkalı, sludge çok viskoz", action: "Hava fanı debisi artır, atomizer söküm temizlik, sludge ön ısıtma kontrol." },
          { fault: "Oda sıcaklığı düşük alarmı", cause: "Refrakter hasarı, fazla sludge dosingi, yakıt düşük kalori", action: "Refrakter inspeksiyon, dosing kıs, yakıtı pis sludge ile karıştırma." },
          { fault: "Charge door kilit alarm", cause: "Limit switch arızalı, contası eskimiş", action: "Switch ve conta değişimi, kilit test." }
        ],
        precautions: [
          "Çalışırken charge door kesinlikle açılmaz; alev geri tepme (flashback) riski.",
          "Plastik veya PVC içeren atık dioxin/furan üretir, sağlığa ve çevreye zararlıdır.",
          "Refrakteri termal şoktan korumak için maker'ın controlled cool-down/purge süresini tamamla; sabit 4 saat bütün modeller için geçerli değildir.",
          "Stack çıkışı çevresinde personel olmamalı; soğuk havada görünmeyen sıcak gaz tehlikesi."
        ]
      },
      {
        title: "HVAC ve Klima Sistemi",
        introduction: "HVAC (Heating, Ventilation, Air Conditioning), gemideki yaşam mahalleri, köprü, control room ve yük mahallerinde sıcaklık, nem ve hava kalitesini kontrol eden sistemdir. Genellikle merkezi chiller + AHU (Air Handling Unit) + kanal sistemi şeklinde tasarlanır.",
        sections: [
          {
            heading: "Sistem Mimarisi",
            paragraphs: [
              "Chiller: R134a/R407C/R513A soğutucu akışkanla soğuk su (chilled water 7 °C) üretir.",
              "AHU: chilled water coil + ısıtıcı (steam veya elektrik) + nemlendirici + filtre + fan içerir.",
              "Kanal sistemi: supply ve return; her mahalde grille/diffuser ve damper.",
              "Reefer kompartmanı (provision room) ayrı ekspansiyon devresi ile -20 °C ila +5 °C arası tutulur."
            ],
            table: {
              headers: ["Mahal", "Sıcaklık", "Bağıl Nem"],
              rows: [
                ["Yaşam mahalleri", "22 ± 2 °C", "%50 ± 10"],
                ["Köprü", "22 °C", "%50"],
                ["MCC / Switchboard", "<35 °C", "<%60"],
                ["Provision room (et)", "-18 °C", "—"],
                ["Provision (sebze)", "+4 °C", "%85"]
              ]
            }
          }
        ],
        keyPoints: [
          "F-gas regülasyonu: ozon delici (R22) yasaklı, GWP'si yüksek gazlar (R404A) kademeli azaltılıyor.",
          "Yangın damperleri (fire damper) kanallarda otomatik kapanmalı (fusible link 70 °C).",
          "Re-circulation oranı %30 dış hava + %70 dönüş tipik; CO₂ sensörüyle ayarlanır.",
          "Lejyonella riski için nemlendirici suyu düzenli temizlenmeli."
        ],
        workingPrinciple: [
          "Chiller kompresörü gaz sıkıştırır → kondenser deniz suyuyla soğutulur (sıvı) → ekspansiyon valfi → evaporator (chilled water soğutur).",
          "Chilled water pompa ile AHU coil'lerine basılır; coil hava akışını soğutur ve nemini düşürür.",
          "AHU fanı şartlandırılmış havayı kanallara basar, mahallerde diffuser dağıtır.",
          "Termostat oda sıcaklığını okur; chilled water valve veya damperı modüle eder."
        ],
        operation: [
          "Sezon başında chiller'ı start et; oil heater'ı 24 saat önce devreye al (kompresor koruması).",
          "Deniz suyu hattı pump filter temizliği yap.",
          "Chilled water pompa ve expansion tank seviyesini kontrol et.",
          "Filtreleri 1–3 ayda bir temizle/değiştir; tıkanan filtre fan motorunu yorar.",
          "Yıllık leak test, oil analizi ve refrakometre ile glikol kontrolü."
        ],
        faults: [
          { fault: "Mahal soğutmuyor", cause: "Filtre tıkalı, gaz kaçağı, valf kapalı", action: "Filtre, gaz şarj kontrol, valf testi." },
          { fault: "Chiller HP (yüksek basınç) trip", cause: "Deniz suyu akışı düşük, kondenser kireçli", action: "SW pompa, strainer kontrol; kondenser asit yıkama." },
          { fault: "Chiller LP (düşük basınç) trip", cause: "Gaz kaçağı, expansion valf arızalı, evap kirli", action: "Sızdırmazlık testi, valf bakım, evap temizlik." },
          { fault: "Kanaldan damlama", cause: "Kondensat tahliye tıkalı, izolasyon bozuk", action: "Drain pan temizliği, izolasyon onarımı." }
        ],
        precautions: [
          "Soğutucu gaz sızıntısında ortam ventile edilmeli; yüksek konsantrasyon boğulma yapar.",
          "Chiller machinery space gaz dedektörüyle korunmalı (R134a için).",
          "Bakım sırasında sistem boşaltma için 'recovery unit' kullan; gaz atmosfere salınmaz.",
          "Provision room'a giren personel için içeriden kapı açma kolu mutlaka çalışır olmalı."
        ]
      },
      {
        title: "Hidrofor ve Tatlı Su Dağıtım Sistemi",
        introduction: "Hidrofor sistemi, gemide tatlı su tankından alınan suyu basınçlandırarak yaşam mahallerindeki musluk, duş, mutfak ve servis noktalarına sabit basınçta dağıtan sistemdir. Genellikle pompa + basınç tankı (pressure vessel) + presostat + UV sterilizatör kombinasyonu ile çalışır.",
        sections: [
          {
            heading: "Sistem Bileşenleri",
            paragraphs: [
              "Tatlı su tankı (FWT): soğuk su deposu; epoxy boyalı veya stainless steel.",
              "Hidrofor pompası: santrifüj, tipik 4–6 bar discharge.",
              "Basınç tankı (pressure vessel): membran tipi; 100–500 L hacim, hava yastığı pompa start/stop sıklığını azaltır.",
              "Presostat (pressure switch): genellikle 3 bar start, 5 bar stop.",
              "Kalorifer (calorifier): elektrik veya buhar tahrikli sıcak su tankı.",
              "UV sterilizator ve mineral dozaj: içme suyu kalitesi için."
            ],
            table: {
              headers: ["Komponent", "Tipik Değer"],
              rows: [
                ["Hidrofor pompa basıncı", "3–6 bar"],
                ["Basınç tankı ön doluş havası", "Stop basıncının %90'ı"],
                ["Sıcak su sıcaklığı", "60–65 °C (lejyonella koruması)"],
                ["UV doz", "≥40 mJ/cm²"]
              ]
            }
          }
        ],
        keyPoints: [
          "İçme suyu IMO/WHO standardına uygun olmalı: koliform 0/100mL, klor rezidü 0.2 mg/L.",
          "FWT'ye giriş bağlantıları air gap ile ters akışı önlemeli (cross-connection yasağı).",
          "Yıllık tank temizliği ve sertifikalı su analizi şart.",
          "Pressure tank ön havası periyodik kontrol edilir; yoksa pompa sürekli çalışıp yanar."
        ],
        workingPrinciple: [
          "Pompa FWT'den suyu alır, basınç tankına basar; hava yastığı sıkışır ve enerji depolar.",
          "Musluklar açıldığında basınç tankından su akar, basınç düşer.",
          "Stop basıncının (örn. 3 bar) altına düşünce presostat pompayı çalıştırır; üst basınca (örn. 5 bar) ulaşınca durdurur.",
          "UV sterilizator akış sırasında suyu sterilize eder."
        ],
        operation: [
          "FWT seviyesini günlük kontrol et; hidrofor pompası kuru çalıştırılmaz (mekanik conta yanar).",
          "Basınç tankı ön havasını ayda bir kontrol et (manometre ile, su tarafı boş).",
          "Klor dozaj veya UV lambasını çalışır tut.",
          "Calorifier sıcaklığını 60 °C üzerinde tut (lejyonella).",
          "Pompa start/stop sıklığını izle; >6/dk ise tank ön havası eksik demektir."
        ],
        faults: [
          { fault: "Pompa sürekli çalışıyor", cause: "Pressure tank ön havası boş, kaçak var, presostat ayarsız", action: "Tank havası şarj, hat sızdırmazlık, presostat ayarı." },
          { fault: "Musluktan kesik kesik su", cause: "Hava emiyor, basınç tankı membranı yırtık", action: "Suction line kontrol, membran değişim." },
          { fault: "Sıcak su akmıyor", cause: "Calorifier rezistansı bozuk, termostat arızalı", action: "Rezistans test, termostat değişim." },
          { fault: "İçme suyu kötü tat/koku", cause: "Tank kirli, klor düşük, UV bozuk", action: "Tank temizlik, klor şoku, UV lamba değişim." }
        ],
        precautions: [
          "Tank inspeksiyonu enclosed space entry permit ile, gas test (O₂) yapılarak.",
          "Pres tank şarj havası kompresörden alınmamalı (yağ kontaminasyonu); pure N₂ veya temiz hava.",
          "FWT giriş hatlarında non-return valve sağlam olmalı (kontaminasyon riski).",
          "Calorifier elektrik rezistansı kuruda enerjilendirilmez (yanar)."
        ]
      },
      {
        title: "Provision Refrigeration (Soğuk Depo) Sistemi",
        introduction: "Provision refrigeration, gemide kumanya odalarının (et, balık, sebze, süt ürünleri) belirli sıcaklıkta tutulmasını sağlayan ekipmandır. Tipik olarak R404A/R407F/R513A soğutucu akışkan, kompresör, kondenser, ekspansiyon valfi ve her oda için ayrı evaporator içerir.",
        sections: [
          {
            heading: "Oda Sıcaklıkları ve Komponentler",
            paragraphs: [
              "Et odası -18 °C, balık -25 °C, sebze +4 °C, süt ürünü +2 °C, kuru kumanya +10 °C tipik.",
              "Genellikle iki kompresör (duty/standby), bir kondenser (su soğutmalı), ekspansiyon valfli her oda.",
              "Defrost: sıcak gaz veya elektrikli rezistans ile periyodik buz çözme.",
              "Solenoid valf, oda termostatına göre evaporator'a gaz akışını açar/kapar."
            ],
            table: {
              headers: ["Oda", "Sıcaklık", "Bağıl Nem"],
              rows: [
                ["Et (frozen)", "-18 °C", "—"],
                ["Balık (frozen)", "-25 °C", "—"],
                ["Sebze/meyve", "+4 °C", "%85–90"],
                ["Süt ürünü", "+2 °C", "%80"],
                ["Kuru kumanya", "+10 °C", "%50"]
              ]
            }
          }
        ],
        keyPoints: [
          "İçeriden açma, alarm ve mahsur kalma önlemlerini geminin cold-room risk assessment'i, MLC/flag ve onaylı arrangement üzerinden doğrula; yanlışlıkla kilitlenme halinde içeriden kaçış işlevini operasyon öncesi test et.",
          "Düşük sıcaklık alarmı bridge ve ECR'da görünür olmalı.",
          "Defrost sırasında oda sıcaklığı geçici olarak yükselir; defrost frekansı ayarlanmalı.",
          "Et ve balık odası ayrı evaporator gerektirir; çapraz koku önlemi."
        ],
        workingPrinciple: [
          "Kompresör soğutucu gazı sıkıştırır → kondenser deniz suyuyla yoğunlaştırır (sıvı) → likit receiver → ekspansiyon valfi (basınç düşer) → evaporator (oda havasını soğutur, gaz olur) → kompresör.",
          "Termostat oda sıcaklığını okur; set noktasına ulaşınca solenoid valfi kapatır, kompresör pump-down yapar.",
          "Defrost timer/sensör tetiklendiğinde sıcak gaz veya elektrik rezistansı evaporator'a yönlendirilir."
        ],
        operation: [
          "Sefere çıkmadan kumanya yüklendiğinde tüm odalar set sıcaklığa indirilir.",
          "Sıcaklık ve alarm kayıtlarını Food Safety Management Plan/MLC, company procedure ve cargo/provision gereğine göre tut; 'HACCP her gemide aynı biçimde zorunlu' diye genelleme yapma.",
          "Evaporator coil'inde aşırı buz birikimi varsa defrost manuel başlatılır.",
          "Refrigerant level (sight glass) ve oil level (kompressor) kontrol edilir.",
          "Condenser sea-water strainer'ını differential pressure, akış/sıcaklık trendi ve PMS'e göre temizle; sabit haftalık aralığı kirlenme kanıtının yerine kullanma."
        ],
        faults: [
          { fault: "Oda soğumuyor", cause: "Gaz kaçağı, evaporator buzlu, solenoid valf kapalı", action: "Sızdırmazlık, defrost, solenoid test." },
          { fault: "Kompresör kısa devirli (short-cycle)", cause: "LP switch ayarsız, gaz az, sıvı geri dönüşü", action: "Switch ayar, gaz şarj, ekspansiyon valf bakım." },
          { fault: "Kapıda buzlanma", cause: "Conta bozuk, defrost yetersiz", action: "Conta değişim, defrost frekansı artır." },
          { fault: "HP trip", cause: "Deniz suyu yok, kondenser kirli", action: "SW pompa, strainer, kondenser temizlik." }
        ],
        precautions: [
          "Soğuk depoya tek başına girilmez; içeride mahsur kalma riski (panic alarm + radio).",
          "Defrost sırasında üretilen sıvı drain hattı tıkanmamalı (don/sızıntı).",
          "Refrigerant kaçağı boğulma, toksisite veya yanıcılık riski yaratabilir; fixed detector gereği refrigerant sınıfı/şarjı, mahal ve class/flag risk assessment'inden doğrulanır, portable ölçüm ve havalandırma hazır tutulur.",
          "Kompresör çalışırken suction valf kapatılmaz (sıvı kompresyon = kırılma)."
        ]
      },
      {
        title: "Sıkıştırılmış Hava Sistemi (Start / Control / Working Air)",
        introduction: "Starting, control/instrument ve working air devreleri; kompresör, cooler/separator, receiver, dryer/filter ve basınç düşürme düzenlerinden oluşur. 30/7 bar yalnız yaygın örnektir; geminin design pressure, normal band ve alarm/trip değerleri P&ID ile maker manual'den alınır.",
        sections: [
          {
            heading: "Sistem Hiyerarşisi",
            paragraphs: [
              "Ana hava kompresörü (main air compressor): 2 kademeli, 30 bar; ana receiver tankını şarj eder.",
              "Start-air receiver toplam kapasitesi, reversible ana makinede kompresör takviyesi olmadan en az 12 ardışık start; non-reversible düzende en az 6 start kriteri ve onaylı piping/izolasyon düzeniyle değerlendirilir.",
              "Reducing valve: 30 bar → 7 bar control/working air için.",
              "Air dryer: refrigerant veya desiccant tipi; çiğ noktası -20 ila -40 °C.",
              "Acil kompresör (emergency air compressor): elektrik kesintisinde dizel veya emergency switchboard'dan beslenen küçük kompresör; ana makine ilk start için."
            ],
            table: {
              headers: ["Sistem", "Basınç", "Kullanım"],
              rows: [
                ["Start air", "25–30 bar", "Ana makine, jeneratör start"],
                ["Control air", "7 bar", "Pnömatik valf, governor"],
                ["Working air", "7 bar", "Atölye, temizlik"],
                ["Whistle air", "7–10 bar", "Tipik ses cihazı (whistle)"]
              ]
            }
          }
        ],
        keyPoints: [
          "Receiver internal/external examination, thickness/pressure test ve safety-valve aralığını class/bayrak survey status ile pressure-vessel planından doğrula; sabit 5 yıl bütün kontrolleri açıklamaz.",
          "Tank içinde su birikimi olur; her vardiya altta drain açılarak boşaltılır.",
          "Oil carry-over ve yüksek discharge sıcaklığı yangın/patlama riski yaratır; maker alarm/trip setleri ile normal trendi izle, evrensel 140 °C sınırı kullanma.",
          "Control air kuru ve yağsız olmalı; yoksa pnömatik instrumentation arızalanır."
        ],
        workingPrinciple: [
          "Kompresör atmosferden hava çeker, 1. kademede 5–7 bara sıkıştırır, intercooler'da soğutulur.",
          "2. kademede 30 bara çıkarılır, aftercooler'da soğutulur ve nem ayrıştırılır.",
          "Receiver'a basılır; tank dolduğunda unloader devreye girer veya kompresör durur.",
          "Dryer adsorpsiyon (silica gel) veya refrigeration ile suyu uzaklaştırır."
        ],
        operation: [
          "Kompresör start öncesi yağ seviyesi, soğutma suyu, drain kontrol.",
          "Otomatik mod: receiver tank basıncı düştüğünde otomatik start.",
          "Drain'leri condensate yükü, auto-drain işlevi ve PMS/watch routine'e göre kontrol et; yağlı kondensi uygun toplama sistemine al.",
          "Start air valfi izolasyonu kontrol et; kazara start olabilir.",
          "Inter/aftercooler temizliğini pressure drop, sıcaklık yaklaşımı, kaçak testi ve PMS condition trendine göre planla."
        ],
        faults: [
          { fault: "Kompresör basınç vermiyor", cause: "Suction filter tıkalı, kafa contası, kapakçık kırık", action: "Filtre, kafa söküm, valf bakım." },
          { fault: "Yüksek discharge sıcaklığı", cause: "Soğutma suyu yok, kondenser kirli, intercooler tıkalı", action: "SW kontrol, temizlik." },
          { fault: "Receiver basınç tutmuyor", cause: "Emniyet valfi sızdırıyor, drain valfi açık, hat kaçağı", action: "Valf reseat, hatta sızdırmazlık testi." },
          { fault: "Dryer çiğ noktası yüksek", cause: "Desiccant doymuş, regenerasyon arızası", action: "Desiccant değişim, regen heater kontrol." }
        ],
        precautions: [
          "Receiver tank üzerinde safety valve mutlaka çalışır; manuel test düzenli yapılır.",
          "Yüksek basınç hattında çatlak/sızıntıya yaklaşırken vücudu açık tutmayın (yüksek hızlı jet kesik yapar).",
          "Bakım öncesi tank tamamen depressurize edilmeli, izolasyon ve kilit-etiket (LOTO) uygulanmalı.",
          "Yağlı kompresörde aşırı yağ taşkını patlama riski oluşturur; yağ filtresi ve seperator düzenli kontrol."
        ]
      },
      {
        title: "Buhar ve Kondens Sistemi",
        introduction: "Gemide buhar sistemi, kazanlardan üretilen buharın yakıt ısıtma, calorifier, tank ısıtma, tank temizleme, mutfak ve HFO arıtma için kullanıldığı sistemdir. Saturated buhar (genellikle 7 bar) üretilir, kullanım yerlerine dağıtılır ve kondens (yoğuşmuş su) hot well'e dönüp tekrar kazana beslenir.",
        sections: [
          {
            heading: "Sistem Bileşenleri",
            paragraphs: [
              "Auxiliary boiler: yakıtlı (HFO/MGO) veya egzoz gazı ekonomajör; 7–10 bar saturated buhar üretir.",
              "Buhar kollektörü ve dağıtım hatları: izole, drain valfli.",
              "Steam trap (kondens kapanı): kondensi ayırır, buhar kaçağını önler.",
              "Hot well tank: kondensi toplar, sıcaklığını kontrol eder (oksijen tutucu için).",
              "Feed water pompası: hot well'den kazana su basar.",
              "Deaerator: feed water'dan O₂ ve CO₂ uzaklaştırır."
            ],
            table: {
              headers: ["Tüketici", "Buhar Sıcaklığı", "Tipik Kullanım"],
              rows: [
                ["HFO ısıtma (ana tank)", "120 °C / 7 bar", "40–50 °C tank"],
                ["HFO settling/service", "120 °C", "75–90 °C"],
                ["HFO purifier ısıtıcı", "120 °C", "98 °C"],
                ["Calorifier", "120 °C", "65 °C su"],
                ["Tank cleaning (COW)", "saturated", "60–80 °C"]
              ]
            }
          }
        ],
        keyPoints: [
          "Feed water pH 8.5–10.5, sertlik <5 ppm; kazan suyu phosphate/sülfit dozajı yapılır.",
          "Hot well sıcaklığı 60–80 °C; çok soğuk olursa O₂ çözünür ve kazan korozyonu yapar.",
          "Steam trap arızası buhar kaybı + verim düşüşüdür; düzenli ultrasonik test yapılır.",
          "Egzoz gazı ekonomajörü manevrada/limanda az çalışır; soot fire riski için fan ile temizlenir."
        ],
        workingPrinciple: [
          "Yakıtlı kazanda brulor su yüzeyini ısıtır; su buharlaşır, üst kısımdan kuru buhar alınır.",
          "Buhar kollektörden tüketicilere dağıtılır; kullanım yerinde ısı verirken yoğuşur.",
          "Kondens steam trap üzerinden kondens hattına geçer ve hot well'e dönüş yapar.",
          "Feed water pompası hot well'den kazana basar; level controller drum seviyesini sabit tutar."
        ],
        operation: [
          "Kazanı çalıştırmadan önce su seviyesi (gauge glass) ve safety valve test.",
          "Brulor yakıt valfini yavaş aç; alev tutuşunu (flame eye) kontrol et.",
          "Drum basıncı yükselirken çıkış valfini kademeli aç (thermal shock önlemi).",
          "Operasyon sırasında pH, klorür, fosfat, salinity testleri günlük yapılır.",
          "Blow-down: kazan suyundaki çamur ve tuzu boşaltmak için altta surface ve bottom blow-down."
        ],
        faults: [
          { fault: "Brulor ateşlemiyor", cause: "Yakıt soğuk, ignition arızası, fotosel kirli", action: "HFO ısıt, ignition kontrol, fotosel temizlik." },
          { fault: "Drum seviye dalgalı (priming/foaming)", cause: "Kazan suyu kirli, yüksek TDS, alkalinity yüksek", action: "Blow-down yap, kimyasal dozaj kontrol." },
          { fault: "Kondens dönüşü düşük", cause: "Steam trap takılı kalmış, kondens hattında kaçak", action: "Trap test, hat sızdırmazlık." },
          { fault: "Soot fire (egzoz ekonomajörü)", cause: "Soot birikimi, düşük yük, alkali yakıt", action: "Soot blow düzenli yap, yangın halinde steam smothering veya CO₂." }
        ],
        precautions: [
          "Buhar hattı çalıştırılırken yavaş ısıtılmalı; ani açma water hammer yapar (boru patlatabilir).",
          "Safety valve manuel test düzenli yapılır; tıkanması facia.",
          "Sıcak yüzey yanığı için hatlar izole edilmeli; çıplak el ile temas yasak.",
          "Boş çalışan kazan (low water) overheating ve patlama riski; level alarmları hassas tutulmalı."
        ]
      }
    ]
  },
  "gmdss-lsa": {
    title: "GMDSS ve Can Kurtarma Sistemleri",
    description: "GMDSS telsiz cihazları, EPIRB, SART, BNWAS, VDR, can filikası, davit, liferaft ve rescue boat",
    topics: [
      {
        title: "GMDSS Genel Mimarisi ve Sea Areas",
        introduction: "GMDSS; distress alerting, SAR coordination, on-scene communication ve MSI alımını birbirinden bağımsız yollarla sağlayan SOLAS Chapter IV mimarisidir. Donanım yalnız 'menzil' ezberinden değil; ilan edilmiş sea area, gemi tipi/GT, sefer limiti, tanınmış uydu servisi ve Cargo Ship Safety Radio Record of Equipment'tan belirlenir.",
        sections: [
          {
            heading: "Sea Area Tanımları ve Cihaz Zorunluluğu",
            paragraphs: [
              "A1, bir Contracting Government tarafından tanımlanan en az bir VHF coast station'ın sürekli DSC alerting kapsamıdır; sabit 20–30 NM çemberi değildir.",
              "A2, A1 dışında en az bir MF coast station'ın sürekli DSC alerting kapsamıdır; propagasyon menzili tek başına sea-area statüsü yaratmaz.",
              "A3, A1/A2 dışında gemideki tanınmış mobile-satellite service earth station'ın desteklediği sürekli alerting kapsamıdır; modern GMDSS yalnız Inmarsat geostationary bölgesine eşitlenmez.",
              "A4, A1/A2/A3 dışındaki alandır. HF DSC/radiotelephony düzeni ve MSI yolu, güncel SOLAS IV ile Radio Record üzerinden doğrulanır; NBDP artık genel bir zorunluluk olarak varsayılmaz."
            ],
            table: {
              headers: ["Sea Area", "Kapsama", "Ek Zorunluluk"],
              rows: [
                ["A1", "İlan edilmiş VHF DSC coast coverage", "Radio Record'daki A1 düzeni"],
                ["A2", "A1 dışı ilan edilmiş MF DSC coverage", "MF DSC + onaylı tamamlayıcılar"],
                ["A3", "Tanınmış uydu servisinin desteklediği coverage", "Approved ship earth station veya izinli eşdeğer"],
                ["A4", "A1/A2/A3 dışı", "HF DSC/voice ve onaylı MSI yolu"]
              ]
            }
          }
        ],
        keyPoints: [
          "Reserve-source kapasitesi SOLAS IV/13'e göre hesaplanır: uygun emergency source bulunan düzenlerde genel temel süre 1 saat, bulunmayanlarda 6 saattir; gerçek yük listesi, akü yaşı ve Radio Record üzerinden load test ile doğrulanır.",
          "Duplication of equipment, shore-based maintenance ve at-sea maintenance kombinasyonu SOLAS IV/15 ile Administration onayına göre seçilir; bunu yalnız class tercihi sayma.",
          "Radio log her vardiya doldurulur; tehlike, acil ve emniyet trafiği kayıt edilir.",
          "Normal işletim uygun GOC/ROC yetkisi ve Master sorumluluğundadır; gerçek distress halinde yardım istemeyi geciktirecek şekilde 'sertifikalı kişi yoksa çağrı yapılamaz' yorumu yapılmaz."
        ],
        workingPrinciple: [
          "Tehlike çağrısı DSC ile (kim, nerede, ne tür tehlike) tek tuşla otomatik gönderilir.",
          "Sahil istasyonu / yakın gemiler DSC alarmı ile uyarılır ve ses kanalında detay alır.",
          "MSI (NAVTEX, SafetyNET) otomatik olarak hava raporu, NAVAREA uyarısı, SAR yayını basar.",
          "EPIRB ve SART'ın aktivasyonu uydu/Radar ile arama kurtarma birimine yönlendirme sağlar."
        ],
        operation: [
          "Vardiya başında battery, antenler, lambalar ve printer kağıdı kontrol.",
          "Günlük DSC self-test (test çağrısı sahile değil, internal test).",
          "Live DSC test çağrısını Radio Log procedure, coast-station availability, flag guidance ve maker talimatına göre yap; kapsama/ack yoksa başarısız denemeyi ve sebebini kaydet, distress alert kullanma.",
          "Aylık EPIRB self-test, SART self-test, batter expiry kontrol.",
          "Radio log'a tüm test ve tehlike trafiği kayıt edilir."
        ],
        faults: [
          { fault: "DSC çağrı gönderilmiyor", cause: "GPS feed yok, MMSI girilmemiş, anten arızası", action: "GPS bağlantı, MMSI kontrol, antenna VSWR ölçümü." },
          { fault: "NAVTEX yayın almıyor", cause: "Anten kopuk, kanal seçimi yanlış (518 kHz Eng), squelch yüksek", action: "Antenna ve preamp test, frekans/lang ayarı." },
          { fault: "Battery düşük alarm", cause: "Şarj devresi arızalı, battery ömrü dolmuş", action: "Charger ölçüm, battery load test, gerekirse değişim." }
        ],
        precautions: [
          "Tehlike butonuna kazara basılırsa hemen sahil istasyonuna sesli iptal mesajı gönderilir (DSC cancel).",
          "EPIRB hidrostatik release ünitesi (HRU) son kullanma tarihi geçmemeli.",
          "Telsiz odasında reserve power source ve battery sürekli şarjlı tutulmalı.",
          "Radyo arıza günlüğü ve onarım kayıtları PSC inspeksiyonunda istenir."
        ]
      },
      {
        title: "VHF / DSC Telsizi",
        introduction: "VHF (Very High Frequency) DSC telsizi, GMDSS A1 alanında temel tehlike ve genel haberleşme cihazıdır. 156–174 MHz bandında çalışır, 25 W çıkışlı sabit set ile yaklaşık 20–30 NM menzil sağlar. DSC modülü Channel 70'i sürekli izleyerek otomatik tehlike çağrısı gönderir/alır.",
        sections: [
          {
            heading: "Önemli Kanallar",
            paragraphs: [
              "Ch 16: tehlike, acil ve çağrı kanalı (156.800 MHz).",
              "Ch 70: DSC tehlike kanalı (156.525 MHz) — sesli kullanım yasak.",
              "Ch 13: bridge-to-bridge gemi manevra haberleşmesi (156.650 MHz).",
              "Ch 6, 8, 72, 77: gemi-gemi çalışma kanalları."
            ],
            table: {
              headers: ["Kanal", "Frekans (MHz)", "Kullanım"],
              rows: [
                ["16", "156.800", "Distress & calling"],
                ["70", "156.525", "DSC distress"],
                ["13", "156.650", "Bridge-to-bridge"],
                ["06", "156.300", "Inter-ship"],
                ["AIS 1/2", "161.975/162.025", "AIS"]
              ]
            }
          }
        ],
        keyPoints: [
          "MMSI 9 haneli numara; gemi kayıtlı bayrağa göre üretilir (örn. TR: 271xxxxxx).",
          "Çoğu sabit marine VHF 25 W/1 W seçeneğine sahiptir; en düşük yeterli gücü, kanal/port kuralını ve iletişim mesafesini dikkate alarak kullan.",
          "DSC test çağrısı için geminin Radio Log test planını ve kıyı istasyonunun test çağrısı kabul edip etmediğini doğrula; acknowledgement alınamaması cihazın tek başına arızalı olduğunu kanıtlamaz.",
          "Dual watch / scan modu Ch 16 ile başka kanalı eş zamanlı dinler."
        ],
        workingPrinciple: [
          "DSC çağrısı: sender MMSI, alıcı MMSI/all ships, çağrı tipi (distress/urgency/safety/routine), pozisyon, nature.",
          "VHF DSC distress alert acknowledgement alınmazsa cihaz otomatik olarak yaklaşık 3,5–4,5 dakika sonra yeniden attempt yapabilir; 'beş ardışık yayın' MF/HF formatlarıyla karıştırılmamalı ve maker ekranı izlenmelidir.",
          "Distress alert sonrasında telsiz Ch 16'ya otomatik geçer ve sesli MAYDAY beklenir."
        ],
        operation: [
          "Power on, GPS feed ve self-test kontrol.",
          "Ch 16 ve Ch 70 daima açık (silent watch).",
          "Çağrı için uygun channel/power seç, dinle, PTT'ye bas ve SMCP/radio procedure ile kısa-konuş; gereksiz carrier tutma.",
          "Distress için nature/position/time otomatik-manuel verisini kontrol et ve korumalı DISTRESS tuşunu cihaz üzerindeki işaretli süre boyunca basılı tut.",
          "Test çağrısını gemi planı ve coast-station talimatına göre yap; ack/başarısızlık sonucunu Radio Log'a işle."
        ],
        faults: [
          { fault: "Ses gelmiyor", cause: "Volume/squelch, hoparlör arızası", action: "Ayar test, hoparlör değişim." },
          { fault: "Çağrıda parazit", cause: "Anten/connection korozyon, başka cihaz interferansı", action: "Anten konnektör temizlik, EMI kaynak izole." },
          { fault: "DSC çağrı gönderilmiyor", cause: "MMSI yok, GPS feed yok, Ch 70 başka cihazda kullanımda", action: "MMSI ayar, GPS bağlantı, conflict çöz." }
        ],
        precautions: [
          "Ch 16 sürekli dinlenmeli (silent watch).",
          "Yanlış DSC çağrısı: hemen Ch 16'da sesli iptal mesajı yayınla, log'a yaz.",
          "Anten/feedline sağlığını forward/reflected power veya maker BIT ile trendle; VSWR alarm ve kabul değerini üretici manual'inden al, canlı anten hattında yetkisiz ölçüm yapma."
        ]
      },
      {
        title: "MF/HF DSC Telsizi (Inmarsat Alternatifi)",
        introduction: "MF/HF DSC telsizi, onaylı GMDSS düzenine göre A2 ile A3/A4 seferlerinde distress alerting ve radiotelephony sağlar. Ground/sky-wave propagasyonu saat, mevsim, güneş aktivitesi ve frekansa bağlıdır. 2024 GMDSS modernizasyonundan sonra NBDP genel taşıma zorunluluğu değildir; mevcut kurulumun Radio Record ve manual'i esas alınır.",
        sections: [
          {
            heading: "Tehlike Frekansları",
            paragraphs: [
              "MF DSC: 2187.5 kHz; MF voice: 2182 kHz.",
              "HF DSC: 4207.5 / 6312 / 8414.5 / 12577 / 16804.5 kHz.",
              "HF voice: 4125 / 6215 / 8291 / 12290 / 16420 kHz.",
              "NBDP: 2174.5 / 4177.5 / 6268 / 8376.5 / 12520 / 16695 kHz."
            ],
            table: {
              headers: ["Band", "DSC (kHz)", "Voice (kHz)"],
              rows: [
                ["MF", "2187.5", "2182"],
                ["HF 4", "4207.5", "4125"],
                ["HF 8", "8414.5", "8291"],
                ["HF 12", "12577", "12290"],
                ["HF 16", "16804.5", "16420"]
              ]
            }
          }
        ],
        keyPoints: [
          "MF gece daha uzak menzil verir (ionosphere D katmanı zayıflar).",
          "HF'de optimum band saat, mesafe ve propagation'a göre seçilir; genellikle gündüz daha yüksek, gece daha düşük frekanslar denenir ve tek band varsayımına güvenilmez.",
          "NBDP bulunan legacy sette ARQ/FEC sağlayabilir; zorunluluğu ve kullanılacak prosedür güncel Radio Record, flag guidance ve cihaz kabiliyetinden doğrulanır.",
          "ATU (antenna tuning unit) anteni çalışılan frekansa otomatik tune eder."
        ],
        workingPrinciple: [
          "Frekans seçilir, ATU ground plane ile anteni 50 Ω'a tune eder.",
          "DSC modülü tehlike çağrısını dijital olarak modüle eder (PSK).",
          "Sahil veya gemi DSC alarmı ile uyarılır; voice channel'da MAYDAY alınır.",
          "NBDP mod: ARQ (otomatik tekrar isteği) ile error-free teleks alışverişi."
        ],
        operation: [
          "Gemi pozisyonuna göre uygun band seç (yakın MF, uzak HF).",
          "Self-test ve live DSC testini Radio Log procedure/maker talimatına göre yap; coast station availability ve alınan ack'i kaydet.",
          "Distress: nature, position/time ve uygun attempt'i seç; korumalı distress tuşunu cihazın işaretli süresi boyunca bas ve DSC/voice follow-up ekranını izle.",
          "Ack alındıktan sonra voice frekansa geç ve detay ver."
        ],
        faults: [
          { fault: "ATU tune etmiyor", cause: "Anten kopuk, ground bağlantısı zayıf, ATU arıza", action: "Anten süreklilik, ground bond temizlik, ATU servis." },
          { fault: "Yayın güçsüz (low forward power)", cause: "Final amplifier zayıflamış, anten verim düşük", action: "PA test, anten VSWR ölçüm." },
          { fault: "NBDP printer kağıt sıkışıyor", cause: "Mekanik veya kağıt rulosu", action: "Kağıt yenile, mekanik temizlik." }
        ],
        precautions: [
          "Yüksek voltajlı PA modülü; servis sırasında kapasitör boşaltma şart.",
          "Anten yakın çalışan personel için RF radyasyon riski; transmit sırasında uzak dur.",
          "Frekans çakışmasını önlemek için ITU plana uyulmalı."
        ]
      },
      {
        title: "Inmarsat-C / Mini-C Sistemi",
        introduction: "Inmarsat-C, A3 sea area'sında veri tabanlı tehlike, EGC (Enhanced Group Call), MSI ve genel teleks/email haberleşmesi için kullanılan store-and-forward uydu terminaldir. SafetyNET (MSI) ve FleetNET (ticari grup mesajı) yayınlarını otomatik alır.",
        sections: [
          {
            heading: "Servisler ve Mesaj Tipleri",
            paragraphs: [
              "Distress alert: tek tuş ile gemi MMSI, pozisyon, nature ve UTC ile RCC'ye gönderilir.",
              "EGC SafetyNET: NAVAREA uyarısı, SAR mesajı, hava raporu otomatik.",
              "EGC FleetNET: armatör veya ticari grup mesajı.",
              "Genel haberleşme: e-posta, teleks, SMS (LES — Land Earth Station üzerinden)."
            ],
            table: {
              headers: ["Servis", "Mesaj", "Yön"],
              rows: [
                ["Distress", "Tehlike alert", "Gemi → RCC"],
                ["SafetyNET", "MSI", "Sahil → gemi"],
                ["FleetNET", "Ticari grup", "Sahil → gemi"],
                ["Mesaj", "E-posta/teleks", "Çift yön"]
              ]
            }
          }
        ],
        keyPoints: [
          "Inmarsat-C anten omnidirectional, küçük dome; manevradan etkilenmez.",
          "Mini-C aynı servisleri sunar, fiziksel olarak daha küçüktür.",
          "EGC alıcı sürekli açık; SafetyNET kapatılamaz (SOLAS).",
          "Position update otomatik 4 saatte bir LES'e gönderilir (LRIT için)."
        ],
        workingPrinciple: [
          "GPS pozisyonu otomatik enjekte; mesajla birlikte gönderilir.",
          "Store-and-forward: gemi LES'e iletir, LES alıcıya iletir; gerçek-zamanlı değil.",
          "Distress: tek tuş ile RCC'ye iletilir, ack alınır."
        ],
        operation: [
          "Login durumu ve LES seçimi günlük kontrol.",
          "EGC mesajları printer çıktısı veya screen log; her vardiya kontrol.",
          "Position report otomatik; manuel test ayda 1.",
          "Distress test: gemi VHF'inden RCC'ye telefon ile bilgi vererek live test mümkün."
        ],
        faults: [
          { fault: "Mesaj gönderilmiyor", cause: "Login yok, LES dışında, anten obstruction", action: "Login yap, LES seç, anten önündeki obstruction kaldır." },
          { fault: "Printer çıktı vermiyor", cause: "Kağıt/kartuş bitmiş, port arızası", action: "Sarf yenile, port test." },
          { fault: "GPS feed yok", cause: "GPS receiver arızası, kablo gevşek", action: "GPS testi, kablo kontrol." }
        ],
        precautions: [
          "Mesaj iletim ücretli; uzun mesaj LES tarifesi yüksek olabilir.",
          "EGC/MSI reception seçimini seyredilen NAVAREA/METAREA ve coastal warning alanlarına göre yap; mandatory distress/urgency ve ilgili area mesajlarını susturacak ayar kullanma.",
          "Antenna 360° serbest açıya sahip olmalı; bayrak direği veya baca arkasına monte etme."
        ]
      },
      {
        title: "EPIRB (406 MHz Cospas-Sarsat)",
        introduction: "EPIRB (Emergency Position Indicating Radio Beacon), gemi terk edildiğinde otomatik veya manuel olarak aktive olarak 406 MHz frekansından gemi MMSI ve GPS pozisyonunu Cospas-Sarsat uydularına ileten beacon cihazıdır. SOLAS gemilerinde köprünün dışında, hızlı erişimli bracket'ta hidrostatik release ünitesi (HRU) ile monte edilir.",
        sections: [
          {
            heading: "Yapı ve Aktivasyon",
            paragraphs: [
              "406 MHz dijital beacon: gemi kimlik, pozisyon ve emergency type yayın yapar.",
              "121.5 MHz homing beacon: SAR helikopter/gemi tarafından yön bulma için.",
              "GNSS'li beacon encoded position gönderir; actual accuracy ve update, beacon type approval, antenna view ve GNSS fix durumuna bağlıdır. GNSS yoksa Cospas-Sarsat bağımsız location çözümü daha yavaş/az hassas olabilir.",
              "HRU (Hydrostatic Release Unit): 1.5-4 m derinliğe ulaştığında brackat serbest bırakır, EPIRB yüzeye çıkar ve su ile aktive olur."
            ],
            table: {
              headers: ["Komponent", "Görev"],
              rows: [
                ["406 MHz Tx", "Cospas-Sarsat uydusuna alert"],
                ["121.5 MHz Tx", "Homing beacon"],
                ["GPS", "Pozisyon"],
                ["HRU", "Otomatik serbest bırakma"],
                ["Battery", "Lityum, ≥48 saat çalışma"],
                ["Strobe light", "Görsel arama"]
              ]
            }
          }
        ],
        keyPoints: [
          "MMSI veya hex ID gemi register'a kayıtlı olmalı; bayrak değişiminde re-program.",
          "Battery replacement/expiry tarihini beacon label ve approved service record'dan izle; bütün modellerin ömrü sabit 5 yıl değildir.",
          "Disposable HRU'nun expiry tarihini kendi label'ından izle; modelin approved service/replacement düzenini uygula ve iki yılı evrensel üretim tarihi kuralı sanma.",
          "Annual test ve shore-based maintenance kapsamını SOLAS IV/15, MSC.1/Circ.1040/Rev.2, flag guidance ve radio survey due date'ten doğrula."
        ],
        workingPrinciple: [
          "Su ile temas → switch kapanır → 50 sn içinde 406 MHz alert + 121.5 MHz homing yayını başlar.",
          "Cospas-Sarsat uyduları (LEO + GEO + MEO) sinyali alır, RCC'ye iletir.",
          "RCC gemi sahibini ve son pozisyonu doğrulayıp SAR aktive eder."
        ],
        operation: [
          "Aylık görsel inspeksiyon: bracket sağlam, expiry date kontrol, HRU sağlam.",
          "Self-test'i maker'ın izin verdiği test penceresi/süresinde yap; GNSS self-test'i gereksiz tekrarlayarak batarya ömrünü tüketme ve displayed result'u kaydet.",
          "Yıllık servis: yetkili tarafından battery, GPS, transmit power test.",
          "Gemi terk durumunda: bracket'tan al, su atıl veya manuel switch ile aktif et."
        ],
        faults: [
          { fault: "Self-test kırmızı LED", cause: "Battery zayıf, transmit arıza", action: "Servise gönder, gerekirse değişim." },
          { fault: "Yanlış aktivasyon", cause: "Suya düşmüş, manuel butona basılmış", action: "EPIRB'i çıkar, kapat (manuel switch off), RCC'ye telefonla iptal bildir." },
          { fault: "HRU paslı/kilitli", cause: "Korozyon, expire", action: "HRU değiştir." }
        ],
        precautions: [
          "Yanlış alarm SAR kaynaklarını bağlar; test tuş/süresini beacon üzerindeki talimattan uygula, gerçek activation olursa beacon'i kapatıp RCC'ye kimlik/pozisyonla derhal iptal bildir.",
          "EPIRB'i seyir köprüsünün dışına, suyun ulaşabileceği yere monte et (terk durumunda HRU çalışmalı).",
          "Bracket etrafını boyama (HRU sıkışır)."
        ]
      },
      {
        title: "SART (Search and Rescue Transponder)",
        introduction: "SART, can filikası veya radyo arıza halinde X-Band radarın (9.2-9.5 GHz) sinyalini algılayıp yanıt vererek arama gemisinin radar ekranında 12 noktadan oluşan parlak çizgi (blip line) oluşturan transponder cihazıdır. Radar SART (eski) ve AIS-SART (yeni) tipleri mevcuttur.",
        sections: [
          {
            heading: "Tipler ve Çalışma",
            paragraphs: [
              "Radar SART, 9 GHz X-band sorgulamasını algılayıp bandı tarayan cevaplar üretir; radar ekranında yaklaşık 0,64 NM aralıklı 12 blip görülür, yakın mesafede yay/daire görünümüne dönüşebilir.",
              "AIS-SART: AIS sinyali yayınlar, AIS receiver'da MOB sembolü gösterir; menzil daha az ama dijital pozisyon verir.",
              "Lifeboat içinde özel bracket veya raftaki konteyner içinde bulundurulur."
            ],
            table: {
              headers: ["Özellik", "Radar SART", "AIS-SART"],
              rows: [
                ["Frekans", "9.2-9.5 GHz", "161.975/162.025 MHz"],
                ["Menzil", "Anten yüksekliği/sea state ve interrogating radar'a bağlı", "Anten yüksekliği ve AIS reception'a bağlı"],
                ["Ekran", "12 nokta blip line", "MOB sembolü"],
                ["Battery", "≥96 saat standby + 8 saat continuous interrogation response", "Type-approval'a göre ≥96 saat transmission"]
              ]
            }
          }
        ],
        keyPoints: [
          "Yüksek monte (≥1 m su seviyesi üstü) menzili artırır.",
          "SART tepkisi sadece 9 GHz radarda görülür; 3 GHz S-band radarda görünmez.",
          "Battery expiry/replacement tarihini cihaz label'ından izle; sabit 5 yıl bütün modeller için geçerli değildir.",
          "Survival craft search-and-rescue locating device sayısı/istifi SOLAS III/6 ile Safety Equipment Record'dan doğrulanır: 300–500 GT cargo ship için en az bir, 500 GT ve üzeri cargo ile passenger ship için her borddan erişilebilir en az iki düzen aranır."
        ],
        workingPrinciple: [
          "Radar pulse SART'a ulaştığında SART aynı frekansta 12 darbeli yanıt yayınlar.",
          "Yanıt PRF artarken tek noktaya, azalırken çizgiye dönüşür (yaklaşıldığında konsantrik daireler).",
          "AIS-SART aynı şekilde GPS pozisyonu ile periyodik AIS mesajı yayınlar."
        ],
        operation: [
          "Aylık görsel: bracket, switch, expiry kontrol.",
          "Aylık self-test: butona bas, LED + sesli alarm → OK.",
          "Aktivasyon: switch açılır, 9 GHz pulse algılayınca yanıt verir.",
          "Yüksek bir yere asılır (lifeboat tepe veya raft içi mast)."
        ],
        faults: [
          { fault: "Self-test arızalı", cause: "Battery zayıf, devre arızası", action: "Servis veya değişim." },
          { fault: "Radar ekranında görünmüyor", cause: "Çok alçak monte, 3 GHz radar kullanımı, SART aktivasyonsuz", action: "Yüksek monte, X-band radar, switch kontrol." }
        ],
        precautions: [
          "Self-test'i yalnız maker işaretli süre/modda yap; Radar SART cevabı çevredeki X-band ekranlarda, AIS-SART test mesajı AIS cihazlarında görülebilir.",
          "Yanlış aktivasyonda hemen kapat, RCC'ye iptal bildir.",
          "Test sırasında diğer geminin radar ekranında SART belirebilir; uyarı yapılır."
        ]
      },
      {
        title: "BNWAS (Bridge Navigational Watch Alarm System)",
        introduction: "BNWAS, köprü nöbet faaliyetini belirlenen dormancy süresi içinde reset alınmadığında köprüden başlayıp yedek zabit/crew mahallerine yükselen alarmla izler. SOLAS V/19 applicability; passenger ship, cargo ship GT/yapım tarihi ve Record of Equipment üzerinden doğrulanır, '150 GT üzeri bütün gemiler' diye bağlamsız genellenmez.",
        sections: [
          {
            heading: "Alarm Kademeleri",
            paragraphs: [
              "Dormancy period 3–12 dakika arasında seçilir; süre sonunda köprüde görsel indication başlar.",
              "Görsel indication 15 saniye içinde resetlenmezse köprüde first-stage audible alarm başlar.",
              "First-stage audible başladıktan 15 saniye sonra hâlâ reset yoksa designated back-up officer ve/veya Master mahallinde second-stage remote audible alarm başlar.",
              "Second-stage remote audible başladıktan 90 saniye sonra reset yoksa başka yeterli crew'u uyaran third-stage alarm devreye girer; cargo ship'te onaylı combined arrangement bulunabilir ve toplam escalation süresi performans standardını aşamaz."
            ],
            table: {
              headers: ["Stage", "Süre", "Alarm Yeri"],
              rows: [
                ["Dormancy sonu", "3–12 dk", "Köprü görsel"],
                ["First stage", "+15 sn", "Köprü sesli"],
                ["Second stage", "+15 sn", "Master / designated back-up"],
                ["Third stage", "+90 sn", "Yeterli ek crew veya onaylı combined arrangement"]
              ]
            }
          }
        ],
        keyPoints: [
          "Operational mode ve dormancy seçimine erişim korunur; ayar Master sorumluluğunda ve SMS/standing orders ile yapılır.",
          "Reset cihazları yalnız köprüde proper lookout yapılabilen çalışma konumlarına yerleştirilir; kamaradan/koltuktan nöbeti taklit edecek reset düzeni kabul edilmez.",
          "Motion sensor + manuel reset butonu kombinasyonu yaygın.",
          "Approved automatic mode, gemi underway iken BNWAS'ı devreye alıp underway değilken inhibit edebilir; actual mode vardiya başlangıcında doğrulanır."
        ],
        workingPrinciple: [
          "Reset interval boyunca nöbetçinin reset (manuel buton veya motion sensor) yapması beklenir.",
          "Reset alınmazsa bridge visual → bridge audible → remote second/third stage sırası MSC.128(75) zamanlamasıyla ilerler.",
          "Gemi ECDIS, AIS gibi sistemlerden bilgi almaz; bağımsız çalışır."
        ],
        operation: [
          "Vardiya başında BNWAS aktif olduğunu doğrula.",
          "Dormancy interval'i Master'ın protected setting'i ve standing order ile doğrula; 3–12 dakika onay aralığı dışına çıkma.",
          "Underway durumunda approved operational mode'un gerçekten active olduğunu panel ve alarm inhibit göstergesinden doğrula.",
          "PMS testinde dormancy, bridge visual/audible, remote call locations, reset noktaları ve power-failure alarmını zaman tutarak doğrula."
        ],
        faults: [
          { fault: "Stage alarmı tetiklenmiyor", cause: "Hoparlör arıza, kablo bağlantı, ayar yanlış", action: "Hoparlör test, hat kontrol, ayar onar." },
          { fault: "Sürekli alarm veriyor", cause: "Reset switch arızalı, motion sensor takılı", action: "Switch test, sensor temizlik/değişim." }
        ],
        precautions: [
          "BNWAS'ı kalıcı devre dışı bırakmak SOLAS ihlali; PSC ağır deficiency.",
          "Reset için sahte düzenek (bantlı buton vb.) yasak.",
          "Remote alarm location/sequence'i onaylı BNWAS planından doğrula; testten önce Master, bridge team ve etkilenecek crew'u bilgilendir."
        ]
      },
      {
        title: "VDR / S-VDR (Voyage Data Recorder)",
        introduction: "VDR/S-VDR; köprü sesleri, haberleşme, sensörler, komut/yanıtlar, alarm ve ekran görüntülerini kaza incelemesi için zaman senkronlu kaydeder. Carriage ve VDR/S-VDR ayrımı gemi tipi, GT, yapım tarihi ve Cargo/Passenger Ship Safety Equipment Record'dan doğrulanır; retention medium ile süreleri birbirine karıştırılmaz.",
        sections: [
          {
            heading: "Kayıt Edilen Veriler",
            paragraphs: [
              "Bridge audio: conning station, radar/ECDIS ve communication çalışma yerlerindeki konuşma ve sesli alarmları ayırt edecek coverage.",
              "VHF haberleşmesi: ana telsiz audio.",
              "Radar/ECDIS image: installation standard ve available interface'e göre kaydedilen display source(ları).",
              "GNSS, heading, speed, depth, AIS, rudder, engine/propulsion command-response, alarms ve gerekli diğer sources; kapsam installation date/performance standard'a bağlıdır.",
              "Capsule (Hardened/Float-free): yangın/su/derinliğe dayanıklı; pinger ile lokasyon bildirir."
            ],
            table: {
              headers: ["Veri Kaynağı", "Saklama Süresi", "Notlar"],
              rows: [
                ["Long-term recording medium", "En az 30 gün / 720 saat", "Cihaz içinde overwrite döngüsü"],
                ["Fixed recording capsule", "En az 48 saat", "Koruyucu capsule"],
                ["Float-free recording medium", "En az 48 saat", "Approved float-free arrangement varsa"],
                ["Kaynak örnekleme", "Parametreye göre", "MSC.333(90)/installation standard ve APT'den doğrula"]
              ]
            }
          }
        ],
        keyPoints: [
          "Float-free recording medium yalnız geminin onaylı VDR düzeninde varsa hydrostatic release ile serbest kalır; fixed capsule ile aynı şey değildir.",
          "Fixed capsule locating device frekans/endurance ve expiry bilgisini capsule label, type approval ve APT report'tan doğrula; sabit 30 gün varsayma.",
          "Kazadan sonra 'data save' butonuna basılır (override-protect).",
          "Yıllık APT (Annual Performance Test) yetkili servis tarafından yapılır."
        ],
        workingPrinciple: [
          "Tüm veri kaynakları VDR concentrator unit'e bağlanır.",
          "Concentrator dahili memory'ye sürekli yazar (FIFO).",
          "Kayıt aynı anda long-term medium ile installed fixed/float-free capsule'a performans standardındaki retention süresince yazılır.",
          "Kazada save butonu basılırsa tüm memory yazma korumalı hale gelir."
        ],
        operation: [
          "Power, recording, source-fault ve UTC status'u maker/PMS routine'inde kontrol et; fault'u resetleyip kaybetme.",
          "Audio/source testini maker test mode ve APT/PMS'e göre, gerçek bridge recording'i bozmayacak şekilde yap.",
          "Capsule/locating device kontrolünü APT kapsamı, expiry ve service instruction'a göre yap.",
          "Kaza/olay sonrası Master/SMS talimatıyla save/protect işlevini kullan; cihazı keyfî kapatma ve data chain-of-custody'yi koru."
        ],
        faults: [
          { fault: "Mikrofon kayıt yok", cause: "Kablo, mikrofon arızası, audio level düşük", action: "Mikrofon test, kablo kontrol, ayar." },
          { fault: "Radar/ECDIS frame eksik", cause: "Video grabber arıza, kablo", action: "Grabber test, kablo değiştir." },
          { fault: "Capsule alarm", cause: "Capsule connection broken, HRU expire", action: "Bağlantı, HRU değişim." }
        ],
        precautions: [
          "VDR memory'ye doğrudan müdahale yasak; yetkili olmayan personel veri silmemeli.",
          "Olay sonrası preservation, indirme ve teslimi company emergency/authority talimatıyla kayıt altına al; veriyi değiştirme veya overwrite riskini gecikmeden yönet.",
          "Capsule çevresini erişilebilir tut ve fiziksel survival rating'i kendi type-approval/marking'inden doğrula; internetten tek sıcaklık/derinlik değeri kopyalama."
        ]
      },
      {
        title: "Can Filikası (Lifeboat) ve Davit",
        introduction: "Lifeboat, gemi terk emrinde mürettebat ve yolcuları taşıyıp güvenli bölgeye ulaştıran SOLAS LSA Code uyumlu kapalı veya yarı kapalı tekneye verilen addır. Davit, lifeboat'u embarkation deck'ten su seviyesine indiren mekanik sistemdir. Free-fall davit ve gravity davit ana tipleridir.",
        sections: [
          {
            heading: "Lifeboat Tipleri",
            paragraphs: [
              "Totally Enclosed Lifeboat (TEL): tam kapalı, motor + air supply + sprinkler (tanker için fire-protected).",
              "Free-fall lifeboat: tankers ve bulk için yaygın; eğimli rampa üzerinden suya düşer.",
              "Partially Enclosed: yolcu gemilerinde, daha hızlı binme.",
              "Davit: Gravity (gravity-roller veya luffing arm) veya Free-fall ramp."
            ],
            table: {
              headers: ["Tip", "Avantaj", "Tipik Gemi"],
              rows: [
                ["TEL gravity", "Genel amaçlı", "Cargo, container"],
                ["Free-fall", "Hızlı, otomatik", "Tanker, bulk"],
                ["Fire-protected", "Yangın koruması", "Tanker"],
                ["Partially enclosed", "Yolcu binme kolay", "Yolcu gemisi"]
              ]
            }
          }
        ],
        keyPoints: [
          "Survival-craft tipi, borda dağılımı ve toplam kapasite Cargo/Passenger Ship Safety Equipment Record ile approved LSA plan'dan doğrulanır; free-fall alternatifinde iki bordada birer %100 lifeboat varsayılmaz.",
          "Fire-protected lifeboat/sprinkler ve self-contained air support gereği tanker adıyla genellenmez; SOLAS III, IBC/IGC ve taşınan cargo/flash-point koşulundan doğrulanır.",
          "Abandon-ship drill, swing-out/launch ve manoeuvre aralıklarını SOLAS III/19, flag exemption ve geminin drill planından uygula; personeli gereksiz risk altında 'yarım indirme' ezberine sokma.",
          "Annual thorough examination/operational test ve beş yıllık overhaul/load test kapsamı MSC.402(96), SOLAS III/20 ve maker procedure'e göre yetkili personelce yapılır; release gear ile winch-brake testlerini aynı işlem sanma."
        ],
        workingPrinciple: [
          "Davit gravity tipi: brake bırakılır, davit gravity ile dışa salınır, winch wire ile kontrollü iniş.",
          "Free-fall: release handle çekilir, lifeboat kızak üzerinden suya düşer; girişte burnu öne dalar, sonra yüzeye çıkar.",
          "Release gear, normal tahliyede tekne waterborne ve falls unloaded olduğunda off-load release için kullanılır; on-load capability acil/özel durum içindir ve yanlış kullanım ölümcül olabilir.",
          "Hydrostatic interlock, hook reset indicator ve operating handle tek bir emniyet zinciridir; reset/locked durumu her hookta fiziksel olarak maker talimatıyla doğrulanır."
        ],
        operation: [
          "Embarkation: launch alarm → muster station → lifeboat yetkili kişi binmeyi yönetir.",
          "Davit/winch'i assigned operator ve coxswain komut zincirinde çalıştır; gripes, plug, painter, falls ve lowering area checklist'ini tamamlamadan freni bırakma.",
          "Tekne waterborne, falls unloaded ve hydrostatic interlock durumu doğrulandıktan sonra approved off-load release prosedürünü uygula; hook resetini recovery öncesi iki tarafta cross-check et.",
          "Free-fall launch'ta tüm kişiler numaralı koltukta maker-approved restraint/head support pozisyonuna alınır; simulated/actual launch yalnız approved drill procedure ile yapılır."
        ],
        faults: [
          { fault: "Davit fren tutmuyor", cause: "Fren balata aşınmış, ayar bozuk", action: "Balata değişim, fren ayarı." },
          { fault: "Fall wire hasarlı (kink/korozyon/broken wires)", cause: "Yağlama, sheave hizası, deniz suyu veya yorulma", action: "Tekneyi kullanımdan çıkar; SOLAS III/20, maker discard criteria ve approved maintenance plan'a göre fall inspection/renewal yap, '5 yılda turn end-for-end' şeklinde yanlış işlem uygulama." },
          { fault: "Motor çalışmıyor", cause: "Battery zayıf, yakıt eski/su girmiş", action: "Battery şarj, yakıt drain ve yenile." },
          { fault: "On-load release açmıyor", cause: "Hidrostatik kilit takılı, hook korozyon", action: "Hook bakım, hidrostatik mekanizma test." }
        ],
        precautions: [
          "Drill/bakım sırasında secondary safety device veya fall-prevention arrangement'i yalnız maker ve MSC.402 prosedüründeki şekilde kullan; canlı yük altında hook'a müdahale etme.",
          "Free-fall release sırasında baş ve boyun arkayı destekli; PFD takılı olmalı.",
          "Davit altındaki bölgede personel olmasın (limit switch yoksa düşme riski).",
          "Yağlama düzenli; korozyon ve sıkışma kazaya yol açar."
        ]
      },
      {
        title: "Liferaft ve HRU (Hydrostatic Release Unit)",
        introduction: "Inflatable liferaft; approved container, inflation cylinder, painter/firing lanyard, weak link, lashing ve varsa HRU ile bir bütün olarak çalışır. Kapasite/pack ve float-free arrangement geminin approved LSA planı ile Safety Equipment Record'dan doğrulanır; HRU painter'ı kesmez, raft lashing'ini serbest bırakır.",
        sections: [
          {
            heading: "Yapı ve İçerik",
            paragraphs: [
              "Sert plastik konteyner (canister) içinde valise: CO₂/N₂ tüpü, tube + canopy, painter line.",
              "SOLAS A Pack, LSA Code'daki tam emergency equipment setidir; item/adet listesi service certificate ve pack marking'den doğrulanır.",
              "SOLAS B Pack yalnız Administration'ın izin verdiği short international voyage düzeninde azaltılmış pack'tir; keyfî '24 saat' sınırıyla seçilmez.",
              "Painter line: konteyner içindeki ipin ucu gemiye bağlı; gemi battığında gergin olur, raft şişer."
            ],
            table: {
              headers: ["Bileşen", "Görev"],
              rows: [
                ["Canister", "Koruyucu kabuk"],
                ["CO₂/N₂ tüp", "Şişirme"],
                ["Painter", "Otomatik açılma kordonu"],
                ["HRU", "Yaklaşık 1,5–4 m su basıncında lashing'i release"],
                ["Sea anchor", "Drift azaltma"],
                ["Pyrotechnic", "Sinyal (rocket, hand flare, smoke)"]
              ]
            }
          }
        ],
        keyPoints: [
          "HRU service/replacement ve expiry tarihini cihaz label/approval'ından doğrula; bazı düzenlerde approved non-disposable HRU bulunabilir ve raftın manual-only istifi farklı olabilir.",
          "Liferaft service aralığı SOLAS III/20.8'e göre normalde 12 ayı aşmaz; Administration kaçınılmaz durumda en çok 17 aya uzatabilir. Yalnız approved servicing station kullanılır.",
          "Liferaft/lifeboat toplam kapasite ve transfer imkânı gemi tipine/uzunluğuna göre approved LSA plan'dan okunur; her gemide POB × 2 liferaft ezberi uygulanmaz.",
          "Davit-launched liferaft: yolcu gemisinde davit ile indirilebilir."
        ],
        workingPrinciple: [
          "Manuel: painter line gemiden serbest bırakılır, raft denize fırlatılır, painter güçlü çekilince CO₂ valfi açılır → şişer.",
          "Otomatik (HRU): su basıncı HRU'yu çalıştırıp lashing'i açar; container yüzer, gemiye bağlı painter gerilerek inflation'ı tetikler, gemi batmaya devam ederse weak link kopup şişmiş raftı gemiden ayırır.",
          "Inflation/orientation süresi çevre ve type-approval'a bağlıdır; raft ters şişerse marked righting strap/procedure kullanılır."
        ],
        operation: [
          "Aylık görsel: canister sağlam, painter bağlı, HRU expiry, lashing bracket sağlam.",
          "Yıllık servis: yetkili istasyona gönder, sertifika al.",
          "Drill'de manuel atış simülasyonu (gerçek deploy değil — pahalı).",
          "Manual launch'ta painter'ın gemiye doğru strong point'ten bağlı olduğunu doğrula, container'ı engelden uzağa at ve firing lanyard çalışana kadar painter'ı çek; mümkünse embarkation ladder/davit ile kuru bin, denize atlamayı son çare say."
        ],
        faults: [
          { fault: "Canister hasarlı", cause: "Korozyon, vurma", action: "Servis." },
          { fault: "HRU eksik/expire", cause: "Süre dolmuş", action: "Yenile." },
          { fault: "Painter gevşek/kopuk", cause: "Bağlantı zayıf", action: "Yeniden bağla, weak link kontrol." }
        ],
        precautions: [
          "Liferaft konteyneri etrafında istif/eşya bulunmamalı; gemi battığında serbest yüzmeli (free-floating).",
          "HRU 'weak link' painter ile gemi arasındadır; gemi battığında painter çekilir, raft şişer ve weak link kopar (raft kurtulur).",
          "Pyrotechnic expiry tarihini item label/service certificate'tan izle; sabit 5 yıl varsayma ve expired item'i approved shore disposal zincirine teslim et.",
          "Liferaft yıllık servis sertifikası gemide bulundurulmalı (PSC kontrolü)."
        ]
      },
      {
        title: "Rescue Boat ve Fast Rescue Boat (FRB)",
        introduction: "Rescue boat, sudan kişi kurtarma ve survival craft toplama için approved launching appliance ile hazır tutulan teknedir. Cargo ship'te uygun bir lifeboat rescue boat olarak onaylanabilir; fast rescue boat (FRB) ise özellikle ro-ro passenger ship hükümleri ve Safety Equipment Record üzerinden doğrulanır.",
        sections: [
          {
            heading: "Tipler ve Donanım",
            paragraphs: [
              "Rescue boat: rigid (RIB) veya inflatable; 5+ kişi kapasiteli.",
              "Fast Rescue Boat (FRB): ro-ro passenger ship'te en az bir adet aranır; diğer gemilerde approved arrangement'e bağlıdır. Hız/endurance kriteri full complement ile farklı olabilir.",
              "Davit: tek nokta veya çift nokta; hızlı launch için single-fall davit yaygın.",
              "Donanım: outboard veya inboard motor, fender, painter, paddle, first aid, light, anchor."
            ],
            table: {
              headers: ["Özellik", "Rescue Boat", "FRB"],
              rows: [
                ["Hız", "Genel kriter ≥6 knot / ≥4 saat", "Crew of 3 ile ≥20 knot; full complement ile ≥8 knot"],
                ["Kapasite", "5 kişi + sedye", "5 kişi + sedye"],
                ["Launch süresi", "<5 dk", "<5 dk"],
                ["Crew", "Eğitimli mürettebat", "Sertifikalı FRB crew"]
              ]
            }
          }
        ],
        keyPoints: [
          "Lifeboat aynı zamanda rescue boat olarak da onaylıysa ayrı rescue boat zorunlu değil (yük gemileri).",
          "Rescue boat mümkün olduğu ölçüde aylık, her durumda en az üç ayda bir assigned crew ile launch/manoeuvre edilir; exact drill ve exemption SOLAS III/19 ile logdan doğrulanır.",
          "FRB fitted ise assigned coxswain/crew için STCW fast-rescue-boat competence ve gemi familiarization'ı doğrulanır; bütün mürettebat için aynı sertifika aranmaz.",
          "Outboard motor yakıtı ayrı tank, taze, su kontaminasyonsuz olmalı."
        ],
        workingPrinciple: [
          "Davit gravity ile veya hidrolik ile boat'u dışa salar.",
          "Single-fall davit ile hızlı iniş; suda quick-release ile fall serbest bırakılır.",
          "Motor start, mürettebat MOB veya raft'a yönelir.",
          "Recovery: boat altına horse-collar, hook bağlanır, davit ile yukarı çekilir."
        ],
        operation: [
          "Vardiya başı: motor yakıt, battery, lashing, painter kontrol.",
          "Launch alarm: 2 kişi rescue boat'a, davit operatörü hidrolik açar, boat suya iner.",
          "Suda motor start, görev yap, geri dön, hook tak, davit ile çek.",
          "Launch/manoeuvre drill ile annual/five-year davit-release examination/testlerini SOLAS III/19-20, MSC.402 ve maker maintenance planına göre ayrı ayrı uygula."
        ],
        faults: [
          { fault: "Outboard motor start vermiyor", cause: "Yakıt eski, buji kirli, primer pump hatalı", action: "Yakıt yenile, buji temizlik, pump test." },
          { fault: "Hidrolik davit yavaş", cause: "Yağ az, pompa zayıf, valf takılı", action: "Yağ ekle, pompa servis, valf bakım." },
          { fault: "Quick-release açmıyor", cause: "Korozyon, mekanizma takılı", action: "Bakım, yağlama, test." }
        ],
        precautions: [
          "Boat altında personel olmamalı; düşme riski.",
          "Outboard motor egzozu CO içerir; uzun süre boş çalıştırma kapalı alanda yapılmamalı.",
          "Recovery sırasında dalga koşullarına dikkat; hook çıkması ölümcül.",
          "FRB/rescue-boat drill PPE'sini approved boat manual, risk assessment, su/hava koşulları ve company procedure'e göre seç; lifejacket ve iletişim düzenini eksiksiz doğrula."
        ]
      }
    ]
  }
};
