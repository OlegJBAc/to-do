import React, { FC } from "react"
import { taskType } from "../../../../../../../types/types"
import s from './contextMenu.module.scss'
import DeleteTask from "./deleteTask/deleteTask"
import EditTask from "./editTask/editTask"
import SetPriority from "./setPriority/setPriority"
import cn from 'classnames'
import cnBind from 'classnames/bind'
import { changeAppTheme } from "../../../../../../../redux/reducers/app-slice"
import { getAppTheme } from "../../../../../../../redux/selectors"
import { useAppSelector } from "../../../../../../../hooks/hooks"


const ContextMenu: FC<propsType> = ({ setContextMenuActive, setEditMode, projectName, task }) => {
    const appTheme = useAppSelector(getAppTheme) 
    const cx = cnBind.bind(s)

    return (
        <div className={cx('menu', {
            light: appTheme === 'Light',
            dark: appTheme === 'Dark',
        })}>
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