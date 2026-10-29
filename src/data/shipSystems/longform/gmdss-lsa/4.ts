import type { ShipSystemLongForm } from "../types";
import verifiedEpirbPhoto from "@/assets/lessons/epirb-gps.jpg";

/** EPIRB teknik ders: IMO MSC.471(101), MSC.1/Circ.1040/Rev.2 ve MSC.1/Circ.1039/Rev.1. */
const content: ShipSystemLongForm = {
  "title": "EPIRB — Frekanslar, Cospas-Sarsat, otomatik aktivasyon ve test",
  "sectionId": "gmdss-lsa",
  "topicIndex": 4,
  "estimatedPages": 18,
  "intro": "EPIRB (Emergency Position-Indicating Radio Beacon), gemiyi terk etme veya batma gibi ciddi ve yakın tehlikede 406 MHz uydu distress mesajı gönderen bağımsız bataryalı konum işaret cihazıdır. Teknik olarak doğru kullanmak için 406 MHz alarm, 121.5 MHz homing, yeni nesil AIS konum yayını, HRU/su sensörü ayrımı, test prosedürü ve radar-SART görünümü birbirinden ayrılmalıdır. Bu eğitim, zabitin cihazı gemide kontrol edebilmesini hedefler.",
  "sources": [
    "IMO MSC.471(101) — float-free EPIRB performance standards, installed on or after 1 July 2022: https://wwwcdn.imo.org/localresources/en/KnowledgeCentre/IndexofIMOResolutions/MSCResolutions/MSC.471(101).pdf",
    "IMO MSC.1/Circ.1040/Rev.2 — annual testing of 406 MHz EPIRBs: https://wwwcdn.imo.org/localresources/en/OurWork/Safety/Documents/IMO%20Documents%20related%20to/MSC.1-Circ.1040-Rev.2.pdf",
    "IMO MSC.1/Circ.1039/Rev.1 — shore-based maintenance: https://wwwcdn.imo.org/localresources/en/OurWork/Safety/Documents/IMO%20Documents%20related%20to/MSC.1-Circ.1039-Rev.1.pdf",
    "AMSA — Float-free EPIRBs: https://beacons.amsa.gov.au/about/float-free-epirbs.asp",
    "AMSA — Beacon testing policy: https://beacons.amsa.gov.au/about/beacon-testing-policy.asp",
    "AMSA — Beacon types / AIS-equipped EPIRBs: https://beacons.amsa.gov.au/about/beacon-types.asp",
    "USCG NAVCEN — EPIRB fundamentals: https://navcen.uscg.gov/emergency-position-indicating-radiobeacon"
  ],
  "chapters": [
    {
      "heading": "1. Çalışma prensibi ve frekanslar",
      "lead": "EPIRB, gemi radarına doğrudan hedef çizen bir cihaz değildir; öncelikle SAR otoritesine uydu distress uyarısı ulaştırır.",
      "sections": [
        {
          "subheading": "1.1 Üç farklı RF fonksiyonu",
          "illustration": {
            "src": verifiedEpirbPhoto,
            "alt": "A real maritime EPIRB photographed by Marwan Mohamad, showing an emergency beacon device",
            "caption": "Gerçek EPIRB fotoğrafı — Marwan Mohamad, CC BY-SA 4.0 (Wikimedia Commons: File:EPIRB (2).jpg). Bu fotoğraf sinyal güzergâhını veya cihazın HRU iç yapısını göstermez."
          },
          "paragraphs": [
            "406–406.1 MHz, Cospas-Sarsat tehlike ikazı için kullanılan sayısal yayın bandıdır. Mesajda cihazın benzersiz HEX kimliği ve GNSS mevki çözümü varsa koordinatlar bulunur. 121.5 MHz yayını, uygun donanımlı arama-kurtarma vasıtalarının son aşamadaki yön bulmasına (homing) yardım eder.",
            "Yeni performans standardına tabi AIS-EPIRB, AIS 1 (161.975 MHz) ve AIS 2 (162.025 MHz) kanallarında konum ve EPIRB ACTIVE gibi bilgiler yayınlayarak VHF görüş hattındaki AIS alıcılarına yardımcı olur. Eski 406 MHz EPIRB modellerinin hepsinde AIS özelliği yoktur. 121.5/243 MHz sinyallerinin uydu üzerinden alarm işlenmesi 1 Şubat 2009'da sona ermiştir."
          ],
          "table": {
            "headers": [
              "Kanal / bant",
              "Amaç",
              "Alıcı"
            ],
            "rows": [
              [
                "406–406.1 MHz",
                "Cospas-Sarsat distress ve kimlik/konum",
                "SAR uyduları"
              ],
              [
                "121.5 MHz",
                "Yakın menzilli SAR homing",
                "Uygun SAR hava/deniz vasıtaları"
              ],
              [
                "161.975 MHz (AIS 1)",
                "AIS-EPIRB konum ve uyarı",
                "AIS donanımlı gemiler"
              ],
              [
                "162.025 MHz (AIS 2)",
                "AIS-EPIRB konum ve uyarı",
                "AIS donanımlı gemiler"
              ]
            ]
          },
          "callouts": [
            {
              "type": "warning",
              "title": "Kritik ayrım",
              "text": "121.5 MHz halen homing için kullanılır ama artık Cospas-Sarsat uydularının izlediği distress alarm kanalı değildir."
            }
          ]
        },
        {
          "subheading": "1.2 EPIRB'den MRCC'ye alarmın yolculuğu",
          "paragraphs": [
            "EPIRB → Cospas-Sarsat uydu faydalı yükü (LEOSAR, GEOSAR, MEOSAR) → yer terminali LUT (Local User Terminal) → MCC (Mission Control Centre) → ilgili RCC/MRCC (Rescue Coordination Centre) → arama-kurtarma birimleri. 'Sinyal uyduya gidiyor' anlatımı bu zincirin yalnızca ilk adımıdır.",
            "406 MHz mesajı sesli MAYDAY değildir; doğrudan yakındaki bütün gemilerin radar ekranına düşmesi beklenmez. MRCC alarmı değerlendirir, kimlik/kayıt bilgilerini kontrol eder ve uygun SAR kaynaklarını koordine eder."
          ]
        }
      ]
    },
    {
      "heading": "2. Kimlik, konum ve uydular",
      "sections": [
        {
          "subheading": "2.1 15 HEX ID, MMSI ve registration",
          "paragraphs": [
            "406 MHz EPIRB her yayınında benzersiz beacon identity taşır. Cihaz üzerindeki 15 karakterli HEX ID, ulusal kayıt sistemindeki gemi/işletmeci/acil irtibat bilgileriyle eşleştirilir. Mesaj kodlama protokolü, MID ve seri numarası ile MMSI veya call sign alanlarını farklı biçimlerde barındırabilir; HEX ID'yi doğrudan gemi MMSI'siyle eş tutma.",
            "Bayrak, gemi adı, sahiplik, irtibat telefonları veya cihaz değiştiğinde EPIRB kaydı güncellenmelidir. Yanlış kayıt SAR'ın teyit süresini uzatabilir. Kayıt bilgilerini cihaz etiketinden ve güncel resmî sertifikadan karşılaştır."
          ]
        },
        {
          "subheading": "2.2 GNSS fix ile uydu temelli konum çözümü",
          "paragraphs": [
            "Dahili GNSS alıcısı (GPS/Galileo vb.) fix aldığında EPIRB koordinatları 406 MHz mesajına yerleştirir; böylece uydu mevki çözümüne ek veri sağlanır. GNSS fix yokken 406 MHz kimlik uyarısı sürebilir, SAR ağı Doppler/MEOSAR değerlendirmesiyle konum belirlemeye çalışır. GNSS kaybı = cihaz tamamen bozuldu demek değildir.",
            "MSC.471(101) kapsamında aktivasyondan sonra GNSS konumu en fazla beş dakika aralıklarla güncellenmelidir. Ancak uydu geometrisi, anten gökyüzü görüşü ve işleme koşulları nedeniyle her alarm için kesin ve anlık mevki verileceği garanti edilmez."
          ]
        }
      ]
    },
    {
      "heading": "3. HRU, batma ve suyla otomatik aktivasyon",
      "sections": [
        {
          "subheading": "3.1 Float-free sisteminde ardışık dört olay",
          "paragraphs": [
            "EPIRB onaylı float-free braketinde dış güvertede muhafaza edilir. Gemi batarken hidrostatik basınç, modele bağlı olarak yaklaşık 1–4 m aralığında Hydrostatic Release Unit (HRU) mekanizmasını açar. Cihaz mekanik olarak serbest kalıp yüzeye çıkar; su sensörü/elektrotları ıslandığında elektronik devre yayını başlatır.",
            "Pil deniz suyuyla güç üreten veya suyla şarj olan bir batarya değildir. Elektrik enerjisi kapalı gövdedeki önceden takılmış primer bataryadan sağlanır; su sensörü yalnızca tetikleme görevindedir. Bazı braketlerde cihazın tekrar yerleştirilmesini algılayan magnet/reed switch kombinasyonu bulunur ve hatalı montaj yalancı aktivasyon doğurabilir."
          ],
          "bullets": [
            "HRU/kapak üstünde nesne, halat veya yapışma olmayacak; EPIRB yüzeye engelsiz çıkabilmelidir.",
            "EPIRB'nin buoyant lanyard'ı gemiye ya da float-free brakete bağlanmaz; gerektiğinde survival craft veya kişiye bağlanabilir.",
            "MSC.471(101) standardına tabi cihazın yalnızca braketten elle çıkarılması otomatik distress başlatmamalıdır. Eski model farklı çalışabilir: her zaman cihazın kılavuzunu esas al."
          ]
        },
        {
          "subheading": "3.2 Manuel ON/DISTRESS ve survival craft",
          "paragraphs": [
            "Gerçek tehlikede manuel aktivasyon üreticinin iki kademeli emniyetli işlem sırasıyla yapılır. Deniz yüzeyinde anten dik ve gökyüzüne açık kalmalıdır. Can salı/filikada cihazın işaretini/ışığını kontrol et; anteni metal altında tutma, suya batan gemiye bağlama.",
            "EPIRB, çalışır durumdaki DSC, sesli MAYDAY ve diğer GMDSS yöntemlerinin yerine tek haberleşme yöntemi olarak düşünülmez. Gerçek tehlike koşullarında geminin SMS ve Master komutlarına göre tamamlayıcı distress imkanları kullanılır."
          ]
        }
      ]
    },
    {
      "heading": "4. Batarya, çalışma süresi ve teknik limitler",
      "sections": [
        {
          "subheading": "4.1 En az 48 saat ne anlama gelir?",
          "paragraphs": [
            "IMO MSC.471(101), ilgili EPIRB'nin bataryasının cihazı en az 48 saat çalıştırmaya yeterli kapasitede olmasını ister. Bu, onaylanmış tip için asgari performans şartıdır. SKT geçmiş, hasarlı veya uygun olmayan bataryada garanti olarak okunamaz; üretici model etiketi ve bayrak gerekleri göz önündedir.",
            "İlgili standart −20°C ile +55°C işletim sıcaklığı aralığı, suda dik yüzme, gece görülebilir yer belirleme ışığı ve 4 m derinliğe varmadan otomatik serbest kalma performansı gibi şartları içerir."
          ],
          "table": {
            "headers": [
              "Özellik",
              "MSC.471(101) şartı",
              "Vardiya zabitinin kontrolü"
            ],
            "rows": [
              [
                "Batarya kapasitesi",
                "En az 48 saat",
                "Batarya SKT/model ve son servis"
              ],
              [
                "Float-free ayrılma",
                "4 m'den önce",
                "HRU SKT, serbest yüzme yönü"
              ],
              [
                "GNSS konum güncelleme",
                "En geç 5 dakikada bir",
                "GNSS test / self-test sonucu"
              ],
              [
                "Homing yayını",
                "121.5 MHz",
                "Cihaz ve survey kontrolü"
              ],
              [
                "AIS locating",
                "Yeni standarda tabi modellerde",
                "AIS özellik/ekran karşılaştırması"
              ]
            ]
          }
        },
        {
          "subheading": "4.2 Kullanım sınırları",
          "paragraphs": [
            "EPIRB ile karşı tarafa sesli yanıt gönderemezsin; RCC'nin alarmı alması, denizdeki bütün gemilerin seni doğrudan algıladığı anlamına gelmez. AIS-EPIRB'de yerel görünürlük menzil ve AIS receiver/overlay durumuna bağlıdır."
          ]
        }
      ]
    },
    {
      "heading": "5. Self-test adımları ve test güvenliği",
      "sections": [
        {
          "subheading": "5.1 Onboard self-test SOP",
          "paragraphs": [
            "Cihazın üretici/model el kitabı ve PMS sıklığı esas alınır. 1) EPIRB'nin görünür hasarını, braketteki konumunu, anteni, lanyard'ı, HEX ID'yi, batarya ve HRU tarihlerini incele. 2) Üretici tanımlı SELF-TEST düğme/sırasını uygula. 3) LED/beep/ekran sonucu PASS veya FAIL olarak değerlendir; hata kodunu kılavuzla karşılaştır. 4) Varsa ayrı GNSS self-test'i yalnız önerilen sıklıkta ve pil tüketimi uyarılarına uyarak yap. 5) Cihazı doğru brakete yerleştir, yayın olmadığını doğrula; tarih, saat ve test sonucunu GMDSS/PMS kayıtlarına işle.",
            "Onaylı self-test modunda özel formatlı kısa RF test yayını olabilir; 'hiçbir RF sinyal göndermez' ifadesi teknik olarak yanlış olur. Test mesajı uydu sistemi tarafından gerçek distress çağrısı olarak işlenmez. Ancak NORMAL ON/DISTRESS modunu açıp kapatmak rutin kontrol değildir; tek bir canlı yayın bile SAR alarmına yol açabilir."
          ],
          "bullets": [
            "SELF-TEST ≠ gerçek ON/DISTRESS yayını.",
            "GNSS self-test bazı cihazlarda ayrı ve pil tüketen testtir.",
            "Test sıkılığı üretici ve gemi PMS'ine bağlıdır; her modele evrensel günlük/aylık tuş prosedürü yazılamaz.",
            "Arızalı cihazın emniyet açısından uygunluğunu SMS'e göre eskale et."
          ],
          "callouts": [
            {
              "type": "warning",
              "title": "Gerçek distress testi yapma",
              "text": "Açıkta normal ON/DISTRESS modunu rutin test için kullanma. Gerçek yayınla operasyonel test gerekiyorsa yetkili RCC/otorite ile önceden koordine edilip onay alınmalıdır."
            }
          ]
        },
        {
          "subheading": "5.2 Test fail verirse",
          "paragraphs": [
            "Üreticinin FAIL kodunu kontrol et; batarya, RF vericisi, GNSS veya su sensörü gibi alt bileşenler arasında ayrım yap. Arıza durumunu Master/ilgili zabite bildir, kayıt aç, onaylı servise yönlendir. 'LED yanmadı ama cihaz çalışır' varsayımı yapılmaz."
          ]
        }
      ]
    },
    {
      "heading": "6. Bakım, yıllık test ve yanlış alarm",
      "sections": [
        {
          "subheading": "6.1 Annual test, shore-based maintenance, HRU ve pil",
          "paragraphs": [
            "IMO MSC.1/Circ.1040/Rev.2'nin yıllık test rehberi fiziksel durum, kayıt doğrulama, batarya/HRU SKT, self-test 406 MHz ve mümkünse 121.5 MHz ile AIS çıkışlarının doğrulanması, bracket ve etiket kontrollerini kapsar. Gemideki üretici talimatına uygun rutin self-test ile yıllık survey/test aynı işlem değildir.",
            "IMO MSC.1/Circ.1039/Rev.1 kapsamında yetkili shore-based maintenance, bayrak idaresinin belirlediği aralıkta ve 5 yılı aşmadan yapılır. HRU 'her zaman iki yıl', EPIRB bataryası 'her zaman beş yıl' diye sabitlenmemelidir: gerçek etiket, onaylı ürün ve üretici talimatı esas alınır."
          ]
        },
        {
          "subheading": "6.2 Yanlış alarmı nasıl iptal ederiz?",
          "paragraphs": [
            "Gerçek tehlike olmadığı doğrulanırsa derhal cihazı OFF konumuna al, en yakın RCC/MRCC'ye uygun hızlı yoldan haber ver. Beacon HEX ID, mevki, aktivasyon zamanı ve yanlış alarm bilgilerini bildir. Sadece düğmeyi kapatmak yeterli değildir; uydu alarmı SAR sistemine düşmüş olabilir.",
            "Gerçek distress mevcutken alarmı sırf yanlışlıkla çalıştı diye kapatma; yayınla ilgili karar gerçek emniyet durumuna göre verilir."
          ],
          "callouts": [
            {
              "type": "regulation",
              "title": "PSC / survey izi",
              "text": "EPIRB kayıt bilgisi, onaylı bakım belgesi, son self-test, batarya ve HRU SKT, cihaz etiketindeki HEX ID ile gemideki kayıtlar uyumlu olmalıdır."
            }
          ]
        }
      ]
    },
    {
      "heading": "7. Radar, AIS ve SART farkı",
      "sections": [
        {
          "subheading": "7.1 Radar ekranında ne görünür?",
          "paragraphs": [
            "Klasik 406 MHz EPIRB, ne X-band ne S-band radarda '12 nokta' üretir. Radar-SART ise 9 GHz X-band radar darbelerine yanıt verir; tipik olarak radar ekranında art arda 12 nokta görülür ve yakınlaşıldığında görüntü yaylara dönüşebilir. S-band radar-SART'ı bu biçimde tetiklemez.",
            "AIS-EPIRB ve AIS-SART, uygun AIS alıcısı/ECDIS ekranında SAR konum sembolüyle izlenebilir. AIS overlay açık bir radar ekranında da hedef görünebilir; fakat bu 9 GHz radar yanıtı değildir. Her AIS-EPIRB'nin her radarda görünmesi garanti edilmez."
          ],
          "table": {
            "headers": [
              "Cihaz",
              "Yayın türü",
              "Gösterim"
            ],
            "rows": [
              [
                "EPIRB (klasik)",
                "406 MHz + 121.5 MHz",
                "Uydu alarmı, 12 radar noktası yok"
              ],
              [
                "Radar-SART",
                "9 GHz X-band yanıtı",
                "Radarda 12 nokta/yay"
              ],
              [
                "AIS-SART",
                "AIS 1/2",
                "AIS/ECDIS SAR hedefi"
              ],
              [
                "AIS-EPIRB",
                "406 + 121.5 + AIS 1/2",
                "Uydu alarmı + AIS hedefi"
              ]
            ]
          }
        },
        {
          "subheading": "7.2 Köprüüstünde ayırıcı teşhis",
          "paragraphs": [
            "X-band radarda 12 nokta serisi görüyorsan aktif radar-SART ihtimalini değerlendir. AIS'de 'EPIRB ACTIVE' görüyorsan AIS-EPIRB olabilir. Cihazın AIS'de bulunmaması, SAR uydusuna 406 MHz alarmı göndermediği anlamına gelmez."
          ]
        }
      ]
    },
    {
      "heading": "8. Operasyon senaryosu ve bilgi kontrolü",
      "sections": [
        {
          "subheading": "8.1 Batma/abandon ship vakası",
          "paragraphs": [
            "Master gemiyi terk emri veriyor. Mümkün ve emniyetli oldukça DSC ve voice MAYDAY ile tehlike haberleşmesini yürüt. Görevli personel EPIRB'yi üretici talimatına göre çalıştırır veya otomatik float-free düzenin engelsiz çalıştığını sağlar. Cihazın anteni açık gökyüzüne dönük kalır; can salında/filikada aktif göstergeyi kontrol et. EPIRB'yi batmakta olan gemiye bağlama.",
            "Zabit, bulunduğu gemi üzerindeki EPIRB'nin modeli, HEX ID'si, HRU ve batarya tarihleri, self-test kodları, bakım/registration belgesi ve yanlış alarm RCC prosedürünü ezbere sayı tekrarı yapmadan, gerçek etiketten göstererek açıklayabilmelidir."
          ]
        },
        {
          "subheading": "8.2 Üç soruyla bilgiyi doğrula",
          "paragraphs": [
            "Soru 1: EPIRB'nin pili suyla mı aktive olur? Yanıt: Hayır; HRU serbest bırakır, su sensörü elektroniği açar, kapalı batarya zaten takılıdır.",
            "Soru 2: EPIRB 12 radar noktası oluşturur mu? Yanıt: Hayır; radar-SART bunu oluşturur. AIS özellikli EPIRB AIS ekranında konum verir.",
            "Soru 3: Cihazın SELF-TEST yerine ON/DISTRESS'e basıp hemen kapatılması kabul edilir mi? Yanıt: Hayır; gerçek distress mesajı SAR sistemine ulaşabilir. Kılavuzdaki self-test kullanılmalıdır."
          ],
          "bullets": [
            "Frekansları ve görevlerini ayrı ayrı say: 406, 121.5, AIS 1/2.",
            "Uydu → LUT → MCC → RCC/MRCC zincirini çiz.",
            "HRU, su sensörü ve bataryanın farklı işlevlerini göster.",
            "Kendi geminin EPIRB modelindeki TEST prosedürünü doğru uygula.",
            "AIS-EPIRB, AIS-SART ve radar-SART görünümlerini ayır."
          ]
        }
      ]
    }
  ]
};

export default content;
