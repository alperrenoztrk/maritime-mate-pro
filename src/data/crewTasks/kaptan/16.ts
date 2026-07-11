import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Stowaway, piracy ve security olaylarının yönetimi",
  roleSlug: "kaptan",
  taskIndex: 16,
  estimatedPages: 25,
  intro: `Kaçak yolcu (stowaway), korsanlık/silahlı soygun (piracy/armed robbery) ve diğer güvenlik olayları; insani, hukuki ve emniyet boyutları olan karmaşık durumlardır. Kaptan; stowaway tespitinde FAL Konvansiyonu ve IMO Resolution FAL.13(42) kılavuz prosedürlerini, korsanlık riskinde BMP (Best Management Practices) tedbirlerini ve ISPS kapsamında güvenlik olay bildirimini yönetir. Bu bölüm, bu güvenlik olaylarının yönetimini insan hayatı ve mevzuat dengesinde ele alır.`,
  sources: [
    "IMO Resolution FAL.13(42) ve FAL Convention — stowaway prosedürleri",
    "BMP5 — Best Management Practices to Deter Piracy",
    "ISPS Code — gemi güvenlik planı ve olay bildirimi",
    "SOLAS Chapter XI-2 — maritime security",
    "UKMTO / MSCHOA raporlama prosedürleri",
    "IMO MSC.1 sirkülerleri — piracy/armed robbery raporlama",
  ],
  chapters: [
    {
      heading: "1. Kaçak Yolcu (Stowaway)",
      sections: [
        {
          subheading: "1.1 Tespit ve insani yaklaşım",
          paragraphs: [
            `Bir stowaway tespit edildiğinde öncelik insan güvenliğidir: kişinin can güvenliği, temel ihtiyaçları (su, gıda, barınma, sağlık) sağlanır. Aynı zamanda gemi güvenliği için kişi gözetim altında tutulur. Kaptan, kişiye insani ve mevzuata uygun davranılmasını sağlar; kötü muamele kabul edilemez.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "IMO Res. FAL.13(42) / FAL Convention",
              text: `Stowaway olaylarında bayrak devleti, biniş limanı, sonraki uğrak limanları, gemi sahibi/işleteni ve ISM şirketi bilgilendirilir; kimlik tespiti ve beyan formları doldurulur. Süreç insani ilkeler ve ilgili devletlerin işbirliğiyle yürütülür.`,
            },
          ],
        },
        {
          subheading: "1.2 Bildirim ve dokümantasyon",
          paragraphs: [
            `Kaptan; kişinin bulunma koşullarını, kimlik bilgilerini (varsa), sağlık durumunu ve gözetim düzenini belgeler. P&I Club erken bilgilendirilir (stowaway maliyetleri P&I kapsamındadır). İndirme/iade, ilgili devletlerin ve acentenin koordinasyonuyla yapılır.`,
          ],
          bullets: [
            `Bayrak/biniş/uğrak devleti ve şirket bildirimi`,
            `Kimlik tespiti ve stowaway beyan formu`,
            `Sağlık ve temel ihtiyaçların karşılanması`,
            `P&I Club ve acente koordinasyonu`,
          ],
        },
      ],
    },
    {
      heading: "2. Korsanlık ve Silahlı Soygun",
      sections: [
        {
          subheading: "2.1 Risk bölgeleri ve hazırlık",
          paragraphs: [
            `Yüksek riskli bölgelerde (geçmişte Aden Körfezi/Hint Okyanusu, Gine Körfezi, bazı SE Asya suları) BMP uygulanır. Kaptan; risk değerlendirmesi yapar, ship protection measures (fiziksel bariyerler, razor wire, su fışkırtma), hız/manevra planı ve gözcü düzenini hazırlar. Mürettebat farkındalığı ve drill kritiktir.`,
          ],
          table: {
            caption: "BMP temel tedbir grupları",
            headers: ["Grup", "Örnek tedbir"],
            rows: [
              ["Caydırma", "Razor wire, su perdesi, aydınlatma"],
              ["Gözetim", "Ek gözcü, radar, gece görüş"],
              ["Manevra", "Hız artışı, zigzag, dümen"],
              ["Sığınma", "Citadel (güvenli oda)"],
              ["Raporlama", "UKMTO/MSCHOA, şirket, donanma"],
            ],
          },
        },
        {
          subheading: "2.2 Citadel ve raporlama",
          paragraphs: [
            `Saldırı durumunda mürettebatın korunaklı bir alana (citadel) çekilmesi planlanır; citadel iletişim, su ve gıda ile hazır tutulur. UKMTO/MSCHOA ve ilgili donanma birimleri raporlanır; SSAS (Ship Security Alert System) gerektiğinde aktive edilir. Mürettebat güvenliği her zaman gemi/yükün önündedir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Mürettebat hayatı önceliklidir",
              text: `Korsanlık müdahalesinde hiçbir mal varlığı insan hayatından önce gelmez. BMP, çatışmadan çok caydırma ve sığınma üzerine kuruludur; kahramanlık değil, planlı korunma esastır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. ISPS ve Güvenlik Olayları",
      sections: [
        {
          subheading: "3.1 Güvenlik seviyeleri ve SSP",
          paragraphs: [
            `ISPS Code kapsamında gemi, güvenlik seviyesine (1-2-3) göre Ship Security Plan'ı (SSP) uygular. Kaptan ve SSO; erişim kontrolü, restricted area gözetimi, yük/kumanya güvenliği ve ziyaretçi yönetimini düzenler. Güvenlik seviyesi değişimleri kayda geçer.`,
          ],
        },
        {
          subheading: "3.2 Olay bildirimi",
          paragraphs: [
            `Hırsızlık, sabotaj, izinsiz giriş, bomb threat veya şüpheli durum gibi güvenlik olayları SSP'ye göre yönetilir ve şirket/PFSO/yetkililere bildirilir. SSAS, can/gemi tehdidinde gizli alarm sağlar. Kaptan, olay sonrası kayıt ve düzeltici aksiyonu yürütür.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Drill gerçekçi olmalı",
              text: `Security drill'ler (citadel, SSAS testi, izinsiz giriş senaryosu) gerçekçi yapıldığında, gerçek bir olayda ekip ne yapacağını düşünmeden uygular. Kâğıt üstü tatbikat işe yaramaz.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. İnsan Hakları ve Hukuk Dengesi",
      sections: [
        {
          subheading: "4.1 Mevzuat ve insani ilke",
          paragraphs: [
            `Hem stowaway hem de gözaltına alınan şüpheli kişilere insani muamele zorunludur. Kaptan, gemi güvenliği ile insan hakları arasındaki dengeyi mevzuat çerçevesinde kurar; aşırı güç, kötü muamele veya kişiyi tehlikeye atma kabul edilemez ve ağır sorumluluk doğurur.`,
          ],
        },
      ],
    },
    {
      heading: "5. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "5.1 Güvenlik olayı kontrolü",
          bullets: [
            `Stowaway: insani ihtiyaçlar, gözetim, kimlik ve bildirimler yapıldı mı?`,
            `Stowaway: P&I ve ilgili devletler/acente koordinasyonu başladı mı?`,
            `Piracy: risk değerlendirmesi ve BMP tedbirleri uygulandı mı?`,
            `Citadel hazır, UKMTO/MSCHOA raporlama ve SSAS test edildi mi?`,
            `ISPS: güvenlik seviyesi ve SSP tedbirleri uygulanıyor mu?`,
            `Güvenlik olayı bildirimi ve kayıt yapıldı mı?`,
            `Tüm süreçlerde insani muamele ve hukuka uyum sağlandı mı?`,
          ],
          paragraphs: [
            `Güvenlik olayları yönetimi, kaptanın hem komuta soğukkanlılığını hem insani sorumluluğunu hem de mevzuat bilgisini birlikte kullandığı bir alandır. Hazırlıklı bir gemi — drill'li, planlı, raporlama ağına bağlı — bu olayları paniğe değil, kontrollü bir prosedüre dönüştürür.`,
          ],
        },
      ],
    },
  ],
};

export default content;
