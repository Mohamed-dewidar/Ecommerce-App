import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { LoginPage } from '../LoginPage/LoginPage'
import { RegisterPage } from '../RegisterPage/RegisterPage'
import { ActivatinPage } from '../ActivationPage/ActivatinPage'
import { NotFound } from '../admin/Notfound'

export function Auth() {
  return (
    <div>
      <Routes>
          <Route path="" element={<LoginPage></LoginPage>}></Route>
          <Route path="login" element={<LoginPage></LoginPage>}></Route>
          <Route
            path="register"
            element={<RegisterPage></RegisterPage>}
          ></Route>
          <Route
            path="activation/:type/:uuid"
            element={<ActivatinPage></ActivatinPage>}
          ></Route>

          <Route path="*" element={<NotFound></NotFound>}></Route>
        </Routes>
    </div>
  )
}
