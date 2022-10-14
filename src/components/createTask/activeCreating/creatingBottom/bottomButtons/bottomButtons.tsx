import React from "react"
import s from './bottomButtons.module.scss'


const BottomButtons: React.FC<propsType> = ({ editMode, setEditMode, setAddMode }) => {

    const cancelCreating = () => {
        setAddMode(false)
        if(setEditMode){
            setEditMode(false)
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
    editMode?: boolean
    setAddMode: (addMode: boolean) => void
    setEditMode?: (editMode: boolean) => void
}
