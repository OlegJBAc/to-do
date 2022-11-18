import React, { FC } from "react"
import s from './editTask.module.scss'
import { ReactComponent as PenIcon} from '../../../../../../../../general/svgs/penIcon.svg'
import { taskType } from "../../../../../../../../types/types"
import { useAppSelector } from "../../../../../../../../hooks/hooks"
import { getAppLanguage } from "../../../../../../../../redux/selectors"
import { engText } from "../../../../../../../../general/textData/eng"
import { ruText } from "../../../../../../../../general/textData/ru"


const EditTask: FC<propsType> = ({ task, setEditMode }) => {

    const appLanguage = useAppSelector(getAppLanguage)

    return (
        <>
            <button className={s.edit} onClick={() => setEditMode(task.id)}>
                <PenIcon className={s.penIcon}/>
                <span>
                    {appLanguage === 'Eng' ? engText.contextMenu.editTaskBtn : ruText.contextMenu.editTaskBtn}
                </span>
            </button>
        </>
    )
}

export default EditTask


interface propsType {
    task: taskType
    setEditMode: (editMode: string) => void
}