import { Link } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
function NavBar() {
    const responseMessage = async (response) => {
      const jwtToken = await fetch(`http://localhost:3001/api/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({token: response.credential})
      })
      console.log(response);
  };

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
    <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
  </div>
</nav>

  
  

  
  );
}

export default NavBar;
