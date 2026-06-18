import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { type MenuItem } from "@/data/defaultMenu";

export function useMenu() {
  const queryClient = useQueryClient();

  const { data: items = [], isLoading } = useQuery({
    queryKey: ["menuItems"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("menu_items")
        .select("*")
        .order("category")
        .order("name");
      if (error) throw error;
      return data as MenuItem[];
    },
  });

  const addItemMutation = useMutation({
    mutationFn: async (item: Omit<MenuItem, "id">) => {
      const { data, error } = await supabase.from("menu_items").insert(item).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["menuItems"] }),
  });

  const updateItemMutation = useMutation({
    mutationFn: async ({ id, patch }: { id: string; patch: Partial<MenuItem> }) => {
      const { data, error } = await supabase.from("menu_items").update(patch).eq("id", id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["menuItems"] }),
  });

  const removeItemMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("menu_items").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["menuItems"] }),
  });

  const addItem = (item: Omit<MenuItem, "id">) => addItemMutation.mutate(item);
  const updateItem = (id: string, patch: Partial<MenuItem>) => updateItemMutation.mutate({ id, patch });
  const removeItem = (id: string) => removeItemMutation.mutate(id);
  const toggleSoldOut = (id: string) => {
    const item = items.find(i => i.id === id);
    if (item) updateItem(id, { soldOut: !item.soldOut });
  };

  return { items, isLoading, addItem, updateItem, removeItem, toggleSoldOut };
}
