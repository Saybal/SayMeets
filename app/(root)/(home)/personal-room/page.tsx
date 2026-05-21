// "use client";
// import { Button } from "@/components/ui/button";
// import { useGetCallByID } from "@/hooks/useGetCallByID";
// import { useUser } from "@clerk/nextjs";
// import { useStreamVideoClient } from "@stream-io/video-react-sdk";
// import { useRouter } from "next/navigation";
// import React from "react";
// import { toast } from "sonner";

// type Props = {
//   title: string;
//   description: string;
// };

// const Table = ({ title, description }: Props) => {
//   return (
//     <div className="flex flex-col xl:flex-row items-start gap-2">
//       <h1 className="text-base font-medium text-sky-1 lg:text-xl xl:min-w-32">
//         {title}
//       </h1>
//       <h1 className="truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl">
//         {description}
//       </h1>
//     </div>
//   );
// };

// const Personal_Room = () => {
  
//   const { user } = useUser();
//   const meeting_link =
//     `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${user?.id}?personal=true` ||
//     "";
//   const { call } = useGetCallByID(user?.id);
//   const client = useStreamVideoClient();
//   const router = useRouter()
  
//   const createRoom = async () => {

//     if (!client || !user) return;

//     if (!call) {
//       const newCall = client.call('default', user?.id);

//       await newCall.getOrCreate({
//         data: {
//           starts_at: new Date().toISOString()
          
//         },
//       });
//     }
//     router.push(`/meeting/${user?.id}?personal=true`)
    
//   };
//   return (
//     <section className="flex flex-col gap-10 size-full text-white">
//       <h1 className="text-3xl font-bold">Personal Room</h1>

//       <div className="w-full flex flex-col gap-8 xl:max-w-225">
//         <Table
//           title="Topic:"
//           description={`${user?.username}'s meeting room`}
//         />
//         <Table title="Meeting ID:" description={user?.id || ""} />
//         <Table title="Invite Link:" description={meeting_link} />
//       </div>

//       <div className="flex gap-5">
//         <Button className="bg-blue-1 cursor-pointer" onClick={createRoom}>
//           Start Meeting
//         </Button>

//         <Button
//           className="bg-dark-3 cursor-pointer"
//           onClick={() => {
//             navigator.clipboard.writeText(meeting_link);
//             toast("link Copied");
//           }}
//         >
//           Copy Link
//         </Button>
//       </div>
//     </section>
//   );
// };

// export default Personal_Room;

"use client";
import { Button } from "@/components/ui/button";
import { useGetCallByID } from "@/hooks/useGetCallByID";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { BsFillPersonFill } from "react-icons/bs";
import { IoCopy, IoLink } from "react-icons/io5";
import { MdMeetingRoom } from "react-icons/md";
import { HiIdentification } from "react-icons/hi2";

type TableRowProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  isLink?: boolean;
  onCopy?: () => void;
};

const TableRow = ({ icon, title, description, isLink, onCopy }: TableRowProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 py-4 border-b border-white/[0.06] last:border-0">
      {/* Label */}
      <div className="flex items-center gap-2 sm:min-w-36">
        <span className="text-white/30 text-base">{icon}</span>
        <span className="text-white/40 text-sm font-medium">{title}</span>
      </div>

      {/* Value + optional copy */}
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <p
          className={`
            text-sm font-medium truncate flex-1
            ${isLink ? "text-sky-400" : "text-white/80"}
          `}
        >
          {description}
        </p>
        {onCopy && (
          <button
            onClick={onCopy}
            className="
              shrink-0 flex items-center justify-center
              w-7 h-7 rounded-lg
              bg-white/[0.05] hover:bg-white/[0.1]
              border border-white/[0.08] hover:border-white/[0.18]
              text-white/40 hover:text-white/80
              transition-all duration-200
            "
            title="Copy"
          >
            <IoCopy className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};

const Personal_Room = () => {
  const { user } = useUser();
  const meeting_link =
    `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${user?.id}?personal=true` || "";
  const { call } = useGetCallByID(user?.id);
  const client = useStreamVideoClient();
  const router = useRouter();

  const createRoom = async () => {
    if (!client || !user) return;
    if (!call) {
      const newCall = client.call("default", user?.id);
      await newCall.getOrCreate({
        data: { starts_at: new Date().toISOString() },
      });
    }
    router.push(`/meeting/${user?.id}?personal=true`);
  };

  return (
    <section className="flex flex-col gap-8 size-full text-white">

      {/* Page header */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20">
          <BsFillPersonFill className="w-5 h-5 text-sky-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Personal Room</h1>
          <p className="text-white/35 text-sm mt-0.5">
            Your permanent meeting space
          </p>
        </div>
      </div>

      {/* Info card */}
      <div className="w-full xl:max-w-2xl rounded-2xl bg-white/[0.04] border border-white/[0.08] overflow-hidden">

        {/* Card header */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06] bg-white/[0.02]">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-white/50 text-xs font-semibold uppercase tracking-widest">
            Room Details
          </span>
        </div>

        {/* Rows */}
        <div className="px-5 py-2">
          <TableRow
            icon={<MdMeetingRoom />}
            title="Topic"
            description={`${user?.username}'s Personal Room`}
          />
          <TableRow
            icon={<HiIdentification />}
            title="Meeting ID"
            description={user?.id || "—"}
            onCopy={() => {
              navigator.clipboard.writeText(user?.id || "");
              toast("Meeting ID copied!");
            }}
          />
          <TableRow
            icon={<IoLink />}
            title="Invite Link"
            description={meeting_link}
            isLink
            onCopy={() => {
              navigator.clipboard.writeText(meeting_link);
              toast("Link copied!");
            }}
          />
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-3 flex-wrap">
        <Button
          onClick={createRoom}
          className="
            h-10 px-6 rounded-xl text-sm font-semibold
            bg-sky-500 hover:bg-sky-400 text-white
            border-0 transition-colors duration-200
            flex items-center gap-2
          "
        >
          <MdMeetingRoom className="w-4 h-4" />
          Start Meeting
        </Button>

        <Button
          onClick={() => {
            navigator.clipboard.writeText(meeting_link);
            toast("Link copied!");
          }}
          className="
            h-10 px-5 rounded-xl text-sm font-medium
            bg-white/[0.07] hover:bg-white/[0.12]
            text-white/70 hover:text-white
            border border-white/[0.1] hover:border-white/[0.2]
            transition-all duration-200
            flex items-center gap-2
          "
        >
          <IoCopy className="w-4 h-4" />
          Copy Link
        </Button>
      </div>
    </section>
  );
};

export default Personal_Room;