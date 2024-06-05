import { baseUrl } from "@/services/url";

const RoomUrl = {
  GetAllRooms: `${baseUrl}/api/v1/room/getRooms`,
  CreateRoom: `${baseUrl}/api/v1/room/createRoom`,
  UpdateRoom: `${baseUrl}/api/v1/room/updateRoom`,
  DeleteRoom: `${baseUrl}/api/v1/room/deleteRoom`,
}

export default RoomUrl;