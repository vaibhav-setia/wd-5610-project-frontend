import Vote from "./vote";
import { useSelector } from "react-redux";
import { userToken, userId, userType } from "../app/userSlice";
import { React, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPenToSquare,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import ModalPop from "./ModalPop";
import { Link } from "react-router-dom";
import "./styles.css";
const ReviewCard = (props) => {
  const [isShow, invokeModal] = useState(false);
  const id = useSelector(userId);
  const user = useSelector(userType);
  const token = useSelector(userToken);
  const movie = props.movie;
  const showToggles = props.showToggles==false?false:true
  const [movieDescription, setMovieDescription] = useState(movie.description);
  const spoilerTitle =
    movie.reviewEndPeriod !== 1000
      ? movie.reviewEndPeriod + " Minute Spoiler"
      : "Full Spoiler!";
  const deleteReview = async (userId) => {
    const url = `${process.env.REACT_APP_BACKEND_API_BASE_URL}/api/review/` + movie.id;
    let apiResponse = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: token,
        userId : userId,
      },
    });
    await apiResponse.json();
    const tdata = props.data.filter((review) => review.id !== movie.id);
    props.setData(tdata);
    if(props.setSpoilerCount){
      props.setSpoilerCount(props.spoilerCount-1);
    }
    if(props.setTotalCount){
      props.setTotalCount(props.totalCount-1);
    }
  };

  const initModal = () => {
    invokeModal(!isShow);
  };
  const cardImageClass = showToggles ? 'h-52' : 'h-46';

  return (
    <div className="flex items-center justify-center">
      <div className="w-4/5">
        <div className="bg-white shadow-md rounded-md p-4 flex">
        <div>
          {showToggles && <div className="w-1/6">
            <Vote
              score={movie.totalUpvotes - movie.totalDownvotes}
              reviewId={movie.id}
              movie={props.movie}
            />
          </div>}
          </div>
          <div className="w-1/6  flex-shrink-0">
            <Link to={`/details/${movie.movieId}`} className="text-blue-500">
              <img
                src={movie.movie[0].poster}
                className={`card-img-top ${cardImageClass} w-auto object-cover`}
                alt="Not Found"
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src =
                    "https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png";
                }}
              />
            </Link>
          </div>
          <div className="w-5r/6 flex flex-col flex-grow pl-4">
            <div className="mb-2">
              <h5 className="text-lg font-bold">
                <Link
                  to={`/details/${movie.movieId}`}
                  className=" no-underline "
                >
                  {movie.movie[0].title}
                </Link>
                <span
                  style={{marginLeft:"3%"}}
                  type="button"
                  className="btn btn-primary-info btn-sm disabled badge"
                >
                  {spoilerTitle}
                </span>
              </h5>
              <div style={{ marginBottom: "2%" }}>
                <Link to={`/profile/${movie.userId}`} className="text-blue-500">
                  <FontAwesomeIcon icon={faUser} className="text-grey" />
                  {JSON.stringify(movie.user[0].name)
                    .replace('"', "")
                    .replace('"', "")}
                </Link>
              </div>
              <p className="text-gray-700 overflow-hidden overflow-ellipsis">
                {movieDescription}
              </p>
            </div>

            {showToggles && <div className="flex items-center justify-between">
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
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      className="text-black"
                    />
                  </button>
                  <button
                    className="bg-white text-red btn-sm rounded-md mr-2"
                    type="button"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Delete"
                    onClick={()=>deleteReview(movie.userId)}
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
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
