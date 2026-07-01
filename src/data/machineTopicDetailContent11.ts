import type { MachineSubTopicContent } from "./machineTopicDetailContent";

type ContentMap = Record<string, Record<string, MachineSubTopicContent>>;

// Round 2: menüde listeli ancak içeriği bulunmayan (orphan) makine alt başlıkları.
const content11: ContentMap = {
  // ═══════════════════════════════════════════════════════════════
  // AKIŞKANLAR MEKANİĞİ (fluid-mechanics)
  // ═══════════════════════════════════════════════════════════════
  "fluid-mechanics": {
    "Enerji ve momentum denklemleri": {
      title: "Enerji ve Momentum Denklemleri",
      introduction: "Akışkan akışının çözümlenmesinde iki temel korunum ilkesi kullanılır: enerjinin korunumu (Bernoulli denklemi) ve momentumun korunumu. Bu denklemler boru sistemleri, pompalar ve akışkanın katı yüzeylere uyguladığı kuvvetlerin hesabında esastır.",
      sections: [
        {
          heading: "Bernoulli (Enerji) Denklemi",
          paragraphs: [
            "İdeal (sürtünmesiz, sıkışmaz) akışta toplam enerji (basınç + hız + yükseklik) bir akım çizgisi boyunca sabittir. Gerçek akışta sürtünme kayıpları (hf) ve pompa eklemesi (hp) terimleri eklenir.",
          ],
          formula: {
            expression: "p/(ρg) + v²/(2g) + z = sabit  →  (gerçek akış) p₁/(ρg)+v₁²/2g+z₁ + hp = p₂/(ρg)+v₂²/2g+z₂ + hf",
            variables: ["p: basınç", "v: hız", "z: yükseklik", "hp: pompa yükü", "hf: sürtünme kaybı"],
          },
        },
        {
          heading: "Momentum Denklemi",
          paragraphs: [
            "Bir kontrol hacmine giren ve çıkan momentum farkı, hacme etki eden net kuvvete eşittir. Akışkanın dirseklere, daralmalara ve türbin/pervane kanatlarına uyguladığı reaksiyon kuvvetlerini verir.",
          ],
          formula: {
            expression: "ΣF = ṁ (v₂ − v₁) = ρQ (v₂ − v₁)",
            variables: ["ṁ: kütlesel debi", "Q: hacimsel debi", "v: hız vektörü"],
          },
        },
      ],
      keyPoints: [
        "Bernoulli enerji korunumunu, momentum denklemi kuvvet dengesini ifade eder.",
        "Gerçek akışta sürtünme kaybı (hf) ve pompa yükü (hp) denkleme eklenir.",
        "Momentum denklemi dirsek/daralmalardaki reaksiyon kuvvetlerini verir.",
      ],
    },
    "Moody diyagramı ve sürtünme katsayısı": {
      title: "Moody Diyagramı ve Sürtünme Katsayısı",
      introduction: "Boru içi akışta basınç kaybı, Darcy-Weisbach denklemiyle hesaplanır; bu denklemdeki sürtünme katsayısı (f), Reynolds sayısı ve bağıl pürüzlülüğe bağlıdır ve Moody diyagramından okunur.",
      sections: [
        {
          heading: "Darcy-Weisbach ve Sürtünme Katsayısı",
          paragraphs: [
            "Sürtünme kaybı, sürtünme katsayısı, boru uzunluğu/çapı ve hız karesiyle orantılıdır. Laminer akışta (Re < 2300) f yalnızca Re'ye bağlıdır; türbülanslı akışta bağıl pürüzlülük (ε/D) belirleyici olur (Colebrook denklemi / Moody diyagramı).",
          ],
          formula: {
            expression: "hf = f · (L/D) · v²/(2g) ;  laminer: f = 64/Re",
            variables: ["f: Darcy sürtünme katsayısı", "L: boru boyu", "D: iç çap", "Re = ρvD/μ"],
          },
        },
        {
          heading: "Moody Diyagramının Kullanımı",
          paragraphs: [
            "Re ve ε/D bilindiğinde f, Moody diyagramından okunur. Yüksek Re ve yüksek pürüzlülükte f sabitlenir ('tam türbülanslı' bölge). Diyagram, pompa basma yükü ve boru çapı seçiminde temel araçtır.",
          ],
        },
      ],
      keyPoints: [
        "hf = f·(L/D)·v²/2g (Darcy-Weisbach).",
        "Laminer akışta f = 64/Re; türbülansta ε/D belirleyicidir.",
        "f, Re ve bağıl pürüzlülükle Moody diyagramından okunur.",
      ],
    },
    "Boru çapı ve hız hesapları": {
      title: "Boru Çapı ve Hız Hesapları",
      introduction: "Boru çapı seçimi, istenen debiyi uygun bir akış hızında taşıyacak şekilde yapılır. Çok yüksek hız aşırı basınç kaybı ve erozyon, çok düşük hız ise tortu birikimi ve büyük/pahalı boru anlamına gelir.",
      sections: [
        {
          heading: "Süreklilik Denklemi",
          paragraphs: [
            "Sıkışmaz akışta debi, kesit alanı ile hızın çarpımıdır. Çap belirlenirken önerilen hız aralıkları esas alınır (örn. emme hatları ~1-2 m/s, basma hatları ~2-3 m/s; deniz suyu hatlarında erozyonu önlemek için sınırlı).",
          ],
          formula: {
            expression: "Q = A · v = (π/4) D² · v  →  D = √(4Q / (π·v))",
            variables: ["Q: debi (m³/s)", "A: kesit alanı", "v: ortalama hız", "D: iç çap"],
          },
          example: {
            problem: "0,02 m³/s debi, hedef hız 2 m/s. Gereken iç çap?",
            steps: ["A = Q/v = 0,02/2 = 0,01 m²", "D = √(4A/π) = √(4·0,01/π)"],
            result: "D ≈ 0,113 m (≈ DN110-125 seçilir)",
          },
        },
      ],
      keyPoints: [
        "Q = A·v; çap debiden ve hedef hızdan bulunur.",
        "Yüksek hız: erozyon + basınç kaybı; düşük hız: tortu + maliyet.",
        "Emme hatları basma hatlarından daha düşük hızda boyutlandırılır.",
      ],
    },
    "Lokal kayıplar (dirsek, vana, daralma)": {
      title: "Lokal Kayıplar (Dirsek, Vana, Daralma)",
      introduction: "Boru hattındaki dirsek, vana, daralma, genişleme ve T-bağlantılar, akışı bozarak yerel (minor) basınç kayıplarına yol açar. Bu kayıplar kayıp katsayısı (K) veya eşdeğer boru boyu yöntemiyle hesaplanır.",
      sections: [
        {
          heading: "K Katsayısı Yöntemi",
          paragraphs: [
            "Her armatür için bir kayıp katsayısı (K) tanımlanır ve kayıp, hız yükü ile çarpılır. Tüm armatürlerin K'leri toplanarak toplam yerel kayıp bulunur ve sürtünme kaybına eklenir.",
          ],
          formula: {
            expression: "hL = K · v²/(2g)  ;  eşdeğer boy: Le = K·D/f",
            variables: ["K: kayıp katsayısı (dirsek ~0,3-0,9; küresel vana açık ~0,05; globe vana ~10)", "v: hız"],
          },
        },
      ],
      keyPoints: [
        "Yerel kayıp hL = K·v²/2g.",
        "K değeri armatür tipine bağlıdır (globe vana >> gate vana).",
        "Eşdeğer boy yöntemiyle de toplam kayba eklenebilir.",
      ],
    },
    "Seri ve paralel boru sistemleri": {
      title: "Seri ve Paralel Boru Sistemleri",
      introduction: "Boru hatları seri veya paralel bağlanabilir. Bağlantı şekli, debinin ve basınç kaybının nasıl dağıldığını belirler ve sistem eğrisinin hesabında kullanılır.",
      sections: [
        {
          heading: "Seri ve Paralel Davranış",
          paragraphs: [
            "Seri bağlamada debi tüm borularda aynıdır; toplam kayıp her segmentin kayıplarının toplamıdır. Paralel bağlamada her kol üzerindeki basınç kaybı aynıdır; toplam debi kolların debilerinin toplamıdır (düşük dirençli kol daha çok debi taşır).",
          ],
          formula: {
            expression: "Seri: Q=sabit, hftop=Σhfᵢ ;  Paralel: Δh=sabit, Qtop=ΣQᵢ",
          },
        },
      ],
      keyPoints: [
        "Seri: debi sabit, kayıplar toplanır.",
        "Paralel: basınç düşüşü ortak, debiler toplanır.",
        "Paralelde düşük dirençli kol daha fazla akış taşır.",
      ],
    },
    "Boru hattı tasarım prensipleri": {
      title: "Boru Hattı Tasarım Prensipleri",
      introduction: "Gemi boru hatları; debi, basınç, sıcaklık, akışkan tipi ve sınıflandırma kuruluşu kurallarına göre tasarlanır. Hız sınırları, ısıl genleşme, destekler, eğim ve havalandırma/drenaj dikkate alınır.",
      sections: [
        {
          heading: "Temel Tasarım Kriterleri",
          paragraphs: [],
          bulletPoints: [
            "Hız sınırları: erozyon ve basınç kaybını dengeleyecek şekilde seçilir (özellikle deniz suyu hatlarında).",
            "Isıl genleşme: kompansatör (expansion bend/bellows) ile karşılanır.",
            "Destek ve askılar: titreşim ve sehimi önler; sınıf kurallarına uyar.",
            "Eğim, hava firarı (vent) ve drenaj: hava kilidi ve tortu birikimini önler.",
            "Emme tarafında NPSH yeterliliği sağlanır (kavitasyonu önlemek için).",
          ],
        },
      ],
      keyPoints: [
        "Hız sınırı erozyon ↔ basınç kaybı dengesine göre seçilir.",
        "Isıl genleşme kompansatörlerle karşılanır.",
        "Emmede yeterli NPSH ile kavitasyon önlenir.",
      ],
    },
    "Sistem eğrisi ve çalışma noktası": {
      title: "Sistem Eğrisi ve Çalışma Noktası",
      introduction: "Bir pompalama sisteminin gerçek debisi, sistem direnç eğrisi ile pompa karakteristik eğrisinin kesişiminde (çalışma noktası) belirlenir.",
      sections: [
        {
          heading: "Sistem Eğrisi",
          paragraphs: [
            "Sistem eğrisi, statik yük (yükseklik + basınç farkı) ile debinin karesiyle artan dinamik kayıplardan oluşur. Pompa eğrisi (H-Q) ile çakıştırıldığında kesişim noktası, sistemin fiilen çalışacağı debi ve yükü verir.",
          ],
          formula: {
            expression: "Hsistem = Hstatik + k·Q²",
            variables: ["Hstatik: yükseklik/basınç farkı", "k·Q²: sürtünme + yerel kayıplar"],
          },
        },
        {
          heading: "Çalışma Noktasının Kayması",
          paragraphs: [
            "Vana kısma (throttling) sistem eğrisini dikleştirir ve çalışma noktasını düşük debiye kaydırır. Boru kirlenmesi/fouling de direnci artırır. Devir ayarı (VFD) ise pompa eğrisini kaydırarak verimli debi kontrolü sağlar.",
          ],
        },
      ],
      keyPoints: [
        "Çalışma noktası = pompa eğrisi ∩ sistem eğrisi.",
        "Hsistem = Hstatik + k·Q².",
        "Vana kısma debiyi düşürür; VFD ile verimli kontrol sağlanır.",
      ],
    },
    "Pozitif deplasanlı pompalar (dişli, vidalı)": {
      title: "Pozitif Deplasmanlı Pompalar (Dişli, Vidalı)",
      introduction: "Pozitif deplasmanlı (positive displacement) pompalar, her devirde sabit bir hacmi taşır. Debileri basınçtan neredeyse bağımsızdır; bu nedenle viskoz akışkanlar (yağlama yağı, yakıt) ve yüksek basınç uygulamaları için idealdir.",
      sections: [
        {
          heading: "Çalışma Prensibi ve Tipler",
          paragraphs: [
            "Dişli (gear) ve vidalı (screw) pompalar, dönen elemanlar arasında oluşan hacimleri emme tarafından basma tarafına taşır. Debi devirle orantılıdır; basınç arttıkça debi çok az değişir. Bu yüzden basma hattı kapalıyken basınç tehlikeli biçimde yükselir.",
          ],
        },
        {
          heading: "Emniyet Valfi Zorunluluğu",
          paragraphs: [
            "Pozitif deplasmanlı pompaların basma tarafında MUTLAKA bir emniyet/by-pass valfi bulunmalıdır; aksi hâlde kapalı vanaya karşı çalışmada basınç boruyu/pompayı patlatabilir. Santrifüj pompalardan en temel farkı budur.",
          ],
        },
      ],
      keyPoints: [
        "Sabit hacimsel debi; basınçtan bağımsız çalışır.",
        "Viskoz akışkanlar (yağ, yakıt) için idealdir.",
        "Basma tarafında emniyet/by-pass valfi zorunludur.",
      ],
    },
    "Pompa seçimi ve boyutlandırma": {
      title: "Pompa Seçimi ve Boyutlandırma",
      introduction: "Pompa seçimi; gerekli debi, basma yüksekliği (head), akışkan özellikleri (viskozite, sıcaklık, yoğunluk), NPSH gereksinimi ve verim göz önünde tutularak yapılır.",
      sections: [
        {
          heading: "Seçim Kriterleri",
          paragraphs: [],
          bulletPoints: [
            "Debi (Q) ve toplam basma yükü (H): sistem eğrisinden belirlenir.",
            "NPSHa > NPSHr olmalı (kavitasyonu önlemek için, emniyet payıyla).",
            "Akışkan: viskoz/aşındırıcı/uçucu ise pompa tipi buna göre seçilir (PD vs santrifüj).",
            "Verim: çalışma noktası, pompanın en yüksek verim bölgesine (BEP) yakın olmalı.",
            "Malzeme: deniz suyu için bronz/CuNi; yakıt/yağ için uygun keçe ve sızdırmazlık.",
          ],
          formula: {
            expression: "Pşaft = ρ·g·Q·H / η",
            variables: ["P: güç (W)", "Q: debi", "H: basma yükü", "η: verim"],
          },
        },
      ],
      keyPoints: [
        "Çalışma noktası BEP'e yakın seçilmelidir.",
        "NPSHa > NPSHr şartı kavitasyonu önler.",
        "Güç: P = ρgQH/η.",
      ],
    },
    "Seri ve paralel pompa çalıştırma": {
      title: "Seri ve Paralel Pompa Çalıştırma",
      introduction: "Birden fazla pompa, kapasiteyi artırmak için seri veya paralel bağlanabilir. Bağlantı şekli, sistemin debi mi yoksa basınç mı gerektirdiğine göre seçilir.",
      sections: [
        {
          heading: "Seri ve Paralel",
          paragraphs: [
            "Paralel çalıştırmada aynı basma yükünde debiler toplanır; yüksek debi gerektiren sistemler için uygundur (ancak sistem eğrisi dikse debi artışı sınırlıdır). Seri çalıştırmada aynı debide basma yükleri toplanır; yüksek basınç gerektiren sistemler için uygundur.",
          ],
          formula: {
            expression: "Paralel: Qtop = ΣQ (H ortak) ;  Seri: Htop = ΣH (Q ortak)",
          },
        },
      ],
      keyPoints: [
        "Paralel: debi artar (yüksek debi ihtiyacı).",
        "Seri: basma yükü artar (yüksek basınç ihtiyacı).",
        "Dik sistem eğrisinde paralel debi kazancı sınırlıdır.",
      ],
    },
    "Soğutma suyu sistemleri": {
      title: "Soğutma Suyu Sistemleri",
      introduction: "Ana makine ve yardımcıların ürettiği ısı, soğutma suyu sistemleriyle uzaklaştırılır. Modern gemilerde merkezi soğutma (central cooling) yaygındır: deniz suyu yalnızca merkezi soğutucuyu besler, makineler tatlı su devreleriyle soğutulur.",
      sections: [
        {
          heading: "Merkezi Soğutma Mimarisi",
          paragraphs: [
            "Deniz suyu devresi (sea water), merkezi soğutucuda (central cooler) ısıyı denize atar. Tatlı su tarafında iki devre bulunur: yüksek sıcaklık (HT) devresi silindir gömleği/kapakları soğutur; düşük sıcaklık (LT) devresi yağ soğutucu, hava soğutucu (charge air) ve yardımcıları soğutur. Tatlı su kullanımı korozyonu ve tuz birikimini azaltır.",
          ],
        },
        {
          heading: "Bileşenler ve Kontrol",
          paragraphs: [],
          bulletPoints: [
            "Plakalı ısı değiştiriciler (central/LT/HT cooler).",
            "Sıcaklık kontrol (üç yollu termostatik valf).",
            "Genleşme tankı (expansion tank) ve kimyasal dozajlama.",
            "Deniz suyu tarafında deniz sandığı (sea chest), filtre ve marine growth önleme.",
          ],
        },
      ],
      keyPoints: [
        "Merkezi soğutmada deniz suyu yalnız merkezi soğutucuyu besler.",
        "HT devresi gömlek/kapak, LT devresi yağ/hava soğutucu içindir.",
        "Tatlı su devresi korozyon ve tuz birikimini azaltır.",
      ],
    },
    "Yakıt transfer ve servis hatları": {
      title: "Yakıt Transfer ve Servis Hatları",
      introduction: "Yakıt sistemi; bunker tanklarından makineye kadar transfer, çöktürme (settling), arıtma (purifying) ve servis aşamalarını içerir. Ağır yakıt (HFO) ısıtma ve viskozite kontrolü gerektirir.",
      sections: [
        {
          heading: "Yakıt Akış Zinciri",
          paragraphs: [
            "Bunker tankı → transfer pompası → çöktürme tankı (settling, ısıtmalı, su/tortu ayrışması) → seperatör/purifier (su ve katı uzaklaştırma) → servis (günlük) tankı → besleme/booster ünitesi → makine. Booster ünitesi yakıtı basınçlandırır ve enjeksiyon viskozitesine kadar ısıtır.",
          ],
        },
        {
          heading: "Viskozite ve Isıtma Kontrolü",
          paragraphs: [
            "HFO, enjeksiyon için belirli bir viskoziteye (genellikle ~10-15 cSt) getirilmelidir; bu, viskozite kontrollü ısıtıcı (viscotherm) ile sağlanır. Servis tankında düşük-yüksek seviye alarmları ve hızlı kapama valfleri (quick-closing) yangın güvenliği için bulunur.",
          ],
        },
      ],
      keyPoints: [
        "Zincir: bunker → settling → purifier → service → booster → makine.",
        "HFO enjeksiyon viskozitesine ısıtılır (viscotherm kontrolü).",
        "Servis/çöktürme tanklarında hızlı kapama valfi zorunludur.",
      ],
    },
    "Valf tipleri ve seçim kriterleri": {
      title: "Valf Tipleri ve Seçim Kriterleri",
      introduction: "Valfler akışı durdurmak, yönlendirmek, düzenlemek veya tek yöne izin vermek için kullanılır. Doğru valf seçimi; görev (kapama/regülasyon/çek), akışkan, basınç-sıcaklık ve basınç kaybına göre yapılır.",
      sections: [
        {
          heading: "Başlıca Valf Tipleri",
          paragraphs: [],
          table: {
            headers: ["Valf", "Kullanım", "Özellik"],
            rows: [
              ["Sürgülü (gate)", "Tam açık/kapalı kapama", "Düşük basınç kaybı; regülasyona uygun değil"],
              ["Küresel (globe)", "Akış regülasyonu", "Yüksek basınç kaybı; iyi kontrol"],
              ["Bilyalı (ball)", "Hızlı kapama", "Çeyrek tur; düşük kayıp"],
              ["Kelebek (butterfly)", "Büyük çaplı kapama/regülasyon", "Kompakt, hafif"],
              ["Çek (check/NRV)", "Tek yön (geri akışı önleme)", "Otomatik"],
              ["Emniyet (relief/safety)", "Aşırı basınç koruması", "Ayarlı"],
            ],
          },
        },
      ],
      keyPoints: [
        "Gate vana kapama, globe vana regülasyon içindir.",
        "Çek valf (NRV) geri akışı önler.",
        "Emniyet valfi aşırı basınca karşı korur.",
      ],
    },
    "Boru malzemeleri ve standartlar": {
      title: "Boru Malzemeleri ve Standartlar",
      introduction: "Boru malzemesi; akışkan, sıcaklık, basınç ve korozyon ortamına göre seçilir ve sınıflandırma kuruluşu kurallarına uygun olmalıdır. Nominal çap (DN/NB) ve et kalınlığı (schedule) standartlaştırılmıştır.",
      sections: [
        {
          heading: "Yaygın Malzemeler",
          paragraphs: [],
          bulletPoints: [
            "Karbon çeliği: yakıt, yağ, buhar, genel servis (uygun et kalınlığı/schedule ile).",
            "Bakır-nikel (CuNi 90/10): deniz suyu hatları (korozyon ve marine growth direnci).",
            "Galvaniz çelik / GRP (cam elyaf): balast, sintine, deniz suyu (GRP korozyona dayanıklı).",
            "Paslanmaz çelik: kimyasal, gıda, yüksek saflık hatları.",
          ],
        },
        {
          heading: "Standart ve Sınıf Kuralları",
          paragraphs: [
            "Borular DN (nominal çap) ve schedule (et kalınlığı) ile tanımlanır. Sistem, taşıdığı akışkana göre sınıf kurallarınca sınıflara ayrılır (örn. yüksek riskli akışkan/basınç → daha sıkı test ve bağlantı gereksinimi).",
          ],
        },
      ],
      keyPoints: [
        "Deniz suyu hatlarında CuNi veya GRP tercih edilir.",
        "Boru DN (çap) ve schedule (et kalınlığı) ile tanımlanır.",
        "Malzeme ve bağlantılar sınıf kurallarına uymalıdır.",
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // MAKİNE ELEMANLARI (machine-elements)
  // ═══════════════════════════════════════════════════════════════
  "machine-elements": {
    "Kayma gerilmesi": {
      title: "Kayma Gerilmesi",
      introduction: "Kayma (shear) gerilmesi, bir kesite teğet (paralel) etki eden kuvvetin oluşturduğu gerilmedir. Cıvata, perçin, pim bağlantıları ve burulma (tork) altındaki şaftlarda belirleyicidir.",
      sections: [
        {
          heading: "Tanım ve Burulma",
          paragraphs: [
            "Doğrudan kesme gerilmesi, kuvvetin kesite oranıdır. Burulma altındaki dairesel şaftta kayma gerilmesi yarıçapla doğru orantılı artar ve yüzeyde maksimumdur.",
          ],
          formula: {
            expression: "τ = F/A ;  burulma: τ = T·r / J  (J = πd⁴/32)",
            variables: ["τ: kayma gerilmesi", "T: tork", "r: yarıçap", "J: polar atalet momenti"],
          },
        },
      ],
      keyPoints: [
        "Kayma gerilmesi kesite teğet kuvvetten doğar (τ = F/A).",
        "Burulmada τ = Tr/J; yüzeyde maksimumdur.",
        "Cıvata/pim/şaft tasarımında kritiktir.",
      ],
    },
    "Bileşik gerilme ve Von Mises kriteri": {
      title: "Bileşik Gerilme ve Von Mises Kriteri",
      introduction: "Gerçek makine elemanları aynı anda eksenel, eğilme ve burulma yüklerine maruz kalır. Bu bileşik gerilme durumunun akmaya (yielding) karşı güvenliği, Von Mises (eşdeğer gerilme) kriteriyle değerlendirilir.",
      sections: [
        {
          heading: "Eşdeğer (Von Mises) Gerilme",
          paragraphs: [
            "Normal (σ) ve kayma (τ) gerilmelerinin bir arada bulunduğu düzlem gerilme durumunda eşdeğer gerilme hesaplanır ve akma sınırıyla karşılaştırılır. σvm < σakma / SF olmalıdır.",
          ],
          formula: {
            expression: "σvm = √(σ² + 3τ²)  (düzlem gerilme)",
            variables: ["σ: normal gerilme", "τ: kayma gerilmesi", "σvm: eşdeğer gerilme"],
          },
        },
      ],
      keyPoints: [
        "Bileşik yükte akma riski Von Mises ile değerlendirilir.",
        "σvm = √(σ² + 3τ²).",
        "σvm akma sınırının güvenli kesri altında tutulur.",
      ],
    },
    "Güvenlik katsayısı ve emniyet gerilmesi": {
      title: "Güvenlik Katsayısı ve Emniyet Gerilmesi",
      introduction: "Güvenlik katsayısı (SF), malzemenin dayanım sınırı ile çalışma (izin verilen) gerilmesi arasındaki orandır. Belirsizlikleri (yük, malzeme, üretim) telafi eder.",
      sections: [
        {
          heading: "Tanım ve Seçim",
          paragraphs: [
            "Emniyet gerilmesi, malzeme akma (veya kopma/yorulma) sınırının güvenlik katsayısına bölünmesiyle bulunur. SF; yük tipi (statik/dinamik), malzeme süneklik durumu, sonuçların ciddiyeti ve sınıf kurallarına göre seçilir.",
          ],
          formula: {
            expression: "σemniyet = σakma / SF  →  SF = σakma / σçalışma",
          },
        },
      ],
      keyPoints: [
        "SF = dayanım sınırı / çalışma gerilmesi.",
        "Dinamik/yorulma yüklerinde SF daha yüksek seçilir.",
        "Emniyet gerilmesi = akma sınırı / SF.",
      ],
    },
    "Pervane şaftı boyutlandırma (IACS UR M68)": {
      title: "Pervane Şaftı Boyutlandırma (IACS UR M68)",
      introduction: "Pervane (kuyruk) şaftı çapı, sınıflandırma kuruluşlarının ortak gereksinimi olan IACS UR M68 gibi kurallara göre, iletilen güç, devir, malzeme dayanımı ve şaft tipine bağlı katsayılarla hesaplanır.",
      sections: [
        {
          heading: "Çap Formülünün Mantığı",
          paragraphs: [
            "Şaft, esas olarak burulma (tork) yükünü taşır; tork güç/devir oranıyla artar. Kural formülleri, çapı; güç (P), devir (n), malzeme dayanımı (Rm) ve şaft tipi/tasarım faktörüne bağlı olarak verir. Kuyruk şaftı, ek eğilme ve korozyon nedeniyle ara şafttan daha büyük çapta olur.",
          ],
          formula: {
            expression: "d = F · k · ∛( (P/n) · (560/(Rm+160)) )",
            variables: ["P: güç (kW)", "n: devir (rpm)", "Rm: malzeme çekme dayanımı", "F,k: kural/şaft tipi faktörleri"],
          },
        },
      ],
      keyPoints: [
        "Şaft çapı esas olarak iletilen torka (P/n) göre belirlenir.",
        "IACS UR M68 güç, devir ve malzeme dayanımını içerir.",
        "Kuyruk şaftı ara şafttan daha büyük çaplıdır.",
      ],
    },
    "Ara şaft ve kıç boru şaftı": {
      title: "Ara Şaft ve Kıç Boru Şaftı",
      introduction: "Şaft hattı; redüktör/motordan pervaneye kadar ara şaft (intermediate shaft) ve kıç boru/kuyruk şaftından (stern tube / propeller shaft) oluşur. Her bölüm farklı yük ve ortam koşullarına maruzdur.",
      sections: [
        {
          heading: "Şaft Hattı Bölümleri",
          paragraphs: [
            "Ara şaft, makine ile kuyruk şaftı arasında torku iletir ve ara yataklarla desteklenir. Kuyruk şaftı pervaneyi taşır, kıç boru içinde döner ve deniz suyu/yağ ortamındadır; bu yüzden çoğu zaman koruyucu kovan (liner) ile kaplanır ve korozyona karşı korunur.",
          ],
        },
      ],
      keyPoints: [
        "Ara şaft torku iletir, ara yataklarla desteklenir.",
        "Kuyruk şaftı pervaneyi taşır, kıç boru içinde döner.",
        "Kuyruk şaftı kovan (liner) ile korozyona karşı korunur.",
      ],
    },
    "Kaymalı yatak (stern tube bearing)": {
      title: "Kaymalı Yatak (Stern Tube Bearing)",
      introduction: "Kıç boru yatağı, kuyruk şaftını destekleyen kaymalı yataktır. İki ana tip vardır: yağ yağlamalı beyaz metal yatak ve su yağlamalı (rubber/lignum vitae) yatak.",
      sections: [
        {
          heading: "Yağ ve Su Yağlamalı Tipler",
          paragraphs: [
            "Yağ yağlamalı sistemde beyaz metal yatak, kıç boru yağıyla yağlanır ve uçlarda yağ keçeleri (lip seals) deniz suyunu dışarıda tutar; baş ve kıç yağ tankı ile basınç kontrol edilir. Su yağlamalı sistemde yatak deniz suyuyla yağlanır; çevreye yağ kaçağı riski yoktur ancak aşınma ve clearance takibi gerekir.",
          ],
        },
      ],
      keyPoints: [
        "Yağ yağlamalı: beyaz metal + yağ keçeleri (sealing).",
        "Su yağlamalı: çevre dostu ama aşınma takibi gerekir.",
        "Keçe arızası deniz suyu girişine/yağ kaçağına yol açar.",
      ],
    },
    "Rulman seçimi ve ömür hesabı": {
      title: "Rulman Seçimi ve Ömür Hesabı",
      introduction: "Yuvarlanmalı yataklar (rulmanlar), dinamik yük taşıma kapasitesi (C) ve uygulanan yüke (P) göre seçilir; beklenen yorulma ömrü L10 ile hesaplanır.",
      sections: [
        {
          heading: "L10 Ömür Formülü",
          paragraphs: [
            "L10, rulmanların %90'ının yorulmadan ulaşacağı ömürdür. Yük arttıkça ömür hızla (bilyalı rulmanda küpsel) düşer.",
          ],
          formula: {
            expression: "L10 = (C/P)^p × 10⁶ devir   (bilyalı p=3, makaralı p=10/3)",
            variables: ["C: dinamik yük kapasitesi", "P: eşdeğer yük", "p: üs"],
          },
        },
      ],
      keyPoints: [
        "L10 = (C/P)^p × 10⁶ devir.",
        "Bilyalı rulmanda üs 3, makaralıda 10/3.",
        "Yük iki katına çıkınca bilyalıda ömür ~1/8'e düşer.",
      ],
    },
    "Şaft hizalama (alignment)": {
      title: "Şaft Hizalama (Alignment)",
      introduction: "Şaft hizalama, şaft hattındaki yatakların doğru reaksiyon yükünü taşımasını sağlayacak şekilde konumlandırılmasıdır. Hatalı hizalama; yatak aşırı yüklenmesi, titreşim ve yatak hasarına yol açar.",
      sections: [
        {
          heading: "Hizalama Yöntemleri",
          paragraphs: [
            "Geleneksel sag-and-gap (flanş açıklığı ve sapması) ölçümü ve modern yatak reaksiyonu ölçümü (jack-up yöntemi) kullanılır. Büyük gemilerde gövde deformasyonu ve sıcaklık etkisi de hesaba katılır; amaç tüm yatakların kabul edilebilir reaksiyon aralığında kalmasıdır.",
          ],
        },
      ],
      keyPoints: [
        "Amaç: her yatağın kabul edilebilir reaksiyon yükünü taşıması.",
        "Sag-and-gap ve jack-up (yatak reaksiyonu) yöntemleri kullanılır.",
        "Hatalı hizalama yatak hasarı ve titreşime yol açar.",
      ],
    },
    "Helisel dişli ve pervane redüktörü": {
      title: "Helisel Dişli ve Pervane Redüktörü",
      introduction: "Yüksek devirli makine ile düşük devirli pervane arasındaki devir uyumu, redüksiyon dişli kutusuyla (reduction gearbox) sağlanır. Gemilerde genellikle helisel (helical) dişliler kullanılır.",
      sections: [
        {
          heading: "Helisel Dişli ve Redüksiyon",
          paragraphs: [
            "Helisel dişlilerde dişler eğimlidir; bu, kademeli temas sayesinde düz dişliye göre daha sessiz ve yüksek yük taşıma sağlar (ancak eksenel itki oluşturur). Redüksiyon oranı, motor devrini pervanenin verimli çalıştığı düşük devire indirir. Çift girişli kutular, iki makineyi tek pervaneye bağlayabilir.",
          ],
          formula: {
            expression: "i = ngiriş / nçıkış = zçıkış / zgiriş",
            variables: ["i: redüksiyon oranı", "z: diş sayısı", "n: devir"],
          },
        },
      ],
      keyPoints: [
        "Redüktör yüksek motor devrini düşük pervane devrine indirir.",
        "Helisel dişli sessiz ve yüksek yük kapasitelidir (eksenel itki üretir).",
        "Redüksiyon oranı i = zçıkış/zgiriş.",
      ],
    },
    "Kayış ve zincir tahrik sistemleri": {
      title: "Kayış ve Zincir Tahrik Sistemleri",
      introduction: "Kayış (belt) ve zincir (chain) tahrikleri, yardımcı ekipmanlarda dönme hareketini ve momenti bir milden diğerine iletir. Her birinin avantaj ve sınırlamaları vardır.",
      sections: [
        {
          heading: "Karşılaştırma",
          paragraphs: [],
          table: {
            headers: ["Özellik", "Kayış (V/triger)", "Zincir"],
            rows: [
              ["Kayma", "V-kayış kayabilir; triger kaymaz", "Kaymaz (senkron)"],
              ["Yük", "Orta", "Yüksek"],
              ["Bakım", "Gerginlik ayarı", "Yağlama + gerginlik"],
              ["Gürültü", "Sessiz", "Daha gürültülü"],
            ],
          },
        },
      ],
      keyPoints: [
        "V-kayış kayabilir; triger kayış ve zincir senkrondur.",
        "Zincir yüksek yük taşır ama yağlama gerektirir.",
        "İkisi de doğru gerginlikle çalıştırılmalıdır.",
      ],
    },
    "Kaplin tipleri (esnek, rijit)": {
      title: "Kaplin Tipleri (Esnek, Rijit)",
      introduction: "Kaplin (coupling), iki mili birbirine bağlayarak tork iletir. Rijit kaplinler tam hizalı miller için, esnek kaplinler ise hizalama hatasını ve şok/titreşimi tolere etmek için kullanılır.",
      sections: [
        {
          heading: "Rijit ve Esnek Kaplinler",
          paragraphs: [
            "Rijit kaplinler (flanşlı) hiçbir kaçıklığa izin vermez; mükemmel hizalama gerektirir (örn. şaft hattı flanşları). Esnek kaplinler (lastik elemanlı, dişli, disk) açısal/paralel/eksenel kaçıklığı bir miktar tolere eder, torsiyonel şokları sönümler ve titreşim iletimini azaltır.",
          ],
        },
      ],
      keyPoints: [
        "Rijit kaplin tam hizalama gerektirir, kaçıklık tolere etmez.",
        "Esnek kaplin kaçıklığı ve şoku tolere eder, titreşimi sönümler.",
        "Kaplin tipi hizalama ve yük karakterine göre seçilir.",
      ],
    },
    "Kavrama (clutch) mekanizmaları": {
      title: "Kavrama (Clutch) Mekanizmaları",
      introduction: "Kavrama, iki dönen mili gerektiğinde bağlayıp ayırarak güç akışını kontrol eder. Gemilerde redüktör/şaft jeneratörü ve PTO/PTI sistemlerinde kullanılır.",
      sections: [
        {
          heading: "Kavrama Tipleri",
          paragraphs: [
            "Sürtünmeli (friction) kavramalar (çok plakalı, hidrolik/pnömatik aktüatörlü) yük altında kademeli bağlanma sağlar. Pozitif (dişli/tırnak) kavramalar yalnız durağan/düşük devirde bağlanır ama kaymadan tam tork iletir. SSS/freewheel tipi kavramalar tek yönde otomatik bağlanır.",
          ],
        },
      ],
      keyPoints: [
        "Sürtünmeli kavrama yük altında kademeli bağlanır.",
        "Pozitif kavrama kaymaz ama düşük devirde devreye alınır.",
        "Şaft jeneratörü ve PTO/PTI'de kavrama kullanılır.",
      ],
    },
    "Yorulma sınırı ve gerilme yoğunlaşması": {
      title: "Yorulma Sınırı ve Gerilme Yoğunlaşması",
      introduction: "Tekrarlı (dinamik) yükler altında bir parça, statik dayanımının çok altında bir gerilmede yorulma (fatigue) nedeniyle kırılabilir. Çentik, delik ve kesit değişimleri gerilmeyi yerel olarak büyütür (stres konsantrasyonu).",
      sections: [
        {
          heading: "S-N Eğrisi ve Çentik Etkisi",
          paragraphs: [
            "S-N (gerilme-çevrim) eğrisi, bir gerilme genliğinde kaç çevrimde kırılma olacağını gösterir. Çeliklerde belirli bir genliğin altında (yorulma sınırı) sonsuz ömür mümkündür. Kesit değişimleri gerilmeyi Kt (stres konsantrasyon faktörü) kadar büyütür; keskin köşeler yerine kavisli geçişler (fillet) kullanılarak azaltılır.",
          ],
          formula: {
            expression: "σmax = Kt · σnominal",
            variables: ["Kt: gerilme yoğunlaşma faktörü", "σnominal: ortalama kesit gerilmesi"],
          },
        },
      ],
      keyPoints: [
        "Yorulma, statik dayanım altında tekrarlı yükle oluşur.",
        "Çelikte yorulma sınırı altında sonsuz ömür mümkündür.",
        "Keskin köşeler Kt'yi artırır; kavisli geçiş (fillet) ile azaltılır.",
      ],
    },
    "Torsiyonel titreşim ve barred speed range": {
      title: "Torsiyonel Titreşim ve Barred Speed Range",
      introduction: "Şaft hattı, motorun çevrimsel tork dalgalanmaları nedeniyle burulma (torsiyonel) titreşimine girer. Rezonansa yakın devir aralıkları, şaft hasarını önlemek için 'yasak devir bölgesi' (barred speed range) olarak işaretlenir.",
      sections: [
        {
          heading: "Rezonans ve Yasak Bölge",
          paragraphs: [
            "Tahrik kuvvetinin frekansı sistemin doğal burulma frekansına yaklaştığında titreşim genliği büyür (rezonans) ve şaft yorulma kırılmasına gidebilir. Bu nedenle ilgili devir aralığında sürekli çalışma yasaklanır; bu bölge hızla geçilir. Torsiyonel sönümleyici (damper) genlikleri azaltmak için kullanılır.",
          ],
        },
      ],
      keyPoints: [
        "Rezonans devirlerinde burulma titreşimi şaftı yorar.",
        "Barred speed range'de sürekli çalışma yasaktır; hızla geçilir.",
        "Torsiyonel damper titreşim genliğini azaltır.",
      ],
    },
    "Aksiyel titreşim": {
      title: "Aksiyel Titreşim",
      introduction: "Aksiyel (eksenel) titreşim, şaft hattının kendi ekseni doğrultusunda ileri-geri salınımıdır. Başlıca kaynağı pervanenin değişken itki kuvveti ve dişli/krank etkileşimidir.",
      sections: [
        {
          heading: "Kaynak ve Etkiler",
          paragraphs: [
            "Pervane kanatlarının değişken yük altında ürettiği itki dalgalanması şaftı eksenel olarak uyarır. Rezonansta itki yatağı (thrust bearing), redüktör ve gövde aşırı yüklenir. Çözüm: eksenel doğal frekansı çalışma devrinden uzak tasarlamak veya eksenel damper kullanmaktır.",
          ],
        },
      ],
      keyPoints: [
        "Aksiyel titreşim şaftın eksen doğrultusundaki salınımıdır.",
        "Başlıca kaynak pervane itki dalgalanmasıdır.",
        "İtki yatağı ve redüktör rezonansta aşırı yüklenir.",
      ],
    },
    "Lateral titreşim ve kritik hız": {
      title: "Lateral Titreşim ve Kritik Hız",
      introduction: "Lateral (enine/whirling) titreşim, dönen şaftın ekseninden sapıp kamçılanmasıdır. Şaftın dönme hızı doğal eğilme frekansına eşitlendiğinde 'kritik hız' oluşur ve sapma tehlikeli biçimde büyür.",
      sections: [
        {
          heading: "Kritik Hız",
          paragraphs: [
            "Dengesizlik (unbalance) ve yatak esnekliği şaftı enine titreştirir. Kritik hızda rezonans nedeniyle sehim büyür; bu nedenle çalışma devri kritik hızdan uzak tutulur. Yatak konumu/sayısı ve şaft rijitliği kritik hızı belirler.",
          ],
          formula: {
            expression: "nkritik ∝ √(k/m)",
            variables: ["k: şaft/yatak rijitliği", "m: kütle"],
          },
        },
      ],
      keyPoints: [
        "Kritik hız = dönme hızının doğal eğilme frekansına eşitlenmesi.",
        "Dengesizlik ve yatak esnekliği lateral titreşimi besler.",
        "Çalışma devri kritik hızdan uzak tutulur.",
      ],
    },
    "Gazaltı kaynağı (MIG/MAG, TIG)": {
      title: "Gazaltı Kaynağı (MIG/MAG, TIG)",
      introduction: "Gazaltı ark kaynağında, kaynak banyosu bir koruyucu gazla (inert veya aktif) atmosferden korunur. MIG/MAG (tel besleme) ve TIG (tungsten elektrot) gemi bakım atölyelerinde yaygındır.",
      sections: [
        {
          heading: "MIG/MAG ve TIG Farkı",
          paragraphs: [
            "MIG (inert gaz, örn. argon) ve MAG (aktif gaz, örn. CO₂/karışım) sürekli beslenen tel elektrot kullanır; hızlı ve verimlidir. TIG ise erimeyen tungsten elektrot ve ayrı dolgu teli kullanır; yavaş ama çok temiz/hassas dikiş verir (paslanmaz, alüminyum, ince kesit). Gemide taşınabilir tüpler ve uygun havalandırma gerekir.",
          ],
        },
      ],
      keyPoints: [
        "MIG/MAG: tel besleme, hızlı; MAG aktif gaz (CO₂) kullanır.",
        "TIG: tungsten elektrot + dolgu teli, temiz ve hassas.",
        "Koruyucu gaz banyoyu atmosferden korur; havalandırma şarttır.",
      ],
    },
    "Kaynak dikişi hesapları": {
      title: "Kaynak Dikişi Hesapları",
      introduction: "Kaynaklı bağlantının taşıma kapasitesi, dikiş tipine (alın/köşe) ve etkin kesit alanına (throat × uzunluk) bağlıdır. Köşe (fillet) kaynağında etkin kalınlık, boğaz (throat) kalınlığıdır.",
      sections: [
        {
          heading: "Köşe Kaynağı Gerilmesi",
          paragraphs: [
            "Köşe kaynağında boğaz kalınlığı, dikiş bacağının yaklaşık 0,707 katıdır. Dikişteki gerilme, yükün etkin kesit alanına (boğaz × uzunluk) bölünmesiyle bulunur ve izin verilen kaynak gerilmesiyle karşılaştırılır.",
          ],
          formula: {
            expression: "a = 0,707·z ;  τ = F / (a · L)",
            variables: ["a: boğaz kalınlığı", "z: bacak boyu", "L: dikiş uzunluğu", "F: yük"],
          },
        },
      ],
      keyPoints: [
        "Köşe kaynağında boğaz a ≈ 0,707·z.",
        "Gerilme = yük / (boğaz × dikiş uzunluğu).",
        "Hesap izin verilen kaynak gerilmesiyle karşılaştırılır.",
      ],
    },
    "NDT (tahribatsız muayene) teknikleri": {
      title: "NDT (Tahribatsız Muayene) Teknikleri",
      introduction: "Tahribatsız muayene (Non-Destructive Testing), parçaya zarar vermeden yüzey ve iç kusurları (çatlak, gözenek, kaynak hatası) tespit eder. Şaft, kaynak ve basınçlı kap kontrolünde kullanılır.",
      sections: [
        {
          heading: "Başlıca Yöntemler",
          paragraphs: [],
          table: {
            headers: ["Yöntem", "Tespit", "Not"],
            rows: [
              ["VT (görsel)", "Yüzey kusurları", "Temel, ucuz"],
              ["PT (penetrant)", "Yüzeye açık çatlak", "İletken olmayan dahil"],
              ["MT (manyetik parçacık)", "Yüzey/yüzey altı (ferromanyetik)", "Yalnız manyetik malzeme"],
              ["UT (ultrasonik)", "İç kusurlar, kalınlık", "Derin, hassas"],
              ["RT (radyografi)", "İç kusurlar (film/dijital)", "Radyasyon güvenliği gerekir"],
            ],
          },
        },
      ],
      keyPoints: [
        "PT yüzeye açık çatlakları, MT ferromanyetik yüzey/yüzeyaltını bulur.",
        "UT iç kusur ve kalınlık ölçer; RT iç kusuru görüntüler.",
        "Yöntem malzemeye ve kusur tipine göre seçilir.",
      ],
    },
    "Cıvata ve perçin bağlantıları": {
      title: "Cıvata ve Perçin Bağlantıları",
      introduction: "Cıvatalı bağlantılar sökülebilir, perçinli bağlantılar ise kalıcıdır. Cıvatalı bağlantının güvenilirliği büyük ölçüde doğru ön gerilme (preload) ve sıkma torkuna bağlıdır.",
      sections: [
        {
          heading: "Ön Gerilme ve Tork",
          paragraphs: [
            "Cıvata sıkıldığında oluşan ön gerilme (preload), bağlantının yük altında ayrılmasını ve cıvatanın yorulmasını önler. Uygulanan tork ile elde edilen ön gerilme, sürtünmeye bağlı bir katsayıyla ilişkilidir.",
          ],
          formula: {
            expression: "T ≈ K · F · d",
            variables: ["T: sıkma torku", "F: ön gerilme", "d: cıvata çapı", "K: tork katsayısı (~0,2)"],
          },
        },
        {
          heading: "Perçin Bağlantıları",
          paragraphs: [
            "Perçinli bağlantılar kalıcıdır; kayma ve ezilme (bearing) gerilmelerine göre tasarlanır. Günümüzde büyük ölçüde kaynak ve yüksek mukavemetli cıvatalarla yer değiştirmiştir, ancak bazı uygulamalarda kullanılır.",
          ],
        },
      ],
      keyPoints: [
        "Cıvata güvenilirliği doğru ön gerilmeye bağlıdır (T ≈ K·F·d).",
        "Yeterli preload yorulma ve ayrılmayı önler.",
        "Perçin kalıcıdır; kayma ve ezilmeye göre tasarlanır.",
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // GEMİ SİSTEMLERİ (ship-systems)
  // ═══════════════════════════════════════════════════════════════
  "ship-systems": {
    "Kapak (hatch cover) mekanizmaları": {
      title: "Ambar Kapağı (Hatch Cover) Mekanizmaları",
      introduction: "Ambar kapakları, yük ambarını hava/su geçirmez (weathertight) biçimde kapatarak yükü ve geminin su geçirmez bütünlüğünü korur. Açma-kapama genellikle hidrolik tahrikle yapılır.",
      sections: [
        {
          heading: "Tipler ve Sızdırmazlık",
          paragraphs: [
            "Yaygın tipler: katlanır (folding), kayar (side/end rolling) ve ponton tipi kapaklardır. Sızdırmazlık, çelik-çeliğe oturma ve çevredeki lastik conta (rubber packing) ile sağlanır; drenaj kanalları (drainage channels) ve geri tepme valfli tahliye delikleri sızan suyu dışarı atar. Kapaklar açıldığında hidrolik silindirler veya zincir/tel sistemleri kullanılır.",
          ],
        },
        {
          heading: "Bakım ve Test",
          paragraphs: [
            "Conta ve oturma yüzeyi sızdırmazlık testleri (tebeşir testi, hortum testi veya ultrasonik sızdırmazlık ölçümü) yapılır. Bozuk conta ve aşınmış oturma su girişine ve yük hasarına yol açar; PSC/sörveylerde sık denetlenir.",
          ],
        },
      ],
      keyPoints: [
        "Ambar kapağı yükü ve su geçirmez bütünlüğü korur (weathertight).",
        "Sızdırmazlık: oturma yüzeyi + lastik conta + drenaj kanalı.",
        "Sızdırmazlık ultrasonik/hortum/tebeşir testiyle kontrol edilir.",
      ],
    },
    "Ramp ve asansör sistemleri": {
      title: "Ramp ve Asansör Sistemleri",
      introduction: "Ro-Ro gemilerinde araç yükleme/boşaltma rampalar ve güverteler arası asansörlerle (cargo lift) yapılır. Bu sistemler ağır yükleri taşır ve emniyet kilitleri kritiktir.",
      sections: [
        {
          heading: "Rampalar ve Asansörler",
          paragraphs: [
            "Kıç/baş/yan rampalar hidrolik silindir ve tel/zincirle hareket eder; kapalıyken weathertight sızdırmazlık ve emniyet kilidi sağlar. İç rampalar ve asansörler güverteler arası araç geçişini sağlar. Aşırı yük, konum sensörleri ve kilit interlock'ları ile yanlış operasyon engellenir.",
          ],
        },
      ],
      keyPoints: [
        "Ro-Ro rampaları hidrolik tahrikle çalışır, kapalıyken weathertight'tır.",
        "İç rampa/asansörler güverteler arası araç geçişini sağlar.",
        "Aşırı yük ve interlock emniyet sistemleri zorunludur.",
      ],
    },
    "Hidrolik silindir ve motor": {
      title: "Hidrolik Silindir ve Motor",
      introduction: "Hidrolik aktüatörler basınçlı akışkan enerjisini mekanik harekete çevirir. Silindir doğrusal hareket/kuvvet, hidrolik motor ise dönme hareketi/tork üretir.",
      sections: [
        {
          heading: "Silindir Kuvveti ve Motor Torku",
          paragraphs: [
            "Silindirin ürettiği kuvvet, basınç ile piston alanının çarpımıdır; çift etkili silindirde geri strokta etkin alan (rod tarafı) daha küçüktür. Hidrolik motorun torku ise basınç ile deplasmana (devir başına hacim) bağlıdır.",
          ],
          formula: {
            expression: "F = p · A ;  T = (p · Vd) / (2π)",
            variables: ["F: silindir kuvveti", "A: piston alanı", "T: motor torku", "Vd: devir başına hacim"],
          },
        },
      ],
      keyPoints: [
        "Silindir kuvveti F = p·A (doğrusal hareket).",
        "Hidrolik motor torku basınç ve deplasmana bağlıdır.",
        "Çift etkili silindirde rod tarafı etkin alanı küçüktür.",
      ],
    },
    "Hidrolik devre okuma": {
      title: "Hidrolik Devre Okuma",
      introduction: "Hidrolik devre şemaları, ISO 1219 standart sembolleriyle çizilir. Şemayı okumak; arıza bulma ve sistemi doğru işletmek için temel beceridir.",
      sections: [
        {
          heading: "Temel Semboller ve Akış",
          paragraphs: [
            "Devrede pompa, tank, basınç emniyet valfi (relief), yön kontrol valfi (directional, örn. 4/3), debi/akış kontrol valfi, çek valf ve aktüatör (silindir/motor) bulunur. Akış pompadan yön valfine, oradan aktüatöre gider; emniyet valfi sistem basıncını sınırlar; dönüş hattı tankın filtresinden geçer. Kesik çizgiler pilot/kumanda hatlarını gösterir.",
          ],
        },
      ],
      keyPoints: [
        "Semboller ISO 1219'a göre standarttır.",
        "Relief valf sistem basıncını sınırlar; yön valfi akışı yönlendirir.",
        "Kesik çizgiler pilot/kumanda hatlarını temsil eder.",
      ],
    },
    "Hidrolik yağ bakımı ve filtrasyon": {
      title: "Hidrolik Yağ Bakımı ve Filtrasyon",
      introduction: "Hidrolik sistem arızalarının büyük çoğunluğu yağ kirliliğinden kaynaklanır. Temizlik sınıfı (ISO 4406) hedeflenir ve filtrasyon ile nem/parçacık kontrol edilir.",
      sections: [
        {
          heading: "Kirlilik ve Filtrasyon",
          paragraphs: [
            "Katı parçacıklar valf ve pompalarda aşınmaya, nem ise korozyon ve yağ bozulmasına yol açar. Temizlik ISO 4406 kodu ile ifade edilir (parçacık sayımı). Basınç hattı, dönüş hattı ve hava firarı (breather) filtreleri kullanılır; yağ analizi (su, viskozite, parçacık) periyodik yapılır.",
          ],
        },
      ],
      keyPoints: [
        "Arızaların çoğu yağ kirliliğinden kaynaklanır.",
        "Temizlik ISO 4406 kodu ile izlenir; filtreler düzenli değişir.",
        "Yağ analizi su/viskozite/parçacık takibi sağlar.",
      ],
    },
    "Hava kurutucu ve filtre üniteleri": {
      title: "Hava Kurutucu ve Filtre Üniteleri",
      introduction: "Basınçlı havadaki nem ve yağ; donma, korozyon ve enstrüman arızalarına yol açar. Hava kurutucu ve filtreler havayı kullanım öncesi temizler.",
      sections: [
        {
          heading: "Kurutma ve Filtreleme",
          paragraphs: [
            "Kompresör sonrası soğutucu (after-cooler) yoğuşan suyu ayırır; ardından kurutucu (soğutmalı veya kurutucu ajanlı/desiccant) çiy noktasını düşürerek nemi giderir. Yağ/parçacık filtreleri (coalescing) kontrol havasını temizler. Otomatik kondens tahliyeleri (auto-drain) hava tanklarında suyu boşaltır.",
          ],
        },
      ],
      keyPoints: [
        "After-cooler ve kurutucu havadaki nemi giderir (çiy noktası düşürülür).",
        "Coalescing filtreler yağ/parçacığı tutar.",
        "Auto-drain hava tanklarındaki suyu otomatik boşaltır.",
      ],
    },
    "Kontrol havası ve servis havası": {
      title: "Kontrol Havası ve Servis Havası",
      introduction: "Gemide basınçlı hava iki ana amaca ayrılır: enstrüman/kontrol havası (temiz, kuru, düşük basınç) ve servis/genel kullanım havası (atölye, temizlik, pnömatik el aletleri).",
      sections: [
        {
          heading: "Ayrım ve Önceliklendirme",
          paragraphs: [
            "Kontrol (enstrüman) havası; pnömatik valf ve kontrol sistemleri için kuru ve yağsız olmalıdır, bu yüzden ek kurutma/filtrasyondan geçer. Servis havası daha düşük kalite tolere eder. Sistemde kontrol havasına öncelik verilir; düşük basınçta servis havası bağlantısı kapatılarak kontrol havası korunur (alarm/otomatik valf ile).",
          ],
        },
      ],
      keyPoints: [
        "Kontrol havası kuru ve yağsız olmalıdır; servis havası daha tolerelidir.",
        "Düşük basınçta kontrol havasına öncelik verilir.",
        "Ayrım, kontrol sistemlerinin güvenilirliğini korur.",
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // YAKIT TEKNOLOJİSİ (fuel-technology)
  // ═══════════════════════════════════════════════════════════════
  "fuel-technology": {
    "Otojen filtrasyon ve oto-filter": {
      title: "Otomatik Geri Yıkamalı Filtre (Auto-Filter)",
      introduction: "Yakıt ve yağ hatlarındaki otomatik (self-cleaning / auto-backflush) filtreler, biriken tortuyu durmaksızın kendiliğinden temizleyerek sürekli temiz akışkan sağlar; özellikle ana makine yakıt beslemesinde kullanılır.",
      sections: [
        {
          heading: "Çalışma Prensibi",
          paragraphs: [
            "Filtre elemanı üzerinde basınç farkı (ΔP) belirli bir eşiği aştığında, sistem otomatik olarak ters yıkama (backflush) yapar veya kendi kendini temizleyen mekanizmayı (fırça/bıçak) devreye alır; biriken tortu tahliye edilir. Genellikle bir ince oto-filtre ile koruyucu kaba filtre birlikte çalışır. Yüksek ΔP alarmı tıkanmayı bildirir.",
          ],
        },
      ],
      keyPoints: [
        "Otomatik filtre ΔP eşiğinde kendini temizler (backflush).",
        "Ana makine yakıt beslemesinde sürekli temiz akış sağlar.",
        "Yüksek ΔP alarmı tıkanma/temizleme gereğini bildirir.",
      ],
    },
    "MARPOL Annex VI kükürt uyumu": {
      title: "MARPOL Annex VI Kükürt Uyumu",
      introduction: "MARPOL Ek VI, gemi egzozundaki kükürt oksit (SOx) emisyonunu yakıt kükürt içeriğini sınırlayarak kontrol eder. 2020'den bu yana küresel sınır %0,50 kütle, Emisyon Kontrol Alanlarında (ECA) ise %0,10'dur.",
      sections: [
        {
          heading: "Sınırlar ve Uyum Yolları",
          paragraphs: [
            "Küresel kükürt sınırı %0,50 m/m; ECA (örn. Baltık, Kuzey Denizi, Kuzey Amerika) bölgelerinde %0,10 m/m. Uyum üç yolla sağlanabilir: (1) uyumlu düşük kükürtlü yakıt (VLSFO/MGO) kullanmak; (2) eşdeğer tedbir olarak egzoz gazı temizleme sistemi (scrubber/EGCS) ile yüksek kükürtlü yakıt kullanmak; (3) LNG gibi alternatif yakıtlar. Gemide Bunker Delivery Note (BDN) ve yakıt numunesi tutulur.",
          ],
        },
        {
          heading: "Belgeler ve Denetim",
          paragraphs: [
            "Uyum, IAPP sertifikası, BDN kayıtları, yakıt numuneleri ve (scrubber kullanılıyorsa) izleme/kayıt sistemleriyle kanıtlanır. ECA'ya girişten önce yakıt değişimi (changeover) tamamlanmalı ve kaydedilmelidir.",
          ],
        },
      ],
      keyPoints: [
        "Küresel sınır %0,50; ECA'da %0,10 kükürt (m/m).",
        "Uyum: düşük kükürtlü yakıt, scrubber veya LNG.",
        "BDN, yakıt numunesi ve IAPP sertifikası ile kanıtlanır.",
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // MAKİNE DAİRESİ OPERASYONLARI (engine-room-ops)
  // ═══════════════════════════════════════════════════════════════
  "engine-room-ops": {
    "Yakıt değiştirme (fuel changeover)": {
      title: "Yakıt Değiştirme (Fuel Changeover)",
      introduction: "Yakıt değiştirme, ECA'ya giriş/çıkışta veya HFO ile damıtık yakıt (MGO) arasında geçişte uygulanır. Ani sıcaklık ve viskozite değişimi enjeksiyon ekipmanına zarar verebileceği için kademeli yapılmalıdır.",
      sections: [
        {
          heading: "Kademeli Geçiş Prensibi",
          paragraphs: [
            "HFO sıcak ve viskoz, MGO ise soğuk ve düşük viskozludur. Geçişte yakıt sıcaklığı kontrollü bir hızla (genellikle dakikada birkaç derece sınırı) değiştirilir; ani değişim yakıt pompası/enjektörde sıkışma (scuffing) ve sızıntıya yol açar. MGO'nun viskozitesi çok düşükse soğutma (chiller) gerekebilir. Değişim, ECA sınırına yeterince önce başlatılır ve saat/mevki ile kayıt altına alınır.",
          ],
        },
      ],
      keyPoints: [
        "Geçiş kademeli yapılır; ani sıcaklık değişimi enjeksiyon ekipmanına zarar verir.",
        "MGO düşük viskozitelidir; gerekirse soğutulur.",
        "Changeover ECA sınırından önce tamamlanır ve kaydedilir.",
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // ÇEVRE VE MAKİNE (environment-machine)
  // ═══════════════════════════════════════════════════════════════
  "environment-machine": {
    "Yağ deşarj izleme sistemi (ODMCS)": {
      title: "Yağ Deşarj İzleme Sistemi (ODMCS)",
      introduction: "ODMCS (Oil Discharge Monitoring and Control System), tankerlerde yük tankı yıkama sularının denize deşarjındaki yağ içeriğini sürekli ölçen ve MARPOL Ek I sınırları aşılırsa deşarjı otomatik durduran sistemdir.",
      sections: [
        {
          heading: "İşlev ve MARPOL Bağlantısı",
          paragraphs: [
            "ODMCS, deşarj edilen suyun anlık yağ oranını (ppm) ve toplam deşarjı izler; MARPOL Ek I (Kural 31) sınırları (örn. anlık deşarj oranı litre/deniz mili sınırı ve toplam miktar) aşılırsa deşarj valfini otomatik kapatır ve kayıt tutar. Bu, sintine için kullanılan 15 ppm yağlı su ayırıcıdan (OWS) farklı, yük tankı deşarjına özgü bir sistemdir.",
          ],
        },
      ],
      keyPoints: [
        "ODMCS tanker yük tankı deşarjındaki yağ oranını izler (MARPOL Ek I).",
        "Sınır aşılırsa deşarjı otomatik durdurur ve kayıt tutar.",
        "Sintine 15 ppm yağlı su ayırıcısından (OWS) farklıdır.",
      ],
    },
    "Balast su arıtma sistemleri (BWTS)": {
      title: "Balast Su Arıtma Sistemleri (BWTS)",
      introduction: "Balast suyuyla bir bölgeden diğerine taşınan istilacı türleri önlemek için, BWM Konvansiyonu balast suyunun arıtılmasını (D-2 standardı) zorunlu kılar. BWTS bu arıtmayı sağlayan sistemdir.",
      sections: [
        {
          heading: "Arıtma Yöntemleri ve D-2 Standardı",
          paragraphs: [
            "BWM Konvansiyonu D-2 standardı, deşarj edilen balast suyundaki canlı organizma sayısına üst sınır koyar. BWTS genellikle iki aşamalıdır: filtrasyon (büyük organizma/tortu ayırma) + dezenfeksiyon. Dezenfeksiyon ya UV ışınıyla ya da elektroklorinasyon/kimyasal ile yapılır. Sistem balast alma ve/veya basma sırasında çalışır; gemide Balast Suyu Yönetim Planı ve kayıt defteri bulunur.",
          ],
        },
      ],
      keyPoints: [
        "BWM Konvansiyonu D-2 standardı canlı organizma sınırı koyar.",
        "BWTS genelde filtrasyon + dezenfeksiyon (UV veya elektroklorinasyon) yapar.",
        "Balast suyu yönetim planı ve kayıt defteri zorunludur.",
      ],
    },
  },
};

export default content11;
