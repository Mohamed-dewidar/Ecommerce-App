import './style.css';
import axios from "axios";
import { UserContext,  } from '../../context'
import React, { useContext } from "react";
import { Carousel } from "react-bootstrap";
import { GetCategories, } from "../../pages/admin/Admin";


export default function Slider() {

  const user = useContext(UserContext)
  const categories = GetCategories(user)
    
  return (
    <div className=' h-75'>
       <Carousel>
        {categories.map((category) => {
           return <Carousel.Item className='carousel-item' key={category.id} onClick={() => console.log(category.title)} interval={3000}>
            <img
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
    </div>
  )
}
