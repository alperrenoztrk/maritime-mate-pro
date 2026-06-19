import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Çevre koruma ve MARPOL uyumluluğu",
  roleSlug: "bas-muhendis",
  taskIndex: 4,
  estimatedPages: 26,
  intro: `Çevre koruma, Baş Mühendis'in hem yasal hem etik açıdan en hassas sorumluluk alanıdır; çünkü makine dairesi, geminin deniz ve hava kirliliği üreten tüm akışlarının (bilge suyu, sludge, slop, atık yağ, egzoz emisyonu, ballast suyu, çöp) çıkış noktasıdır. Bu görev; OWS (Oil Water Separator) ve 15 ppm bilge alarm operasyonundan, sludge/slop yönetiminden, ORB (Oil Record Book) doğruluğundan, ballast water management'tan, çöp yönetiminden ve NOx/SOx/PM emisyon kontrolünden oluşur. "Magic pipe" davalarının milyonlarca dolar ceza ve hapis cezasıyla sonuçlandığı bir alanda, dürüst kayıt hayatidir.`,
  sources: [
    "MARPOL Annex I (Oil) — ORB, OWS, 15 ppm requirement",
    "MARPOL Annex IV (Sewage) & Annex V (Garbage)",
    "MARPOL Annex VI (Air Pollution — NOx, SOx, PM)",
    "IMO Resolution MEPC.107(49) — 15 ppm Bilge Separator standard",
    "Ballast Water Management Convention (BWM) — D-2 standard",
    "US APPS (Act to Prevent Pollution from Ships) & USCG case law",
    "IMO Garbage Record Book & Ballast Water Record Book guidelines",
  ],
  chapters: [
    {
      heading: "1. Çevre Uyumluluğunun Çerçevesi ve Risk",
      lead: `Çevre ihlalleri, teknik bir hatadan çok bir kayıt ve dürüstlük meselesidir; ABD APPS davalarının çoğu ihlalin kendisinden değil, sahte kayıttan açılmıştır.`,
      sections: [
        {
          subheading: "1.1 Yasal çerçeve ve cezalar",
          paragraphs: [
            `MARPOL'ün tüm ekleri (I-VI) makine dairesini ilgilendirir. ABD'de APPS, sahte Oil Record Book tutmayı federal suç sayar; gemicilere "whistleblower" ödülü (cezanın %50'sine kadar) verilebilir. Bu nedenle bir tek mürettebatın ihbarı, şirkete milyon dolarlık ceza ve sorumlu zabite hapis cezası getirebilir.`,
            `Baş Mühendis için temel ilke: "kayıtla gerçek birebir uyuşmalı". Bypass hattı (magic pipe), kayıt manipülasyonu veya 15 ppm cihazının kandırılması asla kabul edilemez. Ekipman arızalansa bile, doğru kayıt ve uygun bertaraf (shore reception) tek doğru yoldur.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Magic pipe — sıfır tolerans",
              text: `OWS'i bypass eden gizli hat ("magic pipe") veya 15 ppm alarmı kandırmak (temiz su besleme), tespit edildiğinde şirkete ve şahsa ağır cezalarla sonuçlanır. Hiçbir operasyonel baskı bunu haklı çıkarmaz; çözüm her zaman shore disposal'dır.`,
            },
          ],
        },
        {
          subheading: "1.2 Atık akışlarının haritası",
          table: {
            caption: `Makine dairesi çevresel atık akışları ve mevzuat`,
            headers: ["Atık", "Kaynak", "Mevzuat", "Bertaraf yolu"],
            rows: [
              ["Bilge suyu", "Makine dairesi sızıntı/drenaj", "Annex I", "OWS→denize (<15ppm) / shore"],
              ["Sludge", "Purifier, fuel/oil arıtma", "Annex I", "Incinerator / shore"],
              ["Slop", "Tank yıkama (tanker)", "Annex I", "Shore / load on top"],
              ["Sewage", "Tuvalet, gri su", "Annex IV", "STP / shore / mesafe kuralı"],
              ["Garbage", "Operasyonel/yemek atığı", "Annex V", "Shore / sınırlı denize"],
              ["Egzoz emisyon", "Yanma", "Annex VI", "Scrubber / yakıt seçimi"],
              ["Ballast", "Trim/stabilite suyu", "BWM Conv.", "BWMS (D-2)"],
            ],
          },
          paragraphs: [
            `Baş Mühendis bu akışların her biri için doğru ekipman, doğru kayıt defteri ve doğru bertaraf yolunu yönetir. Her akışın kendine özgü kayıt defteri vardır ve denetimde çapraz kontrol edilir.`,
          ],
        },
      ],
    },
    {
      heading: "2. Bilge Suyu ve Oil Water Separator (OWS)",
      sections: [
        {
          subheading: "2.1 OWS çalışma prensibi ve 15 ppm alarm",
          paragraphs: [
            `OWS (genelde gravity coalescer + ikinci kademe filtre), bilge suyundan yağı ayırır. Çıkış suyu 15 ppm Oil Content Meter (OCM/oil monitor) ile sürekli ölçülür; 15 ppm aşıldığında three-way valve otomatik olarak suyu bilge tank'a geri yönlendirir (denize basamaz). Bu MEPC.107(49) standardının çekirdeğidir.`,
            `Modern oil monitorlar tamper-proof (kayıt loglu, mühürlü) tasarlanmıştır; ne zaman, kaç ppm ile, ne kadar denize basıldığını kaydeder. Bu log, ORB ile çapraz kontrol edilir. Special area'larda (Akdeniz, Baltık, Karadeniz vb.) ve liman içinde denize basmak yasaktır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MARPOL Annex I Reg. 14 & 15",
              text: `400 GT üzeri gemiler 15 ppm bilge separator ve oil monitor bulundurmalıdır. Makine dairesi bilge suyu ancak ≤15 ppm, gemi yolda (en route) ve özel bölge dışında denize verilebilir. Aksi her durumda shore reception facility kullanılır.`,
            },
          ],
        },
        {
          subheading: "2.2 OWS bakımı ve doğru operasyon",
          paragraphs: [
            `OWS'in düzgün çalışması coalescer eleman temizliği, oil monitor kalibrasyonu ve doğru emülsiyon yönetimine bağlıdır. Deterjan/temizlik kimyasalları bilge suyunda emülsiyon yaratır; bu emülsiyon OWS'in ayrım verimini düşürür ve alarmı sürekli tetikler. Bu yüzden makine dairesinde deterjan kullanımı kontrol altında tutulur.`,
            `Baş Mühendis, OWS her çalıştırıldığında: operatörü gözler, oil monitor kaydını ORB ile eşler, denize basma süresini ve pozisyonu doğrular. OWS arızalıysa bilge suyu shore'a verilir; "arıza nedeniyle bypass" asla seçenek değildir.`,
          ],
        },
      ],
    },
    {
      heading: "3. Sludge ve Slop Tank Yönetimi",
      sections: [
        {
          subheading: "3.1 Sludge üretimi, hesabı ve bertarafı",
          paragraphs: [
            `Sludge; purifier deşarjı, fuel/oil arıtma kalıntısı ve drain'lerden gelen yağlı atıktır. Üretim oranı yaklaşık yakıt tüketiminin %1-1.5'i kadar tahmin edilir (IMO sludge generation formülü). Sludge tank kapasitesi ve günlük üretim arasındaki denge izlenir; incinerator ile yakılır veya shore reception facility'ye verilir.`,
            `Sludge ölçümü (sounding) düzenli yapılır ve ORB Code C/D'ye işlenir. Üretim-bertaraf dengesizliği (örn. çok az shore disposal ama düşük tank seviyesi) denetimde "magic pipe" şüphesi yaratır; bu yüzden sludge balansı tutarlı ve izlenebilir olmalıdır.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka: Sludge balans tutarsızlığı",
              text: `Bir PSC denetiminde, gemideki sludge tank seviyesi düşük ama hiç shore disposal kaydı yoktu ve incinerator çalışma saatleri yetersizdi. Bu tutarsızlık detaylı soruşturma ve OWS bypass şüphesi başlattı. Ders: sludge üretim, yakma ve bertaraf kayıtları her zaman birbiriyle uyumlu olmalıdır.`,
            },
          ],
        },
        {
          subheading: "3.2 Incinerator operasyonu",
          paragraphs: [
            `Incinerator (IMO type-approved), sludge ve katı atığı yakar. Special area ve liman içinde, ayrıca belirli mesafe kurallarında kullanımı kısıtlıdır. Doğru çalışma sıcaklığı (yanma odası genelde 850°C+), su içeriği yüksek sludge'da yanma zorluğu ve flue gas kalitesi yönetilir. Incinerator çalışma saatleri ve yakılan miktar kaydedilir.`,
          ],
        },
      ],
    },
    {
      heading: "4. Oil Record Book (ORB) Disiplini",
      sections: [
        {
          subheading: "4.1 ORB Part I ve doğru kayıt",
          paragraphs: [
            `ORB Part I (makine dairesi operasyonları), her yağlı atık operasyonunu kayıt altına alır: ballast/cleaning of fuel tanks, bilge water disposal, sludge disposal, bunkering, OWS kullanımı, kazara/istisnai deşarj. Her kayıt zaman, pozisyon, miktar, tank kimliği ile yapılır ve sorumlu zabit imzalar; sayfa Kaptan tarafından imzalanır.`,
            `Kayıtlar gerçek zamanlı, silinmeden (düzeltme tek çizgi + paraf), eksiksiz tutulur. ORB'nin tam, doğru ve güncel olması PSC ve USCG denetiminin ilk kontrol noktasıdır. Boşluklar, geç kayıtlar veya gerçekle uyumsuzluk en sık deficiency ve dava nedenidir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MARPOL Annex I Reg. 17 — ORB",
              text: `ORB her yağ operasyonundan sonra gecikmeksizin doldurulmalı, sorumlu zabit imzalamalı ve 3 yıl saklanmalıdır. Sahte/eksik ORB, ihlalin kendisinden daha ağır şekilde cezalandırılır.`,
            },
          ],
        },
        {
          subheading: "4.2 Çapraz kontrol ve denetim hazırlığı",
          paragraphs: [
            `Baş Mühendis, ORB kayıtlarını oil monitor logu, sludge sounding, incinerator saati, shore disposal makbuzları ve tank seviyeleri ile çapraz kontrol eder. Bu kayıtların hepsi tutarlı olmalıdır. Denetim öncesi bu mutabakatı kendisi yapar; tutarsızlık varsa, gizlemek yerine açıklar ve düzeltir.`,
          ],
        },
      ],
    },
    {
      heading: "5. Ballast Water Management",
      sections: [
        {
          subheading: "5.1 BWMS ve D-2 standardı",
          paragraphs: [
            `BWM Convention, geminin ballast suyundaki invaziv organizmaları kontrol için D-2 biological standard uyumunu zorunlu kılar. Modern gemiler type-approved BWMS (UV, electrochlorination, ozone) ile donanır. Baş Mühendis, BWMS'in doğru çalışmasını, sensör kalibrasyonunu ve ballast operasyonlarının BWRB'ye (Ballast Water Record Book) kaydını yönetir.`,
            `BWMS arızasında contingency measures (alternatif liman, mid-ocean exchange D-1 geçici, shore reception) ve ilgili liman otoritesi bilgilendirmesi devreye girer. ABD USCG ve bazı limanlar BWMS uyumunu sıkı denetler ve sample alır.`,
          ],
        },
        {
          subheading: "5.2 BWRB ve operasyon kaydı",
          paragraphs: [
            `Her ballast alımı, deşarjı, BWMS treatment ve arıza BWRB'ye kaydedilir. Kayıt zaman, pozisyon, miktar ve treatment durumunu içerir. Bu defter de ORB gibi denetimde incelenir ve gerçekle tutarlı olmalıdır.`,
          ],
        },
      ],
    },
    {
      heading: "6. Hava Emisyonları: NOx, SOx, PM",
      sections: [
        {
          subheading: "6.1 SOx ve sülfür uyumu",
          paragraphs: [
            `SOx emisyonu doğrudan yakıt sülfürüne bağlıdır; global %0.50, ECA %0.10 limiti uygulanır (bkz. Yakıt Yönetimi bölümü). Scrubber'lı gemiler HSFO kullanır ancak EGCS washwater pH, PAH ve turbidite limitleri (MEPC kılavuzu) içinde tutulmalı ve sürekli izlenmelidir. Bazı limanlar open-loop scrubber deşarjını yasaklar.`,
          ],
          table: {
            caption: `MARPOL Annex VI NOx Tier limitleri (yaklaşık, devir bazlı)`,
            headers: ["Tier", "Geçerlilik", "Kapsam", "Not"],
            rows: [
              ["Tier I", "2000+ inşa", "Global", "Temel NOx limiti"],
              ["Tier II", "2011+ inşa", "Global", "~%15-20 daha düşük"],
              ["Tier III", "2016+ inşa", "NOx ECA içinde", "~%80 düşük (SCR/EGR)"],
            ],
          },
        },
        {
          subheading: "6.2 NOx kontrolü ve teknik dosya",
          paragraphs: [
            `NOx emisyonu motorun yanma sıcaklığına bağlıdır. Tier III için SCR (Selective Catalytic Reduction — urea/AdBlue ile) veya EGR (Exhaust Gas Recirculation) kullanılır. Her motor, NOx Technical File ile sertifikalıdır; ayar parametreleri (injection timing, nozzle, cam) bu dosyanın izin verdiği aralıkta tutulmalıdır. İzinsiz "tuning" NOx ihlalidir.`,
            `EIAPP sertifikası ve onboard NOx verification prosedürü, motorun sertifikalı durumda olduğunu kanıtlar. Baş Mühendis, motor üzerinde sadece NOx Technical File'ın izin verdiği bileşenleri ve ayarları kullanır.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "EEXI / CII ve EU ETS",
              text: `2024'ten itibaren EU ETS, gemi CO2 emisyonlarını kapsar; allowance satın alınır. CII yıllık karbon yoğunluğu rating'i (A-E) izlenir. Baş Mühendis, doğru yakıt verisi raporlaması ve enerji verimliliği önlemleriyle bu uyumun teknik tarafından sorumludur.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. Sewage (Annex IV) ve Garbage (Annex V)",
      sections: [
        {
          subheading: "7.1 Sewage treatment plant",
          paragraphs: [
            `MARPOL Annex IV, lağım suyu deşarjını düzenler: type-approved STP (Sewage Treatment Plant) ile işlenmiş su belirli koşullarda denize verilebilir; işlenmemiş su yalnızca kıyıdan >12 nm, gemi en route ve belirli hızda verilebilir. STP'nin biyolojik prosesi (aktif çamur) ve disinfection performansı izlenir.`,
          ],
        },
        {
          subheading: "7.2 Garbage management ve kayıt",
          paragraphs: [
            `Annex V, çöpün denize atılmasını çok büyük ölçüde yasaklar; plastik kesinlikle yasaktır. Garbage Management Plan ve Garbage Record Book ile her bertaraf (shore, incinerator, sınırlı denize) kaydedilir. Makine dairesi atıkları (oily rags, kullanılmış filtre, boya kovaları) doğru kategoride ayrıştırılır ve shore'a verilir.`,
          ],
        },
      ],
    },
    {
      heading: "8. Çevre Yönetim Sistemi ve Denetim",
      sections: [
        {
          subheading: "8.1 SEEMP, EnMS ve sürekli iyileştirme",
          paragraphs: [
            `SEEMP (Ship Energy Efficiency Management Plan) ve şirketin çevre yönetim sistemi (bazıları ISO 14001), enerji ve atık performansını sürekli izleyip iyileştirir. Baş Mühendis, makine dairesi tarafından bu sistemlerin veri sağlayıcısı ve uygulayıcısıdır; trend raporları superintendent ile paylaşılır.`,
          ],
        },
        {
          subheading: "8.2 PSC, vetting ve çevre odağı",
          paragraphs: [
            `PSC ve vetting denetimlerinde çevre odak noktaları: ORB/GRB/BWRB doğruluğu, 15 ppm alarm testi, OWS fonksiyonu, sludge balansı, incinerator kaydı, scrubber washwater izleme ve sülfür uyumu. Eksik veya tutarsız kayıt, gemiyi tutmaya ve şirket sicilini bozmaya yeter. Baş Mühendis bu kayıtların her zaman denetime hazır olmasını sağlar.`,
          ],
        },
      ],
    },
    {
      heading: "9. Pratik Kontrol Listesi ve Sonuç",
      sections: [
        {
          subheading: "9.1 Baş Mühendis çevre kontrol listesi",
          bullets: [
            `OWS ve 15 ppm oil monitor kalibre ve fonksiyonel mi (test kaydı)?`,
            `Bilge deşarjları en route, special area dışında ve ≤15 ppm mi?`,
            `ORB Part I güncel, imzalı, oil monitor logu ile tutarlı mı?`,
            `Sludge balansı (üretim/yakma/shore) tutarlı ve izlenebilir mi?`,
            `Incinerator doğru sıcaklıkta, kayıtlı çalışıyor mu?`,
            `BWMS çalışır, BWRB güncel, sensörler kalibre mi?`,
            `Yakıt sülfürü ve scrubber washwater limitlere uygun mu?`,
            `NOx Technical File'a uygun, izinsiz tuning yok mu?`,
            `Garbage/sewage kayıtları ve bertaraf makbuzları tam mı?`,
            `Hiçbir bypass/magic pipe yok; tüm akışlar kayıtla uyumlu mu?`,
          ],
          paragraphs: [
            `Çevre uyumluluğu, Baş Mühendis için teknik bilgiden çok bir dürüstlük ve disiplin sınavıdır. Ekipman arızalanabilir, operasyon zorlaşabilir; ancak doğru kayıt ve uygun bertaraf her zaman tek meşru yoldur. Bir tek sahte kayıt, yılların kariyerini ve şirketin itibarını yok edebilir. Şeffaf, izlenebilir ve gerçekle birebir uyumlu bir kayıt kültürü, hem denizi hem gemiyi korur.`,
          ],
        },
      ],
    },
  ],
};

export default content;
