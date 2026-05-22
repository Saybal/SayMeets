import CallList from '@/components/CallList';
import React from 'react'
import { BsFillRecordCircleFill } from "react-icons/bs";

const Recordings = () => {
  return (
    <section className='size-full flex flex-col gap-8 text-white'>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 shrink-0">
            <BsFillRecordCircleFill className="w-5 h-5 text-sky-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white leading-tight">
              Recorded Meetings
            </h1>
            <p className="text-white/35 text-sm mt-0.5">
              Your recorded sessions
            </p>
          </div>
        </div>

        {/* Section label */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] self-start sm:self-auto">
          <span className="relative flex w-1.5 h-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-60" />
            <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-sky-400" />
          </span>
          <span className="text-sky-400 text-xs font-medium tracking-wide">Recordings</span>
        </div>
      </div>

      {/* Divider with label */}
      <div className="flex items-center gap-3">
        <div className="w-1 h-4 rounded-full bg-sky-500" />
        <span className="text-white/40 text-xs font-semibold uppercase tracking-widest">
          All recorded meeting
        </span>
        <div className="flex-1 h-px bg-white/[0.06]" />
      </div>

      {/* Meeting list */}
      <CallList type="recordings" />

    </section>
  );
};

export default Recordings;