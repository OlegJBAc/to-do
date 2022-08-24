import { defaultPagesInitialize } from "../../redux/reducers/defaultPages-slice"
import { allProjectsTasksInitialize, projectsTasksInitialize } from "../../redux/reducers/projects-slice"
import { appDispatchType } from "../../redux/store"
import { constAllProjectsTasks } from "../constants/constants"

export const initialLocalStorage = (dispatch: appDispatchType) => {
    const receivedLocalStorage = {...localStorage}
    const localStorageKeys = Object.keys(receivedLocalStorage)
    const initializationInfo = {
      arrayNecessaryItems: [constAllProjectsTasks],
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
          localStorage.setItem(item, JSON.stringify({ today: [] }))
        }else{
          localStorage.setItem(item, JSON.stringify({}))
        }
      }
    })
    const projects: string | null = localStorage.getItem('projects')
    const defaultPages: string | null = localStorage.getItem('defaultPages')
    const allProjectsTasks: string | null = localStorage.getItem(constAllProjectsTasks)
    dispatch(projectsTasksInitialize(projects ? JSON.parse(projects) : null))
    dispatch(allProjectsTasksInitialize(allProjectsTasks ? JSON.parse(allProjectsTasks) : null))
    dispatch(defaultPagesInitialize(defaultPages ? JSON.parse(defaultPages) : null))
  }