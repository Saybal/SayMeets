"use client";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";

const MobileMenuBar = () => {
  const path = usePathname();

  return (
    <section className="w-full max-w-66 block sm:hidden">
      <Sheet>
        <SheetTrigger>
          <Image
            src="/icons/hamburger.svg"
            alt="hamburger-menu"
            width={36}
            height={36}
            className="cursor-pointer block sm:hidden"
          />
        </SheetTrigger>
        <SheetContent side="left" className="bg-dark-1 border-0 p-3 text-white">
          <div className="flex flex-1 flex-col gap-6">
            <Link href="/" className="flex items-center gap-1">
              <Image
                src="/icons/logo.svg"
                alt="logo"
                width={30}
                height={30}
                className="max-sm:10"
              />

              <p className="text-[20px] text-white font-extrabold">SayMeets</p>
            </Link>

            <div className="flex justify-between flex-col overflow-y-auto h-[calc(100vh - 72px)]">
              {sidebarLinks.map((link) => {
                const active = path === link.route;
                return (
                  <SheetClose key={link.label}>
                    <Link
                      href={link.route}
                      className={`${active ? "bg-blue-1" : ""} flex gap-4 p-4 items-center rounded-lg justify-start`}
                    >
                      <Image
                        src={link.imgURL}
                        alt={link.label}
                        width={20}
                        height={20}
                      />
                      <p className="font-semibold">{link.label}</p>
                    </Link>
                  </SheetClose>
                );
              })}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileMenuBar;
