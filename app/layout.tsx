import type { Metadata } from "next";
import {
  ClerkProvider,
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css"
import { Divide } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "SayMeets",
  description: "A video calling App",
  icons: {
    icon: '/icons/saymeets-icon.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${roboto.className} bg-dark-2 antialiased`}
      >
        <ClerkProvider
          appearance={{
            options: {
              logoImageUrl: "/icons/saymeets.png",
              socialButtonsVariant: "iconButton",
            },
            variables: {
              colorForeground: "#FFFFFF",
              colorPrimary: "#0E78F9",
              colorBackground: "#252A41",
              colorInputForeground: "#F5F5F5",
              colorInput: "#1C1F2E",
              ring: "1px solid #FFFFFF",
            },

            elements: {
              // logoBox: 'hidden',
              formFieldInput: {
                borderColor: "#3A3A3A",
                color: "#FFFFFF",
              },

              socialButtonsBlockButton__hover: {
                backgroundColor: "#1C1F2E",
              },

              dividerLine: {
                backgroundColor: "#FFFFFF",
              },

              dividerText: {
                color: "#FFFFFF",
              },

              formFieldInputShowPasswordButton: {
                color: "#FFFFFF",
              },

              footerActionLink: {
                color: "#0E78F9",
              },
            },
          }}
        >
          {children}
          <Toaster className="bg-dark-4 text-white" />
        </ClerkProvider>
      </body>
    </html>
  );
}
