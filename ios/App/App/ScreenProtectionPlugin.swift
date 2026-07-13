import Foundation
import Capacitor
import UIKit

/**
 * Ekran görüntüsü / ekran kaydı engelleme eklentisi (iOS).
 *
 * iOS, herkese açık API ile ekran görüntüsünü *tamamen* engellemeye izin vermez.
 * Bu eklenti, üretim uygulamalarının kullandığı "güvenli katman" (secure
 * text-field) tekniğiyle en güçlü korumayı sağlar:
 *
 *  - Etkinken alınan **ekran görüntüsü ve ekran kaydı boş/siyah çıkar**
 *    (içerik güvenli katmanın içine taşınır, sistem yakalamalarından hariç tutulur).
 *  - **Çoklu görev (app switcher) önizlemesi** de aynı güvenli katman sayesinde
 *    boş görünür; içerik sızmaz.
 *  - Kullanıcı bir ekran görüntüsü aldığında (engellenemeyen tek durum: alınmış
 *    olması), JS tarafına `screenshotTaken` olayı gönderilir; böylece uygulama
 *    kullanıcıyı bilgilendirebilir.
 *
 * Modern Capacitor (6/7) kayıt yöntemi: `CAPBridgedPlugin` uyumu. Ayrı bir
 * Objective-C `.m` kayıt dosyası gerekmez.
 */
@objc(ScreenProtectionPlugin)
public class ScreenProtectionPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "ScreenProtectionPlugin"
    public let jsName = "ScreenProtection"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "enable", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "disable", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "isEnabled", returnType: CAPPluginReturnPromise)
    ]

    private var isProtectionEnabled = false
    private let secureField = UITextField()

    // MARK: - JS'ten çağrılan metotlar

    @objc func enable(_ call: CAPPluginCall) {
        DispatchQueue.main.async { [weak self] in
            self?.startProtection()
            call.resolve()
        }
    }

    @objc func disable(_ call: CAPPluginCall) {
        DispatchQueue.main.async { [weak self] in
            self?.stopProtection()
            call.resolve()
        }
    }

    @objc func isEnabled(_ call: CAPPluginCall) {
        call.resolve(["enabled": isProtectionEnabled])
    }

    // MARK: - Yardımcılar

    /// Uygulamanın ana penceresi (Capacitor WebView'ının bulunduğu pencere).
    private var appWindow: UIWindow? {
        if let window = bridge?.viewController?.view.window {
            return window
        }
        return UIApplication.shared.connectedScenes
            .compactMap { $0 as? UIWindowScene }
            .flatMap { $0.windows }
            .first { $0.isKeyWindow }
    }

    private func startProtection() {
        guard !isProtectionEnabled else { return }
        isProtectionEnabled = true
        addSecuredLayer()
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(onScreenshotTaken),
            name: UIApplication.userDidTakeScreenshotNotification,
            object: nil
        )
    }

    private func stopProtection() {
        guard isProtectionEnabled else { return }
        isProtectionEnabled = false
        removeSecuredLayer()
        NotificationCenter.default.removeObserver(
            self,
            name: UIApplication.userDidTakeScreenshotNotification,
            object: nil
        )
    }

    // MARK: - Güvenli katman (ekran görüntüsü ve kaydı boşa çıkarır)

    /// `isSecureTextEntry` etkin bir `UITextField`'in katmanına uygulama
    /// penceresinin katmanını yerleştirir. Böylece sistem yakalamaları
    /// (ekran görüntüsü, kayıt, app-switcher) içeriği boş görür.
    private func addSecuredLayer() {
        guard let window = appWindow else { return }

        // `isSecureTextEntry` ÖNCE etkinleştirilmeli: güvenli tuval alt katmanı
        // (secure canvas) yalnızca bu bayrak açıkken oluşur ve aşağıdaki katman
        // yeniden bağlama işlemi bu alt katmana ihtiyaç duyar.
        secureField.isSecureTextEntry = true

        if secureField.superview == nil {
            secureField.isUserInteractionEnabled = false
            secureField.translatesAutoresizingMaskIntoConstraints = false
            window.addSubview(secureField)
            secureField.centerXAnchor.constraint(equalTo: window.centerXAnchor).isActive = true
            secureField.centerYAnchor.constraint(equalTo: window.centerYAnchor).isActive = true

            window.layer.superlayer?.addSublayer(secureField.layer)
            if #available(iOS 17.0, *) {
                secureField.layer.sublayers?.last?.addSublayer(window.layer)
            } else {
                secureField.layer.sublayers?.first?.addSublayer(window.layer)
            }
        }
    }

    private func removeSecuredLayer() {
        // Güvenli girişi kapatmak yakalamaları yeniden serbest bırakır;
        // katman hiyerarşisi olduğu gibi kalır (içerik görünür olmaya devam eder).
        secureField.isSecureTextEntry = false
    }

    // MARK: - Ekran görüntüsü tespiti (engellenemez, yalnızca bildirilir)

    @objc private func onScreenshotTaken() {
        notifyListeners("screenshotTaken", data: ["platform": "ios"])
    }

    deinit {
        NotificationCenter.default.removeObserver(self)
    }
}
