import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
//import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../Actions/AuthActions";
import './Navbar.css';
import LogOut from "../Logout/LogOut";
import KAROK from '../../img/KAROK.png';

// import NavDropdown from 'react-bootstrap/NavDropdown';


function Navigate() {
  
  const user = useSelector((state) => state.authReducer.authData)
  const dispatch = useDispatch();

  return (
    
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand  className = "brandName" href="/">
        <img className= "logoNav" src={KAROK} alt =""  />
        </Navbar.Brand>
        <Navbar.Brand>    Karokify</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll"/>
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{maxHeight: '100px'}}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About Karokify</Nav.Link>
            <Nav.Link href="/contact">Support</Nav.Link>
          </Nav>
          { user ?
            <LogOut/>: ''
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
  );
}

export default Navigate;