import { combineReducers } from 'redux'
import user from './userReducer'
import problem from './problemReducer'

//unify reducer
const RootReducer = combineReducers({
    user,
    problem
})

export default RootReducer;