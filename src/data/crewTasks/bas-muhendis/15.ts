import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Hyperbaric ve sualtı bakım (in-water survey) koordinasyonu",
  roleSlug: "bas-muhendis",
  taskIndex: 15,
  estimatedPages: 24,
  intro: `Geminin havuza alınmadan (drydock) su altında denetlenmesi ve bakımı — in-water survey, pervane parlatma (propeller polishing), gövde temizliği (hull cleaning) ve katodik koruma kontrolü — hem maliyet hem zaman tasarrufu sağlar, ancak ciddi güvenlik riskleri taşır. Baş Mühendis, klas onaylı dalgıçlarla yapılan bu operasyonları koordine eder; dalış güvenliği, dive plan ve özellikle lockout/tagout (thruster, sea suction, side thruster) titizlikle uygulanır. Bu bölüm sualtı bakım koordinasyonunu ele alır.`,
  sources: [
    "Class kuralları — In-Water Survey (IWS) notasyonu",
    "IMCA — diving operations güvenlik kılavuzları",
    "LOTO (Lock Out – Tag Out) / Permit to Work prosedürleri",
    "Katodik koruma — sacrificial anode / ICCP standartları",
    "MARPOL / liman kuralları — hull cleaning ve biofouling",
  ],
  chapters: [
    {
      heading: "1. Sualtı Bakımın Amacı",
      sections: [
        {
          subheading: "1.1 Drydock'a alternatif",
          paragraphs: [
            `In-water survey, klas onayıyla bazı sörveylerin gemi suda iken yapılmasına imkân tanır ve drydock aralığını uzatabilir. Pervane parlatma ve gövde temizliği, sürtünmeyi azaltarak yakıt tasarrufu sağlar. Baş Mühendis bu operasyonların hem teknik hem güvenlik yönünü koordine eder.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "IWS notasyonu",
              text: `In-Water Survey için geminin uygun klas notasyonuna ve hazırlığına (temiz gövde, işaretli referans noktaları, uygun görüş) sahip olması gerekir. Sörvey, klas sörveyörü gözetiminde dalgıç kamerasıyla yürütülür.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Dalış Güvenliği ve Dive Plan",
      sections: [
        {
          subheading: "2.1 Dive plan ve yetkin ekip",
          paragraphs: [
            `Operasyon, yetkin (IMCA standartlarına uygun) bir dalış ekibi ve onaylı dive plan ile yapılır. Plan; görev, derinlik, süre, haberleşme, acil durum ve dekompresyon hususlarını içerir. Baş Mühendis, gemi tarafının (makine sistemleri) plana uygun hazırlandığını sağlar.`,
          ],
          bullets: [
            `Onaylı dive plan ve yetkin ekip`,
            `Haberleşme ve standby dalgıç`,
            `Acil durum ve ilk yardım planı`,
            `Hava/akıntı ve görüş değerlendirmesi`,
          ],
        },
      ],
    },
    {
      heading: "3. Lockout/Tagout — En Kritik Adım",
      sections: [
        {
          subheading: "3.1 Hareketli/emici tehlikelerin izolasyonu",
          paragraphs: [
            `Dalgıç su altındayken; ana pervane, bow/stern thruster'lar, side thruster ve sea suction (deniz emiş) valfleri kesinlikle çalıştırılmamalıdır. Bu sistemler LOTO ile izole edilir, kilitlenir ve etiketlenir; köprüüstü ve makine dairesi bilgilendirilir. Bir thruster'ın yanlışlıkla devreye girmesi dalgıç için ölümcüldür.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Thruster/sea suction = ölüm riski",
              text: `Dalgıç çevresinde çalışan bir pervane veya açılan bir sea suction, dalgıcı içine çekebilir veya parçalayabilir. LOTO, dive operasyonunun pazarlıksız ve en kritik güvenlik adımıdır; izolasyon dalgıç sudan çıkana kadar kaldırılmaz.`,
            },
          ],
          table: {
            caption: "İzole edilecek sistemler",
            headers: ["Sistem", "Risk", "Tedbir"],
            rows: [
              ["Ana pervane", "Çarpma/çekme", "LOTO + köprüüstü bilgi"],
              ["Bow/stern thruster", "Çekme/parçalama", "LOTO + kilit"],
              ["Sea suction valve", "İçine çekme", "Kapat, kilitle, etiketle"],
              ["Sintine/balast pompa", "Akış", "İlgili hatlar izole"],
            ],
          },
        },
        {
          subheading: "3.2 Permit to Work",
          paragraphs: [
            `Operasyon, permit-to-work ile başlatılır; tüm izolasyonlar doğrulanır, sorumlular imzalar ve iş bitene kadar izolasyon korunur. Vardiya değişiminde devralan ekip izolasyonu teyit eder.`,
          ],
        },
      ],
    },
    {
      heading: "4. Pervane ve Gövde Bakımı",
      sections: [
        {
          subheading: "4.1 Polishing ve hull cleaning",
          paragraphs: [
            `Pervane parlatma yüzey pürüzlülüğünü azaltıp verimi artırır; gövde temizliği biofouling'i (deniz canlısı birikimi) kaldırır. Baş Mühendis, temizlik sonrası performans kazanımını izler. Biofouling temizliğinde liman çevre kuralları (kaçak tür/biocide) dikkate alınır.`,
          ],
        },
      ],
    },
    {
      heading: "5. Katodik Koruma",
      sections: [
        {
          subheading: "5.1 Anot ve ICCP kontrolü",
          paragraphs: [
            `Gövde, korozyona karşı sacrificial anode (feda anot) veya Impressed Current Cathodic Protection (ICCP) ile korunur. Sualtı denetiminde anot tükenmesi (wastage) ölçülür ve ICCP sistem performansı (potansiyel okumaları) kayıt altına alınır. Yetersiz koruma, gövde ve pervane korozyonunu hızlandırır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Anot tükenmesini izle",
              text: `Aşırı tükenmiş anotlar zamanında yenilenmezse gövde korozyonu hızlanır. Sualtı denetim, anot durumunu ve ICCP performansını görmek için değerli bir fırsattır; ölçümler kaydedilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Dokümantasyon ve Raporlama",
      sections: [
        {
          subheading: "6.1 Sörvey kaydı",
          paragraphs: [
            `Dalgıç video/fotoğrafları, ölçümler (anot, kalınlık), sörveyör bulguları ve yapılan işler kayıt altına alınır ve klasa/şirkete raporlanır. Bu kayıtlar bir sonraki drydock planlamasına ve klas uyumuna temel oluşturur.`,
          ],
        },
      ],
    },
    {
      heading: "7. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "7.1 Sualtı bakım kontrolü",
          bullets: [
            `Onaylı dive plan ve yetkin ekip mevcut mu?`,
            `Permit to Work açıldı, sorumlular bilgilendirildi mi?`,
            `Pervane/thruster/sea suction LOTO ile izole, kilitli ve etiketli mi?`,
            `Köprüüstü ve makine dairesi izolasyondan haberdar mı?`,
            `İzolasyon dalgıç sudan çıkana kadar korunuyor mu?`,
            `Anot wastage ve ICCP performansı ölçülüp kaydedildi mi?`,
            `Sörvey video/rapor klasa ve şirkete iletildi mi?`,
          ],
          paragraphs: [
            `Sualtı bakım koordinasyonu, teknik kazanımın ancak mutlak güvenlikle birlikte değer taşıdığı bir alandır. Baş Mühendisin titiz LOTO disiplini, doğrulanmış izolasyon ve özenli kayıt; hem dalgıcın hayatını hem geminin gövde bütünlüğünü güvence altına alır.`,
          ],
        },
      ],
    },
  ],
};

export default content;
