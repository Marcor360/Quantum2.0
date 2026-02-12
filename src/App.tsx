import './App.css'
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
{/*Servicios*/ }
import Serv from './pages/Servicios';
import APP_IA from './pages/servicios/app-e-ia';
import Branding from './pages/servicios/branding';
import Campanas from './pages/servicios/campanas';
import Ecomerce from './pages/servicios/ecomerce';
{/*Contacto*/ }
import Contacto from './pages/contacto';
function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/servicios" element={<Serv />} />
      {/*Servicios*/}
      <Route path="/servicios/app-e-ia" element={<APP_IA />} />
      <Route path="/servicios/branding" element={<Branding />} />
      <Route path="/servicios/campanas" element={<Campanas />} />
      <Route path="/servicios/ecomerce" element={<Ecomerce />} />
      {/*Contacto*/}
      <Route path="/contacto" element={<Contacto />} />
    </Routes>
  )
}

export default App;
