import React, { FC } from "react"
import { useAppSelector } from "../../hooks/hooks"
import s from './sideBar.module.scss'
import MyProjects from "./myProjects/myProjects"
import DefaultProjects from "./defaultProjects/defaultProjects"
import './sideBar.scss'
import { getAppTheme } from "../../redux/selectors"
import cnBind from 'classnames/bind'


const SideBar: FC<propsType> = ({ setProjectWasDelete,  sideBarIsVisible, closeSideBar }) => {
    const appTheme = useAppSelector(getAppTheme) 
    const cx = cnBind.bind(s)

    return (
        <nav className={cx('sideBar', {
                    light: appTheme === 'Light',
                    dark: appTheme === 'Dark',
                })} id={sideBarIsVisible ? s.sideBar__visible : s.sideBar__invisible}>
            <DefaultProjects/>
            <MyProjects setProjectWasDelete={setProjectWasDelete}/>
        </nav>
    )
}

export default SideBar


interface propsType {
    setProjectWasDelete: (ProjectWasDelete: { wasDelete: boolean, projectName: string }) => void
    sideBarIsVisible: boolean
    closeSideBar: (e: any) => void
}