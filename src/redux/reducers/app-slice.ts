import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authDAL } from "../../DAL/API";

const initialState = {
    appInitialized: false as boolean,
    contextMenuActive: false as boolean,
    authData: {}
}

export const getAuthDataThunk = createAsyncThunk(
    'app/getAuthDataThunk',
    async function() {  
        const response = await authDAL.getAuthData()
        return response.data
    }
)

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
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAuthDataThunk.fulfilled, (state, action) => {
                state.authData = action.payload
            })
    }
})



export const { setAppInitialized, setContextMenuActive } = appSlice.actions

export default appSlice.reducer