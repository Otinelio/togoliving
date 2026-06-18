import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export type Accommodation = {
  id: string;
  title: string;
  subtitle?: string;
  badge?: string;
  isPremium?: boolean;
  description?: string;
  imageUrl?: string;
  videoUrl?: string;
  posterUrl?: string;
  features?: any[];
  prices?: any[];
};

export function useAccommodations() {
  const queryClient = useQueryClient();

  const { data: items = [], isLoading } = useQuery({
    queryKey: ["accommodations"],
    queryFn: async () => {
      const { data, error } = await supabase.from("accommodations").select("*").order("title");
      if (error) throw error;
      return data as Accommodation[];
    },
  });

  const addItemMutation = useMutation({
    mutationFn: async (item: Omit<Accommodation, "id">) => {
      const { data, error } = await supabase.from("accommodations").insert(item).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["accommodations"] }),
  });

  const updateItemMutation = useMutation({
    mutationFn: async ({ id, patch }: { id: string; patch: Partial<Accommodation> }) => {
      const { data, error } = await supabase.from("accommodations").update(patch).eq("id", id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["accommodations"] }),
  });

  const removeItemMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("accommodations").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["accommodations"] }),
  });

  return { 
    items, 
    isLoading, 
    addItem: (i: Omit<Accommodation, "id">) => addItemMutation.mutate(i), 
    updateItem: (id: string, patch: Partial<Accommodation>) => updateItemMutation.mutate({ id, patch }),
    removeItem: (id: string) => removeItemMutation.mutate(id) 
  };
}
