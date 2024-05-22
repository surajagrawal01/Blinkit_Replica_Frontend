import { useEffect, useMemo } from "react"
import { Row, Col, Card, Image, Button } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux";
import { startChangeItem } from "../actions/userAction";
import { LiaRupeeSignSolid } from "react-icons/lia";
export default function Cart({ products }) {

    const dispatch = useDispatch()

    //accessing the user information from store
    const user = useSelector((state) => {
        return state.user.user
    })

    useEffect(() => {
        // (async()=>{
        //     try{
        //         const url = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?q=${Number(user.geoLocation.lat)},${Number(user.geoLocation.lng)}&apikey=${process.env.REACT_APP_ACU_WEATHER_API}`
        //         const response = await axios.get(url)
        //         const response2 = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${response.data.Key}?apikey=${process.env.REACT_APP_ACU_WEATHER_API}`)
        //         console.log(response2)
        //     }catch(err){
        //         console.log(err)
        //         alert(err.message)
        //     }
        // })();
    }, [])

    //to get the each product details
    const productItem = (productId) => {
        return products.find((ele) => {
            return ele._id == productId
        })
    }

    //to handle the item change in the cart
    const handleButton = (product) => {
        return (
            <>
                <button className='btn btn-primary p-2' onClick={() => dispatch(startChangeItem(product.productId, 'dec'))} disabled={product.quantity === 1}>-</button>
                <h5 className="inline-block">{product.quantity}</h5>
                <button className='btn btn-primary p-2' onClick={() => dispatch(startChangeItem(product.productId, 'inc'))}>+</button>
                <button className='btn btn-primary p-2' style={{ marginLeft: '1px' }} onClick={() => dispatch(startChangeItem(product.productId, 'delete'))}>x</button>
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
    const deliveryAmount = useMemo(()=>{
        return Number(calculateAmount) * 0.10
    },[calculateAmount])


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
                                                <Card key={ele._id} className="my-3">
                                                    <Row className="my-4">
                                                        <Col className="m-auto"><Image
                                                            style={{
                                                                width: "50%",
                                                                height: "30%",
                                                            }}
                                                            src={`http://localhost:3090/images/${productItem(ele.productId)?.productImage}`}
                                                            alt="photo"
                                                        /></Col>
                                                        <Col className="m-auto">
                                                            {productItem(ele.productId)?.name} <br />
                                                            Rs: {productItem(ele.productId)?.price * ele.quantity}<br />
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
                                            <h5> Delivery Charges : <span className="offset-md-3"><LiaRupeeSignSolid /> {deliveryAmount}</span> </h5>
                                            <hr />
                                            <h5> Total Amount : <span className="offset-md-4"><LiaRupeeSignSolid /> {calculateAmount + deliveryAmount}</span> </h5><br />
                                        </Row>
                                            <Button>Book</Button>
                                    </Card>
                                </Card.Body>
                            </Card>
                        </Row >
                    </Col>
                </Row>
            </> : <> No items in the cart</>}
        </>
    )
}