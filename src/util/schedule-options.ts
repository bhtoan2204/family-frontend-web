import { MenuItemModel } from "@syncfusion/ej2-react-navigations";

export const getWeather = (value: Date) => {
  switch (value.getDay()) {
    case 0:
      return '<img class="weather-image"  src= "/nextjs/demos/images/schedule/weather-clear.svg" />';
    case 1:
      return '<img class="weather-image" src="/nextjs/demos/images/schedule/weather-clouds.svg"/>';
    case 2:
      return '<img class="weather-image" src="/nextjs/demos/images/schedule/weather-rain.svg"/>';
    case 3:
      return '<img class="weather-image" src="/nextjs/demos/images/schedule/weather-clouds.svg"/>';
    case 4:
      return '<img class="weather-image" src="/nextjs/demos/images/schedule/weather-rain.svg"/>';
    case 5:
      return '<img class="weather-image" src="/nextjs/demos/images/schedule/weather-clear.svg"/>';
    case 6:
      return '<img class="weather-image" src="/nextjs/demos/images/schedule/weather-clouds.svg"/>';
    default:
      return null;
  }
};

export const weekDays: Record<string, any>[] = [
  { text: "Sunday", value: 0 },
  { text: "Monday", value: 1 },
  { text: "Tuesday", value: 2 },
  { text: "Wednesday", value: 3 },
  { text: "Thursday", value: 4 },
  { text: "Friday", value: 5 },
  { text: "Saturday", value: 6 },
];

export const timezoneData: Record<string, any>[] = [
  { text: "UTC -12:00", value: "Etc/GMT+12" },
  { text: "UTC -11:00", value: "Etc/GMT+11" },
  { text: "UTC -10:00", value: "Etc/GMT+10" },
  { text: "UTC -09:00", value: "Etc/GMT+9" },
  { text: "UTC -08:00", value: "Etc/GMT+8" },
  { text: "UTC -07:00", value: "Etc/GMT+7" },
  { text: "UTC -06:00", value: "Etc/GMT+6" },
  { text: "UTC -05:00", value: "Etc/GMT+5" },
  { text: "UTC -04:00", value: "Etc/GMT+4" },
  { text: "UTC -03:00", value: "Etc/GMT+3" },
  { text: "UTC -02:00", value: "Etc/GMT+2" },
  { text: "UTC -01:00", value: "Etc/GMT+1" },
  { text: "UTC +00:00", value: "Etc/GMT" },
  { text: "UTC +01:00", value: "Etc/GMT-1" },
  { text: "UTC +02:00", value: "Etc/GMT-2" },
  { text: "UTC +03:00", value: "Etc/GMT-3" },
  { text: "UTC +04:00", value: "Etc/GMT-4" },
  { text: "UTC +05:00", value: "Etc/GMT-5" },
  { text: "UTC +05:30", value: "Asia/Calcutta" },
  { text: "UTC +06:00", value: "Etc/GMT-6" },
  { text: "UTC +07:00", value: "Etc/GMT-7" },
  { text: "UTC +08:00", value: "Etc/GMT-8" },
  { text: "UTC +09:00", value: "Etc/GMT-9" },
  { text: "UTC +10:00", value: "Etc/GMT-10" },
  { text: "UTC +11:00", value: "Etc/GMT-11" },
  { text: "UTC +12:00", value: "Etc/GMT-12" },
  { text: "UTC +13:00", value: "Etc/GMT-13" },
  { text: "UTC +14:00", value: "Etc/GMT-14" },
];

export const majorSlotData: Record<string, any>[] = [
  { Name: "1 hour", Value: 60 },
  { Name: "1.5 hours", Value: 90 },
  { Name: "2 hours", Value: 120 },
  { Name: "2.5 hours", Value: 150 },
  { Name: "3 hours", Value: 180 },
  { Name: "3.5 hours", Value: 210 },
  { Name: "4 hours", Value: 240 },
  { Name: "4.5 hours", Value: 270 },
  { Name: "5 hours", Value: 300 },
  { Name: "5.5 hours", Value: 330 },
  { Name: "6 hours", Value: 360 },
  { Name: "6.5 hours", Value: 390 },
  { Name: "7 hours", Value: 420 },
  { Name: "7.5 hours", Value: 450 },
  { Name: "8 hours", Value: 480 },
  { Name: "8.5 hours", Value: 510 },
  { Name: "9 hours", Value: 540 },
  { Name: "9.5 hours", Value: 570 },
  { Name: "10 hours", Value: 600 },
  { Name: "10.5 hours", Value: 630 },
  { Name: "11 hours", Value: 660 },
  { Name: "11.5 hours", Value: 690 },
  { Name: "12 hours", Value: 720 },
];

export const minorSlotData: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export const timeFormatData: Record<string, any>[] = [
  { Name: "12 hours", Value: "hh:mm a" },
  { Name: "24 hours", Value: "HH:mm" },
];
export const weekNumberData: Record<string, any>[] = [
  { Name: "Off", Value: "Off" },
  { Name: "First Day of Year", Value: "FirstDay" },
  { Name: "First Full Week", Value: "FirstFullWeek" },
  { Name: "First Four-Day Week", Value: "FirstFourDayWeek" },
];
export const tooltipData: Record<string, any>[] = [
  { Name: "Off", Value: "Off" },
  { Name: "On", Value: "On" },
];

export const calendarCollections: Record<string, any>[] = [
  { CalendarText: "My Calendar", CalendarId: 1, CalendarColor: "#c43081" },
  { CalendarText: "Company", CalendarId: 2, CalendarColor: "#ff7f50" },
  { CalendarText: "Birthday", CalendarId: 3, CalendarColor: "#AF27CD" },
  { CalendarText: "Holiday", CalendarId: 4, CalendarColor: "#808000" },
];

export const contextMenuItems: MenuItemModel[] = [
  { text: "New Event", iconCss: "e-icons e-plus", id: "Add" },
  {
    text: "New Recurring Event",
    iconCss: "e-icons e-repeat",
    id: "AddRecurrence",
  },
  { text: "Today", iconCss: "e-icons e-timeline-today", id: "Today" },
  { text: "Edit Event", iconCss: "e-icons e-edit", id: "Save" },
  { text: "Delete Event", iconCss: "e-icons e-trash", id: "Delete" },
  {
    text: "Delete Event",
    id: "DeleteRecurrenceEvent",
    iconCss: "e-icons e-trash",
    items: [
      { text: "Delete Occurrence", id: "DeleteOccurrence" },
      { text: "Delete Series", id: "DeleteSeries" },
    ],
  },
  {
    text: "Edit Event",
    id: "EditRecurrenceEvent",
    iconCss: "e-icons e-edit",
    items: [
      { text: "Edit Occurrence", id: "EditOccurrence" },
      { text: "Edit Series", id: "EditSeries" },
    ],
  },
];
