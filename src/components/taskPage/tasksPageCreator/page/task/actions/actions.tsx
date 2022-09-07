import React, { FC, useState } from "react"
import s from './actions.module.scss'
import { ReactComponent as PenIcon } from '../../../../../../general/svgs/penIcon.svg'
import { ReactComponent as ThreeDots } from '../../../../../../general/svgs/threeDots.svg'
import ContextMenu from "./contextMenu/contextMenu"
import { taskType } from "../../../../../../types/types"


const Actions: FC<propsType> = ({ setEditMode, contextMenuActive, setContextMenuActive, projectName, task }) => {
    const activateContextMenu = () => {
        {/* @ts-ignore */}
        setContextMenuActive((contextMenuActive: null | string) => {
            if(contextMenuActive !== task.id){
                return contextMenuActive = task.id
            }else{
                return contextMenuActive = null
            }
        })
    }
    return (
        <div className={s.actions}>
            <PenIcon onClick={() => setEditMode(true)}/>
            <ThreeDots onClick={activateContextMenu}/>
            {contextMenuActive === task.id && <ContextMenu setContextMenuActive={setContextMenuActive}
                                                            setEditMode={setEditMode}
                                                            projectName={projectName}
                                                            task={task}/>}
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
