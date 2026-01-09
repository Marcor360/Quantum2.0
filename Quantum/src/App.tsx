import './App.css'
import { Route, Routes } from 'react-router-dom'
import IntroLogo from './components/IntroLogo'
import Home from './assets/pages/Home'
import AppsIA from './assets/pages/serv/app-ia'
import Branding from './assets/pages/serv/brannding'
import Campanas from './assets/pages/serv/campanas'
import Ecomerce from './assets/pages/serv/e-comerce'
import SocialMedia from './assets/pages/serv/social-media'

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
        <Route path="/servicios/social-media" element={<SocialMedia />} />
      </Routes>
    </IntroLogo>
  )
}

export default App
