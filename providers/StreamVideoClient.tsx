import { ReactNode, useEffect, useState } from "react";
import {
  Call,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";
import generateToken from "@/actions/stream.action";
const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
// const userId = "user-id";
// const token = "authentication-token";
// const user: User = { id: userId };
const Stream_Video_Provider = ({ children }: { children: ReactNode }) => {
  const [client, setClient] = useState<StreamVideoClient>();
  const { user, isLoaded } = useUser();
  useEffect(() => {
    if (!isLoaded || !user) return;
    if (!apiKey) {
      throw new Error("Stream API key is missing");
      return;
    }
    const myClient = new StreamVideoClient({
      apiKey,
      user: { id: user?.id, name: user?.username, image: user?.imageUrl },
      generateToken
    });
      
    setClient(myClient);
    return () => {
      myClient.disconnectUser().catch(console.error);
      setClient(undefined);
    };
  }, [user, isLoaded]);
  if (!client) return null;
  return (
    <StreamVideo client={client}>
      <MyCallUI client={client} />
    </StreamVideo>
  );
};

const MyCallUI = ({ client }: { client: StreamVideoClient }) => {
  const [call, setCall] = useState<Call>();
  useEffect(() => {
    const myCall = client.call("default", "my-first-call");
    myCall.join({ create: true }).catch(console.error);
    setCall(myCall);
    return () => {
      myCall.leave().catch(console.error);
      setCall(undefined);
    };
  }, [client]);
  if (!call) return null;
  return <StreamCall call={call}>{/* <MyVideoUI /> */}</StreamCall>;
};

export default Stream_Video_Provider;
