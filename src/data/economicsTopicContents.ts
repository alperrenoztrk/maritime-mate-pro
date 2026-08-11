import type { TopicDetailContent } from "@/data/navigationTopicContents";

/**
 * Deniz İşletmeciliğinde Ticari Operasyonlar — "Dersler Beta" konu anlatımı.
 *
 * İçerik gerçek ticari denizcilik kavramlarına dayanır (charter party türleri,
 * laytime/demurrage, TCE, sefer ekonomisi, konşimento, deniz sigortası, genel
 * avarya). `TopicSection.title` değerleri lessonFlow/economics.ts ile eşleşir.
 */
export const economicsTopicContents: Record<string, TopicDetailContent> = {
  "Çarter Türleri ve Charter Party": {
    title: "Çarter Türleri ve Charter Party",
    introduction:
      "Bir geminin ticari olarak kiralanması, taraflar arasındaki bir sözleşmeyle (charter party) düzenlenir. Çarter türü; maliyetlerin, risklerin ve operasyonel kontrolün armatör (shipowner) ile kiracı (charterer) arasında nasıl paylaşılacağını belirler. Doğru çarter türünü anlamak, ticari kararların ve sorumlulukların temelidir.",
    sections: [
      {
        title: "Sefer Çarteri (Voyage Charter)",
        content:
          "Sefer çarterinde armatör, belirli bir yükü bir limandan diğerine taşımayı taahhüt eder ve karşılığında navlun (freight) alır. Geminin tüm işletme ve sefer maliyetleri (yakıt, liman, kanal, mürettebat) armatöre aittir; kiracı yalnızca taşıma hizmetini satın alır. Yükleme/boşaltma için tanınan süre (laytime) ve aşımında ödenecek demurrage sözleşmede yer alır. Sefer çarteri, tek seferlik veya belirli yük hareketleri için yaygındır; armatör operasyonel kontrolü elinde tutar.",
        image: "/diagrams/economics/carter-turleri.svg",
        imageAlt: "Voyage, time and bareboat charters compared by who bears which cost",
      },
      {
        title: "Zaman Çarteri (Time Charter)",
        content:
          "Zaman çarterinde kiracı, gemiyi belirli bir süre için (örn. 6 ay, 2 yıl) kiralar ve karşılığında kira (hire) öder. Armatör gemiyi denize elverişli (seaworthy) ve donanımlı/mürettebatlı sağlar; sabit işletme maliyetlerini (mürettebat, bakım, sigorta) karşılar. Ancak sefer değişken maliyetleri (yakıt, liman, kanal ücretleri) kiracıya aittir ve kiracı geminin ticari kullanımını (hangi yük, hangi liman) yönlendirir. Off-hire durumunda (gemi arıza/kusur nedeniyle hizmet veremezse) kira durur.",
      },
      {
        title: "Çıplak Çarter (Bareboat / Demise Charter)",
        content:
          "Çıplak çarterde (bareboat / demise) kiracı, gemiyi mürettebatsız ve donanımsız olarak kiralar; geminin işletmesini, mürettebatını ve neredeyse tüm maliyet ve sorumluluklarını üstlenir. Kiracı bu süre boyunca fiilen 'disponent owner' (işleten) gibi davranır. Bareboat, uzun vadeli finansman/leasing yapılarında ve filo işletme stratejilerinde kullanılır. Armatör yalnızca gemi mülkiyetini elinde tutar; operasyonel risk büyük ölçüde kiracıya geçer.",
      },
      {
        title: "Navlun Mukavelesi (Contract of Affreightment)",
        content:
          "Navlun mukavelesi (Contract of Affreightment, COA), belirli bir gemiye değil, belirli bir dönemde belirli miktarda yükün taşınması taahhüdüne dayanır. Armatör/operatör, sözleşmedeki yük partilerini uygun gemilerle (kendi veya kiralanmış) taşır. COA, büyük ve düzenli yük akışı olan tarafların (örn. madenci, enerji şirketi) lojistiğini güvence altına alırken operatöre gemi seçiminde esneklik tanır. Fiyat genellikle ton başına navlun olarak belirlenir.",
      },
    ],
    keyPoints: [
      "Voyage charter: armatör yükü taşır, navlun alır, tüm sefer maliyetlerini üstlenir.",
      "Time charter: kiracı süreyle kiralar, hire öder; yakıt/liman kiracıya, sabit maliyet armatöre.",
      "Bareboat: kiracı gemiyi mürettebatsız alır, işletme ve riskin neredeyse tamamını üstlenir.",
      "COA: belirli dönemde belirli miktar yük taşıma taahhüdü; gemi seçiminde esneklik sağlar.",
    ],
  },

  "Navlun ve Gelir": {
    title: "Navlun ve Gelir",
    introduction:
      "Navlun (freight), bir yükün taşınması karşılığında ödenen bedeldir ve armatörün/operatörün temel gelir kalemidir. Navlunun hesaplanma biçimi, ödeme koşulları ve piyasa referansları, sefer ekonomisinin gelir tarafını oluşturur.",
    sections: [
      {
        title: "Navlun Hesabı: Ton Başına ve Lumpsum",
        content:
          "Navlun iki temel biçimde belirlenir. Ton başına navlunda toplam gelir, taşınan yük miktarı ile birim navlun oranının çarpımıdır: Navlun = Yük (ton) × Oran ($/ton). Lumpsum (götürü) navlunda ise, taşınan miktardan bağımsız olarak geminin tamamı veya belirli bir kapasite için sabit bir tutar ödenir; bu, yük miktarının belirsiz olduğu veya geminin tam kapasite kullanılamadığı durumlarda armatörü korur. Sözleşme, hangi miktarın (yüklenen mi, boşaltılan mı) esas alınacağını ve toleransları belirtir.",
        image: "/diagrams/economics/carter-turleri.svg",
        imageAlt: "How the owner is paid under each charter type: freight against hire",
        formula: {
          text: "Navlun = Yük (ton) × Oran ($/ton)  ·  veya  Lumpsum (sabit tutar)",
          description: "Ton başına navlun yük miktarına bağlıdır; lumpsum miktardan bağımsız sabittir",
        },
      },
      {
        title: "Ödeme Koşulları ve Riskler",
        content:
          "Navlunun ne zaman ve hangi koşulda ödeneceği sözleşmede belirlenir: 'freight prepaid' (yükleme/konşimento anında peşin) veya 'freight collect/payable on delivery' (varışta). Peşin navlunda 'freight earned, discountless and non-returnable' gibi ifadeler, yük/gemi kaybolsa bile navlunun iade edilmeyeceğini düzenleyebilir. Ödenmeyen navlun için armatörün yük üzerinde hapis hakkı (lien) bulunabilir. Döviz kuru, ödeme gecikmesi ve karşı taraf (kredi) riski gelir tahsilatını etkiler.",
      },
      {
        title: "Piyasa Referansları: Worldscale ve Endeksler",
        content:
          "Tanker piyasasında navlun çoğunlukla Worldscale adlı standart bir referans tarifeyle ifade edilir: belirli bir güzergâh için 'WS 100' nominal bir orana karşılık gelir ve gerçek anlaşma 'WS 75' veya 'WS 150' gibi bu nominalin yüzdesi olarak belirtilir. Kuru dökme yük piyasasında ise Baltic Exchange endeksleri (örn. BDI ve alt endeksler) ve rota bazlı oranlar referans alınır. Bu referanslar, farklı sefer ve gemilerin getirilerini karşılaştırılabilir kılar.",
      },
      {
        title: "Brüt Gelir ve Komisyonlar",
        content:
          "Brüt navlun gelirinden çeşitli komisyonlar düşülür. Broker komisyonu (gemi ve yük brokerlerine), adres komisyonu (address commission — kiracıya iade edilen bir indirim) gibi kalemler sözleşmede yüzde olarak tanımlanır. Net gelir, bu komisyonlar ve varsa diğer kesintiler düşüldükten sonra armatöre kalan tutardır. Ticari değerlendirmede daima net getiri (komisyon sonrası) esas alınır; brüt rakam yanıltıcı olabilir.",
      },
    ],
    keyPoints: [
      "Navlun = Yük × Oran ($/ton) ya da lumpsum (miktardan bağımsız sabit tutar).",
      "Ödeme 'prepaid' veya 'collect' olabilir; ödenmeyen navlunda yük üzerinde lien doğabilir.",
      "Tankerde Worldscale (WS%), kuru yükte Baltic endeksleri referans alınır.",
      "Brüt gelirden broker/adres komisyonları düşülür; karar net getiriye göre verilir.",
    ],
  },

  "Laytime, Demurrage ve Despatch": {
    title: "Laytime, Demurrage ve Despatch",
    introduction:
      "Sefer çarterinde, yükleme ve boşaltma için kiracıya tanınan süre 'laytime'dır. Bu sürenin aşılması armatöre tazminat (demurrage), erken bitirilmesi ise kiracıya prim (despatch) doğurur. Laytime hesabı, sefer çarteri uyuşmazlıklarının en yaygın konusudur ve dikkatli kayıt gerektirir.",
    sections: [
      {
        title: "Laytime Kavramı ve Başlangıcı",
        content:
          "Laytime, kiracının yükleme/boşaltmayı demurrage'a girmeden tamamlaması için sözleşmede belirlenen süredir (örn. 72 saat veya günlük belirli ton). Laytime, geminin hazır olduğunu bildiren 'Notice of Readiness' (NOR) geçerli şekilde verildikten ve sözleşmedeki bekleme süresi (örn. 'NOR'dan 6 saat sonra') geçtikten sonra işlemeye başlar. NOR'un geçerliliği için geminin her bakımdan hazır (yanaşmış veya 'whether in berth or not' koşuluyla) ve gerekli serbestlik/onayları almış olması gerekir.",
        image: "/diagrams/economics/laytime-demurrage.svg",
        imageAlt: "Laytime timeline from NOR to completion, with demurrage and despatch",
      },
      {
        title: "Laytime Sayımı ve İstisnalar",
        content:
          "Laytime, sözleşmedeki tanıma göre sayılır: 'running days', 'working days', 'weather working days' (hava elverişsizse sayılmaz) gibi. Sözleşme, belirli sürelerin laytime'dan hariç tutulmasını öngörebilir: tatiller, geceler ('SHEX' — Sundays and Holidays Excepted), kötü hava, grev, kiracının kontrolü dışındaki gecikmeler. Bu istisnalar, gerçek olaylar belgesi (Statement of Facts) ve liman zaman çizelgesiyle (time sheet) titizlikle kaydedilir; uyuşmazlıkların çoğu bu sayımdan kaynaklanır.",
      },
      {
        title: "Demurrage (Sürastarya)",
        content:
          "Laytime aşılırsa, aşan süre için kiracı armatöre demurrage öder; bu, sözleşmede günlük (örn. $/gün) olarak belirlenen bir orandır. Demurrage, geminin atıl kalmasından doğan armatör kaybının önceden kararlaştırılmış tazminatıdır. 'Once on demurrage, always on demurrage' ilkesi gereği, demurrage başladıktan sonra çoğu laytime istisnası (tatil, hava) artık süreyi durdurmaz — meğer ki sözleşme açıkça aksini öngörsün. Demurrage hesabı: aşan süre × günlük oran.",
        formula: {
          text: "Demurrage = (Kullanılan süre − Laytime) × Günlük oran",
          description: "Laytime'ı aşan süre için günlük orandan ödenen tazminat (aşım pozitifse)",
        },
      },
      {
        title: "Despatch (Dispeç)",
        content:
          "Yükleme/boşaltma laytime'dan önce tamamlanırsa, tasarruf edilen süre için armatör kiracıya despatch (prim) ödeyebilir; bu genellikle demurrage oranının yarısıdır. İki yaygın hesap esası vardır: 'despatch on all time saved' (tasarruf edilen tüm zaman) veya 'despatch on laytime saved' (yalnızca laytime olarak sayılan tasarruf). Despatch, kiracıyı hızlı operasyona teşvik eder. Despatch hesabı: tasarruf edilen süre × despatch oranı.",
      },
    ],
    keyPoints: [
      "Laytime, yükleme/boşaltma için tanınan süredir; geçerli NOR sonrası işlemeye başlar.",
      "Sayım türü (weather working days vb.) ve istisnalar (SHEX, hava) Statement of Facts'e kaydedilir.",
      "Demurrage = aşan süre × günlük oran; 'once on demurrage, always on demurrage'.",
      "Despatch (genelde demurrage'ın yarısı), laytime'dan erken bitirmenin primidir.",
    ],
  },

  "Time Charter Equivalent (TCE) ve Sefer Ekonomisi": {
    title: "Time Charter Equivalent (TCE) ve Sefer Ekonomisi",
    introduction:
      "Farklı seferlerin (örn. bir voyage charter ile bir time charter) kârlılığını karşılaştırmak için ortak bir ölçüye ihtiyaç vardır. Time Charter Equivalent (TCE), bir seferin getirisini 'günlük net kazanç' olarak ifade ederek bu karşılaştırmayı sağlar ve ticari karar vermenin temel aracıdır.",
    sections: [
      {
        title: "Sefer Süresi ve Mesafe",
        content:
          "Sefer ekonomisinin temeli, sefer süresinin doğru tahminidir. Seyir süresi, mesafenin hıza bölünmesiyle bulunur: Süre (gün) = Mesafe (nm) / (Hız (kn) × 24). Buna yükleme, boşaltma, bekleme, kanal geçişi ve hava payları eklenerek toplam sefer süresi elde edilir. Hız seçimi kritiktir: yüksek hız süreyi kısaltır ama yakıt tüketimini (yaklaşık hızın küpüyle) artırır; bu 'speed-fuel' dengesi, optimum ekonomik hızı (ve 'slow steaming' kararlarını) belirler.",
        image: "/diagrams/economics/maliyet-yapisi-tce.svg",
        imageAlt: "Time charter equivalent formula and the cost layers it does and does not include",
        formula: {
          text: "Süre (gün) = Mesafe (nm) / (Hız (kn) × 24)",
          description: "Seyir süresi; toplam sefer süresi için liman/bekleme/kanal süreleri eklenir",
        },
      },
      {
        title: "Sefer Geliri ve Maliyetleri",
        content:
          "Sefer geliri esas olarak navlundur (artı varsa demurrage geliri). Sefer maliyetleri ise yola özgü değişken kalemlerdir: bunker (yakıt) maliyeti, liman ücretleri, kanal geçiş ücretleri (örn. Süveyş, Panama), kılavuzluk/römorkör, acente ve diğer sefer harcamaları. Net sefer sonucu (voyage result), gelirden sefer maliyetleri düşülerek bulunur. Bu hesapta günlük işletme maliyeti (OPEX) henüz düşülmez; o ayrı değerlendirilir (TCE ile karşılaştırılır).",
      },
      {
        title: "TCE Hesabı",
        content:
          "TCE, sefer net gelirinin (navlun − sefer maliyetleri) toplam sefer gün sayısına bölünmesiyle bulunur: TCE = (Navlun geliri − Sefer maliyetleri) / Sefer günü. Sonuç, geminin o seferden günde ne kadar net kazandığını gösterir ve doğrudan bir time charter hire oranıyla karşılaştırılabilir. Örneğin TCE $18.000/gün ise ve piyasada time charter $15.000/gün ise, voyage charter ticari olarak daha cazip görünür. TCE, gemi ve sefer karşılaştırmasının standart ölçüsüdür.",
        formula: {
          text: "TCE = (Navlun − Sefer maliyetleri) / Toplam sefer günü",
          description: "Seferin günlük net getirisi; time charter hire ile doğrudan karşılaştırılabilir",
        },
      },
      {
        title: "Kârlılık ve Karar Verme",
        content:
          "Nihai kârlılık için TCE'den günlük işletme maliyeti (OPEX: mürettebat, bakım, sigorta, idari) ve sermaye maliyeti (finansman/amortisman) düşülür. TCE, OPEX'in üzerindeyse sefer en azından işletme giderlerini karşılıyor demektir; sermaye maliyetini de aşıyorsa gerçek kâr oluşur. Ticari kararlar (hangi yükü almak, hangi hızda gitmek, beklemek mi başka sefer mi) bu karşılaştırmalı analize dayanır. Piyasa dalgalı olduğundan, alternatif seferlerin TCE'leri ve gelecekteki konumlanma (ballast leg) da hesaba katılır.",
      },
    ],
    keyPoints: [
      "Süre = Mesafe / (Hız × 24); yüksek hız süreyi kısaltır ama yakıtı ~hızın küpüyle artırır.",
      "Sefer net sonucu = navlun − sefer maliyetleri (bunker, liman, kanal, acente).",
      "TCE = (navlun − sefer maliyetleri) / sefer günü; time charter hire ile karşılaştırılır.",
      "Gerçek kâr için TCE'den OPEX ve sermaye maliyeti düşülür.",
    ],
  },

  "Gemi Maliyet Yapısı": {
    title: "Gemi Maliyet Yapısı",
    introduction:
      "Bir geminin maliyetleri, ticari kararların ve kârlılığın diğer yarısını oluşturur. Maliyetler doğası ve kim tarafından karşılandığına göre gruplandırılır: sermaye maliyetleri, işletme maliyetleri ve sefer maliyetleri. Bu yapıyı anlamak, çarter türlerinin ve TCE analizinin temelini oluşturur.",
    sections: [
      {
        title: "Sermaye Maliyetleri (Capital Costs)",
        content:
          "Sermaye maliyetleri, geminin satın alınması veya inşasının finansman yüküdür: kredi faizi ve anapara geri ödemesi, öz sermayenin getiri beklentisi ve amortisman (geminin değer kaybının zamana yayılması). Bunlar gemi henüz hiç çalışmasa bile oluşan, büyük ölçüde sabit maliyetlerdir. Geminin alış zamanlaması ve finansman yapısı, sermaye maliyetini ve dolayısıyla rekabet gücünü doğrudan etkiler; piyasa zirvesinde pahalı alınan gemi, yüksek sermaye yüküyle dezavantajlıdır.",
        image: "/diagrams/economics/maliyet-yapisi-tce.svg",
        imageAlt: "The four layers of ship cost: capital, operating, voyage and cargo handling",
      },
      {
        title: "İşletme Maliyetleri (Operating Costs / OPEX)",
        content:
          "İşletme maliyetleri, geminin sefere çıksın çıkmasın çalışır durumda tutulması için gereken günlük giderlerdir: mürettebat (maaş, iaşe, değişim), bakım-onarım ve yedek parça, yağlar (lube oil), sigorta (H&M ve P&I), kumanya, idari/yönetim ücretleri ve sörvey/klas masrafları. OPEX, time charter'da armatöre aittir ve genellikle günlük (örn. $/gün) ifade edilir. Etkin teknik yönetim, OPEX'i kontrol ederek gemiyi rekabetçi kılar.",
      },
      {
        title: "Sefer Maliyetleri (Voyage Costs)",
        content:
          "Sefer maliyetleri, belirli bir sefere özgü değişken giderlerdir: bunker (yakıt — genellikle en büyük kalem), liman ücretleri, kanal geçiş ücretleri, kılavuzluk/römorkör ve acente harcamaları. Bu maliyetler voyage charter'da armatöre, time charter'da ise kiracıya aittir. Sefer maliyetleri sefere ve güzergâha göre büyük ölçüde değişir; bunker fiyatları ve kanal ücretleri, sefer kârlılığını belirleyen en oynak unsurlardandır.",
      },
      {
        title: "Maliyet Dağılımı ve Çarter İlişkisi",
        content:
          "Hangi maliyetin kime ait olduğu, çarter türüyle belirlenir. Voyage charter'da armatör hem OPEX hem sefer maliyetlerini üstlenir (gelir navlundur). Time charter'da armatör OPEX'i, kiracı sefer maliyetlerini karşılar (gelir hire'dır). Bareboat'ta kiracı OPEX dâhil neredeyse tüm maliyeti üstlenir (armatör yalnızca sermaye maliyetini ve mülkiyeti taşır). Bu nedenle TCE karşılaştırması yapılırken hangi maliyetlerin dâhil olduğu netleştirilir; elma ile elma karşılaştırması şarttır.",
      },
    ],
    keyPoints: [
      "Sermaye maliyeti: finansman, faiz, amortisman; gemi çalışmasa da oluşan sabit yük.",
      "OPEX: mürettebat, bakım, yağ, sigorta, idari — gemiyi çalışır tutmanın günlük gideri.",
      "Sefer maliyeti: bunker, liman, kanal, acente — sefere özgü değişken giderler.",
      "Maliyet dağılımı çarter türüne göre değişir; TCE karşılaştırması bunu netleştirmeyi gerektirir.",
    ],
  },

  "Bunker Yönetimi ve Maliyeti": {
    title: "Bunker Yönetimi ve Maliyeti",
    introduction:
      "Bunker (yakıt), çoğu seferde en büyük tek maliyet kalemidir; bu nedenle yakıt yönetimi sefer kârlılığını doğrudan etkiler. Bunker maliyetinin hesabı, fiyat oynaklığının yönetimi ve yakıt kalitesi/uyum konuları, hem ticari hem operasyonel açıdan kritiktir.",
    sections: [
      {
        title: "Bunker Maliyetinin Hesabı",
        content:
          "Bir seferin bunker maliyeti, tüketilen yakıt miktarı ile birim fiyatın çarpımıdır: Bunker maliyeti = Tüketim (ton) × Fiyat ($/ton). Tüketim, geminin günlük sarfiyatı (seyirde ve limanda farklı) ile süreden hesaplanır. Modern gemilerde farklı yakıt tipleri (VLSFO, MGO) ve farklı bölgelerde (ECA içi/dışı) farklı tüketim ve fiyatlar dikkate alınır. Yakıt fiyatları büyük ölçüde dalgalandığından, sefer öncesi maliyet tahmini güncel bunker fiyatlarıyla yapılır.",
        image: "/diagrams/economics/maliyet-yapisi-tce.svg",
        imageAlt: "Bunkers as the largest single item of voyage cost",
        formula: {
          text: "Bunker maliyeti = Tüketim (ton) × Fiyat ($/ton)",
          description: "Tüketim = günlük sarfiyat × gün; ECA içi/dışı ve yakıt tipine göre ayrı hesaplanır",
        },
      },
      {
        title: "Hız–Yakıt İlişkisi ve Slow Steaming",
        content:
          "Yakıt tüketimi hıza çok duyarlıdır: yaklaşık olarak günlük sarfiyat hızın küpüyle artar; dolayısıyla hızı bir miktar düşürmek (slow steaming) yakıt maliyetini önemli ölçüde azaltır, ancak sefer süresini uzatır. Optimum ekonomik hız, yakıt tasarrufu ile geç varışın (kaybedilen sefer geliri, sözleşme süreleri) dengesine göre belirlenir. Yüksek navlun piyasasında hızlı gitmek (gemiyi daha çok sefere sokmak), düşük piyasada yavaş gitmek genelde daha kârlıdır.",
      },
      {
        title: "Fiyat Riski ve Sözleşme Koşulları",
        content:
          "Bunker fiyatları oynak olduğundan ticari risk taşır. Time charter'da yakıt kiracıya ait olduğundan, teslim ve iade sırasındaki yakıt miktarı ve fiyatı sözleşmede (bunker clause) düzenlenir: gemi belirli miktarda yakıtla teslim alınır ve benzer şekilde iade edilir, fiyat farkları mutabakatla ödenir. Büyük operatörler fiyat riskini türev/hedging araçlarıyla yönetebilir. Ayrıca yakıt fiyatındaki değişimi navluna yansıtan bunker ayarlama mekanizmaları (BAF) bazı sözleşmelerde yer alır.",
      },
      {
        title: "Yakıt Kalitesi, Uyum ve Kayıt",
        content:
          "Bunker yönetimi yalnızca maliyet değil, kalite ve uyum konusudur. Alınan yakıtın ISO 8217 spesifikasyonlarına uygunluğu, kükürt oranının MARPOL Ek VI sınırlarını (küresel %0.50, ECA %0.10) sağlaması ve Bunker Delivery Note (BDN) ile belgelenmesi gerekir. Yakıt numunesi alınır ve saklanır; uyumsuz/kontamine yakıt makine arızasına ve cezaya yol açar. Bunker operasyonu ayrıca döküntü riski taşıdığından MARPOL/SOPEP önlemleriyle yürütülür. Tüm yakıt işlemleri kayıt altına alınır.",
      },
    ],
    keyPoints: [
      "Bunker maliyeti = Tüketim × Fiyat; tüketim günlük sarfiyat × süreden hesaplanır.",
      "Tüketim ~hızın küpüyle artar; slow steaming yakıttan tasarruf eder ama süreyi uzatır.",
      "Time charter'da yakıt kiracıya aittir; bunker clause teslim/iade ve fiyatı düzenler.",
      "Yakıt ISO 8217 ve MARPOL kükürt sınırlarına uymalı; BDN ve numune ile belgelenir.",
    ],
  },

  "Konşimento ve Taşıma Belgeleri": {
    title: "Konşimento ve Taşıma Belgeleri",
    introduction:
      "Deniz taşımacılığında belgeler, yükün mülkiyetini, taşıma sözleşmesini ve teslim koşullarını düzenler. Bunların en önemlisi konşimentodur (Bill of Lading). Belgelerin doğru düzenlenmesi, hem ticari (ödeme/mülkiyet) hem hukuki (sorumluluk) açıdan kritiktir.",
    sections: [
      {
        title: "Konşimentonun Üç İşlevi",
        image: "/diagrams/economics/konsimento.svg",
        imageAlt: "The three functions of a bill of lading, and clean against claused bills",
        content:
          "Konşimento (Bill of Lading, B/L) üç temel işlevi yerine getirir: (1) Makbuz — yükün belirtilen miktar ve durumda gemiye teslim alındığının kanıtıdır; (2) Taşıma sözleşmesinin kanıtı — taşıyan ile yük ilgilisi arasındaki şartları yansıtır; (3) Kıymetli evrak / mülkiyet senedi (document of title) — konşimentonun devri yükün mülkiyetinin devri anlamına gelir ve yük, konşimentonun ibrazıyla teslim alınır. Bu üçlü işlev, konşimentoyu uluslararası ticaretin ve akreditifli ödemelerin merkezine yerleştirir.",
      },
      {
        title: "Konşimento Türleri",
        content:
          "Konşimento devredilebilirliğine göre türlere ayrılır. Emre yazılı (order) konşimento ciro ile devredilebilir; ticarette en yaygın olanıdır. Nama yazılı (straight) konşimento yalnızca belirtilen alıcıya teslim öngörür ve serbestçe devredilemez. Hamiline (bearer) konşimento ibraz edene teslim sağlar. Ayrıca 'shipped/on board' (yükün gemiye yüklendiğini teyit eden) ve 'received for shipment' konşimentoları vardır. 'Temiz' (clean) konşimento yükte görünür hasar/eksiklik kaydı içermez; kayıtlı (claused/dirty) konşimento ise hasar şerhi taşır ve akreditifte sorun yaratır.",
      },
      {
        title: "Sea Waybill ve Diğer Belgeler",
        content:
          "Konşimentonun yanı sıra başka belgeler de kullanılır. Sea waybill, makbuz ve taşıma sözleşmesi işlevi görür ancak kıymetli evrak değildir; teslim için ibraz gerekmediğinden (alıcı kimlikle teslim alır) hızlı teslim sağlar, ancak akreditifli/devirli ticaret için uygun değildir. Mate's receipt (yükün gemiye alındığını gösteren ilk makbuz, konşimento düzenlenmeden önce), manifesto (gemideki tüm yükün listesi) ve teslim emri (delivery order) diğer belgelerdendir. Belge seçimi, ödeme yöntemi ve tarafların güven ilişkisine göre yapılır.",
      },
      {
        title: "Sorumluluk Rejimleri",
        content:
          "Taşıyanın yüke karşı sorumluluğu uluslararası kurallarla düzenlenir: Hague ve Hague-Visby Kuralları (taşıyanın yükü uygun istifleme/özenle taşıma yükümlülüğü ve belirli sorumluluk sınırları/muafiyetleri), Hamburg Kuralları ve daha yeni Rotterdam Kuralları. Bu rejimler, hasar/kayıp durumunda taşıyanın sorumluluğunu, ispat yükünü ve tazminat sınırlarını belirler. Konşimentodaki şartlar ve uygulanacak rejim, bir yük talebinin (cargo claim) sonucunu doğrudan etkiler; bu nedenle belgeleme ve yük durumunun kaydı titizlikle yapılır.",
      },
    ],
    keyPoints: [
      "Konşimento üç işlevlidir: makbuz, taşıma sözleşmesi kanıtı ve mülkiyet senedi.",
      "Order (ciro ile devredilebilir), straight (nama), bearer; clean vs claused ayrımı önemlidir.",
      "Sea waybill hızlı teslim sağlar ama kıymetli evrak değildir (devirli ticarete uygun değil).",
      "Hague-Visby/Hamburg/Rotterdam kuralları taşıyan sorumluluğunu ve tazminat sınırını belirler.",
    ],
  },

  "Deniz Sigortası ve Genel Avarya": {
    title: "Deniz Sigortası ve Genel Avarya",
    introduction:
      "Deniz taşımacılığı yüksek değerli varlıkları ve büyük sorumlulukları içerdiğinden sigorta, riski yönetmenin temel aracıdır. Tekne sigortası, sorumluluk sigortası (P&I) ve yük sigortası farklı riskleri kapsar; genel avarya ise ortak tehlikede fedakârlığın taraflar arasında paylaşımını düzenleyen kadim bir denizcilik ilkesidir.",
    sections: [
      {
        title: "Tekne ve Makine Sigortası (Hull & Machinery)",
        image: "/diagrams/economics/deniz-sigortasi-avarya.svg",
        imageAlt: "Hull and machinery, P&I and cargo cover, and how general average is shared",
        content:
          "Hull & Machinery (H&M) sigortası, geminin kendisini (tekne, makine ve donanım) fiziksel hasar ve kayba karşı korur: karaya oturma, çatışma, yangın, ağır hava hasarı, batma gibi rizikolar tipik olarak kapsanır. Poliçe, sigortalı değer, muafiyet (deductible) ve kapsanan/kapsanmayan rizikoları tanımlar. H&M ayrıca çatışmada karşı gemiye verilen hasarın bir kısmını (collision liability) da kapsayabilir. Armatör için H&M, sermaye varlığını koruyan birincil sigortadır.",
      },
      {
        title: "P&I (Koruma ve Tazmin) Sigortası",
        content:
          "Protection and Indemnity (P&I) sigortası, geminin üçüncü taraflara karşı sorumluluklarını kapsar: yük hasar/kayıp talepleri, mürettebat ve üçüncü kişilerin yaralanma/ölümü, çevre kirliliği (petrol kirliliği tazminatı), çatışmada H&M dışı sorumluluklar, enkaz kaldırma ve liman/altyapı hasarları. P&I genellikle kâr amacı gütmeyen karşılıklı kulüpler (P&I Clubs) tarafından üyelik esasına göre sağlanır; üyeler ortak havuzla büyük riskleri paylaşır. Kirlilik gibi alanlarda P&I teminatı yasal bir zorunluluktur (örn. CLC sertifikası).",
      },
      {
        title: "Genel Avarya (General Average)",
        content:
          "Genel avarya (General Average, GA), ortak bir deniz tehlikesinden gemiyi ve yükü kurtarmak için kasıtlı ve makul bir fedakârlık yapıldığında (örn. yangını söndürmek için yüke su verilmesi, gemiyi yüzdürmek için yük denize atılması) veya olağanüstü masraf doğduğunda, bu kaybın kurtarılan tüm değerler (gemi + yük + navlun) arasında değer oranında paylaşılması ilkesidir. Yani bir tarafın ortak yarar için uğradığı zarar, herkesçe oransal olarak karşılanır. GA, taraflar bakımından York-Antwerp Kuralları çerçevesinde, bir avarya komiseri/dispeççi tarafından hesaplanır.",
      },
      {
        title: "York-Antwerp Kuralları ve Talep Süreci",
        content:
          "Genel avaryanın hangi fedakârlık ve masrafların kabul edileceği ve nasıl hesaplanacağı, uluslararası kabul gören York-Antwerp Kuralları ile düzenlenir. GA ilan edildiğinde, yük ilgililerinden katkı güvencesi (general average bond ve sigortacıdan guarantee) alınır ve yük buna bağlı teslim edilir; dispeççi (average adjuster) kurtarılan değerleri ve fedakârlıkları değerleyerek her tarafın katkı payını belirler. Süreç uzun ve teknik olabilir; bu nedenle iyi belgeleme (kayıtlar, değerler, masraflar) kritiktir.",
      },
    ],
    keyPoints: [
      "H&M geminin fiziksel hasar/kaybını; P&I üçüncü taraf sorumluluklarını (yük, kişi, kirlilik) kapsar.",
      "P&I, karşılıklı kulüpler (P&I Clubs) tarafından üyelik/havuz esasıyla sağlanır.",
      "Genel avarya: ortak tehlikede yapılan fedakârlık, kurtarılan değerler arasında oransal paylaşılır.",
      "GA, York-Antwerp Kuralları'na göre dispeççi tarafından hesaplanır; katkı güvencesi alınır.",
    ],
  },

  "Denizcilik Piyasaları ve Risk": {
    title: "Denizcilik Piyasaları ve Risk",
    introduction:
      "Deniz taşımacılığı, arz ve talebin keskin biçimde dalgalandığı döngüsel bir piyasadır. Navlun oranları, gemi değerleri ve kârlılık güçlü iniş-çıkışlar gösterir. Piyasa dinamiklerini ve risk kaynaklarını anlamak, doğru zamanda doğru ticari kararları (kiralama, alım-satım, konumlanma) vermenin önkoşuludur.",
    sections: [
      {
        title: "Arz, Talep ve Piyasa Döngüleri",
        image: "/diagrams/economics/denizcilik-piyasalari.svg",
        imageAlt: "The four shipping markets and the phases of the shipping cycle",
        content:
          "Navlun oranları, taşıma talebi (dünya ticareti, ürün akışları, mevsimsellik) ile gemi arzı (mevcut filo, yeni inşa teslimatları, hurdaya ayırma) arasındaki dengeyle belirlenir. Talep arzı aştığında oranlar hızla yükselir; çünkü kısa vadede gemi arzı esnek değildir (yeni gemi yapımı yıllar alır). Yüksek oranlar yeni gemi siparişini teşvik eder, teslimatlar arzı artırır ve oranlar düşer; bu da siparişleri ve filo büyümesini frenler. Bu öz-düzeltici mekanizma, denizciliğin belirgin döngülerini (boom-bust) yaratır.",
      },
      {
        title: "Piyasa Endeksleri ve Segmentler",
        content:
          "Piyasanın nabzı endekslerle izlenir. Kuru dökme yükte Baltic Dry Index (BDI) ve gemi sınıfına göre alt endeksler (Capesize, Panamax, Supramax, Handysize) rota bazlı oranları yansıtır. Tanker piyasasında Worldscale temelli oranlar ve dirty/clean segmentleri izlenir. Konteyner piyasasında ise hat bazlı navlun endeksleri kullanılır. Her segmentin kendi arz-talep dinamiği vardır; bir segment güçlüyken diğeri zayıf olabilir. Bu endeksler, kiralama ve yatırım kararlarına referans oluşturur.",
      },
      {
        title: "Risk Türleri ve Yönetimi",
        content:
          "Denizcilik çok boyutlu risk taşır: piyasa/navlun riski (oranların düşmesi), bunker fiyat riski, faiz ve döviz kuru riski, karşı taraf (kiracı/yük sahibinin ödememesi) riski, operasyonel risk (kaza, gecikme) ve düzenleyici risk (yeni çevre/emniyet kuralları). Bu riskler çeşitli araçlarla yönetilir: uzun vadeli sözleşmelerle gelir güvenceye alınır, navlun türevleri (Forward Freight Agreements, FFA) ile navlun riski, bunker hedging ile yakıt riski azaltılır; sigorta ile fiziki/sorumluluk riski transfer edilir. Sağlıklı bir denge, farklı sözleşme tiplerini ve teminatları birlikte kullanmayı gerektirir.",
      },
      {
        title: "Gemi Alım-Satımı ve Değer",
        content:
          "Gemi alım-satımı (sale and purchase, S&P), denizciliğin sermaye kararıdır. Bir geminin değeri; yaşı, tipi, durumu, sınıf/sörvey statüsü ve özellikle piyasanın o anki seviyesiyle belirlenir — yüksek navlun beklentisi gemi fiyatlarını yükseltir. 'Asset play' stratejisinde gemi ucuza alınıp pahalıya satılarak kâr hedeflenir; bu, doğru zamanlama gerektirir ve risklidir. Ömür sonunda gemi hurda (demolition/recycling) değeriyle satılır; hurda fiyatları da çelik piyasasıyla dalgalanır. S&P kararları, navlun piyasası beklentisi ve finansman koşullarıyla birlikte değerlendirilir.",
      },
    ],
    keyPoints: [
      "Navlun oranları arz-talep dengesiyle belirlenir; kısa vadede arz esnek olmadığından oynaktır.",
      "Yüksek oranlar yeni sipariş → arz artışı → oran düşüşü; bu döngü boom-bust yaratır.",
      "BDI ve segment endeksleri (Capesize/Panamax...) ile Worldscale piyasayı izler.",
      "Risk; FFA, bunker hedging, uzun sözleşme ve sigorta ile yönetilir; S&P sermaye kararıdır.",
    ],
  },
};
