
import { Routes, Route } from 'react-router'
import { useState } from 'react'
import "./assets/css/style.css"
import Navigation from './components/navigation/Navigation'
import Home from './components/home/Home'
import Login from './components/auth/login/Login'
import Register from './components/auth/register/Register'
import CarListItem from './components/cars/car-list-item/CarListItem'
import AuthContext from './context/authContext'
import useAuth from './hooks/UseAuth'

function App() {
  const { user } = useAuth();


  return (
    <AuthContext.Provider value={user}>
      <section className="welcome-hero">

        <Navigation />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth/register' element={<Register />} />
          <Route path='/auth/login' element={<Login />} />
          <Route path='/cars' element={<CarListItem />} />
        </Routes>
      </section>
    </AuthContext.Provider>
  )
}

export default App
