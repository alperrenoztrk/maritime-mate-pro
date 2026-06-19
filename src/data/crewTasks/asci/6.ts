import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Atık gıda ve yağ bertarafı",
  roleSlug: "asci",
  taskIndex: 6,
  estimatedPages: 24,
  intro: `Gemi mutfağı, geminin en büyük gıda atığı ve kullanılmış yağ kaynağıdır. Bu atıkların ayrıştırılması, depolanması ve uygun şekilde bertarafı, MARPOL Ek V (çöp) kapsamında katı kurallara tabidir ve doğrudan deniz kirliliğini önlemeye hizmet eder. Aşçı; gıda atığının ayrıştırılması, deniz dışına atımın izin verilen koşullarının bilinmesi, kullanılmış yemeklik yağların toplanıp shore reception facility'ye veya onaylı sisteme teslimi ve mutfak atıklarının Garbage Record Book'a kaydedilmesine destek olmaktan sorumludur. Bu bölüm; MARPOL Ek V kategorileri, comminuter/macerator kullanımı, gıda atığı atım mesafeleri, yağ yönetimi ve kayıt disiplinini adım adım açıklar.`,
  sources: [
    "MARPOL Annex V — Prevention of Pollution by Garbage from Ships",
    "IMO Resolution MEPC.295(71) — 2017 Guidelines for Annex V Implementation",
    "IMO Resolution A.868(20) — Garbage Management Plan & Record Book",
    "Garbage Management Plan (ship-specific) & Garbage Record Book",
    "MLC 2006 — Standard A3.2 (food & catering / waste handling)",
    "WHO — Guide to Ship Sanitation (3rd Edition)",
    "Port reception facility regulations (MARPOL Annex V Reg. 8)",
  ],
  chapters: [
    {
      heading: "1. MARPOL Ek V Çerçevesi ve Atık Kategorileri",
      lead: `Doğru bertaraf, atığı doğru kategoriye yerleştirmekle başlar.`,
      sections: [
        {
          subheading: "1.1 Çöp kategorileri ve gıda atığının yeri",
          paragraphs: [
            `MARPOL Ek V, gemi çöpünü kategorilere ayırır ve her birinin deniz dışına atımını sıkı kurallara bağlar. Aşçıyı en çok ilgilendiren kategoriler gıda atığı (food waste) ve mutfak kaynaklı plastik/ambalaj/yağdır. Genel prensip "deniz temiz tutulur" yönündedir: plastik her durumda denize atılması yasak en katı kategoridir, gıda atığı ise yalnızca belirli koşullarda (kıyıdan belirli mesafe ve öğütülmüş olma şartı gibi) denize verilebilir.`,
            `Aşçı, mutfakta atığı kaynağında ayrıştırır: gıda atığı, plastik/ambalaj, cam/metal ve kullanılmış yağ ayrı kaplara konur. Bu ayrım hem MARPOL uyumu hem de doğru bertaraf için zorunludur; karışık atık (örn. gıdaya bulaşmış plastik) en kısıtlayıcı kategoriye göre işlem görür ve teslim maliyetini/karmaşasını artırır.`,
          ],
          table: {
            caption: `Ek V Açısından Mutfak Atığı — Genel Yaklaşım`,
            headers: ["Atık", "Deniz Dışına Atım", "Pratik Yöntem"],
            rows: [
              ["Plastik / ambalaj", "Her durumda YASAK", "Ayır, depola, reception facility"],
              ["Gıda atığı (öğütülmemiş)", "Çok kısıtlı (uzak mesafe)", "Tercihen öğüt veya teslim"],
              ["Gıda atığı (öğütülmüş)", "Koşullu izinli (mesafe şartı)", "Comminuter sonrası, kayıtla"],
              ["Kullanılmış yağ", "YASAK", "Ayrı kapta topla, teslim et"],
              ["Cam / metal", "Genelde teslim", "Ayır, depola, reception facility"],
            ],
          },
          callouts: [
            {
              type: "regulation",
              title: "MARPOL Ek V — temel kural",
              text: `Plastik dahil çöpün denize atılması esas olarak yasaktır. Gıda atığı, yalnızca Ek V'de belirtilen mesafe ve (özel alanlarda) öğütme koşulları sağlanırsa denize verilebilir. Şüphede atma, depola ve teslim et.`,
            },
          ],
        },
        {
          subheading: "1.2 Garbage Management Plan ve sorumluluk",
          paragraphs: [
            `Her gemi, gemiye özgü bir Garbage Management Plan (çöp yönetim planı) taşır; bu plan atığın nasıl ayrıştırılacağını, depolanacağını, işleneceğini ve teslim edileceğini tanımlar. Çöp yönetiminden sorumlu bir kişi atanır (genelde bir zabit); aşçı, mutfak kaynaklı atık için bu sistemin saha uygulayıcısıdır ve plana uygun davranmak, kayda destek vermekle yükümlüdür.`,
          ],
        },
      ],
    },
    {
      heading: "2. Gıda Atığının Yönetimi",
      sections: [
        {
          subheading: "2.1 Gıda atığını azaltma (kaynağında)",
          paragraphs: [
            `En iyi atık, hiç oluşmayan atıktır. Aşçı, porsiyon kontrolü, doğru sipariş/stok yönetimi ve FIFO rotasyonu ile gıda israfını kaynağında azaltır; bu hem MARPOL yükünü hem de bütçeyi olumlu etkiler. Tüketim verisini gözlemleyerek üretim miktarını kalibre eder; sürekli artan tabaklar fazla üretimin, israfın işaretidir.`,
            `Güvenli olan artan yemek, gıda güvenliği kurallarına uygun şekilde (uygun soğutma, tekrar ısıtma sıcaklığı) bir sonraki öğünde değerlendirilebilir; güvenli değilse atık akışına girer. Bu denge, hem israfı azaltır hem de gıda kaynaklı hastalık riskini önler.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "İsrafı önlemek = atığı önlemek",
              text: `Porsiyon disiplini ve doğru sipariş, hem MARPOL Ek V yükünü hem victualling bütçesini düşürür. En çevreci ve en ekonomik adım, atığı oluşmadan azaltmaktır.`,
            },
          ],
        },
        {
          subheading: "2.2 Comminuter/macerator ve denize atım koşulları",
          paragraphs: [
            `Gemilerde gıda atığını öğüten comminuter/macerator bulunabilir; öğütülmüş gıda atığının (belirli partikül boyutu altında) denize verilmesi, kıyıdan yeterli mesafe sağlandığında Ek V kapsamında koşullu olarak izinlidir. Öğütülmemiş gıda atığı için izin verilen mesafe daha uzaktır. Özel alanlarda (special areas) ve liman/kıyı yakınında kurallar çok daha katıdır.`,
            `Aşçı, denize atımın yalnızca uygun mesafe ve koşullarda, sorumlu zabitin onayı/koordinasyonuyla yapıldığını bilir; karada veya kıyıya yakınken gıda atığı denize verilmez, depolanır. Her denize atım veya teslim Garbage Record Book'a işlenir (bkz. kayıt bölümü).`,
          ],
          table: {
            caption: `Gıda Atığı Denize Atımı — Genel Mesafe İlkeleri (Kılavuz)`,
            headers: ["Durum", "İlke", "Not"],
            rows: [
              ["Öğütülmüş gıda atığı", "Kıyıdan daha kısa mesafede koşullu izin", "Macerator + mesafe şartı"],
              ["Öğütülmemiş gıda atığı", "Kıyıdan daha uzak mesafe gerekir", "Daha kısıtlayıcı"],
              ["Özel alanlar (special area)", "Çok daha katı kurallar", "Genelde teslim tercih"],
              ["Liman / kıyıya yakın", "Denize atım YOK", "Depola, teslim et"],
            ],
          },
          callouts: [
            {
              type: "warning",
              title: "Gıdaya karışan plastik tuzağı",
              text: `İçinde plastik (ambalaj, eldiven parçası) bulunan gıda atığı denize verilemez; karışık atık en katı kurala (plastik) göre işlem görür. Ayrıştırma kaynakta titiz yapılmalıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Kullanılmış Yemeklik Yağ Yönetimi",
      sections: [
        {
          subheading: "3.1 Toplama ve depolama",
          paragraphs: [
            `Kullanılmış yemeklik (kızartma) yağ kesinlikle denize verilmez ve drenaja/lavaboya dökülmez; ayrı, kapalı, etiketli bir kapta biriktirilir. Yağın su/akarsu sistemine karışması hem MARPOL ihlali hem de tesisat tıkanması ve haşere problemidir. Aşçı, fritöz yağ değişiminde eski yağı doğrudan bu toplama kabına aktarır ve kabı güvenli, sızdırmaz biçimde depolar.`,
            `Yağ atığı, geminin atık yönetim sistemine göre ya onaylı bir gemi içi sisteme (örn. yağlı atık tankı/incinerator uygunsa) ya da limanda shore reception facility'ye teslim edilir. Teslim, alındı belgesiyle (receipt) kayıt altına alınır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Lavaboya yağ dökme yasak",
              text: `Sıcak yağı lavaboya/drenaja dökmek tesisatı tıkar, haşere çeker ve nihayetinde deniz kirliliğine yol açar. Yağ daima ayrı kapta toplanır ve onaylı şekilde teslim edilir.`,
            },
          ],
        },
        {
          subheading: "3.2 Shore reception facility'ye teslim",
          paragraphs: [
            `Limanda kullanılmış yağ ve diğer ayrıştırılmış atık (plastik, cam, metal, gıda atığı) onaylı liman atık alım tesisine teslim edilir. MARPOL, limanların yeterli reception facility sağlamasını öngörür. Teslim sırasında atık türü ve miktarı belgelenir; bu belge geminin atık kayıtlarıyla eşleşir. Aşçı, teslimat için atığı düzenli, etiketli ve ayrıştırılmış hazır tutarak süreci kolaylaştırır.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "MARPOL Ek V Reg. 8 — reception facility",
              text: `Taraf devletler, gemilerin çöpünü teslim edebileceği yeterli liman atık alım tesisleri sağlamakla yükümlüdür. Gemi, denize atamadığı atığı bu tesislere teslim eder.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Atık Depolama ve Hijyen İlişkisi",
      sections: [
        {
          subheading: "4.1 Atık deposu ve koku/haşere kontrolü",
          paragraphs: [
            `Denize verilemeyen veya teslim bekleyen atık, gemide depolanır; bu depolama hijyenik olmalıdır. Gıda atığı kapaklı, sızdırmaz kaplarda tutulur ve mümkünse soğutulur (uzun sefer, sıcak iklim) ki koku ve bozulma haşere çekmesin. Aşçı, mutfak atık akışını galley düzenine entegre eder; çöp istasyonu temiz alandan ayrı ve servisle çakışmayan konumdadır (bkz. mutfak düzeni görevi).`,
            `Atık kapları düzenli boşaltılır ve temizlenir; biriken atık hem koku hem böcek/kemirgen cazibesidir. Plastik ve geri dönüştürülebilir atık sıkıştırılarak hacim azaltılabilir (compactor varsa), bu depolama yükünü düşürür.`,
          ],
          bullets: [
            `Gıda atığı kapaklı, sızdırmaz, mümkünse soğutmalı depo`,
            `Çöp istasyonu temiz alandan ve servisten ayrı`,
            `Düzenli boşaltma + kap temizliği (koku/haşere önleme)`,
            `Plastik/geri dönüşüm ayrı, gerekiyorsa sıkıştırma`,
          ],
        },
        {
          subheading: "4.2 İncinerator ve gemi içi işleme (varsa)",
          paragraphs: [
            `Bazı gemilerde onaylı incinerator (yakma) veya başka işleme ekipmanı bulunur; ancak gıda atığı ve yağ için yakma, ekipmanın onayına ve emisyon kurallarına (MARPOL Ek VI ile bağlantılı) tabidir ve her atık türü yakılamaz. Aşçı, gemi atık yönetim planının izin verdiği yöntemleri uygular; izin dışı yakma yapılmaz. Şüphede atık depolanır ve sorumlu zabitle koordine edilir.`,
          ],
        },
      ],
    },
    {
      heading: "5. Garbage Record Book ve Kayıt Disiplini",
      sections: [
        {
          subheading: "5.1 Mutfak atığının kaydedilmesine destek",
          paragraphs: [
            `Garbage Record Book (GRB), her atık işleminin (denize atım, yakma, reception facility'ye teslim) kategorisi, miktarı, tarihi, saati ve gemi konumuyla kayıt altına alındığı resmi belgedir. Kaydı genelde sorumlu zabit tutar; aşçı, mutfak kaynaklı gıda atığı ve yağ miktarları/teslimleri hakkında doğru bilgi sağlayarak bu kayda destek olur. Yanlış veya eksik GRB kaydı, ağır cezalara (özellikle ABD'de) yol açabilen ciddi bir uygunsuzluktur.`,
            `Aşçı, mutfak atığının türünü ve yaklaşık miktarını izler; teslim/atım anlarını sorumlu zabite zamanında bildirir. Bu izlenebilirlik, MARPOL denetimlerinde geminin uyumunu kanıtlar ve "magic pipe / kayıt sahteciliği" gibi suistimallerin önündeki en güçlü engeldir.`,
          ],
          table: {
            caption: `Garbage Record Book — Tipik Kayıt Alanları`,
            headers: ["Alan", "İçerik", "Aşçının Katkısı"],
            rows: [
              ["Tarih / saat", "İşlem zamanı", "Atık üretim/teslim zamanını bildir"],
              ["Konum", "Enlem/boylam veya liman", "Sorumlu zabit kaydeder"],
              ["Kategori", "Gıda/plastik/yağ vb.", "Doğru ayrıştırma sağlar"],
              ["Miktar (m³/kg)", "Tahmini hacim/ağırlık", "Mutfak atığı miktarını bildir"],
              ["Yöntem", "Denize/teslim/yakma", "Uygulanan yöntemi doğrular"],
            ],
          },
          callouts: [
            {
              type: "regulation",
              title: "GRB — kayıt zorunluluğu",
              text: `MARPOL Ek V, belirli gemiler için Garbage Record Book tutulmasını ve her atık işleminin kaydedilmesini zorunlu kılar. Kayıtlar denetime hazır ve doğru olmalıdır.`,
            },
          ],
        },
        {
          subheading: "5.2 Denetim ve ceza riski",
          paragraphs: [
            `MARPOL Ek V uyumu PSC ve liman otoritelerince denetlenir; GRB ile fiili atık akışı arasında tutarsızlık ağır cezalara yol açar. Aşçı, mutfak atığını doğru ayrıştırıp doğru bildirerek geminin uyum zincirinin ilk halkasını sağlam tutar. "Şüphede denize atma, depola ve teslim et" prensibi en güvenli kuraldır.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Kayıt-fiili uyumsuzluğu",
              text: `Denetimde GRB'de teslim görünen gıda atığının fiilen denize verildiğinin anlaşılması, gemiyi tutuklanmaya ve şirketi yüksek para cezasına götürebilir. Doğru ayrıştırma ve doğru bildirim hayatidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Özel Alanlar ve Sıkı Bölge Kuralları",
      sections: [
        {
          subheading: "6.1 Special area ve hassas bölgeler",
          paragraphs: [
            `MARPOL, bazı denizleri (örn. Akdeniz, Baltık, Kuzey Denizi, Kutup bölgeleri gibi belirlenmiş "special area"lar) hassas kabul eder ve buralarda atık kuralları çok daha katıdır; gıda atığı denize atımı için mesafe ve koşullar daha sıkıdır, bazı durumlarda fiilen teslim tek seçenektir. Aşçı, geminin bulunduğu bölgenin kurallarını sorumlu zabitten teyit eder ve buna göre depolama/teslim planlar.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Özel alanda 'normal' kural geçmez",
              text: `Special area'da açık denizdeki gıda atığı atım kuralları geçerli olmayabilir. Bölge belirsizse atık denize verilmez; depolanır ve limanda teslim edilir.`,
            },
          ],
        },
        {
          subheading: "6.2 Bölgeye göre planlama",
          paragraphs: [
            `Aşçı, sefer rotasını ve geçilecek özel alanları bilerek atık depolama kapasitesini planlar: katı kurallı bölgeye girmeden önce atık teslim edilir veya yeterli depolama ayrılır. Bu öngörü, hem MARPOL uyumunu garanti eder hem de depolarda koku/haşere baskısını önler.`,
          ],
        },
      ],
    },
    {
      heading: "7. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "7.1 Atık bertaraf checklist'i",
          bullets: [
            `Mutfak atığı kaynakta ayrıştırıldı mı (gıda/plastik/cam-metal/yağ)?`,
            `Plastik ve ambalaj denize ASLA verilmiyor, depolanıyor mu?`,
            `Gıda atığı denize atımı yalnızca uygun mesafe/koşulda mı yapıldı?`,
            `Kullanılmış yağ ayrı, kapalı kapta toplandı, lavaboya dökülmedi mi?`,
            `Atık kaplarına gıdaya karışan plastik kaçmadı mı?`,
            `Atık depo kapaklı, düzenli boşaltılan ve koku/haşere kontrollü mü?`,
            `Teslim/atım miktarları sorumlu zabite bildirildi (GRB desteği) mi?`,
            `Reception facility teslim belgesi alındı mı?`,
            `Özel alan kuralları bölgeye göre teyit edildi mi?`,
          ],
          paragraphs: [
            `Atık gıda ve yağ bertarafı, aşçının deniz çevresinin korunmasına en somut katkısıdır. Doğru ayrıştırma, israfı kaynağında azaltma, yağı asla denize/drenaja vermeme, gıda atığını yalnızca izin verilen koşullarda elden çıkarma ve Garbage Record Book'a doğru bilgi sağlama; bu zincirin her halkası hem MARPOL Ek V uyumunu hem de denizlerin temizliğini güvence altına alır. Şüphede daima depola ve limanda teslim et.`,
          ],
        },
      ],
    },
  ],
};

export default content;
