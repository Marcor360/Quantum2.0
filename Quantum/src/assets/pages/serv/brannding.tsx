import ServiceTemplate, {
  type ServiceTemplateConfig,
} from '../../../components/services/ServiceTemplate'

const config: ServiceTemplateConfig = {
  title: 'Branding',
  titleSvgSrc: '/svg/text/Branding-text.svg',
  sectionsLayout: 'grid',
  sectionsAlign: 'center',
  sections: [
    {
      id: 'que-resuelve',
      title: 'Qué resuelve',
      body: 'Identidad visual sólida para que la marca se vea profesional, consistente y lista para usarse en digital e impresión.',
      fullWidth: true,
    },
    {
      id: 'incluye',
      title: 'Incluye (paquete base de “Diseño de marca”)',
      bullets: [
        'Logotipo entregado en formatos listos para uso (incluye vector + PNG u otros según necesidad).',
        'Manual de identidad: reglas de uso del logo (versiones, tamaños, fondos, etc.).',
        'Paleta corporativa definida para aplicar en toda la comunicación.',
        'Mockups / implementaciones: presentación digital con ejemplos de aplicación del logo en materiales.',
      ],
      fullWidth: true,
    },
    {
      id: 'entregables',
      title: 'Entregables',
      body: 'Archivos finales (vector + formatos de uso), brandbook / guía en PDF y carpeta organizada para equipo/impresores.',
    },
    {
      id: 'requisitos',
      title: 'Requisitos para arrancar',
      body: 'Nombre de marca, giro, público objetivo, referencias visuales (3–5), y usos principales (redes, empaque, uniforme, etc.). (Esto es estándar para ejecutar el alcance anterior.)',
      fullWidth: true,
    },
    {
      id: 'complementos',
      title: 'Complementos típicos',
      body: 'Naming y piezas corporativas (menús, papelería, etc.) cuando aplique.',
    },
  ],
  pricing: {
    variant: 'two-cards-hero',
    title: 'Tu negocio necesita un menú digital',
    body: 'Nosotros lo diseñamos según tus necesidades y listo para usarse con la cámara de cualquier dispositivo.',
    emphasis:
      '¡No pierdas más ventas! Y aprovecha todos los beneficios que tiene para tu negocio.',
    subheading: '¿Para qué sirve un Código QR?',
    body2:
      '¡Tus clientes solo tendrán que abrir su cámara desde su celular, escanear el código y listo podrás acceder a tu menú en cuestión de segundos! No necesitan instalar ninguna APP.',
    cards: [
      {
        id: 'menu-pyme',
        labelTop: 'Anualmente / 40 platillos',
        title: 'Menú Pyme',
        price: '$1,499',
        button: {
          label: 'CONTRATAR',
          href: '#',
        },
      },
      {
        id: 'menu-empresarial',
        labelTop: 'Anualmente / 40 platillos',
        title: 'Menú Empresarial',
        price: '$1,999',
        button: {
          label: 'CONTRATAR',
          href: '#',
        },
      },
    ],
  },
}

export default function Branding() {
  return <ServiceTemplate config={config} />
}
