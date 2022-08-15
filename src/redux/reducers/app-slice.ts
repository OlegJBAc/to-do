import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    appInitialized: false as boolean,
    contextMenuActive: false as boolean
}

const appSlice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppInitialized: (state, action: PayloadAction<boolean>) => {
            state.appInitialized = action.payload
        },
        setContextMenuActive: (state, action: PayloadAction<boolean>) => {
            state.contextMenuActive = action.payload
        },
    }
})


export const { setAppInitialized, setContextMenuActive } = appSlice.actions

export default appSlice.reducer