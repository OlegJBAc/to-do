import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authDAL } from "../../DAL/API";

const initialState = {
    authData: {}
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAuthDataThunk.fulfilled, (state, action) => {
                state.authData = action.payload
            })
    }
})

export const getAuthDataThunk = createAsyncThunk(
    'auth/getAuthDataThunk',
    async () => {  
        const response = await authDAL.getAuthData()
        return response.data
    }
)

export const logInThunk = createAsyncThunk(
    'auth/logInThunk',
    async (authData: {email: string, password: string, rememberMe: boolean, captcha: string}) => {  
        const response = await authDAL.logIn(authData)
        return response.data
    }
)

export const logOutThunk = createAsyncThunk(
    'auth/logOutThunk',
    async () => {  
        const response = await authDAL.logOut()
        return response.data
    }
)


export const {  } = authSlice.actions

export default authSlice.reducer