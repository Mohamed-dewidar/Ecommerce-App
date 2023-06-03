import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { LoginPage } from '../LoginPage/LoginPage'
import { RegisterPage } from '../RegisterPage/RegisterPage'
import { ActivatinPage } from '../ActivationPage/ActivatinPage'


export function Auth() {
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
        </Routes>
    </div>
  )
}
