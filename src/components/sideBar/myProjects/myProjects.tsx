import React, { FC, useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { useAppSelector } from "../../../hooks/hooks"
import { getProjectsNames } from "../../../redux/selectors"
import { ProjectContextMenuBody, ProjectContextMenuStyles } from "../projectContextMenu/projectContextMenu"
import s from './myProjects.module.scss'
import { v4 } from 'uuid'


const MyProjects: FC<propsType> = ({ setProjectWasDelete }) => {
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
    return(
        <>
            <h2>My Projects</h2>
                <ul>
                    {projectsNames.length > 0 && projectsNames.map(projectName => {
                        return (
                            <NavLink key={v4()} to={projectName}>
                                {/* @ts-ignore */}
                                <li onContextMenu={projectContextMenu(projectName)}>
                                    {localContextMenu && 
                                        <ProjectContextMenuStyles className={s.projects__delete} top={coordinates.top} left={coordinates.left}>
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
        </>
    )
}


export default MyProjects


interface propsType {
    setProjectWasDelete: (ProjectWasDelete: { wasDelete: boolean, projectName: string }) => void
}