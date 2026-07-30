import type { TopicDetailContent } from "@/data/navigationTopicContents";

/**
 * Operasyonel seyir yeterlilikleri.
 * Bu içerikler klasik teori anlatımını, vardiya zabitinin gerçek karar ve işlem sırasıyla tamamlar.
 */
export const operationalNavigationTopicContents: Record<string, TopicDetailContent> = {
  "DR, EP ve Set-Drift ile Mevki İlerletme": {
    title: "DR, EP ve Set-Drift ile Mevki İlerletme",
    introduction:
      "Ölü hesap mevkii (DR) ile tahmini mevki (EP) aynı değildir. DR yalnızca son güvenilir mevkiden itibaren rota, suya göre hız ve zamanla ilerletilir. EP ise DR üzerine akıntı, rüzgâr kaynaklı leeway ve bilinen diğer dış etkilerin uygulanmasıyla elde edilir. Bu ayrım, GNSS kaybında ve elektronik mevkiin şüpheli olduğu durumlarda seyir emniyetinin temelidir.",
    sections: [
      {
        title: "DR ve EP Arasındaki Operasyonel Ayrım",
        content:
          "DR mevkii, son fix noktasından itibaren geminin hakiki rotası, suya göre hızı ve geçen zaman kullanılarak bulunur; akıntı ve rüzgâr etkileri hesaba katılmaz. EP ise beklenen set, drift ve leeway uygulanmış tahmini gerçek mevkidir. Haritada DR ve EP farklı sembollerle, saat ve log mesafesiyle işaretlenmelidir. GNSS mevcut olsa dahi DR hattı belirli aralıklarla sürdürülür; böylece elektronik mevki sıçraması, yanlış sensör veya datum hatası erken fark edilir.",
        bulletPoints: [
          "DR: course through the water + speed through the water + time.",
          "EP: DR + current set/drift + leeway + bilinen diğer dış etkiler.",
          "Fix ile DR arasındaki fark, gerçek set ve driftin değerlendirilmesini sağlar.",
          "GNSS kaybında en son doğrulanmış fix, yeni DR zincirinin başlangıcıdır.",
        ],
      },
      {
        title: "Set ve Driftin Bulunması",
        content:
          "Aynı zaman için çizilmiş DR mevkii ile bağımsız fix arasındaki vektör akıntının toplam etkisini gösterir. DR'den fix'e olan yön set, aradaki mesafenin geçen saate bölümü drift'tir. Tek bir karşılaştırma anlık sapma gösterebilir; güvenilir akıntı değerlendirmesi için art arda fixler, gelgit bilgisi, rüzgâr ve rota değişimleri birlikte incelenir.",
        formula: {
          text: "Set = DR'den Fix'e hakiki yön | Drift (kn) = DR-Fix mesafesi (nm) / süre (h)",
          description: "Vektör yalnızca aynı zaman damgasına ait DR ve fix noktaları arasında çizilir.",
        },
      },
      {
        title: "Course to Steer ve Beklenen Track",
        content:
          "İstenen ground track'i tutmak için geminin başı akıntıya karşı düzeltilir. Önce hedef track vektörü, sonra akıntı vektörü ve geminin suya göre hız vektörü çizilir. Elde edilen rota course to steer, beklenen yer hızı ise SOG'dir. Hesap kağıt haritada vektör üçgeniyle veya güvenilir elektronik araçla yapılabilir; sonuç, gerçek fixlerle sürekli kontrol edilir.",
        bulletPoints: [
          "Heading ile track aynı değildir.",
          "STW ile SOG aynı değildir.",
          "Akıntı değiştikçe course to steer yeniden hesaplanır.",
          "Dar sularda yalnızca hesaplanan değere güvenilmez; PI, radar mesafesi ve görsel transitlerle izlenir.",
        ],
      },
      {
        title: "GNSS Kaybında Uygulama Sırası",
        content:
          "GNSS kaybı veya spoofing şüphesinde vardiya zabiti son güvenilir fix zamanını belirler, alternatif sensörleri kontrol eder, ECDIS position source durumunu doğrular ve manuel DR/EP zincirini başlatır. Radar mesafesi/kerterizi, görsel kerteriz, echo sounder, paralel indeks ve derinlik konturlarıyla mevki doğrulanır. Kaptan erken çağrılır; mevki güvenilirliği düşüyorsa hız azaltılır, emniyetli suya yönelinir ve gerekirse rota askıya alınır.",
      },
    ],
    keyPoints: [
      "DR dış etkisiz hesap mevkidir; EP dış etkiler uygulanmış tahmini mevkidir.",
      "Aynı zamandaki DR–fix farkı set ve drifti verir.",
      "Elektronik mevki varken de DR zinciri emniyet çapraz kontrolüdür.",
      "GNSS şüphesinde hız, rota ve kaptanı çağırma kararı erken verilir.",
    ],
  },

  "Köprüüstü Vardiyası, Standing Orders ve Kaptanı Çağırma": {
    title: "Köprüüstü Vardiyası, Standing Orders ve Kaptanı Çağırma",
    introduction:
      "Vardiya zabiti kaptan köprüüstüne gelene kadar geminin emniyetli seyrinden sorumludur. Standing Orders, Night Orders ve şirket SMS'i vardiyanın karar sınırlarını tanımlar. Şüphede kaptanı çağırmak yetersizlik değil; profesyonel risk yönetimidir.",
    sections: [
      {
        title: "Vardiyayı Devralmadan Önce",
        content:
          "Devralan zabit yeterince dinlenmiş olmalı, karanlığa göz uyumu sağlamalı ve vardiyayı kabul etmeden önce mevki, rota, hız, trafik, hava, makine durumu, dümen modu, seyir planı, XTE limitleri, yaklaşan waypointler, harita düzeltmeleri, GMDSS/VTS nöbeti ve kaptanın özel talimatlarını bizzat doğrulamalıdır. Manevra, yoğun trafik veya kritik olay sırasında devir teslim yapılmaz.",
        bulletPoints: [
          "Mevkiyi yalnız sözlü değil bağımsız yöntemle doğrula.",
          "Radar ayarlarını, hedef takibini ve alarm limitlerini kontrol et.",
          "ECDIS safety contour, safety depth, XTE ve look-ahead ayarlarını doğrula.",
          "Standing Orders ve o geceye ait Night Orders okunup imzalanmalıdır.",
        ],
      },
      {
        title: "Kaptanı Derhâl Çağırma Kriterleri",
        content:
          "Kaptanın gemiye özel talimatları her zaman önceliklidir. Genel olarak görüş kötüleştiğinde, trafik veya CPA/TCPA emniyet sınırına yaklaştığında, mevki şüpheli olduğunda, rota planı sürdürülemediğinde, beklenmeyen sığlık/derinlik görüldüğünde, dümen-makine-seyir cihazı arızasında, hava hızla kötüleştiğinde, demir taramasında, pilot/VTS talimatı şüpheli olduğunda, tehlike mesajı alındığında veya zabit herhangi bir nedenle emin olmadığında kaptan çağrılır.",
        bulletPoints: [
          "Kısıtlı görüş veya görüşte hızlı düşüş.",
          "Beklenmeyen trafik, yakın geçiş veya COLREG kararında belirsizlik.",
          "Mevki koyamama, GNSS/ECDIS/gyro/radar uyuşmazlığı.",
          "Makine, dümen, alarm veya haberleşme arızası.",
          "Ağır hava, buz, su alma, yük kayması veya stabilite şüphesi.",
          "Kaptanın belirlediği call point, waypoint, derinlik veya CPA limitine yaklaşma.",
        ],
      },
      {
        title: "Kaptanın Komutayı Devralması",
        content:
          "Kaptanın köprüüstünde bulunması tek başına komutayı devraldığı anlamına gelmez. Devir açık ve sözlü olmalıdır: kaptan 'I have the con' veya eşdeğer net ifadeyle komutayı aldığını belirtir; vardiya zabiti bunu teyit eder. Zabitin gözcülük, radar takibi, kayıt ve çapraz kontrol görevleri devam eder. Kaptan komutayı geri verirken de aynı açıklık kullanılır.",
      },
      {
        title: "Vardiya Kayıtları ve Değişiklik Yönetimi",
        content:
          "Rota/hız değişiklikleri, kaptanın çağrılması ve köprüüstüne gelişi, cihaz arızaları, kısıtlı görüş tedbirleri, pilot alma-bırakma, VTS raporları, önemli hava değişimleri ve olağandışı olaylar uygun loglara zamanında kaydedilir. Seyir planındaki değişiklik kaptan onayı, risk değerlendirmesi, ECDIS/harita güncellemesi ve ekip brifingi olmadan uygulanmaz.",
      },
    ],
    keyPoints: [
      "Vardiya, devralan zabit durumu bizzat doğrulamadan teslim alınmaz.",
      "Şüphede erken çağrı yapılır; geç çağrı ciddi bir köprüüstü hatasıdır.",
      "Kaptanın komutayı alması ve geri vermesi açık sözlü teyit gerektirir.",
      "Kritik karar ve arızalar doğru loga, doğru zamanla kaydedilir.",
    ],
  },

  "Master-Pilot Exchange ve Pilotaj Vardiyası": {
    title: "Master–Pilot Exchange ve Pilotaj Vardiyası",
    introduction:
      "Pilot yerel bilgi ve manevra tavsiyesi sağlar; geminin emniyeti ve kaptanın sorumluluğu ortadan kalkmaz. Emniyetli pilotaj, planın pilotla paylaşılması, karşılıklı bilgi alışverişi, kapalı döngü haberleşme ve köprüüstü ekibinin aktif izleme yapmasıyla yürütülür.",
    sections: [
      {
        title: "Pilot Gelmeden Önce Hazırlık",
        content:
          "Pilot card, wheelhouse poster, manoeuvring booklet, güncel draftlar, trim, UKC hesabı, makine ve dümen durumu, thruster/römorkör durumu, demirlerin hazırlığı, yanaşma planı ve abort noktaları hazır edilir. Pilot merdiveni operasyonu ayrı kontrol listesiyle yürütülür. Köprüüstü ekip görevleri; conning, radar/ECDIS izleme, dümen/makine emirlerinin tekrarı ve kayıt olarak dağıtılır.",
      },
      {
        title: "Master-Pilot Information Exchange",
        content:
          "Kaptan pilotla planlanan rota, hız profili, wheel-over noktaları, UKC, gelgit/akıntı, römorkör kullanımı, yanaşma bordası, halat sırası, makine sınırlamaları, durma/dönme özellikleri, arıza veya özel riskleri paylaşır. Pilot yerel trafik, VTS, sığlık, akıntı, römorkör planı ve beklenen manevra sırasını açıklar. Anlaşılmayan veya farklı düşünülen her nokta seyir başlamadan çözülür.",
        bulletPoints: [
          "Planlanan rota ve alternatif/abort planı.",
          "Minimum UKC ve kritik derinlikler.",
          "Dönüş noktaları, hız düşürme noktaları ve römorkör bağlantısı.",
          "Makine, dümen, thruster ve demirlerin kullanılabilirliği.",
          "İletişim dili, komut zinciri ve kapalı döngü teyit yöntemi.",
        ],
      },
      {
        title: "Pilotaj Sırasında OOW Görevleri",
        content:
          "Vardiya zabiti pilotun talimatlarını pasif biçimde izlemez. Gemi mevkii, XTE, PI, radar mesafeleri, echo sounder, heading, ROT ve hız sürekli kontrol edilir. Pilotun emri planla veya emniyetle uyuşmuyorsa derhâl kaptana bildirilir ve netleştirme istenir. Dümen ve makine emirleri tekrar edilir; uygulanan sonuç göstergelerden doğrulanır.",
      },
      {
        title: "Pilotla Anlaşmazlık ve Müdahale",
        content:
          "Pilot tavsiyesi gemiyi tehlikeye sokuyorsa kaptan müdahale eder, talimatı değiştirir veya komutayı fiilen yürütür. Köprüüstü ekibi otorite gradyanına kapılmadan challenge-and-response yaklaşımı kullanır. Belirsiz VHF anlaşmaları yerine COLREG ve gözlemlenen gerçek durum esas alınır. Gerekirse manevra durdurulur, hız kesilir, demir veya römorkör kullanımıyla emniyetli durum oluşturulur.",
      },
    ],
    keyPoints: [
      "Pilot geminin kaptanı değildir; kaptanın nihai sorumluluğu sürer.",
      "MPE, rota kadar geminin gerçek manevra sınırlamalarını da kapsar.",
      "OOW pilotajda aktif çapraz kontrol yapar ve sapmayı derhâl bildirir.",
      "Emniyet şüphesinde otorite gradyanına rağmen müdahale edilir.",
    ],
  },

  "Seyir Cihazı Arızaları ve Yedek Seyir": {
    title: "Seyir Cihazı Arızaları ve Yedek Seyir",
    introduction:
      "Köprüüstü cihazlarının hiçbiri tek başına mutlak güvenilir değildir. Zabit; arızayı tanımalı, etkisini sınırlamalı, alternatif sensöre geçmeli ve gemiyi emniyetli suya taşıyacak yedek seyir düzenini gecikmeden kurmalıdır.",
    sections: [
      {
        title: "GNSS Kaybı, Jamming ve Spoofing",
        content:
          "Ani mevki sıçraması, COG/SOG ile radar-görsel durumun uyuşmaması, aynı yerde bulunan iki alıcının farklı değer göstermesi veya AIS hedeflerinin topluca kayması GNSS anomalisi işareti olabilir. ECDIS position source doğrulanır, ikinci alıcı ve radar/görsel fixlerle karşılaştırma yapılır, son güvenilir fixten DR/EP başlatılır ve kaptan çağrılır. Emniyet marjı artırılır; dar suya giriş ertelenebilir.",
      },
      {
        title: "Gyro ve Manyetik Pusula Arızası",
        content:
          "Gyro hatasında repeaterlar, radar/ECDIS heading girdisi, autopilot ve AIS etkilenebilir. Manyetik pusula ile mukayese, gök cismi/terrestrial azimut ve transitlerle hata belirlenir. Sistem magnetic heading'e geçirilecekse variation/deviation uygulanır ve tüm kullanıcılara heading kaynağı değişikliği bildirilir. Autopilot güvenilmezse elle dümen ve ek dümenci uygulanır.",
      },
      {
        title: "Radar, ECDIS, AIS ve Log Arızaları",
        content:
          "Radar arızasında görüş, trafik ve kıyı mesafesine göre hız azaltılır; ikinci radar varsa bağımsız çalışması doğrulanır. ECDIS arızasında onaylı back-up düzenine geçilir; ikinci ECDIS veya güncel kağıt haritalar kullanılır. AIS arızası gözcülük yükümlülüğünü azaltmaz. Speed log arızasında rpm, GNSS SOG ve bilinen akıntıdan yaklaşık STW değerlendirilir; ARPA true vector sonuçlarının güvenilirliği yeniden sorgulanır.",
      },
      {
        title: "Dümen ve Autopilot Arızası",
        content:
          "Autopilot arızasında elle dümen denenir; steering control, power unit ve bridge/steering gear compartment kontrol transferi prosedüre göre yapılır. Ana dümen kontrolü kaybedilirse kaptan ve makine dairesi çağrılır, hız azaltılır, trafik uyarılır, uygun ses/ışık işaretleri ve gerekiyorsa urgency mesajı hazırlanır. Emergency steering ekibi haberleşme ve pusula tekrarıyla çalışır.",
      },
      {
        title: "Arıza Sonrası Ortak Karar Sırası",
        content:
          "Her arızada ortak sıra: arızayı doğrula, etkilediği bağımlı sistemleri belirle, kaptanı çağır, yedek sisteme geç, hız/rota ile riski azalt, ekip ve VTS/çevre trafiğini bilgilendir, gerekli kayıt ve arıza raporunu tamamla. Cihaz tekrar çalışsa bile kök neden anlaşılmadan tek kaynak olarak kullanılmaz.",
      },
    ],
    keyPoints: [
      "Sensör arızası bağlı sistemleri zincirleme etkileyebilir.",
      "Son güvenilir fix ve bağımsız doğrulama yedek seyrin başlangıcıdır.",
      "Arızada hız azaltma ve kaptanı erken çağırma temel risk kontrolüdür.",
      "Cihaz geri geldiğinde doğrulanmadan güvenilir kabul edilmez.",
    ],
  },

  "Ağır Havada Seyir ve Gemi Kullanma": {
    title: "Ağır Havada Seyir ve Gemi Kullanma",
    introduction:
      "Ağır hava yönetimi yalnızca güverteyi emniyete almak değildir. Rota, hız, dalga yönü, geminin stabilitesi, yük durumu ve yapısal sınırlar birlikte değerlendirilir. Amaç programa yetişmek değil; slamming, parametric rolling, broaching, green water ve yük kayması risklerini kabul edilebilir seviyede tutmaktır.",
    sections: [
      {
        title: "Ağır Hava Öncesi Hazırlık",
        content:
          "Güncel hava haritaları ve rota tahminleri değerlendirilir; kaptan ve makine dairesi bilgilendirilir. Hatch coverlar, kapılar, ventilatörler, güverte yükleri, demirler, pilot merdiveni donanımı ve hareketli malzemeler sea-secure yapılır. Tank seviyeleri ve serbest yüzey etkisi kontrol edilir, balast planı hazırlanır, sintine ve scupperlar kontrol edilir. Dümen ve makine hazır tutulur; personel güverteye çıkışları sınırlandırılır.",
      },
      {
        title: "Rota ve Hız Seçimi",
        content:
          "Baş dalgada yüksek hız slamming, pounding ve green water riskini artırır; hız düşürülür ve gerekirse dalga omuzluktan alınır. Kıçtan gelen dalgada surf-riding, broaching ve dümen kaybı riski değerlendirilir. Bordadan dalga synchronous rolling yaratabilir. En güvenli rota, gemi tipine ve yük durumuna göre değişir; sabit bir 'ideal açı' yoktur. Değişiklikler yeterli deniz alanı bırakılarak erken yapılır.",
      },
      {
        title: "Parametric ve Synchronous Rolling",
        content:
          "Synchronous rolling, dalga karşılaşma periyodunun geminin doğal yalpa periyoduna yaklaşmasıyla büyüyen yalpadır. Parametric rolling ise özellikle baş/kıç dalgada su hattı şeklinin ve stabilitenin periyodik değişmesiyle ani büyük yalpa üretir. Rota veya hız değiştirilerek karşılaşma periyodu bozulur; yalnız küçük dümen değişiklikleriyle devam edilmez. Konteyner ve Ro-Ro gemilerinde yük bağları yakından izlenir.",
      },
      {
        title: "Operasyonel İzleme ve Kayıt",
        content:
          "Yalpa/pitch davranışı, slamming, pervane racing, baş güvertesine su binmesi, hatch leakage, yük kayması, tank soundingleri ve yapısal sesler izlenir. Eşik aşılırsa rota/hız yeniden değiştirilir. Ağır hava hasarı, kayıp yük, konteyner kaybı veya kirlilik tehdidi uygun makamlara raporlanır; olay zamanı, mevki, hava ve alınan tedbirler loga yazılır.",
      },
    ],
    keyPoints: [
      "Ağır hava kararı gemi tipi, yük ve stabiliteye özgüdür.",
      "Hız azaltmak çoğu dinamik yükü güçlü biçimde düşürür.",
      "Synchronous/parametric rolling rota veya hız değişikliğiyle kırılır.",
      "Sea-secure, tank yönetimi ve sürekli izleme seyir kararının parçasıdır.",
    ],
  },
};
