import React, { useState } from "react";
import { Admin } from "./pages/admin/Admin";

// import { NotFound } from "./Notfound";
import User from "./pages/UserPage/User";
import { BrowserRouter, Outlet } from "react-router-dom";

import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";
import { ActivatinPage } from "./pages/ActivationPage/ActivatinPage";
import { AuthContext } from "./context";
import { NotFound } from "./pages/admin/Notfound";
import { Auth } from "./pages/AuthPage/Auth";
import UserCategories from "./pages/UserPage/UserCategories";
import UserProducts from "./pages/UserPage/UserProducts";
import UserViewProduct from "./pages/UserPage/UserViewProduct";

function App() {
  const [authUser, setAuthUser] = useState({
    loged: true,
    type: "admin",
    userName: "amrabrazek",
  });

  return (
    <div>
      <AuthContext.Provider value={{ authUser, setAuthUser }}>

        {!authUser.loged && <User></User>}
        {!authUser.loged && <Auth></Auth>}

        {authUser.loged && authUser.type == "customer" && <User />}
        {authUser.loged && authUser.type == "admin"  && <Admin username ={authUser.userName} ></Admin>}
      </AuthContext.Provider>
    </div>
  );
}

export default App;
