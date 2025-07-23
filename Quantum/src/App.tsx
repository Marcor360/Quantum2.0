import './App.css'

import { Routes, Route } from 'react-router-dom';
import backg from '/Font.webp';
{/* Importando los componentes y paginas que se van a utilizar en la aplicacion */ }
import Contacto from './pages/Contacto';
import Home from './pages/Home';
import Proyecto from './pages/Proyecto';




{/* Importando los estilos de la aplicacion */ }
import Layout from './components/Layout';



const App: React.FC = () => {
  return (
    <>
      <div style={{ backgroundImage: `url(${backg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route index element={<Home />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/proyecto" element={<Proyecto />} />
          </Route>
        </Routes>
      </div>

    </>
  );
};

export default App;


