import React, { FC, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import s from './sideBar.module.scss'
import AddProject from "./createProject/addProject"
import { setContextMenuActive } from "../../redux/reducers/app-slice"
import MyProjects from "./myProjects/myProjects"
import DefaultProjects from "./defaultProjects/defaultProjects"
import './sideBar.scss'
import { getAppTheme } from "../../redux/selectors"
import cn from 'classnames'
import cnBind from 'classnames/bind'


const SideBar: FC<propsType> = ({ setProjectWasDelete,  sideBarIsVisible, closeSideBar }) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const appTheme = useAppSelector(getAppTheme) 
    const [isProjectCreating, setIsProjectCreating] = useState(false)

    const startOrEndProjectCreating = (isStart: boolean, projectName?: string | null) => () => {
        dispatch(setContextMenuActive(isStart))
        setIsProjectCreating(isStart)
        if(!isStart && projectName){
            navigate(projectName)
        }
    }
    const cx = cnBind.bind(s)


    return (
        <nav className={cx('sideBar', {
                    light: appTheme === 'Light',
                    dark: appTheme === 'Dark',
                })} id={sideBarIsVisible ? s.sideBar__visible : s.sideBar__invisible}>
            <DefaultProjects/>
            <MyProjects setProjectWasDelete={setProjectWasDelete}/>
            <button id={s.create__projectBtn} onClick={startOrEndProjectCreating(true)}>Add a new project</button>
                { isProjectCreating && <AddProject startOrEndProjectCreating={startOrEndProjectCreating}/> }
        </nav>
    )
}

export default SideBar


interface propsType {
    setProjectWasDelete: (ProjectWasDelete: { wasDelete: boolean, projectName: string }) => void
    sideBarIsVisible: boolean
    closeSideBar: (e: any) => void
}