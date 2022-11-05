import React from "react"
import { taskType } from "../../../../types/types"
import BottomButtons from "./bottomButtons/bottomButtons"
import BottomOptions from "./bottomOptions/bottomOptions"
import s from './creatingBottom.module.scss'


const CreatingBottom: React.FC<propsType> = ({  setPriorityForCreating, editMode, task, project, setAddMode,
                                                setEditMode, pageElem }) => {
    return (
        <div className={s.create__bottom}>
            {editMode && <BottomOptions setPriorityForCreating={setPriorityForCreating}
                           task={task}
                           project={project}
                           pageElem={pageElem}
                           />
            }
            <BottomButtons editMode={editMode} setAddMode={setAddMode} setEditMode={setEditMode} task={task}/>
        </div>
    )
}

export default CreatingBottom


interface propsType {
    setPriorityForCreating: (priorityForCreating: string) => void
    editMode?: string
    task: taskType
    project: string
    setAddMode: (addMode: boolean) => void
    setEditMode?: (editMode: string) => void
    pageElem: React.RefObject<HTMLDivElement>
}
