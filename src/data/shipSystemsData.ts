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
          "Funda hızı genellikle 5-9 şakel/dakika, vira hızı 2 şakel/dakikadır.",
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
              "Safe Working Load (SWL), vincin güvenle kaldırabileceği maksimum ağırlıktır. Proof load test, SWL'nin 1.25 katı statik yük ile yapılır.",
              "ILO Convention 152 ve SOLAS Chapter II-1 gereği, kaldırma donanımları 5 yılda bir test edilir. Yıllık kapsamlı muayene (thorough examination) yapılır."
            ],
            table: {
              headers: ["SWL Aralığı", "Proof Load", "Test Sıklığı"],
              rows: [
                ["≤ 20 ton", "1.25 × SWL", "5 yılda bir"],
                ["20 – 50 ton", "SWL + 5 ton", "5 yılda bir"],
                ["> 50 ton", "1.10 × SWL", "5 yılda bir"]
              ]
            }
          },
          {
            heading: "Kaldırma Kapasitesi Hesabı",
            paragraphs: [],
            formula: {
              expression: "M = F × L × cos(θ)",
              variables: [
                "M: Devirme momenti (kN·m)",
                "F: Kaldırılan yük (kN)",
                "L: Bumba uzunluğu (m)",
                "θ: Bumba açısı (derece)"
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
          "Tel halatlar yıllık görsel + periyodik NDT kontrolünden geçmeli.",
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
        introduction: "Ambar kapakları, yük ambarlarını deniz suyu, yağmur ve dalga etkilerinden koruyan su geçirmez kapama sistemleridir. SOLAS Chapter II-1 ve IACS UR S21 gerekliliklerine uygun olmalıdır.",
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
              "Kauçuk contalar (rubber packing) ambar kapağı ile coaming arasında su geçirmezlik sağlar. Compression bar contayı sıkıştırır.",
              "Hose test: Contaların su geçirmezliğini test etmek için dışarıdan basınçlı su uygulanır. İçeriden sızıntı kontrol edilir.",
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
              result: "3 tur sarım ile 200 N kuvvet uygulanarak yaklaşık 22.3 kN (≈ 2.3 ton) yük tutulabilir."
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
          "Halat sarım sayısı arttıkça tutma kuvveti üstel olarak artar.",
          "Bollard SWL değeri, bağlanan halatın kopma yükünün en az %80'i olmalıdır.",
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
          "Tüm güverte donanımı periyodik NDT/görsel muayeneye tabi tutulmalı."
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
        introduction: "Deniz radarı, mikrodalga sinyalleri göndererek çevredeki hedeflerin mesafe, kerteriz ve hareketini tespit eden birincil seyir güvenliği cihazıdır. SOLAS Chapter V Regulation 19 gereği tüm ticari gemilerde bulunması zorunludur.",
        sections: [
          {
            heading: "Çalışma Prensibi",
            paragraphs: [
              "Radar, magnetron veya solid-state verici tarafından üretilen kısa süreli mikrodalga darbelerini (pulse) anten aracılığıyla gönderir. Hedeften yansıyan sinyal (echo) alıcı tarafından işlenir.",
              "Mesafe, sinyalin gidiş-dönüş süresinden hesaplanır. Kerteriz, antenin hedefi algıladığı andaki dönme açısıyla belirlenir."
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
            heading: "X-Band ve S-Band",
            paragraphs: [],
            table: {
              headers: ["Özellik", "X-Band (9 GHz)", "S-Band (3 GHz)"],
              rows: [
                ["Dalga boyu", "3 cm", "10 cm"],
                ["Çözünürlük", "Yüksek", "Düşük"],
                ["Yağmur etkisi", "Etkilenir (rain clutter)", "Daha az etkilenir"],
                ["Racon algılama", "Evet", "Evet"],
                ["SART algılama", "Evet (zorunlu)", "Hayır"],
                ["Zorunluluk", "Tüm gemiler", "≥ 3000 GT"]
              ]
            }
          },
          {
            heading: "ARPA (Automatic Radar Plotting Aid)",
            paragraphs: [
              "ARPA, radar hedeflerini otomatik olarak takip eder ve CPA (Closest Point of Approach) ile TCPA (Time to CPA) değerlerini hesaplar.",
              "En az 20 hedefi eşzamanlı takip edebilmelidir. Hedef edinme (acquisition) 1 dakikada, takip (tracking) 3 dakikada kararlı hale gelmelidir.",
              "Trial manoeuvre özelliği ile planlanan kurs veya hız değişikliğinin hedeflere etkisi önceden görülebilir."
            ]
          }
        ],
        keyPoints: [
          "Radar, COLREG Rule 7 gereği çatışma riski değerlendirmesinde kullanılmalıdır.",
          "Paralel index tekniği ile kıyı seyrinde güvenli rota takibi yapılır.",
          "Radar reflektör (RTE) küçük hedeflerin algılanmasını kolaylaştırır.",
          "EBL (Electronic Bearing Line) ve VRM (Variable Range Marker) temel ölçüm araçlarıdır."
        ],
        workingPrinciple: [
          "Magnetron veya solid-state verici, X-band (9 GHz) veya S-band (3 GHz) mikrodalga darbe üretir.",
          "Anten dönerken darbeyi yayar; hedeflerden yansıyan eko alıcıya döner.",
          "Gidiş-dönüş süresinden mesafe, anten azimutundan kerteriz hesaplanır.",
          "ARPA, hedefleri otomatik takip ederek CPA/TCPA hesaplar."
        ],
        operation: [
          "Stand-by'dan transmit'e geç; magnetron için warm-up süresini bekle.",
          "Range, gain, sea clutter ve rain clutter'ı koşula göre ayarla.",
          "EBL/VRM ile kerteriz ve mesafe ölçümü yap.",
          "ARPA'da hedefi acquire et, vector ve trail göster.",
          "Trip sonunda vericiyi stand-by'a al, anten frenini sık."
        ],
        faults: [
          { fault: "Eko zayıf veya yok", cause: "Magnetron yaşlanmış, antenna feed arızalı", action: "Magnetron performansını ölç, gerekirse değiştir." },
          { fault: "Anten dönmüyor", cause: "Motor/redüktör arızası, fren takılı", action: "Motoru kontrol et, freni serbest bırak." },
          { fault: "Aşırı parazit (clutter)", cause: "Hatalı tuning, çevre koşulları", action: "Sea/rain clutter ve gain'i ayarla, FTC/STC kullan." },
          { fault: "ARPA hedef kayıp", cause: "Heading/speed input kesik, gyro/log arızası", action: "Sensör girdisi ve kabloyu kontrol et." },
          { fault: "Ekran karanlık", cause: "Güç beslemesi/PSU arızası", action: "Sigorta ve PSU'yu kontrol et." }
        ],
        precautions: [
          "Anten alanında çalışırken vericiyi stand-by'a al ve LOTO uygula.",
          "Mikrodalga radyasyon riskine karşı yakın mesafede durma.",
          "Performance Monitor (PM) ile periyodik performans kontrolü yap.",
          "Sigorta değişiminde sadece üreticinin tipini kullan."
        ]
      },
      {
        title: "ECDIS (Elektronik Harita Sistemi)",
        introduction: "ECDIS (Electronic Chart Display and Information System), kâğıt haritanın yasal eşdeğeri olarak kabul edilen elektronik seyir sistemidir. IMO MSC.232(82) performans standartlarına uygun olmalıdır.",
        sections: [
          {
            heading: "ENC ve RNC",
            paragraphs: [
              "ENC (Electronic Navigational Chart): IHO S-57/S-101 standardında vektör harita. Katmanlar halinde bilgi içerir ve sorgulanabilir. ECDIS'in yasal geçerlilik için ENC kullanması gerekir.",
              "RNC (Raster Navigational Chart): Kâğıt haritanın taranmış dijital kopyası. Ölçekleme sınırlıdır ve sorgulanamaz. Yalnızca RCDS modunda ve kâğıt harita desteği ile kullanılabilir."
            ]
          },
          {
            heading: "ECDIS Zorunlulukları",
            paragraphs: [
              "IMO ECDIS taşıma programı (MSC.282(86)) gereği tüm SOLAS gemileri iki adet onaylı ECDIS taşımak zorundadır. Yedek düzenleme olarak ikinci bir bağımsız ECDIS veya güncel kâğıt haritalar kabul edilir.",
              "Haftalık ENC güncellemeleri uygulanmalıdır. Güncelleme yapılmadan seyir, ISM Code ihlali sayılabilir."
            ]
          },
          {
            heading: "Alarm ve Gösterim Ayarları",
            paragraphs: [
              "Safety contour: Geminin güvenli su derinliği sınırı. ECDIS bu konturu geçildiğinde uyarı verir.",
              "Safety depth: Haritadaki derinlik değerlerinin vurgulanma sınırı.",
              "Cross-track distance (XTD): Planlanan rotadan izin verilen sapma mesafesi.",
              "Look-ahead: İleri bakış mesafesi; yaklaşan sığlıklar ve tehlikeler için uyarı verir."
            ]
          }
        ],
        keyPoints: [
          "ECDIS, seyir planlaması ve takibi için birincil araçtır.",
          "Over-reliance (aşırı güven) en büyük tehlikedir; her zaman pencereden dışarı bakılmalıdır.",
          "Datum uyumsuzluğu (harita datumu ile GPS datumu farkı) konumlandırma hatasına neden olabilir.",
          "ECDIS type-specific training sertifikası zorunludur."
        ],
        workingPrinciple: [
          "ENC (Electronic Navigational Chart) verisi vektörel olarak yüklenir.",
          "GPS, gyro, log, AIS, radar, echo sounder girdileri sensör entegrasyonu ile gösterilir.",
          "Route planning ve monitoring fonksiyonu safety contour, no-go area uyarılarını sağlar.",
          "Voyage data ve alarms VDR'a kaydedilir."
        ],
        operation: [
          "Trip öncesi ENC update'lerini yükle (haftalık).",
          "Safety depth, safety contour ve XTD değerlerini gemi draftına göre ayarla.",
          "Rotayı planla; hesap kontrolü (route check) ile uyarıları çöz.",
          "Voyage'da monitoring modunda alarmları izle, gerekirse manuel position fix yap.",
          "Backup ECDIS veya kâğıt harita prosedürünü hazır tut."
        ],
        faults: [
          { fault: "Pozisyon donuk/kayıp", cause: "GPS girdisi kesik", action: "GPS antenini ve kabloyu kontrol et, secondary GPS'e geç." },
          { fault: "ENC güncel değil uyarısı", cause: "Update yapılmamış", action: "Hemen güncelleme yükle, rota güvenliğini doğrula." },
          { fault: "Sistem donuyor", cause: "Yazılım hatası, bellek yetersiz", action: "Yedek üniteye geç, sistemi yeniden başlat." },
          { fault: "Alarm sürekli ötüyor", cause: "Hatalı safety değerleri", action: "Parametreleri yeniden gözden geçir." }
        ],
        precautions: [
          "İki onaylı ECDIS yoksa kâğıt harita yedeği bulundur.",
          "Sadece eğitim sertifikalı (Type Specific) zabitler kullanmalı.",
          "Sistem yazılımı IHO S-52/S-63 standardında olmalı.",
          "ENC'leri sadece resmi (HO) kaynaklardan yükle."
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
                ["Statik", "6 dakikada bir", "MMSI, IMO no, gemi adı, gemi tipi, boyutlar"],
                ["Dinamik", "2-10 saniye", "Konum (GPS), kurs, hız, dönme oranı, seyir durumu"],
                ["Sefere ilişkin", "6 dakikada bir", "Draft, yük tipi, varış limanı, ETA, kişi sayısı"]
              ]
            }
          },
          {
            heading: "Class A ve Class B",
            paragraphs: [
              "Class A: Tüm SOLAS gemileri için zorunlu. 12.5 W çıkış gücü, SOTDMA erişim protokolü. 2 saniye aralıklarla güncelleyebilir.",
              "Class B: Küçük tekneler ve ticari olmayan gemiler için. 2-5 W çıkış gücü, CSTDMA protokolü. Güncelleme aralıkları daha uzundur."
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
          "Class A (SOLAS gemi) ve Class B (küçük tekne) cihazları farklı güç/oranda yayın yapar."
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
        introduction: "Küresel Konumlandırma Sistemi (GPS), uydu sinyalleri aracılığıyla geminin enlem ve boylamını belirleyen birincil konum belirleme sistemidir. SOLAS Chapter V gereği en az bir adet onaylı GPS alıcısı zorunludur.",
        sections: [
          {
            heading: "GPS Çalışma Prensibi",
            paragraphs: [
              "GPS, en az 4 uydudan gelen sinyal ile alıcının konumunu ve saatini hesaplar. Her uydu kendi konumunu ve sinyal gönderim zamanını yayınlar. Alıcı, sinyalin ulaşma süresinden mesafeyi hesaplar.",
              "GPS doğruluğu standart modda ±10-15 metre, DGPS ile ±1-3 metredir."
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
          "DGPS, kıyı istasyonundan düzeltme alarak doğruluğu metre altına indirir.",
          "GNSS, GPS + GLONASS + Galileo + BeiDou'yu birlikte kullanarak güvenilirliği artırır."
        ],
        operation: [
          "Anteni gölgesiz açık alana monte et.",
          "Cold start sonrası ilk fix 12 dakikaya kadar sürebilir.",
          "DGPS düzeltmesi varsa devreye al; HDOP değerini izle (< 4 iyi).",
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
          "SOLAS gereği her gemide en az bir manyetik pusula ve gyro pusula bulunmalıdır.",
          "Gyro error her vardiyada astronomik veya transit kerteriz ile kontrol edilir.",
          "Manyetik pusula yedek pusula olarak daima çalışır durumda tutulmalıdır.",
          "Deviation tablosu düzenli olarak (yılda bir) güncellenmelidir."
        ],
        workingPrinciple: [
          "Gyro pusula, hızla dönen rotorun hareketsizlik (gyroscopic inertia) prensibiyle gerçek kuzeyi bulur.",
          "Sıvı veya elektrostatik damping ile salınımı söndürür.",
          "Manyetik pusula, kart üzerindeki mıknatısın yer manyetik alanına yönelmesi ile manyetik kuzeyi gösterir.",
          "Compass error = Variation + Deviation."
        ],
        operation: [
          "Gyro'yu trip öncesi en az 4 saat önce çalıştır (settling time).",
          "Latitude ve speed correction'ı manuel ayar gerektiriyorsa gir.",
          "Manyetik pusulayı periyodik (her vardiya) deviation kontrolü için kerteriz al.",
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
          "Yıllık compass adjustment yapılmalı.",
          "Acil durumda manyetik pusula primer kaynak olduğundan her zaman çalışır durumda olmalı."
        ]
      },
      {
        title: "Echo Sounder (İskandil)",
        introduction: "Echo sounder, geminin altındaki su derinliğini ultrasonik darbeler ile ölçen cihazdır. SOLAS Chapter V Regulation 19 gereği tüm gemilerde zorunludur.",
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
          "Echo sounder UKC izleme için zorunlu; sığ sularda sürekli açık kalmalı.",
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
        introduction: "İki zamanlı düşük devirli dizel motorlar, büyük ticari gemilerin ana tahrik makinesidir. 80-120 rpm arasında çalışır ve pervaneyi doğrudan (direkt tahrikle) döndürür. MAN B&W, WinGD (Wärtsilä) ve Mitsubishi başlıca üreticilerdir.",
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
              expression: "BHP = (P_mep × L × A × N × n) / (60 × 1000)",
              variables: [
                "P_mep: Ortalama efektif basınç (kPa)",
                "L: Strok boyu (m)",
                "A: Piston alanı (m²)",
                "N: Devir sayısı (rpm)",
                "n: Silindir sayısı"
              ]
            },
            example: {
              problem: "6 silindirli, 900 mm çapında, 2 500 mm stroklu, 100 rpm'de çalışan ve P_mep = 1 800 kPa olan bir motorun gücünü hesaplayınız.",
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
              "Common rail veya mekanik enjeksiyon sistemi kullanılır. Common rail sistemde yakıt basıncı 600-1 000 bar arasında sabit tutulur ve elektronik kontrollü enjektörler ile silindirlere verilir.",
              "VIT (Variable Injection Timing): Yük durumuna göre enjeksiyon zamanlaması değiştirilir. Düşük yüklerde erken enjeksiyon, yüksek yüklerde geç enjeksiyon optimum yanma sağlar."
            ]
          }
        ],
        keyPoints: [
          "İki zamanlı motor tek yönlü döner; geri yol için motor durdurulup ters yönde çalıştırılır (FPP ile).",
          "Silindir yağlaması ayrı bir yağlama sistemiyle (alpha lubricator veya pulse jet) yapılır.",
          "Scavenge fire (süpürme yangını), süpürme havasındaki yağ birikimiyle oluşur; scavenge drain düzenli boşaltılmalıdır.",
          "SFOC (Specific Fuel Oil Consumption) genellikle 160-180 g/kWh arasındadır."
        ],
        workingPrinciple: [
          "Her krank turunda bir iş çevrimi (emme+sıkıştırma+iş+egzoz) tamamlanır.",
          "Egzoz uniflow scavenging ile silindirin üst tarafından, hava süpürme alttan yapılır.",
          "Direct drive olarak doğrudan pervaneyi döndürür (50-120 rpm).",
          "Crosshead yapısı sayesinde piston kuvveti yan kuvvete çevrilmeden krank şaftına iletilir."
        ],
        operation: [
          "Start havası basıncını (~30 bar) ve yağ basıncını kontrol et.",
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
          "Crankcase açma sonrası en az 20 dakika bekle (oil mist patlama riski).",
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
          "Karter kapağı açma 20 dk soğuma sonrası yapılmalı.",
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
              expression: "T = (P_D × η_P) / V_A",
              variables: [
                "T: İtme kuvveti (N)",
                "P_D: Pervaneye iletilen güç (W)",
                "η_P: Pervane verimi",
                "V_A: İlerleme hızı (m/s)"
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
        introduction: "Dümen sistemi, geminin yön değiştirmesini sağlayan kritik güvenlik ekipmanıdır. SOLAS Chapter II-1 Regulation 29 gereği ana ve yedek dümen sistemleri zorunludur.",
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
              "SOLAS gereği en az 2 bağımsız güç ünitesi ve bağımsız kontrol sistemi bulunmalıdır.",
              "Ana dümen 35° bir taraftan 35° diğer tarafa 28 saniyede dönebilmelidir.",
              "Yedek dümen 15° bir taraftan 15° diğer tarafa 60 saniyede dönebilmelidir."
            ]
          },
          {
            heading: "Dümen Kuvveti Hesabı",
            paragraphs: [],
            formula: {
              expression: "F_N = K × A × V² × sin(α)",
              variables: [
                "F_N: Dümen normal kuvveti (N)",
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
                "F_N = 580 × 10 × 6.17² × sin(35°)",
                "F_N = 580 × 10 × 38.07 × 0.574",
                "F_N = 126 700 N ≈ 126.7 kN"
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
    description: "Jeneratör, kompresör, pompa, separatör, kazanlar ve tüm yardımcı sistemler",
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
          "SOLAS gereği acil jeneratör 45 saniye içinde otomatik devreye girmelidir.",
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
          "Emergency generator haftalık otomatik test ile çalıştırılmalı."
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
              "Kazan suyunun pH değeri 10.5-11.5 arasında tutulmalıdır. Düşük pH korozyona, yüksek pH köpürmeye (priming/foaming) neden olur.",
              "Klorür (Cl⁻): < 300 ppm. Yüksek klorür kırgın korozyonuna (caustic embrittlement) neden olur.",
              "Toplam sertlik (TH): 0 ppm olmalıdır. Kalsiyum ve magnezyum tortu (scale) oluşumunu önler.",
              "Kimyasal işlem: Fosfat, sülfit ve hidrazin gibi kimyasallar oksijen giderme ve pH kontrolü için kullanılır."
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
          "Yakmadan önce furnace purge (en az 3 dakika) yap.",
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
              expression: "r_i = r_o × √(ρ_w / ρ_f)",
              variables: [
                "r_i: Gravity disc iç yarıçapı",
                "r_o: Dış yarıçap (sabit)",
                "ρ_w: Su yoğunluğu (1.025 g/cm³)",
                "ρ_f: Yakıt yoğunluğu (g/cm³)"
              ]
            },
            example: {
              problem: "Dış yarıçapı 150 mm olan separatörde 0.960 g/cm³ yoğunluktaki yakıt için gravity disc yarıçapını hesaplayınız.",
              steps: [
                "r_i = 150 × √(1.025 / 0.960)",
                "r_i = 150 × √(1.0677)",
                "r_i = 150 × 1.0333",
                "r_i = 155.0 mm"
              ],
              result: "155 mm iç yarıçaplı gravity disc kullanılmalıdır. Katalogdan en yakın değer seçilir."
            }
          },
          {
            heading: "Arıtma Sırası",
            paragraphs: [
              "HFO arıtma sırası: Settling tank → Purifier → Clarifier → Service tank → Motor.",
              "Yakıt sıcaklığı arıtma öncesi 98°C'ye (HFO için) ısıtılmalıdır. Düşük sıcaklık viskoziteyi artırır ve ayrışma verimini düşürür.",
              "Debi ayarı kritiktir; yüksek debi ayrışma kalitesini düşürür. Üretici tavsiye debisinin aşılmaması gerekir."
            ]
          }
        ],
        keyPoints: [
          "Yanlış gravity disc su veya yakıt kaybına neden olur.",
          "Otomatik desludge (çamur boşaltma) zamanlaması yakıt kalitesine göre ayarlanır.",
          "Separatör dengesi (balance) bozulursa titreşim ve mekanik hasar oluşur.",
          "Yağ arıtmada su oranı %0.1'in altında tutulmalıdır."
        ],
        workingPrinciple: [
          "Yüksek devirde dönen bowl içinde merkezkaç kuvvet ile yağ-su-tortu ayrışır.",
          "Yoğun olan su ve tortu çevreye, hafif olan yağ merkeze yönelir.",
          "Gravity disc çapı, yakıt-su arayüzü konumunu belirler; yakıt yoğunluğuna göre seçilir.",
          "Otomatik desludging sistemi tortu boşaltma kapağını periyodik açar."
        ],
        operation: [
          "Yakıt ön ısıtmasını ayarla (HFO için ~98 °C).",
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
              "Ana makine çalıştırma havası 25-30 bar basınçta hava şişelerinde depolanır. SOLAS gereği en az 2 adet hava şişesi bulunmalıdır ve her biri motorun 6 ardışık çalıştırmasını sağlayacak kapasitede olmalıdır.",
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
          "Discharge sıcaklığı 140 °C'nin altında tutulmalı.",
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
          "Yangın pompası ve emergency fire pump haftalık test edilmeli.",
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
          "Liman yakınında (kıyıdan 20 NM içinde) tatlı su üretimi yapılmamalıdır (kirli su).",
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
          "Liman ve kıyıya yakın bölgelerde (kirli su) FWG çalıştırılmamalı.",
          "Üretilen su içme amaçlı kullanılacaksa UV/silver/klorlama yapılmalı.",
          "Periyodik mikrobiyolojik analiz yapılmalı.",
          "Asit temizliğinde uygun PPE (yüz maskesi, eldiven) kullanılmalı."
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
        introduction: "Yangın devre pompası, gemideki yangın hidrantlarına ve sabit söndürme sistemlerine basınçlı deniz suyu sağlayan ana pompadır. SOLAS gereği iki bağımsız yangın pompası ve bir adet acil yangın pompası (emergency fire pump) bulunur.",
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
          "SOLAS Reg. II-2/10 gereği minimum 2 bağımsız yangın pompası zorunludur.",
          "Acil yangın pompası kendi yakıt tankı ve bağımsız enerji kaynağına sahiptir.",
          "Hidrant basıncı genelde 2.7–4 bar, debi gemi tonajına göre belirlenir."
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
          "Haftalık test sırasında hidrantı aç ve debi/basıncı doğrula."
        ],
        faults: [
          { fault: "Pompa basınç vermiyor", cause: "Suction tıkalı, hava emiyor, impeller aşınmış", action: "Strainer temizle, pompayı priming et, impeller kontrol et." },
          { fault: "Acil yangın pompası start almıyor", cause: "Akü zayıf, yakıt yok", action: "Akü ve yakıt seviyesini kontrol et, manuel start dene." },
          { fault: "Hat basıncı düşüyor", cause: "Hat üzerinde sızıntı, valfler tam kapanmamış", action: "Hattı izle, valfleri sıkıştır, sızıntı noktasını ara." }
        ],
        precautions: [
          "Acil yangın pompası haftalık test edilmeli ve kayıt tutulmalı.",
          "Hidrant valfleri ve hortumları açık/kapalı pozisyonda korozyona karşı denetlenmeli.",
          "ISC bağlantısı kolay erişilebilir yerde, gri renk ve etiketli olmalı.",
          "Kış aylarında açık güverte hatlarında donma önlemi alınmalı."
        ]
      },
      {
        title: "CO₂ Sabit Söndürme Sistemi",
        introduction: "CO₂ sistemi, makine dairesi, kargo ambarı ve yakıt tankı gibi kapalı hacimlerde yangını oksijensiz bırakarak söndüren sabit gaz söndürme sistemidir. Yüksek basınçlı CO₂ silindirleri özel bir bottle room'da depolanır.",
        sections: [
          {
            heading: "Sistem Bileşenleri",
            paragraphs: [
              "Yüksek basınç (HP) CO₂ silindirleri ~50 bar basınçta sıvı CO₂ içerir; en yaygın gemi tipi.",
              "Pilot silindir, master valfi ve manifold valflerini açan kontrol gazını sağlar.",
              "Time delay (zaman geciktirici) personelin tahliyesi için 20–60 sn bekleme süresi sağlar.",
              "Discharge nozülleri korunan hacme dağıtılmıştır; tasarım konsantrasyon makine dairesi için %40 hacim oranında CO₂."
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
          "Boğulma riski nedeniyle CO₂ odasına giriş için EEBD/SCBA zorunludur.",
          "Yıllık dış muayene, 5 yılda bir hidrostatik test (silindir tartımı %10 kayıpta yenilenir)."
        ],
        workingPrinciple: [
          "CO₂ ortamdaki oksijeni seyrelterek yanma reaksiyonunu durdurur.",
          "Pilot silindiri açıldığında pnömatik basınç master valfi ve istenen sayıda silindiri tetikler.",
          "Gaz manifolddan dağıtılır; nozüllerden hacme yayılır.",
          "%34'ün altında oksijen konsantrasyonu yangını söndürür; CO₂ tasarımı bunu garanti eder."
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
          "Release box mühürlü tutulmalı; mühür kırıldığında köprüüstüne bildirim gider.",
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
          "MARPOL ve SOLAS, tankerlerde güverte foam sistemini zorunlu kılar.",
          "Foam konsantresi tipik %3 veya %6 oranında karıştırılır.",
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
          "Yolcu gemilerinde aksanmadığı yatak/salon mahallerinde sprinkler zorunludur.",
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
          "Aylık manometre/akış kontrolü yap.",
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
          "Yıllık kapsamlı sertifikasyon ve hidrostatik test yapılmalı."
        ]
      },
      {
        title: "Inert Gas Sistemi (IGS)",
        introduction: "Inert gas sistemi, ham petrol ve ürün tankerlerinde kargo tanklarındaki oksijeni %5'in altına düşürerek patlayıcı atmosfer oluşumunu engeller. Boiler flue gazı veya inert gas jeneratörü ile üretilir.",
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
          "SOLAS Reg. II-2/4.5.5: 8000 DWT üzeri tankerlerde IGS zorunludur.",
          "Inert gas O₂ < %5, pozitif basınç altında tutulmalıdır.",
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
          "Yatak alanlarında hem duman dedektörü hem otomatik sprinkler bulunmalıdır.",
          "Alarm panelinde yangın bölgesi, gözetim arızası ve test fonksiyonları bulunur.",
          "Fail-safe: kablo kopması arıza alarmı vermelidir."
        ],
        workingPrinciple: [
          "Duman dedektöründe optik oda; partikül girince ışık saçılır ve fotosel sinyali artar.",
          "Sabit sıcaklık dedektöründe bimetal/eutektik elemanı eşik sıcaklıkta devreyi kapatır.",
          "Sinyal merkezi panel tarafından bölgeye eşleştirilir, görsel + sesli alarm verilir."
        ],
        operation: [
          "Panelden günlük lamp test ve haftalık bölge testi yapılır.",
          "Test gazı/aerosolü ile yıllık dedektör testi (PSC kontrolünde sorulur).",
          "Yatakhane dedektörleri 6 ayda bir tozdan temizlenmeli.",
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
          "Söndürücüler 1.5 m yükseklikte, kolay erişilebilir ve etiketli olmalıdır.",
          "Yıllık servis, 10 yılda bir hidrostatik test zorunludur."
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
          "SOLAS gereği her yatak alanı, makine dairesi ve kontrol odasında EEBD bulunmalı.",
          "Gemide en az 2 SCBA seti ve her seti için 2 yedek tüp zorunludur (yangın takımı).",
          "Yangın takımı: SCBA + yangın elbisesi + eldiven + bot + kask + can ipi + balta + el feneri."
        ],
        workingPrinciple: [
          "Yüksek basınçlı tüp (200–300 bar) hava regülatörden orta basınca düşer.",
          "Demand valf, kullanıcı nefes aldıkça maskeye hava verir.",
          "Düşük basınç düdüğü ~55 bar'da çalar; geri dönüş zamanını bildirir."
        ],
        operation: [
          "Kullanım öncesi tüp basıncını kontrol et (>%80 dolu olmalı).",
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
          "SCBA tüpü için 5 yıllık hidrostatik test sertifikası gerekli.",
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
  }
};
