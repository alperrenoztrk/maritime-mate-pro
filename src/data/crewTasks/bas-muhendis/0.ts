import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Ana makine ve itki sisteminin sürekli operasyonelliği",
  roleSlug: "bas-muhendis",
  taskIndex: 0,
  estimatedPages: 27,
  intro: `Baş Mühendis (Chief Engineer), geminin propulsion train'inin — yakıt sisteminden başlayıp piston, krank, şaft ve pervaneye kadar uzanan tüm zincirin — sürekli operasyonelliğinden sorumludur. Bu sorumluluk; performans izleme, condition monitoring, yakıt yönetimi, MARPOL uyumluluğu, klas survey hazırlığı ve kritik arızada karar almayı kapsar. Bu bölüm, modern bir 2-stroke düşük hızlı dizel ana makinenin günlük yönetimini, performans göstergelerini, sık karşılaşılan arızalarını ve Baş Mühendis'in karar matrisini detaylı olarak ele alır.`,
  sources: [
    "MARPOL Annex VI (Air Pollution Prevention)",
    "IACS UR M (Unified Requirements — Machinery)",
    "IMO MEPC.328(76) — EEXI ve CII düzenlemeleri",
    "MAN ES / WinGD / Wärtsilä Operating Manuals",
    "Lloyd's Register — Machinery Damage Reports",
    "ICOMIA & SNAME teknik bültenleri",
  ],
  chapters: [
    {
      heading: "1. Modern 2-Stroke Düşük Hızlı Dizel Ana Makinenin Anatomisi",
      sections: [
        {
          subheading: "1.1 Sistem mimarisi",
          paragraphs: [
            `Modern bir tanker veya bulk carrier'in ana makinesi tipik olarak MAN B&W ME-C, WinGD X ya da Wärtsilä RT-flex serisinden bir 2-stroke crosshead motorudur. Cylinder bore 500-1080 mm arası, stroke 2400-3500 mm, MCR (Maximum Continuous Rating) 5-90 MW arası değişir. Bu motorlar HFO (Heavy Fuel Oil), MGO (Marine Gas Oil) veya VLSFO (Very Low Sulphur Fuel Oil) kullanır; LNG dual-fuel ve methanol seçenekleri 2020 sonrası yaygınlaşmıştır.`,
            `Sistemin ana bileşenleri: yakıt sistemi (booster, viscotherm, common rail / camshaft), yağlama sistemi (cylinder lube oil + system oil), soğutma sistemi (jacket water + piston cooling + LT/HT FW), turboşarj grubu (T/C + air cooler + scavenge air receiver), exhaust sistemi (uniflow scavenging port + exhaust valve), krank/şaft hattı ve pervane.`,
          ],
        },
        {
          subheading: "1.2 Performans göstergeleri",
          table: {
            caption: `Tipik 2-stroke ME-C için performans aralıkları`,
            headers: ["Parametre", "Normal Aralık", "Uyarı Eşiği", "Kritik"],
            rows: [
              ["Pmax (silindir tepe basıncı)", "150-180 bar", "+5 bar farkı", "+10 bar farkı"],
              ["Tcomp (kompresyon basıncı)", "120-150 bar", "-10%", "-20%"],
              ["Texh (egzoz çıkış sıcaklığı)", "350-450 °C", "+30 °C farkı", "+50 °C farkı"],
              ["T/C devri", "8000-12000 rpm", "+10% farkı", "+15% farkı"],
              ["Scav air pressure", "2.5-4.0 bar", "−0.3 bar farkı", "−0.5 bar"],
              ["Cylinder lub. oil feed rate", "0.6-1.4 g/kWh", "Manual'a göre", "Manual üstü"],
            ],
          },
          paragraphs: [
            `Bu parametrelerin günlük "engine performance log"a eksiksiz işlenmesi zorunludur. Baş Mühendis log'u her gün kontrol eder; sapma trend'lerini ECR (Engine Control Room) bilgisayarındaki performance monitoring yazılımıyla (örn. CoCoS-EDS, WiCE, MAPEX-PM) çapraz okur. Cylinder balance, exhaust gas spread ve T/C matching bu yazılımlarda otomatik raporlanır.`,
          ],
        },
      ],
    },
    {
      heading: "2. Performans İzleme: Indicator Diagram ve Pmax Balansı",
      sections: [
        {
          subheading: "2.1 Indicator diagram (Mechanical / Electronic)",
          paragraphs: [
            `Klasik mekanik indicator card (PVT cihazı) ya da modern elektronik PMI (Pressure Measurement Indicator) ile her silindirin Pmax, Pcomp, Pexp, MIP (Mean Indicated Pressure) ve IHP değerleri ölçülür. Sefer başına en az iki kez (loaded ve ballast) ölçüm önerilir; klas survey hazırlığında zorunludur.`,
            `Pmax dengesizliği; injector arızası, fuel cam timing kayması, exhaust valve seat sızdırması, T/C dengesizliği veya ring blow-by gibi nedenlere işaret eder. Baş Mühendis, dengesiz silindiri öncelikli olarak inspect eder ve PMS work order açar.`,
          ],
        },
        {
          subheading: "2.2 Indicated horsepower ve specific fuel oil consumption (SFOC)",
          paragraphs: [
            `IHP = (Pmean × L × A × N) / (60 × 75) klasik formülü ile hesaplanır. SFOC = (yakıt sarfı [g/h]) / (IHP × 0.7355) — modern motorlarda 165-175 g/kWh aralığında olmalıdır. SFOC sürekli yükseliyorsa kompresyon kaybı, injector aşınması veya yakıt kalitesi şüphelidir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Pratik trend okuma",
              text: `Tek bir günün ölçümü değil, 30 günün rolling average'i izlenir. SFOC'un %3'ten fazla artışı her zaman incelenmelidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Yakıt Sistemi ve Yakıt Kalitesi Yönetimi",
      sections: [
        {
          subheading: "3.1 Bunker süreci ve numune alma",
          paragraphs: [
            `Bunker operasyonunda Baş Mühendis bizzat süreci denetler: BDN (Bunker Delivery Note), continuous drip sample alımı (4-way sampler), pre-bunker checklist (SOLAS + MARPOL Annex VI), barjla iletişim, vapour line (varsa), gemi tank seviyeleri ve ROB (Remaining On Board) kayıtları.`,
            `Sample 4 şişeye paylaştırılır: gemide saklanan, FOBAS/VPS gibi laboratuvara gönderilen, supplier kopyası ve liman otoritesi kopyası. Lab raporu (CCAI, density, viscosity, water content, sulfur, vanadium, alüminyum + silikon, sediment, CCAI > 870 ise tutuşma riski) gelene kadar yakıt kullanılmaz; aciliyet varsa kalite şüphesiyle riskli kullanım kayıt altına alınır.`,
          ],
        },
        {
          subheading: "3.2 MARPOL Annex VI uyumluluğu — sülfür rejimi",
          paragraphs: [
            `2020 IMO global sulphur cap, %0.50 m/m (global) ve %0.10 m/m (ECA — Baltık, Kuzey Denizi, ABD/Kanada kıyıları) zorunlu kılar. ECA giriş öncesi changeover sequence başlatılır; 1 saatten az sürede MGO'ya geçiş yapılır ve ChangeOver Calculator ile kayıt tutulur. Yüksek sülfürlü yakıt sadece scrubber ile çalışan gemilerde kullanılabilir.`,
            `2024'ten itibaren EU ETS (Emission Trading System) gemileri kapsadı; CO2 emisyonları için allowance satın alınması gerekir. CII (Carbon Intensity Indicator) yıllık olarak hesaplanır; üst üste D veya E sınıfı alan gemiler corrective action plan zorunludur. Baş Mühendis, EEXI/CII performans takibinden doğrudan sorumludur.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MARPOL Annex VI Reg. 14",
              text: `Sefer süresince kullanılan yakıtın sülfür içeriği üst limit içinde olmak zorundadır. PSC denetimi yakıt numunesi alır; uyumsuzluk gemi tutmaya ve yüksek cezaya yol açar.`,
            },
          ],
        },
        {
          subheading: "3.3 Yakıt arıtma ve viskozite kontrolü",
          paragraphs: [
            `HFO/VLSFO için purifier (centrifugal separator) optimum 90-98 °C'de çalıştırılır. Gravity disc / interface ayarı yakıt density'sine göre yapılır. Viscotherm ile injection viscosity 10-15 cSt aralığında tutulur (yakıt viskozitesi düşükse soğutma gerekir, yüksekse ısıtma). Yanlış viscotherm ayarı injector aşınması ve atomization kalitesini bozar.`,
          ],
        },
      ],
    },
    {
      heading: "4. Yağlama Sistemi ve Cylinder Lubrication",
      sections: [
        {
          subheading: "4.1 Cylinder lube oil ve TBN seçimi",
          paragraphs: [
            `Cylinder oil, yakıt sülfür içeriğine göre seçilir. Yüksek sülfürlü HFO için 70-100 TBN (Base Number) yağlar; düşük sülfürlü VLSFO/MGO için 25-40 TBN yağlar uygundur. Yanlış TBN seçimi cold corrosion veya deposit problemlerine yol açar.`,
            `Modern Alpha lubricator veya MEGI tipi feed rate yönetimi, motor yüküne ve yakıt sülfürüne göre dozajı otomatik ayarlar. Drain oil analizi (Fe, Sn, Pb, Cu metal trendleri, BN reserve) aylık olarak yapılır; trend yükselişi liner/ring/piston aşınmasına işaret eder.`,
          ],
        },
        {
          subheading: "4.2 System oil (crankcase) yönetimi",
          paragraphs: [
            `System oil, krank yatakları, kreyshed, yatay yataklar ve T/C için kullanılır. ISO VG 100 / SAE 30 tipik viskozite. Su girişi (jacket leak), yakıt girişi (injector failure, fuel pump leak) ve metal partikül artışı kritik göstergelerdir. Quarterly analiz (Spectro, FT-IR, TBN, viscosity) ile durum izlenir.`,
          ],
        },
      ],
    },
    {
      heading: "5. Turboşarj ve Hava/Egzoz Sistemi",
      sections: [
        {
          subheading: "5.1 T/C performans denetimi",
          paragraphs: [
            `T/C devri, scavenge air pressure ve egzoz back pressure günlük log'a yazılır. Compressor side fouling (oily air filter, oil deposit) ve turbine side fouling (carbon deposit) zaman içinde verim kaybına yol açar. Periyodik su yıkama (compressor side dry/wet wash, turbine side soft cleaner) prosedürü uygulanır.`,
            `Surging (compressor durağan akım kaybı) çok ciddi bir uyarıdır; T/C şaft yataklarına büyük zarar verir. Surge alarmı gelirse motor yükü düşürülür, sebep aranır (exhaust valve sızdırması, scav air leak vb.).`,
          ],
        },
        {
          subheading: "5.2 Air cooler ve scavenge air sistemi",
          paragraphs: [
            `Air cooler temizliği yakıt verimini doğrudan etkiler. Sea water side fouling (deniz canlıları, kum) için chemical cleaning prosedürü uygulanır; air side için periyodik wash. Scavenge air receiver'da scav port'lardan damlayan yağ veya partikül "scavenge fire" işareti olabilir; sıcaklık monitoring ve düzenli inspection şarttır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Scavenge fire",
              text: `Scavenge box yangını; fazla cylinder oil, ring blow-by veya yakıt sızıntısı sonucu oluşur. Sıcak gaz, scav air receiver'a yayılır ve T/C zarar görebilir. Acil eylem: motor yükü sıfır, scav air manifold drain, sürekli soğutma, sebep tespiti.`,
            },
          ],
        },
      ],
    },
    {
      heading: "6. Şaft ve Pervane Sistemi",
      sections: [
        {
          subheading: "6.1 Şaft alignment ve yatak yükleri",
          paragraphs: [
            `Şaft hattı, intermediate bearings + stern tube bearing + pervane şaftı + propeller'dan oluşur. Yanlış alignment, yataklarda hot bearing, vibration ve uzun vadede şaft çatlamasına yol açar. Class survey'de gap & sag ölçümleri ve bearing weight measurement zorunludur.`,
            `Stern tube bearing yağ sıcaklığı (genelde <60 °C), forward/aft seal koşulu, yağ tüketim miktarı (water ingress kontrolü) günlük izlenir. Bilge tank içinde stern tube oil görülürse seal sızıntısı vardır; gerekirse drydock için planlama yapılır.`,
          ],
        },
        {
          subheading: "6.2 Propeller verim ve cavitation",
          paragraphs: [
            `Pervane verimi; sefer süresince fouling (kabuklanma), erosion ve cavitation pitting nedeniyle düşer. Hull & propeller polishing periyodik olarak (tipik 6-12 ayda bir) yapılır; bu, %3-5 yakıt tasarrufu sağlayabilir.`,
          ],
        },
      ],
    },
    {
      heading: "7. Condition Monitoring ve Predictive Maintenance",
      sections: [
        {
          subheading: "7.1 Vibration ve thermography",
          paragraphs: [
            `Pompalar, T/C, jeneratörler, separator ve şaft yataklarında periyodik vibration ölçümleri (ISO 10816 standardı) kayıt altına alınır. Trend yükselişi yatak veya alignment problemine işaret eder. Thermography kameraları elektrik panolarında, yataklarda ve buhar boru hatlarında hot spot tespit eder.`,
          ],
        },
        {
          subheading: "7.2 Yağ analizi ve metal partikül trendleri",
          paragraphs: [
            `Aylık spectroanalysis (Al, Cr, Cu, Fe, Pb, Sn, Si metalleri ve V, Na yakıt kontaminasyonu) trend grafiğine işlenir. Si artışı yakıt veya hava filtresi kaynaklı kum girişi; Cu yatak yüzeyi aşınması; Fe ring veya liner aşınması anlamına gelir.`,
          ],
        },
      ],
    },
    {
      heading: "8. Kritik Arıza Senaryoları ve Karar Matrisi",
      sections: [
        {
          subheading: "8.1 Black-out ve dead ship senaryosu",
          paragraphs: [
            `Tüm jeneratörlerin kaybı (black-out) durumunda emergency generator otomatik devreye girer; SOLAS II-1/43 kapsamında 45 saniye içinde temel servisleri besler. Dead ship recovery için starting air kullanılır (ana hava tankı + emergency air compressor, IACS UR M61 gerekli).`,
            `Baş Mühendis için drill senaryosu: emergency generator başlatma, main generator paralelleme, bus-tie kapatma, ana makine restart sırası, navigation ve haberleşme servislerinin geri gelmesi. Yıllık dead ship drill kayıt altında olmalıdır.`,
          ],
        },
        {
          subheading: "8.2 Crankcase explosion ve oil mist detector",
          paragraphs: [
            `Crankcase explosion; hot spot (yatak overheating) → atomized oil + air karışımı → ignition zinciriyle oluşur. Oil mist detector (Schaller, Visatron) ve bearing temperature sensors erken uyarı sağlar. Alarm anında: motor yükü sıfır, derhal stop, crankcase doors açma yasak (15-30 dk soğuma sonrası kontrollü açım), boundary cooling.`,
          ],
        },
        {
          subheading: "8.3 Cooling water loss ve overheating",
          paragraphs: [
            `Jacket cooling water düşüşü kompresyon ringlerinde ve liner'da büyük termal şok yaratır. Acil eylem: yük kademeli düşürme, sebep arama (pump trip, expansion tank dry, tube leak), gerekirse stop. Re-cooling işlemi yavaş yapılmalı; aksi halde liner çatlar.`,
          ],
        },
      ],
    },
    {
      heading: "9. Klas Survey, PSC ve Vetting Hazırlığı",
      sections: [
        {
          subheading: "9.1 Continuous Machinery Survey (CMS)",
          paragraphs: [
            `Modern gemilerin çoğu 5 yıllık özel sörvey döngüsünde CMS programıyla yönetilir. Her ekipman 5 yılda bir denetlenir; PMS kayıtları kanıt olarak kullanılır. Baş Mühendis, klas surveyor için crank deflection ölçümleri, exhaust valve overhaul kayıtları, T/C overhaul ve ME safety devices test kayıtlarını hazır tutar.`,
          ],
        },
        {
          subheading: "9.2 PSC ve vetting (TMSA, OCIMF SIRE)",
          paragraphs: [
            `PSC denetiminde sıkça sorulanlar: ORB doğru tutuluyor mu, OWS 15 ppm alarm test, sewage system MARPOL Annex IV uyumlu mu, garbage management plan, emergency generator weekly test, bilge alarm test. Vetting (özellikle tankerlerde) TMSA element 8 (engine room operations) ve element 9 (energy management) sorgular.`,
          ],
        },
      ],
    },
    {
      heading: "10. Liderlik, Belgeleme ve Sonuç",
      sections: [
        {
          subheading: "10.1 ECR disiplini ve karar günlüğü",
          paragraphs: [
            `Baş Mühendis için en güçlü kanıt, sürekli ve dürüst tutulan log book ve ECR karar günlüğüdür. Anormal gözlem, yapılan müdahale, kullanılan yedek parça, alınan ölçüm ve verilen karar yazılı olarak kayıtlanır. Bu disiplin; survey, vetting, PSC ve sigorta süreçlerinde gemiyi koruyan tek belgedir.`,
          ],
        },
        {
          subheading: "10.2 Sonuç",
          paragraphs: [
            `Ana makine ve itki sisteminin sürekli operasyonelliği, sadece teknik bilgi değil; sistematik izleme, dikkatli karar alma ve titiz dokümantasyon kültürü gerektirir. Modern Baş Mühendis, mekanik bir ustanın yanında; veri analisti, mevzuat uzmanı ve sistem yöneticisidir.`,
          ],
        },
      ],
    },
  ],
};

export default content;
