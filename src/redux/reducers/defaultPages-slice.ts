import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { constAllProjectsTasks } from "../../general/constants/constants";
import { defaultProjectsType, taskType } from "../../types/types";
import { actionOnTask, checkTaskExisting } from "./functionsForReducers";




const initialState = {
    defaultPages: {
        today: [] as taskType[],
        completed: [] as taskType[],
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
        addTaskToDefaultPage: (state, action: PayloadAction<{ projectName: 'today' | 'completed', task: taskType }>) => {
            let { projectName, task } = action.payload
            const isExist = checkTaskExisting(state.defaultPages[projectName], task.name)
            const addTask = () => {
                state.defaultPages[projectName].push(task)
                localStorage.setItem('defaultPages', JSON.stringify(state.defaultPages))
            }
            if(!isExist){
                addTask()
            }else{
                if(projectName !== 'completed'){
                    console.error('such task already exist')
                }else{
                    addTask()
                }
            }
        },
        deleteDefaultPageTask: (state, action: PayloadAction<{projectName: string, task: taskType}>) => {
            actionOnTask(state, 'delete', action.payload)
        },
        editDefaultPageTask: (state, action: PayloadAction<{ projectName: string, task: taskType }>) => {
            actionOnTask(state, 'edit', action.payload)
        },
        setPriorityDefaultPageTask: (state, action: PayloadAction<{ projectName: string, task: taskType }>) => {
            actionOnTask(state, 'setPriority', action.payload)
        },
        checkTodayTasks: (state) => {
            const currentDate = new Date().toLocaleString().substr(3, 2)
            const allProjectsTasks: taskType[] = JSON.parse(localStorage.getItem(`${constAllProjectsTasks}`) as string)
            const defaultPages: projectType = JSON.parse(localStorage.getItem('defaultPages') as string)
            const todayTasks = [...defaultPages['today']]
                  .filter(task => task.currentProject === 'today' && task.addedAt.substr(8, 2) === currentDate)
                  
            if(allProjectsTasks.length > 0){
              allProjectsTasks.forEach(task => {
                if(task.addedAt.substr(8, 2) === currentDate){
                  todayTasks.push(task)
                }
              })
            }
            defaultPages['today'] = todayTasks
            localStorage.setItem('defaultPages', JSON.stringify(defaultPages))
            state.defaultPages.today = todayTasks
        },
          
    }
})


export const { defaultPagesInitialize, addTaskToDefaultPage, deleteDefaultPageTask, editDefaultPageTask, 
               setPriorityDefaultPageTask, checkTodayTasks } = defaultPagesSlice.actions

export default defaultPagesSlice.reducer


export type defaultPagesStateType = typeof initialState
interface projectType {
    [key: string]: taskType[]
  }