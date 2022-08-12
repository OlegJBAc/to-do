import React, { useState } from "react"
import { useAppDispatch } from "../../hooks/hooks"
import { addProject } from "../../redux/reducers/projects-slice"
import s from './sideBar.module.scss'


const SideBar = () => {
    const [projectName, setProjectName] = useState('')
    const dispatch = useAppDispatch()
    return (
        <div className={s.sideBar}>
            <input onChange={(e: any) => setProjectName(e.currentTarget.value)} value={projectName}/>
            <button onClick={() => {
                dispatch(addProject({ projectName }))
            }}>add project</button>
        </div>
    )
}

export default SideBar