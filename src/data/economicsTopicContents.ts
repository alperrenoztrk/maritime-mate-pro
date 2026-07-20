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
          "**Sefer çarteri (voyage charter)**, en temel kiralama biçimidir: **armatör (shipowner)**, belirli bir yükü bir yükleme limanından bir boşaltma limanına taşımayı taahhüt eder ve karşılığında **navlun (freight)** alır. Kiracı bir gemi değil, bir **taşıma hizmeti** satın alır.\n\n**Maliyet ve risk dağılımı:** Geminin **tüm işletme (OPEX) ve sefer maliyetleri** — yakıt (bunker), liman, kanal, kılavuz, mürettebat, bakım — **armatöre** aittir. Dolayısıyla gecikme, hava ve yakıt fiyatı gibi risklerin çoğunu armatör taşır; kiracının maliyeti büyük ölçüde sabit navlundur.\n\n**Laytime ve demurrage:** Kiracının yükleme/boşaltma için sınırlı bir süresi (**laytime**) vardır; bunu aşarsa armatöre **demurrage** (sürastarya) öder, erken bitirirse **despatch** (prim) alabilir. Bu mekanizma, sefer çarterinin kiracıya operasyon hızı sorumluluğu yükleyen kısmıdır.\n\n**Gemide önemi:** Sefer çarterinde armatör **operasyonel kontrolü elinde tutar** (rota, hız, gemi yönetimi) ve geliri sabittir ama maliyet riski yüksektir; kaptan/zabit için bu, sefer verimliliğinin (hızlı liman operasyonu, doğru yakıt yönetimi) doğrudan armatörün kârına yansıması demektir.",
      },
      {
        title: "Zaman Çarteri (Time Charter)",
        content:
          "**Zaman çarterinde (time charter)** kiracı, gemiyi belirli bir **süre** için kiralar (örn. 6 ay, 2 yıl) ve karşılığında zamana bağlı **kira (hire)** öder (genellikle günlük $/gün). Kiracı bir taşıma değil, geminin **kullanım hakkını** satın alır.\n\n**Maliyet dağılımı — ikiye bölünür:** **Armatör**, gemiyi **denize elverişli (seaworthy)**, mürettebatlı ve donanımlı sağlar ve **sabit işletme maliyetlerini (OPEX)** — mürettebat, bakım, sigorta, yağ — karşılar. **Kiracı** ise **sefer değişken maliyetlerini** — bunker (yakıt), liman, kanal ücretleri — üstlenir ve geminin **ticari kullanımını** (hangi yük, hangi liman, hangi hız) yönlendirir.\n\n**Off-hire:** Gemi arıza, kusur veya eksiklik nedeniyle hizmet veremezse (**off-hire**), o süre için **kira durur** — çünkü kiracı çalışmayan gemiye ödeme yapmaz. Bu, armatörü gemiyi çalışır tutmaya teşvik eder.\n\n**Gemide önemi:** Time charter'da kaptan ticari talimatları kiracıdan (hız, rota önceliği) alırken, geminin emniyeti ve denize elverişliliği armatörün sorumluluğundadır; off-hire'dan kaçınmak (arızasız, hazır gemi) doğrudan armatörün gelirini korur, bu yüzden bakım ve hazırlık kritiktir.",
      },
      {
        title: "Çıplak Çarter (Bareboat / Demise Charter)",
        content:
          "**Çıplak çarter (bareboat / demise charter)**, kiralama yelpazesinin en uç biçimidir: kiracı gemiyi **mürettebatsız ve donanımsız** (çıplak) kiralar ve geminin **işletmesini, mürettebatını ve neredeyse tüm maliyet/sorumluluğunu** üstlenir.\n\n**Kiracı fiilen 'işleten' olur:** Bu süre boyunca kiracı, geminin **disponent owner (işleten armatör)** gibi davranır — mürettebatı o istihdam eder, bakımı o yaptırır, sigortayı (çoğunlukla) o yürütür, operasyonel kontrol tamamen ondadır. **Armatör yalnızca mülkiyeti** ve genellikle sermaye maliyetini (finansman) taşır.\n\n**Nerede kullanılır:** Bareboat, çoğunlukla **uzun vadeli finansman/leasing** yapılarında (gemiyi satın almak yerine uzun süre kiralayıp fiilen işletmek) ve **filo işletme stratejilerinde** kullanılır.\n\n**Gemide önemi:** Bareboat'ta operasyonel risk büyük ölçüde **kiracıya geçer**; kaptan ve mürettebat fiilen kiracının (işletenin) organizasyonuna bağlıdır. Üç çarter türü arasındaki fark aslında **kontrol ve riskin kimde olduğudur**: voyage'da armatörde, time charter'da paylaşılmış, bareboat'ta kiracıda.",
      },
      {
        title: "Navlun Mukavelesi (Contract of Affreightment)",
        content:
          "**Navlun mukavelesi (Contract of Affreightment, COA)**, diğerlerinden farklı bir mantığa dayanır: sözleşme belirli **bir gemiye** değil, belirli bir **dönemde belirli miktarda yükün taşınmasına** dayanır. Yani taahhüt edilen şey gemi değil, **taşıma kapasitesidir**.\n\n**Nasıl işler:** Armatör/operatör, sözleşmedeki yük partilerini (örn. 'yılda 12 sefer, her biri ~50.000 ton') **uygun gemilerle** — kendi filosundan veya piyasadan kiraladığıyla — taşır ve hangi gemiyi kullanacağına kendisi karar verir.\n\n**Kime yarar:** COA, **büyük ve düzenli yük akışı** olan tarafların (madenci, çelik üreticisi, enerji şirketi) lojistiğini uzun vadede **güvence altına alır**; aynı zamanda operatöre gemi seçiminde ve sefer planlamasında **esneklik** tanır (gemileri en verimli şekilde havuzlayabilir). Fiyat genellikle **ton başına navlun** olarak belirlenir.\n\n**Gemide önemi:** COA, tek tek gemilerin ötesinde bir **lojistik taahhüdüdür**; bir zabit için bunun anlamı, geminin daha büyük bir taşıma programının parçası olarak çalışabileceği ve sefer planlamasının bu program çerçevesinde şekillendiğidir.",
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
          "Navlun iki temel biçimde belirlenir ve seçim, riskin kimde olduğunu değiştirir.\n\n**Ton başına navlun:** Toplam gelir, taşınan yük miktarı ile birim oranın çarpımıdır: **Navlun = Yük (ton) × Oran ($/ton)**. **Worked example:** 50.000 ton tahıl $22/ton oranla taşınırsa navlun = 50.000 × 22 = **$1.100.000**. Burada gelir yük miktarına bağlıdır; gemi tam dolmazsa gelir düşer, yani **eksik yük riski** büyük ölçüde miktarı sağlayan tarafla (çoğu kez kiracı) ilişkilidir.\n\n**Lumpsum (götürü) navlun:** Taşınan miktardan **bağımsız** olarak gemi veya belirli bir kapasite için **sabit bir tutar** ödenir. Örneğin geminin tamamı için $1.000.000 anlaşılırsa, yük 45.000 ton da gelse 50.000 ton da gelse gelir aynıdır. Bu, **yük miktarının belirsiz** olduğu veya geminin tam kapasite kullanılamayacağı (hacimli/karışık yük) durumlarda **armatörü korur**.\n\n**Miktar ve tolerans:** Sözleşme, hangi miktarın esas alınacağını (**yüklenen mi — bill of lading, boşaltılan mı — outturn**) ve armatörün taşıyacağı miktar toleransını (örn. 'MOLOO — more or less owner's option, ±%5') belirtir. **Gemide önemi:** Yükleme miktarı doğrudan geliri belirlediğinden, doğru **draft survey** ve yük ölçümü ticari olarak kritiktir; eksik/yanlış ölçülen yük, hem gelir kaybı hem uyuşmazlık doğurur.",
        formula: {
          text: "Navlun = Yük (ton) × Oran ($/ton)  ·  veya  Lumpsum (sabit tutar)",
          description: "Ton başına navlun yük miktarına bağlıdır; lumpsum miktardan bağımsız sabittir",
        },
      },
      {
        title: "Ödeme Koşulları ve Riskler",
        content:
          "Navlunun **ne zaman ve hangi koşulda** ödeneceği sözleşmede belirlenir ve bu, tarafların nakit akışı ve riskini doğrudan etkiler.\n\n**Prepaid vs collect:** **'Freight prepaid'** — navlun yükleme/konşimento anında **peşin** ödenir (akreditifli ticarette yaygın; konşimento 'freight prepaid' ibaresi taşır). **'Freight collect / payable on delivery'** — navlun **varışta**, boşaltmada ödenir. Peşin navlunda genellikle **'freight earned on shipment, discountless and non-returnable'** gibi ifadeler yer alır: yani yük/gemi yolda kaybolsa bile navlun **hak edilmiş sayılır ve iade edilmez**.\n\n**Tahsilat güvencesi — lien:** Ödenmeyen navlun için armatörün **yük üzerinde hapis hakkı (lien)** olabilir; yani navlun ödenene kadar yükü teslim etmeme hakkı. Bu, tahsilatın en güçlü güvencesidir.\n\n**Riskler:** **Döviz kuru** (navlun bir para biriminde, maliyetler başka birimde olabilir), **ödeme gecikmesi** ve **karşı taraf/kredi riski** (kiracının ödeyememesi) tahsilatı etkiler. **Gemide önemi:** Kaptan, konşimentoyu 'freight prepaid' olarak imzalarken navlunun gerçekten alındığından emin olmalıdır; aksi hâlde gemi, henüz tahsil edilmemiş navlunun güvencesi olan lien hakkını kaybedebilir.",
      },
      {
        title: "Piyasa Referansları: Worldscale ve Endeksler",
        content:
          "Farklı gemi, güzergâh ve dönemlerin navlunlarını karşılaştırılabilir kılmak için piyasa **standart referanslar** kullanır.\n\n**Tanker — Worldscale:** Tanker navlunu çoğunlukla **Worldscale** adlı standart tarifeyle ifade edilir. Her güzergâh için yıllık hesaplanan nominal bir oran **'WS 100' (flat rate)** kabul edilir; gerçek anlaşma bunun **yüzdesi** olarak belirtilir — **WS 75** nominalin %75'i, **WS 150** ise %150'sidir. **Worked example:** Bir rota için flat rate $20/ton ise, **WS 150 = 20 × 1.50 = $30/ton** demektir. Böylece '$/ton' yerine tek bir yüzdeyle piyasa seviyesi konuşulur.\n\n**Kuru dökme yük — Baltic endeksleri:** **Baltic Exchange** endeksleri (**BDI** ve gemi sınıfı alt endeksleri — Capesize, Panamax, Supramax) rota bazlı oranların ortalamasını yansıtır ve piyasanın 'nabzı' olarak izlenir.\n\n**Konteyner:** Hat bazlı navlun endeksleri kullanılır. **Gemide önemi:** Bu referanslar, bir seferin getirisinin piyasaya göre iyi mi kötü mü olduğunu ölçmeyi sağlar; ticari ekip, teklif edilen WS/oranı bu endekslerle karşılaştırarak kabul/ret kararı verir.",
        formula: {
          text: "Gerçek oran = Worldscale flat rate × (WS% ÷ 100)  ·  örn. $20 × 1.50 = $30/ton",
          description: "WS 100 nominal referans; WS 75 = %75, WS 150 = %150. Kuru yükte Baltic (BDI) endeksleri kullanılır",
        },
      },
      {
        title: "Brüt Gelir ve Komisyonlar",
        content:
          "Armatörün eline geçen tutar **brüt navlun değildir**; brütten çeşitli **komisyonlar** düşülür ve karar daima **net getiri** üzerinden verilir.\n\n**Komisyon türleri:** **Broker komisyonu** — anlaşmayı ayarlayan gemi/yük brokerlerine ödenir (tipik ~%1.25). **Adres komisyonu (address commission)** — aslında **kiracıya iade edilen** bir indirimdir (kiracının kendi lehine pazarlık ettiği, örn. %2.5–3.75); brütten düşülür ama armatörün cebinden çıkıp kiracıya döner.\n\n**Worked example:** Brüt navlun **$1.000.000**; broker komisyonu %1.25 ($12.500) ve adres komisyonu %2.5 ($25.000) düşülürse, toplam komisyon $37.500 ve **net navlun = 1.000.000 − 37.500 = $962.500** olur.\n\n**Neden net esas alınır:** İki teklif brütte aynı görünse bile, komisyon yapıları farklıysa net getirileri farklı olur; bu yüzden **brüt rakam yanıltıcıdır**. **Gemide önemi:** Ticari değerlendirmede (hangi yükü/çarteri kabul edeceği) daima komisyon sonrası **net** getiri ve TCE hesaplanır; brüt üzerinden verilen kararlar gerçek kârlılığı gizleyebilir.",
        formula: {
          text: "Net navlun = Brüt − (broker % + adres %) × Brüt",
          description: "örn. $1.000.000 − (%1.25 + %2.5) = $962.500; karar daima net getiriye göre verilir",
        },
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
          "**Laytime**, sefer çarterinde kiracının yükleme/boşaltmayı **demurrage'a girmeden** tamamlaması için tanınan süredir. Sözleşmede ya doğrudan **süre olarak** (örn. '72 saat') ya da **yükleme oranı olarak** (örn. 'günde 10.000 ton') tanımlanır — oran verildiğinde laytime, yük miktarı ÷ oran ile hesaplanır (örn. 30.000 ton ÷ 10.000 ton/gün = 3 gün).\n\n**Ne zaman başlar — NOR:** Laytime kendiliğinden başlamaz; geminin hazır olduğunu bildiren **Notice of Readiness (NOR)** geçerli biçimde verildikten ve sözleşmedeki **bekleme süresi (turn time, örn. 'NOR'dan 6 saat sonra')** geçtikten sonra işlemeye başlar.\n\n**Geçerli NOR şartları:** NOR'un geçerli olması için gemi **her bakımdan hazır** olmalı — yanaşmış (veya **'whether in berth or not — WIBON'** koşuluyla demirde), yükleme/boşaltmaya fiziken hazır ve gerekli **serbestlik/onayları** (serbest pratika, gümrük) almış olmalıdır. Erken veya geçersiz verilen NOR, laytime'ı başlatmaz.\n\n**Gemide önemi:** NOR'un doğru zamanda ve geçerli koşullarda verilmesi ticari olarak kritiktir; bir gün bile erken/geçersiz NOR, laytime başlangıcını kaydırıp on binlerce dolarlık demurrage/despatch farkı yaratabilir. Kaptan, NOR verme zamanını ve şartlarını sözleşmeye göre titizlikle yönetir.",
      },
      {
        title: "Laytime Sayımı ve İstisnalar",
        content:
          "Laytime'ın **nasıl sayılacağı** sözleşmedeki tanıma bağlıdır ve bu tanım, sürenin ne kadar hızlı 'tükeneceğini' belirler.\n\n**Sayım türleri:** **'Running days'** — takvim günleri, kesintisiz sayılır (tatil/hava fark etmez). **'Working days'** — iş günleri. **'Weather working days (WWD)'** — yalnızca havanın çalışmaya elverişli olduğu iş günleri; **hava elverişsizse (yağmur, fırtına) o süre sayılmaz**. Tür ne kadar 'korumalıysa' kiracı o kadar avantajlıdır.\n\n**İstisnalar:** Sözleşme bazı sürelerin laytime dışında tutulmasını öngörebilir: **tatiller ve pazarlar ('SHEX — Sundays and Holidays Excepted')**, geceler, kötü hava, grev ve kiracının kontrolü dışındaki gecikmeler. Bunlar sayımı yavaşlatır (kiracı lehine).\n\n**Kayıt — SOF ve time sheet:** Tüm bu olaylar, limanda tutulan **Statement of Facts (SOF — olaylar belgesi)** ve **time sheet (zaman çizelgesi)** ile dakika dakika kaydedilir; hangi saatlerin sayıldığı/sayılmadığı buradan hesaplanır. **Gemide önemi:** Laytime uyuşmazlıklarının **büyük çoğunluğu bu sayımdan** çıkar; kaptan/acente SOF'u doğru, eksiksiz ve taraflarca imzalı tutmalıdır — çünkü bir demurrage/despatch talebinin kanıtı bu belgedir.",
      },
      {
        title: "Demurrage (Sürastarya)",
        content:
          "**Demurrage (sürastarya)**, kiracının laytime'ı aşması hâlinde, aşan süre için armatöre ödediği **tazminattır**; sözleşmede **günlük oran** ($/gün) olarak belirlenir. Aslında bu, geminin atıl beklemesinden doğan armatör kaybının **önceden kararlaştırılmış** karşılığıdır (likidite tazminatı).\n\n**Hesap ve worked example:** Demurrage = **(Kullanılan süre − Laytime) × Günlük oran**. Örneğin laytime 3 gün, fiilî operasyon 5 gün sürdü ve demurrage oranı $15.000/gün ise: aşım = 5 − 3 = 2 gün, demurrage = 2 × 15.000 = **$30.000**.\n\n**'Once on demurrage, always on demurrage':** Bu temel ilkeye göre, demurrage başladıktan sonra çoğu laytime istisnası (tatil, hava, SHEX) **artık süreyi durdurmaz** — meğer ki sözleşme açıkça aksini yazsın. Yani kiracı laytime'ı aştıktan sonra 'koruma' büyük ölçüde kalkar.\n\n**Gemide önemi:** Demurrage doğrudan gelir/gider olduğundan liman operasyonunun her saati ticari sonuç doğurur; gemi tarafı, gecikmelerin sorumluluğunu (kim kaynaklı?) SOF ile belgeleyerek haklı demurrage'ı talep eder veya haksız talebe itiraz eder.",
        formula: {
          text: "Demurrage = (Kullanılan süre − Laytime) × Günlük oran",
          description: "Laytime'ı aşan süre için günlük orandan ödenen tazminat (aşım pozitifse)",
        },
      },
      {
        title: "Despatch (Dispeç)",
        content:
          "**Despatch (dispeç)**, demurrage'ın tersidir: kiracı yükleme/boşaltmayı **laytime'dan önce** bitirirse, tasarruf edilen süre için armatör kiracıya bir **prim** öder. Amaç, kiracıyı **hızlı operasyona teşvik** etmektir. Despatch oranı genellikle **demurrage oranının yarısıdır**.\n\n**İki hesap esası:** **'Despatch on all time saved'** — kurtarılan **tüm zaman** (tatil/hava dâhil) ödenir; **'despatch on laytime saved'** — yalnızca laytime olarak **sayılacak** olan tasarruf ödenir (armatör lehine, daha az). Hangisinin geçerli olduğu sözleşmede yazar.\n\n**Worked example:** Laytime 4 gün, operasyon 2.5 günde bitti; demurrage oranı $15.000/gün, despatch = yarısı = $7.500/gün. Tasarruf = 4 − 2.5 = 1.5 gün → despatch = 1.5 × 7.500 = **$11.250** kiracıya ödenir.\n\n**Gemide önemi:** Demurrage ve despatch birlikte, kiracıyı hızlı ama zamanında bir operasyona yönlendiren bir teşvik sistemidir; gemi tarafı için mesaj aynıdır — operasyonu doğru belgele (SOF), NOR'u doğru ver ve süreyi dürüst say; çünkü küçük bir kayıt hatası binlerce dolarlık despatch/demurrage farkına dönüşür.",
        formula: {
          text: "Despatch = Tasarruf edilen süre × Despatch oranı (genelde demurrage'ın yarısı)",
          description: "örn. 1.5 gün × $7.500 = $11.250; 'all time saved' veya 'laytime saved' esasına göre hesaplanır",
        },
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
          "Sefer ekonomisinin temeli, **sefer süresinin doğru tahminidir**; çünkü hem gelir (günlük TCE) hem maliyet (günlük OPEX, yakıt) süreye bağlıdır.\n\n**Seyir süresi:** Mesafenin hıza bölünmesiyle bulunur: **Süre (gün) = Mesafe (nm) ÷ (Hız (kn) × 24)**. **Worked example:** 6.000 nm mesafe 14 knot hızla = 6.000 ÷ (14 × 24) = 6.000 ÷ 336 ≈ **17.9 gün** seyir. Buna **yükleme, boşaltma, bekleme, kanal geçişi ve hava payları** eklenerek toplam sefer süresi bulunur (örn. +4 gün liman → ~22 gün toplam).\n\n**Hız–yakıt dengesi:** Hız seçimi kritiktir çünkü yakıt tüketimi yaklaşık **hızın küpüyle** artar. Hızı artırmak süreyi kısaltır (daha çok sefer/gelir) ama yakıtı hızla yükseltir; hızı düşürmek (**slow steaming**) yakıttan tasarruf sağlar ama süreyi uzatır. **Optimum ekonomik hız**, bu iki etkinin dengelendiği noktadır ve piyasa seviyesine göre değişir.\n\n**Gemide önemi:** Köprüüstünün hız kararı doğrudan sefer ekonomisini belirler; yüksek navlun piyasasında hızlı gidip daha çok sefer yapmak, düşük piyasada yavaşlayıp yakıttan kısmak genelde daha kârlıdır — kaptan bu talimatı ticari birimden alır ama fiziği (küp yasası) bilmek kararı anlamlandırır.",
        formula: {
          text: "Süre (gün) = Mesafe (nm) / (Hız (kn) × 24)",
          description: "Seyir süresi; toplam sefer süresi için liman/bekleme/kanal süreleri eklenir",
        },
      },
      {
        title: "Sefer Geliri ve Maliyetleri",
        content:
          "Sefer sonucunu bulmak için önce **gelir** ve **sefere özgü maliyetler** ayrı ayrı toplanır.\n\n**Sefer geliri:** Esas olarak **navlundur** (ton başına × miktar veya lumpsum), artı varsa **demurrage geliri**. Bu, seferin ürettiği toplam hasılattır.\n\n**Sefer maliyetleri (voyage costs):** Yola özgü **değişken** kalemlerdir: **bunker (yakıt — genellikle en büyük kalem)**, **liman ücretleri**, **kanal geçiş ücretleri** (Süveyş, Panama — yüz binlerce dolar olabilir), **kılavuzluk/römorkör**, **acente** ve diğer sefer harcamaları.\n\n**Net sefer sonucu (voyage result):** Gelirden sefer maliyetleri düşülerek bulunur: voyage result = navlun − sefer maliyetleri. **Önemli ayrım:** Bu hesapta **günlük işletme maliyeti (OPEX)** henüz düşülmez; OPEX ayrı değerlendirilir ve TCE ile karşılaştırılır (çünkü OPEX zamana bağlıdır, sefere değil).\n\n**Gemide önemi:** Sefer maliyetlerinin doğru tahmini (özellikle bunker ve kanal), bir seferin kabul edilip edilmeyeceğini belirler; kaptanın liman/kanal masraflarını ve yakıt tüketimini doğru raporlaması, ticari ekibin gerçek sefer sonucunu görmesini sağlar.",
      },
      {
        title: "TCE Hesabı",
        content:
          "**Time Charter Equivalent (TCE)**, farklı seferleri (ve bir voyage charter'ı bir time charter'la) karşılaştırmak için ortak ölçüdür: seferin getirisini **günlük net kazanç** olarak ifade eder.\n\n**Hesap:** Sefer net geliri (navlun − sefer maliyetleri), toplam sefer gün sayısına bölünür: **TCE = (Navlun − Sefer maliyetleri) ÷ Toplam sefer günü**. Sonuç, geminin o seferden **günde ne kadar net kazandığını** gösterir ve doğrudan bir time charter **hire** oranıyla karşılaştırılabilir.\n\n**Worked example:** Navlun $1.100.000, sefer maliyetleri (bunker + liman + kanal) $500.000, toplam sefer 25 gün ise: TCE = (1.100.000 − 500.000) ÷ 25 = 600.000 ÷ 25 = **$24.000/gün**. Piyasada eşdeğer bir time charter $18.000/gün veriyorsa, bu voyage charter **ticari olarak daha cazip** görünür.\n\n**Gemide önemi:** TCE, gemi ve sefer karşılaştırmasının **standart dilidir**; bir yük teklifinin '$/ton' rakamı tek başına anlam taşımaz — ancak TCE'ye çevrildiğinde alternatiflerle (başka yük, time charter, bekleme) kıyaslanabilir. Ticari kararların neredeyse tamamı bu ölçüye dayanır.",
        formula: {
          text: "TCE = (Navlun − Sefer maliyetleri) / Toplam sefer günü",
          description: "Seferin günlük net getirisi; time charter hire ile doğrudan karşılaştırılabilir",
        },
      },
      {
        title: "Kârlılık ve Karar Verme",
        content:
          "TCE seferin **günlük brüt getirisidir**; gerçek kâra ulaşmak için bundan **zamana bağlı diğer maliyetler** düşülür.\n\n**Kâra giden merdiven:** TCE'den önce **günlük OPEX** (mürettebat, bakım, sigorta, idari) düşülür — kalan pozitifse sefer en azından işletme giderlerini karşılıyordur. Sonra **sermaye maliyeti** (finansman/amortisman) düşülür — bunu da aşıyorsa **gerçek kâr** oluşur. Örneğin TCE $24.000/gün, OPEX $8.000/gün, sermaye maliyeti $10.000/gün ise, günlük net kâr ≈ 24.000 − 8.000 − 10.000 = **$6.000/gün**.\n\n**Karar verme:** Ticari kararlar — hangi yükü almak, hangi hızda gitmek, beklemek mi yoksa başka sefere gitmek mi — bu **karşılaştırmalı** analize dayanır. Alternatif seferlerin TCE'leri, geminin bir sonraki konumu (**ballast leg — yüksüz dönüş**) ve piyasa beklentisi birlikte değerlendirilir; bazen düşük TCE'li bir sefer, gemiyi daha iyi bir bölgeye konumlandırdığı için tercih edilir.\n\n**Gemide önemi:** Piyasa dalgalı olduğundan aynı gemi bir hafta kârlı, sonraki hafta zararlı olabilir; TCE-OPEX-sermaye merdiveni, 'çalışmak zarardan iyidir' (OPEX'i karşılayan sefer) ile 'beklemek daha iyidir' kararını ayırt etmeyi sağlar. Bu, sefer verimliliğinin neden bu kadar önemsendiğini açıklar.",
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
          "**Sermaye maliyetleri (capital costs)**, geminin **satın alınması veya inşasının finansman yüküdür** — yani gemiyi 'sahiplenmenin' maliyeti. Başlıca kalemler: banka kredisinin **faizi ve anapara geri ödemesi**, öz sermayenin **getiri beklentisi** ve **amortisman** (geminin değer kaybının ekonomik ömrüne yayılması).\n\n**Neden sabit:** Bu maliyetler gemi **hiç çalışmasa bile** oluşur; kredi taksiti ve değer kaybı, gemi limanda beklerken de işler. Bu yüzden sermaye maliyeti büyük ölçüde **sabit** bir yüktür ve genellikle bir günlük değere indirgenir (finansman + amortisman ÷ 365).\n\n**Zamanlama belirleyici:** Geminin **alış zamanlaması** ve finansman yapısı, sermaye maliyetini ve dolayısıyla rekabet gücünü doğrudan etkiler. **Worked mantık:** Piyasa zirvesinde $50M'a alınan bir gemi ile dip seviyede $25M'a alınan aynı tip gemi, aynı navlunu kazansa bile ilkinin **çok daha yüksek sermaye yükü** vardır ve düşük piyasada çok daha kırılgandır.\n\n**Gemide önemi:** Sermaye maliyeti gemide 'görünmez' bir kalemdir (mürettebat onu günlük hissetmez) ama geminin ticari kaderini belirler; pahalı alınmış bir gemi aynı OPEX ve sefer performansıyla bile zarar edebilirken, ucuz alınmış gemi kâr eder — bu, S&P (alım-satım) kararlarının neden bu kadar kritik olduğunu açıklar.",
      },
      {
        title: "İşletme Maliyetleri (Operating Costs / OPEX)",
        content:
          "**İşletme maliyetleri (Operating Costs, OPEX)**, geminin **sefere çıksın çıkmasın çalışır durumda** tutulması için gereken günlük giderlerdir; gemi 'hazır ve denize elverişli' olsun diye harcanır.\n\n**Başlıca kalemler:** **Mürettebat** (maaş, iaşe, değişim/seyahat — genelde en büyük OPEX kalemi), **bakım-onarım ve yedek parça**, **yağlar (lube oil)**, **sigorta (H&M + P&I)**, **kumanya/stores**, **idari/yönetim ücretleri** ve **sörvey/klas** masrafları.\n\n**Kime ait:** OPEX, **time charter'da armatöre**, **bareboat'ta kiracıya** aittir ve genellikle günlük ($/gün) ifade edilir (örn. bir kuru yük gemisi için ~$6.000–8.000/gün mertebesinde).\n\n**Gemide önemi:** OPEX, gemideki ekibin **doğrudan etkilediği** maliyettir — planlı bakım (PMS) ile arızayı önlemek, yedek parça ve kumanyayı verimli kullanmak, mürettebat değişimini iyi planlamak OPEX'i düşürür. Etkin teknik yönetim, aynı gemiyi rakiplerinden **daha ucuza çalıştırarak** rekabet avantajı yaratır; savurgan bir işletme ise düşük piyasada gemiyi zarara sokar.",
      },
      {
        title: "Sefer Maliyetleri (Voyage Costs)",
        content:
          "**Sefer maliyetleri (voyage costs)**, belirli bir **sefere özgü değişken** giderlerdir; sefer yapılmazsa oluşmazlar ve güzergâha göre büyük ölçüde değişir.\n\n**Başlıca kalemler:** **Bunker (yakıt)** — çoğu seferde en büyük tek kalem; **liman ücretleri** (rıhtım, fener, acente hizmetleri); **kanal geçiş ücretleri** (Süveyş, Panama — büyük gemide yüz binlerce dolar); **kılavuzluk ve römorkör**; **acente** ve çeşitli sefer harcamaları.\n\n**Kime ait:** Sefer maliyetleri **voyage charter'da armatöre**, **time charter'da kiracıya** aittir (çünkü time charter'da rota/hızı kiracı seçer, yakıtı da o öder).\n\n**En oynak unsurlar:** **Bunker fiyatları** ve **kanal ücretleri**, sefer kârlılığını belirleyen en değişken kalemlerdir; bir bunker fiyat sıçraması veya kanal ücret artışı, kârlı bir seferi zarara çevirebilir. **Gemide önemi:** Kaptanın yakıt tüketimini, liman/kanal masraflarını doğru tahmin ve raporlaması sefer sonucunun doğruluğunu belirler; ayrıca rota/kanal tercihi (örn. Süveyş yerine Ümit Burnu) bir sefer maliyeti optimizasyonu kararıdır.",
      },
      {
        title: "Maliyet Dağılımı ve Çarter İlişkisi",
        content:
          "Denizcilik maliyetleri üç katmandır — **sermaye + OPEX + sefer maliyeti** — ve **hangisinin kime ait olduğu çarter türüyle belirlenir**. Bu dağılımı bilmek, hem sözleşmeyi hem TCE karşılaştırmasını doğru yapmanın anahtarıdır.\n\n**Voyage charter:** Armatör hem **OPEX hem sefer maliyetlerini** üstlenir; geliri **navlundur**. Yani armatör en çok maliyeti taşır ama operasyonu da yönetir. **Time charter:** Armatör **OPEX'i**, kiracı **sefer maliyetlerini** karşılar; gelir **hire'dır**. Maliyet ikiye bölünmüştür. **Bareboat:** Kiracı **OPEX dâhil neredeyse tüm maliyeti** üstlenir; armatör yalnızca **sermaye maliyetini ve mülkiyeti** taşır.\n\n**Neden önemli:** TCE karşılaştırması yapılırken **hangi maliyetlerin dâhil olduğu netleştirilmelidir** — bir voyage TCE'si (sefer maliyeti düşülmüş) ile bir time charter hire'ı (sefer maliyeti kiracıda) doğru zeminde kıyaslanmalı; 'elma ile elma' karşılaştırması şarttır.\n\n**Gemide önemi:** Bir uyuşmazlıkta 'bu masraf kimin?' sorusunun cevabı doğrudan çarter türündedir; yakıt kime ait, liman kime ait, off-hire'da ne olur — hepsi bu matristen okunur.",
        formula: {
          text: "Voyage: armatör (OPEX+sefer) · Time: armatör OPEX / kiracı sefer · Bareboat: kiracı (hepsi)",
          description: "Hangi maliyetin kime ait olduğu çarter türünü belirler; TCE karşılaştırması bu dağılıma göre yapılır",
        },
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
          "Bunker (yakıt), çoğu seferde **en büyük tek maliyet kalemi** olduğundan hesabı sefer ekonomisinin merkezindedir. Temel bağıntı basittir: **Bunker maliyeti = Tüketim (ton) × Fiyat ($/ton)**.\n\n**Tüketim nasıl bulunur:** Tüketim, geminin **günlük sarfiyatı** (seyirde ve limanda farklıdır) ile **süreden** hesaplanır. **Worked example:** Gemi seyirde 30 ton/gün yakıyor ve sefer 18 gün seyir sürüyorsa, seyir tüketimi = 30 × 18 = 540 ton; VLSFO fiyatı $600/ton ise bunker maliyeti = 540 × 600 = **$324.000**. Buna limanda (örn. 3 ton/gün) tüketilen yakıt ve varsa jeneratör/MGO tüketimi eklenir.\n\n**Farklı yakıt tipleri ve bölgeler:** Modern gemide **VLSFO** (~%0.50 S) ve **MGO** (~%0.10 S, ECA için) gibi farklı yakıtlar farklı fiyat ve tüketimle ayrı hesaplanır; **ECA içi/dışı** süreler bölünerek maliyetlenir (ECA'da pahalı MGO kullanılır).\n\n**Gemide önemi:** Yakıt fiyatları büyük ölçüde dalgalandığından sefer öncesi maliyet tahmini **güncel bunker fiyatlarıyla** yapılır; kaptanın günlük sarfiyat raporları (noon report) hem sefer maliyetinin gerçekleşmesini izlemeyi hem de bir sonraki seferin tahminini iyileştirmeyi sağlar.",
        formula: {
          text: "Bunker maliyeti = Tüketim (ton) × Fiyat ($/ton)",
          description: "Tüketim = günlük sarfiyat × gün; ECA içi/dışı ve yakıt tipine göre ayrı hesaplanır",
        },
      },
      {
        title: "Hız–Yakıt İlişkisi ve Slow Steaming",
        content:
          "Yakıt tüketimi **hıza çok duyarlıdır**: iyi bir yaklaşımla günlük sarfiyat, **hızın küpüyle** artar. Bu 'küp yasası', denizciliğin en güçlü ekonomik gerçeklerinden biridir.\n\n**Küp yasası ve worked example:** Yeni tüketim ≈ eski tüketim × (yeni hız ÷ eski hız)³. Örneğin gemi 14 knotta 30 ton/gün yakıyorsa, **12 knota** düşünce: 30 × (12/14)³ = 30 × (0.857)³ = 30 × 0.63 ≈ **18.9 ton/gün** — yani hızı %14 düşürmek yakıtı ~%37 azaltır. Ancak aynı mesafe **daha uzun sürer** (süre = mesafe ÷ hız), bu yüzden toplam tasarruf, günlük tasarruf ile uzayan süre arasındaki dengedir.\n\n**Slow steaming kararı:** Hızı düşürmek (**slow steaming**) yakıt maliyetini ciddi azaltır ama sefer süresini uzatır (geç varış, daha az sefer, sözleşme süreleri). **Optimum ekonomik hız**, yakıt tasarrufu ile kaybedilen sefer gelirinin dengelendiği hızdır.\n\n**Gemide önemi:** Genel kural — **yüksek navlun piyasasında hızlı git** (gemiyi daha çok sefere sok, geliri maksimize et), **düşük piyasada yavaş git** (yakıttan kıs, çünkü ek sefer zaten kazandırmıyor). Köprüüstünün hız kararı doğrudan bu ekonomiyi uygular.",
        formula: {
          text: "Yeni tüketim ≈ eski × (yeni hız ÷ eski hız)³  ·  30 t × (12/14)³ ≈ 18.9 t/gün",
          description: "Yakıt hızın küpüyle artar; hızı biraz düşürmek yakıtı çok azaltır ama süreyi uzatır (slow steaming)",
        },
      },
      {
        title: "Fiyat Riski ve Sözleşme Koşulları",
        content:
          "Bunker fiyatları oynak olduğundan **ticari risk** taşır; bir sefer planlanırken varsayılan yakıt fiyatı, sefer sonunda çok farklı olabilir.\n\n**Time charter'da bunker devri:** Yakıt time charter'da kiracıya ait olduğundan, **teslim (delivery) ve iade (redelivery) anındaki** yakıt miktarı ve fiyatı sözleşmede (**bunker clause**) düzenlenir: gemi belirli miktarda yakıtla teslim alınır ve **benzer miktarla iade edilir**; aradaki fiyat farkları mutabakatla ödenir. Böylece taraflar birbirinin yakıtını 'satın almış' olur.\n\n**Risk yönetimi:** Büyük operatörler fiyat riskini **türev/hedging** araçlarıyla (yakıt swap/vadeli) yönetebilir. Ayrıca bazı sözleşmelerde, yakıt fiyat değişimini navluna yansıtan **bunker ayarlama mekanizmaları (BAF — Bunker Adjustment Factor)** yer alır; böylece fiyat artışı otomatik olarak navlun fiyatına eklenir.\n\n**Gemide önemi:** Teslim/iade anındaki yakıt miktarının doğru ölçülmesi (bunker survey) ticari olarak önemlidir — birkaç yüz ton yakıt on binlerce dolar eder; kaptan/mühendis teslim-iade yakıt ölçümünü ve BDN'leri titizlikle tutar, çünkü bu rakamlar doğrudan paraya çevrilir.",
      },
      {
        title: "Yakıt Kalitesi, Uyum ve Kayıt",
        content:
          "Bunker yönetimi yalnızca maliyet değil, **kalite ve uyum** işidir; kötü yakıt hem makineyi bozar hem yasal ihlal yaratır.\n\n**Kalite — ISO 8217:** Alınan yakıtın **ISO 8217** spesifikasyonlarına uygunluğu (viskozite, yoğunluk, su, kül, katalizör kalıntısı 'cat fines' vb.) beklenir; **kontamine veya spec dışı yakıt**, yakıt pompası/enjektör aşınmasına ve makine arızasına yol açar (özellikle cat fines silindirleri aşındırır).\n\n**Uyum — MARPOL Ek VI:** Yakıtın kükürt oranı MARPOL sınırlarını sağlamalıdır: **küresel %0.50, ECA içi %0.10**. Bu, **Bunker Delivery Note (BDN)** ile belgelenir ve bir **numune (sample)** alınıp mühürlenerek saklanır (uyuşmazlık/denetimde bu numune esastır).\n\n**Döküntü riski:** Bunker operasyonu güvertede **petrol döküntüsü riski** taşıdığından **MARPOL/SOPEP** önlemleriyle (scupper kapatma, gözcü, kontrol listesi) yürütülür.\n\n**Gemide önemi:** Tüm yakıt işlemleri (alım, transfer, tüketim) kayıt altına alınır; yanlış yakıt hem büyük onarım maliyeti hem sefer aksaması hem ceza demektir — bu yüzden yakıt kalitesi ve uyumu maliyet kadar dikkatle yönetilir. Bunker, ekonomi (Ek VI) ile emniyet/çevrenin kesiştiği tipik bir konudur.",
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
        content:
          "**Konşimento (Bill of Lading, B/L)**, deniz taşımacılığının en önemli belgesidir çünkü aynı anda **üç ayrı işlevi** yerine getirir; bu üçlü işlev onu uluslararası ticaretin merkezine koyar.\n\n**1) Makbuz (receipt):** Yükün, belirtilen **miktar ve durumda gemiye teslim alındığının** kanıtıdır. Yük hasarlıysa bu, konşimentoya şerh olarak yazılır (bkz. clean/claused).\n\n**2) Taşıma sözleşmesinin kanıtı:** Taşıyan ile yük ilgilisi arasındaki **taşıma şartlarını** yansıtır (sözleşmenin kendisi değil ama en güçlü kanıtı).\n\n**3) Kıymetli evrak / mülkiyet senedi (document of title):** En kritik işlev budur — **konşimentonun devri, yükün mülkiyetinin devri** anlamına gelir ve yük, ancak **konşimentonun ibrazıyla** teslim alınır. Yani konşimento, fiziksel yükü 'temsil eden' bir kâğıttır; onu elinde tutan yükü kontrol eder.\n\n**Gemide önemi:** Bu üçlü işlev nedeniyle konşimento, **akreditifli ödemelerin** (banka, konşimento ibrazında öder) ve devirli ticaretin temelidir; kaptan konşimentoyu imzalarken yükün gerçek durumunu doğru yansıtmalıdır — çünkü bu belge, sonradan yükü satın alan üçüncü kişiler için bir güvencedir ve yanlış beyan ağır sorumluluk doğurur.",
      },
      {
        title: "Konşimento Türleri",
        content:
          "Konşimentolar **devredilebilirliğine ve düzenlenme biçimine** göre türlere ayrılır; tür, yükün nasıl el değiştireceğini ve teslim edileceğini belirler.\n\n**Devir biçimine göre:** **Emre yazılı (order) konşimento** — 'X'in emrine' düzenlenir ve **ciro (endorsement) ile devredilebilir**; ticarette en yaygınıdır çünkü yük yoldayken alınıp satılabilir. **Nama yazılı (straight) konşimento** — yalnızca **belirtilen alıcıya** teslim öngörür, serbestçe devredilemez. **Hamiline (bearer) konşimento** — **ibraz edene** teslim sağlar (esnek ama riskli).\n\n**Yükleme durumuna göre:** **'Shipped / on board'** — yükün fiilen **gemiye yüklendiğini** teyit eder (akreditifte genelde bu istenir); **'received for shipment'** — yükün taşıyana **teslim alındığını** ama henüz yüklenmediğini gösterir.\n\n**Yük durumuna göre:** **'Temiz (clean)' konşimento** yükte görünür hasar/eksiklik **şerhi içermez**; **'kayıtlı (claused/dirty)' konşimento** ise hasar şerhi taşır ve **akreditifte sorun** yaratır (banka temiz konşimento ister).\n\n**Gemide önemi:** Kaptan, yükü hasarlı gördüğünde konşimentoya doğru şerhi koymalıdır; temiz konşimento karşılığında hasarlı yükü 'temiz' göstermek için verilen **teminat mektubu (letter of indemnity)** talepleri hukuken tehlikelidir (hile sayılabilir). Belge türü seçimi, ödeme yöntemi ve tarafların güven ilişkisine göre yapılır.",
      },
      {
        title: "Sea Waybill ve Diğer Belgeler",
        content:
          "Konşimentonun yanı sıra, farklı ihtiyaçlara hizmet eden başka taşıma belgeleri de vardır.\n\n**Sea waybill:** Makbuz ve taşıma sözleşmesi işlevi görür, **ancak kıymetli evrak (mülkiyet senedi) değildir**. Teslim için **ibraz gerekmez** — alıcı kimliğini kanıtlayarak yükü alır — bu yüzden **hızlı teslim** sağlar (belge varıştan önce yetişmese bile yük teslim edilebilir). Ancak devredilemediği için **akreditifli/devirli ticarete uygun değildir**; taraflar birbirine güveniyorsa (örn. aynı grup şirketleri) tercih edilir.\n\n**Diğer belgeler:** **Mate's receipt** — yükün gemiye alındığını gösteren, konşimento düzenlenmeden önceki **ilk makbuz**; **manifesto** — gemideki **tüm yükün listesi** (gümrük/acente için); **teslim emri (delivery order)** — bir yük partisinin bölünüp teslimi için düzenlenen belge.\n\n**Gemide önemi:** Belge seçimi bir ticari/hukuki karardır: hız mı (sea waybill), yoksa güvence ve devredilebilirlik mi (konşimento) önceliklidir? Kaptan/zabit için önemli olan, hangi belgenin düzenlendiğini ve teslimin **doğru belgeye/kişiye** yapıldığını bilmektir — yanlış teslim (örn. konşimento ibraz edilmeden yük vermek) taşıyanı büyük sorumluluk altına sokar.",
      },
      {
        title: "Sorumluluk Rejimleri",
        content:
          "Taşıyanın yüke karşı **sorumluluğunun kapsamı ve sınırı**, uluslararası kural rejimleriyle belirlenir; hangi rejimin uygulandığı, bir **yük talebinin (cargo claim)** sonucunu doğrudan etkiler.\n\n**Başlıca rejimler:** **Hague Kuralları (1924)** ve güncellenmiş **Hague-Visby Kuralları** — taşıyanın yükü **uygun istifleme ve özenle taşıma** yükümlülüğünü, belirli **sorumluluk sınırlarını** ve muafiyetleri (örn. 'navigational fault' — seyir kusurundan doğan muafiyet) tanımlar; en yaygın rejimdir. **Hamburg Kuralları (1978)** — yük ilgilisi lehine daha ağır taşıyan sorumluluğu getirir. **Rotterdam Kuralları** — daha yeni ve kapsamlı, kapıdan kapıya taşımayı da içerir (henüz sınırlı kabul).\n\n**Ne belirler:** Bu rejimler; hasar/kayıp durumunda **taşıyanın sorumlu olup olmadığını**, **ispat yükünün** kimde olduğunu ve **tazminat sınırını** (paket/kg başına azami tutar) belirler.\n\n**Gemide önemi:** Bir yük hasarı iddiasında, geminin sorumluluğu bu rejim ve konşimento şartlarına göre değerlendirilir; bu yüzden **yük durumunun kaydı** (yükleme öncesi hasar tespiti, doğru konşimento şerhi, istif ve bakım kayıtları) kritiktir. İyi belgeleme, haksız talebe karşı geminin en güçlü savunmasıdır; kötü/eksik kayıt ise savunulabilir bir olayı bile kayba çevirir.",
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
        content:
          "**Hull & Machinery (H&M) sigortası**, geminin **kendisini** (tekne, makine, donanım) fiziksel hasar ve kayba karşı korur; armatörün en değerli varlığını (gemiyi) güvenceye alan **birincil sigortadır**.\n\n**Kapsanan rizikolar:** Tipik olarak **karaya oturma, çatışma, yangın, patlama, ağır hava hasarı, batma** ve benzeri deniz rizikoları kapsanır. Poliçe; **sigortalı değeri**, **muafiyeti (deductible — her hasarda armatörün üstlendiği ilk dilim)** ve kapsanan/kapsanmayan rizikoları tanımlar.\n\n**Çatışma sorumluluğu (collision liability):** H&M ayrıca, geminin bir çatışmada **karşı gemiye verdiği hasarın** bir kısmını (klasik poliçelerde genelde 3/4'ünü — 'Running Down Clause') da kapsayabilir; kalan kısım ve diğer sorumluluklar P&I'ye gider.\n\n**Gemide önemi:** H&M armatörün sermaye varlığını korur; bir hasar olayında (örn. karaya oturma) **doğru ve hızlı raporlama, hasar tespiti ve delil toplama** (fotoğraf, kayıt, sörvey) sigorta talebinin (claim) sonucunu belirler. Kaptanın olay kayıtları, tazminatın alınmasında kritik rol oynar.",
      },
      {
        title: "P&I (Koruma ve Tazmin) Sigortası",
        content:
          "**Protection and Indemnity (P&I) sigortası**, geminin **üçüncü taraflara karşı sorumluluklarını** kapsar; H&M gemiyi korurken P&I geminin **başkalarına verdiği zararları** karşılar. İkisi birlikte armatörün sigorta korumasını tamamlar.\n\n**Kapsadığı sorumluluklar:** **Yük hasar/kayıp** talepleri; **mürettebat ve üçüncü kişilerin yaralanma/ölümü**; **çevre kirliliği** (özellikle petrol kirliliği tazminatı); çatışmada H&M dışı sorumluluklar; **enkaz kaldırma (wreck removal)**; liman/rıhtım/altyapı hasarları.\n\n**Karşılıklı kulüp yapısı:** P&I genellikle kâr amacı gütmeyen **karşılıklı kulüpler (P&I Clubs)** tarafından **üyelik esasına** göre sağlanır; üyeler (armatörler) bir **havuzda** riski paylaşır ve büyük talepler bu ortak havuzdan karşılanır. Kulüpler ayrıca hukuki destek ve teminat (guarantee) sağlar.\n\n**Yasal zorunluluk:** Bazı alanlarda P&I teminatı **yasal zorunluluktur** — örneğin petrol kirliliği için **CLC (Civil Liability Convention) sertifikası**, geminin geçerli sorumluluk sigortası olduğunu kanıtlar ve limanlar bunu arar. **Gemide önemi:** Bir kirlilik, yaralanma veya yük hasarı olayında P&I devreye girer; kaptanın olayı derhâl kulübe/şirkete bildirmesi ve delilleri koruması, hem tazminatın hem hukuki savunmanın temelidir.",
      },
      {
        title: "Genel Avarya (General Average)",
        content:
          "**Genel avarya (General Average, GA)**, denizciliğin en eski ilkelerinden biridir ve mantığı şudur: **ortak bir tehlikeden gemiyi ve yükü kurtarmak için kasıtlı ve makul bir fedakârlık** yapıldığında, bu fedakârlığın maliyeti kurtarılan **tüm değerler arasında oransal olarak paylaşılır**.\n\n**Örnek fedakârlıklar:** Gemiyi yüzdürmek için **yükün bir kısmının denize atılması (jettison)**, yangını söndürmek için yüke su verilip zarar görmesi veya gemiyi kurtarmak için yapılan **olağanüstü masraflar** (kurtarma/salvage, sığınma limanı masrafı). Bu fedakârlığı bir taraf yapar ama yarar herkesindir.\n\n**Paylaşım — worked mantık:** Kayıp, kurtarılan değerlerin (**gemi + yük + navlun**) değer oranında paylaşılır. Örneğin toplam kurtarılan değer $30M (gemi $20M + yük $10M) ve GA fedakârlığı $600.000 ise; yük ilgilileri değerlerinin oranında (10/30 = 1/3) $200.000, armatör 2/3 yani $400.000 katkı yapar. Herkes **kurtarılan değeriyle orantılı** öder.\n\n**Gemide önemi:** GA, bir tarafın ortak yarar için uğradığı zararın adil paylaşımını sağlar; kaptanın 'genel avarya hareketi' (örn. jettison) kararı ve bunun **doğru belgelenmesi** (ne, neden, ne kadar atıldı/harcandı) sonraki paylaşım hesabının temelidir. GA ilanı, kayıtların titiz tutulmasını gerektirir.",
        formula: {
          text: "GA katkı payı = (Tarafın kurtarılan değeri ÷ Toplam kurtarılan değer) × GA fedakârlığı",
          description: "örn. yük 10M / toplam 30M ⇒ 1/3 × $600.000 = $200.000; gemi+yük+navlun değer oranında paylaşır",
        },
      },
      {
        title: "York-Antwerp Kuralları ve Talep Süreci",
        content:
          "Genel avaryada **hangi fedakârlık ve masrafların kabul edileceği ve nasıl hesaplanacağı**, uluslararası kabul gören **York-Antwerp Kuralları** ile düzenlenir (sözleşmeler genelde bu kurallara atıf yapar). Böylece farklı ülkelerden taraflar ortak bir çerçevede hesaplaşır.\n\n**Talep süreci:** GA ilan edildiğinde, yük ilgililerinden katkı **güvencesi** alınır — genellikle bir **general average bond (yük sahibinin taahhüdü)** ve sigortacıdan bir **average guarantee**; yük, bu güvenceler karşılığında teslim edilir (aksi hâlde teslim tutulabilir).\n\n**Dispeççi (average adjuster):** Bağımsız bir uzman olan **dispeççi**, kurtarılan değerleri ve yapılan fedakârlık/masrafları değerleyerek her tarafın **katkı payını** hesaplar; bu, teknik ve zaman alıcı bir süreçtir (bazen yıllar sürer).\n\n**Gemide önemi:** Süreç uzun ve teknik olduğundan **iyi belgeleme kritiktir** — olayın kayıtları, atılan/hasar gören yükün cinsi ve miktarı, yapılan masraflar, gemi ve yük değerleri. Kaptanın olay anındaki doğru ve eksiksiz kayıtları, hem GA'nın haklılığını hem her tarafın adil payını belirleyen delildir; eksik kayıt, hem paylaşımı hem tazminatı zora sokar.",
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
        content:
          "Deniz taşımacılığı, **arz ve talebin keskin dalgalandığı döngüsel bir piyasadır**; navlun oranları kısa sürede kat kat artıp azalabilir. Bunun nedeni, arz ile talebin çok farklı hızlarda tepki vermesidir.\n\n**Talep tarafı:** Taşıma talebi; **dünya ticareti, ürün akışları (tahıl, kömür, cevher, petrol), mevsimsellik ve ekonomik büyüme** ile belirlenir ve nispeten hızlı değişebilir.\n\n**Arz tarafı — katı ve gecikmeli:** Gemi arzı (mevcut filo + yeni inşa teslimatları − hurdaya ayırma) **kısa vadede esnek değildir**; çünkü yeni bir gemi sipariş edilince teslimi **2–3 yıl** alır. Talep aniden artınca arz hemen yetişemez, bu yüzden oranlar **hızla fırlar**.\n\n**Öz-düzeltici döngü (boom-bust):** Yüksek oranlar armatörleri **yeni gemi siparişine** teşvik eder; birkaç yıl sonra bu gemiler teslim olup **arzı şişirir** ve oranlar **düşer**; düşük oranlar siparişi durdurur ve yaşlı gemiler hurdaya gider, arz daralır, oranlar yeniden toparlanır. Bu gecikmeli geri besleme, denizciliğin klasik **boom-bust döngülerini** yaratır.\n\n**Gemide önemi:** Bu döngüsellik, aynı geminin bir yıl servet kazanıp ertesi yıl zarar edebileceği anlamına gelir; ticari kararların (kiralama süresi, alım-satım zamanlaması) tamamı bu döngünün neresinde olunduğunu okumaya dayanır. Zabit için bunun anlamı, iş yükünün ve şirket stratejisinin piyasayla birlikte dalgalanmasıdır.",
      },
      {
        title: "Piyasa Endeksleri ve Segmentler",
        content:
          "Piyasanın 'nabzı', çeşitli **endekslerle** ölçülür; bu endeksler kiralama ve yatırım kararlarına ortak referans oluşturur.\n\n**Kuru dökme yük:** **Baltic Dry Index (BDI)** ve gemi büyüklüğüne göre alt endeksler — **Capesize** (en büyük, cevher/kömür), **Panamax**, **Supramax/Ultramax**, **Handysize** — rota bazlı oranların ortalamasını yansıtır. Her sınıfın kendi yükü ve rotası vardır.\n\n**Tanker:** **Worldscale** temelli oranlar izlenir; **'dirty' (ham petrol)** ve **'clean' (rafine ürün)** segmentleri ayrılır. Baltic'in tanker endeksleri (BDTI/BCTI) bu piyasayı ölçer.\n\n**Konteyner:** Hat bazlı navlun endeksleri (ana ticaret yollarının spot oranları) kullanılır.\n\n**Segmentler bağımsız hareket eder:** Her segmentin kendi arz-talep dinamiği vardır; **kuru yük güçlüyken tanker zayıf** olabilir veya tersi. Bu, filo çeşitlendirmesinin bir mantığıdır. **Gemide önemi:** Bir geminin hangi segmentte olduğu, o geminin (ve üzerindeki ekibin iş yoğunluğunun) hangi piyasa koşullarına maruz kaldığını belirler; endeksler, teklif edilen bir çarterin piyasaya göre iyi mi kötü mü olduğunu ölçmenin nesnel yoludur.",
      },
      {
        title: "Risk Türleri ve Yönetimi",
        content:
          "Denizcilik **çok boyutlu risk** taşır ve başarılı işletme, bu riskleri tanıyıp yönetmeye dayanır.\n\n**Risk türleri:** **Piyasa/navlun riski** (oranların düşmesi); **bunker fiyat riski** (yakıtın pahalanması); **faiz ve döviz kuru riski** (finansman ve farklı para birimleri); **karşı taraf/kredi riski** (kiracı veya yük sahibinin ödememesi); **operasyonel risk** (kaza, gecikme, off-hire); ve **düzenleyici risk** (yeni çevre/emniyet kuralları — örn. CII, kükürt sınırı — uyum maliyeti).\n\n**Yönetim araçları:** **Uzun vadeli sözleşmeler** (time charter, COA) geliri sabitleyip piyasa riskini azaltır; **navlun türevleri (Forward Freight Agreements, FFA)** navlun riskini finansal olarak hedge eder; **bunker hedging/BAF** yakıt riskini yönetir; **sigorta (H&M, P&I)** fiziki ve sorumluluk riskini transfer eder; **çeşitlendirme** (farklı segment/rota) tek bir piyasaya bağımlılığı azaltır.\n\n**Denge şart:** Aşırı risk almak (tümüyle spot piyasada kalmak) da, aşırı temkin (her şeyi uzun vadeli bağlayıp piyasa yükselince kazançtan mahrum kalmak) da sakıncalıdır; sağlıklı strateji **farklı sözleşme tiplerini ve teminatları birlikte** kullanır. **Gemide önemi:** Bu risk yönetimi kararları şirket düzeyinde alınsa da, operasyonel risk (kaza, gecikme, off-hire) doğrudan gemide yönetilir — yani mürettebatın emniyet ve verimlilik disiplini, şirketin risk tablosunun bir parçasıdır.",
      },
      {
        title: "Gemi Alım-Satımı ve Değer",
        content:
          "**Gemi alım-satımı (Sale and Purchase, S&P)**, denizciliğin en büyük **sermaye kararıdır**; doğru zamanlama servet, yanlış zamanlama iflas getirebilir.\n\n**Değeri ne belirler:** Bir geminin değeri; **yaşı, tipi, durumu, sınıf/sörvey statüsü** ve özellikle **piyasanın o anki seviyesi** ile belirlenir. Kritik nokta şudur: **yüksek navlun beklentisi gemi fiyatlarını yükseltir** (gemi gelecekteki kazancı temsil eder), düşük beklenti düşürür — yani gemi fiyatları da navlun gibi döngüseldir.\n\n**Asset play:** **'Asset play'** stratejisinde gemi **dip seviyede ucuza alınıp** piyasa yükselince **pahalıya satılarak** kâr hedeflenir; bu, doğru zamanlama gerektirir ve çok risklidir (piyasa beklenenden farklı hareket edebilir).\n\n**Ömür sonu — hurda:** Gemi ekonomik ömrünü doldurunca **hurda (demolition/recycling) değeriyle** satılır; hurda fiyatları da **çelik piyasasıyla** dalgalanır ve düşük navlun dönemlerinde yaşlı gemilerin hurdaya gitmesi arzı azaltarak döngüyü dengeler.\n\n**Gemide önemi:** S&P kararları, navlun piyasası beklentisi ve finansman koşullarıyla birlikte değerlendirilir; bir zabit için bunun somut karşılığı, çalıştığı geminin satılabileceği, alıcı sörveyine (pre-purchase inspection) girebileceği veya ömür sonunda söküme gidebileceğidir — geminin **bakımlı ve iyi belgelenmiş** olması, bu kararlarda doğrudan değerini artırır.",
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
