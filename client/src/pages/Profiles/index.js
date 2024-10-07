import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Modal = ({ onOpen, onClose, editingProfile }) => {
  const [name, setName] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("");
  const [dob, setDob] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (editingProfile) {
      setName(editingProfile.name);
      setRole(editingProfile.role);
      setDob(editingProfile.dob);
      setFullName(editingProfile.fullName);
      setImage(editingProfile.image);
    }
  }, [editingProfile]);

  const handleSubmit = async () => {
    const profileData = { name, fullName, role, dob, image };
    if (editingProfile) {
      console.log(JSON.stringify(profileData));
      await fetch(`http://localhost:3001/api/profiles/${editingProfile.id}`, {
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
      <div className="relative p-6 w-full max-w-3xl bg-base rounded-2xl shadow-xl">
        <div className="flex justify-between items-center pb-4 border-b">
          <h6 className="text-5xl my-auto font-semibold text-brown">
            {editingProfile ? "Edit Profile" : "Add Profile"}
          </h6>
          <button
            onClick={onClose}
            className="text-white bg-blue rounded-lg text-2xl p-1.5 px-3 ml-auto"
          >
            x
          </button>
        </div>

        <div className="mt-4">
          <p className="text-brown text-3xl">
            {editingProfile
              ? "Edit member details"
              : "Add a member to the family profiles"}
          </p>
          <input
            type="text"
            placeholder="Name"
            className="mt-4 w-full p-4 rounded-xl bg-lightblue text-3xl"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Full Name"
            className="mt-4 w-full p-4 rounded-xl bg-lightblue text-3xl"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Role"
            className="mt-4 w-full p-4 rounded-xl bg-lightblue text-3xl"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
          <input
            type="text"
            placeholder="Date of Birth"
            className="mt-4 w-full p-4 rounded-xl bg-lightblue text-3xl"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
          <input
            type="text"
            placeholder="Image"
            className="mt-4 w-full p-4 rounded-xl bg-lightblue text-3xl"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSubmit}
            className="px-6 py-4 bg-blue text-base rounded-lg text-2xl"
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
      <div className="w-full p-6 bg-brown border rounded-[30px] shadow flex justify-between items-center">
        <h5 className="text-9xl font-bold text-[#FBF6E3]">FAMILY PROFILES</h5>
        <div
          className="relative -top-1 cursor-pointer"
          onClick={() => openModal(null)}
        >
          <div className="bg-pink rounded-full w-[250px] h-[70px] flex justify-center shadow-3xl absolute z-10">
            <h6 className="text-3xl my-auto font-semibold text-brown">
              Add Profile
            </h6>
          </div>
          <div className="bg-black rounded-full w-[250px] h-[70px] flex justify-center shadow-3xl relative z-0 top-1 left-1"></div>
        </div>
      </div>

      <div className="w-full min-h-[900px] mt-6 p-8 border-4 border-brown rounded-3xl bg-lightblue flex flex-wrap justify-center items-center">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className="h-90 w-[calc(50%-20px)] p-10 m-2 rounded-3xl shadow-[0px_4px_15px_rgba(0,0,0,0.5)] bg-base flex flex-col items-center"
          >
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg"
              src={profile.image || ""}
              alt={profile.name}
            />
            <h5 className="mb-1 text-6xl text-blue">{profile.name}</h5>
            <span className="text-2xl text-brown">{profile.role}</span>
            <p className="text-2xl text-brown">Date of Birth: {profile.dob}</p>
            <p className="text-2xl text-brown">Full Name: {profile.fullName}</p>

            <div className="flex justify-center space-x-5 mt-4">
              <button
                className="px-9 py-4 bg-blue text-base rounded-lg text-xl"
                onClick={() => openModal(profile)}
              >
                Edit
              </button>
              <button
                className="px-9 py-4 bg-blue text-base rounded-lg text-xl"
                onClick={() => handleDelete(profile.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        onOpen={isModalOpen}
        onClose={closeModal}
        editingProfile={editingProfile}
      />

    </div>
  );
};

export default Profiles;
