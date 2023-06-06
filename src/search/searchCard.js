import React from "react";
import "./searchCard.css";
const MovieCard = (props) => {
    return (
        <div class="card" style={{width: '18rem;'}}>
        <img src={props.img} class="card-img-top" alt="Not Found" onError={({ currentTarget }) => {
    currentTarget.onerror = null;
    currentTarget.src="https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png";
  }} />
        <div class="card-body">
          <h5 class="card-title">{props.title}</h5>
          <p class="card-text">Year : {props.year}</p>
          <a href="#" class="stretched-link"></a>
        </div>
      </div>
    )


};

export default MovieCard;