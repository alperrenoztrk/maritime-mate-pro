import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Pest control ve haşere yönetimi",
  roleSlug: "asci",
  taskIndex: 9,
  estimatedPages: 25,
  intro: `Gemide haşere (kemirgen, hamamböceği, hububat böcekleri, sinek) kontrolü doğrudan mutfağın temizliği ve gıda güvenliğiyle ilişkilidir; aşçı bu kontrolün ön cephesidir. Rat guard'ların liman bağlama hatlarında doğru kurulumu, sticky trap ve bait station yerleşimi, ULV (ultra low volume) fumigasyon koordinasyonu ve Deratting Certificate / Ship Sanitation Control (Exemption) Certificate'ın güncel tutulması bu görevin parçasıdır. Bulaşma tespitinde derhal kaptan ve liman sağlık otoritesine bildirim yapılır. Bu bölüm; entegre haşere yönetimi (IPM) prensibini, türlere özgü kontrolü, izleme/müdahale ekipmanını, fumigasyon güvenliğini ve sertifikasyon/denetim çerçevesini IHR 2005 ve WHO Ship Sanitation standartlarıyla açıklar.`,
  sources: [
    "IHR 2005 — Ship Sanitation Control / Deratting (Articles 27 & Annex)",
    "WHO — Guide to Ship Sanitation (3rd Edition)",
    "WHO — Handbook for Inspection of Ships and Issuance of Ship Sanitation Certificates",
    "MLC 2006 — Standard A3.2 (accommodation, food & catering hygiene)",
    "IMO — Recommendations on safe use of pesticides / fumigation in ships",
    "Codex Alimentarius — General Principles of Food Hygiene (CXC 1-1969)",
    "Flag/Port health authority fumigation & pest control procedures",
  ],
  chapters: [
    {
      heading: "1. Entegre Haşere Yönetimi (IPM) Prensibi",
      lead: `Haşere yönetimi öldürmekle değil, önlemekle başlar.`,
      sections: [
        {
          subheading: "1.1 Önleme önceliği: erişimi kesmek",
          paragraphs: [
            `Entegre haşere yönetimi (Integrated Pest Management — IPM), kimyasal müdahaleyi son adıma bırakıp önce çevresel kontrolü esas alır. Temel prensip üç erişimi kesmektir: gıdaya erişim (kapalı kaplar, dökülen yiyeceğin anında temizlenmesi, çöpün kapaklı tutulması), suya erişim (sızıntı/birikinti giderme) ve barınma/üreme alanına erişim (çatlak, delik, karton birikimi kapatma). Haşere, bu üç kaynaktan birini bulduğunda yerleşir; üçünü de kesmek en güçlü kontroldür.`,
            `Aşçı, galley ve depo temizliğini (bkz. mutfak düzeni görevi) doğrudan bir haşere önleme tedbiri olarak yürütür: "clean as you go", gece galley'i temiz/kuru bırakma, açık paketi kapalı kaba aktarma. Karton ambalaj (hamamböceği yumurtası taşıyabilir) hızla bertaraf edilir; gelen kumanya depoya girmeden böcek/larva açısından kontrol edilir.`,
          ],
          bullets: [
            `Gıdaya erişimi kes: kapalı kap, anında temizlik, kapaklı çöp`,
            `Suya erişimi kes: sızıntı/birikinti gider`,
            `Barınmayı kes: çatlak/delik kapat, kartonu hızla at`,
            `Gelen kumanyayı depo öncesi böcek/larva kontrolü`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Temizlik = pest control",
              text: `Haşerenin %80'i temizlik ve düzenle önlenir. Kimyasal mücadele, önleme başarısız olduğunda başvurulan son araçtır; asla temizliğin yerini tutmaz.`,
            },
          ],
        },
        {
          subheading: "1.2 İzleme (monitoring) ve erken tespit",
          paragraphs: [
            `IPM, sürekli izlemeye dayanır: düzenli görsel denetimle haşere belirtileri erken yakalanır. Aranan işaretler dışkı, kemirme izleri, yağlı sürtünme izleri (kemirgen yolu), yumurta kapsülü/larva, ölü böcek, koku ve trap/bait tüketimidir. Aşçı, galley ve depoları haftalık (gerekirse daha sık) tarar ve bulguları kayda geçirir. Erken tespit, küçük bir varlığı yerleşmiş bir istilaya dönüşmeden çözer.`,
          ],
        },
      ],
    },
    {
      heading: "2. Kemirgen Kontrolü (Sıçan ve Fare)",
      sections: [
        {
          subheading: "2.1 Rat guard ve liman bağlama önlemleri",
          paragraphs: [
            `Kemirgenlerin gemiye en yaygın giriş yolu liman bağlama halatları ve rampa/iskeledir. Bu yüzden gemi limana bağlandığında tüm bağlama halatlarına rat guard (sıçan siperi — koni/disk biçimli engel) doğru biçimde takılır; siper, kemirgenin halat boyunca tırmanmasını engelleyecek konumda ve yönde olmalıdır. Ayrıca gece iskele ışıklandırması, ambar/kapı kapatma ve rampada açık gıda bırakmama uygulanır.`,
            `Gemiye giriş noktaları (kapılar, havalandırma, kablo geçişleri) kemirgen geçirmez tutulur; deliklerin metal/dolgu ile kapatılması gerekir (kemirgen ahşap/plastiği kemirebilir, metali zorlanır). Aşçı, galley ve gıda depolarının bu açıdan korunduğunu izler.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "IHR 2005 — kemirgen kontrolü",
              text: `Gemiler kemirgen ve vektörlerden arındırılmış tutulmalı; gerekirse deratting/disinfestation uygulanmalı ve Ship Sanitation Control Certificate ile belgelenmelidir. Rat guard liman pratiğinin temel parçasıdır.`,
            },
          ],
        },
        {
          subheading: "2.2 Bait station ve trap yerleşimi",
          paragraphs: [
            `Kemirgen izleme/mücadelesi için bait station (yemli istasyon) ve mekanik/yapışkan tuzaklar, kemirgen yolları boyunca (duvar diplerine, köşelere, depo girişlerine) belirlenmiş bir haritaya göre yerleştirilir. İstasyonlar numaralanır ve düzenli kontrol edilir; tüketim/yakalama kayda geçirilir. Gıda hazırlık yüzeylerinde zehirli yem kullanılmaz; istasyonlar gıdadan ve erişimden uzak, güvenli noktalara konur.`,
          ],
          table: {
            caption: `Kemirgen İzleme/Mücadele Araçları`,
            headers: ["Araç", "Konum", "Kontrol"],
            rows: [
              ["Rat guard", "Tüm bağlama halatları (limanda)", "Bağlama anında, düzenli teyit"],
              ["Bait station", "Kemirgen yolları, depo girişi", "Numaralı, düzenli kontrol"],
              ["Mekanik/yapışkan tuzak", "Köşe, duvar dibi", "Düzenli kontrol, kayıt"],
              ["Giriş tıkama", "Delik/geçiş noktaları", "Metal/dolgu ile kapatma"],
            ],
          },
        },
      ],
    },
    {
      heading: "3. Hamamböceği ve Hububat Böcekleri Kontrolü",
      sections: [
        {
          subheading: "3.1 Hamamböceği (cockroach) yönetimi",
          paragraphs: [
            `Hamamböcekleri sıcak, nemli ve karanlık yerleri sever; galley, bulaşık alanı ve depolar ana riskli bölgelerdir. Karton ambalajla gemiye taşınmaları çok yaygındır, bu yüzden kumanya kartonları depoya alınmaz veya hızla bertaraf edilir. Mücadelede sticky trap ile izleme, çatlak/yarık dolgusu, sıkı temizlik (gece besin kaynağı bırakmama) ve gerekirse jel yem/profesyonel uygulama kullanılır.`,
            `Hamamböceği gıdayı patojenle (Salmonella vb.) kontamine edebilir; varlığı ciddi bir gıda güvenliği tehdididir. Tek bir böcek bile yerleşmiş bir popülasyonun işareti olabileceğinden, tespit küçümsenmez ve derhal müdahale edilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Karton = hamamböceği taşıyıcısı",
              text: `Kumanya kartonları hamamböceği yumurta kapsülü taşıyabilir. Kartonlar gıda deposuna sokulmaz; içerik temiz kaplara/raflara aktarılır, karton hızla atılır.`,
            },
          ],
        },
        {
          subheading: "3.2 Hububat böcekleri (un/tahıl) kontrolü",
          paragraphs: [
            `Un, pirinç, makarna, baklagil gibi kuru erzakta hububat bitleri/güveler üreyebilir; sıcak ve nemli depo bu üremeyi hızlandırır. Önleme; serin/kuru depolama, FIFO rotasyonu, kapalı/etiketli kaplar ve düzenli denetimdir. Bulaşmış parti (içinde canlı/ölü böcek, ağ, larva) imha edilir; çapraz bulaşmayı önlemek için komşu ürünler kontrol edilir ve depo temizlenir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Sessiz yayılan un biti",
              text: `Sıcak depoda açık tutulan bir un çuvalı, fark edilmeden komşu kuru erzakı da bulaştırdı. Erken denetim ve kapalı kap olsaydı önlenirdi. Ders: kuru depo düzenli denetlenir, açık paket kapalı kaba aktarılır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Sinek, Sivrisinek ve Vektör Kontrolü",
      sections: [
        {
          subheading: "4.1 Sinek ve uçan haşere",
          paragraphs: [
            `Sinekler hem rahatsızlık hem de patojen taşıyıcısıdır; gıda yüzeylerine konarak kontaminasyon yapar. Kontrol; açık gıda/çöp bırakmama, kapı/havalandırma fly screen (sineklik), elektrikli sinek tuzağı (insect-o-cutor) ve düzenli çöp boşaltmadır. Galley pencere/kapıları mümkün olduğunca kapalı ve sineklikli tutulur.`,
          ],
        },
        {
          subheading: "4.2 Sivrisinek ve hastalık vektörü riski",
          paragraphs: [
            `Bazı bölgelerde (tropikal limanlar) sivrisinek, sıtma/dang gibi hastalık vektörü olabilir; geminin durgun su kaynaklarını (birikinti, açık kap) gidermesi ve gerekirse vektör kontrolü uygulaması beklenir. IHR 2005, gemilerin vektörlerden arındırılmış tutulmasını ister; liman sağlık otoritesi denetiminde bu hususlar kontrol edilir. Aşçı, gıda/su alanlarında durgun su ve açık birikinti bırakmaz.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "WHO Ship Sanitation — vektör kontrolü",
              text: `Rehber, gemilerin sinek/sivrisinek dahil vektörlerden arındırılmasını ve üreme alanlarının (durgun su) giderilmesini önerir. Bu, halk sağlığı kontrolünün parçasıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Fumigasyon ve ULV Koordinasyonu (Güvenlik)",
      sections: [
        {
          subheading: "5.1 ULV/fumigasyon ne zaman ve nasıl",
          paragraphs: [
            `Önleme ve hedefli mücadele yetersiz kalan yaygın istilada, profesyonel ULV (ultra low volume) uygulaması veya fumigasyon gerekebilir; bu, geminin atadığı kişi tarafından koordine edilir ve genellikle limanda lisanslı operatörlerle/liman sağlık otoritesiyle yürütülür. Fumigasyon güçlü ve toksik gaz/kimyasal kullanır; bu yüzden insan güvenliği mutlak önceliktir. Uygulama öncesi alan tahliye edilir, gıda korunur/kaldırılır ve giriş yasağı uygulanır.`,
            `Fumigasyon sonrası alan, güvenli gaz konsantrasyonu doğrulanıp (ölçüm) yetkili "gas-free / safe for entry" onayı verilene kadar kapalı tutulur. Aşçı, fumigasyon planına gıda/galley tarafında uyar: ürünleri korur veya tahliye eder, sonrasında yüzeyleri temizler ve kontaminasyon riski olan açık gıdayı imha eder.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Fumigasyon = ölümcül gaz riski",
              text: `Fumigasyon gazları (ör. fosfin) insan için öldürücüdür. Uygulama yalnızca lisanslı operatörce yapılır; alanlar işaretlenir, gas-free onayı olmadan kesinlikle girilmez ve gıda korunur.`,
            },
          ],
        },
        {
          subheading: "5.2 Pestisit güvenliği ve gıda koruması",
          paragraphs: [
            `Gemi içinde kullanılan tüm pestisit/biyosit, etikete ve güvenlik bilgi formuna (SDS) uygun, gıda alanlarından uzak ve uygun PPE ile uygulanır. Gıda hazırlık yüzeyleri, depo ve su sistemleri kimyasaldan korunur. Aşçı, gıdanın pestisitle çapraz teması olmadığından emin olur; şüpheli temas görmüş ürün tüketilmez. Uygulanan kimyasal ve yöntem kayda geçirilir.`,
          ],
        },
      ],
    },
    {
      heading: "6. Sertifikasyon ve Bildirim Yükümlülüğü",
      sections: [
        {
          subheading: "6.1 Ship Sanitation / Deratting Certificate",
          paragraphs: [
            `IHR 2005 kapsamında her gemi, geçerli bir Ship Sanitation Control Exemption Certificate (SSCEC — risk yok/önlem yeterli) veya Ship Sanitation Control Certificate (SSCC — kontrol uygulandı) taşımak zorundadır; bunlar tarihsel "Deratting Certificate"in yerini almıştır. Sertifikalar tipik olarak 6 ay geçerlidir ve yetkili limanlarda yenilenir. Aşçı, mutfak/gıda alanını denetime hazır tutarak ve haşere bulgularını kayıtlayarak bu belgenin sorunsuz yenilenmesine katkı sağlar.`,
          ],
          table: {
            caption: `Haşere Kontrolü ile İlgili Belgeler`,
            headers: ["Belge", "Anlamı", "Geçerlilik"],
            rows: [
              ["SSCEC", "Kontrol gerekmedi (muafiyet)", "Tipik 6 ay"],
              ["SSCC", "Kontrol/önlem uygulandı", "Tipik 6 ay"],
              ["Fumigasyon kaydı", "Uygulama ve gas-free onayı", "Sefer dosyasında"],
              ["Pest control logu", "İzleme, trap, müdahale", "Sürekli güncel"],
            ],
          },
          callouts: [
            {
              type: "regulation",
              title: "IHR 2005 — SSCEC/SSCC",
              text: `Geminin geçerli SSCEC/SSCC taşıması zorunludur. Belge süresi dolar veya bulaşma kanıtı bulunursa liman sağlık otoritesi denetim/kontrol uygulayabilir.`,
            },
          ],
        },
        {
          subheading: "6.2 Bulaşma tespitinde bildirim",
          paragraphs: [
            `Bir bulaşma (özellikle kemirgen veya yaygın istila) tespit edilirse aşçı derhal kaptanı bilgilendirir; kaptan, gerektiğinde liman sağlık otoritesine bildirir ve kontrol önlemi koordine edilir. Bulaşma gizlenmez — gizlemek hem halk sağlığı riski hem de ağır yaptırım sebebidir. Etkilenen gıda imha edilir, kaynak kapatılır ve süreç kayda geçirilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Bulaşmayı gizleme",
              text: `Haşere bulaşmasını saklamak salgın riskini büyütür ve denetimde ağır uygunsuzluk doğurur. Tespit derhal kaptana, gerekiyorsa liman sağlık otoritesine bildirilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "7.1 Pest control checklist'i",
          bullets: [
            `Gıdaya/suya/barınmaya erişim kesildi mi (temizlik, kapalı kap, çatlak)?`,
            `Limanda tüm bağlama halatlarına rat guard doğru takıldı mı?`,
            `Bait station ve trap haritası kuruldu, düzenli kontrol ediliyor mu?`,
            `Kumanya kartonları depoya sokulmadan bertaraf edildi mi?`,
            `Kuru erzak FIFO, kapalı kap ve düzenli böcek denetiminde mi?`,
            `Kapı/havalandırmada sineklik ve durgun su kontrolü var mı?`,
            `Fumigasyon/ULV güvenli (tahliye, gıda koruma, gas-free) yapıldı mı?`,
            `SSCEC/SSCC güncel ve pest control logu tutuluyor mu?`,
            `Bulaşma tespiti kaptana/liman sağlık otoritesine bildirildi mi?`,
          ],
          paragraphs: [
            `Pest control, aşçının halk sağlığı ve gıda güvenliği sorumluluğunun ayrılmaz parçasıdır. Önleme (temizlik, erişim kesme, rat guard), izleme (trap/bait, görsel denetim) ve gerektiğinde güvenli profesyonel müdahale (ULV/fumigasyon) bir bütün oluşturur; bunu geçerli Ship Sanitation belgeleri ve şeffaf bildirimle taçlandırmak, gemiyi hem bir salgından hem de ağır denetim yaptırımlarından korur. İyi yönetilen bir gemide haşere, fark edilip yerleşmeden çözülür.`,
          ],
        },
      ],
    },
  ],
};

export default content;
