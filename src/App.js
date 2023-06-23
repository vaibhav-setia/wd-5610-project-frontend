import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Profile from "./profile";
import Register from "./register";
import Home from "./home";
import { useSelector } from "react-redux";
import Search from "./search";
import Details from "./details";
import ReviewForm from "./details/review-form";
import SubmitReview from "./details/submit-review";
import FollowersList from "./followers";

function App() {
  const currentUser = useSelector((state) => state.user);
  return (
    <HashRouter>
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
        <Route path="/details/:ID" element={<Details />} />
        <Route path="/review/:id/:reviewEndPeriod" element={<ReviewForm />} />
        <Route path="/submitreview/:id" element={<SubmitReview />} />
        <Route
          path="/followers/:userId"
          element={<FollowersList title="Followers" />}
        />
        <Route
          path="/following/:userId"
          element={<FollowersList title="Following" />}
        />
      </Routes>
    </HashRouter>
  );
}

export default App;
