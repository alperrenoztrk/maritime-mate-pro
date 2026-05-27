import type { MachineSubTopicContent } from "./machineTopicDetailContent";

type ContentMap = Record<string, Record<string, MachineSubTopicContent>>;

const content2: ContentMap = {
  // ═══════════════════════════════════════════════════════════════
  // AKIŞKANLAR MEKANİĞİ
  // ═══════════════════════════════════════════════════════════════
  "fluid-mechanics": {
    "Basınç kavramı ve birimleri": {
      title: "Basınç Kavramı ve Birimleri",
      introduction: "Basınç, birim alana dik olarak etki eden kuvvet olarak tanımlanır. Akışkanlar mekaniğinin en temel büyüklüğüdür ve gemi makine dairesindeki tüm sistemlerin tasarımı ile izlenmesinde kullanılır.",
      sections: [
        { heading: "Tanım ve Formül", paragraphs: ["Basınç, P = F/A bağıntısıyla tanımlanır. SI birim sisteminde Pascal (Pa = N/m²) kullanılır. Denizcilik uygulamalarında bar (1 bar = 10⁵ Pa) ve kg/cm² birimleri yaygındır."], formula: { expression: "P = F / A", variables: ["P: Basınç (Pa veya bar)", "F: Kuvvet (N)", "A: Alan (m²)"] } },
        { heading: "Birim Dönüşümleri", paragraphs: [], table: { headers: ["Birim", "Pa Karşılığı"], rows: [["1 bar", "100 000 Pa"], ["1 atm", "101 325 Pa"], ["1 kg/cm²", "98 066.5 Pa"], ["1 psi", "6 894.76 Pa"], ["1 mmHg", "133.322 Pa"]] } },
        { heading: "Sayısal Örnek", paragraphs: [], example: { problem: "Bir hidrolik silindirin piston alanı 50 cm² ve uygulanan kuvvet 25 kN ise basıncı bulunuz.", steps: ["A = 50 cm² = 50 × 10⁻⁴ m² = 0.005 m²", "P = F/A = 25000 / 0.005 = 5 000 000 Pa = 50 bar"], result: "Silindir basıncı 50 bar'dır." } }
      ],
      keyPoints: ["1 bar ≈ 1 atm pratik kabuldür.", "Gemi sistemlerinde basınç ölçüm aralığı 0-400 bar arasında değişir.", "Birim dönüşümlerinde dikkatli olunmalıdır."]
    },
    "Hidrostatik basınç denklemleri": {
      title: "Hidrostatik Basınç Denklemleri",
      introduction: "Durgun bir akışkanda basınç yalnızca derinliğe bağlıdır. Hidrostatik basınç, gemi yapısı ve tankların tasarımında temel hesap aracıdır.",
      sections: [
        { heading: "Temel Denklem", paragraphs: ["Durgun akışkanda herhangi bir derinlikteki basınç, yüzey basıncına o derinlikteki sıvı sütununun ağırlığının eklenmesiyle bulunur."], formula: { expression: "P = P₀ + ρgh", variables: ["P₀: Yüzey basıncı (Pa)", "ρ: Akışkan yoğunluğu (kg/m³)", "g: Yerçekimi ivmesi (9.81 m/s²)", "h: Derinlik (m)"] }, example: { problem: "Deniz suyu yoğunluğu 1025 kg/m³ ise 15 m derinlikteki basınç nedir?", steps: ["P = P_atm + ρgh", "P = 101325 + 1025 × 9.81 × 15", "P = 101325 + 150929 = 252254 Pa ≈ 2.52 bar"], result: "15 m derinlikteki mutlak basınç yaklaşık 2.52 bar'dır." } }
      ],
      keyPoints: ["Basınç her yönde eşit olarak etki eder (Pascal prensibi).", "Deniz suyunda her 10 m derinlikte yaklaşık 1 bar basınç artar.", "Tank basınç hesaplarında sıvının yoğunluğu kritik parametredir."]
    },
    "Mutlak ve manometrik basınç": {
      title: "Mutlak ve Manometrik Basınç",
      introduction: "Basınç ölçümlerinde referans noktası kritik öneme sahiptir. Makine dairesindeki göstergeler genellikle manometrik basıncı gösterir.",
      sections: [
        { heading: "Tanımlar", paragraphs: ["Mutlak basınç sıfır basınca (tam vakum) göre ölçülür. Manometrik basınç ise atmosfer basıncına göre ölçülür. Vakum basıncı atmosfer basıncının altındaki basınçlar için kullanılır."], formula: { expression: "P_mutlak = P_manometrik + P_atm\nP_vakum = P_atm − P_mutlak", variables: [] } }
      ],
      keyPoints: ["Termodinamik hesaplarda mutlak basınç kullanılır.", "Basınç göstergeleri manometrik basıncı gösterir.", "Kondenser ve evaporatör vakum altında çalışır."]
    },
    "Pascal prensibi": {
      title: "Pascal Prensibi",
      introduction: "Pascal prensibi, kapalı bir kapta bir noktaya uygulanan basıncın, akışkanın her noktasına eşit olarak iletildiğini belirtir. Hidrolik sistemlerin çalışma temelidir.",
      sections: [
        { heading: "Prensip ve Uygulama", paragraphs: ["Kapalı bir kapta durgun akışkana uygulanan basınç, akışkanın her noktasına ve kap duvarlarına eşit büyüklükte iletilir. Bu prensip, küçük bir kuvvetle büyük kuvvet üretmeyi mümkün kılar."], formula: { expression: "F₁/A₁ = F₂/A₂  →  F₂ = F₁ × (A₂/A₁)", variables: ["F₁: Küçük pistona uygulanan kuvvet", "A₁, A₂: Piston alanları"] }, example: { problem: "Bir hidrolik preste küçük piston alanı 10 cm², büyük piston alanı 500 cm² ise 200 N kuvvet uygulandığında üretilen kuvvet nedir?", steps: ["F₂ = F₁ × (A₂/A₁) = 200 × (500/10)", "F₂ = 200 × 50 = 10000 N = 10 kN"], result: "Büyük pistonda 10 kN kuvvet üretilir." } }
      ],
      keyPoints: ["Kuvvet kazancı kadar strok kaybı olur.", "Dümen makinesi, kapak hidroliği ve vinçler bu prensiple çalışır.", "Hidrolik sistemlerde sıvının sıkıştırılamazlığı esas alınır."]
    },
    "Düz ve eğri yüzeylere etkiyen basınç kuvveti": {
      title: "Düz ve Eğri Yüzeylere Etkiyen Basınç Kuvveti",
      introduction: "Tank duvarları, kapaklar ve gemi tekne kaplaması gibi düz ve eğri yüzeylere etki eden hidrostatik kuvvetlerin hesabı yapısal tasarımda temel gerekliliktir.",
      sections: [
        { heading: "Düz Yüzeye Etki Eden Kuvvet", paragraphs: ["Düz yüzeye etkiyen toplam kuvvet, yüzeyin ağırlık merkezindeki basınç ile yüzey alanının çarpımına eşittir."], formula: { expression: "F = ρg·h_c·A", variables: ["h_c: Yüzey ağırlık merkezinin sıvı yüzeyinden derinliği (m)", "A: Yüzey alanı (m²)"] }, example: { problem: "Bir balast tankının dikdörtgen kapağı 1.2 m × 0.8 m boyutundadır ve merkezinin derinliği 3 m'dir. Deniz suyu basınç kuvvetini bulunuz.", steps: ["A = 1.2 × 0.8 = 0.96 m²", "F = 1025 × 9.81 × 3 × 0.96", "F = 28 970 N ≈ 29 kN"], result: "Kapağa etkiyen basınç kuvveti yaklaşık 29 kN'dur." } }
      ],
      keyPoints: ["Kuvvet uygulama noktası (basınç merkezi) ağırlık merkezinin altındadır.", "Derinlik arttıkça kuvvet doğrusal olarak artar.", "Tank yapısal mukavemet hesaplarında bu kuvvetler belirleyicidir."]
    },
    "Yüzdürme kuvveti (Arşimet)": {
      title: "Yüzdürme Kuvveti (Arşimet Prensibi)",
      introduction: "Bir cisim akışkana batırıldığında, cismin yerinden ettiği akışkanın ağırlığına eşit büyüklükte yukarı yönlü bir kuvvet etkir.",
      sections: [
        { heading: "Arşimet Prensibi", paragraphs: ["Yüzdürme kuvveti (buoyancy), cismin batık hacmi ile akışkan yoğunluğunun çarpımına eşittir."], formula: { expression: "F_b = ρ_akışkan × g × V_batık", variables: ["F_b: Yüzdürme kuvveti (N)", "V_batık: Batık hacim (m³)"] } }
      ],
      keyPoints: ["Geminin yüzmesi Arşimet prensibine dayanır.", "Deplasman = yerinden edilen su ağırlığı.", "Yoğunluğu sıvıdan küçük olan cisim yüzer."]
    },
    "Akım çizgileri ve akış tipleri": {
      title: "Akım Çizgileri ve Akış Tipleri",
      introduction: "Akım çizgileri, akışkan hız vektörlerine her noktada teğet olan hayali çizgilerdir. Akış görselleştirmesinin temel aracıdır.",
      sections: [
        { heading: "Akış Sınıflandırması", paragraphs: ["Kararlı (steady) akışta hız zamanla değişmez; kararsız (unsteady) akışta değişir. Düzgün (uniform) akışta hız konumla değişmez; düzgün olmayan akışta değişir."], table: { headers: ["Akış Tipi", "Açıklama", "Örnek"], rows: [["Kararlı", "Zaman bağımsız", "Boru hattında sabit debi"], ["Kararsız", "Zamana bağlı", "Vana açılma anı"], ["Düzgün", "Konum bağımsız", "Sabit kesitli uzun boru"], ["Düzgün olmayan", "Konuma bağlı", "Daralan boru"]] } }
      ],
      keyPoints: ["Kararlı akışta akım çizgileri ile akış yolu (pathline) aynıdır.", "Akım çizgileri birbirini kesmez.", "Gemi boru sistemlerinde çoğu tasarım kararlı akış kabulüyle yapılır."]
    },
    "Laminer ve türbülanslı akış": {
      title: "Laminer ve Türbülanslı Akış",
      introduction: "Akışkanların hareket düzeni akış rejimine bağlıdır. Laminer akışta tabakalar düzenli, türbülanslı akışta düzensiz ve karmaşık hareket eder.",
      sections: [
        { heading: "Rejim Ayrımı", paragraphs: ["Laminer akışta akışkan tabakaları birbirine paralel hareket eder, karışma azdır. Türbülanslı akışta rastgele dalgalanmalar ve yoğun karışma gözlemlenir. Geçiş bölgesi bu iki rejim arasındadır."], table: { headers: ["Özellik", "Laminer", "Türbülanslı"], rows: [["Re sayısı (boru)", "< 2300", "> 4000"], ["Hız profili", "Parabolik", "Daha düz"], ["Sürtünme", "Düşük", "Yüksek"], ["Karışma", "Az", "Yoğun"]] } }
      ],
      keyPoints: ["Gemi boru hatlarında akış genellikle türbülanslıdır.", "Türbülanslı akışta ısı transferi daha iyidir.", "Sürtünme kayıpları türbülanslı akışta çok daha yüksektir."]
    },
    "Reynolds sayısı": {
      title: "Reynolds Sayısı",
      introduction: "Reynolds sayısı, eylemsizlik kuvvetlerinin viskoz kuvvetlere oranını ifade eden boyutsuz bir sayıdır. Akış rejiminin belirlenmesinde temel kriterdir.",
      sections: [
        { heading: "Tanım ve Hesap", paragraphs: ["Reynolds sayısı akışkan hızı, karakteristik uzunluk ve kinematik viskoziteye bağlıdır."], formula: { expression: "Re = ρVD/μ = VD/ν", variables: ["V: Akışkan hızı (m/s)", "D: Boru çapı (m)", "μ: Dinamik viskozite (Pa·s)", "ν: Kinematik viskozite (m²/s)"] }, example: { problem: "İç çapı 100 mm olan bir boruda 2 m/s hızla deniz suyu (ν = 1.19 × 10⁻⁶ m²/s) akıyorsa Reynolds sayısını ve akış rejimini belirleyiniz.", steps: ["Re = VD/ν = 2 × 0.1 / (1.19 × 10⁻⁶)", "Re = 0.2 / (1.19 × 10⁻⁶) = 168 067"], result: "Re ≈ 168 000 → Türbülanslı akış (Re >> 4000)." } }
      ],
      keyPoints: ["Re < 2300: Laminer, Re > 4000: Türbülanslı.", "Gemi borularında Re genellikle 10⁴-10⁶ arasındadır.", "Re sayısı sürtünme katsayısı hesabında kullanılır."]
    },
    "Süreklilik denklemi": {
      title: "Süreklilik Denklemi",
      introduction: "Süreklilik denklemi, kütle korunumu ilkesinin akışkan mekaniğindeki ifadesidir. Kararlı akışta giren kütle debisi çıkan kütle debisine eşittir.",
      sections: [
        { heading: "Denklem", paragraphs: ["Sıkıştırılamaz akışkanlar için hacimsel debi sabit kalır."], formula: { expression: "A₁V₁ = A₂V₂ = Q (sabit)", variables: ["A: Kesit alanı (m²)", "V: Ortalama hız (m/s)", "Q: Hacimsel debi (m³/s)"] }, example: { problem: "Bir boru hattında çap 150 mm'den 75 mm'ye daralmaktadır. Giriş hızı 1.5 m/s ise çıkış hızını bulunuz.", steps: ["A₁V₁ = A₂V₂", "V₂ = V₁ × (D₁/D₂)² = 1.5 × (150/75)²", "V₂ = 1.5 × 4 = 6 m/s"], result: "Daralan bölgede hız 6 m/s'ye yükselir." } }
      ],
      keyPoints: ["Kesit daralırsa hız artar, kesit genişlerse hız azalır.", "Kütle debisi (ṁ = ρAV) kararlı akışta sabittir.", "Boru boyutlandırma hesaplarının temelidir."]
    },
    "Bernoulli denklemi ve uygulamaları": {
      title: "Bernoulli Denklemi ve Uygulamaları",
      introduction: "Bernoulli denklemi, sürtünmesiz kararlı akışta basınç, hız ve yükseklik arasındaki enerji korunumunu ifade eder.",
      sections: [
        { heading: "Denklem", paragraphs: ["İdeal akışkan için bir akım çizgisi boyunca toplam enerji sabittir."], formula: { expression: "P₁/ρg + V₁²/2g + z₁ = P₂/ρg + V₂²/2g + z₂", variables: ["P/ρg: Basınç yüksekliği (m)", "V²/2g: Hız yüksekliği (m)", "z: Konumsal yükseklik (m)"] }, example: { problem: "Bir boru hattında dar kesitte hız 6 m/s, geniş kesitte 1.5 m/s'dir. Geniş kesitteki basınç 3 bar ise dar kesitteki basıncı bulunuz (yükseklik farkı ihmal).", steps: ["P₁/ρg + V₁²/2g = P₂/ρg + V₂²/2g", "P₂ = P₁ + ρ(V₁² − V₂²)/2", "P₂ = 300000 + 1025 × (1.5² − 6²)/2", "P₂ = 300000 + 1025 × (2.25 − 36)/2", "P₂ = 300000 − 17297 = 282703 Pa ≈ 2.83 bar"], result: "Dar kesitteki basınç 2.83 bar'dır (hız arttıkça basınç düşer)." } }
      ],
      keyPoints: ["Hız arttıkça basınç düşer (Venturi etkisi).", "Gerçek akışlarda sürtünme kayıpları eklenir.", "Orifis ve Venturi debimetrelerinin çalışma prensibidir."]
    },
    "Darcy–Weisbach denklemi": {
      title: "Darcy–Weisbach Denklemi",
      introduction: "Boru akışındaki sürtünme kayıplarını hesaplamak için kullanılan temel denklemdir. Gemi boru sistemi tasarımında pompa basınç yüksekliği hesaplarının ayrılmaz parçasıdır.",
      sections: [
        { heading: "Denklem", paragraphs: ["Sürtünme basınç kaybı, boru uzunluğu, çapı, akışkan hızı ve sürtünme katsayısına bağlıdır."], formula: { expression: "h_f = f × (L/D) × (V²/2g)", variables: ["h_f: Sürtünme kayıp yüksekliği (m)", "f: Darcy sürtünme katsayısı (Moody diyagramından)", "L: Boru uzunluğu (m)", "D: Boru iç çapı (m)"] }, example: { problem: "İç çapı 100 mm, uzunluğu 50 m olan bir boruda su 3 m/s hızla akıyorsa ve f = 0.025 ise sürtünme kaybını bulunuz.", steps: ["h_f = f × (L/D) × (V²/2g)", "h_f = 0.025 × (50/0.1) × (3²/(2×9.81))", "h_f = 0.025 × 500 × 0.459 = 5.74 m"], result: "Sürtünme kaybı 5.74 m su sütunudur." } }
      ],
      keyPoints: ["f değeri Re sayısı ve boru pürüzlülüğüne bağlıdır.", "Moody diyagramından veya Colebrook denkleminden bulunur.", "Uzun boru hatlarında sürtünme kaybı baskın kayıp kaynağıdır."]
    },
    "Santrifüj pompa çalışma prensibi": {
      title: "Santrifüj Pompa Çalışma Prensibi",
      introduction: "Santrifüj pompalar, dönen çark (impeller) aracılığıyla akışkana kinetik enerji kazandıran ve bunu basınç enerjisine dönüştüren turbo makinelerdir. Gemi sistemlerinde en yaygın kullanılan pompa tipidir.",
      sections: [
        { heading: "Çalışma Prensibi", paragraphs: ["Akışkan çarkın merkezinden (emme gözü) girer ve merkezkaç kuvvetiyle dışarı doğru itilir. Çark çıkışında yüksek hıza sahip akışkan, salyangoz (volüt) veya difüzör ile yavaşlatılarak basınç enerjisine dönüştürülür.", "Euler turbo makine denklemi pompa tarafından akışkana verilen enerjiyi tanımlar."] },
        { heading: "Pompa Bileşenleri", paragraphs: [], bulletPoints: ["Çark (impeller): Enerji aktarım elemanı. Kapalı, yarı açık ve açık tipleri vardır.", "Salyangoz (volüt): Çark çıkışında hız enerjisini basınca dönüştürür.", "Emme ağzı ve basma ağzı: Flanşlı bağlantılarla boru hattına bağlanır.", "Mekanik salmastra veya mekanik seal: Şaft geçiş noktasında sızdırmazlık sağlar."] }
      ],
      keyPoints: ["Santrifüj pompalar yüksek debi, düşük-orta basınç uygulamalarına uygundur.", "Kendi kendine emiş yapamaz; emme hattı dolu olmalıdır.", "Gemi soğutma suyu, balast, sintine ve yangın pompalarında kullanılır."]
    },
    "NPSH kavramı ve kavitasyon": {
      title: "NPSH Kavramı ve Kavitasyon",
      introduction: "NPSH (Net Positive Suction Head), pompa emme tarafında yeterli basıncın olup olmadığını belirleyen kritik parametredir. Yetersiz NPSH kavitasyona yol açar.",
      sections: [
        { heading: "NPSH Tanımları", paragraphs: ["NPSH_available: Sistemin emme noktasında sağlayabildiği basınç yüksekliği. NPSH_required: Pompanın kavitasyonsuz çalışması için ihtiyaç duyduğu minimum basınç yüksekliği (üretici katalogunda belirtilir).", "Güvenli çalışma koşulu: NPSH_a > NPSH_r (genellikle en az 0.5 m fark)"], formula: { expression: "NPSH_a = (P_atm − P_buhar) / ρg + h_statik − h_sürtünme", variables: ["P_buhar: Akışkanın buharlaşma basıncı", "h_statik: Emme statik yüksekliği (pozitif: pompa altında)", "h_sürtünme: Emme hattı sürtünme kaybı"] } },
        { heading: "Kavitasyon", paragraphs: ["Kavitasyon, akışkan basıncının buharlaşma basıncının altına düşmesiyle oluşan buhar kabarcıklarının yüksek basınç bölgesinde çökerek malzeme hasarı, gürültü ve performans düşüşü yaratmasıdır. Çark kanatlarında oyuklanma (pitting) ve erozyon oluşturur."] }
      ],
      keyPoints: ["Kavitasyon pompa ömrünü ciddi oranda kısaltır.", "Sıcak akışkanlarda buharlaşma basıncı yüksek olduğundan kavitasyon riski artar.", "Emme hattını kısa ve büyük çaplı tutmak NPSH_a'yı artırır."]
    },
    "Pompa karakteristik eğrileri (H-Q)": {
      title: "Pompa Karakteristik Eğrileri (H-Q)",
      introduction: "Pompa karakteristik eğrileri, pompanın farklı çalışma koşullarındaki performansını gösteren grafiklerdir.",
      sections: [
        { heading: "Temel Eğriler", paragraphs: ["H-Q eğrisi: Basma yüksekliği-debi ilişkisi. Debi arttıkça basma yüksekliği düşer.", "Verim eğrisi: Her debide pompa verimi. Maksimum verim noktasının (BEP – Best Efficiency Point) yakınında çalışılmalıdır.", "Güç eğrisi: Pompa mil gücü-debi ilişkisi.", "NPSH_r eğrisi: Gereken emme basıncı-debi ilişkisi."] },
        { heading: "Çalışma Noktası", paragraphs: ["Pompa H-Q eğrisi ile sistem eğrisinin kesiştiği nokta çalışma noktasıdır. Sistem eğrisi statik yükseklik ve sürtünme kayıplarının toplamından oluşur.", "Çalışma noktası BEP'ten uzaklaştıkça verim düşer, titreşim ve aşınma artar."] }
      ],
      keyPoints: ["Pompa her zaman BEP yakınında çalıştırılmalıdır.", "Vana kısma ile debi kontrolü enerji kaybına neden olur; VFD tercih edilir.", "Paralel pompada debi iki katına çıkmaz; eğri geometrisine bağlıdır."]
    },
    "Balast boru sistemi": {
      title: "Balast Boru Sistemi",
      introduction: "Balast sistemi, geminin stabilite, trim ve yapısal gerilmelerinin kontrolü amacıyla deniz suyunun tanklara alınıp boşaltılmasını sağlayan kritik sistemdir.",
      sections: [
        { heading: "Sistem Bileşenleri", paragraphs: ["Balast pompaları (genellikle 2 adet santrifüj), deniz suyu giriş valfleri (sea chest), balast tankları, boru hatları, seviye ölçüm sensörleri ve kontrol panelinden oluşur.", "BWM Convention gereği balast su arıtma sistemi (BWTS) zorunludur."] },
        { heading: "Operasyon", paragraphs: ["Yükleme/boşaltma sırasında stabilite ve trimesafe sınırları içinde kalacak şekilde balast operasyonu planlanır. Balast değişimi (exchange) veya arıtma yapılmadan deşarj sınırlamaları uygulanır."] }
      ],
      keyPoints: ["Balast pompa kapasitesi tipik olarak 1000-5000 m³/h arasındadır.", "SOLAS gereği balast tankları ile yük/yakıt tankları birbirinden ayrılmalıdır.", "Balast suyu kayıt defteri tutulması zorunludur."]
    },
    "Sintine boru sistemi": {
      title: "Sintine Boru Sistemi",
      introduction: "Sintine sistemi, makine dairesinde biriken suları toplayarak gemi dışına pompalayan güvenlik açısından kritik bir sistemdir.",
      sections: [
        { heading: "Sistem Yapısı", paragraphs: ["Her bölmede sintine kuyusu (bilge well) bulunur. Sintine ana boru hattı, dallandırma boruları, çek valfler ve emme süzgeçlerinden oluşur. Sintine pompası olarak adanmış santrifüj veya pistonlu pompalar kullanılır.", "SOLAS gereği en az iki bağımsız sintine pompası ve acil sintine emişi (direct bilge suction) bulunmalıdır."] },
        { heading: "Çevre Gereklilikleri", paragraphs: ["Sintine suyu doğrudan denize basılamaz. Yağlı su ayırıcısından (OWS) geçirilerek 15 ppm altına indirilmelidir. ODMCS (Oil Discharge Monitoring and Control System) sürekli izleme yapar."] }
      ],
      keyPoints: ["Acil sintine emişi ana makine soğutma suyu pompasından yapılabilir.", "15 ppm sınırı aşılırsa otomatik olarak gemi içi deşarj (recirculation) yapılır.", "Sintine boru çapları SOLAS ve klas kurallarıyla belirlenir."]
    }
  },

  // ═══════════════════════════════════════════════════════════════
  // MAKİNE ELEMANLARI VE MALZEME BİLGİSİ
  // ═══════════════════════════════════════════════════════════════
  "machine-elements": {
    "Kristal yapılar ve faz diyagramları": {
      title: "Kristal Yapılar ve Faz Diyagramları",
      introduction: "Metallerin mekanik özellikleri kristal yapılarına bağlıdır. Demir-karbon faz diyagramı çelik üretimi ve ısıl işlem uygulamalarının temelini oluşturur.",
      sections: [
        { heading: "Temel Kristal Yapılar", paragraphs: ["BCC (Hacim Merkezli Kübik): α-demir (ferrit), düşük sıcaklıkta kararlıdır. Sert fakat kırılgan olabilir.", "FCC (Yüz Merkezli Kübik): γ-demir (östenit), yüksek sıcaklıkta kararlıdır. Sünek ve şekillendirilebilir.", "HCP (Sıkı Paket Altıgen): Çinko, magnezyum gibi metaller bu yapıdadır."], table: { headers: ["Yapı", "Demir Fazı", "Sıcaklık Aralığı", "Özellik"], rows: [["BCC", "Ferrit (α)", "< 912°C", "Manyetik, yumuşak"], ["FCC", "Östenit (γ)", "912-1394°C", "Sızdırmaz, sünek"], ["BCC", "δ-demir", "1394-1538°C", "Yüksek sıcaklık fazı"]] } }
      ],
      keyPoints: ["Çeliğin özellikleri karbon miktarı ve ısıl işleme bağlıdır.", "Östenit fazında karbon çözünürlüğü ferritte çok daha yüksektir.", "Faz dönüşümleri ısıl işlemin temelini oluşturur."]
    },
    "Çelik türleri ve alaşım elementleri": {
      title: "Çelik Türleri ve Alaşım Elementleri",
      introduction: "Denizcilik endüstrisinde farklı çelik türleri değişen korozyon, mukavemet ve sıcaklık gereksinimlerine göre kullanılır.",
      sections: [
        { heading: "Karbon Çelikleri", paragraphs: ["Düşük karbonlu çelik (< %0.25 C): Kaynak edilebilir, yapısal kullanım. Orta karbonlu çelik (%0.25-0.60 C): Mil, dişli, cıvata. Yüksek karbonlu çelik (> %0.60 C): Yay, kesici takım."] },
        { heading: "Alaşım Elementlerinin Etkileri", paragraphs: [], table: { headers: ["Element", "Etki"], rows: [["Krom (Cr)", "Korozyon direnci, sertlik"], ["Nikel (Ni)", "Tokluk, düşük sıcaklık dayanımı"], ["Molibden (Mo)", "Sıcak mukavemet, pitting direnci"], ["Mangan (Mn)", "Mukavemet, aşınma direnci"], ["Vanadyum (V)", "Tane inceltme, mukavemet"]] } }
      ],
      keyPoints: ["%18 Cr + %8 Ni = Paslanmaz çelik (304 tipi).", "Deniz ortamında 316L (Mo katkılı) paslanmaz çelik tercih edilir.", "Gemi yapısal çeliği AH32/36, DH32/36, EH32/36 sınıflarındadır."]
    },
    "Normal gerilme ve deformasyon": {
      title: "Normal Gerilme ve Deformasyon",
      introduction: "Normal gerilme, kesit alanına dik olarak etki eden kuvvetin birim alana düşen değeridir. Çekme ve basma gerilmeleri olarak ikiye ayrılır.",
      sections: [
        { heading: "Gerilme ve Deformasyon", paragraphs: ["Gerilme σ = F/A formülüyle hesaplanır. Deformasyon (birim uzama) ε = ΔL/L₀ olarak tanımlanır."], formula: { expression: "σ = F/A    ve    ε = ΔL/L₀", variables: ["σ: Normal gerilme (Pa veya MPa)", "F: Kuvvet (N)", "A: Kesit alanı (m²)", "ε: Birim uzama (boyutsuz)"] }, example: { problem: "Çapı 25 mm olan bir çelik çubuk 50 kN çekme kuvvetine maruz kalıyorsa gerilmeyi hesaplayınız.", steps: ["A = π/4 × (0.025)² = 4.909 × 10⁻⁴ m²", "σ = F/A = 50000 / (4.909 × 10⁻⁴)", "σ = 101.86 × 10⁶ Pa = 101.9 MPa"], result: "Çekme gerilmesi 101.9 MPa'dır." } }
      ],
      keyPoints: ["Çekme gerilmesi pozitif, basma gerilmesi negatif olarak işaretlenir.", "Akma gerilmesinin aşılması kalıcı deformasyona neden olur.", "Gemi yapısal çeliğinde akma gerilmesi 235-390 MPa arasındadır."]
    },
    "Hooke yasası ve elastiklik modülü": {
      title: "Hooke Yasası ve Elastiklik Modülü",
      introduction: "Hooke yasası, elastik bölgede gerilme ile birim uzama arasında doğrusal orantı olduğunu belirtir.",
      sections: [
        { heading: "Yasa ve Elastiklik Modülü", paragraphs: ["Elastik bölgede σ = E × ε bağıntısı geçerlidir. E (Young modülü veya elastiklik modülü) malzemenin rijitliğinin ölçüsüdür."], formula: { expression: "σ = E × ε    →    E = σ/ε", variables: ["E: Elastiklik modülü (GPa)", "Çelik için E ≈ 200-210 GPa", "Alüminyum için E ≈ 70 GPa", "Bakır için E ≈ 120 GPa"] }, example: { problem: "200 GPa elastiklik modülüne sahip çelik çubuğun uzunluğu 2 m, gerilmesi 150 MPa ise uzama miktarını bulunuz.", steps: ["ε = σ/E = 150/200000 = 7.5 × 10⁻⁴", "ΔL = ε × L₀ = 7.5 × 10⁻⁴ × 2 = 0.0015 m = 1.5 mm"], result: "Çubuk 1.5 mm uzar." } }
      ],
      keyPoints: ["Hooke yasası yalnızca elastik bölgede geçerlidir.", "E değeri malzemeye özgüdür ve sıcaklıkla azalır.", "Yüksek E değeri rijit (sert) malzeme anlamına gelir."]
    },
    "Mil çapı hesabı (burulma ve eğilme)": {
      title: "Mil Çapı Hesabı (Burulma ve Eğilme)",
      introduction: "Gemi tahrik şaftları ve pompa milleri hem burulma hem eğilme yüküne maruz kalır. Mil çapı bu bileşik yüklemeye göre boyutlandırılır.",
      sections: [
        { heading: "Burulma Gerilmesi", paragraphs: ["Dairesel kesitli bir mile tork uygulandığında kayma gerilmesi oluşur."], formula: { expression: "τ = T × r / J = 16T / πd³", variables: ["τ: Kayma gerilmesi (Pa)", "T: Tork (Nm)", "d: Mil çapı (m)", "J: Polar atalet momenti = πd⁴/32"] }, example: { problem: "Bir ara şaft 500 kNm tork iletmektedir. İzin verilen kayma gerilmesi 60 MPa ise minimum mil çapını bulunuz.", steps: ["d³ = 16T / (πτ)", "d³ = 16 × 500000 / (π × 60 × 10⁶)", "d³ = 8000000 / 188496000 = 0.04244 m³", "d = 0.349 m ≈ 350 mm"], result: "Minimum mil çapı 350 mm'dir." } }
      ],
      keyPoints: ["Bileşik yüklemede Von Mises veya Tresca kriteri kullanılır.", "Klas kuruluşları mil çapını kendi formülleriyle doğrular.", "Pervane şaftı çapı motor gücü ve devire bağlıdır."]
    },
    "Yorulma ömrü ve S-N eğrisi": {
      title: "Yorulma Ömrü ve S-N Eğrisi",
      introduction: "Tekrarlı yükleme altında malzeme, statik mukavemet değerinin çok altındaki gerilmelerde kırılabilir. Bu olgu yorulma kırılmasıdır.",
      sections: [
        { heading: "S-N Eğrisi (Wöhler Eğrisi)", paragraphs: ["S-N eğrisi, uygulanan gerilme genliği (S) ile kırılmaya kadar çevrim sayısı (N) arasındaki ilişkiyi gösterir. Çelikte belirli bir gerilme değerinin altında (yorulma sınırı) kırılma oluşmaz; bu genellikle çekme mukavemetinin %40-50'si kadardır.", "Korozif ortamda (deniz suyu) yorulma sınırı önemli ölçüde düşer."] }
      ],
      keyPoints: ["Yorulma kırılması ani ve haberci olmadan gerçekleşir.", "Gerilme yoğunlaşması (çentik, delik, kaynak dikişi) yorulma ömrünü kısaltır.", "Krank mili, biyel kolu ve pervane şaftı yorulma analizi gerektiren parçalardır."]
    },
    "Elektrik ark kaynağı (SMAW)": {
      title: "Elektrik Ark Kaynağı (SMAW)",
      introduction: "SMAW (Shielded Metal Arc Welding), örtülü elektrot ile yapılan ve gemi onarım/bakımında en yaygın kullanılan kaynak yöntemidir.",
      sections: [
        { heading: "Çalışma Prensibi", paragraphs: ["Elektrot ile iş parçası arasında oluşan elektrik arkı, metalleri eritir. Elektrot örtüsü gaz ve cüruf oluşturarak kaynak banyosunu atmosferden korur.", "AC veya DC kaynak makinesi kullanılabilir. DC düz kutupluluk (DCEN) derin nüfuziyet sağlar."] },
        { heading: "Gemi Uygulamaları", paragraphs: ["Gövde onarımı, boru kaynağı, yapısal parça birleştirme ve dolgu kaynağında yaygın kullanılır. Klas kuruluşları kaynakçı yeterliliğini sertifikalandırır."] }
      ],
      keyPoints: ["En esnek ve taşınabilir kaynak yöntemidir.", "Rüzgârlı ortamlarda bile uygulanabilir.", "Kaynak dikişi kalitesi kaynakçının becerisine bağlıdır."]
    }
  },

  // ═══════════════════════════════════════════════════════════════
  // YARDIMCI MAKİNELER
  // ═══════════════════════════════════════════════════════════════
  auxiliary: {
    "Yardımcı dizel motor özellikleri": {
      title: "Yardımcı Dizel Motor Özellikleri",
      introduction: "Yardımcı dizel motorlar, gemi elektrik üretim sisteminin temel bileşenidir. Jeneratörleri tahrik ederek gemi elektrik ihtiyacını karşılar.",
      sections: [
        { heading: "Genel Özellikler", paragraphs: ["Dört zamanlı, trunk piston tipinde, orta veya yüksek devirli motorlardır. Silindir sayısı genellikle 4-9 arasındadır. Güç aralığı 500-3000 kW.", "Seyirde genellikle 1-2 jeneratör çalıştırılır; limanda yük operasyonu sırasında 2-3 jeneratör gerekebilir."], table: { headers: ["Parametre", "Tipik Değer"], rows: [["Devir", "720-1800 rpm"], ["SFOC", "185-210 g/kWh"], ["Silindir sayısı", "4-9"], ["Soğutma", "HT + LT devresi"], ["Başlatma", "Basınçlı hava (30 bar)"]] } }
      ],
      keyPoints: ["Yardımcı motorlar HFO veya MGO ile çalışabilir.", "ECA bölgelerinde düşük kükürtlü yakıta geçiş gerekir.", "SOLAS gereği en az 2 bağımsız jeneratör seti bulunmalıdır."]
    },
    "Alternatör (AC jeneratör) prensibi": {
      title: "Alternatör (AC Jeneratör) Prensibi",
      introduction: "Alternatör, mekanik enerjiyi elektromanyetik indüksiyon yoluyla AC elektrik enerjisine dönüştüren makinedir.",
      sections: [
        { heading: "Çalışma Prensibi", paragraphs: ["Dönen rotor üzerindeki alan sargısı DC ile uyarılır ve manyetik alan oluşturur. Bu dönen alan stator sargılarında EMK indükler. Üç faz sargısı 120° arayla yerleştirilir.", "Üretilen gerilimin frekansı: f = (N × P)/120. Gemi sistemlerinde genellikle 60 Hz (veya 50 Hz) standarttır."] }
      ],
      keyPoints: ["Uyarma akımı AVR (Automatic Voltage Regulator) ile kontrol edilir.", "Üç fazlı, yıldız bağlı jeneratörler kullanılır.", "Fırçasız (brushless) uyarma modern gemilerde standarttır."]
    },
    "Paralel bağlama (synchronizing)": {
      title: "Paralel Bağlama (Synchronizing)",
      introduction: "İki veya daha fazla jeneratörün aynı baralara bağlanması için frekans, gerilim, faz sırası ve faz açısının eşlenmesi gerekir.",
      sections: [
        { heading: "Paralel Bağlama Koşulları", paragraphs: ["Dört koşul sağlanmalıdır: (1) Aynı frekans, (2) Aynı gerilim büyüklüğü, (3) Aynı faz sırası, (4) Aynı faz açısı (sıfıra yakın faz farkı).", "Otomatik senkronizör veya senkroskop kullanılır. Lambaların karanlık yöntemi basit kontrol aracıdır."] }
      ],
      keyPoints: ["Faz sırası ters olursa kısa devre oluşur.", "Frekans farkı 0.2 Hz'in altında olmalıdır.", "Senkronizasyon anında şalter açma komutu verilir."]
    },
    "Ateş borulu ve su borulu kazanlar": {
      title: "Ateş Borulu ve Su Borulu Kazanlar",
      introduction: "Gemi buhar kazanları, yapılarına göre ateş borulu (fire tube) ve su borulu (water tube) olarak iki ana gruba ayrılır.",
      sections: [
        { heading: "Ateş Borulu Kazan (Fire/Smoke Tube)", paragraphs: ["Sıcak gazlar boruların içinden, su boruların dışından geçer. Büyük su hacmi sayesinde ani yük değişimlerini karşılayabilir ve buhar basıncını sabit tutar. Basit yapı, kolay bakım ve düşük su kalitesi toleransı avantajıdır.", "Basınç genellikle 7-18 bar ile sınırlıdır; buhar üretim hızı düşüktür. Yardımcı (auxiliary) kazan ve egzoz gazı ekonomizeri olarak yaygın kullanılır.", "Örnekler: Scotch marine (yatay, çok geçişli), Cochran (dikey), kompozit (hem yakıt hem egzoz gazı) kazanlar."] },
        { heading: "Su Borulu Kazan (Water Tube)", paragraphs: ["Su boruların içinden, sıcak gazlar dışından geçer. Yüksek basınç (60+ bar) ve büyük kapasite için uygundur. Küçük su hacmi nedeniyle hızlı buhar üretir ve patlama enerjisi düşüktür; ancak su kalitesi (oksijen, sertlik, pH) kritiktir.", "Buhar gemilerinde ve LNG taşıyıcılarda ana tahrik kazanı olarak kullanılır; süperısıtıcı (superheater) ile kızgın buhar üretir.", "Örnekler: D-tipi (iki kazanlı: buhar kazanı + su kazanı), header tipi, radyant tip."] },
        { heading: "Karşılaştırma", paragraphs: [], table: { headers: ["Özellik", "Ateş Borulu", "Su Borulu"], rows: [["Basınç", "≤ 18 bar", "60+ bar"], ["Buhar üretim hızı", "Yavaş", "Hızlı"], ["Su hacmi", "Büyük", "Küçük"], ["Su kalitesi hassasiyeti", "Düşük", "Yüksek"], ["Patlama riski/enerjisi", "Yüksek (büyük su hacmi)", "Düşük"], ["Kullanım", "Yardımcı kazan", "Ana tahrik / yüksek basınç"]] } },
        { heading: "Egzoz Gazı Ekonomizeri (EGE)", paragraphs: ["Motorlu gemilerde ana makine egzoz gazının atık ısısı, ateş borulu/su borulu bir ekonomizerde buhar üretmek için kullanılır. Seyirde yardımcı kazanın yakıt tüketimini büyük ölçüde azaltır.", "Düşük yük/yavaş seyirde kurum birikmesi ve 'soot fire' (kurum yangını) riski izlenmelidir."] }
      ],
      keyPoints: ["Ateş borulu: büyük su hacmi, düşük basınç, yardımcı kazan; örn. Scotch, Cochran.", "Su borulu: yüksek basınç, hızlı buhar, ana tahrik; örn. D-tipi.", "Su borulu kazanda feed water kalitesi (deaerasyon, sülfit, fosfat) kritiktir.", "EGE seyirde atık ısıdan buhar üretip yakıttan tasarruf sağlar.", "Tüm kazanlarda emniyet supabı, gözetleme camı ve düşük su seviye alarmı zorunludur."]
    },
    "Vakumlu evaporatör çalışma prensibi": {
      title: "Vakumlu Evaporatör Çalışma Prensibi",
      introduction: "Vakumlu evaporatör, ana makine HT soğutma suyu atık ısısını kullanarak deniz suyundan tatlı su üreten sistemdir.",
      sections: [
        { heading: "Çalışma Prensibi", paragraphs: ["Evaporatör kabuğu içinde vakum oluşturularak suyun kaynama sıcaklığı 40-60°C'ye düşürülür. Ana makine HT soğutma suyu (70-85°C) ısı kaynağı olarak kullanılır.", "Buharlaşan su kondenserde yoğuşarak tatlı su elde edilir. Tuzlu su (brine) sürekli olarak tahliye edilir."] },
        { heading: "Verim Parametreleri", paragraphs: ["Üretim kapasitesi HT soğutma suyu sıcaklığına doğrudan bağlıdır. Motor yükü düşükse sıcaklık düşer ve üretim azalır. Tipik kapasite 10-30 ton/gün arasındadır."] }
      ],
      keyPoints: ["Vakum ejektör veya vakum pompası ile sağlanır.", "Tatlı su kalitesi salinometre ile sürekli izlenir (< 5 ppm).", "Kıyıya yakın bölgelerde evaporatör çalıştırılmamalıdır (kirli deniz suyu)."]
    },
    "Santrifüj ayırma prensibi": {
      title: "Santrifüj Ayırma Prensibi",
      introduction: "Santrifüj separatörler, yoğunluk farkından yararlanarak yakıt ve yağdan su ve katı partikülleri ayıran kritik arıtma ekipmanıdır.",
      sections: [
        { heading: "Çalışma Prensibi", paragraphs: ["Yüksek hızla dönen tambur (6000-9000 rpm) içinde merkezkaç kuvveti ağır bileşenleri (su, katı partikül) dışa, hafif bileşeni (temiz yakıt/yağ) merkeze doğru iter.", "Disk yığını (disc stack) yüzey alanını artırarak ayırma verimini yükseltir."] },
        { heading: "Purifier ve Clarifier", paragraphs: ["Purifier: Hem su hem katı partikülleri ayırır. Gravity disc ile ayırma sınırı ayarlanır.", "Clarifier: Yalnızca katı partikülleri ayırır. Gravity disc yoktur. Genellikle ikinci aşama olarak kullanılır."] }
      ],
      keyPoints: ["Yakıt arıtmada genellikle purifier-clarifier seri düzeni kullanılır.", "Gravity disc çapı yakıtın yoğunluğuna göre seçilir.", "Otomatik desludge atık birikimini düzenli olarak temizler."]
    },
    "Çok kademeli kompresör prensibi": {
      title: "Çok Kademeli Kompresör Prensibi",
      introduction: "Gemi starting air kompresörleri, 25-30 bar basınca ulaşmak için iki veya üç kademeli sıkıştırma kullanır.",
      sections: [
        { heading: "Çalışma Prensibi", paragraphs: ["Her kademede hava sıkıştırılır ve ara soğutucudan geçirilerek sıcaklığı düşürülür. Bu sayede sonraki kademedeki sıkıştırma işi azaltılır ve verim artar.", "Tipik bir iki kademeli kompresör: 1. kademe 1→6 bar, ara soğutma, 2. kademe 6→30 bar, son soğutma."] },
        { heading: "Ara Soğutma Faydaları", paragraphs: ["Sıkıştırma işini azaltır (izotermik sıkıştırmaya yaklaştırır).", "Yağ buharlaşması ve tutuşma riskini azaltır.", "Kompresör çıkış sıcaklığını düşürür."] }
      ],
      keyPoints: ["Ara soğutma olmadan çıkış sıcaklığı tehlikeli seviyelere çıkar.", "Her kademe sonunda otomatik kondens tahliye valfı bulunur.", "Hava şişeleri 5 veya 10 yılda bir hidrostatik teste tabi tutulur."]
    }
  },

  // ═══════════════════════════════════════════════════════════════
  // YAKIT TEKNOLOJİSİ
  // ═══════════════════════════════════════════════════════════════
  "fuel-technology": {
    "HFO (Heavy Fuel Oil) özellikleri": {
      title: "HFO (Heavy Fuel Oil) Özellikleri",
      introduction: "HFO, ham petrol rafinasyon sürecinde elde edilen ağır kalıntı yakıttır. Düşük maliyeti nedeniyle büyük deniz motorlarının ana yakıtı olmuştur.",
      sections: [
        { heading: "Temel Özellikler", paragraphs: ["HFO'nun viskozitesi 50°C'de 180-700 cSt arasındadır. Kullanım için 130-150°C'ye ısıtılarak viskozitesi 10-15 cSt'ye düşürülmelidir.", "Yoğunluğu 15°C'de 960-991 kg/m³ arasındadır (ISO 8217 RMG/RMK sınıfları). Kükürt içeriği %1.0-3.5 arasında değişir."], table: { headers: ["Parametre", "RMG 380", "RMK 700"], rows: [["Viskozite (50°C)", "≤ 380 cSt", "≤ 700 cSt"], ["Yoğunluk (15°C)", "≤ 991 kg/m³", "≤ 1010 kg/m³"], ["Flash point", "≥ 60°C", "≥ 60°C"], ["Su içeriği", "≤ 0.5%", "≤ 0.5%"]] } }
      ],
      keyPoints: ["HFO kullanımı kapsamlı ısıtma ve arıtma gerektirir.", "2020 sonrası global kükürt limiti %0.50 nedeniyle HFO kullanımı scrubber gerektirmektedir.", "Düşük kaliteli HFO motor hasarına neden olabilir."]
    },
    "VLSFO (Very Low Sulphur Fuel Oil)": {
      title: "VLSFO (Very Low Sulphur Fuel Oil)",
      introduction: "2020 IMO kükürt düzenlemesi sonrası yaygınlaşan, %0.50 veya altı kükürt içerikli yakıttır.",
      sections: [
        { heading: "Özellikler ve Zorluklar", paragraphs: ["VLSFO, farklı rafineri ürünlerinin karıştırılmasıyla (blending) üretilir. Bu nedenle özellikleri üreticiden üreticiye değişebilir.", "Stabilite sorunları (sludge oluşumu), uyumsuzluk (incompatibility) riski ve beklenmedik yanma davranışları görülebilir. Bunker öncesi uyumluluk testi önerilir."] }
      ],
      keyPoints: ["Scrubber olmadan global seyreden gemilerin standart yakıtıdır.", "Farklı VLSFO'lar karıştırılmamalıdır; uyumsuzluk riski yüksektir.", "Cat fines (Al+Si) seviyesi dikkatle izlenmelidir."]
    },
    "ISO 8217 yakıt standartları": {
      title: "ISO 8217 Yakıt Standartları",
      introduction: "ISO 8217, deniz yakıtlarının kalite parametrelerini tanımlayan uluslararası standarttır. Bunker alımında referans doküman olarak kullanılır.",
      sections: [
        { heading: "Sınıflandırma", paragraphs: ["Distile yakıtlar: DMA (MGO), DMB, DMC – düşük viskoziteli, temiz yakıtlar.", "Kalıntı yakıtlar: RMA, RMB, RMD, RME, RMG, RMK – viskoziteye göre sınıflandırılır.", "Her sınıf için viskozite, yoğunluk, kükürt, su, kül, CCAI, Al+Si limitleri belirlenmiştir."] }
      ],
      keyPoints: ["BDN (Bunker Delivery Note) yakıtın ISO 8217 sınıfını belirtmelidir.", "Yakıt numunesi 12 ay saklanmalıdır.", "Off-spec yakıt raporu bayrak devletine ve IMO'ya bildirilir."]
    },
    "Viskozite ve sıcaklık ilişkisi": {
      title: "Viskozite ve Sıcaklık İlişkisi",
      introduction: "Viskozite, yakıtın enjeksiyon kalitesini belirleyen en önemli parametredir. Sıcaklık arttıkça viskozite düşer.",
      sections: [
        { heading: "Viskozite Kontrolü", paragraphs: ["Enjeksiyon öncesi yakıt viskozitesi 10-15 cSt'ye ayarlanmalıdır. HFO için ısıtma sıcaklığı 130-150°C, VLSFO için 80-100°C arasındadır.", "Viskometre, yakıt hattındaki viskoziteyi sürekli ölçer ve ısıtıcıyı otomatik kontrol eder."], formula: { expression: "Enjeksiyon viskozitesi = 10-15 cSt (motor üreticisi tavsiyesi)", variables: [] } }
      ],
      keyPoints: ["Düşük viskozite sızıntı ve pompa aşınmasına neden olur.", "Yüksek viskozite kötü atomizasyon ve eksik yanmaya yol açar.", "Viskozite-sıcaklık grafiği (ASTM D341) yakıt yönetiminde kullanılır."]
    },
    "Settling tank ve servis tank": {
      title: "Settling Tank ve Servis Tank",
      introduction: "Yakıt depolama ve arıtma sistemi, yakıtın motora temiz ve uygun koşullarda ulaşmasını sağlayan çok aşamalı bir süreçtir.",
      sections: [
        { heading: "Tank Sistemi", paragraphs: ["Depolama tankı (storage tank) → Settling tankı (24-48 saat bekleme, su ve çökelti ayrışması) → Purifier/Clarifier → Servis tankı (motora yakıt besleme).", "Settling tankında ısıtma mantarı ile sıcaklık sabit tutulur; dipte biriken su ve çökelti düzenli olarak drene edilir.", "Servis tankı genellikle 8-24 saatlik yakıt kapasitesinde olup, motora kesintisiz besleme sağlar."] }
      ],
      keyPoints: ["Settling tank sıcaklığı pour point'in 10°C üzerinde tutulmalıdır.", "Tank geçişlerinde farklı yakıtlar karıştırılmamalıdır.", "Her tankta seviye, sıcaklık ve su algılama sensörleri bulunmalıdır."]
    },
    "Bunker Delivery Note (BDN)": {
      title: "Bunker Delivery Note (BDN)",
      introduction: "BDN, yakıt alımında tedarikçi tarafından düzenlenen ve MARPOL Annex VI gereği zorunlu olan resmi yakıt teslimat belgesidir.",
      sections: [
        { heading: "BDN İçeriği", paragraphs: ["BDN şu bilgileri içermelidir: Alıcı gemi adı ve IMO numarası, yakıt tedarikçisi, miktar (metrik ton), yoğunluk (15°C), kükürt içeriği (%), yakıt sınıfı (ISO 8217), teslim tarihi ve limanı.", "BDN üç yıl boyunca gemide saklanmalıdır. Yakıt numunesi en az 12 ay muhafaza edilmelidir."] }
      ],
      keyPoints: ["BDN PSC (Liman Devleti Kontrolü) denetimlerinde kontrol edilir.", "Kükürt uyumsuzluğu yaptırımlara neden olur.", "Miktar uyuşmazlığı durumunda bağımsız surveyor tayin edilir."]
    }
  },

  // ═══════════════════════════════════════════════════════════════
  // SOĞUTMA VE KLİMA
  // ═══════════════════════════════════════════════════════════════
  "cooling-hvac": {
    "Soğutma çevrimi bileşenleri": {
      title: "Soğutma Çevrimi Bileşenleri",
      introduction: "Buhar sıkıştırmalı soğutma çevrimi dört ana bileşenden oluşur: kompresör, kondenser, genleşme elemanı ve evaporatör.",
      sections: [
        { heading: "Çevrim Bileşenleri", paragraphs: ["(1) Kompresör: Düşük basınçlı soğutucu buharı sıkıştırarak yüksek basınç ve sıcaklığa getirir. Pistonlu veya vidalı tip kullanılır.", "(2) Kondenser: Yüksek basınçlı sıcak buharı deniz suyu ile soğutarak yoğuştırur. Sıvı faza dönüşüm sağlanır.", "(3) Genleşme valfi: Yüksek basınçlı sıvının basıncını düşürerek kısmi buharlaşma sağlar. TXV (termik genleşme valfi) veya EEV (elektronik genleşme valfi) kullanılır.", "(4) Evaporatör: Düşük basınçlı soğutucu, soğutulacak ortamdan ısı alarak tamamen buharlaşır."] }
      ],
      keyPoints: ["Çevrim Carnot ters çevriminin pratik uygulamasıdır.", "Kondenser sıcaklığı deniz suyu sıcaklığına bağlıdır.", "Sistem basınçları ve sıcaklıkları sürekli izlenmelidir."]
    },
    "Mollier (P-h) diyagramı okuma": {
      title: "Mollier (P-h) Diyagramı Okuma",
      introduction: "P-h (basınç-entalpi) diyagramı, soğutma çevriminin analizi ve arıza teşhisinde kullanılan en önemli araçtır.",
      sections: [
        { heading: "Diyagram Yapısı", paragraphs: ["Yatay eksen entalpi (kJ/kg), düşey eksen basınç (bar) değerini gösterir. Doyma eğrisi sıvı ve buhar bölgelerini ayırır. Sol taraf alt soğuma (subcooling), sağ taraf kızgın buhar (superheat) bölgesidir.", "Çevrim üzerinde dört süreç: evaporatör (yatay, düşük basınç), kompresör (yukarı, entropi artışı), kondenser (yatay, yüksek basınç), genleşme (düşey, izoentalpik)."] }
      ],
      keyPoints: ["Kompresör işi = h₂ − h₁ (entalpi farkı).", "Soğutma etkisi = h₁ − h₄ (evaporatördeki entalpi farkı).", "COP = soğutma etkisi / kompresör işi."]
    },
    "COP (Performans Katsayısı) hesabı": {
      title: "COP (Performans Katsayısı) Hesabı",
      introduction: "COP, soğutma sisteminin verimliliğini gösteren temel parametredir. Elde edilen soğutma etkisinin harcanan enerjiye oranıdır.",
      sections: [
        { heading: "COP Hesabı", paragraphs: ["Soğutma COP'u, evaporatördeki ısı alımının kompresör iş girdisine oranıdır."], formula: { expression: "COP = Q_evaporatör / W_kompresör = (h₁ − h₄) / (h₂ − h₁)", variables: ["h₁: Evaporatör çıkışı entalpisi", "h₂: Kompresör çıkışı entalpisi", "h₄: Genleşme valfi çıkışı entalpisi"] }, example: { problem: "Bir soğutma sisteminde h₁ = 400 kJ/kg, h₂ = 450 kJ/kg, h₃ = h₄ = 250 kJ/kg ise COP'u bulunuz.", steps: ["Q_evap = h₁ − h₄ = 400 − 250 = 150 kJ/kg", "W_komp = h₂ − h₁ = 450 − 400 = 50 kJ/kg", "COP = 150/50 = 3.0"], result: "COP = 3.0 (her 1 kW kompresör gücü ile 3 kW soğutma sağlanır)." } }
      ],
      keyPoints: ["COP > 1 olması beklenir; düşük COP arıza göstergesidir.", "Evaporatör ve kondenser sıcaklıkları COP'u doğrudan etkiler.", "Fouling, soğutucu eksikliği ve hava kaçağı COP'u düşürür."]
    },
    "CFC, HCFC ve HFC soğutucu gazlar": {
      title: "CFC, HCFC ve HFC Soğutucu Gazlar",
      introduction: "Soğutucu akışkanlar ozon tabakası ve küresel ısınma üzerindeki etkilerine göre sınıflandırılır ve düzenlenir.",
      sections: [
        { heading: "Sınıflandırma ve Düzenleme", paragraphs: [], table: { headers: ["Tip", "Örnekler", "ODP", "GWP", "Durum"], rows: [["CFC", "R-11, R-12", "Yüksek", "Yüksek", "Yasaklı (Montreal 1987)"], ["HCFC", "R-22", "Düşük", "Orta", "Kademeli çıkış (2030)"], ["HFC", "R-134a, R-404A", "0", "Yüksek", "Kigali ile kısıtlanıyor"], ["Doğal", "CO₂ (R-744), NH₃ (R-717)", "0", "0-1", "Teşvik ediliyor"]] } }
      ],
      keyPoints: ["ODP: Ozon Delme Potansiyeli, GWP: Küresel Isınma Potansiyeli.", "CFC ve HCFC gemilerde kullanımı yasaktır veya kademeli olarak kaldırılmaktadır.", "Soğutucu gaz kaçağı kayıt defterine işlenmelidir."]
    },
    "Klima sistemi bileşenleri": {
      title: "Klima Sistemi Bileşenleri",
      introduction: "Gemi klima sistemi, yaşam ve çalışma alanlarında konforlu sıcaklık ve nem koşullarını sağlayan entegre bir sistemdir.",
      sections: [
        { heading: "Ana Bileşenler", paragraphs: ["Merkezi soğutma ünitesi (chiller): Soğuk su üretir ve kapalı devre ile AHU'lara dağıtır.", "Hava İşleme Ünitesi (AHU): Filtre, soğutma/ısıtma serpantini, fan ve nemlilik kontrol bölümlerinden oluşur.", "Kanal sistemi: Şartlandırılmış havayı mahallere dağıtır.", "Taze hava girişi: IMO/SOLAS gereği minimum taze hava miktarı sağlanır."] }
      ],
      keyPoints: ["Yaşam alanlarında 22-25°C ve %40-60 bağıl nem hedeflenir.", "Makine kontrol odasında ayrı klima sistemi bulunur.", "Tropikal bölgelerde soğutma yükü önemli ölçüde artar."]
    }
  },

  // ═══════════════════════════════════════════════════════════════
  // ELEKTRONİK, ÖLÇME VE OTOMASYON
  // ═══════════════════════════════════════════════════════════════
  automation: {
    "Sıcaklık ölçüm sensörleri (termokuple, RTD)": {
      title: "Sıcaklık Ölçüm Sensörleri",
      introduction: "Sıcaklık, gemi makinelerinde en sık ölçülen parametredir. Termokupllar ve RTD'ler farklı uygulama alanlarına sahip iki temel sensör tipidir.",
      sections: [
        { heading: "Termokuple", paragraphs: ["İki farklı metalin birleşim noktalarındaki sıcaklık farkının yarattığı EMK'ya (Seebeck etkisi) dayanır. K tipi (Ni-Cr / Ni-Al) en yaygın olup -200°C ile 1260°C arasında kullanılır.", "Egzoz sıcaklığı, silindir kapağı sıcaklığı ve kazan sıcaklığı ölçümlerinde tercih edilir."], table: { headers: ["Tip", "Malzeme", "Aralık", "Kullanım"], rows: [["K", "Ni-Cr / Ni-Al", "-200...1260°C", "Egzoz, silindir"], ["J", "Fe / Cu-Ni", "-40...750°C", "Genel amaçlı"], ["T", "Cu / Cu-Ni", "-200...350°C", "Düşük sıcaklık"]] } },
        { heading: "RTD (Pt100/Pt1000)", paragraphs: ["Platinin elektrik direncinin sıcaklıkla doğrusal olarak değişmesine dayanır. Pt100 (0°C'de 100 Ω) en yaygın kullanılan tiptir. Yüksek doğruluk (±0.1°C) sağlar ancak yanıt süresi termokupla göre yavaştır.", "Soğutma suyu, yağlama yağı ve yaşam alanı sıcaklık ölçümlerinde kullanılır."] }
      ],
      keyPoints: ["Termokuple: Geniş aralık, hızlı yanıt, düşük doğruluk.", "RTD: Dar aralık, yavaş yanıt, yüksek doğruluk.", "3 telli veya 4 telli bağlantı kablo direnci hatasını azaltır."]
    },
    "Açık ve kapalı döngü kontrol": {
      title: "Açık ve Kapalı Döngü Kontrol",
      introduction: "Kontrol sistemleri geri besleme kullanımına göre açık ve kapalı döngü olarak ikiye ayrılır.",
      sections: [
        { heading: "Açık Döngü", paragraphs: ["Çıkış değeri izlenmez ve geri besleme yoktur. Operatör veya zamanlayıcı kontrol sinyali verir. Basit ve ucuz ama dış etkilere karşı hassastır. Örnek: zamanlayıcılı sintine pompası çalıştırma."] },
        { heading: "Kapalı Döngü", paragraphs: ["Çıkış sürekli ölçülür ve referans değerle karşılaştırılır. Fark (hata) kontrolcü tarafından düzeltme sinyaline dönüştürülür. Otomatik sıcaklık kontrolü, basınç regülasyonu ve hız kontrolü kapalı döngüdür."] }
      ],
      keyPoints: ["Gemi otomasyon sistemleri büyük ölçüde kapalı döngüdür.", "Kapalı döngü bozucu etkilere karşı dirençlidir.", "Kararsız kontrol sistemi salınıma yol açabilir."]
    },
    "PID kontrol algoritması": {
      title: "PID Kontrol Algoritması",
      introduction: "PID (Proportional-Integral-Derivative), endüstriyel kontrol sistemlerinde en yaygın kullanılan kontrol algoritmasıdır.",
      sections: [
        { heading: "PID Bileşenleri", paragraphs: ["P (Oransal): Hatanın büyüklüğüyle orantılı çıkış üretir. Kalıcı hata (offset) bırakır.", "I (İntegral): Hatanın zamanla toplamına göre çıkış üretir. Kalıcı hatayı sıfırlar ancak aşma (overshoot) ve salınım riski taşır.", "D (Türev): Hatanın değişim hızına göre çıkış üretir. Ani değişimlere hızlı yanıt verir ve aşmayı azaltır."], formula: { expression: "u(t) = Kp·e(t) + Ki·∫e(t)dt + Kd·de(t)/dt", variables: ["u(t): Kontrol çıkışı", "e(t): Hata (set point − ölçülen)", "Kp, Ki, Kd: Kontrol parametreleri"] } }
      ],
      keyPoints: ["P artırıldıkça yanıt hızlanır ama salınım artar.", "I artırıldıkça kalıcı hata azalır ama aşma artar.", "D artırıldıkça aşma azalır ama gürültüye hassasiyet artar."]
    },
    "PLC donanım yapısı ve I/O": {
      title: "PLC Donanım Yapısı ve I/O",
      introduction: "PLC (Programmable Logic Controller), gemi otomasyon sistemlerinin temel kontrol elemanıdır.",
      sections: [
        { heading: "Donanım Bileşenleri", paragraphs: ["CPU modülü: Program çalıştırma ve mantık işlemleri.", "Dijital giriş: Şalter, limit switch, alarm kontağı (ON/OFF sinyalleri).", "Dijital çıkış: Selenoid valf, kontaktör, alarm lambası kontrolü.", "Analog giriş: Sıcaklık (4-20 mA), basınç, seviye sensörleri.", "Analog çıkış: VFD hız komutu, kontrol valfi pozisyonu.", "Haberleşme modülü: Modbus, Profibus veya Ethernet ile üst sistem bağlantısı."] }
      ],
      keyPoints: ["PLC programı merdiven (ladder) diyagram ile yazılır.", "Arıza durumunda fail-safe konumuna geçiş sağlanmalıdır.", "I/O modülleri hot-swap özelliğine sahip olabilir."]
    },
    "Alarm ve izleme sistemi (AMS)": {
      title: "Alarm ve İzleme Sistemi (AMS)",
      introduction: "AMS, gemi makine parametrelerini sürekli izleyerek anormal durumlarda alarm veren ve kayıt tutan merkezi sistemdir.",
      sections: [
        { heading: "Sistem Yapısı", paragraphs: ["Sensörlerden gelen sinyaller I/O üniteleri aracılığıyla merkezi işlemciye iletilir. Set değerlerinin aşılması durumunda sesli/görsel alarm verilir. Bazı kritik alarmlarda otomatik durdurma (shutdown) veya yavaşlatma (slowdown) devreye girer.", "UMS (Unmanned Machinery Space) sertifikası için AMS zorunludur. Alarm köprüüstüne ve yaşam alanlarına uzatılmalıdır."] }
      ],
      keyPoints: ["Alarm öncelik seviyeleri: kritik, ciddi, uyarı.", "Alarm kaydı (log) denetim ve arıza analizi için saklanır.", "Dead man alarm (makine dairesi nöbetçi alarmı) UMS gereğidir."]
    }
  },

  // ═══════════════════════════════════════════════════════════════
  // MAKİNE DAİRESİ OPERASYONLARI
  // ═══════════════════════════════════════════════════════════════
  "engine-room-ops": {
    "Ana makine seyir hazırlık prosedürü": {
      title: "Ana Makine Seyir Hazırlık Prosedürü",
      introduction: "Seyir öncesi ana makinenin güvenli ve verimli çalışması için sistematik bir hazırlık prosedürü uygulanır.",
      sections: [
        { heading: "Hazırlık Adımları", paragraphs: [], bulletPoints: ["Yağlama yağı seviye ve basınç kontrolü; ön yağlama pompasını çalıştır.", "Soğutma suyu sistemlerini kontrol et; HT ve LT devrelerini sirküle et.", "Yakıt sistemini hazırla; settling/servis tank seviyelerini kontrol et.", "Başlatma havası şişe basıncını kontrol et (≥ 18-25 bar).", "Turning gear'i çıkar ve ana makineyi hava ile döndür (blow-through).", "Silindir yağlama sistemini çalıştır.", "Gösterge musluklarını aç ve hava ile deneme dönüşü yap.", "Tüm alarm ve güvenlik sistemlerini kontrol et.", "Köprüüstüne 'Makine Hazır' bildir."] }
      ],
      keyPoints: ["Blow-through su ve kalıntı birikimini temizler.", "Hazırlık süresi genellikle 2-4 saattir.", "Check list kullanımı zorunludur ve kayıt altına alınır."]
    },
    "Makine vardiyası devir-teslim": {
      title: "Makine Vardiyası Devir-Teslim",
      introduction: "Vardiya değişimi, makine dairesi operasyonlarının güvenli sürekliliği için kritik bir prosedürdür.",
      sections: [
        { heading: "Devir-Teslim Prosedürü", paragraphs: ["Devreden vardiyacı, tüm çalışan ekipmanların durumunu, devam eden bakım işlerini, alarm geçmişini ve bekleyen görevleri aktarır.", "Devralan vardiyacı, round atarak ana makine, yardımcı makineler, kazanlar, tank seviyeleri ve genel makine dairesi durumunu kontrol eder.", "Devir-teslim Engine Log Book'a kayıt edilir."] }
      ],
      keyPoints: ["Kritik bir operasyon sırasında vardiya değişimi yapılmaz.", "Devir-teslim sözlü ve yazılı olarak yapılmalıdır.", "ERM gereği devralan kişi durumsal farkındalık kazanmalıdır."]
    },
    "Blackout ve güç geri kazanımı": {
      title: "Blackout ve Güç Geri Kazanımı",
      introduction: "Blackout, tüm jeneratörlerin devre dışı kalmasıyla geminin tamamen elektriksiz kalmasıdır. En kritik acil durumlardan biridir.",
      sections: [
        { heading: "Blackout Prosedürü", paragraphs: ["1. Acil jeneratör otomatik devreye girer (45 saniye içinde).", "2. Blackout nedenini tespit et (aşırı yük, kısa devre, mekanik arıza).", "3. Ana baraya bir jeneratörü başlat ve yükle.", "4. Kritik yükleri sırayla devreye al: dümen makinesi, navigasyon, soğutma.", "5. Ana makineyi yeniden başlat (başlatma havası ile).", "6. Normal operasyona dön ve olay raporunu hazırla."] },
        { heading: "Önleme Tedbirleri", paragraphs: ["Preferential trip sistemi kritik olmayan yükleri otomatik keser.", "Güç yönetim sistemi (PMS) yük paylaşımını optimize eder.", "Düzenli blackout tatbikatı yapılmalıdır."] }
      ],
      keyPoints: ["Dümen makinesi elektriksiz kalırsa gemi manevra kabiliyetini yitirir.", "SOLAS gereği acil jeneratör ayrı bölmede ve kendi yakıtıyla çalışır.", "Blackout süresi mümkün olduğunca kısa tutulmalıdır."]
    },
    "Manevra modu geçiş prosedürü": {
      title: "Manevra Modu Geçiş Prosedürü",
      introduction: "Liman yaklaşımı ve dar kanal seyirlerinde makine dairesi manevra moduna geçer.",
      sections: [
        { heading: "Geçiş Prosedürü", paragraphs: ["1. Yedek jeneratörü devreye al.", "2. Yakıt değişimi gerekiyorsa HFO'dan MGO'ya geçiş yap.", "3. Dümen makinesi çift pompa çalıştır.", "4. Ana makineyi bridge control'den engine room control'e geçir (gerekirse).", "5. Başlatma havası basıncını kontrol et.", "6. Yedek soğutma, yağlama ve sintine pompalarını hazırla.", "7. Köprüüstüne 'Stand-by Engine' bildir."] }
      ],
      keyPoints: ["Manevra sırasında makine dairesinde nöbetçi sayısı artırılır.", "Ani yük değişimlerine hazır olunmalıdır.", "İletişim köprüüstü ile sürekli açık tutulur."]
    },
    "UMS (Unmanned Machinery Space) operasyonu": {
      title: "UMS Operasyonu",
      introduction: "UMS sertifikası, makine dairesinin belirli periyotlarda insansız bırakılabilmesine izin veren sınıflama onayıdır.",
      sections: [
        { heading: "UMS Gereklilikleri", paragraphs: ["Tüm kritik parametreler köprüüstünden izlenebilmelidir. Otomatik alarm ve güvenlik sistemleri eksiksiz çalışmalıdır. Dead man alarm, vardiyacının düzenli olarak sisteme yanıt vermesini gerektirir.", "Yangın algılama, otomatik durdurma, uzaktan kontrol ve yedek sistemler UMS sertifikasyonu için zorunludur."] }
      ],
      keyPoints: ["Gece seyirlerinde UMS modunda makine dairesi insansız bırakılabilir.", "15 dakikada bir dead man alarmına yanıt verilmelidir.", "Herhangi bir alarm durumunda nöbetçi zabit makine dairesine inmek zorundadır."]
    }
  },

  // ═══════════════════════════════════════════════════════════════
  // BAKIM VE TUTUM
  // ═══════════════════════════════════════════════════════════════
  maintenance: {
    "Arıza sonrası bakım (corrective)": {
      title: "Arıza Sonrası Bakım (Corrective Maintenance)",
      introduction: "Corrective maintenance, ekipman arızalandıktan sonra yapılan bakım türüdür. Plansız duruşlara yol açar ve maliyetli olabilir.",
      sections: [
        { heading: "Özellikler", paragraphs: ["Ekipman çalışamaz hale geldiğinde müdahale edilir. Yedek parça bulunurluğu, onarım süresi ve güvenlik riskleri kritik faktörlerdir.", "Kritik olmayan ekipmanlarda kabul edilebilir olsa da, ana makine veya jeneratör gibi kritik sistemlerde kabul edilemez."] }
      ],
      keyPoints: ["En pahalı bakım stratejisidir (plansız duruş maliyeti).", "Güvenlik açısından risklidir.", "Yalnızca düşük kritiklik seviyesindeki ekipmanlarda tercih edilir."]
    },
    "Planlı bakım (planned/preventive)": {
      title: "Planlı Bakım (Preventive Maintenance)",
      introduction: "Önleyici bakım, ekipmanın arıza yapmadan belirli aralıklarla bakıma alınmasıdır. Çalışma saati veya takvim bazlı programlanır.",
      sections: [
        { heading: "Uygulama", paragraphs: ["Motor üreticisi tavsiyeleri ve klas kuruluşu gereklilikleri doğrultusunda bakım aralıkları belirlenir. Tipik aralıklar: yağ filtresi değişimi (250-500 saat), silindir kapağı revizyonu (8000-16000 saat), piston çıkarma (16000-24000 saat).", "PMS yazılımı iş emirleri oluşturur, bakım geçmişini kaydeder ve yaklaşan bakımları hatırlatır."] }
      ],
      keyPoints: ["En yaygın bakım stratejisidir.", "Gereksiz bakım riski vardır (parça ömrü bitmeden değişim).", "Klas survey takvimi ile entegre planlanmalıdır."]
    },
    "Kestirimci bakım (predictive)": {
      title: "Kestirimci Bakım (Predictive Maintenance)",
      introduction: "Kestirimci bakım, ekipman durumunu sürekli izleyerek arıza belirtilerini önceden tespit etmeye dayalı stratejedir.",
      sections: [
        { heading: "İzleme Yöntemleri", paragraphs: [], table: { headers: ["Yöntem", "Ölçülen Parametre", "Tespit Edilen Arıza"], rows: [["Titreşim analizi", "Frekans, genlik", "Yatak aşınması, dengesizlik"], ["Yağ analizi", "Metal partiküller, viskozite", "Aşınma, kontaminasyon"], ["Termal görüntüleme", "Yüzey sıcaklığı", "Aşırı ısınma, elektrik arızası"], ["Ultrasonik ölçüm", "Kalınlık", "Korozyon, erozyon"], ["Performans izleme", "SFOC, egzoz sıcaklığı", "Yanma bozukluğu"]] } }
      ],
      keyPoints: ["En maliyet-etkin bakım stratejisidir.", "Yatırım maliyeti yüksek ama uzun vadede tasarruf sağlar.", "Dijitalleşme ile birlikte yaygınlaşmaktadır."]
    },
    "Silindir kapağı söküm ve revizyon": {
      title: "Silindir Kapağı Söküm ve Revizyon",
      introduction: "Silindir kapağı revizyonu, ana makine bakım programının en önemli işlerinden biridir. Genellikle 8000-16000 çalışma saatinde yapılır.",
      sections: [
        { heading: "Söküm Prosedürü", paragraphs: ["1. İlgili silindiri izole et (yakıt, hava, soğutma suyu kapatma).", "2. İndikatör musluğunu aç, başlatma havası kapatma valfini kapat.", "3. Kapak cıvatalarını (stud) tork sırasıyla gevşet.", "4. Hidrolik jack ile kapağı kaldır.", "5. Enjektör, egzoz supabı ve güvenlik supabını sök.", "6. Soğutma suyu kanallarını ve oturma yüzeylerini temizle.", "7. Çatlak kontrolü (PT veya MPI) yap.", "8. Supap oturma yüzeyini taşla (lapping/grinding)."] }
      ],
      keyPoints: ["Kapak cıvataları belirtilen tork değerlerine uyularak sıkılmalıdır.", "Soğutma suyu kanallarındaki kabuk temizlenmezse aşırı ısınma oluşur.", "Supap oturma yüzeyinin durumu yanma kalitesini doğrudan etkiler."]
    },
    "Krank mili saptırma (deflection) ölçümü": {
      title: "Krank Mili Saptırma (Deflection) Ölçümü",
      introduction: "Deflection ölçümü, krank mili hizalamasının ve ana yatak durumunun en önemli göstergesidir. Düzenli aralıklarla yapılması zorunludur.",
      sections: [
        { heading: "Ölçüm Yöntemi", paragraphs: ["Deflection gauge (dial indicator), her silindirin krank kolları arasına yerleştirilir. Krank mili turning gear ile 360° döndürülerek 4 veya 5 pozisyonda (ÜÖN, sancak, AÖN, iskele ve alt) okunur.", "Okunan değerlerden maksimum ve minimum fark hesaplanır. Bu fark üretici tarafından belirlenen limitlerin altında olmalıdır."] },
        { heading: "Değerlendirme", paragraphs: ["Fark değeri limiti aşıyorsa yatak aşınması, bedplate deformasyonu veya şaft hizalaması bozukluğu düşünülmelidir. Motor çalıştırılmamalı ve klas kuruluşuna bildirilmelidir."] }
      ],
      keyPoints: ["Ölçüm soğuk ve sıcak motorla ayrı ayrı yapılır.", "Tüm silindirlerin değerleri karşılaştırmalı olarak değerlendirilir.", "Limit aşımı motor durdurma gerektiren ciddi bir durumdur."]
    },
    "Ultrasonik kalınlık ölçümü": {
      title: "Ultrasonik Kalınlık Ölçümü",
      introduction: "Ultrasonik kalınlık ölçümü, metal parçalardaki korozyon ve erozyona bağlı incelmeyi tahribatsız olarak tespit eden yöntemdir.",
      sections: [
        { heading: "Çalışma Prensibi", paragraphs: ["Ultrasonik ses dalgaları malzeme içinde ilerler ve arka yüzeyden yansır. Gönderme ve yansıma arasındaki zaman farkından kalınlık hesaplanır.", "Gemi boru hatları, tank duvarları, kazan boruları ve liner kalınlık ölçümlerinde yaygın olarak kullanılır."] }
      ],
      keyPoints: ["Minimum kalınlık değerleri klas kuruluşu kurallarıyla belirlenir.", "Yüzey hazırlığı (temizlik, pürüzsüzlük) ölçüm doğruluğunu etkiler.", "Korozyon hızı trendi takip edilerek kalan ömür hesaplanabilir."]
    }
  },

  // ═══════════════════════════════════════════════════════════════
  // ÇEVRE VE MARPOL – MAKİNE
  // ═══════════════════════════════════════════════════════════════
  "environment-machine": {
    "MARPOL sözleşmesi tarihçesi": {
      title: "MARPOL Sözleşmesi Tarihçesi",
      introduction: "MARPOL (Maritime Pollution), deniz kirliliğinin önlenmesine yönelik en kapsamlı uluslararası sözleşmedir.",
      sections: [
        { heading: "Tarihsel Gelişim", paragraphs: ["1973'te kabul edilmiş, 1978 protokolüyle birleştirilerek MARPOL 73/78 olarak yürürlüğe girmiştir. Altı ek (Annex I-VI) içerir ve her ek farklı kirlilik kaynağını düzenler.", "Sözleşme, büyük tanker kazalarının (Torrey Canyon 1967, Amoco Cadiz 1978) ardından güçlendirilmiştir."] }
      ],
      keyPoints: ["Annex I ve II zorunlu, Annex III-VI isteğe bağlı başlayıp sonra zorunlu olmuştur.", "IMO MEPC (Marine Environment Protection Committee) düzenlemeleri günceller.", "Bayrak devleti ve liman devleti kontrolleri uygulamayı denetler."]
    },
    "Yağ-su ayırıcı (OWS) 15 ppm standardı": {
      title: "Yağ-Su Ayırıcı (OWS) – 15 ppm Standardı",
      introduction: "OWS, sintine suyundaki yağ içeriğini 15 ppm altına indirerek denize güvenli deşarj sağlayan zorunlu ekipmandır.",
      sections: [
        { heading: "Çalışma Prensibi", paragraphs: ["Birinci aşamada kaba ayırma (yerçekimi ve koaleser), ikinci aşamada ince ayırma (membran veya absorbsiyon) yapılır. Çıkış ODMCS tarafından sürekli izlenir.", "15 ppm aşıldığında otomatik olarak gemi içi resirkülasyon devreye girer ve denize deşarj kesilir."] }
      ],
      keyPoints: ["OWS bypass edilmesi ciddi suç teşkil eder.", "Magic pipe kullanımı tespit edildiğinde gemi alıkonulur.", "ODMCS kaydı PSC tarafından kontrol edilir."]
    },
    "Kükürt limitleri (global 0.50%, ECA 0.10%)": {
      title: "Kükürt Limitleri",
      introduction: "MARPOL Annex VI, deniz yakıtlarındaki kükürt içeriğini küresel ve bölgesel olarak sınırlar.",
      sections: [
        { heading: "Yürürlükteki Limitler", paragraphs: [], table: { headers: ["Bölge", "Kükürt Limiti", "Yürürlük"], rows: [["Global", "≤ 0.50%", "1 Ocak 2020"], ["ECA (SOx)", "≤ 0.10%", "1 Ocak 2015"], ["EU limanları", "≤ 0.10%", "Limanda"]] } },
        { heading: "Uyum Yöntemleri", paragraphs: ["1. Düşük kükürtlü yakıt (VLSFO veya MGO) kullanımı.", "2. Egzoz gazı yıkama sistemi (scrubber) ile HFO kullanımı.", "3. LNG veya alternatif yakıta geçiş."] }
      ],
      keyPoints: ["ECA bölgeleri: Baltık, Kuzey Denizi, Kuzey Amerika, Karayipler.", "Fuel changeover kaydı ve BDN denetim belgesidir.", "Scrubber yıkama suyu deşarjı da düzenlemeye tabidir."]
    },
    "NOx Tier I, II, III standartları": {
      title: "NOx Tier I, II, III Standartları",
      introduction: "MARPOL Annex VI, deniz dizel motorlarından kaynaklanan NOx emisyonlarını motor yapım tarihine ve bölgeye göre sınırlar.",
      sections: [
        { heading: "Tier Seviyeleri", paragraphs: [], table: { headers: ["Tier", "Yapım Tarihi", "Limit (n < 130 rpm)", "Limit (n ≥ 2000 rpm)"], rows: [["Tier I", "2000-2010", "17.0 g/kWh", "9.8 g/kWh"], ["Tier II", "2011+", "14.4 g/kWh", "7.7 g/kWh"], ["Tier III", "2016+ (ECA)", "3.4 g/kWh", "2.0 g/kWh"]] } },
        { heading: "Tier III Uyum", paragraphs: ["EGR (Exhaust Gas Recirculation): Egzoz gazının bir kısmını emme havasına karıştırarak yanma sıcaklığını düşürür.", "SCR (Selective Catalytic Reduction): Üre (AdBlue) enjeksiyonu ile katalizör üzerinde NOx'i N₂ ve H₂O'ya dönüştürür."] }
      ],
      keyPoints: ["Tier III yalnızca NOx ECA bölgelerinde geçerlidir.", "EIAPP sertifikası motor üreticisi tarafından düzenlenir.", "SCR katalizör ömrü 20000-40000 saat arasındadır."]
    },
    "Balast su sözleşmesi (BWM Convention)": {
      title: "Balast Su Sözleşmesi (BWM Convention)",
      introduction: "Balast su yönetimi sözleşmesi, gemilerin balast suyuyla taşıdığı istilacı türlerin yayılmasını önlemeyi amaçlar.",
      sections: [
        { heading: "D-1 ve D-2 Standartları", paragraphs: ["D-1 (Değişim standardı): Açık denizde (kıyıdan 200 deniz mili, derinlik > 200 m) balast suyu değişimi. En az %95 hacimsel değişim gerekir.", "D-2 (Performans standardı): Balast su arıtma sistemi ile belirli organizma limitleri sağlanmalıdır. Tüm gemiler kademeli olarak D-2'ye geçmektedir."] }
      ],
      keyPoints: ["BWTS (Ballast Water Treatment System) artık zorunludur.", "UV, elektroliz, filtrasyon+dezenfeksiyon teknolojileri kullanılır.", "Balast su kayıt defteri tutulması ve PSC denetimine sunulması zorunludur."]
    },
    "Çöp yönetim planı (Garbage Management Plan)": {
      title: "Çöp Yönetim Planı",
      introduction: "MARPOL Annex V, gemilerden çöp deşarjını düzenler. Her gemide onaylanmış çöp yönetim planı ve çöp kayıt defteri bulunmalıdır.",
      sections: [
        { heading: "Çöp Sınıflandırması", paragraphs: [], table: { headers: ["Kategori", "Denize Atım"], rows: [["Plastik", "Kesinlikle yasak"], ["Yiyecek atığı", "Kıyıdan > 12 mil (öğütülmüş > 3 mil)"], ["Kâğıt/bez", "Kıyıdan > 12 mil"], ["Cam/metal", "Kıyıdan > 12 mil"], ["Kül (incinerator)", "Kıyıdan > 12 mil"], ["Yemeklik yağ", "Kıyıdan > 12 mil"]] } },
        { heading: "Özel Alanlar", paragraphs: ["Akdeniz, Baltık, Karadeniz gibi özel alanlarda yiyecek atığı dahil çoğu çöpün denize atımı yasaktır. Tüm atıklar liman alım tesislerine verilmelidir."] }
      ],
      keyPoints: ["Plastik dahil hiçbir sentetik malzeme denize atılamaz.", "Çöp kayıt defteri 2 yıl boyunca gemide saklanır.", "Incinerator kapasitesi ve çöp depolama alanı yeterli olmalıdır."]
    }
  },

  // ═══════════════════════════════════════════════════════════════
  // ENGINE RESOURCE MANAGEMENT
  // ═══════════════════════════════════════════════════════════════
  erm: {
    "ERM nedir ve neden gereklidir": {
      title: "ERM Nedir ve Neden Gereklidir",
      introduction: "Engine Resource Management (ERM), makine dairesi ekibinin mevcut kaynakları etkin ve güvenli şekilde yönetmesini sağlayan yapılandırılmış bir yaklaşımdır.",
      sections: [
        { heading: "Tanım ve Amaç", paragraphs: ["ERM, köprüüstündeki Bridge Resource Management (BRM) kavramının makine dairesine uyarlanmış halidir. İnsan hatalarını azaltmak, ekip koordinasyonunu güçlendirmek ve güvenlik kültürünü geliştirmek amacıyla STCW Convention tarafından zorunlu kılınmıştır.", "ERM, teknik bilgi ve becerinin ötesinde iletişim, liderlik, karar verme ve stres yönetimi gibi 'teknik olmayan becerileri' kapsar."] }
      ],
      keyPoints: ["STCW 2010 Manila değişiklikleriyle zorunlu hale gelmiştir.", "Deniz kazalarının %80'inden fazlası insan faktörüyle ilişkilidir.", "ERM eğitimi ve değerlendirmesi yetkinlik sertifikasyonunun parçasıdır."]
    },
    "Situational awareness (durumsal farkındalık)": {
      title: "Durumsal Farkındalık (Situational Awareness)",
      introduction: "Durumsal farkındalık, çevredeki bilgilerin algılanması, anlamlandırılması ve gelecekteki durumun öngörülmesi yeteneğidir.",
      sections: [
        { heading: "Üç Seviye (Endsley Modeli)", paragraphs: ["Seviye 1 – Algılama: Mevcut durumu fark etmek (alarm, sıcaklık değişimi, gürültü).", "Seviye 2 – Anlama: Algılanan bilgilerin ne anlama geldiğini kavramak (sıcaklık artışı → olası aşırı yükleme).", "Seviye 3 – Öngörme: Gelecekte ne olacağını tahmin etmek (önlem alınmazsa arıza olacak)."] },
        { heading: "Farkındalık Kaybı Nedenleri", paragraphs: [], bulletPoints: ["Yorgunluk ve uyku eksikliği.", "Dikkat dağıtıcılar (telefon, konuşma).", "Aşırı bilgi yükü veya monotonluk.", "Otomasyon bağımlılığı (complacency).", "Stres ve zaman baskısı."] }
      ],
      keyPoints: ["Durumsal farkındalık kaybı birçok deniz kazasının temel nedenidir.", "Düzenli round atma ve parametre izleme farkındalığı korur.", "Ekip üyeleri birbirlerinin farkındalığını çapraz kontrol etmelidir."]
    },
    "DECIDE modeli": {
      title: "DECIDE Modeli",
      introduction: "DECIDE, yapılandırılmış karar verme sürecini adım adım yönlendiren bir modeldir.",
      sections: [
        { heading: "Adımlar", paragraphs: [], bulletPoints: ["D – Detect: Sorunu veya değişikliği tespit et.", "E – Estimate: Durumun ciddiyetini ve aciliyetini değerlendir.", "C – Choose: Müdahale seçeneklerini belirle.", "I – Identify: En uygun seçeneği seç.", "D – Do: Kararı uygula.", "E – Evaluate: Sonuçları değerlendir ve gerekirse düzelt."] }
      ],
      keyPoints: ["Yapılandırılmış karar verme hata riskini azaltır.", "Acil durumlarda kısa versiyonu uygulanabilir.", "Tüm ekip karar sürecine dahil edilmelidir."]
    },
    "Liderlik tarzları ve durumsal liderlik": {
      title: "Liderlik Tarzları ve Durumsal Liderlik",
      introduction: "Makine dairesi operasyonlarında etkili liderlik, ekip yönetimi ve güvenlik için temel yetkinliktir.",
      sections: [
        { heading: "Liderlik Tarzları", paragraphs: [], table: { headers: ["Tarz", "Özellik", "Uygun Durum"], rows: [["Otoriter", "Lider karar verir, sorgulanmaz", "Acil durum, yangın"], ["Demokratik", "Ekip görüşü alınır", "Bakım planlaması, problem çözme"], ["Delege eden", "Sorumluluk aktarılır", "Deneyimli ekip, rutin işler"], ["Koçluk", "Öğretme ve geliştirme odaklı", "Stajyer ve yeni personel eğitimi"]] } }
      ],
      keyPoints: ["Durumsal liderlik, koşullara göre tarz değiştirmeyi gerektirir.", "Acil durumlarda otoriter tarz, planlamada demokratik tarz uygundur.", "Otorite gradyanı çok yüksek olursa ekip geri bildirim veremez."]
    }
  },

  // ═══════════════════════════════════════════════════════════════
  // ENERJİ VERİMLİLİĞİ
  // ═══════════════════════════════════════════════════════════════
  "energy-efficiency": {
    "IMO GHG stratejisi ve hedefler": {
      title: "IMO GHG Stratejisi ve Hedefler",
      introduction: "IMO, denizcilikten kaynaklanan sera gazı emisyonlarının azaltılması için kapsamlı bir strateji benimsemiştir.",
      sections: [
        { heading: "Hedefler", paragraphs: ["2023'te güncellenen IMO GHG stratejisi, 2008 seviyelerine göre 2030'a kadar toplam GHG emisyonlarında en az %20 (hedef %30) azalma ve 2050'ye kadar net sıfır emisyon hedefi koymuştur.", "Kısa vadeli tedbirler (EEXI, CII), orta vadeli tedbirler (karbon vergilendirme, alternatif yakıtlar) ve uzun vadeli tedbirler (sıfır karbonlu yakıtlar) olmak üzere aşamalı bir yaklaşım izlenmektedir."] }
      ],
      keyPoints: ["2050 net sıfır hedefi denizcilik sektörünü köklü olarak dönüştürecektir.", "Alternatif yakıtlar: LNG, metanol, amonyak, hidrojen.", "Karbon fiyatlandırma mekanizması (MBM) tartışılmaktadır."]
    },
    "EEDI (Enerji Verimliliği Tasarım İndeksi)": {
      title: "EEDI (Energy Efficiency Design Index)",
      introduction: "EEDI, yeni inşa gemilerin tonaj-mil başına CO₂ emisyonunu sınırlayan zorunlu teknik göstergedir.",
      sections: [
        { heading: "EEDI Formülü", paragraphs: ["EEDI = (Güç × SFOC × C_F) / (Kapasite × Hız) olarak basitleştirilmiş formülle ifade edilir. Gerçek hesap çok daha karmaşıktır ve IMO MEPC yönergelerine uyulmalıdır."], formula: { expression: "EEDI = (P × SFC × C_F) / (DWT × V_ref)  [g CO₂ / ton·mil]", variables: ["P: Motor gücü (kW)", "SFC: Özgül yakıt tüketimi (g/kWh)", "C_F: Yakıt karbon faktörü", "DWT: Dedveyt (ton)", "V_ref: Referans hız (knot)"] } },
        { heading: "Faz Gereklilikleri", paragraphs: [], table: { headers: ["Faz", "Yürürlük", "İndirim"], rows: [["Faz 0", "2013", "Referans hattı"], ["Faz 1", "2015", "%10"], ["Faz 2", "2020", "%20"], ["Faz 3", "2025", "%30-50 (gemi tipine göre)"]] } }
      ],
      keyPoints: ["EEDI yalnızca yeni inşa gemilere uygulanır.", "Mevcut gemiler için EEXI (benzer ancak mevcut filoya uygulanan) kullanılır.", "Motor güç sınırlaması (EPL) EEXI uyumu için yaygın yöntemdir."]
    },
    "CII (Karbon Yoğunluğu Göstergesi)": {
      title: "CII (Carbon Intensity Indicator)",
      introduction: "CII, mevcut gemilerin yıllık operasyonel karbon yoğunluğunu ölçen ve A-E ölçeğinde derecelendiren göstergedir.",
      sections: [
        { heading: "CII Hesabı", paragraphs: ["CII = Yıllık CO₂ emisyonu / (DWT × Mesafe) olarak hesaplanır. Sonuç referans değerle karşılaştırılarak A (çok iyi) ile E (çok kötü) arasında derecelendirilir."], formula: { expression: "CII = Toplam CO₂ (g) / (Kapasite × Mesafe)  [g CO₂ / ton·mil]", variables: [] } },
        { heading: "Derecelendirme ve Sonuçları", paragraphs: ["A ve B derecesi teşvik edilir; D derecesi düzeltici eylem planı gerektirir; art arda 3 yıl D veya 1 yıl E alınması durumunda güçlendirilmiş SEEMP hazırlanmalıdır.", "Referans değerler her yıl %2 sıkılaştırılır."] }
      ],
      keyPoints: ["CII 5000 GT üzeri tüm gemilere uygulanır.", "Slow steaming, trim optimizasyonu ve rota planlaması CII'yi iyileştirir.", "Liman bekleme süreleri CII'yi olumsuz etkiler."]
    },
    "Hız optimizasyonu (slow steaming)": {
      title: "Hız Optimizasyonu (Slow Steaming)",
      introduction: "Slow steaming, gemi hızını düşürerek yakıt tüketimini ve emisyonları önemli ölçüde azaltan operasyonel verimlilik yöntemidir.",
      sections: [
        { heading: "Verimlilik Etkisi", paragraphs: ["Yakıt tüketimi yaklaşık olarak hızın küpüyle orantılıdır. Hızın %10 azaltılması yakıt tüketimini yaklaşık %27 düşürür.", "Motor yükü düştüğünde SFOC (özgül yakıt tüketimi) artar, ancak toplam tüketim yine de azalır."], formula: { expression: "Yakıt tüketimi ∝ V³  →  FC₂/FC₁ ≈ (V₂/V₁)³", variables: ["V: Gemi hızı (knot)", "FC: Yakıt tüketimi"] }, example: { problem: "Bir gemi 14 knot'ta günde 45 ton yakıt tüketiyorsa, 12 knot'ta tahmini tüketimi nedir?", steps: ["FC₂ = FC₁ × (V₂/V₁)³ = 45 × (12/14)³", "FC₂ = 45 × (0.857)³ = 45 × 0.630 = 28.3 ton/gün"], result: "12 knot'ta yakıt tüketimi yaklaşık 28.3 ton/gündür (%37 tasarruf)." } }
      ],
      keyPoints: ["Slow steaming en etkili CO₂ azaltma yöntemidir.", "Motor üreticisi tavsiyesinin altına düşülmemelidir (minimum yük %25-30).", "Düşük yükte silindir durumu ve turboşarj performansı izlenmelidir."]
    },
    "SEEMP (Gemi Enerji Verimliliği Yönetim Planı)": {
      title: "SEEMP (Ship Energy Efficiency Management Plan)",
      introduction: "SEEMP, geminin enerji verimliliğini sürekli iyileştirmek için hazırlanan zorunlu yönetim planıdır.",
      sections: [
        { heading: "SEEMP Yapısı", paragraphs: ["Part I: Enerji verimliliği tedbirleri planı (≥400 GT tüm gemiler). Hız optimizasyonu, trim optimizasyonu, bakım, rota planlaması gibi operasyonel tedbirleri kapsar.", "Part II: Yakıt tüketimi veri toplama ve raporlama planı — IMO DCS (Data Collection System), 5000 GT üzeri gemiler.", "Part III (MEPC.346(78)): CII uygulama planı — 5000 GT üzeri gemiler. Hedef yıllık CII derecesine ulaşmak için uygulanacak tedbirleri içerir; üst üste 3 yıl D veya 1 yıl E derecesi alan gemiler için düzeltici eylem planı zorunludur."] }
      ],
      keyPoints: ["SEEMP gemide bulundurulması zorunlu belgedir.", "PSC denetimlerinde kontrol edilir.", "Sürekli iyileştirme döngüsü (Plan-Do-Check-Act) uygulanır."]
    }
  }
};

export default content2;
