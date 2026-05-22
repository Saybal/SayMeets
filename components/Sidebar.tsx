// "use client";
// import { sidebarLinks } from '@/constants';
// import Image from 'next/image';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import React from 'react'

// const Sidebar = () => {

//     const path = usePathname();
//   return (
//       <section className='sticky left-0 top-0 flex flex-col justify-between h-screen w-fit bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]'>
//           <div className='flex flex-1 flex-col gap-6'>
//               {sidebarLinks.map((link) => {
//                   const active = path === link.route ;
//                   return (
//                       <Link
//                           href={link.route}
//                           key={link.label}
//                           className={`${active ? "bg-blue-1" : ""} flex gap-4 p-4 items-center rounded-lg justify-start`}>
//                           <Image
//                               src={link.imgURL}
//                               alt={link.label}
//                               width={24}
//                               height={24} />
//                           <p className='text-lg font-semibold max-lg:hidden'>{link.label}</p>
//                       </Link>
//                   )
//               })}
//           </div>
          
//     </section>
//   )
// }

// export default Sidebar;

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Home,
  CalendarDays,
  Video,
  Users,
  MessageSquare,
  Settings,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";

const sidebarLinks = [
  {
    label: "Home",
    route: "/",
    icon: Home,
  },
  {
    label: "Upcoming",
    route: "/upcoming",
    icon: CalendarDays,
  },
  {
    label: "Meetings",
    route: "/meetings",
    icon: Video,
  },
  {
    label: "Participants",
    route: "/participants",
    icon: Users,
  },
  {
    label: "Messages",
    route: "/messages",
    icon: MessageSquare,
  },
  {
    label: "Settings",
    route: "/settings",
    icon: Settings,
  },
];

const Sidebar = () => {
    const pathname = usePathname();
    const {user} = useUser()

  return (
    <aside
      className="
        sticky
        left-0
        top-0
        z-30
        hidden
        h-screen
        w-[88px]
        flex-col
        border-r
        border-white/10
        bg-[#0F172A]
        px-3
        py-6
        text-white
        transition-all
        duration-300
        lg:flex
        xl:w-[260px]
      "
    >
      {/* LOGO */}
      <div
        className="
          mb-10
          flex
          items-center
          gap-3
          px-3
        "
      >
        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-blue-500
            shadow-lg
          "
        >
          <Video size={24} />
        </div>

        <div className="hidden xl:block">
          <h1 className="text-lg font-bold">
            MeetSpace
          </h1>

          <p className="text-sm text-gray-400">
            Video Conference
          </p>
        </div>
      </div>

      {/* MENU */}
      <nav className="flex flex-1 flex-col gap-2">
        {sidebarLinks.map((item) => {
          const isActive =
            pathname === item.route;

          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.route}
              className={cn(
                `
                  group
                  flex
                  items-center
                  gap-4
                  rounded-2xl
                  px-4
                  py-4
                  transition-all
                  duration-300
                `,
                isActive
                  ? "bg-blue-500 text-white shadow-lg"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <div
                className={cn(
                  `
                    flex
                    items-center
                    justify-center
                  `,
                  isActive
                    ? "scale-110"
                    : "group-hover:scale-105"
                )}
              >
                <Icon size={22} />
              </div>

              <span
                className="
                  hidden
                  text-[15px]
                  font-medium
                  xl:block
                "
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* PROFILE / FOOTER */}
      <div
        className="
          mt-6
          border-t
          border-white/10
          pt-5
        "
      >
        <div
          className="
            flex
            items-center
            gap-3
            rounded-2xl
            bg-white/5
            p-3
          "
        >
          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              bg-gradient-to-br
              from-blue-500
              to-indigo-500
              text-sm
              font-bold
            "
          >
            {user?.lastName}
          </div>

          <div className="hidden xl:block">
            <h3 className="text-sm font-semibold">
              {user?.fullName}
            </h3>

            <p className="text-xs text-gray-400">
              {user?.username}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;