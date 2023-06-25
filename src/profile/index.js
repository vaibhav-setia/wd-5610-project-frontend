import { useParams } from "react-router";
import NavBar from "../nav";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PersonalDetails } from "./personal-details";
import { ProfileSpoilers } from "./profile-spoilers";
import { useEffect, useState } from "react";

function Profile({ profileId = "" }) {
  const params = useParams();
  const currentUser = useSelector((state) => state.user);
  let navigate = useNavigate();
  const [spoilerCount, setSpoilerCount] = useState(0);
  if (profileId === null || profileId === "") {
    profileId = params.pid;
  }

  useEffect(() => {
    if (!params.pid && currentUser.login === false) {
      navigate("/home");
    }
  }, []);

  useEffect(() => {
   setSpoilerCount(spoilerCount);
  }, [spoilerCount]);
  return (
    <div >
      <NavBar />
      <div style={{marginLeft:"5%"}} className="row">
        <div className="col col-3 m-2">
          <PersonalDetails profileId={profileId} spoilerCount={spoilerCount} setSpoilerCount={setSpoilerCount}/>
        </div>
        <div className="col col-8 m-2">
          <ProfileSpoilers profileId={profileId} spoilerCount={spoilerCount} setSpoilerCount={setSpoilerCount} />
        </div>
      </div>
    </div>
  );
}

export default Profile;
