import HeroSection from '@/components/HeroSection';
import NewsBentoGrid from '@/components/NewsBentoGrid';
import ActiveCodes   from '@/components/ActiveCodes';
import EventsTimeline from '@/components/EventsTimeline';

export default function HomePage() {
  return (
    // div en lugar de main — el <main> ya lo provee ClientLayout
    <div className="col-span-full space-y-20 pb-10">
      <HeroSection />
      <NewsBentoGrid />
      <ActiveCodes />
      <EventsTimeline />
    </div>
  );
}
