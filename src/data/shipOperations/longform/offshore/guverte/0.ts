import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Offshore görev profili ve DP operasyon kapsamının belirlenmesi",
  shipType: "offshore",
  dept: "guverte",
  opIndex: 0,
  estimatedPages: 20,
  intro: `Her offshore DP operasyonu, geminin endüstriyel görevinin ve kabul edilebilir konum toleransının doğru tanımlanmasıyla başlar. PSV ikmali ile doygun dalış, ağır kaldırma ile boru döşeme birbirinden çok farklı yedeklilik, referans ve tepki süresi gerektirir. Bu bölüm, görev profilinin nasıl çıkarıldığını ve bu profilin ASOG, risk değerlendirmesi ve DP çalışma konseptine nasıl aktarıldığını ele alır.`,
  sources: [
    "IMO MSC.1/Circ.1580 (Guidelines for DP Vessels)",
    "IMCA M103 (Design & Operation of DP Vessels)",
    "IMCA M117 (Training & Experience of DP Personnel)",
    "Vessel DP Operations Manual",
  ],
  chapters: [
    {
      heading: "1. Görev Tanımı ve Kabul Edilebilir Sapma",
      lead: `DP kabiliyeti tek başına güvenliği sağlamaz; görevin ne kadar konum hassasiyeti ve ne kadar tepki süresi istediği belirlenmeden çalışma konsepti seçilemez.`,
      sections: [
        {
          subheading: "1.1 Endüstriyel görevin sınıflandırılması",
          paragraphs: [
            `Görev; PSV ikmali, AHTS/anchor handling, dalış, ROV/survey, boru-kablo döşeme, sondaj, offshore yükleme, walk-to-work veya ağır kaldırma olarak net tanımlanır. Her görev tipi kendine özgü watch circle, referans kombinasyonu ve durdurma kriteri getirir.`,
          ],
          bullets: [
            `İşin konum, rota, baş, hız gereksinimi`,
            `Hat gerilimi, riser açısı veya göreceli mevki ihtiyacı`,
            `İnsan sualtında/askıda mı (dalgıç, ROV, gangway, yük)?`,
          ],
        },
        {
          subheading: "1.2 Terminate/escape ve WCF ihtiyacı",
          paragraphs: [
            `Faaliyeti güvenle durdurma süresi (terminate time), en az riskli kaçış yönü ve Worst Case Failure (WCF) sonrası elde kalması gereken itki/güç hesaplanır. Bu üç değer, gerekli DP sınıfını ve yedekliliği doğrudan belirler.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Kabiliyet ≠ güvenlik",
              text: `Geminin DP kabiliyetinin olması, seçilen görevin o çevre ve konfigürasyonda güvenli olduğu anlamına gelmez; her görev ayrı değerlendirilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. DP Çalışma Konseptinin Seçimi",
      sections: [
        {
          subheading: "2.1 Sınıf, yedeklilik ve referans kombinasyonu",
          paragraphs: [
            `Görev gereksinimi ile geminin gerçek teknik durumu birlikte değerlendirilerek gerekli DP ekipman sınıfı, yedeklilik seviyesi, personel sayısı ve pozisyon referans kombinasyonu iş sahibiyle mutabık kalınır.`,
          ],
          bullets: [
            `Kritik faaliyet için DP Class 2/3 ve tam yedeklilik`,
            `Düşük riskli görevde onaylı alternatif konfigürasyon`,
            `PRS: en az iki bağımsız, ortak-hata riski düşük kaynak`,
          ],
        },
        {
          subheading: "2.2 Planlama paketine aktarım",
          paragraphs: [
            `Sonuçlar operasyon planı, task risk assessment ve ASOG girdilerine yazılır; böylece köprüüstü ekibi görevi başlatmadan önce kabul edilen limitleri ve tepki planını görür.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "DP seyir sistemi değildir",
              text: `DP çatışmayı önleyen bir seyir sistemi değildir; COLREG yükümlülükleri ve köprüüstü gözcülüğü operasyon boyunca devam eder.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Kontrol Listesi ve Kayıt",
      sections: [
        {
          subheading: "3.1 Görev kapsamı son kontrol",
          bullets: [
            `Endüstriyel görev ve konum toleransı yazılı tanımlandı mı?`,
            `Terminate time, kaçış yönü ve WCF ihtiyacı hesaplandı mı?`,
            `Gerekli DP sınıfı ve PRS kombinasyonu iş sahibiyle mutabık mı?`,
            `Sonuçlar plan, risk değerlendirmesi ve ASOG'a aktarıldı mı?`,
          ],
          paragraphs: [
            `Familiarisation kaydı, planlama paketi ve task risk assessment dosyada tutulur; görev değişiminde bu üçü yeniden gözden geçirilir.`,
          ],
        },
      ],
    },
  ],
};

export default content;
