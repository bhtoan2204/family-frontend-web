export type GuidelineItemDetail = {
  id_item: number;
  name: string;
  description: string;
  id_family: number;
  step: StepsList;
  is_shared: boolean;
  created_at: string;
  updated_at: string;
};

export type GuidelineItemInList = {
  id_item: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
};

export type StepsList = {
  steps: StepItemInList[];
};

export type StepItemInList = {
  name: string;
  description: string;
  imageUrl: string | null;
};
