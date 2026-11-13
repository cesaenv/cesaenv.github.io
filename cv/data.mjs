// Contenido del CV en los dos idiomas. Edita aquí y ejecuta `npm run cv`.
export const cv = {
  es: {
    file: 'celia-saenz-cv-es.pdf',
    lang: 'es',
    name: 'Celia Sáenz Villalta',
    role: 'QA Engineer',
    location: 'Logroño, España',
    photoAlt: 'Foto de Celia Sáenz Villalta',
    contactTitle: 'Contacto',
    profileTitle: 'Perfil',
    profile: [
      'Elegí Ingeniería Informática frente a Matemáticas y encontré en ella lo que el ajedrez me había enseñado: toma de decisiones, resolución de problemas y aprendizaje continuo.',
      'Hoy me centro en la integración continua: flujos de CI/CD que verifican automáticamente que los proyectos funcionan. También investigo nuevas herramientas para añadir funcionalidades y mejoras, porque la tecnología avanza más rápido que nunca.',
    ],
    experienceTitle: 'Experiencia',
    experience: [
      {
        title: 'QA Engineer',
        company: 'Arsys',
        dates: 'jun. 2025 – actualidad',
        tasks: [
          'Suites E2E con Playwright y TypeScript sobre una librería compartida (page objects, clientes de API) publicada como paquete.',
          'Regresión programada contra producción, con los resultados publicados como eventos en Kafka.',
          'Pipelines y plantillas compartidas en Woodpecker CI; jobs de Jenkins y entornos de prueba con Docker.',
          'Plataforma de QA en k3s con GitOps (FluxCD y Helm): del merge al despliegue en unos 90 s.',
          'Dashboards en Grafana con el estado de las pruebas.',
          'Validadores asistidos por IA y pruebas de concepto de nuevas herramientas.',
          'Automatización de procesos manuales a partir de grabaciones del navegador, con Claude y MCP.',
        ],
      },
      {
        title: 'Trabajo de Fin de Grado',
        company: 'Arsys',
        dates: 'feb. 2025 – may. 2025',
        tasks: [
          'Desarrollo de un frontend para la suite de pruebas del equipo de QA.',
          'Redacción de la documentación técnica del TFG.',
        ],
      },
      {
        title: 'QA Tester en sistemas de negocio · Prácticas',
        company: 'Arsys',
        dates: 'sept. 2024 – dic. 2024',
        tasks: [
          'Automatización y ejecución de pruebas manuales y automatizadas sobre sistemas de negocio.',
          'Detección de mejoras en los procesos de calidad y reporte de resultados a QA y desarrollo.',
          'Reuniones de planificación, retrospectivas y coordinación internacional.',
        ],
      },
    ],
    educationTitle: 'Formación',
    education: [
      { title: 'Máster en Data Science and Machine Learning', place: 'Universidad de La Rioja', dates: '2026 – 2028' },
      { title: 'Grado en Ingeniería Informática', place: 'Universidad de La Rioja', dates: '2021 – 2025' },
    ],
    skillsTitle: 'Competencias técnicas',
    skills: [
      ['Lenguajes', 'TypeScript, Python, Java, Go, Rust, Bash'],
      ['Testing', 'Playwright, Pytest'],
      ['CI/CD y plataforma', 'Woodpecker CI, Jenkins, Docker, Kubernetes, k3s, FluxCD, Helm'],
      ['Datos', 'Postgres, Kafka, Grafana'],
      ['IA', 'Claude, MCP'],
    ],
    languagesTitle: 'Idiomas',
    languages: [
      ['Español', 'nativo'],
      ['Inglés', 'medio'],
    ],
  },
  en: {
    file: 'celia-saenz-cv-en.pdf',
    lang: 'en',
    name: 'Celia Sáenz Villalta',
    role: 'QA Engineer',
    location: 'Logroño, Spain',
    photoAlt: 'Photo of Celia Sáenz Villalta',
    contactTitle: 'Contact',
    profileTitle: 'Profile',
    profile: [
      'I chose Computer Engineering over Mathematics and found in it what chess had taught me: decision-making, problem solving and continuous learning.',
      'Today I focus on continuous integration: CI/CD pipelines that automatically verify that projects work. I also research new tools to add features and improvements, as technology is moving faster than ever.',
    ],
    experienceTitle: 'Experience',
    experience: [
      {
        title: 'QA Engineer',
        company: 'Arsys',
        dates: 'Jun 2025 – present',
        tasks: [
          'E2E suites with Playwright and TypeScript on a shared library (page objects, API clients) published as a package.',
          'Scheduled regression against production, with results published as events to Kafka.',
          'Shared pipelines and templates in Woodpecker CI; Jenkins jobs and Docker test environments.',
          'QA platform on k3s with GitOps (FluxCD and Helm): from merge to deployment in about 90 s.',
          'Grafana dashboards showing the state of the tests.',
          'AI-assisted validators and proofs of concept for new tools.',
          'Automating manual processes from browser recordings, with Claude and MCP.',
        ],
      },
      {
        title: 'Final degree project',
        company: 'Arsys',
        dates: 'Feb 2025 – May 2025',
        tasks: [
          "Development of a frontend for the QA team's test suite.",
          'Technical documentation for the project.',
        ],
      },
      {
        title: 'Business Systems QA Tester · Internship',
        company: 'Arsys',
        dates: 'Sep 2024 – Dec 2024',
        tasks: [
          'Automated and manual testing of business systems.',
          'Spotting improvements in quality processes and reporting results to QA and development.',
          'Planning meetings, retrospectives and international coordination.',
        ],
      },
    ],
    educationTitle: 'Education',
    education: [
      { title: "Master's in Data Science and Machine Learning", place: 'University of La Rioja', dates: '2026 – 2028' },
      { title: "Bachelor's in Computer Engineering", place: 'University of La Rioja', dates: '2021 – 2025' },
    ],
    skillsTitle: 'Technical skills',
    skills: [
      ['Languages', 'TypeScript, Python, Java, Go, Rust, Bash'],
      ['Testing', 'Playwright, Pytest'],
      ['CI/CD and platform', 'Woodpecker CI, Jenkins, Docker, Kubernetes, k3s, FluxCD, Helm'],
      ['Data', 'Postgres, Kafka, Grafana'],
      ['AI', 'Claude, MCP'],
    ],
    languagesTitle: 'Languages',
    languages: [
      ['Spanish', 'native'],
      ['English', 'intermediate'],
    ],
  },
};

export const contact = [
  { icon: 'email', text: 'saenzvillaltacelia@gmail.com', href: 'mailto:saenzvillaltacelia@gmail.com' },
  { icon: 'linkedin', text: 'linkedin.com/in/celia-sáenz-villalta', href: 'https://www.linkedin.com/in/celia-s%C3%A1enz-villalta-446840325/' },
  { icon: 'github', text: 'github.com/cesaenv', href: 'https://github.com/cesaenv' },
  { icon: 'web', text: 'cesaenv.github.io', href: 'https://cesaenv.github.io/' },
];
