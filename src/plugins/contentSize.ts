import { registerPlugin, type PluginListenerHandle } from "@capacitor/core";

export interface ContentSizeChange {
  category: string;
  scale: number;
}

interface ContentSizePlugin {
  getCurrent(): Promise<ContentSizeChange>;
  addListener(
    eventName: "contentSizeChanged",
    listener: (event: ContentSizeChange) => void,
  ): Promise<PluginListenerHandle>;
}

export const ContentSize = registerPlugin<ContentSizePlugin>("ContentSize");
