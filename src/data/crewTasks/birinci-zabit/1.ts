import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Stabilite ve trim kontrolü",
  roleSlug: "birinci-zabit",
  taskIndex: 1,
  estimatedPages: 25,
  intro: `Birinci Zabit, geminin her yükleme/boşaltma kademesinde ve tüm sefer boyunca yeterli intact stabilite ve gövde mukavemeti içinde kalmasını güvence altına alan kişidir. GM, trim, bending moment ve shear force değerlerinin onaylı stabilite booklet ve loading manual limitleri içinde tutulması; ballast operasyonlarının BWMP çerçevesinde planlanması ve free surface, list ile parametric rolling gibi tehlikelerin yönetilmesi bu görevin özüdür. Bu bölüm, stabilite hesabının teorisinden saha uygulamasına kadar Birinci Zabit'in metodolojisini açıklar.`,
  sources: [
    "IS Code 2008 — International Code on Intact Stability",
    "SOLAS Chapter II-1 — Subdivision and Stability",
    "MSC.1/Circ.1228 — Guidance on Dangerous Situations in Following/Quartering Seas",
    "BWM Convention 2004 — D-1/D-2 Standards",
    "IMO Loading Manual & Stability Booklet (klas onaylı)",
    "Derrett — Ship Stability for Masters and Mates",
    "IACS UR S — Strength Requirements",
    "Code of Safe Practice for Cargo Stowage and Securing (CSS Code)",
  ],
  chapters: [
    {
      heading: "1. Stabilite Temelleri ve Onaylı Dokümanlar",
      lead: `Stabilite yönetimi, gemiye özgü onaylı dokümanların doğru okunmasıyla başlar.`,
      sections: [
        {
          subheading: "1.1 Stabilite booklet ve loading manual",
          paragraphs: [
            `Her gemi, klas/bayrak devleti onaylı bir Stability Booklet ve Loading Manual taşımak zorundadır. Bu dokümanlar; hydrostatic tablolar, cross curves (KN values), tank kapasite tabloları, free surface moment değerleri, allowable bending moment/shear force zarfları ve standart yükleme durumlarını (departure full load, arrival ballast vb.) içerir. Birinci Zabit, fiili yükleme durumunu bu standart koşullarla karşılaştırarak emniyet payını sürekli izler.`,
            `Loading instrument (LoadMaster, Cargomax, BluePrint vb.) bu verilerle kalibre edilir ve her yıl klas tarafından doğrulanır. Cihaz arızalansa bile Birinci Zabit, hydrostatic tablolar ve KN değerleriyle elle GZ eğrisi çıkarabilmelidir; PSC denetiminde bu yeterlilik sorgulanabilir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS II-1/5-1",
              text: `Kaptana, geminin tüm yükleme koşullarında stabilitesini değerlendirebileceği onaylı bilgi sağlanmalıdır. Loading instrument bu bilgiyi destekler ancak onaylı booklet'in yerini almaz.`,
            },
          ],
        },
        {
          subheading: "1.2 GZ eğrisi ve IS Code kriterleri",
          paragraphs: [
            `Intact stabilite, GZ (righting arm) eğrisinin IS Code 2008 kriterlerini sağlamasıyla doğrulanır: 30°'de GZ ≥ 0.20 m, maksimum GZ açısı ≥ 25° (tercihen 30°), 0-30° arası alan ≥ 0.055 m·rad, 0-40° arası alan ≥ 0.090 m·rad ve initial GM ≥ 0.15 m. Weather criterion (severe wind and rolling) ise rüzgâr ve yalpa altında geminin devrilmeye karşı direncini ölçer.`,
            `Birinci Zabit, free surface correction (FSC) sonrası "fluid GM" değeriyle çalışır; nominal GM değil. Kısmen dolu tanklar GM'yi sanal olarak düşürür ve bu etki büyük tanklarda metrelerce GZ kaybına yol açabilir.`,
          ],
          table: {
            caption: `IS Code 2008 — Genel Intact Stabilite Kriterleri`,
            headers: ["Kriter", "Minimum Değer"],
            rows: [
              ["GM0 (düzeltilmiş)", "≥ 0.15 m"],
              ["GZ @ 30°", "≥ 0.20 m"],
              ["Maks. GZ açısı", "≥ 25° (tercih 30°)"],
              ["Alan 0°-30°", "≥ 0.055 m·rad"],
              ["Alan 0°-40°", "≥ 0.090 m·rad"],
              ["Alan 30°-40°", "≥ 0.030 m·rad"],
            ],
          },
        },
      ],
    },
    {
      heading: "2. GM Yönetimi: Stiff ve Tender Denge",
      sections: [
        {
          subheading: "2.1 Aşırı yüksek GM (stiff ship)",
          paragraphs: [
            `Çok yüksek GM, kısa ve sert yalpa periyodu (T = 2π·k/√(g·GM)) üretir. Bu durum container yığınlarında ve lashing ekipmanında ataletsel kuvvetleri büyütür, mürettebatta yorgunluk ve yaralanma riskini artırır. Stiff gemi konforsuzdur ve yük emniyeti açısından tehlikelidir.`,
            `Birinci Zabit, ağır yükü mümkün olduğunca yukarıya dağıtarak veya double bottom ballast'ı azaltarak GM'yi makul aralığa çeker; ancak bunu yaparken intact stabilite minimumlarının altına inmemeye dikkat eder.`,
          ],
        },
        {
          subheading: "2.2 Aşırı düşük GM (tender ship)",
          paragraphs: [
            `Düşük GM, uzun ve yavaş yalpa periyodu verir; konforlu görünse de küçük bir off-center yük veya rüzgâr kalıcı bir liste yol açar ve dalga periyoduyla rezonansa girerek tehlikeli yalpa açıları üretebilir. Tender gemi, ani serbest yüzey artışına (örn. tank patlaması, hold flooding) karşı çok kırılgandır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Yalpa periyodu ile GM tahmini",
              text: `GM ≈ (f·B / T)²  formülüyle, gözlemlenen yalpa periyodu T ve genişlik B'den yaklaşık GM tahmin edilebilir (f ≈ 0.78-0.80). Cihaz arızasında hızlı kontrol için kullanışlıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Trim Hesabı ve Optimizasyonu",
      sections: [
        {
          subheading: "3.1 Trim, draft ve MCTC",
          paragraphs: [
            `Trim, FP ve AP draftları arasındaki farktır. Bir ağırlığın eklenmesi/kaydırılması sonucu trim değişimi, trimming moment / MCTC (Moment to Change Trim 1 cm) ile hesaplanır. Birinci Zabit, her loading kademesinde forward/aft draftı tahmin eder ve fiili gözlemle (draft survey) karşılaştırır.`,
            `Even keel veya hafif by-stern trim genellikle hidrodinamik açıdan tercih edilir. Modern gemilerde trim optimization yazılımları, belirli hız ve draft için en düşük direnci veren trimi bularak %2-5 yakıt tasarrufu sağlar.`,
          ],
        },
        {
          subheading: "3.2 List (yan yatma) kontrolü",
          paragraphs: [
            `List, transverse ağırlık dengesizliğinden veya negatif GM'den kaynaklanır. Birinci Zabit, listi ballast transferi ile düzeltirken önce nedeni teşhis eder: dengesiz yük mü, free surface mu, yoksa negatif GM mi? Negatif GM kaynaklı liste (loll), ballast'ı yanlış tarafa almakla tehlikeli şekilde kötüleşebilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Angle of loll",
              text: `Negatif GM nedeniyle gemi bir tarafa "loll" yapıyorsa, alçak taraftaki tankı doldurmak gemiyi karşı tarafa devirebilir. Önce simetrik low tankları doldurarak GM pozitife çekilir, sonra liste düzeltilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Gövde Mukavemeti: Bending Moment ve Shear Force",
      sections: [
        {
          subheading: "4.1 Longitudinal strength ve loading sequence",
          paragraphs: [
            `Loading instrument, her kademede longitudinal bending moment ve shear force değerlerini izin verilen zarfın yüzdesi olarak gösterir. %85 üzeri alarm bölgesidir; %100 aşımı yapısal hasar riski demektir. Bulk carrier'larda alternate hold loading sırasında shear force kritik perde bölgelerinde tepe yapar; bu nedenle yalnızca onaylı sıraya uyulur.`,
            `Sagging (orta çökme) ve hogging (orta kalkma) durumları gövdede çevrimsel gerilim yaratır ve uzun vadede yorulma çatlaklarına yol açar. Liman içinde de seferdeki gibi limitlere uyulmalıdır; özellikle kısmen yüklü ara durumlar gözden kaçabilir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "MOL Comfort (2013)",
              text: `8000 TEU container gemisi Hint Okyanusu'nda ortadan ikiye ayrıldı. Soruşturma; gerçek bükülme momentlerinin tasarım tahminlerini aşmış olabileceğine ve loading dağılımının payını işaret etti. Strength limitlerine kâğıt üzerinde değil, fiilen uyulmalıdır.`,
            },
          ],
        },
        {
          subheading: "4.2 Torsion ve lokal yükler",
          paragraphs: [
            `Açık güverteli container gemilerinde torsiyon (burulma) momenti de izlenir; köşegen ağırlık dağılımı ve quartering sea koşulları torsiyonu büyütür. Ayrıca tank top strength, hatch cover load ve container stack/corner casting limitleri lokal mukavemet kontrolünün parçasıdır.`,
          ],
        },
      ],
    },
    {
      heading: "5. Free Surface Etkisi ve Tank Yönetimi",
      sections: [
        {
          subheading: "5.1 Free surface moment ve slack tank",
          paragraphs: [
            `Kısmen dolu (slack) tanklardaki sıvının serbest yüzeyi, yalpa sırasında ağırlık merkezini hareket ettirir ve sanal olarak GM'yi düşürür. Free surface etkisi tank genişliğinin küpüyle orantılıdır; bu yüzden geniş tanklar en tehlikelidir. Birinci Zabit, mümkün oldukça tankları ya tam dolu ya tam boş ("pressed up" veya "empty") tutarak slack tank sayısını minimize eder.`,
          ],
          table: {
            caption: `Free Surface Kontrol Öncelikleri`,
            headers: ["Tank durumu", "FSC etkisi", "Önerilen aksiyon"],
            rows: [
              ["Tam dolu (pressed up)", "Yok", "Tercih edilen"],
              ["Tam boş", "Yok", "Tercih edilen"],
              ["Kısmen dolu (slack)", "Yüksek", "Sayıyı azalt, küçük tank seç"],
              ["Geniş slack tank", "Çok yüksek", "Mümkünse kaçın"],
            ],
          },
        },
        {
          subheading: "5.2 Ardışık tank operasyonu",
          paragraphs: [
            `Ballast değişimi veya yakıt transferinde Birinci Zabit, aynı anda birden fazla geniş tankı slack durumda tutmaktan kaçınır; tankları sırayla doldurur/boşaltır. Bu, hem free surface'i hem de transfer sırasındaki list/trim sapmalarını kontrol altında tutar.`,
          ],
        },
      ],
    },
    {
      heading: "6. Ballast Operasyonları ve BWM Uyumu",
      sections: [
        {
          subheading: "6.1 Ballast planı ve mukavemet",
          paragraphs: [
            `Ballast operasyonu, yük operasyonuyla senkronize planlanır: yük geldikçe ballast basılır, yük gittikçe ballast alınır; böylece draft, trim, GM ve strength sürekli limitler içinde kalır. Birinci Zabit, ballast pompalama hızını yükleme hızıyla eşleştirir ve her kademede draftı doğrular.`,
            `Yanlış ballast yönetimi; aşırı shear force, hold flooding görünümü veya tehlikeli list yaratabilir. Bu nedenle ballast planı yazılı olarak hazırlanır ve duty officer'la paylaşılır.`,
          ],
        },
        {
          subheading: "6.2 D-1 exchange ve D-2 treatment",
          paragraphs: [
            `BWM Convention, ballast suyunun aktarılan limanın ekosistemini koruması için D-1 (ballast water exchange — açık denizde >200 nm, >200 m derinlik) veya D-2 (treatment — onaylı BWMS ile biyolojik standart) uyumluluğu ister. Çoğu gemi artık D-2 için type-approved BWMS (UV, electrochlorination vb.) taşır.`,
            `Birinci Zabit; BWMS operasyonunu, sampling port erişimini ve Ballast Water Record Book (BWRB) doğruluğunu denetler. Exchange yapılan açık deniz operasyonlarında stabilite ve strength, ara (intermediate) durumlar için ayrıca kontrol edilir; flow-through yöntemi tank overflow ile yapılır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "BWM Convention — Reg. B-2 / D-2",
              text: `Her gemi onaylı bir Ballast Water Management Plan ve güncel BWRB taşımalıdır. PSC denetiminde BWMS çalışırlığı ve kayıtlar sıkça kontrol edilir; uyumsuzluk detention sebebidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. Dinamik Tehlikeler: Parametric ve Synchronous Rolling",
      sections: [
        {
          subheading: "7.1 Parametric rolling",
          paragraphs: [
            `Parametric rolling, baş/kıç dalgalarda geminin su hattındaki form değişiminin yalpa restoring momentini periyodik değiştirmesiyle oluşur; özellikle head/following seas'te dalga periyodu yalpa periyodunun yarısına yaklaştığında hızla büyür. Container gemilerinde ani 30-40° yalpa açılarına ve toplu container kaybına yol açabilir.`,
            `Birinci Zabit, weather routing ile birlikte GM'yi rezonanstan kaçıracak şekilde ayarlamayı, hız/rota değişimini ve lashing tightness'ı kaptanla koordine eder. Tehlike farkında olmak ilk savunmadır.`,
          ],
          callouts: [
            {
              type: "example",
              title: "APL China (1998) / ONE Apus (2020)",
              text: `Her iki olayda da parametric/dinamik rolling yüzlerce-binlerce container kaybına neden oldu. Ders: dinamik stabilite, statik GZ kriterlerini sağlamakla bitmez; sefer planında dalga rezonansı hesaba katılmalıdır.`,
            },
          ],
        },
        {
          subheading: "7.2 Following/quartering seas ve loss of stability",
          paragraphs: [
            `Following ve quartering denizlerde dalga tepesi gemi ortasındayken righting arm geçici olarak azalır; broaching ve loss of stability riski doğar. MSC.1/Circ.1228, kaptana hız/rota seçiminde pratik rehber sunar. Birinci Zabit, yük dağılımı ve GM seçimiyle bu riskleri operasyonel olarak destekler.`,
          ],
        },
      ],
    },
    {
      heading: "8. Damage Stability ve Acil Durum",
      sections: [
        {
          subheading: "8.1 Subdivision ve probabilistik damage stability",
          paragraphs: [
            `SOLAS II-1, çarpışma/oturma sonrası bölmeli su geçirmezlik ve damage stability için attained subdivision index A ≥ required index R kriterini getirir. Birinci Zabit, su geçirmez kapı/menhol durumlarını ve yükleme koşulunun damage control plan ile uyumunu izler.`,
            `Damage Control Plan ve booklet, her su geçirmez bölmenin floodability'sini gösterir. Hasar anında Birinci Zabit, cross-flooding ve counter-ballast kararlarını bu dokümana göre alır.`,
          ],
        },
        {
          subheading: "8.2 Stabilite kaybında durdurma kararı",
          paragraphs: [
            `GM, GZ veya strength değerleri limitlere yaklaştığında Birinci Zabit operasyonu durdurma yetkisine ve sorumluluğuna sahiptir. "Charterer baskısı" stabilite emniyetini geçersiz kılamaz. Her durdurma kararı ve gerekçesi kayıt altına alınır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Operasyonu durdurma yetkisi",
              text: `Stabilite/mukavemet sınırı aşılma riskinde Birinci Zabit operasyonu derhal durdurur ve kaptanı bilgilendirir. Geç müdahale, listing veya yapısal hasarla sonuçlanabilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "9. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "9.1 Her kademede stabilite kontrol listesi",
          bullets: [
            `Loading instrument kalibre ve onaylı booklet ile uyumlu mu?`,
            `Düzeltilmiş (fluid) GM tüm kademelerde IS Code minimumunun üzerinde mi?`,
            `Bending moment / shear force / torsion %100 limitinin altında mı (%85 alarm)?`,
            `Slack tank sayısı minimize edildi mi, geniş slack tank var mı?`,
            `Trim hedefe uygun, list < 0.5° mü?`,
            `Ballast planı yazılı ve BWRB güncel mi?`,
            `Parametric/following sea riski sefer planında değerlendirildi mi?`,
            `Damage control plan ve su geçirmez kapatma durumu kontrol edildi mi?`,
            `Her kademe çıktısı saklandı mı (PSC/vetting talep edebilir)?`,
          ],
          paragraphs: [
            `Stabilite ve trim kontrolü, Birinci Zabit'in en az affedilen sorumluluğudur: hata anlık değil kademeli birikir ve genellikle yalnızca en kötü anda görünür hâle gelir. Her kademede yazılı doğrulama, çapraz kontrol ve mevzuat bilgisi, geminin tek gerçek savunma hattıdır.`,
          ],
        },
      ],
    },
  ],
};

export default content;
