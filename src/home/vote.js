import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { userToken, userLogin } from "../app/userSlice";

const Vote = (props) => {
  const initstate = 0;
  const [vote, setVote] = useState(initstate);
  const [score, setScore] = useState(props.score);
  console.log(props)
  const movie = props.movie

  const token = useSelector(userToken);
  const isLoggedIn = useSelector(userLogin);
  let userId=useSelector(state=>state.user.id)




  useEffect(() => {
    let voteToggle=""

    if (movie.upvotes.find((user) => user.userId === userId)) voteToggle = "upvote";
    else if (movie.downvotes.find((user) => user.userId === userId))
      voteToggle = "downvote";
    if (voteToggle === "upvote") {
      setVote(1);
      setScore(score - 1);
    } else if (voteToggle === "downvote") {
      setVote(-1);
      setScore(score + 1);
    }else{
      setVote(0)
    }
  }, [userId]);


  const voteChange = (type) => {
    vote === type ? setVote(0) : setVote(type);
    if (vote !== type) {
      if (type === 1) {
        saveVoteChange(props.reviewId, "upvote");
      } else {
        saveVoteChange(props.reviewId, "downvote");
      }
    } else {
      saveUnVoteChange(props.reviewId);
    }
  };

  const saveVoteChange = async (review_id, voteType) => {
    const url = `http://localhost:3001/api/review/vote`;
    let apiResonse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify({
        review_id: review_id,
        voteType: voteType,
      }),
    });
    const tjson = await apiResonse.json();
    console.log(tjson);
  };

  const saveUnVoteChange = async (review_id, voteType) => {
    const url = `http://localhost:3001/api/review/unvote`;
    let apiResonse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify({
        review_id: review_id,
      }),
    });
  };

  return (
    <div>
      <button
        className={`btn btn-${vote === 1 ? 'success' : 'light'}`}
        id="upvote"
        onClick={() => voteChange(1)}
        disabled={!isLoggedIn}
      >
        Upvote
      </button>
      <h1>{score + vote}</h1>
      <button
        className={`btn btn-${vote === -1 ? 'danger' : 'light'}`}
        id="downvote"
        onClick={() => voteChange(-1)}
        disabled={!isLoggedIn}
      >
        Downvote
      </button>
    </div>
  );
  }  

export default Vote;
