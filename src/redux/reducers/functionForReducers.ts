import { projectsType, taskType } from "../../types/types"

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
