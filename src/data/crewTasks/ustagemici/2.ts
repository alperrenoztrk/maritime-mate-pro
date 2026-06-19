import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Güverte bakım işleri",
  roleSlug: "ustagemici",
  taskIndex: 2,
  estimatedPages: 25,
  intro: `Güverte bakımı, Usta Gemici'nin (Able Seaman / AB) günlük mesaisinin omurgasını oluşturur; geminin çelik gövdesini, donanımını ve güverte ekipmanını korozyon, aşınma ve deniz koşullarının yıpratıcı etkisine karşı sürekli savunan iştir. Boyama, pas temizliği (chipping), taşlama (grinding), güverte yıkama, halat/tel bakımı ve greasing gibi işler Reisin (Bosun) yönetiminde planlı bir bakım programına göre yürütülür. Bu bölüm; yüzey hazırlama ve boyama tekniklerini, korozyon kontrolünü, kullanılan el aletleri ve elektrikli/pnömatik ekipmanı, kimyasal ve toz risklerini, PPE seçimini, işe başlamadan önce yapılan risk değerlendirmesi (risk assessment) ve toolbox talk uygulamasını ve MARPOL kapsamında boya/atık yönetimini ayrıntılı ele alır. Amaç, işin "kaliteli ve zamanında" yapılması kadar "güvenli" yapılmasıdır.`,
  sources: [
    "SOLAS Chapter II-1 — Construction (yapısal bütünlük ve bakım)",
    "MARPOL Annex V — Garbage (boya artığı, kumlama atığı, çöp yönetimi)",
    "MARPOL Annex I — boyama/yıkama suyunun denize deşarjı kısıtlamaları",
    "ILO/IMO Code of Safe Working Practices for Merchant Seafarers (COSWP)",
    "ISM Code — planlı bakım sistemi (PMS) ve risk assessment gereklilikleri",
    "AFS Convention (Anti-Fouling Systems) — zehirli antifouling boya kısıtlaması",
    "IMO PSPC (Performance Standard for Protective Coatings) — Res. MSC.215(82)",
    "Boya üreticisi teknik föyleri (TDS) ve Güvenlik Bilgi Formları (SDS/MSDS)",
  ],
  chapters: [
    {
      heading: "1. Güverte Bakımının Amacı ve Planlı Bakım Sistemi",
      lead: `Güverte bakımı keyfi değil, planlı bir faaliyettir. Reis günlük/haftalık iş listesini PMS ve geminin durumuna göre belirler; AB bu programı sahada uygular ve gördüğü kusurları raporlar.`,
      sections: [
        {
          subheading: "1.1 Korozyonla mücadele neden hayati?",
          paragraphs: [
            `Çelik gemi, tuzlu su, nem, güneş ve mekanik aşınmanın sürekli saldırısı altındadır. Korozyon yalnızca estetik bir sorun değil, yapısal bütünlüğü tehdit eden bir emniyet meselesidir; incelen sac, kırılan kaynaklar ve çürüyen güverte ekipmanı yük emniyetini ve can güvenliğini riske atar. Bu nedenle yüzey koruması (boya sistemi) ve düzenli bakım, geminin sınıf (class) sertifikasını ve PSC (liman devleti kontrolü) uygunluğunu doğrudan etkiler.`,
            `Boya sistemi bir kalkandır: önce yüzey hazırlanır, sonra astar (primer), ara kat ve son kat uygulanır. Bu katmanlardan biri bozulduğunda korozyon altta sessizce ilerler. AB'nin işi, bu kalkanı bütün tutmak; pasları erkenden temizleyip uygun boya ile yeniden koruma sağlamaktır.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "PSPC — boya performans standardı",
              text: `IMO PSPC (MSC.215(82)), balast tankları ve belirli alanlar için boya kalınlığı, yüzey hazırlık derecesi ve uygulama koşullarını standardize eder. Güverte bakımı bu standartların ruhuna uygun, doğru yüzey hazırlığı ve doğru kalınlıkla yapılmalıdır.`,
            },
          ],
        },
        {
          subheading: "1.2 İş listesi, öncelik ve raporlama",
          paragraphs: [
            `Reis, hava durumu, liman programı ve mevcut korozyon durumuna göre günlük işleri dağıtır: bir grup baş kasarada chipping yaparken, diğeri güverte yıkar, bir başkası halat greasing yapar. AB kendi işini bilir ama tüm güvertenin bakım mantığını da kavramalı; örneğin yağmur beklenirken boya yapılmaz, taze boya üstüne yürünmez.`,
            `AB, çalışırken fark ettiği kusurları (çatlak, ağır korozyon, gevşek bağlantı, hasarlı ekipman) Reise raporlar. Bu geri bildirim PMS'i besler; küçük bir paslı noktanın büyük bir saç incelmesine dönüşmeden yakalanması bu raporlamaya bağlıdır.`,
          ],
          bullets: [
            `Günlük iş listesi Reis tarafından PMS'e göre verilir`,
            `Hava ve liman programı işin sırasını belirler`,
            `Taze boya/ıslak güverte uyarı işaretiyle korunur`,
            `Fark edilen kusur derhal Reise raporlanır`,
          ],
        },
      ],
    },
    {
      heading: "2. Yüzey Hazırlama: Chipping, Grinding ve Temizlik",
      sections: [
        {
          subheading: "2.1 Pas temizliği (chipping) ve mekanik hazırlık",
          paragraphs: [
            `İyi boyanın sırrı yüzeyde gizlidir: pas, eski gevşek boya, yağ ve tuz tamamen temizlenmeden uygulanan boya kısa sürede dökülür. Chipping (pas çekiçleme), elle çekiç/kazıyıcı veya pnömatik iğneli tabanca (needle gun) ile yapılır; gevşek pas ve kabarmış boya yüzeyden sökülür. Ardından tel fırça veya disk taşlama (grinding) ile yüzey pürüzlendirilip temizlenir.`,
            `Pnömatik ve elektrikli aletler (needle gun, disk taşlama, kumlama) yüksek gürültü, titreşim ve fırlayan parçacık üretir. AB, alet öncesi kontrolünü yapar (hava hortumu, disk sağlamlığı, koruma siperi), doğru PPE takar ve çalışma alanını çevreden izole eder. Disk taşlamada kıvılcım çıkar; yanıcı malzeme ve boya tinerinden uzak durulur.`,
          ],
          table: {
            caption: `Yüzey Hazırlama Yöntemleri ve PPE`,
            headers: ["İşlem", "Alet", "Risk", "Zorunlu PPE"],
            rows: [
              ["Chipping", "El çekici / needle gun", "Fırlayan pas, titreşim, gürültü", "Gözlük, eldiven, kulaklık, baret"],
              ["Grinding", "Disk taşlama", "Kıvılcım, fırlayan disk, toz", "Yüz siperi, eldiven, toz maskesi"],
              ["Tel fırça", "El/elektrikli fırça", "Fırlayan tel teli, göz hasarı", "Gözlük, eldiven"],
              ["Kumlama", "Sand/grit blasting", "Yüksek toz, basınç", "Tam yüz/solunum koruma, tulum"],
            ],
          },
        },
        {
          subheading: "2.2 Yağ, tuz ve nem giderme",
          paragraphs: [
            `Mekanik temizlik tek başına yetmez; tuz tortusu boyanın altında nem çekerek erken bozulmaya yol açar. Bu yüzden hazırlanan yüzey tatlı su ile yıkanıp tuzdan arındırılır ve tam kuruması beklenir. Yağ/gres lekeleri uygun solvent veya deterjanla giderilir; aksi halde boya tutmaz.`,
            `Nem ve sıcaklık boyanın yapışmasını doğrudan etkiler. Yoğuşma noktasının (dew point) hemen üzerinde veya altında boya yapmak yüzeyde nem hapseder; bu nedenle Reis genelde sabah çiy kalkmadan ve akşam nem çökmeden önce boya yapmaz. AB, "yüzey gerçekten kuru ve temiz mi?" sorusunu sormadan boyaya başlamaz.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Boyanın ömrü yüzeyde belirlenir",
              text: `Bir kova boyanın kalitesi ne olursa olsun, paslı/yağlı/tuzlu/ıslak yüzeye uygulanırsa aylar içinde dökülür. Zamanın %70'i yüzey hazırlığına, %30'u boyamaya ayrılmalıdır. "Pasın üstüne boya" geçici görünür ama altta korozyonu hızlandırır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Boyama Teknikleri ve Boya Sistemleri",
      sections: [
        {
          subheading: "3.1 Astar, ara kat ve son kat uygulaması",
          paragraphs: [
            `Boya sistemi katmanlıdır: astar (primer) çeliğe yapışır ve korozyona karşı ilk bariyeri kurar; ara kat (intermediate) kalınlık ve bariyer sağlar; son kat (top coat) UV, aşınma ve estetik koruma verir. Her kat için üreticinin teknik föyündeki (TDS) kalınlık, kuruma süresi ve katlar arası bekleme (overcoating interval) süresine uyulur. Erken üst kat atmak alttaki katı bozar.`,
            `Uygulama yöntemi fırça, rulo veya airless sprey olabilir. Fırça köşe/kaynak/dar alan için, rulo geniş düz yüzeyler için, sprey büyük alanlar ve hızlı uygulama için kullanılır. Sprey overspray ve solvent buharı riski taşır; rüzgâr yönü ve çevre ekipman korumaya alınır.`,
          ],
          table: {
            caption: `Boya Katmanları ve İşlevleri`,
            headers: ["Kat", "İşlevi", "Tipik uygulama"],
            rows: [
              ["Primer (astar)", "Çeliğe yapışma + korozyon bariyeri", "Hazır temiz yüzeye ilk kat"],
              ["Intermediate (ara)", "Film kalınlığı, bariyer", "Astar kuruduktan sonra"],
              ["Top coat (son)", "UV/aşınma koruması, görünüm", "Ara kat üstüne, son"],
              ["Antifouling", "Tekne dibinde organizma önleme", "Karina (dry-dock), AFS uyumlu"],
            ],
          },
        },
        {
          subheading: "3.2 Hava koşulu, kuruma ve kalite kontrol",
          paragraphs: [
            `Boya, üreticinin belirttiği sıcaklık ve nem aralığında uygulanır. Çok soğukta kuruma uzar ve yapışma bozulur; çok sıcakta solvent erken uçar ve film düzgün oluşmaz. Yağmur, deniz serpintisi ve yoğun nem altında boya yapılmaz. AB, uygulama sırasında film kalınlığını gözle dengeler; akma (sagging), gözenek (pinhole) ve atlanmış nokta bırakmamaya dikkat eder.`,
            `Taze boyalı alan "WET PAINT" işareti ve bariyer ile korunur; kuruyana kadar üstüne basılmaz, ekipman konmaz. Katlar arası bekleme süresine uyulmazsa solvent hapsi ve film bozulması olur. Kaliteli iş, doğru kalınlık + temiz yüzey + uygun hava + doğru bekleme demektir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Solvent buharı ve kapalı alan",
              text: `Boya/tiner buharı kapalı ve havalandırması zayıf alanlarda (tank, ambar, dar mahal) birikir; baş dönmesi, bilinç kaybı ve patlama riski yaratır. Kapalı mekanda boyama, kapalı mekan giriş prosedürüne ve sürekli havalandırmaya tabidir. Asla tek başına ve havalandırmasız boyama yapılmaz.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Halat ve Tel (Wire) Bakımı, Greasing",
      sections: [
        {
          subheading: "4.1 Halat bakımı ve muayenesi",
          paragraphs: [
            `Sentetik ve doğal halatlar (mooring, kılavuz, emniyet halatları) düzenli muayene edilir: aşınma, kesik, iç lif kopması, ısı/sürtünme hasarı, kimyasal/UV bozulması aranır. Hasarlı bölge tespit edilirse halat işaretlenir, gerekirse hizmetten alınır. Halatlar temiz, kuru ve düzenli istif edilir; keskin kenar ve yağdan korunur.`,
            `Halatın doğru sarılması ve istifi de bakımın parçasıdır; karışmış (kinked) halat hem hızlı yıpranır hem operasyonda tehlike yaratır. AB, halatları figür-of-eight veya uygun coil ile düzenli toplar ve havalandırmalı şekilde saklar.`,
          ],
        },
        {
          subheading: "4.2 Tel halat (wire) ve greasing",
          paragraphs: [
            `Çelik tel halatlar (kreyn, vinç, mooring wire) korozyona ve iç sürtünmeye karşı greaslenir; gres hem dış korozyonu önler hem teller arası sürtünmeyi azaltır. Greasing öncesi tel temizlenir, hasar (kopuk tel/birdcage/ezilme) muayene edilir. Belirli sayıda kopuk tel (broken wire) sınırı aşılırsa halat değiştirilir.`,
            `Greasing kirli ve kaygan bir iştir; AB eldiven giyer, kaymaya karşı dikkatli durur ve gres artığını güverteye/denize bulaştırmaz. Atık gres ve kirli bez, MARPOL Annex V kapsamında uygun atık olarak toplanır, denize atılmaz.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Kopuk tel — el yaralanması",
              text: `Tel halattaki kopuk teller (fish hooks) eldiveni ve eti delip ciddi yaralanmaya yol açar. Tel halat daima kalın deri/kevlar eldivenle tutulur; çıplak elle wire üzerinde gezdirmek yasaktır. Muayenede de kopuk teller dikkatle, koruyucu eldivenle taranır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Güverte Yıkama ve Genel Temizlik",
      sections: [
        {
          subheading: "5.1 Tuz giderme ve güverte yıkama",
          paragraphs: [
            `Deniz suyu serpintisi güvertede ve ekipmanda tuz biriktirir; bu tuz korozyonu hızlandırır ve boyayı bozar. Düzenli tatlı su yıkaması (fresh water washing) bu birikimi giderir. Yıkama, kaymayı artırdığı için dikkatli yürüme ve uygun ayakkabı gerektirir; hortum basıncı ve kaygan zemin yaralanma riski taşır.`,
            `Yıkama suyunun ve temizlik kimyasalının denize deşarjı MARPOL kurallarına tabidir; yağ içeren güverte suyu doğrudan denize verilmez, scupper'lar (güverte drenajı) gerektiğinde tapalanır ve atık uygun şekilde toplanır.`,
          ],
        },
        {
          subheading: "5.2 Kimyasal kullanımı ve SDS",
          paragraphs: [
            `Yağ çözücü, pas sökücü, deterjan gibi kimyasallar Güvenlik Bilgi Formuna (SDS) göre kullanılır: doğru PPE, havalandırma, cilt/göz teması önlemi ve uyumsuz kimyasalları karıştırmama kuralları geçerlidir. AB, kullandığı her kimyasalın SDS'ini bilmeli ve etiketsiz kaba kimyasal koymamalıdır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MARPOL Annex V — atık yönetimi",
              text: `Boya artıkları, kumlama atığı, kirli bez ve kimyasal kaplar operasyonel çöp olarak sınıflandırılır ve denize atılması yasaktır. Bu atıklar gemideki ayrım düzenine göre toplanır, Garbage Record Book'a işlenir ve limanda alım tesisine teslim edilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Risk Değerlendirmesi, Toolbox Talk ve PPE",
      lead: `Hiçbir güverte işi, riski değerlendirilmeden ve doğru PPE seçilmeden başlamaz. ISM Code planlı risk değerlendirmesini, COSWP ise güvenli çalışma pratiklerini zorunlu kılar.`,
      sections: [
        {
          subheading: "6.1 İşe başlamadan: risk assessment ve toolbox talk",
          paragraphs: [
            `Her bakım işi öncesi, ekip kısa bir toolbox talk yapar: işin adımları, tehlikeler (yüksekten düşme, kıvılcım, kimyasal, kapalı alan, kaygan zemin), kontrol önlemleri ve acil durumda ne yapılacağı konuşulur. Risk yüksekse (yüksekte, overside, kapalı mekan, sıcak iş) ayrıca İş İzni (Permit to Work) düzenlenir.`,
            `AB, kendi işinin risk değerlendirmesini anlamadan ve kontrol önlemlerini uygulamadan göreve başlamaz. Bir adım değiştiğinde (hava bozdu, ekipman arızalandı) iş durdurulur ve durum yeniden değerlendirilir. "Stop work authority" — riskli gördüğü işi durdurma yetkisi — her denizcinin hakkıdır.`,
          ],
          bullets: [
            `Toolbox talk: adımlar + tehlikeler + önlemler + acil durum`,
            `Yüksek risk = Permit to Work (yüksekte/overside/sıcak iş/kapalı alan)`,
            `Koşul değişirse iş durur ve yeniden değerlendirilir`,
            `Herkesin işi durdurma yetkisi (stop work authority) vardır`,
          ],
        },
        {
          subheading: "6.2 İşe göre PPE seçimi",
          paragraphs: [
            `PPE işe göre seçilir: chipping/grinding'de göz/yüz koruması ve toz maskesi; gürültülü pnömatik alette kulaklık; kimyasal işte uygun eldiven ve gözlük; boyamada solvent maskesi; yüksekte emniyet kemeri (harness). Baret, çelik burunlu ayakkabı ve iş tulumu güvertede temel donanımdır.`,
            `PPE, doğru takıldığında ve sağlam olduğunda korur. AB, kullanmadan önce PPE'sini kontrol eder (çatlak gözlük, yıpranmış kemer, tıkalı filtre kullanılmaz) ve hasarlıyı değiştirir. PPE bir bahane değil, son savunma hattıdır; önce iş güvenli planlanır, PPE en son katmandır.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka — gözlüksüz taşlama",
              text: `Bir AB, kısa bir taşlama için gözlüğünü takmadı; fırlayan metal parçacık gözüne kaçtı ve kalıcı görme kaybına yol açtı. Ders: 'kısa iş' diye PPE atlanmaz; göz yaralanmalarının büyük kısmı 'birkaç saniyelik' işlerde olur. Disk dönerken göz koruması istisnasızdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. Tipik Hatalar ve Vaka Dersleri",
      sections: [
        {
          subheading: "7.1 Kalite ve emniyet hataları",
          paragraphs: [
            `Sık görülen kalite hataları: paslı/ıslak/tuzlu yüzeye boya, katlar arası bekleme süresine uymama, yanlış hava koşulunda boyama ve eksik film kalınlığı. Bunlar boyanın aylar içinde dökülmesine ve korozyonun gizlice ilerlemesine yol açar; iş baştan tekrar yapılır, hem zaman hem malzeme israfı olur.`,
            `Emniyet hataları daha ağır sonuç doğurur: PPE atlamak (göz/el/solunum yaralanması), kıvılcımlı işi yanıcı yakınında yapmak, kapalı mahalde havalandırmasız boya/solvent kullanmak, kaygan ıslak güvertede dikkatsiz hareket. Her biri ciddi kaza zincirinin ilk halkasıdır.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka — kapalı tankta boya buharı",
              text: `Havalandırması yetersiz bir tankta boyama yapan personel solvent buharından bayıldı; içeri 'kurtarmaya' giren ikinci kişi de etkilendi. Ders: solventli iş kapalı mahalde sürekli havalandırma, atmosfer kontrolü ve standby personel olmadan yapılmaz; bayılan birine SCBA'sız girilmez.`,
            },
          ],
        },
        {
          subheading: "7.2 Doğru pratik ile farkı",
          paragraphs: [
            `Disiplinli bir AB; yüzeyi hak ettiği gibi hazırlar, doğru hava ve doğru katmanla boyar, PPE'sini eksiksiz takar, kimyasalı SDS'e göre kullanır ve atığı MARPOL'e göre toplar. Bu pratik hem geminin korozyon savunmasını güçlü tutar hem kendi ve ekibin güvenliğini korur. Bakım, "görünür" olduğu için değil, "geminin ömrünü uzattığı ve emniyeti sağladığı" için değerlidir.`,
          ],
        },
      ],
    },
    {
      heading: "8. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "8.1 Güverte bakımı checklist'i",
          bullets: [
            `İşe başlamadan toolbox talk / risk assessment yapıldı mı?`,
            `Yüksek riskli iş için Permit to Work alındı mı?`,
            `İşe uygun PPE seçildi ve sağlamlığı kontrol edildi mi?`,
            `Yüzey pas/yağ/tuzdan arındırıldı, kuru mu (boyadan önce)?`,
            `Hava koşulu (nem/sıcaklık/yağmur) boyama için uygun mu?`,
            `Doğru kat sırası ve katlar arası bekleme süresine uyuldu mu?`,
            `Tel halat greasing'de kopuk tel kontrolü yapıldı, koruyucu eldiven takıldı mı?`,
            `Taze boya 'WET PAINT' işareti ve bariyerle korundu mu?`,
            `Kimyasallar SDS'e göre, atıklar MARPOL Annex V'e göre yönetildi mi?`,
            `Fark edilen kusurlar (çatlak/korozyon/hasar) Reise raporlandı mı?`,
          ],
          paragraphs: [
            `Güverte bakımı, denizciliğin "görünmeyen kahramanlığıdır": iyi yapıldığında kimse fark etmez, çünkü gemi sağlam, temiz ve güvenli kalır; ihmal edildiğinde ise korozyon, kaza ve PSC tutuklamaları olarak geri döner. Usta Gemici'nin elindeki çekiç, fırça ve gres tabancası aslında geminin ömrünü ve mürettebatın güvenliğini uzatan araçlardır. Kaliteli ve güvenli bakım; sabır, doğru sıra ve disiplinli PPE/risk yönetimiyle mümkündür.`,
          ],
        },
      ],
    },
  ],
};

export default content;
