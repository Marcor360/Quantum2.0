import ServiceTemplate, {
  type ServiceTemplateConfig,
} from '../../../components/services/ServiceTemplate'

const config: ServiceTemplateConfig = {
  title: 'E-Commerce',
  titleSvgSrc: '/svg/text/E-Comerce-text.svg',
  sections: [
    {
      id: 'que-resuelve',
      title: 'Qué resuelve',
      body: 'Montaje de tienda online en WordPress/WooCommerce para vender por WhatsApp o con pasarela de pago, con base técnica lista para operar.',
    },
    {
      id: 'notas-operativas',
      title: 'Notas operativas',
      body: 'Normalmente hay renovación anual de hosting/mantenimiento posterior al primer año (costo recurrente).',
    },
    {
      id: 'requisitos',
      title: 'Requisitos para arrancar',
      body: 'Dominio (o compra), catálogo de productos (fotos, precios, variaciones), políticas (envíos/devoluciones), métodos de pago, accesos (si ya existen).',
    },
  ],
  tabs: {
    title: 'Opciones',
    items: [
      {
        id: 'whatsapp',
        label: 'Ecommerce a WhatsApp',
        title: 'Opción A: Ecommerce a WhatsApp',
        body: 'Incluye',
        bullets: [
          'Sitio con estructura de 5 páginas (plantilla o diseño a la medida según versión).',
          'Hosting por 1 año, SSL, diseño responsivo, construcción con Divi o Elementor.',
          'WooCommerce + carga inicial de productos (10) + correos con dominio.',
          'Flujo de pedidos por WhatsApp (sin pasarela).',
          'Mantenimiento anual cuando el alojamiento se mantiene con el proveedor (cambios mensuales y updates técnicos, según versión).',
        ],
      },
      {
        id: 'pasarela',
        label: 'Con pasarela',
        title: 'Opción B: Ecommerce con pasarela de pago',
        body: 'Incluye',
        bullets: [
          'Todo lo anterior + configuración de pasarelas (p. ej., PayPal/Stripe) y acceso a panel WordPress.',
          'Mantenimiento anual: cambios mensuales, actualización de plugins, respaldos y revisiones de seguridad (según versión).',
        ],
        note: 'Tiempo de entrega referenciado: 10–15 días hábiles para la versión económica; en versión a la medida se desglosa por diseño/programación.',
      },
    ],
  },
  pricing: {
    variant: 'catalog-grid',
    title: 'Actualiza tu negocio',
    subtitle:
      'Elige cualquiera de las opciones de pago, en cuotas o en una sola exhibición.',
    groups: [
      {
        id: 'economico',
        tone: 'light',
        cards: [
          {
            id: 'economico-landing',
            label: 'Económico',
            title: 'Landing Page',
            price: '$5,980',
            button: {
              label: 'CONTRATAR',
              href: '#',
            },
          },
          {
            id: 'economico-informativo',
            label: 'Económico',
            title: 'Sitio Informativo',
            price: '$7,980',
            button: {
              label: 'CONTRATAR',
              href: '#',
            },
          },
          {
            id: 'economico-whatsapp',
            label: 'Económico',
            title: 'Ecommerce a WhatsApp',
            price: '$9,600',
            button: {
              label: 'CONTRATAR',
              href: '#',
            },
          },
          {
            id: 'economico-pasarela',
            label: 'Económico',
            title: 'E-commerce con pasarela de pago',
            price: '$11,600',
            button: {
              label: 'CONTRATAR',
              href: '#',
            },
          },
        ],
        note:
          '*Único pago (posteriormente pagarás la renovación del hosting y mantenimiento de tu sitio: $200 USD AL AÑO)',
      },
      {
        id: 'medida',
        tone: 'dark',
        cards: [
          {
            id: 'medida-landing',
            label: 'A la medida',
            title: 'Landing Page',
            price: '$7,980',
            button: {
              label: 'CONTRATAR',
              href: '#',
            },
          },
          {
            id: 'medida-informativo',
            label: 'A la medida',
            title: 'Sitio Informativo',
            price: '$9,980',
            button: {
              label: 'CONTRATAR',
              href: '#',
            },
          },
          {
            id: 'medida-whatsapp',
            label: 'A la medida',
            title: 'Ecommerce a WhatsApp',
            price: '$11,600',
            button: {
              label: 'CONTRATAR',
              href: '#',
            },
          },
          {
            id: 'medida-pasarela',
            label: 'A la medida',
            title: 'E-commerce con pasarela de pago',
            price: '$13,600',
            button: {
              label: 'CONTRATAR',
              href: '#',
            },
          },
        ],
        note:
          '*Único pago (posteriormente pagarás la renovación del hosting y mantenimiento de tu sitio: $200 USD AL AÑO)',
      },
    ],
  },
}

export default function Ecomerce() {
  return <ServiceTemplate config={config} />
}
