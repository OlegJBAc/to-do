import React from "react"
import { Outlet } from "react-router-dom"
import Header from "../header/header"
import SideBar from "../sideBar/sideBar"
import s from './mainLayout.module.scss'


const MainLayout = () => {
    return (
        <div className={s.mainLayout}>
            <Header/>
            <div className={s.content}>
                <SideBar/>
                <Outlet/>
            </div>
        </div>
    )
}

export default MainLayout