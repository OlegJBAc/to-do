import React, { FC } from "react"
import s from './activeCreating.module.scss'
import { Field, Form, Formik } from "formik"
import { useAppDispatch } from "../../../hooks/hooks"
import { addTask } from "../../../redux/reducers/projects-slice"
import { addTaskToDefaultPage } from "../../../redux/reducers/defaultPages-slice"
import { constDefaultPages } from "../../../general/constants/constants"
import { v4 } from 'uuid'


const ActiveCreating: FC<propsType> = ({ project, setAddMode, setEditMode }) => {
    const dispatch = useAppDispatch()
    const submit = (values: valuesType, { setSubmitting }: submittingType) => {
        const defaultPages = constDefaultPages
        const getCreateTaskPayload = (projectName: string) => {
            return {
                projectName, 
                task: {
                    id: v4(),
                    name: values.name,
                    description: values.description,
                    priority: 'green',
                    addedAt: new Date().toISOString()
                } 
            }
        }
        if(!defaultPages.includes(project)){
            dispatch(addTask(getCreateTaskPayload(project)))
        }else{
            // @ts-ignore
            dispatch(addTaskToDefaultPage(getCreateTaskPayload(project)))
        }
        setAddMode(false)
    }
    const cancelCreating = () => {
        setAddMode(false)
        if(setEditMode){
            setEditMode(false)
        }
    }
    return (
        <div className={s.create}>
            <Formik initialValues={{ name: '', description: '' }} onSubmit={submit}>
                <Form className={s.forms}>
                    <Field name='name' placeholder='Enter task name...'/>
                    <Field name='description' placeholder='Enter task description'/>
                    <div className={s.submit__button_wrap}>
                        <button type="submit" className={s.submit__button}>add task</button>
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
    setEditMode?: (editMode: boolean) => void
}
interface valuesType {
    name: string
    description: string
}
interface submittingType {
    setSubmitting: (isSubmitted: boolean) => any
}