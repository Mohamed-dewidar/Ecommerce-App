import React, { useContext, useState , useEffect } from 'react'
import { Button, Form, InputGroup } from "react-bootstrap";
import { CategoryContext } from '../../context';
import axios from 'axios';


export function Addproduct() {
  
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

  return (
    <div className='container'>
      <h1 className='text-center'>Adding new product</h1>
      <hr />
      <Form className='' >

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Product Title</Form.Label>
        <Form.Control type="text" name="title" placeholder="Enter title" required />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" name="description" rows={2} placeholder="Description"/>
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Price</Form.Label>
        <Form.Control type="number" name="price" placeholder="Price" required/>
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Discount Percentage</Form.Label>
        <Form.Control type="number" name="discount" placeholder="Discount Percentage"/>
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Stock</Form.Label>
        <Form.Control type="number" placeholder="In Stock"/>
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Brand name</Form.Label>
        <Form.Control type="number" placeholder="Brand"/>
      </Form.Group>

      <Form.Group>
        <Form.Label>Category</Form.Label>
        <Form.Select
          onChange={handleSelect}
          required={selected !== "" && selected !== "Choose from available categories"}
        >
          <option >Choose from available categories</option>
        {allcategories.map( (category) => {
            return <option value={category.title}>{category.title}</option>
          })}
        </Form.Select>
      </Form.Group>

      <Button variant="primary" type="submit">
        Add Product
      </Button>

    </Form>


    </div>
  )
}
