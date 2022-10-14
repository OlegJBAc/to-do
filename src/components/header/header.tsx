import React, { FC, useEffect } from "react"
import { useAppSelector } from "../../hooks/hooks"
import s from './header.module.scss'
import cnBind from 'classnames/bind'
import { getAppTheme } from "../../redux/selectors"
import HeaderLeft from "./headerLeft/headerLeft"
import HeaderRight from "./headerRight/headerRight"


const Header: FC<propsType> = ({ sideBarIsVisible, setSideBarIsVisible, closeSideBar }) => {
    const appTheme = useAppSelector(getAppTheme) 
    const cx = cnBind.bind(s)

    useEffect(() => {
        if(sideBarIsVisible){
            setTimeout(() => {
                window.addEventListener('click', closeSideBar)
            }, 0)
        }
    }, [sideBarIsVisible])

    return (
        <header className={cx('header', {
                light: appTheme === 'Light',
                dark: appTheme === 'Dark',
            })}>
            <HeaderLeft sideBarIsVisible={sideBarIsVisible} setSideBarIsVisible={setSideBarIsVisible}/>
            <HeaderRight/>
        </header>
    )
}

export default Header


interface propsType {
    sideBarIsVisible: boolean
    setSideBarIsVisible: (sideBarIsVisible: boolean) => void
    closeSideBar: (e: any) => void
}