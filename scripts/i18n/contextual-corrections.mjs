// Contextual translation corrections
// -----------------------------------------------------------------------------
// The locale dictionaries (public/locales/*.json) are produced by generic
// machine translation, which translates each string in isolation and therefore
// gets context-dependent Turkish words wrong. The classic failures in this
// corpus:
//
//   - "Demir" (anchor, in anchoring/navigation context)  -> "iron"
//   - "Üstü:" (superior / reports-to, crew hierarchy)     -> "Above:"
//   - "İkinci Zabit" (Second Officer)                     -> "Chief Officer"
//   - "Silici" (Wiper, engine-room rating)                -> "Eraser"
//   - "top" (day-shape ball, COLREG)                      -> "gun/cannon"
//   - "Gemicilik" (seamanship)                            -> "shipping/sailing"
//   - "Rüzgar üstü/altı" (windward/leeward)               -> "above/under the wind"
//
// This module is the curated, human-verified fix layer for whole strings where
// the machine output is known to be contextually wrong. It is consumed by:
//   - scripts/i18n/apply-contextual-fixes.mjs  (patches the shipped dictionaries)
//   - scripts/i18n/generate-locales-gtx.mjs    (so regeneration keeps the fixes)
//
// Key = exact Turkish source string (same normalizeSource/trim as the runtime),
// value = per-language corrected translation. Languages not listed fall back to
// the maritime glossary override or the machine translation.

