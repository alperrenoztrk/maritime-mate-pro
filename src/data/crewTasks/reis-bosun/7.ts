import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Acemilik eğitimi ve yeni personel desteği",
  roleSlug: "reis-bosun",
  taskIndex: 7,
  estimatedPages: 22,
  intro: `Güverte ekibine yeni katılan tayfalar, hem en az deneyime sahip hem de en yüksek kaza riski taşıyan kişilerdir. Reis (Bosun), bu yeni personele pratik işleri öğretir, güvenli çalışma alışkanlıklarını kazandırır ve ekibe entegrasyonlarını sağlar. Özellikle yüksek riskli işlerde (overside work, working aloft, enclosed space, mooring) deneyimsiz personelin gözetim altında çalışmasını güvence altına alır. Bu bölüm acemilik eğitimi ve yeni personel desteğini ele alır.`,
  sources: [
    "ISM Code — familiarization ve eğitim gereklilikleri",
    "STCW — onboard training ve yetkinlik",
    "Code of Safe Working Practices (COSWP)",
    "MLC 2006 — çalışma koşulları ve eğitim",
    "Şirket SMS — familiarization checklist",
  ],
  chapters: [
    {
      heading: "1. Yeni Personel Riski",
      sections: [
        {
          subheading: "1.1 En riskli grup",
          paragraphs: [
            `Yeni katılan tayfa; gemiyi, ekipmanı ve riskleri tam tanımaz. Bu yüzden kaza istatistiklerinde yeni personel öne çıkar. Reis, bu kişilere doğru başlangıcı yaptırmanın hem onların hayatını hem tüm ekibin güvenliğini koruduğunu bilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "İlk haftalar kritik",
              text: `Bir geminin ve ekibin alışkanlıklarını henüz bilmeyen yeni personel, ilk haftalarda en yüksek risk altındadır. Bu dönemde gözetim ve eğitim, kaza önlemenin en etkili yoludur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Familiarization",
      sections: [
        {
          subheading: "2.1 Gemiyi tanıtma",
          paragraphs: [
            `Yeni personel; muster station, can kurtarma ve yangın ekipmanı yerleri, kaçış yolları, alarm sinyalleri ve temel emniyet kuralları konusunda gemiye geldiği ilk gün bilgilendirilir (familiarization). Reis, güverte tarafındaki pratik tanıtımı yapar ve checklist'i tamamlar.`,
          ],
          bullets: [
            `Muster station ve alarm sinyalleri`,
            `LSA/FFE ekipman yerleri`,
            `Kaçış yolları ve toplanma`,
            `Temel güverte güvenlik kuralları`,
          ],
        },
      ],
    },
    {
      heading: "3. Pratik İş Eğitimi",
      sections: [
        {
          subheading: "3.1 İşi göstererek öğretmek",
          paragraphs: [
            `Reis; halat işleri, raspa-boya, ekipman kullanımı ve güverte rutinlerini göstererek öğretir. "Önce izle, sonra gözetimde yap, sonra tek başına" yaklaşımı, güvenli yetkinlik kazandırmanın en sağlam yoludur. Yeni personel, soru sormaya teşvik edilir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Sabır öğretir",
              text: `Acele ettirilen veya azarlanan yeni personel hata yapar ve sormaktan çekinir. Sabırlı, göstererek öğreten bir reis; hem güvenli hem yetkin bir tayfa yetiştirir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Yüksek Riskli İşlerde Gözetim",
      sections: [
        {
          subheading: "4.1 Gözetimsiz bırakmamak",
          paragraphs: [
            `Overside work, working aloft, enclosed space ve mooring gibi yüksek riskli işlerde deneyimsiz personel asla tek başına çalıştırılmaz. Reis, bu kişileri deneyimli bir ekip üyesiyle eşler ve doğrudan gözetir. Yetkinlik kanıtlanana kadar gözetim sürer.`,
          ],
          table: {
            caption: "Yüksek riskli işler ve gözetim",
            headers: ["İş", "Gözetim"],
            rows: [
              ["Working aloft/overside", "Doğrudan gözetim + lifeline"],
              ["Enclosed space", "Standby + permit, asla tek değil"],
              ["Mooring", "Deneyimli eşle, snap-back eğitimi"],
              ["Hot work", "Permit + fire watch"],
            ],
          },
        },
      ],
    },
    {
      heading: "5. Ekibe Entegrasyon",
      sections: [
        {
          subheading: "5.1 Takımın parçası yapmak",
          paragraphs: [
            `Reis, yeni personeli ekibe katar; görev dağılımını, ekip içi iletişimi ve gemi kültürünü tanıtır. İyi entegre olmuş bir tayfa, kendini güvende hisseder, sorununu paylaşır ve daha güvenli çalışır. Dışlanan veya yalnız bırakılan personel, hem mutsuz hem riskli olur.`,
          ],
        },
      ],
    },
    {
      heading: "6. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "6.1 Yeni personel desteği kontrolü",
          bullets: [
            `Familiarization (muster/LSA/FFE/kaçış) ilk gün yapıldı mı?`,
            `Pratik işler gösterilerek öğretiliyor mu?`,
            `Soru sorma teşvik ediliyor mu?`,
            `Yüksek riskli işlerde gözetim sağlanıyor mu?`,
            `Yetkinlik kanıtlanana kadar tek başına çalıştırılmıyor mu?`,
            `Yeni personel ekibe entegre ediliyor mu?`,
          ],
          paragraphs: [
            `Acemilik eğitimi ve yeni personel desteği, Reisin liderliğinin en değerli yatırımıdır; bugün doğru öğretilen bir tayfa, yarın güvenli ve yetkin bir ekip üyesidir. Sabırlı eğitim, sıkı gözetim ve içten entegrasyon; hem bireyin hayatını hem ekibin güvenliğini birlikte korur.`,
          ],
        },
      ],
    },
  ],
};

export default content;
