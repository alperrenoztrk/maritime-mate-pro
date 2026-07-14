import type { ShipType } from "./types";
import image from "@/assets/ships/operation-roro.svg";

export const roRo: ShipType = {
  id: "ro-ro",
  label: "Ro-Ro",
  description: "Ro-Ro gemilerinde araç yükleme, rampa ve deniz operasyonları",
  emoji: "🚢",
  image,
  color: "from-emerald-500/20 to-teal-500/10",
  departments: [
    {
      id: "guverte",
      label: "Güverte",
      operations: [
        {
          title: "Araç rampa açılış/kapanış prosedürü",
          purpose:
            "Stern/bow/side ramp'in hidrolik kontrolü ile kapı kilitleme ve sızdırmazlığının her aşamada doğrulanması.",
          procedure: [
            "Rampa açma öncesi cleat ve dog'ları kontrol et.",
            "Hydraulic pressure ve operating panel açık olduğunu teyit et.",
            "Rampa indirme öncesi alanı boşalt ve VHF ile terminale bildir.",
            "Indirildikten sonra apron ve mafi rolü ile destek ekle.",
            "Kapatma sonrası limit switch sinyallerini ve weather-tight dog tightness'ı kontrol et.",
            "Hatch indicator panelinin bridge'de yeşil olduğunu doğrula.",
          ],
          regulations: [
            "SOLAS II-1 Part B-2 — Watertight integrity",
            "SOLAS II-1 Reg. 17 — Closures in bulkheads",
            "MSC.1/Circ.1564 — Bow door checks (Estonia kazasından sonra revize)",
          ],
          safety: [
            "Bow/visor door tarihsel olarak (Estonia 1994) Ro-Ro tipinin en kritik failure noktası — açık kalırsa hızlı kapsizing.",
            "Rampa altında kimse durmamalı, fail-safe latches devrede olmalı.",
          ],
          records: [
            "Ramp / door operation log",
            "Watertight integrity check (her seferden önce)",
          ],
        },
        {
          title: "Araç lashing kontrolü (zincirleme, shoring)",
          purpose:
            "Her tip aracın CSS Code ve şirket lashing manual'ına göre uygun lashing pattern, MSL ve tension ile sabitlenmesi.",
          procedure: [
            "Aracın MAM (Maximum Authorized Mass) ve lashing point sayısına göre lashing pattern seç.",
            "Wheel chock + web lashing veya zincirleme uygula (MSL'in toplam sec faktörü > 1.0).",
            "Çift seviyeli (high & heavy) yüklerde shoring ve crowbar destekleri.",
            "Heavy weather öncesi tüm lashing'leri yeniden gerdirme rounds'u yap.",
            "Lashing fotoğrafları + checklist Chief Officer onayına gider.",
          ],
          regulations: [
            "CSS Code Annex 4 — Wheel-based vehicles",
            "IMO MSC.1/Circ.812 — Securing of cargo on ro-ro ships",
          ],
          safety: [
            "Lashing under-tension parametric/synchronous rolling sırasında kayma yapar; yangın katmerlenir.",
          ],
          records: [
            "Lashing Inspection Sheet (deck-by-deck)",
            "Cargo Securing Manual revize tarihi",
          ],
        },
        {
          title: "Araç yerleştirme planı ve sayımı",
          purpose:
            "Aracın boy, ağırlık ve discharge port'una göre deck/lane atamasıyla optimize edilen stowage plan'ı.",
          procedure: [
            "Booking listesini araç tipi, ağırlık, length ile sırala.",
            "Heavy units low + center / light high & wing prensibi.",
            "DG araçları (UN 3528 vb.) on-deck veya özel ventilated bölümlere koy.",
            "Discharge port sıralı yerleştirme (LIFO).",
            "Tally count terminal ile karşılaştırılır.",
          ],
          regulations: [
            "CSS Code",
            "IMDG Code (DG araçlar için)",
          ],
          safety: [
            "Yanlış stowage parametric rolling + cargo shift = kapsizing.",
          ],
          records: [
            "Stowage Plan",
            "Tally sheet",
          ],
        },
        {
          title: "Trim ve stabilite hesabı (araç yükü dahil)",
          purpose:
            "Araç yükü, balast ve yakıt durumunda IS Code 2008 + SOLAS II-1 damage stability uyumunun her kondisyonda doğrulanması.",
          procedure: [
            "Loading computer'a tüm deck VCG'lerini gir.",
            "GM, GZ, area kriterleri kontrol.",
            "Damage stability simülasyonu (worst case ramp/door açıkmış gibi).",
            "Trim'i pilot manevra için 0.3-0.5 m by stern hedefle.",
          ],
          regulations: [
            "IS Code 2008",
            "SOLAS II-1 Part B-1 (probabilistic damage)",
            "Stockholm Agreement (varsa)",
          ],
          safety: [
            "Free surface + open deck = stability marjı çok düşük.",
          ],
          records: [
            "Stability Statement (Master imzalı)",
          ],
        },
        {
          title: "Güverte geçirgenlik ve yangın kapısı kontrolü",
          purpose:
            "Watertight ve A-class fire boundary kapılarının her sefer öncesi indicator + el ile fonksiyon kontrolünden geçirilmesi.",
          procedure: [
            "Bridge indicator panel önünde her kapıyı uzaktan açıp kapatarak test et.",
            "Mekanik fail-safe spring fonksiyonunu kontrol et.",
            "Drencher ve sprinkler valve'lerini tatbikatla test.",
            "Smoke/fire damper'ları periyodik test.",
          ],
          regulations: [
            "SOLAS II-1 Reg. 13",
            "SOLAS II-2 Reg. 9 — Fire boundaries",
          ],
          safety: [
            "Stuck-open kapı major flooding sebebi.",
          ],
          records: [
            "Watertight door log",
            "Drencher test record",
          ],
        },
        {
          title: "Rampa su geçirmezlik ve sızdırmazlık kontrolü",
          purpose:
            "Stern/bow ramp ve outer door seal'lerinin compression, deformation ve sızıntı kontrolü.",
          procedure: [
            "Hose test veya ultrasonic test ile sızdırmazlık.",
            "Rubber seal'ları aşınma açısından kontrol et.",
            "Drainage scupper'ların açık olduğunu doğrula.",
          ],
          regulations: [
            "SOLAS II-1 Reg. 17",
            "MSC.1/Circ.1564",
          ],
          safety: [
            "Su girişi araç güvertesinde free surface yapar — kapsizing en hızlı sebebi.",
          ],
          records: [
            "Hose test record",
            "Seal inspection log",
          ],
        },
        {
          title: "Passage plan oluşturma ve ECDIS güncelleme",
          purpose:
            "Berth-to-berth passage plan'ın özellikle kısa-feeder Ro-Ro hatlarında günlük revize edilmesi.",
          procedure: [
            "Tide window ve ferry traffic separation scheme'i passage plan'a entegre et.",
            "ECDIS safety contour gemi draftı + UKC + squat'a göre.",
            "Yüksek yoğunluklu kıyı seyrinde fix interval 6 dk.",
          ],
          regulations: [
            "SOLAS V/34",
            "IMO Res. A.893(21)",
          ],
          safety: [
            "Tarifeli hatlarda crew familiarity → complacency riski.",
          ],
          records: [
            "Passage Plan (Master onaylı)",
          ],
        },
        {
          title: "Kılavuz alımı ve bırakma prosedürü",
          purpose:
            "Pilot ladder ve combination ladder kurulumunun SOLAS V/23 + IMPA poster'a göre yapılması.",
          procedure: [
            "Pilot ladder son kullanma tarihi ve sertifikasını kontrol et.",
            "Manrope, life-buoy, lighting, two-way radio hazır.",
            "Pilot karşılayan responsible officer'ı brief et.",
          ],
          regulations: [
            "SOLAS V/23",
            "IMO Res. A.1045(27)",
          ],
          safety: [
            "Bağlantı magnet/strop yerine sadece onaylı shackle ile.",
          ],
          records: [
            "Pilot ladder pre-use checklist",
          ],
        },
        {
          title: "Ballast/deballast operasyonu (trim düzenleme)",
          purpose:
            "Araç yükleme/boşaltma sırasında trim ve heel'in dynamic compensation ile sabit tutulması.",
          procedure: [
            "Loadicator ile her 20 araçta tank durumunu yeniden hesapla.",
            "Heeling tank'ları (varsa) auto modda kullan.",
            "BWTS aktif tut; D-2 standardına uygun discharge.",
          ],
          regulations: [
            "BWM Convention",
            "IS Code 2008",
          ],
          safety: [
            "Aşırı heel araç kayma riskini artırır.",
          ],
          records: [
            "Ballast Water Record Book",
            "Loadicator print-out",
          ],
        },
        {
          title: "Yük listesi (cargo manifest) hazırlama",
          purpose:
            "Aracın UN no, ağırlık, lane assignment ve emergency contact bilgileriyle manifestoda kayıtlı olması.",
          procedure: [
            "Booking listesinden manifest'e veri aktar.",
            "DG araçlar için EmS, MFAG, IMDG declaration ekle.",
            "Manifest'i agent ve port authority'ye gönder.",
          ],
          regulations: [
            "FAL Convention",
            "IMDG Code",
          ],
          safety: [
            "Eksik DG declaration ciddi para cezası ve detention.",
          ],
          records: [
            "Cargo Manifest",
            "DG Manifest",
          ],
        },
        {
          title: "Limana yanaşma ve ayrılma operasyonu",
          purpose:
            "Pilot ile koordineli olarak tug, mooring ve linkspan/ramp pozisyonunun emniyetli ayarlanması.",
          procedure: [
            "Pre-arrival meeting (Master, Pilot, OOW).",
            "Linkspan ile rampa hizalama tolerance'ları kontrol et.",
            "Mooring sırası (head, breast, spring) plana göre.",
          ],
          regulations: [
            "MEG4",
            "ISM Element 7",
          ],
          safety: [
            "Linkspan misalignment hidrolik mengeneyi kırabilir.",
          ],
          records: [
            "Bell Book",
            "Pilot card",
          ],
        },
        {
          title: "Tehlikeli araç (DG taşıyan) yerleştirme ve beyan",
          purpose:
            "DG taşıyan tankerlerin/araçların IMDG segregation tablosuna uygun şekilde yerleştirilmesi ve beyan edilmesi.",
          procedure: [
            "UN no, sınıf, packing group ve quantity manifest'te.",
            "Segregation tablosuna göre away/separated stow.",
            "EmS/MFAG bridge ve fire team'e brief.",
            "DG sticker ve placard'ların görünür olduğunu kontrol et.",
          ],
          regulations: [
            "IMDG Code",
            "ADR (kara) / IMDG geçişi",
          ],
          safety: [
            "Class 2 (gas) ve Class 3 (flammable liquid) araçların ventilation rate'i artırılır.",
          ],
          records: [
            "DG Manifest",
            "DOC for Carriage of DG",
          ],
        },
        {
          title: "Yüksek ve ağır araç (abnormal load) kabulü",
          purpose:
            "OOG araçların özel lashing, deck strength ve clearance kontrolü ile yüklenmesi.",
          procedure: [
            "Deck strength chart ile point load karşılaştır.",
            "Clearance + height restriction (deck overhead).",
            "Özel shoring + zincir lashing.",
            "Risk assessment Master onayı.",
          ],
          regulations: [
            "CSS Code Annex 13",
          ],
          safety: [
            "Heavy unit shifting ön/arka destekleri kırabilir.",
          ],
          records: [
            "Abnormal Load Plan",
            "Risk Assessment Form",
          ],
        },
        {
          title: "Bakım planı (PMS) ve güverte ekipman bakımı",
          purpose:
            "Class onaylı PMS ile ramp hidrolik, hatch, lashing ekipmanı ve LSA bakımının takibi.",
          procedure: [
            "Aylık overdue list raporla.",
            "Hidrolik test 6 ayda bir maker manual'e göre.",
            "Lashing ekipmanı (chain, chock, web) yıllık inceleme.",
          ],
          regulations: [
            "Class PMS approval",
            "ISM Element 10",
          ],
          safety: [
            "Aşınmış lashing → cargo shift.",
          ],
          records: [
            "PMS rapor",
            "Lashing equipment register",
          ],
        },
        {
          title: "PSC hazırlığı ve ISM denetimi",
          purpose:
            "Ro-Ro özelinde Stockholm Agreement, watertight integrity ve damage stability ile ilgili ek dokümanların hazır olması.",
          procedure: [
            "Statütüer sertifikalar güncel.",
            "Stability booklet, damage stability calculation hazır.",
            "Önceki PSC deficiency'ler kapatılmış.",
            "Drill schedule güncel.",
          ],
          regulations: [
            "Paris MoU",
            "ISM Code",
            "Stockholm Agreement (varsa)",
          ],
          safety: [
            "Bow door / ramp ile ilgili eksiklik direkt detention.",
          ],
          records: [
            "PSC önceki rapor dosyası",
            "Internal pre-PSC checklist",
          ],
        },
        {
          title: "Acil durum tatbikatları (yangın, MOB, tahliye)",
          purpose:
            "SOLAS III/19 uyumlu drill takvimi + Ro-Ro özel araç güvertesi yangın senaryoları.",
          procedure: [
            "Aylık fire drill (araç güvertesi senaryolu).",
            "Drencher activation drill.",
            "Yolcu Ro-Pax ise abandon ship + yolcu tahliye drill.",
            "Tatbikat sonrası debrief.",
          ],
          regulations: [
            "SOLAS III/19",
            "STCW A-VI/1",
          ],
          safety: [
            "Araç güvertesi yangını çok hızlı yayılır — drencher kritik.",
          ],
          records: [
            "Drill Log",
          ],
        },
        {
          title: "Personel ve yük güvenliği kontrol listeleri",
          purpose:
            "Crew + driver girişlerinin PPE ve safety briefing kontrolü ile yapılması.",
          procedure: [
            "Driver safety induction kartı (5 dk video + imza).",
            "Hi-vis, baret, S3 ayakkabı kontrolü.",
            "Araç güvertesinde yürüyüş yolu işaretli.",
          ],
          regulations: [
            "ILO C152 / MLC 2006",
          ],
          safety: [
            "Sürücü-pedestrian ayrımı şart.",
          ],
          records: [
            "Driver induction log",
          ],
        },
        {
          title: "Güverte aydınlatma kontrolü",
          purpose:
            "Araç güvertelerinde 30 lux genel ve 50 lux çalışma alanı aydınlatması.",
          procedure: [
            "Lüksmetre ile spot ölçüm.",
            "Yanmayan armatürleri değiştir.",
            "Emergency lighting test (battery 30 dk).",
          ],
          regulations: [
            "MSC/Circ.982 — Ergonomic criteria",
            "SOLAS III/11.5",
          ],
          safety: [
            "Düşük aydınlatma araç manevra kazasına yol açar.",
          ],
          records: [
            "Lighting test record",
          ],
        },
        {
          title: "AIS ve GMDSS kontrol",
          purpose:
            "AIS statik ve dinamik veri ile GMDSS cihazlarının haftalık/aylık testleri.",
          procedure: [
            "AIS MMSI, IMO, callsign, draft, destination, ETA güncel.",
            "DSC self test, EPIRB monthly test.",
            "MF/HF ile coast station testi.",
          ],
          regulations: [
            "SOLAS IV",
            "IMO Res. A.1106(29)",
          ],
          safety: [
            "Yanlış AIS data trafik karışıklığı.",
          ],
          records: [
            "GMDSS Radio Log",
          ],
        },
        {
          title: "Araç güvertesi ventilasyon planlaması",
          purpose:
            "Fume birikimini önlemek için belirlenmiş air change rate (ACH) sağlanması.",
          procedure: [
            "Yükleme sırasında min 10 ACH (closed deck).",
            "Sefer boyunca min 5 ACH.",
            "Fan motor ve damper testi.",
            "CO + LEL gaz sensörü kalibrasyonu.",
          ],
          regulations: [
            "SOLAS II-2 Reg. 20",
            "MSC.1/Circ.1535",
          ],
          safety: [
            "DG araç durumunda ventilasyonu artır; explosive atmosphere riski.",
          ],
          records: [
            "Ventilation operation log",
            "Gas sensor calibration certificate",
          ],
        },
        {
          title: "Seyir logbook doldurma",
          purpose:
            "Deck Log ve Official Log defterlerinin günlük doldurulması.",
          procedure: [
            "Vardiya sonu position, course, speed, weather kayıt.",
            "Olayları (drill, crew change, ship-shore) işle.",
            "Bell book'u manevra sırasında.",
          ],
          regulations: [
            "Flag State Merchant Shipping Act",
          ],
          safety: [
            "Back-dated entry yasal sorun.",
          ],
          records: [
            "Deck Log Book",
            "Official Log Book",
          ],
        },
        {
          title: "COLREG uyumu ve seyir kuralları takibi",
          purpose:
            "Trafik separation scheme ve karşılaşma kurallarının takibi.",
          procedure: [
            "TSS girişlerinde tarafa göre seyret.",
            "Risk of collision ARPA + visual ile değerlendir.",
            "Sound + light signals'ı uygula.",
          ],
          regulations: [
            "COLREG 1972 (revize)",
          ],
          safety: [
            "Constant bearing decreasing range = collision risk.",
          ],
          records: [
            "Bridge Log entries",
          ],
        },
        {
          title: "Fender ve palamar ekipmanı bakımı",
          purpose:
            "Ferry hattında yoğun temas nedeniyle fender ve mooring ekipmanın artırılmış inspection sıklığı.",
          procedure: [
            "Fender cover dikiş, kompresyon kontrolü.",
            "Mooring rope MEG4 line management plan'a göre.",
            "Heaving line monkey fist ≤ 0.5 kg.",
          ],
          regulations: [
            "MEG4",
            "ISO 2307",
          ],
          safety: [
            "Snap-back zone uyarısı.",
          ],
          records: [
            "Line/Fender Register",
          ],
        },
        {
          title: "Muster list güncelleme",
          purpose:
            "Crew change sonrası 24 saat içinde muster list'in güncellenmesi.",
          procedure: [
            "İsim, görev, lifeboat, fire team task'ları gir.",
            "İlgili koridorlara as.",
            "Working language + sembol.",
          ],
          regulations: [
            "SOLAS III/8",
          ],
          safety: [
            "Outdated list panik sebebi.",
          ],
          records: [
            "Muster List (revize tarihli)",
          ],
        },
        {
          title: "Notice to Mariners ve harita düzeltmeleri",
          purpose:
            "Haftalık NtM ile haritaların güncel tutulması.",
          procedure: [
            "PDF + ENC update indir.",
            "Kağıt haritalara violet ink düzeltme.",
            "ECDIS update yükle, log yazdır.",
          ],
          regulations: [
            "SOLAS V/27",
          ],
          safety: [
            "Outdated chart detention.",
          ],
          records: [
            "Chart Correction Log",
          ],
        },
      ],
    },
    {
      id: "makine",
      label: "Makine",
      operations: [
        {
          title: "Rampa hidrolik sistemi bakımı ve testi",
          purpose:
            "Rampa açma/kapatma hidrolik silindir, valve ve power pack'in maker manual'e uygun bakımı.",
          procedure: [
            "Hidrolik yağ seviyesi ve cleanliness ISO 4406 kodu.",
            "Cylinder seal'leri sızıntı kontrolü.",
            "Limit switch ve emergency lowering pump test.",
            "Yıllık load test SWL %110.",
          ],
          regulations: [
            "Class Rules — Lifting appliances",
            "ILO C152",
          ],
          safety: [
            "Hidrolik enjeksiyon yaralanması; PPE şart.",
          ],
          records: [
            "Hydraulic system PMS report",
            "Load test certificate",
          ],
        },
        {
          title: "Bow thruster bakımı ve testi",
          purpose:
            "Bow ve stern thruster'ın motor, propeller ve clutch bakımı ile yanaşma manevralarına hazır tutulması.",
          procedure: [
            "Yağ analiz 6 ayda bir (water content).",
            "Propeller pitch (CPP) kalibrasyonu.",
            "Insulation resistance ölçümü.",
            "Function test her port öncesi.",
          ],
          regulations: [
            "Class Rules",
          ],
          safety: [
            "Tunnel girişine kimse girmemeli; lock-out.",
          ],
          records: [
            "Thruster oil analysis",
            "Function test log",
          ],
        },
        {
          title: "Ana makine standby hazırlığı",
          purpose:
            "Sea passage'dan manevraya geçişte ME'yi manoeuvring fuel + slow turning ile hazırlamak.",
          procedure: [
            "ETA 1-2 saat önce slow-down.",
            "Auxiliary blower auto.",
            "Steering gear 2 pump.",
            "Telegraph standby + bell book.",
          ],
          regulations: [
            "SOLAS II-1 Reg. 29.3",
          ],
          safety: [
            "Fuel switch ramping ile.",
          ],
          records: [
            "Bell Book",
            "Engine Log",
          ],
        },
        {
          title: "Jeneratör bakımı ve yük yönetimi",
          purpose:
            "DG'lerin paralel yükde dengeli çalışması ve PMS bakımı.",
          procedure: [
            "Senkronizasyon: voltage, frequency, phase.",
            "Yük paylaşımı governor droop.",
            "Injector/valve clearance bakımı.",
            "Insulation resistance 6 ayda bir.",
          ],
          regulations: [
            "SOLAS II-1 Reg. 41-43",
            "Class Rules",
          ],
          safety: [
            "Senkronizasyonda yanlış faz şaft kırar.",
          ],
          records: [
            "DG Running Hours Log",
            "Black-out test report",
          ],
        },
        {
          title: "Sintine operasyonu ve MARPOL ORB kaydı",
          purpose:
            "ER sintine suyunun OWS ile 15 ppm altında işlenip overboard veya holding tank'a alınması.",
          procedure: [
            "OCM ve 3-way valve auto modda.",
            "Special area dışı + > 12 NM şartı.",
            "Filter/coalescer aşınma.",
            "ORB I — Code C, D, E.",
          ],
          regulations: [
            "MARPOL Annex I Reg. 14, 15, 17",
            "MEPC.107(49)",
          ],
          safety: [
            "Magic pipe yasak.",
          ],
          records: [
            "ORB I",
            "OCM seal certificate",
          ],
        },
        {
          title: "Bunker operasyonu planlaması ve yürütme",
          purpose:
            "Bunker safety checklist + BDN + sample retention ile MARPOL Ek VI uyumlu transfer.",
          procedure: [
            "Pre-bunker meeting + checklist.",
            "İlk akış yavaş + topping-up el ile.",
            "MARPOL sample mühürlü 12 ay.",
          ],
          regulations: [
            "MARPOL Annex VI Reg. 18",
            "MARPOL Annex I Reg. 17",
          ],
          safety: [
            "SOPEP hazır + bonding cable.",
          ],
          records: [
            "BDN",
            "ORB I — Code H",
          ],
        },
        {
          title: "Tatlı su üretimi",
          purpose:
            "Vakum altında deniz suyu evaporasyonu ile potable + tech water üretimi.",
          procedure: [
            "Jacket water ≥ 50°C.",
            "Salinometer < 10 ppm.",
            "Liman içinde ÇALIŞTIRMA.",
            "UV + mineralizer bakımı.",
          ],
          regulations: [
            "WHO Drinking Water Guidelines",
            "MLC 2006 Reg. 3.2",
          ],
          safety: [
            "Liman kontaminasyonu.",
          ],
          records: [
            "FW production log",
          ],
        },
        {
          title: "Araç güvertesi zorunlu havalandırma sistemi kontrolü",
          purpose:
            "Closed Ro-Ro space'lerde min ACH'in fan motor + damper kontrolü.",
          procedure: [
            "Yükleme sırasında 10 ACH.",
            "Sefer boyunca 5 ACH.",
            "CO + LEL sensör kalibre.",
          ],
          regulations: [
            "SOLAS II-2 Reg. 20",
            "MSC.1/Circ.1535",
          ],
          safety: [
            "DG araç durumunda artırılmış ventilation.",
          ],
          records: [
            "Ventilation log",
            "Gas sensor calibration",
          ],
        },
        {
          title: "Trim pompası operasyonu",
          purpose:
            "Heeling + trim tank'larında dynamic compensation pompasının testi.",
          procedure: [
            "Auto modda her 20 araçta yeniden hesap.",
            "Manuel test haftada bir.",
            "Pompa bakımı 6 ayda bir.",
          ],
          regulations: [
            "IS Code 2008",
          ],
          safety: [
            "Pompa arızası heel kontrolünü kaybeder.",
          ],
          records: [
            "PMS rapor",
          ],
        },
        {
          title: "Soğutma suyu sistemi bakımı",
          purpose:
            "LT/HT FW devrelerinin chemical treatment + heat exchanger temizliği.",
          procedure: [
            "Nitrite, pH, chloride haftalık test.",
            "CIP 6 ayda bir.",
          ],
          regulations: [
            "Engine maker manuals",
          ],
          safety: [
            "CIP kimyasalları için PPE.",
          ],
          records: [
            "Cooling water test log",
          ],
        },
        {
          title: "Atık yağ yönetimi",
          purpose:
            "Sludge → slop → incinerator/shore ile MARPOL Ek I uyum.",
          procedure: [
            "Sludge tank günlük sounding.",
            "Incinerator MARPOL Ek VI Reg. 16.",
            "Shore receipt al.",
            "ORB I — Code C, I.",
          ],
          regulations: [
            "MARPOL Annex I Reg. 17",
            "MARPOL Annex VI Reg. 16",
          ],
          safety: [
            "Incinerator flame-failure trip.",
          ],
          records: [
            "ORB I",
            "Reception receipt",
          ],
        },
        {
          title: "MARPOL uyum kontrolü ve raporlama",
          purpose:
            "Ek I/IV/V/VI kayıtlarının ve sertifikaların güncel tutulması.",
          procedure: [
            "ORB I/II, GRB, IOPP, IAPP doğrula.",
            "DCS/MRV yıllık raporlama.",
          ],
          regulations: [
            "MARPOL tüm ekler",
          ],
          safety: [
            "Eksik sertifika detention.",
          ],
          records: [
            "ORB I/II, GRB",
            "IOPP/IAPP/IEEC certificates",
          ],
        },
        {
          title: "Steering gear bakımı ve testi",
          purpose:
            "SOLAS V/26 + class rules ile main + emergency steering testi.",
          procedure: [
            "Departure öncesi 12 saat içinde test.",
            "Emergency steering yıllık.",
            "Hidrolik cleanliness ISO 4406.",
          ],
          regulations: [
            "SOLAS V/26",
          ],
          safety: [
            "Hidrolik enjeksiyon yaralanması.",
          ],
          records: [
            "Steering Gear Test Log",
          ],
        },
        {
          title: "Kompresör ve hava sistemi bakımı",
          purpose:
            "30 bar starting + 7 bar control air sistemi bakımı.",
          procedure: [
            "Drain her vardiya.",
            "Intercooler temizliği.",
            "Safety valve kalibre.",
          ],
          regulations: [
            "Class Rules — Pressure vessels",
          ],
          safety: [
            "Compressed air injection riski.",
          ],
          records: [
            "Air bottle inspection",
          ],
        },
        {
          title: "Yakıt separator ve filtre bakımı",
          purpose:
            "Purifier + filter bakımı ile fuel cleanliness.",
          procedure: [
            "Disc stack 1500-2000 saatte bir.",
            "Gravity disc seçimi.",
            "Auto-back flush filter ΔP alarm.",
          ],
          regulations: [
            "ISO 8217",
          ],
          safety: [
            "Hot HFO splash; face shield.",
          ],
          records: [
            "Purifier overhaul report",
          ],
        },
        {
          title: "Kazan ve ısı sistemi bakımı",
          purpose:
            "Auxiliary boiler + EGB bakımı.",
          procedure: [
            "Daily blow-down.",
            "Soot blowing.",
            "Safety valve test yıllık.",
            "Water analysis pH/hardness.",
          ],
          regulations: [
            "Class Rules — Boilers",
          ],
          safety: [
            "Soot fire patlama riski.",
          ],
          records: [
            "Boiler water test log",
          ],
        },
        {
          title: "Makine dairesi yangın söndürme sistemi kontrolü",
          purpose:
            "Sabit CO2/foam sistemi + portable + fire damper testi.",
          procedure: [
            "Yıllık görsel + weight check.",
            "5 yıllık release line test.",
            "Foam concentrate analizi yıllık.",
          ],
          regulations: [
            "SOLAS II-2",
            "MSC/Circ.1318",
          ],
          safety: [
            "CO2 release sonrası ER lockout.",
          ],
          records: [
            "Fixed FFA service report",
          ],
        },
        {
          title: "PMS kayıtları",
          purpose:
            "Class onaylı PMS ile ER ekipman takibi.",
          procedure: [
            "Aylık overdue raporu.",
            "Critical equipment Master onayı.",
          ],
          regulations: [
            "Class PMS approval",
            "ISM Element 10",
          ],
          safety: [
            "Critical overdue major NC.",
          ],
          records: [
            "PMS rapor",
          ],
        },
        {
          title: "Emisyon takibi (CII/SEEMP)",
          purpose:
            "Yıllık CII ratingi takibi + SEEMP Part III revizyonu.",
          procedure: [
            "Daily fuel + distance log.",
            "Speed optimization, hull cleaning.",
            "Annual CII statement.",
          ],
          regulations: [
            "MARPOL Annex VI Reg. 26-28",
          ],
          safety: [
            "D/E rating 3 yıl üst üste plan zorunlu.",
          ],
          records: [
            "SEEMP Part I/II/III",
            "CII Statement",
          ],
        },
        {
          title: "Ballast su arıtma sistemi (BWTS) operasyonu",
          purpose:
            "BWM Convention D-2 standardına uygun balast suyu işleme.",
          procedure: [
            "BWTS pre-flow test.",
            "TRO/UV doz izleme.",
            "BWRB doldur.",
          ],
          regulations: [
            "BWM Convention",
            "USCG VGP",
          ],
          safety: [
            "Electrochlorination'da H2 birikimi.",
          ],
          records: [
            "Ballast Water Record Book",
          ],
        },
      ],
    },
  ],
};
