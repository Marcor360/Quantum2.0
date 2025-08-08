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
import ProyectoDetalle from './pages/sub-pages/ProyectoDetalle'





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
            <Route path="/proyecto/:slug" element={<ProyectoDetalle />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>

    </>
  );
};

export default App;


