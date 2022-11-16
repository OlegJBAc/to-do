import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultProjectsType, taskType } from "../../types/types";
import { actionOnTask, checkTaskExisting } from "./functionsForReducers";




const initialState = {
    defaultPages: {
        today: [] as taskType[],
        completed: [] as taskType[],
    } as defaultProjectsType
}

const defaultPagesSlice = createSlice({
    name: 'defaultPages',
    initialState: initialState,
    reducers: {
        defaultPagesInitialize: (state, action: PayloadAction<defaultProjectsType>) => {
            const actionPayload = {}
            action.payload['today'] = action.payload['today'].filter(task => {
                return task.addedAt.substr(8, 2) === new Date().toLocaleString().substr(3, 2)
            })
            if(action.payload){
                state.defaultPages = action.payload
            }
        },
        addTaskToDefaultPage: (state, action: PayloadAction<{ projectName: 'today' | 'completed', task: taskType }>) => {
            let { projectName, task } = action.payload
            const isExist = checkTaskExisting(state.defaultPages[projectName], task.name)
            const addTask = () => {
                state.defaultPages[projectName].push(task)
                localStorage.setItem('defaultPages', JSON.stringify(state.defaultPages))
            }
            if(!isExist){
                addTask()
            }else{
                if(projectName !== 'completed'){
                    console.error('such task already exist')
                }else{
                    addTask()
                }
            }
        },
        deleteDefaultPageTask: (state, action: PayloadAction<{projectName: string, task: taskType}>) => {
            actionOnTask(state, 'delete', action.payload)
        },
        editDefaultPageTask: (state, action: PayloadAction<{ projectName: string, task: taskType }>) => {
            actionOnTask(state, 'edit', action.payload)
        },
        setPriorityDefaultPageTask: (state, action: PayloadAction<{ projectName: string, task: taskType }>) => {
            actionOnTask(state, 'setPriority', action.payload)
        },
    }
})


export const { defaultPagesInitialize, addTaskToDefaultPage, deleteDefaultPageTask, editDefaultPageTask, 
               setPriorityDefaultPageTask } = defaultPagesSlice.actions

export default defaultPagesSlice.reducer


export type defaultPagesStateType = typeof initialState


