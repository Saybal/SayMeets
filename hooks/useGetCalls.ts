import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export const useGetCalls = () => {
  const [calls, setCalls] = useState<Call[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const client = useStreamVideoClient();
  const { user } = useUser();

  useEffect(() => {
    const loadCalls = async () => {
      if (!client || !user?.id) return;
      setLoading(true);

      try {
        const { calls } = await client.queryCalls({
          sort: [{ field: "starts_at", direction: -1 }],
          filter_conditions: {
            starts_at: { $exists: true },
            $or: [
              { created_by_user_id: user.id },
              { members: { $in: [user.id] } },
            ],
          },
        });

        setCalls(calls);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadCalls();
  }, [client, user?.id]);

  const now = new Date();

  const endedCall = calls?.filter(({ state: { startedAt, endedAt } }: Call) => {
    return (startedAt && new Date(startedAt) < now) || !!endedAt;
  });

  const upcomingCall = calls
    ?.filter(({ state: { startsAt } }: Call) => {
      return startsAt && new Date(startsAt).getTime() > Date.now();
    })
    .sort((a, b) => {
      const aTime = a.state.startsAt ? new Date(a.state.startsAt).getTime() : 0;

      const bTime = b.state.startsAt ? new Date(b.state.startsAt).getTime() : 0;

      return aTime - bTime;
    });
  const today_upcomingCall = upcomingCall?.filter(
    ({ state: { startsAt } }: Call) => {
      if (!startsAt) return false;

      const meetingDate = new Date(startsAt);
      const now = new Date();

      const isSameDay =
        meetingDate.getDate() === now.getDate() &&
        meetingDate.getMonth() === now.getMonth() &&
        meetingDate.getFullYear() === now.getFullYear();

      const isFutureTime = meetingDate.getTime() > now.getTime();

      return isSameDay && isFutureTime;
    },
  );

  return {
    loading,
    endedCall,
    upcomingCall,
    today_upcomingCall,
    callrecordings: calls,
  };
};
