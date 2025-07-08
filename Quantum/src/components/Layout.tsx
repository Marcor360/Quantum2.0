
import { Outlet,Link } from 'react-router-dom';

const Layout = () => {
    return(
        <div className='bg-gray-800 text-blue  p-4 shadow-md inline-bl'>
            <nav>  
                        <Link to="/">Home</Link>
                        <Link to="/servicio">Servicios</Link>
                        <Link to="/proyecto">Proyectos</Link>
                        <Link to="/quantum_360">Quantum 360°</Link>
                        <Link to="/contacto">Contacto</Link>
            </nav>
            <Outlet/>

        </div>


);
}
export default Layout;