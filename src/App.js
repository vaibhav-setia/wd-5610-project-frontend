import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Profile from "./profile";
import Home from "./home";
import searchResults from './app/searchResultsSlice'
import Search from "./search";
import { configureStore } from '@reduxjs/toolkit';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search/:criteria" element={<Search/>} />
        </Routes>
    </BrowserRouter>
   
  );
}

export default App;
