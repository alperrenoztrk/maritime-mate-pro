import Foundation
import Capacitor
import UIKit

/**
 * Bridges iOS Dynamic Type into the web layer. WKWebView does not expose
 * UIContentSizeCategory to JavaScript, so the React typography system would
 * otherwise remain at 100% when the user enlarges text in iOS Settings.
 */
@objc(ContentSizePlugin)
public class ContentSizePlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "ContentSizePlugin"
    public let jsName = "ContentSize"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "getCurrent", returnType: CAPPluginReturnPromise)
    ]

    public override func load() {
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(contentSizeDidChange),
            name: UIContentSizeCategory.didChangeNotification,
            object: nil
        )
    }

    @objc func getCurrent(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            call.resolve(self.currentPayload())
        }
    }

    @objc private func contentSizeDidChange() {
        notifyListeners("contentSizeChanged", data: currentPayload())
    }

    private func currentPayload() -> [String: Any] {
        let category = UIApplication.shared.preferredContentSizeCategory
        return [
            "category": category.rawValue,
            "scale": scale(for: category)
        ]
    }

    /**
     * Ratios intentionally follow the readable progression of Dynamic Type,
     * while capping the web layout at 200% so navigation remains operable.
     */
    private func scale(for category: UIContentSizeCategory) -> Double {
        switch category {
        case .extraSmall: return 0.90
        case .small: return 0.95
        case .medium: return 0.98
        case .large: return 1.00
        case .extraLarge: return 1.12
        case .extraExtraLarge: return 1.23
        case .extraExtraExtraLarge: return 1.35
        case .accessibilityMedium: return 1.50
        case .accessibilityLarge: return 1.65
        case .accessibilityExtraLarge: return 1.80
        case .accessibilityExtraExtraLarge: return 1.90
        case .accessibilityExtraExtraExtraLarge: return 2.00
        default: return 1.00
        }
    }

    deinit {
        NotificationCenter.default.removeObserver(self)
    }
}
