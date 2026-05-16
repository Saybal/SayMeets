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
    <section className="w-full max-w-66">
      <Sheet>
        <SheetTrigger>
          <Image
            src="/icons/hamburger.svg"
            alt="hamburger-menu"
            width={36}
            height={36}
            className="cursor-pointer hidden sm:block"
          />
        </SheetTrigger>
        <SheetContent side="left" className="bg-dark-1 border-0">
          <div className='flex flex-1 flex-col gap-6'>
              {sidebarLinks.map((link) => {
                  const active = path === link.route ;
                  return (
                      <Link
                          href={link.route}
                          key={link.label}
                          className={`${active ? "bg-blue-1" : ""} flex gap-4 p-4 items-center rounded-lg justify-start`}>
                          <Image
                              src={link.imgURL}
                              alt={link.label}
                              width={24}
                              height={24} />
                          <p className='text-lg font-semibold max-lg:hidden'>{link.label}</p>
                      </Link>
                  )
              })}
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileMenuBar;
