import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <>
      <div class="block w-full p-6 bg-brown border rounded-[30px] shadow">
        <h5 class="text-8xl font-bold text-[#FBF6E3]">COFFEE TABLE</h5>
      </div>
      <div class="flex mt-4">
        <div class="w-4/6 p-4">
          <div className="flex h-[400px] gap-4">
            <Link to="/calendar" className="w-4/6">
              <div className="h-full p-4 w-full rounded-[30px] border-[3px] border-brown">
                Calendar
              </div>
            </Link>
            <Link to="/profiles" className="w-2/6">
              <div className="h-full p-4 w-full rounded-[30px] border-[3px] border-brown">
                Profiles
              </div>
            </Link>
          </div>
          <Link to="/games">
            <div className="h-[200px] w-full bg-pink mt-6 p-4 rounded-[30px] border-[3px] border-brown">
              Games
            </div>
          </Link>
        </div>
        <div className="w-2/6 p-4">
          <Link to="/community">
            <div className="h-[500px] w-full p-4 bg-yellow rounded-[30px] border-[3px] border-brown">
              Dashboard
            </div>
          </Link>
          <div className="h-[100px] w-full mt-6 p-4 bg-gray rounded-[30px] border-[3px] border-brown">
            Navigation Bar
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
