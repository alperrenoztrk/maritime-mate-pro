import type { CrewTaskLongForm } from "../types";

const content: CrewTaskLongForm = {
  title: "Kumanya stok yönetimi ve sipariş",
  roleSlug: "asci",
  taskIndex: 2,
  estimatedPages: 24,
  intro: `Gemi Aşçısı, kuru erzak, soğuk/dondurulmuş gıda, taze sebze/meyve ve temel malzeme stoklarının takibinden, ikmal (provisioning) listelerinin hazırlanmasından ve liman teslimatlarının kalite kontrolünden sorumludur. Bu görev; son kullanma tarihi takibini, FIFO (First In First Out) uygulamasını, tüketim hızına göre miktar hesabını, bütçe (victualling rate) kontrolünü ve soğuk zincir uyumlu teslim almayı kapsar. İyi stok yönetimi hem gıda israfını hem de seferin ortasında malzeme tükenmesini önler. Bu bölüm, aşçının stok döngüsünü adım adım açıklar.`,
  sources: [
    "MLC 2006 — Standard A3.2 (Food and Catering, supplies)",
    "WHO — Guide to Ship Sanitation (storage of food)",
    "Codex Alimentarius — General Principles of Food Hygiene (storage)",
    "Nautical Institute — Ship Catering & Provisioning best practice",
    "Company Catering / Victualling Procedures (SMS)",
    "FAO — Food Loss and Waste reduction guidance",
  ],
  chapters: [
    {
      heading: "1. Stok Kategorileri ve Takip Sistemi",
      sections: [
        {
          subheading: "1.1 Kumanyanın temel kategorileri",
          paragraphs: [
            `Gemi kumanyası dört ana kategoride yönetilir: kuru erzak (dry stores — un, pirinç, makarna, konserve, baharat), soğutulmuş gıda (chilled — süt, peynir, taze et, sebze/meyve), dondurulmuş gıda (frozen — et, balık, dondurulmuş sebze) ve içecek/temel malzeme. Her kategori farklı depoda, farklı sıcaklıkta saklanır ve farklı raf ömrüne sahiptir. Aşçı, her kategori için ayrı stok kaydı tutar.`,
            `Stok takibi, kâğıt envanter defteri veya gemi yazılımı (catering/inventory module) ile yürütülür. Her teslim alımda giriş, her tüketimde çıkış işlenir; böylece anlık mevcut (running balance) bilinir. Düzenli fiziksel sayım (genellikle aylık), kayıt ile gerçeği eşler ve sapmaları (israf, hata) ortaya çıkarır.`,
          ],
          table: {
            caption: `Kumanya Kategorileri ve Depolama Koşulları`,
            headers: ["Kategori", "Depo", "Sıcaklık", "Tipik Raf Ömrü"],
            rows: [
              ["Kuru erzak", "Dry store", "Serin, kuru (<25°C)", "Aylar - yıllar"],
              ["Soğutulmuş gıda", "Chill room", "0-5°C", "Günler - haftalar"],
              ["Dondurulmuş", "Freezer", "≤ -18°C", "Aylar"],
              ["Taze sebze/meyve", "Vegetable room", "8-12°C", "Günler - haftalar"],
              ["İçecek/su", "Dry/cool store", "Oda/serin", "Aylar"],
            ],
          },
        },
        {
          subheading: "1.2 Minimum stok seviyesi ve emniyet tamponu",
          paragraphs: [
            `Aşçı, her temel kalem için minimum stok seviyesi (par level) ve emniyet tamponu belirler. Bir sonraki ikmal limanına kadar yetecek miktara ek olarak, sefer gecikmesine karşı birkaç günlük "emergency provisions" tutulur. Bir kalem minimum seviyeye yaklaştığında sipariş listesine eklenir; tükenmeden önce yenilenir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "Emergency provisions tamponu",
              text: `Liman beklemesi, hava muhalefeti veya makine arızası seferi uzatabilir. Daima birkaç günlük dayanıklı erzak (konserve, kuru, dondurulmuş) tampon olarak tutulmalı, bu stok rutin tüketime açılmamalıdır.`,
            },
          ],
        },
      ],
    },
    {
      heading: "2. Son Kullanma Tarihi ve FIFO Uygulaması",
      sections: [
        {
          subheading: "2.1 FIFO (First In First Out) disiplini",
          paragraphs: [
            `FIFO, "önce giren önce çıkar" prensibidir: yeni gelen stok arkaya/alta, mevcut stok öne/üste yerleştirilir; böylece eski ürün önce tüketilir. Bu, son kullanma tarihi geçen ürünü ve israfı önler. Aşçı, her ikmal sonrası rafları FIFO'ya göre yeniden düzenler; yeni kutuyu eskinin önüne koymak tipik bir hatadır.`,
            `Tarih hassasiyeti yüksek ürünlerde (süt, taze et) FEFO (First Expired First Out — önce son kullanma tarihi gelen önce çıkar) daha doğrudur; aşçı, salt giriş sırasına değil gerçek son kullanma tarihine göre tüketim sırası kurar. Açılan ürünler açılış tarihiyle etiketlenir ve kısa sürede tüketilir.`,
          ],
          callouts: [
            {
              type: "tip",
              title: "FEFO: tarihe göre rotasyon",
              text: `Bazen yeni gelen ürünün son kullanma tarihi, raftaki eskiden daha yakındır. Bu durumda salt FIFO yerine FEFO uygulanır: tarihi en yakın olan önce kullanılır.`,
            },
          ],
        },
        {
          subheading: "2.2 Son kullanma tarihi kontrolü",
          paragraphs: [
            `Aşçı, düzenli olarak (haftalık) raf taraması yaparak son kullanma tarihi yaklaşan ürünleri öne alır ve menüye dahil eder. "Best before" (tavsiye edilen tüketim) ile "use by" (son kullanma) farkı bilinir: use by tarihi geçen ürün güvenlik nedeniyle kullanılmaz; best before geçen bazı dayanıklı ürünler değerlendirme ile kullanılabilir. Şüphede olan ürün atılır; "şüphedeysen at" temel kuraldır.`,
          ],
        },
      ],
    },
    {
      heading: "3. Tüketim Hesabı ve Sipariş Miktarı",
      sections: [
        {
          subheading: "3.1 Kişi-gün bazlı tüketim hesabı",
          paragraphs: [
            `Sipariş miktarı, "kişi sayısı x gün sayısı x kişi başı tüketim" formülüyle hesaplanır. Aşçı, geçmiş sefer verilerinden her temel kalem için kişi-gün tüketimini bilir (örn. kişi başı günlük et, pirinç, ekmek, süt). Bir sonraki ikmale kadarki gün sayısı ve mürettebat sayısı ile çarpılarak gerekli miktar bulunur; üzerine emniyet tamponu eklenir.`,
            `Menü döngüsü, sipariş hesabının temelidir: planlı menüdeki tariflerin malzeme ihtiyacı toplanarak alışveriş listesi oluşturulur. Bu sayede ne fazla (israf/bozulma) ne eksik (tükenme) alınır. Mevcut stok düşülür; sadece eksik kalan miktar sipariş edilir.`,
          ],
          table: {
            caption: `Örnek Kişi-Gün Tüketim Tahmini (Kılavuz)`,
            headers: ["Kalem", "Kişi/Gün (yaklaşık)", "20 kişi x 30 gün İçin"],
            rows: [
              ["Taze/dondurulmuş et", "250-350 g", "150-210 kg"],
              ["Pirinç/makarna", "150-200 g", "90-120 kg"],
              ["Ekmek/un", "200-300 g", "120-180 kg"],
              ["Taze sebze", "300-400 g", "180-240 kg"],
              ["Süt", "200-300 ml", "120-180 L"],
            ],
          },
        },
        {
          subheading: "3.2 İkmal listesi (requisition) hazırlığı",
          paragraphs: [
            `Aşçı, hesapladığı eksikleri kategori ve tedarikçi düzenine göre bir requisition (ikmal talebi) listesinde toplar. Liste, kaptan/chief steward onayından geçer ve ship chandler'a (gemi malzeme tedarikçisi) iletilir. Listeye ürün tanımı, marka/kalite, miktar, birim ve teslim limanı yazılır; belirsiz talep yanlış teslimata yol açar.`,
          ],
        },
      ],
    },
    {
      heading: "4. Bütçe ve Victualling Rate Kontrolü",
      sections: [
        {
          subheading: "4.1 Kişi başı günlük gıda bütçesi",
          paragraphs: [
            `Şirket, kişi başı günlük gıda bütçesini (victualling rate, USD/kişi/gün) belirler. Aşçı, sipariş ve tüketimi bu bütçe içinde tutar; menüyü dengeli ama maliyet-etkin planlar. Ucuz dolgu yiyecekle bütçe kısmak kalite ve morali düşürür; savurganlık ise bütçeyi aşar. Denge, deneyimli aşçının becerisidir.`,
            `Aşçı, dönemsel (aylık) gıda harcamasını izler ve raporlar. Mevsimsel fiyat, liman pahalılığı ve döviz farkı bütçeyi etkiler; pahalı limanlarda kritik olmayan alımı erteleyip ucuz limanda stoklamak akıllı bir taktiktir.`,
          ],
          callouts: [
            {
              type: "reference",
              title: "MLC 2006 — yeterli ve ücretsiz gıda",
              text: `Gıda mürettebata ücretsiz sağlanır ve nicelik/kalite/çeşitlilik bakımından yeterli olmalıdır. Bütçe disiplini, bu yeterliliği zedelememelidir; aşırı kısıtlama MLC ihlali oluşturabilir.`,
            },
          ],
        },
        {
          subheading: "4.2 İsraf azaltma ve maliyet optimizasyonu",
          paragraphs: [
            `Gıda israfı doğrudan maliyet ve aynı zamanda MARPOL Ek V atık yüküdür. Aşçı; porsiyon kalibrasyonu, FIFO/FEFO disiplini, artan yemeğin güvenli yeniden değerlendirilmesi ve doğru saklama ile israfı azaltır. Bozulan ürün hem para hem de besin kaybıdır; doğru depolama bunu önler.`,
          ],
        },
      ],
    },
    {
      heading: "5. Liman Teslimatı ve Kalite Kontrolü",
      sections: [
        {
          subheading: "5.1 Teslim alımda muayene",
          paragraphs: [
            `İkmal teslimatı geldiğinde aşçı, her kalemi miktar, kalite ve sıcaklık açısından muayene eder. Soğutulmuş/dondurulmuş ürünün teslim sıcaklığı ölçülür; çözülme belirtisi olan, ambalajı hasarlı, son kullanma tarihi kısa veya bozulma kokusu/görünümü olan ürün reddedilir. Reddedilen kalem teslim belgesine işaretlenir ve tedarikçiye iade edilir.`,
            `Taze sebze/meyvede tazelik, çürük/küf yokluğu ve olgunluk derecesi kontrol edilir. Et/balıkta renk, koku, doku ve sıcaklık değerlendirilir. Aşçı, kabul ettiği teslimatı gecikmeden uygun depoya yerleştirir; rıhtımda sıcakta bekletmek soğuk zinciri kırar.`,
          ],
          callouts: [
            {
              type: "warning",
              title: "Soğuk zincir teslimde başlar",
              text: `Teslim sıcaklığı limit dışı (örn. dondurulmuş ürün -18°C üzerinde, çözülmüş) ise ürün reddedilir. Kabul edilen soğuk ürün dakikalar içinde uygun depoya alınmalı, rıhtımda bekletilmemelidir.`,
            },
          ],
        },
        {
          subheading: "5.2 Belgeleme ve uyuşmazlık",
          paragraphs: [
            `Teslim alınan ürün, irsaliye/fatura ile karşılaştırılır; eksik, fazla veya yanlış teslim kayda geçer. Kalite uyuşmazlığında aşçı, kaptan/şirketi bilgilendirir ve gerekirse fotoğrafla belgeler. Doğru kayıt, hem maliyet kontrolü hem de tedarikçiyle olası anlaşmazlığın çözümü için gereklidir.`,
          ],
        },
      ],
    },
    {
      heading: "6. Depolama Sonrası Stok Bakımı",
      sections: [
        {
          subheading: "6.1 Periyodik sayım ve rotasyon",
          paragraphs: [
            `Aşçı, periyodik (genellikle aylık) fiziksel stok sayımı yapar; kayıtla gerçek karşılaştırılır. Sayım sırasında son kullanma tarihleri taranır, FIFO/FEFO düzeni yenilenir, bozulan/şişen konserve ayıklanır. Bu rutin, hem doğru stok bilgisi hem de gizli bozulmanın erken yakalanması için kritiktir.`,
          ],
        },
        {
          subheading: "6.2 Kayıt ve raporlama",
          paragraphs: [
            `Stok hareketleri, sayım sonuçları ve harcama, dönemsel raporla kaptan/şirkete iletilir. Bu rapor; bütçe takibi, denetim kanıtı ve gelecek seferlerin planlaması için veri sağlar. Düzenli, doğru kayıt, profesyonel kumanya yönetiminin temelidir.`,
          ],
        },
      ],
    },
    {
      heading: "7. Tipik Sorunlar ve Çözümleri",
      sections: [
        {
          subheading: "7.1 Erken tükenme ve fazla stok",
          paragraphs: [
            `Bir kalemin beklenenden hızlı tükenmesi (örn. popüler bir ürün) menüyü bozar; aşçı tüketim verisini güncelleyip bir sonraki siparişte miktarı artırır. Tersine, fazla alınıp bozulan ürün hem israf hem maliyettir; sayım ve tüketim takibi ile sipariş miktarı kalibre edilir.`,
          ],
          callouts: [
            {
              type: "example",
              title: "Uzayan sefer, biten taze ürün",
              text: `Beklenmedik 5 günlük gecikmede taze sebze/meyve biterse, önceden planlanmış dondurulmuş/konserve tampon devreye girer. FIFO disiplini ve emniyet stoku, kalite düşüşünü sınırlar.`,
            },
          ],
        },
        {
          subheading: "7.2 Pahalı/erişimsiz limanda ikmal",
          paragraphs: [
            `Bazı limanlar pahalı veya kaliteli tedarikten yoksundur. Aşçı, bir önceki ucuz/iyi limanda dayanıklı kalemleri stoklayarak bu limanları köprüler. İleriye dönük planlama, rota üzerindeki ikmal fırsatlarını öngörmeyi gerektirir.`,
          ],
        },
      ],
    },
    {
      heading: "8. Sonuç ve Pratik Kontrol Listesi",
      sections: [
        {
          subheading: "8.1 Aşçının stok yönetimi checklist'i",
          bullets: [
            `Stok kayıtları güncel ve fiziksel sayımla uyumlu mu?`,
            `FIFO/FEFO düzeni raflarda uygulanıyor mu?`,
            `Son kullanma tarihi yaklaşan ürünler menüye alındı mı?`,
            `Minimum seviyeye yaklaşan kalemler sipariş listesinde mi?`,
            `İkmal hesabı menü döngüsü + kişi-gün tüketimine dayalı mı?`,
            `Teslim alımda sıcaklık/kalite muayenesi yapıldı mı?`,
            `Reddedilen/eksik kalemler belgelendi mi?`,
            `Bütçe (victualling rate) içinde mi, harcama raporlandı mı?`,
            `Emergency provisions tamponu korunuyor mu?`,
          ],
          paragraphs: [
            `Kumanya stok yönetimi, görünmediğinde başarılı olan bir disiplindir: doğru zamanda doğru miktarda, kaliteli ve bütçe içinde malzeme. FIFO/FEFO rotasyonu, kişi-gün bazlı sipariş, teslimde kalite kontrolü ve emniyet tamponu; seferin ortasında ne malzeme tükenmesini ne de israfı yaşatmadan mürettebatı beslemenin sessiz altyapısıdır.`,
          ],
        },
      ],
    },
  ],
};

export default content;
