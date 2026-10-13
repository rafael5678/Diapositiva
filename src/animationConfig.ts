export interface SectionConfig {
  id: string;
  name: string;
  number: string;
  bgColor: string;
  bgGradient: string;
  textColor: string;
  accentColor: string;
  object3D: {
    position: [number, number, number];
    rotation: [number, number, number];
    scale: number;
    lightColor?: string;
  };
}

export const SECTIONS: SectionConfig[] = [
  {
    id: "hero",
    name: "Introducción",
    number: "01",
    bgColor: "#0c0806",
    bgGradient: "radial-gradient(ellipse at 50% 40%, rgba(226, 123, 56, 0.22) 0%, rgba(12, 8, 6, 0.95) 70%, #060403 100%)",
    textColor: "#F4ECE1",
    accentColor: "#E27B38",
    object3D: {
      position: [0, 0, 0],
      rotation: [0.3, 0.6, 0],
      scale: 1.15,
      lightColor: "#ffa25f",
    },
  },
  {
    id: "definition",
    name: "La Pobreza",
    number: "02",
    bgColor: "#14091f",
    bgGradient: "radial-gradient(ellipse at 75% 50%, rgba(157, 78, 221, 0.25) 0%, rgba(20, 9, 31, 0.95) 70%, #0b0512 100%)",
    textColor: "#F5EEFA",
    accentColor: "#C77DFF",
    object3D: {
      position: [1.8, -0.1, -0.5],
      rotation: [0.6, 1.8, 0.3],
      scale: 1.25,
      lightColor: "#c77dff",
    },
  },
  {
    id: "types",
    name: "Tipos de Pobreza",
    number: "03",
    bgColor: "#0d141e",
    bgGradient: "radial-gradient(ellipse at 30% 60%, rgba(42, 157, 143, 0.22) 0%, rgba(13, 20, 30, 0.95) 75%, #060b11 100%)",
    textColor: "#EAF2F1",
    accentColor: "#2A9D8F",
    object3D: {
      position: [0, 1.85, -1.8],
      rotation: [-0.4, 2.5, -0.2],
      scale: 1.2,
      lightColor: "#48cae4",
    },
  },
  {
    id: "measurement",
    name: "Cómo se Mide",
    number: "04",
    bgColor: "#081813",
    bgGradient: "radial-gradient(ellipse at 50% 50%, rgba(76, 201, 140, 0.2) 0%, rgba(8, 24, 19, 0.95) 70%, #030d0a 100%)",
    textColor: "#ECF9F2",
    accentColor: "#4CC98C",
    object3D: {
      position: [0, 0.4, -0.6],
      rotation: [0.8, 3.4, 0.1],
      scale: 0.95,
      lightColor: "#52b788",
    },
  },
  {
    id: "causes",
    name: "Causas",
    number: "05",
    bgColor: "#1f090b",
    bgGradient: "radial-gradient(ellipse at 60% 40%, rgba(230, 57, 70, 0.25) 0%, rgba(31, 9, 11, 0.95) 70%, #0f0304 100%)",
    textColor: "#FAECEE",
    accentColor: "#E63946",
    object3D: {
      position: [1.7, -0.3, -0.4],
      rotation: [0.2, 4.3, 0.5],
      scale: 1.2,
      lightColor: "#ff758f",
    },
  },
  {
    id: "consequences",
    name: "Consecuencias",
    number: "06",
    bgColor: "#160b26",
    bgGradient: "radial-gradient(ellipse at 50% 50%, rgba(181, 23, 158, 0.25) 0%, rgba(22, 11, 38, 0.95) 70%, #0a0413 100%)",
    textColor: "#F7EEFB",
    accentColor: "#B5179E",
    object3D: {
      position: [0, -1.2, 0.2],
      rotation: [-0.5, 5.2, 0.1],
      scale: 1.35,
      lightColor: "#f72585",
    },
  },
  {
    id: "ruralUrban",
    name: "Rural vs Urbana",
    number: "07",
    bgColor: "#130f0c",
    bgGradient: "linear-gradient(90deg, rgba(16,18,22,1) 0%, rgba(19,15,12,1) 50%, rgba(42,23,8,0.95) 100%)",
    textColor: "#F7EFE8",
    accentColor: "#E27B38",
    object3D: {
      position: [0, 0, 0.2],
      rotation: [0.0, 6.2, 0.4],
      scale: 1.3,
      lightColor: "#e27b38",
    },
  },
  {
    id: "colombia",
    name: "Pobreza Nacional",
    number: "08",
    bgColor: "#080b12",
    bgGradient: "radial-gradient(ellipse at 40% 50%, rgba(67, 97, 238, 0.22) 0%, rgba(8, 11, 18, 0.95) 70%, #030508 100%)",
    textColor: "#EDF2FB",
    accentColor: "#4361EE",
    object3D: {
      position: [-1.7, 0.3, -0.3],
      rotation: [0.4, 7.3, -0.3],
      scale: 1.2,
      lightColor: "#4895ef",
    },
  },
  {
    id: "programs",
    name: "Programas Estatales",
    number: "09",
    bgColor: "#091419",
    bgGradient: "radial-gradient(ellipse at 70% 60%, rgba(0, 180, 216, 0.2) 0%, rgba(9, 20, 25, 0.95) 75%, #03090c 100%)",
    textColor: "#EDF8FA",
    accentColor: "#00B4D8",
    object3D: {
      position: [1.8, 0.1, -0.7],
      rotation: [-0.3, 8.4, 0.2],
      scale: 1.1,
      lightColor: "#90e0ef",
    },
  },
  {
    id: "solutions",
    name: "Soluciones",
    number: "10",
    bgColor: "#0a1811",
    bgGradient: "radial-gradient(ellipse at 50% 40%, rgba(87, 204, 153, 0.2) 0%, rgba(10, 24, 17, 0.95) 70%, #030a07 100%)",
    textColor: "#EEF9F3",
    accentColor: "#57CC99",
    object3D: {
      position: [-1.8, -0.2, -0.5],
      rotation: [0.5, 9.6, -0.4],
      scale: 1.15,
      lightColor: "#80ed99",
    },
  },
  {
    id: "conclusions",
    name: "Conclusiones",
    number: "11",
    bgColor: "#FAF6EE",
    bgGradient: "radial-gradient(ellipse at 50% 30%, rgba(226, 123, 56, 0.12) 0%, rgba(250, 246, 238, 0.98) 60%, #F5EFE1 100%)",
    textColor: "#141210",
    accentColor: "#C85A17",
    object3D: {
      position: [1.7, 0.2, -0.2],
      rotation: [0.3, 10.8, 0.1],
      scale: 1.25,
      lightColor: "#e27b38",
    },
  },
];
