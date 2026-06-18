import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Tropical Revolving Storm (TRS) ve typhoon avoidance",
  roleSlug: "ikinci-zabit",
  taskIndex: 11,
  estimatedPages: 25,
  intro: `Tropikal döner fırtınalar (Tropical Revolving Storm — bölgeye göre typhoon, hurricane, cyclone) denizdeki en yıkıcı hava olaylarındandır; merkez basıncı çok düşük, rüzgârları yıkıcı ve denizi devasadır. Bu fırtınalardan kaçınma, modern hava verisiyle bile usta bir analiz ister. İkinci Zabit; resmi uyarıları izler, fırtına merkezinin konum ve hareketini değerlendirir, tehlikeli/seyredilebilir yarım daire analizini yapar ve kaçınma rotası önerisini kaptana sunar. Karar kaptanındır; analiz ve veri İkinci Zabit'in sorumluluğudur. Bu bölüm TRS analizini ve kaçınma tekniklerini açıklar.`,
  sources: [
    "Mariner's Handbook / Bowditch — Tropical Revolving Storms",
    "WMO / RSMC uyarıları (JMA, NHC, JTWC, vb.)",
    "Admiralty List of Radio Signals Vol. 3 — weather services",
    "SOLAS Chapter V Regulation 31/32 — tehlike ve hava bildirimleri",
    "Ship Routeing / weather routing servisleri",
  ],
  chapters: [
    {
      heading: "1. TRS'nin Doğası",
      sections: [
        {
          subheading: "1.1 Tropikal fırtına nedir?",
          paragraphs: [
            `TRS, sıcak tropikal denizler üzerinde gelişen, alçak basınç merkezli ve kapalı dolaşımlı şiddetli bir sistemdir. Kuzey yarımkürede saat yönünün tersine, güney yarımkürede saat yönünde döner. Merkeze yaklaştıkça rüzgâr ve deniz hızla artar; gözün (eye) çevresindeki eyewall en yıkıcı bölgedir.`,
          ],
          table: {
            caption: "TRS bölgesel adları ve sezonları (genel)",
            headers: ["Bölge", "Ad", "Tipik sezon"],
            rows: [
              ["NW Pasifik", "Typhoon", "Yıl boyu, zirve Tem–Eki"],
              ["NE Pasifik / Atlantik", "Hurricane", "Haz–Kas"],
              ["Hint Okyanusu / G. Pasifik", "Cyclone", "Kas–Nis (bölgeye göre)"],
            ],
          },
        },
        {
          subheading: "1.2 Erken belirtiler",
          paragraphs: [
            `Barometredeki kararlı düşüş, uzun periyotlu ölü deniz (swell), olağandışı bulut sistemleri ve normalden sapan rüzgâr, bir TRS'nin yaklaşımının klasik habercileridir. İkinci Zabit, aletsel veriyle (resmi uyarı) bu doğal belirtileri birleştirir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Basınç düşüşü ciddiye alınır",
              text: `Düzeltili barometrik basınçta belirgin ve sürekli bir düşüş, uzaktaki bir TRS'nin habercisidir. Uyarıyla teyit edilir; asla göz ardı edilmez.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Uyarı ve Veri Takibi",
      sections: [
        {
          subheading: "2.1 Resmi kaynaklar",
          paragraphs: [
            `İkinci Zabit; ilgili RSMC/uyarı merkezlerini (JMA, NHC, JTWC vb.), NAVTEX/EGC mesajlarını ve weather fax/GMDSS bültenlerini izler. Her uyarı; merkez konumu, basınç, maksimum rüzgâr, hareket yönü/hızı ve tahmin konilerini verir. Konum ve tahmin sürekli güncellenir.`,
          ],
          bullets: [
            `Merkez konumu ve basınç`,
            `Maksimum rüzgâr ve rüzgâr yarıçapları`,
            `Hareket yönü ve hızı`,
            `Tahmin konisi (forecast track) ve belirsizlik`,
          ],
        },
      ],
    },
    {
      heading: "3. Tehlikeli ve Seyredilebilir Yarım Daire",
      sections: [
        {
          subheading: "3.1 Yarım daire analizi",
          paragraphs: [
            `Fırtınanın ilerleme yönüne göre bir tarafı "tehlikeli yarım daire" (dangerous semicircle), diğeri "seyredilebilir yarım daire" (navigable semicircle) olur. Tehlikeli yarımda rüzgâr gemiyi fırtına yörüngesine doğru iterken, seyredilebilir yarımda uzağa iter. Kuzey yarımkürede ilerleme yönüne göre sağ taraf tehlikeli yarımdır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Buys Ballot kuralı",
              text: `Kuzey yarımkürede rüzgârı sırtınıza alırsanız alçak basınç merkezi solunuzdadır (güneyde sağınızda). Bu kural, rüzgâr yönünden fırtına merkezinin kabaca yönünü kestirmeye yarar.`,
            },
          ],
        },
        {
          subheading: "3.2 Kaçınma manevrası mantığı",
          paragraphs: [
            `Geleneksel kural; tehlikeli yarımdaysanız rüzgârı sancak baş omuzlamada tutarak (KH'de) merkezden uzaklaşmak, seyredilebilir yarımdaysanız rüzgârı kıç bordadan alarak hızla geçmektir. Amaç her zaman merkezden ve tahmin yörüngesinden mümkün olduğunca uzak kalmaktır.`,
          ],
        },
      ],
    },
    {
      heading: "4. Limit Çizgileri ve 1-2-3 Kuralı",
      sections: [
        {
          subheading: "4.1 Belirsizliğe pay bırakmak",
          paragraphs: [
            `Tahmin yörüngesi belirsizlik taşır; bu yüzden "1-2-3 kuralı" gibi yaklaşımlarla 24/48/72 saatlik tahmin konumları çevresine emniyet yarıçapları eklenir (örn. 100/200/300 NM) ve bu "limit çizgileri" dışında kalınmaya çalışılır. Bu, fırtınanın beklenmedik dönüşlerine karşı tampon sağlar.`,
          ],
          table: {
            caption: "1-2-3 kuralı (kavramsal)",
            headers: ["Tahmin", "Yarıçap payı (örnek)"],
            rows: [
              ["24 saat", "~100 NM"],
              ["48 saat", "~200 NM"],
              ["72 saat", "~300 NM"],
            ],
          },
        },
      ],
    },
    {
      heading: "5. Kaçınma Rotası ve Karar",
      sections: [
        {
          subheading: "5.1 Öneri kaptana sunulur",
          paragraphs: [
            `İkinci Zabit, analizini (merkez konumu, hareket, yarım daire, limit çizgileri, alternatif rotalar) net biçimde kaptana sunar. Seçenekler; rotayı değiştirmek, hız ayarlamak, sığınmak veya beklemek olabilir. Nihai karar kaptanındır; weather routing servisi varsa onun önerisi de değerlendirilir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Erken karar = güvenlik",
              text: `Tarihteki ağır hava kayıplarının çoğu, fırtınaya çok yaklaşıldıktan sonra kaçmaya çalışmaktan doğmuştur. Erken ve bol paylı kaçınma kararı, geç ve dar manevradan her zaman daha güvenlidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Gemi ve Yük Hazırlığı",
      sections: [
        {
          subheading: "6.1 Ağır havaya hazırlık",
          paragraphs: [
            `Kaçınma her zaman tam mümkün olmayabilir; ağır deniz beklentisinde lashing/securing kontrol edilir, hareketli ekipman bağlanır, su geçmez kapanışlar (watertight) sağlanır ve mürettebat bilgilendirilir. Parametric rolling ve synchronous rolling riski hız/rota ayarıyla yönetilir.`,
          ],
        },
      ],
    },
    {
      heading: "7. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "7.1 TRS değerlendirme kontrolü",
          bullets: [
            `İlgili RSMC uyarıları ve NAVTEX/EGC izleniyor mu?`,
            `Merkez konumu, basınç, hareket ve rüzgâr yarıçapları kaydedildi mi?`,
            `Tehlikeli/seyredilebilir yarım daire belirlendi mi?`,
            `Buys Ballot ve limit çizgileri (1-2-3) uygulandı mı?`,
            `Alternatif kaçınma rotaları kaptana sunuldu mu?`,
            `Ağır hava hazırlığı (lashing, watertight, brifing) yapıldı mı?`,
            `Barometre/swell gibi doğal belirtiler izleniyor mu?`,
          ],
          paragraphs: [
            `Tropikal fırtına kaçınması, denizcilik analizinin en saf hâlidir: veriyi okumak, belirsizliğe saygı duymak ve erken, temkinli karar vermek. İkinci Zabitin titiz takibi ve net analizi, kaptanın gemiyi fırtınanın yıkıcı çekirdeğinden uzak tutmasını sağlar.`,
          ],
        },
      ],
    },
  ],
};

export default content;
