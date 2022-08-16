import React, { FC, useState } from "react"
import s from './createTask.module.scss'
import ActiveCreating from "./activeCreating/activeCreating"
import NotActiveCreating from "./notActiveCreating/notActiveCreating"


const CreateTask: FC<propsType> = ({ project, editMode, setEditMode }) => {
    const [addMode, setAddMode] = useState(false)
    return (
        <>
            {addMode
                ? <ActiveCreating project={project} setAddMode={setAddMode} setEditMode={setEditMode}/>
                : editMode
                    ? <ActiveCreating  project={project} setAddMode={setAddMode} setEditMode={setEditMode}/>
                    : <NotActiveCreating setAddMode={setAddMode}/>
            }
        </>
    )
}

export default CreateTask

interface propsType {
    project: string
    editMode?: boolean
    setEditMode?: (editMode: boolean) => void
}
