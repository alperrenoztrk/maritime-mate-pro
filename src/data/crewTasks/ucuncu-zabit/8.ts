import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Emniyet ekipman stok ve son kullanma tarihi takibi",
  roleSlug: "ucuncu-zabit",
  taskIndex: 8,
  estimatedPages: 23,
  intro: `Emniyet ekipmanının son kullanma ve servis tarihleri küçümsenecek bir ayrıntı değildir; süresi geçmiş bir işaret fişeği, servisi gecikmiş bir can salı veya bitik bir EPIRB bataryası hem denetimde doğrudan bulgu çıkarır hem de gerçek bir acilde işe yaramaz. Üçüncü Zabit (Safety Officer); pyrotechnics, HRU, liferaft servis, EPIRB/SART/portable radio bataryaları, immersion suit ve SCBA tüp testleri gibi tarihleri sistematik izler. Bu bölüm emniyet stok ve SKT takibini ele alır.`,
  sources: [
    "SOLAS Chapter III & LSA Code — servis aralıkları",
    "FSS Code — yangın ekipmanı bakım/test",
    "MED / SOLAS pyrotechnics geçerlilik kuralları",
    "Üretici servis ve test aralığı el kitapları",
    "Gemi PMS — emniyet ekipmanı takvimi",
  ],
  chapters: [
    {
      heading: "1. Neden Tarih Takibi Kritik?",
      sections: [
        {
          subheading: "1.1 Süresi geçen ekipman",
          paragraphs: [
            `Süresi dolan bir işaret fişeği tutuşmayabilir, servisi gecikmiş bir can salı doğru açılmayabilir, biten bir batarya sinyal vermeyebilir. Bu yüzden tarih takibi, ekipmanın "var olması" kadar "çalışır durumda olması" demektir. Üçüncü Zabit bu takibi bir öncelik olarak görür.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Tek kaçan tarih = bulgu",
              text: `İzlenen tarihlerden herhangi biri kaçarsa denetimde doğrudan bulgu çıkar; daha kötüsü, gerçek bir acilde o ekipman güvenilmez hale gelir. Takvim disiplini hayatidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. İzlenecek Kalemler",
      sections: [
        {
          subheading: "2.1 LSA tarihleri",
          paragraphs: [
            `Üçüncü Zabit; roket paraşüt fişeği, el maytabı, yüzer duman kandili (pyrotechnics), HRU (Hydrostatic Release Unit), liferaft servis tarihi, EPIRB/SART/portable radio bataryaları ve immersion suit kontrol/seam test tarihlerini izler. Her birinin geçerlilik ve servis aralığı farklıdır.`,
          ],
          table: {
            caption: "Tipik takip kalemleri (genel)",
            headers: ["Kalem", "İzlenen tarih"],
            rows: [
              ["Pyrotechnics (flare)", "Son kullanma (genelde ~3-4 yıl)"],
              ["Liferaft", "Yıllık servis due date"],
              ["HRU", "Değişim/expiry"],
              ["EPIRB/SART batarya", "Batarya değişim tarihi"],
              ["Immersion suit", "Periyodik kontrol/seam test"],
              ["SCBA tüp", "Hidrostatik test tarihi"],
            ],
          },
        },
        {
          subheading: "2.2 FFE tarihleri",
          paragraphs: [
            `Yangın söndürücü servis/yeniden dolum, SCBA silindiri hidrostatik testi, yangın hortumu/nozzle kontrolü ve sabit sistem (CO2/foam) servis tarihleri de izlenir. SCBA tüpü gibi basınçlı kaplar yasal test aralığına tabidir.`,
          ],
        },
      ],
    },
    {
      heading: "3. Takip Sistemi",
      sections: [
        {
          subheading: "3.1 Takvim ve PMS",
          paragraphs: [
            `Tüm tarihler bir takvim/PMS sisteminde tutulur ve yaklaşan kalemler önceden uyarı verir. Üçüncü Zabit, yenileme/servis ihtiyacını liman ikmal penceresinden önce belirler; bir liferaft servisi veya flare ikmali uygun limanda planlanmazsa açıkta süre dolabilir.`,
          ],
          bullets: [
            `Tüm SKT/servis tarihlerini tek takvimde tut`,
            `Yaklaşan kalemler için erken uyarı`,
            `İkmal/servis limanını önceden planla`,
            `Yenileme sonrası kaydı güncelle`,
          ],
        },
      ],
    },
    {
      heading: "4. İkmal ve Yenileme",
      sections: [
        {
          subheading: "4.1 Zamanında tedarik",
          paragraphs: [
            `Süresi yaklaşan ekipman, uygun limanda yenilenir veya servise gönderilir. Üçüncü Zabit; eksik/yaklaşan kalemleri Birinci Zabit ve kaptana bildirir, requisition hazırlar. Eski pyrotechnics'in imhası da kurallara göre (genelde kıyıda) yapılır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Liman penceresini kaçırma",
              text: `Bir liferaft servisi veya flare ikmali, ancak uygun tesisli limanda yapılabilir. Tarihler erken planlanmazsa, gemi uygun olmayan bir limanda süresi geçmiş ekipmanla kalır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Kayıt ve Denetim",
      sections: [
        {
          subheading: "5.1 Şeffaf kayıt",
          paragraphs: [
            `Tüm servis/yenileme işlemleri kayıt altına alınır ve sertifikalar saklanır. Bu kayıtlar denetimde sunulur ve ekipmanın güncel tutulduğunu kanıtlar. Üçüncü Zabit, kayıtların düzenli ve erişilebilir olmasını sağlar.`,
          ],
        },
      ],
    },
    {
      heading: "6. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "6.1 SKT/servis takibi kontrolü",
          bullets: [
            `Pyrotechnics SKT'leri güncel mi?`,
            `Liferaft ve HRU servis/değişim tarihleri takipte mi?`,
            `EPIRB/SART/portable radio bataryaları geçerli mi?`,
            `Immersion suit kontrol/seam test tarihleri güncel mi?`,
            `SCBA tüp hidrostatik test ve extinguisher servisi güncel mi?`,
            `Yaklaşan kalemler için ikmal/servis limanı planlandı mı?`,
            `Tüm işlemler kayıt altında ve sertifikalı mı?`,
          ],
          paragraphs: [
            `Emniyet stok ve tarih takibi, "küçük ama hayati" işlerin tipik örneğidir. Üçüncü Zabitin disiplinli takvimi ve zamanında ikmali; her can salının, her fişeğin ve her bataryanın gerçek bir acilde ilk seferde çalışmasını güvence altına alır.`,
          ],
        },
      ],
    },
  ],
};

export default content;
