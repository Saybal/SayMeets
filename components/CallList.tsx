"use client";
import { useGetCalls } from "@/hooks/useGetCalls";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import MeetingCard from "./MeetingCard";
import Loader from "./Loader";
import { toast } from "sonner";

const CallList = ({ type }: { type: "ended" | "upcoming" | "recordings" }) => {
  const { loading, endedCall, upcomingCall, callrecordings } = useGetCalls();
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
      default:
        return [];
    }
  };
  const getNoCalls = () => {
    switch (type) {
      case "ended":
        return "No Previous Calls";
      case "recordings":
        return "No Recordings";
      case "upcoming":
        return "No Upcoming Calls";
      default:
        return "";
    }
  };

  useEffect(() => {
    const getRecordings = async () => {
      try {
        const callData = await Promise.all(
        callrecordings?.map((meeting) => meeting.listRecordings()) ?? [],
      );

      const recordings = callData
        .filter((call) => call.recordings.length > 0)
        .flatMap((call) => call.recordings);

      setRecordings(recordings);
      } catch (error) {
        console.log(error)
        toast("Too many requested!! Please try again later..")
      }
    };
    if (type === "recordings") getRecordings();
  }, [type, callrecordings]);

  const calls = getCalls();
  const noCalls = getNoCalls();

  if (loading) return <Loader />;

  return (
    <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => (
          <MeetingCard
            key={(meeting as Call)?.id}
            icon={
              type === "ended"
                ? "/icons/previous.svg"
                : type === "upcoming"
                  ? "/icons/upcoming.svg"
                  : "/icons/recordings.svg"
            }
            title={
              (meeting as Call).state?.custom?.description.substring(0, 26) || (meeting as CallRecording)?.filename?.substring(0,20) ||
              "Personal Meeting"
            }
            date={
              (meeting as Call).state?.startsAt?.toLocaleString() ||
              (meeting as CallRecording).start_time.toLocaleLowerCase()
            }
            isPreviousMeeting={type === "ended"}
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
        ))
      ) : (
        <h1 className="text-2xl font-bold text-white">{noCalls}</h1>
      )}
    </section>
  );
};

export default CallList;
