import React from 'react'
import { Card, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';


export function Mycard(prop) {

    let navigate = useNavigate()

    let {product} = prop
    console.log(product)

  return (
    <div className='m-2'>  
      <Card style={{ width: '18rem' }}>
      <Card.Img style={{ height:"200px", objectFit: "cover"}} variant="top" src={product.thumbnail} />
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>
            <div className='text-limit'>{product.description}</div>
            
        </Card.Text>
        <Card.Text>
            {product.price} $
        </Card.Text>
        <Button onClick={() => navigate(`/admin/prooducts/${product.id}`)} variant="primary">Edit Product</Button>
      </Card.Body>
    </Card>
    </div>
  )
}
