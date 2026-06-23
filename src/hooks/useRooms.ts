import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { type Room, DEFAULT_ROOMS } from "@/data/defaultRooms";

export function useRooms() {
  const queryClient = useQueryClient();

  const { data: rooms = [], isLoading } = useQuery({
    queryKey: ["roomsStatus"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase.from("rooms_status").select("*").order("id");
        if (error) return DEFAULT_ROOMS;
        if (!data || data.length === 0) return DEFAULT_ROOMS;
        
        // Merge fetched data with DEFAULT_ROOMS to ensure rich content is always present
        // even if the user hasn't run the SQL seed script yet.
        const mergedData = data.map(fetchedRoom => {
          // Fix old category name if it comes from DB
          if (fetchedRoom.type === "1 Chambre Salon") {
            fetchedRoom.type = "Chambre Salon";
          }
          
          const defaultRoom = DEFAULT_ROOMS.find(r => r.id === fetchedRoom.id);
          if (defaultRoom) {
            return {
              ...defaultRoom,
              ...fetchedRoom,
              title: fetchedRoom.title || defaultRoom.title,
              description: fetchedRoom.description || defaultRoom.description,
              capacity: fetchedRoom.capacity || defaultRoom.capacity,
              price_per_night: fetchedRoom.price_per_night || defaultRoom.price_per_night,
              price_per_month: fetchedRoom.price_per_month || defaultRoom.price_per_month,
              amenities: fetchedRoom.amenities || defaultRoom.amenities,
              images: fetchedRoom.images || defaultRoom.images,
              videoUrl: fetchedRoom.videoUrl || defaultRoom.videoUrl,
              videoUrls: fetchedRoom.videoUrls || defaultRoom.videoUrls,
            };
          }
          return fetchedRoom;
        });

        // Add any default rooms that were completely missing from DB
        DEFAULT_ROOMS.forEach(defaultRoom => {
          if (!mergedData.find(r => r.id === defaultRoom.id)) {
            mergedData.push(defaultRoom);
          }
        });
        
        return mergedData as Room[];
      } catch (err) {
        console.error("Supabase fallback to default rooms:", err);
        return DEFAULT_ROOMS;
      }
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
