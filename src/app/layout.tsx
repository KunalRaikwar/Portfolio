import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kunal Raikwar | Full Stack Developer",
  description: "Portfolio of Kunal Raikwar, a Full Stack Developer specializing in modern MERN Stack applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} bg-background text-foreground min-h-screen font-sans antialiased selection:bg-indigo-500/30`}
      >
        {children}
      </body>
    </html>
  );
}
