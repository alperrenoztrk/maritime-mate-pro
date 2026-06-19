import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Çamaşırhane ve depo kimyasal güvenliği",
  roleSlug: "kamarot",
  taskIndex: 10,
  estimatedPages: 22,
  intro: `Çamaşırhane ve temizlik deposu, görünüşte zararsız ama aslında iki ciddi risk taşıyan alanlardır: yanlış depolanan/karıştırılan kimyasallar (zehirli gaz, korozyon) ve çamaşır makinesi lint birikiminden kaynaklanan yangın. Kamarot; deterjan, ağartıcı, dezenfektan ve temizlik kimyasallarını SDS bilgisine uygun depolar, uyumsuzları ayrı tutar ve etiketler; çamaşır makinesi filtrelerini düzenli temizler ve çamaşırhane fire damper/detektör kontrolüne katılır. Bu bölüm çamaşırhane ve depo kimyasal güvenliğini ele alır.`,
  sources: [
    "Kimyasal SDS (Safety Data Sheet) / GHS etiketleme",
    "COSWP — kimyasal elleçleme ve depolama",
    "SOLAS II-2 — çamaşırhane yangın emniyeti",
    "Üretici çamaşır makinesi/kurutucu bakım el kitapları",
    "Şirket SMS — kimyasal depolama prosedürleri",
  ],
  chapters: [
    {
      heading: "1. Gizli Riskler",
      sections: [
        {
          subheading: "1.1 Kimyasal ve yangın",
          paragraphs: [
            `Çamaşırhane/depo iki risk taşır: yanlış karışan kimyasalların zehirli gaz/korozyon yaratması ve kurutucu/çamaşır makinesi lint'inin tutuşmasıyla yangın. Kamarot, bu alanları sık kullandığı için her iki riskin de doğal gözcüsüdür ve doğru pratiklerle önler.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Ağartıcı + asit = zehirli gaz",
              text: `Sodyum hipoklorit (ağartıcı) ile asitli temizleyicinin karışması zehirli klor gazı açığa çıkarır. Kimyasallar asla gelişigüzel karıştırılmaz; SDS'e göre ayrı tutulur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Kimyasal Depolama",
      sections: [
        {
          subheading: "2.1 SDS, ayrım, etiket",
          paragraphs: [
            `Kamarot; çamaşır deterjanı, ağartıcı, dezenfektan ve temizlik kimyasallarını SDS bilgisine uygun depolar. Uyumsuz gruplar (asit-baz, oksidanlar) ayrı tutulur, kaplar doğru etiketlenir ve orijinal kabında saklanır. Etiketsiz veya yanlış kapta saklanan kimyasal, ciddi bir kaza riskidir.`,
          ],
          table: {
            caption: "Kimyasal depolama ilkeleri",
            headers: ["İlke", "Açıklama"],
            rows: [
              ["SDS uyumu", "Saklama/elleçleme SDS'e göre"],
              ["Ayrım", "Asit-baz, oksidan ayrı"],
              ["Etiket", "Doğru, okunaklı, orijinal kap"],
              ["Havalandırma", "Buhar birikimini önle"],
            ],
          },
        },
        {
          subheading: "2.2 KKD ve elleçleme",
          paragraphs: [
            `Kimyasal elleçlerken kamarot uygun KKD (eldiven, gerekirse gözlük) kullanır ve havalandırmayı sağlar. Dökülme durumunda SDS'e göre temizlik yapılır. Konsantre kimyasallar doğru oranda seyreltilir; yanlış kullanım hem cilt/solunum hem yüzey hasarı yaratır.`,
          ],
        },
      ],
    },
    {
      heading: "3. Çamaşır Makinesi Yangın Riski",
      sections: [
        {
          subheading: "3.1 Lint ve filtre",
          paragraphs: [
            `Kurutucu ve çamaşır makinesinde biriken lint (kumaş tüyü), tutuşabilir bir malzemedir ve filtre tıkanması ısı birikimine ve yangına yol açar. Kamarot, lint filtrelerini haftalık (gerekirse daha sık) temizler. Bu basit bakım, çamaşırhane yangınlarının en yaygın nedenini ortadan kaldırır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Lint filtresi = yangın önleme",
              text: `Düzenli temizlenmeyen kurutucu lint filtresi, hem verimi düşürür hem yangın riski yaratır. Filtre temizliği, en kolay ve en etkili yangın önleme adımlarından biridir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Çamaşırhane Yangın Ekipmanı",
      sections: [
        {
          subheading: "4.1 Fire damper ve detektör",
          paragraphs: [
            `Çamaşırhane havalandırmasındaki fire damper ve duman/ısı detektörleri, bir yangının yayılmasını sınırlar ve erken haber verir. Kamarot, bu ekipmanın engellenmemesine dikkat eder ve kontrol/test sürecine katılır. Çalışmayan bir damper/detektör derhal raporlanır.`,
          ],
          bullets: [
            `Lint filtreleri düzenli temizlendi mi?`,
            `Fire damper çalışır ve engelsiz mi?`,
            `Duman/ısı detektörü açık ve işlevsel mi?`,
            `Kimyasallar SDS'e göre ayrı/etiketli mi?`,
          ],
        },
      ],
    },
    {
      heading: "5. Düzen ve Temizlik",
      sections: [
        {
          subheading: "5.1 Alan düzeni",
          paragraphs: [
            `Çamaşırhane ve depo düzenli, temiz ve yanıcı birikimden uzak tutulur. Dağınık bir alan hem yangın hem kaza riskini artırır. Kamarot, bu alanların düzenini sürekli korur ve yanıcı atık biriktirmez.`,
          ],
        },
      ],
    },
    {
      heading: "6. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "6.1 Çamaşırhane/depo güvenlik kontrolü",
          bullets: [
            `Kimyasallar SDS'e göre ayrı, etiketli ve orijinal kapta mı?`,
            `Uyumsuz kimyasallar (ağartıcı/asit) ayrı tutuluyor mu?`,
            `Kimyasal elleçlemede KKD ve havalandırma sağlanıyor mu?`,
            `Çamaşır makinesi/kurutucu lint filtreleri haftalık temizleniyor mu?`,
            `Fire damper ve detektör çalışır/engelsiz mi?`,
            `Çamaşırhane/depo düzenli ve yanıcı birikimden uzak mı?`,
          ],
          paragraphs: [
            `Çamaşırhane ve depo kimyasal güvenliği, kamarotun "görünüşte zararsız" bir alandaki iki ciddi riski — kimyasal kaza ve yangın — yönettiği önemli bir görevdir. SDS'e uygun depolama, düzenli lint temizliği ve çalışan yangın ekipmanı; bu sessiz riskleri kontrol altında tutarak gemiyi ve mürettebatı korur.`,
          ],
        },
      ],
    },
  ],
};

export default content;
