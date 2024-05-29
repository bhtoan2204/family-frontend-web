export type EventCalendar = {
  id_calendar?: number;
  title: string;
  description: string;
  time_start: string;
  time_end: string;
  color: string;
  is_all_day: boolean;
  category: number;
  location: string;
  recurrence_exception: string;
  recurrence_id: string;
  recurrence_rule: string;
  start_timezone: string;
  end_timezone: string;
  id_family?: number;
};

export type CategoryEvent = {
  id_category_event: number;
  title: string;
  color: string;
  id_family: number;
};
