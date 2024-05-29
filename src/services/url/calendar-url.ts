import { baseUrl } from "@/services/url";

const CalendarUrl = {
  getAllCategoryEvent: `${baseUrl}/api/v1/calendar/getAllCategoryEvent`,
  createCategoryEvent: `${baseUrl}/api/v1/calendar/createCategoryEvent`,
  updateCategoryEvent: `${baseUrl}/api/v1/calendar/updateCategoryEvent`,
  deleteCategoryEvent: `${baseUrl}/api/v1/calendar/deleteCategoryEvent`,
  getAllEventOfFamily: `${baseUrl}/api/v1/calendar/getAllCalendar`,
  getEventsOnDate: `${baseUrl}/api/v1/calendar/getEventOnDate`,
  getCalendarDetail: `${baseUrl}/api/v1/calendar/getCalendarDetail`,
  createCalendar: `${baseUrl}/api/v1/calendar/createCalendar`,
  updateCalendar: `${baseUrl}/api/v1/calendar/updateCalendar`,
  deleteCalendar: `${baseUrl}/api/v1/calendar/deleteCalendar`,
};

export default CalendarUrl;
