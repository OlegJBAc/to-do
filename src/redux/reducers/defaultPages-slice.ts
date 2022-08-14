import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultProjectsType, taskType } from "../../types/types";
import { checkTaskExisting } from "./projects-slice";



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

    }
})


export const { defaultPagesInitialize, addTaskToDefaultPage } = defaultPagesSlice.actions

export default defaultPagesSlice.reducer



