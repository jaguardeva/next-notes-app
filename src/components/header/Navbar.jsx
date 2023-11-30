"use client";

import React from "react";
import Link from "next/link";
import Button from "../Button";
import { usePathname } from "next/navigation";

export default function Navbar({ children }) {
  const currentPath = usePathname();

  return (
    <>
      <header className="w-full shadow-md sticky top-0 bg-white">
        <div className="max-w-[1240px] mx-auto px-4 flex justify-between items-center h-[80px]">
          {currentPath === "/" ? (
            <Link href="/">
              <h1 className="font-bold text-xl md:text-2xl">
                NOTES<span className="text-blue-500 italic">APP</span>
              </h1>
            </Link>
          ) : (
            <Link href="/" className="font-bold text-xl md:text-2xl">
              NOTES<span className="text-blue-500 italic">APP</span>
            </Link>
          )}

          {/* {currentPath === "/" && (
            <input
              className="p-4 border border-gray-300 hidden md:flex rounded-md w-[50%] focus:outline-none focus:ring-1 focus:ring-blue-500"
              type="text"
              placeholder="Type your search..."
            />
          )} */}
          {/* {currentPath === "/" && (
            <Button
              classname="bg-blue-500 font-medium text-sm  rounded-sm text-white hover:bg-blue-600 transition-all duration-75 ease-in focus:bg-blue-600 md:text-lg  md:py-2 md:px-4"
              title="Add Note"
              link="/addNote"
            />
          )} */}
        </div>
      </header>
      <main>{children}</main>
    </>
  );
}
