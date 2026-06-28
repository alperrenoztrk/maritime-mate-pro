// Muster List (Rol Cetveli) — SOLAS Bölüm III / Kural 8 kapsamında her geminin
// bulundurması gereken acil durum görev cetveli. Her rütbenin acil durumdaki
// toplanma (muster) istasyonunu, dahil olduğu acil durum ekibini ve acil durum
// tipine göre görevlerini tanımlar.
//
// ÖNEMLİ: Genel alarm verildiğinde tüm personel can yeleğiyle MUSTER (toplanma)
// İSTASYONUNDA toplanır; yoklama alındıktan sonra ekipler görev yerlerine
// (köprüüstü, makine dairesi, olay yeri, filika istasyonu vb.) yönlendirilir.
// Bu nedenle toplanma istasyonu, kişinin çalıştığı bölge değil, ilk toplandığı
// yerdir. Yalnızca köprüüstü komuta/seyir ekibi doğrudan köprüüstünde toplanır.
//
// roleSlug ve rank değerleri src/data/crewHierarchy.ts ile birebir tutarlıdır;
// böylece her satır mevcut /crew/:roleSlug detay sayfasına bağlanabilir.

export type MusterEmergencyId = "general" | "fire" | "abandon" | "mob";

export type MusterEmergency = {
  id: MusterEmergencyId;
  title: string;
  signal: string;
  description: string;
};

export type MusterAssignment = {
  roleSlug: string;
  rank: string;
  /** Genel alarmda kişinin toplandığı yer (assembly/muster station). */
  musterStation: string;
  /** Yoklama sonrası dahil olduğu acil durum ekibi/görev grubu. */
  emergencyTeam: string;
  duties: { emergencyId: MusterEmergencyId; duty: string }[];
};

export const musterEmergencies: MusterEmergency[] = [
  {
    id: "general",
    title: "Genel Acil Durum",
    signal: "7 kısa + 1 uzun düdük/zil (en az 7 saniye)",
    description:
      "Tüm personelin can yeleğiyle atanmış toplanma (muster) istasyonuna gitmesi, yoklama alınması ve ekiplerin görev yerlerine yönlendirilmesi.",
  },
  {
    id: "fire",
    title: "Yangın",
    signal: "Sürekli zil/alarm + telsiz ve anons ile yangın yeri bildirimi",
    description:
      "Yangın söndürme ekiplerinin teşkili, sınırlama (boundary cooling) ve müdahale; sığınma bölgesinin korunması.",
  },
  {
    id: "abandon",
    title: "Gemiyi Terk",
    signal: "Kaptanın sözlü/telsiz emri (ayrı bir alarm işareti yoktur)",
    description:
      "Filika/can salı istasyonlarında toplanma, donanımın hazırlanması, telsiz/EPIRB/SART ve gemi terk malzemelerinin alınması.",
  },
  {
    id: "mob",
    title: "Denize Adam Düşmesi (MOB)",
    signal: "3 uzun düdük (Oscar / 'O' bayrağı), köprüüstüne anons",
    description:
      "Can simidi/duman işaretinin atılması, gözcülük, Williamson dönüşü ve kurtarma botu hazırlığı.",
  },
];

