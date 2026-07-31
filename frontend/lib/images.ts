export const siteImages = {
  team: {
    founder: '/images/tombola-bimera-aime.jpeg',
    akili: '/images/akili-munganga-suria.jpeg',
    namegabe: '/images/namegabe-murhola-apollinaire.jpeg',
  },
  poles: {
    agriculture: '/images/pole-agriculture.jpeg',
    elevage: '/images/pole-elevage.jpeg',
    informatique: '/images/pole-informatique.jpg',
  },
} as const;

export const galleryImages = [
  {
    title: 'Pôle Agriculture — Agro-écologie',
    category: 'AGRICULTURE',
    src: siteImages.poles.agriculture,
    size: 'large' as const,
  },
  {
    title: 'Pôle Élevage — Production animale',
    category: 'ELEVAGE',
    src: siteImages.poles.elevage,
    size: 'medium' as const,
  },
  {
    title: 'Pôle Informatique — Bureautique & formations',
    category: 'INFORMATIQUE',
    src: siteImages.poles.informatique,
    size: 'large' as const,
  },
  {
    title: 'TOMBOLA BIMERA Aimé — Fondateur',
    category: 'EQUIPE',
    src: siteImages.team.founder,
    size: 'medium' as const,
  },
  {
    title: 'AKILI MUNGANGA SURIA — Chargé de Finance',
    category: 'EQUIPE',
    src: siteImages.team.akili,
    size: 'medium' as const,
  },
  {
    title: 'Ir. NAMEGABE MURHOLA Apollinaire — Ingénieur Agronome',
    category: 'EQUIPE',
    src: siteImages.team.namegabe,
    size: 'medium' as const,
  },
];
