import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Karantina, sağlık beyanı ve liman sağlık prosedürleri",
  roleSlug: "kaptan",
  taskIndex: 17,
  estimatedPages: 23,
  intro: `Gemi, bulaşıcı hastalıkların ülkeler arası yayılmasında potansiyel bir taşıyıcıdır; bu yüzden uluslararası sağlık mevzuatı limana varan gemiler için katı prosedürler öngörür. Kaptan; Maritime Declaration of Health (MDoH) ve Ship Sanitation Certificate'ı güncel tutmak, bulaşıcı hastalık şüphesinde IHR 2005 kapsamında liman sağlık otoritesine bildirim yapmak, aşılama kayıtlarını izlemek ve karantina (Q) bayrağını doğru kullanmaktan sorumludur. Bu bölüm gemi sağlık prosedürlerini ve karantina yönetimini ele alır.`,
  sources: [
    "International Health Regulations (IHR) 2005 — WHO",
    "Maritime Declaration of Health (MDoH) gereklilikleri",
    "Ship Sanitation Certificate (SSCEC/SSCC) — WHO",
    "WHO International Medical Guide for Ships / Ship Sanitation",
    "MLC 2006 — sağlık ve hijyen standartları",
  ],
  chapters: [
    {
      heading: "1. Uluslararası Sağlık Çerçevesi",
      sections: [
        {
          subheading: "1.1 IHR 2005'in amacı",
          paragraphs: [
            `IHR 2005, hastalıkların uluslararası yayılmasını seyahat ve ticareti gereksiz kısıtlamadan önlemeyi amaçlar. Gemiler bu rejimin merkezindedir: liman sağlık otoriteleri gemiden sağlık beyanı ister, gerektiğinde inceleme ve önlem uygular. Kaptan, geminin bu çerçeveye uyumundan sorumludur.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "IHR 2005",
              text: `Gemide halk sağlığını ilgilendiren bir olay (bulaşıcı hastalık şüphesi, beklenmedik ölüm) varsa liman sağlık otoritesine zamanında bildirim zorunludur. Doğru beyan ve işbirliği, gereksiz karantina/gecikmeyi de önler.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Maritime Declaration of Health (MDoH)",
      sections: [
        {
          subheading: "2.1 Sağlık beyanı",
          paragraphs: [
            `MDoH, geminin son uğraklarında ve seyir boyunca yaşanan hastalık/ölüm durumlarını, sanitasyon koşullarını ve bilinen sağlık risklerini liman otoritesine bildiren resmî beyandır. Kaptan beyanı doğru ve eksiksiz hazırlar; gizleme veya yanlış beyan ciddi sorumluluk doğurur.`,
          ],
          bullets: [
            `Seyir/uğraklarda hastalık veya ölüm var mı?`,
            `Şu an hasta/ateşli/ishalli mürettebat durumu`,
            `Sanitasyon ve haşere kontrol durumu`,
            `Aşılama ve sağlık sertifikası durumu`,
          ],
        },
      ],
    },
    {
      heading: "3. Ship Sanitation Certificate",
      sections: [
        {
          subheading: "3.1 SSCEC / SSCC",
          paragraphs: [
            `Ship Sanitation Control Exemption Certificate (SSCEC) veya Control Certificate (SSCC), geminin sanitasyon koşullarını ve haşere/kemirgen kontrolünü belgeler; genellikle 6 ay geçerlidir ve yetkili limanlarda yenilenir. Kaptan, sertifikanın süresini izler ve yenileme limanını planlar; süresi dolan sertifika liman sorunlarına yol açar.`,
          ],
          table: {
            caption: "Sağlık belgeleri",
            headers: ["Belge", "Kapsam", "Geçerlilik"],
            rows: [
              ["MDoH", "Sağlık beyanı (varışta)", "Her uğrak"],
              ["SSCEC/SSCC", "Sanitasyon/haşere kontrol", "~6 ay"],
              ["Aşı kayıtları", "Sarı humma vb.", "Aşıya göre"],
            ],
          },
        },
      ],
    },
    {
      heading: "4. Bulaşıcı Hastalık Şüphesi",
      sections: [
        {
          subheading: "4.1 İzolasyon ve bildirim",
          paragraphs: [
            `Bir mürettebatta bulaşıcı hastalık şüphesi belirdiğinde; hasta izole edilir, hijyen ve temas önlemleri alınır, TMAS'a danışılır ve varış limanı sağlık otoritesine IHR kapsamında bildirim yapılır. Kaptan, salgın riskini gizlemeden, şeffaf biçimde yönetir; bu hem mürettebat hem halk sağlığı içindir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Gizleme tehlikesi",
              text: `Hastalığı gizleyerek limana girmeye çalışmak hem yasa dışıdır hem de salgını yayarak çok daha büyük sonuçlar doğurabilir. Şeffaf beyan, gemiyi de korur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Karantina Bayrağı ve Pratika",
      sections: [
        {
          subheading: "5.1 Q flag ve free pratique",
          paragraphs: [
            `Sağlık serbestisi (free pratique) alınana kadar, gerektiğinde "Q" bayrağı çekilir — gemi sağlıklı olduğunu beyan eder ve pratika ister. Sağlık otoritesi onayı (radio/face-to-face pratique) alınmadan, gerektiği durumda kişi giriş-çıkışı kısıtlanır. Kaptan bu işaretleşmeyi ve prosedürü doğru uygular.`,
          ],
          bullets: [
            `Q bayrağı: "sağlıklıyım, pratika istiyorum"`,
            `Radio/free pratique onayı beklenir`,
            `Onaysız giriş-çıkış kısıtlaması`,
            `Otorite talimatlarına uyum`,
          ],
        },
      ],
    },
    {
      heading: "6. Aşılama ve Hijyen",
      sections: [
        {
          subheading: "6.1 Aşı kayıtları ve önleme",
          paragraphs: [
            `Belirli bölge geçişlerinde (örn. sarı humma endemik bölgeleri) aşılama ve geçerli aşı sertifikası gerekebilir. Kaptan, mürettebatın aşı durumunu izler. Genel hijyen, içme suyu kalitesi, gıda güvenliği ve haşere kontrolü, hastalığı en baştan önleyen temel tedbirlerdir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Önleme en ucuz tedbir",
              text: `Temiz su, hijyenik gıda, haşere kontrolü ve aşı takibi; bir salgını yönetmekten çok daha kolay ve ucuzdur. Sanitasyon disiplini, sağlık prosedürlerinin temelidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "7.1 Sağlık prosedürü kontrolü",
          bullets: [
            `MDoH doğru ve eksiksiz hazırlandı mı?`,
            `SSCEC/SSCC geçerli mi, yenileme limanı planlı mı?`,
            `Bulaşıcı şüphesinde izolasyon, TMAS ve IHR bildirimi yapıldı mı?`,
            `Q bayrağı/pratika prosedürü doğru uygulandı mı?`,
            `Aşı kayıtları (gerekli bölgeler için) güncel mi?`,
            `İçme suyu/gıda/haşere kontrolü ve hijyen sağlandı mı?`,
          ],
          paragraphs: [
            `Gemi sağlık prosedürleri, mürettebatı ve uğranılan toplumları bulaşıcı hastalıklardan koruyan görünmez bir kalkandır. Kaptanın güncel belgeleri, şeffaf beyanı ve sağlam sanitasyon disiplini; hem hukuki uyumu hem de gerçek halk sağlığı güvenliğini sağlar.`,
          ],
        },
      ],
    },
  ],
};

export default content;
