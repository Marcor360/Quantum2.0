import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Fuerza que cada cambio de ruta empiece en la parte superior de la pagina
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}
