import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import s from './App.module.scss'
import Header from './components/header/header';
import MainLayout from './components/mainLayout/mainLayout';
import TasksPageCreator from './components/tasksPageCreator/tasksPageCreator';

const App = () => {
  return (
    <BrowserRouter>
      <div className={s.app}>
        <Routes>
          <Route path='/' element={<MainLayout/>}>
            <Route path='/' element={<TasksPageCreator/>}/>
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
