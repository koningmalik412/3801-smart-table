import { Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import CalendarPage from "./pages/Calendar";
import Dashboard from "./pages/Dashboard";
import Games from "./pages/Games";
import Profiles from "./pages/Profiles";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/profiles" element={<Profiles />} />
      <Route path="/games" element={<Games />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
