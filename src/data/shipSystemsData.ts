// Gemi Sistemleri ve Ekipmanları — Alt konu içerikleri

export interface ShipSystemTopic {
  title: string;
  introduction: string;
  sections: {
    heading: string;
    paragraphs: string[];
    table?: { headers: string[]; rows: string[][] };
    formula?: { expression: string; variables: string[] };
    example?: { problem: string; steps: string[]; result: string };
  }[];
  keyPoints: string[];
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
        ]
      }
    ]
  }
};
