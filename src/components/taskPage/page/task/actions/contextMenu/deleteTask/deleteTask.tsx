import React, { FC } from "react"
import s from './deleteTask.module.scss'
import deleteIcon from '../../../../../../../general/svgs/deleteIcon.svg'
import { useAppDispatch } from "../../../../../../../hooks/hooks"
import { deleteTask } from "../../../../../../../redux/reducers/projects-slice"
import { taskType } from "../../../../../../../types/types"


const DeleteTask: FC<propsType> = ({ projectName, task }) => {
    const dispatch = useAppDispatch()
    const deleteFunc = () => {
        dispatch(deleteTask({ projectName, task }))
    }
    return (
        <>
            <button className={s.delete} onClick={deleteFunc}>            
                <img src={deleteIcon}/>
                <span>Delete Task</span>
            </button>
        </>
    )
}

export default DeleteTask


interface propsType {
    projectName: string
    task: taskType
}