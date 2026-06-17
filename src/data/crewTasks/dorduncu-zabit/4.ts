import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Yük operasyonlarında destek",
  roleSlug: "dorduncu-zabit",
  taskIndex: 4,
  estimatedPages: 26,
  intro: `Dördüncü Zabit, liman ve demir operasyonlarında Birinci Zabit'in (Chief Officer / Cargo Officer) koordinasyonunda yük operasyonlarının yürütülmesine aktif destek verir. Bu görev; yükleme/boşaltma gözetimi, tank ve hold sounding'leri, draft (su çekimi) okuma, cargo tally tutma, hatch cover açma/kapama ve lashing/securing kontrollerini kapsar. Kıdemsiz zabit, bu operasyonlarda hem fiziksel olarak güvertede bulunur hem de Birinci Zabit'in cargo plan'ını ve stowage hesaplarını izleyerek yük zabitliğine hazırlanır. Bu bölüm, gözetim altındaki sorumlulukla bağımsız yük operasyonu yürütme becerisinin temellerini adım adım kurar.`,
  sources: [
    "SOLAS Chapter VI — Carriage of Cargoes and Oil Fuels",
    "SOLAS Chapter VII — Carriage of Dangerous Goods",
    "IMSBC Code — International Maritime Solid Bulk Cargoes Code",
    "CSS Code — Code of Safe Practice for Cargo Stowage and Securing",
    "Cargo Securing Manual (gemiye özel, SOLAS VI/5 ve VII/5)",
    "ICS Tanker Safety Guide / ISGOTT (sıvı yük gemileri için)",
    "IMO Resolution A.714(17) — Code of Safe Practice for Cargo Stowage and Securing",
    "Thomas' Stowage — The Properties and Stowage of Cargoes",
  ],
  chapters: [
    {
      heading: "1. Yük Operasyonunun Esasları ve Gözetim Çerçevesi",
      lead: `Dördüncü Zabit, yük operasyonunda Birinci Zabit'in gözü ve kulağıdır; sahadaki gözlemini sürekli ve net şekilde rapor eder.`,
      sections: [
        {
          subheading: "1.1 Yük zabitliği hiyerarşisi ve sorumluluk dağılımı",
          paragraphs: [
            `SOLAS Chapter VI uyarınca yükün emniyetli yüklenmesi, istif edilmesi ve bağlanmasından gemi adına Kaptan birincil sorumludur; bu sorumluluk operasyonel olarak Birinci Zabit'e (Chief Officer) devredilir. Dördüncü Zabit, bu zincirin en kıdemsiz halkası olarak Birinci Zabit'in talimatları doğrultusunda gözetim ve kayıt görevlerini üstlenir; bağımsız karar almaz, ancak gördüğü her anormalliği derhal raporlar.`,
            `Operasyon başlamadan önce Dördüncü Zabit, Birinci Zabit'in hazırladığı cargo / loading plan'ı inceler: hangi tankın/holdün hangi sırayla yükleneceği, ara draft hedefleri, deballast/ballast kademeleri ve stres/stabilite limitleri. Bu planı anlamadan sahaya çıkmak, operasyonun bütününü kavramayı engeller.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS VI/2 — Cargo Information",
              text: `Yükleten, yükün güvenli istifi ve taşınması için gerekli tüm bilgiyi (yoğunluk, TML, açı, IMSBC sınıfı vb.) gemiye yazılı vermekle yükümlüdür. Bu bilgi eksikse yükleme başlamaz. Dördüncü Zabit, cargo declaration'ın mevcut olduğunu teyit eder.`,
            },
          ],
        },
        {
          subheading: "1.2 Operasyon öncesi toolbox talk ve emniyet brifingi",
          paragraphs: [
            `Her yük operasyonu öncesi toolbox talk yapılır; görevler, riskler ve haberleşme yöntemi (UHF telsiz kanalı, el işaretleri) netleştirilir. Dördüncü Zabit bu brifingde kendi istasyonunu, raporlama sıklığını ve acil durdurma (emergency stop) prosedürünü öğrenir. Liman/terminal ile gemi arasındaki ship/shore safety checklist gözden geçirilir.`,
            `Operasyon sırasında haberleşme sürekli ve doğrulamalı (read-back) olmalıdır. "Stop loading" gibi kritik komutlar tekrarlanarak teyit edilir. İletişim koptuğunda operasyon güvenli tarafta durdurulur; belirsizlik içinde devam edilmez.`,
          ],
          bullets: [
            `Cargo plan ve yükleme sırası anlaşıldı mı?`,
            `Ship/shore safety checklist dolduruldu mu?`,
            `Haberleşme kanalı ve emergency stop sinyali belirlendi mi?`,
            `Görev dağılımı (sounding, draft, tally) net mi?`,
            `KKD (baret, eldiven, emniyet ayakkabısı, can yeleği) tam mı?`,
          ],
        },
      ],
    },
    {
      heading: "2. Tank ve Hold Sounding İşlemleri",
      sections: [
        {
          subheading: "2.1 Sounding ölçüm yöntemleri",
          paragraphs: [
            `Sounding, tank veya hold bilge'sindeki sıvı seviyesinin (yük, ballast, slop, bilge suyu) ölçülmesidir. Manuel sounding'de sounding tape (çelik şerit metre + bob) sounding pipe'tan indirilir ve water/oil finding paste ile temas seviyesi okunur. Modern gemilerde tank radar/float gauge sistemleri kullanılır; Dördüncü Zabit her ikisini de bilmeli ve gauge ile manuel sounding'i çapraz doğrulamalıdır.`,
            `Ölçülen sounding, tank kalibrasyon tablosu (ullage/sounding table) ile hacme çevrilir. Trim ve heel düzeltmeleri uygulanır. Ullage (üstten boşluk) ile sounding (alttan dolu) birbirinin tümleyenidir; hangisinin ölçüldüğü karıştırılmamalıdır. Dördüncü Zabit, ölçümü deftere saat damgasıyla kaydeder.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Enclosed space ve gaz riski",
              text: `Tank ve hold ölçümlerinde sounding pipe'tan yükselen gaz (HC, H2S) veya oksijen yetersizliği ölümcül olabilir. Sounding kapağı açılırken yüze gaz gelmesine karşı dikkatli olunur; kapalı mahalle giriş kesinlikle enclosed space entry permit olmadan yapılmaz.`,
            },
          ],
        },
        {
          subheading: "2.2 Bilge ve ballast takibi",
          paragraphs: [
            `Kuru yük gemilerinde hold bilge well'leri operasyon boyunca düzenli sounding ile izlenir; ani su artışı sızıntı, hatch sızdırması veya yük neminin (kondensasyon) işareti olabilir. IMSBC kapsamındaki bazı yüklerde (örn. konsantreler) bilge artışı sıvılaşma (liquefaction) belirtisi olabilir ve derhal raporlanır.`,
            `Yükleme/boşaltma ile eş zamanlı ballast operasyonu trim ve stres kontrolü için yürütülür. Dördüncü Zabit, deballasting/ballasting kademelerinde ilgili tank sounding'lerini takip eder ve Birinci Zabit'e ara değerleri bildirir. BWM Convention gereği ballast değişimi/işlemi kayıtları da göz önünde tutulur.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Çapraz doğrulama alışkanlığı",
              text: `Otomatik gauge ile manuel sounding arasında belirgin fark varsa, gauge'a değil manuel ölçüme güvenilir ve fark raporlanır. Pek çok aşırı yükleme/taşma vakası, körü körüne gauge'a güvenmekten kaynaklanmıştır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Draft Okuma ve Draft Survey",
      sections: [
        {
          subheading: "3.1 Draft mark okuma tekniği",
          paragraphs: [
            `Draft (su çekimi), geminin altı ile su yüzeyi arasındaki dik mesafedir ve baş (forward), kıç (aft) ve orta (midship) draft marklarından okunur. Marklar 6 mark = 1 metre / 1 feet düzeninde basılıdır. Dördüncü Zabit, su seviyesinin markın neresinde olduğunu (mean of crests and troughs) tahmin ederek okur; dalga ve swell varsa birkaç okumanın ortalaması alınır.`,
            `Altı draft okumasından (F/M/A her iki bordada) gemi true mean draft hesaplanır; trim ve hog/sag (eğilme) çıkarılır. Dördüncü Zabit bu okumaları doğru ve okunaklı kaydeder; draft survey sonucu yük miktarının (deplasman farkı yöntemi) tespitinde temel veridir.`,
          ],
          table: {
            caption: `Draft Okuma Pozisyonları ve Düzeltmeler`,
            headers: ["Okuma noktası", "Amaç", "Dikkat edilecek"],
            rows: [
              ["Forward (F)", "Baş su çekimi / trim", "Pruva markı erişilebilirliği"],
              ["Aft (A)", "Kıç su çekimi / trim", "Pervane suyu dalgalanması"],
              ["Midship (M)", "Hog/sag tespiti", "Her iki bordadan okuma"],
              ["Mean", "Ortalama draft", "F+A+6M formülü (LMC)"],
              ["Heel", "Yan eğim düzeltmesi", "İki borda farkı"],
            ],
          },
        },
        {
          subheading: "3.2 Draft survey katkısı",
          paragraphs: [
            `Draft survey, yükleme öncesi (initial) ve sonrası (final) draft okumalarından yük tonajını hesaplamak için yapılır. Dördüncü Zabit; tüm draft marklarını okur, deniz suyu yoğunluğu (hidrometre ile) örneğini alır, constant/light ship ve tank sounding'lerini Birinci Zabit'e iletir. Bu veriler displacement tablosuyla işlenir.`,
            `Survey sırasında ballast, yakıt, tatlı su ve diğer "deductibles" eksiksiz ölçülmelidir; tek bir tank sounding hatası yük tonajında ton mertebesinde sapma yaratır. Bu nedenle Dördüncü Zabit'in titiz ölçümü ticari olarak da kritiktir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka — eksik tank sounding",
              text: `Bir bulk carrier'da draft survey sırasında atlanmış bir ballast tankı yük tonajını yaklaşık 80 ton fazla göstermiş, bu da kantar/draft uyuşmazlığı nedeniyle yükleten ile ihtilafa yol açmıştır. Ders: tüm tankların sounding'i istisnasız alınır ve çift kontrol yapılır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Cargo Tally ve Yük Kaydı",
      sections: [
        {
          subheading: "4.1 Tally tutma ilkeleri",
          paragraphs: [
            `Cargo tally, yüklenen/boşaltılan koli, palet, big-bag, çelik bobin gibi sayılabilir yük birimlerinin (general cargo, breakbulk) tek tek sayılarak kaydedilmesidir. Dördüncü Zabit, gangway veya hatch başında konumlanır; her vinç/forklift hareketini parça ve marka (cargo marks) bazında işaretler ve shore tally ile periyodik mutabakat yapar.`,
            `Tally kayıtları mate's receipt ve nihayetinde konşimentonun (Bill of Lading) temelini oluşturur. Hasarlı, eksik veya farklı markalı yük tespit edildiğinde derhal not düşülür ("said to contain", remark/clause). Yanlış tally, gemiyi haksız tazminat (claim) riskine sokar.`,
          ],
          bullets: [
            `Parça sayısı ve marka (shipping marks) eşleşmesi`,
            `Hasar tespiti (ezik, ıslak, kırık) ve fotoğraflama`,
            `Shore tally ile saat başı mutabakat`,
            `Mate's receipt için remark/clause notları`,
            `Sling/load birim ağırlık ve SWL uyumu`,
          ],
        },
        {
          subheading: "4.2 Yük hasarı ve uygunsuzluk raporlama",
          paragraphs: [
            `Yükleme öncesi mevcut hasar (pre-existing damage) ile operasyon sırasında oluşan hasar ayırt edilir. Dördüncü Zabit, her hasarı fotoğraf, konum ve zamanla belgeler ve Birinci Zabit'e iletir. Bu belgeleme, sonraki cargo claim süreçlerinde geminin savunmasını oluşturur.`,
            `Yükün cinsine aykırı bir durum (örn. nemli tahıl, sızdıran varil, IMDG etiket uyuşmazlığı) görüldüğünde operasyon durdurularak rapor edilir. Kıdemsiz zabit, "küçük görünen" anormallikleri bile bildirmekle yükümlüdür; değerlendirme yetkisi üst zabitindir.`,
          ],
        },
      ],
    },
    {
      heading: "5. Hatch Cover Operasyonları",
      sections: [
        {
          subheading: "5.1 Hatch cover açma/kapama emniyeti",
          paragraphs: [
            `Hidrolik folding veya side-rolling hatch cover'lar açılırken/kapanırken Dördüncü Zabit, cleat (kilit), wheel, hidrolik basınç ve panel hareketini gözetir. Operasyon alanı insanlardan temizlenir; ezilme (crush) ve düşme riski en yüksek tehlikelerdir. Panel hareket ederken hiç kimse cover üstünde veya hareket hattında bulunmaz.`,
            `Açık hatch kenarları düşme riski taşır; gerekli korkuluk/zincir bariyer kurulur ve emniyet kemeri kullanılır. Hava bozduğunda veya operasyon dışında hatch'ler kapatılır ve cleat'lenir; SOLAS yük gemisi su geçirmezliği bu sızdırmazlığa bağlıdır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Hatch cover — ezilme ve düşme",
              text: `Hatch cover operasyonları, güvertedeki en ölümcül kazaların başında gelir. Panel hareket hattında durmak, açık hatch kenarında korkuluksuz çalışmak ve cleat'i elle açmaya çalışmak yasaktır. Operasyon tek bir sorumlu tarafından komuta edilir.`,
            },
          ],
        },
        {
          subheading: "5.2 Su geçirmezlik (weathertightness) kontrolü",
          paragraphs: [
            `Hatch cover'ların su geçirmezliği rubber packing (conta), compression bar, drainage channel ve cross joint sızdırmazlığına bağlıdır. Dördüncü Zabit; conta ezilme izi, çatlak, eksik bölüm ve compression'ın yeterliliğini gözle kontrol eder. Hose test veya ultrasonic test sonuçlarının kaydına yardım eder.`,
            `Sefer öncesi tüm hatch'ler kapatılır, cleat'lenir ve cross joint'ler sıkılır. Denizde su girişi (ingress), kuru yük gemilerinde batma sebebi olabilecek (örn. tahıl, demir cevheri kayması/sıvılaşması) en ciddi risklerdendir.`,
          ],
        },
      ],
    },
    {
      heading: "6. Lashing ve Cargo Securing Kontrolleri",
      sections: [
        {
          subheading: "6.1 Lashing/securing prensipleri",
          paragraphs: [
            `Cargo Securing Manual (CSM), her geminin onaylı yük bağlama el kitabıdır ve hangi yükün nasıl, hangi ekipmanla (lashing chain, wire, turnbuckle, web lashing, twistlock) bağlanacağını belirler. Dördüncü Zabit, Birinci Zabit gözetiminde lashing planına uygunluğu denetler ve eksik/gevşek bağlamayı raporlar.`,
            `Bağlama hesabı, beklenen deniz hareketinden doğan ataletsel kuvvetlere (forward/transverse/vertical acceleration) karşı yapılır. Aşırı veya yetersiz lashing aynı ölçüde tehlikelidir; sertifikalı ekipmanın MSL (Maximum Securing Load) değeri aşılmaz. Sertifikasız/zincir hasarlı ekipman kullanılmaz.`,
          ],
          table: {
            caption: `Yaygın Lashing Ekipmanı ve Kontrol Noktaları`,
            headers: ["Ekipman", "Kullanım", "Kontrol noktası"],
            rows: [
              ["Lashing chain", "Ağır/çelik yük", "Halka çatlağı, aşınma, MSL"],
              ["Turnbuckle", "Gerginlik ayarı", "Diş aşınması, kilit pimi"],
              ["Web lashing", "Hafif/paletli yük", "Kesik, çürüme, ratchet"],
              ["Twistlock", "Konteyner", "Otomatik kilit, deformasyon"],
              ["D-ring / pad eye", "Bağlama noktası", "Kaynak çatlağı, deformasyon"],
            ],
          },
        },
        {
          subheading: "6.2 Sefer boyunca lashing kontrolü",
          paragraphs: [
            `Denizde, özellikle kötü havadan önce ve sonra, lashing'ler güvenli koşullarda kontrol edilir ve gerekirse sıkılır. Dördüncü Zabit, vardiyası sırasında güvenli olduğunda lashing turu için Birinci Zabit'e eşlik eder. Yükün kayması (shifting) stabilite kaybına ve listing'e yol açabilir.`,
            `Lashing kontrolü, dalgalı güvertede tek başına ve emniyet kemeri olmadan yapılmaz. Hava çok kötüyse kontrol ertelenir; insan güvenliği yük güvenliğinin önünde gelir. Gevşeyen veya kopan lashing derhal raporlanır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS VI/5 ve VII/5 — Cargo Securing Manual",
              text: `Yükler, idarece onaylı Cargo Securing Manual'a uygun olarak istiflenir ve bağlanır. CSM'siz veya CSM dışı bağlama, PSC eksikliği ve yük kayması riski doğurur. Dördüncü Zabit lashing'i daima CSM referansıyla denetler.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. Stabilite, Stres ve Operasyonel Limitler",
      sections: [
        {
          subheading: "7.1 Ara stabilite ve stres takibi",
          paragraphs: [
            `Yükleme/boşaltma her kademede gemiyi izin verilen GM (metasantr yüksekliği), trim, list ve gövde stresleri (shear force, bending moment) içinde tutmalıdır. Birinci Zabit bunu loading computer ile yönetir; Dördüncü Zabit, ara draft ve sounding verilerini sağlayarak hesabın gerçeğe uygun kalmasına katkı verir.`,
            `Aşırı pozitif GM "stiff" (sert, ani yalpa), düşük GM "tender" (yavaş, riskli yalpa) demektir; ikisi de yönetilmelidir. Free surface effect (kısmi dolu tanklar) GM'i düşürür. Dördüncü Zabit, slack tank durumlarını raporlayarak bu etkinin gözetilmesine yardım eder.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Hogging/sagging ve stres limitleri",
              text: `Yanlış yükleme sırası (örn. uçlardan ya da ortadan aşırı yükleme) gövdeyi izin verilen bending moment üzerine çıkararak kalıcı deformasyon veya çatlağa yol açabilir. Loading computer alarmları asla göz ardı edilmez; ara değerler düzenli kontrol edilir.`,
            },
          ],
        },
        {
          subheading: "7.2 Tehlikeli yük ve özel yük dikkatleri",
          paragraphs: [
            `IMDG (ambalajlı tehlikeli yük) ve IMSBC (dökme katı yük) kapsamındaki yüklerde ayrıştırma (segregation), havalandırma, sıvılaşma (TML/FMP) ve self-heating gibi riskler vardır. Dördüncü Zabit, bu yüklerin stowage ve segregation planına uygunluğunu gözetir ve etiket/işaret uyumsuzluklarını raporlar.`,
            `Tankerlerde ISGOTT prensipleri (statik elektrik, inert gaz, overfill koruması, gaz ölçümü) geçerlidir. Kıdemsiz zabit, bu tip gemilerde operasyonu önce gözlemleyerek öğrenir; yetki ve karar daima üst zabittedir.`,
          ],
        },
      ],
    },
    {
      heading: "8. Çevre Koruma ve Kirlilik Önleme",
      sections: [
        {
          subheading: "8.1 Dökülme önleme ve SOPEP",
          paragraphs: [
            `Yük/yakıt operasyonlarında deniz kirliliğini önlemek için scupper plug'lar takılır, drip tray'ler yerleştirilir ve SOPEP/SMPEP ekipmanı hazır tutulur. Dördüncü Zabit, manifold/flanş bağlantılarını ve güverte tahliye deliklerini operasyon öncesi kontrol eder ve sahada gözetler.`,
            `Herhangi bir dökülme/sızıntı anında operasyon derhal durdurulur, alarm verilir ve SOPEP planı devreye alınır. MARPOL Annex I (yağ) ihlali ağır cezalar ve detention doğurur; en küçük sızıntı bile derhal raporlanır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MARPOL Annex I/VI — Kirlilik önleme",
              text: `Yük ve yakıt operasyonlarında denize en küçük yağ/zararlı madde deşarjı yasaktır. Scupper plug'lar takılı, SOPEP ekipmanı hazır olmalı, gözcü manifoldda bulunmalıdır. Dökülmede ilk eylem: durdur, ihbar et, çevrele.`,
            },
          ],
        },
        {
          subheading: "8.2 Yük artığı ve atık yönetimi",
          paragraphs: [
            `Hold süpürtüleri, kayış/lashing atıkları, dunnage ve ambalaj atıkları MARPOL Annex V'e göre ayrıştırılır; denize atılmaz. Dördüncü Zabit, operasyon sonrası güverte ve hold temizliğinde bu atıkların doğru toplanmasını gözetir ve Garbage Record Book'a kayıt için bilgi sağlar.`,
          ],
        },
      ],
    },
    {
      heading: "9. Pratik Kontrol Listesi ve Kapanış",
      sections: [
        {
          subheading: "9.1 Yük operasyonu destek kontrol listesi",
          bullets: [
            `Cargo plan, yükleme sırası ve stres/stabilite limitleri anlaşıldı mı?`,
            `Ship/shore safety checklist ve toolbox talk tamamlandı mı?`,
            `Tank/hold sounding'leri manuel ve gauge ile çapraz doğrulandı mı?`,
            `Draft okumaları (F/M/A, iki borda) doğru ve okunaklı kaydedildi mi?`,
            `Cargo tally shore ile mutabık ve hasarlar belgelendi mi?`,
            `Hatch cover operasyonu insan hattı temiz ve weathertight kapatıldı mı?`,
            `Lashing/securing CSM'ye uygun ve ekipman sertifikalı mı?`,
            `Scupper plug, drip tray ve SOPEP ekipmanı hazır mı?`,
            `Her anormallik (sızıntı, hasar, gevşek lashing) derhal raporlandı mı?`,
          ],
          paragraphs: [
            `Dördüncü Zabit için yük operasyonu desteği, ileride yük zabiti (Chief Officer) olacak zabitin en değerli saha eğitimidir. Sounding'in titizliği, draft okumanın doğruluğu, tally'nin dürüstlüğü ve lashing kontrolünün disiplini hem geminin hem de yükün emniyetini belirler. Bu dönemde edinilen "gördüğünü raporla, emin olmadığını sorgula" alışkanlığı, kariyer boyunca milyonlarca dolarlık yükün ve mürettebatın güvenliğinin teminatı olur.`,
          ],
        },
      ],
    },
  ],
};

export default content;
