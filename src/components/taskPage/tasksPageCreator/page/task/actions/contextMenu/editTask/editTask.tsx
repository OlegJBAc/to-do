import React, { FC } from "react"
import s from './editTask.module.scss'
import { ReactComponent as PenIcon} from '../../../../../../../../general/svgs/penIcon.svg'
import { taskType } from "../../../../../../../../types/types"


const EditTask: FC<propsType> = ({ task, setEditMode }) => {
    return (
        <>
            <button className={s.edit} onClick={() => setEditMode(task.id)}>
                <PenIcon className={s.penIcon}/>
                <span>Edit task</span>
            </button>
        </>
    )
}

export default EditTask


interface propsType {
    task: taskType
    setEditMode: (editMode: string) => void
}