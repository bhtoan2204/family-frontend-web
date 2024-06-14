"use server";

import RoomUrl from "@/services/url/room-url";
import { Room } from "@/types/household";

export const GetAllRooms = async (token: string, familyId: number) => {
  try {
    const response = await fetch(`${RoomUrl.GetAllRooms}/${familyId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data.data as Room[];
  } catch (error) {
    throw new Error("Internal Error!");
  }
};

export const CreateRoom = async (
  token: string,
  familyId: number,
  roomName: string
) => {
  try {
    const response = await fetch(RoomUrl.CreateRoom, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id_family: familyId,
        room_name: roomName,
      }),
    });
    const data = await response.json();
    return data.data;
  } catch (error) {
    throw new Error("Internal Error!");
  }
};

export const UpdateRoom = async (
  token: string,
  familyId: number,
  roomId: number,
  roomName: string
) => {
  try {
    const response = await fetch(RoomUrl.UpdateRoom, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id_family: familyId,
        id_room: roomId,
        room_name: roomName,
      }),
    });
    const data = await response.json();
    return data.data;
  } catch (error) {
    throw new Error("Internal Error!");
  }
};

export const DeleteRoom = async (
  token: string,
  familyId: number,
  roomId: number
) => {
  try {
    const response = await fetch(
      `${RoomUrl.DeleteRoom}/${familyId}/${roomId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data.data;
  } catch (error) {
    throw new Error("Internal Error!");
  }
};
