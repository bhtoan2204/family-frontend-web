import { baseUrl } from "@/services/url";

const CalendarUrl = {
  getAllEventOfFamily: `${baseUrl}/api/v1/calendar/getAllCalendar`,
  getEventsOnDate: `${baseUrl}/api/v1/calendar/getEventOnDate`,
  getCalendarDetail: `${baseUrl}/api/v1/calendar/getCalendarDetail`,
  createCalendar: `${baseUrl}/api/v1/calendar/createCalendar`,
  updateCalendar: `${baseUrl}/api/v1/calendar/updateCalendar`,
  deleteCalendar: `${baseUrl}/api/v1/calendar/deleteCalendar`,
};

export default CalendarUrl;
