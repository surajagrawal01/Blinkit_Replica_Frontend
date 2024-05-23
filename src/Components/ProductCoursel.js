import { useEffect, useState } from "react";
import { Row, Col, Container, Card, Image, Carousel } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { startAddItem, startChangeItem } from "../actions/userAction";
import { useNavigate } from "react-router-dom";
export default function ProductCoursel({ products, category }) {

    const [groupedProducts, setGroupedProducts] = useState([]);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        //to handle the responsiveness of image corusel
        function updateGroupedProducts() {
            const screenWidth = window.innerWidth;
            let resortsPerGroup;
            if (screenWidth < 768) {
                resortsPerGroup = 1;
            } else if (screenWidth < 992) {
                resortsPerGroup = 4;
            } else {
                resortsPerGroup = 5;
            }

            const newGroupedProducts = [];
            for (let i = 0; i < products.length; i += resortsPerGroup) {
                newGroupedProducts.push(products.slice(i, i + resortsPerGroup));
            }
            setGroupedProducts(newGroupedProducts);
        }

        // Initial setup
        updateGroupedProducts();

        // Listen for window resize events
        window.addEventListener("resize", updateGroupedProducts);

        // Cleanup
        return () => {
            window.removeEventListener("resize", updateGroupedProducts);
        };
    }, [products]); // 

    const cartItems = useSelector((state) => {
        return state.user?.user?.cartItems
    })

    const handleButton = (product) => {
        let item = undefined
        if (cartItems) {
            item = cartItems.find((ele) => ele.productId === product._id)
        }

        //if user login then only add item else navigate to login page
        const handleClick = () => {
            if (!localStorage.getItem('token')) {
                navigate("/login")
                return;
            }
            dispatch(startAddItem(product))
        }

        //checking here the toal no of particular product added in the cart 
        if (item) {
            return (
                <>
                    <button className='btn btn-primary px-2' onClick={() => dispatch(startChangeItem(product._id, 'dec'))} disabled={item.quantity === 1}>-</button>
                    <h5 className="inline-block">{item.quantity}</h5>
                    <button className='btn btn-primary px-2' onClick={() => dispatch(startChangeItem(product._id, 'inc'))}>+</button>
                    <button className='btn btn-primary px-2' style={{ marginLeft: '1px' }} onClick={() => dispatch(startChangeItem(product._id, 'delete'))}>x</button>
                </>
            )
        } else {
            return (
                <button className='btn btn-primary mx-1' onClick={handleClick}> Add</button>
            )
        }
    }


    return (
        <div className="my-4">
            <h3 className="offset-md-1">{category}</h3>
            <Container fluid className="my-2">
                {products.length > 0 && (
                    <Row>
                        <Carousel>
                            {groupedProducts?.map((group, i) => (
                                <Carousel.Item key={i}>
                                    <Row className="offset-md-1">
                                        {group?.map((ele) => (
                                            <Col key={ele._id} className="col-2 mx-3">
                                                <Card
                                                    style={{
                                                        transition: "0.3s",
                                                        position: "relative",
                                                        width: "15rem",
                                                        height: "17rem",
                                                    }}
                                                    className="my-card"
                                                >
                                                    <Card.Body>
                                                        <Image
                                                            style={{
                                                                width: "100%",
                                                                height: "50%",
                                                            }}
                                                            src={`http://localhost:3090/images/${ele.productImage}`}
                                                            alt="photo"
                                                        />
                                                        <br />
                                                        <Row>
                                                            <Col className="col md-4">
                                                                {ele.name}
                                                            </Col>
                                                        </Row>
                                                        <br />
                                                        <Row>
                                                            <Col>
                                                                <FaIndianRupeeSign /> {ele.price}
                                                            </Col>
                                                            <Col>
                                                                {handleButton(ele)}
                                                            </Col>
                                                        </Row>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        ))}
                                    </Row>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </Row>
                )}
            </Container>
        </div>
    );
}
