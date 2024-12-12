import type { Metadata } from "next";
import "./globals.css";
import { Mulish } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";

const mulish = Mulish({
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "App de Finanças",
  description: "App de Finanças com Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${mulish.className} antialiased`}>
        <ClerkProvider>
          <ReactQueryProvider>
            <div className="flex h-full flex-col overflow-hidden bg-zinc-50 dark:bg-zinc-950">
              <Navbar />
              {children}
            </div>
          </ReactQueryProvider>
          <Toaster />
        </ClerkProvider>
      </body>
    </html>
  );
}
