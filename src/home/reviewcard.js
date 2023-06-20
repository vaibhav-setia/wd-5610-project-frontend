import Vote from "./vote";
import { useSelector } from "react-redux";
import { userToken, userId, userType } from "../app/userSlice";
import { React, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import ModalPop from "./ModalPop";
import "./styles.css"
const ReviewCard = (props) => {
  const [isShow, invokeModal] = useState(false);
  const id = useSelector(userId);
  const user = useSelector(userType);
  const token = useSelector(userToken);
  let voteToggle = "";
  const movie = props.movie;
  const [movieDescription, setMovieDescription] = useState(movie.description);

  if (movie.upvotes.find((user) => user.userId === id)) voteToggle = "upvote";
  else if (movie.downvotes.find((user) => user.userId === id))
    voteToggle = "downvote";

  const deleteReview = async () => {
    const url = `http://localhost:3001/api/review/` + movie.id;
    let apiResponse = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });
    await apiResponse.json();
    const tdata = props.data.filter((review) => review.id !== movie.id);
    props.setData(tdata);
  };

  const initModal = () => {
    invokeModal(!isShow);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-3/5">
        <div className="bg-white shadow-md rounded-md p-4 flex">
          <div className="w-1/6">
            <Vote
              score={movie.totalUpvotes - movie.totalDownvotes}
              reviewId={movie.id}
              toggle={voteToggle}
            />
          </div>
          <div className="w-1/6 flex-shrink-0">
            <img
              src={movie.movie[0].poster}
              className="card-img-top h-32 w-auto object-cover"
              alt="Not Found"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src =
                  "https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png";
              }}
            />
          </div>
          <div className="flex flex-col flex-grow pl-4">
            <div className="mb-2">
              <h5 className="text-lg font-bold">{movie.movie[0].title}</h5>
              <p className="text-gray-700 overflow-hidden overflow-ellipsis">{movieDescription}</p>
            </div>
            <div className="flex items-center justify-between">
  {user === "admin" ||
  user === "moderator" ||
  (user === "user" && id === movie.userId) ? (
    <div className="flex items-center">
      <button
        className="bg-white text-black btn-sm rounded-md mr-2"
        type="button"
        data-toggle="tooltip"
        data-placement="top"
        title="Edit"
        onClick={initModal}
      >
        <FontAwesomeIcon icon={faPenToSquare} className="text-black" />
      </button>
      <button
        className="bg-white text-red btn-sm rounded-md mr-2"
        type="button"
        data-toggle="tooltip"
        data-placement="top"
        title="Delete"
        onClick={deleteReview}
      >
        <FontAwesomeIcon icon={faTrash} className="text-red-500" />
      </button>
    </div>
  ) : null}
  <ModalPop
    show={isShow}
    movieDescription={movieDescription}
    setMovieDescription={setMovieDescription}
    movie={movie}
    initModal={initModal}
  />
</div>

          </div>
        </div>
      </div>
    </div>
  );
  
  
};

export default ReviewCard;
