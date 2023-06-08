import NavBar from "../nav";
import { PersonalDetails } from "./personal-details";
import { ProfileSummaries } from "./profile-summaries";

function Profile() {
  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="row">
          <div className="col col-3 m-2">
            <PersonalDetails />
          </div>
          <div className="col col-8 m-2">
            <ProfileSummaries />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
