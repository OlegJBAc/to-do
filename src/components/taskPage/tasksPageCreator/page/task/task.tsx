import React, { FC, useState } from "react"
import s from './task.module.scss'
import { taskType } from "../../../../../types/types"
import Checkbox from "./checkbox/checkbox"
import Body from "./body/body"
import Actions from "./actions/actions"
import CreateTask from "../../../../createTask/createTask"



const Task: FC<propsType> = ({ task, currentPage, contextMenuActive, setContextMenuActive,
                               editMode, setEditMode, pageElem }) => {
    const [isEditing, setIsEditing] = useState<boolean>(editMode === task.id ? true : false)

    return (
        <>
            {isEditing
                ? <CreateTask project={currentPage} editMode={editMode} setEditMode={setEditMode} task={task}
                              pageElem={pageElem}/>
                : <li className={s.task}>
                    <Checkbox taskPriority={task.priority}/>
                    <Body task={task}/>
                    <Actions setEditMode={setEditMode} editMode={editMode} contextMenuActive={contextMenuActive} 
                             setContextMenuActive={setContextMenuActive} task={task} projectName={currentPage}
                             pageElem={pageElem}/>
                </li>
            }   
        </>
    )
}

export default Task


interface propsType {
    task: taskType
    currentPage: string
    contextMenuActive: null | string
    setContextMenuActive: (contextMenuActive: null | string) => void
    editMode: string
    setEditMode: (editMode: string) => void
    pageElem: React.RefObject<HTMLDivElement>
}
