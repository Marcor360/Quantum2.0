import './App.css'
import { Routes, Route } from 'react-router-dom'
import IntroLogo from './components/IntroLogo'
import Home from './assets/pages/Home'
import Ecomerce from './assets/pages/serv/e-comerce'
import Campañas from './assets/pages/serv/campañas'
import AppsIA from './assets/pages/serv/app-ia'
import Branding from './assets/pages/serv/brannding'


function App() {
  return (
    <IntroLogo svgUrl="/svg/Logo-Amarillo.svg">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route index element={<Home />} />
        <Route path='/servicios/branding' element={<Branding />} />
        <Route path='/servicios/e-commerce' element={<Ecomerce />} />
        <Route path='/servicios/campañas' element={<Campañas />} />
        <Route path='/servicios/apps-ia' element={<AppsIA />} />
      </Routes>
    </IntroLogo>
  )
}

export default App
