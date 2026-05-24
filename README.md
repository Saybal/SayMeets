<div align="center">

# SayMeets

**A production-grade video conferencing platform built with Next.js 16, Stream Video SDK, and Clerk authentication.**

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Stream](https://img.shields.io/badge/Stream_Video-SDK-005FFF?logo=stream)](https://getstream.io/video/)
[![Clerk](https://img.shields.io/badge/Auth-Clerk-6C47FF?logo=clerk)](https://clerk.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38BDF8?logo=tailwindcss)](https://tailwindcss.com/)

[Live Demo](https://say-meets.vercel.app/) · [Features](#features) · [Tech Stack](#tech-stack) · [Getting Started](#getting-started)

</div>

---

## The Problem

Most video conferencing tools are either too heavyweight to build upon, or too minimal to be useful. SayMeets bridges that gap — a fully-featured, self-brandable video calling application that rivals commercial tools in capability, built entirely on modern open-source and best-in-class managed services.

---

## Demo

> 🎥 **Live Demo:** `https://say-meets.vercel.app` 

| Home Dashboard | Pre-join Setup | Live Meeting Room |
|---|---|---|
| ![Home](https://i.ibb.co.com/HLtnkWjs/image.png) | ![Setup](https://i.ibb.co.com/7xjxLTn0/image.png) | ![Room](https://i.ibb.co.com/bj8JHbg9/image.png) |

---

## Features

**Core Meeting Capabilities**
- **Instant meetings** — start a call in one click with a shareable link generated immediately
- **Scheduled meetings** — book ahead with a date/time picker and invite link
- **Personal room** — a persistent, always-available meeting room tied to your account
- **Join via link** — paste any meeting URL or ID to join an existing session
- **Recordings** — Watch recordings of previous sessions.

**In-Call Experience**
- Multiple layout modes: Grid, Speaker Left, and Speaker Right — switchable mid-call
- True fullscreen mode that strips the UI for focused viewing
- Collapsible control bar so participants can maximize screen real estate
- Slide-in participants panel with live attendee list
- Real-time call quality stats via the built-in stats button
- Host-only "End Call for Everyone" button distinct from leaving

**Device & Setup**
- Pre-join lobby with live camera preview, mic/camera toggles, and device settings selector
- Camera and microphone state are controlled independently before entering
- Graceful fallback loader while devices initialize

**Account & History**
- Upcoming meetings dashboard with sorted upcoming calls
- Previous meetings archive filtered by ended/started time
- Recordings browser for reviewing past sessions
- Authentication via Clerk with social login support and custom branded UI

**UI & Polish**
- Animated action cards with per-category color accents and hover glow effects
- Responsive design: sidebar navigation on desktop, sheet-based mobile menu
- Toast notifications for all key actions (meeting created, link copied, etc.)
- Dark glassmorphism design system with consistent Tailwind design tokens
- Lottie-powered loading animations

---

## Tech Stack

| Layer | Technology | Why |
|---|---|---|
| **Framework** | Next.js 16 (App Router) | Server components, nested layouts, and file-based routing enable clean separation of auth, meeting, and dashboard flows |
| **Video** | Stream Video React SDK | Production-grade WebRTC infrastructure — handles media negotiation, recording, and participant state without custom signaling |
| **Auth** | Clerk | Drop-in auth with JWT token generation used directly by Stream's SDK for secure per-user video access |
| **Styling** | Tailwind CSS v4 + shadcn/ui | Utility-first styling with accessible, composable primitives for dialogs, dropdowns, and form controls |
| **Animations** | GSAP, Motion, Lottie | Layered animation strategy: Lottie for loaders, Motion for layout transitions, GSAP for complex sequences |
| **Notifications** | Sonner | Non-blocking toast feedback for async actions |
| **Language** | TypeScript 5 | End-to-end type safety from Stream's typed SDK through to component props |

### Architecture Overview

```
┌─────────────────────────────────────────┐
│            Next.js App Router           │
│  ┌─────────────┐  ┌────────────────────┐│
│  │  (auth)     │  │       (root)       ││
│  │  /sign_in   │  │  /Home             ││
│  │  /sign_up   │  │  /upcoming         ││
│  └─────────────┘  │  /previous         ││
│                   │  /recordings       ││
│                   │  /personal-room    ││
│                   │  /meeting/[id]     ││
│                   └────────────────────┘│
└────────────────┬────────────────────────┘
                 │
       ┌─────────▼──────────┐
       │  Stream_Video_     │  ← Context provider wrapping
       │  Provider          │    authenticated subtree
       └─────────┬──────────┘
                 │
    ┌────────────▼────────────────────┐
    │  Server Action: generateToken   │  ← Clerk currentUser()
    │  (stream.action.ts)             │    + Stream SDK token
    └─────────────────────────────────┘
```

**Key design decisions:**

- **Token generation is a Server Action** — the Stream API secret never reaches the client; Clerk's `currentUser()` runs server-side and generates a scoped token with a 1-hour validity window
- **`useMemo` on the Stream client** — the `StreamVideoClient` is instantiated once per authenticated session, preventing expensive re-initializations on re-renders
- **Optimistic UI for camera/mic state** — local toggle state drives `call.camera.enable/disable()` via `useEffect`, so controls feel instant even before the SDK confirms
- **Route group layouts** — `(auth)` and `(root)` are isolated layout groups, keeping Clerk's provider, Stream's provider, and global nav each scoped to the correct subtree

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Clerk](https://clerk.com) account (free tier works)
- A [Stream](https://getstream.io) account with a Video project (free tier works)

### 1. Clone the repository

```bash
git clone https://github.com/Saybal/SayMeets.git
cd saymeets
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the project root:

```env
# Clerk – from your Clerk dashboard → API Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Clerk redirect URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign_in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign_up

# Stream – from your Stream dashboard → Video & Audio → your app
NEXT_PUBLIC_STREAM_API_KEY=your_stream_api_key
STREAM_APP_SECRET=your_stream_secret

# Your deployment URL (use http://localhost:3000 for local dev)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

**Where to find these values:**

| Variable | Location |
|---|---|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` / `CLERK_SECRET_KEY` | Clerk Dashboard → Your App → API Keys |
| `NEXT_PUBLIC_STREAM_API_KEY` / `STREAM_APP_SECRET` | Stream Dashboard → Your App → Overview |

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Sign up for an account and start a meeting.

### 5. Deploy (optional)

The project is ready to deploy on Vercel with zero configuration:

```bash
npx vercel
```

Make sure to add all environment variables in your Vercel project settings before deploying.

---

## Project Structure

```
zoom-clone/
├── actions/
│   └── stream.action.ts        # Server Action: secure token generation
├── app/
│   ├── (auth)/                 # Sign-in / sign-up pages (Clerk)
│   └── (root)/
│       ├── (home)/             # Dashboard, upcoming, previous, recordings
│       └── meeting/[id]/       # Dynamic meeting room route
├── components/
│   ├── Meeting_Room.tsx        # In-call UI: layouts, controls, participants panel
│   ├── Meeting_SetUp.tsx       # Pre-join lobby with camera/mic preview
│   ├── MettingTypeList.tsx     # Home action cards (instant, schedule, join, recordings)
│   ├── CallList.tsx            # Reusable call history/recording list
│   ├── MeetingCard.tsx         # Individual meeting card with join/copy actions
│   └── ui/                     # shadcn/ui primitives
├── hooks/
│   ├── useGetCalls.ts          # Stream call query hook (upcoming/ended/today filters)
│   └── useGetCallByID.ts       # Single call lookup for the meeting room
├── providers/
│   └── StreamVideoClient.tsx  # Stream Video context provider
└── constants/
    └── index.ts                # Sidebar nav links, avatar images
```

---

## Roadmap

- [ ] In-call text chat panel
- [ ] Screen sharing controls
- [ ] Meeting waiting room / host admit gate
- [ ] Calendar integration for scheduled meetings
<!-- - [ ] Email notifications for upcoming meetings -->

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.


<div align="center">

Built by **Saybal Roy** · [Portfolio](https://saybal-roy-portfolio.netlify.app/) · [LinkedIn](https://www.linkedin.com/in/saybal-roy/) · [GitHub](https://github.com/Saybal)

</div>
