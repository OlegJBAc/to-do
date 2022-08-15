import React from "react"
import s from './loader.module.scss'
import loader from './loader.gif'

export const Loader = () => {
    return (
        <div className={s.loader}>
            <img src={'https://i.gifer.com/fxVE.gif'}/>
        </div>
    )
}


