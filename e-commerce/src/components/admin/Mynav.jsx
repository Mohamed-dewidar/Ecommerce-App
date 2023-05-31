import React, {useContext} from 'react'
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context'

export  function Mynav() {

  const user = useContext(UserContext)

  let navigate = useNavigate()


  return (
    <div className='my-3'>
        <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home"><NavLink className="nav-link" to="/home">ECOM</NavLink ></Navbar.Brand>
          <Nav className="ms-auto">
            <NavLink className="nav-link" to={`admin/${user}/home`}>Home</NavLink >
            <NavLink className="nav-link" to={`admin/${user}/products`}>products</NavLink >
            {/* <NavLink className="nav-link" to="/product/3">productdetails</NavLink > */}
            <NavLink className="nav-link" to="/products/0/edit">Add product</NavLink >
            <NavLink className="nav-link" to={`admin/${user}/Profile`}>{user}<i class="bi bi-person-circle m-2"></i></NavLink >

          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}
