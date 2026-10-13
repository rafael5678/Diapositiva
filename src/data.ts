export interface PovertyData {
  hero: {
    title: string;
    subtitle: string;
    year: string;
    source: string;
  };
  definition: {
    tag: string;
    quote: string;
    description: string;
    pillars: string[];
  };
  types: Array<{
    id: string;
    title: string;
    amount?: string;
    badge: string;
    description: string;
    details: string;
    accent: string;
  }>;
  measurement: Array<{
    id: string;
    label: string;
    value: number;
    unit: string;
    formatted: string;
    description: string;
    detail: string;
  }>;
  causes: {
    keyMetrics: Array<{
      percentage: string;
      label: string;
      detail: string;
    }>;
    tags: string[];
  };
  consequences: Array<{
    step: string;
    title: string;
    desc: string;
    impact: string;
  }>;
  ruralUrban: {
    urban: {
      monetary: number;
      extreme: number;
      multidimensional: number;
    };
    rural: {
      monetary: number;
      extreme: number;
      multidimensional: number;
    };
  };
  colombia: {
    current: number;
    previous: number;
    extreme: number;
    multidimensional: number;
    cities: {
      high: { name: string; value: number };
      low: { name: string; value: number };
    };
  };
  programs: Array<{
    name: string;
    coverage: string;
    description: string;
    focus: string;
  }>;
  solutions: Array<{
    id: string;
    title: string;
    desc: string;
    action: string;
    icon: string;
  }>;
  conclusions: {
    headline: string;
    metrics: Array<{
      value: string;
      label: string;
      desc: string;
    }>;
    brandWord: string;
    sourceCredits: string;
  };
}

