import React, { FC } from "react"
import { taskType } from "../../../../../../types/types"
import s from './body.module.scss'
import  { ReactComponent as DeleteIcon} from '../../../../../../general/svgs/deleteIcon.svg'
import { useAppDispatch } from "../../../../../../hooks/hooks"
import { constDefaultPages } from "../../../../../../general/constants/constants"
import { deleteDefaultPageTask } from "../../../../../../redux/reducers/defaultPages-slice"
import { deleteTask } from "../../../../../../redux/reducers/projects-slice"
import cnBind from 'classnames/bind'


const Body: FC<propsType> = ({ task, isCompleted, currentPage }) => {
    const dispatch = useAppDispatch()
    const cx = cnBind.bind(s)

    const deleteTaskFunc = () => {
        if(constDefaultPages.includes(currentPage)){
            dispatch(deleteDefaultPageTask({ projectName: currentPage, task }))
        }else{
            dispatch(deleteTask({ projectName: currentPage, task }))
        }
    }
    const getFormattedDate = (date: string) => {
        return { date: date.substr(0, 10), time: date.substr(12, 7)}    
    }
    getFormattedDate(task.addedAt)
    return (
        <div className={cx('body', {
            completed: isCompleted,
        })}>
            <div className={s.body__content}>
                <span className={s.body__name}>{task.name}</span>
                <span className={s.body__description}>{task.description}</span>
                { isCompleted && 
                    <div className={s.body__time}>
                        <span className={s.body__time_added}>Added at</span>
                        <span className={s.body__time_date}>{ getFormattedDate(task.addedAt).date }</span>
                        <span className={s.body__time_time}>{ getFormattedDate(task.addedAt).time }</span>
                    </div>
                }
            </div>
            {isCompleted && 
                <DeleteIcon className={s.deleteIcon} onClick={deleteTaskFunc}/>
            }
        </div>
    )
}

export default Body


interface propsType {
    task: taskType
    isCompleted: boolean
    currentPage: string
}