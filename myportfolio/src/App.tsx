import React from 'react'
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { PATHTO } from "./PathTO";
import NavBar from './components/navbar/Navbar';

function App() {

  return (
    <>
    <Router>
      <NavBar />
      <Routes>
        <Route path={PATHTO.homepage.path} Component={PATHTO.homepage.component} />
        <Route path={PATHTO.aboutpage.path} Component={PATHTO.aboutpage.component} />
        <Route path={PATHTO.projectpage.path} Component={PATHTO.projectpage.component} />
        <Route path={PATHTO.projectcat.path} Component={PATHTO.projectcat.component} />
        <Route path={PATHTO.projectsubcat.path} Component={PATHTO.projectsubcat.component} />
      </Routes>
    </Router>
    </>
  )
}

export default App
