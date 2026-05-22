// "use client";
// import { useGetCalls } from "@/hooks/useGetCalls";
// import { Call, CallRecording } from "@stream-io/video-react-sdk";
// import { useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import MeetingCard from "./MeetingCard";
// import Loader from "./Loader";
// import { toast } from "sonner";

// const CallList = ({ type }: { type: "ended" | "upcoming" | "today-upcoming" | "recordings" }) => {
//   const { loading, endedCall, upcomingCall, today_upcomingCall, callrecordings } = useGetCalls();
//   const router = useRouter();
//   const [recordings, setRecordings] = useState<CallRecording[]>([]);

//   const getCalls = () => {
//     switch (type) {
//       case "ended":
//         return endedCall;
//       case "recordings":
//         return recordings;
//       case "upcoming":
//         return upcomingCall;
//       case "today-upcoming":
//         return today_upcomingCall;
//       default:
//         return [];
//     }
//   };
//   const getNoCalls = () => {
//     switch (type) {
//       case "ended":
//         return "No Previous Calls";
//       case "recordings":
//         return "No Recordings";
//       case "upcoming":
//         return "No Upcoming Calls";
//       case "today-upcoming":
//         return (
//           <div className="w-full h-25 flex items-center justify-center bg-dark-1 rounded-xl border-2 border-gray-500">
//             <h1 className="text-lg text-white">
//               Your schedule is free!!
//             </h1>
//           </div>
//         );
//       default:
//         return "";
//     }
//   };

//   useEffect(() => {
//     const getRecordings = async () => {
//       try {
//         const callData = await Promise.all(
//         callrecordings?.map((meeting) => meeting.listRecordings()) ?? [],
//       );

//       const recordings = callData
//         .filter((call) => call.recordings.length > 0)
//         .flatMap((call) => call.recordings);

//       setRecordings(recordings);
//       } catch (error) {
//         console.log(error)
//         toast("Too many requested!! Please try again later..")
//       }
//     };
//     if (type === "recordings") getRecordings();
//   }, [type, callrecordings]);

//   const calls = getCalls();
//   const noCalls = getNoCalls();

//   if (loading) return <Loader />;

//   return (
//     <section className={`${ calls && calls.length > 0 ? "grid grid-cols-1 gap-5 xl:grid-cols-2" : "w-full"}`}>
//       {calls && calls.length > 0 ? (
//         calls.map((meeting: Call | CallRecording) => (
//           <MeetingCard
//             key={(meeting as Call)?.id}
//             icon={
//               type === "ended"
//                 ? "/icons/previous.svg"
//                 : type === "upcoming"
//                   ? "/icons/upcoming.svg"
//                   : "/icons/recordings.svg"
//             }
//             title={
//               (meeting as Call).state?.custom?.description.substring(0, 26) || (meeting as CallRecording)?.filename?.substring(0,20) ||
//               "Personal Meeting"
//             }
//             date={
//               (meeting as Call).state?.startsAt?.toLocaleString() ||
//               (meeting as CallRecording).start_time.toLocaleLowerCase()
//             }
//             isPreviousMeeting={type === "ended"}
//             buttonIcon1={type === "recordings" ? "/icons/play.svg" : undefined}
//             handleClick={
//               type === "recordings"
//                 ? () => router.push((meeting as CallRecording).url)
//                 : () => router.push(`/meeting/${(meeting as Call)?.id}`)
//             }
//             link={
//               type === "recordings"
//                 ? (meeting as CallRecording).url
//                 : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call)?.id}`
//             }
//             buttonText={type === "recordings" ? "Play" : "Start"}
//           />
//         ))
//       ) : (
//         <h1 className="text-2xl font-bold text-white">{noCalls}</h1>
//       )}
//     </section>
//   );
// };

// export default CallList;

"use client";
import { useGetCalls } from "@/hooks/useGetCalls";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import MeetingCard from "./MeetingCard";
import Loader from "./Loader";
import { toast } from "sonner";
import { BsFillCalendarCheckFill } from "react-icons/bs";

const CallList = ({
  type,
}: {
  type: "ended" | "upcoming" | "today-upcoming" | "recordings";
}) => {
  const { loading, endedCall, upcomingCall, today_upcomingCall, callrecordings } =
    useGetCalls();
  const router = useRouter();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);

  const getCalls = () => {
    switch (type) {
      case "ended":
        return endedCall;
      case "recordings":
        return recordings;
      case "upcoming":
        return upcomingCall;
      case "today-upcoming":
        return today_upcomingCall;
      default:
        return [];
    }
  };

  useEffect(() => {
    const getRecordings = async () => {
      try {
        const callData = await Promise.all(
          callrecordings?.map((meeting) => meeting.listRecordings()) ?? []
        );
        const recordings = callData
          .filter((call) => call.recordings.length > 0)
          .flatMap((call) => call.recordings);
        setRecordings(recordings);
      } catch (error) {
        console.log(error);
        toast("Too many requests. Please try again later.");
      }
    };
    if (type === "recordings") getRecordings();
  }, [type, callrecordings]);

  const calls = getCalls();

  if (loading) return <Loader />;

  if (!calls || calls.length === 0) {
    if (type === "today-upcoming") {
      return (
        <div className="flex items-center gap-4 w-full px-5 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.07]">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.1] text-white/30 shrink-0">
            <BsFillCalendarCheckFill className="w-4 h-4" />
          </div>
          <div>
            <p className="text-white/60 text-sm font-medium">No meetings today</p>
            <p className="text-white/30 text-xs mt-0.5">Your schedule is clear — enjoy your day</p>
          </div>
        </div>
      );
    }

    const emptyMessages: Record<string, { title: string; sub: string }> = {
      ended: { title: "No previous calls", sub: "Your call history will appear here" },
      recordings: { title: "No recordings yet", sub: "Recorded meetings will show up here" },
      upcoming: { title: "No upcoming calls", sub: "Scheduled meetings will appear here" },
    };

    const msg = emptyMessages[type] ?? { title: "Nothing here", sub: "" };

    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
        <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
          <BsFillCalendarCheckFill className="w-5 h-5 text-white/20" />
        </div>
        <p className="text-white/50 font-medium">{msg.title}</p>
        <p className="text-white/25 text-sm">{msg.sub}</p>
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      {calls.map((meeting: Call | CallRecording) => (
        <MeetingCard
          key={(meeting as Call)?.id}
          icon={
            type === "ended"
              ? "/icons/previous.svg"
              : type === "upcoming" || type === "today-upcoming"
                ? "/icons/upcoming.svg"
                : "/icons/recordings.svg"
          }
          title={
            (meeting as Call).state?.custom?.description?.substring(0, 26) ||
            (meeting as CallRecording)?.filename?.substring(0, 20) ||
            "Personal Meeting"
          }
          date={
            (meeting as Call).state?.startsAt?.toLocaleString() ||
            (meeting as CallRecording).start_time?.toLocaleString()
          }
          MeetingType={type}
          isPreviousMeeting = {type === 'ended'}
          buttonIcon1={type === "recordings" ? "/icons/play.svg" : undefined}
          handleClick={
            type === "recordings"
              ? () => router.push((meeting as CallRecording).url)
              : () => router.push(`/meeting/${(meeting as Call)?.id}`)
          }
          link={
            type === "recordings"
              ? (meeting as CallRecording).url
              : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${(meeting as Call)?.id}`
          }
          buttonText={type === "recordings" ? "Play" : "Start"}
        />
      ))}
    </section>
  );
};

export default CallList;
