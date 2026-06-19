import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Çalışma izinleri (PTW) ve iş güvenliği",
  roleSlug: "birinci-zabit",
  taskIndex: 4,
  estimatedPages: 25,
  intro: `Birinci Zabit, gemideki yüksek riskli işlerin Permit to Work (PTW / Çalışma İzni) sistemiyle kontrol altına alınmasından doğrudan sorumludur. Enclosed space entry, hot work, working aloft, working overside ve elektrik/izolasyon işleri; risk assessment, toolbox meeting, izolasyon (LOTO), atmosfer testi ve sahada gözetim olmadan başlatılamaz. Bu bölüm, izin sisteminin kurulumunu, risk değerlendirme metodolojisini, PPE uyumunu ve sahada denetim pratiğini ISM/SOLAS çerçevesinde adım adım açıklar.`,
  sources: [
    "ISM Code (International Safety Management Code)",
    "SOLAS Chapter III/19 — Emergency training and drills (enclosed space)",
    "IMO Resolution A.1050(27) — Recommendations for entering enclosed spaces",
    "ILO/IMO Code of Safe Working Practices for Merchant Seafarers (COSWP)",
    "OCIMF — Marine Injury Reporting Guidelines",
    "STCW Code — Personal safety and social responsibilities",
    "Company SMS — Permit to Work Procedures",
    "Tanker Safety Guide / ISGOTT 6",
  ],
  chapters: [
    {
      heading: "1. Permit to Work Sisteminin Mantığı",
      lead: `PTW, tehlikeli işin "yapılabilir" olduğunu değil, "kontrol altına alınmış koşullarda yapılabilir" olduğunu belgeleyen bir yönetim aracıdır.`,
      sections: [
        {
          subheading: "1.1 İzin gerektiren işlerin tanımı",
          paragraphs: [
            `Çalışma izni, rutin olmayan ve enerji/atmosfer/yükseklik kaynaklı ölümcül risk taşıyan işler için düzenlenir. Gemi SMS'i tipik olarak enclosed space entry, hot work (kaynak, taşlama, açık alev), working aloft (2 m üzeri yükseklik), working overside (bordadan dışarı), elektriksel izolasyon, basınçlı sistem açma ve cold work in hazardous area kategorilerini izne bağlar.`,
            `Birinci Zabit, hangi işin izne tabi olduğunu belirleyen otoritedir. Bir iş "küçük" görünse bile, ölümcül enerji kaynağı içeriyorsa izin zorunludur. Kazaların büyük kısmı "kısa, basit bir işti" denilen görevlerde yaşanır; bu yüzden istisna kültürü yaratmaktan kaçınılır.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "ISM Code Element 7 — Shipboard Operations",
              text: `Şirket, kilit gemi operasyonları için plan ve talimat oluşturmak zorundadır. PTW sistemi bu talimatların sahaya yansıdığı en somut araçtır; iç denetimde (internal audit) izin kayıtları örneklemeyle kontrol edilir.`,
            },
          ],
        },
        {
          subheading: "1.2 İzin akışı ve imza yetkileri",
          paragraphs: [
            `İzin akışı; talep eden (issuing officer'a başvuran), düzenleyen (genelde Birinci Zabit veya ilgili departman başı), onaylayan (Kaptan, kritik işlerde) ve işi yapan (performing personnel) rollerini ayırır. İmza, sorumluluğun devri değil, koşulların doğrulandığının kaydıdır.`,
            `İzin süresi vardiya veya iş penceresiyle sınırlıdır (genelde 8-12 saat veya tek vardiya). Koşullar değişirse (hava bozması, ekipman arızası, atmosfer değişimi) izin askıya alınır veya iptal edilir. İş bittiğinde "permit closure" ile saha temizliği, izolasyon kaldırma ve normalleştirme doğrulanır.`,
          ],
          bullets: [
            `Talep — performing party iş kapsamını bildirir`,
            `Risk assessment — JSA/JHA formu doldurulur`,
            `Düzenleme — kontroller doğrulanır, izin imzalanır`,
            `Toolbox meeting — ekip brifingi`,
            `İcra — saha gözetimi ve periyodik teyit`,
            `Kapanış — normalleştirme ve arşivleme`,
          ],
        },
      ],
    },
    {
      heading: "2. Risk Assessment (Risk Değerlendirmesi)",
      sections: [
        {
          subheading: "2.1 JSA/JHA metodolojisi",
          paragraphs: [
            `Her izin, bir Job Safety Analysis (JSA) veya Risk Assessment ile başlar. İş adımlara bölünür; her adımın tehlikesi (hazard), olasılık (likelihood) ve şiddet (severity) çarpımıyla risk skoru hesaplanır. Yüksek/orta/düşük renk matrisi, hangi kontrollerin zorunlu olduğunu gösterir.`,
            `Kontrol hiyerarşisi (hierarchy of controls) uygulanır: önce eliminasyon (işi gereksiz kıl), sonra ikame, mühendislik kontrolleri, idari kontroller ve en son PPE. PPE asla ilk savunma değildir; "son hat" olarak görülür. Birinci Zabit, ekibin riski "kabul edilebilir" seviyeye indirdiğini doğrulamadan izni imzalamaz.`,
          ],
          table: {
            caption: `Risk Matrisi (5x5 — Olasılık × Şiddet)`,
            headers: ["Skor", "Seviye", "Aksiyon", "İzin Şartı"],
            rows: [
              ["1-4", "Düşük", "Mevcut kontroller yeterli", "Standart izin"],
              ["5-9", "Orta", "Ek kontrol gerekir", "Kontrol + gözetim"],
              ["10-15", "Yüksek", "İş ertelenir/yeniden planlanır", "Kaptan onayı"],
              ["16-25", "Kritik", "Durdur, başka yöntem ara", "İcra edilmez"],
            ],
          },
        },
        {
          subheading: "2.2 Dinamik risk değerlendirmesi",
          paragraphs: [
            `Statik form yetmez; koşullar saha boyunca değişir. Dinamik risk değerlendirmesi, performing party'nin "STOP WORK" yetkisini içerir: bir tehlike fark edildiğinde herkes işi durdurabilir, ceza korkusu olmadan. Bu kültür, near-miss raporlamasıyla doğrudan bağlantılıdır.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Stop Work Authority",
              text: `En kıdemsiz tayfa bile güvensiz koşulda işi durdurma yetkisine sahip olmalıdır. Birinci Zabit bu yetkiyi açıkça ilan eder ve durduran kişiyi asla cezalandırmaz; aksine takdir eder.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. Enclosed Space Entry İzni",
      sections: [
        {
          subheading: "3.1 Atmosfer testi ve havalandırma",
          paragraphs: [
            `Kapalı alan girişi, ölümlerin en sık yaşandığı iş tipidir; kurbanların önemli kısmı kurtarmaya giren ikinci kişilerdir. Giriş öncesi kalibre çoklu gaz ölçer ile O2 (en az %19.5, en fazla %23.5), LEL/yanıcı gaz (%0 hedef), H2S ve CO ölçülür. Ölçüm, alanın farklı seviyelerinden (üst-orta-dip) yapılır çünkü gazlar yoğunluklarına göre tabakalanır.`,
            `Havalandırma sürekli çalışır; giriş boyunca atmosfer izlenir. Standby kişi giriş ağzında bekler, sürekli iletişim kurar ve asla pozisyonunu terk etmez. Rescue plan ve kurtarma ekipmanı (tripod, vinç, SCBA, resüsitasyon) hazır olmadan giriş yapılmaz.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Rescuer ölümleri",
              text: `Kapalı alan kazalarında ölümlerin yarısından fazlası, alarmı duyup düşünmeden içeri dalan kurtarıcılardır. Eğitim: ASLA SCBA olmadan girme, önce alarm ver, ekibi topla, atmosfer ölç.`,
            },
            {
              type: "regulation",
              title: "SOLAS III/19 — Enclosed space drill",
              text: `Gemide her iki ayda bir enclosed space rescue drill yapılmalı, kullanılan ekipman ve atmosfer testi prosedürü tatbik edilmelidir. Kayıt log book'a işlenir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "4. Hot Work İzni",
      sections: [
        {
          subheading: "4.1 Designated vs non-designated alanlar",
          paragraphs: [
            `Hot work (kaynak, kesme, taşlama, açık alev), workshop gibi designated alanlarda standart kontrollerle yapılır. Designated olmayan alanda (özellikle tank, hold, akaryakıt bölgesi yakınında) çok daha sıkı izin gerekir; gas-free certificate, çevre tankların atmosfer kontrolü ve yangın nöbetçisi (fire watch) zorunludur.`,
            `Tankerlerde hot work, hazardous zone dışında veya tamamen gas-free ve inert edilmiş koşullarda yapılır. Birinci Zabit, çalışma noktası çevresinde 30 m yarıçapta yanıcı kaynak olmadığını, kıvılcımın düşeceği alt güvertelerin korunduğunu ve yangın söndürme ekipmanının elde olduğunu doğrular.`,
          ],
          table: {
            caption: `Hot Work İzni — Zorunlu Kontroller`,
            headers: ["Kontrol", "Designated Alan", "Non-designated / Tehlikeli"],
            rows: [
              ["Gas-free sertifikası", "Gerekli değil", "Zorunlu"],
              ["Fire watch", "Önerilir", "Zorunlu (çalışma + sonrası)"],
              ["Çevre tank kontrolü", "Hayır", "Komşu tanklar inert/gas-free"],
              ["Yangın ekipmanı", "Yakında", "Çalışma noktasında hazır"],
              ["Kaptan onayı", "Hayır", "Evet"],
            ],
          },
        },
        {
          subheading: "4.2 Çalışma sonrası gözetim",
          paragraphs: [
            `Kaynak/taşlama bittikten sonra metal saatlerce sıcak kalır ve gizli yangın başlatabilir. Fire watch, iş bitiminden sonra en az 30-60 dakika alanı izler; kıvılcımın ulaşmış olabileceği gizli boşluklar kontrol edilir. İzin ancak alan tamamen soğuduğunda ve temiz olduğunda kapatılır.`,
          ],
        },
      ],
    },
    {
      heading: "5. Working Aloft ve Working Overside",
      sections: [
        {
          subheading: "5.1 Yükseklikte çalışma",
          paragraphs: [
            `Direk, baca, vinç bomu veya yüksek güverte ekipmanı üzerinde çalışma full body harness, çift lanyard (100% tie-off) ve bağımsız can halatı gerektirir. Çalışma altında alan kordona alınır; düşen el aleti ölümcül olabilir, bu yüzden aletler lanyard'la bileğe bağlanır.`,
            `Radyo/radar antenleri yakınında çalışılacaksa transmitter'lar kapatılır ve "DO NOT TRANSMIT — MEN ALOFT" etiketi konur; aksi halde RF yanığı ve yüksek frekans tehlikesi oluşur. Funnel yakınında çalışmada egzoz gazı (CO, SO2, sıcaklık) riski değerlendirilir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Vaka: Antena yakını RF yanığı",
              text: `Bir gemide working aloft sırasında radar transmitter kapatılmadan çalışma yapıldı; personel ciddi RF yanığı yaşadı. Ders: aloft izninde tüm RF kaynakları izole edilir ve fiziksel etiketle kilitlenir.`,
            },
          ],
        },
        {
          subheading: "5.2 Bordadan dışarı çalışma (overside)",
          paragraphs: [
            `Working overside (boya, pas raspalama, freeboard işleri), harness + life jacket + ready lifebuoy with line kombinasyonu gerektirir. Bir kişi sürekli su yüzeyini ve çalışanı gözler. Liman içinde propeller/thruster'ların çalışmadığı, başka geminin manevra yapmadığı doğrulanır; gerekirse "no movement" koordinasyonu yapılır.`,
          ],
        },
      ],
    },
    {
      heading: "6. İzolasyon (LOTO) ve Enerji Kontrolü",
      sections: [
        {
          subheading: "6.1 Lock-Out / Tag-Out",
          paragraphs: [
            `Elektrik, hidrolik, basınçlı hava ve buhar gibi tehlikeli enerji kaynakları, üzerinde çalışılmadan önce izole edilir, kilitlenir (lock-out) ve etiketlenir (tag-out). Kilidin anahtarı işi yapan kişide kalır; başkası enerjiyi yeniden veremez. Çoklu kişi çalışıyorsa multi-lock hasp kullanılır.`,
            `Birinci Zabit (veya elektrik işlerinde Çarkçıbaşı koordinasyonu), izolasyonun doğrulandığını "try-out" testiyle teyit eder: enerji kesildikten sonra start denenir, hareket olmadığı görülür. Stored energy (kapasitör, basınç, yay) ayrıca boşaltılır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Mooring winch / kapı LOTO",
              text: `Mooring vinçleri, watertight kapılar ve provizyon vinçleri üzerinde bakım yapılırken enerji izolasyonu hayatidir. Beklenmedik hareket ezilme/kopma yaralanmaları yaratır. Asla "birisi açar" varsayımıyla çalışma.`,
            },
          ],
        },
      ],
    },
    {
      heading: "7. Toolbox Meeting ve PPE Uyumu",
      sections: [
        {
          subheading: "7.1 İş öncesi brifing",
          paragraphs: [
            `Toolbox meeting, izin imzalandıktan sonra ekibe iş kapsamını, tehlikeleri, kontrolleri ve acil durum çıkış yolunu aktaran kısa sahada brifingdir. Herkesin rolünü anladığı, soru sorma fırsatı bulduğu ve "anladım" teyidi verdiği teyit edilir. Dil engeli varsa ortak çalışma dili veya görsel anlatım kullanılır.`,
            `Brifing kayda geçer; katılımcılar imzalar. Bu, hem güvenlik hem de denetim açısından kanıttır. Birinci Zabit, ekip moralinin ve dikkatinin yerinde olduğunu, yorgunluk (fatigue) belirtisi olmadığını gözlemler.`,
          ],
        },
        {
          subheading: "7.2 PPE seçimi ve denetimi",
          paragraphs: [
            `PPE, işin riskine göre seçilir ve durumu denetlenir: baret, emniyet ayakkabısı, eldiven (kimyasal/mekanik), göz koruması, kulaklık, solunum koruması, harness. Hasarlı PPE kullanılmaz; harness'ler periyodik muayene ve son kullanma tarihine tabidir.`,
          ],
          table: {
            caption: `İş Tipine Göre PPE Matrisi`,
            headers: ["İş Tipi", "Zorunlu PPE", "Ek Koruma"],
            rows: [
              ["Hot work", "Kaynak maskesi, deri önlük, eldiven", "Solunum (gerekirse), fire watch"],
              ["Enclosed space", "Çoklu gaz ölçer, harness", "SCBA/EEBD, iletişim"],
              ["Working aloft", "Full body harness, çift lanyard", "Helmet chin strap, alet lanyard"],
              ["Overside", "Harness, life jacket", "Lifebuoy with line, gözcü"],
              ["Kimyasal", "Kimyasal eldiven, gözlük/yüz siperi", "Apron, solunum, göz duşu yakını"],
            ],
          },
        },
      ],
    },
    {
      heading: "8. Saha Gözetimi ve İzin Kapanışı",
      sections: [
        {
          subheading: "8.1 İcra sırasında denetim",
          paragraphs: [
            `İzin imzalanmasıyla iş bitmez; Birinci Zabit veya görevli zabit sahayı periyodik denetler. Atmosfer ölçerinin çalıştığı, standby kişinin pozisyonda olduğu, koşulların değişmediği teyit edilir. Hava bozması, alarm veya beklenmedik gelişmede iş durdurulur.`,
          ],
        },
        {
          subheading: "8.2 Permit closure ve normalleştirme",
          paragraphs: [
            `İş bittiğinde alan temizlenir, alet/malzeme toplanır, izolasyonlar kaldırılır, sistemler normale döndürülür ve fire watch gerekiyorsa tamamlanır. İzin "kapatıldı" olarak imzalanır ve arşivlenir; açık kalan izin denetimde major bulgu yaratır.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "Arşiv ve PSC",
              text: `Kapatılmış izinler, risk assessment formları ve toolbox kayıtları en az şirket SMS'inin öngördüğü süre saklanır. PSC ve vetting denetimleri PTW kayıtlarını örnekleme ile inceler.`,
            },
          ],
        },
      ],
    },
    {
      heading: "9. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "9.1 PTW kontrol listesi",
          bullets: [
            `İş izne tabi mi, doğru izin tipi seçildi mi?`,
            `Risk assessment / JSA dolduruldu ve risk kabul edilebilir mi?`,
            `Atmosfer testi (gerekliyse) kalibre cihazla yapıldı mı?`,
            `İzolasyon (LOTO) doğrulandı, try-out yapıldı mı?`,
            `Toolbox meeting yapıldı, katılım imzalandı mı?`,
            `PPE seçildi, denetlendi, hasarsız mı?`,
            `Standby kişi / fire watch / gözcü atandı mı?`,
            `Acil durum çıkışı ve rescue plan netleşti mi?`,
            `İcra sırasında periyodik denetim yapılıyor mu?`,
            `İş bitince izin kapatıldı, normalleştirme tamam mı?`,
          ],
          paragraphs: [
            `PTW sistemi bir kağıt egzersizi değil, ölümcül enerjiyi kontrol altına alan disiplin halkasıdır. Birinci Zabit'in burada gösterdiği titizlik, "kazasız bir sefer" ile "tahkikat dosyası" arasındaki farkı belirler. Hiçbir iş, bir insanın hayatından daha acil değildir.`,
          ],
        },
      ],
    },
  ],
};

export default content;
