import React, { FC } from "react"
import s from './editTask.module.scss'
import { ReactComponent as PenIcon} from '../../../../../../../../general/svgs/penIcon.svg'


const EditTask: FC<propsType> = ({ setEditMode }) => {
    return (
        <>
            <button className={s.edit} onClick={() => setEditMode(true)}>
                <PenIcon className={s.penIcon}/>
                <span>Edit task</span>
            </button>
        </>
    )
}

export default EditTask


interface propsType {
    setEditMode: (editMode: boolean) => void
}