import axios from "axios";
import { UserContext, ProductsContext } from '../../context'
import React, { useEffect, useState, useContext } from "react";
import { Mycard } from './Mycard';
import { GetProducts } from "../../pages/admin/Admin";




export function ProductCards() {

    const user = useContext(UserContext)
    const products = GetProducts(user)
  

  return (
    
    <div className="container m-4 d-flex flex-wrap justify-content-center align-items-center">

        {products.map((item) => <Mycard key={item.id} product={item}></Mycard>)}
    </div>
  )
}