export const POVERTY_DATA: PovertyData = {
  hero: {
    title: "LA POBREZA",
    subtitle: "Qué es, por qué ocurre y qué podemos hacer. Colombia 2025.",
    year: "COLOMBIA 2025",
    source: "DEPARTAMENTO ADMINISTRATIVO NACIONAL DE ESTADÍSTICA (DANE)",
  },
  definition: {
    tag: "01 // CONCEPTO FUNDAMENTAL",
    quote: "Es no poder elegir una vida digna.",
    description:
      "La pobreza no es únicamente la ausencia de dinero: es la privación sistemática de capacidades y libertades básicas. Implica no tener ingresos suficientes y carecer de acceso efectivo a una alimentación balanceada, salud de calidad, educación pertinente, vivienda digna y trabajo decente.",
    pillars: ["ALIMENTACIÓN", "SALUD", "EDUCACIÓN", "VIVIENDA", "TRABAJO DECENTE"],
  },
  types: [
    {
      id: "monetaria",
      title: "Pobreza Monetaria",
      amount: "$482.041",
      badge: "Línea por persona / mes",
      description: "Personas cuyos ingresos mensuales no alcanzan para adquirir la canasta básica de alimentos y servicios esenciales.",
      details: "Define el umbral mínimo indispensable para la supervivencia digna en las ciudades y campos colombianos.",
      accent: "#E27B38",
    },
    {
      id: "extrema",
      title: "Pobreza Extrema",
      amount: "$236.580",
      badge: "Línea extrema / mes",
      description: "Hogares cuyos ingresos no cubren ni siquiera el costo mínimo calórico para no padecer desnutrición.",
      details: "Solo alcanza para una fracción de alimentos básicos; excluye transporte, vestimenta y servicios.",
      accent: "#E63946",
    },
    {
      id: "multidimensional",
      title: "Multidimensional",
      badge: "IPM DANE",
      description: "Mide las carencias directas en las condiciones reales de vida del hogar.",
      details: "Evalúa 5 dimensiones estructurales y 15 indicadores críticos del bienestar familiar.",
      accent: "#2A9D8F",
    },
    {
      id: "oculta",
      title: "Pobreza Oculta",
      badge: "Vulnerabilidad No Captada",
      description: "Familias de estratos medios que han perdido capacidad de ingreso pero conservan activos o vivienda.",
      details: "No acceden a programas sociales estatales por residir en áreas no focalizadas, viviendo privaciones silenciosas.",
      accent: "#9D4EDD",
    },
  ],
  measurement: [
    {
      id: "monetaria",
      label: "Pobreza Monetaria",
      value: 28.0,
      unit: "%",
      formatted: "28,0%",
      description: "De la población en Colombia subsiste con ingresos por debajo de la línea de pobreza.",
      detail: "Aproximadamente 14,4 millones de colombianos.",
    },
    {
      id: "multidimensional",
      label: "Multidimensional (IPM)",
      value: 9.9,
      unit: "%",
      formatted: "9,9%",
      description: "De los hogares sufre privaciones críticas simultáneas en salud, educación y vivienda.",
      detail: "Baja histórica gracias a acceso a servicios básicos.",
    },
    {
      id: "gini",
      label: "Coeficiente de Gini",
      value: 0.531,
      unit: "",
      formatted: "0,531",
      description: "Índice de desigualdad en la distribución del ingreso (0 = igualdad total, 1 = desigualdad absoluta).",
      detail: "Uno de los niveles de concentración más altos de la OCDE.",
    },
  ],
  causes: {
    keyMetrics: [
      {
        percentage: "35,9%",
        label: "EDUCACIÓN",
        detail: "Principal factor de privación multidimensional: bajo logro escolar y analfabetismo.",
      },
      {
        percentage: "29,6%",
        label: "TRABAJO",
        detail: "Segundo mayor peso: desempleo de larga duración, informalidad y desprotección laboral.",
      },
    ],
    tags: [
      "Desigualdad estructural",
      "Informalidad laboral (55%+)",
      "Brechas territoriales y regionales",
      "Conflicto armado histórico",
      "Desplazamiento forzado",
      "Baja productividad",
      "Barreras de acceso al crédito",
    ],
  },
  consequences: [
    {
      step: "01",
      title: "Hambre y mala salud",
      desc: "Desnutrición infantil y enfermedades crónicas sin cobertura médica adecuada.",
      impact: "Reduce la capacidad cognitiva y física desde los primeros años de vida.",
    },
    {
      step: "02",
      title: "Deserción escolar",
      desc: "Los jóvenes abandonan las aulas para aportar ingresos de emergencia al hogar.",
      impact: "Truncamiento prematuro del capital humano y habilidades técnicas.",
    },
    {
      step: "03",
      title: "Empleo informal",
      desc: "Ingreso al rebusque diario sin contratos, sin seguridad social ni cesantías.",
      impact: "Vulnerabilidad total ante cualquier crisis económica o enfermedad.",
    },
    {
      step: "04",
      title: "Ingresos bajos",
      desc: "Remuneraciones precarias que impiden el ahorro, inversión o adquisición de patrimonio.",
      impact: "Incapacidad de superar la línea de pobreza monetaria.",
    },
    {
      step: "05",
      title: "Pobreza heredada",
      desc: "La siguiente generación nace en el mismo entorno de privaciones crónicas.",
      impact: "La trampa de pobreza se cierra y el ciclo se reinicia indefinidamente.",
    },
  ],
  ruralUrban: {
    urban: {
      monetary: 24.6,
      extreme: 6.9,
      multidimensional: 6.3,
    },
    rural: {
      monetary: 39.5,
      extreme: 19.1,
      multidimensional: 22.4,
    },
  },
  colombia: {
    current: 28.0,
    previous: 31.8,
    extreme: 9.6,
    multidimensional: 9.9,
    cities: {
      high: { name: "Quibdó", value: 61.7 },
      low: { name: "Manizales", value: 13.2 },
    },
  },
  programs: [
    {
      name: "Renta Ciudadana",
      coverage: "Madres cabeza de hogar y extrema pobreza",
      description: "Transferencia monetaria condicionada prioritaria de hasta $500.000 para superar la línea de indigencia calórica.",
      focus: "Nutrición y primera infancia",
    },
    {
      name: "Familias en Acción",
      coverage: "Millones de hogares en vulnerabilidad",
      description: "Incentivo económico condicionado a la asistencia escolar y controles de salud pediátricos.",
      focus: "Permanencia educativa",
    },
    {
      name: "Jóvenes en Acción",
      coverage: "Estudiantes técnicos, tecnológicos y universitarios",
      description: "Apoyo para el sostenimiento durante estudios de educación superior con miras a romper la trampa de pobreza.",
      focus: "Movilidad social",
    },
    {
      name: "Colombia Mayor",
      coverage: "Adultos mayores sin pensión",
      description: "Subsidio mensual para personas de la tercera edad desamparadas y sin ingresos de jubilación.",
      focus: "Dignidad en la vejez",
    },
    {
      name: "Devolución del IVA",
      coverage: "Hogares Sisbén A y B",
      description: "Compensación económica para mitigar el impacto regresivo del impuesto al valor agregado en el consumo básico.",
      focus: "Alivio fiscal al consumo",
    },
  ],
  solutions: [
    {
      id: "sol-1",
      title: "Empleo Formal",
      desc: "Transformar el mercado laboral formalizando unidades productivas y reduciendo costos no salariales para MiPymes.",
      action: "Seguridad social y salarios justos",
      icon: "Briefcase",
    },
    {
      id: "sol-2",
      title: "Educación de Calidad",
      desc: "Infraestructura escolar rural, jornada única y pertinencia técnica conectada a sectores de alto valor agregado.",
      action: "Cierre de la brecha del 35,9%",
      icon: "GraduationCap",
    },
    {
      id: "sol-3",
      title: "Reforma al Campo",
      desc: "Vías terciarias, distritos de riego, créditos agrarios y titularización de tierras a familias campesinas.",
      action: "Equiparar la brecha rural 39,5%",
      icon: "Sprout",
    },
    {
      id: "sol-4",
      title: "Transferencias Focalizadas",
      desc: "Subsidios inteligentes no clientelares con condicionamientos verificables y puertas de graduación hacia el empleo.",
      action: "Piso de protección social",
      icon: "Coins",
    },
    {
      id: "sol-5",
      title: "Servicios Básicos Universales",
      desc: "Agua potable 24/7, alcantarillado, conectividad digital y saneamiento en todos los municipios del país.",
      action: "Erradicación del IPM",
      icon: "Droplets",
    },
    {
      id: "sol-6",
      title: "Impuestos Progresivos",
      desc: "Tributación directa sobre rentas altas y patrimonios improductivos para financiar inversión social sin asfixiar la inversión.",
      action: "Reducción del Gini 0,531",
      icon: "Scale",
    },
  ],
  conclusions: {
    headline: "La pobreza bajó. El campo sigue atrás.",
    metrics: [
      {
        value: "28,0%",
        label: "Pobreza Monetaria Nacional",
        desc: "Reducción respecto al 31,8% del año anterior.",
      },
      {
        value: "3,6×",
        label: "Brecha Multidimensional Rural/Urbana",
        desc: "22,4% rural frente a 6,3% en grandes ciudades.",
      },
      {
        value: "2/3",
        label: "Población de Quibdó en Pobreza",
        desc: "61,7% evidencia la profunda deuda regional histórica.",
      },
    ],
    brandWord: "DIGNIDAD",
    sourceCredits: "Datos oficiales certificados por el DANE (Gran Encuesta Integrada de Hogares 2024-2025). Diseñado para visualización cinematográfica.",
  },
};
