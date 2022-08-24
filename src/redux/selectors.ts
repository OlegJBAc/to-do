import { rootStateType } from "./store";


export const getAppInitialized = (state: rootStateType) => {
    return state.appReducer.appInitialized
}
export const getProjects = (state: rootStateType) => {
    return state.projectsReducer.projects
}
export const getProjectsNames = (state: rootStateType) => {
    return Object.keys(state.projectsReducer.projects)
}
export const getAllProjectsTasks = (state: rootStateType) => {
    return state.projectsReducer.allProjectsTasks
}
export const getDefaultPages = (state: rootStateType) => {
    return state.defaultPagesReducer.defaultPages
}
export const getAuthData = (state: rootStateType) => {
    return state.appReducer.authData
}