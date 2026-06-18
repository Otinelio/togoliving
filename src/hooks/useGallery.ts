import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export type GalleryItem = {
  id: string;
  category: string;
  imageUrl: string;
  altText: string;
};

export function useGallery() {
  const queryClient = useQueryClient();

  const { data: items = [], isLoading } = useQuery({
    queryKey: ["gallery"],
    queryFn: async () => {
      const { data, error } = await supabase.from("gallery").select("*").order("category");
      if (error) throw error;
      return data as GalleryItem[];
    },
  });

  const addItemMutation = useMutation({
    mutationFn: async (item: Omit<GalleryItem, "id">) => {
      const { data, error } = await supabase.from("gallery").insert(item).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["gallery"] }),
  });

  const removeItemMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("gallery").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["gallery"] }),
  });

  return { 
    items, 
    isLoading, 
    addItem: (i: Omit<GalleryItem, "id">) => addItemMutation.mutate(i), 
    removeItem: (id: string) => removeItemMutation.mutate(id) 
  };
}
