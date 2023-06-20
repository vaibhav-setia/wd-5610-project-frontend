import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserThunk, updateUserThunk } from "../services/profile-thunk";
import { userToken } from "../app/userSlice";

function PersonalDetails({ profileId = "" }) {
  const [editMode, setEditMode] = useState(false);
  const [selfProfile, setSelfProfile] = useState(false);
  const token = useSelector(userToken);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    followers: "",
    following: "",
    spoilers: "",
  });
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user);

  const handleEditMode = () => {
    if (editMode) {
      console.log(profile);
      dispatch(updateUserThunk({ token: token, profile: profile }));
    }
    setEditMode(!editMode);
  };

  useEffect(() => {
    async function loadProfile() {
      const { payload } = await dispatch(getUserThunk(profileId));
      console.log(payload.data);
      setProfile(payload.data);
      if (profileId === currentUser.id) setSelfProfile(true);
    }
    loadProfile();
  }, [profileId]);

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
      {!editMode && <div className="mt-2 mb-2 text-center">{profile.name}</div>}
      {editMode && (
        <input
          className="mt-2 mb-2 form-control"
          type="text"
          placeholder="Full Name"
          value={profile.name}
          onChange={(event) =>
            setProfile({ ...profile, name: event.target.value })
          }
        ></input>
      )}
      {selfProfile && !editMode && (
        <div className="mt-2 mb-2 text-center">{profile.email}</div>
      )}
      {selfProfile && editMode && (
        <input
          className="mt-2 mb-2 form-control"
          type="text"
          placeholder="Email Id"
          value={profile.email}
          onChange={(event) =>
            setProfile({ ...profile, email: event.target.value })
          }
        ></input>
      )}
      {selfProfile && !editMode && (
        <div className="mt-2 mb-2 text-center">{profile.phone}</div>
      )}
      {selfProfile && editMode && (
        <input
          className="mt-2 mb-2 form-control"
          type="text"
          placeholder="Phone Number"
          value={profile.phone}
          onChange={(event) =>
            setProfile({ ...profile, phone: event.target.value })
          }
        ></input>
      )}
      {!editMode && (
        <div className="text-center text-secondary">{profile.bio}</div>
      )}
      {editMode && (
        <textarea
          className="form-control"
          placeholder="Bio"
          value={profile.bio}
          onChange={(event) =>
            setProfile({ ...profile, bio: event.target.value })
          }
        ></textarea>
      )}
      <div className="ms-1 mt-2 mb-2 me-1">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            {profile.spoilers} <br /> Spoilers
          </div>
          <div className="text-center">
            {profile.following} <br /> Following
          </div>
          <div className="text-center">
            {profile.followers} <br /> Followers
          </div>
        </div>
      </div>
      {!selfProfile && (
        <button className="btn btn-success mt-2 mb-2 w-full">Follow</button>
      )}
      {selfProfile && (
        <button
          className="btn btn-secondary mt-2 mb-2 w-full"
          onClick={() => handleEditMode()}
        >
          {!editMode ? "Edit Profile" : "Save"}
        </button>
      )}
    </div>
  );
}

export { PersonalDetails };
