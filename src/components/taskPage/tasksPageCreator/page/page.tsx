import React, { FC, useEffect, useState } from "react"
import { taskType } from "../../../../types/types"
import CreateTask from "../../../createTask/createTask"
import s from './page.module.scss'
import Task from "./task/task"
import { v4 } from 'uuid'
import { constAllProjectsTasks } from "../../../../general/constants/constants"


const Page: FC<propsType> = ({ getCurrentPageTasks, currentPage }) => {
    const [contextMenuActive, setContextMenuActive] = useState<null | string>(null)
    
    useEffect(() => {
        return () => {
            setContextMenuActive('')
        }
    }, [getCurrentPageTasks])

    return (
        <div className={s.page}>
            {currentPage !== constAllProjectsTasks && <CreateTask project={currentPage}/>}
            <div className={s.tasks}>
                {getCurrentPageTasks() && getCurrentPageTasks().map(task => {
                    return <Task key={v4()} task={task} currentPage={currentPage}
                                 contextMenuActive={contextMenuActive} 
                                 setContextMenuActive={setContextMenuActive}/>
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