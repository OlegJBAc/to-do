import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { constAllProjectsTasks } from "../../general/constants/constants";
import { projectsType, taskType } from "../../types/types";
import { checkProjectExisting, checkTaskExisting } from "./functionForReducers";


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
            const isExist = checkProjectExisting(state.projects, projectName)
            if(isExist){
                delete state.projects[projectName]
                localStorage.setItem('projects', JSON.stringify(state.projects))
            }else{
                console.error('such project not founded')
            }
        },
        addTask: (state, action: PayloadAction<{ projectName: string, task: taskType }>) => {
            const { projectName, task } = action.payload
            if(projectName !== constAllProjectsTasks){
                const isExist = checkTaskExisting(state.projects[projectName], task.name)
                if(!isExist){
                    state.projects[projectName].push(task)
                    state.allProjectsTasks.push(task)
                    localStorage.setItem('projects', JSON.stringify(state.projects))
                    localStorage.setItem(constAllProjectsTasks, JSON.stringify(state.allProjectsTasks))
                }else{
                    console.error('such task already exist')
                }
            }else{
                const isExist = checkTaskExisting(state.allProjectsTasks, task.name)
                if(!isExist){
                    state.allProjectsTasks.push(task)
                    localStorage.setItem(constAllProjectsTasks, JSON.stringify(state.allProjectsTasks))
                }else{
                    console.error('such task already exist')
                }
            }
        },
        deleteTask: (state, action: PayloadAction<{projectName: string, taskForDeleting: taskType}>) => {
            const { projectName, taskForDeleting } = action.payload
            const isAllProjects = projectName !== constAllProjectsTasks ? false : true
            const isExist = checkTaskExisting( isAllProjects 
                                                ? state.allProjectsTasks 
                                                : state.projects[projectName], taskForDeleting.name
                                            )
            if(isExist){
                const actualProject = isAllProjects ? state.allProjectsTasks : state.projects[projectName]
                actualProject.forEach((task, index) => {
                    if(task.id === taskForDeleting.id){
                        actualProject.splice(index, 1)
                        const indexInAllProjectTasks = state.allProjectsTasks.indexOf(task)
                        state.allProjectsTasks.splice(indexInAllProjectTasks, 1)
                    }
                })
                if(!isAllProjects){
                    localStorage.setItem('projects', JSON.stringify(state.projects))
                }else{
                    localStorage.setItem(constAllProjectsTasks, JSON.stringify(state.allProjectsTasks))
                }

            }else{
                console.error('such task not founded')
            }
        },
        editTask: (state, action: PayloadAction<{ projectName: string, task: taskType }>) => {
            const { projectName, task } = action.payload
            const changeTask = (project: taskType[], isAllProjects: boolean) => {
                project.forEach((taskItem, index, arr) => {
                    if(taskItem.id === task.id){
                        arr.splice(index, 1, task)
                    }
                })
                if(!isAllProjects){
                    localStorage.setItem('projects', JSON.stringify(state.projects))
                }else{
                    localStorage.setItem(constAllProjectsTasks, JSON.stringify(state.allProjectsTasks))
                }
            }
            if(projectName !== constAllProjectsTasks){
                changeTask(state.projects[projectName], false)
            }else{
                changeTask(state.allProjectsTasks, true)
            }
        },
    }
})




export const { addProject, deleteProject, addTask, deleteTask, editTask, projectsTasksInitialize,
               allProjectsTasksInitialize } = projectsSlice.actions

export default projectsSlice.reducer


