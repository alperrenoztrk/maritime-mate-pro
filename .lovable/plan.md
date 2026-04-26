## Hedef
Dersler sayfasında (`/lessons`) tüm başlıkların altındaki açıklama satırlarını ve alt bilgi mesajını kaldır. Yalnızca başlıklar görünsün.

## Kaldırılacak metinler
1. Grup başlığı altındaki alt yazı (ör. "Gemi makineleri ve makina sistemleri", "Gemi makineleri dışındaki tüm ders başlıkları")
2. Her kategori başlığının altındaki açıklama satırı (ör. her kategorinin `subtitle` alanından gelen metin)
3. Sayfa altındaki "Ders modülleri aynı sekmede açılır." bilgi rozeti

## Teknik
Tek dosya etkilenir: `src/pages/LessonsPage.tsx`
- Grup butonundaki `<span className="text-xs text-muted-foreground">{group.subtitle}</span>` satırı kaldırılır.
- Kategori başlığındaki `<p className="text-xs text-muted-foreground">{category.subtitle}</p>` satırı kaldırılır.
- Sayfa sonundaki `BookOpen` ikonlu "Ders modülleri aynı sekmede açılır." bilgi rozeti tamamen kaldırılır (kullanılmıyorsa `BookOpen` import'u da temizlenir).

Veri tarafında `subtitle` alanına dokunulmaz (başka sayfalarda kullanılıyor olabilir); sadece bu sayfada render edilmez.
