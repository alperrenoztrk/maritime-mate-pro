/**
 * Human-reviewed English fixes for source fragments that machine translation
 * previously left partially or fully in Turkish.
 *
 * Keep this separate from the multilingual contextual map: these entries are
 * specifically the final quality gate for the English interface and are also
 * consumed by the English residue audit.
 */

const ENGLISH_TEXT = {
  '-25°C ile -18°C arası (donmuş)': '-25°C to -18°C (frozen)',
  ': Kerteriz (°T veya °M)': ': Bearing (°T or °M)',
  '+10°C ile +15°C arası': '+10°C to +15°C',
  '+2°C ile +5°C arası (taze)': '+2°C to +5°C (fresh)',
  '±0.10 ile ±0.20 mm': '±0.10 to ±0.20 mm',
  '±1.0 ile ±2.0 mm': '±1.0 to ±2.0 mm',
  '~70°K – 70°G (A3); kutuplar (A4) hariç': '~70°N–70°S (A3); excluding polar regions (A4)',
  '−180°–+180° arası': 'Between −180° and +180°',
  '≈ 0.812′ Doğu': '≈ 0.812′ East',
  '≈ 23° Doğu': '≈ 23° East',
  '≈ 35° Batı': '≈ 35° West',
  '≈ 35° Doğu': '≈ 35° East',
  '≈ 39.0′ Doğu': '≈ 39.0′ East',
  '≈ 48′ Doğu': '≈ 48′ East',
  '≈ 59.1′ Doğu': '≈ 59.1′ East',
  '≈ 9.4° Batı': '≈ 9.4° West',
  '≈ 60°-120° (keskin/dik)': '≈ 60°–120° (strong intersection)',
  '≥ 100 m (düdük ≥12 m, çan ≥20 m)': '≥ 100 m (whistle ≥12 m, bell ≥20 m)',
  '≥3 mil (öğütülmüş ≤25 mm)': '≥3 miles (comminuted to ≤25 mm)',
  '════════════════════ ≈ 30° – 90° → Kabul Edilebilir Fix ════════════════════':
    '════════════════════ ≈ 30°–90° → Acceptable Fix ════════════════════',
  '════════════════════ 030°T < 045°T → Emniyetli tarafta ════════════════════':
    '════════════════════ 030°T < 045°T → On the Safe Side ════════════════════',
  '════════════════════ Açı ≈ 60° – 120° → Güçlü Fix ════════════════════':
    '════════════════════ Angle ≈ 60°–120° → Strong Fix ════════════════════',
  '════════════════════ Enlem: 15° – 60° ════════════════════':
    '════════════════════ Latitude: 15°–60° ════════════════════',
  '════════════════════ LOP’lar 60° – 120° açıyla kesişmelidir ════════════════════':
    '════════════════════ LOPs should intersect at 60°–120° ════════════════════',
  '✓ IMO limiti içinde (≤ 12°)': '✓ Within the IMO limit (≤ 12°)',
  '0°–180° arası →': 'Between 0° and 180° →',
  '0°–90° arası, her iki yönde': '0°–90° in either direction',
  '1 m³ kargonun ağırlığı (t/m³)': 'Weight of 1 m³ of cargo (t/m³)',
  '1000 bar ve 1500°C': '1000 bar and 1500°C',
  '150-200 bar ve 400-500°C': '150–200 bar and 400–500°C',
  '180°–360° arası →': 'Between 180° and 360° →',
  '2 bar ve 100°C': '2 bar and 100°C',
  '225°T (kerteriz + 180°)': '225°T (bearing + 180°)',
  "30°'de ≈693′, 60°'de 1200′ (yüksek enlemde iki kat)":
    '≈693′ at 30°, 1200′ at 60° (double at high latitudes)',
  '5 bar ve 50°C': '5 bar and 50°C',
  '8° 30.0′ Kuzey enleminde': 'At latitude 8° 30.0′ North',
  'Açı (°)': 'Angle (°)',
  'Açı (°)    GZ (m)': 'Angle (°)    GZ (m)',
  'Açı (θ)': 'Angle (θ)',
  'Açı olarak: θ = arctan(Trim / LBP)': 'As an angle: θ = arctan(Trim / LBP)',
  'Açık Su Verimi (η₀)': 'Open-Water Efficiency (η₀)',
  'Akü; 25°C': 'Battery; 25°C',
  'Ara yönler: NE (45°), SE (135°), SW (225°), NW (315°)':
    'Intercardinal directions: NE (45°), SE (135°), SW (225°), NW (315°)',
  'Azimuta dik: Zn ± 90°': 'Perpendicular to the azimuth: Zn ± 90°',
  'Başlangıç Boylamı (λ₁)': 'Starting Longitude (λ₁)',
  'Başlangıç Deplasmanı (Δ₀)': 'Initial Displacement (Δ₀)',
  'Başlangıç Enlemi (φ₁)': 'Starting Latitude (φ₁)',
  'Başlangıç: 029° 20.0′ E Varış: 030° 05.0′ E': 'Start: 029° 20.0′ E  Arrival: 030° 05.0′ E',
  'Başlangıç: 08° 20′ N, 023° 10′ E Varış: 05° 40′ S, 020° 30′ W':
    'Start: 08° 20′ N, 023° 10′ E  Arrival: 05° 40′ S, 020° 30′ W',
  'Başlangıç: 25° N, 040° W': 'Start: 25° N, 040° W',
  'Başlangıç: 36° 10.0′ N Varış: 36° 34.0′ N': 'Start: 36° 10.0′ N  Arrival: 36° 34.0′ N',
  'Başlangıç: 36° 10.0′ N, 029° 20.0′ E Varış: 36° 34.0′ N, 030° 05.0′ E':
    'Start: 36° 10.0′ N, 029° 20.0′ E  Arrival: 36° 34.0′ N, 030° 05.0′ E',
  'Birim: m³/t veya ft³/ton': 'Unit: m³/t or ft³/ton',
  'Boş bölme: μ ≈ 0.97': 'Empty compartment: μ ≈ 0.97',
  'Boylam Farkı (Δλ)': 'Difference of Longitude (Δλ)',
  'CO₂ (R-744) ve NH₃ (R-717)': 'CO₂ (R-744) and NH₃ (R-717)',
  'CO₂ yoğunluk katsayısı (≈ 1/0,56 m³/kg)': 'CO₂ density coefficient (≈ 1/0.56 m³/kg)',
  'Çap 1 (D₁)': 'Diameter 1 (D₁)',
  'Çap 2 (D₂)': 'Diameter 2 (D₂)',
  'Çikolata: +12°C ile +18°C': 'Chocolate: +12°C to +18°C',
  'Dec Güneş: 12° 15.3′ N': 'Sun Declination: 12° 15.3′ N',
  'DLo ≈ 1°57.5′ Doğu boylam': 'DLo ≈ 1°57.5′ east longitude',
  'DR mevkii 35° 42.5′ N, 028° 17.3′ E ise → AP: 36° 00′ N, 028° 00′ E seçilebilir':
    'If the DR position is 35° 42.5′ N, 028° 17.3′ E → AP 36° 00′ N, 028° 00′ E may be selected',
  "DR Mevkii: 35° 18.0' N, 010° 38.2' E": "DR Position: 35° 18.0' N, 010° 38.2' E",
  'DR mevkii: 36° 42′ N, 029° 18′ E': 'DR Position: 36° 42′ N, 029° 18′ E',
  'Elma, armut: 0°C ile +1°C': 'Apples and pears: 0°C to +1°C',
  'Emniyetli tarafta (030° < 045°)': 'On the safe side (030° < 045°)',
  'Enlem Farkı (Δφ)': 'Difference of Latitude (Δφ)',
  'Gerçek rüzgâr ≈ 17 kn, yön ≈ 198° T': 'True wind ≈ 17 kn, direction ≈ 198°T',
  'GHA Güneş (10:24 UTC): 335° 42.5′': 'GHA Sun (10:24 UTC): 335° 42.5′',
  'GM₀ ≥ 0.30 m (FSE düzeltmesi sonrası)': 'GM₀ ≥ 0.30 m (after FSE correction)',
  'Gösterim: 045°M, 180°M gibi': 'Display: 045°M, 180°M, etc.',
  'Gösterim: 045°T, 180°T, 270°T gibi': 'Display: 045°T, 180°T, 270°T, etc.',
  'GZmax ≥ 0.20 m (θ ≥ 30° için)': 'GZmax ≥ 0.20 m (for θ ≥ 30°)',
  'Hesaplayıcı P ve cos(φ) ile φ = arccos(pf), Q = P·tan(φ), S = P/pf hesaplar.':
    'The calculator uses P and cos(φ) to calculate φ = arccos(pf), Q = P·tan(φ), and S = P/pf.',
  'HFO için CF ≈ 3,114 t CO₂/t yakıt.': 'For HFO, CF ≈ 3.114 t CO₂/t fuel.',
  'Hız 1 (V₁)': 'Speed 1 (V₁)',
  'IMO: GZ≥0,20m, GZmax açısı ≥25°': 'IMO: GZ ≥ 0.20 m, GZmax angle ≥ 25°',
  'İdeal η ≈ %59.2.': 'Ideal η ≈ 59.2%.',
  'İki açı (A-B → θ₁, B-C → θ₂)': 'Two angles (A-B → θ₁, B-C → θ₂)',
  'İki kerterizde 30°, üçte 10°': '30° for two bearings, 10° for three',
  'İlaç/aşı: +2°C ile +8°C (bazıları -20°C)': 'Medicine/vaccines: +2°C to +8°C (some at -20°C)',
  'İlk Açı (°)': 'Initial Angle (°)',
  'İlk açı: a (örn. 30°)': 'Initial angle: a (e.g. 30°)',
  'İlk Boy (L₀)': 'Initial Length (L₀)',
  'İlk Genlik (θ₁)': 'Initial Amplitude (θ₁)',
  'İlk Kurs (θ₀)': 'Initial Course (θ₀)',
  'Kesme çiçek: +2°C ile +8°C': 'Cut flowers: +2°C to +8°C',
  'Kuzey: 0° veya 360°': 'North: 0° or 360°',
  'Küçük açı yaklaşımı (θ < 10°)': 'Small-angle approximation (θ < 10°)',
  'Küçük açı: 0° - 10° aralığı': 'Small angle: 0°–10° range',
  'Küçük açılarda (θ < 10-15°):': 'At small angles (θ < 10–15°):',
  'L₁₀ (devir)': 'L₁₀ (revolutions)',
  'L₁₀ (saat)': 'L₁₀ (hours)',
  'LHA 0°–180° → batı': 'LHA 0°–180° → west',
  'LHA 0°–180° → gök cismi batıda': 'LHA 0°–180° → celestial body to the west',
  'LHA 180°–360° → doğu': 'LHA 180°–360° → east',
  'LHA 180°–360° → gök cismi doğuda': 'LHA 180°–360° → celestial body to the east',
  'LNG ≈ -163 °C, LPG ≈ -42 °C taşınır.': 'LNG is carried at ≈ -163°C and LPG at ≈ -42°C.',
  'LOP kesişim açıları: 60°, 75°, 45°': 'LOP intersection angles: 60°, 75°, 45°',
  'Makine dairesi: μ ≈ 0.85': 'Engine room: μ ≈ 0.85',
  Mapacık: 'Retaining Clip',
  'Merkez açı: d ≈ arccos 0.809 ≈ 36°': 'Central angle: d ≈ arccos 0.809 ≈ 36°',
  'Merkez açı: θ ≈ arccos 0.596 ≈': 'Central angle: θ ≈ arccos 0.596 ≈',
  'MGO/MDO için CF ≈ 3,206 t CO₂/t yakıt.': 'For MGO/MDO, CF ≈ 3.206 t CO₂/t fuel.',
  'Narenciye: +4°C ile +8°C': 'Citrus fruit: +4°C to +8°C',
  'O₂ (%21), H₂S, CO, HC ve LEL ölçümü': 'Measurement of O₂ (21%), H₂S, CO, HC, and LEL',
  'O₂ %20.9 (min %19.5), LEL <%1, H₂S <10 ppm, CO <25 ppm güvenli sınırlardır.':
    'O₂ 20.9% (minimum 19.5%), LEL <1%, H₂S <10 ppm, and CO <25 ppm are safe limits.',
  'Sextant ölçümü (Hs): 41° 23.4′': 'Sextant observation (Hs): 41° 23.4′',
  'Sıcaklık aralığı -30°C ile +30°C': 'Temperature range: -30°C to +30°C',
  'Sıcaklık aralığı: -30°C ile +30°C': 'Temperature range: -30°C to +30°C',
  'Sıcaklık farkı (HT 5–8°C, LT 10–15°C)': 'Temperature difference (HT 5–8°C, LT 10–15°C)',
  'Sıcaklık Farkı (T₁−T₂)': 'Temperature Difference (T₁−T₂)',
  'Sıvı Yoğunluğu ρ [kg/m³]': 'Liquid Density ρ [kg/m³]',
  'Silyon 135°, kıç 225°': 'Masthead light 135°, sternlight 225°',
  'Silyon 360°, yan fenerler 90°': 'Masthead light 360°, sidelights 90°',
  'sin C₁ ve cos φ₁ hesaplanır.': 'Calculate sin C₁ and cos φ₁.',
  'sin(θ) ≈ θ (radyan) kullanılabilir': 'sin(θ) ≈ θ (radians) may be used',
  'Soğuk oda: 0–4°C, dondurucu: -18 ile -25°C': 'Cold room: 0–4°C, freezer: -18°C to -25°C',
  'Standart koşullarda (15°C, 1013.25 hPa) ρ ≈ 1.225 kg/m³':
    'Under standard conditions (15°C, 1013.25 hPa), ρ ≈ 1.225 kg/m³',
  'Süt ürünleri: +2°C ile +4°C': 'Dairy products: +2°C to +4°C',
  'Taşınmış LOP₁ ile LOP₂’nin kesişimi →': 'Intersection of transferred LOP₁ and LOP₂ →',
  'Taze (soğutulmuş) et: -1°C ile +2°C': 'Fresh (chilled) meat: -1°C to +2°C',
  'Taze balık: 0°C ile +2°C': 'Fresh fish: 0°C to +2°C',
  'Te ≈ Tr / 2  veya  Te ≈ Tr': 'Te ≈ Tr / 2  or  Te ≈ Tr',
  'Tipik değer: 50° - 80°': 'Typical value: 50°–80°',
  'v₁ (Hız)': 'v₁ (Speed)',
  'v₂ (Hız)': 'v₂ (Speed)',
  'V₂ (Hız)': 'V₂ (Speed)',
  'Varış Boylamı (λ₂)': 'Arrival Longitude (λ₂)',
  'Varış Enlemi (φ₂)': 'Arrival Latitude (φ₂)',
  'Varış mevkii: 37°01.0′ N – 030°30.6′ E': 'Arrival position: 37°01.0′ N – 030°30.6′ E',
  'Varış: 45° N, 010° E': 'Arrival: 45° N, 010° E',
  'Yaşam mahalleri: μ ≈ 0.95': 'Accommodation spaces: μ ≈ 0.95',
  'Yatak Ömrü (L₁₀)': 'Bearing Life (L₁₀)',
  'Yeni Deplasman (Δ₁)': 'New Displacement (Δ₁)',
  'Yoğunluk Düzeltmesi (Δρ)': 'Density Correction (Δρ)',
  'Yük ambarı (konteyner): μ ≈ 0.70': 'Cargo hold (containers): μ ≈ 0.70',
  'Zn doğrultusuna dik (Zn ± 90°)': 'Perpendicular to the Zn direction (Zn ± 90°)',
  'Zn yön referansıdır; LOP ona dik çizilir (Zn ± 90°).':
    'Zn is the direction reference; the LOP is drawn perpendicular to it (Zn ± 90°).',
  'Δλ: boylam farkı': 'Δλ: difference of longitude',
  'ρ: Sıvının yoğunluğu (t/m³)': 'ρ: Liquid density (t/m³)',
  'ρ: Su yoğunluğu (t/m³)': 'ρ: Water density (t/m³)',

  // Knot and anchoring terms that were preserved as Turkish loanwords by MT.
  'Aynı yönde ikinci yarım aneleyi atın; beden üzerinde bir kazık bağı oluşur.':
    'Tie a second half hitch in the same direction; this forms a clove hitch around the standing part.',
  'Aynı yönde ikinci yarım aneleyi atıp çekerek kilitleyin.':
    'Tie a second half hitch in the same direction and pull it tight to lock the knot.',
  'Bağ ara (ör. izbarço, bowline, demir)…': 'Search knots (e.g. bowline, anchor bend)…',
  'Beden üzerine bir yarım anele daha atarak kilitleyin; çımayı ince halatla bedene sürce (seizing) yaparak emniyete alın.':
    'Lock it with another half hitch around the standing part; secure the working end to the standing part with a light seizing.',
  'Birinci gözcüğe yarım anele': 'Half hitch around the first eye',
  'Birinci yarım anele': 'First half hitch',
  'Birkaç temel düğüm her gemicinin bilmesi gerekendir. İzbarço (bowman\'s knot / bowline): halatın ucunda sabit, sıkışmayan bir göz oluşturur; can kurtarma ve bağlamada yaygındır. Camadan bağı (reef knot): iki eşit halatı geçici bağlar; yüke gelince sıkışıp çözülmesi gerektiğinde kullanılır (yük taşıyan kritik bağlantılarda güvenilmez). Kropi/sekiz bağı (figure-eight): halat ucunun blok/halkalardan kaçmasını önler. Volta ve kazık bağı (round turn and two half hitches, clove hitch): halatı bir babaya/direğe geçici bağlamak için kullanılır. Doğru düğüm, yük altında tutmalı ve gerektiğinde kolayca çözülebilmelidir.':
    'Every seafarer should know a few basic knots. A bowline forms a fixed, non-jamming loop at the end of a line and is commonly used for rescue and mooring. A reef knot temporarily joins two equal lines but is not reliable for critical load-bearing connections. A figure-eight knot prevents a line from running out through a block or ring. A round turn and two half hitches or a clove hitch temporarily secures a line to a bollard or post. The correct knot must hold under load and remain easy to release when required.',
  'Bowline (İzbarço) düğümünün en önemli özelliği hangisidir?':
    'What is the most important feature of a bowline?',
  'Çımayı beden halatının etrafından dolayarak ilk yarım aneleyi atın.':
    'Pass the working end around the standing part and tie the first half hitch.',
  'Çımayı beden halatının etrafından dolayıp oluşan gözden geçirerek ilk yarım aneleyi atın.':
    'Pass the working end around the standing part and through the loop to tie the first half hitch.',
  'Demirin tutması büyük ölçüde zincirin deniz dibine YATAY bir çekme uygulamasına bağlıdır. Bu nedenle verilen zincir uzunluğu (kaloma), su derinliğinin birkaç katı olmalıdır. İyi havada tipik kural su derinliğinin yaklaşık 5-6 katı zincir; kötü havada daha fazla (7+ kat) verilir. Zincirin ağırlığı (catenary) çekmeyi yatay tutar ve tutma gücünü artırır.':
    'Anchor holding depends largely on the chain applying a HORIZONTAL pull along the seabed. The scope must therefore be several times the water depth. A typical rule is about 5–6 times the water depth in good weather and 7 times or more in bad weather. The chain\'s catenary keeps the pull horizontal and increases holding power.',
  'Dönen veya yön değiştiren yüklerde gevşer; kalıcı bağlarda üzerine yarım anele veya ek bağ atılmalıdır.':
    'It can loosen under rotating or shifting loads; add a half hitch or another securing turn for a permanent connection.',
  'Heave away — vira et. — Slack away / Walk back — laçka et. — Hold on — tut.':
    'Heave away — heave in. — Slack away / Walk back — ease out. — Hold on — hold.',
  'İki Yarım Anele': 'Two Half Hitches',
  'İkinci gözcüğe yarım anele': 'Half hitch around the second eye',
  'İkinci yarım anele': 'Second half hitch',
  'İlk aneleyi turun içinden': 'First half hitch through the round turn',
  'İlk yarım aneleyi tam turun İÇİNDEN geçirmek bu bağı camadan voltasından ayırır ve sarsıntılı yükte tutmasını sağlar.':
    'Passing the first half hitch THROUGH the round turn distinguishes this knot from a round turn and two half hitches and helps it hold under shock loading.',
  'İzbarço (bowline) düğümü ne işe yarar?': 'What is a bowline used for?',
  'İzbarço (bowline) düğümünün temel özelliği nedir?': 'What is the defining feature of a bowline?',
  'İzbarço güvenilir bir ilmek düğümüdür; ancak titreşimli yüklerde gevşeyebileceği için ucu emniyete alınır.':
    'A bowline is a reliable loop knot, but its working end should be secured because vibration can loosen it.',
  'İzbarço sıkışmayan sabit bir göz oluşturur; bağlama ve can kurtarmada yaygındır.':
    'A bowline forms a fixed loop that does not jam; it is widely used for mooring and rescue.',
  'Kaloma (Scope) ve Tutma': 'Scope and Holding',
  'Kaloma (Scope) ve Tutuş': 'Scope and Holding',
  'Kaloma ≈ 5-6 × su derinliği (iyi hava), 7+ × (kötü hava)':
    'Scope ≈ 5–6 × water depth (good weather), 7+ × (bad weather)',
  'Kaloma ≈ 5–6 × derinlik (normal), 8–10 × derinlik (ağır hava)':
    'Scope ≈ 5–6 × depth (normal), 8–10 × depth (heavy weather)',
  'Kaloma ≈ 5–6× derinlik (normal), 8–10× (ağır hava); yetersiz kaloma dragging riskidir.':
    'Scope ≈ 5–6 × depth (normal), 8–10 × (heavy weather); insufficient scope increases the risk of dragging.',
  'Kaloma Oranı (Scope)': 'Scope Ratio',
  'Kaloma önemsizdir': 'Scope is unimportant',
  'Kaloma su derinliğinin ~5-6 katı (iyi hava), kötü havada daha fazla.':
    'Scope is about 5–6 times the water depth in good weather and greater in bad weather.',
  'Sarımlar yük binince sıkıştığı için bağın tutması sürekli gerginliğe bağlıdır. Uzun bir cismi yedeklerken çekilen uca ayrıca bir yarım anele atın (dülger + yarım anele).':
    'Because the turns tighten under load, this knot depends on continuous tension. When towing a long object, add a half hitch at the pulling end (timber hitch plus half hitch).',
  'Sheet bend (anele bağı/dülger bağı) ne için uygundur?': 'What is a sheet bend suitable for?',
  'Suya verilen kaloma miktarının anında okunabilmesi için':
    'To read the amount of anchor cable paid out at a glance',
  'Temel düğümler: izbarço (sabit göz), camadan, sekiz, volta/kazık bağı.':
    'Basic knots: bowline (fixed loop), reef knot, figure-eight knot, and round turn/clove hitch.',
  'Yarım anele ile kilitle': 'Lock with a half hitch',

  // Ambiguous everyday words whose nautical sense was lost in older English MT.
  '(iskele başomuzluk)': '(port bow quarter)',
  'Baş açısını 30-50° yapın': 'Alter the heading by 30–50°',
  "Baş dalgada yüksek hız slamming, pounding ve green water riskini artırır; hız düşürülür ve gerekirse dalga omuzluktan alınır. Kıçtan gelen dalgada surf-riding, broaching ve dümen kaybı riski değerlendirilir. Bordadan dalga synchronous rolling yaratabilir. En güvenli rota, gemi tipine ve yük durumuna göre değişir; sabit bir 'ideal açı' yoktur. Değişiklikler yeterli deniz alanı bırakılarak erken yapılır.":
    "High speed in head seas increases the risk of slamming, pounding, and green water; reduce speed and, if necessary, alter course to take the seas on the bow quarter. In following seas, assess the risks of surf-riding, broaching, and loss of steering. Beam seas can cause synchronous rolling. The safest heading depends on the vessel type and loading condition; there is no fixed 'ideal angle'. Make changes early while sufficient sea room remains.",
  "Bir fener sancak omuzlukta 45°'de görülüyor; 6 NM sonra traversa geldiğinde mesafesi kaç NM'dir?":
    'A lighthouse is sighted at 45° on the starboard bow quarter. After the vessel runs 6 NM and the lighthouse bears abeam, what is the distance off?',
  'Broaching, geminin kıçtan veya kıç omuzluktan gelen dalga etkisiyle kontrolsüz şekilde dönmesi (yaw) ve enine dalgaya yakalanmasıdır. Genellikle dalgayla aynı yönde ve benzer hızda seyirde oluşur. Dümen kontrolü kaybedilir.':
    'Broaching is an uncontrolled yaw caused by seas from astern or on the quarter, leaving the vessel broadside to the waves. It generally occurs while proceeding in the same direction and at a similar speed to the waves, and can result in loss of steering control.',
  'Doğal yalpa periyodu ile karşılaşma periyodu örtüştüğünde rezonans gelişir ve genlik tehlikeli biçimde büyür; kıç omuzluk denizinde ayrıca broaching riski vardır. Slamming kısa periyotlu baş denizlerinin sorunudur.':
    "When the natural roll period coincides with the encounter period, resonance develops and the roll amplitude increases dangerously. Quartering seas also create a risk of broaching. Slamming is associated with short-period head seas.",
  "Görüş 0.5 NM'ye düşen sis bandına girdiniz. Radar baş omuzlukta (nispi 030°) 6 NM'den kapanan ve CPA'sı düşük bir hedef gösteriyor; görsel temas yok. İlk olarak ne yaparsınız?":
    'You enter a fog bank where visibility falls to 0.5 NM. Radar shows a target on the bow quarter at a relative bearing of 030°, closing from 6 NM with a low CPA; there is no visual contact. What do you do first?',
  'İskele baş omuzluktaki hedefe iskeleye dönülmez; kıçtaki hedefe kıça dönülmez. Hız azaltma her zaman geçerlidir.':
    'Do not alter course to port for a target on the port bow quarter, and do not alter course toward a target astern. Reducing speed remains an available action.',
  'İskele baş omuzluktaki hedefe iskeleye dönüş; kıçtaki hedefe kıça dönüş yapılmamalıdır.':
    'Avoid altering course to port for a target on the port bow quarter and avoid altering course toward a target astern.',
  'Deviation geminin demir kütlesinden kaynaklanır ve baş yönüyle değişir; her gemi için deviation kartı çıkarılır.':
    "Compass deviation is caused by the vessel's ferrous masses and varies with heading; a deviation card is prepared for each vessel.",
  'İskele kıç omuzluktan alarak': 'Taking it on the port quarter',
  'Kıç omuzluk denizinde rezonans yalpa gelişiyor. Karşılaşma periyodunu rezonans bölgesinden çıkarmak için ne yaparsınız?':
    'Resonant rolling is developing in quartering seas. What action would you take to move the encounter period out of the resonance range?',
  "Kıç omuzluktan 22.5°'den daha geriden yaklaşan gemide":
    'On a vessel approaching from the quarter, more than 22.5° abaft the beam',
  'Kural 19(d) uyarınca, yalnızca radar ile tespit edilen ve çatışma riski bulunan gemiye karşı yapılacak manevralar sınırlandırılmıştır. İskele baş omuzlukta bulunan gemi için (sancak tarafa çalışması gereken gemiler hariç) iskeleye dümen kırılmaması önerilir. Tam kıçta bulunan gemiye karşı ise kıça dönüş yapılmaması önerilir. Bu kısıtlamalar, radar görüntüsünde hedef belirsizliğinin yüksek olduğu durumlarda yanlış manevrayı önlemek amacıyla konulmuştur. Hız azaltma veya tam durma her zaman geçerli bir seçenektir.':
    'Under Rule 19(d), manoeuvres against a vessel detected by radar alone and presenting a risk of collision are restricted. Except when overtaking, avoid altering course to port for a vessel on the port bow quarter, and avoid altering course toward a vessel abeam or abaft the beam. These restrictions reduce the risk of an incorrect manoeuvre when the radar target is uncertain. Reducing speed or taking all way off remains an available option.',
  "Kural 19(d)'ye göre iskele baş omuzlukta radar hedefi olan gemiye karşı hangi manevradan kaçınılır?":
    'Under Rule 19(d), which manoeuvre should be avoided for a radar target on the port bow quarter?',
  "Kural 19(d)(i): geçilen gemi durumu dışında, baş omuzluktaki bir hedef için iskele tarafına dönmekten kaçınılır; belirgin bir sancak alarkını uygundur.":
    'Rule 19(d)(i): except when overtaking, avoid altering course to port for a target on the bow quarter; a substantial alteration to starboard is appropriate.',
  'Meteorolojik şartlar değiştikçe rota, hız ve vardiya organizasyonu dinamik biçimde güncellenmelidir. Baş omuzluktan gelen sert dalga koşullarında hız azaltma, rotayı birkaç derece kaydırma veya hava penceresi bekleme gibi seçenekler karşılaştırılır. Bu yaklaşım, slam ve yeşil su riskini düşürür.':
    'As weather conditions change, update the route, speed, and watch organization dynamically. In heavy seas on the bow quarter, compare options such as reducing speed, altering course by a few degrees, or waiting for a weather window. This approach reduces slamming and green-water risk.',
  'Rüzgâr sancak baş omuzlukta tutulur ve rüzgâr sağa döndükçe rota da sağa alınarak fırtına yörüngesinden uzaklaşılır.':
    'Keep the wind on the starboard bow quarter and alter course to starboard as the wind veers, moving away from the storm track.',
  'Rüzgâr sancak kıç omuzlukta tutulur; rüzgâr sola döndükçe rota da sola alınarak sistemin arkasında kalınır.':
    'Keep the wind on the starboard quarter and alter course to port as the wind backs, remaining behind the system.',
  'Rüzgârı sancak baş omuzlukta tutmalı':
    'Keep the wind on the starboard bow quarter.',
  'Rüzgârı sancak baş omuzlukta tutup mümkün olan en yüksek hızla uzaklaşmalı':
    'Keep the wind on the starboard bow quarter and move away at the highest safe speed.',
  'Rüzgârı sancak kıç omuzlukta tutup uzaklaşmalı':
    'Keep the wind on the starboard quarter and move away.',
  "Sisli havada plot tamamlandı: hedef baş omuzlukta (forward of the beam) ve CPA tehlikeli derecede düşük. Kural 19'a uygun manevra hangisidir?":
    'The radar plot is complete in restricted visibility: the target is on the bow quarter (forward of the beam) and CPA is dangerously low. Which manoeuvre complies with Rule 19?',
  'Tehlikeli yarım dairede bulunan gemi, rüzgârı sancak baş omuzluğuna alarak mümkün olan en yüksek emniyetli hızla siklondan uzaklaşır. Seyir yapılabilir yarım dairede ise rüzgâr kıç omuzluktan alınarak siklonun gerisine geçilir. Siklonun doğrudan yolunda (path) bulunan gemi, hızla yolun dışına çıkmayı hedefler. Tüm bu manevralarda deniz durumu, yük emniyeti ve makine kapasitesi sınırlamalarını göz önünde bulundurmak gerekir; aşırı hızla seyir, slamming ve yapısal hasara yol açabilir.':
    'A vessel in the dangerous semicircle moves away from the cyclone at the highest safe speed with the wind on the starboard bow quarter. In the navigable semicircle, keep the wind on the quarter and pass behind the cyclone. A vessel directly in the cyclone path should clear the track promptly. Every manoeuvre must account for sea state, cargo security, and machinery limits; excessive speed can cause slamming and structural damage.',
  'Tehlikeli yarım dairede bulunan gemi, rüzgârı sancak baş omuzluğuna alarak siklondan uzaklaşmalıdır. Seyir yapılabilir yarım dairede ise rüzgâr kıç omuzluktan alınarak siklonun gerisine geçilmeye çalışılır. Siklonun doğrudan yolunda (path) bulunan gemi ise mümkün olan en yüksek hızla yolun sağına (Kuzey Yarım Küre) geçmeyi hedeflemelidir. Bu manevraların etkinliği zamana bağlıdır; erken karar alan gemi, manevra alanını geniş tutabilir. Kaçınma manevrası planlanırken siklonun öngörülen hızı ve yönü sürekli güncellenmelidir.':
    'A vessel in the dangerous semicircle should move away from the cyclone with the wind on the starboard bow quarter. In the navigable semicircle, keep the wind on the quarter and try to pass behind the cyclone. A vessel directly in the cyclone path should clear to the right of the track in the Northern Hemisphere at the highest safe speed. These manoeuvres are time-sensitive: an early decision preserves more sea room. Continuously update the cyclone forecast speed and direction while planning avoidance.',
  'Tehlikeli yarım dairede rüzgâr sancak baş omuzluğuna alınır; seyir yapılabilir yarımda kıç omuzluktan alınıp geriye geçilir.':
    'In the dangerous semicircle, keep the wind on the starboard bow quarter; in the navigable semicircle, keep it on the quarter and pass behind the cyclone.',
  'Yaklaşık 14 s periyotlu swell kıç omuzluktan (≈135°) gelirken gemi giderek genişleyen yalpalar yapıyor ve yalpa periyodu dalga karşılaşma periyoduna yaklaşıyor. Temel risk nedir?':
    'A swell with a period of about 14 s is approaching from the quarter (≈135°), the vessel is rolling through progressively larger angles, and its roll period is approaching the wave encounter period. What is the primary risk?',
  'Yandan/kıç omuzluk rüzgârında ve düzenli rüzgâr rejimli rotalarda':
    'In beam or quartering winds and on routes with regular wind patterns',

  // High-confidence maritime senses found by the expanded English audit.
  "Amerika'da denizcilerin ezberi 'red right returning' — dönüşte kırmızı sancakta.":
    "American mariners use the mnemonic 'red right returning'—keep red marks to starboard when returning.",
  'Çifte Sancak Bağı': 'Double Sheet Bend',
  'Aşırı Kıça Trim\'in Dezavantajları:': 'Disadvantages of Excessive Trim by the Stern:',
  '10.5-11.5 (kazan)': '10.5–11.5 (boiler)',
  'İki kazan': 'Two boilers',
  Kazan: 'Boiler',
  'Yardımcı kazan': 'Auxiliary boiler',
  'Bir gömlek 12,000 saatte 2.4 mm aşındıysa saatlik aşınma oranı kaç mm/1,000 saattir?':
    'If a cylinder liner wears by 2.4 mm in 12,000 hours, what is the wear rate in mm per 1,000 hours?',
  'Gömlek dış yüzeyinde kavitasyon hasarını azaltmak için ne yapılır?':
    'What can be done to reduce cavitation damage on the outer surface of a cylinder liner?',
  'Gömlek yüzey sıcaklığı çiy noktasının altına inerse sülfürik asit yoğuşur; bu, hızlı ve ağır aşınma nedenidir.':
    'If the cylinder-liner surface temperature falls below the dew point, sulfuric acid condenses and causes rapid, severe wear.',
  "Gömlekte 'bore polishing' oluşursa hangi belirti görülür?":
    "What symptom is observed when bore polishing occurs in a cylinder liner?",
  'Ölçümler farklı yükseklik ve yönlerde alınır; sınır aşıldığında gömlek yenilenir.':
    'Measurements are taken at different heights and directions; renew the cylinder liner when the limit is exceeded.',
  'Hold çevresi, tank top': 'Cargo-hold perimeter, tank top',
  'Makine üstü, tank top': 'Above the engine, tank top',
  'Dönüş çapı büyür ve gemi dümene geç tepki verir':
    'The turning circle increases and the vessel answers the helm slowly.',
  "Dümen makinesinde 'follow-up' ile 'non-follow-up' kumanda farkı nedir?":
    "What is the difference between follow-up and non-follow-up control in a steering-gear system?",
  'Hidrolik ram tipi dümen makinesi dairesi': 'Hydraulic ram-type steering-gear compartment',
  'Köprüüstü – dümen dairesi arası iletişim testi yapılır.':
    'Test communications between the bridge and the steering-gear compartment.',
  'Köprüüstünden, dümen makinesi dairesinden ve acil dümen pozisyonundan kontrol edilebilmelidir':
    'It must be controllable from the bridge, the steering-gear compartment, and the emergency steering position.',
  'Telemotor, köprüüstü dümen çarkından dümen makinesine kontrol sinyalini (hidrolik veya elektrik) iletir.':
    'The telemotor transmits the hydraulic or electrical control signal from the bridge steering wheel to the steering gear.',
  'I (India): Rotamı iskeleye değiştiriyorum.':
    'I (India): I am altering my course to port.',
  'İki kısa düdükle iskeleye aldığımı bildiririm':
    'I indicate that I am altering course to port with two short blasts.',
  'iskele tarafından': 'on the port side',
  'Rotamı iskeleye çeviriyorum': 'I am altering course to port',
  'Rotamı iskeleye değiştiriyorum': 'I am altering my course to port',
  'Ana (tercihli) kanal sancakta; işaret iskelede bırakılır':
    'The main (preferred) channel is to starboard; leave the mark to port.',
  'Ana kanal iskelede': 'Main channel to port',
  "Bölge A'da kırmızı iskele işaretidir. Bölge B'de aynı renk sancakta kalır; bu yüzden önce bölge belirlenir.":
    'In Region A, red is a port-hand mark. In Region B, the same color is kept to starboard, so establish the buoyage region first.',
  "'Steady as she goes' o anki başı korumak demektir.":
    "'Steady as she goes' means to maintain the present heading.",
  'Akıntı 0, leeway 0 olduğundan yer rotası = baş hattı, yer hızı = su hızı.':
    'With zero current and zero leeway, course over ground equals heading and speed over ground equals speed through the water.',
  'O anki başı koru ve raporla': 'Maintain the present heading and report.',
  'Ani baş değişimi': 'Sudden heading change',
  "Ani baş değişimi umbilical'i thruster akımına veya yapıya sürükleyebilir.":
    'A sudden heading change can draw the umbilical into a thruster wash or against the structure.',
  'Hedef mevki/baş değerini uygulamadan önce oku':
    'Read the target position and heading before applying them.',
  '(Baş trim)': '(trim by the bow)',
  'Aşırı başa trim': 'Excessive trim by the bow',
  'Baş Trim': 'Trim by the Bow',
  'Baş trimi': 'Trim by the bow',
  'başa trim': 'trim by the bow',
  "Başa Trim'in Dezavantajları:": 'Disadvantages of Trim by the Bow:',
  'Negatif trim = Baş trimi': 'Negative trim = trim by the bow',
  'Trim by Head (Başa trim):': 'Trim by the Bow:',
  'Baş Draft (m)': 'Forward Draft (m)',
  'Baş draftı': 'Forward draft',
  'Baş draftı (Forward draft)': 'Forward draft',
  'Baş Su Çekimi': 'Forward Draft',
  'Baş Su Çekimi (m)': 'Forward Draft (m)',
  'Ara yatak ve trust yatak': 'Intermediate bearing and thrust bearing',
  'Ara Yatak ve Trust Yatak': 'Intermediate Bearing and Thrust Bearing',
  'Baş tarafta': 'Forward',
  'Sadece baş tarafa konur': 'It is placed forward only',
  'Yalnızca baş ambara': 'Forward cargo hold only',
  'Omurga (Keel): Geminin ana yapısal elemanıdır. Teknenin uzunlamasına alt merkezinde uzanır. Postalar (Frames): Omurgadan yukarı doğru yükselen enine yapısal elemanlardır. Kaburga (Ribs): Postaların dış kaplamayla birleşen kısmıdır. Güverte (Deck): Yatay platformlardır. Ana güverte (main deck), üst güverte (upper deck), alt güverte (lower deck/tween deck). Ambar (Cargo Hold): Yükün taşındığı kapalı bölümdür. Borda (Hull plating): Teknenin dış kaplamasıdır. Koferdamlar (Cofferdams): İki bölme arasındaki boş alanlar olup, sızıntı kontrolü ve güvenlik amacıyla kullanılır.':
    "Keel: the vessel's principal longitudinal structural member, running along the bottom centerline of the hull. Frames: transverse structural members rising from the keel. Ribs: the parts of the frames connected to the shell plating. Decks: horizontal platforms, including the main deck, upper deck, and lower or tween deck. Cargo hold: the enclosed compartment in which cargo is carried. Shell plating: the outer plating of the hull. Cofferdams: void spaces between compartments used for leak control and safety.",
};

