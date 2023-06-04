import React, { useContext } from "react";
import Slider from '../../components/admin/Slider'
import { ProductCards } from '../../components/admin/ProductCards';
import { GetProducts, GetCategories } from "../../pages/admin/Admin";
import { UserContext,  } from '../../context'
import { useNavigate } from 'react-router-dom';
import { Button, NavLink } from "react-bootstrap";
import { Mynav } from "../../components/admin/Mynav";
import UserAbout from "../../components/user/UserAbout";
import RenewableEnergy from "../../components/user/RenewableEnergy";
import ContactUs from "../../components/user/ContactUs";
import Footer from "../../components/user/Footer";



export function Adminhome() {

  const {user} = useContext(UserContext)
  console.log(user)
  const products = GetProducts(user)
  console.log(products)
  let navigate = useNavigate();

  return (
    <>
    <Mynav />
    <div className='d-flex flex-column '> 
    {products.length === 0 ? 
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div><h1>Welcome to ECHO</h1></div>
      <br />

      <Button 
            onClick={() => navigate(`/admin/${user}/product/0/edit`)} 
            variant="outline-dark">
              
              <h1>Add Product</h1>
      </Button>
    </div> : 
    <div>
        <div className='d-flex justify-content-center m-4'><h1>Categories</h1></div>
        <div><Slider></Slider></div>
        <div className='d-flex justify-content-center m-4'><h1>Products</h1></div>
        <div className='d-flex justify-content-center'><ProductCards></ProductCards></div>
      </div> }
      
    </div>
    <UserAbout />
      <RenewableEnergy />
      <ContactUs />
      <Footer />

      <NavLink to={`/admin/${user}/product/0/edit`}>
        <div className="addbutton"><i className=" text-dark fs-1 bi bi-plus-circle-fill"></i></div>
        </NavLink> 
      </>
  )
}
