import React, { FC, useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { useAppSelector } from "../../../hooks/hooks"
import { getAppTheme, getProjectsNames } from "../../../redux/selectors"
import { ProjectContextMenuBody, ProjectContextMenuStyles } from "../projectContextMenu/projectContextMenu"
import s from './myProjects.module.scss'
import { v4 } from 'uuid'
import cn from 'classnames'
import cnBind from 'classnames/bind'



const MyProjects: FC<propsType> = ({ setProjectWasDelete }) => {
    const [localContextMenu, setLocalContextMenu] = useState(false)
    const appTheme = useAppSelector(getAppTheme)
    const cx = cnBind.bind(s)

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
                <ul className={s.projects}>
                    {projectsNames.length > 0 && projectsNames.map(projectName => {
                        return (
                            <NavLink key={v4()} to={projectName}>
                          
                                <li className={cx ('projects__item', {
                                        light: appTheme === 'Light',
                                        dark: appTheme === 'Dark',
                                    })}
                                    // @ts-ignore
                                    onContextMenu={projectContextMenu(projectName)}>
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