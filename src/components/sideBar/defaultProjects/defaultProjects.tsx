import React from "react"
import { NavLink } from "react-router-dom"
import { constAllProjectsTasks } from "../../../general/constants/constants"
import s from './defaultProjects.module.scss'
import cnBind from 'classnames/bind'
import { ReactComponent as AllTasksIcon } from '../../../general/svgs/allTasksIcon.svg'
import { ReactComponent as TodayIcon } from '../../../general/svgs/todayIcon.svg'
import { ReactComponent as CompletedIcon } from '../../../general/svgs/completedIcon.svg'
import { useAppSelector } from "../../../hooks/hooks"
import { getAppLanguage, getAppTheme } from "../../../redux/selectors"
import { engText } from "../../../general/textData/eng"
import { ruText } from "../../../general/textData/ru"


const DefaultProjects = () => {
    const appTheme = useAppSelector(getAppTheme)
    const appLanguage = useAppSelector(getAppLanguage)
    
    const cx = cnBind.bind(s)

    return(
        <>
            <ul className={cx('defaultProjects', {
                light: appTheme === 'Light',
                dark: appTheme === 'Dark',
            })}>
                <NavLink to={constAllProjectsTasks}>
                    <li>
                        <AllTasksIcon/>
                        <span>
                            { appLanguage === 'Eng' ? engText.sideBar.defaultProjectsItems.allProjectsTasks 
                                                    : ruText.sideBar.defaultProjectsItems.allProjectsTasks }
                        </span>
                    </li>
                </NavLink>
                <NavLink to='today'>
                    <li>
                        <TodayIcon/>
                        <span>
                            { appLanguage === 'Eng' ? engText.sideBar.defaultProjectsItems.today 
                                                    : ruText.sideBar.defaultProjectsItems.today }
                        </span>
                    </li>
                </NavLink>
                <NavLink to='completed'>
                    <li>
                        <CompletedIcon/>
                        <span>
                            { appLanguage === 'Eng' ? engText.sideBar.defaultProjectsItems.completed 
                                                    : ruText.sideBar.defaultProjectsItems.completed }
                        </span>
                    </li>
                </NavLink>
            </ul>
        </>
    )
}


export default DefaultProjects