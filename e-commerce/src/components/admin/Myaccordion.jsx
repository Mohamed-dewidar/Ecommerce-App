import axios from "axios";
import React, { useContext } from "react";
import { CategoryContext } from '../../context';
import { MytableofProducts } from './MytableofProducts';
import { Accordion } from "react-bootstrap";

export  function Myaccordion() {

  const categories = useContext(CategoryContext)

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
