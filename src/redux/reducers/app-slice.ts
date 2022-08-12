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

export const appInitialization = () => {
    const receivedLocalStorage = {...localStorage}
    const localStorageKeys = Object.keys(receivedLocalStorage)
    const initializationInfo = {
      arrayNecessaryItems: ['allProjectTasks', 'today'],
      objectNecessaryItems: ['projects'],
    }
    initializationInfo.arrayNecessaryItems.forEach(item => {
      if(!localStorageKeys.includes(item)){
        localStorageKeys.push(item)
        localStorage.setItem(item, JSON.stringify([]))
      }
    })
    initializationInfo.objectNecessaryItems.forEach(item => {
      if(!localStorageKeys.includes(item)){
        localStorageKeys.push(item)
        localStorage.setItem(item, JSON.stringify({}))
      }
    })
}

export const { setAppInitialized } = appSlice.actions

export default appSlice.reducer