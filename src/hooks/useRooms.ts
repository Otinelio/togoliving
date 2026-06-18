import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { type Room } from "@/data/defaultRooms";

export function useRooms() {
  const queryClient = useQueryClient();

  const { data: rooms = [], isLoading } = useQuery({
    queryKey: ["roomsStatus"],
    queryFn: async () => {
      const { data, error } = await supabase.from("rooms_status").select("*").order("id");
      if (error) throw error;
      return data as Room[];
    },
  });

  const addRoomMutation = useMutation({
    mutationFn: async (room: Room) => {
      const { data, error } = await supabase.from("rooms_status").insert(room).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["roomsStatus"] }),
  });

  const updateRoomMutation = useMutation({
    mutationFn: async ({ id, patch }: { id: string; patch: Partial<Room> }) => {
      const { data, error } = await supabase.from("rooms_status").update(patch).eq("id", id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["roomsStatus"] }),
  });

  const removeRoomMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("rooms_status").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["roomsStatus"] }),
  });

  const addRoom = (room: Room) => addRoomMutation.mutate(room);
  const updateRoom = (id: string, patch: Partial<Room>) => updateRoomMutation.mutate({ id, patch });
  const removeRoom = (id: string) => removeRoomMutation.mutate(id);

  return { rooms, isLoading, addRoom, updateRoom, removeRoom };
}
