import React, { useState } from 'react';
import './userNav.css';
import { useNavigate } from 'react-router-dom';
import { Cart } from './Cart';
export default function UserNav() {
  let navigate = useNavigate();
  const [navItems, setNavItems] = useState({
    showCart: false,
    showWishlist: false,
  })
  function goHome() {
    navigate('/');
  }

  const cartHandler = () => {
    setNavItems({
      showCart: !navItems.showCart,
      showWishlist: false
    })
  }

  return (
    <div className='position-relative'>
      <div className="navTop">
        <div className="navLogo" onClick={goHome}>
          ECHO
        </div>
        <div className="navSearch">
          <input type="text" placeholder="Search for anything" />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>magnify</title>
            <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
          </svg>
        </div>
        <div className="cart">
          <div>Sign in</div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>heart-outline</title>
            <path d="M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title >cart-variant</title>
            <path className='user-cart' onClick={cartHandler} d="M19 20C19 21.11 18.11 22 17 22C15.89 22 15 21.1 15 20C15 18.89 15.89 18 17 18C18.11 18 19 18.9 19 20M7 18C5.89 18 5 18.89 5 20C5 21.1 5.89 22 7 22C8.11 22 9 21.11 9 20S8.11 18 7 18M7.2 14.63L7.17 14.75C7.17 14.89 7.28 15 7.42 15H19V17H7C5.89 17 5 16.1 5 15C5 14.65 5.09 14.32 5.24 14.04L6.6 11.59L3 4H1V2H4.27L5.21 4H20C20.55 4 21 4.45 21 5C21 5.17 20.95 5.34 20.88 5.5L17.3 11.97C16.96 12.58 16.3 13 15.55 13H8.1L7.2 14.63M8.5 11H10V9H7.56L8.5 11M11 9V11H14V9H11M14 8V6H11V8H14M17.11 9H15V11H16L17.11 9M18.78 6H15V8H17.67L18.78 6M6.14 6L7.08 8H10V6H6.14Z" />
          </svg>
        </div>
      </div>
      <div className="navBottom"></div>
     {navItems.showCart && <Cart props={{showCart: navItems.showCart}}></Cart>}
    </div>
  );
}
