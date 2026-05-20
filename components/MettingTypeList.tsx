"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BsClipboardCheckFill, BsFillRecordCircleFill } from "react-icons/bs";
import { FaCalendarPlus } from "react-icons/fa";
import { FaPlus, FaUserPlus } from "react-icons/fa6";
import Meeting_Modal from "./Meeting_Modal";
import { SiGooglemeet } from "react-icons/si";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { IoCreate } from "react-icons/io5";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import ReactDatePicker from 'react-datepicker' 
import { CalendarDays } from "lucide-react";
import { toast } from "sonner";

const MettingTypeList = () => {
  const [Meeting_Type, setMeeting_Type] = useState<string | null>(null);
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [callInfo, setCallInfo] = useState<{
    date: Date;
    description: string;
    link: string;
  }>({
    date: new Date(),
    description: "",
    link: "",
  });

  const [calldetails, setCalldetails] = useState<Call | null>(null);

  const handleClick = (type: string) => {
    setMeeting_Type(type);
  };

  const createMeeting = async () => {
    if (!user || !client) return;

    try {
      const callType = "default"; // You can customize this based on your needs
      const callId = crypto.randomUUID();
      const call = client.call(callType, callId);

      if (!call) {
        throw new Error("Failed to create call");
      }

      const starting_time =
        callInfo.date.toISOString() || new Date().toISOString();
      const description = callInfo.description || "Instant Meeting";

      await call.getOrCreate({
        data: {
          starts_at: starting_time,
          custom: {
            description,
          },
        },
      });

      setCalldetails(call);

      if (!callInfo.description) {
        router.push(`/meeting/${call.id}`);
      }
      
    } catch (error) {
      console.error("Error creating meeting:", error);
    }
  };

  const meetinglink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${calldetails?.id}`

  const router = useRouter();
  return (
    <section className="flex items-center justify-center gap-6">
      <div
        className="flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => handleClick("instant-meeting")}
      >
        <div className="w-16 h-16 rounded-xl bg-[#FF8C00] flex items-center justify-center text-white text-2xl md:text-3xl font-bold">
          <FaPlus />
        </div>
        <span className="text-center text-sm sm:text-lg">Instant Meeting</span>
      </div>
      <div className="flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => handleClick("schedule-meeting")}
      >
        <div className="w-16 h-16 rounded-xl bg-[#568203] flex items-center justify-center text-white text-2xl md:text-3xl font-bold">
          <FaCalendarPlus />
        </div>
        <span className="text-center text-sm sm:text-lg">Schedule Meeting</span>
      </div>
      <div className="flex flex-col items-center gap-2 cursor-pointer">
        <div className="w-16 h-16 rounded-xl bg-[#0D98BA] flex items-center justify-center text-white text-2xl md:text-3xl font-bold">
          <FaUserPlus />
        </div>
        <span className="text-center text-sm sm:text-lg">Join Meeting</span>
      </div>
      <div
        className="flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => router.push("/recordings")}
      >
        <div className="w-16 h-16 rounded-xl bg-[#00CCFF] flex items-center justify-center text-white text-2xl md:text-3xl font-bold">
          <BsFillRecordCircleFill />
        </div>
        <span className="text-center text-sm sm:text-lg">View Records</span>
      </div>

      {!calldetails ? (
      <Meeting_Modal
        isOpen={Meeting_Type === "schedule-meeting"}
        icon={IoCreate}
        onClose={() => setMeeting_Type(null)}
          title="Create Meeting"
          buttonText="Schedule a meeting"
        handleClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <Label className="text-base text-normal leading-5.5">Add a description</Label>
            <Textarea placeholder="Type your description here."
              onChange={(e) => {
              setCallInfo({...callInfo, description: e.target.value})
            }}/>
          </div>

          <div className="flex flex-col gap-2.5">
            <Label>Select Date  & Time</Label>
            <ReactDatePicker
              selected={callInfo.date}
              onChange={(date: Date | null) => { if (date) setCallInfo({ ...callInfo, date: date }) }}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-3 p-2 focus:outline-none"
            />
          
          </div>
      </Meeting_Modal>
      ) : (
        <Meeting_Modal
        isOpen={Meeting_Type === "schedule-meeting"}
        icon={BsClipboardCheckFill}
        onClose={() => setMeeting_Type(null)}
        title="Meeting Created"
        className="text-center"
        buttonText="Copy Meeting Link"
            handleClick={() => {
              navigator.clipboard.writeText(meetinglink)
              toast("Linked has been copied succesfully!!")
            }}
      />
      )}

      <Meeting_Modal
        isOpen={Meeting_Type === "instant-meeting"}
        icon={SiGooglemeet}
        onClose={() => setMeeting_Type(null)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </section>
  );
};

export default MettingTypeList;
