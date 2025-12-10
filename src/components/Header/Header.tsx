"use client";

import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useSession } from "next-auth/react";
// import { assets } from "@/assets/assets";

import {
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import ThemeContext from "@/context/themeContext";
import Image from "next/image";
import { Button } from "../ui/button";

const Header = () => {
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);

  const { data: session } = useSession();

  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white shadow">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="hover:text-blue-600">

          {/* <Image
            className="cursor-pointer w-28 md:w-32"
            src={assets.logo}
            alt="logo"
          /> */}

          <p className="font-medium md:font-semibold md:text-2xl text-xs  text-tertiary-dark">
            Shell Woodcreek Complex Hotel
          </p>
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="hover:-translate-y-2 duration-500 transition-all">Home</Link>
          <Link href="/rooms" className="hover:-translate-y-2 duration-500 transition-all">
            Rooms
          </Link>
          <Link href="/" className="hover:-translate-y-2 duration-500 transition-all">
            About Us
          </Link>
          <Link href="https://www.shell.us/about-us/contact-shell.html" className="hover:-translate-y-2 duration-500 transition-all">
            Contact
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <ul className="flex items-center ml-5">
            <li className="flex items-center">
              {session?.user ? (
                <Link href={`/users/${session.user.id}`}>
                  {session.user.image ? (
                    <div className="w-6 h-6 rounded-full overflow-hidden">
                      <Image
                        src={session.user.image}
                        alt={session.user.name!}
                        width={40}
                        height={40}
                        className="scale-animation img"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 hover:text-gray-900 transition">
                      <p>Profile</p>
                      <FaUserCircle className="cursor-pointer" />
                    </div>
                  )}
                </Link>
              ) : (
                <Link href="/auth">
                  <div className="flex items-center gap-2 hover:text-gray-900 transition">
                    <FaUserCircle className="h-5 w-5 cursor-pointer" />
                  </div>
                </Link>
              )}
            </li>
            <li className="ml-2">
              {darkTheme ? (
                <MdOutlineLightMode
                  className="cursor-pointer"
                  onClick={() => {
                    setDarkTheme(false);
                    localStorage.removeItem("hotel-theme");
                  }}
                />
              ) : (
                <MdDarkMode
                  className="cursor-pointer"
                  onClick={() => {
                    setDarkTheme(true);
                    localStorage.setItem("hotel-theme", "true");
                  }}
                />
              )}
            </li>
          </ul>

          <Button
            variant="ghost"
            className="md:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>
      {mobileOpen && (
        <nav className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col p-4 space-y-2">
            <li>
              <Link href="/" className="block hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <Link href="/rooms" className="block hover:text-blue-600">
                Rooms
              </Link>
            </li>
            <li>
              <Link href="/" className="block hover:text-blue-600">
                About Us
              </Link>
            </li>
            <li>
              <Link href="https://www.shell.us/about-us/contact-shell.html" className="block hover:text-blue-600">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
