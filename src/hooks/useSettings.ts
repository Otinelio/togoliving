import { useLocalStorage } from "./useLocalStorage";

export type Settings = {
  hotelName: string;
  whatsapp: string;
  domain: string;
  pinAdmin: string;
  pinReception: string;
  pinKitchen: string;
};

export const DEFAULT_SETTINGS: Settings = {
  hotelName: "TOGOLIVING",
  whatsapp: "22893872088",
  domain: "https://togoliving.net",
  pinAdmin: "9999",
  pinReception: "9999",
  pinKitchen: "9999",
};

export function useSettings() {
  const [settings, setSettings] = useLocalStorage<Settings>("togoliving_settings", DEFAULT_SETTINGS);
  return { settings, setSettings };
}
