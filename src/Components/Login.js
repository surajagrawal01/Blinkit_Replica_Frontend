import { useState } from "react"
import { Button, Form } from 'react-bootstrap';
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import { startSetUser } from "../actions/userAction";
export default function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [formErrors, setFormErrors] = useState({})
    const [serverErrors, setServerErrors] = useState({})
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const errors = {}

    //client side validation
    const validateErrors = () => {
        if (!formData.email) {
            errors.email = 'required'
        }
        if (!formData.password) {
            errors.password = 'required'
        }
    }

    //handle login submit button
    const handleSubmit = async (e) => {
        e.preventDefault()
        validateErrors()
        if (Object.keys(errors).length === 0) {
            setFormErrors({})
            try {
                const response = await axios.post("http://localhost:3090/api/users-login", formData)
                alert('Successfull Login')
                {
                    localStorage.setItem("token", response.data.token)
                }
                dispatch(startSetUser())
                navigate("/")
            } catch (err) {
                console.log(err)
                setServerErrors(err.response.data)
            }
        } else {
            setFormErrors(errors)
        }
    }

    //to handle user input
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <>
            <Container fluid className="mt-4">
                <Row>
                    <Col xs={12} md={4} className='m-auto'>
                        <Card className='m-auto p-3' border="primary">
                            <Card.Body>

                                <Card.Title > Registration Form </Card.Title> <hr />
                                {
                                    serverErrors.length > 0 && <div>
                                        {serverErrors.map((ele, i) => {
                                            return <div key={i} className='text-danger'>**{ele.msg}</div>
                                        })}
                                    </div>
                                }
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email"
                                            value={formData.email}
                                            name="email"
                                            onChange={handleChange} />
                                        <Form.Text className="text-muted">
                                            We'll never share your email with anyone else.
                                        </Form.Text>
                                        {formErrors.email && <div className="text-danger">**{formErrors.email}</div>}
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password"
                                            value={formData.password}
                                            name="password"
                                            onChange={handleChange} />
                                        {formErrors.password && <div className="text-danger">**{formErrors.password}</div>}
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Login
                                    </Button> <br />
                                    <Form.Text className="text-primary">
                                        <Link to="/registration">New User! Register Here </Link>
                                    </Form.Text>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}