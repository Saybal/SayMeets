import CallList from "@/components/CallList";
import MettingTypeList from "@/components/MettingTypeList";
import ShinyText from "@/reactbits/ShinyText";
import React from "react";

const Home = () => {
  const now = new Date();
  const time = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = now.toLocaleDateString([], {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="flex flex-col gap-8 size-full text-white">

      {/* Hero Banner */}
      <div className="relative w-full rounded-2xl overflow-hidden bg-hero bg-cover bg-center" style={{ minHeight: "280px" }}>
        {/* Dark overlay with subtle vignette */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/60" />

        {/* Subtle grid texture overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col items-start justify-end px-6 py-7 sm:px-8 sm:py-8 gap-2" style={{ minHeight: "280px" }}>
          {/* Live indicator badge */}
          <div className="absolute top-6 right-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="text-white/80 text-xs font-medium tracking-wide">Ready</span>
          </div>

          {/* Tagline */}
          <p className="text-white/60 text-xs sm:text-sm font-medium tracking-widest uppercase mb-1">
            Video Conferencing
          </p>

          {/* Time */}
          <ShinyText
            text={time}
            speed={2}
            delay={0}
            color="#FFFFFF"
            shineColor="#7BAFD4"
            spread={120}
            direction="left"
            yoyo={false}
            pauseOnHover={false}
            disabled={false}
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-none"
          />

          {/* Date */}
          <ShinyText
            text={date}
            speed={2}
            delay={0}
            color="rgba(255,255,255,0.8)"
            shineColor="#7BAFD4"
            spread={120}
            direction="left"
            yoyo={false}
            pauseOnHover={false}
            disabled={false}
            className="text-sm sm:text-base md:text-lg font-normal mt-1"
          />

          {/* Tagline below */}
          <ShinyText
            text="Connect from anywhere, anytime."
            speed={2}
            delay={0}
            color="rgba(255,255,255,0.9)"
            shineColor="#7BAFD4"
            spread={120}
            direction="left"
            yoyo={false}
            pauseOnHover={false}
            disabled={false}
            className="text-xs sm:text-sm font-normal mt-0.5 hidden sm:block"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className="w-1 h-4 rounded-full bg-sky-500" />
          <h2 className="text-white/70 text-xs md:text-sm font-semibold uppercase tracking-widest">
            Quick Actions
          </h2>
        </div>
        <MettingTypeList />
      </div>

      {/* Today's Upcoming Meetings */}
      <div className="flex flex-col gap-4 w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1 h-4 rounded-full bg-emerald-500" />
            <h2 className="text-white/70 text-xs md:text-sm font-semibold uppercase tracking-widest">
              Today&apos;s Upcoming
            </h2>
          </div>
        </div>
        <CallList type="today-upcoming" />
      </div>

    </section>
  );
};

export default Home;
