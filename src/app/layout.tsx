"use client";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import Provider from "../components/Provider";
import Nav from "../components/Nav";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({ children, session }) {
  return (
    <>
      <html>
        <body>
          <Provider session={session}>
            <Nav />
            <main className="flex min-h-screen flex-col items-center justify-between px-10 py-6">
              {children}
            </main>
          </Provider>
        </body>
        <ToastContainer />
      </html>
    </>
  );
}
