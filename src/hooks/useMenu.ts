import { DEFAULT_MENU, type MenuItem } from "@/data/defaultMenu";
import { useLocalStorage } from "./useLocalStorage";
import { useEffect } from "react";

// Incrémenter cette version à chaque fois que le menu par défaut change
// pour forcer la mise à jour sur tous les appareils (mobile inclus)
const MENU_VERSION = "v3";
const VERSION_KEY = "togoliving_menu_version";

export function useMenu() {
  const [items, setItems] = useLocalStorage<MenuItem[]>("togoliving_menu_v3", DEFAULT_MENU);

  // Si la version stockée est différente, on réinitialise le menu
  useEffect(() => {
    const storedVersion = localStorage.getItem(VERSION_KEY);
    if (storedVersion !== MENU_VERSION) {
      setItems(DEFAULT_MENU);
      localStorage.setItem(VERSION_KEY, MENU_VERSION);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addItem = (item: Omit<MenuItem, "id">) =>
    setItems([...items, { ...item, id: crypto.randomUUID() }]);

  const updateItem = (id: string, patch: Partial<MenuItem>) =>
    setItems(items.map((i) => (i.id === id ? { ...i, ...patch } : i)));

  const removeItem = (id: string) => setItems(items.filter((i) => i.id !== id));

  const toggleSoldOut = (id: string) =>
    setItems(items.map((i) => (i.id === id ? { ...i, soldOut: !i.soldOut } : i)));

  return { items, setItems, addItem, updateItem, removeItem, toggleSoldOut };
}
