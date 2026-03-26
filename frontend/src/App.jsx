import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Solo from "./pages/Solo";
import Group from "./pages/Group";
import Room from "./pages/Room";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/solo" element={<Solo />} />
      <Route path="/group" element={<Group />} />
      <Route path="/room/:id" element={<Room />} />
    </Routes>
  );
}

export default App;