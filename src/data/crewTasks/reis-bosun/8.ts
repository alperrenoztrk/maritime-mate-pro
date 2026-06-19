import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Demir (anchor) operasyonlarında ekip liderliği",
  roleSlug: "reis-bosun",
  taskIndex: 8,
  estimatedPages: 24,
  intro: `Demir operasyonları — demir atma (let go), demir alma (heave up) ve demir tarama yönetimi — baş kasara (fo'c'sle) güvertesinde yoğun ve riskli bir koordinasyon ister. Reis (Bosun), bu güvertedeki ekibi yönetir: anchor windlass operasyonu, chain stopper kullanımı, zincirin güvenli kontrolü ve köprüüstünden gelen komutların (shackle/kilit sayısı, vira/fıra) sahada uygulanması. Demir cezasında veya acil demir tarama anında sahadaki en kritik kişidir. Bu bölüm demir operasyonlarında ekip liderliğini ele alır.`,
  sources: [
    "Code of Safe Working Practices (COSWP) — anchoring",
    "Üretici windlass/cable lifter el kitapları",
    "Klas kuralları — demir donanımı",
    "STCW — anchoring operations",
    "Şirket SMS — anchoring risk assessment",
  ],
  chapters: [
    {
      heading: "1. Baş Kasara Ekibi",
      sections: [
        {
          subheading: "1.1 Reisin sahadaki rolü",
          paragraphs: [
            `Demir operasyonunda Reis, baş kasara güvertesindeki ekibin lideridir; köprüüstü ile saha arasındaki köprüdür. Komutları uygular, ekibi güvenli pozisyonda tutar ve zincirin/demirin durumunu gözleyip köprüüstüne raporlar. Bu yoğun anlarda net iletişim ve soğukkanlılık hayatidir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Zincir bölgesi tehlikeli",
              text: `Hızla giden bir demir zinciri ve gergin donanım ölümcüldür. Ekip, zincirin hattından ve geri tepme bölgesinden uzak durur; Reis kimsenin tehlikeli pozisyonda olmamasını sağlar.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Windlass ve Chain Stopper",
      sections: [
        {
          subheading: "2.1 Ekipman kullanımı",
          paragraphs: [
            `Anchor windlass (ırgat), demiri kaldırıp indirir; chain stopper (devil's claw/guillotine), zinciri demir tutarken yükten kurtarır. Reis, bu ekipmanların doğru sırada ve güvenli kullanımını koordine eder. Windlass freni, brake holding ve clutch işlemleri kritik kontrol noktalarıdır.`,
          ],
          bullets: [
            `Windlass fren ve clutch kontrolü`,
            `Chain stopper devreye alma/çıkarma`,
            `Zincir gerginliği ve yük gözlemi`,
            `Hawse pipe/spurling pipe temizliği`,
          ],
        },
        {
          subheading: "2.2 Komutların uygulanması",
          paragraphs: [
            `Köprüüstünden gelen komutlar (kaç kilit/shackle, vira=heave, fıra=walk back/let go) sahada doğru uygulanır. Reis, zincir markalarını (shackle marking) okuyarak verilen kilit sayısını doğrular ve köprüüstüne raporlar (örn. "two shackles in the water").`,
          ],
          table: {
            caption: "Temel demir komutları",
            headers: ["Komut", "Anlam"],
            rows: [
              ["Let go", "Demiri bırak"],
              ["Heave up / vira", "Demiri al"],
              ["Walk back / fıra", "Zinciri kontrollü ver"],
              ["Hold on", "Tut, durdur"],
              ["How is the cable?", "Zincir yönü/gerginliği nasıl?"],
            ],
          },
        },
      ],
    },
    {
      heading: "3. Zincir ve Demir Kontrolü",
      sections: [
        {
          subheading: "3.1 Seyir öncesi muayene",
          paragraphs: [
            `Reis, seyir öncesi demir zincirini kontrol eder: link aşınması, çatlak, deformasyon ve markaların okunabilirliği. Anormal yük, titreşim veya ses fark edilirse köprüüstü uyarılır. Zincirdeki bir zayıflık, demir kaybına veya operasyon kazasına yol açabilir.`,
          ],
        },
        {
          subheading: "3.2 Yön ve gerginlik raporu",
          paragraphs: [
            `Demir atarken/alırken zincirin yönü (lead) ve gerginliği köprüüstüne raporlanır ("cable leading ahead, moderate strain"). Bu bilgi, kaptanın manevra ve demir tutuş değerlendirmesi için kritiktir.`,
          ],
        },
      ],
    },
    {
      heading: "4. Demir Tarama (Dragging) ve Acil Durum",
      sections: [
        {
          subheading: "4.1 Sahadaki kritik kişi",
          paragraphs: [
            `Demir tarama (dragging) veya acil demir tarama (emergency anchoring) durumunda Reis sahadaki en kritik kişidir; ekibi güvende tutarak hızlı ve doğru müdahaleyi koordine eder. Zincirde ani sarsıntı, beklenmedik yük veya kayma belirtisi derhal köprüüstüne bildirilir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Acil demir",
              text: `Makine/dümen arızası gibi acil durumlarda demir, son durdurma aracı olabilir. Bu yüksek riskli manevrada Reisin soğukkanlı ekip yönetimi ve doğru raporlaması hayati önemdedir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Güvenlik ve Haberleşme",
      sections: [
        {
          subheading: "5.1 KKD ve net iletişim",
          paragraphs: [
            `Ekip baret, eldiven, çelik burunlu ayakkabı ve göz koruması kullanır; zincir bölgesinin tozu/parçacığı için gözlük önemlidir. Köprüüstü ile telsiz haberleşmesi net ve teyitli olur. Gürültülü ortamda el işaretleri de önceden anlaşılır.`,
          ],
        },
      ],
    },
    {
      heading: "6. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "6.1 Demir operasyonu kontrolü",
          bullets: [
            `Ekip KKD'li ve zincir hattından uzak güvenli pozisyonda mı?`,
            `Windlass fren/clutch ve chain stopper sağlıklı mı?`,
            `Köprüüstü komutları doğru uygulanıp raporlanıyor mu (shackle sayısı)?`,
            `Zincir/demir seyir öncesi kontrol edildi mi?`,
            `Zincir yönü/gerginliği köprüüstüne bildiriliyor mu?`,
            `Dragging/acil belirtisi derhal raporlanıyor mu?`,
            `Telsiz/el işareti haberleşmesi net mi?`,
          ],
          paragraphs: [
            `Demir operasyonlarında ekip liderliği, Reisin saha komutasının zirvesidir; yoğun, gürültülü ve riskli bir ortamda ekibi güvende tutarak köprüüstünün iradesini hayata geçirir. Net haberleşme, güvenli konumlanma ve zinciri "okuma" becerisi; demir operasyonunu kontrollü ve güvenli kılar.`,
          ],
        },
      ],
    },
  ],
};

export default content;
