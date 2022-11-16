import React from "react"
import { NavLink } from "react-router-dom"
import { constAllProjectsTasks } from "../../../general/constants/constants"
import s from './defaultProjects.module.scss'
import cnBind from 'classnames/bind'
import { ReactComponent as AllTasksIcon } from '../../../general/svgs/allTasksIcon.svg'
import { ReactComponent as TodayIcon } from '../../../general/svgs/todayIcon.svg'
import { ReactComponent as CompletedIcon } from '../../../general/svgs/completedIcon.svg'
import { useAppSelector } from "../../../hooks/hooks"
import { getAppTheme } from "../../../redux/selectors"


const DefaultProjects = () => {
    const appTheme = useAppSelector(getAppTheme) 
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
                        <span>{constAllProjectsTasks}</span>
                    </li>
                </NavLink>
                <NavLink to='today'>
                    <li>
                        <TodayIcon/>
                        <span>today</span>
                    </li>
                </NavLink>
                <NavLink to='completed'>
                    <li>
                        <CompletedIcon/>
                        <span>completed</span>
                    </li>
                </NavLink>
            </ul>
        </>
    )
}


export default DefaultProjects