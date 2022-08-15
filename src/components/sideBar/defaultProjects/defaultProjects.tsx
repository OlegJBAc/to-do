import React from "react"
import { NavLink } from "react-router-dom"
import { constAllProjectsTasks } from "../../../general/constants/constants"
import s from './defaultProjects.module.scss'


const DefaultProjects = () => {
    return(
        <>
            <ul>
                <NavLink to={constAllProjectsTasks}>
                    <li>{constAllProjectsTasks}</li>
                </NavLink>
                <NavLink to='today'>
                    <li>today</li>
                </NavLink>
            </ul>
        </>
    )
}


export default DefaultProjects