import React, { FC } from "react"
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


const ActiveCreating: FC<propsType> = ({ project, setAddMode, editMode, setEditMode, task }) => {
    const dispatch = useAppDispatch()

    const appTheme = useAppSelector(getAppTheme) 
    const cx = cnBind.bind(s)

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
    task?: taskType
}
interface valuesType {
    name: string
    description: string
}
interface submittingType {
    setSubmitting: (isSubmitted: boolean) => any
}