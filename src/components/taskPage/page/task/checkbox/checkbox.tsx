import React from "react"
import s from './checkbox.module.scss'


const Checkbox = () => {
    return (
        <div className={s.checkbox__container}>
            <input className={s.checkbox} id={s.checkbox} type='checkbox'/>
            <label htmlFor={s.checkbox}/>
        </div>
    )
}

export default Checkbox