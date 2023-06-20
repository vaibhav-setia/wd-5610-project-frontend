import NavBar from "../nav";
import { useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import SearchList from "./searchList";
import { useEffect } from "react";
import { useState } from "react";
import "./index.css";
const getinitiallist = async (criteria, page) => {
  const url =
    `http://localhost:3001/api/search?criteria=` + criteria + "&page=" + page;

  let apiResonse = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const tjson = await apiResonse.json();

  return tjson;
};

const Search = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  let { criteria } = useParams();

  useEffect(() => {
    getinitiallist(criteria, "1").then((response) => {
      setLoading(false);
      console.log(response);
      response.data.Response === "True" ? setData(response.data) : setData([]);
    });
  }, []);

  const handlePageChange = (selectedPage) => {
    getinitiallist(criteria, selectedPage.selected + 1).then((response) => {
      setData(response.data);
    });
  };
  return (
    <div className="container">
      <NavBar />
      <div className="bg-img">
        <div>
          <SearchList data={data} criteria={criteria} />
          {data.Response === "True" ? (
            <ReactPaginate
              previousLabel={"prev"}
              nextLabel={"next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={data.totalResults / 10}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageChange}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          ) : (
            <h1>no results found</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
