import { Field, Form, Formik } from "formik"
import React from "react"
import { useLocation } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { addTask } from "../../redux/reducers/projects-slice"
import { getAllProjectsTasks } from "../../redux/selectors"
import s from './tasksPageCreator.module.scss'
import { v4 } from 'uuid'
import { useDispatch } from "react-redux"


const TasksPageCreator = () => {
    const location = useLocation()
    const allProjectTasks = useAppSelector(getAllProjectsTasks)
    const dispatch = useAppDispatch()
    const submit = (values: valuesType, { setSubmitting }: submittingType) => {
        dispatch(addTask({ projectName: 'firstProject', task: {
            id: v4(),
            name: values.name,
            description: values.description,
            priority: 'green',
            addedAt: new Date().toISOString()
        } }))
    }
    return (
        <div className={s.page}>
            <div className={s.create}>
                <Formik initialValues={{ name: '', description: '' }} onSubmit={submit}>
                    <Form>
                        <Field name='name'/>
                        <Field name='description'/>
                        <button type="submit">add task</button>
                    </Form>
                </Formik>
            </div>
            <div className={s.tasks}>
                {allProjectTasks.map(task => {
                    return <li>
                        <span>{task.name}</span>
                        <span>{task.description}</span>
                    </li>
                })}
            </div>
        </div>
    )
}

export default TasksPageCreator


interface valuesType {
    name: string
    description: string
}
interface submittingType {
    setSubmitting: (isSubmitted: boolean) => any
}