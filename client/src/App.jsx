import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Story from './pages/Story'
import {Routes, Route} from 'react-router-dom'
import CreateRoom from './pages/CreateRoom'
import Home from './pages/Home'
import PrivateRoute from './components/PrivateRoute'

function App() {
  

  return (
    <>
      
      <Routes>
        <Route path='/' element= {<Home/>}/>
        <Route element={<PrivateRoute/>} >
        <Route path='/story/:storyId' element={<Story/>} />
        </Route>
        <Route path='/rooms' element={<CreateRoom/>} />
      </Routes>
    </>
  )
}

export default App
