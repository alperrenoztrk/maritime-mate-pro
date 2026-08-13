import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Kapalı mekan girişi (enclosed space entry) için ekip hazırlığı",
  roleSlug: "reis-bosun",
  taskIndex: 9,
  estimatedPages: 25,
  intro: `Kapalı mekânlara giriş — cargo hold, ballast tank, void space, cofferdam, pump room — SOLAS ve ISM açısından gemideki en ölümcül risk taşıyan işlerden biridir; her yıl denizciler, fark edilmeyen düşük oksijen veya zehirli gaz nedeniyle bu mekânlarda hayatını kaybeder. Reis (Bosun), Birinci Zabitten alınan Enclosed Space Entry Permit'e uygun olarak ekibi hazırlar: standby kişi atama, atmosfer ölçümü, SCBA/SAA hazırlığı, kurtarma hattı ve sürekli iletişim. Bu bölüm kapalı mekan girişi için ekip hazırlığını ele alır.`,
  sources: [
    "IMO Resolution A.1050(27) — entering enclosed spaces",
    "SOLAS Chapter III Regulation 19 — enclosed space drills",
    "ISM Code — permit to work ve risk assessment",
    "Code of Safe Working Practices (COSWP)",
    "Şirket SMS — enclosed space entry prosedürü",
  ],
  chapters: [
    {
      heading: "1. Neden En Ölümcül İş?",
      sections: [
        {
          subheading: "1.1 Görünmez tehlike",
          paragraphs: [
            `Kapalı mekânlardaki tehlike görünmez ve kokusuzdur: oksijen yetersizliği, zehirli gaz (H2S, CO) veya yanıcı gaz birikimi. İnsan, düşük oksijende uyarı almadan saniyeler içinde bilincini kaybeder. Bu yüzden "iyi görünen" bir tank bile ölümcül olabilir; giriş yalnızca test ve izinle yapılır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Kurtarmaya koşan ikinci kurban",
              text: `Kapalı mekan ölümlerinin trajik bir kalıbı, "arkadaşımı kurtarayım" diyerek hazırlıksız giren ikinci (ve üçüncü) kişinin de ölmesidir. Standby kişi ASLA içeri koşmaz; alarm verir ve kurtarma ekibini bekler.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Permit ve Hazırlık",
      sections: [
        {
          subheading: "2.1 Entry permit'e uyum",
          paragraphs: [
            `Giriş, Birinci Zabitten alınan Enclosed Space Entry Permit ile yapılır. Reis; permit şartlarını ekibe aktarır, havalandırmayı sağlar, atmosfer ölçümünü organize eder ve hiçbir adım atlanmadan girişe geçilmesini güvence altına alır. Permit'siz giriş kesinlikle yasaktır.`,
          ],
          bullets: [
            `Geçerli entry permit ve risk değerlendirmesi`,
            `Havalandırma (giriş öncesi ve süresince)`,
            `Atmosfer ölçümü (O2, HC, H2S, CO)`,
            `Standby kişi ve kurtarma planı`,
            `İletişim ve aydınlatma`,
          ],
        },
      ],
    },
    {
      heading: "3. Atmosfer Ölçümü",
      sections: [
        {
          subheading: "3.1 Ölçüm ve süreklilik",
          paragraphs: [
            `Girişten önce ve giriş boyunca atmosfer ölçülür: oksijen (%20.9 hedef), yanıcı gaz (LEL), H2S ve CO. Ölçüm cihazı kalibrasyonlu olmalı ve farklı seviyelerde (üst/orta/alt) ölçüm yapılmalıdır; bazı gazlar dipte, bazıları üstte birikir. Reis, ölçümün doğru yapıldığını gözetir.`,
          ],
          table: {
            caption: "Atmosfer kabul kriterleri (genel)",
            headers: ["Parametre", "Güvenli değer"],
            rows: [
              ["Oksijen (O2)", "~20.9%"],
              ["Yanıcı gaz (LEL)", "%0 (giriş için)"],
              ["H2S", "Eşik altı (örn. <5 ppm)"],
              ["CO", "Eşik altı (örn. <30 ppm)"],
            ],
          },
        },
        {
          subheading: "3.2 Kişisel gaz dedektörü",
          paragraphs: [
            `Giren personel, sürekli okuyan kişisel gaz dedektörü taşır; atmosfer bozulursa alarm verir ve derhal çıkılır. Sabit ölçüm tek seferlik değildir; koşullar değişebilir, bu yüzden izleme süreklidir.`,
          ],
        },
      ],
    },
    {
      heading: "4. Standby, Kurtarma ve İletişim",
      sections: [
        {
          subheading: "4.1 Standby kişi",
          paragraphs: [
            `Menhol/kapı başında bir standby kişi sürekli bulunur; giren personelle sürekli iletişim kurar ve durumu izler. Bir sorun olursa içeri koşmaz, alarm verir ve hazır kurtarma ekibini/SCBA'yı devreye sokar. Kurtarma hattı (lifeline) ve harness, giren personelin dışarı çekilebilmesini sağlar.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Kurtarma hazır olmalı",
              text: `Giriş öncesi kurtarma planı ve ekipmanı (SCBA, lifeline, tripod/winch) hazır olmalıdır. "Sorun çıkarsa düşünürüz" yaklaşımı, kapalı mekanda hayat kaybettirir.`,
            },
          ],
        },
        {
          subheading: "4.2 SCBA / SAA",
          paragraphs: [
            `Atmosferi şüpheli veya solunamaz mekânlarda SCBA (kendi hava beslemeli) veya SAA (hava hattı beslemeli) kullanılır. Reis, bu ekipmanın hazır, dolu ve doğru kullanıldığını denetler.`,
          ],
        },
      ],
    },
    {
      heading: "5. Tatbikat",
      sections: [
        {
          subheading: "5.1 Enclosed space rescue drill",
          paragraphs: [
            `SOLAS III/19.3.3, giriş veya kurtarma görevi bulunan personel için en az iki ayda bir enclosed space entry ve rescue drill zorunlu kılar. Reis, ekibin gerçekçi kurtarma senaryosunu tatbik etmesini sağlar; çünkü gerçek bir olayda doğru ve hızlı kurtarma ancak tatbik edilmiş bir refleksle mümkündür.`,
          ],
        },
      ],
    },
    {
      heading: "6. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "6.1 Enclosed space entry kontrolü",
          bullets: [
            `Geçerli entry permit ve risk değerlendirmesi var mı?`,
            `Havalandırma giriş öncesi ve süresince sağlanıyor mu?`,
            `Atmosfer (O2/LEL/H2S/CO) ölçüldü ve sürekli izleniyor mu?`,
            `Kişisel gaz dedektörü ile mi giriliyor?`,
            `Standby kişi atandı; içeri koşmaması anlaşıldı mı?`,
            `Kurtarma planı, lifeline/harness ve SCBA hazır mı?`,
            `İletişim sürekli ve aydınlatma yeterli mi?`,
          ],
          paragraphs: [
            `Kapalı mekan girişi hazırlığı, Reisin "tek bir atlanan adımın ölüm demek olduğu" en ciddi görevidir. Permit'e tam uyum, sürekli atmosfer ölçümü, içeri koşmayan bir standby ve hazır kurtarma; bu görünmez tehlikeyi kontrol altına alıp ekibin sağ çıkmasını güvence altına alır.`,
          ],
        },
      ],
    },
  ],
};

export default content;
