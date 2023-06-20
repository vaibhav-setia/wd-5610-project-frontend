import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import ReviewCard from '../home/reviewcard';
import NavBar from '../nav';

function ReviewForm(param) {
    const movieid=param.id;
    let { id } = useParams();
    const {reviewEndPeriod}=useParams();
    // const reviewEndPeriod=param.reviewEndPeriod||1000;
    const getAllReviews = async () => {
      const url = "http://localhost:3001/api/review/getAllReviewsForMoviePeriod?pageNo=1&limit=5&movieId="+id+"&reviewEndPeriod="+reviewEndPeriod;
  
      let apiResponse = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const jsonResponse = await apiResponse.json();
      setData(jsonResponse.data);
  
      // return jsonResponse;
    };
  
    let [review, setData] = useState(null);
  
    useEffect(() => {
      getAllReviews();
      // eslint-disable-next-line
    }, []);
    console.log({id})
    console.log("Review"+review);

  
    return (<>
    <NavBar/>
       {/* {movieid},{reviewEndPeriod},{JSON.stringify(data, null, 2)} */}
       {/* {JSON.stringify(review, null, 2)} */}
       {/* {reviews.status} */}
       
        {review && Object.keys(review).length ? (
          review.map((movie) => (
            <>
            {/* <p>inside</p> */}
            <ReviewCard movie={movie} data={review} setData={setData} key={movieid} />
          </>
          ))
        ) : (
          <p className="text-center">No reviews found.</p>
        )}
       </>
    )
  }

export default ReviewForm;
