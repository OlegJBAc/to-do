import React, { FC } from "react"
import s from './activeCreating.module.scss'
import { Field, Form, Formik } from "formik"
import { useAppDispatch } from "../../../hooks/hooks"
import { addTask, editTask } from "../../../redux/reducers/projects-slice"
import { addTaskToDefaultPage } from "../../../redux/reducers/defaultPages-slice"
import { constDefaultPages } from "../../../general/constants/constants"
import { v4 } from 'uuid'
import { taskType } from "../../../types/types"


const ActiveCreating: FC<propsType> = ({ project, setAddMode, editMode, setEditMode, task }) => {
    const dispatch = useAppDispatch()
    const submit = (values: valuesType, { setSubmitting }: submittingType) => {
        const defaultPages = constDefaultPages
        const getCreateTaskPayload = (projectName: string) => {
            return {
                projectName,
                task: {
                    id: editMode && task ? task.id : v4(),
                    name: values.name,
                    description: values.description,
                    priority: 'green',
                    addedAt: new Date().toISOString()
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
            // @ts-ignore
            dispatch(editTask(getCreateTaskPayload(project)))
            if(setEditMode){
                setEditMode(false)
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
        <div className={s.create}>
            <Formik initialValues={{ name: editMode && task ? task.name : '', 
                                     description: editMode && task ? task.description : '' }} 
                    onSubmit={submit}>
                <Form className={s.forms}>
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