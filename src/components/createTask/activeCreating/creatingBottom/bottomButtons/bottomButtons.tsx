import React from "react"
import { engText } from "../../../../../general/textData/eng"
import { ruText } from "../../../../../general/textData/ru"
import { useAppSelector } from "../../../../../hooks/hooks"
import { getAppLanguage } from "../../../../../redux/selectors"
import { taskType } from "../../../../../types/types"
import s from './bottomButtons.module.scss'


const BottomButtons: React.FC<propsType> = ({ editMode, setEditMode, setAddMode, task }) => {
    const appLanguage = useAppSelector(getAppLanguage)

    const cancelCreating = () => {
        setAddMode(false)
        if(setEditMode){
            setEditMode('')
        }
    }

    return (
        <div className={s.submit__button_wrap}>
            <button type="submit" className={s.submit__button} >
                {editMode    
                    ? <span>{ appLanguage === 'Eng' ? engText.page.editTaskBtn : ruText.page.editTaskBtn }</span>
                    : <span>{ appLanguage === 'Eng' ? engText.page.addTaskBtn : ruText.page.addTaskBtn }</span>
                }
            </button>
            <button className={s.submit__button} type="button" onClick={cancelCreating}>
                <span>{ appLanguage === 'Eng' ? engText.page.cancelBtn : ruText.page.cancelBtn }</span>
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
