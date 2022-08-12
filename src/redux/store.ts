import { configureStore, combineReducers } from "@reduxjs/toolkit"
import appReducer from './reducers/app-slice'
import projectsReducer from './reducers/projects-slice'

const rootReducer = combineReducers({
    appReducer,
    projectsReducer,
})

const store = configureStore({
    reducer: rootReducer
})

export type rootReducerType = ReturnType<typeof rootReducer>
export type rootStateType = ReturnType<typeof store.getState>
export type appDispatchType = typeof store.dispatch



export default store