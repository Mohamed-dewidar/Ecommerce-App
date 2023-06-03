import React, { useContext, useState , useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import "./css/productdetail.css";


export  function Productdetails() {
  let {id} = useParams();
  let {category_id} = useParams();
  let AllCategories = ["Electronics", "Clothing", "Home-Appliances", "Leather", "Watches" ]
  let category_name = AllCategories[category_id-1]
  let [product,setProduct] = useState({})


  
  let getProduct = async () => {
		let response = await axios.get(`http://localhost:3005/${category_name}/${id}`);
		setProduct(response.data);
    console.log(product);
	};
	useEffect(() => {
		if (id != 0) 
    {
			getProduct();
		}
	}, []);

  let [selectedpic, setSelectedpic] = useState (product.thumbnail)


  

  return (
    <div>
      <div className='text-center'><h1>Product Details</h1></div>
        <div className={`previewProjectdetails`}>
            <div className='d-flex parentcontainer '>
              {/* {product.images.length} */}
              { product.images.length > 1 ?  <div className='d-felx flex-column imagescontianer '>
              <div className=''><img src={product.thumbnail} alt="product image" /></div>
                {product.images.map(image => <div className=''><img src={image} alt="XX" /></div>)}
                </div> : null}
              <div className=' imagecontainer '><img src={product.thumbnail} alt="product image" /></div>
              <div className=' infocontainer'>
                <div className='w-100 text-center'><h1>{product.title}</h1></div>
                <hr />
                <div><h2> USD <span >{product.price * (100-product.discountPercentage) /100}</span></h2></div>
                { product.discountPercentage > 0 ? (<div><del>USD{product.price}</del> ({product.discountPercentage} % Off)</div>) : null}
                <div><strong>Description :</strong> {product.description}</div>
                {/* <div>discount percentage : {product.discountPercentage} %</div> */}
                <div><strong> In Stock : </strong>{product.stock}</div>
                <div><strong>Brand : {product.brand}</strong> </div>
              </div>
            </div>  
      </div>
    </div>
  )
}
