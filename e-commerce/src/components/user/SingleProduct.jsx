import React from 'react';
import './singleProduct.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
export default function SingleProduct() {
  let [product, setProduct] = useState({});
  let { category, id } = useParams();
  useEffect(
    function () {
      axios.get(`http://localhost:3005/${category}/${id}`).then((response) => {
        setProduct(response.data);
      });
    },
    [category, id]
  );

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
                    : 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='
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
                    : 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='
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
                    : 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='
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
        <div className="btn btn-dark custom-btn">Add to Cart</div>
        <div className="btn btn-danger custom-btn">Add to Whishlist</div>
      </div>
    </div>
  );
}
