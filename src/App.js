import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Profile from "./profile";
import Register from "./register";
import Home from "./home";
import { useSelector } from "react-redux";
import searchResults from "./app/searchResultsSlice";
import Search from "./search";
import { configureStore } from "@reduxjs/toolkit";
import Details from "./details";

function App() {
  const currentUser = useSelector((state) => state.user);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route
          path="/profile"
          element={<Profile profileId={currentUser.id} />}
        />
        <Route path="/profile/:pid" element={<Profile />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search/:criteria" element={<Search />} />
        <Route path="/details/:ID" element={<Details/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
