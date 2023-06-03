import React, { useState } from "react";
import { Admin } from "./pages/admin/Admin";

// import { NotFound } from "./Notfound";
import User from "./pages/UserPage/User";
import { BrowserRouter } from "react-router-dom";

import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";
import { ActivatinPage } from "./pages/ActivationPage/ActivatinPage";
import { AuthContext } from "./context";
import { NotFound } from "./pages/admin/Notfound";
import { Auth } from "./pages/AuthPage/Auth";

function App() {
  const [authUser, setAuthUser] = useState({
    loged: true,
    userType: "customer",
  });

  return (
    <div>
      {!authUser.loged && <Auth></Auth>}

      {authUser.loged && authUser.userType == "customer" && <User />}

      {/* <Admin username = "karimmaged"></Admin> */}
    </div>
  );
}

export default App;
