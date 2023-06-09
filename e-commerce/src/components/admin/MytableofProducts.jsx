import axios from "axios";
import { Table } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext, ProductsContext } from '../../context'
import React, { useEffect, useState, useContext } from "react";
import { GetProducts } from "../../pages/admin/Admin";


export  function MytableofProducts(prop) {
   
    let AllCategories = ["Electronics", "Clothing", "Home-Appliances", "Leather", "Watches" ]
    const user = useContext(UserContext)
    let products = GetProducts(user)
    // console.log(productsx)
    
    // let getAllproducts = async () => 
    // {
    //   try 
    //   {
    //     let response = await axios.get(`http://localhost:3005/${AllCategories[0]}`);
    //     setProducts (response.data.filter(product => { return product.seller === user}))
    //     // console.log(products);
    //   } 
    //   catch (error) 
    //   {
    //     console.log("a7aaa");
    //   }
    // };
    // useEffect(() => {
    //     getAllproducts();
    //     // console.log(products)
    //   }, []);

    // const productsx = GetProducts(user)
    
    // console.log(productsx)
    let {category_id} = prop
  	let navigate = useNavigate();
    
    let cureenttcategory = AllCategories[category_id-1]

    let deleteelement = (id) => {
        axios
            .delete(`http://localhost:3005/${cureenttcategory}/${id}`)
            .then((response) => {
                console.log("deleted successfully")
                // products = GetProducts(user)

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
                    <th>Product Name</th>
                    <th className="text-center" >Price</th>
                    <th className="text-center" >In stock</th>
                    <th className="text-center" >Actions</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => {
                    if (parseInt(product.category_id) === category_id){
                    return (
                        <tr key={product.id}>
                            {/* <td>{product.id}</td> */}
                            <td>{product.title}</td>
                            <td className="text-center">{ product.discountPercentage == 0 ? (product.price) : (<div className=""> <del>{product.price}</del> <span>{ parseInt(product.price) * (100 - parseInt(product.discountPercentage) ) / 100}</span></div>)}</td>
                            <td className="text-center" >{product.stock}</td>
                            <td className="d-flex m-auto justify-content-around">
                                <NavLink to={`/admin/${user}/${product.category_id}/${product.id}/edit`}>
                                    <i className='fs-2 text-info mx-1 bi bi-pencil-square'></i>
                                </NavLink>

                                {/* <div onClick={() => deleteelement(product.id)}><i  className='fs-2 text-danger mx-1 bi bi-trash3-fill '></i></div> */}
                                
                                <NavLink to={`/admin/${user}/${product.category_id}/${product.id}`}>
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
