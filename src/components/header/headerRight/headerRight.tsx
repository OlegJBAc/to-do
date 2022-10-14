import React from "react"
import s from './headerRight.module.scss'
import cnBind from 'classnames/bind'
import { logOutThunk } from "../../../redux/reducers/auth-slice"
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks"
import { useNavigate } from "react-router-dom"
import { changeAppTheme } from "../../../redux/reducers/app-slice"
import { getAppTheme } from "../../../redux/selectors"

const HeaderRight: React.FC<propsType> = ({  }) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const appTheme = useAppSelector(getAppTheme) 
    const cx = cnBind.bind(s)

    const changeTheme = () => {
        dispatch(changeAppTheme(appTheme === 'Light' ? 'Dark' : 'Light'))
    }
    const logOut = () => {
        dispatch(logOutThunk()).then(res => {
            if(res.payload.resultCode === 0){
                navigate('login')
            }
        })
    }
    return (
        <div className={s.header__right}>
            <button className={cx('theme__toggle', {
                        light: appTheme === 'Light',
                        dark: appTheme === 'Dark',
                })}
            onClick={changeTheme}>
            </button>
            <button className={s.logOut__button} onClick={logOut}>
                <span>LogOut</span>
            </button>
        </div>
    )
}

export default HeaderRight


interface propsType {

}