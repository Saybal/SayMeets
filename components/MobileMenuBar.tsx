

"use client";

import React from "react";

import Link from "next/link";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { usePathname } from "next/navigation";

import {
  Home,
  CalendarDays,
  Video,
  Users,
  MessageSquare,
  Settings,
  Menu,
} from "lucide-react";

import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { SiGooglemeet } from "react-icons/si";

const mobileLinks = [
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
  
];

const MobileMenuBar = () => {
  const pathname = usePathname();

  return (
    <section className="block md:hidden">
      <Sheet>
        
        {/* MENU BUTTON */}
        <SheetTrigger>
          <button
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              border
              border-white/10
              bg-white/5
              text-white
              transition-all
              duration-300
              hover:bg-white/10
            "
          >
            <Menu size={22} />
          </button>
        </SheetTrigger>

        {/* SIDEBAR */}
        <SheetContent
          side="left"
          className="
            flex
            w-[290px]
            flex-col
            border-r
            border-white/10
            bg-[#0F172A]
            p-0
            text-white
          "
        >
          {/* HEADER */}
          <div
            className="
              flex
              items-center
              gap-3
              border-b
              border-white/10
              px-6
              py-6
            "
          >
            {/* LOGO */}
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
                shadow-blue-500/20
              "
            >
              <SiGooglemeet
                size={24}
                className="text-white"
              />
            </div>

            {/* BRAND */}
            <div>
              <h1 className="text-xl font-bold">
                SayMeets
              </h1>

              <p className="text-xs text-gray-400">
                Professional Meetings
              </p>
            </div>
          </div>

          {/* NAVIGATION */}
          <div
            className="
              flex
              flex-1
              flex-col
              overflow-y-auto
              px-4
              py-5
            "
          >
            <nav className="flex flex-col gap-2">
              {mobileLinks.map((item) => {
                const isActive =
                  pathname === item.route;

                const Icon = item.icon;

                return (
                  <SheetClose key={item.label}>
                    <Link
                      href={item.route}
                      className={cn(
                        `
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
                      <Icon size={22} />

                      <span className="text-[15px] font-medium">
                        {item.label}
                      </span>
                    </Link>
                  </SheetClose>
                );
              })}
            </nav>

            {/* PROFILE SECTION */}
            <div
              className="
                mt-auto
                border-t
                border-white/10
                pt-5
              "
            >
              <Show when="signed-in">
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
                      rounded-full
                      border
                      border-white/10
                      bg-white/5
                      p-1
                    "
                  >
                    <UserButton
                      appearance={{
                        elements: {
                          avatarBox:
                            "h-11 w-11",
                        },
                      }}
                    />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold">
                      Your Profile
                    </h3>

                    <p className="text-xs text-gray-400">
                      Manage account
                    </p>
                  </div>
                </div>
              </Show>

              {/* AUTH BUTTONS */}
              <Show when="signed-out">
                <div className="flex flex-col gap-3">
                  
                  <SignInButton>
                    <button
                      className="
                        w-full
                        rounded-xl
                        border
                        border-white/10
                        bg-white/5
                        px-4
                        py-3
                        font-medium
                        transition-all
                        hover:bg-white/10
                      "
                    >
                      Sign In
                    </button>
                  </SignInButton>

                  <SignUpButton>
                    <button
                      className="
                        w-full
                        rounded-xl
                        bg-blue-500
                        px-4
                        py-3
                        font-semibold
                        text-white
                        transition-all
                        hover:bg-blue-600
                      "
                    >
                      Get Started
                    </button>
                  </SignUpButton>
                </div>
              </Show>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileMenuBar;
