import type { ShipSystemLongForm } from "../types";

const content: ShipSystemLongForm = {
  title: "Tank Temizleme ve Slop / Eductor Sistemi",
  sectionId: "cargo-systems",
  topicIndex: 8,
  estimatedPages: 23,
  intro: `Tank temizleme ve slop sistemi, tankerlerde kargo değişimi, muayene veya gas-free öncesi tankları temizleyen ve oluşan atık karışımı (slop) yöneten sistemdir; MARPOL Annex I'in load-on-top, slop tankı ve denize deşarj kriterleriyle doğrudan ilişkilidir. Eductor (jet pompası), tank dibindeki sıvıyı/yıkama suyunu hareketli parça olmadan sıyırarak slop tankına alır. Bu bölüm; tank temizleme yöntemlerini (su yıkama, COW, kimyasal), eductor çalışma prensibini, slop tankı ve load-on-top'ı, MARPOL deşarj kriterleri ve ODME'yi, gas-freeing ve emniyeti ve bakım/arızayı ele alır.`,
  sources: [
    "MARPOL Annex I — slop, load-on-top, ODME",
    "ISGOTT 6th edition — tank cleaning & gas-freeing",
    "IMO Crude Oil Washing / tank cleaning manuals",
    "Eductor üretici el kitapları",
  ],
  chapters: [
    {
      heading: "1. Tank Temizleme Yöntemleri",
      sections: [
        {
          subheading: "1.1 Su yıkama, COW, kimyasal",
          paragraphs: [
            `Tank temizleme; deniz suyu (soğuk/sıcak) yıkama, ham petrolle yıkama (COW) ve dirençli kalıntılar için kimyasal temizleme ile yapılır. Yöntem; kalan kargo, sonraki yük (kompatibilite) ve gas-free hedefine göre seçilir. Sabit/portatif yıkama makineleri tüm yüzeyi tarar.`,
          ],
          bullets: [
            `Su yıkama: genel temizlik`,
            `COW: ham petrolde tortu azaltma`,
            `Kimyasal: dirençli kalıntı/ürün değişimi`,
          ],
        },
      ],
    },
    {
      heading: "2. Eductor Prensibi",
      sections: [
        {
          subheading: "2.1 Jet pompa mantığı",
          paragraphs: [
            `Eductor, hareketli parçası olmayan bir jet pompasıdır: yüksek hızlı tahrik akışı (kargo/su) bir lülenin (nozzle) içinden geçerken venturi etkisiyle düşük basınç yaratır ve tank dibindeki sıvıyı emer. Stripping/drenaj için idealdir; tıkanma ve aşınmaya dirençlidir, ancak tahrik akışı debisine bağımlıdır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Neden eductor?",
              text: `Hareketli parça olmadığı için aşınma azdır ve katı/çamur içeren sıvıyı tıkanmadan sıyırabilir; tank dibi drenajında pistonlu stripping pompasına alternatiftir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Slop ve MARPOL",
      sections: [
        {
          subheading: "3.1 Slop tankı ve load-on-top",
          paragraphs: [
            `Yıkama suyu ve kalıntı slop tankında toplanır; burada yağ üstte, su altta ayrışır (settling). Load-on-top yönteminde ayrışan su izin verilen kriterlerle denize verilir, yağlı kısım üzerine yeni kargo yüklenir; böylece atık ve kirlilik azalır.`,
          ],
        },
        {
          subheading: "3.2 Deşarj kriterleri ve ODME",
          paragraphs: [
            `MARPOL Annex I, yağlı suyun denize deşarjını sıkı kriterlere bağlar (örn. ≤30 L/deniz mili anlık yağ oranı, toplam limit, kıyıdan mesafe, gemi yolda). ODME (Oil Discharge Monitoring Equipment) yağ içeriğini sürekli ölçer; kriter aşılırsa deşarjı otomatik durdurur ve kayıt tutar (Oil Record Book).`,
          ],
          table: {
            headers: ["Kriter", "MARPOL Annex I (tanker)"],
            rows: [
              ["Anlık yağ oranı", "≤ 30 L / deniz mili"],
              ["Toplam (mevcut tanker)", "Kargonun ≤ 1/30.000'i"],
              ["Mesafe", "Kıyıdan > 50 deniz mili"],
              ["Durum", "Gemi yolda, ODME çalışır"],
            ],
            caption: "Yaklaşık değerler; güncel MARPOL metni esastır",
          },
          callouts: [
            {
              type: "regulation",
              title: "ODME ve Oil Record Book",
              text: `Yağlı su deşarjı yalnızca ODME çalışırken ve MARPOL kriterleri sağlanırken yapılır; tüm işlemler Oil Record Book'a doğru kaydedilir. Aksi ciddi yasal yaptırım doğurur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Gas-Freeing, Bakım ve Arıza",
      sections: [
        {
          subheading: "4.1 Gas-freeing emniyeti",
          paragraphs: [
            `Tank içine giriş öncesi gas-freeing (havalandırma) ile hidrokarbon ve toksik gaz seviyesi güvenli, oksijen ~%21 yapılır; enclosed space entry prosedürü, gaz ölçümü ve izin (permit) uygulanır. Inert tanktan doğrudan hava almaya geçiş (purging) statik riski yönetilerek yapılır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Kapalı mahal girişi",
              text: `Temizlenmiş bile olsa tank kapalı mahaldir; gaz ölçümü, havalandırma, permit ve gözcü olmadan asla girilmez. Çoğu tanker ölümü kapalı mahal kaynaklıdır.`,
            },
          ],
        },
        {
          subheading: "4.2 Bakım ve arıza tablosu",
          paragraphs: [
            `Bakım; eductor nozul/aşınma, yıkama makinesi, ODME kalibrasyonu ve slop tank seviye/interface ölçüm kontrolünü kapsar.`,
          ],
          table: {
            headers: ["Belirti", "Neden", "Müdahale"],
            rows: [
              ["Eductor emmiyor", "Tahrik debisi düşük/tıkanma", "Tahrik basıncı + nozul kontrol"],
              ["ODME durduruyor/şüpheli", "Kalibrasyon/sensör", "ODME kalibrasyon/servis"],
              ["Slop ayrışmıyor", "Yetersiz settling süresi", "Bekleme süresi/ısıtma"],
              ["Yıkama yetersiz", "Makine/basınç", "Makine ve hat kontrolü"],
            ],
          },
        },
      ],
    },
  ],
};

export default content;
