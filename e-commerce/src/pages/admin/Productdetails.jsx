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
  let [selectedpic, setSelectedpic] = useState ("")


  
  let getProduct = async () => {
		let response = await axios.get(`http://localhost:3005/${category_name}/${id}`);
		setProduct(response.data);

	};

	useEffect(() => {
		if (id !== 0) 
    {
			getProduct();

		}
	}, []); 




 useEffect(() => {
    if (product.thumbnail) {
      setSelectedpic(product.thumbnail);
    }
  },[product]);

  // if (!selectedpic) {
  //   return null;
  // }
  
  
  let changepic = (imageurl) => {
    console.log(imageurl);
    console.log(selectedpic)
    setSelectedpic (imageurl);
    console.log(selectedpic)
  }



  return (
    <div>
      <div className='text-center'><h1>Product Details</h1></div>
        <div className={`previewProjectdetails container`}>
            <div className='d-flex parentcontainer '>
           
              { product.images && product.images.length > 1 ?  <div className='d-felx flex-column imagescontianer '>
              <div className='m-1 produductDetailsImages'><img src={product.thumbnail} alt="product image" onClick={() => changepic(product.thumbnail)} /></div>
                {product.images.map(imageurl => <div key={imageurl} className='produductDetailsImages'><img key={imageurl} src={imageurl} alt="XX" onClick={() => changepic(imageurl)}/></div>)}
                </div> : null} 

               <div className=' imagecontainer '><img src={selectedpic} alt="product image" /></div>
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

      <div>
      
      </div>
    </div>
  )
}
