import ServiceTemplate, {
  type ServiceTemplateConfig,
} from '../../../components/services/ServiceTemplate'

const config: ServiceTemplateConfig = {
  title: 'Campañas',
  titleSvgSrc: '/svg/text/Campañas-text.svg',
  sectionsAlign: 'center',
  sections: [
    {
      id: 'que-resuelve',
      title: 'Qué resuelve',
      body: 'Publicidad pagada para traer tráfico/leads/ventas con segmentación y optimización durante un ciclo típico de 30 días.',
    },
    {
      id: 'requisitos',
      title: 'Requisitos para arrancar',
      body: 'Accesos a Business Manager/Ads, pixel/eventos (si aplica), objetivo claro (leads/ventas), presupuesto, ubicación y oferta.',
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
        note: 'No incluye la inversión/presupuesto pagado a la plataforma publicitaria.',
      },
    ],
  },
  tabsAlign: 'center',
  pricing: {
    variant: 'toggle-cards',
    title: 'Precios para dueños de agencias',
    subtitles: [
      'Estos precios son exclusivos para personas con membresía de agencia.',
      'Sobre de este precio adicional tendrán un descuento extra del 10%,15% o 25% de acuerdo a su tipo de membresía',
    ],
    toggle: {
      modes: [
        { id: 'mensual', label: 'Mensual' },
        { id: 'anual', label: 'Anual' },
      ],
      defaultMode: 'mensual',
    },
    plans: [
      {
        id: 'una-red',
        name: 'Una red social',
        labelByMode: {
          mensual: 'Esencial | Mes',
          anual: 'Esencial | Anual',
        },
        priceByMode: {
          mensual: '$899 – $1,199',
          anual: '$8,993 – $11,990',
        },
      },
      {
        id: 'dos-redes',
        name: 'Dos redes sociales',
        labelByMode: {
          mensual: 'Indispensable | Mes',
          anual: 'Indispensable | Anual',
        },
        priceByMode: {
          mensual: '$1,049 – $1,399',
          anual: '$10,493 – $13,990',
        },
      },
      {
        id: 'tres-redes',
        name: 'Tres redes sociales',
        labelByMode: {
          mensual: 'Todo en Uno | Mes',
          anual: 'Todo en Uno | Anual',
        },
        priceByMode: {
          mensual: '$1,274 – $1,699',
          anual: '$12,743 – $16,990',
        },
      },
      {
        id: 'cuatro-redes',
        name: 'Cuatro redes sociales',
        labelByMode: {
          mensual: 'Profesional | Mes',
          anual: 'Profesional | Anual',
        },
        priceByMode: {
          mensual: '$1,499 – $1,999',
          anual: '$14,993 – $19,990',
        },
      },
      {
        id: 'seis-redes',
        name: 'Seis redes sociales',
        labelByMode: {
          mensual: 'Omnipresente | Mes',
          anual: 'Omnipresente | Anual',
        },
        priceByMode: {
          mensual: '$2,024 – $2,699',
          anual: '$20,243 – $26,990',
        },
      },
    ],
    cta: {
      label: 'Sé dueño de tu agencia',
      href: '#',
    },
  },
}

export default function Campanas() {
  return <ServiceTemplate config={config} />
}
