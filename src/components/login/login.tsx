import React from "react"
import { Field, Form, Formik } from "formik"
import s from './login.module.scss'
import { logInThunk } from "../../redux/reducers/auth-slice"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { useLocation, useNavigate } from "react-router-dom"
import { constAllProjectsTasks } from "../../general/constants/constants"
import cn from 'classnames'
import cnBind from 'classnames/bind'
import { getAppTheme } from "../../redux/selectors"


const Login = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const appTheme = useAppSelector(getAppTheme) 
    const cx = cnBind.bind(s)
    const submit = (values: valuesType, { setSubmitting }: submitType ) => {
        dispatch(logInThunk({ email: values.email, 
                              password: values.password, 
                              rememberMe: values.rememberMe, 
                              captcha: '' }))
                .then(res => {
                    if(res.payload.resultCode === 0){
                        navigate(`/${constAllProjectsTasks}`)
                    }
                })
        setSubmitting(false)
    }
    return(
        <div className={s.app}>
            <div className={cx('login', {
                light: appTheme === 'Light',
                dark: appTheme === 'Dark',
            })}>
                <div className={s.container}>
                    <Formik initialValues={{ email: '', password: '', rememberMe: false}} onSubmit={submit}>
                    {({ isSubmitting }) => (
                        <Form>
                            <div className={s.forms}>
                                <div className={s.forms__email}>
                                    <span>Email:</span>
                                    <Field type='email' name='email' placeholder='Enter your email...'/>
                                </div>
                                <div className={s.forms__password}>
                                    <span>Password:</span>
                                    <Field type='password' name='password' placeholder='Enter your password...'/>
                                </div>
                                <div className={s.forms__rememberMe_wrap}>
                                    <div className={s.forms__rememberMe}>
                                        <div className={s.checkbox__wrapper}>
                                            <div className={s.checkbox__container}>
                                                <input className={s.checkbox__input} type={'checkbox'} 
                                                    id={s.checkbox}/>
                                                <label className={s.checkbox__label}
                                                    htmlFor={s.checkbox}><span>Remember me</span></label>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className={s.forms__captcha}>
                                        <img src={captchaURL}/>
                                        <Field name='captcha' placeholder='Enter captcha...'/>
                                    </div> */}
                                </div>
                                <button type="submit" disabled={isSubmitting}>
                                    <span>Sign in</span>
                                </button>
                            </div>
                        </Form>
                    )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}


export default Login


type submitType = {
    setSubmitting: (submitting: boolean) => any
}
type valuesType = {
    email: string
    password: string
    rememberMe: boolean
}