import React from 'react';
import Image from 'next/image';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { siteImages } from '@/lib/images';
import {
  Globe,
  CheckCircle2,
  Building2,
  Users2,
  GraduationCap,
  BookOpen,
  Briefcase,
  Sprout,
  Check,
  Coins,
  MonitorSmartphone,
} from 'lucide-react';

export default function AboutPage() {
  const founderCompetences = [
    'Gestion administrative et des ressources humaines',
    'Capacité rédactionnelle et encadrement des travaux scientifiques',
    'Gestion des ressources naturelles et développement durable',
    'Maîtrise des outils informatiques et bureautiques',
    'Maîtrise des outils et itinéraires agricoles',
    'Compétence dans la recherche scientifique et enseignement universitaire',
    'Gestion de projets agropastoraux en milieux favorables et difficiles',
  ];

  const executiveTeam = [
    {
      name: 'AKILI MUNGANGA SURIA',
      role: 'Chargé de Finance',
      badgeColor: 'gold' as const,
      photo: siteImages.team.akili,
      icon: Coins,
      education: 'EP ATETE • Institut KAVUMU (Pédagogie Générale) • ISP KABARE (Sciences Exactes)',
      desc: "Expert en comptabilité et gestion financière avec formation spécialisée en informatique bureautique. Passionné par le commerce durable, l'élevage et l'agriculture, il met ses compétences au service de la gestion financière rigoureuse de BIMERA BUSINESS AGRO DIGITAL (BBAD).",
      specialties: ['Comptabilité & Gestion financière', 'Commerce durable', "Connexion & Communication d'entreprise", 'Gestion de données financières'],
    },
    {
      name: 'Ir. NAMEGABE MURHOLA Apollinaire',
      role: 'Ingénieur Agronome & Responsable Vulgarisation',
      badgeColor: 'green' as const,
      photo: siteImages.team.namegabe,
      icon: Sprout,
      education: "EP MADRE ELENA • Institut MUSHUNGURHI (Agriculture Générale) • ISTD-Mulungu (Sciences Agronomiques & Environnement)",
      desc: "Ingénieur Agronome diplômé de l'ISTD-Mulungu. Passionné par l'agriculture et l'élevage, il maîtrise les compétences digitales et s'investit dans la vulgarisation agricole, l'agroforesterie et l'accompagnement agro-pastoral en milieux ruraux et urbains.",
      specialties: ["Agriculture durable & Élevage", "Agroforesterie & Environnement", "Vulgarisation agro-pastorale rurale & urbaine", "Informatique & Technologies digitales"],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      <Breadcrumb items={[{ label: 'À Propos de Bimera' }]} />

      {/* Header Banner */}
      <div className="text-center max-w-4xl mx-auto space-y-4">
        <Badge variant="gold" className="px-4 py-1 text-xs uppercase font-extrabold tracking-widest">
          Présentation & Vision Stratégique
        </Badge>
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
          BIMERA BUSINESS AGRO DIGITAL <span className="gradient-text">SARLU</span>
        </h1>
        <p className="text-gray-300 text-base sm:text-xl leading-relaxed max-w-3xl mx-auto font-normal">
          Acteur majeur dans les secteurs de l&apos;agriculture, de l&apos;élevage, de l&apos;informatique et des services techniques.
        </p>
      </div>

      {/* ── Fondateur ── */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-gold-500/40 relative overflow-hidden bg-navy-950/95 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row gap-8">

          {/* Photo */}
          <div className="relative w-full lg:w-72 shrink-0 rounded-2xl overflow-hidden shadow-2xl ring-2 ring-gold-500/40 min-h-[400px]">
            <Image
              src={siteImages.team.founder}
              alt="TOMBOLA BIMERA Aimé — Fondateur & Initiateur"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 288px"
              priority
            />
          </div>

          {/* Tout le contenu à droite */}
          <div className="flex-1 space-y-5">

            {/* En-tête nom */}
            <div className="pb-4 border-b border-gray-800">
              <Badge variant="gold" className="text-[11px] uppercase tracking-wider font-extrabold mb-2">
                Fondateur & Initiateur
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-black text-white">TOMBOLA BIMERA Aimé</h2>
              <p className="text-xs sm:text-sm text-brand-400 font-semibold mt-1">
                Sciences Agronomiques & Environnementales | Expert Informatique Bureautique
              </p>
            </div>

            {/* Parcours académique */}
            <div className="bg-navy-900/50 p-5 rounded-2xl border border-gray-800 space-y-3 text-sm text-gray-300 leading-relaxed">
              <div className="flex items-center space-x-2 text-gold-400 font-bold">
                <GraduationCap size={18} />
                <span>Parcours Académique & Formations</span>
              </div>
              <p>
                <strong className="text-white">TOMBOLA BIMERA Aimé</strong> a effectué ses études primaires à l&apos;<strong className="text-white">EP RUHARAGA</strong>, ses secondaires à l&apos;<strong className="text-white">Institut RUHARAGA</strong> (Pédagogie Générale), et ses études supérieures à l&apos;<strong className="text-white">ISTD-M de Mulungu</strong> en Sciences Agronomiques et Environnementales, Sud-Kivu (RDC).
              </p>
              <p>
                De sept. 2022 à janv. 2023 : <strong className="text-white">Brevet en informatique bureautique</strong> — EVIVE DIGITAL, Kabare. Juin 2025 : formation spécialisée sur la culture du café (variétés, itinéraires culturaux, phytosanitaire).
              </p>
              <div className="pt-2 border-t border-gray-800/80 space-y-1">
                <div className="flex items-center space-x-2 text-brand-400 font-bold text-xs">
                  <BookOpen size={14} />
                  <span>Recherche Scientifique (2025)</span>
                </div>
                <p className="text-xs text-gray-400 italic">
                  &laquo; Les effets des engrais minéraux (DAP et URÉE) sur le rendement des variétés de patates douces à chair orange (NASPOT13 et MAYAYI) &raquo; — sol de Mulungu.
                </p>
              </div>
            </div>

            {/* Initiatives & Compétences */}
            <div className="bg-navy-900/50 p-5 rounded-2xl border border-gray-800 space-y-3 text-sm text-gray-300 leading-relaxed">
              <div className="flex items-center space-x-2 text-brand-400 font-bold">
                <Briefcase size={18} />
                <span>Initiatives & Compétences Clés</span>
              </div>
              <p>
                En sept. 2025, fondation de l&apos;<strong className="text-white">Association des Étudiants du Département d&apos;Agrovétérinaire (AEDA)</strong> de l&apos;ISTD-M, pour promouvoir l&apos;agriculture durable dans le territoire de Kabare.
              </p>
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-gold-400 mb-2">Domaines d&apos;Expertise :</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {founderCompetences.map((comp, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs text-gray-200">
                      <Check size={13} className="text-brand-400 shrink-0 mt-0.5" />
                      <span>{comp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Équipe dirigeante ── */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <Badge variant="blue" className="px-3 py-1 text-xs uppercase tracking-widest font-extrabold">
            Cadres & Experts
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">L&apos;Équipe Dirigeante & Technique</h2>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto">
            Une équipe pluridisciplinaire unissant compétences financières, agronomiques et technologiques.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {executiveTeam.map((member, i) => (
            <Card key={i} className="border border-gray-800 p-6 sm:p-8 space-y-5 bg-navy-950/80">
              <div className="flex flex-col sm:flex-row items-start gap-5">
                <div className="relative w-full sm:w-64 h-72 rounded-2xl overflow-hidden shadow-md shrink-0 ring-2 ring-brand-500/40">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 100vw, 256px"
                  />
                </div>
                <div className="space-y-1">
                  <Badge variant={member.badgeColor} className="text-[10px] font-bold uppercase">
                    {member.role}
                  </Badge>
                  <h3 className="text-xl font-bold text-white">{member.name}</h3>
                  <p className="text-xs text-gray-400 flex items-start gap-1.5">
                    <GraduationCap size={14} className="text-gold-400 shrink-0 mt-0.5" />
                    <span>{member.education}</span>
                  </p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-gray-800/80 pt-4">
                {member.desc}
              </p>
              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-brand-400 block">
                  Compétences & Réalisations :
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {member.specialties.map((spec, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-navy-900 text-gray-200 border border-gray-800">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* ── Présentation officielle ── */}
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-brand-500/30 relative overflow-hidden bg-navy-950/90 shadow-2xl">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-8">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-500/20 text-brand-400 flex items-center justify-center border border-brand-500/40">
              <Building2 size={28} />
            </div>
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-brand-400">Présentation Officielle</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">À Propos de la Société</h2>
            </div>
          </div>

          <div className="bg-navy-900/60 p-6 sm:p-8 rounded-2xl border border-gray-800 space-y-4 text-gray-200 text-base sm:text-lg leading-relaxed">
            <div className="flex items-center space-x-2 text-gold-400 font-bold text-lg mb-2">
              <Globe size={22} />
              <span>Transformation & Digitalisation Stratégique</span>
            </div>
            <p>
              La société <strong className="text-white font-bold">BIMERA BUSINESS AGRO DIGITAL SARLU</strong> s&apos;engage dans la création d&apos;un site web professionnel pour renforcer sa présence numérique, optimiser sa communication et faciliter l&apos;accès à l&apos;information pour ses partenaires, clients et membres.
            </p>
          </div>

          <div className="space-y-6 pt-4 border-t border-gray-800/80">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gold-500/20 text-gold-400 flex items-center justify-center border border-gold-500/30">
                <Users2 size={24} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">Présentation du Capital Humain</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300 text-sm sm:text-base leading-relaxed">
              <div className="bg-navy-900/40 p-6 rounded-2xl border border-gray-800/80 space-y-3">
                <p>
                  Les travailleurs de <strong className="text-white">BIMERA BUSINESS AGRO DIGITAL</strong> constituent le cœur vivant et dynamique de son développement. Animés par des valeurs de solidarité, de responsabilité et de professionnalisme, ils travaillent en équipe pour atteindre des objectifs communs.
                </p>
              </div>
              <div className="bg-navy-900/40 p-6 rounded-2xl border border-gray-800/80 space-y-3">
                <p>
                  Ensemble, ils incarnent une force collective tournée vers l&apos;avenir, prête à relever les défis dans un monde en constante évolution. Les travailleurs de <strong className="text-white">BIMERA BUSINESS AGRO DIGITAL</strong> sont le pilier fondamental du succès et de la pérennité de l&apos;entreprise.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-800 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Pôle Agriculture', color: 'text-brand-400' },
              { label: 'Pôle Élevage', color: 'text-gold-400' },
              { label: 'Pôle Informatique & Tech', color: 'text-blue-400' },
              { label: 'Services Techniques', color: 'text-purple-400' },
            ].map((s, i) => (
              <div key={i} className="flex items-center space-x-2 text-xs font-semibold text-gray-300">
                <CheckCircle2 size={16} className={`${s.color} shrink-0`} />
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Chronologie ── */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <Badge variant="gold" className="px-4 py-1 text-xs uppercase font-extrabold tracking-widest">
            Notre Histoire
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Chronologie de BIMERA</h2>
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-500 via-gold-500 to-brand-500 opacity-40" />
          <div className="space-y-8">
            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12">
              <div className="flex items-center space-x-4 md:w-1/2 md:justify-end">
                <div className="md:order-2 w-10 h-10 rounded-full bg-brand-600 border-4 border-navy-950 flex items-center justify-center shadow-lg shrink-0 z-10">
                  <Sprout size={18} className="text-white" />
                </div>
                <Card className="md:order-1 border-l-4 border-l-brand-500 p-5 space-y-2 flex-1">
                  <span className="text-xs font-extrabold text-brand-400 uppercase tracking-wider">25 mars 2024</span>
                  <h3 className="text-lg font-bold text-white">Fondation : &laquo; Agro-initiative &raquo;</h3>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Création de l&apos;entreprise sous l&apos;appellation initiale <strong className="text-white">&laquo; Agro-initiative &raquo;</strong> pour promouvoir le développement agricole dans le territoire de Kabare.
                  </p>
                </Card>
              </div>
              <div className="hidden md:block md:w-1/2" />
            </div>

            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12">
              <div className="hidden md:block md:w-1/2" />
              <div className="flex items-center space-x-4 md:w-1/2">
                <div className="w-10 h-10 rounded-full bg-gold-500 border-4 border-navy-950 flex items-center justify-center shadow-lg shrink-0 z-10">
                  <MonitorSmartphone size={18} className="text-navy-950" />
                </div>
                <Card className="border-l-4 border-l-gold-500 p-5 space-y-2 flex-1">
                  <span className="text-xs font-extrabold text-gold-400 uppercase tracking-wider">Août 2025</span>
                  <h3 className="text-lg font-bold text-white">Évolution & Digitalisation</h3>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Repositionnement stratégique à <strong className="text-white">Kavumu</strong> et transformation en <strong className="text-white">BIMERA BUSINESS AGRO DIGITAL SARL</strong>, marquant l&apos;union de l&apos;agropastoral et du numérique.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Vision & Mission ── */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <Badge variant="green" className="px-4 py-1 text-xs uppercase font-extrabold tracking-widest">
            Vision & Mission
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Notre Boussole Stratégique</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-l-4 border-l-brand-500 space-y-4 overflow-hidden p-0">
            <div className="relative w-full h-72 bg-navy-900">
              <Image src="/images/a-propos/Mission.jpg" alt="Notre Mission" fill className="object-contain" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            <div className="px-6 pb-6 space-y-2">
              <h2 className="text-2xl font-bold text-white">Notre Mission</h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                Promouvoir une <strong className="text-white">agriculture intelligente, rentable et durable</strong> via les technologies numériques, tout en accompagnant les acteurs ruraux et urbains dans leur transformation agro-digitale.
              </p>
            </div>
          </Card>

          <Card className="border-l-4 border-l-gold-500 space-y-4 overflow-hidden p-0">
            <div className="relative w-full h-72 bg-navy-900">
              <Image src="/images/a-propos/ision.png" alt="Notre Vision" fill className="object-contain" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            <div className="px-6 pb-6 space-y-2">
              <h2 className="text-2xl font-bold text-white">Notre Vision</h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                Devenir le <strong className="text-white">leader de l&apos;agriculture digitale au Sud-Kivu d&apos;ici 15 ans</strong>, en faisant de l&apos;innovation technologique un levier de souveraineté alimentaire et de prospérité locale.
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* ── Valeurs ── */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <Badge variant="gold" className="px-4 py-1 text-xs uppercase font-extrabold tracking-widest">
            Nos Valeurs
          </Badge>
          <h2 className="text-3xl font-extrabold text-white">Ce Qui Nous Guide</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: 'Innovation', img: '/images/a-propos/Innovation (2).png', color: 'border-brand-500/30' },
            { label: 'Durabilité', img: '/images/a-propos/Durabilité.jpg', color: 'border-gold-500/30' },
            { label: 'Intégrité', img: "/images/a-propos/Intégrité.jpg", color: 'border-blue-500/30' },
            { label: 'Engagement Communautaire', img: '/images/a-propos/Engagement Communautaire(5).png', color: 'border-purple-500/30' },
            { label: 'Excellence', img: '/images/a-propos/Excellence.jpg', color: 'border-gold-500/30' },
          ].map((val, idx) => (
            <div key={idx} className={`glass-panel rounded-2xl border overflow-hidden flex flex-col items-center text-center ${val.color}`}>
              <div className="relative w-full h-52">
                <Image src={val.img} alt={val.label} fill className="object-contain" sizes="220px" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-white py-3 px-2">{val.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Objectifs stratégiques ── */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <Badge variant="blue" className="px-4 py-1 text-xs uppercase font-extrabold tracking-widest">
            Objectifs Stratégiques
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Nos Objectifs pour le Site</h2>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto">
            Créer un site web fonctionnel, moderne et facile à gérer pour <strong className="text-white">BIMERA BUSINESS AGRO DIGITAL</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { img: '/images/a-propos/Présentation Institutionnelle(5).png', color: 'border-brand-500/30', title: 'Présentation Institutionnelle', desc: "Mettre en avant l'entreprise, son histoire, sa vision, sa mission et ses valeurs fondamentales." },
            { img: '/images/a-propos/Information & Transparence(5).png', color: 'border-gold-500/30', title: 'Information & Transparence', desc: 'Fournir des informations pratiques, fiables et actualisées sur les activités et réalisations.' },
            { img: '/images/a-propos/Engagement & Interaction.jpg', color: 'border-blue-500/30', title: 'Engagement & Interaction', desc: "Publier des actualités, des calendriers d'activités, des galeries photos et faciliter le contact." },
            { img: '/images/a-propos/Portail Sécurisé(5).png', color: 'border-purple-500/30', title: 'Portail Sécurisé', desc: 'Offrir un espace restreint pour des échanges spécifiques avec le personnel et les partenaires.' },
            { img: '/images/a-propos/Visibilité & Référencement(5).png', color: 'border-green-500/30', title: 'Visibilité & Référencement', desc: "Améliorer la présence en ligne et l'accessibilité via les moteurs de recherche (SEO)." },
            { img: '/images/a-propos/Croissance & Rayonnement.jpg', color: 'border-gold-500/30', title: 'Croissance & Rayonnement', desc: 'Attirer de nouveaux partenaires, investisseurs et clients grâce à une vitrine numérique professionnelle.' },
          ].map((obj, idx) => (
            <Card key={idx} className={`border overflow-hidden space-y-0 p-0 bg-navy-950/80 ${obj.color}`}>
              <div className="relative w-full h-56 bg-navy-900">
                <Image src={obj.img} alt={obj.title} fill className="object-contain" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-base font-bold text-white">{obj.title}</h3>
                <p className="text-xs text-gray-300 leading-relaxed">{obj.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
