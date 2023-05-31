import React, { useContext, useState , useEffect} from 'react'
import { Button, Form, InputGroup } from "react-bootstrap";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { UserContext } from '../../context'
import { useNavigate, useParams } from 'react-router-dom';

export function Addproduct() {

  let {id} = useParams();
  const user = useContext(UserContext)
  let navigate = useNavigate()
  let [allcategories, setCategories] = useState([]);
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
  const [selected, setSelected] = useState("");

  const handleSelect = (event) => {
    setSelected(event.target.value);
  };

  // get product details if exists (id != 0)
  let [product,setProduct] = useState({})

  let getProduct = async () => {
		let response = await axios.get(`http://localhost:3005/products/${id}`);
		setProduct(response.data);
	};
	useEffect(() => {
		if (id != 0) {
			getProduct();
		}
	}, []);

  let formOperation = (e) => {
		e.preventDefault();

    const { title, price, description, discount, stock, brand , category, image} = e.target.elements
    const newProduct = CreateNewProduct(title.value, description.value, price.value, discount.value, stock.value, brand.value, category.value, user, image.value  );

    if (id == 0) {
    axios
				.post("http://localhost:3005/products", newProduct)
				.then((response) => {
          console.log("done!")
					navigate(`/admin/${user}/products`);
				});
      }
      else {
        axios.put(`http://localhost:3005/products/${id}`, newProduct).then(() => {
				navigate(`/admin/${user}/products`);
			});
      }
	};

  return (
    <div className='container'>
      <h1 className='text-center'>Adding new product</h1>
      <hr />
      <Form className='' onSubmit={formOperation} >

      <Form.Group className="mb-3" >
        <Form.Label>Product Title</Form.Label>
        <Form.Control type="text" name="title" placeholder="Enter title" required defaultValue={product.title} />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" name="description" rows={2} placeholder="Description" defaultValue={product.description}/>
      </Form.Group>

      <Form.Group className="mb-3" >description
        <Form.Label>Price</Form.Label>
        <Form.Control type="number" name="price" placeholder="Price" required/>
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Discount Percentage</Form.Label>
        <Form.Control type="number" name="discount" placeholder="Discount Percentage" defaultValue={product.price}/>
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Stock</Form.Label>
        <Form.Control type="number" name="stock" placeholder="In Stock" required defaultValue={product.stock}/>
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Brand name</Form.Label>
        <Form.Control type="text" name="brand" placeholder="Brand" defaultValue={product.brand}/>
      </Form.Group>

      <Form.Group>
        <Form.Label>Category</Form.Label>
        <Form.Select
          className='mb-3'
          name = "category"
          onChange={handleSelect}
          required={selected !== "" && selected !== "Choose from available categories"}
          defaultValue={product.category}>
          <option >Choose from available categories</option>
        {allcategories.map( (category) => {
            return <option value={category.title}>{category.title}</option>
          })}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Image</Form.Label>
        <Form.Control type="text" name="image" placeholder="image url addresss" defaultValue={product.image}/>
      </Form.Group>

      <Button variant="primary" type="submit">
        { id==0 ?  "Add Product" : "Edit Product" }
      </Button>

    </Form>
    </div>
  )
}

// function getCurrentProductids()
// {
//   let [products, setProducts] = useState([]);
  
//     let getAllproducts = async () => 
//     {
//       try {
//         let response = await axios.get("http://localhost:3005/products");
//         setProducts(response.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
  
//     useEffect(() => {
//         getAllproducts();
//       }, []);
  
//     let currentproductids = []
//     for (let i = 0; i < products.length; i++) 
//       {
//         if ( products[i].id == username)
//         {
//           userproductArr = [...userproductArr, products[i]]
//         }
//       }
  
//       return userproductArr
// }


function  CreateNewProduct(title, description, price, discount, stock, brand, category, seller, image) {
  const newProduct = {
    id: uuidv4(),
    title,
    description,
    price,
    discount,
    stock,
    brand,
    category,
    seller,
    image,
    rating: "",
  };
  return newProduct;
}

