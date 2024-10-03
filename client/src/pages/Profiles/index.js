import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Modal = ({ onOpen, onClose, editingProfile }) => {
  const [name, setName] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("");
  const [dob, setDob] = useState("");

  useEffect(() => {
    if (editingProfile) {
      setName(editingProfile.name);
      setRole(editingProfile.role);
      setDob(editingProfile.age);
    }
  }, [editingProfile]);

  const handleSubmit = async () => {
    const profileData = { name, fullName, role, dob };
    if (editingProfile) {
      await fetch(`http://localhost:3001/api/profiles/${editingProfile._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });
    } else {
      await fetch("http://localhost:3001/api/profiles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });
    }
    onClose();
    window.location.reload();
  };

  if (!onOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-screen bg-black bg-opacity-50">
      <div className="relative p-6 w-full max-w-md bg-base rounded-2xl shadow-xl">
        <div className="flex justify-between items-center pb-4 border-b">
          <h3 className="text-2xl font-semibold text-brown">
            {editingProfile ? "Edit Profile" : "Add Profile"}
          </h3>
          <button
            onClick={onClose}
            className="text-white bg-blue rounded-lg text-sm p-1.5 px-3 ml-auto"
          >
            x
          </button>
        </div>

        <div className="mt-4">
          <input
            type="text"
            placeholder="Name"
            className="mt-4 w-full p-2 rounded-xl bg-lightblue"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Full Name"
            className="mt-4 w-full p-2 rounded-xl bg-lightblue"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Role"
            className="mt-4 w-full p-2 rounded-xl bg-lightblue"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />

          <input
            type="text"
            placeholder="Date of Birth"
            className="mt-4 w-full p-2 rounded-xl bg-lightblue"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSubmit}
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
  const [profiles, setProfiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/profiles")
      .then((response) => response.json())
      .then((data) => setProfiles(data))
      .catch((error) => console.error("Error fetching profiles:", error));
  }, []);

  const openModal = (profile = null) => {
    setEditingProfile(profile);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProfile(null);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/profiles/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProfiles(profiles.filter((profile) => profile.id !== id));
      } else {
        console.error("Failed to delete profile from database");
      }
    } catch (error) {
      console.error("Failed to delete profile:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-8">
      <div className=" w-full p-6 bg-brown border rounded-[30px] shadow flex justify-between items-center">
        <h5 className="text-8xl font-bold text-[#FBF6E3]">FAMILY PROFILES</h5>
        <button
          onClick={() => openModal(null)}
          className="bg-pink text-brown px-6 py-3 rounded-full shadow-3xl"
        >
          Add Profile
        </button>
      </div>

      <div className="w-full h-auto mt-6 p-8 border-4 border-brown rounded-3xl bg-lightblue flex flex-col items-center">
        <div className="flex gap-10 justify-center items-center w-full">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className="h-80 p-10 w-full rounded-3xl shadow-[0px_4px_15px_rgba(0,0,0,0.5)] bg-base"
            >
              <div className="flex flex-col items-center pb-10">
                <img
                  className="w-24 h-24 mb-3 rounded-full shadow-lg"
                  src={profile.image || ""}
                  alt={profile.name}
                />
                <h5 className="mb-1 text-2xl text-blue">{profile.name}</h5>
                <span className="text-sm text-brown">{profile.role}</span>
                <p className="text-sm text-brown">
                  Date of Birth: {profile.dob}
                </p>
                <p className="text-sm text-brown">
                  Full Name: {profile.full_name}
                </p>

                <div className="flex justify-center space-x-4 mt-4">
                  <button
                    className="px-4 py-2 bg-blue text-base rounded-lg"
                    onClick={() => openModal(profile)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-4 py-2 bg-blue text-base rounded-lg"
                    onClick={() => handleDelete(profile.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        onOpen={isModalOpen}
        onClose={closeModal}
        editingProfile={editingProfile}
      />

      <div className="flex justify-start w-full">
        <Link to="/calendar">
          <button className="bg-pink text-brown px-6 py-3 rounded-full">
            BACK
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Profiles;
