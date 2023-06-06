import { useState } from "react";
import MovieCard from "./searchCard";
import { useEffect } from "react";
import { useSelector } from "react-redux";
const SearchList = (props) => {
  const data = props.data;

  return (
    <div>
      <h1>SearchList</h1>
      <div>
        {Object.keys(data).length
          ? data.Search.map((movie) => (
              <MovieCard
                title={movie.Title}
                img={movie.Poster}
                year={movie.Year}
                id={movie.imdbId}
              />
            ))
          : ""}
      </div>
    </div>
  );
};

export default SearchList;
