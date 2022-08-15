import React, { FC } from "react"
import s from './createTask.module.scss'
import { Field, Form, Formik } from "formik"
import { v4 } from 'uuid'
import { useAppDispatch } from "../../hooks/hooks"
import { addTask } from "../../redux/reducers/projects-slice"
import { addTaskToDefaultPage } from "../../redux/reducers/defaultPages-slice"
import { constDefaultPages } from "../../general/constants/constants"


const CreateTask: FC<propsType> = ({ project }) => {
    
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
        
    }
    return (
        <div className={s.create}>
            <Formik initialValues={{ name: '', description: '' }} onSubmit={submit}>
                <Form>
                    <Field name='name'/>
                    <Field name='description'/>
                    <button type="submit">add task</button>
                </Form>
            </Formik>
        </div>
    )
}

export default CreateTask

interface propsType {
    project: string
}
interface valuesType {
    name: string
    description: string
}
interface submittingType {
    setSubmitting: (isSubmitted: boolean) => any
}