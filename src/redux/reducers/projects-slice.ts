import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    AllProjectTasks: [],
    projects: {},
}

const projectsSlice = createSlice({
    name: 'projects',
    initialState: initialState,
    reducers: {

    }
})



export const {  } = projectsSlice.actions

export default projectsSlice.reducer