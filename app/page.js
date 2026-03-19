import NewsBentoGrid from "@/components/NewsBentoGrid";
import EventsTimeline from "@/components/EventsTimeline";
import ActiveCodes from "@/components/ActiveCodes";

export default function Home() {
  return (
    <div className="col-span-full space-y-12 pb-20">
      <NewsBentoGrid />
      <ActiveCodes />
      <EventsTimeline />
    </div>
  );
}
