import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "ECDIS (Elektronik Harita Sistemi)",
  sectionId: "nav-systems",
  topicIndex: 1,
  estimatedPages: 26,
  intro: `ECDIS (Electronic Chart Display and Information System), onaylı elektronik seyir haritalarını (ENC) konum, radar/AIS ve sensör verileriyle birleştirerek seyir planlama ve izlemeyi sağlayan, kağıt haritanın yasal eşdeğeri olan bir sistemdir. SOLAS, çoğu ticari gemi için ECDIS taşımayı zorunlu kılmıştır. Bu bölüm; ENC ve RNC farkını, sistem mimarisini ve sensör girdilerini, rota planlama/kontrol (safety contour, guard zone) işlevlerini, alarm yönetimini, güncelleme ve yedeklilik (backup) gereksinimlerini ve yaygın kullanım hatalarını derinlemesine ele alır.`,
  sources: [
    "SOLAS Ch. V Reg. 19.2.10 — ECDIS carriage",
    "IMO Res. MSC.232(82) — ECDIS performance standards",
    "IHO S-57 / S-63 — ENC data & encryption",
    "IMO MSC.1/Circ.1503 — ECDIS guidance",
    "Flag State / klas ECDIS yönergeleri",
  ],
  chapters: [
    {
      heading: "1. Haritalar ve Veri",
      sections: [
        {
          subheading: "1.1 ENC vs RNC",
          paragraphs: [
            `ENC (Electronic Navigational Chart), vektör tabanlı, katmanlı ve "akıllı" resmi haritadır; nesneler sorgulanabilir ve alarmlar üretebilir. RNC (Raster Navigational Chart) ise kağıt haritanın taranmış görüntüsüdür; zekası yoktur, yalnızca RCDS modunda ve uygun kağıt harita portföyüyle kullanılır. Tam ECDIS uyumu ENC gerektirir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "RCDS modu",
              text: `ENC mevcut olmayan bölgelerde RNC ile RCDS modunda çalışılabilir; ancak bu durumda uygun güncel kağıt harita portföyü bulundurmak zorunludur.`,
            },
          ],
        },
        {
          subheading: "1.2 Güncelleme ve şifreleme (S-63)",
          paragraphs: [
            `ENC'ler S-63 standardıyla şifrelenir; gemi, hücre izinleri (permits) ve haftalık güncellemeleri abonelik üzerinden alır. Güncellemelerin düzenli yüklenmesi yasal ve emniyet açısından zorunludur; güncel olmayan harita seyir kazası sorumluluğu doğurur.`,
          ],
        },
      ],
    },
    {
      heading: "2. Sistem Mimarisi ve Sensörler",
      sections: [
        {
          subheading: "2.1 Sensör girdileri",
          paragraphs: [
            `ECDIS; GNSS (konum), gyro (heading), log (hız), radar/ARPA (hedef), AIS, echo sounder (derinlik) ve rota dümen sistemlerinden veri alır. Konum kaynağının doğruluğu (örn. GPS arızası) doğrudan seyir emniyetini etkiler; sensör tutarsızlığında alarm verilir.`,
          ],
          bullets: [
            `Birincil ve yedek konum kaynağı (GPS x2 / DGPS)`,
            `Gyro arızasında manyetik pusula / yedek heading`,
            `Sensör verisi NMEA/seri ara yüzle aktarılır`,
          ],
        },
        {
          subheading: "2.2 Yedeklilik (backup)",
          paragraphs: [
            `ECDIS tek arıza noktası olmamalıdır. SOLAS, bağımsız güç beslemeli ikinci bir ECDIS (back-up ECDIS) veya uygun kağıt harita portföyü ister. Back-up sistem, ana ünite çökerse seyri kesintisiz sürdürebilmelidir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Tek besleme riski",
              text: `Her iki ECDIS de aynı güç hattından besleniyorsa bağımsız değildir. Back-up ECDIS ayrı güç kaynağına bağlı olmalıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Rota Planlama ve İzleme",
      sections: [
        {
          subheading: "3.1 Safety contour ve guard zone",
          paragraphs: [
            `Safety contour (emniyet konturu), geminin draftına göre güvenli derinlik sınırıdır; ECDIS bu konturu vurgular ve geçilmesinde alarm verir. Safety depth ve shallow/deep contour ayarları renk kodlamayı belirler. Guard zone / look-ahead, ileride emniyet konturu veya tehlike nesnesi varsa önceden uyarır.`,
          ],
          table: {
            headers: ["Parametre", "Anlamı", "Tipik ayar"],
            rows: [
              ["Safety depth", "Tehlikeli derinlik vurgusu", "Draft + UKC payı"],
              ["Safety contour", "Güvenli/tehlikeli su sınırı", "Draft + emniyet payı"],
              ["Look-ahead", "İleri tarama mesafesi", "Hıza göre dk/mil"],
              ["XTD", "Rota sapma limiti", "Geçit genişliğine göre"],
            ],
          },
        },
        {
          subheading: "3.2 Rota kontrolü (check)",
          paragraphs: [
            `Planlanan rota, ECDIS'in otomatik rota kontrol (route check) fonksiyonuyla emniyet parametrelerine göre taranır; konturu kesen, tehlike nesnesi içeren veya XTD dışına çıkan kısımlar işaretlenir. Bu kontrol köprüde gözle de doğrulanmalıdır.`,
          ],
        },
      ],
    },
    {
      heading: "4. Alarm Yönetimi, Hatalar ve Bakım",
      sections: [
        {
          subheading: "4.1 Alarm yorgunluğu",
          paragraphs: [
            `Yanlış ayarlanmış emniyet parametreleri çok sayıda gereksiz alarm üretir; bu "alarm yorgunluğu" gerçek tehlikenin gözden kaçmasına yol açar. Parametreler gemi draftı ve seyir bölgesine göre dikkatle ayarlanır, alarmlar keyfî susturulmaz.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Kaza dersi",
              text: `Birçok ECDIS-ilişkili karaya oturmada kök neden, yanlış safety contour ayarı veya alarmların görmezden gelinmesidir. Doğru kurulum hayati önemdedir.`,
            },
          ],
        },
        {
          subheading: "4.2 Arıza ve bakım tablosu",
          paragraphs: [`Yaygın sorunlar:`],
          table: {
            headers: ["Belirti", "Neden", "Müdahale"],
            rows: [
              ["Konum atlıyor/yok", "GNSS arızası/anten", "Yedek konum kaynağına geç, anten kontrolü"],
              ["Harita boş/eksik", "Permit/güncelleme eksik", "Hücre izni ve güncellemeyi yükle"],
              ["Sensör tutarsız alarmı", "Gyro/log verisi hatalı", "Sensör kalibrasyonu/kaynak seçimi"],
              ["Sistem donuyor", "Yazılım/donanım", "Yeniden başlat, back-up ECDIS'e geç"],
            ],
          },
        },
      ],
    },
  ],
};

export default content;
