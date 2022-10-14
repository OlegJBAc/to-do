import React, { FC, useEffect, useState } from "react"
import s from './task.module.scss'
import { taskType } from "../../../../../types/types"
import Checkbox from "./checkbox/checkbox"
import Body from "./body/body"
import Actions from "./actions/actions"
import CreateTask from "../../../../createTask/createTask"


const Task: FC<propsType> = ({ task, currentPage, contextMenuActive, setContextMenuActive,
                               editMode, setEditMode }) => {
    const [isEditing, setIsEditing] = useState(false)
    
    useEffect(() => {
        if(editMode === task.id){
            setIsEditing(true)
        }else{
            setIsEditing(false)
        }
    }, [editMode])

    return (
        <>
            {isEditing
                ? <CreateTask project={currentPage} editMode={editMode} setEditMode={setEditMode} task={task}/>
                : <li className={s.task}>
                    <Checkbox taskPriority={task.priority}/>
                    <Body task={task}/>
                    <Actions setEditMode={setEditMode} editMode={editMode} contextMenuActive={contextMenuActive} 
                             setContextMenuActive={setContextMenuActive} task={task} projectName={currentPage}
                            />
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
}
