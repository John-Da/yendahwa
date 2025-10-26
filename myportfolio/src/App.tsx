import { useState } from 'react'
import "./index.css";
import NavBar from './components/navbar/Navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './pages/homePage/HomePage'

function App() {

  return (
    <>
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" exact Component={HomePage} />
      </Routes>
    </Router>
    </>
  )
}

export default App
