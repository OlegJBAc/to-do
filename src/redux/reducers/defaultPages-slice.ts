import { createSlice } from "@reduxjs/toolkit";
import { taskType } from "../../types/types";



const initialState = {
    Today: [] as taskType[]
}

const defaultPagesSlice = createSlice({
    name: 'defaultPages',
    initialState: initialState,
    reducers: {

    }
})



export const {  } = defaultPagesSlice.actions

export default defaultPagesSlice.reducer

