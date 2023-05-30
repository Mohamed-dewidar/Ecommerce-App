import axios from "axios";
import { UserContext, ProductsContext } from '../../App'
import React, { useEffect, useState, useContext } from "react";
import { Mycard } from './Mycard';



export function ProductCards() {


    const products = useContext(ProductsContext)
    


  return (
    <div className=" m-4 d-flex justify-content-center align-items-center">
        {products.map((item) => <Mycard key={item.id} product={item}></Mycard>)}
    </div>
  )
}
