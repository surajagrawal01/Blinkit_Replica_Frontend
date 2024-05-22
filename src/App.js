import { useEffect, useState } from "react";
import HomePage from "./Components/HomePage";
import Login from "./Components/Login";
import NavbarComponent from "./Components/Nav";
import { Routes, Route } from "react-router-dom"
import Registration from "./Components/Registration";
import { useSelector, useDispatch } from "react-redux";
import { RotatingLines } from "react-loader-spinner";
import { startSetUser } from "./actions/userAction";
import Cart from "./Components/Cart";
import axios from "axios"
export default function App() {

    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])

    useEffect(()=>{
        (async()=>{
            try{
                const response = await axios.get("http://localhost:3090/api/products")
                setProducts(response.data)
            }catch(err){
                console.log(err)
                alert(err.message)
            }
        })();
        (async()=>{
            try{
                const response = await axios.get("http://localhost:3090/api/categories")
                setCategories(response.data)
            }catch(err){
                console.log(err)
                alert(err.message)
            }
        })();
    },[])

    const dispatch = useDispatch()

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(startSetUser())
        }
    },[])

    const user = useSelector((state)=>{
        return state.user.user
    })

    const token = localStorage.getItem('token')

    const spinner = (
        <div
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }}
        >
            <RotatingLines
                visible={true}
                height="96"
                width="96"
                strokeColor="blue"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    );
    return (
        <>
            {!Object.keys(user).length > 0 && token ? (
                <div className="parent-container">
                    {spinner}{" "}
                </div>
            ) : (
                <>
                    <NavbarComponent />
                    <Routes>
                        <Route path="/" element={<HomePage products={products} categories={categories} />} />
                        <Route path="/registration" element={<Registration />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/cart" element={<Cart products={products}/>} />
                    </Routes>
                </>
            )}
        </>
    )
}