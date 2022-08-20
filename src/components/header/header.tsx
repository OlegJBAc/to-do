import React, { FC } from "react"
import s from './header.module.scss'


const Header: FC<propsType> = ({ sideBarIsVisible, setSideBarIsVisible }) => {
    const setSideBarVisibility = () => {
            // @ts-ignore
        return setSideBarIsVisible((sideBarIsVisible: boolean) => {
            return sideBarIsVisible ? false : true
        })
    }
    return (
        <div className={s.header}>
            <button className={s.sideBarVis__btn} 
                    id={sideBarIsVisible ? s.sideBar__visible : s.sideBar__invisible}
                    onClick={setSideBarVisibility}>
                <span></span>
            </button>
        </div>
    )
}

export default Header


interface propsType {
    sideBarIsVisible: boolean
    setSideBarIsVisible: (sideBarIsVisible: boolean) => void
}