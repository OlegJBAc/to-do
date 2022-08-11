import { configureStore, combineReducers } from "@reduxjs/toolkit";
import appReducer from './app-slice'

const rootReducer = combineReducers({
    appReducer,
})

const store = configureStore({
    reducer: rootReducer
})



export default store