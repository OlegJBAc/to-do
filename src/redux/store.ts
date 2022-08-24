import { configureStore, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit"
import appReducer from './reducers/app-slice'
import projectsReducer from './reducers/projects-slice'
import defaultPagesReducer from './reducers/defaultPages-slice'
import authReducer from './reducers/auth-slice'

const rootReducer = combineReducers({
    appReducer,
    projectsReducer,
    defaultPagesReducer,
    authReducer,
})

const store = configureStore({
    reducer: rootReducer
})

export type rootReducerType = ReturnType<typeof rootReducer>
export type rootStateType = ReturnType<typeof store.getState>
export type appDispatchType = typeof store.dispatch



export default store