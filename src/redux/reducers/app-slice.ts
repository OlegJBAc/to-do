import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    appInitialized: false as boolean
}

const appSlice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppInitialized: (state, action: PayloadAction<boolean>) => {
            state.appInitialized = action.payload
        },
    }
})


export const { setAppInitialized } = appSlice.actions

export default appSlice.reducer