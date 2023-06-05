import React, { useContext, useEffect, useState } from "react";

import "./cart.css";
import { userApi } from "../../api/userApi";
import { AuthContext, CartContext } from "../../context";
import { useNavigate } from "react-router-dom";

export function Cart({ props }) {
  const { authUser } = useContext(AuthContext);
  const { showCart } = props;
  const navigator = useNavigate();
  const { userCart, setUserCart } = useContext(CartContext);

  const getCart = async () => {
    

    let res = await userApi.getUserCart(authUser.id);
    setUserCart([...res.data.cart]);
  };

  useEffect(() => {
    getCart();
  }, []);

  const removeItemHandler = async (e) => {
    let index = e.target.dataset.index;
    userCart.splice(index, 1);
    let res = await userApi.editCart(userCart, authUser.id);
    setUserCart([...userCart]);
  };

  const itemCountIncHandler = async (e) =>{
    let item = userCart[e.target.dataset.index]
    if(item.count +1 > item.stock){
        return
    }
    
    item.count++;
    setUserCart([...userCart])
    let res = await userApi.editCart(userCart, authUser.id)
}


const itemCountDecHandler = async (e) =>{
    let item = userCart[e.target.dataset.index]
    if(item.count -1 < 1){
        return
    }
   item.count--;
    setUserCart([...userCart])
    let res = await userApi.editCart(userCart, authUser.id)
  }
  

  return (
    <div
      className={`cart-container ${
        showCart ? "show" : ""
      } d-flex flex-column gap-5 align-item-center`}
    >

      {userCart.map((item, index) => (
          <section
          className="cart-card d-flex flex-column gap-3 justify-content-around align-items-center"
          key={index}
          >
          <img
            src={
                item.thumbnail
                ? item.thumbnail
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR24zI04AuSxUW327Z-CsJ5DYPtYTrPJdcqrA&usqp=CAU"
            }
            ></img>
          <div className="d-flex flex-column justify-content-around align-items-start align-self-stretch">
            <p>{item.title}</p>
            <p>
              <span className="text-success">Brand</span> {item.brand}
            </p>
            <p>
              <span className="text-success">Category</span> {item.category}
            </p>
            <p>
              <span className="text-success">Price</span> {item.price}
            </p>
          </div>

          <div className="align-self-stretch gap-2 d-flex justify-content-around align-items-center">
            <button className="btn btn-outline-danger fw-bold w-100" data-index={index} onClick={itemCountDecHandler}>-</button>
            <h3 className="text-warning px-3">{item.count}</h3>
            <button className="btn btn-outline-success fw-bold w-100" data-index={index} onClick={itemCountIncHandler}>+</button>
          </div>
          <button
            className="btn btn-danger align-self-stretch"
            data-index={index}
            onClick={removeItemHandler}
            >
            Remove
           
          </button>
        </section>
      ))}
    </div>
  );
}
