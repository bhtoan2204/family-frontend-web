export type HouseholdCategory = {
  id_category: number;
  category_name: string;
};

export type HouseholdItem = {
  id_household_item: number;
  id_family: number;
  item_name: string;
  item_description: string;
  item_imageurl: string;
  id_category: number;
  id_room: number;
}

export type Room = {
  id_room: number;
  room_name: string;
}

export type CreateHouseholdItem = {
  
}