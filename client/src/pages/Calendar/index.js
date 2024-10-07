import React, { useState } from "react";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import moment from "moment";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import malikdp from "../../assets/images/malikdp.jpeg";

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (date) => {
    setDate(date);
  };

  const mom = new moment();
  mom.set("month", 8);

  const days = mom.daysInMonth();
  const septDays = Array.from({ length: days }, (_, i) => i + 1);

  return (
    <div className="overflow-hidden w-full h-screen relative">
      <div className="bg-brown w-[1500px] -top-[300px] -left-[100px] h-[1800px] rounded-r-full absolute"></div>
      <div className="px-[100px] pt-[150px] w-full h-screen">
        <div className="w-full h-[1000px] relative mb-[50px] flex flex-row">
          <div className="w-[700px] bg-base mr-[60px] my-auto rounded-xl">
            <Calendar 
              onChange={onChange} 
              value={date} 
              className="text-4xl" 
              style={{ width: '100%', borderRadius: '3rem'}} 
            />
          </div>
          <div className="h-full flex flex-col border-4 border-darkbrown rounded-3xl grow bg-base bg-opacity-70 overflow-hidden">
            <div className="w-full h-[175px] border-b border-b-brown flex flex-row items-center justify-between px-8">
              <h2 className="text-6xl font-bold ms-10 flex">
                <CaretLeft size={50} className="me-3" /> SEPTEMBER 2024{" "}
                <CaretRight size={50} className="ms-3" />
              </h2>
              <div className="flex flex-row gap-16">
                <div className="flex">
                  <div className="bg-gray w-[500px] h-[70px] rounded-full flex flex-row">
                    <div className="bg-blue w-[150px] h-[70px] rounded-full flex justify-center">
                      <p className="text-2xl my-auto">Month</p>
                    </div>
                    <div className="w-[150px] h-[70px] rounded-full flex justify-center">
                      <p className="text-2xl my-auto">Week</p>
                    </div>
                    <div className="w-[150px] h-[70px] rounded-full flex justify-center">
                      <p className="text-2xl my-auto">Day</p>
                    </div>
                  </div>
                </div>
                <Link to="/" className="relative -top-1">
                  <div className="bg-pink rounded-full w-[250px] h-[70px] flex justify-center shadow-3xl absolute z-10">
                    <h6 className="text-3xl my-auto font-semibold text-brown">Add an event</h6>
                  </div>
                  <div className="bg-black rounded-full w-[250px] h-[70px] flex justify-center shadow-3xl relative z-0 top-1 left-1"></div>
                </Link>
              </div>
            </div>
            <div className="flex-1">
              <div className="grid grid-cols-7 grid-rows-5 w-full h-full">
                {septDays.map((i) => (
                  <div className="border-b border-r border-brown py-4 px-6 text-2xl" key={i}>
                    {i}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-[30px] right-[100px] rounded-full bg-gray p-1 flex items-center gap-1 shadow-xl">
          <div className="bg-pink w-[100px] h-[100px] rounded-full border-4 border-darkbrown flex justify-center items-center">
            <img
              src={malikdp}
              className="object-fill rounded-full w-full h-full"
              alt="Malik DP"
            />
          </div>
          <div className="bg-pink w-[70px] h-[70px] rounded-full border-4 border-darkbrown flex justify-center items-center">
            <img
              src={malikdp}
              className="object-fill rounded-full w-full h-full"
              alt="Malik DP"
            />
          </div>
          <div className="bg-pink w-[70px] h-[70px] rounded-full border-4 border-darkbrown flex justify-center items-center">
            <img
              src={malikdp}
              className="object-fill rounded-full w-full h-full"
              alt="Malik DP"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default CalendarPage;
