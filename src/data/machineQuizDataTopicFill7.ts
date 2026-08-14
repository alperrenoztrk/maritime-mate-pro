import type { QuizQuestion } from "@/types/quiz";

/**
 * Konu doldurma bankası 7 — gemi sistemleri konu bankasında konu başına en az
 * 8 soru hedefini tutturmak için yazılan ek sorular.
 *
 * `exerciseQuestionDistribution.ts` soruları konu başlıklarıyla sözcük örtüşmesine
 * göre eşlediğinden her soru hedeflediği konunun kendi terminolojisini kullanır;
 * aksi hâlde benzerlik puanı soruyu komşu konuya taşır.
 *
 * Numaralandırma taban + devam + vaka bankalarının ardından sürer (155'ten
 * başlar); `machineQuizDataIndex.ts` bankaları slug bazında bu sırayla birleştirir.
 */
export const machineQuizQuestionsTopicFill7: Record<string, QuizQuestion[]> = {
  "ship-systems": [
    {
      id: 155,
      question: "Dengeli (balanced) dümenin dengesizden farkı nedir?",
      options: [
        "Alanın bir kısmı dönme ekseninin önünde",
        "Alanın tamamı eksenin arkasında kalır",
        "Dümen yelpazesi hiç dönmemektedir",
        "Dümen doğrudan pervaneye bağlanmakta",
      ],
      correctAnswer: 0,
      explanation:
        "Dengeli dümende yelpaze alanının yaklaşık dörtte biri dönme ekseninin önünde kalır; öndeki alanın yarattığı moment karşı yönde çalışarak gereken dümen torkunu düşürür.",
      category: "Gemi Sistemleri",
    },
    {
      id: 156,
      question: "Yarı dengeli (semi-balanced) dümen hangi yapıyı taşır?",
      options: [
        "Tümüyle serbest asılı bir yelpaze",
        "Üst kısmı topuktan desteklenen yapı",
        "İki ayrı yelpazeden oluşan yapı",
        "Sabit ve hiç dönmeyen bir yapı",
      ],
      correctAnswer: 1,
      explanation:
        "Yarı dengeli dümende yelpazenin üst bölümü tekneye bağlı bir çıkıntı tarafından desteklenir; alt bölüm dengelidir, böylece hem tork düşer hem yatak yükü azalır.",
      category: "Gemi Sistemleri",
    },
    {
      id: 157,
      question: "Dümen tipi seçiminde belirleyici olan ana ölçüt nedir?",
      options: [
        "Yalnızca dümenin boya rengi seçimi",
        "Yalnızca dümen makinesinin markası",
        "Gerekli tork ile manevra kabiliyeti",
        "Yalnızca dümen dairesinin aydınlığı",
      ],
      correctAnswer: 2,
      explanation:
        "Tip seçimi, istenen manevra kabiliyeti ile dümen makinesinin karşılayabileceği tork arasındaki dengeye göre yapılır; tekne formu ve pervane izi de hesaba katılır.",
      category: "Gemi Sistemleri",
    },
    {
      id: 158,
      question: "Dümen üzerine gelen kuvvet hızla nasıl değişir?",
      options: [
        "Hızdan bağımsız olarak sabit kalır",
        "Hızla ters orantılı olarak azalır",
        "Hızın kareköküyle orantılı artar",
        "Hızın karesiyle orantılı olarak artar",
      ],
      correctAnswer: 3,
      explanation:
        "Hidrodinamik kuvvet akış hızının karesiyle büyür; bu yüzden yüksek hızda küçük dümen açısı bile büyük yanal kuvvet ve tork üretir.",
      category: "Gemi Sistemleri",
    },
    {
      id: 159,
      question: "Dümen torku hangi büyüklüklerin çarpımıdır?",
      options: [
        "Dümen kuvveti ile basınç merkezi mesafesi",
        "Dümen kalınlığı ile gemi deplasmanı",
        "Şaft devri ile pervane hatvesi değeri",
        "Dümen ağırlığı ile yerçekimi ivmesi",
      ],
      correctAnswer: 0,
      explanation:
        "Tork, yelpazeye etkiyen bileşke kuvvetin dönme eksenine olan dik uzaklığıyla çarpımıdır; dengeli dümende bu uzaklık küçüldüğü için gereken tork da düşer.",
      category: "Gemi Sistemleri",
    },
    {
      id: 160,
      question: "Dümen açısı arttıkça hangi noktadan sonra kuvvet düşmeye başlar?",
      options: [
        "Yaklaşık 10 derece dolayından sonra",
        "Yaklaşık 35 derece dolayından sonra",
        "Yaklaşık 5 derece dolayından sonra",
        "Yaklaşık 60 derece dolayından sonra",
      ],
      correctAnswer: 1,
      explanation:
        "Akım yelpaze arkasında ayrılınca kaldırma kuvveti düşer; bu yüzden dümen açısı genellikle 35 derece ile sınırlandırılır, ötesi yalnızca sürüklemeyi artırır.",
      category: "Gemi Sistemleri",
    },
    {
      id: 161,
      question: "Elektro-hidrolik dümen makinesinde hareket nasıl üretilir?",
      options: [
        "Elektrik motoru doğrudan yelpazeyi çevirir",
        "Buhar türbini dümen milini döndürür",
        "Hidrolik basınç koçbaşını hareket ettirir",
        "Sıkıştırılmış hava pistonu iter",
      ],
      correctAnswer: 2,
      explanation:
        "Elektrik motoru hidrolik pompayı sürer; basınçlı yağ silindirlere gönderilerek koçbaşı veya döner kanat üzerinden dümen boyunduruğu döndürülür.",
      category: "Gemi Sistemleri",
    },
    {
      id: 162,
      question:
        "Dümen makinesinde koçbaşı (ram) tipi ile döner kanat tipi arasındaki fark nedir?",
      options: [
        "Döner kanat hidrolik yağ kullanmamaktadır",
        "Koçbaşı tipi hiç yatak içermeyen yapıdır",
        "Döner kanat elektrik motoru gerektirmez",
        "Ram doğrusal, kanat dairesel hareket verir",
      ],
      correctAnswer: 3,
      explanation:
        "Koçbaşı tipinde silindirler yekeye doğrusal itme uygular; döner kanat tipinde ise yağ basıncı kanatlara doğrudan dönme momenti verir ve yapı daha kompakttır.",
      category: "Gemi Sistemleri",
    },
    {
      id: 163,
      question:
        "Elektro-hidrolik dümen makinesinde iki güç ünitesi bulunmasının nedeni nedir?",
      options: [
        "Birinin arızasında diğerinin devralması",
        "Yalnızca yakıt tüketimini düşürmek için",
        "Yalnızca yağ sıcaklığını düşürmek için",
        "Yalnızca gürültüyü azaltabilmek için",
      ],
      correctAnswer: 0,
      explanation:
        "SOLAS dümen donanımında yedeklilik ister; her biri tek başına gereken hızı sağlayabilen iki pompa ünitesi, birinin arızasında manevra kabiliyetinin sürmesini güvenceye alır.",
      category: "Gemi Sistemleri",
    },
    {
      id: 164,
      question: "Telemotor sisteminin işlevi nedir?",
      options: [
        "Yelpazeyi doğrudan çevirmektir",
        "Dümen komutunu makineye iletmek",
        "Hidrolik yağı soğutmaktadır",
        "Şaft hattını yağlamaktadır",
      ],
      correctAnswer: 1,
      explanation:
        "Telemotor, köprüüstündeki dümen dolabının hareketini dümen dairesindeki alıcıya aktaran kumanda bağıdır; alıcı, pompanın strokunu ayarlayarak yelpazeyi döndürür.",
      category: "Gemi Sistemleri",
    },
    {
      id: 165,
      question: "Hidrolik telemotor devresinde hava kalması ne yaratır?",
      options: [
        "Yağ sıcaklığının kalıcı yükselmesini",
        "Dümen açısının kendiliğinden artmasını",
        "Gecikmeli ve süngerimsi kumandayı",
        "Elektrik motorunun devreden çıkmasını",
      ],
      correctAnswer: 2,
      explanation:
        "Sıkışabilir hava, verilen komut ile yelpazenin tepkisi arasında gecikme ve boşluk yaratır; bu yüzden devrenin havası düzenli olarak alınıp yağ tamamlanır.",
      category: "Gemi Sistemleri",
    },
    {
      id: 166,
      question: "Modern gemilerde telemotorun yerini büyük ölçüde ne almıştır?",
      options: [
        "Doğrudan mekanik çubuk bağlantısı",
        "Buhar basıncıyla çalışan kumanda",
        "Ağırlık ve makara düzeneği ile",
        "Elektrik sinyalli uzaktan kumanda",
      ],
      correctAnswer: 3,
      explanation:
        "Bugün komut çoğunlukla elektrikle iletilir; hidrolik telemotor yedek kumanda yolu olarak korunur, çünkü elektrik kesintisinde bağımsız çalışabilir.",
      category: "Gemi Sistemleri",
    },
    {
      id: 167,
      question: "Dümen donanımı testi kalkıştan ne kadar önce yapılır?",
      options: [
        "Kalkıştan önceki 12 saat içinde",
        "Kalkıştan önceki 7 gün içinde",
        "Kalkıştan önceki 30 gün içinde",
        "Kalkıştan önceki 6 ay içinde",
      ],
      correctAnswer: 0,
      explanation:
        "SOLAS, gemi kalkıştan önceki 12 saat içinde dümen donanımının test edilip kontrol edilmesini ister; test kaydı jurnale geçirilir.",
      category: "Gemi Sistemleri",
    },
    {
      id: 168,
      question: "Dümen donanımı testinde hangi başlıklar sınanır?",
      options: [
        "Yalnızca dümen dairesi aydınlatması",
        "Güç üniteleri, kumanda ve haberleşme",
        "Yalnızca hidrolik yağın satın alma tarihi",
        "Yalnızca dümen yelpazesinin boyası",
      ],
      correctAnswer: 1,
      explanation:
        "Test; ana ve yedek güç üniteleri, uzaktan kumanda sistemleri, köprüüstü-dümen dairesi haberleşmesi, acil güç kaynağı ve dümen açı göstergesini kapsar.",
      category: "Gemi Sistemleri",
    },
    {
      id: 169,
      question: "Ana dümen kumandası kaybedildiğinde yedek sistem nasıl çalıştırılır?",
      options: [
        "Yalnızca köprüüstünden devreye alınır",
        "Yalnızca liman devletinden izin alınır",
        "Dümen dairesinden yerel kumandayla",
        "Yalnızca acil jeneratör çalıştırılır",
      ],
      correctAnswer: 2,
      explanation:
        "Dümen dairesinde yerel kumanda düzeneği bulunur; köprüüstüyle telefon veya telsizle bağlantı kurularak açı komutları uygulanır. Bu yol tatbikatta düzenli prova edilir.",
      category: "Gemi Sistemleri",
    },
    {
      id: 170,
      question: "Sabit hatveli pervanede itme kuvveti nasıl değiştirilir?",
      options: [
        "Kanat hatvesi ayarlanarak değiştirilir",
        "Dümen açısı değiştirilerek ayarlanır",
        "Şaft yatağı gevşetilerek ayarlanır",
        "Makine devri değiştirilerek ayarlanır",
      ],
      correctAnswer: 3,
      explanation:
        "Sabit hatveli pervanede hatve değişmez; itme yalnızca ana makine devri değiştirilerek ayarlanır. Geri yol için makinenin ters yönde çalıştırılması gerekir.",
      category: "Gemi Sistemleri",
    },
    {
      id: 171,
      question: "Sabit hatveli pervanenin değişken hatveliye göre üstünlüğü nedir?",
      options: [
        "Daha basit yapı ve yüksek verim",
        "Manevrada daha hızlı tepki vermesi",
        "Makineyi durdurmadan geri yol vermesi",
        "Şaft jeneratörünü zorunlu kılmaması",
      ],
      correctAnswer: 0,
      explanation:
        "Sabit hatveli pervanede göbek küçüktür ve mekanizma yoktur; tasarım noktasındaki verimi yüksek, bakımı ve maliyeti düşüktür. Buna karşılık manevra esnekliği sınırlıdır.",
      category: "Gemi Sistemleri",
    },
    {
      id: 172,
      question: "Sabit hatveli pervaneli bir gemide geri yol nasıl elde edilir?",
      options: [
        "Hatve negatif konuma alınarak",
        "Ana makine ters yönde döndürülerek",
        "Dümen tam bordaya alınarak",
        "Şaft freni uygulanarak sağlanır",
      ],
      correctAnswer: 1,
      explanation:
        "Makine durdurulur, ters kam düzeni devreye alınır ve yol verme havasıyla ters yönde çalıştırılır; bu yüzden geri yol birkaç saniye gecikmeyle gelir.",
      category: "Gemi Sistemleri",
    },
    {
      id: 173,
      question: "Değişken hatveli pervanede (CPP) hatve nasıl kumanda edilir?",
      options: [
        "Yalnızca elle çevrilen bir kol ile",
        "Yalnızca dümen makinesi üzerinden",
        "Göbek içindeki hidrolik düzenekle",
        "Yalnızca şaft freni üzerinden",
      ],
      correctAnswer: 2,
      explanation:
        "Şaft içinden geçen yağ hattı göbekteki pistonu hareket ettirir ve kanatları eş zamanlı çevirir; makine sabit devirde dönerken itme sıfırdan tam ileri ve geriye ayarlanabilir.",
      category: "Gemi Sistemleri",
    },
    {
      id: 174,
      question: "Pervane kayması (slip) neyi ifade eder?",
      options: [
        "Kanat yüzeyindeki pürüzlülük oranını",
        "Şaft yatağındaki eksenel boşluğu",
        "Pervane göbeğinin dönme hatasını",
        "Teorik ile gerçek yol arasındaki fark",
      ],
      correctAnswer: 3,
      explanation:
        "Bir turda hatve kadar ilerleme beklenirken gerçek ilerleme daha azdır; aradaki oran kaymadır. Kaymanın yükselmesi kirlenme, ağır hava veya hasar habercisidir.",
      category: "Gemi Sistemleri",
    },
    {
      id: 175,
      question: "Pervanede kavitasyonun oluşma koşulu nedir?",
      options: [
        "Yerel basıncın buhar basıncına inmesi",
        "Deniz suyu sıcaklığının donma noktası",
        "Şaft devrinin sıfıra kadar düşmesi",
        "Dümen açısının sıfırda tutulması",
      ],
      correctAnswer: 0,
      explanation:
        "Kanat sırtındaki hız artışı basıncı düşürür; basınç suyun o sıcaklıktaki buhar basıncının altına inince kabarcık oluşur ve çökerken yüzeyi döver.",
      category: "Gemi Sistemleri",
    },
    {
      id: 176,
      question: "Pervane verimini düşüren en yaygın işletme nedeni nedir?",
      options: [
        "Yalnızca şaft yatağı sıcaklığı artışı",
        "Kanat yüzeyinin kirlenmesi ve pürüzü",
        "Yalnızca dümen açısının değişmesi",
        "Yalnızca yakıt viskozitesi değişimi",
      ],
      correctAnswer: 1,
      explanation:
        "Deniz canlıları ve oksit kanat yüzeyini pürüzlendirir ve sürtünme kayıplarını artırır; düzenli parlatma birkaç yüzde puanlık sevk verimi kazandırır.",
      category: "Gemi Sistemleri",
    },
    {
      id: 177,
      question: "Şaft hattı ana makineden pervaneye hangi sırayla dizilir?",
      options: [
        "Pervane, kuyruk şaftı, trust yatak, makine",
        "Trust yatak, pervane, ara şaft, makine",
        "Makine, trust yatak, ara şaft, kuyruk şaftı",
        "Ara şaft, makine, kuyruk şaftı, trust yatak",
      ],
      correctAnswer: 2,
      explanation:
        "Makineden sonra eksenel itmeyi tekneye aktaran trust yatak gelir; onu ara şaftlar ve destek yatakları izler, en sonda stern tube içindeki kuyruk şaftı ile pervane bulunur.",
      category: "Gemi Sistemleri",
    },
    {
      id: 178,
      question: "Şaft hattı hizalamasının (alignment) bozulması ne yaratır?",
      options: [
        "Yakıt tüketiminin kendiliğinden düşmesi",
        "Pervane hatvesinin kendiliğinden artması",
        "Dümen açısının kendiliğinden sapması",
        "Yatak aşırı yüklenmesi ve titreşim",
      ],
      correctAnswer: 3,
      explanation:
        "Hizasızlık yatak yüklerini eşitsiz dağıtır; bazı yataklar aşırı yüklenip ısınır, mil değişken eğilmeye maruz kalır ve titreşim ile yorulma çatlağı riski doğar.",
      category: "Gemi Sistemleri",
    },
    {
      id: 179,
      question: "Trust (baskı) yatağının görevi nedir?",
      options: [
        "Eksenel itmeyi tekne yapısına aktarmak",
        "Yalnızca şaftın radyal ağırlığını taşımak",
        "Yalnızca pervane hatvesini ayarlamaktır",
        "Yalnızca stern tube yağını soğutmaktır",
      ],
      correctAnswer: 0,
      explanation:
        "Pervanenin ürettiği ileri itme, trust yatağın segmanları üzerinden yatak gövdesine ve oradan tekne yapısına aktarılır; radyal yükü ise ara yataklar taşır.",
      category: "Gemi Sistemleri",
    },
    {
      id: 180,
      question: "Trust yatak segmanlarının sıcaklığı neden izlenir?",
      options: [
        "Yalnızca yağ tüketimini hesaplamak için",
        "Yağ filmi bozulmasını erken görmek için",
        "Yalnızca şaft devrini hesaplamak için",
        "Yalnızca pervane verimini bulmak için",
      ],
      correctAnswer: 1,
      explanation:
        "Sıcaklık yükselmesi yağ filminin inceldiğini ve metal temasının yaklaştığını gösterir; alarm sınırı aşılırsa yük düşürülür ve yağlama devresi incelenir.",
      category: "Gemi Sistemleri",
    },
    {
      id: 181,
      question: "Ara yatakların (intermediate bearing) işlevi nedir?",
      options: [
        "Yalnızca eksenel itmeyi karşılamaktır",
        "Yalnızca şaft devrini düşürmektir",
        "Şaftı taşıyıp doğru hizada tutmak",
        "Yalnızca pervane kanadını korumaktır",
      ],
      correctAnswer: 2,
      explanation:
        "Ara yataklar uzun şaft hattını belirli aralıklarla destekler, kendi ağırlığı altında sarkmasını önler ve hizayı korur; eksenel itmeyi ise yalnızca trust yatak karşılar.",
      category: "Gemi Sistemleri",
    },
    {
      id: 182,
      question: "Demir ırgadının kavrama (clutch) düzeneği neyi sağlar?",
      options: [
        "Zincirin kalıcı olarak kilitlenmesini",
        "Zincir hızının sürekli ölçülmesini",
        "Demirin ağırlığının tartılmasını",
        "Zincir dişlisinin serbest bırakılmasını",
      ],
      correctAnswer: 3,
      explanation:
        "Kavrama ayrıldığında zincir dişlisi tahrikten kurtulur ve demir kendi ağırlığıyla serbest düşer; bu sırada hız yalnızca bant frenle denetlenir.",
      category: "Gemi Sistemleri",
    },
    {
      id: 183,
      question: "Demir ırgadının kapasitesi hangi ölçüte göre belirlenir?",
      options: [
        "Zincir ağırlığını belirli hızda çekmesi",
        "Yalnızca güverte alanının genişliği",
        "Yalnızca elektrik motorunun rengi",
        "Yalnızca demirin boya kalınlığı",
      ],
      correctAnswer: 0,
      explanation:
        "Klas kuralları, ırgadın belirli sayıda kilit zinciri ve demiri belirlenmiş asgari hızda kaldırabilmesini ister; kısa süreli aşırı yük kapasitesi de aranır.",
      category: "Gemi Sistemleri",
    },
    {
      id: 184,
      question: "Demir alma sırasında bant frenin görevi nedir?",
      options: [
        "Zincirin serbest kalmasını sağlamak",
        "Zincir hızını kontrol edip durdurmak",
        "Zinciri sürekli yağlamayı sağlamak",
        "Zincir baklalarını numaralandırmak",
      ],
      correctAnswer: 1,
      explanation:
        "Bant fren zincir dişlisinin çevresini kavrayarak serbest düşen zinciri yavaşlatır ve durdurur; demirlemede zincirin kontrolsüz boşalmasını engelleyen tek düzenektir.",
      category: "Gemi Sistemleri",
    },
    {
      id: 185,
      question: "Yük vinçlerinde SWL değeri neyi ifade eder?",
      options: [
        "Vincin toplam kendi ağırlığını",
        "Vincin en yüksek erişim mesafesini",
        "Emniyetle kaldırılabilecek en büyük yük",
        "Vincin çalışma süresini saat olarak",
      ],
      correctAnswer: 2,
      explanation:
        "Emniyetli çalışma yükü, donanımın kopma yüküne emniyet katsayısı uygulanarak bulunan ve aşılmaması gereken sınırdır; her kaldırma donanımında işaretlenir.",
      category: "Gemi Sistemleri",
    },
    {
      id: 186,
      question: "Vinç kaldırma kapasitesi bom açısına göre neden değişir?",
      options: [
        "Yalnızca vinç boyası etkilendiği için",
        "Yalnızca elektrik tüketimi arttığı için",
        "Yalnızca operatör görüşü daraldığı için",
        "Devrilme momenti açıyla büyüdüğü için",
      ],
      correctAnswer: 3,
      explanation:
        "Bom yatıklaştıkça yükün dönme merkezine uzaklığı ve dolayısıyla moment büyür; bu yüzden yük eğrisi her açı için ayrı bir kapasite verir.",
      category: "Gemi Sistemleri",
    },
    {
      id: 187,
      question: "Kaldırma donanımının periyodik testi hangi kayda bağlanır?",
      options: [
        "Kaldırma donanımı sicil kütüğüne",
        "Yalnızca makine jurnaline yazılır",
        "Yalnızca telsiz jurnaline yazılır",
        "Yalnızca yakıt kayıt defterine",
      ],
      correctAnswer: 0,
      explanation:
        "Kurallar, vinç ve kaldırma donanımı için yük testi, muayene ve sertifikaların tutulduğu bir sicil kütüğü bulundurulmasını ister; kayıt denetimlerde istenir.",
      category: "Gemi Sistemleri",
    },
    {
      id: 188,
      question: "Otomatik gerilimli (auto-tension) mooring vinci ne yapar?",
      options: [
        "Halatı sabit uzunlukta kilitli tutar",
        "Gerilimi izleyip halatı sarar veya boşaltır",
        "Halatı sürekli tam hızda toplamaktadır",
        "Halat gerilimini hiç ölçmemektedir",
      ],
      correctAnswer: 1,
      explanation:
        "Vinç, ayarlanan gerilim aralığının dışına çıkıldığında tamburu döndürerek halatı toplar veya bırakır; gelgit ve draft değişiminde bağlamayı korur.",
      category: "Gemi Sistemleri",
    },
    {
      id: 189,
      question: "Otomatik gerilim modunun tehlikeli olabildiği durum hangisidir?",
      options: [
        "Yalnızca demirde beklerken kullanımı",
        "Yalnızca fırtınalı havada kullanımı",
        "Yük operasyonu sırasında kullanımı",
        "Yalnızca gece vakti kullanımı hâlinde",
      ],
      correctAnswer: 2,
      explanation:
        "Yükleme ve boşaltmada draft hızla değişir, vinç sürekli halat toplar; bu, halatların dengesiz yüklenmesine ve ani kopmaya yol açabildiğinden mod genelde kapatılır.",
      category: "Gemi Sistemleri",
    },
    {
      id: 190,
      question: "Mooring halatının kopması durumunda tehlikeli bölge hangisidir?",
      options: [
        "Yalnızca vinç tamburunun üst yüzeyi",
        "Yalnızca güverte kaportası çevresi",
        "Yalnızca köprüüstü kanadı bölgesi",
        "Halatın geri savrulduğu snap-back alanı",
      ],
      correctAnswer: 3,
      explanation:
        "Gerilen halat koptuğunda biriken enerjiyle kamçı gibi savrulur; makaraların ve dönüş noktalarının çevresindeki bu alan güverteye boyanarak işaretlenir ve boş tutulur.",
      category: "Gemi Sistemleri",
    },
    {
      id: 191,
      question: "Katlanır (folding) ambar kapağı nasıl çalışır?",
      options: [
        "Hidrolik silindirle panelleri katlar",
        "Panelleri raydan denize indirir",
        "Panelleri kalıcı olarak kaynaklar",
        "Panelleri vinçle tek tek kaldırır",
      ],
      correctAnswer: 0,
      explanation:
        "İkişerli panel grupları menteşeyle bağlıdır; hidrolik silindir grubu kaldırınca paneller kitap gibi katlanıp ambar ağzının başına veya kıçına istiflenir.",
      category: "Gemi Sistemleri",
    },
    {
      id: 192,
      question: "Ambar kapağı sızdırmazlığı hangi elemanla sağlanır?",
      options: [
        "Yalnızca panel üstündeki boya katmanı",
        "Conta ile karşı bası çubuğu (compression bar)",
        "Yalnızca kapağın kendi ağırlığı ile",
        "Yalnızca ambar içindeki basınç farkı",
      ],
      correctAnswer: 1,
      explanation:
        "Panel kenarındaki lastik conta, kapak süzülürken ağızlıktaki bası çubuğuna belirli bir miktar bastırılır; conta izinin derinliği düzenli ölçülerek sızdırmazlık doğrulanır.",
      category: "Gemi Sistemleri",
    },
    {
      id: 193,
      question: "Ambar kapağı sızdırmazlığı hangi testle doğrulanır?",
      options: [
        "Yalnızca gözle yapılan boya kontrolü",
        "Yalnızca kapak ağırlığının tartılması",
        "Hortum veya ultrasonik sızdırmazlık testi",
        "Yalnızca panel kalınlığının ölçülmesi",
      ],
      correctAnswer: 2,
      explanation:
        "Basınçlı hortum testi kapalı ambara su püskürterek kaçağı arar; ultrasonik test ise ambar içine konan vericinin sesini dışarıdan tarayarak açıklığı belirler.",
      category: "Gemi Sistemleri",
    },
    {
      id: 194,
      question: "Ro-ro gemilerinde kıç rampasının kapalı konumdaki temel işlevi nedir?",
      options: [
        "Yalnızca araç bağlama noktası olmak",
        "Yalnızca güverte aydınlatmasını taşımak",
        "Yalnızca yangın bölmesi oluşturmak",
        "Su geçirmez kapak görevi görmek",
      ],
      correctAnswer: 3,
      explanation:
        "Rampa kapandığında gövdenin su geçirmez sınırının parçası olur; contaları, kilit düzenekleri ve gösterge devreleri bu yüzden düzenli olarak test edilir.",
      category: "Gemi Sistemleri",
    },
    {
      id: 195,
      question: "Rampa ve kapak kilitlerinin köprüüstü göstergesi neyi doğrular?",
      options: [
        "Kilitlerin tam kapalı konumda olduğunu",
        "Yalnızca hidrolik yağın sıcaklığını",
        "Yalnızca araç sayısının doğruluğunu",
        "Yalnızca güverte lambalarının açıklığını",
      ],
      correctAnswer: 0,
      explanation:
        "SOLAS, ro-ro gemilerinde baş ve kıç kapaklarının kapalı ve kilitli olduğunu köprüüstünde gösteren bağımsız bir gösterge ile sızıntı algılama düzeni ister.",
      category: "Gemi Sistemleri",
    },
    {
      id: 196,
      question: "Araç asansöründe (car lift) hangi emniyet düzeneği bulunur?",
      options: [
        "Yalnızca kabin içi aydınlatma düzeni",
        "Aşırı yük ve halat gevşeme koruması",
        "Yalnızca kabin boyası kalınlık ölçer",
        "Yalnızca kabin numarası göstergesi",
      ],
      correctAnswer: 1,
      explanation:
        "Aşırı yük şalteri, halat gevşeme ve kopma algılayıcıları, uç kesiciler ve kapı kilitleri birlikte çalışır; herhangi biri devreye girdiğinde hareket durur.",
      category: "Gemi Sistemleri",
    },
    {
      id: 197,
      question: "Değişken deplasmanlı hidrolik pompanın üstünlüğü nedir?",
      options: [
        "Yalnızca daha ucuz üretilebilmesi",
        "Yalnızca hiç yağ sızdırmaz olması",
        "Debiyi ihtiyaca göre ayarlayabilmesi",
        "Yalnızca hiç bakım gerektirmemesi",
      ],
      correctAnswer: 2,
      explanation:
        "Eğik plaka açısı değiştirilerek strok hacmi ayarlanır; sistem yalnızca gereken debiyi çeker, böylece emniyet valfinden kaçan yağın ısıya dönüşmesi önlenir.",
      category: "Gemi Sistemleri",
    },
    {
      id: 198,
      question: "Dişli tipi hidrolik pompanın tipik kullanım alanı nedir?",
      options: [
        "Yalnızca çok yüksek basınçlı devreler",
        "Yalnızca değişken debili ana devreler",
        "Yalnızca dümen makinesi ana pompası",
        "Basit ve orta basınçlı yardımcı devreler",
      ],
      correctAnswer: 3,
      explanation:
        "Dişli pompa sabit deplasmanlıdır, yapısı basit ve ucuzdur; yağlama ile orta basınçlı yardımcı devrelerde tercih edilir. Yüksek basınçta pistonlu tipler kullanılır.",
      category: "Gemi Sistemleri",
    },
    {
      id: 199,
      question: "Hidrolik pompada kavitasyonun belirtisi nedir?",
      options: [
        "Gürültü artışı ve düzensiz basınç",
        "Yağ sıcaklığının kalıcı düşmesi",
        "Basıncın kendiliğinden sabitlenmesi",
        "Yağ seviyesinin kendiliğinden artması",
      ],
      correctAnswer: 0,
      explanation:
        "Emiş tarafındaki tıkanma veya düşük yağ seviyesi kabarcık oluşturur; pompa çakıl sesi çıkarır, basınç dalgalanır ve iç yüzeylerde erozyon başlar.",
      category: "Gemi Sistemleri",
    },
    {
      id: 200,
      question: "Hidrolik silindirde kuvvet hangi çarpımla bulunur?",
      options: [
        "Debi ile piston hızının çarpımı",
        "Basınç ile piston alanının çarpımı",
        "Basınç ile yağ sıcaklığı çarpımı",
        "Debi ile boru çapının çarpımı",
      ],
      correctAnswer: 1,
      explanation:
        "Kuvvet, basınç ile piston alanının çarpımıdır; çift etkili silindirde geri strokta mil alanı düştüğü için aynı basınçta üretilen kuvvet ileri stroktan küçüktür.",
      category: "Gemi Sistemleri",
    },
    {
      id: 201,
      question: "Hidrolik motorun hidrolik silindirden farkı nedir?",
      options: [
        "Yalnızca daha yüksek basınç istemesi",
        "Yalnızca yağ yerine hava kullanması",
        "Doğrusal değil sürekli dönme vermesi",
        "Yalnızca tek yönde çalışabilmesi",
      ],
      correctAnswer: 2,
      explanation:
        "Silindir sınırlı strok boyunca doğrusal hareket üretir; hidrolik motor ise aynı akışı sürekli dönme momentine çevirir ve vinç ile ırgat tahrikinde kullanılır.",
      category: "Gemi Sistemleri",
    },
    {
      id: 202,
      question: "4/3 yön kontrol valfindeki sayılar neyi gösterir?",
      options: [
        "Basınç sınırı ile debi değerini",
        "Yağ sıcaklığı ile viskozite sınıfını",
        "Silindir çapı ile strok boyunu",
        "Bağlantı sayısı ile konum sayısını",
      ],
      correctAnswer: 3,
      explanation:
        "İlk sayı valfe bağlanan hat sayısını, ikinci sayı ise sürgünün alabileceği konum sayısını verir; orta konum tipi devrenin durma davranışını belirler.",
      category: "Gemi Sistemleri",
    },
    {
      id: 203,
      question: "Basınç kontrol valfi olan emniyet valfinin devredeki görevi nedir?",
      options: [
        "Basıncı sınırlayıp fazlasını tanka atmak",
        "Yalnızca yağ sıcaklığını düşürmektir",
        "Yalnızca akış yönünü değiştirmektir",
        "Yalnızca yağı süzüp temizlemektir",
      ],
      correctAnswer: 0,
      explanation:
        "Ayar değeri aşılınca valf açılır ve fazla debiyi tanka boşaltarak devreyi ve pompayı korur; sürekli açık kalması yağın hızla ısınmasına yol açar.",
      category: "Gemi Sistemleri",
    },
    {
      id: 204,
      question: "Kısma (throttle) valfinin devredeki etkisi nedir?",
      options: [
        "Yalnızca basıncı sıfıra düşürmesi",
        "Debiyi kısarak hareket hızını ayarlar",
        "Yalnızca akış yönünü ters çevirmesi",
        "Yalnızca yağ viskozitesini artırması",
      ],
      correctAnswer: 1,
      explanation:
        "Kesiti daraltarak geçen debiyi sınırlar; silindir veya motorun hızı debiyle orantılı olduğundan hareket yavaşlar. Kısılan enerji ısıya dönüştüğü için yağ ısınır.",
      category: "Gemi Sistemleri",
    },
    {
      id: 205,
      question: "Hidrolik devre şemasında kesikli çizgi neyi gösterir?",
      options: [
        "Yalnızca ana basınç hattını gösterir",
        "Yalnızca tank dönüş hattını gösterir",
        "Pilot (kumanda) hattını göstermektedir",
        "Yalnızca elektrik kablosunu gösterir",
      ],
      correctAnswer: 2,
      explanation:
        "Sürekli çizgi çalışma hatlarını, kesikli çizgi pilot ve kumanda hatlarını, noktalı çizgi ise drenaj hatlarını gösterir; sembolleri okumak arıza aramanın ilk adımıdır.",
      category: "Gemi Sistemleri",
    },
    {
      id: 206,
      question: "Devre şemasında valf sembolündeki kare kutular neyi anlatır?",
      options: [
        "Valfin ağırlığını kilogram cinsinden",
        "Valfin üretim yılını göstermektedir",
        "Valfin bağlı olduğu tank hacmini",
        "Valfin alabileceği her bir konumu",
      ],
      correctAnswer: 3,
      explanation:
        "Her kutu bir konumu temsil eder ve içindeki oklar o konumda hangi bağlantının hangisine açık olduğunu gösterir; kutu sayısı valfin konum sayısıdır.",
      category: "Gemi Sistemleri",
    },
    {
      id: 207,
      question: "Hidrolik devrede arıza ararken ilk bakılan nokta nedir?",
      options: [
        "Yağ seviyesi, filtre ve basınç göstergesi",
        "Yalnızca elektrik motorunun etiketi",
        "Yalnızca boruların boya durumu",
        "Yalnızca tank kapağının sızdırmazlığı",
      ],
      correctAnswer: 0,
      explanation:
        "Arızaların büyük bölümü düşük yağ seviyesi, tıkalı filtre veya kayıp basınçtan doğar; bunlar doğrulanmadan valf ve pompa sökmek zaman kaybıdır.",
      category: "Gemi Sistemleri",
    },
    {
      id: 208,
      question: "Hidrolik yağda su bulunması hangi sonuca yol açar?",
      options: [
        "Yalnızca yağın renginin açılmasına",
        "Korozyon ve yağlama filminin bozulması",
        "Yalnızca yağ viskozitesinin yükselmesi",
        "Yalnızca yağ sıcaklığının düşmesine",
      ],
      correctAnswer: 1,
      explanation:
        "Su, yağlama filmini zayıflatır, katkı maddelerini bozar ve iç yüzeylerde korozyon ile yapışkan çamur oluşturur; belirtisi yağın süt beyazı görünmesidir.",
      category: "Gemi Sistemleri",
    },
    {
      id: 209,
      question: "İki kademeli hava kompresöründe ara soğutucunun görevi nedir?",
      options: [
        "Yalnızca yağ tüketimini artırmaktır",
        "Yalnızca gürültü düzeyini düşürmektir",
        "Sıcaklığı düşürüp işi azaltmaktır",
        "Yalnızca hava debisini büyütmektir",
      ],
      correctAnswer: 2,
      explanation:
        "Ara soğutucu, ilk kademeden çıkan sıcak havayı soğutarak ikinci kademede sıkıştırılacak hacmi küçültür; böylece hem harcanan iş hem çıkış sıcaklığı düşer.",
      category: "Gemi Sistemleri",
    },
    {
      id: 210,
      question: "Hava kompresörü çıkışındaki emniyet valfi neye karşı korur?",
      options: [
        "Yalnızca soğutma suyu kaybına karşı",
        "Yalnızca elektrik kesintisine karşı",
        "Yalnızca yağ seviyesi düşüşüne karşı",
        "Aşırı basınç oluşmasına karşı korur",
      ],
      correctAnswer: 3,
      explanation:
        "Çıkış valfi kapalıyken veya basınç şalteri arızalandığında basınç hızla yükselir; her kademe çıkışındaki emniyet valfi belirlenen değerde açarak devreyi korur.",
      category: "Gemi Sistemleri",
    },
    {
      id: 211,
      question: "Vidalı hava kompresörünün pistonlu tipe göre farkı nedir?",
      options: [
        "Sürekli ve titreşimsiz hava vermesi",
        "Yalnızca daha düşük debi vermesi",
        "Yalnızca hiç yağ kullanmaması",
        "Yalnızca soğutma gerektirmemesi",
      ],
      correctAnswer: 0,
      explanation:
        "Vidalı kompresör dönel çalıştığı için darbesiz ve sürekli akış verir, titreşimi düşüktür; pistonlu tip ise darbeli akış üretir ve daha çok bakım ister.",
      category: "Gemi Sistemleri",
    },
    {
      id: 212,
      question: "Basınçlı hava hattında hava kurutucunun görevi nedir?",
      options: [
        "Yalnızca havanın basıncını yükseltmek",
        "Nemi alıp yoğuşmayı önlemektir",
        "Yalnızca hava debisini artırmaktır",
        "Yalnızca havayı ısıtmaktır",
      ],
      correctAnswer: 1,
      explanation:
        "Sıkıştırılan hava soğuduğunda içindeki nem yoğuşur; kurutucu bu nemi alarak valflerde korozyonu, soğuk havada donmayı ve kumanda arızalarını önler.",
      category: "Gemi Sistemleri",
    },
    {
      id: 213,
      question: "Soğutmalı (refrigerant) hava kurutucu nasıl çalışır?",
      options: [
        "Havayı ısıtıp nemi buharlaştırarak",
        "Havayı süzgeçten geçirip filtreleyerek",
        "Havayı çiy noktasına soğutup su alarak",
        "Havayı kimyasal katkıyla karıştırarak",
      ],
      correctAnswer: 2,
      explanation:
        "Hava soğutucudan geçirilerek çiy noktasının altına indirilir, yoğuşan su ayrılıp otomatik drenle atılır, ardından hava yeniden ısıtılarak hatta verilir.",
      category: "Gemi Sistemleri",
    },
    {
      id: 214,
      question: "Hava hattı filtresinin drenajı neden düzenli boşaltılır?",
      options: [
        "Yalnızca filtre boyasını korumak için",
        "Yalnızca filtre ağırlığını azaltmak için",
        "Yalnızca hattı yağlamayı sağlamak için",
        "Biriken suyun hatta taşmaması için",
      ],
      correctAnswer: 3,
      explanation:
        "Filtre haznesinde toplanan su ve yağ, seviye yükselince hava akışıyla sürüklenip valflere ve otomasyon elemanlarına ulaşır; otomatik dren tıkanmışsa elle boşaltılır.",
      category: "Gemi Sistemleri",
    },
    {
      id: 215,
      question: "Ana makine yol verme (starting air) havası hangi basınçta tutulur?",
      options: [
        "Yaklaşık 30 bar dolayında tutulur",
        "Yaklaşık 7 bar dolayında tutulur",
        "Yaklaşık 2 bar dolayında tutulur",
        "Yaklaşık 150 bar dolayında tutulur",
      ],
      correctAnswer: 0,
      explanation:
        "Yol verme hava tüpleri genellikle 30 bar dolayında doldurulur; kontrol ve servis havası ise basınç düşürücü ile 7 bar dolayına indirilir.",
      category: "Gemi Sistemleri",
    },
    {
      id: 216,
      question: "SOLAS yol verme havası kapasitesi için ne ister?",
      options: [
        "Yalnızca tek bir yol verme yetecek hava",
        "Doldurmadan belirli sayıda ardışık yol verme",
        "Yalnızca liman manevrasına yetecek hava",
        "Yalnızca acil jeneratöre yetecek hava",
      ],
      correctAnswer: 1,
      explanation:
        "Kurallar, hava tüplerinin yeniden doldurulmadan tersinir makinelerde on iki, tersinmez makinelerde altı ardışık yol vermeye yetecek hacimde olmasını ister.",
      category: "Gemi Sistemleri",
    },
    {
      id: 217,
      question: "Yol verme havası hattındaki alev tutucu neye karşı korur?",
      options: [
        "Yalnızca hattaki nem birikimine karşı",
        "Yalnızca basınç dalgalanmasına karşı",
        "Silindirden gelen alevin yayılmasına",
        "Yalnızca kompresör titreşimine karşı",
      ],
      correctAnswer: 2,
      explanation:
        "Sızdıran bir yol verme valfi, silindirdeki sıcak gazın hatta girip yağ buharını tutuşturmasına yol açabilir; alev tutucu ve patlama diski bu zinciri keser.",
      category: "Gemi Sistemleri",
    },
    {
      id: 218,
      question: "Kontrol havası ile servis havası arasındaki temel fark nedir?",
      options: [
        "Servis havası çok daha yüksek basınçlıdır",
        "Kontrol havası hiç kurutulmaz durumda",
        "Servis havası yalnızca köprüde kullanılır",
        "Kontrol havası daha kuru ve temiz olur",
      ],
      correctAnswer: 3,
      explanation:
        "İkisi de aynı kaynaktan beslenir ama kontrol havası ek kurutma ve filtrelemeden geçer; otomasyon valfleri ve konum vericileri nem ile yağa karşı çok duyarlıdır.",
      category: "Gemi Sistemleri",
    },
    {
      id: 219,
      question: "Kontrol havası kaybedildiğinde sistemler hangi konuma geçmelidir?",
      options: [
        "Önceden tanımlı emniyetli konuma",
        "Yalnızca tam açık konuma geçmeli",
        "Yalnızca tam kapalı konuma geçmeli",
        "Rastgele bir ara konumda kalmalı",
      ],
      correctAnswer: 0,
      explanation:
        "Her pnömatik aktüatör hava kaybında yay kuvvetiyle emniyetli konuma gider; bu konum ekipmana göre değişir, örneğin yakıt valfi kapanırken soğutma valfi açılır.",
      category: "Gemi Sistemleri",
    },
  ],
};
