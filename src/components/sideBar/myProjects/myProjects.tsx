import React, { FC, useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks"
import { getAppTheme, getProjectsNames } from "../../../redux/selectors"
import { ContextMenuBody, ContextMenuStyles } from "../../contextMenu/contextMenu"
import s from './myProjects.module.scss'
import { v4 } from 'uuid'
import cn from 'classnames'
import cnBind from 'classnames/bind'
import { useContextMenu } from "../../../hooks/useContextMenu"
import { setContextMenuActive } from "../../../redux/reducers/app-slice"
import AddProject from "../createProject/addProject"
import { ReactComponent as OnlyPlus } from '../../../general/svgs/onlyPlus.svg'



const DeleteButton: FC<any> = ({ projectName, setProjectWasDelete}) => {
    return (
        <div>
            <button onClick={() => {
                setProjectWasDelete({ wasDelete: true, projectName: projectName })}}>
                    <span>Delete</span>
             </button>
        </div>
    )
}

const MyProjects: FC<propsType> = ({ setProjectWasDelete }) => {
    const [isProjectCreating, setIsProjectCreating] = useState(false)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const appTheme = useAppSelector(getAppTheme)
    const projectsNames = useAppSelector(getProjectsNames)
    const cx = cnBind.bind(s)
    
    const { coordinates, 
        menuParams,
        localContextMenu,
        setLocalContextMenu, 
        activateContextMenu 
    } = useContextMenu({  })
    const startOrEndProjectCreating = (isStart: boolean, projectName?: string | null) => () => {
        dispatch(setContextMenuActive(isStart))
        setIsProjectCreating(isStart)
        if(!isStart && projectName){
            navigate(projectName)
        }
    }


    useEffect(() => {
        const disableContextMenu = () => setLocalContextMenu(false)
        window.addEventListener('click', disableContextMenu)
        return () => {
            window.removeEventListener('click', disableContextMenu)
        }
    }, [])
   
    return(
        <>
            <div className={s.projects__header}>
                <h2>My Projects</h2>
                <button id={s.create__projectBtn} onClick={startOrEndProjectCreating(true)}>
                    <OnlyPlus className={s.onlyPlus}/>
                </button>
                { isProjectCreating && <AddProject startOrEndProjectCreating={startOrEndProjectCreating}/> }
            </div>
                <ul className={s.projects}>
                    {projectsNames.length > 0 && projectsNames.map(projectName => {
                        return (
                            <NavLink key={v4()} to={projectName}>
                                <li className={cx ('projects__item', {
                                        light: appTheme === 'Light',
                                        dark: appTheme === 'Dark',
                                    })}
                                    // @ts-ignore
                                    onContextMenu={(e: any) => activateContextMenu(projectName, e)}>
                                    {localContextMenu && 
                                        <ContextMenuStyles className={s.projects__delete} top={coordinates.top}
                                        //@ts-ignore   
                                        left={coordinates.left} menuParams={menuParams}>
                                            <ContextMenuBody
                                                bodyComponent={
                                                    <DeleteButton projectName={projectName}
                                                                  setProjectWasDelete={setProjectWasDelete}/>
                                                }
                                            />
                                        </ContextMenuStyles>
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