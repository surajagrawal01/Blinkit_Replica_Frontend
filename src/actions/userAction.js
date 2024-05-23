import axios from "axios"
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

const setUSer = (data) => {
    return {
        type: 'SET_USER',
        payload: data
    }
}

export const clearUserData = () => {
    return {
        type: 'CLEAR_USER'
    }
}

export const startAddItem = (product) => {
    return (async (dispatch) => {
        try {
            const response = await axios.put('http://localhost:3090/api/cart-items',{productId: product._id, quantity:1},{
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
            console.log(response.data)
            dispatch(addItem(response.data))
        } catch (err) {
            console.log(err)
        }
    })
}

const addItem = (product)=>{
    return{
        type:'ADD_ITEM',
        payload: product
    }
}

export const startChangeItem = (id, type) => {
    return (async (dispatch) => {
        try {
            const response = await axios.put(`http://localhost:3090/api/cart-items/changes/${id}?type=${type}`,{},{
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
            console.log(response.data, 'change item')
            dispatch(changeItem(response.data))
        } catch (err) {
            console.log(err)
        }
    })
}

const changeItem = (data)=>{
    return {
        type:'CHANGE_ITEM',
        payload:data
    }
}

export const startClearBooking = ()=>{
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