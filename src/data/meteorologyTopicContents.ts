import type { TopicDetailContent } from "@/data/navigationTopicContents";

export const meteorologyTopicContents: Record<string, TopicDetailContent> = {
  "Basınç merkezleri (alçak/yüksek)": {
    title: "Basınç Merkezleri (Alçak / Yüksek)",
    introduction:
      "Atmosferdeki hava hareketlerinin temel itici gücü basınç farklılıklarıdır. Alçak ve yüksek basınç merkezleri, rüzgâr rejimlerini, bulut oluşumunu, yağışı ve nihayetinde deniz durumunu doğrudan belirler. Bir seyir zabiti için basınç merkezlerini tanımak ve hareket yönlerini takip etmek, emniyetli rota planlamasının ön koşuludur.",
    sections: [
      {
        title: "Alçak Basınç Merkezleri (Siklon / Depresyon)",
        content:
          "Alçak basınç merkezi, çevresindeki basınçtan daha düşük basınca sahip atmosferik bölgedir. Bu merkezde hava yüzeyden yukarıya doğru yükselir; yükselme sırasında soğuyarak nem yoğuşmasına, bulut oluşumuna ve yağışa neden olur. Kuzey yarım kürede alçak basınç etrafında rüzgâr saatin tersi yönünde (siklonik) dönerken, güney yarım kürede saat yönünde döner. Alçak basınç merkezinin yaklaşması barometre okumasında düzenli bir düşüşle kendini gösterir; bu düşüşün hızı ve sürekliliği, sistemin şiddetini tahmin etmede önemli ipuçları verir. Denizde karşılaşılan fırtınaların büyük çoğunluğu alçak basınç sistemleriyle ilişkilidir. Derin bir alçak basınç merkezi, geniş bir alanda şiddetli rüzgâr, yüksek dalga ve kötü görüş koşulları üretebilir. Seyir planlamasında alçak basınç merkezinin tahmini rotası, hızı ve derinliği kritik parametrelerdir.",
      },
      {
        title: "Yüksek Basınç Merkezleri (Antisiklon)",
        content:
          "Yüksek basınç merkezi, çevre basınçtan daha yüksek olan bölgedir. Burada hava yukarıdan aşağıya inerek yüzeyde yayılır; inen hava ısınır ve nem kapasitesi artar, dolayısıyla bulut çözülür ve genellikle açık, sakin hava koşulları oluşur. Kuzey yarım kürede yüksek basınç etrafında rüzgâr saat yönünde (antisiklonik) döner. Yüksek basınç sistemleri genellikle yavaş hareket eder veya yarı kalıcı konumlarda bulunur (Azor Yüksek Basıncı, Sibirya Yüksek Basıncı vb.). Ancak yüksek basınç her zaman sakin deniz anlamına gelmez: sistemin kenarlarında oluşan güçlü basınç gradyanları önemli rüzgâr hızlarına ulaşabilir. Ayrıca yüksek basınç egemenliğinde radyasyon sisi veya inversyon tabakası nedeniyle görüş düşüklüğü riski bulunur.",
      },
      {
        title: "Barometre Trend Analizi ve Operasyonel Karar",
        content:
          "Köprüüstünde basınç merkezlerini takip etmenin en temel aracı barometredir. Tek bir anlık değer, kendi başına çok az bilgi verir; asıl değerli olan 3-saatlik trend eğrisidir. Saatte 1 hPa veya üzerindeki bir düşüş, yaklaşan güçlü bir alçak basınç sistemini veya cepheyi işaret eder ve acil önlem alınmasını gerektirir. Vardiya devir teslimlerinde barometre trendi mutlaka sözlü ve yazılı olarak aktarılmalıdır. Synoptik harita üzerinde basınç merkezlerinin konumu, hareket yönü ve hızı rota planına işlenerek operasyon takvimi buna göre düzenlenir. Özellikle yükleme-boşaltma operasyonlarında, güverte işlerinde ve personel transferlerinde basınç merkezinin beklenen etkisi önceden değerlendirilmelidir.",
      },
    ],
    keyPoints: [
      "Alçak basınç: yükselen hava, bulut, yağış, kuvvetli rüzgâr riski.",
      "Yüksek basınç: inen hava, genelde açık hava ancak kenar gradyanları güçlü olabilir.",
      "Barometre trendi, anlık değerden daha önemli bir operasyonel göstergedir.",
      "Basınç merkezinin hareket yönü ve hızı, rota planlamasında stratejik bilgidir.",
    ],
  },

  "İzobar yapısı ve gradyan": {
    title: "İzobar Yapısı ve Basınç Gradyanı",
    introduction:
      "İzobarlar, synoptik haritalar üzerinde eş basınç noktalarını birleştiren eğrilerdir ve atmosferik akışın görsel haritasını oluşturur. İzobarların birbirine yakınlığı veya uzaklığı, rüzgâr hızının en temel göstergesidir. Bir denizci için izobar analizini hızlı ve doğru yapabilmek, köprüüstünde proaktif hava değerlendirmesi yapmanın ön koşuludur.",
    sections: [
      {
        title: "İzobar Kavramı ve Çizim Mantığı",
        content:
          "İzobarlar genellikle 4 hPa aralıklarla çizilir (1000, 1004, 1008, 1012 hPa vb.). Her bir izobar üzerindeki tüm noktalar deniz seviyesine indirgenmiş aynı basınç değerine sahiptir. İzobarlar kapalı eğriler oluşturduğunda bir basınç merkezi tanımlanır; en içteki kapalı eğri merkezin şiddetini gösterir. İzobarların düz ve paralel olduğu bölgelerde rüzgâr yönü ve hızı nispeten homojendir; eğrildiği, kıvrıldığı veya sıkıştığı yerlerde ise koşullar hızla değişir.",
      },
      {
        title: "Basınç Gradyanı ve Rüzgâr İlişkisi",
        content:
          "Basınç gradyanı, birim mesafe başına basınç değişimidir. Synoptik haritada iki izobar arasındaki mesafe ne kadar kısa ise gradyan o kadar büyüktür ve dolayısıyla rüzgâr hızı o kadar yüksektir. Geostrofik rüzgâr denklemi bu ilişkiyi matematiksel olarak tanımlar: rüzgâr hızı, gradyan kuvveti ile Coriolis kuvvetinin dengesinden elde edilir. Ancak yüzey sürtünmesi nedeniyle gerçek rüzgâr geostrofik rüzgârdan yaklaşık %20–30 daha yavaş ve izobarların yüksek basınç tarafına doğru 15°–30° sapmalı olarak eser. Deniz üzerinde sürtünme karadan az olduğundan, rüzgâr geostrofik değere daha yakın seyreder.",
      },
      {
        title: "Operasyonel Uygulama",
        content:
          "Köprüüstünde izobar analizi yapılırken, rota üzerindeki sıkışık izobar bölgeleri kırmızı riskli sektör olarak işaretlenir. Bu bölgelere tahmini varış zamanı hesaplanır ve gerekirse hız/rota düzeltmesi planlanır. Pilot transferi, dar su geçişi veya güverte operasyonu gibi zamana duyarlı faaliyetler, güçlü gradyan dönemlerinden kaçınılacak şekilde programlanır. Birden fazla synoptik harita kaynağı karşılaştırılarak model tutarsızlıkları kontrol edilir. Rüzgâr gust faktörü, ortalama rüzgâr hızının 1.3–1.5 katına ulaşabilir; bu nedenle izobar gradyanından okunan rüzgâr tahminine gust payı eklenmesi operasyonel emniyeti artırır.",
      },
    ],
    keyPoints: [
      "Sıkışık izobar = güçlü basınç gradyanı = yüksek rüzgâr hızı.",
      "Geostrofik rüzgâr, izobar aralığından hesaplanabilir ancak yüzey sürtünmesiyle %20–30 azalır.",
      "Rota üzerindeki yüksek gradyan bölgeleri erken tespit edilmeli ve ETA/operasyon planı revize edilmelidir.",
      "Gust faktörü ortalama rüzgârın 1.3–1.5 katına ulaşabilir.",
    ],
  },

  "Hava kütleleri ve kaynak bölgeler": {
    title: "Hava Kütleleri ve Kaynak Bölgeler",
    introduction:
      "Hava kütlesi, yatay düzlemde sıcaklık ve nem bakımından yaklaşık olarak homojen özellikler taşıyan büyük atmosfer hacmidir. Bir hava kütlesinin özellikleri kaynaklandığı bölgeye bağlıdır; hareket ettikçe geçtiği yüzeyin etkisiyle dönüşüme uğrar. Denizciler için hava kütlesi geçişleri, köprüüstünde beklenen sıcaklık, nem, görüş ve rüzgâr değişikliklerinin önceden tahmin edilmesini sağlar.",
    sections: [
      {
        title: "Hava Kütlesi Sınıflandırması",
        content:
          "Hava kütleleri iki temel eksende sınıflandırılır. İlk eksen kaynak bölgenin enlemidir: kutupsal (P) veya tropikal (T). İkinci eksen kaynak yüzeydir: denizel (m – maritime) veya karasal (c – continental). Böylece dört ana tip ortaya çıkar: karasal kutupsal (cP), denizel kutupsal (mP), karasal tropikal (cT) ve denizel tropikal (mT). Bunlara ek olarak Arktik (A) ve Ekvatoral (E) kütleler de tanımlanır. Her tipin karakteristik sıcaklık ve nem profili farklıdır: mT kütle sıcak ve nemli olup sis riski taşırken, cP kütle soğuk ve kuru olup ani soğuma ve güçlü rüzgâr üretebilir.",
      },
      {
        title: "Kütle Dönüşümü ve Stabilite Etkisi",
        content:
          "Bir hava kütlesi kaynak bölgesinden ayrılıp farklı özellikteki bir yüzey üzerinden hareket ettiğinde dönüşüme uğrar. Soğuk bir kütle sıcak deniz yüzeyi üzerinden geçtiğinde alttan ısınır, konvektif olarak instabil hale gelir ve kümülüs tipi bulutlar, sağanak yağış ve iyi görüş koşulları oluşur. Tersine, sıcak bir kütle soğuk deniz yüzeyi üzerinden geçtiğinde alttan soğur, stabil bir tabaka oluşur, stratus bulutları ve adveksiyon sisi gelişir, görüş dramatik şekilde düşer. Bu dönüşüm sürecini anlamak, geminin sefer rotası üzerinde ne tür hava koşullarıyla karşılaşacağını önceden değerlendirmek için kritiktir.",
      },
      {
        title: "Köprüüstü Uygulaması",
        content:
          "Sefer planlamasında baskın hava kütlesi tipi rota brifingine dahil edilir. Özellikle mT kütlede (sıcak-nemli) adveksiyon sisi riski yüksek olduğundan, bu bölgelerde geçiş saatleri ve görüş prosedürleri önceden hazırlanır. cP kütlede güçlü konvektif rüzgâr ve deniz durumu bozulması beklenir; güverte emniyeti artırılır ve kargo bağlama kontrolleri yapılır. Hava kütlesi değişimi genellikle bir cephe geçişiyle gerçekleşir; cephe öncesi ve sonrası koşullar arasındaki fark ne kadar büyükse, geçiş o kadar şiddetli olur. Vardiya zabitinin, mevcut kütle tipini ve beklenen dönüşümü ekiple paylaşması durumsal farkındalığı güçlendirir.",
      },
    ],
    keyPoints: [
      "Hava kütleleri kaynak bölgenin enlemine ve yüzey tipine göre sınıflandırılır.",
      "Soğuk kütle sıcak deniz üzerinde instabilite, sıcak kütle soğuk deniz üzerinde sis üretir.",
      "Kütle geçişleri genellikle cepheyle birlikte gerçekleşir ve ani hava değişimlerine neden olur.",
      "Sefer planlamasında baskın hava kütlesi tipi rota brifingine dahil edilmelidir.",
    ],
  },

  "Cephe tipleri ve geçiş etkileri": {
    title: "Cephe Tipleri ve Geçiş Etkileri",
    introduction:
      "Cephe, farklı özellikler taşıyan iki hava kütlesinin temas ettiği dar geçiş zonudur. Cephe geçişleri; rüzgâr yönü ve hızında ani değişim, yağış, görüş düşüklüğü ve dalga koşullarında bozulma gibi kritik hava olaylarının temel kaynağıdır. Köprüüstünde cephe tipini, hareket hızını ve geçiş zamanını doğru değerlendirmek, proaktif emniyet kararları almayı mümkün kılar.",
    sections: [
      {
        title: "Soğuk Cephe",
        content:
          "Soğuk cephe, soğuk hava kütlesinin sıcak hava kütlesinin altına girerek onu zorla yükseltmesiyle oluşur. Genellikle 30–50 km/h hızla ilerler. Cephe hattı dar ve dik bir yapıdadır; geçişi hızlı ve şiddetlidir. Cephe öncesi rüzgâr güneybatıdan eser (Kuzey Yarım Küre); geçişle birlikte kuzeybatıya döner (rüzgâr şifti). Dar bir bant halinde şiddetli yağış, kümülonimbus bulutları, rüzgâr gustları ve hatta fırtına görülebilir. Geçiş sonrası basınç yükselir, sıcaklık düşer, görüş genellikle iyileşir. Denizde soğuk cephe geçişi ani dalga yüksekliği artışı ve yön değişimiyle tehlikeli koşullar yaratabilir.",
      },
      {
        title: "Sıcak Cephe",
        content:
          "Sıcak cephe, sıcak hava kütlesinin soğuk kütle üzerinden yavaşça yükselmesiyle oluşur. İlerlemesi soğuk cepheye göre daha yavaştır (15–30 km/h). Cephenin önünde geniş bir alanda cirrus, cirrostratus, altostratus ve nimbostratus bulutları sırayla gözlenir; bu bulut dizisi cephenin 500–1000 km ötesinden başlar. Yağış sürekli ve yaygın karakterdedir. Cephe geçişi sırasında sıcaklık ve nem artar, rüzgâr güneye/güneybatıya döner, basınç düşüşü yavaşlar veya durur. Sıcak cephenin en kritik riski düşük görüş koşullarıdır; cephe hattı civarında adveksiyon sisi oluşumu sıkça gözlenir.",
      },
      {
        title: "Oklüde Cephe ve Stasyoner Cephe",
        content:
          "Oklüzyon, soğuk cephenin sıcak cepheye yetişmesiyle oluşur ve sıcak sektör yüzeyden kopar. Soğuk oklüzyon (arkadaki hava daha soğuk) ve sıcak oklüzyon (arkadaki hava nispeten daha ılık) olmak üzere iki türü vardır. Oklüde cepheler karmaşık hava koşulları üretir; hem soğuk hem sıcak cephe özellikleri birlikte gözlenebilir. Stasyoner cephe ise belirgin bir hareketi olmayan, iki kütle arasında denge durumundaki cephedir. Uzun süre aynı bölgede kalarak sürekli bulutlu ve yağışlı hava koşulları üretebilir. Her iki tip de köprüüstünde dikkatli takip gerektirir; stasyoner cephenin harekete geçmesi aniden şiddetli hava değişimine yol açabilir.",
      },
      {
        title: "Operasyonel Karar ve Hazırlık",
        content:
          "Köprüüstünde cephe geçişine hazırlık sistematik olmalıdır. Cephenin tahmini geçiş zamanı rota planına işlenir; bu zamandan en az 2 saat önce güverte emniyeti artırılır, dış operasyonlar durdurulur veya hızlandırılır. Rüzgâr şifti yönü ve büyüklüğü önceden değerlendirilerek manevra alternatifi hazırlanır. Görüş düşüklüğü bekleniyorsa COLREG kısıtlı görüş prosedürleri aktive edilir. Makine dairesi düşük devir veya tam güç ihtiyacına karşı uyarılır. Cephe geçişi sırasında radar, AIS ve görsel gözetleme sıklığı artırılır.",
      },
    ],
    keyPoints: [
      "Soğuk cephe hızlı, şiddetli ve dar bantlı; sıcak cephe yavaş, yaygın ve görüş düşürücüdür.",
      "Oklüde cephe karmaşık koşullar üretir; stasyoner cephe uzun süreli kötü hava kaynağıdır.",
      "Cephe geçiş zamanı rota planına işlenmeli, hazırlık en az 2 saat önceden başlamalıdır.",
      "Rüzgâr şifti, yağış tipi ve görüş değişimi birlikte değerlendirilmelidir.",
    ],
  },

  "Gerçek rüzgar ve görünen rüzgar": {
    title: "Gerçek Rüzgâr ve Görünen Rüzgâr",
    introduction:
      "Gemide ölçülen rüzgâr her zaman gerçek (true) rüzgâr değildir; geminin kendi hareketi ile gerçek rüzgârın vektörel bileşimi olan görünen (apparent) rüzgârdır. Bu ayrımı yapmadan alınan operasyonel kararlar — özellikle hız seçimi, manevra planı ve güverte çalışma emniyeti — hatalı sonuçlar doğurabilir.",
    sections: [
      {
        title: "Tanımlar ve Vektörel İlişki",
        content:
          "Gerçek rüzgâr (True Wind – TW), sabit bir referans noktasından ölçülen rüzgârdır; yönü ve hızı geminin hareketinden bağımsızdır. Görünen rüzgâr (Apparent Wind – AW), geminin kendi hareket vektörü ile gerçek rüzgâr vektörünün bileşenidir. Gemi rüzgâra doğru seyrettiğinde görünen rüzgâr hızı gerçek rüzgârdan fazla, rüzgâr arkadan estiğinde ise düşük ölçülür. Vektörel çözümleme için geminin seyir hızı (STW veya SOG) ve başı (heading) ile görünen rüzgâr açısı ve hızı kullanılarak gerçek rüzgâr hesaplanır. Modern gemilerde bu hesaplama otomatik yapılır, ancak sensör arızası durumunda manuel hesaplama bilgisi hayati önem taşır.",
      },
      {
        title: "Operasyonel Önem",
        content:
          "Liman yaklaşımlarında, manevra sırasında ve güverte operasyonlarında karar dayanağı gerçek rüzgâr olmalıdır. Pilot alma limitleri, helikopter operasyon limitleri ve kıç tanker manifold çalışma limitleri gerçek rüzgâra göre belirlenir. Eğer anemometreden okunan görünen rüzgâr doğrudan kullanılırsa, gemi hızına bağlı olarak rüzgâr hafife alınabilir veya abartılabilir. Özellikle rüzgâr arkadan eserken, gerçek rüzgâr hızı görünenden çok daha yüksek olabilir; bu durum güverte üzerindeki rüzgâr momentini ve dalga koşullarını küçümsemeye neden olur. Ayrıca deniz durumu (dalga yüksekliği ve periyodu) gerçek rüzgâra bağlı olarak geliştiğinden, seakeeping kararları da gerçek rüzgâr bilgisine dayanmalıdır.",
      },
      {
        title: "Hesaplama ve Doğrulama",
        content:
          "Otomatik hesaplama yapan sistemlerin doğruluğu; heading sensörü (gyro), hız girdisi (log veya GPS SOG) ve anemometre kalibrasyonuna bağlıdır. Bu sensörlerden herhangi birinde hata varsa, gerçek rüzgâr çıktısı yanlış olur. Vardiya zabitinin, hesaplanan gerçek rüzgârı bayrak, su yüzeyi belirtileri ve Beaufort skalası gözlemiyle doğrulaması gerekir. Gemi duruyor veya çok düşük hızdayken ölçülen rüzgâr gerçek rüzgâra çok yakındır; bu durum kalibrasyon kontrolü için kullanılabilir.",
      },
    ],
    keyPoints: [
      "Anemometre görünen rüzgârı ölçer; operasyonel kararlar gerçek rüzgâra dayandırılmalıdır.",
      "Rüzgâr arkadan eserken gerçek rüzgâr görünenden önemli ölçüde yüksek olabilir.",
      "Sensör kalibrasyonu ve görsel doğrulama (Beaufort gözlemi) birlikte kullanılmalıdır.",
    ],
  },

  "Beaufort skalası uygulamaları": {
    title: "Beaufort Skalası Uygulamaları",
    introduction:
      "Beaufort skalası, rüzgâr hızını deniz yüzeyi belirtileriyle eşleştiren standart bir sınıflandırma sistemidir. Anemometre arızası, veri kesintisi veya enstrüman eksikliği durumunda bile denizcinin deniz durumunu standart bir dille ifade etmesini ve kayıt altına almasını sağlar.",
    sections: [
      {
        title: "Skalanın Yapısı",
        content:
          "Sir Francis Beaufort tarafından 1805'te geliştirilen skala, 0 (sakin) ile 12 (kasırga) arasında 13 kademeden oluşur. Her kademe belirli bir rüzgâr hızı aralığına ve deniz yüzeyi belirtisine karşılık gelir. Örneğin Force 4 (11–16 knot) için 'küçük dalgalar belirginleşir, beyaz köpükler oluşmaya başlar' tanımı yapılır. Force 7 (28–33 knot) için 'deniz kabarmaya başlar, rüzgâr yönündeki köpük çizgileri belirginleşir.' Force 10 (48–55 knot) ve üzeri fırtına koşullarında deniz yüzeyi beyaz köpükle kaplanır ve görüş yağışla sınırlanır.",
      },
      {
        title: "Deniz Durumu (Sea State) ile İlişki",
        content:
          "Beaufort skalası doğrudan rüzgâr hızını sınıflar; ancak dalga yüksekliği rüzgâr hızına ek olarak rüzgârın esme süresine (duration) ve açık deniz mesafesine (fetch) bağlıdır. Bu nedenle Force 6 rüzgâr farklı bölgelerde çok farklı dalga yükseklikleri üretebilir. Douglas deniz durumu skalası dalga yüksekliğini ayrıca sınıflandırır ve Beaufort ile birlikte kullanılır. Vardiya kayıtlarında her iki skalanın da tutarlı şekilde kaydedilmesi, trend analizi ve rota değerlendirmesi için gereklidir.",
      },
      {
        title: "Köprüüstü Kullanımı",
        content:
          "Beaufort skalası, vardiya defteri girişlerinde, hava raporlarında ve kaptan brifinglerinde standart referans olarak kullanılır. Özellikle gece ve yağışlı koşullarda görsel deniz yüzeyi değerlendirmesi zorlaşır; bu durumlarda dalga ses düzeyi, sıçrama karakteri ve gemi hareketleri gibi dolaylı göstergeler yardımcı olur. Güverte operasyon limitleri (crane operasyonu, pilot transferi, supply boat yaklaşması) genellikle Beaufort kademesine referans verilerek belirlenir. Tutarsız Beaufort kayıtları, önceki vardiyalarla karşılaştırmayı ve trend takibini bozar; bu nedenle standardize gözlem eğitimi önemlidir.",
      },
    ],
    keyPoints: [
      "Beaufort skalası 0–12 arasında rüzgâr hızını deniz yüzeyi belirtileriyle eşleştirir.",
      "Dalga yüksekliği ek olarak süre ve fetch'e bağlıdır; Beaufort tek başına dalga tahmini yapmaz.",
      "Operasyon limitleri genellikle Beaufort referansıyla tanımlanır.",
      "Tutarlı gözlem ve kayıt disiplini trend analizi için zorunludur.",
    ],
  },

  "Dalga yüksekliği ve periyot": {
    title: "Dalga Yüksekliği ve Periyot",
    introduction:
      "Dalga yüksekliği ve periyot, gemi hareketleri, yapısal yükler, kargo emniyeti ve mürettebat konforu üzerinde doğrudan belirleyici olan iki temel parametredir. Bu parametrelerin doğru değerlendirilmesi, rota optimizasyonu ve emniyet kararlarının kalitesini artırır.",
    sections: [
      {
        title: "Tanımlar",
        content:
          "Dalga yüksekliği (H), dalga çukurundan tepesine olan dikey mesafedir. Deniz durumu değerlendirmesinde kullanılan anlamlı dalga yüksekliği (Hs veya H₁/₃), gözlenen en yüksek dalgaların üçte birinin ortalamasıdır ve hem gözlem hem uydu/model verileriyle ifade edilir. Dalga periyodu (T), ardışık iki dalga tepesinin aynı noktadan geçme süresidir (saniye cinsinden). Dalgaboyu (λ) ve dalga hızı (c) periyottan türetilir: derin suda λ ≈ 1.56 × T² (metre) ve c ≈ 1.56 × T (m/s).",
      },
      {
        title: "Gemi Hareketlerine Etkisi",
        content:
          "Dalga periyodu gemi hareketlerinin karakterini belirler. Kısa periyotlu dalgalar (4–7 s) hızlı ve sert yalpa/yunuslama hareketi üretir; bu durum kargo kaymalarına, mürettebat yaralanmalarına ve slamming hasarına yol açabilir. Uzun periyotlu swell (12–18 s) daha yavaş ama geniş açılı hareketler yaratır ve rezonans riski taşır. Geminin doğal yalpa periyoduyla dalga karşılaşma periyodu örtüştüğünde parametrik yalpa veya senkron yalpa gelişir; bu durum stabilite kaybına kadar giden tehlikeli sonuçlar doğurabilir. Dalga-baş açısı (encounter angle) bu risklerin yönetiminde temel kontrol değişkenidir.",
      },
      {
        title: "Operasyonel Değerlendirme",
        content:
          "Hava rotalama (weather routing) kararlarında Hs ve periyot birlikte değerlendirilir. Yalnızca dalga yüksekliğine bakarak düşük risk atfedilen bir bölge, kısa periyot nedeniyle aslında daha tehlikeli olabilir. Karşılaşma periyodunun hesaplanması için dalga yönü, geminin rotası ve hızı birlikte kullanılır. Rota veya hız değişikliğiyle karşılaşma periyodu kontrol edilebilir. Özellikle quartering sea koşullarında (dalga açısı 120°–150°) broaching riski artar; bu açı aralığı dikkatle izlenmeli ve gerekirse rota değişikliği uygulanmalıdır.",
      },
    ],
    keyPoints: [
      "Hs (anlamlı dalga yüksekliği) deniz durumu değerlendirmesinin standart ölçüsüdür.",
      "Periyot, gemi hareketlerinin şiddetini ve rezonans riskini belirler.",
      "Quartering sea (120°–150° dalga açısı) koşullarında broaching riski artar.",
      "Rota ve hız değişikliğiyle karşılaşma periyodu kontrol edilebilir.",
    ],
  },

  "Swell ve wind sea ayrımı": {
    title: "Swell ve Wind Sea Ayrımı",
    introduction:
      "Deniz yüzeyindeki dalgalar tek bir kaynaktan değil, birden fazla bileşenden oluşabilir. Yerel rüzgârın ürettiği wind sea ile uzak kaynaktan gelen swell birbirinden farklı karakteristiğe sahiptir. Bu ayrımı doğru yapmak, gemi hareketlerinin kaynağını anlamayı ve uygun operasyonel tedbirleri almayı mümkün kılar.",
    sections: [
      {
        title: "Wind Sea Karakteristiği",
        content:
          "Wind sea, yerel rüzgâr tarafından aktif olarak oluşturulan dalgalardır. Rüzgâr esiş yönüyle hemen hemen aynı doğrultuda ilerler. Periyodu genellikle kısa (3–8 s), formu düzensiz ve dik eğimlidir. Rüzgâr durduğunda veya yön değiştirdiğinde wind sea hızla sönümlenir. Wind sea'nin dalga yüksekliği; rüzgâr hızı, esiş süresi ve fetch mesafesi tarafından belirlenir.",
      },
      {
        title: "Swell Karakteristiği",
        content:
          "Swell, kaynak bölgesinden (genellikle yüzlerce hatta binlerce mil ötedeki bir fırtına alanı) ayrılmış ve yayılarak gelen dalgalardır. Periyodu uzundur (10–20 s), formu düzgün ve sinüzoidal yapıdadır. Swell çok az enerji kaybederek büyük mesafeler kat eder; bu nedenle yerel rüzgâr sakin olsa bile önemli dalga yüksekliğine sahip swell gözlenebilir. Aynı anda birden fazla yönden gelen swell bileşeni bulunabilir (cross swell); bu durum karmaşık deniz durumu yaratır.",
      },
      {
        title: "Operasyonel Önemi",
        content:
          "Liman yaklaşımlarında ve kıyı yakını operasyonlarda swell etkisi özellikle kritiktir. Sığ sularda swell dik ve yüksek dalga oluşumuna (shoaling) neden olabilir. Bağlama/boşaltma sırasında uzun periyotlu swell geminin ve iskele bağlantılarının dinamik yüklerini artırır; palamar kopması riski yükselir. Açık denizde wind sea ve swell birlikte analiz edilmeden yapılan hava rotalama kararları eksik kalır. Deniz durum raporu hazırlanırken wind sea ve swell ayrı ayrı belirtilmeli; yön, yükseklik ve periyot bilgileri her biri için verilmelidir.",
      },
    ],
    keyPoints: [
      "Wind sea yerel rüzgâra bağlı, kısa periyotlu ve düzensizdir.",
      "Swell uzak kaynaklı, uzun periyotlu ve çok az sönümlenerek yayılır.",
      "Yerel rüzgâr sakin olsa bile swell önemli dalga yüksekliğine ulaşabilir.",
      "Liman operasyonlarında swell kaynaklı dinamik yükler kritik risk faktörüdür.",
    ],
  },

  "Siklon yapısı ve gelişim evreleri": {
    title: "Tropikal Siklon Yapısı ve Gelişim Evreleri",
    introduction:
      "Tropikal siklonlar, sıcak okyanus yüzeylerinden enerji alarak gelişen, düşük basınç merkezli yoğun fırtına sistemleridir. Denizcilik açısından en tehlikeli hava olaylarından biridir; şiddetli rüzgâr, devasa dalgalar, fırtına kabarması ve görüş düşüklüğü ile can ve mal kaybına yol açabilir. Siklon evrelerini ve yapısını bilmek, kaçınma stratejisini belirlemede hayati önem taşır.",
    sections: [
      {
        title: "Oluşum Koşulları",
        content:
          "Tropikal siklon oluşumu için birkaç koşulun aynı anda sağlanması gerekir: deniz yüzeyi sıcaklığının en az 26.5°C olması ve bu sıcaklığın yaklaşık 50 m derinliğe kadar sürmesi, yeterli Coriolis etkisi (ekvatora 5° enlemden daha uzak), düşey rüzgâr kesmesinin (wind shear) zayıf olması ve üst atmosferde dış akış (outflow) sağlayacak bir diverjans alanının bulunması. Bu koşullar en sık tropikal okyanuslarda, yaz-sonbahar dönemlerinde bir araya gelir. Oluşum, tek bir küçük tropik bozukluk (tropical disturbance / easterly wave) ile başlar.",
      },
      {
        title: "Gelişim Evreleri",
        content:
          "Tropikal sistem dört evrede sınıflandırılır: (1) Tropikal Bozukluk — organize olmamış konveksiyon alanı, sürekli rüzgâr hızı < 34 knot. (2) Tropikal Fırtına — organize dolaşım, 34–63 knot sürekli rüzgâr; bu evrede sisteme resmi isim verilir. (3) Şiddetli Tropikal Fırtına — 48–63 knot rüzgâr hızı (bazı havzalarda ayrı kategori). (4) Tropikal Siklon / Tayfun / Kasırga — sürekli rüzgâr ≥ 64 knot; net bir göz yapısı oluşmuştur. Saffir-Simpson skalası (Kategoriler 1–5), kasırga şiddetini rüzgâr hızına göre sınıflar. Kategori 5'te rüzgâr 137 knotu aşar.",
      },
      {
        title: "Yapısal Öğeler",
        content:
          "Olgunlaşmış bir tropikal siklonun merkezinde, sakin, açık ve sıcak bir bölge olan göz (eye) bulunur; çapı 20–60 km arasında değişir. Gözü çevreleyen eyewall, en şiddetli rüzgâr ve en yoğun yağışın gözlendiği bölgedir. Eyewall'dan dışa doğru spiral yağmur bantları uzanır; bu bantlar arasında nispeten daha sakin bölgeler olabilir, ancak bu geçici durum yanıltıcı olabilir. Siklonun yüzey rüzgâr alanı çapı yüzlerce kilometre olabilir; fırtına dalgaları ise bu alanın çok ötesine ulaşır.",
      },
    ],
    keyPoints: [
      "Deniz yüzeyi sıcaklığı ≥ 26.5°C ve düşük rüzgâr kesmesi oluşum ön koşuludur.",
      "Tropik bozukluktan kategori 5 kasırgaya kadar sistematik bir evreleme vardır.",
      "Eyewall en şiddetli koşulları barındırır; göz sakinliği yanıltıcıdır.",
      "Fırtına dalgaları rüzgâr alanının çok ötesine ulaşabilir.",
    ],
  },

  "Tehlikeli/seyir yapılabilir yarım daire": {
    title: "Tehlikeli ve Seyir Yapılabilir Yarım Daire",
    introduction:
      "Tropikal siklonun hareket yönüne göre iki yarısı farklı risk seviyelerine sahiptir. Bu yarım daire kavramı, geminin siklona göre konumunu belirlemesini ve doğru kaçınma manevrası seçmesini sağlar. Yanlış yarım daire tespiti, gemiyi siklonun en şiddetli sektörüne sürükleyebilir.",
    sections: [
      {
        title: "Yarım Daire Tanımı",
        content:
          "Kuzey Yarım Kürede siklonun hareket yönünün sağ tarafı 'tehlikeli yarım daire' (dangerous semicircle), sol tarafı ise 'seyir yapılabilir yarım daire' (navigable semicircle) olarak adlandırılır. Güney Yarım Kürede bu durum tersine döner. Tehlikeli yarım dairede, siklonun hareket hızı (translasyon) dönel rüzgâra eklenerek toplam rüzgâr hızı artar. Ayrıca bu yarım dairede bulunan bir gemi, rüzgâr etkisiyle siklonun yoluna doğru sürüklenir. Seyir yapılabilir yarım dairede ise translasyon hızı dönel rüzgârdan çıkarılır, net rüzgâr hızı nispeten düşüktür ve rüzgâr gemiyi siklon yolundan uzaklaştırma eğilimindedir.",
      },
      {
        title: "Konum Belirleme Yöntemleri",
        content:
          "Geminin hangi yarım dairede olduğu, rüzgâr yön değişiminin izlenmesiyle belirlenir. Kuzey Yarım Kürede rüzgâr yönü saat yönünde (veering) dönüyorsa gemi tehlikeli yarım dairede, saat tersi yönünde (backing) dönüyorsa seyir yapılabilir yarım dairede konumlanmıştır. Barometre trendi ile birlikte değerlendirildiğinde, basıncın hızla düştüğü ve rüzgârın döndüğü durum siklonun yaklaştığını doğrular. Buys Ballot kuralına göre rüzgâra sırtını döndüğünde, Kuzey Yarım Kürede alçak basınç merkezi solunda kalır.",
      },
      {
        title: "Kaçınma Stratejisi",
        content:
          "Tehlikeli yarım dairede bulunan gemi, rüzgârı sancak baş omuzluğuna alarak siklondan uzaklaşmalıdır. Seyir yapılabilir yarım dairede ise rüzgâr kıç omuzluktan alınarak siklonun gerisine geçilmeye çalışılır. Siklonun doğrudan yolunda (path) bulunan gemi ise mümkün olan en yüksek hızla yolun sağına (Kuzey Yarım Küre) geçmeyi hedeflemelidir. Bu manevraların etkinliği zamana bağlıdır; erken karar alan gemi, manevra alanını geniş tutabilir. Kaçınma manevrası planlanırken siklonun öngörülen hızı ve yönü sürekli güncellenmelidir.",
      },
    ],
    keyPoints: [
      "Tehlikeli yarım dairede translasyon + dönel rüzgâr birleşir; toplam rüzgâr artar.",
      "Rüzgâr yönü değişimi (veering/backing) yarım daire tespitinde temel göstergedir.",
      "Buys Ballot kuralı siklon merkezinin yönünü bulmada yardımcıdır.",
      "Erken kaçınma manevrası en etkili koruma yöntemidir.",
    ],
  },

  "Barometre ve rüzgarla konum tayini": {
    title: "Barometre ve Rüzgârla Konum Tayini",
    introduction:
      "Fırtına ve siklon durumlarında, geminin meteorolojik sisteme göre nispi konumunu belirlemek için barometre okumaları ve rüzgâr gözlemleri birlikte kullanılır. Bu yöntem, elektronik hava verilerinin ulaşmadığı veya güvenilirliğinin sorgulandığı durumlarda hayati bir yedek karar aracıdır.",
    sections: [
      {
        title: "Barometre Trend Analizi",
        content:
          "Basınç değişim hızı, yaklaşan sistemin şiddeti hakkında önemli bilgi verir. Saatte 1 hPa veya daha hızlı düşüş önemli bir düşük basınç sisteminin yaklaştığını gösterir. 3 saatlik trend eğrisi çizilerek basınç değişiminin ivmelenmesi veya yavaşlaması izlenir. En düşük basınç okuması alındığında sistemin merkezi en yakın noktadan geçmektedir; ardından basınç yükselmeye başlar. Basıncın düşüş ve yükseliş süreleri karşılaştırılarak sistemin geçiş hızı ve büyüklüğü tahmin edilir.",
      },
      {
        title: "Rüzgâr Yönü ile Konum Belirleme",
        content:
          "Buys Ballot kuralı basit ama etkili bir yöntemdir: Kuzey Yarım Kürede rüzgâra sırtınızı döndüğünüzde, alçak basınç merkezi solunuzda (yaklaşık 90° kadar) ve biraz önünüzde kalır. Güney Yarım Kürede bu durum ayna görüntüsüdür. Rüzgâr yönünün zamana göre değişimi (veering veya backing) izlenerek, geminin sisteme göre hangi tarafta olduğu ve sistemin yaklaşıp yaklaşmadığı tespit edilir. Rüzgâr hızının artması ve basıncın eş zamanlı düşmesi sistemin yaklaştığını, rüzgâr hızının azalması ve basıncın yükselmesi uzaklaştığını gösterir.",
      },
      {
        title: "Operasyonel Uygulama",
        content:
          "Vardiya zabitinin saatlik barometre ve rüzgâr yönü/hızı kaydı tutması standart uygulamadır. Bu kayıtlar grafiksel olarak izlendiğinde eğilim kolayca görülür. Kaptan brifinglerinde trend sapmaları özellikle vurgulanmalıdır. Elde edilen bulgular, synoptik harita ve hava tahmin bültenleriyle karşılaştırılarak doğrulanmalıdır. Cihaz kalibrasyonu düzenli yapılmalıdır; özellikle aneroid barometre yükseklik düzeltmesinin doğru olduğu teyit edilmelidir.",
      },
    ],
    keyPoints: [
      "Barometre trendi anlık okumadan çok daha değerli operasyonel bilgidir.",
      "Buys Ballot kuralı ile alçak basınç merkezinin yönü belirlenebilir.",
      "Rüzgâr yönü değişim trendi (veering/backing) konumlama için kritiktir.",
      "Saatlik kayıt disiplini ve grafik takip standart prosedür olmalıdır.",
    ],
  },

  "Kaçınma manevrası prensipleri": {
    title: "Kaçınma Manevrası Prensipleri",
    introduction:
      "Tropikal siklon veya şiddetli fırtına karşısında doğru kaçınma manevrası, gemi ve mürettebat emniyetinin en kritik savunma hattıdır. Kaçınma stratejisi; siklonun konumuna, hareketine, geminin mevkiine ve performansına bağlı olarak belirlenmelidir.",
    sections: [
      {
        title: "Genel Prensipler",
        content:
          "Kaçınma manevrası planlanırken temel amaç, geminin siklonun en şiddetli bölgesinden mümkün olduğunca uzak kalmasını sağlamaktır. Erken karar almanın değeri son derece yüksektir; siklondan 200–300 deniz mili uzakta alınan bir kurs değişikliği, 50 mil mesafede alınan aynı karardan çok daha etkilidir. Manevra planı, siklonun öngörülen yolu (forecast track), uncertainty cone (belirsizlik konisi) ve geminin makine performansı dikkate alınarak hazırlanır.",
      },
      {
        title: "Yarım Daireye Göre Manevra",
        content:
          "Tehlikeli yarım dairede bulunan gemi, rüzgârı sancak baş omuzluğuna alarak mümkün olan en yüksek emniyetli hızla siklondan uzaklaşır. Seyir yapılabilir yarım dairede ise rüzgâr kıç omuzluktan alınarak siklonun gerisine geçilir. Siklonun doğrudan yolunda (path) bulunan gemi, hızla yolun dışına çıkmayı hedefler. Tüm bu manevralarda deniz durumu, yük emniyeti ve makine kapasitesi sınırlamalarını göz önünde bulundurmak gerekir; aşırı hızla seyir, slamming ve yapısal hasara yol açabilir.",
      },
      {
        title: "BRM ve Ekip Koordinasyonu",
        content:
          "Kaçınma manevrası bireysel bir karar değil, köprüüstü ekibinin koordineli bir çalışmasıdır. Kaptan kararı alır; ancak vardiya zabiti, ikinci kaptan ve helmsman'ın durumsal farkındalığı sürekli tutulmalıdır. Makine dairesi düşük devir veya tam güç taleplerine hazır olmalıdır. Güverte ekibi dış kapak ve lumbuzların emniyetini kontrol etmelidir. Karar sonrası performans, radar, AIS ve GPS ile sürekli teyit edilir; plan gerektiğinde güncellenir. Önceden hazırlanmış şirket heavy weather checklist'lerinin uygulanması, stres altında unutma riskini azaltır.",
      },
    ],
    keyPoints: [
      "Erken kaçınma kararı en etkili koruma yöntemidir.",
      "Manevra stratejisi yarım daire konumuna göre belirlenir.",
      "Siklonun yolu ve belirsizlik konisi sürekli güncellenmelidir.",
      "BRM prensibiyle ekip koordinasyonu sağlanmalıdır.",
    ],
  },

  "Sis oluşum türleri": {
    title: "Sis Oluşum Türleri",
    introduction:
      "Sis, görüşün 1000 metrenin altına düşmesine neden olan, yüzeye yakın su damlacıklarından oluşan bir hava olayıdır. Denizde sis, çatışma riskinin en önemli nedenlerinden biridir. Sis türünü tanımak, süresini ve şiddetini öngörmeye yardımcı olarak köprüüstünde proaktif emniyet tedbirleri alınmasını sağlar.",
    sections: [
      {
        title: "Adveksiyon Sisi",
        content:
          "Sıcak ve nemli havanın soğuk bir yüzey üzerinden hareket etmesiyle oluşur. Denizcilerin en sık karşılaştığı sis türüdür. Sıcak mT hava kütlesinin soğuk akıntı bölgesi üzerinden geçmesi tipik bir örnektir (Grand Banks, Japonya kuzey kıyıları vb.). Rüzgâr 5–15 knot arasında olduğunda, nemin sürekli taşınması nedeniyle yoğun ve geniş alana yayılan sis oluşur. Adveksiyon sisi gece-gündüz farkı gözetmeksizin oluşabilir ve günlerce sürebilir. Kalınlığı birkaç yüz metreden 1–2 km'ye kadar ulaşabilir.",
      },
      {
        title: "Radyasyon Sisi",
        content:
          "Gece boyunca yüzey radyasyonla soğuduğunda, yüzeye yakın hava katmanının çiğ noktasına ulaşmasıyla oluşur. Genellikle karasal bir olay olmakla birlikte, liman ve kıyı yakınlarında gemileri etkiler. Sakin, açık gecelerde ve rüzgârın çok hafif olduğu koşullarda gelişir. Güneş doğduktan ve yüzey ısındıktan sonra genellikle 2–4 saat içinde çözülür. Kalınlığı sınırlıdır; genelde 100–300 m arasında olup yüksek köprü yapılarından üzeri görülebilir.",
      },
      {
        title: "Buharlaşma Sisi ve Diğer Türler",
        content:
          "Buharlaşma sisi (steam fog / sea smoke), soğuk havanın sıcak su yüzeyi üzerinden geçmesiyle oluşur. Suyu yüzeyinden buharlaşan nem, soğuk havada hızla yoğuşur ve deniz yüzeyinden yükselen buhar sütunları görünümü verir. Arktik bölgelerde ve kış aylarında iç denizlerde sıkça gözlenir; kalınlığı genellikle sınırlıdır ancak görüşü ciddi ölçüde azaltabilir. Frontal sis, sıcak cephe önünde yağışın soğuk hava içine düşerek buharlaşması ve yoğuşmasıyla oluşur. Orografik sis, nemli havanın topografik yükseltiye (ada, yarımada) çarparak yükselmesi ve soğumasıyla oluşur; liman yaklaşımlarında karşılaşılabilir.",
      },
      {
        title: "Köprüüstü Tedbirleri",
        content:
          "Sis koşullarında veya sis oluşumu beklenen durumlarda COLREG Kural 19 (kısıtlı görüşte seyir) devreye girer. Emniyetli hız hesaplanarak düşürülür. Radar ayarları sis koşuluna göre optimize edilir (gain, sea clutter, rain filter). Ek gözcü görevlendirilir. Ses işaretleri başlatılır. Makine hazırda tutulur. Tüm bu tedbirler görüş fiilen düşmeden önce, meteorolojik koşullar sis oluşumunu işaret ettiğinde başlatılmalıdır. SST ile hava sıcaklığı ve çiğ noktası arasındaki fark düzenli izlenerek sis riski proaktif olarak değerlendirilir.",
      },
    ],
    keyPoints: [
      "Adveksiyon sisi en yaygın deniz sisi türüdür; günlerce sürebilir.",
      "Radyasyon sisi karasal kökenlidir, güneşle çözülür; liman yakınlarını etkiler.",
      "Buharlaşma sisi soğuk hava-sıcak su etkileşiminde oluşur.",
      "Sis tedbirleri, görüş düşmeden önce meteorolojik göstergelere göre başlatılmalıdır.",
    ],
  },

  "Görüş sınıflandırması": {
    title: "Görüş Sınıflandırması",
    introduction:
      "Görüş mesafesi, deniz emniyetinde hız seçimi, çatışmadan kaçınma ve seyir planlaması kararlarını doğrudan etkileyen temel bir parametredir. Görüşün standart bir ölçek üzerinden sınıflandırılması, vardiya kayıtlarında ve raporlamalarda tutarlılık sağlar.",
    sections: [
      {
        title: "Meteorolojik Görüş Sınıfları",
        content:
          "Dünya Meteoroloji Örgütü (WMO) ve IMO standartlarına göre görüş mesafesi şu şekilde sınıflandırılır: 0–200 m yoğun sis (dense fog), 200–500 m kalın sis (thick fog), 500–1000 m sis (fog), 1–2 km hafif sis (mist), 2–5 km pus (haze), 5–10 km orta görüş, 10 km üzeri iyi görüş. COLREG açısından görüşün 'kısıtlı' sayılması için belirgin bir eşik tanımlanmamıştır; bu değerlendirme geminin tipine, hızına, trafik yoğunluğuna ve mevcut koşullara göre vardiya zabitinin takdirine bırakılır. Genel uygulamada 3–5 deniz milinden az görüş 'kısıtlı' kabul edilir.",
      },
      {
        title: "Görüş Ölçümü ve Güçlükleri",
        content:
          "Denizde görüş mesafesi genellikle gözle tahmin edilir; bilinen mesafelerdeki nesneler (diğer gemiler, yapılar, ufuk çizgisi) referans alınır. Gece ve yağışlı koşullarda bu tahmin güçleşir. Yağış görüşü azaltırken, güneşin alçak açılarda parlaması da yanıltıcı etki yaratabilir. Bazı gemilerde optik görüş ölçüm cihazı (visibility sensor) bulunur, ancak bunlar sınırlı bir alanda ölçüm yapar ve geminin seyir yönündeki koşulları tam yansıtmayabilir. Bu nedenle enstrüman verisi ile görsel gözlem birlikte değerlendirilmelidir.",
      },
      {
        title: "Operasyonel Kararlar",
        content:
          "Görüş sınıflandırması, hız seçimi, radar kullanımı, gözcü düzenlemesi ve ses işareti prosedürleri üzerinde doğrudan belirleyicidir. Görüş azaldıkça emniyetli hız düşürülür, radar plotting sıklığı artırılır ve ek gözcü konuşlandırılır. Vardiya defterinde görüş durumu ve alınan tedbirler kayıt altına alınır. Özellikle yoğun trafik bölgelerinde ve TSS (Traffic Separation Scheme) alanlarında kısıtlı görüş, riski katlamandırır; bu bölgelerde VTS (Vessel Traffic Service) ile iletişim artırılmalıdır.",
      },
    ],
    keyPoints: [
      "COLREG'de kısıtlı görüş için sabit bir eşik yoktur; değerlendirme koşullara bağlıdır.",
      "Genel uygulamada 3–5 deniz milinden az görüş kısıtlı kabul edilir.",
      "Enstrüman verisi ve görsel gözlem birlikte kullanılmalıdır.",
      "Kısıtlı görüşte hız, radar plotting sıklığı ve gözcü düzenlemesi gözden geçirilmelidir.",
    ],
  },

  "Kısıtlı görüşte seyir kuralları": {
    title: "Kısıtlı Görüşte Seyir Kuralları",
    introduction:
      "COLREG Kural 19, kısıtlı görüş koşullarında seyir eden gemiler için özel kurallar belirler. Bu kurallar, görsel temas olmadan çatışmadan kaçınmayı düzenler ve radar/AIS kullanımını ön plana çıkarır. Kısıtlı görüşte meydana gelen deniz kazalarının büyük çoğunluğu, bu kuralların yetersiz uygulanmasından kaynaklanır.",
    sections: [
      {
        title: "COLREG Kural 19 Temel İlkeleri",
        content:
          "Kural 19, görüşe bakılmaksızın geçerli olan diğer kurallarla (Kural 5 gözcü, Kural 6 emniyetli hız, Kural 7 çatışma riski) birlikte uygulanır. Kural 19'a göre: gemiler emniyetli hızda seyretmelidir; makineler manevraya hazır tutulmalıdır; yalnızca radar ile tespit edilen bir gemiyle çatışma riski varsa, uygun zamanda uygun manevra yapılmalıdır. Önemli bir ilke: kısıtlı görüşte 'yol verme yükümlülüğü' kavramı yoktur; her gemi kendi güvenliği için manevra yapmakla yükümlüdür.",
      },
      {
        title: "Manevra Kısıtlamaları",
        content:
          "Kural 19(d) uyarınca, yalnızca radar ile tespit edilen ve çatışma riski bulunan gemiye karşı yapılacak manevralar sınırlandırılmıştır. İskele baş omuzlukta bulunan gemi için (sancak tarafa çalışması gereken gemiler hariç) iskeleye dümen kırılmaması önerilir. Tam kıçta bulunan gemiye karşı ise kıça dönüş yapılmaması önerilir. Bu kısıtlamalar, radar görüntüsünde hedef belirsizliğinin yüksek olduğu durumlarda yanlış manevrayı önlemek amacıyla konulmuştur. Hız azaltma veya tam durma her zaman geçerli bir seçenektir.",
      },
      {
        title: "Ses İşaretleri ve Ek Tedbirler",
        content:
          "COLREG Kural 35 uyarınca kısıtlı görüşte ses işaretleri zorunludur. Makine ile seyir halindeki gemi 2 dakikada bir uzun düdük; yol üzerinde makinesi çalışır ancak yol yapmayan gemi 2 dakikada bir art arda iki uzun düdük; dümeni tutmayan gemi, sürüklenen gemi, yelkenlide ve balıkçıda art arda bir uzun iki kısa düdük verilir. Demirdeki gemi her 1 dakikada çan çalar. Ses işaretlerinin zamanında başlatılması hukuki yükümlülüktür. Ek olarak, tüm seyir ışıkları yakılır, AIS durumu kontrol edilir ve uyarı mesajları yayınlanabilir.",
      },
    ],
    keyPoints: [
      "Kısıtlı görüşte yol verme yükümlülüğü kavramı yoktur; her gemi kendi güvenliğinden sorumludur.",
      "İskele baş omuzluktaki hedefe iskeleye dönüş; kıçtaki hedefe kıça dönüş yapılmamalıdır.",
      "Ses işaretleri COLREG Kural 35'e göre zorunludur ve zamanında başlatılmalıdır.",
      "Hız azaltma her zaman geçerli bir manevra seçeneğidir.",
    ],
  },

  "Radar ve ses işaretleri": {
    title: "Radar ve Ses İşaretleri",
    introduction:
      "Kısıtlı görüş koşullarında radar ve ses işaretleri, çatışmadan kaçınmanın iki temel aracıdır. Radar hedef tespiti ve takibi sağlarken, ses işaretleri yakın mesafede konumsal farkındalık ve uyarı fonksiyonu görür. Bu iki aracın etkili kullanımı, kısıtlı görüşte emniyet seviyesini doğrudan belirler.",
    sections: [
      {
        title: "Radar Kullanımı ve Ayarlar",
        content:
          "Kısıtlı görüşte radar, birincil hedef tespit aracıdır. Gain, sea clutter ve rain clutter kontrolleri mevcut koşullara göre optimize edilmelidir. Aşırı gain küçük hedeflerin clutter içinde kaybolmasına, yetersiz gain ise hedef kaçırılmasına neden olur. Her iki menzil (S-band ve X-band mevcutsa) birlikte kullanılmalıdır: X-band küçük hedefleri daha iyi çözerken, S-band yağış clutter'ından daha az etkilenir. ARPA (Automatic Radar Plotting Aid) ile tüm hedefler için CPA ve TCPA hesaplanır; kritik eşik değerleri (genellikle CPA < 1–2 NM) alarm olarak ayarlanır.",
      },
      {
        title: "Radar Kör Sektörleri ve Sınırlamalar",
        content:
          "Her geminin yapısal özelliklerinden kaynaklanan radar kör sektörleri vardır (baca, vinç, konteynır yığını vb.). Bu sektörler köprüüstünde işaretlenmiş olmalı ve vardiya zabiti tarafından bilinmelidir. Kör sektörlerde hedef tespiti yapılamaz; bu durumda diğer radar (mevcutsa), AIS ve gözcü bilgileri kullanılır. Deniz clutter'ı küçük hedefleri maskeleyebilir; özellikle ahşap tekneler, sal ve küçük balıkçı gemileri radar ekranında zor tespit edilir. Bu sınırlamalar bilinerek, radar tek güvenilir kaynak kabul edilmemeli, çoklu kaynak doğrulaması yapılmalıdır.",
      },
      {
        title: "Ses İşaretleri Detayı",
        content:
          "COLREG Kural 33 ve 35, ses işaretlerinin detaylarını düzenler. Makineyle seyir halindeki gemi 2 dakikada bir uzun düdük verir (4–6 saniye). Durağan ancak makinesi çalışan gemi art arda iki uzun düdük verir. Dümeni tutmayan, manevra kabiliyeti kısıtlı, draft'ından dolayı kısıtlı, yelkenli ve balıkçı gemileri bir uzun ve iki kısa düdük verir. Çekilen gemi (mevcutsa) çeken geminin hemen ardından bir uzun üç kısa düdük verir. Demirdeki gemi baş tarafında hızlı çan çalar (5 saniye, dakikada bir); 100 m'den uzun gemilerde ek olarak kıç tarafında gong çalınır. Bu işaretlerin doğru ve zamanında verilmesi hem emniyet hem de hukuki sorumluluk açısından zorunludur.",
      },
    ],
    keyPoints: [
      "S-band ve X-band radar birlikte kullanılarak tespit kapasitesi artırılmalıdır.",
      "Radar kör sektörleri bilinmeli ve alternatif kaynaklarla telafi edilmelidir.",
      "ARPA alarm eşikleri (CPA/TCPA) mevcut koşullara uygun ayarlanmalıdır.",
      "Ses işaretleri COLREG'e göre gemi tipi ve durumuna uygun olarak verilmelidir.",
    ],
  },

  "Küresel akıntı sistemleri": {
    title: "Küresel Akıntı Sistemleri",
    introduction:
      "Okyanus akıntıları, rüzgâr, Coriolis kuvveti, yoğunluk farkları ve kıtasal kıyı çizgisinin etkileşimiyle oluşan büyük ölçekli su hareketleridir. Bu akıntıların bilinmesi, transoceanic seferlerde rota optimizasyonu, ETA doğruluğu ve yakıt verimliliği için stratejik öneme sahiptir.",
    sections: [
      {
        title: "Rüzgâr Kaynaklı Yüzey Akıntıları",
        content:
          "Kalıcı rüzgâr sistemleri (alizeler, batı rüzgârları) okyanus yüzeyinde sürekli akıntılar oluşturur. Ekman teorisine göre yüzey akıntısı rüzgâr yönünden sağa (Kuzey Yarım Küre) veya sola (Güney Yarım Küre) yaklaşık 45° saparak akar. Bu yüzey akıntıları birleşerek büyük ölçekli gyre (döngü) sistemleri oluşturur: Kuzey Atlantik Gyre (Gulf Stream – Kuzey Atlantik Akıntısı – Kanarya Akıntısı – Kuzey Ekvatoral Akıntısı), Güney Atlantik Gyre, Kuzey ve Güney Pasifik Gyre'ları, Hint Okyanusu döngüleri. Batı sınır akıntıları (Gulf Stream, Kuroshio) doğu sınır akıntılarından çok daha güçlü ve dardır.",
      },
      {
        title: "Termohalin Dolaşım",
        content:
          "Sıcaklık ve tuzluluk farkları tarafından yönlendirilen derin okyanus dolaşımıdır. Soğuk, tuzlu ve yoğun su kutup bölgelerinde dibe çökerek ekvator yönünde hareket eder; bu büyük ölçekli dolaşım, yüzey akıntılarını dolaylı olarak etkiler. Denizciler için doğrudan operasyonel etkisi yüzey akıntılarına göre sınırlıdır, ancak iklim değişikliği bağlamında akıntı rejimlerindeki uzun vadeli değişimleri anlamak için önemlidir.",
      },
      {
        title: "Operasyonel Planlama",
        content:
          "Rota planlamasında büyük akıntı sistemleri stratejik olarak kullanılır. Örneğin Kuzey Atlantik'te batıya giden gemiler Gulf Stream'in güney kenarına yönelirken, doğuya giden gemiler akıntıdan faydalanmak için kuzey kenarını tercih eder. Pilot chart'lar mevsimsel ortalama akıntı yönü ve hızını gösterir, ancak güncel uydu verileri ve oceanographic forecast'lar daha doğru bilgi sağlar. SOG ile STW arasındaki fark, akıntının gerçek etkisini gösterir ve düzenli olarak kontrol edilerek rota planına feedback sağlar.",
      },
    ],
    keyPoints: [
      "Kalıcı rüzgâr sistemleri büyük ölçekli gyre döngülerini oluşturur.",
      "Batı sınır akıntıları (Gulf Stream, Kuroshio) güçlü ve operasyonel etkisi yüksektir.",
      "Pilot chart + güncel uydu verisi birlikte kullanılmalıdır.",
      "SOG-STW farkı akıntı etkisinin gerçek zamanlı göstergesidir.",
    ],
  },

  "Set ve drift değerlendirmesi": {
    title: "Set ve Drift Değerlendirmesi",
    introduction:
      "Set (akıntı yönü) ve drift (akıntı hızı), geminin planlanan rotasından sapmasının temel nedenlerindendir. Bu sapmanın doğru ölçülmesi ve rota düzeltmesine yansıtılması, emniyetli ve verimli seyir için zorunludur.",
    sections: [
      {
        title: "Tanımlar ve Ölçüm",
        content:
          "Set, akıntının aktığı yöndür (derece cinsinden); drift, akıntının hızıdır (knot cinsinden). Geminin COG (course over ground) ile heading arasındaki fark ve SOG ile STW arasındaki fark, mevcut akıntı bilgisini verir. Bu değerler periyodik fix'lerle doğrulanır: DR (dead reckoning) pozisyonu ile fix pozisyonu arasındaki vektör farkı, o zaman aralığındaki set ve drift'i gösterir. GPS pozisyonlarının yüksek doğrulukta olması sayesinde, saatlik fix'lerle bile güvenilir akıntı bilgisi elde edilebilir.",
      },
      {
        title: "Vektörel Çözümleme",
        content:
          "Akıntılı seyirde CTS (course to steer) hesaplaması vektörel olarak yapılır. İstenen iz rotası (track), akıntı vektörü ve gemi hız vektörü bir üçgen oluşturur. Akıntı yönü ve hızı bilinen veya ölçülen değer olarak alınır; istenen iz üzerinde kalabilmek için dümen kursuna uygulanacak düzeltme bu üçgenden çıkarılır. Leeway (rüzgâr kayması) ayrı bir bileşendir ve akıntıyla karıştırılmamalıdır; özellikle yüksek freeboard'lu gemilerde leeway etkisi belirgin olabilir.",
      },
      {
        title: "Operasyonel Uygulama",
        content:
          "Açık denizde set-drift değerleri her vardiya değişiminde güncellenir ve kaptan brifingine dahil edilir. Kıyı yakını ve pilotaj sularında fix sıklığı artırılır ve akıntı sapması sıkı limitlerle izlenir. Boğaz ve dar geçişlerde gelgit akıntısı baskın olduğundan, gelgit tablolarından hesaplanan akıntı değerleri de dikkate alınır. ECDIS üzerinde DR ile GPS pozisyonu karşılaştırılarak akıntı etkisi görsel olarak takip edilir. Set-drift bilgisi ETA hesaplamasını doğrudan etkiler; günlük noon report'ta akıntının rota ve hız üzerindeki etkisi ayrıca raporlanmalıdır.",
      },
    ],
    keyPoints: [
      "Set: akıntı yönü; drift: akıntı hızı. DR-fix farkı ile ölçülür.",
      "CTS hesabı, akıntı vektörü dahil edilerek yapılmalıdır.",
      "Leeway ve akıntı ayrı bileşenlerdir; birbirine karıştırılmamalıdır.",
      "Pilotaj sularında fix sıklığı ve akıntı takibi artırılmalıdır.",
    ],
  },

  "Akıntının ETA ve yakıta etkisi": {
    title: "Akıntının ETA ve Yakıta Etkisi",
    introduction:
      "Akıntı, geminin efektif hızını doğrudan etkiler. Karşı akıntı ETA'yı geciktirir ve yakıt tüketimini artırırken, yardımcı akıntı tersi etki yaratır. Akıntı etkisinin doğru hesaba katılması, ticari taahhütlerin yerine getirilmesi ve bunker yönetimi açısından kritiktir.",
    sections: [
      {
        title: "ETA Hesabında Akıntı Etkisi",
        content:
          "Geminin STW'si (speed through water) sabit tutulsa bile, karşı akıntı SOG'u (speed over ground) düşürür. Örneğin 14 knot STW ile seyreden ve 2 knot karşı akıntıya maruz kalan geminin SOG'u yaklaşık 12 knot olur. 1000 deniz millik bir seferde bu fark yaklaşık 12 saatlik ETA gecikmesine dönüşür. Sefer planı hazırlanırken, rota boyunca beklenen akıntı değerleri segmentlere bölünerek her segment için ayrı SOG hesaplanmalıdır. Güncel pilot chart verileri ve oşinografik tahminler kullanılarak en iyi, beklenen ve en kötü senaryo ETA'ları hesaplanır.",
      },
      {
        title: "Yakıt Tüketimi Üzerine Etkisi",
        content:
          "Karşı akıntı nedeniyle ETA'yı korumak için hız artırılması gerektiğinde, yakıt tüketimi dramatik şekilde artar — yakıt tüketimi yaklaşık olarak hızın küpüyle orantılıdır. 2 knot karşı akıntıyı telafi etmek için makine devrini artırmak, günlük yakıt tüketimini %30–50 artırabilir. Alternatif olarak, ETA gecikmesi kabul edilerek ekonomik hızda seyredilir ve yakıt tasarrufu sağlanır. Bu ticari karar, charter party koşullarına, liman slot zamanlarına ve bunker stoklarına bağlıdır. Yardımcı akıntıda ise ETA öne çekilir ve gereksiz yakıt tüketiminden kaçınmak için makine devri düşürülebilir (slow steaming).",
      },
      {
        title: "Raporlama ve Senaryo Planlaması",
        content:
          "Günlük noon report'ta, akıntının rota ve hız üzerindeki etkisi ayrı bir bölüm olarak raporlanmalıdır: planlanan SOG, gerçekleşen SOG, akıntı kaynaklı sapma ve tahmini kalan süre bilgileri verilir. Sefer öncesi en az üç senaryo (yardımcı akıntı, akıntısız, karşı akıntı) hazırlanmalı ve bunlara göre yakıt yeterliliği kontrol edilmelidir. Emniyet yakıt payı (bunker margin) hesaplanırken en kötü akıntı senaryosu dikkate alınmalıdır.",
      },
    ],
    keyPoints: [
      "2 knot karşı akıntı, 1000 NM seferde ~12 saat ETA gecikmesi yaratır.",
      "ETA korumak için hız artırmak yakıt tüketimini %30–50 artırabilir.",
      "Senaryo bazlı planlama (best/expected/worst) standart olmalıdır.",
      "Bunker emniyet payı en kötü akıntı senaryosuna göre hesaplanmalıdır.",
    ],
  },

  "Mevsimsel akıntı değişimleri": {
    title: "Mevsimsel Akıntı Değişimleri",
    introduction:
      "Okyanus akıntıları sabit değildir; mevsimsel rüzgâr değişimleri, monsun döngüleri ve yüzey sıcaklık dağılımı akıntıların yönünü ve hızını önemli ölçüde değiştirir. Bu değişimlerin önceden bilinmesi, uzun seferlerde rota ve zaman planlamasının kalitesini artırır.",
    sections: [
      {
        title: "Monsun Etkisi",
        content:
          "Hint Okyanusu'nda monsun rejimi, akıntı sistemini tamamen tersine çevirebilir. Güneybatı monsununda (Haziran–Eylül) Somalya Akıntısı kuzeye dönerken, kuzeydoğu monsununda (Aralık–Mart) güneye yönelir. Güneydoğu Asya denizlerinde de benzer mevsimsel değişimler görülür. Bu bölgelerde sefer planı yapan zabit, mevcut monsun döneminin akıntı rejimini pilot chart ve güncel oşinografik verilerden kontrol etmelidir.",
      },
      {
        title: "Diğer Mevsimsel Faktörler",
        content:
          "Gulf Stream ve Kuroshio gibi büyük akıntılar mevsimsel olarak güç ve pozisyon değiştirir. Gulf Stream'in kuzey sınırı yaz aylarında kuzeye kayar, kış aylarında güneye çekilir. Ekvatoral akıntılarda El Niño/La Niña döngüleri normal akıntı düzenini bozabilir. Arktik buz örtüsünün mevsimsel değişimi, kutup bölgelerindeki akıntı rotalarını etkiler. Bu değişimlerin ölçeği ve zamanlaması klimatolojik atlaslardan genel olarak bilinir, ancak yıllar arası varyasyon önemli olabilir.",
      },
      {
        title: "Operasyonel Sonuçlar",
        content:
          "Mevsimsel akıntı değişimi, özellikle aynı rota üzerinde farklı mevsimlerde yapılan seferlerde belirgin performans farkı yaratır. Geçmiş sefer verilerinin referans alınması yararlı olmakla birlikte, önceki seferin akıntı koşulları mevcut mevsime doğrudan uygulanamaz. Güncel uydu altimetre verileri ve oşinografik tahmin modelleri, mevsimsel klimatolojiden daha doğru bilgi sağlar. Sefer planında mevsimsel akıntı beklentisi ile güncel veri birlikte değerlendirilmeli, ETA ve yakıt hesapları buna göre revize edilmelidir.",
      },
    ],
    keyPoints: [
      "Hint Okyanusu'nda monsun akıntı yönünü tamamen değiştirir.",
      "Gulf Stream/Kuroshio pozisyon ve gücü mevsimsel olarak kayar.",
      "El Niño/La Niña döngüleri ekvatoral akıntı düzenini bozabilir.",
      "Güncel uydu verisi + mevsimsel klimatoloji birlikte kullanılmalıdır.",
    ],
  },

  "Synoptik harita sembolleri": {
    title: "Synoptik Harita Sembolleri",
    introduction:
      "Synoptik (durum) haritaları, belirli bir anda atmosferik koşulların standart sembollerle gösterildiği temel meteorolojik araçtır. Bu haritaları hızlı ve doğru okuyabilmek, köprüüstünde bağımsız hava değerlendirmesi yapmanın ön koşuludur.",
    sections: [
      {
        title: "Temel Semboller",
        content:
          "İzobarlar: sürekli eğriler, genellikle 4 hPa aralıkla, basınç değerleri üzerinde yazılıdır. Alçak basınç merkezi 'L' veya 'A' (Alçak), yüksek basınç merkezi 'H' veya 'Y' (Yüksek) ile gösterilir. Cepheler renkli çizgilerle belirtilir: soğuk cephe mavi üçgenlerle, sıcak cephe kırmızı yarım dairelerle, oklüde cephe her ikisinin birleşimiyle, stasyoner cephe karşılıklı üçgen ve yarım dairelerle gösterilir. Trough (oluk) kesik çizgiyle, ridge (sırt) zigzag çizgiyle temsil edilir.",
      },
      {
        title: "Rüzgâr Barb'ları ve İstasyon Modeli",
        content:
          "Rüzgâr barb'ı, istasyon noktasından estiği yöne doğru çizilen bir çubuktur. Kısa çizgi 5 knot, uzun çizgi 10 knot, bayrak (üçgen) 50 knot rüzgâr hızını temsil eder. İstasyon modeli (station plot) kompakt bir şekilde tek noktada şu bilgileri verir: rüzgâr yönü ve hızı, bulut örtüsü (çember doluluk oranı), sıcaklık, çiğ noktası, basınç ve basınç eğilimi. Bu modeli okuyabilmek, harita üzerinde herhangi bir noktanın mevcut koşullarını hızlıca değerlendirmeyi sağlar.",
      },
      {
        title: "Operasyonel Okuma ve Doğrulama",
        content:
          "Synoptik harita okunurken ilk kontrol, haritanın geçerlilik zamanıdır (UTC). Harita zamanı ile mevcut zaman arasındaki fark arttıkça güvenilirliği azalır. Rota üzerindeki kritik semboller (cephe konumları, sıkışık izobar bölgeleri, tropikal sistem pozisyonları) vardiya notlarına aktarılır ve ETA çizelgesiyle eşleştirilir. Birden fazla kaynak (NOAA, ECMWF, JMA, UK Met Office) karşılaştırılarak model tutarsızlıkları tespit edilir. Hava durumu faksı veya internet üzerinden alınan haritalar, NAVTEX ve SafetyNET uyarılarıyla çapraz kontrol edilir.",
      },
    ],
    keyPoints: [
      "İzobar aralığı ve cephe sembolleri synoptik okumada temel öğelerdir.",
      "Rüzgâr barb okuma ve istasyon modeli yorumlama pratik yapılmalıdır.",
      "Harita UTC zamanı ve güncelliği her zaman kontrol edilmelidir.",
      "Birden fazla kaynak karşılaştırması model hatalarını azaltır.",
    ],
  },

  "Cephe analizi ve hareket tahmini": {
    title: "Cephe Analizi ve Hareket Tahmini",
    introduction:
      "Cephe hareketinin doğru tahmini, rota üzerinde ne zaman hangi hava değişikliğinin karşılanacağını belirlemenin anahtarıdır. Ardışık synoptik haritaların karşılaştırılması ile cephe hızı, yönü ve şiddeti değerlendirilebilir.",
    sections: [
      {
        title: "Ardışık Harita Karşılaştırması",
        content:
          "Cephe hareket hızını tahmin etmek için ardışık iki synoptik haritada aynı cephenin konumu karşılaştırılır. İki harita arasındaki süre (genellikle 6 veya 12 saat) ve cephenin kat ettiği mesafe kullanılarak hareket hızı hesaplanır. Soğuk cepheler genellikle 25–40 knot, sıcak cepheler 15–25 knot hızla ilerler; ancak bu değerler büyük değişkenlik gösterebilir. Cephenin hareket yönü, arkasındaki hava kütlesinin baskı yönü ve üst seviye akışlarla belirlenir.",
      },
      {
        title: "Şiddet Değerlendirmesi",
        content:
          "Cephenin operasyonel etkisi, cephe boyunca sıcaklık kontrastına ve nem farkına bağlıdır. Büyük sıcaklık kontrastı güçlü konveksiyon, şiddetli yağış ve rüzgâr gustları üretir. Cephenin zayıflaması veya güçlenmesi, harita serisinden izlenebilir: izobar sıkışmasının artması güçlenmeyi, gevşemesi zayıflamayı işaret eder. Cephenin oklüzyona girmesi, yüzey etkisinin karmaşıklaşması ve genellikle zayıflamaya başlaması anlamına gelir.",
      },
      {
        title: "Operasyonel Zamanlama",
        content:
          "Cephenin tahmini geçiş zamanı, geminin mevcut rotası ve hızıyla birlikte değerlendirilerek karşılaşma zamanı ve yeri hesaplanır. Bu hesap, gerekirse rota veya hız değiştirerek cephe geçişini daha uygun bir zamanda veya konumda karşılamayı mümkün kılar. Mooring, kargo operasyonu, pilot alma gibi zamana hassas faaliyetler cephe geçiş tahminine göre programlanır. Plan tek bir tahmine kilitlenmemeli; cephe beklentiden hızlı veya yavaş ilerlemesi durumunda Plan B hazır tutulmalıdır.",
      },
    ],
    keyPoints: [
      "Ardışık haritalarla cephe hareket hızı hesaplanır.",
      "Cephe boyunca sıcaklık kontrastı, şiddeti belirler.",
      "Cephe geçiş zamanı rota/hız ile birlikte değerlendirilerek karşılaşma optimize edilebilir.",
      "Plan B her zaman hazır tutulmalıdır.",
    ],
  },

  "Rüzgar/deniz tahmini çıkarımı": {
    title: "Rüzgâr ve Deniz Tahmini Çıkarımı",
    introduction:
      "Synoptik haritadan rüzgâr ve deniz koşullarını çıkarabilmek, resmi tahmin alınamadığı veya tahminlerin yetersiz kaldığı durumlarda köprüüstünde bağımsız değerlendirme yapabilmenin temelidir. Bu beceri, deneyim ve teorik bilginin birleşimini gerektirir.",
    sections: [
      {
        title: "Rüzgâr Tahmini",
        content:
          "İzobar aralığından geostrofik rüzgâr hızı tahmin edilir. Genel kural olarak, 60° enlemde 5° boylam mesafede 4 hPa basınç farkı yaklaşık 20 knot geostrofik rüzgâra karşılık gelir; enlem azaldıkça aynı gradyan daha yüksek rüzgâr üretir. Yüzey rüzgârı, geostrofik değerin deniz üzerinde %70–80'i, kara üzerinde %50–60'ı kadardır. Rüzgâr yönü, izobar yönünden deniz üzerinde 10°–15°, kara üzerinde 25°–35° yüksek basınç tarafına sapar. Konvektif koşullarda (kümülonimbus, squall line) anlık gust değerleri ortalama rüzgârın 1.5–2 katına ulaşabilir.",
      },
      {
        title: "Deniz Durumu Tahmini",
        content:
          "Rüzgâr hızı belirlendikten sonra, rüzgârın esme süresi ve fetch mesafesi değerlendirilerek dalga gelişimi tahmin edilir. Tam gelişmiş denizde dalga yüksekliği yalnızca rüzgâr hızına bağlıdır. Ancak çoğu durumda deniz tam gelişmemiştir; fetch veya süre sınırlıdır. Pratik amaçla, rüzgâr hızı, esiş süresi ve fetch'in üçünden en küçüğü dalga gelişimini sınırlayan faktördür. Swell bileşeni bu hesaplamanın dışındadır ve ayrıca değerlendirilmelidir. Deniz durumu tahmini yapılırken yerel topografik etkiler (ada, burun, sığ su) dikkate alınmalıdır.",
      },
      {
        title: "Gözlem ile Doğrulama",
        content:
          "Haritadan çıkarılan tahminler, gemideki gerçek gözlemlerle sürekli karşılaştırılmalıdır. Tahmin ile gözlem arasındaki fark, ya harita analizinin ya da yerel koşulların standart dışı olduğunu gösterir. Her iki durumda da dikkat artırılmalıdır. Gözlem sapmalarının kaydedilmesi ve bir sonraki vardiyaya aktarılması, ekibin kolektif hava değerlendirmesini güçlendirir. Rota segmentlerine göre deniz durumu notu hazırlamak, sonraki seferlerde referans olarak kullanılabilir.",
      },
    ],
    keyPoints: [
      "Geostrofik rüzgâr izobar aralığından hesaplanır; yüzey rüzgârı bunun %70–80'idir.",
      "Dalga gelişimi rüzgâr hızı, süre ve fetch'in en küçüğüyle sınırlanır.",
      "Tahmin ile gözlem sürekli karşılaştırılmalıdır.",
      "Gust değerleri ortalama rüzgârın 1.5–2 katına ulaşabilir.",
    ],
  },

  "Rota üzerinde risk işaretleme": {
    title: "Rota Üzerinde Meteorolojik Risk İşaretleme",
    introduction:
      "Meteorolojik risklerin rota üzerinde sistematik olarak işaretlenmesi, ekip içinde ortak durum farkındalığı yaratır ve proaktif karar alma sürecini güçlendirir. Bu yaklaşım, BRM (Bridge Resource Management) prensipleriyle doğrudan örtüşür.",
    sections: [
      {
        title: "Risk Tanımlama ve Sınıflandırma",
        content:
          "Rota üzerinde meteorolojik risk değerlendirmesi, olasılık ve etki matrisine dayalı olarak yapılır. Her rota segmenti için beklenen hava koşulları, dalga yüksekliği, görüş, rüzgâr hızı ve akıntı parametreleri değerlendirilir. Risk seviyesi düşük (yeşil), orta (sarı), yüksek (kırmızı) olarak kodlanır. Tetikleyici limitler önceden tanımlanır: örneğin Force 7 üzeri rüzgâr, 4 m üzeri dalga yüksekliği veya 2 NM altı görüş gibi eşik değerler belirlenir.",
      },
      {
        title: "Görsel İşaretleme ve İletişim",
        content:
          "ECDIS üzerinde veya kağıt haritada riskli segmentler renk kodlarıyla işaretlenir. Her segment için tetikleyici limit değerleri, beklenen koşullar ve alternatif planlar (hız değişikliği, rota sapması, bekleme) yazılı olarak hazırlanır. Bu bilgiler vardiya devir tesliminde harita üzerinden brifing yapılarak aktarılır. Tüm ekibin aynı risk haritasını görmesi ve paylaşması, 'herkes aynı resme bakıyor' ilkesini hayata geçirir.",
      },
      {
        title: "Dinamik Güncelleme",
        content:
          "Risk haritası statik bir belge değildir; hava tahminleri güncellendikçe risk değerlendirmesi de revize edilir. Bir önceki değerlendirmeden bu yana meydana gelen değişiklikler (cephe hızı sapması, siklon yolunda kayma, beklenmeyen sis oluşumu vb.) risk haritasına yansıtılır. Güncelleme zamanları, önemli bir değişiklik olduğunda veya en azından vardiya başlangıcında yapılır. Risk işaretleme disiplini, kaptan ve zabitler arasında güven ortamı yaratır ve kritik kararlarda iletişim kalitesini artırır.",
      },
    ],
    keyPoints: [
      "Risk sınıflandırması olasılık-etki matrisine dayalıdır.",
      "Tetikleyici limitler (rüzgâr, dalga, görüş eşikleri) önceden tanımlanmalıdır.",
      "Risk haritası dinamiktir; hava güncellemeleriyle revize edilmelidir.",
      "Vardiya devrinde risk haritası üzerinden brifing BRM kalitesini artırır.",
    ],
  },
};
