import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileMenuBar from './MobileMenuBar'
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { SiGooglemeet } from 'react-icons/si'

const Navbar = () => {
  return (
    <nav className='flex justify-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10'>
      <Link
  href="/"
  className="flex items-center gap-2 sm:gap-3 shrink-0"
>
  <div className="rounded-xl bg-blue-1 p-2 sm:p-2.5 md:p-3 shadow-lg">
    <SiGooglemeet className="text-lg sm:text-xl md:text-2xl text-white" />
  </div>

  <p
    className="
      text-lg
      sm:text-2xl
      md:text-[26px]
      font-extrabold
      text-white
      whitespace-nowrap
    "
  >
    SayMeets
  </p>
</Link>

      <div className='flex justify-between gap-5'>

        <Show when="signed-in">
              <UserButton />
            </Show>

        <div className='md:hidden'>

        <MobileMenuBar/>
        </div>
        
      </div>
    </nav>
  )
}

export default Navbar

// "use client";

// import Link from "next/link";
// import React from "react";

// import {
//   SignInButton,
//   SignUpButton,
//   UserButton,
//   Show,
// } from "@clerk/nextjs";

// import {
//   Menu,
//   Video,
// } from "lucide-react";

// import MobileMenuBar from "./MobileMenuBar";
// import { SiGooglemeet } from "react-icons/si";

// const Navbar = () => {
//   return (
//     <header
//       className="
//         fixed
//         top-0
//         z-50
//         w-full
//         border-b
//         border-white/10
//         bg-[#0F172A]/95
//         backdrop-blur-xl
//       "
//     >
//       <nav
//         className="
//           mx-auto
//           flex
//           h-18
//           w-full
//           items-center
//           justify-between
//           px-4
//           sm:px-6
//           lg:px-10
//         "
//       >
//         {/* LEFT */}
//         <Link
//           href="/"
//           className="
//             flex
//             items-center
//             gap-3
//             transition-all
//             duration-300
//             hover:opacity-90
//           "
//         >
//           {/* LOGO */}
//           <div
//             className="
//               flex
//               h-12
//               w-12
//               items-center
//               justify-center
//               rounded-2xl
//               bg-blue-500
//               shadow-lg
//               shadow-blue-500/20
//             "
//           >
//             {/* SAME ICON FOR ALL SCREEN SIZES */}
//             <SiGooglemeet className="text-lg sm:text-xl md:text-2xl text-white" />
//           </div>

//           {/* BRAND */}
//           <div className="flex flex-col">
//             <h1
//               className="
//                 text-xl
//                 font-bold
//                 tracking-tight
//                 text-white
//                 sm:text-2xl
//               "
//             >
//               SayMeets
//             </h1>

//             <p
//               className="
//                 hidden
//                 text-xs
//                 text-gray-400
//                 sm:block
//               "
//             >
//               Professional Meetings
//             </p>
//           </div>
//         </Link>

//         {/* RIGHT */}
//         <div className="flex items-center gap-3">
          
//           {/* DESKTOP AUTH */}
//           <div className="hidden items-center gap-3 md:flex">
            
//             <Show  when="signed-out">
//               <SignInButton>
//                 <button
//                   className="
//                     rounded-xl
//                     border
//                     border-white/10
//                     bg-white/5
//                     px-5
//                     py-2.5
//                     text-sm
//                     font-medium
//                     text-white
//                     transition-all
//                     duration-300
//                     hover:bg-white/10
//                   "
//                 >
//                   Sign In
//                 </button>
//               </SignInButton>

//               <SignUpButton>
//                 <button
//                   className="
//                     rounded-xl
//                     bg-blue-500
//                     px-5
//                     py-2.5
//                     text-sm
//                     font-semibold
//                     text-white
//                     shadow-lg
//                     shadow-blue-500/20
//                     transition-all
//                     duration-300
//                     hover:bg-blue-600
//                   "
//                 >
//                   Get Started
//                 </button>
//               </SignUpButton>
//             </Show>

//             {/* PROFILE ONLY ON DESKTOP */}
//             <Show when="signed-in">
//               <div
//                 className="
//                   rounded-full
//                   border
//                   border-white/10
//                   bg-white/5
//                   p-1
//                 "
//               >
//                 <UserButton
//                   appearance={{
//                     elements: {
//                       avatarBox:
//                         "h-10 w-10",
//                     },
//                   }}
//                 />
//               </div>
//             </Show>
//           </div>

//           {/* MOBILE MENU */}
//           <div className="md:hidden">
//             <MobileMenuBar />
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Navbar;