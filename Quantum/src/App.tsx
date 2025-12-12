import './App.css'
import { Routes, Route } from 'react-router-dom'

{/*Importacion de Paginas*/ }
import Home from './assets/pages/Home'
function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route index element={<Home />} />
    </Routes>
  )
}

export default App
