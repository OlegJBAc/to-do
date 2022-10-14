import React from "react"
import { taskType } from "../../../../../types/types"
import s from './bottomButtons.module.scss'


const BottomButtons: React.FC<propsType> = ({ editMode, setEditMode, setAddMode, task }) => {

    const cancelCreating = () => {
        setAddMode(false)
        if(setEditMode){
            setEditMode('')
        }
    }

    return (
        <div className={s.submit__button_wrap}>
            <button type="submit" className={s.submit__button}>
                {editMode    
                    ? <span>Edit task</span> 
                    : <span>Add task</span>
                }
            </button>
            <button className={s.submit__button} type="button" onClick={cancelCreating}>
                <span>Cancel</span>
            </button>
        </div>
    )
}

export default BottomButtons


interface propsType {
    editMode?: string
    setAddMode: (addMode: boolean) => void
    setEditMode?: (editMode: string) => void
    task: taskType
}
