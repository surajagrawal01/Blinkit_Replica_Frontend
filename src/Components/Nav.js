import { useSelector, useDispatch } from 'react-redux';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

//icons
import { FaUserCircle } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";

//action creator
import { clearUserData } from '../actions/userAction';

function NavbarComponent() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  //accessing user data
  const user = useSelector((state) => {
    return state.user.user
  })

  //loggin out 
  const handleLogout = () => {
    localStorage.removeItem('token')
    dispatch(clearUserData())
    navigate("/")
  }

  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Link to="/" className="link-style"><Navbar.Brand href="/">Blinkit</Navbar.Brand></Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" className="link-style"><Nav.Link href="/">Home</Nav.Link></Link>
          </Nav>
          <Nav className="ms-auto">

            {Object.keys(user).length > 0 ?
              <>
                <Nav.Link><button className='btn btn-light' onClick={() => navigate('/cart')}><BsCart3 /> Cart</button></Nav.Link>
                <Nav.Link onClick={handleLogout} className='my-1'>Logout</Nav.Link>
              </> : <Nav.Link>
                <Link to="/login" className="link-style">
                  <FaUserCircle /> Login/SignUp{" "}
                </Link>
              </Nav.Link>}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;