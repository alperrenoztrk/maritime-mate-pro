import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Bridge Mate DP'de pozisyon referansı: RadaScan, CyScan ve DGPS",
  shipType: "offshore",
  dept: "guverte",
  opIndex: 30,
  estimatedPages: 20,
  intro: `DP sistemi ne kadar yedekli olursa olsun, kendisine verilen konum bilgisinden daha iyi çalışamaz. Marine Technologies, Bridge Mate DP sistemleriyle uyumlu iki lokal konum referans sensörü sunar: radar tabanlı RadaScan ve lazer tabanlı CyScan. Bu bölüm, bu sensörlerin uydu tabanlı referanslarla nasıl birlikte kullanıldığını ve ortak arıza riskinin nasıl yönetildiğini ele alır.`,
  sources: [
    "marine-technologies.com — RadaScan ve CyScan ürün bilgileri",
    "Marine Technologies Bridge Mate DP Brochure (MT-SAL-0004 v2.0)",
    "IMCA M103",
    "IMCA M141 (Guidelines for DP Position Reference Systems)",
    "Vessel DP Operations Manual",
  ],
  chapters: [
    {
      heading: "1. Referans Tipleri ve Bridge Mate Portföyü",
      lead: `DP'de referanslar mutlak (uydu tabanlı) ve göreceli (lokal hedefe göre) olarak ikiye ayrılır. Sağlıklı bir kurulum ikisini birlikte kullanır.`,
      sections: [
        {
          subheading: "1.1 Sensör karşılaştırması",
          table: {
            headers: ["Sensör", "Teknoloji", "Referans tipi", "Tipik kullanım"],
            rows: [
              ["DGPS / GNSS", "Uydu + düzeltme servisi", "Mutlak", "Açık deniz, genel mevki"],
              ["RadaScan", "Radar (transponder hedefli)", "Göreceli", "Yakın mesafe, platform yanı"],
              ["CyScan", "Lazer (reflektör hedefli)", "Göreceli", "Birincil veya yedek lokal"],
              ["Hydroacoustic", "Sualtı akustik", "Göreceli", "Derin su, ROV/dalış"],
              ["Taut-wire", "Mekanik tel", "Göreceli", "Sığ su, sabit mevki"],
            ],
          },
        },
        {
          subheading: "1.2 RadaScan",
          paragraphs: [
            `RadaScan, dinamik konumlandırma ve diğer gemi kontrol uygulamaları için radar teknolojisi kullanan gelişmiş bir konum referans sensörüdür. 10 m ile 1000 m arasında yüksek hassasiyetli bir aralıkta çalışır ve yakın mesafe operasyonlarda GPS'i tamamlar; geleneksel lazer sistemlerinin yerini alabilir.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "Kaynak",
              text: `RadaScan'in radar tabanlı olduğu, 10 m–1000 m yüksek hassasiyet aralığı ve GPS'i yakın mesafede tamamlaması marine-technologies.com ürün bilgilerinde belirtilmiştir.`,
            },
            {
              type: "tip",
              title: "Radarın hava avantajı",
              text: `Radar tabanlı ölçüm, sis, yağmur ve pus gibi görüş şartlarından lazer tabanlı sistemlere kıyasla genellikle daha az etkilenir. Bu, kötü hava penceresinde lokal referans sürekliliği açısından operasyonel bir avantajdır.`,
            },
          ],
        },
        {
          subheading: "1.3 CyScan",
          paragraphs: [
            `CyScan, deniz aracı kontrol uygulamaları için özel olarak tasarlanmış yüksek performanslı bir lokal konum referans sensörüdür. Birincil veya yedek sensör olarak çalışır ve tüm Marine Technologies DP sistemleriyle uyumludur.`,
          ],
          bullets: [
            `Hedef reflektörlerin görüş hattı sürekli açık olmalı`,
            `Montaj geometrisi ve hedef yüksekliği devreye almada doğrulanır`,
            `Birincil ya da yedek rolü görev planında önceden belirlenir`,
          ],
        },
      ],
    },
    {
      heading: "2. Seçim, Devreye Alma ve İzleme",
      sections: [
        {
          subheading: "2.1 Devreye alma sırası",
          paragraphs: [
            `Genel DP uygulamasında her referans, DP modeline dahil edilmeden önce bağımsız olarak gözlenir ve mevcut referanslarla karşılaştırılır. Sapma büyüyen bir referans doğrudan devre dışı bırakılmadan önce nedeni araştırılır; çünkü sapan sensör bazen doğru olan, diğerleri ise ortak bir hatayı paylaşan taraf olabilir.`,
          ],
          bullets: [
            `Yeni referansı önce izleme modunda gözle`,
            `Mevcut referanslarla farkı ve eğilimi karşılaştır`,
            `Kabul edilebilir sapma içindeyse modele dahil et`,
            `Ağırlıklandırmanın beklendiği gibi oluştuğunu doğrula`,
            `Devreye alma ve çıkarma işlemlerini loga işle`,
          ],
        },
        {
          subheading: "2.2 500 m bölgesi ve yaklaşımda referans",
          paragraphs: [
            `Offshore tesise yaklaşımda DP genellikle bölge dışında kurulur ve sistem stabilize edilir; son yaklaşma safhasında ikinci bağımsız referans devreye alınır. RadaScan ve CyScan gibi lokal referanslar bu safhada, hedefe olan göreceli mevkinin doğruluğu açısından belirleyici olur.`,
          ],
        },
      ],
    },
    {
      heading: "3. Ortak Arıza Riski",
      lead: `İki referansın sayıca iki olması, yedeklilik anlamına gelmez. Belirleyici olan bağımsızlıklarıdır.`,
      sections: [
        {
          subheading: "3.1 Gizli ortak nokta",
          callouts: [
            {
              type: "warning",
              title: "Sayı değil bağımsızlık",
              text: `Aynı uydu takımyıldızına, aynı düzeltme (correction) servisine veya aynı hedef yapıya bağlı referanslar tek başına yedeklilik sayılmaz. İki DGPS aynı düzeltme servisini kullanıyorsa, servis kesildiğinde ikisi birden kaybedilir.`,
            },
          ],
          bullets: [
            `Aynı düzeltme servisi → ortak arıza`,
            `Aynı platform reflektör grubu → ortak gölgelenme`,
            `Aynı IO ünitesine bağlı iki sensör → ortak elektriksel kayıp`,
            `Aynı anten platformu → ortak titreşim/blokaj`,
          ],
        },
        {
          subheading: "3.2 Tipik kayıp senaryoları",
          paragraphs: [
            `Lokal referanslarda en sık görülen kayıp nedeni hedefin görünmez hale gelmesidir: reflektör veya transponder gölgelenmesi, gemi hareketiyle açının kapanması ya da araya giren bir yapı/vinç bomu. Uydu tabanlı referanslarda ise iyonosferik sintilasyon, jamming ve spoofing aynı anda tüm uydu tabanlı kaynakları etkileyebilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Tek referansla devam etme",
              text: `Kritik faaliyet (dalgıç suda, yük askıda, riser bağlı) tek referansla sürdürülmemelidir. Referans sayısı kabul edilebilir seviyenin altına düşerse ASOG'un ilgili durumu tetiklenir ve önceden tanımlı tepki uygulanır.`,
            },
          ],
        },
        {
          subheading: "3.3 Kontrol listesi",
          bullets: [
            `Gemide kurulu PRS seti ve tipleri çıkarıldı mı?`,
            `RadaScan çalışma aralığı görev geometrisine uygun mu?`,
            `CyScan hedef görüş hattı ve montaj geometrisi doğrulandı mı?`,
            `Referanslar arasında ortak arıza kaynağı analiz edildi mi?`,
            `Karşılaştırma logu tutuluyor ve eğilim izleniyor mu?`,
            `Referans kaybında ASOG tepkisi ekipçe biliniyor mu?`,
          ],
        },
      ],
    },
  ],
};

export default content;
