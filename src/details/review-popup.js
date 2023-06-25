import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { userToken } from '../app/userSlice';
import ReviewCard from '../home/reviewcard';
import { Modal, Button, Form } from 'react-bootstrap';

const ReviewPopUp = ({ id }) => {
  const [showPopup, setShowPopup] = useState(false);
  const isLoggedIn = useSelector(state=> state.user.login);
  const [data, setData] = useState(null);
  const token = useSelector(userToken);
  const [review, setReview] = useState('');
  const [reviewEndPeriod, setReviewEndPeriod] = useState(1000);

  const [reviewEndPeriodPopup, setReviewEndPeriodPopup] = useState(1000);
  const [reviewList, setReviewList] = useState([]);

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
      reviewEndPeriod: reviewEndPeriodPopup,
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
        getAllReviews();
        setReviewEndPeriodPopup(1000);
        setReviewList([]); // Clear the reviewList state
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });
  
    setShowPopup(!showPopup);
  };
  

  const getAllReviews = async (endPeriodVar = null) => {
    if (endPeriodVar == null) {
      endPeriodVar = reviewEndPeriod;
    }
  
    const url = `${process.env.REACT_APP_BACKEND_API_BASE_URL}/api/review/getAllReviewsForMoviePeriod?pageNo=1&limit=5&movieId=${id}&reviewEndPeriod=` + endPeriodVar;
  
    try {
      const apiResponse = await fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const jsonResponse = await apiResponse.json();
  
      setReviewList(jsonResponse.data);
    } catch (error) {
      console.error('Error retrieving reviews:', error);
    }
  };
  

  useEffect(() => {
    getAllReviews();
  }, []);

  const handleDropdownChange =  (event) => {
    const selectedDuration = event.target.value;
    setReviewEndPeriod(selectedDuration)
    getAllReviews(selectedDuration);
  };

  const handleDropdownChangePopup = (event) => {
    const selectedDuration = event.target.value;
  setReviewEndPeriodPopup(selectedDuration);
  
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

      <div
        className="flex justify-center"
        style={{ width: '80%', marginLeft: '10%', marginTop: '2%', marginBottom: '2%' }}
      >
        {showPopup &&
          <Modal show={showPopup} onHide={togglePopup} centered>
            <Modal.Header closeButton>
              <Modal.Title>Submit Review</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="reviewTextArea">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={review}
                    placeholder="My Review"
                    onChange={(event) => setReview(event.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="reviewEndPeriodSelect">
                  <Form.Label>Review End Period</Form.Label>
                  <Form.Control as="select" onChange={handleDropdownChangePopup}>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option selected value="1000">All Time</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button className="bg-red-500 text-white px-4 py-2 rounded-lg" onClick={togglePopup}>
                Close
              </Button>
              <Button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={handleClick}>
                Submit
              </Button>
            </Modal.Footer>
          </Modal>
        }
          {isLoggedIn&&<>
            <div className="flex-grow">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={togglePopup}
              >
                Submit Review
              </button>
            </div>
            <div className="flex-grow">
              <div className="flex justify-end items-center">
                <select className="form-select mr-2" onChange={handleDropdownChange}>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option selected value="1000">All Time</option>
                </select>
              </div>
            </div>                                              
          </>}
        
      </div>

    
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
   

      <div style={{ marginTop: '2%' }}>
  
        {reviewList && Object.keys(reviewList).length ? (
          reviewList.map((movie) => (
            
            <>
              <ReviewCard movie={movie} data={reviewList} setData={setReviewList} key={id} />

            </>
          ))
        ) : (
          <p className="text-center">No reviews found.</p>
        )}
      </div>
    </>
  );
};

export default ReviewPopUp;
