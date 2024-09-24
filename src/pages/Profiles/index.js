import React, { useState } from "react";
import { Link } from "react-router-dom";


const Modal = ({ onOpen, onClose }) => {
  if (!onOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-screen bg-black bg-opacity-50">
      <div className="relative p-6 w-full max-w-md bg-base rounded-2xl shadow-xl">
        
        <div className="flex justify-between items-center pb-4 border-b">
          <h3 className="text-2xl font-semibold text-brown">Add Profile</h3>

          <button
            onClick={onClose}
            className="text-white bg-blue rounded-lg text-sm p-1.5 px-3 ml-auto">
            x
          </button>
        </div>

        
        <div className="mt-4">
          <p className="text-brown">Add a member to the family profiles</p>
          <input
            type="text"
            placeholder="Name"
            className="mt-4 w-full p-2 rounded-xl bg-lightblue"
          />
          <input
            type="text"
            placeholder="Role"
            className="mt-4 w-full p-2 rounded-xl bg-lightblue"
          />

          <input
            type="text"
            placeholder="Age"
            className="mt-4 w-full p-2 rounded-xl bg-lightblue"
          />
        </div>

        
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue text-base rounded-lg"
          >
          Save
          </button>
        </div>
      </div>
    </div>
  );
};

const Profiles = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-8">
    
    <div className="block w-full p-6 bg-brown border rounded-[30px] shadow flex justify-between items-center">
      <h5 className="text-8xl font-bold text-[#FBF6E3]">FAMILY PROFILES</h5>
      <button
        onClick={openModal}
        className="bg-pink text-brown px-6 py-3 rounded-full shadow-3xl"
      >
        Add Profile
      </button>
    </div>
      
      
      <div className="w-full h-auto mt-6 p-8 border-4 border-brown rounded-3xl bg-lightblue flex flex-col items-center">

        <div className="flex gap-10 justify-center items-center w-full">
          
          <div className="h-80 p-10 w-full rounded-3xl shadow-[0px_4px_15px_rgba(0,0,0,0.5)] bg-base">
            
            <div className="flex flex-col items-center pb-10">
              <img
                className="w-24 h-24 mb-3 rounded-full shadow-lg"
                src=""
                alt="Member 1"
              />
              <h5 className="mb-1 text-2xl text-blue">
                Water Melon
              </h5>
              <span className="text-sm text-brown">Daughter</span>
              <div className="mt-4">
                <p className="text-sm font-medium text-center text-brown">
                  Details (age/hobby,etc.?)
                </p>
              
                <div className="flex justify-center space-x-4 mt-4">
                <button className="px-4 py-2 bg-blue text-base rounded-lg">
                  Edit
                </button>
                <button className="px-4 py-2 bg-blue text-base rounded-lg">
                  Delete
                </button>
              </div>

              </div>
            </div>
          </div>

          
        <div className="h-80 p-10 w-full rounded-3xl shadow-[0px_4px_15px_rgba(0,0,0,0.5)] bg-base">
          <div className="flex flex-col items-center pb-10">
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg"
              src=""
              alt="Member 2"
            />
            <h5 className="mb-1 text-2xl text-blue">
              Melon Water
            </h5>
            <span className="text-sm text-brown">Dad</span>
            <div className="mt-4">
              <p className="text-sm font-medium text-center text-brown">
                Details (age/hobby,etc.?)
              </p>
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              <button className="px-4 py-2 bg-blue text-base rounded-lg">
                Edit
              </button>
              <button className="px-4 py-2 bg-blue text-base rounded-lg">
                Delete
              </button>
            </div>
          </div>
        </div>

        </div>
      </div>

      <div className="flex justify-start w-full">
        <Link to="/calendar">
          <button className="bg-pink text-brown px-6 py-3 rounded-full">
            BACK
          </button>
        </Link>
      </div>
      

      
      <Modal onOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Profiles;
