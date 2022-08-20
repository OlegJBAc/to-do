import React, { FC } from "react"
import s from './checkbox.module.scss'
import './checkbox.scss'

const Checkbox: FC<propsType> = ({ taskPriority }) => {

    return (
        <div className={s.checkbox__container}>
            <input id={s.checkbox} type='checkbox'/>
            <label htmlFor={s.checkbox} id={`checkbox__${taskPriority}`}/>
        </div>
    )
}

export default Checkbox


interface propsType {
    taskPriority: string
}