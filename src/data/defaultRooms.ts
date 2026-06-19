export type RoomType = "Studios" | "1 Chambre Salon" | "2 Chambres Salon" | "3 Chambres Salon";
export type RoomStatus = "Disponible" | "Occupe" | "Maintenance";

export type Room = {
  id: string;
  type: RoomType;
  status: RoomStatus;
  floor: number;
  guest?: string;
  notes?: string;
};

