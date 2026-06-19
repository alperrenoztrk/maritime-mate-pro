import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Otomasyon ve alarm sistemleri bakımı",
  roleSlug: "eto",
  taskIndex: 1,
  estimatedPages: 25,
  intro: `Modern gemilerde makine dairesi büyük ölçüde otomasyon altyapısıyla yönetilir; ETO bu altyapının kalbi olan PLC'ler (Programmable Logic Controller), sensörler, alarm ve izleme sistemlerinin teknik sağlığından sorumludur. Bu bölüm; PLC bakımı, sensör kalibrasyonu, alarm setpoint yönetimi, sistem entegrasyonu, makine dairesinin unmanned (UMS / E0) güvenilirliği ve alarm log analizi ile tekrarlayan arıza (recurring fault) tespiti konularını sınıf kuralları ve pratik prosedürlerle açıklar.`,
  sources: [
    "STCW Code A-III/6 — Control engineering competence",
    "SOLAS Chapter II-1 Reg. 47-53 — Periodically Unattended Machinery Spaces",
    "IACS UR M (Machinery) ve E10 (alarm/monitoring) kuralları",
    "IEC 61131 — Programmable Controllers",
    "IEC 60092-504 — Control and Instrumentation in Ships",
    "Sınıf kuralları (DNV Part 4 Ch.9, LR Part 6) — Automation/UMS notation",
    "Reeds Marine Engineering — Control Engineering volume",
    "Vendor manuals (Kongsberg, Praxis, Lyngsø, Siemens marine automation)",
  ],
  chapters: [
    {
      heading: "1. Gemi Otomasyon Mimarisi",
      lead: `Gemi otomasyonu; saha cihazları (sensör/aktüatör), kontrolörler (PLC/DCS), iletişim ağı (fieldbus/Ethernet) ve operatör arayüzü (HMI/IAS) katmanlarından oluşan hiyerarşik bir yapıdır.`,
      sections: [
        {
          subheading: "1.1 IAS, AMS ve kontrol katmanları",
          paragraphs: [
            `Integrated Automation System (IAS), tüm makine ve yardımcı sistemlerin tek bir izleme/kontrol platformunda toplanmasıdır. Alarm and Monitoring System (AMS), sensörlerden gelen verileri toplar, alarm setpoint'leriyle karşılaştırır ve operatöre görsel/işitsel alarm verir. ETO, bu sistemlerin ağ topolojisini, redundancy (yedekleme) mimarisini ve I/O dağılımını bilmelidir.`,
            `Kontrol katmanı genelde dağıtık PLC'ler ile gerçekleştirilir; her PLC bir alt sistemi (jacket water, fuel oil, bilge, ballast) yönetir ve merkezi sunucuya raporlar. Saha haberleşmesi Modbus, Profibus/Profinet, CAN veya proprietary fieldbus üzerinden yapılır.`,
          ],
          bullets: [
            `Saha katmanı: sensörler, transmitter'lar, aktüatörler`,
            `Kontrol katmanı: PLC/DCS, I/O modülleri`,
            `İletişim katmanı: fieldbus, redundant Ethernet ring`,
            `Operatör katmanı: HMI, IAS workstation, alarm printer`,
            `Sunucu katmanı: redundant server, historian, data logger`,
          ],
        },
        {
          subheading: "1.2 Redundancy ve arıza toleransı",
          paragraphs: [
            `UMS notasyonu için otomasyon sisteminin tek arıza ile makine dairesini riske atmaması gerekir. ETO; redundant power supply (çift besleme), redundant network (ring topoloji, otomatik yol değiştirme) ve hot-standby PLC/server konfigürasyonlarını periyodik test eder. Yedek sistemin gerçekten devreye girdiğini doğrulamak kritiktir; "sessiz yedek arızası" en tehlikeli durumdur.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS II-1 Reg. 51-53 (UMS)",
              text: `Periyodik gözetimsiz makine dairesi için alarm sistemi, kontrol sistemi ve güvenlik sistemi gereksinimleri tanımlanır. Tek bir arıza birden fazla zorunlu sistemi etkilememeli; alarm sistemi kendi besleme arızasını da raporlamalıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. PLC Bakımı ve Yönetimi",
      sections: [
        {
          subheading: "2.1 Donanım bakımı ve durum izleme",
          paragraphs: [
            `PLC bakımı; CPU/I/O modül LED durum kontrolü, batarya yedekli RAM'lerin batarya ömrü takibi, soğutma fanı ve filtre temizliği, terminal bağlantı sıkılığı ve toz/nem kontrolünü kapsar. ETO, PLC kabinetlerinin sıcaklığını ve nemini izler; aşırı sıcaklık modül ömrünü kısaltır ve hatalı I/O okumalarına yol açar.`,
            `RAM yedek bataryası biterse program ve ayarlar kaybolabilir. ETO, batarya düşük alarmını ciddiye alır, bataryayı enerji kesilmeden (modüle göre) değiştirir ve programı yedekten geri yükleyebilecek hazırlıkta olur. Tüm PLC programlarının güncel offline yedeği saklanır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Program kaybı riski",
              text: `RAM batarya değişimi sırasında güç kesilirse veya batarya tamamen bittiyse PLC programı silinebilir. Mutlaka güncel program yedeği (proje dosyası) gemide bulunmalı ve ETO restore prosedürünü bilmelidir.`,
            },
          ],
        },
        {
          subheading: "2.2 Firmware, program değişikliği ve değişiklik yönetimi",
          paragraphs: [
            `PLC firmware veya logic değişiklikleri kontrollü yapılmalıdır. ETO, herhangi bir değişiklik öncesi mevcut programı yedekler, değişikliği vendor onayı ve management of change (MOC) prosedürüyle uygular, sonra fonksiyon testi yapar. Plansız "hızlı düzeltmeler" gizli arızalara ve sertifikasyon ihlaline yol açabilir.`,
          ],
          table: {
            caption: `PLC Bakım Periyot Tablosu (Tipik)`,
            headers: ["İş", "Periyot", "Sorumlu", "Kayıt"],
            rows: [
              ["LED/durum kontrolü", "Haftalık", "ETO", "PMS rapor"],
              ["RAM batarya kontrolü", "Aylık", "ETO", "PMS rapor"],
              ["Fan/filtre temizliği", "3 ay", "ETO", "PMS rapor"],
              ["Program yedekleme", "Değişiklik + 6 ay", "ETO", "Yedek arşivi"],
              ["I/O fonksiyon testi", "Yıllık + sörvey", "ETO", "Sörvey kaydı"],
            ],
          },
        },
      ],
    },
    {
      heading: "3. Sensör Kalibrasyonu",
      sections: [
        {
          subheading: "3.1 Sıcaklık, basınç ve seviye sensörleri",
          paragraphs: [
            `Otomasyon sisteminin doğruluğu sensörlerin doğruluğuna bağlıdır. ETO; PT100/PT1000 sıcaklık sensörlerini referans termometre ile, basınç transmitter'larını dead-weight tester veya kalibre referans manometre ile, seviye sensörlerini (kapasitif, ultrasonik, float) bilinen referans seviyelerle kalibre eder. 4-20 mA çıkışlı transmitter'larda zero ve span ayarı yapılır.`,
            `Kalibrasyon kaydı her sensör için tutulur: as-found (bulunan) ve as-left (bırakılan) değerler, kullanılan referans cihazın sertifika numarası ve tarih. Bu kayıtlar sınıf sörveyinde ve recurring fault analizinde kritik öneme sahiptir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "4-20 mA loop kontrolü",
              text: `Bir analog sinyal şüpheliyse loop akımını ölçün: 4 mA = %0, 12 mA = %50, 20 mA = %100. 4 mA altı veya 20 mA üstü değer sensör/kablo arızasını gösterir; akıllı transmitter'lar bu durumda NAMUR NE43 ile hata sinyali (örn. 3.6 mA veya 21 mA) verir.`,
            },
          ],
        },
        {
          subheading: "3.2 Akış, devir ve özel sensörler",
          paragraphs: [
            `Akış ölçerler (manyetik, vortex, coriolis), devir sensörleri (pickup, encoder), oksijen/gaz analizörleri ve viskozite sensörleri özel kalibrasyon prosedürleri gerektirir. ETO, vendor prosedürüne uyar ve kalibrasyonu gerektiren sürüklenme (drift) belirtilerini izler. Yanlış kalibre edilmiş bir sensör hem yanlış alarm hem de tehlikeli "kaçırılan alarm" üretir.`,
          ],
        },
      ],
    },
    {
      heading: "4. Alarm Setpoint Yönetimi",
      sections: [
        {
          subheading: "4.1 Setpoint belirleme ve katmanlı alarmlar",
          paragraphs: [
            `Her ölçülen büyüklük için alarm setpoint'leri vendor/sınıf önerisine göre belirlenir: high/high-high ve low/low-low katmanları, ön-uyarı (alert) ve trip (shutdown) seviyeleri. ETO, bu setpoint'lerin doğru, makine üreticisi limitleriyle uyumlu ve gereksiz alarm (nuisance alarm) yaratmayacak şekilde ayarlandığından emin olur.`,
            `Shutdown ve slow-down fonksiyonları (örn. ana makine yağ basıncı düşük → slow down, çok düşük → shutdown) güvenlik kritiktir; ETO bu setpoint'leri ve actuator zincirini (sensör → mantık → trip valfi) saha testiyle doğrular. Override (geçersiz kılma) fonksiyonları kayıt altına alınır ve denetlenir.`,
          ],
          table: {
            caption: `Örnek Ana Makine Alarm/Trip Setpoint'leri`,
            headers: ["Parametre", "Alarm (High/Low)", "Slow-down", "Shutdown"],
            rows: [
              ["Yağlama yağı basıncı", "Düşük < 2.5 bar", "< 2.0 bar", "< 1.5 bar"],
              ["Soğutma suyu sıcaklığı", "Yüksek > 90°C", "> 95°C", "> 105°C"],
              ["Egzoz sıcaklık sapması", "± 50°C", "—", "—"],
              ["Devir aşımı (overspeed)", "—", "—", "%110-115 nominal"],
              ["Karter yağ buharı (OMD)", "Yoğunluk yüksek", "—", "Trip"],
            ],
          },
        },
        {
          subheading: "4.2 Alarm yönetim felsefesi (EEMUA / nuisance alarm)",
          paragraphs: [
            `Aşırı alarm (alarm flood), operatörü körleştirir ve gerçek tehlikeyi gizler. ETO; tekrarlayan, anlamsız veya yanlış kalibrasyondan kaynaklanan alarmları azaltmak için alarm rasyonalizasyonu uygular; her alarmın bir aksiyonu olmalı, deadband ve gecikme ile titreşim (chattering) alarmları önlenmelidir. EEMUA 191 ilkeleri rehberdir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Alarm flood tehlikesi",
              text: `Bir olay anında yüzlerce alarmın aynı anda gelmesi, operatörün kök nedeni görmesini engeller. İyi tasarlanmış bir alarm sistemi; first-up alarm (ilk tetikleyen) belirleme, gruplama ve önceliklendirme ile bu floodu yönetir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. UMS (Unmanned Machinery Space) Güvenilirliği",
      sections: [
        {
          subheading: "5.1 UMS gereksinimleri ve günlük doğrulama",
          paragraphs: [
            `UMS/E0 notasyonu, makine dairesinin gece veya belirli sürelerde gözetimsiz çalışmasına izin verir. Bu, otomasyon ve alarm sisteminin yüksek güvenilirliğine bağlıdır: bridge alarm transfer, engineer's call system, dead-man alarm (watchkeeping engineer fonksiyonu), fire detection ve bilge alarm sistemlerinin kusursuz çalışması gerekir.`,
            `ETO, UMS moduna geçmeden önce günlük UMS hazırlık kontrol listesini doğrular: tüm kritik alarmlar aktif, hiçbir kritik alarm inhibit (kapalı) değil, otomatik pompalar (bilge, transfer) çalışır, fire detection panel normal, ana makine slow-down/shutdown sistemleri devrede.`,
          ],
          bullets: [
            `Bridge alarm transfer ve geri-onay (acknowledge) testi`,
            `Engineer's call ve dead-man (watch) alarm testi`,
            `Bilge high level alarm ve auto-start bilge pump testi`,
            `Fire detection ve machinery space CO2 alarm doğrulaması`,
            `Standby pompa auto-start (yağ, soğutma suyu) testi`,
          ],
        },
        {
          subheading: "5.2 Inhibit/override kontrolü",
          paragraphs: [
            `Bakım sırasında geçici olarak inhibit edilen (kapatılan) alarmlar UMS moduna geçmeden önce mutlaka geri açılmalıdır. ETO, inhibit listesini düzenli denetler; "unutulmuş inhibit" en yaygın ve tehlikeli UMS hatasıdır. Kritik güvenlik alarmlarının kalıcı inhibit'i sınıf ihlalidir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Unutulmuş bilge alarm inhibit",
              text: `Bir gemide bakım için inhibit edilen bilge high alarm UMS moduna geçilirken geri açılmadı. Gece sintine seviyesi yükseldi, alarm gelmedi ve su makine dairesine ulaştı. Ders: UMS hazırlığında inhibit listesi mutlaka sıfırlanmalı ve teyit edilmelidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Sistem Entegrasyon Kontrolü",
      sections: [
        {
          subheading: "6.1 Fieldbus ve ağ sağlığı",
          paragraphs: [
            `Otomasyon ağındaki iletişim arızaları (kablo, terminal, node arızası) I/O kaybına ve sahte alarmlara yol açar. ETO, fieldbus diagnostic araçlarıyla node durumu, telegram hata oranı ve sonlandırma direnci (termination) kontrolü yapar. Redundant ring topolojide bir kablo koptuğunda ağın diğer yoldan beslenmeye devam ettiği doğrulanır.`,
          ],
        },
        {
          subheading: "6.2 Veri tutarlılığı ve zaman senkronizasyonu",
          paragraphs: [
            `Entegre sistemde tüm cihazların aynı zaman damgasını kullanması, alarm log analizi ve olay sıralaması için kritiktir. ETO, NTP/zaman senkronizasyon kaynağını kontrol eder. Ayrıca farklı alt sistemler arasındaki veri köprülerinin (gateway) doğru çalıştığını, ölçeklendirme (scaling) hatası olmadığını doğrular.`,
          ],
        },
      ],
    },
    {
      heading: "7. Alarm Log Analizi ve Recurring Fault Tespiti",
      sections: [
        {
          subheading: "7.1 Log toplama ve trend analizi",
          paragraphs: [
            `Alarm ve event log'ları, sistemin gizli sorunlarını ortaya çıkaran en değerli veri kaynağıdır. ETO; alarm printer çıktısını ve historian verisini düzenli inceleyerek hangi alarmların en sık tekrarladığını, hangi saatlerde yoğunlaştığını ve hangi alt sistemde kümelendiğini analiz eder.`,
            `Tekrar eden bir alarm; gevşek bir terminal, sürüklenen bir sensör, marjinal bir setpoint veya başlayan bir mekanik arızanın habercisi olabilir. ETO, kök neden analizi (RCA) ile bu işaretleri büyümeden çözer ve "alarm geldi, onayladım, geçti" tuzağına düşmez.`,
          ],
          table: {
            caption: `Recurring Fault Analiz Örneği`,
            headers: ["Alarm", "Sıklık", "Olası Kök Neden", "Aksiyon"],
            rows: [
              ["Jacket water temp high", "Günde 3-4", "Sensör drift / fouling", "Sensör kalibre + kondenser temizliği"],
              ["FO pressure low (chatter)", "Saatte 10+", "Deadband yetersiz", "Setpoint deadband ayarı"],
              ["Gen panel comm fault", "Haftada 2", "Gevşek RS-485 terminal", "Terminal sıkma + termination"],
              ["Bilge level high", "Gece", "Float yapışması", "Float temizliği/değişimi"],
            ],
          },
        },
        {
          subheading: "7.2 Raporlama ve öğrenilen dersler",
          paragraphs: [
            `ETO, recurring fault analiz sonuçlarını makine günlüğüne ve PMS'e kaydeder, gerekirse şirket teknik departmanına ve vendor'a raporlar. Bu kayıtlar filo genelinde "lessons learned" oluşturur ve benzer arızaların kardeş gemilerde önlenmesini sağlar.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Veri odaklı bakım",
              text: `Alarm trendlerini izlemek, takvim bazlı bakımdan durum bazlı (condition-based) bakıma geçişin temelidir. Sürüklenen bir sensör değeri, arıza alarm vermeden günler önce trend grafiğinde görülebilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "8. Güvenlik (Safety) ve Shutdown Sistemleri",
      sections: [
        {
          subheading: "8.1 Bağımsız güvenlik sistemi",
          paragraphs: [
            `Güvenlik (safety/shutdown) sistemi, kontrol sisteminden bağımsız olmalıdır: ana makine overspeed, düşük yağ basıncı ve karter yağ buharı (oil mist detector) trip'leri kontrol PLC'sinden ayrı, fail-safe (enerji kesilince güvenli tarafa) tasarlanır. ETO bu bağımsızlığı korur ve trip zincirini periyodik test eder.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "IACS UR M ve sınıf — Safety system",
              text: `Makine güvenlik sistemi, kontrol ve alarm sisteminden ayrı ve önceliklidir. Shutdown fonksiyonları manuel override'a karşı korunmalı ve override durumu kalıcı görünür/loglu olmalıdır.`,
            },
          ],
        },
        {
          subheading: "8.2 Fonksiyonel emniyet testleri",
          paragraphs: [
            `ETO, slow-down ve shutdown fonksiyonlarını gerçek koşulları simüle ederek (örn. basınç switch'i kontrollü düşürerek) test eder ve trip'in beklenen sürede, doğru aksiyonla gerçekleştiğini doğrular. Test öncesi makine ekibiyle koordinasyon ve gerekli izolasyon sağlanır.`,
          ],
        },
      ],
    },
    {
      heading: "9. Vaka Dersleri",
      sections: [
        {
          subheading: "9.1 Sensör drift kaynaklı yanlış shutdown",
          paragraphs: [
            `Bir gemide kalibre edilmemiş yağ basınç transmitter'ı yavaşça düşük okumaya başladı; sonunda yanlış low-low pressure trip'i ana makineyi durdurdu, gemi dar suda tahrik kaybetti. İnceleme, transmitter'ın kalibrasyon süresinin geçtiğini gösterdi. Ders: kritik sensörlerin kalibrasyon takvimi titizlikle uygulanmalıdır.`,
          ],
        },
        {
          subheading: "9.2 Redundancy yanılsaması",
          paragraphs: [
            `Bir IAS'te yedek server'ın yıllardır arızalı olduğu, ancak hiç test edilmediği için fark edilmediği ortaya çıktı; ana server arızalanınca sistem tamamen durdu. Ders: yedeklik sadece var olmakla değil, periyodik failover testiyle güvence altına alınır.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Test edilmeyen yedek = yedeksizlik",
              text: `Hot-standby PLC, redundant ağ ve yedek server periyodik olarak gerçek devreye-alma testiyle doğrulanmalıdır. Aksi halde kritik anda "yedek de arızalı" sürpriziyle karşılaşılır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "10. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "10.1 ETO otomasyon bakım kontrol listesi",
          bullets: [
            `PLC LED/durum, RAM batarya ve soğutma kontrol edildi mi?`,
            `Tüm PLC programlarının güncel offline yedeği var mı?`,
            `Kritik sensörler kalibrasyon takvimine uygun mu (as-found/as-left)?`,
            `Alarm setpoint'leri vendor/sınıf limitleriyle uyumlu mu?`,
            `Nuisance/chatter alarmları rasyonalize edildi mi?`,
            `UMS hazırlık listesi ve inhibit sıfırlama doğrulandı mı?`,
            `Redundant ağ/server/PLC failover testi yapıldı mı?`,
            `Shutdown/slow-down güvenlik zinciri test edildi mi?`,
            `Alarm log recurring fault analizi yapıldı ve raporlandı mı?`,
            `Zaman senkronizasyonu ve veri tutarlılığı kontrol edildi mi?`,
          ],
          paragraphs: [
            `Otomasyon ve alarm sistemleri, geminin "sinir sistemidir"; ETO bu sistemin sessizce ama güvenilir çalışmasını sağlayarak hem makine dairesinin gözetimsiz güvenliğini hem de tüm gemi operasyonunun emniyetini güvence altına alır. İyi bir ETO, alarm gelmeden trendi okur, arıza büyümeden müdahale eder.`,
          ],
        },
      ],
    },
  ],
};

export default content;
