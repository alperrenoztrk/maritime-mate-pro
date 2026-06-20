import type { ShipOpLongForm } from "../../types";

const content: ShipOpLongForm = {
  title: "Yük planı hazırlama ve revizyon (loading/discharge)",
  shipType: "tanker",
  dept: "guverte",
  opIndex: 0,
  estimatedPages: 24,
  intro: `Tanker yük planı (cargo plan), charter party ve cargo nomination'da tanımlanan parsellerin hangi tanklara, hangi sırayla ve hangi rate ile yükleneceğini/boşaltılacağını gösteren ana operasyon dokümanıdır. İyi hazırlanmış bir plan; gemi mukavemet ve stabilite limitlerini her ara aşamada korur, kargo ayrımını (segregation) garanti eder, terminal rate limitlerine uyar ve slack tank sayısını minimumda tutar. Bu bölüm planın hazırlığını, loadicator ile doğrulanmasını, terminal/Master ile mutabakatını ve operasyon boyunca revizyonunu adım adım ele alır.`,
  sources: [
    "ISGOTT 6th edition — Ch. 11 (Cargo Operations)",
    "MARPOL Annex I Reg. 26 — SOPEP",
    "IS Code 2008 — Intact Stability",
    "OCIMF Mooring Equipment Guidelines (MEG4)",
    "P&A Manual (kimyasal tankerler için)",
  ],
  chapters: [
    {
      heading: "1. Planın Girdileri ve Ön Değerlendirme",
      sections: [
        {
          subheading: "1.1 Charter party ve cargo nomination",
          paragraphs: [
            `Yük planının başlangıç noktası charter party şartları ile cargo nomination'dır. Nomination; parsel sayısını, her parselin miktarını (bbl/MT), API/density'sini, sıcaklık gereksinimini ve yükleme/boşaltma limanı sırasını belirtir. Birinci Zabit bu bilgileri tank kapasite tablosu (sounding/ullage tables) ile karşılaştırarak hangi parselin hangi tank grubuna sığacağını çıkarır.`,
            `Multi-grade (çoklu parsel) yüklerde her parselin ayrı bir cargo system (pompa, hat, valf seti) ile taşınması ve karışmayı (commingling) önleyecek şekilde ayrılması (segregation) zorunludur. Slop tank ve ara tank kullanımı planın bütünlüğünü etkiler.`,
          ],
          bullets: [
            `Parsel miktarı, API/density ve sıcaklık gereksinimi`,
            `Yükleme/boşaltma limanı sırası (discharge order)`,
            `Segregation gereksinimi (valf/hat ayrımı)`,
            `Tank coating uyumu (kimyasal/ürün tankerleri)`,
            `Maksimum yükleme limiti (%98 dolum + ullage payı)`,
          ],
        },
        {
          subheading: "1.2 Maksimum dolum limiti ve genleşme payı",
          paragraphs: [
            `Tanklar asla %100 doldurulmaz; ısınma kaynaklı genleşmeye (thermal expansion) karşı pay bırakılır. Tipik olarak %98 dolum hedeflenir ve genleşme oranı kargonun cinsine, yükleme sıcaklığına ve seyir boyunca beklenen sıcaklık artışına göre hesaplanır. Aşırı dolum overflow ve MARPOL ihlali riskini doğurur.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Overflow riski",
              text: `Topping-up aşamasında yüksek rate ile çalışılırsa overflow ve deniz kirliliği kaçınılmazdır. Plan, son %10'da rate düşürmeyi açıkça tanımlamalıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Loadicator ile Mukavemet ve Stabilite Doğrulaması",
      sections: [
        {
          subheading: "2.1 Adım adım simülasyon",
          paragraphs: [
            `Yük planının her ara aşaması (her tank dolum kademesi) loadicator/loading computer üzerinde simüle edilir. Her adımda shear force (SF), bending moment (BM), trim, draft (FP/AP/Mid), GM ve liste değerleri kontrol edilir. Değerler harbour ve seagoing limitlerinin altında tutulur; %85 üzeri alarm bandı revizyon işaretidir.`,
            `Slack (yarı dolu) tanklar serbest yüzey etkisi (free surface effect, FSC) ile GM'yi düşürür. Plan, slack tank sayısını mümkün olduğunca azaltacak ve aynı anda birden fazla tankı slack bırakmayacak şekilde kurgulanır.`,
          ],
          table: {
            caption: "Her yükleme adımında kontrol edilen parametreler",
            headers: ["Parametre", "Limit", "Alarm bandı"],
            rows: [
              ["Shear Force", "< harbour SF limiti", "> %85"],
              ["Bending Moment", "< harbour BM limiti", "> %85"],
              ["GM (FSC dahil)", "> min IS Code", "azalan trend"],
              ["Liste", "< 0.5°", "> 1°"],
              ["Draft", "< izin verilen max", "UKC payı"],
            ],
          },
        },
        {
          subheading: "2.2 Damage stability ve final kondisyon",
          paragraphs: [
            `Final kondisyon yalnız intact değil, MARPOL Annex I Reg. 28 kapsamında damage stability kriterlerini de sağlamalıdır. Loadicator damage case modülü ile yan/dip yaralanma senaryoları kontrol edilir. Çıktılar (print-out) saklanır; PSC ve SIRE inspeksiyonlarında istenebilir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "IS Code 2008",
              text: `Yüklemenin hiçbir ara aşamasında intact stability kriterleri ihlal edilemez; "araya gelen" bir adımda dahi GZ eğrisi ve alan kriterleri sağlanmalıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Yükleme Sırası ve Rate Planı",
      sections: [
        {
          subheading: "3.1 Initial – bulk – topping-up",
          paragraphs: [
            `Yükleme üç aşamada planlanır: initial (düşük rate, hat doldurma ve static elektrik kontrolü), bulk (terminal limitine kadar tam rate) ve topping-up (final ullage'a yaklaşırken düşürülen rate). Topping-up sırası, hangi tankın en son kapatılacağını ve son ullage ölçümünün nasıl yapılacağını tanımlar.`,
          ],
          bullets: [
            `Initial: ilk 30 dk düşük rate, static elektrik kontrolü`,
            `Bulk: terminal max rate, IGS pozitif basınç korunur`,
            `Topping-up: %90 sonrası rate düşürülür, manuel ullage`,
            `Line clearing: hat kalıntısı son tanka basılır`,
          ],
        },
        {
          subheading: "3.2 Discharge planı ve stripping",
          paragraphs: [
            `Boşaltma planı; pompa line-up'ını, terminal rate limitini, MARPOL ihlali olmadan tank stripping'i ve ROB (remaining on board) ölçümünü içerir. Discharge sonunda eductor/stripping pompası ile dipler süpürülür ve hatlar boşaltılır.`,
          ],
        },
      ],
    },
    {
      heading: "4. Terminal ve Master ile Mutabakat",
      sections: [
        {
          subheading: "4.1 Pre-transfer toplantısı",
          paragraphs: [
            `Plan, terminal temsilcisi ile pre-transfer toplantısında karşılıklı gözden geçirilir; rate limitleri, ESD prosedürü, iletişim kanalları ve acil durdurma kriterleri mutabık kalınır. Master nihai onayı verir ve plan tüm yük zabitlerine brifing edilir. Brifinge katılan herkes imzalar.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Tek dil, tek plan",
              text: `Terminal ve gemi farklı birim (bbl/MT) kullanıyorsa dönüşümler önceden netleştirilir; yanlış birim, topping-up'ta sürpriz overflow yaratır.`,
            },
          ],
        },
        {
          subheading: "4.2 Revizyon yönetimi",
          paragraphs: [
            `Operasyon sırasında parsel değişikliği, rate kısıtı veya kontaminasyon şüphesi olursa plan revize edilir; loadicator yeniden çalıştırılır ve revize plan tekrar onaylanır. Her revizyon tarih/saat ile kayıt altına alınır.`,
          ],
        },
      ],
    },
    {
      heading: "5. Kayıt, Belge ve Denetim",
      sections: [
        {
          subheading: "5.1 Tutulması gereken kayıtlar",
          paragraphs: [
            `Onaylı cargo plan, loadicator çıktıları, ullage raporları ve değişiklik kayıtları dosyalanır. Bu kayıtlar hem dahili denetim hem de SIRE/CDI/PSC inspeksiyonları için kanıt niteliğindedir.`,
          ],
          bullets: [
            `Master onaylı Cargo Plan`,
            `Loadicator print-out (her ara aşama)`,
            `Ullage Report ve sıcaklık/density kayıtları`,
            `Pre-transfer / Ship-Shore Safety Checklist`,
          ],
        },
        {
          subheading: "5.2 Sık yapılan hatalar",
          bullets: [
            `Aynı anda birden fazla slack tank bırakmak (FSC ile GM düşüşü)`,
            `Topping-up rate'ini zamanında düşürmemek (overflow)`,
            `Segregation valflerini teyit etmeden yüklemeye başlamak`,
            `Loadicator ara aşamalarını atlayıp sadece final kondisyona bakmak`,
          ],
        },
      ],
    },
    {
      heading: "6. Sonuç ve Kontrol Listesi",
      sections: [
        {
          subheading: "6.1 Plan onayı öncesi son kontrol",
          bullets: [
            `Nomination ↔ tank kapasitesi uyumu doğrulandı mı?`,
            `Her ara aşama loadicator'da SF/BM/GM limitleri içinde mi?`,
            `Slack tank sayısı minimumda mı?`,
            `Segregation hat/valf ayrımı plana yansıdı mı?`,
            `Topping-up rate düşürme noktaları tanımlı mı?`,
            `Terminal + Master onayı ve brifing imzaları tam mı?`,
          ],
          paragraphs: [
            `İyi bir yük planı sadece "ne kadar yükleneceğini" değil, "her an gemiye ne olduğunu" gösterir; bu yüzden ara aşama doğrulaması, final kondisyondan daha kritiktir.`,
          ],
        },
      ],
    },
  ],
};

export default content;
