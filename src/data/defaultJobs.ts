export type Job = {
  id: string;
  title: string;
  type: string; // CDI, CDD, Stage
  department: string;
  description: string;
  status: "open" | "closed";
};

export type JobApplication = {
  id: string;
  jobId: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  message: string;
  resumeUrl?: string; // Optional CV link
  createdAt: string;
  status: "new" | "reviewed" | "accepted" | "rejected";
};

export const DEFAULT_JOBS: Job[] = [
  {
    id: "job_1",
    title: "Réceptionniste Bilingue",
    type: "CDI",
    department: "Accueil & Hébergement",
    description: "Vous êtes le premier sourire de TOGOLIVING. Gestion des check-in/out, assistance aux clients et maîtrise de l'anglais exigée.",
    status: "open",
  },
  {
    id: "job_2",
    title: "Chef de Rang",
    type: "CDI",
    department: "Restauration",
    description: "Supervision du service en salle au restaurant Living's. Expérience requise en hôtellerie haut de gamme et management d'équipe.",
    status: "open",
  },
  {
    id: "job_3",
    title: "Gouvernant(e)",
    type: "CDI",
    department: "Entretien",
    description: "Responsable de la propreté et de la conformité des chambres et espaces communs. Rigueur et sens du détail indispensables.",
    status: "open",
  },
  {
    id: "job_4",
    title: "Stagiaire Communication / Marketing",
    type: "Stage (3 à 6 mois)",
    department: "Administration",
    description: "Création de contenu pour les réseaux sociaux, assistance sur les événements et animation de la communauté digitale.",
    status: "open",
  }
];
