import "~/styles/globals.css";

import { type Metadata } from "next";
import { Chakra_Petch, Geist, Inter } from "next/font/google";
import { cn } from "~/lib/utils";
import QueryProvider from "~/components/providers/query-provider";
import SmoothScrollProvider from "~/components/providers/smooth-scroll-provider";
import { Toaster } from "sonner";

const chakra = Chakra_Petch({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-chakra",
});

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "SingleClick — AI Carousel Builder & Studio",
  description:
    "Create, customize, and publish multi-slide social media carousels in seconds.",
  icons: [
    { rel: "icon", url: "/icon.svg", type: "image/svg+xml" },
    { rel: "shortcut icon", url: "/icon.svg" },
  ],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={cn(
        chakra.variable,
        geist.variable,
        inter.variable,
        "font-chakra antialiased",
      )}
    >
      <body>
        <SmoothScrollProvider>
          <QueryProvider>
            {children}
            <Toaster />
          </QueryProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
