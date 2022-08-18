import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultProjectsType, taskType } from "../../types/types";
import { actionOnTask, checkTaskExisting } from "./functionForReducers";




const initialState = {
    defaultPages: {
        today: [] as taskType[]
    } as defaultProjectsType
}

const defaultPagesSlice = createSlice({
    name: 'defaultPages',
    initialState: initialState,
    reducers: {
        defaultPagesInitialize: (state, action: PayloadAction<defaultProjectsType>) => {
            if(action.payload){
                state.defaultPages = action.payload
            }
        },
        addTaskToDefaultPage: (state, action: PayloadAction<{ projectName: 'today', task: taskType }>) => {
            const { projectName, task } = action.payload
            const isExist = checkTaskExisting(state.defaultPages[projectName], task.name)
            if(!isExist){
                state.defaultPages[projectName].push(task)
                localStorage.setItem('defaultPages', JSON.stringify(state.defaultPages))
            }else{
                console.error('such task already exist')
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


