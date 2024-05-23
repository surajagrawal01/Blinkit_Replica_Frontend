import React from "react"
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import axios from "axios"
import { RotatingLines } from "react-loader-spinner";

//components
import HomePage from "./Components/HomePage";
import Login from "./Components/Login";
import NavbarComponent from "./Components/Nav";
import Registration from "./Components/Registration";


//action creator
import { startSetUser } from "./actions/userAction";

//lazy loading implementaion 
const CartLazy = React.lazy(() => import("./Components/Cart"));


export default function App() {

    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [precipitation, setPrecipitation] = useState({value:false, count : 0})
    const dispatch = useDispatch()


    useEffect(() => {
        //to get the details of products and categories
        Promise.all([axios.get('http://localhost:3090/api/products'), axios.get('http://localhost:3090/api/categories')])
            .then((response) => {
                const [{ data: products }, { data: categories }] = response
                setProducts(products)
                setCategories(categories)
            })
            .catch((err) => {
                alert(err.message)
            });

        //to check user logged in or not
        if (localStorage.getItem('token')) {
            dispatch(startSetUser())
        };
    }, [])

    //to access the user detail
    const user = useSelector((state) => {
        return state.user.user
    })

    useEffect(() => {
        if(Object.keys(user).length > 0 && precipitation.count === 0){
            (async () => {
                try {
                    const url = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?q=${Number(user?.geoLocation.lat)},${Number(user?.geoLocation.lng)}
                                &apikey=${process.env.REACT_APP_ACU_WEATHER_API}`
                    const response = await axios.get(url)
                    const response2 = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${response.data.Key}?apikey=${process.env.REACT_APP_ACU_WEATHER_API}`)
                    setPrecipitation({value: response2.data[0].HasPrecipitation, count : 1})
                    console.log(response2.data[0].HasPrecipitation)
                } catch (err) {
                    console.log(err)
                    alert(err.message)
                }
            })();
        }
    },[user])

    const token = localStorage.getItem('token')

    //loader 
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
                        {/* Lazy loading implementation */}
                        <Route path="/cart" element={
                            <React.Suspense fallback={spinner}>
                                <CartLazy products={products} precipitation={precipitation} />
                            </React.Suspense>} />
                    </Routes>
                </>
            )}
        </>
    )
}