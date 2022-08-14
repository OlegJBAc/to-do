import React from "react"
import { useLocation } from "react-router-dom"
import {  useAppSelector } from "../../hooks/hooks"
import { getAllProjectsTasks, getDefaultPages, getProjects } from "../../redux/selectors"
import s from './tasksPageCreator.module.scss'
import { v4 } from 'uuid'
import CreateTask from "../createTask/createTask"
import { taskType } from "../../types/types"
import { constAllProjectsTasks } from "../../general/constants/constants"


const TasksPageCreator = () => {
    const location = useLocation()
    const allProjectsTasks = useAppSelector(getAllProjectsTasks)
    const projects = useAppSelector(getProjects)
    const defaultPages = useAppSelector(getDefaultPages)
    const getCurrentPage = (): taskType[] => {
        const currentLocation = location.pathname.slice(1)
        const defaultPagesNames = ['today']
        if(!defaultPagesNames.includes(currentLocation) && currentLocation !== constAllProjectsTasks){
            return projects[currentLocation]
        }else{
            if(!defaultPagesNames.includes(currentLocation)){
                return allProjectsTasks
            }else{
                // @ts-ignore 
                return defaultPages[currentLocation] 
            }
        }
    }
    return (
        <div className={s.page}>
            <CreateTask project={location.pathname.slice(1)}/>
            <div className={s.tasks}>
                {getCurrentPage().map(task => {
                    return <li key={v4()}>
                        <span>{task.name}</span>
                        <span>{task.description}</span>
                    </li>
                })}
            </div>
        </div>
    )
}

export default TasksPageCreator


