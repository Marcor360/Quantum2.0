import './App.css'
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
{/*Servicios*/ }
import APP_IA from './pages/servicios/app-e-ia';
import Branding from './pages/servicios/branding';
import Campañas from './pages/servicios/campañas';
import Ecomerce from './pages/servicios/ecomerce';
function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/*Servicios*/}
      <Route path="/servicios/app-e-ia" element={<APP_IA />} />
      <Route path="/servicios/branding" element={<Branding />} />
      <Route path="/servicios/campañas" element={<Campañas />} />
      <Route path="/servicios/ecomerce" element={<Ecomerce />} />
    </Routes>
  )
}

export default App;
