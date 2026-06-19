import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Ziyaretçi ve misafir yönetimi desteği",
  roleSlug: "kamarot",
  taskIndex: 7,
  estimatedPages: 22,
  intro: `Limanda gemiye gelen surveyor, PSC ve vetting denetçileri, acente ve diğer ziyaretçiler, geminin "ilk izlenimini" yaşam mahalli düzeninden alır; temiz, düzenli ve profesyonel bir ortam, denetimin olumlu başlamasına katkı sağlar. Kamarot; ziyaretçilere servis, toplantı odası/salon hazırlığı ve ikram hizmetiyle bu izlenimi destekler ve yaşam mahallini denetim standartlarına uygun tutar. Bu bölüm ziyaretçi ve misafir yönetimi desteğini ele alır.`,
  sources: [
    "ISPS Code — ziyaretçi/erişim yönetimi (genel)",
    "MLC 2006 — yaşam mahalli standartları",
    "Vetting/PSC — yaşam mahalli izlenimi",
    "Şirket SMS — ziyaretçi prosedürleri",
    "Hospitality/servis pratiği",
  ],
  chapters: [
    {
      heading: "1. İlk İzlenimin Önemi",
      sections: [
        {
          subheading: "1.1 Yaşam mahalli = ayna",
          paragraphs: [
            `Bir denetçi gemiye geldiğinde, ilk gördüğü yaşam mahallinin düzeni geminin genel bakım kültürü hakkında izlenim oluşturur. Temiz, düzenli bir ortam güven verir; dağınık bir ortam ise daha sıkı bir denetimi tetikleyebilir. Kamarot bu izlenimin oluşmasında doğrudan rol oynar.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "İzlenim denetimi etkiler",
              text: `Düzenli bir yaşam mahalli, denetçiye "bu gemi iyi yönetiliyor" mesajı verir. Bu olumlu izlenim, denetimin genel tonunu yumuşatabilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Ziyaretçi Servisi",
      sections: [
        {
          subheading: "2.1 Profesyonel ağırlama",
          paragraphs: [
            `Kamarot; gelen surveyor, denetçi, acente ve misafirlere nazik ve profesyonel servis sunar. İçecek/ikram hazırlığı, toplantı alanının düzeni ve misafirin konforu sağlanır. Profesyonel ağırlama, geminin kurumsal imajını yansıtır.`,
          ],
          bullets: [
            `Nazik ve profesyonel karşılama servisi`,
            `İçecek/ikram hazırlığı`,
            `Toplantı alanı düzeni ve konforu`,
            `İhtiyaçlara hızlı yanıt`,
          ],
        },
      ],
    },
    {
      heading: "3. Toplantı ve Salon Hazırlığı",
      sections: [
        {
          subheading: "3.1 Alan hazırlığı",
          paragraphs: [
            `Denetim/toplantı öncesi kamarot, toplantı odası/salonu hazırlar: temizlik, düzen, gerekli ekipman (su, kahve, oturma) ve genel konfor. Hazır ve düzenli bir alan, toplantının verimli geçmesine ve geminin profesyonel görünmesine katkı sağlar.`,
          ],
        },
      ],
    },
    {
      heading: "4. Güvenlik ve Erişim",
      sections: [
        {
          subheading: "4.1 ISPS farkındalığı",
          paragraphs: [
            `Ziyaretçi yönetimi, ISPS güvenlik kurallarıyla uyumlu olmalıdır; ziyaretçiler kayıtlı, eşlikli ve yetkili alanlarla sınırlı olur. Kamarot, servis sırasında güvenlik kurallarına uyar ve yetkisiz erişim/şüpheli durumu sorumlu zabite bildirir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "ISPS ve ziyaretçi",
              text: `Ziyaretçiler güvenlik prosedürüne göre kaydedilir ve gerektiğinde eşlik edilir. Kamarot, ağırlama görevini güvenlik kurallarına uyumlu biçimde yürütür.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Denetim Standardına Uygunluk",
      sections: [
        {
          subheading: "5.1 Sürekli düzen",
          paragraphs: [
            `Yaşam mahallinin denetim standardına uygun tutulması, sadece ziyaret günü değil her gün yapılan bir iştir. Kamarot, sürekli düzenli bir ortamla, ani bir denetimde bile geminin hazır olmasını sağlar. MLC kapsamında yaşam koşulları da bu düzenin parçasıdır.`,
          ],
        },
      ],
    },
    {
      heading: "6. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "6.1 Ziyaretçi yönetimi kontrolü",
          bullets: [
            `Yaşam mahalli temiz ve düzenli mi (sürekli)?`,
            `Ziyaretçiye profesyonel servis sunuluyor mu?`,
            `Toplantı odası/salon hazır ve konforlu mu?`,
            `İkram/içecek hazırlığı yapıldı mı?`,
            `ISPS güvenlik kurallarına uyuluyor mu?`,
            `Şüpheli durum/yetkisiz erişim raporlanıyor mu?`,
          ],
          paragraphs: [
            `Ziyaretçi ve misafir yönetimi desteği, kamarotun geminin kurumsal imajına ve denetim başarısına yaptığı katkıdır. Düzenli yaşam mahalli, profesyonel ağırlama ve güvenlik farkındalığı; geminin iyi yönetildiği izlenimini güçlendirir ve denetimlerin olumlu geçmesine zemin hazırlar.`,
          ],
        },
      ],
    },
  ],
};

export default content;
