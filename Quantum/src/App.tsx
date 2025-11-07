import './App.css'

import { Routes, Route } from 'react-router-dom';
import backg from '/Font.webp';
{/* Importando los componentes y paginas que se van a utilizar en la aplicacion */ }
import Contacto from './pages/Contacto';
import Home from './pages/Home';
import Proyecto from './pages/Proyecto';
import Credenciales from './pages/Credenciales';
import NotFoundPage from './pages/NotFoundPage';
{/*Importacion de Subpagina*/ }
import Payrolling from './pages/sub-pages/payrolling'
{/* importandopaginaoculta */ }
import Objetivo from './pages/sub-pages/objetivo'
import Politicas from './pages/sub-pages/politica'




{/* Importando los estilos de la aplicacion */ }
import Layout from './components/Layout';



const App: React.FC = () => {
  return (
    <>
      <div style={{ backgroundImage: `url(${backg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route index element={<Home />} />
            <Route path="/credenciales" element={<Credenciales />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/proyecto" element={<Proyecto />} />
            <Route path="/proyecto/payrolling-tech" element={<Payrolling />} />
            <Route path="/objetivo" element={<Objetivo />} />
            <Route path="/politicas" element={<Politicas />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>

    </>
  );
};

export default App;


