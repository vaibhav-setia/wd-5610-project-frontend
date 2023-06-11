import NavBar from "../nav";
import React, { useEffect, useState } from 'react';
import {useSelector ,useDispatch} from "react-redux";

import { userToken ,newUser,setOldUser} from "../app/userSlice";
import { MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";

function Profile() {
  const [selectedOption, setSelectedOption] = useState(null);
  const dispatch = useDispatch();
  const token = useSelector(userToken);
  const isNewUser = useSelector(newUser);
    useEffect(()=>{
        if(!isNewUser)
            navigate("/home")

    },[])
  let navigate = useNavigate();


  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const signUp = async() => {
    await fetch(`http://localhost:3001/api/user`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json',token},
    body: JSON.stringify({userType:selectedOption})
  })
  dispatch(setOldUser());
  navigate("/home")
  };
  return (
    <div>
      <NavBar />
      <div className="container">
      <h4>Chose the user role you would like to sign up with</h4>

                <select id="option" value={selectedOption} onChange={handleOptionChange}>
                <option value="">Choose an option</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
                </select>

               { selectedOption && <MDBBtn onClick={() => signUp()}color='info'>
                Sign Up!
                 </MDBBtn>}
               
      </div>
    </div>
  );
}

export default Profile;
