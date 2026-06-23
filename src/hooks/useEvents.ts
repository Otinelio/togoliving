import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { type AppEvent, DEFAULT_EVENTS } from "@/data/defaultEvents";

export function useEvents() {
  const queryClient = useQueryClient();

  const { data: events = [], isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase.from("events").select("*").order("id");
        if (error) return DEFAULT_EVENTS;
        if (!data || data.length === 0) return DEFAULT_EVENTS;
        
        return data as AppEvent[];
      } catch (err) {
        console.error("Supabase fallback to default events:", err);
        return DEFAULT_EVENTS;
      }
    },
  });

  const addEventMutation = useMutation({
    mutationFn: async (event: Omit<AppEvent, "id">) => {
      const { data, error } = await supabase.from("events").insert(event).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["events"] }),
  });

  const updateEventMutation = useMutation({
    mutationFn: async ({ id, patch }: { id: string; patch: Partial<AppEvent> }) => {
      const { data, error } = await supabase.from("events").update(patch).eq("id", id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["events"] }),
  });

  const removeEventMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("events").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["events"] }),
  });

  const addEvent = (event: Omit<AppEvent, "id">) => addEventMutation.mutate(event);
  const updateEvent = (id: string, patch: Partial<AppEvent>) => updateEventMutation.mutate({ id, patch });
  const removeEvent = (id: string) => removeEventMutation.mutate(id);

  return { events, isLoading, addEvent, updateEvent, removeEvent };
}
