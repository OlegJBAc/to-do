import React, { FC, useEffect, useState } from "react"
import { taskType } from "../../../../types/types"
import CreateTask from "../../../createTask/createTask"
import s from './page.module.scss'
import Task from "./task/task"
import { v4 } from 'uuid'
import { constAllProjectsTasks } from "../../../../general/constants/constants"
import { useOutletContext } from "react-router-dom"
import cn from 'classnames'
import cnBind from 'classnames/bind'


const Page: FC<propsType> = ({ getCurrentPageTasks, currentPage }) => {
    const { sideBarIsVisible } = useOutletContext<{ sideBarIsVisible: boolean }>()
    const [contextMenuActive, setContextMenuActive] = useState<null | string>(null)
    const [editMode, setEditMode] = useState<string>('')

    const cx = cnBind.bind(s)

    useEffect(() => {
        return () => {
            setContextMenuActive('')
        }
    }, [getCurrentPageTasks])

    return (
        <div className={cx('page', {
            sideBarVisible: sideBarIsVisible,
            sideBarInvisible: !sideBarIsVisible,
        })}>
            {/* @ts-ignore */}
            {currentPage !== constAllProjectsTasks && <CreateTask project={currentPage}/>}
            <div className={s.tasks}>
                {getCurrentPageTasks() && getCurrentPageTasks().map(task => {
                    return <Task key={v4()} task={task} currentPage={currentPage}
                                 contextMenuActive={contextMenuActive} 
                                 setContextMenuActive={setContextMenuActive}
                                 editMode={editMode}
                                 setEditMode={setEditMode}/>
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