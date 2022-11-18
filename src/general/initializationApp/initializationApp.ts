import { appLanguageInitializing, appThemeInitializing } from "../../redux/reducers/app-slice"
import { checkTodayTasks, defaultPagesInitialize } from "../../redux/reducers/defaultPages-slice"
import { allProjectsTasksInitialize, projectsTasksInitialize } from "../../redux/reducers/projects-slice"
import { appDispatchType } from "../../redux/store"
import { taskType } from "../../types/types"
import { constAllProjectsTasks } from "../constants/constants"




export const initialLocalStorageAndState = (dispatch: appDispatchType) => {
  const receivedLocalStorage = {...localStorage}
  const localStorageKeys = Object.keys(receivedLocalStorage)
  const initializationInfo = {
    arrayNecessaryItems: [ constAllProjectsTasks ],
    objectNecessaryItems: ['projects', 'defaultPages'],
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
      if(item === 'defaultPages'){
        localStorage.setItem(item, JSON.stringify({ today: [], completed: [] }))
      }else{
        localStorage.setItem(item, JSON.stringify({}))
      }
    }
  })

  dispatch(checkTodayTasks())

  if(!localStorageKeys.includes('theme')){
    localStorage.setItem('theme', 'Light')
  }else{
    dispatch(appThemeInitializing(localStorage.getItem('theme') as 'Light' | 'Dark' | null))
  }
  if(!localStorageKeys.includes('language')){
    localStorage.setItem('language', 'Ru')
  }else{
    dispatch(appLanguageInitializing(localStorage.getItem('language') as 'Ru' | 'Eng' | null))
  }

  const projects: string | null = localStorage.getItem('projects')
  const defaultPages: string | null = localStorage.getItem('defaultPages')
  const allProjectsTasks: string | null = localStorage.getItem(constAllProjectsTasks)

  dispatch(projectsTasksInitialize(projects ? JSON.parse(projects) : null))
  dispatch(allProjectsTasksInitialize(allProjectsTasks ? JSON.parse(allProjectsTasks) : null))
  dispatch(defaultPagesInitialize(defaultPages ? JSON.parse(defaultPages) : null))
}

