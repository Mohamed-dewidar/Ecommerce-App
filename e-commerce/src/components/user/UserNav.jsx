import React, { useEffect, useState } from 'react';
import './userNav.css';
import { useNavigate } from 'react-router-dom';
import { Cart } from './Cart';
import { AuthContext, ProductsContext } from '../../context';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
export default function UserNav() {
  let params = useParams();
  let allProducts = [];
  if ('category' in params && !('id' in params)) {
    let { category } = params;
    axios.get(`http://localhost:3005/${category}/`).then((response) => {
      for (let i = 1; i < response.data.length; i++) {
        allProducts.push(response.data[i]);
      }
    });
  }

  const { authUser } = useContext(AuthContext);
  const { products, setProducts } = useContext(ProductsContext);
  let navigate = useNavigate();
  const [navItems, setNavItems] = useState({
    showCart: false,
    showWishlist: false,
  });
  function goHome() {
    navigate('/');
  }

  const cartHandler = () => {
    if (!authUser.id) {
      navigate('/login');
      return;
    }
    setNavItems({
      showCart: !navItems.showCart,
      showWishlist: false,
    });
  };

  function searchProducts(e) {
    let filteredProducts = allProducts.filter((product) => {
      return (
        product.title.includes(e.target.value) ||
        product.description.includes(e.target.value)
      );
    });
    console.log(filteredProducts);
    setProducts(filteredProducts);
  }

  let navSearch = (
    <div className="navSearch">
      <input
        type="text"
        placeholder="Search for anything"
        onChange={searchProducts}
      />
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <title>magnify</title>
        <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
      </svg>
    </div>
  );

  let slogan = (
    <div className="slogan">
      <span>E</span>lectronics, <span>C</span>lothing, and <span>HO</span>
      me-appliances
    </div>
  );

  return (
    <div className="position-relative">
      <div className="navTop">
        <div className="navLogo" onClick={goHome}>
          ECHO
        </div>
        {'category' in params ? ('id' in params ? slogan : navSearch) : slogan}
        <div className="cart">
          <div>
            {authUser.userName ? (
              authUser.userName
            ) : (
              <span onClick={() => navigate('/login')}>Sign In</span>
            )}
          </div>

          <svg
            onClick={cartHandler}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <title>cart-variant</title>
            <path
              className="user-cart"
              d="M19 20C19 21.11 18.11 22 17 22C15.89 22 15 21.1 15 20C15 18.89 15.89 18 17 18C18.11 18 19 18.9 19 20M7 18C5.89 18 5 18.89 5 20C5 21.1 5.89 22 7 22C8.11 22 9 21.11 9 20S8.11 18 7 18M7.2 14.63L7.17 14.75C7.17 14.89 7.28 15 7.42 15H19V17H7C5.89 17 5 16.1 5 15C5 14.65 5.09 14.32 5.24 14.04L6.6 11.59L3 4H1V2H4.27L5.21 4H20C20.55 4 21 4.45 21 5C21 5.17 20.95 5.34 20.88 5.5L17.3 11.97C16.96 12.58 16.3 13 15.55 13H8.1L7.2 14.63M8.5 11H10V9H7.56L8.5 11M11 9V11H14V9H11M14 8V6H11V8H14M17.11 9H15V11H16L17.11 9M18.78 6H15V8H17.67L18.78 6M6.14 6L7.08 8H10V6H6.14Z"
            />
          </svg>
        </div>
      </div>
      <div className="navBottom"></div>
      <Cart props={{ showCart: navItems.showCart }}></Cart>
    </div>
  );
}
