## Sorun (videodan doğrulandı)

`src/components/book/BookSheet.tsx` içindeki `BookLeafPager` bir "spread" (iki sayfa) birimini tek adım olarak sayıyor:

- `spreadStride = width + gap` — ileri gitmek `flow`'u tam iki kolon birden kaydırıyor.
- `beginTurn` içindeki dönen yaprak (`.bs-turn-leaf`) `left: 0; width: 100%` ve `transform-origin: left center` ile tanımlı — yani tüm çift sayfa, kitabın sol kenarından (omurgadan değil) tek parça olarak dönüyor.
- Dönerken alttaki `flow` çoktan bir sonraki tam spread'e kayıyor, dolayısıyla:
  1. Kullanıcı "tek yaprağı" çevirdiğini düşünüyor ama iki sayfa aynı anda değişiyor (kullanıcının ikinci şikâyeti).
  2. Dönen yaprak sol kenardan pivotlanıp yalnızca soldan kalkıyormuş gibi görünüyor; sağ yarı ise altta zaten değişmiş halde durduğu için "sadece yarısı değişiyor" izlenimi doğuyor (birinci şikâyeti).

Gerçek bir kitapta ileri çevirmek: sadece **sağdaki yaprak** omurga etrafında (merkez) döner; ön yüzü mevcut sağ sayfa, arka yüzü yeni sol sayfadır; altta yeni sağ sayfa görünür. Sol sayfa dokunulmadan kalır. Geri çevirme aynısının aynası.

## Yapılacaklar

Tek dosya değişecek: `src/components/book/BookSheet.tsx` (yalnızca sunum/animasyon; içerik ve rota mantığı sabit).

1. **Sayfa birimi = tek kolon (yaprak yüzü), spread değil**
   - `spreadStride` yerine kolon adımı: `stride = columnWidth + gap`. `flow` transformu `spreadRef.current * 2 * stride` ile hesaplanır (mevcut spread hâlâ sol kolonu belirler, ama tabakalama artık kolon başına).
   - Cover/folio ve `spreads` sayımı aynı kalır; `onLeafState` API'si aynı — `BookSheet` header/footer/folio numaraları etkilenmez.

2. **Dönen yaprağın geometrisi omurgaya taşınır**
   - `.bs-turn-leaf` artık **yarım genişlik**: `width: 50%`, ileri için `left: 50%; transform-origin: left center` (omurga = sol kenar), geri için `left: 0; transform-origin: right center`.
   - `perspective` `.bs-pager`'da kalır; kaybolma noktası omurgada sabit.

3. **Yüzlerin (front/back) doğru kolonu göstermesi**
   - `buildFace`, klon `flow`u yaprak yüzünün içinde konumlandırıyor. Yeni davranış:
     - İleri: **ön yüz** = mevcut sağ kolon (`from*2 + 1`); klonun `left`'i `-(from*2 + 1) * stride`. **Arka yüz** = yeni sol kolon (`to*2`); klonun `left`'i `-(to*2) * stride` ve `translateX(-100%) scaleX(-1)`… yerine, `.bs-turn-face--back` üzerindeki mevcut `rotateY(180deg)` sayesinde klonu ters aynalamak gerekmez — sadece klonun `left`'i ayarlanır; `overflow:hidden` yüzü kolon genişliğine kırpar.
     - Geri: simetriği — ön yüz mevcut sol kolon, arka yüz yeni sağ kolon.
   - `CLONE_NODE_LIMIT` üstünde (`light` yol) klonlar oluşturulmaz; yaprak yine yarım genişlikte, düz kâğıt renginde döner.

4. **Alttaki `flow`'un doğru anda kaymaması**
   - Şu an `beginTurn` içinde `flow.style.transform` hedef spread'e anında set ediliyor; bu sebeple sabit kalan yaprağın (sol) altında da içerik değişiyor. Yeni davranış: yalnızca **değişen yarının** kolonu güncellenmiş görünmeli.
   - `flow` transformu `beginTurn` sırasında **değiştirilmez**; onun yerine dönen yaprağın arka yüzü yeni kolonu taşır. Turn `finalizeTurn(true)` içinde tamamlanınca `spreadRef.current = to` ve `applyBaseOffset()` `flow`'u yeni spread'e kaydırır (bu an yaprak kaybolduğu için sıçrama görünmez).
   - Böylece sabit kalan yarım (ileri çeviride sol, geri çeviride sağ) tüm animasyon boyunca aynı içeriği gösterir.

5. **Sürükleme fiziği**
   - `getBookTurnProgress` zaten `leafWidth = width/2` alıyor — matematik aynı. `shouldCompleteBookTurn` eşikleri değişmez.
   - Sürüklerken `applyTurnFrame` hâlâ 0→180° `rotateY` uygular; yaprak yarım genişlikte olduğundan görsel olarak tek yaprak omurga etrafında döner.
   - Yaprağın ön/arka görünürlüğü `progress < 0.5` mantığıyla çalışmaya devam eder.

6. **Gölge ve büküm**
   - `.bs-turn-shadow` mevcut `foldCenter` hesabı iki sayfayı taradığı için kalıyor; sadece genlik yeni tek-yaprak hareketine uysun diye `foldCenter = 50 + (dir==="forward" ? 25 : -25) * (1 - cos(π*p))` gibi omurgadan başlayıp yaprağın gittiği yöne doğru kayacak şekilde güncellenir. `.bs-turn-face::after` mürekkep gölgeleri aynı.
   - `.bs-turning-leaf` (rota geçişi için dekoratif tek atım animasyon) da yarım genişliğe (`width:50%; left:50%; transform-origin:left center`) çekilir ki rota değişiminde de "iki sayfa birden döndü" izlenimi kaybolsun.

7. **Kenar durumları**
   - `metrics.spreads` hesabı aynı (2 kolon = 1 spread); sonuncu spread yalnız sol kolon içerse bile, mevcut mantıkla `to` yine `from+1` olmadan kilitleniyor. Değişiklik yok.
   - `reducedMotion` yolu (`stepInstant`) etkilenmez; anında spread kayması korunur.
   - `apiRef.step` (folio ok butonları, klavye, tekerlek) aynı davranışla çalışır — hepsi tek adımlık yaprak çevirmeye düşer.

## Doğrulama

- `bun run scripts/check-book-page-turn.ts` — `getBookTurnProgress`/`shouldCompleteBookTurn` matematiği değişmediği için geçmeli.
- Preview'da Playwright ile `bs-pager` üzerinde ileri sürükleme yapıp adım adım screenshot alarak: (a) sol sayfa sabit kalıyor, (b) sağ yaprak omurgadan dönüyor, (c) `progress > 0.5` sonrası arka yüzde yeni sol sayfa görünüyor, (d) `spreads`/folio numaraları tek adım artıyor.

## Kapsam dışı

- İçerik pagination (`paginateBookPages`), rota çerçevesi (`BookRouteFrame`), kitap yönlendirme (`bookOrientation`) değişmez.
- Kitap kapak/omurga stilleri, tema renkleri, tipografi aynı kalır.
