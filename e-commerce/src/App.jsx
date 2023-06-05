import React, { useState } from 'react';
import { Admin } from './pages/admin/Admin';

// import { NotFound } from "./Notfound";
import User from './pages/UserPage/User';
import { BrowserRouter, Outlet } from 'react-router-dom';

import { Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { RegisterPage } from './pages/RegisterPage/RegisterPage';
import { ActivatinPage } from './pages/ActivationPage/ActivatinPage';
import {
  AuthContext,
  CartContext,
  ProductsContext,
  UserContext,
} from './context';
import { NotFound } from './pages/admin/Notfound';
import { Auth } from './pages/AuthPage/Auth';

import UserCategories from './pages/UserPage/UserCategories';
import UserProducts from './pages/UserPage/UserProducts';
import UserViewProduct from './pages/UserPage/UserViewProduct';
import { Adminhome } from './pages/admin/Adminhome';
import { Products } from './pages/admin/Products';
import { Productdetails } from './pages/admin/Productdetails';
import { Addproduct } from './pages/admin/Addproduct';

function App() {
  const [userCart, setUserCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [authUser, setAuthUser] = useState({});

  return (
    <div>
      <AuthContext.Provider value={{ authUser, setAuthUser }}>
        <CartContext.Provider value={{ userCart, setUserCart }}>
          <UserContext.Provider value={authUser.userName}>
            <ProductsContext.Provider value={{ products, setProducts }}>
              <Routes>
                {/* Auth */}
                <Route path="login" element={<LoginPage></LoginPage>}></Route>
                <Route
                  path="register"
                  element={<RegisterPage></RegisterPage>}
                ></Route>
                <Route
                  path="activation/:type/:uuid"
                  element={<ActivatinPage></ActivatinPage>}
                ></Route>

                {/* User */}
                <Route path="" element={<UserCategories />} />
                <Route path="/products/:category" element={<UserProducts />} />
                <Route
                  path="/products/:category/:id"
                  element={<UserViewProduct />}
                />

                {/* Admin */}
                <Route path="admin/:user/home" element={<Adminhome />} />
                <Route path="admin/:user/products" element={<Products />} />
                <Route
                  path="admin/:user/:category_id/:id"
                  element={<Productdetails />}
                />
                <Route
                  path="admin/:user/:category_id/:id/edit"
                  element={<Addproduct />}
                />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </ProductsContext.Provider>
          </UserContext.Provider>
        </CartContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
