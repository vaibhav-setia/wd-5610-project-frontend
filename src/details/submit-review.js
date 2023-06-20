import { useParams } from "react-router";
import {useState} from "react";
import NavBar from "../nav";
import { useEffect } from 'react';
import { useSelector } from "react-redux";
import ReviewCard from "../home/reviewcard";
import { userToken } from "../app/userSlice";


function SubmitReview(){
    let {id}=useParams();
    let [review, setReview] = useState('');
    let [reviewEndPeriod, setReviewEndPeriod] = useState(1000);
    const [totaldata, setTotalData] = useState(null);

    const token = useSelector(userToken);

    const handleDropdownChange=(event)=>{
        setReviewEndPeriod(event.target.value);
    }
    const fetchData = async () => {
        try {
          const response=await fetch('http://localhost:3001/api/detail?id='+id);
          // const response = await fetch('https://www.omdbapi.com/?i='+id+'&apikey=320622dc'); // Replace with your API endpoint
          const jsonData = await response.json();
          setTotalData(jsonData);
        } catch (error) {
          console.log('Error fetching data:', error);
        }
      };
    const handleClick = () => {
        const postData ={
            "description":review,
            "reviewEndPeriod":reviewEndPeriod,
            "movie":
                {"Title":totaldata.Title,
                "Year":totaldata.Year,
                "imdbID":totaldata.imdbID,
                "Type":totaldata.Type,
                "Poster":totaldata.Poster
                }
            };
    
        fetch('http://localhost:3001/api/review', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            token: token,
          },
          body: JSON.stringify(postData)
        })
          .then(response => response.json())
          .then(data => {
            // Handle the response data
            console.log(data);
          })
          .catch(error => {
            // Handle any errors
            console.error(error);
          });
      };

      const getAllReviews = async () => {
        const url = "http://localhost:3001/api/review/getAllReviewsForMoviePeriod?pageNo=1&limit=5&movieId="+id+"&reviewEndPeriod=1000";
    
        let apiResponse = await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const jsonResponse = await apiResponse.json();
        setData(jsonResponse.data);
    
        // return jsonResponse;
      };
    
      let [data, setData] = useState(null);
    
      useEffect(() => {
        getAllReviews();
        fetchData();
        // eslint-disable-next-line
      }, []);
      if (!totaldata) {
        return <div>Loading...</div>;
      }
    return(
        <div>
            <NavBar/>
        <div className="row">
            <div className="col">
            {/* {totaldata.Title} */}
            {/* "Title":{totaldata.Title},
                "Year":{totaldata.Year},
                "imdbID":{totaldata.imdbID},
                "Type":{totaldata.Type},
                "Poster":{totaldata.Poster} */}
                
                Write a review for the movie
            </div>
            <div className="col">
                <textarea value={review} placeholder="My Review"
                className="form-control border-0"
                onChange={(event) => setReview(event.target.value)}>
                </textarea>

             </div>
             <div className="d-flex col">
             <select className="form-select" onChange={handleDropdownChange} style={{ width: '50%' }}>
                <option value="">Select Review Duration</option>
                <option value="0">0</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="30">30</option>
            </select>
             <button className="rounded-pill btn btn-primary float-end mt-2 ps-3 pe-3 fw-bold" onClick={handleClick}>
                     Submit</button>
             </div>
       </div>
        <p>in submit review for movie {id} end period {reviewEndPeriod}: {review}</p>
        {data && Object.keys(data).length ? (
          data.map((movie) => (
            <>
            {/* <p>inside</p> */}
            <ReviewCard movie={movie} data={review} setData={setData} key={id} />
          </>
          ))
        ) : (
          <p className="text-center">No reviews found.</p>
        )}
       
        </div>

    )

}
export default SubmitReview;