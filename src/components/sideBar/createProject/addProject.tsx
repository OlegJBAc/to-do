import React, { FC } from "react"
import { addProject } from '../../../redux/reducers/projects-slice'
import s from './addProject.module.scss'
import { Formik, Form, Field } from 'formik'
import { useAppDispatch } from "../../../hooks/hooks"


const AddProject: FC<propsType> = ({ startOrEndProjectCreating }) => {
    const dispatch = useAppDispatch()
    const submit = (values: valuesType, { setSubmitting }: submitType) => {
        dispatch(addProject({ projectName: values.addProject }))
        setSubmitting(false)
        startOrEndProjectCreating(false, values.addProject)()
        values.addProject = ''
    }
    const justEndCreating = (e: any) => {
        if(e.target === e.currentTarget){
            startOrEndProjectCreating(false, null)() //***Necessary change***//
        }
    }

    return (
        <div className={s.createProject__overlay} onClick={justEndCreating}>
            <div className={s.createProject}>
                <Formik initialValues={{ addProject: '' }} onSubmit={submit}>
                    <Form>
                        <Field name='addProject'/>
                        <button type="submit" className={s.addProject__btn}>Add project</button>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default AddProject


interface propsType {
    startOrEndProjectCreating: (isStart: boolean, projectName?: string | null) => any
}
interface submitType {
    setSubmitting: (isSubmitted: boolean) => any
}
interface valuesType {
    addProject: string
}