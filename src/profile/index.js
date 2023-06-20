import { useParams } from "react-router";
import NavBar from "../nav";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PersonalDetails } from "./personal-details";
import { ProfileSpoilers } from "./profile-spoilers";
import { useEffect } from "react";

function Profile({ profileId = "" }) {
  const params = useParams();
  const currentUser = useSelector((state) => state.user);
  let navigate = useNavigate();

  if (profileId === null || profileId === "") {
    profileId = params.pid;
  }

  useEffect(() => {
    if (!params.pid && currentUser.login === false) {
      navigate("/home");
    }
  }, []);

  return (
    <div className=" mx-auto">
      <NavBar />
      <div className="flex flex-wrap justify-center">
        <div className="w-full md:w-1/4 m-4">
          <PersonalDetails profileId={profileId} />
        </div>
        <div className="w-full md:w-3/4 m-4">
          <ProfileSpoilers />
        </div>
      </div>
    </div>
  );
}

export default Profile;
