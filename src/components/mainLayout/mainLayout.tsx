import React, { useEffect, useState } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { constAllProjectsTasks } from "../../general/constants/constants"
import { useAppDispatch } from "../../hooks/hooks"
import { deleteProject } from "../../redux/reducers/projects-slice"
import Header from "../header/header"
import SideBar from "../sideBar/sideBar"
import s from './mainLayout.module.scss'


const MainLayout = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [sideBarIsVisible, setSideBarIsVisible] = useState<boolean>(true)
    const [projectWasDelete, setProjectWasDelete] = useState<{wasDelete: boolean, projectName: string}>({
        wasDelete: false,
        projectName: ''
    })

    useEffect(() => {
        let currentLocation = location.pathname
        if(currentLocation === '/'){
            navigate(constAllProjectsTasks)
        }
    }, [])
    
    useEffect(() => {
        if(projectWasDelete.wasDelete && projectWasDelete.projectName === location.pathname.slice(1)){
            dispatch(deleteProject({ projectName: projectWasDelete.projectName }))
            setProjectWasDelete({ wasDelete: false, projectName: '' })
            navigate(constAllProjectsTasks)
        }
        if(projectWasDelete.wasDelete && projectWasDelete.projectName !== location.pathname.slice(1)){
            dispatch(deleteProject({ projectName: projectWasDelete.projectName }))
            setProjectWasDelete({ wasDelete: false, projectName: '' })
        }
    }, [projectWasDelete.wasDelete])

    return (
        <div className={s.mainLayout}>
            <Header sideBarIsVisible={sideBarIsVisible} setSideBarIsVisible={setSideBarIsVisible}/>
            <div className={s.content}>
                <SideBar setProjectWasDelete={setProjectWasDelete} sideBarIsVisible={sideBarIsVisible}/>
                <Outlet context={{sideBarIsVisible}} />
            </div>
        </div>
    )
}

export default MainLayout