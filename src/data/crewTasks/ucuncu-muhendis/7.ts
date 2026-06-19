import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "UMS (Unmanned Machinery Space) gece hazırlıkları",
  roleSlug: "ucuncu-muhendis",
  taskIndex: 7,
  estimatedPages: 24,
  intro: `UMS (Unmanned Machinery Space) onaylı gemilerde gece periyodunda makine dairesinde sürekli mühendis nöbeti tutulmaz; bunun yerine makineler otomatik kontrol ve alarm sistemlerinin gözetimine bırakılır. Bu güvenli "insansız" periyodun ön koşulu, titiz bir hazırlıktır ve bu hazırlık genellikle Üçüncü veya Dördüncü Mühendis tarafından yürütülür. Bu bölüm; alarm doğrulamasından servis tank seviyelerine, otomatik start/stop testlerinden nöbetçi mühendis hazırlığına kadar UMS rutinini açıklar.`,
  sources: [
    "SOLAS Chapter II-1 Part E — Periodically unattended machinery spaces",
    "Class kuralları — UMS / E0 notasyonu gereklilikleri",
    "STCW — engineering watchkeeping (UMS düzenlemeleri)",
    "Gemi SMS — UMS hazırlık ve duty engineer prosedürleri",
    "Üretici otomasyon/alarm sistemi el kitapları",
  ],
  chapters: [
    {
      heading: "1. UMS Kavramı ve Onay",
      sections: [
        {
          subheading: "1.1 UMS / E0 notasyonu nedir?",
          paragraphs: [
            `UMS, makine dairesinin belirli periyotlarda (özellikle gece) insansız çalışmasına klas ve bayrak tarafından onay verilmiş durumdur (klas notasyonu sıklıkla "E0"). Onay; yeterli otomatik kontrol, kapsamlı alarm sistemi, otomatik yangın algılama, bridge'e alarm aktarımı ve hızlı erişilebilir bir nöbetçi mühendis varlığını gerektirir.`,
            `UMS, "makineye bakılmıyor" demek değildir; "sürekli insan yerine güvenilir otomasyon + hazır nöbetçi" demektir. Bu güvenin bedeli, her insansız periyot öncesi yapılan disiplinli hazırlıktır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS II-1 Part E",
              text: `Periyodik insansız makine daireleri için ek emniyet düzenlemeleri (alarm, yangın algılama/söndürme, bridge kontrolü, kontrol sistemi yedekliliği) zorunludur. Bu şartlar sağlanmazsa UMS modu uygulanamaz; sürekli nöbet tutulur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Alarm Sisteminin Doğrulanması",
      sections: [
        {
          subheading: "2.1 Setpoint ve aktarım testleri",
          paragraphs: [
            `Hazırlığın kalbi alarm sistemidir. Tüm kritik alarm setpoint'lerinin doğru ayarda ve aktif olduğu doğrulanır; bridge'e ve mühendis kamaralarına alarm aktarımının (extension alarm) çalıştığı test edilir. Susturulmuş (inhibit/override) bir alarm varsa, gerekçesi ve riski değerlendirilir.`,
          ],
          bullets: [
            `Ana/yardımcı makine güvenlik ve alarm devreleri aktif`,
            `Bridge ve kamara alarm aktarımı (dead-man/duty) çalışıyor`,
            `Inhibit edilmiş alarm yok / gerekçesi kayıtlı`,
            `Yangın algılama sistemi aktif ve test edildi`,
          ],
        },
        {
          subheading: "2.2 Bilge alarmı ve high-level switch",
          paragraphs: [
            `Sintine yüksek seviye alarmı ve high-level şamandıra anahtarları test edilir; çünkü insansız periyotta su girişini ilk haber verecek olan bunlardır. Çalışmayan bir bilge alarmı, fark edilmeyen su girişiyle ciddi bir tehlikeye dönüşebilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Susturulan alarmın riski",
              text: `Sürekli öten bir alarmı "rahatsız ediyor" diye kalıcı susturmak, UMS güvenliğini doğrudan yok eder. Alarmın nedeni giderilir; alarm devre dışı bırakılmaz.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Tank Seviyeleri ve Tüketim Planı",
      sections: [
        {
          subheading: "3.1 Servis tankların yeterliliği",
          paragraphs: [
            `İnsansız periyot süresince beklenen tüketim hesaplanır ve yakıt servis tankı, yağ servis/depo tankları, settling tank ve fresh water tanklarının periyodu rahatça karşılayacak seviyede olduğu doğrulanır. Otomatik transfer/dolum sistemleri aktif ve sağlıklı olmalıdır; yine de manuel yedek seviyesi tutulur.`,
          ],
          table: {
            caption: "UMS öncesi tank kontrol mantığı",
            headers: ["Tank", "Kontrol", "Risk"],
            rows: [
              ["Yakıt servis", "Periyot + emniyet payı", "Boşalırsa blackout"],
              ["Yağ servis", "Seviye + otomatik dolum", "Düşükse yağlama kaybı"],
              ["Settling", "Seviye + ısıtma", "Düşükse besleme kesilir"],
              ["Sintine/sludge", "Boş alan var mı?", "Doluysa alarm/taşma"],
            ],
          },
        },
      ],
    },
    {
      heading: "4. Otomatik Start/Stop ve Yedeklilik",
      sections: [
        {
          subheading: "4.1 Standby pompa ve generatör testleri",
          paragraphs: [
            `Standby pompaların (yağ, soğutma suyu, yakıt) otomatik devreye girme (auto start on low pressure) fonksiyonu test edilir. Otomatik generatör start (blackout/load-dependent) ve auto synchronization sisteminin hazır olduğu doğrulanır; çünkü insansız periyotta bir pompa veya jeneratör arızasında müdahaleyi otomasyon yapacaktır.`,
          ],
          bullets: [
            `Yağ/soğutma/yakıt standby pompa auto-start testi`,
            `Auto generatör start ve senkronizasyon hazır`,
            `Otomatik filtre/backflush sistemi aktif`,
            `Kontrol sistemi besleme (UPS/yedek) sağlıklı`,
          ],
        },
      ],
    },
    {
      heading: "5. Haberleşme ve Nöbetçi Mühendis",
      sections: [
        {
          subheading: "5.1 Duty engineer hazırlığı",
          paragraphs: [
            `İnsansız periyotta nöbetçi (duty) mühendis belirlenir; bu kişi alarm çaldığında kısa sürede makine dairesine inebilecek durumda, dinlenmiş ve ulaşılabilir olmalıdır. Güverte (bridge) ile makine arasındaki haberleşme kanalı, dead-man alarmı ve telefon/telsiz test edilir.`,
            `Üçüncü/Dördüncü Mühendis, hazırlığı tamamladıktan sonra makine dairesini "UMS'e hazır" olarak teslim eder ve bunu kayda geçirir; nöbetçi mühendis ve köprüüstü bilgilendirilir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Round (tur) sonrası teslim",
              text: `Hazırlık çoğu zaman kapsamlı bir son turla (engine room round) tamamlanır: gözle kaçak/sıcaklık/seviye kontrolü, anormallik yoksa UMS moduna geçiş. Tur, otomasyonun göremediğini gören son insan kontrolüdür.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Alarm Durumunda Müdahale",
      sections: [
        {
          subheading: "6.1 Gece alarmına yanıt",
          paragraphs: [
            `Alarm çaldığında nöbetçi mühendis vakit kaybetmeden makine dairesine iner, durumu değerlendirir ve gerekirse köprüüstünü bilgilendirir. Yangın veya su girişi gibi kritik alarmda acil durum prosedürü devreye girer. Hazırlık ne kadar iyiyse, gece alarmları o kadar az ve yönetilebilir olur.`,
          ],
        },
      ],
    },
    {
      heading: "7. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "7.1 UMS'e geçiş öncesi kontrol",
          bullets: [
            `Tüm kritik alarmlar aktif, setpoint doğru, inhibit yok mu?`,
            `Bridge ve kamara alarm aktarımı test edildi mi?`,
            `Bilge alarmı ve high-level switch test edildi mi?`,
            `Yangın algılama aktif mi?`,
            `Servis tankları periyodu karşılıyor mu, otomatik dolum aktif mi?`,
            `Standby pompa ve auto generatör start testleri yapıldı mı?`,
            `Duty engineer belli, dinlenmiş ve ulaşılabilir mi?`,
            `Son round yapıldı, anormallik yok ve teslim kaydedildi mi?`,
          ],
          paragraphs: [
            `UMS hazırlığı, "yokluğunda makineye bir şey olmayacağına" dair verilen profesyonel güvencedir. Bu güvence ancak her insansız periyot öncesi tam yapılan kontrollerle gerçek olur; tek atlanan adım, geceyi bir acil duruma çevirebilir.`,
          ],
        },
      ],
    },
  ],
};

export default content;
