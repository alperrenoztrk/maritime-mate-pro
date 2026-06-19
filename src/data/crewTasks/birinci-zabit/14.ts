import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Garbage Management Plan ve atık ayrıştırma",
  roleSlug: "birinci-zabit",
  taskIndex: 14,
  estimatedPages: 23,
  intro: `MARPOL Ek V kapsamında onaylı Garbage Management Plan'ın gemide uygulanması ve Garbage Record Book Part I/II kayıtlarının doğruluğundan Birinci Zabit sorumludur. Plastik, gıda, kâğıt, cam, metal, e-waste ve cargo residue kategorilerinin ayrı toplanması, etiketli bin'lerin güvertede konumlandırılması ve shore reception facility'ye teslim makbuzlarının saklanması gerekir. Çöp yönetimi, PSC denetimlerinde en sık incelenen ve kayıt tutarsızlığında ağır cezalandırılan alanlardandır. Bu bölüm, Birinci Zabit'in MARPOL Annex V uyumlu atık yönetimi metodolojisini detaylandırır.`,
  sources: [
    "MARPOL Annex V — Prevention of Pollution by Garbage from Ships",
    "Resolution MEPC.295(71) — 2017 Guidelines for Implementation of MARPOL Annex V",
    "Resolution MEPC.220(63) — Guidelines for Garbage Management Plans",
    "MEPC.1/Circ.834 — Port Reception Facilities",
    "IMSBC Code — Cargo Residues & HME classification",
    "Polar Code Part II-A — Garbage (kutup bölgeleri)",
    "ISM Code — Environmental Procedures",
    "Company SMS — Waste Management Procedures",
  ],
  chapters: [
    {
      heading: "1. MARPOL Annex V Çerçevesi",
      lead: `Annex V, gemi kaynaklı çöpün denize verilmesini kategori ve bölge bazında katı kurallarla düzenler.`,
      sections: [
        {
          subheading: "1.1 Annex V kapsamı ve temel prensip",
          paragraphs: [
            `MARPOL Annex V, gemilerden kaynaklanan tüm çöpün (garbage) yönetimini düzenler. Temel prensip, plastiğin denize atılmasının tamamen yasak olması ve diğer atıkların yalnızca belirli koşullarda (mesafe, hız, kategori) denize verilebilmesidir. Annex V'in 2013 revizyonu kuralları sıkılaştırmış ve "deşarj genel olarak yasak, istisnalar tanımlı" yaklaşımına geçmiştir.`,
            `100 GT üzeri, 15+ kişi taşıyan gemiler ve sabit/yüzer platformlar Garbage Management Plan ve Garbage Record Book bulundurmak zorundadır. Birinci Zabit, planın uygulanmasından ve kayıtların doğruluğundan birinci derecede sorumludur.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "Annex V — plastik yasağı",
              text: `Plastik (sentetik halat, balıkçılık ağı, plastik torba, ambalaj dahil) denize hiçbir koşulda atılamaz. Plastik gemide saklanır ve shore reception facility'ye teslim edilir. Bu kuralın ihlali en ağır cezalandırılan çevre suçlarındandır.`,
            },
          ],
        },
        {
          subheading: "1.2 Special Area ve kutup bölgeleri",
          paragraphs: [
            `Special Area'larda (Akdeniz, Baltık, Karadeniz, Kızıldeniz, Körfez bölgesi, Kuzey Denizi, Antarktik vb.) deşarj kuralları çok daha katıdır; genelde sadece öğütülmüş gıda atığı, belirli koşullarda izinlidir. Kutup sularında (Polar Code) kurallar daha da sıkıdır. Birinci Zabit, geminin bulunduğu bölgeye göre doğru kuralı uygular; yanlış bölgede deşarj ciddi ihlaldir.`,
          ],
        },
      ],
    },
    {
      heading: "2. Çöp Kategorileri ve Deşarj Kuralları",
      sections: [
        {
          subheading: "2.1 Kategori sınıflandırması",
          paragraphs: [
            `Annex V çöpü kategorilere ayırır: A (plastik), B (gıda atığı), C (domestic waste — kâğıt, bez, cam, metal, şişe), D (pişirme yağı), E (incinerator külü), F (operasyonel atık), G (hayvansal leş), H (kargo kalıntısı — HME ve non-HME), I (balıkçılık ekipmanı), J (e-waste). Her kategorinin kendi deşarj/saklama kuralı vardır. Birinci Zabit, ekibin doğru kategorilendirme yapmasını sağlar.`,
            `Genel kural: plastik, pişirme yağı, incinerator külü, operasyonel atık ve e-waste denize atılamaz; saklanıp teslim edilir. Gıda atığı ve non-HME kargo kalıntısı, mesafe/koşul şartıyla deşarj edilebilir.`,
          ],
          table: {
            caption: `MARPOL Annex V — Deşarj Kuralları (Special Area Dışı, Özet)`,
            headers: ["Kategori", "Denize Deşarj", "Koşul"],
            rows: [
              ["Plastik (A)", "Yasak", "Tüm denizlerde yasak"],
              ["Gıda atığı (B), öğütülmemiş", "İzinli", "> 12 nm karadan"],
              ["Gıda atığı (B), öğütülmüş <25mm", "İzinli", "> 3 nm karadan"],
              ["Domestic waste (C)", "Yasak", "Saklanır, teslim edilir"],
              ["Kargo kalıntısı (H) non-HME", "Şartlı", "> 12 nm, washwater"],
              ["E-waste (J) / pişirme yağı (D)", "Yasak", "Saklanır, teslim edilir"],
            ],
          },
        },
        {
          subheading: "2.2 HME (Harmful to Marine Environment) kargo kalıntısı",
          paragraphs: [
            `Dökme yük kalıntısı, IMSBC kriterlerine göre HME (deniz çevresine zararlı) ise denize verilemez; yıkama suyu dahil saklanıp reception facility'ye teslim edilir. Shipper, kargonun HME olup olmadığını beyan eder; Birinci Zabit bu beyanı kontrol eder ve hold yıkama suyu deşarj kararını buna göre verir. HME tespitinde tereddüt varsa zararlı kabul edilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "HME beyanı kontrolü",
              text: `Kargo kalıntısının HME olup olmadığı yanlış değerlendirilirse, zararlı yıkama suyu denize verilerek ciddi kirlilik ve ihlal yaşanır. Shipper beyanı titizlikle kontrol edilmeli, şüphede zararlı kabul edilmelidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Atık Ayrıştırma ve Toplama Sistemi",
      sections: [
        {
          subheading: "3.1 Etiketli bin düzeni ve renk kodu",
          paragraphs: [
            `Etkili ayrıştırma, kaynağında doğru toplama ile başlar. Birinci Zabit, güvertede ve yaşam mahallinde etiketli, renk kodlu garbage bin'leri uygun noktalara yerleştirir: plastik, gıda, kâğıt/karton, cam, metal ve tehlikeli/e-waste için ayrı bin'ler. Etiketler net ve çok dilli (mürettebat çeşitliliği için) olmalıdır. Yanlış ayrıştırılmış atık, sonradan ayrıştırma zorluğu ve hatalı deşarj riski doğurur.`,
            `Toplanan atık, sınıflandırılarak saklama alanına (garbage storage) taşınır. Plastik ve teslim edilecek atıklar düzenli, kokusuz ve sızıntısız saklanır; gıda atığı hijyen açısından ayrı yönetilir.`,
          ],
          bullets: [
            `Plastik — ayrı bin, asla denize atılmaz`,
            `Gıda atığı — öğütücü (comminuter) ile işlenebilir`,
            `Kâğıt/karton, cam, metal — ayrı toplanır`,
            `E-waste, piller, kimyasal kaplar — tehlikeli, ayrı`,
            `Pişirme yağı — ayrı toplanır, teslim edilir`,
          ],
        },
        {
          subheading: "3.2 Atık azaltma ve işleme ekipmanı",
          paragraphs: [
            `Çöp miktarını azaltmak için compactor (sıkıştırıcı), comminuter (gıda öğütücü) ve incinerator (yakıcı) kullanılabilir. Comminuted gıda atığı 25 mm altına öğütülürse 3 nm sonrası deşarj edilebilir. Incinerator kullanımı Annex V ve VI'ya tabidir; plastik, kargo kalıntısı gibi maddelerin yakılması yasaktır ve liman/Special Area'da kısıtlanabilir. Birinci Zabit bu ekipmanların doğru ve kayıtlı kullanımını sağlar.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Kaynakta azaltma",
              text: `En iyi atık, hiç oluşmayan atıktır. Ambalajı limanda bırakmak, tekrar kullanılabilir malzeme tercih etmek ve fazla paketlemeyi reddetmek gemideki atık yükünü ve teslim maliyetini azaltır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Garbage Record Book ve Kayıt",
      sections: [
        {
          subheading: "4.1 GRB Part I ve Part II",
          paragraphs: [
            `Garbage Record Book, her atık işlemini kayıt altına alır: Part I gemi kaynaklı atıkları (deşarj, yakma, shore teslim), Part II ise kargo kalıntılarını kaydeder. Her giriş; tarih, saat, gemi pozisyonu, atık kategorisi, tahmini miktar (m³) ve işlem türü (denize deşarj/yakma/teslim) içerir. Sorumlu zabit imzalar; Kaptan sayfaları onaylar. Birinci Zabit kayıtların doğruluğundan sorumludur.`,
            `GRB en az iki yıl gemide saklanır. PSC, GRB ile fiili atık üretimi ve teslim makbuzları arasında tutarlılık arar; tutarsızlık kasıtlı ihlal şüphesi doğurur.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "GRB — kayıt zorunluluğu",
              text: `MARPOL Annex V Reg. 10, GRB tutmayı (≥100 GT veya ≥15 kişi) zorunlu kılar. Her işlem gerçek zamanlı, doğru ve okunaklı kaydedilmeli, gemi en az iki yıl saklamalıdır.`,
            },
          ],
        },
        {
          subheading: "4.2 Teslim makbuzları ve çapraz kontrol",
          paragraphs: [
            `Shore reception facility'ye yapılan her teslimde alınan makbuz (garbage disposal receipt), miktar ve kategori ile saklanır ve GRB ile çapraz kontrol edilir. Makbuz ile GRB arasındaki uyumsuzluk, denetimde ciddi bulgu açar. Birinci Zabit, teslim öncesi atık miktarını tahmin eder ve makbuzla doğrular.`,
          ],
          table: {
            caption: `GRB Kayıt Bileşenleri`,
            headers: ["Alan", "İçerik", "Önem"],
            rows: [
              ["Tarih/saat", "İşlem zamanı", "Bölge/mesafe doğrulaması"],
              ["Pozisyon", "Enlem/boylam", "Special Area kontrolü"],
              ["Kategori", "A-J sınıfı", "Deşarj uygunluğu"],
              ["Miktar (m³)", "Tahmini hacim", "Makbuz tutarlılığı"],
              ["İşlem", "Deşarj/yakma/teslim", "Yasallık kaydı"],
            ],
          },
        },
      ],
    },
    {
      heading: "5. Shore Reception ve Liman Koordinasyonu",
      sections: [
        {
          subheading: "5.1 Reception facility planlaması",
          paragraphs: [
            `Birinci Zabit, port stay süresine ve atık birikimine göre shore reception facility teslimini planlar. Bazı atıklar (plastik, e-waste, HME kalıntı) yalnızca karada teslim edilebildiği için, uygun liman ve tesis önceden ayarlanır. Liman atık bildirimi (advance waste notification) çoğu limanda zorunludur; Birinci Zabit bu bildirimi agent aracılığıyla yapar.`,
            `Yetersiz reception facility durumunda (özellikle bazı limanlarda), bu MEPC.1/Circ.834 kapsamında raporlanabilir. Birinci Zabit, atık teslim edilemezse saklama kapasitesini yönetir ve bir sonraki uygun limanı planlar.`,
          ],
        },
        {
          subheading: "5.2 Maliyet ve şirket politikası",
          paragraphs: [
            `Atık teslimi maliyetlidir; ancak yasadışı deşarj cezası karşısında bu maliyet önemsizdir. Şirket SMS'i genelde "no overboard discharge" politikası uygular ve tüm atığın teslimini şart koşar. Birinci Zabit, maliyet baskısının asla kayıt sahteciliğine veya yasadışı deşarja yol açmamasını sağlar.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka — kayıt sahteciliği",
              text: `Bir gemide GRB'ye gerçekte denize atılan atık "teslim edildi" diye yazıldı; teslim makbuzu olmadığı PSC'de fark edildi ve kasıtlı ihlal işlemi başlatıldı. Ders: kayıtlar daima gerçeği yansıtmalı; sahtecilik suçtur ve ağır cezalandırılır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Eğitim, Tatbikat ve Denetim Hazırlığı",
      sections: [
        {
          subheading: "6.1 Mürettebat eğitimi ve farkındalık",
          paragraphs: [
            `Doğru atık yönetimi, tüm mürettebatın katılımını gerektirir. Birinci Zabit, ekibe ayrıştırma kuralları, deşarj yasakları ve GRB önemi konusunda eğitim verir; familiarization'a bunu dahil eder. Garbage Management Plan, herkesin erişebileceği yerde bulundurulur ve sorumluluklar net tanımlanır.`,
          ],
        },
        {
          subheading: "6.2 Self-audit ve PSC hazırlığı",
          paragraphs: [
            `Birinci Zabit, her liman öncesi GRB-makbuz tutarlılığını, bin etiketlerini ve saklama düzenini kontrol eder. PSC denetçileri çöp yönetimini sık inceler; tutarlı kayıt, düzenli ayrıştırma ve geçerli plan bulguları önler. Düzenli iç denetim, çevre uyumunu sürdürülebilir kılar.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Liman öncesi kontrol",
              text: `Her liman öncesi GRB güncelliği, teslim makbuzları, bin düzeni ve saklama alanı kontrolü, çöp yönetimi kaynaklı PSC bulgularının büyük kısmını önler. Çevre uyumu süreklilik işidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. Özel Durumlar ve Riskler",
      sections: [
        {
          subheading: "7.1 Operasyonel atık ve kimyasal kaplar",
          paragraphs: [
            `Boya kovaları, kimyasal bidonları, kaynak elektrodu artıkları ve diğer operasyonel atıklar (kategori F) denize atılamaz; tehlikeli atık olarak ayrı saklanır ve uygun tesise teslim edilir. MSDS'lere göre kimyasal atık yönetilir; yanlış karıştırma yangın/reaksiyon riski doğurur. Birinci Zabit bu atıkların doğru saklanmasını denetler.`,
          ],
        },
        {
          subheading: "7.2 Spill ve atık karışımı önleme",
          paragraphs: [
            `Atık saklama alanlarında sızıntı (özellikle gıda atığı, yağlı atık) önlenir; güverte kirliliği ve denize geçiş riski kontrol edilir. Farklı kategorilerin karışması (örn. plastik + gıda) hem ayrıştırmayı bozar hem deşarj uygunluğunu kaybettirir. Düzenli ve temiz saklama, hem hijyen hem mevzuat açısından önemlidir.`,
          ],
        },
      ],
    },
    {
      heading: "8. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "8.1 Birinci Zabit'in atık yönetimi checklist'i",
          bullets: [
            `Garbage Management Plan onaylı ve erişilebilir mi?`,
            `Etiketli/renk kodlu bin'ler doğru noktalarda mı?`,
            `Plastik ve yasak atıklar saklanıp teslim ediliyor mu?`,
            `Bölgeye (Special Area/kutup) göre doğru kural uygulanıyor mu?`,
            `Kargo kalıntısı HME değerlendirmesi yapıldı mı?`,
            `GRB Part I/II gerçek zamanlı, doğru ve imzalı mı?`,
            `Teslim makbuzları saklandı ve GRB ile tutarlı mı?`,
            `Incinerator/compactor kuralları ve kayıtları doğru mu?`,
            `Mürettebat ayrıştırma konusunda eğitildi mi?`,
            `Liman öncesi self-audit yapıldı mı?`,
          ],
          paragraphs: [
            `Atık yönetimi, küçük günlük disiplinlerin toplamıdır ama denetimde büyük sonuçlar doğurur. Birinci Zabit'in başarısı; doğru ayrıştırma sistemini kurmak, dürüst ve gerçek zamanlı kayıt tutmak, atığı yasal yollarla teslim etmek ve "denize tek parça çöp gitmesin" kültürünü ekibe yerleştirmektir. Temiz kayıt ve temiz deniz, gemiyi ağır cezalardan ve şirketi itibar kaybından korur.`,
          ],
        },
      ],
    },
  ],
};

export default content;
