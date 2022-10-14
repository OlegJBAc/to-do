import React, { FC, useState } from "react"
import s from './createTask.module.scss'
import ActiveCreating from "./activeCreating/activeCreating"
import NotActiveCreating from "./notActiveCreating/notActiveCreating"
import { taskType } from "../../types/types"


const CreateTask: FC<propsType> = ({ project, editMode, setEditMode, task }) => {
    console.log(project, editMode, setEditMode, task)
    
    const [addMode, setAddMode] = useState(false)

    return (
        <>
            {addMode
                ? <ActiveCreating project={project} setAddMode={setAddMode}  editMode={editMode} 
                                  setEditMode={setEditMode} task={task}/>
                : editMode
                    ? <ActiveCreating project={project} setAddMode={setAddMode}  editMode={editMode}
                                      setEditMode={setEditMode} task={task}/>
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
}
