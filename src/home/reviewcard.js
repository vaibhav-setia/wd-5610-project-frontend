import Vote from "./vote";
import { useSelector } from "react-redux";
import { userToken, userId, userType } from "../app/userSlice";
import { React, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import ModalPop from "./ModalPop";
const ReviewCard = (props) => {
  console.log(props);
  const [isShow, invokeModal] = useState(false);

  const initModal = () => {
    invokeModal(!isShow);
  };
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
    let apiResonse = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });
    await apiResonse.json();
    const tdata = props.data.filter((review) => review.id !== movie.id);
    props.setData(tdata);
  };

  return (
    <div className="row">
      <div className=" col-1 ">
        <Vote
          score={movie.totalUpvotes - movie.totalDownvotes}
          reviewId={movie.id}
          toggle={voteToggle}
        />
      </div>

      <div class="card col-11" style={{ width: "18rem;" }}>
        <img
          src={movie.url}
          class="card-img-top"
          alt="Not Found"
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src =
              "https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png";
          }}
        />
        <div className="card-body">
          <div className="row">
            <h5 className="card-title col-2">movie name</h5>
            <p className="card-text col-9">{movieDescription}</p>
            {console.log(id + " " + movie.userId)}
            {console.log(user)}
            <div className="col-1">
              {user === "admin" ||
              user === "moderator" ||
              (user === "user" && id === movie.userId) ? (
                <div>
                  <button
                    class="btn btn-success btn-sm rounded-0"
                    type="button"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Edit"
                    onClick={initModal}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  <button
                    class="btn btn-danger btn-sm rounded-0 col-6"
                    type="button"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Delete"
                    onClick={() => deleteReview()}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ) : (
                <div></div>
              )}{" "}
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
