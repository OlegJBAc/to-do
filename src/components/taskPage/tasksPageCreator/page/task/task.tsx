import React, { FC, useState } from "react"
import s from './task.module.scss'
import { taskType } from "../../../../../types/types"
import Checkbox from "./checkbox/checkbox"
import Body from "./body/body"
import Actions from "./actions/actions"
import CreateTask from "../../../../createTask/createTask"
import cnBind from 'classnames/bind'


const Task: FC<propsType> = ({ task, currentPage, contextMenuActive, setContextMenuActive,
                               editMode, setEditMode, pageElem }) => {
    const [isEditing, setIsEditing] = useState<boolean>(editMode === task.id ? true : false)
    const cx = cnBind.bind(s)

    return (
        <>
            {currentPage !== 'completed'
                ? isEditing
                    ? <CreateTask project={currentPage} editMode={editMode} setEditMode={setEditMode} task={task}
                                  pageElem={pageElem}/>
                    : <li className={s.task}>
                        <Checkbox task={task} currentPage={currentPage}/>
                        <Body task={task} isCompleted={false} currentPage={currentPage}/>
                        <Actions setEditMode={setEditMode} editMode={editMode} contextMenuActive={contextMenuActive} 
                                 setContextMenuActive={setContextMenuActive} task={task} projectName={currentPage}
                                 pageElem={pageElem}/>
                    </li>   
                
                : <li className={cx('task', {
                        completed: true,
                        red: task.priority === 'red',
                        orange: task.priority === 'orange',
                        purple: task.priority === 'purple',
                        none: task.priority === 'none',
                    })}>
                    <Body task={task} isCompleted={true}  currentPage={currentPage}/>
                    
                </li>   
            }

        </>
    )
}

export default Task


interface propsType {
    task: taskType
    currentPage: string
    contextMenuActive: null | string
    setContextMenuActive: (contextMenuActive: null | string) => void
    editMode: string
    setEditMode: (editMode: string) => void
    pageElem: React.RefObject<HTMLDivElement>
}
