import React, { FC } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../hooks/hooks"
import { logOutThunk } from "../../redux/reducers/auth-slice"
import s from './header.module.scss'


const Header: FC<propsType> = ({ sideBarIsVisible, setSideBarIsVisible }) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const setSideBarVisibility = () => {
            // @ts-ignore
        return setSideBarIsVisible((sideBarIsVisible: boolean) => {
            return sideBarIsVisible ? false : true
        })
    }
    const logOut = () => {
        dispatch(logOutThunk()).then(res => {
            if(res.payload.resultCode === 0){
                navigate('login')
            }
        })
    }
    return (
        <div className={s.header}>
            <button className={s.sideBarVis__btn} 
                    id={sideBarIsVisible ? s.sideBar__visible : s.sideBar__invisible}
                    onClick={setSideBarVisibility}>
                <span></span>
            </button>
            <button className={s.logOut__button} onClick={logOut}>
                <span>LogOut</span>
            </button>
        </div>
    )
}

export default Header


interface propsType {
    sideBarIsVisible: boolean
    setSideBarIsVisible: (sideBarIsVisible: boolean) => void
}