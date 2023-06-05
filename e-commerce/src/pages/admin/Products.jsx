import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { UserContext, ProductsContext } from "../../context";
import { Table } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { Myaccordion } from "../../components/admin/Myaccordion";
import { GetProducts } from "../../pages/admin/Admin";
import { Button } from "react-bootstrap";
import { Mynav } from "../../components/admin/Mynav";
import UserAbout from "../../components/user/UserAbout";
import RenewableEnergy from "../../components/user/RenewableEnergy";
import ContactUs from "../../components/user/ContactUs";
import Footer from "../../components/user/Footer";

// import { useNavigate } from 'react-router-dom';

export function Products() {
  const value = useContext(UserContext);
  let user = value
  const products = GetProducts(user);
  let navigate = useNavigate();
  console.log(user)
  if(!user){
    navigate('/login')
    return
  }

  return (
    <>
	<Mynav />
      <div>
        {products.length === 0 ? (
          <div className="d-flex flex-column justify-content-center align-items-center">
            <div>
              <h1>Welcome to ECHO</h1>
            </div>
            <br />

            <Button
              onClick={() => navigate(`/admin/${user}/product/0/edit`)}
              variant="outline-dark"
            >
              <h1>Add Product</h1>
            </Button>
          </div>
        ) : (
          <div>
            <h1 className="text-center">Products Tables</h1>
            <br />
            <Myaccordion></Myaccordion>
          </div>
        )}
      </div>
	  <UserAbout />
      <RenewableEnergy />
      <ContactUs />
      <Footer />

      <NavLink to={`/admin/${user}/product/0/edit`}>
        <div className="addbutton"><i className=" text-dark fs-1 bi bi-plus-circle-fill"></i></div>
        </NavLink> 
    </>
  );
}
