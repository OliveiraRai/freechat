import { useState } from 'react'
import { BrowserRouter, Router, Routes, Route, Link, Outlet } from 'react-router-dom'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<h1>Esta é a página principal.</h1>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
