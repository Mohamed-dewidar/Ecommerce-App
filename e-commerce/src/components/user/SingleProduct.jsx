import React, { useContext } from "react";
import "./singleProduct.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { AuthContext, CartContext } from "../../context";
import { userApi } from "../../api/userApi";
import { Toast } from "../CustomeComponents/Toast";
export default function SingleProduct() {
  let [product, setProduct] = useState({});
  let { category, id } = useParams();
  const { authUser, setAuthUser } = useContext(AuthContext);
  const {userCart, setUserCart} = useContext(CartContext)
  const navigator = useNavigate();
  const [error, setError] = useState({
    cart: "",
    wishlist: "",
    cartMsg: "",
  });
  useEffect(
    function () {
      axios.get(`http://localhost:3005/${category}/${id}`).then((response) => {
        setProduct(response.data);
      });
    },
    [category, id],
  );

  const addItemHandler = async (e) => {
    if (!authUser.id) {
      navigator("/login");
      return;
    }

    let res = await userApi.addToCart(product, category, authUser.id);
    if(res.success == 'true'){
      setUserCart([...res.data.userCart])
    }
    setError({
      ...error,
      cart: res.success,
      msg: res.msg,
    });

    setTimeout(() => {
      setError({
        ...error,
        cart: "",
        msg: "",
      });
    }, 1000);
  };

  return (
    <div className="productContainer flex-column flex-lg-row align-items-lg-start align-items-center">
      <div className="sliderContainer d-flex justify-content-center">
        <div
          id="carouselExampleIndicators"
          className="carousel slide customize"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner customize">
            <div className="carousel-item active">
              <img
                src={
                  product.images
                    ? product.images[0]
                    : "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                }
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src={
                  product.images
                    ? product.images[1]
                    : "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                }
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src={
                  product.images
                    ? product.images[2]
                    : "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                }
                className="d-block w-100"
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="infoContainer px-5 px-lg-0">
        <div className="title">{product.title}</div>
        <div className="productDescription">{product.description}</div>
        <div className="price">
          <span>USD</span> {product.price}
        </div>
        <div className="seller">{product.seller}</div>
        <div
          className="btn btn-dark custom-btn position-relative"
          onClick={addItemHandler}
        >
          {" "}
          Add to Cart
        </div>
        {error.cart == "false" && (
          <p className="text-center lead text-danger align-self-center">
            {error.msg}
          </p>
        )}
        {error.cart == "true" && (
          <p className="text-center lead text-success align-self-center">
            {error.msg}
          </p>
        )}
        <div className="btn btn-danger custom-btn">Add to Whishlist</div>
      </div>
    </div>
  );
}
