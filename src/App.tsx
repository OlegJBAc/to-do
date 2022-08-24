import React, { useEffect } from 'react'
import {  Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import s from './App.module.scss'
import Login from './components/login/login';
import MainLayout from './components/mainLayout/mainLayout';
import NotFound from './components/notFound/notFound';
import TasksPageCreator from './components/taskPage/tasksPageCreator/tasksPageCreator';
import { initialLocalStorage } from './general/initializationApp/initializationApp';
import { Loader } from './general/loader/loader';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { getAuthDataThunk, setAppInitialized } from './redux/reducers/app-slice';
import { getAppInitialized } from './redux/selectors';


const App = () => {
  const dispatch = useAppDispatch()
  const appInitialized = useAppSelector(getAppInitialized)
  const navigate = useNavigate()
  const location = useLocation()

  // ***===========================================APP INITIALIZATION===========================================*** //
  useEffect(() => {
      initialLocalStorage(dispatch)
      dispatch(getAuthDataThunk()).then(res => {
        if(res.payload.resultCode !== 0){
          navigate('login', { replace: true })
        }else{
          dispatch(setAppInitialized(true))
        }
      })
    }, [])
    useEffect(() => {
      if(location.pathname.slice(1) === 'login'){
        dispatch(setAppInitialized(true))
      }
    }, [location.pathname])
  // ***===========================================APP INITIALIZATION===========================================*** //

  if(!appInitialized){
    return <Loader/>
  }
  return (
      <div className={s.app}>
        <Routes>
          <Route path='/' element={<MainLayout/>}>
            <Route path='/*' element={<TasksPageCreator/>}/>
          </Route>
          <Route path='/login' element={<Login/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </div>
  );
}


export default App;

