import axios from "axios";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";

export default function Slider() {
    let [categories, setCategories] = useState([]);

    useEffect(() => {
      getAllcategories();
    }, []);

    let getAllcategories = async () => {
      try {
        let response = await axios.get("http://localhost:3005/categories");
        setCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    };


  return (
       <Carousel>
        {categories.map((category) => {
           return <Carousel.Item onClick={() => console.log(category.title)} interval={3000}>
            <img
              className="d-block w-100"
              src= {category.image_url}
              alt=""
            />
            <Carousel.Caption>
              <h3>{category.title}</h3>
              <p>{category.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
         })}
      </Carousel>

  )
}
