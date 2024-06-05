"use client";

import "./calendar-content.css";

import moment from "moment-timezone";
import { Fragment, useCallback, useEffect, useRef } from "react";

import {
  CreateCalendar,
  DeleteCalendar,
  UpdateCalendar,
} from "@/actions/calendar-actions";
import { EventCalendar } from "@/types/calendar";
import {
  contextMenuItems,
  getWeather,
  majorSlotData,
  minorSlotData,
  timeFormatData,
  timezoneData,
  tooltipData,
  weekDays,
  weekNumberData,
} from "@/util/schedule-options";
import {
  Browser,
  Internationalization,
  addClass,
  closest,
  compile,
  extend,
  isNullOrUndefined,
  registerLicense,
  remove,
  removeClass,
} from "@syncfusion/ej2-base";
import { DataManager, Predicate, Query } from "@syncfusion/ej2-data";
import {
  ButtonComponent,
  CheckBoxComponent,
  ChangeEventArgs as SwitchEventArgs,
} from "@syncfusion/ej2-react-buttons";
import {
  ChangeEventArgs as TimeEventArgs,
  TimePickerComponent,
} from "@syncfusion/ej2-react-calendars";
import {
  ChangeEventArgs,
  CheckBoxSelection,
  DropDownListComponent,
  Inject,
  MultiSelectChangeEventArgs,
  MultiSelectComponent,
} from "@syncfusion/ej2-react-dropdowns";
import {
  SelectedEventArgs,
  UploaderComponent,
} from "@syncfusion/ej2-react-inputs";
import {
  AppBarComponent,
  BeforeOpenCloseMenuEventArgs,
  ClickEventArgs,
  ContextMenuComponent,
  MenuEventArgs as ContextMenuEventArgs,
  ItemDirective,
  ItemsDirective,
  ToolbarComponent,
} from "@syncfusion/ej2-react-navigations";
import {
  ActionEventArgs,
  Agenda,
  CellClickEventArgs,
  Day,
  DragAndDrop,
  ExcelExport,
  ICalendarExport,
  ICalendarImport,
  Month,
  Print,
  Resize,
  ResourceDirective,
  ResourcesDirective,
  ResourcesModel,
  ScheduleComponent,
  TimelineMonth,
  TimelineViews,
  TimelineYear,
  Timezone,
  ViewDirective,
  ViewsDirective,
  Week,
  WorkWeek,
  Year,
} from "@syncfusion/ej2-react-schedule";
import {
  DropDownButtonComponent,
  ItemModel,
  MenuEventArgs,
} from "@syncfusion/ej2-react-splitbuttons";
import { useRouter } from "next/navigation";

registerLicense(process.env.SYNCFUSION_LICENSE as string);

interface CalendarContentProps {
  token: string;
  familyId: number;
  events: EventCalendar[];
  calendarCollections: Record<string, any>[];
}

