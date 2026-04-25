import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Home from './pages/Home'
import Users from './pages/Users'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <>
      {isLoggedIn && <Navbar setIsLoggedIn={setIsLoggedIn} />}
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/home" /> : <Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/home"
          element={isLoggedIn ? <Home /> : <Navigate to="/" />}
        />
        <Route
          path="/users"
          element={isLoggedIn ? <Users /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  )
}

export default App