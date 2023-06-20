import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserThunk, updateUserThunk } from "../services/profile-thunk";
import { userToken } from "../app/userSlice";
import { followThunk, getFollowStatusThunk } from "../services/follow-thunk";

function PersonalDetails({ profileId = "" }) {
  const [editMode, setEditMode] = useState(false);
  const [selfProfile, setSelfProfile] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);
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

  const handleFollowUnfollow = async () => {
    if (!isFollowing) {
      const status = await dispatch(
        followThunk({ followerId: currentUser.id, followeeId: profileId })
      );
      if (status.payload.status === "success") {
        setIsFollowing(true);
      }
    }
  };

  useEffect(() => {
    async function loadProfile() {
      const { payload } = await dispatch(getUserThunk(profileId));
      setProfile(payload.data);
      if (profileId === currentUser.id) setSelfProfile(true);
    }

    async function getFollowStatus() {
      const { payload } = await dispatch(
        getFollowStatusThunk({
          followerId: currentUser.id,
          followeeId: profileId,
        })
      );
      setIsFollowing(payload.data.isFollowing);
    }
    loadProfile();
    getFollowStatus();
  }, [profileId]);

  return (
    <div>
      <div className="text-center">
        <img
          width={120}
          height={120}
          alt="Profile"
          className="m-1 rounded-circle"
          src={profile.image_url}
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
        <button
          className="btn btn-success mt-2 mb-2 w-100"
          onClick={() => handleFollowUnfollow()}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
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
