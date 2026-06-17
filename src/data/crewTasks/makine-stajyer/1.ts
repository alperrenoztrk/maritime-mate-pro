import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Bakım çalışmalarına gözlem ve destek",
  roleSlug: "makine-stajyer",
  taskIndex: 1,
  estimatedPages: 25,
  intro: `Makine stajyeri, pompa overhaul, valf bakımı, filtre değişimi, gasket kesimi, heat exchanger temizliği ve cıvata torklama gibi bakım çalışmalarına yardımcı (assistant) olarak katılır. Bu katılımın amacı; ekipman parçalarının isimlerini ve işlevlerini öğrenmek, doğru takım kullanımı ve el becerisi kazanmak, teknik dile aşina olmak ve bakım çalışmalarının emniyetli yürütülmesini deneyimlemektir. Stajyer bakımı bağımsız yürütmez; sorumlu mühendis veya tecrübeli oiler/fitter gözetiminde, iş emri ve permit kapsamında çalışır. Bu bölüm, stajyerin bakım desteğinde izlemesi gereken yöntemleri, emniyet adımlarını ve öğrenme stratejisini detaylandırır.`,
  sources: [
    "STCW Code Table A-III/1 — Maintenance and repair competence",
    "ISM Code — Planned Maintenance & safe working procedures",
    "Class PMS (Planned Maintenance System) requirements — IACS",
    "Manufacturer Maintenance Manuals (OEM) — pump/valve/cooler",
    "IMO Model Course 7.04 — Engineering watch & maintenance",
    "Reeds Engineering Knowledge for Marine Engineers",
    "Code of Safe Working Practices for Merchant Seafarers (COSWP)",
    "ISO 2768 / OEM tolerance & torque standards",
  ],
  chapters: [
    {
      heading: "1. Bakım Çalışmasına Hazırlık",
      lead: `Her bakım, fiziksel müdahaleden önce planlama, izolasyon ve takım hazırlığıyla başlar. Stajyer bu "iş öncesi" disiplini öğrenmelidir.`,
      sections: [
        {
          subheading: "1.1 İş emri (Work Order) ve risk değerlendirmesi",
          paragraphs: [
            `Her planlı bakım, PMS yazılımında açılan bir iş emriyle başlar. İş emri; yapılacak işi, gereken yedek parçaları, takımları, tahmini süreyi ve OEM prosedür referansını içerir. Stajyer iş emrini okuyarak işin kapsamını, kritik adımlarını ve emniyet gereksinimlerini önceden kavrar.`,
            `Bakım öncesi risk değerlendirmesi (risk assessment) ve toolbox talk yapılır: işin tehlikeleri, izolasyon ihtiyacı, gereken PPE ve acil durum tedbiri konuşulur. Stajyer toolbox talk'a katılır, sorularını sorar ve görev paylaşımını anlar. "İşe başlamadan düşün" prensibi, bakım kazalarının çoğunu önler.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "İlgili bölüm: PMS öğrenimi",
              text: `İş emri açma/kapatma, spare parts kodu ve stok mantığı için "Teknik çizim ve PMS öğrenimi" bölümüne bakınız. Stajyer bakım desteğiyle PMS'i pratik olarak öğrenir.`,
            },
          ],
        },
        {
          subheading: "1.2 Takım ve yedek parça hazırlığı",
          paragraphs: [
            `Bakıma başlamadan önce gereken tüm takımlar, yedek parçalar, conta/o-ring setleri, temizlik malzemeleri ve sızdırmazlık elemanları hazırlanır. Stajyer doğru takımı tanımayı öğrenir: tork anahtarı, çekiç, çektirme (puller), feeler gauge, mikrometre, dial gauge, alyan/lokma takımları. Yanlış takım kullanımı hem işe hem operatöre zarar verir.`,
            `Yedek parçaların OEM orijinali veya onaylı muadili olması önemlidir; yanlış parça erken arızaya yol açar. Stajyer, sökülen parçaların düzenli yerleştirilmesini (montaj sırasına göre etiketleme) öğrenir; bu, geri montajda hata ve eksik parça riskini ortadan kaldırır.`,
          ],
          table: {
            caption: `Bakımda Sık Kullanılan Ölçü Aletleri ve Amaçları`,
            headers: ["Alet", "Ölçtüğü", "Tipik kullanım"],
            rows: [
              ["Tork anahtarı", "Sıkma momenti (Nm)", "Cıvata/somun torklama"],
              ["Feeler gauge", "Boşluk (clearance)", "Valf supabı, bearing boşluğu"],
              ["Dış mikrometre", "Dış çap", "Mil/journal aşınması"],
              ["İç mikrometre", "İç çap", "Yatak/burç aşınması"],
              ["Dial gauge", "Eksenel/radyal sapma", "Şaft alignment, run-out"],
              ["Bridge gauge", "Bearing aşınması", "Ana yatak boşluğu"],
            ],
          },
        },
      ],
    },
    {
      heading: "2. İzolasyon ve Emniyetli Çalışma Ortamı",
      sections: [
        {
          subheading: "2.1 LOTO ve permit kapsamında çalışma",
          paragraphs: [
            `Hiçbir bakım, ekipman enerji altındayken başlamaz. Lockout-Tagout (LOTO) ile elektrik, basınç, sıcaklık ve hareket enerjisi izole edilir; izole edilen vana/breaker etiketlenir ve kilitlenir. Stajyer, üzerinde çalışacağı ekipmanın gerçekten izole edildiğini (zero energy state) doğrulamayı öğrenir.`,
            `Sıcak iş veya kapalı alan gerektiren bakımlarda ilgili permit (Permit to Work) alınır. Stajyer, "izinsiz iş yapılmaz" prensibini içselleştirir. Bir ekipmanı sökmeden önce sistem basıncının boşaltıldığından, sıcaklığın düştüğünden ve dönen parçaların durduğundan emin olunur.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Saklı (stored) enerji öldürür",
              text: `Bir pompa elektriği kesilse bile basınçlı hat, sıcak akışkan, yaylı mekanizma veya kalan dönme momenti zarar verebilir. Stajyer sökmeden önce drain/vent valflerinin açıldığını ve sistemin basınçsız olduğunu daima doğrular.`,
            },
          ],
        },
        {
          subheading: "2.2 Çalışma alanının düzenlenmesi",
          paragraphs: [
            `Bakım alanı temiz, aydınlık ve düzenli olmalıdır. Sökülen parçalar tepsi/bez üzerine sıralı yerleştirilir, yağlı atıklar uygun kaba toplanır, geçiş yolları kapatılmaz. Düzensiz çalışma alanı hem kayma/düşme kazası hem de parça kaybı/yanlış montaj riski yaratır.`,
            `Stajyer "5S" benzeri bir düzen disiplinini öğrenir: kullandığını yerine koy, atığı ayır, alanı temiz bırak. İyi bir bakım çalışması, bittiğinde alanın çalışma öncesinden daha temiz olmasıyla anlaşılır.`,
          ],
        },
      ],
    },
    {
      heading: "3. Pompa Overhaul (Bakım Onarımı)",
      lead: `Pompalar makine dairesinin dolaşım sistemidir. Pompa bakımı, stajyerin sökme-ölçme-montaj döngüsünü öğrendiği temel bir uygulamadır.`,
      sections: [
        {
          subheading: "3.1 Santrifüj pompa sökme ve inceleme",
          paragraphs: [
            `Santrifüj pompa overhaul'unda; coupling sökülür, casing açılır, impeller, wear ring, mekanik salmastra (mechanical seal) ve bearing kontrol edilir. Stajyer her parçanın işlevini öğrenir: impeller akışı oluşturur, wear ring iç sızıntıyı sınırlar, mechanical seal şaft çevresinden kaçağı önler.`,
            `Aşınma ölçümleri yapılır: impeller-wear ring boşluğu, şaft run-out, bearing boşluğu. Ölçümler OEM tolerans değerleriyle karşılaştırılır; sınır dışı parçalar yenilenir. Stajyer "neden ölçüyoruz" sorusunu kavrar: gözle iyi görünen bir parça tolerans dışı olabilir ve performans/verim kaybına neden olur.`,
          ],
        },
        {
          subheading: "3.2 Mekanik salmastra ve montaj hassasiyeti",
          paragraphs: [
            `Mechanical seal montajı pompanın en hassas işlemidir: seal yüzeyleri (faces) elle dokunulmaz, çizilmez, kuru çalıştırılmaz. Yanlış montaj erken seal arızası ve kaçakla sonuçlanır. Stajyer, temiz montaj, doğru yönlendirme ve uygun yağlamanın önemini öğrenir.`,
            `Montaj sonrası coupling alignment (laser veya dial gauge ile) yapılır; yanlış hizalama titreşim, bearing aşınması ve seal arızasına yol açar. Stajyer alignment'ın "hizalı görünmek" değil ölçülen değer olduğunu öğrenir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Sökerken montajı düşün",
              text: `Stajyer söküm sırasında parçaların yönünü ve sırasını fotoğraflamayı/etiketlemeyi öğrenmeli. "Nasıl söktüysek tersine montaj ederiz" prensibi, geri montajda kafa karışıklığını ve hatayı önler.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Valf Bakımı ve Gasket Kesimi",
      sections: [
        {
          subheading: "4.1 Valf çeşitleri ve bakım mantığı",
          paragraphs: [
            `Gate, globe, butterfly, check (non-return) ve ball valfler farklı işlevlere sahiptir: gate tam açık/kapalı izolasyon, globe akış ayarı, check tek yön akış, butterfly hızlı izolasyon. Stajyer hangi valfin nerede kullanıldığını ve bakımının neden farklı olduğunu öğrenir.`,
            `Valf bakımında disc/seat lapping (alıştırma), spindle/gland packing yenileme ve sızdırmazlık testi yapılır. Lapping pasta ile yapılan bir alıştırma işlemidir; disc ve seat arasındaki temas yüzeyini düzeltir. Stajyer bu el işçiliğini gözlem ve destekle öğrenir.`,
          ],
        },
        {
          subheading: "4.2 Gasket kesimi ve sızdırmazlık",
          paragraphs: [
            `Gasket (conta), flanşlar arasındaki sızdırmazlığı sağlar. Doğru malzeme (akışkan ve sıcaklığa uygun), doğru kalınlık ve doğru kesim kritiktir. Stajyer gasket sheet'ten flanş şablonuna göre conta kesmeyi, cıvata deliklerini doğru konumlandırmayı ve iç çapı akışı engellemeyecek şekilde kesmeyi öğrenir.`,
            `Flanş montajında cıvatalar çapraz (star pattern) ve kademeli torkla sıkılır; eşit olmayan sıkma conta ezilmesine ve kaçağa yol açar. Stajyer doğru tork değeri ve sıkma sırasının neden önemli olduğunu öğrenir.`,
          ],
          table: {
            caption: `Yaygın Gasket Malzemeleri ve Uygulama Alanları`,
            headers: ["Malzeme", "Sıcaklık dayanımı", "Tipik kullanım"],
            rows: [
              ["Non-asbestos fibre", "Orta (~250°C)", "Su, yağ, genel amaçlı"],
              ["Spiral wound (metal+filler)", "Yüksek", "Buhar, yüksek basınç flanş"],
              ["PTFE", "Kimyasal dirençli", "Korozif akışkan hatları"],
              ["Graphite", "Çok yüksek", "Egzoz, buhar, sıcak hatlar"],
              ["Rubber/elastomer", "Düşük", "Soğuk su, düşük basınç"],
            ],
          },
        },
      ],
    },
    {
      heading: "5. Filtre ve Separator Bakımı",
      sections: [
        {
          subheading: "5.1 Filtre değişimi ve diferansiyel basınç",
          paragraphs: [
            `LO, FO ve hava filtreleri düzenli temizlenir/değiştirilir. Tıkanan bir filtre diferansiyel basınç artışıyla kendini belli eder; bu fark belirli sınırı geçtiğinde alarm verir veya by-pass devreye girer. Stajyer, filtre değişiminin neden zamanında yapılması gerektiğini (yetersiz besleme, ekipman zararı) öğrenir.`,
            `Duplex (çift) filtrelerde bir taraf çalışırken diğeri bakıma alınabilir; switching dikkatle yapılır ki besleme kesilmesin ve hava kilidi (air lock) oluşmasın. Stajyer switching sırasını ve venting (hava alma) gerekliliğini öğrenir.`,
          ],
        },
        {
          subheading: "5.2 Separator/purifier bakımına destek",
          paragraphs: [
            `Purifier (separator), yakıt ve yağdan su ve katı tortuyu santrifüj kuvvetiyle ayırır. Bowl açma, disc stack temizliği, gravity disc seçimi ve o-ring yenileme bakımının parçalarıdır. Stajyer disc'lerin sırasını ve montaj yönünü öğrenmenin kritik olduğunu (yanlış montaj ayırma verimini bozar) deneyimler.`,
            `Bowl ağır ve hassas bir parçadır; doğru kaldırma tekniği ve dengeli montaj önemlidir. Dengesiz bir bowl yüksek devirde tehlikeli titreşim yaratır. Stajyer purifier bakımında temizlik ve hassasiyetin verimle doğrudan ilişkisini görür.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka: Yanlış disc montajı",
              text: `Bir bakım sonrası purifier'ın su atışı bozulur ve service tank'a su geçer. İnceleme, disc stack'in yanlış sırayla monte edildiğini gösterir. Ders: hassas parçaların sırası ve yönü montajda titizlikle korunmalı; stajyer söküm sırasında sırayı kayıt altına almayı öğrenir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Cıvata, Tork ve Sıkma Disiplini",
      sections: [
        {
          subheading: "6.1 Doğru tork ve sıkma sırası",
          paragraphs: [
            `Cıvataların doğru torkla sıkılması, hem sızdırmazlık hem yapısal bütünlük için kritiktir. Yetersiz tork kaçak ve gevşemeye, aşırı tork ise cıvata kopması ve flanş deformasyonuna yol açar. Stajyer tork anahtarının doğru kullanımını ve OEM tork tablosunu okumayı öğrenir.`,
            `Büyük flanş ve ana yatak gibi kritik bağlantılarda kademeli ve çapraz sıkma şarttır; bazı durumlarda hydraulic tensioner veya angle-tightening (açı ile sıkma) yöntemi kullanılır. Stajyer bu yöntemlerin neden farklı olduğunu öğrenir.`,
          ],
        },
        {
          subheading: "6.2 Gevşemeyi önleme ve emniyet elemanları",
          paragraphs: [
            `Titreşimli ortamda cıvataların gevşememesi için split pin, locking wire, lock washer veya thread-locker kullanılır. Stajyer hangi uygulamada hangi emniyet elemanının kullanıldığını ve unutulan bir locking wire'ın ne tür arızaya yol açabileceğini öğrenir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Gevşeyen cıvata makine kaybettirir",
              text: `Krank kasası içinde gevşeyen tek bir cıvata, dönen parçalara takılarak katastrofik makine hasarına yol açabilir. Bu nedenle krank kasası içi her çalışmadan sonra "tool count" (takım sayımı) ve cıvata torklama kontrolü zorunludur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. Atık, Temizlik ve Çevre Bilinci",
      sections: [
        {
          subheading: "7.1 Yağlı atık ve sludge yönetimi",
          paragraphs: [
            `Bakım sırasında oluşan yağlı bez, kullanılmış filtre, eski yağ ve sludge MARPOL Annex I/V kapsamında ayrı toplanır ve uygun şekilde bertaraf edilir (yakma, incinerator veya limanda teslim). Stajyer atık ayırma (oily rags, contaminated waste, scrap metal) disiplinini öğrenir.`,
            `Yağlı atığın denize karışması veya yanlış ayrılması ciddi kirlilik ve cezadır. Stajyer, temizlik amacıyla kullanılan solvent/kimyasalların da MSDS'e göre kullanılması ve uygun atık yönetimi gerektiğini öğrenir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MARPOL Annex V — Garbage Management",
              text: `Makine dairesi atıkları (yağlı bez, filtre, contaminated waste) Garbage Record Book'a kaydedilerek uygun şekilde teslim edilir. Stajyer atık ayrımı ve kayıt mantığını bakım desteğiyle öğrenir.`,
            },
          ],
        },
        {
          subheading: "7.2 Solvent ve kimyasal kullanımı",
          paragraphs: [
            `Temizlik solventleri, pas sökücüler ve degreaser'lar parlayıcı ve toksik olabilir. Stajyer MSDS okumayı, uygun havalandırma sağlamayı, eldiven/maske kullanmayı ve kıvılcım kaynaklarından uzak tutmayı öğrenir. Yanlış solvent kullanımı hem sağlık hem yangın riskidir.`,
          ],
        },
      ],
    },
    {
      heading: "8. El Becerisi ve Teknik Dil Kazanımı",
      sections: [
        {
          subheading: "8.1 Parça isimleri ve teknik terminoloji",
          paragraphs: [
            `Bakım desteğinin önemli bir kazanımı, ekipman parçalarının doğru İngilizce/teknik adlarını öğrenmektir: impeller, gland, bushing, journal, liner, gasket, o-ring, sleeve, key/keyway, circlip. Stajyer, doğru terimi kullanmanın iletişim hatalarını önlediğini (yanlış parça istemek gibi) öğrenir.`,
            `Teknik dil hem yedek parça siparişinde hem OEM manual okumada hem de uluslararası ekiple çalışmada kritiktir. Stajyer her bakımda yeni terim öğrenir ve bunları TRB notlarına işler.`,
          ],
        },
        {
          subheading: "8.2 Ölçme ve hassasiyet kültürü",
          paragraphs: [
            `Stajyer, "yaklaşık" değil "ölçülen" değerlerle çalışmayı öğrenir. Mikrometre, feeler gauge ve dial gauge kullanımında doğru okuma, paralaks hatası, sıcaklık etkisi ve kalibrasyon bilinci kazanır. Hassas ölçüm, mühendisliğin temel dilidir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Soru sormak öğrenmenin parçasıdır",
              text: `Stajyer "bu parça ne işe yarar?", "neden bu sırayla söküyoruz?", "tolerans neden bu kadar dar?" sorularını çekinmeden sormalıdır. İyi mühendisler bu merakı destekler; susan stajyer değil soran stajyer hızlı gelişir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "9. Bakım Sonrası Test ve Dökümantasyon",
      sections: [
        {
          subheading: "9.1 Montaj sonrası test ve devreye alma",
          paragraphs: [
            `Bakım biten ekipman devreye alınmadan önce kontrol edilir: tüm cıvatalar torklu mu, takımlar toplandı mı (tool count), izolasyon kaldırıldı mı, valf hattı doğru mu. İlk çalıştırma (recommissioning) gözetimli yapılır; kaçak, titreşim, anormal ses ve sıcaklık izlenir.`,
            `Stajyer, "monte ettik bitti" değil "test ettik, doğruladık, kaydettik" disiplinini öğrenir. İlk çalıştırmada fark edilen küçük bir kaçak, ekipman tekrar sökülmeden düzeltilebilir; gözden kaçan bir hata sonra büyük arızaya dönüşür.`,
          ],
        },
        {
          subheading: "9.2 İş emrinin kapatılması ve TRB kaydı",
          paragraphs: [
            `Bakım tamamlanınca PMS'te iş emri kapatılır: yapılan işler, kullanılan yedek parçalar, ölçülen değerler ve gözlemler kaydedilir. Bu kayıt geminin bakım geçmişini oluşturur ve gelecekteki arıza analizine temel olur. Stajyer iş emri kapatma mantığını gözlemler.`,
            `Stajyer ayrıca katıldığı her bakımı TRB'deki "maintenance and repair" yetkinlik alanına işler ve eğitmen mühendise imzalatır. Böylece pratik beceri kazanımı resmi kayda dönüşür.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "STCW A-III/1 — Maintenance & repair",
              text: `Stajyer, pompa/valf/filtre bakımına destek vererek "use hand tools, machine tools and measuring instruments" ve "maintenance and repair of shipboard machinery" yetkinliklerini TRB'de biriktirir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "10. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "10.1 Stajyerin bakım kontrol listesi",
          bullets: [
            `İş emrini ve risk değerlendirmesini okudum, toolbox talk'a katıldım mı?`,
            `Ekipman LOTO/permit ile izole edildi, zero energy doğrulandı mı?`,
            `Doğru takımları hazırladım, sökülen parçaları etiketledim mi?`,
            `Söküm sırasını/yönünü kayıt altına aldım mı?`,
            `Ölçümleri OEM toleransıyla karşılaştırdım mı?`,
            `Gasket/o-ring doğru malzeme ve montaj, cıvatalar doğru tork ve sıra ile mi?`,
            `Tool count yaptım, takım/parça unutmadım mı?`,
            `Yağlı atığı uygun ayırdım, alanı temiz bıraktım mı?`,
            `Devreye alma testi gözetimli yapıldı, kaçak/titreşim var mı?`,
            `Bakımı TRB'ye işledim ve imzalattım mı?`,
          ],
          paragraphs: [
            `Makine stajyerinin bakım desteğindeki gerçek kazanımı, sadece bir pompayı söküp takmak değil; planlamayı, izolasyonu, ölçmeyi, hassasiyeti ve dökümantasyonu birlikte deneyimlemektir. El becerisi tekrar ile, teknik dil merakla, emniyet bilinci ise disiplinle kazanılır. Bugün gözetim altında öğrenilen titizlik, yarın bağımsız bakım yürütecek mühendisin imza disiplinidir.`,
          ],
        },
      ],
    },
  ],
};

export default content;
