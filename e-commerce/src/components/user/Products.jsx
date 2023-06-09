import React from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import './products.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ProductsContext } from '../../context';

export default function Products() {
  let { category } = useParams();
  let [firstProduct, setFirstProduct] = useState({});
  let { products, setProducts } = useContext(ProductsContext);

  useEffect(function () {
    axios.get(`http://localhost:3005/${category}/`).then((response) => {
      setFirstProduct(response.data[0]);
      let subArr = [];
      for (let i = 1; i < response.data.length; i++) {
        subArr.push(response.data[i]);
      }
      setProducts(subArr);
    });
  }, []);
  let navigate = useNavigate();
  function goTo(id) {
    navigate(`/products/${category}/${id}`);
  }
  let productsCards = products.map((product) => {
    return (
      <div className="card" style={{ width: '18rem' }} key={product.id}>
        <img
          src={product.thumbnail}
          className="card-img-top height"
          alt="..."
        />
        <div className="card-body">
          <div
            className="cardTitle"
            onClick={() => {
              goTo(product.id);
            }}
          >
            {product.title}
          </div>
          <p className="card-text">{product.description}</p>
          <span className="price">
            <span>USD</span> {product.price}
          </span>
          <button
            className="btn btn-outline-dark shopBtn"
            onClick={() => {
              goTo(product.id);
            }}
          >
            Shop This Item
          </button>
        </div>
      </div>
    );
  });
  return (
    <div>
      <div className="firstProduct">
        <div className="productImage">
          <img src={firstProduct.thumbnail} alt="product" />
        </div>
        <div className="productInfo">
          <div className="title">
            <div>{firstProduct.title}</div>
          </div>
          <div
            className="descriptionLink"
            onClick={() => {
              goTo(firstProduct.id);
            }}
          >
            {firstProduct.description}
          </div>
          <div className="price">
            <span>USD</span> {firstProduct.price}
          </div>
          <div
            className="btn btn-outline-dark shopBtn"
            onClick={() => {
              goTo(firstProduct.id);
            }}
          >
            Shop This Item
          </div>
        </div>
      </div>
      <div className="productsContainer">{productsCards}</div>
    </div>
  );
}
