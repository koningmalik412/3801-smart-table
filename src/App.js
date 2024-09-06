import { Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import Calendar from "./pages/Calendar";
import Community from "./pages/Community";
import Games from "./pages/Games";
import Profiles from "./pages/Profiles";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/profiles" element={<Profiles />} />
      <Route path="/games" element={<Games />} />
      <Route path="/community" element={<Community />} />
    </Routes>
  );
}

export default App;
