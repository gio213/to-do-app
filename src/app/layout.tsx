import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

import { AuthContextWrapper } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo App",
  description: "To do list app is a simple app that allows you to create a list of tasks that you need to complete. All todos are stored in the cloud, so you can access them from anywhere.",


  // url: "https://to-do-app-ivory-nu.vercel.app/",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthContextWrapper>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="description" content={metadata.description as string} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>{metadata.title as string}</title>
          <link rel="icon" href="/favicon.ico" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
            rel="stylesheet"
          />
        </head>
        <body className={inter.className}>
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </AuthContextWrapper>
  );
}
