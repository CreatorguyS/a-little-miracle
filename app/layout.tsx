import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "A Little Miracle | For RANI DIDI, JIJU & BHANJI",
  description: "A little digital keepsake celebrating Rani Didi, Jiju and their little miracle, Bhanji.",
  openGraph: {
    title: "A Little Miracle ✨ | For Rani Didi, Jiju & Bhanji",
    description: "A little miracle has arrived. Sending all my love to Rani Didi, Jiju and Bhanji.",
    type: "website"
  },
  icons: { icon: "/favicon.svg" }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fbf8f5"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
