const initialState = {
    user: {}
}

export default function userReducer(state= initialState, action){
    switch(action.type){
        case 'SET_USER':{
            return {...state, user: {...action.payload}}
        }
        case 'CLEAR_USER':{
            return {...state, user: {}}
        }
        case 'ADD_ITEM':{
            return {...state, user : {...state.user , cartItems: [...state.user.cartItems, {...action.payload}]}}
        }
        case 'CHANGE_ITEM':{
            return {...state, user : {...state.user , cartItems: [...action.payload]}}
        }
        case 'CLEAR_CART':{
            return {...state, user : {...state.user , cartItems: []}}
        }
        case 'ITEM_DELETED':{
            return {...state, user: {...state.user, cartItems: state.user.cartItems.filter((ele)=>{
                return ele.productId !== action.payload
            })}}
        }
        default:{
            return state
        }
    }
}   