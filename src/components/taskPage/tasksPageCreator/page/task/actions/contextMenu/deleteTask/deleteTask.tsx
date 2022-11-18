import React, { FC } from "react"
import s from './deleteTask.module.scss'
import { ReactComponent as DeleteIcon} from '../../../../../../../../general/svgs/deleteIcon.svg'
import { useAppDispatch, useAppSelector } from "../../../../../../../../hooks/hooks"
import { deleteTask } from "../../../../../../../../redux/reducers/projects-slice"
import { taskType } from "../../../../../../../../types/types"
import { deleteDefaultPageTask } from "../../../../../../../../redux/reducers/defaultPages-slice"
import { constDefaultPages } from "../../../../../../../../general/constants/constants"
import { getAppLanguage } from "../../../../../../../../redux/selectors"
import { engText } from "../../../../../../../../general/textData/eng"
import { ruText } from "../../../../../../../../general/textData/ru"


const DeleteTask: FC<propsType> = ({ projectName, task }) => {
    const dispatch = useAppDispatch()

    const appLanguage = useAppSelector(getAppLanguage)

    const deleteFunc = () => {
        if(!constDefaultPages.includes(projectName)){
            dispatch(deleteTask({ projectName, task }))
        }else{
            dispatch(deleteDefaultPageTask({ projectName, task }))
        }
    }
    return (
        <>
            <button className={s.delete} onClick={deleteFunc}>            
                <DeleteIcon className={s.deleteIcon}/>
                <span>
                    {appLanguage === 'Eng' ? engText.contextMenu.deleteTaskBtn : ruText.contextMenu.deleteTaskBtn}
                </span>
            </button>
        </>
    )
}

export default DeleteTask


interface propsType {
    projectName: string
    task: taskType
}