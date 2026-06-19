import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Makine sistemlerini tanıma ve öğrenme",
  roleSlug: "makine-stajyer",
  taskIndex: 2,
  estimatedPages: 26,
  intro: `Makine stajyeri; ana makine, yardımcı makineler (jeneratörler), kazan, hava kompresörleri, separator/purifier, pompalar, ısı değiştiriciler ve boru/valf sistemlerini sistematik olarak öğrenir. Bu öğrenme; piping diagram (sistem şeması) okumayı, ekipman lokasyonlarını fiziksel olarak belirlemeyi, her sistemin çalışma prensibini, emniyet cihazlarını ve alarm noktalarını tanımayı içerir. Amaç, makine dairesini parçalar yığını olarak değil, birbiriyle ilişkili sistemler bütünü olarak kavramaktır. Bu bölüm, stajyerin makine sistemlerini katmanlı ve mantıksal biçimde öğrenmesi için bir çerçeve sunar.`,
  sources: [
    "STCW Code Table A-III/1 — Marine engineering knowledge",
    "SOLAS Chapter II-1 — Machinery installations & safety devices",
    "MAN B&W / Wärtsilä Engine Operation Manuals (OEM)",
    "Class rules for machinery (IACS UR M series)",
    "Reeds Vol 8/12 — General Engineering & Motor Engineering",
    "IMO Model Course 7.04 — Engineering knowledge",
    "Pounder's Marine Diesel Engines and Gas Turbines",
    "Ship's Piping & System Diagrams (P&ID) reading guides",
  ],
  chapters: [
    {
      heading: "1. Makine Dairesini Sistem Olarak Düşünmek",
      lead: `Makine dairesi, birbirini besleyen sistemlerden oluşur. Stajyer, "ekipman ezberi" yerine "sistem mantığı" kurmayı öğrenmelidir.`,
      sections: [
        {
          subheading: "1.1 Sistem yaklaşımı: girdi-süreç-çıktı",
          paragraphs: [
            `Her makine sistemi bir girdi alır, dönüştürür ve çıktı verir. Ana makine yakıt enerjisini şaft gücüne çevirir; yakıt sistemi onu besler, yağlama sistemi sürtünmeyi azaltır, soğutma sistemi ısıyı atar, hava sistemi yanmayı sağlar. Stajyer bu bağlantıları kurarak makine dairesini bütünsel anlar.`,
            `Bir sistem arızalandığında etkisi diğerlerine yayılır: soğutma yetersizse yağ incelir, yağ basıncı düşer, bearing zarar görür, makine durur. Stajyer bu zincir bağımlılıkları öğrenerek arıza teşhisi mantığının temelini atar.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Her sistemi üç soruyla öğren",
              text: `Stajyer her sistemi öğrenirken sormalı: (1) Bu sistemin amacı ne? (2) Akışkanı nereden alıp nereye veriyor? (3) Arızalanırsa ne olur ve hangi emniyet cihazı korur? Bu üç soru, ezber yerine anlam üretir.`,
            },
          ],
        },
        {
          subheading: "1.2 Ekipman lokasyonlarının haritalanması",
          paragraphs: [
            `Stajyer, makine dairesini fiziksel olarak gezerek her ekipmanın yerini belleğine yerleştirir: ana makine, jeneratör flatı, kazan, purifier room, pompa platformu, kompresör, switchboard room, steering gear room, separator ve tank lokasyonları. Acil bir durumda doğru ekipmana hızlı ulaşmak hayati olabilir.`,
            `Lokasyon öğrenimi, General Arrangement çizimi ile sahayı eşleştirerek pekiştirilir. Stajyer "çizimde gördüğümü sahada bulabilmek" becerisini geliştirir; bu, gerçek bir mühendislik yetkinliğidir.`,
          ],
        },
      ],
    },
    {
      heading: "2. Ana Makine (Main Engine)",
      sections: [
        {
          subheading: "2.1 İki zamanlı düşük devirli dizel prensibi",
          paragraphs: [
            `Büyük ticari gemilerin çoğu, doğrudan pervaneye bağlı iki zamanlı, düşük devirli, crosshead tipi dizel makine kullanır. Stajyer; emme (scavenging), sıkıştırma, yanma (genleşme) ve egzoz aşamalarını, uniflow scavenging mantığını ve crosshead'in piston yan kuvvetini nasıl ayırdığını öğrenir.`,
            `Ana makinenin alt sistemleri birbirine bağlıdır: fuel injection, scavenge air (turbocharger + air cooler), jacket cooling water, piston/crosshead LO, cylinder lubrication ve exhaust. Stajyer her alt sistemin makinenin sağlıklı çalışmasına katkısını öğrenir.`,
          ],
          table: {
            caption: `Ana Makine Alt Sistemleri ve İşlevleri`,
            headers: ["Alt sistem", "İşlevi", "Kritik parametre"],
            rows: [
              ["Fuel injection", "Yakıtı doğru zamanda püskürtme", "Visc., timing, basınç"],
              ["Scavenge air", "Yanma havası temini", "Scavenge pressure, T/C RPM"],
              ["Jacket cooling", "Silindir/cover soğutma", "Inlet/outlet temp"],
              ["Piston cooling", "Piston tepesi soğutma", "Outlet temp, flow"],
              ["Cylinder lub.", "Liner yağlama", "Feed rate (g/kWh)"],
              ["Exhaust", "Yanmış gaz tahliyesi + T/C tahriki", "Exh. gas temp deviation"],
            ],
          },
        },
        {
          subheading: "2.2 Emniyet cihazları ve koruma sistemleri",
          paragraphs: [
            `Ana makine; overspeed trip, LO low pressure shut-down, jacket water high temp slow-down, oil mist detector ve scavenge fire alarm gibi çok katmanlı korumalarla donatılmıştır. Stajyer her korumanın neyi engellediğini öğrenir: overspeed trip yük kaybında makinenin parçalanmasını, OMD krank kasası patlamasını önler.`,
            `Crankcase relief valve (patlama kapağı) ve turning gear interlock (turning gear takılıyken çalıştırmayı engelleme) gibi mekanik korumalar da vardır. Stajyer bu cihazların asla bypass edilmemesi gerektiğini öğrenir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Koruma cihazı bypass edilmez",
              text: `Emniyet cihazlarını (overspeed, OMD, low LO pressure trip) "rahatsız ediyor" diye devre dışı bırakmak felakettir. Bu cihazlar makineyi ve mürettebatı korur; arızalı bir koruma onarılır, devre dışı bırakılmaz.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Yardımcı Makineler (Jeneratörler)",
      sections: [
        {
          subheading: "3.1 Dizel jeneratör ve elektrik üretimi",
          paragraphs: [
            `Gemi elektriği, dört zamanlı orta devirli dizel jeneratörlerden sağlanır. Stajyer; jeneratörlerin paralel çalışması, yük paylaşımı (load sharing), senkronizasyon ve preferential trip (aşırı yükte düşük öncelikli tüketicileri devre dışı bırakma) mantığını öğrenir.`,
            `Şaft jeneratörü (PTO) ve emergency generator da elektrik kaynağıdır. Stajyer, normal, manevra ve acil durumda elektrik kaynağının nasıl yönetildiğini ve blackout riskini önlemek için neden yeterli jeneratörün paralelde tutulduğunu öğrenir.`,
          ],
        },
        {
          subheading: "3.2 Jeneratör emniyeti ve alarm noktaları",
          paragraphs: [
            `Jeneratör; reverse power, over-current, over/under-voltage, over/under-frequency korumalarına sahiptir. Stajyer bu korumaların elektrik sistemini ve jeneratörü nasıl koruduğunu öğrenir. Ayrıca soğutma suyu, yağ basıncı ve egzoz sıcaklığı alarmları motor tarafını korur.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "İlgili bölüm: Acil sistemler",
              text: `Blackout senaryosu, emergency generator devreye girmesi ve dead-ship recovery için "Acil sistemler ve test eğitimi" bölümüne bakınız.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Kazan ve Buhar Sistemi",
      sections: [
        {
          subheading: "4.1 Auxiliary boiler ve exhaust gas economizer",
          paragraphs: [
            `Auxiliary (oil-fired) boiler, port'ta ve düşük yükte buhar üretir; exhaust gas economizer ise denizde ana makine egzoz ısısından buhar üretir (atık ısı geri kazanımı). Buhar; yakıt/yağ ısıtma, tank ısıtma ve genel ihtiyaçlar için kullanılır. Stajyer iki kaynağın birbirini nasıl tamamladığını öğrenir.`,
            `Su seviyesi kontrolü buhar kazanlarında hayatidir: düşük su seviyesi (low water) kazan hasarına ve patlamaya yol açabilir. Stajyer gauge glass okuma, su seviyesi alarmı ve otomatik feed water kontrolünü öğrenir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Kazan low-water riski",
              text: `Buhar kazanında düşük su seviyesi, sıcak yüzeylere su temasının kesilmesiyle metal aşırı ısınması ve katastrofik patlamaya yol açabilir. Low-water cut-off ve seviye alarmları asla bypass edilmez; gauge glass düzenli blow-down ile kontrol edilir.`,
            },
          ],
        },
        {
          subheading: "4.2 Buhar sistemi emniyet cihazları",
          paragraphs: [
            `Safety valve (emniyet supabı), kazan basıncını sınırlar; aşırı basınçta açar ve buhar tahliye eder. Stajyer safety valve'in ayar basıncı (set pressure) ve periyodik test gerekliliğini öğrenir. Pressure gauge, water level controller ve flame failure cihazı da kazan emniyetinin parçalarıdır.`,
          ],
        },
      ],
    },
    {
      heading: "5. Hava Kompresörü ve Basınçlı Hava Sistemi",
      sections: [
        {
          subheading: "5.1 Starting air ve kontrol havası",
          paragraphs: [
            `Ana makine basınçlı hava ile çalıştırılır (starting air, genelde ~30 bar). Hava kompresörleri air bottle'ları (hava şişeleri) doldurur. Ayrıca kontrol havası (control/service air) pnömatik sistemleri besler. Stajyer iki hava sisteminin farkını ve neden ayrı tutulduğunu öğrenir.`,
            `Hava şişelerinin doluluğu kritiktir: yeterli başlatma havası olmadan makine çalıştırılamaz veya manevra kabiliyeti kaybedilir. Stajyer şişe basıncını izlemeyi ve kompresörlerin otomatik dolum mantığını öğrenir.`,
          ],
        },
        {
          subheading: "5.2 Emniyet cihazları ve drain disiplini",
          paragraphs: [
            `Hava şişeleri ve kompresörler safety valve ile korunur; fusible plug (eriyen tapa) aşırı sıcaklıkta hava tahliyesi sağlar. Drain (su atma) düzenli yapılmazsa yoğuşan su korozyona ve yağ-su karışımı patlamasına neden olabilir. Stajyer drain rutininin önemini öğrenir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka: Air bottle patlaması",
              text: `Drain edilmeyen hava şişesinde biriken yağ-su karışımı, sıkıştırma ısısıyla tutuşarak şişe patlamasına yol açabilir. Düzenli drain ve fusible plug bütünlüğü bu nadir ama ölümcül riski önler. Stajyer drain'i "küçük iş" değil emniyet görevi olarak öğrenir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Pompa ve Boru Sistemleri",
      sections: [
        {
          subheading: "6.1 Pompa tipleri ve sistem rolleri",
          paragraphs: [
            `Makine dairesinde santrifüj (cooling water, ballast), pozitif deplasmanlı (FO/LO transfer, vidalı/dişli) ve eccentric screw (sludge) pompalar bulunur. Stajyer hangi sistemde hangi pompa tipinin kullanıldığını ve neden (basınç/akış/viskozite ihtiyacına göre) öğrenir.`,
            `Pompa sistemleri yedekli (duty/standby) tasarlanır; bir pompa arızalanırsa standby otomatik veya manuel devreye girer. Stajyer auto-start mantığını ve neden kritik servislerde yedeklilik olduğunu öğrenir.`,
          ],
        },
        {
          subheading: "6.2 Boru renk kodları ve hat takibi",
          paragraphs: [
            `Boru hatları renk kodlarıyla işaretlenir (akışkan tipine göre) ve akış yönü oklarla gösterilir. Stajyer boru hattını fiziksel olarak takip ederek (line tracing) bir sistemin kaynaktan tüketiciye yolunu öğrenir; bu, valf alignment ve arıza izolasyonu için temel beceridir.`,
          ],
          table: {
            caption: `Tipik Boru Hattı Renk Kodları (Genel Kılavuz)`,
            headers: ["Akışkan", "Tipik renk", "Sistem"],
            rows: [
              ["Sea water", "Yeşil", "Soğutma, ballast"],
              ["Fresh water", "Mavi", "Jacket cooling, domestic"],
              ["Fuel oil", "Kahverengi", "FO/DO besleme"],
              ["Lub oil", "Sarı", "LO sirkülasyon"],
              ["Steam", "Gümüş/gri", "Buhar hattı"],
              ["Bilge", "Siyah", "Bilge/sintine"],
            ],
          },
        },
      ],
    },
    {
      heading: "7. Isı Değiştiriciler ve Soğutma Sistemi",
      sections: [
        {
          subheading: "7.1 Merkezi soğutma (central cooling) prensibi",
          paragraphs: [
            `Modern gemiler merkezi soğutma sistemi kullanır: deniz suyu (low temp sea water), bir merkezi cooler üzerinden tatlı su devresini soğutur; tatlı su (LT/HT fresh water) ise makine ve yardımcı ekipmanları soğutur. Bu, deniz suyunun korozif etkisini ekipmanlardan uzak tutar. Stajyer LT ve HT devrelerinin farkını öğrenir.`,
            `Plate ve shell-and-tube tipi ısı değiştiriciler kullanılır. Stajyer, fouling (tıkanma/birikme) nedeniyle soğutma veriminin düştüğünü, diferansiyel basınç ve sıcaklık farkının izlenerek temizlik zamanının belirlendiğini öğrenir.`,
          ],
        },
        {
          subheading: "7.2 Termostatik kontrol ve sıcaklık yönetimi",
          paragraphs: [
            `Three-way thermostatic valve, soğutma akışını ayarlayarak motor sıcaklığını optimum tutar. Çok soğuk çalışma (özellikle düşük yükte) da aşınma ve sülfürik asit korozyonu açısından zararlıdır. Stajyer "yeterince sıcak ama aşırı değil" dengesini öğrenir.`,
          ],
        },
      ],
    },
    {
      heading: "8. Separator, Purifier ve Yakıt Hazırlama",
      sections: [
        {
          subheading: "8.1 Yakıt ve yağ saflaştırma zinciri",
          paragraphs: [
            `Ağır yakıt (HFO) makineye girmeden önce settling tank → purifier → service tank zincirinden geçer; su ve katı tortu ayrılır, ısıtılır ve viskozite ayarlanır. Stajyer bu hazırlama zincirinin makinenin sağlıklı yanması için neden kritik olduğunu öğrenir.`,
            `LO da benzer şekilde sürekli purifier'dan geçirilerek temiz tutulur. Stajyer purifier'ın separator (su ayırma) ve clarifier (katı ayırma) modlarını ve gravity disc seçiminin önemini öğrenir.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "İlgili bölüm: Yakıt ve yağlama sistemi",
              text: `Bunker, settling/service tank, purifier operasyonu ve sample alma detayları için "Yakıt ve yağlama sistemi öğrenimi" bölümüne bakınız.`,
            },
          ],
        },
        {
          subheading: "8.2 Sistem etkileşimi ve performans",
          paragraphs: [
            `Yakıt hazırlama sistemi, ana makine ve jeneratör performansını doğrudan etkiler. Kötü saflaştırılmış yakıt; enjektör tıkanması, liner aşınması ve egzoz sıcaklığı dengesizliğine yol açar. Stajyer, bir sistemin çıktısının başka bir sistemin sağlığını belirlediğini somut olarak görür.`,
          ],
        },
      ],
    },
    {
      heading: "9. Sistem Şeması (P&ID) Okuma",
      sections: [
        {
          subheading: "9.1 Piping diagram sembolleri",
          paragraphs: [
            `P&ID (Piping and Instrumentation Diagram), bir sistemin valf, pompa, tank, sensör ve hat bağlantılarını standart sembollerle gösterir. Stajyer valf tiplerini, pompa sembollerini, akış yönünü ve enstrüman etiketlerini (PI, TI, LI, PT) okumayı öğrenir. Şema, sahadaki karmaşayı zihinde sadeleştirir.`,
            `Stajyer, bir P&ID'yi okuyup sahada doğrulayarak (çizimde gördüğü valfi sahada bulup) iki dünyayı birleştirir. Bu beceri; valf alignment, arıza izolasyonu ve operasyon planlamasının temelidir.`,
          ],
        },
        {
          subheading: "9.2 Şemadan operasyona geçiş",
          paragraphs: [
            `Bir transfer veya switching işlemi öncesi stajyer, P&ID üzerinde line-up'ı çıkarmayı öğrenir: hangi valf açık, hangi pompa çalışacak, hangi tank etkilenecek. Bu zihinsel prova, sahadaki hata olasılığını azaltır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Şema ile saha sürekli eşleştirilir",
              text: `Stajyer her yeni sistemi öğrenirken P&ID'yi yanına alıp sahada gezmeli, her sembolün fiziksel karşılığını bulmalı. "Kağıtta gördüğümü çelikte bulabilmek", olgun bir mühendisin temel becerisidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "10. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "10.1 Stajyerin sistem öğrenme kontrol listesi",
          bullets: [
            `Ana makine alt sistemlerini (yakıt, hava, soğutma, yağlama) açıklayabiliyor muyum?`,
            `Jeneratör paralel çalışma ve preferential trip mantığını anladım mı?`,
            `Kazan low-water ve safety valve emniyetini biliyor muyum?`,
            `Starting air ve drain disiplinini öğrendim mi?`,
            `Pompa tiplerini ve duty/standby mantığını ayırt edebiliyor muyum?`,
            `Merkezi soğutma LT/HT devresini ve termostatik kontrolü anladım mı?`,
            `Yakıt hazırlama zincirini (settling→purifier→service) izleyebiliyor muyum?`,
            `P&ID sembollerini okuyup sahada doğrulayabiliyor muyum?`,
            `Her sistemin emniyet cihazı ve alarm noktasını tanıdım mı?`,
            `Ekipman lokasyonlarını General Arrangement ile eşleştirebildim mi?`,
          ],
          paragraphs: [
            `Makine sistemlerini öğrenmek, ekipman isimlerini ezberlemek değil, akışkanın yolunu, enerjinin dönüşümünü ve sistemler arası bağımlılığı kavramaktır. Stajyer her sistemi "amacı, akışı, arızası, koruması" çerçevesinde öğrendiğinde, makine dairesi bir bilmece olmaktan çıkıp anlamlı bir bütüne dönüşür. Bu bütünsel kavrayış, ileride arıza teşhisi ve operasyon yönetimi için sağlam bir zemin oluşturur.`,
          ],
        },
      ],
    },
  ],
};

export default content;
