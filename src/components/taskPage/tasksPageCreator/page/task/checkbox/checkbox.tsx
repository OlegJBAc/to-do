import React, { FC } from "react"
import { useAppSelector } from "../../../../../../hooks/hooks"
import { getAppTheme } from "../../../../../../redux/selectors"
import s from './checkbox.module.scss'
import './checkbox.scss'
import cn from "classnames"

const Checkbox: FC<propsType> = ({ taskPriority }) => {
    const appTheme = useAppSelector(getAppTheme) 

    return (
        <div className={s.checkbox__container}>
            <input id={s.checkbox} type='checkbox'/>
            <label htmlFor={s.checkbox} className={cn(`checkbox__${taskPriority}`, {
                light: appTheme === 'Light',
                dark: appTheme === 'Dark'
            })}/>
        </div>
    )
}

export default Checkbox


interface propsType {
    taskPriority: string
}