import React, { FC, useEffect, useState } from "react"
import s from './activeCreating.module.scss'
import { Field, Form, Formik } from "formik"
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks"
import { addTask, editTask } from "../../../redux/reducers/projects-slice"
import { addTaskToDefaultPage, editDefaultPageTask } from "../../../redux/reducers/defaultPages-slice"
import { constDefaultPages } from "../../../general/constants/constants"
import { v4 } from 'uuid'
import { taskPriorityType, taskType } from "../../../types/types"
import cn from 'classnames'
import cnBind from 'classnames/bind'
import { changeAppTheme } from "../../../redux/reducers/app-slice"
import { getAppTheme } from "../../../redux/selectors"
import priorityIcon from '../../../general/svgs/priorityIcon.svg'
import { ReactComponent as PriorityIcon } from '../../../general/svgs/priorityIcon.svg'
import { ContextMenuBody, ContextMenuStyles } from "../../contextMenu/contextMenu"
import SetPriority from "../../taskPage/tasksPageCreator/page/task/actions/contextMenu/setPriority/setPriority"
import { useContextMenu } from "../../../hooks/useContextMenu"

const ActiveCreating: FC<propsType> = ({ project, setAddMode, editMode, setEditMode, task }) => {
    const dispatch = useAppDispatch()
    const appTheme = useAppSelector(getAppTheme)


    const { coordinates, 
            menuParams,
            localContextMenu,
            setLocalContextMenu, 
            activateContextMenu 
        } = useContextMenu({  })

    const cx = cnBind.bind(s)

    useEffect(() => {
        if(localContextMenu){
            const checkClick = (e: any) => {
                let contextMenuElem = document.querySelector('.context__menu')
                const clickPathFirst = e.composedPath().includes(contextMenuElem)
                if( !clickPathFirst && localContextMenu ){
                    window.removeEventListener('click', checkClick)
                    setLocalContextMenu(false)
                } 
            }
            setTimeout(() => {
                window.addEventListener('click', checkClick)
            }, 0)
        }
    }, [localContextMenu])
    
    const submit = (values: valuesType, { setSubmitting }: submittingType) => {
        const defaultPages = constDefaultPages
        const getCreateTaskPayload = (projectName: string) => {
            return {
                projectName,
                task: {
                    id: editMode && task ? task.id : v4(),
                    name: values.name,
                    description: values.description,
                    priority: 'purple' as taskPriorityType,
                    addedAt: new Date().toISOString(),
                    currentProject: projectName
                } 
            }
        }
        if(!editMode){
            if(!defaultPages.includes(project)){
                dispatch(addTask(getCreateTaskPayload(project)))
            }else{
                // @ts-ignore
                dispatch(addTaskToDefaultPage(getCreateTaskPayload(project)))
            }
            setAddMode(false)
        }else{
            if(!defaultPages.includes(project) && task){
                dispatch(editTask(getCreateTaskPayload(task.currentProject)))
                if(setEditMode){
                    setEditMode(false)
                }
            }else{
                if(task){
                    dispatch(editDefaultPageTask(getCreateTaskPayload(task.currentProject)))
                    if(setEditMode){
                        setEditMode(false)
                    }
                }
            }
        }
    }
    const cancelCreating = () => {
        setAddMode(false)
        if(setEditMode){
            setEditMode(false)
        }
    }
    return (
        <div className={cx('create', {
            light: appTheme === 'Light',
            dark: appTheme === 'Dark',
        })}>
            <Formik initialValues={{ name: editMode && task ? task.name : '', 
                                     description: editMode && task ? task.description : '' }} 
                    onSubmit={submit}>
                <Form className={cx('forms', {
                        light: appTheme === 'Light',
                        dark: appTheme === 'Dark',
                    })}>
                    <Field name='name' placeholder='Enter task name...'/>
                    <Field name='description' placeholder='Enter task description'/>
                    <div className={s.create__bottom}>
                        <div className={s.create__options}>
                            <button onClick={(e: any) => activateContextMenu(null, e)}>
                                <PriorityIcon className={s.priority__icon}/>
                            </button>
                            {localContextMenu && 
                                        <ContextMenuStyles className={s.projects__delete} top={coordinates.top}  
                                        left={coordinates.left} menuParams={menuParams}>
                                        <ContextMenuBody bodyComponent={
                                            <SetPriority projectName={project} 
                                                         task={task} />}/>
                                        </ContextMenuStyles>
                                    }
                        </div>
                        <div className={s.submit__button_wrap}>
                            <button type="submit" className={s.submit__button}>
                                {editMode    
                                    ? <span>Edit task</span> 
                                    : <span>Add task</span>
                                }
                            </button>
                            <button className={s.submit__button} type="button" onClick={cancelCreating}>
                                <span>Cancel</span>
                            </button>
                        </div>
                    </div>

                </Form>
            </Formik>
        </div>
    )
}

export default ActiveCreating


interface propsType {
    project: string
    setAddMode: (addMode: boolean) => void
    editMode?: boolean
    setEditMode?: (editMode: boolean) => void
    task: taskType
}
interface valuesType {
    name: string
    description: string
}
interface submittingType {
    setSubmitting: (isSubmitted: boolean) => any
}