export const ENGLISH_RESIDUAL_CORRECTIONS = Object.fromEntries(
  Object.entries(ENGLISH_TEXT).map(([source, en]) => [source, { en }]),
);

const TURKISH_CHARACTERS = /[şğıöçüŞĞİÖÇÜ]/;
const STRONG_TURKISH_WORDS = /\b(?:anele|açı|açık|ağırlığı|akü|aralık|aralığı|arası|başlangıç|batı|birim|boylam|bölme|bumba|cismi|deplasman|devir|dik|doğu|düzeltmesi|düdük|emniyetli|enlem|farkı|feneri|geçerli|gemi|geminin|girin|gök|göre|gösterim|güçlü|güney|güvenli|hariç|hcunda|hesap|hesapla|hesaplanır|hesaplar|hız|hkanca|hyuk|için|içinde|ile|ilk|izbarço|kaloma|kanca|kargo|katsayısı|kesişimi|kerteriz|kıç|koşullarda|kuzey|limiti|makine|mapacık|mevkii|narenciye|olmalıdır|oranı|referansıdır|sonuç|sonucu|sonuçları|soğuk|sıcaklık|sıvı|saat|silyon|standart|stabilite|taşınır|taze|tutuş|türkiye|uygulanabilir|varış|ve|verimi|veya|yakıt|yatak|yeni|yoğunluk|yön|yük|ürünleri|örnekler|ölçümü|ömrü|öğütülmüş)\b/iu;

