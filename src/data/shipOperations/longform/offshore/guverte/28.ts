import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Bridge Mate sınıf mimarileri: JX/DP 0, DP 1, DP 2 ve DP 3",
  shipType: "offshore",
  dept: "guverte",
  opIndex: 28,
  estimatedPages: 22,
  intro: `Bridge Mate ailesinde sınıflar arasındaki fark, farklı bir teknoloji değil aynı modüllerin farklı sayıda kullanılmasıdır. Bu, sınıf yükseltmesini kolaylaştırır; ancak DPO açısından kritik soruyu da doğurur: gemideki donanım gerçekten hangi sınıfın yedekliliğini sağlıyor? Bu bölüm, JX'ten DP 3'e kadar her seviyenin donanım kompozisyonunu ve tek hata karşısındaki davranışını ele alır.`,
  sources: [
    "Marine Technologies Bridge Mate DP Brochure (MT-SAL-0004 v2.0)",
    "Marine Technologies Bridge Mate JX / DP 0 Brochure (MT-SAL-0005 v2.0)",
    "IMO MSC/Circ.645",
    "IMO MSC.1/Circ.1580",
    "IMCA M103",
  ],
  chapters: [
    {
      heading: "1. Sınıf Karşılaştırma Tablosu",
      lead: `Aşağıdaki tablo Bridge Mate broşüründe tanımlanan donanım kompozisyonunu özetler. Gemiye özel konfigürasyon her zaman teslim dokümanından doğrulanmalıdır.`,
      sections: [
        {
          subheading: "1.1 Donanım kompozisyonu",
          table: {
            headers: ["Seviye", "Kontrol bilgisayarı", "Operatör istasyonu", "IO ünitesi", "Ayrı kompartıman"],
            rows: [
              ["JX (joystick)", "—", "Compact veya konsol", "Dağıtık", "Hayır"],
              ["DP 0", "—", "Compact veya konsol", "Dağıtık", "Hayır"],
              ["DP 1", "1", "1", "Sensör/PRS/güç/itici için ayrı", "Hayır"],
              ["DP 2", "3 (majority voting)", "Tipik 2", "Her ekipman için ayrı", "Hayır"],
              ["DP 3", "3 (üçlü yedekli)", "En az 3", "Üç set", "Evet — yangına dayanıklı"],
            ],
            caption: "Bridge Mate seviyelerinin donanım kompozisyonu (MT-SAL-0004 / MT-SAL-0005)",
          },
        },
        {
          subheading: "1.2 Ortak mimari",
          paragraphs: [
            `JX ve DP 0 sistemleri, DP 1, DP 2 ve DP 3 sistemleriyle aynı dağıtık mimariye dayanır. Bu düzen, donanım bileşenlerinin pratik konumlara yerleştirilmesine imkân verir: her arayüz ünitesi (IO donanımı), bağlandığı itici, dümen, makine ve sensörlerin yakınına konularak kablolama ve montaj maliyeti düşürülür.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "Kaynak",
              text: `JX ve DP 0'ın DP 1/2/3 ile aynı dağıtık mimariyi paylaştığı, MT Bridge Mate JX / DP 0 broşüründe (MT-SAL-0005 v2.0) belirtilmiştir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Seviye Seviye İnceleme",
      sections: [
        {
          subheading: "2.1 JX ve DP 0",
          paragraphs: [
            `Her iki sistem de "compact operator station" veya "console" versiyonu olarak teslim edilebilir; konsol versiyonunun ihtiyaca göre birkaç farklı konfigürasyonu mevcuttur. JX sistemi DP 0'a kolayca yükseltilebilir, çünkü itici ve sensör kablolaması ile arayüzü her iki sistemde aynıdır.`,
          ],
          bullets: [
            `Kompakt operatör istasyonu → dar köprüüstü için uygun`,
            `Konsol versiyonu → çoklu konfigürasyon seçeneği`,
            `JX → DP 0 geçişinde kablolama değişmez`,
          ],
        },
        {
          subheading: "2.2 DP 1",
          paragraphs: [
            `Class 1 sistem mimarisi tümüyle dağıtık bir konsepte dayanır. DP 1 sisteminde tek bir kontrol bilgisayarı, tek bir operatör istasyonu ve sensörleri, konum referans sistemini, güç kaynağını ve iticileri arayüzleyen ayrı IO üniteleri bulunur.`,
            `Bridge Mate DP sistemine bağımsız bir joystick sistemi arayüzlenebilir. Bu, DP kontrol yolu kaybedildiğinde ayrı bir manevra imkânı sağladığı için operasyonel olarak önemlidir.`,
          ],
        },
        {
          subheading: "2.3 DP 2",
          paragraphs: [
            `DP 2 sistemi, DP 1 ile aynı modüllerden oluşur; ancak Class 2 kurallarına uymak üzere modül sayısı yedeklilik amacıyla artırılmıştır. DP 2 sisteminde üç kontrol bilgisayarı ve tipik olarak iki operatör istasyonu kullanılır.`,
            `Üç kontrol bilgisayarı kullanılması, bilgisayarlar arasında çoğunluk oylaması (majority voting) yapılmasını ve arızalanan bir bilgisayarın reddedilmesini mümkün kılar. IO ünitesi sayısı DP 2'de tipik olarak çok daha yüksektir: her sensör seti, her konum referans sistemi, güç kaynağı ve her itici için ayrı bir IO ünitesi bulunur.`,
            `Bu konfigürasyon, tek bir arızanın mevki kaybıyla sonuçlanmamasını güvence altına almak üzere tüm seviyelerde yedeklilik sağlamak için kullanılır. Tüm modüller yedekli, çift ağ üzerinden birbirine bağlanır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Majority voting ne demek?",
              text: `Üç kontrol bilgisayarı aynı hesabı paralel yapar. Biri diğerlerinden sapan bir çıktı üretirse çoğunluk kararı esas alınır ve sapan bilgisayar devre dışı bırakılır. Böylece hatalı bir bilgisayarın iticilere yanlış komut vermesi engellenir.`,
            },
          ],
        },
        {
          subheading: "2.4 DP 3",
          paragraphs: [
            `DP 3 sistemi, DP 2'ye kıyasla genişletilmiş bir donanım konfigürasyonuna sahiptir. Üçlü yedekli DP kontrolcü kullanılmaya devam eder ve en az üç operatör istasyonu gerekir. DP 2 konfigürasyonunda tipik olarak kullanılan çiftli sensör setinin aksine, bileşenleri arayüzlemek için üç IO ünitesi bulunur.`,
            `DP 3 sistemi ayrıca, Class 3 gereklerini karşılamak üzere bir kontrol bilgisayarının, bir operatör istasyonunun ve bir sensör IO ünitesinin yerleştirilmesi gereken, fiziksel olarak ayrı ve yangına dayanıklı bir kompartımana ihtiyaç duyar.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "Class 3 ayrışması",
              text: `Ayrı kompartıman gereği yalnızca bir yerleşim tercihi değil, sınıf koşuludur. Kompartımanın yangın ve su bütünlüğü bozulursa sınıfın öngördüğü ayrışma pratikte kaybolur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Sınıf Yükseltme Mantığı ve Doğrulama",
      sections: [
        {
          subheading: "3.1 Aynı modüller, farklı sayı",
          paragraphs: [
            `DP 1'den DP 2'ye yükseltme kolay bir süreçtir; çünkü her iki sistem tipinde de aynı donanım modülleri kullanılır, yalnızca kullanılan ünite sayısı farklıdır. Benzer biçimde bir DP 0 sistemi, artan yedeklilik için aynı donanım bileşenlerinden daha fazlası eklenerek üst sınıfa yükseltilebilir.`,
          ],
          bullets: [
            `JX → DP 0: kablolama ve arayüz aynı`,
            `DP 0 → üst sınıf: aynı donanımdan ekleme`,
            `DP 1 → DP 2: modül tipi değil, sayısı değişir`,
          ],
        },
        {
          subheading: "3.2 Kâğıttaki sınıf ile sahadaki sınıf",
          callouts: [
            {
              type: "warning",
              title: "Kapasite ≠ mevcut yedeklilik",
              text: `Donanımın DP 2 kapasitesinde olması, konfigürasyon ve bakım durumu doğrulanmadan DP 2 yedekliliğinin fiilen mevcut olduğu anlamına gelmez. Devre dışı bir kontrol bilgisayarı, bakımdaki bir IO ünitesi veya tek kola düşmüş bir ağ, sistemi ilan edilen sınıfın altına indirir.`,
            },
          ],
          bullets: [
            `Üç kontrol bilgisayarının üçü de online mı?`,
            `Ağın her iki kolu da sağlam mı?`,
            `Bakımda olan IO ünitesi var mı, hangi ekipmanı etkiliyor?`,
            `Son proving/annual trials bulguları kapalı mı?`,
            `Mevcut durum ASOG ve CAMO/TAM ile uyumlu mu?`,
          ],
        },
        {
          subheading: "3.3 Görev kabulüyle ilişkisi",
          paragraphs: [
            `Sınıf doğrulaması bir belge işlemi değil, görev kabul kararının parçasıdır. Gemi ilan edilen sınıfın gereklerini o an sağlamıyorsa, kısıt ASOG'a işlenir ve görev kapsamı buna göre daraltılır. Task Appropriate Mode (TAM) yalnızca onaylı ve risk temelli bir süreçle kullanılabilir; eksik yedekliliği kendiliğinden kabul edilebilir hale getirmez.`,
          ],
        },
      ],
    },
  ],
};

export default content;
