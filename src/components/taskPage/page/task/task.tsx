import React, { FC, useState } from "react"
import s from './task.module.scss'
import { taskType } from "../../../../types/types"
import Checkbox from "./checkbox/checkbox"
import Body from "./body/body"
import Actions from "./actions/actions"
import CreateTask from "../../../createTask/createTask"


const Task: FC<propsType> = ({ task, currentPage }) => {
    const [editMode, setEditMode] = useState(false)

    return (
        <>
            {editMode
                ? <CreateTask project={currentPage} editMode={editMode} setEditMode={setEditMode}/>
                : <li className={s.task}>
                    <Checkbox/>
                    <Body task={task}/>
                    <Actions setEditMode={setEditMode}/>
                </li>
            }   
        </>
    )
}

export default Task


interface propsType {
    task: taskType
    currentPage: string
}