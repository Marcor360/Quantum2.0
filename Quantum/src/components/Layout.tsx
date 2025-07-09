import { Outlet , Link } from "react-router-dom";


const Layout: React.FC = () => {
  return (
    <>
    <nav className="bg-gradient-to-r from-purple-600 to-pink-400 px-6 py-4 flex justify-between items-center z-50 relative">
      <Link to="/">Inicio</Link>
      <Link to="/proyecto">Proyectos </Link>
      <Link to="/quantum">Quantum</Link>
      <Link to="/servicio">Servicios</Link>
      <Link to="/contacto">Contacto</Link>
      
    </nav>
    <Outlet />

    </>
  );
};

export default Layout ;
