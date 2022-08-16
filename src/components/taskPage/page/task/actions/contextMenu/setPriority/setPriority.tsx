import React from "react"
import s from './setPriority.module.scss'


const SetPriority = () => {
    return (
        <div className={s.priority}>
            <h3>Set priority</h3>
            <ul className={s.select}>
                <li className={s.select__red}></li>
                <li className={s.select__orange}></li>
                <li className={s.select__purple}></li>
                <li className={s.select__none}></li>
            </ul>
        </div>
    )
}

export default SetPriority