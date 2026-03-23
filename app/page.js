import NewsBentoGrid from "@/components/NewsBentoGrid";
import ActiveCodes from "@/components/ActiveCodes";
import EventsTimeline from '@/components/EventsTimeline';

export default function Home() {
  return (
    <main className="col-span-full space-y-16 pb-content-safe">
      <NewsBentoGrid />
      <ActiveCodes />
      <EventsTimeline />
    </main>
  );
}
