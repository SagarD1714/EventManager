import { useState } from 'react'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

import Home from './components/Home'
import Login from './components/SignUpPage/Login'
import Signup from './components/SignUpPage/Signup'
import AdminPage from './components/Admin/Admin'
import Reset from './components/SignUpPage/Reset';
import Expense from './components/landing/Expense';
import EventInfo from './components/Admin/EventInfo';
import Upcoming from './components/landing/Upcoming';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Login />} />
          <Route path="/admin-page" element={<AdminPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/expense" element={<Expense />} />
          <Route path="/event-info" element={<EventInfo />} />
          <Route path="/Upcoming" element={<Upcoming />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
