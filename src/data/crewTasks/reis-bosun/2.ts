import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Bağlama ve manevra operasyonlarında ekip yönetimi",
  roleSlug: "reis-bosun",
  taskIndex: 2,
  estimatedPages: 26,
  intro: `Bağlama (mooring) ve manevra, güvertedeki en tehlikeli rutin operasyonlardandır; gerilim altındaki halatlar, dönen winch'ler ve dar çalışma alanı sürekli ölümcül risk taşır. Reis, forward (baş) veya aft (kıç) istasyonunda operasyonel liderlik yapar; köprüüstünden gelen komutları sahada güvenle uygular, snap-back disiplinini dayatır ve ekibi koordine eder. Bu bölüm; istasyon hazırlığı, halat/tel teknikleri, winch operasyonu, snap-back tehlikesi, tug ve pilot koordinasyonu ile demir-bağlama kazalarından çıkarılan dersleri ele alır.`,
  sources: [
    "OCIMF — Mooring Equipment Guidelines, 4th Edition (MEG4)",
    "ISGOTT 6 — Mooring & berthing operations",
    "UK MAIB — Mooring incident investigation reports",
    "Code of Safe Working Practices for Merchant Seafarers (COSWP) — Ch. 25 Mooring",
    "SOLAS Chapter II-1 Reg. 3-8 — Towing and mooring equipment",
    "IMO MSC.1/Circ.1175 (Rev.1) — Guidance on mooring arrangements",
    "OCIMF — Effective Mooring (4th Edition)",
  ],
  chapters: [
    {
      heading: "1. Bağlama Operasyonunun Riski ve Reis'in Rolü",
      lead: `Mooring, denizcilikte yaralanma ve ölümlerin başlıca kaynaklarından biridir; Reis bu istasyonun güvenlik sorumlusudur.`,
      sections: [
        {
          subheading: "1.1 Neden bu kadar tehlikeli?",
          paragraphs: [
            `Bağlama operasyonunda halatlar geminin tüm tonajının yarattığı kuvvetleri taşır; bir halat MBL'sine yakın gerildiğinde içinde yüzlerce kJ enerji depolanır. Bu halat koptuğunda enerji bir kamçı gibi serbest kalır ve "snap-back" denen ölümcül geri tepme oluşur. Dönen winch drum'ı, dar çalışma alanı, ıslak güverte ve görüş kısıtı riski artırır.`,
            `Reis; istasyondaki tüm tayfaların güvenli noktada durmasını, doğru tekniği kullanmasını ve köprüüstü komutlarını eksiksiz uygulamasını sağlar. Bir operasyon ne kadar rutinse o kadar tehlikelidir; çünkü dikkat azalır. Reis'in görevi, dikkati canlı tutmaktır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Snap-back zone",
              text: `Gerilim altındaki bir halat koptuğunda kopuş noktasından her iki yöne doğru lastik gibi geri teper. Snap-back zone, güvertede koniler/oklar/sarı çizgilerle işaretlenir ve operasyon süresince içinde durmak kesinlikle yasaktır. Sentetik halatlar tel halattan daha şiddetli geri teper.`,
            },
          ],
        },
        {
          subheading: "1.2 Reis'in istasyon liderliği",
          paragraphs: [
            `Reis genelde baş (forward) istasyonunu, İkinci Zabit kıç (aft) istasyonunu yönetir; ya da düzenlemeye göre Reis kıçta olur. Reis, istasyonda kimin hangi halata bakacağını, kimin winch'i kullanacağını, kimin gözcü olacağını net atar. Telsizle köprüüstüyle iletişim kurar; her komutu read-back ile teyit eder.`,
          ],
        },
      ],
    },
    {
      heading: "2. İstasyon Hazırlığı (Stations By)",
      sections: [
        {
          subheading: "2.1 Manevra öncesi hazırlık",
          paragraphs: [
            `Köprüüstü "stations by for mooring/unmooring" emri verdiğinde Reis ekibi istasyona toplar. Halatlar ranzadan çıkarılır, fairlead ve roller'lar üzerinden geçirilir, heaving line (atış halatı) hazırlanır. Winch'ler test edilir, frenler kontrol edilir, deck ışıkları (gece) yakılır. PPE eksiksiz takılır.`,
            `Reis, güvertede kayma/takılma riski yaratan ne varsa (yağ, halat yığını, alet) temizletir. Snap-back zone'lar gözden geçirilir, telsiz/iletişim test edilir. Tüm ekip ne yapacağını bilir; "stations ready forward/aft" raporu köprüüstüne verilir.`,
          ],
          bullets: [
            `Halatlar fairlead/roller üzerinden doğru yönde geçirilmiş mi?`,
            `Heaving line + monkey fist hazır, ucu güvenli mi (ağırlık kuralı: kum/halat, metal değil)?`,
            `Winch frenleri test edildi mi, dişli boşta mı?`,
            `Güverte aydınlatması ve telsiz çalışıyor mu?`,
            `Ekip PPE'li, snap-back zone dışında konumlandı mı?`,
          ],
        },
        {
          subheading: "2.2 Halat planı (mooring pattern)",
          paragraphs: [
            `Standart bağlama paterni; head line, breast line, spring line (baş ve kıçta) içerir. Spring'ler boyuna hareketi, breast'ler enine hareketi, head/stern line'lar genel tutuşu sağlar. Reis, köprüüstü ve pilotla koordineli olarak hangi halatın önce verileceğini bilir; genelde spring veya breast ilk verilir.`,
          ],
          table: {
            caption: `Mooring Halat Tipleri ve İşlevi`,
            headers: ["Halat", "Konum", "Kontrol Ettiği Hareket"],
            rows: [
              ["Head/Stern line", "Baş/kıç ucu", "Genel tutuş, uzaklaşma"],
              ["Breast line", "Bordaya dik", "Enine (off-berth) hareket"],
              ["Spring line", "Boyuna, ileri/geri", "İleri-geri (surge) hareket"],
              ["Tail (sentetik kuyruk)", "Tel halat ucu", "Esneklik + dinamik yük emilimi"],
            ],
          },
        },
      ],
    },
    {
      heading: "3. Halat ve Tel Teknikleri",
      sections: [
        {
          subheading: "3.1 Heaving line ve halat verme",
          paragraphs: [
            `Atış halatı (heaving line) iskele/rıhtımdaki bağlama personeline atılır; ucundaki monkey fist içine metal koymak yasaktır (ölümcül kafa yaralanmaları olmuştur — IMO içine kum/halat doldurulmuş, max ~0.5 kg ağırlık şart koşar). Bağlama personeli halatı çeker, bittini babaya (bollard) takar. Reis, halatın fairlead'de doğru oturduğunu denetler.`,
            `Halat winch drum'a sarılırken "turn"ların düzgün, üst üste binmeden yatması gerekir; riding turn (üst üste binme) winch kilitlenmesine ve kontrol kaybına yol açar. Reis, drum'a yeterli turn (genelde 3-4) sarıldığını ve render etmeye uygun olduğunu kontrol eder.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Elle halat tutmanın sınırı",
              text: `Gerilim altına girecek bir halatı asla elle veya vücutla tutarak frenleme; winch freni veya bitt kullan. Halatın etrafında durma, asla halatın içinde (bight) ayak/bacak bulundurma. Halat ve insan eli arasındaki güç farkı tek taraflıdır.`,
            },
          ],
        },
        {
          subheading: "3.2 Tel halat (wire) ve karışık donanım",
          paragraphs: [
            `Bazı gemilerde wire + sentetik tail kombinasyonu kullanılır; tail, telin sertliğini dengeleyerek dinamik yükü emer. Reis, tail'in MBL'sinin tel halatla uyumlu (genelde telin %125-150'si) ve bağlantı shackle/cow hitch'inin sağlam olduğunu denetler. Yıpranmış tail kopma riskini artırır.`,
            `Mixed mooring (aynı yönde hem tel hem sentetik halat kullanmak) MEG4 tarafından önerilmez; çünkü farklı esneklikte halatlar yükü eşit paylaşmaz, sert olan önce kopar. Reis bu hatayı önler; aynı serviste benzer elastikiyette halatlar kullanılır.`,
          ],
        },
      ],
    },
    {
      heading: "4. Winch Operasyonu",
      sections: [
        {
          subheading: "4.1 Winch kullanımı ve fren yönetimi",
          paragraphs: [
            `Mooring winch'ler heave (vira), slack (fıra) ve brake (fren) fonksiyonlarına sahiptir. Operatör, köprüüstü komutuna göre halatı toplar veya boşaltır. Auto-tension modu bazı winch'lerde vardır ama MEG4, gel-git/yük değişiminde dinamik aşırı yüklenme riski nedeniyle dikkatli kullanımı önerir.`,
            `Winch freni, halatın MBL'sinin altında (genelde %60 SDBF civarı) render edecek (kayarak yük boşaltacak) şekilde ayarlanmalıdır; böylece halat kopmadan fren kayar ve enerji kontrollü boşalır. Brake holding capacity periyodik test edilir. Reis bu ayarın doğru olduğunu bilir ve frenin sıkılığını gözetir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MEG4 — Brake render setting",
              text: `OCIMF MEG4, winch freninin halat kopmadan render etmesi için brake setting'in halat LDBF/MBL'sine göre ayarlanmasını ister (tipik olarak MBL'nin %60'ı civarı render). Yanlış ayarlanmış fren, ya halatı koparır ya da gemiyi serbest bırakır.`,
            },
          ],
        },
        {
          subheading: "4.2 Render ve kontrollü boşaltma",
          paragraphs: [
            `Aşırı yük altında halat koparmak yerine winch freninin kontrollü kaymasına (render) izin vermek, hem ekipmanı hem insanı korur. Reis, halatın aşırı gerildiğini (su atması, ses, drum titremesi) fark ettiğinde derhal müdahale eder; gerekirse köprüüstüne "halat aşırı yükte" uyarısı verir.`,
          ],
        },
      ],
    },
    {
      heading: "5. Köprüüstü ve Pilot Koordinasyonu",
      sections: [
        {
          subheading: "5.1 Komut zinciri",
          paragraphs: [
            `Manevra sırasında pilot, köprüüstüne komut verir; köprüüstü telsizle istasyona ("heave away forward spring", "slack head line", "make fast", "let go aft") iletir. Reis bu komutları read-back ile teyit eder ve sahada uygular. Komut anlaşılmadıysa "say again" denir; tahminle iş yapılmaz.`,
            `Reis, sahadan köprüüstüne geri bildirim verir: "forward spring made fast", "one line ashore", "all fast forward", "all gone aft, clear of propeller". Özellikle "clear of propeller/thruster" bilgisi kritiktir; halat suya düşmüşse pervaneye dolanma riski vardır ve köprüüstü uyarılmadan makine kullanılmaz.`,
          ],
        },
        {
          subheading: "5.2 Tug (römorkör) operasyonu",
          paragraphs: [
            `Römorkör kullanılıyorsa Reis, tug line'ın gemiye güvenli alınmasını, doğru bitt/SPM noktasına bağlanmasını ve gerginlik altında ekibin uzak durmasını sağlar. Tug line kopması veya yanlış açıyla yüklenmesi ciddi yaralanmalara yol açar. Tug ile çalışma köprüüstü-pilot-tug master üçgeninde koordine edilir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka dersi — tug girdap kazası",
              text: `Bir manevrada römorkörün aşırı çekişi tug line'ı kopardı; geri tepme kıç istasyonunda bir tayfayı ağır yaraladı. MAIB raporu, ekibin tug line snap-back zone'unda durduğunu ve risk değerlendirmesinin römorkör yükünü hesaba katmadığını vurguladı.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Snap-Back ve Gerilim Tehlikeleri",
      sections: [
        {
          subheading: "6.1 Snap-back fiziği ve korunma",
          paragraphs: [
            `Sentetik halat esnerken enerji depolar; koptuğunda bu enerji geri tepme olarak boşalır. Modern görüş, "tüm güverte potansiyel snap-back alanıdır" yönündedir çünkü halat yönü değiştikçe tehlikeli bölge de değişir. Reis, ekibe halat hattının dışında, mümkün olduğunca winch/bitt arkasında durmayı öğretir.`,
            `Yeni MEG4 yaklaşımı, sabit "snap-back zone" işaretlerinin yanıltıcı olabileceğini, çünkü fairlead etrafında halatın yön değiştirdiğini vurgular. Reis, ekibe statik işaretlere körü körüne güvenmek yerine dinamik tehlike bilinci kazandırır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Tüm güverte tehlikelidir",
              text: `Snap-back zone işaretleri yardımcıdır ama yetersizdir; halat fairlead'de yön değiştirdikçe tehlike alanı kayar. Güvenli ilke: gergin halattan mümkün olduğunca uzak dur, halat hattının dışında konumlan, kaçış yolunu önceden belirle.`,
            },
          ],
        },
        {
          subheading: "6.2 Parted line acil durumu",
          paragraphs: [
            `Bir halat koparsa Reis derhal "line parted" diye uyarır, köprüüstünü bilgilendirir ve ekibin güvenliğini kontrol eder. Yaralı varsa first-aid ve MOB/medevac prosedürü başlatılır. Kalan halatların yükü arttığından operasyon yeniden değerlendirilir; gerekirse ek halat verilir.`,
          ],
        },
      ],
    },
    {
      heading: "7. Demir (Anchor) Destekli Manevra",
      sections: [
        {
          subheading: "7.1 Manevrada demir kullanımı",
          paragraphs: [
            `Dar sularda veya akıntılı yanaşmada pilot, geminin başını tutmak için demir kullanabilir ("dredging anchor"). Reis fo'c'sle'da windlass'ı hazır tutar, chain stopper ve brake'i yönetir, köprüüstü komutuyla (örn. "walk back two shackles") zinciri kontrollü verir. Demir donanımı detayları ayrı bir bölümde (görev 8) ele alınır.`,
          ],
        },
        {
          subheading: "7.2 Baş-kıç koordinasyonu",
          paragraphs: [
            `Baş istasyonu demir/halat ile, kıç istasyonu halat ile aynı anda çalışır. Reis, kendi istasyonunda olup biteni köprüüstüne net iletir ki köprüüstü iki ucu senkronize yönetebilsin. İletişim kopukluğu, bir uçta gemi bağlıyken diğer ucun fırlatması gibi tehlikeli durumlar yaratır.`,
          ],
        },
      ],
    },
    {
      heading: "8. Ayrılma (Unmooring) ve Let Go",
      sections: [
        {
          subheading: "8.1 Kalkış operasyonu",
          paragraphs: [
            `"Single up" komutuyla fazla halatlar toplanır, gemi tek halatla tutulur; "let go" ile son halatlar bırakılır. Reis, bırakılan halatın rıhtımdan temiz toplandığını, suya düşüp pervaneye dolanmadığını teyit eder ("all gone and clear"). Bu teyit köprüüstüne verilmeden makine kullanılmaz.`,
            `Halatlar toplandıktan sonra düzgün ranzaya istif edilir, fairlead temizlenir, winch boşa alınır. Reis, istasyonu "secured for sea" durumuna getirir ve köprüüstüne raporlar.`,
          ],
        },
        {
          subheading: "8.2 Soğuk hava ve buz koşulları",
          paragraphs: [
            `Kış ve kutup operasyonlarında halatlar/güverte buzlanır, sentetik halat sertleşir ve kayganlık artar. Reis, buz temizliği, ek tutuş (anti-slip) ve daha yavaş operasyon ile riski yönetir. Donmuş halat hem elle tutuşu hem winch kontrolünü zorlaştırır.`,
          ],
        },
      ],
    },
    {
      heading: "9. Tipik Vaka Dersleri",
      sections: [
        {
          subheading: "9.1 Snap-back ölümleri",
          paragraphs: [
            `Dünya genelinde mooring snap-back kaynaklı ölümler düzenli olarak MAIB ve diğer otoritelerce raporlanır. Ortak payda: ekibin gergin halat hattı üzerinde durması, yorgunluk, kötü aydınlatma ve aceleci operasyon. Ders: hiçbir liman programı, bir tayfanın güvenli konumlanmasından önemli değildir.`,
          ],
        },
        {
          subheading: "9.2 Monkey fist ve heaving line yaralanmaları",
          paragraphs: [
            `İçine metal/somun konulmuş atış halatı uçları, rıhtımdaki personelin kafasına isabet ederek ölümcül yaralanmalar yaratmıştır. IMO ve şirket prosedürleri içine sadece halat/kum konmasını, ağırlığın sınırlı olmasını şart koşar. Reis, atış halatlarını periyodik denetler.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Pratik kontrol",
              text: `Her bağlama öncesi heaving line uçlarını kontrol et: monkey fist içinde metal yok, ağırlık makul, halat çürümemiş. Bu 10 saniyelik kontrol, rıhtımdaki bir hayatı kurtarabilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "10. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "10.1 Reis'in mooring checklist'i",
          bullets: [
            `Stations ready: halatlar fairlead'de, winch test, telsiz çalışıyor mu?`,
            `Heaving line uçları güvenli (metalsiz, max ~0.5 kg) mı?`,
            `Ekip PPE'li, snap-back/halat hattı dışında, kaçış yolu belli mi?`,
            `Winch fren ayarı (render setting) doğru, drum turn'ları düzgün mü?`,
            `Köprüüstü komutları read-back ile teyit ediliyor mu?`,
            `Tug line / demir kullanımı koordine, ekip uzak mı?`,
            `Let go'da halat "all gone and clear of propeller" teyitli mi?`,
            `Halatlar gerginlikte mi (su atma, ses) — köprüüstü uyarıldı mı?`,
            `Operasyon sonu istasyon "secured for sea" durumunda mı?`,
          ],
          paragraphs: [
            `Bağlama ve manevra, denizciliğin en eski ama hâlâ en ölümcül operasyonlarından biridir. Reis'in disiplinli istasyon liderliği — net komut, doğru teknik, snap-back bilinci ve sarsılmaz "önce güvenlik" tavrı — ekibi sağ ve gemiyi güvenli tutar. Bu istasyonda en küçük gevşeklik, en büyük bedelle ödenir.`,
          ],
        },
      ],
    },
  ],
};

export default content;
