import React, { useState } from "react";

const AuthContext = React.createContext({
  token: null,
  isLogged: false,
  setIsLoggedFun: () => {},
});

export const AuthContextProvider = (props) => {
  var isToken = localStorage.getItem("token");
  const [iseLogged, setIsLogged] = useState(false);

  if (isToken) {
    setIsLogged(true);
  }

  const setIsLoggedFun = (value) => {
    setIsLogged(value);
  };

  var AuthContextVaue = {
    token: isToken ? isToken : null,
    isLogged: iseLogged,
    setIsLoggedFun: setIsLoggedFun,
  };
  console.log("AuthContextVaue: ", AuthContextVaue);
  return (
    <AuthContext.Provider value={AuthContextVaue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
