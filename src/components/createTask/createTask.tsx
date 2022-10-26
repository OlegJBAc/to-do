import React, { FC, useState } from "react"
import s from './createTask.module.scss'
import ActiveCreating from "./activeCreating/activeCreating"
import NotActiveCreating from "./notActiveCreating/notActiveCreating"
import { taskType } from "../../types/types"


const CreateTask: FC<propsType> = ({ project, editMode, setEditMode, task,  pageElem }) => {
    
    const [addMode, setAddMode] = useState<boolean>()
    return (
        <>
            {addMode
                ? <ActiveCreating project={project} setAddMode={setAddMode}  editMode={editMode} 
                                  setEditMode={setEditMode} task={task} pageElem={pageElem}/>
                : editMode
                    ? <ActiveCreating project={project} setAddMode={setAddMode}  editMode={editMode}
                                      setEditMode={setEditMode} task={task} pageElem={pageElem}/>
                    : <NotActiveCreating setAddMode={setAddMode}/>
            }
        </>
    )
}

export default CreateTask

interface propsType {
    project: string
    editMode?: string
    setEditMode?: (editMode: string) => void
    task: taskType
    pageElem: React.RefObject<HTMLDivElement>
}
