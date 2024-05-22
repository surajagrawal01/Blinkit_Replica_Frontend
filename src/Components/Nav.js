import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUserData } from '../actions/userAction';
function NavbarComponent() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector((state) => {
    return state.user.user
  })

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
                <NavDropdown id="basic-nav-dropdown" align="start" title={<FaUserCircle />}>
                  <Link to="/cart" className='link-style'><NavDropdown.Item href="/cart">Cart</NavDropdown.Item></Link>
                  <NavDropdown.Divider />
                  <Link to="/" className='link-style'><NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item></Link>
                </NavDropdown>
              </> : <Nav.Link>
                <Link to="/registration" className="link-style">
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