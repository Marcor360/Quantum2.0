import './App.css'
import { Route, Routes } from 'react-router-dom'
import IntroLogo from './components/IntroLogo'
import Home from './assets/pages/Home'
import AppsIA from './assets/pages/serv/app-ia'
import Branding from './assets/pages/serv/brannding'
import Campanas from './assets/pages/serv/campanas'
import Ecomerce from './assets/pages/serv/e-comerce'

function App() {
  return (
    <IntroLogo svgUrl="/svg/Logo-Amarillo.svg">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route index element={<Home />} />
        <Route path="/servicios/branding" element={<Branding />} />
        <Route path="/servicios/e-commerce" element={<Ecomerce />} />
        <Route path="/servicios/apps-ia" element={<AppsIA />} />
        <Route path="/servicios/campanas" element={<Campanas />} />
      </Routes>
    </IntroLogo>
  )
}

export default App
