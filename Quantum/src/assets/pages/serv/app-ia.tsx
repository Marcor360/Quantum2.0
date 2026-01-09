import ServiceTemplate, {
  type ServiceTemplateConfig,
} from '../../../components/services/ServiceTemplate'

const config: ServiceTemplateConfig = {
  title: 'Apps & I.A.',
  titleSvgSrc: '/svg/text/Apps-text.svg',
  sectionsAlign: 'center',
  sections: [
    {
      id: 'que-resuelve',
      title: 'Qué resuelve',
      body: 'Automatización de atención y ventas (24/7) + sistemas de seguimiento (CRM) + embudos que convierten leads en citas/ventas.',
      align: 'center',
    },
  ],
  tabs: {
    title: 'Componentes',
    items: [
      {
        id: 'agente-ia',
        label: 'Agente IA 24/7',
        title: '1) Agente IA 24/7 (atención + ventas)',
        body: 'Incluye',
        bullets: [
          'Configuración en plataforma tipo High Lead o Go High Level.',
          'CRM conectado a canales (WhatsApp, Facebook, Instagram y widget web).',
          'Entrenamiento del agente con info del negocio + calendario para agendar + automatización del proceso interno de ventas.',
        ],
        note: 'Tiempo de implementación referenciado: 1 a 2 días hábiles. Nota operativa: requiere la suscripción/uso de la plataforma (costo mensual típico pagado directo al proveedor de la herramienta).',
      },
      {
        id: 'embudos',
        label: 'Embudos',
        title: '2) Embudos y automatizaciones (para captación y cierre)',
        body: 'Incluye',
        bullets: [
          'Landing page + automatización del embudo.',
          'Calendario de citas.',
          'Secuencia inicial de 3 correos + formulario y configuración de API/form de Facebook.',
        ],
      },
      {
        id: 'apps',
        label: 'Apps a la medida',
        title: '3) APPS (desarrollo a la medida)',
        body: 'En el sitio fuente no aparece “Apps” como servicio separado; para QUANTUM lo correcto es ofrecerlo como desarrollo a medida, normalmente en estos frentes:',
        bullets: [
          'Portales internos (ventas/operación), dashboards, paneles de control.',
          'Integraciones (CRM ↔ WhatsApp/Meta ↔ sitio ↔ Google Sheets/ERP).',
          'Automatizaciones “sin tocar código” o con backend cuando se requiera.',
        ],
        note: 'Esto se cotiza y define por alcance (MVP, integraciones, usuarios, seguridad, SLAs). (Se crea basándonos en la lógica del ecosistema IA/CRM/embudos anterior.)',
      },
    ],
  },
  tabsAlign: 'center',
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

export default function AppsIA() {
  return <ServiceTemplate config={config} />
}
