import React, { useState } from "react";
import { Admin } from "./pages/admin/Admin";
// import { NotFound } from "./Notfound";

import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { RegisterPage } from "./pages/RegisterPage/RegisterPage";
import { ActivatinPage } from "./pages/ActivationPage/ActivatinPage";
import { AuthContext } from "./context";
import { NotFound } from "./pages/admin/Notfound";

function App() {
  
  return (
    <div>
      
        <Routes>
          <Route path="login" element={<LoginPage></LoginPage>}></Route>
          <Route
            path="register"
            element={<RegisterPage></RegisterPage>}
          ></Route>
          <Route
            path="activation/:type/:uuid"
            element={<ActivatinPage></ActivatinPage>}
          ></Route>

          <Route
            path="*"
            element={<NotFound></NotFound>}
          ></Route>
        </Routes>
     
      {/* <Admin username = "karimmaged"></Admin> */}
    </div>
  );
}

export default App;
