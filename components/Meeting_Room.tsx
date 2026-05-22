"use client";

import React, { useState } from "react";

import {
  CallControls,
  CallingState,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  LayoutList,
  Users,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Minimize2,
} from "lucide-react";

import Loader from "./Loader";
import EndCallButton from "./EndCallButton";

import { useRouter, useSearchParams } from "next/navigation";

type MeetingLayoutType =
  | "speaker-left"
  | "speaker-right"
  | "grid";

const Meeting_Room = () => {
  const router = useRouter();

  const searchParams = useSearchParams();

  const isPersonalRoom =
    !!searchParams.get("personal");

  const [layout, setLayout] =
    useState<MeetingLayoutType>("grid");

  const [showParticipants, setShowParticipants] =
    useState(false);

  const [showControls, setShowControls] =
    useState(true);

  const [isFullscreen, setIsFullscreen] =
    useState(false);

  const { useCallCallingState } =
    useCallStateHooks();

  const callingState =
    useCallCallingState();

  if (callingState !== CallingState.JOINED)
    return <Loader />;

  const renderLayout = () => {

  // TRUE FULLSCREEN MODE
  if (isFullscreen) {
    return (
      <div className="h-screen w-screen bg-black">
        <SpeakerLayout
          participantsBarPosition="none"
        />
      </div>
    );
  }

  switch (layout) {

    case "speaker-left":
      return (
        <SpeakerLayout
          participantsBarPosition="left"
        />
      );

    case "speaker-right":
      return (
        <SpeakerLayout
          participantsBarPosition="right"
        />
      );

    default:
      return <PaginatedGridLayout />;
  }
};

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0B1120] text-white">
      
      {/* MAIN VIDEO AREA */}
      <div
        className={`
          h-full
          w-full
          transition-all
          duration-300
          ${
            showParticipants && !isFullscreen
              ? "lg:pr-[340px]"
              : ""
          }
        `}
      >
        {renderLayout()}
      </div>

      {/* PARTICIPANTS SIDEBAR */}
      {!isFullscreen && (
        <div
          className={`
            fixed
            right-0
            top-0
            z-40
            h-full
            w-[340px]
            border-l
            border-white/10
            bg-[#111827]
            transition-all
            duration-300
            ${
              showParticipants
                ? "translate-x-0"
                : "translate-x-full"
            }
          `}
        >
          {/* HEADER */}
          <div
            className="
              flex
              items-center
              justify-between
              border-b
              border-white/10
              px-5
              py-5
            "
          >
            <h2 className="text-lg font-semibold">
              Participants
            </h2>

            <button
              onClick={() =>
                setShowParticipants(false)
              }
              className="
                rounded-xl
                bg-white/10
                px-4
                py-2
                text-sm
                hover:bg-white/20
              "
            >
              Close
            </button>
          </div>

          {/* PARTICIPANTS */}
          <div className="h-[calc(100%-88px)] overflow-y-auto p-4">
            <div className="rounded-2xl bg-[#0F172A] p-2">
              <CallParticipantsList
                onClose={() =>
                  setShowParticipants(false)
                }
              />
            </div>
          </div>
        </div>
      )}

      {/* SHOW CONTROLS BUTTON */}
      {!showControls && (
        <button
          onClick={() => setShowControls(true)}
          className="
            fixed
            bottom-5
            left-1/2
            z-50
            flex
            -translate-x-1/2
            items-center
            justify-center
            rounded-full
            bg-[#111827]
            p-3
            shadow-lg
            hover:bg-[#1E293B]
          "
        >
          <ChevronUp size={22} />
        </button>
      )}

      {/* CONTROL BAR */}
      {showControls && (
        <div
          className="
            fixed
            bottom-5
            left-1/2
            z-50
            flex
            -translate-x-1/2
            items-center
            gap-3
            rounded-full
            border
            border-white/10
            bg-[#111827]/95
            px-4
            py-3
            shadow-2xl
            backdrop-blur-xl
          "
        >
          {/* CALL CONTROLS */}
          <CallControls
            onLeave={() => router.push("/")}
          />

          {/* LAYOUT OPTIONS */}
          {!isFullscreen && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <button
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    bg-white/10
                    hover:bg-white/20
                  "
                >
                  <LayoutList size={20} />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="center"
                className="
                  border-white/10
                  bg-[#1E293B]
                  text-white
                "
              >
                <DropdownMenuItem
                  onClick={() =>
                    setLayout("grid")
                  }
                >
                  Grid View
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() =>
                    setLayout("speaker-right")
                  }
                >
                  Speaker Right
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() =>
                    setLayout("speaker-left")
                  }
                >
                  Speaker Left
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* CALL STATS */}
          {!isFullscreen && (
            <div
              className="
                rounded-full
                bg-white/10
                p-1
                hover:bg-white/20
              "
            >
              <CallStatsButton />
            </div>
          )}

          {/* PARTICIPANTS */}
          {!isFullscreen && (
            <button
              onClick={() =>
                setShowParticipants(
                  (prev) => !prev
                )
              }
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                bg-white/10
                hover:bg-white/20
              "
            >
              <Users size={20} />
            </button>
          )}

          {/* FULLSCREEN */}
          <button
            onClick={() =>
              setIsFullscreen((prev) => !prev)
            }
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              bg-white/10
              hover:bg-white/20
            "
          >
            {isFullscreen ? (
              <Minimize2 size={20} />
            ) : (
              <Maximize2 size={20} />
            )}
          </button>

          {/* HIDE CONTROLS */}
          <button
            onClick={() => setShowControls(false)}
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              bg-white/10
              hover:bg-white/20
            "
          >
            <ChevronDown size={20} />
          </button>

          {/* END CALL */}
          {!isPersonalRoom && (
            <div className="ml-1">
              <EndCallButton />
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Meeting_Room;