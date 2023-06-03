import React, { useContext, useState , useEffect} from 'react'
import { Button, Form, InputGroup } from "react-bootstrap";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { UserContext } from '../../context'
import { useNavigate, useParams } from 'react-router-dom';
import "./css/Addproduct.css";

export function Addproduct() {
  //  get the id of the product you want to edit 
  let {id} = useParams();
  let {category_id} = useParams();
  let AllCategories = ["Electronics", "Clothing", "Home-Appliances", "Leather", "Watches" ]
  let category_name = AllCategories[category_id-1]
  // console.log(category_name)
  
  // get the logged in user
  const user = useContext(UserContext)
  let navigate = useNavigate()

  // get all the categories to list them later in the category selection
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

  // get product details if exists (id != 0)
  // let [category_name,setCategory_name] = useState(AllCategories[category_id-1])

  // let setcategory = () => {
  //   setCategory_name = 
  // }

  let [product,setProduct] = useState({})
  let [formvalues,setFormvalues] = useState({
    title: '',
    description: '',
    price: '',
    discountPercentage: 0,
    rating:'',
    stock: '',
    brand: '',
    category_id: '',
    seller: user,
    thumbnail: '',
    images:[],
  })

  
  let getProduct = async () => {
		let response = await axios.get(`http://localhost:3005/${category_name}/${id}`);
		setProduct(response.data);
    setFormvalues(response.data);
	};
	useEffect(() => {
		if (id != 0) 
    {
			getProduct();
		}
	}, []);

  // function on submit
  let formOperation = (e) => {
		e.preventDefault();

    // const { title, price, description, discountPercentage, stock, brand , category_id, image} = e.target.elements
    // const newProduct = CreateNewProduct(title.value, description.value, price.value, discountPercentage.value, stock.value, brand.value, parseInt(category_id.value), user, image.value  );

    if (id == 0) {
      category_name = AllCategories[formvalues.category_id-1]
    axios
				.post(`http://localhost:3005/${category_name}`, formvalues)
				.then((response) => {
          console.log("done!")
					navigate(`/admin/${user}/products`);
				});
      }
    else {
        axios.put(`http://localhost:3005/${category_name}/${id}`, formvalues).then(() => {
				navigate(`/admin/${user}/products`);
        
			});
      }
	};



  // handling errors for discount and title section
  const [errors, setErrors] = useState({
    discount: false,
    title: false,
    price: false,
    // discount: false,
    stock: false,
  });

  const handleChange = (event) => {
    setFormvalues({
      ...formvalues,
      [event.target.name]:event.target.value
    })

    if (event.target.name === 'discountPercentage'){
      const value = event.target.value;
      if (value >= 90 || value < 0 ) {
        setErrors({
          ...errors,
          discount: true,
        });
      }
      else{
        setErrors({
          ...errors,
          discount: false,
        });
      }
    }
    else if (event.target.name === 'title'){
      const value = event.target.value;
      if (/^[^0-9].*/.test(value)) {
        setErrors({
          ...errors,
          title: false,
        });
      }
      else {
        setErrors({
          ...errors,
          title: true,
      })
    }
    } 
    else if (event.target.name === 'price'){
      const value = event.target.value;
      if (value < 0) {
        setErrors({
          ...errors,
          price: true,
        });
      }
      else {
        setErrors({
          ...errors,
          price: false,
      })
    }
  }
  else if (event.target.name === 'stock'){
    const value = event.target.value;
    if (value < 0) {
      setErrors({
        ...errors,
        stock: true,
      });
    }
    else {
      setErrors({
        ...errors,
        stock: false,
    })
  }
}
}

const [privewStyle, setprivewStyle] = useState({
  name:"previewContainer"
})
let previewProduct = () => {
  // console.log("what")
  setprivewStyle({
    name:"previewContainer2"
  })
}

let hideProduct = () => {
  setprivewStyle({
    name:"previewContainer"
  })
}

let addimage = () => {
  console.log("addimage")
}


  return (
    <div className='container'>
      <h1 className='text-center'>Adding new product</h1>
      <hr />
      <div className='container m-3'>
      <Form className='' onSubmit={formOperation} >

      <Form.Group className="mb-3" >
        <Form.Label>Product Title</Form.Label>
        <Form.Control type="text" name="title" placeholder="Enter title" required defaultValue={product.title} onChange={handleChange} />
        { errors.title && <div className="text-danger">Title should start with a letter!!</div> }
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" name="description" rows={2} placeholder="Description" defaultValue={product.description} onChange={handleChange}/>
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Price</Form.Label>
        <div className='d-flex align-items-center'>
        <div className='w-100'><Form.Control type="number" name="price" placeholder="Price" required defaultValue={product.price} onChange={handleChange} step="0.01" pattern="\d+(\.\d{1,2})?"/></div>
        <div className='ms-auto'><i className="fs-2 bi bi-currency-dollar"></i></div>
        </div>
        { errors.price && <div className="text-danger">Price can't be less than zero!</div> }
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Discount Percentage</Form.Label>
        <Form.Control type="number" name="discountPercentage" placeholder="Discount Percentage" defaultValue={product.discountPercentage} onChange={handleChange} max="90" />
         {errors.discount && <div className="text-danger">Discount percentage cannot be greater than 90 or less than zero</div>}
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Stock</Form.Label>
        <Form.Control type="number" name="stock" placeholder="In Stock" required defaultValue={product.stock} onChange={handleChange}/>
        { errors.stock && <div className="text-danger">Stock can't be less than zero!</div> }
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Brand name</Form.Label>
        <Form.Control type="text" name="brand" placeholder="Brand" defaultValue={product.brand}/>
      </Form.Group>

      <Form.Group>
        <Form.Label>Category</Form.Label>
        <Form.Select
          name = "category_id" required onChange={handleChange}>
             { id==0 ? <option value="" disabled selected>Select Category</option> : null }
              {allcategories.map( (category) => {
              return <option value={category.id}>{category.title}</option>
          })}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Images</Form.Label>
        <div className='d-flex align-items-center'>
        <div className='w-100'><Form.Control type="text" name="thumbnail" placeholder="image url addresss" defaultValue={product.thumbnail} onChange={handleChange}/></div>
        <i className="fs-2 bi bi-plus-square-fill" onClick={addimage}></i>
        </div>
      </Form.Group>

    

      <div className='d-flex justify-content-around'>
        <div><Button   variant="primary" type="submit">
          { id==0 ?  "Add Product" : "Edit Product" }
        </Button></div>

        <div><Button   variant="primary" onClick={previewProduct}  >
          Preview
        </Button></div>
      </div>

    </Form>
    </div >
          <div className={`${privewStyle.name}`}>
            {/* <div className='closesign'> <i class="bi bi-x-lg"></i></div> */}
            <div className='closesign' onClick={hideProduct} ><i class="bi bi-x-square-fill"></i></div>
            <div className='d-flex parentcontainer '>
              <div className=' imagecontainer '><img src={formvalues.thumbnail} alt="product image" /></div>
              <div className=' infocontainer'>
                <div className='w-100 text-center'><h1>{formvalues.title}</h1></div>
                <hr />
                <div><h2> USD <span >{formvalues.price * (100-formvalues.discountPercentage) /100}</span></h2></div>
                { formvalues.discountPercentage > 0 ? (<div><del>USD{formvalues.price}</del> ({formvalues.discountPercentage} % Off)</div>) : null}
                <div><strong>Description :</strong> {formvalues.description}</div>
                
                {/* <div>discount percentage : {formvalues.discountPercentage} %</div> */}
                <div><strong> In Stock : </strong>{formvalues.stock}</div>
                <div><strong>Brand : {formvalues.brand}</strong> </div>
              </div>
            </div>
            <div className='d-flex justify-content-around align-items-center buttonscontianer'>
            <Button   variant="primary" type="" onClick={formOperation} >
              Add Product
            </Button>
            <Button   variant="primary" type=""  onClick={hideProduct} >
              Edit Product
            </Button>
              
              </div>       
          </div>
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


function  CreateNewProduct(title, description, price, discountPercentage, stock, brand, category_id, seller, thumbnail, images) {
  const newProduct = {
    id: uuidv4(),
    title,
    description,
    price,
    discountPercentage,
    stock,
    brand,
    category_id,
    seller,
    thumbnail,
    images,
  };
  return newProduct;
}

