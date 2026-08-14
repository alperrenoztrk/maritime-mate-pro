import type { MachineSubTopicContent } from "./machineTopicDetailContent";

type ContentMap = Record<string, Record<string, MachineSubTopicContent>>;

const content10: ContentMap = {
  // ═══════════════════════════════════════════════════════════════
  // BAKIM VE TUTUM
  // ═══════════════════════════════════════════════════════════════
  maintenance: {
    "Arıza sonrası bakım (corrective)": {
      title: "Arıza Sonrası Bakım (Corrective Maintenance)",
      introduction:
        "Arıza sonrası bakım, ekipman arızalandıktan veya performans kaybı yaşandıktan sonra işlevselliğin geri kazanılması için yapılan bakım faaliyetidir. En eski ve en basit bakım stratejisidir.",
      sections: [
        {
          heading: "Tanım ve Uygulama Alanı",
          paragraphs: [
            "Arıza sonrası bakım (corrective/reactive maintenance), ekipmanın arızalanmasını bekleyerek müdahale etme yaklaşımıdır. Kritik olmayan ve yedekli sistemlerde ekonomik olabilir; ancak kritik ekipmanda plansız duruşlara ve yüksek maliyetlere yol açar.",
            "Gemi makine dairesinde tamamen corrective bakıma dayanan bir sistem kabul edilemez. Ancak corrective bakım, diğer stratejilerle birlikte her bakım planının bir bileşenidir."
          ]
        },
        {
          heading: "Avantaj ve Dezavantajlar",
          paragraphs: [],
          table: {
            headers: ["Avantaj", "Dezavantaj"],
            rows: [
              ["Bakım planı maliyeti yok", "Plansız duruş riski"],
              ["Parça sağlam oldukça kullanılır", "Yüksek acil onarım maliyeti"],
              ["Yedekli sistemlerde uygundur", "İkincil hasar riski"],
              ["Basit yönetim", "Yedek parça stok planlaması zorlaşır"]
            ]
          }
        },
        {
          heading: "Corrective Bakım Prosedürü",
          paragraphs: [],
          bulletPoints: [
            "1. Arıza tespiti ve raporlama",
            "2. Arıza analizi ve kök neden belirleme",
            "3. Onarım planı hazırlama (yedek parça, işgücü, zaman)",
            "4. Güvenlik önlemlerini uygulama (LOTO, PTW)",
            "5. Onarım gerçekleştirme",
            "6. Test ve devreye alma",
            "7. Kayıt ve raporlama (PMS'e işleme)"
          ]
        }
      ],
      keyPoints: [
        "Corrective bakım tek başına strateji olarak kullanılmamalıdır.",
        "Kök neden analizi tekrarlayan arızaları önler.",
        "Her corrective bakım, preventive bakım planını gözden geçirme fırsatıdır."
      ]
    },

    "Planlı bakım (planned/preventive)": {
      title: "Planlı Bakım (Planned/Preventive Maintenance)",
      introduction:
        "Planlı bakım, ekipmanın belirli zaman aralıklarında veya çalışma saatlerinde düzenli olarak bakıma alınmasıdır. Arıza oluşmadan önce müdahale ederek plansız duruşları azaltmayı hedefler.",
      sections: [
        {
          heading: "Planlı Bakım Prensibi",
          paragraphs: [
            "Preventive bakım, ekipman üreticisinin önerdiği bakım aralıklarına (çalışma saati, takvim süresi) göre yapılır. Yağ değişimi, filtre değişimi, contık değişimi, ayar kontrolü gibi işlemleri kapsar.",
            "SOLAS ve klas kuruluşları gemilerde PMS (Planned Maintenance System) uygulamasını zorunlu kılar."
          ]
        },
        {
          heading: "Bakım Aralığı Örnekleri",
          paragraphs: [],
          table: {
            headers: ["Ekipman", "Bakım İşi", "Aralık"],
            rows: [
              ["Ana motor", "Silindir kapağı revizyon", "8.000-16.000 saat"],
              ["Ana motor", "Piston çekme", "12.000-24.000 saat"],
              ["Yardımcı motor", "Supap taşlama", "4.000-8.000 saat"],
              ["Purifier", "Disk ve conta değişimi", "4.000-6.000 saat"],
              ["Kazan", "İç muayene", "2,5 yıl (klas)"],
              ["Kompresör", "Valf muayene", "4.000-8.000 saat"],
              ["Pompa", "Mekanik salmastra", "Durum bazlı"]
            ]
          }
        },
        {
          heading: "PMS Yazılımı Gereklilikleri",
          paragraphs: [],
          bulletPoints: [
            "Ekipman ağacı (hierarchy) tanımlama",
            "İş emri oluşturma ve takip",
            "Bakım aralığı ve takvim planlaması",
            "Yedek parça envanter yönetimi",
            "Çalışma saati ve performans kaydı",
            "Klas survey takvimi entegrasyonu",
            "Raporlama ve analiz"
          ]
        }
      ],
      keyPoints: [
        "PMS uygulaması SOLAS ve ISM Code gereği zorunludur.",
        "Aşırı bakım (over-maintenance) gereksiz maliyet ve duruş yaratır.",
        "Bakım aralıkları deneyim ve üretici önerilerine göre optimize edilmelidir."
      ]
    },

    "Durum bazlı bakım (condition-based)": {
      title: "Durum Bazlı Bakım (Condition-Based Maintenance)",
      introduction:
        "Durum bazlı bakım (CBM), ekipmanın gerçek durumunu izleyerek bakım zamanlamasını belirleyen stratejidir. Ekipman sağlığı kötüleşme eğilimi gösterdiğinde bakım planlanır.",
      sections: [
        {
          heading: "CBM Teknikleri",
          paragraphs: [],
          table: {
            headers: ["Teknik", "İzlenen Parametre", "Ekipman"],
            rows: [
              ["Titreşim analizi", "Frekans, genlik", "Motor, pompa, fan, kompresör"],
              ["Yağ analizi", "Metal parçacık, viskozite, TBN", "Motor, dişli kutusu"],
              ["Termal görüntüleme", "Sıcaklık dağılımı", "Elektrik panoları, yatak"],
              ["Ultrasonik ölçüm", "Kalınlık, kaçak", "Boru, tank, valf"],
              ["Akım analizi", "Motor çektiği akım", "Elektrik motorları"],
              ["Performans izleme", "Basınç, sıcaklık, debi", "Tüm sistemler"]
            ]
          }
        },
        {
          heading: "CBM Uygulama Adımları",
          paragraphs: [
            "1. Kritik ekipman belirleme (FMEA veya risk analizi ile).",
            "2. Uygun izleme tekniği seçme.",
            "3. Baz ölçüm (baseline) alma.",
            "4. Periyodik ölçüm ve trend takibi.",
            "5. Alarm eşiklerini belirleme.",
            "6. Trend kötüleştiğinde bakım planlama.",
            "7. Bakım sonrası yeni baz ölçüm alma."
          ]
        },
        {
          heading: "P-F Eğrisi",
          paragraphs: [
            "P-F eğrisi, ekipmanın potansiyel arıza (P noktası) ile fonksiyonel arıza (F noktası) arasındaki bozulma sürecini gösterir. CBM'in amacı P noktasını tespit ederek F noktasına ulaşmadan bakım yapmaktır. P-F aralığı ne kadar uzunsa, bakım planlaması o kadar kolaydır."
          ]
        }
      ],
      keyPoints: [
        "CBM gereksiz bakımı azaltır ve ekipman kullanılabilirliğini artırır.",
        "Titreşim analizi döner ekipman için en etkili CBM tekniğidir.",
        "CBM başarısı ölçüm kalitesi ve trend analizi yetkinliğine bağlıdır."
      ]
    },

    "Kestirimci bakım (predictive)": {
      title: "Kestirimci Bakım (Predictive Maintenance)",
      introduction:
        "Kestirimci bakım, ileri analitik ve makine öğrenmesi tekniklerini kullanarak ekipman arızasını önceden tahmin eden bakım stratejisidir. CBM'in gelişmiş bir formudur.",
      sections: [
        {
          heading: "Kestirimci Bakım Teknolojileri",
          paragraphs: [
            "Kestirimci bakım, büyük veri analizi, makine öğrenmesi algoritmaları ve dijital ikiz (digital twin) teknolojilerini kullanarak ekipman davranışını modeller ve anomalileri tespit eder.",
            "Sürekli veri toplama (IoT sensörleri) ile gerçek zamanlı izleme yapılır. Algoritma, normal davranış modelinden sapmaları tespit ederek kalan faydalı ömrü (RUL - Remaining Useful Life) tahmin eder."
          ]
        },
        {
          heading: "CBM ve Kestirimci Bakım Farkı",
          paragraphs: [],
          table: {
            headers: ["Özellik", "CBM", "Kestirimci"],
            rows: [
              ["Veri toplama", "Periyodik", "Sürekli (real-time)"],
              ["Analiz", "Trend izleme, eşik değer", "Makine öğrenmesi, AI"],
              ["Tahmin", "Genel bozulma eğilimi", "Spesifik arıza zamanı"],
              ["Yatırım", "Orta", "Yüksek"],
              ["Karmaşıklık", "Orta", "Yüksek"]
            ]
          }
        },
        {
          heading: "Gemi Uygulamaları",
          paragraphs: [],
          bulletPoints: [
            "Ana motor silindir durumu tahminleme",
            "Turboşarjer yatak arıza öngörüsü",
            "Kompresör valf ömür tahmini",
            "Elektrik motoru insülasyon bozulma trendi",
            "Pervane ve şaft hattı titreşim analizi"
          ]
        }
      ],
      keyPoints: [
        "Kestirimci bakım en yüksek ekipman kullanılabilirliğini sağlar.",
        "Veri kalitesi ve yeterliliği kestirimci bakımın temelidir.",
        "Küçük filolarda maliyet-fayda analizi yapılmalıdır."
      ]
    },

    "Güvenilirlik merkezli bakım (RCM)": {
      title: "Güvenilirlik Merkezli Bakım (RCM)",
      introduction:
        "RCM, her ekipman için en uygun bakım stratejisini arıza modları, etkileri ve kritiklik analizi (FMEA/FMECA) temelinde belirleyen sistematik bir karar sürecidir.",
      sections: [
        {
          heading: "RCM Yedi Temel Sorusu",
          paragraphs: [],
          bulletPoints: [
            "1. Ekipmanın fonksiyonu nedir?",
            "2. Fonksiyonel arıza nasıl tanımlanır?",
            "3. Arıza modları nelerdir?",
            "4. Her arıza modunun etkisi nedir?",
            "5. Arızanın sonuçları nedir? (güvenlik, çevre, operasyonel, ekonomik)",
            "6. Arızayı önlemek veya tespit etmek için ne yapılabilir?",
            "7. Uygun bir proaktif görev yoksa ne yapılmalıdır?"
          ]
        },
        {
          heading: "RCM Karar Ağacı",
          paragraphs: [
            "RCM analizi sonucunda her arıza modu için en uygun bakım stratejisi seçilir: durum izleme (CBM), planlı restorasyon, planlı değişim, arıza arama (hidden failure), tasarım değişikliği veya run-to-failure."
          ]
        },
        {
          heading: "Gemi Uygulaması",
          paragraphs: [
            "Klas kuruluşları (DNV, Lloyd's, Bureau Veritas) RCM bazlı bakım planlarını kabul eder. RCM uygulaması ile geleneksel takvim bazlı bakımdan durum bazlı bakıma geçiş mümkün olur; bu da gereksiz sökme-takma işlemlerini ve maliyetleri azaltır."
          ]
        }
      ],
      keyPoints: [
        "RCM her ekipmanı aynı şekilde bakıma almak yerine risk bazlı önceliklendirme yapar.",
        "FMEA, RCM sürecinin temel analiz aracıdır.",
        "RCM sonuçları PMS'e entegre edilerek uygulanır."
      ]
    },

    "PMS yazılımı ve iş emri yönetimi": {
      title: "PMS Yazılımı ve İş Emri Yönetimi",
      introduction:
        "Planned Maintenance System yazılımı, gemideki tüm bakım faaliyetlerinin planlanması, takibi ve raporlanması için kullanılan dijital yönetim aracıdır.",
      sections: [
        {
          heading: "PMS Modülleri",
          paragraphs: [],
          bulletPoints: [
            "Ekipman yönetimi: Hiyerarşik ekipman ağacı, teknik veriler",
            "İş emri yönetimi: Oluşturma, atama, takip, kapatma",
            "Bakım planlaması: Takvim ve çalışma saati bazlı zamanlama",
            "Yedek parça: Stok takibi, minimum seviye uyarısı, sipariş",
            "Doküman yönetimi: Manuel, çizim, sertifika",
            "Raporlama: KPI, bakım geçmişi, maliyet analizi",
            "Klas entegrasyonu: Survey takvimi ve gereksinimler"
          ]
        },
        {
          heading: "İş Emri Yaşam Döngüsü",
          paragraphs: [],
          table: {
            headers: ["Aşama", "Durum", "Aksiyon"],
            rows: [
              ["1", "Planned (Planlandı)", "Sistem otomatik oluşturur"],
              ["2", "Assigned (Atandı)", "Sorumlu personele atanır"],
              ["3", "In Progress (Devam ediyor)", "Çalışma başlar"],
              ["4", "Parts Waiting", "Yedek parça bekleniyor"],
              ["5", "Completed (Tamamlandı)", "İş bittiğinde kapatılır"],
              ["6", "Verified (Doğrulandı)", "Baş mühendis onaylar"]
            ]
          }
        }
      ],
      keyPoints: [
        "PMS uygulaması ISM Code ve SOLAS gereği zorunludur.",
        "Geciken iş emirleri klas denetiminde olumsuz bulgu olarak değerlendirilir.",
        "Bulut tabanlı PMS, filo yönetimi ve uzaktan izleme imkanı sunar."
      ]
    },

    "Bakım aralıkları ve çalışma saatleri": {
      title: "Bakım Aralıkları ve Çalışma Saatleri",
      introduction:
        "Bakım aralıkları, ekipman üreticisi önerileri, klas gereklilikleri ve operasyonel deneyime göre belirlenir. Çalışma saati sayacı (running hour counter) bakım zamanlamasının temel referansıdır.",
      sections: [
        {
          heading: "Tipik Bakım Aralıkları",
          paragraphs: [],
          table: {
            headers: ["Ekipman/İşlem", "Aralık", "Kaynak"],
            rows: [
              ["Ana motor overhaul", "16.000-32.000 saat", "Üretici"],
              ["Silindir kapağı revizyon", "8.000-16.000 saat", "Üretici"],
              ["Piston çekme ve kontrol", "12.000-24.000 saat", "Üretici"],
              ["Turboşarjer overhaul", "12.000-18.000 saat", "Üretici"],
              ["Yardımcı motor top overhaul", "8.000-12.000 saat", "Üretici"],
              ["Purifier tam söküm", "4.000-8.000 saat", "Üretici"],
              ["Kazan iç muayene", "2,5 yıl", "Klas"],
              ["Emniyet supabı testi", "Yıllık", "Klas"],
              ["Cankurtaran botu bakım", "Yıllık", "SOLAS"],
              ["Şaft hattı survey", "5 yıl", "Klas"]
            ]
          }
        },
        {
          heading: "Çalışma Saati Yönetimi",
          paragraphs: [
            "Her ekipmanda running hour counter bulunur ve PMS'e düzenli güncellenir. Çalışma saati eşiğine ulaşıldığında PMS otomatik iş emri üretir.",
            "Bazı bakımlar takvim bazlıdır (yıllık, 2,5 yıllık) ve çalışma saatinden bağımsızdır. Klas survey takvimi bağlayıcıdır."
          ]
        }
      ],
      keyPoints: [
        "Üretici bakım aralıkları minimum gereksinimdir; operasyonel koşullara göre azaltılabilir.",
        "Çalışma saati sayacı doğruluğu düzenli kontrol edilmelidir.",
        "Ertelenen bakımlar PMS'de gerekçesiyle birlikte kayıt altına alınmalıdır."
      ]
    },

    "Klas gereklilikleri ve survey takvimi": {
      title: "Klas Gereklilikleri ve Survey Takvimi",
      introduction:
        "Klas kuruluşları (DNV, Lloyd's Register, Bureau Veritas, ClassNK, ABS vb.), gemi yapısı ve makinelerinin güvenlik standartlarına uygunluğunu denetleyen bağımsız kuruluşlardır.",
      sections: [
        {
          heading: "Survey Tipleri",
          paragraphs: [],
          table: {
            headers: ["Survey", "Aralık", "Kapsam"],
            rows: [
              ["Annual Survey", "Yıllık", "Genel kontrol ve fonksiyon testi"],
              ["Intermediate Survey", "2,5 yıl", "Detaylı kontrol, kazan iç muayene"],
              ["Special Survey (Class Renewal)", "5 yıl", "Kapsamlı kontrol, tank muayene"],
              ["Bottom Survey (Dry-dock)", "5 yıl (2,5 yıl in-water)", "Gemi altı, pervane, dümen"],
              ["Continuous Survey", "Sürekli", "Makinelerin kademeli muayenesi"]
            ]
          }
        },
        {
          heading: "Continuous Machinery Survey (CMS)",
          paragraphs: [
            "CMS sistemi, ana ve yardımcı makinelerin bileşenlerinin 5 yıllık periyotta kademeli olarak muayene edilmesini sağlar. Her yıl belirli bileşenler muayene edilir ve döngü 5 yılda tamamlanır.",
            "CMS geminin kendi mühendisleri tarafından yapılabilir (owner's survey); klas surveyörü ise sonuçları doğrular. Bu sistem havuz duruşlarındaki iş yoğunluğunu azaltır."
          ]
        }
      ],
      keyPoints: [
        "Klas sertifikası geminin denize elverişliliğinin resmi kanıtıdır.",
        "Survey tarihleri aşılamaz; aşılması geminin seferden alınmasına yol açabilir.",
        "CMS uygulaması planlı bakım ile entegre edilmelidir."
      ]
    },

    "Kritik ekipman tanımlaması": {
      title: "Kritik Ekipman Tanımlaması",
      introduction:
        "Kritik ekipman, arızalanması durumunda gemi güvenliği, çevre koruması veya operasyonel sürekliliği doğrudan etkileyen ekipmandır. Kritik ekipman belirleme, bakım önceliklendirmesinin temelidir.",
      sections: [
        {
          heading: "Kritiklik Belirleme Kriterleri",
          paragraphs: [],
          bulletPoints: [
            "Güvenlik etkisi: Personel güvenliği tehlikeye giriyor mu?",
            "Çevresel etki: Deniz kirliliği riski var mı?",
            "Operasyonel etki: Gemi sefere devam edebilir mi?",
            "Yedeklilik: Yedek ekipman mevcut mu?",
            "Onarım süresi: Denizde onarılabilir mi?",
            "Maliyet etkisi: Arıza maliyeti nedir?"
          ]
        },
        {
          heading: "Kritik Ekipman Listesi (Tipik)",
          paragraphs: [],
          table: {
            headers: ["Sistem", "Kritik Ekipman"],
            rows: [
              ["İtme", "Ana motor, şaft, pervane"],
              ["Güç", "Jeneratörler, MSB, ESB"],
              ["Dümen", "Dümen makinesi, telemotor"],
              ["Güvenlik", "Yangın pompaları, CO₂ sistemi"],
              ["Navigasyon", "Radar, ECDIS, GPS"],
              ["Haberleşme", "GMDSS ekipmanları"],
              ["Çevre", "OWS, incinerator, BWTS"]
            ]
          }
        }
      ],
      keyPoints: [
        "ISM Code kritik ekipman listesi hazırlanmasını zorunlu kılar.",
        "Kritik ekipman için yedek parça stoku öncelikli tutulmalıdır.",
        "FMEA analizi kritik ekipman belirlemenin sistematik yöntemidir."
      ]
    },

    "Yedek parça envanteri ve min-max seviye": {
      title: "Yedek Parça Envanteri ve Min-Max Seviye",
      introduction:
        "Yedek parça yönetimi, bakım faaliyetlerinin zamanında ve verimli gerçekleştirilmesi için kritik öneme sahiptir. Doğru stok seviyesi, hem ekipman kullanılabilirliğini hem de maliyet kontrolünü sağlar.",
      sections: [
        {
          heading: "Min-Max Stok Yönetimi",
          paragraphs: [
            "Her yedek parça için minimum ve maksimum stok seviyesi belirlenir. Stok minimum seviyenin altına düştüğünde sipariş tetiklenir (re-order point). Sipariş miktarı, stoku maksimum seviyeye getirecek şekilde hesaplanır.",
            "Lead time (teslim süresi), denizde sipariş verme imkanı ve sonraki liman planı stok yönetimini doğrudan etkiler."
          ]
        },
        {
          heading: "Klas Zorunlu Yedek Parçalar",
          paragraphs: [
            "Klas kuruluşları belirli kritik ekipmanlar için minimum yedek parça stoku zorunlu kılar. Bunlara 'mandatory spares' denir ve klas denetimlerinde kontrol edilir."
          ],
          table: {
            headers: ["Ekipman", "Zorunlu Yedek Parça"],
            rows: [
              ["Ana motor", "Silindir kapağı, piston, liner, enjektör"],
              ["Ana motor", "Segman seti, egzoz supabı, yakıt pompası"],
              ["Turboşarjer", "Rotor, yatak, sızdırmazlık"],
              ["Jeneratör", "AVR kartı, diyot/SCR seti"],
              ["Pompa", "Mekanik seal, rulman, impeller"],
              ["Kompresör", "Emme/basma valfi, piston ring"]
            ]
          }
        },
        {
          heading: "Envanter Optimizasyonu",
          paragraphs: [],
          bulletPoints: [
            "ABC analizi: A-sınıfı (kritik, pahalı) parçalar sıkı kontrol",
            "XYZ analizi: Tüketim düzeni bazlı sınıflandırma",
            "Ortak parça (commonality): Farklı ekipmanlarda aynı parça kullanımı",
            "Konsinyasyon stoku: Üretici deposu gemide, kullanıldıkça ödeme",
            "Filo havuzu: Aynı tip gemilerde merkezi stok paylaşımı"
          ]
        }
      ],
      keyPoints: [
        "Zorunlu yedek parça eksikliği klas bulgusu olarak raporlanır.",
        "Lead time uzun parçalar için stok seviyesi yüksek tutulmalıdır.",
        "PMS yazılımı stok hareketlerini otomatik takip etmelidir."
      ]
    },

    "Silindir kapağı söküm ve revizyon": {
      title: "Silindir Kapağı Söküm ve Revizyon",
      introduction:
        "Silindir kapağı revizyonu, deniz dizel motorlarının en kritik ve en sık yapılan bakım işlerinden biridir. Egzoz ve emme supapları, enjektör, gösterge valfi ve soğutma kanalları kontrol edilir.",
      sections: [
        {
          heading: "Söküm Prosedürü",
          paragraphs: [],
          bulletPoints: [
            "1. Motoru durdur ve bloke et (turning gear engage)",
            "2. Soğutma suyu, yakıt ve yağlama bağlantılarını sök",
            "3. Egzoz manifold ve exhaust valve housing bağlantılarını sök",
            "4. Silindir kapak saplama somunlarını hidrolik germe aleti ile söküm sırasına göre gevşet",
            "5. Kapağı vinç ile dikkatli kaldır",
            "6. O-ring ve conta yüzeylerini incele",
            "7. Silindir liner üst yüzeyini temizle ve incele"
          ]
        },
        {
          heading: "Revizyon İşlemleri",
          paragraphs: [],
          table: {
            headers: ["İş", "Kontrol Noktası", "Ölçüm"],
            rows: [
              ["Egzoz supabı", "Disk ve oturma yüzeyi aşınması", "Supap çökmesi (sinking)"],
              ["Enjektör yuvası", "Nozzle fit ve sızdırmazlık", "Basınç testi"],
              ["Soğutma kanalları", "Kireç/korozyon birikimi", "Görsel + basınç testi"],
              ["Starting air valfi", "Oturma ve yay", "Sızdırmazlık"],
              ["Indicator cock", "Açma/kapama", "Fonksiyon testi"],
              ["Conta yüzeyi", "Çizik, erozyon", "Düzlemsellik"]
            ]
          }
        },
        {
          heading: "Montaj Dikkat Noktaları",
          paragraphs: [
            "Saplama somunları üretici tarafından belirtilen tork/germe basıncında ve belirtilen sırada sıkılmalıdır. O-ring ve contalar yeni takılmalıdır. Soğutma sistemi basınç testi ve yakıt sistemi sızdırmazlık testi montaj sonrası yapılmalıdır."
          ]
        }
      ],
      keyPoints: [
        "Silindir kapağı saplama somunları çapraz sırada sıkılır.",
        "Egzoz supabı sinking limiti aşıldığında yeni supap takılmalıdır.",
        "Revizyon sonrası motor ilk çalıştırmada yakın izleme gerekir."
      ]
    },

    "Piston ve segman değişimi": {
      title: "Piston ve Segman Değişimi",
      introduction:
        "Piston çekme, silindir astarı ve piston durumunu değerlendirmek, segmanları değiştirmek ve piston soğutma sistemini kontrol etmek amacıyla yapılan önemli bakım işlemidir.",
      sections: [
        {
          heading: "Piston Çekme Prosedürü",
          paragraphs: [],
          bulletPoints: [
            "1. Silindir kapağını sök",
            "2. Pistonu TDC'ye getir",
            "3. Piston çekme aletini bağla",
            "4. Pistonu yavaşça yukarı çek",
            "5. Piston ve biyeli güvenli yere yerleştir",
            "6. Silindir gömleğini incele (scouring, cloverleafing)"
          ]
        },
        {
          heading: "Segman Kontrolü",
          paragraphs: [],
          table: {
            headers: ["Kontrol", "Ölçüm", "Limit"],
            rows: [
              ["Ağız boşluğu (butt clearance)", "Feeler gauge", "Üretici spec'e göre"],
              ["Yükseklik aşınması", "Mikrometre", "Max aşınma limiti"],
              ["Kanal temizliği", "Görsel", "Karbon birikimi yok"],
              ["Yay gücü", "Yay tester", "Üretici spec'e göre"],
              ["Serbest boşluk (free gap)", "Ölçüm", "Üretici spec"]
            ]
          }
        },
        {
          heading: "Piston Soğutma Kontrolü",
          paragraphs: [
            "Crosshead motorlarda piston yağ soğutmalı olup, teleskopik boru veya salınımlı bağlantı ile yağ beslenir. Soğutma yağı çıkış sıcaklığı (piston cooling oil outlet temperature) performans göstergesidir. Yüksek sıcaklık, soğutma kanalı tıkanıklığını veya taç bölgesi erimesini işaret eder."
          ]
        }
      ],
      keyPoints: [
        "Piston çekme/takma sırasında liner yüzey hasarlanmamalıdır.",
        "Segmanlar numaralı konumlarına uygun yerleştirilmelidir.",
        "Piston taç bölgesinde yanık veya erime belirtisi kritik arıza göstergesidir."
      ]
    },

    "Liner muayene ve ölçüm": {
      title: "Liner Muayene ve Ölçüm",
      introduction:
        "Silindir gömleği (liner) iç yüzey durumu ve aşınma profili, motor performansı ve güvenliği için belirleyicidir. Düzenli ölçüm ve muayene, liner ömrünü optimize eder.",
      sections: [
        {
          heading: "Liner Aşınma Ölçümü",
          paragraphs: [
            "Liner iç çapı, üst (TDC yakını), orta ve alt bölgelerde hem ateşleme-karşı yönde hem de pruva-kıç yönünde ölçülür. Ölçüm iç mikrometre veya dial gauge ile yapılır.",
            "Aşınma hızı (wear rate) mm/1000 saat olarak hesaplanır."
          ],
          formula: {
            expression: "Wear rate = (Dmeasured − Dnominal) / Operating hours × 1000",
            variables: [
              "Dölçülen = mevcut iç çap (mm)",
              "Dnominal = orijinal iç çap (mm)",
              "Çalışma saati = liner toplam çalışma süresi"
            ]
          },
          example: {
            problem:
              "Nominal çapı 500,00 mm olan liner'da 20.000 saat sonra TDC bölgesinde 500,80 mm ölçüldü. Aşınma hızını hesaplayınız.",
            steps: [
              "Aşınma = 500,80 − 500,00 = 0,80 mm",
              "Aşınma hızı = 0,80 / 20.000 × 1000"
            ],
            result: "Wear rate = 0,04 mm/1000 hours. The normal value is between 0,03-0,05 mm/1000 hours; it is at an acceptable level."
          }
        },
        {
          heading: "Liner Yüzey Durumu",
          paragraphs: [],
          table: {
            headers: ["Durum", "Tanım", "Aksiyon"],
            rows: [
              ["Normal honing pattern", "Çapraz çizgiler görünür", "İdeal durum"],
              ["Scuffing", "Lokal parlak aşınma", "Yağlama kontrolü"],
              ["Cloverleafing", "Port bölgesinde yonca yaprağı aşınma", "Enjeksiyon kontrolü"],
              ["Bore polishing", "Ayna gibi parlak yüzey", "Yağ tüketimi artar"],
              ["Corrosion", "Soğutma suyu kaçağı belirtisi", "Acil müdahale"]
            ]
          }
        }
      ],
      keyPoints: [
        "Maximum aşınma limiti üretici tarafından belirtilir; tipik olarak %0,4-0,8 çap artışı.",
        "Honing pattern korunması yağlama performansı için kritiktir.",
        "Liner ölçüm sonuçları PMS'e kaydedilip trend analizi yapılmalıdır."
      ]
    },

    "Supap taşlama ve ayar": {
      title: "Supap Taşlama ve Ayar",
      introduction:
        "Egzoz supapları yanma gazlarına doğrudan maruz kaldığından en çok aşınan motor bileşenlerindendir. Düzenli taşlama ve ayar, yanma verimi ve motor güvenliği için zorunludur.",
      sections: [
        {
          heading: "Supap Taşlama",
          paragraphs: [
            "Supap oturma yüzeyi (seat face) ve supap yuvası (seat insert) zamanla yanma gazı erozyonu ve korozyon nedeniyle aşınır. Taşlama ile her iki yüzey yeniden uyumlu hale getirilir.",
            "Taşlama macunu ile el ile veya taşlama makinesi ile yapılır. Kaba (coarse) taşlama sonrası ince (fine) taşlama uygulanır. Taşlama sonrası yüzey sızdırmazlığı boya kalem testi (blue marking) ile kontrol edilir."
          ]
        },
        {
          heading: "Supap Çökmesi (Sinking) Ölçümü",
          paragraphs: [
            "Supap disk üst yüzeyi ile silindir kapağı referans yüzeyi arasındaki mesafe ölçülür. Supap aşındıkça bu mesafe artar (supap çöker). Sinking limiti aşıldığında supap veya seat insert değiştirilmelidir."
          ],
          table: {
            headers: ["Durum", "Sinking Değeri", "Aksiyon"],
            rows: [
              ["Yeni supap", "0 mm (referans)", "—"],
              ["Normal aşınma", "1-3 mm", "Taşlama yeterli"],
              ["Sınıra yakın", "3-4 mm", "Taşlama + yakın izleme"],
              ["Limit aşıldı", ">4 mm (üretici spec)", "Supap veya seat değişimi"]
            ]
          }
        }
      ],
      keyPoints: [
        "Taşlama sonrası tüm pasta kalıntıları temizlenmelidir.",
        "Supap döndürme (rotation) mekanizması eşit aşınma sağlar.",
        "Sinking ölçümleri trend olarak PMS'e kaydedilmelidir."
      ]
    },

    "Enjektör test ve bakım": {
      title: "Enjektör Test ve Bakım",
      introduction:
        "Yakıt enjektörü, yakıtı silindir içine yüksek basınçta ve doğru paternde püskürten kritik bileşendir. Enjektör performansı yanma kalitesini, yakıt tüketimini ve emisyonları doğrudan etkiler.",
      sections: [
        {
          heading: "Enjektör Test Prosedürü",
          paragraphs: [],
          bulletPoints: [
            "1. Enjektörü motordan sök ve temizle",
            "2. Enjektör test tezgahına bağla",
            "3. Açma basıncı kontrolü (opening pressure test)",
            "4. Sızdırmazlık testi (seat tightness): belirli basınçta damlatma olmamalı",
            "5. Püskürtme paterni kontrolü: homojen, simetrik ve atomize",
            "6. Geri akış testi: iğne kılavuzu aşınması",
            "7. Sonuçları kaydet ve gerekiyorsa onar/değiştir"
          ]
        },
        {
          heading: "Enjektör Arıza Belirtileri",
          paragraphs: [],
          table: {
            headers: ["Belirti", "Olası Neden", "Aksiyon"],
            rows: [
              ["Düşük açma basıncı", "Yay yorulması", "Yay değişimi veya ayar"],
              ["Damlama", "Nozzle seat aşınması", "Nozzle değişimi"],
              ["Asimetrik püskürtme", "Delik tıkanması", "Ultrasonik temizleme"],
              ["Yüksek egzoz sıcaklığı", "Kötü atomizasyon", "Enjektör revizyonu"],
              ["Siyah duman", "Yetersiz püskürtme", "Enjektör kontrolü"]
            ]
          }
        }
      ],
      keyPoints: [
        "Enjektör test basıncı üretici spesifikasyonuna uygun olmalıdır.",
        "Common rail sistemlerde enjektör testi özel ekipman gerektirir.",
        "Enjektör bakımı yakıt tüketimi ve emisyon performansını doğrudan etkiler."
      ]
    },

    "Krank mili saptırma (deflection) ölçümü": {
      title: "Krank Mili Saptırma (Deflection) Ölçümü",
      introduction:
        "Krank mili defleksiyon ölçümü, krank milinin hizalama durumunu kontrol eden kritik bir ölçüm işlemidir. Yatak aşınması, temel bozulması veya şaft hattı problemlerini erken tespit eder.",
      sections: [
        {
          heading: "Ölçüm Prensibi",
          paragraphs: [
            "Defleksiyon ölçümü, krank mili krank koluna (web) takılan dial gauge ile yapılır. Krank mili 360° döndürülürken gauge okumalarındaki değişim kaydedilir. Ölçüm noktaları: TDC, BDC, Port, Starboard ve simetrik ara noktalar.",
            "Defleksiyon değeri, krank milinin o silindir bölgesindeki eğilmesini (bending) gösterir. Yüksek pozitif veya negatif değer, alt yatağın aşınmış veya yükselmiş olduğunu işaret eder."
          ]
        },
        {
          heading: "Ölçüm Prosedürü",
          paragraphs: [],
          bulletPoints: [
            "1. Motoru durdur, turning gear devreye al",
            "2. İndikatör saati krank kolları arasına yerleştir",
            "3. Pistonu BDC'ye getir ve gauge'i sıfırla",
            "4. Motoru yavaşça döndürerek 5 noktada (BDC, Port, TDC, Stbd, BDC) oku",
            "5. Tüm silindirlerde tekrarla",
            "6. Okumaları defleksiyon tablosuna kaydet",
            "7. Üretici limitlerle karşılaştır"
          ]
        },
        {
          heading: "Defleksiyon Limit Değerleri",
          paragraphs: [],
          formula: {
            expression: "Deflection = TDC reading − BDC reading",
            variables: [
              "Pozitif değer: Krank açılıyor (yatak çökmüş)",
              "Negatif değer: Krank kapanıyor (yatak yükselmiş)",
              "Sınır: Üretici spesifikasyonuna göre (tipik ±1/10.000 × stroke)"
            ]
          },
          example: {
            problem:
              "1200 mm stroklu motorda TDC okuması +0,08 mm ve BDC okuması -0,04 mm ise defleksiyonu değerlendiriniz.",
            steps: [
              "Defleksiyon = TDC − BDC = (+0,08) − (−0,04) = +0,12 mm",
              "Sınır = 1200 / 10.000 = 0,12 mm"
            ],
            result: "Deflection = +0,12 mm. The limit value has been reached; bearing inspection should be planned."
          }
        }
      ],
      keyPoints: [
        "Defleksiyon ölçümü motor soğukken ve sıcakken yapılarak karşılaştırılmalıdır.",
        "Ölçüm sonuçları PMS'e kaydedilip trend analizi yapılmalıdır.",
        "Sınır aşan defleksiyon değerleri klas surveyörüne raporlanmalıdır."
      ]
    },

    "Görsel muayene prosedürleri": {
      title: "Görsel Muayene Prosedürleri",
      introduction:
        "Görsel muayene (Visual Inspection - VT), en temel ve en yaygın kullanılan tahribatsız muayene yöntemidir. Çatlak, korozyon, aşınma, deformasyon ve sızıntı gibi yüzey kusurlarını tespit eder.",
      sections: [
        {
          heading: "Muayene Araçları",
          paragraphs: [],
          bulletPoints: [
            "Çıplak göz muayenesi (uzak ve yakın mesafe)",
            "Büyüteç (5-10× magnification)",
            "Boroskop/endoskop (kapalı alanlar, silindir içi)",
            "Fotoğraf/video kayıt",
            "Ölçüm aletleri (cetvel, kumpas, feeler gauge)",
            "Yeterli aydınlatma (min. 500 lux)"
          ]
        },
        {
          heading: "Kontrol Noktaları",
          paragraphs: [],
          table: {
            headers: ["Alan", "Kontrol Edilenler"],
            rows: [
              ["Kaynak dikişleri", "Çatlak, gözeneklilik, alt kesme, eksik dolgu"],
              ["Boru bağlantıları", "Sızıntı, korozyon, vibrasyon hasarı"],
              ["Makine yüzeyleri", "Aşınma, çizik, erozyon, korozyon"],
              ["Elektrik bağlantıları", "Renk değişimi (ısınma), gevşeklik"],
              ["Yapısal elemanlar", "Deformasyon, çatlak, korozyon"],
              ["Tank içi", "Kaplamar korozyonu, pit oluşumu"]
            ]
          }
        }
      ],
      keyPoints: [
        "Görsel muayene diğer tüm NDT yöntemlerinin ön koşuludur.",
        "Yeterli aydınlatma ve temizlik muayene kalitesini doğrudan etkiler.",
        "Tüm bulguların fotoğraflanması ve raporlanması zorunludur."
      ]
    },

    "Ultrasonik kalınlık ölçümü": {
      title: "Ultrasonik Kalınlık Ölçümü",
      introduction:
        "Ultrasonik kalınlık ölçümü (UTM), ses dalgalarının malzeme içindeki yayılma süresini ölçerek duvar kalınlığını belirleyen tahribatsız muayene yöntemidir. Korozyon izleme ve yapısal bütünlük değerlendirmesi için kullanılır.",
      sections: [
        {
          heading: "Ölçüm Prensibi",
          paragraphs: [
            "Prob, malzeme yüzeyine ultrasonik darbe gönderir. Ses dalgası arka yüzeyden yansır ve geri döner. Gidiş-dönüş süresi ve malzemenin ses hızı kullanılarak kalınlık hesaplanır."
          ],
          formula: {
            expression: "d = (v × t) / 2",
            variables: [
              "d = malzeme kalınlığı (mm)",
              "v = ses hızı (m/s); çelik ≈ 5920 m/s",
              "t = gidiş-dönüş süresi (s)"
            ]
          }
        },
        {
          heading: "Uygulama Alanları",
          paragraphs: [],
          table: {
            headers: ["Alan", "Amaç", "Frekans"],
            rows: [
              ["Gemi sacı", "Korozyon izleme", "Klas survey'de"],
              ["Boru hatları", "İç korozyon/erozyon", "Yıllık"],
              ["Kazan drum", "Duvar incelmesi", "2,5 yıllık muayene"],
              ["Tank kaplaması", "Kaplama altı korozyon", "5 yıllık survey"],
              ["Pervane kanatları", "Erozyon/kavitasyon", "Havuz dönemi"]
            ]
          }
        },
        {
          heading: "Ölçüm Hataları ve Önlemler",
          paragraphs: [],
          bulletPoints: [
            "Yüzey pürüzlülüğü: Ölçüm öncesi zımpara ile temizleme",
            "Boya katmanı: Kalın boya hatalı sonuç verir; mümkünse çıplak metalden ölçüm",
            "Kouplant: Prob ile yüzey arasında jel gereklidir",
            "Sıcaklık: Yüksek sıcaklıkta özel prob ve kalibrasyon gerekir"
          ]
        }
      ],
      keyPoints: [
        "Gemi sacı minimum kalınlık limiti klas kuruluşu tarafından belirlenir.",
        "Aşırı kalınlık azalması çelik yenileme (steel renewal) gerektirir.",
        "Ölçüm sonuçları raporda gemi plan çizimi üzerinde gösterilir."
      ]
    },

    "Manyetik parçacık muayenesi (MT)": {
      title: "Manyetik Parçacık Muayenesi (MT)",
      introduction:
        "Manyetik parçacık muayenesi, ferromanyetik malzemelerdeki yüzey ve yüzeye yakın çatlakları tespit eden tahribatsız muayene yöntemidir. Kaynak dikişleri, krank mili, piston kolu gibi bileşenlerin kontrolünde kullanılır.",
      sections: [
        {
          heading: "Çalışma Prensibi",
          paragraphs: [
            "Parça manyetik alan ile mıknatıslanır. Yüzey veya yüzeye yakın bir çatlak varsa, manyetik alan çizgileri çatlak bölgesinde dışarı taşar (kaçak akı oluşur). Bu bölgeye serpilen ince demir tozu parçacıkları, kaçak akı tarafından çekilerek çatlak izini görünür hale getirir."
          ]
        },
        {
          heading: "Uygulama Yöntemleri",
          paragraphs: [],
          table: {
            headers: ["Yöntem", "Açıklama", "Duyarlılık"],
            rows: [
              ["Kuru toz", "Kuru demir tozu serpme", "Orta"],
              ["Islak (süspansiyon)", "Sıvı içinde parçacık", "Yüksek"],
              ["Floresan", "UV ışığı altında görünür parçacık", "En yüksek"],
              ["AC mıknatıslama", "Yüzey çatlakları", "Yüksek"],
              ["DC mıknatıslama", "Yüzey + yüzeye yakın", "Orta-Yüksek"]
            ]
          }
        },
        {
          heading: "Gemi Uygulamaları",
          paragraphs: [],
          bulletPoints: [
            "Krank mili fillet bölgeleri çatlak kontrolü",
            "Kaynak dikişi muayenesi",
            "Piston kolu ve crosshead pin kontrolü",
            "Kaldırma donanımı (vinç, halat, zincir) muayenesi"
          ]
        }
      ],
      keyPoints: [
        "MT yalnızca ferromanyetik malzemelerde uygulanabilir.",
        "Muayene sonrası parça demıknatıslama (demagnetization) yapılmalıdır.",
        "Floresan yöntem karanlık ortamda yapılır ve en hassas tekniktir."
      ]
    },

    "Sıvı penetrant muayenesi (PT)": {
      title: "Sıvı Penetrant Muayenesi (PT)",
      introduction:
        "Sıvı penetrant muayenesi, tüm malzeme tiplerinde (metal, seramik, plastik) yüzey çatlaklarını tespit eden basit ve etkili tahribatsız muayene yöntemidir.",
      sections: [
        {
          heading: "Uygulama Adımları",
          paragraphs: [],
          bulletPoints: [
            "1. Yüzey temizliği (solvent, tiner veya buhar)",
            "2. Penetrant uygulama (kırmızı veya floresan sıvı)",
            "3. Bekleme süresi (dwell time: 10-30 dakika)",
            "4. Fazla penetrantı temizle (yüzey silerek, yıkayarak)",
            "5. Developer (beyaz toz/sıvı) uygula",
            "6. İnceleme: çatlak bölgelerinde kırmızı iz belirir",
            "7. Sonuçları kaydet ve temizle"
          ]
        },
        {
          heading: "MT ve PT Karşılaştırması",
          paragraphs: [],
          table: {
            headers: ["Özellik", "MT", "PT"],
            rows: [
              ["Malzeme", "Yalnızca ferromanyetik", "Tüm malzemeler"],
              ["Çatlak tipi", "Yüzey + yüzeye yakın", "Yalnızca yüzey"],
              ["Hız", "Hızlı", "Orta (bekleme süresi)"],
              ["Duyarlılık", "Yüksek", "Orta-Yüksek"],
              ["Yüzey durumu", "Pürüzlü yüzeyde çalışır", "Temiz/düz yüzey gerekli"]
            ]
          }
        }
      ],
      keyPoints: [
        "PT yüzeyi açık olan çatlaklarda etkilidir; kapalı çatlaklarda tespit edemez.",
        "Floresan penetrant görünür (kırmızı) penetranta göre daha hassastır.",
        "Yüzey temizliği muayene başarısının en kritik faktörüdür."
      ]
    },

    "Titreşim analizi": {
      title: "Titreşim Analizi",
      introduction:
        "Titreşim analizi, döner ekipmanın mekanik durumunu değerlendiren en etkili durum izleme (CBM) tekniğidir. Her arıza tipi kendine özgü titreşim frekansı ve paterni üretir.",
      sections: [
        {
          heading: "Titreşim Ölçüm Parametreleri",
          paragraphs: [],
          table: {
            headers: ["Parametre", "Birim", "İzlenen Durum"],
            rows: [
              ["Displacement (yer değiştirme)", "μm", "Düşük hızlı ekipman dengesizliği"],
              ["Velocity (hız)", "mm/s", "Genel makine durumu (ISO 10816)"],
              ["Acceleration (ivme)", "g veya m/s²", "Yatak arızaları, dişli hasarı"]
            ]
          }
        },
        {
          heading: "Frekans Analizi (FFT)",
          paragraphs: [
            "FFT (Fast Fourier Transform) analizi, titreşim sinyalini frekans bileşenlerine ayırarak arıza tipini belirlemeye olanak tanır.",
            "1× RPM baskın: Dengesizlik (unbalance). 2× RPM: Hizalama bozukluğu (misalignment). Yüksek frekans (kHz): Yatak arızası. Dişli geçiş frekansı: Dişli hasarı."
          ]
        },
        {
          heading: "ISO 10816 Titreşim Sınıfları",
          paragraphs: [],
          table: {
            headers: ["Sınıf", "Velocity RMS (mm/s)", "Değerlendirme"],
            rows: [
              ["A", "0 - 2,8", "İyi"],
              ["B", "2,8 - 7,1", "Kabul edilebilir"],
              ["C", "7,1 - 18", "Uyarı / bakım planla"],
              ["D", ">18", "Tehlikeli / derhal durdur"]
            ]
          }
        }
      ],
      keyPoints: [
        "Titreşim ölçümü her zaman aynı noktadan ve aynı koşullarda yapılmalıdır.",
        "Trend analizi tek ölçümden çok daha değerlidir.",
        "Online titreşim izleme sistemi kestirimci bakımın temelidir."
      ]
    },

    "Yağ analizi ve durum izleme": {
      title: "Yağ Analizi ve Durum İzleme",
      introduction:
        "Yağ analizi, yağlama yağının kimyasal ve fiziksel özelliklerini ve içerdiği aşınma parçacıklarını inceleyerek hem yağ kalitesini hem de yağlanan ekipmanın durumunu değerlendiren CBM tekniğidir.",
      sections: [
        {
          heading: "Analiz Parametreleri",
          paragraphs: [],
          table: {
            headers: ["Parametre", "Ölçüm", "Gösterge"],
            rows: [
              ["Viskozite", "Kinematik viskozite (cSt)", "Yağ bozulması, yakıt sızıntısı"],
              ["TBN (Total Base Number)", "mg KOH/g", "Asit nötralizasyon kapasitesi"],
              ["TAN (Total Acid Number)", "mg KOH/g", "Yağ oksidasyonu"],
              ["Su içeriği", "ppm veya %", "Soğutma suyu sızıntısı"],
              ["Metal parçacıklar", "ppm (Fe, Cu, Pb, Al, Sn)", "Aşınma kaynağı tespiti"],
              ["Partikül sayımı", "ISO 4406 kodu", "Genel kirlilik seviyesi"],
              ["Flash point", "°C", "Yakıt dilüsyonu"]
            ]
          }
        },
        {
          heading: "Aşınma Metali Yorumlama",
          paragraphs: [],
          table: {
            headers: ["Metal", "Kaynak"],
            rows: [
              ["Demir (Fe)", "Silindir liner, dişli, rulman"],
              ["Bakır (Cu)", "Yatak metali, soğutucu boru"],
              ["Kurşun (Pb)", "Yatak overlay"],
              ["Kalay (Sn)", "Yatak metali"],
              ["Alüminyum (Al)", "Piston, yatak"],
              ["Krom (Cr)", "Piston ring, astar kaplama"],
              ["Silisyum (Si)", "Dış kirlilik (toz, kum)"]
            ]
          }
        },
        {
          heading: "Silindir Yağı Analizi (Motor)",
          paragraphs: [
            "Silindir yağı feed rate ayarı TBN seviyesine göre yapılır. TBN düşükse (kükürtlü yakıtla asit nötralizasyonu yetersiz) feed rate artırılır. TBN çok yüksekse feed rate azaltılarak tasarruf sağlanır. Hedef TBN genellikle 20-30 mg KOH/g arasında tutulur."
          ]
        }
      ],
      keyPoints: [
        "Yağ numunesi çalışan sistemden ve doğru noktadan alınmalıdır.",
        "Trend analizi tek ölçüm değerinden çok daha anlamlıdır.",
        "Anormal metal artışı erken yatak arızası göstergesidir."
      ]
    },

    "KKD seçimi ve bakım işlerinde kullanımı": {
      title: "KKD Seçimi ve Bakım İşlerinde Kullanımı",
      introduction:
        "Bakım faaliyetlerinde kişisel koruyucu donanım (KKD) seçimi işe ve riske göre yapılmalıdır. Yanlış KKD seçimi yaralanma riskini artırır ve işi güvensiz hale getirir.",
      sections: [
        {
          heading: "Bakım İşine Göre KKD Eşleştirmesi",
          paragraphs: [],
          table: {
            headers: ["İş", "Temel KKD", "Ek Koruma"],
            rows: [
              ["Taşlama/kesme", "Gözlük + yüz siperi", "Kesilmeye dayanıklı eldiven"],
              ["Kimyasal temizleme", "Kimyasal eldiven + gözlük", "Solunum maskesi (uygun kartuş)"],
              ["Sıcak yüzey yakın çalışma", "Isıya dayanıklı eldiven", "Alev geciktirici tulum"],
              ["Gürültülü alan", "Kulak tıkacı/kulaklık", "Titreşim eldiveni"],
              ["Kapalı alan hazırlığı", "Baret + emniyet ayakkabısı", "Gaz ölçüm cihazı + kurtarma kemeri"]
            ]
          }
        },
        {
          heading: "Uygulama kontrol listesi",
          paragraphs: [],
          bulletPoints: [
            "İşe başlamadan önce JSA/RA üzerinde KKD gereklilikleri doğrula.",
            "KKD'nin beden/uyumluluk kontrolünü yap (özellikle gözlük ve solunum maskesi).",
            "Hasarlı/ömrü dolmuş KKD'yi derhal servis dışı bırak.",
            "Kimyasal işlerde MSDS'ye göre eldiven ve filtre tipi doğrula.",
            "İş bitiminde KKD temizliği ve kayıtlı depolama uygula."
          ]
        }
      ],
      keyPoints: [
        "KKD son bariyerdir; mühendislik ve idari kontrollerin yerine geçmez.",
        "Yanlış eldiven malzemesi kimyasal geçişe neden olabilir.",
        "KKD denetimi toolbox talk'ın zorunlu adımı olmalıdır."
      ]
    },

    "Bakımda yangın güvenliği ve sıcak iş izni": {
      title: "Bakımda Yangın Güvenliği ve Sıcak İş İzni",
      introduction:
        "Makine dairesindeki bakım işlerinde sıcak iş (kaynak, taşlama, kesme) kaynaklı yangın riski yüksektir. İzin sistemi ve yangın gözcüsü uygulaması kritik önemdedir.",
      sections: [
        {
          heading: "Sıcak İş Öncesi Emniyet Adımları",
          paragraphs: [],
          bulletPoints: [
            "Hot Work Permit (PTW) onayı alınmadan işe başlanmaz.",
            "Çevredeki yanıcılar temizlenir veya yangın battaniyesi ile izole edilir.",
            "Yakıt/yağ sızıntısı ve buhar varlığı gaz ölçümü ile doğrulanır.",
            "Uygun tipte portatif söndürücüler hazır bulundurulur.",
            "Yangın gözcüsü iş boyunca ve iş bitiminden sonra en az 30 dk sahada kalır."
          ]
        },
        {
          heading: "Saha hatası uyarısı",
          paragraphs: [
            "En sık saha hatası, taşlama öncesi bilge ve platform altındaki yağlı bez/kir birikimlerinin temizlenmemesidir. Kıvılcım düşmesiyle gecikmeli tutuşma meydana gelebilir ve vardiya değişiminde fark edilmeyen yangına dönüşebilir."
          ]
        }
      ],
      keyPoints: [
        "Quick closing valve ve acil durdurmaların erişilebilirliği işe başlamadan kontrol edilmelidir.",
        "Sıcak iş sonrası yeniden gaz ölçümü iyi uygulamadır.",
        "Yangın gözcüsü görevi başka işlerle birleştirilmemelidir."
      ]
    },

    "MARPOL Ek I (Petrol) bakım ve kayıt yükümlülükleri": {
      title: "MARPOL Ek I (Petrol) Bakım ve Kayıt Yükümlülükleri",
      introduction:
        "Ek I, petrol kirliliğinin önlenmesine odaklanır. Yağlı su separatörü, 15 ppm alarmı ve ilgili borulama/valf düzeninin bakımı ile kayıt disiplinini zorunlu kılar.",
      sections: [
        {
          heading: "Uygulama kontrol listesi",
          paragraphs: [],
          bulletPoints: [
            "OWS ve 15 ppm monitor kalibrasyon/tetik testlerini PMS'e göre uygula.",
            "Standard discharge connection ve hat valflerinin mühür/pozisyon kontrolünü yap.",
            "Oil Record Book Part I girişlerini operasyonla aynı vardiyada tamamla.",
            "Sludge transfer, incineration ve shore disposal kayıtlarını çapraz doğrula.",
            "Bypass hattı/kaçak bağlantı açısından periyodik boru devriyesi yap."
          ]
        }
      ],
      keyPoints: [
        "Kayıt-tank soundingi uyuşmazlığı PSC'de doğrudan uygunsuzluk doğurur.",
        "Magic pipe kullanımı ağır ihlaldir ve cezai yaptırıma tabidir.",
        "OWS arızalarında acil eylem ve liman bildirim prosedürü hazır olmalıdır."
      ]
    },

    "MARPOL Ek II (Dökme zararlı sıvılar) uygulama yükümlülükleri": {
      title: "MARPOL Ek II (Dökme Zararlı Sıvılar) Uygulama Yükümlülükleri",
      introduction:
        "Ek II, dökme taşınan zararlı sıvı maddeler için tank yıkama, stripping ve deşarj kriterlerini düzenler. Makine personeli yıkama/transfer ekipmanının çalışırlığından sorumludur.",
      sections: [
        {
          heading: "Saha hatası uyarısı",
          paragraphs: [
            "Kategoriye uygun prewash yapılmadan limandan ayrılmak ciddi ihlaldir. Sahada en çok görülen hata, stripping hattı testinin atlanması nedeniyle tankta kalıntı bırakılmasıdır."
          ]
        }
      ],
      keyPoints: [
        "Cargo Record Book kayıtları operasyon zaman damgalarıyla uyumlu olmalıdır.",
        "Tank yıkama ekipman arızaları sefer öncesi giderilmelidir.",
        "P&A Manual prosedürleri gemi tipine uygun güncel tutulmalıdır."
      ]
    },

    "MARPOL Ek III (Paketli zararlı maddeler) bakım bağlantıları": {
      title: "MARPOL Ek III (Paketli Zararlı Maddeler) Bakım Bağlantıları",
      introduction:
        "Ek III doğrudan makine ekipmanına odaklanmasa da, paketli zararlı yük taşınırken drenaj, havalandırma ve sızıntı kontrol altyapısının emniyetli çalışması bakım ekibinin sorumluluğundadır.",
      sections: [
        {
          heading: "Uygulama kontrol listesi",
          paragraphs: [],
          bulletPoints: [
            "Kargo alanı drenajlarının geri akış önleyici valflerini test et.",
            "Havalandırma fanlarının kıvılcım riski ve izolasyon kontrollerini yap.",
            "Dökülme kitlerinin erişilebilirlik ve içerik kontrolünü vardiya bazında doğrula.",
            "Sızıntı alarmı/izleme sensörlerinin fonksiyon testini planla."
          ]
        }
      ],
      keyPoints: [
        "IMDG segregasyonuna aykırı geçici depolama saha kazalarını artırır.",
        "Drenaj körleme/izolasyon planları tatbikatla doğrulanmalıdır.",
        "Makine-kargo ekipleri arasında ortak kontrol turu iyi uygulamadır."
      ]
    },

    "MARPOL Ek IV (Pis su) bakım ve kayıt yükümlülükleri": {
      title: "MARPOL Ek IV (Pis Su) Bakım ve Kayıt Yükümlülükleri",
      introduction:
        "Ek IV, pis suyun denize deşarj şartlarını ve arıtma sistemi gerekliliklerini belirler. Sewage treatment plant performansı düzenli bakım ve doğru işletmeye bağlıdır.",
      sections: [
        {
          heading: "Uygulama kontrol listesi",
          paragraphs: [],
          bulletPoints: [
            "Sewage plant blower, dozaj pompası ve dezenfeksiyon ünitesi fonksiyon testini yap.",
            "Holding tank seviye alarmı ve taşma emniyetlerini doğrula.",
            "Deşarj valf dizilimi ve overboard kilit/mühür durumunu kontrol et.",
            "Bakım ve arıza kayıtlarını ISM formlarıyla eşleştir."
          ]
        }
      ],
      keyPoints: [
        "Arıtma sistemi by-pass kullanımı ancak prosedür ve bildirimle yönetilebilir.",
        "Yanlış kimyasal dozaj biyolojik prosesi bozarak uygunsuz deşarja yol açar.",
        "Liman devleti denetiminde ekipman testi talep edilebilir."
      ]
    },

    "MARPOL Ek V (Çöp) uygulama ve kayıt yükümlülükleri": {
      title: "MARPOL Ek V (Çöp) Uygulama ve Kayıt Yükümlülükleri",
      introduction:
        "Ek V kapsamında çöp ayrıştırma, depolama, işleme ve deşarj/teslim süreçleri kayıt altına alınmalıdır. Makine dairesi özellikle incinerator ve atık transfer ekipmanını emniyetli işletmekle sorumludur.",
      sections: [
        {
          heading: "Saha hatası uyarısı",
          paragraphs: [
            "Sık görülen hata, özel alanda yiyecek atığı deşarj limitlerinin yanlış uygulanmasıdır. GPS konumu kayda işlenmeden yapılan atık transferleri denetimde ciddi uygunsuzluk oluşturur."
          ]
        }
      ],
      keyPoints: [
        "Garbage Record Book girişleri kategori bazında ve gecikmeden yapılmalıdır.",
        "Plastik ve sentetik atıkların denize deşarjı tamamen yasaktır.",
        "Incinerator operasyonu üretici sıcaklık/atık türü limitlerine göre yürütülmelidir."
      ]
    },

    "MARPOL Ek VI (Hava emisyonları) bakım ve uyum": {
      title: "MARPOL Ek VI (Hava Emisyonları) Bakım ve Uyum",
      introduction:
        "Ek VI, NOx, SOx, partikül ve ozon tabakasına zarar veren emisyonları sınırlar. Yakıt geçişi, scrubber/EGCS, NOx teknik dosyası ve enerji verimliliği kayıtları bakım süreçleriyle doğrudan ilişkilidir.",
      sections: [
        {
          heading: "Uygulama kontrol listesi",
          paragraphs: [],
          bulletPoints: [
            "ECA giriş/çıkış yakıt geçiş zamanını ve tank/hat durumunu kayıtla doğrula.",
            "Scrubber washwater sensörleri (pH, PAH, bulanıklık) bakım-kalibrasyonunu uygula.",
            "NOx kritik komponent değişimlerini Technical File ve EIAPP ile eşleştir.",
            "ODS ve VOC ile ilgili servis kayıtlarını sertifikalarla birlikte sakla."
          ]
        }
      ],
      keyPoints: [
        "Yakıt değişim prosedüründeki gecikme SOx ihlaline neden olabilir.",
        "SCR/EGR performansı düzenli bakım yapılmazsa hızla düşer.",
        "Ek VI uyumu için kayıt, operasyon kadar kritiktir."
      ]
    },

    "MARPOL Ek I-VI entegre kayıt ve uygulama yükümlülük matrisi": {
      title: "MARPOL Ek I-VI Entegre Kayıt ve Uygulama Yükümlülük Matrisi",
      introduction:
        "Tüm MARPOL ekleri için bakım, operasyon ve kayıt süreçlerinin entegre yönetimi denetim başarısının anahtarıdır. Gemide tek bir yükümlülük matrisiyle sorumluluk dağıtımı netleştirilmelidir.",
      sections: [
        {
          heading: "Entegre kontrol listesi",
          paragraphs: [],
          bulletPoints: [
            "Her MARPOL eki için sorumlu zabit/mühendis ve yedek sorumlu tanımla.",
            "Kayıt defteri, sertifika ve ekipman test tarihlerini tek tabloda takip et.",
            "Aylık iç denetimde kayıt-belge-ekipman tutarlılığını çapraz kontrol et.",
            "Bulguları CAPA (düzeltici/önleyici faaliyet) planına bağla."
          ]
        }
      ],
      keyPoints: [
        "Denetimde en kritik bulgu, doğru operasyonun yanlış/eksik kaydedilmesidir.",
        "Matris yaklaşımı vardiya devrinde bilgi kaybını azaltır.",
        "ISM iç tetkikleri MARPOL kayıt kalitesini periyodik doğrulamalıdır."
      ]
    }
  }
};

export default content10;
