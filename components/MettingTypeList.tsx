// "use client";
// import { useRouter } from "next/navigation";
// import React, { useState } from "react";
// import { BsClipboardCheckFill, BsFillRecordCircleFill } from "react-icons/bs";
// import { FaCalendarPlus } from "react-icons/fa";
// import { FaPlus, FaUserPlus } from "react-icons/fa6";
// import Meeting_Modal from "./Meeting_Modal";
// import { SiGooglemeet } from "react-icons/si";
// import { useUser } from "@clerk/nextjs";
// import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
// import { IoCreate } from "react-icons/io5";
// import { Label } from "./ui/label";
// import { Textarea } from "./ui/textarea";
// import ReactDatePicker from "react-datepicker";
// import { toast } from "sonner";
// import Loader from "./Loader";
// import { Input } from "./ui/input";

// const MettingTypeList = () => {
//   const router = useRouter();
//   const [Meeting_Type, setMeeting_Type] = useState<string | null>(null);
//   const { user } = useUser();
//   const client = useStreamVideoClient();
//   const [callInfo, setCallInfo] = useState<{
//     date_time: Date;
//     description: string;
//     link: string;
//   }>({
//     date_time: new Date(),
//     description: "",
//     link: "",
//   });

//   const [calldetails, setCalldetails] = useState<Call | null>(null);

//   const handleClick = (type: string) => {
//     setMeeting_Type(type);
//   };

//   const createMeeting = async () => {
//     if (!user || !client) return;

//     try {
//       const callType = "default"; // You can customize this based on your needs
//       const callId = crypto.randomUUID();
//       const call = client.call(callType, callId);

//       if (!call) {
//         throw new Error("Failed to create call");
//       }

//       const startsAt =
//         callInfo.date_time.toISOString() || new Date(Date.now()).toISOString();
    
//       const description = callInfo.description || "Instant Meeting";

//       await call.getOrCreate({
//         data: {
//           starts_at: startsAt,
//           custom: {
//             description,
//           },
//         },
//       });

//       await call.camera.disable();
//       await call.microphone.disable();

//       setCalldetails(call);

//       if (!callInfo.description) {
//         router.push(`/meeting/${call.id}`);
//       }
//       toast("Meeting created succesfully");
//     } catch (error) {
//       console.error("Error creating meeting:", error);
//     }
//   };

//   if (!client || !user) return <Loader />;

//   const meetinglink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${calldetails?.id}`;

//   return (
//     <section className="flex items-center justify-center gap-6">
//       <div
//         className="flex flex-col items-center gap-2 cursor-pointer"
//         onClick={() => handleClick("instant-meeting")}
//       >
//         <div className="w-16 h-16 rounded-xl bg-[#FF8C00] flex items-center justify-center text-white text-2xl md:text-3xl font-bold">
//           <FaPlus />
//         </div>
//         <span className="text-center text-sm sm:text-lg">Instant Meeting</span>
//       </div>
//       <div
//         className="flex flex-col items-center gap-2 cursor-pointer"
//         onClick={() => handleClick("schedule-meeting")}
//       >
//         <div className="w-16 h-16 rounded-xl bg-[#568203] flex items-center justify-center text-white text-2xl md:text-3xl font-bold">
//           <FaCalendarPlus />
//         </div>
//         <span className="text-center text-sm sm:text-lg">Schedule Meeting</span>
//       </div>
//       <div
//         className="flex flex-col items-center gap-2 cursor-pointer"
//         onClick={() => handleClick("join-meeting")}
//       >
//         <div className="w-16 h-16 rounded-xl bg-[#0D98BA] flex items-center justify-center text-white text-2xl md:text-3xl font-bold">
//           <FaUserPlus />
//         </div>
//         <span className="text-center text-sm sm:text-lg">Join Meeting</span>
//       </div>
//       <div
//         className="flex flex-col items-center gap-2 cursor-pointer"
//         onClick={() => router.push("/recordings")}
//       >
//         <div className="w-16 h-16 rounded-xl bg-[#00CCFF] flex items-center justify-center text-white text-2xl md:text-3xl font-bold">
//           <BsFillRecordCircleFill />
//         </div>
//         <span className="text-center text-sm sm:text-lg">View Records</span>
//       </div>

