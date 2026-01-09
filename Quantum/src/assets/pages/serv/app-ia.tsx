import ServiceTemplate, {
  type ServiceTemplateConfig,
} from '../../../components/services/ServiceTemplate'

const config: ServiceTemplateConfig = {
  title: 'Apps & I.A.',
  titleSvgSrc: '/svg/text/Apps-text.svg',
  sections: [
    {
      id: 'que-resuelve',
      title: 'Qué resuelve',
      body: 'Automatización de atención y ventas (24/7) + sistemas de seguimiento (CRM) + embudos que convierten leads en citas/ventas.',
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
}

export default function AppsIA() {
  return <ServiceTemplate config={config} />
}
