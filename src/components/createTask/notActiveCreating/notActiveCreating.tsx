import React, { FC } from "react"
import s from './notActiveCreating.module.scss'
import { ReactComponent as PlusIcon } from '../../../general/svgs/plusIcon.svg'
import cnBind from 'classnames/bind'
import { getAppLanguage, getAppTheme } from "../../../redux/selectors"
import { useAppSelector } from "../../../hooks/hooks"
import { engText } from "../../../general/textData/eng"
import { ruText } from "../../../general/textData/ru"


const NotActiveCreating: FC<propsType> = ({ setAddMode }) => {
    const appTheme = useAppSelector(getAppTheme)
    const appLanguage = useAppSelector(getAppLanguage)

    const cx = cnBind.bind(s)

    return (
        <div className={cx('addbtn', {
            light: appTheme === 'Light',
            dark: appTheme === 'Dark',
        })}>
            <button className={s.addbtn} onClick={() => setAddMode(true)}>
                <PlusIcon className={s.plusIcon}/>
                <span>{ appLanguage === 'Eng' ? engText.page.addTaskBtn : ruText.page.addTaskBtn }</span>
            </button>
        </div>
    )
}

export default NotActiveCreating


interface propsType {
    setAddMode: (addMode: boolean) => void
}