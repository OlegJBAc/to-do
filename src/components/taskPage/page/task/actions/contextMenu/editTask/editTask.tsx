import React, { FC } from "react"
import s from './editTask.module.scss'
import penIcon from '../../../../../../../general/svgs/penIcon.svg'


const EditTask: FC<propsType> = ({ setEditMode }) => {
    return (
        <>
            <button className={s.edit} onClick={() => setEditMode(true)}>
                <img src={penIcon}/>
                <span>Edit task</span>
            </button>
        </>
    )
}

export default EditTask


interface propsType {
    setEditMode: (editMode: boolean) => void
}