import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { userToken, userLogin } from "../app/userSlice";
import { faCircleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Vote = (props) => {
  const initstate = 0;
  const [vote, setVote] = useState(initstate);
  const [score, setScore] = useState(props.score);
  const movie = props.movie
  const token = useSelector(userToken);
  const isLoggedIn = useSelector(userLogin);
  let userId=useSelector(state=>state.user.id)
  const [voteToggle, setVoteToggle] = useState(props.toggle);


  useEffect(() => {
    if( movie.downvotes.find((user) => user.userId === userId)){
      setVote(-1);
      setScore(score + 1);
    }else if (movie.upvotes.find((user) => user.userId === userId)){
      setVote(1);
      setScore(score - 1);
    } else{
      setScore(score+vote)
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
    const url = `${process.env.REACT_APP_BACKEND_API_BASE_URL}/api/review/vote`;
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
  };

  const saveUnVoteChange = async (review_id, voteType) => {
    const url = `${process.env.REACT_APP_BACKEND_API_BASE_URL}/api/review/unvote`;
    let apiResonse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify({
        reviewId: review_id,
      }),
    });
  };

  return (
    <div align="center">
 <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <button
    className={`btn btn-${vote === 1 ? 'success' : 'light'}`}
    id="upvote"
    onClick={() => voteChange(1)}
    disabled={!isLoggedIn}
  >
    <FontAwesomeIcon icon={faCircleUp} size="2xl" />
  </button>
  <div>
    <h1 style={{ margin: '0' }}>{score + vote}</h1>
  </div>
  <button
    className={`btn btn-${vote === -1 ? 'danger' : 'light'}`}
    id="downvote"
    onClick={() => voteChange(-1)}
    disabled={!isLoggedIn}
  >
    <FontAwesomeIcon icon={faCircleUp} rotation={180} size="2xl" />
  </button>
</div>

  </div>
  
  );
  }  

export default Vote;
