import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Çevresel uyumluluk ve MARPOL sorumluluğu",
  roleSlug: "kaptan",
  taskIndex: 4,
  estimatedPages: 27,
  intro: `Gemiden kaynaklanan her türlü deniz ve hava kirliliğinin önlenmesinden kaptan birincil derecede sorumludur. MARPOL'ün altı eki (Annex I–VI); yağlı su deşarjı, zararlı sıvı maddeler, ambalajlı zararlı yükler, lağım suyu, çöp yönetimi ve hava emisyonlarını düzenler. Bunlara BWM Convention (balast suyu) ve AFS Convention (anti-fouling) eklenir. ORB, Garbage Record Book ve Ballast Water Record Book gibi kayıtların doğruluğundan kaptan şahsen sorumludur; bu kayıtlardaki sahtecilik dünya genelinde hapis cezalarına ve şirket için "magic pipe" davalarına yol açmıştır. Bu bölüm, kaptanın çevresel uyumluluk gözetimini ek ek ele alır.`,
  sources: [
    "MARPOL 73/78 Annex I — Yağ kirliliğinin önlenmesi",
    "MARPOL Annex II — Zararlı Sıvı Maddeler (NLS)",
    "MARPOL Annex IV — Lağım suyu (Sewage)",
    "MARPOL Annex V — Çöp (Garbage) ve MEPC.295(71)",
    "MARPOL Annex VI — Hava kirliliği; SOx, NOx, EEXI, CII",
    "BWM Convention — Ballast Water Management (D-1 / D-2)",
    "AFS Convention — Anti-fouling Systems",
    "US APPS (Act to Prevent Pollution from Ships) ve magic pipe içtihadı",
    "IMO 2020 Sulphur Cap (MARPOL VI Reg. 14) ve Carriage Ban",
  ],
  chapters: [
    {
      heading: "1. MARPOL'ün Yapısı ve Kaptanın Konumu",
      lead: `MARPOL altı teknik ek + iki ana metinden oluşur. Kaptan bu eklerin günlük uygulamasının nihai sorumlusudur.`,
      sections: [
        {
          subheading: "1.1 Altı ek ve kapsamları",
          paragraphs: [
            `MARPOL Annex I yağı, Annex II zararlı sıvı maddeleri, Annex III ambalajlı zararlı maddeleri, Annex IV lağım suyunu, Annex V çöpü ve Annex VI hava emisyonlarını düzenler. Her ek için gemide ilgili kayıt defteri, sertifika ve yönetim planı bulunur (IOPP, ORB, GMP, SEEMP vb.). Kaptan, geminin hangi eklere tabi olduğunu ve mevcut sertifikaların geçerliliğini bilir.`,
            `Kayıt defterlerindeki kayıtların doğruluğu kaptanın şahsi sorumluluğudur. ABD'de magic pipe davaları, genellikle yanlış ORB kaydı (false statement) üzerinden açılır ve kaptan ile chief engineer'a hapis, şirkete milyon dolarlık cezalar verilir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "ORB'de sahtecilik = suç",
              text: `Magic pipe davalarının çoğunda asıl mahkumiyet "kirletme"den değil, ORB'ye yanlış kayıt (false entry) ve denetimi engellemekten gelir. Doğru kayıt, gemiyi cezadan korumanın en güçlü yoludur.`,
            },
          ],
        },
        {
          subheading: "1.2 Sertifikalar ve survey döngüsü",
          paragraphs: [
            `IOPP (Annex I), ISPP (Annex IV), IAPP ve IEEC (Annex VI), EIAPP (motorlar için) sertifikaları, initial/annual/intermediate/renewal survey döngüsüne tabidir. Kaptan, sertifikaların PSC denetiminde geçerli olduğundan, supplement formlarının (ekipman listesi) gemideki donanımla uyuştuğundan emin olur.`,
          ],
          table: {
            caption: `MARPOL Ekleri, Kayıt Defterleri ve Sertifikalar`,
            headers: ["Ek", "Konu", "Kayıt Defteri", "Sertifika"],
            rows: [
              ["Annex I", "Yağ", "Oil Record Book I & II", "IOPP"],
              ["Annex II", "NLS", "Cargo Record Book", "Sertifika of Fitness"],
              ["Annex IV", "Lağım", "—", "ISPP"],
              ["Annex V", "Çöp", "Garbage Record Book", "—"],
              ["Annex VI", "Hava", "ORB (BDN ekli)", "IAPP / IEEC"],
            ],
          },
        },
      ],
    },
    {
      heading: "2. Annex I — Yağ Kirliliğinin Önlenmesi",
      sections: [
        {
          subheading: "2.1 15 ppm kuralı, OWS ve Oil Record Book",
          paragraphs: [
            `Makine dairesi bilge suyu, ancak 15 ppm Oily Water Separator (OWS) üzerinden ve oil content meter ile izlenerek, gemi seyir halindeyken ve özel alan dışında deşarj edilebilir. Tüm transferler, deşarjlar, sludge işlemleri ORB Part I'e zaman, pozisyon ve miktar ile kaydedilir. Tankerlerde yük/balast işlemleri ORB Part II'ye işlenir.`,
            `Kaptan, ORB kayıtlarını periyodik olarak imzalar ve her sayfanın doğruluğunu denetler. "Magic pipe" (OWS bypass) en ağır çevre suçudur; kaptanın görevi böyle bir sistemin gemide olmadığını ve kayıtların fiili operasyonla bire bir uyuştuğunu garanti etmektir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MARPOL Annex I Reg. 15 & 17",
              text: `Makine dairesi bilge suyunun deşarjı 15 ppm, seyir halinde ve onaylı OWS şartına bağlıdır. Sludge yalnızca alım tesisine veya onaylı incinerator'a verilir; denize sludge deşarjı kesinlikle yasaktır.`,
            },
          ],
        },
        {
          subheading: "2.2 SOPEP ve yağ döküntüsü müdahalesi",
          paragraphs: [
            `Her gemi onaylı bir SOPEP (Shipboard Oil Pollution Emergency Plan) taşır; tankerlerde SMPEP (zararlı sıvılar dahil) olur. Plan; raporlama akışını (kıyı devleti, P&I, şirket), müdahale ekipmanını ve görev dağılımını içerir. Kaptan, döküntü anında ilk raporu yapan ve müdahaleyi koordine eden kişidir. Yıllık SOPEP drill yapılır.`,
          ],
        },
      ],
    },
    {
      heading: "3. Annex V — Çöp Yönetimi",
      sections: [
        {
          subheading: "3.1 Kategoriler ve sıfır plastik deşarjı",
          paragraphs: [
            `MEPC.295(71) ile güncellenen Annex V, çöpü kategorilere ayırır (plastik, gıda atığı, kül, operasyonel atık, hayvan leşi, balıkçılık ekipmanı, e-atık, cargo residue). Plastiğin denize deşarjı her koşulda yasaktır. Gıda atığı, öğütülmüş ise kıyıdan 3 NM ve özel alan dışında, öğütülmemiş ise 12 NM dışında deşarj edilebilir.`,
            `Garbage Management Plan ve Garbage Record Book her gemide bulunur; 100 GT üzeri gemiler ve 15+ kişi taşıyanlar için zorunludur. Kaptan, GRB kayıtlarının her deşarj, yakma ve teslimi (alım tesisi makbuzu ile) eksiksiz yansıttığını denetler.`,
          ],
          table: {
            caption: `Annex V — Çöp Deşarj Mesafeleri (özet)`,
            headers: ["Çöp Türü", "Özel Alan Dışı", "Özel Alan İçi"],
            rows: [
              ["Plastik", "Yasak", "Yasak"],
              ["Öğütülmüş gıda atığı", "≥3 NM", "≥12 NM (şartlı)"],
              ["Öğütülmemiş gıda atığı", "≥12 NM", "Yasak"],
              ["Cargo residue (zararsız)", "≥12 NM (şartlı)", "Genelde yasak"],
            ],
          },
        },
        {
          subheading: "3.2 Özel alanlar (Special Areas) ve PSSA",
          paragraphs: [
            `Akdeniz, Baltık, Karadeniz, Kızıldeniz ve Antarktika gibi özel alanlarda deşarj kuralları çok daha sıkıdır. Antarktika'da hiçbir çöp denize verilemez. Kaptan, geminin bulunduğu deniz alanının statüsünü (özel alan, ECA, PSSA) bilir ve mürettebata bunu brifingle aktarır.`,
          ],
        },
      ],
    },
    {
      heading: "4. Annex VI — Hava Emisyonları",
      sections: [
        {
          subheading: "4.1 SOx ve 2020 Sulphur Cap",
          paragraphs: [
            `MARPOL VI Reg. 14, küresel yakıt sülfür sınırını 1 Ocak 2020'den itibaren %0.50'ye, ECA bölgelerinde (Baltık, Kuzey Denizi, Kuzey Amerika, ABD Karayip) %0.10'a indirdi. Gemi ya uyumlu düşük sülfürlü yakıt (VLSFO/MGO) kullanır ya da scrubber (EGCS) ile eşdeğer uyum sağlar. Kaptan, Bunker Delivery Note (BDN) ve numune saklamasını (12 ay) denetler.`,
            `2020 Carriage Ban uyarınca, scrubber'sız gemide %0.50 üzeri sülfürlü yakıt bulundurmak (yalnız taşımak bile) yasaktır. Kaptan ECA giriş/çıkışında fuel changeover'ın zamanında yapıldığını ve ORB Part I / yakıt değişim kaydının tutulduğunu garanti eder.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MARPOL VI Reg. 14 & 18",
              text: `ECA içinde %0.10 sülfür sınırı geçerlidir. Fuel changeover işlemi, ECA'ya girişten önce tamamlanmalı ve zaman/pozisyon ile kaydedilmelidir. BDN ve mühürlü numune en az 12 ay saklanır.`,
            },
          ],
        },
        {
          subheading: "4.2 EEXI, CII ve SEEMP",
          paragraphs: [
            `2023'ten itibaren yürürlükteki EEXI (Energy Efficiency Existing Ship Index) gemilere bir kerelik verimlilik eşiği koyar; CII (Carbon Intensity Indicator) ise yıllık operasyonel karbon yoğunluğunu A–E reytingiyle ölçer. D üç yıl üst üste veya bir kez E alan gemi düzeltici eylem planı (SEEMP Part III) hazırlar. Kaptan, slow steaming, trim optimizasyonu ve hull/propeller performansıyla CII reytingine doğrudan etki eder.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Kaptanın CII kaldıraçları",
              text: `Optimum trim, temiz tekne (hull fouling kontrolü), hız optimizasyonu, gereksiz idle/anchorage süresinin azaltılması ve doğru ME yükü, CII reytingini iyileştirir. Kaptan günlük seyir kararlarıyla yıllık reyting üzerinde belirleyicidir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Annex II & IV — NLS ve Lağım Suyu",
      sections: [
        {
          subheading: "5.1 Annex II — Zararlı Sıvı Maddeler",
          paragraphs: [
            `Kimyasal tankerlerde NLS, X/Y/Z/OS kategorilerine ayrılır. Tank yıkama kalıntılarının deşarjı, P&A (Procedures and Arrangements) Manual ve Cargo Record Book ile yönetilir. Prewash gerektiren yüklerde sürveyör eşliğinde işlem yapılır. Kaptan, Cargo Record Book kayıtlarının doğruluğunu denetler.`,
          ],
        },
        {
          subheading: "5.2 Annex IV — Sewage",
          paragraphs: [
            `Lağım suyu, onaylı sewage treatment plant ile işlenip kıyıdan belirli mesafede (öğütülmüş/dezenfekte ≥3 NM, işlenmiş ≥12 NM, gemi 4 knot üzerinde) deşarj edilebilir. Baltık gibi özel alanlarda yolcu gemileri için daha sıkı kurallar uygulanır. Kaptan, STP'nin çalışır durumda ve deşarj kayıtlarının düzgün tutulduğunu denetler.`,
          ],
        },
      ],
    },
    {
      heading: "6. Balast Suyu (BWM Convention)",
      sections: [
        {
          subheading: "6.1 D-1 / D-2 standartları ve BWMS",
          paragraphs: [
            `BWM Convention, istilacı türlerin taşınmasını önlemek için D-1 (ballast water exchange) ve nihai D-2 (biological treatment) standartlarını getirir. Gemiler IMO type-approved BWMS (UV, electrochlorination, ozone) ile donatılır. Ballast Water Record Book her balast alma/verme/değiştirme işlemini kaydeder; Ballast Water Management Plan gemiye özeldir.`,
            `Kaptan, BWMS'in çalışır durumda olduğunu, D-2 uyumunun sağlandığını ve BWRB'nin doğru tutulduğunu denetler. ABD (USCG) kendi onay rejimine sahiptir; ABD sularına giren gemilerde ek uyum gerekir.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "BWMS arızası",
              text: `BWMS arızalanırsa kaptan derhal şirketi ve gerekli liman devletini bilgilendirir, kontenjans tedbirini (alternatif değişim, alım tesisi) uygular ve kaydı tutar. Bypass etmek ve kayıt tutmamak ağır cezalandırılır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. Anti-Fouling ve Diğer Çevresel Yükümlülükler",
      sections: [
        {
          subheading: "7.1 AFS Convention",
          paragraphs: [
            `AFS Convention, TBT içeren zararlı anti-fouling sistemlerini yasaklar; son düzenlemelerle cybutryne de yasaklanmıştır. Gemi, AFS sertifikası veya beyanı taşır. Kaptan, dry-dock sonrası boyaların uyumlu olduğunu ve sertifikanın güncel olduğunu doğrular.`,
          ],
        },
        {
          subheading: "7.2 Underwater noise, biofouling ve bölgesel kurallar",
          paragraphs: [
            `Hull biofouling, hem CII performansını hem de istilacı tür riskini etkiler; bazı yargı bölgeleri (Yeni Zelanda, Kaliforniya) biofouling yönetim kaydı ister. Kaptan, geminin gideceği bölgenin bölgesel çevre kurallarını (ECA, ETS/AB Emisyon Ticareti, bölgesel hız limitleri) önceden öğrenir ve uyumu planlar.`,
          ],
        },
      ],
    },
    {
      heading: "8. Kayıt Doğruluğu ve Denetim",
      sections: [
        {
          subheading: "8.1 Kayıt disiplini ve PSC/CDI/SIRE denetimleri",
          paragraphs: [
            `ORB, GRB ve BWRB kayıtları PSC, klas ve vetting (SIRE, CDI) denetimlerinin ilk baktığı belgelerdir. Kayıt ile fiili operasyon arasındaki tutarsızlık (örn. sludge miktarı ile tank seviyesi uyumsuzluğu) "deficiency" veya detention sebebidir. Kaptan, kayıtların gerçeği yansıttığını ve geriye dönük "düzeltme" yapılmadığını garanti eder.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka — Magic pipe davaları",
              text: `Çok sayıda armatör, OWS bypass ve yanlış ORB kaydı nedeniyle ABD'de milyon dolarlık cezalar ve gemi personeli için hapis cezaları aldı. Ortak ders: asıl mahkumiyet sahte kayıt ve denetimi engellemekten gelir.`,
            },
          ],
        },
        {
          subheading: "8.2 Whistleblower ve şirket kültürü",
          paragraphs: [
            `ABD APPS rejimi, kirliliği ihbar eden mürettebata ödül (ceza tutarının bir kısmı) verir. Bu, kayıt sahteciliğini gizlemenin imkansız olduğu anlamına gelir. Kaptan, gemide açık ve dürüst bir çevre kültürü kurarak hem yasal hem etik olarak güvenli tarafta kalır.`,
          ],
        },
      ],
    },
    {
      heading: "9. Olay Yönetimi ve Raporlama",
      sections: [
        {
          subheading: "9.1 Kirlilik olayında raporlama akışı",
          paragraphs: [
            `Bir döküntü veya ihlalde kaptan; SOPEP raporlama formatıyla en yakın kıyı devletini, liman otoritesini, şirketi (DPA) ve P&I Club'ı bilgilendirir. Müdahale, log book ve fotoğraf/video ile belgelenir. Erken, dürüst ve eksiksiz raporlama, ceza ve sorumluluğu sınırlayan en etkili tutumdur.`,
          ],
        },
      ],
    },
    {
      heading: "10. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "10.1 Kaptanın çevresel uyumluluk checklist'i",
          bullets: [
            `IOPP/IAPP/ISPP/IEEC sertifikaları geçerli ve supplement uyumlu mu?`,
            `ORB I/II, GRB, BWRB kayıtları fiili operasyonla bire bir uyumlu mu?`,
            `OWS/STP/BWMS çalışır durumda ve onaylı mı?`,
            `ECA giriş/çıkışında fuel changeover ve BDN/numune kaydı tam mı?`,
            `Plastik sıfır deşarj ve özel alan kuralları mürettebata brifinglendi mi?`,
            `CII reyting trendi ve SEEMP eylemleri takip ediliyor mu?`,
            `SOPEP/SMPEP drill ve ekipman hazır mı?`,
            `Bölgesel çevre kuralları (ETS, biofouling, hız limiti) seferde dikkate alındı mı?`,
          ],
          paragraphs: [
            `Çevresel uyumlulukta kaptanın gücü teknolojide değil, kayıt dürüstlüğünde ve gemi kültüründedir. Doğru tutulan bir ORB, milyon dolarlık bir ceza ile birkaç saatlik PSC denetimi arasındaki farktır. Kaptan, deniz çevresini korumayı yalnızca yasal zorunluluk değil, mesleki onurun parçası olarak ele alır.`,
          ],
        },
      ],
    },
  ],
};

export default content;
