import React, { useState, useRef, useEffect } from "react";
import Calendar from "react-calendar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugins from "@fullcalendar/daygrid";
import timeGridPlugins from "@fullcalendar/timegrid";
import itneractionPlugin from "@fullcalendar/interaction";
import AddEvent from "../Community/addEvent";

import "react-calendar/dist/Calendar.css";
import "./calendar.css";

const EventDetailsModal = ({ event, onClose, onEdit, onDelete }) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-20 bg-black bg-opacity-50"
      onClick={onClose}
      style={{ zIndex: 40, position: "fixed" }}
    >
      <div
        style={{ height: "1100px" }}
        className="bg-base rounded-xl p-12 shadow-lg max-h-2xl max-w-6xl w-full flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-brown">
          <h2 className="mx-8 mt-8 text-9xl font-semibold">{event.title}</h2>
          <p className="mx-8 mt-20 text-4xl ">
            <strong>Location:</strong> {event.location}
          </p>
          <p className="mx-8 mt-8 text-4xl">
            <strong>Start Time:</strong> {event.startTime?.slice(0, 10)}{" "}
            {event.startTime?.slice(11, 16)}
          </p>
          <p className="mx-8 mt-4 text-4xl">
            <strong>End Time:</strong> {event.endTime?.slice(0, 10)}{" "}
            {event.endTime?.slice(11, 16)}
          </p>

          <p className="mx-8 mt-20 text-4xl">{event.description}</p>
        </div>
        <div className="flex justify-center space-x-4 mb-12">
          <button
            onClick={() => onEdit(event)}
            className="px-48 py-4 text-5xl bg-blue text-white rounded-lg"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(event.id)}
            className="px-44 py-4 text-5xl bg-blue text-white rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

function renderEventContent(eventInfo) {
  return (
    <div>
      <p>
        <b className="mx-1">{eventInfo.timeText}</b>
        {eventInfo.event.title}
      </p>
    </div>
  );
}

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const calendarRef = useRef(null);

  const onDateChange = (date) => {
    setDate(date);
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(date);
    }
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event); // Set the current event for editing
    setIsDetailOpen(false);
    setIsPopupOpen(true); // Open the modal
  };

  const handleEventDetail = (eventData) => {
    const event = eventList.find((e) => {
      return e.id === parseInt(eventData.event.id);
    });

    setIsDetailOpen(true);
    setSelectedEvent(event);
  };

  const handleDeleteEvent = async (id) => {
    try {
      await fetch(`http://localhost:3001/api/events/${id}`, {
        method: "DELETE",
      });

      window.location.reload();
    } catch (error) {
      console.error("Failed to delete event:", error);
    }
  };

  const handleOpenPopup = () => {
    setEditingEvent(null);
    setIsPopupOpen(true);
  };
  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setEditingEvent(null);
  };

  const handleCloseDetail = () => {
    setSelectedEvent(null);
    setIsDetailOpen(false);
    setEditingEvent(null);
  };

  const handleAddEvent = async (event) => {
    console.log(event);
    const newEvent = event;
    try {
      await fetch("http://localhost:3001/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });
      window.location.reload();
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  useEffect(() => {
    fetch("http://localhost:3001/api/events")
      .then((response) => response.json())
      .then((data) => {
        setEventList(data);
        setEvents(
          data.map((e) => {
            return {
              id: e.id,
              title: e.title,
              start: e.startTime,
              end: e.endTime,
              allDay: e.isAllDay,
              backgroundColor: e.color,
            };
          })
        );
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  return (
    <div className="overflow-hidden w-full h-screen relative">
      <div className="bg-brown w-[1500px] -top-[300px] -left-[100px] h-[2000px] rounded-r-full absolute"></div>
      <div className="absolute mt-10 ms-28">
        <h5 className="text-9xl text-[#FBF6E3]">CALENDAR</h5>
      </div>

      <div className="px-[100px] pt-[100px] w-full h-screen">
        <div className="w-full h-[1070px] relative mb-[50px] flex flex-row mt-20">
          <div className="w-[500px] mr-[60px] my-auto rounded-2xl">
            <Calendar
              onChange={onDateChange}
              value={date}
              className="text-4xl rounded-2xl"
              style={{ width: "100%", borderRadius: "3rem" }}
            />
          </div>
          <div className="flex-column w-full">
            <div className="h-full flex flex-col border-4 border-darkbrown rounded-3xl grow bg-base bg-opacity-70 overflow-hidden">
              <FullCalendar
                height={"100%"}
                ref={calendarRef}
                plugins={[dayGridPlugins, timeGridPlugins, itneractionPlugin]}
                headerToolbar={{
                  start: "prev next",
                  center: "title",
                  end: "today dayGridMonth,timeGridWeek,timeGridDay",
                }}
                events={events}
                dateClick={(info) => onDateChange(info.date)}
                eventContent={renderEventContent}
                eventTimeFormat={{
                  hour: "numeric",
                  minute: "2-digit",
                  meridiem: false,
                }}
                firstDay={1}
                eventBorderColor="transparent"
                eventClick={(event) => handleEventDetail(event)}
                nextDayThreshold="00:00:00"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-14 right-20">
        <div
          onClick={handleOpenPopup}
          className="bg-pink rounded-full w-[300px] h-[70px] flex justify-center shadow-3xl absolute z-10 cursor-pointer"
        >
          <h6 className="text-3xl my-auto font-semibold text-brown">
            ADD EVENT
          </h6>
        </div>
        <div className="bg-black rounded-full w-[300px] h-[70px] flex justify-center shadow-3xl relative z-0 top-1 left-1"></div>
      </div>
      <AddEvent
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        onAddEvent={handleAddEvent}
        editingEvent={editingEvent}
        onDelete={handleDeleteEvent}
      />
      {isDetailOpen && (
        <EventDetailsModal
          event={selectedEvent}
          onClose={handleCloseDetail}
          onEdit={handleEditEvent}
          onDelete={handleDeleteEvent}
          editingEvent={editingEvent}
        />
      )}
    </div>
  );
};

export default CalendarPage;
