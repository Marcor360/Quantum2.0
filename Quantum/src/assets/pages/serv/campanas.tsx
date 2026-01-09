import ServiceTemplate, {
  type ServiceTemplateConfig,
} from '../../../components/services/ServiceTemplate'

const config: ServiceTemplateConfig = {
  title: 'Campañas',
  titleSvgSrc: '/svg/text/Campa¤as-text.svg',
  sections: [
    {
      id: 'que-resuelve',
      title: 'Qué resuelve',
      body: 'Publicidad pagada para traer tráfico/leads/ventas con segmentación y optimización durante un ciclo típico de 30 días.',
    },
    {
      id: 'requisitos',
      title: 'Requisitos para arrancar',
      bullets: [
        'Accesos a Business Manager/Ads',
        'Pixel/eventos (si aplica)',
        'Objetivo claro (leads/ventas)',
        'Presupuesto',
        'Ubicación y oferta',
      ],
    },
  ],
  tabs: {
    title: 'Canales',
    items: [
      {
        id: 'google',
        label: 'Google',
        title: 'Google (Search / Display / YouTube)',
        bullets: [
          'Google Search: análisis inicial, keywords, segmentación (1 mercado objetivo), propuesta con presupuesto, lanzamiento+monitoreo (máx. 30 días) y reporte.',
          'Google Display: lo anterior + creación del banner en el formato requerido.',
          'Google Video YouTube: lo anterior + creación de anuncio en video (6/15/20 segundos).',
        ],
      },
      {
        id: 'meta-tiktok',
        label: 'Meta / TikTok',
        title: 'Meta / TikTok (Facebook, Instagram, TikTok Ads)',
        bullets: [
          'Propuesta de campaña + diseño de creatividad (imagen) + coordinador asignado + monitoreo hasta 30 días.',
        ],
        note: 'No incluye la inversión / presupuesto pagado a la plataforma publicitaria.',
      },
    ],
  },
}

export default function Campanas() {
  return <ServiceTemplate config={config} />
}

