import React, { FC, useEffect, useRef } from "react"
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/hooks"
import { getAppTheme } from "../../../../../../redux/selectors"
import s from './checkbox.module.scss'
import './checkbox.scss'
import cn from "classnames"
import { taskType } from "../../../../../../types/types"
import { addTaskToDefaultPage, deleteDefaultPageTask } from "../../../../../../redux/reducers/defaultPages-slice"
import { constDefaultPages } from "../../../../../../general/constants/constants"
import { deleteTask } from "../../../../../../redux/reducers/projects-slice"

const Checkbox: FC<propsType> = ({ task, currentPage }) => {
    const appTheme = useAppSelector(getAppTheme) 
    const dispatch = useAppDispatch()

    return (
        <div className={s.checkbox__container} onClick={() => {
            setTimeout(() => {
                dispatch( addTaskToDefaultPage({ projectName: 'completed', task: task }) )
                if(constDefaultPages.includes(currentPage)){
                    dispatch(deleteDefaultPageTask({ projectName: currentPage, task }))
                }else{
                    dispatch(deleteTask({ projectName: currentPage, task }))
                }
            }, 500)
        }}>
            <input id={s.checkbox} type='checkbox'/>
            <label htmlFor={s.checkbox} className={cn(`checkbox__${task.priority}`, {
                light: appTheme === 'Light',
                dark: appTheme === 'Dark'
            })}/>
        </div>
    )
}

export default Checkbox


interface propsType {
    task: taskType
    currentPage: string
}