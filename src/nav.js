import { Link } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import {useSelector, useDispatch } from "react-redux";
import {logInUser,userLogin,logOutUser} from './app/userSlice'
function NavBar() {
  const dispatch = useDispatch();

  const onLogIn = async (response) => {
      let apiResonse = await fetch(`http://localhost:3001/api/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({token: response.credential})
      })
      apiResonse=await apiResonse.json();
      console.log(apiResonse)
      dispatch(logInUser(apiResonse.data))

  };
  const onLogOut =  () => {
    dispatch(logOutUser())

  }
  const isLoggedIn = useSelector(userLogin);

  const errorMessage = (error) => {
      console.log(error);
};
  return (
    <nav className="nav nav-tabs mb-2">
  <div className="d-flex justify-content-start">
    <Link className="nav-link" to="/home">
      Home
    </Link>
    <Link className="nav-link" to="/profile">
      Profile
    </Link>
  </div>
  <div className="ml-auto">
  {!isLoggedIn && <GoogleLogin onSuccess={onLogIn} onError={errorMessage} />}
  {isLoggedIn && <button type="button" class="btn btn-danger" onClick={onLogOut}>LogOut</button>}
    
  </div>
</nav>

  
  

  
  );
}

export default NavBar;
