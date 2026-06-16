import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Bayrak, klas, PSC ve vetting denetimlerine hazırlık",
  roleSlug: "kaptan",
  taskIndex: 5,
  estimatedPages: 27,
  intro: `Kaptan; bayrak devleti, klas kuruluşu, liman devleti kontrolü (PSC) ve ticari vetting (OCIMF SIRE, RightShip, CDI) denetimlerinde geminin birincil muhatabı ve nihai sorumlusudur. Bu sorumluluk; sertifika geçerliliklerinin matris halinde izlenmesi, survey takviminin sürmesi, denetim öncesi kendi kendine iç-denetim (self-audit) ile eksikliklerin proaktif kapatılması, mürettebatın denetim prosedürlerine hazırlanması ve denetim sırasında profesyonel iletişimin yönetilmesini kapsar. PSC deficiency, detention veya vetting observation çıkması durumunda kaptan; kök-neden analizini (root cause), düzeltici/önleyici aksiyonu (CA/PA) ve şirkete raporlamayı koordine eder. Bu bölüm, "denetime hazır gemi" kavramını soyut bir slogan olarak değil; sertifika matrisi, MOU ölçütleri, deficiency kodları, ekipman testleri ve raporlama disiplini bağlamında somut olarak ele alır.`,
  sources: [
    "SOLAS Chapter I — Survey and Certification (Reg. 6-12, 19)",
    "ISM Code (IMO Resolution A.741(18)) ve Doc/SMC sertifikasyonu",
    "ISPS Code & SOLAS XI-2 — ISSC ve güvenlik denetimleri",
    "MARPOL Annex I-VI — IOPP, IAPP, ISPP, IEEC sertifikaları",
    "Paris MOU & Tokyo MOU — Port State Control prosedürleri ve NIR (New Inspection Regime)",
    "IMO Resolution A.1155(32) — Procedures for Port State Control 2021",
    "OCIMF SIRE 2.0 Programme & VIQ (Vessel Inspection Questionnaire)",
    "RightShip Inspection & Vetting (DOC/RISQ) ve CDI Ship Inspection Report",
    "MLC 2006 — MLC sertifikası ve DMLC Part I/II",
  ],
  chapters: [
    {
      heading: "1. Denetim Ekosistemi: Kim, Neyi, Neden Denetler",
      lead: `Gemi, üst üste binen dört farklı denetim katmanına tabidir: bayrak (zorunlu/statutory), klas (teknik), PSC (liman devleti kontrolü) ve vetting (ticari kabul). Kaptan bu katmanların amaçlarını ve yetki sınırlarını net ayırmalıdır.`,
      sections: [
        {
          subheading: "1.1 Statutory (bayrak) ve klas denetimlerinin ayrımı",
          paragraphs: [
            `Bayrak devleti, SOLAS Chapter I gereğince geminin uluslararası sözleşmelere uygunluğunu sertifikalarla teyit eder; bu yetkiyi çoğu zaman bir Recognized Organization'a (RO — örn. klas kuruluşu) delege eder. Statutory survey'ler IOPP, SafCon, SafEquip, ISSC, SMC gibi sözleşme sertifikalarını üretir. Klas denetimi ise geminin yapısal bütünlüğünü, makine ve donanımın klas kurallarına uygunluğunu denetler ve Class Certificate'ı sürdürür.`,
            `İki katman pratikte iç içe geçer: bir klas sörveyörü hem statutory hem class kalemlerini aynı ziyarette kapatabilir. Kaptan, hangi kalemin hangi rejime ait olduğunu bilmek zorundadır; çünkü condition of class (CoC) veya memorandum, statutory deficiency'den farklı bir takvim ve sonuç doğurur. Bir CoC zamanında kapatılmazsa klas askıya alınır (suspension), bu da gemiyi otomatik olarak seferden ve sigortadan düşürür.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS I/11 — Sertifikanın geçerliliğinin korunması",
              text: `Sörvey sonrası geminin yapısı, donanımı veya teçhizatı sörveyde tespit edilen durumdan, idarenin onayı olmadan değiştirilemez. Geminin emniyetini etkileyen herhangi bir hasar veya arıza derhal idareye/RO'ya bildirilmelidir; aksi halde sertifika geçersiz hale gelebilir.`,
            },
          ],
        },
        {
          subheading: "1.2 PSC ile vetting arasındaki temel fark",
          paragraphs: [
            `PSC, bir liman devletinin (Paris/Tokyo MOU, USCG, AMSA, Black Sea MOU vb.) kendi sularındaki yabancı bayraklı gemilerin uluslararası standartlara uygunluğunu denetlediği hukuki bir zorlama mekanizmasıdır. PSC'nin yaptırımı vardır: deficiency, detention, banning. Amaç emniyet ve çevre; sonuç kamusaldır ve Equasis gibi platformlarda görünür.`,
            `Vetting ise ticari bir kabul sürecidir; bir charterer veya yük sahibinin (örn. büyük petrol şirketleri OCIMF üyeleri, ya da dökme yükte RightShip) gemiyi kiralamadan önce risk değerlendirmesi yapmasıdır. Vetting'in hukuki zorlama yetkisi yoktur ama ticari yaptırımı çok serttir: olumsuz bir SIRE raporu veya düşük RightShip skoru, gemiyi bütün bir ticari segmentten dışlayabilir. Kaptan için pratik sonuç şudur: PSC'de hedef "gemiyi tutturmamak", vetting'de hedef "gemiyi sürekli kiralanabilir tutmaktır".`,
          ],
          table: {
            caption: `Denetim Katmanlarının Karşılaştırması`,
            headers: ["Katman", "Yetki/Amaç", "Tipik çıktı", "Olumsuz sonuç"],
            rows: [
              ["Bayrak (Statutory)", "Sözleşme uyumu", "IOPP/ISSC/SMC vb.", "Sertifika iptali"],
              ["Klas", "Yapı/makine bütünlüğü", "Class Certificate, CoC", "Klas askıya alma"],
              ["PSC", "Liman devleti zorlaması", "Deficiency/Detention", "Tutma, banning"],
              ["Vetting (SIRE/RightShip/CDI)", "Ticari risk kabulü", "Inspection report, skor", "Charter dışı kalma"],
            ],
          },
        },
      ],
    },
    {
      heading: "2. Sertifika Matrisi ve Geçerlilik Yönetimi",
      lead: `Denetime hazırlığın temeli, hiçbir sertifikanın "sürpriz" şekilde sona ermemesidir. Kaptan, gemideki tüm sertifikaların matris halinde izlendiği bir takvim tutar.`,
      sections: [
        {
          subheading: "2.1 Zorunlu sertifikaların kapsamı ve süreleri",
          paragraphs: [
            `Tipik bir kuru yük gemisinde taşınması gereken ana sertifikalar; Cargo Ship Safety Construction (SafCon), Cargo Ship Safety Equipment (SafEquip), Cargo Ship Safety Radio (SafRadio), IOPP (MARPOL Annex I), IAPP (Annex VI), ISPP (Annex IV — sewage), IEEC (Energy Efficiency), ISSC (ISPS), SMC (ISM), MLC sertifikası, IBWMC (Ballast Water), Tonnage, Load Line, Minimum Safe Manning Document ve CLC/Bunker sigorta sertifikalarıdır. Çoğu 5 yıllık geçerliliğe sahiptir ama yıllık (annual), ara (intermediate) ve yenileme (renewal) sörveylerine ve windows'lara tabidir.`,
            `Kaptanın kritik kavramı "survey window"dur: anniversary date'in 3 ay öncesi ve 3 ay sonrası bir pencere oluşturur (annual survey için ±3 ay). Renewal survey, geçerlilik bitiminden önceki 3 ay içinde tamamlanmalıdır. Window dışına çıkmak harmonised survey rejimini bozar ve sertifikanın "out of window" durumuna düşmesi, PSC'de doğrudan deficiency üretir. Kaptan, port rotasyonunu sörvey window'larını yakalayacak şekilde şirketle planlamalıdır.`,
          ],
          table: {
            caption: `Temel Sertifika / Sörvey Matrisi (Tipik Kuru Yük Gemisi)`,
            headers: ["Sertifika", "Mevzuat", "Geçerlilik", "Ara sörvey"],
            rows: [
              ["SafCon / SafEquip / SafRadio", "SOLAS I", "5 yıl", "Annual + Intermediate"],
              ["IOPP", "MARPOL Annex I", "5 yıl", "Annual + Intermediate"],
              ["IAPP / IEEC", "MARPOL Annex VI", "5 yıl", "Annual"],
              ["ISSC", "ISPS / SOLAS XI-2", "5 yıl", "Intermediate (2.-3. yıl)"],
              ["SMC", "ISM Code", "5 yıl", "Intermediate (2.-3. yıl)"],
              ["MLC Certificate", "MLC 2006", "5 yıl", "Intermediate"],
              ["Load Line", "LL 1966 Protocol", "5 yıl", "Annual"],
            ],
          },
        },
        {
          subheading: "2.2 DOC, SMC ve ISSC arasındaki bağ",
          paragraphs: [
            `ISM rejiminde iki belge vardır: şirkete ait Document of Compliance (DOC) ve gemiye ait Safety Management Certificate (SMC). Gemideki SMC, ancak şirketin geçerli bir DOC'una bağlı olduğu sürece geçerlidir; kaptan, gemide DOC'un onaylı kopyasının bulunduğunu ve gemi tipinin DOC kapsamında listelendiğini (örn. "bulk carrier" yazıyorsa tanker olarak çalışılamaz) doğrulamalıdır.`,
            `ISSC için de benzer mantık geçerlidir: gemi güvenlik planının (SSP) onaylı olması ve CSO/PFSO koordinasyonunun çalışır durumda olması ISSC'nin altyapısıdır. PSC'de bir denetçi, SMC'yi gördüğünde "SMS sahada gerçekten işliyor mu?" sorusunu near-miss kayıtları, drill kayıtları ve düzeltici aksiyon kapanış oranlarıyla test eder. Sertifikanın duvarda asılı olması değil, arkasındaki sistemin nefes alıyor olması denetlenir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Interim sertifikaların tuzağı",
              text: `Yeni inşa veya bayrak/şirket değişiminde verilen Interim DOC/SMC/ISSC kısa sürelidir (genelde 6 ay, uzatma ile 12 ay). Kaptan interim'in bitiş tarihini matrise mutlaka kırmızı işaretle koymalıdır; süresi dolan interim sertifika, full sertifikadan farklı olarak hızlı detention sebebidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. PSC: Hedef Seçimi, Süreç ve MOU Mantığı",
      lead: `PSC denetimi rastgele değildir; risk-temelli bir hedefleme (targeting) algoritmasıyla seçilir. Kaptan, geminin neden hedef olduğunu anlamadan hazırlığı doğru kuramaz.`,
      sections: [
        {
          subheading: "3.1 New Inspection Regime (NIR) ve gemi risk profili",
          paragraphs: [
            `Paris MOU New Inspection Regime, her gemiye bir Ship Risk Profile (SRP) atar: Low Risk Ship (LRS), Standard Risk Ship (SRS) veya High Risk Ship (HRS). Profil; gemi tipi ve yaşı, bayrak performansı (black/grey/white list), klas/RO performansı, şirketin önceki deficiency ve detention geçmişi ve son denetimlerdeki bulgular üzerinden hesaplanır. LRS gemiler 24-36 ayda bir, HRS gemiler 5-6 ayda bir denetlenir.`,
            `Kaptanın pratik çıkarımı şudur: geminin geçmiş deficiency'leri ve şirketin sicili, bugünkü denetim sıklığını doğrudan belirler. Tek bir detention, şirketi grey/black bandına itip filodaki tüm gemilerin hedeflenme olasılığını artırabilir. Bu yüzden kaptan, "kendi denetimimi geçtim" demekle yetinmez; her bulgunun şirket sicilini ve filo riskini etkilediğini bilir.`,
          ],
          bullets: [
            `Gemi tipi ve yaş (tanker/bulk/yolcu daha yüksek risk)`,
            `Bayrak listesi durumu (Paris MOU White/Grey/Black List)`,
            `RO/klas performans tablosu`,
            `Şirketin 36 aylık deficiency/detention oranı`,
            `Son 36 ayda yapılan denetimler ve bulgu sayısı`,
            `"Overriding" ve "unexpected" faktörler (kaza, şikâyet, ihbar)`,
          ],
        },
        {
          subheading: "3.2 Denetim akışı: initial, more detailed, expanded",
          paragraphs: [
            `Bir PSC denetimi tipik olarak initial inspection ile başlar: sertifika kontrolü, geminin genel durumu (general impression) ve mürettebatla ilk temas. "Clear grounds" (açık gerekçe) oluşursa — örneğin sertifika eksik, ekipman görünür arızalı, mürettebat temel görevlerini bilmiyor — denetim more detailed inspection'a yükselir. Belirli gemi tipleri ve yaş için expanded inspection zaten zorunludur.`,
            `Kaptan, "general impression" faktörünü hafife almamalıdır: paslı güverte, çalışmayan aydınlatma, dağınık can filikası istasyonu, açık watertight kapılar, kirli makine dairesi — bunların hepsi denetçide "bu gemide sistem zayıf" izlenimi yaratır ve denetimi derinleştirir. İlk 15 dakikadaki görsel intiba, denetimin tonunu ve süresini belirler.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "IMO Res. A.1155(32) — Clear Grounds",
              text: `Denetçi, sertifikaların eksik/geçersiz olduğuna, geminin/donanımın gerekliliklere uymadığına, mürettebatın acil durum görevlerini bilmediğine veya geminin emniyetsiz biçimde işletildiğine dair "clear grounds" bulursa, daha detaylı denetim yapma yetkisine sahiptir.`,
            },
          ],
        },
        {
          subheading: "3.3 Concentrated Inspection Campaign (CIC)",
          paragraphs: [
            `Her yıl Paris ve Tokyo MOU, belirli bir temaya odaklanan eşgüdümlü kampanya (CIC) yürütür: geçmişte STCW rest hours, MARPOL Annex VI, fire safety, ISM, crew familiarization, ballast water management gibi temalar seçildi. CIC döneminde her gemiye standart denetimin yanı sıra bir CIC anketi uygulanır. Kaptan, o yılki CIC temasını önceden öğrenip ilgili dosyaları, kayıtları ve ekipman testlerini özel olarak hazırlamalıdır.`,
            `CIC'in incelikli yanı, normalde detention sebebi olmayacak bir bulgunun, CIC anketindeki bir maddenin "No" işaretlenmesiyle deficiency'ye dönüşebilmesidir. Örneğin bir ballast water CIC'inde BWMS'in onaylı çalışma kaydının tutulmaması, ya da bir fire safety CIC'inde fixed CO2 sisteminin bakım kaydının eksikliği, kampanya boyunca standartın çok ötesinde mercek altına alınır.`,
          ],
        },
      ],
    },
    {
      heading: "4. Deficiency Kodları, Action Kodları ve Detention",
      lead: `PSC raporunun dili kodlardan oluşur. Kaptan, deficiency'nin ne kadar ciddi olduğunu ve gemiyi nasıl etkileyeceğini "action code"dan okur.`,
      sections: [
        {
          subheading: "4.1 Deficiency ve action code mantığı",
          paragraphs: [
            `Her deficiency, bir konu koduna (örn. 07 fire safety, 11 safety of navigation, 01 certificates, 04 emergency systems, 18 ISM) ve bir veya birden çok action koduna bağlanır. Action kodu, denetçinin gemiden ne istediğini söyler: 16 = "rectify deficiency", 17 = "rectify at next port", 18 = "rectify within 14 days", 15 = "rectify before departure" ve en ağırı 30 = "detainable deficiency / ship detained".`,
            `Kaptan, bir bulgunun action kodunu raporu imzalamadan önce mutlaka okumalıdır; çünkü "rectify before departure" (15) ile "detained" (30) arasındaki fark, gemiyi kalkıştan alıkoyan operasyonel ve ticari bir uçurumdur. Bir code 30, sadece o bulgunun değil, geminin emniyetli işletimine dair sistemik bir şüphenin işaretidir.`,
          ],
          table: {
            caption: `Sık Kullanılan PSC Action Kodları`,
            headers: ["Kod", "Anlamı", "Pratik sonuç"],
            rows: [
              ["10", "Deficiency rectified", "Sahada giderildi, kapandı"],
              ["15", "Rectify before departure", "Kalkıştan önce giderilmeli"],
              ["16", "Rectify deficiency", "Belirli süre/koşulla"],
              ["17", "Rectify at next port", "Bir sonraki limanda"],
              ["18", "Rectify within 14 days", "14 gün içinde, kanıtla"],
              ["30", "Grounds for detention", "Gemi tutuldu (detention)"],
              ["99", "Other (flag/RO informed)", "Bayrak/RO bilgilendirildi"],
            ],
          },
        },
        {
          subheading: "4.2 Detention'a yol açan tipik bulgular",
          paragraphs: [
            `Detention'lar genellikle "emniyeti, çevreyi veya can güvenliğini doğrudan tehdit eden" bulgulardan doğar: çalışmayan can filikası indirme tertibatı veya davits, arızalı emergency fire pump, deniz tarafına akan oily water separator (15 ppm bypass), geçersiz/eksik ana sertifika, çalışmayan steering gear yedek sistemi, açık/tıkalı watertight bütünlük, ciddi rest hours ihlali ve mürettebatın temel acil durum görevlerini gösterememesi.`,
            `Kaptanın hafife almaması gereken nokta, "tek bir büyük arıza" kadar "birden çok küçük bulgunun toplamının" da detention doğurabilmesidir. Denetçi, ayrı ayrı küçük olan ama hepsi birlikte SMS'in çökmüş olduğunu kanıtlayan bir tablo görürse, ISM altında (kod 18) gemiyi tutabilir. Yani gemi, "hiçbiri tek başına ölümcül değil ama hepsi birlikte sistem yokluğunu gösteriyor" gerekçesiyle alıkonabilir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka dersi — Toplam etki detention'ı",
              text: `Bir yaşlı bulk carrier'da; can yeleği lambalarının bir kısmı çalışmıyor, immersion suit kayıtları eksik, muster list güncel değil, iki kapı kapanmıyor ve bir mürettebat kendi muster station'ını bilmiyordu. Bulguların hiçbiri tek başına code 30 değildi; denetçi tümünü ISM yetersizliği (kod 18) altında topladı ve gemiyi tuttu. Ders: PSC, sistemi denetler — kaptan her küçük bulguyu sistemin bir parçası olarak görmelidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Vetting: SIRE 2.0, RightShip ve CDI",
      lead: `Vetting, geminin ticari ömrünü belirler. Kaptan; SIRE 2.0'ın yeni dijital yapısını, RightShip'in skor mantığını ve CDI'ın kimyasal taşımacılıktaki yerini bilmelidir.`,
      sections: [
        {
          subheading: "5.1 OCIMF SIRE 2.0 — dijital, risk-temelli denetim",
          paragraphs: [
            `SIRE 2.0, OCIMF'in 2024'te tam yürürlüğe soktuğu yeni tanker vetting rejimidir. Eski statik VIQ yerine; tablet tabanlı, soru-bankası temelli ve gemiye özel (vessel-specific) bir risk profiliyle çalışır. Denetçi, gemiye geldiğinde sistemin o gemi için seçtiği soru setini görür; sorular Hardware (donanım), Process (prosedür/kayıt) ve Human (mürettebat yetkinliği) boyutlarına dağılır. İnsan faktörünün ağırlıklandırılması, kaptan ve zabitlerle yapılan görüşmelerin önemini ciddi biçimde artırmıştır.`,
            `Kaptanın SIRE 2.0 hazırlığı, dosya düzeltmekten öteye geçmiştir: bir zabit, "bu prosedürü nasıl uygularsın?" sorusuna kendi gemisindeki gerçek uygulamayı anlatabilmelidir. Photographic evidence ve gerçek zamanlı kayıt sistemi nedeniyle "gösterip kaldırma" mümkün değildir. SIRE 2.0'da olumsuzluklar "observation" olarak raporlanır; her observation şirket tarafından bir kök-neden ve düzeltici aksiyonla kapatılmalıdır, yoksa bir sonraki charter'da önün açılmaz.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "SIRE 2.0'da insan boyutu hazırlığı",
              text: `Denetçi artık doğrudan "show me / tell me" yöntemiyle mürettebatı sınıyor. Kaptan, vetting öncesi her zabitle kendi sorumluluk alanındaki üç-beş kritik prosedürü provasını yaptırmalı; ezber cevap değil, gerçek uygulamayı anlatmaya odaklanmalıdır. SIRE 2.0 ezberi cezalandırır, sahiciliği ödüllendirir.`,
            },
          ],
        },
        {
          subheading: "5.2 RightShip (dökme yük) ve risk skoru",
          paragraphs: [
            `RightShip, ağırlıklı olarak dökme yük (bulk, geleneksel olarak demir cevheri, kömür, tahıl) segmentinde charterer'ların gemi kabul kararını verdiği platformdur. Bir gemiye Safety Score (1-5 yıldız benzeri) ve ayrıca GHG Rating (A-G, EEXI/CII temelli karbon performansı) atar. Düşük safety skoru veya kötü GHG rating, geminin büyük maden ve enerji şirketlerinin nominasyon listesinden düşmesine yol açar.`,
            `RightShip kabulü için RISQ (RightShip Inspection and Survey Questionnaire) temelli bir fiziksel denetim de yapılabilir. Kaptanın pratik görevi; RightShip platformundaki gemi verisinin (sörvey tarihleri, PSC geçmişi, kaza/incident kaydı) güncel ve doğru olmasını şirketle birlikte sağlamak, ve özellikle PSC detention'ların skoru aylarca aşağı çektiğini bilerek her bulguyu ciddiye almaktır.`,
          ],
        },
        {
          subheading: "5.3 CDI ve sektörel kapsam",
          paragraphs: [
            `CDI (Chemical Distribution Institute), kimyasal ve gaz tankerleri için OCIMF'e benzer bir vetting/inspection rejimidir; CDI-Marine raporu, kimyasal yük sahiplerinin gemi kabul kararında belirleyicidir. Petrol tankerleri için SIRE, kimyasal/gaz için CDI, dökme yük için RightShip — kaptan, hangi segmentte çalışıyorsa o programın denetim mantığına ve raporlama döngüsüne hâkim olmalıdır.`,
            `Tüm bu programların ortak paydası şudur: vetting bir "an"lık fotoğraf değil, sürekli bir kayıt ve performans geçmişidir. Bir gemi, bir denetimi parlak geçse bile geçmiş raporlarındaki kapatılmamış observation'lar yüzünden reddedilebilir. Kaptan bu nedenle vetting'i bir "olay" değil, her gün sürdürülen bir "durum" olarak yönetmelidir.`,
          ],
        },
      ],
    },
    {
      heading: "6. Denetim Öncesi Self-Audit ve Hazırlık",
      lead: `Denetimden önceki en güçlü silah, denetçiden önce kendi gemini denetlemektir. Self-audit, kaptanın proaktif savunma hattıdır.`,
      sections: [
        {
          subheading: "6.1 Pre-arrival self-inspection programı",
          paragraphs: [
            `Kaptan, beklenen PSC veya vetting öncesinde, geminin kendi VIQ/RISQ/PSC checklist'ini kullanarak sistematik bir iç denetim yürütür. Bu denetim güverteyi, makine dairesini, can güvenliği donanımını (LSA), yangın donanımını (FFA), köprüüstünü, kâğıt/elektronik kayıtları ve mürettebat yetkinliğini kapsar. Bulgular bir "snag list"e işlenir; her kalem bir sorumluya ve son tarihe bağlanır.`,
            `İyi bir self-audit, "denetçi gözüyle" yapılır; yani kaptan, kendi gemisine bir yabancı denetçi olarak bakmayı öğrenmelidir. Ekiple aşinalık (familiarity bias), gerçek bulguları görünmez kılar; bu yüzden self-audit'i farklı bir zabite yaptırmak veya çapraz denetim (chief officer makineyi, 2nd engineer güverteyi denetler) kör noktayı azaltır.`,
          ],
          bullets: [
            `LSA: can filikaları, davit/brake test, hidrostatik release, immersion suit, EPIRB/SART kayıtları`,
            `FFA: fixed sistemler (CO2/foam), portatif tüpler, fire detector, fireman outfit, EEBD`,
            `Navigasyon: ECDIS güncellemeleri, BNWAS, GMDSS test, magnetic compass deviation card`,
            `MARPOL: OWS 15 ppm test, ORB/GRB/BWRB tutarlılığı, incinerator/scrubber kaydı`,
            `Kayıtlar: drill, near-miss, PMS, rest hours, sertifika matrisi`,
            `İnsan: muster list güncelliği, familiarization formları, görev bilgisi`,
          ],
        },
        {
          subheading: "6.2 Mürettebatın hazırlanması ve görev provası",
          paragraphs: [
            `Hazırlığın en kritik ve en çok ihmal edilen parçası, mürettebatın denetime hazırlanmasıdır. Her mürettebat üyesi kendi muster station'ını, yangın ve abandon ship görevini, EEBD ve immersion suit kullanımını gösterebilmelidir. Denetçi, rastgele seçtiği bir bahçıvanı (oiler, AB) durdurup "yangın alarmında ne yaparsın?" diye sorduğunda, tereddütsüz ve doğru cevap, sistemin işlediğinin en güçlü kanıtıdır.`,
            `Kaptan, denetim öncesi bir "tatbikat brifingi" yapar: dil bariyeri olan mürettebatla anahtar cevapların İngilizce ifadesini tazeler, kritik ekipmanların yerini ve testini tekrar ettirir. Ancak bu, ezber dayatmak değil, gerçekten bilineni hatırlatmaktır; çünkü ezber edilmiş ama anlaşılmamış bir cevap, ilk takip sorusunda dağılır ve denetçide güvensizlik yaratır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Familiarity bias tehlikesi",
              text: `Aynı ekiple uzun süre çalışan kaptan, gemideki aksaklıklara karşı "kör" hale gelir; çalışmayan bir lamba, paslı bir kapı, sürekli bypass edilen bir alarm "normal" görünmeye başlar. Self-audit'i mümkünse dışarıdan bir göze (üçüncü taraf süper-intendant veya rotasyonlu çapraz denetim) yaptırmak bu körlüğü kırar.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. Denetim Sırasında Kaptanın Yönetimi",
      lead: `Denetim anı bir sınav değil, profesyonel bir etkileşimdir. Kaptanın tavrı, raporun tonunu doğrudan etkiler.`,
      sections: [
        {
          subheading: "7.1 Karşılama, refakat ve iletişim disiplini",
          paragraphs: [
            `Denetçi gemiye geldiğinde kaptan veya görevlendirdiği üst zabit onu karşılar, güvenlik brifingi (PPE, kısıtlı alanlar, acil durum) verir ve denetim boyunca uygun bir refakat sağlar. Denetçi asla yalnız bırakılmaz; her alanda o bölümün sorumlusu (chief officer güvertede, chief engineer makinede) hazır bulunur. Refakat, denetçiyi "izlemek" için değil, soruları doğru kişiye yönlendirmek ve bulguyu anında bağlama oturtmak içindir.`,
            `İletişimde altın kural: sorulmayanı söyleme, sorulana dürüst ve net cevap ver. Mürettebat, bilmediği bir konuda tahminde bulunmamalı, "kontrol edip size kesin bilgiyi vereyim" demelidir. Yalan veya çelişkili ifade, tek bir bulgudan çok daha tehlikelidir; çünkü denetçinin gemiye olan güvenini kökten sarsar ve denetimi savunmacı bir derinliğe çeker.`,
          ],
        },
        {
          subheading: "7.2 Bulgu itirazı, kapanış toplantısı ve raporun imzası",
          paragraphs: [
            `Bir bulgu yanlış veya haksız görünüyorsa, kaptan bunu kapanış (closing meeting) sırasında saygılı, gerekçeli ve belgeye dayalı biçimde tartışabilir; tartışma kişiselleşmemeli, mevzuat ve kanıt üzerinden yürümelidir. Denetçi ikna olursa bulgu rapora girmeden düşebilir; olmazsa kaptan, raporu imzalamak zorundadır ancak imza "bulguyu kabul" değil, "raporu tebellüğ" anlamına gelir.`,
            `PSC raporunda kaptan, deficiency'lerin action kodlarını, rectification süresini ve gemiye dair notları dikkatle okumalıdır. Bir code 30 (detention) durumunda kaptan derhal şirketi, DPA'yı, bayrak devletini, klası ve P&I/H&M tarafını bilgilendirir; detention'ın kaldırılması için gereken survey ve re-inspection sürecini koordine eder. Bayrağa, gerektiğinde 90 gün içinde resmi itiraz (appeal/review) hakkı vardır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MOU — Right of Appeal",
              text: `Paris ve Tokyo MOU çerçevesinde armatör/işletmecinin, bir detention kararına karşı liman devletine itiraz (review/appeal) hakkı vardır. İtiraz, detention'ı otomatik kaldırmaz; ancak haksız bulunursa kayıt düzeltilir. Kaptan, itiraza esas olacak tüm kanıtı (fotoğraf, kayıt, sörvey raporu) ilk andan itibaren toplamalıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "8. Kök-Neden Analizi ve Düzeltici Aksiyon",
      lead: `Bir bulguyu kapatmak, sadece arızayı tamir etmek değildir. Asıl iş, bulgunun neden oluştuğunu bulup tekrarını engellemektir.`,
      sections: [
        {
          subheading: "8.1 Root Cause Analysis (RCA) ve sistemik bakış",
          paragraphs: [
            `Her deficiency veya observation için ISM kapsamında bir kök-neden analizi yapılır. "5 Neden" (5 Whys) veya benzeri yöntemlerle, yüzeydeki teknik arızanın altındaki yönetimsel/sistemik neden bulunur. Örneğin "emergency fire pump çalışmadı" bulgusunun kök nedeni çoğu zaman pompanın kendisi değil; PMS'te eksik bir bakım kalemi, eğitilmemiş personel veya yetersiz yedek parça stokudur.`,
            `Kaptanın burada hassas olması gereken nokta, "blame" (suçlama) ile "root cause" (kök-neden) arasındaki farktır. "AB ihmalkârdı" bir kök-neden değil, bir suçlamadır; gerçek kök-neden "ABin görev tanımında bu kalem yoktu" ya da "familiarization yetersizdi" olabilir. Just culture temelli RCA, gerçek nedeni gizlemeyen dürüst bir raporlama kültürünün önkoşuludur.`,
          ],
        },
        {
          subheading: "8.2 Corrective/Preventive Action ve şirkete raporlama",
          paragraphs: [
            `RCA'nın çıktısı, bir düzeltici aksiyon (mevcut sorunu giderir) ve bir önleyici aksiyon (tekrarı önler) planıdır. Düzeltici aksiyon "pompayı tamir et" iken; önleyici aksiyon "PMS'e bu testi 3 ayda bir ekle, ilgili personele eğitim ver, yedek parçayı stok minimum'a bağla" olabilir. Her aksiyon bir sorumluya, son tarihe ve kapanış kanıtına (foto, test raporu, eğitim kaydı) bağlanır.`,
            `Kaptan, tüm bulgu-RCA-CA/PA döngüsünü şirketin SMS raporlama sistemine (genelde bir non-conformity/CAR formu) işler ve DPA'ya iletir. Bu kayıt, sadece bir bürokratik gereklilik değil; bir sonraki denetimde "geçen bulgunu nasıl kapattın?" sorusuna verilecek somut cevaptır ve şirketin yönetim gözden geçirme toplantısının (management review) girdisidir. Kapanmamış aksiyonlar, vetting ve PSC'de tekrar tekrar karşına çıkar.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka dersi — Tekrarlayan deficiency tuzağı",
              text: `Bir tanker, üç ardışık limanda aynı "oily water separator alarm test kaydı eksik" bulgusunu aldı. Her seferinde kayıt "tamamlandı" ama kök-neden (chief engineer'ın test prosedürünü yanlış anlaması) hiç ele alınmadı. Dördüncü limanda denetçi tekrarı görünce ISM yetersizliği gerekçesiyle gemiyi tuttu. Ders: aynı bulgunun tekrarı, tek başına detention sebebidir; RCA atlanırsa bulgu asla gerçekten kapanmaz.`,
            },
          ],
        },
      ],
    },
    {
      heading: "9. Belge ve Kayıt Yönetiminin Denetimdeki Rolü",
      sections: [
        {
          subheading: "9.1 Çapraz tutarlılık: kayıtlar birbiriyle konuşmalı",
          paragraphs: [
            `Denetçinin en sevdiği teknik, farklı kayıtları çapraz kontrol etmektir. Oil Record Book'taki bir transfer, makine dairesi loglarıyla, sounding kayıtlarıyla ve yakıt teslim notlarıyla (BDN) tutarlı olmalıdır. Deck log, GMDSS log, ECDIS route history ve passage plan birbiriyle çelişmemelidir. Bir kaydın diğerini yalanlaması, denetçide "burada bir şey saklanıyor" şüphesi yaratır ve denetimi adli bir derinliğe çeker.`,
            `Rest hours kayıtları özellikle hassastır: STCW A-VIII/1 ve MLC sınırlarının (24 saatte ≥10 saat, 7 günde ≥77 saat) "kâğıt üzerinde" tutturulması ama gerçekte ihlal edilmesi, denetçinin port log, gangway watch ve cargo operation kayıtlarıyla çapraz kontrolünde ortaya çıkar. "Mükemmel görünen ama gerçekçi olmayan" rest hours tabloları, denetçi için kırmızı bayraktır.`,
          ],
        },
        {
          subheading: "9.2 Kayıt sahteciliğinin (falsification) sonuçları",
          paragraphs: [
            `Kayıt sahteciliği — özellikle ORB'de "magic pipe" (yağlı suyun OWS'i bypass ederek denize verilmesinin gizlenmesi) — denizcilik hukukunun en ağır cezalandırdığı suçlardandır. ABD'de APPS (Act to Prevent Pollution from Ships) kapsamında, fiilen kirlilik ABD sularında olmasa bile sahte ORB ile ABD limanına girmek başlı başına suçtur; milyonlarca dolar ceza, kaptanın hapsi ve gemiye seyahat yasağı gündeme gelir.`,
            `Kaptan için temel ilke şudur: bir bulgu, dürüstçe kaydedildiğinde yönetilebilir bir sorundur; gizlendiğinde ise kariyer ve özgürlük bitiren bir suça dönüşür. Denetime hazırlık, "kötü gerçeği güzel göstermek" değil, "gerçeği denetimden önce düzeltmek ve dürüstçe belgelemek" anlamına gelir. Sahtecilik, hiçbir deficiency'nin doğuramayacağı kadar büyük bir risktir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Magic pipe ve APPS",
              text: `Sahte Oil Record Book, ABD'de federal suçtur. Whistleblower (ihbarcı) mürettebata cezanın önemli bir yüzdesi ödül olarak verilebilir; bu, ekip içi gizliliğe güvenmeyi imkânsız kılar. Kaptan, hiçbir koşulda kayıt sahteciliğine göz yummamalı, baskı altında bile dürüst kaydı korumalıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "10. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "10.1 Denetime hazırlık kontrol listesi",
          bullets: [
            `Sertifika matrisi güncel mi; hiçbir sertifika/sörvey window dışına çıkmıyor mu?`,
            `DOC kapsamı gemi tipiyle örtüşüyor mu; SMC/ISSC/MLC geçerli mi (interim'ler dahil)?`,
            `Geminin Ship Risk Profile'ı ve son PSC/vetting geçmişi biliniyor mu?`,
            `O yılki CIC teması belirlendi mi; ilgili kayıt ve testler hazır mı?`,
            `Pre-arrival self-audit (VIQ/RISQ/PSC checklist) yapıldı, snag list kapatıldı mı?`,
            `LSA/FFA testleri, GMDSS, BNWAS, OWS 15 ppm, steering gear yedeği test edildi mi?`,
            `ORB/GRB/BWRB ve rest hours kayıtları çapraz tutarlı ve gerçekçi mi?`,
            `Muster list güncel; her mürettebat görevini ve istasyonunu gösterebiliyor mu?`,
            `Önceki bulguların RCA + CA/PA döngüsü kapatıldı; tekrarlayan deficiency yok mu?`,
            `Denetim sırasında refakat ve iletişim planı (kim, hangi alanda) hazır mı?`,
            `Detention senaryosu için DPA/bayrak/klas/P&I bildirim akışı net mi?`,
          ],
          paragraphs: [
            `Kaptan için "denetime hazır gemi", denetim sabahı telaşla toplanan bir gemi değil; her gün denetlenebilir durumda tutulan bir gemidir. Sertifika matrisinin disiplini, self-audit'in dürüstlüğü, kök-neden analizinin derinliği ve mürettebatın sahici yetkinliği — bunların hepsi bir araya geldiğinde, PSC ve vetting yalnızca bu sürekli hazırlığın dışarıdan teyididir. En iyi kaptan, denetçinin gördüğünü kendisinin çok önceden görmüş ve düzeltmiş olandır; denetim onun için bir sınav değil, zaten bildiği bir sonucun onaylanmasıdır.`,
          ],
        },
      ],
    },
  ],
};

export default content;
