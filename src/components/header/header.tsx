import React, { FC } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { logOutThunk } from "../../redux/reducers/auth-slice"
import s from './header.module.scss'
import cn from 'classnames'
import cnBind from 'classnames/bind'
import { changeAppTheme } from "../../redux/reducers/app-slice"
import { getAppTheme } from "../../redux/selectors"


const Header: FC<propsType> = ({ sideBarIsVisible, setSideBarIsVisible }) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const appTheme = useAppSelector(getAppTheme) 
    const cx = cnBind.bind(s)

    const changeTheme = () => {
        dispatch(changeAppTheme(appTheme === 'Light' ? 'Dark' : 'Light'))
    }
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
        <div className={cx('header', {
                light: appTheme === 'Light',
                dark: appTheme === 'Dark',
            })}>
            <button className={cx('sideBarVis__btn', {
                    light: appTheme === 'Light',
                    dark: appTheme === 'Dark',
                })} id={sideBarIsVisible ? s.sideBar__visible : s.sideBar__invisible}
                    onClick={setSideBarVisibility}>
                <span></span>
            </button>
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
        </div>
    )
}

export default Header


interface propsType {
    sideBarIsVisible: boolean
    setSideBarIsVisible: (sideBarIsVisible: boolean) => void
}