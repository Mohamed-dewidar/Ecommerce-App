import React, { useEffect } from 'react';
import './categoriesCards.css';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function CategoriesCards() {
  let navigate = useNavigate();
  function navigateTo(category) {
    navigate(`products/${category}`);
  }
  const [categories, setCategories] = useState([]);
  useEffect(function () {
    axios.get('http://localhost:3005/categories').then((response) => {
      setCategories(response.data);
    });
  }, []);
  let cards = categories.map((category) => {
    return (
      <div className="card" style={{ width: '18rem' }} key={category.id}>
        <img src={category.image_url} className="card-img-top" alt="..." />
        <div className="card-body">
          <h4
            className="clickable"
            onClick={() => {
              navigateTo(category.title);
            }}
          >
            {category.title}
          </h4>
          <p className="card-text">{category.description}</p>
        </div>
      </div>
    );
  });
  return (
    <div className="container-fluid">
      <h3>Shop our Popular Categories</h3>
      <div className="cardsContainer container">{cards}</div>
    </div>
  );
}
