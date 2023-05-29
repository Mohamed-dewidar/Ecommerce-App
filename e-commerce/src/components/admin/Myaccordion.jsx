import axios from "axios";
import React, { useEffect, useState } from "react";
import { MytableofProducts } from './MytableofProducts';
import { Accordion } from "react-bootstrap";

export  function Myaccordion() {

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
    <div>
<Accordion defaultActiveKey="0">
    {categories.map( (category) => {
           return <Accordion.Item eventKey={category.id}>
           <Accordion.Header><div className='d-flex'><div>{category.title}</div> <div className="ms-auto">14</div></div></Accordion.Header>
           <Accordion.Body className="bg-dark">
               <MytableofProducts category={category.title}></MytableofProducts>
           </Accordion.Body>
         </Accordion.Item>
         })}
    </Accordion>
        
    </div>
  )
}
