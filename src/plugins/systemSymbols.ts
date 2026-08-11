import { registerPlugin } from "@capacitor/core";

export type SystemSymbolWeight = "regular" | "medium" | "semibold";

export interface RenderSystemSymbolOptions {
  name: string;
  pointSize?: number;
  weight?: SystemSymbolWeight;
}

export interface RenderedSystemSymbol {
  dataUrl: string;
  width: number;
  height: number;
}

interface SystemSymbolsPlugin {
  render(options: RenderSystemSymbolOptions): Promise<RenderedSystemSymbol>;
}

/**
 * Native iOS symbol renderer.
 *
 * The WebView cannot address SF Symbols directly. The native bridge renders
 * the requested system image as a monochrome PNG; AppSymbol then uses that
 * image as a CSS mask so it still inherits the surrounding `currentColor`.
 */
export const SystemSymbols = registerPlugin<SystemSymbolsPlugin>("SystemSymbols");
