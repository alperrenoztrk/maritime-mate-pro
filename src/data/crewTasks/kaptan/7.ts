import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Kayıt ve dokümantasyon yönetimi",
  roleSlug: "kaptan",
  taskIndex: 7,
  estimatedPages: 25,
  intro: `Gemi belgeleri, denizcilikte "yapılmamışsa kanıtlanamaz, kanıtlanamıyorsa yapılmamış sayılır" prensibinin somut karşılığıdır. Kaptanın kayıt ve dokümantasyon sorumluluğu, official log book ve deck log book gibi resmi defterlerden, NOR, Statement of Facts, protest letter, cargo manifest, crew list ve stowaway report gibi operasyonel/hukuki belgelere kadar uzanan geniş bir alanı kapsar. Bu belgelerdeki kaptan imzası gemiyi ve şirketi hukuken bağlar; mahkemede, tahkim sürecinde ve sigorta (P&I/H&M) ihtilaflarında birincil delil oluşturur. Bu bölüm, belge hiyerarşisini, doğru ve zamanında doldurma disiplinini, hukuki sorumluluk sınırlarını ve dijital kayıt çağında (e-log, e-CD) değişen pratikleri ele alır.`,
  sources: [
    "SOLAS Chapter V/28 — Records of Navigational Activities",
    "MARPOL Annex I Reg. 17 (Oil Record Book), Annex V, Annex VI Reg. 12-13",
    "STCW 2010 — A-VIII/1 (rest hours records)",
    "ISM Code (IMO Res. A.741(18)) — madde 11, dokümantasyon",
    "MLC 2006 — Standard A2.1 (Seafarers' Employment Agreement), A4.5",
    "IMO Res. A.916(22) — Guidelines for the Recording of Events Related to Navigation",
    "Carriage of Goods by Sea Act (COGSA) / Hague-Visby Rules",
    "ICS Bridge Procedures Guide (5th Edition) — record keeping",
  ],
  chapters: [
    {
      heading: "1. Belge Yönetiminin Hukuki Çerçevesi",
      lead: `Gemi belgeleri tek bir mevzuattan değil, SOLAS, MARPOL, ISM, MLC, ulusal bayrak devleti kanunları ve ticaret hukukundan (charter party, COGSA) doğan çok katmanlı bir yükümlülükler bütününden kaynaklanır.`,
      sections: [
        {
          subheading: "1.1 Kaptan imzasının bağlayıcılığı",
          paragraphs: [
            `Kaptan, geminin yasal temsilcisidir (master as agent). İmzaladığı belge yalnızca bir teyit değil; gemiyi, donatanı ve bazı durumlarda charterer'i bağlayan hukuki bir taahhüttür. Konşimento (B/L) imzası taşıma sözleşmesini, NOR imzası laytime sayacını, protest letter ise karşı tarafa karşı hak saklı tutma beyanını başlatır. Bu nedenle kaptan, imzaladığı her belgenin hukuki sonucunu bilmek zorundadır.`,
            `İmza atılırken "for and on behalf of the Master" veya "as agent only" gibi kalifikasyonlar, kaptanın kişisel sorumluluğunu sınırlandırabilir; ancak bu ibareler dikkatli kullanılmalıdır. Acente tarafından hazırlanan belgelerde kaptanın okumadan imzalaması, sonradan "kaptan onayladı" varsayımına yol açar ve geri dönüşü zordur.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "SOLAS V/28",
              text: `Gemiler, seyir emniyetiyle ilgili faaliyetlerin ve olayların kaydını tutmak zorundadır. Bu kayıtlar yeterli ayrıntıda olmalı ve gemide en az bayrak devletinin gerektirdiği süre kadar (genelde olaydan sonra) saklanmalıdır.`,
            },
          ],
        },
        {
          subheading: "1.2 Resmi defterler ve operasyonel belgeler ayrımı",
          paragraphs: [
            `Belgeler iki ana kategoriye ayrılır: (a) bayrak devleti veya uluslararası sözleşme tarafından zorunlu kılınan resmi defterler (official log book, oil record book, garbage record book, rest hour records); (b) ticari/operasyonel belgeler (NOR, SOF, mate's receipt, manifest). Resmi defterlerde sayfa numarası atlanamaz, silinti yapılamaz, geriye dönük doldurulamaz; hatalar tek çizgiyle çizilip paraflanır.`,
            `Bu ayrım önemlidir çünkü resmi defterlerin tahrifi (falsification) ceza hukuku kapsamına girer ve PSC tutuklamasına (detention) yol açabilir. ABD'de Oil Record Book tahrifi nedeniyle şirketlere milyon dolarlık cezalar (magic pipe davaları) verilmiştir.`,
          ],
          table: {
            caption: `Başlıca Gemi Belgeleri ve Yasal Dayanakları`,
            headers: ["Belge", "Dayanak", "Saklama / Niteliği"],
            rows: [
              ["Official Log Book", "Bayrak devleti kanunu", "Resmi, sayfa numaralı, tahrif yasak"],
              ["Deck Log Book", "SOLAS V/28, gelenek", "Seyir/operasyon, sürekli"],
              ["Oil Record Book", "MARPOL Annex I Reg.17", "3 yıl, denetime açık"],
              ["Garbage Record Book", "MARPOL Annex V", "2 yıl gemide"],
              ["NOR / SOF", "Charter party", "Ticari, laytime delili"],
              ["Bill of Lading", "Hague-Visby / COGSA", "Kıymetli evrak, devredilebilir"],
            ],
          },
        },
      ],
    },
    {
      heading: "2. Official Log Book ve Deck Log Book",
      sections: [
        {
          subheading: "2.1 Official Log Book — bayrak devleti resmi defteri",
          paragraphs: [
            `Official Log Book (ÖLB), bayrak devletinin formatında tutulan resmi bir defterdir. İçeriği bayrağa göre değişmekle birlikte tipik olarak: mürettebat katılma/ayrılma kayıtları, doğum/ölüm, disiplin olayları, draft survey, müsteşarlık talimatları, drill (talim) kayıtları, official inspection sonuçları ve önemli olaylar yer alır. Her kayıt tarih-saatli ve ilgili zabit/kaptan imzalı olmalıdır.`,
            `Ölüm, ciddi yaralanma, doğum, kaybolma (man overboard) gibi olaylar ÖLB'ye derhal işlenir ve genellikle bir tanık imzası gerektirir. Bu kayıtlar konsolosluk, sigorta ve adli süreçlerde birincil delildir. Geri tarihli (back-dated) kayıt, hukuken delil değerini yok eder ve kaptanı şahsi sorumluluk altına sokar.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Silinti ve tahrif",
              text: `Resmi defterde daksil, üstüne yazma veya sayfa koparma kesinlikle yasaktır. Hatalı kayıt tek çizgiyle çizilir, "error" notu düşülür, doğrusu yazılır ve paraflanır. Tahrif edilmiş defter, PSC denetiminde Code 30 detention ve cezai soruşturma sebebidir.`,
            },
          ],
        },
        {
          subheading: "2.2 Deck Log Book — seyir ve operasyon günlüğü",
          paragraphs: [
            `Deck Log Book, vardiya zabitlerince saat saat tutulan operasyonel seyir günlüğüdür. Pozisyon, rota, hız, hava durumu (rüzgâr, deniz durumu, barometre, görüş), makine telgrafı değişiklikleri, demir/vira, pilot embarkasyon/disembarkasyon, draft, ballast operasyonları ve önemli haberleşmeler işlenir. Her vardiya, devralan zabit tarafından imzalanır.`,
            `Deck log, çatışma, karaya oturma veya ağır hava hasarı sonrası sea protest ve P&I sürecinin temel kaynağıdır. Bu nedenle olay anında ve sonrasında log kayıtları olabildiğince ayrıntılı tutulmalı, helm orders ve engine orders zaman damgalı kaydedilmelidir. VDR (Voyage Data Recorder) verisiyle çelişen log kaydı, davada güvenilirliği zedeler.`,
          ],
        },
        {
          subheading: "2.3 Dijital kayıt (e-log) ve VDR uyumu",
          paragraphs: [
            `Bayrak devletleri giderek elektronik kayıt defterlerine (e-OLB, e-ORB) izin vermektedir; MARPOL'un 2020'deki değişikliği electronic record book kullanımını resmen tanımıştır. Dijital sistemde de değiştirilemezlik (audit trail), zaman damgası ve yetkili kullanıcı kimliği şarttır. Kaptan, sistemin onaylı (type-approved) olduğunu ve denetimde okunabilir çıktı üretebildiğini teyit eder.`,
            `Deck log ile VDR/ECDIS kayıtları arasında tutarlılık kritik öneme sahiptir. Bir uyuşmazlıkta tarafların ilk istediği belgeler VDR download, ECDIS playback ve deck log'dur. Kaptan, kritik olay sonrası VDR verisinin overwrite edilmeden korunmasını (save/lock) sağlamalıdır; aksi halde delil kaybı oluşur.`,
          ],
        },
      ],
    },
    {
      heading: "3. Ticari Belgeler: NOR ve Statement of Facts",
      sections: [
        {
          subheading: "3.1 Notice of Readiness (NOR)",
          paragraphs: [
            `NOR, geminin yükleme/boşaltma için her bakımdan hazır olduğunu charterer/alıcıya bildiren belgedir ve laytime (starya) sayacını başlatır. NOR'un geçerli olması için gemi fiilen ve hukuken hazır olmalı (free pratique alınmış, gümrük formaliteleri tamamlanmış, kargo erişimi açık). Erken veya geçersiz verilen NOR, laytime hesabını bozar ve demuraj/dispatch ihtilafına yol açar.`,
            `Charter party'de "WIPON, WIBON, WIFPON, WICCON" (whether in port/berth/free pratique/customs cleared or not) klozları NOR'un ne zaman verilebileceğini belirler. Kaptan bu klozları bilmeli, NOR'u doğru zaman ve doğru muhataba (genellikle charterer ve acente) yazılı olarak tendere etmelidir. Tendere zamanı (tarih-saat) çok önemlidir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "NOR tendere disiplini",
              text: `NOR her zaman yazılı (e-posta/teleks) verilir ve alındı teyidi (acknowledgement) istenir. "Tendered but not accepted" durumlarında bile tendere zamanı kayıt altına alınmalı; demuraj tahkimlerinde bu zaman damgası belirleyici olur.`,
            },
          ],
        },
        {
          subheading: "3.2 Statement of Facts (SOF) ve time sheet",
          paragraphs: [
            `SOF, limandaki tüm olayların (varış, demir, yanaşma, NOR tendere, kargo başlangıç/bitiş, beklemeler, hava molaları, arızalar) zaman damgalı kronolojik dökümüdür. Acente hazırlar; kaptan kontrol eder ve imzalar. SOF, time sheet üzerinden demuraj/dispatch hesabının temelidir; bu nedenle her gecikmenin nedeni (rain, no cargo, awaiting documents) açıkça yazılmalıdır.`,
            `Kaptan, SOF'taki çelişkili veya gemi aleyhine kaydı imzalamadan önce düzeltir; düzeltilmezse "signed under protest, time as per ship's log" şerhiyle imzalar. Bu şerh, sonradan tahkimde geminin kayıtlarının esas alınmasını sağlar.`,
          ],
        },
      ],
    },
    {
      heading: "4. Yük Belgeleri ve Manifest",
      sections: [
        {
          subheading: "4.1 Mate's Receipt ve Cargo Manifest",
          paragraphs: [
            `Mate's Receipt, yükün gemiye alındığını gösteren ön belgedir ve B/L'nin temelini oluşturur. Yük üzerindeki çekinceler (clausing) önce mate's receipt'e işlenir; bu çekinceler B/L'ye taşınır. Cargo Manifest ise tüm yüklerin (B/L bazında) liman, alıcı, miktar ve tanım dökümüdür ve gümrük beyanının esasıdır.`,
            `Manifestteki hata veya eksiklik, gümrükte cezaya, yükün serbest bırakılamamasına ve gemi gecikmesine yol açabilir. Kaptan, manifestin B/L'lerle ve fiili yükle örtüştüğünü teyit eder.`,
          ],
        },
        {
          subheading: "4.2 Tehlikeli yük ve özel kargo belgeleri",
          paragraphs: [
            `IMDG yük için Dangerous Goods Declaration (DGD), Container/Vehicle Packing Certificate ve doğru stowage/segregation belgeleri zorunludur. Dökme yük için IMSBC Code kapsamında shipper'dan alınan kargo deklarasyonu (TML/MC bilgisi dahil) ve gerektiğinde Trimming Certificate gerekir. Bu belgelerin eksikliği yükleme reddi sebebidir.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "IMSBC / SOLAS VI",
              text: `Dökme yük taşımalarında shipper, yükleme öncesi yükün özelliklerini (grup A/B/C, TML, nem) bildiren belgeyi kaptana vermek zorundadır. Group A yükte fiili nem TML'in altında olmalıdır; aksi halde liquefaction riski nedeniyle yükleme reddedilir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Çevre Kayıtları: ORB, Garbage ve Ballast",
      sections: [
        {
          subheading: "5.1 Oil Record Book (ORB) Part I ve II",
          paragraphs: [
            `ORB Part I (machinery space operations) ve Part II (cargo/ballast — tankerlerde) MARPOL Annex I uyarınca her operasyondan hemen sonra, ilgili kodlu maddeyle (A'dan K'ya) doldurulur. Slop, bilge, sludge, oily water separator (15 ppm) deşarjları, internal transferler ve atık teslimleri kaydedilir. Her sayfa kaptan tarafından imzalanır.`,
            `ORB tutarsızlığı (örn. sludge üretimi ile teslim/incineration dengesizliği) PSC ve ABD Sahil Güvenlik denetiminde derhal şüphe çeker. "Magic pipe" (yasadışı bypass) davalarının çoğu ORB ile fiili durum çelişkisinden açığa çıkmıştır.`,
          ],
        },
        {
          subheading: "5.2 Garbage Record Book ve Ballast Water Record Book",
          paragraphs: [
            `Garbage Record Book, MARPOL Annex V kapsamında atık kategorilerine (A-J) göre deşarj, yakma ve liman tesisine teslim kayıtlarını tutar. Ballast Water Record Book ise BWM Convention uyarınca ballast alım/deşarj, treatment ve exchange operasyonlarını kaydeder. Her iki defter de denetime açıktır ve eksiklik bulgu (deficiency) sebebidir.`,
          ],
        },
      ],
    },
    {
      heading: "6. Mürettebat Belgeleri ve Crew List",
      sections: [
        {
          subheading: "6.1 Crew List ve SEA (Seafarers' Employment Agreement)",
          paragraphs: [
            `Crew List, gemideki tüm mürettebatın kimlik, rütbe, milliyet ve sertifika bilgilerini içeren resmi belgedir; liman girişlerinde immigration ve port authority tarafından istenir. MLC 2006 Standard A2.1 uyarınca her gemiadamının imzalı SEA'sı gemide bulunmalıdır; kaptan SEA'ların eksiksiz ve güncel olduğunu denetler.`,
            `Wages account, allotment kayıtları ve rest hour records de MLC kapsamında tutulur. PSC'de en sık MLC bulguları SEA eksikliği, hesap kayıtlarındaki tutarsızlık ve rest hour ihlalleridir.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "MLC 2006 belge seti",
              text: `Maritime Labour Certificate (MLC) ve Declaration of Maritime Labour Compliance (DMLC Part I & II) gemide bulundurulur ve denetimde ilk istenen belgelerdendir. Bu belgeler olmadan gemi MLC denetiminde detention riski taşır.`,
            },
          ],
        },
        {
          subheading: "6.2 Sertifika takibi ve süre yönetimi",
          paragraphs: [
            `Mürettebat sertifikaları (CoC, GMDSS, medical, STCW kursları) ve gemi sertifikaları (SMC, ISSC, class, statutory) için kaptan bir takip matrisi tutar. Süresi dolacak belgeler, liman ve klas planlamasına dahil edilir. Geçersiz sertifikayla sefere çıkış, hem PSC tutuklaması hem de sigorta geçersizliği (P&I cover prejudice) riskidir.`,
          ],
        },
      ],
    },
    {
      heading: "7. Protest Letter ve Stowaway Report",
      sections: [
        {
          subheading: "7.1 Letter of Protest (LOP)",
          paragraphs: [
            `Letter of Protest, kaptanın karşı tarafa (terminal, charterer, shipper, surveyor) bir durumu resmen itiraz ettiğini ve hak saklı tuttuğunu bildirdiği belgedir. Tipik konular: kargo hasarı, draft survey uyuşmazlığı, yavaş yükleme/boşaltma hızı, kötü hava nedeniyle gecikme, terminal ekipman arızası, kontamine yakıt (bunker dispute). LOP yazılı verilir ve mümkünse karşı tarafa imzalatılır; reddedilse bile "presented and refused" notu düşülür.`,
            `LOP, sea protest'ten farklıdır: sea protest noter huzurunda yapılan resmi bir beyandır; LOP ise taraflar arası ticari bir itiraz aracıdır. İkisi tamamlayıcıdır.`,
          ],
        },
        {
          subheading: "7.2 Stowaway Report ve bildirim zinciri",
          paragraphs: [
            `Kaçak yolcu tespitinde IMO Res. A.1117(30) prosedürleri uygulanır. Kaptan; kişinin güvenliğini sağlar, kimlik bilgisini ve buluş koşullarını standart stowaway report formuna işler, bayrak devleti, bir sonraki liman devleti, şirket ve P&I Club'ı bildirir. Stowaway, mürettebata dahil edilmez; ancak insani muamele ve emniyet sağlanır.`,
            `Stowaway maliyeti (repatriasyon, fines, detention) genellikle P&I cover kapsamındadır; bu nedenle erken ve eksiksiz bildirim, sigortanın işlemesi için şarttır. Dokümantasyon eksikliği cover'ı tehlikeye atar.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Pratik örnek — eksik manifest, gecikmiş gemi",
              text: `Bir dökme yük gemisinde manifestteki ton miktarı ile draft survey arasındaki tutarsızlık zamanında LOP ile belgelenmediği için, charterer kargo eksikliğini gemiye yükledi ve demuraj alacağı kesintiye uğradı. Eğer survey anında LOP düzenlenmiş olsaydı, ispat yükü karşı tarafa geçerdi. Ders: itiraz anında belgelenir, sonradan değil.`,
            },
          ],
        },
      ],
    },
    {
      heading: "8. Belge Arşivi, Saklama Süreleri ve ISM Kontrolü",
      sections: [
        {
          subheading: "8.1 ISM Code madde 11 — dokümantasyon kontrolü",
          paragraphs: [
            `ISM Code madde 11, SMS kapsamındaki tüm belgelerin güncel, geçerli ve yetkili kişilerce kontrol edilmiş olmasını şart koşar. Geçersiz/eski revizyon belgelerin ortadan kaldırılması, controlled document listesi ve revizyon takibi kaptanın denetiminde yürür. İç ve dış ISM denetimlerinde belge kontrol disiplini başlıca odak alanıdır.`,
          ],
        },
        {
          subheading: "8.2 Saklama süreleri ve teslim",
          paragraphs: [
            `Her belge türünün yasal saklama süresi vardır: ORB 3 yıl, garbage record book 2 yıl, deck/official log book bayrak devletine göre genelde olaydan sonra uzun süre. Dolan defterler şirkete teslim edilir ve arşivlenir. Kaptan değişiminde (handover) tüm aktif ve dolu defterler, sertifikalar ve devam eden ihtilaf dosyaları yeni kaptana imzalı tutanakla devredilir.`,
          ],
          table: {
            caption: `Tipik Saklama Süreleri`,
            headers: ["Belge", "Gemide saklama", "Not"],
            rows: [
              ["Oil Record Book", "3 yıl", "MARPOL Annex I"],
              ["Garbage Record Book", "2 yıl", "MARPOL Annex V"],
              ["Rest Hour Records", "Bayrak/ILO gereği", "MLC denetiminde aranır"],
              ["Deck/Official Log", "Genelde uzun süre", "Bayrak devleti kanunu"],
              ["VDR data (kritik olay)", "Save & lock", "Overwrite engellenir"],
            ],
          },
        },
      ],
    },
    {
      heading: "9. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "9.1 Kayıt ve dokümantasyon kontrol listesi",
          paragraphs: [
            `Aşağıdaki liste, kaptanın günlük ve liman bazlı belge disiplinini özetler. Liste gemi tipi, sefer karakteri ve bayrak devleti gereklerine göre özelleştirilmelidir.`,
          ],
          bullets: [
            `Official ve deck log book kayıtları güncel, imzalı, silinti/tahrif yok`,
            `Hatalı kayıtlar tek çizgiyle düzeltilmiş ve paraflanmış`,
            `ORB, Garbage RB, Ballast Water RB güncel ve fiili durumla tutarlı`,
            `NOR doğru zaman/muhataba yazılı tendere edildi, teyit alındı`,
            `SOF kontrol edildi; çelişki varsa "under protest" şerhiyle imzalandı`,
            `Mate's receipt / B/L üzerindeki çekinceler tutarlı ve doğru kalifiye`,
            `Cargo manifest, B/L ve fiili yük örtüşüyor`,
            `Crew list, SEA, sertifika matrisi güncel; süresi dolacaklar planlandı`,
            `Stowaway/LOP/sea protest için bildirim zinciri ve P&I bilgisi hazır`,
            `Kritik olay sonrası VDR/ECDIS verisi save & lock yapıldı`,
            `Dolan defterler ve ihtilaf dosyaları handover'da imzalı devredildi`,
          ],
        },
        {
          subheading: "9.2 Kapanış",
          paragraphs: [
            `Belge yönetimi, denizciliğin görünmeyen ama en belirleyici disiplinlerinden biridir. İyi tutulmuş bir log book, kaptanı ve şirketi mahkemede koruyan en güçlü kalkandır; özensiz veya tahrif edilmiş bir kayıt ise en iyi savunmayı bile çökertir. Kaptanın hedefi, "her belge, olduğu anda, olduğu gibi ve okunabilir biçimde" prensibini gemide kalıcı bir kültüre dönüştürmektir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Bir cümlede özet",
              text: `Denizde gerçeği belirleyen, olayın kendisi değil; olayın nasıl kaydedildiğidir. Doğru tutulan kayıt, en sessiz ama en güçlü tanıktır.`,
            },
          ],
        },
      ],
    },
  ],
};

export default content;
