import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

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

export async function addOrder(order: Omit<Order, "id" | "timestamp" | "status">) {
  const newOrder = {
    roomId: order.roomId,
    guestName: order.guestName,
    items: order.items,
    totalPrice: order.totalPrice,
    timestamp: Date.now(),
    status: "En attente",
  };
  
  const { data, error } = await supabase.from("orders").insert(newOrder).select().single();
  if (error) throw error;
  return data;
}

export async function setOrderStatus(id: string, status: OrderStatus) {
  const { error } = await supabase.from("orders").update({ status }).eq("id", id);
  if (error) throw error;
}

export async function deleteOrder(id: string) {
  const { error } = await supabase.from("orders").delete().eq("id", id);
  if (error) throw error;
}

export function useOrders(interval = 3000) {
  const { data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("timestamp", { ascending: false });
      
      if (error && error.code === '42P01') {
        console.warn("Table 'orders' n'existe pas encore.");
        return [];
      }
      if (error) throw error;
      
      return data.map((d: any) => ({
        id: d.id,
        roomId: d.roomId,
        guestName: d.guestName,
        items: d.items,
        totalPrice: d.totalPrice,
        timestamp: d.timestamp,
        status: d.status
      })) as Order[];
    },
    refetchInterval: interval,
  });

  return orders;
}
