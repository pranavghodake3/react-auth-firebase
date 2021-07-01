import React, { useContext, useState } from "react";
import "./login.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/authContext";

function Login(props) {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const [formDetails, setState] = useState({
    email: "",
    password: "",
    formStatusMessage: "",
  });

  function handleInputChange(e) {
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleLoginForm(e) {
    e.preventDefault();
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCSFPcZdU23EG_T7VktLHGnznc8XIc__pc",
        {
          email: formDetails.email,
          password: formDetails.password,
          returnSecureToken: true,
        }
      )
      .then((res) => {
        console.log("res: ", res);
        localStorage.setItem("token", res.data.idToken);
        authCtx.setToken(res.data.idToken);
        history.replace("/");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="container login-screen">
      <form onSubmit={handleLoginForm} method="post">
        <div className="container">
          <h2 className="heading-title">Login</h2>
          <h3>{formDetails.formStatusMessage}</h3>
          <label htmlFor="email">
            <b>Email</b>
          </label>
          <input
            type="text"
            placeholder="Enter Email"
            name="email"
            onChange={handleInputChange}
            value={formDetails.email}
            required
          />

          <label htmlFor="password">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            value={formDetails.password}
            onChange={handleInputChange}
            required
          />

          <button type="submit">Login</button>
        </div>

        <div className="container">
          <Link to="/register" className="btn btn-primary">
            Don't have an account ?
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
