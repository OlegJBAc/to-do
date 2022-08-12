import React from "react"
import s from './loader.module.scss'
import loader from './loader.gif'

const Loader = () => {
    return(
        <div className={s.loader}>
            <img src={loader}/>
        </div>
    )
}

export default Loader