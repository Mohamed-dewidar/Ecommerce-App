import './App.css';
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Route, Routes } from 'react-router-dom';
import { NotFound } from './pages/admin/Notfound';
import { Adminhome } from './pages/admin/Adminhome';
import { Mynav } from './components/admin/Mynav';
import { Products } from './pages/admin/Products';
import Footer from './components/admin/Footer';

export const UserContext = React.createContext()
export const ProductsContext = React.createContext()
export const CategoryContext = React.createContext()

function App() 
{

  let username = "karimmaged"
  let userproductArr = GetProducts(username)
  let usercategoryArr = GetCategories(username)


  return (
    <div className="App">
      <UserContext.Provider value = {username}>
      <ProductsContext.Provider value = {userproductArr}>
      <CategoryContext.Provider value = {usercategoryArr}>
      <Mynav />
        <Routes>
          <Route path='admin/:user/home' element={<Adminhome/>} />
          <Route path='admin/:user/products' element={<Products/>} />
          <Route path='*' element={<NotFound/>} />
          {/* <Route path='admin/products/:id' element={<ProductDetails />} /> */}
        </Routes>
      <Footer />
      </CategoryContext.Provider>
      </ProductsContext.Provider>
      </UserContext.Provider>
    </div>
  );
}


function GetProducts (username){
  let [products, setProducts] = useState([]);

  let getAllproducts = async () => 
  {
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

  let userproductArr = []
  for (let i = 0; i < products.length; i++) 
    {
      if ( products[i].seller == username)
      {
        userproductArr = [...userproductArr, products[i]]
      }
    }

    return userproductArr
}


function GetCategories (username){

  let products = GetProducts(username)
  let categoriesArr = [];
    for (let i = 0; i < products.length; i++) 
    {
      if ( products[i].seller == username)
      {
        categoriesArr = [...categoriesArr, products[i].category]
      }
    }

    console.log(categoriesArr)

    let [categories, setCategories] = useState([]);

    let getAllcategories = async () => {
      try {
        let response = await axios.get("http://localhost:3005/categories");
        setCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      getAllcategories();
    }, []);

    console.log(categories)

    let usercategoryArr = []
    for (let i = 0; i < categories.length; i++) 
      {
        if (categoriesArr.includes(categories[i].title))
        {
          usercategoryArr = [...usercategoryArr, categories[i]]
        }
        else 
        {
            console.log("error");
        }
      }
      console.log(usercategoryArr)
      return usercategoryArr
}


export default App;
