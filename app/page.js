import NewsBentoGrid from "@/components/NewsBentoGrid";
import ActiveCodes from "@/components/ActiveCodes";

export default function Home() {
  return (
    <div className="col-span-full space-y-16">
      <NewsBentoGrid />
      <ActiveCodes />
    </div>
  );
}
