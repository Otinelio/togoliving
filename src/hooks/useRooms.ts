import { DEFAULT_ROOMS, type Room } from "@/data/defaultRooms";
import { useLocalStorage } from "./useLocalStorage";

export function useRooms() {
  const [rooms, setRooms] = useLocalStorage<Room[]>("togoliving_rooms", DEFAULT_ROOMS);

  const addRoom = (room: Room) => setRooms([...rooms, room]);
  const updateRoom = (id: string, patch: Partial<Room>) =>
    setRooms(rooms.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  const removeRoom = (id: string) => setRooms(rooms.filter((r) => r.id !== id));

  return { rooms, setRooms, addRoom, updateRoom, removeRoom };
}
