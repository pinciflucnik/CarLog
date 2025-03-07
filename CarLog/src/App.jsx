
import { Routes, Route } from 'react-router'
import { useState } from 'react'
import "./assets/css/style.css"
import Navigation from './components/navigation/Navigation'
import Home from './components/home/Home'
import Login from './components/auth/login/Login'
import Register from './components/auth/register/Register'
import CarListItem from './components/cars/car-list-item/CarListItem'

function App() {
  const [count, setCount] = useState(0)

  return (
    <section className="welcome-hero">

      <Navigation />
      <Routes>
         <Route path='/' element={<Home />}/> 
         <Route path='/auth/register' element={<Register />}/> 
         <Route path='/auth/login' element={<Login />}/> 
        <Route path='/cars' element={<CarListItem />} />
      </Routes>
    </section>
  )
}

export default App
