"use client";
import { Button } from "@/components/ui/button";
import { useGetCallByID } from "@/hooks/useGetCallByID";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import React from "react";
import { toast } from "sonner";

type Props = {
  title: string;
  description: string;
};

const Table = ({ title, description }: Props) => {
  return (
    <div className="flex flex-col xl:flex-row items-start gap-2">
      <h1 className="text-base font-medium text-sky-1 lg:text-xl xl:min-w-32">
        {title}
      </h1>
      <h1 className="truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl">
        {description}
      </h1>
    </div>
  );
};

const Personal_Room = () => {
  
  const { user } = useUser();
  const meeting_link =
    `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${user?.id}?personal=true` ||
    "";
  const { call } = useGetCallByID(user?.id);
  const client = useStreamVideoClient()
  
  const createRoom = async () => {

    if (!client || !user) return;

    if (!call) {
      const newCall = client.call('default', user?.id);

      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString()
          
        },
      });
    }
    
  };
  return (
    <section className="flex flex-col gap-10 size-full text-white">
      <h1 className="text-3xl font-bold">Personal Room</h1>

      <div className="w-full flex flex-col gap-8 xl:max-w-225">
        <Table
          title="Topic:"
          description={`${user?.username}'s meeting room`}
        />
        <Table title="Meeting ID:" description={user?.id || ""} />
        <Table title="Invite Link:" description={meeting_link} />
      </div>

      <div className="flex gap-5">
        <Button className="bg-blue-1 cursor-pointer" onClick={createRoom}>
          Start Meeting
        </Button>

        <Button
          className="bg-dark-3 cursor-pointer"
          onClick={() => {
            navigator.clipboard.writeText(meeting_link);
            toast("link Copied");
          }}
        >
          Copy Link
        </Button>
      </div>
    </section>
  );
};

export default Personal_Room;