//       {!calldetails ? (
//         <Meeting_Modal
//           isOpen={Meeting_Type === "schedule-meeting"}
//           icon={IoCreate}
//           onClose={() => setMeeting_Type(null)}
//           title="Create Meeting"
//           buttonText="Schedule a meeting"
//           handleClick={createMeeting}
//         >
//           <div className="flex flex-col gap-2.5">
//             <Label className="text-base text-normal leading-5.5">
//               Add a description
//             </Label>
//             <Textarea
//               placeholder="Type your description here."
//               onChange={(e) => {
//                 setCallInfo({ ...callInfo, description: e.target.value });
//               }}
//             />
//           </div>

//           <div className="flex flex-col gap-2.5">
//             <Label>Select Date & Time</Label>
//             <ReactDatePicker
//               selected={callInfo.date_time}
//               onChange={(date: Date | null) => {
//                 if (date) {
//                   console.log("Picked:", date);
//                   setCallInfo({ ...callInfo, date_time: date! });
//                 }
//               }}
//               showTimeSelect
//               timeFormat="HH:mm"
//               timeIntervals={15}
//               timeCaption="time"
//               dateFormat="MMMM d, yyyy h:mm aa"
//               minDate={new Date()}
//               minTime={
//                 callInfo.date_time.toDateString() === new Date().toDateString()
//                   ? new Date()
//                   : new Date(0, 0, 0, 0, 0)
//               }
//               maxTime={new Date(0, 0, 0, 23, 45)}
//               className="w-full rounded bg-dark-3 p-2 focus:outline-none"
//             />
//           </div>
//         </Meeting_Modal>
//       ) : (
//         <Meeting_Modal
//           isOpen={Meeting_Type === "schedule-meeting"}
//           icon={BsClipboardCheckFill}
//           onClose={() => setMeeting_Type(null)}
//           title="Meeting Created"
//           className="text-center"
//           buttonText="Copy Meeting Link"
//           handleClick={() => {
//             navigator.clipboard.writeText(meetinglink);
//             toast("Linked has been copied succesfully!!");
//           }}
//         />
//       )}

//       <Meeting_Modal
//         isOpen={Meeting_Type === "instant-meeting"}
//         icon={SiGooglemeet}
//         onClose={() => setMeeting_Type(null)}
//         title="Start an Instant Meeting"
//         className="text-center"
//         buttonText="Start Meeting"
//         handleClick={createMeeting}
//       />
//       <Meeting_Modal
//         isOpen={Meeting_Type === "join-meeting"}
//         icon={SiGooglemeet}
//         onClose={() => setMeeting_Type(null)}
//         title="Join a new meeting"
//         className="text-center"
//         buttonText="Join Meeting"
//         handleClick={() => router.push(callInfo.link)}
//       >
//         <Label className="text-gray-400">Type or paste the meeting link</Label>
//         <Input
//           placeholder="Meeting link"
//           onChange={(e) => {
//             setCallInfo({ ...callInfo, link: e.target.value });
//           }}
//         />
//       </Meeting_Modal>
//     </section>
//   );
// };

// export default MettingTypeList;


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
import ReactDatePicker from "react-datepicker";
import { toast } from "sonner";
import Loader from "./Loader";
import { Input } from "./ui/input";

type ActionCard = {
  type: string;
  icon: React.ReactNode;
  label: string;
  sublabel: string;
  gradient: string;
  glowColor: string;
  onClick?: () => void;
};

