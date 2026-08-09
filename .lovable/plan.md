# Tek geri tuşu

Uygulamada global bir geri kontrolü var (sol üstte, kaydırma jesti ve donanım tuşuyla aynı mantığı paylaşıyor). Buna rağmen bazı sayfalar kendi geri tuşunu da çiziyor; sonuç üst üste iki geri tuşu.

## Yapılacak

Sayfa içi geri tuşlarını kaldır, global olan tek kontrol kalsın.

- Paylaşılan bileşenlerdeki geri tuşları kaldırılır: kütüphane arayüzü, ders konu başlığı, ders quiz başlığı, rehberli ders oturumu, `BackButton` bileşeninin sayfa kullanımları (Notlar, hidrostatik hesaplamalar).
- Kendi geri tuşunu satır içi çizen sayfalarda (stabilite, draft survey, quiz/kural/formül sayfaları, dönüştürücü, konum seçici, cihaz detay, meteoroloji vb. ~30 sayfa) buton ve artık kullanılmayan `ArrowLeft` importu ile `useNavigate` çağrıları temizlenir.
- Başlık satırlarında geri tuşunun bıraktığı boşluk kapatılır; başlıklar sola hizalı kalacak şekilde düzen sadeleştirilir.
- Sayfa içeriğinin global tuşun altına girmemesi için üst boşluk gerektiği yerde korunur.

## Kapsam dışı

- Modal/galeri kapatma (X) tuşları geri tuşu değil, dokunulmaz.
- Global geri kontrolünün davranışı (hiyerarşik üst sayfaya gitme) değişmez.

## Teknik not

Global kontrol `src/components/AppNavBar.tsx` içinde, `useBackNavigation` üzerinden hiyerarşik üst rotaya `replace` ile gidiyor. Sayfa içi tuşlar aynı işi tekrarlıyor; kaldırıldıklarında davranış kaybı olmuyor. `src/components/BackButton.tsx` kullanımsız kaldığında dosya da silinir.
