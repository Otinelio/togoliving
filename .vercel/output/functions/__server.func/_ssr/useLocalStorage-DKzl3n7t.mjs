import { r as reactExports } from "../_libs/react.mjs";
function useLocalStorage(key, initial) {
  const [value, setValue] = reactExports.useState(() => {
    if (typeof window === "undefined") return initial;
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  });
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      window.dispatchEvent(new StorageEvent("storage", { key }));
    } catch {
    }
  }, [key, value]);
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    const handler = (e) => {
      if (e.key !== key) return;
      try {
        const raw = window.localStorage.getItem(key);
        if (raw) setValue(JSON.parse(raw));
      } catch {
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, [key]);
  return [value, setValue];
}
export {
  useLocalStorage as u
};
