import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Profile from "./profile";
import Home from "./home";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/home" element={<Home />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
