import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Deniz hizmet belgesi (Sea Service Certificate) ve sertifika süreci",
  roleSlug: "guverte-stajyer",
  taskIndex: 7,
  estimatedPages: 22,
  intro: `Güverte stajyerinin zabit olma yolculuğu, yalnızca öğrenmekle değil, öğrendiğini ve gemide geçirdiği süreyi belgelemekle ilerler. Sea Service Certificate (deniz hizmet belgesi), stajyerin her seyir dönemini resmî olarak kanıtlar ve STCW'nin OICNW yeterliliği için gereken deniz hizmetinin (genelde 12 ay) ispatında temel kanıttır. Belgeleri doğru talep etmek, kayıpsız saklamak ve her gemi/sözleşme değişiminde yenilemek stajyerin kendi sorumluluğudur. Bu bölüm deniz hizmet belgesi ve sertifika sürecini ele alır.`,
  sources: [
    "STCW — deniz hizmeti ve OICNW gereklilikleri",
    "Flag state sertifika ve sea service prosedürleri",
    "Discharge book / seaman's book uygulamaları",
    "Şirket/acente belge prosedürleri",
    "IMO STCW yeterlilik çerçevesi",
  ],
  chapters: [
    {
      heading: "1. Deniz Hizmetinin Önemi",
      sections: [
        {
          subheading: "1.1 Sertifikanın ön koşulu",
          paragraphs: [
            `STCW, zabit yeterliliği için belirli süre onaylı deniz hizmeti şart koşar. Sea Service Certificate, bu sürenin resmî kanıtıdır. Eğitim ve TRB ne kadar iyi olursa olsun, belgelenmemiş deniz hizmeti sertifika hakkını geciktirir veya engeller.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "STCW deniz hizmeti",
              text: `OICNW yeterliliği için genelde onaylı bir eğitim programıyla birlikte belirli süre (sıklıkla ~12 ay) deniz hizmeti gerekir. Bu sürenin geçerli sayılması için doğru belgelenmesi şarttır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Sea Service Certificate İçeriği",
      sections: [
        {
          subheading: "2.1 Belgede olması gerekenler",
          paragraphs: [
            `Belge; gemi adı/bayrağı/tipi, görev tanımı, hizmet tarihleri (biniş-iniş), seyir bölgesi ve geminin tonajı/makine gücü gibi bilgileri içerir ve kaptan tarafından imzalanır. Bu detaylar, hizmetin yeterlilik için "geçerli" sayılıp sayılmayacağını belirler.`,
          ],
          table: {
            caption: "Sea Service Certificate öğeleri",
            headers: ["Alan", "Örnek"],
            rows: [
              ["Gemi bilgisi", "Ad, bayrak, tip, GT/kW"],
              ["Görev", "Deck cadet"],
              ["Tarihler", "Biniş – iniş"],
              ["Seyir bölgesi", "Near/unlimited"],
              ["İmza", "Kaptan onayı"],
            ],
          },
        },
      ],
    },
    {
      heading: "3. Stajyerin Sorumlulukları",
      sections: [
        {
          subheading: "3.1 Talep, sakla, yenile",
          paragraphs: [
            `Stajyer; belgeyi her sözleşme/gemi değişiminde doğru biçimde talep eder, kayıpsız saklar ve süreyi eksiksiz belgeler. Discharge book/seaman's book kayıtları da bu sürenin parçasıdır. Belgelerin doğru ve kesintisiz olması, ileride sınav başvurusunda sorun yaşanmamasını sağlar.`,
          ],
          bullets: [
            `Her dönem için belgeyi zamanında talep et`,
            `Tarih/gemi/görev bilgisini doğrula`,
            `Discharge book kayıtlarını tut`,
            `Belgeleri kayıpsız sakla (yedekle)`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Eksik belge = gecikmiş kariyer",
              text: `Hatalı tarih, eksik imza veya kaybolmuş bir sea service certificate, ileride sertifika sınavına girme hakkını tehlikeye atar. Belgeler iş bittiğinde, gemiden ayrılmadan tamamlanır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Sertifika Süreci",
      sections: [
        {
          subheading: "4.1 Yeterlilik başvurusu",
          paragraphs: [
            `Deniz hizmeti, TRB ve eğitim tamamlandığında stajyer, flag state/idarenin yeterlilik (CoC) başvurusunu yapar. Sea service belgeleri, TRB ve eğitim sertifikaları bu başvurunun temelidir. Eksiksiz ve düzenli evrak, süreci hızlandırır.`,
          ],
        },
      ],
    },
    {
      heading: "5. Düzen ve Takip",
      sections: [
        {
          subheading: "5.1 Evrak disiplini",
          paragraphs: [
            `Stajyer, tüm belgelerini (sea service, TRB, eğitim sertifikaları, sağlık, pasaport/seaman book) düzenli bir dosyada tutar ve geçerlilik sürelerini izler. Bu düzen, kariyerin her aşamasında işe yarar ve aniden gereken bir belgeyi anında sunabilmeyi sağlar.`,
          ],
        },
      ],
    },
    {
      heading: "6. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "6.1 Deniz hizmeti belge kontrolü",
          bullets: [
            `Her dönem için sea service certificate alındı mı?`,
            `Belgede gemi/görev/tarih/bölge bilgisi doğru mu?`,
            `Kaptan imzası alındı mı?`,
            `Discharge book kayıtları güncel mi?`,
            `Belgeler kayıpsız saklanıp yedeklendi mi?`,
            `Toplam deniz hizmeti STCW gerekliliğine doğru ilerliyor mu?`,
          ],
          paragraphs: [
            `Deniz hizmet belgesi ve sertifika süreci, güverte stajyerinin öğrendiklerini bir kariyere dönüştürmesinin idari temelidir. Belgeleri doğru talep etmek, eksiksiz saklamak ve süreyi takip etmek; stajyerin zabitlik yolundaki ilerlemesini güvence altına alır.`,
          ],
        },
      ],
    },
  ],
};

export default content;
