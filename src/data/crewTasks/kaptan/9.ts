import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Şirket, charterer ve üçüncü taraf iletişimi",
  roleSlug: "kaptan",
  taskIndex: 9,
  estimatedPages: 26,
  intro: `Kaptanın iletişim ağı; armatör/şirket (DPA üzerinden), charterer (kiracı), liman acenteleri, liman otoriteleri, klas, P&I, terminal ve resmi makamlardan oluşan çok katmanlı bir yapıdır. Bu ağın merkezinde ISM Code'un öngördüğü Designated Person Ashore (DPA) ile kesintisiz iletişim ve SOLAS V/34-1 ile ISM 5.2'nin tanıdığı "overriding authority" (üstün yetki) durur. Kaptanın temel mesleki dengesi, charterer'in ticari talepleri ile geminin/mürettebatın emniyeti arasındaki gerilimi yönetmek; bu süreçte ne zaman "evet", ne zaman "hayır" diyeceğini bilmek ve her kararı belgelemektir. Bu bölüm, kaptanın iletişim disiplinini hukuki çerçevesi, raporlama hatları, time/voyage charter ayrımı, acente koordinasyonu ve kriz iletişimi bağlamında somut prosedürlerle ele alır.`,
  sources: [
    "ISM Code (IMO Res. A.741(18)) — Madde 4 (DPA), Madde 5 (Master's Authority)",
    "SOLAS Chapter V/34-1 — Master's Discretion / Overriding Authority",
    "ISPS Code — Ship Security Communication (Part A/B)",
    "BIMCO Standard Charter Party Forms (GENCON, NYPE, SHELLTIME)",
    "INTERTANKO / INTERCARGO Master's Guidance Notes",
    "IMO Resolution A.1106(29) — AIS / Reporting",
    "ICS Bridge Procedures Guide (5th Edition) — Communications",
    "P&I Club Loss Prevention Bulletins (Gard, UK Club, North)",
  ],
  chapters: [
    {
      heading: "1. İletişim Ağının Hukuki Çerçevesi",
      lead: `Kaptanın iletişimi gevşek bir "haberleşme" değil, mevzuatla tanımlanmış sorumluluk hatlarının yönetimidir. Bu bölüm, ağın hukuki iskeletini ortaya koyar.`,
      sections: [
        {
          subheading: "1.1 DPA ve ISM Code madde 4",
          paragraphs: [
            `ISM Code madde 4, her şirketin bir veya daha fazla Designated Person Ashore (DPA) atamasını zorunlu kılar. DPA'nın iki kritik özelliği vardır: en üst yönetime doğrudan erişimi ve geminin emniyet/kirlilik önleme operasyonlarını izleme görevi. DPA, kaptan ile şirketin en üst yönetimi arasında köprü kurar; ticari hattan (operasyon, chartering) bağımsız bir emniyet hattıdır. Bu bağımsızlık, ticari baskının emniyet kararını ezmesini önlemek için tasarlanmıştır.`,
            `Kaptan, DPA'ya ulaşmak için hiçbir izne ihtiyaç duymaz; gece-gündüz 24/7 erişebilir. DPA'nın iletişim bilgileri (telefon, e-posta, uydu hattı) köprüüstünde ve SMS dokümantasyonunda görünür şekilde asılı olmalıdır. PSC denetçileri sıklıkla "DPA kim, numarası nerede?" diye sorar; mürettebatın bunu bilmemesi ISM major non-conformity sebebidir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "ISM Code 4 — Designated Person(s)",
              text: `Şirket, geminin emniyetli işletimini sağlamak ve gemi ile en üst düzey yönetim arasında bağlantı kurmak üzere kıyıda bir veya daha fazla yetkili kişi (DPA) atamalıdır. DPA'nın sorumluluğu, her geminin emniyet ve kirlilik önleme yönlerini izlemeyi ve yeterli kaynak/destek sağlanmasını kapsar.`,
            },
          ],
        },
        {
          subheading: "1.2 Overriding authority — SOLAS V/34-1 ve ISM 5.2",
          paragraphs: [
            `Overriding authority, kaptanın emniyet, koruma (security) ve deniz çevresinin korunması açısından gerekli gördüğü her kararı, şirket veya charterer'in talimatına bakmaksızın alma yetkisidir. ISM Code 5.2, şirketin SMS'inde bu yetkinin yazılı olarak teyit edilmesini şart koşar. Bu, kaptanı "şirketin emir kulu" olmaktan çıkarıp emniyetin nihai karar mercii yapar.`,
            `Bu yetki soyut bir hak değil, iletişim disiplinine bağlı bir araçtır. Kaptan overriding authority kullandığında bunu yalnızca "yapmıyorum" diyerek değil; gerekçeyi, alternatif planı ve riski yazılı olarak DPA'ya bildirerek kullanır. Şirketler ISM iç denetimlerinde bu yetkinin kullanım kayıtlarını inceler; hiç kullanılmamış olması bazen "korku kültürü" göstergesi olarak değerlendirilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Ticari baskı bir 'talimat' değildir",
              text: `Charterer ya da şirketin "bu hava ile devam et, ETA'yı kaçırma" baskısı bir tavsiyedir, emniyet kararını bağlamaz. Kaptan baskıyı log'a kaydeder, kararını gerekçelendirir ve DPA'ya bildirir. El Faro (2015) davası, ticari/zamansal baskının emniyet kararını ezmesinin 33 cana mal olduğunu gösterdi.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Raporlama Hatları ve Kanal Disiplini",
      lead: `Kaptanın etrafında birden çok taraf vardır; her birine ne, ne zaman ve hangi kanaldan bildirileceğini ayırt etmek temel beceridir.`,
      sections: [
        {
          subheading: "2.1 Kim, kime, neyi raporlar?",
          paragraphs: [
            `Emniyet/kirlilik/security olayları emniyet hattından (DPA) yürür; ticari konular (laytime, bunker, ETA, hız) operasyon/chartering hattından yürür. Kaptanın en sık yaptığı hata, emniyet olayını ticari hatta, ticari konuyu emniyet hattına karıştırmaktır. Bu karışıklık hem yanıt gecikmesine hem de hukuki kanıt zincirinin bozulmasına yol açar.`,
            `Resmi yazışmalar (port authority, flag state, klas, custom) genellikle acente üzerinden veya doğrudan kaptan imzasıyla yürür. Üçüncü taraflara (terminal, charterer'in surveyor'ı, müfettiş) yapılan her beyan, şirketi hukuken bağlayabileceği için ölçülü ve belgeli olmalıdır.`,
          ],
          table: {
            caption: `Tipik Raporlama Matrisi (Kim → Hangi Hat → Hangi Konu)`,
            headers: ["Konu", "Birincil Muhatap", "Kanal", "Aciliyet"],
            rows: [
              ["Çatışma / oturma / kirlilik", "DPA + Flag + P&I", "Telefon + yazılı", "Derhal (anında)"],
              ["Ağır hava sapması", "DPA + Charterer", "E-posta + log", "İlk fırsatta"],
              ["Bunker / ETA / laytime", "Operasyon / Chartering", "E-posta", "Rutin / günlük"],
              ["Yük talimatı çatışması", "DPA (emniyet ise)", "Yazılı + log", "Karar öncesi"],
              ["PSC / vetting bulgusu", "DPA + Teknik", "Rapor formu", "24 saat içinde"],
              ["Tıbbi acil (MEDEVAC)", "MRCC + DPA + Acente", "GMDSS + telefon", "Derhal"],
            ],
          },
        },
        {
          subheading: "2.2 Kayıt disiplini ve belge zinciri",
          paragraphs: [
            `Denizcilikte sözlü iletişim kanıt değildir. Kaptanın temel ilkesi: "söylediysen yaz, yazmadıysan söylememişsin sayılır." Her kritik iletişim; e-posta, log book, SOF (Statement of Facts), Letter of Protest veya telex ile kayda geçer. Telefon görüşmeleri özet olarak hemen e-postayla teyit edilir ("as per our telcon at 0930 LT...").`,
            `Belge zinciri ileride doğacak demurrage, off-hire, yük hasarı veya kaza ihtilaflarında kaptanı ve şirketi koruyan en güçlü savunmadır. Zaman damgaları (UTC ve LT birlikte), pozisyon, hava ve muhatap mutlaka belirtilir. Geriye dönük belge düzenlemek (back-dating) ise ağır disiplin ve hukuki suçtur; mahkemeler bunu tespit ettiğinde tüm kayıtların güvenilirliği çöker.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Teyit e-postası alışkanlığı",
              text: `Her önemli telefon görüşmesini 5 dakika içinde tek paragraflık bir e-posta ile teyit et. Bu basit alışkanlık, aylar sonra "kim ne dedi" tartışmasının tek nesnel kanıtı olur ve P&I avukatlarının ilk istediği şeydir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Charterer ile İlişki: Time vs Voyage Charter",
      lead: `Kaptanın charterer ile ilişkisinin sınırları, charter party tipine göre kökten değişir. Bu ayrımı bilmeden talimatları doğru yorumlamak imkânsızdır.`,
      sections: [
        {
          subheading: "3.1 Time charter — 'employment and agency' talimatları",
          paragraphs: [
            `Time charter'da (örn. NYPE, SHELLTIME) charterer gemiyi belirli bir süre için kiralar ve geminin ticari kullanımını (employment) yönlendirir. NYPE 8. madde uyarınca kaptan, charterer'in "as regards employment, agency or other arrangements" talimatlarına uymak zorundadır; ancak bu yükümlülük geminin emniyetli seyrini, navigation'ı ve kaptanın overriding authority'sini KAPSAMAZ. Charterer rotayı, limanı, hızı ticari olarak belirler; kaptan navigasyonel emniyetten sorumlu kalır.`,
            `Time charter'da "off-hire" (kira durması) kavramı kritiktir: gemi arıza, eksik mürettebat veya kaptan kusuru nedeniyle hizmet veremezse charterer kira ödemeyebilir. Bu yüzden kaptanın gecikme, makine arızası, deviation gibi durumları doğru ve zamanında raporlaması doğrudan şirketin gelirini etkiler. "Safe port / safe berth" garantisi de charterer'dadır; emniyetsiz liman talimatına kaptan itiraz eder ve Letter of Protest düzenler.`,
          ],
        },
        {
          subheading: "3.2 Voyage charter — owner kontrolü ve laytime",
          paragraphs: [
            `Voyage charter'da (örn. GENCON) armatör gemiyi belirli bir yükü A'dan B'ye taşımak için kiralar; ticari yönetim büyük ölçüde armatörde kalır. Burada kaptanın charterer ile ana teması NOR (Notice of Readiness), laytime ve demurrage etrafında döner. NOR'un geçerli verilmesi (gemi her bakımdan hazır, "in all respects ready") laytime sayacını başlatır; erken/geçersiz NOR demurrage davalarının başlıca konusudur.`,
            `Kaptan, voyage charter'da SOF'u (Statement of Facts) titizlikle tutar: NOR tendered/accepted saatleri, pilot on/off, all fast, hose connected, commenced/completed loading, weather stoppage, equipment breakdown. Demurrage/dispatch hesabı tamamen bu kayıtlardan yapılır. Charterer'in surveyor'ı ile imzalanan SOF'taki her "remark" ileride binlerce dolar fark yaratır.`,
          ],
          table: {
            caption: `Time vs Voyage Charter — Kaptan Açısından Farklar`,
            headers: ["Kriter", "Time Charter", "Voyage Charter"],
            rows: [
              ["Ticari yönetim", "Charterer (employment)", "Armatör"],
              ["Yakıt (bunker) maliyeti", "Charterer", "Armatör"],
              ["Ana belge", "Off-hire / log", "NOR + SOF + laytime"],
              ["Liman seçimi", "Charterer (safe port garantisi)", "C/P'de tanımlı"],
              ["Kaptanın ana teması", "Employment talimatları", "NOR / laytime / SOF"],
              ["Emniyet kararı", "Her zaman kaptanda", "Her zaman kaptanda"],
            ],
          },
        },
        {
          subheading: "3.3 Charterer talimatına 'hayır' demek",
          paragraphs: [
            `Charterer'in voyage instructions'ı (rota, hız, ECO speed, weather routing servisi, bunker limanı) ticari olarak bağlayıcıdır; ancak emniyeti tehlikeye atan hiçbir talimat bağlayıcı değildir. Kaptan emniyetsiz bir talimatla karşılaştığında: talimatı yazılı ister, gerekçeli reddini yazılı verir, alternatif önerir ve DPA'yı bilgilendirir. "Hayır" demek profesyonelce ve belgeli yapıldığında kaptanı korur; tartışmalı ve sözlü yapıldığında kaptanı yalnız bırakır.`,
            `Pratikte en sık çatışma "unsafe port / unsafe berth", "aşırı hız ile ETA tutturma" ve "deficient ekipmanla sefere devam" konularında çıkar. Kaptan bu durumlarda emniyeti önceler; ticari sonuç (off-hire, demurrage) şirketin avukatları ve charterer arasında çözülür, ama can ve gemi kaybı geri alınamaz.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka — 'Safe port' ihtilafı (The Eastern City prensibi)",
              text: `İngiliz içtihadında "safe port", geminin ilgili dönemde olağan deniz tehlikeleri dışında, iyi denizcilikle ulaşıp kullanıp ayrılabileceği limandır. Charterer emniyetsiz limana yönlendirirse ve kaptan itiraz etmeden girip hasar görürse, sorumluluk paylaşımı karmaşıklaşır. Kaptanın zamanında düzenlediği Letter of Protest, "safe port breach" iddiasının temel kanıtıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Acente (Agent) Koordinasyonu",
      sections: [
        {
          subheading: "4.1 Acentenin rolü ve kaptanın denetimi",
          paragraphs: [
            `Liman acentesi, gemiyi limanda temsil eden; pilot/tug ayarlayan, custom/immigration formalitelerini yürüten, ikmal (proviz, bunker, taze su), atık alımı, crew change ve evrak akışını koordine eden taraftır. Acente bazen armatör tarafından (owner's agent), bazen charterer tarafından (charterer's agent) atanır; bu ayrım menfaat çatışmalarında önemlidir. Charterer's agent ticari olarak charterer'e bağlı olduğundan kaptan, geminin/armatörün menfaatini korumak için kayıt disiplinini gevşetmemelidir.`,
            `Kaptan, acenteye pre-arrival mesajı ile ETA, draft, gross/net tonnage, son 10 liman, mürettebat listesi, atık miktarları, ikmal ihtiyaçları ve özel taleplerini (MEDEVAC, repatriation, spare parts) bildirir. Acentenin yaptığı tüm masrafların PDA/FDA (Proforma / Final Disbursement Account) ile şeffaf belgelenmesini ister; şüpheli kalemleri sorgular.`,
          ],
        },
        {
          subheading: "4.2 Liman formaliteleri ve FAL belgeleri",
          paragraphs: [
            `IMO FAL Convention (Convention on Facilitation of International Maritime Traffic) standart belgeleri tanımlar: General Declaration, Cargo Declaration, Ship's Stores Declaration, Crew's Effects, Crew List, Passenger List, Dangerous Goods ve Maritime Declaration of Health. Kaptan bu belgelerin doğruluğundan sorumludur; eksik/yanlış beyan custom cezası ve gecikme doğurur. 2024 itibarıyla birçok liman Maritime Single Window üzerinden elektronik beyan ister.`,
            `Kaptan, acente aracılığıyla yürütülse de FAL belgelerini bizzat imzaladığı için içeriğini kontrol etmelidir. Özellikle Ship's Stores ve Crew's Effects declarations'ta beyan edilmeyen tütün/alkol/nakit, ABD ve birçok ülkede ağır para cezası ("manifest violation") doğurur. Crew List'teki pasaport ve denizci cüzdanı bilgileri immigration için kritiktir.`,
          ],
        },
      ],
    },
    {
      heading: "5. Liman Otoriteleri ve Resmi Yazışmalar",
      sections: [
        {
          subheading: "5.1 Port State Control (PSC) iletişimi",
          paragraphs: [
            `PSC denetimleri (Paris MoU, Tokyo MoU, USCG vb.) sırasında kaptan, denetçinin tek resmi muhatabıdır. Açık, dürüst ve belgeli iletişim esastır; belge gizlemek veya yanıltmak detention'ı ağırlaştırır. Denetim sonunda düzenlenen Form A/B üzerindeki her deficiency kodlu olarak kayda geçer; "30 — detainable" kodu geminin tutulması demektir. Kaptan, bulguları derhal DPA ve teknik departmana raporlar; düzeltici faaliyet planını şirketle koordine eder.`,
            `Kaptan, haksız gördüğü bir detention'a karşı flag state ve şirket aracılığıyla itiraz (appeal) hakkını kullanabilir; ancak bu süreçte gemiyi denetçinin izni olmadan hareket ettirmek ağır ihlaldir. İtiraz da belge ve gerekçeyle yürür.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "Paris MoU / Tokyo MoU — PSC Yetkisi",
              text: `PSC, yabancı bayraklı gemilerin uluslararası sözleşmelere (SOLAS, MARPOL, MLC, STCW, Load Line) uygunluğunu denetler. "Clear grounds" varsa detaylı denetim yapılır. Detainable deficiency düzeltilene kadar gemi limandan ayrılamaz; bu karar denetçi/PSCO'nundur, kaptanın değil.`,
            },
          ],
        },
        {
          subheading: "5.2 Flag State, klas ve resmi bildirimler",
          paragraphs: [
            `Bayrak devleti idaresi (Flag State) ve klas kuruluşu (ABS, DNV, LR, BV, ClassNK vb.) ile iletişim; sertifika geçerliliği, sörvey planlaması, kondisyon raporları, kaza bildirimi (casualty report) ve damai (deficiency) konularında yürür. Ciddi kazada SOLAS I/21 ve MARPOL gereği kaptan, flag state'e zorunlu kaza bildirimi yapar. Bu bildirim ileride MAIB/IMO casualty investigation'ın temelini oluşturur.`,
            `Kaptan, sertifikaların (Safety Construction, Safety Equipment, Safety Radio, IOPP, ISM/SMC, ISSC, MLC/DMLC) geçerlilik tarihlerini ve sörvey pencerelerini takip eder; süresi dolan veya conditional sertifika PSC detention sebebidir. Klas sörveyörü ile iletişimde tespit edilen "condition of class" (CoC) maddeleri zamanında kapatılır.`,
          ],
        },
      ],
    },
    {
      heading: "6. Üçüncü Taraflar: Terminal, Surveyor, Vetting",
      sections: [
        {
          subheading: "6.1 Terminal ve Ship-Shore arayüzü",
          paragraphs: [
            `Terminal ile iletişim emniyet kritiktir. Tankerlerde ISGOTT'a göre berthing sonrası Ship-Shore Safety Checklist doldurulur ve her vardiya teyit edilir; pre-transfer conference'ta loading rate, max pressure, ESD (Emergency Shut Down) sinyali, communication failure prosedürü ve durdurma yetkisi netleşir. Kaptan, terminal temsilcisinin emniyetsiz talebine (örn. checklist tamamlanmadan transfer başlatma) overriding authority ile "hayır" der.`,
            `Bulk ve genel kargoda BLU Code (Code of Practice for the Safe Loading and Unloading of Bulk Carriers) çerçevesinde terminal ile yükleme planı, sıra ve rate üzerinde mutabakat sağlanır. Terminal'in aşırı yükleme hızı veya hatalı sıralaması mukavemet aşımı riski taşır; kaptan/1.Zabit bunu durdurma yetkisini terminal ile baştan netleştirir.`,
          ],
        },
        {
          subheading: "6.2 Vetting (SIRE/RightShip) ve surveyor iletişimi",
          paragraphs: [
            `Petrol/kimyasal tankerlerde OCIMF SIRE 2.0 inspection, kuru yükte RightShip inspection, geminin ticari hayatta kalması için belirleyicidir. Kaptan, vetting müfettişiyle profesyonel ve hazırlıklı iletişim kurar; observation'ları savunma yerine açıklama ve düzeltici faaliyetle karşılar. Vetting raporundaki negatif gözlemler charterer'in gemiyi reddetmesine (vetting rejection) yol açabilir; bu doğrudan şirket gelirini etkiler.`,
            `Cargo surveyor, draft surveyor, bunker surveyor ve P&I surveyor ile yapılan her ortak ölçüm/imza şirketi bağlayabilir. Kaptan, mutabık kalmadığı ölçüm veya beyana "for receipt only" / "under protest" şerhi düşer ve Letter of Protest düzenler. Surveyor'a verilen sözlü kabuller ileride aleyhe delil olabilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "İmza = sorumluluk",
              text: `Üçüncü tarafın önüne koyduğu hiçbir belgeyi okumadan imzalama. Draft survey, ullage report, damage report veya empty/clean sertifikası, charterer veya kargo sahibi lehine kanıt üretebilir. Anlaşmazlıkta "signed for receipt of document only, contents not agreed" şerhi düş.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. Kriz İletişimi ve Medya",
      sections: [
        {
          subheading: "7.1 Acil durumda iletişim sırası",
          paragraphs: [
            `Ciddi kazada (çatışma, oturma, yangın, kirlilik, can kaybı, korsanlık) iletişim sırası önceden ezberlenmiş olmalıdır: önce can güvenliği ve MRCC/MAYDAY, sonra DPA, sonra flag state ve P&I, sonra charterer ve acente. Şirketin Emergency Response Plan'i (ERP) tipik olarak bir Emergency Response Team (ERT) ve 24/7 hotline tanımlar. Kaptanın görevi sahadaki gerçeği hızlı, doğru ve abartısız aktarmak; spekülasyon yapmamaktır.`,
            `Kirlilik olayında SOPEP/SMPEP devreye girer; coastal state, liman otoritesi ve P&I derhal bilgilendirilir. ABD sularında OPA 90 gereği QI (Qualified Individual) ve OSRO bildirimi zaman kritiktir; gecikme cezayı katlar. Kaptan, ilk raporda "tahmini miktar, kaynak, alınan önlem, yardım ihtiyacı" çerçevesini kullanır.`,
          ],
        },
        {
          subheading: "7.2 Medya ve dış taraflara konuşmama disiplini",
          paragraphs: [
            `Kaza sonrası kaptan ve mürettebat, medyaya, sahil sörveyörlerine, karşı taraf avukatlarına veya sosyal medyaya açıklama YAPMAZ. Tüm dış iletişim şirketin atadığı sözcü ve P&I/avukatlar üzerinden yürür. Erken ve düşüncesiz bir cümle ("sanırım hız fazlaydı") ceza ve tazminat davasında aleyhe delil olur. Mürettebata bu disiplin önceden brifing ile anlatılır.`,
            `Kaptan, resmi soruşturma (flag, coastal, MAIB) ifadelerinde dürüst olur ancak hukuki danışman olmadan suç ikrarı niteliğindeki ifadelerden kaçınma hakkını bilir. Birçok ülkede kazada kaptanın kriminalize edilmesi (criminalization of seafarers) gerçek bir risktir; P&I "loss prevention" departmanı bu konuda hukuki destek sağlar.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Tek ağız ilkesi",
              text: `Krizde "tek ağız" ilkesi: gemi adına sadece kaptan, şirket adına sadece atanmış sözcü konuşur. Çok ağızlı iletişim çelişkili beyan üretir; çelişki, soruşturmada güvenilirliği yok eder ve sigorta savunmasını zayıflatır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "8. ISPS ve Güvenlik (Security) İletişimi",
      sections: [
        {
          subheading: "8.1 SSO, CSO ve security seviyeleri",
          paragraphs: [
            `ISPS Code çerçevesinde gemide Ship Security Officer (SSO), kıyıda Company Security Officer (CSO) bulunur. Kaptan, security konularında SSO ve CSO ile koordine olur; ancak ISPS açıkça belirtir ki güvenlik gerekçesi bile kaptanın emniyet ve security önceliğini ezemez. Security Level (1/2/3) flag/coastal state tarafından belirlenir; seviye değişimi derhal gemiye iletilir ve uygun önlemler (erişim kontrolü, devriye, restricted area) artırılır.`,
            `Ship Security Alert System (SSAS) tetiklendiğinde sinyal sessizce CSO ve flag state'e gider; köprüüstünde alarm çalmaz (korsanların fark etmemesi için). Kaptan, SSAS test ve aktivasyon prosedürünü, declaration of security (DoS) düzenleme koşullarını ve high risk area (HRA) geçiş raporlamasını (UKMTO, MSCHOA) bilir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "ISPS Part A/B + SOLAS XI-2",
              text: `Gemi, Ship Security Plan (SSP) ve geçerli ISSC taşımak zorundadır. Kaptanın güvenlikten sorumlu nihai otoritesi korunur; SOLAS XI-2/8, kaptanın emniyet/security kararının ticari çıkar tarafından kısıtlanamayacağını teyit eder.`,
            },
          ],
        },
        {
          subheading: "8.2 Korsanlık bölgesi koordinasyonu",
          paragraphs: [
            `Yüksek riskli bölgelerde (Aden Körfezi, Gine Körfezi, Singapur Boğazı yaklaşmaları) kaptan, BMP (Best Management Practices, güncel BMP5/MSCHOA) çerçevesinde UKMTO'ya raporlama, hardening önlemleri (razor wire, citadel, water hoses), grup transit/convoy ve gerekirse silahlı güvenlik ekibi (PCASP) koordinasyonu yürütür. Tüm bu koordinasyon CSO ve şirket ile önceden planlanır.`,
            `Korsan saldırısı anında iletişim sırası: UKMTO/MSCHOA, donanma, CSO/DPA, flag state. Kaptanın citadel'e çekilme kararı, mürettebatın hayatını korumanın en etkili yoludur; ancak citadel'in iletişim ve dayanıklılık kriterleri önceden test edilmelidir.`,
          ],
        },
      ],
    },
    {
      heading: "9. İletişim Araçları ve Kayıt Sistemleri",
      sections: [
        {
          subheading: "9.1 GMDSS, uydu ve VHF disiplini",
          paragraphs: [
            `Kaptanın iletişim altyapısı GMDSS (DSC, Inmarsat-C, MF/HF/VHF, EPIRB, SART) ve ticari uydu (FleetBroadband, VSAT, Starlink benzeri) sistemlerini kapsar. Distress, urgency ve safety trafiğinde doğru kanal ve prosedür hayati önemdedir: MAYDAY (distress), PAN-PAN (urgency), SECURITE (safety). VHF Ch16 dinleme nöbeti ve Ch13 (köprü-köprü manevra) disiplini denizde günlük rutindir.`,
            `Ticari e-posta ve uydu hattının ucuzlaması iletişimi kolaylaştırırken, "her şeyi anlık sorma" baskısı da yarattı. Kaptan, rutin ticari trafiği eco/store-forward sistemlerle, acil emniyet trafiğini gerçek zamanlı kanalla yönetir; iki trafiği karıştırmaz. Siber güvenlik açısından e-posta phishing ve sahte talimat (özellikle bunker/ödeme dolandırıcılığı) riskine karşı doğrulama yapar.`,
          ],
        },
        {
          subheading: "9.2 Log book, deck/engine kayıtları ve veri saklama",
          paragraphs: [
            `Resmi yevmiye (Official Log Book), deck log, bell book, GMDSS log, oil record book, garbage record book ve rest hours kayıtları kaptanın iletişim disiplininin yazılı omurgasıdır. Bu kayıtlar gemi ile dış dünya arasındaki "tek gerçek kaynak"tır ve PSC/vetting/sigorta tarafından her an istenebilir. VDR (Voyage Data Recorder) ise kaza sonrası en güvenilir kanıttır; kaza halinde VDR verisinin korunması (save/preserve) kaptanın ilk işlerindendir.`,
            `Kayıtların tutarlılığı kritiktir: deck log'daki pozisyon, ECDIS, GPS ve SOF birbiriyle çelişmemelidir. Çelişki, soruşturmada "kayıtlar güvenilmez" sonucunu doğurur ve sigorta savunmasını çökertir. Kaptan, periyodik olarak kayıtların tutarlılığını çapraz kontrol eder.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka — sahte 'master's instruction' dolandırıcılığı",
              text: `Son yıllarda armatör/charterer kimliğine bürünen e-postalarla sahte bunker ödeme talimatı veya rota değişikliği gönderilen vakalar arttı. Kaptan, alışılmadık her finansal/operasyonel talimatı bilinen ikinci kanaldan (telefon, doğrulanmış hat) teyit etmeden uygulamaz. Tek e-postaya güvenmek altı haneli kayıplara yol açtı.`,
            },
          ],
        },
      ],
    },
    {
      heading: "10. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "10.1 Kaptanın iletişim disiplini checklist'i",
          bullets: [
            `DPA iletişim bilgileri köprüüstünde güncel ve görünür mü? Tüm mürettebat DPA'yı tanıyor mu?`,
            `Emniyet trafiği DPA hattından, ticari trafik operasyon hattından mı yürüyor (karışmıyor mu)?`,
            `Charter party tipi (time/voyage) ve charterer talimatlarının sınırları net mi?`,
            `NOR geçerli mi, SOF eksiksiz ve karşı tarafça imzalı mı, remark'lar düşüldü mü?`,
            `Emniyetsiz talimata yazılı itiraz + Letter of Protest + DPA bildirimi yapıldı mı?`,
            `Her kritik telefon görüşmesi e-posta ile teyit edildi mi (zaman/pozisyon damgalı)?`,
            `FAL belgeleri (crew list, stores/effects declaration) doğru ve eksiksiz mi?`,
            `PSC/vetting bulguları 24 saat içinde DPA ve teknik departmana raporlandı mı?`,
            `Acil durum iletişim sırası (MRCC→DPA→Flag/P&I→Charterer/Acente) ezberli mi?`,
            `Medya/dış taraf konuşma yasağı mürettebata brifing edildi mi? Tek ağız ilkesi uygulanıyor mu?`,
            `Şüpheli finansal/operasyonel talimatlar ikinci kanaldan doğrulanıyor mu?`,
          ],
          paragraphs: [
            `Kaptanın iletişim becerisi, "kibar yazışma" değil, doğru muhataba doğru zamanda doğru mesajı belgeli biçimde iletme disiplinidir. DPA hattını canlı tutmak, charterer baskısını profesyonelce yönetmek, üçüncü taraflara karşı imza ve beyan disiplinini korumak; kaptanı hem hukuken hem emniyet açısından korur. Unutulmaması gereken ilke şudur: ticari baskı geçicidir, ama kötü yönetilen bir iletişimin doğurduğu kaza ve hukuki sonuç kalıcıdır. Bilge kaptan, "evet" demenin kolay olduğu anlarda bile, emniyetin gerektirdiği "hayır"ı gerekçeli ve belgeli biçimde söyleyebilen kişidir.`,
          ],
        },
      ],
    },
  ],
};

export default content;
