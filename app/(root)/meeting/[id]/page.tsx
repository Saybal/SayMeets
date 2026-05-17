"use client";

import Meeting_Room from "@/components/Meeting_Room";
import Meeting_SetUp from "@/components/Meeting_SetUp";
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

  return (
    <main className="h-screen w-full">
      <StreamCall>
        <StreamTheme>
          {!setup ? (<Meeting_SetUp />) : (<Meeting_Room />)}

        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default Meeting;