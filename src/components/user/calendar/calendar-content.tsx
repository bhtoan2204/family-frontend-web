"use client";

import { EventCalendar } from "@/types/calendar";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, {
  Draggable,
  DropArg,
} from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useEffect, useRef, useState } from "react";

interface CalendarContentProps {
  token: string;
  familyId: number;
  events: EventCalendar[];
}

const CalendarContent = ({ token, familyId, events }: CalendarContentProps) => {
  const draggableRef = useRef<Draggable | null>(null);
  const [allEvents, setAllEvents] = useState<EventCalendar[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState<number | null>(null);
  const [newEvent, setNewEvent] = useState<EventCalendar>({
    id_calendar: 0,
    title: "",
    datetime: "",
    description: "",
    id_family: familyId,
    id: 0,
    allDay: false,
    start: "",
  });

  useEffect(() => {
    const draggableEl = document.getElementById("draggable-el");
    if (draggableEl && !draggableRef.current) {
      draggableRef.current = new Draggable(draggableEl, {
        itemSelector: ".fc-event",
        eventData: (eventEl) => {
          const title = eventEl.getAttribute("title");
          const id = eventEl.getAttribute("data");
          const datetime = eventEl.getAttribute("datetime");
          return {
            title,
            id,
            datetime,
          };
        },
      });
    }
  }, []);

  const handleDateClick = (arg: { date: Date; allDay: boolean }) => {
    setNewEvent({
      ...newEvent,
      start: arg.date,
      allDay: arg.allDay,
      id: new Date().getTime(),
      datetime: arg.date.toISOString(),
    });
    setShowModal(true);
  };

  const addEvent = (data: DropArg) => {
    const event = {
      ...newEvent,
      start: data.date.toISOString(),
      title: data.draggedEl.innerText,
      datetime: data.date.toISOString(),
      allDay: data.allDay,
      id: new Date().getTime(),
    };
    setAllEvents([...allEvents, event]);
  };

  const handleDeleteModal = (data: { event: { id: string } }) => {
    setShowDeleteModal(true);
    setIdToDelete(Number(data.event.id));
  };

  return (
    <div className="flex flex-1 py-4 overflow-y-auto justify-center items-center">
      <div className="flex flex-col mt-auto p-4">
        <div className="grid grid-cols-10">
          <div className="col-span-8">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "resourceTimelineWook, dayGridMonth,timeGridWeek",
              }}
              events={allEvents}
              nowIndicator={true}
              editable={true}
              droppable={true}
              selectable={true}
              selectMirror={true}
              dateClick={handleDateClick}
              drop={(data) => addEvent(data)}
              eventClick={(data) => handleDeleteModal(data)}
            />
          </div>
          <div
            id="draggable-el"
            className="ml-8 w-full border-2 p-2 rounded-md mt-16 lg:h-1/2 dark:border-[#2B2D31] border-zinc-300"
          >
            <h1 className="font-bold text-lg text-center">Events</h1>
            {events.map((event) => (
              <div
                className="fc-event border-2 p-1 m-2 w-full rounded-md ml-auto text-center bg-zinc-300 dark:bg-[#2B2D31] dark:border-[#2B2D31] border-[#F2F3F5] text-zinc-700 dark:text-zinc-400 cursor-pointer"
                title={event.title}
                key={event.id_calendar}
              >
                {event.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarContent;
