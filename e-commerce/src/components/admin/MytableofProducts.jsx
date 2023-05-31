import axios from "axios";
import { Table } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext, ProductsContext } from '../../context'
import React, { useEffect, useState, useContext } from "react";
import { GetProducts } from "../../pages/admin/Admin";


export  function MytableofProducts(prop) {
   
    const user = useContext(UserContext)
    const productsx = GetProducts(user)
    let {category} = prop
  	let navigate = useNavigate();


    
    let deleteelement = (id) => {

        axios
            .delete(`http://localhost:3005/products/${id}`)
            .then((response) => {
                console.log("deleted successfully")
                productsx = GetProducts(user)
                navigate(`/admin/${user}/products`);
                
            })
            .catch((error) => {
                console.log("error");
            })
            
        };

  return (
    <div>
        <Table className='text-light' bordered>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Quanitity</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {productsx.map((product) => {
                    if (product.category === category){
                    return (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.title}</td>
                            <td>{product.price}</td>
                            <td>{product.stock}</td>
                            <td className="d-flex m-auto justify-content-around">
                                <NavLink to={`/admin/${user}/products/${product.id}/edit`}>
                                    <i className='fs-2 text-info mx-1 bi bi-pencil-square'></i>
                                </NavLink>

                                <div onClick={() => deleteelement(product.id)}><i  className='fs-2 text-danger mx-1 bi bi-trash3-fill'></i></div>
                                
                                    <NavLink to={`/admin/${user}/products/${product.id}`}>
                                    <i className='fs-2 text-warning mx-1 bi bi-eye-fill'></i>
                                </NavLink>
                            </td>
                        </tr>
                    );}
                })}
            </tbody>
        </Table>
    </div>
  )
}
