import type { ShipType } from "./types";
import image from "@/assets/ships/operation-container.svg";

export const konteyner: ShipType = {
  id: "konteyner",
  label: "Konteyner",
  description: "Konteyner gemilerinde güverte ve makine departmanı operasyonları",
  emoji: "📦",
  image,
  color: "from-blue-500/20 to-cyan-500/10",
  departments: [
    {
      id: "guverte",
      label: "Güverte",
      operations: [
        {
          title: "ECDIS passage plan girişi ve back-up ECDIS doğrulaması",
          purpose:
            "Berth-to-berth seyir planının onaylı ENC'ler üzerinde dijital olarak hazırlanması ve yedek ECDIS'in birincil ile aynı verilere sahip olduğunun teyidi.",
          procedure: [
            "ENC kataloğunu IHO S-63 lisansına göre güncelle (AIO, T&P bildirileri dahil).",
            "Route planner ile waypoint'leri gir; XTD, safety contour, safety depth ve shallow contour değerlerini gemi draftı + UKC'ye göre ayarla.",
            "Check route fonksiyonunu çalıştır; alarm/uyarıları (no-go area, shallow water, prohibited area) tek tek değerlendir.",
            "Master onayı için Passage Plan'ı yazdır/dijital imzala.",
            "Back-up ECDIS'e ENC'leri ve route'u senkronize et; aynı safety parametreleriyle check route tekrar koş.",
            "GPS, gyro ve log girişlerinin her iki ECDIS'te de doğru göründüğünü doğrula.",
          ],
          regulations: [
            "SOLAS V/19.2.10 — ECDIS taşıma zorunluluğu",
            "SOLAS V/27 — Güncel haritalar ve yayınlar",
            "IMO Res. A.893(21) — Voyage Planning",
            "IHO S-52 / S-63 — ECDIS ekran ve veri koruma standartları",
          ],
          safety: [
            "Sadece birincil ECDIS'e güvenme; back-up ECDIS aynı anda paralel çalışmalı.",
            "Auto-route tarafından üretilen yolu manuel kontrol etmeden onaylama.",
          ],
          records: [
            "Passage Plan formu (Master onaylı)",
            "ECDIS chart correction log",
            "Deck Log — passage plan onay saati",
          ],
        },
        {
          title: "Berth-to-berth passage planı hazırlama (SOLAS V/34 uyumlu)",
          purpose:
            "Yanaşma yerinden bir sonraki yanaşma yerine kadar tüm seyrin appraisal-planning-execution-monitoring 4 aşamasında belgelenmesi.",
          procedure: [
            "Appraisal: Sailing Directions, Tide Tables, Routeing Charts, NP100 Mariner's Handbook ve şirket Company Standing Orders'ı topla.",
            "Planning: Waypoint'leri büyük ölçekli haritalarda işaretle; no-go area, abort point, contingency anchorage belirle.",
            "Execution: Bridge team brifingi yap; pilot card ve master/pilot exchange formu hazırla.",
            "Monitoring: Position fix aralıklarını (open sea 1 saat, coastal 15 dk, pilotage sürekli) plana yaz.",
            "Tüm rotayı kağıt ve ECDIS üzerinde paralel olarak işaretle (tek katmana güvenme).",
            "Plan'ı tüm vardiya zabitlerine imzalattır.",
          ],
          regulations: [
            "SOLAS Reg. V/34 — Safe Navigation",
            "STCW Code A-VIII/2 Part 4-1",
            "IMO Res. A.893(21) — Guidelines for Voyage Planning",
          ],
          safety: [
            "No-go area'lar her zaman draftı + UKC + squat + heel reserve'i kapsamalı.",
            "Pilotage bölgesinde abort point ve point of no return mutlaka tanımlı olmalı.",
          ],
          records: [
            "Passage Plan checklist (Appraisal/Planning/Execution/Monitoring)",
            "Master/Pilot Information Exchange formu",
            "Bridge Team brifing kaydı",
          ],
        },
        {
          title: "Bay planı (stowage plan) inceleme ve Chief Officer onayı",
          purpose:
            "Yükleme öncesi bay/row/tier sistemi ile her konteynerin yerleşimini planlayarak stabilite, lashing ve liman sıralaması açısından uygun olduğunu doğrulamak.",
          procedure: [
            "Planner'dan gelen pre-stow planı CASP/MACS3 vb. yazılıma yükle.",
            "Her bay için ağırlık dağılımını (heavy below light) ve VCG'yi kontrol et.",
            "Discharge port sıralamasına göre over-stow olmadığını doğrula.",
            "Reefer plug pozisyonlarının power panel kapasitesiyle uyumunu kontrol et.",
            "DG segregation tablosuna göre IMDG yüklerin uygun bay'lere yerleştirildiğini gör.",
            "Chief Officer onayını al; final stowage plan'ı agent ve terminale geri gönder.",
          ],
          regulations: [
            "CSS Code (Cargo Stowage and Securing)",
            "SOLAS VI/5 — Yük yerleşimi ve güvenliği",
            "IMO MSC.1/Circ.1353 — CSM (Cargo Securing Manual)",
          ],
          safety: [
            "VCG yüksek konteynerlerin (boş + üst tier) parametric rolling riskini artırdığını unutma.",
            "Stack weight limit (örn. 100 t/40' stack) aşılmamalı.",
          ],
          records: [
            "Onaylı Stowage Plan (PDF + EDI)",
            "Stability/SF/BM çıktısı",
            "Reefer manifest",
          ],
        },
        {
          title: "Lashing planı doğrulama — twistlock, lashing rod ve bridge fitting kontrolü",
          purpose:
            "CSM'e göre stack başına gerekli twistlock, lashing rod, turnbuckle ve bridge fitting'lerin doğru yerleştirilmesini ve gerginliğini kontrol etmek.",
          procedure: [
            "Cargo Securing Manual (CSM) tablolarından bay/tier'a göre gerekli lashing patternini çıkar.",
            "Semi-automatic twistlock'ların (SATL) tam kilitlendiğini görsel ve sesli kontrol et.",
            "Lashing rod uçlarındaki turnbuckle'ları torque key veya tipik el-sıkma yöntemiyle gerdir (over-tightening yapma).",
            "Bridge fitting'lerin (40' over 20') doğru oturduğunu kontrol et.",
            "Heavy weather öncesi rounds'da lashing'leri yeniden kontrol planını oluştur.",
          ],
          regulations: [
            "IMO MSC.1/Circ.1353/Rev.2 — CSM revize kılavuzu",
            "CSS Code Annex 14",
          ],
          safety: [
            "Lashing kontrolü sırasında düşen twistlock riski için baret zorunlu.",
            "Yüksek tier'lara erişim için kafes/onaylı erişim platformu kullan.",
          ],
          records: [
            "Lashing inspection log",
            "Pre-departure lashing checklist (Chief Officer imzalı)",
          ],
        },
        {
          title: "IMDG Code Dangerous Goods manifest ve segregasyon kontrolü",
          purpose:
            "Tehlikeli yüklerin sınıflarına göre IMDG segregation tablosuna uygun yerleştirilmesini ve manifestonun doğruluğunu garantilemek.",
          procedure: [
            "DG manifesto'yu UN no, PSN, sınıf, packing group ve EmS bazında kontrol et.",
            "IMDG Vol.1 segregation table'a göre 'away from / separated from / separated by complete compartment' uzaklıklarını uygula.",
            "On-deck/under-deck stowage gereksinimlerini doğrula.",
            "Reefer DG (örn. UN 1845 CO2 solid) için ek havalandırma şartını kontrol et.",
            "DOC of Compliance for Carriage of Dangerous Goods'un geçerli olduğunu teyit et.",
          ],
          regulations: [
            "IMDG Code (Amendment 41-22 ve sonrası)",
            "SOLAS II-2/19 — DG carriage requirements",
            "MARPOL Annex III",
          ],
          safety: [
            "EmS (Emergency Schedule) ve MFAG (Medical First Aid Guide) tüm DG için bridge'de hazır olmalı.",
            "DG container'lara muster list'te yangın ekibi briefing'i verilmeli.",
          ],
          records: [
            "DG Manifest (IMO FAL 7)",
            "DG stowage list",
            "Segregation conflict raporu (varsa)",
          ],
        },
        {
          title: "Reefer konteyner set-point, supply air sıcaklık ve alarm takibi",
          purpose:
            "Soğutmalı konteynerlerin yük tipine göre belirlenen set-point'te tutulmasını ve sapma alarmlarının zamanında giderilmesini sağlamak.",
          procedure: [
            "Reefer manifest'ten her konteynerin set-point ve ventilation (CFM) değerini al.",
            "Power-on sonrası supply ve return air sıcaklıklarını kayıt et (4 saatte bir minimum).",
            "USDA cold treatment yükleri için probe data logger sıcaklıklarını kontrol et.",
            "Alarm gelen üniteyi reefer engineer ile birlikte muayene et; gerekirse plug değiştir.",
            "Vardiya bitiminde reefer log'unu Chief Officer'a teslim et.",
          ],
          regulations: [
            "ISO 1496-2 — Thermal containers",
            "USDA APHIS cold treatment protocols",
          ],
          safety: [
            "Reefer plug girip çıkarmadan önce panelden enerjiyi kes (lock-out/tag-out).",
            "Yüksek dB alarm bölgesinde kulak koruyucu kullan.",
          ],
          records: [
            "Reefer Temperature Log (4-hourly)",
            "Reefer alarm/repair log",
          ],
        },
        {
          title: "OOG/ODC (Out-of-Gauge) konteyner özel lashing planı",
          purpose:
            "Standart ölçü dışındaki yüklerin (uzun, geniş, yüksek) ek lashing, anti-tip ve clearance kontrolü ile emniyetli taşınması.",
          procedure: [
            "OOG ölçülerini (over-length, over-width, over-height) bay planı üzerinde işaretle.",
            "Komşu konteyner stack'leri ile clearance'ı ölç.",
            "Ek lashing rod, wire ve shackle pattern'ini CSM'e göre planla.",
            "Yükleme öncesi terminal ile özel ekipman (spreader, slings) koordinasyonu yap.",
            "Sea fastening tamamlandıktan sonra fotoğrafla ve Chief Officer onayını al.",
          ],
          regulations: [
            "CSS Code Annex 13 — Special cargo",
            "IMO MSC.1/Circ.1353/Rev.2",
          ],
          safety: [
            "OOG yüklerin yanında çalışırken sıkışma/devrilme riski yüksek.",
            "Heavy weather'da rota ayarı (course/speed change) gerekebilir.",
          ],
          records: [
            "OOG securing plan (çizim + foto)",
            "Pre-departure inspection raporu",
          ],
        },
        {
          title:
            "Yükleme/boşaltma öncesi stability booklet uyumlu GM hesabı ve SF/BM limitleri",
          purpose:
            "Her yükleme/boşaltma kondisyonunun intact stability ve hull strength limitleri içinde kaldığını doğrulamak.",
          procedure: [
            "Loading computer'a tüm konteyner ağırlıklarını, ballast ve yakıt durumunu gir.",
            "GM, KM, KG ve free surface correction'ı kontrol et.",
            "IMO Intact Stability Code (IS Code 2008) area kriterlerini doğrula (e0-30°, e0-40°, GZ max).",
            "Shear Force ve Bending Moment'ı sea ve harbour limitleri içinde tut.",
            "Final condition raporunu yazdır ve Chief Officer/Master imzala.",
          ],
          regulations: [
            "IS Code 2008 (IMO Res. MSC.267(85))",
            "SOLAS II-1 Part B-1",
          ],
          safety: [
            "Free surface effect'i unutma (özellikle slack tank'lar).",
            "Negative GM riskini her ara kondisyonda kontrol et.",
          ],
          records: [
            "Loading Computer çıktısı (her kondisyon)",
            "Stability statement (Master imzalı)",
          ],
        },
        {
          title: "Pilot embarkation/disembarkation prosedürü (SOLAS V/23)",
          purpose:
            "Kılavuzun gemiye güvenli alınması ve indirilmesi için pilot ladder, combination ladder ve aydınlatma standartlarının uygulanması.",
          procedure: [
            "Pilot boarding station'ı en az 1 saat önce hazırla.",
            "Pilot ladder'ı SOLAS V/23 ve IMO Res. A.1045(27)'ye göre kontrol et (max 9 m, certified).",
            "Combination ladder gerekiyorsa accommodation ladder ile uygun şekilde birleştir.",
            "Manrope, life buoy with self-igniting light, heaving line ve VHF haberleşmesi hazır olsun.",
            "Pilot geldiğinde responsible officer karşılayıp bridge'e refakat etsin.",
            "Pilot ayrıldıktan sonra ekipmanı stow et.",
          ],
          regulations: [
            "SOLAS V/23 — Pilot transfer arrangements",
            "IMO Res. A.1045(27) — Pilot transfer",
            "IMPA Pilot Ladder poster",
          ],
          safety: [
            "Eksik basamak, hasarlı spreader veya yanlış kurulmuş pilot ladder ölümcül kazaya yol açar.",
            "Gece operasyonunda yeterli aydınlatma şart.",
          ],
          records: [
            "Pilot ladder inspection checklist (her kullanım öncesi)",
            "Deck Log — pilot on/off saati",
          ],
        },
        {
          title: "Berthing ve unberthing manevrası (tug/mooring boat koordinasyonu)",
          purpose:
            "Pilot ile birlikte römorkör ve palamar botlarının koordineli kullanımıyla yanaşma/ayrılma manevrasının emniyetle tamamlanması.",
          procedure: [
            "Master/Pilot exchange'de manevra planını netleştir (which side alongside, tug positions).",
            "Forward/aft station'ları manned hale getir; VHF kanallarını teyit et.",
            "Tug line'ları onaylı tow point'lerden bağla (panama chock + bitt).",
            "Heaving line ile palamar at; eye splice'ları bollard'a bind.",
            "Mooring sırası: head line, breast line, spring (forward/aft).",
            "All fast sonra gangway, shore power ve fender pozisyonu kontrol et.",
          ],
          regulations: [
            "MEG4 — OCIMF Mooring Equipment Guidelines",
            "ISM Code Element 7",
          ],
          safety: [
            "Snap-back zone'larda kimse durmamalı.",
            "Tug line eye splice'ı çift bollard'a sarılmalı, sürtünme noktası yağlanmalı.",
          ],
          records: [
            "Mooring plan (MEG4 uyumlu)",
            "Tug usage log",
            "Bell book / engine movement book",
          ],
        },
        {
          title: "Anchoring ve weighing anchor operasyonu",
          purpose:
            "Demir atma ve alma operasyonunun zincir uzunluğu, yedirme ve windlass kontrolü ile güvenli yapılması.",
          procedure: [
            "Anchorage plan'ı hazırla: derinlik, swinging circle, holding ground, hava şartları.",
            "Brake band ve windlass'ı önceden test et.",
            "Anchor party PPE ile forward'da hazır olsun (göz koruma şart).",
            "Master komutuyla demir let go; shackle sayımını VHF ile bridge'e bildir.",
            "Brought-up sinyali (chain leading, going slack-tight cycle) gözlemlendiğinde 'brought up' raporu ver.",
            "Vira komutunda windlass current ve hız limitlerini aşma; up & down → aweigh → clear anchor sırasıyla raporla.",
          ],
          regulations: [
            "MEG4 Section 8 — Anchoring",
            "ICS Bridge Procedures Guide",
          ],
          safety: [
            "Vira sırasında zincir koparsa flying chain ölümcüldür — anchor party güvenli alanda dursun.",
            "Yüksek hava şartlarında dragging anchor riskini sürekli izle (GPS anchor watch).",
          ],
          records: [
            "Anchor Log (let go, brought up, position, scope)",
            "Bell book",
          ],
        },
        {
          title: "Mooring ve unmooring operasyonu (fore, aft ve spring lines)",
          purpose:
            "Geminin iskeleye/şamandıraya MEG4 standartlarına uygun şekilde fore/aft/spring/breast hatlarıyla bağlanması ve emniyetle çözülmesi.",
          procedure: [
            "Mooring plan'a göre line types ve number'ı belirle.",
            "Tüm mooring rope'ların MBL/LDBF içindeki tail'lerle eşleştiğini kontrol et.",
            "Bollard'a sarmadan önce eye'ı 'dipping the eye' tekniğiyle yerleştir.",
            "Winch'leri auto-tension yerine brake-on modda tut (snap-back riski azaltır).",
            "Tide ve draft değişimini izleyerek 12 saatte bir tension ayarı yap.",
            "Unmooring'de single-up sırasını Master/Pilot ile koordine et.",
          ],
          regulations: [
            "OCIMF MEG4",
            "SOLAS II-1 Reg. 3-8 (Towing & Mooring equipment)",
          ],
          safety: [
            "Mooring rope tail'leri (Tonsberg shackle ile bağlı) mutlaka MBL'in %125-130'u civarında olmalı.",
            "Snap-back zone şeritleri görünür olmalı, ancak güvenli bölge sağlamaz — sadece farkındalık yaratır.",
          ],
          records: [
            "Mooring inspection record (her line için yıllık)",
            "Mooring Log",
          ],
        },
        {
          title: "Port State Control (PSC) denetim hazırlığı — deficiency kapatma takibi",
          purpose:
            "Liman devleti müfettişine sunulacak belgelerin ve gemi kondisyonunun MOU rejimleri (Paris, Tokyo) standartlarında hazır olması.",
          procedure: [
            "Statütüer sertifikaları (SMC, DOC, ISSC, MLC, IOPP, IAPP, IEEC) güncelliğini kontrol et.",
            "Önceki PSC raporlarındaki deficiency'lerin kapatma kanıtlarını dosyala.",
            "Drill schedule (yangın, abandon ship, MOB) son 1 ay kayıtlarını hazır tut.",
            "ER, mooring deck, lifeboat, bridge ve galley'i ön-denetimden geçir.",
            "Inspector geldiğinde escort officer atayın; soruları sadece yetkili personel yanıtlasın.",
          ],
          regulations: [
            "Paris MoU / Tokyo MoU PSC procedures",
            "IMO Res. A.1155(32) — PSC Procedures",
          ],
          safety: [
            "Detention konusu 'failure of ISM' veya 'serious safety' bulgularıdır — özellikle bunlara odaklan.",
          ],
          records: [
            "PSC önceki raporlar dosyası",
            "Internal pre-PSC checklist",
          ],
        },
        {
          title: "ISM Safety Management System (SMS) iç denetimi ve kayıtları",
          purpose:
            "ISM Code Element 12 gereği yıllık iç denetim ile SMS'in etkinliğinin doğrulanması ve düzeltici faaliyetlerin takibi.",
          procedure: [
            "Audit plan'ı DPA ile koordineli hazırla.",
            "Element bazında (1-16) checklist üzerinden objektif kanıt topla.",
            "Non-conformity (NC) ve observation'ları rapora işle.",
            "Düzeltici faaliyet (CAPA) için root cause analizi yap.",
            "Kapanan NC'ler için verification kanıtı dosyala.",
          ],
          regulations: [
            "ISM Code Element 12 — Company verification, review, evaluation",
            "IMO Res. A.1118(30) — Revised guidelines on ISM",
          ],
          safety: [
            "Tekrarlayan NC'ler systemic problem'i işaret eder — Master review'da ele al.",
          ],
          records: [
            "Internal Audit Report",
            "NC/CAPA log",
            "Master's Review of SMS (yıllık)",
          ],
        },
        {
          title: "Güverte vinçleri (deck crane), capstan ve windlass periyodik bakımı",
          purpose:
            "Yük kaldırma ve mooring ekipmanlarının class survey periyotlarına uygun şekilde greslenmesi, fonksiyon testi ve aşınma kontrolü.",
          procedure: [
            "PMS job order'a göre yağ seviyesi, gres noktaları ve kablo yumakları kontrol et.",
            "Brake test ve overload test (SWL %110) yıllık olarak Class gözetiminde yapılır.",
            "Wire rope için DNV/ABS aşınma kriterleri (broken wire, kink, corrosion) uygula.",
            "Windlass band brake gap'ini ölç ve gerekirse ayarla.",
            "Capstan motor akımını rated value ile karşılaştır.",
          ],
          regulations: [
            "ILO C152 — Occupational Safety in Dock Work",
            "Class Society Rules (DNV, ABS, LR, BV)",
          ],
          safety: [
            "Hidrolik basınç sökme öncesi kesinlikle boşaltılmalı.",
            "Kaldırma testlerinde alanı boşalt; SWL etiketi okunur olsun.",
          ],
          records: [
            "Crane Register / Lifting Appliance Register (Form 1, 2, 3)",
            "PMS job report",
          ],
        },
        {
          title: "Planned Maintenance System (PMS) — güverte ekipmanları takibi",
          purpose:
            "Class onaylı PMS yazılımı (AMOS, ShipManager, NS5) üzerinden tüm güverte ekipmanının periyodik bakım, spare ve sertifikasyon takibi.",
          procedure: [
            "Aylık olarak overdue job listesini çıkar; öncelik sırasına göre ata.",
            "Job tamamlandıkça findings, parts used ve running hours'ı sisteme işle.",
            "Critical equipment'ın (steering gear, pilot ladder, lifeboat) kayıtlarını ayrı flag'le.",
            "Spare parts minimum stok seviyesinin altına düşenler için requisition aç.",
            "Class survey öncesi PMS raporu hazırla.",
          ],
          regulations: [
            "Class PMS approval (örn. DNV-CG-0289)",
            "ISM Code Element 10",
          ],
          safety: [
            "Critical equipment'ın overdue kalması Class condition of class'a yol açar.",
          ],
          records: [
            "PMS aylık rapor",
            "Critical equipment log",
            "Spare parts inventory",
          ],
        },
        {
          title: "Shear force / bending moment (SF/BM) hesabı ve limit kontrolü",
          purpose:
            "Yükleme planının her aşamasında hull longitudinal strength'in sea ve harbour limitleri içinde kalmasını sağlamak.",
          procedure: [
            "Loading computer'a aktüel ağırlıkları gir (cargo, ballast, fuel, fresh water).",
            "Her frame'de SF ve BM değerlerini class onaylı limit envelope ile karşılaştır.",
            "Harbour kondisyonunda %100, sea kondisyonunda %100 sea limit'i geçme.",
            "Konteyner ağırlık tahmini ile gerçek VGM arasındaki farkı revize et (SOLAS VGM).",
            "Final raporu Master'a sun.",
          ],
          regulations: [
            "IACS UR S11 — Longitudinal Strength",
            "SOLAS VI/2 — VGM verification",
          ],
          safety: [
            "Limit aşımı hull stress kırılmasına yol açabilir (örn. MOL Comfort vakası).",
          ],
          records: [
            "Loading Computer SF/BM raporu",
            "VGM declaration (terminal)",
          ],
        },
        {
          title: "Meteoroloji ve heavy weather avoidance — rota optimizasyonu",
          purpose:
            "Voyage süresince hava ve dalga tahminlerine göre rota değişikliği yaparak yapısal hasar, parametric rolling ve cargo loss riskini azaltmak.",
          procedure: [
            "Routing service (StormGeo, AWT, WNI) ile günlük rota güncellemesi al.",
            "Significant wave height, swell direction ve wind force'u plana işle.",
            "Synchronous/parametric rolling olasılığını encounter wave period ile değerlendir.",
            "Master onayıyla course/speed değişikliği yap; deck log ve voyage report'a işle.",
            "Heavy weather prosedürünü (extra lashing, secure loose items) uygula.",
          ],
          regulations: [
            "MSC.1/Circ.1228 — Avoidance of dangerous situations in adverse weather",
            "SOLAS V/31 — Danger messages",
          ],
          safety: [
            "Container ship'ler için parametric rolling kritik — encounter period ≈ 0.5×Tn olduğunda dikkat.",
          ],
          records: [
            "Weather routing reports",
            "Deck Log — course/speed change",
            "Heavy weather damage report (varsa)",
          ],
        },
        {
          title: "STCW Reg. VIII/2 uyumlu OOW bridge watch tutma",
          purpose:
            "Watchkeeping standartlarına göre bridge'de seyir, anti-collision, position fixing ve haberleşmenin sürekliliğinin sağlanması.",
          procedure: [
            "Vardiya teslimi 'taking over the watch' standart cümleleriyle yapılır.",
            "Position fix aralıkları (open sea / coastal / pilotage) plana göre işle.",
            "ARPA ile target acquisition ve CPA/TCPA değerlendirmesi yap.",
            "BNWAS aktif tut; lookout ile birlikte vardiya.",
            "Master'ı çağırma kriterlerini (visibility, traffic, equipment failure) uygula.",
          ],
          regulations: [
            "STCW Reg. VIII/2 + Code A-VIII/2",
            "COLREG Rule 5 (Look-out), Rule 7 (Risk of collision)",
          ],
          safety: [
            "Lookout, vardiya zabiti ile aynı kişi olamaz (gece veya kötü görüş).",
          ],
          records: [
            "Bridge Log Book",
            "Compass error book",
            "BNWAS test record",
          ],
        },
        {
          title: "Notices to Mariners (NtM) ile ECDIS/kağıt harita tashihleri",
          purpose:
            "Haftalık UKHO/NGA NtM bildirilerine göre haritaların güncel tutulması ve T&P notice'ların plana işlenmesi.",
          procedure: [
            "Haftalık NtM dosyasını (PDF + ENC update) e-posta veya Chartco üzerinden indir.",
            "Etkilenen kağıt haritalara violet ink ile düzeltmeyi uygula; tracing yapıştır.",
            "ECDIS'e ENC update'i yükle; system log'unu yazdır.",
            "T&P (Temporary & Preliminary) notice'ları ayrı listede tut, voyage planning'de kullan.",
            "Chart correction log'a düzeltilen NtM no'larını işle.",
          ],
          regulations: [
            "SOLAS V/27",
            "IHO S-63 ENC data protection scheme",
          ],
          safety: [
            "Outdated chart kullanımı major detention sebebidir.",
          ],
          records: [
            "Chart Correction Log",
            "ENC update history print-out",
          ],
        },
        {
          title: "AIS transponder, GMDSS (EPIRB, SART, VHF, MF/HF) test ve kontrol",
          purpose:
            "GMDSS sea area gereksinimlerine göre haberleşme cihazlarının günlük/haftalık/aylık testlerinin yapılması.",
          procedure: [
            "Günlük: VHF DSC self test, battery voltage, printer paper.",
            "Haftalık: MF/HF DSC test çağrısı (coast station ile), reserve source of energy.",
            "Aylık: EPIRB (NOT distress mode), SART, two-way VHF self test.",
            "Yıllık: Shore-based maintenance certificate (A3/A4 alanlar için).",
            "AIS static/dynamic data'yı kontrol et (MMSI, IMO, callsign, draft, destination, ETA).",
          ],
          regulations: [
            "SOLAS IV — Radiocommunications",
            "IMO Res. A.1106(29) — AIS Guidelines",
          ],
          safety: [
            "EPIRB'i test ederken distress sinyali yollamamak için manual'e göre dedicated test mode kullan.",
          ],
          records: [
            "GMDSS Radio Log",
            "EPIRB/SART monthly test record",
          ],
        },
        {
          title: "Mooring rope, fender, heaving line ve güverte bağlama ekipmanı bakımı",
          purpose:
            "Mooring sisteminin tüm bileşenlerinin MEG4 line management plan'ına göre inspeksiyon, retirement ve değişim takibinin yapılması.",
          procedure: [
            "Her line için unique ID (örn. M1, M2) ile inspection card tut.",
            "MBL'in %75'i altında measured residual strength gösteren line retire edilir.",
            "Tail (synthetic) için yıllık görsel + 5 yıllık destructive test.",
            "Fender'ları (Yokohama, foam, pneumatic) basınç ve cover dikişi açısından kontrol et.",
            "Heaving line'ı 'monkey fist' ağırlığı ≤ 0.5 kg olacak şekilde kullan.",
          ],
          regulations: [
            "OCIMF MEG4 Section 4 (Line Management)",
            "ISO 2307 — Rope properties",
          ],
          safety: [
            "Aşınmış line snap-back accident'ın #1 sebebi.",
            "Heavy monkey fist ölümcül baş yaralanmalarına yol açar.",
          ],
          records: [
            "Line Management Plan + inspection card per line",
            "Fender register",
          ],
        },
        {
          title: "Ballast, servis ve yakıt tankları sounding — seyir defterine kayıt",
          purpose:
            "Tüm tank seviyelerinin günlük olarak alınması ve trim/stability kontrolü ile yakıt tüketim takibinin sağlanması.",
          procedure: [
            "08:00'de tank sounding (sounding tape, UTI, gauge) tüm sıvı tankları için yap.",
            "ROB (remaining on board) hesabı: HFO, MGO, LO, FW.",
            "Daily fuel consumption ME + AE + boiler ayrımıyla kaydet.",
            "Ballast condition'ı stability ile uyumlu tut.",
            "Noon report'a aktar.",
          ],
          regulations: [
            "MARPOL Annex VI Reg. 22A — Fuel Oil Consumption Data",
            "IMO DCS / EU MRV gereklilikleri",
          ],
          safety: [
            "Sounding pipe yanında düşen object riskine dikkat (ear/eye PPE).",
          ],
          records: [
            "Daily Tank Sounding Log",
            "Noon Report",
          ],
        },
        {
          title: "Cargo damage tespiti, letter of protest ve belgeleme",
          purpose:
            "Yükleme/boşaltma sırasında tespit edilen hasarların armatör çıkarını koruyacak şekilde tutanaklanması ve LoP düzenlenmesi.",
          procedure: [
            "Hasarı tarih, saat, konum (bay/row/tier), foto ve tanıkla belgele.",
            "Surveyor (P&I korespondan) talep et.",
            "Letter of Protest hazırla; karşı tarafa imzalı/karşı imzalı şekilde teslim et.",
            "Mate's Receipt'e remarks gir (örn. 'received in apparent good order EXCEPT...').",
            "Statement of Facts (SoF) ile zaman çizelgesi tutarlı olsun.",
          ],
          regulations: [
            "Hague-Visby Rules (Carrier responsibility)",
            "Charter Party clauses",
          ],
          safety: [
            "Imzasız LoP yine de delil olarak gönderilir; hiç vermemekten iyidir.",
          ],
          records: [
            "Letter of Protest dosyası",
            "Damage report + photos",
            "Statement of Facts",
          ],
        },
        {
          title: "Pre-arrival / pre-departure NAVTEX, NOA ve checklist uygulaması",
          purpose:
            "Limana varış öncesi 96/72/24 saatlik NOA'ların ve checklist'lerin doğru zamanda gönderilmesi ile yasal yükümlülüklerin karşılanması.",
          procedure: [
            "ETA hesabını NAVTEX, weather routing ve current ile güncelle.",
            "Agent'a NOA-96, NOA-72, NOA-24 gönder.",
            "ISPS pre-arrival security info-3 (Form B) hazırla.",
            "Pre-arrival checklist'i (engine, mooring, anchors, navigation) tamamla.",
            "Pilot booking saatini revize et.",
          ],
          regulations: [
            "ISPS Code Part A/B",
            "USCG NVIC (US için 96-hour NOA)",
            "EU Reporting Formalities Directive 2010/65",
          ],
          safety: [
            "Late NOA detention sebebi olabilir.",
          ],
          records: [
            "Pre-arrival/Pre-departure checklist",
            "NOA gönderim e-postaları",
          ],
        },
        {
          title: "Yangın, MOB ve abandon ship tatbikatları (SOLAS III/19 uyumlu)",
          purpose:
            "Mürettebatın acil durumlara hazır olmasını sağlamak için zorunlu drill periyotlarına göre tatbikatların yapılması.",
          procedure: [
            "Aylık fire drill ve abandon ship drill (her crew member 1 ayda 1 kez katılmalı).",
            "Yeni katılan personel için boarding'ten 24 saat içinde familiarisation.",
            "Lifeboat suya 3 ayda 1 kez indirilmeli (SOLAS III/19.3.3.3).",
            "Free-fall lifeboat için yıllık serbest düşüş veya simülasyon.",
            "Drill scenario, observations ve corrective actions raporlanır.",
          ],
          regulations: [
            "SOLAS III/19 — Emergency training and drills",
            "STCW A-VI/1",
          ],
          safety: [
            "Lifeboat indirme kazaları SOLAS III'ün en kritik konusu — hook release mekanizması test öncesi kilitli olmalı.",
          ],
          records: [
            "Drill Log",
            "Training Manual revize tarihi",
          ],
        },
        {
          title: "Muster list (station bill) güncelleme ve tatbikat organizasyonu",
          purpose:
            "Her crew change'de muster list'in güncellenip görünür yerlere asılması ve drillerin bu listeye göre yapılması.",
          procedure: [
            "Personnel change sonrası 24 saat içinde update et.",
            "Muster station, lifeboat assignment, fire team task'larını net yaz.",
            "Multilingual gemilerde working language ile sembolleri kullan.",
            "Bridge, ER ve accommodation main koridorlarda asılı tut.",
          ],
          regulations: [
            "SOLAS III/8 — Muster lists and emergency instructions",
          ],
          safety: [
            "Eksik veya outdated muster list panik yaratır.",
          ],
          records: [
            "Imzalı Muster List (revize tarihi ile)",
          ],
        },
        {
          title: "Deck log, Official Log Book ve voyage records doldurma",
          purpose:
            "Statütüer Official Log ve Deck Log defterlerinin günlük olarak ve standart formata uygun şekilde tutulması.",
          procedure: [
            "Deck Log'a her vardiya sonu position, course, speed, weather, events kayıt et.",
            "Official Log'a discipline, birth/death, drills, ROB ve crew change işle.",
            "Bell book'u manevra sırasında doldur.",
            "Garbage Record Book ve diğer MARPOL defterleri ayrı tut.",
          ],
          regulations: [
            "Flag State Merchant Shipping Act gereklilikleri",
            "MARPOL Annex V — Garbage Record Book",
          ],
          safety: [
            "Geriye dönük (back-dated) kayıt yasal sorun doğurur.",
          ],
          records: [
            "Deck Log Book",
            "Official Log Book",
            "Bell Book",
          ],
        },
      ],
    },
    {
      id: "makine",
      label: "Makine",
      operations: [
        {
          title: "Main engine standby hazırlığı — slow-down, manoeuvring mode geçişi",
          purpose:
            "Sea passage'dan manevraya geçişte ME'yi slow-steaming/critical RPM'lerden çıkararak manoeuvring fuel'a geçirmek ve full-away/standby protokolünü uygulamak.",
          procedure: [
            "ETA bridge'den alınınca 1-2 saat önce slow-down başlat.",
            "Main engine'i HFO'dan MGO'ya yavaş geçir (ECA içindeyse).",
            "Turbocharger ve scavenge air'i izle; slow-turning yap.",
            "Auxiliary blower'ları auto'ya al.",
            "Steering gear pump 2 motoru aç (SOLAS gereği).",
            "Standby telegraph'a geçilince bell book'u başlat.",
          ],
          regulations: [
            "SOLAS II-1 Reg. 29.3 — Steering gear (manevra için 2 power unit)",
            "MARPOL Annex VI — ECA fuel switching",
          ],
          safety: [
            "Hızlı fuel switch thermal shock yapabilir; ramping kullan.",
          ],
          records: [
            "Bell Book",
            "Engine Log",
            "Fuel changeover record",
          ],
        },
        {
          title: "Jeneratör (DG) yük dengeleme, senkronizasyon ve periyodik bakımı",
          purpose:
            "Yardımcı jeneratörlerin paralel çalışmada yük paylaşımının dengeli olmasını ve PMS bakımlarının zamanında yapılmasını sağlamak.",
          procedure: [
            "Senkronizasyon: voltage, frequency, phase angle ayarla; dim-light/synchroscope ile.",
            "Yük paylaşımını governor droop ayarı ile %±5 içinde dengele.",
            "DG çalışma saatlerine göre injector, valve clearance, T/C bakımı.",
            "Insulation resistance ölçümü 6 ayda bir.",
            "Black-out testi yıllık olarak class gözetiminde yapılır.",
          ],
          regulations: [
            "Class Rules — Electrical",
            "SOLAS II-1 Reg. 41-43",
          ],
          safety: [
            "Senkronizasyon sırasında yanlış faz açısı şaft kırılmasına yol açar.",
          ],
          records: [
            "DG Running Hours Log",
            "Insulation resistance log",
            "Black-out test report",
          ],
        },
        {
          title: "Bunkering operasyonu — yakıt kabulü, ullage ve ORB II kaydı",
          purpose:
            "ISGOTT/SOLAS gereği güvenli bunker transferi yapılması, miktar/kalite teyidi ve MARPOL Annex I uyumlu ORB I kaydı.",
          procedure: [
            "Pre-bunker meeting: barge surveyor + Chief Engineer + 2/E.",
            "Bunker safety checklist (24 madde) tamamlanır, manifold drip tray hazır.",
            "Tank initial soundings/ullages alınır, BDN kalite (sulphur, viskosite, density) kontrol edilir.",
            "Yavaş başlat (initial flow), tank shifting'leri planla, last 5% topping-up'ı el ile yap.",
            "Sample bottle (MARPOL sample) mühürlü saklanır (12 ay).",
            "Final ullage + temperature → metric ton hesabı.",
          ],
          regulations: [
            "MARPOL Annex VI Reg. 18 (BDN, sample)",
            "MARPOL Annex I Reg. 17 — ORB I",
            "ISGOTT 6th edition (varsa)",
          ],
          safety: [
            "Spill response equipment (SOPEP) hazır olmalı.",
            "Statik elektrik için bonding cable bağlı.",
          ],
          records: [
            "Bunker Delivery Note (BDN)",
            "ORB I (Code H — Bunkering)",
            "Sample retention log",
          ],
        },
        {
          title: "Fresh Water Generator (FWG) operasyonu ve tatlı su stoğu takibi",
          purpose:
            "Vakum altında deniz suyu evaporasyonu ile tatlı su üretimi ve günlük tüketim/üretim dengesinin korunması.",
          procedure: [
            "Sea suction temperature ≥ 50°C jacket water olduğunda devreye al.",
            "Salinometer < 10 ppm olduğunda diversion valve potable tank'a açılır.",
            "Liman içinde (kıyıdan 20 NM) çalıştırma — kontaminasyon riski.",
            "Plate exchanger temizliği 6 ayda bir asit + alkali ile.",
            "UV sterilizer ve mineralizer bakımı (içme suyu için).",
          ],
          regulations: [
            "WHO Guidelines for Drinking Water (potable)",
            "MLC 2006 Reg. 3.2 — Food and catering",
          ],
          safety: [
            "Limana yakın çalıştırılırsa kanalizasyon kontamine olabilir.",
          ],
          records: [
            "FW production log",
            "Potable water test (Legionella, bacterial)",
          ],
        },
        {
          title: "Bilge water separator (OWS) ile sintine suyu işleme ve ORB I kaydı",
          purpose:
            "ER bilge'ında biriken yağlı suyun MARPOL Annex I 15 ppm limitinin altına işlenip overboard verilmesi veya holding tank'a alınması.",
          procedure: [
            "Bilge holding tank'tan OWS feed pompası başlat.",
            "15 ppm OCM (Oil Content Meter) calibrated ve 3-way valve auto modda.",
            "Discharge sadece special area dışı + en route + > 12 NM from land şartında yapılır.",
            "Filter cartridge ve coalescer aşınma takibi.",
            "Operasyon sonu ORB I kayıtları: Code C, D, E.",
          ],
          regulations: [
            "MARPOL Annex I Reg. 14, 15, 17",
            "IMO Res. MEPC.107(49) — 15 ppm equipment",
          ],
          safety: [
            "Magic pipe/by-pass kullanımı kriminal suçtur (ABD APPS para cezaları milyon $).",
          ],
          records: [
            "Oil Record Book Part I",
            "OCM seal certificate",
          ],
        },
        {
          title: "LT/HT soğutma suyu sistemi bakımı ve antifreeze kontrolü",
          purpose:
            "Düşük ve yüksek sıcaklık fresh water cooling devrelerinin chemical treatment, expansion tank seviyesi ve heat exchanger temizliği ile sağlıklı tutulması.",
          procedure: [
            "Nitrite, pH, chloride değerlerini haftalık test et (örn. Unitor test kit).",
            "Aşırı nitrite drop bakteri kontaminasyonunu işaret eder.",
            "Plate cooler temizliği (CIP — clean in place) 6 ayda bir.",
            "Anti-freeze (glycol) sadece soğuk iklim/lay-up'ta gerekir.",
          ],
          regulations: [
            "Engine maker manuals (MAN, Wärtsilä)",
          ],
          safety: [
            "CIP kimyasalları için solunum koruyucu zorunlu.",
          ],
          records: [
            "Cooling water test log",
            "Chemical inventory",
          ],
        },
        {
          title: "Main air compressor ve control air compressor bakımı",
          purpose:
            "30 bar starting air ve 7 bar control air sistemlerinin valve, intercooler, drain ve safety valve bakımının yapılması.",
          procedure: [
            "Drain valve'ları her vardiya boşalt (otomatik olsa bile).",
            "Intercooler tüplerini periyodik temizle.",
            "Safety valve test cetveline göre kalibre et.",
            "Air bottle internal inspection (Class survey).",
          ],
          regulations: [
            "Class Rules — Pressure vessels",
            "SOLAS II-1 — Starting air requirements (12 ardışık start)",
          ],
          safety: [
            "Compressed air injection injury (jet) ölümcül olabilir.",
          ],
          records: [
            "Air bottle inspection certificate",
            "PMS job report",
          ],
        },
        {
          title: "Fuel oil separator (purifier), strainer ve filtre bakımı",
          purpose:
            "Yakıttan su, sediment ve katalitik fines'in ayrılması için purifier disc bakımı, gravity disc seçimi ve filtre değişimi.",
          procedure: [
            "Disc stack temizliği 1500-2000 saatte bir.",
            "Gravity disc'i fuel density ve sıcaklığa göre seç (manual chart).",
            "Sludge tank seviyesi takibi.",
            "Auto-back flush filter differential pressure alarm sınırı 0.5 bar.",
          ],
          regulations: [
            "ISO 8217 — Marine Fuel Standards",
            "Class survey requirements",
          ],
          safety: [
            "Hot HFO splash riski; PPE + face shield şart.",
          ],
          records: [
            "Purifier overhaul report",
            "Filter change log",
          ],
        },
        {
          title: "Ballast Water Treatment System (BWTS) operasyonu — BWM Convention kaydı",
          purpose:
            "Invasive species transferini önlemek için BWTS (UV veya electrochlorination) ile D-2 standardı ballast su işleme.",
          procedure: [
            "Ballast plan'ı BWM Plan'a göre hazırla.",
            "BWTS'i pre-flow test ile aktive et; flow rate ve TRO seviyesini izle.",
            "By-pass kullanımı sadece emergency'de + Flag bildirimi ile.",
            "Discharge port'ta sampling için access valve hazır olsun.",
            "BWRB (Ballast Water Record Book) doldur.",
          ],
          regulations: [
            "BWM Convention 2004 (yürürlük 2017)",
            "MEPC.300(72) — Implementing date",
            "USCG VGP / 33 CFR 151",
          ],
          safety: [
            "Electrochlorination'da hidrojen birikimi patlama riski; ventilation şart.",
          ],
          records: [
            "Ballast Water Record Book",
            "BWTS calibration certificate",
          ],
        },
        {
          title: "Reefer plug paneli ve soğutma (refrigerant) kompresör bakımı",
          purpose:
            "Reefer container plug panellerinin kontak/insulation testleri ve gemi soğutma kompresörlerinin refrigerant şarj/kontrolü.",
          procedure: [
            "Plug panel insulation resistance ölçümü.",
            "Loose connection ve overheat tracking.",
            "Refrigerant leak detection (electronic sniffer).",
            "F-gas (R134a, R404A) kayıtları MARPOL Annex VI Reg. 12 uyumlu.",
          ],
          regulations: [
            "MARPOL Annex VI Reg. 12 — Ozone-depleting substances",
            "EU F-gas Regulation 517/2014",
          ],
          safety: [
            "Refrigerant cilt teması frostbite yapar.",
          ],
          records: [
            "Refrigerant Record Book",
            "Reefer plug test log",
          ],
        },
        {
          title: "Bilge high-level alarm testi ve 15 ppm OWS alarm kalibrasyonu",
          purpose:
            "ER bilge well alarmlarının ve OCM 15 ppm cihazının fonksiyon testi ile kalibrasyonunun yapılması.",
          procedure: [
            "Aylık bilge high-level test (float lift veya simulation).",
            "15 ppm OCM annual seal kontrolü (mühür kırılmamalı).",
            "Bridge'e iletilen alarm doğrulanır.",
          ],
          regulations: [
            "MARPOL Annex I Reg. 14",
            "MEPC.107(49)",
          ],
          safety: [
            "Mühür kırık OCM port detention sebebidir.",
          ],
          records: [
            "Alarm test log",
            "OCM calibration certificate",
          ],
        },
        {
          title: "Sludge (atık yağ) yönetimi — slop tank, bertaraf ve ORB I kaydı",
          purpose:
            "Purifier ve drain tank'tan gelen sludge'ın slop tank'ta toplanıp incinerator veya shore reception facility'ye verilmesi.",
          procedure: [
            "Sludge tank seviyesini günlük sounding et.",
            "Incinerator çalıştırılırsa MARPOL Ek VI Reg. 16 sıcaklık ve emission limitleri.",
            "Shore discharge için reception facility receipt al.",
            "ORB I — Code C ve I.",
          ],
          regulations: [
            "MARPOL Annex I Reg. 17",
            "MARPOL Annex VI Reg. 16 — Shipboard incineration",
          ],
          safety: [
            "Incinerator yangını için flame-failure trip aktif.",
          ],
          records: [
            "ORB I",
            "Reception facility receipt",
          ],
        },
        {
          title: "Stern tube yağlama sistemi (lub oil / water-lubricated) kontrolü",
          purpose:
            "Şaft kuyruk borusu yağlama sisteminin sızıntı, sıcaklık ve yağ analizi ile sağlıklı çalışmasının doğrulanması.",
          procedure: [
            "Aft seal leakage'ı günlük kontrol et.",
            "Yağ analizini 3 ayda bir labratuvara gönder (water content, particle).",
            "Header tank seviyesi sabit tutulmalı.",
            "EAL (Environmentally Acceptable Lubricant) zorunluluğu (US VGP).",
          ],
          regulations: [
            "USCG VGP — EAL requirement",
            "Class Rules",
          ],
          safety: [
            "Aft seal failure su almaya yol açabilir.",
          ],
          records: [
            "Stern tube oil analysis report",
            "Leak monitoring log",
          ],
        },
        {
          title: "Fuel oil transferi ve trim/stability düzenlemesi",
          purpose:
            "Yakıt tanklarından servis ve settling tanklarına transfer ve trim/heel düzenlemesinin stability'ye etkisinin kontrolü.",
          procedure: [
            "Önce Chief Officer ile transfer planı koordine et (trim impact).",
            "Transfer pump çalıştırılır, valves line-up doğrulanır.",
            "Settling tank dolu işareti alındığında dur, drain ve heat.",
            "Free surface effect ve trim değişimini stability programa gir.",
          ],
          regulations: [
            "MARPOL Annex I Reg. 17",
          ],
          safety: [
            "Aşırı dolum / kaçak için sürekli refakat şart.",
          ],
          records: [
            "Fuel transfer log",
            "ORB I — internal transfer",
          ],
        },
        {
          title: "Exhaust gas cleaning system (EGCS/Scrubber) operasyon ve kayıt",
          purpose:
            "MARPOL Annex VI sulphur cap'ine alternatif olarak SOx scrubber ile emisyonu IMO 2020 0.5%/0.10% ECA limitine indirmek.",
          procedure: [
            "Open-loop / closed-loop / hybrid mode seçimi.",
            "Wash water pH, PAH, turbidity sensörlerini izle.",
            "ETM (Emission Technical Manual) ve OMM (Operations Manual) referansla.",
            "Wash water discharge yasakları (ECA, port-specific) takip edilir.",
          ],
          regulations: [
            "MARPOL Annex VI Reg. 14",
            "MEPC.340(77) — 2021 Guidelines for EGCS",
          ],
          safety: [
            "Caustic (NaOH) closed-loop'ta çalışıldığında PPE şart.",
          ],
          records: [
            "EGC Record Book",
            "Wash water monitoring log",
          ],
        },
        {
          title: "SEEMP/CII hesabı ve enerji verimliliği raporlaması",
          purpose:
            "Ship Energy Efficiency Management Plan kapsamında yıllık CII ratingi (A-E) ve EEXI uyumunun takibi.",
          procedure: [
            "Daily fuel + distance kayıtlarından yıllık CII hesapla.",
            "Rating C ve üzeri kalmak için speed optimization, hull cleaning, weather routing.",
            "SEEMP Part III (CII implementation plan) güncel tut.",
            "DCS verilerini Flag State'e yıllık sun.",
          ],
          regulations: [
            "MARPOL Annex VI Reg. 26-28 (CII, EEXI, SEEMP)",
            "MEPC.339(76)",
          ],
          safety: [
            "D/E rating 3 yıl üst üste corrective action plan zorunlu.",
          ],
          records: [
            "SEEMP Part I/II/III",
            "Annual CII statement",
          ],
        },
        {
          title:
            "Fixed CO₂ / foam fire fighting sistemi ve makine dairesi yangın önlemleri",
          purpose:
            "ER ve cargo space sabit yangın söndürme sistemlerinin SOLAS II-2 gereksinimlerine göre periyodik test ve service'inin yapılması.",
          procedure: [
            "Yıllık görsel ve weight check (CO2 cylinder %5 leakage limiti).",
            "5 yıllık release line blow-through ve hidrostatik test.",
            "Fire damper, quick-closing valve fonksiyon testi.",
            "Foam concentrate analizi yıllık (FFG/AFFF).",
          ],
          regulations: [
            "SOLAS II-2",
            "MSC/Circ.1318 — Fixed CO2 system maintenance",
          ],
          safety: [
            "CO2 release alarmı sonrası ER'a giriş yasak; lockout uygulanır.",
          ],
          records: [
            "Fixed FFA service report",
            "Foam analysis certificate",
          ],
        },
        {
          title: "Steering gear testi (main ve emergency) ve hydraulic bakımı",
          purpose:
            "SOLAS V/26 gereği limandan ayrılış öncesi 12 saat içinde steering gear testlerinin yapılması.",
          procedure: [
            "Main + auxiliary power unit, rudder angle göstergeleri, communication, alarm test.",
            "Emergency steering yıllık 1 kez gerçek koşulda test.",
            "Hydraulic oil cleanliness ISO 4406 kodu.",
            "Hunting (oscillation) varsa pump cam ayarı revize.",
          ],
          regulations: [
            "SOLAS V/26",
            "Class survey",
          ],
          safety: [
            "Hydraulic fitting'lerde yüksek basınç enjeksiyon yaralanması riski.",
          ],
          records: [
            "Steering Gear Test Log (departure)",
            "Emergency steering drill record",
          ],
        },
        {
          title:
            "PMS kayıtları, job order ve raporlama (maker's manual uyumlu)",
          purpose:
            "ER ekipmanının maker recommendation ve Class PMS approval'ına uygun olarak takip edilmesi.",
          procedure: [
            "Aylık overdue list raporla.",
            "Critical item job order'larına Master onayı.",
            "Spare parts requisition ile minimum stock korunsun.",
            "Class survey öncesi PMS rapor hazırla.",
          ],
          regulations: [
            "Class PMS Approval (DNV, ABS, LR)",
            "ISM Element 10",
          ],
          safety: [
            "Critical equipment overdue major NC sebebi.",
          ],
          records: [
            "PMS aylık rapor",
            "Job history",
          ],
        },
        {
          title: "Exhaust gas boiler (EGB) veya composite boiler bakımı ve kontrol",
          purpose:
            "ME exhaust ısısından buhar üreten EGB ve auxiliary boiler'ın water level, soot blower ve safety valve testleri.",
          procedure: [
            "Daily blow-down (water level, salinity).",
            "Soot blowing'i ME yük profiline göre planla; soot fire'a dikkat.",
            "Safety valve test yıllık.",
            "Water analysis (pH, hardness, P-alkalinity).",
          ],
          regulations: [
            "Class Rules — Boilers",
            "SOLAS II-1 — Boiler safety",
          ],
          safety: [
            "Soot fire ME exhaust manifold patlamasına yol açabilir.",
          ],
          records: [
            "Boiler water test log",
            "Safety valve test report",
          ],
        },
        {
          title: "Engine room watch keeping — UMS veya manned ER vardiyası",
          purpose:
            "Unattended Machinery Space (UMS) sertifikalı gemilerde alarm panelinin duty engineer'a aktarılması veya manned ER'da watchkeeping yapılması.",
          procedure: [
            "UMS dead-man alarm 30 dk içinde acknowledge edilmeli.",
            "Critical alarm ringing'de Engine Control Room'a hızla in.",
            "Ana parametreleri (jacket, exhaust, scavenge, lube) 4 saatte bir log et.",
            "Round'larda gözle, kulakla, kokuyla anomali ara.",
          ],
          regulations: [
            "STCW VIII/2 Part 4-2",
            "Class UMS/E0 notation",
          ],
          safety: [
            "ER'da yalnız çalışırken radio + dead man alarm aktif olmalı.",
          ],
          records: [
            "Engine Log Book",
            "Alarm/event printer log",
          ],
        },
        {
          title: "SOx / NOx emisyon ölçümü ve IMO MARPOL Ek VI raporlaması",
          purpose:
            "Yakıt sülfür içeriği ve NOx Tier I/II/III uyumunun BDN ve engine NOx file ile belgelenmesi.",
          procedure: [
            "BDN'de FO sülfür değerini global cap (0.50%) veya ECA (0.10%) ile karşılaştır.",
            "FONAR (Fuel Oil Non-Availability Report) gerekirse hazırla.",
            "Engine NOx Technical File ve EIAPP certificate güncel tut.",
            "EU MRV/IMO DCS yıllık raporlama.",
          ],
          regulations: [
            "MARPOL Annex VI Reg. 13, 14, 18",
            "EU MRV Regulation 2015/757",
          ],
          safety: [
            "ECA içinde yanlış fuel kullanımı yüksek para cezası.",
          ],
          records: [
            "BDN dosyası",
            "EIAPP certificate",
            "DCS / MRV annual report",
          ],
        },
      ],
    },
  ],
};
