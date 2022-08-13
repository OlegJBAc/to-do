import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { projectsType, taskType } from "../../types/types";
import { rootStateType } from "../store";


const initialState = {
    allProjectsTasks: [] as taskType[],
    projects: {} as projectsType,
}


const projectsSlice = createSlice({
    name: 'projects',
    initialState: initialState,
    reducers: {
        projectTasksInitialize: (state, action: PayloadAction<projectsType | null>) => {
            if(action.payload){
                state.projects = action.payload
                const projectsKeys = Object.keys(action.payload)
                projectsKeys.forEach(project => {
                    state.projects[project].forEach(task => {
                        state.allProjectsTasks.push(task)
                    })
                })
            }else{
                console.error('problem with projects initializing')
            }
        },
        addProject: (state, action: PayloadAction<{projectName: string}>) => {
            const { projectName } = action.payload
            const isExist = checkProjectExisting(state.projects, projectName)
            if(!isExist){
                state.projects[projectName] = []
                localStorage.setItem('projects', JSON.stringify(state.projects))
            }else{
                console.error('project already exist')
            }
        },
        deleteProject: (state, action: PayloadAction<{projectName: string}>) => {
            const { projectName } = action.payload
            const isExist = checkProjectExisting(state.projects, projectName)
            if(isExist){
                delete state.projects[projectName]
                localStorage.setItem('project', JSON.stringify(state.projects))
            }else{
                console.error('such project not founded')
            }
        },
        addTask: (state, action: PayloadAction<{ projectName: string, task: taskType }>) => {
            const { projectName, task } = action.payload
            const isExist = checkTaskExisting(state.projects[projectName], task.name)
            if(!isExist){
                state.projects[projectName].push(task)
                state.allProjectsTasks.push(task)
                localStorage.setItem('projects', JSON.stringify(state.projects))
                localStorage.setItem('allProjectsTasks', JSON.stringify(state.allProjectsTasks))
            }else{
                console.error('such task already exist')
            }
        },
        deleteTask: (state, action: PayloadAction<{projectName: string, taskForDeleting: taskType}>) => {
            const { projectName, taskForDeleting } = action.payload
            const isExist = checkTaskExisting(state.projects[projectName], taskForDeleting.name)
            if(isExist){
                state.projects[projectName].forEach((task, index) => {
                    if(task.id === taskForDeleting.id){
                        state.projects[projectName].splice(index, 1)
                        const indexInAllProjectTasks = state.allProjectsTasks.indexOf(task)
                        state.allProjectsTasks.splice(indexInAllProjectTasks, 1)
                    }
                })
                localStorage.setItem('project', JSON.stringify(state.projects))
            }else{
                console.error('such task not founded')
            }
        }
    }
})

const checkProjectExisting = (projects: projectsType, projectName: string) => {
    const projectsKeys = Object.keys(projects)
    return projectsKeys.includes(projectName) ? true : false
}
const checkTaskExisting = (project: taskType[], taskName: string) => {
    let isExist = false
    if(project.length !== 0){
        project.forEach(task => {
            if(task.name === taskName){
                isExist = true
            }
        })
    }
    return isExist
}

export const { addProject, deleteProject, addTask, deleteTask, projectTasksInitialize } = projectsSlice.actions

export default projectsSlice.reducer


