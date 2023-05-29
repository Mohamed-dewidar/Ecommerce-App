import React from 'react'
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

export  function Mynav() {

  let navigate = useNavigate()


  return (
    <div className='my-3'>
        <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home"><NavLink className="nav-link" to="/home">ECOM</NavLink ></Navbar.Brand>
          <Nav className="ms-auto">
            <NavLink className="nav-link" to="admin/home">Home</NavLink >
            <NavLink className="nav-link" to="/products">products</NavLink >
            {/* <NavLink className="nav-link" to="/product/3">productdetails</NavLink > */}
            <NavLink className="nav-link" to="/products/0/edit">Add products</NavLink >
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}
