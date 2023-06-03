
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Route, Routes } from 'react-router-dom';
import { NotFound } from "./Notfound";
import { Adminhome } from "./Adminhome";
import { Mynav } from "../../components/admin/Mynav";
import { Products } from './Products';
import { Profile } from './Profile';
import { Productdetails } from './Productdetails';
import { Addproduct } from './Addproduct';
import Footer from '../../components/admin/Footer';
import { UserContext, ProductsContext, CategoryContext } from "../../context"
import "./css/admin.css";
import { NavLink } from "react-router-dom";



export function Admin(prop) {

  let {username} = prop
  let userproductArr = GetProducts(username)
  let usercategoryArr = GetCategories(username)

  
  return (
    <div>
      <UserContext.Provider value = {username}>
      <ProductsContext.Provider value = {userproductArr}>
      <CategoryContext.Provider value = {usercategoryArr}>
      <Mynav />
        <Routes>
          <Route path='admin/:user/home' element={<Adminhome/>} />
          <Route path='admin/:user/products' element={<Products/>} />
          <Route path='admin/:user/:category_id/:id' element={<Productdetails />} />
          <Route path='admin/:user/:category_id/:id/edit' element={<Addproduct />} />
          <Route path='admin/:user/profile' element={<Profile/>} />
          <Route path='*' element={<NotFound/>} />
          {/* <Route path='admin/products/:id' element={<ProductDetails />} /> */}
        </Routes>
        <NavLink to={`/admin/${prop}/product/0/edit`}>
        <div className="addbutton"><i className=" text-success fs-1 bi bi-plus-circle-fill"></i></div>
        </NavLink>  

        
      <Footer />
      </CategoryContext.Provider>
      </ProductsContext.Provider>
      </UserContext.Provider>
    </div>
  )
}


export function GetProducts (username){
    
    let AllCategories = ["Electronics", "Clothing", "Home-Appliances", "Leather", "Watches" ]
    let [products, setProducts] = useState([]);
    let getAllproducts = async () => 
    {
      try {
        const promises = AllCategories.map((category) => {
          return axios.get(`http://localhost:3005/${category}`);
        });
    
        const responses = await Promise.all(promises);
    
        const products = responses.flatMap((response) => response.data);
        
        setProducts(products);
        console.log(products)
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      getAllproducts();
        console.log(products)
      }, []);
  
    let userProductArr = products.filter(product => { return product.seller === username})
      return userProductArr
  }
  
export function GetCategories (username){
  
    let products = GetProducts(username)
    let categoriesArr = [];
      for (let i = 0; i < products.length; i++) 
      {
        if ( products[i].seller == username)
        {
          categoriesArr = [...categoriesArr, products[i].category_id]
        }
      }
  
      // console.log(categoriesArr)
  
      let [categories, setCategories] = useState([]);
  
      let getAllcategories = async () => {
        try {
          let response = await axios.get("http://localhost:3005/categories");
          setCategories(response.data);
        } catch (error) {
          // console.log(error);
        }
      };
  
      useEffect(() => {
        getAllcategories();
      }, []);
  
      // console.log(categories)
  
      let usercategoryArr = []
      for (let i = 0; i < categories.length; i++) 
        {
          if (categoriesArr.includes(categories[i].id))
          {
            usercategoryArr = [...usercategoryArr, categories[i]]
          }
          else 
          {
              // console.log("error");
          }
        }
        // console.log(usercategoryArr)
        return usercategoryArr
  }
  
