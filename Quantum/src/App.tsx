import './App.css'
import { Routes, Route } from 'react-router-dom'
import IntroLogo from './components/IntroLogo'
import Home from './assets/pages/Home'

function App() {
  return (
    <IntroLogo svgUrl="/svg/Logo-Amarillo.svg">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route index element={<Home />} />
      </Routes>
    </IntroLogo>
  )
}

export default App
