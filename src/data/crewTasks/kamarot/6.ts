import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Emniyet ve acil durum görevleri",
  roleSlug: "kamarot",
  taskIndex: 6,
  estimatedPages: 22,
  intro: `Gemide herkesin — görevi ne olursa olsun — bir emniyet ve acil durum rolü vardır; kamarot da bir mürettebat üyesi olarak Station Bill'de tanımlı görevleri üstlenir. Muster station'da hazır bulunmak, yaşam mahalli yangın kapılarını açık tutmamak, kaçış yollarını engellememek, can yeleği konumunu ve giyme prosedürünü bilmek ve yaralı bakım partisi/head count'a destek vermek bu görevin kapsamındadır. Bu bölüm kamarotun emniyet ve acil durum görevlerini ele alır.`,
  sources: [
    "SOLAS Chapter III — muster ve drills",
    "Muster List / Station Bill",
    "SOLAS Chapter II-2 — yangın emniyeti ve kaçış yolları",
    "STCW A-VI/1 — temel emniyet eğitimi",
    "Şirket SMS — emergency response planı",
  ],
  chapters: [
    {
      heading: "1. Herkesin Bir Rolü Var",
      sections: [
        {
          subheading: "1.1 Kamarot da mürettebattır",
          paragraphs: [
            `Acil durumda kamarot "servis personeli" değil, görevli bir mürettebat üyesidir. Station Bill'de tanımlı rolünü bilir ve yerine getirir. Yaşam mahallini en iyi tanıyan kişilerden biri olarak, tahliye ve sayımda değerli bir rol üstlenebilir.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "Station Bill belirler",
              text: `Herkesin yangın, abandon ship ve diğer acil durumlardaki görevi Muster List / Station Bill'de yazılıdır. Kamarot kendi görevini ezbere bilmelidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Muster ve Temel Beceriler",
      sections: [
        {
          subheading: "2.1 Toplanma ve can yeleği",
          paragraphs: [
            `Alarm çaldığında kamarot, can yeleğiyle muster station'a gider ve görevini yapar. Can yeleğinin yerini ve doğru giyilmesini, alarm sinyallerini ve toplanma noktasını bilir. Bu temel beceriler drill'lerde tekrar edilerek pekiştirilir.`,
          ],
          bullets: [
            `Alarm sinyallerini tanı`,
            `Can yeleği konumu ve doğru giyme`,
            `Muster station ve görevi bil`,
            `Sayıma katıl, talimat bekle`,
          ],
        },
      ],
    },
    {
      heading: "3. Yaşam Mahalli Yangın Güvenliği",
      sections: [
        {
          subheading: "3.1 Fire door ve kaçış yolu",
          paragraphs: [
            `Yaşam mahallindeki yangın kapıları (fire door) kapalı tutulur; takozla açık bırakmak yangın/duman yayılmasına yol açar. Kaçış yolları her zaman açık ve engelsiz olmalıdır. Kamarot, çalışırken bu kurallara uyar ve ihlalleri (takozlanmış kapı, tıkalı yol) düzeltir/raporlar.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Fire door açık bırakılmaz",
              text: `Takozla açık tutulan bir yangın kapısı, gerçek bir yangında duman ve alevin yaşam mahalline yayılmasına yol açar. Kamarot bu yaygın ihlali asla yapmaz ve gördüğünde düzeltir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Acil Durumda Destek Rolleri",
      sections: [
        {
          subheading: "4.1 Yaralı bakımı ve head count",
          paragraphs: [
            `Kamarot, Station Bill'e göre yaralı bakım partisinde (stretcher, ilk yardım desteği) veya sayımda (head count) destek verebilir. Yaşam mahallini iyi tanıdığı için, kabin kontrolünde ve kimsenin geride kalmadığının doğrulanmasında değerli bir rol üstlenir.`,
          ],
          table: {
            caption: "Tipik kamarot acil durum destekleri",
            headers: ["Görev", "Katkı"],
            rows: [
              ["Head count", "Yaşam mahalli kontrolü, sayım"],
              ["Yaralı bakım partisi", "Sedye, ilk yardım desteği"],
              ["Tahliye desteği", "Kabin/koridor yönlendirme"],
            ],
          },
        },
      ],
    },
    {
      heading: "5. İlk Fark Eden Olabilmek",
      sections: [
        {
          subheading: "5.1 Erken uyarı",
          paragraphs: [
            `Kamarot yaşam mahallinde çok dolaştığı için bir yangın belirtisini (duman, koku, sıcaklık) ilk fark eden kişi olabilir. Böyle bir durumda derhal alarm verir ve prosedüre göre hareket eder. Erken fark ediş ve hızlı alarm, bir yangının büyümesini önler.`,
          ],
        },
      ],
    },
    {
      heading: "6. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "6.1 Emniyet görevleri kontrolü",
          bullets: [
            `Station Bill'deki acil durum görevim biliniyor mu?`,
            `Can yeleği konumu ve giyme prosedürü biliniyor mu?`,
            `Alarm sinyalleri ve muster station biliniyor mu?`,
            `Fire door'lar kapalı, kaçış yolları açık tutuluyor mu?`,
            `Head count/yaralı bakım destek rolü biliniyor mu?`,
            `Yangın belirtisinde derhal alarm verme refleksi var mı?`,
          ],
          paragraphs: [
            `Emniyet ve acil durum görevleri, kamarotun gemideki en önemli sorumluluklarından biridir; servis rolünün ötesinde, bir mürettebat üyesi olarak hayat kurtarmaya katkı verir. Görevini bilmek, yangın kapısı/kaçış yolu disiplinine uymak ve erken alarm refleksi; gerçek bir acilde fark yaratır.`,
          ],
        },
      ],
    },
  ],
};

export default content;
