"use server";

import CalendarUrl from "@/services/url/calendar-url";

const CalendarActions = {
  GetAllEventOfFamily: async (token: string, familyId: number) => {
    try {
      const response = await fetch(
        `${CalendarUrl.getAllEventOfFamily}/${familyId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return { error: "Something wrong!" };
    }
  },
  GetEventsOnDate: async (token: string, familyId: number, date: string) => {
    try {
      const response = await fetch(
        `${CalendarUrl.getEventsOnDate}/${familyId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id_family: familyId, date: date }),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return { error: "Something wrong!" };
    }
  },
  GetCalendarDetail: async (token: string, calendarId: number) => {
    try {
      const response = await fetch(
        `${CalendarUrl.getCalendarDetail}/${calendarId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return { error: "Something wrong!" };
    }
  },
  CreateCalendar: async (token: string, calendar: any) => {
    try {
      const response = await fetch(CalendarUrl.createCalendar, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(calendar),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return { error: "Something wrong!" };
    }
  },
  UpdateCalendar: async (token: string, calendar: any) => {
    try {
      const response = await fetch(CalendarUrl.updateCalendar, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(calendar),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return { error: "Something wrong!" };
    }
  },
  DeleteCalendar: async (token: string, calendarId: number) => {
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
      return { error: "Something wrong!" };
    }
  },
};

export { CalendarActions };
