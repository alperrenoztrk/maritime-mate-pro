import type { TopicDetailContent } from "@/data/navigationTopicContents";

/**
 * Deniz Çevresinin Korunması — "Dersler Beta" okunabilir konu anlatımı.
 *
 * İçerik gerçek standartlara dayanır (MARPOL 73/78 Ek I–VI, BWM Convention,
 * AFS Convention, Hong Kong Convention). `TopicSection.title` değerleri
 * lessonFlow/environment.ts içindeki `sectionRef`/`sectionTitles` ile eşleşir.
 */
export const environmentTopicContents: Record<string, TopicDetailContent> = {
  "MARPOL Genel Yapısı ve Ekler": {
    title: "MARPOL Genel Yapısı ve Ekler",
    introduction:
      "MARPOL 73/78 (International Convention for the Prevention of Pollution from Ships), gemilerden kaynaklanan deniz kirliliğini önlemeye yönelik temel uluslararası sözleşmedir. Hem operasyonel (rutin tahliye) hem kaza kaynaklı kirliliği kapsar ve altı teknik ekten oluşur. Her ek farklı bir kirletici türünü düzenler; uyum, sörveyler ve gemideki kayıtlarla (record books) denetlenir.",
    sections: [
      {
        title: "Altı Ekin Genel Görünümü",
        content:
          "MARPOL, 1973'te kabul edilen sözleşme ile 1978 Protokolü'nün birleşiminden oluşur (bu yüzden **'73/78'**); 1970'lerin büyük tanker kazaları ve kronik operasyonel kirlilik, sözleşmenin şekillenmesinde belirleyici olmuştur. MARPOL hem **kaza kaynaklı** hem **operasyonel (rutin)** kirliliği kapsar ve altı teknik **ek (Annex)** hâlinde düzenlenir; her ek ayrı bir kirletici türünü ele alır.\n\n**Altı ek:** **Ek I** petrol kirliliğini (makine dairesi sintinesi ve tanker yük/slop suyu); **Ek II** dökme zararlı sıvıları (NLS — kimyasal tanker yükleri); **Ek III** paketli zararlı maddeleri (deniz kirleticilerinin ambalajlı taşınması, IMDG üzerinden); **Ek IV** pis suyu (sewage — tuvalet/revir atık suyu); **Ek V** çöpü (garbage — özellikle plastik); **Ek VI** ise hava kirliliğini (SOx, NOx, partikül, ODS) ve sera gazı/enerji verimliliğini düzenler.\n\n**Zorunlu ve isteğe bağlı ekler:** Bir devlet MARPOL'e taraf olurken **Ek I ve Ek II'yi kabul etmek zorundadır** (bunlar sözleşmenin çekirdeğidir); **Ek III–VI ise isteğe bağlıdır**, ancak bugün hepsi yürürlüktedir ve geniş kabul görmüştür. Her ek, gemi tipi ve tonajına göre uygulanır.\n\n**Değişiklik yöntemi (tacit acceptance):** MARPOL teknik eklerini hızlı güncelleyebilmek için **zımni kabul (tacit acceptance)** yöntemini kullanır: IMO'da kabul edilen bir değişiklik, belirli sayıda devlet itiraz etmezse otomatik yürürlüğe girer; bu, kuralların bilim ve teknoloji ilerledikçe güncel kalmasını sağlar. **Gemide önemi:** Bir zabit, geminin tipine ve o anki bölgeye hangi eklerin/kuralların uygulandığını bilmelidir; çünkü aynı işlem (örn. sintine tahliyesi) bir yerde yasal, başka yerde ağır suç olabilir.",
      },
      {
        title: "Özel Alanlar ve Emisyon Kontrol Alanları",
        content:
          "MARPOL, kirliliğe karşı özellikle hassas denizleri **'Özel Alan' (Special Area)** ilan eder; oşinografik ve ekolojik nedenlerle (kapalı/yarı kapalı deniz, yoğun trafik, hassas ekosistem) buralarda tahliye kuralları **çok daha katıdır veya tamamen yasaktır**. Örnekler ek bazında değişir: Akdeniz, Baltık, Karadeniz, Kızıldeniz, Körfez bölgesi (Gulfs area) ve Antarktika çeşitli ekler (I, IV, V) kapsamında özel alandır.\n\n**Emisyon Kontrol Alanları (ECA):** Ek VI, hava kirliliği için ayrı bir kavram olan **Emisyon Kontrol Alanı (Emission Control Area)** tanımlar. Bu bölgelerde **kükürt (SOx)** ve/veya **azot oksit (NOx)** limitleri küresel sınırdan çok daha sıkıdır; başlıca ECA'lar Baltık Denizi, Kuzey Denizi, Kuzey Amerika ve ABD Karayip ECA'sıdır (SOx sınırı ECA içinde %0.10).\n\n**Neden mevki takibi kritik:** Geminin **bulunduğu bölge**, o an hangi tahliye ve emisyon kuralının geçerli olduğunu belirler. Örneğin bir tanker özel alan dışında yasal tahliye yapabilirken, sınırı geçip özel alana girdiğinde aynı işlem suç olur; benzer şekilde ECA'ya girmeden önce düşük kükürtlü yakıta geçilmiş (fuel changeover tamamlanmış) olmalıdır.\n\n**Gemide önemi:** Bölge sınırları seyir planına işlenir ve sürekli izlenir; yakıt değişimi, tahliye ve atık işlemleri bölgeye göre önceden planlanır. Sınırı fark etmeden yapılan bir işlem, iyi niyetli bile olsa ağır ceza doğurabilir.",
      },
      {
        title: "Sörvey, Sertifika ve Kayıtlar",
        content:
          "MARPOL uyumu iki sütun üzerinde denetlenir: periyodik **sörveyler + sertifikalar** ve gemide sürekli tutulan **kayıt defterleri**. Sörveyler (ilk, yıllık, ara, yenileme) geminin donanım ve sistemlerinin kurala uygunluğunu doğrular ve her ek için ilgili sertifika düzenlenir: **IOPP** (petrol — Ek I), **NLS/IPP** sertifikası (Ek II), **ISPP** (pis su — Ek IV) ve **IAPP** (hava — Ek VI).\n\n**Kayıt defterleri:** Sertifikalar donanımın *var olduğunu*, kayıt defterleri ise sistemin *doğru kullanıldığını* gösterir. Zorunlu kayıtlar: **Oil Record Book (ORB)** — Ek I, **Cargo Record Book** — Ek II, **Garbage Record Book (GRB)** — Ek V; Ek VI kapsamında **SEEMP** ve **EEXI/CII** belgeleri; balast için **Ballast Water Record Book**. Her işlem tarih, mevki, miktar ve imza ile kaydedilir.\n\n**Neden bu kadar önemli:** Bu kayıtlar PSC ve kıyı devleti denetimlerinde **en sık incelenen** belgelerdir ve gerçek tank/sistem verileriyle **tutarlı** olmak zorundadır. Tutarsızlık veya sahtelik (özellikle ORB'de) tek başına ağır yaptırım sebebidir.\n\n**Gemide önemi:** Kayıt disiplini, kirliliği önlemek kadar önemlidir; denizcilik tarihindeki birçok yüksek para cezası, fiilî bir kirlilikten değil, **kayıt sahteciliğinden** (örn. atlanan bir OWS bypass'ının deftere yazılmaması) kaynaklanmıştır.",
      },
      {
        title: "İhlal, Raporlama ve Yaptırım",
        content:
          "MARPOL ihlalleri hem **idari** (para cezası, geminin tutulması) hem **cezai** (adli takibat, hapis) sonuçlar doğurabilir. En ağır muamele gören ihlaller: **yasadışı tahliye**, **kayıt sahteciliği** ve arıtmayı atlayan **'magic pipe' (baypas hattı)** düzenekleridir; bu tür kasıtlı ihlaller, özellikle bazı kıyı devletlerinde milyonlarca dolarlık cezalarla ve sorumluların hapsiyle sonuçlanmıştır.\n\n**Raporlama yükümlülüğü:** Kazara kirlilik veya **kirlilik tehdidi** (çatışma, karaya oturma, yapısal hasar, yük kaybı) durumunda gemi, **en yakın kıyı devletine ve şirkete derhâl** bildirim yapar (MARPOL Protokol I ve ilgili raporlama standartları). Geç veya eksik bildirim, olayın çevresel etkisini büyütür ve ayrı bir ihlaldir.\n\n**Acil durum planları:** Gemide **SOPEP** (petrol için) ve kimyasal tankerlerde **SMPEP** (zararlı sıvılar için) bulunur; bunlar döküntü anında görev dağılımını, irtibatları ve müdahale adımlarını tanımlar.\n\n**Çok katmanlı denetim:** Uyum üç düzeyde denetlenir — **bayrak devleti** (kendi gemileri), **liman devleti (PSC)** (limanına gelen yabancı gemiler) ve **kıyı devleti** (sularında kirlilik yapan gemiler). **Gemide önemi:** Bir zabit, hem kirliliği önlemek hem de olduğunda doğru ve zamanında raporlamakla yükümlüdür; dürüst ve hızlı bildirim çevresel zararı sınırlar ve cezayı hafifletir, örtbas girişimi ise durumu felakete çevirir.",
      },
    ],
    keyPoints: [
      "MARPOL altı ek: I petrol, II zararlı sıvı, III paketli, IV pis su, V çöp, VI hava.",
      "Özel Alanlar ve ECA'larda tahliye/emisyon kuralları daha katıdır; bölge sürekli izlenir.",
      "Uyum sörvey/sertifika (IOPP, IAPP...) ve kayıt defterleriyle (ORB, GRB...) denetlenir.",
      "İhlaller ağır cezalıdır; kazada en yakın kıyı devletine derhâl bildirim yapılır (SOPEP).",
    ],
  },

  "MARPOL Ek I — Petrol Kirliliği": {
    title: "MARPOL Ek I — Petrol Kirliliği",
    introduction:
      "MARPOL Ek I, gemilerden petrol ve petrollü karışımların denize tahliyesini düzenler. Hem makine dairesi sintine/yağlı suyu (tüm gemiler) hem tankerlerin yük/slop suyu kapsanır. Temel ilke: petrollü su ancak belirli arıtma, konsantrasyon ve mevki koşulları sağlandığında tahliye edilebilir; aksi hâlde gemide tutulur ve karaya verilir.",
    sections: [
      {
        title: "Makine Dairesi Sintine Suyu ve 15 ppm Kuralı",
        content:
          "Makine dairesinde; kaçaklar, yoğuşma, separatör ve pompa drenajları nedeniyle **yağ ile su karışımı (sintine suyu, bilge water)** birikir ve sintine kuyusunda (bilge well) toplanır. Bu su doğrudan denize verilemez; önce **yağlı su ayırıcısından (Oil/Water Separator, OWS)** geçirilir. OWS, yağ ve suyun **yoğunluk farkına** dayanır: durgunlaşma odalarında hafif yağ yüzeye çıkar, ağır su alttan alınır; ikinci kademe genellikle bir **koalesör (coalescer)** ile ince yağ damlacıklarını birleştirerek ayırmayı iyileştirir.\n\n**15 ppm kuralı:** Denize tahliye için üç koşul birlikte sağlanmalıdır — gemi **rota üzerinde (en route)** olmalı, çıkış suyundaki petrol içeriği **15 ppm'i (milyonda 15 parça)** aşmamalı ve sistem **15 ppm alarmlı bir izleme cihazıyla (oil content monitor)** donatılmış olmalıdır. Monitör, çıkıştaki yağ oranını sürekli ölçer.\n\n**Otomatik koruma:** Konsantrasyon 15 ppm'i aşarsa, monitör **otomatik durdurma/geri döndürme valfini (three-way valve)** tetikler; tahliye kesilir ve su sintineye veya **slop/bilge holding tankına** geri gönderilir. Böylece sınır aşımı fiziksel olarak engellenir. Özel alanlarda ve belirli gemilerde kurallar daha da katıdır.\n\n**Gemide önemi:** OWS ve 15 ppm monitörünün baypas edilmesi (**'magic pipe'**) denizciliğin en ağır cezalandırılan çevre suçlarındandır; sistemin doğru çalışması, düzenli bakımı ve her tahliyenin ORB'ye dürüst kaydı, hem çevreyi hem gemi/şirketi hukuki felaketten korur.",
        formula: {
          text: "Tahliye: ≤ 15 ppm + en route + 15 ppm alarmlı OWS/monitor",
          description: "Makine dairesi sintine suyu için MARPOL Ek I asgari tahliye koşulları",
        },
      },
      {
        title: "Tankerlerde Yük Tahliyesi ve ODME",
        content:
          "Petrol tankerlerinde, yük tanklarının **yıkama suyu ve kirli balastı** yağ içerdiğinden özel ve katı kurallara tabidir. İzin verilen tahliye için koşullar birlikte sağlanmalıdır: gemi **en route** olmalı, karadan **en az 50 deniz mili** uzakta bulunmalı, **anlık tahliye oranı 30 litre/deniz mili'ni** aşmamalı ve toplam tahliye miktarı, taşınan yükün belirli bir oranını geçmemelidir (**yeni tankerlerde 1/30.000**, eski tankerlerde 1/15.000).\n\n**ODME ile sürekli kontrol:** Tüm bu parametreler — yağ oranı, anlık oran (L/nm), gemi hızı ve konum — **Oil Discharge Monitoring and Equipment (ODME)** ile sürekli ölçülür ve kaydedilir; sınır aşılırsa tahliye otomatik durur. **Worked example:** 30 L/nm sınırında 12 knot hızla 1 saat tahliye eden bir tanker 12 nm yol alır ve en fazla 12 × 30 = **360 litre** yağ deşarj edebilir — bu, hem oran hem toplam limitle sınırlanır.\n\n**Load on top ve slop tankı:** Tank yıkama atıkları bir **slop tankında** biriktirilir; yağ üste çıkıp su altta ayrışınca alttaki temiz su boşaltılır ve kalan yağ üzerine yeni yük yüklenir (**'load on top'**). **Ayrılmış balast tankları (Segregated Ballast Tanks, SBT)** ise balastı yükten tamamen ayırarak kirli balast sorununu kökten azaltır.\n\n**Gemide önemi:** Bu limitler, kronik operasyonel petrol kirliliğini (bir zamanlar okyanuslardaki en büyük petrol kaynağı) büyük ölçüde azaltmıştır; ODME'nin doğru çalışması ve dürüst kaydı, tankerin yasal tahliye yapabilmesinin ön şartıdır.",
        formula: {
          text: "Tanker yük tahliyesi: en route + >50 nm + ≤30 L/nm + oran ≤ 1/30.000 (yeni)",
          description: "ODME ile sürekli ölçülür; örn. 12 kn'da 1 saat = 12 nm ⇒ en çok 12×30 = 360 L yağ",
        },
      },
      {
        title: "Oil Record Book (ORB)",
        content:
          "Gemideki **tüm petrol/yağ işlemleri**, standart kodlarla **Oil Record Book (ORB)**'a kaydedilir; ORB, geminin yağ yönetiminin resmî ve hukuki günlüğüdür. İki bölüm hâlinde tutulur: **Bölüm I** makine dairesi işlemleri (tüm gemiler) — sintine transferi, OWS ile tahliye, yağ alımı ve yakımı, sludge (yağ çamuru) bertarafı; **Bölüm II** yük/balast işlemleri (yalnızca tankerler) — yükleme/tahliye, tank yıkama, slop yönetimi, kirli balast.\n\n**Nasıl kaydedilir:** Her işlem; tarih, ilgili tankların kimliği, miktar, konum ve sorumlu zabitin imzasıyla, işlem tamamlanır tamamlanmaz yazılır; her sayfa kaptan tarafından onaylanır. Kazara veya istisnai tahliyeler de (kod ile) ayrıca kaydedilir.\n\n**Tutarlılık şartı:** ORB kayıtları, tankların **fiilî durumu, OWS/monitor verileri ve sludge üretimiyle tutarlı** olmalıdır. Denetimde surveyör, örneğin üretilen sludge miktarını yakılan/karaya verilen miktarla karşılaştırır; açık veren bir tablo (üretilen çok, bertaraf edilen az) baypas şüphesi doğurur.\n\n**Gemide önemi:** ORB, PSC ve kıyı devleti denetimlerinde **en sık incelenen belgedir**; birçok ağır ceza, fiilî kirlilikten çok **ORB'deki sahte veya eksik kayıttan** çıkmıştır. Doğru, zamanında ve dürüst kayıt bir zabitin en temel çevre sorumluluklarından biridir; 'bypass' (magic pipe) ve sahte kayıt ise ağır suçtur.",
      },
      {
        title: "SOPEP ve Önleme Donanımı",
        content:
          "Her gemide **Shipboard Oil Pollution Emergency Plan (SOPEP)** bulunur; bu plan, bir petrol döküntüsü veya döküntü tehdidi anında **kimin ne yapacağını, kime haber verileceğini ve döküntünün nasıl kontrol edileceğini** önceden tanımlar; panik anında düşünmeyi değil, hazır prosedürü uygulamayı sağlar.\n\n**Plan neleri içerir:** Raporlama irtibatları (**en yakın kıyı devleti, şirket/DPA, ilgili makamlar**), döküntü kaynağını durdurma adımları, döküntüyü sınırlama/toplama yöntemleri ve görev dağılımı. Gemide **SOPEP donanımı** hazır bulundurulur: emici pedler ve rulolar, kürek/faraş, varil, tıkaç (scupper plug), dağıtıcı (dispersant, izinliyse) ve KKD.\n\n**En riskli operasyon — bunker:** Yakıt alma (**bunkering**), güvertede petrol döküntüsü riskinin en yüksek olduğu andır; bu yüzden **kontrol listesi**, sorumlu zabit, **güverte firengilerinin (scupper) kapatılması**, sürekli gözcü, kararlaştırılmış iletişim ve acil durdurma sinyali ile yürütülür. Tank dolum seviyeleri izlenir ve taşma (overflow) önlenir.\n\n**Gemide önemi:** Küçük bir güverte döküntüsü bile hızlı ve doğru müdahaleyle denize ulaşmadan sınırlanabilir; SOPEP donanımının hazır ve ekibin eğitimli (tatbikatlı) olması, bir hatayı büyük bir kirlilik ve ceza olmaktan çıkarır.",
      },
    ],
    keyPoints: [
      "Makine dairesi sintinesi ≤15 ppm, en route ve 15 ppm alarmlı OWS ile tahliye edilebilir.",
      "Tankerde yük tahliyesi: en route, >50 nm, ≤30 L/nm ve oran limiti; ODME ile izlenir.",
      "Tüm petrol işlemleri Oil Record Book'a kaydedilir; bypass/sahte kayıt ağır suçtur.",
      "SOPEP planı ve donanımı zorunludur; bunkerde döküntü önlemleri uygulanır.",
    ],
  },

  "MARPOL Ek II — Zararlı Sıvı Maddeler": {
    title: "MARPOL Ek II — Zararlı Sıvı Maddeler",
    introduction:
      "MARPOL Ek II, dökme olarak taşınan zararlı sıvı maddelerin (Noxious Liquid Substances, NLS) — başta kimyasal tankerlerin yükleri — denize tahliyesini düzenler. Her madde, deniz çevresine zararına göre kategorize edilir ve bu kategori, tank yıkama atıklarının nasıl bertaraf edileceğini belirler.",
    sections: [
      {
        title: "Kategoriler: X, Y, Z ve OS",
        content:
          "Dökme taşınan zararlı sıvı maddeler (**NLS**), deniz çevresine verdikleri zarara göre dört gruba ayrılır ve bu kategori, tank yıkama atıklarının nasıl bertaraf edileceğini doğrudan belirler.\n\n**Kategori X (en tehlikeli):** Deniz çevresine **büyük zarar** verir; tank yıkama suyunun denize tahliyesi **yasaktır**. Tank **önyıkaması (prewash)** zorunludur ve atık **karaya (reception facility)** verilir. **Kategori Y:** **önemli zarar** verir; sınırlı koşullarla tahliyeye izin vardır ve bazı durumlarda (yüksek viskoziteli veya katılaşan maddeler) prewash gerekir. **Kategori Z:** **küçük zarar** verir, en az kısıtlamaya tabidir. **OS (Other Substances):** değerlendirme sonucu **zararsız** sayılan ve Ek II kapsamı **dışında** tutulan maddelerdir.\n\n**Sınıflandırma neye dayanır:** Bir maddenin kategorisi keyfi değildir; **sucul toksisite, biyolojik birikim ve kalıcılık** verilerine dayanır ve **IBC Code** ile ilgili IMO kataloglarında (MEPC.2/Circular) tanımlıdır.\n\n**Gemide önemi:** Yükün kategorisi taşıma öncesi netleştirilir; çünkü kategori, hangi tank kaplamasının uygun olduğunu, prewash gerekip gerekmediğini ve atığın akıbetini belirler — yanlış sınıf, hem çevre ihlali hem emniyet riski demektir.",
      },
      {
        title: "Tahliye Koşulları",
        content:
          "Kategori Y ve Z artıklarının izin verilen tahliyesi için koşullar **birlikte** sağlanmalıdır: gemi **en route** ve **en az 7 knot** hızda (kendinden tahrikli gemi) olmalı — hız, atığın gemi izinde seyrelmesini sağlar; tahliye **su hattının altındaki onaylı bir ağızdan** yapılmalı; gemi kıyıdan **en az 12 deniz mili** uzakta ve su derinliği **en az 25 metre** olmalıdır.\n\n**Tank artığının azaltılması:** Tank dibinde kalan tortu (**residue**) mümkün olduğunca azaltılmalıdır; bunun için onaylı **stripping (sıyırma pompalama)** sistemi kullanılır ve gerektiğinde **prewash (önyıkama)** uygulanır. Kategori X'te prewash + karaya verme her zaman zorunludur; Kategori Y'de belirli maddeler için gereklidir.\n\n**Özel alanlar ve madde özellikleri:** Antarktika alanı ve belirli bölgeler daha katıdır; bazı tahliyeler tamamen yasaktır. Maddenin **erime/katılaşma** özelliği ve viskozitesi ek gereklilik doğurabilir (katılaşan/yüksek viskoziteli maddeler tanka daha çok yapışır).\n\n**Gemide önemi:** Bu koşulların herhangi biri sağlanmadan yapılan tahliye ihlaldir; kimyasal tanker zabiti, her yük için **P&A Manual**'ı ve kategori gerekliliklerini kontrol ederek yıkama/tahliye planını önceden kurar.",
        formula: {
          text: "Tahliye: en route ≥7 kn + >12 nm + derinlik ≥25 m + su altı ağzı",
          description: "Kategori Y/Z artıkları için MARPOL Ek II tipik tahliye koşulları",
        },
      },
      {
        title: "Cargo Record Book ve P&A Manual",
        content:
          "Kimyasal tankerlerde **tüm yük, tank yıkama, transfer ve tahliye işlemleri Cargo Record Book (CRB)**'a kaydedilir — bu, Ek I'deki ORB'nin Ek II karşılığıdır ve aynı hukuki ağırlığa sahiptir. Her işlem tarih, tank, madde, miktar ve imza ile yazılır.\n\n**Procedures and Arrangements (P&A) Manual:** Her kimyasal tankerde, tank yıkama ve atık yönetimini **madde kategorisine göre** adım adım tanımlayan, otorite tarafından **onaylı bir P&A Manual** bulunur. Bir tankın hangi maddeden sonra nasıl yıkanacağı, prewash gerekip gerekmediği, atığın nereye gideceği ve hangi tahliye koşullarının geçerli olduğu bu kılavuzla belirlenir.\n\n**Doğrulama:** Tank temizliği ve tahliye, P&A Manual'a göre yürütülür ve gerektiğinde **surveyör/otorite** tarafından (özellikle Kategori X prewash'ı) doğrulanır; prewash sertifikası düzenlenebilir.\n\n**Gemide önemi:** CRB ve P&A Manual, kimyasal tanker operasyonunun hem çevresel hem yasal omurgasıdır; bir zabit bu belgelere hâkim olmadan yük/temizlik operasyonu yönetemez. Kayıt ve prosedür uyumsuzluğu, PSC denetiminde geminin tutulmasına yol açabilir.",
      },
      {
        title: "Kimyasal Tanker Emniyeti ile Bağ",
        content:
          "Ek II uyumu, kimyasal tanker **emniyetiyle iç içedir**; çünkü aynı yükler hem çevre için zararlı hem personel için tehlikelidir. Yüklerin **toksisitesi, yanıcılığı, reaktivitesi ve birbiriyle uyumsuzluğu**, hem tahliye kurallarını hem gemide alınacak önlemleri belirler.\n\n**Emniyet önlemleri:** **Tank kaplaması** yükle uyumlu olmalı (yanlış kaplama yükü kirletir veya kaplamayı bozar); reaktif/yanıcı yükler için **inertleme (inert gas)** ve kontrollü **havalandırma** uygulanır; uyumsuz yükler **ayrı tank/hat sistemlerinde** taşınır (birbirine karışırsa tehlikeli reaksiyon verebilir). Personel için uygun **KKD** (kimyasal tulum, solunum koruması), gaz ölçümü ve maruziyet sınırları uygulanır.\n\n**Atık yönetiminin iki yüzü:** Tank yıkama suları ve artıkları hem **çevre (Ek II)** hem **personel güvenliği** açısından yönetilir — örneğin kapalı tankta yıkama sonrası giriş, **kapalı mahal prosedürüne** tabidir.\n\n**Gemide önemi:** Yanlış tahliye veya atlanan prewash yalnızca çevre ihlali değil; uyumsuz yük karışımı, toksik buhar veya reaksiyon yoluyla **can kaybına** da yol açabilir. Bu yüzden Ek II, IBC Code emniyet gereklilikleriyle birlikte bir bütün olarak uygulanır.",
      },
    ],
    keyPoints: [
      "NLS kategorileri: X (yasak/prewash), Y (sınırlı), Z (en az kısıt), OS (kapsam dışı).",
      "Tahliye: en route ≥7 kn, >12 nm, derinlik ≥25 m, su altı onaylı ağızdan.",
      "Tüm işlemler Cargo Record Book'a kaydedilir; onaylı P&A Manual prosedürü belirler.",
      "Ek II uyumu kimyasal tanker emniyetiyle (uyumluluk, inertleme, KKD) birlikte yönetilir.",
    ],
  },

  "MARPOL Ek III — Paketli Zararlı Maddeler": {
    title: "MARPOL Ek III — Paketli Zararlı Maddeler",
    introduction:
      "MARPOL Ek III, paketli formda denizde taşınan zararlı maddelerin (deniz kirleticileri — marine pollutants) yol açtığı kirliliği önler. Uygulama büyük ölçüde IMDG Code üzerinden yürür: hangi maddelerin deniz kirletici sayıldığı, nasıl ambalajlanıp işaretleneceği ve istifleneceği burada düzenlenir.",
    sections: [
      {
        title: "Deniz Kirletici (Marine Pollutant) Kavramı",
        content:
          "Bazı paketli maddeler denize döküldüğünde sucul yaşam için ciddi tehdit oluşturur; bunlar **'deniz kirletici (marine pollutant)'** olarak tanımlanır ve MARPOL Ek III ile düzenlenir. Uygulama büyük ölçüde **IMDG Code** üzerinden yürür (Ek III'ün pratikteki karşılığı IMDG kurallarıdır).\n\n**Bir maddeyi neden deniz kirletici yapar:** Üç özellikten biri veya birkaçı: sucul organizmalar için **toksisite** (zehirlilik), canlı dokularda **birikme (bioaccumulation)** ve doğada **kalıcılık (persistence — kolay bozunmama)**. Bu özellikler, maddenin ölçülmüş **sucul toksisite verilerine** göre değerlendirilir ve kriterleri sağlayan maddeler kirletici olarak işaretlenir.\n\n**Tek başına 'tehlikeli' olmasa bile:** Bir madde klasik tehlike sınıflarına (yanıcı, aşındırıcı vb.) girmese dahi, yalnızca **çevresel tehlike** taşıdığı için (örn. bazı **Sınıf 9** maddeleri veya 'environmentally hazardous substance') deniz kirletici sayılıp Ek III/IMDG kurallarına tabi olabilir.\n\n**Gemide önemi:** Bir paketin deniz kirletici olup olmadığı, onun nasıl ambalajlanacağını, işaretleneceğini, istifleneceğini ve döküntüsünde nasıl raporlanacağını belirler; bu yüzden yük kabulünde maddenin IMDG sınıfı ve deniz kirletici durumu **taşıma belgelerinden** doğrulanır.",
      },
      {
        title: "Ambalajlama, İşaretleme ve Etiketleme",
        content:
          "Deniz kirleticiler, denize dökülmeyi en aza indirecek şekilde **dayanıklı ve onaylı (UN sertifikalı) ambalajlarda** taşınır; ambalaj, taşıma sırasındaki titreşim, sıkışma ve nem koşullarına dayanacak testlerden geçmiştir.\n\n**İşaretleme ve etiketleme:** Paket ve konteynerler, üzerinde **balık ve ağaç sembolü** bulunan üçgen **'marine pollutant' işareti** ile ve doğru **UN numarası + uygun sevkiyat adı (Proper Shipping Name)** ile işaretlenir. Bu görsel işaret, dilden bağımsız olarak maddeyi ve riskini anında tanıtır.\n\n**İstisnalar:** Belirli küçük miktarlar için hafifletmeler vardır — **sınırlı miktar (limited quantity)** ve **istisnai miktar (excepted quantity)** ambalajları, düşük risk nedeniyle bazı işaretleme/belgeleme gerekliliklerinden muaf tutulabilir; ancak eşikler aşılırsa tam kurallar uygulanır.\n\n**Gemide önemi:** Doğru işaretleme, bir yangın/döküntü acil durumunda müdahale ekibinin maddeyi ve tehlikesini **saniyeler içinde** tanımasını sağlar; eksik/yanlış işaretlenmiş bir paket hem müdahaleyi geciktirir hem yanlış (ve tehlikeli) müdahaleye yol açabilir. Bu yüzden yükleme öncesi işaret ve belge kontrolü esastır.",
      },
      {
        title: "İstif, Ayrım ve Denize Atma Yasağı",
        content:
          "Deniz kirleticiler, IMDG Code'un **istif (stowage)** ve **ayrım (segregation)** kurallarına göre yerleştirilir; amaç hem denize dökülme riskini azaltmak hem uyumsuz maddelerin birbiriyle tehlikeli etkileşimini önlemektir.\n\n**Ayrım (segregation):** Uyumsuz maddeler (örn. birbirine değince reaksiyon veren, ya da biri diğerinin tehlikesini artıran maddeler) belirli **mesafe/bölme kurallarıyla** ayrı istiflenir; bazı maddeler yaşam mahallinden, ısı kaynaklarından ve gıdadan uzak tutulur. **İstif konumu** (güverte altı/üstü, korunaklı) maddenin özelliğine göre seçilir.\n\n**Denize atma yasağı:** Deniz kirleticilerin **kasıtlı olarak denize atılması yasaktır**. Yalnızca **geminin/canların güvenliği** veya **denizde can kurtarma** gibi zorunlu hâllerde istisnai bir atma söz konusu olabilir; böyle bir durum **belgelenir ve raporlanır** (keyfi değil, son çare ve kayıtlı).\n\n**Gemide önemi:** Doğru istif ve ayrım, hem normal seyirde paket bütünlüğünü korur hem de bir kaza/yangın anında zincirleme reaksiyonu önler; istif planı ve tehlikeli yük manifestosu, güverte zabitinin bu kuralları uygulamasının temelidir.",
      },
      {
        title: "Döküntü, Kayıp ve Raporlama",
        content:
          "Denizde bir **paket kaybı veya döküntü** (örn. konteynerin denize düşmesi, ambarda dökülme) olduğunda, olay **kıyı devletine ve ilgili makamlara bildirilir**; özellikle taşınan **deniz kirleticiler** raporlanır çünkü çevresel etkileri olabilir.\n\n**Bilgi kaynakları:** Geminin **tehlikeli yük manifestosu** ve **istif planı**, döküntünün konumunu ve söz konusu maddeyi/miktarı hızla belirlemeyi sağlar; hangi konteynerde ne olduğu bu belgelerden okunur. **EmS (Emergency Schedules — acil durum çizelgeleri)**, her IMDG maddesi için yangın ve döküntü müdahalesini yönlendirir (hangi söndürücü, hangi önlem, hangi KKD).\n\n**Konteyner kayıpları:** Denize düşen konteynerler hem seyir tehlikesi (yarı batık) hem çevre riski oluşturabilir; bu tür olaylar için raporlama ve (mümkünse) takip önemlidir.\n\n**Gemide önemi:** Doğru kayıt ve **hızlı bildirim**, çevresel etkiyi sınırlar ve müdahale ekiplerinin doğru donanımla gelmesini sağlar; manifesto ve istif planının güncel ve doğru olması, acil durumda hayat ve çevre kurtarır. Bilgi eksikliği veya gecikmiş bildirim, küçük bir olayı büyük bir kirliliğe çevirebilir.",
      },
    ],
    keyPoints: [
      "Marine pollutant, sucul yaşama toksik/birikici/kalıcı paketli maddedir; IMDG'de işaretlenir.",
      "Dayanıklı onaylı ambalaj + 'marine pollutant' işareti zorunludur (limited quantity istisnaları var).",
      "İstif/segregation kurallarına uyulur; kasıtlı denize atma yasaktır.",
      "Paket kaybı/döküntü kıyı devletine raporlanır; EmS müdahaleyi yönlendirir.",
    ],
  },

  "MARPOL Ek IV — Pis Su (Sewage)": {
    title: "MARPOL Ek IV — Pis Su (Sewage)",
    introduction:
      "MARPOL Ek IV, gemilerden kaynaklanan pis suyun (sewage — tuvalet, revir, belirli drenajlar) denize boşaltılmasını düzenler. Amaç, patojen ve besin maddesi yükünün kıyı sularını ve halk sağlığını tehdit etmesini önlemektir. Tahliye, arıtma durumu ve kıyıdan uzaklığa bağlıdır.",
    sections: [
      {
        title: "Pis Su Tanımı ve Kapsam",
        content:
          "**Pis su (sewage)**, patojen (hastalık yapıcı) mikroorganizma ve besin maddesi (azot, fosfor) yükü taşıdığından denize kontrolsüz verildiğinde hem halk sağlığını hem kıyı ekosistemini tehdit eder; Ek IV bunun için tahliyeyi düzenler.\n\n**Pis su neyi kapsar:** Tuvaletler ve pisuvarlardan; **revir/hastane** lavabo, küvet ve drenajlarından; **canlı hayvan** bulunan mahallerden gelen atık sular. (Mutfak/duş gibi 'gri su' bazı bölgelerde ayrı ele alınır.)\n\n**Kapsam (hangi gemiler):** Ek IV genellikle **400 GT ve üzeri** gemilere veya **15'ten fazla kişi** taşıyan gemilere uygulanır. Bu gemiler; bir **pis su arıtma tesisi (sewage treatment plant)**, bir **parçalama/dezenfeksiyon sistemi** veya bir **toplama (holding) tankı** bulundurmalıdır. Uyum, **Uluslararası Pis Su Kirliliğini Önleme Sertifikası (ISPP)** ile belgelenir.\n\n**Gemide önemi:** Kıyıya yakın ve liman içinde tahliye kısıtları çok katı olduğundan, gemi hangi donanıma sahipse (tank mı, arıtma mı) tahliye planını buna göre kurar; sistemin kapasitesi ve kıyıya uzaklık, ne zaman tahliye edileceğini belirler.",
      },
      {
        title: "Tahliye Koşulları",
        content:
          "Pis su tahliyesi, **arıtma durumuna ve kıyıya uzaklığa** göre kademelenir; amaç patojen yükünün seyrelmesi ve kıyı sularına ulaşmamasıdır.\n\n**Arıtılmamış pis su:** Kıyıdan **en az 12 deniz mili** uzakta, gemi **en route** ve **en az 4 knot** hızdayken, biriktirilmiş hâlde bir anda değil **makul bir oranda** (seyrelerek) tahliye edilebilir. Hız ve mesafe, seyrelmeyi ve dağılmayı sağlar.\n\n**Parçalanmış + dezenfekte pis su:** Onaylı bir parçalama-dezenfeksiyon sisteminden geçmişse kıyıdan **en az 3 deniz mili** uzakta tahliye edilebilir. **Onaylı arıtma tesisi** çıkışı (standartları sağlayan) için mesafe kısıtı daha da gevşektir.\n\n**Özel durumlar:** Yolcu gemilerinde ve belirli özel alanlarda daha katı standartlar, bazı yerlerde tahliye yasağı uygulanır. **Gemide önemi:** Bu mesafe/hız koşullarından biri bile sağlanmadan yapılan tahliye ihlaldir; zabit, tahliyeyi kıyıdan uzaklaşmış ve rotada seyrederken planlar, liman/kıyı yakınında ise tankta biriktirir.",
        formula: {
          text: "Arıtılmamış >12 nm (≥4 kn, en route) · parçalanmış+dezenfekte >3 nm",
          description: "MARPOL Ek IV pis su tahliye mesafeleri (onaylı tesis çıkışı için daha gevşek)",
        },
      },
      {
        title: "Toplama Tankı ve Karaya Verme",
        content:
          "Tahliyenin **yasak veya kısıtlı** olduğu yerlerde (liman içi, kıyıya çok yakın, bazı özel alanlar) pis su denize verilemez; **holding (toplama) tankında** biriktirilir ve daha sonra bertaraf edilir.\n\n**Karaya/tesise verme:** Biriken pis su, limandaki **alım tesisine (reception facility)** veya bir tankere, **standart kıyı bağlantısı (standard discharge connection)** üzerinden verilir. Bu standart flanş, dünyanın her limanında uyacak şekilde boyutlandırılmıştır.\n\n**Kapasite ve izleme:** Tank kapasitesi, geminin kıyıya yakın kalacağı süreye ve kişi sayısına göre yeterli olmalı; **dolum seviyesi izlenir** ve **taşma/istem dışı tahliye** önlenir. Tank dolmadan tahliye/teslim planlanır.\n\n**Gemide önemi:** Holding tank yönetimi, özellikle uzun liman kalışlarında veya sık kıyı seyrinde kritik olur; tankın zamanında boşaltılmaması ya bir ihlale (mecburi tahliye) ya da hijyen sorununa yol açar. Bu yüzden tank seviyesi ve teslim planı önceden yönetilir.",
      },
      {
        title: "Arıtma Tesisi ve İzleme",
        content:
          "Onaylı bir **pis su arıtma tesisi (sewage treatment plant)**, çıkış suyunu standartlara getirerek daha yakın mesafede tahliyeye izin verir. Tipik adımlar: **biyolojik arıtma** (mikroorganizmalar organik yükü parçalar), **dezenfeksiyon** (patojenlerin öldürülmesi) ve gerektiğinde **katı ayırma/çökeltme**.\n\n**Çıkış standartları:** Onaylı tesisin çıkışı belirli sınırları sağlamalıdır — **askıda katı madde (TSS)**, **fekal koliform** (patojen göstergesi) ve **biyokimyasal oksijen ihtiyacı (BOİ/BOD)** limitleri. Bu değerler, arıtmanın gerçekten çalıştığının ölçüsüdür.\n\n**Bakım şart:** Biyolojik tesis canlı bir sistemdir; **dezenfektan/biyolojik kültür yönetimi**, düzenli bakım ve **çıkış kalitesinin izlenmesi** gereklidir. Aşırı yükleme, kimyasal şok (örn. temizlik maddesi kaçağı) veya bakımsızlık arıtmayı bozar.\n\n**Gemide önemi:** Arızalı veya bakımsız bir tesis, çıkışı sessizce standart dışına çıkarır ve gemi 'arıtıyorum' sanırken aslında **ihlal** üretir; bu yüzden tesisin çalışırlığı düzenli izlenir ve kaydedilir. Doğru işleyen bir arıtma, hem çevreyi korur hem gemiye tahliyede esneklik sağlar.",
      },
    ],
    keyPoints: [
      "Pis su tuvalet/revir/hayvan mahalli atık suyudur; Ek IV ≥400 GT veya >15 kişi gemilere uygulanır.",
      "Arıtılmamış >12 nm (en route ≥4 kn); parçalanmış+dezenfekte >3 nm tahliye edilebilir.",
      "Tahliye yasak bölgelerde holding tankı kullanılır, karaya/reception'a verilir.",
      "Onaylı arıtma tesisi standartları sağlar; bakım ve çıkış izleme zorunludur.",
    ],
  },

  "MARPOL Ek V — Çöp (Garbage)": {
    title: "MARPOL Ek V — Çöp (Garbage)",
    introduction:
      "MARPOL Ek V, gemilerden kaynaklanan çöpün (garbage) denize atılmasını düzenler ve plastiklerin denize atılmasını tamamen yasaklar. Deniz çöpü, özellikle plastik, deniz ekosistemleri için en kalıcı ve yaygın kirleticilerden biridir. Genel kural, çöpün denize atılmasının yasak olması; sınırlı istisnaların ise katı koşullara bağlı olmasıdır.",
    sections: [
      {
        title: "Plastik Yasağı ve Genel Yaklaşım",
        content:
          "MARPOL Ek V'in temel ve en katı kuralı: **her türlü plastiğin denize atılması kesinlikle ve her yerde yasaktır** — sentetik halat ve ağlar, çöp poşetleri, plastik ambalaj, ambalaj bandı dâhil. Plastik denizde **yüzlerce yıl** bozunmaz, parçalanarak **mikroplastiğe** döner, canlılar tarafından yutulur ve besin zincirine girer; bu yüzden mutlak yasak vardır.\n\n**Felsefe değişti:** Ek V'in yaklaşımı köklü biçimde tersine dönmüştür. Artık soru 'neyi denize atabilirim?' değil, **'çok sınırlı istisnalar dışında hiçbir şey atılamaz'**dır. Yani kural, izin listesi değil **yasak esaslıdır**.\n\n**Hiyerarşi:** Doğru yaklaşım bir öncelik sırasıdır — çöpü **kaynağında azalt** (ambalajı minimize et), **ayrıştır**, gemide **depola** ve limanda **alım tesisine ver**. Denize atma en son ve yalnızca çok dar istisnalarda düşünülür.\n\n**Gemide önemi:** Deniz çöpü, özellikle plastik, bugün okyanuslardaki en yaygın ve görünür kirliliktir; tek bir mürettebatın denize attığı bir plastik poşet bile hem ağır ihlal hem çevre zararıdır. Bu yüzden çöp yönetimi, gemide günlük disiplin ve bilinç işidir.",
      },
      {
        title: "Sınırlı Tahliye İstisnaları",
        content:
          "Denize çöp atma genel olarak yasak olsa da, gemi **en route** ve kıyıdan **yeterince uzaktayken** çok sınırlı çöp türleri için istisnalar vardır; bunların dışındaki her şey gemide tutulur.\n\n**Gıda atıkları:** **Öğütülmüş gıda atığı** (parçacık boyutu **≤25 mm** olacak şekilde bir öğütücüden geçmiş) kıyıdan **en az 3 deniz mili** uzakta; **öğütülmemiş gıda atığı** ise kıyıdan **en az 12 deniz mili** uzakta denize verilebilir. Öğütme, atığın hızlı dağılıp doğada çözülmesini sağlar (bu yüzden mesafe daha kısadır).\n\n**Yük artığı ve tank yıkama:** Yük artıkları (cargo residue) ve yıkama suları, ancak madde **deniz çevresine zararlı değilse** ve koşullar sağlanırsa tahliye edilebilir; zararlı yük artıkları tutulur.\n\n**Özel alanlar çok daha katı:** Özel alanlarda (Akdeniz, Baltık, Karadeniz vb.) bu mesafeler artar ve çoğu çöp tipi **tamamen yasaktır**; genelde yalnızca öğütülmüş gıda atığına daha uzak mesafede izin verilir. **Plastik her koşulda yasaktır.**\n\n**Gemide önemi:** Zabit, çöp tahliyesini yaparken hem çöp türünü, hem mesafeyi, hem bölgeyi (özel alan mı?) birlikte kontrol eder ve her işlemi Garbage Record Book'a yazar; şüphe varsa atmaz, gemide tutar.",
        formula: {
          text: "Öğütülmüş gıda (≤25 mm) >3 nm · öğütülmemiş gıda >12 nm · plastik HER ZAMAN yasak",
          description: "MARPOL Ek V gıda atığı tahliye mesafeleri (özel alanlarda daha katı)",
        },
      },
      {
        title: "Garbage Record Book ve Yönetim Planı",
        content:
          "Belirli gemilerde (genellikle **100 GT ve üzeri** veya **15'ten fazla kişi** taşıyanlar, ayrıca sabit/yüzer platformlar) iki belge zorunludur: **Garbage Management Plan (çöp yönetim planı)** ve **Garbage Record Book (GRB)**.\n\n**Çöp kategorileri:** Çöp, yönetimi kolaylaştırmak için kategorilere ayrılır — **plastik**, **gıda atığı**, **evsel atık**, **yemeklik yağ**, **kül (incinerator)**, **operasyonel atık**, **yük artığı**, **hayvan leşi** ve **e-atık/av donanımı** gibi. Her kategori ayrı toplanır ve farklı kurala tabidir.\n\n**Kayıt:** Her çöp işlemi — **denize tahliye, karaya (reception) verme, gemide yakma (incineration)** — tarih, mevki (konum), kategori ve **miktar (m³)** ile GRB'ye yazılır ve imzalanır. Karaya teslimde alınan **makbuz/dekont** saklanır ve kaydı destekler.\n\n**Bilgilendirme:** Mürettebatı bilgilendirmek için gemide **çöp afişleri (placard)** asılır. **Gemide önemi:** GRB, PSC denetiminde incelenir ve gerçek çöp üretimi/teslimiyle tutarlı olmalıdır; kayıt disiplini, hem yasal uyumu hem geminin çöp yönetiminin gerçekten işlediğini kanıtlar.",
      },
      {
        title: "Azaltma, Ayrıştırma ve Karaya Teslim",
        content:
          "Çöp yönetiminin omurgası, denize atmak değil **kaynakta azaltma ve ayrıştırmadır**. **Azaltma:** gereksiz ambalaj limandan gemiye alınmadan reddedilir/azaltılır (örn. büyük plastik ambalaj yerine yeniden kullanılabilir kaplar); bu, üretilecek çöpü baştan düşürür.\n\n**Ayrıştırma:** Geri dönüştürülebilir malzemeler (metal, cam, kâğıt) ayrılır; **tehlikeli atıklar** (boya kutuları, piller, kimyasal kaplar, floresan) ayrı toplanır çünkü bunlar özel bertaraf gerektirir. Plastik her zaman ayrı ve gemide tutulur.\n\n**Gemide işleme ve teslim:** Depolama için **sıkıştırma (compactor)**, gıda için **öğütücü** ve onaylı **yakma fırını (incinerator)** kullanılabilir; ancak incinerator yalnızca izinli atıklar için ve onaylı tip olmalıdır. Biriken çöp limandaki **alım tesislerine** teslim edilir ve **teslim makbuzu** saklanır.\n\n**Gemide önemi:** Makbuzlar GRB kayıtlarını **destekleyen kanıtlardır** ve denetimde çöpün gerçekten karaya verildiğini gösterir. İyi bir azaltma/ayrıştırma disiplini, hem depolama yükünü hem teslim maliyetini düşürür ve gemiyi ihlal riskinden uzak tutar.",
      },
    ],
    keyPoints: [
      "Plastik denize atmak HER ZAMAN ve HER YERDE yasaktır.",
      "İstisna: öğütülmüş gıda (≤25 mm) >3 nm, öğütülmemiş gıda >12 nm; özel alanlar çok daha katı.",
      "Garbage Management Plan ve Garbage Record Book belirli gemilerde zorunludur.",
      "Çöp kaynakta azaltılır/ayrıştırılır ve limanda alım tesisine teslim edilir (makbuz saklanır).",
    ],
  },

  "MARPOL Ek VI — Hava Kirliliği ve Enerji Verimliliği": {
    title: "MARPOL Ek VI — Hava Kirliliği ve Enerji Verimliliği",
    introduction:
      "MARPOL Ek VI, gemilerden kaynaklanan hava kirliliğini (kükürt oksitleri SOx, azot oksitleri NOx, partikül madde, ozon tabakasına zararlı maddeler) ve sera gazı emisyonlarına yönelik enerji verimliliği gerekliliklerini düzenler. Uyum, IAPP sertifikası ve enerji verimliliği belgeleriyle kanıtlanır.",
    sections: [
      {
        title: "Kükürt (SOx) Limitleri ve ECA",
        content:
          "Yakıttaki **kükürt oranı**, yanma sonucu oluşan **kükürt oksitleri (SOx)** emisyonunu doğrudan belirler; SOx hem asit yağmuruna hem solunum yolu hastalıklarına yol açar. Bu yüzden Ek VI yakıt kükürdünü sınırlar.\n\n**Küresel ve ECA sınırı:** 2020'den itibaren küresel **kükürt sınırı kütlece %0.50**'dir (önceki %3.50'den keskin biçimde düşürülmüştür — 'IMO 2020'). **Emisyon Kontrol Alanlarında (ECA)** sınır çok daha katıdır: **%0.10**. Yani gemi ECA'ya girerken yakıtı çok daha düşük kükürtlü olmalıdır.\n\n**Uyum yolları:** İki yol vardır — (1) **düşük kükürtlü yakıt** kullanmak (VLSFO ~%0.50, ECA için MGO ~%0.10) veya (2) yüksek kükürtlü yakıt yakıp egzozu temizleyen **egzoz gazı temizleme sistemi (scrubber)** kullanmak (eşdeğer önlem sayılır; açık/kapalı devre tipleri vardır).\n\n**Kayıt ve belge:** Bir ECA'ya girmeden önce **yakıt değişimi (fuel changeover)** tamamlanmalı, zamanı ve konumu kaydedilmelidir; **Bunker Delivery Note (BDN)** alınan yakıtın kükürt oranını belgeler ve numune saklanır. **Gemide önemi:** Bir zabit, ECA sınırını geçmeden changeover'ı bitirmiş olmalı; geç kalınan bir değişim doğrudan ihlaldir ve PSC yakıt numunesiyle kolayca tespit edilir.",
        formula: {
          text: "Küresel kükürt sınırı %0.50 · ECA içinde %0.10",
          description: "MARPOL Ek VI yakıt kükürt limitleri (kütlece); scrubber eşdeğer önlem sayılır",
        },
      },
      {
        title: "Azot Oksitleri (NOx) ve Tier Standartları",
        content:
          "Dizel motorların **azot oksit (NOx)** emisyonu, yanma odasındaki yüksek sıcaklıkta havanın azotundan oluşur ve duman/asit yağmuru ile ozon kirliliğine katkı verir. Ek VI, NOx'u motorun **devir sayısına (rpm)** bağlı limit eğrileriyle ve **'Tier' kademeleriyle** düzenler (yavaş devirli büyük motorlara daha yüksek g/kWh sınırı tanınır).\n\n**Tier kademeleri:** **Tier I** eski motorlar (2000–2011 arası); **Tier II** küresel olarak yaklaşık **2011 sonrası** inşa edilen gemilerde geçerli, orta düzeyde daha katı; **Tier III** ise yalnızca **NOx ECA'larında** uygulanan, Tier I'e göre yaklaşık %80 daha katı bir standarttır.\n\n**Tier III nasıl sağlanır:** Genellikle **Seçici Katalitik İndirgeme (SCR — egzoza üre/amonyak enjekte edip NOx'u azota indirger)**, **Egzoz Gazı Resirkülasyonu (EGR — yanma sıcaklığını düşürür)** veya **LNG yakıt** ile sağlanır.\n\n**Belge:** Motorun NOx uyumu, **Technical File** ve **EIAPP sertifikası** ile belgelenir; motorun ayar/parametreleri (enjeksiyon zamanı vb.) bu dosyaya uygun olmalıdır — izinsiz 'tuning' uyumu bozar. **Gemide önemi:** NOx uyumu motorun tasarım ve ayarına gömülüdür; makine ekibi Technical File'a aykırı ayar yapmaz ve Tier III donanımının (SCR üresi, EGR) çalışırlığını korur.",
        formula: {
          text: "NOx: Tier I/II küresel · Tier III yalnızca NOx ECA'da (SCR / EGR / LNG)",
          description: "Limit motor devrine bağlı g/kWh eğrisiyle verilir; uyum EIAPP + Technical File ile belgelenir",
        },
      },
      {
        title: "Diğer Emisyonlar: VOC, ODS ve Yakma",
        content:
          "Ek VI, SOx ve NOx dışında üç konuyu daha düzenler. **Uçucu organik bileşikler (VOC):** özellikle ham petrol tankerlerinde yük buharı olarak açığa çıkan hidrokarbonlar; belirli limanlarda **VOC yönetim planı** ve buhar dönüş (vapour return) sistemleri gerekebilir.\n\n**Ozon tabakasına zararlı maddeler (ODS):** eski soğutucu gazlar (CFC/HCFC) ve yangın söndürmede kullanılan **halonlar**. Yeni CFC kurulumu **yasaktır**, HCFC'ler aşamalı olarak kaldırılmaktadır; gemide bir **ODS kaydı** tutulur ve kaçaklar/dolumlar kaydedilir.\n\n**Gemide atık yakma (incineration):** Yalnızca **onaylı tip incinerator** kullanılabilir ve belirli atıklar **yakılamaz** — örneğin Ek I/II/III yük artıkları, **PCB**, ağır metal içeren atıklar ve belirli plastikler. Yakma işlemleri kaydedilir; ECA/liman gibi bazı yerlerde yakma yasaklanabilir.\n\n**Gemide önemi:** Bu üç başlık görünürde daha az bilinir ama denetlenir; yanlış (yasak atık) yakma toksik emisyon üretir, kayıtsız ODS kaçağı ihlaldir. Makine ve güverte ekibi, incinerator kullanım kurallarını ve ODS kayıt disiplinini bilmelidir.",
      },
      {
        title: "Enerji Verimliliği: EEXI, SEEMP ve CII",
        content:
          "Ek VI, hava kirleticilerin yanı sıra **sera gazı (CO₂) azaltımı** için tasarım ve operasyonel verimlilik araçları getirir; bunlar IMO'nun sera gazı stratejisinin gemi düzeyindeki uygulamasıdır.\n\n**Tasarım verimliliği — EEDI/EEXI:** **EEDI (Energy Efficiency Design Index)** yeni gemilerin tasarımda belirli bir verimlilik eşiğini sağlamasını ister; **EEXI (Existing Ship Index)** aynı mantığı **mevcut gemilere** teknik olarak uygular (gerekirse güç sınırlama/EPL ile). Her ikisi de 'taşınan iş başına CO₂' ölçer.\n\n**Operasyonel plan — SEEMP:** Her gemide bir **Ship Energy Efficiency Management Plan (SEEMP)** bulunur; verimliliği artıracak önlemleri (hız/trim optimizasyonu, hat temizliği, sefer planlaması) tanımlar.\n\n**Operasyonel verimlilik — CII:** **Carbon Intensity Indicator (CII)**, geminin **yıllık, taşıma işi başına karbon yoğunluğunu** ölçer ve **A–E** arası derecelendirir (A en iyi). **D'yi üç yıl üst üste** veya **E'yi bir yıl** alan gemi, SEEMP'e **düzeltici eylem planı** eklemek zorundadır; eşik her yıl sıkılaşır.\n\n**Pratik iyileştirmeler:** Hız optimizasyonu (yakıt tüketimi hıza güçlü bağlı olduğundan az bir yavaşlama çok yakıt tasarrufu sağlar), trim ayarı, tekne/pervane temizliği ve atık ısı geri kazanımı verimliliği artırır. **Gemide önemi:** CII derecesi artık ticari bir gerçekliktir — düşük dereceli gemi hem düzeltici plan zorunluluğu hem kiralama/piyasa dezavantajı yaşar; bu yüzden köprüüstü ve makine, günlük kararlarla (hız, trim) doğrudan CII'yi etkiler.",
        formula: {
          text: "CII derecesi A–E (A en iyi); D×3 yıl veya E×1 yıl ⇒ düzeltici eylem planı",
          description: "CII = yıllık CO₂ ÷ (taşıma işi); eşikler her yıl sıkılaşır — hız/trim/hat temizliği dereceyi iyileştirir",
        },
      },
    ],
    keyPoints: [
      "Küresel kükürt sınırı %0.50, ECA içinde %0.10; uyum düşük kükürtlü yakıt veya scrubber ile.",
      "NOx Tier I/II/III ile sınırlanır; Tier III için SCR/EGR/LNG kullanılır (EIAPP belgesi).",
      "VOC, ODS ve gemide yakma düzenlenir; bazı ODS'ler yasak, incinerator onaylı tip olmalı.",
      "EEXI/SEEMP/CII enerji verimliliğini ölçer; düşük CII derecesi düzeltici plan gerektirir.",
    ],
  },

  "Balast Suyu Yönetimi (BWM)": {
    title: "Balast Suyu Yönetimi (BWM)",
    introduction:
      "Gemiler stabilite ve trim için balast suyu alıp verir; ancak bu su, alındığı bölgedeki organizmaları (plankton, larva, patojen) başka bir ekosisteme taşıyarak istilacı tür sorununa yol açar. Ballast Water Management Convention (BWM), bu transferi yönetmek için standartlar getirir. Her geminin onaylı bir balast suyu yönetim planı ve kayıt defteri bulunur.",
    sections: [
      {
        title: "İstilacı Türler Sorunu",
        content:
          "Gemiler stabilite ve trim için **balast suyu** alıp verir; ancak bu su, alındığı limandaki **plankton, larva, yumurta, bakteri ve küçük organizmaları** da içine çeker ve başka bir limanda deşarj edildiğinde bu canlıları **yabancı bir ekosisteme** taşır. İstilacı tür sorununun kaynağı budur.\n\n**Neden bu kadar zararlı:** Yeni ortamda **doğal düşmanı olmayan** bir tür hızla çoğalır (patlama yapar), yerel türleri besin ve alanda yenerek yerinden eder, **ekolojik dengeyi** bozar ve **ekonomik zarar** verir (balıkçılığın çökmesi, su alma yapılarının/boruların tıkanması).\n\n**Örnekler:** **Zebra midyesi** (Kuzey Amerika Büyük Göller'inde altyapıyı tıkadı ve milyarlarca dolarlık zarara yol açtı), çeşitli **istilacı plankton ve denizanası** türleri ve kolera gibi **patojenlerin** taşınması.\n\n**Amaç:** **Ballast Water Management (BWM) Convention**, balast suyu ve tank dibindeki **sediman** yoluyla bu tür transferini en aza indirmeyi amaçlar. **Gemide önemi:** Balast alımı/deşarjı sıradan bir denge işlemi gibi görünse de aslında küresel bir ekolojik risktir; bu yüzden nereden balast alındığı ve nereye verildiği artık kayıt ve kural konusudur.",
      },
      {
        title: "D-1 Değişim ve D-2 Arıtma Standardı",
        content:
          "BWM Convention iki temel standart tanımlar: eski/geçiş yöntemi **D-1 (değişim)** ve kalıcı çözüm **D-2 (arıtma)**.\n\n**D-1 — Balast suyu değişimi (exchange):** Fikir, kıyı/liman organizmalarını **açık okyanus** suyuyla değiştirmektir (açık deniz organizmaları farklı bir limanda genelde yaşayamaz). Değişim, kıyıdan **en az 200 deniz mili** ve derinliği **en az 200 metre** olan bölgede yapılır (mümkün değilse en az 50 nm / 200 m). Tankın **en az %95 hacimsel değişimi** sağlanmalıdır (örn. akış/overflow yöntemiyle tank hacminin ~3 katı su pompalanınca bu orana ulaşılır).\n\n**D-2 — Performans/arıtma standardı:** Deşarj edilen sudaki canlı organizma sayısı belirli sınırların altına indirilir: **≥50 µm** organizmalar **< 10 adet/m³**, **10–50 µm** organizmalar **< 10 adet/mL**, ayrıca gösterge mikroplar (kolera, E. coli, enterokok) için limitler. Bu, ancak bir **arıtma sistemiyle (BWMS)** sağlanabilir.\n\n**Geçiş:** Takvim ilerledikçe D-1 aşamalı olarak bırakılmış, tüm gemilerin **D-2'yi sağlayan onaylı bir BWMS** bulundurması zorunlu hâle gelmiştir. **Gemide önemi:** D-1 basittir ama %100 güvenli değildir (değişim tam olmayabilir); D-2 kesin sonuç verir ama sistemin doğru çalışmasına bağlıdır. Zabit, gemisinin hangi standarda tabi olduğunu ve BWMS'nin çalışırlığını bilmelidir.",
        formula: {
          text: "D-1: ≥%95 değişim (>200 nm, >200 m) · D-2: arıtma ile organizma limitleri",
          description: "BWM Convention balast suyu değişim (D-1) ve arıtma performans (D-2) standartları",
        },
      },
      {
        title: "Arıtma Sistemleri (BWMS)",
        content:
          "D-2 standardını sağlamak için **balast suyu arıtma sistemleri (Ballast Water Management System, BWMS)** kullanılır; bunlar balast **alımı ve/veya deşarjı** sırasında devreye girer. Çoğu sistem iki adımdan oluşur: önce **filtrasyon** (büyük organizma ve partikülleri mekanik olarak ayırır), sonra bir **öldürme/etkisizleştirme** kademesi.\n\n**Yaygın teknolojiler:** (1) **Filtrasyon + ultraviyole (UV):** UV ışığı organizmaların DNA'sını bozup üremesini engeller ve kimyasal kalıntı bırakmaz. (2) **Filtrasyon + elektroklorinasyon / kimyasal dezenfeksiyon (aktif madde):** deniz suyundan üretilen veya eklenen dezenfektan organizmaları öldürür; deşarjdan önce fazla kimyasalın **nötralize** edilmesi gerekebilir.\n\n**Sediman yönetimi:** Tank dibinde zamanla **sediman (organizma içeren çamur)** birikir; bu düzenli olarak temizlenir ve uygun şekilde bertaraf edilir (aksi hâlde canlı taşımaya devam eder).\n\n**Gemide önemi:** BWMS'nin **doğru çalışması, kalibrasyonu ve bakımı**, deşarjın yasal sınırlarda kalması için kritiktir; arızalı bir sistem, gemi 'arıtıyorum' sanırken canlı organizma deşarj eder. Sistem UV lambası ömrü, filtre tıkanması veya düşük akışta yetersiz kalabilir — bu yüzden çalışma parametreleri izlenir.",
      },
      {
        title: "Plan, Kayıt ve Sertifika",
        content:
          "Her gemide onaylı bir **Ballast Water Management Plan** ve bir **Ballast Water Record Book** bulunur. Plan, balast operasyonlarının nasıl yürütüleceğini (hangi tank, hangi yöntem, güvenlik önlemleri) tanımlar; kayıt defterine ise **her balast alımı, değişimi, arıtma ve deşarjı** — tarih, konum, tank, hacim ile — yazılır.\n\n**Sertifika:** Uyum, **International Ballast Water Management Certificate** ile belgelenir ve sörveylerle doğrulanır.\n\n**Denetim ve örnekleme:** Bazı liman/kıyı devletleri, deşarj suyundan **örnek alıp** organizma sayısını test edebilir; ayrıca BWMS'nin çalışırlığını ve kayıtların gerçek operasyonla **tutarlılığını** kontrol eder. Kayıt-operasyon uyumsuzluğu veya çalışmayan sistem, PSC tutması sebebidir.\n\n**Gemide önemi:** Balast yönetimi, doğru donanım kadar **doğru kayıt ve prosedür** işidir; zabit balast planını uygular, BWMS'yi çalıştırır ve her işlemi eksiksiz kaydeder. İyi kayıt, hem yasal uyumu hem geminin istilacı tür riskini gerçekten yönettiğini kanıtlar.",
      },
    ],
    keyPoints: [
      "Balast suyu istilacı tür transferine yol açar; BWM Convention bunu yönetir.",
      "D-1 değişim: >200 nm, >200 m derinlikte ≥%95 hacimsel değişim.",
      "D-2 arıtma: onaylı BWMS ile deşarjdaki canlı organizma limitlerini sağlamak.",
      "Onaylı BWM Plan, Record Book ve BWM Certificate zorunludur; sediman yönetilir.",
    ],
  },

  "Biyo-kirlenme, Anti-fouling ve Gemi Geri Dönüşümü": {
    title: "Biyo-kirlenme, Anti-fouling ve Gemi Geri Dönüşümü",
    introduction:
      "Deniz çevresinin korunması, MARPOL ve balast suyunun ötesinde tekne dış yüzeyini, kullanılan boyaları ve geminin ömür sonu bertarafını da kapsar. Biyo-kirlenme (biofouling) yönetimi, anti-fouling sistemleri (AFS Convention) ve gemi geri dönüşümü (Hong Kong Convention) bu bütünün parçalarıdır.",
    sections: [
      {
        title: "Biyo-kirlenme (Biofouling) Yönetimi",
        content:
          "**Biyo-kirlenme (biofouling)**, tekne ve su altı yapılarında zamanla organizma birikmesidir; ince bir **biyofilm (slime)** ile başlar, ardından **yosun, deniz kabukluları (barnacle), midye ve boru kurtları** yerleşir. İki ayrı soruna yol açar.\n\n**Birinci sorun — istilacı tür:** Biofouling, balast suyu gibi, tekneye tutunan organizmaları başka bir bölgeye taşır; yani istilacı tür transferinin ikinci büyük yoludur.\n\n**İkinci sorun — sürtünme ve yakıt:** Kirli bir tekne, suya karşı **sürtünme direncini** ciddi biçimde artırır; bu, aynı hız için **daha çok yakıt** ve dolayısıyla **daha çok emisyon** (ve CII kaybı) demektir. Yalnızca yoğun bir slime tabakası bile yakıt tüketimini belirgin artırabilir; kabuklu kirlenme etkiyi katlar.\n\n**Yönetim:** IMO biofouling kılavuzları; düzenli **tekne kontrolü (inspection)**, **hat (hull) temizliği**, anti-fouling kaplama bakımı ve özellikle **niş alanların (sea chest, pervane, dümen, soğutma suyu girişleri)** yönetimini önerir — niş alanlar en çok kirlenen ve en çok gözden kaçan yerlerdir. **Gemide önemi:** Temiz tekne hem çevreyi (istilacı tür + emisyon) korur hem doğrudan **yakıt tasarrufu** sağlar; bu yüzden biofouling yönetimi hem çevresel hem ekonomik bir önceliktir.",
      },
      {
        title: "Anti-fouling Sistemleri ve AFS Convention",
        content:
          "**Anti-fouling boyalar**, tekneye organizma tutunmasını engelleyerek biofouling'i önler; bu, hem çevre hem yakıt açısından önemlidir. Ancak bu boyaların kendisi bir çevre sorunu yaratabilir.\n\n**Yasaklanan TBT:** Geçmişte çok etkili olan **organotin bileşikleri**, özellikle **TBT (tribütiltin)**, deniz canlıları için son derece toksik çıktı — deniz salyangozlarında cinsiyet değişimi (imposex) ve kabuklu ölümleri gibi ağır etkiler yarattı. Bu nedenle **AFS Convention (Anti-fouling Systems)** ile TBT esaslı sistemler **yasaklanmıştır**.\n\n**Modern kaplamalar:** Bugün TBT içermeyen alternatifler kullanılır — **kontrollü salınımlı (biyosit içeren ama daha az zararlı)** boyalar ve **foul-release (silikon esaslı, kaygan yüzey)** kaplamalar (organizma tutunamaz veya seyirde akıntıyla temizlenir).\n\n**Belge:** Uyum, **International Anti-fouling System Certificate (IAFS)** ile belgelenir; yasaklı madde bulunmamalı veya üzeri etkin bir kaplamayla örtülmelidir (sealed). **Gemide önemi:** Anti-fouling seçimi, çevre uyumu ile performansı dengelemektir; yasaklı sistem taşımak PSC ihlalidir, ayrıca kaplamanın türü ve durumu doğrudan yakıt verimini ve biofouling riskini etkiler.",
      },
      {
        title: "Gemi Geri Dönüşümü (Hong Kong Convention)",
        content:
          "Gemiler ömür sonunda **söküm tesislerinde geri dönüştürülür** (recycling); çeliğin büyük kısmı yeniden kullanılır. Ancak bu süreç, gemide bulunan **tehlikeli maddeler** nedeniyle hem **işçi sağlığı** hem **çevre** için ciddi risk taşır — **asbest, PCB, ağır metaller, TBT, radyoaktif kaynaklar ve petrol/kimyasal artıkları**. Kötü yönetilen söküm, ölümlü kazalara ve kıyı kirliliğine yol açmıştır.\n\n**Hong Kong Convention:** Gemilerin **güvenli ve çevreye duyarlı geri dönüşümünü** düzenler; hem tesisin standartlarını hem geminin ömür boyu tehlikeli madde yönetimini kapsar.\n\n**Temel araç — IHM:** Sözleşmenin çekirdeği, gemide bulunan tehlikeli maddelerin envanteridir: **Inventory of Hazardous Materials (IHM)**. Bu envanter (nerede, ne kadar, hangi tehlikeli madde) geminin **tüm yaşam döngüsü boyunca güncel** tutulur ve söküm öncesi tesise verilir; böylece tesis neyi nasıl güvenle sökeceğini önceden bilir.\n\n**Gemide önemi:** IHM güncelliği bir zabit/şirket sorumluluğudur; yeni ekipman/malzeme gemiye girdikçe envanter güncellenir. Ayrıca AB gibi bazı bölgeler kendi (daha katı) geri dönüşüm ve IHM kurallarını uygular — bu, yalnızca söküm anında değil, geminin işletme ömrü boyunca geçerli bir yükümlülüktür.",
      },
      {
        title: "Diğer Çevresel Konular",
        content:
          "Denizcilikte çevre yönetimi büyüyen bir alandır; MARPOL ve balast ötesinde birkaç güncel öncelik öne çıkar.\n\n**Su altı gürültüsü:** Pervane kavitasyonu ve makine titreşimi, **deniz memelilerinin** (balina, yunus) iletişim ve yön bulmasını bozar; daha sessiz pervane/gövde tasarımı ve bakımla azaltılabilir.\n\n**Karbon yoğunluğu ve alternatif yakıtlar:** IMO'nun **sera gazı stratejisi** doğrultusunda sektör düşük/sıfır karbonlu yakıtlara yönelir — **LNG, metanol, amonyak, hidrojen** ve rüzgâr destekli tahrik gibi. Her birinin kendi emniyet ve altyapı zorlukları vardır (örn. amonyağın toksisitesi, hidrojenin depolanması).\n\n**Enerji verimliliği önlemleri:** Hız optimizasyonu, hava/rota planlaması (weather routing), trim ve hat temizliği hem yakıtı hem emisyonu azaltır. **Plastik ve mikroplastik:** denize ulaşan plastiğin ve mikroplastiğin azaltılması küresel bir önceliktir.\n\n**İnsan faktörü:** Tüm bu sözleşmeler ancak sahada uygulanırsa işe yarar; **mürettebatın çevre bilinci, kayıt disiplini ve günlük iyi uygulamaları** (doğru atık ayrımı, dürüst kayıt, sistemlerin bakımı) tüm çevre mevzuatının gerçek hayattaki karşılığıdır. **Gemide önemi:** En iyi ekipman bile bilinçsiz veya disiplinsiz bir ekiple çevreyi koruyamaz; bir zabit hem kuralları bilmeli hem ekibe doğru kültürü aşılamalıdır.",
      },
    ],
    keyPoints: [
      "Biofouling istilacı tür taşır ve sürtünme/yakıt tüketimini artırır; düzenli temizlik önemlidir.",
      "TBT gibi organotin anti-fouling boyalar AFS Convention ile yasaktır; IAFS sertifikası gerekir.",
      "Hong Kong Convention güvenli gemi geri dönüşümünü düzenler; IHM envanteri tutulur.",
      "Su altı gürültüsü, alternatif yakıtlar ve mikroplastik güncel çevre öncelikleridir.",
    ],
  },
};
