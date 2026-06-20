import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "AIS (Otomatik Tanımlama Sistemi)",
  sectionId: "nav-systems",
  topicIndex: 2,
  estimatedPages: 22,
  intro: `AIS (Automatic Identification System), gemilerin kimlik, konum, rota ve hız bilgilerini VHF üzerinden otomatik yayınlayıp diğer gemiler ve kıyı istasyonlarıyla paylaştığı bir transponder sistemidir. Çatışmayı önlemeye yardımcı olur, trafik yönetimini (VTS) destekler ve arama-kurtarmaya katkı sağlar; ancak radarın yerini tutmaz. Bu bölüm; AIS sınıflarını (A/B), yayınlanan veri tiplerini (statik/dinamik/sefer), VHF kanal ve SOTDMA erişimini, kullanım sınırlarını ve hata kaynaklarını, SOLAS donatımını ve bakım/arızayı ele alır.`,
  sources: [
    "SOLAS Ch. V Reg. 19.2.4 — AIS carriage",
    "IMO Res. MSC.74(69) Annex 3 — AIS standards",
    "ITU-R M.1371 — AIS technical characteristics",
    "IMO Res. A.1106(29) — AIS kullanım yönergesi",
    "COLREG — çatışmayı önleme bağlamı",
  ],
  chapters: [
    {
      heading: "1. AIS Temelleri",
      sections: [
        {
          subheading: "1.1 Sınıf A ve Sınıf B",
          paragraphs: [
            `Sınıf A AIS, SOLAS gemilerinde zorunludur; yüksek güçle (12.5 W) ve SOTDMA erişimiyle daha sık yayın yapar. Sınıf B daha düşük güçlü, daha seyrek yayın yapan, ticari olmayan/küçük tekneler içindir. Sınıf A, Sınıf B'yi görür ama önceliği vardır.`,
          ],
          table: {
            headers: ["Özellik", "Sınıf A", "Sınıf B"],
            rows: [
              ["Güç", "12.5 W", "2 W"],
              ["Erişim", "SOTDMA", "CSTDMA/SOTDMA"],
              ["Yayın sıklığı", "2-10 sn (harekete göre)", "30 sn"],
              ["Zorunluluk", "SOLAS gemileri", "İsteğe bağlı/küçük tekne"],
            ],
          },
        },
        {
          subheading: "1.2 Yayınlanan veri tipleri",
          paragraphs: [
            `AIS üç tür bilgi yayınlar: statik (IMO no, çağrı işareti, isim, boyut), dinamik (konum, COG, SOG, heading, ROT) ve sefer (draft, kargo tipi, varış limanı, ETA). Statik ve sefer verisi manuel girilir; hatalı giriş yanlış bilgi yayar.`,
          ],
        },
      ],
    },
    {
      heading: "2. VHF Erişim ve İletim",
      sections: [
        {
          subheading: "2.1 SOTDMA ve kanal organizasyonu",
          paragraphs: [
            `AIS, iki özel VHF kanalında (AIS 1 / AIS 2) çalışır ve zamanı 2250 slot/dk dilimine böler. SOTDMA (Self-Organizing Time Division Multiple Access) ile her istasyon boş slot seçerek çakışmayı önler; ağ kendi kendine örgütlenir, merkezi kontrol gerektirmez.`,
          ],
          bullets: [
            `Yayın sıklığı gemi hızına ve dönüşüne bağlı artar`,
            `Demirde/yavaşta daha seyrek, manevra/hızda daha sık`,
            `Kıyı istasyonu ve VTS yayınları okuyabilir/atayabilir`,
          ],
        },
      ],
    },
    {
      heading: "3. Kullanım Sınırları ve Hatalar",
      sections: [
        {
          subheading: "3.1 AIS radarın yerini tutmaz",
          paragraphs: [
            `AIS yalnızca AIS taşıyan ve cihazı açık hedefleri gösterir; AIS taşımayan tekne, kara veya nesneleri görmez. Bu nedenle çatışmayı önlemede birincil araç radardır; AIS tamamlayıcıdır. AIS hedefine dayalı manevra yapmadan önce radar/görsel doğrulama yapılmalıdır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Yanlış veri riski",
              text: `Manuel girilen statik/sefer verisi (örn. yanlış draft, yanlış varış) ve kapatılmış/manipüle edilmiş AIS yaygındır. Görüntülenen bilgiye eleştirel yaklaşılmalıdır.`,
            },
          ],
        },
        {
          subheading: "3.2 Çatışmayı önlemede AIS",
          paragraphs: [
            `AIS, hedefin gerçek rota/hızını verdiği için CPA/TCPA değerlendirmesini destekler; ancak AIS verisi gecikmeli veya hatalı olabilir. COLREG manevra kararları radar/ARPA ile teyit edilerek alınır.`,
          ],
        },
      ],
    },
    {
      heading: "4. Donatım, Bakım ve Arıza",
      sections: [
        {
          subheading: "4.1 SOLAS ve güvenlik",
          paragraphs: [
            `300 GT üstü uluslararası sefer ve 500 GT üstü tüm gemiler ile yolcu gemileri AIS taşır. AIS sürekli açık tutulur; ancak kaptanın emniyet gerekçesiyle (örn. korsanlık bölgesi) kapatma yetkisi vardır ve bu kayda geçirilir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "Sürekli çalışma",
              text: `AIS, bilgi koruması uluslararası anlaşma/kural gereği istisna teşkil etmedikçe daima çalışır durumda tutulmalıdır.`,
            },
          ],
        },
        {
          subheading: "4.2 Arıza tablosu",
          paragraphs: [`Yaygın sorunlar:`],
          table: {
            headers: ["Belirti", "Neden", "Müdahale"],
            rows: [
              ["Kendi gemi yayınlamıyor", "VHF anten/güç, GPS yok", "Anten ve dahili GPS kontrolü"],
              ["Hedef görünmüyor", "Hedefte AIS yok/kapalı", "Radar/görsel ile teyit"],
              ["Yanlış konum/heading", "GPS/gyro besleme hatası", "Sensör besleme kontrolü"],
              ["Yanlış statik veri", "Hatalı manuel giriş", "Sefer/statik verileri güncelle"],
            ],
          },
        },
      ],
    },
  ],
};

export default content;
