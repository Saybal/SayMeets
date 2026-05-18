import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useEffect, useState } from "react"

export const useGetCallByID = (id: string | string[] | undefined) => {
    const [call, setCall] = useState<Call | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const client = useStreamVideoClient();

    useEffect(() => {
        if (!client) return;

        const fetchCall = async () => {

            const { calls } = await client.queryCalls({
                filter_conditions: {
                    id
                }
            })
            setCall(calls[0] || null);
            setLoading(false);
        }

        fetchCall();
    }, [client, id])

    return { call, loading }
}