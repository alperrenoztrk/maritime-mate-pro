import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Bridge Mate IBS entegrasyonu: conning, ECDIS, autopilot ve track control",
  shipType: "offshore",
  dept: "guverte",
  opIndex: 31,
  estimatedPages: 20,
  intro: `Modern offshore köprüüstünde DP, tek başına duran bir kutu değildir; radar, ECDIS, conning ve autopilot ile aynı platformu paylaşır. Marine Technologies'in Bridge Mate Integrated Bridge System'i bu bütünleşmeyi Multi-Function Workstation (MFW) kavramı üzerine kurar. Bu bölüm, entegrasyonun sağladığı avantajları ve DP gözetimi açısından doğurduğu yeni riskleri ele alır.`,
  sources: [
    "Marine Technologies Bridge Mate IBS Brochure (MT-SAL-0001 v1.0)",
    "marine-technologies.com — IBS ve autopilot bilgileri",
    "DNV NAUT-AW sınıf notasyonu",
    "SOLAS V/15 (Bridge design, ergonomics)",
    "IMCA M103",
  ],
  chapters: [
    {
      heading: "1. Multi-Function Workstation Kavramı",
      lead: `IBS'in temel yapı taşı, her biri tüm uygulamaları çalıştırabilen çok işlevli iş istasyonudur.`,
      sections: [
        {
          subheading: "1.1 MFW nedir",
          paragraphs: [
            `Her Multi-Function Workstation, dokunmatik bir ekran ve fan gerektirmediği için sessiz çalışan operatör bilgisayarlarından oluşur. Her MFW tüm uygulamaları paralel olarak çalıştırır ve hepsi yedekli ağlara bağlıdır; böylece tek nokta arızası (single-point-of-failure) endişesi ortadan kaldırılır.`,
            `Klavye, baş seçici (heading selector) ve joystick gibi operatör cihazları, sistemin çalıştırılması için uygun şekilde mevcuttur. Her iş istasyonu istenen an istenen uygulama için seçilebilir.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "Kaynak",
              text: `MFW'nin fansız yapısı, uygulamaları paralel çalıştırması ve yedekli ağ bağlantısıyla tek nokta arızasının elenmesi MT Bridge Mate IBS broşüründe (MT-SAL-0001 v1.0) belirtilmiştir.`,
            },
          ],
        },
        {
          subheading: "1.2 Uygulama kapsamı",
          table: {
            headers: ["Uygulama", "İşlev", "DP ile ilişkisi"],
            rows: [
              ["Radar / ARPA", "Trafik ve hedef izleme", "Yaklaşım ve SIMOPS farkındalığı"],
              ["ECDIS", "Elektronik harita ve rota", "Saha, bölge ve engel bilgisi"],
              ["Conning", "Toplu gemi durumu göstergesi", "İtici, baş, hız, çevre okuması"],
              ["Autopilot", "Otomatik dümen", "Transit; DP'ye geçişte devredilir"],
              ["Track control", "Otomatik rota tutma", "Düşük hızlı track görevlerine köprü"],
              ["Rota planlama", "Akıllı rota hazırlama", "Saha yaklaşım planı"],
            ],
          },
        },
        {
          subheading: "1.3 Sınıf onayı ve entegrasyon",
          paragraphs: [
            `MT'nin Bridge Mate Integrated Bridge System'i, sektördeki en kapsamlı köprüüstü sınıf notasyonu olan DNV NAUT-AW tip onayına sahiptir. Bridge Mate Autopilot ise MT'nin conning ekranı ve ECDIS'i ile birlikte kullanıldığında Wheel Mark onayı ve track-control-steering sertifikasyonu elde eder.`,
            `IBS ayrıca güç yönetim sistemi, otomasyon, alarm sistemi, seyir ve arama fenerleri, korna ve silecekler gibi gemi sistemleriyle entegre olabilir.`,
          ],
        },
      ],
    },
    {
      heading: "2. Entegrasyonun Operasyonel Avantajları",
      sections: [
        {
          subheading: "2.1 Uyumlaştırılmış arayüz",
          paragraphs: [
            `Köprüüstü genelinde uyumlaştırılmış (harmonized) HMI, aynı işlemin her istasyonda aynı biçimde yapılması anlamına gelir. Bu, vardiya değişiminde ve stres altında hata oranını düşüren önemli bir insan faktörü avantajıdır. Merkezi dimming ise gece görüşünün tek noktadan korunmasını sağlar.`,
          ],
          bullets: [
            `Uygulama yedekliliği yüksek derecede`,
            `Sensör yedekliliği ve yedekli ağ ile veri bütünlüğü`,
            `Tek kurulumla tüm MFW'lerde elektronik harita kullanılabilirliği`,
            `Gemi haberleşmesi üzerinden harita, düzeltme ve hava tahmini siparişi`,
          ],
        },
        {
          subheading: "2.2 Captain mode",
          paragraphs: [
            `Captain mode aracı, birden fazla kaptan için transit, yanaşma ve DP operasyonları gibi safhalara özel kişisel tercihlerin saklanmasına imkân verir. Doğru profilin doğru safhada yüklendiğinin kontrol edilmesi vardiya rutininin parçası olmalıdır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Profil değişimi ekranı değiştirir",
              text: `Kaptan profili değişimi ekran düzenini değiştirdiğinde, alışılmış konumda beklenen kritik DP göstergeleri başka yere kayabilir veya kapanabilir. Profil yüklendikten sonra DP gözetim penceresinin yerinde olduğu doğrulanmalıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Entegrasyonun Getirdiği Riskler",
      lead: `Aynı ekranda çok iş yapabilmek, dikkatin bölünmesi riskini de beraberinde getirir.`,
      sections: [
        {
          subheading: "3.1 Dikkat ve görev ayrımı",
          callouts: [
            {
              type: "warning",
              title: "DP arka plana düşebilir",
              text: `Tek ekranda çok uygulama çalıştırılabilmesi, DP gözetiminin görsel olarak arka plana düşmesine yol açabilir. Rota planlama veya harita güncelleme gibi işler, DP gözetiminin kesintiye uğramayacağı biçimde ve tercihen ayrı bir istasyonda yapılmalıdır.`,
            },
            {
              type: "warning",
              title: "One-man bridge ≠ one-man DP",
              text: `One-man bridge operation onayı, DP operasyonu için otomatik olarak geçerli değildir. DP vardiyasının personel gereksinimi görev riskine, IMCA M117 ve gemiye özel DP Operations Manual'e göre belirlenir.`,
            },
          ],
        },
        {
          subheading: "3.2 Mod geçişlerinde kontrol sınırı",
          paragraphs: [
            `Track control ve otomatik rota tutmadan DP moduna geçişte kontrolün hangi noktada devredildiği net tanımlanmalıdır. Genel DP uygulamasında bu geçiş, hız yeterince düşürüldükten ve gemi kararlı hale geldikten sonra, kademeli olarak yapılır.`,
          ],
          bullets: [
            `Geçiş noktası ve hız eşiği yaklaşım planında yazılı olmalı`,
            `Devir anında komuttaki istasyon teyit edilmeli`,
            `Geçiş sırasında ikinci bir kişi gözetim yapmalı`,
            `Geçiş saati ve modu DP loguna işlenmeli`,
          ],
        },
        {
          subheading: "3.3 Alarm yönetimi",
          paragraphs: [
            `IBS'in alarm sistemiyle entegrasyonunda, DP ile ilgili alarmların köprüüstünde bastırılmadığı doğrulanmalıdır. Bastırılmış veya devre dışı bırakılmış her alarm kayıt altına alınır ve devir teslimde aktarılır.`,
          ],
          bullets: [
            `Bastırılmış alarm kaydı tutuluyor mu?`,
            `DP alarmları ses ve görsel olarak ayırt edilebiliyor mu?`,
            `Alarm yığılmasında öncelik sırası biliniyor mu?`,
            `Alarm geçmişi olay incelemesi için saklanıyor mu?`,
          ],
        },
      ],
    },
  ],
};

export default content;
