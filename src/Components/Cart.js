import {  useMemo } from "react"
import { useSelector, useDispatch } from "react-redux";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { Row, Col, Card, Image, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom";

//action creator
import { startChangeItem, startClearCart } from "../actions/userAction";

//image importing
import img1 from "../images/empty-cart.jpg"

export default function Cart({ products, precipitation }) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    //accessing the user information from store
    const user = useSelector((state) => {
        return state.user.user
    })

    //to get the each product details
    const productItem = (productId) => {
        const product = products.find((ele) => {
            return ele._id == productId
        })
        return product
    }

    //to handle the item change in the cart
    const handleButton = (product) => {
        return (
            <>
                <button className='btn btn-primary px-2' onClick={() => dispatch(startChangeItem(product.productId, 'dec'))} disabled={product.quantity === 1}>-</button>
                <h5 className="inline-block">{product.quantity}</h5>
                <button className='btn btn-primary px-2' onClick={() => dispatch(startChangeItem(product.productId, 'inc'))}>+</button>
                <button className='btn btn-primary px-2' style={{ marginLeft: '1px' }} onClick={() => dispatch(startChangeItem(product.productId, 'delete'))}>x</button>
            </>
        )
    }

    //to calculate the cart amount
    const calculateAmount = useMemo(() => {
        return user.cartItems.reduce((acc, cv) => {
            const price = productItem(cv.productId)?.price * cv.quantity
            return price + acc
        }, 0)

    }, [user.cartItems])

    //to calculate the delivery amount
    const deliveryAmount = useMemo(() => {
        return Number(calculateAmount) * 0.10
    }, [calculateAmount])


    //additional amount because of precipitation
    const additionalAmount = useMemo(() => {
        return Number(calculateAmount) * 0.05
    }, [precipitation])

    //handleBooking
    const handleBooking = () => {
        alert('Booking Done')
        dispatch(startClearCart())
        navigate("/")
    }

    return (
        <>
            {user?.cartItems.length > 0 ? <>
                <Row>
                    <Col xs={12} md={5} className="mx-3">
                        <Row xs={12} md={12} className='m-auto'>
                            <Card className='m-auto p-3 border-0' border="primary">
                                <Row xs={12} md={10}>
                                    <Card.Title>
                                        Cart Items
                                    </Card.Title>
                                    <hr />
                                </Row>
                                <Card.Body>
                                    {
                                        user.cartItems.map((ele) => {
                                            return (
                                                <Card key={ele.productId} className="my-3">
                                                    <Row className="my-4 mx-auto">
                                                        <Col className="m-auto" ><Image
                                                            style={{
                                                                width: "50%",
                                                                height: "30%",
                                                            }}
                                                            src={`http://localhost:3090/images/${productItem(ele.productId)?.productImage}`}
                                                            alt="photo"
                                                        /></Col>
                                                        <Col className="m-auto">
                                                            <h5 className="inline-block">{productItem(ele.productId)?.name}</h5> <br />
                                                            <h5 className="inline-block">Rs: {productItem(ele.productId)?.price * ele.quantity}</h5><br />
                                                            {handleButton(ele)}
                                                        </Col>
                                                    </Row>
                                                </Card>
                                            )
                                        })
                                    }
                                </Card.Body>
                            </Card>
                        </Row >
                    </Col>
                    {products.length > 0 &&
                        <Col xs={12} md={4} className="my-6">
                            <Row xs={12} md={12} className='m-auto'>
                                <Card className='m-auto p-3 border-0' border="info">
                                    <Row xs={12} md={10}>
                                        <Card.Title>
                                            Bill Details
                                        </Card.Title>
                                        <hr />
                                    </Row>
                                    <Card.Body>
                                        <Card className="my-3" style={{ height: '13rem' }}>
                                            <Row className="offset-md-2 m-auto">
                                                <h5> Cart Amount : <span className="offset-md-4"><LiaRupeeSignSolid /> {calculateAmount}</span> </h5>
                                                <h5> Delivery charges : <span className="offset-md-3"><LiaRupeeSignSolid /> {deliveryAmount}</span> </h5>
                                                {precipitation.value && <h5 className="red-info"> Additional (*due to rain) : <span className="offset-md-1"><LiaRupeeSignSolid /> {additionalAmount}</span> </h5>}
                                                <hr />
                                                <h5> Total Amount : <span className="offset-md-4"> <LiaRupeeSignSolid />
                                                    {precipitation.value ? (calculateAmount + deliveryAmount + additionalAmount) : (calculateAmount + deliveryAmount)}
                                                </span> </h5><br />
                                            </Row>
                                            {calculateAmount < 200 && <p className="red-info inline-block mx-auto" >**cart amount should be greater than 200</p>}
                                            <Button onClick={handleBooking} disabled={calculateAmount < 200}>Book</Button>
                                        </Card>
                                    </Card.Body>
                                </Card>
                            </Row >
                        </Col>}
                </Row>

            </> : <>
                <div className="offset-md-3 col-6">
                    <img alt="image" src={img1} style={{ maxWidth: '100%' }} />
                </div></>}
        </>
    )
}