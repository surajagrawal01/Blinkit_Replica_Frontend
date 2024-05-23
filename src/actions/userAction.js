import axios from "axios"

//to get the user information once login
export const startSetUser = () => {
    return (async (dispatch) => {
        try {
            const response = await axios.get('http://localhost:3090/api/users', {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
            dispatch(setUSer(response.data))
        } catch (err) {
            console.log(err)
        }
    })
}

//action generator
const setUSer = (data) => {
    return {
        type: 'SET_USER',
        payload: data
    }
}

//to clear user data once logout
export const clearUserData = () => {
    return {
        type: 'CLEAR_USER'
    }
}

//to add item in the cart
export const startAddItem = (product) => {
    return (async (dispatch) => {
        try {
            const response = await axios.put('http://localhost:3090/api/cart-items',{productId: product._id, quantity:1},{
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
            dispatch(addItem(response.data))
        } catch (err) {
            //to handle item deleted
            if(err.response.status == 404){
                alert('Oops! Sorry, product not available')
                return;
            }
            alert(err.message)
        }
    })
}

const addItem = (product)=>{
    return{
        type:'ADD_ITEM',
        payload: product
    }
}

//to update the item quantity
export const startChangeItem = (id, type) => {
    return (async (dispatch) => {
        try {
            const response = await axios.put(`http://localhost:3090/api/cart-items/changes/${id}?type=${type}`,{},{
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
            dispatch(changeItem(response.data))
        } catch (err) {
            //to handle item deleted
            if(err.response.status == 404){
                alert('Oops! Sorry, product not available')
                dispatch(itemDeleted(id))
                return;
            }
            alert(err.message)
        }
    })
}

const changeItem = (data)=>{
    return {
        type:'CHANGE_ITEM',
        payload:data
    }
}

//to handle deleted item
const itemDeleted = (id)=>{
    return {
        type: 'ITEM_DELETED',
        payload: id
    }
} 

//to clear cart once order done
export const startClearCart = ()=>{
    return (async (dispatch) => {
        try {
            const response = await axios.put(`http://localhost:3090/api/cart-items/clear`,{},{
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
            dispatch(clearCart())
        } catch (err) {
            console.log(err)
        }
    })
}

const clearCart = ()=>{
    return {
        type:'CLEAR_CART'
    }
}