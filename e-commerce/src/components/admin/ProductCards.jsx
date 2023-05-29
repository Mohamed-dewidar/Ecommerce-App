import axios from "axios";
import React, { useEffect, useState } from "react";
import { Mycard } from './Mycard';



export function ProductCards() {
    
    let [products, setProducts] = useState([]);


    let getAllproducts = async () => {
      try {
        let response = await axios.get("http://localhost:3005/products");
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
        getAllproducts();
      }, []);
  return (
    <div className=" m-4 d-flex justify-content-center align-items-center">
        {products.map((item) => <Mycard key={item.id} product={item}></Mycard>)}
    </div>
  )
}
