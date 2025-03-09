
import { Routes, Route } from 'react-router'

import "./assets/css/style.css"

import { AuthProvider } from './context/AuthContext'
import { ErrorProvider } from './context/ErrorContext'

import Navigation from './components/navigation/Navigation'
import Home from './components/home/Home'
import Login from './components/auth/login/Login'
import Register from './components/auth/register/Register'
import CarListItem from './components/cars/car-list-item/CarListItem'
import Logout from './components/auth/logout/Logout'
import ErrorMessage from './components/error/ErrorMessage'
import Profile from './components/auth/user/Profile'
import CreateCar from './components/cars/create-car/CreateCar'

function App() {
  return (
    <ErrorProvider>
      <AuthProvider>
        <section className="welcome-hero">

          <Navigation />
          <ErrorMessage />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/auth/register' element={<Register />} />
            <Route path='/auth/login' element={<Login />} />
            <Route path='/auth/profile' element={<Profile />} />
            <Route path='/auth/logout' element={<Logout />} />
            <Route path='/cars' element={<CarListItem />} />
            <Route path='/cars/add-car' element={<CreateCar />} />
          </Routes>
        </section>
      </AuthProvider>
    </ErrorProvider>
  )
}

export default App
