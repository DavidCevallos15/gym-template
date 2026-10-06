/**
 * site.config.ts — ÚNICO archivo a editar para adaptar el template a cada gimnasio.
 * Textos, precios, horarios, coaches y fotos salen de aquí.
 * Para usar fotos reales: coloca el archivo en /public/assets/... y llena `src`.
 */

export type PhotoSlot = {
  /** Ruta de la foto real. Vacío → se muestra el placeholder duotono. */
  src?: string;
  alt: string;
  /** Encuadre sugerido que se muestra en el placeholder. */
  hint: string;
};

export type ProgramCategory = 'fuerza' | 'cardio' | 'movilidad';

export const site = {
  brand: {
    name: 'Gimnasio Fitness',
    short: 'FITNESS',
    tagline: 'Club de alto rendimiento',
    city: 'Portoviejo, Ecuador',
  },

  nav: [
    { label: 'Programas', href: '#programas' },
    { label: 'Coaches', href: '#coaches' },
    { label: 'Planes', href: '#planes' },
    { label: 'Horarios', href: '#horarios' },
    { label: 'FAQ', href: '#faq' },
  ],

  contact: {
    whatsapp: '593990000000', // sin + ni espacios
    whatsappMsg: 'Hola, quiero agendar mi clase de prueba en Gimnasio Fitness',
    phone: '+593 99 000 0000',
    email: 'hola@gimnasiofitness.ec',
    address: 'Av. Principal y Calle 10, Portoviejo',
    hours: 'Lun–Vie 05:00–22:00 · Sáb 07:00–14:00',
    instagram: 'https://instagram.com/',
    tiktok: 'https://tiktok.com/',
  },

  hero: {
    eyebrow: 'Club de entrenamiento · Portoviejo',
    lines: ['Define', 'tu', 'poder.'],
    accentLine: 1, // índice de la línea en verde
    copy: 'Entrena en un ambiente de alto rendimiento diseñado para la fuerza, la confianza, el progreso medible y la recuperación.',
    primaryCta: 'Empieza hoy',
    secondaryCta: 'Explorar el club',
    photo: { alt: 'Atleta entrenando con barra bajo luz azul', hint: 'Atleta en movimiento · luz azul lateral · 16:9' } as PhotoSlot,
    stats: [
      { value: 1200, suffix: '+', label: 'Miembros activos' },
      { value: 18, suffix: '', label: 'Coaches certificados' },
      { value: 96, suffix: '%', label: 'Cumplen su meta' },
    ],
    cards: [
      { title: 'Construye sin parar', tags: 'Fuerza · Acondicionamiento · Recuperación' },
      { title: 'Progreso medible', tags: 'Evaluaciones · Métricas · Seguimiento' },
      { title: 'Coaching real', tags: 'Planes 1:1 · Técnica · Nutrición' },
      { title: 'Comunidad que empuja', tags: 'Clases grupales · Retos · Eventos' },
    ],
  },

  marquee: ['Gimnasio Fitness', 'Entrena más duro', 'Vive más fuerte', 'Define tu poder', 'Sin excusas'],

  standard: {
    index: '01',
    label: 'El estándar',
    title: ['No es un gimnasio.', 'Es un estándar.'],
    copy: 'Un club de entrenamiento premium donde la programación inteligente se une al coaching serio. Para principiantes, atletas y cualquiera comprometido con volverse más difícil de detener.',
    pillars: [
      { n: '01', title: 'Rendimiento', copy: 'Programas diseñados alrededor de tu objetivo, no de una rutina genérica.' },
      { n: '02', title: 'Comunidad', copy: 'Gente que te empuja a dar más y celebra cada récord personal.' },
      { n: '03', title: 'Recuperación', copy: 'Movilidad, descanso y acondicionamiento integrados en cada semana.' },
    ],
  },

  programs: {
    index: '02',
    label: 'Sistema de entrenamiento',
    title: ['Elige tu', 'misión.'],
    filters: [
      { id: 'todos', label: 'Todos' },
      { id: 'fuerza', label: 'Fuerza' },
      { id: 'cardio', label: 'Acondicionamiento' },
      { id: 'movilidad', label: 'Movilidad' },
    ],
    items: [
      { n: '01', name: 'Iron Forge', meta: 'Fuerza progresiva · 60 min', cat: 'fuerza' },
      { n: '02', name: 'Fitness HIIT', meta: 'Acondicionamiento metabólico · 45 min', cat: 'cardio' },
      { n: '03', name: 'Athlete Build', meta: 'Potencia y atletismo · 75 min', cat: 'fuerza' },
      { n: '04', name: 'Reset / Movilidad', meta: 'Movilidad y recuperación · 50 min', cat: 'movilidad' },
      { n: '05', name: 'Engine Room', meta: 'Cardio de alta capacidad · 40 min', cat: 'cardio' },
      { n: '06', name: 'Core Control', meta: 'Core y estabilidad · 30 min', cat: 'movilidad' },
    ] as { n: string; name: string; meta: string; cat: ProgramCategory }[],
  },

  women: {
    label: 'Mujeres Fitness',
    title: ['La fuerza', 'se ve', 'diferente.'],
    copy: 'Seguras, atléticas y fuertes sin disculpas. Coaching dedicado, sesiones para principiantes y programación de alto rendimiento para mujeres.',
    stats: [
      { value: '4.9/5', label: 'Calificación' },
      { value: '18+', label: 'Programas' },
      { value: '1:1', label: 'Coaching' },
    ],
    cta: 'Conoce Mujeres Fitness',
    photo: { alt: 'Atleta mujer en el gimnasio', hint: 'Retrato atleta mujer · vertical 4:5 · fondo oscuro' } as PhotoSlot,
  },

  coaches: {
    index: '03',
    label: 'Coaching élite',
    title: ['Conoce a los', 'coaches.'],
    copy: 'Coaching real. Responsabilidad real. Cero planes copiados y pegados.',
    items: [
      { name: 'Andrea Molina', role: 'Fuerza', meta: 'Performance coach · 8 años', photo: { alt: 'Coach Andrea Molina', hint: 'Coach con barra · 3:4' } as PhotoSlot },
      { name: 'Carla Zambrano', role: 'Acondicionamiento', meta: 'HIIT & conditioning · 7 años', photo: { alt: 'Coach Carla Zambrano', hint: 'Coach con cuerdas · 3:4' } as PhotoSlot },
      { name: 'Diego Vera', role: 'Rendimiento atlético', meta: 'Strength coach · 6 años', photo: { alt: 'Coach Diego Vera', hint: 'Coach con mancuernas · 3:4' } as PhotoSlot },
    ],
  },

  data: {
    label: 'Miembro Fitness 01',
    title: ['Tu cuerpo.', 'Tus datos.'],
    copy: 'Una capa digital de progreso que convierte tu membresía en un panel de rendimiento vivo.',
    ring: 78,
    ringLabel: 'Meta mensual',
    delta: '+12.4%',
    bars: [38, 52, 44, 66, 58, 80, 72, 92],
    primaryCta: 'Ver demo de progreso',
    secondaryCta: 'Obtén tu plan',
  },

  lab: {
    index: '04',
    label: 'Laboratorio',
    title: ['Mide.', 'Ajusta.', 'Evoluciona.'],
    copy: 'Herramientas interactivas para tu próxima decisión de entrenamiento.',
    photo: { alt: 'Atleta concentrada antes de levantar', hint: 'Primer plano atleta · 3:4' } as PhotoSlot,
    goals: [
      { id: 'fuerza', label: 'Fuerza', track: 'IRON FORGE — 3 sesiones de fuerza + 1 de acondicionamiento por semana' },
      { id: 'grasa', label: 'Perder grasa', track: 'FITNESS HIIT — 3 sesiones metabólicas + 2 de fuerza por semana' },
      { id: 'rendimiento', label: 'Rendimiento', track: 'ATHLETE BUILD — 4 sesiones de potencia + 1 de movilidad' },
      { id: 'salud', label: 'Salud', track: 'CORE CONTROL — 2 sesiones de fuerza + 2 de movilidad y cardio' },
    ],
  },

  pricing: {
    index: '05',
    label: 'Membresías',
    title: ['Tu acceso.', 'Tus reglas.'],
    annualDiscount: 0.2,
    currency: '$',
    plans: [
      { id: 'base', tag: '01 · Esencial', name: 'Base', copy: 'Todo lo que necesitas para construir el hábito.', monthly: 29, features: ['Acceso al gimnasio 6 días', 'Clases grupales', 'Evaluación inicial', 'App de miembro'], featured: false },
      { id: 'pro', tag: '02 · Rendimiento', name: 'Pro', copy: 'Para quien quiere progreso guiado y medible.', monthly: 45, features: ['Todo lo de Base', '4 sesiones de coaching al mes', 'Plan de entrenamiento personalizado', 'Evaluación de composición corporal'], featured: true },
      { id: 'elite', tag: '03 · Élite', name: 'Élite', copy: 'Alto rendimiento con acompañamiento total.', monthly: 79, features: ['Todo lo de Pro', 'Coaching 1:1 ilimitado', 'Guía de nutrición', 'Reservas prioritarias'], featured: false },
    ],
  },

  schedule: {
    index: '06',
    label: 'Horario en vivo',
    title: ['Planifica tu', 'semana.'],
    days: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    /** Clases por día (índice = día). */
    classes: [
      [{ t: '06:00', n: 'Iron Forge', c: 'Andrea · Fuerza' }, { t: '07:30', n: 'Fitness HIIT', c: 'Carla · HIIT' }, { t: '18:00', n: 'Athlete Build', c: 'Diego · Potencia' }, { t: '19:30', n: 'Reset / Movilidad', c: 'Andrea · Movilidad' }],
      [{ t: '06:00', n: 'Engine Room', c: 'Carla · Cardio' }, { t: '12:30', n: 'Core Control', c: 'Diego · Core' }, { t: '18:00', n: 'Iron Forge', c: 'Andrea · Fuerza' }, { t: '19:30', n: 'Fitness HIIT', c: 'Carla · HIIT' }],
      [{ t: '06:00', n: 'Athlete Build', c: 'Diego · Potencia' }, { t: '07:30', n: 'Reset / Movilidad', c: 'Andrea · Movilidad' }, { t: '18:00', n: 'Engine Room', c: 'Carla · Cardio' }, { t: '19:30', n: 'Iron Forge', c: 'Andrea · Fuerza' }],
      [{ t: '06:00', n: 'Fitness HIIT', c: 'Carla · HIIT' }, { t: '12:30', n: 'Iron Forge', c: 'Andrea · Fuerza' }, { t: '18:00', n: 'Core Control', c: 'Diego · Core' }, { t: '19:30', n: 'Athlete Build', c: 'Diego · Potencia' }],
      [{ t: '06:00', n: 'Iron Forge', c: 'Andrea · Fuerza' }, { t: '07:30', n: 'Engine Room', c: 'Carla · Cardio' }, { t: '18:00', n: 'Fitness HIIT', c: 'Carla · HIIT' }, { t: '19:30', n: 'Reset / Movilidad', c: 'Andrea · Movilidad' }],
      [{ t: '08:00', n: 'Athlete Build', c: 'Diego · Potencia' }, { t: '09:30', n: 'Fitness HIIT', c: 'Carla · HIIT' }, { t: '11:00', n: 'Reset / Movilidad', c: 'Andrea · Movilidad' }],
    ],
  },

  tools: {
    index: '07',
    label: 'Herramientas',
    quotes: [
      'La disciplina es una forma de respeto propio.',
      'No se trata de motivación, se trata de constancia.',
      'El dolor de hoy es la fuerza de mañana.',
      'Tu único rival es quien fuiste ayer.',
    ],
  },

  gallery: {
    label: 'Fitness / Entrenamiento real',
    title: ['La', 'energía.'],
    copy: 'Momentos de entrenamiento de alto contraste, movimiento real y un ambiente diseñado para que quieras volver.',
    photos: [
      { alt: 'Atleta con barra', hint: 'Sentadilla con barra' },
      { alt: 'Mancuernas en el rack', hint: 'Detalle mancuernas' },
      { alt: 'Entrenamiento con barra', hint: 'Press con barra' },
      { alt: 'Atleta descansando', hint: 'Pausa entre series' },
      { alt: 'Remo con mancuerna', hint: 'Remo con mancuerna' },
      { alt: 'Brazos entrenando', hint: 'Detalle músculo' },
      { alt: 'Clase grupal', hint: 'Clase grupal' },
    ] as PhotoSlot[],
  },

  testimonials: {
    index: '08',
    label: 'Señal de miembros',
    items: [
      { quote: 'Gimnasio Fitness cambió mi forma de entrenar. Dejé de perseguir rutinas y empecé a perseguir progreso medible.', name: 'María José P.', meta: 'Miembro desde 2024 · Plan Pro' },
      { quote: 'En seis meses subí 40 kg en mi peso muerto. Los coaches saben exactamente cuándo empujarte.', name: 'Andrés L.', meta: 'Miembro desde 2023 · Plan Élite' },
      { quote: 'Llegué sin experiencia y nunca me sentí fuera de lugar. Ahora entreno cinco días por semana.', name: 'Valeria C.', meta: 'Miembro desde 2025 · Plan Base' },
    ],
  },

  faq: {
    label: 'Preguntas',
    title: ['Sin', 'adivinanzas.'],
    items: [
      { q: '¿Puedo probar antes de inscribirme?', a: 'Sí. Tu primera clase es gratis: agenda por WhatsApp, haz una evaluación rápida con un coach y entrena con el grupo.' },
      { q: '¿Tienen entrenamiento solo para mujeres?', a: 'Sí. Mujeres Fitness tiene horarios y coaches dedicados, desde nivel principiante hasta alto rendimiento.' },
      { q: '¿Puedo cambiar de plan después?', a: 'Puedes subir o bajar de plan en cualquier momento; el cambio se aplica en tu siguiente ciclo de pago.' },
      { q: '¿Cómo reservo mi lugar en una clase?', a: 'Desde el horario semanal de esta página o por WhatsApp. Los miembros Élite tienen reserva prioritaria.' },
    ],
  },

  cta: {
    label: 'Listo cuando tú lo estés',
    title: ['Define', 'tu poder.'],
    copy: 'Empieza con una conversación. Sal con un plan.',
    button: 'Agenda tu clase gratis',
  },

  footer: {
    blurb: 'Club de entrenamiento de alto rendimiento.',
    columns: [
      { title: 'Explorar', links: [{ label: 'Programas', href: '#programas' }, { label: 'Coaches', href: '#coaches' }, { label: 'Membresías', href: '#planes' }] },
      { title: 'Visítanos', lines: ['Lun–Vie 05:00–22:00', 'Sáb 07:00–14:00', 'Av. Principal y Calle 10'] },
    ],
  },
} as const;

export const whatsappHref = (msg: string = site.contact.whatsappMsg) =>
  `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(msg)}`;
