import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="pt-[50px] pl-[50px] pr-[50px]"> 
      <div className="block w-full p-6 bg-brown rounded-[30px] shadow-[0px_4px_15px_rgba(0,0,0,0.5)]">  
        <h5 className="text-8xl font-bold text-[#FBF6E3]">COFFEE TABLE</h5>
      </div>
      <div className="flex mt-4">
        <div className="w-4/6 p-4">
          <div className="flex h-[270px] gap-4">
            <Link to="/calendar" className="w-4/6">
              <div className="h-full p-10 w-full rounded-[30px] shadow-[0px_4px_15px_rgba(0,0,0,0.5)] bg-base">  
                <h3 className="text-3xl text-brown font-bold ml-7 font-pathway">Calendar</h3>
                <h4 className="text-lg text-[#7B7E9D] font-bold mb-2 ml-7 italic font-pathway">Scheduling and Planning</h4>
                <p className="text-sm mt-5 mb-2 pt-4 pr-6 ml-7 text-brown font-montserrat">
                  Create and manage schedules, and view the latest events on a timeline.
                  Your family can come together, sit down, and discuss schedules collaboratively.
                </p>
              </div>
            </Link>
            <Link to="/profiles" className="w-2/6">
              <div className="h-full p-9 w-full rounded-[30px] shadow-[0px_4px_15px_rgba(0,0,0,0.5)] bg-base">  
                <h3 className="text-3xl text-brown font-bold ml-3 font-pathway">Profiles</h3>
                <h4 className="text-lg text-[#7B7E9D] font-bold mb-2 ml-3 italic font-pathway">Family profiles</h4>
                <p className="text-sm mt-7 mb-2 ml-3 mr-2 text-brown font-montserrat">
                  Manage family members and their details, including adding, editing, and deleting.
                </p>
              </div>
            </Link>
          </div>
          <Link to="/games">
            <div className="h-[200px] w-full mt-6 p-10 rounded-[30px] shadow-[0px_4px_15px_rgba(0,0,0,0.5)] bg-pink">  
              <h3 className="text-3xl font-bold text-brown ml-7 font-pathway">Games</h3>
              <h4 className="text-lg text-[#7B7E9D] font-bold mb-2 italic ml-7 font-pathway">Board games</h4>
              <p className="text-sm mt-5 mb-2 ml-7 text-brown font-montserrat">
                Use the table as a space to play board games together.
              </p>
            </div>
          </Link>
        </div>
        <div className="w-2/6 p-4">
          <Link to="/dashboard">
            <div className="h-[495px] w-full p-10 rounded-[30px] shadow-[0px_4px_15px_rgba(0,0,0,0.5)] bg-yellow">  
              <h3 className="text-3xl font-bold text-brown ml-7 font-pathway">Dashboard</h3>
              <h4 className="text-lg text-[#7B7E9D] font-bold mb-2 italic ml-7 font-pathway">Community dashboard</h4>
              <p className="text-sm mb-2 mt-10 pt-4 ml-7 mr-7 text-brown font-montserrat">
                All important events and dates are posted in the form of post-it-notes, allowing for a quick view of family schedules.
                The events and dates created can also be added and displayed on the standby screen.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
