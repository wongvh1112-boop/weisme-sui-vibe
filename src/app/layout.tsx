import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import { Providers } from "./providers";
import "@mysten/dapp-kit/dist/index.css";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WEISME SUI VIBE FEST",
  description:
    "Express your vibe on the Sui Blockchain. Power by Sui & Slush.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${orbitron.variable} antialiased font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
