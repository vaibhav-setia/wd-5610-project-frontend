import { useState } from "react";
import MovieCard from "./searchCard";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const SearchList = (props) => {
  const data = props.data;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {Object.keys(data).length ? (
          data.Search.map((movie) => (
            <MovieCard
              key={movie.imdbId}
              title={movie.Title}
              img={movie.Poster}
              year={movie.Year}
              id={movie.imdbId}
            />
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchList;