const TURKISH_TERM_REPLACEMENTS = [
  [/\bTürkiye\b/g, 'Turkey'],
  [/İzbarço/g, 'Bowline'],
  [/Izbarço/g, 'Bowline'],
  [/izbarço/g, 'bowline'],
  [/\bKaloma\b/g, 'Scope'],
  [/\bkaloma\b/g, 'scope'],
  [/Tutuş/g, 'Holding'],
  [/tutuş/g, 'holding'],
  [/half[- ]anele/giu, 'half hitch'],
  [/\bAnele\b/g, 'Hitch'],
  [/\banele\b/g, 'hitch'],
  [/\bdülger\b/giu, 'timber hitch'],
];

const ACCOMMODATION_BED_SOURCE_RE =
  /yatak\s+(?:yap|düzen|takımı)|çarşaf|havlu|tekstil|kamar|revir|hasta|zemin|sigara|uyku|ranza|nevresim/i;
const NON_COLLISION_CONFLICT_SOURCE_RE =
  /çatışma\s+bölge|silahlı\s+çatış|jeopolitik\s+çatış|çıkar\s+çatış|ekip\s+içinde\s+çatış/i;
const ANCHOR_SOURCE_RE =
  /demir(?:i|im|in|de|den|e|ler)?\s+(?:al|bırak|fundo|tut|tara|operasyon|saha|dip|loça|temiz|kayıp|hazır|durum|işaret|zincir|bağ|ağırlık)|ikinci\s+demir|demir\/zincir|demir(?:in)?\s+tırnak|demirleme|demirde|demirli|demirim/i;
