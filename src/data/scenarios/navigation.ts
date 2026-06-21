import type { Scenario } from "./types";

/**
 * Seyir (navigation) pilot — vardiya/COLREG karar senaryoları.
 * Tüm kural atıfları COLREG 1972 (Denizde Çatışmayı Önleme Tüzüğü) gerçek
 * kurallarına dayanır.
 */

export const navigationScenarios: Scenario[] = [
  // ──────────────────────────────────────────────────────────────────────
  {
    id: "crossing-give-way",
    topicKey: "navigation",
    title: "Kavşak Durumu: Sancaktan Gelen Gemi",
    level: "officer",
    briefing:
      "Açık denizde, gündüz ve açık görüşte vardiyadasınız. Geminiz 12 knot ile rota 000°T'de seyrediyor. Sancak tarafınızdan, nispi kerteriz 045°'de bir kuru yük gemisi yaklaşıyor. ARPA: CPA 0.2 nm, TCPA 9 dakika — çatışma riski var.",
    learningGoals: [
      "Kavşak durumunda yol verme yükümlüsünü (give-way) belirlemek",
      "COLREG Kural 15 ve 16'ya uygun manevrayı seçmek",
      "Manevranın erken, belirgin ve VHF anlaşmasına dayanmadan yapılması",
    ],
    steps: [
      {
        id: "step1",
        situation:
          "İki güçle yürüyen gemi kavşak rotasında ve çatışma riski mevcut. Karşı gemi sizin sancak tarafınızda.",
        question: "Bu kavşak durumunda sizin yükümlülüğünüz nedir?",
        choices: [
          {
            text: "Yol verme yükümlüsüyüm (give-way vessel)",
            outcome: "safe",
            feedback:
              "Doğru. Sancağınızda gemi bulunduğundan yol verme yükümlüsü sizsiniz; manevra yapmak zorundasınız.",
            source: { code: "COLREG Kural 15", detail: "Diğer gemi sancakta ise yol verilir" },
            next: "step2",
          },
          {
            text: "Yol tutma yükümlüsüyüm (stand-on), rotamı korurum",
            outcome: "danger",
            feedback:
              "Yanlış. Sancağınızdaki gemiye yol vermek zorundasınız. Stand-on durumu, gemiyi iskelenizde gördüğünüzde geçerli olurdu.",
            source: { code: "COLREG Kural 15", detail: "Give-way / stand-on ayrımı" },
            next: "step2",
          },
          {
            text: "Emin değilim, önce hızı keser beklerim",
            outcome: "risky",
            feedback:
              "Tek başına yeterli değil. Yükümlülüğünüz bellidir: yol vermelisiniz. Hız azaltmak bir parçası olabilir ama erken ve belirgin bir manevra gerekir.",
            source: { code: "COLREG Kural 8", detail: "Çatışmayı önleyici eylem" },
            next: "step2",
          },
        ],
      },
      {
        id: "step2",
        situation:
          "Yol verme yükümlüsü olarak çatışmayı önleyici eylemi yapmalısınız. Karşı geminin kıçından geçecek şekilde davranmalısınız.",
        question: "Hangi manevrayı seçersiniz?",
        choices: [
          {
            text: "Sancağa belirgin bir rota değişikliği yapıp geminin kıçından geçerim",
            outcome: "safe",
            feedback:
              "Doğru. Kural 15 mümkünse karşı geminin önünden geçmekten kaçınmayı, Kural 8 ise belirgin bir manevrayı emreder. Sancağa dönmek kıçtan geçişi sağlar.",
            source: { code: "COLREG Kural 15 & 8", detail: "Önünden geçmekten kaçın; belirgin eylem" },
            next: "step3",
          },
          {
            text: "İskeleye dönerim",
            outcome: "danger",
            feedback:
              "Tehlikeli. İskeleye dönmek sizi karşı geminin önüne sokar ve çatışma riskini artırır. Kavşakta give-way gemi karşının önünden geçmekten kaçınmalıdır.",
            source: { code: "COLREG Kural 15", detail: "Önünden geçmekten kaçınma" },
            next: "step3",
          },
          {
            text: "Çok küçük bir rota düzeltmesi yaparım",
            outcome: "risky",
            feedback:
              "Yetersiz. Küçük değişiklikler karşı gemiden radar/görsel olarak fark edilmeyebilir. Manevra yeterince büyük olmalıdır.",
            source: { code: "COLREG Kural 8(b)", detail: "Manevra belirgin/büyük olmalı" },
            next: "step3",
          },
        ],
      },
      {
        id: "step3",
        situation:
          "Manevra yönüne karar verdiniz. Şimdi manevranın nasıl uygulanacağı önemli.",
        question: "Manevrayı nasıl uygularsınız?",
        choices: [
          {
            text: "Erken, büyük ve belirgin bir rota değişikliği yapar, ARPA ile teyit ederim",
            outcome: "safe",
            feedback:
              "Doğru. Erken ve belirgin eylem en güvenli yaklaşımdır; sonucu ARPA/görsel ile teyit edip yeterli mesafede geçtiğinizden emin olursunuz.",
            source: { code: "COLREG Kural 8(a-d)", detail: "Erken, belirgin, etkili eylem" },
          },
          {
            text: "Son ana kadar bekler, gerekirse küçük düzeltme yaparım",
            outcome: "danger",
            feedback:
              "Tehlikeli. Geç ve küçük manevralar çatışmayı önlemeyebilir. Eylem yeterince erken yapılmalıdır.",
            source: { code: "COLREG Kural 8(a)", detail: "Eylem yeterince erken yapılmalı" },
          },
          {
            text: "Sadece VHF ile karşı gemiyle anlaşırım",
            outcome: "danger",
            feedback:
              "Tehlikeli. VHF ile rota anlaşması (özellikle kimlik teyidi olmadan) kaza nedenidir. Manevra COLREG'e göre yapılır; VHF buna güvenmek için kullanılmaz.",
            source: { code: "COLREG Kural 8 / MGN", detail: "VHF anlaşmasına güvenme" },
          },
        ],
      },
    ],
    debrief:
      "Kavşak durumunda gemiyi SANCAĞINIZDA görüyorsanız yol verme (give-way) yükümlüsüsünüz (Kural 15). Çözüm: SANCAĞA erken ve belirgin bir rota değişikliği yaparak karşı geminin KIÇINDAN geçmek (Kural 8 & 15). Karşının önünden geçmekten ve iskeleye dönmekten kaçının; manevrayı VHF anlaşmasına değil, kurallara ve ARPA teyidine dayandırın.",
  },
  // ──────────────────────────────────────────────────────────────────────
  {
    id: "restricted-visibility",
    topicKey: "navigation",
    title: "Kısıtlı Görüş: Siste Radar Teması",
    level: "officer",
    briefing:
      "Yoğun sis bandına girdiniz, görüş ~0.5 nm. Radar/ARPA baş omuzlukta (nispi 030°, forward of the beam) bir hedef gösteriyor; 6 nm'den kapanıyor, CPA düşük. Görsel temas yok.",
    learningGoals: [
      "Kısıtlı görüşte COLREG Kural 19'u uygulamak",
      "Baş omuzluktaki hedefe iskeleye dönmekten kaçınmak",
      "Emniyetli hız ve ses işaretlerini kullanmak (Kural 6 ve 35)",
    ],
    steps: [
      {
        id: "step1",
        situation:
          "Kısıtlı görüş koşullarındasınız ve yalnızca radarla saptanan bir hedef var. Henüz görsel temas yok.",
        question: "İlk olarak ne yaparsınız?",
        choices: [
          {
            text: "Emniyetli hıza düşer, ses işareti veririm ve ARPA ile plotlarım",
            outcome: "safe",
            feedback:
              "Doğru. Kısıtlı görüşte emniyetli hız (Kural 6), düdükle ses işaretleri (Kural 35) ve hedefin sistematik gözlemi (Kural 7/19) esastır.",
            source: { code: "COLREG Kural 6 & 19 & 35", detail: "Emniyetli hız, plot, ses işareti" },
            next: "step2",
          },
          {
            text: "Rotayı ve hızı korur, görene kadar beklerim",
            outcome: "danger",
            feedback:
              "Tehlikeli. Kısıtlı görüşte 'görene kadar beklemek' kabul edilemez; radarla saptanan yakınlaşan hedefe zamanında eylem gerekir.",
            source: { code: "COLREG Kural 19(d)", detail: "Radarla saptanan hedefe zamanında eylem" },
            next: "step2",
          },
          {
            text: "Hemen iskeleye büyük bir alarkın yaparım",
            outcome: "danger",
            feedback:
              "Tehlikeli. Baş omuzluktaki (forward of the beam) bir hedef için iskeleye dönmekten kaçınılır. Önce hız ve plot.",
            source: { code: "COLREG Kural 19(d)(i)", detail: "Forward of beam hedefe iskele yasak" },
            next: "step2",
          },
        ],
      },
      {
        id: "step2",
        situation:
          "Plot tamamlandı: hedef baş omuzlukta (forward of the beam) ve CPA tehlikeli derecede düşük. Manevra gerekiyor.",
        question: "Hangi manevra Kural 19'a uygundur?",
        choices: [
          {
            text: "Sancağa belirgin bir rota değişikliği yaparım",
            outcome: "safe",
            feedback:
              "Doğru. Baş omuzluktaki (geçme durumu hariç) hedef için iskeleden kaçınılır; sancağa belirgin alaргın uygundur.",
            source: { code: "COLREG Kural 19(d)(i)", detail: "İskeleye dönmekten kaçın" },
            next: "step3",
          },
          {
            text: "İskeleye dönerim",
            outcome: "danger",
            feedback:
              "Tehlikeli. Kural 19(d)(i) baş omuzluktaki hedef için iskeleye dönmeyi yasaklar (geçilen gemi durumu dışında).",
            source: { code: "COLREG Kural 19(d)(i)", detail: "Forward of beam: iskele yasak" },
            next: "step3",
          },
          {
            text: "Manevra yapmadan sadece izlemeye devam ederim",
            outcome: "risky",
            feedback:
              "Yetersiz. CPA düşükken pasif izleme riskli; zamanında ve belirgin bir eylem gerekir.",
            source: { code: "COLREG Kural 8 & 19", detail: "Zamanında belirgin eylem" },
            next: "step3",
          },
        ],
      },
      {
        id: "step3",
        situation:
          "Manevraya rağmen hedef hâlâ yaklaşıyor ve çok yakın mesafede. Çatışma kaçınılmaz görünüyor.",
        question: "Son çare olarak ne yaparsınız?",
        choices: [
          {
            text: "Hızı asgariye indiririm; gerekirse durdurur, tornista yaparım",
            outcome: "safe",
            feedback:
              "Doğru. Çatışma önlenemiyorsa Kural 19(e) hızın asgariye indirilmesini, gerekirse tüm yolun kesilmesini emreder.",
            source: { code: "COLREG Kural 19(e)", detail: "Hızı asgariye indir / durdur" },
          },
          {
            text: "Hızlanıp önünden sıyrılmaya çalışırım",
            outcome: "danger",
            feedback:
              "Tehlikeli. Kısıtlı görüşte hızlanmak emniyetli hız ilkesine aykırıdır ve riski artırır.",
            source: { code: "COLREG Kural 6 & 19(e)", detail: "Emniyetli hız" },
          },
          {
            text: "VHF ile karşıyı bulup rota anlaşması yaparım",
            outcome: "danger",
            feedback:
              "Tehlikeli. Yakın mesafede VHF anlaşmasıyla vakit kaybetmek yerine derhal hız kesip gerekli manevrayı yapmalısınız.",
            source: { code: "COLREG Kural 19(e)", detail: "Derhal hız kes" },
          },
        ],
      },
    ],
    debrief:
      "Kısıtlı görüşte (Kural 19): emniyetli hız (Kural 6) + ses işaretleri (Kural 35) + sistematik radar plot şarttır. Baş omuzluktaki (forward of the beam) hedef için İSKELEYE dönmekten kaçının (19(d)(i)); sancağa belirgin manevra tercih edilir. Çatışma önlenemiyorsa hızı asgariye indirin, gerekirse durun (19(e)). 'Görene kadar bekleme' ve VHF anlaşması kabul edilemez.",
  },
  // ──────────────────────────────────────────────────────────────────────
  {
    id: "head-on",
    topicKey: "navigation",
    title: "Pruva Pruvaya Karşılaşma (Head-on)",
    level: "cadet",
    briefing:
      "Gece seyrindesiniz. Tam pruvanızda bir geminin İKİ direk fenerini neredeyse üst üste ve HEM kırmızı HEM yeşil borda fenerini birlikte görüyorsunuz. Mesafe kapanıyor.",
    learningGoals: [
      "Fener görünümünden head-on durumunu tanımak",
      "COLREG Kural 14'e göre iskele-iskele (port-to-port) geçişi uygulamak",
      "Kural 34 ses işaretiyle manevrayı bildirmek",
    ],
    steps: [
      {
        id: "step1",
        situation:
          "Pruvada iki direk feneri aynı hatta ve iki borda feneri (kırmızı+yeşil) birlikte görülüyor.",
        question: "Bu fener görünümü hangi durumu gösterir?",
        choices: [
          {
            text: "Pruva pruvaya karşılaşma (head-on)",
            outcome: "safe",
            feedback:
              "Doğru. İki direk feneri bir hatta ve her iki borda feneri birlikte görülüyorsa gemi neredeyse tam pruvanızdadır — head-on durumu.",
            source: { code: "COLREG Kural 14", detail: "Pruva pruvaya durum" },
            next: "step2",
          },
          {
            text: "Geçme durumu (overtaking)",
            outcome: "danger",
            feedback:
              "Yanlış. Geçilen gemiyi kıçından (genelde sadece pupa feneri) görürsünüz. Burada iki borda feneri birden görünüyor.",
            source: { code: "COLREG Kural 13", detail: "Geçme durumu fenerleri" },
            next: "step2",
          },
          {
            text: "Kavşak durumu (crossing)",
            outcome: "danger",
            feedback:
              "Yanlış. Kavşakta tek borda feneri (kırmızı VEYA yeşil) görürsünüz. İki borda feneri birden head-on'a işaret eder.",
            source: { code: "COLREG Kural 15", detail: "Kavşakta tek borda feneri" },
            next: "step2",
          },
        ],
      },
      {
        id: "step2",
        situation:
          "Head-on durumunu teyit ettiniz. İki güçle yürüyen gemi karşı karşıya geliyor.",
        question: "Kural 14'e göre ne yaparsınız?",
        choices: [
          {
            text: "Sancağa dönerim; iskele-iskele (port-to-port) geçeriz",
            outcome: "safe",
            feedback:
              "Doğru. Head-on'da her iki gemi de sancağa döner ve birbirini iskele tarafından (port-to-port) geçer.",
            source: { code: "COLREG Kural 14(a)", detail: "Her iki gemi sancağa döner" },
            next: "step3",
          },
          {
            text: "İskeleye dönerim",
            outcome: "danger",
            feedback:
              "Tehlikeli. İskeleye dönmek karşı geminin sancak manevrasıyla çakışır ve çatışmaya yol açar.",
            source: { code: "COLREG Kural 14", detail: "İskele dönüş yasak" },
            next: "step3",
          },
          {
            text: "Rotamı korurum, karşı gemi dönsün",
            outcome: "danger",
            feedback:
              "Yanlış. Head-on'da stand-on gemi yoktur; her İKİ gemi de manevra yapmakla yükümlüdür.",
            source: { code: "COLREG Kural 14", detail: "Karşılıklı yükümlülük" },
            next: "step3",
          },
        ],
      },
      {
        id: "step3",
        situation:
          "Sancağa dönmeye karar verdiniz ancak karşı gemi henüz manevra yapmıyor görünüyor.",
        question: "Manevrayı nasıl güçlendirirsiniz?",
        choices: [
          {
            text: "Erken ve belirgin sancak manevrası yapar, bir kısa düdük çalarım",
            outcome: "safe",
            feedback:
              "Doğru. Sancağa dönüşü 'bir kısa düdük' ile bildirirsiniz (Kural 34(a)); manevra erken ve belirgin olmalıdır.",
            source: { code: "COLREG Kural 34(a) & 8", detail: "Bir kısa düdük = sancağa alıyorum" },
          },
          {
            text: "Karşı gemi dönene kadar beklerim",
            outcome: "danger",
            feedback:
              "Tehlikeli. Beklemek değerli zamanı harcar; yükümlülüğünüz erken manevra yapmaktır.",
            source: { code: "COLREG Kural 8(a)", detail: "Erken eylem" },
          },
          {
            text: "İskeleye kaçarım",
            outcome: "danger",
            feedback:
              "Tehlikeli. Head-on'da iskeleye dönmek kuralın tam tersidir ve çatışma riskini artırır.",
            source: { code: "COLREG Kural 14", detail: "Sancağa dön" },
          },
        ],
      },
    ],
    debrief:
      "İki direk feneri bir hatta + her iki borda feneri birlikte görünüyorsa durum HEAD-ON'dur (Kural 14). Çözüm: her iki gemi de SANCAĞA döner ve İSKELE-İSKELE (port-to-port) geçer. Manevra erken/belirgin olmalı ve 'bir kısa düdük' ile bildirilmelidir (Kural 34(a)). Head-on'da stand-on gemi yoktur — yükümlülük karşılıklıdır.",
  },
];
