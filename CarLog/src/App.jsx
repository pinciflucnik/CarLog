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
      <div className='my-wrapper'>
        {/* <Home /> */}

        {/* <Login /> */}

        {/* <Register /> */}

        <CarListItem />

      </div>
    </section>
  )
}

export default App
