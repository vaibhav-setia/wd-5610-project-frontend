import React from "react";

function PersonalDetails() {
  return (
    <div>
      <div className="text-center">
        <img
          width={120}
          height={120}
          alt="Profile"
          className="m-1 rounded-circle"
          src={`/images/rick.png`}
        />
      </div>
      <div className="mt-2 mb-2 text-center">FName LName</div>
      <div className="text-center text-secondary">
        Short bio which goes to a few lines so that I can make sure it is
        displayed correctly.
      </div>
      <div className="ms-1 mt-2 mb-2 me-1">
        <div className="row">
          <div className="col col-4 text-center">
            11 <br /> Summaries
          </div>
          <div className="col col-4 text-center">
            21 <br /> Following
          </div>
          <div className="col col-4 text-center">
            301 <br /> Followers
          </div>
        </div>
      </div>
      <button className="btn btn-success mt-2 mb-2 w-100">Follow</button>
      <button className="btn btn-secondary mt-2 mb-2 w-100">
        Edit profile
      </button>
    </div>
  );
}

export { PersonalDetails };
