import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Stabilite ve yük hesabına eğitim katılımı",
  roleSlug: "guverte-stajyer",
  taskIndex: 8,
  estimatedPages: 23,
  intro: `Geminin yüzer ve dengede kalması rastlantı değil, dikkatli bir stabilite ve yük hesabının sonucudur. Güverte stajyeri, Birinci Zabit gözetiminde loading calculator/stability software ile basit yükleme senaryoları çalışır; GM ve trim hesaplarını takip eder, free surface effect ve bending moment kavramlarını pratiğe döker. Draft survey gözlemi ve hidrostatik tablo okumayı öğrenir. Bu bölüm stajyerin stabilite ve yük hesabına eğitim katılımını ele alır.`,
  sources: [
    "IMO 2008 Intact Stability (IS) Code",
    "SOLAS Chapter VI — yük taşıma",
    "Gemi stabilite kitabı (Stability Booklet) ve hidrostatik tablolar",
    "Loading computer / stability software el kitapları",
    "Draft survey pratiği",
  ],
  chapters: [
    {
      heading: "1. Stabilitenin Önemi",
      sections: [
        {
          subheading: "1.1 Neden hayati?",
          paragraphs: [
            `Yetersiz stabilite alabora; aşırı stabilite (stiff) sert yalpa ve lashing yükü; yanlış mukavemet dağılımı gövde hasarı demektir. Stajyer, stabilitenin "soyut bir hesap" değil, geminin hayatta kalmasının temeli olduğunu öğrenir. Birçok deniz kazası, stabilite/yük hatasından kaynaklanmıştır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "IS Code",
              text: `IMO Intact Stability Code, gemi tipine göre minimum stabilite kriterleri (GM, GZ eğrisi) belirler. Yükleme bu kriterleri her aşamada sağlamalıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Temel Kavramlar",
      sections: [
        {
          subheading: "2.1 GM, trim, list",
          paragraphs: [
            `Stajyer; GM (metasantr yüksekliği — başlangıç stabilitesinin ölçüsü), trim (baş-kıç draft farkı) ve list (yan eğim) kavramlarını öğrenir. Düşük GM "tender" (yumuşak), yüksek GM "stiff" (sert) gemi yaratır; ikisinin de riskleri vardır. Optimum aralık hem güvenlik hem konfor hem yük emniyeti sağlar.`,
          ],
          table: {
            caption: "Temel stabilite kavramları",
            headers: ["Kavram", "Anlam"],
            rows: [
              ["GM", "Başlangıç stabilitesi ölçüsü"],
              ["Trim", "Baş-kıç draft farkı"],
              ["List", "Yan eğim"],
              ["FSE", "Serbest yüzey etkisi (GM düşürür)"],
            ],
          },
        },
        {
          subheading: "2.2 Free surface effect",
          paragraphs: [
            `Kısmen dolu bir tanktaki sıvının hareketi (free surface effect), etkin GM'yi düşürerek stabiliteyi azaltır. Stajyer, bu yüzden tankların mümkün olduğunca "press up" (tam dolu) veya boş tutulduğunu ve kısmen dolu tank sayısının sınırlandığını öğrenir.`,
          ],
        },
      ],
    },
    {
      heading: "3. Mukavemet: Bending Moment",
      sections: [
        {
          subheading: "3.1 Sagging ve hogging",
          paragraphs: [
            `Yük dağılımı, gövde boyunca bending moment (eğilme momenti) ve shear force yaratır. Orta kısma ağır yük sagging (çökme), uçlara ağır yük hogging (kamburlaşma) eğilimi verir; ikisi de gövdeyi yorar. Stajyer, loading computer'ın bu değerleri %100 limit altında tuttuğunu öğrenir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Mukavemet limiti aşılamaz",
              text: `Stabilite uygun olsa bile bending moment/shear force limiti aşılırsa gövde hasar görebilir, hatta kırılabilir. Yükleme her aşamada hem stabilite hem mukavemet limitlerini sağlamalıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Yazılım ve Hesap",
      sections: [
        {
          subheading: "4.1 Loading computer pratiği",
          paragraphs: [
            `Stajyer, Birinci Zabit gözetiminde loading computer/stability software ile basit senaryolar çalışır: tank/ambar yüklerini girer, GM/trim/draft ve mukavemet çıktısını okur. Hidrostatik tablolardan deplasman, TPC, MCT gibi değerleri okumayı öğrenir; yazılımın "neyi hesapladığını" anlamak kritiktir.`,
          ],
          bullets: [
            `Yük/tank verisini girme`,
            `GM/trim/draft çıktısını okuma`,
            `Bending moment/shear force kontrolü`,
            `Hidrostatik tablo okuma`,
          ],
        },
      ],
    },
    {
      heading: "5. Draft Survey Gözlemi",
      sections: [
        {
          subheading: "5.1 Yük miktarı doğrulama",
          paragraphs: [
            `Draft survey, draft okumaları ve hidrostatik veriyle yüklenen/boşaltılan yük miktarını hesaplar. Stajyer, draft okuma, su yoğunluğu düzeltmesi ve hesap mantığını gözlemleyerek öğrenir. Bu, hem ticari hem stabilite açısından önemli bir beceridir.`,
          ],
        },
      ],
    },
    {
      heading: "6. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "6.1 Stabilite/yük öğrenme kontrolü",
          bullets: [
            `GM/trim/list kavramları öğrenildi mi?`,
            `Free surface effect ve etkisi kavrandı mı?`,
            `Bending moment/shear force (sagging/hogging) anlaşıldı mı?`,
            `Loading computer ile basit senaryo çalışıldı mı?`,
            `Hidrostatik tablo okuma öğrenildi mi?`,
            `Draft survey gözlemi yapıldı mı?`,
          ],
          paragraphs: [
            `Stabilite ve yük hesabına eğitim katılımı, güverte stajyerinin geminin fiziğini anlamaya başladığı kritik alandır. GM, trim, free surface ve mukavemet kavramlarını pratikte görmek; stajyeri ileride güvenli yükleme kararları alacak bir zabite hazırlar.`,
          ],
        },
      ],
    },
  ],
};

export default content;
