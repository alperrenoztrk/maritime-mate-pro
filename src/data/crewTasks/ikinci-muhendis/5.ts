import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Kazan, separatör ve yardımcı sistem bakımları",
  roleSlug: "ikinci-muhendis",
  taskIndex: 5,
  estimatedPages: 24,
  intro: `İkinci Mühendis, makine dairesinin operasyonel başı olarak yardımcı sistemlerin — kazan (boiler), separatör (purifier) ve hava kompresörü — bakımından doğrudan sorumludur. Boiler water treatment ve safety valve testi, purifier overhaul planlaması ve air compressor valve/cooler bakımı; bu ekipmanların güvenli ve verimli çalışmasını sağlar. Bir kazan safety valve arızası veya purifier bakımsızlığı hem güvenlik hem operasyon riski yaratır. Bu bölüm yardımcı sistem bakımlarını ele alır.`,
  sources: [
    "Klas kuralları — basınçlı kaplar ve boiler",
    "Üretici (boiler/purifier/compressor) bakım el kitapları",
    "SOLAS — basınçlı sistem emniyeti",
    "Boiler water treatment kılavuzları",
    "PMS / planlı bakım sistemi",
  ],
  chapters: [
    {
      heading: "1. Kazan (Boiler) Bakımı",
      sections: [
        {
          subheading: "1.1 Su şartlandırma ve blow-down",
          paragraphs: [
            `Boiler water treatment, kazan suyu kalitesini (pH, alkalinite, klorür, kondaktivite) doğru aralıkta tutarak korozyon ve kazan taşı (scale) oluşumunu önler. Düzenli blow-down (dipten/yüzeyden boşaltma) ile birikim ve çamur uzaklaştırılır. İkinci Mühendis bu testleri ve dozajlamayı yönetir.`,
          ],
          bullets: [
            `Boiler water testi (pH, klorür, kondaktivite)`,
            `Kimyasal dozajlama`,
            `Bottom/surface blow-down`,
            `Feed water / kondensat kalitesi`,
          ],
        },
        {
          subheading: "1.2 Safety valve ve flame failure",
          paragraphs: [
            `Kazan safety valve'i, aşırı basınca karşı son güvencedir ve düzenli test edilir/ayarlanır. Flame failure device, alev kaybında yakıtı keserek patlamayı önler. İkinci Mühendis bu güvenlik cihazlarının çalışırlığını doğrular; biri arızalıysa kazan güvenle çalıştırılamaz.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Safety valve hayatidir",
              text: `Bir kazan safety valve'i veya flame failure cihazı devre dışıysa, aşırı basınç veya yakıt birikimi patlamaya yol açabilir. Bu güvenlik cihazları asla baypas edilmez.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Separatör (Purifier) Bakımı",
      sections: [
        {
          subheading: "2.1 Overhaul ve backwash",
          paragraphs: [
            `Yakıt/yağ separatörleri (purifier), su ve katı partikülleri ayırarak temiz yakıt/yağ sağlar. İkinci Mühendis, bowl/disc temizliği, conta değişimi ve overhaul'u planlar; doğru gravity disc seçimi ve operasyon parametreleri kritiktir. Backwash/desludge sistemi düzenli kontrol edilir.`,
          ],
          table: {
            caption: "Purifier bakım noktaları",
            headers: ["Öğe", "Kontrol"],
            rows: [
              ["Bowl/disc seti", "Temizlik, aşınma, conta"],
              ["Gravity disc", "Doğru boyut (yoğunluğa göre)"],
              ["Desludge", "Otomatik boşaltma çalışıyor mu"],
              ["Sıcaklık/akış", "Operasyon parametreleri"],
            ],
          },
        },
        {
          subheading: "2.2 Verimin önemi",
          paragraphs: [
            `Bakımsız bir purifier, su/partikül geçişine ve makine yakıt sistemi aşınmasına yol açar. İyi bakımlı separatör, yakıt kalitesini ve dolayısıyla ana makine sağlığını doğrudan korur.`,
          ],
        },
      ],
    },
    {
      heading: "3. Hava Kompresörü",
      sections: [
        {
          subheading: "3.1 Valf, cooler, safety",
          paragraphs: [
            `Start hava kompresörleri, ana makine startı için basınçlı hava sağlar. İkinci Mühendis; valf bakımı, intercooler/aftercooler temizliği, otomatik drain ve safety device (relief valve, fusible plug) kontrollerini yönetir. Aşırı sıcaklık ve yağ taşınması, hava şişelerinde patlama riski yaratabilir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Air bottle drain",
              text: `Basınçlı hava şişeleri düzenli drenajlanmalı (su/yağ); aksi halde korozyon ve start havasında nem sorunu olur. Relief valve ve fusible plug kontrolü güvenlik için şarttır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Planlama ve Koordinasyon",
      sections: [
        {
          subheading: "4.1 PMS ve liman penceresi",
          paragraphs: [
            `İkinci Mühendis, yardımcı sistem bakımlarını PMS takvimine ve operasyon programına göre planlar; bazı bakımlar ekipman durdurularak yapıldığından liman/seyir penceresine göre zamanlanır. Yedek parça ve takım önceden hazırlanır.`,
          ],
        },
      ],
    },
    {
      heading: "5. Güvenlik",
      sections: [
        {
          subheading: "5.1 LOTO ve basınç",
          paragraphs: [
            `Yardımcı sistemlerde bakım öncesi LOTO uygulanır, basınç boşaltılır ve sıcak yüzeyler soğutulur. Kazan ve basınçlı sistemler özel dikkat ister; izolasyon doğrulanmadan müdahale edilmez.`,
          ],
        },
      ],
    },
    {
      heading: "6. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "6.1 Yardımcı sistem bakım kontrolü",
          bullets: [
            `Boiler water testi/dozaj ve blow-down yapıldı mı?`,
            `Kazan safety valve ve flame failure test edildi mi?`,
            `Purifier overhaul/desludge ve doğru gravity disc sağlandı mı?`,
            `Hava kompresörü valf/cooler/drain ve safety device kontrol edildi mi?`,
            `Bakımlar PMS ve operasyon penceresine göre planlandı mı?`,
            `Bakım öncesi LOTO/basınç boşaltma uygulandı mı?`,
          ],
          paragraphs: [
            `Kazan, separatör ve hava kompresörü bakımı, İkinci Mühendisin makine dairesini güvenli ve verimli tutan günlük disiplinidir. Doğru su şartlandırma, çalışan güvenlik cihazları ve bakımlı yardımcı sistemler; hem emniyeti hem ana makine sağlığını birlikte korur.`,
          ],
        },
      ],
    },
  ],
};

export default content;
