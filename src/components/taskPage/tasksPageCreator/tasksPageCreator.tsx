import React from "react"
import { useLocation, useOutletContext } from "react-router-dom"
import {  useAppSelector } from "../../../hooks/hooks"
import { getAllProjectsTasks, getDefaultPages, getProjects } from "../../../redux/selectors"
import s from './tasksPageCreator.module.scss'
import { constAllProjectsTasks } from "../../../general/constants/constants"
import Page from './page/page'
import { taskType } from "../../../types/types"


const TasksPageCreator = () => {
    const location = useLocation()
    const { sideBarIsVisible } = useOutletContext<{ sideBarIsVisible: boolean }>()
    const allProjectsTasks = useAppSelector(getAllProjectsTasks)
    const projects = useAppSelector(getProjects)
    const defaultPages = useAppSelector(getDefaultPages)
    
    const getCurrentPageTasks = (): taskType[] => {
        const currentPage = checkForEncodingCurrentPage()
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
    const checkForEncodingCurrentPage = () => {
        if(location.pathname.slice(1).indexOf('%') !== -1){
            return decodeURI(location.pathname.slice(1))
        }
        return location.pathname.slice(1)
    }

    return (
        <div className={s.container} id={sideBarIsVisible ? s.sideBar__visible : s.sideBar__invisible}>
            <Page getCurrentPageTasks={getCurrentPageTasks} currentPage={checkForEncodingCurrentPage()}/>
        </div>
    )
}

export default TasksPageCreator


