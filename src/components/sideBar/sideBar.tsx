import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { addProject } from "../../redux/reducers/projects-slice"
import { getAllProjectsTasks, getProjectsNames } from "../../redux/selectors"
import s from './sideBar.module.scss'
import { v4 } from 'uuid'
import { constAllProjectsTasks } from "../../general/constants/constants"


const SideBar = () => {
    const [projectName, setProjectName] = useState('')
    const dispatch = useAppDispatch()
    const projectsNames = useAppSelector(getProjectsNames)
    return (
        <div className={s.sideBar}>
            <ul>
                <NavLink to={constAllProjectsTasks}>
                    <li>{constAllProjectsTasks}</li>
                </NavLink>
                <NavLink to='today'>
                    <li>today</li>
                </NavLink>
            </ul>
            <h2>My Projects</h2>
            <ul>
                {projectsNames.length > 0 && projectsNames.map(projectName => {
                    return (
                        <NavLink key={v4()} to={projectName}>
                            <li>{projectName}</li>
                        </NavLink>
                    )
                })}
            </ul>
            <input onChange={(e: any) => setProjectName(e.currentTarget.value)} value={projectName}/>
            <button onClick={() => {
                dispatch(addProject({ projectName }))
            }}>add project</button>
        </div>
    )
}

export default SideBar