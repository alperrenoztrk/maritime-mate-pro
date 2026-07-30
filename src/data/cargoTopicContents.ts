import type { TopicDetailContent } from "@/data/navigationTopicContents";

/**
 * Yük Elleçleme ve İstifleme — "Dersler Beta" okunabilir konu anlatımı.
 *
 * İçerik gerçek denizcilik standartlarına dayanır (SOLAS Bölüm VI/VII, IMSBC Code,
 * International Grain Code, CSS Code, IMDG Code, Draft Survey UN/ECE kılavuzu).
 * `TopicSection.title` değerleri lessonFlow/cargo.ts içindeki `sectionRef` ve
 * `sectionTitles` ile birebir eşleşir.
 */
export const cargoTopicContents: Record<string, TopicDetailContent> = {
  "İstif Faktörü ve Broken Stowage": {
    title: "İstif Faktörü ve Broken Stowage",
    introduction:
      "İstif faktörü (Stowage Factor, SF), bir ton yükün istiflendiğinde işgal ettiği hacmi (m³/t veya ft³/t) ifade eder ve yük planlamasının temel büyüklüğüdür. Bir ambarın ne kadar yük alacağı, geminin hacim mi yoksa ağırlık (deadweight) sınırına mı önce ulaşacağı doğrudan SF ile belirlenir. Gerçek istifte yükler arasında ve gemi yapısı nedeniyle kullanılamayan boşluklar (broken stowage) kalır; bu nedenle net taşınabilir miktar her zaman teorik hesabın altındadır.",
    sections: [
      {
        title: "İstif Faktörü Tanımı ve Hesabı",
        content:
          "İstif faktörü (SF), yükün **birim ağırlığının kapladığı hacimdir**: SF = V / W (m³/t).\n\n**İki uç:** **Düşük SF** yükler (demir cevheri ~0,4 m³/t) ağır ve yoğundur → gemi **hacim dolmadan deadweight sınırına** ulaşır (**deadweight cargo**). **Yüksek SF** yükler (pamuk ~2,0 m³/t, kereste) hafif ve hacimlidir → gemi **ağırlık sınırına ulaşmadan ambar dolar** (**measurement/volume cargo**).\n\n**Worked örnek:** 5.000 t, SF = 1,4 m³/t yük için gereken hacim V = 5.000 × 1,4 = **7.000 m³**. Ambar 6.000 m³ ise yük **sığmaz** (hacim sınırı); 9.000 m³ ise ambar yarı boş kalır ama ağırlık dolmuş olabilir.\n\n**Gemide önemi:** Planlamada önce **hangi sınıra** (ağırlık mı, hacim mi) önce ulaşılacağı belirlenir; bu, ambar doluluk stratejisini ve navlun gelirini yönlendirir. Yanlış SF, ambarı yarı boş bırakır (gelir kaybı) veya yük plana sığmaz.",
        formula: {
          text: "V = W × SF",
          description: "V: gereken hacim (m³), W: yük ağırlığı (t), SF: istif faktörü (m³/t)",
        },
      },
      {
        title: "Broken Stowage (Kayıp Hacim)",
        content:
          "**Broken stowage**, ambardaki **kullanılamayan boşlukların** toplam hacme oranıdır. Düzensiz biçimli yüklerde (varil, makine, kutu) ve gemi yapısındaki braket, perde ve frame nedeniyle oluşur.\n\n**Tipik oranlar:** torbalı yük %10-15, balyalı %10, variller %20-30, düzensiz genel yük %25'e kadar.\n\n**Hesap:** Net istiflenebilir hacim = ambar net hacmi × (1 − BS). **Worked örnek:** 6.000 m³ ambar, %20 broken stowage → Vnet = 6.000 × (1 − 0,20) = **4.800 m³** fiilen kullanılabilir.\n\n**Azaltma:** Broken stowage; **dunnage** (istif tahtası), boşlukları dolduran **filler** yükler ve dikkatli istif planıyla düşürülür.\n\n**Gemide önemi:** Net taşınabilir miktar daima teorik hacmin altındadır; broken stowage'ı hesaba katmayan plan, son anda ambara sığmayan yükle sonuçlanır.",
        formula: {
          text: "Vnet = Vambar × (1 − BS)",
          description: "Vnet: net istiflenebilir hacim, Vambar: ambar net hacmi, BS: broken stowage oranı (ondalık)",
        },
      },
      {
        title: "Bale ve Grain Kapasitesi",
        content:
          "Ambar hacmi **iki şekilde** verilir ve yükün cinsine göre doğru olanı kullanılır.\n\n**Grain (tahıl) kapasitesi:** Dökme akışkan yükün frame ve braket aralarını da doldurduğu varsayımıyla ölçülen **toplam iç hacim** — en büyük değer.\n\n**Bale kapasitesi:** Ambalajlı/balyalı yükler için, frame iç yüzeyine ve **cargo battens'a** kadar olan kullanılabilir hacim; tipik olarak grain'den **%7-10 daha düşük** (yük frame aralarına giremez).\n\n**Gemide önemi:** Dökme tahıl için **grain**, genel/ambalajlı yük için **bale** kapasitesi esas alınır; ikisini karıştırmak, ambalajlı yükte ~%10'luk hacmi 'varmış gibi' saymaya ve plan hatasına yol açar.",
      },
      {
        title: "Yoğunluk, Ağırlık ve Hacim Dengesi",
        content:
          "Ekonomik yükleme, ağırlık ve hacim kapasitesinin **birlikte** kullanılmasını ister. İdeal durum **'full and down'**: gemi hem deadweight hem hacim sınırına **aynı anda** ulaşır — hiçbir kapasite boşa gitmez.\n\n**Nasıl yaklaşılır:** Farklı SF'li yükler **birlikte** taşınır; ağır yük (düşük SF) ambar **tabanına**, hafif yük (yüksek SF) **üste** istiflenir. Böylece hem hacim dolar hem de ağırlık merkezi (**KG**) alçak tutularak stabilite korunur.\n\n**Worked mantık:** Yalnız ağır yük → gemi hacim dolmadan draft'a oturur (ambar boş = gelir kaybı). Yalnız hafif yük → ambar dolar ama draft'a oturmaz (deadweight boşa gider). Karışım ikisini dengeler.\n\n**Gemide önemi:** Yanlış SF tahmini ya ambarları yarı boş bırakır ya da plana sığmayan yük üretir; SF, yük planının en kritik girdisidir.",
      },
    ],
    keyPoints: [
      "İstif faktörü SF = V/W; düşük SF ağır (deadweight) yük, yüksek SF hacimli (measurement) yüktür.",
      "Broken stowage kullanılamayan boşluktur; Vnet = Vambar × (1 − BS).",
      "Grain kapasitesi toplam iç hacim, bale kapasitesi ambalajlı yük için ~%7-10 daha düşüktür.",
      "Ekonomik hedef 'full and down': ağırlık ve hacim sınırına birlikte ulaşmak.",
    ],
  },

  "Yük Planı ve Ağırlık Dağılımı": {
    title: "Yük Planı ve Ağırlık Dağılımı",
    introduction:
      "Yük planı (cargo/stowage plan), hangi yükün hangi ambara, ne miktarda ve hangi sırayla yükleneceğini gösteren temel operasyonel belgedir. İyi bir plan; deadweight'i aşmadan, izin verilen draft ve trim sınırları içinde, yeterli stabilite (GM) ve kabul edilebilir tekne mukavemeti (bending moment, shear force) sağlayacak şekilde ağırlığı dağıtır. Aynı zamanda boşaltma limanı sırasına göre erişilebilirliği gözetir.",
    sections: [
      {
        title: "Deadweight ve Yük Kapasitesi",
        content:
          "Deadweight (DWT), geminin yaz draftında taşıyabileceği toplam ağırlıktır: yük + yakıt + yağ + su + kumanya + mürettebat + safra. Net taşınabilir yük (cargo deadweight) = DWT − (bunker + tatlı su + yağlar + sabit ağırlıklar + safra). Plan yapılırken önce sefer için gereken yakıt ve su rezervi ayrılır, kalan kapasite yüke tahsis edilir. Yükleme limanında deniz suyu yoğunluğu (dock water allowance) ve varış limanına kadar tüketilecek bunker da hesaba katılır; aksi hâlde gemi yola çıkışta veya varışta draft sınırını aşabilir.",
      },
      {
        title: "Ağırlık Dağılımı ve Tekne Mukavemeti",
        content:
          "Yük gemi boyunca dengesiz dağıtılırsa tekne kirişinde aşırı eğilme momenti (bending moment) ve kesme kuvveti (shear force) oluşur. İki kritik durum vardır: hogging (orta kısım üste, baş-kıç aşağı eğilir; ağır yük başlara/kıça yığılınca) ve sagging (orta kısım aşağı sarkar; ağır yük ortaya yığılınca). Yük, ambarlar arasında dengeli dağıtılarak bu kuvvetler sınıflandırma kuruluşunun izin verdiği yüzdelerin altında tutulur. Modern gemilerde loading computer, her yükleme adımında bending moment ve shear force değerlerini izin sınırlarıyla karşılaştırır.",
      },
      {
        title: "Draft, Trim ve List Kontrolü",
        content:
          "Plan, izin verilen maksimum draft (load line markası) içinde kalmalı ve uygun trim sağlamalıdır. Hafif kıç trimi (kıç draftı baş draftından biraz fazla) genelde manevra ve sevk verimi için tercih edilir. Boyuna ağırlık merkezi (LCG) ile boyuna sıfırlık merkezi (LCF/LCB) arasındaki fark trimi belirler. Enine dengesizlik liste (yan yatma) yaratır; yük ve safra simetrik dağıtılarak list sıfıra yakın tutulur. Aşırı trim veya list; sevk verimini düşürür, görüş ve manevrayı bozar, pervane/dümeni suyun dışına çıkarabilir.",
      },
      {
        title: "Boşaltma Sırası ve Erişilebilirlik",
        content:
          "Çok limanlı seferlerde plan, boşaltma limanı sırasına göre yapılır: ilk boşaltılacak yük en erişilebilir konuma (üst tabaka veya kapak altı) yerleştirilir. Aksi hâlde bir limandaki yüke ulaşmak için başka limanın yükünü kaldırıp tekrar yüklemek gerekir (over-stowage / shifting), bu da zaman ve maliyet kaybıdır. Plan ayrıca uyumsuz yüklerin ayrılmasını (segregation) ve hassas yüklerin korunmasını da dikkate alır.",
      },
    ],
    keyPoints: [
      "Cargo deadweight = DWT − (bunker + su + yağ + sabit ağırlık + safra).",
      "Dengesiz dağıtım hogging/sagging yaratır; bending moment ve shear force sınır içinde tutulur.",
      "Plan; draft, trim ve list'i izin verilen değerlerde tutmalıdır.",
      "Boşaltma sırasına göre istif, over-stowage ve shifting maliyetini önler.",
    ],
  },

  "Draft Survey ile Yük Hesabı": {
    title: "Draft Survey ile Yük Hesabı",
    introduction:
      "Draft survey, geminin yükleme öncesi ve sonrası su çekimlerini (draft) okuyarak yüklenen/boşaltılan dökme yük miktarını Arşimet prensibiyle belirleme yöntemidir. Dökme yüklerin ticaretinde kantar bulunmayan limanlarda kabul gören resmî tartım yöntemidir. Doğru yapılırsa hata payı genellikle %0.5'in altındadır.",
    sections: [
      {
        title: "Arşimet Prensibi ve Deplasman",
        content:
          "Yüzen bir gemi, **batan hacmi kadar suyun ağırlığına eşit** bir kaldırma kuvvetiyle desteklenir (Arşimet). Dolayısıyla geminin toplam ağırlığı — **deplasman (Δ)** — o draftta yer değiştirdiği su ağırlığına eşittir.\n\n**Yöntemin özü:** Draft survey, yükleme öncesi ve sonrası deplasman farkından yük ağırlığını bulur: **Yük = Δsonra − Δönce**. Deplasman, geminin **hidrostatik tablolarından** (veya deplasman ölçeğinden) ortalama drafta karşılık gelen değer okunarak elde edilir.\n\n**Neden güvenilir:** Kantar bulunmayan limanlarda dökme yük ticaretinin resmî tartım yöntemidir; doğru yapılırsa hata **%0,5'in altındadır** — 50.000 t'luk yükte ~250 t. Bu yüzden her adım (draft okuma, yoğunluk, deductibles) titizlikle yapılır.\n\n**Gemide önemi:** Yükün parası bu hesaba göre ödenir; küçük bir okuma/yoğunluk hatası doğrudan ticari anlaşmazlık ve para kaybı demektir.",
        formula: {
          text: "Yük = Δsonra − Δönce",
          description: "Δ: ilgili draftta okunan deplasman (ton); fark yüklenen/boşaltılan yük miktarıdır",
        },
      },
      {
        title: "Draft Okuma ve Ortalama Draft",
        content:
          "Toplam **altı draft markası** okunur: baş, orta ve kıç için **iskele + sancak**. Amaç, teknenin bel verme/sarkma (**hogging/sagging**) kavisini düzeltip gerçek ortalama drafti bulmaktır.\n\n**Mean of means (kavis düzeltmesi):**\n1. Baş ve kıç ortalaması (mean).\n2. Bu değerle orta draftın ortalaması (mean of mean).\n3. **Quarter mean = (mean of mean + orta draft) / 2** — kavis etkisini giderir.\n\nAyrıca marka ile perpendiküler arasındaki mesafe için **trim düzeltmesi** uygulanır (markalar tam baş/kıç dikmede olmadığından).\n\n**Gemide önemi:** Kavisli bir teknede yalnız baş-kıç ortalaması almak yüzlerce ton hata verir; 'mean of means' bu yüzden zorunludur. Okuma, dalgalı suda birkaç okumanın ortalamasıyla yapılır.",
      },
      {
        title: "Yoğunluk ve Düzeltmeler",
        content:
          "Hidrostatik tablolar **standart deniz suyu yoğunluğuna** (genelde 1,025 t/m³) göre hazırlanır. Liman suyu daha tatlı/tuzlu olabileceğinden gerçek yoğunluk **hidrometreyle ölçülür** ve deplasman oranlanarak düzeltilir: **Δgerçek = Δtablo × (ρliman / 1,025)**.\n\n**Worked örnek:** Tablo deplasmanı 40.000 t, liman suyu 1,010 t/m³ ise Δgerçek = 40.000 × (1,010 / 1,025) ≈ **39.415 t** — düzeltme ~585 t! Bu yüzden yoğunluk ihmal edilemez.\n\n**Trim düzeltmeleri:** LCF'in orta kesitten sapması nedeniyle **birinci ve ikinci trim düzeltmesi** uygulanır; büyük trimde bunlar önemli fark yaratır.\n\n**Gemide önemi:** Yoğunluk ve trim düzeltmeleri atlanırsa birkaç yüz tonluk hata olur; bu da doğrudan yanlış fatura demektir.",
        formula: {
          text: "Δgerçek = Δtablo × (ρliman / 1.025)",
          description: "ρliman: hidrometre ile ölçülen liman suyu yoğunluğu (t/m³)",
        },
      },
      {
        title: "Deductibles ve Net Yük",
        content:
          "Draft survey **tüm** ağırlığı ölçer; ama yük olmayanlar çıkarılmalıdır. **Deductibles** (yüke ait olmayan değişken ağırlıklar): yakıt (HFO/MGO), yağlar, **balast suyu**, tatlı su, slop ve atık.\n\n**Hesap:** Net yük = (deplasman farkı) − (deductibles farkı). Yükleme öncesi ve sonrası her kalem **ayrı ayrı** ölçülür (tank sounding / iskandil).\n\n**En büyük hata kaynağı:** Tank ölçümlerindeki dikkatsizlik draft survey hatalarının başıdır — özellikle **unutulan/yanlış ölçülen balast**. 100 t'luk balast farkı doğrudan 100 t yük hatasıdır.\n\n**Gemide önemi:** Bu yüzden tüm tanklar her iki survey'de de **eksiksiz** iskandil edilir; survey öncesi balast transferi yapılmaz ve balast durumu sertifikada beyan edilir.",
      },
    ],
    keyPoints: [
      "Draft survey, deplasman farkıyla yük miktarını bulur: Yük = Δsonra − Δönce.",
      "Altı draft okunur; mean-of-means ve trim düzeltmesiyle kavis etkisi giderilir.",
      "Liman suyu yoğunluğu ölçülür ve deplasman ρ/1.025 ile düzeltilir.",
      "Net yük için yakıt, balast, su gibi deductibles farkı çıkarılır.",
    ],
  },

  "Katı Dökme Yükler ve IMSBC Code": {
    title: "Katı Dökme Yükler ve IMSBC Code",
    introduction:
      "Katı dökme yükler (kömür, demir cevheri, tahıl, çimento, nikel cevheri vb.) kendine özgü tehlikeler taşır ve IMSBC Code (International Maritime Solid Bulk Cargoes Code) ile düzenlenir. Code, her yük için taşıma şartlarını, tehlikeleri ve önlemleri tanımlar. En kritik tehlikeler yükün sıvılaşması (liquefaction), oksijen tüketimi/zehirli gaz çıkışı ve kendiliğinden ısınmadır.",
    sections: [
      {
        title: "IMSBC Grupları (A, B, C)",
        content:
          "IMSBC Code, katı dökme yükleri **üç gruba** ayırır:\n\n- **Grup A — sıvılaşabilenler:** Nem fazlalığında akışkanlaşır (nikel cevheri, demir cevheri konsantresi, bazı kömürler). En sinsi tehlike.\n- **Grup B — kimyasal tehlike:** Yanıcı, oksitleyici, oksijen tüketen veya zehirli gaz çıkaran (kömür, doğrudan indirgenmiş demir/DRI, sülfürlü cevherler).\n- **Grup C — tehlikesiz:** Ne sıvılaşan ne kimyasal tehlike (çakıl, klinker, iri taneli yükler).\n\nBir yük **hem A hem B** özelliği taşıyabilir (ör. bazı sülfürlü konsantreler).\n\n**Belge zorunluluğu:** Yükleme öncesi **sevkiyatçı (shipper)**, yükün doğru sınıfını ve özelliklerini (nem, TML, açı vb.) içeren **beyanı (shipper's declaration)** vermek **zorundadır**.\n\n**Gemide önemi:** Grup, tüm taşıma önlemlerini belirler; kaptan beyanı sorgulamadan kabul etmez — pek çok kayıp gemi, yanlış/eksik beyan edilmiş Grup A yükünden kaynaklanmıştır.",
      },
      {
        title: "Sıvılaşma ve Transportable Moisture Limit (TML)",
        content:
          "**Grup A** yüklerde nem belirli bir eşiği aşarsa, geminin titreşim ve hareketiyle yük **katı davranıştan akışkan davranışa** geçer (**liquefaction**). Akışkanlaşan yük bir tarafa kayıp geri dönmez; ani, düzeltilemez **liste** ve hatta **alabora** yaratır.\n\n**Kontrol — nem eşiği:** Yükün nem içeriği (**moisture content**), **Transportable Moisture Limit (TML)** değerinin **altında** olmalıdır. TML genellikle Flow Moisture Point'in %90'ıdır: **TML = 0,90 × FMP**.\n\n**Saha kontrolü:** Şüphe varsa kaptan basit bir **'can test'** yapabilir (numune kaba konup vurulur; yüzeyde su/parlaklık çıkarsa nem yüksektir) — ama resmî karar **laboratuvar sertifikasına** dayanır. Nem TML'yi aşıyorsa **yük reddedilir**.\n\n**Gemide önemi:** Sıvılaşma, modern dökme yük gemisi kayıplarının başlıca nedenidir (özellikle yağmur sezonunda yüklenen nikel cevheri); kaptanın 'reddetme' yetkisini kullanması hayat kurtarır.",
        formula: {
          text: "TML = 0.90 × FMP",
          description: "FMP: Flow Moisture Point (akış nem noktası); yük nemi TML'nin altında olmalıdır",
        },
      },
      {
        title: "Kimyasal Tehlikeler (Grup B)",
        content:
          "Bazı dökme yükler **kimyasal** tehlike taşır; her biri IMSBC kayıt sayfasındaki özel önlemleri gerektirir:\n\n- **Kömür:** **metan** (patlayıcı) salar, **kendiliğinden ısınır** ve **oksijeni tüketir** → ambar havalandırması + sıcaklık + gaz (metan, CO) izleme.\n- **DRI (doğrudan indirgenmiş demir):** suyla temasta **hidrojen** açığa çıkarır ve ısınır → **inert (azot) ortam**, su kesinlikle yasak.\n- **Sülfürlü cevherler:** oksijeni tüketir → kapalı alanı **ölümcül** kılar.\n\n**Ortak tehlike — kapalı alan:** Oksijen tüketen yükler nedeniyle ambara giriş, **kapalı alan prosedürü** (gaz ölçümü, giriş izni) olmadan asla yapılmaz.\n\n**Gemide önemi:** Her Grup B yükünün ventilasyon, izleme ve **su kullanımı yasağı** gibi önlemleri **harfiyen** uygulanır; 'yanlış yükü yanlış söndürmek' (ör. DRI'ye su) felakete yol açar.",
      },
      {
        title: "Trimleme ve Yük Kayması",
        content:
          "Dökme yükler ambarda **düzgün trimlenmeli** (yayılmalı) ki yüzey düz olsun ve seyirde **kayma (shifting)** riski azalsın.\n\n**Neden kritik:** Düşük **yığılma açısı (angle of repose)** olan yükler (tane, bazı cevherler) kolay kayar. Yetersiz trim ambarda boşluk ve **dengesiz yüzey** bırakır; gemi yalpaladıkça yük bir tarafa kayar ve kalıcı **liste** oluşur — sıvılaşmaya benzer bir stabilite tehlikesi.\n\n**Kural:** IMSBC, yük cinsine göre trimleme gerekliliklerini (ör. 'trimmed reasonably level') belirtir; **tahıl** için ayrıca **Grain Code**'un özel kuralları uygulanır (bkz. Tahıl stabilitesi).\n\n**Gemide önemi:** Düzgün trim hem stabilite hem de yükün homojen boşaltımı içindir; 'göz kararı' trim, yalpada tehlikeli yüzey kayması riski taşır.",
      },
    ],
    keyPoints: [
      "IMSBC yükleri 3 gruba ayırır: A (sıvılaşan), B (kimyasal tehlike), C (tehlikesiz).",
      "Grup A yüklerde nem TML'nin (≈0.90×FMP) altında olmalı; aksi hâlde sıvılaşma riski.",
      "Grup B yükler (kömür, DRI, sülfürlü cevher) gaz/ısınma/oksijen tüketimi tehlikesi taşır.",
      "Düzgün trimleme, yük kaymasını ve tehlikeli liste oluşumunu önler.",
    ],
  },

  "Tahıl Yükleri ve Tahıl Stabilitesi": {
    title: "Tahıl Yükleri ve Tahıl Stabilitesi",
    introduction:
      "Tahıl (buğday, mısır, soya, arpa vb.) dökme taşındığında akışkan davranabilir: gemi yalpaladıkça tahıl yüzeyi kayar ve ağırlık merkezi yana kayarak yatırıcı moment yaratır. Bu nedenle tahıl taşımacılığı, International Grain Code (SOLAS Bölüm VI) ile özel stabilite kriterlerine bağlanmıştır. Yükleme öncesi 'Grain Loading Manual' ve onaylı hesaplar zorunludur.",
    sections: [
      {
        title: "Tahıl Kayması ve Heeling Moment",
        content:
          "Tahıl (buğday, mısır, soya, arpa) dökme taşındığında **akışkan davranır**: gemi yalpaladıkça yüzey kayar ve ağırlık merkezi yana giderek **yatırıcı moment** doğurur.\n\n**Kayma mekanizması:** Yük **oturma (settling)** sonrası üstte ~%2-3 boşluk bırakır. Yalpada tahıl yüzeyi yaklaşık **15°'ye kadar** kayar; dolu ambarlarda bile bu **varsayılan hacimsel kayma momenti** hesaba katılır.\n\n**Standart varsayım:** Grain Code, dolu ve kısmen dolu (**slack**) ambarlar için **varsayılan** hacimsel kayma momentlerini **tablolar** hâlinde verir — gerçek kayma ölçülmez, güvenli tarafta kalmak için standart bir varsayım kullanılır.\n\n**Gemide önemi:** Slack (kısmen dolu) ambar en tehlikelisidir; serbest yüzeyi büyük olduğundan kayma momenti yüksektir. Bu yüzden ambarlar mümkünse **tam dolu ve trimli** yüklenir.",
      },
      {
        title: "Grain Code Stabilite Kriterleri",
        content:
          "**International Grain Code (SOLAS VI)** üç zorunlu kriter koyar; hepsi yükleme öncesi doğrulanmalıdır:\n\n1. **Yatma açısı:** Tahıl kaymasından doğan heel **≤ 12°** (veya güverte kenarının suya girdiği açı — hangisi küçükse).\n2. **Artık dinamik stabilite:** Heeling arm ile righting arm eğrileri arasında kalan **residual area ≥ 0,075 metre-radyan**.\n3. **Başlangıç GM:** Düzeltilmiş **GM ≥ 0,30 m**.\n\n**Neden bu üçü:** (1) aşırı yatmayı, (2) yattıktan sonra doğrulma enerjisini, (3) başlangıç sağlamlığını garanti eder — üçü birlikte tahıl kaymasına karşı yeterli emniyet marjı verir.\n\n**Gemide önemi:** Bu kriterler **onaylı Grain Loading Manual** ve gemiye özel hesaplarla doğrulanır; sağlanmıyorsa yükleme düzeni (ambar doluluğu, shifting board) değiştirilir.",
        formula: {
          text: "Residual area ≥ 0.075 m·rad ; heel ≤ 12° ; GM ≥ 0.30 m",
          description: "International Grain Code (SOLAS VI) zorunlu tahıl stabilite kriterleri",
        },
      },
      {
        title: "Yapısal Önlemler: Saddle, Feeder, Bundling",
        content:
          "Tahıl kaymasını **fiziksel** olarak azaltan önlemler:\n\n- **Shifting boards (ahşap perdeler):** Kısmen dolu ambarda yüzeyi boydan bölerek serbest kayma yüzeyini küçültür.\n- **Bundling / strapping:** Yüzeyi kayış/örtüyle sabitleme.\n- **Saddle (eyer) + overstowing:** Dolu ambarda üstte eyer biçiminde yığın ve yan boşlukların **torbalı tahılla** doldurulması.\n- **Feeder:** Settling sonrası oluşan boşluğu üstten besleyip kapatan düzenek (slack yüzeyi yok eder).\n\n**Modern tercih:** Onaylı **'filled compartment, trimmed'** düzenlemeleri; bu sayede slack yüzey ve kayma momenti en aza iner, ek yapı gerekmez.\n\n**Gemide önemi:** Bu önlemler kriterleri sağlamanın pratik yoludur; hesap 'sınırda' çıkıyorsa fiziksel önlemle kayma momenti düşürülüp emniyet marjı büyütülür.",
      },
      {
        title: "Belgelendirme ve Yetki",
        content:
          "Tahıl yüklemek için geminin iki belgesi olmalıdır: **Document of Authorization** (tahıl yükleme yetki belgesi) ve onaylı **Grain Loading Manual**.\n\n**Yükleme planı** her ambardaki tahıl ağırlığını, **varsayılan heeling momentlerini** ve sonuç stabilite kontrolünü içerir; yükleme öncesi yetkili otorite/surveyör tarafından **onaylanır**.\n\n**Yetki belgesi yoksa:** Gemi ancak Code'un öngördüğü **en kısıtlı** koşullarda ve idare onayıyla tahıl taşıyabilir (pratikte çok sınırlı).\n\n**Gemide önemi:** Belge ve onaylı hesap olmadan tahıl yüklemek hem yasa dışı hem tehlikelidir; sörvey onayı, kriterlerin sağlandığının resmî kanıtıdır.",
      },
    ],
    keyPoints: [
      "Tahıl yalpada kayarak heeling moment yaratır; Grain Code varsayılan kayma momentleri verir.",
      "Kriterler: heel ≤ 12°, residual area ≥ 0.075 m·rad, GM ≥ 0.30 m.",
      "Shifting boards, saddle, feeder ve overstowing kaymayı fiziksel olarak azaltır.",
      "Document of Authorization ve onaylı Grain Loading Manual zorunludur.",
    ],
  },

  "Yük Bağlama ve Sıkıştırma (CSS Code)": {
    title: "Yük Bağlama ve Sıkıştırma (CSS Code)",
    introduction:
      "Genel yük, proje yükü, çelik ve konteyner gibi üniteler, seyir sırasında geminin hareketleriyle (yalpa, baş-kıç vurma, dikine ivme) yer değiştirmeye karşı bağlanır ve sıkıştırılır (securing & lashing). Uygulama, IMO CSS Code (Code of Safe Practice for Cargo Stowage and Securing) ve gemiye özel onaylı Cargo Securing Manual (CSM) ile düzenlenir. Yanlış bağlama; yük kaybı, hasar, list ve can güvenliği riskidir.",
    sections: [
      {
        title: "Yükü Etkileyen Kuvvetler",
        content:
          "Denizde yüke etki eden kuvvetler, geminin **altı serbestlik derecesindeki** hareketinden doğar: **yalpa (roll)** en büyük **enine** ivmeyi; baş-kıç vurma (pitch) ve dalıp çıkma (heave) boyuna ve dikine ivmeleri yaratır.\n\n**Tasarım ivmeleri:** CSS Code, gemi büyüklüğü ve hıza göre tasarım ivmelerini (**g cinsinden**) tablolar hâlinde verir. Bağlama hesabı, yükün ağırlığından doğan **atalet kuvvetlerinin** (enine, boyuna, dikine) bağlama ve sürtünme dirençleriyle **dengelenmesini** sağlar.\n\n**En kritik yön:** Genellikle **enine (yalpa)** yöndür — yalpa ivmesi en büyük olduğundan, yükün yana kaymasına karşı direnç tasarımın odağıdır.\n\n**Gemide önemi:** Ağır havada ivmeler artar; bu yüzden bağlama, en kötü beklenen deniz durumuna göre hesaplanır, 'sakin hava' varsayımıyla değil.",
      },
      {
        title: "Sürtünme ve Bağlama Direnci",
        content:
          "Yükün kaymaya karşı **ilk** direnci, taban ile yük arasındaki **sürtünmedir**: Fsürtünme = μ × m × g.\n\n**Sürtünme katsayısı (μ)** yüzey çiftine bağlıdır: çelik-çelik ~0,1; kereste-çelik ~0,3; kauçuk/anti-slip mat ~0,6. Yani basit bir anti-slip mat sürtünmeyi altı katına çıkarıp bağlama ihtiyacını ciddi azaltabilir.\n\n**Bağlama devreye girer:** Sürtünme yetmediğinde zincir, çelik halat, web lashing tutar. Her elemanın **MSL (Maximum Securing Load)** değeri vardır — genelde kopma yükünün bir oranı (çelik halat ~%80, zincir ~%50).\n\n**Denge koşulu:** Toplam etkin bağlama kapasitesi, atalet kuvvetinden sürtünme direnci düşülen değeri karşılamalıdır: **Σ(MSL etkin) ≥ Fatalet − μ·m·g**.\n\n**Gemide önemi:** Anti-slip mat + doğru MSL seçimi güvenli ve ekonomik bağlamanın anahtarıdır; sürtünmeyi hesaba katmadan yalnız bağlamaya güvenmek hem pahalı hem gereksizdir.",
        formula: {
          text: "Σ(MSL etkin) ≥ Fatalet − μ × m × g",
          description: "Bağlamaların etkin direnci, atalet kuvvetinden sürtünme direnci çıkarılan değeri karşılamalı",
        },
      },
      {
        title: "Bağlama Elemanları ve Açı Etkisi",
        content:
          "Bağlama elemanları (lashing chain, wire rope, web/textile lashing, **turnbuckle/gergi**), yük ile güverte sabitleme noktaları (D-ring, lashing pot, container fitting) arasına gerilir.\n\n**Açı etkisi:** Bir bağlamanın **enine kaymaya katkısı** yatay ve dikey açısına bağlıdır. Dik (düşeye yakın) açıyla bağlanan eleman kuvvetini **düşey bileşene** harcar ve enine tutmaya az katkı verir. En verimli bağlama, beklenen kayma yönüne **mümkün olduğunca yatay ve karşı** yönde gerilen elemandır.\n\n**Ön gerdirme:** Bağlamalar **simetrik** dağıtılır ve **önceden gerdirilir (pre-tension)** ki yük hareket etmeden direnç oluşsun; gevşek bağlama, yük birkaç santim kayıp 'çarparak' yüklendiğinde kopar.\n\n**Gemide önemi:** 'Çok sayıda ama kötü açılı' bağlama, 'az ama doğru açılı'dan zayıftır; bağlama sayısı değil, **etkin yatay bileşen** önemlidir.",
      },
      {
        title: "Cargo Securing Manual ve Kontrol",
        content:
          "**300 GT ve üzeri** yük gemileri için onaylı **Cargo Securing Manual (CSM)** zorunludur; sabit ve taşınabilir bağlama ekipmanı, izin verilen kuvvetler ve tipik yükler için bağlama düzenleri burada tanımlanır.\n\n**Kontrol döngüsü:** Bağlamalar yükleme sonrası kontrol edilir; seyirde **düzenli** (özellikle ağır hava öncesi/sonrası) tekrar gerdirilir ve güverte günlüğüne kaydedilir. Zincir/halat seyir sırasında gevşer (yük oturması, sıcaklık), bu yüzden periyodik kontrol şarttır.\n\n**Havayla azaltma:** Ağır hava beklendiğinde **rota/hız ayarı (weather routeing)** ile yükteki ivmeler azaltılır; böylece bağlama yükü doğrudan düşer — bazen en iyi 'bağlama', dalga yükünü azaltan bir rota/hız kararıdır.\n\n**Gemide önemi:** Konteyner ve çelik yük kayıplarının çoğu gevşemiş/kontrol edilmemiş bağlamadandır; CSM'e uymak hem yasal zorunluluk hem yük ve can emniyetidir.",
      },
    ],
    keyPoints: [
      "CSS Code, gemi hareketinden doğan enine/boyuna/dikine ivmelere göre bağlama hesabı yapar.",
      "İlk direnç sürtünmedir (μ×m×g); yetersizse bağlamalar MSL kapasitesiyle devreye girer.",
      "Bağlama verimi açıya bağlıdır; en verimli bağlama yatay ve kayma yönüne karşıdır.",
      "Onaylı Cargo Securing Manual zorunludur; bağlamalar seyir boyunca kontrol edilir.",
    ],
  },

  "Konteyner Yükleme ve Bay Planı": {
    title: "Konteyner Yükleme ve Bay Planı",
    introduction:
      "Konteyner gemilerinde yük, standart ISO konteynerler hâlinde hücrelere (cell) istiflenir ve konum, bay-row-tier sistemiyle adreslenir. Yükleme planı (bay plan); stabilite, mukavemet, ağırlık dağılımı, tehlikeli yük ayrımı, soğutmalı (reefer) konteyner güç ihtiyacı ve liman sırasına göre erişilebilirliği aynı anda dengelemelidir.",
    sections: [
      {
        title: "Bay-Row-Tier Adresleme",
        content:
          "Her konteyner pozisyonu **üç koordinatla** benzersiz adreslenir:\n\n- **Bay (gözenek):** baştan kıça numaralanır; **20'lik** konteyner **tek** sayı, **40'lık** konteyner **çift** sayı bay alır (bir 40'lık iki 20'lik bay'ı kapladığından aradaki çift numarayı taşır).\n- **Row (sıra):** ortadan iskele/sancağa numaralanır (00 merkez; bir yön çift, diğeri tek — konvansiyona göre).\n- **Tier (kat):** ambar içi (02, 04...) ve güverte üstü (82, 84...) için ayrı numaralanır.\n\n**Neden bu sistem:** Plan üzerinde her kutunun yerini tek adresle belirtir ve terminal/loading computer otomasyonuyla uyumludur.\n\n**Gemide önemi:** Bay planı bu adresleme üzerine kurulur; yanlış okunan bir bay/row/tier, yükün yanlış limanda boşaltılmasına yol açar.",
      },
      {
        title: "Ağırlık Dağılımı ve Stabilite",
        content:
          "Konteyner istifinde **ağır kutular alt tier'lara, hafif kutular üste** yerleştirilir; bu hem güverte/lashing yükünü hem geminin ağırlık merkezini (**KG**) kontrol eder.\n\n**Yükseklik-stabilite dengesi:** Güverte üstüne yüksek istif KG'yi yükseltir, **GM'i düşürür**; ayrıca **rüzgâr alanını** ve **lashing yükünü** artırır. Her stack için izin verilen **maksimum ağırlık ve yükseklik** (stack weight / stack height limits) gemiye özeldir ve aşılamaz.\n\n**VGM bağlantısı:** Yanlış beyan edilen konteyner ağırlığı stabilite ve mukavemet hesabını bozar — hafif sanılan bir kutu üste konur ama gerçekte ağırsa hem GM hem stack limiti hesabı yanılır.\n\n**Gemide önemi:** Konteyner gemisinde GM genelde 'sınırda' yönetilir; ağır-alta/hafif-üste kuralı ve doğru VGM, hem stabilite hem istif emniyetinin temelidir.",
      },
      {
        title: "VGM ve Lashing",
        content:
          "**SOLAS Bölüm VI**, her dolu konteynerin **doğrulanmış brüt ağırlığının (Verified Gross Mass, VGM)** gemiye yüklenmeden önce bildirilmesini zorunlu kılar; **VGM'siz konteyner yüklenemez** (2016'dan beri).\n\n**İki yöntem:** VGM ya (1) dolu konteyneri tartarak, ya da (2) içindeki tüm kalemleri + dara ağırlığını onaylı yöntemle toplayarak bulunur.\n\n**Lashing:** Güverte üstü konteynerler **twist-lock, lashing rod, turnbuckle ve bridge fitting**'lerle bağlanır; düzen ve izin verilen kuvvetler onaylı CSM'e göredir. Yüksek istifte lashing yetersizse **'stack collapse' (istif çökmesi)** ve denize konteyner kaybı olur.\n\n**Gemide önemi:** Yanlış VGM hem stabilite hesabını hem lashing kapasitesini geçersiz kılar; her yıl binlerce konteyner denize düşer ve başlıca nedenlerden biri yanlış ağırlık + yetersiz lashing'dir.",
      },
      {
        title: "Özel Konteynerler ve Ayrım",
        content:
          "**Reefer (soğutmalı):** Güç soketi olan pozisyonlara yerleştirilir ve sıcaklıkları izlenir; gereken **toplam güç, jeneratör kapasitesiyle** uyumlu olmalıdır (çok sayıda reefer aynı anda beslenirse güç yetmeyebilir).\n\n**IMDG (tehlikeli) konteynerler:** **Segregation tablolarına** göre uyumsuz sınıflardan ayrı istiflenir; ateş/ısı kaynaklarından ve yaşam mahallinden uzak tutulur.\n\n**Boyut dışı yükler:** Open top, flat rack ve **out-of-gauge (OOG)** yükler için özel bağlama ve konum planlaması gerekir (standart hücreye sığmaz, komşu pozisyonları bloke edebilir).\n\n**Gemide önemi:** Bay planı bu özel ihtiyaçları (güç, segregation, OOG) stabilite ve liman sırasıyla aynı anda dengelemek zorundadır; bu yüzden konteyner planlaması çok değişkenli bir optimizasyondur.",
      },
    ],
    keyPoints: [
      "Pozisyon Bay-Row-Tier ile adreslenir; 20'lik tek, 40'lık çift bay numarası alır.",
      "Ağır kutular alta, hafif kutular üste; stack weight/height limitleri aşılmaz.",
      "SOLAS VI gereği VGM bildirilmeden konteyner yüklenemez; lashing CSM'e göre yapılır.",
      "Reefer'lar güçlü pozisyona, IMDG konteynerler segregation tablosuna göre ayrılır.",
    ],
  },

  "Tehlikeli Yükler ve IMDG Code": {
    title: "Tehlikeli Yükler ve IMDG Code",
    introduction:
      "Paketli tehlikeli maddelerin deniz yoluyla taşınması, IMDG Code (International Maritime Dangerous Goods Code) ile düzenlenir. Code; sınıflandırma, ambalajlama, işaretleme/etiketleme, belgeleme, istif ve ayrım (segregation) kurallarını kapsar ve SOLAS Bölüm VII ile MARPOL Ek III kapsamında zorunludur. Amaç, yangın, patlama, zehirlenme ve çevre kirliliği risklerini kontrol altında tutmaktır.",
    sections: [
      {
        title: "Tehlike Sınıfları",
        content:
          "IMDG Code, tehlikeli maddeleri **9 ana sınıfa** ayırır:\n\n1. **Patlayıcılar**\n2. **Gazlar** (yanıcı / yanıcı olmayan / zehirli)\n3. **Yanıcı sıvılar**\n4. **Yanıcı katılar** / kendiliğinden yanan / su ile yanıcı gaz çıkaran\n5. **Oksitleyiciler** ve organik peroksitler\n6. **Zehirli ve bulaşıcı** maddeler\n7. **Radyoaktif** maddeler\n8. **Aşındırıcılar (korozif)**\n9. **Muhtelif** tehlikeli maddeler (deniz kirleticiler dâhil)\n\n**Tanımlama:** Her madde **dört haneli UN numarası** ve **Proper Shipping Name** ile tanımlanır; bazıları ek tehlike (**subsidiary risk**) taşır (ör. hem yanıcı hem zehirli).\n\n**Gemide önemi:** Sınıf ve UN numarası; tüm taşıma/istif/ayrım/müdahale kurallarının anahtarıdır; yanlış sınıflandırma bütün emniyet zincirini bozar.",
      },
      {
        title: "Ambalajlama, İşaretleme ve Belgeler",
        content:
          "**Ambalaj:** Tehlikeli maddeler **onaylı (UN sertifikalı)** ambalajlarda taşınır; paketler **tehlike etiketleri (eşkenar dörtgen / diamond)**, UN numarası ve gerekli işaretlerle (marine pollutant, yön okları) işaretlenir.\n\n**Belgeler:** Sevkiyat için **Dangerous Goods Declaration (DGD)**; konteyner/araç için **Container/Vehicle Packing Certificate** düzenlenir.\n\n**Gemide manifest:** Gemi, tüm tehlikeli yükün konumunu gösteren özel bir **dangerous goods manifest / stowage plan** bulundurmak **zorundadır**; acil durumda müdahale ekibi ve itfaiye bu belgeye göre hareket eder.\n\n**Gemide önemi:** Belge ve işaret eksikliği, bir yangında müdahale ekibinin 'neyle karşı karşıya olduğunu' bilememesi demektir — bu yüzden manifest köprüüstünde hazır tutulur.",
      },
      {
        title: "İstif ve Ayrım (Segregation)",
        content:
          "Tehlikeli yükler, birbiriyle **tehlikeli tepkimeye girmeyecek** şekilde ayrılır. IMDG **segregation tablosu**, sınıf çiftleri için gereken ayrımı dört kademede belirtir:\n\n1. **'Away from'** — birbirinden uzak, aynı ambarda olabilir.\n2. **'Separated from'** — ayrı bölme/ambar veya belirli mesafe.\n3. **'Separated by a complete compartment/hold from'** — arada tam bir bölme.\n4. **'Separated longitudinally by an intervening complete compartment/hold'** — boyuna, arada tam bölme.\n\n**İstif kategorileri (A-E):** Yükün güvertede mi ambarda mı, korunaklı mı taşınacağını belirler. Ayrıca ısı kaynağı, yaşam mahalli ve gıdadan uzak tutma kuralları uygulanır.\n\n**Gemide önemi:** Segregation, uyumsuz maddelerin bir sızıntı/yangında birbirini tetiklemesini önler; tablo 'öneri' değil, bağlayıcı kuraldır.",
      },
      {
        title: "Acil Durum ve Müdahale",
        content:
          "Her tehlikeli madde için müdahale kılavuzları önceden belirlenir:\n\n- **EmS (Emergency Schedules):** yangın için **F-** ve döküntü için **S-** müdahale kodu.\n- **MFAG (Medical First Aid Guide):** zehirlenme/yaralanma için tıbbi ilk yardım.\n\n**Hazırlık:** Mürettebat, taşınan yüke uygun **acil müdahale ekipmanı ve KKD** bulundurur; yangın, döküntü ve gaz kaçağı senaryoları için **tatbikat** yapılır.\n\n**Çevre:** Deniz kirleticiler (**marine pollutant**) için **MARPOL Ek III** işaretleme ve raporlama yükümlülükleri ek olarak geçerlidir.\n\n**Gemide önemi:** IMDG yükünde 'ne yapacağını olay anında öğrenmek' ölümcüldür; EmS/MFAG referansları ve tatbikat, müdahalenin saniyeler içinde doğru başlamasını sağlar.",
      },
    ],
    keyPoints: [
      "IMDG Code maddeleri 9 sınıfa ayırır; her madde UN numarası ve Proper Shipping Name ile tanımlanır.",
      "Onaylı ambalaj, doğru etiket/işaret ve Dangerous Goods Declaration zorunludur.",
      "Segregation tablosu uyumsuz sınıfların ayrımını (away/separated...) belirler.",
      "EmS ve MFAG, yangın/döküntü/yaralanma için acil müdahaleyi yönlendirir.",
    ],
  },

  "Yük Elleçleme Ekipmanı ve Güvenli Çalışma": {
    title: "Yük Elleçleme Ekipmanı ve Güvenli Çalışma",
    introduction:
      "Yükün güvenli yüklenip boşaltılması, gemi vinçleri/bumbaları, sapan ve kaldırma aksesuarlarının doğru kullanımına ve sıkı bir güvenli çalışma disiplinine bağlıdır. Kaldırma ekipmanı SOLAS ve ILO 152 sayılı Sözleşme ile düzenlenir; her ekipmanın test, sertifika ve periyodik muayene kaydı (Register of Cargo Handling Gear) tutulur.",
    sections: [
      {
        title: "Safe Working Load (SWL) ve Sertifikasyon",
        content:
          "Her kaldırma ekipmanının üzerinde, güvenle kaldırabileceği maksimum yük olan **SWL (Safe Working Load / Working Load Limit)** işaretlidir. SWL, malzemenin **kopma yüküne** bir **güvenlik katsayısı** uygulanarak bulunur: **SWL = Kopma Yükü / Güvenlik Katsayısı** (tipik 4-6).\n\n**Sertifikasyon:** Kaldırma ekipmanı belirli aralıklarla **yük testine** tabi tutulur ve yetkili kişi/kuruluşça sertifikalandırılır; testler ve muayeneler **Register of Cargo Handling Gear**'a kaydedilir.\n\n**Neden aşılmamalı:** SWL'in aşılması, açı değişimiyle elemana binen **gerçek** yükün artması nedeniyle özellikle tehlikelidir (bkz. sapan açısı); güvenlik katsayısı ani yük ve aşınma payıdır, 'kullanılacak marj' değildir.\n\n**Gemide önemi:** Sertifikasız veya SWL'i aşılan ekipman kopma ve ölümcül kaza demektir; her operasyon öncesi SWL ve sertifika kontrol edilir.",
        formula: {
          text: "SWL = Kopma Yükü / Güvenlik Katsayısı",
          description: "Güvenlik katsayısı ekipman tipine ve kullanıma göre değişir (tipik 4–6)",
        },
      },
      {
        title: "Sapan Açısı ve Yük Paylaşımı",
        content:
          "Çok bacaklı sapanlarda (sling), bacaklar arasındaki **açı büyüdükçe her bacağa binen gerçek yük artar**.\n\n**Bağıntı:** Yük dikey kaldırıldığında bacaklar yükü eşit paylaşır; açı arttıkça bacak gerilimi **T = (W / n) / cos θ** ile büyür (θ: bacağın düşeyle açısı).\n\n**Worked örnek:** 4 t yük, 2 bacaklı sapan. Düşeyde (θ=0): T = (4/2)/cos0 = 2 t/bacak. θ=60°'de: T = (4/2)/cos60° = 2/0,5 = **4 t/bacak** — açı 60°'ye çıkınca bacak yükü **iki katına** çıktı! Geniş açıda SWL kolayca aşılır.\n\n**Kural:** Sapan **dahil açısı** genellikle 90°-120°'yi aşmamalı; köşeli yüklerde kenar koruyucu (**softener**) ile sapanın kesilmesi önlenir ve yük dengeli bağlanır.\n\n**Gemide önemi:** 'Yük SWL altında ama açı geniş' durumu en yaygın kaldırma kazası nedenidir; açı, yükün kendisi kadar önemlidir.",
        formula: {
          text: "T = (W / n) / cos(θ)",
          description: "T: bacak gerilimi, W: yük, n: bacak sayısı, θ: bacağın düşeyle yaptığı açı",
        },
      },
      {
        title: "Güvenli Çalışma Uygulamaları",
        content:
          "Yük operasyonu öncesi tüm ekipman (kanca, mapa, sapan, blok, halat) **görsel kontrolden** geçirilir; aşınmış, çatlak veya deforme eleman **kullanılmaz**.\n\n**Personel emniyeti:** Yük **altında ve sallanma sahasında** personel bulunmaz; **işaretçi (banksman)** standart el işaretleri veya telsizle vinç operatörüyle haberleşir (operatör göremediğinde banksman onun gözüdür).\n\n**Kontrol:** Açık ambar ağızları korkuluk/işaretle güvenceye alınır; **toplama halatı (tag line)** ile yük döndürülmeden kontrol edilir. **Ani** kaldırma/indirme ve **yan çekme (side loading)** yapılmaz — ikisi de ekipmana tasarım dışı yük bindirir.\n\n**Gemide önemi:** Kaldırma kazaları çoğunlukla 'yük altında durma', 'yan çekme' ve 'hasarlı ekipman' üçlüsünden çıkar; güvenli çalışma bu üçünü baştan engeller.",
      },
      {
        title: "Ambar Girişi ve Kapalı Mahal Riski",
        content:
          "Ambarlar, özellikle belirli yükler taşındıktan sonra, **oksijen azlığı** veya zehirli/yanıcı gaz nedeniyle **kapalı/sınırlı mahal (enclosed space)** riski taşır.\n\n**Giriş prosedürü:** Girişten önce **kapalı mahal giriş izni (permit to work)** alınır; atmosfer **(O₂, yanıcı gaz, zehirli gaz)** ölçülür ve **havalandırma** yapılır. **Gözcü (standby man)** ve kurtarma planı hazır bulundurulur.\n\n**Neden ölümcül:** Oksijen tüketen yükler (bkz. IMSBC Grup B) ambar atmosferini sinsi biçimde ölümcül kılar; 'birkaç dakika bir şey olmaz' düşüncesi en sık ölüm nedenidir — ve kurtarmaya koşan **ikinci kişi** de çoğu zaman ölür.\n\n**Gemide önemi:** Kapalı mahal kazaları denizciliğin en ölümcül olayları arasındadır; düzenli **giriş ve kurtarma tatbikatı** zorunludur ve 'ölç, havalandır, izin al, gözcü koy' sırası asla atlanmaz.",
      },
    ],
    keyPoints: [
      "Her kaldırma ekipmanında SWL işaretlidir; testler Register of Cargo Handling Gear'a kaydedilir.",
      "Sapan açısı büyüdükçe bacak gerilimi artar: T = (W/n)/cos θ; geniş açıdan kaçınılır.",
      "Yük altında personel bulunmaz; banksman ve tag line ile kontrollü çalışılır.",
      "Ambar girişi kapalı mahal prosedürü gerektirir: izin, gaz ölçümü, havalandırma, gözcü.",
    ],
  },
};
