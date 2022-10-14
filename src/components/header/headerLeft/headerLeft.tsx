import React from "react"
import s from './headerLeft.module.scss'
import cnBind from 'classnames/bind'
import { useAppSelector } from "../../../hooks/hooks"
import { getAppTheme } from "../../../redux/selectors"


const HeaderLeft: React.FC<propsType>  = ({ sideBarIsVisible, setSideBarIsVisible }) => {

    const appTheme = useAppSelector(getAppTheme) 
    const cx = cnBind.bind(s)

    const setSideBarVisibility = () => {
        // @ts-ignore
        return setSideBarIsVisible((sideBarIsVisible: boolean) => {
            return sideBarIsVisible ? false : true
        })
    }
    return (
        <>
            <button className={cx('sideBarVis__btn', {
                    light: appTheme === 'Light',
                    dark: appTheme === 'Dark',
                })} id={sideBarIsVisible ? s.sideBar__visible : s.sideBar__invisible}
                    onClick={setSideBarVisibility}>
                <span></span>
            </button>
        </>
    )
}

export default HeaderLeft


interface propsType {
    sideBarIsVisible: boolean
    setSideBarIsVisible: (sideBarIsVisible: boolean) => void
}