import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export const useGetCalls = () => {
  const [calls, setCalls] = useState<Call[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const client = useStreamVideoClient();
  const { user } = useUser();

  useEffect(() => {
    const loadCalls = async () => {
      if (!client || !user) return;
      setLoading(true);

      try {
        const { calls } = await client.queryCalls({
          sort: [{ field: "starts_at", direction: -1 }],
          filter_conditions: {
            type: { $eq: "livestream" },
              starts_at: { $exists: true },
              $or: [
                  { created_by_user_id: user.id },
                  { members: { $in: [user.id] } }
                  
            ]
          },
        });
          
          setCalls(calls)
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
  }, [client, user?.id]);
    
    const now = new Date();

    const endedCall = calls.filter(({ state: {
        startedAt, endedAt
    } } : Call) => {
        return (startedAt && new Date(startedAt) < now || !!endedAt)
    });

    const upcomingCall = calls.filter(({ state: { startedAt } }: Call) => {
        return (startedAt && new Date(startedAt) > now)
    });

    return {
        loading,
        endedCall,
        upcomingCall,
        callrecordings: calls
    }
};
