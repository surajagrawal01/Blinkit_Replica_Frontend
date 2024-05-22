import { Formik, Field, ErrorMessage, Form } from "formik"
import * as Yup from "yup"
import axios from "axios"
import { useState } from "react"
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate, Link } from "react-router-dom";
export default function Registration() {
    const navigate = useNavigate()
    const [serverErrors, setServerErrors] = useState([])

    //use formik and yup for dynamic form
    return (
        <Formik
            initialValues={{
                name: '', email: '', password: '', houseNumber: '',
                locality: '',
                area: '',
                pincode: '',
                city: '',
                state: '',
                country: '',
            }}
            validationSchema={
                Yup.object({
                    name: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('Required'),
                    email: Yup.string()
                        .email('Invalid email address')
                        .required('Required'),
                    houseNumber: Yup.string()
                        .required("Required"),
                    locality: Yup.string()
                        .required("Required"),
                    area: Yup.string()
                        .required("Required"),
                    pincode: Yup.string()
                        .required("Required"),
                    city: Yup.string()
                        .required("Required"),
                    state: Yup.string()
                        .required("Required"),
                    country: Yup.string()
                        .required("Required"),
                    password: Yup.string()
                        .min(8, 'min 8 characters')
                        .max(128, 'min 128 characters')
                        .required('Required')
                        .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s])/, 'At least one Capital Letter, small letter, digit and symbol'),
                })}
            onSubmit={async (values) => {
                const formData = {
                    name: values.name,
                    email: values.email,
                    password: values.password,
                    location: {
                        houseNumber: values.houseNumber,
                        locality: values.locality,
                        area: values.area,
                        pincode: values.pincode,
                        city: values.city,
                        country: values.country,
                        state: values.state,
                    }
                }
                try {
                    const response = await axios.post("https://resortifybackend.onrender.com/api/users", values)
                    alert('Registration Successful')
                    navigate('/login')
                    console.log(formData)
                } catch (err) {
                    console.log(err)
                    setServerErrors(err.response.data.errors)
                }
            }}
        >

            <>
                <Container fluid className="my-4">
                    <Row>
                        <Col xs={12} md={6} className='m-auto'>
                            <Card className='m-auto p-3' border="primary">
                                <Card.Body>

                                    <Card.Title > Registration Form </Card.Title> <hr />
                                    
                                    <Form className='form-control'>
                                        <label className="form-label" htmlFor="name">Name</label>
                                        <Field className="form-control" name="name" type="text" id="name" />
                                        <ErrorMessage className="text-danger" component="div" name="name" />

                                        <label className="form-label" htmlFor="email">Email</label>
                                        <Field className="form-control" name="email" type="text" id="email" />
                                        <ErrorMessage className="text-danger" component="div" name="email" />

                                        <Row>
                                            <Col>
                                                <Row>
                                                    <Col>
                                                        <label className="form-label" htmlFor="houseNumber">HouseNumber</label>
                                                        <Field className="form-control" name="houseNumber" type="text" id="houseNumber" />
                                                        <ErrorMessage className="text-danger" component="div" name="houseNumber" />
                                                    </Col>
                                                    <Col className="m-auto">
                                                        <label className="form-label" htmlFor="locality">Locality</label>
                                                        <Field className="form-control" name="locality" type="text" id="locality" />
                                                        <ErrorMessage className="text-danger" component="div" name="locality" />
                                                    </Col>
                                                </Row>

                                                <Row>
                                                    <Col>
                                                        <label className="form-label" htmlFor="area">Area</label>
                                                        <Field className="form-control" name="area" type="text" id="area" />
                                                        <ErrorMessage className="text-danger" component="div" name="area" />
                                                    </Col>
                                                    <Col className="m-auto">
                                                        <label className="form-label" htmlFor="pincode">Pincode</label>
                                                        <Field className="form-control" name="pincode" type="text" id="pincode" />
                                                        <ErrorMessage className="text-danger" component="div" name="pincode" />
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <label className="form-label" htmlFor="city">City</label>
                                                        <Field className="form-control" name="city" type="text" id="city" />
                                                        <ErrorMessage className="text-danger" component="div" name="city" />
                                                    </Col>
                                                    <Col className="m-auto">
                                                        <label className="form-label" htmlFor="state">State</label>
                                                        <Field className="form-control" name="state" type="text" id="state" />
                                                        <ErrorMessage className="text-danger" component="div" name="state" />
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col className="m-auto">
                                                        <label className="form-label" htmlFor="country">Country</label>
                                                        <Field className="form-control" name="country" type="text" id="country" />
                                                        <ErrorMessage className="text-danger" component="div" name="country" />
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>

                                        <label className="form-label" htmlFor="password">Password </label>
                                        <Field className="form-control" name="password" type="password" id="password" />
                                        <ErrorMessage className="text-danger" component="div" name="password" />

                                        <article className='indicate-warning'>
                                            <p>**Password requires UpperCase, LowerCase, Digit, and Symbol, minimally.</p>
                                        </article>

                                        <button type="submit" className='btn btn-primary form-control'>Submit</button> <br />
                                        <Link to='/login'>Already have an account? Login here</Link> <br />
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </>
        </Formik>
    )
}