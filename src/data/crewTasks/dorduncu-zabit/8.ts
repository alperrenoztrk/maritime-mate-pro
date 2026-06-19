import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Cargo hold inspection ve hazırlık desteği",
  roleSlug: "dorduncu-zabit",
  taskIndex: 8,
  estimatedPages: 23,
  intro: `Yükleme öncesi ambar (cargo hold) hazırlığı ve denetimi, özellikle dökme yük gemilerinde yük güvenliği ve charter party uyumu açısından kritiktir; yanlış hazırlanan bir ambar yük reddine, kontaminasyona veya tazminata yol açabilir. Dördüncü Zabit; hold temizliği, sintine kuyusu, hatch coaming/cover bütünlüğü, hold merdiveni güvenliği ve aydınlatma kontrollerine katılarak hazırlık standartlarını öğrenir. Bu bölüm ambar denetimi ve hazırlık desteğini ele alır.`,
  sources: [
    "IMSBC Code — katı dökme yükler",
    "SOLAS Chapter VI — yük taşıma",
    "Charter party hold cleanliness standartları (grain/hospital clean)",
    "Enclosed space entry — IMO Res. A.1050(27)",
    "Thomas' Stowage / hold preparation pratiği",
  ],
  chapters: [
    {
      heading: "1. Hold Hazırlığının Önemi",
      sections: [
        {
          subheading: "1.1 Neden kritik?",
          paragraphs: [
            `Ambar, bir sonraki yüke uygun temizlik seviyesinde olmalıdır; aksi halde önceki yük artığı (taint), nem veya koku yeni yükü bozabilir. Tahıl gibi hassas yüklerde bağımsız denetim (örn. NCB) yapılır; başarısız hold inspection, yükleme reddine ve büyük zaman/para kaybına yol açar. Dördüncü Zabit bu standartları öğrenir.`,
          ],
          table: {
            caption: "Hold temizlik seviyeleri",
            headers: ["Seviye", "Tanım"],
            rows: [
              ["Load-ready / swept", "Süpürülmüş, görünür kalıntı yok"],
              ["Shovel-clean", "Kalıntı yok, gözle temiz"],
              ["Grain-clean", "Tahıla uygun, kuru, kokusuz, boya sağlam"],
              ["Hospital-clean", "Laboratuvar standardı, hassas yük"],
            ],
          },
        },
      ],
    },
    {
      heading: "2. Denetim Kapsamı",
      sections: [
        {
          subheading: "2.1 Kontrol noktaları",
          paragraphs: [
            `Hold inspection; temizlik, kuruluk, koku, önceki yük artığı, sintine kuyusu temizliği ve süzgeçleri, hatch coaming/cover ve conta (gasket) bütünlüğü, hold merdiveni güvenliği ve aydınlatma fikstürlerini kapsar. Dördüncü Zabit bu noktaları gözlemleyip raporlamaya katkı verir.`,
          ],
          bullets: [
            `Hold cleanliness ve kuruluk`,
            `Bilge well temizliği ve süzgeç`,
            `Hatch coaming/cover ve gasket bütünlüğü`,
            `Hold ladder ve aydınlatma güvenliği`,
            `Taint/koku ve önceki yük artığı`,
          ],
        },
        {
          subheading: "2.2 Hatch cover sızdırmazlığı",
          paragraphs: [
            `Hatch cover sızdırmazlığı, yükün deniz suyundan korunması için kritiktir; hose test/chalk test/ultrasonik test ile kontrol edilir. Dördüncü Zabit, bir cover kaçağının yük hasarına ve ciddi tazminata yol açabileceğini öğrenir.`,
          ],
        },
      ],
    },
    {
      heading: "3. Enclosed Space Güvenliği",
      sections: [
        {
          subheading: "3.1 Ambara giriş riski",
          paragraphs: [
            `Ambarlar kapalı alan sayılır; düşük oksijen veya tehlikeli atmosfer riski olabilir (özellikle bazı yük kalıntıları oksijen tüketir). Hold'a giriş enclosed space entry permit ve atmosfer testi ile yapılır. Dördüncü Zabit bu prosedürün hayati olduğunu öğrenir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Test etmeden girme",
              text: `Görünüşte boş ve havadar bir ambar bile ölümcül düşük oksijene sahip olabilir. Atmosfer testi ve giriş izni olmadan hiçbir kapalı alana girilmez.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Temizlik Yöntemleri",
      sections: [
        {
          subheading: "4.1 Süpürme, yıkama, kurutma",
          paragraphs: [
            `Hold hazırlığı; süpürme, deniz suyu yıkama, tatlı su durulama, kurutma, boya rötuşu ve koku giderme adımlarını içerebilir. Dördüncü Zabit bu işlere katılarak hangi yük için hangi seviyenin gerektiğini ve işin nasıl doğrulandığını öğrenir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Fotoğrafla belgele",
              text: `Hazırlık sonrası hold durumu fotoğraf/video ile belgelenir. Bu kayıt, bir yük anlaşmazlığında ambarın temiz teslim edildiğinin kanıtıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Raporlama",
      sections: [
        {
          subheading: "5.1 Bulguların aktarımı",
          paragraphs: [
            `Dördüncü Zabit, tespit ettiği eksiklikleri (koku, kalıntı, gasket hasarı, korozyon) Birinci Zabite raporlar. Erken ve net raporlama, sorunun yükleme öncesi giderilmesini sağlar; geç fark edilen bir eksiklik operasyonu kilitleyebilir.`,
          ],
        },
      ],
    },
    {
      heading: "6. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "6.1 Hold hazırlık kontrolü",
          bullets: [
            `Hold temiz, kuru, kokusuz ve önceki yük artığından arınmış mı?`,
            `Bilge well temiz, süzgeçler sağlam mı?`,
            `Hatch coaming/cover ve gasket bütün, sızdırmazlık test edildi mi?`,
            `Hold ladder ve aydınlatma güvenli mi?`,
            `Ambara giriş enclosed space permit/atmosfer testi ile mi yapıldı?`,
            `Hazırlık fotoğrafla belgelendi, bulgular raporlandı mı?`,
          ],
          paragraphs: [
            `Cargo hold hazırlığı, Dördüncü Zabitin yük güvenliği bilincini geliştirdiği önemli bir alandır. Temizlik standartlarını öğrenmek, kapalı alan güvenliğine uymak ve bulguları zamanında raporlamak; hem yükü hem gemiyi maliyetli sorunlardan korur.`,
          ],
        },
      ],
    },
  ],
};

export default content;
