import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import '../style/nav.css'
import SideBar from './SideBar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AppNav = () => {

  const [show, setShow] = useState(false);
  const navigate = useNavigate()

  const handleClose = () => setShow(false);
  const handleShow = () => {
    const token = localStorage.getItem('token')
    if(token) {
      setShow(true)
    } else {
      navigate('/login')
    }
  };

    return(
      <nav>
            <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to={`/`}>News App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to={`/login`}><i className='bx bx-user'></i> Login</Nav.Link>
            <Nav.Link as={Link} to={`/favorites`}><i className='bx bx-box'></i> Favoritos</Nav.Link>
            <Nav.Link
            onClick={handleShow}
            ><i className='bx bx-cart'></i></Nav.Link>
            <SideBar
            show={show}
            handleClose={handleClose}
            />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      </nav>
    )
}

export default AppNav