import React, { FC } from "react"
import { taskType } from "../../../../../types/types"
import s from './body.module.scss'


const Body: FC<propsType> = ({ task }) => {
    return (
    <div className={s.body}>
        <span className={s.body__name}>{task.name}</span>
        <span className={s.body__description}>{task.description}</span>
    </div>
    )
}

export default Body


interface propsType {
    task: taskType
}