import React, { FC } from "react"
import s from './task.module.scss'
import { taskType } from "../../../../types/types"
import Checkbox from "./checkbox/checkbox"
import Body from "./body/body"
import Actions from "./actions/actions"


const Task: FC<propsType> = ({ task }) => {
    return (
        <li className={s.task}>
            <Checkbox/>
            <Body task={task}/>
            <Actions/>
        </li>
    )
}

export default Task


interface propsType {
    task: taskType
}