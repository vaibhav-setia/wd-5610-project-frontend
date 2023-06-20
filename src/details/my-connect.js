import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

function MyComponent(param) {
  const {id} =param;
  const [data, setData] = useState(null);
  const [displayValue, setDisplayValue] = useState('None');


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
    <div>
     
    </div>
    <div className="d-flex justify-content-center">
        <ul className='list-group'  style={{ width: '55%' }}>
          <li className='list-group-item d-flex justify-content-center align-items-center'><img src={data.Poster} height={300} width={250}alt='not found'/></li>
          <li className='list-group-item bg-primary text-white'>
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

          <li className='list-group-item'>
            <div className='row'>
              <div className='col border-end border-10'><b> <button onClick={handleButtonClick} className="btn btn-primary">Submit Review</button></b></div>
              <div className='col'>{displayValue}</div>
            </div>
          </li>

          
       
      </ul>
    </div>
    </>
  );
}

export default MyComponent;