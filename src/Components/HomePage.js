import React from "react"
import ProductCoursel from "./ProductCoursel";
export default function HomePage({products, categories}){

    return(
        <>
            {
                categories.map((ele)=>{
                    return(
                        <React.Fragment key={ele._id}>
                            <ProductCoursel products={products.filter((product)=> product?.categoryId?._id == ele._id)} category = {ele.name} />  
                        </React.Fragment>
                    )
                })
            }
        </>
    )
}