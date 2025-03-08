
import { Routes, Route } from 'react-router'

import "./assets/css/style.css"

import { AuthProvider } from './context/AuthContext'

import Navigation from './components/navigation/Navigation'
import Home from './components/home/Home'
import Login from './components/auth/login/Login'
import Register from './components/auth/register/Register'
import CarListItem from './components/cars/car-list-item/CarListItem'
import Logout from './components/auth/logout/Logout'

function App() {
  return (
    <AuthProvider>
      <section className="welcome-hero">

        <Navigation />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth/register' element={<Register />} />
          <Route path='/auth/login' element={<Login />} />
          <Route path='/auth/logout' element={<Logout />} />
          <Route path='/cars' element={<CarListItem />} />
        </Routes>
      </section>
      </AuthProvider>
    )
}

export default App
