import React from 'react';
import { Admin } from './pages/admin/Admin';
// import { NotFound } from "./Notfound";
import User from './pages/UserPage/User';

import { Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { RegisterPage } from './pages/RegisterPage/RegisterPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="login" element={<LoginPage></LoginPage>}></Route>
      </Routes>
      {/* <Admin username = "karimmaged"></Admin> */}
      <User />
    </div>
  );
}

export default App;
