import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "ECDIS official update ve T&P notice yönetimi",
  roleSlug: "ikinci-zabit",
  taskIndex: 12,
  estimatedPages: 24,
  intro: `ECDIS (Electronic Chart Display and Information System) ile seyir, ancak haritalar ve veriler güncel tutulduğunda güvenlidir. İkinci Zabit, gemi haritacısı (navigating officer) olarak resmi ENC servis aboneliğini güncel tutmak, haftalık güncellemeleri yüklemek, T&P (Temporary & Preliminary) notlarını işlemek ve ECDIS yedek (backup) düzenini operasyonel tutmakla sorumludur. Bu bölüm ECDIS güncelleme döngüsünü, T&P yönetimini ve denetim kayıtlarını ele alır.`,
  sources: [
    "IMO Resolution MSC.232(82) — Revised ECDIS performance standards",
    "IMO Resolution A.817(19) — ECDIS performance standards",
    "SOLAS Chapter V Regulation 19 & 27 — ECDIS ve chart güncelliği",
    "IHO S-52 / S-57 / S-63 — ENC ve güvenlik standartları",
    "Admiralty / NOAA / Primar ENC servis prosedürleri",
    "Notices to Mariners (NtM), T&P Notices",
  ],
  chapters: [
    {
      heading: "1. ECDIS ve Resmi Harita Yükümlülüğü",
      sections: [
        {
          subheading: "1.1 Güncel harita zorunluluğu",
          paragraphs: [
            `SOLAS V, seferin tamamını kapsayan, güncel ve yeterli ölçekli resmi haritaların bulundurulmasını şart koşar. ECDIS kullanan gemilerde bu, resmi ENC servisi (UKHO ADMIRALTY, NOAA, Primar vb.) aboneliği ve düzenli güncelleme ile sağlanır. İkinci Zabit bu güncelliğin fiili sorumlusudur.`,
          ],
          callouts: [
            {
              type: "regulation",
              title: "MSC.232(82) & SOLAS V/19",
              text: `Onaylı ECDIS, resmi (ENC) veriyle ve uygun yedekle kullanıldığında kâğıt harita yerine geçer. Resmi olmayan veri veya güncellenmemiş ENC ile seyir, SOLAS uyumsuzluğu ve ciddi seyir riskidir.`,
            },
          ],
        },
        {
          subheading: "1.2 ENC vs raster ve ölçek",
          paragraphs: [
            `ENC (vektör) veri, ECDIS'in alarm/uyarı yeteneklerini (safety contour, anti-grounding) tam kullanır. İkinci Zabit, rota boyunca uygun ölçekli ENC kapsamının (folio) tam olduğunu doğrular; eksik hücre, o bölgede güvenlik fonksiyonlarının çalışmaması demektir.`,
          ],
        },
      ],
    },
    {
      heading: "2. Haftalık Güncelleme Döngüsü",
      sections: [
        {
          subheading: "2.1 Update yükleme",
          paragraphs: [
            `Resmi ENC güncellemeleri (weekly update) çevrimiçi veya medya ile alınır ve ECDIS'e yüklenir. İkinci Zabit; güncellemenin başarıyla uygulandığını, hücre durumlarının "up to date" olduğunu ve dijital sertifika/lisansların geçerli kaldığını doğrular. Güncelleme tarihleri kaydedilir.`,
          ],
          bullets: [
            `Weekly update'i indir/medyadan al`,
            `ECDIS'e yükle ve uygulamayı doğrula`,
            `Hücre güncellik durumunu kontrol et`,
            `Lisans/abonelik geçerliliğini teyit et`,
            `Güncelleme kaydını tut`,
          ],
        },
        {
          subheading: "2.2 Lisans ve abonelik yönetimi",
          paragraphs: [
            `ENC lisansları süreli ve hücre/folio bazlıdır. İkinci Zabit, sefer planına göre gerekli hücrelerin lisanslı olduğunu önceden kontrol eder; süresi dolan veya eksik lisanslar zamanında yenilenir/eklenir, aksi halde rotada "permit yok" boşlukları çıkar.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Sefer öncesi folio kontrolü",
              text: `Yeni rota planlanırken gereken tüm ENC hücrelerinin yüklü, lisanslı ve güncel olduğu önceden doğrulanır. Seyir sırasında fark edilen eksik hücre, en kötü anda ortaya çıkan bir risktir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "3. T&P Notice Yönetimi",
      sections: [
        {
          subheading: "3.1 Temporary & Preliminary notlar",
          paragraphs: [
            `T&P notları; geçici (örn. tatbikat sahası, geçici şamandıra) veya henüz kalıcı düzeltmeye dönüşmemiş ön bilgileri içerir. ENC güncellemesi bunların bir kısmını içerse de, kapsanmayanlar ECDIS'in Manual Update (Manual Correction) layer'ına elle işlenir. İkinci Zabit bu notların rota üzerindeki etkisini değerlendirir.`,
          ],
          table: {
            caption: "Güncelleme türleri",
            headers: ["Tür", "Kaynak", "Uygulama"],
            rows: [
              ["ENC weekly update", "ENC servisi", "Otomatik yükleme"],
              ["T&P Notice", "NtM / NAVAREA", "Manual update layer / değerlendirme"],
              ["Navigational warning", "NAVTEX/EGC", "Rota üzerinde değerlendir"],
            ],
          },
        },
        {
          subheading: "3.2 Manuel düzeltme kaydı",
          paragraphs: [
            `Elle yapılan düzeltmeler ECDIS'te kayıt altına alınır ve hangi notun işlendiği izlenir. Bu kayıt, denetimde haritaların gerçekten güncel tutulduğunun kanıtıdır.`,
          ],
        },
      ],
    },
    {
      heading: "4. ECDIS Yedeği (Backup)",
      sections: [
        {
          subheading: "4.1 Bağımsız yedek zorunluluğu",
          paragraphs: [
            `ECDIS'in birincil sistem arızasına karşı uygun bir yedeği olmalıdır: ikinci, bağımsız (ayrı güç/veri) bir onaylı ECDIS veya uygun kâğıt harita yedeği. İkinci Zabit yedeğin operasyonel ve güncel olduğunu sağlar; aksi halde tek arıza, gemiyi haritasız bırakır.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Yedek de güncel olmalı",
              text: `İkinci ECDIS yedek olarak sayılıyorsa onun ENC'leri de güncel tutulmalı; kâğıt yedek kullanılıyorsa o haritalar NtM ile düzeltilmelidir. Güncel olmayan bir yedek, gerçek bir yedek değildir.`,
            },
          ],
        },
      ],
    },
    {
      heading: "5. Sistem Ayarları ve Sürüm",
      sections: [
        {
          subheading: "5.1 Safety settings ve software",
          paragraphs: [
            `Safety contour, safety depth ve alarm ayarlarının doğru yapılandırılması güvenli seyir için kritiktir. Ayrıca ECDIS yazılım sürümünün ve ENC gösterim kütüphanesinin (Presentation Library) güncel olması gerekir; eski sürüm bazı yeni sembolleri yanlış gösterebilir.`,
          ],
        },
      ],
    },
    {
      heading: "6. Denetim Kayıtları",
      sections: [
        {
          subheading: "6.1 PSC ve şirket denetimi",
          paragraphs: [
            `PSC ve vetting, ENC güncelliğini, lisans durumunu, T&P işlemlerini ve yedek düzenini sorgular. İkinci Zabit, güncelleme kayıtlarını, hücre durum raporlarını ve manuel düzeltme kayıtlarını düzenli ve sunulabilir tutar. Eksik harita güncellemesi sık PSC bulgusudur.`,
          ],
          bullets: [
            `Weekly update kayıtları`,
            `Hücre güncellik/lisans raporu`,
            `Manuel (T&P) düzeltme kaydı`,
            `Yedek sistem güncelliği`,
          ],
        },
      ],
    },
    {
      heading: "7. Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "7.1 ECDIS güncelleme kontrolü",
          bullets: [
            `Haftalık ENC update yüklendi ve doğrulandı mı?`,
            `Rota üzerindeki tüm hücreler lisanslı ve güncel mi?`,
            `T&P notları değerlendirildi, gerekenler manuel işlendi mi?`,
            `ECDIS yedeği (ikinci ECDIS/kâğıt) operasyonel ve güncel mi?`,
            `Safety contour/depth ve alarm ayarları doğru mu?`,
            `Yazılım/Presentation Library sürümü güncel mi?`,
            `Güncelleme ve düzeltme kayıtları denetime hazır mı?`,
          ],
          paragraphs: [
            `ECDIS güncelliği, görünmeyen ama hayati bir disiplindir; güncel olmayan tek bir hücre veya işlenmemiş bir T&P, doğru görünen bir ekranın arkasında gerçek bir tehlike gizleyebilir. İkinci Zabitin düzenli güncelleme döngüsü, elektronik seyrin güvenilirliğinin temelidir.`,
          ],
        },
      ],
    },
  ],
};

export default content;
