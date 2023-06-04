import './style.css';
import axios from "axios";
import { UserContext,  } from '../../context'
import React, { useContext } from "react";
import { Carousel } from "react-bootstrap";
import { GetCategories, } from "../../pages/admin/Admin";


export default function Slider() {

  const user = useContext(UserContext)
  const categories = GetCategories(user)
  console.log(categories)
    
  return (
    <div className=''>
       <Carousel>
        {categories.map((category) => {
           return <Carousel.Item className='carousel-itemx' key={category.id}  interval={2000}>
            <img
              src= {category.image_url}
              alt=""
            />
            <Carousel.Caption className="text-dark">
              <h3>{category.title}</h3>
              <p>{category.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
         })}
      </Carousel>
    </div>
  )
}
