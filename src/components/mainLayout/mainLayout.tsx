import React, { useEffect } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { constAllProjectsTasks } from "../../general/constants/constants"
import Header from "../header/header"
import SideBar from "../sideBar/sideBar"
import s from './mainLayout.module.scss'


const MainLayout = () => {
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(() => {
        let currentLocation = location.pathname
        if(currentLocation === '/'){
            navigate(constAllProjectsTasks)
        }
    }, [])
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