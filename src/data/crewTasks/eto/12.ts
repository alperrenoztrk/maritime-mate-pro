import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Yüksek gerilim (HV) sistemleri ve switchboard çalışması",
  roleSlug: "eto",
  taskIndex: 12,
  estimatedPages: 25,
  intro: `Modern büyük gemilerde (kruvaziyer, LNG, FPSO, büyük konteyner) güç sistemi 6.6 kV veya 11 kV yüksek gerilim (HV) seviyesinde olabilir. HV, alçak gerilimden temelde farklı bir tehlike sınıfıdır: ark patlaması (arc flash), dokunmadan atlama (flashover) ve ölümcül elektrik çarpması riski taşır. ETO, HV switchgear üzerinde çalışırken Permit to Work, işlem sırası (sequence of operation), topraklama (earthing), voltaj dedektörü kullanımı ve yalıtkanlı PPE kurallarına eksiksiz uyar. Bu bölüm HV sistemleri ve güvenli switchboard çalışmasını ele alır.`,
  sources: [
    "Class kuralları — high voltage installations",
    "IEC 61936 / gemi HV güvenlik standartları",
    "STCW A-III/6 — ETO yetkinlikleri (HV dahil)",
    "Permit to Work / LOTO ve earthing prosedürleri",
    "Vendor (switchgear/transformer) bakım ve eğitim el kitapları",
  ],
  chapters: [
    {
      heading: "1. HV'nin Farklı Tehlikesi",
      sections: [
        {
          subheading: "1.1 Neden HV ayrı ele alınır?",
          paragraphs: [
            `Yüksek gerilim, alçak gerilimden farklı olarak temas olmadan da (hava boşluğundan atlayarak) öldürebilir ve ark patlamasında (arc flash) saniyeler içinde aşırı ısı, basınç ve ışık üreterek ağır yanık ve ölüme yol açar. Bu yüzden HV çalışması, çok daha katı prosedür ve özel eğitim gerektirir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Arc flash ölümcüldür",
              text: `Bir arc flash, binlerce derecelik sıcaklık ve şok dalgası üretir; yakın mesafedeki personel ağır yanık veya ölümle karşılaşabilir. HV çalışmasında mesafe, izolasyon ve arc-flash PPE hayatidir.`,
            },
          ],
        },
        {
          subheading: "1.2 Yetkin personel ve eğitim",
          paragraphs: [
            `HV switchgear üzerinde yalnızca yetkin ve özel eğitimli (HV authorized) personel çalışabilir. ETO, STCW A-III/6 ve vendor eğitimleriyle bu yetkinliği kazanır; GIS (Gas Insulated Switchgear) gibi özel ekipman ayrıca üretici onaylı eğitim ister.`,
          ],
        },
      ],
    },
    {
      heading: "2. Permit to Work ve İşlem Sırası",
      sections: [
        {
          subheading: "2.1 Sequence of operation",
          paragraphs: [
            `HV çalışması, sıkı bir işlem sırasıyla ve Permit to Work altında yapılır: yükü ayır, devreyi aç (open breaker), arabayı çek (rack out / isolate), kilitle-etiketle, voltaj yokluğunu doğrula ve topraklama uygula. Her adım sırayla ve doğrulanarak yapılır; sıra atlanırsa ölümcül sonuç doğabilir.`,
          ],
          bullets: [
            `Switch off / yük ayır`,
            `Breaker aç ve isolate (rack out)`,
            `Lock out / tag out`,
            `Voltaj yokluğunu doğrula (approved detector)`,
            `Earthing (topraklama) uygula`,
            `Permit ile işe başla`,
          ],
        },
        {
          subheading: "2.2 Voltaj dedektörü ve doğrulama",
          paragraphs: [
            `Voltaj yokluğu, onaylı bir HV voltaj dedektörüyle doğrulanır; dedektör kullanım öncesi ve sonrası bilinen bir kaynakta test edilir (prove-test-prove). "Görünüşte ölü" bir baraya asla topraklama veya temas yapılmaz; mutlaka doğrulanır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "Prove-test-prove",
              text: `Voltaj dedektörünün kendisi de arızalı olabilir; bu yüzden bilinen canlı bir kaynakta test edilerek çalıştığı doğrulanır, sonra devrede ölçüm yapılır, sonra tekrar test edilir. Doğrulanmamış "ölü" devre, ölümcül bir varsayımdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Topraklama (Earthing)",
      sections: [
        {
          subheading: "3.1 Güvenli çalışma topraklaması",
          paragraphs: [
            `İzole edilen ve voltajsızlığı doğrulanan HV devre, çalışma öncesi topraklanır (earthing/grounding). Bu, kapasitif kalıntı yükü ve yanlışlıkla enerjilenmeyi güvenli hale getirir. Earthing, switchgear'ın earth switch'i veya portatif earthing seti ile yapılır.`,
          ],
        },
      ],
    },
    {
      heading: "4. Yalıtkanlı PPE",
      sections: [
        {
          subheading: "4.1 HV PPE seti",
          paragraphs: [
            `HV çalışmasında uygun sınıf yalıtkanlı eldiven (Class 2/3), arc-flash giysisi, yüz siperi ve yalıtkanlı ayakkabı/paspas kullanılır. PPE düzenli test edilir (eldiven basınç testi); hasarlı yalıtkan PPE hayati riskdir. ETO PPE'yi her kullanımdan önce kontrol eder.`,
          ],
          table: {
            caption: "HV PPE (genel)",
            headers: ["Ekipman", "Amaç"],
            rows: [
              ["Yalıtkan eldiven (Class 2/3)", "Elektrik çarpması koruması"],
              ["Arc-flash suit/siper", "Ark patlaması koruması"],
              ["Yalıtkan paspas/ayakkabı", "Topraktan izolasyon"],
              ["İzolasyonlu el aletleri", "Güvenli müdahale"],
            ],
          },
        },
      ],
    },
    {
      heading: "5. HV Ekipman Bakımı",
      sections: [
        {
          subheading: "5.1 Switchgear, transformer, GIS",
          paragraphs: [
            `Step-up/step-down transformer, HV switchgear ve GIS bakımı; izolasyon direnci, bağlantı sıcaklığı (termografi), SF6 gaz basıncı (GIS) ve koruma rölesi testlerini içerir. Bu işler genelde vendor onaylı prosedür ve eğitimle yapılır. ETO, bakım kayıtlarını ve koruma ayarlarını izler.`,
          ],
        },
      ],
    },
    {
      heading: "6. Acil Durum ve İlk Yardım",
      sections: [
        {
          subheading: "6.1 HV kazasına müdahale",
          paragraphs: [
            `HV elektrik kazasında, kurtarıcı önce kaynağı izole etmeden mağdura dokunmaz. Müdahale, devre güvenli hale getirildikten sonra yapılır; CPR ve yanık ilk yardımı uygulanır. ETO, HV alanında acil prosedürü ve izolasyon noktalarını bilir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Önce izolasyon",
              text: `HV kazasında mağdura hemen koşmak ikinci bir kurban yaratır. Kaynak izole edilmeden temas edilmez; bu, kurtarmanın ilk ve değişmez kuralıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "7.1 HV çalışma kontrolü",
          bullets: [
            `Çalışan personel HV-yetkin ve eğitimli mi?`,
            `Permit to Work açıldı, işlem sırası uygulanıyor mu?`,
            `Breaker açık, isolate edilmiş, kilitli-etiketli mi?`,
            `Voltaj yokluğu prove-test-prove ile doğrulandı mı?`,
            `Çalışma topraklaması (earthing) uygulandı mı?`,
            `Yalıtkan PPE (eldiven/arc-flash) test edilmiş ve sağlam mı?`,
            `Acil izolasyon noktaları ve ilk yardım planı biliniyor mu?`,
          ],
          paragraphs: [
            `Yüksek gerilim çalışması, ETO'nun en yüksek disiplin gerektiren görevidir; tek bir atlanan adım — doğrulanmamış izolasyon, eksik topraklama, hasarlı PPE — ölümcül olabilir. Katı işlem sırası, prove-test-prove ve doğru PPE; HV sistemlerinin güvenle çalışmasının değişmez temelidir.`,
          ],
        },
      ],
    },
  ],
};

export default content;
