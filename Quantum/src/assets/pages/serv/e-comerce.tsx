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
}

export default function Ecomerce() {
  return <ServiceTemplate config={config} />
}
