import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Soğutucu (refrigeration) ve klima sistemi günlük kontrolü",
  roleSlug: "ucuncu-muhendis",
  taskIndex: 8,
  estimatedPages: 23,
  intro: `Provizyon soğuk hava depoları (et/balık/sebze/günlük), yaşam mahalli kliması (HVAC) ve gerektiğinde reefer kargo tesisleri, gemide hem mürettebat refahı hem gıda güvenliği hem de yük bütünlüğü açısından kritiktir. Üçüncü/Dördüncü Mühendis bu sistemlerin günlük kontrolünden — kondenser/evaporatör basınçları, ekspansiyon valfi davranışı, refrigerant seviyesi, kompresör yağ basıncı ve sıcaklık değerlerinden — sorumludur. Bu bölüm soğutma çevriminin izlenmesini ve kaçak/arıza belirtilerini ele alır.`,
  sources: [
    "Üretici soğutma/HVAC sistemi el kitapları",
    "MARPOL Annex VI Regulation 12 — Ozon delici maddeler / refrigerant kayıtları",
    "Kigali Amendment / F-gas — soğutucu akışkan yönetimi",
    "MLC 2006 — yaşam mahalli iklimlendirme standartları",
    "Gıda güvenliği / soğuk zincir (provision rooms) kılavuzları",
  ],
  chapters: [
    {
      heading: "1. Soğutma Çevriminin Temelleri",
      sections: [
        {
          subheading: "1.1 Dört ana bileşen",
          paragraphs: [
            `Bir buhar sıkıştırmalı soğutma çevrimi dört temel bileşenden oluşur: kompresör (basınç/sıcaklık yükseltir), kondenser (ısıyı dışarı atar, gaz→sıvı), ekspansiyon valfi (basıncı düşürür) ve evaporatör (ortamdan ısı çeker, sıvı→gaz). Üçüncü/Dördüncü Mühendis bu çevrimin "normal" basınç ve sıcaklık değerlerini bilerek sapmaları teşhis eder.`,
          ],
          bullets: [
            `Kompresör: emiş (LP) ve basma (HP) basınçları`,
            `Kondenser: yoğuşma basıncı/sıcaklığı, soğutma suyu/hava`,
            `Ekspansiyon valfi: superheat kontrolü`,
            `Evaporatör: buharlaşma basıncı, frost durumu`,
          ],
        },
        {
          subheading: "1.2 Sistem tipleri",
          paragraphs: [
            `Provizyon tesisi genelde tek/çok odalı doğrudan genleşmeli sistemdir; her oda termostatla istenen sıcaklıkta tutulur (et −18°C, sebze +4°C gibi). HVAC sistemi yaşam mahallini iklimlendirir. Reefer kargo tesisi (varsa) çok daha yüksek kapasiteli ve yük bütünlüğü açısından kritiktir.`,
          ],
        },
      ],
    },
    {
      heading: "2. Günlük İzlenen Parametreler",
      sections: [
        {
          subheading: "2.1 Basınç, sıcaklık ve yağ",
          paragraphs: [
            `Vardiya sırasında kompresör emiş/basma basınçları, kondenser ve evaporatör sıcaklıkları, kompresör yağ basıncı ve oda sıcaklıkları okunur ve kaydedilir. Normalden sapma, çoğu zaman bir sorunun ilk işaretidir: düşük emiş basıncı refrigerant azlığı/tıkanma; yüksek basma basıncı kondenser sorunu/hava olabilir.`,
          ],
          table: {
            caption: "Tipik belirti yorumlama (kılavuz)",
            headers: ["Gözlem", "Olası neden"],
            rows: [
              ["Düşük emiş (LP) basınç", "Refrigerant az / filtre-drier tıkalı / valf"],
              ["Yüksek basma (HP) basınç", "Kondenser kirli / soğutma suyu az / hava var"],
              ["Aşırı frost / buzlanma", "Düşük yük / hava akışı / defrost arızası"],
              ["Kompresör yağ basıncı ↓", "Yağ az / dilution / pompa"],
              ["Oda sıcaklığı tutmuyor", "Refrigerant az / valf / yük / kaçak"],
            ],
          },
        },
        {
          subheading: "2.2 Sight glass ve şarj durumu",
          paragraphs: [
            `Sıvı hat sight glass'ında kabarcık görülmesi genellikle düşük refrigerant şarjına veya hat tıkanıklığına işaret eder. Üçüncü/Dördüncü Mühendis bu basit göstergeyi düzenli kontrol eder ve şüphede Baş Mühendise raporlar.`,
          ],
        },
      ],
    },
    {
      heading: "3. Kaçak Tespiti ve Refrigerant Yönetimi",
      sections: [
        {
          subheading: "3.1 Kaçak belirtileri",
          paragraphs: [
            `Kaçak; düşen performans, sık şarj ihtiyacı, sight glass'ta kabarcık, olağandışı ses veya sıcaklık dengesizliğiyle kendini gösterir. Kaçak noktaları elektronik dedektör veya köpük testiyle aranır. Kaçak hem performansı düşürür hem de çevresel/yasal sorumluluk doğurur.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MARPOL Annex VI Reg. 12 & F-gas",
              text: `Ozon delici ve yüksek GWP'li soğutucu akışkanların kasıtlı atmosfere salımı yasaktır. Şarj, ilave ve geri kazanım kayıt altına alınır (refrigerant log). Kigali Amendment ile HFC'lerin kademeli azaltımı zorunludur.`,
            },
          ],
        },
        {
          subheading: "3.2 Yetki sınırı",
          paragraphs: [
            `Refrigerant ilavesi, geri kazanım ve devre açma genelde uzmanlık ve özel ekipman ister; Üçüncü/Dördüncü Mühendis kaçak/arıza belirtisini tespit edip raporlar, müdahaleyi Baş Mühendis gözetiminde yapar. Kaçağı görmezden gelmek hem gıda/yük kaybı hem yasal risk getirir.`,
          ],
        },
      ],
    },
    {
      heading: "4. Provizyon Odaları ve Gıda Güvenliği",
      sections: [
        {
          subheading: "4.1 Soğuk zincir bütünlüğü",
          paragraphs: [
            `Provizyon odalarının doğru sıcaklıkta tutulması, gıda güvenliği ve mürettebat sağlığı için zorunludur. Sıcaklık sapmaları aşçı/steward ile koordineli izlenir; bir oda arızasında gıdanın kurtarılması için hızlı aksiyon (alternatif soğutma, tüketim önceliği) alınır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Defrost ve hava akışı",
              text: `Aşırı buzlanma soğutmayı düşürür ve enerji harcatır. Düzenli defrost ve evaporatör hava akışının engellenmemesi (önüne istif yapılmaması), odanın sıcaklık tutmasını sağlar.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. HVAC / Klima Sistemi",
      sections: [
        {
          subheading: "5.1 Yaşam mahalli iklimlendirme",
          paragraphs: [
            `HVAC, yaşam mahallini konforlu ve MLC standartlarına uygun tutar. Filtre temizliği, fan/damper çalışması ve hava kalitesi izlenir. Tıkalı filtre hem konforu düşürür hem enerji tüketimini artırır.`,
          ],
        },
      ],
    },
    {
      heading: "6. Reefer Kargo Tesisleri (varsa)",
      sections: [
        {
          subheading: "6.1 Yük bütünlüğü",
          paragraphs: [
            `Reefer kargo taşıyan gemilerde soğutma arızası doğrudan yük kaybı ve büyük tazminat demektir. Set sıcaklıkları, alarm sınırları ve kayıt sistemleri sürekli izlenir; sapma derhal raporlanır. Reefer konteynerlerde plug/güç ve sıcaklık izleme güverteyle koordineli yürütülür.`,
          ],
        },
      ],
    },
    {
      heading: "7. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "7.1 Soğutma/klima günlük kontrolü",
          bullets: [
            `Kompresör emiş/basma basınçları normal aralıkta mı?`,
            `Kondenser/evaporatör sıcaklıkları, yağ basıncı normal mi?`,
            `Sight glass berrak mı (kabarcık var mı)?`,
            `Oda sıcaklıkları set değerini tutuyor mu?`,
            `Kaçak/aşırı buzlanma belirtisi var mı?`,
            `Refrigerant işlemleri (varsa) log'a işlendi mi?`,
            `HVAC filtre/hava akışı sağlıklı mı?`,
          ],
          paragraphs: [
            `Soğutma ve klima sistemleri "görünmez" çalıştığında fark edilmez; arızalandığında ise gıda, konfor veya yük aniden risk altına girer. Üçüncü/Dördüncü Mühendisin düzenli, kayıtlı kontrolleri bu sessiz sistemlerin güvenilirliğini sağlar.`,
          ],
        },
      ],
    },
  ],
};

export default content;
