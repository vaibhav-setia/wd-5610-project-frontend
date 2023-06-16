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
    <div className="container">
      <NavBar />
      <div className="row">
        <div className="col col-3 m-2">
          <PersonalDetails profileId={profileId} />
        </div>
        <div className="col col-8 m-2">
          <ProfileSpoilers />
        </div>
      </div>
    </div>
  );
}

export default Profile;
