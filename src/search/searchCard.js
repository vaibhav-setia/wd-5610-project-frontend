import React from "react";
import "./searchCard.css";
import { Link } from "react-router-dom";
const MovieCard = (props) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg flex">
      <img
        src={props.img}
        className="w-40 h-auto object-cover"
        alt="Not Found"
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src =
            "https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png";
        }}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{props.title}</div>
        <p className="text-gray-700 text-base">Year: {props.year}</p>
        <Link to={"/details/"+props.id} className="btn bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded mt-4">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
