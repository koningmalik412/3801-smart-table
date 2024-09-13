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
      <div className="bg-brown w-[700px] -top-[215px] -left-[100px] h-[1400px] rounded-r-full absolute"></div>
      <div className="px-[50px] pt-[100px] w-full h-screen">
        <div className="w-full h-[650px] relative mb-[50px] flex flex-row">
          <div className="w-[300px] bg-base mr-[50px] my-auto">
            <Calendar onChange={onChange} value={date} />
          </div>
          <div className="h-full flex flex-col border-4 border-darkbrown rounded-3xl grow bg-base bg-opacity-70 overflow-hidden">
            <div className="w-full h-[125px] border-b border-b-brown flex flex-row items-center justify-between px-8">
              <h2 className="text-3xl font-bold ms-10 flex">
                <CaretLeft size={32} className="me-3" /> SEPTEMBER 2024{" "}
                <CaretRight size={32} className="ms-3" />
              </h2>
              <div className="flex flex-row gap-16">
                <div className="flex">
                  <div className="bg-gray w-[300px] h-[50px] rounded-full flex flex-row">
                    <div className="bg-blue w-[100px] h-[50px] rounded-full flex justify-center">
                      <p className="text-lg my-auto">Month</p>
                    </div>
                    <div className=" w-[100px] h-[50px] rounded-full flex justify-center">
                      <p className="text-lg my-auto">Week</p>
                    </div>
                    <div className=" w-[100px] h-[50px] rounded-full flex justify-center">
                      <p className="text-lg my-auto">Day</p>
                    </div>
                  </div>
                </div>
                <Link to="/" className="relative -top-1">
                  <div className="bg-pink rounded-full w-[130px] h-[50px] flex justify-center shadow-3xl absolute z-10">
                    <h3 className="text-2xl my-auto">ADD</h3>
                  </div>
                  <div className="bg-black rounded-full w-[130px] h-[50px] flex justify-center shadow-3xl relative z-0 top-1 left-1"></div>
                </Link>
              </div>
            </div>
            <div className="flex-1">
              <div className="grid grid-cols-7 grid-rows-5 w-full h-full">
                {septDays.map((i) => (
                  <div className="border-b border-r border-brown py-2 px-3">
                    {i}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-[70px] relative flex items-center justify-between">
          <Link to="/" className="relative -top-1">
            <div className="bg-pink rounded-full w-[170px] h-[50px] flex justify-center shadow-3xl absolute z-10">
              <h3 className="text-2xl my-auto">BACK</h3>
            </div>
            <div className="bg-black rounded-full w-[170px] h-[50px] flex justify-center shadow-3xl relative z-0 top-1 left-1"></div>
          </Link>
          <div className="bg-gray w-[500px] h-[85px] rounded-full flex flex-row">
            <div className="bg-pink w-[85px] rounded-full border-4 border-darkbrown">
              <img
                src={malikdp}
                className="object-fill rounded-full"
                alt="Malik DP"
              />
            </div>
            <div className="bg-pink w-[85px] rounded-full ">
              <img
                src={malikdp}
                className="object-fill rounded-full"
                alt="Malik DP"
              />
            </div>
            <div className="bg-pink w-[85px] rounded-full ">
              <img
                src={malikdp}
                className="object-fill rounded-full"
                alt="Malik DP"
              />
            </div>
          </div>
          <div className="bg-gray w-[350px] h-full rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
