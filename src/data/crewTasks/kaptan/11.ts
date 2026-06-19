import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Deniz protestu (sea protest) ve noter bildirimi",
  roleSlug: "kaptan",
  taskIndex: 11,
  estimatedPages: 23,
  intro: `Deniz protestu (sea protest / noting protest), ağır hava, çatışma, karaya oturma, yük hasarı veya kıyı tesisi hasarı gibi olaylardan sonra kaptanın noter (veya yetkili makam) huzurunda yaptığı resmi beyandır. Amacı; gemi/mürettebatın elinde olmayan koşulları kayda geçirerek olası sorumluluk iddialarına karşı kanıt oluşturmak ve sigorta/hukuk süreçlerini desteklemektir. Bu bölüm sea protest sürecini, zamanlamasını ve P&I koordinasyonunu açıklar.`,
  sources: [
    "Deniz ticaret hukuku — sea protest / noting protest pratiği",
    "P&I Club kuralları ve bildirim prosedürleri",
    "York-Antwerp Rules — general average",
    "ISM Code — olay raporlama ve kayıt",
    "Ship's log / official log book delil değeri",
  ],
  chapters: [
    {
      heading: "1. Deniz Protestunun Amacı",
      sections: [
        {
          subheading: "1.1 Neden protest tutulur?",
          paragraphs: [
            `Sea protest, geminin uğradığı veya yol açabileceği bir zararda, koşulların (ör. fırtına, force majeure) gemi/mürettebatın kontrolü dışında olduğunu resmî olarak beyan eder. Bu, ileride yöneltilebilecek tazminat taleplerine karşı erken bir kanıt zemini oluşturur ve geminin pozisyonunu korur.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "Hukuki ağırlık",
              text: `Sea protest tek başına sorumluluğu ortadan kaldırmaz; ancak zamanında, doğru ve log kayıtlarıyla tutarlı yapıldığında savunmanın güçlü bir parçası olur ve sigortacı/avukat için değerli bir kayıttır.`,
            },
          ],
        },
        {
          subheading: "1.2 Tipik protest gerektiren olaylar",
          paragraphs: [
            `Ağır hava ve yük hasarı, çatışma, karaya oturma, kıyı tesisi/rıhtım hasarı, demir tarama, beklenmedik gecikme veya yük tahliyesinde anlaşmazlık gibi durumlar protest gerektirebilir. Şüphede, P&I/şirket danışmanlığıyla protest tutulması güvenli yoldur.`,
          ],
        },
      ],
    },
    {
      heading: "2. Zamanlama",
      sections: [
        {
          subheading: "2.1 İlk fırsatta",
          paragraphs: [
            `Protest, genellikle limana varıştan sonra mümkün olan en kısa sürede (sıklıkla 24 saat içinde) yetkili makam/noter huzurunda yapılır. Gecikme, beyanın değerini zayıflatır. Gerektiğinde "with reservation to extend" ifadesiyle, tam hasar bilinmeden protest tutulup sonradan genişletilebilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Geç protest = zayıf delil",
              text: `Olaydan günler sonra tutulan veya log kayıtlarıyla çelişen protest, karşı tarafça kolayca sorgulanır. Erken ve tutarlı beyan esastır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Hazırlık ve İçerik",
      sections: [
        {
          subheading: "3.1 Olay günlüğü ve kanıt",
          paragraphs: [
            `Protest, deck/official log book kayıtlarına, hava verisine (barometre, rüzgâr, deniz durumu), seyir kayıtlarına ve gerektiğinde tanık ifadelerine dayanır. Kaptan; olay anının zaman çizelgesini, alınan tedbirleri ve koşulları net biçimde belgeler.`,
          ],
          bullets: [
            `Log kayıtları ve zaman çizelgesi`,
            `Hava/deniz verileri ve weather reports`,
            `Fotoğraf/video ve hasar gözlemi`,
            `Tanık ifadeleri (mürettebat)`,
            `İlgili sertifika ve mevki kayıtları`,
          ],
        },
        {
          subheading: "3.2 Beyanın tutarlılığı",
          paragraphs: [
            `Protest metni, log ve diğer kayıtlarla birebir tutarlı olmalıdır. Çelişki, hem protestun hem de geminin genel güvenilirliğini zedeler. Bu yüzden beyan, kayıtlara dayanılarak dikkatle hazırlanır.`,
          ],
        },
      ],
    },
    {
      heading: "4. P&I ve Sigorta Koordinasyonu",
      sections: [
        {
          subheading: "4.1 Erken bildirim",
          paragraphs: [
            `Olay sonrası P&I Club (sorumluluk sigortası) ve gerektiğinde H&M sigortacısı en kısa sürede bilgilendirilir. Club, surveyor atanması, hukuki temsil ve protest stratejisi konusunda yönlendirir. Kaptan, Club correspondent'i ile koordineli hareket eder.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "Bildirim yükümlülüğü",
              text: `Sigorta/Club kuralları çoğu olayda derhal bildirim gerektirir; gecikme teminatı riske atabilir. Kaptanın hızlı bildirimi hem hukuki hem sigorta süreçlerinin doğru başlamasını sağlar.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. General Average ve Özel Durumlar",
      sections: [
        {
          subheading: "5.1 Müşterek avarya bağlantısı",
          paragraphs: [
            `Geminin ve yükün ortak kurtarılması için bilinçli fedakârlık yapıldıysa (general average), York-Antwerp Rules çerçevesinde süreç işler ve protest bu sürecin kanıt zincirine katkı sağlar. Salvage, towage gibi durumlarda da protest ve kayıtlar kritik öneme sahiptir.`,
          ],
        },
      ],
    },
    {
      heading: "6. Letter of Protest ile Farkı",
      sections: [
        {
          subheading: "6.1 İki farklı belge",
          paragraphs: [
            `Sea protest, noter/makam huzurunda yapılan resmî beyandır. Letter of Protest (LOP) ise terminal/charterer/karşı tarafa verilen, belirli bir duruma (yavaş yükleme, hasarlı yük, ölçüm anlaşmazlığı) itiraz eden yazıdır. Kaptan ikisini karıştırmaz; her ikisini de yerinde ve zamanında kullanır.`,
          ],
        },
      ],
    },
    {
      heading: "7. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "7.1 Sea protest kontrolü",
          bullets: [
            `Olay protest gerektiriyor mu (hasar/force majeure/anlaşmazlık)?`,
            `Log ve kanıtlar (hava, mevki, tanık) toplandı mı?`,
            `Varıştan sonra ilk fırsatta noter/makama başvuruldu mu?`,
            `Beyan log kayıtlarıyla tutarlı mı?`,
            `"Reservation to extend" gerekiyor mu?`,
            `P&I/H&M sigortacısı derhal bilgilendirildi mi?`,
            `Surveyor/hukuki temsil koordinasyonu başladı mı?`,
          ],
          paragraphs: [
            `Deniz protestu, krizin sıcak anında geleceğin hukuki güvenliğini kuran sessiz bir tedbirdir. Kaptanın zamanında, kayıtlarla tutarlı protesti ve hızlı P&I koordinasyonu; gemiyi ve mürettebatı haksız sorumluluk yüklerine karşı korur.`,
          ],
        },
      ],
    },
  ],
};

export default content;
