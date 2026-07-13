package com.marinersbook.app;

import android.view.WindowManager;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

/**
 * Ekran görüntüsü / ekran kaydı engelleme eklentisi (Android).
 *
 * FLAG_SECURE penceresel bayrağını kullanır. Bu bayrak etkinken:
 *  - Ekran görüntüsü alınamaz (sistem "güvenli içerik" uyarısı gösterir),
 *  - Ekran kaydı içeriği boş/siyah çıkar,
 *  - Uygulama, "son kullanılanlar" (recents) önizlemesinde gizlenir.
 *
 * FLAG_SECURE tüm pencere için geçerli olduğundan koruma uygulama geneldir.
 * Uygulama ayrıca {@link MainActivity#onCreate} içinde bu bayrağı ilk kareden
 * itibaren ayarlar; bu eklenti JS tarafından açma/kapama kontrolü sağlar.
 */
@CapacitorPlugin(name = "ScreenProtection")
public class ScreenProtectionPlugin extends Plugin {

    @PluginMethod
    public void enable(PluginCall call) {
        if (getActivity() == null) {
            call.reject("Activity mevcut değil");
            return;
        }
        getActivity().runOnUiThread(() ->
            getActivity().getWindow().setFlags(
                WindowManager.LayoutParams.FLAG_SECURE,
                WindowManager.LayoutParams.FLAG_SECURE
            )
        );
        call.resolve();
    }

    @PluginMethod
    public void disable(PluginCall call) {
        if (getActivity() == null) {
            call.reject("Activity mevcut değil");
            return;
        }
        getActivity().runOnUiThread(() ->
            getActivity().getWindow().clearFlags(WindowManager.LayoutParams.FLAG_SECURE)
        );
        call.resolve();
    }

    @PluginMethod
    public void isEnabled(PluginCall call) {
        boolean secure = false;
        if (getActivity() != null) {
            int flags = getActivity().getWindow().getAttributes().flags;
            secure = (flags & WindowManager.LayoutParams.FLAG_SECURE) != 0;
        }
        JSObject ret = new JSObject();
        ret.put("enabled", secure);
        call.resolve(ret);
    }
}
