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
              "Yanlış. Sancağınızdaki gemiye yol vermek zorundasınız. Stand-on durumu, gemiyi iskele tarafınızda gördüğünüzde geçerli olurdu.",
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
            text: "İskele tarafına dönerim",
            outcome: "danger",
            feedback:
              "Tehlikeli. İskele tarafına dönmek sizi karşı geminin önüne sokar ve çatışma riskini artırır. Kavşakta give-way gemi karşının önünden geçmekten kaçınmalıdır.",
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
      "Kavşak durumunda gemiyi SANCAĞINIZDA görüyorsanız yol verme (give-way) yükümlüsüsünüz (Kural 15). Çözüm: SANCAĞA erken ve belirgin bir rota değişikliği yaparak karşı geminin KIÇINDAN geçmek (Kural 8 & 15). Karşının önünden geçmekten ve iskele tarafına dönmekten kaçının; manevrayı VHF anlaşmasına değil, kurallara ve ARPA teyidine dayandırın.",
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
      "Baş omuzluktaki hedefe iskele tarafına dönmekten kaçınmak",
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
            text: "Hemen iskele tarafına büyük bir alarkın yaparım",
            outcome: "danger",
            feedback:
              "Tehlikeli. Baş omuzluktaki (forward of the beam) bir hedef için iskele tarafına dönmekten kaçınılır. Önce hız ve plot.",
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
            source: { code: "COLREG Kural 19(d)(i)", detail: "İskele tarafına dönmekten kaçın" },
            next: "step3",
          },
          {
            text: "İskele tarafına dönerim",
            outcome: "danger",
            feedback:
              "Tehlikeli. Kural 19(d)(i) baş omuzluktaki hedef için iskele tarafına dönmeyi yasaklar (geçilen gemi durumu dışında).",
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
            text: "İskele tarafına dönerim",
            outcome: "danger",
            feedback:
              "Tehlikeli. İskele tarafına dönmek karşı geminin sancak manevrasıyla çakışır ve çatışmaya yol açar.",
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
            text: "İskele tarafına kaçarım",
            outcome: "danger",
            feedback:
              "Tehlikeli. Head-on'da iskele tarafına dönmek kuralın tam tersidir ve çatışma riskini artırır.",
            source: { code: "COLREG Kural 14", detail: "Sancağa dön" },
          },
        ],
      },
    ],
    debrief:
      "İki direk feneri bir hatta + her iki borda feneri birlikte görünüyorsa durum HEAD-ON'dur (Kural 14). Çözüm: her iki gemi de SANCAĞA döner ve İSKELE-İSKELE (port-to-port) geçer. Manevra erken/belirgin olmalı ve 'bir kısa düdük' ile bildirilmelidir (Kural 34(a)). Head-on'da stand-on gemi yoktur — yükümlülük karşılıklıdır.",
  },
  // ──────────────────────────────────────────────────────────────────────
  {
    id: "stand-on-rule17",
    topicKey: "navigation",
    title: "Yol Tutan Gemi (Stand-on): Karşı Manevra Yapmıyor",
    level: "officer",
    briefing:
      "Açık görüşte vardiyadasınız, rota 000°T, 14 knot. İSKELE tarafınızdan (nispi 315°) bir gemi kavşak rotasıyla yaklaşıyor; çatışma riski var. Kavşak kuralına göre yol verme yükümlüsü O gemidir; siz yol tutan (stand-on) gemisiniz.",
    learningGoals: [
      "Kavşakta stand-on (yol tutan) gemiyi tanımak",
      "Kural 17'nin aşamalı yetkisini doğru uygulamak",
      "İskele tarafındaki gemiye iskele tarafına dönmemek (Kural 17(c))",
    ],
    steps: [
      {
        id: "step1",
        situation:
          "Gemi iskele tarafınızda ve kavşak rotasında; yol verme yükümlüsü o. Henüz herhangi bir manevra yapmadı.",
        question: "İlk aşamada doğru davranış nedir?",
        choices: [
          {
            text: "Yol tutan gemiyim; rota ve hızımı korurum",
            outcome: "safe",
            feedback:
              "Doğru. Başlangıçta stand-on gemi rota ve hızını korur ki karşı gemi durumu doğru değerlendirip manevra yapabilsin.",
            source: { code: "COLREG Kural 17(a)(i)", detail: "Stand-on: rota/hızı koru" },
            next: "step2",
          },
          {
            text: "Hemen ben manevra yaparım, yol veririm",
            outcome: "risky",
            feedback:
              "Erken. Bu aşamada beklenmeyen bir manevra, karşı geminin değerlendirmesini bozabilir. Başlangıçta rotayı korumalısınız.",
            source: { code: "COLREG Kural 17(a)(i)", detail: "Önce rotayı koru" },
            next: "step2",
          },
          {
            text: "Yol verme yükümlüsü benim, hızı keserim",
            outcome: "danger",
            feedback:
              "Yanlış. Gemi iskele tarafınızda olduğundan yol verme yükümlüsü O. Stand-on rolünü doğru tanımlamalısınız.",
            source: { code: "COLREG Kural 15", detail: "Give-way / stand-on ayrımı" },
            next: "step2",
          },
        ],
      },
      {
        id: "step2",
        situation:
          "Mesafe kapanıyor ama yol verme yükümlüsü gemi hâlâ hiçbir manevra yapmıyor. Stand-on yetkiniz değişiyor.",
        question: "Şimdi ne yaparsınız?",
        choices: [
          {
            text: "Yol verenin manevra yapmadığı belli oldu; çatışmayı önlemek için kendim manevra yaparım",
            outcome: "safe",
            feedback:
              "Doğru. Kural 17(a)(ii) yol verenin gerekeni yapmadığı belli olduğunda stand-on gemiye tek başına manevra yapma yetkisi verir.",
            source: { code: "COLREG Kural 17(a)(ii)", detail: "Stand-on manevra yapabilir" },
            next: "step3",
          },
          {
            text: "Kural kural; sonuna kadar rotamı korurum",
            outcome: "danger",
            feedback:
              "Tehlikeli. Rotayı körü körüne korumak çatışmaya götürür. Kural 17 bu noktada manevraya İZİN/EMİR verir.",
            source: { code: "COLREG Kural 17(a)(ii)-(b)", detail: "Gerektiğinde manevra et" },
            next: "step3",
          },
          {
            text: "VHF'ten karşıyı arayıp 'rotamı koruyorum' derim",
            outcome: "risky",
            feedback:
              "Yetersiz. VHF anlaşmasına güvenmek yerine kurala uygun fiziksel manevra hazırlığı yapın.",
            source: { code: "COLREG Kural 17 / MGN", detail: "VHF'e güvenme" },
            next: "step3",
          },
        ],
      },
      {
        id: "step3",
        situation:
          "Tek başına manevra yapacaksınız. Karşı gemi sizin İSKELE tarafınızda.",
        question: "Hangi manevra Kural 17'ye uygundur?",
        choices: [
          {
            text: "Sancağa dönerim veya hızı keserim; iskele tarafına dönmem",
            outcome: "safe",
            feedback:
              "Doğru. Kural 17(c), kavşakta manevra yapan güçle yürüyen geminin, iskele tarafındaki gemi için iskele tarafına dönmemesini söyler. Sancağa dönüş veya hız kesme uygundur.",
            source: { code: "COLREG Kural 17(c)", detail: "İskeledeki gemiye iskele yasak" },
          },
          {
            text: "İskele tarafına dönerim",
            outcome: "danger",
            feedback:
              "Tehlikeli. İskele tarafınızdaki gemiye doğru iskele tarafına dönmek tam da kaçınılması gereken manevradır.",
            source: { code: "COLREG Kural 17(c)", detail: "İskele dönüş yasak" },
          },
          {
            text: "Hiçbir şey yapmam, çarpışmayı karşı gemi önlesin",
            outcome: "danger",
            feedback:
              "Tehlikeli. Çatışma yalnızca karşı geminin eylemiyle önlenemeyecek hâle geldiğinde stand-on gemi de çatışmayı önleyecek en iyi manevrayı yapmak ZORUNDADIR.",
            source: { code: "COLREG Kural 17(b)", detail: "Stand-on da önlem almak zorundadır" },
          },
        ],
      },
    ],
    debrief:
      "Kavşakta gemiyi İSKELE TARAFINIZDA görüyorsanız stand-on (yol tutan) gemisiniz. Aşama aşama Kural 17: önce rota/hızı koru (17(a)(i)); yol veren gerekeni yapmıyorsa kendin manevra yapabilirsin (17(a)(ii)); çatışma tek başına önlenemeyecekse manevra yapmak ZORUNDASIN (17(b)); ve iskele tarafındaki gemi için İSKELE TARAFINA DÖNME (17(c)) — sancağa dön veya hızı kes.",
  },
  // ──────────────────────────────────────────────────────────────────────
  {
    id: "overtaking-rule13",
    topicKey: "navigation",
    title: "Geçme Durumu (Overtaking)",
    level: "cadet",
    briefing:
      "Geceleyin, daha yavaş bir gemiye arkadan yetişiyorsunuz. Geminin yalnızca beyaz PUPA fenerini görüyorsunuz (borda fenerlerini görmüyorsunuz) ve ona kıçından, kıç bordasının 22.5°'sinden daha geriden yaklaşıyorsunuz.",
    learningGoals: [
      "Fener görünümünden geçme (overtaking) durumunu tanımak",
      "Kural 13'e göre geçen geminin yol verme yükümlülüğünü bilmek",
      "Tamamen geçip açılana dek yükümlülüğün sürdüğünü kavramak",
    ],
    steps: [
      {
        id: "step1",
        situation:
          "Önünüzdeki gemiden yalnızca pupa (kıç) fenerini görüyorsunuz; ona kıç tarafından yetişiyorsunuz.",
        question: "Bu durum nedir?",
        choices: [
          {
            text: "Geçme durumu (overtaking)",
            outcome: "safe",
            feedback:
              "Doğru. Bir gemiye kıç bordasının 22.5°'sinden daha geriden yaklaşıyor ve yalnızca pupa fenerini görüyorsanız, geçen (overtaking) gemisinizdir.",
            source: { code: "COLREG Kural 13(b)", detail: "Pupa feneri görünümü = geçme" },
            next: "step2",
          },
          {
            text: "Kavşak durumu (crossing)",
            outcome: "danger",
            feedback:
              "Yanlış. Kavşakta borda feneri (kırmızı/yeşil) görürsünüz. Yalnızca pupa feneri görüyorsanız durum geçmedir.",
            source: { code: "COLREG Kural 13(c)", detail: "Şüphe varsa geçme kabul et" },
            next: "step2",
          },
          {
            text: "Pruva pruvaya (head-on)",
            outcome: "danger",
            feedback:
              "Yanlış. Head-on'da iki borda fenerini birlikte görürsünüz. Tek pupa feneri geçme durumudur.",
            source: { code: "COLREG Kural 14", detail: "Head-on fener görünümü farklıdır" },
            next: "step2",
          },
        ],
      },
      {
        id: "step2",
        situation: "Geçme durumunu teyit ettiniz.",
        question: "Yükümlülüğünüz nedir?",
        choices: [
          {
            text: "Geçen gemi olarak yol veririm; geçilen gemiden uzak dururum",
            outcome: "safe",
            feedback:
              "Doğru. Geçen gemi, geçilen gemiye yol vermek zorundadır; geçilen gemi rota ve hızını korur.",
            source: { code: "COLREG Kural 13(a)", detail: "Geçen gemi yol verir" },
            next: "step3",
          },
          {
            text: "Ben hızlıyım, geçilen gemi bana yol versin",
            outcome: "danger",
            feedback:
              "Yanlış. Yol verme yükümlüsü daima geçen gemidir; geçilen gemi stand-on'dır.",
            source: { code: "COLREG Kural 13(a)", detail: "Yükümlülük geçen gemide" },
            next: "step3",
          },
          {
            text: "Kavşak gibi davranır, sancaktaki kural neyse onu uygularım",
            outcome: "risky",
            feedback:
              "Hatalı çerçeve. Bu bir geçme durumudur; kavşak kuralları değil Kural 13 geçerlidir.",
            source: { code: "COLREG Kural 13", detail: "Geçme, kavşaktan ayrıdır" },
            next: "step3",
          },
        ],
      },
      {
        id: "step3",
        situation:
          "Geçerken iki gemi arasındaki kerteriz yavaşça değişti ve gemi artık baş omuzluğunuza düşmeye başladı.",
        question: "Kerteriz değiştiğine göre durum kavşağa mı döndü?",
        choices: [
          {
            text: "Hayır; tamamen geçip açılana dek geçen gemi olarak yol vermeye devam ederim",
            outcome: "safe",
            feedback:
              "Doğru. Kural 13(d): sonradan kerterizin değişmesi durumu kavşağa çevirmez; geçen gemi tamamen geçip açılana dek yükümlüdür.",
            source: { code: "COLREG Kural 13(d)", detail: "Kerteriz değişimi durumu değiştirmez" },
          },
          {
            text: "Evet; artık kavşak oldu, stand-on gemi benim",
            outcome: "danger",
            feedback:
              "Tehlikeli. Kerteriz değişimi geçmeyi kavşağa çevirmez; yükümlülüğünüz sürer. Aksini düşünmek kazaya yol açar.",
            source: { code: "COLREG Kural 13(d)", detail: "Geçme yükümlülüğü sürer" },
          },
          {
            text: "Geçişi hızlandırmak için geçilen geminin hemen önünden keserim",
            outcome: "danger",
            feedback:
              "Tehlikeli. Yeterli mesafe bırakmadan önden kesmek çatışma riski yaratır; emniyetli mesafede geçip açılmalısınız.",
            source: { code: "COLREG Kural 13(a) & 8", detail: "Emniyetli mesafede geç" },
          },
        ],
      },
    ],
    debrief:
      "Bir gemiye kıç bordasının 22.5°'sinden geriden yaklaşıp yalnızca PUPA fenerini görüyorsanız durum GEÇME'dir (Kural 13). Geçen gemi yol verir; geçilen gemi rota/hızını korur. En kritik nokta: sonradan kerteriz değişse bile durum kavşağa DÖNMEZ (13(d)) — tamamen geçip açılana dek yükümlülüğünüz sürer.",
  },
];
