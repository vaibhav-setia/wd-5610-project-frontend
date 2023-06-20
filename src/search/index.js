import NavBar from "../nav";
import { useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import SearchList from "./searchList";
import { useEffect } from "react";
import { useState } from "react";
import "./index.css";

const getInitialList = async (criteria, page) => {
  const url = `http://localhost:3001/api/search?criteria=${criteria}&page=${page}`;

  const apiResponse = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const responseJson = await apiResponse.json();

  return responseJson;
};

const Search = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { criteria } = useParams();

  useEffect(() => {
    getInitialList(criteria, "1").then((response) => {
      console.log(response)
      setData(response.data);
    });
  }, [criteria]);

  const handlePageChange = (selectedPage) => {
    getInitialList(criteria, selectedPage.selected + 1).then((response) => {
      setData(response.data);
    });
  };

  return (
    <div>
      <NavBar />
      <div className="bg-img">
        <div className="container mx-auto py-8">
          <SearchList data={data} criteria={criteria} />
          <div className="flex justify-center mt-4">
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
              pageLinkClassName={"bg-white text-gray-700 px-3 py-1 rounded-full"}
              previousLinkClassName={"bg-white text-gray-700 px-3 py-1 rounded-full mr-2"}
              nextLinkClassName={"bg-white text-gray-700 px-3 py-1 rounded-full ml-2"}
              breakLinkClassName={"bg-white text-gray-700 px-3 py-1 rounded-full"}
              activeLinkClassName={"bg-blue-500 text-white px-3 py-1 rounded-full"}
            />
            ) : (""
            )}
          </div>
        </div>
      </div>
      </div>

  );
};

export default Search;
