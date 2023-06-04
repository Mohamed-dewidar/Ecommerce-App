import axios from "axios";
import React, { useEffect, useState , useContext } from "react";
import { UserContext, ProductsContext } from '../../context'
import { Table } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { Myaccordion } from '../../components/admin/Myaccordion';
import { GetProducts } from "../../pages/admin/Admin";
import { Button } from "react-bootstrap";
// import { useNavigate } from 'react-router-dom';




export function Products() {

	const user = useContext(UserContext)
    const products = GetProducts(user)
	let navigate = useNavigate()
	

	return (
		<div>

{	products.length === 0 ? 
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
			<h1 className="text-center">
				Products Tables
			</h1>
			<br />
			<Myaccordion></Myaccordion>
      </div> }

			
			
	</div>
	);
}
