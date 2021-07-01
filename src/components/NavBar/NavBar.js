import "./NavBar.css";
import { Link, useHistory } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/authContext";

const NavBar = (props) => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  console.log("NavBar authCtx: ", authCtx);
  const handleLogout = (event) => {
    localStorage.removeItem("token");
    authCtx.setToken(null);
    history.replace("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#"></a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          {authCtx.isLogged && (
            <li className="nav-item">
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
            </li>
          )}
          {!authCtx.isLogged && (
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login/Register
              </Link>
            </li>
          )}
          {authCtx.isLogged && (
            <li className="nav-item">
              <button className="nav-link" onClick={handleLogout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
