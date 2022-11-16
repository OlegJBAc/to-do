import React from "react"
import s from './headerLeft.module.scss'
import cnBind from 'classnames/bind'
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks"
import { getAppLanguage, getAppTheme } from "../../../redux/selectors"
import { changeAppLanguage } from "../../../redux/reducers/app-slice"
import { engText } from "../../../general/textData/eng"
import { ruText } from "../../../general/textData/ru"


const HeaderLeft: React.FC<propsType>  = ({ sideBarIsVisible, setSideBarIsVisible }) => {

    const appTheme = useAppSelector(getAppTheme)
    const appLanguage = useAppSelector(getAppLanguage) 

    const dispatch = useAppDispatch()

    const cx = cnBind.bind(s)

    const setSideBarVisibility = () => {
        // @ts-ignore
        return setSideBarIsVisible((sideBarIsVisible: boolean) => {
            return sideBarIsVisible ? false : true
        })
    }

    const changeLanguage = () => {
        dispatch(changeAppLanguage(appLanguage === 'Ru' ? 'Eng' : 'Ru'))
    }

    return (
        <div className={s.headerLeft}>
            <button className={cx('sideBarVis__btn', {
                    light: appTheme === 'Light',
                    dark: appTheme === 'Dark',
                })} id={sideBarIsVisible ? s.sideBar__visible : s.sideBar__invisible}
                    onClick={setSideBarVisibility}>
                <div className={s.spans}>
                    <span className={s.spans__top}></span>
                    <span className={s.spans__middle}></span>
                    <span className={s.spans__bottom}></span>
                </div>
            </button>
            <button className={cx('language__toggle', {
                              light: appTheme === 'Light',
                              dark: appTheme === 'Dark',
                            })}
              onClick={changeLanguage} 
              title={ appLanguage === 'Eng' ? engText.header.changeLanguageBtnTitle 
                                            : ruText.header.changeLanguageBtnTitle}>
          {appLanguage === 'Ru' ? <span>Ru</span> : <span>Eng</span>}
      </button>
        </div>
    )
}

export default HeaderLeft


interface propsType {
    sideBarIsVisible: boolean
    setSideBarIsVisible: (sideBarIsVisible: boolean) => void
}