const CalendarContent = ({
  token,
  familyId,
  events,
  calendarCollections,
}: CalendarContentProps) => {
  let isTimelineView = useRef<boolean>(false);
  let timeBtn = useRef<HTMLElement>(null);
  let scheduleObj = useRef<ScheduleComponent>(null);
  let workWeekObj = useRef<MultiSelectComponent>(null);
  let resourceObj = useRef<MultiSelectComponent>(null);
  let liveTimeInterval: NodeJS.Timeout | number;
  let intl: Internationalization = new Internationalization();
  let contextMenuObj = useRef<ContextMenuComponent>(null);
  let selectedTarget: Element;
  const router = useRouter();

  const contextMenuOpen = (args: BeforeOpenCloseMenuEventArgs) => {
    let newEventElement: HTMLElement = document.querySelector(
      ".e-new-event"
    ) as HTMLElement;
    if (newEventElement) {
      remove(newEventElement);
      removeClass(
        [document.querySelector(".e-selected-cell") as Element],
        "e-selected-cell"
      );
    }
    scheduleObj.current!.closeQuickInfoPopup();
    let targetElement: HTMLElement = args.event.target as HTMLElement;
    if (closest(targetElement, ".e-contextmenu")) {
      return;
    }
    selectedTarget = closest(
      targetElement,
      ".e-appointment,.e-work-cells,.e-vertical-view .e-date-header-wrap .e-all-day-cells,.e-vertical-view .e-date-header-wrap .e-header-cells"
    );
    if (isNullOrUndefined(selectedTarget)) {
      args.cancel = true;
      return;
    }
    if (selectedTarget.classList.contains("e-appointment")) {
      let eventObj: Record<string, any> =
        scheduleObj.current!.getEventDetails(selectedTarget);
      if (eventObj.RecurrenceRule) {
        contextMenuObj.current!.showItems(
          ["EditRecurrenceEvent", "DeleteRecurrenceEvent"],
          true
        );
        contextMenuObj.current!.hideItems(
          ["Add", "AddRecurrence", "Today", "Save", "Delete"],
          true
        );
      } else {
        contextMenuObj.current!.showItems(["Save", "Delete"], true);
        contextMenuObj.current!.hideItems(
          [
            "Add",
            "AddRecurrence",
            "Today",
            "EditRecurrenceEvent",
            "DeleteRecurrenceEvent",
          ],
          true
        );
      }
      return;
    } else if (
      (selectedTarget.classList.contains("e-work-cells") ||
        selectedTarget.classList.contains("e-all-day-cells")) &&
      !selectedTarget.classList.contains("e-selected-cell")
    ) {
      removeClass(
        [].slice.call(
          scheduleObj.current!.element.querySelectorAll(".e-selected-cell")
        ),
        "e-selected-cell"
      );
      selectedTarget.setAttribute("aria-selected", "true");
      selectedTarget.classList.add("e-selected-cell");
    }
    contextMenuObj.current!.hideItems(
      ["Save", "Delete", "EditRecurrenceEvent", "DeleteRecurrenceEvent"],
      true
    );
    contextMenuObj.current!.showItems(["Add", "AddRecurrence", "Today"], true);
  };

  const contextMenuSelect = (args: ContextMenuEventArgs) => {
    let selectedMenuItem: string = args.item.id as string;
    let eventObj: Record<string, any> = {};
    if (selectedTarget && selectedTarget.classList.contains("e-appointment")) {
      eventObj = scheduleObj.current!.getEventDetails(selectedTarget);
    }
    switch (selectedMenuItem) {
      case "Today":
        scheduleObj.current!.selectedDate = new Date();
        break;
      case "Add":
      case "AddRecurrence":
        let selectedCells: Element[] =
          scheduleObj.current!.getSelectedElements();
        let activeCellsData: CellClickEventArgs =
          scheduleObj.current!.getCellDetails(
            selectedCells.length > 0 ? selectedCells : selectedTarget
          );
        if (selectedMenuItem === "Add") {
          scheduleObj.current!.openEditor(activeCellsData, "Add");
        } else {
          scheduleObj.current!.openEditor(activeCellsData, "Add", false, 1);
        }
        break;
      case "Save":
      case "EditOccurrence":
      case "EditSeries":
        if (selectedMenuItem === "EditSeries") {
          let query: Query = new Query().where(
            scheduleObj.current!.eventFields.id as string,
            "equal",
            eventObj.RecurrenceID as string | number
          );
          eventObj = new DataManager(
            scheduleObj.current!.eventsData
          ).executeLocal(query)[0] as Record<string, any>;
        }
        scheduleObj.current!.openEditor(eventObj, selectedMenuItem);
        break;
      case "Delete":
        scheduleObj.current!.deleteEvent(eventObj);
        break;
      case "DeleteOccurrence":
      case "DeleteSeries":
        scheduleObj.current!.deleteEvent(eventObj, selectedMenuItem);
        break;
    }
  };

  let generateEvents = (): Record<string, any>[] => {
    let eventData: Record<string, any>[] = [];

    for (let event of events) {
      eventData.push({
        Id: event.id_calendar,
        Subject: event.title,
        StartTime: new Date(event.time_start),
        EndTime: new Date(event.time_end),
        Location: event.location,
        Description: event.description,
        IsAllDay: event.is_all_day,
        CalendarId: event.category,
        RecurrenceException: event.recurrence_exception,
        RecurrenceID: event.recurrence_id,
        RecurrenceRule: event.recurrence_rule,
        StartTimezone: event.start_timezone,
        EndTimezone: event.end_timezone,
      });
    }

    if (typeof window !== "undefined" && Browser.isIE) {
      Timezone.prototype.offset = (date: Date, timezone: string): number =>
        moment.tz.zone(timezone)!.utcOffset(date.getTime());
    }
    let overviewEvents: { [key: string]: Date }[] = extend(
      [],
      eventData,
      undefined,
      true
    ) as { [key: string]: Date }[];
    if (typeof window !== "undefined") {
      let timezone: Timezone = new Timezone();
      let currentTimezone: never = timezone.getLocalTimezoneName() as never;
      for (let event of overviewEvents) {
        event.StartTime = timezone.convert(
          event.StartTime,
          "UTC",
          currentTimezone
        );
        event.EndTime = timezone.convert(event.EndTime, "UTC", currentTimezone);
      }
    }
    return overviewEvents;
  };

  useEffect(() => {
    return () => {
      if (liveTimeInterval) {
        clearInterval(liveTimeInterval as number);
      }
    };
  }, []);

  const exportItems: ItemModel[] = [
    { text: "iCalendar", iconCss: "e-icons e-export" },
    { text: "Excel", iconCss: "e-icons e-export-excel" },
  ];

  const importTemplateFn = (data: Record<string, any>): NodeList => {
    const template: string =
      '<div class="e-template-btn"><span class="e-btn-icon e-icons e-upload-1 e-icon-left"></span>${text}</div>';
    return compile(template.trim())(data);
  };

  const onImportClick = (args: SelectedEventArgs): void => {
    scheduleObj.current!.importICalendar(
      ((args.event.target as HTMLInputElement).files as any)[0]
    );
  };

  const createUpload = () => {
    const element = document.querySelector(".calendar-import .e-css.e-btn");
    element!.classList.add("e-inherit");
  };

  const onPrint = (): void => {
    scheduleObj.current!.print();
  };

  const onExportClick = (args: MenuEventArgs): void => {
    if (args.item.text === "Excel") {
      let exportDatas: Record<string, any>[] = [];
      let eventCollection: Record<string, any>[] =
        scheduleObj.current!.getEvents();
      let resourceCollection: ResourcesModel[] =
        scheduleObj.current!.getResourceCollections();
      let resourceData: Record<string, any>[] = resourceCollection[0]
        .dataSource as Record<string, any>[];
      for (let resource of resourceData) {
        let data: Record<string, any>[] = eventCollection.filter(
          (e: Record<string, any>) => e.CalendarId === resource.CalendarId
        );
        exportDatas = exportDatas.concat(data);
      }
      scheduleObj.current!.exportToExcel({
        exportType: "xlsx",
        customData: exportDatas,
        fields: ["Id", "Subject", "StartTime", "EndTime", "CalendarId"],
      });
    } else {
      scheduleObj.current!.exportToICalendar();
    }
  };

  const btnClick = () => {
    let settingsPanel: Element = document.querySelector(
      ".overview-content .right-panel"
    ) as Element;
    if (settingsPanel.classList.contains("hide")) {
      removeClass([settingsPanel], "hide");
      workWeekObj.current!.refresh();
      resourceObj.current!.refresh();
    } else {
      addClass([settingsPanel], "hide");
    }
    scheduleObj.current!.refreshEvents();
  };

  const onChange = (args: SwitchEventArgs) => {
    if (typeof args.checked !== "undefined") {
      isTimelineView.current = args.checked;
    }
    switch (scheduleObj.current!.currentView) {
      case "Day":
      case "TimelineDay":
        scheduleObj.current!.currentView = isTimelineView.current
          ? "TimelineDay"
          : "Day";
        break;
      case "Week":
      case "TimelineWeek":
        scheduleObj.current!.currentView = isTimelineView.current
          ? "TimelineWeek"
          : "Week";
        break;
      case "WorkWeek":
      case "TimelineWorkWeek":
        scheduleObj.current!.currentView = isTimelineView.current
          ? "TimelineWorkWeek"
          : "WorkWeek";
        break;
      case "Month":
      case "TimelineMonth":
        scheduleObj.current!.currentView = isTimelineView.current
          ? "TimelineMonth"
          : "Month";
        break;
      case "Year":
      case "TimelineYear":
        scheduleObj.current!.currentView = isTimelineView.current
          ? "TimelineYear"
          : "Year";
        break;
      case "Agenda":
        scheduleObj.current!.currentView = "Agenda";
        break;
    }
  };

  const updateLiveTime = (): void => {
    let scheduleTimezone: string = scheduleObj
      ? scheduleObj.current!.timezone
      : "Etc/GMT-7";
    let liveTime;
    if (scheduleObj.current!.isAdaptive) {
      liveTime = new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: scheduleTimezone,
      });
    } else {
      liveTime = new Date().toLocaleTimeString("en-US", {
        timeZone: scheduleTimezone,
      });
    }
    timeBtn.current!.innerHTML = liveTime;
  };

  const getEventData = (): Record<string, any> => {
    const date: Date = scheduleObj.current!.selectedDate;
    return {
      Id: scheduleObj.current!.getEventMaxID(),
      Subject: "",
      StartTime: new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        new Date().getHours(),
        0,
        0
      ),
      EndTime: new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        new Date().getHours() + 1,
        0,
        0
      ),
      Location: "",
      Description: "",
      IsAllDay: false,
      CalendarId: 1,
    };
  };

  const onToolbarItemClicked = (args: ClickEventArgs): void => {
    switch (args.item.text) {
      case "Day":
        scheduleObj.current!.currentView = isTimelineView.current
          ? "TimelineDay"
          : "Day";
        break;
      case "Week":
        scheduleObj.current!.currentView = isTimelineView.current
          ? "TimelineWeek"
          : "Week";
        break;
      case "WorkWeek":
        scheduleObj.current!.currentView = isTimelineView.current
          ? "TimelineWorkWeek"
          : "WorkWeek";
        break;
      case "Month":
        scheduleObj.current!.currentView = isTimelineView.current
          ? "TimelineMonth"
          : "Month";
        break;
      case "Year":
        scheduleObj.current!.currentView = isTimelineView.current
          ? "TimelineYear"
          : "Year";
        break;
      case "Agenda":
        scheduleObj.current!.currentView = "Agenda";
        break;
      case "New Event":
        const eventData: Record<string, any> = getEventData();
        scheduleObj.current!.openEditor(eventData, "Add", true);
        break;
      case "New Recurring Event":
        const recEventData: Record<string, any> = getEventData();
        scheduleObj.current!.openEditor(recEventData, "Add", true, 1);
        break;
    }
  };

  const timelineTemplate = useCallback(() => {
    return (
      <div className="template">
        <div className="icon-child">
          <CheckBoxComponent
            id="timeline_views"
            checked={isTimelineView.current}
            change={onChange}
          />
        </div>
        <div className="text-child">Timeline Views</div>
      </div>
    );
  }, []);

  const groupTemplate = useCallback(() => {
    return (
      <div className="template">
        <div className="icon-child">
          <CheckBoxComponent
            id="grouping"
            checked={true}
            change={(args: SwitchEventArgs) => {
              scheduleObj.current!.group.resources = args.checked
                ? ["Calendars"]
                : [];
            }}
          />
        </div>
        <div className="text-child">Grouping</div>
      </div>
    );
  }, []);

  const gridlineTemplate = useCallback(() => {
    return (
      <div className="template">
        <div className="icon-child">
          <CheckBoxComponent
            id="timeSlots"
            checked={true}
            change={(args: SwitchEventArgs) => {
              scheduleObj.current!.timeScale.enable = args.checked as boolean;
            }}
          />
        </div>
        <div className="text-child">Gridlines</div>
      </div>
    );
  }, []);

  const autoHeightTemplate = useCallback(() => {
    return (
      <div className="template">
        <div className="icon-child">
          <CheckBoxComponent
            id="row_auto_height"
            checked={false}
            change={(args: SwitchEventArgs) => {
              scheduleObj.current!.rowAutoHeight = args.checked as boolean;
            }}
          />
        </div>
        <div className="text-child">Row Auto Height</div>
      </div>
    );
  }, []);

  const getDateHeaderDay = (value: Date): string => {
    return intl.formatDate(value, { skeleton: "E" });
  };
  const getDateHeaderDate = (value: Date): string => {
    return intl.formatDate(value, { skeleton: "d" });
  };

  const dateHeaderTemplate = (props: { date: Date }) => {
    const weather = getWeather(props.date) ?? "";
    return (
      <Fragment>
        <div>{getDateHeaderDay(props.date)}</div>
        <div>{getDateHeaderDate(props.date)}</div>
        {/* <div
          className="date-text"
          dangerouslySetInnerHTML={{ __html: weather }}
        ></div> */}
      </Fragment>
    );
  };

  const onResourceChange = (args: MultiSelectChangeEventArgs): void => {
    let resourcePredicate: Predicate & any;
    for (let value of args.value) {
      if (resourcePredicate) {
        resourcePredicate = resourcePredicate.or(
          new Predicate("CalendarId", "equal", value)
        );
      } else {
        resourcePredicate = new Predicate("CalendarId", "equal", value);
      }
    }
    scheduleObj.current!.resources[0].query = resourcePredicate
      ? new Query().where(resourcePredicate)
      : new Query().where("CalendarId", "equal", 1);
  };

  const timezoneChange = (args: ChangeEventArgs) => {
    scheduleObj.current!.timezone = args.value as string;
    updateLiveTime();
    (
      document.querySelector(".schedule-overview #timezoneBtn") as HTMLElement
    ).innerHTML =
      '<span class="e-btn-icon e-icons e-time-zone e-icon-left"></span>' +
      args.itemData.text;
  };

  const weekNumberChange = (args: ChangeEventArgs) => {
    if (args.value == "Off") {
      scheduleObj.current!.showWeekNumber = false;
    } else {
      scheduleObj.current!.showWeekNumber = true;
      scheduleObj.current!.weekRule = args.value as any;
    }
  };

  const tooltipChange = (args: ChangeEventArgs) => {
    if (args.value === "Off") {
      scheduleObj.current!.eventSettings.enableTooltip = false;
    } else {
      scheduleObj.current!.eventSettings.enableTooltip = true;
    }
  };

  const onActionComplete = async (args: ActionEventArgs) => {
    console.log(args);
    if (args.requestType === "eventCreated") {
      for (let event of args.data as Record<string, any>[]) {
        try {
          await CreateCalendar(token, familyId, event, calendarCollections);
        } catch (error) {
          console.log(error);
        }
      }
    } else if (args.requestType === "eventChanged") {
      if (args.addedRecords!.length > 0) {
        for (let event of args.addedRecords!) {
          try {
            await CreateCalendar(token, familyId, event, calendarCollections);
          } catch (error) {
            console.log(error);
          }
        }
      }
      if (args.changedRecords!.length > 0) {
        for (let event of args.changedRecords!) {
          try {
            await UpdateCalendar(token, familyId, event, calendarCollections);
          } catch (error) {
            console.log(error);
          }
        }
      }
      if (args.deletedRecords!.length > 0) {
        for (let event of args.deletedRecords!) {
          try {
            await DeleteCalendar(token, event.Id);
          } catch (error) {
            console.log(error);
          }
        }
      }
    } else if (args.requestType === "eventRemoved") {
      if (
        args.data!.length > 0 &&
        args.deletedRecords!.length === 0 &&
        args.changedRecords!.length === 0
      ) {
        for (let event of args.data! as Record<string, any>[]) {
          try {
            await DeleteCalendar(token, event.Id);
          } catch (error) {
            console.log(error);
          }
        }
      }
      if (args.deletedRecords!.length > 0) {
        for (let event of args.deletedRecords!) {
          try {
            await DeleteCalendar(token, event.Id);
          } catch (error) {
            console.log(error);
          }
        }
      }
      if (args.changedRecords!.length > 0) {
        for (let event of args.changedRecords!) {
          try {
            await UpdateCalendar(token, familyId, event, calendarCollections);
          } catch (error) {
            console.log(error);
          }
        }
      }
    }
    router.refresh();
  };

  return (
    <div className="">
      <div className="schedule-control-section">
        <div className="control-section w-full">
          <div className="content-wrapper">
            <div className="schedule-overview">
              <AppBarComponent colorMode="Primary">
                <span className="time e-icons e-time-zone" />
                <span id="timezoneBtn" className="time">
                  UTC
                </span>
                <span className="time e-icons e-clock" />
                <span
                  id="timeBtn"
                  className="time current-time"
                  ref={timeBtn}
                />
                <div className="e-appbar-spacer" />
                <div className="control-panel calendar-export">
                  <ButtonComponent
                    id="printBtn"
                    cssClass="title-bar-btn e-inherit"
                    iconCss="e-icons e-print"
                    onClick={onPrint}
                    content="Print"
                  />
                </div>
                <div className="control-panel import-button">
                  <UploaderComponent
                    id="fileUpload"
                    type="file"
                    allowedExtensions=".ics"
                    cssClass="calendar-import"
                    buttons={{
                      browse:
                        typeof document !== "undefined"
                          ? (importTemplateFn({
                              text: "Import",
                            })[0] as HTMLElement)
                          : "",
                    }}
                    multiple={false}
                    showFileList={false}
                    selected={onImportClick}
                    created={createUpload}
                  />
                </div>
                <div className="control-panel calendar-export">
                  <DropDownButtonComponent
                    id="exportBtn"
                    content="Export"
                    cssClass="e-inherit"
                    items={exportItems}
                    select={onExportClick}
                  />
                </div>
                <ButtonComponent
                  id="settingsBtn"
                  cssClass="overview-toolbar-settings e-inherit"
                  iconCss="e-icons e-settings"
                  iconPosition="Top"
                  content=""
                  onClick={btnClick}
                />
              </AppBarComponent>
              <ToolbarComponent
                id="toolbarOptions"
                cssClass="overview-toolbar"
                width="100%"
                height={70}
                overflowMode="Scrollable"
                scrollStep={100}
                created={() =>
                  (liveTimeInterval = setInterval(() => {
                    updateLiveTime();
                  }, 1000))
                }
                clicked={onToolbarItemClicked}
              >
                <ItemsDirective>
                  <ItemDirective
                    prefixIcon="e-icons e-plus"
                    tooltipText="New Event"
                    text="New Event"
                    tabIndex={0}
                  />
                  <ItemDirective
                    prefixIcon="e-icons e-repeat"
                    tooltipText="New Recurring Event"
                    text="New Recurring Event"
                    tabIndex={0}
                  />
                  <ItemDirective type="Separator" />
                  <ItemDirective
                    prefixIcon="e-icons e-day"
                    tooltipText="Day"
                    text="Day"
                    tabIndex={0}
                  />
                  <ItemDirective
                    prefixIcon="e-icons e-week"
                    tooltipText="Week"
                    text="Week"
                    tabIndex={0}
                  />
                  <ItemDirective
                    prefixIcon="e-icons e-week"
                    tooltipText="WorkWeek"
                    text="WorkWeek"
                    tabIndex={0}
                  />
                  <ItemDirective
                    prefixIcon="e-icons e-month"
                    tooltipText="Month"
                    text="Month"
                    tabIndex={0}
                  />
                  <ItemDirective
                    prefixIcon="e-icons e-month"
                    tooltipText="Year"
                    text="Year"
                    tabIndex={0}
                  />
                  <ItemDirective
                    prefixIcon="e-icons e-agenda-date-range"
                    tooltipText="Agenda"
                    text="Agenda"
                    tabIndex={0}
                  />
                  <ItemDirective
                    tooltipText="Timeline Views"
                    text="Timeline Views"
                    template={timelineTemplate}
                  />
                  <ItemDirective type="Separator" />
                  <ItemDirective
                    tooltipText="Grouping"
                    text="Grouping"
                    template={groupTemplate}
                  />
                  <ItemDirective
                    tooltipText="Timme Slots"
                    text="Timme Slots"
                    template={gridlineTemplate}
                  />
                  <ItemDirective
                    tooltipText="Auto Fit Rows"
                    text="Auto Fit Rows"
                    template={autoHeightTemplate}
                  />
                </ItemsDirective>
              </ToolbarComponent>
              <div className="overview-content">
                <div className="left-panel">
                  <div className="overview-scheduler">
                    <ScheduleComponent
                      id="scheduler"
                      cssClass="schedule-overview"
                      ref={scheduleObj}
                      width="100%"
                      height="100%"
                      group={{ resources: ["Calendars"] }}
                      timezone="Asia/Saigon"
                      eventSettings={{ dataSource: generateEvents() }}
                      dateHeaderTemplate={dateHeaderTemplate}
                      actionComplete={onActionComplete}
                    >
                      <ResourcesDirective>
                        <ResourceDirective
                          field="CalendarId"
                          title="Calendars"
                          name="Calendars"
                          dataSource={calendarCollections}
                          query={new Query().where(
                            "CalendarId",
                            "equal",
                            calendarCollections[0].CalendarId
                          )}
                          textField="CalendarText"
                          idField="CalendarId"
                          colorField="CalendarColor"
                        />
                      </ResourcesDirective>
                      <ViewsDirective>
                        <ViewDirective option="Day" />
                        <ViewDirective option="Week" />
                        <ViewDirective option="WorkWeek" />
                        <ViewDirective option="Month" />
                        <ViewDirective option="Year" />
                        <ViewDirective option="Agenda" />
                        <ViewDirective option="TimelineDay" />
                        <ViewDirective option="TimelineWeek" />
                        <ViewDirective option="TimelineWorkWeek" />
                        <ViewDirective option="TimelineMonth" />
                        <ViewDirective option="TimelineYear" />
                      </ViewsDirective>
                      <Inject
                        services={[
                          Day,
                          Week,
                          WorkWeek,
                          Month,
                          Year,
                          Agenda,
                          TimelineViews,
                          TimelineMonth,
                          TimelineYear,
                          DragAndDrop,
                          Resize,
                          Print,
                          ExcelExport,
                          ICalendarImport,
                          ICalendarExport,
                        ]}
                      />
                    </ScheduleComponent>
                    <ContextMenuComponent
                      id="overviewContextMenu"
                      cssClass="schedule-context-menu"
                      ref={contextMenuObj}
                      target=".e-schedule"
                      items={contextMenuItems}
                      beforeOpen={contextMenuOpen}
                      select={contextMenuSelect}
                    />
                  </div>
                </div>
                <div className="right-panel hide">
                  <div className="control-panel e-css">
                    <div className="col-row">
                      <div className="col-left">
                        <label style={{ lineHeight: "34px", margin: "0" }}>
                          Calendar
                        </label>
                      </div>
                      <div className="col-right">
                        <MultiSelectComponent
                          id="resources"
                          cssClass="schedule-resource"
                          ref={resourceObj}
                          dataSource={calendarCollections}
                          mode="CheckBox"
                          fields={{ text: "CalendarText", value: "CalendarId" }}
                          enableSelectionOrder={false}
                          showClearButton={false}
                          showDropDownIcon={true}
                          popupHeight={300}
                          value={[calendarCollections[0].CalendarId]}
                          change={onResourceChange}
                        >
                          <Inject services={[CheckBoxSelection]} />
                        </MultiSelectComponent>
                      </div>
                    </div>
                    <div className="col-row">
                      <div className="col-left">
                        <label style={{ lineHeight: "34px", margin: "0" }}>
                          First Day of Week
                        </label>
                      </div>
                      <div className="col-right">
                        <DropDownListComponent
                          id="weekFirstDay"
                          dataSource={weekDays}
                          fields={{ text: "text", value: "value" }}
                          value={0}
                          popupHeight={400}
                          change={(args: ChangeEventArgs) => {
                            scheduleObj.current!.firstDayOfWeek =
                              args.value as number;
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-row">
                      <div className="col-left">
                        <label style={{ lineHeight: "34px", margin: "0" }}>
                          Work week
                        </label>
                      </div>
                      <div className="col-right">
                        <MultiSelectComponent
                          id="workWeekDays"
                          cssClass="schedule-workweek"
                          ref={workWeekObj}
                          dataSource={weekDays}
                          mode="CheckBox"
                          fields={{ text: "text", value: "value" }}
                          enableSelectionOrder={false}
                          showClearButton={false}
                          showDropDownIcon={true}
                          value={[1, 2, 3, 4, 5]}
                          change={(args: MultiSelectChangeEventArgs) =>
                            (scheduleObj.current!.workDays =
                              args.value as number[])
                          }
                        >
                          <Inject services={[CheckBoxSelection]} />
                        </MultiSelectComponent>
                      </div>
                    </div>
                    <div className="col-row">
                      <div className="col-left">
                        <label style={{ lineHeight: "34px", margin: "0" }}>
                          Timezone
                        </label>
                      </div>
                      <div className="col-right">
                        <DropDownListComponent
                          id="timezone"
                          dataSource={timezoneData}
                          fields={{ text: "text", value: "value" }}
                          value="Etc/GMT-7"
                          popupHeight={150}
                          change={timezoneChange}
                        />
                      </div>
                    </div>
                    <div className="col-row">
                      <div className="col-left">
                        <label style={{ lineHeight: "34px", margin: "0" }}>
                          Day Start Hour
                        </label>
                      </div>
                      <div className="col-right">
                        <TimePickerComponent
                          id="dayStartHour"
                          showClearButton={false}
                          value={new Date(new Date().setHours(0, 0, 0))}
                          change={(args: TimeEventArgs) =>
                            (scheduleObj.current!.startHour = intl.formatDate(
                              args.value as Date,
                              { skeleton: "Hm" }
                            ))
                          }
                        />
                      </div>
                    </div>
                    <div className="col-row">
                      <div className="col-left">
                        <label style={{ lineHeight: "34px", margin: "0" }}>
                          Day End Hour
                        </label>
                      </div>
                      <div className="col-right">
                        <TimePickerComponent
                          id="dayEndHour"
                          showClearButton={false}
                          value={new Date(new Date().setHours(23, 59, 59))}
                          change={(args: TimeEventArgs) =>
                            (scheduleObj.current!.endHour = intl.formatDate(
                              args.value as Date,
                              { skeleton: "Hm" }
                            ))
                          }
                        />
                      </div>
                    </div>
                    <div className="col-row">
                      <div className="col-left">
                        <label style={{ lineHeight: "34px", margin: "0" }}>
                          Work Start Hour
                        </label>
                      </div>
                      <div className="col-right">
                        <TimePickerComponent
                          id="workHourStart"
                          showClearButton={false}
                          value={new Date(new Date().setHours(9, 0, 0))}
                          change={(args: TimeEventArgs) =>
                            (scheduleObj.current!.workHours.start =
                              intl.formatDate(args.value as Date, {
                                skeleton: "Hm",
                              }))
                          }
                        />
                      </div>
                    </div>
                    <div className="col-row">
                      <div className="col-left">
                        <label style={{ lineHeight: "34px", margin: "0" }}>
                          Work End Hour
                        </label>
                      </div>
                      <div className="col-right">
                        <TimePickerComponent
                          id="workHourEnd"
                          showClearButton={false}
                          value={new Date(new Date().setHours(18, 0, 0))}
                          change={(args: TimeEventArgs) =>
                            (scheduleObj.current!.workHours.end =
                              intl.formatDate(args.value as Date, {
                                skeleton: "Hm",
                              }))
                          }
                        />
                      </div>
                    </div>
                    <div className="col-row">
                      <div className="col-left">
                        <label style={{ lineHeight: "34px", margin: "0" }}>
                          Slot Duration
                        </label>
                      </div>
                      <div className="col-right">
                        <DropDownListComponent
                          id="slotDuration"
                          dataSource={majorSlotData}
                          fields={{ text: "Name", value: "Value" }}
                          value={60}
                          popupHeight={150}
                          change={(args: ChangeEventArgs) => {
                            scheduleObj.current!.timeScale.interval =
                              args.value as number;
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-row">
                      <div className="col-left">
                        <label style={{ lineHeight: "34px", margin: "0" }}>
                          Slot Interval
                        </label>
                      </div>
                      <div className="col-right">
                        <DropDownListComponent
                          id="slotInterval"
                          dataSource={minorSlotData}
                          value={2}
                          popupHeight={150}
                          change={(args: ChangeEventArgs) => {
                            scheduleObj.current!.timeScale.slotCount =
                              args.value as number;
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-row">
                      <div className="col-left">
                        <label style={{ lineHeight: "34px", margin: "0" }}>
                          Time Format
                        </label>
                      </div>
                      <div className="col-right">
                        <DropDownListComponent
                          id="timeFormat"
                          dataSource={timeFormatData}
                          fields={{ text: "Name", value: "Value" }}
                          value={"hh:mm a"}
                          popupHeight={150}
                          change={(args: ChangeEventArgs) => {
                            scheduleObj.current!.timeFormat = args.value as any;
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-row">
                      <div className="col-left">
                        <label style={{ lineHeight: "34px", margin: "0" }}>
                          Week Numbers
                        </label>
                      </div>
                      <div className="col-right">
                        <DropDownListComponent
                          id="weekNumber"
                          dataSource={weekNumberData}
                          fields={{ text: "Name", value: "Value" }}
                          value={"Off"}
                          popupHeight={150}
                          change={weekNumberChange}
                        />
                      </div>
                    </div>
                    <div className="col-row">
                      <div className="col-left">
                        <label style={{ lineHeight: "34px", margin: "0" }}>
                          Tooltip
                        </label>
                      </div>
                      <div className="col-right">
                        <DropDownListComponent
                          id="tooltip"
                          dataSource={tooltipData}
                          fields={{ text: "Name", value: "Value" }}
                          value={"Off"}
                          popupHeight={150}
                          change={tooltipChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarContent;
