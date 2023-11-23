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
          <link rel="icon" href="/icons8-todo-list-100.png" />
          <meta property='og:url' content='https://to-do-app-ivory-nu.vercel.app/' />
          <meta name="image" property="og:image"
            content="https://res.cloudinary.com/dimy1fj2c/image/upload/v1700665730/jviehpcc7gg6yajeyobp.png"></meta>
          <meta name="author" content="Giorgi Patsia"></meta>


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
