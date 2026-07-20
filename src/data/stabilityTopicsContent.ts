// Comprehensive Stability Topics Content Data
// Each topic contains detailed explanations, formulas, examples, and practical applications

export interface StabilitySubTopic {
  id?: string;
  title: string;
  content: string;
  formulas?: { formula: string; description: string }[];
  examples?: { problem: string; solution: string }[];
  practicalTips?: string[];
  warnings?: string[];
  keyPoints?: string[];
}

export interface StabilityTopic {
  id: string;
  title: string;
  icon: string;
  iconColor: string;
  description: string;
  subtopics: StabilitySubTopic[];
}

export const stabilityTopicsData: StabilityTopic[] = [
  {
    id: "section-1",
    title: "Bölüm 1 – Gemi Stabilitesine Giriş",
    icon: "Anchor",
    iconColor: "from-blue-500 to-indigo-600",
    description: "Gemi stabilitesinin temel kavramları ve önemi",
    subtopics: [
      {
        title: "1.1. Stabilite Kavramı ve Tanımı",
        content: `Gemi stabilitesi, denizcilik mühendisliğinin en kritik konularından biridir ve bir geminin denizde güvenli bir şekilde seyir yapabilmesi için olmazsa olmaz bir özelliktir.

**Stabilite Nedir?**
Gemi stabilitesi, bir geminin dış etkilerle (rüzgâr, dalga, yük kayması, manevra, çarpışma, ani dönüş vb.) yatma veya eğilme hareketine maruz kaldıktan sonra tekrar ilk denge konumuna dönebilme kabiliyetini ifade eder.

Bir başka ifade ile stabilite, geminin dengesinin bozulmasına neden olan etkiler ortadan kalktığında, geminin eski denge durumuna dönme eğiliminin (yatmaya karşı gösterdiği direncin) ölçüsüdür. Bu yetenek, geminin geometrik özellikleri, yük dağılımı ve hidrostatik özellikleri ile doğrudan ilişkilidir.

**Stabilitenin Fiziksel Temeli**
Stabilitenin fiziksel temeli, Arşimet prensibine ve kuvvet dengesi ilkelerine dayanır. Bir gemi suya konulduğunda:
- Geminin toplam ağırlığı (W) aşağı yönde etki eder
- Yer değiştirilen suyun kaldırma kuvveti (Y) yukarı yönde etki eder
- Denge durumunda bu iki kuvvet eşit ve zıt yönlüdür

**Stabilitenin Önemi**
Stabilite iki temel yönüyle önemlidir:

1. **Emniyet Yönü:** Geminin devrilmeden seferini tamamlaması, mürettebat ve yolcuların güvenliği için hayati önem taşır. Yetersiz stabilite, geminin batmasına ve can kaybına yol açabilir.

2. **Konfor ve İşletme Yönü:** Personel ve yük üzerinde oluşan ivmelerin kabul edilebilir seviyede tutulması gerekir. Aşırı sert bir gemi (çok fazla stabilite), mürettebat için rahatsızlık yaratır ve yüklere zarar verebilir.`,
        keyPoints: [
          "Stabilite, geminin dış etkilere karşı denge konumuna dönme kabiliyetidir",
          "Arşimet prensibi stabilite hesaplarının temelini oluşturur",
          "Hem emniyet hem de konfor açısından kritik öneme sahiptir",
          "Yük dağılımı ve tank yönetimi stabiliteyi doğrudan etkiler"
        ],
        warnings: [
          "Yetersiz stabilite, geminin devrilmesine ve batmasına neden olabilir",
          "Aşırı stabilite de tehlikelidir - sert salınımlar yapısal hasara yol açabilir"
        ]
      },
      {
        title: "1.2. Stabilitenin Türleri",
        content: `Gemi stabilitesi, hareketin yönüne göre üç ana başlıkta incelenir. Her bir stabilite türü farklı fiziksel olaylara ve hesaplamalara dayanır.

**1. Enine (Transvers) Stabilite**
Geminin iskele ve sancak yönünde yatmasına karşı koyma yeteneğidir. Bu, stabilitenin en kritik bileşenidir çünkü:
- Gemiler genellikle enine yönde daha fazla salınım yapar
- Devrilme riski çoğunlukla enine yönde gerçekleşir
- IMO kriterleri öncelikle enine stabiliteyi değerlendirir

Klasik GM (metasantrik yükseklik), GZ eğrileri ve stabilite kriterleri genellikle enine stabiliteyi ifade eder.

**Enine Stabilite Hesaplarında Kullanılan Parametreler:**
- GM (Metasantrik Yükseklik)
- GZ (Sağlama Kolu)
- KG (Ağırlık Merkezi Yüksekliği)
- BM (Metasantrik Yarıçap)

**2. Boyuna (Longitudinal) Stabilite**
Geminin baş ve kıç tarafında meydana gelen trim değişimlerine karşı koyma yeteneğidir. Trim, boyuna ağırlık dağılımındaki değişim sonucu ortaya çıkar.

Boyuna stabilite:
- Trim hesaplamalarında kullanılır
- Yükleme planlamasında kritik öneme sahiptir
- MCT (Moment to Change Trim) kavramı ile ifade edilir
- Geminin su hattı altındaki şekli ile ilişkilidir

**Boyuna Stabilite Parametreleri:**
- GML (Boyuna Metasantrik Yükseklik)
- MCT1cm (1 cm Trim Değiştiren Moment)
- LCF (Boyuna Yüzme Merkezi)
- LCB (Boyuna Kaldırma Merkezi)

**3. Dik (Yönsel/Rota) Stabilite**
Geminin pruvasının belirli bir rotayı koruma eğilimi ile ilgilidir. Bu kısım, daha çok manevra teorisi ile ilişkilidir ve:
- Dümen etkinliği ile doğrudan ilgilidir
- Geminin rotadan sapma eğilimini belirler
- Yaw (sapma) hareketleri ile değerlendirilir`,
        keyPoints: [
          "Enine stabilite: İskele-sancak yönünde, en kritik stabilite türü",
          "Boyuna stabilite: Baş-kıç yönünde, trim hesaplarında önemli",
          "Dik stabilite: Rota koruma kabiliyeti, manevra teorisi ile ilgili"
        ],
        practicalTips: [
          "Yükleme planlaması yaparken öncelikle enine stabiliteyi kontrol edin",
          "Trim değişiklikleri boyuna stabiliteyi etkiler - MCT değerlerini kullanın",
          "Manevra sırasında dik stabilitenin etkilerini göz önünde bulundurun"
        ]
      },
      {
        title: "1.3. Stabilitenin Gemi Tasarımı ve İşletmesindeki Önemi",
        content: `Gemi stabilitesi, tasarım aşamasından işletme sürecine kadar her aşamada kritik öneme sahiptir.

**Tasarım Aşamasında Stabilite**
Geminin tasarım aşamasında stabilite özellikleri belirlenir:

1. **Gövde Formu:** Geminin genişliği (B), derinliği (D) ve su çekimi (T) oranları stabilitenin temel belirleyicileridir. Geniş gövdeli gemiler genellikle daha iyi stabiliteye sahiptir.

2. **Üst Yapı Düzeni:** Üst yapıların yüksekliği ve konumu, geminin ağırlık merkezi yüksekliğini (KG) doğrudan etkiler.

3. **İç Düzenleme:** Tank yerleşimi, makine dairesi konumu ve ambar düzenlemesi stabiliteyi etkiler.

4. **Form Katsayıları:** Block katsayısı (Cb), su hattı alan katsayısı (Cw) gibi parametreler stabilitenin hesaplanmasında kullanılır.

**İnşa Sonrası ve İşletme Döneminde**
Gemi hizmete girdikten sonra stabilite, birçok faktör tarafından sürekli olarak etkilenir:

1. **Yükleme Planı:** Yükün gemiye nasıl yerleştirildiği, KG ve GM değerlerini doğrudan değiştirir.

2. **Yakıt ve Su Dağılımı:** Seyir boyunca tüketilen yakıt ve su, geminin ağırlık merkezini değiştirir.

3. **Balast Kullanımı:** Balast tankları, stabiliteyi optimize etmek için aktif olarak kullanılır.

4. **Tank İşletme Şekilleri:** Kısmen dolu tanklar serbest yüzey etkisi yaratarak GM'i azaltır.

**Klas Kuralları ve Mevzuat**
Uluslararası kuruluşlar gemilerin minimum stabilite gereksinimlerini belirler:

- **IMO (Uluslararası Denizcilik Örgütü):** IS Code, SOLAS, MARPOL
- **Klas Kuruluşları:** Lloyd's, DNV, ABS, BV vb.
- **Bayrak Devletleri:** Ulusal mevzuat gereksinimleri

Bu kurallar, gemilerin belirli stabilite kriterlerini sağlamasını zorunlu kılar ve düzenli denetimlerle kontrol edilir.`,
        keyPoints: [
          "Tasarım aşamasında gövde formu ve üst yapı stabiliteyi belirler",
          "İşletme döneminde yükleme ve tank yönetimi kritiktir",
          "IMO ve klas kuruluşları minimum stabilite standartlarını belirler",
          "Düzenli stabilite denetimleri yasal zorunluluktur"
        ],
        practicalTips: [
          "Her yükleme öncesi stabilite hesabı yapılmalıdır",
          "Seyir boyunca yakıt tüketimi ile değişen stabiliteyi izleyin",
          "Onaylı stabilite kitapçığındaki yükleme senaryolarına uyun",
          "Balast operasyonlarını stabilite göz önünde bulundurarak planlayın"
        ]
      },
      {
        title: "1.4. Tarihsel Perspektif ve Kazalar",
        content: `Gemi stabilitesi konusu, tarih boyunca yaşanan trajik kazalarla şekillenen bir mühendislik disiplinidir.

**Önemli Stabilite Kazaları**

**1. Vasa (1628):** İsveç savaş gemisi, ilk seferinde batmıştır. Nedenleri:
- Üst yapıların çok ağır olması
- Düşük GM değeri
- Açık top limanlarından su girişi
Bu kaza, stabilite hesaplamalarının önemini gösteren ilk büyük örneklerden biridir.

**2. SS Eastland (1915):** Chicago'da 844 kişinin hayatını kaybettiği bu kazada:
- Yolcu gemisi limanda devrilmiştir
- Can salları eklenirken KG yükselmiştir
- Balast tankları boşaltılarak durum kötüleşmiştir

**3. MV Derbyshire (1980):** 44 mürettebat ile kaybolan bulk carrier:
- Tayfun koşullarında batmıştır
- Ambar kapaklarının hasarı ve su girişi
- Bu kaza SOLAS düzenlemelerinin güncellenmesine yol açmıştır

**4. Costa Concordia (2012):** Modern dönemin en bilinen stabilite kazası:
- Karaya çarpma sonrası su girişi
- Hasarlı stabilite yetersizliği
- 32 kişi hayatını kaybetmiştir

**Derslerin Alınması**
Bu kazalar sonucunda:
- IMO stabilite kriterleri sürekli güncellenmektedir
- Hasarlı stabilite hesapları zorunlu hale gelmiştir
- Stabilite eğitimi denizcilik müfredatının temel parçası olmuştur
- Yükleme bilgisayarları ve stabilite yazılımları geliştirilmiştir`,
        warnings: [
          "Stabilite kazaları genellikle birden fazla faktörün birleşmesiyle oluşur",
          "Küçük ihmal veya hatalar büyük felaketlere yol açabilir",
          "Her yükleme durumu için stabilite kontrolü hayati önem taşır"
        ],
        keyPoints: [
          "Tarihi kazalar stabilite mevzuatının gelişmesine katkıda bulunmuştur",
          "Vasa kazası erken dönem stabilite sorunlarının klasik örneğidir",
          "Modern düzenlemeler bu kazalardan çıkarılan derslerle şekillenmiştir"
        ]
      }
    ]
  },
  {
    id: "section-2",
    title: "Bölüm 2 – Temel Kavramlar ve Tanımlar",
    icon: "Scale",
    iconColor: "from-blue-500 to-indigo-600",
    description: "Stabilite hesaplarında kullanılan temel kavramlar",
    subtopics: [
      {
        title: "2.0. Kaldırma Kuvveti (Buoyancy Force)",
        content: `![Kaldırma kuvveti ve Arşimet prensibi şeması](/diagrams/kaldirma-merkezi.svg)

Kaldırma kuvveti, bir geminin su üzerinde kalabilmesini sağlayan temel fiziksel etkidir ve doğrudan sıvı mekaniğinin en temel prensiplerinden birine dayanır. Bir gemi suya girdiğinde, kendi hacmi kadar suyu yer değiştirir. Bu yer değiştiren suyun ağırlığı, gemiye yukarı yönde etki eden bir kuvvet oluşturur. Bu kuvvet, geminin ağırlığını dengelediği sürece gemi yüzme durumunu korur.

Kaldırma kuvvetinin büyüklüğü, geminin şekline ya da malzemesine değil, yalnızca yer değiştirdiği su hacmine ve suyun yoğunluğuna bağlıdır. Bu ilişki **Arşimet prensibi** ile ifade edilir ve gemi stabilitesinin matematiksel temelini oluşturur. İlke şu şekilde tanımlanır:

────────────
Kaldırma Kuvveti = Yer Değiştirilen Su Ağırlığı
────────────

Başka bir ifadeyle:

────────────
Fᵦ = ρ · g · ∇
────────────

Burada
*Fᵦ* : Kaldırma kuvveti
*ρ* : Suyun yoğunluğu
*g* : Yerçekimi ivmesi
*∇* : Geminin su altında kalan hacmi (deplasman hacmi)

Bu bağıntı, gemi yüzdüğü sürece kaldırma kuvvetinin gemi ağırlığına eşit olduğunu açıkça gösterir. Gemiye yük eklendiğinde ağırlık artar; buna karşılık gemi daha fazla batar, yer değiştiren su hacmi büyür ve kaldırma kuvveti yeni ağırlık değerine ulaşana kadar artar. Yüzerlik, bu sürekli denge arayışının sonucudur.

Kaldırma kuvvetinin etkidiği nokta, **kaldırma merkezi** olarak adlandırılır. Bu nokta, su altında kalan hacmin geometrik merkezidir ve kaldırma kuvveti her zaman bu noktadan, düşey doğrultuda yukarı doğru etki eder. Geminin yatma veya trim yapma durumunda, su altı hacminin şekli değiştiğinden kaldırma merkezinin yeri de değişir. Bu hareket, gemi stabilitesinin temel mekanizmasını oluşturur.

Kaldırma kuvveti tek başına geminin stabil olup olmadığını belirlemez; ancak stabilite için vazgeçilmez bir ön koşuldur. Eğer kaldırma kuvveti gemi ağırlığından küçük olursa gemi batar, büyük olursa gemi yükselir. Dengede, bu iki kuvvet aynı doğrultu üzerinde ve eşit büyüklüktedir. Ancak doğrultuların konumsal ilişkisi —yani ağırlık merkezi ile kaldırma merkezinin göreli konumu— geminin denge karakterini belirler.

Kaldırma kuvveti, deniz suyunun yoğunluğuna bağlı olarak değişir. Tatlı suda yüzen bir gemi, aynı ağırlık altında daha fazla batar; çünkü tatlı suyun yoğunluğu deniz suyuna göre daha düşüktür. Bu nedenle gemi stabilite ve draft hesaplarında suyun yoğunluğu mutlaka dikkate alınır. Liman değişimleri, nehir ağızları ve kanal geçişleri bu açıdan operasyonel önem taşır.

Sonuç olarak kaldırma kuvveti, gemi stabilitesinin “taşıyıcı” unsurudur. Ağırlık kuvveti gemiyi aşağı çekerken, kaldırma kuvveti onu su üzerinde tutar. Bu iki kuvvetin büyüklükleri eşit, fakat etki noktaları farklı olduğunda stabilite doğar. Bir sonraki aşamada ele alınacak olan kaldırma merkezinin hareketi ve bunun doğrultma momentlerine etkisi, bu temel kuvvetin stabiliteye nasıl dönüştüğünü ayrıntılı biçimde açıklayacaktır.`
      },
      {
        title: "2.1. Ağırlık Merkezi (G)",
        content: `![Özgün ağırlık merkezi şeması](/diagrams/agirlik-merkezi.svg)

Ağırlık merkezi, gemiyi oluşturan tüm ağırlıkların tek bir noktada toplanmış kabul edildiği ve ağırlık kuvvetinin etki doğrultusunun geçtiği noktadır. Bu nokta, geminin stabilite karakterini belirleyen en kritik unsurlardan biridir ve gemi üzerinde yapılan her yükleme, boşaltma, balast alma ya da balast verme işlemi ağırlık merkezinin yerini değiştirir. Ağırlık merkezi sabit bir geometrik nokta değildir; geminin o andaki yükleme durumuna bağlı olarak düşey, boyuna ve enine doğrultularda yer değiştirir.

Ağırlık merkezinin konumu üç eksen üzerinden tanımlanır. Düşey konum, omurgadan yukarıya doğru ölçülen mesafe ile ifade edilir ve genellikle KG ile gösterilir. Boyuna konum, genellikle orta kesit referans alınarak pruvaya ya da kıça olan mesafe olarak değerlendirilir. Enine konum ise gemi orta hattına göre iskele veya sancak yönündeki uzaklığı ifade eder. Stabilite hesaplamalarında özellikle düşey ağırlık merkezi belirleyici rol oynar; çünkü KG’nin yükselmesi ya da alçalması doğrultma kollarını doğrudan etkiler.

Ağırlık merkezinin hesaplanmasında temel prensip moment dengesine dayanır. Gemide bulunan her bir ağırlık, kendi büyüklüğü ile referans noktasına olan mesafesinin çarpımı kadar moment üretir. Tüm ağırlıkların momentleri toplanarak toplam ağırlığa bölündüğünde ağırlık merkezinin konumu bulunur. Bu ilişki matematiksel olarak şu şekilde ifade edilir:

────────────
KG = Toplam Düşey Moment / Toplam Ağırlık
────────────

Burada kullanılan momentler mutlak değerlerle hesaplanır; ağırlığın yukarıda ya da aşağıda olması yön bilgisi olarak değerlendirilir, sayısal işlem sırasında işaret kullanılmaz. Örnek olarak, toplam ağırlığı 10 000 ton olan bir gemide, düşey momentlerin toplamı 52 000 ton·metre olarak bulunmuşsa, düşey ağırlık merkezi 52 000 / 10 000 = 5,2 metre olarak hesaplanır. Bu değer, ağırlık merkezinin omurgadan itibaren 5,2 metre yukarıda bulunduğunu gösterir.

Yükleme sırasında ağırlık merkezinin yer değiştirmesi, eklenen veya çıkarılan ağırlıkların konumuna bağlıdır. Gemide yeni bir yük alındığında, bu yükün ağırlığı ile kendi düşey mesafesi çarpılarak yeni bir moment oluşturulur ve toplam momente eklenir. Aynı şekilde, gemiden çıkarılan bir ağırlık, mevcut momentten düşülür. Yeni toplam moment, yeni toplam ağırlığa bölünerek güncel ağırlık merkezi hesaplanır. Bu işlem sırası her zaman aynı mantıkla yürütülür ve hiçbir adım atlanmaz.

────────────
Yeni KG = (Eski Toplam Moment ± Eklenen veya Çıkarılan Moment) / Yeni Toplam Ağırlık
────────────

Örneğin, KG’si 5,2 metre olan ve toplam ağırlığı 10 000 ton olan bir gemiye, omurgadan 9 metre yükseklikte bulunan bir noktaya 500 ton yük eklendiğinde, eklenen moment 500 × 9 = 4 500 ton·metre olur. Eski toplam moment 52 000 ton·metre olduğuna göre yeni toplam moment 56 500 ton·metreye yükselir. Yeni toplam ağırlık 10 500 ton olarak alınır ve yeni KG 56 500 / 10 500 ≈ 5,38 metre olarak bulunur. Bu sonuç, yüklemenin ağırlık merkezini yukarı taşıdığını ve geminin stabilitesini olumsuz yönde etkilediğini açıkça gösterir.

Ağırlık merkezinin düşey konumu arttıkça, doğrultma kolları küçülür ve geminin yatmaya karşı direnci azalır. Buna karşılık ağırlık merkezinin aşağı çekilmesi, doğrultma kollarını büyütür ve geminin daha stabil davranmasını sağlar. Bu nedenle balast tanklarının alt seviyelerde yer alması, ağır yüklerin mümkün olduğunca aşağıda istiflenmesi ve serbest yüzey etkisinin kontrol altında tutulması stabilite açısından hayati öneme sahiptir. Ağırlık merkezi kavramı, metasentrik ilişkilerden doğrultma momenti hesaplarına kadar tüm stabilite analizlerinin temelini oluşturur ve her hesaplamada ilk dikkate alınan parametre olarak ele alınır.`
      },
      {
        title: "2.2. Kaldırma Merkezi (B)",
        content: `![Özgün kaldırma merkezi şeması](/diagrams/kaldirma-merkezi.svg)

![Yatma ile kaldırma merkezinin yer değiştirmesi ve doğan moment kolu](/diagrams/dogrultma-kolu.svg)

Kaldırma merkezi, kaldırma kuvvetinin gemi üzerinde etkidiği noktayı tanımlar ve gemi stabilitesinin geometrik temel taşlarından biridir. Fiziksel olarak kaldırma merkezi, geminin su altında kalan hacminin ağırlık merkezidir. Bu nokta, yer değiştiren su hacminin geometrik dağılımına bağlıdır ve geminin ağırlık merkezinden tamamen bağımsızdır.

Dengede bulunan bir gemide kaldırma kuvveti, kaldırma merkezinden düşey doğrultuda yukarı doğru etki eder. Aynı anda gemi ağırlığı, ağırlık merkezinden aşağı doğru etki eder. Bu iki kuvvetin büyüklükleri eşit olsa da, doğrultuları ve etki noktaları arasındaki göreli konum geminin denge karakterini belirler. Bu nedenle kaldırma merkezi, stabilite analizlerinde yalnızca bir nokta değil, dinamik olarak yer değiştiren bir referans noktasıdır.

Gemi dik durumda iken, kaldırma merkezi genellikle gemi orta hattı üzerinde ve su altı hacminin yaklaşık ortasında yer alır. Ancak gemi yana yattığında veya trim yaptığında, su altı hacminin şekli değişir. Bir bordada su altı hacmi artarken diğer bordada azalır. Bu asimetrik hacim dağılımı sonucunda kaldırma merkezi, hacmin arttığı yöne doğru yer değiştirir.

Bu yer değiştirme, gemi stabilitesinin özünü oluşturur. Gemi yana yattığında kaldırma merkezinin yer değiştirmesi, ağırlık merkezi ile kaldırma merkezi arasında yatay bir mesafe doğmasına neden olur. Bu mesafe, doğrultma kolunun ve dolayısıyla doğrultma momentinin ortaya çıkmasını sağlar. Başka bir ifadeyle, kaldırma merkezi hareket etmese gemi kendi kendini doğrultamazdı.

Kaldırma merkezinin konumu doğrudan geminin su altı geometrisine bağlıdır. Dolgun formlu, geniş karinalı gemilerde kaldırma merkezi yatma açısıyla daha hızlı yer değiştirir. İnce formlu gemilerde ise bu hareket daha sınırlıdır. Bu fark, gemilerin başlangıç stabilitesi ve genel denizcilik karakterleri üzerinde belirleyici bir rol oynar.

Kaldırma merkezi, yükleme veya boşaltma işlemlerinden doğrudan etkilenmez; ancak bu işlemler geminin draftını ve trimini değiştirerek su altı hacmini dolaylı biçimde etkiler. Bu nedenle kaldırma merkezinin mutlak konumu değil, yatma açısına bağlı olarak izlediği yol stabilite açısından önemlidir.

Teorik olarak kaldırma merkezinin konumu, geminin su altında kalan hacminin birinci momentleri kullanılarak belirlenir. Ancak pratik stabilite hesaplarında kaldırma merkezi genellikle doğrudan hesaplanmaz; onun hareketinin sonucu olan metasentrik davranış ve doğrultma kolları esas alınır. Buna rağmen kaldırma merkezinin fiziksel anlamı kavranmadan stabilitenin doğru anlaşılması mümkün değildir.

Özetle kaldırma merkezi, geminin “yüzen” kısmının geometrik temsilidir. Ağırlık merkezi geminin ne taşıdığını gösterirken, kaldırma merkezi geminin su tarafından nasıl taşındığını ifade eder. Bu iki merkezin göreli hareketi, geminin dengeye dönme veya devrilme eğilimini belirler. Bir sonraki adımda ele alınacak yüzerlik şartı, bu iki merkezin kuvvet dengesi içindeki rolünü bütüncül olarak ortaya koyacaktır.`
      },
      {
        title: "2.3. Yüzerlik Şartı (Condition of Floatation)",
        content: `![Yüzerlik dengesi: ağırlık ve kaldırma kuvveti](/diagrams/kaldirma-merkezi.svg)

Yüzerlik şartı, bir geminin su üzerinde dengede kalabilmesi için sağlanması gereken temel kuvvet dengesini ifade eder. Bu şart, gemi stabilitesinin en başlangıç noktasıdır ve diğer tüm stabilite kavramlarının önünde gelir. Bir gemi, ancak yüzerlik şartını sağladığı sürece denge, doğrultma ve emniyet analizlerine konu olabilir.

Yüzerlik şartının özü son derece nettir: Geminin ağırlığı ile gemiye etki eden kaldırma kuvveti büyüklük olarak eşit olmalıdır. Bu denge sağlanmadığı sürece gemi ya batar ya da sudan yükselir. Dolayısıyla yüzerlik, statik bir denge hâlidir ve kuvvetlerin doğrultusundan ziyade büyüklükleriyle ilgilidir.

Bu temel koşul şu şekilde ifade edilir:

────────────
Gemi Ağırlığı = Kaldırma Kuvveti
────────────

Matematiksel olarak:

────────────
W = ρ · g · ∇
────────────

Burada
*W* : Geminin toplam ağırlığı
*ρ* : Suyun yoğunluğu
*g* : Yerçekimi ivmesi
*∇* : Yer değiştiren su hacmi

Bu bağıntı, geminin ağırlığının doğrudan doğruya ne kadar su hacmini yer değiştirmesi gerektiğini belirlediğini gösterir. Gemiye yük alındığında ağırlık artar, gemi daha fazla batar ve ∇ büyür. Yük boşaltıldığında ise süreç tersine işler. Bu ilişki, draft değişimlerinin fiziksel temelini oluşturur.

Yüzerlik şartı yalnızca kuvvet büyüklüklerinin eşitliğiyle sınırlı değildir; aynı zamanda düşey doğrultuda bir kuvvet dengesi gerektirir. Gemi ağırlığı aşağı doğru, kaldırma kuvveti yukarı doğru etki eder. Bu iki kuvvet aynı düşey eksen üzerinde yer aldığında gemi düşey dengededir. Ancak bu durum, geminin yatmaya veya doğrultmaya karşı davranışı hakkında henüz bilgi vermez; bu konu stabilite başlığı altında ele alınır.

Yüzerlik şartı sağlandığında gemi belirli bir draft ve trim ile suya oturur. Bu oturma hâli, geminin yükleme durumu, ağırlık dağılımı ve suyun yoğunluğunu yansıtan bir sonuçtur. Aynı gemi, farklı yükleme koşullarında veya farklı yoğunluktaki sularda farklı draftlarla yüzer; ancak her durumda yüzerlik şartı geçerliliğini korur.

Yüzerlik, süreklilik arz eden dinamik bir dengedir. Deniz şartları, dalga hareketleri ve geçici yük değişimleri nedeniyle gemi anlık olarak bu dengeden sapabilir. Ancak gemi yapısı ve suyun tepkisi sayesinde sistem tekrar denge konumuna dönme eğilimi gösterir. Bu dönüş, yüzerliğin değil, stabilitenin bir sonucudur; fakat başlangıç noktası her zaman yüzerlik şartıdır.

Önemle vurgulanmalıdır ki yüzerlik şartını sağlayan her gemi stabil değildir. Bir gemi rahatlıkla yüzebilir ancak küçük bir dış etkiyle devrilebilir. Bu nedenle yüzerlik, emniyet için gerekli fakat tek başına yeterli olmayan bir koşuldur. Stabilite, bu temel denge üzerine inşa edilir.

Sonuç olarak yüzerlik şartı, geminin su üzerindeki varlığının matematiksel ve fiziksel ifadesidir. Ağırlık ve kaldırma kuvveti arasındaki bu zorunlu denge sağlanmadan, ağırlık merkezleri, doğrultma kolları veya metasentrik kavramlardan söz etmek mümkün değildir. Bir sonraki aşamada, bu denge durumunun farklı konfigürasyonlarda nasıl sonuçlar doğurduğu, denge hâlleri üzerinden ayrıntılı olarak ele alınacaktır.`
      },
      {
        title: "2.4. Denge Hâlleri (Equilibrium States)",
        content: `![Özgün denge halleri şeması](/diagrams/denge-halleri.svg)

Yüzerlik şartını sağlayan bir gemi, kuvvetler açısından dengededir; ancak bu denge, geminin küçük bir dış etki altındaki davranışını tek başına açıklamaz. Gemi stabilitesinin özü, geminin denge konumundan uzaklaştırıldığında nasıl bir tepki verdiğiyle ilgilidir. Bu tepki, **denge hâlleri** kavramı ile tanımlanır ve üç temel sınıfta incelenir: kararlı (stable), kararsız (unstable) ve nötr (neutral) denge.

Denge hâlleri, ağırlık merkezi ile kaldırma merkezinin göreli konumları ve bu konumların küçük yatma açıları altında oluşturduğu momentler üzerinden değerlendirilir. Buradaki ana soru şudur: Gemi küçük bir açıyla yatırıldığında, onu eski dik konumuna döndürmeye çalışan bir moment mi oluşur, yoksa yatmayı artıran bir moment mi ortaya çıkar?

**Kararlı denge**, geminin küçük bir yatma sonrası kendiliğinden tekrar dik konumuna dönme eğilimi gösterdiği durumdur. Bu hâlde gemi yatırıldığında kaldırma merkezi, ağırlık merkezine göre öyle bir konuma kayar ki doğrultma momenti oluşur. Bu moment, gemiyi başlangıç konumuna geri döndürür. Denizcilikte emniyetli kabul edilen denge hâli budur ve tüm ticari gemiler için hedeflenen durum kararlı dengedir.

Bu durum matematiksel olarak doğrultma kolunun pozitif olmasıyla ifade edilir:

────────────
GZ > 0
────────────

Burada *GZ*, ağırlık merkezi ile kaldırma kuvvetinin doğrultusu arasındaki yatay mesafeyi temsil eder. Pozitif bir GZ, geminin doğrultma kabiliyetine sahip olduğunu gösterir.

**Kararsız denge**, geminin küçük bir yatma sonrasında yatma açısının artarak devam ettiği durumdur. Bu hâlde ağırlık merkezi ile kaldırma merkezinin konumu, yatmayı büyüten bir moment üretir. Gemi denge konumundan uzaklaştırıldığında geri dönmek yerine daha da devrilme eğilimi gösterir. Bu tür bir denge durumu pratikte son derece tehlikelidir ve geminin alabora olmasına yol açabilir.

Kararsız dengede doğrultma kolu negatiftir:

────────────
GZ < 0
────────────

Bu ifade, oluşan momentin doğrultma değil, devirmeye yönelik olduğunu açıkça ortaya koyar.

**Nötr denge** ise geminin küçük bir yatma sonrası yeni konumunda kalma eğilimi gösterdiği özel bir durumdur. Bu hâlde ne doğrultma ne de devirmeye çalışan bir moment oluşur. Gemi hangi açıda bırakılırsa o açıda kalır. Teorik olarak mümkündür; ancak pratik gemi işletmeciliğinde istenmeyen ve nadir rastlanan bir durumdur.

Nötr dengede doğrultma kolu sıfırdır:

────────────
GZ = 0
────────────

Bu üç denge hâli, gemi stabilitesinin kavramsal çerçevesini oluşturur. Ancak gerçek gemilerde denge hâli, yalnızca tek bir açı için değil, bir açı aralığı boyunca değerlendirilir. Bu nedenle pratik stabilite analizlerinde GZ eğrileri kullanılır ve geminin belirli bir açı aralığında kararlı denge sergileyip sergilemediği incelenir.

Sonuç olarak denge hâlleri, yüzerlik şartı sağlandıktan sonra geminin emniyet karakterini belirleyen ilk kritik adımdır. Bir geminin yüzmesi onun güvenli olduğu anlamına gelmez; güvenlik, geminin kararlı denge göstermesiyle mümkündür. Bir sonraki aşamada, bu denge davranışının sayısal ve geometrik ölçüsü olan doğrultma kolları ve metasentrik kavramlar ele alınacaktır.`
      },
      {
        title: "2.5. Metasentrik Nokta ve Metasentrik Yükseklik",
        content: `![Özgün metasentrik şema](/diagrams/metasentrik.svg)

Metasentrik nokta, geminin küçük yatma açıları altındaki stabilite davranışını tanımlamak için kullanılan temel geometrik referans noktalarından biridir. Gemi dik konumdayken kaldırma kuvvetinin doğrultusu, kaldırma merkezinden geçen düşey bir doğru ile temsil edilir. Gemi çok küçük bir açıyla yana yattığında kaldırma merkezi yeni bir konuma kayar ve bu yeni noktadan geçen kaldırma kuvveti doğrultusu, başlangıçtaki doğrultu ile bir noktada kesişir. Bu kesişim noktası metasentrik nokta olarak adlandırılır ve genellikle M harfi ile gösterilir.

Metasentrik nokta, yalnızca küçük yatma açıları için geçerli olan bir kavramdır ve bu nedenle “ilk stabilite” ya da “küçük açılar stabilitesi” analizlerinde kullanılır. Yatma açısı büyüdükçe kaldırma merkezinin izlediği yol doğrusal olmaktan çıkar ve metasentrik yaklaşım geçerliliğini kaybeder. Bu nedenle metasentrik nokta, büyük açılar stabilitesini değil, geminin başlangıçtaki yatmaya karşı davranışını tanımlar.

Metasentrik yükseklik ise ağırlık merkezi ile metasentrik nokta arasındaki düşey mesafeyi ifade eder ve GM ile gösterilir. Bu mesafe, geminin küçük bir yatma açısında stabil mi, instabil mi davranacağını doğrudan belirler. Metasentrik yükseklik pozitif olduğunda metasentrik nokta ağırlık merkezinin üzerinde yer alır ve gemi stabil kabul edilir. Metasentrik yükseklik sıfır olduğunda ağırlık merkezi ile metasentrik nokta çakışır ve gemi indifferent denge hâlindedir. Metasentrik yükseklik negatif olduğunda ise metasentrik nokta ağırlık merkezinin altında kalır ve gemi instabil davranış gösterir.

Metasentrik yüksekliğin hesaplanmasında kullanılan temel ilişki, kaldırma merkezinin konumu ile ağırlık merkezinin konumunu birlikte ele alır. Bu ilişki şu şekilde ifade edilir:

────────────
GM = KM − KG
────────────

Burada KM, omurgadan metasentrik noktaya olan düşey mesafeyi; KG ise omurgadan ağırlık merkezine olan düşey mesafeyi temsil eder. KG değeri yükleme durumuna bağlı olarak değişirken, KM değeri geminin gövde formuna ve deplasmanına bağlıdır ve hidrostatik tablolar yardımıyla belirlenir.

KM değeri kendi içinde iki bileşenden oluşur:

────────────
KM = KB + BM
────────────

KB, kaldırma merkezinin omurgadan olan düşey mesafesini; BM ise metasentrik yarıçapı ifade eder. Metasentrik yarıçap, su hattı alanının ikinci momenti ile deplasman arasındaki ilişkiyle tanımlanır ve teorik olarak şu şekilde ifade edilir:

────────────
BM = I / ∇
────────────

Burada I, su hattı alanının gemi orta hattına göre ikinci momentini; ∇ ise geminin deplasman hacmini temsil eder. Bu ifade, gövde formunun stabilite üzerindeki etkisini açıkça ortaya koyar. Geniş su hattına sahip gemilerde I büyür ve buna bağlı olarak BM artar; bu da metasentrik yüksekliğin büyümesine katkı sağlar.

Metasentrik yüksekliğin büyüklüğü, geminin hareket karakterini de belirler. Çok büyük GM değerine sahip gemiler “sert” gemiler olarak adlandırılır; bu gemiler hızlı ve kısa periyotlu yalpa hareketleri yapar. Bu durum, yapısal yükleri artırabilir ve personel konforunu olumsuz etkileyebilir. Buna karşılık çok küçük GM değerine sahip gemiler “yumuşak” gemiler olarak tanımlanır; yalpa periyotları uzun olur ve gemi ağır, isteksiz hareketler sergiler. Aşırı küçük GM değerleri ise stabilite kaybı riskini beraberinde getirir.

Bu nedenle metasentrik yükseklik, ne mümkün olan en büyük ne de en küçük değerde tutulması gereken bir parametredir. Gemi tipi, kullanım amacı ve operasyonel şartlar göz önünde bulundurularak belirli bir emniyet aralığında tutulmalıdır. Metasentrik kavramı, doğrultma kollarının matematiksel ifadesine geçişte kritik bir köprü görevi görür ve stabilite eğrilerinin yorumlanmasında temel referans noktalarından biri olarak kullanılır.`
      },
      {
        title: "2.6. Dikey Mesafeler: KG, KB, BM, KM ve GM",
        content: `Stabilite hesaplamalarında kullanılan dikey mesafeler, geminin stabilite karakteristiğini tanımlayan temel parametrelerdir.

**Referans Noktası: Omurga (Keel)**
Tüm dikey mesafeler omurgadan (K) ölçülür. Bu, standart bir referans noktası sağlar ve farklı gemiler arasında karşılaştırma yapılmasına olanak tanır.

**Temel Dikey Mesafeler**

**1. KG (Keel to Gravity)**
- Omurga ile ağırlık merkezi G arasındaki dikey mesafe
- Yükleme durumuna göre değişir
- Moment hesabı ile belirlenir
- Stabilite için kritik parametre

**2. KB (Keel to Buoyancy)**
- Omurga ile yüzme merkezi B arasındaki dikey mesafe
- Geminin şekline ve draftına bağlıdır
- Hidrostatik tablolardan alınır
- Deplasman arttıkça genellikle artar

**3. BM (Buoyancy to Metacenter)**
- B ile metasanter M arasındaki dikey mesafe
- Metasantrik yarıçap olarak da bilinir
- BM = I / ∇ formülü ile hesaplanır
- Geminin genişliği arttıkça BM artar

**4. KM (Keel to Metacenter)**
- Omurga ile metasanter M arasındaki mesafe
- KM = KB + BM
- Hidrostatik tablolardan alınır
- Tasarım parametresi, yükleme ile değişmez (aynı draft için)

**5. GM (Gravity to Metacenter)**
- G ile M arasındaki dikey mesafe
- GM = KM - KG
- Stabilitenin birincil göstergesi
- Pozitif GM = Stabil gemi

**GM'in Önemi ve Yorumu**
GM değeri, geminin küçük açılarda ne kadar stabil olduğunu gösterir:
- **Büyük GM (> 1.5 m):** Sert gemi, hızlı salınım
- **Orta GM (0.5 - 1.5 m):** Normal davranış
- **Küçük GM (0.15 - 0.5 m):** Yumuşak gemi, yavaş salınım
- **Çok küçük GM (< 0.15 m):** Tehlikeli bölge
- **Negatif GM:** Gemi devrilir!`,
        formulas: [
          {
            formula: "KM = KB + BM",
            description: "Metasantrik yükseklik bileşenleri"
          },
          {
            formula: "GM = KM - KG",
            description: "Metasantrik yükseklik (stabilite ölçüsü)"
          },
          {
            formula: "GMeff = GM - (FSM / Δ)",
            description: "Efektif GM (serbest yüzey etkisi dahil)"
          }
        ],
        examples: [
          {
            problem: "Bir gemi için: KB = 4.2 m, BM = 5.8 m, KG = 7.5 m. GM'i hesaplayın.",
            solution: "KM = KB + BM = 4.2 + 5.8 = 10.0 m. GM = KM - KG = 10.0 - 7.5 = 2.5 m (iyi stabilite)"
          },
          {
            problem: "KM = 8.5 m olan gemide, minimum GM = 0.50 m için maksimum KG ne olabilir?",
            solution: "KGmax = KM - GMmin = 8.5 - 0.50 = 8.0 m"
          }
        ],
        keyPoints: [
          "Tüm dikey mesafeler omurgadan (K) referans alınır",
          "KM sabit (aynı draft için), KG yükleme ile değişir",
          "GM = KM - KG stabilite hesabının temelidir",
          "Pozitif GM zorunlu, minimum değerler IMO tarafından belirlenir"
        ],
        warnings: [
          "GM negatif olursa gemi devrilir!",
          "Çok düşük GM değerleri tehlikeli yükleme durumunu gösterir",
          "Serbest yüzey etkisi GM'i azaltır, hesaplarda dikkate alınmalıdır"
        ]
      },
      {
        title: "2.7. Doğrultma Kolu (GZ)",
        content: `![Özgün doğrultma kolu şeması](/diagrams/dogrultma-kolu.svg)

![Doğrultma kolu ve metasentrik ilişki (GZ = GM·sinθ)](/diagrams/metasentrik.svg)

Doğrultma kolu, geminin yatmış bir durumda tekrar dik konumuna dönme eğilimini nicel olarak ifade eden temel stabilite parametresidir. Gemi yana yattığında, ağırlık kuvvetinin etki doğrultusu ile kaldırma kuvvetinin etki doğrultusu arasında yatay bir mesafe oluşur. Bu yatay mesafe doğrultma kolu olarak adlandırılır ve GZ ile gösterilir. Doğrultma kolu, doğrultma momentinin geometrik temelini oluşturur ve geminin stabilite davranışının açısal değişimini doğrudan yansıtır.

Küçük yatma açıları için doğrultma kolu, metasentrik yaklaşım yardımıyla basit bir trigonometrik ilişkiyle ifade edilebilir. Bu bölgede metasentrik nokta sabit kabul edilir ve GZ değeri yatma açısının sinüsü ile orantılıdır. Matematiksel ifade şu şekildedir:

────────────
GZ = GM × sin θ
────────────

Burada GM, metasentrik yükseklik; θ ise geminin yatma açısıdır. Bu ifade yalnızca küçük açılar için geçerlidir ve genellikle yaklaşık 7–10 dereceye kadar kabul edilebilir sonuçlar verir. Bu aralığın ötesinde kaldırma merkezinin hareketi doğrusal olmaktan çıkar ve metasentrik yaklaşım geçerliliğini yitirir.

Yatma açısı büyüdükçe doğrultma kolunun hesabı tamamen geometrik hâle gelir. Bu durumda GZ, ağırlık merkezinden geçen düşey doğru ile kaldırma merkezinden geçen düşey doğrunun arasındaki yatay mesafe olarak tanımlanır. Bu mesafe, geminin su altı hacminin şekline, ağırlık merkezinin konumuna ve yatma açısına bağlı olarak değişir. Büyük açılar için GZ değeri analitik formüllerle değil, genellikle grafiksel yöntemlerle veya bilgisayar destekli stabilite yazılımlarıyla elde edilir.

Doğrultma kolunun yatma açısına karşı değişimi, GZ eğrisi ile gösterilir. Bu eğri, yatma açısı yatay eksende, GZ değeri ise düşey eksende olacak şekilde çizilir. Eğrinin şekli, geminin genel stabilite karakterini ortaya koyar. Eğrinin başlangıçtaki eğimi, küçük açılar stabilitesini; maksimum GZ değeri, geminin en güçlü doğrultma kapasitesini; eğrinin sıfırı tekrar kestiği açı ise geminin stabilitesini kaybettiği sınırı temsil eder.

Doğrultma momenti, doğrultma kolu ile deplasmanın çarpımı olarak tanımlanır:

────────────
Doğrultma Momenti = Deplasman × GZ
────────────

Bu ifade, GZ’nin neden stabilite analizlerinin merkezinde yer aldığını açıkça gösterir. Aynı GZ değerine sahip iki gemiden deplasmanı büyük olanın doğrultma momenti daha büyük olacaktır. Ancak pratikte stabilite değerlendirmeleri momentten ziyade GZ üzerinden yapılır; çünkü GZ, geminin geometrik ve yükleme durumunu doğrudan yansıtan normalize bir büyüklüktür.

GZ eğrisinin altında kalan alan, geminin enerji stabilitesi ile ilişkilidir. Bu alan, geminin belirli bir yatma açısına kadar doğrultulması için gereken işi temsil eder. Özellikle dalga etkisi, rüzgâr basıncı ve ani yük kaymaları gibi dinamik etkiler altında, yalnızca maksimum GZ değeri değil, eğrinin genel şekli ve alanı da emniyet açısından kritik öneme sahiptir.

Doğrultma kolu kavramı, küçük açılar stabilitesinden büyük açılar stabilitesine geçişte temel bir bağlayıcı unsur oluşturur. Metasentrik yükseklik yalnızca başlangıç davranışını tanımlarken, GZ eğrisi geminin tüm yatma aralığındaki stabilite kapasitesini ortaya koyar. Bu nedenle modern stabilite kriterleri, tek bir GM değerine değil, belirli açılar için GZ değerlerine ve eğri altı alanlara dayandırılır. Bu yaklaşım, geminin gerçek operasyon koşullarındaki davranışını daha doğru ve emniyetli biçimde değerlendirmeyi mümkün kılar.`
      }
    ]
  },
  {
    id: "section-3",
    title: "Bölüm 3 – Arşimet Prensibi ve Deplasman",
    icon: "Waves",
    iconColor: "from-blue-500 to-indigo-600",
    description: "Yüzme ve kaldırma kuvvetinin fiziksel temelleri",
    subtopics: [
      {
        title: "3.1. Arşimet Prensibi",
        content: `Arşimet prensibi, gemi stabilitesinin fiziksel temelini oluşturan en önemli doğa yasasıdır.

**Prensip Tanımı**
Bir sıvıya kısmen veya tamamen batırılmış bir cisme, yer değiştirdiği sıvının ağırlığına eşit, yukarı yönlü bir kaldırma kuvveti etkir.

**Matematiksel İfade**
Y = γ × ∇ = ρ × g × ∇

Burada:
- Y: Kaldırma kuvveti (Newton veya ton-kuvvet)
- γ: Sıvının birim hacim ağırlığı (kN/m³)
- ρ: Sıvının yoğunluğu (t/m³)
- g: Yerçekimi ivmesi (9.81 m/s²)
- ∇: Batmış hacim (m³)

**Denge Koşulu**
Yüzen bir cisim için denge durumunda:
- Kaldırma kuvveti = Ağırlık kuvveti
- Y = W = Δ

Bu eşitlik, geminin yüzme dengesinin temelidir.

**Deniz Suyu ve Tatlı Su**
Suyun yoğunluğu stabilite hesaplarında önemlidir:
- **Deniz suyu:** ρ = 1.025 t/m³
- **Tatlı su:** ρ = 1.000 t/m³
- **Brackish su:** 1.000 - 1.025 t/m³ arası

Aynı gemi, tatlı suda daha fazla su çeker (batmış hacim artar) çünkü kaldırma kuvveti için daha fazla hacme ihtiyaç vardır.

**Arşimet Prensibinin Stabilitedeki Rolü**
Kaldırma kuvveti:
- B noktasından yukarı doğru etkir
- Gemi yattığında B hareket ettiği için kuvvet doğrusu değişir
- Bu değişim, doğrultucu veya devirici moment oluşturur
- GM kavramı bu moment değişikliğinden türetilir`,
        formulas: [
          {
            formula: "Y = ρ × g × ∇",
            description: "Kaldırma kuvveti formülü"
          },
          {
            formula: "∇ = Δ / ρ",
            description: "Batmış hacim hesabı"
          },
          {
            formula: "Δtatlı = Δdeniz × (ρdeniz / ρtatlı)",
            description: "Tatlı su dönüşümü"
          }
        ],
        examples: [
          {
            problem: "5000 m³ batmış hacme sahip gemi, deniz suyunda kaç ton deplasana sahiptir?",
            solution: "Δ = ρ × ∇ = 1.025 × 5000 = 5125 ton"
          },
          {
            problem: "10.000 tonluk gemi, deniz suyundan tatlı suya geçtiğinde ek su çekimi ne olur?",
            solution: "∇deniz = 10000/1.025 = 9756 m³, ∇tatlı = 10000/1.000 = 10000 m³. Fark = 244 m³ (daha fazla batar)"
          }
        ],
        keyPoints: [
          "Arşimet prensibi gemi yüzmesinin fiziksel temelidir",
          "Kaldırma kuvveti yer değiştirilen suyun ağırlığına eşittir",
          "Suyun yoğunluğu draft ve stabiliteyi etkiler",
          "Tatlı suda gemi daha fazla batar"
        ]
      },
      {
        title: "3.2. Deplasman (Δ) Kavramı",
        content: `Deplasman, gemi mühendisliğinin en temel kavramlarından biridir ve geminin toplam ağırlığını ifade eder.

**Deplasman Tanımı**
Deplasman (Δ), geminin ve üzerindeki her şeyin toplam ağırlığıdır. Arşimet prensibine göre, bu değer aynı zamanda yer değiştirilen suyun ağırlığına eşittir.

**Deplasman Bileşenleri**
Toplam deplasman şu unsurlardan oluşur:

Δ = Δlightship + Deadweight (DWT)

**Lightship (Hafif Gemi):**
- Gövde yapısı
- Makine dairesi ve ekipmanlar
- Sabit donanımlar
- Boş tanklar
- Tipik olarak geminin %30-40'ı

**Deadweight (Taşınan Ağırlık):**
- Yük (kargo)
- Yakıt
- Tatlı su
- Balast
- Kumanya
- Personel ve bagajları
- Diğer tüketim malzemeleri

**Deplasman Türleri**
1. **Light Displacement:** Boş gemi ağırlığı (lightship)
2. **Load Displacement:** Tam yüklü deplasman
3. **Ballast Displacement:** Ballastlı deplasman
4. **Design Displacement:** Tasarım deplasmanı

**Hacim Deplasmanı (∇)**
Volume displacement, batmış hacmi ifade eder:
∇ = Δ / ρ (m³)

Bu değer hidrostatik hesaplamalar için kullanılır.

**Deplasmanın Stabilite ile İlişkisi**
Deplasman değişimi stabiliteyi etkiler:
- Deplasman arttıkça → Draft artar → KM değişir
- Deplasman arttıkça → Moment hesabında Δ değeri değişir
- GM = KM - KG formülünde KM, deplasmanla değişir`,
        formulas: [
          {
            formula: "Δ = ∇ × ρ",
            description: "Deplasman = Batmış hacim × Su yoğunluğu"
          },
          {
            formula: "Δ = Lightship + DWT",
            description: "Deplasman = Hafif gemi + Deadweight"
          },
          {
            formula: "DWT = Cargo + Fuel + FW + Ballast + Stores",
            description: "Deadweight bileşenleri"
          }
        ],
        examples: [
          {
            problem: "Lightship = 8000 ton, Yakıt = 1500 ton, Yük = 20000 ton, Balast = 500 ton. Toplam deplasman?",
            solution: "Δ = 8000 + 1500 + 20000 + 500 = 30000 ton"
          }
        ],
        keyPoints: [
          "Deplasman geminin toplam ağırlığıdır",
          "Yer değiştirilen suyun ağırlığına eşittir",
          "Lightship + Deadweight = Toplam Deplasman",
          "Stabilite hesaplarında Δ kritik parametredir"
        ]
      },
      {
        title: "3.3. Draft (Su Çekimi) ve Trim",
        content: `Draft, geminin suya ne kadar battığını gösteren temel ölçüdür ve stabilite hesaplamalarında kritik öneme sahiptir.

**Draft Tanımı**
Draft (T), geminin su hattından omurgasına olan dikey mesafedir. Gemi ne kadar yüklenirse, draft o kadar artar.

**Draft Ölçüm Noktaları**
Gemilerde draft genellikle üç noktadan ölçülür:
- **TF (Forward Draft):** Baş draftı
- **TA (Aft Draft):** Kıç draftı
- **TM (Midship Draft):** Orta kesit draftı

**Ortalama Draft**
Basit ortalama: Tort = (TF + TA) / 2
Gerçek ortalama: Tmean = (TF + 6×TM + TA) / 8 (geminin şekline göre)

**Trim**
Trim, baş ve kıç draftları arasındaki farktır:
Trim = TA - TF

**Trim Durumları:**
- **Trim by Stern (Kıça trim):** TA > TF (pozitif trim)
- **Trim by Head (Başa trim):** TF > TA (negatif trim)
- **Even Keel:** TA = TF (sıfır trim)

**Draft İşaretleri (Draft Marks)**
Gemilerin her iki bordosunda ve baş/kıç kesitlerinde draft işaretleri bulunur:
- Metrik: 10 cm aralıklarla
- Imperial: 6 inç aralıklarla
- Romen rakamları veya Arap rakamları ile

**Draft ve Stabilite İlişkisi**
Draft değişimi stabiliteyi doğrudan etkiler:
- Draft arttıkça → KB artar
- Draft arttıkça → BM genellikle azalır (su hattı şekline bağlı)
- Net etki → KM değişir
- Hidrostatik tablolar her draft için KM verir`,
        formulas: [
          {
            formula: "Trim = TA - TF",
            description: "Trim hesabı (pozitif = kıça trim)"
          },
          {
            formula: "Tmean = (TF + 6×TM + TA) / 8",
            description: "Gerçek ortalama draft (Simpson kuralı)"
          },
          {
            formula: "ΔDraft = w / TPC",
            description: "Paralel batma hesabı (TPC: ton per cm)"
          }
        ],
        examples: [
          {
            problem: "Baş draft = 6.5 m, Kıç draft = 7.3 m. Ortalama draft ve trim?",
            solution: "Tort = (6.5 + 7.3) / 2 = 6.9 m. Trim = 7.3 - 6.5 = 0.8 m kıça trim"
          }
        ],
        keyPoints: [
          "Draft su hattından omurgaya mesafedir",
          "Baş, kıç ve orta draft noktaları ölçülür",
          "Trim = Kıç draft - Baş draft",
          "Draft değişimi KM'i ve dolayısıyla GM'i etkiler"
        ]
      },
      {
        title: "3.4. TPC ve Paralel Batma",
        content: `TPC (Tonnes Per Centimetre) kavramı, yükleme operasyonlarında geminin ne kadar batacağını hesaplamak için kullanılır.

**TPC Tanımı**
TPC, geminin draftını 1 cm artırmak için gerekli ağırlıktır (ton cinsinden). Su hattı alanı ile doğrudan ilişkilidir.

**TPC Formülü**
TPC = (Awp × ρ) / 100

Burada:
- Awp: Su hattı alanı (m²)
- ρ: Su yoğunluğu (t/m³)
- 100: cm → m dönüşümü

**TPC'nin Özellikleri**
- TPC, geminin draft'ına göre değişir
- Hidrostatik tablolarda her draft için verilir
- Geniş gemilerde TPC daha büyüktür
- Deniz suyunda TPC, tatlı suya göre biraz daha büyüktür

**Paralel Batma (Sinkage)**
Gemi yüklendiğinde veya boşaltıldığında draftı paralel olarak değişir (trim değişmeden):

ΔDraft (cm) = w / TPC

**FWA (Fresh Water Allowance)**
Tatlı su toleransı, geminin deniz suyundan tatlı suya geçerken ne kadar daha batacağını gösterir:

FWA = Δ / (4 × TPC) (cm)

Bu değer yükleme hesaplamalarında önemlidir.

**Dock Water Allowance (DWA)**
Liman suyunun yoğunluğu deniz suyundan farklı olabilir:

DWA = FWA × (1025 - ρdock) / 25

Burada ρdock: Liman suyunun yoğunluğu`,
        formulas: [
          {
            formula: "TPC = Awp × ρ / 100",
            description: "TPC hesabı (ton/cm)"
          },
          {
            formula: "ΔDraft = w / TPC",
            description: "Paralel batma hesabı (cm)"
          },
          {
            formula: "FWA = Δ / (4 × TPC)",
            description: "Tatlı su toleransı (cm)"
          },
          {
            formula: "DWA = FWA × (1025 - ρ) / 25",
            description: "Liman suyu toleransı (cm)"
          }
        ],
        examples: [
          {
            problem: "TPC = 25 ton/cm olan gemiye 500 ton yük alınırsa paralel batma kaç cm?",
            solution: "ΔDraft = 500 / 25 = 20 cm"
          },
          {
            problem: "Δ = 20000 ton, TPC = 40 ton/cm. FWA ne kadardır?",
            solution: "FWA = 20000 / (4 × 40) = 125 cm = 1.25 m"
          }
        ],
        keyPoints: [
          "TPC, 1 cm batma için gereken ağırlıktır",
          "Su hattı alanı ile doğru orantılıdır",
          "FWA tatlı su-deniz suyu geçişinde önemlidir",
          "Yükleme planlamasında kritik parametre"
        ]
      }
    ]
  },
  {
    id: "section-4",
    title: "Bölüm 4 – Küçük Açılı Enine Stabilite",
    icon: "Calculator",
    iconColor: "from-blue-500 to-indigo-600",
    description: "GM ve GZ kavramları, küçük açı yaklaşımı",
    subtopics: [
      {
        title: "4.1. Gemi Küçük Bir Açıda Yatarken Kuvvetler",
        content: `Gemi küçük bir açıyla yattığında ortaya çıkan kuvvetler ve momentler, enine stabilite teorisinin temelini oluşturur.

**Denge Durumunda Kuvvetler**
Gemi dik konumdayken:
- Ağırlık kuvveti (W = Δ): G noktasından dikey aşağı
- Kaldırma kuvveti (Y = Δ): B noktasından dikey yukarı
- G ve B aynı düşey doğru üzerinde
- Net moment = 0 (denge)

**Yatmış Konumda Kuvvetler**
Gemi küçük bir açıyla (θ) iskele veya sancak tarafa yattığında:

1. **Ağırlık Kuvveti:** Hala G noktasından dikey aşağıya etkir (G sabit)
2. **Kaldırma Kuvveti:** Yeni yüzme merkezinden (B₁) yukarıya etkir (B hareket etti)
3. **Moment Kolu:** G ve kaldırma doğrusu arasında yatay mesafe oluşur

**Kuvvet Çifti ve Moment**
Bu iki paralel kuvvet (eşit ve zıt yönlü) bir kuvvet çifti oluşturur:
- Kuvvet çiftinin momenti = W × GZ
- GZ: Sağlama kolu (righting arm)

**GZ'nin Geometrik Tanımı**
GZ, G noktasından yeni kaldırma doğrusuna çizilen dikmenin uzunluğudur:
- GZ pozitif → Gemi dik konuma döner (righting moment)
- GZ negatif → Gemi daha fazla yatar (heeling moment)
- GZ = 0 → Denge (stable veya unstable olabilir)

**Metasanter ile İlişki**
Küçük açılarda (θ < 10-15°):
- M noktası sabit kabul edilir
- Kaldırma doğrusu M'den geçer
- GZ = GM × sin(θ) bağıntısı geçerlidir`,
        formulas: [
          {
            formula: "GZ = GM × sin(θ)",
            description: "Küçük açılarda GZ hesabı (θ < 10-15°)"
          },
          {
            formula: "MR = Δ × GZ",
            description: "Sağlama (doğrultucu) momenti"
          },
          {
            formula: "MR = Δ × GM × sin(θ)",
            description: "Sağlama momenti (açık formül)"
          }
        ],
        keyPoints: [
          "Yatmada G sabit kalır, B hareket eder",
          "GZ, G'den kaldırma doğrusuna dik mesafedir",
          "Pozitif GZ geminin düzelmesini sağlar",
          "Küçük açılarda M sabit kabul edilir"
        ]
      },
      {
        title: "4.2. GZ ve GM İlişkisi (Küçük Açılar)",
        content: `GM ve GZ arasındaki ilişki, stabilite teorisinin temel taşıdır ve pratik hesaplamalarda yaygın olarak kullanılır.

**Küçük Açı Yaklaşımı**
Küçük yatma açılarında (θ < 10-15°):
- Metasanter M sabit kabul edilir
- Trigonometrik yaklaşımlar geçerlidir
- sin(θ) ≈ θ (radyan) kullanılabilir
- GZ = GM × sin(θ) formülü uygulanır

**Formülün Türetilmesi**
Geometrik olarak:
1. M noktası sabit
2. G, M'nin Δh = GM kadar altında
3. Yatma açısı θ olduğunda
4. G ile kaldırma doğrusu arasındaki yatay mesafe = GM × sin(θ) = GZ

**GZ'nin Fiziksel Anlamı**
GZ değeri (sağlama kolu):
- Geminin kendini doğrultma eğiliminin ölçüsüdür
- GZ ne kadar büyükse, doğrultucu moment o kadar güçlüdür
- Birim: metre (m)

**Sağlama Momenti**
Righting moment (MR):
MR = Δ × GZ = Δ × GM × sin(θ)

Burada:
- MR: Sağlama momenti (t·m veya kN·m)
- Δ: Deplasman (ton)
- GZ: Sağlama kolu (m)
- GM: Metasantrik yükseklik (m)
- θ: Yatma açısı

**GM'in Kritik Değerleri**
- GM > 0: Stabil gemi (pozitif sağlama momenti)
- GM = 0: Nötr denge (moment yok)
- GM < 0: İnstabil gemi (devirici moment)

**Minimum GM Gereksinimleri**
IMO tarafından belirlenen tipik minimum GM değerleri:
- Genel kargo gemileri: GM ≥ 0.15 m
- Tahıl yüklü gemiler: GMdüzeltilmiş ≥ 0.30 m
- Yolcu gemileri: Özel kriterler uygulanır`,
        formulas: [
          {
            formula: "GZ = GM × sin(θ)",
            description: "Küçük açılarda temel GZ-GM ilişkisi"
          },
          {
            formula: "MR = Δ × GM × sin(θ)",
            description: "Sağlama momenti (tam formül)"
          },
          {
            formula: "θ (rad) ≈ tan(θ) ≈ sin(θ)",
            description: "Küçük açı yaklaşımı (θ < 10°)"
          }
        ],
        examples: [
          {
            problem: "Δ = 15000 ton, GM = 1.2 m, θ = 5°. Sağlama momentini hesaplayın.",
            solution: "GZ = 1.2 × sin(5°) = 1.2 × 0.0872 = 0.105 m. MR = 15000 × 0.105 = 1575 t·m"
          },
          {
            problem: "GM = 0.8 m, θ = 10° için GZ?",
            solution: "GZ = 0.8 × sin(10°) = 0.8 × 0.1736 = 0.139 m"
          }
        ],
        keyPoints: [
          "GZ = GM × sin(θ) küçük açılar için geçerlidir",
          "GM büyükse GZ de büyük olur (daha güçlü doğrultma)",
          "Sağlama momenti MR = Δ × GZ",
          "Minimum GM değerleri IMO tarafından belirlenir"
        ]
      },
      {
        title: "4.3. GM'in Fiziksel Yorumu ve Stabilite Durumları",
        content: `GM değeri, geminin stabilite karakteristiğini doğrudan belirler. GM'in işaretine göre üç farklı denge durumu tanımlanır.

**Pozitif Stabilite (GM > 0)**
G noktası, M'nin altındadır. Bu durumda:
- Gemi yattığında geri döndürücü (righting) moment oluşur
- Dış etki kalktığında gemi dik konuma döner
- Normal ve güvenli durum
- Sarkaç analojisi: Alt ağırlıklı sarkaç

**Fiziksel Açıklama:**
Gemi yattığında B noktası yatılan tarafa kayar. G, M'nin altında olduğu için, kaldırma kuvveti geminin üst tarafından geçer ve geminin dikilmesini sağlayan bir moment oluşturur.

**Nötr Denge (GM = 0)**
G ile M çakışıktır. Bu durumda:
- Gemi, herhangi bir açıda dengede kalabilir
- Ne döndürücü ne de devirici moment vardır
- Gemi yatık kalır (rastgele konumda)
- Pratik açıdan tehlikeli ve istenmeyen durum

**Negatif Stabilite (GM < 0)**
G noktası, M'nin üzerindedir. Bu durumda:
- Gemi eğildiğinde devirmeye çalışan (heeling) moment oluşur
- Gemi daha fazla yatmaya eğilimlidir
- Çok tehlikeli, devrilme riski yüksek
- Ters sarkaç analojisi

**Loll Durumu**
Negatif GM olan gemi, belirli bir açıda dengeye gelebilir (loll açısı). Bu:
- Geçici bir denge durumudur
- Çok tehlikelidir
- Ani hareket veya ek yük geminin devrilmesine yol açabilir

**Sert ve Yumuşak Gemi Kavramları**
GM değerinin büyüklüğü geminin davranışını etkiler:

**Büyük GM (Sert Gemi - Stiff Ship):**
- GM > 1.5 m (tipik)
- Hızlı salınım (kısa rulo periyodu)
- Yüksek ivmeler
- Mürettebat ve yük için rahatsız edici
- Yapısal yükler artabilir

**Küçük GM (Yumuşak Gemi - Tender Ship):**
- GM < 0.5 m (tipik)
- Yavaş salınım (uzun rulo periyodu)
- Daha konforlu ama dikkatli olunmalı
- Devrilme riski nispeten yüksek

**Optimum GM:**
- Genellikle 0.5 - 1.5 m aralığında
- Güvenlik ve konfor dengesi
- Gemi tipine göre değişir`,
        keyPoints: [
          "GM > 0: Stabil (pozitif sağlama momenti)",
          "GM = 0: Nötr denge (tehlikeli)",
          "GM < 0: İnstabil (devrilme riski)",
          "Çok büyük GM sert gemi, çok küçük GM yumuşak gemi yaratır"
        ],
        warnings: [
          "Negatif GM çok tehlikelidir - gemi devrilebilir!",
          "Nötr denge (GM=0) rastgele yatmaya neden olur",
          "Loll durumunda gemi görünürde dengede olsa da risk altındadır"
        ],
        practicalTips: [
          "Her yüklemede GM'i kontrol edin",
          "Minimum GM kriterlerini daima sağlayın",
          "Sert gemi şikayetlerinde balast düzenlemesi yapın",
          "Yumuşak gemi durumunda alt tanklara balast alın"
        ]
      },
      {
        title: "4.4. İnclinometer ve GM Ölçümü",
        content: `Eğim testi (inclining experiment), bir geminin metasantrik yüksekliğini (GM) deneysel olarak belirlemenin en güvenilir yoludur. Bu test, gemi inşa edildiğinde ve önemli modifikasyonlardan sonra zorunlu olarak yapılır.

**Eğim Testi (Inclining Experiment) Nedir?**
Eğim testi, bilinen bir ağırlığın gemide bilinen bir mesafe kaydırılmasıyla geminin yatma açısının ölçülmesi ve bu verilerden GM'in hesaplanması işlemidir. Test sonuçları, geminin tüm ömrü boyunca referans olarak kullanılır.

**Test Prosedürü**

**Hazırlık Aşaması:**
- Gemi mümkün olduğunca boş ve serbest olmalı
- Tüm gevşek eşyalar sabitlenmeli
- Tanklar tam dolu veya tamamen boş olmalı
- Halatlar gevşetilmeli (sadece çok hafif bağlı)
- Rüzgâr ve akıntı minimum olmalı
- Deniz sakin olmalı

**Test Ağırlıkları:**
- Tipik olarak 4-8 adet test ağırlığı kullanılır
- Toplam ağırlık genellikle deplasmanın %1-2'si kadar
- Ağırlıklar güvertede enine doğrultuda hareket ettirilir
- Her kaydırma mesafesi tam olarak ölçülür

**İnclinometer (Eğim Ölçer)**
İnclinometer, geminin yatma açısını hassas olarak ölçen cihazdır:

**Sarkaç Tipi İnclinometer:**
- Uzun bir ipten asılı ağırlık
- Altında ölçekli cetvel
- Sapma miktarı ölçülür
- tan(θ) = sapma / ip uzunluğu

**U-Tüpü (Manometre):**
- İki kollu su dolu tüp
- Yatmada su seviye farkı oluşur
- Fark açıyla orantılı
- Daha hassas ölçüm

**Dijital İnclinometer:**
- Elektronik sensörler
- Anlık dijital okuma
- Kayıt imkânı
- Modern gemilerde yaygın

**GM Hesabı**

Temel formül:
────────────
GM = (w × d) / (Δ × tan θ)
────────────

Burada:
- w = Kaydırılan ağırlık (ton)
- d = Kaydırma mesafesi (m)
- Δ = Gemi deplasmanı (ton)
- θ = Ölçülen yatma açısı

**Lightship Değerleri**
Eğim testinden elde edilen sonuçlar:
- Lightship deplasmanı
- Lightship KG
- Lightship LCG
- Bu değerler stabilite kitapçığının temelini oluşturur`,
        formulas: [
          {
            formula: "GM = (w × d) / (Δ × tan θ)",
            description: "Eğim testinden GM hesabı"
          },
          {
            formula: "tan θ = sapma / ip uzunluğu",
            description: "Sarkaç tipi inclinometer açı ölçümü"
          },
          {
            formula: "KG = KM - GM",
            description: "Test sonrası KG hesabı"
          }
        ],
        examples: [
          {
            problem: "Eğim testinde: w = 20 ton, d = 12 m, Δ = 5000 ton, ölçülen sapma = 15 cm, ip = 5 m. GM değerini hesaplayın.",
            solution: "tan θ = 0.15/5 = 0.03. GM = (20 × 12) / (5000 × 0.03) = 240/150 = 1.60 m"
          }
        ],
        keyPoints: [
          "Eğim testi geminin referans stabilite verilerini oluşturur",
          "Test koşulları stabilite kitapçığında belirtilen şekilde olmalı",
          "İnclinometer hassasiyeti sonuçları doğrudan etkiler",
          "Lightship değerleri tüm hesapların temelidir"
        ],
        practicalTips: [
          "Test sırasında gemide minimum personel bulundurun",
          "Rüzgârsız ve sakin deniz koşullarını bekleyin",
          "Birden fazla ölçüm alarak ortalama kullanın",
          "Tüm tank durumlarını dikkatli belgeleyin"
        ],
        warnings: [
          "Hatalı eğim testi tüm stabilite hesaplarını etkiler",
          "Test koşulları uygun değilse sonuçlar geçersiz olabilir",
          "Modifikasyonlardan sonra test tekrarlanmalıdır"
        ]
      }
    ]
  },
  {
    id: "section-5",
    title: "Bölüm 5 – Sert ve Yumuşak Gemi, Rulo Periyodu",
    icon: "Ship",
    iconColor: "from-blue-500 to-indigo-600",
    description: "GM'in gemi davranışına etkisi ve rulo periyodu",
    subtopics: [
      {
        title: "5.1. Sert Gemi (Stiff Ship)",
        content: `Sert gemi, yüksek GM değerine sahip olan ve hızlı, güçlü doğrulma eğilimi gösteren gemidir.

**Tanım ve Özellikler**
Sert gemilerde GM büyüktür (tipik olarak > 1.5 m):
- GZ, küçük açılarda bile hızlı büyür
- Gemi, yatma açısını çok kısa sürede toparlar
- Rulo periyodu kısadır (hızlı salınım)
- Yüksek doğrultucu moment

**Sert Geminin Avantajları**
1. Yüksek güvenlik marjı
2. Devrilme riski düşük
3. Büyük dış etkilere karşı direnç

**Sert Geminin Dezavantajları**
1. **Konfor Sorunları:**
   - Mürettebat ve yolcular için rahatsız edici salınım
   - Deniz tutması artabilir
   - Çalışma verimliliği düşer

2. **Yük Hasarı:**
   - Yükler daha yüksek ivmelere maruz kalır
   - Kaymaya eğilimli yükler tehlike altında
   - Hassas kargolar zarar görebilir

3. **Yapısal Yükler:**
   - Gövde üzerindeki gerilmeler artar
   - Tekrarlanan hızlı salınımlar yorgunluğa neden olur
   - Bağlama sistemleri zorlanır

**Neden Sert Gemi Oluşur?**
- Düşük KG (ağır yükler altta)
- Yüksek BM (geniş gemi formu)
- Boş veya hafif yüklü durum
- Alt tanklara alınan ağır balast`,
        keyPoints: [
          "Büyük GM = Sert gemi = Kısa rulo periyodu",
          "Güvenli ama konfor açısından sorunlu olabilir",
          "Yük hasarı ve yapısal yükler artabilir",
          "Üst tanklara balast alarak yumuşatılabilir"
        ],
        practicalTips: [
          "Sert gemi şikayetlerinde üst tanklara balast alın",
          "Yükleri mümkünse biraz daha yükseğe yerleştirin",
          "Hassas kargolar için ek bağlama önlemleri alın",
          "Mürettebat için anti-deniz tutması önlemleri düşünün"
        ]
      },
      {
        title: "5.2. Yumuşak Gemi (Tender Ship)",
        content: `Yumuşak gemi, düşük GM değerine sahip olan ve yavaş, zayıf doğrulma eğilimi gösteren gemidir.

**Tanım ve Özellikler**
Yumuşak gemilerde GM küçüktür (tipik olarak < 0.5 m):
- GZ küçük açılarda yavaş artar
- Gemi yatma açısını çok daha yavaş toparlar
- Rulo periyodu uzundur (yavaş salınım)
- Düşük doğrultucu moment

**Yumuşak Geminin Avantajları**
1. Daha konforlu seyir
2. Yükler üzerinde düşük ivme
3. Yapısal yükler azalır

**Yumuşak Geminin Dezavantajları**
1. **Güvenlik Riski:**
   - GM çok küçükse devrilme riski artar
   - Ani dış etkilere karşı zayıf direnç
   - Yük kayması tehlikeli olabilir

2. **Operasyonel Sorunlar:**
   - Büyük yatma açıları oluşabilir
   - Güverte üstü çalışmalar zorlaşır
   - Manevra kabiliyeti azalabilir

3. **Kritik Durumlar:**
   - Dalga rezonansında büyük salınımlar
   - Ağır havada parametrik rulo riski
   - GM sınırda ise küçük değişiklikler kritik olabilir

**Neden Yumuşak Gemi Oluşur?**
- Yüksek KG (ağır yükler üstte)
- Düşük BM (dar gemi formu)
- Güverte üstü yük (konteyner, timber)
- Üst tanklarda sıvı
- Serbest yüzey etkisi`,
        warnings: [
          "Çok düşük GM tehlikelidir - minimum değerleri kontrol edin",
          "Serbest yüzey etkisi GM'i daha da düşürür",
          "Parametrik rulo riski özellikle uzun rulo periyodlu gemilerde yüksektir"
        ],
        keyPoints: [
          "Küçük GM = Yumuşak gemi = Uzun rulo periyodu",
          "Konforlu ama güvenlik açısından riskli olabilir",
          "Minimum GM değerleri mutlaka sağlanmalı",
          "Alt tanklara balast alarak sertleştirilebilir"
        ],
        practicalTips: [
          "Yumuşak gemi durumunda alt tanklara balast alın",
          "Yükleri mümkünse daha aşağıya yerleştirin",
          "Serbest yüzey etkisini minimize edin",
          "Ağır havada ekstra dikkatli olun"
        ]
      },
      {
        title: "5.3. Rulo Periyodu ve GM İlişkisi",
        content: `Rulo periyodu, geminin bir tam salınım yapması için geçen süredir ve GM ile doğrudan ilişkilidir.

**Rulo Periyodu Tanımı**
Rulo periyodu (T), geminin bir tam enine salınım (örn. sağa-sola-sağa) yapması için geçen süredir. Birim: saniye (s).

**Rulo Periyodu Formülü**
T = 2π × k / √(g × GM)

Veya basitleştirilmiş formül:
T ≈ C × B / √GM

Burada:
- T: Rulo periyodu (s)
- k: Geminin enine atalet yarıçapı (m)
- g: Yerçekimi ivmesi (9.81 m/s²)
- GM: Metasantrik yükseklik (m)
- C: Deneysel katsayı (0.7 - 0.9, gemi tipine bağlı)
- B: Geminin genişliği (m)

**GM-T İlişkisi**
- GM arttıkça T küçülür (sert gemi, hızlı salınım)
- GM azaldıkça T büyür (yumuşak gemi, yavaş salınım)
- Bu ilişki, T ölçülerek GM tahmini için de kullanılır

**Rulo Periyodunun Pratik Önemi**
1. **Konfor:** T = 15-20 s arası genellikle konforlu kabul edilir
2. **Güvenlik:** Çok kısa T (< 8 s) güvenli ama konforsuz
3. **Dalga Rezonansı:** T ≈ dalga periyodu olursa büyük salınımlar

**Periyot Ölçümü ile GM Tahmini**
Rulo periyodu ölçülerek GM tahmin edilebilir:
GM ≈ (C × B / T)²

Bu yöntem pratikte yaygın olarak kullanılır:
1. Gemi sakin suda sallandırılır
2. 10-20 salınımın süresi ölçülür
3. Ortalama periyot bulunur
4. GM hesaplanır`,
        formulas: [
          {
            formula: "T = 2π × k / √(g × GM)",
            description: "Kesin rulo periyodu formülü"
          },
          {
            formula: "T ≈ C × B / √GM",
            description: "Pratik rulo periyodu formülü (C ≈ 0.7-0.9)"
          },
          {
            formula: "GM ≈ (C × B / T)²",
            description: "Periyottan GM tahmini"
          }
        ],
        examples: [
          {
            problem: "Genişlik B = 20 m, GM = 1.0 m, C = 0.8. Rulo periyodunu bulun.",
            solution: "T = 0.8 × 20 / √1.0 = 16 / 1 = 16 saniye"
          },
          {
            problem: "Ölçülen T = 12 s, B = 25 m, C = 0.75. GM tahmini?",
            solution: "GM = (0.75 × 25 / 12)² = (18.75 / 12)² = 1.5625² ≈ 2.44 m"
          }
        ],
        keyPoints: [
          "T, GM'in karekökü ile ters orantılıdır",
          "Büyük GM = Kısa periyot, Küçük GM = Uzun periyot",
          "Periyot ölçümü ile GM tahmin edilebilir",
          "Dalga rezonansından kaçınmak için periyot önemlidir"
        ]
      },
      {
        title: "5.4. Parametrik Yalpa (Parametric Rolling)",
        content: `Parametrik yalpa (parametric rolling), belirli dalga koşullarında gemilerin aşırı ve tehlikeli enine salınımlar yapmasına neden olan dinamik bir fenomendir. Özellikle modern konteyner gemileri ve büyük yolcu gemileri için ciddi bir risk oluşturur.

**Parametrik Yalpa Nedir?**
Parametrik yalpa, geminin boyuna dalgalarla (baş veya kıçtan gelen) karşılaştığında, dalga geçişi sırasında su hattı alanının değişmesi nedeniyle GM'in periyodik olarak değişmesi sonucu oluşan aşırı enine salınım hareketidir.

**Fiziksel Mekanizma**

**Dalga Tepesinde:**
- Orta gövde dalga tepesinde
- Su hattı genişliği azalır
- BM küçülür
- GM azalır (geçici olarak düşük stabilite)

**Dalga Çukurunda:**
- Orta gövde dalga çukurunda
- Su hattı genişliği artar
- BM büyür
- GM artar (geçici olarak yüksek stabilite)

**Rezonans Durumu**
GM'deki bu periyodik değişim, gemi rulo periyodunun yarısına eşit olduğunda rezonans oluşur ve salınım amplitüdü tehlikeli boyutlara ulaşabilir.

**Kritik Koşullar**

**Dalga Boyu - Gemi Boyu Oranı:**
────────────
λ / L ≈ 0.8 - 2.0
────────────
(λ: dalga boyu, L: gemi boyu)

**Karşılaşma Periyodu İlişkisi:**
────────────
Te ≈ Tr / 2  veya  Te ≈ Tr
────────────
(Te: karşılaşma periyodu, Tr: doğal rulo periyodu)

**Hız Etkisi:**
- Baştan dalgada: Gemi hızı arttıkça Te azalır
- Kıçtan dalgada: Gemi hızı arttıkça Te artar

**Yüksek Risk Faktörleri**
- Düşük GM (yumuşak gemi)
- Geniş baş ve kıç flare'ları
- Uzun rulo periyodu
- Düşük su hattı alanı değişimi direnci
- Kıçtan veya baştan dalga

**Önleme Yöntemleri**

**1. Hız Değişikliği:**
- Kritik hızdan kaçının
- Yavaşlayarak veya hızlanarak Te'yi değiştirin

**2. Rota Değişikliği:**
- Dalgalara açı verin (baştan veya kıçtan kaçının)
- Baş açısını 30-50° yapın

**3. GM Artırma:**
- Alt tanklara ballast alın
- Üst tankları boşaltın
- Ağırlık merkezini düşürün

**4. Aktif Stabilizasyon:**
- Fin stabilizatörleri
- Anti-rolling tankları
- Aktif rulo sönümleme sistemleri`,
        formulas: [
          {
            formula: "λ / L ≈ 0.8 - 2.0",
            description: "Kritik dalga boyu / gemi boyu oranı"
          },
          {
            formula: "Te = Tr / 2",
            description: "Ana parametrik rezonans koşulu"
          },
          {
            formula: "Te = λ / (Vw ± Vs)",
            description: "Karşılaşma periyodu (baştan/kıçtan dalga)"
          }
        ],
        keyPoints: [
          "Parametrik yalpa boyuna dalgalarda oluşur",
          "GM'in periyodik değişimi rezonansa neden olur",
          "Konteyner gemileri özellikle savunmasızdır",
          "Hız ve rota değişikliği en etkili önlemdir"
        ],
        warnings: [
          "Parametrik yalpa çok hızlı gelişebilir (birkaç dakika)",
          "Salınım açıları 40° üzerine çıkabilir",
          "Konteyner kaybı ve gemi hasarı riski yüksek",
          "Mürettebat yaralanması tehlikesi vardır"
        ],
        practicalTips: [
          "Kıçtan veya baştan dalgada dikkatli olun",
          "Salınım artarsa hemen rota veya hız değiştirin",
          "Kritik hız aralıklarını önceden hesaplayın",
          "Ağır havada düşük GM ile seyir etmeyin"
        ]
      },
      {
        title: "5.5. Rulo Sönümlemesi (Roll Damping)",
        content: `Rulo sönümlemesi, geminin yalpa hareketi sırasında enerjinin kaybedilmesiyle salınımların zamanla küçülmesini ifade eder. Sönümleme yetersizse gemi uzun süre salınır; sönümleme yüksekse salınım hızlıca azalır.

**Sönümleme Kaynakları**
1. **Viskoz Sürtünme:** Gövde yüzeyinde su ile oluşan sürtünme.
2. **Dalgasal Radyasyon:** Yalpa sırasında suya enerji aktarımıyla dalga oluşumu.
3. **Apendisler:** Bilge keel, fin stabilizatör, pervane ve dümen gibi elemanlar.
4. **İç Sürtünme:** Yapısal elemanlarda mikro deformasyonlar.

**Sönümlemenin Pratik Önemi**
- Sönümleme, rulo periyodundan bağımsız olarak salınım şiddetini kontrol eder.
- Zayıf sönümleme, konforu ve güvenliği olumsuz etkiler.
- Ağır havada büyük rulo açılarını sınırlamak için kritik bir parametredir.

**Rulo Sönümleme Ölçümü (Serbest Salınım)**
Geminin serbest rulo salınımında ardışık tepe açıları ölçülerek sönümleme bulunur:
────────────
δ = ln(θ₁ / θ₂)
ζ ≈ δ / (2π)
────────────
Burada:
- θ₁, θ₂: Ardışık iki tepe rulo açısı
- δ: Logaritmik decrement
- ζ: Sönüm oranı

**Yükleme ve Sönümleme**
- Sığ draftta sönümleme genelde azalır.
- Geniş ve keskin bilge bölgeleri sönümlemeyi artırır.
- Yüksek serbest yüzey etkisi sönümlemeyi artırsa da GM’i düşürerek risk yaratır.`,
        formulas: [
          {
            formula: "δ = ln(θ₁ / θ₂)",
            description: "Logaritmik decrement (sönümleme göstergesi)"
          },
          {
            formula: "ζ ≈ δ / (2π)",
            description: "Sönüm oranı (yaklaşık)"
          }
        ],
        examples: [
          {
            problem: "Serbest rulo testinde ardışık tepe açıları 8° ve 6°. Logaritmik decrement nedir?",
            solution: "δ = ln(8/6) = ln(1.333) ≈ 0.288"
          }
        ],
        keyPoints: [
          "Sönümleme salınımın zamanla azalmasını sağlar",
          "Bilge keel ve apendisler sönümlemeyi artırır",
          "Zayıf sönümleme uzun süreli yalpaya yol açar",
          "Logaritmik decrement sönümleme için pratik ölçüttür"
        ],
        practicalTips: [
          "Sert rulo şikayetlerinde sönümleme elemanlarını kontrol edin",
          "Serbest rulo ölçümleriyle sönümleme takibi yapılabilir",
          "Bilge keel bakımı sönümleme performansını etkiler"
        ]
      },
      {
        title: "5.6. Rulo Stabilizasyon Sistemleri",
        content: `Rulo stabilizasyon sistemleri, geminin yalpa hareketini azaltmak için kullanılan pasif veya aktif çözümlerdir. Özellikle yolcu gemileri, Ro-Ro ve konteyner gemilerinde operasyonel güvenlik ve konfor açısından kritiktir.

**Pasif Sistemler**
1. **Bilge Keel:** Gövdeye sabit kanatlar; sönümlemeyi artırır, bakım kolaydır.
2. **Anti-Rolling Tank (ART):** U-tüp veya flume tanklar; suyun kontrollü hareketiyle ruloyu azaltır.
3. **Keskin Bilge Formu:** Gövde geometrisi ile sönümleme artırılır.

**Aktif Sistemler**
1. **Fin Stabilizatörleri:** Hidrodinamik kanatlar; hızla etkili, ancak bakım ve enerji gerektirir.
2. **Aktif Tanklar:** Pompa ve valflerle tank içi akış kontrol edilir.
3. **Gyro Stabilizer:** Dönen kütle ile karşı moment üretir (daha küçük gemilerde yaygın).

**Sistem Seçiminde Kriterler**
- Gemi tipi ve operasyon profili
- Seyir hızı (fin stabilizatörleri için kritik)
- Enerji tüketimi ve bakım maliyeti
- Liman ve düşük hız operasyonları

**Seyir Emniyetine Etkisi**
- Rulo açılarını düşürerek yük kayması riskini azaltır
- Konforu artırır, yolcu emniyeti sağlar
- Yapısal yükleri ve ekipman yorgunluğunu düşürür`,
        keyPoints: [
          "Pasif sistemler düşük bakım, orta etkinlik sağlar",
          "Aktif sistemler yüksek etkinlik ancak enerji ve bakım ister",
          "Seyir hızına bağlı performans değişimi kritik bir parametredir",
          "Doğru sistem seçimi operasyonel riskleri azaltır"
        ],
        practicalTips: [
          "Fin stabilizatörleri düşük hızda etkisini kaybeder",
          "Anti-rolling tanklar düşük hızda da etkilidir",
          "Bakım planı stabilizasyon performansını korur"
        ],
        warnings: [
          "Stabilizatör arızaları ani yalpa artışına yol açabilir",
          "Yanlış tank ayarı yalpayı artırabilir",
          "Aktif sistemler yüksek enerji tüketimi yaratır"
        ]
      },
      {
        title: "5.7. Rulo Rezonansı ve Operasyonel Yönetim",
        content: `Rulo rezonansı, geminin doğal rulo periyodu ile karşılaşılan dalga periyodunun yakınlaşması sonucu salınım büyümesidir. Parametrik yalpaya benzer riskler doğurabilir, ancak farklı bir mekanizmaya sahiptir.

**Rezonansın Oluşumu**
- Dalga periyodu (Tw) ≈ Geminin doğal rulo periyodu (Tr)
- Tekrarlı dalga etkileri ruloyu her çevrimde büyütür
- Özellikle yan dalga (beam sea) koşullarında kritiktir

**Risk Artıran Faktörler**
- Zayıf sönümleme
- Uzun rulo periyodu (yumuşak gemi)
- Tekdüze dalga spektrumu
- Düşük sürat (manevra kısıtları)

**Operasyonel Önlemler**
1. **Rota Değişikliği:** Dalga açısını 20–40° değiştirerek rezonansı kırın.
2. **Hız Ayarı:** Karşılaşma periyodunu değiştirmek için hız artırma/azaltma.
3. **GM Yönetimi:** Alt balastla GM artırıp periyodu kısaltın.
4. **Sönümleme Artışı:** Bilge keel ve stabilizatör performansını kontrol edin.

**Pratik Gözlem**
- Düzenli ve büyüyen rulo açısı rezonans işareti olabilir
- Tek bir büyük dalga yerine ardışık büyüyen yalpa oluşur`,
        keyPoints: [
          "Rulo rezonansı dalga periyodu ile doğal periyot çakışınca oluşur",
          "Yan dalga koşulları riski artırır",
          "Rota ve hız değişikliği en hızlı müdahaledir",
          "GM ayarı periyodu değiştirmek için etkili bir araçtır"
        ],
        practicalTips: [
          "Yan dalga yerine baş-kıç açıları tercih edin",
          "Hız değişimiyle karşılaşma periyodunu kaydırın",
          "Sönümleme elemanlarını düzenli kontrol edin"
        ],
        warnings: [
          "Rulo rezonansı hızlı büyüyebilir ve kontrol dışına çıkabilir",
          "Rüzgâr ve dalga yönü birlikte değerlendirilmelidir",
          "Aşırı rulo yük kayması ve yaralanma riskini artırır"
        ]
      }
    ]
  },
  {
    id: "section-6",
    title: "Bölüm 6 – GZ Eğrileri ve Büyük Açılı Stabilite",
    icon: "Calculator",
    iconColor: "from-emerald-500 to-teal-600",
    description: "Büyük açılı stabilite analizi ve GZ eğrisi yorumu",
    subtopics: [
      {
        title: "6.1. GZ Eğrisi Nedir?",
        content: `GZ eğrisi, gemi stabilitesinin en kapsamlı göstergesidir ve geminin tüm yatma açılarındaki doğrultma kabiliyetini grafiksel olarak gösterir.

**Tanım**
GZ eğrisi (Statik Stabilite Eğrisi veya Righting Arm Curve), geminin farklı yatma açılarındaki (0° - 90° veya daha fazla) GZ değerlerinin grafiğidir. Yatay eksende yatma açısı (heel angle, θ), dikey eksende GZ değeri (metre cinsinden) yer alır.

**Neden GZ Eğrisi Gerekli?**
Küçük açılarda (0-15°) GZ = GM × sin(θ) formülü geçerlidir. Ancak büyük açılarda:
- Metasanter (M) sabit değildir, hareket eder
- Kaldırma merkezinin (B) hareketi karmaşıklaşır
- Güverte batması, borda çıkışları vb. geometri değişir
- Bu nedenle GZ, her açı için ayrı hesaplanır

**GZ Eğrisinin Hesaplanması**
GZ eğrisi, Cross Curves of Stability (KN eğrileri) kullanılarak hesaplanır:
1. Farklı yatma açıları için KN değerleri hidrostatik verilerden alınır
2. GZ = KN - KG × sin(θ) formülü uygulanır
3. Her açı için GZ değeri grafiklenir

**GZ Eğrisinin Şekli**
Tipik bir GZ eğrisi:
- 0°'de başlar (GZ = 0)
- Küçük açılarda lineer yükselir (GM ile orantılı)
- Bir maksimuma ulaşır (GZmax)
- Daha büyük açılarda azalmaya başlar
- Bir noktada sıfırı keser (Vanishing Angle)

**Önemli Noktalar**
1. **Başlangıç Eğimi:** 0°'deki tanjant GM'e eşittir
2. **Maksimum GZ:** Geminin maksimum doğrultma kapasitesi
3. **Maksimum GZ Açısı:** En güçlü direnç noktası
4. **Yok Olma Açısı:** GZ'nin sıfıra döndüğü açı`,
        formulas: [
          {
            formula: "GZ = KN - KG × sin(θ)",
            description: "GZ hesabı (Cross Curves yöntemi)"
          },
          {
            formula: "tan(eğim)θ=0 = GM",
            description: "GZ eğrisinin 0°'deki eğimi GM'e eşittir"
          },
          {
            formula: "A = ∫₀^θ GZ × dθ",
            description: "Dinamik stabilite (GZ eğrisi altındaki alan)"
          }
        ],
        keyPoints: [
          "GZ eğrisi büyük açılı stabiliteyi gösterir",
          "0°'deki eğim GM'e eşittir",
          "Maksimum GZ değeri ve açısı kritik parametrelerdir",
          "Yok olma açısı geminin devrilme sınırını gösterir"
        ]
      },
      {
        title: "6.2. GZ Eğrisinin Yorumlanması",
        content: `GZ eğrisi, geminin stabilite durumu hakkında birçok kritik bilgi sağlar.

**Temel Yorumlama Prensipleri**

**1. Başlangıç GM (Initial GM)**
GZ eğrisinin 0° civarındaki eğimi, GM değerini verir:
- Dik eğim = Büyük GM = Sert gemi
- Yatık eğim = Küçük GM = Yumuşak gemi

**2. Maksimum GZ (GZmax)**
- GZ'nin ulaştığı en yüksek değer
- Geminin en güçlü doğrultma momentini gösterir
- Tipik olarak 25° - 40° arasında oluşur
- IMO/IS Code 2008 kriteri: 30° veya daha büyük bir meyil açısında GZ ≥ 0.20 m olmalıdır

**3. Maksimum GZ Açısı (θmax)**
- GZmax'ın oluştuğu açı
- Bu açıya kadar gemi güçlü direnç gösterir
- IMO kriteri: θmax ≥ 25°

**4. Yok Olma Açısı (Angle of Vanishing Stability)**
- GZ'nin tekrar sıfıra düştüğü açı
- Bu açının ötesinde gemi devrilir
- Daha büyük = Daha güvenli
- Tipik değer: 50° - 80°

**5. GZ Eğrisi Altındaki Alan**
Dinamik stabiliteyi temsil eder:
- 0° - 30° arası alan: Kısa süreli dış etkilere direnç
- 0° - 40° arası alan: Uzun süreli etkilere direnç
- Daha geniş alan = Daha iyi stabilite rezervi

**GZ Eğrisi Şekilleri**
1. **İdeal Eğri:** Yüksek başlangıç eğimi, geniş maksimum platö, geç yok olma
2. **Sert Gemi:** Çok dik başlangıç, erken ve yüksek maksimum
3. **Yumuşak Gemi:** Yatık başlangıç, düşük maksimum
4. **Tehlikeli Durum:** Çok düşük maksimum, erken yok olma`,
        examples: [
          {
            problem: "GZ eğrisinde: θ=10°'de GZ=0.18m, θ=30°'de GZ=0.45m, θ=60°'de GZ=0.15m, θ=70°'de GZ=0. Bu gemiyi yorumlayın.",
            solution: "GM ≈ 0.18/sin(10°) = 1.04 m (iyi). GZmax yaklaşık 30° civarında 0.45 m (yeterli). Yok olma açısı 70° (yeterli). Genel olarak iyi stabilite."
          }
        ],
        keyPoints: [
          "Başlangıç eğimi GM'i gösterir",
          "GZmax ve θmax kritik IMO kriterleridir",
          "Yok olma açısı devrilme sınırını belirler",
          "Eğri altı alan dinamik stabiliteyi gösterir"
        ],
        practicalTips: [
          "Her yükleme durumu için GZ eğrisini kontrol edin",
          "Minimum IMO kriterlerini sağladığından emin olun",
          "Yok olma açısının yeterli olduğunu doğrulayın",
          "Eğri şeklinin güvenli olduğunu görsel olarak değerlendirin"
        ]
      },
      {
        title: "6.3. Dinamik Stabilite ve Enerji Yaklaşımı",
        content: `Dinamik stabilite, geminin dış etkilere karşı direncini enerji bazında değerlendirir.

**Statik vs Dinamik Stabilite**

**Statik Stabilite:**
- Sabit bir açıda geminin dengesini inceler
- GZ değeri tek bir noktada değerlendirilir
- Yavaş gelişen dış etkiler için uygundur

**Dinamik Stabilite:**
- Geminin salınım enerjisini inceler
- GZ eğrisi altındaki alan ile ölçülür
- Ani dış etkiler (dalga, rüzgar, manevra) için geçerlidir

**Enerji Yaklaşımı**
Gemi yattığında:
- Potansiyel enerji değişimi olur
- Bu enerji kinetik enerjiye dönüşür (salınım)
- GZ × dθ integrali yapılan/alınan işi verir

**Dinamik Stabilite Hesabı**
D.S. = Δ × ∫₀^θ GZ × dθ

Bu integral, GZ eğrisinin altında kalan alandır.

**Heeling Moment ve Denge**
Dış bir heeling moment uygulandığında:
1. Gemi, heeling moment = righting moment olana kadar yatar
2. Bu, GZ eğrisi ile heeling arm eğrisinin kesiştiği noktadır
3. Statik denge açısı bu noktada oluşur

**Dinamik Yatma Açısı**
Ani bir etki (dalga vb.) uygulandığında:
- Gemi statik denge açısının ötesine geçer
- GZ eğrisi altı alan, heeling moment alanına eşit olana kadar yatar
- Bu, dinamik yatma açısıdır ve genellikle statik açıdan büyüktür

**Rüzgar Heeling ve Dinamik Stabilite**
IMO Weather Criterion, dinamik stabilite konseptini kullanır:
- Rüzgar heeling moment eğrisi çizilir
- GZ eğrisi ile kesişim noktaları bulunur
- Alan oranları (A1/A2) kontrol edilir`,
        formulas: [
          {
            formula: "D.S. = Δ × ∫₀^θ GZ × dθ",
            description: "Dinamik stabilite formülü"
          },
          {
            formula: "A1 ≥ A2",
            description: "IMO Weather Criterion alan karşılaştırması"
          },
          {
            formula: "Heeling arm = (P × cos²θ × A × h) / (1000 × g × Δ)",
            description: "Rüzgar heeling arm hesabı"
          }
        ],
        keyPoints: [
          "Dinamik stabilite GZ eğrisi altındaki alandır",
          "Ani etkiler dinamik yatma açısına neden olur",
          "IMO Weather Criterion alan oranlarını kontrol eder",
          "Statik açı + güvenlik marjı = Dinamik değerlendirme"
        ],
        warnings: [
          "Ani rüzgar değişiklikleri veya dalga etkileri dinamik yatma yaratır",
          "Statik denge açısı güvenli görünse bile dinamik etki tehlikeli olabilir",
          "Alan oranları yetersizse gemi devrilebilir"
        ]
      },
      {
        title: "6.4. Cross Curves (KN Eğrileri)",
        content: `Cross Curves of Stability, GZ hesaplamasının temelini oluşturan hidrostatik verilerdir.

**KN Değeri Nedir?**
KN, omurgadan (K) kaldırma doğrusuna çizilen dikmenin uzunluğudur. Farklı yatma açıları ve deplasmanlar için önceden hesaplanır.

**KN ve GZ İlişkisi**
GZ = KN - KG × sin(θ)

Bu formül sayesinde:
1. KN değerleri sabit (gemi geometrisine bağlı)
2. Sadece KG bilindiğinde GZ hesaplanabilir
3. Farklı yükleme durumları için hızlı hesaplama

**Cross Curves Tablosu**
Tipik bir Cross Curves tablosu:
- Satırlar: Farklı deplasmanlar
- Sütunlar: Farklı yatma açıları (10°, 20°, 30°, 45°, 60°, 75°, 90°)
- Değerler: KN (metre)

**Cross Curves Grafiği**
Grafikte:
- Yatay eksen: Deplasman
- Dikey eksen: KN değeri
- Her açı için ayrı bir eğri

**Kullanım Prosedürü**
1. Mevcut deplasmanı belirle
2. Her açı için KN değerlerini tablodan/grafikten al
3. GZ = KN - KG × sin(θ) hesapla
4. GZ değerlerini grafiklendirerek GZ eğrisini çiz

**KN Değerlerinin Özellikleri**
- Sadece gemi geometrisine bağlıdır
- Yükleme durumundan bağımsızdır
- Gemi inşa edilirken bir kez hesaplanır
- Stabilite kitapçığında verilir`,
        formulas: [
          {
            formula: "GZ = KN - KG × sin(θ)",
            description: "GZ hesabı (Cross Curves'ten)"
          },
          {
            formula: "KN = KB × sin(θ) + BM × sin(θ) × cos(θ)",
            description: "Yaklaşık KN formülü (küçük açılar)"
          }
        ],
        examples: [
          {
            problem: "Deplasman = 15000 ton için: KN(30°) = 2.5 m. KG = 7.5 m ise 30°'deki GZ?",
            solution: "GZ = KN - KG × sin(θ) = 2.5 - 7.5 × sin(30°) = 2.5 - 7.5 × 0.5 = 2.5 - 3.75 = -1.25 m (Negatif! İnstabil)"
          },
          {
            problem: "Aynı gemi, KG = 5.5 m ile yüklenirse 30°'deki GZ?",
            solution: "GZ = 2.5 - 5.5 × sin(30°) = 2.5 - 2.75 = -0.25 m (Hala negatif ama daha iyi)"
          }
        ],
        keyPoints: [
          "KN değerleri sadece gemi geometrisine bağlıdır",
          "GZ = KN - KG × sin(θ) temel hesap formülüdür",
          "Cross Curves stabilite kitapçığında bulunur",
          "KG ne kadar düşükse GZ o kadar büyük olur"
        ]
      },
      {
        title: "6.5. Wall-Sided Formülü",
        content: `Wall-sided formülü, duvar bordolu (dikey bordolu) gemiler için büyük açılarda GZ hesabı yapılmasına olanak sağlayan analitik bir yaklaşımdır. Bu formül, Cross Curves kullanmadan hızlı GZ tahmini yapmak için kullanılır.

**Wall-Sided Gemi Nedir?**
Duvar bordolu (wall-sided) gemi, su hattı civarındaki borda yüzeylerinin dikey (düşey) olduğu gemidir. Birçok kargo gemisi, tanker ve bulk carrier bu tanıma yakın formlara sahiptir.

**Wall-Sided Formülün Temeli**

Dikey bordalı gemilerde, yatma sırasında:
- Su hattı alanı (Aw) değişmez
- B noktasının yatay hareketi hesaplanabilir
- M noktasının yükselişi analitik olarak ifade edilebilir

**Wall-Sided GZ Formülü**

────────────────────────────
GZ = sin θ × (GM + ½ BM × tan² θ)
────────────────────────────

Burada:
- θ = Yatma açısı
- GM = Metasantrik yükseklik
- BM = Metasantrik yarıçap

**Formülün Açılımı**

Formül iki bileşenden oluşur:

**1. GM Bileşeni: sin θ × GM**
- Küçük açılarda baskın terim
- Standart GZ = GM × sin θ formülüne eşit

**2. BM Bileşeni: ½ × sin θ × BM × tan² θ**
- Büyük açılarda önemli hale gelir
- M noktasının yükselmesinden kaynaklanır
- Pozitif katkı sağlar (GZ'yi artırır)

**Basitleştirilmiş Form**
Küçük açılarda tan θ ≈ sin θ olduğundan:
GZ ≈ sin θ × GM + ½ × sin θ × tan² θ × BM

**Uygulama Sınırları**

Wall-sided formül şu durumlarda geçerlidir:
- Borda yüzeyleri dikeye yakın
- Güverte batmamış
- Yatma açısı < 25-30° (yaklaşık)

**Geçersiz Olduğu Durumlar:**
- Flared (açılı) bordalar
- Tumblehome (içe dönük) bordalar
- Güverte batması
- Çok büyük açılar (> 30°)

**Karşılaştırma: Cross Curves vs Wall-Sided**

| Özellik | Cross Curves | Wall-Sided |
|---------|--------------|------------|
| Doğruluk | Yüksek (tüm açılar) | Sınırlı (küçük-orta açılar) |
| Hesap | Tablo/grafik okuma | Formül |
| Genel geçerlilik | Tüm gemi formları | Sadece dikey bordalı |
| Hız | Yavaş | Hızlı |
| Kullanım | Nihai değerlendirme | Hızlı tahmin |`,
        formulas: [
          {
            formula: "GZ = sin θ × (GM + ½ BM × tan² θ)",
            description: "Wall-sided GZ formülü"
          },
          {
            formula: "GZ ≈ GM × sin θ + ½ BM × sin θ × tan² θ",
            description: "Açılmış form"
          },
          {
            formula: "ΔGZ = ½ BM × sin θ × tan² θ",
            description: "Wall-sided düzeltme terimi"
          }
        ],
        examples: [
          {
            problem: "GM = 1.5 m, BM = 6.0 m. θ = 15° için wall-sided GZ değeri?",
            solution: "GZ = sin 15° × (1.5 + 0.5 × 6.0 × tan² 15°) = 0.259 × (1.5 + 3.0 × 0.0718) = 0.259 × 1.715 = 0.444 m"
          },
          {
            problem: "Aynı gemi için küçük açı formülü ile karşılaştırın.",
            solution: "GZ_küçük_açı = GM × sin θ = 1.5 × 0.259 = 0.389 m. Fark = 0.444 - 0.389 = 0.055 m (Wall-sided formül daha büyük değer verir)"
          }
        ],
        keyPoints: [
          "Wall-sided formül dikey bordalı gemiler içindir",
          "BM terimi büyük açılarda GZ'yi artırır",
          "25-30° üzerinde güvenilirliği azalır",
          "Cross Curves ile doğrulama yapılmalıdır"
        ],
        practicalTips: [
          "Hızlı tahmin için kullanın, nihai değer için Cross Curves",
          "Gemi formunun uygunluğunu değerlendirin",
          "Kritik durumlarda formüle güvenmeyin, hidrostatik veri kullanın"
        ],
        warnings: [
          "Flared veya tumblehome bordalı gemilerde kullanmayın",
          "Güverte batması durumunda geçersiz olur",
          "30° üzeri açılarda sonuçlar yanıltıcı olabilir"
        ]
      },
      {
        title: "6.6. Deck Edge Immersion ve Downflooding Açısı",
        content: `Büyük açılı stabilitede, **pozitif stabilite menzilini** belirleyen kritik sınır çoğu zaman **downflooding (su girişi) açısıdır**. Bu nedenle GZ eğrisi yalnızca geometrik sıfır noktasıyla değil, geminin su almaya başladığı açıyla birlikte değerlendirilmelidir.

**Deck Edge Immersion (Güverte Kenar Batması)**
- Güverte kenar çizgisinin suya değdiği açıdır.
- Bu noktadan sonra güverte üzerindeki açıklıklar daha hızlı su alma riski taşır.
- Gemi formuna bağlı olarak GZ eğrisinin davranışı değişebilir.

**Downflooding Açısı (θdf)**
- Su geçirmez olmayan açıklıkların (kapak, menhol, havalandırma, kapı) su altında kaldığı açıdır.
- Pozitif stabilite menzilinin pratik sınırıdır.
- Stabilite kitapçığında, her yükleme durumu için belirlenir.

**Neden Kritik?**
GZ eğrisi teorik olarak pozitif kalsa bile, downflooding ile su girişi başladığında:
- Serbest yüzey etkisi hızla büyür
- G artar, GZ düşer
- Gerçek stabilite rezervi hızla azalır

**Değerlendirme Prensibi**
- Pozitif stabilite menzili = min(θvanishing, θdf)
- Downflooding açısı düşükse, GZ eğrisi güvenli kabul edilmez

**Operasyonel Sonuç**
- Açıklıkların kapatılması ve denetlenmesi
- Yükleme sırasında freeboard ve trim kontrolü
- GZ eğrisi yorumunda θdf mutlaka referans alınır`,
        keyPoints: [
          "Downflooding açısı, pozitif stabilite menzilinin pratik sınırıdır",
          "Deck edge immersion, su giriş riskinin başladığı erken eşiktir",
          "GZ pozitif olsa bile θdf düşükse stabilite yetersizdir",
          "θdf değeri stabilite kitapçığında yer alır"
        ],
        warnings: [
          "Açıklıklar düzgün kapatılmadıysa θdf fiilen düşer",
          "Düşük freeboard ve aşırı trim, su girişini hızlandırır",
          "Downflooding sonrası GZ eğrisi hızla bozulabilir"
        ],
        practicalTips: [
          "Seyir öncesi tüm su geçirmez kapakları kontrol edin",
          "Trim ve freeboard değerlerini stabilite limitleriyle kıyaslayın",
          "GZ eğrisi yorumunda θdf değerini mutlaka işaretleyin"
        ]
      },
      {
        title: "6.7. Pozitif Stabilite Menzili ve Stabilite Rezervi",
        content: `GZ eğrisi, geminin **pozitif stabilite menzili** ve **stabilite rezervi** hakkında net bilgi sağlar. Bu iki kavram, özellikle büyük açılarda geminin devrilmeye karşı kalan güvenlik payını ifade eder.

**Pozitif Stabilite Menzili**
- GZ'nin pozitif kaldığı açılar aralığıdır.
- Başlangıç 0° kabul edilir.
- Bitiş, **vanishing angle** veya **downflooding açısı**dır (hangisi daha küçükse).

**Stabilite Rezervi (Reserve of Stability)**
- GZ eğrisi altında kalan alan ile temsil edilir.
- Aynı GM’ye sahip iki gemiden, alanı daha büyük olan daha güvenlidir.
- Rezerv, özellikle ağır hava ve ani heeling momentlerine karşı enerji tamponudur.

**IMO Intact Stabilite Kriterleri (Özet)**
- Pozitif stabilite menzili en az 30° (tercihen 40°)
- GZmax ≥ 0.20 m ve genellikle 25° veya üzerindeki bir açıda
- 0°–30° ve 0°–40° alan kriterleri (dinamik stabilite)

**Menzil Değerlendirme**
- Dar menzil = erken devrilme riski
- Geniş menzil = daha iyi güvenlik rezervi
- Downflooding açısı düşükse menzil fiilen daralır

**Operasyonel Uygulama**
- Yükleme durumu değiştikçe menzil ve alan tekrar kontrol edilir
- Serbest yüzey etkisi, menzili görünürde koruyup rezervi azaltabilir`,
        formulas: [
          {
            formula: "θrange = min(θvanishing, θdf)",
            description: "Pozitif stabilite menzili sınırı"
          },
          {
            formula: "A = ∫₀^{θ} GZ × dθ",
            description: "Stabilite rezervi (eğri altı alan)"
          }
        ],
        keyPoints: [
          "Pozitif stabilite menzili, devrilme sınırını gösterir",
          "Stabilite rezervi GZ eğrisi altı alanla değerlendirilir",
          "Downflooding açısı menzili pratikte sınırlar",
          "IMO kriterleri menzil ve alan için minimum şartlar belirler"
        ],
        practicalTips: [
          "Her yükleme durumunda menzil ve alanı birlikte kontrol edin",
          "GZ eğrisi üzerinde θdf ve GZmax noktalarını işaretleyin",
          "Dar menzil varsa operasyonel limitleri sıkılaştırın"
        ],
        warnings: [
          "Menzil yeterli görünse bile alan küçükse dinamik stabilite zayıftır",
          "Serbest yüzey etkisi stabilite rezervini beklenenden fazla düşürebilir",
          "Downflooding açısı düşükse emniyet marjı hızla kaybolur"
        ]
      }
    ]
  },
  {
    id: "section-7",
    title: "Bölüm 7 – Serbest Yüzey Etkisi (Free Surface Effect)",
    icon: "Waves",
    iconColor: "from-cyan-500 to-blue-600",
    description: "Tanklardaki sıvıların stabiliteye etkisi",
    subtopics: [
      {
        title: "7.1. Serbest Yüzey Etkisinin Tanımı",
        content: `Serbest yüzey etkisi (Free Surface Effect - FSE), kısmen dolu tanklardaki sıvıların gemi stabilitesini olumsuz etkilemesidir.

**Temel Kavram**
Bir tank tam dolu veya tamamen boş ise içindeki sıvı sabit bir ağırlık gibi davranır. Ancak tank kısmen dolu ise:
- Gemi yattığında sıvı yüzeyi yatay kalmaya çalışır
- Sıvı, yatılan tarafa doğru akar
- Bu akış, geminin ağırlık merkezini (G) yatılan tarafa kaydırır
- Sonuç olarak doğrultucu moment azalır

**Fiziksel Mekanizma**
1. Gemi θ açısıyla yatar
2. Tank içindeki sıvı yüzeyi yatay kalır
3. Sıvının ağırlık merkezi (g) yatılan tarafa kayar
4. Geminin toplam ağırlık merkezi (G) de kayar
5. GZ (sağlama kolu) azalır

**Sanal KG Artışı (Virtual Rise of G)**
Serbest yüzey etkisi, G'nin sanal olarak yükselmiş gibi davrandığı bir modelle ifade edilir:
- GG₁ = FSM / Δ (G'nin sanal yükselişi)
- GMeff = GM - GG₁ (Efektif GM)

Bu yaklaşım, gerçekte G'nin yükselmediğini ancak stabilitenin sanki G yükselmiş gibi azaldığını gösterir.

**Serbest Yüzey Momenti (FSM)**
FSM = ρₜ × i
- ρₜ: Tank içindeki sıvının yoğunluğu (t/m³)
- i: Tank sıvı yüzeyinin atalet momenti (m⁴)

Dikdörtgen tank için:
i = (l × b³) / 12
- l: Tankın boyuna uzunluğu
- b: Tankın enine genişliği

**Kritik Nokta**
Serbest yüzey etkisi, tankın doluluk oranından bağımsızdır (yaklaşık olarak). İster %10 dolu, ister %90 dolu olsun, etki benzerdir!`,
        formulas: [
          {
            formula: "FSM = ρₜ × i",
            description: "Serbest yüzey momenti (ton·m)"
          },
          {
            formula: "i = (l × b³) / 12",
            description: "Dikdörtgen yüzeyin atalet momenti (m⁴)"
          },
          {
            formula: "GG₁ = FSM / Δ",
            description: "G'nin sanal yükselişi (m)"
          },
          {
            formula: "GMeff = GM - Σ(FSM) / Δ",
            description: "Efektif (düzeltilmiş) GM"
          }
        ],
        examples: [
          {
            problem: "Tank boyutları: 20m × 10m. Deniz suyu (ρ=1.025) ile kısmen dolu. Δ=15000 ton, GM=1.5m. FSM ve GMeff?",
            solution: "i = 20 × 10³ / 12 = 1666.7 m⁴. FSM = 1.025 × 1666.7 = 1708.3 t·m. GG₁ = 1708.3 / 15000 = 0.114 m. GMeff = 1.5 - 0.114 = 1.386 m"
          }
        ],
        keyPoints: [
          "Kısmen dolu tanklar GM'i düşürür",
          "Etki tankın genişliğinin küpü ile orantılıdır",
          "Doluluk oranı (yaklaşık) etkiyi değiştirmez",
          "GMeff = GM - FSM/Δ formülü kullanılır"
        ],
        warnings: [
          "Geniş tanklar çok büyük serbest yüzey etkisi yaratır",
          "Birden fazla kısmen dolu tank etkiyi katlar",
          "Minimum GM hesaplarında serbest yüzey düzeltmesi zorunludur"
        ]
      },
      {
        title: "7.2. Serbest Yüzeyin GM'ye Etkisi",
        content: `Serbest yüzey etkisinin en kritik sonucu, geminin **efektif GM** değerini düşürmesidir. Bu düşüş, geminin sanki ağırlık merkezi yükselmiş gibi davranmasına yol açar.

**Sanal KG Artışı (Virtual Rise of G)**
- Serbest yüzey, G'nin gerçek konumunu değiştirmez.
- Ancak stabilite hesabında G **GG₁ kadar yükselmiş** kabul edilir.
- GG₁ = ΣFSM / Δ

**Efektif GM**
GMeff = GMsolid - GG₁ = GMsolid - ΣFSM / Δ

**Fiziksel Yorum**
Serbest yüzeyli bir tank, yattıkça sıvı kütlesini yana kaydırır. Bu kayma:
- Doğrultma kolunu azaltır
- Yatma hareketini büyütür
- Stabilite rezervini düşürür

**Kritik Eşik**
- GMeff < 0 → Gemi kararsızdır
- GMeff düşük → "yumuşak gemi" ve büyük yalpa
- GMeff sınır değerlerin hemen üzerindeyse → dinamik etkilerle kritik hale gelebilir`,
        formulas: [
          {
            formula: "GG₁ = ΣFSM / Δ",
            description: "Serbest yüzey nedeniyle sanal KG artışı"
          },
          {
            formula: "GMeff = GMsolid - ΣFSM / Δ",
            description: "Efektif GM (serbest yüzey düzeltilmiş)"
          }
        ],
        examples: [
          {
            problem: "GMsolid = 1.20 m, Δ = 12000 ton. Toplam FSM = 1800 t·m ise GMeff kaçtır?",
            solution: "GG₁ = 1800/12000 = 0.15 m. GMeff = 1.20 - 0.15 = 1.05 m"
          }
        ],
        keyPoints: [
          "Serbest yüzey GM'i doğrudan düşürür",
          "GMeff her zaman GMsolid'den küçüktür",
          "ΣFSM/Δ hesabı minimum GM kontrolü için zorunludur",
          "Küçük GM değerlerinde serbest yüzey kritikleşir"
        ],
        warnings: [
          "Serbest yüzey düzeltmesi yapılmayan GM değerleri yanıltıcıdır",
          "Düşük GM + büyük serbest yüzey → hızlı stabilite kaybı"
        ]
      },
      {
        title: "7.3. Free Surface Moment (FSM)",
        content: `Free Surface Moment (FSM), serbest yüzey etkisinin büyüklüğünü nicel olarak ifade eder ve GM düzeltmesinin temelini oluşturur.

**FSM Tanımı**
FSM, kısmen dolu tanktaki sıvı yüzeyinin atalet momenti ile sıvı yoğunluğunun çarpımına eşittir:

FSM = ρₜ × i

**Atalet Momenti (i)**
- Dikdörtgen tank: i = l × b³ / 12
- Trapez tank: i = l × (b₁³ + b₂³ + b₁²b₂ + b₁b₂²) / 48
- Düzensiz şekil: Stabilite kitapçığı tablosundan alınır

**Neden b³?**
Genişlik (b) küp ile girdiği için:
- Geniş tanklarda FSM çok hızlı büyür
- Dar tanklarda FSM dramatik şekilde azalır

**Yoğunluk Etkisi**
- Deniz suyu (ρ ≈ 1.025) > Tatlı su (ρ ≈ 1.000)
- Yakıt (ρ ≈ 0.90–0.98) → FSM biraz daha düşük`,
        formulas: [
          {
            formula: "FSM = ρₜ × i",
            description: "Serbest yüzey momenti (t·m)"
          },
          {
            formula: "i = l × b³ / 12",
            description: "Dikdörtgen yüzey atalet momenti (m⁴)"
          },
          {
            formula: "i = l × (b₁³ + b₂³ + b₁²b₂ + b₁b₂²) / 48",
            description: "Trapez tank atalet momenti (m⁴)"
          }
        ],
        examples: [
          {
            problem: "l=18 m, b=9 m, deniz suyu. FSM?",
            solution: "i = 18 × 9³ / 12 = 18 × 729 / 12 = 1093.5 m⁴. FSM = 1.025 × 1093.5 = 1120.8 t·m"
          }
        ],
        keyPoints: [
          "FSM, serbest yüzey etkisinin büyüklüğünü belirler",
          "FSM, tank genişliğinin küpü ile artar",
          "FSM hesapları GM düzeltmesinin temelidir",
          "Yoğunluk farkı FSM'yi doğrudan etkiler"
        ]
      },
      {
        title: "7.4. Tank Geometrisinin Etkisi",
        content: `Tank geometrisi, serbest yüzey etkisinin şiddetini belirleyen en önemli faktörlerden biridir.

**Genişlik Etkisi (b³)**
- Tank genişliği iki katına çıkarsa FSM **8 kat** artar.
- Bu nedenle geniş sığ tanklar en riskli tanklardır.

**Boyuna Bölmelendirme (Longitudinal Bulkhead)**
- Geniş tankları boyuna bölmek FSM'yi dramatik biçimde düşürür.
- n adet eşit parçaya bölünürse: FSMtoplam = FSMorijinal / n²

**Şekil Etkisi**
- Dar ve derin tanklar avantajlıdır
- V veya trapez kesitler serbest yüzey alanını azaltır
- Orta hat yakınındaki tanklar, enine momentleri küçültür

**Kısmi Doluluk Etkisi**
- Serbest yüzey etkisi, doluluk oranına göre sınırlı değişir
- En kritik durum genellikle yarı doludur
- Çok düşük veya çok yüksek dolulukta etkisi biraz azalır`,
        formulas: [
          {
            formula: "FSMn = FSM0 / n²",
            description: "n parçaya bölünmüş tankta toplam FSM"
          },
          {
            formula: "FSM ∝ b³",
            description: "Tank genişliği etkisi"
          }
        ],
        keyPoints: [
          "Genişlik FSM üzerinde belirleyici parametredir",
          "Boyuna bölmeler FSM'yi hızlı düşürür",
          "Dar ve derin tanklar serbest yüzey için daha güvenlidir",
          "Tank geometrisi tasarım aşamasında kritik bir karardır"
        ],
        practicalTips: [
          "Geniş tankları mümkün olduğunca bölün",
          "Balast ve yakıt tanklarını dar-dik tasarlayın",
          "Kısmi doluluk sürelerini operasyonla minimize edin"
        ],
        warnings: [
          "Geniş sığ tanklar stabiliteyi hızla düşürür",
          "Bölmesiz geniş tanklar özellikle Ro-Ro ve tankerlerde kritik risk yaratır"
        ]
      },
      {
        title: "7.5. Birden Fazla Tankın Etkisi",
        content: `Bir gemide aynı anda birden fazla kısmen dolu tank varsa, toplam serbest yüzey etkisi **toplam FSM** ile hesaplanır.

**Toplam FSM**
ΣFSM = FSM₁ + FSM₂ + FSM₃ + ...

**Efektif GM**
GMeff = GMsolid - ΣFSM / Δ

**Farklı Yoğunluklar**
- Deniz suyu, tatlı su, yakıt ve yağın yoğunluğu farklıdır
- Her tank için ρ değeri ayrı kullanılmalıdır

**Çapraz Bağlı Tanklar (Cross-Connected)**
- Birleştirilmiş tanklar, tek geniş tank gibi davranır
- FSM dramatik şekilde artar
- Bu nedenle seferde cross-connection genellikle istenmez

**Operasyonel Sonuç**
- Aynı anda birçok tankı kısmen doldurmak GM'i hızla düşürür
- Bu nedenle “tek tankı tam kullanma” prensibi uygulanır`,
        formulas: [
          {
            formula: "ΣFSM = FSM₁ + FSM₂ + ...",
            description: "Toplam serbest yüzey momenti"
          },
          {
            formula: "GMeff = GMsolid - ΣFSM / Δ",
            description: "Toplam serbest yüzey düzeltmesi"
          }
        ],
        examples: [
          {
            problem: "FSM değerleri 600, 450 ve 300 t·m olan üç tank varsa toplam FSM nedir?",
            solution: "ΣFSM = 600 + 450 + 300 = 1350 t·m"
          }
        ],
        keyPoints: [
          "Toplam serbest yüzey etkisi tankların toplamıdır",
          "Farklı yoğunluklar ayrı ayrı hesaba katılmalıdır",
          "Cross-connection FSM'yi büyütür",
          "Çoklu kısmi doluluk yüksek risk yaratır"
        ],
        warnings: [
          "Birden fazla kısmen dolu tank GM'i kritik seviyeye düşürebilir",
          "Cross-connection sırasında stabilite mutlaka yeniden hesaplanmalıdır"
        ]
      },
      {
        title: "7.6. Serbest Yüzey Etkisini Azaltma Yöntemleri",
        content: `Serbest yüzey etkisi, çeşitli tasarım ve operasyonel önlemlerle azaltılabilir.

**Tasarım Önlemleri**

**1. Tank Bölmelendirmesi**
En etkili yöntem, geniş tankları boyuna ara bölmelerle (longitudinal bulkhead) bölmektir:
- Orijinal genişlik b ise, 2 bölme sonrası her parça b/2 genişliğinde
- i = l × (b/2)³ / 12 = l × b³ / (12 × 8) = orijinal i / 8
- 2 bölme = Toplam FSM 1/4'e düşer!

**n adet eşit parçaya bölünürse:**
Toplam FSM = Orijinal FSM / n²

**2. Tank Şekli Optimizasyonu**
- Kare yerine dikdörtgen kesit (enine dar)
- Geminin orta hattına yakın yerleşim
- V veya trapez şekilli tanklar

**Operasyonel Önlemler**

**1. Tankları Tam Doldurun veya Boşaltın**
- Tam dolu tank → Serbest yüzey yok
- Boş tank → Serbest yüzey yok
- Kısmen dolu tank sayısını minimize edin

**2. Derin Tankları Tercih Edin**
- Geniş sığ tank yerine dar derin tank kullanın
- Genişlik (b) etkiyi en çok artıran parametredir

**3. Sıralı Tank Kullanımı**
- Birden fazla tank yerine tek bir tankı tam kullanın
- Tüketim için sıralı sistem uygulayın:
  * Bir tankı tamamen tükettikten sonra diğerine geçin

**4. Transfer Pompaları**
- Gerektiğinde sıvıları transfer ederek tam doluluk sağlayın
- Dengeleme amacıyla stratejik transferler yapın

**Dikkat Edilecek Noktalar**
- Yakıt tankları seyir boyunca kısmen dolu olur (kaçınılmaz)
- Balast operasyonlarında geçiş süreleri
- Yük tankları (tankerler) için özel dikkat`,
        formulas: [
          {
            formula: "FSMbölünmüş = FSMorijinal / n²",
            description: "n adet boyuna bölme sonrası toplam FSM"
          },
          {
            formula: "FSM2bölme = FSM / 4",
            description: "2 bölme ile toplam FSM 1/4'e düşer"
          }
        ],
        examples: [
          {
            problem: "Tek bir tank FSM = 2000 t·m. Ortadan boyuna bölme yapılırsa yeni toplam FSM?",
            solution: "2 bölme = n² = 4. FSMyeni = 2000 / 4 = 500 t·m (4 kat azalma!)"
          }
        ],
        keyPoints: [
          "Boyuna bölme FSM'yi n² oranında azaltır",
          "Tankları tam doldurun veya tamamen boşaltın",
          "Geniş tanklar yerine dar derin tanklar tercih edin",
          "Sıralı tank kullanımı uygulayın"
        ],
        practicalTips: [
          "Yükleme planı yaparken minimum kısmen dolu tank hedefleyin",
          "Yakıt tüketimini sıralı tank sistemiyle planlayın",
          "Balast operasyonlarını GM üzerindeki etkiyi düşünerek yapın",
          "Her durumda GMeff değerini kontrol edin"
        ]
      },
      {
        title: "7.7. Serbest Yüzey Düzeltmesi Hesaplamaları",
        content: `Serbest yüzey düzeltmesi, tüm stabilite hesaplamalarında uygulanması gereken kritik bir düzeltmedir.

**Genel Hesap Prosedürü**

**Adım 1: Her Tank İçin FSM Hesabı**
Her kısmen dolu tank için:
FSM = ρₜ × i

Atalet momenti (i) hesabı:
- Dikdörtgen tank: i = l × b³ / 12
- Trapez tank: i = l × (b₁³ + b₂³ + b₁²b₂ + b₁b₂²) / 48
- Düzensiz şekil: Stabilite kitapçığındaki tablolardan

**Adım 2: Toplam FSM**
Tüm kısmen dolu tankların FSM değerleri toplanır:
ΣFSM = FSM₁ + FSM₂ + FSM₃ + ...

**Adım 3: G'nin Sanal Yükselişi**
GG₁ = ΣFSM / Δ

**Adım 4: Efektif GM**
GMeff = GMsolid - GG₁ = GMsolid - ΣFSM / Δ

**Önemli Notlar**
1. **GMsolid:** Serbest yüzey yok sayılarak hesaplanan GM
2. **GMfluid (GMeff):** Serbest yüzey düzeltmesi yapılmış GM
3. IMO kriterleri her zaman GMeff değerini kontrol eder

**Örnek Hesap Tablosu**

| Tank | Boyut (l×b) | ρ (t/m³) | i (m⁴) | FSM (t·m) |
|------|-------------|----------|--------|-----------|
| No.1 DB | 15×8 | 1.025 | 640 | 656 |
| No.2 DB | 15×8 | 1.025 | 640 | 656 |
| FO Tank | 10×6 | 0.95 | 180 | 171 |
| **Toplam** | | | | **1483** |

Δ = 12000 ton, GMsolid = 1.20 m ise:
GG₁ = 1483 / 12000 = 0.124 m
GMeff = 1.20 - 0.124 = 1.076 m`,
        formulas: [
          {
            formula: "GMeff = GMsolid - ΣFSM / Δ",
            description: "Efektif GM hesabı"
          },
          {
            formula: "idikdörtgen = l × b³ / 12",
            description: "Dikdörtgen tank atalet momenti"
          },
          {
            formula: "FSM = ρₜ × l × b³ / 12",
            description: "Dikdörtgen tank için FSM (birleşik formül)"
          }
        ],
        examples: [
          {
            problem: "Gemi: Δ=20000 ton, GMsolid=1.5m. Tanklar: Tank A (20×12m, HFO ρ=0.95), Tank B (15×10m, SW ρ=1.025). GMeff?",
            solution: "iA = 20×12³/12 = 2880 m⁴, FSMA = 0.95×2880 = 2736 t·m. iB = 15×10³/12 = 1250 m⁴, FSMB = 1.025×1250 = 1281 t·m. ΣFSM = 4017 t·m. GG₁ = 4017/20000 = 0.201 m. GMeff = 1.5 - 0.201 = 1.299 m"
          }
        ],
        keyPoints: [
          "Her kısmen dolu tank için ayrı FSM hesaplanır",
          "Toplam FSM tüm tankların toplamıdır",
          "GMeff = GMsolid - ΣFSM/Δ",
          "IMO kriterleri GMeff değerini kontrol eder"
        ],
        warnings: [
          "Serbest yüzey düzeltmesi yapılmamış GM değerleri yanıltıcıdır",
          "Birden fazla kısmen dolu tank toplamı büyük olabilir",
          "Yağ, yakıt, su farklı yoğunluklara sahiptir - doğru ρ kullanın"
        ]
      }
    ]
  },
  {
    id: "section-8",
    title: "Bölüm 8 – Boyuna Stabilite ve Trim",
    icon: "Ship",
    iconColor: "from-violet-500 to-purple-600",
    description: "Boyuna denge, trim hesaplamaları ve MCT kavramı",
    subtopics: [
      {
        title: "8.1. Boyuna Stabilitenin Temelleri",
        content: `Boyuna stabilite, geminin baş-kıç yönündeki denge durumunu ve trim değişimlerini inceler.

**Boyuna vs Enine Stabilite**
- **Enine stabilite:** İskele-sancak yönü, GM ile ölçülür
- **Boyuna stabilite:** Baş-kıç yönü, GML ile ölçülür
- GML >> GM (boyuna stabilite çok daha büyüktür)

**Neden GML Çok Büyük?**
- Gemiler genellikle boyuna yönde çok daha uzundur (L >> B)
- Su hattı alanının boyuna atalet momenti (IL) çok büyüktür
- BML = IL / ∇ değeri çok büyük olur
- Tipik olarak GML = 50-200 m (GM = 0.5-2 m iken)

**Boyuna Stabilitenin Önemi**
Boyuna stabilite, trim değişimlerini hesaplamak için kullanılır:
- Yük yerleşimi planlaması
- Yakıt/balast yönetimi
- Draft kontrolü
- Pervane ve dümen verimliliği

**Trim ve Önemi**
Trim, baş ve kıç draftları arasındaki farktır:
- Trim = TA - TF
- Pozitif: Kıça trim (stern trim)
- Negatif: Başa trim (bow trim)
- Sıfır: Even keel (düz omurga)

**İstenen Trim Durumu**
- Çoğu yük gemisi için hafif kıça trim tercih edilir
- Pervane verimliliği için yeterli kıç batması gerekir
- Aşırı başa trim görüş ve dalga vuruşu sorunları yaratır
- Aşırı kıça trim pervane ve dümen problemlerine yol açar`,
        formulas: [
          {
            formula: "GML = KML - KG",
            description: "Boyuna metasantrik yükseklik"
          },
          {
            formula: "BML = IL / ∇",
            description: "Boyuna metasantrik yarıçap"
          },
          {
            formula: "Trim = TA - TF",
            description: "Trim tanımı (m)"
          }
        ],
        keyPoints: [
          "Boyuna stabilite (GML) enine stabiliteden (GM) çok büyüktür",
          "Trim, baş ve kıç draft farkıdır",
          "Hafif kıça trim genellikle tercih edilir",
          "Yük yerleşimi trim'i doğrudan etkiler"
        ]
      },
      {
        title: "8.2. LCG – LCB İlişkisi ve Trim Momenti",
        content: `Boyuna dengede temel belirleyici, **LCG (Boyuna Ağırlık Merkezi)** ile **LCB (Boyuna Kaldırma Merkezi)** arasındaki farktır.

**LCG ve LCB Nedir?**
- **LCG (Longitudinal Center of Gravity):** Gemideki tüm ağırlıkların boyuna ağırlık merkezi.
- **LCB (Longitudinal Center of Buoyancy):** Su hattı altındaki hacmin boyuna kaldırma merkezi.

**Denge Prensibi**
Even keel (düz omurga) için:
- **LCG ≈ LCB** olmalıdır.
- LCG ile LCB arasındaki fark trim momenti doğurur.

**Trim Momenti (Trimming Moment)**
Trimming moment = Δ × (LCG - LCB)
Bu moment, gemiyi başa veya kıça yatırır.

**Trim Yönü**
- **LCG LCB’nin önünde ise:** Gemi **başa trim** yapar.
- **LCG LCB’nin gerisinde ise:** Gemi **kıça trim** yapar.

> Not: İşaret kuralı, gemi kitabı ve hidrostatik tabloların referansına göre değişebilir. Hesapta kullanılan eksen yönünü mutlaka kontrol edin.

**Trim Hesabına Etkisi**
Trim (cm) = Trimming moment / MCT1cm
Bu ilişki, LCG-LCB farkının trim değerine nasıl dönüştüğünü gösterir.

**Pratik Önemi**
- Yük dağılımı ile LCG’yi kontrol etmek, trim yönetiminin temelidir.
- Yakıt tüketimi, kargo hareketi veya balast transferi LCG’yi değiştirir; bu da trim’i etkiler.`,
        formulas: [
          {
            formula: "Trimming moment = Δ × (LCG - LCB)",
            description: "LCG-LCB farkından doğan trim momenti (t·m)"
          },
          {
            formula: "Trim (cm) = Trimming moment / MCT1cm",
            description: "Trim hesabı (cm)"
          }
        ],
        examples: [
          {
            problem: "Δ=18000 ton, LCG midship’ten 1.2 m başta, LCB midship’ten 0.4 m kıçta. MCT1cm=200 t·m/cm. Trim nedir?",
            solution: "LCG-LCB farkı = 1.2 - (-0.4) = 1.6 m (LCG önde). Trimming moment = 18000 × 1.6 = 28800 t·m. Trim = 28800 / 200 = 144 cm başa."
          }
        ],
        keyPoints: [
          "Even keel için LCG ≈ LCB olmalıdır",
          "LCG-LCB farkı trim momenti doğurur",
          "Trim yönü LCG’nin LCB’ye göre konumuna bağlıdır",
          "Trim hesabında MCT1cm kullanılır"
        ],
        practicalTips: [
          "Hidrostatik tablolarda LCB referansını doğrulayın",
          "LCG’yi yükleme planıyla hedeflenen trim’e yaklaştırın",
          "Yakıt tüketimi ve balast transferlerini trim hesabına dahil edin"
        ]
      },
      {
        title: "8.3. MCT (Moment to Change Trim) Kavramı",
        content: `MCT, trim hesaplamalarında kullanılan temel parametredir ve 1 cm trim değişimi için gereken momenti ifade eder.

**MCT Tanımı**
MCT1cm (veya MCTC), geminin trim'ini 1 cm değiştirmek için gereken momenttir (ton-metre).

**MCT Formülü**
MCT1cm = (Δ × GML) / (100 × L)

Burada:
- MCT1cm: Moment (t·m/cm)
- Δ: Deplasman (ton)
- GML: Boyuna metasantrik yükseklik (m)
- L: Geminin boyu (m)
- 100: cm → m dönüşümü

**Alternatif Formül**
MCT1cm = (Δ × BML) / (100 × L) (KG etkisi küçük olduğu için yaklaşık)

**MCT'nin Özellikleri**
- Deplasmanla değişir
- Hidrostatik tablolardan alınır
- Gemi ne kadar büyükse MCT o kadar büyük
- Trim hesaplarında temel çarpan

**MCT Kullanımı**
Trim değişimi = Trimming moment / MCT1cm

Örneğin:
- 1000 t·m moment uygularsanız
- MCT1cm = 200 t·m/cm ise
- Trim değişimi = 1000 / 200 = 5 cm

**Trimming Moment**
Trimming moment = w × d
- w: Taşınan/eklenen ağırlık (ton)
- d: LCF'ye (yüzme merkezine) göre boyuna mesafe (m)

LCF'nin önüne ağırlık → Başa trim
LCF'nin arkasına ağırlık → Kıça trim`,
        formulas: [
          {
            formula: "MCT1cm = (Δ × GML) / (100 × L)",
            description: "MCT hesabı"
          },
          {
            formula: "Trim değişimi = Trimming moment / MCT1cm",
            description: "Trim değişimi hesabı (cm)"
          },
          {
            formula: "Trimming moment = w × d",
            description: "Trimming moment (t·m)"
          }
        ],
        examples: [
          {
            problem: "Δ=15000 ton, GML=150 m, L=120 m. MCT1cm kaçtır?",
            solution: "MCT1cm = (15000 × 150) / (100 × 120) = 2250000 / 12000 = 187.5 t·m/cm"
          },
          {
            problem: "MCT1cm = 200 t·m/cm. 300 ton yük, LCF'nin 15 m önüne konursa trim değişimi?",
            solution: "Moment = 300 × 15 = 4500 t·m. Trim değişimi = 4500 / 200 = 22.5 cm başa trim"
          }
        ],
        keyPoints: [
          "MCT1cm, 1 cm trim için gereken momenttir",
          "Hidrostatik tablolardan alınır veya formülle hesaplanır",
          "Trim değişimi = Moment / MCT",
          "LCF konumu trim yönünü belirler"
        ]
      },
      {
        title: "8.4. Trim Hesaplamaları",
        content: `Trim hesaplamaları, yükleme planlamasının en önemli parçalarından biridir.

**Temel Trim Hesabı**

**Adım 1: Trimming Moment Hesabı**
Her ağırlık değişikliği için:
Moment = w × (x - LCF)

- w: Ağırlık (ton) - pozitif ekleme, negatif çıkarma
- x: Ağırlığın boyuna konumu (midship'ten)
- LCF: Yüzme merkezi konumu (midship'ten)

**Adım 2: Net Trimming Moment**
Tüm momentlerin cebirsel toplamı:
ΣM = M₁ + M₂ + M₃ + ...

**Adım 3: Trim Değişimi**
ΔTrim = ΣM / MCT1cm (cm)

**Adım 4: Baş ve Kıç Draft Değişimleri**
- ΔTF = ΔTrim × (L - LCF_from_aft) / L
- ΔTA = ΔTrim × (LCF_from_aft) / L

Veya yaklaşık olarak trim değişimi baş ve kıç arasında orantılı dağılır.

**Draft Sonrası Paralel Batma**
Toplam ağırlık değişikliği paralel batmaya da neden olur:
ΔDraftparalel = Σw / TPC

Bu da baş ve kıç draftlarına eklenir.

**Toplam Draft Değişimleri**
Final TF = Initial TF + ΔDraftparalel + ΔTF
Final TA = Initial TA + ΔDraftparalel + ΔTA

**LCF (Longitudinal Center of Flotation)**
- Su hattı alanının geometrik merkezi
- Trim değişiminin pivot noktası
- Hidrostatik tablolardan alınır
- Deplasmana göre değişir`,
        formulas: [
          {
            formula: "ΔTrim = ΣM / MCT1cm",
            description: "Toplam trim değişimi (cm)"
          },
          {
            formula: "ΔTF = ΔTrim × da / L",
            description: "Baş draft değişimi (da: LCF'nin kıçtan mesafesi)"
          },
          {
            formula: "ΔTA = ΔTrim × df / L",
            description: "Kıç draft değişimi (df: LCF'nin baştan mesafesi)"
          }
        ],
        examples: [
          {
            problem: "L=100m, LCF midship'ten 2m kıçta. MCT=150 t·m/cm, TPC=20 t/cm. 200 ton yük midship'ten 30m başa alınıyor. TF=6.0m, TA=7.0m idi. Yeni draftlar?",
            solution: "Moment = 200 × (30 - (-2)) = 200 × 32 = 6400 t·m (başa). ΔTrim = 6400/150 = 42.7 cm başa. LCF kıçtan 48m (midship'ten -2m). ΔTF = 42.7 × 48/100 = 20.5 cm batma. ΔTA = 42.7 × 52/100 = 22.2 cm yükselme. Paralel = 200/20 = 10 cm. TF = 6.0 + 0.10 + 0.205 = 6.305 m. TA = 7.0 + 0.10 - 0.222 = 6.878 m"
          }
        ],
        keyPoints: [
          "Trim değişimi = Moment / MCT",
          "LCF trim değişiminin pivot noktasıdır",
          "Baş ve kıç draft değişimleri LCF konumuna göre orantılanır",
          "Paralel batma da dikkate alınmalıdır"
        ],
        practicalTips: [
          "Yükleme planında trim hedefini belirleyin",
          "Ağırlıkları LCF'ye göre dengeleyerek istenen trim'e ulaşın",
          "Seyir boyunca yakıt tüketiminin trim'e etkisini hesaplayın",
          "Balast transferleri ile trim ayarı yapın"
        ]
      },
      {
        title: "8.5. Yükleme Planlaması ve Trim Optimizasyonu",
        content: `Doğru yükleme planlaması, güvenli ve verimli seyir için kritik öneme sahiptir.

**Yükleme Planlamasının Amaçları**
1. Güvenli stabilite (GM) sağlamak
2. İstenen trim'e ulaşmak
3. Yapısal yükleri sınırlamak
4. Operasyonel verimliliği artırmak

**Trim Optimizasyonu**
**İdeal Trim Durumu:**
- Hafif kıça trim (0.5-1.5 m) genellikle tercih edilir
- Pervane verimliliği için yeterli batış
- Aşırıya kaçmamak önemli

**Başa Trim'in Dezavantajları:**
- Pruvada dalga vuruşu (slamming) riski
- Köprüden görüş kaybı
- Çapada zorluk

**Aşırı Kıça Trim'in Dezavantajları:**
- Pervane kavitasyonu
- Dümen verimliliği azalması
- Yakıt tüketimi artışı

**Yükleme Sıralaması**
1. Lightship verilerini al
2. Yük ve yakıt miktarlarını belirle
3. Ağırlıkları dağıt (GM ve trim hedeflerine göre)
4. Stabilite hesabı yap (GMeff kontrolü)
5. Trim hesabı yap
6. Gerekirse düzenleme yap
7. Yapısal kontroller (shearing force, bending moment)

**Balast Kullanımı**
Balast, trim ve stabiliteyi ayarlamak için ana araçtır:
- Ön tanklara balast → Başa trim azalır
- Arka tanklara balast → Kıça trim azalır
- Derin tanklara balast → GM artar
- Üst tanklara balast → GM azalır (sert gemiyi yumuşatır)

**Dinamik Değişimler**
Seyir boyunca:
- Yakıt tüketimi → Draft ve trim değişir
- Balast transferleri gerekebilir
- Periyodik stabilite/trim kontrolü yapılmalı`,
        keyPoints: [
          "Yükleme planı hem stabilite hem trim için optimize edilmeli",
          "Hafif kıça trim genellikle idealdir",
          "Balast transferleri trim ayarı için kullanılır",
          "Seyir boyunca değişimler izlenmelidir"
        ],
        practicalTips: [
          "Kalkış, varış ve ara durumlarda trim hesabı yapın",
          "Yakıt tüketim planını trim değişimleri ile birlikte değerlendirin",
          "Deniz durumuna göre trim tercihlerini ayarlayın",
          "Yükleme bilgisayarını aktif olarak kullanın"
        ],
        warnings: [
          "Aşırı trim yapısal hasara yol açabilir",
          "Yanlış trim yakıt tüketimini artırır",
          "Trim ile birlikte stabiliteyi de kontrol edin"
        ]
      },
      {
        title: "8.6. LCF ve Draft Düzeltmeleri",
        content: `LCF (Longitudinal Center of Flotation), trim hesaplamalarında kritik öneme sahip bir referans noktasıdır. Draft düzeltmeleri, perpendikülerdeki gerçek draft değerlerinin belirlenmesi için gereklidir.

**LCF (Boyuna Yüzme Merkezi) Nedir?**
LCF, su hattı alanının boyuna ağırlık merkezidir. Gemi trim yaptığında, pivota noktası LCF'dir - yani gemi bu nokta etrafında döner.

**LCF'nin Fiziksel Anlamı**
- LCF'ye ağırlık eklenirse: Sadece paralel batma olur (trim değişmez)
- LCF'nin önüne ağırlık: Başa trim
- LCF'nin arkasına ağırlık: Kıça trim

**LCF Konumu**
LCF genellikle hidrostatik tablolardan okunur:
- Deplasmanla değişir
- Tipik olarak mastorinin (orta kesitin) biraz arkasında
- Baş veya kıç perpendikülerden mesafe olarak ifade edilir

**Draft Düzeltmeleri**

**Neden Düzeltme Gerekli?**
Draft markaları genellikle perpendikülerlerde (FP ve AP) değildir:
- Baş draft markası: FP'nin biraz gerisinde
- Kıç draft markası: AP'nin biraz önünde
- Orta draft markası: Mastori bölgesinde

**Düzeltme Formülü:**

────────────────────────────
Düzeltme = (Mesafe × Trim) / LBP
────────────────────────────

Burada:
- Mesafe = Draft markası ile perpendikül arasındaki mesafe
- Trim = Mevcut trim (m)
- LBP = Perpendiküleler arası uzunluk

**Perpendikülerdeki Draft Hesabı**

**Baş Draft (FP'de):**
TFP = Tokunan ± (dbaş × Trim / LBP)

**Kıç Draft (AP'de):**
TAP = Tokunan ± (dkıç × Trim / LBP)

İşaret kuralı:
- Marka perpendikülün içinde ise: Kıça trimde (+), başa trimde (-)
- Marka perpendikülün dışında ise: Kıça trimde (-), başa trimde (+)

**Mean Draft Hesabı**

**True Mean Draft (LCF'deki):**
Tmean = TFP + (LCF × Trim / LBP)

veya

Tmean = (TFP + TAP) / 2 + (LCF - LBP/2) × Trim / LBP

**Draft Survey'de Kullanım**
Draft survey hesaplarında:
1. Tüm draft okumaları düzeltilir
2. Perpendikülerdeki değerler bulunur
3. True mean draft hesaplanır
4. Hidrostatik tablolardan deplasman okunur`,
        formulas: [
          {
            formula: "Düzeltme = (Mesafe × Trim) / LBP",
            description: "Draft düzeltme formülü"
          },
          {
            formula: "Tmean = TFP + (LCF × Trim / LBP)",
            description: "LCF'deki ortalama draft"
          },
          {
            formula: "Tcorrected = Tokunan ± (d × Trim / LBP)",
            description: "Perpendikülde düzeltilmiş draft"
          }
        ],
        examples: [
          {
            problem: "LBP = 180 m, LCF = 85 m (AP'den). Baş draft markası FP'nin 3 m gerisinde. Okunan baş draft = 6.20 m, kıç draft = 7.80 m. Düzeltilmiş baş draftı bulun.",
            solution: "Trim = 7.80 - 6.20 = 1.60 m (kıç trimli). Düzeltme = (3 × 1.60) / 180 = 0.027 m. Marka içeride, kıça trim → TFP = 6.20 + 0.027 = 6.227 m"
          }
        ],
        keyPoints: [
          "LCF trim hareketinin pivot noktasıdır",
          "Draft markaları genellikle perpendikülerlerde değildir",
          "Düzeltme = (Mesafe × Trim) / LBP",
          "True mean draft LCF konumunda hesaplanır"
        ],
        practicalTips: [
          "Draft survey öncesi marka konumlarını öğrenin",
          "Trim'in işaretine dikkat edin",
          "Hesapları sistematik tablo formatında yapın",
          "Hidrostatik tablolardaki referans noktalarını kontrol edin"
        ],
        warnings: [
          "Düzeltme yapılmayan draftlar hatalı deplasman verir",
          "LCF deplasmanla değişir - doğru değeri kullanın",
          "Büyük trimlerde düzeltmeler önemli boyutlara ulaşır"
        ]
      }
    ]
  },
  {
    id: "section-9",
    title: "Bölüm 9 – Hasarlı Stabilite (Damage Stability)",
    icon: "Shield",
    iconColor: "from-red-500 to-rose-600",
    description: "Su girişi sonrası stabilite ve batmayı önleme",
    subtopics: [
      {
        title: "9.1. Hasarlı Stabilite Kavramı",
        content: `Hasarlı stabilite, geminin bir veya daha fazla bölmesinin su ile dolması sonrası stabilitesini inceler.

**Neden Hasarlı Stabilite?**
Gemiler çeşitli nedenlerle hasara uğrayabilir:
- Çarpışma (collision)
- Karaya oturma (grounding)
- Yapısal hasar (structural failure)
- Aşırı hava koşulları
- Yangın/patlama

Su girişi sonrası:
- Deplasman artar
- Ağırlık merkezi değişir
- Draft ve trim değişir
- Stabilite azalır
- Batma/devrilme riski oluşur

**Hasarlı Stabilite Hesap Yöntemleri**
İki ana yöntem vardır:

**1. Kayıp Kaldırma Kuvveti Yöntemi (Lost Buoyancy Method)**
- Su basan bölme "kaybolmuş" kabul edilir
- Gemi daha az hacimle yüzmeye çalışır
- Hasar görmüş bölmenin kaldırma kuvveti kaybedilir
- Draft ve trim, yeni dengeye ulaşana kadar değişir

**2. Eklenen Ağırlık Yöntemi (Added Weight Method)**
- Basan su, eklenen ağırlık olarak hesaplanır
- Gemi deplasman artışı ile tepki verir
- Daha sezgisel ama karmaşık durumlar için zor

**Permeabilite (μ) Kavramı**
Hasar görmüş bölmenin tamamı su ile dolmaz:
- Bölme içindeki yapılar, yük vb. yer kaplar
- Permeabilite = Dolabilecek hacim / Toplam hacim

Tipik permeabilite değerleri:
- Boş bölme: μ ≈ 0.97
- Makine dairesi: μ ≈ 0.85
- Yük ambarı (genel kargo): μ ≈ 0.60
- Yük ambarı (konteyner): μ ≈ 0.70
- Yaşam mahalleri: μ ≈ 0.95`,
        formulas: [
          {
            formula: "Dolacak su = Bölme hacmi × μ × ρ",
            description: "Bölmeye girecek su miktarı"
          },
          {
            formula: "Yeni Δ = Eski Δ + Basan su ağırlığı",
            description: "Eklenen ağırlık yöntemi"
          }
        ],
        keyPoints: [
          "Hasarlı stabilite su girişi sonrası durumu değerlendirir",
          "Kayıp kaldırma ve eklenen ağırlık iki ana yöntemdir",
          "Permeabilite bölmenin ne kadar dolacağını belirler",
          "SOLAS hasarlı stabilite kriterlerini zorunlu kılar"
        ],
        warnings: [
          "Hasarlı stabilite yetersizse gemi batabilir",
          "Birden fazla bölme hasarı çok tehlikelidir",
          "Asimetrik hasar devrilmeye yol açabilir"
        ]
      },
      {
        title: "9.2. Hasarlı Stabilite Hesabı",
        content: `Hasarlı stabilite hesabı, geminin su alması durumunda hayatta kalabilirliğini değerlendirir.

**Kayıp Kaldırma Kuvveti Yöntemi (Detaylı)**

**Adım 1: Hasar Senaryosunu Belirle**
- Hangi bölme(ler) hasar görmüş?
- Bölme boyutları ve konumu?
- Permeabilite değeri?

**Adım 2: Kaybedilen Hacmi Hesapla**
Vlost = Bölme hacmi × μ

**Adım 3: Yeni Dengeyi Bul**
Gemi, kaybedilen kaldırma kuvvetini telafi etmek için batar:
- Draft artar
- Trim değişir (asimetrik hasar ise)
- Yeni su hattı oluşur

**Adım 4: Yeni Stabiliteyi Hesapla**
- Yeni KM (artmış draft için)
- Yeni KG (serbest yüzey dahil)
- Yeni GM = KM - KG

**Adım 5: GZ Eğrisini Çiz**
- Hasarlı durum için GZ değerleri
- IMO hasarlı stabilite kriterlerini kontrol et

**Eklenen Ağırlık Yöntemi (Detaylı)**

**Adım 1: Basan Su Ağırlığını Hesapla**
wsu = Vbölme × μ × ρsu

**Adım 2: Su'nun Ağırlık Merkezini Belirle**
- kg (dikey)
- lcg (boyuna)
- tcg (enine) - asimetrik hasar için

**Adım 3: Yeni Deplasman ve KG**
Δyeni = Δeski + wsu
KGyeni = (Δeski × KGeski + wsu × kgsu) / Δyeni

**Adım 4: Serbest Yüzey Etkisi**
Hasar görmüş bölme serbest yüzey etkisi yaratabilir:
FSM = ρ × i (bölme yüzeyi için)
GMeff = GM - FSM / Δ

**Adım 5: Stabilite Kontrolü**
IMO hasarlı stabilite kriterlerini kontrol et`,
        formulas: [
          {
            formula: "Vlost = Bölme hacmi × μ",
            description: "Kaybedilen kaldırma hacmi"
          },
          {
            formula: "KGyeni = (Δeski × KGeski + wsu × kgsu) / Δyeni",
            description: "Yeni KG hesabı (eklenen ağırlık yöntemi)"
          },
          {
            formula: "GMhasarlı = KMyeni - KGyeni - FSM / Δyeni",
            description: "Hasarlı GM hesabı"
          }
        ],
        examples: [
          {
            problem: "Gemi Δ=10000 ton, KG=7.5m. 1000 m³ bölme (μ=0.85) su aldı. Su merkezi kg=3m. Yeni KG?",
            solution: "wsu = 1000 × 0.85 × 1.025 = 871 ton. Δyeni = 10871 ton. KGyeni = (10000×7.5 + 871×3) / 10871 = 77613 / 10871 = 7.14 m (düştü - su aşağıda olduğu için)"
          }
        ],
        keyPoints: [
          "İki yöntem de aynı sonucu verir",
          "Permeabilite bölme tipine göre değişir",
          "Serbest yüzey etkisi hasarlı durumda da uygulanır",
          "Asimetrik hasar devrilme riski yaratır"
        ]
      },
      {
        title: "9.3. SOLAS Hasarlı Stabilite Gereksinimleri",
        content: `SOLAS (Safety of Life at Sea) konvansiyonu, gemilerin hasarlı stabilite kriterlerini belirler.

**SOLAS Bölüm II-1**
Yolcu gemileri ve kargo gemileri için farklı gereksinimler tanımlar.

**Deterministik vs Probabilistik Yaklaşım**

**Deterministik Yaklaşım (Eski)**
- Belirli hasar senaryoları tanımlanır
- Her senaryo için stabilite kontrol edilir
- Tüm senaryolarda kriter sağlanmalı

**Probabilistik Yaklaşım (Modern)**
- Hasar olasılıkları hesaplanır
- Her senaryo için hayatta kalma olasılığı belirlenir
- Toplam hayatta kalma indeksi (A) hesaplanır
- A ≥ R (gerekli indeks) olmalı

**Attained Subdivision Index (A)**
A = Σ pᵢ × sᵢ
- pᵢ: Hasar senaryosunun olasılığı
- sᵢ: O senaryoda hayatta kalma olasılığı

**Required Subdivision Index (R)**
Gemi tipine ve boyutuna göre belirlenir.

**Hasarlı Stabilite Kriterleri (Genel)**
1. **Final Waterline:** Marj hattının altında kalmalı
2. **Açıklıklar:** Su üstünde kalmalı
3. **Heel Angle:** Asimetrik hasarda <15-20°
4. **GM ve GZ:** Pozitif değerler sağlanmalı
5. **Range of Stability:** Yeterli pozitif GZ aralığı

**Marjin Line (Marj Hattı)**
Su geçirmez güvertenin en az 76 mm altında çizilen hayali hat. Final waterline bu hattın altında kalmalıdır.`,
        keyPoints: [
          "SOLAS hasarlı stabilite kriterlerini zorunlu kılar",
          "Probabilistik yaklaşım modern standarttır",
          "Attained Index ≥ Required Index olmalı",
          "Final waterline marj hattının altında kalmalı"
        ],
        warnings: [
          "SOLAS gereksinimleri karşılanmazsa gemi sefere çıkamaz",
          "Yükleme durumu hasarlı stabiliteyi etkiler",
          "Periyodik doğrulama ve sertifikasyon gereklidir"
        ]
      },
      {
        title: "9.4. Hasar Kontrol ve Müdahale",
        content: `Hasar anında doğru müdahale, geminin ve mürettebatın kurtuluşu için kritiktir.

**Hasar Kontrol Prensipleri**

**1. Hızlı Değerlendirme**
- Hasarın yeri ve boyutu
- Su giriş hızı
- Etkilenen bölmeler
- Mevcut stabilite durumu

**2. Su Girişini Durdurma/Yavaşlatma**
- Tıkaç ve yama kullanımı
- Pompa kapasitesinin değerlendirilmesi
- Bölme kapılarının kapatılması

**3. Dengeleme (Counter-flooding)**
- Asimetrik yatmayı düzeltmek için
- Karşı taraftaki bölmelere kasıtlı su alma
- Dikkatli hesaplama gerektirir!

**Counter-flooding Dikkat Noktaları**
- Toplam su miktarı artar → Batan hacim artar
- GM üzerindeki etkiyi hesaplayın
- Dengeleme miktarını aşmayın

**4. Balast/Yakıt Transferi**
- Yatmayı düzeltmek için
- Stabiliteyi artırmak için
- Trim'i ayarlamak için

**5. Yükün Atılması (Jettisoning)**
- Son çare olarak
- Güverte yükü veya üst yükler
- Stabiliteyi hızla artırır

**Hasar Kontrol Ekipmanları**
- Portatif pompalar
- Tıkaç malzemeleri (wood plugs, cement)
- Yamalar ve destekler
- Su geçirmez kapılar/kapaklar
- Hasar kontrol planları

**Mürettebat Eğitimi**
- Düzenli hasar kontrol tatbikatları
- Bölme planı bilgisi
- Ekipman kullanımı
- Karar verme becerileri`,
        keyPoints: [
          "Hızlı değerlendirme ve müdahale kritiktir",
          "Counter-flooding dikkatli hesaplama gerektirir",
          "Hasar kontrol ekipmanları hazır tutulmalıdır",
          "Düzenli tatbikatlar mürettebatı hazırlar"
        ],
        practicalTips: [
          "Hasar kontrol planını iyi bilin",
          "Bölme kapılarının çalıştığından emin olun",
          "Pompa kapasitelerini önceden hesaplayın",
          "Kritik stabilite limitleri hakkında bilgi sahibi olun"
        ],
        warnings: [
          "Yanlış counter-flooding durumu kötüleştirebilir",
          "Çok fazla su almak batmaya yol açar",
          "Panik halinde yanlış kararlar verilebilir - sakin kalın"
        ]
      },
      {
        title: "9.5. Progressive Flooding (Ardışık Su Basması)",
        content: `Progressive flooding, bir bölmedeki hasarın diğer bölmelere yayılarak su basmasının genişlemesi durumudur. Bu fenomen hasarlı stabilite açısından en tehlikeli senaryolardan biridir.

**Progressive Flooding Nedir?**
Başlangıçtaki hasar sonrası su basan bölmeden komşu bölmelere su geçişidir. Bu durum şunlardan kaynaklanabilir:
- Bölme perdesinin (bulkhead) hasarı
- Havalandırma kanalları
- Boru geçişleri ve penetrasyonlar
- Kapıların kapanmaması veya sızıntısı
- Yapısal deformasyon

**Ardışık Su Basmasının Mekanizması**

**Aşama 1 - İlk Hasar:**
- Dış hasardan su girişi
- İlk bölme kısmen veya tamamen dolar
- Stabilite azalır, trim/heel oluşur

**Aşama 2 - Yayılma:**
- Su seviyesi iç açıklıklara ulaşır
- Komşu bölmelere geçiş başlar
- Her yeni bölme stabiliteyi daha da azaltır

**Aşama 3 - Kritik Durum:**
- Birden fazla bölme su altında
- Marj hattı tehlike altında
- Batma veya devrilme riski yüksek

**Cross-Flooding (Çapraz Doldurma)**

Cross-flooding, asimetrik su basmasını dengelemek için kullanılan kontrollü bir yöntemdir:

**Amaç:**
- Heel açısını azaltmak
- Devrilmeyi önlemek
- Stabiliteyi kontrol etmek

**Cross-Flooding Sistemi:**
- Borda tankları arasında bağlantı boruları
- Manuel veya otomatik valfler
- Kontrollü su geçişi

**Dikkat:**
- Toplam su miktarı artar
- Genel stabilite düşebilir
- Zaman kritiktir

**Cross-Flooding Zaman Hesabı**

Zaman formülü:
────────────────────────────
t = V / (A × C × √(2gh))
────────────────────────────

Burada:
- t = Doldurma süresi (s)
- V = Transfer edilecek hacim (m³)
- A = Boru kesit alanı (m²)
- C = Akış katsayısı (0.6-0.8)
- g = Yerçekimi ivmesi (9.81 m/s²)
- h = Seviye farkı (m)

**Progressive Flooding'i Önleme**

**Tasarım Önlemleri:**
- Su geçirmez bölme sayısının artırılması
- Yüksek marj hattı
- Güçlendirilmiş bölme perdeleri
- Minimum penetrasyon

**Operasyonel Önlemler:**
- Su geçirmez kapıların kapalı tutulması
- Düzenli bakım ve kontrol
- Havalandırma kapaklarının kontrolü
- Hasar kontrol eğitimi

**SOLAS Gereksinimleri**

**Bölmelendirme:**
- Minimum bölme sayısı (gemi boyuna göre)
- Tek veya çift bölme hasarı senaryoları
- Probabilistik değerlendirme

**Cross-Flooding:**
- Maksimum dengeleme süresi (≤ 15 dakika)
- Ara durumlarda stabilite kontrolü`,
        formulas: [
          {
            formula: "t = V / (A × C × √(2gh))",
            description: "Cross-flooding zaman hesabı"
          },
          {
            formula: "Q = A × C × √(2gh)",
            description: "Su geçiş debisi (m³/s)"
          },
          {
            formula: "Heelazalma = (w × d) / (Δ × GM)",
            description: "Cross-flooding ile heel düzeltmesi"
          }
        ],
        keyPoints: [
          "Progressive flooding birden fazla bölmeyi etkiler",
          "Her yeni bölme stabiliteyi daha da düşürür",
          "Cross-flooding dengeleme sağlar ama toplam su artar",
          "Zaman kritik - hızlı değerlendirme gerekli"
        ],
        warnings: [
          "Progressive flooding hızla gelişebilir",
          "Cross-flooding dikkatli hesaplanmalı",
          "Aşırı cross-flooding batmaya yol açabilir",
          "Zaman baskısı altında doğru karar vermek zor"
        ],
        practicalTips: [
          "Bölme kapılarını kapalı tutun",
          "Hasar kontrol planını iyi bilin",
          "Cross-flooding valflerinin çalıştığından emin olun",
          "Düzenli tatbikat yapın"
        ]
      }
    ]
  },
  {
    id: "section-10",
    title: "Bölüm 10 – IMO Stabilite Kriterleri",
    icon: "AlertTriangle",
    iconColor: "from-amber-500 to-orange-600",
    description: "Uluslararası stabilite standartları ve uygunluk",
    subtopics: [
      {
        title: "10.1. IMO Intact Stability Code (2008 IS Code)",
        content: `IMO 2008 IS Code, tüm gemiler için genel stabilite kriterlerini tanımlar.

**2008 IS Code Kapsamı**
- Uluslararası sefer yapan tüm gemiler
- 24 metre ve üzeri gemiler
- Bazı gemi tipleri için özel kriterler

**Temel Kriterler (Genel Kargo Gemileri)**

**1. GZ Eğrisi Altındaki Alan**
- A(0°-30°) ≥ 0.055 m·rad
- A(0°-40°) ≥ 0.090 m·rad (veya θflood öncesi)
- A(30°-40°) ≥ 0.030 m·rad

**2. Maksimum GZ**
- GZmax ≥ 0.20 m (θ ≥ 30° için)
- θmax ≥ 25° (GZmax'ın oluştuğu açı)

**3. Başlangıç GM**
- GM₀ ≥ 0.15 m (serbest yüzey düzeltmeli)

**4. Hava Kriteri (Weather Criterion)**
- Rüzgar ve dalga etkisi altında stabilite
- Alan oranı: A1 ≥ A2

**Özel Gemi Tipleri**

**Yolcu Gemileri:**
- Daha katı kriterler
- Kalabalıklaşma senaryoları
- Tahliye süreleri ile ilişkili

**Tankerler:**
- Üst güverte açıklıkları için düzeltme
- Yük yoğunluğu etkileri

**Konteyner Gemileri:**
- Güverte yükü etkileri
- Parametrik rulo riskleri

**Balıkçı Gemileri:**
- Ağ çekme kuvvetleri
- Ani yük değişimleri

**RoRo Gemileri:**
- Araba güvertesi su girişi
- Stockholm Agreement kriterleri`,
        formulas: [
          {
            formula: "A(0°-30°) ≥ 0.055 m·rad",
            description: "0-30° arası GZ eğrisi altı alan"
          },
          {
            formula: "A(0°-40°) ≥ 0.090 m·rad",
            description: "0-40° arası GZ eğrisi altı alan"
          },
          {
            formula: "GZmax ≥ 0.20 m @ θ ≥ 30°",
            description: "Minimum maksimum GZ değeri ve açısı"
          },
          {
            formula: "GM₀ ≥ 0.15 m",
            description: "Minimum başlangıç GM"
          }
        ],
        keyPoints: [
          "2008 IS Code tüm gemiler için temel standarttır",
          "GZ eğrisi alan kriterleri dinamik stabiliteyi değerlendirir",
          "Minimum GM ve GZmax değerleri zorunludur",
          "Özel gemi tipleri için ek kriterler uygulanır"
        ]
      },
      {
        title: "10.2. Hava Kriteri (Weather Criterion)",
        content: `Hava kriteri, geminin şiddetli rüzgar ve dalga koşullarında stabilitesini değerlendirir.

**Senaryo**
Gemi, sabit bir rüzgar altında yatık konumdayken (θ₀), ani bir rüzgar şiddeti artışı (gust) ile daha fazla yatar. Aynı anda dalgalar gemini rüzgar tarafına sallar.

**Hesap Adımları**

**Adım 1: Sabit Rüzgar Heeling Arm (lw1)**
lw1 = (P × A × Z) / (1000 × g × Δ)

- P: Rüzgar basıncı (504 N/m² standart)
- A: Yanal projeksiyon alanı (m²)
- Z: A'nın merkezinin su hattından yüksekliği (m)
- Δ: Deplasman (ton)
- g: 9.81 m/s²

**Adım 2: Statik Yatma Açısı (θ₀)**
GZ eğrisi ile lw1 çizgisinin kesiştiği açı

**Adım 3: Rüzgar Şiddeti Artışı (lw2)**
lw2 = 1.5 × lw1

**Adım 4: Rulo Açısı (θ₁)**
θ₁ = θ₀ - θroll

θroll, geminin rüzgar tarafına sallanma açısıdır (formülle hesaplanır)

**Adım 5: Alan Karşılaştırması**
- A1: θ₁ ile θ₀ arasındaki alan (GZ - lw2 arasında)
- A2: θ₀ ile θ₂ arasındaki alan (lw2 - GZ arasında)

**Kriter:**
A1 ≥ A2 olmalıdır.

**Fiziksel Anlam**
- A1: Geminin rüzgar tarafına döndüğündeki enerji kapasitesi
- A2: Rüzgar şiddetinin gemiye vereceği enerji
- A1 > A2 ise gemi devrilmez`,
        formulas: [
          {
            formula: "lw1 = (P × A × Z) / (1000 × g × Δ)",
            description: "Sabit rüzgar heeling arm"
          },
          {
            formula: "lw2 = 1.5 × lw1",
            description: "Rüzgar şiddeti artışı etkisi"
          },
          {
            formula: "A1 ≥ A2",
            description: "Hava kriteri uygunluk koşulu"
          }
        ],
        keyPoints: [
          "Hava kriteri ani rüzgar artışını simüle eder",
          "A1/A2 alan oranı değerlendirilir",
          "A1 ≥ A2 olmalıdır",
          "Rüzgar alanı ve ağırlık merkezi yüksekliği kritik parametrelerdir"
        ],
        warnings: [
          "Yüksek üst yapılı gemiler daha yüksek rüzgar heeling'e maruz kalır",
          "Güverte yükü (konteyner vb.) rüzgar alanını artırır",
          "Hava kriteri sağlanmazsa gemi sefere çıkamaz"
        ]
      },
      {
        title: "10.3. Tahıl Yükü Stabilitesi (Grain Stability)",
        content: `Tahıl taşıyan gemiler için özel stabilite kriterleri uygulanır.

**Neden Özel Kriterler?**
Tahıl:
- Akışkan davranış gösterebilir
- Seyir sırasında yerleşir (settling)
- Yatık gemide kayabilir
- Bu nedenle ek stabilite riski oluşturur

**IMO Grain Code (International Code for Safe Carriage of Grain in Bulk)**

**Temel Kriterler**
1. **Başlangıç GM (düzeltilmiş):**
   GMfluid ≥ 0.30 m

2. **Maksimum Yatma Açısı:**
   θ ≤ 12° (tahıl kayması sonucu)

3. **GZ Eğrisi Alanı:**
   A(θh ile 40° arası) ≥ 0.075 m·rad
   
   θh: Tahıl heeling açısı

**Tahıl Heeling Moment**
Tahıl kayması nedeniyle oluşan moment:
- Volumetric heeling moment (VHM)
- Hesap, yük tutma cihazlarına (shifting boards, overstowing) bağlı

**Heeling Arm Hesabı**
λ = VHM / (SF × Δ)

- VHM: Hacimsel heeling momenti (m⁴)
- SF: Stowage factor (m³/ton)
- Δ: Deplasman (ton)

**Document of Authorization**
- Klas kuruluşu tarafından verilen tahıl taşıma belgesi
- Onaylı yükleme senaryoları
- Stabilite hesap kitapçığı`,
        formulas: [
          {
            formula: "GMfluid ≥ 0.30 m",
            description: "Tahıl taşıyan gemiler için minimum GM"
          },
          {
            formula: "θmax ≤ 12°",
            description: "Maksimum tahıl kayma açısı"
          },
          {
            formula: "A(θh - 40°) ≥ 0.075 m·rad",
            description: "GZ eğrisi alanı kriteri"
          },
          {
            formula: "λ = VHM / (SF × Δ)",
            description: "Tahıl heeling arm hesabı"
          }
        ],
        keyPoints: [
          "Tahıl taşıyan gemiler için özel kriterler uygulanır",
          "GM ≥ 0.30 m (genel gemilerden daha yüksek)",
          "Maksimum yatma açısı 12° ile sınırlı",
          "Document of Authorization zorunludur"
        ],
        practicalTips: [
          "Tahıl yüklemeden önce onaylı senaryoları kontrol edin",
          "Yük tutma cihazlarının (shifting boards) düzgün yerleştirildiğinden emin olun",
          "Seyir boyunca tahıl yerleşmesini izleyin",
          "Stabilite hesabını sık aralıklarla güncelleyin"
        ]
      },
      {
        title: "10.4. Stabilite Doğrulama ve Sertifikasyon",
        content: `Stabilite gereksinimleri, çeşitli doğrulama ve sertifikasyon süreçleriyle kontrol edilir.

**Stabilite Kitapçığı (Stability Booklet)**
Her gemide bulunması zorunlu olan dokümandır:
- Gemi özellikleri ve hidrostatik veriler
- Onaylı yükleme senaryoları
- Stabilite hesap prosedürleri
- IMO kriterleri ve sınırlar
- KN eğrileri veya tabloları
- Tank kapasiteleri ve serbest yüzey verileri

**Stabilite Kitapçığının İçeriği**
1. Genel bilgiler (gemi boyutları, lightship verileri)
2. Hidrostatik tablolar (draft vs KM, TPC, MCT vb.)
3. Tank tabloları (kapasite, VCG, LCG, FSM)
4. Örnek yükleme durumları ve hesaplar
5. Kriter özeti ve kontrol tabloları
6. GZ eğrileri (tipik durumlar için)

**Yükleme Bilgisayarı (Loading Computer)**
Modern gemilerde zorunlu:
- Stabilite hesabını otomatik yapar
- IMO kriterlerini kontrol eder
- Uyarı ve alarm verir
- Onaylı yazılım gerektirir

**Sertifikasyon Süreci**

**1. Tasarım Aşaması:**
- Stabilite hesapları
- Klas kuruluşu onayı

**2. İnşa Sonrası:**
- Eğim testi (inclining experiment)
- Lightship verileri doğrulama
- Stabilite kitapçığı onayı

**3. İşletme Dönemi:**
- Periyodik doğrulama (5 yıl)
- Lightship değişikliği kontrolü
- Yükleme bilgisayarı kalibrasyonu

**Eğim Testi (Inclining Experiment)**
Geminin lightship KG değerini belirlemek için yapılır:
1. Gemi boşaltılır (lightship durumu)
2. Bilinen ağırlıklar enine taşınır
3. Yatma açısı ölçülür
4. GM ve KG hesaplanır`,
        formulas: [
          {
            formula: "GM = (w × d) / (Δ × tan(θ))",
            description: "Eğim testi GM hesabı"
          },
          {
            formula: "KG = KM - GM",
            description: "Eğim testinden KG belirleme"
          }
        ],
        keyPoints: [
          "Stabilite kitapçığı her gemide zorunludur",
          "Yükleme bilgisayarı modern gemilerde standart",
          "Eğim testi lightship KG'yi belirler",
          "Periyodik doğrulama gereklidir"
        ],
        practicalTips: [
          "Stabilite kitapçığını her zaman güncel tutun",
          "Yükleme bilgisayarı sonuçlarını manuel kontrol edin",
          "Lightship değişikliklerini kaydedin ve raporlayın",
          "Kriter sınırlarına yaklaşıldığında dikkatli olun"
        ],
        warnings: [
          "Onaysız stabilite yazılımı kullanmayın",
          "Lightship değişiklikleri rapor edilmelidir",
          "Kriterleri karşılamayan yükleme durumu tehlikelidir"
        ]
      },
      {
        title: "10.5. İkinci Nesil Stabilite Kriterleri (SGISC)",
        content: `İkinci Nesil Sağlam Stabilite Kriterleri (Second Generation Intact Stability Criteria - SGISC), IMO tarafından geliştirilen ve mevcut kriterlerin kapsamadığı dinamik stabilite başarısızlık modlarını ele alan yeni düzenleyici çerçevedir.

**Neden Yeni Kriterler Gerekli?**
Mevcut IMO 2008 IS Code kriterleri:
- Statik koşullar için tasarlanmış
- Dinamik fenomenleri yeterince kapsamıyor
- Büyük modern gemiler için yetersiz kalıyor
- Bazı kaza türlerini öngöremiyor

**5 Başarısızlık Modu (Failure Modes)**

SGISC, beş temel dinamik başarısızlık modunu ele alır:

**1. Pure Loss of Stability (Saf Stabilite Kaybı)**
- Dalga tepesinde GM'in aşırı düşmesi
- Wall-sided olmayan gemilerde kritik
- Ani ve geçici negatif GM

**2. Parametric Rolling (Parametrik Yalpa)**
- Boyuna dalgalarda GM değişimi
- Rezonans sonucu aşırı salınım
- Konteyner gemileri için önemli

**3. Surf-Riding / Broaching-to**
- Kıçtan dalgalarda hız kaybı kontrolü
- Geminin dalga ile birlikte sürüklenmesi
- Ani dönüş ve devrilme riski

**4. Dead Ship Condition (Ölü Gemi Durumu)**
- Makine arızası senaryosu
- Rüzgar ve dalga altında sürüklenme
- Aşırı heel ve devrilme

**5. Excessive Acceleration (Aşırı İvme)**
- Sert gemilerde yüksek ivmeler
- Kargo, ekipman ve personel hasarı
- Rulo ivmesi kriterleri

**Kademeli Değerlendirme Yaklaşımı**

**Level 1 - Vulnerability Check (Basit):**
- Basit formüller ve eşik değerler
- Hızlı değerlendirme
- Fail ederse Level 2'ye geçilir

**Level 2 - Detailed Vulnerability (Detaylı):**
- Daha karmaşık hesaplamalar
- Dalga spektrumu değerlendirmesi
- Fail ederse Level 3 veya operasyonel kısıtlamalar

**Level 3 - Direct Stability Assessment (DSA):**
- Tam simülasyon
- Model testleri veya CFD
- En yüksek doğruluk
- En yüksek maliyet ve zaman

**IMO Düzenlemeleri**

**MSC.1/Circ.1627:**
- Geçici yönergeler
- Gönüllü uygulama
- 2020 yayınlandı

**Beklenen Zorunluluk:**
- Kademeli geçiş
- Yeni inşa gemiler öncelikli
- Mevcut gemiler için muafiyetler

**Pratik Etkileri**

**Gemi Tasarımına Etkisi:**
- Form optimizasyonu gerekebilir
- Aktif stabilizasyon sistemleri
- Operasyonel kılavuzlar (OGS - Operational Guidance to Ships)

**Operasyonlara Etkisi:**
- Hız/rota kısıtlamaları
- Gerçek zamanlı izleme
- Karar destek sistemleri`,
        formulas: [
          {
            formula: "RPL = Σ Wi × Ci (Level 2)",
            description: "Parametrik yalpa olasılık indeksi"
          },
          {
            formula: "ΔGM / GMmean < KritikDeğer",
            description: "Level 1 pure loss kontrolü"
          },
          {
            formula: "Froude No. < 0.3 (surf-riding için)",
            description: "Surf-riding kırılganlık kontrolü"
          }
        ],
        keyPoints: [
          "SGISC 5 dinamik başarısızlık modunu ele alır",
          "3 kademeli değerlendirme yaklaşımı kullanılır",
          "Mevcut kriterlere ek olarak uygulanır",
          "Büyük modern gemiler için özellikle önemli"
        ],
        warnings: [
          "SGISC henüz zorunlu değil ama olacak",
          "Bazı gemiler mevcut tasarımla kriterleri sağlayamayabilir",
          "Operasyonel kısıtlamalar gerekebilir",
          "Erken hazırlık avantaj sağlar"
        ],
        practicalTips: [
          "Gemi tipiniz için kritik modları belirleyin",
          "Konteyner gemisi ise parametrik rolling'e dikkat",
          "Yüksek hızlı gemilerde surf-riding kontrolü yapın",
          "Operasyonel kılavuzları takip edin"
        ]
      },
      {
        title: "10.6. Operasyonel Limitler ve Uygunluk Yönetimi",
        content: `IMO kriterleri sadece tasarım aşamasıyla sınırlı değildir; geminin işletme sürecinde de uygulanabilir operasyonel sınırlar tanımlanmalıdır.

**Operasyonel Limitler Nedir?**
Stabilite kitapçığında verilen limitler, geminin güvenli çalışması için kabul edilebilir aralıkları belirtir:
- Maksimum izin verilen KG/VCG
- Minimum GM limitleri
- Maksimum yükseklikli güverte yükleri
- Downflooding açısı ve kapak limitleri

**Tipik Limit Eğrileri**
- **Limiting KG / VCG eğrisi:** Draft veya deplasmana göre maksimum KG
- **Limiting GM eğrisi:** Minimum güvenli GM sınırı
- **KN/GZ tabloları:** Farklı yükleme durumları için referans

**Operasyonel Uygunluk Yönetimi**
1. Yükleme durumu seç
2. Stabilite kitabındaki limit eğrilerini kontrol et
3. Yükleme bilgisayarıyla hesap doğrulaması yap
4. Kriterleri sağlayamıyorsan yük dağılımını revize et

**Operasyonel Riskler**
- Limit eğrisine yakın yükleme, küçük hatalarda uygunsuzluğa düşer
- Serbest yüzey ve yüksek VCG, limitleri hızla aşırır
- Downflooding açısı düşükse emniyet rezervi azalır`,
        formulas: [
          {
            formula: "KGlim = KM - GMgerekli",
            description: "Limit KG hesabının temel ilişkisi"
          },
          {
            formula: "GMgerekli = GMmin + FSM/Δ",
            description: "Serbest yüzey düzeltmesi ile gerekli GM"
          }
        ],
        keyPoints: [
          "Operasyonel limitler stabilite kitabının en kritik bölümüdür",
          "Limit eğrileri yükleme planının temel referansıdır",
          "Yükleme bilgisayarı limit kontrolünde kullanılmalıdır",
          "Limitlere yakın yükleme operasyonel risk yaratır"
        ],
        warnings: [
          "Limit eğrilerine uymayan yükleme durumu sefere çıkamaz",
          "Kısmi dolu tanklar limitleri hızlı aşırabilir",
          "Downflooding açısı düşerse stabilite rezervi azalır"
        ],
        practicalTips: [
          "KG/VCG limit eğrilerini sefer planlamasında mutlaka kullanın",
          "Kritik yükleme durumlarını önceden simüle edin",
          "Serbest yüzeyli tankları minimize edin",
          "Limitlere yakın durumlarda ekstra GM marjı bırakın"
        ]
      }
    ]
  },

  // ==================== BÖLÜM 11: YÜKLEME DURUMLARI ====================
  {
    id: "loading-conditions",
    title: "11. Yükleme Durumları",
    icon: "📦",
    iconColor: "text-amber-500",
    description: "Farklı yükleme senaryoları, departure/arrival durumları ve kritik yükleme koşullarının analizi",
    subtopics: [
      {
        id: "standard-conditions",
        title: "Standart Yükleme Durumları",
        content: `Yükleme durumu (Loading Condition), geminin belirli bir andaki tüm ağırlıkların toplamını ve dağılımını ifade eden kapsamlı bir tanımdır. Her yükleme durumu, geminin deplasmanını, ağırlık merkezinin konumunu, draftını, trimini ve stabilite özelliklerini tamamen belirler. Stabilite kitapçığında onaylanmış standart yükleme durumları yer alır ve her bir durum için ayrı ayrı stabilite analizi yapılmıştır.

Standart yükleme durumları, geminin operasyonel yaşamı boyunca karşılaşacağı tipik senaryoları temsil eder. Bu senaryolar, IMO düzenlemeleri ve klas kuruluşu kuralları çerçevesinde belirlenir ve her biri için tüm stabilite kriterlerinin sağlanması zorunludur.

**Lightship (Boş Gemi) Durumu**, geminin hiçbir kargo, yakıt, tatlı su veya sarf malzemesi taşımadığı, yalnızca yapısal ağırlığıyla yüzdüğü durumu ifade eder. Lightship ağırlığı, gemi gövdesinin çelik yapısını, sabit makine ve ekipmanları, boyayı, izolasyon malzemelerini ve sabit balastı kapsar. Lightship deplasmanı ve KG değeri, eğim testi (inclining experiment) ile deneysel olarak belirlenir ve tüm sonraki stabilite hesaplarının referans noktasını oluşturur. Lightship değerleri, geminin yapısal modifikasyonlarına bağlı olarak değişebilir; bu nedenle önemli modifikasyonlar sonrasında eğim testinin yenilenmesi veya ağırlık hesabı yapılması gerekir.

**Full Load Departure (Tam Yüklü Kalkış)** durumu, geminin maksimum kargo kapasitesinde, %100 yakıt ve tatlı su ile tüm sarf malzemeleri tam olarak yüklenmiş halde limandan ayrıldığı senaryodur. Bu durum, genellikle en yüksek deplasmana karşılık gelir ve VCG (düşey ağırlık merkezi) potansiyeli en yüksek olduğu için stabilite açısından kritik bir senaryo oluşturur. Full load departure durumunda draft ve trim değerleri, yükleme hattı (loadline) sınırlarını aşmamalı ve tüm IMO stabilite kriterleri sağlanmalıdır.

**Full Load Arrival (Tam Yüklü Varış)** durumu, aynı kargo miktarını taşıyan geminin seyir boyunca yakıt, tatlı su ve sarf malzemelerini tüketmesi sonrasında varış limanına ulaştığı senaryoyu temsil eder. Bu durumda yakıt tankları genellikle %10 rezerv seviyesine inmiştir. Yakıt tüketimi, geminin ağırlık merkezinin konumunu önemli ölçüde değiştirebilir; özellikle yakıt tanklarının konumuna bağlı olarak KG artabilir veya azalabilir. Bu nedenle arrival durumunun da bağımsız olarak stabilite kriterlerini sağlaması zorunludur.

**Ballast Departure (Balast Kalkış)** durumu, geminin kargo olmaksızın yalnızca balast suyu ile seyir yaptığı senaryodur. Balast tanklarının dolu olması, pervanenin yeterli batmasını ve baş draftın kabul edilebilir seviyelerde kalmasını sağlar. Balast durumunda deplasman düşüktür ve geminin rüzgâr yüzey alanı geniştir; bu nedenle rüzgâr heeling momenti daha kritik hale gelir. KM değeri düşük deplasmanlarda farklılık gösterdiğinden, ballast durumları için ayrı stabilite değerlendirmesi zorunludur.

**Ballast Arrival (Balast Varış)** durumu, uzun bir balast seyiri sonrasında minimum yakıt ile varış limanına ulaşılan senaryodur. Bu durum, genellikle en düşük deplasman değerine karşılık gelir ve stabilite açısından en zayıf noktayı oluşturabilir. Minimum yakıt durumunda ağırlık merkezinin konumu değişir ve GM değeri kritik seviyelere yaklaşabilir.

**Intermediate Conditions (Ara Durumlar)**, kalkış ve varış arasındaki geçiş dönemlerini kapsar. Yakıt tüketiminin %50 seviyesinde olması, kısmi boşaltma veya yükleme durumları ve balast transferleri sırasında oluşan geçici durumlar bu kategoriye girer. Ara durumlar, özellikle serbest yüzey etkisinin maksimum olduğu dönemlerde stabilite açısından kritik olabilir.

────────────
Δ = Lightship + DWT
────────────

Burada DWT (Deadweight), kargo, yakıt, tatlı su, balast, kumanya ve personel ağırlıklarının toplamıdır. Her yükleme durumu için bu bileşenlerin ayrı ayrı miktarları ve VCG değerleri belirlenir, moment hesabı yapılır ve toplam KG bulunur.

**Sayısal Örnek:**

Lightship = 8 500 ton, KGls = 7,30 m olan bir gemi, 12 000 ton kargo (VCG = 5,80 m), 2 200 ton yakıt (VCG = 2,50 m) ve 800 ton tatlı su (VCG = 1,80 m) ile yüklenmiştir.

Adım 1 — Toplam deplasman:
Δ = 8 500 + 12 000 + 2 200 + 800 = 23 500 ton

Adım 2 — Toplam moment:
M = 8 500 × 7,30 + 12 000 × 5,80 + 2 200 × 2,50 + 800 × 1,80
M = 62 050 + 69 600 + 5 500 + 1 440 = 138 590 t·m

Adım 3 — KG:
KG = 138 590 / 23 500 = 5,90 m

Hidrostatik tablolardan bu deplasmandaki KM = 7,85 m ise:
GM = 7,85 − 5,90 = 1,95 m`,
        formulas: [
          {
            formula: "Δ = Lightship + DWT",
            description: "Toplam deplasma hesabı"
          },
          {
            formula: "DWT = Kargo + Yakıt + Su + Stores",
            description: "Deadweight bileşenleri"
          },
          {
            formula: "KG = Σ(w × vcg) / Σw",
            description: "Ağırlık merkezi hesabı"
          }
        ],
        keyPoints: [
          "Her yükleme durumu için stabilite kontrol edilmeli",
          "Departure ve arrival durumları ayrı değerlendirilir",
          "Yakıt tüketimi stabiliteyi önemli ölçüde etkiler",
          "Ballast durumları özellikle risklidir"
        ],
        practicalTips: [
          "Yolculuk öncesi tüm durumları hesaplayın",
          "Ara durumlar için senaryo analizi yapın",
          "Yakıt tüketim planını stabilite ile birlikte değerlendirin",
          "En kötü durum senaryolarını belirleyin"
        ],
        warnings: [
          "Sadece departure kontrolü yeterli değildir",
          "Yakıt tüketimi GM'i düşürebilir",
          "Ballast arrival en kritik durumlardan biridir"
        ]
      },
      {
        id: "critical-conditions",
        title: "Kritik Yükleme Durumları",
        content: `Kritik yükleme durumu, geminin stabilite açısından en zayıf olduğu ve devrilme riskinin görece en yüksek olduğu yükleme senaryosunu ifade eder. Bu durumlar, standart yükleme senaryolarının ötesinde özel dikkat ve analiz gerektirir; çünkü küçük bir ek etki —ani rüzgâr, dalga veya yük kayması— stabilite marjının tükenmesine ve geminin devrilmesine yol açabilir.

Kritik durumların tespiti, geminin emniyetli işletimi açısından hayati önem taşır. Stabilite kitapçığındaki limit eğrileri ve onaylı yükleme senaryoları, bu durumları tanımlamak ve önlemek için tasarlanmıştır. Ancak operasyonel koşullar her zaman önceden planlanmış senaryolarla örtüşmez; bu nedenle denizci, kritik yükleme koşullarının fiziksel mekanizmalarını anlamalı ve bunları gerçek zamanlı olarak değerlendirebilmelidir.

**Minimum GM Durumu**, GM'in en düşük olduğu yükleme konfigürasyonudur. Bu durum genellikle şu koşulların birleşmesiyle ortaya çıkar: yüksek VCG (üst ambarlara veya güverte üstüne yükleme), düşük KM (düşük draft veya belirli trim durumları) ve maksimum serbest yüzey etkisi (çok sayıda kısmen dolu tank). GM'in minimum olduğu durum, her zaman tam yüklü durum olmayabilir; özellikle kısmi yükleme durumlarında KM değerinin değişmesi nedeniyle, beklenmedik bir yükleme konfigürasyonunda GM kritik seviyeye düşebilir.

**Yüksek Ağırlık Merkezi (High VCG) Durumu**, güverte üstüne yükleme yapılan gemilerde sıklıkla karşılaşılan bir senaryodur. Konteyner gemilerinde 6 ila 10 katman yüksekliğinde güverte üstü istifleme yapılması, VCG'yi önemli ölçüde yükseltir. Ro-Ro gemilerinde araç güverteleri, geminin en yüksek noktalarına ağırlık ekler. Yolcu gemilerinde ise üst yapıların ağırlığı, KG'yi tasarım aşamasında bile yüksek tutan bir faktördür.

Bu durumların analizi için limit VCG/KG eğrisi temel referans aracıdır:

────────────
VCGmax = KM − GMgerekli
────────────

Burada GMgerekli, IMO kriterlerini sağlamak için gereken minimum GM değeridir ve serbest yüzey düzeltmesini de içerir. Eğer hesaplanan VCG bu sınırı aşarsa, yükleme planı revize edilmeli veya ek balast alınmalıdır.

**Hogging ve Sagging Durumları**, boyuna mukavemet açısından kritik senaryolardır. Hogging, geminin orta kısmının yukarı bükülmesidir ve genellikle baş ile kıçta ağır yükleme, ortada hafif yükleme durumunda oluşur. Sagging ise orta kısmın aşağı bükülmesidir ve ortaya ağır yükleme, baş ve kıçta hafif yükleme durumunda meydana gelir. Bu durumlar, geminin kesme kuvveti ve eğilme momenti limitlerini aşabilir ve yapısal hasara yol açabilir.

**Kısmi Yükleme (Part Load) Durumu**, tam dolu olmayan tanklardaki serbest yüzey etkisinin maksimum olduğu dönemdir. Özellikle balast değişimi sırasında, yakıt tüketiminin ara aşamalarında ve kısmi kargo yükleme/boşaltma işlemlerinde, çok sayıda tank kısmen dolu olabilir. Bu durumda toplam FSM değeri hızla artar ve GMeff kritik seviyelere düşebilir.

**Tek Taraflı Yükleme**, kargonun iskele veya sancak tarafına dengesiz dağıtılması durumunda oluşur. Bu durum başlangıç yatmasına (initial heel) neden olur ve GZ eğrisini asimetrik hale getirir. Tek taraflı yükleme, özellikle düşük GM durumlarında son derece tehlikelidir; çünkü yatan taraftaki GZ değerleri hızla azalır.

**Sayısal Örnek — Kritik GM Değerlendirmesi:**

Bir konteyner gemisi: Δ = 45 000 ton, KM = 11,20 m. Güverte üstü konteynerler dahil KG = 10,85 m olarak hesaplanmıştır. Toplam FSM = 2 400 t·m.

GMsolid = 11,20 − 10,85 = 0,35 m
GG₁ = 2 400 / 45 000 = 0,053 m
GMeff = 0,35 − 0,053 = 0,297 m

IMO minimum GM₀ ≥ 0,15 m kriterini sağlıyor; ancak güvenlik marjı çok düşüktür. Rüzgâr heeling momenti ve dinamik etkiler hesaba katıldığında bu yükleme durumu kritik olarak değerlendirilir.`,
        formulas: [
          {
            formula: "GMkritik = GMmin + GüvenlikMarjı",
            description: "Kritik GM hesabı"
          },
          {
            formula: "VCGmax = KM - GMgerekli",
            description: "Maksimum izin verilen VCG"
          },
          {
            formula: "GMeff = KM - KG - ΣFSM / Δ",
            description: "Efektif GM (serbest yüzey dahil)"
          }
        ],
        keyPoints: [
          "Kritik durumlar önceden belirlenmeli",
          "Her durumda tüm kriterler kontrol edilmeli",
          "Güvenlik marjı bırakılmalı — kriterlere tam sınırda kalmak tehlikelidir",
          "Worst case analizi zorunlu"
        ],
        practicalTips: [
          "Kritik durumlar için kontrol listesi hazırlayın",
          "Yükleme bilgisayarında senaryo analizi yapın",
          "Operasyonel sınırları belirleyin",
          "Mürettebatı kritik durumlar hakkında bilgilendirin"
        ],
        warnings: [
          "Kriterlere tam sınırda kalmak tehlikelidir",
          "Kısmi dolu tankları minimize edin",
          "Tek taraflı yüklemeden kaçının",
          "Yüksek VCG durumlarına özellikle dikkat edin"
        ]
      },
      {
        id: "tank-sequence",
        title: "Tank Sıralaması ve Optimizasyon",
        content: `Tank sıralaması, yükleme ve boşaltma operasyonlarında hangi tankların hangi sırayla kullanılacağını belirleyen stratejik bir planlama sürecidir. Doğru tank sıralaması, stabilite güvenliğini, yapısal bütünlüğü ve operasyonel verimliliği eş zamanlı olarak sağlamak için kritik öneme sahiptir.

Tank sıralamasının temel prensibi, herhangi bir ara yükleme durumunda geminin tüm stabilite ve boyuna mukavemet kriterlerini sağlamasını garanti etmektir. Yükleme veya boşaltma işleminin yalnızca başlangıç ve bitiş durumlarının emniyetli olması yeterli değildir; geçiş sürecindeki her ara durum da ayrı ayrı değerlendirilmelidir.

**Stabilite Öncelikli Sıralama**, ağırlık merkezinin düşey konumunu kontrol altında tutmayı hedefler. Bu prensibe göre yükleme sırasında öncelikle alt tanklar ve ambarlar doldurulur, üst seviyedeki tanklar en son doldurulur. Boşaltma işleminde ise bu sıra tersine çevrilir: önce üst tanklar boşaltılır, ardından alt tanklara geçilir. Bu yaklaşım, KG'nin tüm ara durumlarda mümkün olan en düşük seviyede kalmasını sağlar ve GM değerinin kritik seviyelere düşmesini önler.

**Yapısal Güvenlik Prensibi**, kesme kuvveti ve eğilme momentinin hiçbir ara durumda izin verilen sınırları aşmamasını gerektirir. Simetrik yükleme bu prensibin temel gereğidir: iskele ve sancak taraftaki tanklar eş zamanlı olarak doldurulmalı veya boşaltılmalıdır. Ayrıca baş ve kıç arasındaki ağırlık dağılımı dengelenmelidir; aşırı lokal yüklemeden kaçınılmalı ve ağırlık değişiklikleri mümkün olduğunca geminin boyuna yayılmalıdır.

**Serbest Yüzey Minimizasyonu**, tank sıralamasının üçüncü kritik boyutudur. Kısmen dolu tank sayısını mümkün olan en düşük seviyede tutmak, toplam FSM'yi minimize eder. Bu prensibin pratik uygulaması şu şekildedir: bir tank tamamen doldurulmadan veya tamamen boşaltılmadan bir sonraki tanka geçilmemelidir. Büyük genişliğe sahip tanklar öncelikli olarak doldurulmalı veya boşaltılmalıdır; çünkü bu tankların FSM değerleri, genişliğin küpüyle orantılı olarak çok büyüktür.

**Yakıt Tankları İçin Tüketim Sıralaması**, geminin seyir boyunca stabilitesini doğrudan etkiler. Tipik bir tüketim sırası şu şekildedir: settling tank ve service tank günlük kullanım için sürekli devrededir; ardından üst yakıt tankları tüketilir (yüksek VCG'li ağırlıkların kaldırılması GM'i artırır); sonra çift dip yakıt tankları kullanılır ve en son derin tanklar tüketilir. Bu sıralama, seyir boyunca KG'nin kontrollü bir şekilde azalmasını ve GM'in korunmasını sağlar.

**Balast Tank Sıralaması** ise trim ve stabilite kontrolü için aktif olarak yönetilen bir süreçtir. Balast alma sırasında önce çift dip tankları doldurulur (stabilite artışı için), ardından baş pik tankı (trim düzeltmesi için) ve son olarak yan tanklar (ince ayar için) doldurulur. Balast boşaltma sırasında önce üst tanklar boşaltılır (GM artışı), ardından yan tanklar (heel kontrolü) ve en son dip tankları (son aşama) boşaltılır.

────────────
FSCtoplam = Σ(ρᵢ × iᵢ) / Δ
────────────

Bu formülde her kısmen dolu tankın serbest yüzey momenti ayrı ayrı hesaplanır ve toplam FSC, GMsolid değerinden çıkarılarak operasyonel GM elde edilir. Tank sıralaması, bu toplam değerin her ara durumda kabul edilebilir sınırlar içinde kalmasını hedefler.

**Sayısal Örnek — Tank Sıralaması Karşılaştırması:**

Δ = 20 000 ton, GMsolid = 1,40 m olan bir tanker, 4 adet büyük yük tankını boşaltacaktır. Her tankın FSM değeri 900 t·m.

Kötü sıralama — 4 tankı aynı anda kısmen boşaltma:
ΣFSM = 4 × 900 = 3 600 t·m
GG₁ = 3 600 / 20 000 = 0,18 m
GMeff = 1,40 − 0,18 = 1,22 m

İyi sıralama — tankları tek tek tamamen boşaltma:
ΣFSM = 1 × 900 = 900 t·m (aynı anda yalnızca 1 tank kısmen dolu)
GG₁ = 900 / 20 000 = 0,045 m
GMeff = 1,40 − 0,045 = 1,355 m

Sıralı boşaltma, serbest yüzey etkisini dört kat azaltır ve stabilite marjını önemli ölçüde korur.`,
        formulas: [
          {
            formula: "FSCtoplam = Σ(ρᵢ × iᵢ) / Δ",
            description: "Toplam serbest yüzey düzeltmesi"
          },
          {
            formula: "GMnet = GMsolid - FSC",
            description: "Operasyonel GM hesabı"
          }
        ],
        keyPoints: [
          "Tank sıralaması stabiliteyi doğrudan etkiler",
          "Serbest yüzey etkisini minimize edin — tankları tek tek tamamen doldurun/boşaltın",
          "Yapısal sınırları aşmayın",
          "Operasyonel prosedür oluşturun"
        ],
        practicalTips: [
          "Standart tank sıralama prosedürü hazırlayın",
          "Her operasyon öncesi plan yapın",
          "Ara durumları kontrol edin",
          "Acil durum prosedürleri belirleyin"
        ],
        warnings: [
          "Çok sayıda kısmen dolu tank tehlikelidir",
          "Asimetrik yüklemeden kaçının",
          "Yapısal sınırları izleyin",
          "Ani büyük transferler yapmayın"
        ]
      }
    ]
  },

  // ==================== BÖLÜM 12: ÖZEL KARGOLAR ====================
  {
    id: "special-cargoes",
    title: "12. Özel Kargolar",
    icon: "⚠️",
    iconColor: "text-orange-500",
    description: "Tehlikeli maddeler, bulk kargo, ağır yükler ve özel taşıma gereksinimleri",
    subtopics: [
      {
        id: "bulk-cargo",
        title: "Dökme (Bulk) Kargolar",
        content: `Dökme kargo, ambalajsız olarak geminin ambarlarına doğrudan yüklenen kuru veya sıvı kargoları ifade eder. Bu kargolar, yapıları ve fiziksel özellikleri nedeniyle özel stabilite riskleri taşır ve her bir dökme kargo türü için ayrı emniyet prosedürleri uygulanır.

**Kuru Dökme Kargolar** arasında tahıl (buğday, mısır, arpa, pirinç), maden cevherleri (demir cevheri, bakır konsantresi, boksit), kömür, çimento, şeker ve tuz gibi maddeler yer alır. Bu kargoların ortak özelliği, geminin yatma hareketine bağlı olarak kayma (shifting) potansiyeline sahip olmalarıdır. Bir dökme kargonun kayma açısı, malzemenin tanecik büyüklüğüne, nem içeriğine, yoğunluğuna ve istifleme yöntemine bağlıdır.

**Tahıl Kargosu**, IMO Tahıl Kodu (International Code for the Safe Carriage of Grain in Bulk) kapsamında özel düzenlemelere tabidir. Tahıl, yükleme sonrasında zamanla yerleşir (settling) ve ambar içinde boşluklar oluşturur. Gemi yattığında tahıl bu boşluklara doğru kayar ve ağırlık merkezini yatılan tarafa kaydırır. Bu kayma, doğrultma kolunu azaltır ve geminin devrilme riskini artırır.

Tahıl taşıyan gemiler için IMO Tahıl Kodu şu temel kriterleri zorunlu kılar:

────────────
GMfluid ≥ 0,30 m
────────────

Bu değer, genel kargo gemileri için geçerli olan 0,15 m minimumunun iki katıdır ve tahıl kaymasının yarattığı ek riski telafi etmek için daha yüksek tutulmuştur. Tahıl kaymasından dolayı oluşan yatma açısı 12°'yi geçmemelidir ve GZ eğrisinde tahıl heeling arm'ı ile GZ eğrisi arasındaki artık alan en az 0,075 m·rad olmalıdır.

Tahıl heeling arm hesabı, volumetrik kayma momentine (VHM) dayanır:

────────────
λ = VHM / (SF × Δ)
────────────

Burada VHM hacimsel heeling momentini, SF stowage factor'ü ve Δ deplasmanı ifade eder. VHM değeri, ambarın geometrisine, doluluk durumuna ve yük tutma cihazlarının (shifting board, overstowing) kullanımına bağlı olarak değişir.

**Maden Cevheri Kargoları**, yüksek yoğunlukları nedeniyle özel zorluklar sunar. Demir cevheri gibi kargoların stowage factor'ü çok düşüktür; bu, aynı hacimde çok daha fazla ağırlık taşındığı anlamına gelir. Bu durum, alt ambarlarda yoğun yükleme oluştururken üst ambarlarda büyük boşluklar bırakır. Sonuç olarak KG düşer ve GM oldukça yüksek olur, gemi "sert" hale gelir.

Maden cevherleri taşımacılığında en ciddi risk **sıvılaşma (liquefaction)** fenomenidir. Nem içeriği belirli bir eşiğin üzerinde olan granüler kargolar, geminin titreşimi ve salınımı etkisiyle sıvı gibi davranmaya başlayabilir. Bu durum aniden gerçekleşir ve kargoyu bir anda sıvı yük gibi akışkan hale getirir; serbest yüzey etkisi dramatik biçimde ortaya çıkar ve gemi dakikalar içinde devrilebilir. Bu nedenle IMO, Transportable Moisture Limit (TML) kavramını getirmiştir: kargonun nem içeriği, TML değerini aşmamalıdır.

**Kömür Kargosu**, kendiliğinden tutuşma, metan gazı oluşumu ve nem absorpsiyonu gibi ek riskler taşır. Kömürün oksidasyonu ısı üretir ve havalandırma yetersiz ise sıcaklık tutuşma noktasına ulaşabilir. Ayrıca kömürden çıkan metan gazı, kapalı ambarlarda patlayıcı karışımlar oluşturabilir. Bu nedenle kömür ambarlarında düzenli sıcaklık ve gaz ölçümü yapılması zorunludur.`,
        formulas: [
          {
            formula: "GMfluid ≥ 0,30 m",
            description: "Tahıl taşıyan gemiler için minimum GM"
          },
          {
            formula: "λ = VHM / (SF × Δ)",
            description: "Tahıl heeling arm hesabı"
          },
          {
            formula: "θheel ≤ 12°",
            description: "Tahıl kaymasından maksimum yatma açısı"
          }
        ],
        keyPoints: [
          "Tahıl kargosu için IMO Grain Code uygulanır — GM ≥ 0,30 m",
          "Maden cevherlerinde sıvılaşma (liquefaction) riski hayati tehlike oluşturur",
          "Kömür kendiliğinden tutuşabilir ve metan gazı üretir",
          "Her dökme kargo türü için özel prosedür gerekir"
        ],
        warnings: [
          "Tahıl kayması çok tehlikelidir",
          "Sıvılaşma aniden gerçekleşebilir ve geminin devrilmesine yol açabilir",
          "Kömür ambarlarında düzenli gaz ve sıcaklık ölçümü yapın",
          "TML değerini aşan nem içeriğiyle yükleme yapmayın"
        ]
      },
      {
        id: "heavy-cargo",
        title: "Ağır Yükler ve Proje Kargoları",
        content: `Ağır yük (Heavy Lift) ve proje kargoları, standart yükleme prosedürlerinin ötesinde detaylı mühendislik planlaması ve hesaplama gerektiren kargolardır. Tek parça ağırlığı genellikle 100 tonu aşan bu kargolar, geminin stabilitesini hem yükleme sırasında hem de seyir boyunca ciddi biçimde etkiler.

Ağır yük tipleri arasında endüstriyel ekipmanlar (transformatörler, jeneratörler, türbinler, reaktörler, kolonlar), deniz yapıları (offshore platform modülleri, rüzgâr türbini parçaları, boru hatları), büyük araçlar ve yapılar (lokomotifler, inşaat makineleri, prefabrik yapılar) yer alır. Bu kargoların ortak özelliği, ağırlıklarının yanı sıra boyutlarının da standart ambar kapasitelerini aşabilmesi ve özel sabitleme gereksinimleri taşımasıdır.

**Vinç Operasyonu ve Stabilite Etkisi**, ağır yük taşımacılığının en kritik aşamasıdır. Bir yük vinçle kaldırıldığı anda, yükün ağırlığı vincin pivot noktasına transfer olur. Bu transfer, ağırlık merkezinin aniden yukarı ve yana kaymasına neden olur. Kaldırma sırasında oluşan yatırıcı moment şu şekilde hesaplanır:

────────────
Mvinç = W × R × cos(θ)
────────────

Burada W yükün ağırlığı, R vincin yarıçapı ve θ boom açısıdır. Ancak bunun ötesinde, asılı bir yük serbest yüzey etkisine benzer bir davranış gösterir. Asılı yük, geminin yatmasıyla birlikte sallanır ve ağırlık merkezini yatılan tarafa kaydırır. Bu "asılı yük serbest yüzey etkisi" şu şekilde ifade edilir:

────────────
GG₁ = W × h / Δ
────────────

Burada h, yükün asılma noktası ile ağırlık merkezi arasındaki düşey mesafedir. Bu etki, serbest yüzey etkisine benzer biçimde GM'i düşürür ve vinç operasyonu sırasında stabilite kaybına neden olabilir. Bu nedenle ağır yük kaldırma operasyonlarında, operasyon başlamadan önce tüm stabilite hesapları yapılmalı, yeterli GM marjı sağlanmalı ve gerekirse karşı balast hazırlanmalıdır.

**Sabitleme (Lashing) Hesabı**, seyir sırasında ağır yükün güvenli taşınmasını garanti etmek için zorunludur. IMO CSS Code (Code of Safe Practice for Cargo Stowage and Securing), sabitleme kuvvetlerinin hesaplanması için standart yöntemleri tanımlar. Sabitleme kuvveti şu şekilde hesaplanır:

────────────
Flashing = m × a × SF
────────────

Burada m yükün kütlesi, a beklenen maksimum ivme (gemi hareketlerinden kaynaklanan) ve SF güvenlik faktörüdür. İvme değerleri, geminin rulo, pitch ve heave hareketlerinin bileşimi olarak hesaplanır ve yükün gemideki konumuna göre değişir. Baş ve kıç uçlardaki ivmeler, geminin ortasına göre daha büyüktür.

**Lokal yapısal yük kontrolü**, ağır yüklerin güverte veya ambar tabanına uyguladığı basıncın izin verilen sınırlar içinde kalmasını sağlar. Güverte yük kapasitesi genellikle ton/m² cinsinden ifade edilir ve dunnage (ahşap yastıklar) kullanılarak yük dağılımı optimize edilir.`,
        formulas: [
          {
            formula: "Mvinç = W × R × cos(θ)",
            description: "Vinç operasyonu yatırıcı momenti"
          },
          {
            formula: "GG₁ = W × h / Δ",
            description: "Asılı yük serbest yüzey etkisi"
          },
          {
            formula: "Flashing = m × a × SF",
            description: "Sabitleme kuvveti hesabı"
          }
        ],
        keyPoints: [
          "Ağır yükler detaylı mühendislik planlaması gerektirir",
          "Vinç operasyonu stabiliteyi kritik düzeyde etkiler — asılı yük GM'i düşürür",
          "Sabitleme hesabı IMO CSS Code'a göre zorunludur",
          "Lokal yapısal yük kontrol edilmeli"
        ],
        warnings: [
          "Vinç kapasitesini (SWL) asla aşmayın",
          "Asimetrik kaldırmadan kaçının",
          "Sabitleme yetersizliği seyir sırasında yük kaymasına ve kazaya yol açar",
          "Hava koşullarını dikkate alın — rüzgâr kaldırma operasyonunu tehlikeli hale getirebilir"
        ]
      },
      {
        id: "dangerous-goods",
        title: "Tehlikeli Maddeler (IMDG)",
        content: `IMDG Code (International Maritime Dangerous Goods Code), tehlikeli maddelerin deniz yoluyla taşınmasını düzenleyen uluslararası standarttır. Tehlikeli maddeler, yanıcılık, patlayıcılık, zehirlilik, radyoaktivite veya aşındırıcılık gibi özellikleri nedeniyle özel taşıma, istifleme ve acil durum prosedürleri gerektirir. Bu maddelerin stabilite üzerindeki etkileri de ayrıca değerlendirilmelidir.

Tehlikeli maddeler dokuz sınıfa ayrılır: Sınıf 1 (patlayıcılar), Sınıf 2 (gazlar), Sınıf 3 (yanıcı sıvılar), Sınıf 4 (yanıcı katılar), Sınıf 5 (oksitleyici maddeler), Sınıf 6 (zehirli maddeler), Sınıf 7 (radyoaktif maddeler), Sınıf 8 (aşındırıcı maddeler) ve Sınıf 9 (diğer tehlikeli maddeler). Her sınıfın taşıma koşulları, ayrıştırma (segregation) gereksinimleri ve acil durum prosedürleri farklıdır.

Stabilite açısından en kritik konulardan biri, sıvı tehlikeli maddelerin tank tipi gereksinimleridir. IMO, tehlikeli sıvıların taşınması için Tip 1, Tip 2 ve Tip 3 tanklar tanımlamıştır; her bir tip, farklı yapısal dayanım ve sızıntı koruma seviyesi sunar. Bu tanklardaki serbest yüzey etkisi, standart yakıt veya balast tanklarında olduğu gibi hesaplanır ve toplam FSM'ye dahil edilir.

Dökme tehlikeli maddelerde kayma potansiyeli, nem hassasiyeti, kendiliğinden ısınma ve gaz oluşumu gibi riskler stabiliteyi dolaylı olarak etkiler. Örneğin, kendiliğinden tutuşan bir kargo ambar içinde yangına neden olursa, yangın söndürme suyu geminin stabilitesini dramatik biçimde bozabilir. Ambar içine pompalanan söndürme suyu, büyük serbest yüzey etkisi yaratır ve GM'i hızla düşürür.

Sıvı tehlikeli maddelerin sıcaklık genleşmesi de dikkate alınmalıdır:

────────────
Vgenleşme = V₀ × β × ΔT
────────────

Burada V₀ başlangıç hacmi, β termal genleşme katsayısı ve ΔT sıcaklık değişimidir. Tankların doluluk oranı, bu genleşmeyi karşılayacak şekilde %98'i geçmemelidir.

IMDG Code'a göre ayrıştırma (segregation) kuralları, uyumsuz maddelerin birbirine yakın istiflenmesini yasaklar. Bu kurallar, kargo planının hazırlanmasında stabilite hesaplarıyla birlikte değerlendirilmelidir; çünkü ayrıştırma gereksinimleri, yükün gemideki dağılımını ve dolayısıyla ağırlık merkezinin konumunu etkiler.

Acil durum hazırlığı kapsamında, EmS (Emergency Schedule) prosedürleri her tehlikeli madde için tanımlanmıştır. Yangın söndürme, dökülme müdahalesi ve ilk yardım prosedürleri, geminin stabilite durumunu da göz önünde bulundurmalıdır. Özellikle yangın söndürme suyunun stabilite üzerindeki etkisi önceden hesaplanmalı ve jettison (denize atma) kararı için eşik değerler belirlenmelidir.`,
        formulas: [
          {
            formula: "Vgenleşme = V₀ × β × ΔT",
            description: "Sıvı termal genleşme hesabı"
          },
          {
            formula: "Tank doluluk ≤ %98",
            description: "Genleşme payı için maksimum doluluk sınırı"
          }
        ],
        keyPoints: [
          "Tehlikeli maddeler IMDG Code'a göre taşınır — 9 sınıf tanımlanmıştır",
          "Sıvı tehlikeli maddelerin serbest yüzey etkisi hesaplanmalıdır",
          "Ayrıştırma kuralları kargo planını ve ağırlık dağılımını etkiler",
          "Yangın söndürme suyunun stabilite etkisi önceden değerlendirilmelidir"
        ],
        warnings: [
          "IMDG kurallarını ihlal etmeyin — hukuki sorumluluk doğar",
          "Uyumsuz maddeleri bir arada taşımayın",
          "Yangın söndürme suyu GM'i hızla düşürebilir",
          "Termal genleşme nedeniyle tankları %98'in üzerinde doldurmayın"
        ]
      },
      {
        id: "container-cargo",
        title: "Konteyner Kargoları",
        content: `Konteyner gemileri modern deniz taşımacılığının temelini oluşturur ve gemi stabilitesi açısından benzersiz zorluklar sunar. Güverte üstü konteyner istifleme, yüksek VCG, büyük rüzgâr yüzey alanı ve parametrik yalpa riski, konteyner gemilerinin stabilite yönetimini diğer gemi tiplerinden ayıran temel faktörlerdir.

Standart konteyner boyutları şu şekildedir: 20 ft TEU (6,1 m × 2,4 m × 2,6 m), 40 ft FEU (12,2 m × 2,4 m × 2,6 m) ve 45 ft High Cube (13,7 m × 2,4 m × 2,9 m). Konteyner ağırlıkları geniş bir aralıkta değişir: boş bir 20 ft konteyner yaklaşık 2,2 ton iken, tam yüklü ağırlığı 30,5 tona kadar çıkabilir. Bu büyük ağırlık aralığı, stabilite hesaplarında doğru ağırlık bilgisinin kritik önemini vurgular.

**Yüksek VCG Problemi**, konteyner gemilerinin en temel stabilite sorunudur. Modern konteyner gemileri, güverte üstünde 6 ila 10 katman konteyner istifleyebilir. Bu istifleme, VCG'yi önemli ölçüde yükseltir ve GM'i düşürür. İstif VCG hesabı şu şekilde yapılır:

────────────
VCGistif = Σ(Wᵢ × VCGᵢ) / Σ(Wᵢ)
────────────

Burada her katmandaki (tier) konteynerlerin ağırlıkları ve düşey konumları ayrı ayrı hesaba katılır. Bay-Row-Tier sistemi, her konteynerin gemideki tam konumunu tanımlar ve stabilite yazılımları bu sistemi kullanarak detaylı hesaplamalar yapar.

**VGM (Verified Gross Mass)** zorunluluğu, SOLAS VI/2 uyarınca 2016'dan itibaren uygulanmaktadır. Her konteynerin tartılmış veya hesaplanmış brüt ağırlığı, yükleme öncesinde belgelenmelidir. VGM bilgisi olmayan konteynerler gemiye yüklenmemelidir. Bu zorunluluk, daha önce yaşanan ve kötü beyan edilen ağırlıkların sebep olduğu stabilite kazalarını önlemek amacıyla getirilmiştir.

**Rüzgâr Momenti**, konteyner gemilerinde özellikle kritiktir. Güverte üstü konteyner yığınları, çok büyük yanal projeksiyon alanı oluşturur. Bu alan, rüzgâr basıncıyla birleşerek yüksek heeling momenti üretir. IMO Weather Criterion hesaplarında bu alan doğrudan kullanılır ve rüzgâr heeling arm değerini belirler. Güverte üstü istiflemenin her katmanı, rüzgâr alanını ve dolayısıyla heeling momentini artırır.

**Parametrik Yalpa (Parametric Rolling)**, konteyner gemileri için özellikle tehlikeli bir fenomendir. Modern konteyner gemilerinin geniş baş ve kıç flare'ları, dalga geçişi sırasında su hattı alanının büyük ölçüde değişmesine neden olur. Bu değişim, GM'in periyodik olarak artıp azalmasına yol açar ve belirli dalga koşullarında rezonans oluşturarak salınım açılarının 40° üzerine çıkmasına sebep olabilir. Parametrik yalpa, konteyner kaybının en yaygın nedenlerinden biridir ve yıllık olarak binlerce konteyner bu fenomen nedeniyle denize düşmektedir.

**Bay Plan Optimizasyonu**, konteyner gemilerinde stabilite yönetiminin pratik aracıdır. Temel prensipler şunlardır: ağır konteynerler mümkün olduğunca alt katmanlara yerleştirilir (VCG düşürülür); reefer konteynerler enerji kaynaklarına yakın konumlandırılır; tehlikeli madde içeren konteynerler IMDG ayrıştırma kurallarına uygun biçimde istiflenir ve boşaltma limanı sırasına göre erişilebilirlik planlanır.`,
        formulas: [
          {
            formula: "VCGistif = Σ(Wᵢ × VCGᵢ) / Σ(Wᵢ)",
            description: "İstif VCG hesabı"
          },
          {
            formula: "Stackweight ≤ Stacking limit",
            description: "Toplam istif ağırlığı sınırı"
          }
        ],
        keyPoints: [
          "VGM (Verified Gross Mass) SOLAS uyarınca zorunludur",
          "Yüksek VCG, konteyner gemilerinin temel stabilite sorunudur",
          "Büyük rüzgâr yüzey alanı, heeling momentini artırır",
          "Parametrik yalpa konteyner gemileri için ciddi bir risktir"
        ],
        warnings: [
          "VGM belgesi olmayan konteynerler yüklenmemelidir",
          "Stacking limitlerini aşmayın — yapısal hasar ve konteyner kaybı riski",
          "Lashing kontrollerini atlamayın",
          "Baş veya kıçtan dalga koşullarında parametrik yalpa riskini değerlendirin"
        ]
      }
    ]
  },

  // ==================== BÖLÜM 13: YÜKLEME BİLGİSAYARLARI ====================
  {
    id: "loading-computers",
    title: "13. Yükleme Bilgisayarları",
    icon: "💻",
    iconColor: "text-purple-500",
    description: "Modern yükleme yazılımları, onay gereksinimleri ve operasyonel kullanım",
    subtopics: [
      {
        id: "loading-software",
        title: "Yükleme Yazılımları",
        content: `Yükleme bilgisayarı (Loading Computer), geminin stabilite, boyuna mukavemet ve diğer kritik parametrelerini hesaplayan onaylı yazılım sistemidir. Modern denizcilik işletmeciliğinde yükleme bilgisayarı, güvenli operasyonun vazgeçilmez bir aracı haline gelmiştir ve birçok gemi tipi için klas kuruluşları tarafından zorunlu tutulmaktadır.

SOLAS düzenlemeleri çerçevesinde yükleme bilgisayarı kullanımı, bulk carrier, tanker ve konteyner gemileri için zorunludur. 150 GRT ve üzeri diğer gemi tiplerinde de kuvvetle tavsiye edilir. Kullanılan yazılımın, klas kuruluşu tarafından onaylanmış (type approved) olması ve gemiye özel verilerin doğrulanmış olması şarttır.

Yükleme bilgisayarının temel fonksiyonları dört ana başlık altında ele alınır. **Stabilite Hesabı** kapsamında yazılım; draft, trim ve heel değerlerini hesaplar, KG ve GM değerlerini belirler, GZ eğrisini oluşturur ve tüm IMO stabilite kriterlerini otomatik olarak kontrol eder. Herhangi bir kriterin sağlanmadığı durumda alarm veya uyarı üretir.

**Boyuna Mukavemet Hesabı**, geminin boyuna kesit boyunca kesme kuvveti (shear force) ve eğilme momenti (bending moment) diyagramlarını hesaplar. Bu değerler, klas kuruluşu tarafından belirlenen sınır değerlerle karşılaştırılır ve aşım durumunda uyarı verilir. Özellikle bulk carrier ve tanker gibi gemilerde, yükleme sıralamasının boyuna mukavemet limitlerini aşmaması kritik önem taşır.

**Tank Yönetimi** fonksiyonu, tüm tankların kapasite tablolarını, sounding/ullage dönüşümlerini ve serbest yüzey momentlerini içerir. Tankların doluluk durumu girildikçe, yazılım otomatik olarak ağırlık, VCG, LCG ve FSM değerlerini hesaplar.

**Kargo Planlama** fonksiyonu, konteyner gemilerinde bay plan optimizasyonunu, genel kargo gemilerinde ambar yükleme planını ve tüm gemi tiplerinde ağırlık dağılımı analizini kapsar.

Piyasadaki yaygın ticari yazılımlar arasında NAPA Loading Computer, CargoMax, LoadMaster ve Autoload yer alır. Klas kuruluşlarının kendi yazılımları da mevcuttur: DNV LoadLine, Lloyd's ShipWeight ve BV HullManager bunlar arasında sayılabilir. Modern sistemler ECDIS entegrasyonu, VDR bağlantısı ve uzaktan izleme gibi gelişmiş özellikler de sunmaktadır.

Yükleme bilgisayarının doğruluğu, içindeki verilerin doğruluğuna bağlıdır. Hidrostatik tablolar, tank kapasiteleri ve lightship verileri, gemiye özgü olarak gömülüdür ve eğim testi sonuçlarıyla kalibre edilmiştir. Bu verilerin herhangi bir gemi modifikasyonu sonrasında güncellenmesi ve klas kuruluşu tarafından yeniden onaylanması zorunludur.`,
        keyPoints: [
          "Yükleme bilgisayarı bulk carrier, tanker ve konteyner gemilerinde zorunludur",
          "Klas kuruluşu onayı (type approval) gereklidir",
          "Stabilite, boyuna mukavemet ve tank yönetimi fonksiyonlarını kapsar",
          "Düzenli güncelleme ve kalibrasyon gerekir"
        ],
        practicalTips: [
          "Yazılımı düzenli güncelleyin ve kalibrasyon tarihlerini takip edin",
          "Sonuçları manuel hesaplarla çapraz kontrol edin",
          "Hata mesajlarını ve uyarıları ciddiye alın",
          "Yedek hesaplama yöntemi (manual worksheets) hazır bulundurun"
        ],
        warnings: [
          "Onaysız yazılım kullanmayın — PSC denetimlerinde eksiklik raporu alırsınız",
          "Sonuçları sorgulamadan kabul etmeyin — giriş hataları yanıltıcı sonuçlar verir",
          "Arızalı bilgisayarla seyir etmeyin"
        ]
      },
      {
        id: "software-usage",
        title: "Yazılım Kullanımı ve Operasyonlar",
        content: `Yükleme bilgisayarının doğru kullanımı, yazılımın sunduğu hesaplama gücünün ancak doğru verilerle beslenmesi durumunda değer taşıdığı gerçeğine dayanır. Veri girişindeki bir hata, tüm hesaplama sonuçlarını geçersiz kılar; bu nedenle sistematik bir veri girişi ve doğrulama prosedürü uygulanmalıdır.

**Veri girişi**, yükleme bilgisayarı kullanımının en kritik aşamasıdır. Tank verileri girişinde, her tankın sounding veya ullage değeri ölçülür ve yazılıma girilir. Sıvının yoğunluğu (API gravity veya doğrudan yoğunluk değeri) ve sıcaklığı da girilmelidir; çünkü sıcaklık düzeltmesi, özellikle yakıt tanklarında ağırlık hesabının doğruluğunu doğrudan etkiler. Kargo verileri girişinde, her bir kargo partisinin ağırlığı ve istifleme konumu (VCG, LCG koordinatları) belirtilir. Lightship verileri ve hidrostatik tablolar yazılımda yerleşik olarak bulunur ve kullanıcı tarafından değiştirilmez.

**Hesaplama Adımları** şu sırayla gerçekleştirilir:

Birinci adımda mevcut durum girilir: tüm tank soundingleri, kargo miktarları ve sarf malzemeleri yazılıma aktarılır. Yazılım, mevcut durumun draft, trim, heel, GM ve GZ eğrisi değerlerini hesaplar.

İkinci adımda sonuçlar kontrol edilir: hesaplanan draft ve trim değerlerinin gemideki fiili okumayla örtüşüp örtüşmediği doğrulanır. Büyük bir sapma, veri girişinde hata olduğuna işaret eder.

Üçüncü adımda planlanan durum girilir: yükleme veya boşaltma planı, tank transferleri ve yakıt tüketimi senaryosu yazılıma aktarılır. Yazılım, planlanan durumun da tüm kriterlerini hesaplar.

Dördüncü adımda karşılaştırma ve onay yapılır: mevcut ve planlanan durumlar karşılaştırılır, tüm kriterlerin her iki durumda da sağlandığı doğrulanır ve plan onaylanır veya revize edilir.

**Yaygın Hatalar** ve bunlardan kaçınma yöntemleri aşağıda sıralanmıştır:

Giriş hataları arasında yanlış tank numarası seçimi, yoğunluk değerinin yanlış girilmesi ve birim hataları (metrik ton ile uzun ton karışıklığı) yer alır. Bu hataları önlemek için veri girişi çift kontrol edilmeli ve önceki durumlarla karşılaştırma yapılmalıdır.

Yorumlama hataları arasında uyarıların göz ardı edilmesi, GM yerine GMfluid kontrolü yapılmaması ve serbest yüzey düzeltmesinin unutulması sayılabilir. Yazılımın ürettiği tüm uyarı ve alarmlar dikkatle değerlendirilmelidir.

Sistem hataları arasında güncel olmayan veri seti, kalibrasyon kayması ve yazılım hataları (bug) bulunur. Yazılımın periyodik olarak güncellenmesi ve kalibrasyonunun doğrulanması bu hataları minimize eder.

**Kalite Kontrol Prosedürü** olarak, hesaplanan sonuçların mantıksal değerlendirmesi yapılmalıdır. Örneğin, 500 ton yük alındığında draftta yalnızca birkaç santimetrelik değişim hesaplanıyorsa, bu durum TPC değeriyle uyumlu mudur? GM değeri beklenenden çok farklıysa, bunun nedeni nedir? Bu tür basit mantıksal kontroller, büyük hataların tespit edilmesinde son derece etkilidir.`,
        formulas: [
          {
            formula: "Weight = Volume × ρ",
            description: "Tank ağırlığı hesabı (sounding → hacim → ağırlık)"
          },
          {
            formula: "GM = KM - KG",
            description: "GM doğrulama hesabı"
          },
          {
            formula: "Trim = (LCG - LCB) × Δ / MCT",
            description: "Trim doğrulama hesabı"
          }
        ],
        keyPoints: [
          "Doğru veri girişi en kritik adımdır — hata tüm sonuçları geçersiz kılar",
          "Sonuçları sorgulamadan kabul etmeyin — mantıksal değerlendirme yapın",
          "Hem mevcut hem planlanan durumlar kontrol edilmeli",
          "Yaygın hataları bilin ve önlem alın"
        ],
        warnings: [
          "Yanlış veri tehlikeli sonuçlar verir",
          "Uyarıları göz ardı etmeyin",
          "Kriterlere tam sınırda kalmayın — güvenlik marjı bırakın",
          "Arızalı sisteme güvenmeyin — yedek yöntem kullanın"
        ]
      },
      {
        id: "approval-certification",
        title: "Onay ve Sertifikasyon",
        content: `Yükleme bilgisayarlarının onay ve sertifikasyon süreci, denizcilik güvenliğinin temel unsurlarından biridir. Onaysız veya süresi geçmiş onaylı bir yazılımın kullanılması, yasal mevzuata aykırı olmanın ötesinde, güvenlik açısından ciddi riskler taşır.

Onay süreci iki temel aşamadan oluşur. **Tip Onayı (Type Approval)**, yazılımın genel olarak denizcilik standartlarına uygunluğunu belgelendiren süreçtir. Klas kuruluşu, yazılımın algoritmalarını, hesaplama doğruluğunu ve kullanıcı arayüzünü inceler. Test senaryoları uygulanarak hesaplama sonuçlarının bilinen doğru değerlerle karşılaştırılması yapılır. İzin verilen hesaplama sapması genellikle ±%2 ile sınırlandırılmıştır. Tip onayı, yazılımın tüm gemilerde kullanılabilir olduğunu belgeler; ancak belirli bir gemi için geçerliliği tek başına yeterli değildir.

**Gemi Bazlı Onay**, tip onayını almış yazılımın belirli bir gemi için özelleştirilmesinin doğrulanmasıdır. Bu aşamada, geminin hidrostatik verileri, tank kapasiteleri ve lightship bilgileri yazılıma doğru olarak girildiği kontrol edilir. Eğim testi (inclining experiment) sonuçları entegre edilir ve yazılımın bu gemiye özgü hesaplamaları doğru ürettiği doğrulanır. Gemi bazlı onay, klas kuruluşu surveyor'u tarafından gemide yapılan doğrulama ile tamamlanır.

Onay standartları, IACS Unified Requirements (özellikle UR S1 boyuna mukavemet ve UR L5 yükleme bilgisayarları), IMO MSC.1/Circ.1229 (onaylı yükleme yazılımları gereksinimleri) ve SOLAS II-1/5-1 (bilgisayar destekli stabilite) çerçevesinde belirlenir.

**Periyodik Gereksinimler** kapsamında, yükleme bilgisayarının yıllık doğrulaması yapılır, 5 yıllık dönemlerde yeniden onay alınır ve herhangi bir gemi modifikasyonu sonrasında (ambar değişikliği, üst yapı eklenmesi, tank modifikasyonu vb.) yazılım güncellemesi ve yeniden onay zorunludur.

PSC (Port State Control) denetimlerinde, yükleme bilgisayarının onay belgeleri, kalibrasyon tarihleri ve yazılım sürüm bilgileri kontrol edilir. Onay belgesinin bulunmaması veya süresi geçmiş olması, eksiklik raporu (deficiency) olarak kaydedilir ve geminin tutulmasına (detention) neden olabilir.`,
        formulas: [
          {
            formula: "|Hesaplanan − Referans| / Referans ≤ %2",
            description: "İzin verilen hesaplama sapması"
          }
        ],
        keyPoints: [
          "Tip onayı ve gemi bazlı onay ayrı süreçlerdir — her ikisi de gereklidir",
          "Klas kuruluşu onayı zorunludur",
          "Periyodik doğrulama (yıllık) ve yeniden onay (5 yıllık) gerekir",
          "Modifikasyonlar yeniden onay gerektirir"
        ],
        warnings: [
          "Onaysız yazılım kullanmak kurallara aykırıdır ve PSC tutulmasına yol açabilir",
          "Süresi geçmiş onay geçersizdir",
          "İzinsiz modifikasyon onayı iptal eder",
          "PSC denetimlerinde onay belgeleri istenir"
        ]
      }
    ]
  },

  // ==================== BÖLÜM 14: SAYISAL ÖRNEKLER ====================
  {
    id: "numerical-examples",
    title: "14. Sayısal Örnekler",
    icon: "🔢",
    iconColor: "text-indigo-500",
    description: "Adım adım çözümlü stabilite problemleri ve hesaplama örnekleri",
    subtopics: [
      {
        id: "gm-calculations",
        title: "GM ve KG Hesap Örnekleri",
        content: `GM ve KG hesabı, gemi stabilitesinin en temel işlemidir ve her yükleme durumunda sistematik olarak gerçekleştirilmelidir. Aşağıdaki örnekler, moment tablosu yöntemini adım adım uygulamaktadır.

**Örnek 1 — Temel GM Hesabı**

Bir kargo gemisinin hidrostatik verilerine göre mevcut deplasmanında KM = 8,50 m'dir. Gemideki ağırlık bileşenleri şu şekildedir:

────────────────────────────────────────────
Bileşen         Ağırlık (t)   VCG (m)   Moment (t·m)
────────────────────────────────────────────
Lightship        7 500         7,20       54 000
Kargo            5 000         6,50       32 500
Yakıt            2 500         3,00        7 500
────────────────────────────────────────────
Toplam          15 000          —         94 000
────────────────────────────────────────────

Adım 1 — KG hesabı:
KG = Toplam Moment / Toplam Ağırlık = 94 000 / 15 000 = 6,27 m

Adım 2 — GM hesabı:
GM = KM − KG = 8,50 − 6,27 = 2,23 m

Sonuç: GM = 2,23 m. Bu değer, IMO minimum kriteri olan 0,15 m'nin çok üzerindedir ve yeterli stabiliteyi gösterir. Ancak GM'in büyük olması, geminin "sert" davranış gösterebileceğine işaret eder; rulo periyodu kısa olabilir.

**Örnek 2 — Serbest Yüzey Düzeltmeli GM Hesabı**

Yukarıdaki gemide iki tank kısmen doludur:
— Yakıt tankı FSM = 1 200 t·m
— Balast tankı FSM = 800 t·m

Adım 1 — Toplam FSM:
ΣFSM = 1 200 + 800 = 2 000 t·m

Adım 2 — Serbest yüzey düzeltmesi:
GG₁ = ΣFSM / Δ = 2 000 / 15 000 = 0,133 m

Adım 3 — Efektif GM:
GMeff = GMsolid − GG₁ = 2,23 − 0,133 = 2,10 m

Sonuç: GMeff = 2,10 m. Serbest yüzey etkisi GM'i 0,13 m düşürmüştür; ancak değer hâlâ yeterlidir.

**Örnek 3 — Yük Ekleme ve Çıkarma**

Yukarıdaki gemiden 1 000 ton yük (VCG = 6,50 m) boşaltılıyor ve yerine 1 500 ton ağır yük (VCG = 2,80 m) alınıyor. Yeni deplasmandaki KM = 8,40 m (değişmiştir çünkü draft değişmiştir).

Adım 1 — Yük boşaltma:
Yeni Δ = 15 000 − 1 000 = 14 000 ton
Çıkan moment = 1 000 × 6,50 = 6 500 t·m
Yeni toplam moment = 94 000 − 6 500 = 87 500 t·m

Adım 2 — Yük alma:
Yeni Δ = 14 000 + 1 500 = 15 500 ton
Eklenen moment = 1 500 × 2,80 = 4 200 t·m
Yeni toplam moment = 87 500 + 4 200 = 91 700 t·m

Adım 3 — Yeni KG:
KG = 91 700 / 15 500 = 5,92 m

Adım 4 — Yeni GM:
GM = 8,40 − 5,92 = 2,48 m

Sonuç: Ağır yükün alt seviyeye yerleştirilmesi KG'yi düşürmüş (6,27 → 5,92 m) ve GM'i artırmıştır (2,23 → 2,48 m). Bu, ağır yüklerin aşağıya yerleştirilmesinin stabiliteyi iyileştirdiğini somut olarak göstermektedir.`,
        formulas: [
          {
            formula: "KG = Σ(w × VCG) / Σw",
            description: "Ağırlık merkezi hesabı"
          },
          {
            formula: "GM = KM - KG",
            description: "Metasantrik yükseklik"
          },
          {
            formula: "GMeff = GM - ΣFSM / Δ",
            description: "Serbest yüzey düzeltmeli GM"
          }
        ],
        keyPoints: [
          "Moment tablosu sistematik olarak hazırlanmalıdır",
          "Serbest yüzey düzeltmesi her zaman dahil edilmelidir",
          "KM değeri deplasmanla değişir — güncel hidrostatik tablolardan okunmalıdır"
        ]
      },
      {
        id: "trim-calculations",
        title: "Trim Hesap Örnekleri",
        content: `Trim hesabı, yükleme planlamasının en sık uygulanan operasyonel hesaplarından biridir. Aşağıdaki örnekler, farklı senaryolarda trim hesabının nasıl yapıldığını adım adım göstermektedir.

**Örnek 1 — Yükleme Sonrası Trim Değişimi**

Bir kargo gemisinin mevcut durumu:
— Baş draft (TF) = 6,50 m
— Kıç draft (TA) = 7,20 m
— LCF = 82,5 m (kıçtan)
— MCT₁cm = 320 t·m/cm
— LBP = 160 m

500 ton kargo, kıçtan 120 m mesafeye yüklenecektir.

Adım 1 — Mevcut trim:
Trim = TA − TF = 7,20 − 6,50 = 0,70 m (kıça trim)

Adım 2 — Yükleme pozisyonu ve LCF'ye göre mesafe:
d = 120 − 82,5 = 37,5 m (LCF'nin başı tarafında)

Adım 3 — Trimming moment:
TM = w × d = 500 × 37,5 = 18 750 t·m

Adım 4 — Trim değişimi:
ΔTrim = TM / MCT₁cm = 18 750 / 320 = 58,6 cm = 0,586 m
Yük LCF'nin başı tarafına konduğundan → başa trim etkisi

Adım 5 — Yeni trim:
Yeni trim = 0,70 − 0,586 = 0,114 m (kıça trim, çok azalmış)

Adım 6 — Baş ve kıç draft değişimleri:
Paralel batma = w / TPC (TPC verilmemişse ihmal edilebilir)
ΔTF = ΔTrim × (LBP − LCF) / LBP = 0,586 × (160 − 82,5) / 160 = 0,586 × 0,484 = 0,284 m (artar)
ΔTA = ΔTrim × LCF / LBP = 0,586 × 82,5 / 160 = 0,302 m (azalır)

Sonuç: Yeni TF ≈ 6,50 + 0,284 = 6,78 m, Yeni TA ≈ 7,20 − 0,302 = 6,90 m

**Örnek 2 — İstenen Trim İçin Balast Hesabı**

Gemi even keel durumunda (trim = 0). İstenen durum: 0,50 m başa trim.
— MCT₁cm = 280 t·m/cm
— Baş pik tankı konumu: kıçtan 145 m
— LCF = 78 m (kıçtan)

Adım 1 — Gerekli trim değişimi:
ΔTrim = 0,50 m = 50 cm (başa)

Adım 2 — Gerekli trimming moment:
TM = ΔTrim × MCT₁cm = 50 × 280 = 14 000 t·m

Adım 3 — Balast miktarı:
d = 145 − 78 = 67 m (baş taraf)
w = TM / d = 14 000 / 67 = 209 ton

Sonuç: Baş pik tankına yaklaşık 209 ton balast alınması gerekir.

Bu hesap, MCT₁cm değerinin deplasmanla değiştiğini göz ardı eder. Büyük ağırlık değişikliklerinde, eklenen balastın deplasmanı ve dolayısıyla MCT₁cm değerini değiştireceği dikkate alınarak iteratif hesap yapılması gerekebilir.`,
        formulas: [
          {
            formula: "Trim = TA − TF",
            description: "Trim hesabı (pozitif = kıça trim)"
          },
          {
            formula: "ΔTrim = (w × d) / MCT₁cm",
            description: "Trim değişimi (cm)"
          },
          {
            formula: "w = (ΔTrim × MCT₁cm) / d",
            description: "Gerekli ağırlık hesabı"
          }
        ],
        keyPoints: [
          "LCF, trim değişiminin pivot noktasıdır — mesafeler LCF'ye göre ölçülür",
          "MCT₁cm birimi t·m/cm olmalıdır",
          "Trim yönünü doğru belirleyin — LCF'nin başına ağırlık → başa trim"
        ]
      },
      {
        id: "gz-curve-example",
        title: "GZ Eğrisi ve IMO Kriterleri Örneği",
        content: `GZ eğrisi analizi, geminin stabilite durumunun kapsamlı değerlendirmesini sağlar. Aşağıdaki örnek, verilen GZ değerlerinden IMO 2008 IS Code kriterlerinin kontrol edilmesini adım adım göstermektedir.

**Problem:**

Bir geminin hesaplanmış GZ değerleri aşağıdaki tabloda verilmiştir:

────────────────────────
Açı (°)    GZ (m)
────────────────────────
  0         0,000
 10         0,180
 20         0,380
 30         0,520
 40         0,450
 50         0,320
 60         0,150
 70        −0,020
────────────────────────

IMO A.749 (2008 IS Code) kriterlerini kontrol ediniz.

**Çözüm:**

**Kriter 1 — GZ₃₀ ≥ 0,20 m:**
GZ₃₀ = 0,520 m → 0,520 ≥ 0,20 ✓ KARŞILANIYOR

**Kriter 2 — GZmax en az 25°'de oluşmalı:**
GZmax = 0,520 m, 30°'de oluşuyor → 30° ≥ 25° ✓ KARŞILANIYOR

**Kriter 3 — Alan 0°–30° ≥ 0,055 m·rad:**

Trapez kuralı ile alan hesabı (açılar radyana çevrilir: Δθ = 10° = 0,1745 rad):

A₀₋₁₀ = (0,000 + 0,180) / 2 × 0,1745 = 0,0157 m·rad
A₁₀₋₂₀ = (0,180 + 0,380) / 2 × 0,1745 = 0,0489 m·rad
A₂₀₋₃₀ = (0,380 + 0,520) / 2 × 0,1745 = 0,0785 m·rad

A₀₋₃₀ = 0,0157 + 0,0489 + 0,0785 = 0,1431 m·rad → 0,1431 ≥ 0,055 ✓ KARŞILANIYOR

**Kriter 4 — Alan 0°–40° ≥ 0,090 m·rad:**

A₃₀₋₄₀ = (0,520 + 0,450) / 2 × 0,1745 = 0,0847 m·rad
A₀₋₄₀ = 0,1431 + 0,0847 = 0,2278 m·rad → 0,2278 ≥ 0,090 ✓ KARŞILANIYOR

**Kriter 5 — Alan 30°–40° ≥ 0,030 m·rad:**
A₃₀₋₄₀ = 0,0847 m·rad → 0,0847 ≥ 0,030 ✓ KARŞILANIYOR

**Kriter 6 — GM₀ ≥ 0,15 m:**
Küçük açılarda GM ≈ GZ / sin(θ)
GM₀ ≈ 0,180 / sin(10°) = 0,180 / 0,1736 = 1,04 m → 1,04 ≥ 0,15 ✓ KARŞILANIYOR

**Sonuç:** Tüm IMO 2008 IS Code kriterleri karşılanmaktadır. Vanishing angle (yok olma açısı), GZ'nin sıfırı kestiği yaklaşık 68° civarındadır. Bu değer makul bir stabilite menzili sağlamaktadır; ancak 60°'nin altına düşmemesi tercih edilir.

**Değerlendirme:**
Bu geminin iyi bir stabilite profili vardır. GZmax değeri yeterince büyük (0,520 m), maksimum GZ açısı uygun (30°) ve GZ eğrisi altındaki alanlar IMO kriterlerini rahat aşmaktadır. GM₀ = 1,04 m, güvenli ve konforlu seyir aralığındadır.`,
        formulas: [
          {
            formula: "Alan = Σ [(GZ₁ + GZ₂) / 2 × Δθrad]",
            description: "Trapez kuralı ile GZ eğrisi altı alan (m·rad)"
          },
          {
            formula: "GM₀ ≈ GZθ / sin(θ)",
            description: "Küçük açılarda GM tahmini"
          },
          {
            formula: "Δθrad = Δθ° × π / 180",
            description: "Derece-radyan dönüşümü"
          }
        ],
        keyPoints: [
          "Tüm IMO kriterleri birlikte kontrol edilmelidir — tek kriterin sağlanması yeterli değildir",
          "Alan hesabı için trapez kuralı ile sayısal integrasyon uygulanır",
          "Vanishing angle, geminin devrilme sınırının göstergesidir"
        ]
      },
      {
        id: "longitudinal-strength",
        title: "Boyuna Mukavemet Hesap Örneği",
        content: `Boyuna mukavemet hesabı, geminin boyuna kesit boyunca ağırlık dağılımı ile kaldırma kuvveti dağılımı arasındaki farktan kaynaklanan kesme kuvveti ve eğilme momentini belirler. Bu hesap, özellikle bulk carrier ve tanker gibi büyük gemilerde yapısal emniyetin sağlanması için kritik öneme sahiptir.

**Problem:**

Bir kargo gemisi (L = 180 m) için basitleştirilmiş ağırlık ve kaldırma kuvveti dağılımı aşağıda verilmiştir:

────────────────────────────────────────────────────────
Kesit (m)   Ağırlık (t/m)   Kaldırma (t/m)   Net Yük (t/m)
────────────────────────────────────────────────────────
0 – 30         80               60               +20
30 – 60       120              100               +20
60 – 90       150              160               −10
90 – 120      140              160               −20
120 – 150     100              100                 0
150 – 180      60               40               +20
────────────────────────────────────────────────────────

Pozitif net yük: ağırlık > kaldırma (gemi o bölgede batmak ister)
Negatif net yük: kaldırma > ağırlık (gemi o bölgede yükselmek ister)

**Çözüm — Adım 1: Kesme Kuvveti Hesabı**

Kesme kuvveti, net yük dağılımının integralidir:

SF(x) = ∫₀ˣ (w − b) dx

────────────────────────────────
Kesit Sonu       Kesme Kuvveti (ton)
────────────────────────────────
x = 0                0
x = 30       0 + 20 × 30 = 600
x = 60     600 + 20 × 30 = 1 200
x = 90   1 200 + (−10) × 30 = 900
x = 120    900 + (−20) × 30 = 300
x = 150    300 + 0 × 30 = 300
x = 180    300 + 20 × 30 = 900
────────────────────────────────

Maksimum kesme kuvveti: 1 200 ton (x = 60 m'de)

**Çözüm — Adım 2: Eğilme Momenti Hesabı**

Eğilme momenti, kesme kuvvetinin integralidir:

BM(x) = ∫₀ˣ SF dx

────────────────────────────────────────
Kesit       Eğilme Momenti (t·m)
────────────────────────────────────────
x = 0                0
x = 30     (0 + 600) / 2 × 30 = 9 000
x = 60     9 000 + (600 + 1 200) / 2 × 30 = 36 000
x = 90     36 000 + (1 200 + 900) / 2 × 30 = 67 500
x = 120    67 500 + (900 + 300) / 2 × 30 = 85 500
x = 150    85 500 + (300 + 300) / 2 × 30 = 94 500
────────────────────────────────────────

Maksimum eğilme momenti: yaklaşık 94 500 t·m (x ≈ 150 m'de)

**Sonuç ve Değerlendirme:**

Gemi, sagging (orta kısım aşağı bükülme) durumundadır çünkü baş ve kıç bölgelerde ağırlık fazlası, orta bölgede kaldırma fazlası vardır. Hesaplanan maksimum değerler, geminin yapısal sınırlarıyla karşılaştırılmalıdır:

— SFizin = 2 500 ton (varsayım) → SFmax = 1 200 ton → OK
— BMizin = 150 000 t·m (varsayım) → BMmax = 94 500 t·m → OK

Bu basitleştirilmiş örnekte sınırlar aşılmamıştır; ancak gerçek gemilerde yükleme bilgisayarı, her kesit için detaylı hesaplama yapar ve sınır aşımını anlık olarak kontrol eder.`,
        formulas: [
          {
            formula: "SF(x) = ∫₀ˣ (w − b) dx",
            description: "Kesme kuvveti integrali"
          },
          {
            formula: "BM(x) = ∫₀ˣ SF dx",
            description: "Eğilme momenti integrali"
          },
          {
            formula: "Net yük = Ağırlık dağılımı − Kaldırma dağılımı",
            description: "Birim uzunluk başına net yük"
          }
        ],
        keyPoints: [
          "Kesme kuvveti, net yükün integralidir",
          "Eğilme momenti, kesme kuvvetinin integralidir",
          "Sagging: orta kısım aşağı bükülme, Hogging: orta kısım yukarı bükülme",
          "İzin verilen sınırlar asla aşılmamalıdır"
        ]
      }
    ]
  },

  // ==================== BÖLÜM 15: PRATİK UYGULAMALAR ====================
  {
    id: "practical-applications",
    title: "15. Pratik Uygulamalar",
    icon: "⚙️",
    iconColor: "text-teal-500",
    description: "Gerçek dünya senaryoları, operasyonel prosedürler ve karar verme süreçleri",
    subtopics: [
      {
        id: "pre-departure-checklist",
        title: "Kalkış Öncesi Stabilite Kontrolü",
        content: `Kalkış öncesi stabilite kontrolü, her yolculuktan önce yapılması gereken zorunlu prosedürdür ve geminin tüm operasyonel dönemindeki emniyetin temelini oluşturur. Bu kontrol, sistematik bir süreç olarak uygulanmalı ve her adımı belgelenmelidir.

**Veri Toplama Aşaması** (kalkıştan en az 2 saat önce tamamlanmalıdır), tüm stabilite hesaplarının hammaddesini oluşturur. Bu aşamada gemideki her tankın sounding veya ullage değeri ölçülür; kargo miktarları manifesto ve yükleme raporlarıyla doğrulanır; yakıt, tatlı su ve sarf malzemesi envanterleri güncellenir; yolcu ve mürettebat sayısı (varsa) kaydedilir. Veri toplama sırasında ölçüm hataları, tüm sonraki hesapları geçersiz kılacağından, kritik tanklarda çift ölçüm yapılması önerilir.

**Yükleme Bilgisayarına Giriş** aşamasında, toplanan tüm veriler sistematik olarak yazılıma aktarılır. Tank verileri girilirken yoğunluk ve sıcaklık değerleri doğrulanır. Kargo ağırlıkları ve konumları belirtilir. Hem departure (kalkış) hem de arrival (varış) durumları için ayrı hesaplamalar yapılır; çünkü seyir boyunca yakıt tüketimi stabiliteyi önemli ölçüde değiştirebilir.

**Sonuç Kontrolü** aşamasında, hesaplanan değerler IMO kriterleriyle ve geminin onaylı limit eğrileriyle karşılaştırılır. Kontrol edilmesi gereken parametreler şunlardır:

— Draft ve trim değerlerinin makul olup olmadığı (gemideki fiili okumayla karşılaştırılır)
— GMeff ≥ 0,15 m (IMO minimum) — tercihen ≥ 0,50 m
— GZmax ≥ 0,20 m ve en az 25°'de oluşması
— GZ eğrisi altı alan kriterleri (0°–30°, 0°–40°, 30°–40°)
— Boyuna mukavemet limitlerinin aşılmamış olması
— Yükleme bilgisayarından herhangi bir uyarı veya alarm olmaması

**Operasyonel Değerlendirme** aşamasında, beklenen hava koşulları, yolculuk süresi ve rotadaki özel durumlar (dar su geçişi, sığ su) dikkate alınır. Ağır hava bekleniyorsa, GM marjının artırılması ve serbest yüzey etkisinin minimize edilmesi değerlendirilir.

**Onay ve Belgeleme** aşamasında, kaptan stabilite hesaplarını inceleyerek onaylar. Stabilite hesap kağıdı imzalanır ve dosyalanır. Yükleme planı kayıt altına alınır. Bu belgeler, PSC denetimleri ve olası kaza soruşturmaları için yasal geçerliliğe sahiptir.

────────────────────────────────────────────
Parametre         IMO Min.     Önerilen
────────────────────────────────────────────
GM₀               0,15 m       ≥ 0,50 m
GZ₃₀              0,20 m       ≥ 0,25 m
Alan 0°–30°       0,055 m·rad  ≥ 0,070 m·rad
SF / BM            ≤ %100       ≤ %85
────────────────────────────────────────────

Kriterlere tam sınırda kalmak, küçük bir ek etki veya hesaplama hatasının geminin güvenliğini tehlikeye düşürmesine zemin hazırlar. Bu nedenle her zaman yeterli bir güvenlik marjı bırakılmalıdır.`,
        keyPoints: [
          "Kalkış öncesi stabilite kontrolü zorunludur ve belgelenmelidir",
          "Hem departure hem arrival durumları ayrı ayrı kontrol edilmelidir",
          "IMO kriterlerine ek olarak güvenlik marjı bırakılmalıdır",
          "Draft ve trim hesapları fiili okumayla karşılaştırılarak doğrulanmalıdır"
        ],
        warnings: [
          "Eksik veri ile hesap yapmayın",
          "Uyarıları göz ardı etmeyin",
          "Kriterlere tam sınırda kalmaktan kaçının — güvenlik marjı hayati önemdedir"
        ]
      },
      {
        id: "voyage-monitoring",
        title: "Seyir Sırası İzleme",
        content: `Seyir sırasında stabilite izleme, kalkış öncesi yapılan hesaplamaların güncelliğini korumak ve değişen koşullara yanıt verebilmek için kritik öneme sahiptir. Gemi limandan ayrıldıktan sonra stabilite durumu, yakıt tüketimi, balast operasyonları ve çevresel koşullar nedeniyle sürekli değişir.

**Vardiya Bazında İzleme** kapsamında, her vardiyada yakıt tüketimi takip edilir, tank seviye değişimleri kontrol edilir, geminin draft ve trim durumu gözlemlenir ve rolling karakteristiği değerlendirilir. Rolling periyodunun uzaması, GM'in düşmekte olduğunun önemli bir göstergesidir ve derhal araştırılmalıdır.

**Günlük İzleme** kapsamında, 12 veya 24 saatlik aralıklarla tüm tankların soundingleri alınır, yakıt raporları güncellenir, yükleme bilgisayarında stabilite hesabı yenilenir ve noon report verileri hazırlanır. Günlük stabilite güncellemesi, seyir boyunca geminin emniyet durumunun sürekli izlenmesini sağlar.

**Kritik Olaylarda Acil Değerlendirme** gerekir. Hava durumunun bozulması (rüzgâr kuvveti artışı, dalga yüksekliği artışı), kargo kayması şüphesi (ani heel değişimi, asimetrik rolling), tank sızıntısı (beklenmeyen seviye değişimi, trim anomalisi) veya herhangi bir anormal davranış, derhal stabilite değerlendirmesini tetiklemelidir.

**Transfer Operasyonları** seyir sırasında stabiliteyi doğrudan etkiler. Yakıt transferlerinde iskele-sancak simetrisi korunmalı, GM değişimi izlenmeli ve kısmen dolu tank sayısı minimize edilmelidir. Balast operasyonlarında trim optimizasyonu, GM düzeltmesi ve IMO Balast Su Yönetimi (BWM) gereksinimleri birlikte değerlendirilmelidir. Özellikle açık denizde balast değişimi (ballast exchange) sırasında, sequential yöntemde tanklar tek tek boşaltılıp yeniden doldurulduğundan, her ara durum için stabilite kontrolü yapılmalıdır.

**Stabilite Kaybı Belirtileri** ve bunlara karşı acil eylemler şu şekilde özetlenebilir:

Uzun rolling periyodu → düşük GM → alt tanklara balast alın
Tek tarafa yatma eğilimi (loll) → GM ≈ 0 veya negatif → ACİL DURUM, dikkatli ve yavaş biçimde alt tanklara balast alın
Ani heel → kargo kayması veya flooding → hız azaltın, dalgalara karşı pozisyon alın, durumu değerlendirin
Aşırı hızlı rolling → dalga rezonansı → rota veya hız değiştirerek karşılaşma periyodunu kaydırın

Rolling periyodundan GM tahmini yapmak için pratik formül kullanılabilir:

────────────
GM ≈ (C × B / T)²
────────────

Burada C deneysel katsayı (0,7–0,9), B geminin genişliği ve T ölçülen rolling periyodudur. Bu yaklaşım, geminin stabilitesi hakkında hızlı bir fikir verir; ancak kesin değer yükleme bilgisayarından alınmalıdır.`,
        keyPoints: [
          "Stabilite sürekli izlenmeli — yakıt tüketimi ve balast operasyonları durumu değiştirir",
          "Rolling periyodunun uzaması düşük GM'in önemli bir göstergesidir",
          "Anormal durumlar derhal araştırılmalı ve müdahale edilmelidir",
          "Transfer operasyonlarında simetri ve GM kontrolü sağlanmalıdır"
        ],
        warnings: [
          "Uzun rolling periyodu uyarı işaretidir — göz ardı etmeyin",
          "Ani heel'e anında müdahale edin",
          "Balast değişimi sırasında ara durumları kontrol edin"
        ]
      },
      {
        id: "emergency-response",
        title: "Acil Durum Müdahalesi",
        content: `Stabilite kaybı acil bir durumdur ve doğru müdahale hayat kurtarabilir. Stabilite acil durumlarında panik en büyük düşmandır; sistematik değerlendirme ve kontrollü eylem, geminin ve mürettebatın kurtuluşunu sağlayan temel faktörlerdir.

**Uyarı İşaretleri** aşamasında stabilite kaybının başladığını gösteren belirtiler tanınmalıdır. Rolling periyodunun belirgin şekilde uzaması, GM'in düştüğüne işaret eder. Geminin dik durumdan tek tarafa yatma eğilimi göstermesi (loll durumu), GM'in sıfıra yaklaştığını veya negatife geçtiğini gösterir. Sürekli artan heel açısı ve geminin kendiliğinden düzelememesi, kritik stabilite kaybının başladığını bildirir.

**Anında Müdahale (0–5 dakika)** aşamasında şu eylemler gerçekleştirilir: MAYDAY mesajı hazırlığı yapılır (henüz gönderilmez ama hazırlık başlar); makineye hız azaltma veya durma emri verilir; gemi mümkünse dalgalara en güvenli pozisyonda tutulur (yan dalga koşullarından kaçınılır); mürettebat uyarılır ve can kurtarma donanımları hazır hale getirilir. Bu aşamada hızlı karar vermek kritiktir; ancak panikle alınan yanlış kararlar durumu kötüleştirebilir.

**Değerlendirme (5–15 dakika)** aşamasında, stabilite kaybının nedeni belirlenmeye çalışılır. Üç temel neden olasıdır: flooding (su girişi), kargo kayması veya aşırı serbest yüzey etkisi. Nedenin tespiti, uygulanacak düzeltici eylemi belirler.

**Flooding Durumunda Müdahale:** Hasarlı bölme tespit edilir ve mümkünse izole edilir (bölme kapıları kapatılır, delikler tıkanır). Pompalama başlatılır. Asimetrik heel durumunda karşı taraftaki bölmelere kontrollü su alınır (counter-flooding); ancak bu işlem toplam su miktarını artırdığından, dikkatli hesaplama gerektirir ve stabiliteyi daha da düşürme riski taşır.

**Kargo Kayması Durumunda Müdahale:** Gemi açık denize yönlendirilir ve keskin manevralardan kaçınılır. Aşırı hız ve ani dönüşler, kargo kaymasını artırabilir. Limana dönüş değerlendirilir; ancak durumun kötüleşmesi halinde MAYDAY çağrısı yapılır.

**Düşük GM Durumunda Müdahale:** Alt tanklara balast alınır (GM artırımı). Üst tanklar boşaltılır. Son çare olarak güverte yükünün denize atılması (jettison) değerlendirilir.

**Jettison (Denize Atma) Kararı**, son çare olarak uygulanır ve ciddi hukuki ile mali sonuçları vardır. Yalnızca batma riskinin yüksek olduğu ve başka çarenin kalmadığı durumlarda kaptan tarafından verilir. Jettison kararı detaylı olarak belgelenmeli, en düşük değerli veya en tehlikeli kargolar önce atılmalı ve yük hattı üzerinden denize bırakılmalıdır.

**Raporlama** kapsamında, şirket DPA (Designated Person Ashore) bilgilendirilir, klas kuruluşu ve bayrak devletine bildirim yapılır ve gerektiğinde SAR (Search and Rescue) koordinasyonu başlatılır. Tüm eylemler, zamanları ve sonuçlarıyla birlikte kayıt altına alınır.`,
        keyPoints: [
          "Erken müdahale kritiktir — belirtileri tanıyın ve hemen harekete geçin",
          "Nedenin tespiti doğru eylemi belirler: flooding, kargo kayması veya düşük GM",
          "Panik yapmadan sistematik hareket edin",
          "Jettison son çaredir ve belgelenmelidir"
        ],
        warnings: [
          "Yanlış counter-flooding toplam su miktarını artırır ve durumu kötüleştirebilir",
          "Panikle yapılan keskin manevralar kargo kaymasını artırabilir",
          "Loll durumunda yüksek tarafa hızlı balast almayın — gemi karşı tarafa devrilebilir"
        ]
      },
      {
        id: "port-operations",
        title: "Liman Operasyonları",
        content: `Liman operasyonları, geminin stabilite durumunun en hızlı ve en büyük değişimlere uğradığı dönemlerdir. Kargo yükleme ve boşaltma, balast operasyonları ve yakıt ikmalı sırasında ağırlık dağılımı sürekli değişir ve her aşamada stabilite ile boyuna mukavemet kriterlerinin sağlanması zorunludur.

**Yükleme Operasyonları**, planlama ve uygulama olmak üzere iki aşamada ele alınır. Planlama aşamasında kargo planı incelenir; stabilite hesabı her yükleme aşaması için yapılır; tank sıralaması belirlenir ve kritik anlar (GM'in en düşük olacağı veya boyuna mukavemetin en yüksek olacağı ara durumlar) önceden tanımlanır. Terminal ile yükleme hızı ve sırası konusunda koordinasyon sağlanır.

Uygulama aşamasında simetrik yükleme prensibi uygulanır: iskele ve sancak taraftaki ambarlar eş zamanlı olarak doldurulur. Ağır kargolar öncelikle alt ambarlara yerleştirilir ve hafif kargolar üste yüklenir. Kısmen dolu tanklar mümkün olduğunca azaltılarak serbest yüzey etkisi minimize edilir. Yükleme ilerledikçe, önceden belirlenmiş ara kontrol noktalarında stabilite hesabı güncellenir ve kriterler doğrulanır.

**Boşaltma Operasyonları**, yükleme operasyonlarının ayna görüntüsü gibi görünse de, ek riskler taşır. Boşaltma sırasında geminin deplasmanı azalır; bu nedenle KM değeri değişir ve GM beklenmedik şekilde azalabilir. Ayrıca yeterli propeller immersion (pervane batması) sağlanmalı, minimum draft gereksinimleri karşılanmalı ve trim kontrolü sürdürülmelidir. Çok hızlı boşaltma, dengesiz boşaltma ve balast alımının gecikmesi, en sık karşılaşılan tehlikelerdir.

**Balast Değişimi (Ballast Exchange)**, IMO Balast Su Yönetimi Sözleşmesi (BWM Convention) kapsamında, kıyıdan 200 NM'den uzakta ve 200 m'den derin sularda yapılması gereken operasyondur. İki yöntem uygulanır:

Sequential (Ardışık) yöntemde, her tank sırayla tamamen boşaltılır ve açık deniz suyuyla yeniden doldurulur. Bu yöntemde, tankın boş olduğu dönemde deplasman düşer ve stabilite kritik seviyelere yaklaşabilir. Her ara durum için stabilite ve boyuna mukavemet kontrolü zorunludur.

Flow-through (Sürekli Akış) yönteminde, tanktan su sürekli olarak boşaltılırken eş zamanlı olarak taze deniz suyu alınır. Tank hacminin en az üç katı su geçirilmesi gerekir. Bu yöntemde deplasman sabit kalır; ancak tank sürekli kısmen dolu olduğundan, serbest yüzey etkisi kesintisiz devam eder.

**Havuz (Dry Dock) Operasyonları**, stabilitenin en kritik anlara ulaştığı özel durumlardır. Gemi havuza girdiğinde, su çekilirken geminin ağırlığı keel block'lar tarafından taşınmaya başlar. Su çekilme sürecinde, geminin kaldırma kuvveti azalır ve keel block tepki kuvveti (P) artar. Kritik an (critical instant), GM'in sıfıra düştüğü ve geminin artık suyun desteği olmadan keel block'lar üzerinde dengede kaldığı noktadır:

────────────
P = Δ × GM / KM
────────────

Bu formül, geminin havuza girerken yeterli başlangıç GM'ine sahip olması gerektiğini gösterir. Yetersiz GM, havuz operasyonu sırasında geminin devrilmesine neden olabilir. Havuza girmeden önce gemi mümkün olduğunca dik (upright) olmalı, serbest yüzey etkisi minimize edilmeli ve yeterli GM marjı sağlanmalıdır.`,
        formulas: [
          {
            formula: "P = Δ × GM / KM",
            description: "Havuz operasyonunda keel block tepki kuvveti"
          }
        ],
        keyPoints: [
          "Liman operasyonları stabilite açısından yüksek risk dönemleridir",
          "Her yükleme/boşaltma aşamasında stabilite kontrolü gereklidir",
          "Balast değişimi özel dikkat gerektirir — sequential yöntemde ara durumlar kritiktir",
          "Havuz operasyonlarında GM sıfıra düştüğünde kritik an oluşur"
        ],
        warnings: [
          "Hızlı ve dengesiz operasyonlar tehlikelidir",
          "Balast alımının gecikmesi, boşaltma sırasında stabilite kaybına yol açar",
          "Havuza girerken yetersiz GM devrilmeye neden olabilir"
        ]
      }
    ]
  },

  // ==================== BÖLÜM 16: ÖZET VE KONTROL LİSTELERİ ====================
  {
    id: "summary-checklists",
    title: "16. Özet ve Kontrol Listeleri",
    icon: "✅",
    iconColor: "text-green-500",
    description: "Kapsamlı özet, hızlı referans kartları ve operasyonel kontrol listeleri",
    subtopics: [
      {
        id: "key-formulas",
        title: "Temel Formüller Özeti",
        content: `Gemi stabilitesi alanında kullanılan formüller, birbirleriyle bağlantılı bir sistem oluşturur. Bu bölüm, tüm temel formülleri sistematik olarak bir araya getirerek hızlı referans sağlar.

**Stabilite Temel Formülleri**

Metasantrik yükseklik, gemi stabilitesinin birincil göstergesidir ve şu bileşenlerden oluşur:

────────────
KM = KB + BM
────────────

────────────
GM = KM − KG
────────────

Burada KB omurgadan kaldırma merkezine, BM metasantrik yarıçapı (BM = I / ∇), KG omurgadan ağırlık merkezine olan düşey mesafeleri ifade eder. KM, gemi geometrisine ve deplasmana bağlıdır ve hidrostatik tablolardan okunur. KG, yükleme durumuna bağlıdır ve moment hesabıyla belirlenir.

Serbest yüzey düzeltmesi, kısmen dolu tanklardaki sıvıların etkisini hesaba katar:

────────────
GMeff = GM − Σ(ρᵢ × iᵢ) / Δ
────────────

Küçük açılarda doğrultma kolu ve doğrultma momenti:

────────────
GZ = GM × sin θ
MR = Δ × GZ = Δ × GM × sin θ
────────────

Büyük açılarda doğrultma kolu (Cross Curves yöntemi):

────────────
GZ = KN − KG × sin θ
────────────

Wall-sided formül (düz bordalı gemiler, orta açılar):

────────────
GZ = sin θ × (GM + ½ BM × tan² θ)
────────────

**Trim Formülleri**

────────────
Trim = TA − TF
MCT₁cm = (Δ × GML) / (100 × L)
ΔTrim = (w × d) / MCT₁cm
────────────

Baş ve kıç draft değişimleri:

────────────
ΔTF = ΔTrim × (LBP − LCF) / LBP
ΔTA = ΔTrim × LCF / LBP
────────────

**Ağırlık ve Moment Formülleri**

────────────
KG = Σ(wᵢ × VCGᵢ) / Σwᵢ
LCG = Σ(wᵢ × LCGᵢ) / Σwᵢ
────────────

**Hidrostatik Formüller**

────────────
Δ = ρ × ∇
TPC = (Awp × ρ) / 100
FWA = Δ / (4 × TPC)
DWA = FWA × (1025 − ρdock) / 25
────────────

**Rulo Periyodu**

────────────
T ≈ C × B / √GM
GM ≈ (C × B / T)²
────────────

**Eğim Testi**

────────────
GM = (w × d) / (Δ × tan θ)
────────────

**Serbest Yüzey Momenti**

────────────
FSM = ρₜ × l × b³ / 12      (dikdörtgen tank)
FSMbölünmüş = FSMorijinal / n²   (n parçaya bölünmüş tank)
────────────

**IMO Intact Stability Kriterleri (2008 IS Code)**

────────────────────────────────────
Kriter                      Minimum Değer
────────────────────────────────────
GM₀ (serbest yüzey dahil)  ≥ 0,15 m
GZmax                      ≥ 0,20 m
θ(GZmax)                   ≥ 25°
Alan 0°–30°                 ≥ 0,055 m·rad
Alan 0°–40°                 ≥ 0,090 m·rad
Alan 30°–40°                ≥ 0,030 m·rad
────────────────────────────────────

Tahıl taşıyan gemiler için ek kriterler:

────────────────────────────────────
GMfluid                    ≥ 0,30 m
Tahıl kayma açısı           ≤ 12°
Artık alan                  ≥ 0,075 m·rad
────────────────────────────────────`,
        keyPoints: [
          "Formüllerin birbiriyle olan ilişkilerini kavrayın",
          "Birim tutarlılığına dikkat edin — özellikle cm/m ve rad/derece",
          "IMO kriterlerini ezberleyin — pratik değerlendirmede temel referanstır"
        ]
      },
      {
        id: "quick-reference",
        title: "Hızlı Referans Kartları",
        content: `Hızlı referans kartları, köprüüstünde veya yükleme operasyonları sırasında acil karar verme gereken anlarda kullanılmak üzere tasarlanmış pratik bilgi özetleridir.

**Stabilite Uyarı İşaretleri ve Aksiyonlar**

Uzun rolling periyodu gözlemlendiğinde, bunun anlamı düşük GM'dir. Acil aksiyon olarak alt tanklara balast alınmalıdır. Ani heel (tek tarafa yatma) gözlemlendiğinde, bunun anlamı kargo kayması veya flooding olabilir. Manevra yapılmalı, durum değerlendirilmelidir. Loll durumu (gemi tek tarafta kalmaya eğilimli, her iki tarafa da yatıyor ancak dik duramıyor) gözlemlendiğinde, GM sıfıra yakın veya negatiftir. Bu ACİL DURUM'dur — sakin olun ve dikkatli biçimde alt tanklara balast alın. Çok hızlı dönüş (stiff ship) gözlemlendiğinde, GM yüksektir. Normal durumdur ancak mürettebat konforu ve yük emniyeti açısından dikkat edilmelidir.

**GM Değerlendirme Tablosu**

GM < 0 → TEHLİKELİ: Gemi stabil değil, acil müdahale gerekli
GM = 0 – 0,15 m → KRİTİK: IMO minimumunun altında, derhal düzeltilmeli
GM = 0,15 – 0,50 m → DİKKAT: Minimum sağlanıyor ancak marj düşük, iyileştirme önerilir
GM = 0,50 – 1,50 m → İYİ: Normal operasyon aralığı
GM > 1,50 m → SERT: Güvenli ancak konfor azalır, yük ivmeleri artar

**Rolling Periyodu ve GM Tahmin Tablosu**

T < 8 saniye → Yüksek GM → Sert gemi (stiff)
T = 8 – 12 saniye → Orta GM → Normal davranış
T = 12 – 16 saniye → Düşük GM → Yumuşak gemi (tender)
T > 16 saniye → Çok düşük GM → TEHLİKELİ — acil değerlendirme gerekli

Periyottan hızlı GM tahmini:

────────────
GM ≈ (C × B / T)²
────────────

Tipik C değerleri: yük gemileri 0,73–0,78; tankerler 0,74–0,82; konteyner gemileri 0,70–0,76.

**Tank Yönetimi Hızlı Rehberi**

Stabilite iyileştirmek için: alt tankları doldurun, üst tankları boşaltın, merkez tankları kullanın.
Trim düzeltmek için: başa trim azaltmak istiyorsanız kıç tanklara alın; kıça trim azaltmak istiyorsanız baş tanklara alın.
Serbest yüzeyi azaltmak için: tankları tam dolu veya tam boş tutun, kısmen dolu tank sayısını minimize edin.

**Acil Durum Hızlı Aksiyon Tablosu**

Düşük GM → 1. Alt tanklara balast al → 2. Üst tankları boşalt
Kargo kayması → 1. Açık denize yönel → 2. Yavaşla, keskin manevra yapma
Flooding → 1. Hasarlı bölmeyi izole et → 2. Dikkatli counter-flooding
Loll durumu → 1. SAKİN OL → 2. Dikkatli ve yavaş biçimde düşük tarafa balast al

Loll durumunda önemli uyarı: Yüksek tarafa hızlı balast almak, geminin karşı tarafa devrilmesine neden olabilir. Balast, yatan tarafa yavaş ve kontrollü biçimde alınmalıdır.`,
        keyPoints: [
          "Hızlı referans kartlarını köprüüstünde hazır bulundurun",
          "Kritik GM ve periyot değerlerini ezberleyin",
          "Acil durum aksiyonlarını önceden bilin ve tatbikat edin"
        ]
      },
      {
        id: "operational-checklists",
        title: "Operasyonel Kontrol Listeleri",
        content: `Operasyonel kontrol listeleri, rutin ve kritik stabilite prosedürlerinin eksiksiz uygulanmasını sağlayan sistematik araçlardır. Bu listeler, deneyimli denizcilerin bile stres altında veya rutin monotonluğunda adım atlama riskini ortadan kaldırır.

**KONTROL LİSTESİ 1 — Kalkış Öncesi Stabilite Kontrolü**

Veri Toplama aşamasında: tüm tank soundingleri alınmış olmalı; kargo miktarları manifesto ile doğrulanmış olmalı; yakıt, su ve stores miktarları güncellenmeli; yoğunluk değerleri kontrol edilmeli.

Hesaplama aşamasında: yükleme bilgisayarına tüm veriler girilmiş olmalı; departure durumu hesaplanmış olmalı; arrival durumu hesaplanmış olmalı; kritik ara durumlar kontrol edilmeli.

Değerlendirme aşamasında: GMeff ≥ 0,15 m tüm durumlarda sağlanmalı; tüm IMO GZ eğrisi alan kriterleri karşılanmalı; kesme kuvveti ve eğilme momenti limitlerin altında olmalı; draft ve trim değerleri uygun olmalı; yükleme bilgisayarından uyarı veya alarm olmamalı.

Onay aşamasında: kaptan stabilite hesaplarını inceleyip onaylamış olmalı; hesap belgesi imzalanmış olmalı; belgeler dosyalanmış olmalı.

**KONTROL LİSTESİ 2 — Günlük Seyir İzleme**

İzleme kapsamında: tank soundingleri alınmış olmalı; yakıt tüketimi kaydedilmeli; draft ve trim gözlemlenmeli; rolling karakteristiği normal olmalı (periyot uzaması yok).

Değerlendirme kapsamında: stabilite hesabı yükleme bilgisayarında güncellenmeli; arrival durumunun hâlâ kriterleri sağladığı doğrulanmalı; anormallik bulunmadığı teyit edilmeli.

Kayıt kapsamında: günlük kayıt defterine işlenmeli; noon report verileri hazırlanmalı.

**KONTROL LİSTESİ 3 — Yükleme ve Boşaltma Operasyonları**

Planlama aşamasında: kargo planı incelenmeli; tank sıralaması belirlenmeli; kritik ara durumlar tanımlanmalı; terminal ile koordinasyon sağlanmalı.

Operasyon sırasında: simetrik yükleme veya boşaltma uygulanmalı; belirlenen ara kontrol noktalarında stabilite hesabı yapılmalı; balast operasyonları koordineli yürütülmeli; trim değişimi izlenmeli.

Tamamlama aşamasında: final soundingleri alınmalı; final stabilite hesabı yapılmalı; kalkış öncesi kontrol listesine geçilmeli.

**KONTROL LİSTESİ 4 — Acil Durum Stabilite Müdahalesi**

İlk tepki (0–5 dakika): alarm verilmeli; hız azaltılmalı veya durdurulmalı; mevcut durum değerlendirilmeli; mürettebat muster istasyonlarına yönlendirilmeli.

Değerlendirme (5–15 dakika): nedenin belirlenmesi (flooding / kargo kayması / düşük GM); mevcut stabilite durumunun tespiti; acil eylem planının oluşturulması; gerekirse MAYDAY hazırlığı.

Düzeltici eylem: flooding ise izolasyon ve pompalama; kargo kayması ise rota ve hız ayarı; düşük GM ise balast operasyonu; tüm eylemlerin kayıt altına alınması.

İletişim: şirket DPA'ya bildirim; klas kuruluşu ve bayrak devletine bildirim; gerektiğinde SAR koordinasyonu; durum raporlarının düzenli güncellenmesi.

Bu kontrol listeleri, geminin güvenlik yönetim sistemi (SMS — Safety Management System) çerçevesinde resmi prosedürler olarak tanımlanmalı ve tüm köprüüstü personeline eğitim verilmelidir. Tatbikatlarda bu listelerin fiilen kullanılması, gerçek acil durumda etkinliğini artırır.`,
        keyPoints: [
          "Kontrol listeleri eksiksiz uygulanmalıdır — adım atlamak emniyet açığı yaratır",
          "Her liste için sorumlu kişi belirlenmeli ve imza alınmalıdır",
          "Kontrol listeleri SMS çerçevesinde resmi prosedür olmalıdır",
          "Düzenli tatbikatlarda bu listelerin kullanımı pratik edilmelidir"
        ]
      }
    ]
  }
];

// Export helper function to get topic by ID
export function getTopicById(id: string): StabilityTopic | undefined {
  return stabilityTopicsData.find(topic => topic.id === id);
}

// Export helper function to get all topic IDs
export function getAllTopicIds(): string[] {
  return stabilityTopicsData.map(topic => topic.id);
}
