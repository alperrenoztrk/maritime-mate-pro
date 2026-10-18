import type { ReactNode } from "react";
import { createPortal } from "react-dom";

/**
 * Tam ekran katmanları <body>'ye çizer.
 *
 * Rota çerçevesi (.route-presence-frame) geçiş animasyonu için `transform`
 * taşır; bu yüzden içindeki `position: fixed` öğeler ekrana değil çerçeveye
 * göre konumlanır. Sonuç: sayfa kaydırılmışsa okuma penceresinin başlığı ve
 * kapatma düğmesi ekranın dışında kalıyor, tablette sol kenar yan menünün
 * altına giriyor ve üstteki geri düğmesi pencere başlığını örtüyordu.
 */
export function BodyPortal({ children }: { children: ReactNode }) {
  if (typeof document === "undefined") return null;
  return createPortal(children, document.body);
}
