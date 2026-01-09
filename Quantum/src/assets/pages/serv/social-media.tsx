import ServiceTemplate, {
  type ServiceTemplateConfig,
} from '../../../components/services/ServiceTemplate'

const config: ServiceTemplateConfig = {
  title: 'Redes Sociales',
  titleSvgSrc: '/svg/redes/RedesSociales.svg',
  intro: {
    video: { type: 'placeholder' },
    kicker: 'Te lo explicamos en',
    heading: 'menos de 5 minutos',
    tag: 'Redes Sociales',
    body: 'Ofrece a tus clientes paquetes completos, diseñados para pequeñas, medianas y grandes negocios con márgenes de utilidad para ir arriba del 100%.',
  },
  tabs: {
    title: 'Las redes Sociales que manejamos',
    items: [
      {
        id: 'facebook',
        label: 'Facebook',
        iconSvgSrc: '/svg/redes/facebook.svg',
      },
      {
        id: 'instagram',
        label: 'Instagram',
        iconSvgSrc: '/svg/redes/instagram.svg',
      },
      {
        id: 'tiktok',
        label: 'TikTok',
        iconSvgSrc: '/svg/redes/tiktok.svg',
      },
      {
        id: 'linkedin',
        label: 'LinkedIn',
        iconSvgSrc: '/svg/redes/inded.svg',
      },
    ],
  },
  tabsAlign: 'center',
  pricing: {
    variant: 'toggle-cards',
    title: 'Precios público en general',
    subtitles:
      'Estos precios son para la compra de nuestros planes sin tomar alguna de nuestras ofertas de descuento de agencia.',
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
        priceByMode: { mensual: '$1,999', anual: '—' },
      },
      {
        id: 'dos-redes',
        name: 'Dos redes sociales',
        labelByMode: {
          mensual: 'Indispensable | Mes',
          anual: 'Indispensable | Anual',
        },
        priceByMode: { mensual: '$2,099', anual: '—' },
      },
      {
        id: 'tres-redes',
        name: 'Tres redes sociales',
        labelByMode: {
          mensual: 'Todo en Uno | Mes',
          anual: 'Todo en Uno | Anual',
        },
        priceByMode: { mensual: '$2,199', anual: '—' },
      },
      {
        id: 'cuatro-redes',
        name: 'Cuatro redes sociales',
        labelByMode: {
          mensual: 'Profesional | Mes',
          anual: 'Profesional | Anual',
        },
        priceByMode: { mensual: '$2,499', anual: '—' },
      },
      {
        id: 'seis-redes',
        name: 'Seis redes sociales',
        labelByMode: {
          mensual: 'Omnipresente | Mes',
          anual: 'Omnipresente | Anual',
        },
        priceByMode: { mensual: '$2,999', anual: '—' },
      },
    ],
  },
  cta: {
    title: '¿Necesitas una recomendación de qué plan elegir?',
    body: 'Elige nuestro Master Plan al más completo para tu negocio al mejor precio.',
    priceText: '$3,499',
    icons: [
      '/svg/redes/facebook.svg',
      '/svg/redes/instagram.svg',
      '/svg/redes/tiktok.svg',
      '/svg/redes/inded.svg',
    ],
  },
}

export default function SocialMedia() {
  return <ServiceTemplate config={config} />
}
