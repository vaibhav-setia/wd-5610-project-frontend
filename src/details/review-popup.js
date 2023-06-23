import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userToken } from '../app/userSlice';

const ReviewPopUp = ({ id }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [data, setData] = useState(null);
  const [duration, setDuration] = useState(1000);
  const [displayValue, setDisplayValue] = useState('None');
  const [nextLink, setNextLink] = useState(`/review/${id}/${duration}`);

  const token = useSelector(userToken);
  const [review, setReview] = useState('');
  const [reviewEndPeriod, setReviewEndPeriod] = useState(1000);

  const togglePopup = () => {
    setShowPopup(!showPopup);
    setReview('');
  };

  const handleClick = () => {
    if (!review || review.length === 0) {
      // Review is null or empty
      return;
    }

    const postData = {
      description: review,
      reviewEndPeriod: reviewEndPeriod,
      movie: {
        Title: data.Title,
        Year: data.Year,
        imdbID: data.imdbID,
        Type: data.Type,
        Poster: data.Poster,
      },
    };

    fetch(`${process.env.REACT_APP_BACKEND_API_BASE_URL}/api/review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: token,
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data
        console.log(data);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });

    setShowPopup(!showPopup);
  };

  const handleDropdownChange = (event) => {
    const selectedDuration = event.target.value;
    setDuration(selectedDuration);
    setReviewEndPeriod(selectedDuration);
    setNextLink(`/review/${id}/${selectedDuration}`);
  };

  const handleButtonClick = () => {
    const userInput = window.prompt('Enter a value:');
    if (userInput !== null) {
      setDisplayValue(userInput);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_API_BASE_URL}/api/detail?id=${id}`
      );
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const users = data.Ratings;

  return (
    <>
        <style>
        {`
        
          .list-group-item {
            border-left: none;
            border-right: none;
      
       
          }
        `}
      </style>

      <div className="flex flex-row">
        {showPopup ? (
          <div className="fixed inset-0 flex items-center justify-center bg-black ">
            <div className="bg-white p-8 rounded-lg">
              <textarea
                value={review}
                placeholder="My Review"
                className="form-control border border-gray-300 rounded-lg p-2 mb-4"
                onChange={(event) => setReview(event.target.value)}
              ></textarea>
              <div className="flex justify-between">
                <select
                  className="form-select mr-2"
                  onChange={handleDropdownChange}
                >
                  <option value="">Select Review Duration</option>
                  <option value="0">0</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="1000">All Time</option>
                </select>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  onClick={handleClick}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-grow">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                onClick={togglePopup}
              >
                Submit Review
              </button>
            </div>
            <div className="flex-grow">
              <div className="flex justify-end items-center">
                <select
                  className="form-select mr-2"
                  onChange={handleDropdownChange}
                >
                  <option value="">Select Review Duration</option>
                  <option value="0">0</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="1000">All Time</option>
                </select>
                <Link to={nextLink}>
                  <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
                    See Reviews
                  </button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
      {!showPopup && (
        <div  className="flex justify-center">
          <ul className="list-group" style={{ width: '80%' }}>
            <li style={{border:"none"}} className="list-group-item flex justify-center items-center">
              <img src={data.Poster} height={300} width={250} alt="not found" />
            </li>
            <li  style={{color:"white"}}className="list-group-item bg-secondary">
              <div className="flex">
                <div className="w-1/4">
                  <p>Title</p>
                </div>
                <div className="w-3/4 flex justify-center items-center p-2">
                  <p>{data.Title}</p>
                </div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="flex">
                <div className="w-1/4">
                  <b>Plot</b>
                </div>
                <div className="w-3/4 p-2">{data.Plot}</div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="flex">
                <div className="w-1/4">
                  <b>imdbRating</b>
                </div>
                <div className="w-3/4 p-2">{data.imdbRating}</div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="flex">
                <div className="w-1/4">
                  <b>Ratings</b>
                </div>
                <div className="w-3/4 p-2">
                  <div className="flex" >
                    <div className="w-1/2">
                      <b>Source</b>
                    </div>
                    <div className="w-1/2 p-2">
                      <b>Value</b>
                    </div>
                  </div>
                  {users.map((user) => (
                    <div
                      className="flex"
                      style={{ borderBottom: '0.25px solid #807c7c' }}
                      key={user.Source}
                    >
                      <div className="w-1/2">{user.Source}</div>
                      <div className="w-1/2 p-2">{user.Value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="flex">
                <div className="w-1/4">
                  <b>Director</b>
                </div>
                <div className="w-3/4 p-2">{data.Director}</div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="flex">
                <div className="w-1/4">
                  <b>Actors</b>
                </div>
                <div className="w-3/4 p-2">{data.Actors}</div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="flex">
                <div className="w-1/4">
                  <b>imdbVotes</b>
                </div>
                <div className="w-3/4 p-2">{data.imdbVotes}</div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="flex">
                <div className="w-1/4">
                  <b>imdbID</b>
                </div>
                <div className="w-3/4 p-2">{data.imdbID}</div>
              </div>
            </li>
            <li className="list-group-item">
              <div className="flex">
                <div className="w-1/4">
                  <b>BoxOffice</b>
                </div>
                <div className="w-3/4 p-2">{data.BoxOffice}</div>
              </div>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default ReviewPopUp;
