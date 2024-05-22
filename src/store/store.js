import {createStore, combineReducers, applyMiddleware} from "redux"
import {thunk} from "redux-thunk"
import userReducer from "../reducers/userReducers"
const configStore = ()=>{

    const store = createStore(combineReducers({
        user: userReducer
    }), applyMiddleware(thunk))

    return store
}


export default configStore;
