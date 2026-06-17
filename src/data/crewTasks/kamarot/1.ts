import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Yemek servisi ve salon düzeni",
  roleSlug: "kamarot",
  taskIndex: 1,
  estimatedPages: 24,
  intro: `Kamarotun en görünür ve mürettebat moralini en doğrudan etkileyen görevlerinden biri yemek servisi ve salon (messhall) düzenidir. Bu görev; messhall hazırlığı, masa düzeni, servis kaplarının ve çatal-bıçak takımının dizimi, servis sırasında sıcaklık kontrolü ve hijyen kurallarının uygulanması, yemek sonrası toplama-temizlik ve salonun yeniden düzenlenmesini kapsar. Bu bölüm; gıda hijyeni (HACCP mantığı), sıcaklık zinciri (temperature control), servis etiketi ve MLC 2006 beslenme standartlarına uygun profesyonel servis metodolojisini açıklar. İyi bir servis, sadece yemek dağıtmak değil; uzun ve zorlu seferlerde mürettebatın en önemli moral kaynağını yönetmektir.`,
  sources: [
    "MLC 2006 Regulation 3.2 — Food and Catering",
    "MLC 2006 Standard A3.2 — Food and Drinking Water Supplies",
    "Codex Alimentarius — HACCP Principles (CAC/RCP 1-1969)",
    "WHO Five Keys to Safer Food",
    "ILO/WHO Guide to Ship Sanitation — Food Safety",
    "Ship's Cook Certification — Catering and Mess Service Standards (MCA MGN)",
    "ISO 22000 — Food Safety Management (referans çerçeve)",
  ],
  chapters: [
    {
      heading: "1. Messhall ve Servisin Mürettebat Hayatındaki Yeri",
      lead: `Yemek, denizcinin günündeki en beklenen andır. İyi sunulan, sıcak ve hijyenik yemek; uzun seferlerde yorgunluğu, monotonluğu ve evden uzaklığı dengeleyen en güçlü moral aracıdır.`,
      sections: [
        {
          subheading: "1.1 Servisin moral ve verim üzerindeki etkisi",
          paragraphs: [
            `Gemide mess, sadece beslenme değil aynı zamanda sosyalleşme ve dinlenme alanıdır. Düzgün hazırlanmış bir messhall ve özenli servis, mürettebatın kendine değer verildiğini hissettirir; dağınık, kirli veya soğuk yemek sunulan bir mess ise hızla şikayet ve moral düşüklüğü kaynağı olur. Kamarot, bu nedenle servisi mekanik bir görev olarak değil, ekibin refahını yöneten bir hizmet olarak ele alır.`,
            `Gemilerde genellikle subay messi (officers' mess) ve tayfa messi (crew mess) ayrıdır; her ikisinde de aynı hijyen ve servis kalitesi sağlanır. Vardiyalı çalışma nedeniyle öğünler farklı saatlerde alınır; kamarot, gece vardiyasından gelenler için night meal/standby yemeği hazır tutulmasını da koordine eder.`,
          ],
        },
        {
          subheading: "1.2 MLC 2006 beslenme standardı",
          paragraphs: [
            `MLC 2006 Regulation 3.2, mürettebata ücretsiz, yeterli miktarda, besleyici ve kalite/çeşitlilik açısından uygun yemek ile temiz içme suyu sağlanmasını şart koşar. Standard A3.2, gıdanın dini ve kültürel çeşitliliğe saygılı sunulmasını ve catering personelinin eğitimli olmasını ister. Kamarot, bu standardın sahadaki uygulayıcısıdır; servis kalitesi MLC uyumunun görünür yüzüdür.`,
            `Denetimde (MLC inspection) mess düzeni, servis hijyeni, yemek sıcaklığı, içme suyu temizliği ve menü çeşitliliği kontrol edilir. Kirli mess veya hijyen ihlali doğrudan bulgu doğurur.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MLC 2006 — Standard A3.2",
              text: `Mürettebata ücretsiz, yeterli, besleyici ve kaliteli yemek ile temiz içme suyu sağlanır. Catering hizmeti veren personel görevine uygun eğitimli olmalıdır; messroom ve pantry temiz, hijyenik koşullarda tutulur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Servis Öncesi Messhall Hazırlığı",
      sections: [
        {
          subheading: "2.1 Masa ve salon düzeni (mise en place)",
          paragraphs: [
            `Servisten önce mess "mise en place" mantığıyla hazırlanır: her şey yerli yerinde ve eksiksiz. Masalar dezenfekte edilir, üzerine temiz örtü veya placemat serilir; çatal-bıçak-kaşık takımı, tabaklar, bardaklar, peçete, baharatlık (tuz-biber), su sürahisi ve ekmeklik düzenli yerleştirilir. Sürahiler taze su ile doldurulur. Sıcak içecek (çay/kahve) istasyonu kontrol edilir ve doldurulur.`,
            `Çatal-bıçak diziminde standart düzen izlenir ve takımların lekesiz/temiz olması sağlanır; lekeli bir çatal, tüm hazırlığın özensizliğini hissettirir. Mevsim ve sefere göre düzen sade tutulur ancak titizlik asla düşmez.`,
          ],
          table: {
            caption: `Servis Öncesi Hazırlık Kontrol Tablosu`,
            headers: ["Öğe", "Kontrol", "Standart"],
            rows: [
              ["Masa yüzeyi", "Dezenfekte + örtü", "Temiz, lekesiz"],
              ["Çatal-bıçak", "Lekesiz, doğru dizim", "Hijyenik, kuru"],
              ["Su/içecek", "Taze, dolu", "Temiz sürahi"],
              ["Baharatlık", "Dolu, temiz", "Tuz-biber-sos"],
              ["Servis kapları", "Sıcak/soğuk uygun", "Doğru sıcaklık"],
            ],
          },
        },
        {
          subheading: "2.2 Servis kaplarının ve ekipmanın hazırlığı",
          paragraphs: [
            `Servis kapları (chafing dish, bain-marie, soğuk tezgah) öğün tipine göre hazırlanır. Sıcak yemekler için bain-marie/chafing dish önceden ısıtılır; soğuk yemekler ve salatalar soğuk hatta tutulur. Bu ekipmanların doğru sıcaklıkta olması, "tehlikeli sıcaklık aralığı"ndan kaçınmanın temelidir (Bölüm 4).`,
            `Servis kaşıkları, maşalar ve servis araçları her yemek için ayrı tutulur; aynı kaşıkla farklı kaplara dokunmak çapraz bulaşma yaratır (özellikle alerjen ve çiğ/pişmiş ayrımı). Kamarot, aşçı (cook) ile koordineli çalışarak yemeklerin servis sırasını ve düzenini planlar.`,
          ],
        },
      ],
    },
    {
      heading: "3. Servis Etiketi ve Akışı",
      sections: [
        {
          subheading: "3.1 Servis düzeni ve nezaket",
          paragraphs: [
            `Servis akışı düzenli ve nazik olmalıdır. Buffet (self-servis) düzeninde yemekler mantıklı sırayla dizilir: tabaklar → ana yemek → garnitür → salata → ekmek → tatlı → içecek. Personel sıkışmadan ilerleyebilmelidir. Masaya servis (table service) yapılan messlerde (genellikle officers' mess) servis sol/sağ kuralına ve sessiz profesyonelliğe dikkat edilir.`,
            `Kamarot servis sırasında nazik, temiz ve düzenli bir görünüm sergiler: temiz üniforma, takılmış önlük, gerektiğinde eldiven/saç filesi. Saçma görünüş ve dağınıklık gıda hijyeni endişesi yaratır. Servis sırasında öksürme/hapşırmada yemekten uzaklaşılır ve hijyen korunur.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Servis = ilk izlenim",
              text: `Temiz üniforma, düzenli buffet ve güler yüzlü servis, yemeğin lezzetinden önce algılanır. Kamarotun profesyonel duruşu, mürettebatın yemeğe ve gemiye güvenini doğrudan etkiler.`,
            },
          ],
        },
        {
          subheading: "3.2 Diyet, alerjen ve kültürel çeşitlilik",
          paragraphs: [
            `Modern mürettebat çok uluslu ve farklı beslenme ihtiyaçlıdır: dini gereklilikler (helal, vejetaryen, domuz/alkol içermeyen), alerjenler (fındık, gluten, deniz ürünü) ve tıbbi diyetler (diyabet, düşük tuz) servis sırasında dikkate alınır. Kamarot, aşçıyla birlikte bu özel ihtiyaçları takip eder ve alerjen içeren yemekleri açıkça etiketler/ayırır.`,
            `Alerjen yönetimi ciddi bir emniyet konusudur; bir fındık veya deniz ürünü alerjisi gemide tıbbi acil duruma dönüşebilir. Servis araçlarının çapraz kullanımı bu yüzden yasaktır ve alerjenli yemekler ayrı serbis edilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Alerjen çapraz bulaşması",
              text: `Aynı maşa/kaşıkla alerjenli ve alerjensiz yemeğe dokunmak, alerjik mürettebatta anafilaksiye yol açabilir. Her yemeğin servis aracı ayrı tutulur; alerjen içeren yemekler etiketlenir ve fiziksel olarak ayrılır. Gemide tıbbi müdahale sınırlıdır — önleme tek savunmadır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Sıcaklık Kontrolü ve Gıda Güvenliği (HACCP Mantığı)",
      sections: [
        {
          subheading: "4.1 Tehlikeli sıcaklık aralığı ve sıcaklık zinciri",
          paragraphs: [
            `Gıda güvenliğinin kalbi sıcaklık kontrolüdür. Bakteriler 5°C ile 60°C arasındaki "tehlikeli aralıkta" (danger zone) hızla çoğalır; bu aralıkta uzun süre bekleyen yemek gıda zehirlenmesi riski taşır. Sıcak yemekler 60°C ve üzerinde, soğuk yemekler 5°C ve altında tutulur. Bain-marie ve soğuk tezgah sıcaklıkları servis boyunca kontrol edilir.`,
            `"Soğuk zincir" ve "sıcak tutma" servisin temel ilkesidir: pişen yemek hızlıca servis sıcaklığına alınır, servise kadar danger zone'da bekletilmez. Servis süresi uzadıkça risk artar; uzun süre dışarıda kalan yemek imha edilir, "idare eder" mantığı uygulanmaz.`,
          ],
          table: {
            caption: `Gıda Sıcaklık Standartları (servis kontrolü)`,
            headers: ["Durum", "Hedef Sıcaklık", "Not"],
            rows: [
              ["Sıcak yemek (servis/tutma)", "≥ 60°C", "Bain-marie kontrol"],
              ["Soğuk yemek/salata", "≤ 5°C", "Soğuk tezgah"],
              ["Tehlikeli aralık (danger zone)", "5°C – 60°C", "Bakteri çoğalır"],
              ["Buzdolabı saklama", "0 – 5°C", "Çiğ alt rafta"],
              ["Derin dondurucu", "≤ -18°C", "Donmuş stok"],
            ],
          },
        },
        {
          subheading: "4.2 Çapraz bulaşma ve kişisel hijyen",
          paragraphs: [
            `Çapraz bulaşma (cross-contamination); çiğ gıdadan pişmiş gıdaya, kirli ekipmandan temiz yüzeye veya kirli elden yemeğe patojen taşınmasıdır. Servis araçları ayrı tutulur, yüzeyler dezenfekte edilir ve çiğ/pişmiş ayrımı korunur. WHO'nun "Five Keys to Safer Food" ilkeleri (temizlik, çiğ-pişmiş ayrımı, iyi pişirme, güvenli sıcaklıkta tutma, güvenli su/hammadde) servis disiplininin çerçevesidir.`,
            `Kişisel hijyen kritiktir: el yıkama (özellikle tuvalet sonrası ve servis öncesi), kısa-temiz tırnak, takı çıkarma, saç filesi ve temiz üniforma. Hasta veya bulaşıcı belirtili (ishal, kusma) bir kamarot servis yapmamalı ve durumu bildirmelidir; gıda yoluyla salgın gemiyi felç edebilir.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "WHO Five Keys to Safer Food",
              text: `1) Temiz tut. 2) Çiğ ve pişmiş gıdayı ayır. 3) İyice pişir. 4) Güvenli sıcaklıkta tut. 5) Güvenli su ve hammadde kullan. Bu beş ilke, gemi servisinde gıda zehirlenmesini önlemenin temelidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Servis Sırasında Operasyon",
      sections: [
        {
          subheading: "5.1 Yoğunluk yönetimi ve doluluk takibi",
          paragraphs: [
            `Servis sırasında buffet sürekli izlenir: azalan yemekler tazelenir, dökülenler temizlenir, su/içecek doldurulur. Boşalan bir kap veya bitmiş ekmek, servisin aksamasıdır. Kamarot mutfakla (galley) sürekli iletişim halinde kalır; yemek azaldığında aşçıyı önceden uyarır.`,
            `Vardiyalı düzen nedeniyle herkes aynı anda yemeğe gelmez. Kamarot, geç gelen vardiya personeli için yemeğin sıcak/uygun tutulmasını veya tabaklanıp saklanmasını sağlar. Night meal düzeni, gece çalışanların moralinde belirleyicidir.`,
          ],
        },
        {
          subheading: "5.2 Mess ortamı ve atmosfer",
          paragraphs: [
            `Mess, dinlenme ve sosyalleşme alanıdır; kamarot bu ortamın temiz, düzenli ve davetkar kalmasını sağlar. Masa aralarında biriken kirli tabaklar zamanında toplanır, dökülenler hemen silinir. Sıcaklık, havalandırma ve aydınlatma rahat tutulur.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka: Soğuk yemek şikayeti",
              text: `Bir gemide bain-marie arızası fark edilmeden servis sürdürüldü; yemek danger zone'da soğudu, hem moral düştü hem de birkaç personelde sindirim şikayeti görüldü. Ders: servis süresince sıcaklık fiilen ölçülmeli, arıza derhal bildirilmeli, şüpheli yemek servis edilmeden imha edilmelidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Yemek Sonrası Toplama ve Temizlik",
      sections: [
        {
          subheading: "6.1 Toplama ve atık yönetimi",
          paragraphs: [
            `Servis bittiğinde toplama düzenli yapılır: önce yemek artıkları MARPOL Annex V kategorilerine göre ayrılır (gıda atığı ayrı), kirli tabaklar bulaşıkhaneye taşınır, masalar boşaltılır. Gıda atığı koku ve haşere riski nedeniyle gecikmeden yönetilir. Servis kapları boşaltılır ve bulaşığa alınır.`,
            `Artan yemeğin değerlendirilmesi gıda güvenliğine tabidir: danger zone'da uzun kalmış yemek imha edilir; uygun şekilde hızla soğutulup saklanan yemek belirli kurallarla ve tekrar tek seferlik ısıtmayla kullanılabilir. "İsraf etmeyelim" düşüncesiyle güvenli olmayan yemeği saklamak gıda zehirlenmesi riskidir.`,
          ],
        },
        {
          subheading: "6.2 Salon yüzeyleri ve yeniden düzen",
          paragraphs: [
            `Masalar ve sandalyeler dezenfekte edilir, zemin süpürülüp paspaslanır, baharatlık ve sürahiler temizlenip yeniden doldurulur. Bir sonraki öğün için mess yeniden mise en place haline getirilir; böylece bir sonraki servis daima hazır başlar.`,
            `Çatal-bıçak ve servis araçları yıkanıp kurutularak temiz dolaba kaldırılır; nemli kaldırılan takımlar leke ve mikrop tutar. Bu döngü her öğünde tekrarlanır.`,
          ],
        },
      ],
    },
    {
      heading: "7. İçme Suyu ve İçecek Hijyeni",
      sections: [
        {
          subheading: "7.1 İçme suyu güvenliği",
          paragraphs: [
            `İçme suyu (potable water), MLC ve gemi sanitasyonu kapsamında gıda kadar kritiktir. Su sürahileri ve içecek istasyonları temiz tutulur, su musluğu/dispenser ağzı dezenfekte edilir. Su kalitesi (klorlama, kalite testleri) genellikle güverte/makine sorumluluğundadır ancak servis noktasındaki temizlik kamarota aittir.`,
            `Buz makinesi (ice machine) sık ihmal edilen bir kontaminasyon kaynağıdır; düzenli temizlenmezse bakteri/küf üretir. Buz, temiz kürekle alınır, asla elle veya bardakla doğrudan alınmaz.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MLC 2006 — temiz içme suyu",
              text: `Mürettebata temiz, içilebilir su sağlanması zorunludur. Su dispenseri, sürahi ve buz makinesi hijyeni servisin parçasıdır; kontamine içme suyu/buz, gıda kaynaklı salgınların yaygın sebebidir.`,
            },
          ],
        },
        {
          subheading: "7.2 Çay/kahve istasyonu",
          paragraphs: [
            `Mess'teki sürekli açık çay/kahve istasyonu mürettebat için 7/24 erişilebilir olur. Kamarot, bu istasyonu temiz, dolu ve çalışır tutar; makineler düzenli temizlenir, süt/şeker/sarf malzemesi eksiltilmez. Bu küçük detaylar moralde büyük fark yaratır.`,
          ],
        },
      ],
    },
    {
      heading: "8. Özel Durumlar: Denetim, Ziyaretçi ve Kötü Hava",
      sections: [
        {
          subheading: "8.1 Denetim ve ziyaretçi servisi",
          paragraphs: [
            `Limanda gelen surveyor, PSC/vetting inspector veya misafirlere servis, geminin ilk izlenimini oluşturur. Toplantı odası/salon hazırlanır, ikram düzenli ve hijyenik sunulur. Denetçilere sunulan mess ve servis kalitesi, geminin genel disiplini hakkında izlenim verir.`,
          ],
        },
        {
          subheading: "8.2 Kötü havada servis emniyeti",
          paragraphs: [
            `Ağır havada (heavy weather) mess servisi emniyet riski taşır: sıcak yemek ve kaynar su, geminin yalpasıyla devrilip ciddi yanık yaratabilir. Bu koşulda fiddle (masa kenarı bariyeri) ve kaymaz altlık kullanılır, sürahiler az doldurulur, sıcak içecekler kapalı taşınır ve servis basitleştirilir. Personel kayma-düşmeye karşı dikkatli hareket eder.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Ağır havada haşlanma riski",
              text: `Yalpada devrilen kaynar çorba/su ciddi yanık yaratır. Kötü havada fiddle ve kaymaz altlık kullan, kapları taşı taşı doldurma, sıcak sıvıları kapalı taşı ve servis hızını yavaşlat. Yanık, gemide tedavisi zor bir yaralanmadır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "9. Pratik Kontrol Listesi ve Sonuç",
      sections: [
        {
          subheading: "9.1 Yemek servisi kontrol listesi",
          bullets: [
            `Masalar dezenfekte, çatal-bıçak lekesiz ve doğru dizildi mi (mise en place)?`,
            `Bain-marie ≥60°C, soğuk tezgah ≤5°C tutuldu mu?`,
            `Servis araçları her yemek için ayrı, alerjenler etiketli/ayrı mı?`,
            `Diyet/dini/kültürel ihtiyaçlar karşılandı mı?`,
            `Üniforma temiz, el hijyeni ve saç filesi tamam mı?`,
            `Buffet doluluk takibi yapıldı, su/içecek dolu mu?`,
            `Gece vardiyası için night meal hazır mı?`,
            `Gıda atığı MARPOL'a göre ayrıldı, mess temizlendi mi?`,
            `İçme suyu/buz makinesi hijyeni kontrol edildi mi?`,
            `Kötü havada haşlanma/kayma önlemleri alındı mı?`,
          ],
          paragraphs: [
            `Yemek servisi, kamarotluğun mürettebatla en doğrudan temas eden yüzüdür. Sıcak, hijyenik, çeşitli ve özenle sunulan bir öğün; uzun seferlerin yorgunluğunu hafifleten, ekibi bir arada tutan ve geminin moralini ayakta tutan en değerli hizmettir. Sıcaklık kontrolü ve hijyen disiplini ise bu hizmetin pazarlık edilemez güvenlik temelidir.`,
          ],
        },
      ],
    },
  ],
};

export default content;
