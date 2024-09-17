import React from "react";
import { Link } from "react-router-dom";

const Community = () => {
  return (
    <>
      <div className="relative w-full px-12">
        {/* Title */}
        <div className="block mt-12">
          <h5 class="text-6xl text-brown">COMMUNITY BOARD</h5>
        </div>

        {/* Board */}
        <div className="relative">
          <div className="absolute bg-base h-[500px] w-full rounded-[30px] border-[3px] border-brown z-10"></div>
        </div>
      </div>
      {/* Background div */}
      <div className="absolute bottom-0 left-0 w-full h-[650px] bg-brown z-0"></div>
    </>
  );
};

export default Community;
