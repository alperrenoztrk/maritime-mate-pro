import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Cylinder lubrication ve scrape-down analizi",
  roleSlug: "ikinci-muhendis",
  taskIndex: 9,
  estimatedPages: 24,
  intro: `Büyük iki zamanlı ana makinelerde silindir yağlaması (cylinder lubrication), hem aşınmayı azaltan hem yanma ürünü asitleri nötralize eden kritik bir dengedir; yetersiz yağ scuffing ve seizure, aşırı yağ ise israf ve deposit demektir. İkinci Mühendis; cylinder lub oil feed rate'i (g/kWh) yük ve yakıt kükürt içeriğine göre optimize eder, scrape-down numune analiziyle (Fe içeriği, BN reserve) silindir durumunu izler ve scavenge port inspection ile piston ring/liner durumunu tespit eder. Bu bölüm cylinder lubrication ve scrape-down analizini ele alır.`,
  sources: [
    "Üretici (MAN B&W / WinGD) cylinder oil feed rate kılavuzları",
    "Yağ tedarikçisi BN (Base Number) ve scrape-down analiz rehberleri",
    "MARPOL Annex VI — yakıt kükürt sınırları",
    "Scavenge inspection prosedürleri",
    "Cylinder oil condition monitoring",
  ],
  chapters: [
    {
      heading: "1. Silindir Yağlama Dengesi",
      sections: [
        {
          subheading: "1.1 Hem koruma hem nötralizasyon",
          paragraphs: [
            `Silindir yağı iki iş yapar: liner-ring arası yağ filmi sağlayarak aşınmayı azaltır ve yağdaki bazik bileşenlerle (BN — Base Number) yanmadan oluşan kükürt asitlerini nötralize eder. İkinci Mühendis bu dengeyi yönetir; yetersiz yağ/BN korozif aşınma ve scuffing, fazla yağ ise deposit ve israf yaratır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Feed rate optimizasyonu",
              text: `Feed rate (g/kWh), yük ve yakıt kükürdüne göre üretici kılavuzunda belirlenir. Doğru optimize edilmiş feed rate hem aşınmayı önler hem yağ maliyetini düşürür; scrape-down analizi bu optimizasyonu yönlendirir.`,
            },
          ],
        },
        {
          subheading: "1.2 Yakıt kükürdü ve BN seçimi",
          paragraphs: [
            `Yüksek kükürtlü yakıt daha çok asit üretir; bu yüzden daha yüksek BN'li silindir yağı veya daha yüksek feed rate gerekir. MARPOL Annex VI kükürt sınırları (örn. düşük kükürtlü yakıta geçiş) silindir yağı seçimini de etkiler; yanlış eşleştirme korozyon veya deposit yaratır.`,
          ],
        },
      ],
    },
    {
      heading: "2. Scrape-Down Analizi",
      sections: [
        {
          subheading: "2.1 Numune ve laboratuvar",
          paragraphs: [
            `Silindir altına (scavenge/piston rod stuffing box bölgesi) inen kullanılmış yağ (scrape-down) numunesi alınır ve analiz edilir: demir (Fe) içeriği aşınmayı, kalan BN ise asit nötralizasyon rezervini gösterir. Yüksek Fe aşırı aşınma/scuffing, düşük BN yetersiz nötralizasyon demektir. İkinci Mühendis bu verilere göre feed rate'i ayarlar.`,
          ],
          table: {
            caption: "Scrape-down göstergeleri",
            headers: ["Gösterge", "Anlam"],
            rows: [
              ["Fe içeriği ↑", "Aşınma/scuffing artışı"],
              ["BN reserve ↓", "Asit nötralizasyon yetersiz"],
              ["Yüksek aşınma metali", "Liner/ring sorunu"],
            ],
          },
        },
      ],
    },
    {
      heading: "3. Scavenge Port Inspection",
      sections: [
        {
          subheading: "3.1 Ring ve liner durumu",
          paragraphs: [
            `Scavenge port'tan yapılan inspection ile piston ring durumu (kırık, yapışma, aşınma), ring zone deposit ve liner yüzeyi (glazing/parlaklaşma, scuffing/çizilme) gözlemlenir. Erken scuffing belirtisi yakalanıp müdahale edilmezse seizure (sıkışma) riski doğar.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Scuffing'i erken yakala",
              text: `Liner scuffing erken tespit edilip yağlama/yük ayarıyla müdahale edilmezse, ilerleyip piston seizure ve büyük hasara yol açabilir. Düzenli scavenge inspection bu erken teşhisi sağlar.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Müdahale ve Optimizasyon",
      sections: [
        {
          subheading: "4.1 Veriye dayalı ayar",
          paragraphs: [
            `İkinci Mühendis; scrape-down ve scavenge bulgularına göre feed rate'i artırır/azaltır, gerekirse run-in (yeni liner/ring sonrası artırılmış yağlama) uygular. Tüm ayarlar kayıt altına alınır. Veriye dayalı yönetim, hem aşınmayı hem maliyeti optimize eder.`,
          ],
        },
      ],
    },
    {
      heading: "5. Kayıt ve Trend",
      sections: [
        {
          subheading: "5.1 Silindir durumu takibi",
          paragraphs: [
            `Her silindirin Fe/BN trendi ve inspection bulguları kaydedilir. Trend, tek bir ölçümden çok daha bilgilendiricidir; yükselen Fe veya düşen BN, sorunun erken habercisidir. İkinci Mühendis bu trendi izleyerek büyük arızaları önler.`,
          ],
        },
      ],
    },
    {
      heading: "6. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "6.1 Cylinder lubrication kontrolü",
          bullets: [
            `Feed rate yük ve yakıt kükürdüne göre optimize mi?`,
            `Silindir yağı BN'si yakıta uygun mu?`,
            `Scrape-down numunesi alınıp Fe/BN analiz edildi mi?`,
            `Scavenge port inspection ile ring/liner durumu izlendi mi?`,
            `Scuffing/glazing belirtisi erken yakalanıp müdahale edildi mi?`,
            `Ayarlar ve bulgular kayıt altına alınıp trend izleniyor mu?`,
          ],
          paragraphs: [
            `Cylinder lubrication ve scrape-down analizi, İkinci Mühendisin ana makinenin kalbini koruduğu en teknik görevlerindendir. Doğru feed rate, veriye dayalı izleme ve erken scuffing teşhisi; pahalı liner/piston hasarını önleyerek ana makinenin güvenilirliğini ve ömrünü güvence altına alır.`,
          ],
        },
      ],
    },
  ],
};

export default content;
