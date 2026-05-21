// "use client";

// import Image from "next/image";

// import { cn } from "@/lib/utils";
// import { Button } from "./ui/button";
// import { avatarImages } from "@/constants";
// import { toast } from "sonner";

// interface MeetingCardProps {
//   title: string;
//   date: string;
//   icon: string;
//   isPreviousMeeting?: boolean;
//   buttonIcon1?: string;
//   buttonText?: string;
//   handleClick: () => void;
//   link: string;
// }

// const MeetingCard = ({
//   icon,
//   title,
//   date,
//   isPreviousMeeting,
//   buttonIcon1,
//   handleClick,
//   link,
//   buttonText,
// }: MeetingCardProps) => {
//   //   const { toast } = useToast();

//   return (
//     <section className="flex min-h-64.5 w-full flex-col justify-between rounded-[14px] bg-dark-1 px-5 py-8 xl:max-w-142">
//       <article className="flex flex-col gap-5">
//         <Image src={icon} alt="upcoming" width={28} height={28} />
//         <div className="flex justify-between">
//           <div className="flex flex-col gap-2">
//             <h1 className="text-2xl font-bold">{title}</h1>
//             <p className="text-base font-normal">{date}</p>
//           </div>
//         </div>
//       </article>
//       <article className={cn("flex justify-between relative", {})}>
//         <div className="hidden sm:flex items-center">
//           {avatarImages.map((img, index) => (
//             <Image
//               key={index}
//               src={img}
//               alt="attendees"
//               width={40}
//               height={40}
//               className={cn(
//                 "rounded-full border-2 border-dark-1",
//                 index > 0 && "-ml-3",
//               )}
//             />
//           ))}

//           <div className="flex-center -ml-3 size-10 rounded-full border-2 border-dark-3 bg-dark-4 text-sm font-semibold">
//             +5
//           </div>
//         </div>
//         {!isPreviousMeeting && (
//           <div className="flex gap-2">
//             <Button onClick={handleClick} className="rounded bg-blue-1 px-6">
//               {buttonIcon1 && (
//                 <Image src={buttonIcon1} alt="feature" width={20} height={20} />
//               )}
//               &nbsp; {buttonText}
//             </Button>
//             <Button
//               onClick={() => {
//                 navigator.clipboard.writeText(link);
//                 toast("link Copied");
//               }}
//               className="bg-dark-4 px-6"
//             >
//               <Image
//                 src="/icons/copy.svg"
//                 alt="feature"
//                 width={20}
//                 height={20}
//               />
//               &nbsp; Copy Link
//             </Button>
//           </div>
//         )}
//       </article>
//     </section>
//   );
// };

// export default MeetingCard;

"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { avatarImages } from "@/constants";
import { toast } from "sonner";

interface MeetingCardProps {
  title: string;
  date: string;
  icon: string;
  isPreviousMeeting?: boolean;
  buttonIcon1?: string;
  buttonText?: string;
  handleClick: () => void;
  link: string;
}

const MeetingCard = ({
  icon,
  title,
  date,
  isPreviousMeeting,
  buttonIcon1,
  handleClick,
  link,
  buttonText,
}: MeetingCardProps) => {
  return (
    <section
      className={cn(
        "group relative flex w-full flex-col justify-between gap-6",
        "rounded-2xl px-5 py-5",
        "bg-white/[0.04] border border-white/[0.08]",
        "hover:bg-white/[0.06] hover:border-white/[0.13]",
        "transition-all duration-300",
        "xl:max-w-142"
      )}
    >
      {/* Top row: icon badge + status */}
      <article className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          {/* Icon pill */}
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/[0.07] border border-white/[0.1]">
            <Image src={icon} alt="meeting type" width={18} height={18} />
          </div>

          {/* Status badge */}
          {isPreviousMeeting ? (
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.08]">
              <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
              <span className="text-white/40 text-[11px] font-medium tracking-wide">
                Ended
              </span>
            </span>
          ) : (
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <span className="relative flex w-1.5 h-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-emerald-400" />
              </span>
              <span className="text-emerald-400 text-[11px] font-medium tracking-wide">
                Upcoming
              </span>
            </span>
          )}
        </div>

        {/* Title + date */}
        <div className="flex flex-col gap-1.5">
          <h1 className="text-white font-semibold text-lg leading-snug line-clamp-1">
            {title}
          </h1>
          <p className="text-white/40 text-sm font-normal">{date}</p>
        </div>
      </article>

      {/* Divider */}
      <div className="w-full h-px bg-white/[0.06]" />

      {/* Bottom row: avatars + actions */}
      <article className="flex items-center justify-between gap-3">
        {/* Avatar stack */}
        <div className="hidden sm:flex items-center">
          {avatarImages.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt="attendee"
              width={32}
              height={32}
              className={cn(
                "rounded-full border-2 border-[#1a1a2e]",
                index > 0 && "-ml-2.5"
              )}
            />
          ))}
          <div
            className={cn(
              "-ml-2.5 flex items-center justify-center",
              "w-8 h-8 rounded-full",
              "border-2 border-[#1a1a2e]",
              "bg-white/[0.08] text-white/60 text-xs font-semibold"
            )}
          >
            +5
          </div>
        </div>

        {/* Action buttons */}
        {!isPreviousMeeting && (
          <div className="flex items-center gap-2 ml-auto">
            <Button
              onClick={handleClick}
              className={cn(
                "h-8 px-4 rounded-xl text-sm font-medium",
                "bg-sky-500 hover:bg-sky-400 text-white",
                "border-0 transition-colors duration-200",
                "flex items-center gap-1.5"
              )}
            >
              {buttonIcon1 && (
                <Image src={buttonIcon1} alt="action" width={15} height={15} />
              )}
              {buttonText}
            </Button>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(link);
                toast("Link copied!");
              }}
              className={cn(
                "h-8 px-3 rounded-xl text-sm font-medium",
                "bg-white/[0.07] hover:bg-white/[0.12] text-white/70 hover:text-white",
                "border border-white/[0.1] hover:border-white/[0.2]",
                "transition-all duration-200",
                "flex items-center gap-1.5"
              )}
            >
              <Image src="/icons/copy.svg" alt="copy" width={14} height={14} />
              Copy
            </Button>
          </div>
        )}
      </article>
    </section>
  );
};

export default MeetingCard;
