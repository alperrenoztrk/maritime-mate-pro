import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Çamaşırhane hizmetleri",
  roleSlug: "kamarot",
  taskIndex: 3,
  estimatedPages: 25,
  intro: `Çamaşırhane hizmetleri, kamarotun yaşam mahalli hijyeninin en görünür ve en çok temas içeren parçasıdır: mürettebat çarşafları, havluları, üniformaları ve kişisel çamaşırları geminin laundry sistemine göre yıkanır, kurutulur ve gerektiğinde ütülenir. Bu görev sadece "çamaşır yıkamak" değildir; doğru ayrıştırma, sıcaklık ve kimyasal seçimi, çapraz bulaşma kontrolü, çamaşır makinesi ve kurutucu bakımı ve lint kaynaklı yangın riskinin yönetimini kapsar. Bu bölüm; MLC 2006 yaşam koşulları standardı, gemi hijyen prensipleri ve çamaşırhane yangın emniyeti çerçevesinde kamarotun sistematik çamaşırhane metodolojisini adım adım açıklar. İyi yönetilen bir çamaşırhane, hem mürettebat refahının hem de denetim uygunluğunun somut göstergesidir.`,
  sources: [
    "MLC 2006 (Maritime Labour Convention) Regulation 3.1 — Accommodation and Recreational Facilities",
    "MLC 2006 Standard A3.1 — Laundry and Personal Hygiene Facilities",
    "ILO/WHO Guide to Ship Sanitation (WHO, 3rd Edition) — Linen and Laundry",
    "SOLAS Chapter II-2 — Fire Protection (laundry spaces, ventilation ducts)",
    "ISM Code — Safety Management System housekeeping and maintenance procedures",
    "WHO International Health Regulations (IHR 2005) — vessel sanitation",
    "P&I Club / TT Club Loss Prevention — Tumble Dryer & Lint Fire Risk advisories",
  ],
  chapters: [
    {
      heading: "1. Gemi Çamaşırhanesinin İşlevi ve Kamarotun Sorumluluğu",
      lead: `Çamaşırhane, yaşam mahallinin hijyen döngüsünü kapatan birimdir. Kirli tekstil, doğru işlenmediğinde enfeksiyon ve koku kaynağına dönüşür; doğru işlendiğinde mürettebat sağlığının ve moralinin temelidir.`,
      sections: [
        {
          subheading: "1.1 Çamaşırhane düzeni ve iş akışı",
          paragraphs: [
            `Gemi çamaşırhanesi (ship's laundry) tipik olarak endüstriyel veya yarı-endüstriyel çamaşır makineleri, tumble dryer (kurutucu), ütü/ütü masası, çamaşır arabaları ve kirli/temiz ayrımını sağlayan torba sistemi içerir. Kamarot, iş akışını "kirli giriş → ayrıştırma → yıkama → kurutma → katlama/ütüleme → temiz çıkış" şeklinde tek yönlü kurar. Kirli ve temiz çamaşırın yolları asla kesişmez; bu, çapraz bulaşmayı önleyen temel ilkedir.`,
            `Çamaşır toplama programı genellikle yatak takımı için haftalık, üniforma ve kişisel çamaşır için ihtiyaca göre düzenlenir. Subay/zabit ve tayfa çamaşırı, geminin uygulamasına göre ayrı program veya etiketleme ile takip edilebilir, ancak hijyen standardı her ikisinde de eşittir. Kamarot, hangi kamaradan hangi çamaşırın geldiğini karıştırmamak için etiketleme/torbalama sistemini titizlikle uygular.`,
          ],
          bullets: [
            `Kirli toplama: yatak takımı haftalık, kişisel çamaşır ihtiyaca göre`,
            `Ayrıştırma: renk, kumaş tipi ve kirlilik düzeyine göre`,
            `Yıkama → kurutma → katlama tek yönlü akış`,
            `Temiz çamaşır kamara/sahibine doğru teslim`,
            `Çamaşırhane günlük temizlik ve lint kontrolü`,
          ],
        },
        {
          subheading: "1.2 MLC 2006 kapsamında çamaşır ve kişisel hijyen olanağı",
          paragraphs: [
            `MLC 2006 Regulation 3.1 ve Standard A3.1, gemide mürettebatın çamaşır yıkayabileceği ve kişisel hijyenini sağlayabileceği uygun olanakların bulunmasını şart koşar. Çamaşırhanenin çalışır, temiz ve erişilebilir tutulması işverenin yükümlülüğüdür; kamarot bu olanağın sahadaki uygulayıcısıdır. Bozuk bir çamaşır makinesi veya kirli bir çamaşırhane, MLC denetiminde doğrudan bulgu (deficiency) konusudur.`,
            `Temiz yatak takımı ve havlu sağlamak, sadece konfor değil sağlık meselesidir. Düzenli değişmeyen, kötü kurutulmuş veya küflenmiş tekstil; cilt enfeksiyonu, alerji ve solunum sorunlarına yol açar. Kamarot, çamaşır döngüsünü aksatmadan yürüterek bu riskleri yönetir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MLC 2006 — Standard A3.1",
              text: `Gemide mürettebatın kullanımına uygun çamaşır olanakları ve kişisel hijyen tesisleri sağlanmalı; bu olanaklar temiz, çalışır ve iyi onarılmış tutulmalıdır. Eksiklik PSC/MLC denetiminde bulgu olarak kaydedilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Çamaşır Ayrıştırma ve Ön Hazırlık",
      sections: [
        {
          subheading: "2.1 Renk, kumaş ve kirlilik düzeyine göre ayrıştırma",
          paragraphs: [
            `Yıkama öncesi ayrıştırma, hem çamaşırın ömrünü hem de hijyen kalitesini belirler. Beyaz ve açık renkliler, koyu renklilerden ayrılır; aksi halde renk akması (color bleeding) tüm partiyi bozar. Kumaş tipi de ayrılır: hassas tekstil (delicates), havlu, çarşaf ve üniforma farklı program ve sıcaklık gerektirir. Aşırı kirli veya yağlı iş kıyafetleri, temiz tekstille asla aynı partide yıkanmaz.`,
            `Kirlilik düzeyi ayrıştırmanın kritik boyutudur. Hasta mürettebatın çamaşırı, kan/vücut sıvısı bulaşmış tekstil ve mutfak/güverte yağlı kıyafetleri ayrı toplanır ve ayrı işlenir. Bu ayrım, çapraz bulaşma ve enfeksiyon yayılımını önler. Çamaşır makinesine atmadan önce cepler kontrol edilir; unutulan çakmak, kalem veya metal parça hem çamaşırı hem makineyi tahrip eder.`,
          ],
          table: {
            caption: `Çamaşır Ayrıştırma ve Önerilen Yıkama Parametreleri (genel pratik)`,
            headers: ["Çamaşır Türü", "Sıcaklık (yaklaşık)", "Not"],
            rows: [
              ["Beyaz çarşaf/havlu", "60-90°C", "Yüksek sıcaklık dezenfekte eder"],
              ["Renkli çarşaf/giysi", "30-40°C", "Renk akmasına dikkat"],
              ["Hassas tekstil", "30°C / hassas program", "Düşük devir, ayrı yıkama"],
              ["Yağlı iş kıyafeti", "Ayrı parti", "Diğer çamaşırla karıştırma"],
              ["Hasta/kontamine tekstil", "Yüksek sıcaklık, ayrı", "Eldivenle taşı, ayrı işle"],
            ],
          },
        },
        {
          subheading: "2.2 Leke kontrolü ve ön işlem",
          paragraphs: [
            `Bazı lekeler (kan, çay/kahve, yağ, mürekkep) doğrudan yıkamada çıkmaz; ön işlem (pre-treatment) gerekir. Leke tipi tanınır ve uygun ön işlem uygulanır: protein bazlı lekeler (kan) soğuk suyla işlenir, çünkü sıcak su proteini pıhtılaştırıp kalıcı hale getirir. Yağ bazlı lekeler ise ön işlem ve daha yüksek sıcaklık ister.`,
            `Ön işlem kimyasalları da kontrollü kullanılır; aşırı ağartıcı kumaşı yıpratır ve sararma/incelme yapar. Kamarot, "her lekeye çamaşır suyu" yaklaşımından kaçınır; doğru ürünü doğru lekeye uygular ve kumaş etiketindeki yıkama talimatlarına uyar.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Kan lekesinde soğuk su",
              text: `Kan ve diğer protein bazlı lekeler önce SOĞUK suyla işlenir. Sıcak su proteini pişirip kumaşa sabitler ve lekeyi kalıcı yapar. Önce soğuk durulama, sonra uygun ön işlem; ancak ardından yüksek sıcaklıkta dezenfekte yıkama.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Yıkama Süreci ve Deterjan/Kimyasal Yönetimi",
      sections: [
        {
          subheading: "3.1 Doğru deterjan, dozaj ve yumuşatıcı kullanımı",
          paragraphs: [
            `Deterjan dozajı, su sertliği ve çamaşır miktarına göre ayarlanır. Aşırı deterjan, durulamada tam çıkmaz; tekstilde kalıntı bırakır, cilt tahrişi yapar ve makineye zarar verir. Yetersiz deterjan ise temizlik ve dezenfeksiyonu zayıflatır. Kamarot, ürün etiketindeki dozaj talimatına ve makine kapasitesine uyar; "göz kararı" yerine ölçülü kullanım esastır.`,
            `Yumuşatıcı (fabric softener) konfor sağlar ancak havlu emiciliğini düşürdüğü için havlularda dikkatli kullanılır. Çamaşır suyu (sodyum hipoklorit) sadece beyazlarda ve dezenfeksiyon gereken durumlarda kontrollü kullanılır; renklileri solar ve kumaşı yıpratır. En kritik kural: çamaşır suyu asla asit bazlı ürünlerle aynı anda kullanılmaz, zehirli klor gazı açığa çıkar.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Kimyasal karıştırma yasağı",
              text: `Çamaşır suyu (hipoklorit) + asit veya + amonyak içeren ürünler birleşince zehirli klor/kloramin gazı çıkar. Kapalı çamaşırhanede bu solunum hasarı ve baygınlık yapar. Her kimyasal ayrı, etikete göre ve havalandırılmış ortamda kullanılır.`,
            },
          ],
        },
        {
          subheading: "3.2 Makine yükleme ve program seçimi",
          paragraphs: [
            `Çamaşır makinesi ne aşırı doldurulur ne de çok az yüklenir. Aşırı dolu makine iyi yıkamaz ve durulayamaz; çok az yük ise su ve enerji israfıdır. Çamaşır gevşekçe yerleştirilir, sıkıştırılmaz. Program, kumaş tipine ve kirlilik düzeyine göre seçilir; yüksek sıcaklık dezenfeksiyon sağlar ama hassas tekstili bozar.`,
            `Gemide tatlı su ve enerji sınırlı kaynaklardır. Kamarot, tam yük dolmadan gereksiz çevrim başlatmaktan kaçınır; bu hem su/enerji tasarrufu hem de jeneratör yükünün azaltılması demektir. Yıkama tamamlandığında çamaşır makinede bekletilmez; nem ve koku üretir.`,
          ],
          bullets: [
            `Makineyi dengeli yükle: ne aşırı dolu ne boş`,
            `Programı kumaş ve kirliliğe göre seç`,
            `Deterjanı dozaj talimatına göre ölç`,
            `Tatlı su/enerji tasarrufu için tam yük çalıştır`,
            `Yıkama bitince çamaşırı bekletmeden çıkar`,
          ],
        },
      ],
    },
    {
      heading: "4. Kurutma ve Lint Yangını Riski",
      sections: [
        {
          subheading: "4.1 Tumble dryer kullanımı ve sıcaklık yönetimi",
          paragraphs: [
            `Kurutucu (tumble dryer), çamaşırı hızlı kurutur ancak yanlış kullanım hem tekstili hem makineyi tehlikeye atar. Aşırı sıcaklık, hassas kumaşı küçültür ve elyafı bozar; aşırı dolu kurutucu ise dengesiz kurur ve enerji israfı yapar. Kumaş tipine göre sıcaklık seçilir, hassas tekstil düşük ısıda veya asılarak kurutulur.`,
            `Kurutucudan çıkan çamaşır tamamen kurumadan katlanıp dolaba konmaz; nemli tekstil küf ve koku üretir. Kamarot, çamaşırı katlamadan önce kuruluğunu kontrol eder ve nemli kalanları tekrar işler.`,
          ],
        },
        {
          subheading: "4.2 Lint birikimi ve yangın riski",
          paragraphs: [
            `Çamaşırhanedeki en ciddi yangın riski, kurutucunun lint (hav/tüy) filtresinde ve egzoz kanalında biriken yanıcı tüydür. Birikmiş lint, kurutucunun ısısıyla tutuşabilir ve gemi yangınına yol açabilir; P&I ve loss prevention kayıtları lint kaynaklı çamaşırhane yangınlarını sık rapor eder. Bu nedenle lint filtresi HER çevrimden sonra temizlenir, egzoz kanalı ise periyodik kontrol edilir.`,
            `Yağ veya solvent bulaşmış bezler (örneğin makine dairesinden gelen yağlı paçavralar) ASLA kurutucuya konmaz; bunlar kurutucu ısısında kendiliğinden tutuşabilir (spontaneous combustion). Kurutucu çalışırken yanına yanıcı malzeme konmaz ve makine gözetimsiz uzun süre çalıştırılmaz. Çamaşırhane yangın detektörünün ve fire damper'ın çalışır olduğu, kapaklarının açık tutulduğu kontrol edilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Lint = yangın yakıtı",
              text: `Tumble dryer lint filtresi HER çevrimden sonra temizlenmelidir. Birikmiş lint kolayca tutuşur ve gemi yangınına yol açabilir. Yağlı/solvent bulaşmış bezler kurutucuya konmaz — kendiliğinden tutuşma riski taşır.`,
            },
            {
              type: "example",
              title: "Vaka: Çamaşırhane yangını",
              text: `Bir gemide haftalarca temizlenmeyen kurutucu egzoz kanalındaki lint birikimi tutuştu ve yaşam mahallinde yangına yol açtı. Hasar ve sefer kaybı büyük oldu. Ders: lint her çevrimde temizlenir, egzoz kanalı periyodik kontrol edilir, kurutucu gözetimsiz çalıştırılmaz.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Ütüleme, Katlama ve Temiz Çamaşır Teslimi",
      sections: [
        {
          subheading: "5.1 Ütüleme tekniği ve emniyeti",
          paragraphs: [
            `Ütüleme, kumaş tipine göre sıcaklık ayarı gerektirir: pamuk yüksek, sentetik düşük ısıda ütülenir; yanlış sıcaklık sentetik kumaşı eritir veya pamuğu sararıp yakar. Ütü masası düzgün kurulur, ütü dik konumda bırakılır ve sıcakken gözetimsiz açık bırakılmaz. Buharlı ütüde yanık riski yüksektir; su haznesi ve buhar deliklerine dikkat edilir.`,
            `Ütü, kullanılmadığında mutlaka fişten çekilir ve soğumaya bırakılır. Sıcak ütünün kumaş veya yanıcı yüzey üzerinde unutulması çamaşırhane yangınının yaygın nedenlerindendir. Kamarot, ütüleme sonrası ütüyü kapatıp fişini çektiğinden ve tam soğumadan kaldırmadığından emin olur.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Sıcak ütüyü asla gözetimsiz bırakma",
              text: `Açık unutulan sıcak ütü, çamaşırhane yangınlarının klasik nedenidir. Ütü kullanılmadığında dik konuma alınır, kullanım bitince fişten çekilir ve soğumadan kaldırılmaz. Otomatik kapanma özelliği olsa bile manuel kontrol esastır.`,
            },
          ],
        },
        {
          subheading: "5.2 Katlama, etiketleme ve teslim",
          paragraphs: [
            `Temiz, kuru çamaşır düzgün katlanır ve sahibine/kamarasına doğru teslim edilir. Etiketleme veya torbalama sistemi sayesinde çamaşırlar karışmaz; özellikle kişisel çamaşırın doğru kişiye ulaşması mahremiyet ve güven açısından önemlidir. Yatak takımları ilgili kamaralara dağıtılır, fazlalık temiz linen dolabında düzenli stoklanır.`,
            `Temiz çamaşır, kirli çamaşırın bulunduğu alandan ayrı ve kapalı tutulur. Kirli çamaşır arabasının yanına temiz çamaşır konmaz; bu çapraz bulaşma yapar. Linen dolabı temiz, kuru ve düzenli tutulur; nemli ortamda saklanan temiz çamaşır küflenir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Temiz–kirli ayrımı mutlak",
              text: `Temiz çamaşır kirli çamaşırla aynı araba/alanda taşınmaz veya saklanmaz. Linen dolabı kuru ve kapalı tutulur. Bu ayrım, yapılan tüm yıkama emeğinin çapraz bulaşmayla boşa gitmesini önler.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Çamaşırhane Ekipmanı Bakımı ve Temizliği",
      sections: [
        {
          subheading: "6.1 Çamaşır makinesi ve kurutucu bakımı",
          paragraphs: [
            `Çamaşırhane ekipmanı, hijyen kaynağı olduğu kadar bakım da ister. Çamaşır makinesi haznesi periyodik olarak boş yüksek sıcaklık çevrimi veya makine temizleyici ile temizlenir; aksi halde deterjan kalıntısı, küf ve kötü koku birikir. Deterjan çekmecesi ve conta (kapı lastiği) düzenli temizlenir; bu bölgeler küf üretiminin en yaygın noktalarıdır.`,
            `Kurutucu lint filtresi her çevrimde, egzoz kanalı periyodik temizlenir. Makinelerde anormal ses, titreşim, su sızıntısı veya ısınma fark edilirse çalıştırılmaz ve makine ekibine/teknik sorumluya raporlanır. Kamarot temel temizlik ve filtre bakımından sorumludur; elektriksel/mekanik arıza ise yetkili ekibe bırakılır.`,
          ],
          table: {
            caption: `Çamaşırhane Ekipmanı Bakım Sıklığı (genel pratik)`,
            headers: ["Bakım İşi", "Sıklık", "Sorumlu"],
            rows: [
              ["Kurutucu lint filtresi temizliği", "Her çevrim sonrası", "Kamarot"],
              ["Makine conta/çekmece temizliği", "Haftalık", "Kamarot"],
              ["Makine haznesi temizlik çevrimi", "Aylık", "Kamarot"],
              ["Kurutucu egzoz kanalı kontrolü", "Periyodik", "Kamarot + teknik"],
              ["Elektriksel/mekanik arıza", "Tespit edilince", "Makine/teknik ekip"],
            ],
          },
        },
        {
          subheading: "6.2 Çamaşırhane mahallinin günlük temizliği",
          paragraphs: [
            `Çamaşırhane mahalli her gün temizlenir; zemin süpürülüp paspaslanır, tezgahlar silinir ve lint/toz birikintisi giderilir. Yerde biriken lint hem kayma riski hem de yangın yakıtıdır. Drenaj ve su giderleri tıkanmaya karşı kontrol edilir; tıkalı gider su baskını ve koku yapar.`,
            `Çamaşırhane havalandırması önemlidir; nemli ve sıcak ortam küf ve boğucu hava üretir. Havalandırma ızgaraları temiz tutulur, kapı/menfez açık bırakılarak nem tahliye edilir. Çamaşır arabaları ve torbalar düzenli yıkanıp dezenfekte edilir; kirli çamaşır taşıyan ekipman bakteri taşıyıcısıdır.`,
          ],
        },
      ],
    },
    {
      heading: "7. Deterjan ve Sarf Malzeme Stok Takibi",
      sections: [
        {
          subheading: "7.1 Stok kontrolü ve minimum seviye",
          paragraphs: [
            `Çamaşırhanenin kesintisiz çalışması, deterjan, yumuşatıcı, çamaşır suyu, leke çıkarıcı ve ön işlem ürünlerinin sürekli stokta olmasına bağlıdır. Kamarot, bu ürünler için bir minimum stok seviyesi belirler ve bu seviyeye yaklaşıldığında ikmal talebi başlatır. "Bitince haber vermek" geç kalmış bir yaklaşımdır; uzun seferlerde stoksuz kalmak çamaşır döngüsünü durdurur.`,
            `Stok takibi basit bir envanter listesiyle yürütülür: ürün adı, mevcut miktar, tüketim hızı ve yeniden sipariş noktası. Kamarot, tüketimi izleyerek tipik bir sefer için ne kadar gerektiğini öngörür ve ikmal talebini provizyon sorumlusuna (genellikle aşçıbaşı veya birinci zabit) iletir.`,
          ],
          bullets: [
            `Her ürün için minimum stok seviyesi belirle`,
            `Tüketim hızını izle, sefer süresine göre planla`,
            `Yeniden sipariş noktasına gelince talep başlat`,
            `İkmal talebini ilgili sorumluya zamanında ilet`,
            `Yeni gelen stoğu FIFO ile düzenle (eski önce kullanılır)`,
          ],
        },
        {
          subheading: "7.2 Kimyasal depolama ve etiketleme",
          paragraphs: [
            `Çamaşırhane kimyasalları (özellikle çamaşır suyu gibi oksidanlar ve asit bazlı ürünler) SDS bilgisine uygun, ayrı ve etiketli olarak depolanır. Oksidanlar (hipoklorit) ile asitler ayrı raflarda tutulur; kazara temasları tehlikeli reaksiyon yaratır. Kimyasallar orijinal etiketli kaplarında saklanır; etiketsiz kaba aktarmak hem yanlış kullanım hem yasal ihlaldir.`,
            `Depo havalandırılmış, gıdadan ve ısı kaynağından uzak tutulur. Dökülme durumunda SDS'teki müdahale talimatı uygulanır. Kamarot, kullandığı her kimyasalın seyreltme oranını, temas süresini ve uyumsuzluklarını bilmek zorundadır.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "SDS = kimyasalın kimlik kartı",
              text: `Her çamaşır kimyasalının Safety Data Sheet (SDS) bilgisi vardır: seyreltme, temas süresi, uyumsuzluklar, ilk yardım ve depolama. Kamarot kullandığı ürünün SDS'ini bilmeli ve oksidan-asit ürünleri ayrı depolamalıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "8. Hijyen, Çapraz Bulaşma ve Enfeksiyon Kontrolü",
      sections: [
        {
          subheading: "8.1 Kontamine ve hasta çamaşırının işlenmesi",
          paragraphs: [
            `Bulaşıcı hastalık şüphesi olan veya kan/vücut sıvısı bulaşmış çamaşır, diğer çamaşırla karıştırılmadan ayrı toplanır ve işlenir. Bu tekstil eldivenle taşınır, ayrı torbada tutulur ve yüksek sıcaklıkta (mümkünse 60°C üzeri) dezenfekte edilerek yıkanır. Silkelemek yasaktır; silkeleme mikroorganizmayı havaya yayar. İşlem sonrası eller yıkanır ve kullanılan ekipman dezenfekte edilir.`,
            `Norovirus, deri enfeksiyonları ve solunum yolu patojenleri kontamine tekstil yoluyla kolayca yayılır. Salgın dönemlerinde (COVID, norovirus vb.) çamaşır işleme protokolü sıkılaştırılır: ayrı toplama, yüksek sıcaklık, ekstra dezenfeksiyon ve kişisel koruyucu donanım kullanımı artırılır.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka: Tekstil kaynaklı bulaşma",
              text: `Bir gemide hasta mürettebatın çamaşırının ayrı işlenmemesi sonucu enfeksiyon birden çok kişiye yayıldı. Ders: kontamine/hasta çamaşırı ayrı toplanır, eldivenle taşınır, yüksek sıcaklıkta dezenfekte edilir ve silkelenmeden işlenir.`,
            },
          ],
        },
        {
          subheading: "8.2 Çamaşırhanede kişisel koruma ve hijyen",
          paragraphs: [
            `Kamarot, kirli çamaşır ve kimyasallarla çalışırken kişisel koruyucu donanım kullanır: eldiven, gerektiğinde önlük ve maske. Çamaşır işleme sonrası ve özellikle kontamine tekstille temas sonrası eller mutlaka yıkanır. Çamaşırhane, gıda hazırlığından fiziksel ve operasyonel olarak ayrı tutulur; kamarot ikisi arasında geçişte el hijyenine dikkat eder.`,
            `Renk kodlu temizlik mantığı çamaşırhaneye de uzanır: kontamine tekstil için kullanılan ekipman temizle karıştırılmaz. Çamaşır torbaları ve arabaları düzenli dezenfekte edilir; bu ekipmanlar hijyen zincirinin görünmez ama kritik halkasıdır.`,
          ],
        },
      ],
    },
    {
      heading: "9. Su, Enerji Tasarrufu ve Kaynak Yönetimi",
      sections: [
        {
          subheading: "9.1 Gemide su ve enerji bilinci",
          paragraphs: [
            `Gemide tatlı su (fresh water) sınırlı ve değerli bir kaynaktır; ya bunkerle alınır ya da fresh water generator ile üretilir. Çamaşır yıkama yüksek su tüketir, bu yüzden tam yük çalıştırma, gereksiz çevrimden kaçınma ve doğru program seçimi su tasarrufunun temelidir. Aşırı durulama gereksiz su harcar; doğru deterjan dozajı az durulama ile yeterli temizlik sağlar.`,
            `Çamaşır makinesi ve kurutucu yüksek enerji çeker ve bu enerji jeneratörlerden gelir. Enerji tasarrufu, yakıt (bunker) tasarrufu ve emisyon azaltımı demektir. Kamarot, çamaşır programlarını köprüüstü/makine dairesinin yoğun yük dönemlerine göre planlayarak elektrik yükünü dengelemeye yardımcı olabilir.`,
          ],
        },
        {
          subheading: "9.2 Atık ve ambalaj yönetimi",
          paragraphs: [
            `Çamaşırhaneden çıkan ambalaj atığı (deterjan bidonları, plastik, karton) MARPOL Annex V uyarınca ayrıştırılır. Plastik atık denize asla atılmaz; gemide tutulur ve limana teslim edilir. Boş kimyasal kaplar SDS talimatına göre işlenir; bazıları tehlikeli atık kategorisinde olabilir ve özel toplanır.`,
            `Lint atığı da düzenli toplanır; çöpe atılırken yanıcı olduğu unutulmaz ve sıcak/ateş kaynağından uzak tutulur. Kamarot, ayrıştırmayı doğru yaparak geminin Garbage Management Plan uyumuna katkı sağlar.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MARPOL Annex V — ambalaj atığı",
              text: `Deterjan bidonları, plastik ve ambalaj atığı denize atılamaz; kategorilere ayrılarak gemide tutulur ve limana teslim edilir. Boş kimyasal kaplar SDS'e göre, gerekirse tehlikeli atık olarak işlenir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "10. Pratik Kontrol Listesi ve Sonuç",
      sections: [
        {
          subheading: "10.1 Kamarotun çamaşırhane kontrol listesi",
          bullets: [
            `Çamaşır renk/kumaş/kirlilik düzeyine göre ayrıştırıldı mı?`,
            `Kontamine/hasta çamaşırı ayrı toplandı ve yüksek sıcaklıkta işlendi mi?`,
            `Cepler kontrol edildi (çakmak, metal, kalem) mi?`,
            `Deterjan/yumuşatıcı dozaj talimatına göre kullanıldı mı?`,
            `Çamaşır suyu asla asitle karıştırılmadı, ayrı kullanıldı mı?`,
            `Kurutucu lint filtresi her çevrimde temizlendi mi?`,
            `Yağlı/solvent bezler kurutucudan uzak tutuldu mu?`,
            `Sıcak ütü gözetimsiz/açık bırakılmadı, fişi çekildi mi?`,
            `Temiz çamaşır kirliden ayrı, kuru ve doğru teslim edildi mi?`,
            `Deterjan/sarf stok minimum seviyenin üzerinde, ikmal talebi zamanında mı?`,
            `Çamaşırhane zemini, conta, drenaj ve havalandırma temiz mi?`,
            `Yangın detektörü/fire damper kapakları açık ve çalışır mı?`,
          ],
          paragraphs: [
            `Çamaşırhane hizmetleri, kamarotun mürettebat refahına en doğrudan dokunduğu görevlerden biridir: temiz yatak, kuru havlu ve düzgün üniforma, geminin yaşam kalitesinin sessiz ama belirleyici parçasıdır. Bu görev aynı zamanda ciddi bir emniyet boyutu taşır; lint yangını ve kimyasal karışım riski, çamaşırhaneyi gemideki gizli yangın noktalarından biri yapar. Doğru ayrıştırma, kimyasal disiplini, lint kontrolü ve stok takibi birleştiğinde çamaşırhane; hem MLC uyumunun hem de yangın emniyetinin güvenilir bir parçası haline gelir. Standardın her gün korunması, kamarotluğun temel mesleki ilkesidir.`,
          ],
        },
      ],
    },
  ],
};

export default content;
