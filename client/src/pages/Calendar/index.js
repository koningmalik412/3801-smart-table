import React, { useState } from "react";
import malikdp from "../../assets/images/malikdp.jpeg";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugins from "@fullcalendar/daygrid";
import timeGridPlugins from "@fullcalendar/timegrid";
import itneractionPlugin from "@fullcalendar/interaction";

const CalendarPage = () => {
  return <><div>
    <FullCalendar
      plugins={[dayGridPlugins, timeGridPlugins, itneractionPlugin]}
      initalView={"timeGridWeek"}
      headerToolbar={{
        start: "today prev, next",
        center: "title",
        end: "dayGridMonth, timeGridWeek, timeGridDay"
      }} />
  </div>
  <div className="absolute top-[30px] right-[100px] rounded-full bg-gray p-1 flex items-center gap-1 shadow-xl">
      <div className="bg-pink w-[100px] h-[100px] rounded-full border-4 border-darkbrown flex justify-center items-center">
        <img
          src={malikdp}
          className="object-fill rounded-full w-full h-full"
          alt="Malik DP" />
      </div>
      <div className="bg-pink w-[70px] h-[70px] rounded-full border-4 border-darkbrown flex justify-center items-center">
        <img
          src={malikdp}
          className="object-fill rounded-full w-full h-full"
          alt="Malik DP" />
      </div>
      <div className="bg-pink w-[70px] h-[70px] rounded-full border-4 border-darkbrown flex justify-center items-center">
        <img
          src={malikdp}
          className="object-fill rounded-full w-full h-full"
          alt="Malik DP" />
      </div>
    </div>
  </>
};

export default CalendarPage;
