import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import { userToken } from '../app/userSlice';
import { useSelector } from "react-redux";

import './popUp.css';

function ReviewPopUp(param) {
  const {id} =param;
  const [showPopup, setShowPopup] = useState(false);
  const [data, setData] = useState(null);
  const [duration, setDuration] = useState(1000);
  const [displayValue, setDisplayValue] = useState('None');
  const SubmitReview ="/submitreview/"+id;
  const [nextLink,setNextLink]=useState("/review/"+id+"/"+duration);
  const token = useSelector(userToken);
  let [review, setReview] = useState('');
  let [reviewEndPeriod, setReviewEndPeriod] = useState(1000);

  const togglePopup = () => {
    setShowPopup(!showPopup);
    setReview('');
  };

  const handleClick = () => {
    if (review === null || review.length === 0) {
        // Review is null or empty
        
      }
      else{
    const postData ={
        "description":review,
        "reviewEndPeriod":reviewEndPeriod,
        "movie":
            {"Title":data.Title,
            "Year":data.Year,
            "imdbID":data.imdbID,
            "Type":data.Type,
            "Poster":data.Poster
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
    }
      setShowPopup(!showPopup);
  };

  

  const handleDropdownChange=(event)=>{
      setDuration(event.target.value);
      setReviewEndPeriod(event.target.value);
      setNextLink("/review/"+id+"/"+event.target.value);
  }


  const handleButtonClick = () => {
    const userInput = window.prompt('Enter a value:');
    if (userInput !== null) {
      setDisplayValue(userInput);
    }
  };


  const fetchData = async () => {
    try {
      const response=await fetch('http://localhost:3001/api/detail?id='+id);
      // const response = await fetch('https://www.omdbapi.com/?i='+id+'&apikey=320622dc'); // Replace with your API endpoint
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //'https://www.omdbapi.com/?i=tt3896198&apikey=320622dc'
  

  if (!data) {
    return <div>Loading...</div>;
  }
  const  users  = data.Ratings;

  return (
    <>

    <div className='row'>
    {/* <button onClick={togglePopup}>Open Pop-up</button> */}
   

    {showPopup && (
      <div className='popup'>
      
        <div className="row">
            <div className="col-8">
                <textarea value={review} placeholder="My Review"
                className="form-control border-0"
                onChange={(event) => setReview(event.target.value)}>
                </textarea>
             </div>
             <div className="col-4">
             <select className="form-select" onChange={handleDropdownChange} >
                <option value="">Select Review Duration</option>
                <option value="0">0</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="1000">All Time</option>
            </select>
            <button onClick={handleClick}>
                     Submit</button>
            </div>
       </div>
        {/* <p>in submit review for movie {id} end period {reviewEndPeriod}: {review}</p> */}
       
      </div>
    )}
    
    <div className='col'>
    {!showPopup && (
        <div className="d-flex justify-content-start">

        <button className="btn btn-danger btn-lg" onClick={togglePopup}>Submit Review</button>

        </div>
    )}
    </div>
    <div className='col'>
    {!showPopup && (
    
  
  
   <div className="d-flex justify-content-end">
    <select className="form-select" onChange={handleDropdownChange}>
          <option value="">Select Review Duration</option>
          <option value="0">0</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="1000">All Time</option>
        </select>
    <Link to={nextLink}>
        <button className="btn btn-danger">See Reviews</button>
      </Link>
    {/* <ReviewForm id={id} reviewEndPeriod='30'/> */}
    </div>)}

    </div>
    </div>
  {!showPopup && (
    <>
    
    <div className="d-flex justify-content-center">
        <ul className='list-group'  style={{ width: '55%' }}>
          <li className='list-group-item d-flex justify-content-center align-items-center'><img src={data.Poster} height={300} width={250}alt='not found'/></li>
          <li className='list-group-item bg-primary'>
            <div className='row '>
              <div className='col border-end border-10'><b>Title</b></div>
              <div className='col  d-flex justify-content-center align-items-center'><b>{data.Title}</b></div>
            </div>
          </li>
      {/* Render the API data */}
  
        {/* <p>{JSON.stringify(users)}</p> */}
        
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <li className='list-group-item'>
            <div className='row'>
              <div className='col border-end border-10'><b>Plot</b></div>
              <div className='col'>{data.Plot}</div>
            </div>
          </li>
          <li className='list-group-item'>
            <div className='row'>
              <div className='col border-end border-10'><b>imdbRating</b></div>
              <div className='col'>{data.imdbRating}</div>
            </div>
          </li>
      <li className='list-group-item'>
            <div className='row'>
              <div className='col-2 border-end border-10'><b>Ratings</b></div>
              <div className='col'>
              <div className='row' style={{ border: "0.25px solid #807c7c" }}>
                      <div className='col  border-end border-10'><b>Source</b></div>
                      <div className='col'><b>Value</b></div>
                    </div>
                   

              {users.map((user) => (
                <>
                 {/* <hr style={{ borderTop: "1px solid black", marginTop: "20px" }} /> */}
                  <div className='row'  style={{ border: "0.25px solid #807c7c" }}>
                      <div className='col border-end border-10'>{user.Source}</div>
                      <div className='col'>{user.Value}</div>
                    </div>
                   
                </>
              ))}
              </div>
            </div>
          </li>
         
          
          <li className='list-group-item'>
            <div className='row'>
              <div className='col border-end border-10'><b>Director</b></div>
              <div className='col'>{data.Director}</div>
            </div>
          </li>

          <li className='list-group-item'>
            <div className='row'>
              <div className='col border-end border-10'><b>Actors</b></div>
              <div className='col'>{data.Actors}</div>
            </div>
          </li>

          <li className='list-group-item'>
            <div className='row'>
              <div className='col border-end border-10'><b>imdbVotes</b></div>
              <div className='col'>{data.imdbVotes}</div>
            </div>
          </li>
          

          <li className='list-group-item'>
            <div className='row'>
              <div className='col border-end border-10'><b>imdbID</b></div>
              <div className='col'>{data.imdbID}</div>
            </div>
          </li>



          <li className='list-group-item'>
            <div className='row'>
              <div className='col border-end border-10'><b>BoxOffice</b></div>
              <div className='col'>{data.BoxOffice}</div>
            </div>
          </li>


      

          
       
      </ul>
    </div>
    </>
    )}
    
    </>
  );
}

export default ReviewPopUp;