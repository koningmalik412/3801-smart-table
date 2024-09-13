import { Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import CalendarPage from "./pages/Calendar";
import Dashboard from "./pages/Dashboard";
import Games from "./pages/Games";
import Profiles from "./pages/Profiles";
import Settings from "./pages/Settings";
import Header from "./pages/Header";
import Footer from "./pages/Footer";

function App() {
  const navLinks = [
    { path: '/', text: 'Home' },
    { path: '/dashboard', text: 'Dashboard' },
    { path: '/calendar', text: 'Calendar' },
    { path: '/games', text: 'Games' },
    { path: '/profiles', text: 'Profiles' },
    { path: '/settings', text: 'Settings' },
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
      
      <Header navLinks={navLinks} />
      <Footer />
    </div>
  );
}

export default App;
