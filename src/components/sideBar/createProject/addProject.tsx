import React, { FC } from "react"
import { addProject } from '../../../redux/reducers/projects-slice'
import s from './addProject.module.scss'
import { Formik, Form, Field } from 'formik'
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks"
import { getAppTheme } from "../../../redux/selectors"
import cn from 'classnames'
import cnBind from 'classnames/bind'


const AddProject: FC<propsType> = ({ startOrEndProjectCreating }) => {
    const dispatch = useAppDispatch()
    const appTheme = useAppSelector(getAppTheme) 
    const submit = (values: valuesType, { setSubmitting }: submitType) => {
        dispatch(addProject({ projectName: values.addProject }))
        setSubmitting(false)
        startOrEndProjectCreating(false, values.addProject)()
        values.addProject = ''
    }
    const justEndCreating = (e: any) => {
        if(e.target === e.currentTarget){
            startOrEndProjectCreating(false, null)() //*
        }
    }
    const cx = cnBind.bind(s)
    return (
        <div className={s.createProject__overlay} onClick={justEndCreating}>
            <div className={cx('createProject', {
                    light: appTheme === 'Light',
                    dark: appTheme === 'Dark',
                })}>
                <Formik initialValues={{ addProject: '' }} onSubmit={submit}>
                    <Form>
                        <Field name='addProject' className={s.addProject__input} placeholder={'Enter name of project'}/>
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