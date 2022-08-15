import React, { FC, useEffect, useState } from "react"
import { Navigate, NavLink, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { getProjectsNames } from "../../redux/selectors"
import s from './sideBar.module.scss'
import { v4 } from 'uuid'
import { constAllProjectsTasks } from "../../general/constants/constants"
import { ProjectContextMenuBody, ProjectContextMenuStyles } from "./projectContextMenu/projectContextMenu"
import AddProject from "./createProject/addProject"
import { setContextMenuActive } from "../../redux/reducers/app-slice"
import { addProject } from "../../redux/reducers/projects-slice"


const SideBar: FC<propsType> = ({ setProjectWasDelete }) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [localContextMenu, setLocalContextMenu] = useState(false)
    const [isProjectCreating, setIsProjectCreating] = useState(false)
    const [coordinates, setCoordinates] = useState({
        project: '',
        top: 0,
        left: 0,
    })
    
    const projectsNames = useAppSelector(getProjectsNames)
    useEffect(() => {
        const disableContextMenu = () => setLocalContextMenu(false)
        window.addEventListener('click', disableContextMenu)
        return () => {
            window.removeEventListener('click', disableContextMenu)
        }
    }, [])

    const projectContextMenu = (projectName: string) => (e: MouseEvent) => {
        e.preventDefault()
        setLocalContextMenu(true)
        setCoordinates({
            project: projectName,
            top: e.pageY,
            left: e.pageX
        })
    }

    const startOrEndProjectCreating = (isStart: boolean, projectName?: string | null) => () => {
        dispatch(setContextMenuActive(isStart))
        setIsProjectCreating(isStart)
        if(!isStart && projectName){
            navigate(projectName)
        }
    }

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
                            {/* @ts-ignore */}
                            <li onContextMenu={projectContextMenu(projectName)}>
                                {localContextMenu && 
                                    <ProjectContextMenuStyles top={coordinates.top} left={coordinates.left}>
                                        <ProjectContextMenuBody projectName={coordinates.project}
                                                                setProjectWasDelete={setProjectWasDelete}/>
                                    </ProjectContextMenuStyles>
                                }
                                <span>{projectName}</span>
                            </li>
                        </NavLink>
                    )
                })}
            </ul>
            <button id={s.create__projectBtn} onClick={startOrEndProjectCreating(true)}>Add a new project</button>
                { isProjectCreating && <AddProject startOrEndProjectCreating={startOrEndProjectCreating}/> }
        </div>
    )
}

export default SideBar


interface propsType {
    setProjectWasDelete: (ProjectWasDelete: { wasDelete: boolean, projectName: string }) => void
}