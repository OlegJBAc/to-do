import React, { FC, useEffect, useRef, useState } from "react"
import { taskType } from "../../../../types/types"
import CreateTask from "../../../createTask/createTask"
import s from './page.module.scss'
import Task from "./task/task"
import { v4 } from 'uuid'
import { constAllProjectsTasks } from "../../../../general/constants/constants"
import { useOutletContext } from "react-router-dom"


const Page: FC<propsType> = ({ getCurrentPageTasks, currentPage }) => {
    const { sideBarIsVisible } = useOutletContext<{ sideBarIsVisible: boolean }>()
    const [contextMenuActive, setContextMenuActive] = useState<null | string>(null)
    const [editMode, setEditMode] = useState<string>('')
    const pageElem: React.RefObject<HTMLDivElement> = useRef(null)

    useEffect(() => {
        return () => {
            setContextMenuActive('')
        }
    }, [getCurrentPageTasks])

    return (
        <div ref={pageElem} className={s.page} id={sideBarIsVisible ? s.sideBarVisible : s.sideBarInvisible}>
            {/* @ts-ignore */}
            {currentPage !== constAllProjectsTasks && <CreateTask project={currentPage}/>}
            <div className={s.tasks}>
                {getCurrentPageTasks() && getCurrentPageTasks().map(task => {
                    return <Task key={v4()} task={task} currentPage={currentPage}
                                 contextMenuActive={contextMenuActive} 
                                 setContextMenuActive={setContextMenuActive}
                                 editMode={editMode}
                                 setEditMode={setEditMode}
                                 pageElem={pageElem}/>
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