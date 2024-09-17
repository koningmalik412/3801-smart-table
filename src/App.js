import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import CalendarPage from "./pages/Calendar";
import Dashboard from "./pages/Dashboard";
import Games from "./pages/Games";
import Profiles from "./pages/Profiles";
import Settings from "./pages/Settings";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import { House, Note, CalendarDots, Users, DotsThreeOutline } from "@phosphor-icons/react";

function App() {
  const location = useLocation();  

  const navLinks = [
    { path: '/', icon: <House size={32} weight="fill" /> },
    { path: '/dashboard', icon: <Note size={32} weight="fill" /> },
    { path: '/calendar', icon: <CalendarDots size={32} weight="fill" /> },
    { path: '/profiles', icon: <Users size={32} weight="fill" /> },
    { path: '/settings', icon: <DotsThreeOutline size={32} weight="fill" /> },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/profiles" element={<Profiles />} />
          <Route path="/games" element={<Games />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
      <div className="flex justify-end">
        <Header navLinks={navLinks} />
      </div>

      {location.pathname === '/' && <Footer />}
    </div>
  );
}

export default App;
