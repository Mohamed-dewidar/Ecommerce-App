import axios from "axios";
import { UserContext, ProductsContext } from '../../context'
import React, { useEffect, useState, useContext } from "react";
import { Mycard } from './Mycard';
import { GetProducts, GetCategories } from "../../pages/admin/Admin";




export function ProductCards() {

    const value = useContext(UserContext)
    let user = value
    const products = GetProducts(user)
    const catrgories = GetCategories(user)

  return (
    
    <div>
      <div>{ catrgories.map((cat) =>  <div key={cat.id}><h1>{cat.title}</h1>
      <div className="container m-4 d-flex flex-wrap justify-content-center align-items-center">
        {products.map((item) => ( parseInt( item.category_id) === cat.id ? <div><Mycard key={item.id} product={item} /></div> : null))}
      </div>
      </div> )}</div>
    
    </div>
  )
}
