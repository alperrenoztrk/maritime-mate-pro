import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Sarf malzeme stok takibi",
  roleSlug: "kamarot",
  taskIndex: 4,
  estimatedPages: 22,
  intro: `Yaşam mahallinin hijyeni ve konforu, doğru sarf malzemenin doğru zamanda hazır olmasına bağlıdır; biten bir dezenfektan veya tükenen kâğıt ürünü, hem hijyeni hem mürettebat memnuniyetini doğrudan etkiler. Kamarot; temizlik malzemeleri, kâğıt ürünleri, sabun, deterjan ve diğer sarf malzemelerin stok kontrolünü yapar, ihtiyaç listelerini hazırlar ve ikmal taleplerini iletir. Bu bölüm sarf malzeme stok takibini ele alır.`,
  sources: [
    "MLC 2006 — yaşam koşulları ve hijyen standartları",
    "Şirket provisioning/stores prosedürleri",
    "Kimyasal SDS (Safety Data Sheet) bilgileri",
    "Stok/envanter yönetim pratiği",
    "WHO ship sanitation kılavuzları",
  ],
  chapters: [
    {
      heading: "1. Stok Takibinin Önemi",
      sections: [
        {
          subheading: "1.1 Hijyen ve konforun temeli",
          paragraphs: [
            `Sarf malzeme, hijyenin görünmeyen lojistiğidir. Kamarot, malzemelerin tükenmeden ikmal edilmesini sağlayarak yaşam mahallinin sürekli temiz ve konforlu kalmasını güvence altına alır. Zamanında talep edilmeyen bir malzeme, seyir boyunca eksik kalabilir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Tüketim hızını bil",
              text: `Her malzemenin haftalık tüketim hızını bilmek, ne zaman ve ne kadar ikmal gerektiğini önceden gösterir. Liman penceresini kaçırmamak için stok minimuma düşmeden talep edilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Takip Edilen Malzemeler",
      sections: [
        {
          subheading: "2.1 Başlıca kalemler",
          paragraphs: [
            `Kamarot; temizlik kimyasalları (deterjan, dezenfektan, cam/yüzey temizleyici), kâğıt ürünleri (tuvalet kâğıdı, kâğıt havlu), sabun/el dezenfektanı, çamaşır malzemeleri ve genel yaşam mahalli sarflarını izler. Her kalemin mevcut stoğu (ROB) ve tüketim hızı kayıt altına alınır.`,
          ],
          table: {
            caption: "Sarf malzeme kategorileri",
            headers: ["Kategori", "Örnek"],
            rows: [
              ["Temizlik kimyasalı", "Deterjan, dezenfektan, yüzey temizleyici"],
              ["Kâğıt ürünleri", "Tuvalet kâğıdı, kâğıt havlu"],
              ["Kişisel hijyen", "Sabun, el dezenfektanı"],
              ["Çamaşır", "Deterjan, ağartıcı, yumuşatıcı"],
            ],
          },
        },
      ],
    },
    {
      heading: "3. İhtiyaç Listesi ve Talep",
      sections: [
        {
          subheading: "3.1 Requisition hazırlığı",
          paragraphs: [
            `Stok minimuma yaklaşan kalemler için kamarot, ihtiyaç listesi (requisition) hazırlar ve sorumlu zabite (genelde Birinci Zabit/Kaptan) iletir. Liste; kalem, mevcut stok, ihtiyaç miktarı ve aciliyet içerir. Doğru tahmin, hem eksikliği hem gereksiz fazla stoğu önler.`,
          ],
          bullets: [
            `Minimum altına düşen kalemleri belirle`,
            `Mevcut stok ve ihtiyaç miktarını yaz`,
            `Aciliyeti belirt`,
            `Sorumlu zabite zamanında ilet`,
          ],
        },
      ],
    },
    {
      heading: "4. Depolama ve Güvenlik",
      sections: [
        {
          subheading: "4.1 Kimyasal depolama",
          paragraphs: [
            `Temizlik kimyasalları, SDS bilgisine uygun depolanır; uyumsuz kimyasallar (asit-baz, oksidanlar) ayrı tutulur ve etiketli kaplarda saklanır. Kamarot, depolama güvenliğini ve etiket bütünlüğünü gözetir; yanlış karışım tehlikeli reaksiyon yaratabilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Uyumsuz kimyasalları ayır",
              text: `Ağartıcı (hipoklorit) ile asitli temizleyicinin karışması zehirli klor gazı açığa çıkarır. Kimyasallar SDS'e göre ayrı, etiketli ve doğru depolanır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Kayıt",
      sections: [
        {
          subheading: "5.1 Envanter kaydı",
          paragraphs: [
            `Kamarot, stok hareketlerini (ikmal, tüketim) kaydeder. Bu kayıt, tüketim trendini gösterir ve bir sonraki ikmal planını kolaylaştırır. Düzenli envanter, hem israfı hem eksikliği önler.`,
          ],
        },
      ],
    },
    {
      heading: "6. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "6.1 Stok takibi kontrolü",
          bullets: [
            `Tüm sarf kalemlerinin stoğu (ROB) biliniyor mu?`,
            `Tüketim hızı izleniyor mu?`,
            `Minimum altına düşenler için requisition hazırlandı mı?`,
            `İhtiyaç listesi zamanında zabite iletildi mi?`,
            `Kimyasallar SDS'e göre ayrı ve etiketli depolanıyor mu?`,
            `Stok hareketleri kayıt altında mı?`,
          ],
          paragraphs: [
            `Sarf malzeme stok takibi, kamarotun yaşam mahalli hijyenini kesintisiz sürdürmesinin görünmeyen lojistiğidir. Tüketimi bilmek, zamanında talep etmek ve kimyasalları güvenli depolamak; hem hijyeni hem mürettebat konforunu hem de güvenliği birlikte korur.`,
          ],
        },
      ],
    },
  ],
};

export default content;
