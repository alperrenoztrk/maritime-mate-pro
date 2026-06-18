import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Buz seyri (ice navigation) hazırlığı",
  roleSlug: "ikinci-zabit",
  taskIndex: 9,
  estimatedPages: 24,
  intro: `Yüksek enlemlere veya kış aylarında buzlu sulara yapılan seferler, sıradan seyirden tümüyle farklı riskler taşır: buz hasarı, dümen/pervane zedelenmesi, donma, kısıtlı manevra ve sınırlı kurtarma imkânı. Polar Code (SOLAS XIV) ve IMO kutup suları kılavuzları bu seferleri düzenler. İkinci Zabit; buz raporlarını izler, rota alternatiflerini analiz eder, buz konsantrasyon/kalınlık verisine göre passage plan'ı revize eder ve düşük sıcaklık hazırlıklarını koordine eder. Bu bölüm buz seyrine hazırlığı kapsamlı biçimde ele alır.`,
  sources: [
    "SOLAS Chapter XIV — Safety measures for ships operating in polar waters",
    "Polar Code (International Code for Ships Operating in Polar Waters)",
    "IMO Guidelines for ships operating in polar waters",
    "WMO sea-ice nomenklatürü ve egg code",
    "NAVTEX / ice bulletin servisleri (IceNet, BSH, AARI vb.)",
    "Klas ice class kuralları (Polar Class / Finnish-Swedish Ice Class)",
  ],
  chapters: [
    {
      heading: "1. Buz Seyrinin Riskleri ve Mevzuat",
      sections: [
        {
          subheading: "1.1 Neden özel hazırlık gerekir?",
          paragraphs: [
            `Buz; gövdeye, dümene ve pervaneye hasar verebilir, manevrayı kısıtlar, hızı düşürür ve sıkışma (besetment) riski yaratır. Düşük sıcaklık ekipmanı dondurur, görüş düşer ve kurtarma kaynakları uzaktır. Bu yüzden buzlu sulara giriş, ayrı bir risk değerlendirmesi ve hazırlık ister.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "Polar Code & SOLAS XIV",
              text: `Kutup sularında işletilen gemiler Polar Ship Certificate ve Polar Water Operational Manual (PWOM) taşımalı; ekip uygun eğitime (kutup suları için ileri/temel) sahip olmalıdır. Operasyonel sınırlamalar sertifikada tanımlıdır.`,
            },
          ],
        },
        {
          subheading: "1.2 Ice class ve operasyon sınırı",
          paragraphs: [
            `Geminin ice class'ı (Polar Class veya Finnish-Swedish ice class), hangi buz koşulunda ve hangi destekle (refakatsiz / buzkıran refakatinde) seyredebileceğini belirler. İkinci Zabit, planlanan rotanın gemi sınıfının yeteneklerine uygun olduğunu doğrulamada kaptana veri sağlar.`,
          ],
        },
      ],
    },
    {
      heading: "2. Buz Raporları ve İzleme",
      sections: [
        {
          subheading: "2.1 Buz verisi kaynakları",
          paragraphs: [
            `İkinci Zabit; NAVTEX ice bulletin, ulusal buz servisleri (IceNet, BSH, AARI, Canadian Ice Service) ve uydu buz haritalarını izler. Sea ice concentration (egg code), buz tipi/kalınlığı, sıkışma alanları ve buzun hareket yönü değerlendirilir. Buz koşulu dinamiktir; veriler sefer boyunca güncellenir.`,
          ],
          table: {
            caption: "Buz konsantrasyonu (genel kavram)",
            headers: ["Konsantrasyon", "Tanım", "Etki"],
            rows: [
              ["0–1/10", "Açık su / çok seyrek", "Genelde serbest seyir"],
              ["4–6/10", "Orta", "Dikkat, hız düşür, izle"],
              ["7–8/10", "Sıkı", "Manevra zor, hasar riski"],
              ["9–10/10", "Çok sıkı / kapalı", "Sıkışma riski, refakat gerekebilir"],
            ],
          },
        },
        {
          subheading: "2.2 Egg code ve nomenklatür",
          paragraphs: [
            `WMO egg code, buz haritalarında konsantrasyon, gelişim aşaması (kalınlık) ve buz parça boyutunu özetler. İkinci Zabit bu kodu okuyarak rotadaki buz şiddetini yorumlar ve planlamaya yansıtır.`,
          ],
        },
      ],
    },
    {
      heading: "3. Passage Plan Revizyonu",
      sections: [
        {
          subheading: "3.1 Rota ve alternatifler",
          paragraphs: [
            `Buz verisine göre passage plan; en az buzlu, en güvenli geçişi sağlayacak şekilde revize edilir. Açık su koridorları (lead), buzkıran refakat noktaları ve kaçış/sığınma alanları belirlenir. Plan dinamiktir; buz hareket ettikçe rota güncellenir.`,
          ],
          bullets: [
            `En düşük konsantrasyonlu koridorları tercih et`,
            `Buzkıran refakat noktalarını planla`,
            `Sığınma/abort alanlarını belirle`,
            `Gündüz görüşünü ve hız limitini hesaba kat`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Hız = hasar",
              text: `Buzda aşırı hız, gövde ve pervane hasarının başlıca nedenidir. Buza güvenli hızla, kontrollü girilir; tereddütte yavaşlanır veya beklenir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Düşük Sıcaklık Hazırlıkları",
      sections: [
        {
          subheading: "4.1 Donma riski olan sistemler",
          paragraphs: [
            `Düşük sıcaklıkta donabilecek hatlar izole edilir veya ısıtılır/drenajlanır: BWMS, yangın ana hattı (fire main), güverte yıkama, sintine, balast vent'leri ve dış hatlar. İkinci Zabit, makine ve güverte ekibiyle koordineli bu hazırlığı kontrol eder; donan bir yangın hattı, acil anında işe yaramaz.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Donmuş emniyet ekipmanı",
              text: `Donmuş yangın hattı, buz tutmuş can filikası vinç/kızağı veya donmuş valfler emniyeti doğrudan tehdit eder. Soğuk hava hazırlığı bir konfor değil, hayati bir emniyet adımıdır.`,
            },
          ],
        },
        {
          subheading: "4.2 Güverte ve buz birikimi",
          paragraphs: [
            `Üst yapı buzlanması (icing/superstructure icing) ağırlık merkezi ve stabiliteyi tehlikeye atabilir; güvertede buz temizliği planlanır. Personel donma/kayma riskine karşı uygun KKD ve önlem alır; açık güvertede çalışma sınırlandırılır.`,
          ],
        },
      ],
    },
    {
      heading: "5. Köprüüstü Ekipmanı ve Görüş",
      sections: [
        {
          subheading: "5.1 Radar ve gözlem",
          paragraphs: [
            `Buz seyrinde radar (ice detection ayarları), projektör, dürbün ve dikkatli görsel gözlem birlikte kullanılır. Growler ve bergy bit gibi küçük ama tehlikeli buz parçaları radarda zayıf eko verir; bu yüzden görsel gözlem ve düşük hız kritiktir.`,
          ],
        },
      ],
    },
    {
      heading: "6. Buzkıran Refakati ve İletişim",
      sections: [
        {
          subheading: "6.1 Konvoy ve mesafe",
          paragraphs: [
            `Buzkıran refakatinde belirlenen mesafe ve hız korunur; buzkıranla iletişim ve sinyaller önceden anlaşılır. Ani durma riskine karşı güvenli takip mesafesi tutulur. İkinci Zabit, refakat planını ve haberleşmeyi passage plan'a işler.`,
          ],
        },
      ],
    },
    {
      heading: "7. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "7.1 Buz seyri öncesi kontrol",
          bullets: [
            `Polar sertifika/PWOM ve ekip eğitimi uygun mu?`,
            `Güncel buz raporları alındı, egg code yorumlandı mı?`,
            `Passage plan buza göre revize, sığınma/abort noktaları belli mi?`,
            `Donma riskli hatlar (fire main, BWMS, sintine) izole/ısıtmalı mı?`,
            `Üst yapı buzlanması ve güverte güvenliği planlandı mı?`,
            `Radar ice ayarı, projektör ve görsel gözlem hazır mı?`,
            `Buzkıran refakat/haberleşme planı netleşti mi?`,
          ],
          paragraphs: [
            `Buz seyri, hazırlığın seyir emniyetini en doğrudan belirlediği alanlardandır. İkinci Zabitin titiz buz takibi, gerçekçi rota revizyonu ve soğuk hava hazırlığı; gemiyi buzun öngörülemez koşullarına karşı dirençli kılar.`,
          ],
        },
      ],
    },
  ],
};

export default content;
