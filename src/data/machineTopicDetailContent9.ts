import type { MachineSubTopicContent } from "./machineTopicDetailContent";

type ContentMap = Record<string, Record<string, MachineSubTopicContent>>;

const content9: ContentMap = {
  // ═══════════════════════════════════════════════════════════════
  // ELEKTRONİK, ÖLÇME VE OTOMASYON
  // ═══════════════════════════════════════════════════════════════
  automation: {
    "Sıcaklık ölçüm sensörleri (termokuple, RTD)": {
      title: "Sıcaklık Ölçüm Sensörleri (Termokuple, RTD)",
      introduction:
        "Sıcaklık, gemi makine dairesinde en sık ölçülen fiziksel büyüklüktür. Egzoz gazı, soğutma suyu, yağlama yağı, yakıt ve yatak sıcaklıkları sürekli izlenir.",
      sections: [
        {
          heading: "Termokuple (Thermocouple)",
          paragraphs: [
            "Termokuple, iki farklı metalin birleşim noktasında sıcaklık farkına bağlı olarak EMK üreten Seebeck etkisine dayalı sensördür. Ölçüm noktası (hot junction) ile referans noktası (cold junction) arasındaki sıcaklık farkı EMK'yı belirler."
          ],
          table: {
            headers: ["Tip", "Metal Çifti", "Aralık", "Gemi Kullanımı"],
            rows: [
              ["K", "Chromel-Alumel", "-200…+1260°C", "Egzoz gazı sıcaklığı"],
              ["J", "Demir-Constantan", "-40…+750°C", "Genel amaçlı"],
              ["T", "Bakır-Constantan", "-200…+350°C", "Düşük sıcaklık"],
              ["N", "Nicrosil-Nisil", "-270…+1300°C", "Yüksek doğruluk"],
              ["R/S", "Platin-Rodyum", "0…+1600°C", "Laboratuvar, kalibrason"]
            ]
          }
        },
        {
          heading: "RTD (Resistance Temperature Detector)",
          paragraphs: [
            "RTD, metalin elektrik direncinin sıcaklıkla orantılı değişmesi prensibine dayanır. Pt100 (0°C'de 100 Ω direnç) en yaygın tiptir. RTD termookuplaara göre daha hassas, tekrarlanabilir ve doğrusaldır; ancak yanıt süresi daha yavaştır."
          ],
          formula: {
            expression: "R_t = R_0 × (1 + α × ΔT)",
            variables: [
              "R_t = T sıcaklığındaki direnç (Ω)",
              "R_0 = 0°C'deki direnç (100 Ω, Pt100 için)",
              "α = sıcaklık katsayısı (0,00385 Ω/Ω/°C, Pt için)",
              "ΔT = sıcaklık değişimi (°C)"
            ]
          },
          example: {
            problem: "Pt100 sensörde ölçülen direnç 138,5 Ω ise sıcaklığı hesaplayınız.",
            steps: [
              "R_t = R_0 × (1 + α × ΔT)",
              "138,5 = 100 × (1 + 0,00385 × ΔT)",
              "1,385 = 1 + 0,00385 × ΔT",
              "ΔT = 0,385 / 0,00385"
            ],
            result: "ΔT = 100°C. Ölçülen sıcaklık 100°C'dir."
          }
        },
        {
          heading: "Termokuple ve RTD Karşılaştırması",
          paragraphs: [],
          table: {
            headers: ["Özellik", "Termokuple", "RTD (Pt100)"],
            rows: [
              ["Doğruluk", "±1-2°C", "±0,1-0,5°C"],
              ["Yanıt süresi", "Hızlı (ms)", "Yavaş (saniye)"],
              ["Sıcaklık aralığı", "-200…+1300°C", "-200…+850°C"],
              ["Doğrusallık", "Düşük", "Yüksek"],
              ["Kablo etkisi", "Kompanzasyon kablosu gerekli", "3/4 tel bağlantı"],
              ["Maliyet", "Düşük", "Orta-Yüksek"]
            ]
          }
        }
      ],
      keyPoints: [
        "Egzoz sıcaklığında K tipi termokuple standart seçimdir.",
        "Yatak ve soğutma suyu sıcaklığında Pt100 RTD tercih edilir.",
        "Termokuple kompanzasyon kablosu aynı metal çiftinden olmalıdır."
      ]
    },

    "Basınç ölçüm cihazları (Bourdon, piezoelektrik)": {
      title: "Basınç Ölçüm Cihazları",
      introduction:
        "Basınç, makine dairesinde sıcaklıktan sonra en çok ölçülen parametredir. Yağ basıncı, yakıt basıncı, soğutma suyu basıncı, silindir basıncı ve hava basıncı sürekli izlenir.",
      sections: [
        {
          heading: "Bourdon Tüplü Manometre",
          paragraphs: [
            "Bourdon tüpü, basınç uygulandığında açılma eğilimi gösteren C veya heliks şekilli bir metal tüptür. Tüpün ucu bir dişli mekanizma aracılığıyla ibreyi hareket ettirir. Mekanik, güvenilir ve ucuzdur; gemi makine dairesinde en yaygın basınç göstergesidir.",
            "C-tipi Bourdon: 0-60 bar arası, Heliks Bourdon: 60-1000 bar arası, Spiral Bourdon: düşük basınç uygulamaları."
          ]
        },
        {
          heading: "Piezoelektrik Basınç Sensörü",
          paragraphs: [
            "Piezoelektrik kristal (kuvartz), basınç uygulandığında elektrik yükü üreten sensördür. Çok hızlı yanıt süresi nedeniyle silindir basıncı ölçümü (indikatör diyagramı) ve dinamik basınç ölçümlerinde kullanılır.",
            "Yanıt süresi mikrosaniye mertebesindedir; statik basınç ölçümüne uygun değildir (yük kaçağı)."
          ]
        },
        {
          heading: "Diğer Basınç Sensörleri",
          paragraphs: [],
          table: {
            headers: ["Sensör Tipi", "Prensip", "Aralık", "Uygulama"],
            rows: [
              ["Strain gauge", "Direnç değişimi", "0-700 bar", "Proses kontrolü"],
              ["Kapasitif", "Kapasite değişimi", "0-40 bar", "Düşük basınç"],
              ["Diyafram", "Mekanik deformasyon", "0-25 bar", "Korozif akışkanlar"],
              ["Diferansiyel", "İki basınç farkı", "0-10 bar", "Filtre izleme"]
            ]
          }
        }
      ],
      keyPoints: [
        "Bourdon manometre sert titreşime maruz bölgelerde gliserinli tip kullanılmalıdır.",
        "Silindir basıncı için piezoelektrik sensör standart seçimdir.",
        "Transmitter çıkışı 4-20 mA olarak otomasyon sistemine aktarılır."
      ]
    },

    "Seviye ölçüm yöntemleri": {
      title: "Seviye Ölçüm Yöntemleri",
      introduction:
        "Tank seviye ölçümü, yakıt, yağ, balast, tatlı su ve atık tankların yönetimi için kritik öneme sahiptir. Yanlış seviye ölçümü taşma, stabilite sorunları ve operasyonel aksamalara yol açabilir.",
      sections: [
        {
          heading: "Seviye Ölçüm Yöntemleri",
          paragraphs: [],
          table: {
            headers: ["Yöntem", "Prensip", "Doğruluk", "Uygulama"],
            rows: [
              ["Float (şamandıra)", "Mekanik yüzme", "±5 mm", "Servis tankları"],
              ["Diferansiyel basınç", "Hidrostatik basınç", "±1%", "Balast, yakıt"],
              ["Ultrasonik", "Ses dalgası yansıması", "±2 mm", "Tatlı su, kimyasal"],
              ["Radar (FMCW)", "Mikrodalga yansıması", "±1 mm", "Kargo tankları (tanker)"],
              ["Kapasitif", "Dielektrik değişimi", "±1%", "Yağ tankları"],
              ["Sounding tape", "Manuel ölçüm", "±1 mm", "Doğrulama"]
            ]
          }
        },
        {
          heading: "Uzaktan Seviye İzleme",
          paragraphs: [
            "Modern gemilerde tüm tank seviyeleri merkezi alarm ve izleme sistemine (AMS) aktarılır. Seviye transmitterleri 4-20 mA veya dijital sinyal (HART, Modbus) üzerinden haberleşir.",
            "Yüksek seviye alarmı (high level alarm) ve aşırı yüksek seviye alarmı (high-high alarm) taşmayı önler. Düşük seviye alarmı pompanın kuru çalışmasını engeller."
          ]
        },
        {
          heading: "Sounding Prosedürü",
          paragraphs: [
            "Manuel sounding, seviye transmitter arızası veya doğrulama amacıyla yapılır. Sounding borusu ve şerit metre (sounding tape) kullanılır. Ölçüm; ullage (boş mesafe) veya innage (dolu mesafe) olarak yapılır."
          ],
          formula: {
            expression: "Hacim = Seviye × Tank Kesit Alanı × Trim/List düzeltme faktörü",
            variables: [
              "Hacim = tank içindeki sıvı hacmi",
              "Tank kalibrasyon tabloları (sounding table) seviyeden hacme dönüşüm sağlar"
            ]
          }
        }
      ],
      keyPoints: [
        "Kargo tankerlerinde radar seviye ölçümü zorunludur.",
        "Manuel sounding en az günde bir kez yapılmalıdır.",
        "Seviye alarmları düzenli test edilmelidir."
      ]
    },

    "Akış ölçüm cihazları (orifis, Coriolis)": {
      title: "Akış Ölçüm Cihazları",
      introduction:
        "Akış ölçümü, yakıt tüketimi izleme, soğutma suyu debisi kontrolü ve proses kontrolü için kullanılır. IMO DCS uyarınca yakıt tüketimi verisi doğru ölçülmeli ve raporlanmalıdır.",
      sections: [
        {
          heading: "Orifis Plakası",
          paragraphs: [
            "Orifis plakası, boru içine yerleştirilen delikli bir disk olup akışkanı daraltarak basınç farkı yaratır. Bu fark debi ile orantılıdır. Ucuz ve basit yapılıdır; ancak kalıcı basınç kaybı oluşturur."
          ],
          formula: {
            expression: "Q = C_d × A₂ × √(2ΔP / ρ)",
            variables: [
              "Q = debi (m³/s)",
              "C_d = deşarj katsayısı (≈0,6-0,65)",
              "A₂ = orifis alanı (m²)",
              "ΔP = basınç farkı (Pa)",
              "ρ = akışkan yoğunluğu (kg/m³)"
            ]
          }
        },
        {
          heading: "Coriolis Kütle Debimetresi",
          paragraphs: [
            "Coriolis debimetresi, titreşen tüplerden geçen akışkanın Coriolis kuvveti oluşturması prensibine dayanır. Doğrudan kütle debisi ve yoğunluk ölçer; hacimsel dönüşüme gerek yoktur.",
            "Yakıt tüketimi izlemede (bunker yönetimi) en doğru yöntemdir. IMO DCS ve EU MRV uyumlu ölçüm sağlar."
          ],
          table: {
            headers: ["Özellik", "Orifis", "Coriolis"],
            rows: [
              ["Ölçüm tipi", "Hacimsel (dolaylı)", "Kütle (doğrudan)"],
              ["Doğruluk", "±1-2%", "±0,1-0,5%"],
              ["Basınç kaybı", "Yüksek", "Düşük-orta"],
              ["Bakım", "Düşük", "Düşük"],
              ["Maliyet", "Düşük", "Yüksek"],
              ["Viskozite etkisi", "Var", "Yok"]
            ]
          }
        },
        {
          heading: "Diğer Debimetreler",
          paragraphs: [],
          bulletPoints: [
            "Elektromanyetik: İletken sıvılar, balast suyu ölçümü",
            "Ultrasonik (transit-time): Temiz sıvılar, soğutma suyu",
            "Türbin: Yakıt, yağ (orta doğruluk)",
            "Vortex: Buhar debisi ölçümü"
          ]
        }
      ],
      keyPoints: [
        "Yakıt tüketimi ölçümünde Coriolis debimetresi altın standarttır.",
        "Orifis plakası kare kök ilişkisi nedeniyle düşük debilerde hassasiyetini kaybeder.",
        "Debimetre kalibrasyonu periyodik olarak yapılmalıdır."
      ]
    },

    "Devir ve hız ölçümü": {
      title: "Devir ve Hız Ölçümü",
      introduction:
        "Motor devir hızı, güç hesaplamalarının ve performans izlemenin temel parametresidir. Ana motor, yardımcı motor, turboşarjer ve pompa devir hızları sürekli ölçülür.",
      sections: [
        {
          heading: "Ölçüm Yöntemleri",
          paragraphs: [],
          table: {
            headers: ["Yöntem", "Prensip", "Uygulama"],
            rows: [
              ["Manyetik pickup", "Dişli çark + manyetik algılama", "Ana motor, yardımcı motor"],
              ["Optik encoder", "Işık kesintisi", "Hassas hız kontrolü"],
              ["Takometre jeneratör", "Küçük DC jeneratör", "Eski tip göstergeler"],
              ["Proximity sensör", "İndüktif algılama", "Turboşarjer"],
              ["Stroboskop", "Yanıp sönen ışık", "Portatif kontrol"]
            ]
          }
        },
        {
          heading: "Devir Hızı ve Güç İlişkisi",
          paragraphs: [],
          formula: {
            expression: "P = (2π × n × T) / 60",
            variables: [
              "P = güç (W)",
              "n = devir hızı (d/d)",
              "T = tork (Nm)"
            ]
          },
          example: {
            problem: "720 d/d'da dönen bir motorun tork ölçümü 12.500 Nm ise gücü hesaplayınız.",
            steps: [
              "P = (2π × 720 × 12.500) / 60",
              "P = (2 × 3,1416 × 720 × 12.500) / 60",
              "P = 56.549.000 / 60"
            ],
            result: "P ≈ 942.478 W ≈ 942,5 kW."
          }
        }
      ],
      keyPoints: [
        "Manyetik pickup en yaygın gemi devir ölçüm yöntemidir.",
        "Turboşarjer devir ölçümü kritik performans parametresidir.",
        "Devir hızı sinyali otomasyon sistemine RPM olarak aktarılır."
      ]
    },

    "Sinyal dönüştürücüler (4-20 mA, 0-10V)": {
      title: "Sinyal Dönüştürücüler (4-20 mA, 0-10V)",
      introduction:
        "Sinyal dönüştürücüler (transmitterlar), sensör çıkışını standart analog sinyal formatına çeviren ara birimlerdir. 4-20 mA endüstriyel otomasyon standardıdır.",
      sections: [
        {
          heading: "4-20 mA Sinyal Standardı",
          paragraphs: [
            "4-20 mA akım döngüsünde ölçüm aralığının alt sınırı 4 mA, üst sınırı 20 mA ile temsil edilir. 4 mA'nın sıfır yerine alt sınır olması, kablo kopuğu (0 mA) ile minimum ölçüm değerinin ayırt edilmesini sağlar.",
            "Akım sinyali, gerilim sinyaline göre kablo uzunluğu ve gürültüden daha az etkilenir."
          ],
          formula: {
            expression: "I = 4 + (16 × (X − X_min) / (X_max − X_min))",
            variables: [
              "I = çıkış akımı (mA)",
              "X = ölçülen değer",
              "X_min = ölçüm alt sınırı",
              "X_max = ölçüm üst sınırı"
            ]
          },
          example: {
            problem: "0-10 bar basınç transmitterında 6 bar basınçta çıkış akımını hesaplayınız.",
            steps: [
              "I = 4 + (16 × (6 − 0) / (10 − 0))",
              "I = 4 + (16 × 0,6)",
              "I = 4 + 9,6"
            ],
            result: "I = 13,6 mA. Transmitter 6 bar basınçta 13,6 mA çıkış verir."
          }
        },
        {
          heading: "Dijital Haberleşme Protokolleri",
          paragraphs: [],
          table: {
            headers: ["Protokol", "Tip", "Hız", "Kullanım"],
            rows: [
              ["HART", "Analog + dijital", "1200 baud", "4-20 mA üzerine bindirilmiş"],
              ["Modbus RTU", "Dijital seri", "9600-115200", "PLC, otomasyon"],
              ["Profibus", "Dijital fieldbus", "1,5 Mbps", "DCS sistemleri"],
              ["Foundation Fieldbus", "Dijital fieldbus", "31,25 kbps", "Proses kontrolü"],
              ["Ethernet/IP", "Dijital ağ", "100 Mbps+", "Modern IAS"]
            ]
          }
        }
      ],
      keyPoints: [
        "4 mA = ölçüm alt sınırı, 0 mA = kablo arızası — bu ayrım kritiktir.",
        "HART protokolü mevcut 4-20 mA altyapısı üzerinden dijital veri aktarır.",
        "Kalibrasyon sırasında transmitter sıfır ve span ayarı yapılır."
      ]
    },

    "Açık ve kapalı döngü kontrol": {
      title: "Açık ve Kapalı Döngü Kontrol",
      introduction:
        "Kontrol sistemleri, bir sürecin çıkış değişkenini istenen seviyede tutan otomatik düzenleyicilerdir. Gemi makine dairesinde sıcaklık, basınç, seviye, debi ve devir hızı kontrol döngüleri yaygındır.",
      sections: [
        {
          heading: "Açık Döngü Kontrol (Open Loop)",
          paragraphs: [
            "Açık döngü sistemde çıkış değeri ölçülmez ve geri besleme yoktur. Kontrol aksiyonu sabit veya önceden belirlenmiş bir programa göre yapılır. Örnek: zamanlayıcıyla çalışan havalandırma fanı. Dış etkenlere (yük değişimi, ortam sıcaklığı) uyum sağlayamaz."
          ]
        },
        {
          heading: "Kapalı Döngü Kontrol (Closed Loop)",
          paragraphs: [
            "Kapalı döngü sistemde çıkış değeri sürekli ölçülür ve referans değerle (set point) karşılaştırılır. Sapma (hata sinyali) kontrolöre beslenir ve kontrolör düzeltici aksiyonu uygular.",
            "Makine dairesinde soğutma suyu sıcaklık kontrolü tipik bir kapalı döngü örnektir: sıcaklık sensörü ölçer → kontrolör karşılaştırır → termostatik valf ayarlanır."
          ]
        },
        {
          heading: "Kontrol Döngüsü Elemanları",
          paragraphs: [],
          bulletPoints: [
            "Set point (SP): İstenen değer",
            "Process variable (PV): Ölçülen gerçek değer",
            "Error (e): SP − PV farkı",
            "Controller: Hata sinyalini işleyen birim (PID)",
            "Control element: Düzeltici aksiyon yapan eleman (valf, damper)",
            "Sensor/Transmitter: Çıkışı ölçen eleman"
          ]
        }
      ],
      keyPoints: [
        "Kapalı döngü kontrol, bozuculara karşı uyum sağlar.",
        "Açık döngü basit uygulamalarda (on/off zamanlayıcı) kullanılır.",
        "Gemi otomasyonunda neredeyse tüm kritik kontroller kapalı döngüdür."
      ]
    },

    "PID kontrol algoritması": {
      title: "PID Kontrol Algoritması",
      introduction:
        "PID (Proportional-Integral-Derivative) kontrolör, endüstriyel otomasyon ve gemi kontrol sistemlerinde en yaygın kullanılan kontrol algoritmasıdır.",
      sections: [
        {
          heading: "PID Bileşenleri",
          paragraphs: [
            "P (Orantısal): Hatanın büyüklüğüyle orantılı çıkış üretir. Hızlı tepki verir ancak kalıcı hata (offset) bırakır.",
            "I (İntegral): Hatanın zamanla toplamını hesaplar ve kalıcı hatayı sıfırlar. Ancak aşırı integral aşımına (overshoot) neden olabilir.",
            "D (Türev): Hatanın değişim hızını ölçer ve aşımı azaltır. Gürültüye duyarlıdır."
          ],
          formula: {
            expression: "u(t) = K_p × e(t) + K_i × ∫e(t)dt + K_d × de(t)/dt",
            variables: [
              "u(t) = kontrolör çıkışı",
              "e(t) = hata sinyali (SP − PV)",
              "K_p = orantısal kazanç",
              "K_i = integral kazancı",
              "K_d = türev kazancı"
            ]
          }
        },
        {
          heading: "P, I, D Parametrelerinin Etkileri",
          paragraphs: [],
          table: {
            headers: ["Parametre", "Artırılırsa", "Azaltılırsa"],
            rows: [
              ["K_p", "Hızlı tepki, olası salınım", "Yavaş tepki, büyük offset"],
              ["K_i", "Offset giderilir, olası overshoot", "Kalıcı hata kalır"],
              ["K_d", "Aşım azalır, gürültü hassasiyeti", "Aşım artar"]
            ]
          }
        },
        {
          heading: "Gemi Uygulamaları",
          paragraphs: [],
          bulletPoints: [
            "Soğutma suyu sıcaklık kontrolü: PI (türev gürültü nedeniyle genelde devre dışı)",
            "Jeneratör frekans kontrolü (governör): PID",
            "AVR gerilim kontrolü: PID",
            "Tank seviye kontrolü: P veya PI",
            "Kazan buhar basıncı: PI"
          ]
        }
      ],
      keyPoints: [
        "Çoğu gemi uygulamasında PI kontrolör yeterlidir.",
        "Türev terimi gürültülü sensörlerde sorun çıkarabilir.",
        "PID ayarı (tuning) Ziegler-Nichols veya deneme-yanılma yöntemiyle yapılır."
      ]
    },

    "P, I, D parametrelerinin etkileri": {
      title: "P, I, D Parametrelerinin Etkileri",
      introduction:
        "PID kontrolörün performansı, orantısal kazanç (Kp), integral zamanı (Ti) ve türev zamanı (Td) parametrelerine bağlıdır. Doğru ayar, kararlı ve hızlı kontrol sağlar.",
      sections: [
        {
          heading: "Parametre Etki Analizi",
          paragraphs: [
            "Orantısal Kazanç (Kp): Düşük Kp → yavaş tepki, büyük offset. Yüksek Kp → hızlı tepki, salınım. Çok yüksek Kp → kararsız sistem.",
            "İntegral Zaman (Ti): Büyük Ti → yavaş offset giderme. Küçük Ti → hızlı offset giderme, olası overshoot ve salınım. Çok küçük Ti → integral doyma (windup).",
            "Türev Zaman (Td): Td = 0 → türev etkisi yok. Artan Td → aşım azalır, ancak gürültü büyütülür. Çok büyük Td → gürültüden kaynaklı salınım."
          ]
        },
        {
          heading: "Ziegler-Nichols Ayar Yöntemi",
          paragraphs: [
            "1. I ve D terimlerini devre dışı bırak (Ti = ∞, Td = 0).",
            "2. Kp'yi sürekli salınım oluşana kadar artır → bu değer K_u (ultimate gain).",
            "3. Salınım periyodunu ölç → T_u.",
            "4. Tablo değerlerinden PID parametrelerini hesapla."
          ],
          table: {
            headers: ["Kontrolör", "Kp", "Ti", "Td"],
            rows: [
              ["P", "0,5 × K_u", "—", "—"],
              ["PI", "0,45 × K_u", "T_u / 1,2", "—"],
              ["PID", "0,6 × K_u", "T_u / 2", "T_u / 8"]
            ]
          }
        }
      ],
      keyPoints: [
        "Ziegler-Nichols yöntemi başlangıç ayarı sağlar; ince ayar deneyimle yapılır.",
        "İntegral windup, kontrol elemanı doyduğunda oluşur; anti-windup gereklidir.",
        "Gürültülü sensörlerde türev terimi filtrelenmeli veya devre dışı bırakılmalıdır."
      ]
    },

    "Kontrol döngüsü ayarı (tuning)": {
      title: "Kontrol Döngüsü Ayarı (Tuning)",
      introduction:
        "Kontrol döngüsü ayarı, PID parametrelerinin proses karakteristiklerine uygun şekilde optimize edilmesidir. İyi ayarlanmış bir döngü hızlı, kararlı ve minimum aşımlı kontrol sağlar.",
      sections: [
        {
          heading: "Tuning Kriterleri",
          paragraphs: [],
          bulletPoints: [
            "Rise time (yükselme süresi): Set point'e ulaşma hızı",
            "Overshoot: Set point'i aşma miktarı (%)",
            "Settling time: Kararlı hale gelme süresi",
            "Steady-state error: Kalıcı hata (offset)",
            "Stability: Salınım olmaması"
          ]
        },
        {
          heading: "Pratik Tuning Adımları",
          paragraphs: [
            "1. Tüm terimleri sıfırla (Kp düşük, Ki=0, Kd=0).",
            "2. Kp'yi yavaşça artır; sistem kabul edilebilir hızda tepki verene kadar.",
            "3. Ki'yi ekle; offset giderilene kadar artır.",
            "4. Aşım (overshoot) varsa Kd ekle.",
            "5. Farklı yük koşullarında test et.",
            "6. Tatmin edici performans elde edilene kadar ince ayar yap."
          ]
        },
        {
          heading: "Oto-Tuning",
          paragraphs: [
            "Modern PLC ve kontrolörler oto-tuning fonksiyonuna sahiptir. Sistem otomatik olarak relay feedback testi yaparak proses dinamiklerini belirler ve PID parametrelerini hesaplar. Ancak oto-tuning her zaman optimal sonuç vermez; kritik döngülerde manuel ince ayar gereklidir."
          ]
        }
      ],
      keyPoints: [
        "Tuning sonrası farklı yük koşullarında test şarttır.",
        "Agresif tuning hızlı tepki verir ancak kararsızlık riski taşır.",
        "Konservatif tuning daha yavaş ancak daha güvenilirdir."
      ]
    },

    "Kaskad ve ileri besleme kontrol": {
      title: "Kaskad ve İleri Besleme Kontrol",
      introduction:
        "Basit geri beslemeli kontrol bazı süreçlerde yetersiz kalır. Kaskad ve ileri besleme kontrol yapıları, daha iyi bozucu reddi ve hızlı tepki sağlar.",
      sections: [
        {
          heading: "Kaskad Kontrol",
          paragraphs: [
            "Kaskad kontrolde iki iç içe döngü bulunur: dış (master/primary) döngü ana proses değişkenini kontrol eder; iç (slave/secondary) döngü daha hızlı değişen ara değişkeni kontrol eder.",
            "Örnek: Kazan buhar sıcaklığı kontrolü. Dış döngü: buhar sıcaklığı → iç döngü: yakıt debisi. Yakıt basıncındaki bozuculuk iç döngü tarafından hızla düzeltilir, dış döngüyü etkilemeden."
          ]
        },
        {
          heading: "İleri Besleme (Feedforward) Kontrol",
          paragraphs: [
            "İleri beslemede bozucu etki ölçülür ve etkisini göstermeden önce düzeltici aksiyon uygulanır. Geri beslemeyle birlikte kullanıldığında (feedforward + feedback) hem hızlı bozucu reddi hem de offset giderme sağlanır.",
            "Örnek: Kazan su seviye kontrolü. Buhar debisi ölçülür (bozucu) ve besleme suyu debisi ona göre ayarlanır; seviye kontrolörü ince ayar yapar (three-element control)."
          ]
        }
      ],
      keyPoints: [
        "Kaskad kontrol, büyük zaman gecikmesi olan süreçlerde etkilidir.",
        "İleri besleme, ölçülebilir bozucularda tepki süresini kısaltır.",
        "Kazan three-element kontrolü (su seviyesi + buhar debisi + besleme suyu debisi) klasik bir feedforward uygulamasıdır."
      ]
    },

    "PLC donanım yapısı ve I/O": {
      title: "PLC Donanım Yapısı ve I/O",
      introduction:
        "Programlanabilir Mantık Kontrolörü (PLC), endüstriyel otomasyon ve gemi kontrol sistemlerinin temel hesaplama birimidir. Sensör girişlerini okur, programına göre mantıksal kararlar alır ve çıkışları kontrol eder.",
      sections: [
        {
          heading: "PLC Donanım Bileşenleri",
          paragraphs: [],
          bulletPoints: [
            "CPU (İşlemci): Programı çalıştırır, mantık ve hesaplama yapar",
            "Güç kaynağı: 24V DC veya 220V AC ile besleme",
            "Dijital giriş modülü: On/off sinyaller (şalter, buton, limit switch)",
            "Dijital çıkış modülü: Röle, kontaktör, valf sürme",
            "Analog giriş modülü: 4-20 mA, 0-10V sensör sinyalleri",
            "Analog çıkış modülü: 4-20 mA kontrol sinyalleri",
            "Haberleşme modülü: Modbus, Profibus, Ethernet"
          ]
        },
        {
          heading: "I/O Tipleri ve Sinyal Seviyesi",
          paragraphs: [],
          table: {
            headers: ["I/O Tipi", "Sinyal", "Örnek Kullanım"],
            rows: [
              ["DI (Digital Input)", "24V DC on/off", "Şalter, alarm kontak"],
              ["DO (Digital Output)", "24V DC veya röle", "Selenoid valf, lamba"],
              ["AI (Analog Input)", "4-20 mA / 0-10V", "Sıcaklık, basınç transmitter"],
              ["AO (Analog Output)", "4-20 mA / 0-10V", "Kontrol valfi, VFD hız"],
              ["PI (Pulse Input)", "Frekans/darbe", "Debimetre, takometre"]
            ]
          }
        },
        {
          heading: "PLC Çalışma Döngüsü (Scan Cycle)",
          paragraphs: [
            "PLC programını sürekli tekrarlayan bir döngüde çalıştırır: 1) Tüm girişleri oku → 2) Programı çalıştır → 3) Tüm çıkışları güncelle → 4) Haberleşme ve housekeeping. Tipik scan süresi 1-50 ms arasındadır."
          ]
        }
      ],
      keyPoints: [
        "PLC scan süresi, kontrol hızını belirleyen kritik parametredir.",
        "Analog modüller 12-bit veya 16-bit çözünürlükte çalışır.",
        "Modüler PLC yapısı genişlemeye olanak tanır."
      ]
    },

    "Ladder diyagram programlama": {
      title: "Ladder Diyagram Programlama",
      introduction:
        "Ladder diyagramı (LD), PLC programlama dillerinin en yaygınıdır. IEC 61131-3 standardında tanımlanan beş programlama dilinden biridir ve röle mantığına dayanır.",
      sections: [
        {
          heading: "Temel Elemanlar",
          paragraphs: [],
          table: {
            headers: ["Sembol", "İsim", "Fonksiyon"],
            rows: [
              ["—| |—", "Normally Open (NO)", "Kontak açık; sinyal gelince iletir"],
              ["—|/|—", "Normally Closed (NC)", "Kontak kapalı; sinyal gelince keser"],
              ["—( )—", "Output Coil", "Çıkış enerjilenir"],
              ["—(S)—", "Set Coil", "Çıkışı kalıcı olarak set eder"],
              ["—(R)—", "Reset Coil", "Set edilmiş çıkışı resetler"],
              ["[TON]", "Timer On-Delay", "Belirli süre sonra çıkış verir"],
              ["[CTU]", "Counter Up", "Sayma işlemi"]
            ]
          }
        },
        {
          heading: "Programlama Örneği",
          paragraphs: [
            "Pompa start/stop kontrolü: START butonu (NO) basılınca pompa kontaktörü enerjilenir. STOP butonu (NC) basılınca devre kesilir. Seal-in (tutma) kontağı pompa kontaktörünün kendi kontağıdır ve START bırakıldıktan sonra devreyi tutmayı sağlar.",
            "Overload rölesi NC kontağı seri bağlanır; aşırı yükte devreyi keser."
          ]
        }
      ],
      keyPoints: [
        "Ladder diyagramı elektrikçiler tarafından en kolay anlaşılan PLC dilidir.",
        "Karmaşık algoritmalar için Structured Text (ST) daha uygundur.",
        "Online monitoring ile PLC programı canlı izlenebilir."
      ]
    },

    "Alarm ve izleme sistemi (AMS)": {
      title: "Alarm ve İzleme Sistemi (AMS)",
      introduction:
        "Alarm ve Monitoring Sistemi (AMS), gemi makine dairesi ve tüm teknik alanların merkezi izlenmesini ve alarm yönetimini sağlayan otomasyon alt sistemidir.",
      sections: [
        {
          heading: "AMS Fonksiyonları",
          paragraphs: [],
          bulletPoints: [
            "Sıcaklık, basınç, seviye, debi parametrelerinin sürekli izlenmesi",
            "Alarm eşik değeri aşıldığında sesli/görsel uyarı",
            "Alarm geçmişi kayıt ve trend analizi",
            "Operatör ekranında proses şeması (mimic diagram) gösterimi",
            "Alarm kabul (acknowledge) ve susturma (mute) fonksiyonları",
            "Alarm gruplama ve önceliklendirme"
          ]
        },
        {
          heading: "Alarm Öncelikleri",
          paragraphs: [],
          table: {
            headers: ["Öncelik", "Seviye", "Aksiyon", "Örnek"],
            rows: [
              ["1 - Kritik", "Shutdown/Trip", "Otomatik durdurma", "Yağ basıncı çok düşük"],
              ["2 - Yüksek", "Alarm", "Acil müdahale gerekli", "Egzoz sıcaklığı yüksek"],
              ["3 - Uyarı", "Warning", "İzle ve planla", "Filtre ΔP artışı"],
              ["4 - Bilgi", "Status", "Bilgilendirme", "Pompa çalışıyor/durdu"]
            ]
          }
        },
        {
          heading: "UMS (Unmanned Machinery Space) Koşulları",
          paragraphs: [
            "UMS sınıflandırması, makine dairesinin gece vardiyasında insansız bırakılabilmesi için AMS'in belirli gereksinimleri karşılamasını zorunlu kılar. Alarmlar köprüüstü ve mühendis kamarasına aktarılmalı, dead-man alarm sistemi bulunmalı ve tüm kritik parametreler izlenmelidir."
          ]
        }
      ],
      keyPoints: [
        "Alarm flood (çok sayıda eşzamanlı alarm) durumunda önceliklendirme kritiktir.",
        "UMS operasyonu için AMS güvenilirliği zorunludur.",
        "Alarm geçmişi klas ve bayrak devleti denetimleri için saklanmalıdır."
      ]
    },

    "Dağıtık kontrol sistemi (DCS)": {
      title: "Dağıtık Kontrol Sistemi (DCS)",
      introduction:
        "Dağıtık Kontrol Sistemi (DCS), kontrol fonksiyonlarının birden fazla denetleyici arasında dağıtıldığı merkezi izleme ve kontrol mimarisidir. Büyük gemilerde ve offshore platformlarda kullanılır.",
      sections: [
        {
          heading: "DCS Mimarisi",
          paragraphs: [
            "DCS, yerel kontrol istasyonları (I/O kabineleri), merkezi operatör istasyonları (HMI), mühendislik istasyonu ve yedekli haberleşme ağından oluşur. Her yerel istasyon kendi bölgesindeki kontrolü bağımsız yürütür; merkezi sistem izleme ve üst düzey koordinasyon sağlar."
          ]
        },
        {
          heading: "DCS ve PLC Karşılaştırması",
          paragraphs: [],
          table: {
            headers: ["Özellik", "DCS", "PLC"],
            rows: [
              ["Mimari", "Dağıtık", "Merkezi veya dağıtık"],
              ["Kontrol odağı", "Sürekli proses kontrolü", "Ardışık mantık"],
              ["Ölçek", "Büyük (1000+ I/O)", "Küçük-orta"],
              ["Yedeklilik", "Dahili", "Opsiyonel"],
              ["Maliyet", "Yüksek", "Düşük-orta"],
              ["Gemi uygulaması", "FPSO, LNG, cruise", "Standart yük gemisi"]
            ]
          }
        }
      ],
      keyPoints: [
        "DCS daha çok sürekli proses kontrolüne, PLC ardışık mantık kontrolüne yöneliktir.",
        "Modern sistemlerde DCS ve PLC arasındaki sınır bulanıklaşmaktadır.",
        "Yedekli DCS sistemi tek nokta arıza riskini ortadan kaldırır."
      ]
    },

    "Gemi entegre otomasyon sistemi (IAS)": {
      title: "Gemi Entegre Otomasyon Sistemi (IAS)",
      introduction:
        "Entegre Otomasyon Sistemi (IAS), gemideki tüm kontrol ve izleme alt sistemlerini tek bir platform altında birleştiren üst düzey otomasyon mimarisidir.",
      sections: [
        {
          heading: "IAS Alt Sistemleri",
          paragraphs: [],
          bulletPoints: [
            "Makine izleme ve kontrol (AMS + kontrol döngüleri)",
            "Güç yönetim sistemi (PMS)",
            "Kargo kontrol (yük, balast, inert gaz)",
            "Güverte makine kontrolü (vinç, ırgat)",
            "HVAC kontrolü",
            "Yangın algılama ve söndürme",
            "Navigasyon entegrasyonu (BNWAS, VDR)",
            "Raporlama ve trend analizi"
          ]
        },
        {
          heading: "IAS Haberleşme Ağı",
          paragraphs: [
            "Modern IAS sistemleri Ethernet tabanlı yedekli ring veya star topolojisi kullanır. Sahada (field level) Modbus, Profibus veya CANbus ile sensör/aktüatör haberleşmesi yapılırken, kontrol seviyesinde (control level) Ethernet/IP ile kontrolörler arası veri paylaşımı sağlanır.",
            "Operatör seviyesinde (HMI level) grafik ekranlar, trend göstergeleri ve alarm yönetimi sunulur."
          ]
        }
      ],
      keyPoints: [
        "IAS, farklı üreticilerin alt sistemlerini entegre edebilmelidir.",
        "Siber güvenlik IAS için giderek artan bir endişe kaynağıdır.",
        "IAS arızasında lokal kontrol panellerinden manuel operasyon mümkün olmalıdır."
      ]
    },

    "Uzaktan izleme ve tanı": {
      title: "Uzaktan İzleme ve Tanı",
      introduction:
        "Uzaktan izleme, gemi makine sistemlerinin kıyıdaki destek merkezinden uydu bağlantısı üzerinden gerçek zamanlı izlenmesi ve uzaktan teknik destek sağlanmasıdır.",
      sections: [
        {
          heading: "Sistem Bileşenleri",
          paragraphs: [],
          bulletPoints: [
            "Gemi tarafı: Veri toplama ünitesi, gateway, uydu modem",
            "Kıyı tarafı: Veri merkezi, analitik yazılım, uzman ekip",
            "Haberleşme: VSAT, Fleet Broadband veya LEO uydu",
            "Veri güvenliği: VPN tüneli, şifreleme, erişim kontrolü"
          ]
        },
        {
          heading: "Uzaktan İzleme Fonksiyonları",
          paragraphs: [],
          table: {
            headers: ["Fonksiyon", "Açıklama", "Fayda"],
            rows: [
              ["Canlı veri izleme", "Gerçek zamanlı parametre takibi", "Erken arıza tespiti"],
              ["Trend analizi", "Geçmiş veri karşılaştırma", "Performans optimizasyonu"],
              ["Uzaktan tanı", "Kıyı uzmanının arıza analizi", "Azaltılmış liman duruşu"],
              ["Raporlama", "Otomatik performans raporu", "Ticari verimlilik"],
              ["Yazılım güncelleme", "PLC/HMI uzaktan güncelleme", "Bakım kolaylığı"]
            ]
          }
        },
        {
          heading: "Siber Güvenlik",
          paragraphs: [
            "IMO MSC.428(98) kararı uyarınca gemi siber güvenliği ISM Code kapsamında değerlendirilmelidir. Uzaktan erişim, yetkilendirme, güvenlik duvarı ve ağ segmentasyonu ile korunmalıdır."
          ]
        }
      ],
      keyPoints: [
        "Uzaktan izleme bakım maliyetlerini %10-20 azaltabilir.",
        "Veri güvenliği ve siber güvenlik en kritik endişelerdir.",
        "Düşük bant genişliğinde veri sıkıştırma ve önceliklendirme gerekir."
      ]
    },

    "Diyot ve thyristor (SCR)": {
      title: "Diyot ve Thyristor (SCR)",
      introduction:
        "Diyot ve thyristor (SCR), güç elektroniğinin temel yarı iletken elemanlarıdır. AC-DC dönüşüm, motor kontrolü ve uyarma sistemlerinde kullanılır.",
      sections: [
        {
          heading: "Diyot",
          paragraphs: [
            "Diyot, yalnızca bir yönde akım geçiren iki uçlu yarı iletken elemandır. P-N birleşiminden oluşur. İleri yönde (anot +, katot −) polarize edildiğinde iletir; ters yönde bloke eder.",
            "Güç diyotları doğrultucu devrelerde AC'yi DC'ye çevirmek için kullanılır. Fırçasız jeneratör uyarma sisteminde döner diyot grubu rotor üzerinde bulunur."
          ]
        },
        {
          heading: "Thyristor (SCR)",
          paragraphs: [
            "SCR (Silicon Controlled Rectifier), gate tetikleme sinyali ile açılan ve akım sıfıra düşene kadar ileten üç uçlu yarı iletken elemandır. Gate açma açısı kontrol edilerek DC çıkış gerilimi ayarlanabilir.",
            "Gemi uygulamaları: Jeneratör statik uyarma sistemi, DC motor hız kontrolü, kontrollü doğrultucu devreleri."
          ]
        },
        {
          heading: "Tetikleme Açısı ve Çıkış",
          paragraphs: [],
          formula: {
            expression: "V_dc = (V_max / π) × (1 + cosα) — yarım dalga için",
            variables: [
              "V_dc = ortalama DC çıkış gerilimi",
              "V_max = AC tepe gerilimi",
              "α = tetikleme (ateşleme) açısı (derece)"
            ]
          }
        }
      ],
      keyPoints: [
        "SCR tetiklendiğinde gate sinyali kaldırılsa da akım akmaya devam eder.",
        "GTO (Gate Turn-Off) thyristor, gate ile kapatılabilir.",
        "Modern IGBT'ler birçok SCR uygulamasının yerini almaktadır."
      ]
    },

    "Doğrultucu devreler": {
      title: "Doğrultucu Devreler",
      introduction:
        "Doğrultucu devreler, AC gerilimi DC gerilime çeviren güç elektroniği devreleridir. Akü şarj, DC motor besleme ve PLC güç kaynağı uygulamalarında kullanılır.",
      sections: [
        {
          heading: "Doğrultucu Tipleri",
          paragraphs: [],
          table: {
            headers: ["Tip", "Eleman", "Ripple", "Verim"],
            rows: [
              ["Yarım dalga (tek fazlı)", "1 diyot", "Yüksek", "Düşük"],
              ["Tam dalga köprü (tek fazlı)", "4 diyot", "Orta", "İyi"],
              ["6 darbeli (üç fazlı)", "6 diyot", "Düşük", "Yüksek"],
              ["12 darbeli", "12 diyot (2×trafo)", "Çok düşük", "Çok yüksek"],
              ["Kontrollü", "SCR", "Ayarlanabilir", "Değişken"]
            ]
          }
        },
        {
          heading: "6 Darbeli Doğrultucu",
          paragraphs: [
            "Üç fazlı tam dalga köprü doğrultucu, gemi güç elektroniğinde en yaygın kullanılan tiptir. 6 diyot veya SCR kullanır. Her periyotta 6 darbe üretir ve düşük ripple'lı DC çıkış sağlar."
          ],
          formula: {
            expression: "V_dc = (3 × √2 / π) × V_LL = 1,35 × V_LL",
            variables: [
              "V_dc = ortalama DC çıkış gerilimi",
              "V_LL = AC hat-hat (line-to-line) gerilimi"
            ]
          },
          example: {
            problem: "440V AC üç fazlı sisteme bağlı 6 darbeli doğrultucunun DC çıkışını hesaplayınız.",
            steps: [
              "V_dc = 1,35 × V_LL",
              "V_dc = 1,35 × 440"
            ],
            result: "V_dc = 594 V. Kontrollü doğrultucuda bu değer tetikleme açısıyla düşürülebilir."
          }
        }
      ],
      keyPoints: [
        "6 darbeli doğrultucu 5. ve 7. harmonik üretir.",
        "12 darbeli doğrultucu harmonikleri önemli ölçüde azaltır.",
        "Filtre kondansatörü DC çıkıştaki ripple'ı düzeltir."
      ]
    },

    "İnvertör ve frekans dönüştürücü": {
      title: "İnvertör ve Frekans Dönüştürücü",
      introduction:
        "İnvertör, DC gerilimi AC gerilime çeviren güç elektroniği devresidir. VFD'nin çıkış katını oluşturur ve motor hız kontrolü için istenen frekansta AC üretir.",
      sections: [
        {
          heading: "İnvertör Çalışma Prensibi",
          paragraphs: [
            "İnvertör, IGBT (Insulated Gate Bipolar Transistor) anahtarlar kullanarak DC ara devre geriliminden PWM (Pulse Width Modulation) tekniğiyle AC çıkış üretir. Darbe genişlikleri değiştirilerek çıkış geriliminin etkin değeri ve frekansı kontrol edilir.",
            "V/f kontrolünde gerilim-frekans oranı sabit tutularak tüm hız aralığında sabit akı (ve dolayısıyla sabit tork) sağlanır."
          ]
        },
        {
          heading: "PWM Kontrol",
          paragraphs: [
            "Anahtarlama frekansı (carrier frequency) tipik olarak 2-16 kHz arasındadır. Yüksek anahtarlama frekansı daha düşük motor gürültüsü ancak daha yüksek anahtarlama kaybı üretir.",
            "Vektör kontrol (FOC) ve Direct Torque Control (DTC) gibi gelişmiş algoritmalar, daha hassas hız ve tork kontrolü sağlar."
          ]
        }
      ],
      keyPoints: [
        "IGBT modern invertörlerin temel anahtarlama elemanıdır.",
        "PWM çıkışı motor sargılarında ek ısınmaya neden olabilir.",
        "Uzun kablo mesafelerinde dV/dt filtresi motor insülasyonunu korur."
      ]
    },

    "Yumuşak yol verici (soft starter)": {
      title: "Yumuşak Yol Verici (Soft Starter)",
      introduction:
        "Yumuşak yol verici, motor başlatma sırasında gerilimi kademeli olarak artırarak akım ve tork darbelerini sınırlayan güç elektroniği cihazıdır.",
      sections: [
        {
          heading: "Çalışma Prensibi",
          paragraphs: [
            "Soft starter, her fazda ters paralel bağlı iki thyristor (anti-parallel SCR) kullanır. Başlatma sırasında SCR'lerin tetikleme açısı kademeli olarak azaltılarak motora uygulanan gerilim düşük değerden nominal değere yükseltilir.",
            "Ramp süresi (tipik olarak 5-30 saniye) ayarlanabilir. Başlatma gerilimi %30-70 arasında seçilir."
          ]
        },
        {
          heading: "Soft Starter ve VFD Karşılaştırması",
          paragraphs: [],
          table: {
            headers: ["Özellik", "Soft Starter", "VFD"],
            rows: [
              ["Başlatma akımı", "2-4 × In", "~1 × In"],
              ["Hız kontrolü", "Hayır (yalnızca start/stop)", "Evet (sürekli)"],
              ["Enerji tasarrufu", "Sınırlı", "Yüksek"],
              ["Maliyet", "Düşük", "Yüksek"],
              ["Harmonik", "Düşük", "Yüksek"],
              ["Boyut", "Kompakt", "Büyük"]
            ]
          }
        }
      ],
      keyPoints: [
        "Soft starter sabit hızlı uygulamalarda ekonomik çözümdür.",
        "Pompa uygulamalarında su darbesi (water hammer) önlenir.",
        "VFD gereken uygulamalarda soft starter yetersiz kalır."
      ]
    },

    "Harmonik bozulma ve filtreleme": {
      title: "Harmonik Bozulma ve Filtreleme",
      introduction:
        "Harmonik bozulma, güç elektroniği cihazlarının (VFD, doğrultucu, UPS) şebekeye ürettiği temel frekansın katları olan istenmeyen akım ve gerilim bileşenleridir.",
      sections: [
        {
          heading: "Harmonik Kaynakları",
          paragraphs: [
            "6 darbeli doğrultucu 5., 7., 11., 13. harmonikleri üretir (h = 6n ± 1 kuralı). VFD'ler, UPS'ler, SCR kontrollü doğrultucular ve hatta doymuş transformatörler harmonik kaynağıdır."
          ]
        },
        {
          heading: "Harmonik Etkileri",
          paragraphs: [],
          bulletPoints: [
            "Transformatörlerde aşırı ısınma (özellikle 3. harmonik)",
            "Kablolarda ek kayıplar",
            "Devre kesicilerde hatalı açma",
            "Hassas elektronik cihazlarda parazit",
            "Motor sargılarında ek ısınma ve gürültü",
            "Rezonans riski (kapasitör ve endüktans etkileşimi)"
          ]
        },
        {
          heading: "THD (Total Harmonic Distortion)",
          paragraphs: [],
          formula: {
            expression: "THD% = √(Σ I_n² ) / I_1 × 100",
            variables: [
              "I_n = n. harmonik akım bileşeni",
              "I_1 = temel frekans akım bileşeni",
              "Kabul edilebilir sınır: THD < %5 (IEEE 519)"
            ]
          }
        },
        {
          heading: "Filtreleme Yöntemleri",
          paragraphs: [],
          table: {
            headers: ["Yöntem", "Prensip", "Etkinlik"],
            rows: [
              ["Pasif filtre", "LC ayarlı devre", "Belirli harmonikler"],
              ["Aktif filtre", "Ters fazlı akım enjeksiyonu", "Geniş aralık"],
              ["12-pulse doğrultucu", "30° faz kaymalı 2 trafo", "5. ve 7. harmonik"],
              ["18-pulse doğrultucu", "20° faz kaymalı 3 trafo", "Çoğu harmonik"],
              ["Çok seviyeli invertör", "Kademeli gerilim sentezi", "Düşük THD"]
            ]
          }
        }
      ],
      keyPoints: [
        "Gemi elektrik sistemlerinde THD %5'i geçmemelidir.",
        "12-pulse doğrultucu büyük VFD'lerde yaygın çözümdür.",
        "Aktif filtre en esnek ancak en pahalı çözümdür."
      ]
    }
  }
};

export default content9;
