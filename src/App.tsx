import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import s from './App.module.scss'
import MainLayout from './components/mainLayout/mainLayout';
import NotFound from './components/notFound/notFound';
import TasksPageCreator from './components/tasksPageCreator/tasksPageCreator';
import { constAllProjectsTasks } from './general/constants/constants';
import Loader from './general/loader/loader';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { setAppInitialized } from './redux/reducers/app-slice';
import { defaultPagesInitialize } from './redux/reducers/defaultPages-slice';
import { allProjectsTasksInitialize, projectsTasksInitialize } from './redux/reducers/projects-slice';
import { getAppInitialized } from './redux/selectors';


const App = () => {
  const dispatch = useAppDispatch()
  const appInitialized = useAppSelector(getAppInitialized)

  // ***===========================================APP INITIALIZATION===========================================*** //
  useEffect(() => {
      const appInitialization = () => {
        const receivedLocalStorage = {...localStorage}
        const localStorageKeys = Object.keys(receivedLocalStorage)
        const initializationInfo = {
          arrayNecessaryItems: [constAllProjectsTasks],
          objectNecessaryItems: ['projects', 'defaultPages'],
        }
        initializationInfo.arrayNecessaryItems.forEach(item => {
          if(!localStorageKeys.includes(item)){
            localStorageKeys.push(item)
            localStorage.setItem(item, JSON.stringify([]))
          }
        })
        initializationInfo.objectNecessaryItems.forEach(item => {
          if(!localStorageKeys.includes(item)){
            localStorageKeys.push(item)
            if(item === 'defaultPages'){
              localStorage.setItem(item, JSON.stringify({ today: [] }))
            }else{
              localStorage.setItem(item, JSON.stringify({}))
            }
          }
        })
        const projects: string | null = localStorage.getItem('projects')
        const defaultPages: string | null = localStorage.getItem('defaultPages')
        const allProjectsTasks: string | null = localStorage.getItem(constAllProjectsTasks)
        dispatch(projectsTasksInitialize(projects ? JSON.parse(projects) : null))
        dispatch(allProjectsTasksInitialize(allProjectsTasks ? JSON.parse(allProjectsTasks) : null))
        dispatch(defaultPagesInitialize(defaultPages ? JSON.parse(defaultPages) : null))
      }
    appInitialization()
    dispatch(setAppInitialized(true))
  }, [])
  // ***===========================================APP INITIALIZATION===========================================*** //

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
