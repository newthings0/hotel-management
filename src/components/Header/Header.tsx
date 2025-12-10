"use client";

import Link from "next/link";
import { useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useSession } from "next-auth/react";
import { assets } from "@/assets/assets";

import ThemeContext from "@/context/themeContext";
import Image from "next/image";

const Header = () => {
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);

  const { data: session } = useSession();

  return (
    <header className="py-10 px-4 container mx-auto text-xl flex flex-wrap md:flex-nowrap items-center justify-between">
      <div>
        <Link
          href="/"
        >
          {/* <Image
          className="cursor-pointer w-28 md:w-32"
          src={assets.logo}
          alt="logo"
        /> */}
          <p className="font-medium md:font-semibold md:text-4xl text-xl  text-tertiary-dark">
            Shell Woodcreek Complex Hotel
          </p>
        </Link>
      </div>
      <div className="flex items-center gap-4 lg:gap-8  w-full md:w-1/3 mt-4">
        <Link href="/" className="hover:text-gray-900 transition">
          Home
        </Link>
        <Link href="/rooms" className="hover:text-gray-900 transition">
          Rooms
        </Link>
        <Link href="/" className="hover:text-gray-900 transition">
          About Us
        </Link>
        <Link href="https://www.shell.us/about-us/contact-shell.html" className="hover:text-gray-900 transition">
          Contact
        </Link>
      </div>
      <div>
        <ul className="flex items-center ml-5">
          <li className="flex items-center">
            {session?.user ? (
              <Link href={`/users/${session.user.id}`}>
                {session.user.image ? (
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={session.user.image}
                      alt={session.user.name!}
                      width={40}
                      height={40}
                      className="scale-animation img"
                    />
                    <p>Profile</p>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 hover:text-gray-900 transition">
                    <FaUserCircle className="cursor-pointer" />
                    <p>Profile</p>
                  </div>
                )}
              </Link>
            ) : (
              <Link href="/auth">
                <div className="flex items-center gap-2 hover:text-gray-900 transition">
                  <Image src={assets.user_icon} alt="user icon" />
                  Account
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
      </div>
    </header>
  );
};

export default Header;
