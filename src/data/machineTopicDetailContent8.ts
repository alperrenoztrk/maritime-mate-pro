import type { MachineSubTopicContent } from "./machineTopicDetailContent";

type ContentMap = Record<string, Record<string, MachineSubTopicContent>>;

const content8: ContentMap = {
  // ═══════════════════════════════════════════════════════════════
  // GEMİ ELEKTRİK SİSTEMLERİ
  // ═══════════════════════════════════════════════════════════════
  electrical: {
    "Senkron jeneratör çalışma prensibi": {
      title: "Senkron Jeneratör Çalışma Prensibi",
      introduction:
        "Senkron jeneratör, rotorun dönüş hızı ile stator çıkış frekansının doğrudan orantılı olduğu AC elektrik üretim makinesidir. Gemilerde ana ve yardımcı güç üretiminde kullanılan temel elektrik makinesidir.",
      sections: [
        {
          heading: "Çalışma Prensibi",
          paragraphs: [
            "Senkron jeneratörde rotor, DC uyarma akımı ile manyetik alan oluşturur. Rotor döndüğünde bu manyetik alan stator sargılarını keser ve Faraday'ın elektromanyetik indüksiyon yasasına göre EMK (elektromotor kuvvet) indüklenir.",
            "Üç fazlı sistemde stator sargıları birbirinden 120° mekanik açı ile yerleştirilmiştir. Bu düzen, birbirine göre 120° faz farkına sahip üç sinüsoidal gerilim üretir."
          ]
        },
        {
          heading: "Frekans ve Kutup İlişkisi",
          paragraphs: [
            "Çıkış frekansı, rotorun devir hızı ve kutup sayısına bağlıdır."
          ],
          formula: {
            expression: "f = (n × P) / 120",
            variables: [
              "f = frekans (Hz)",
              "n = devir hızı (d/d)",
              "P = kutup sayısı"
            ]
          },
          example: {
            problem:
              "4 kutuplu bir jeneratör 60 Hz frekansında çalışacaksa devir hızı kaç olmalıdır?",
            steps: [
              "f = (n × P) / 120",
              "60 = (n × 4) / 120",
              "n = (60 × 120) / 4"
            ],
            result: "n = 1800 r/min. The generator must rotate at 1800 revolutions per minute."
          }
        },
        {
          heading: "İndüklenen EMK",
          paragraphs: [
            "Stator sargısında indüklenen EMK etkin (RMS) değeri sargı faktörü, frekans, manyetik akı ve sarım sayısına bağlıdır."
          ],
          formula: {
            expression: "E = 4,44 × f × N × Φ × kw",
            variables: [
              "E = indüklenen EMK (V)",
              "f = frekans (Hz)",
              "N = sarım sayısı",
              "Φ = manyetik akı (Wb)",
              "kw = sargı faktörü (≈ 0,9-0,96)"
            ]
          }
        },
        {
          heading: "Uyarma Sistemleri",
          paragraphs: [],
          table: {
            headers: ["Uyarma Tipi", "Açıklama", "Avantajı"],
            rows: [
              ["Fırçalı uyarma", "Slip ring üzerinden DC besleme", "Basit yapı"],
              ["Fırçasız (brushless)", "Döner diyotlu exciter sistemi", "Bakım kolaylığı"],
              ["Statik uyarma", "Ana çıkıştan SCR ile besleme", "Hızlı cevap"],
              ["PMG destekli", "Kalıcı mıknatıs jeneratör ön besleme", "Kısa devre akımı kapasitesi"]
            ]
          }
        },
        {
          heading: "Jeneratör Verim Hesabı",
          paragraphs: [
            "Jeneratör verimi çıkış gücünün giriş gücüne oranıdır. Kayıplar; bakır kayıpları, demir kayıpları, mekanik kayıplar ve sürükleme kayıplarından oluşur."
          ],
          formula: {
            expression: "η = (Pout / Pin) × 100 = Pout / (Pout + Ploss) × 100",
            variables: [
              "η = verim (%)",
              "Pçıkış = elektrik çıkış gücü (kW)",
              "Pgiriş = mekanik giriş gücü (kW)",
              "Pkayıp = toplam kayıplar (kW)"
            ]
          },
          example: {
            problem:
              "1000 kW çıkış gücü olan bir jeneratörde toplam kayıp 80 kW ise verimi hesaplayınız.",
            steps: [
              "η = Pçıkış / (Pçıkış + Pkayıp) × 100",
              "η = 1000 / (1000 + 80) × 100",
              "η = 1000 / 1080 × 100"
            ],
            result: "η ≈ 92.6%. The generator efficiency is 92.6%."
          }
        }
      ],
      keyPoints: [
        "Senkron jeneratörde frekans doğrudan devir hızına bağlıdır.",
        "Fırçasız uyarma sistemi gemi jeneratörlerinde en yaygın tiptir.",
        "AVR (Otomatik Gerilim Regülatörü) çıkış gerilimini sabit tutar."
      ]
    },

    "Gerilim regülasyonu (AVR)": {
      title: "Gerilim Regülasyonu (AVR)",
      introduction:
        "Otomatik Gerilim Regülatörü (AVR), jeneratör çıkış gerilimini yük değişimlerinden bağımsız olarak sabit tutan elektronik kontrol ünitesidir.",
      sections: [
        {
          heading: "AVR Çalışma Prensibi",
          paragraphs: [
            "AVR, jeneratör çıkış gerilimini sürekli ölçer ve referans değerle karşılaştırır. Sapma tespit edildiğinde rotor uyarma akımını artırarak veya azaltarak gerilimi düzeltir.",
            "Yük artışında gerilim düşme eğilimi gösterir; AVR uyarma akımını artırarak gerilimi nominal değere getirir. Yük azalmasında ise uyarma azaltılır."
          ]
        },
        {
          heading: "Gerilim Regülasyon Hesabı",
          paragraphs: [],
          formula: {
            expression: "VR% = ((Vno-load − Vfull-load) / Vfull-load) × 100",
            variables: [
              "VR% = gerilim regülasyonu (%)",
              "Vboşta = boşta çalışma gerilimi (V)",
              "V_tam_yük = tam yükteki gerilim (V)"
            ]
          },
          example: {
            problem:
              "Bir jeneratörün boşta gerilimi 462 V, tam yükte 440 V ise gerilim regülasyonunu hesaplayınız.",
            steps: [
              "VR% = ((462 − 440) / 440) × 100",
              "VR% = (22 / 440) × 100"
            ],
            result: "VR% = 5.0%. Voltage regulation is 5%; it is reduced to ±0.5% with an AVR."
          }
        },
        {
          heading: "AVR Arıza Belirtileri",
          paragraphs: [],
          bulletPoints: [
            "Gerilim salınımları (hunting): PID ayar bozukluğu",
            "Gerilim üretilememesi: AVR kartı arızası veya sensing bağlantı kopukluğu",
            "Aşırı gerilim: Feedback devresi hatası",
            "Paralel çalışmada reaktif yük dengesizliği: Droop ayar hatası"
          ]
        }
      ],
      keyPoints: [
        "AVR gerilimi tipik olarak ±%0,5 hassasiyette kontrol eder.",
        "Paralel çalışmada droop ayarı reaktif yük paylaşımı için gereklidir.",
        "AVR arızasında manuel uyarma ile geçici çalışma mümkündür."
      ]
    },

    "Frekans ve yük kontrolü": {
      title: "Frekans ve Yük Kontrolü",
      introduction:
        "Jeneratör frekansı doğrudan tahrik motorunun devir hızına bağlıdır. Yük değişimlerinde frekansı sabit tutmak, tüm elektrikli ekipmanın düzgün çalışması için zorunludur.",
      sections: [
        {
          heading: "Frekans-Yük İlişkisi",
          paragraphs: [
            "Elektrik yükü artığında jeneratöre binen tork artar ve tahrik motoru yavaşlama eğilimi gösterir. Governör devreye girerek yakıt miktarını artırır ve devir hızını geri kazandırır.",
            "İzole çalışan bir jeneratörde governör izochronous modda çalışır ve frekansı sabit tutar. Paralel çalışmada droop moduna geçilir."
          ]
        },
        {
          heading: "Droop Ayarı",
          paragraphs: [],
          formula: {
            expression: "Droop% = ((fnoload − ffull_load) / fnominal) × 100",
            variables: [
              "Droop% = frekans düşümü yüzdesi",
              "fboşta = boşta frekans (Hz)",
              "f_tam_yük = tam yükte frekans (Hz)",
              "fnominal = nominal frekans (Hz)"
            ]
          },
          example: {
            problem:
              "Boşta 61,5 Hz ve tam yükte 60 Hz çalışan bir jeneratörün droop yüzdesini hesaplayınız.",
            steps: [
              "Droop% = ((61,5 − 60) / 60) × 100",
              "Droop% = (1,5 / 60) × 100"
            ],
            result: "Droop% = 2.5%. A droop value between 3-5% is used in standard ship generators."
          }
        },
        {
          heading: "Yük Kabulü ve Reddi",
          paragraphs: [
            "Büyük yüklerin ani bağlanması (yük kabulü) veya kopması (yük reddi) frekansı önemli ölçüde etkiler. IMO MSC.235(82) standardına göre, jeneratör %100 yük reddinde frekansın %10'dan fazla artmaması ve 5 saniye içinde %1 banda dönmesi gerekir."
          ]
        }
      ],
      keyPoints: [
        "Droop ayarı paralel jeneratörlerde aktif yük paylaşımını sağlar.",
        "Governör hızlı cevap süresi frekans kararlılığı için kritiktir.",
        "PMS, yük talebine göre jeneratör devreye alma/çıkarma yapar."
      ]
    },

    "Paralel jeneratör bağlama": {
      title: "Paralel Jeneratör Bağlama",
      introduction:
        "Paralel bağlama (senkronizasyon), çalışmakta olan bir jeneratöre ikinci bir jeneratörün bağlanması işlemidir. Güç talebinin artması veya bakım gereksinimi durumunda yapılır.",
      sections: [
        {
          heading: "Senkronizasyon Koşulları",
          paragraphs: [
            "Bir jeneratörü baraya paralel bağlamak için dört koşulun sağlanması gerekir:"
          ],
          bulletPoints: [
            "Eşit gerilim: Gelen jeneratör gerilimi, bara gerilimi ile aynı (±%5) olmalıdır",
            "Eşit frekans: Gelen jeneratör frekansı, bara frekansına çok yakın (genelde 0,1-0,5 Hz fazla) olmalıdır",
            "Aynı faz sırası: R-S-T faz sırası eşleşmelidir (kurulumda bir kez kontrol edilir)",
            "Faz açısı uyumu: Gerilimler arasındaki faz açısı farkı sıfıra yakın olmalıdır"
          ]
        },
        {
          heading: "Senkroskop Kullanımı",
          paragraphs: [
            "Senkroskop, gelen jeneratör ile baranın gerilim faz farkını gösteren bir cihazdır. İbre saat yönünde yavaşça dönüyorsa gelen jeneratör baradan biraz hızlıdır (fast). İbre 12 pozisyonuna yaklaştığında şalter kapatılır.",
            "Otomatik senkronizer, gerilim, frekans ve faz açısı koşullarını otomatik kontrol ederek şalteri uygun anda kapatır."
          ]
        },
        {
          heading: "Paralel Bağlama Prosedürü",
          paragraphs: [],
          bulletPoints: [
            "1. Gelen jeneratörü nominal devire getir",
            "2. AVR ile gerilimi bara gerilimine eşitle",
            "3. Governör ile frekansı bara frekansının biraz üzerine ayarla",
            "4. Senkroskop ibresinin yavaşça saat yönünde döndüğünü kontrol et",
            "5. İbre 12 pozisyonuna geldiğinde şalteri kapat",
            "6. Yük paylaşımını governör ile ayarla"
          ]
        }
      ],
      keyPoints: [
        "Faz sırası hatalıysa paralel bağlama şiddetli hasara yol açar.",
        "Gelen jeneratör baradan yavaşsa (ibre ters yöne dönüyorsa) bağlama yapılmaz.",
        "Otomatik senkronizer PMS ile entegre çalışır."
      ]
    },

    "Güç yönetim sistemi (PMS)": {
      title: "Güç Yönetim Sistemi (PMS)",
      introduction:
        "Güç Yönetim Sistemi (PMS), gemi elektrik santralinin otomatik yönetimini sağlayan kontrol sistemidir. Jeneratörlerin devreye alınması, çıkarılması, yük paylaşımı ve koruma fonksiyonlarını koordine eder.",
      sections: [
        {
          heading: "PMS Ana Fonksiyonları",
          paragraphs: [],
          bulletPoints: [
            "Otomatik jeneratör başlatma ve senkronizasyon",
            "Yük bazlı jeneratör devreye alma/çıkarma",
            "Aktif ve reaktif yük paylaşımı kontrolü",
            "Tercihli açma (preferential trip) yönetimi",
            "Blackout önleme ve güç geri kazanım",
            "Yük analizi ve trend izleme"
          ]
        },
        {
          heading: "Yük Yönetim Stratejisi",
          paragraphs: [],
          table: {
            headers: ["Yük Seviyesi", "Durum", "PMS Aksiyon"],
            rows: [
              ["<%30", "Düşük yük", "Fazla jeneratör devreden çıkar"],
              ["%30-%70", "Normal", "Kararlı çalışma"],
              ["%70-%85", "Yüksek yük", "Yedek jeneratör hazırlığı"],
              [">%85", "Aşırı yük", "Otomatik devreye alma"],
              [">%100", "Aşırı yük alarmı", "Tercihli açma devreye girer"]
            ]
          }
        },
        {
          heading: "Tercihli Açma",
          paragraphs: [
            "Jeneratör kapasitesinin aşılması durumunda kritik olmayan tüketiciler kademeli olarak devreden çıkarılır. Öncelik sırası: klima kompresörleri → güverte vinçleri → provizyon soğutma → galley ekipmanı. Seyir fenerleri, dümen makinesi, bilge pompası gibi SOLAS zorunlu tüketiciler hiçbir durumda kesilmez."
          ]
        }
      ],
      keyPoints: [
        "PMS blackout önleme için en kritik sistemdir.",
        "Tercihli açma kademeleri gemi tipine göre düzenlenir.",
        "PMS arızasında manuel jeneratör yönetimi yeterliliği gereklidir."
      ]
    },

    "Shore connection (kıyı bağlantısı)": {
      title: "Shore Connection (Kıyı Bağlantısı)",
      introduction:
        "Kıyı bağlantısı (cold ironing / shore power), geminin liman seyri sırasında kendi jeneratörlerini durdurup kıyı şebekesinden güç almasını sağlayan sistemdir.",
      sections: [
        {
          heading: "Bağlantı Prensibi",
          paragraphs: [
            "Shore power bağlantısı için gemi gerilim ve frekansının kıyı şebekesiyle uyumlu olması gerekir. Farklı ülkelerde 50 Hz veya 60 Hz, farklı gerilim seviyelerinde şebekeler mevcuttur. Transformatör ve frekans dönüştürücü gereken durumlarda kullanılır.",
            "IEC/ISO/IEEE 80005-1 standardı yüksek gerilim shore connection (HVSC) gerekliliklerini tanımlar."
          ]
        },
        {
          heading: "Shore Connection Prosedürü",
          paragraphs: [],
          bulletPoints: [
            "1. Shore power paneli ve kablolama hazırlığı",
            "2. Kıyı tarafı gerilim ve frekans kontrolü",
            "3. Gemi jeneratörü ile senkronizasyon veya dead-ship transfer",
            "4. Shore breaker kapatma ve yük transferi",
            "5. Gemi jeneratörlerinin durdurulması",
            "6. Sürekli izleme: gerilim, frekans, toprak kaçağı"
          ]
        },
        {
          heading: "Çevresel Faydalar",
          paragraphs: [
            "Shore power kullanımı limandaki egzoz emisyonlarını (SOx, NOx, PM) sıfıra indirir. EU Alternative Fuels Infrastructure Regulation (AFIR) uyarınca 2030'dan itibaren belirli limanlar ve gemiler için shore power kullanımı zorunlu olacaktır."
          ]
        }
      ],
      keyPoints: [
        "Shore power IEC 80005 standardına uygun olmalıdır.",
        "Frekans uyumsuzluğu durumunda frekans dönüştürücü gerekir.",
        "Shore power bağlantısı sırasında acil jeneratör her zaman hazır tutulmalıdır."
      ]
    },

    "Ana dağıtım panosu (MSB)": {
      title: "Ana Dağıtım Panosu (MSB)",
      introduction:
        "Ana Dağıtım Panosu (Main Switchboard - MSB), gemi elektrik sisteminin merkez noktasıdır. Jeneratörlerden gelen gücü alır ve tüm tüketicilere dağıtır.",
      sections: [
        {
          heading: "MSB Yapısı",
          paragraphs: [
            "MSB; jeneratör panelleri, bara sistemi, dağıtım panelleri, ölçü aletleri, koruma rölesi ve kontrol devrelerinden oluşur. Ana bara genellikle bakır veya alüminyum iletkenlerden yapılır ve jeneratörler ile yük devre kesiciler bu baraya bağlanır.",
            "SOLAS kurallarına göre MSB su geçirmez kapalı alanda, makine dairesinin üst platformunda konumlandırılır. Ön ve arka taraftan erişim mesafesi en az 0,6 m olmalıdır."
          ]
        },
        {
          heading: "MSB Panelleri",
          paragraphs: [],
          table: {
            headers: ["Panel Tipi", "İçerik", "Koruma"],
            rows: [
              ["Jeneratör paneli", "ACB, senkroskop, AVR kontrolü", "Ters güç, aşırı akım"],
              ["Feeder paneli", "MCCB, motorlar, aydınlatma", "Aşırı akım, kısa devre"],
              ["Shore connection", "Şalter, interlocking", "Ters faz, toprak kaçağı"],
              ["Trafo paneli", "440/220V veya 440/110V", "Termik koruma"],
              ["Ölçü paneli", "V, A, kW, kVAr, Hz, PF", "—"]
            ]
          }
        }
      ],
      keyPoints: [
        "MSB önünde izole mat (dielektrik paspas) bulunmalıdır.",
        "MSB'ye yetkisiz erişim önlenmelidir.",
        "Bus-tie breaker split plant operasyonunda açık tutulur."
      ]
    },

    "Acil dağıtım panosu (ESB)": {
      title: "Acil Dağıtım Panosu (ESB)",
      introduction:
        "Acil Dağıtım Panosu (Emergency Switchboard - ESB), ana güç kaybında hayati önemdeki ekipmanları besleyen bağımsız dağıtım panosidir.",
      sections: [
        {
          heading: "SOLAS Gereklilikleri",
          paragraphs: [
            "SOLAS Bölüm II-1 Kural 42-44'e göre 500 GT üstü yolcu ve yük gemileri acil güç kaynağı bulundurmalıdır. Acil jeneratör, ana güç kaybından sonra 45 saniye içinde otomatik devreye girmelidir.",
            "ESB, makine dairesinin üzerinde, en üst sürekli güvertede veya navigasyon güvertesinde konumlandırılır."
          ]
        },
        {
          heading: "ESB Tarafından Beslenen Tüketiciler",
          paragraphs: [],
          bulletPoints: [
            "Seyir fenerleri ve seyir cihazları",
            "Acil dümen makinesi",
            "Yangın algılama ve alarm sistemi",
            "Acil yangın pompası",
            "Acil bilge pompası",
            "Dahili haberleşme ve genel alarm",
            "Acil aydınlatma (kaçış yolları)",
            "GMDSS ekipmanları",
            "Watertight kapı göstergeleri ve alarm"
          ]
        },
        {
          heading: "Acil Güç Kaynakları",
          paragraphs: [],
          table: {
            headers: ["Kaynak", "Süre", "Kullanım"],
            rows: [
              ["Acil jeneratör", "18-36 saat", "Yolcu: 36 saat, Yük: 18 saat"],
              ["Akü grubu", "30 dakika", "Geçiş akümülatör gücü"],
              ["UPS", "Kesintisiz", "Kritik navigasyon cihazları"]
            ]
          }
        }
      ],
      keyPoints: [
        "Acil jeneratör haftalık test çalıştırmasına tabidir.",
        "ESB ile MSB arasında otomatik transfer şalteri (ATS) bulunur.",
        "Acil jeneratör yakıt deposu en az 18 saatlik kapasite taşımalıdır."
      ]
    },

    "Kablo tipleri ve boyutlandırma": {
      title: "Kablo Tipleri ve Boyutlandırma",
      introduction:
        "Gemi kablolarının seçimi ve boyutlandırması, güvenli elektrik dağıtımının temelidir. Deniz ortamının zorlu koşulları özel kablo standartları gerektirir.",
      sections: [
        {
          heading: "Gemi Kablosu Standartları",
          paragraphs: [
            "Gemi kabloları IEC 60092 serisine göre üretilir. Alev yayılmazlık (IEC 60332), düşük duman emisyonu (IEC 61034) ve halojen içermeme (IEC 60754) temel gereksinimlerdir.",
            "Yaygın kablo tipleri: XLPE izoleli, EPR izoleli ve silikon izoleli kablolar. Her birinin sıcaklık dayanımı ve esneklik özellikleri farklıdır."
          ]
        },
        {
          heading: "Kablo Boyutlandırma",
          paragraphs: [
            "Kablo kesiti belirlenirken akım taşıma kapasitesi, gerilim düşümü ve kısa devre dayanımı dikkate alınır."
          ],
          formula: {
            expression: "A = (√3 × I × L × cosφ × ρ) / (ΔV × 1000)",
            variables: [
              "A = iletken kesiti (mm²)",
              "I = nominal akım (A)",
              "L = kablo uzunluğu (m)",
              "cosφ = güç faktörü",
              "ρ = özdirenç (Ω·mm²/m)",
              "ΔV = izin verilen gerilim düşümü (V)"
            ]
          },
          example: {
            problem:
              "440V, 50A, cosφ=0.8, 80m uzunluğunda bakır kablo için gerilim düşümü %6 kabul edilirse minimum kablo kesitini hesaplayınız.",
            steps: [
              "ΔV = 440 × 0,06 = 26,4 V",
              "ρ (bakır) = 0,0175 Ω·mm²/m",
              "A = (√3 × I × L × ρ × cosφ) / ΔV",
              "A = (1,732 × 50 × 80 × 0,8 × 0,0175) / 26,4",
              "A = 96,99 / 26,4 ≈ 3,67 mm²"
            ],
            result: "The cross-section calculated according to the voltage drop criterion is approximately 3.67 mm²; a next standard cross-section of 4 mm² is selected (current carrying capacity must also be checked)."
          }
        },
        {
          heading: "Kablo Döşeme Kuralları",
          paragraphs: [],
          bulletPoints: [
            "Kablolar kablo tavaları veya borular içinde döşenir",
            "Güç ve sinyal kabloları ayrı tavalardan geçirilir",
            "Bükülme yarıçapı kablo çapının en az 6 katı olmalıdır",
            "Su geçirmez bölme geçişlerinde kablo transitleri kullanılır",
            "Tehlikeli alanlarda Ex-proof kablo bağlantı kutuları kullanılır"
          ]
        }
      ],
      keyPoints: [
        "Gemi kabloları alev yayılmaz ve düşük dumanlı olmalıdır.",
        "Gerilim düşümü ana dağıtımda %6, aydınlatmada %3 ile sınırlandırılır.",
        "İnsülasyon direnci ölçümü kablo sağlığının temel göstergesidir."
      ]
    },

    "Topraklama sistemleri (izole nötr)": {
      title: "Topraklama Sistemleri (İzole Nötr)",
      introduction:
        "Gemi elektrik sistemleri genellikle izole nötr (IT sistemi) topraklama düzeni kullanır. Bu sistem, tek bir toprak kaçağında güç kesintisi yaşanmamasını sağlar.",
      sections: [
        {
          heading: "İzole Nötr Sistem (IT)",
          paragraphs: [
            "IT sistemde jeneratör nötr noktası gemi gövdesine (toprak) doğrudan bağlanmaz. Böylece tek bir faz-toprak kaçağında devre tamamlanmaz ve sistem çalışmaya devam eder. Ancak ikinci bir kaçak oluşursa iki fazlı kısa devre meydana gelir.",
            "Bu nedenle ilk toprak kaçağı anında alarm verilir ve kaçak kaynağı bulunarak giderilmelidir."
          ]
        },
        {
          heading: "Topraklı Nötr ile Karşılaştırma",
          paragraphs: [],
          table: {
            headers: ["Özellik", "İzole Nötr (IT)", "Topraklı Nötr (TN)"],
            rows: [
              ["Tek kaçakta güç kesintisi", "Hayır", "Evet"],
              ["Arıza tespiti", "İnsülasyon izleme gerekli", "Sigorta/şalter açar"],
              ["Güvenlik", "İkinci kaçak tehlikeli", "İlk kaçakta devre kesilir"],
              ["Kullanım", "Gemi (genel)", "Kıyı tesisleri, bazı büyük gemiler"]
            ]
          }
        },
        {
          heading: "İnsülasyon İzleme",
          paragraphs: [
            "Sürekli insülasyon izleme cihazı (IMD) tüm fazların toprak insülasyon direncini ölçer. Değer belirli bir eşiğin altına düştüğünde (tipik olarak 100 kΩ/V altı) alarm verir. Kaçak fazı megger ile belirlenir."
          ]
        }
      ],
      keyPoints: [
        "IT sistem gemilerde güvenliği artırır; tek kaçakta kesinti olmaz.",
        "İkinci toprak kaçağı oluşmadan ilk kaçak giderilmelidir.",
        "İnsülasyon izleme cihazı sürekli çalışır ve kayıt tutar."
      ]
    },

    "İnsülasyon direnci ölçümü ve izleme": {
      title: "İnsülasyon Direnci Ölçümü ve İzleme",
      introduction:
        "İnsülasyon direnci ölçümü, elektrik devrelerinin güvenli çalıştığının doğrulanması için yapılan temel elektriksel testtir. Düşük insülasyon direnci toprak kaçağına ve elektrik çarpmasına yol açabilir.",
      sections: [
        {
          heading: "Ölçüm Prensibi",
          paragraphs: [
            "Megger (insülasyon tester), ölçülen devreye DC gerilim uygulayarak iletken ile toprak arasındaki kaçak akımı ölçer. Ölçülen akımdan insülasyon direnci hesaplanır.",
            "Ölçüm gerilimi devre nominal gerilimine göre seçilir: 440V devreler için 500V DC, 6,6kV devreler için 5000V DC test gerilimi uygulanır."
          ]
        },
        {
          heading: "Minimum İnsülasyon Direnci Değerleri",
          paragraphs: [],
          table: {
            headers: ["Devre Tipi", "Test Gerilimi", "Min. İnsülasyon Direnci"],
            rows: [
              ["Güç devreleri (440V)", "500V DC", "1 MΩ"],
              ["Aydınlatma (220V)", "500V DC", "1 MΩ"],
              ["Kontrol devreleri", "250V DC", "1 MΩ"],
              ["Yüksek gerilim (6,6kV)", "5000V DC", "100 MΩ"],
              ["Motor sargıları", "500-1000V DC", "R > (kV + 1) MΩ"]
            ]
          }
        },
        {
          heading: "Ölçüm Prosedürü",
          paragraphs: [],
          bulletPoints: [
            "Devreyi enerjisiz hale getir ve doğrula (LOTO)",
            "Tüm bağlı ekipmanları ayır",
            "Megger bağlantılarını yap (line-earth)",
            "Test gerilimini uygula ve 60 saniye bekle",
            "Okumayı kaydet (1 dakika değeri)",
            "Devre boşaltması için kısa devre yap"
          ]
        }
      ],
      keyPoints: [
        "Islak ortamda insülasyon direnci düşer; kuru ve sıcak günde ölçüm idealdir.",
        "Polarizasyon indeksi (PI) motor sargı durumunu değerlendirmede kullanılır.",
        "Trend takibi erken arıza tespitinde kritik öneme sahiptir."
      ]
    },

    "440V ve 6.6kV sistemler": {
      title: "440V ve 6.6kV Sistemler",
      introduction:
        "Gemi elektrik dağıtım sistemleri düşük gerilim (LV, 440V) ve yüksek gerilim (HV, 6,6kV veya 11kV) olarak sınıflandırılır. Gemi boyutu ve güç ihtiyacına göre uygun sistem seçilir.",
      sections: [
        {
          heading: "Düşük Gerilim Sistemi (440V)",
          paragraphs: [
            "Toplam güç talebi yaklaşık 4 MW'a kadar olan gemilerde 440V, 60 Hz (veya 380V, 50 Hz) dağıtım sistemi kullanılır. Bu sistemde kablolar daha kalın ancak şalterler ve koruma elemanları daha basit ve ekonomiktir."
          ]
        },
        {
          heading: "Yüksek Gerilim Sistemi (6,6kV)",
          paragraphs: [
            "Büyük konteyner gemileri, LNG taşıyıcıları, cruise gemileri ve FPSO gibi yüksek güç ihtiyacı olan gemilerde 6,6kV veya 11kV dağıtım sistemi kullanılır. Yüksek gerilim, aynı güç için daha düşük akım ve dolayısıyla daha ince kablo kullanımı sağlar."
          ],
          formula: {
            expression: "I = P / (√3 × V × cosφ)",
            variables: [
              "I = hat akımı (A)",
              "P = güç (W)",
              "V = hat gerilimi (V)",
              "cosφ = güç faktörü"
            ]
          },
          example: {
            problem:
              "5000 kW güç, cosφ = 0,85 durumunda 440V ve 6600V için hat akımlarını karşılaştırınız.",
            steps: [
              "440V: I = 5.000.000 / (1,732 × 440 × 0,85) = 5.000.000 / 647,5 ≈ 7722 A",
              "6600V: I = 5.000.000 / (1,732 × 6600 × 0,85) = 5.000.000 / 9713 ≈ 515 A"
            ],
            result: "Current is 515 A in a 6.6kV system, while it is 7722 A in a 440V system; cable cross-section and cost are significantly reduced."
          }
        },
        {
          heading: "HV Güvenlik Önlemleri",
          paragraphs: [],
          bulletPoints: [
            "HV panolarda interlock ve earthing switch zorunludur",
            "Çalışma öncesi izole et → doğrula → toprakla prosedürü uygulanır",
            "HV sertifikalı personel gereklidir",
            "HV ekipman bakımında minimum iki kişi bulunmalıdır",
            "HV switchgear odası kilitli tutulur ve erişim kontrollüdür"
          ]
        }
      ],
      keyPoints: [
        "4 MW üstü güç ihtiyacında HV sistemi ekonomik hale gelir.",
        "HV sistemde elektrik çarpması ölümcül olabilir; güvenlik prosedürleri katıdır.",
        "Bazı gemilerde dual voltage sistemi (HV ana dağıtım + LV alt dağıtım) kullanılır."
      ]
    },

    "Aşırı akım koruma (devre kesici)": {
      title: "Aşırı Akım Koruma (Devre Kesici)",
      introduction:
        "Devre kesiciler (circuit breakers), aşırı akım ve kısa devre durumlarında devreyi otomatik olarak açarak elektrik ekipmanlarını ve kabloları koruyan anahtarlama cihazlarıdır.",
      sections: [
        {
          heading: "Devre Kesici Tipleri",
          paragraphs: [],
          table: {
            headers: ["Tip", "Söndürme Ortamı", "Kullanım", "Gerilim"],
            rows: [
              ["ACB (Air Circuit Breaker)", "Hava", "Jeneratör, ana feeder", "LV"],
              ["MCCB (Molded Case CB)", "Hava", "Motor, aydınlatma", "LV"],
              ["VCB (Vacuum CB)", "Vakum", "HV dağıtım", "6,6kV+"],
              ["SF6 CB", "SF6 gazı", "Çok yüksek gerilim", "11kV+"],
              ["MCB (Miniature CB)", "Hava", "Kontrol devreleri", "LV"]
            ]
          }
        },
        {
          heading: "Koruma Karakteristikleri",
          paragraphs: [
            "Aşırı akım koruma iki ana bileşenden oluşur: termik koruma (uzun süreli aşırı yük) ve manyetik koruma (anlık kısa devre). Termik eleman I²t prensibine göre çalışır; akım arttıkça açma süresi kısalır. Manyetik eleman, kısa devre akımında (6-12 × In) milisaniyeler içinde devreyi açar."
          ]
        },
        {
          heading: "Seçicilik (Selectivity)",
          paragraphs: [
            "Arıza noktasına en yakın devre kesicinin öncelikle açması gerekir. Bu, üst kademe kesicinin daha geç açması (zaman seçiciliği) veya daha yüksek akımda tepki vermesi (akım seçiciliği) ile sağlanır. Koordinasyon eksikliği tüm sistemin gereksiz yere deenerjize olmasına neden olur."
          ]
        }
      ],
      keyPoints: [
        "ACB'ler çekilebilir (withdrawable) tipte olup bakım kolaylığı sağlar.",
        "VCB'ler HV sistemlerde kompakt boyut ve uzun ömür sunar.",
        "Devre kesici koordinasyonu (selectivity study) güvenilir koruma için zorunludur."
      ]
    },

    "Kısa devre koruma": {
      title: "Kısa Devre Koruma",
      introduction:
        "Kısa devre, iki veya daha fazla iletkenin düşük empedanslı bir yol üzerinden temas etmesi sonucu oluşan anormal durumdur. Kısa devre akımları ekipman hasarı ve yangına yol açabilir.",
      sections: [
        {
          heading: "Kısa Devre Akımı Hesabı",
          paragraphs: [
            "Kısa devre akımı, jeneratör subtransient reaktansı ve sistem empedansı ile belirlenir."
          ],
          formula: {
            expression: "Ikd = V / (√3 × Ztoplam)",
            variables: [
              "Ikd = kısa devre akımı (A)",
              "V = hat gerilimi (V)",
              "Ztoplam = arıza noktasına kadar toplam empedans (Ω)"
            ]
          },
          example: {
            problem:
              "440V sistemde jeneratör subtransient reaktansı X''d = %12 ve jeneratör gücü 800 kVA ise olası kısa devre akımını hesaplayınız.",
            steps: [
              "Inominal = S / (√3 × V) = 800.000 / (1,732 × 440) = 1050 A",
              "Ikd = Inominal / X''d(pu) = 1050 / 0,12"
            ],
            result: "Ikd ≈ 8750 A. The busbar short circuit current is at 8750 A; the circuit breaker's breaking capacity must be above this value."
          }
        },
        {
          heading: "Kısa Devre Koruma Elemanları",
          paragraphs: [],
          bulletPoints: [
            "HRC sigortalar: Yüksek kısa devre akımlarında hızlı kesme",
            "Devre kesici manyetik açma: 6-12 × In'de anlık açma",
            "Current limiting fuse: Akımı tepe değerine ulaşmadan keser",
            "Diferansiyel koruma: Büyük motorlar ve transformatörler için"
          ]
        }
      ],
      keyPoints: [
        "Tüm şalterlerin kesme kapasitesi beklenen kısa devre akımının üzerinde olmalıdır.",
        "Kısa devre hesabı gemi elektrik projesinin temel analizlerinden biridir.",
        "Paralel jeneratör sayısı arttıkça toplam kısa devre akımı artar."
      ]
    },

    "Ters güç koruma (reverse power)": {
      title: "Ters Güç Koruma (Reverse Power)",
      introduction:
        "Ters güç koruma rölesi, jeneratörün motor olarak çalışmasını (baradan güç çekmesini) algılayan ve jeneratörü baradan ayıran koruma fonksiyonudur.",
      sections: [
        {
          heading: "Oluşum Nedenleri",
          paragraphs: [
            "Ters güç durumu, tahrik motorunun (dizel motor) yakıt kesilmesi, governör arızası veya mekanik arıza nedeniyle güç üretememesi halinde ortaya çıkar. Bu durumda jeneratör motor gibi çalışarak baradan aktif güç çeker ve tahrik motorunu döndürmeye başlar.",
            "Ters güç durumu tahrik motoruna mekanik hasar verebilir ve diğer jeneratörleri aşırı yükleyebilir."
          ]
        },
        {
          heading: "Röle Ayarları",
          paragraphs: [],
          table: {
            headers: ["Parametre", "Dizel Motor", "Türbin"],
            rows: [
              ["Ters güç eşiği", "%5-15 nominal", "%2-3 nominal"],
              ["Zaman gecikmesi", "5-10 saniye", "2-5 saniye"],
              ["Aksiyon", "Breaker açma", "Breaker açma + trip"]
            ]
          }
        },
        {
          heading: "Ters Güç Güç Hesabı",
          paragraphs: [],
          formula: {
            expression: "Preverse = V × I × cosφ (in negative direction)",
            variables: [
              "Pters = ters güç (kW)",
              "V = gerilim (V)",
              "I = akım (A)",
              "cosφ = güç faktörü"
            ]
          }
        }
      ],
      keyPoints: [
        "Dizel jeneratörlerde ters güç eşiği %8-10 civarında set edilir.",
        "Gaz türbini jeneratörlerde eşik daha düşüktür (%2-3).",
        "Ters güç rölesi paralel çalışmanın zorunlu koruma elemanıdır."
      ]
    },

    "Tercihli açma (preferential trip)": {
      title: "Tercihli Açma (Preferential Trip)",
      introduction:
        "Tercihli açma, jeneratör kapasitesinin aşıldığı durumlarda kritik olmayan tüketicilerin kademeli olarak devreden çıkarılarak jeneratörün aşırı yüklenmesinin ve blackout'un önlenmesi sistemidir.",
      sections: [
        {
          heading: "Çalışma Prensibi",
          paragraphs: [
            "Jeneratör yükü belirli bir eşiği (tipik olarak %90-110) aştığında, PMS tercihli açma sekansını başlatır. Önce en düşük öncelikli tüketiciler kesilir; yük hâlâ yüksekse bir sonraki kademe devreye girer.",
            "Tercihli açma sırası gemi elektrik projesinde tanımlanır ve SOLAS zorunlu tüketicileri hiçbir koşulda kesmez."
          ]
        },
        {
          heading: "Kademe Örneği",
          paragraphs: [],
          table: {
            headers: ["Kademe", "Tüketiciler", "Gecikme"],
            rows: [
              ["1. Kademe", "Klima, galley, çamaşırhane", "5 saniye"],
              ["2. Kademe", "Güverte vinçleri, provizyon soğutma", "10 saniye"],
              ["3. Kademe", "Tank ısıtma, ventilasyon fanları", "15 saniye"],
              ["4. Kademe", "Non-essential aydınlatma", "20 saniye"]
            ]
          }
        },
        {
          heading: "Kesilmeyen (SOLAS Zorunlu) Tüketiciler",
          paragraphs: [],
          bulletPoints: [
            "Seyir fenerleri ve seyir cihazları",
            "Dümen makinesi",
            "Bilge/yangın pompaları",
            "Dahili haberleşme ve alarm sistemi",
            "GMDSS ekipmanları",
            "Watertight kapı kontrolü"
          ]
        }
      ],
      keyPoints: [
        "Tercihli açma blackout'u önleyen son savunma hattıdır.",
        "Kademe sırası operasyonel koşullara göre düzenlenebilir.",
        "Tercihli açma sonrası yük düşünce tüketiciler manuel olarak geri devreye alınır."
      ]
    },

    "Toprak kaçağı koruma": {
      title: "Toprak Kaçağı Koruma",
      introduction:
        "Toprak kaçağı, bir fazın izolasyonundaki hasar nedeniyle akımın gemi gövdesine (toprak) kaçması durumudur. İzole nötr sistemde tek kaçak alarm verir; topraklı sistemde koruma devreyi açar.",
      sections: [
        {
          heading: "İzole Nötr Sistemde Toprak Kaçağı",
          paragraphs: [
            "IT sistemde tek faz toprak kaçağında devre tamamlanmadığı için akım akmaz ve sistem çalışmaya devam eder. İnsülasyon izleme cihazı (IMD) düşen insülasyon direncini algılar ve alarm verir. İkinci bir faz kaçağı oluşursa iki faz arası kısa devre meydana gelir."
          ]
        },
        {
          heading: "Toprak Kaçağı Arama Prosedürü",
          paragraphs: [],
          bulletPoints: [
            "1. Alarm aldığında hangi fazda kaçak olduğunu belirle (R-S-T)",
            "2. MSB'den feederleri sırayla ayırarak kaçak feederi bul",
            "3. Feeder üzerindeki ekipmanları sırayla ayırarak arızalı ekipmanı tespit et",
            "4. Megger ile insülasyon direncini ölç ve kaçak noktasını doğrula",
            "5. Arızayı gider ve insülasyon direncini tekrar ölç"
          ]
        },
        {
          heading: "Topraklı Sistemde Koruma",
          paragraphs: [
            "TN sistemde toprak kaçağında devre tamamlanır ve yüksek akım akar. RCCB (artık akım koruma cihazı) toprak kaçağı akımını algılayarak devreyi açar. Gemi 220V soket devrelerinde 30 mA RCCB kullanımı yaygındır."
          ]
        }
      ],
      keyPoints: [
        "Toprak kaçağı alarmı asla ihmal edilmemelidir.",
        "İkinci toprak kaçağı oluşmadan önce ilki giderilmelidir.",
        "Islak bölgelerde insülasyon direnci düzenli kontrol edilmelidir."
      ]
    },

    "Üç fazlı asenkron motor": {
      title: "Üç Fazlı Asenkron Motor",
      introduction:
        "Üç fazlı asenkron (endüksiyon) motor, gemilerde en yaygın kullanılan elektrik motorudur. Pompa, fan, kompresör ve vinç gibi mekanik tahrik gerektiren tüm sistemlerde kullanılır.",
      sections: [
        {
          heading: "Çalışma Prensibi",
          paragraphs: [
            "Stator sargılarına uygulanan üç fazlı gerilim, döner manyetik alan oluşturur. Bu alan rotor iletkenlerinde akım indükler ve oluşan kuvvet rotoru döndürür. Rotor her zaman döner alandan yavaş döner; bu farka kayma (slip) denir."
          ],
          formula: {
            expression: "s = (ns − nr) / ns × 100",
            variables: [
              "s = kayma (%)",
              "ns = senkron hız (d/d) = 120f/P",
              "nr = rotor hızı (d/d)"
            ]
          },
          example: {
            problem:
              "4 kutuplu, 60 Hz motor 1740 d/d'da dönüyorsa kaymayı hesaplayınız.",
            steps: [
              "ns = 120 × 60 / 4 = 1800 d/d",
              "s = (1800 − 1740) / 1800 × 100"
            ],
            result: "s = 3.33%. Typical slip value at full load is between 2-5%."
          }
        },
        {
          heading: "Motor Tipleri",
          paragraphs: [],
          table: {
            headers: ["Rotor Tipi", "Özellik", "Kullanım"],
            rows: [
              ["Sincap kafesli", "Sağlam, bakımsız, ucuz", "Pompa, fan, kompresör"],
              ["Bilezikli (wound rotor)", "Yol verme direnci ayarlanabilir", "Vinç, değirmen"],
              ["Çift kafesli", "Yüksek başlatma torku", "Yüksek atalet yükleri"]
            ]
          }
        },
        {
          heading: "Motor Etiket Bilgileri",
          paragraphs: [],
          bulletPoints: [
            "Nominal güç (kW veya HP)",
            "Gerilim ve akım (440V, 60 Hz)",
            "Devir hızı (d/d)",
            "Güç faktörü (cosφ)",
            "Koruma sınıfı (IP55 vb.)",
            "İzolasyon sınıfı (F veya H)",
            "Duty tipi (S1 sürekli, S2 kısa süreli vb.)"
          ]
        }
      ],
      keyPoints: [
        "Sincap kafesli motor gemilerde en yaygın kullanılan tiptir.",
        "Kayma sıfır olursa indükleme durur ve motor tork üretemez.",
        "Motor seçiminde ortam sıcaklığı ve IP koruma sınıfı dikkate alınmalıdır."
      ]
    },

    "Motor yol verme yöntemleri (DOL, Y-Δ, VFD)": {
      title: "Motor Yol Verme Yöntemleri (DOL, Y-Δ, VFD)",
      introduction:
        "Motor yol verme, motorun durdurma konumundan çalışma hızına getirilme yöntemidir. Yol verme akımı nominal akımın 5-8 katı olabilir; bu gerilim düşümü ve jeneratör yüklenmesine neden olur.",
      sections: [
        {
          heading: "Yol Verme Yöntemleri Karşılaştırma",
          paragraphs: [],
          table: {
            headers: ["Yöntem", "Başlangıç Akımı", "Başlangıç Torku", "Maliyet", "Uygunluk"],
            rows: [
              ["DOL (Direct On Line)", "6-8 × In", "%100 tam tork", "Düşük", "Küçük motorlar (<7,5 kW)"],
              ["Y-Δ (Yıldız-Üçgen)", "2-3 × In", "%33 tam tork", "Orta", "Orta motorlar, düşük yük başlatma"],
              ["Soft Starter", "2-4 × In (ayarlanabilir)", "Ayarlanabilir", "Orta-Yüksek", "Pompa, fan"],
              ["VFD (Frekans Dönüştürücü)", "~1 × In", "Tam tork", "Yüksek", "Değişken hız gereken tüm uygulamalar"]
            ]
          }
        },
        {
          heading: "Y-Δ Yol Verme",
          paragraphs: [
            "Motor ilk olarak yıldız bağlantıyla çalıştırılır; sargılara uygulanan gerilim 1/√3 oranında düşer ve akım 1/3'e iner. Motor hızlanınca üçgen bağlantıya geçilir. Geçiş anında kısa süreli akım tepe değeri oluşabilir.",
            "Y-Δ yol verme yalnızca düşük yükle başlatılan motorlarda uygundur; yüksek yükte başlatma torku yetersiz kalır."
          ]
        },
        {
          heading: "VFD ile Yol Verme",
          paragraphs: [
            "Frekans dönüştürücü, motorun gerilim ve frekansını kontrol ederek sıfır hızdan nominal hıza kadar sorunsuz ve düşük akımla hızlanma sağlar. Enerji tasarrufu, hassas hız kontrolü ve yumuşak başlatma avantajları sunar."
          ]
        }
      ],
      keyPoints: [
        "DOL yol verme gemi jeneratörlerine anlık yük getirdiğinden dikkatli kullanılmalıdır.",
        "Y-Δ geçiş anında geçici tork düşümü yaşanabilir.",
        "VFD, enerji verimliliği gerektiren pompa ve fanlarda standart hale gelmektedir."
      ]
    },

    "DC motor tipleri ve uygulamaları": {
      title: "DC Motor Tipleri ve Uygulamaları",
      introduction:
        "DC (doğru akım) motorları, değişken hız kontrolü gerektiren özel gemi uygulamalarında kullanılır. Modern gemilerde AC motorlar ve VFD yaygınlaşmış olsa da bazı sistemlerde DC motorlar hâlâ tercih edilmektedir.",
      sections: [
        {
          heading: "DC Motor Tipleri",
          paragraphs: [],
          table: {
            headers: ["Tip", "Uyarma", "Hız Karakteristiği", "Gemi Uygulaması"],
            rows: [
              ["Seri uyarmalı", "Yük ile değişken", "Yüksek başlatma torku", "Vinç, ırgat"],
              ["Şönt uyarmalı", "Sabit", "Stabil hız", "Cargo pompaları"],
              ["Kompound", "Seri + Şönt", "Dengeli", "Güverte makineleri"],
              ["Ayrı uyarmalı", "Bağımsız kaynak", "Geniş hız aralığı", "Ward-Leonard sistemi"]
            ]
          }
        },
        {
          heading: "DC Motor Hız Kontrolü",
          paragraphs: [
            "DC motor hızı üç yöntemle kontrol edilir: armatür gerilimi değiştirme (hız düşürme), alan akımı değiştirme (hız artırma) ve seri direnç ekleme (verimsiz yöntem).",
            "Modern uygulamalarda thyristor doğrultucular veya chopper devreler ile hassas DC motor kontrolü sağlanır."
          ],
          formula: {
            expression: "n = (V − Ia × Ra) / (k × Φ)",
            variables: [
              "n = devir hızı",
              "V = armatür gerilimi",
              "Ia = armatür akımı",
              "Ra = armatür direnci",
              "k = motor sabiti",
              "Φ = manyetik akı"
            ]
          }
        }
      ],
      keyPoints: [
        "DC motorlar yüksek başlatma torku gerektiren uygulamalarda avantajlıdır.",
        "Komütatör ve fırça bakımı DC motorların dezavantajıdır.",
        "Modern gemilerde AC motor + VFD kombinasyonu DC motorların yerini almaktadır."
      ]
    },

    "Frekans dönüştürücü (VFD) kontrolü": {
      title: "Frekans Dönüştürücü (VFD) Kontrolü",
      introduction:
        "Frekans dönüştürücü (Variable Frequency Drive), AC motor hızını frekans ve gerilim kontrolü ile ayarlayan güç elektroniği cihazıdır. Gemilerde enerji verimliliği ve hassas hız kontrolü sağlar.",
      sections: [
        {
          heading: "VFD Çalışma Prensibi",
          paragraphs: [
            "VFD üç ana bölümden oluşur: doğrultucu (AC→DC), DC ara devre (filtre) ve invertör (DC→AC). İnvertör bölümü IGBT anahtarlar kullanarak istenilen frekansta ve genlikte AC çıkış üretir.",
            "Motor hızı çıkış frekansına doğrudan bağlıdır (n = 120f/P). V/f oranı sabit tutularak tüm hız aralığında sabit tork sağlanır."
          ]
        },
        {
          heading: "Gemi Uygulamaları",
          paragraphs: [],
          table: {
            headers: ["Uygulama", "Enerji Tasarrufu", "Avantaj"],
            rows: [
              ["Soğutma suyu pompası", "%20-40", "Yük bazlı debi kontrolü"],
              ["Makine dairesi fanı", "%30-50", "Kübik yasa (P ∝ n³)"],
              ["Balast pompası", "%15-25", "Yumuşak başlatma"],
              ["Hava kompresörü", "%10-20", "Kapasite kontrolü"],
              ["Cargo pompası (tanker)", "%15-30", "Debi kontrolü"]
            ]
          }
        },
        {
          heading: "Harmonik Sorunlar",
          paragraphs: [
            "VFD'ler şebekeye harmonik akımlar üretir. 5., 7., 11. ve 13. harmonikler en yaygındır. Harmonikler transformatörlerde aşırı ısınma, devre kesicilerde hatalı açma ve hassas cihazlarda parazite neden olabilir.",
            "Harmonik filtreleme için pasif filtre, aktif filtre veya çok darbe doğrultucu (12-pulse, 18-pulse) kullanılır."
          ]
        }
      ],
      keyPoints: [
        "Fan ve pompa uygulamalarında enerji tasarrufu küp yasasına göre çok yüksektir.",
        "VFD arızasında bypass modu ile motor doğrudan çalıştırılabilir.",
        "Harmonik bozulma THD<%5 seviyesinde tutulmalıdır."
      ]
    },

    "Motor koruma ve bakım": {
      title: "Motor Koruma ve Bakım",
      introduction:
        "Elektrik motorlarının koruma sistemleri ve düzenli bakımı, motorun ömrünü uzatır ve beklenmedik arızaları önler.",
      sections: [
        {
          heading: "Motor Koruma Elemanları",
          paragraphs: [],
          table: {
            headers: ["Koruma", "Algılanan Durum", "Eleman"],
            rows: [
              ["Aşırı akım", "Mekanik aşırı yük", "Termik röle / elektronik röle"],
              ["Kısa devre", "Sargı kısa devresi", "Sigorta / MCCB manyetik açma"],
              ["Faz kaybı", "Bir faz kesilmesi", "Faz izleme rölesi"],
              ["Faz sırası", "Ters dönüş", "Faz sırası rölesi"],
              ["Toprak kaçağı", "İnsülasyon arızası", "Earth fault relay"],
              ["Sıcaklık", "Aşırı ısınma", "PTC/NTC termistör"],
              ["Düşük gerilim", "Gerilim düşmesi", "Undervoltage relay"]
            ]
          }
        },
        {
          heading: "Motor Bakım Periyotları",
          paragraphs: [],
          table: {
            headers: ["Bakım İşi", "Periyot", "Detay"],
            rows: [
              ["Görsel kontrol", "Haftalık", "Gürültü, titreşim, sıcaklık"],
              ["İnsülasyon direnci", "3 aylık", "Megger testi"],
              ["Yatak yağlama", "3-6 aylık", "Gres veya yağ değişimi"],
              ["Hava filtresi temizliği", "Aylık", "Fan soğutmalı motorlar"],
              ["Sargı temizliği", "Yıllık", "Toz ve nem temizliği"],
              ["Yatak değişimi", "20.000-40.000 saat", "Titreşim ölçümüne göre"]
            ]
          }
        },
        {
          heading: "Arıza Teşhisi",
          paragraphs: [],
          bulletPoints: [
            "Aşırı titreşim: Yatak aşınması, hizalama bozukluğu veya rotor dengesizliği",
            "Aşırı ısınma: Aşırı yük, yetersiz havalandırma veya sargı arızası",
            "Anormal gürültü: Yatak hasarı veya mekanik temas",
            "Düşük insülasyon: Nem, toz veya yaşlanma",
            "Yüksek akım çekme: Mekanik yük artışı veya sargı kısa devresi"
          ]
        }
      ],
      keyPoints: [
        "Termik röle ayarı motor nominal akımına göre yapılmalıdır.",
        "PTC termistör motorun en hassas sıcaklık korumasıdır.",
        "İnsülasyon direnci trend takibi erken arıza tespiti sağlar."
      ]
    },

    "Seyir fenerleri (navigation lights)": {
      title: "Seyir Fenerleri (Navigation Lights)",
      introduction:
        "Seyir fenerleri, COLREG (Denizde Çatışmayı Önleme Tüzüğü) Kural 20-31'e göre gece ve kısıtlı görüş koşullarında geminin konumu, büyüklüğü, durumu ve faaliyetini diğer gemilere gösteren zorunlu aydınlatma sistemidir.",
      sections: [
        {
          heading: "Temel Fener Düzeni",
          paragraphs: [],
          table: {
            headers: ["Fener", "Renk", "Açı", "Konumu"],
            rows: [
              ["İskele (Port)", "Kırmızı", "112,5°", "Sol taraf"],
              ["Sancak (Starboard)", "Yeşil", "112,5°", "Sağ taraf"],
              ["Pruva feneri (Masthead)", "Beyaz", "225°", "Ana direk"],
              ["Kıç feneri (Stern)", "Beyaz", "135°", "Kıç"],
              ["Her yönden görülür", "Beyaz/Kırmızı", "360°", "Duruma göre"]
            ]
          }
        },
        {
          heading: "Elektrik Besleme Gereksinimleri",
          paragraphs: [
            "Seyir fenerleri SOLAS zorunlu tüketicilerdir ve hiçbir koşulda enerji kesilmez. Acil dağıtım panosundan (ESB) beslenir. Fener arıza izleme paneli (navigation light panel) her fenerin durumunu gösterir ve arızada sesli/görsel alarm verir.",
            "Modern gemilerde LED seyir fenerleri kullanılır. LED fenerlerin ömrü 50.000+ saattir ve düşük güç tüketimi sunar."
          ]
        }
      ],
      keyPoints: [
        "Seyir fenerleri gece ve kısıtlı görüşte COLREG gereği zorunludur.",
        "Fener arıza izleme sistemi köprüüstünde bulunmalıdır.",
        "Yedek ampul veya LED modülü her zaman bulundurulmalıdır."
      ]
    },

    "Acil aydınlatma sistemi": {
      title: "Acil Aydınlatma Sistemi",
      introduction:
        "Acil aydınlatma, ana güç kaybında kaçış yollarını, toplanma noktalarını ve kritik istasyonları aydınlatan güvenlik sistemidir.",
      sections: [
        {
          heading: "SOLAS Gereklilikleri",
          paragraphs: [
            "SOLAS Bölüm II-1 Kural 42 gereği acil aydınlatma, ana güç kaybından sonra otomatik olarak devreye girmelidir. Yolcu gemilerinde 36 saat, yük gemilerinde 18 saat kesintisiz çalışma süresi gereklidir.",
            "Acil aydınlatma ESB üzerinden acil jeneratör veya akü ile beslenir."
          ]
        },
        {
          heading: "Aydınlatılan Alanlar",
          paragraphs: [],
          bulletPoints: [
            "Kaçış yolları ve koridorlar",
            "Merdiven kuyuları",
            "Toplanma noktaları (muster station)",
            "Cankurtaran bot/sal istasyonları",
            "Makine dairesi ve kontrol odası",
            "Köprüüstü",
            "Yangın istasyonları",
            "Acil jeneratör odası"
          ]
        },
        {
          heading: "Low-Location Lighting (LLL)",
          paragraphs: [
            "IMO MSC.Res.A.752 standardına göre, yolcu gemilerinde kaçış yollarında yerden 30 cm yükseklikte fotolüminesan (fosforlu) veya elektrikli düşük seviye aydınlatma şeritleri bulunmalıdır. Bu şeritler duman altındaki koridorlarda tahliye yönünü gösterir."
          ]
        }
      ],
      keyPoints: [
        "Acil aydınlatma otomatik devreye girmelidir; manuel müdahale gerekmemelidir.",
        "Fotolüminesan işaretler elektrik gerektirmez ve güvenilirdir.",
        "Akü besleme süresi periyodik olarak test edilmelidir."
      ]
    },

    "Akü tipleri ve şarj sistemleri": {
      title: "Akü Tipleri ve Şarj Sistemleri",
      introduction:
        "Gemi akü sistemleri, acil güç kaynağı, UPS ve başlatma sistemleri için kullanılan elektrokimyasal enerji depolama üniteleridir.",
      sections: [
        {
          heading: "Akü Tipleri",
          paragraphs: [],
          table: {
            headers: ["Akü Tipi", "Gerilim/Hücre", "Enerji Yoğunluğu", "Ömür", "Kullanım"],
            rows: [
              ["Kurşun-asit", "2,0 V", "30-50 Wh/kg", "3-5 yıl", "Acil güç, başlatma"],
              ["Ni-Cd", "1,2 V", "40-60 Wh/kg", "15-20 yıl", "Acil aydınlatma, UPS"],
              ["Li-ion", "3,6-3,7 V", "150-250 Wh/kg", "8-15 yıl", "Hibrit itme, ESS"],
              ["VRLA (bakımsız)", "2,0 V", "30-40 Wh/kg", "5-10 yıl", "UPS, telekomünikasyon"]
            ]
          }
        },
        {
          heading: "Şarj Sistemleri",
          paragraphs: [
            "Akü şarj cihazları, sabit gerilim (CV), sabit akım (CC) veya CC-CV kombine modunda çalışır. Denizcilik aküleri genellikle IU (CC-CV) şarj profiline sahiptir: önce sabit akımla %80'e kadar şarj edilir, ardından sabit gerilimde akım azalarak tam doluma ulaşır.",
            "Eşitleme şarjı (equalizing charge), tüm hücrelerin eşit gerilime getirilmesi için periyodik olarak uygulanan kontrollü aşırı şarjdır."
          ]
        },
        {
          heading: "Akü Bakımı",
          paragraphs: [],
          bulletPoints: [
            "Elektrolit seviyesi kontrolü (açık tip aküler)",
            "Özgül ağırlık ölçümü (hidrometre ile)",
            "Terminal gerilimi ölçümü (hücre bazında)",
            "Bağlantı gevşekliği kontrolü",
            "Akü odası havalandırması (H₂ gazı riski)",
            "Sıcaklık izleme"
          ]
        }
      ],
      keyPoints: [
        "Ni-Cd aküler en uzun ömürlü ve en güvenilir tiptir ancak maliyeti yüksektir.",
        "Li-ion akü odaları özel yangın söndürme ve havalandırma sistemi gerektirir.",
        "Akü odası havalandırması %1 H₂ konsantrasyonunu aşmamalıdır."
      ]
    },

    "UPS (kesintisiz güç kaynağı)": {
      title: "UPS (Kesintisiz Güç Kaynağı)",
      introduction:
        "UPS, güç kesintisi veya kalite bozukluğu durumunda kritik ekipmanların kesintisiz çalışmasını sağlayan güç kaynağı sistemidir.",
      sections: [
        {
          heading: "UPS Tipleri",
          paragraphs: [],
          table: {
            headers: ["Tip", "Topoloji", "Transfer Süresi", "Kullanım"],
            rows: [
              ["Online (double conversion)", "AC→DC→AC sürekli", "0 ms", "Navigasyon, GMDSS"],
              ["Line-interactive", "AVR + invertör", "<5 ms", "Bilgisayar, PLC"],
              ["Offline (standby)", "Bypass + invertör", "5-12 ms", "Genel amaçlı"]
            ]
          }
        },
        {
          heading: "Gemi UPS Uygulamaları",
          paragraphs: [],
          bulletPoints: [
            "ECDIS, radar, GPS gibi navigasyon cihazları",
            "GMDSS haberleşme ekipmanları",
            "Otomasyon ve PLC kontrol sistemleri",
            "Yangın algılama merkezi",
            "CCTV ve güvenlik sistemleri"
          ]
        },
        {
          heading: "UPS Kapasite Hesabı",
          paragraphs: [],
          formula: {
            expression: "C (Ah) = (P × t) / (V × η × PF)",
            variables: [
              "C = akü kapasitesi (Ah)",
              "P = toplam yük (W)",
              "t = istenen süre (saat)",
              "V = akü gerilimi (V)",
              "η = invertör verimi (≈0,85-0,95)",
              "PF = güç faktörü"
            ]
          },
          example: {
            problem:
              "2000W yük, 24V akü, 2 saat süre, verim %90, PF=0,8 için gereken akü kapasitesini hesaplayınız.",
            steps: [
              "C = (2000 × 2) / (24 × 0,90 × 0,8)",
              "C = 4000 / 17,28"
            ],
            result: "C ≈ 231 Ah. With a 20% depth of discharge limit, the actual capacity should be selected as 231/0.8 ≈ 289 Ah."
          }
        }
      ],
      keyPoints: [
        "Online UPS navigasyon cihazları için zorunludur.",
        "UPS aküleri her 3-5 yılda bir değiştirilmelidir.",
        "UPS bypass şalteri bakım sırasında kullanılır."
      ]
    },

    "Patlama korumalı (Ex-proof) ekipman": {
      title: "Patlama Korumalı (Ex-proof) Ekipman",
      introduction:
        "Patlama korumalı ekipman, yanıcı gaz veya toz bulunan tehlikeli alanlarda güvenli kullanım için özel olarak tasarlanmış elektrikli cihazlardır. Tanker ve LNG gemilerinde kritik öneme sahiptir.",
      sections: [
        {
          heading: "Tehlikeli Alan Sınıflandırması",
          paragraphs: [],
          table: {
            headers: ["Bölge", "Tanım", "Örnek Alan"],
            rows: [
              ["Zone 0", "Patlayıcı atmosfer sürekli mevcut", "Tank içi"],
              ["Zone 1", "Normal çalışmada patlayıcı atmosfer olası", "Pompa odası, valf manifoldu"],
              ["Zone 2", "Patlayıcı atmosfer kısa süreli ve nadir", "Tank güvertesi açık alanlar"]
            ]
          }
        },
        {
          heading: "Koruma Yöntemleri",
          paragraphs: [],
          table: {
            headers: ["Kod", "Yöntem", "Prensip"],
            rows: [
              ["Ex d", "Alev geçirmez muhafaza", "İç patlama dışarı yayılmaz"],
              ["Ex e", "Artırılmış güvenlik", "Kıvılcım oluşmaz"],
              ["Ex i", "Doğal güvenlik", "Enerji ateşleme seviyesinin altında"],
              ["Ex p", "Basınçlı muhafaza", "Temiz hava basıncı"],
              ["Ex n", "Kıvılcım çıkarmaz", "Normal çalışmada kıvılcım yok"]
            ]
          }
        },
        {
          heading: "Bakım ve Kontrol",
          paragraphs: [
            "Ex-proof ekipman bakımı yalnızca yetkili personel tarafından yapılmalıdır. Ekipman üzerindeki tüm vidalar, contalar ve kablo girişleri orijinal durumunda korunmalıdır. Hasarlı Ex-proof ekipman derhal kullanım dışı bırakılmalıdır."
          ]
        }
      ],
      keyPoints: [
        "Ex-proof sertifikası olmayan ekipman tehlikeli alanlarda kullanılamaz.",
        "Ex-proof ekipman bakımı IEC 60079-17 standardına uygun yapılmalıdır.",
        "Doğal güvenlik (Ex i) en güvenli koruma yöntemidir."
      ]
    }
  }
};

export default content8;
