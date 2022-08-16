import React from "react"
import s from './actions.module.scss'
import penIcon from '../../../../../general/svgs/penIcon.svg'
import threeDots from '../../../../../general/svgs/threeDots.svg'


const Actions = () => {
    return (
        <div className={s.actions}>
            <img src={penIcon}/>
            <img src={threeDots}/>
        </div>
    )
}

export default Actions