import { cn } from "@/lib/utils";
import {
  CallControls,
  CallingState,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutList, Users } from "lucide-react";
import Loader from "./Loader";
import { useSearchParams } from "next/navigation";
import EndCallButton from "./EndCallButton";

type MeetingLayoutType = "speaker-left" | "speaker-right" | "grid";

const Meeting_Room = () => {
  const [layout, setLayout] = useState<MeetingLayoutType>("speaker-left");
  const [showparticipants, setShowparticipants] = useState<boolean>(false);
  const { useCallCallingState } = useCallStateHooks();

  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get('personal');

  const calllayout: string[] = ["grid", "speaker-left", "speaker-right"];

  const callStatus = useCallCallingState();
  if (callStatus !== CallingState.JOINED) return <Loader />;

  const MeetingLayout = () => {

    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-left":
        return <SpeakerLayout participantsBarPosition="right" />;
      default:
        return <SpeakerLayout participantsBarPosition="left" />;
    }
  };
  return (
    <div className="relative h-screen w-full text-white pt-4 overflow-hidden">
      <div className="relative size-full flex items-center justify-center">
        <div className="size-full max-w-250 flex items-center">
          {MeetingLayout()}
        </div>

        <div
          className={cn("h-[calc(100vh-86px)] hidden ml-2", {
            block : showparticipants,
          })}
        >
          <CallParticipantsList onClose={() => setShowparticipants(false)} />
        </div>
      </div>

      <div className="fixed bottom-0 w-full flex items-center justify-center flex-wrap gap-5">
        <CallControls />

        <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger className="cursor-pointer rounded-2xl px-4 py-2 bg-[#19232d] hover:bg-[#4c535b">
              <LayoutList size={20} className="text-white" />
            </DropdownMenuTrigger>
          </div>

          <DropdownMenuContent className="bg-dark-1 border-dark-1 text-white">
            {calllayout.map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    setLayout(item.toLowerCase() as MeetingLayoutType);
                  }}
                >
                  {item}
                </DropdownMenuItem>
                {/* <DropdownMenuSeparator className="border-dark-1" /> */}
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton/>

        <button onClick={() => { setShowparticipants((prev) => !prev) }}>
          <div className="cursor-pointer rounded-2xl px-4 py-2 bg-[#19232d] hover:bg-[#4c535b]">
            <Users size={20} className="text-white"/>
          </div>
        </button>

        {!isPersonalRoom && <EndCallButton />}
      </div>
    </div>
  );
};

export default Meeting_Room;
