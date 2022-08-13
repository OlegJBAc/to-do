import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { defaultProjectsType, taskType } from "../../types/types";



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
        }
    }
})



export const { defaultPagesInitialize } = defaultPagesSlice.actions

export default defaultPagesSlice.reducer



