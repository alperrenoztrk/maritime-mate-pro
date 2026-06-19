import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Hijyen ve sağlık standartlarının korunması",
  roleSlug: "kamarot",
  taskIndex: 5,
  estimatedPages: 23,
  intro: `Bir gemide yaşam mahallinin hijyeni, mürettebatın sağlığını ve moralini doğrudan belirler; kapalı ve kalabalık bir ortamda bulaşıcı bir hastalık hızla yayılabilir. Kamarot; banyo/tuvalet temizliği, dezenfeksiyon ve çöp yönetimiyle yaşam mahalli hijyenini korur, bulaşıcı hastalık dönemlerinde (COVID, norovirus vb.) artırılmış temizlik protokollerini uygular ve pest management'a destek verir. Bu bölüm hijyen ve sağlık standartlarının korunmasını ele alır.`,
  sources: [
    "MLC 2006 — yaşam koşulları ve sağlık",
    "WHO — Guide to Ship Sanitation",
    "IHR 2005 — bulaşıcı hastalık önleme",
    "MARPOL Annex V — çöp yönetimi",
    "Şirket SMS — hijyen ve enfeksiyon kontrol protokolleri",
  ],
  chapters: [
    {
      heading: "1. Hijyenin Sağlığa Etkisi",
      sections: [
        {
          subheading: "1.1 Kapalı ortamda risk",
          paragraphs: [
            `Gemi, kalabalık ve kapalı bir ortamdır; bir enfeksiyon hızla yayılabilir ve sınırlı tıbbi imkânla yönetilmesi zordur. Kamarot, hijyeni koruyarak hastalığı en baştan önler. Temiz bir yaşam mahalli, hem sağlık hem moral hem de denetim açısından kritiktir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MLC 2006",
              text: `MLC, mürettebata temiz, hijyenik ve sağlıklı yaşam koşulları sağlanmasını şart koşar. Banyo/tuvalet hijyeni, havalandırma ve sanitasyon PSC tarafından denetlenir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Rutin Temizlik ve Dezenfeksiyon",
      sections: [
        {
          subheading: "2.1 Banyo, tuvalet, ortak alan",
          paragraphs: [
            `Kamarot; banyo/tuvaletleri, ortak alanları (mess, salon, koridor) ve sık dokunulan yüzeyleri (kapı kolu, korkuluk, anahtar) düzenli temizler ve dezenfekte eder. Doğru dezenfektan, doğru temas süresiyle kullanılır; aceleyle silmek dezenfeksiyonu sağlamaz.`,
          ],
          bullets: [
            `Banyo/tuvalet günlük temizlik+dezenfeksiyon`,
            `Sık dokunulan yüzeyler (kapı kolu, korkuluk)`,
            `Ortak alanlar (mess, salon, koridor)`,
            `Doğru dezenfektan ve temas süresi`,
          ],
        },
      ],
    },
    {
      heading: "3. Çöp Yönetimi",
      sections: [
        {
          subheading: "3.1 Ayrıştırma ve MARPOL",
          paragraphs: [
            `Yaşam mahalli çöpü ayrıştırılır ve MARPOL Annex V'e uygun yönetilir; gıda atığı, plastik ve diğer çöpler farklı işlenir. Kamarot, çöpün hijyenik toplanmasını ve doğru bertaraf noktasına (incinerator/shore reception) iletilmesini sağlar. Biriken çöp hem hijyen hem haşere riski yaratır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MARPOL Annex V",
              text: `Çöpün denize atılması katı kurallara tabidir; plastik kesinlikle yasaktır. Çöp ayrıştırma ve Garbage Record Book uyumu, hem çevre hem hijyen için zorunludur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Salgın Dönemi Protokolleri",
      sections: [
        {
          subheading: "4.1 Artırılmış temizlik",
          paragraphs: [
            `COVID, norovirus gibi bulaşıcı hastalık riski olan dönemlerde temizlik sıklığı ve yoğunluğu artırılır; sık dokunulan yüzeyler daha sık dezenfekte edilir, izolasyon varsa ilgili alanlar ayrı protokolle temizlenir. Kamarot, bu artırılmış protokolleri titizlikle uygular; bir salgında hijyen, ilk savunma hattıdır.`,
          ],
          table: {
            caption: "Normal vs salgın protokolü",
            headers: ["Alan", "Normal", "Salgın"],
            rows: [
              ["Sık dokunulan yüzey", "Günlük", "Birkaç kez/gün"],
              ["Ortak tuvalet", "Günlük", "Sık + ekstra dezenfeksiyon"],
              ["İzolasyon alanı", "—", "Ayrı protokol + PPE"],
            ],
          },
        },
        {
          subheading: "4.2 Kişisel koruma",
          paragraphs: [
            `Salgın döneminde veya izolasyon alanı temizliğinde kamarot uygun KKD (eldiven, maske) kullanır ve kendini de korur. Kontamine atık ayrı toplanır. Kamarotun sağlığı, hizmetin sürekliliği için önemlidir.`,
          ],
        },
      ],
    },
    {
      heading: "5. Pest Management Desteği",
      sections: [
        {
          subheading: "5.1 Haşere önleme",
          paragraphs: [
            `Hijyen, haşere (hamamböceği, kemirgen) kontrolünün temelidir; gıda artığı ve kir haşere çeker. Kamarot, temizlikle haşereyi önler ve belirti (dışkı, iz, canlı) görürse raporlar. Pest management programına (tuzak, yem) destek verir.`,
          ],
        },
      ],
    },
    {
      heading: "6. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "6.1 Hijyen kontrolü",
          bullets: [
            `Banyo/tuvalet ve ortak alanlar düzenli temizlenip dezenfekte ediliyor mu?`,
            `Sık dokunulan yüzeyler ihmal edilmiyor mu?`,
            `Dezenfektan doğru ve temas süresiyle kullanılıyor mu?`,
            `Çöp ayrıştırılıp MARPOL'e uygun yönetiliyor mu?`,
            `Salgın döneminde artırılmış protokol uygulanıyor mu?`,
            `Haşere belirtisi izlenip raporlanıyor mu?`,
          ],
          paragraphs: [
            `Hijyen ve sağlık standartlarının korunması, kamarotun mürettebatın sağlığına yaptığı doğrudan katkıdır. Düzenli temizlik, doğru dezenfeksiyon, çöp yönetimi ve salgın protokolleri; kapalı bir ortamda hastalığı önleyen ve yaşam mahallini sağlıklı tutan en etkili savunmadır.`,
          ],
        },
      ],
    },
  ],
};

export default content;
