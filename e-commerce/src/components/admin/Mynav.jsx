import React, {useContext} from 'react'
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context'
import '../user/userNav.css';

export  function Mynav() {

  const user = useContext(UserContext)


  let navigate = useNavigate();
  function goHome() {
    navigate(`/admin/${user}/home`);
  }

  return (
    <div className='my-3'>
        {/* <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home"><NavLink className="nav-link" to="/home">ECOM</NavLink ></Navbar.Brand>
          <Nav className="ms-auto">
            <NavLink className="nav-link" to={`admin/${user}/home`}>Home</NavLink >
            <NavLink className="nav-link" to={`admin/${user}/products`}>Products</NavLink >
            <NavLink className="nav-link" to={`admin/${user}/product/0/edit`}>Add product</NavLink >
            <NavLink className="nav-link" to={`admin/${user}/Profile`}>{user}<i class="bi bi-person-circle m-2"></i></NavLink >
          </Nav>
        </Container>
      </Navbar>
       */}

      <div>
      <div className="navTop align-items-center d-flex">
        <div className="navLogo" onClick={goHome}>
          ECHO
        </div>
        <div className="cart">
          
          <NavLink className="nav-link" to={`admin/${user}/home`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16">
                <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z"/>
                </svg>
          </NavLink >

          <NavLink className="nav-link" to={`admin/${user}/products`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
          </svg>
          </NavLink >

          <NavLink className="nav-link" to={`admin/${user}/product/0/edit`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
          </svg>
          </NavLink >

          {/* <NavLink className="nav-link" to={`admin/${user}/Profile`}> */}
            <div className='d-flex' ><strong className='m-1  fs-5'>{user}</strong>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                 <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
          </svg></div>
          {/* </NavLink > */}


        </div>
      </div>
      <div className="navBottom"></div>
    </div>
    </div>
    
  )
}
