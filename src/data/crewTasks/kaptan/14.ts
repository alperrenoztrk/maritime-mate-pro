import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Sigorta (H&M, P&I) koordinasyonu ve hukuki muhataplık",
  roleSlug: "kaptan",
  taskIndex: 14,
  estimatedPages: 26,
  intro: `Bir deniz olayının (çatışma, oturma, yangın, kargo hasarı, kirlilik, yaralanma) ardından geminin sigorta ve hukuki süreçlerinin sahadan yönetimi kaptanın temel sorumluluklarından biridir. Kaptan; Hull & Machinery (H&M) ve P&I (Protection & Indemnity) sigortacılarına zamanında bildirim yapar, surveyor atanmasını koordine eder, hasar tespit raporlarının doğru oluşmasını sağlar ve salvage, towage, general average gibi süreçlerde Lloyd's Open Form benzeri sözleşmeleri imzalama yetkisini kullanır. Aynı zamanda hukuki tebligat, mahkeme yazışmaları ve sworn statement süreçlerinde geminin ve şirketin birincil muhatabıdır. Bu bölüm, bu sorumlulukları H&M ile P&I'ın kapsam farkından başlayıp delil toplama, GA ilanı ve club correspondent ile çalışma pratiğine kadar somut adımlarla ele alır.`,
  sources: [
    "H&M Poliçeleri — Institute Time Clauses (Hulls) 1/10/83 & 1/11/95, Nordic Marine Insurance Plan",
    "International Group P&I Club Rules (örn. Gard, UK Club, North Standard) ve FD&D cover",
    "York-Antwerp Rules 2016 (General Average)",
    "Lloyd's Open Form (LOF 2020) ve SCOPIC Clause",
    "Salvage Convention 1989 (International Convention on Salvage)",
    "Towcon / Towhire (BIMCO standart towage sözleşmeleri)",
    "Marine Insurance Act 1906 (utmost good faith, sue and labour)",
    "MAIB / flag state casualty investigation gerekleri ve ISM Code Madde 9",
  ],
  chapters: [
    {
      heading: "1. Deniz Sigortasının İki Ayağı: H&M ve P&I",
      lead: `Geminin sigorta korumasının iki temel direği vardır: gemi/makineyi koruyan Hull & Machinery ve üçüncü taraflara karşı sorumlulukları karşılayan P&I. Kaptanın hangi olayı kime bildireceğini bilmesi, sürecin doğru başlamasını sağlar.`,
      sections: [
        {
          subheading: "1.1 Hull & Machinery (H&M) kapsamı",
          paragraphs: [
            `H&M poliçesi, geminin kendi gövdesine ve makinesine gelen fiziksel hasarı (hull and machinery damage) karşılayan bir mal (property) sigortasıdır. Tipik olarak Institute Time Clauses (Hulls) gibi standart kloz setleri üzerine kurulur. Çatışma sonucu gemi gövdesinde oluşan deformasyon, makine dairesinde yangın hasarı, karaya oturma sonrası dip plakası hasarı veya pervane/şaft hasarı H&M kapsamındadır. H&M ayrıca "running down clause" (RDC/3/4ths collision liability) ile çatışmada karşı gemiye verilen hasarın belirli bir oranını da karşılayabilir.`,
            `H&M poliçesinde bir muafiyet (deductible) bulunur; küçük hasarlar bu muafiyetin altında kaldığından gemi/şirket tarafından karşılanır. "Sue and labour" klozu (Marine Insurance Act 1906), sigortalının hasarı azaltmak için makul masraf yapmasını ve bu masrafın sigortacı tarafından karşılanmasını öngörür — kaptanın bir olay sonrası hasarı sınırlama çabası bu kapsamda önemlidir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "Marine Insurance Act 1906 — Sue & Labour",
              text: `Sigortalı (ve onun adına kaptan), sigortalı bir tehlikenin gerçekleşmesinden sonra zararı önlemek veya azaltmak için makul tedbirleri almakla yükümlüdür. Bu amaçla yapılan makul masraflar sigortacı tarafından ayrıca karşılanır; ancak bu yükümlülüğün ihmali tazminatı zayıflatabilir.`,
            },
          ],
        },
        {
          subheading: "1.2 P&I (Protection & Indemnity) kapsamı",
          paragraphs: [
            `P&I, geminin üçüncü taraflara karşı sorumluluklarını (third party liabilities) karşılayan karşılıklı bir sigorta (mutual insurance) sistemidir; armatörlerin oluşturduğu kulüpler (club) üzerinden işler. P&I kapsamı tipik olarak şunları içerir: kargo hasarı/kaybı sorumluluğu, mürettebat ve üçüncü kişilerin yaralanma/ölümü, kirlilik (oil pollution) sorumluluğu, enkaz kaldırma (wreck removal), çatışmada H&M'in karşılamadığı 1/4 sorumluluk, liman/dock hasarı, para cezaları ve stowaway/repatriation gibi giderler.`,
            `Birçok kulüp, ayrıca FD&D (Freight, Demurrage & Defence) korumasını ayrı bir cover olarak sunar; bu, sözleşmesel uyuşmazlıklarda (charter party, navlun, demuraj) hukuki masrafları karşılar. Kaptanın pratikteki görevi, bir olayın H&M mi P&I mi yoksa her ikisini birden mi ilgilendirdiğini hızla değerlendirip her iki kanalı da zamanında bilgilendirmektir; çünkü bir çatışma aynı anda kendi gemisine hasar (H&M), karşı tarafa sorumluluk (P&I) ve kargo iddiası (P&I) doğurabilir.`,
          ],
          table: {
            caption: `H&M ve P&I — Kapsam Karşılaştırması`,
            headers: ["Olay / Zarar türü", "H&M", "P&I"],
            rows: [
              ["Kendi gemi/makine hasarı", "Evet", "Hayır"],
              ["Çatışmada karşı gemiye hasar", "3/4 (RDC)", "1/4 + aşan kısım"],
              ["Kargo hasarı / kayıp sorumluluğu", "Hayır", "Evet"],
              ["Petrol/çevre kirliliği sorumluluğu", "Hayır", "Evet"],
              ["Mürettebat yaralanma/ölüm", "Hayır", "Evet"],
              ["Enkaz kaldırma (wreck removal)", "Hayır", "Evet"],
              ["Stowaway / repatriation giderleri", "Hayır", "Evet"],
            ],
          },
        },
      ],
    },
    {
      heading: "2. Olay Sonrası İlk Saatler: Bildirim ve Delil",
      lead: `Bir olayın hukuki ve sigorta sonuçları, çoğunlukla ilk birkaç saatte toplanan (veya kaybedilen) delillerle belirlenir. Kaptanın bu pencerede yaptıkları, milyonlarca dolarlık farklar yaratabilir.`,
      sections: [
        {
          subheading: "2.1 Zamanında bildirim (prompt notification)",
          paragraphs: [
            `P&I kulüp kuralları ve H&M poliçeleri, sigortalıdan olayın "without undue delay" (gereksiz gecikme olmaksızın) bildirilmesini ister. Geç bildirim, kulübün/sigortacının prejudice (zarar) gördüğü ölçüde teminatı zayıflatabilir. Kaptan, olay olur olmaz şirketi (DPA/operasyon) bilgilendirir; şirket de H&M ve P&I'ı resmî olarak haberdar eder. Birçok şirket, kaptanın doğrudan P&I correspondent'ı arayabileceği bir emergency contact listesi tutar.`,
            `Bildirim, soğukkanlı ve olgusal olmalıdır. Kaptan, sorumluluk kabul eden ("biz hata yaptık") ifadelerden kaçınır; çünkü erken ve düşünülmemiş kabuller ileride aleyhe delil olur. Bildirimde olayın yeri, zamanı (UTC), hava/görüş koşulları, gemi durumu, yaralı/ölü/kirlilik olup olmadığı ve alınan acil önlemler yer alır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Sorumluluk kabulünden kaçının",
              text: `Olay yerinde veya yazışmada acele bir "kusur kabulü", hem sigorta teminatını hem de davadaki konumu zayıflatabilir. Olguları kaydedin, sorumluluk değerlendirmesini hukukçulara ve sigortacıya bırakın. "Without prejudice" çerçevesi dışında resmi açıklama yapmayın.`,
            },
          ],
        },
        {
          subheading: "2.2 Delil toplama ve kanıt koruma",
          paragraphs: [
            `Kaptan, olaydan hemen sonra delilleri sistematik olarak korur ve toplar: deck/engine log book girişleri (zaman damgalı, gerçek), bell book / movement book, ECDIS ve radar kayıtları, VDR (Voyage Data Recorder) verisinin "save" edilip korunması, GMDSS log, hava raporları, fotoğraf ve video, mürettebatın görgü notları. VDR kaydı olayın hemen ardından korunmazsa (saved) üzerine yazılarak kaybolabilir; bu nedenle VDR'ın güvenceye alınması ilk dakikaların önceliğidir.`,
            `Kargo, kirlilik veya yaralanma içeren olaylarda surveyor gelene kadar olay mahalli mümkün olduğunca korunur. Kaptan, hasar gören bölgelerin fotoğraflarını çeker, ölçümleri (sounding, draft, ullage) kaydeder ve tüm belgeleri tek bir "casualty file" altında toplar. Bu dosya, ileride P&I tazminatı, GA hesabı ve mahkeme süreci için temel kaynaktır.`,
          ],
          bullets: [
            `VDR/S-VDR verisini "save" edip kopyasını güvenceye al`,
            `Log book, bell book, GMDSS log girişlerini eksiksiz tut`,
            `ECDIS rota/alarm kayıtları ve radar görüntülerini sakla`,
            `Hasar bölgelerinin tarih/saatli fotoğraf ve videosu`,
            `Draft/ullage/sounding ölçümleri ve tank durumları`,
            `Hava/görüş kayıtları ve resmi tahmin çıktıları`,
          ],
        },
      ],
    },
    {
      heading: "3. Surveyor Atanması ve Hasar Tespiti",
      sections: [
        {
          subheading: "3.1 Surveyor türleri ve roller",
          paragraphs: [
            `Bir olayın ardından birden çok surveyor gemiye gelebilir ve her birinin farklı bir vekili (principal) vardır. H&M sigortacısı kendi surveyor'unu (gemi/makine hasarını tespit için) atar; P&I kulübü kendi surveyor'unu (sorumluluk/kargo için) atar; karşı taraf (örneğin çarpışılan gemi, kargo ilgilisi) kendi surveyor'unu gönderebilir; klas (class) ise klas durumunu (condition of class) değerlendirir. Kaptan, hangi surveyor'un kimi temsil ettiğini bilmeli ve buna göre işbirliği seviyesini ayarlamalıdır.`,
            `Kendi sigortacı/kulüp surveyor'larıyla tam işbirliği yapılır. Karşı taraf surveyor'una makul erişim sağlanır ancak ifade ve belge paylaşımı şirket/P&I yönlendirmesiyle yapılır; karşı taraf surveyor'una kontrolsüz beyan vermek aleyhe delil yaratabilir. Kaptan, her surveyor ziyaretini, kimin temsilcisi olduğunu, neye baktığını ve neyi belgelediğini kaydeder.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Joint survey faydası",
              text: `Çatışma veya kargo hasarı olaylarında "joint survey" (tarafların surveyor'larının birlikte tespit yapması) ileride hasarın boyutu konusundaki ihtilafı azaltır. Kaptan, P&I correspondent ile koordine ederek joint survey ayarlanmasını teşvik edebilir.`,
            },
          ],
        },
        {
          subheading: "3.2 Hasar tespit raporları ve kayıt zinciri",
          paragraphs: [
            `Hasar tespit raporları (survey reports), tazminatın ve sorumluluk paylaşımının temelidir. Kaptan, surveyor'ın gözlemlediği hasarın kapsam ve niteliğini bağımsız olarak da belgeler; surveyor'ın raporu ile geminin kendi kayıtları arasında tutarlılık aranır. Hasarın "pre-existing" (önceden var olan) mu yoksa bu olaydan mı kaynaklandığı sıkça ihtilaf konusu olur; bu yüzden geminin düzenli bakım/klas kayıtları (hasar öncesi durumu kanıtlamak için) kritiktir.`,
            `Kargo hasarında, hasarın gemiye yüklenmeden önce mi (clausing / Mate's Receipt notu) yoksa taşıma sırasında mı oluştuğunu ayırt etmek tazminat sorumluluğunu belirler. Kaptan, yükleme/boşaltmadaki hasar gözlemlerini Letter of Protest ve survey ile belgeler. Bu kayıtlar P&I'ın kargo iddiasını savunmasında doğrudan kullanılır.`,
          ],
        },
      ],
    },
    {
      heading: "4. Salvage: Lloyd's Open Form ve SCOPIC",
      sections: [
        {
          subheading: "4.1 Lloyd's Open Form (LOF) ve 'no cure - no pay'",
          paragraphs: [
            `Gemi tehlikedeyse (oturmuş, yangın, makine arızasıyla sürükleniyor) ve dışarıdan kurtarma (salvage) yardımı gerekiyorsa, en yaygın sözleşme Lloyd's Open Form'dur (LOF). LOF, "no cure - no pay" prensibine dayanır: kurtarıcı (salvor) başarılı olursa ödül alır, başarısız olursa ödeme yoktur. LOF'un en büyük avantajı, tehlike anında uzun fiyat müzakeresine gerek kalmadan hızla imzalanabilmesidir; ödül miktarı sonradan Lloyd's tahkimiyle (arbitration) belirlenir.`,
            `Kaptan, tehlike (peril) durumunda LOF imzalama yetkisine sahiptir; ancak mümkünse önce şirket ve P&I/H&M ile temas kurar. Süre kritikse ve iletişim yoksa, gemi ve mürettebatın emniyeti için kaptan LOF'u imzalar — bu yetki SOLAS'ın emniyet önceliği ve denizcilik teamülüyle desteklenir. İmza sonrası şirket ve sigortacılar derhal bilgilendirilir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "Salvage Convention 1989 — Madde 8 & 13/14",
              text: `Kurtarma operasyonunda hem kurtarıcının hem de gemi sahibinin/kaptanın işbirliği ve makul özen yükümlülüğü vardır. Ödül (Madde 13) gemi/yük değeri, başarı, beceri ve risk gibi kriterlere göre belirlenir; Madde 14 ise çevre zararını önleyen kurtarıcı için özel tazminat (special compensation) öngörür.`,
            },
          ],
        },
        {
          subheading: "4.2 SCOPIC klozu ve çevre riski",
          paragraphs: [
            `SCOPIC (Special Compensation P&I Clause), LOF'a eklenebilen ve özellikle çevresel risk taşıyan kurtarmalarda devreye giren bir mekanizmadır. Klasik "no cure - no pay" mantığında kurtarıcı, çevre tehdidi olan ama düşük ticari değerli bir geminin kurtarılmasında zarara uğrayabilir; SCOPIC, kurtarıcıya başarıdan bağımsız olarak makul masraf + belirli bir marj öder. SCOPIC tazminatı tipik olarak P&I tarafından karşılanır.`,
            `SCOPIC devreye alındığında, P&I'ın atadığı bir SCR (Special Casualty Representative) operasyona katılır ve kurtarma giderlerini izler. Kaptan, SCR ve salvage master ile koordinasyon içinde çalışır; gemi mürettebatı genellikle kurtarma operasyonuna fiilen destek verir (örneğin towing connection, pompalama, hasar kontrolü). Tüm bu süre boyunca emniyet ve çevre koruması önceliklidir.`,
          ],
        },
      ],
    },
    {
      heading: "5. Towage: Towcon ve Towhire",
      sections: [
        {
          subheading: "5.1 Salvage olmayan çekme operasyonları",
          paragraphs: [
            `Her dış yardım salvage değildir. Gemi acil tehlikede değil ama yardıma ihtiyaç duyuyorsa (örneğin makine arızasıyla limana çekilme, ölü çekme/dead tow), bu bir towage sözleşmesi kapsamında yürür. BIMCO'nun Towcon (götürü ücretli) ve Towhire (günlük ücretli) standart sözleşmeleri bu amaçla kullanılır. Salvage ile towage arasındaki ayrım önemlidir; çünkü salvage ödülü towage ücretinden çok daha yüksek olabilir.`,
            `Kaptan, durumu doğru sınıflandırır: gerçek bir tehlike (peril) yoksa ve müzakere mümkünse towage sözleşmesi tercih edilir; çünkü bilinen ve sabit bir maliyeti vardır. Ancak bir towage operasyonu sırasında durum kötüleşir ve gerçek tehlike doğarsa, bu salvage'a dönüşebilir. Kaptan, sözleşme türünü ve ücret esasını şirket/P&I ile koordine eder.`,
          ],
          table: {
            caption: `Salvage vs Towage — Temel Farklar`,
            headers: ["Kriter", "Salvage (LOF)", "Towage (Towcon/Towhire)"],
            rows: [
              ["Tehlike (peril) şartı", "Var (gerçek tehlike)", "Yok / düşük"],
              ["Ödeme esası", "No cure-no pay + ödül", "Sabit/günlük ücret"],
              ["Maliyet öngörülebilirliği", "Düşük (tahkimle belirlenir)", "Yüksek (sözleşmeli)"],
              ["Çevre riski mekanizması", "SCOPIC mümkün", "Standart yok"],
              ["İmza aciliyeti", "Çok yüksek", "Müzakereye açık"],
            ],
          },
        },
      ],
    },
    {
      heading: "6. General Average (Müşterek Avarya)",
      lead: `General average, ortak bir tehlikeden kurtulmak için kasıtlı ve makul yapılan fedakârlık/masrafın, kurtulan tüm menfaatler (gemi, yük, navlun) arasında orantılı paylaşılması ilkesidir. Bu antik denizcilik prensibi, York-Antwerp Rules ile kodifiye edilir.`,
      sections: [
        {
          subheading: "6.1 GA ilanı ve York-Antwerp Rules",
          paragraphs: [
            `General Average (GA), örneğin yangını söndürmek için kargonun ıslatılması, oturan gemiyi kurtarmak için kargonun denize atılması (jettison) ya da kurtarma/towage masrafları gibi, ortak tehlikeden kurtulmak için yapılan fedakârlıkların paylaşılmasıdır. GA ilan edildiğinde, kurtulan tüm tarafların (gemi sahibi + tüm kargo sahipleri) kayıplara katkı (contribution) payı, York-Antwerp Rules (yaygın olarak 2016 versiyonu) çerçevesinde hesaplanır.`,
            `GA'yı ilan etme kararı genelde gemi sahibi/şirket tarafından, bir average adjuster (avarya dispeççisi) atanarak verilir; ancak kaptan, GA doğuran olayın (jettison, yangın söndürme, kurtarma) tüm detaylarını eksiksiz belgelemekten sorumludur. Kaptanın kayıtları (hangi kargo, ne zaman, hangi gerekçeyle feda edildi) GA hesabının temelidir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "York-Antwerp Rules — Rule A",
              text: `Bir general average eylemi, ancak ortak bir deniz serüvenindeki menfaatleri tehlikeden kurtarmak amacıyla, kasıtlı ve makul biçimde olağanüstü bir fedakârlık veya masraf yapıldığında doğar. "Kasıtlı, makul ve olağanüstü" ölçütlerinin tümü birlikte aranır.`,
            },
          ],
        },
        {
          subheading: "6.2 GA bond, GA guarantee ve average adjuster",
          paragraphs: [
            `GA ilan edildiğinde, kargo sahiplerinden katkı paylarını güvence altına alan belgeler istenir: Average Bond (kargo sahibinin imzaladığı taahhüt) ve Average Guarantee (kargonun sigortacısının verdiği garanti) veya nakit depozito. Bu güvenceler tamamlanmadan kargo teslim edilmez; çünkü kargo teslim edildikten sonra katkı payını tahsil etmek çok zorlaşır. Bu süreç çoğu zaman teslimi geciktirir ve hassas koordinasyon gerektirir.`,
            `Average adjuster (örneğin Richards Hogg Lindley gibi firmalar), kurtulan tüm menfaatlerin değerini ve fedakârlıkların tutarını hesaplayarak her tarafın katkı payını belirleyen "general average statement"ı düzenler. Bu süreç aylar/yıllar sürebilir. Kaptanın görevi, adjuster'a doğru ve eksiksiz belge sağlamaktır; eksik belge hem hesabı geciktirir hem de gemi sahibinin lehine olan kalemlerin GA'ya dahil edilmemesine yol açabilir.`,
          ],
          bullets: [
            `GA doğuran olayı tam belgeleyen log/rapor`,
            `Average Bond / Average Guarantee toplanmadan kargo teslim etme`,
            `Atanan average adjuster ile belge koordinasyonu`,
            `Kurtarma/towage faturalarının ve sue&labour masraflarının saklanması`,
            `Kargo manifesti, B/L ve değer bilgilerinin hazır tutulması`,
          ],
        },
      ],
    },
    {
      heading: "7. Kaptanın Hukuki Muhataplığı",
      sections: [
        {
          subheading: "7.1 Tebligat, mahkeme yazışması ve sworn statement",
          paragraphs: [
            `Kaptan, gemi ve şirket adına hukuki sürecin sahadaki birincil muhatabıdır. Bir olay sonrası mahkeme/idare tebligatları (writ, arrest warrant, subpoena), liman/kıyı devleti soruşturma talepleri ve karşı tarafın hukuki yazışmaları öncelikle kaptana ulaşır. Kaptan, bu belgeleri imzalamadan veya yanıt vermeden önce mutlaka şirket ve P&I'ın FD&D/hukuk birimi ile temas kurar. Aceleci imza veya beyan, geminin hukuki konumunu zayıflatabilir.`,
            `Sworn statement (yeminli ifade), affidavit veya soruşturma ifadeleri, olayın hukuki sonucunu doğrudan etkiler. Kaptan, ifade vermeden önce hukuki danışmanlık alır; ifade, olgulara dayalı, tutarlı ve gemi kayıtlarıyla uyumlu olmalıdır. "I don't recall" yerine kayıtlara dayanmak, çelişkiye düşmemek ve spekülasyondan kaçınmak temel ilkelerdir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka dersi — gemi tutuklama (ship arrest)",
              text: `Bir çatışma sonrası karşı taraf, alacağını güvence altına almak için gemiyi limanda tutuklattı (arrest). Gemi, P&I'ın verdiği bir LOU (Letter of Undertaking) / güvence (security) karşılığında serbest bırakıldı. Ders: kaptan, arrest tebligatını derhal P&I correspondent'a iletmeli; güvence (security) müzakeresi club tarafından yürütülür, böylece gemi ticari kayıp yaşamadan sefere devam eder.`,
            },
          ],
        },
        {
          subheading: "7.2 Sea Protest ve Note of Protest",
          paragraphs: [
            `Sea Protest (Note of Protest), kaptanın olağandışı bir olay (ağır hava, oturma, kargo hasarı riski, çatışma) sonrası, kendisinin ve geminin kusursuz olduğunu ve hasarın dış etkenlerden kaynaklandığını resmen kayda geçirdiği bir beyandır. İlk uygun limanda noter veya konsolosluk huzurunda, genelde varıştan sonra makul bir süre içinde (sıkça 24 saat içinde) yapılır. Sea Protest, ileride doğacak kargo iddialarına ve GA süreçlerine karşı geminin pozisyonunu güçlendirir.`,
            `Kaptan, Sea Protest'i "extended" (genişletilmiş) olarak da hazırlayabilir; bu, daha sonra ek delil sunma hakkını saklı tutar. Sea Protest tek başına sorumluluğu ortadan kaldırmaz; ancak resmî ve zamanında bir beyan olarak geminin iyi niyetini ve olguları kayda geçirir. Kaptan, protesto pratiğini şirket/P&I yönlendirmesiyle uygular.`,
          ],
        },
      ],
    },
    {
      heading: "8. Club Correspondent ve Koordinasyon Ağı",
      sections: [
        {
          subheading: "8.1 P&I correspondent'ın rolü",
          paragraphs: [
            `Her büyük limanda P&I kulübünün bir correspondent'ı (yerel temsilcisi) bulunur. Correspondent, kaptanın o limandaki gözü, kulağı ve eli gibidir: surveyor ayarlar, yerel avukat tutar, güvence (security) müzakere eder, yetkililerle iletişimi yürütür ve gerekli belgeleri toplar. Bir olay olduğunda kaptanın ilk aramalarından biri (şirket onayıyla) ilgili limanın P&I correspondent'ına olmalıdır; correspondent listesi gemide güncel tutulur.`,
            `Correspondent ile çalışırken kaptan, olgusal ve şeffaf olur; ancak hukuki strateji ve sorumluluk değerlendirmesi correspondent + club avukatı tarafından yönlendirilir. Kaptan, correspondent'ın taleplerini (belge, ifade, erişim) şirketle koordine ederek karşılar. Bu işbirliği, sürecin hem hızlı hem de hukuki açıdan korunaklı yürümesini sağlar.`,
          ],
        },
        {
          subheading: "8.2 Şirket, klas ve bayrak devleti koordinasyonu",
          paragraphs: [
            `Bir ciddi olay, eş zamanlı olarak birçok tarafı harekete geçirir: şirket (DPA/operasyon), H&M ve P&I sigortacıları, klas kuruluşu (condition of class), bayrak devleti ve gerekirse kıyı devleti (kaza soruşturması, kirlilik otoritesi). ISM Code Madde 9, uygunsuzluk ve kazaların şirkete raporlanmasını ve düzeltici faaliyet (corrective action) ile analiz edilmesini gerektirir. Kaptan, bu çok taraflı iletişimin merkezinde, tutarlı ve tek bir olgusal anlatı sunar.`,
            `Koordinasyonun anahtarı, tek bir "casualty file" ve tek bir olgu kümesidir: farklı taraflara farklı hikâyeler anlatmak felakettir. Kaptan, tüm yazışmaları kaydeder, kimin ne istediğini ve neyin paylaşıldığını izler. Bu disiplin, hem sigorta tahsilatını hızlandırır hem de hukuki süreçte çelişki riskini ortadan kaldırır.`,
          ],
        },
      ],
    },
    {
      heading: "9. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "9.1 Kaptanın olay-sonrası sigorta/hukuk kontrol listesi",
          bullets: [
            `Şirket + H&M + P&I gereksiz gecikme olmadan bilgilendirildi mi?`,
            `VDR verisi "save" edilip güvenceye alındı mı; log/ECDIS/radar kayıtları korundu mu?`,
            `Hasar bölgeleri, ölçümler ve olay mahalli fotoğraf/video ile belgelendi mi?`,
            `Hangi surveyor kimi temsil ediyor — erişim ve işbirliği buna göre mi ayarlandı?`,
            `Tehlike varsa LOF/SCOPIC mi yoksa towage mı doğru sözleşme — şirket/P&I ile koordineli mi?`,
            `GA doğuran olay (jettison/yangın/kurtarma) tam belgelendi; average adjuster bilgilendirildi mi?`,
            `GA bond/guarantee toplanmadan kargo teslim edilmiyor mu?`,
            `Tebligat/arrest/sworn statement öncesi P&I FD&D/hukuk ile temas kuruldu mu?`,
            `Sea Protest ilk uygun limanda zamanında yapıldı mı?`,
            `Tüm taraflara tek ve tutarlı olgu anlatısı; tek casualty file tutuluyor mu?`,
          ],
          paragraphs: [
            `Sigorta ve hukuki muhataplıkta kaptanın gücü, kararları tek başına vermesinden değil; doğru anda doğru tarafı devreye sokmasından ve olguları kusursuzca belgelemesinden gelir. Bir deniz olayında parasal sonucu belirleyen şey çoğu zaman olayın kendisi değil, olaydan sonraki ilk saatlerde toplanan delillerin kalitesi ve bildirimlerin zamanlamasıdır. İyi yönetilen bir casualty süreci, geminin hak ettiği teminatı eksiksiz almasını sağlar; kötü yönetilen bir süreç ise haklı bir gemiyi bile sigortasız ve hukuki olarak savunmasız bırakabilir.`,
          ],
        },
      ],
    },
  ],
};

export default content;