export const CONTEXTUAL_CORRECTIONS = {
  // ── Lesson categories: "Makine" is the engine department, not "machine" ────
  'Makine': { en: 'Engine' },

  // ── Stability: "kaldırma kuvveti" = buoyant force, "yüzerlik" = buoyancy ───
  // (generic MT translated both to "Buoyancy", producing "Weight, Buoyancy and
  // Buoyancy")
  'Ağırlık, Kaldırma Kuvveti ve Yüzerlik': { en: 'Weight, Buoyant Force and Buoyancy' },

  // ── "Bilge" here is the English term (sintine), not Turkish "bilge" (wise) ─
  'Bilge (bilge) alarmı temel olarak neyi bildirir?': {
    en: 'What does the bilge alarm basically report?',
  },

  // ── Bilingual heading: dedupe "PLANNING – PLANNING PHASE" ──────────────────
  '2️⃣ PLANNING – PLANLAMA AŞAMASI': { en: '2️⃣ PLANNING PHASE' },

  // ── Turkish word pairs whose halves MT collapsed into the same English word,
  //    losing one of the two distinct meanings ─────────────────────────────────
  '9.1 Ballast/bilge operasyonu kontrol listesi': {
    en: '9.1 Ballast/bilge operation checklist',
  },
  'Kapalı/kapalı mahallere giriş': { en: 'Entry into enclosed spaces' },
  'Filika/cankurtaranlardaki kurtarma alanı içi (on-scene) haberleşme': {
    en: 'On-scene communication in lifeboats/survival craft',
  },
  'Enlem/sönümleme hatası (settling/latitude error): sönümlemeden kaynaklanır, enlemle (tan φ ile) artar; enlem düzeltmesiyle giderilir.': {
    en: 'Settling/latitude error: caused by damping, increases with latitude (tan φ); eliminated by the latitude correction.',
  },
  'Uzun seferlerde taze ürün bitince C vitamini eksikliği denizcileri hasta etmiştir. Modern aşçı, dondurulmuş sebze/meyve ve turunçgil konsantresiyle bu köprüyü kurarak skorbütü tarihte bırakır.': {
    en: 'Vitamin C deficiency made sailors sick when fresh produce ran out on long voyages. By building this bridge with frozen vegetables/fruit and citrus concentrate, the modern cook leaves scurvy in history.',
  },
  'Deniz suyu ρ ≈ 1025 kg/m³. Akıntı hızı m/s girilir (1 kn ≈ 0,514 m/s). Demirleme/palamar yük analizinde rüzgâr kuvvetiyle birlikte kullanılır.': {
    en: 'Sea water ρ ≈ 1025 kg/m³. The current speed is entered in m/s (1 kn ≈ 0.514 m/s). It is used together with wind force in anchoring/mooring load analysis.',
  },

  // ── Crew hierarchy label (the "Üstü: Birinci Zabit" chip) ──────────────────
  // All 24 languages are covered by the maritime glossary override ("Üstü:");
  // listed here only to make the English fix explicit and greppable.
  'Üstü:': { en: 'Reports to:' },

  // ── Anchoring: "demir" = anchor (not the metal "iron") ─────────────────────
  'Demir': { en: 'Anchor' },
  "'Demir fundo'": { en: "'Let go anchor'" },
  '3. Zincir ve Demir Kontrolü': { en: '3. Chain and Anchor Inspection' },
  '4. Demir Operasyonları': { en: '4. Anchor Operations' },
  '4. Demir Tarama (Dragging) ve Acil Durum': { en: '4. Anchor Dragging and Emergency' },
  '4.2 Demir nöbeti ve dragging kontrolü': { en: '4.2 Anchor watch and dragging control' },
  'Acil demir': { en: 'Emergency anchor' },
  'Adi demir': { en: 'Common anchor' },
  'BAŞLICA DEMİR TİPLERİ:': { en: 'MAIN ANCHOR TYPES:' },
  'BRUCE DEMİRİ: Kolsuz, tek parça döküm tasarım. Her tür zeminde iyi tutma sağlar. Açık deniz platformlarında yaygındır.': {
    en: 'BRUCE ANCHOR: Stockless, one-piece cast design. Provides good holding on all types of seabed. It is common on offshore platforms.',
  },
  'DANFORTH DEMİRİ: Geniş ve düz kolları sayesinde yumuşak zeminde (çamur, kum) çok iyi tutma sağlar. Kendi ağırlığının 10-20 katı tutma kuvveti üretir. Küçük teknelerde yaygındır; büyük gemilerde yedek olarak kullanılır.': {
    en: 'DANFORTH ANCHOR: Provides very good holding on soft ground (mud, sand) thanks to its wide and flat flukes. It produces a holding force of 10-20 times its own weight. Common on small boats; it is used as a spare anchor on large ships.',
  },
  'Demir ağırlığı': { en: 'Anchor weight' },
  'Demir Ağırlığı': { en: 'Anchor Weight' },
  'Demir Ağırlığı (kg)': { en: 'Anchor Weight (kg)' },
  'DEMİR AĞIRLIĞI:': { en: 'ANCHOR WEIGHT:' },
  'Demir alınır ve beklenir': { en: 'The anchor is weighed and the vessel waits' },
  'Demir alırken ırgadın "stall" etmesi çoğu kez foul anchor (demire takılmış kablo/zincir) işaretidir. Zorlamak yerine demir tekrar bırakılıp döndürülerek (clearing) serbest bırakılır.': {
    en: 'The windlass stalling while heaving anchor is often a sign of a foul anchor (a cable/chain caught on the anchor). Instead of forcing it, the anchor is lowered again and turned (clearing) to free it.',
  },
  'Demir at': { en: 'Drop anchor' },
  'Demir donanımı': { en: 'Ground tackle' },
  'Demir Donanımı ve Türleri': { en: 'Ground Tackle and Anchor Types' },
  "Demir donanımı; demir (anchor), zincir (chain cable), ırgat (windlass), zincirlik (chain locker) ve loça/kovan (hawse pipe) ile stoperlerden oluşur. Yaygın demir tipi, stoksuz (stockless) demirdir; tırnakları (flukes) zemine gömülerek tutar. Zincir, baklalar hâlinde 'kilit' (shackle/shot — genellikle 27.5 m) uzunluklarına bölünür ve renk işaretleriyle salınan miktar izlenir. Demirin tutuş gücü ağırlığından çok zincirin dipte yatay yatması ve demirin zemine gömülmesiyle sağlanır.": {
    en: "Ground tackle consists of the anchor, chain cable, windlass, chain locker, hawse pipe and stoppers. The common anchor type is the stockless anchor; it holds by digging its flukes into the seabed. The chain is divided into 'shackle/shot' lengths (usually 27.5 m) and the amount paid out is tracked by colour markings. The holding power of the anchor comes less from its weight than from the chain lying horizontally on the bottom and the anchor digging into the ground.",
  },
  'Demir donanımını': { en: 'ground tackle' },
  'Demir fundası sırasında zincir hızı kontrol altında tutulmalıdır; serbest funda kayıp demire neden olabilir.': {
    en: 'Chain speed must be kept under control while letting go the anchor; uncontrolled letting go can result in a lost anchor.',
  },
  'Demir gemisi: Pruvada tam ufuk beyaz ışık; 50 m üstü ise kıçta da ek beyaz ışık.': {
    en: 'Vessel at anchor: all-round white light forward; if over 50 m, an additional white light at the stern.',
  },
  'Demir hazırlığı': { en: 'Anchor preparation' },
  'Demir Irgadı (Windlass)': { en: 'Anchor Windlass' },
  'Demir ırgadını çalıştırır': { en: 'Operates the anchor windlass' },
  'Demir İstasyonu Standart Raporları': { en: 'Anchor Station Standard Reports' },
  'Demir kaloması genelde su derinliğinin 5–7 katı kadar verilir (hava/akıntıya göre artırılır).': {
    en: 'Anchor cable scope is generally 5–7 times the water depth (increased according to weather/current).',
  },
  'Demir nöbeti ve makine hazır bulundurma riski azaltır.': {
    en: 'Keeping an anchor watch and the engine on standby reduces the risk.',
  },
  "Demir operasyonları — demir atma (let go), demir alma (heave up) ve demir tarama yönetimi — baş kasara (fo'c'sle) güvertesinde yoğun ve riskli bir koordinasyon ister. Reis (Bosun), bu güvertedeki ekibi yönetir: anchor windlass operasyonu, chain stopper kullanımı, zincirin güvenli kontrolü ve köprüüstünden gelen komutların (shackle/kilit sayısı, vira/fıra) sahada uygulanması. Demir cezasında veya acil demir tarama anında sahadaki en kritik kişidir. Bu bölüm demir operasyonlarında ekip liderliğini ele alır.": {
    en: "Anchor operations — letting go, heaving up and dragging management — require intense and risky coordination on the fo'c'sle deck. The Bosun manages the team on this deck: anchor windlass operation, use of the chain stopper, safe control of the chain, and carrying out the bridge's commands (number of shackles, heave/veer) on site. He is the most critical person in the field during anchor watch or an emergency dragging situation. This section covers team leadership in anchor operations.",
  },
  'Demir tabanının tutunma kalitesi; çamur ve kum iyi, kayalık ve mercan zayıf zemin sayılır.': {
    en: 'Holding quality of the anchor ground: mud and sand are considered good holding ground, rock and coral poor.',
  },
  'Demir tarama (dragging)': { en: 'Anchor dragging' },
  'Demir tarama (dragging) izlenmeli; alarm verildiğinde önlem alınmalıdır.': {
    en: 'Anchor dragging must be monitored; when an alarm is raised, action must be taken.',
  },
  'Demir Tarama (Dragging) Tespiti': { en: 'Anchor Dragging Detection' },
  'Demir taraması (dragging) nasıl erken tespit edilir?': { en: 'How is anchor dragging detected early?' },
  'Demir taraması ve alınacak tedbirler': { en: 'Anchor dragging and precautions to be taken' },
  'Demir Taraması ve Alınacak Tedbirler': { en: 'Anchor Dragging and Precautions to Be Taken' },
  'Demir Tarıyor: Gece Ani Rüzgâr': { en: 'Dragging Anchor: Sudden Wind at Night' },
  'Demir tipi seçimi deniz tabanı yapısına göre yapılır': {
    en: 'The choice of anchor type is made according to the seabed structure',
  },
  'Demir tipleri ve özellikleri': { en: 'Anchor types and properties' },
  'Demir Tipleri ve Özellikleri': { en: 'Anchor Types and Properties' },
  'Demir Tutma Gücü': { en: 'Anchor Holding Power' },
  'Demir Tutma Kuvveti': { en: 'Anchor Holding Force' },
  'Demir tutması': { en: 'Anchor holding' },
  "Demir tutuşunu/pozisyonu izleyip dragging'i erken fark etmek": {
    en: "Monitoring the anchor's holding/position and detecting dragging early",
  },
  'DEMİR VARDIYASI GÖREVLERİ:': { en: 'ANCHOR WATCH DUTIES:' },
  'Demir vardiyası başlatılır': { en: 'Anchor watch is started' },
  'Demir ve demir donanımı': { en: 'Anchor and ground tackle' },
  'Demir ve Demirleme': { en: 'Anchor and Anchoring' },
  'Demir vinci (windlass) yakın çekim': { en: 'Close-up of the anchor windlass' },
  'Demir Zinciri ve Bağlantıları': { en: 'Anchor Chain and Connections' },
  'Demir zincirinin uzunluk birimi; bir posa 27,5 metredir.': {
    en: 'Unit of length of anchor chain; one shackle is 27.5 metres.',
  },
  'Demir zincirinin yatay ve uzun konumda olması; demirin iyi tutunduğunu gösterir.': {
    en: 'The anchor chain lying long and horizontal shows that the anchor is holding well.',
  },
  'Demirin deniz tabanında tutunamaması ve sürüklenmesi durumu; kötü zemin veya yetersiz zincir uzunluğunda oluşur.': {
    en: 'The situation where the anchor cannot hold on the seabed and drags; it occurs due to poor holding ground or insufficient chain length.',
  },
  'Demirin deniz tabanını tutamaması ve sürüklenmesi durumu; alarm ve manevra gerektirir.': {
    en: 'The situation where the anchor cannot hold the seabed and drags; it requires an alarm and a manoeuvre.',
  },
  'Demirin temiz çıkması': { en: 'Anchor coming up clear' },
  'Demirin tutması, yeterli kaloma (salınan zincir boyu / su derinliği oranı) ile sağlanır. Zincirin önemli bir bölümünün dipte yatay yatması, demir tırnaklarına yukarı değil yatay çekme uygulayarak tutuşu artırır. Genel pratik kural, normal koşullarda derinliğin yaklaşık 5–6 katı, ağır havada 8–10 katı veya daha fazla zincir salınmasıdır. Yetersiz kaloma demirin tarama (dragging) riskini artırır. Zemin türü de önemlidir: çamur/kil iyi tutar, kaya ve sert kum zayıf tutabilir veya demiri takabilir.': {
    en: 'The anchor holds when sufficient scope (paid-out chain length / water depth ratio) is given. A significant portion of the chain lying horizontally on the bottom increases holding by pulling the anchor flukes horizontally rather than upwards. The general rule of thumb is to pay out about 5–6 times the depth in normal conditions, and 8–10 times or more in heavy weather. Insufficient scope increases the risk of the anchor dragging. The type of bottom also matters: mud/clay holds well, rock and hard sand may hold poorly or foul the anchor.',
  },
  'Demirin tutuş gücü esas olarak neyle sağlanır?': {
    en: 'What mainly provides the holding power of the anchor?',
  },
  "Equipment number'a göre minimum demir ağırlığı belirlenir": {
    en: 'Minimum anchor weight is determined according to the equipment number',
  },
  'Güvenli demirleme; uygun kaloma (chain scope) verilmesi, salınım dairesinin (swinging circle) hesaplanması ve demir taramasının (dragging) erken tespiti ile sağlanır. Yanlış demirleme, karaya oturma veya başka gemiyle temas riskini doğurur.': {
    en: 'Safe anchoring is achieved by giving appropriate scope (chain scope), calculating the swinging circle and early detection of anchor dragging. Improper anchoring creates the risk of grounding or contact with another ship.',
  },
  'İki bower ve bir yedek demir standart donanımdır': {
    en: 'Two bower anchors and one spare anchor are standard equipment',
  },
  'İkinci demir farklı yöne atılmalıdır': { en: 'The second anchor should be dropped in a different direction' },
  'İkinci demiri tam yolla bırakırım': { en: 'I would let go the second anchor at full speed' },
  "Köprüüstü (Bridge/Wheelhouse): Geminin kumanda merkezi. Kasara (Forecastle/Fo'c'sle): Pruva üst yapısı; demir donanımı burada bulunur. Güverte ambarı üst yapısı (Poop): Kıç güvertesi üzerindeki yapı.": {
    en: "Bridge/Wheelhouse: the command centre of the ship. Forecastle (Fo'c'sle): bow superstructure; the ground tackle is located here. Poop: the structure above the aft deck.",
  },
  'Kural 30 (demir)': { en: 'Rule 30 (at anchor)' },
  'Kural 30 (demir): baş tarafta bir top; (karaya oturmuş): düşey üç top.': {
    en: 'Rule 30 (at anchor): one ball forward; (aground): three balls in a vertical line.',
  },
  'Leeway yalnızca demirde oluşur': { en: 'Leeway only occurs at anchor' },
  'Let Go (Demir Bırak)': { en: 'Let Go (Drop Anchor)' },
  'Liman tıkanıklığı nedeniyle 10 günlük demir bekleme, taze ürün biterken aşçıyı konserve/dondurulmuş ağırlıklı menüye geçmeye zorlar. Önceden kurulan stok tamponu ve kademeli menü, kalite düşüşünü minimize eder.': {
    en: 'A 10-day wait at anchor due to port congestion forces the cook to switch to a canned/frozen-heavy menu as fresh produce runs out. A pre-established stock buffer and a staged menu minimize the drop in quality.',
  },
  'MUSHROOM DEMİRİ: Mantar şekilli; yumuşak çamurda gömülerek çok yüksek tutma kuvveti sağlar. Fener gemileri ve dalgıç şamandıralarında kalıcı demirleme için kullanılır.': {
    en: 'MUSHROOM ANCHOR: Mushroom shaped; it provides very high holding force by burying itself in soft mud. It is used for the permanent moorings of lightvessels and diving buoys.',
  },
  'Pruva üst güvertesinin yükseltilmiş kısmı; demir donanımı ve bağlama ekipmanları bulunur.': {
    en: 'Raised part of the fore deck; it houses the ground tackle and mooring equipment.',
  },
  'Running moor: ileri yolda 1. demir → ikinci demir → geri çekip eşitle': {
    en: 'Running moor: 1st anchor while making headway → second anchor → heave back and equalize',
  },
  'Son iki shackle kırmızı boyalıdır (sığ demir uyarısı)': {
    en: 'The last two shackles are painted red (end-of-cable warning)',
  },
  'STOCKLESS ANCHOR (Patentli Demir / Hall Demiri): Ticaret gemilerinde en yaygın kullanılan tiptir. Kolları (flukes) ankasa (crown) etrafında dönebilir. Hawse pipe içinde depolanabilir. Kendi ağırlığının 3-5 katı tutma kuvveti üretir.': {
    en: 'STOCKLESS ANCHOR (Patent / Hall Anchor): The most commonly used type on merchant ships. Its flukes can rotate around the crown. It can be stowed in the hawse pipe. It produces a holding force of 3-5 times its own weight.',
  },
  "Stockless demir hawse pipe'ta depolanabilir (pratik avantaj)": {
    en: 'A stockless anchor can be stowed in the hawse pipe (practical advantage)',
  },
  'Tek demir geniş salınım alanı ister; kalabalıkta uygun değildir': {
    en: 'A single anchor requires a wide swinging area; it is not suitable in a crowded anchorage',
  },
  'TEK DEMİRLE SALINIMLI DEMİRLEME (Single / Swinging Moor): En yaygın yöntem. Tek demir atılır, gemi rüzgâr/akıntıyla demir etrafında salınır. Geniş salınım alanı gerektirir. Zincir boyu = derinliğin 5-7 katı (fırtınada 8-10).': {
    en: 'ANCHORING WITH A SINGLE ANCHOR (Single / Swinging Moor): The most common method. A single anchor is dropped and the ship swings around the anchor with the wind/current. It requires a large swinging area. Chain length = 5-7 times the depth (8-10 in a storm).',
  },
  'Temel demir komutları': { en: 'Basic anchoring commands' },
  'Tutuş, ağırlıktan çok zincirin yatay yatması ve demir tırnaklarının gömülmesiyle sağlanır.': {
    en: 'Holding is provided by the chain lying horizontally and the anchor flukes digging in, rather than by weight.',
  },
  'Tutuş, demirin ağırlığından çok zincirin dipte yatay yatmasıyla sağlanır.': {
    en: 'Holding is provided by the chain lying horizontally on the bottom rather than by the weight of the anchor.',
  },
  'Yalnızca demirin ağırlığı': { en: 'The weight of the anchor alone' },
  'Yaygın demir tipleri karşılaştırması': { en: 'Comparison of common anchor types' },
  'Zincirin yere yatan kısmı (catenary) tutma kuvvetini artırır. Yeterli catenary olmadığında demir tarama riski artar.': {
    en: 'The part of the chain lying on the bottom (catenary) increases the holding force. Without enough catenary, the risk of anchor dragging increases.',
  },
  'Rüzgâr/akıntıya karşı düşük hızla yaklaşılır, zincir demir üzerine yığılmadan açılır.': {
    en: 'Approach at low speed against the wind/current; the chain is paid out without piling up on the anchor.',
  },

  // ── COLREG day shapes: "top" = ball (not "gun/cannon") ─────────────────────
  'Demir = 1 top, NUC = 2 top, karaya oturmuş = 3 top.': {
    en: 'At anchor = 1 ball, NUC = 2 balls, aground = 3 balls.',
  },
  'Top, koni, silindir, elmas şekilleri uygun boyutta ve renkte hazır tutulur. Demir (ball), makine arızası (2 ball), dümeni kısıtlı (ball-diamond-ball) vb.': {
    en: 'Ball, cone, cylinder and diamond shapes are kept ready in suitable size and colour. At anchor (ball), not under command (2 balls), restricted manoeuvrability (ball-diamond-ball), etc.',
  },
  'Top (küre): tek top = demirde gemi; düşey iki top = kumanda altında değil (NUC); düşey üç top = karaya oturmuş.': {
    en: 'Ball (sphere): a single ball = vessel at anchor; two balls in a vertical line = not under command (NUC); three balls in a vertical line = aground.',
  },
  'Hesaplanan yoğunluk, geminin izin verilen güverte/tank top yük limitini (t/m²) aşmamalıdır.': {
    en: "The calculated density must not exceed the ship's permissible deck/tank top load limit (t/m²).",
  },

  // ── Crew ranks: İkinci Zabit = Second Officer (not Chief Officer) ──────────
  '1.2 İkinci Zabit neden eğitimden sorumludur': {
    en: '1.2 Why the Second Officer is responsible for training',
  },
  "İkinci Zabit, açık denizde habersizce GPS girişini kapatır (veya simüle eder). Beklenti: vardiya zabitinin alarmı tanıması, dead reckoning'e geçmesi, radar/visual fix ile pozisyonu bağımsız doğrulaması, kaptanı bilgilendirmesi ve ECDIS'i DR moduyla emniyetle sürdürmesi. Debrief'te tepki süresi ve doğruluk değerlendirilir.": {
    en: 'The Second Officer turns off (or simulates) the GPS input without notice in the open sea. Expectation: the officer of the watch recognizes the alarm, switches to dead reckoning, independently verifies the position with a radar/visual fix, informs the master, and safely keeps ECDIS running in DR mode. In the debrief, response time and accuracy are evaluated.',
  },
  'İkinci Zabit, seyir planlaması ve köprüüstü operasyonlarının birincil sorumlusudur. Haritalar, nautikal yayınlar, seyir cihazları ve GMDSS teçhizatı bu zabitin uhdesindedir. Köprüüstü "seyir zekâsı" olarak çalışır: passage plan hazırlar, meteorolojik değerlendirmeler yapar, ECDIS ve radar bakımlarını takip eder ve vardiya düzeninde aktif köprüüstü nöbeti tutar. STCW Code gereğince GMDSS operatörü sertifikasına sahip olması zorunludur.': {
    en: 'The Second Officer is primarily responsible for navigational planning and bridge operations. Charts, nautical publications, navigational instruments and GMDSS equipment are in the charge of this officer. He works as the bridge\'s "navigational intelligence": he prepares passage plans, makes meteorological evaluations, follows up ECDIS and radar maintenance, and keeps an active bridge watch in the watch rotation. In accordance with the STCW Code, holding a GMDSS operator certificate is mandatory.',
  },
  'İkinci Zabit (Second Officer / Navigation Officer), gemideki seyir planlamasının (passage planning / voyage planning) baş sorumlusudur. Berth-to-berth mantığıyla; appraisal, planning, execution ve monitoring olmak üzere dört aşamadan oluşan planı hazırlar, kaptan onayına sunar ve köprüüstü ekibinin uygulamasını izler. Bu bölüm; rota seçimi, waypoint belirleme, UKC (Under Keel Clearance) hesabı, no-go area tespiti, contingency anchorage ve abort point belirleme, parallel indexing ve squat gibi unsurları IMO Resolution A.893(21) çerçevesinde adım adım açıklar.': {
    en: "The Second Officer (Navigation Officer) is the officer primarily in charge of passage planning / voyage planning on the ship. With berth-to-berth logic, he prepares the plan consisting of four stages — appraisal, planning, execution and monitoring — submits it for the master's approval and monitors the bridge team's implementation. This section explains step by step elements such as route selection, waypoint determination, UKC (Under Keel Clearance) calculation, no-go area identification, contingency anchorage and abort point determination, parallel indexing and squat within the framework of IMO Resolution A.893(21).",
  },

  // ── Crew ratings: Silici = Wiper (not "Eraser") ────────────────────────────
  "1.2 Silici'nin sorumluluk alanı": { en: "1.2 The Wiper's area of responsibility" },
  "9.1 Silici'nin günlük kontrol listesi": { en: "9.1 The Wiper's daily checklist" },
  'Makine dairesi temizliği ve düzeni (Silici)': { en: 'Engine room cleaning and order (Wiper)' },

  // ── Bridge: "Kaptan köprüsü" = the bridge; "ara" = call (not "look for") ───
  'Kaptan köprüsünde': { en: 'On the bridge' },
  'Kaptan köprüsünü ara': { en: 'Call the bridge' },

  // ── Windward/leeward: "rüzgar üstü/altı" (not "above/under the wind") ──────
  'Rüzgar üstünde kalınmalıdır': { en: 'Stay to windward' },
  'Rüzgâr/akıntı altından yavaş yaklaşıp gemiyi kazazede üstüne sürüklenir konuma getirmek': {
    en: 'Approach slowly from leeward/down-current and bring the ship into a position where it drifts down onto the casualty',
  },

  // ── Seamanship: "Gemicilik" (not "shipping"/"sailing") ─────────────────────
  'GEMİCİLİĞİN KAPSAMI:': { en: 'SCOPE OF SEAMANSHIP:' },
  'Gemiciliğin tanımı ve kapsamı': { en: 'Definition and scope of seamanship' },
  'Gemiciliğin Tanımı ve Kapsamı': { en: 'Definition and Scope of Seamanship' },
  'Gemicilik = teori + uygulama + deneyim bütünüdür': { en: 'Seamanship = theory + practice + experience' },
  'Gemicilik Formülleri': { en: 'Seamanship Formulas' },
  'Gemicilik Hesaplamaları': { en: 'Seamanship Calculations' },
  'Gemicilik Hesapları': { en: 'Seamanship Calculations' },

  // ── Knots: "Gemici Bağı" / "Camadan" ───────────────────────────────────────
  'Gemici Bağı (Bowline)': { en: "Bowline (Sailor's Knot)" },
  'Gemici Bağları — 3D': { en: "Sailor's Knots — 3D" },
  'Camadan': { en: 'Reef knot' },

  // ── Stability/docking: "havuzlanır" = dry-docked (not "pooled") ────────────
  'Küçük kıç trimi + yeterli başlangıç GM ile havuzlanır.': {
    en: 'Dry-docking is done with a small stern trim + adequate initial GM.',
  },
  'AŞIRI KIÇ TRİMİ:': { en: 'EXCESSIVE STERN TRIM:' },
  'AŞIRI BAŞ TRİMİ:': { en: 'EXCESSIVE BOW TRIM:' },
  'Aşırı baş trimi': { en: 'Excessive bow trim' },

  // ── Home-screen widgets (HomeWidgetGrid / useHomeWidgets / WeatherInfo) ────
  // Short standalone labels that generic MT mangles out of context:
  // "Batış" -> "batis" (!), "Doğuş" -> "birth", "Açık" -> "open",
  // "Karlı" -> "profitable", "Hava" -> lowercase "weather".
  'Doğuş': { en: 'Sunrise' },
  'Batış': { en: 'Sunset' },
  'Doğuş & batış saatleri': { en: 'Sunrise & sunset times' },
  'Yerel': { en: 'Local' },
  'Hava': { en: 'Weather' },
  // Weather-condition labels (wmoText/wmoToTr WMO code mapping). The short
  // ambiguous ones get full per-language maps because even the corrected
  // English pivot re-mistranslates them ("Showers" -> bathroom "Duschen"/
  // "Douches", "Clear" -> "Прозрачный"/transparent).
  'Açık': {
    en: 'Clear', de: 'Klar', fr: 'Dégagé', es: 'Despejado', it: 'Sereno',
    pt: 'Limpo', ru: 'Ясно', ja: '快晴', ko: '맑음', 'zh-CN': '晴',
    ar: 'صافٍ', hi: 'साफ़', nl: 'Helder', sv: 'Klart', no: 'Klart',
    da: 'Klart', fi: 'Selkeää', pl: 'Bezchmurnie', cs: 'Jasno', hu: 'Derült',
    ro: 'Senin', el: 'Αίθριος', bg: 'Ясно', uk: 'Ясно',
  },
  'Kar': { en: 'Snow' },
  'Karlı': { en: 'Snowy' },
  'Sağanak': {
    en: 'Showers', de: 'Schauer', fr: 'Averses', es: 'Chubascos', it: 'Rovesci',
    pt: 'Aguaceiros', ru: 'Ливни', ja: 'にわか雨', ko: '소나기', 'zh-CN': '阵雨',
    ar: 'زخات مطر', hi: 'बौछारें', nl: 'Buien', sv: 'Skurar', no: 'Byger',
    da: 'Byger', fi: 'Kuurosade', pl: 'Przelotne opady', cs: 'Přeháňky',
    hu: 'Záporok', ro: 'Averse', el: 'Μπόρες', bg: 'Превалявания', uk: 'Зливи',
  },
  'Sağanak Yağışlı': {
    en: 'Rain Showers', de: 'Regenschauer', fr: 'Averses de pluie',
    es: 'Chubascos de lluvia', it: 'Rovesci di pioggia', pt: 'Aguaceiros',
    ru: 'Ливневый дождь', ja: 'にわか雨', ko: '소나기', 'zh-CN': '阵雨',
    ar: 'زخات مطر', hi: 'वर्षा की बौछारें', nl: 'Regenbuien', sv: 'Regnskurar',
    no: 'Regnbyger', da: 'Regnbyger', fi: 'Sadekuuroja', pl: 'Przelotny deszcz',
    cs: 'Dešťové přeháňky', hu: 'Záporeső', ro: 'Averse de ploaie',
    el: 'Μπόρες βροχής', bg: 'Дъждовни превалявания', uk: 'Зливовий дощ',
  },
  'Gök Gürültülü': {
    en: 'Thundery', de: 'Gewittrig', fr: 'Orageux', es: 'Tormentoso',
    it: 'Temporalesco', pt: 'Trovoada', ru: 'Гроза', ja: '雷雨', ko: '뇌우',
    'zh-CN': '雷暴', ar: 'عاصفة رعدية', hi: 'गरज के साथ', nl: 'Onweer',
    sv: 'Åska', no: 'Torden', da: 'Torden', fi: 'Ukkonen', pl: 'Burzowo',
    cs: 'Bouřky', hu: 'Zivataros', ro: 'Furtună cu tunete', el: 'Καταιγίδα',
    bg: 'Гръмотевична буря', uk: 'Гроза',
  },

  // ── Marine Technologies (Bridge Mate) DP: brand and product names ─────────
  // Generic MT translates the vendor and product names as ordinary nouns
  // ("Marine Technologies" -> "Meerestechnologien" / "海洋技術", "RadaScan"
  // -> "雷达扫描"). They are proper nouns and must survive verbatim in every
  // language, so the whole string is pinned here.
  '1. Marine Technologies ve Bridge Mate Konsepti': {
    de: '1. Konzept von Marine Technologies und Bridge Mate',
    fr: '1. Concept de Marine Technologies et Bridge Mate',
    es: '1. Concepto de Marine Technologies y Bridge Mate',
    it: '1. Concetto di Marine Technologies e Bridge Mate',
    pt: '1. Conceito de Marine Technologies e Bridge Mate',
    nl: '1. Concept van Marine Technologies en Bridge Mate',
    sv: '1. Konceptet Marine Technologies och Bridge Mate',
    pl: '1. Pojęcie Marine Technologies i Bridge Mate',
    cs: '1. Koncept Marine Technologies a Bridge Mate',
    ja: '1. Marine Technologies と Bridge Mate の概念',
    ko: '1. Marine Technologies 및 Bridge Mate의 개념',
    'zh-CN': '1. Marine Technologies 和 Bridge Mate 的概念',
  },
  'Bridge Mate operatör istasyonu, DP Chair ve MFW ile DP vardiyası': {
    de: 'Bridge Mate Bedienplatz, DP Chair und DP-Schicht mit MFW',
    fr: 'Poste opérateur Bridge Mate, DP Chair et décalage DP avec MFW',
    es: 'Bridge Mate estación del operador, DP Chair y turno DP con MFW',
    pt: 'Bridge Mate estação do operador, DP Chair e turno DP com MFW',
    nl: 'Bridge Mate operatorstation, DP Chair en DP-ploeg met MFW',
    sv: 'Bridge Mate förarplats, DP Chair och DP-skift med MFW',
    fi: 'Bridge Mate ohjausasema, DP Chair ja DP-vaihto MFW:llä',
    pl: 'Bridge Mate stacja operatorska, DP Chair i zmiana DP z MFW',
    ja: 'Bridge Mate オペレーター ステーション、DP Chair、MFW による DP シフト',
    'zh-CN': 'Bridge Mate 操作员站、DP Chair 和 DP 轮班（带 MFW）',
  },
  '1.2 DP Chair konsepti': {
    fr: '1.2 Notion DP Chair', es: '1.2 DP Chair concepto', it: '1.2 DP Chair concetto',
    pt: '1.2 Conceito DP Chair', nl: '1.2 DP Chair-concept', sv: '1.2 DP Chair koncept',
    no: '1.2 DP Chair konsept', da: '1.2 DP Chair koncept', pl: '1.2 Koncepcja DP Chair',
    cs: '1.2 DP Chair koncept', ja: '1.2 DP Chair の概念', ko: '1.2 DP Chair 개념',
    'zh-CN': '1.2 DP Chair 概念',
  },
  '15 inç kol dayaması ekranı, DP 1/DP 2 operatör istasyonu seçeneği ve konsolu tamamlama/yerine geçme özelliği MT Bridge Mate DP Chair broşüründe (MT-SAL-0096 v1.0) belirtilmiştir.': {

    fr: 'L\'écran d\'accoudoir de 15 pouces, l\'option de poste de commande DP 1/DP 2 et la fonction de complément/remplacement de console sont spécifiés dans la brochure MT Bridge Mate DP Chair (MT-SAL-0096 v1.0).',
    es: 'La pantalla del apoyabrazos de 15 pulgadas, la opción de estación del operador DP 1/DP 2 y la función de complemento/reemplazo de la consola se especifican en el folleto MT Bridge Mate DP Chair (MT-SAL-0096 v1.0).',
    it: 'Il display del bracciolo da 15 pollici, l\'opzione della stazione operatore DP 1/DP 2 e la funzionalità di complemento/sostituzione della console sono specificati nella brochure MT Bridge Mate DP Chair (MT-SAL-0096 v1.0).',
    pt: 'O display do apoio de braço de 15 polegadas, a opção de estação do operador DP 1/DP 2 e o recurso de complemento/substituição do console são especificados no folheto MT Bridge Mate DP Chair (MT-SAL-0096 v1.0).',
    ja: '15 インチのアームレスト ディスプレイ、DP 1/DP 2 オペレーター ステーション オプション、およびコンソールの補完/交換機能は、MT Bridge Mate DP Chair パンフレット (MT-SAL-0096 v1.0) で指定されています。',
    ko: '15인치 팔걸이 디스플레이, DP 1/DP 2 운전자 스테이션 옵션 및 콘솔 보완/교체 기능은 MT Bridge Mate DP Chair 브로셔(MT-SAL-0096 v1.0)에 지정되어 있습니다.',
    'zh-CN': 'MT Bridge Mate DP Chair 手册 (MT-SAL-0096 v1.0) 中指定了 15 英寸扶手显示屏、DP 1/DP 2 操作员站选件和控制台补充/替换功能。',
  },
  // The engine renders the abbreviation "DP" as "XP" in short strings, and that
  // machine output was captured here as if it were a correction. "DP" (dynamic
  // positioning) is a product name here and never changes in any language.
  // src/utils/protectedTerms.ts now stops this class of damage at the source.
  'Marine Technologies Bridge Mate DP': {
    es: 'Marine Technologies Bridge Mate DP', it: 'Marine Technologies Bridge Mate DP',
    pt: 'Marine Technologies Bridge Mate DP', ja: 'Marine Technologies Bridge Mate DP',
    ko: 'Marine Technologies Bridge Mate DP', 'zh-CN': 'Marine Technologies Bridge Mate DP',
  },
  'DP vardiyasının kalitesi, DPO\'nun oturduğu yerden ne gördüğü ve neye ne kadar hızlı ulaşabildiğiyle doğrudan ilgilidir. Bridge Mate ailesi bu noktada üç farklı fiziksel çözüm sunar: klasik konsol, kompakt operatör istasyonu ve kol dayamasına gömülü ekranıyla DP Chair. Bu bölüm, istasyon tipinin vardiya düzenine, kontrol devrine ve gözcülüğe etkisini ele alır.': {

    pt: 'A qualidade do turno do DP está diretamente relacionada com o que o DPO vê de onde está e com que rapidez ele consegue acessar o quê. Neste ponto, a família Bridge Mate oferece três soluções físicas diferentes: o console clássico, a estação de operação compacta e o DP Chair com tela embutida no apoio de braço. Este capítulo discute o impacto do tipo de estação nos padrões de turno, na rotatividade de controle e na vigilância.',
    sv: 'Kvaliteten på DP-skiftet är direkt relaterad till vad DPO ser varifrån han sitter och hur snabbt han kan komma åt vad. Vid det här laget erbjuder Bridge Mate-familjen tre olika fysiska lösningar: den klassiska konsolen, den kompakta förarplatsen och DP Chair med sin skärm inbäddad i armstödet. Det här kapitlet diskuterar inverkan av stationstyp på skiftmönster, omsättning av kontroll och utkik.',
    no: 'Kvaliteten på DP-skiftet er direkte relatert til hva DPO ser fra der han sitter og hvor raskt han kan få tilgang til hva. På dette tidspunktet tilbyr Bridge Mate-familien tre forskjellige fysiske løsninger: den klassiske konsollen, den kompakte førerplassen og DP Chair med skjermen innebygd i armlenet. Dette kapittelet diskuterer innvirkningen av stasjonstype på skiftemønster, omsetning av kontroll og utkikk.',
    da: 'Kvaliteten af ​​DP-skiftet er direkte relateret til, hvad DPO\'en ser, hvorfra han sidder, og hvor hurtigt han kan få adgang til hvad. På dette tidspunkt tilbyder Bridge Mate-familien tre forskellige fysiske løsninger: den klassiske konsol, den kompakte førerplads og DP Chair med sin skærm indlejret i armlænet. Dette kapitel diskuterer indvirkningen af ​​stationstype på skiftemønstre, omsætning af kontrol og udkig.',
    fi: 'DP-vuoron laatu riippuu suoraan siitä, mitä DPO näkee istumapaikastaan ​​ja kuinka nopeasti hän pääsee käsiksi mihinkin. Tässä vaiheessa Bridge Mate-tuoteperhe tarjoaa kolme erilaista fyysistä ratkaisua: klassinen konsoli, kompakti ohjausasema ja DP Chair, jonka näyttö on upotettu käsinojaan. Tässä luvussa käsitellään aseman tyypin vaikutusta vuorotapoihin, ohjauksen vaihtumiseen ja tarkkailuon.',
    pl: 'Jakość zmiany DP jest bezpośrednio powiązana z tym, co DPO widzi z miejsca, w którym siedzi, i od tego, jak szybko może uzyskać do czego dostęp. W tym momencie rodzina Bridge Mate oferuje trzy różne rozwiązania fizyczne: klasyczną konsolę, kompaktowe stanowisko operatora i DP Chair z ekranem osadzonym w podłokietniku. W tym rozdziale omówiono wpływ typu stacji na schematy zmian, zmianę kontroli i obserwację.',
    ja: 'DP シフトの質は、DPO が座っている場所から何が見えるか、そして何にどれだけ早くアクセスできるかに直接関係します。現時点では、Bridge Mate ファミリは 3 つの異なる物理ソリューションを提供しています。クラシック コンソール、コンパクトなオペレーター ステーション、およびアームレストにスクリーンが埋め込まれた DP Chair です。この章では、ステーションの種類がシフト パターン、制御の交代、見張りに与える影響について説明します。',
    ko: 'DP 교대근무의 품질은 DPO가 앉은 자리에서 무엇을 보는지, 그리고 얼마나 빨리 무엇에 접근할 수 있는지와 직접적인 관련이 있습니다. 현재 Bridge Mate 제품군은 클래식 콘솔, 소형 운전실, 팔걸이에 스크린이 내장된 DP Chair 등 세 가지 물리적 솔루션을 제공합니다. 이 장에서는 교대 패턴, 제어 회전율 및 감시에 대한 스테이션 유형의 영향을 논의합니다.',
    'zh-CN': 'DP 轮班的质量与 DPO 从他所在的位置看到的内容以及他访问内容的速度直接相关。目前，Bridge Mate 系列提供了三种不同的物理解决方案：经典控制台、紧凑型操作台和屏幕嵌入扶手中的 DP Chair。本章讨论车站类型对轮班模式、控制权交接和瞭望的影响。',
  },
  '1. Referans Tipleri ve Bridge Mate Portföyü': {
    pl: '1. Typy referencyjne i Bridge Mate portfel', ja: '1. 参照タイプと Bridge Mate ポートフォリオ',
    ko: '1. 참조 유형 및 Bridge Mate 포트폴리오',
  },
  '1.3 CyScan': {
    ja: '1.3 CyScan', ko: '1.3 CyScan', 'zh-CN': '1.3 CyScan',
  },
  '1.2 RadaScan': {
    ko: '1.2 RadaScan', 'zh-CN': '1.2 RadaScan',
  },
  'Marine Technologies Bridge Mate DP ailesi ve dağıtık mimari': {
    'zh-CN': 'Marine Technologies Bridge Mate DP 系列和分布式架构',
  },
};
