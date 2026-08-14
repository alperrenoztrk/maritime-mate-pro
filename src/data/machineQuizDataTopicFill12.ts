import type { QuizQuestion } from "@/types/quiz";

/**
 * Konu doldurma bankası 12 — makine elemanları konu bankasında konu başına en
 * az 8 soru hedefini tutturmak için yazılan ek sorular.
 *
 * `exerciseQuestionDistribution.ts` soruları konu başlıklarıyla sözcük örtüşmesine
 * göre eşlediğinden her soru hedeflediği konunun kendi terminolojisini kullanır;
 * aksi hâlde benzerlik puanı soruyu komşu konuya taşır. Birbirine yakın konular
 * (kaynak hataları/NDT teknikleri, torsiyonel/aksiyel/lateral titreşim, mil çapı/
 * pervane şaftı/ara şaft) bilinçli olarak ayrı sözcük dağarcığıyla yazılmıştır.
 *
 * Numaralandırma taban + devam + vaka bankalarının ardından sürer (155'ten
 * başlar); `machineQuizDataIndex.ts` bankaları slug bazında bu sırayla birleştirir.
 */
export const machineQuizQuestionsTopicFill12: Record<string, QuizQuestion[]> = {
  "machine-elements": [
    {
      id: 155,
      question: "Çeliğin oda sıcaklığındaki temel kristal yapısı hangisidir?",
      options: [
        "Hacim merkezli kübik (BCC) yapıdır",
        "Yalnızca altıgen sıkı paket yapıdır",
        "Yalnızca amorf (düzensiz) yapıdır",
        "Yalnızca yüzey merkezli kübik yapıdır",
      ],
      correctAnswer: 0,
      explanation:
        "Ferrit fazı hacim merkezli kübik yapıdadır; 912 °C üzerinde östenit fazına geçerek yüzey merkezli kübik yapıya döner ve karbon çözünürlüğü artar.",
      category: "Makine Elemanları",
    },
    {
      id: 156,
      question: "Demir-karbon faz diyagramı neyi gösterir?",
      options: [
        "Yalnızca çeliğin satın alma fiyatını",
        "Sıcaklık ve karbona göre faz bölgeleri",
        "Yalnızca çeliğin renk kodlarını",
        "Yalnızca çeliğin ağırlık değerini",
      ],
      correctAnswer: 1,
      explanation:
        "Diyagram, karbon oranı ve sıcaklığa göre ferrit, östenit, sementit ve perlit gibi fazların hangi bölgede kararlı olduğunu gösterir; ısıl işlem planı buna dayanır.",
      category: "Makine Elemanları",
    },
    {
      id: 157,
      question: "Ötektoid çelikte karbon oranı yaklaşık kaçtır?",
      options: [
        "Yaklaşık %0,08 karbon içerir",
        "Yaklaşık %2,10 karbon içerir",
        "Yaklaşık %0,80 karbon içerir",
        "Yaklaşık %4,30 karbon içerir",
      ],
      correctAnswer: 2,
      explanation:
        "Ötektoid nokta %0,8 karbondadır; bu bileşimdeki östenit 727 °C'de doğrudan perlite dönüşür ve ara faz oluşmaz.",
      category: "Makine Elemanları",
    },
    {
      id: 158,
      question: "Kristal yapıda tane boyutunun küçülmesi çeliğe ne kazandırır?",
      options: [
        "Yalnızca malzemenin ağırlığını azaltır",
        "Yalnızca malzemenin rengini açar",
        "Yalnızca malzemenin yoğunluğunu düşürür",
        "Dayanım ve tokluğu birlikte artırır",
      ],
      correctAnswer: 3,
      explanation:
        "İnce tane, dislokasyon hareketini engelleyen tane sınırı sayısını artırır; akma dayanımı ve darbe tokluğu birlikte yükselir.",
      category: "Makine Elemanları",
    },
    {
      id: 159,
      question: "Krom alaşım elementi çeliğe ne kazandırır?",
      options: [
        "Korozyon direnci ve sertleşebilirlik",
        "Yalnızca çeliğin ağırlığını artırır",
        "Yalnızca çeliğin rengini değiştirir",
        "Yalnızca çeliğin fiyatını düşürür",
      ],
      correctAnswer: 0,
      explanation:
        "Krom yüzeyde koruyucu oksit filmi oluşturur; %10,5 üzerinde paslanmaz çelik elde edilir. Ayrıca sertleşme derinliğini ve aşınma direncini artırır.",
      category: "Makine Elemanları",
    },
    {
      id: 160,
      question: "Alüminyum alaşımlarının gemide tercih nedeni nedir?",
      options: [
        "Yalnızca çok ucuz olması durumu",
        "Hafiflik ve korozyon direnci",
        "Yalnızca yüksek sıcaklığa dayanması",
        "Yalnızca kolay kaynaklanabilmesi",
      ],
      correctAnswer: 1,
      explanation:
        "Yoğunluğu çeliğin üçte biridir ve yüzeydeki oksit filmi korozyona direnç verir; üst yapı, filika ve hızlı teknelerde ağırlık kazancı için kullanılır.",
      category: "Makine Elemanları",
    },
    {
      id: 161,
      question: "Bronz malzeme gemide en çok nerede kullanılır?",
      options: [
        "Yalnızca ana makine gövdesinde",
        "Yalnızca güverte kaplamasında",
        "Pervane ve valf gövdelerinde",
        "Yalnızca baca yapısında kullanılır",
      ],
      correctAnswer: 2,
      explanation:
        "Nikel-alüminyum bronz deniz suyunda korozyona ve kavitasyon erozyonuna dirençlidir; pervane kanatları, valf gövdeleri ve yatak burçlarında kullanılır.",
      category: "Makine Elemanları",
    },
    {
      id: 162,
      question: "Alüminyum ile çelik birleşiminde hangi önlem gerekir?",
      options: [
        "Yalnızca kalın boya uygulanmalıdır",
        "Yalnızca cıvata sayısı artırılmalıdır",
        "Yalnızca kaynak akımı düşürülmelidir",
        "Galvanik ayırıcı bağlantı kullanılmalı",
      ],
      correctAnswer: 3,
      explanation:
        "İki metal deniz suyunda temas ederse alüminyum hızla aşınır; bimetalik geçiş plakası veya yalıtkan conta ile elektriksel süreklilik kesilir.",
      category: "Makine Elemanları",
    },
    {
      id: 163,
      question: "Bakırın ısı ve elektrik iletiminde tercih nedeni nedir?",
      options: [
        "Çok yüksek iletkenlik değeri",
        "Yalnızca çok düşük yoğunluğu",
        "Yalnızca çok yüksek sertliği",
        "Yalnızca çok düşük maliyeti",
      ],
      correctAnswer: 0,
      explanation:
        "Bakır, gümüşten sonra en iyi elektrik ve ısı iletkenidir; bu yüzden kablo iletkeni, ısı değiştirici borusu ve topraklama bağlantılarında kullanılır.",
      category: "Makine Elemanları",
    },
    {
      id: 164,
      question: "Galvanik korozyon nasıl oluşur?",
      options: [
        "Yalnızca yüksek sıcaklıkta oluşmakta",
        "İki farklı metalin elektrolitte teması",
        "Yalnızca kuru ortamda oluşmaktadır",
        "Yalnızca mekanik darbe ile oluşmakta",
      ],
      correctAnswer: 1,
      explanation:
        "Elektrolit içinde temas eden iki metal pil oluşturur; galvanik seride aktif olan anot gibi davranıp hızla çözünür, soy olan korunur.",
      category: "Makine Elemanları",
    },
    {
      id: 165,
      question: "Çukurcuk (pitting) korozyonunun tehlikesi nedir?",
      options: [
        "Yalnızca yüzeyi matlaştırmasıdır",
        "Yalnızca rengi değiştirmesidir",
        "Küçük alanda derin delik açması",
        "Yalnızca ağırlığı artırmasıdır",
      ],
      correctAnswer: 2,
      explanation:
        "Toplam kütle kaybı az olduğu hâlde noktasal derinlik hızla ilerler ve ani delinmeye yol açar; genel incelme ölçümüyle fark edilmesi zordur.",
      category: "Makine Elemanları",
    },
    {
      id: 166,
      question: "Gerilmeli korozyon çatlaması hangi koşulda oluşur?",
      options: [
        "Yalnızca yüksek basınç altında oluşur",
        "Yalnızca düşük sıcaklıkta oluşmaktadır",
        "Yalnızca kuru havada oluşmaktadır",
        "Çekme gerilmesi ile korozif ortam birlikte",
      ],
      correctAnswer: 3,
      explanation:
        "Kalıcı veya işletme kaynaklı çekme gerilmesi, duyarlı malzeme ve korozif ortam bir aradayken çok küçük gerilmelerde bile çatlak ilerler.",
      category: "Makine Elemanları",
    },
    {
      id: 167,
      question: "Katodik koruma korozyona karşı nasıl çalışır?",
      options: [
        "Korunacak yüzeyi katot hâline getirir",
        "Yalnızca yüzeye boya uygulanmasıdır",
        "Yalnızca sıcaklığın düşürülmesidir",
        "Yalnızca metalin kalınlaştırılmasıdır",
      ],
      correctAnswer: 0,
      explanation:
        "Çinko veya alüminyum kurban anot ya da dış akım sistemi, korunacak yapıya elektron sağlayarak onu katot yapar; böylece metal çözünmesi durur.",
      category: "Makine Elemanları",
    },
    {
      id: 168,
      question: "Tavlama (annealing) ısıl işleminin amacı nedir?",
      options: [
        "Yalnızca sertliği artırmak amacıdır",
        "Gerilmeleri gidermek ve yumuşatmak",
        "Yalnızca yüzeyi renklendirmektir",
        "Yalnızca ağırlığı azaltmak amacıdır",
      ],
      correctAnswer: 1,
      explanation:
        "Parça östenit bölgesine ısıtılıp fırında yavaş soğutulur; iç gerilmeler giderilir, tane yapısı düzelir ve malzeme işlenebilir hâle gelir.",
      category: "Makine Elemanları",
    },
    {
      id: 169,
      question: "Su verme (quenching) ısıl işlemi neyi sağlar?",
      options: [
        "Yalnızca malzemeyi yumuşatmaktadır",
        "Yalnızca malzemeyi renklendirmektedir",
        "Martenzit oluşturup sertliği yükseltir",
        "Yalnızca malzemeyi genişletmektedir",
      ],
      correctAnswer: 2,
      explanation:
        "Östenit bölgesindeki parça hızla soğutulunca karbon yayınamaz ve sert, gevrek martenzit oluşur; sertlik yükselir ama tokluk düşer.",
      category: "Makine Elemanları",
    },
    {
      id: 170,
      question: "Su vermeden sonra menevişleme neden yapılır?",
      options: [
        "Yalnızca yüzeyi parlatmak içindir",
        "Yalnızca sertliği daha da artırmak için",
        "Yalnızca ağırlığı azaltmak içindir",
        "Gevrekliği azaltıp tokluk kazandırmak",
      ],
      correctAnswer: 3,
      explanation:
        "Sertleştirilmiş parça daha düşük sıcaklıkta yeniden ısıtılır; iç gerilmeler azalır ve bir miktar sertlik karşılığında tokluk kazanılır.",
      category: "Makine Elemanları",
    },
    {
      id: 171,
      question: "Gemi inşa çeliğinde A, B, D, E dereceleri neyi gösterir?",
      options: [
        "Darbe tokluğunun test sıcaklığını",
        "Yalnızca çeliğin renk kodunu gösterir",
        "Yalnızca çeliğin kalınlığını gösterir",
        "Yalnızca çeliğin fiyat sınıfını gösterir",
      ],
      correctAnswer: 0,
      explanation:
        "Dereceler darbe testinin yapıldığı sıcaklığı yansıtır; A derecesi test istemezken E derecesi -40 °C'de belirli enerji değerini karşılamak zorundadır.",
      category: "Makine Elemanları",
    },
    {
      id: 172,
      question: "Yüksek dayanımlı gemi çeliği hangi üstünlüğü sağlar?",
      options: [
        "Yalnızca daha ucuz olması durumu",
        "Aynı dayanımda daha ince sac kullanımı",
        "Yalnızca daha kolay kaynaklanması",
        "Yalnızca daha düşük yoğunluk değeri",
      ],
      correctAnswer: 1,
      explanation:
        "Akma dayanımı 355 MPa dolayındadır; aynı mukavemeti daha ince sacla sağladığından tekne ağırlığı düşer ve taşıma kapasitesi artar.",
      category: "Makine Elemanları",
    },
    {
      id: 173,
      question: "Klas kuruluşu onaylı gemi çeliği neyi güvence altına alır?",
      options: [
        "Yalnızca çeliğin renginin doğruluğunu",
        "Yalnızca çeliğin ambalajının uygunluğu",
        "Bileşim ve mekanik özelliklerin uygunluğu",
        "Yalnızca çeliğin teslim tarihinin uygunluğu",
      ],
      correctAnswer: 2,
      explanation:
        "Onaylı üretici, her döküm için kimyasal bileşim ve mekanik test sonuçlarını içeren sertifika düzenler; sörveyör bu belgeleri ve işaretlemeyi doğrular.",
      category: "Makine Elemanları",
    },
    {
      id: 174,
      question: "Normal gerilme nasıl hesaplanır?",
      options: [
        "Kuvvetin uzunluğa bölümü ile",
        "Kuvvetin hacme bölümü ile",
        "Kuvvetin kütleye bölümü ile",
        "Kuvvetin kesit alanına bölümü ile",
      ],
      correctAnswer: 3,
      explanation:
        "Gerilme, kuvvetin kesit alanına bölünmesiyle bulunur; kesit küçüldükçe aynı kuvvet altında gerilme büyür, bu yüzden delik ve çentik bölgeleri kritiktir.",
      category: "Makine Elemanları",
    },
    {
      id: 175,
      question: "Kayma gerilmesi hangi kuvvet türünden doğar?",
      options: [
        "Kesite paralel etkiyen kuvvetten",
        "Yalnızca kesite dik kuvvetten doğar",
        "Yalnızca sıcaklık farkından doğar",
        "Yalnızca ağırlık kuvvetinden doğar",
      ],
      correctAnswer: 0,
      explanation:
        "Kesite teğet etkiyen kuvvet malzemenin katmanlarını birbirine göre kaydırma eğilimi yaratır; perçin ve cıvata bağlantılarında baskın gerilme türüdür.",
      category: "Makine Elemanları",
    },
    {
      id: 176,
      question: "Perçin bağlantısında kesme gerilmesi nasıl bulunur?",
      options: [
        "Yalnızca perçin boyu ile bulunur",
        "Kuvvetin perçin kesitine bölümüyle",
        "Yalnızca perçin sayısı ile bulunur",
        "Yalnızca sac kalınlığı ile bulunur",
      ],
      correctAnswer: 1,
      explanation:
        "Toplam kuvvet perçin sayısına bölünüp tek perçinin kesit alanına oranlanır; çift tesirli bağlantıda kesit iki kat sayılır ve gerilme yarıya iner.",
      category: "Makine Elemanları",
    },
    {
      id: 177,
      question: "Kayma modülü (G) neyi ifade eder?",
      options: [
        "Yalnızca malzemenin yoğunluğunu",
        "Yalnızca malzemenin sertliğini",
        "Kayma gerilmesi ile açı değişimi oranı",
        "Yalnızca malzemenin ağırlığını",
      ],
      correctAnswer: 2,
      explanation:
        "G, kayma gerilmesinin yarattığı açısal deformasyona oranıdır; elastiklik modülü ve Poisson oranı ile ilişkilidir, burulma hesaplarının temel girdisidir.",
      category: "Makine Elemanları",
    },
    {
      id: 178,
      question: "Bir mil burulurken hangi gerilme baskındır?",
      options: [
        "Yalnızca basma gerilmesi baskındır",
        "Yalnızca çekme gerilmesi baskındır",
        "Yalnızca eğilme gerilmesi baskındır",
        "Kayma gerilmesi baskın olmaktadır",
      ],
      correctAnswer: 3,
      explanation:
        "Burulma momenti kesit boyunca kayma gerilmesi üretir; gerilme merkezde sıfır, dış yüzeyde en büyüktür. Bu yüzden içi boş miller ağırlığa göre verimlidir.",
      category: "Makine Elemanları",
    },
    {
      id: 179,
      question: "Hooke yasası hangi bölgede geçerlidir?",
      options: [
        "Yalnızca elastik bölgede geçerlidir",
        "Yalnızca plastik bölgede geçerlidir",
        "Yalnızca kopma noktasında geçerlidir",
        "Her koşulda ve her bölgede geçerlidir",
      ],
      correctAnswer: 0,
      explanation:
        "Gerilme ile birim şekil değiştirme arasındaki doğrusal ilişki yalnızca orantı sınırına kadar geçerlidir; akma başladıktan sonra bağıntı bozulur.",
      category: "Makine Elemanları",
    },
    {
      id: 180,
      question: "Elastiklik modülü (E) neyi gösterir?",
      options: [
        "Yalnızca malzemenin kopma yükünü",
        "Malzemenin elastik rijitliğini gösterir",
        "Yalnızca malzemenin ağırlığını gösterir",
        "Yalnızca malzemenin sertliğini gösterir",
      ],
      correctAnswer: 1,
      explanation:
        "E, aynı gerilme altında ne kadar az uzayacağını verir; çeliğin değeri yaklaşık 210 GPa, alüminyumunki 70 GPa'dır ve ısıl işlemle önemli ölçüde değişmez.",
      category: "Makine Elemanları",
    },
    {
      id: 181,
      question: "Gerilme-şekil değiştirme eğrisinde orantı sınırı neyi gösterir?",
      options: [
        "Yalnızca malzemenin koptuğu noktayı",
        "Yalnızca en büyük uzamanın noktasını",
        "Doğrusal ilişkinin bittiği noktayı",
        "Yalnızca kesitin daraldığı noktayı",
      ],
      correctAnswer: 2,
      explanation:
        "Bu noktaya kadar gerilme ile birim şekil değiştirme doğru orantılıdır ve Hooke yasası geçerlidir; ötesinde eğri kıvrılır ve kalıcı deformasyon başlar.",
      category: "Makine Elemanları",
    },
    {
      id: 182,
      question: "Eğilme gerilmesi kesit üzerinde nasıl dağılır?",
      options: [
        "Kesitin boyunca her noktada eşit kalmaktadır",
        "Yalnızca kesitin tam merkezinde en büyüktür",
        "Yalnızca kesitin alt yüzeyinde bulunmaktadır",
        "Tarafsız eksende sıfır, uçlarda en büyük",
      ],
      correctAnswer: 3,
      explanation:
        "Gerilme tarafsız eksenden uzaklıkla doğrusal artar; bir yüzde çekme, karşı yüzde basma oluşur. En büyük değer en dış liftedir.",
      category: "Makine Elemanları",
    },
    {
      id: 183,
      question: "Eğilme direncini artırmanın en etkili yolu nedir?",
      options: [
        "Malzemeyi tarafsız eksenden uzağa koymak",
        "Yalnızca kesit alanını merkeze toplamak",
        "Yalnızca malzemenin rengini değiştirmek",
        "Yalnızca kirişin boyunu uzatmak",
      ],
      correctAnswer: 0,
      explanation:
        "Atalet momenti uzaklığın karesiyle büyür; I profili ve kutu kesit malzemeyi başlıklara taşıyarak aynı ağırlıkta çok daha yüksek eğilme direnci verir.",
      category: "Makine Elemanları",
    },
    {
      id: 184,
      question: "Eğilme hesabında mukavemet momenti (W) neyi verir?",
      options: [
        "Yalnızca kesitin ağırlığını verir",
        "Atalet momentinin uç uzaklığa oranı",
        "Yalnızca kesitin alanını vermektedir",
        "Yalnızca kesitin boyunu vermektedir",
      ],
      correctAnswer: 1,
      explanation:
        "Atalet momentinin en dış life olan uzaklığa bölünmesiyle bulunur; en büyük eğilme gerilmesi momentin bu değere bölünmesiyle doğrudan hesaplanır.",
      category: "Makine Elemanları",
    },
    {
      id: 185,
      question: "Dolu bir milde burulma gerilmesi nerede en büyüktür?",
      options: [
        "Yalnızca milin tam merkezinde",
        "Yalnızca milin uç yüzeylerinde",
        "Milin dış yüzeyinde en büyüktür",
        "Kesit boyunca her yerde eşittir",
      ],
      correctAnswer: 2,
      explanation:
        "Gerilme merkezden uzaklıkla doğrusal artar; bu yüzden merkezdeki malzeme az iş yapar ve içi boş mil ağırlık başına daha verimli olur.",
      category: "Makine Elemanları",
    },
    {
      id: 186,
      question: "Burulma açısı hangi büyüklüklere bağlıdır?",
      options: [
        "Yalnızca milin rengine ve ağırlığına",
        "Yalnızca ortam sıcaklığına ve neme",
        "Yalnızca milin üretim yılına bağlıdır",
        "Moment, boy, kayma modülü ve atalete",
      ],
      correctAnswer: 3,
      explanation:
        "Açı, burulma momenti ile mil boyunun çarpımının kayma modülü ve polar atalet momenti çarpımına bölünmesiyle bulunur; uzun mil daha çok burulur.",
      category: "Makine Elemanları",
    },
    {
      id: 187,
      question: "Burulma yükü taşıyan içi boş mil neden tercih edilir?",
      options: [
        "Aynı dayanımı daha az ağırlıkla verir",
        "Yalnızca daha ucuz üretildiği için",
        "Yalnızca daha kolay taşındığı için",
        "Yalnızca daha kısa olduğu için",
      ],
      correctAnswer: 0,
      explanation:
        "Polar atalet momentine katkının çoğu dış bölgeden gelir; merkezdeki malzeme çıkarılınca dayanım çok az düşerken ağırlık belirgin azalır.",
      category: "Makine Elemanları",
    },
    {
      id: 188,
      question: "Pervane şaftında burulma momenti neye bağlıdır?",
      options: [
        "Yalnızca şaftın boyuna bağlıdır",
        "İletilen güç ile devir sayısına",
        "Yalnızca deniz suyu sıcaklığına",
        "Yalnızca şaftın rengine bağlıdır",
      ],
      correctAnswer: 1,
      explanation:
        "Moment, gücün açısal hıza bölünmesiyle bulunur; aynı güçte devir düşerse moment büyür, bu yüzden yavaş devirli tahriklerde şaft çapı artar.",
      category: "Makine Elemanları",
    },
    {
      id: 189,
      question: "Von Mises kriteri neyi öngörür?",
      options: [
        "Yalnızca kopma anını doğrudan öngörür",
        "Yalnızca yorulma ömrünü öngörmektedir",
        "Sünek malzemede akmanın başlamasını",
        "Yalnızca korozyon hızını öngörmektedir",
      ],
      correctAnswer: 2,
      explanation:
        "Kriter, çok eksenli gerilme durumunu tek bir eşdeğer gerilmeye indirger; bu değer akma dayanımını aştığında sünek malzemede plastik akma başlar.",
      category: "Makine Elemanları",
    },
    {
      id: 190,
      question: "Aynı anda burulan ve eğilen bir mil nasıl değerlendirilir?",
      options: [
        "Yalnızca eğilme gerilmesi hesaplanır",
        "Yalnızca burulma gerilmesi hesaplanır",
        "Yalnızca ikisinin farkı hesaplanmakta",
        "Eşdeğer gerilme ile birlikte değerlendirilir",
      ],
      correctAnswer: 3,
      explanation:
        "İki gerilme birbirine dik düzlemlerde etkidiğinden doğrudan toplanamaz; von Mises veya maksimum kayma gerilmesi kriteriyle tek eşdeğer değere indirgenir.",
      category: "Makine Elemanları",
    },
    {
      id: 191,
      question: "Bileşik gerilme durumunda asal gerilmeler neyi ifade eder?",
      options: [
        "Kayma gerilmesinin sıfır olduğu düzlemler",
        "Yalnızca en büyük sıcaklık noktaları",
        "Yalnızca en küçük kesit alanları",
        "Yalnızca en büyük ağırlık noktaları",
      ],
      correctAnswer: 0,
      explanation:
        "Gerilme durumu döndürülerek kayma bileşeninin sıfırlandığı düzlemler bulunur; bu düzlemlerdeki normal gerilmeler asal gerilmelerdir ve uç değerleri verir.",
      category: "Makine Elemanları",
    },
    {
      id: 192,
      question: "Çentik bulunan bir kesitte gerilme nasıl davranır?",
      options: [
        "Yalnızca sabit kalıp değişmemektedir",
        "Çentik dibinde yerel olarak yükselir",
        "Yalnızca kesit boyunca azalmaktadır",
        "Yalnızca yüzeyden uzakta yükselmekte",
      ],
      correctAnswer: 1,
      explanation:
        "Kuvvet akış çizgileri çentik çevresinde sıkışır ve yerel gerilme ortalamanın katlarına çıkar; yorulma çatlakları hemen hemen her zaman burada başlar.",
      category: "Makine Elemanları",
    },
    {
      id: 193,
      question: "Güvenlik katsayısı nasıl tanımlanır?",
      options: [
        "Yalnızca malzeme ağırlığının hacme oranıdır",
        "Yalnızca uygulanan kuvvetin alana oranıdır",
        "Sınır gerilmenin çalışma gerilmesine oranı",
        "Yalnızca parça boyunun kesite oranıdır",
      ],
      correctAnswer: 2,
      explanation:
        "Katsayı, akma veya kopma dayanımının izin verilen çalışma gerilmesine bölünmesiyle bulunur; belirsizlik ve beklenmeyen yükler bu payla karşılanır.",
      category: "Makine Elemanları",
    },
    {
      id: 194,
      question: "Güvenlik katsayısı hangi durumda büyük seçilir?",
      options: [
        "Yalnızca parça ucuz olduğunda büyük seçilir",
        "Yalnızca parça küçük olduğunda büyük seçilir",
        "Yalnızca parça yeni olduğunda büyük seçilir",
        "Yük ve malzeme belirsizliği yüksekse",
      ],
      correctAnswer: 3,
      explanation:
        "Dinamik yük, korozyon, darbe ve can emniyeti riski varsa katsayı yükseltilir; iyi bilinen sabit yükte ve kontrollü malzemede daha küçük değer yeterlidir.",
      category: "Makine Elemanları",
    },
    {
      id: 195,
      question: "Emniyet gerilmesi nasıl bulunur?",
      options: [
        "Sınır gerilmenin katsayıya bölümüyle",
        "Yalnızca sınır gerilmenin iki katıyla",
        "Yalnızca kesit alanının çarpımıyla",
        "Yalnızca kuvvetin karesiyle bulunur",
      ],
      correctAnswer: 0,
      explanation:
        "İzin verilen gerilme, malzemenin sınır dayanımının güvenlik katsayısına bölünmesiyle elde edilir; tasarımda hesaplanan gerilme bu değerin altında kalmalıdır.",
      category: "Makine Elemanları",
    },
    {
      id: 196,
      question: "Güvenlik katsayısının gereğinden büyük seçilmesi ne yaratır?",
      options: [
        "Yalnızca daha yüksek dayanım kazandırır",
        "Gereksiz ağırlık ve maliyet yaratmaktadır",
        "Yalnızca daha kısa üretim süresi sağlar",
        "Yalnızca daha kolay montaj sağlamaktadır",
      ],
      correctAnswer: 1,
      explanation:
        "Aşırı katsayı kesitleri büyütür; gemide bu doğrudan ağırlık, maliyet ve yakıt tüketimi demektir. Amaç riski karşılayan en küçük yeterli değerdir.",
      category: "Makine Elemanları",
    },
    {
      id: 197,
      question: "Mil çapı hesabında hangi iki yük birlikte alınır?",
      options: [
        "Yalnızca ağırlık ve sıcaklık yükü",
        "Yalnızca basınç ve nem yükü alınır",
        "Burulma momenti ile eğilme momenti",
        "Yalnızca elektriksel ve manyetik yük",
      ],
      correctAnswer: 2,
      explanation:
        "Şaft hem güç iletirken burulur hem kendi ağırlığı ve pervane yüküyle eğilir; çap, bu iki momentin eşdeğer momentine göre belirlenir.",
      category: "Makine Elemanları",
    },
    {
      id: 198,
      question: "Mil çapı iki katına çıkarılırsa burulma dayanımı nasıl değişir?",
      options: [
        "Yaklaşık iki katına çıkmaktadır",
        "Yaklaşık dört katına çıkmaktadır",
        "Değişmeden aynı kalmaktadır",
        "Yaklaşık sekiz katına çıkmaktadır",
      ],
      correctAnswer: 3,
      explanation:
        "Burulma direnci çapın küpüyle büyür; çap iki katına çıkınca taşınabilen moment yaklaşık sekiz katına çıkar. Bu yüzden küçük çap artışı büyük kazanç verir.",
      category: "Makine Elemanları",
    },
    {
      id: 199,
      question: "Mil çapı hesabında hangi ek etken dikkate alınır?",
      options: [
        "Kama kanalı ve çap değişimi çentikleri",
        "Yalnızca milin boya kalınlığı değeri",
        "Yalnızca milin depolama süresi bilgisi",
        "Yalnızca milin üretici firma adı bilgisi",
      ],
      correctAnswer: 0,
      explanation:
        "Kama kanalı, geçiş yarıçapı ve delik gibi süreksizlikler yerel gerilmeyi yükseltir; hesaba çentik faktörü eklenir veya bu bölgelerde çap büyütülür.",
      category: "Makine Elemanları",
    },
    {
      id: 200,
      question: "Mil malzemesi seçilirken hangi özellik öne çıkar?",
      options: [
        "Yalnızca malzemenin rengi öne çıkar",
        "Yorulma dayanımı ve tokluk öne çıkar",
        "Yalnızca malzemenin ağırlığı öne çıkar",
        "Yalnızca malzemenin fiyatı öne çıkar",
      ],
      correctAnswer: 1,
      explanation:
        "Şaft milyonlarca çevrim boyunca değişken yük taşır; statik dayanımdan çok yorulma sınırı ve çentik duyarlılığı belirleyicidir.",
      category: "Makine Elemanları",
    },
    {
      id: 201,
      question: "IACS birleşik kuralları şaft boyutlandırmada ne sağlar?",
      options: [
        "Yalnızca şaftın rengini standartlaştırır",
        "Yalnızca şaftın fiyatını belirlemektedir",
        "Klaslar arasında ortak asgari ölçüt verir",
        "Yalnızca şaftın teslim süresini belirler",
      ],
      correctAnswer: 2,
      explanation:
        "Birleşik kurallar, üye klas kuruluşlarının aynı asgari çap ve malzeme koşullarını uygulamasını sağlar; böylece gemi hangi klasta olursa olsun taban aynı kalır.",
      category: "Makine Elemanları",
    },
    {
      id: 202,
      question: "Pervane şaftı çapı hesabında hangi girdi kullanılır?",
      options: [
        "Yalnızca geminin boyu kullanılmaktadır",
        "Yalnızca geminin tonajı kullanılmaktadır",
        "Yalnızca deniz suyu sıcaklığı kullanılır",
        "Anma güç, devir ve malzeme dayanımı",
      ],
      correctAnswer: 3,
      explanation:
        "Kural formülü şaftın ileteceği anma gücü, devir sayısı, malzemenin çekme dayanımı ve şaft tipine bağlı bir katsayıyı içerir.",
      category: "Makine Elemanları",
    },
    {
      id: 203,
      question: "Pervane şaftı neden ara şafttan daha kalın yapılır?",
      options: [
        "Pervane ağırlığı ve deniz suyu etkisi",
        "Yalnızca daha kolay üretildiği için",
        "Yalnızca daha ucuz olduğu için",
        "Yalnızca daha kısa olduğu için",
      ],
      correctAnswer: 0,
      explanation:
        "Kıç uçtaki şaft, konsol yüklü pervanenin eğilme momentini taşır ve korozif deniz suyu ortamındadır; kurallar bu yüzden daha büyük çap ister.",
      category: "Makine Elemanları",
    },
    {
      id: 204,
      question: "Pervane şaftı üzerinde koruyucu kılıf (liner) neden bulunur?",
      options: [
        "Yalnızca şaftın ağırlığını artırmak için",
        "Deniz suyu korozyonundan korumak için",
        "Yalnızca şaftın rengini korumak için",
        "Yalnızca şaftın boyunu uzatmak için",
      ],
      correctAnswer: 1,
      explanation:
        "Bronz veya paslanmaz kılıf, stern tube bölgesinde şaftı deniz suyundan ayırır ve yatak yüzeyi için düzgün bir çalışma yüzeyi sağlar.",
      category: "Makine Elemanları",
    },
    {
      id: 205,
      question: "Ara şaft hangi bölümde bulunur?",
      options: [
        "Yalnızca pervane göbeği içinde",
        "Yalnızca dümen dairesinde bulunur",
        "Trust yatak ile kıç boru arasında",
        "Yalnızca makine bloğu içerisinde",
      ],
      correctAnswer: 2,
      explanation:
        "Ara şaftlar makine ile stern tube arasındaki mesafeyi köprüler; destek yataklarıyla taşınır ve flanşlı bağlantılarla birbirine eklenir.",
      category: "Makine Elemanları",
    },
    {
      id: 206,
      question: "Kıç boru şaftının sızdırmazlığı nasıl sağlanır?",
      options: [
        "Yalnızca boya tabakasıyla sağlanmakta",
        "Yalnızca kaynak dikişiyle sağlanmakta",
        "Yalnızca cıvatalarla sağlanmaktadır",
        "Yağlı veya sulu salmastra düzeniyle",
      ],
      correctAnswer: 3,
      explanation:
        "Yağ yağlamalı sistemde dudaklı keçe takımı ve iç-dış yağ tankı bulunur; su yağlamalı sistemde ise kutu salmastra ve deniz suyu yağlaması kullanılır.",
      category: "Makine Elemanları",
    },
    {
      id: 207,
      question: "Şaft flanş bağlantısında cıvatalar hangi işi görür?",
      options: [
        "Sürtünme ile momenti aktarmaktadır",
        "Yalnızca flanşları hizalamaktadır",
        "Yalnızca sızdırmazlık sağlamaktadır",
        "Yalnızca ağırlığı taşımaktadır",
      ],
      correctAnswer: 0,
      explanation:
        "Ön gerilmeli cıvatalar flanş yüzeyleri arasında sürtünme kuvveti yaratır ve moment bu sürtünmeyle aktarılır; alıştırma cıvataları kesme yüküne de karşı koyar.",
      category: "Makine Elemanları",
    },
    {
      id: 208,
      question: "Kaymalı yatakta hidrodinamik yağ filmi nasıl oluşur?",
      options: [
        "Yalnızca dışarıdan basınç uygulanarak",
        "Dönen milin yağı kama boşluğuna sürüklemesi",
        "Yalnızca yatak ısıtılarak oluşturulmakta",
        "Yalnızca yağ soğutularak oluşturulmakta",
      ],
      correctAnswer: 1,
      explanation:
        "Mil dönerken yapışan yağ, daralan boşluğa sürüklenip basınç üretir; bu basınç yükü taşır ve metal teması ortadan kalkar.",
      category: "Makine Elemanları",
    },
    {
      id: 209,
      question: "Beyaz metal (babbitt) yatak malzemesinin üstünlüğü nedir?",
      options: [
        "Yalnızca çok yüksek sertlik değeri",
        "Yalnızca çok düşük maliyet değeri",
        "Yabancı parçacığı gömüp mili koruması",
        "Yalnızca çok yüksek erime sıcaklığı",
      ],
      correctAnswer: 2,
      explanation:
        "Yumuşak yapısı sayesinde yağa karışan sert parçacıklar yatak yüzeyine gömülür ve mili çizmez; ayrıca hafif hizasızlığa uyum sağlar.",
      category: "Makine Elemanları",
    },
    {
      id: 210,
      question: "Yağ yağlamalı stern tube yatağında sıcaklık artışı neyi gösterir?",
      options: [
        "Yalnızca deniz suyunun ısındığını",
        "Yalnızca geminin hızlandığını gösterir",
        "Yalnızca pervanenin temizlendiğini",
        "Yağ filmi bozulması veya aşırı yükü",
      ],
      correctAnswer: 3,
      explanation:
        "Sıcaklık yükselmesi yetersiz yağ debisi, hizasızlık, yatak aşınması veya aşırı yük anlamına gelir; alarm sınırında yük düşürülür ve neden aranır.",
      category: "Makine Elemanları",
    },
    {
      id: 211,
      question: "Su yağlamalı stern tube yatağında hangi malzeme kullanılır?",
      options: [
        "Kompozit veya lignum vitae malzemesi",
        "Yalnızca dökme demir kullanılmaktadır",
        "Yalnızca alüminyum kullanılmaktadır",
        "Yalnızca cam elyaf kullanılmaktadır",
      ],
      correctAnswer: 0,
      explanation:
        "Su ile yağlanan yataklarda geleneksel olarak sert ağaç, günümüzde ise su emmeyen kompozit ve polimer segmanlar kullanılır; yağ kaçağı riski ortadan kalkar.",
      category: "Makine Elemanları",
    },
    {
      id: 212,
      question: "Rulman ömrü (L10) ne anlama gelir?",
      options: [
        "Yalnızca rulmanın garanti süresidir",
        "Yüzde 90'ının aştığı çalışma ömrüdür",
        "Yalnızca rulmanın raf ömrüdür",
        "Yalnızca rulmanın montaj süresidir",
      ],
      correctAnswer: 1,
      explanation:
        "Aynı koşullarda çalışan rulmanların %90'ı bu süreyi aşar, %10'u aşamaz; ömür milyon devir veya saat cinsinden ifade edilir.",
      category: "Makine Elemanları",
    },
    {
      id: 213,
      question: "Rulman ömrü yük artışına nasıl tepki verir?",
      options: [
        "Yalnızca yükten bağımsız kalmaktadır",
        "Yalnızca yükle doğru orantılı artmakta",
        "Yükün küpü veya daha fazlasıyla düşer",
        "Yalnızca yükle doğrusal olarak düşer",
      ],
      correctAnswer: 2,
      explanation:
        "Bilyalı rulmanda ömür yükün küpüyle, makaralıda daha da hızlı düşer; yükün iki katına çıkması ömrü sekizde bire indirir.",
      category: "Makine Elemanları",
    },
    {
      id: 214,
      question: "Eksenel yük taşıyacak bir yerde hangi rulman seçilir?",
      options: [
        "Yalnızca silindirik makaralı rulman",
        "Yalnızca iğneli rulman seçilmelidir",
        "Yalnızca düz kaymalı burç seçilir",
        "Baskı (thrust) veya eğik bilyalı rulman",
      ],
      correctAnswer: 3,
      explanation:
        "Silindirik makaralı rulman eksenel yük taşımaz; eksenel bileşen varsa baskı rulmanı veya temas açısı eksenel yüke uygun eğik bilyalı rulman seçilir.",
      category: "Makine Elemanları",
    },
    {
      id: 215,
      question: "Rulman arızalarının en yaygın nedeni nedir?",
      options: [
        "Yetersiz veya kirlenmiş yağlama",
        "Yalnızca rulmanın eski olması",
        "Yalnızca ortam sıcaklığının düşmesi",
        "Yalnızca rulmanın renginin solması",
      ],
      correctAnswer: 0,
      explanation:
        "Saha verileri arızaların büyük bölümünü yağlama hatasına bağlar; yanlış gres tipi, aşırı veya eksik miktar ve kirlenme başlıca nedenlerdir.",
      category: "Makine Elemanları",
    },
    {
      id: 216,
      question: "Şaft hizalama neden gemi yüzer hâldeyken kontrol edilir?",
      options: [
        "Yalnızca ölçüm daha kolay olduğu için",
        "Tekne bükülmesi hizayı etkilediği için",
        "Yalnızca hava koşulları uygun olduğu için",
        "Yalnızca personel hazır olduğu için",
      ],
      correctAnswer: 1,
      explanation:
        "Havuzda ve yüzerken tekne farklı biçimde bükülür; nihai hizalama ve yatak yük ölçümleri gemi yüzer hâldeyken ve bilinen yükleme durumunda yapılır.",
      category: "Makine Elemanları",
    },
    {
      id: 217,
      question: "Şaft hizalamada hangi iki değer ölçülür?",
      options: [
        "Yalnızca şaft boyu ve ağırlığı ölçülür",
        "Yalnızca yağ sıcaklığı ve basıncı",
        "Flanşlarda kırıklık (gap) ve kaçıklık (sag)",
        "Yalnızca pervane hatvesi ve çapı",
      ],
      correctAnswer: 2,
      explanation:
        "İki flanş arasındaki açısal fark ile eksenel kaçıklık komparatör veya sentille ölçülür; değerler üreticinin verdiği tolerans tablosuyla karşılaştırılır.",
      category: "Makine Elemanları",
    },
    {
      id: 218,
      question: "Hatalı şaft hizalaması yatakta hangi belirtiyi doğurur?",
      options: [
        "Yalnızca yağ tüketiminin azalması",
        "Yalnızca şaft devrinin yükselmesi",
        "Yalnızca gürültünün tümüyle kesilmesi",
        "Eşitsiz yük, ısınma ve titreşim",
      ],
      correctAnswer: 3,
      explanation:
        "Bazı yataklar aşırı yüklenirken bazıları yükünü kaybeder; aşırı yüklenen yatak ısınır, yağ filmi incelir ve şaftta değişken eğilme yorulması başlar.",
      category: "Makine Elemanları",
    },
    {
      id: 219,
      question: "Yatak yükü ölçümü (jack-up test) neyi doğrular?",
      options: [
        "Her yatağın taşıdığı gerçek yükü",
        "Yalnızca şaft malzemesinin sertliğini",
        "Yalnızca pervanenin dengesini doğrular",
        "Yalnızca yağın viskozitesini doğrular",
      ],
      correctAnswer: 0,
      explanation:
        "Kriko ile şaft yavaşça kaldırılır ve yük-yer değiştirme eğrisi çizilir; eğrinin kırılma noktası yatağın taşıdığı yükü verir ve hesapla karşılaştırılır.",
      category: "Makine Elemanları",
    },
    {
      id: 220,
      question: "Düz dişlide modül (m) neyi belirler?",
      options: [
        "Yalnızca dişlinin rengini belirler",
        "Dişin boyutunu ve dayanımını belirler",
        "Yalnızca dişlinin ağırlığını belirler",
        "Yalnızca dişlinin devrini belirler",
      ],
      correctAnswer: 1,
      explanation:
        "Modül, bölüm dairesi çapının diş sayısına oranıdır; büyük modül daha iri ve dayanıklı diş demektir. Kavrayan iki dişlinin modülü aynı olmak zorundadır.",
      category: "Makine Elemanları",
    },
    {
      id: 221,
      question: "İki düz dişlide çevrim oranı nasıl bulunur?",
      options: [
        "Yalnızca modüllerin çarpımı ile",
        "Yalnızca çapların toplamı ile",
        "Diş sayılarının oranı ile bulunur",
        "Yalnızca genişliklerin farkı ile",
      ],
      correctAnswer: 2,
      explanation:
        "Çevrim oranı, çıkış dişlisinin diş sayısının giriş dişlisininkine bölünmesiyle bulunur; oran büyüdükçe devir düşer ve moment aynı oranda artar.",
      category: "Makine Elemanları",
    },
    {
      id: 222,
      question: "Düz dişlide diş dibi hangi gerilmeye maruz kalır?",
      options: [
        "Yalnızca basma gerilmesine maruz kalır",
        "Yalnızca burulma gerilmesine maruz kalır",
        "Yalnızca kayma gerilmesine maruz kalır",
        "Değişken eğilme gerilmesine maruz kalır",
      ],
      correctAnswer: 3,
      explanation:
        "Her kavrama çevriminde diş, kökünden ankastre bir kiriş gibi eğilir; bu tekrarlı yük diş dibinde yorulma çatlağının en yaygın nedenidir.",
      category: "Makine Elemanları",
    },
    {
      id: 223,
      question: "Dişli yüzeyinde pitting hasarı neyi gösterir?",
      options: [
        "Yüzey temas gerilmesinin aşıldığını",
        "Yalnızca dişlinin boyandığını gösterir",
        "Yalnızca yağın çok temiz olduğunu",
        "Yalnızca devrin düştüğünü göstermekte",
      ],
      correctAnswer: 0,
      explanation:
        "Tekrarlı temas basıncı yüzey altında yorulma çatlağı başlatır; parçacıklar koparak küçük çukurlar bırakır. Yağ filmi kalınlığının artırılması hasarı yavaşlatır.",
      category: "Makine Elemanları",
    },
    {
      id: 224,
      question: "Helisel dişlinin düz dişliye göre üstünlüğü nedir?",
      options: [
        "Yalnızca daha ucuz üretilmesi durumu",
        "Daha sessiz ve kademesiz kavrama",
        "Yalnızca eksenel yük üretmemesi",
        "Yalnızca daha kısa ömürlü olması",
      ],
      correctAnswer: 1,
      explanation:
        "Dişler açılı olduğundan kavrama kademeli başlar; temas oranı yükselir, gürültü ve darbe azalır. Buna karşılık eksenel kuvvet doğar ve baskı yatağı gerekir.",
      category: "Makine Elemanları",
    },
    {
      id: 225,
      question: "Pervane redüktörünün görevi nedir?",
      options: [
        "Yalnızca pervane hatvesini ayarlamak",
        "Yalnızca şaftı soğutmakla görevlidir",
        "Makine devrini pervane devrine düşürmek",
        "Yalnızca yakıt tüketimini ölçmektir",
      ],
      correctAnswer: 2,
      explanation:
        "Orta ve yüksek devirli makineler verimli pervane devrinin çok üstünde çalışır; redüktör devri düşürüp momenti artırarak pervane verimini yükseltir.",
      category: "Makine Elemanları",
    },
    {
      id: 226,
      question: "Çift girişli tek çıkışlı redüktör ne sağlar?",
      options: [
        "Yalnızca redüktör ağırlığını artırır",
        "Yalnızca pervane çapını büyütmektedir",
        "Yalnızca yakıt tüketimini artırmakta",
        "İki makineyi tek pervaneye bağlar",
      ],
      correctAnswer: 3,
      explanation:
        "İki ana makine kavramalar üzerinden aynı redüktöre bağlanır; tek makineyle düşük hızda yakıt tasarrufu, iki makineyle tam güç sağlanır ve yedeklilik artar.",
      category: "Makine Elemanları",
    },
    {
      id: 227,
      question: "V kayışlı tahrikin temel avantajı nedir?",
      options: [
        "Titreşimi sönümleyip darbeyi azaltması",
        "Yalnızca hiç bakım gerektirmemesi",
        "Yalnızca çok yüksek güç iletebilmesi",
        "Yalnızca hiç kaymaması durumu",
      ],
      correctAnswer: 0,
      explanation:
        "Esnek kayış darbeleri ve titreşimi yutar, aşırı yükte kayarak sistemi korur; buna karşılık kayma nedeniyle kesin çevrim oranı garanti edilmez.",
      category: "Makine Elemanları",
    },
    {
      id: 228,
      question: "Zincir tahrikin kayışa göre üstünlüğü nedir?",
      options: [
        "Yalnızca daha sessiz çalışması durumu",
        "Kaymadan kesin oran sağlaması",
        "Yalnızca hiç yağlama gerektirmemesi",
        "Yalnızca daha hafif olması durumu",
      ],
      correctAnswer: 1,
      explanation:
        "Zincir baklaları dişliye geçtiğinden kayma olmaz ve çevrim oranı kesindir; buna karşılık yağlama ister, gürültülüdür ve uzadıkça gerginlik ayarı gerekir.",
      category: "Makine Elemanları",
    },
    {
      id: 229,
      question: "Kayış gerginliği yetersiz olursa ne olur?",
      options: [
        "Yalnızca kayış ömrü uzamaktadır",
        "Yalnızca güç iletimi artmaktadır",
        "Kayma, ısınma ve güç kaybı oluşur",
        "Yalnızca titreşim tümüyle kesilir",
      ],
      correctAnswer: 2,
      explanation:
        "Yetersiz gerginlikte kayış kasnak üzerinde kayar; sürtünme ısısı kayışı yakar ve iletilen güç düşer. Aşırı gerginlik ise yatak yükünü artırır.",
      category: "Makine Elemanları",
    },
    {
      id: 230,
      question: "Zincir uzaması nasıl kontrol edilir?",
      options: [
        "Yalnızca zincirin rengine bakılarak",
        "Yalnızca zincirin sesine bakılarak",
        "Yalnızca zincirin ağırlığı tartılarak",
        "Belirli sayıda baklanın boyu ölçülerek",
      ],
      correctAnswer: 3,
      explanation:
        "Pim ve burç aşınınca adım uzar; belirli sayıda baklanın toplam boyu ölçülüp nominal değerle karşılaştırılır. Sınırı aşan zincir dişlisiyle birlikte yenilenir.",
      category: "Makine Elemanları",
    },
    {
      id: 231,
      question: "Esnek kaplinin temel işlevi nedir?",
      options: [
        "Küçük kaçıklıkları ve darbeyi karşılamak",
        "Yalnızca şaft boyunu uzatmak işlevidir",
        "Yalnızca şaftı soğutmak işlevi görmekte",
        "Yalnızca şaftı boyamak işlevi görmekte",
      ],
      correctAnswer: 0,
      explanation:
        "Elastik elemanlar açısal, eksenel ve radyal kaçıklığı bir ölçüde karşılar, burulma titreşimini sönümler ve darbeleri yumuşatır.",
      category: "Makine Elemanları",
    },
    {
      id: 232,
      question: "Rijit kaplin hangi koşulda kullanılabilir?",
      options: [
        "Yalnızca yüksek titreşimli sistemlerde",
        "Hizalama çok hassas yapıldığında",
        "Yalnızca kaçıklık büyük olduğunda",
        "Yalnızca sıcaklık değiştiğinde kullanılır",
      ],
      correctAnswer: 1,
      explanation:
        "Rijit kaplin hiçbir kaçıklığı karşılamaz; hizasızlık doğrudan yatak ve şafta yük olarak biner. Bu yüzden yalnızca çok hassas hizalanmış hatlarda kullanılır.",
      category: "Makine Elemanları",
    },
    {
      id: 233,
      question: "Burulma titreşimi sönümleyen kaplin ne yapar?",
      options: [
        "Yalnızca şaft devrini yükseltmektedir",
        "Yalnızca şaft ağırlığını artırmaktadır",
        "Rezonans genliğini azaltıp yükü düşürür",
        "Yalnızca yağ tüketimini artırmaktadır",
      ],
      correctAnswer: 2,
      explanation:
        "Lastik veya yay elemanlı kaplin sistemin burulma rijitliğini ve sönümünü değiştirir; kritik devirdeki genlik düşer ve yasak devir bandı daraltılabilir.",
      category: "Makine Elemanları",
    },
    {
      id: 234,
      question: "Kaplin cıvatalarının doğru sıkılması neden önemlidir?",
      options: [
        "Yalnızca cıvata rengini korumak içindir",
        "Yalnızca montajı hızlandırmak içindir",
        "Yalnızca ağırlığı azaltmak içindir",
        "Momentin sürtünmeyle aktarılması için",
      ],
      correctAnswer: 3,
      explanation:
        "Ön gerilme yetersizse flanşlar kayar ve cıvatalar kesme yükü altında kalır; bu yüzden tork veya uzama ölçümüyle belirtilen sıkma değeri sağlanır.",
      category: "Makine Elemanları",
    },
    {
      id: 235,
      question: "Kavramanın (clutch) gemi tahrikindeki işlevi nedir?",
      options: [
        "Makineyi şafttan ayırıp bağlayabilmek",
        "Yalnızca şaft devrini ölçebilmektir",
        "Yalnızca şaftı yağlayabilmek işlevidir",
        "Yalnızca şaftı soğutabilmek işlevidir",
      ],
      correctAnswer: 0,
      explanation:
        "Kavrama, makineyi durdurmadan pervaneyi devreden çıkarmayı sağlar; çok makineli tahrikte devre dışı makinenin şaftı sürüklemesini de önler.",
      category: "Makine Elemanları",
    },
    {
      id: 236,
      question: "Sürtünmeli (friction) kavrama nasıl güç iletir?",
      options: [
        "Yalnızca dişlerin kenetlenmesiyle iletir",
        "Baskı altındaki disk sürtünmesiyle iletir",
        "Yalnızca manyetik alanla iletmektedir",
        "Yalnızca hidrolik akışla iletmektedir",
      ],
      correctAnswer: 1,
      explanation:
        "Hava veya yağ basıncıyla sıkıştırılan sürtünme diskleri momenti kademeli aktarır; kayma sırasında ısı açığa çıktığından soğutma ve balata bakımı gerekir.",
      category: "Makine Elemanları",
    },
    {
      id: 237,
      question: "Hidrolik (fluid) kavramanın üstünlüğü nedir?",
      options: [
        "Yalnızca hiç ısınmaması durumudur",
        "Yalnızca hiç kayıp üretmemesidir",
        "Darbesiz ve aşınmasız güç iletmesi",
        "Yalnızca çok küçük olması durumudur",
      ],
      correctAnswer: 2,
      explanation:
        "Pompa ve türbin çarkları arasında temas olmadığından mekanik aşınma yoktur ve titreşim iletilmez; buna karşılık kayma nedeniyle bir miktar verim kaybı vardır.",
      category: "Makine Elemanları",
    },
    {
      id: 238,
      question: "Kavrama devreye alınırken neye dikkat edilir?",
      options: [
        "Yalnızca yakıt debisinin artırılmasına",
        "Yalnızca soğutma suyunun kesilmesine",
        "Yalnızca alarmların susturulmasına",
        "Devir farkının küçük tutulmasına",
      ],
      correctAnswer: 3,
      explanation:
        "Büyük devir farkında kavrama uzun süre kayar, aşırı ısınır ve balata yanar; bu yüzden makine devri şaft devrine yaklaştırılarak kademeli bağlanır.",
      category: "Makine Elemanları",
    },
    {
      id: 239,
      question: "Yorulma ömrü grafiği olan S-N eğrisi neyi gösterir?",
      options: [
        "Gerilme genliğine karşı çevrim sayısını",
        "Yalnızca sıcaklığa karşı sertliği",
        "Yalnızca ağırlığa karşı hacmi gösterir",
        "Yalnızca basınca karşı debiyi gösterir",
      ],
      correctAnswer: 0,
      explanation:
        "Yatay eksende kırılmaya kadar geçen çevrim sayısı, düşey eksende gerilme genliği bulunur; genlik düştükçe dayanılan çevrim sayısı hızla artar.",
      category: "Makine Elemanları",
    },
    {
      id: 240,
      question: "Yorulma kırılması hangi görünümü verir?",
      options: [
        "Yalnızca tümüyle pürüzlü bir yüzey",
        "Plaj çizgileri ve ani kopma bölgesi",
        "Yalnızca tümüyle parlak bir yüzey",
        "Yalnızca eriyip akmış bir yüzey",
      ],
      correctAnswer: 1,
      explanation:
        "Çatlağın yavaş ilerlediği bölge düzgün ve plaj çizgilidir; kalan kesit yetmeyince oluşan son kopma bölgesi ise pürüzlü ve taneli görünür.",
      category: "Makine Elemanları",
    },
    {
      id: 241,
      question: "Çeliklerde yorulma sınırı ne demektir?",
      options: [
        "Yalnızca kopma dayanımının kendisi",
        "Yalnızca akma dayanımının kendisi",
        "Altında sonsuz ömür verilen genlik",
        "Yalnızca sertlik değerinin kendisi",
      ],
      correctAnswer: 2,
      explanation:
        "Bazı çeliklerde belirli bir genliğin altında eğri yatay hâle gelir; bu genliğin altında parça pratikte sınırsız çevrim taşır. Alüminyumda böyle bir sınır yoktur.",
      category: "Makine Elemanları",
    },
    {
      id: 242,
      question: "Gerilme yoğunlaşma faktörü (Kt) neye bağlıdır?",
      options: [
        "Yalnızca malzemenin rengine bağlıdır",
        "Yalnızca malzemenin ağırlığına bağlı",
        "Yalnızca malzemenin fiyatına bağlıdır",
        "Çentiğin geometrisi ve yarıçapına",
      ],
      correctAnswer: 3,
      explanation:
        "Keskin köşe ve küçük geçiş yarıçapı faktörü büyütür; yarıçap artırıldığında yerel gerilme belirgin düşer. Bu yüzden mil çap geçişleri yumuşak kavisle yapılır.",
      category: "Makine Elemanları",
    },
    {
      id: 243,
      question: "Yüzey işlemi yorulma dayanımını nasıl etkiler?",
      options: [
        "Pürüzsüz ve basınçlı yüzey dayanımı artırır",
        "Yalnızca yüzey işleminin hiç etkisi yoktur",
        "Yalnızca yüzey pürüzlülüğü dayanımı artırır",
        "Yalnızca boyama dayanımı belirgin artırır",
      ],
      correctAnswer: 0,
      explanation:
        "Çatlak neredeyse her zaman yüzeyden başlar; taşlama, parlatma ve bilyalı dövme ile bırakılan basma kalıntı gerilmesi ömrü belirgin uzatır.",
      category: "Makine Elemanları",
    },
    {
      id: 244,
      question: "Korozyon yorulma dayanımını nasıl etkiler?",
      options: [
        "Yalnızca dayanımı belirgin artırmaktadır",
        "Yorulma sınırını ortadan kaldırabilir",
        "Yalnızca dayanımı sabit tutmaktadır",
        "Yalnızca dayanımın ölçümünü kolaylaştırır",
      ],
      correctAnswer: 1,
      explanation:
        "Korozif ortamda yüzeyde sürekli yeni çentikler oluşur; eğrideki yatay bölge kaybolur ve düşük genliklerde bile ömür sınırlı hâle gelir.",
      category: "Makine Elemanları",
    },
    {
      id: 245,
      question: "Torsiyonel titreşim şaft hattında nasıl doğar?",
      options: [
        "Yalnızca dış hava akımıyla doğmaktadır",
        "Yalnızca dalgaların vurmasıyla doğar",
        "Silindir ve pervane momentinin salınımıyla",
        "Yalnızca yatak sürtünmesiyle doğmaktadır",
      ],
      correctAnswer: 2,
      explanation:
        "Her ateşleme ve her pervane kanat geçişi momentte periyodik dalgalanma yaratır; bu dalgalanma şaft hattını burulma modlarında salındırır.",
      category: "Makine Elemanları",
    },
    {
      id: 246,
      question: "Barred speed range (yasak devir bandı) nedir?",
      options: [
        "Yalnızca en yüksek verim bandıdır",
        "Yalnızca manevra devir bandıdır",
        "Yalnızca en düşük yakıt bandıdır",
        "Sürekli çalışılması yasak devir aralığı",
      ],
      correctAnswer: 3,
      explanation:
        "Burulma rezonansının genliği kabul sınırını aştığı devir aralığında sürekli çalışmak yasaklanır; takometrede kırmızı bantla işaretlenir ve hızla geçilir.",
      category: "Makine Elemanları",
    },
    {
      id: 247,
      question: "Yasak devir bandından nasıl geçilir?",
      options: [
        "Hızlı geçilir, bantta durulmaz",
        "Yalnızca bantta bir süre beklenir",
        "Yalnızca bantta devir sabitlenir",
        "Yalnızca bantta yük artırılır",
      ],
      correctAnswer: 0,
      explanation:
        "Devir bandın içinden hızlıca geçirilir; bant içinde çalışmak şaftta yorulma çatlağı, kaplin hasarı ve dişli diş kırılması riskini hızla büyütür.",
      category: "Makine Elemanları",
    },
    {
      id: 248,
      question: "Torsiyonel titreşim ölçümü ne zaman yapılır?",
      options: [
        "Yalnızca gemi hurdaya ayrılırken yapılır",
        "Deneme seyrinde ve şaft değişiminde",
        "Yalnızca her liman girişinde yapılır",
        "Yalnızca her vardiya değişiminde yapılır",
      ],
      correctAnswer: 1,
      explanation:
        "Ölçüm ilk deneme seyrinde yapılır ve hesapla doğrulanır; pervane, kaplin veya makine değişimi gibi hattın burulma özelliğini değiştiren işlerden sonra yinelenir.",
      category: "Makine Elemanları",
    },
    {
      id: 249,
      question: "Aksiyel (boyuna) titreşim şaft hattında neyi salındırır?",
      options: [
        "Yalnızca şaftı dönme yönünde salındırır",
        "Yalnızca şaftı yanal yönde salındırır",
        "Şaftı ekseni boyunca ileri geri salındırır",
        "Yalnızca pervaneyi yerinde döndürmekte",
      ],
      correctAnswer: 2,
      explanation:
        "Pervanenin ürettiği itme dalgalanır ve şaft hattını kendi ekseni boyunca esnetir; salınım trust yatak ve makine gövdesi üzerinden tekneye aktarılır.",
      category: "Makine Elemanları",
    },
    {
      id: 250,
      question: "Aksiyel titreşimin en çok zorladığı eleman hangisidir?",
      options: [
        "Yalnızca pervane kanatlarıdır",
        "Yalnızca dümen yelpazesidir",
        "Yalnızca ara şaft yataklarıdır",
        "Trust yatak ve gövde bağlantısı",
      ],
      correctAnswer: 3,
      explanation:
        "Eksenel salınım doğrudan baskı yatağına biner; segman yorulması, cıvata gevşemesi ve tekne yapısında yerel titreşim bu yolla ortaya çıkar.",
      category: "Makine Elemanları",
    },
    {
      id: 251,
      question: "Aksiyel titreşim nasıl azaltılır?",
      options: [
        "Sönümleyici damper veya yay ile",
        "Yalnızca pervane çapı büyütülerek",
        "Yalnızca şaft boyu uzatılarak",
        "Yalnızca yakıt debisi artırılarak",
      ],
      correctAnswer: 0,
      explanation:
        "Trust yatağına eklenen eksenel damper enerjiyi yutar ve rezonans genliğini düşürür; ayrıca pervane kanat sayısı ile şaft rijitliği tasarımda ayarlanır.",
      category: "Makine Elemanları",
    },
    {
      id: 252,
      question: "Aksiyel titreşim rezonansı hangi durumda ortaya çıkar?",
      options: [
        "Yalnızca gemi demirdeyken ortaya çıkar",
        "Uyarma frekansı doğal frekansa yaklaşınca",
        "Yalnızca makine durdurulunca ortaya çıkar",
        "Yalnızca deniz sakin olunca ortaya çıkar",
      ],
      correctAnswer: 1,
      explanation:
        "Kanat geçiş frekansı sistemin doğal eksenel frekansına yaklaşınca genlik hızla büyür; bu yüzden hesapta rezonans devri işletme bandının dışına itilir.",
      category: "Makine Elemanları",
    },
    {
      id: 253,
      question: "Lateral (yanal) titreşim şaftta neyi ifade eder?",
      options: [
        "Yalnızca şaftın uzayıp kısalmasını",
        "Yalnızca şaftın burulmasını ifade eder",
        "Şaftın kendi ekseninden savrulmasını",
        "Yalnızca şaftın ısınmasını ifade eder",
      ],
      correctAnswer: 2,
      explanation:
        "Dengesizlik ve eğilme esnekliği nedeniyle dönen şaft merkez ekseninden sapıp fırıldak gibi savrulur; yataklarda değişken radyal yük doğar.",
      category: "Makine Elemanları",
    },
    {
      id: 254,
      question: "Şaft hattında kritik hız (critical speed) ne demektir?",
      options: [
        "Yalnızca en yüksek verim devridir",
        "Yalnızca en düşük yakıt devridir",
        "Yalnızca manevra için kullanılan devir",
        "Doğal frekansla çakışan dönme devri",
      ],
      correctAnswer: 3,
      explanation:
        "Dönme frekansı sistemin doğal eğilme frekansına eşitlendiğinde genlik hızla büyür; bu devirde uzun süre çalışmak yatak ve şaft hasarına yol açar.",
      category: "Makine Elemanları",
    },
    {
      id: 255,
      question: "Lateral titreşimi azaltmanın yolu nedir?",
      options: [
        "Balans ve yatak açıklığı düzeltmesi",
        "Yalnızca şaft boyunu uzatmaktır",
        "Yalnızca yağ viskozitesini düşürmek",
        "Yalnızca pervane hatvesini artırmak",
      ],
      correctAnswer: 0,
      explanation:
        "Dinamik balans dengesizliği azaltır; yatak açıklığı, yatak sayısı ve destek rijitliği ayarlanarak doğal frekans işletme bandının dışına taşınır.",
      category: "Makine Elemanları",
    },
    {
      id: 256,
      question: "Şaft titreşimi izlemede hangi ölçüm kullanılır?",
      options: [
        "Yalnızca sıcaklık ölçümü kullanılır",
        "Titreşim genliği ve spektrum analizi",
        "Yalnızca yağ seviyesi ölçümü kullanılır",
        "Yalnızca yakıt debisi ölçümü kullanılır",
      ],
      correctAnswer: 1,
      explanation:
        "İvmeölçer veya yer değiştirme probu ile alınan sinyal frekans bileşenlerine ayrılır; 1× bileşeni dengesizliği, 2× bileşeni eksen kaçıklığını işaret eder.",
      category: "Makine Elemanları",
    },
    {
      id: 257,
      question: "Örtülü elektrot ark kaynağında (SMAW) örtünün görevi nedir?",
      options: [
        "Yalnızca elektrodu ağırlaştırmaktır",
        "Yalnızca elektrodu renklendirmektir",
        "Koruyucu gaz ve cüruf oluşturmaktır",
        "Yalnızca elektrodu sertleştirmektir",
      ],
      correctAnswer: 2,
      explanation:
        "Yanan örtü koruyucu gaz üretip erimiş banyoyu havadan ayırır, cüruf oluşturarak yavaş soğumayı sağlar ve banyoya alaşım elementi katar.",
      category: "Makine Elemanları",
    },
    {
      id: 258,
      question: "SMAW elektrotları neden kurutulur?",
      options: [
        "Yalnızca ağırlıklarını azaltmak içindir",
        "Yalnızca renklerini korumak içindir",
        "Yalnızca ambalajı açmak içindir",
        "Nemin hidrojen çatlağı yapmaması için",
      ],
      correctAnswer: 3,
      explanation:
        "Örtüdeki nem ark içinde hidrojene ayrışır; kaynak metalinde çözünen hidrojen soğuma sonrası gecikmeli çatlak yapar. Bazik elektrotlar fırında tutulur.",
      category: "Makine Elemanları",
    },
    {
      id: 259,
      question: "SMAW'de akım şiddeti çok yüksek seçilirse ne olur?",
      options: [
        "Aşırı sıçrama ve yanma oluğu oluşur",
        "Yalnızca dikiş çok dar kalmaktadır",
        "Yalnızca nüfuziyet tümüyle azalır",
        "Yalnızca ark sönmeye başlamaktadır",
      ],
      correctAnswer: 0,
      explanation:
        "Yüksek akım banyoyu aşırı ısıtır; kenarda yanma oluğu, aşırı sıçrama ve iri taneli gevrek yapı oluşur. Düşük akımda ise yetersiz nüfuziyet görülür.",
      category: "Makine Elemanları",
    },
    {
      id: 260,
      question: "Ark kaynağında kök paso neden önemlidir?",
      options: [
        "Yalnızca dikişin görünümünü belirler",
        "Bağlantının nüfuziyetini belirlemektedir",
        "Yalnızca elektrot tüketimini belirler",
        "Yalnızca kaynak süresini belirlemektedir",
      ],
      correctAnswer: 1,
      explanation:
        "Kök pasoda oluşan yetersiz erime veya nüfuziyet, üst pasolarla kapatılsa bile bağlantının taşıma gücünü düşürür ve çatlak başlangıcı olur.",
      category: "Makine Elemanları",
    },
    {
      id: 261,
      question: "MIG/MAG kaynağında koruyucu gazın işlevi nedir?",
      options: [
        "Yalnızca teli ısıtmakla görevlidir",
        "Yalnızca teli soğutmakla görevlidir",
        "Banyoyu havadan yalıtmakla görevlidir",
        "Yalnızca teli boyamakla görevlidir",
      ],
      correctAnswer: 2,
      explanation:
        "Argon veya karbondioksit karışımı erimiş banyoyu oksijen ve azottan korur; koruma bozulursa gözeneklilik ve gevrek yapı oluşur.",
      category: "Makine Elemanları",
    },
    {
      id: 262,
      question: "TIG kaynağının belirgin özelliği nedir?",
      options: [
        "Yalnızca çok hızlı bir yöntem olması",
        "Yalnızca kalın sacda kullanılabilmesi",
        "Yalnızca cüruf üretmesi durumudur",
        "Erimeyen tungsten elektrot kullanması",
      ],
      correctAnswer: 3,
      explanation:
        "TIG'de ark erimeyen tungsten elektrottan çıkar, dolgu metali ayrı verilir; çok temiz dikiş sağlar ama yavaş ve ustalık gerektiren bir yöntemdir.",
      category: "Makine Elemanları",
    },
    {
      id: 263,
      question: "MAG gazaltı kaynağı hangi malzemede kullanılır?",
      options: [
        "Karbon ve düşük alaşımlı çeliklerde",
        "Yalnızca alüminyum malzemelerde",
        "Yalnızca bakır malzemelerde kullanılır",
        "Yalnızca plastik malzemelerde kullanılır",
      ],
      correctAnswer: 0,
      explanation:
        "MAG aktif gaz kullanır ve çelik kaynağında yaygındır; alüminyum ve paslanmaz için saf argonlu MIG veya TIG tercih edilir.",
      category: "Makine Elemanları",
    },
    {
      id: 264,
      question: "Gazaltı kaynağında gaz debisi yetersizse ne olur?",
      options: [
        "Yalnızca dikiş çok geniş olmaktadır",
        "Dikişte gözeneklilik oluşmaktadır",
        "Yalnızca tel tüketimi azalmaktadır",
        "Yalnızca akım kendiliğinden düşer",
      ],
      correctAnswer: 1,
      explanation:
        "Koruma yetersiz kalınca hava banyoya karışır ve katılaşan metalde gaz boşlukları kalır; rüzgârlı ortamda paravan kullanmak da bu yüzden zorunludur.",
      category: "Makine Elemanları",
    },
    {
      id: 265,
      question: "Köşe kaynağı hesabında hangi kesit kullanılır?",
      options: [
        "Yalnızca dikişin dış yüzey alanı",
        "Yalnızca dikişin toplam hacmi",
        "Boğaz kalınlığı ile dikiş boyu çarpımı",
        "Yalnızca sacın kalınlık değeri",
      ],
      correctAnswer: 2,
      explanation:
        "Taşıma kapasitesi, dikiş kesitinin en dar yeri olan boğaz kalınlığı üzerinden hesaplanır; boğaz kalınlığı genelde dikiş bacağının 0,7 katı alınır.",
      category: "Makine Elemanları",
    },
    {
      id: 266,
      question: "Alın kaynağında tam nüfuziyet ne sağlar?",
      options: [
        "Yalnızca kaynak süresini kısaltmaktadır",
        "Yalnızca elektrot tüketimini azaltmakta",
        "Yalnızca dikiş görünümünü düzeltmekte",
        "Ana metalin tüm kesitinin taşımasını",
      ],
      correctAnswer: 3,
      explanation:
        "Tam nüfuziyetli alın dikişinde bağlantı, ana metalle aynı kesitte yük taşır; bu yüzden hesapta ayrı bir dikiş kesiti kullanmaya gerek kalmaz.",
      category: "Makine Elemanları",
    },
    {
      id: 267,
      question: "Kaynak dikişi hesabında hangi gerilme türü kontrol edilir?",
      options: [
        "Normal ve kayma gerilmelerinin bileşkesi",
        "Yalnızca sıcaklık gerilmesi kontrol edilir",
        "Yalnızca basınç gerilmesi kontrol edilir",
        "Yalnızca ağırlık gerilmesi kontrol edilir",
      ],
      correctAnswer: 0,
      explanation:
        "Dikiş kesitindeki normal ve kayma bileşenleri birlikte değerlendirilir; eşdeğer gerilme, kaynak metali için izin verilen değerin altında kalmalıdır.",
      category: "Makine Elemanları",
    },
    {
      id: 268,
      question: "Kaynakta ısı tesiri altındaki bölge (ITAB) nedir?",
      options: [
        "Yalnızca erimiş kaynak metalinin kendisi",
        "Erimeyen ama yapısı değişen ana metal",
        "Yalnızca dikişin dış yüzeyi bölgesidir",
        "Yalnızca cürufun kaldığı bölgedir",
      ],
      correctAnswer: 1,
      explanation:
        "Kaynak ısısı komşu bölgede tane büyümesi ve sertleşme yaratır; bağlantının en gevrek ve çatlağa en yatkın kısmı çoğunlukla bu bölgedir.",
      category: "Makine Elemanları",
    },
    {
      id: 269,
      question: "Kaynakta gözeneklilik (porosity) hatası neden oluşur?",
      options: [
        "Yalnızca akımın çok düşük olmasından",
        "Yalnızca elektrodun çok kalın olmasından",
        "Nem, kir veya yetersiz gaz korumasından",
        "Yalnızca kaynak hızının çok düşmesinden",
      ],
      correctAnswer: 2,
      explanation:
        "Banyoda çözünen gaz katılaşırken kaçamaz ve boşluk bırakır; yüzeyin yağ, pas ve nemden arındırılması ile doğru gaz debisi bu hatayı önler.",
      category: "Makine Elemanları",
    },
    {
      id: 270,
      question: "Yanma oluğu (undercut) hatası nasıl tanımlanır?",
      options: [
        "Yalnızca dikiş üstündeki fazla dolgudur",
        "Yalnızca dikiş içindeki cüruf kalıntısıdır",
        "Yalnızca kök tarafındaki taşma bölgesidir",
        "Dikiş kenarında oluşan çentik oyuğudur",
      ],
      correctAnswer: 3,
      explanation:
        "Aşırı akım veya yanlış elektrot açısıyla ana metal eriyip yerine dolgu gelmez; oluşan oyuk keskin bir çentik gibi davranır ve yorulma çatlağı başlatır.",
      category: "Makine Elemanları",
    },
    {
      id: 271,
      question: "Görsel muayene (VT) kaynak kontrolünde neyi yakalar?",
      options: [
        "Yüzey hatalarını ve dikiş geometrisini",
        "Yalnızca iç gözenekleri yakalayabilir",
        "Yalnızca derin çatlakları yakalayabilir",
        "Yalnızca malzeme bileşimini yakalar",
      ],
      correctAnswer: 0,
      explanation:
        "Görsel muayene yanma oluğu, taşma, hizasızlık, yüzey gözeneği ve dikiş boyutlarını denetler; en ucuz ve ilk uygulanan yöntemdir ama iç hataları göremez.",
      category: "Makine Elemanları",
    },
    {
      id: 272,
      question: "Kaynak hatalarından hangisi en tehlikeli sayılır?",
      options: [
        "Yalnızca hafif yüzey sıçrantısı sayılır",
        "Keskin uçlu çatlak en tehlikeli sayılır",
        "Yalnızca dikiş renginin değişimi sayılır",
        "Yalnızca dikişin biraz geniş olması",
      ],
      correctAnswer: 1,
      explanation:
        "Çatlak keskin uçludur ve gerilme yoğunlaşmasını en yüksek düzeye çıkarır; yük altında hızla ilerler, bu yüzden kabul edilebilir sınırı yoktur.",
      category: "Makine Elemanları",
    },
    {
      id: 273,
      question: "Radyografik muayene (RT) hangi hatayı en iyi gösterir?",
      options: [
        "Yalnızca yüzeydeki ince çatlakları",
        "Yalnızca yüzey pürüzlülüğünü gösterir",
        "Hacimsel gözenek ve cüruf kalıntısını",
        "Yalnızca malzeme sertliğini göstermekte",
      ],
      correctAnswer: 2,
      explanation:
        "Işın yoğunluk farkını filme yansıttığından boşluk ve kalıntı iyi görünür; buna karşılık ışına dik ince çatlaklar kolayca gözden kaçabilir.",
      category: "Makine Elemanları",
    },
    {
      id: 274,
      question: "Ultrasonik muayene (UT) hangi üstünlüğü sağlar?",
      options: [
        "Yalnızca ışın güvenliği gerektirmemesi",
        "Yalnızca sonucun anında filme düşmesi",
        "Yalnızca yüzey hatalarını görebilmesi",
        "Derin hatanın konumunu verebilmesi",
      ],
      correctAnswer: 3,
      explanation:
        "Yansıyan sesin dönüş süresi hatanın derinliğini verir; tek yüzeyden erişim yeterlidir ve kalın kesitlerde radyografiye göre daha duyarlıdır.",
      category: "Makine Elemanları",
    },
    {
      id: 275,
      question: "Girdap akımı (ET) muayenesi nerede kullanılır?",
      options: [
        "İletken malzemede yüzey ve boru kontrolünde",
        "Yalnızca plastik malzemelerin kontrolünde",
        "Yalnızca beton yapıların kontrolünde",
        "Yalnızca ahşap yapıların kontrolünde",
      ],
      correctAnswer: 0,
      explanation:
        "Bobinin ürettiği girdap akımları süreksizlikte bozulur; yöntem ısı değiştirici boru içi taraması ve iletken yüzey çatlağı aramasında yaygın kullanılır.",
      category: "Makine Elemanları",
    },
    {
      id: 276,
      question: "Tahribatsız muayene yöntemi seçilirken hangi ölçüt belirleyicidir?",
      options: [
        "Yalnızca yöntemin maliyeti belirleyicidir",
        "Hata tipi, konumu ve malzeme cinsi",
        "Yalnızca personelin tercihi belirleyicidir",
        "Yalnızca cihazın ağırlığı belirleyicidir",
      ],
      correctAnswer: 1,
      explanation:
        "Yüzey hatası için penetrant veya manyetik parçacık, hacimsel hata için radyografi veya ultrason seçilir; malzemenin manyetik olup olmadığı da belirleyicidir.",
      category: "Makine Elemanları",
    },
    {
      id: 277,
      question: "Cıvata bağlantısında ön gerilmenin işlevi nedir?",
      options: [
        "Yalnızca cıvatayı ağırlaştırmaktır",
        "Yalnızca cıvatayı boyamak işlevidir",
        "Gevşemeyi ve ayrılmayı engellemektir",
        "Yalnızca cıvatayı soğutmak işlevidir",
      ],
      correctAnswer: 2,
      explanation:
        "Sıkma ile oluşan ön gerilme parçaları birbirine bastırır; dış yük geldiğinde cıvatadaki gerilme değişimi küçük kalır ve yorulma ile gevşeme riski düşer.",
      category: "Makine Elemanları",
    },
    {
      id: 278,
      question: "Cıvata sıkma torku neden kontrollü uygulanır?",
      options: [
        "Yalnızca montaj süresini kısaltmak için",
        "Yalnızca anahtar ömrünü uzatmak için",
        "Yalnızca cıvata rengini korumak için",
        "Doğru ön gerilmeyi sağlayabilmek için",
      ],
      correctAnswer: 3,
      explanation:
        "Az sıkma bağlantıyı gevşetir, aşırı sıkma cıvatayı akma sınırının ötesine taşır; kritik bağlantılarda uzama ölçümü veya hidrolik gerdirme kullanılır.",
      category: "Makine Elemanları",
    },
    {
      id: 279,
      question: "Cıvata sınıfı 8.8 neyi ifade eder?",
      options: [
        "Çekme dayanımı ve akma oranını",
        "Yalnızca cıvatanın çap ölçüsünü",
        "Yalnızca cıvatanın diş adımını",
        "Yalnızca cıvatanın baş biçimini",
      ],
      correctAnswer: 0,
      explanation:
        "İlk sayı çekme dayanımının yüzde biri, ikinci sayı akmanın çekmeye oranının onda biridir; 8.8 cıvata yaklaşık 800 MPa çekme dayanımı taşır.",
      category: "Makine Elemanları",
    },
    {
      id: 280,
      question: "Perçin bağlantısının kaynağa göre bir üstünlüğü nedir?",
      options: [
        "Yalnızca daha hızlı uygulanabilmesi",
        "Isı tesiri bölgesi oluşturmaması",
        "Yalnızca daha hafif olması durumu",
        "Yalnızca daha ucuz olması durumu",
      ],
      correctAnswer: 1,
      explanation:
        "Perçinleme ısı girdisi yaratmadığından malzeme yapısı ve kalıntı gerilme durumu değişmez; ayrıca çatlak ilerlemesi perçin deliğinde durabilir.",
      category: "Makine Elemanları",
    },
  ],
};
