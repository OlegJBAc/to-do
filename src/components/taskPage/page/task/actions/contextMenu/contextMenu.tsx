import React, { FC } from "react"
import { taskType } from "../../../../../../types/types"
import s from './contextMenu.module.scss'
import DeleteTask from "./deleteTask/deleteTask"
import EditTask from "./editTask/editTask"
import SetPriority from "./setPriority/setPriority"


const ContextMenu: FC<propsType> = ({ setContextMenuActive, setEditMode, projectName, task }) => {

    return (
        <div className={s.menu}>
            <EditTask setEditMode={setEditMode}/>
            <div className={s.border__bottom}></div>
            <SetPriority projectName={projectName} task={task}/>
            <div className={s.border__bottom}></div>
            <DeleteTask projectName={projectName} task={task}/>
        </div>
    )
}

export default ContextMenu


interface propsType {
    setContextMenuActive: (contextMenuActive: null | string) => void
    setEditMode: (editMode: boolean) => void
    projectName: string
    task: taskType
}