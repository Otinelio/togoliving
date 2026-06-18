import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export type Review = {
  id: string;
  room_id: string;
  guest_name?: string;
  rating: number;
  comment?: string;
  created_at: string;
};

export function useReviews() {
  const queryClient = useQueryClient();

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });
      
      // If table doesn't exist yet, return empty array instead of throwing
      if (error && error.code === '42P01') {
        console.warn("Table 'reviews' n'existe pas encore.");
        return [];
      }
      if (error) throw error;
      return data as Review[];
    },
  });

  const addReviewMutation = useMutation({
    mutationFn: async (review: Omit<Review, "id" | "created_at">) => {
      const { data, error } = await supabase.from("reviews").insert(review).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["reviews"] }),
  });

  const deleteReviewMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("reviews").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["reviews"] }),
  });

  return {
    reviews,
    isLoading,
    addReview: (r: Omit<Review, "id" | "created_at">) => addReviewMutation.mutateAsync(r),
    deleteReview: (id: string) => deleteReviewMutation.mutateAsync(id),
  };
}
