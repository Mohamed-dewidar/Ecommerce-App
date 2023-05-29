import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { Myaccordion } from '../../components/admin/Myaccordion';




export function Products() {

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


	let [products, setProducts] = useState([]);
  	let navigate = useNavigate();
	let getAllProduct = async () => {
		try {
			let response = await axios.get("http://localhost:3005/products");
			setProducts(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getAllProduct();
	}, []);

  let deleteelement = (id) => {

    axios
		.delete(`http://localhost:3005/products/${id}`)
		.then((response) => {
			console.log("deleted successfully")
			navigate("/products");
			getAllProduct()
		})
		.catch((error) => {
			console.log("error");
		})
		
	};


	return (
		<Myaccordion></Myaccordion>
		
	);
}
