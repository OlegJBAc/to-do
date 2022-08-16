import React, { FC } from "react"
import s from './notActiveCreating.module.scss'
import plusIcon from '../../../general/svgs/plusIcon.svg'

const NotActiveCreating: FC<propsType> = ({ setAddMode }) => {
    return (
        <div className={s.addbtn}>
            <button className={s.addbtn} onClick={() => setAddMode(true)}>
                <img src={plusIcon}/><span>AddTask</span>
            </button>
        </div>
    )
}

export default NotActiveCreating


interface propsType {
    setAddMode: (addMode: boolean) => void
}