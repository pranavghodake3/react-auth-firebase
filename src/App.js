import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import Navbar from "./components/NavBar/NavBar";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import { useContext } from "react";
import AuthContext from "./context/authContext";

function App() {
  var defaultToken = localStorage.getItem("token");
  const [token, setTokenState] = useState(defaultToken);

  const setToken = (token) => {
    setTokenState(token);
  };

  var authContextDefaultValue = {
    token: token,
    isLogged: token ? true : false,
    setToken: setToken,
  };

  //var authCtx = useContext(AuthContext);
  //console.log("App.js authCtx: ", authCtx);
  return (
    <div className="App container">
      <AuthContext.Provider value={authContextDefaultValue}>
        <Navbar />
        <Switch>
          <Route path="/" exact>
            Home
          </Route>
          {authContextDefaultValue.isLogged && (
            <Route path="/profile" exact>
              Profile
            </Route>
          )}
          {!authContextDefaultValue.isLogged && (
            <Route path="/login" exact>
              <Login />
            </Route>
          )}
          {!authContextDefaultValue.isLogged && (
            <Route path="/register" exact>
              <Registration />
            </Route>
          )}
          <Route path="*">
            {authContextDefaultValue.isLogged ? (
              <Redirect to="/" />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
        </Switch>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
