import { rootStateType } from "./store";


export const getAppInitialized = (state: rootStateType) => {
    return state.appReducer.appInitialized
}
export const getProjects = (state: rootStateType) => {
    return state.projectsReducer.projects
}
export const getAllProjectsTasks = (state: rootStateType) => {
    return state.projectsReducer.allProjectsTasks
}