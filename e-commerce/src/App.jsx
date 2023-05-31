
import React from "react";
import { Admin } from './pages/admin/Admin';
// import { NotFound } from "./Notfound";

import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage/LoginPage";

function App() 
{
  return (
    <div>

      <Routes>
          <Route path="login" element={<LoginPage></LoginPage>}></Route>
          
      </Routes>
      {/* <Admin username = "karimmaged"></Admin> */}
    </div>
  );
}

export default App;
