import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authDAL } from "../../DAL/API";

const initialState = {
    appInitialized: false as boolean,
    contextMenuActive: false as boolean,
    authData: {},
    theme: 'Light' as 'Light' | 'Dark',
    language: 'Ru' as 'Ru' | 'Eng',
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
        appThemeInitializing: (state, action: PayloadAction<'Light' | 'Dark' | null>) => {
            if(action.payload){
                state.theme = action.payload
            }
        },
        changeAppTheme: (state, action: PayloadAction<'Light' | 'Dark'>) => {
            localStorage.setItem('theme', action.payload)
            state.theme = action.payload
        },
        appLanguageInitializing: (state, action: PayloadAction<'Ru' | 'Eng' | null>) => {
            if(action.payload){
                state.language = action.payload
            }
        },
        changeAppLanguage: (state, action: PayloadAction<'Ru' | 'Eng'>) => {
            localStorage.setItem('language', action.payload)
            state.language = action.payload
        },
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


export const { setAppInitialized, setContextMenuActive, appThemeInitializing, changeAppTheme,
               appLanguageInitializing, changeAppLanguage } = appSlice.actions

export default appSlice.reducer