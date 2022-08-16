import React, { FC } from "react"
import { taskType } from "../../../types/types"
import CreateTask from "../../createTask/createTask"
import s from './page.module.scss'
import Task from "./task/task"
import { v4 } from 'uuid'


const Page: FC<propsType> = ({ getCurrentPageTasks, currentPage }) => {
    return (
        <div className={s.page}>
            <CreateTask project={currentPage}/>
            <div className={s.tasks}>
                {getCurrentPageTasks() && getCurrentPageTasks().map(task => {
                    return <Task key={v4()} task={task}/>
                    })
                }
            </div>
        </div>
    )
}

export default Page


interface propsType {
    getCurrentPageTasks: () => taskType[]
    currentPage: string
}