import Foundation
import Capacitor
import UIKit

/**
 * Renders genuine SF Symbols for the WebView chrome. The returned monochrome
 * image is consumed as a CSS mask, so React keeps control of active/inactive
 * color while the shape, optical weight and filled variants come from iOS.
 */
@objc(SystemSymbolsPlugin)
public class SystemSymbolsPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "SystemSymbolsPlugin"
    public let jsName = "SystemSymbols"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "render", returnType: CAPPluginReturnPromise)
    ]

    @objc func render(_ call: CAPPluginCall) {
        guard let name = call.getString("name"), !name.isEmpty else {
            call.reject("A symbol name is required")
            return
        }

        let requestedSize = call.getDouble("pointSize") ?? 22
        let pointSize = CGFloat(min(max(requestedSize, 12), 64))
        let weight = symbolWeight(call.getString("weight") ?? "regular")
        let configuration = UIImage.SymbolConfiguration(
            pointSize: pointSize,
            weight: weight,
            scale: .medium
        )

        guard let image = UIImage(systemName: name, withConfiguration: configuration) else {
            call.reject("SF Symbol is unavailable on this iOS version: \(name)")
            return
        }
        let monochrome = image.withTintColor(.black, renderingMode: .alwaysOriginal)
        let padding = max(1, pointSize * 0.08)
        let canvasSize = CGSize(
            width: ceil(monochrome.size.width + padding * 2),
            height: ceil(monochrome.size.height + padding * 2)
        )
        let format = UIGraphicsImageRendererFormat.default()
        format.scale = UIScreen.main.scale
        format.opaque = false
        let rendered = UIGraphicsImageRenderer(size: canvasSize, format: format).image { _ in
            monochrome.draw(at: CGPoint(x: padding, y: padding))
        }
        guard let data = rendered.pngData() else {
            call.reject("Unable to encode SF Symbol: \(name)")
            return
        }

        call.resolve([
            "dataUrl": "data:image/png;base64,\(data.base64EncodedString())",
            "width": Double(canvasSize.width),
            "height": Double(canvasSize.height)
        ])
    }

    private func symbolWeight(_ value: String) -> UIImage.SymbolWeight {
        switch value {
        case "medium": return .medium
        case "semibold": return .semibold
        default: return .regular
        }
    }
}
