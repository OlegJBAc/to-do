import React, { FC } from "react"
import s from './notActiveCreating.module.scss'
import { ReactComponent as PlusIcon } from '../../../general/svgs/plusIcon.svg'
import cnBind from 'classnames/bind'
import { getAppTheme } from "../../../redux/selectors"
import { useAppSelector } from "../../../hooks/hooks"


const NotActiveCreating: FC<propsType> = ({ setAddMode }) => {
    const appTheme = useAppSelector(getAppTheme) 
    const cx = cnBind.bind(s)
    return (
        <div className={cx('addbtn', {
            light: appTheme === 'Light',
            dark: appTheme === 'Dark',
        })}>
            <button className={s.addbtn} onClick={() => setAddMode(true)}>
                <PlusIcon className={s.plusIcon}/>
                <span>AddTask</span>
            </button>
        </div>
    )
}

export default NotActiveCreating


interface propsType {
    setAddMode: (addMode: boolean) => void
}