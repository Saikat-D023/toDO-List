import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Medium Blog",
  description: "Editorial landing page for a modern blog experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
