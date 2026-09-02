import { useState } from 'react'
import { BrowserRouter, Router, Routes, Route, Link, Outlet } from 'react-router-dom'
import { BaseLayout } from './layouts/BaseLayout'
import { CreateUser } from './pages/CreateUser'
import { CreateChat } from './pages/CreateChat'
import { JoinChat } from './pages/JoinChat'
import { Chat } from './pages/Chat'

import './index.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<BaseLayout/>}>
          <Route index element={<CreateUser/>}/>
          <Route path='/create' element={<CreateChat/>}/>
          <Route path='/join' element={<JoinChat/>}/>
        </Route>
        <Route path='/chat' element={<Chat/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