export const musterAssignments: MusterAssignment[] = [
  // ── Köprüüstü / Operasyon ───────────────────────────────────────────────
  {
    roleSlug: "kaptan",
    rank: "Kaptan (Master)",
    musterStation: "Köprüüstü",
    emergencyTeam: "Komuta Ekibi",
    duties: [
      { emergencyId: "general", duty: "Köprüüstünden genel komuta ve kontrolü üstlenir; durumu değerlendirir, yoklama raporlarını toplar ve kıyı/şirket bildirimlerini yönetir." },
      { emergencyId: "fire", duty: "Müdahaleyi köprüüstünden yönetir; manevra, havalandırma kapatma ve dış yardım (MAYDAY/PAN-PAN) kararı verir." },
      { emergencyId: "abandon", duty: "Gemiyi terk emrini verir; SSAS/MAYDAY, seyir defteri ve önemli evrakların alınmasını sağlar, son terk eden olur." },
      { emergencyId: "mob", duty: "Manevrayı (Williamson dönüşü) yönetir, kurtarma operasyonunu koordine eder ve telsiz bildirimini onaylar." },
    ],
  },
  {
    roleSlug: "birinci-zabit",
    rank: "Birinci Zabit (Chief Officer / C/O)",
    musterStation: "Muster İstasyonu",
    emergencyTeam: "Saha Komutanı (On-Scene Commander)",
    duties: [
      { emergencyId: "general", duty: "Muster istasyonunda toplanmayı ve yoklamayı yönetir, eksikleri köprüüstüne raporlar ve saha komutanlığını üstlenir." },
      { emergencyId: "fire", duty: "Yangın söndürme ekibinin saha komutanı; olay yerinde müdahale, sınırlama ve tahliye koordinasyonunu yürütür." },
      { emergencyId: "abandon", duty: "Filika/can salı istasyonlarının amiri; indirme hazırlığını ve yolcuların/personelin yerleştirilmesini denetler." },
      { emergencyId: "mob", duty: "Güvertede kurtarma botu hazırlığını ve kurtarma manevrasını sahada yönetir." },
    ],
  },
  {
    roleSlug: "ikinci-zabit",
    rank: "İkinci Zabit (Second Officer / 2/O)",
    musterStation: "Köprüüstü",
    emergencyTeam: "Komuta / Telsiz Ekibi (GMDSS)",
    duties: [
      { emergencyId: "general", duty: "Köprüüstünde seyir ve GMDSS sorumlusu; kayıt tutar, konum ve telsiz haberleşmesini hazırlar." },
      { emergencyId: "fire", duty: "Köprüüstünde haberleşme ve seyri yürütür; telsiz trafiğini ve olay kayıtlarını tutar." },
      { emergencyId: "abandon", duty: "DSC/MAYDAY mesajını gönderir, EPIRB/SART ve taşınabilir telsizlerin alınmasını sağlar." },
      { emergencyId: "mob", duty: "MOB butonu/konum işaretler, Williamson dönüşünü uygular ve haberleşmeyi yürütür." },
    ],
  },
  {
    roleSlug: "ucuncu-zabit",
    rank: "Üçüncü Zabit (Third Officer / 3/O)",
    musterStation: "Muster İstasyonu",
    emergencyTeam: "Can Kurtarma / Donanım Ekibi",
    duties: [
      { emergencyId: "general", duty: "Muster istasyonunda can yeleği kontrolünü yapar, yoklamaya katılır ve can kurtarma donanımını hazırlamak üzere görevlenir." },
      { emergencyId: "fire", duty: "Yangın söndürme ekibinde görev alır; nefeslik (BA) seti ve teçhizatın hazırlığından sorumludur." },
      { emergencyId: "abandon", duty: "Filika donanımını (mataforalar, halatlar, tıpa, motor) hazırlar ve indirme öncesi kontrolü yapar." },
      { emergencyId: "mob", duty: "Kurtarma botu donanımını hazırlar, simit/duman işaretini hazır tutar." },
    ],
  },
  {
    roleSlug: "dorduncu-zabit",
    rank: "Dördüncü Zabit (Fourth Officer / 4/O)",
    musterStation: "Muster İstasyonu",
    emergencyTeam: "Yoklama / Destek Ekibi",
    duties: [
      { emergencyId: "general", duty: "Muster istasyonunda yoklama listesini alır ve eksikleri saha komutanına bildirir." },
      { emergencyId: "fire", duty: "Yedek/destek ekibinde; hortum, taşınabilir tüp ve yangın dolaplarını olay yerine taşır." },
      { emergencyId: "abandon", duty: "Can salı ve gemi terk malzemelerinin (battaniye, su, ilkyardım) tam olduğunu doğrular." },
      { emergencyId: "mob", duty: "Gözcülük yapar, düşen kişiyi sürekli işaret eder ve köprüüstüyle iletişimi sürdürür." },
    ],
  },
  {
    roleSlug: "reis-bosun",
    rank: "Reis / Bosun",
    musterStation: "Muster İstasyonu",
    emergencyTeam: "Güverte Acil Müdahale Ekibi (Lider)",
    duties: [
      { emergencyId: "general", duty: "Muster istasyonunda güverte tayfasını toplar, yoklamaya yardımcı olur ve ekibi saha komutanının emrine sokar." },
      { emergencyId: "fire", duty: "Yangın saldırı ekibinin lideri; ilk müdahale hattını ve hortum donanımını yönetir." },
      { emergencyId: "abandon", duty: "Filika/salı indirme ekibini yönetir; matafora ve halat donanımını fiilen çalıştırır." },
      { emergencyId: "mob", duty: "Kurtarma botunu mürettebatla denize indirir ve botun amiri olarak operasyonu yürütür." },
    ],
  },
  {
    roleSlug: "ustagemici",
    rank: "Usta Gemici & Gemiciler (AB / OS)",
    musterStation: "Muster İstasyonu",
    emergencyTeam: "Güverte Acil Müdahale Ekibi",
    duties: [
      { emergencyId: "general", duty: "Muster istasyonunda can yeleğiyle toplanır ve güverte ekibinde göreve hazır bekler." },
      { emergencyId: "fire", duty: "Saldırı ekibinde hortum operatörü/nozül; sınırlama soğutması ve teçhizat taşıma." },
      { emergencyId: "abandon", duty: "Filika/salı indirme donanımını çalıştırır; halat, tıpa ve mataforalarla görev alır." },
      { emergencyId: "mob", duty: "Can simidi/duman işaretini atar, kurtarma botu kürekçisi/operatörü olarak görev yapar." },
    ],
  },
  {
    roleSlug: "guverte-stajyer",
    rank: "Güverte Stajyeri (Deck Cadet)",
    musterStation: "Muster İstasyonu",
    emergencyTeam: "Destek / Haberci",
    duties: [
      { emergencyId: "general", duty: "Muster istasyonunda yoklamaya katılır ve haberci (runner) görevi yapar." },
      { emergencyId: "fire", duty: "Yedek ekipte teçhizat taşır, hortum açar ve saha komutanına haber taşır." },
      { emergencyId: "abandon", duty: "Gemi terk malzemelerini taşır ve indirme ekibine yardım eder." },
      { emergencyId: "mob", duty: "Gözcü olarak düşen kişiyi işaret eder ve köprüüstüne bilgi taşır." },
    ],
  },

  // ── Makine / Teknik ─────────────────────────────────────────────────────
  {
    roleSlug: "bas-muhendis",
    rank: "Baş Mühendis (Chief Engineer)",
    musterStation: "Muster İstasyonu",
    emergencyTeam: "Makine Ekibi (Komuta)",
    duties: [
      { emergencyId: "general", duty: "Muster istasyonunda toplanır; makine ekibinin yoklamasını alır ve tahrik, yangın pompası, acil jeneratörün hazır olması için ekibi makine dairesine yönlendirir." },
      { emergencyId: "fire", duty: "Yakıt/havalandırma kapatma (quick-closing valf, fan stop) ve sabit söndürme (CO2/köpük) sistemini hazırlar." },
      { emergencyId: "abandon", duty: "Makineyi emniyetli durdurur; acil jeneratör ve yangın pompasının son ana kadar çalışmasını koordine eder." },
      { emergencyId: "mob", duty: "Manevra için makineyi köprüüstü emrine hazır tutar ve dümen/şaft tepkisini izler." },
    ],
  },
  {
    roleSlug: "ikinci-muhendis",
    rank: "İkinci Mühendis (Second Engineer)",
    musterStation: "Muster İstasyonu",
    emergencyTeam: "Makine Ekibi (Saha)",
    duties: [
      { emergencyId: "general", duty: "Muster istasyonunda toplanır ve baş mühendisin emrinde makine ekibine katılarak ekipman durumunu raporlar." },
      { emergencyId: "fire", duty: "Yangın pompalarını ve acil yangın pompasını çalıştırır; yakıt valflerini emniyete alır." },
      { emergencyId: "abandon", duty: "Makinenin emniyetli durdurulmasını uygular ve gerekli valfleri kapatır." },
      { emergencyId: "mob", duty: "Makineyi manevraya hazır tutar; baş mühendise destek olur." },
    ],
  },
  {
    roleSlug: "ucuncu-muhendis",
    rank: "Üçüncü/Dördüncü Mühendis",
    musterStation: "Muster İstasyonu",
    emergencyTeam: "Makine Ekibi",
    duties: [
      { emergencyId: "general", duty: "Muster istasyonunda toplanır ve makine ekibinde pompalar ile yardımcı sistemleri kontrol etmek üzere göreve hazır bekler." },
      { emergencyId: "fire", duty: "Yakıt aktarım/separatör sistemlerini durdurur, taşınabilir söndürücülerle müdahale eder." },
      { emergencyId: "abandon", duty: "Yardımcı makineleri durdurur ve baş mühendisin talimatlarını uygular." },
      { emergencyId: "mob", duty: "Makine dairesinde destek görevi; sintine/yangın pompalarını hazır tutar." },
    ],
  },
  {
    roleSlug: "eto",
    rank: "Elektrik Zabiti (ETO)",
    musterStation: "Muster İstasyonu",
    emergencyTeam: "Makine Ekibi (Elektrik / Acil Güç)",
    duties: [
      { emergencyId: "general", duty: "Muster istasyonunda toplanır; acil jeneratör, akümülatör ve acil aydınlatma devrelerinin hazır olmasını sağlamak üzere görevlenir." },
      { emergencyId: "fire", duty: "Etkilenen bölgenin elektriğini izole eder; havalandırma fan stoplarını ve acil güç dağıtımını yönetir." },
      { emergencyId: "abandon", duty: "Acil aydınlatma, telsiz şarjı ve EPIRB/SART güç kaynaklarını hazır tutar." },
      { emergencyId: "mob", duty: "Aydınlatma/projektör ve haberleşme güç kaynaklarını kurtarma için hazırlar." },
    ],
  },
  {
    roleSlug: "yagci-fitter",
    rank: "Yağcı / Fitter / Silici",
    musterStation: "Muster İstasyonu",
    emergencyTeam: "Makine Ekibi (Yardımcı)",
    duties: [
      { emergencyId: "general", duty: "Muster istasyonunda can yeleğiyle toplanır ve mühendislerin emrine girmek üzere makine ekibine katılır." },
      { emergencyId: "fire", duty: "Hortum, taşınabilir tüp taşır; valf kapatma ve sınırlama soğutmasında yardım eder." },
      { emergencyId: "abandon", duty: "Taşınabilir teçhizatı taşır ve makinenin durdurulmasına yardım eder." },
      { emergencyId: "mob", duty: "Güverte/kurtarma ekibine teçhizat ve insan gücü desteği sağlar." },
    ],
  },
  {
    roleSlug: "makine-stajyer",
    rank: "Makine Stajyeri (Engine Cadet)",
    musterStation: "Muster İstasyonu",
    emergencyTeam: "Makine Ekibi (Destek / Haberci)",
    duties: [
      { emergencyId: "general", duty: "Muster istasyonunda toplanır; yoklamaya katılır ve makine ekibinde haberci görevine hazırlanır." },
      { emergencyId: "fire", duty: "Teçhizat taşır ve mühendislere müdahalede yardımcı olur." },
      { emergencyId: "abandon", duty: "Malzeme taşır ve makine durdurma adımlarında destek olur." },
      { emergencyId: "mob", duty: "İletişim/haberci görevi yapar, kurtarma ekibine yardım eder." },
    ],
  },

  // ── İkmal / Yaşam Mahalli ───────────────────────────────────────────────
  {
    roleSlug: "asci",
    rank: "Aşçı (Cook)",
    musterStation: "Muster İstasyonu",
    emergencyTeam: "İlkyardım / Erzak Ekibi",
    duties: [
      { emergencyId: "general", duty: "Mutfak ocak/gaz hatlarını kapatır, muster istasyonunda toplanır ve yoklamaya katılır." },
      { emergencyId: "fire", duty: "Mutfak yangın riskini (gaz/yağ) izole eder; ilkyardım/sedye ekibinde görev alır." },
      { emergencyId: "abandon", duty: "Su ve acil erzakı filika/salı istasyonuna taşır." },
      { emergencyId: "mob", duty: "İlkyardım ve battaniye/sıcak içecek hazırlığıyla kurtarılan kişiye destek olur." },
    ],
  },
  {
    roleSlug: "kamarot",
    rank: "Kamarot / Steward",
    musterStation: "Muster İstasyonu",
    emergencyTeam: "İlkyardım / Yoklama Ekibi",
    duties: [
      { emergencyId: "general", duty: "Yaşam mahallini kontrol eder, herkesin muster istasyonuna tahliyesini sağlar ve yoklamada yardımcı olur." },
      { emergencyId: "fire", duty: "Yaşam mahalli kapı/havalandırmasını kapatır; ilkyardım ve sedye ekibinde görev alır." },
      { emergencyId: "abandon", duty: "İlkyardım çantası ve battaniyeleri filika/salı istasyonuna taşır." },
      { emergencyId: "mob", duty: "İlkyardım ekibinde; kurtarılan kişinin bakımı için hazırlık yapar." },
    ],
  },
];
