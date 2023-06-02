import { Link } from "react-router-dom";
function NavBar() {
  return (
    <nav className="nav nav-tabs mb-2">
      <Link className="nav-link" to="/home">
        Home
      </Link>
      <Link className="nav-link" to="/profile">
        Profile
      </Link>
    </nav>
  );
}

export default NavBar;
