import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Borda iskelesi, merdiven ve erişim ekipmanlarının bakımı",
  roleSlug: "reis-bosun",
  taskIndex: 6,
  estimatedPages: 23,
  intro: `Gemiye iniş-binişte ve borda dışı çalışmada kullanılan erişim ekipmanları — pilot ladder, accommodation ladder, gangway, bosun's chair — kullanıldığı her an bir hayatı taşır; hatalı bir basamak, aşınmış bir halat veya yanlış kurulum ölümle sonuçlanabilir. Reis (Bosun), bu ekipmanların bakımını, kontrolünü ve güvenli kurulumunu yönetir; özellikle SOLAS V/23 pilot transfer gerekliliklerine uygun hazırlık kritiktir. Bu bölüm erişim ekipmanlarının bakım ve güvenli kullanımını ele alır.`,
  sources: [
    "SOLAS Chapter V Regulation 23 — pilot transfer arrangements",
    "Code of Safe Working Practices (COSWP) — access equipment",
    "ISO 799 — pilot ladders",
    "IMO Res. A.1045(27) — pilot transfer arrangements",
    "Üretici accommodation ladder/gangway el kitapları",
  ],
  chapters: [
    {
      heading: "1. Erişim Ekipmanının Önemi",
      sections: [
        {
          subheading: "1.1 Hayat taşıyan ekipman",
          paragraphs: [
            `Pilot ladder, accommodation ladder ve gangway her gün insan taşır; bir kusur doğrudan düşme ve ölümle sonuçlanabilir. Reis, bu ekipmanların "iyi görünmesi" değil, gerçekten güvenli olması gerektiğini bilir ve bakımlarını ciddiyetle yönetir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Pilot ladder ölümleri",
              text: `Hatalı kurulan veya bakımsız pilot ladder, kılavuz kaptan ölümlerinin gerçek ve sürekli bir nedenidir. SOLAS V/23 ve ilgili kurallara birebir uyum hayatidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Pilot Ladder",
      sections: [
        {
          subheading: "2.1 Bakım ve kontrol",
          paragraphs: [
            `Pilot ladder; basamak çatlağı/eksikliği, halat aşınması/çürümesi, spreader durumu ve genel bütünlük açısından her kullanımdan önce kontrol edilir. Sertifikalı, hasarsız ve doğru yükseklikte kurulmalıdır. Reis, kombinasyon (accommodation + pilot ladder) düzeninin güvenli olduğunu doğrular.`,
          ],
          bullets: [
            `Basamak ve yan halat bütünlüğü`,
            `Spreader ve bağlantılar`,
            `Doğru yükseklik ve güvenli sabitleme`,
            `Aydınlatma, can simidi+ışık, heaving line`,
            `Gözetmen personel ve telsiz`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS V/23",
              text: `Pilot transfer düzeni; sertifikalı ekipman, doğru kurulum, yeterli aydınlatma ve gözetmen personel gerektirir. Kombinasyon ladder kullanımı belirli kurallara tabidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Accommodation Ladder ve Gangway",
      sections: [
        {
          subheading: "3.1 Mekanik bakım",
          paragraphs: [
            `Accommodation ladder ve gangway; vinç/halat sistemi, basamak/platform durumu, korkuluk (stanchion/rope) ve emniyet ağı (safety net) açısından kontrol edilir. Reis, yağlama, aşınma ve yük testlerinin yapıldığını gözetir. Düşmeyi önleyen safety net her zaman gergin ve doğru kurulmalıdır.`,
          ],
          table: {
            caption: "Erişim ekipmanı kontrol noktaları",
            headers: ["Ekipman", "Kontrol"],
            rows: [
              ["Pilot ladder", "Basamak/halat/spreader, kurulum"],
              ["Accommodation ladder", "Vinç/halat, platform, korkuluk"],
              ["Gangway", "Basamak, korkuluk, safety net"],
              ["Bosun's chair", "Halat/koltuk, emniyet kemeri"],
            ],
          },
        },
        {
          subheading: "3.2 Safety net ve can kurtarma",
          paragraphs: [
            `Erişim ekipmanı altında safety net ve yakınında can simidi+ışık+heaving line bulundurulur. Suya düşme durumunda hızlı müdahale için bu hazırlık şarttır. Reis, bu emniyet düzeninin her zaman yerinde olmasını sağlar.`,
          ],
        },
      ],
    },
    {
      heading: "4. Bosun's Chair ve Yüksekte/Borda Dışı Çalışma",
      sections: [
        {
          subheading: "4.1 Güvenli kurulum",
          paragraphs: [
            `Bosun's chair ile yüksekte (aloft) veya borda dışı (overside) çalışma yüksek riskli işlerdendir; halat/koltuk bütünlüğü, ayrı bir emniyet hattı (independent lifeline), full body harness ve permit-to-work şarttır. Reis bu hazırlığı denetler ve deneyimsiz personeli gözetimsiz yüksekte çalıştırmaz.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "İkinci emniyet hattı",
              text: `Bosun's chair tek bir halata güvenmez; mutlaka ayrı bir emniyet hattı (lifeline) ve harness kullanılır. Tek hat koparsa, ikinci hat hayat kurtarır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Permit ve Gözetim",
      sections: [
        {
          subheading: "5.1 Risk değerlendirmesi",
          paragraphs: [
            `Working aloft/overside, permit-to-work ve risk değerlendirmesi gerektirir; hava, gemi hareketi ve düşme riski değerlendirilir. Reis, toolbox talk yapar, KKD/harness kontrolü yapar ve çalışma süresince gözetimi sürdürür.`,
          ],
        },
      ],
    },
    {
      heading: "6. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "6.1 Erişim ekipmanı kontrolü",
          bullets: [
            `Pilot ladder hasarsız, sertifikalı ve SOLAS V/23'e uygun kurulu mu?`,
            `Aydınlatma, can simidi+ışık, heaving line ve gözetmen hazır mı?`,
            `Accommodation ladder/gangway korkuluk ve safety net sağlam mı?`,
            `Bosun's chair için ayrı lifeline + harness var mı?`,
            `Working aloft/overside için permit ve risk değerlendirmesi yapıldı mı?`,
            `Deneyimsiz personel gözetim altında mı?`,
            `Yağlama, yük testi ve kontroller kayıtlı mı?`,
          ],
          paragraphs: [
            `Borda iskelesi, merdiven ve erişim ekipmanları bakımı, Reisin doğrudan can güvenliğiyle ilgili en hassas görevlerindendir. Sertifikalı ekipman, doğru kurulum, ikinci emniyet hattı ve sürekli gözetim; her iniş-binişin ve her borda dışı işin güvenle tamamlanmasını sağlar.`,
          ],
        },
      ],
    },
  ],
};

export default content;
