import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import "./globals.css";

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  display: "swap",
});


export const metadata: Metadata = {
  title: "Concurrencia en Go",
  description: "Recursos y tutoriales para aprender concurrencia en Go.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${publicSans.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
