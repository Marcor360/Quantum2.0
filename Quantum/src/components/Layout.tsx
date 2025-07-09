import { Outlet , Link } from "react-router-dom";


const Layout: React.FC = () => {
  return (
    <>
    <nav>
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
