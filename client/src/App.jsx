
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Auth from './auth/Auth'
import Dashboard from './pages/Dashboard'

function App() {

  return (
    <BrowserRouter>
      <div className='app-container'>
        <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/' element={<Auth />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
