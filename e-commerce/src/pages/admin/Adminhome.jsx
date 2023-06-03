import React from 'react'
import Slider from '../../components/admin/Slider'
import { ProductCards } from '../../components/admin/ProductCards';


export function Adminhome() {
 
  return (
    <div className='d-flex flex-column '>
      
     <div className='d-flex justify-content-center m-4'><h1>Categories</h1></div>
      <Slider></Slider>
     <div className='d-flex justify-content-center m-4'><h1>Products</h1></div>
      <div className='d-flex justify-content-center'><ProductCards></ProductCards></div>
    </div>
  )
}
