export interface FluidTopicContent {
  title: string;
  introduction: string;
  content: string;
  bulletPoints?: string[];
  formula?: {
    name: string;
    expression: string;
    description: string;
  };
  keyPoints?: string[];
}

export const fluidMechanicsTopicContents: Record<string, FluidTopicContent> = {
  // ═══════════════════════════════════════════════════════════════
  // MEVCUT İÇERİKLER
  // ═══════════════════════════════════════════════════════════════
  "pressure-pascal": {
    title: "Basınç ve Pascal Prensibi",
    introduction:
      "Basınç, bir yüzeye etkiyen kuvvetin o yüzey alanına oranıdır. Akışkanlar basıncı her yöne eşit iletir; bu prensip hidrolik sistemlerin temelidir.",
    content:
      "Denizcilik uygulamalarında hidrolik dümen sistemleri, vinçler ve kapak tahrikleri bu prensibe dayanır. Basınç artışı akışkanın her noktasına aynı şekilde iletildiği için kuvvet büyütme mümkün olur.",
    bulletPoints: [
      "Basınç skaler bir büyüklüktür ve tüm yönlere eşit etki eder.",
      "Hidrolik sistemlerde küçük pistonla büyük kuvvet üretilebilir.",
    ],
    formula: {
      name: "Basınç",
      expression: "p = F / A",
      description: "Basınç = Kuvvet / Alan",
    },
    keyPoints: [
      "Basınç birimi Pa (N/m²) olarak alınır.",
      "Kapalı akışkanlarda basınç kaybı tüm noktaları etkiler.",
    ],
  },
  "hydrostatic-pressure": {
    title: "Hidrostatik Basınç Dağılımı",
    introduction:
      "Durgun bir akışkanda basınç derinlikle doğru orantılı artar. Deniz suyu basıncı gemi yapısal tasarımında belirleyici bir etkendir.",
    content:
      "Gövde sacları, balast tankları ve deniz suyu girişleri belirli derinliklerdeki basınca göre boyutlandırılır. Hidrostatik basınç, serbest yüzeyden itibaren doğrusal artış gösterir.",
    bulletPoints: [
      "Derinlik arttıkça basınç lineer artar.",
      "Yoğunluk sabit varsayılırsa hesaplama basitleşir.",
    ],
    formula: {
      name: "Hidrostatik Basınç",
      expression: "p = p₀ + ρ·g·h",
      description: "Derinlik h'deki basınç, serbest yüzey basıncına eklenir.",
    },
  },
  "continuity-equation": {
    title: "Süreklilik Denklemi",
    introduction:
      "Sürekli akışta kütle korunur. Bir kesitten giren akış miktarı, diğer kesitten çıkan akış miktarına eşittir.",
    content:
      "Sürekli akış varsayımıyla, boru çapı küçüldüğünde hız artar. Bu ilişki, deniz suyu pompaları ve boru hatlarının tasarımında kritik öneme sahiptir.",
    bulletPoints: [
      "Sıkıştırılamaz akışlarda debi sabittir.",
      "Kesit alanı küçüldükçe hız artar.",
    ],
    formula: {
      name: "Debi",
      expression: "Q = A · V",
      description: "Debi = Kesit alanı × Ortalama hız",
    },
  },
  bernoulli: {
    title: "Bernoulli Denklemi",
    introduction:
      "Enerji korunumu prensibi, akışkanın hız, basınç ve yükseklik enerjileri arasında ilişki kurar.",
    content:
      "Boru hatlarında veya nozullarda hız artışı genellikle basınç düşüşü ile dengelenir. Kayıplar eklendiğinde gerçek sistem davranışı elde edilir.",
    formula: {
      name: "Bernoulli",
      expression: "p/γ + V²/2g + z = sabit",
      description: "Basınç, hız ve yükseklik enerjilerinin toplamı korunur.",
    },
    keyPoints: [
      "Gerçek sistemlerde kayıp terimleri eklenir.",
      "Aynı akım çizgisi üzerinde uygulanır.",
    ],
  },
  reynolds: {
    title: "Reynolds Sayısı ve Akış Rejimi",
    introduction:
      "Reynolds sayısı, ataletsel ve viskoz kuvvetlerin oranıdır. Akışın laminer mi türbülanslı mı olduğunu belirler.",
    content:
      "Denizcilikte soğutma suyu, yakıt ve yağ devrelerinde Reynolds sayısı kontrol edilerek boru içi kayıplar ve ısı transferi değerlendirilir.",
    formula: {
      name: "Reynolds",
      expression: "Re = (ρ · V · D) / μ",
      description: "Reynolds sayısı akış rejimini belirler.",
    },
    bulletPoints: [
      "Re < 2300 genellikle laminer akış kabul edilir.",
      "Re > 4000 türbülanslı akış aralığıdır.",
    ],
  },
  "darcy-weisbach": {
    title: "Darcy–Weisbach Eşitliği",
    introduction:
      "Boru içi sürtünmeden kaynaklanan yük kaybı, Darcy–Weisbach eşitliğiyle ifade edilir.",
    content:
      "Pompa seçimi yapılırken toplam yük kaybı bu eşitlik ile hesaplanır ve sistem eğrisi oluşturulur.",
    formula: {
      name: "Sürtünme Kaybı",
      expression: "hf = f · (L/D) · (V²/2g)",
      description: "Boru sürtünme kaybı, sürtünme faktörü ve hız karesine bağlıdır.",
    },
  },
  "npsh-cavitation": {
    title: "NPSH ve Kavitasyon",
    introduction:
      "Pompa girişindeki basınç, akışkanın buharlaşma basıncının altına düşerse kavitasyon oluşur.",
    content:
      "Kavitasyon; titreşim, gürültü ve çark hasarı gibi sonuçlar doğurur. NPSH değerleri, emniyetli çalışma sınırını belirler.",
    bulletPoints: [
      "Emme hattı kayıpları NPSH'yi düşürür.",
      "Soğuk akışkanlar genellikle daha düşük buhar basıncına sahiptir.",
    ],
  },
  "pump-power": {
    title: "Pompa Güç Hesabı",
    introduction:
      "Pompa gücü, akışkanın taşınması için gereken hidrolik gücün verimle düzeltilmiş halidir.",
    content:
      "Gemi makinelerinde soğutma suyu ve balast pompaları seçilirken debi, toplam yük ve verim birlikte değerlendirilir.",
    formula: {
      name: "Pompa Gücü",
      expression: "P = (ρ · g · Q · H) / η",
      description: "Hidrolik güç, pompa verimine bölünerek şaft gücü bulunur.",
    },
    keyPoints: [
      "Verim düştükçe gereken güç artar.",
      "Toplam yük, statik + dinamik kayıpları içerir.",
    ],
  },
  "venturi-orifice": {
    title: "Venturi ve Orifis Prensibi",
    introduction:
      "Akışın daralan kesitte hızlanması basınç düşüşü yaratır. Bu basınç farkı ile debi ölçülür.",
    content:
      "Venturi metreler düşük kayıp nedeniyle enerji verimlidir; orifis plakaları daha basit fakat kayıpları yüksektir.",
    bulletPoints: [
      "Basınç farkı ölçümü kalibrasyonla ilişkilendirilir.",
      "Akış yönü ve düz boru uzunluğu ölçüm hassasiyetini etkiler.",
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // YENİ İÇERİKLER
  // ═══════════════════════════════════════════════════════════════
  "fluid-definition": {
    title: "Akışkan Tanımı ve Sınıflandırma",
    introduction:
      "Akışkan, kendisine uygulanan kayma gerilmesi ne kadar küçük olursa olsun sürekli şekil değiştiren maddedir. Sıvılar ve gazlar bu tanım kapsamında akışkan olarak sınıflandırılır.",
    content:
      "Katılarda kayma gerilmesine karşı direnç sonlu bir deformasyonla dengelenir; akışkanlarda ise kayma gerilmesi devam ettiği sürece deformasyon da sürer. Bu temel fark, akışkan mekaniğini katı mekaniğinden ayıran başlıca özelliktir.\n\nAkışkanlar iki ana gruba ayrılır. Sıvılar belirli bir hacme sahiptir ve serbest yüzey oluşturur; gazlar ise bulundukları kabı tamamen doldurur ve belirgin bir serbest yüzeyleri yoktur. Deniz suyu, yakıt, yağlama yağı ve hidrolik yağ gemi sistemlerinde karşılaşılan başlıca sıvılardır. Hava, egzoz gazı ve soğutucu akışkan buharı ise gaz örnekleridir.\n\nNewton akışkanlarında kayma gerilmesi ile kayma hızı arasında doğrusal bir ilişki vardır ve orantı katsayısı dinamik viskozitedir. Su, hava ve hafif yağlar Newton akışkanı olarak modellenir. Newton dışı akışkanlarda bu ilişki doğrusal değildir; ağır yakıt yağı (HFO) düşük sıcaklıklarda Newton dışı davranış gösterebilir.",
    formula: {
      name: "Newton Viskozite Yasası",
      expression: "τ = μ · (dV/dy)",
      description: "Kayma gerilmesi = Dinamik viskozite × Hız gradyanı",
    },
    keyPoints: [
      "Akışkan, kayma gerilmesi altında sürekli deforme olan maddedir.",
      "Sıvılar sabit hacme sahiptir; gazlar bulundukları kabı doldurur.",
      "Newton akışkanlarında τ-dV/dy ilişkisi doğrusaldır.",
      "Gemi yakıt ve yağ sistemlerinde viskozite kontrolü kritik öneme sahiptir.",
    ],
  },
  "density-viscosity": {
    title: "Yoğunluk, Özgül Ağırlık ve Viskozite",
    introduction:
      "Yoğunluk, özgül ağırlık ve viskozite, akışkanların fiziksel davranışını belirleyen üç temel özelliktir. Bu parametreler boru hattı tasarımı, pompa seçimi ve yakıt işleme süreçlerinde doğrudan kullanılır.",
    content:
      "Yoğunluk (ρ), birim hacimdeki kütle miktarıdır ve kg/m³ biriminde ifade edilir. Tatlı suyun yoğunluğu 1000 kg/m³, deniz suyunun yoğunluğu yaklaşık 1025 kg/m³, HFO yakıtın yoğunluğu 15°C'de 920-1010 kg/m³ arasında değişir.\n\nÖzgül ağırlık (γ), birim hacimdeki ağırlık olup γ = ρ·g bağıntısıyla hesaplanır. Bağıl yoğunluk (SG) ise akışkanın yoğunluğunun referans akışkan (genellikle 4°C'deki saf su) yoğunluğuna oranıdır.\n\nViskozite, akışkanın iç sürtünme direncidir. Dinamik viskozite (μ) Pa·s, kinematik viskozite (ν) m²/s birimindedir. Kinematik viskozite, dinamik viskozitenin yoğunluğa oranıdır: ν = μ/ρ. Denizcilik uygulamalarında kinematik viskozite centistokes (cSt = mm²/s) biriminde yaygın olarak kullanılır.\n\nYakıt ısıtma sıcaklığı, viskozite-sıcaklık ilişkisine göre belirlenir. Enjeksiyon öncesi yakıt viskozitesinin 10-15 cSt aralığına getirilmesi gerekir. Boru içi sürtünme kayıpları ve pompa gücü hesaplarında viskozite değeri doğrudan kullanılır.",
    formula: {
      name: "Kinematik Viskozite",
      expression: "ν = μ / ρ",
      description: "Kinematik viskozite = Dinamik viskozite / Yoğunluk",
    },
    bulletPoints: [
      "Deniz suyu yoğunluğu 1025 kg/m³, tatlı su 1000 kg/m³ olarak alınır.",
      "Sıcaklık arttıkça sıvıların viskozitesi azalır, gazların viskozitesi artar.",
      "Yakıt enjeksiyonunda viskozite 10-15 cSt aralığında tutulmalıdır.",
    ],
    keyPoints: [
      "ρ = m/V, γ = ρ·g, SG = ρakışkan / ρsu.",
      "Kinematik viskozite ν = μ/ρ ile hesaplanır.",
      "Viskozite, boru kayıpları ve ısı transferi hesaplarının temel parametresidir.",
    ],
  },
  "energy-losses": {
    title: "Enerji Çizgisi ve Kayıp Terimleri",
    introduction:
      "Gerçek akış sistemlerinde enerji sürtünme ve türbülans nedeniyle kaybedilir. Enerji çizgisi (EGL) ve hidrolik gradyan çizgisi (HGL), boru hattı boyunca enerji dağılımını görselleştirir.",
    content:
      "Enerji çizgisi (EGL), Bernoulli denklemindeki toplam enerjiyi (basınç yükü + hız yükü + yükseklik) boru hattı boyunca gösteren çizgidir. Kayıpsız ideal sistemde EGL yataydır; gerçek sistemlerde sürtünme ve lokal kayıplar nedeniyle eğimli olarak düşer.\n\nHidrolik gradyan çizgisi (HGL), EGL'den hız yükünün çıkarılmasıyla elde edilir: HGL = EGL − V²/2g. Basınç göstergesi bağlandığında okunan değer HGL'ye karşılık gelir.\n\nBir boru hattında toplam yük kaybı iki bileşenden oluşur: sürekli (major) kayıplar boru boyunca sürtünmeden kaynaklanır ve Darcy–Weisbach eşitliğiyle hesaplanır; lokal (minor) kayıplar dirsekler, vanalar, daralmalar ve genişlemelerde oluşur.\n\nPompa, sisteme enerji ekler ve EGL üzerinde ani bir yükseliş olarak görülür. Toplam pompa yükü Hpompa = Hstatik + hf(toplam) formülüyle belirlenir.\n\nSayısal örnek: 200 m uzunluğunda, 150 mm çaplı çelik bir boru hattında akış hızı 2 m/s ve sürtünme faktörü f = 0.02 ise sürekli kayıp hf = f·(L/D)·(V²/2g) = 0.02 × (200/0.15) × (4/19.62) = 0.02 × 1333.3 × 0.204 = 5.44 m'dir.",
    formula: {
      name: "Toplam Yük Kaybı",
      expression: "htoplam = hf + Σhlokal = f·(L/D)·(V²/2g) + ΣK·(V²/2g)",
      description: "Sürekli kayıplar + lokal kayıplar boru hattının toplam yük kaybını verir.",
    },
    keyPoints: [
      "EGL her zaman HGL'nin üzerindedir; fark hız yüküne eşittir.",
      "Pompa, EGL'de ani yükseliş; türbin ise ani düşüş yaratır.",
      "Toplam yük kaybı pompa seçiminde belirleyici parametredir.",
      "Boru çapı büyütüldüğünde hız azalır ve sürtünme kaybı önemli ölçüde düşer.",
    ],
  },
  "laminar-turbulent": {
    title: "Laminer ve Türbülanslı Akış",
    introduction:
      "Akışkan parçacıklarının hareket düzeni akışın laminer veya türbülanslı olarak sınıflandırılmasını belirler. Bu ayrım, sürtünme kayıpları ve ısı transferi hesaplarında temel parametredir.",
    content:
      "Laminer akışta akışkan katmanları düzgün tabakalar halinde kayar ve katmanlar arası karışma yoktur. Hız profili parabolik şekildedir ve maksimum hız boru merkezinde, ortalama hızın iki katına eşittir. Laminer akışta sürtünme faktörü yalnızca Reynolds sayısına bağlıdır: f = 64/Re.\n\nTürbülanslı akışta parçacıklar düzensiz ve rastgele hareket eder; güçlü karışım gerçekleşir. Hız profili laminer akışa göre daha dolgun bir şekle sahiptir. Sürtünme kayıpları belirgin biçimde daha yüksektir ve sürtünme faktörü hem Reynolds sayısına hem boru pürüzlülüğüne bağlıdır.\n\nOsborne Reynolds, 1883'te boya enjeksiyonlu deneyi ile laminer akıştan türbülanslı akışa geçişi gözlemlemiştir. Boru akışı için kritik Reynolds sayısı Rekr ≈ 2300'dür. Re < 2300 laminer, 2300 < Re < 4000 geçiş bölgesi, Re > 4000 türbülanslı akış bölgesidir.\n\nSayısal örnek: 50 mm çaplı bir boruda 20°C'deki su (ν = 1.0 × 10⁻⁶ m²/s) 0.03 m/s hızla akıyor. Re = V·D/ν = 0.03 × 0.05 / (1.0 × 10⁻⁶) = 1500. Re < 2300 olduğundan akış laminerdir.",
    formula: {
      name: "Laminer Sürtünme Faktörü",
      expression: "f = 64 / Re",
      description: "Laminer boru akışında sürtünme faktörü yalnızca Reynolds sayısına bağlıdır.",
    },
    keyPoints: [
      "Re < 2300: laminer akış, düzgün katmanlı hareket.",
      "Re > 4000: türbülanslı akış, rastgele ve karışımlı hareket.",
      "Gemi boru hatlarında akış genellikle türbülanslıdır.",
      "Laminer akışta kayıplar hıza, türbülanslı akışta hızın karesine orantılıdır.",
    ],
  },
  "velocity-profile": {
    title: "Hız Profilleri",
    introduction:
      "Boru içindeki akışkanda hız, duvar yüzeyinde sıfırdan merkeze doğru maksimum değere yükselir. Hız profilinin şekli akış rejimine bağlıdır.",
    content:
      "Kaymama koşulu (no-slip condition) gereği, boru duvarına temas eden akışkan tabakasının hızı sıfırdır. Duvardan merkeze doğru hız artar.\n\nLaminer akışta hız profili parabolik eğri biçimindedir. Maksimum hız boru merkezinde oluşur ve ortalama hızın tam iki katına eşittir: Vmax = 2·Vort. Bu bağıntı, Hagen–Poiseuille analizi ile türetilir.\n\nTürbülanslı akışta karışma etkisi nedeniyle hız profili daha dolgun ve düz bir yapıdadır. Merkezle duvar arasındaki fark laminer akışa göre çok daha azdır. Türbülanslı akışta Vmax/Vort oranı yaklaşık 1.15-1.25 arasındadır ve Reynolds sayısı arttıkça bu oran 1'e yaklaşır.\n\nSayısal örnek: 100 mm iç çaplı boruda laminer akışla su geçiyor ve ortalama hız 0.5 m/s ise merkezde Vmax = 2 × 0.5 = 1.0 m/s'dir. Debi Q = A·Vort = π/4 × 0.1² × 0.5 = 3.93 × 10⁻³ m³/s = 3.93 L/s olarak hesaplanır.\n\nHız profili bilgisi, pitot tüpü ölçümlerinde ve debi hesaplarında kritik öneme sahiptir. Pitot tüpü noktasal hızı ölçtüğünden, ölçüm konumunun profil üzerindeki yeri bilinmeden doğru debi hesaplanamaz.",
    formula: {
      name: "Laminer Hız Profili",
      expression: "V(r) = Vmax · [1 − (r/R)²]",
      description: "r: Merkeze uzaklık, R: Boru yarıçapı. Maksimum hız merkezde oluşur.",
    },
    keyPoints: [
      "Laminer akışta Vmax = 2·Vort (parabolik profil).",
      "Türbülanslı akışta Vmax ≈ 1.2·Vort (dolgun profil).",
      "Duvar yüzeyinde hız her zaman sıfırdır (no-slip).",
      "Pitot ölçümlerinde hız profili düzeltme faktörü uygulanmalıdır.",
    ],
  },
  "friction-factor": {
    title: "Sürtünme Faktörü ve Moody Diyagramı",
    introduction:
      "Sürtünme faktörü (f), boru içi akışta kayıp hesaplamalarının temel parametresidir. Moody diyagramı, Reynolds sayısı ve bağıl pürüzlülüğe göre f değerini grafik olarak belirlemek için kullanılır.",
    content:
      "Darcy–Weisbach eşitliğindeki sürtünme faktörü f, akış rejimine ve boru yüzeyinin pürüzlülüğüne bağlıdır.\n\nLaminer akışta f = 64/Re formülü analitik olarak elde edilir ve boru pürüzlülüğünden bağımsızdır.\n\nTürbülanslı akışta ise f hem Reynolds sayısına hem bağıl pürüzlülüğe (ε/D) bağlıdır. Bağıl pürüzlülük, boru yüzeyindeki ortalama pürüz yüksekliğinin (ε) boru çapına (D) oranıdır. Yeni çelik borunun pürüzlülüğü ε ≈ 0.045 mm, kullanılmış çelik boru için ε ≈ 0.15-0.3 mm alınır.\n\nColebrook–White eşitliği türbülanslı akıştaki f değerini verir: 1/√f = −2·log[(ε/D)/3.7 + 2.51/(Re·√f)]. Bu denklem f için kapalı form olduğundan iteratif çözüm gerektirir.\n\nMoody diyagramı, Colebrook–White eşitliğinin grafik gösterimidir. Yatay eksende Re (logaritmik), düşey eksende f (logaritmik) ve parametre olarak ε/D eğrileri yer alır. Mühendislik uygulamalarında hızlı çözüm için bu diyagram kullanılır.\n\nSayısal örnek: 100 mm çaplı çelik boruda (ε = 0.045 mm) 3 m/s hızla su akıyor, Re = 300000. ε/D = 0.045/100 = 0.00045. Moody diyagramından f ≈ 0.018 okunur. Darcy–Weisbach ile 50 m boru için hf = 0.018 × (50/0.1) × (9/19.62) = 0.018 × 500 × 0.459 = 4.13 m.",
    formula: {
      name: "Colebrook–White",
      expression: "1/√f = −2·log[(ε/D)/3.7 + 2.51/(Re·√f)]",
      description: "Türbülanslı akışta sürtünme faktörü iteratif olarak hesaplanır.",
    },
    keyPoints: [
      "Laminer akışta f = 64/Re, pürüzlülükten bağımsızdır.",
      "Türbülanslı akışta f, Re ve ε/D'ye bağlıdır.",
      "Moody diyagramında tam türbülanslı bölgede f yalnızca ε/D'ye bağlıdır.",
      "Boru yaşlandıkça pürüzlülük artar ve kayıplar yükselir.",
    ],
  },
  "minor-losses": {
    title: "Lokal Kayıplar",
    introduction:
      "Boru hattındaki bağlantı elemanları, vanalar, daralmalar ve genişlemeler akışı bozarak ek enerji kayıplarına neden olur. Bu kayıplara lokal (minor) kayıplar denir.",
    content:
      "Lokal kayıplar hl = K·(V²/2g) formülüyle hesaplanır. Burada K kayıp katsayısı, V referans hızdır. K değeri bağlantı elemanının geometrisine bağlıdır ve deneysel olarak belirlenir.\n\nTipik K değerleri: 90° standart dirsek K ≈ 0.9, 45° dirsek K ≈ 0.4, T-parçası (dal) K ≈ 1.8, ani daralma K ≈ 0.5, ani genişleme K = (1 − A₁/A₂)², sürgülü vana (tam açık) K ≈ 0.2, kelebek vana (tam açık) K ≈ 0.3, çekvalf K ≈ 2.0.\n\nAlternatif yöntem olarak her bağlantı elemanı eşdeğer boru uzunluğu (Le) olarak ifade edilebilir: hl = f·(Le/D)·(V²/2g). Bu yaklaşım, toplam kayıbın tek bir Darcy–Weisbach hesabıyla bulunmasını sağlar.\n\nSayısal örnek: Bir boru hattında 4 adet 90° dirsek (K=0.9), 2 adet sürgülü vana (K=0.2) ve 1 adet çekvalf (K=2.0) bulunmaktadır. Akış hızı V = 2.5 m/s ise toplam lokal kayıp: ΣK = 4×0.9 + 2×0.2 + 2.0 = 6.0. hl = 6.0 × (2.5²/19.62) = 6.0 × 0.318 = 1.91 m.\n\nKısa boru hatlarında lokal kayıplar toplam kaybın büyük bölümünü oluşturabilir. Uzun boru hatlarında ise sürekli kayıplar baskındır ve lokal kayıplar toplam sürtünme kaybının %5-10'u kadar ek yük olarak tahmin edilebilir.",
    formula: {
      name: "Lokal Kayıp",
      expression: "hl = K · (V² / 2g)",
      description: "K: Kayıp katsayısı (boyutsuz), V: Akış hızı",
    },
    keyPoints: [
      "K değeri elemana özgüdür ve deneysel olarak belirlenir.",
      "Çekvalf en yüksek K değerine sahip yaygın elemanlardandır.",
      "Kısa hatlarda lokal kayıplar baskın olabilir.",
      "Eşdeğer uzunluk yöntemi toplam hesabı basitleştirir.",
    ],
  },
  "pump-curves": {
    title: "Pompa Karakteristik Eğrileri",
    introduction:
      "Pompa karakteristik eğrileri, bir pompanın farklı çalışma koşullarındaki performansını gösteren grafiklerdir. H-Q, η-Q ve P-Q eğrileri pompa seçimi ve sistem uyumluluğu analizinde kullanılır.",
    content:
      "Bir santrifüj pompanın performansı üç ana eğriyle tanımlanır. H-Q eğrisi (yük-debi), debi arttıkça pompanın sağladığı yükün nasıl değiştiğini gösterir. Tipik bir santrifüj pompada sıfır debide yük maksimumdur, debi arttıkça yük azalır.\n\nVerim eğrisi (η-Q), pompanın en yüksek verimle çalıştığı noktayı belirler. Bu nokta BEP (Best Efficiency Point) olarak adlandırılır ve pompa mümkün olduğunca BEP civarında çalıştırılmalıdır. BEP'ten sapma arttıkça verim düşer, titreşim ve kavitasyon riski artar.\n\nGüç eğrisi (P-Q), pompanın şaft gücünü debi fonksiyonu olarak gösterir. Aşırı yüklenmeyi önlemek için motor gücü bu eğriye göre seçilir.\n\nSistem eğrisi, boru hattının statik yükü ve sürtünme kayıplarını debi fonksiyonu olarak tanımlar: Hsistem = Hstatik + Ksistem·Q². Pompa çalışma noktası, H-Q eğrisi ile sistem eğrisinin kesişim noktasıdır.\n\nSayısal örnek: Statik yük 15 m olan bir sistemde debi 50 m³/h iken sürtünme kaybı 8 m ise sistem eğrisi sabiti K = 8/50² = 0.0032 m/(m³/h)²'dir. 80 m³/h debide sürtünme kaybı = 0.0032 × 6400 = 20.48 m, toplam yük = 15 + 20.48 = 35.48 m olur. Pompa bu noktada en az 35.5 m yük sağlamalıdır.",
    formula: {
      name: "Sistem Eğrisi",
      expression: "Hsistem = Hstatik + K·Q²",
      description: "Statik yük + debi karesine orantılı sürtünme kaybı.",
    },
    keyPoints: [
      "Çalışma noktası, pompa eğrisi ile sistem eğrisinin kesişimidir.",
      "BEP'te çalışma, verim ve ömür için idealdir.",
      "Vana kısma debiyi azaltır ancak enerji israfına neden olur.",
      "Devir sayısı değişimi ile debi, yük ve güç afinite kurallarına göre değişir.",
    ],
  },
  pitot: {
    title: "Pitot Tüpü ile Hız Ölçümü",
    introduction:
      "Pitot tüpü, akış içindeki bir noktada statik ve durma (stagnation) basıncı farkını ölçerek akış hızını belirleyen basit ve güvenilir bir enstrümandır.",
    content:
      "Pitot tüpünün ucu akışa doğru yöneltildiğinde o noktada akışkan durur ve kinetik enerji basınç enerjisine dönüşür. Oluşan basınç durma basıncı (P₀) olarak adlandırılır. Bernoulli denklemi uygulandığında P₀ = Pstatik + ½·ρ·V² bağıntısı elde edilir.\n\nPitot-statik tüp, hem durma basıncını hem statik basıncı aynı anda ölçerek hız hesabını doğrudan verir. Fark basıncı ΔP = P₀ − Pstatik = ½·ρ·V² olduğundan hız V = √(2·ΔP/ρ) formülüyle bulunur.\n\nPitot tüpü noktasal hızı ölçer. Boru kesiti boyunca ortalama hızı bulmak için birden fazla noktada ölçüm yapılmalı veya hız profili düzeltme faktörü uygulanmalıdır. Laminer akışta düzeltme faktörü 0.5, türbülanslı akışta yaklaşık 0.81-0.84 arasındadır.\n\nSayısal örnek: Bir boru hattında pitot tüpü ile ölçülen fark basıncı ΔP = 450 Pa ve akışkan deniz suyudur (ρ = 1025 kg/m³). V = √(2 × 450 / 1025) = √(0.878) = 0.937 m/s. Bu merkezde ölçülmüşse ve akış türbülanslıysa ortalama hız ≈ 0.937 × 0.82 = 0.768 m/s olarak düzeltilir.",
    formula: {
      name: "Pitot Hız Formülü",
      expression: "V = √(2·ΔP / ρ)",
      description: "Hız, statik ve durma basıncı farkından hesaplanır.",
    },
    keyPoints: [
      "Pitot tüpü noktasal hız ölçer, ortalama hız için düzeltme gerekir.",
      "Kirlenmeye ve tıkanmaya karşı periyodik temizlik yapılmalıdır.",
      "Düşük hızlarda hassasiyet azalır; genellikle V > 1 m/s için uygundur.",
      "Denizcilik uygulamalarında log (hız ölçer) olarak kullanılır.",
    ],
  },
  "meter-selection": {
    title: "Debi Ölçer Seçimi",
    introduction:
      "Doğru debi ölçer seçimi; akışkan tipi, akış aralığı, doğruluk gereksinimi ve basınç kaybı toleransına bağlıdır. Gemi sistemlerinde yakıt, soğutma suyu ve balast debisi ölçümü farklı ölçer tipleri gerektirir.",
    content:
      "Orifis plakası en basit ve ucuz diferansiyel basınç ölçeridir. Basınç kaybı yüksektir ancak hareketli parçası yoktur. Venturi tüpü daha düşük basınç kaybı sağlar ve kirli akışkanlarda daha güvenilirdir. Her ikisi de Q = Cd·A·√(2·ΔP/ρ) formülüne dayanır.\n\nElektromanyetik debi ölçer (mag-meter), iletken akışkanlarda (deniz suyu, balast suyu) basınç kaybı oluşturmadan ölçüm yapar. Faraday indüksiyon prensibine dayanır ve hareketli parçası yoktur.\n\nCoriolis debi ölçer, kütle debisini doğrudan ölçen yüksek doğruluklu bir cihazdır. Yakıt tüketimi ve bunker miktarı ölçümünde IMO DCS gereklilikleri kapsamında tercih edilir.\n\nTürbin tipi debi ölçer, temiz akışkanlarda yüksek doğruluk sağlar. Rotor devir hızı debiye orantılıdır. Ultrasonik debi ölçer, boru dışından montaj imkânı sunar ve mevcut sistemlere kolay entegre edilir.\n\nSeçim kriterleri: Yakıt ölçümünde Coriolis (%0.1-0.5 doğruluk), balast suyunda elektromanyetik (%0.5-1.0 doğruluk), soğutma suyunda orifis veya venturi (%1-2 doğruluk), yağ devrelerinde pozitif deplasanlı ölçer tercih edilir.",
    formula: {
      name: "Diferansiyel Basınç Debi Formülü",
      expression: "Q = Cd · A₂ · √(2·ΔP / ρ) / √(1 − β⁴)",
      description: "Cd: Deşarj katsayısı, β = d/D (çap oranı)",
    },
    keyPoints: [
      "Yakıt ölçümünde Coriolis, balast suyunda elektromanyetik ölçer tercih edilir.",
      "Orifis basit ama yüksek basınç kaybı yaratır.",
      "IMO DCS uyumu için yakıt ölçerlerinin kalibrasyon sertifikası gerekir.",
      "Doğruluk ve basınç kaybı arasında denge kurulmalıdır.",
    ],
  },
  "ballast-bilge": {
    title: "Balast ve Sintine Devreleri",
    introduction:
      "Balast sistemi geminin trimini, stabilitesini ve yapısal yüklerini kontrol eder. Sintine sistemi makine dairesi ve kargo hollerinde biriken istenmeyen suyu uzaklaştırır.",
    content:
      "Balast sistemi, deniz suyunun tanklar arasında veya denize/denizden pompalanmasını sağlayan boru, vana, pompa ve kontrol ekipmanından oluşur. Balast pompaları genellikle santrifüj tipindedir ve kapasiteleri geminin büyüklüğüne göre 200-5000 m³/h aralığında değişir.\n\nBalast boru hattında kelebek vanalar yaygındır; uzaktan kumanda imkânı sağlar ve korozyon dirençli malzemelerden (bronz, çelik + kaplama) üretilir. Balast manifoldu, tüm tankların merkezi bir noktadan kontrol edilmesine olanak tanır.\n\nSintine sistemi, gemi alt bölmelerinde biriken yağlı ve kirli suyu toplar. Sintine kuyuları (bilge wells) en düşük noktalara yerleştirilir ve emme boruları buraya bağlanır. Sintine pompası olarak hem santrifüj hem ejektör pompalar kullanılır.\n\nSintine suyu doğrudan denize basılamaz; önce yağ-su ayırıcıdan (OWS) geçirilmeli ve yağ içeriği 15 ppm'in altına indirilmelidir. MARPOL Annex I kuralları gereği yağ deşarj izleme sistemi (ODMCS) sürekli ölçüm yaparak sınır aşıldığında otomatik olarak deşarjı durdurur.\n\nSayısal örnek: 4000 DWT bir gemide balast pompası kapasitesi 300 m³/h, toplam balast kapasitesi 1200 m³ ise tam yükleme süresi = 1200/300 = 4 saat olarak hesaplanır.",
    keyPoints: [
      "Balast sistemi stabilite ve trim kontrolünün temel aracıdır.",
      "Sintine suyu OWS'den geçirilmeden denize basılamaz (15 ppm sınırı).",
      "BWM Convention gereği balast suyu arıtılmalıdır.",
      "Acil sintine bağlantısı makine dairesinde zorunludur (SOLAS).",
    ],
  },
  "cooling-circuits": {
    title: "Soğutma Suyu Devreleri",
    introduction:
      "Gemi soğutma sistemleri, ana makine, yardımcı makineler ve diğer ekipmanların aşırı ısınmasını önler. Genellikle iki kademeli (merkezi soğutma) düzen kullanılır.",
    content:
      "Merkezi soğutma sistemi iki devreden oluşur. Düşük sıcaklık (LT) devresi, deniz suyu ile merkezi soğutucudan ısıyı alır ve denize atar. Yüksek sıcaklık (HT) devresi, ana makine silindir gömleği ve turboşarj soğutmasını sağlar; ısısını LT devresine merkezi ısı eşanjöründen verir.\n\nDeniz suyu doğrudan motor soğutmasında kullanılmaz çünkü korozyon, biyolojik fouling ve mineral çökelme riski yüksektir. Kapalı devre tatlı su kullanılarak korozyon kontrol altında tutulur; tatlı suya inhibitör (nitrit, molibdat bazlı) eklenir.\n\nDeniz suyu girişi (sea chest) kıç ve baş olmak üzere çift konumda tasarlanır. Deniz suyu filtresi medüza, yosun ve diğer katı maddeleri tutar. Deniz suyu pompaları bronz veya çelik+epoksi gövdeli santrifüj tipindedir.\n\nHT devresi sıcaklık kontrolü termostatik vana ile yapılır. Ana makine çıkış sıcaklığı tipik olarak 80-85°C'de tutulur. Soğutma suyu sıcaklığının ani düşmesi termal şoka, yükselmesi ise aşırı ısınmaya neden olur.\n\nSayısal örnek: Ana makine 8000 kW gücünde ve atık ısının %15'i HT soğutma suyuna aktarılıyorsa Q = 0.15 × 8000 = 1200 kW. Soğutma suyu ΔT = 10°C ise gerekli debi ṁ = Q/(cp·ΔT) = 1200/(4.18 × 10) = 28.7 kg/s = 103 m³/h.",
    formula: {
      name: "Soğutma Debisi",
      expression: "ṁ = Q / (cp · ΔT)",
      description: "Soğutma suyu debisi = Atılacak ısı / (Özgül ısı × Sıcaklık farkı)",
    },
    keyPoints: [
      "Merkezi soğutma sistemi deniz suyu ile tatlı su arasında tampon oluşturur.",
      "HT devre sıcaklığı 80-85°C, LT devre sıcaklığı 36°C civarında tutulur.",
      "Deniz suyu tarafında anot koruması (çinko/alüminyum) uygulanır.",
      "Soğutma suyu inhibitörü periyodik olarak kontrol edilmelidir.",
    ],
  },
  "fire-main": {
    title: "Yangın Hattı Hidrolikleri",
    introduction:
      "Yangın ana hattı (fire main), gemi üzerindeki tüm yangın hidrantlarına basınçlı su sağlayan boru sistemidir. SOLAS ve klas kuralları kapsamında tasarlanır.",
    content:
      "Yangın ana hattı, yangın pompalarından beslenen ve güvertenin tamamını kapsayan bir ring (halka) boru sistemidir. Boru çapı, geminin büyüklüğüne ve gerekli debi/basınç değerlerine göre belirlenir.\n\nSOLAS Reg. II-2/10 gereği her gemide en az iki adet yangın pompası bulunmalıdır. Pompalar farklı makine dairelerinde veya birbirinden ayrılmış konumlarda yerleştirilmelidir. Yolcu gemilerinde ek olarak acil yangın pompası zorunludur.\n\nHidrant basıncı ve debisi gereksinimleri geminin tipine göre değişir. Yük gemilerinde her hidrantta minimum 0.27 N/mm² basınç ve iki hortumun aynı anda çalışabilmesi gerekir. Yolcu gemilerinde bu gereksinim daha yüksektir.\n\nBoru hattı hesaplarında toplam yük kaybı Darcy–Weisbach ve lokal kayıp formülleri ile belirlenir. En dezavantajlı hidrant (en uzak ve en yüksek nokta) referans alınarak pompa yükü hesaplanır.\n\nSayısal örnek: Bir yük gemisinde en uzak hidrantta 0.27 N/mm² (2.7 bar ≈ 27.5 m su sütunu) basınç isteniyor. Yangın pompasından hidanta kadar yükseklik farkı 20 m ve boru sürtünme kaybı 8 m ise gereken pompa yükü H = 27.5 + 20 + 8 = 55.5 m olur. Debi 2 × 120 L/min = 240 L/min = 14.4 m³/h ise pompa gücü P = ρgQH/η = 1025 × 9.81 × (14.4/3600) × 55.5 / 0.65 = 3450 W ≈ 3.5 kW.",
    formula: {
      name: "Yangın Pompası Yükü",
      expression: "Hpompa = Hhidrant + Hstatik + hf(toplam)",
      description: "Pompa yükü = Hidrant basıncı (m su) + Yükseklik farkı + Sürtünme kaybı",
    },
    keyPoints: [
      "SOLAS gereği en az iki yangın pompası ve izole boru hattı zorunludur.",
      "En dezavantajlı hidrant referans alınarak pompa boyutlandırılır.",
      "Uluslararası kıyı bağlantısı (international shore connection) SOLAS zorunluluğudur.",
      "Yangın pompası acil jeneratörden de beslenebilmelidir.",
    ],
  },
};
