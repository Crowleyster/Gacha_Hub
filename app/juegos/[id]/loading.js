export default function Loading() {
  return (
    <div className="col-span-full pb-content-safe font-sans flex flex-col gap-8 animate-pulse">
      
      {/* 1. Hero Skeleton */}
      <section className="relative w-full h-48 sm:h-64 md:h-80 bg-background-tertiary border border-border-default-secondary rounded-[32px] sm:rounded-[48px] overflow-hidden" />

      {/* 2. Identity Overlap Skeleton */}
      <section className="-mt-12 sm:-mt-16 relative z-10 px-4 md:px-8 flex flex-col gap-6">
        <div className="flex flex-row items-end gap-4 md:gap-6">
          {/* Icon Skeleton */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl bg-background-tertiary border-4 border-background-default shadow-300" />
          {/* Title + Version Skeleton */}
          <div className="flex-1 flex flex-col gap-3 pb-2">
            <div className="h-8 sm:h-10 w-48 bg-background-tertiary rounded-lg" />
            <div className="h-4 w-24 bg-background-tertiary rounded-md" />
          </div>
        </div>

        {/* Buttons + Tags Skeleton */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-border-default-secondary pb-8">
          <div className="h-12 w-full sm:w-48 bg-background-tertiary rounded-[16px]" />
          <div className="flex gap-2 w-full overflow-hidden">
            <div className="h-8 w-24 bg-background-tertiary rounded-lg shrink-0" />
            <div className="h-8 w-24 bg-background-tertiary rounded-lg shrink-0" />
            <div className="h-8 w-32 bg-background-tertiary rounded-lg shrink-0" />
          </div>
        </div>
      </section>

      {/* 3. Main Content Layout (Asymmetric 2-column) */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 px-4 md:px-8">
        
        {/* RIGHT COLUMN (In page.js it's the 1st order on mobile) */}
        <div className="flex-1 flex flex-col gap-12 order-1 lg:order-2">
          {/* Redemption Codes Skeleton */}
          <section className="space-y-4">
            <div className="h-6 w-32 bg-background-tertiary rounded-md" />
            <div className="h-32 w-full bg-background-tertiary rounded-3xl" />
          </section>

          {/* Carousel Skeletons (Promotional / Events) */}
          {[1, 2].map((i) => (
            <section key={i} className="space-y-6">
              <div className="h-6 w-48 bg-background-tertiary rounded-md" />
              <div className="flex gap-4 overflow-hidden">
                <div className="h-48 w-80 bg-background-tertiary rounded-[24px] shrink-0" />
                <div className="h-48 w-80 bg-background-tertiary rounded-[24px] shrink-0" />
              </div>
            </section>
          ))}
        </div>

        {/* LEFT COLUMN (In page.js it's the GameSidebar) */}
        <div className="w-full lg:w-[320px] order-2 lg:order-1 space-y-10">
          <div className="bg-background-tertiary border border-border-default-secondary rounded-[32px] p-8 h-[600px]" />
        </div>

      </div>

    </div>
  );
}