const MettingTypeList = () => {
  const router = useRouter();
  const [Meeting_Type, setMeeting_Type] = useState<string | null>(null);
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [callInfo, setCallInfo] = useState<{
    date_time: Date;
    description: string;
    link: string;
  }>({
    date_time: new Date(),
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
      const callType = "default";
      const callId = crypto.randomUUID();
      const call = client.call(callType, callId);

      if (!call) throw new Error("Failed to create call");

      const startsAt =
        callInfo.date_time.toISOString() || new Date(Date.now()).toISOString();
      const description = callInfo.description || "Instant Meeting";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: { description },
        },
      });

      await call.camera.disable();
      await call.microphone.disable();

      setCalldetails(call);

      if (!callInfo.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast("Meeting created successfully");
    } catch (error) {
      console.error("Error creating meeting:", error);
    }
  };

  if (!client || !user) return <Loader />;

  const meetinglink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${calldetails?.id}`;

  const actions: ActionCard[] = [
    {
      type: "instant-meeting",
      icon: <FaPlus className="w-5 h-5" />,
      label: "New Meeting",
      sublabel: "Start instantly",
      gradient: "from-orange-500/20 to-orange-600/5",
      glowColor: "group-hover:shadow-orange-500/20",
    },
    {
      type: "schedule-meeting",
      icon: <FaCalendarPlus className="w-5 h-5" />,
      label: "Schedule",
      sublabel: "Plan ahead",
      gradient: "from-emerald-500/20 to-emerald-600/5",
      glowColor: "group-hover:shadow-emerald-500/20",
    },
    {
      type: "join-meeting",
      icon: <FaUserPlus className="w-5 h-5" />,
      label: "Join Meeting",
      sublabel: "Via link or ID",
      gradient: "from-sky-500/20 to-sky-600/5",
      glowColor: "group-hover:shadow-sky-500/20",
    },
    {
      type: "recordings",
      icon: <BsFillRecordCircleFill className="w-5 h-5" />,
      label: "Recordings",
      sublabel: "Past sessions",
      gradient: "from-cyan-400/20 to-cyan-500/5",
      glowColor: "group-hover:shadow-cyan-400/20",
      onClick: () => router.push("/recordings"),
    },
  ];

  const iconColors: Record<string, string> = {
    "instant-meeting": "text-orange-400",
    "schedule-meeting": "text-emerald-400",
    "join-meeting": "text-sky-400",
    recordings: "text-cyan-400",
  };

  const borderAccents: Record<string, string> = {
    "instant-meeting": "group-hover:border-orange-500/40",
    "schedule-meeting": "group-hover:border-emerald-500/40",
    "join-meeting": "group-hover:border-sky-500/40",
    recordings: "group-hover:border-cyan-400/40",
  };

  return (
    <>
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
        {actions.map((action) => (
          <button
            key={action.type}
            onClick={action.onClick ?? (() => handleClick(action.type))}
            className={`
              group relative flex flex-col items-start gap-3 
              p-4 sm:p-5 rounded-2xl
              bg-white/[0.04] hover:bg-white/[0.07]
              border border-white/[0.08] ${borderAccents[action.type]}
              transition-all duration-300 ease-out
              shadow-lg ${action.glowColor} group-hover:shadow-xl
              cursor-pointer text-left
            `}
          >
            {/* Gradient wash behind icon */}
            <div
              className={`
                absolute inset-0 rounded-2xl bg-gradient-to-br ${action.gradient}
                opacity-0 group-hover:opacity-100 transition-opacity duration-300
              `}
            />

            {/* Icon pill */}
            <div
              className={`
                relative z-10
                flex items-center justify-center
                w-10 h-10 rounded-xl
                bg-white/[0.06] border border-white/[0.1]
                ${iconColors[action.type]}
                group-hover:scale-105 transition-transform duration-200
              `}
            >
              {action.icon}
            </div>

            {/* Text */}
            <div className="relative z-10">
              <p className="text-white font-semibold text-sm sm:text-base leading-tight">
                {action.label}
              </p>
              <p className="text-white/40 text-xs mt-0.5 font-normal">
                {action.sublabel}
              </p>
            </div>
          </button>
        ))}
      </section>

      {/* Modals */}
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
            <Label className="text-base text-normal leading-5.5">
              Add a description
            </Label>
            <Textarea
              placeholder="Type your description here."
              onChange={(e) =>
                setCallInfo({ ...callInfo, description: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-2.5">
            <Label>Select Date & Time</Label>
            <ReactDatePicker
              selected={callInfo.date_time}
              onChange={(date: Date | null) => {
                if (date) setCallInfo({ ...callInfo, date_time: date });
              }}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              minDate={new Date()}
              minTime={
                callInfo.date_time.toDateString() === new Date().toDateString()
                  ? new Date()
                  : new Date(0, 0, 0, 0, 0)
              }
              maxTime={new Date(0, 0, 0, 23, 45)}
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
            navigator.clipboard.writeText(meetinglink);
            toast("Link has been copied successfully!");
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

      <Meeting_Modal
        isOpen={Meeting_Type === "join-meeting"}
        icon={SiGooglemeet}
        onClose={() => setMeeting_Type(null)}
        title="Join a Meeting"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={() => router.push(callInfo.link)}
      >
        <Label className="text-gray-400">Type or paste the meeting link</Label>
        <Input
          placeholder="Meeting link"
          onChange={(e) =>
            setCallInfo({ ...callInfo, link: e.target.value })
          }
        />
      </Meeting_Modal>
    </>
  );
};

export default MettingTypeList;
