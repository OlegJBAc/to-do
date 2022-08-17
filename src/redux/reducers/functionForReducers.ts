import { constAllProjectsTasks } from "../../general/constants/constants"
import { projectsType, taskType } from "../../types/types"
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
export const actionOnTask = (state: projectsStateType, whatAction: actionOnTaskType, payload: payloadActionOnTask) => {
    const { projectName, task } = payload
    const projectForAction = projectName === constAllProjectsTasks 
                                            ? state.projects[task.currentProject] 
                                            : state.projects[projectName]
    projectForAction.forEach((taskItem, index, arr) => {
        if(taskItem.id === task.id){
            if(whatAction === 'delete'){
                arr.splice(index, 1)
            }else{
                arr.splice(index, 1, task)
            }
        }
    })
    state.allProjectsTasks.forEach((taskItem, index, arr) => {
        if(taskItem.id === task.id){
            if(whatAction === 'delete'){
                arr.splice(index, 1)
            }else{
                arr.splice(index, 1, task)
            }
        }
    })
    localStorage.setItem('projects', JSON.stringify(state.projects))
    localStorage.setItem(constAllProjectsTasks, JSON.stringify(state.allProjectsTasks))
}

type actionOnTaskType = 'delete' | 'edit' | 'setPriority'
interface payloadActionOnTask {
    projectName: string
    task: taskType
}