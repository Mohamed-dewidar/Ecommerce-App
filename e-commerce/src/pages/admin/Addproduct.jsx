import React, { useContext, useState , useEffect} from 'react'
import { Button, Form } from "react-bootstrap";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { UserContext } from '../../context'
import { useNavigate, useParams } from 'react-router-dom';
import "./css/Addproduct.css";
import { Carousel } from "react-bootstrap";


export function Addproduct() {
  //  get the id of the product you want to edit 
  let {id} = useParams();
  let {category_id} = useParams();
  let AllCategories = ["Electronics", "Clothing", "Home-Appliances", "Leather", "Watches" ]
  let category_name = AllCategories[category_id-1]
  
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


  // let [product,setProduct] = useState({})
  let [formvalues,setFormvalues] = useState({
    title: '',
    description: '',
    price: '',
    discountPercentage: '',
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
		// setProduct(response.data);
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

  // change form values on change
  const handleChange = (event) => {
    setFormvalues({
      ...formvalues,
      [event.target.name]:event.target.value
    })
  
    // makeing sure discount is with in range
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

    // making sure the title doesn't start with anumber 
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

    // making sure the price isn't negative
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

  // making sure the there is stock
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

//   show && hide preview
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



// adding image with maximum 3 images 
let addimage = () => {
  if (formvalues.images.length < 3) {
    setFormvalues( {...formvalues,images: [...formvalues.images,""]})
  }
}
// console.log(formvalues.images)

// remove image 
let removeimage = (e) => {
  setFormvalues ({...formvalues, images: formvalues.images.filter((element, index, array) => {return index !== (array.length - 1)})})
  // console.log(formvalues.images)
}
console.log(formvalues.images)

// change the url of an image
let updateImagesArr = (e) => {
  let imageArrCarrier = formvalues.images
  console.log(imageArrCarrier)
  imageArrCarrier[e.target.name] = e.target.value
  console.log(imageArrCarrier)
  setFormvalues( {...formvalues, images: imageArrCarrier})
  console.log(formvalues.images)
}

// let imageInputhtml = imageInput.map((image, index) => {
//   return (
//       <div key={index} className=" d-flex felx-nowrap align-items-center">
//       <span className='m-1'> image{index+1}: </span> 
//       <div className="w-100">
//         <Form.Control
//           className="m-1"
//           name = {`images`}
//           type="text"
//           placeholder="Enter image URL address"
//           onBlur={getimages}
//         />
//       </div>
//       <i class="text-danger fs-2 bi bi-x-square-fill" onClick={removeimage}></i>
//     </div>)
// })

  return (
    <div className='container'>
      <h1 className='text-center'>Adding new product</h1>
      <hr />
      <div className='container m-3'>
      <Form className='' onSubmit={formOperation} >

      <Form.Group className="mb-3" >
        <Form.Label>Product Title</Form.Label>
        <Form.Control type="text" name="title" placeholder="Enter title" required defaultValue={formvalues.title} onChange={handleChange} />
        { errors.title && <div className="text-danger">Title should start with a letter!!</div> }
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" name="description" rows={2} placeholder="Description" defaultValue={formvalues.description} onChange={handleChange}/>
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Price</Form.Label>
        <div className='d-flex align-items-center'>
        <div className='w-100'><Form.Control type="number" name="price" placeholder="Price" required defaultValue={formvalues.price} onChange={handleChange} step="0.01" pattern="\d+(\.\d{1,2})?"/></div>
        <div className='ms-auto'><i className="fs-2 bi bi-currency-dollar"></i></div>
        </div>
        { errors.price && <div className="text-danger">Price can't be less than zero!</div> }
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Discount Percentage</Form.Label>
        <Form.Control type="number" name="discountPercentage" placeholder="Discount Percentage" defaultValue={formvalues.discountPercentage} onChange={handleChange} max="90" />
         {errors.discount && <div className="text-danger">Discount percentage cannot be greater than 90 or less than zero</div>}
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Stock</Form.Label>
        <Form.Control type="number" name="stock" placeholder="In Stock" required defaultValue={formvalues.stock} onChange={handleChange}/>
        { errors.stock && <div className="text-danger">Stock can't be less than zero!</div> }
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Brand name</Form.Label>
        <Form.Control type="text" name="brand" placeholder="Brand" defaultValue={formvalues.brand} onChange={handleChange}/>
      </Form.Group>

      <Form.Group>
        <Form.Label>Category</Form.Label>
        <Form.Select
          name = "category_id" required onChange={handleChange}>
             { id==0 ? <option value="" disabled selected>Select Category</option> : null }
              {allcategories.map( (category) => {
              return <option key={category.id} value={category.id}>{category.title}</option>
          })}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Images</Form.Label>
        <div className='d-flex align-items-center'>
        <div className='w-100'><Form.Control type="text" name="thumbnail" placeholder="ain image url addresss" defaultValue={formvalues.thumbnail} onChange={handleChange}/></div>
        <i className="text-success fs-2 bi bi-plus-square-fill m-1" onClick={addimage}></i>
        </div>
      </Form.Group>

      {formvalues.images && formvalues.images.length > 0 ? (
            <Form.Group className="mb-3">
              {formvalues.images.map((imageUrl, i) => (
                 <div key={imageUrl} className=" d-flex felx-nowrap align-items-center">
                  <span className='m-1'> image{i+1}: </span> <div className="w-100">
                    <Form.Control
                      className="m-1"
                      type="text"
                      name={`${i}`}
                      placeholder="Enter image URL address"
                      defaultValue={imageUrl}
                      onChange={updateImagesArr}
                    />
                  </div>
                  <div className='p-1' onClick={removeimage}><i  class="m-1 text-danger fs-2 bi bi-x-square-fill" ></i></div>
                </div>
              ))}
            </Form.Group>
            ) : null}


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
            <div className='imagecontainer'>
              {formvalues.images.length > 1 ? (
                
              <Carousel>
                <Carousel.Item className='carousel-item'  interval={2000}>
                  <img
                    src= {formvalues.thumbnail}
                    alt=""
                  />
                </Carousel.Item>
              {formvalues.images.map((item, index) => {
                return <Carousel.Item className='carousel-item' key={index}  interval={2000}>
                  <img
                    src= {item}
                    alt=""
                  />
                </Carousel.Item>
              })}
              </Carousel>

              ) : (
                formvalues.thumbnail ? (
                  <img src={formvalues.thumbnail} alt="product image" />
                ) : (
                  <div className='d-flex w-100 h-100 justify-content-center align-items-center'>
                    <h1>No image yet!!</h1>
                  </div>
                )
              )}
            </div>
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

