import React from 'react';
import UserCategories from './UserCategories';
import UserProducts from './UserProducts';
import { Routes, Route } from 'react-router-dom';
export default function User() {
  return (
    <div>
      <Routes>
        <Route path="" element={<UserCategories />} />
        <Route path="/products/:category" element={<UserProducts />} />
      </Routes>
    </div>
  );
}
