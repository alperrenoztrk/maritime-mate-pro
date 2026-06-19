import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Survey, PSC, flag ve class hazırlığı",
  roleSlug: "ucuncu-zabit",
  taskIndex: 7,
  estimatedPages: 23,
  intro: `SOLAS sörveyleri ve liman devleti kontrolleri (PSC), geminin can kurtarma (LSA) ve yangın emniyet (FFE) sistemlerinin uygunluğunu sorgular. Üçüncü Zabit (Safety Officer), bu denetimlere ekipmanı çalıştırabilmek, yerini bilmek, kayıtları sunmak ve mürettebatı hazırlamakla katkı verir. Bu bölüm survey/PSC/flag/class hazırlığını emniyet ekipmanı odağıyla ele alır.`,
  sources: [
    "SOLAS Chapter III (LSA) & Chapter II-2 (FFE)",
    "LSA Code & FSS Code",
    "Paris/Tokyo MOU — PSC prosedürleri",
    "Klas survey ve sertifika gereklilikleri",
    "Şirket SMS — denetim hazırlık prosedürleri",
  ],
  chapters: [
    {
      heading: "1. Denetim Türleri",
      sections: [
        {
          subheading: "1.1 Survey, PSC, flag, class",
          paragraphs: [
            `Gemi; klas sörveyleri, bayrak devleti denetimleri, PSC ve vetting gibi çeşitli denetimlere tabidir. Her biri LSA/FFE uygunluğunu farklı derinlikte sorgular. Üçüncü Zabit, emniyet ekipmanı tarafından geminin her zaman denetime hazır olmasını sağlar.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "Hazırlık süreklidir",
              text: `Denetime özel bir "temizlik" yapmak değil, ekipmanı her gün denetime hazır tutmak doğru yaklaşımdır. Sürekli hazır bir gemi, ani PSC'de bile sorun yaşamaz.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Denetimde Beklenenler",
      sections: [
        {
          subheading: "2.1 Bilmek, çalıştırmak, göstermek",
          paragraphs: [
            `Denetçi tipik olarak: ekipmanın yerini bilmenizi, çalıştırabilmenizi, logbook/kayıtları göstermenizi, expiry ve servis tarihlerini bilmenizi ve mürettebatın eğitimli olmasını bekler. Üçüncü Zabit bu yetkinlikleri hem kendi hem ekip için hazır tutar.`,
          ],
          bullets: [
            `Ekipmanın yerini ve kullanımını bilmek`,
            `Çalıştırabilmek (örn. lifeboat engine start)`,
            `Servis/expiry tarihlerini bilmek`,
            `Logbook ve servis kayıtlarını sunmak`,
            `Eğitimli, görevini bilen mürettebat`,
          ],
        },
        {
          subheading: "2.2 Kusur gizlememek",
          paragraphs: [
            `Bir kusur varsa, açık defect ve telafi tedbiriyle göstermek; gizlemekten her zaman iyidir. Denetçi gizlenmiş bir arızayı bulduğunda güven tümüyle sarsılır ve gemi daha sıkı incelenir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Detention riski",
              text: `LSA/FFE'de ciddi eksiklik (çalışmayan lifeboat, eksik/expired pyrotechnics, bozuk yangın pompası), PSC'de gemi tutmaya (detention) kadar gidebilir. Hazırlık ve şeffaflık, bu riski en aza indirir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Belge ve Kayıt Hazırlığı",
      sections: [
        {
          subheading: "3.1 Sertifika ve servis kayıtları",
          paragraphs: [
            `LSA/FFE sertifikaları, liferaft/lifeboat/fire extinguisher servis raporları, drill kayıtları ve maintenance log denetime hazır tutulur. Üçüncü Zabit, geçerlilik sürelerini izler ve yenilemeleri planlar; süresi dolan bir servis doğrudan bulgu çıkarır.`,
          ],
          table: {
            caption: "Hazır tutulacak kayıtlar",
            headers: ["Kayıt", "İçerik"],
            rows: [
              ["LSA/FFE sertifikaları", "Geçerlilik, kapsam"],
              ["Servis raporları", "Liferaft, extinguisher, lifeboat"],
              ["Drill kayıtları", "SOLAS gereği tatbikatlar"],
              ["Maintenance log", "Haftalık/aylık kontrol"],
            ],
          },
        },
      ],
    },
    {
      heading: "4. Mürettebat Hazırlığı",
      sections: [
        {
          subheading: "4.1 Eğitim ve tatbikat",
          paragraphs: [
            `Denetçi, rastgele bir mürettebata "muster station'ın nerede, bu ekipmanı nasıl kullanırsın?" diye sorabilir. Üçüncü Zabit, düzenli drill ve familiarization ile ekibin bu sorulara güvenle yanıt verebilmesini sağlar. Emniyet, bireysel yetkinliklerin toplamıdır.`,
          ],
        },
      ],
    },
    {
      heading: "5. Denetim Sonrası",
      sections: [
        {
          subheading: "5.1 Bulgu ve düzeltici aksiyon",
          paragraphs: [
            `Denetimde bulgu çıkarsa, düzeltici aksiyon planı hazırlanır ve süresinde kapatılır. Üçüncü Zabit, emniyetle ilgili bulguların takibine katkı verir ve aynı bulgunun tekrarını önleyecek kalıcı çözümü destekler.`,
          ],
        },
      ],
    },
    {
      heading: "6. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "6.1 Denetim hazırlık kontrolü",
          bullets: [
            `LSA/FFE ekipmanının yeri/kullanımı biliniyor mu?`,
            `Ekipman çalıştırılabiliyor (lifeboat engine, pompa) mu?`,
            `Sertifika ve servis/expiry tarihleri güncel mi?`,
            `Drill ve maintenance kayıtları sunulabilir mi?`,
            `Açık kusurlar defect+telafi ile şeffaf mı?`,
            `Mürettebat muster/ekipman sorularına hazır mı?`,
            `Önceki bulgular kapatıldı mı?`,
          ],
          paragraphs: [
            `Survey ve PSC hazırlığı, Üçüncü Zabit için bir "sınav günü" değil, her günkü emniyet disiplininin doğal sonucudur. Sürekli hazır ekipman, güncel kayıtlar ve eğitimli mürettebat; denetimi bir tehdit olmaktan çıkarıp geminin emniyetinin teyidi haline getirir.`,
          ],
        },
      ],
    },
  ],
};

export default content;
