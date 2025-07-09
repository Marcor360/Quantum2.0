import './App.css'

import { Routes, Route } from 'react-router-dom';

{/* Importando los componentes y paginas que se van a utilizar en la aplicacion */}
import Contacto from './pages/Contacto';
import Home from './pages/Home';
import Proyecto from './pages/Proyecto';
import Quantum from './pages/Quantum';
import Servicio from './pages/Servicio';



{/* Importando los estilos de la aplicacion */}
import Layout from './components/Layout';



const App: React.FC = () => {
  return (
     <>
    
      <Routes>
      <Route path="/" element={<Layout />} >
      <Route index element={<Home />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/proyecto" element={<Proyecto />} />
        <Route path="/quantum" element={<Quantum />} />
        <Route path="/servicio" element={<Servicio />} />
      </Route>
      </Routes>
    
     </>
  );
};

export default App;

 
