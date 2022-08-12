import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import s from './App.module.scss'
import MainLayout from './components/mainLayout/mainLayout';
import NotFound from './components/notFound/notFound';
import TasksPageCreator from './components/tasksPageCreator/tasksPageCreator';
import Loader from './general/loader/loader';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { appInitialization, setAppInitialized } from './redux/reducers/app-slice';
import { getAppInitialized } from './redux/selectors';


const App = () => {
  const dispatch = useAppDispatch()
  const appInitialized = useAppSelector(getAppInitialized)

  useEffect(() => {
    appInitialization()
    dispatch(setAppInitialized(true))
  }, [])

  if(!appInitialized){
    return <Loader/>
  }
  return (
    <BrowserRouter>
      <div className={s.app}>
        <Routes>
          <Route path='/' element={<MainLayout/>}>
            <Route path='/*' element={<TasksPageCreator/>}/>
          </Route>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
