import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Training Record Book (TRB) yönetimi",
  roleSlug: "guverte-stajyer",
  taskIndex: 4,
  estimatedPages: 22,
  intro: `Training Record Book (TRB), güverte stajyerinin gemideki öğrenme yolculuğunun resmi kanıt defteridir ve STCW'nin öngördüğü yetkinlik alanlarını kapsar. Stajyer, her görev, gözlem ve eğitim modülünü düzenli kaydeder ve eğitmen zabitin imza/değerlendirmesini alır. TRB'nin eksiksiz tamamlanması, OICNW (seyir vardiya zabiti) sertifika sınavına girebilmenin ön koşuludur. Bu bölüm TRB yönetimini ele alır.`,
  sources: [
    "STCW — Training Record Book ve OICNW yetkinlikleri",
    "IMO model courses — onboard training",
    "Şirket/eğitim kurumu TRB formatı",
    "ISM Code — eğitim ve yetkinlik",
    "Flag state sertifika gereklilikleri",
  ],
  chapters: [
    {
      heading: "1. TRB'nin Rolü",
      sections: [
        {
          subheading: "1.1 Yetkinliğin kanıtı",
          paragraphs: [
            `TRB, stajyerin hangi yetkinlikleri ne zaman ve nasıl kazandığını belgeler. STCW yetkinlik tablolarına göre yapılandırılmıştır ve sertifika sürecinin temel kanıtıdır. Eksik veya geç doldurulan bir TRB, ileride sınav hakkını ve kariyer ilerlemesini tehlikeye atar.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "STCW ön koşulu",
              text: `OICNW yeterliliği için belirli süre deniz hizmeti ve tamamlanmış bir TRB gerekir. TRB, "yaptım" demek değil, "yaptığımı eğitmenim onayladı" demektir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Günlük Doldurma Disiplini",
      sections: [
        {
          subheading: "2.1 Yaptıkça kaydet",
          paragraphs: [
            `TRB, görev yapıldıkça doldurulmalıdır; ay sonuna veya sözleşme sonuna bırakılan kayıtlar eksik ve yüzeysel kalır. Stajyer her gün, yaptığı işleri ve öğrendiklerini somut biçimde işler. Bu disiplin, hem öğrenmeyi pekiştirir hem defteri gerçekçi kılar.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Sona bırakma tuzağı",
              text: `Aylar sonra toplu doldurulan TRB, hem eksik hem inandırıcılıktan uzak olur. Eğitmen zabit ve sertifika kurumu bu farkı görür. Günlük kayıt tek doğru yoldur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Yetkinlik Alanları",
      sections: [
        {
          subheading: "3.1 STCW kapsamı",
          paragraphs: [
            `TRB; seyir, yük işlemleri, gemi operasyonu ve mürettebat bakımı, emniyet ve çevre koruma gibi yetkinlik alanlarını kapsar. Stajyer, her alanda belirlenen görevleri tamamlar ve gözlem/uygulama kanıtını işler. Eksik kalan alanlar plan dahilinde tamamlanır.`,
          ],
          table: {
            caption: "TRB yetkinlik alanları (genel)",
            headers: ["Alan", "Örnek"],
            rows: [
              ["Seyir", "Watchkeeping, ECDIS, COLREG"],
              ["Yük işlemleri", "Stowage, lashing, hold prep"],
              ["Gemi operasyonu", "Stabilite, mooring, anchoring"],
              ["Emniyet/çevre", "Drill, LSA/FFE, MARPOL"],
            ],
          },
        },
      ],
    },
    {
      heading: "4. Eğitmen Zabit Onayı",
      sections: [
        {
          subheading: "4.1 İmza ve değerlendirme",
          paragraphs: [
            `Her tamamlanan görev, eğitmen zabit (training officer) tarafından imzalanır ve değerlendirilir. Bu onay, kaydın gerçekliğini ve yetkinliğin kazanıldığını teyit eder. Stajyer, eğitmeniyle düzenli görüşerek geri bildirim alır ve eksiklerini kapatır.`,
          ],
        },
      ],
    },
    {
      heading: "5. Saklama ve Bütünlük",
      sections: [
        {
          subheading: "5.1 Kaybetmemek",
          paragraphs: [
            `TRB stajyerin sertifika hakkının belgesidir; kaybı telafisi zor sorunlar doğurur. Stajyer defteri güvenli saklar, mümkünse dijital yedek/fotoğraf tutar. Bütünlüğü (eksik sayfa, silme yok) korur; çünkü bu defter resmi bir kanıttır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Yedekle",
              text: `TRB'nin fiziksel kaybı kariyeri geciktirebilir. Tamamlanan sayfaların fotoğrafını/dijital kopyasını tutmak, olası bir kayba karşı akıllıca bir önlemdir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "6.1 TRB yönetimi kontrolü",
          bullets: [
            `TRB günlük ve yaptıkça dolduruluyor mu?`,
            `Tüm STCW yetkinlik alanları kapsanıyor mu?`,
            `Her görev eğitmen zabit tarafından imzalı/değerlendirilmiş mi?`,
            `Eksik alanlar için plan var mı?`,
            `Defter güvenli saklanıyor ve yedekleniyor mu?`,
            `Bütünlük (silme/eksik sayfa yok) korunuyor mu?`,
          ],
          paragraphs: [
            `TRB yönetimi, güverte stajyerinin kariyerine yaptığı en doğrudan yatırımdır; bugün disiplinli doldurulan her sayfa, yarın zabit sertifikasının kanıtıdır. Günlük kayıt, eğitmen onayı ve özenli saklama; stajyerin ilerlemesinin sağlam temelini oluşturur.`,
          ],
        },
      ],
    },
  ],
};

export default content;
