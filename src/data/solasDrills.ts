export type SolasDrill = {
  id: string;
  title: string;
  englishTitle: string;
  classification: string;
  applicability: string;
  frequency: string;
  reference: string;
  isStandalone: boolean;
};

/**
 * Periyodik talim başlıkları yalnızca yürürlükteki zorunlu metinlerde kullanılan
 * adlarla verilir. "Genel talim" bir SOLAS talim başlığı değildir; genel acil
 * durum alarmı, ilgili talimin personeli istasyonlarına çağırma yöntemidir.
 */
export const solasDrills: readonly SolasDrill[] = [
  {
    id: "fire",
    title: "Yangın Talimi",
    englishTitle: "Fire drill",
    classification: "SOLAS talimi",
    applicability: "Tüm SOLAS gemileri",
    frequency:
      "Yük gemisinde her personel ayda en az bir kez katılır. Yolcu gemisinde talim haftalık yapılır; her personel ayda en az bir kez katılır.",
    reference: "SOLAS III/19.3.2 ve III/19.4.3; SOLAS II-2/15.2.2; SOLAS III/30.2",
    isStandalone: true,
  },
  {
    id: "abandon-ship",
    title: "Gemiyi Terk Talimi",
    englishTitle: "Abandon-ship drill",
    classification: "SOLAS talimi",
    applicability: "Tüm SOLAS gemileri",
    frequency:
      "Yük gemisinde her personel ayda en az bir kez katılır. Yolcu gemisinde talim haftalık yapılır; her personel ayda en az bir kez katılır.",
    reference: "SOLAS III/19.3.2 ve III/19.4.2; SOLAS III/30.2",
    isStandalone: true,
  },
  {
    id: "enclosed-space",
    title: "Kapalı Mahal Giriş ve Kurtarma Talimi",
    englishTitle: "Enclosed-space entry and rescue drill",
    classification: "SOLAS talimi",
    applicability: "Giriş veya kurtarma görevi bulunan personel",
    frequency: "Gemide en az iki ayda bir yapılır; atanmış personel talime katılır.",
    reference: "SOLAS III/19.3.3 ve III/19.6",
    isStandalone: true,
  },
  {
    id: "emergency-steering",
    title: "Acil Dümen Talimi",
    englishTitle: "Emergency steering drill",
    classification: "SOLAS talimi",
    applicability: "SOLAS V kapsamındaki gemiler",
    frequency: "En az üç ayda bir yapılır.",
    reference: "SOLAS V/26.4",
    isStandalone: true,
  },
  {
    id: "ship-security",
    title: "Gemi Güvenlik Talimi",
    englishTitle: "Ship security drill",
    classification: "SOLAS XI-2 / ISPS talimi",
    applicability: "ISPS Code kapsamındaki gemiler",
    frequency:
      "En az üç ayda bir; personelin %25'inden fazlası değişmiş ve son üç ayda gemide talime katılmamışsa değişiklikten sonra bir hafta içinde.",
    reference: "SOLAS XI-2; ISPS Code A/13.4 ve B/13.6",
    isStandalone: true,
  },
  {
    id: "damage-control",
    title: "Hasar Kontrol Talimi",
    englishTitle: "Damage control drill",
    classification: "Gemi tipine özel SOLAS talimi",
    applicability: "Yalnızca yolcu gemileri",
    frequency: "En az üç ayda bir yapılır.",
    reference: "SOLAS II-1/19-1",
    isStandalone: true,
  },
  {
    id: "survival-craft-launch",
    title: "Can Filikası ve Kurtarma Botu İndirme / Manevra Uygulaması",
    englishTitle: "Lifeboat and rescue-boat launching and manoeuvring",
    classification: "Gemiyi terk taliminin uygulaması",
    applicability: "Donanıma ve onaylı muafiyetlere göre",
    frequency:
      "Can filikası atanmış işletme ekibiyle en az üç ayda bir; ayrı kurtarma botu mümkünse aylık, her hâlükârda en az üç ayda bir suya indirilip manevra yaptırılır.",
    reference: "SOLAS III/19.4.3; MSC.152(78)",
    isStandalone: false,
  },
] as const;

export const solasDrillScopeNote =
  "MOB, çatışma, karaya oturma, su alma, blackout, kirlilik ve acil yedekleme senaryoları gemi SMS'i, ISM, bayrak devleti veya başka zorunlu kodlar kapsamında ayrıca planlanabilir; bunlar evrensel ve bağımsız SOLAS talim başlığı gibi adlandırılmamalıdır.";
