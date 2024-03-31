import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Story from './pages/Story'
import {Routes, Route} from 'react-router-dom'
import CreateRoom from './pages/CreateRoom'
import Home from './pages/Home'

function App() {
  

  return (
    <>
      
      <Routes>
        <Route path='/' element= {<Home/>}/>
        <Route path='/story/:storyId' element={<Story/>} />
        <Route path='/rooms' element={<CreateRoom/>} />
      </Routes>
    </>
  )
}

export default App
