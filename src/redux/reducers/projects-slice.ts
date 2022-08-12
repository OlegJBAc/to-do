import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { taskType } from "../../types/types";
import { rootStateType } from "../store";


const initialState = {
    AllProjectTasks: [] as taskType[],
    projects: {} as projectsType,
}

const projectsSlice = createSlice({
    name: 'projects',
    initialState: initialState,
    reducers: {
        addProject: (state, action: PayloadAction<{name: string}>) => {
            const { name } = action.payload
            const isExist = checkProjectExisting(state.projects, name)
            if(!isExist){
                state.projects[name] = []
                localStorage.setItem('projects', JSON.stringify(state.projects))
            }else{
                console.error('project already exist')
            }
        },
        deleteProject: (state, action: PayloadAction<{name: string}>) => {
            const { name } = action.payload
            const isExist = checkProjectExisting(state.projects, name)
            if(isExist){
                delete state.projects[name]
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
                localStorage.setItem('project', JSON.stringify(state.projects))
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
    project.forEach(task => {
        if(task.name === taskName){
            isExist = true
        }
    })
    return isExist
}

export const {  } = projectsSlice.actions

export default projectsSlice.reducer


interface projectsType {
    [key: string]: taskType[]
}