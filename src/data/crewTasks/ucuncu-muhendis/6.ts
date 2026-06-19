import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Önleyici bakım ve arıza analizi",
  roleSlug: "ucuncu-muhendis",
  taskIndex: 6,
  estimatedPages: 24,
  intro: `Önleyici bakım (preventive maintenance) ve erken arıza teşhisi, makine dairesinin plansız duruşunu (breakdown) önlemenin temelidir. Üçüncü/Dördüncü Mühendis, düzenli kontroller sırasında olağandışı ses, titreşim, kaçak ve sıcaklık sapması gibi erken belirtileri yakalar, basit arızaları çözer ve karmaşık olanları üst mühendise yapılandırılmış bir raporla aktarır. Bu bölüm; kondisyon izleme, kök-neden analizi ve raporlama disiplinini açıklar.`,
  sources: [
    "Gemi PMS / condition-based maintenance prosedürleri",
    "Üretici (maker) bakım ve sorun giderme el kitapları",
    "ISO 10816 — Makine titreşim değerlendirme kılavuzları",
    "Class CMS gereklilikleri",
    "Root Cause Analysis (RCA) metodolojileri (5-Why, fishbone)",
  ],
  chapters: [
    {
      heading: "1. Önleyici Bakımın Mantığı",
      sections: [
        {
          subheading: "1.1 Reaktif, önleyici ve kestirimci bakım",
          paragraphs: [
            `Bakım üç temel yaklaşımla ele alınır: reaktif (arıza olunca onar), önleyici (zaman/saat bazlı planlı bakım) ve kestirimci/kondisyon bazlı (ekipmanın gerçek durumuna göre). Modern gemi, üçünü dengeli kullanır. Üçüncü/Dördüncü Mühendis önleyici bakımı uygularken, kondisyon verisiyle erken arızayı yakalamayı da öğrenir.`,
          ],
          bullets: [
            `Reaktif: ucuz görünür, ama plansız duruş pahalıdır`,
            `Önleyici: öngörülebilir, ama bazen erken/gereksiz olabilir`,
            `Kestirimci: gerçek duruma göre, en verimli ama veri ister`,
          ],
        },
        {
          subheading: "1.2 Duyularla teşhis",
          paragraphs: [
            `Deneyimli bir mühendis, makineyi gözle (kaçak, renk, duman), kulakla (vuruntu, sürtünme), elle (titreşim, sıcaklık) ve burunla (yanık, yakıt kokusu) dinler. Bu "insan sensör" tarama, en pahalı izleme sisteminin bile kaçırabileceği değişiklikleri yakalar.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Temel çizgiyi (baseline) öğren",
              text: `Bir ekipmanın "normal" ses, titreşim ve sıcaklığını ezberleyin. Arıza, çoğu zaman mutlak bir değerden değil, bu normalden sapmadan anlaşılır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Kondisyon İzleme Parametreleri",
      sections: [
        {
          subheading: "2.1 İzlenen başlıca göstergeler",
          paragraphs: [
            `Sıcaklık, basınç, titreşim, yağ analizi ve performans (yük/devir/tüketim) en çok izlenen göstergelerdir. Sapmaların yönü ve hızı, soruna işaret eder: yavaş yükselen yatak sıcaklığı yağlama/aşınma; ani basınç düşüşü kaçak/tıkanma; artan titreşim balanssızlık/yatak hasarı anlamına gelebilir.`,
          ],
          table: {
            caption: "Belirti → olası neden",
            headers: ["Belirti", "Olası neden", "İlk aksiyon"],
            rows: [
              ["Yatak sıcaklık ↑", "Yağ filmi/aşınma", "Yağ basıncı/seviye kontrol, yük azalt"],
              ["Titreşim ↑", "Balanssızlık/yatak", "Yük azalt, gözlem, üst mühendise rapor"],
              ["Egzoz sıcaklık dengesizliği", "Enjektör/valf", "Silindir verisi, enjektör kontrol"],
              ["Yağ basınç ↓", "Pompa/kaçak/filtre", "Filtre ΔP, kaçak ara"],
              ["Soğutma suyu ↑", "Pompa/kaçak/tıkanma", "Akış/seviye, ekspansiyon tankı"],
            ],
          },
        },
        {
          subheading: "2.2 Yağ analizi",
          paragraphs: [
            `Periyodik yağ numune analizi (viskozite, su, metal partikül, TBN) iç aşınmayı dışarıdan göstermeden ortaya çıkarır. Metal artışı yatak/segman aşınmasını, su/glikol soğutma suyu kaçağını işaret eder. Üçüncü/Dördüncü Mühendis numune alımına ve sonuç takibine destek verir.`,
          ],
        },
      ],
    },
    {
      heading: "3. Basit Arıza Teşhisi ve Çözümü",
      sections: [
        {
          subheading: "3.1 Yetki sınırında müdahale",
          paragraphs: [
            `Filtre tıkanıklığı, gevşek bağlantı, küçük conta kaçağı, hava alma (priming), basit elektrik bağlantısı gibi sorunlar genç mühendisin yetki ve yetkinlik sınırındadır. Müdahale öncesi LOTO ve permit kurallarına uyulur; çözüm ve sonuç kayda geçirilir.`,
          ],
          bullets: [
            `Filtre değişimi ve ΔP kontrolü`,
            `Sistemden hava alma / priming`,
            `Kaçak noktası tespiti ve sıkma`,
            `Sensör/bağlantı kontrolü`,
          ],
        },
        {
          subheading: "3.2 Ne zaman durup üst mühendisi çağırmalı?",
          paragraphs: [
            `Belirti kapsamı aşıyorsa, güvenlik riski varsa veya çözüm belirsizse iş durdurulur ve üst mühendis çağrılır. "Deneyeyim" diyerek bilinmeyen bir sistemde ilerlemek, küçük bir sorunu büyük bir hasara çevirebilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Belirsizlikte dur",
              text: `Emin olmadığınız bir arızada zorlamayın. Çağırmak zayıflık değil, profesyonelliktir; yanlış müdahale çoğu zaman orijinal arızadan daha pahalıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Kök-Neden Analizi (RCA)",
      sections: [
        {
          subheading: "4.1 Belirtiyi değil nedeni onar",
          paragraphs: [
            `Bir filtreyi sürekli değiştirmek belirtiyi yönetir; ama filtreyi tıkayan kontaminasyonun kaynağını bulmak arızayı çözer. 5-Why ve fishbone gibi basit yöntemlerle "neden" zinciri kök nedene kadar izlenir. Üçüncü/Dördüncü Mühendis gözlem ve verisiyle bu analize katkı sağlar.`,
          ],
          callouts: [
            {
              type: "example",
              title: "5-Why örneği",
              text: `Pompa durdu → motor aşırı akım çekti → yatak sıkıştı → yağlama yetersizdi → yağ hattı tıkalıydı → yağ kontamine olmuştu. Kök neden: kontaminasyon kaynağı. Sadece motoru değiştirmek arızayı tekrarlatır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Üst Mühendise Raporlama",
      sections: [
        {
          subheading: "5.1 İyi bir arıza raporunun içeriği",
          paragraphs: [
            `Karmaşık arızalar, üst mühendise yapılandırılmış biçimde aktarılır: ne gözlendi, ne zaman başladı, hangi değerler değişti, hangi aksiyon alındı, ekipman hangi durumda. Belirsiz "bozuldu" yerine ölçülmüş veri ve zaman çizelgesi sunmak, doğru kararı hızlandırır.`,
          ],
          bullets: [
            `Belirti ve başlangıç zamanı`,
            `Değişen parametreler (önce/sonra değerleri)`,
            `Alınan ilk aksiyonlar ve sonuç`,
            `Mevcut güvenli durum ve öneri`,
          ],
        },
      ],
    },
    {
      heading: "6. Önleyici Bakımın Planlanması",
      sections: [
        {
          subheading: "6.1 Liman penceresi ve operasyon dengesi",
          paragraphs: [
            `Bazı bakımlar makine durdurularak yapılır; bu yüzden seyir/liman programıyla uyumlu planlanır. Üçüncü/Dördüncü Mühendis, kendi işlerini bu pencerelere göre hazırlar (parça, takım, izin hazır) ki duruş süresi minimuma insin.`,
          ],
        },
      ],
    },
    {
      heading: "7. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "7.1 Erken teşhis ve bakım kontrolü",
          bullets: [
            `Ekipmanın baseline ses/titreşim/sıcaklığını biliyor muyum?`,
            `Sapma trendini logdan takip ediyor muyum?`,
            `Müdahale öncesi LOTO/permit uygulandı mı?`,
            `Çözdüğüm arızanın kök nedenini araştırdım mı?`,
            `Kapsam dışı arızada durup üst mühendisi çağırdım mı?`,
            `Rapor ölçülmüş veri ve zaman çizelgesi içeriyor mu?`,
          ],
          paragraphs: [
            `Önleyici bakım ve arıza analizi, genç mühendisin "tamirci"den "teşhisçi"ye dönüştüğü alandır. Belirtiyi değil nedeni gören, küçük sapmayı büyümeden yakalayan mühendis, makine dairesinin en değerli güvencesidir.`,
          ],
        },
      ],
    },
  ],
};

export default content;
