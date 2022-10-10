import React, { FC, useEffect, useState } from "react"
import s from './actions.module.scss'
import { ReactComponent as PenIcon } from '../../../../../../general/svgs/penIcon.svg'
import { ReactComponent as ThreeDots } from '../../../../../../general/svgs/threeDots.svg'
import ContextMenu from "./contextMenu/contextMenu"
import { taskType } from "../../../../../../types/types"
import { useContextMenu } from "../../../../../../hooks/useContextMenu"
import { ContextMenuBody, ContextMenuStyles } from "../../../../../contextMenu/contextMenu"
import { useOutletContext } from "react-router-dom"


const Actions: FC<propsType> = ({ setEditMode, contextMenuActive, setContextMenuActive, projectName, task }) => {
    const { sideBarIsVisible } = useOutletContext<{ sideBarIsVisible: boolean }>()
    const { coordinates, 
        menuParams,
        localContextMenu,
        setLocalContextMenu, 
        activateContextMenu 
    } = useContextMenu({ sideBarIsVisible })

    const toggleContextMenu = (e: any) => {
        {/* @ts-ignore */}
        activateContextMenu(null, e)
    }

    useEffect(() => {
        if(localContextMenu){
            const checkClick = (e: any) => {
                let contextMenuElem = document.querySelector('.context__menu')
                const clickPathFirst = e.composedPath().includes(contextMenuElem)
                if( !clickPathFirst && localContextMenu ){
                    window.removeEventListener('click', checkClick)
                    setLocalContextMenu(false)
                } 
            }
            setTimeout(() => {
                window.addEventListener('click', checkClick)
            }, 0)
        }
    }, [localContextMenu])

    return (
        <div className={s.actions}>
            <PenIcon onClick={() => setEditMode(true)}/>
            <ThreeDots onClick={toggleContextMenu}/>
            { localContextMenu && <ContextMenuStyles className={s.projects__delete} top={coordinates.top}
            //@ts-ignore   
                                        left={coordinates.left} menuParams={menuParams}>
                                        <ContextMenuBody bodyComponent={
                                            <ContextMenu setContextMenuActive={setContextMenuActive}
                                                setEditMode={setEditMode}
                                                projectName={projectName}
                                                task={task}/>}/>
                                        </ContextMenuStyles>
            }
        </div>
    )
}

export default Actions


interface propsType {
    setEditMode: (editMode: boolean) => void
    contextMenuActive: null | string
    setContextMenuActive: (contextMenuActive: null | string) => void
    projectName: string
    task: taskType
}
