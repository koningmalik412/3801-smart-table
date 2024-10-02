import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import CalendarPage from "./pages/Calendar";
import Games from "./pages/Games";
import Profiles from "./pages/Profiles";
import Settings from "./pages/Settings";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import {
  House,
  Note,
  CalendarDots,
  Users,
  DotsThreeOutline,
  Checkerboard,
} from "@phosphor-icons/react";
import Community from "./pages/Community";
import RotateButton from "./pages/Header/rotate"; // Import RotateButton

function App() {
  const location = useLocation();

  const navLinks = [
    { path: "/", icon: <House size={60} weight="fill" /> },
    { path: "/community", icon: <Note size={60} weight="fill" /> },
    { path: "/calendar", icon: <CalendarDots size={60} weight="fill" /> },
    { path: "/profiles", icon: <Users size={60} weight="fill" /> },
    { path: "/games", icon: <Checkerboard size={60} weight="fill" /> },
    { path: "/settings", icon: <DotsThreeOutline size={60} weight="fill" /> },
  ];

  return (
    <div className="flex flex-col min-h-screen ">
      <div className="flex-grow ">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/profiles" element={<Profiles />} />
          <Route path="/games" element={<Games />} />
          <Route path="/community" element={<Community />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
      <div className="flex absolute bottom-0 right-0 pb-10">
        <Header navLinks={navLinks} />
      </div>

      {/* Position two RotateButtons */}
      <div>
        <RotateButton />
      </div>

      
      {/* {location.pathname === "/" && <Footer />} */}
    </div>
  );
}

export default App;
