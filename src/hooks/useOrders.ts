import { useEffect, useState } from "react";

export type OrderStatus = "En attente" | "En preparation" | "Pret" | "Livre";

export type OrderItem = {
  id: string;
  name: string;
  price: number;
  qty: number;
};

export type Order = {
  id: string;
  roomId: string;
  guestName?: string;
  items: OrderItem[];
  totalPrice: number;
  timestamp: number;
  status: OrderStatus;
};

const KEY = "togoliving_orders";

function read(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Order[]) : [];
  } catch {
    return [];
  }
}

function write(orders: Order[]) {
  window.localStorage.setItem(KEY, JSON.stringify(orders));
  window.dispatchEvent(new StorageEvent("storage", { key: KEY }));
}

export function addOrder(order: Omit<Order, "id" | "timestamp" | "status">) {
  const orders = read();
  const newOrder: Order = {
    ...order,
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    status: "En attente",
  };
  write([newOrder, ...orders]);
  return newOrder;
}

export function setOrderStatus(id: string, status: OrderStatus) {
  write(read().map((o) => (o.id === id ? { ...o, status } : o)));
}

export function deleteOrder(id: string) {
  write(read().filter((o) => o.id !== id));
}

/** Polls orders every `interval` ms. */
export function useOrders(interval = 3000) {
  const [orders, setOrders] = useState<Order[]>(() => read());

  useEffect(() => {
    const tick = () => setOrders(read());
    tick();
    const id = window.setInterval(tick, interval);
    const onStorage = (e: StorageEvent) => { if (e.key === KEY) tick(); };
    window.addEventListener("storage", onStorage);
    return () => {
      window.clearInterval(id);
      window.removeEventListener("storage", onStorage);
    };
  }, [interval]);

  return orders;
}
