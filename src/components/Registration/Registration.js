import React, { useState } from "react";
import "./registration.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
//require("dotenv").config();

const Registration = (props) => {
  const history = useHistory();
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleRegister = (e) => {
    e.preventDefault();
    const requestOptions = {
      email: state.email,
      password: state.password,
      returnSecureToken: true,
    };
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCSFPcZdU23EG_T7VktLHGnznc8XIc__pc",
        requestOptions
      )
      .then((res) => {
        history.replace("/login");
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleFieldChange = (e) => {
    setState((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
    console.log("handleFieldChange state: ", state);
  };

  return (
    <div className="container register-screen">
      <form onSubmit={handleRegister} className="register">
        <div className="container">
          <h1 className="heading-title">Register</h1>

          <label htmlFor="email">
            <b>Email</b>
          </label>
          <input
            type="text"
            placeholder="Enter Email"
            name="email"
            id="email"
            onChange={handleFieldChange}
            value={state.email}
            required
          />
          <div className="alert">{state.emailError}</div>

          <label htmlFor="password">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            id="password"
            onChange={handleFieldChange}
            value={state.password}
            required
          />
          <div className="alert">{state.passwordError}</div>

          <button type="submit" className="registerbtn btn btn-primary">
            Register
          </button>
        </div>

        <div className="container signin">
          <p>
            Already have an account? <Link to="/login">Sign in</Link>.
          </p>
        </div>
      </form>
    </div>
  );
};

export default Registration;
