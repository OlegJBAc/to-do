import React, { FC } from "react"
import s from './actions.module.scss'
import penIcon from '../../../../../general/svgs/penIcon.svg'
import threeDots from '../../../../../general/svgs/threeDots.svg'


const Actions: FC<propsType> = ({ setEditMode }) => {
    return (
        <div className={s.actions}>
            <img src={penIcon} onClick={() => setEditMode(true)}/>
            <img src={threeDots}/>
        </div>
    )
}

export default Actions


interface propsType {
    setEditMode: (editMode: boolean) => void
}