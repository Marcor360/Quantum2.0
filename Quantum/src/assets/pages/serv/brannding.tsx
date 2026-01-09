import ServiceTemplate, {
  type ServiceTemplateConfig,
} from '../../../components/services/ServiceTemplate'

const config: ServiceTemplateConfig = {
  title: 'Branding',
  titleSvgSrc: '/svg/text/Branding-text.svg',
  sections: [
    {
      id: 'que-resuelve',
      title: 'Qué resuelve',
      body: 'Identidad visual sólida para que la marca se vea profesional, consistente y lista para usarse en digital e impresión.',
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
    },
    {
      id: 'entregables',
      title: 'Entregables',
      body: 'Archivos finales (vector + formatos de uso), brandbook / guía en PDF y carpeta organizada para equipo/impresores.',
    },
    {
      id: 'requisitos',
      title: 'Requisitos para arrancar',
      bullets: [
        'Nombre de marca',
        'Giro',
        'Público objetivo',
        'Referencias visuales (3–5)',
        'Usos principales (redes, empaque, uniforme, etc.).',
      ],
      note: 'Esto es estándar para ejecutar el alcance anterior.',
    },
    {
      id: 'complementos',
      title: 'Complementos típicos',
      body: 'Naming y piezas corporativas (menús, papelería, etc.) cuando aplique.',
    },
  ],
}

export default function Branding() {
  return <ServiceTemplate config={config} />
}
