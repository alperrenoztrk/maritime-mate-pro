import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Makine dairesi temizliği ve düzeni (Silici)",
  roleSlug: "yagci-fitter",
  taskIndex: 2,
  estimatedPages: 23,
  intro: `Silici (Wiper), makine dairesinin temizliğinden ve düzeninden sorumlu olan, mühendislik vardiyasının en temel kademesidir; ancak bu görev göründüğünden çok daha kritiktir. Makine dairesinde biriken yağ, hem kayma kazalarının hem de gemideki en yaygın yangın türünün (yağ sızıntısının sıcak yüzeyle buluşması) ana sebebidir. Bu görev; zemin ve ekipman yüzeylerinin temizliği, sintine (bilge) alanlarının düzeni, yağ sızıntılarının toplanması, kayma risklerinin azaltılması, atık yağ/sludge yönetimine destek ve temizlik malzemesi stok takibini kapsar. Bu bölüm, Silici'nin temizliği bir güvenlik fonksiyonu olarak nasıl yürüteceğini adım adım açıklar.`,
  sources: [
    "SOLAS Chapter II-2 — Fire Protection (yağ/sıcak yüzey teması)",
    "MARPOL Annex I — Oil Record Book, sintine ve sludge yönetimi",
    "ISM Code — Maintenance and Housekeeping (Element 10)",
    "ILO/IMO — Code of Safe Working Practices for Merchant Seafarers (COSWP)",
    "MLC 2006 — Çalışma ortamı sağlık ve güvenliği",
    "STCW Code Section A-III/4 (Engine Ratings)",
    "ICS Engine-Room Procedures Guide",
    "Şirket SMS — Housekeeping ve atık yönetimi prosedürleri",
  ],
  chapters: [
    {
      heading: "1. Temizliğin Bir Güvenlik Fonksiyonu Olması",
      lead: `Makine dairesi temizliği "kozmetik" değil, doğrudan yangın ve kaza önleme faaliyetidir. Silici, geminin ilk savunma hattının bir parçasıdır.`,
      sections: [
        {
          subheading: "1.1 Neden temizlik kritik?",
          paragraphs: [
            `Makine dairesi yangınlarının büyük çoğunluğu, basınçlı bir yağ/yakıt sızıntısının ekzoz manifoldu, türbin gövdesi veya buhar hattı gibi sıcak bir yüzeye (>220°C) püskürmesiyle başlar. Zemine ve ekipmana birikmiş yağ, bu yangının yakıtı olur ve hızla yayılır. Temiz bir makine dairesi, bu yangın yükünü ortadan kaldırır.`,
            `Aynı şekilde yağlı zemin, kayma-düşme kazalarının başlıca nedenidir; merdivenlerde ve platformlarda kayma ciddi yaralanmalara yol açar. Silici, yağ birikintilerini anında temizleyerek hem yangın hem kaza riskini düşürür. Bu yüzden Silici işi rütbece düşük ama emniyet açısından yüksek önemdedir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS II-2 — Yangın önleme",
              text: `Makine dairesinde yanıcı sıvı birikimini önlemek bir SOLAS yükümlülüğüdür. Sızıntıların toplanması, drip tray'lerin temizliği ve zeminin yağdan arındırılması, yangın güvenliği yönetiminin parçasıdır.`,
            },
          ],
        },
        {
          subheading: "1.2 Silici'nin sorumluluk alanı",
          paragraphs: [
            `Silici; zeminler (floor plates), ekipman yüzeyleri, korkuluklar, merdivenler, platformlar, drip tray'ler, save-all tepsileri ve sintine kuyularını (bilge wells) kapsayan geniş bir alandan sorumludur. Ayrıca temizlik malzemesi stoğunu takip eder ve atık yağ/sludge yönetimine yardım eder.`,
            `Bu görevler, vardiya turlarıyla iç içe yürütülür; Silici temizlik yaparken aynı zamanda sızıntı, gevşek bağlantı ve anormallik gözlemler, fark ettiğini mühendis veya Yağcı'ya bildirir. Böylece temizlik aynı zamanda bir erken uyarı faaliyetidir.`,
          ],
        },
      ],
    },
    {
      heading: "2. Zemin ve Ekipman Yüzeyi Temizliği",
      sections: [
        {
          subheading: "2.1 Floor plate ve platform temizliği",
          paragraphs: [
            `Çelik ızgara zeminler (floor plates) ve platformlar düzenli olarak yağdan arındırılır. Sıcak su, deterjan/degreaser ve fırça kullanılarak yağ çözülür; yüzey kayma yaratmayacak şekilde durulanır. Izgara aralarına düşen birikinti de temizlenir, aksi halde alttaki sintineye yağ taşınır.`,
            `Kullanılan temizlik malzemesi (degreaser) doğru seçilir; bazı agresif kimyasallar boya/keçe/metal yüzeylere zarar verir ve solunum riski taşır. Kimyasal kullanımında MSDS okunur, eldiven ve göz koruması takılır, havalandırma sağlanır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Kimyasal temizleyici riski",
              text: `Solvent ve degreaser buharları parlayıcı ve sağlığa zararlı olabilir. Kapalı/dar alanda kullanırken havalandırma şart; kıvılcım/açık alev yakınında kullanmayın. Asla farklı kimyasalları karıştırmayın (zehirli gaz oluşabilir). MSDS'i kullanmadan önce okuyun.`,
            },
          ],
        },
        {
          subheading: "2.2 Ekipman yüzeyleri ve renk kodlu temizlik",
          paragraphs: [
            `Makine, pompa ve boru yüzeyleri temiz tutulduğunda yeni bir sızıntı (terleme) hemen göze çarpar; bu yüzden temiz ekipman aynı zamanda bir teşhis aracıdır. Temizlik sırasında elektrik panoları, kablo bağlantıları ve sıcak yüzeyler suya/kimyasala maruz bırakılmaz.`,
            `Boru hatları renk koduyla işaretlidir (yangın hattı kırmızı, deniz suyu yeşil vb.); temizlik bu işaretlerin okunur kalmasını destekler. Silinen yüzeyde gevşek civata, çatlak izolasyon veya korozyon fark edilirse mühendise bildirilir.`,
          ],
        },
      ],
    },
    {
      heading: "3. Sintine (Bilge) Alanlarının Düzeni",
      sections: [
        {
          subheading: "3.1 Sintine kuyularının temizliği",
          paragraphs: [
            `Sintine kuyuları (bilge wells), makine dairesinin en alt noktasında sızan su, yağ ve kirin toplandığı yerlerdir. Düzenli temizlenmediğinde yağ-su karışımı birikir, koku yapar ve bilge alarm/sensörlerinin yanlış çalışmasına yol açar. Silici, kuyu süzgeçlerini (strainers) temizler ve birikintiyi uygun şekilde toplar.`,
            `Sintinedeki yüzen yağ, sintine pompası çalıştığında denize karışma riski taşır; bu yüzden yağlı sintine içeriği önce yağ ayırıcıdan (OWS — Oily Water Separator) geçirilmeli veya sludge tankına alınmalıdır. Silici, sintineye fazla yağ taşımamak için sızıntıları kaynağında toplar.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MARPOL Annex I — Sintine yönetimi",
              text: `Yağ içeriği 15 ppm'i aşan sintine suyu denize basılamaz. OWS ve 15 ppm bilge alarm sistemi devrede olmalı, by-pass yasaktır. "Magic pipe" (yasal olmayan by-pass hattı) kullanımı ağır cezalar ve hapis getirir. Tüm sintine işlemleri Oil Record Book'a kaydedilir.`,
            },
          ],
        },
        {
          subheading: "3.2 Tank top ve double bottom erişimi",
          paragraphs: [
            `Tank top seviyesi ve sintine alanları dar ve sıcak olabilir; bu alanlarda çalışırken kapalı/dar alan (enclosed space) kuralları gözden geçirilir. Düzenli temizlik, bu bölgelerin korozyonunu da yavaşlatır; biriken tuzlu su ve yağ çeliği aşındırır. Silici, erişilen her noktayı temiz ve kuru bırakmaya çalışır.`,
          ],
        },
      ],
    },
    {
      heading: "4. Yağ Sızıntılarının Toplanması",
      sections: [
        {
          subheading: "4.1 Drip tray ve save-all yönetimi",
          paragraphs: [
            `Makine, pompa ve filtre altlarındaki drip tray ve save-all tepsileri, sızan yağı toplamak için tasarlanmıştır; ancak bunlar dolduğunda taşar ve işlevini yitirir. Silici bu tepsileri düzenli boşaltır ve temiz tutar. Boşaltılan yağ daima sludge/atık yağ tankına alınır, asla sintineye veya denize karıştırılmaz.`,
            `Tepsideki birikinti, gizli bir sızıntının ipucudur; nereden geldiği izlenir ve kaynak mühendise raporlanır. Sürekli dolan bir tepsi, çözülmesi gereken bir kaçağa işaret eder.`,
          ],
          table: {
            caption: `Sızıntı Toplama Noktaları ve Yönetimi`,
            headers: ["Nokta", "Toplanan", "Boşaltma Yeri"],
            rows: [
              ["Makine drip tray", "LO / FO sızıntısı", "Sludge / atık yağ tankı"],
              ["Pompa save-all", "Salmastra kaçağı", "Sludge tankı"],
              ["Purifier altı", "Yağ / sludge", "Sludge tankı"],
              ["Filtre değişim alanı", "Yağ/yakıt damlası", "Atık yağ kabı → sludge"],
              ["Sintine kuyusu", "Yağ-su karışımı", "OWS veya sludge tankı"],
            ],
          },
        },
        {
          subheading: "4.2 Emici malzeme (absorbent) kullanımı",
          paragraphs: [
            `Ani dökülmelerde emici ped, granül veya bez (rags) kullanılır; yağ emildikten sonra bu malzemeler özel atık olarak toplanır ve uygun şekilde bertaraf edilir (yağlı bez kendi kendine tutuşabilir — havalandırmalı metal kapta saklanır). Silici, SOPEP/SMPEP emici malzeme stoğunun hazır olduğunu da kontrol eder.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Yağlı bez yangını",
              text: `Yağ/solvent emmiş bezler, oksidasyon ısısıyla kendiliğinden tutuşabilir (spontaneous combustion). Bu bezleri yığın halinde bırakmayın; kapaklı metal atık kabında biriktirin ve düzenli boşaltın. Bu, küçük ama gerçek bir yangın riskidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Kayma Risklerinin Azaltılması",
      sections: [
        {
          subheading: "5.1 Merdiven, platform ve geçiş yolları",
          paragraphs: [
            `Makine dairesi merdivenleri dik ve metaldir; üzerlerindeki yağ film tabakası ciddi düşme kazalarına yol açar. Silici, merdiven basamaklarını, korkulukları ve geçiş yollarını öncelikli olarak temiz ve kuru tutar. Anti-slip (kaymaz) yüzeylerin işlevsel kaldığını gözlemler.`,
            `Geçiş yollarında engel (hortum, kablo, alet, parça) bırakılmaz; takılma kazaları da en az kayma kadar yaygındır. İyi housekeeping, hem temizlik hem düzen demektir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka — Yağlı merdivende düşme",
              text: `Bir mürettebat, denizde yalpalayan gemide yağ filmi kaplı bir makine dairesi merdiveninden iner ve kayarak düşer; bilek kırığı ile uzun süre iş göremez hale gelir. Soruşturma, basamaklardaki yağ birikiminin düzenli temizlenmediğini ortaya koyar.`,
            },
          ],
        },
        {
          subheading: "5.2 Deniz koşullarında ek dikkat",
          paragraphs: [
            `Gemi yalpa/baş-kıç vururken kayma riski katlanır; kötü havada Silici temizlik önceliğini geçiş güzergahlarına verir ve "tek el daima tutamakta" prensibiyle çalışır. Islak/yağlı zemin uyarı levhasıyla işaretlenebilir; ama asıl çözüm zemini hızla kurutmaktır.`,
          ],
        },
      ],
    },
    {
      heading: "6. Atık Yağ ve Sludge Yönetimine Destek",
      sections: [
        {
          subheading: "6.1 Sludge tankı ve atık yağ akışı",
          paragraphs: [
            `Separatör (purifier) sludge'ı, drip tray birikintileri, filtre yağı ve yağlı bilge yağı sludge/atık yağ tankında toplanır. Silici, bu akışları doğru tanka yönlendirir ve tank seviyelerinin izlenmesine yardım eder. Tank dolduğunda mühendise haber verilir; sahil tesisine teslim veya gemi insineratöründe yakma planlanır.`,
            `MARPOL Annex I, tüm bu işlemlerin Oil Record Book'a (ORB Part I) kaydını zorunlu kılar; teslim/yakma miktarları, tank seviyeleri ve tarihler tutarlı olmalıdır. Silici bu işlemlere gözlem ve saha desteği verir; kayıtların doğruluğu mühendisin sorumluluğundadır.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "ORB tutarlılığı",
              text: `Oil Record Book'taki sludge üretim, tank seviye ve teslim kayıtları birbirini tutmalıdır. PSC denetçileri seviye-kayıt uyumsuzluğunu titizlikle kontrol eder; tutarsızlık gemiyi alıkoymaya (detention) götürebilir.`,
            },
          ],
        },
        {
          subheading: "6.2 İnsineratör ve sahil teslimine yardım",
          paragraphs: [
            `İnsineratör (incinerator) ile atık yağ/sludge yakılırken Silici, mühendis gözetiminde besleme ve temizlik desteği verir. Sahil teslimi (shore disposal) sırasında hortum bağlantısı, drip tray ve scupper kapama gibi anti-kirlilik tedbirlerine yardım eder. Her teslimde alınan makbuz (waste receipt) saklanır.`,
          ],
        },
      ],
    },
    {
      heading: "7. Temizlik Malzemesi Stok Takibi",
      sections: [
        {
          subheading: "7.1 Stok yönetimi",
          paragraphs: [
            `Silici, temizlik malzemelerinin (degreaser, deterjan, bez/rags, emici ped, fırça, eldiven, çöp torbası) stoğunu takip eder ve azaldığında mühendise bildirir; böylece liman ikmalinde (requisition) eksik kalmaz. Kimyasallar orijinal/etiketli kaplarda, MSDS'leri erişilebilir şekilde saklanır.`,
            `Kimyasalların depolanması güvenlik kuralına tabidir; parlayıcı solventler ısı/kıvılcımdan uzak, havalandırmalı yerde tutulur. Uyumsuz kimyasallar ayrı saklanır. Boş kaplar uygun şekilde bertaraf edilir.`,
          ],
        },
        {
          subheading: "7.2 PPE ve malzeme uygunluğu",
          paragraphs: [
            `Temizlikte kullanılan PPE (kimyasal eldiven, gözlük, gerekirse maske) stoğu da takip edilir; yıpranmış/hasarlı PPE değiştirilir. Doğru malzemeyle doğru iş yapılır — örneğin elektrikli pano yakınında ıslak temizlik değil, kuru yöntem tercih edilir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Doğru malzeme, az çaba",
              text: `Uygun degreaser ve sıcak su, yağı kimyasal olarak çözer; doğru malzemeyle temizlik hem daha hızlı hem daha güvenlidir. Yanlış/zayıf malzemeyle uğraşmak hem zaman hem yüzey kaybıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "8. Temizlik Sırasında Güvenlik (PPE ve Çevre)",
      sections: [
        {
          subheading: "8.1 Temizlikte kişisel güvenlik",
          paragraphs: [
            `Silici, temizlik yaparken güvenlik ayakkabısı, eldiven, gözlük ve gerektiğinde kulak koruyucu (makine dairesi gürültüsü) kullanır. Sıcak yüzeylerden, hareketli/dönen ekipmandan ve elektrikli sistemlerden uzak durur; bu noktaları temizlerken ekipmanın durdurulması veya izole edilmesi gerekebilir.`,
            `Dar/kapalı alanda (bilge, tank top altı) temizlik yapılacaksa enclosed space prosedürü uygulanır — gaz ölçümü, izin ve standby personel olmadan girilmez. Silici, yetki sınırını bilir ve şüphede mühendise danışır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Dönen ekipman yakınında temizlik",
              text: `Çalışan pompa, fan veya kaplin yakınında temizlik yaparken bez/giysi kapılabilir. Bu noktaları temizlemeden önce ekipmanın durdurulduğundan emin olun veya mühendisten izin alın. Asla dönen parça üzerine bez/el uzatmayın.`,
            },
          ],
        },
        {
          subheading: "8.2 Çevre koruma bilinci",
          paragraphs: [
            `Temizlikten doğan atık (yağlı su, kimyasal kalıntı, yağlı bez) asla denize veya açık güverteye atılmaz; gemi atık yönetim planına (Garbage Management Plan, MARPOL Annex V) ve yağ atık prosedürüne göre ayrıştırılır. Silici, küçük bir hareketle bile geminin kirlilik sicilini koruyabilir veya bozabilir.`,
          ],
        },
      ],
    },
    {
      heading: "9. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "9.1 Silici'nin günlük kontrol listesi",
          bullets: [
            `Zeminler, merdivenler ve geçiş yolları yağdan arındırıldı, kuru mu?`,
            `Drip tray ve save-all tepsileri boşaltıldı, temiz mi?`,
            `Sintine kuyuları ve süzgeçler kontrol edildi mi?`,
            `Toplanan yağ doğru tanka (sludge/atık yağ) gitti mi, sintineye karışmadı mı?`,
            `Yağlı bezler kapaklı metal kapta toplandı mı (yangın riski)?`,
            `Fark edilen yeni sızıntı/anormallik mühendise bildirildi mi?`,
            `Geçiş yolları engelden (hortum/kablo/alet) arındırıldı mı?`,
            `Temizlik malzemesi ve PPE stoğu kontrol edildi mi?`,
            `Kimyasallar etiketli/güvenli depolandı, MSDS erişilebilir mi?`,
            `Atıklar MARPOL/Garbage Plan'a göre ayrıştırıldı mı?`,
          ],
          paragraphs: [
            `Silici'nin işi rütbece mütevazı olsa da güvenlik açısından kritiktir; temiz ve düzenli bir makine dairesi, yangın ve kaza riskini doğrudan azaltır, arızaların erken fark edilmesini sağlar ve denetimlerde geminin profesyonelliğinin ilk göstergesidir. İyi bir Silici, temizliği bir güvenlik görevi olarak gören kişidir.`,
          ],
        },
      ],
    },
  ],
};

export default content;
