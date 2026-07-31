import dynamic from 'next/dynamic';
import { Hero } from '@/components/sections/Hero';

// Chargement différé des sections non critiques au-dessus du fold
const CompanyPresentation = dynamic(() => import('@/components/sections/CompanyPresentation').then(m => ({ default: m.CompanyPresentation })), { ssr: false });
const ActivitesGrid = dynamic(() => import('@/components/sections/ActivitesGrid').then(m => ({ default: m.ActivitesGrid })));
const StatsSection = dynamic(() => import('@/components/sections/StatsSection').then(m => ({ default: m.StatsSection })));
const LatestNews = dynamic(() => import('@/components/sections/LatestNews').then(m => ({ default: m.LatestNews })));
const EventsCarousel = dynamic(() => import('@/components/sections/EventsCarousel').then(m => ({ default: m.EventsCarousel })));
const NewsletterForm = dynamic(() => import('@/components/forms/NewsletterForm').then(m => ({ default: m.NewsletterForm })));

export default function HomePage() {
  return (
    <>
      {/* Hero chargé en priorité — above the fold */}
      <Hero />
      <CompanyPresentation />
      <ActivitesGrid />
      <StatsSection />
      <LatestNews />
      <EventsCarousel />
      <section className="py-16 bg-navy-950 border-t border-gray-800/80">
        <div className="max-w-7xl mx-auto px-4">
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
