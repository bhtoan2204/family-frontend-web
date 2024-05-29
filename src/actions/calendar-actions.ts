"use server";

import CalendarUrl from "@/services/url/calendar-url";
import { CategoryEvent, EventCalendar } from "@/types/calendar";

export const GetAllCategoryEvent = async (token: string, familyId: number) => {
  try {
    const response = await fetch(
      `${CalendarUrl.getAllCategoryEvent}?id_family=${familyId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data as CategoryEvent[];
  } catch (error) {
    throw new Error("Internal Error!");
  }
}
export const CreateCategoryEvent = async (token: string, category: CategoryEvent) => { 
  try {
    const response = await fetch(CalendarUrl.createCategoryEvent, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: category.title,
        color: category.color,
        id_family: category.id_family,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return { error: "Internal Error!" };
  }

}
export const UpdateCategoryEvent = async (token: string, category: CategoryEvent) => {
  try {
    const response = await fetch(CalendarUrl.updateCategoryEvent, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_category_event: category.id_category_event,
        title: category.title,
        color: category.color,
        id_family: category.id_family,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return { error: "Internal Error!" };
  }
}
export const DeleteCategoryEvent = async (token: string, familyId:number, categoryId: number) => {
  try {
    const response = await fetch(
      `${CalendarUrl.deleteCategoryEvent}/${familyId}?id_category_event=${categoryId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return { error: "Internal Error!" };
  }
}
export const GetAllEventOfFamily = async (token: string, familyId: number) => {
  try {
    const response = await fetch(
      `${CalendarUrl.getAllEventOfFamily}/${familyId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data.data as EventCalendar[];
  } catch (error) {
    throw new Error("Internal Error!");
  }
};
export const GetEventsOnDate = async (
  token: string,
  familyId: number,
  date: string
) => {
  try {
    const response = await fetch(`${CalendarUrl.getEventsOnDate}/${familyId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id_family: familyId, date: date }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return { error: "Internal Error!" };
  }
};
export const GetCalendarDetail = async (token: string, calendarId: number) => {
  try {
    const response = await fetch(
      `${CalendarUrl.getCalendarDetail}/${calendarId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return { error: "Internal Error!" };
  }
};
export const CreateCalendar = async (
  token: string,
  familyId: number,
  calendar: any,
  calendarCollections: Record<string, any>[],
) => {
  try {
    const newEvent: EventCalendar = {
      title: calendar.Subject,
      description: calendar.Description ?? "",
      time_start: calendar.StartTime,
      time_end: calendar.EndTime,
      color: calendarCollections.find(
        (item) => item.CalendarId === calendar.CalendarId
      )?.CalendarColor,
      is_all_day: calendar.IsAllDay,
      category: calendar.CalendarId,
      location: calendar.Location ?? "",
      recurrence_exception: calendar.RecurrenceException ?? "",
      recurrence_id: calendar.RecurrenceID ?? null,
      recurrence_rule: calendar.RecurrenceRule ?? "",
      start_timezone: calendar.StartTimezone ?? "",
      end_timezone: calendar.EndTimezone ?? "",
      id_family: familyId,
    };
    const response = await fetch(CalendarUrl.createCalendar, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEvent),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error", error);
    return { error: "Internal Error!" };
  }
};
export const UpdateCalendar = async (
  token: string,
  familyId: number,
  calendar: any,
  calendarCollections: Record<string, any>[]
) => {
  try {
    const newEvent: EventCalendar = {
      id_calendar: calendar.Id,
      title: calendar.Subject,
      description: calendar.Description ?? "",
      time_start: calendar.StartTime,
      time_end: calendar.EndTime,
      color: calendarCollections.find(
        (item) => item.CalendarId === calendar.CalendarId
      )?.CalendarColor,
      is_all_day: calendar.IsAllDay,
      category: calendar.CalendarId,
      location: calendar.Location ?? "",
      recurrence_exception: calendar.RecurrenceException ?? "",
      recurrence_id: calendar.RecurrenceID ?? null,
      recurrence_rule: calendar.RecurrenceRule ?? "",
      start_timezone: calendar.StartTimezone ?? "",
      end_timezone: calendar.EndTimezone ?? "",
    };
    const response = await fetch(CalendarUrl.updateCalendar, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEvent),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return { error: "Internal Error!" };
  }
};
export const DeleteCalendar = async (token: string, calendarId: number) => {
  try {
    const response = await fetch(
      `${CalendarUrl.deleteCalendar}/${calendarId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return { error: "Internal Error!" };
  }
};
