import { rootStateType } from "./store";


export const getAppInitialized = (state: rootStateType) => {
    return state.appReducer.appInitialized
}