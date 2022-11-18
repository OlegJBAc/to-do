import { constAllProjectsTasks, constDefaultPages } from "../../general/constants/constants"
import { projectsType, taskType } from "../../types/types"
import { defaultPagesStateType } from "./defaultPages-slice"
import { projectsStateType } from "./projects-slice"

export const checkTaskExisting = (project: taskType[], taskName: string) => {
    let isExist = false
    if(project.length !== 0){
        project.forEach(task => {
            if(task.name === taskName){
                isExist = true
            }
        })
    }
    return isExist
}

export const checkProjectExisting = (projects: projectsType, projectName: string) => {
    const projectsKeys = Object.keys(projects)
    return projectsKeys.includes(projectName) ? true : false
}

export const actionOnTask = (state: projectsStateType | defaultPagesStateType, 
                             whatAction: actionOnTaskType, payload: payloadActionOnTask) => {
    const { projectName, task } = payload
    const isDefaultPage = constDefaultPages.includes(projectName)
    const isAllProjectsTasks = projectName === constAllProjectsTasks ? true : false
    let checkedState
    const action = (project: taskType[]) => {
        project.forEach((taskItem, index, arr) => {
            if(taskItem.id === task.id){
                if(whatAction === 'delete'){
                    arr.splice(index, 1)
                }else{
                    arr.splice(index, 1, task)
                }
            }
        })
    }
    if(isDefaultPage){
        checkedState = state as defaultPagesStateType
        // @ts-ignore
        action(checkedState.defaultPages[projectName])
        // @ts-ignore
        localStorage.setItem(projectName, JSON.stringify(checkedState.defaultPages[projectName]))
    }else{
        checkedState = state as projectsStateType
        if(!isAllProjectsTasks){
            action(checkedState.projects[projectName])
        }else{
            const currentProjectOfTask = task.currentProject
            action(checkedState.projects[currentProjectOfTask])
        }
        action(checkedState.allProjectsTasks)
        localStorage.setItem('projects', JSON.stringify(checkedState.projects))
        localStorage.setItem(constAllProjectsTasks, JSON.stringify(checkedState.allProjectsTasks))
    }
}

type actionOnTaskType = 'delete' | 'edit' | 'setPriority'
interface payloadActionOnTask {
    projectName: string
    task: taskType
}