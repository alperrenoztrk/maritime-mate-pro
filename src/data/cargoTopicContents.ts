import type { TopicDetailContent } from "@/data/navigationTopicContents";

/**
 * Yük Elleçleme ve İstifleme — "Dersler Beta" okunabilir konu anlatımı.
 *
 * İçerik gerçek denizcilik standartlarına dayanır (SOLAS Bölüm VI/VII, IMSBC Code,
 * International Grain Code, CSS Code, IMDG Code, Draft Survey UN/ECE kılavuzu).
 * `TopicSection.title` değerleri lessonFlow/cargo.ts içindeki `sectionRef` ve
 * `sectionTitles` ile birebir eşleşir.
 */
// Ders görselleri — depoda hâlihazırda bulunan varlıklar.
import hatchCoversImage from "@/assets/seamanship/hatch-covers.jpg";
import bulkCarrierImage from "@/assets/ships/bulk-carrier.jpg";
import containerShipImage from "@/assets/ships/container-ship.jpg";
import deckCraneImage from "@/assets/seamanship/deck-crane.jpg";
import roroShipImage from "@/assets/ships/roro-ship.jpg";

export const cargoTopicContents: Record<string, TopicDetailContent> = {
  "İstif Faktörü ve Broken Stowage": {
    title: "İstif Faktörü ve Broken Stowage",
    introduction:
      "İstif faktörü (Stowage Factor, SF), bir ton yükün istiflendiğinde işgal ettiği hacmi (m³/t veya ft³/t) ifade eder ve yük planlamasının temel büyüklüğüdür. Bir ambarın ne kadar yük alacağı, geminin hacim mi yoksa ağırlık (deadweight) sınırına mı önce ulaşacağı doğrudan SF ile belirlenir. Gerçek istifte yükler arasında ve gemi yapısı nedeniyle kullanılamayan boşluklar (broken stowage) kalır; bu nedenle net taşınabilir miktar her zaman teorik hesabın altındadır.",
    sections: [
      {
        title: "İstif Faktörü Tanımı ve Hesabı",
        content:
          "İstif faktörü, yükün birim ağırlığının kapladığı hacimdir: SF = V / W. Düşük SF'li yükler (örn. demir cevheri ~0.4 m³/t) ağır ve yoğundur; gemi hacim dolmadan deadweight sınırına ulaşır (deadweight cargo). Yüksek SF'li yükler (örn. pamuk ~2.0 m³/t, kereste) hafif ve hacimlidir; gemi ağırlık sınırına ulaşmadan ambar dolar (measurement/volume cargo). Yük için gereken hacim V = W × SF formülüyle bulunur. Planlamada önce hangi sınıra (ağırlık ya da hacim) önce ulaşılacağı belirlenir; bu, ambar doluluk stratejisini ve gelir optimizasyonunu yönlendirir.",
        image: hatchCoversImage,
        imageAlt: "Cargo hold hatch covers on a bulk carrier",
        formula: {
          text: "V = W × SF",
          description: "V: gereken hacim (m³), W: yük ağırlığı (t), SF: istif faktörü (m³/t)",
        },
      },
      {
        title: "Broken Stowage (Kayıp Hacim)",
        content:
          "Broken stowage, ambardaki kullanılamayan boşlukların toplam hacme oranıdır. Düzensiz biçimli yüklerde (variller, makineler, ambalajlı kutular) ve gemi yapısındaki braket, perde ve frame'ler nedeniyle ortaya çıkar. Tipik broken stowage oranları: torbalı yükler %10-15, balyalı yük %10, variller %20-30, düzensiz genel yük %25'e kadar. Net istiflenebilir hacim, ambar net hacminden broken stowage düşülerek bulunur: Vnet = Vambar × (1 − BS). Broken stowage, dunnage (istif tahtası) kullanımı, dolgu (filler) yüklerle boşluk doldurma ve dikkatli istif planı ile azaltılır.",
        formula: {
          text: "Vnet = Vambar × (1 − BS)",
          description: "Vnet: net istiflenebilir hacim, Vambar: ambar net hacmi, BS: broken stowage oranı (ondalık)",
        },
      },
      {
        title: "Bale ve Grain Kapasitesi",
        content:
          "Ambar hacmi iki şekilde verilir. Grain (tahıl) kapasitesi, dökme akışkan yüklerin frame ve braketlerin arasını da doldurduğu varsayımıyla ölçülen toplam iç hacimdir. Bale kapasitesi ise ambalajlı/balyalı yükler için, frame iç yüzeyine ve cargo battens'a kadar olan kullanılabilir hacimdir; tipik olarak grain kapasitesinden %7-10 daha düşüktür. Plan yapılırken yükün cinsine uygun kapasite kullanılır: dökme tahıl için grain, genel yük için bale kapasitesi esas alınır.",
      },
      {
        title: "Yoğunluk, Ağırlık ve Hacim Dengesi",
        content:
          "Bir geminin ekonomik yüklenmesi, ağırlık ve hacim kapasitesinin birlikte değerlendirilmesini gerektirir. İdeal durumda gemi hem deadweight hem hacim sınırına aynı anda ulaşır (full and down). Pratikte farklı SF'li yükler birlikte taşınarak bu dengeye yaklaşılır: ağır yük (düşük SF) ambar tabanına, hafif yük üste istiflenerek hem hacim doldurulur hem stabilite için ağırlık merkezi (KG) kontrol altında tutulur. Yanlış SF tahmini, ambarların yarı dolu kalmasına (gelir kaybı) veya plana sığmayan yüke yol açar.",
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
        image: bulkCarrierImage,
        imageAlt: "Bulk carrier whose holds are loaded to a planned weight distribution",
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
          "Yüzen bir gemi, batan hacmi kadar suyun ağırlığına eşit bir kaldırma kuvvetiyle desteklenir. Dolayısıyla geminin toplam ağırlığı (deplasman, Δ), o draftta yer değiştirdiği su ağırlığına eşittir. Draft survey, yükleme öncesi ve sonrası deplasman farkından yük ağırlığını bulur: Yük = Δsonra − Δönce. Deplasman, geminin hidrostatik tablolarından (ya da deplasman ölçeğinden) ortalama drafta karşılık gelen değer okunarak elde edilir.",
        image: "/diagrams/seamanship/load-line-isaretleri.svg",
        imageAlt: "Load line marks read on the ship's side during a draft survey",
        formula: {
          text: "Yük = Δsonra − Δönce",
          description: "Δ: ilgili draftta okunan deplasman (ton); fark yüklenen/boşaltılan yük miktarıdır",
        },
      },
      {
        title: "Draft Okuma ve Ortalama Draft",
        content:
          "Altı draft markası okunur: baş, orta ve kıç için iskele ve sancak. Baş ve kıç ortalaması alınır, ardından 'mean of means' yöntemiyle orta draft ağırlıklı olarak hesaplanarak teknenin bel verme/sarkma etkisi (hogging/sagging) düzeltilir. Yaygın yaklaşım: önce baş-kıç ortalaması (mean), sonra bu değerle orta draftın ortalaması (mean of mean), son olarak quarter mean = (mean of mean + orta draft) / 2 ile kavis düzeltmesi yapılır. Marka ile perpendiküler arasındaki mesafe için trim düzeltmesi de uygulanır.",
      },
      {
        title: "Yoğunluk ve Düzeltmeler",
        content:
          "Hidrostatik tablolar standart deniz suyu yoğunluğuna (genelde 1.025 t/m³) göredir. Liman suyu yoğunluğu hidrometre ile ölçülür ve deplasman, gerçek yoğunluğa oranlanarak düzeltilir: Δgerçek = Δtablo × (ρgerçek / 1.025). Ayrıca trim için 'first ve second trim correction' uygulanır (LCF'in orta kesitten sapması nedeniyle). Bu düzeltmeler ihmal edilirse birkaç yüz tonluk hata oluşabilir.",
        formula: {
          text: "Δgerçek = Δtablo × (ρliman / 1.025)",
          description: "ρliman: hidrometre ile ölçülen liman suyu yoğunluğu (t/m³)",
        },
      },
      {
        title: "Deductibles ve Net Yük",
        content:
          "Draft survey, yüke ait olmayan tüm değişken ağırlıkları (deductibles) hesaba katar: yakıt (HFO/MGO), yağlar, balast suyu, tatlı su, slop ve atık. Yükleme öncesi ve sonrası bu kalemler ayrı ayrı ölçülür (tank sounding). Net yük = (deplasman farkı) − (deductibles farkı). Tank ölçümlerinde dikkatsizlik, draft survey hatalarının başlıca kaynağıdır; bu nedenle tüm tanklar her iki survey'de de eksiksiz iskandil edilir.",
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
          "Code, yükleri üç gruba ayırır. Grup A: nem fazlalığında sıvılaşabilen yükler (örn. nikel cevheri, demir cevheri konsantresi, bazı kömürler). Grup B: kimyasal tehlike taşıyan yükler (yanıcı, oksitleyici, oksijen tüketen veya zehirli gaz çıkaran; örn. kömür, doğrudan indirgenmiş demir/DRI). Grup C: ne sıvılaşan ne kimyasal tehlike taşıyan yükler (örn. çakıl, klinker). Bir yük hem A hem B özelliği taşıyabilir. Yükleme öncesi sevkiyatçı, yükün doğru sınıflandırmasını ve özelliklerini içeren beyanı (shipper's declaration) sağlamak zorundadır.",
        image: bulkCarrierImage,
        imageAlt: "Bulk carrier carrying solid bulk cargo under the IMSBC Code",
      },
      {
        title: "Sıvılaşma ve Transportable Moisture Limit (TML)",
        content:
          "Grup A yüklerde, nem belirli bir eşiği aşarsa geminin titreşim ve hareketiyle yük katı davranıştan akışkan davranışa geçer (liquefaction). Akışkanlaşan yük bir tarafa kayarak ani ve tehlikeli liste, hatta alabora yaratabilir. Bunu önlemek için yükün nem içeriği (moisture content) Transportable Moisture Limit (TML) değerinin altında olmalıdır. TML genellikle Flow Moisture Point'in %90'ı olarak belirlenir. Şüphe varsa kaptan 'can testi' (can test) gibi basit bir saha kontrolü yapabilir, ancak resmî karar laboratuvar sertifikasına dayanır. Nem TML'yi aşıyorsa yük reddedilir.",
        formula: {
          text: "TML = 0.90 × FMP",
          description: "FMP: Flow Moisture Point (akış nem noktası); yük nemi TML'nin altında olmalıdır",
        },
      },
      {
        title: "Kimyasal Tehlikeler (Grup B)",
        content:
          "Bazı dökme yükler kimyasal tehlike taşır. Kömür metan (patlayıcı) salabilir, kendiliğinden ısınabilir ve oksijeni tüketebilir; bu nedenle ambar havalandırması, sıcaklık ve gaz (metan, CO) izleme prosedürleri uygulanır. Doğrudan indirgenmiş demir (DRI), suyla temasında hidrojen açığa çıkarır ve ısınır; inert (azot) ortam gerektirir. Sülfürlü cevherler oksijeni tüketir ve kapalı alanı ölümcül kılar. Her Grup B yükünün IMSBC kayıt sayfasındaki özel önlemler (ventilasyon, izleme, su kullanımı yasağı vb.) harfiyen uygulanır.",
      },
      {
        title: "Trimleme ve Yük Kayması",
        content:
          "Dökme yükler ambar içinde düzgün trimlenmeli (yayılmalı) ki yük yüzeyi düz olsun ve seyir sırasında kayma (shifting) riski azalsın. Özellikle açıyla yığılan (angle of repose düşük) yüklerde düzgün trim kritiktir. Yetersiz trim, ambarda boşluk ve dengesiz yüzey bırakır; gemi yalpaladıkça yük kayar ve liste oluşur. IMSBC, yük cinsine göre trimleme gerekliliklerini belirtir; tahıl için ayrıca Grain Code'un özel kuralları uygulanır.",
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
          "Tahıl yüzeyi başlangıçta ambarın üst kısmında boşluk bırakır (settling sonrası ~%2-3 oturma). Gemi yalpaladığında tahıl yüzeyi yaklaşık 15°'ye kadar kayar ve dolu ambarlarda da yüzey kayması (assumed volumetric heeling moment) hesaba alınır. Bu kayma, geminin bir tarafına ek ağırlık etkisi yaratarak yatırıcı moment (heeling moment) doğurur. Grain Code, dolu ve kısmen dolu (slack) ambarlar için varsayılan hacimsel kayma momentlerini tablolar hâlinde verir; gerçek kayma değil, standart bir varsayım kullanılır.",
      },
      {
        title: "Grain Code Stabilite Kriterleri",
        content:
          "International Grain Code üç temel kriter koyar: (1) tahıl kayması nedeniyle oluşan yatma açısı (angle of heel) 12°'yi (veya deck immersion açısını, hangisi küçükse) aşmamalı; (2) GZ eğrisi üzerinde, heeling arm eğrisi ile righting arm eğrisi arasında kalan artık dinamik stabilite alanı (residual area) en az 0.075 metre-radyan olmalı; (3) başlangıç metasantr yüksekliği GM düzeltilmiş hâliyle en az 0.30 m olmalıdır. Bu kriterler, onaylı Grain Loading Manual ve gemiye özel hesaplarla yükleme öncesi doğrulanır.",
        formula: {
          text: "Residual area ≥ 0.075 m·rad ; heel ≤ 12° ; GM ≥ 0.30 m",
          description: "International Grain Code (SOLAS VI) zorunlu tahıl stabilite kriterleri",
        },
      },
      {
        title: "Yapısal Önlemler: Saddle, Feeder, Bundling",
        content:
          "Tahıl kaymasını fiziksel olarak azaltmak için önlemler alınır. Kısmen dolu ambarlarda yüzey ahşap perdelerle (shifting boards) veya kayıştırma (bundling/strapping) ile bölünebilir. Dolu ambarlarda üstte 'saddle' (eyer) biçiminde tahıl yığını ve yan boşlukların torbalı tahılla (bagged grain / overstowing) doldurulması, settling sonrası boşlukları kapatmak için 'feeder' düzenekleri kullanılır. Modern uygulamada onaylı 'filled compartment, trimmed' düzenlemeleri tercih edilir; bu sayede slack yüzey ve kayma momenti en aza iner.",
      },
      {
        title: "Belgelendirme ve Yetki",
        content:
          "Tahıl yüklemek için geminin 'Document of Authorization' (tahıl yükleme yetki belgesi) ve onaylı Grain Loading Manual'ı bulunmalıdır. Yükleme planı, her ambardaki tahıl ağırlığını, varsayılan heeling momentlerini ve sonuç stabilite kontrolünü içerir; yükleme öncesi yetkili otorite/surveyör tarafından onaylanır. Yetki belgesi olmayan gemiler ancak Code'un öngördüğü en kısıtlı koşullarda ve idare onayıyla tahıl taşıyabilir.",
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
          "Denizde yüke etki eden kuvvetler geminin altı serbestlik derecesindeki hareketinden doğar: yalpa (roll) en büyük enine ivmeyi, baş-kıç vurma (pitch) ve dalıp çıkma (heave) boyuna ve dikine ivmeleri yaratır. CSS Code, gemi büyüklüğü ve hıza göre tasarım ivmelerini (g cinsinden) tablolar hâlinde verir. Bağlama hesabı, yükün ağırlığından doğan atalet kuvvetlerinin (enine, boyuna, dikine) bağlama ve sürtünme dirençleriyle dengelenmesini sağlar. En kritik yön genellikle enine (yalpa) yöndür.",
        image: roroShipImage,
        imageAlt: "Ro-Ro cargo secured and lashed under the CSS Code",
      },
      {
        title: "Sürtünme ve Bağlama Direnci",
        content:
          "Yükün kaymaya karşı ilk direnci, taban ile yük arasındaki sürtünmedir: Fsürtünme = μ × m × g. Sürtünme katsayısı (μ) yüzey çiftine bağlıdır (çelik-çelik ~0.1, kereste-çelik ~0.3, kauçuk paspas/anti-slip mat ~0.6). Sürtünme yetersiz kaldığında bağlama elemanları (zincir, çelik halat, web lashing) devreye girer. Her bağlama elemanının izin verilen güvenli yükü vardır: MSL (Maximum Securing Load), genellikle kopma yükünün belirli bir oranıdır (örn. çelik halat için kopma yükünün %80'i, zincir için %50'si). Toplam bağlama kapasitesi, atalet kuvvetinden sürtünme direnci düşülen değeri karşılamalıdır.",
        formula: {
          text: "Σ(MSL etkin) ≥ Fatalet − μ × m × g",
          description: "Bağlamaların etkin direnci, atalet kuvvetinden sürtünme direnci çıkarılan değeri karşılamalı",
        },
      },
      {
        title: "Bağlama Elemanları ve Açı Etkisi",
        content:
          "Bağlama elemanları (lashing chains, wire rope, web/textile lashing, turnbuckle/gergi) yük ile güverte sabitleme noktaları (D-ring, lashing pot, container fitting) arasına gerilir. Bir bağlamanın enine kaymaya katkısı, yatay ve dikey açısına bağlıdır: dik açıyla bağlanan eleman düşey bileşene kayar ve enine tutmaya az katkı verir. En verimli bağlama, beklenen kayma yönüne mümkün olduğunca yatay ve karşı yönde gerilen elemandır. Bağlamalar simetrik dağıtılır ve önceden gerdirilir (pre-tension) ki yük hareket etmeden direnç oluşsun.",
      },
      {
        title: "Cargo Securing Manual ve Kontrol",
        content:
          "300 GT ve üzeri yük gemileri için onaylı Cargo Securing Manual (CSM) zorunludur; sabit ve taşınabilir bağlama ekipmanı, izin verilen kuvvetler ve tipik yükler için bağlama düzenleri burada tanımlanır. Bağlamalar yükleme sonrası kontrol edilir, seyir sırasında düzenli olarak (özellikle ağır hava öncesi/sonrası) tekrar gerdirilir ve güverte günlüğüne kaydedilir. Ağır hava beklendiğinde rota/hız ayarı (weather routeing) ile yükteki ivmeler azaltılarak bağlama yükü düşürülür.",
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
          "Her konteyner pozisyonu üç koordinatla tanımlanır. Bay (gözenek): baştan kıça doğru numaralanır; 20'lik konteynerler tek sayı, 40'lık konteynerler çift sayı bay numarası alır. Row (sıra): ortadan iskele/sancağa doğru numaralanır (00 merkez; çift sayılar iskele, tek sayılar sancak ya da tersi konvansiyona göre). Tier (kat): ambar içi ve güverte üstü için ayrı numaralanır (ambar 02, 04...; güverte 82, 84...). Bu sistem, plan üzerinde her kutunun yerini benzersiz adresler ve otomasyonla (terminal/loading computer) uyumludur.",
        image: containerShipImage,
        imageAlt: "Container ship stacked according to its bay plan",
      },
      {
        title: "Ağırlık Dağılımı ve Stabilite",
        content:
          "Konteyner istifinde ağır kutular alt tier'lara, hafif kutular üste yerleştirilir; bu hem güverte/lashing yükünü hem geminin ağırlık merkezini (KG) kontrol eder. Güverte üstüne yüksek istif yapıldığında KG yükselir ve GM düşer; aşırı yükseklik aynı zamanda rüzgâr alanı ve lashing yükünü artırır. Her stack için izin verilen maksimum ağırlık ve yükseklik, gemiye özel sınırlarla (stack weight / stack height limits) belirlidir. Yanlış beyan edilen konteyner ağırlığı (VGM eksikliği) stabilite ve mukavemet hesaplarını bozar.",
      },
      {
        title: "VGM ve Lashing",
        content:
          "SOLAS Bölüm VI, her dolu konteynerin doğrulanmış brüt ağırlığının (Verified Gross Mass, VGM) gemiye yüklenmeden önce bildirilmesini zorunlu kılar; VGM'siz konteyner yüklenemez. Güverte üstü konteynerler twist-lock, lashing rod, turnbuckle ve bridge fitting'lerle bağlanır; lashing düzeni ve izin verilen kuvvetler onaylı Cargo Securing Manual'a göre uygulanır. Yüksek istiflerde lashing yetersizse 'stack collapse' (istif çökmesi) ve denize konteyner kaybı riski oluşur.",
      },
      {
        title: "Özel Konteynerler ve Ayrım",
        content:
          "Soğutmalı (reefer) konteynerler güç soketi olan pozisyonlara yerleştirilir ve sıcaklıkları izlenir; gerekli toplam güç, jeneratör kapasitesiyle uyumlu olmalıdır. Tehlikeli yük (IMDG) konteynerleri segregation tablolarına göre uyumsuz sınıflardan ayrı istiflenir, ateş/ısı kaynaklarından ve yaşam mahallinden uzak tutulur. Açık üstlü (open top), flat rack ve out-of-gauge yükler için özel bağlama ve konum planlaması gerekir.",
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
          "IMDG Code maddeleri 9 ana sınıfa ayırır: 1 Patlayıcılar, 2 Gazlar (yanıcı/yanıcı olmayan/zehirli), 3 Yanıcı sıvılar, 4 Yanıcı katılar / kendiliğinden yanan / su ile yanıcı gaz çıkaran, 5 Oksitleyiciler ve organik peroksitler, 6 Zehirli ve bulaşıcı maddeler, 7 Radyoaktif maddeler, 8 Aşındırıcılar (korozif), 9 Muhtelif tehlikeli maddeler (deniz kirleticiler dâhil). Her madde, dört haneli UN numarası ve uygun sevkiyat adı (Proper Shipping Name) ile tanımlanır; bazı maddeler ek tehlike (subsidiary risk) taşır.",
        image: "/diagrams/seamanship/imdg-ayrim.svg",
        imageAlt: "IMDG Code segregation table for dangerous goods",
      },
      {
        title: "Ambalajlama, İşaretleme ve Belgeler",
        content:
          "Tehlikeli maddeler onaylı ambalajlarda (UN sertifikalı) ambalajlanır; paketler tehlike etiketleri (diamond labels), UN numarası ve gerekli işaretlerle (örn. marine pollutant, orientation arrows) işaretlenir. Sevkiyat için Dangerous Goods Declaration (DGD) ve konteyner/araç için Container/Vehicle Packing Certificate düzenlenir. Gemi, tüm tehlikeli yükün konumunu gösteren özel bir manifest veya istif planı (dangerous goods manifest/stowage plan) bulundurmak zorundadır; acil durumda bu belge müdahaleyi yönlendirir.",
      },
      {
        title: "İstif ve Ayrım (Segregation)",
        content:
          "Tehlikeli yükler birbirleriyle tehlikeli tepkimeye girmeyecek şekilde ayrılır. IMDG Code segregation tablosu, sınıf çiftleri için gerekli ayrımı belirtir: 'away from', 'separated from', 'separated by a complete compartment/hold from', 'separated longitudinally by an intervening complete compartment/hold from'. İstif kategorileri (A–E) yükün güvertede mi ambarda mı, korunaklı mı taşınacağını belirler. Isı kaynaklarından, yaşam mahallinden ve gıda maddelerinden uzak tutma kuralları da uygulanır.",
      },
      {
        title: "Acil Durum ve Müdahale",
        content:
          "Her tehlikeli madde için EmS (Emergency Schedules) yangın (F-) ve döküntü (S-) müdahale kılavuzu ve gerektiğinde Medical First Aid Guide (MFAG) referansları belirlenir. Mürettebat, taşınan yüke uygun acil müdahale ekipmanı ve KKD'yi hazır bulundurur; yangın, döküntü ve gaz kaçağı senaryoları için tatbikat yapılır. Deniz kirleticiler (marine pollutant) için MARPOL Ek III işaretleme ve raporlama yükümlülükleri ek olarak geçerlidir.",
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
          "Her kaldırma ekipmanının üzerinde, güvenle kaldırabileceği maksimum yük olan SWL (Safe Working Load / Working Load Limit) işaretlidir. SWL, malzemenin kopma yüküne uygulanan güvenlik katsayısıyla (factor of safety) belirlenir. Kaldırma ekipmanı belirli aralıklarla yük testine tabi tutulur ve yetkili kişi/kuruluşça sertifikalandırılır; testler ve muayeneler Register of Cargo Handling Gear'a kaydedilir. SWL'in aşılması, açının değişmesiyle elemana binen gerçek yükün artması nedeniyle özellikle tehlikelidir.",
        image: deckCraneImage,
        imageAlt: "Deck crane used for cargo handling",
        formula: {
          text: "SWL = Kopma Yükü / Güvenlik Katsayısı",
          description: "Güvenlik katsayısı ekipman tipine ve kullanıma göre değişir (tipik 4–6)",
        },
      },
      {
        title: "Sapan Açısı ve Yük Paylaşımı",
        content:
          "Çok bacaklı sapanlarda (sling), bacaklar arasındaki açı büyüdükçe her bacağa binen gerçek yük artar. Yük dikey kaldırıldığında bacaklar yükü eşit paylaşır; açı arttıkça bacak gerilimi T = (W / n) / cos(θ) bağıntısıyla büyür ve geniş açılarda SWL kolayca aşılabilir. Bu nedenle sapan açısı sınırlandırılır (genellikle dahil açı 90°-120°'yi aşmaması önerilir) ve yük dengeli bağlanır. Köşeli yüklerde kenar koruyucu (softener) kullanılarak sapanın kesilmesi önlenir.",
        formula: {
          text: "T = (W / n) / cos(θ)",
          description: "T: bacak gerilimi, W: yük, n: bacak sayısı, θ: bacağın düşeyle yaptığı açı",
        },
      },
      {
        title: "Güvenli Çalışma Uygulamaları",
        content:
          "Yük operasyonu öncesi tüm ekipman (kanca, mapa, sapan, blok, halat) görsel kontrolden geçirilir; aşınmış, çatlak veya deforme eleman kullanılmaz. Yük altında ve sallanma sahasında personel bulunmaz; işaretçi (banksman) standart el işaretleri veya telsizle vinç operatörüyle haberleşir. Açık ambar ağızları korkuluk/işaretle güvenceye alınır, düşme riskine karşı önlem alınır. Toplama halatı (tag line) ile yük kontrol edilir; ani yük kaldırma/indirme ve yan çekme (side loading) yapılmaz.",
      },
      {
        title: "Ambar Girişi ve Kapalı Mahal Riski",
        content:
          "Ambarlar, özellikle belirli yükler taşındıktan sonra, oksijen azlığı veya zehirli/yanıcı gaz nedeniyle kapalı/sınırlı mahal (enclosed space) riski taşır. Girişten önce kapalı mahal giriş izni (permit to work) alınır, atmosfer (O₂, yanıcı gaz, zehirli gaz) ölçülür ve havalandırma yapılır. Gözcü (standby man) ve kurtarma planı hazır bulundurulur. Düzenli kapalı mahal giriş ve kurtarma tatbikatları zorunludur; bu kazalar denizcilikteki en ölümcül olaylar arasındadır.",
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
