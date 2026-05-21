// import CallList from '@/components/CallList';
// import React from 'react'

// const Upcoming = () => {
//   return (
//     <section className='size-full flex flex-col gap-10 text-white'>
//       <h1 className="text-3xl font-bold">Upcoming Meeting</h1>
//       <CallList type="upcoming"/>
//     </section>
//   )
// }

// export default Upcoming;

import CallList from '@/components/CallList';
import React from 'react'
import { BsCalendarEventFill } from 'react-icons/bs';

const Upcoming = () => {
  return (
    <section className='size-full flex flex-col gap-8 text-white'>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 shrink-0">
            <BsCalendarEventFill className="w-4 h-4 text-sky-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white leading-tight">
              Upcoming Meetings
            </h1>
            <p className="text-white/35 text-sm mt-0.5">
              Your scheduled sessions
            </p>
          </div>
        </div>

        {/* Section label */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] self-start sm:self-auto">
          <span className="relative flex w-1.5 h-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-60" />
            <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-sky-400" />
          </span>
          <span className="text-sky-400 text-xs font-medium tracking-wide">Scheduled</span>
        </div>
      </div>

      {/* Divider with label */}
      <div className="flex items-center gap-3">
        <div className="w-1 h-4 rounded-full bg-sky-500" />
        <span className="text-white/40 text-xs font-semibold uppercase tracking-widest">
          All Upcoming
        </span>
        <div className="flex-1 h-px bg-white/[0.06]" />
      </div>

      {/* Meeting list */}
      <CallList type="upcoming" />

    </section>
  );
};

export default Upcoming;