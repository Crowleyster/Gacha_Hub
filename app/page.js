import HeroSection from '@/components/HeroSection';
import NewsBentoGrid from '@/components/NewsBentoGrid';
import ActiveCodes   from '@/components/ActiveCodes';
import EventsTimeline from '@/components/EventsTimeline';

import { getAllGamesData } from '@/services/gamesService';
import { getActiveCodes, getNews, getEvents } from '@/services/dataService';

export default async function HomePage() {
  const [gamesDataArray, codesData, newsData, eventsData] = await Promise.all([
    getAllGamesData(),
    getActiveCodes(),
    getNews(),
    getEvents()
  ]);

  const gamesDataMap = gamesDataArray.reduce((acc, game) => {
    acc[game.id] = game;
    return acc;
  }, {});

  return (
    <div className="col-span-full space-y-24 pb-20">
      <HeroSection />
      <NewsBentoGrid newsData={newsData} gamesData={gamesDataMap} />
      <ActiveCodes codesData={codesData} />
      <EventsTimeline eventsData={eventsData} />
    </div>
  );
}
