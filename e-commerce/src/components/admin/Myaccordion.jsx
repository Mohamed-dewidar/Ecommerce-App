import axios from "axios";
import React, { useContext } from "react";
import { UserContext,  } from '../../context'
import { MytableofProducts } from './MytableofProducts';
import { Accordion } from "react-bootstrap";
import { GetCategories } from "../../pages/admin/Admin";

export  function Myaccordion() {

  const user = useContext(UserContext)
  const categories = GetCategories(user)

  return (
    <div>
  <Accordion defaultActiveKey="0" >
    {categories.map( (category) => {
           return <Accordion.Item  eventKey={category.id}>
           <Accordion.Header className=" ">{category.title}</Accordion.Header>
           <Accordion.Body className="bg-dark">
               <MytableofProducts category_id={category.id}></MytableofProducts>
           </Accordion.Body>
         </Accordion.Item>
         })}
    </Accordion>
        
    </div>
  )
}
