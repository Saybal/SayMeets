"use client";

import Loader from "@/components/Loader";
import Meeting_Room from "@/components/Meeting_Room";
import Meeting_SetUp from "@/components/Meeting_SetUp";
import { useGetCallByID } from "@/hooks/useGetCallByID";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { use, useState } from "react";

type Props = {
  params: Promise<{ id: string }>;
};

const Meeting = ({ params }: Props) => {
  const { id } = use(params);
  const { user, isLoaded } = useUser();
  const [setup, setSetup] = useState<boolean>(false)

  const { call, loading } = useGetCallByID(id);

  if (loading || !isLoaded || !call) return <Loader />

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!setup ? (<Meeting_SetUp setSetup={setSetup} />) : (<Meeting_Room />)}

        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default Meeting;