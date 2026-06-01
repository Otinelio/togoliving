export type RoomType = "Studio" | "Standard 40m2" | "Superieur 50m2";
export type RoomStatus = "Disponible" | "Occupe" | "Maintenance";

export type Room = {
  id: string;
  type: RoomType;
  status: RoomStatus;
  floor: number;
  guest?: string;
  notes?: string;
};

export const DEFAULT_ROOMS: Room[] = [
  { id: "101", type: "Studio", status: "Disponible", floor: 1 },
  { id: "102", type: "Studio", status: "Disponible", floor: 1 },
  { id: "103", type: "Studio", status: "Disponible", floor: 1 },
  { id: "201", type: "Standard 40m2", status: "Disponible", floor: 2 },
  { id: "202", type: "Standard 40m2", status: "Disponible", floor: 2 },
  { id: "203", type: "Standard 40m2", status: "Disponible", floor: 2 },
  { id: "301", type: "Superieur 50m2", status: "Disponible", floor: 3 },
  { id: "302", type: "Superieur 50m2", status: "Disponible", floor: 3 },
  { id: "303", type: "Superieur 50m2", status: "Disponible", floor: 3 },
];