const HEADING_SOURCE_RE =
  /baş\s+(?:açı|yön|kontrol|tut|değiş|değer|bilgi|sensör|referans|hatt)|gyro\s+başı|pusula\s+başı|otomatik\s+baş|mevki\s+ve\s+baş|o\s+anki\s+başı|başı\s+koru/i;
const PORT_SIDE_SOURCE_RE =
  /iskele\s+(?:baş|kıç|taraf|borda|omuzluk|dön|işaret|fener)|rotamı\s+iskeleye|iskele\s+tarafından|kanal\s+iskelede|işaret\s+iskelede|iki\s+kısa[^.!?]*iskeleye/i;

/**
 * Repairs deterministic word-sense failures using the Turkish source as
 * context. This is deliberately narrower than generic find/replace: every
 * rule requires the ambiguous source term and its known-bad English sense.
 */
export const normalizeEnglishMaritimeSenses = (source, text) => {
  let normalized = text;

  if (/ambar/i.test(source)) {
    normalized = normalized
      .replace(/\bCARGO WAREHOUSES\b/g, 'CARGO HOLDS')
      .replace(/\bCARGO WAREHOUSE\b/g, 'CARGO HOLD')
      .replace(/\bCargo Warehouses\b/g, 'Cargo Holds')
      .replace(/\bCargo Warehouse\b/g, 'Cargo Hold')
      .replace(/\bcargo warehouses\b/g, 'cargo holds')
      .replace(/\bcargo warehouse\b/g, 'cargo hold')
      .replace(/\bWAREHOUSES\b/g, 'CARGO HOLDS')
      .replace(/\bWAREHOUSE\b/g, 'CARGO HOLD')
      .replace(/\bWarehouses\b/g, 'Cargo Holds')
      .replace(/\bWarehouse\b/g, 'Cargo Hold')
      .replace(/\bwarehouses\b/g, 'cargo holds')
      .replace(/\bwarehouse\b/g, 'cargo hold');
  }

  if (/yatak/i.test(source) && !ACCOMMODATION_BED_SOURCE_RE.test(source)) {
    normalized = normalized
      .replace(/\bBEDS\b/g, 'BEARINGS')
      .replace(/\bBED\b/g, 'BEARING')
      .replace(/\bBeds\b/g, 'Bearings')
      .replace(/\bBed\b/g, 'Bearing')
      .replace(/\bbeds\b/g, 'bearings')
      .replace(/\bbed\b/g, 'bearing');
  }

  if (/gömlek/i.test(source) && !/(arc-rated|pantolon|yüzdürme|can\s+yeleği)/i.test(source)) {
    normalized = normalized
      .replace(/\bShirts\b/g, 'Cylinder Liners')
      .replace(/\bShirt\b/g, 'Cylinder Liner')
      .replace(/\bshirts\b/g, 'cylinder liners')
      .replace(/\bshirt\b/g, 'cylinder liner');
  }

  if (/fener/i.test(source)) {
    normalized = normalized
      .replace(/\bLantern Bows\b/g, 'Arcs of Visibility')
      .replace(/\blantern bows\b/g, 'arcs of visibility')
      .replace(/\bEnvironmental Lanterns\b/g, 'All-Round Lights')
      .replace(/\benvironmental lanterns\b/g, 'all-round lights')
      .replace(/\bEnvironmental Lantern\b/g, 'All-Round Light')
      .replace(/\benvironmental lantern\b/g, 'all-round light')
      .replace(/\bLantern Glasses\b/g, 'Navigation-Light Lenses')
      .replace(/\blantern glasses\b/g, 'navigation-light lenses')
      .replace(/\bLanterns\b/g, 'Lights')
      .replace(/\bLantern\b/g, 'Light')
      .replace(/\blanterns\b/g, 'lights')
      .replace(/\blantern\b/g, 'light');
  }

  if (/çatış/i.test(source) && !NON_COLLISION_CONFLICT_SOURCE_RE.test(source)) {
    normalized = normalized
      .replace(/\bAnti-Conflict\b/g, 'Collision-Avoidance')
      .replace(/\banti-conflict\b/g, 'collision-avoidance')
      .replace(/\bConflict Prevention\b/g, 'Collision Avoidance')
      .replace(/\bconflict prevention\b/g, 'collision avoidance')
      .replace(/\bConflict Avoidance\b/g, 'Collision Avoidance')
      .replace(/\bconflict avoidance\b/g, 'collision avoidance')
      .replace(/\bRisk of Conflict\b/g, 'Risk of Collision')
      .replace(/\brisk of conflict\b/g, 'risk of collision')
      .replace(/\bConflicts\b/g, 'Collisions')
      .replace(/\bConflict\b/g, 'Collision')
      .replace(/\bconflicts\b/g, 'collisions')
      .replace(/\bconflict\b/g, 'collision');
  }

  if (/vardiya/i.test(source)) {
    normalized = normalized
      .replace(/\bShift Officers\b/g, 'Officers of the Watch')
      .replace(/\bShift Officer\b/g, 'Officer of the Watch')
      .replace(/\bshift officers\b/g, 'officers of the watch')
      .replace(/\bshift officer\b/g, 'officer of the watch')
      .replace(/\bShifts\b/g, 'Watches')
      .replace(/\bShift\b/g, 'Watch')
      .replace(/\bshifts\b/g, 'watches')
      .replace(/\bshift\b/g, 'watch');

    if (/makine[^.!?]{0,80}vardiya|vardiya[^.!?]{0,80}makine/i.test(source)) {
      normalized = normalized
        .replace(/\bMachine Watches\b/g, 'Engine-Room Watches')
        .replace(/\bMachine Watch\b/g, 'Engine-Room Watch')
        .replace(/\bMachine watches\b/g, 'Engine-room watches')
        .replace(/\bMachine watch\b/g, 'Engine-room watch')
        .replace(/\bmachine watches\b/g, 'engine-room watches')
        .replace(/\bmachine watch\b/g, 'engine-room watch');
    }

    if (/vardiya\s+mühendis/i.test(source)) {
      normalized = normalized
        .replace(/\bWatch Engineers\b/g, 'Watchkeeping Engineers')
        .replace(/\bWatch Engineer\b/g, 'Watchkeeping Engineer')
        .replace(/\bwatch engineers\b/g, 'watchkeeping engineers')
        .replace(/\bwatch engineer\b/g, 'watchkeeping engineer');
    }

    if (/^\d+\.\s+Vardiya/i.test(source)) {
      normalized = normalized.replace(/^(\d+)(?:st|nd|rd|th)\s+Watch\b/, '$1. Watch');
    }
  }

  if (/ana\s+makine/i.test(source)) {
    normalized = normalized
      .replace(/\bHost Machine\b/g, 'Main Engine')
      .replace(/\bHost machine\b/g, 'Main engine')
      .replace(/\bhost machine\b/g, 'main engine')
      .replace(/\bMain Machines\b/g, 'Main Engines')
      .replace(/\bMain Machine\b/g, 'Main Engine')
      .replace(/\bMain machines\b/g, 'Main engines')
      .replace(/\bMain machine\b/g, 'Main engine')
      .replace(/\bmain machines\b/g, 'main engines')
      .replace(/\bmain machine\b/g, 'main engine');
  }

  if (/makine\s+dairesi/i.test(source)) {
    normalized = normalized
      .replace(/\bMachine Control Room\b/g, 'Engine Control Room')
      .replace(/\bMachine control room\b/g, 'Engine control room')
      .replace(/\bmachine control room\b/g, 'engine control room')
      .replace(/\bMachine (?:Room|House)\b/g, 'Engine Room')
      .replace(/\bMachine (?:room|house)\b/g, 'Engine room')
      .replace(/\bmachine (?:room|house)\b/g, 'engine room');
  }

  if (/makine\s+telgraf/i.test(source)) {
    normalized = normalized
      .replace(/\bMachine Telegraph\b/g, 'Engine Telegraph')
      .replace(/\bMachine telegraph\b/g, 'Engine telegraph')
      .replace(/\bmachine telegraph\b/g, 'engine telegraph');
  }

  if (/makine\s+(?:departman|bölüm)/i.test(source)) {
    normalized = normalized
      .replace(/\bMechanical Department\b/g, 'Engine Department')
      .replace(/\bMachine Department\b/g, 'Engine Department')
      .replace(/\bMechanical department\b/g, 'Engine department')
      .replace(/\bMachine department\b/g, 'Engine department')
      .replace(/\bmechanical department\b/g, 'engine department')
      .replace(/\bmachine department\b/g, 'engine department');
  }

  if (/makine\s+(?:ekibi|personeli|tayfası)/i.test(source)) {
    normalized = normalized
      .replace(/\bMachine Crew\b/g, 'Engine-Room Team')
      .replace(/\bMachine Team\b/g, 'Engine-Room Team')
      .replace(/\bMachine Personnel\b/g, 'Engine-Room Personnel')
      .replace(/\bMachine crew\b/g, 'Engine-room team')
      .replace(/\bMachine team\b/g, 'Engine-room team')
      .replace(/\bMachine personnel\b/g, 'Engine-room personnel')
      .replace(/\bmachine crew\b/g, 'engine-room team')
      .replace(/\bmachine team\b/g, 'engine-room team')
      .replace(/\bmachine personnel\b/g, 'engine-room personnel');
  }

  if (/dümen\s+makinesi/i.test(source)) {
    normalized = normalized
      .replace(/\bSteering Machine\b/g, 'Steering Gear')
      .replace(/\bRudder Machine\b/g, 'Steering Gear')
      .replace(/\bSteering machine\b/g, 'Steering gear')
      .replace(/\bRudder machine\b/g, 'Steering gear')
      .replace(/\bsteering machine\b/g, 'steering gear')
      .replace(/\brudder machine\b/g, 'steering gear')
      .replace(/\bSteering Wheel (?:Room|House)\b/g, 'Steering-Gear Compartment')
      .replace(/\bSteering wheel (?:room|house)\b/g, 'Steering-gear compartment')
      .replace(/\bsteering wheel (?:room|house)\b/g, 'steering-gear compartment');
  }

  if (ANCHOR_SOURCE_RE.test(source)) {
    normalized = normalized
      .replace(/\bIn Iron\b/g, 'At Anchor')
      .replace(/\bin iron\b/g, 'at anchor')
      .replace(/\bIron (?:Screening|Scanning)\b/g, 'Anchor Dragging')
      .replace(/\biron (?:screening|scanning)\b/g, 'anchor dragging')
      .replace(/\bMy Iron Is Scanning\b/g, 'My Anchor Is Dragging')
      .replace(/\bmy iron is scanning\b/g, 'my anchor is dragging')
      .replace(/\bIron Field\b/g, 'Anchorage')
      .replace(/\biron field\b/g, 'anchorage')
      .replace(/\bIron Lodge\b/g, 'Hawse Pipe')
      .replace(/\biron lodge\b/g, 'hawse pipe')
      .replace(/\bIrons\b/g, 'Anchors')
      .replace(/\bIron\b/g, 'Anchor')
      .replace(/\birons\b/g, 'anchors')
      .replace(/\biron\b/g, 'anchor');
  }

  if (HEADING_SOURCE_RE.test(source)) {
    normalized = normalized
      .replace(/\bGyro Head\b/g, 'Gyro Heading')
      .replace(/\bgyro head\b/g, 'gyro heading')
      .replace(/\bHead Line\b/g, 'Heading Line')
      .replace(/\bhead line\b/g, 'heading line')
      .replace(/\bHeads\b/g, 'Headings')
      .replace(/\bHead\b/g, 'Heading')
      .replace(/\bheads\b/g, 'headings')
      .replace(/\bhead\b/g, 'heading');
  }

  if (/(?:başa\s+trim|baş\s+trim|baş\s+trimi)/i.test(source)) {
    normalized = normalized
      .replace(/\bHead Trim\b/g, 'Trim by the Bow')
      .replace(/\bHead trim\b/g, 'Trim by the bow')
      .replace(/\bhead trim\b/g, 'trim by the bow')
      .replace(/\bTrim to Head\b/g, 'Trim by the Bow')
      .replace(/\bTrim to head\b/g, 'Trim by the bow')
      .replace(/\btrim to head\b/g, 'trim by the bow');
  }

  if (/(?:baş\s+draft|baş\s+su\s+çekimi)/i.test(source)) {
    normalized = normalized
      .replace(/\bHead Draft\b/g, 'Forward Draft')
      .replace(/\bhead draft\b/g, 'forward draft');
  }

  if (PORT_SIDE_SOURCE_RE.test(source)) {
    normalized = normalized
      .replace(/\bPiers\b/g, 'Port')
      .replace(/\bPier\b/g, 'Port')
      .replace(/\bpiers\b/g, 'port')
      .replace(/\bpier\b/g, 'port');
  }

  if (/omuzluk/i.test(source)) {
    normalized = normalized
      .replace(/\b(?:shoulder straps?|shoulder pads?|shoulders?|pauldrons?|headrests?|bulwarks?)\b/gi, 'quarter')
      .replace(/\bstern bow\b/gi, 'quarter')
      .replace(/\bstern sea\b/gi, 'quartering sea')
      .replace(/\bbowhead\b/gi, 'bow quarter');
  }

  if (/kare\s+bayrak\s*\+\s*top/i.test(source)) {
    normalized = normalized
      .replace(/square flag \+ cannon/gi, 'square flag + ball')
      .replace(/square flag \+ gun/gi, 'square flag + ball');
  }

  if (/(?:Flinders|küreler)[^.!?]*sapma|pusula[^.!?]*sapma/i.test(source)) {
    normalized = normalized
      .replace(/\bDeflection\b/g, 'Deviation')
      .replace(/\bdeflection\b/g, 'deviation');
  }

  return normalized;
};

export const normalizeEnglishResidualTerms = (text, source = '') => {
  let normalized = text;
  for (const [pattern, replacement] of TURKISH_TERM_REPLACEMENTS) {
    normalized = normalized.replace(pattern, replacement);
  }
  return source ? normalizeEnglishMaritimeSenses(source, normalized) : normalized;
};

export const looksLikeTurkishSource = (text) =>
  TURKISH_CHARACTERS.test(text) || STRONG_TURKISH_WORDS.test(text);

const isIntentionalAlphabetExample = (source, value) =>
  /(?:mors|ITU-R M\.1677|Türkçedeki)/iu.test(source) &&
  /(?:Turkish|ITU-R M\.1677|Morse)/iu.test(value);

const stripAcceptedNames = (value) => value.replace(/\b(?:Föhn|Wöhler|Stülcken)\b/gu, '');

export const containsTurkishResidue = (source, value) => {
  if (normalizeEnglishResidualTerms(value, source) !== value) return true;
  if (STRONG_TURKISH_WORDS.test(value)) return true;
  if (!TURKISH_CHARACTERS.test(value)) return false;
  if (isIntentionalAlphabetExample(source, value)) return false;
  return TURKISH_CHARACTERS.test(stripAcceptedNames(value));
};
