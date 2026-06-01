import { r as reactExports } from "../_libs/react.mjs";
const KEY = "togoliving_orders";
function read() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function write(orders) {
  window.localStorage.setItem(KEY, JSON.stringify(orders));
  window.dispatchEvent(new StorageEvent("storage", { key: KEY }));
}
function addOrder(order) {
  const orders = read();
  const newOrder = {
    ...order,
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    status: "En attente"
  };
  write([newOrder, ...orders]);
  return newOrder;
}
function setOrderStatus(id, status) {
  write(read().map((o) => o.id === id ? { ...o, status } : o));
}
function useOrders(interval = 3e3) {
  const [orders, setOrders] = reactExports.useState(() => read());
  reactExports.useEffect(() => {
    const tick = () => setOrders(read());
    tick();
    const id = window.setInterval(tick, interval);
    const onStorage = (e) => {
      if (e.key === KEY) tick();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      window.clearInterval(id);
      window.removeEventListener("storage", onStorage);
    };
  }, [interval]);
  return orders;
}
export {
  addOrder as a,
  setOrderStatus as s,
  useOrders as u
};
