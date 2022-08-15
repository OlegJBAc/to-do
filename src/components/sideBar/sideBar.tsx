import React, { FC, useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { addProject } from "../../redux/reducers/projects-slice"
import { getProjectsNames } from "../../redux/selectors"
import s from './sideBar.module.scss'
import { v4 } from 'uuid'
import { constAllProjectsTasks } from "../../general/constants/constants"
import { ProjectContextMenuBody, ProjectContextMenuStyles } from "./projectContextMenu/projectContextMenu"


const SideBar: FC<propsType> = ({ setProjectWasDelete }) => {
    const dispatch = useAppDispatch()
    const [projectName, setProjectName] = useState('')
    const [localContextMenu, setLocalContextMenu] = useState(false)
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
            <input onChange={(e: any) => setProjectName(e.currentTarget.value)} value={projectName}/>
            <button onClick={() => {
                dispatch(addProject({ projectName }))
            }}>add project</button>
        </div>
    )
}

export default SideBar


interface propsType {
    setProjectWasDelete: (ProjectWasDelete: { wasDelete: boolean, projectName: string }) => void
}