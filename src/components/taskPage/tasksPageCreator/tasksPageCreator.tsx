import React from "react"
import { useLocation } from "react-router-dom"
import {  useAppSelector } from "../../../hooks/hooks"
import { getAllProjectsTasks, getDefaultPages, getProjects } from "../../../redux/selectors"
import s from './tasksPageCreator.module.scss'
import { constAllProjectsTasks } from "../../../general/constants/constants"
import Page from "../page/page"
import { taskType } from "../../../types/types"


const TasksPageCreator = () => {
    const location = useLocation()
    
    const allProjectsTasks = useAppSelector(getAllProjectsTasks)
    const projects = useAppSelector(getProjects)
    const defaultPages = useAppSelector(getDefaultPages)

    const getCurrentPageTasks = (): taskType[] => {
        const currentPage = location.pathname.slice(1)
        const defaultPagesNames = ['today']
        if(!defaultPagesNames.includes(currentPage) && currentPage !== constAllProjectsTasks){
            return projects[currentPage]
        }else{
            if(!defaultPagesNames.includes(currentPage)){
                return allProjectsTasks
            }else{
                // @ts-ignore 
                return defaultPages[currentPage] 
            }
        }
    }
    
    return (
        <div className={s.container}>
            <Page getCurrentPageTasks={getCurrentPageTasks} currentPage={location.pathname.slice(1)}/>
        </div>
    )
}

export default TasksPageCreator


