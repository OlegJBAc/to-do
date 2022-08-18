import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { constAllProjectsTasks } from "../../general/constants/constants";
import { projectsType, taskType } from "../../types/types";
import { actionOnTask, checkProjectExisting, checkTaskExisting } from "./functionForReducers";


const initialState = {
    allProjectsTasks: [] as taskType[],
    projects: {} as projectsType,
}


const projectsSlice = createSlice({
    name: 'projects',
    initialState: initialState,
    reducers: {
        projectsTasksInitialize: (state, action: PayloadAction<projectsType | null>) => {
            if(action.payload){
                state.projects = action.payload
            }else{
                console.error('problem with projects initializing')
            }
        },
        allProjectsTasksInitialize: (state, action: PayloadAction<taskType[] | null>) => {
            if(action.payload){
                state.allProjectsTasks = action.payload
            }else{
                console.error('problem with allProjectsTasks initializing')
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
            delete state.projects[projectName]
            localStorage.setItem('projects', JSON.stringify(state.projects))
            console.error('such project not founded')
        },
        addTask: (state, action: PayloadAction<{ projectName: string, task: taskType }>) => {
            const { projectName, task } = action.payload
            const isExist = checkTaskExisting(state.projects[projectName], task.name)
            if(!isExist){
                state.projects[projectName].push(task)
                state.allProjectsTasks.push(task)
                localStorage.setItem('projects', JSON.stringify(state.projects))
                localStorage.setItem(constAllProjectsTasks, JSON.stringify(state.allProjectsTasks))
            }else{
                console.error('such task already exist')
            }
        },
        deleteTask: (state, action: PayloadAction<{projectName: string, task: taskType}>) => {
            actionOnTask(state, 'delete', action.payload)
        },
        editTask: (state, action: PayloadAction<{ projectName: string, task: taskType }>) => {
            actionOnTask(state, 'edit', action.payload)
        },
        setPriorityTask: (state, action: PayloadAction<{ projectName: string, task: taskType }>) => {
            actionOnTask(state, 'setPriority', action.payload)
        },
        changeTaskProject: (state, action: PayloadAction<{ projectFrom: string, projectTo: string, task: taskType }>)=> {
            const { projectFrom, projectTo, task } = action.payload
            state.projects[projectFrom].forEach((taskItem, index, arr) => {
                if(taskItem.id === task.id){
                    arr.splice(index, 1)
                }
            })
            state.allProjectsTasks.forEach((taskItem, index, arr) => {
                if(taskItem.id === task.id){
                    arr.splice(index, 1, {...task, currentProject: projectTo})
                }
            })
            state.projects[projectTo].push({...task, currentProject: projectTo})
        },
    }
})

export const { addProject, deleteProject, addTask, deleteTask, editTask, setPriorityTask, changeTaskProject,
               projectsTasksInitialize, allProjectsTasksInitialize } = projectsSlice.actions

export default projectsSlice.reducer


export type projectsStateType = typeof initialState