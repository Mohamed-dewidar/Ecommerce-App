import React from 'react'
import { Card, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';


export function Mycard(prop) {

    let navigate = useNavigate()


    let {product} = prop
    // console.log(product)

  return (
    <div className='m-2'> 
      <Card style={{ width: '18rem' }}>
      <Card.Img style={{ height:"200px", objectFit: "contain"}} variant="top" src={product.thumbnail} />
      <Card.Body>
        <Card.Title className='text-center'>{product.title}</Card.Title>
        <Card.Text>
            <div className='text-limit'>{product.description}</div>
            
        </Card.Text>
        <Card.Text className='d-flex justify-content-center'>
        { product.discountPercentage == 0 ? (<strong className='h3'>{product.price}$</strong> ) : (<div className=""> <del>{product.price}</del> <strong className='h3'>{ parseInt(product.price) * (100 - parseInt(product.discountPercentage) ) / 100}$</strong></div>)} 
        </Card.Text>
        <div className='d-flex justify-content-center'><Button onClick={() => navigate(`/admin/${product.seller}/${product.category_id}/${product.id}/edit`)} variant="primary">Edit Product</Button></div>
      </Card.Body>
    </Card>
    </div>
  )
}
