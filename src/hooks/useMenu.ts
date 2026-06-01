import { DEFAULT_MENU, type MenuItem } from "@/data/defaultMenu";
import { useLocalStorage } from "./useLocalStorage";

export function useMenu() {
  const [items, setItems] = useLocalStorage<MenuItem[]>("togoliving_menu", DEFAULT_MENU);

  const addItem = (item: Omit<MenuItem, "id">) =>
    setItems([...items, { ...item, id: crypto.randomUUID() }]);

  const updateItem = (id: string, patch: Partial<MenuItem>) =>
    setItems(items.map((i) => (i.id === id ? { ...i, ...patch } : i)));

  const removeItem = (id: string) => setItems(items.filter((i) => i.id !== id));

  const toggleSoldOut = (id: string) =>
    setItems(items.map((i) => (i.id === id ? { ...i, soldOut: !i.soldOut } : i)));

  return { items, setItems, addItem, updateItem, removeItem, toggleSoldOut };
}
