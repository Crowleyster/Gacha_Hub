import NewsBentoGrid from '@/components/NewsBentoGrid';
import PromotionalBanner from '@/components/PromotionalBanner';
import ActiveCodes from '@/components/ActiveCodes';
import EventsTimeline from '@/components/EventsTimeline';

export default function Home() {
  return (
    <div className="col-span-full space-y-12 md:space-y-16 pb-12 font-sans">
      <NewsBentoGrid />
      <PromotionalBanner />
      <ActiveCodes />
      <EventsTimeline />
    </div>
  );
}
