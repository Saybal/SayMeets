"use client"
import { ReactNode, useMemo } from "react";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";
import generateToken from "@/actions/stream.action";
import Loader from "@/components/Loader";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const Stream_Video_Provider = ({ children }: { children: ReactNode }) => {
  const { user, isLoaded } = useUser();

  const client = useMemo(() => {
    if (!isLoaded || !user) return undefined;
    if (!apiKey) throw new Error("Stream API key is missing");

    return new StreamVideoClient({
      apiKey,
      user: {
        id: user.id,
        name: user.username ?? user.id,
        image: user.imageUrl ?? undefined,
      },
      tokenProvider: generateToken,
    });
  }, [user, isLoaded]);

  if (!client) return <Loader />;
  return <StreamVideo client={client}>{children}</StreamVideo>;
};

// const MyCallUI = ({ client }: { client: StreamVideoClient }) => {
//   const [call, setCall] = useState<Call>();
//   useEffect(() => {
//     const myCall = client.call("default", "my-first-call");
//     myCall.join({ create: true }).catch(console.error);
//     setCall(myCall);
//     return () => {
//       myCall.leave().catch(console.error);
//       setCall(undefined);
//     };
//   }, [client]);
//   if (!call) return null;
//   return <StreamCall call={call}>{/* <MyVideoUI /> */}</StreamCall>;
// };

export default Stream_Video_Provider;
