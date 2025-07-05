"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/logo.svg";
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";

type LineProfile = {
  userId: string;
  displayName: string;
  pictureUrl: string;
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profile, setProfile] = useState<LineProfile | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  // Close dropdown if clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    fetch("/api/profile")
      .then((res) => res.json())
      .then((data) => {
        if (data.profile) setProfile(data.profile);
        else setProfile(null);
      })
      .catch(() => setProfile(null));
  }, []);

  const logout = () => {
    redirect("/api/logout");
  };

  // Close mobile menu when a menu item is clicked
  const handleMenuItemClick = () => setIsMenuOpen(false);

  const pathname = usePathname();
  // Example: extract last segment like "home", "profile", etc.
  const currentPage = pathname?.split("/")[1];

  const menuItems = (
    <>
      <Link
        href="/home"
        className={
          "block px-3 py-2 rounded-md text-sm font-bold text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-300" +
          (currentPage === "home"
            ? " bg-pink-400 text-white hover:bg-pink-300"
            : "")
        }
        onClick={handleMenuItemClick}
      >
        หน้าหลัก
      </Link>
      <Link
        href="/calendar"
        className={
          "block px-3 py-2 rounded-md text-sm font-bold text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-300" +
          (currentPage === "calendar" || currentPage === "diary"
            ? " bg-pink-400 text-white hover:bg-pink-300"
            : "")
        }
        onClick={handleMenuItemClick}
      >
        สมุดบันทึก
      </Link>
      <Link
        href="/history"
        className={
          "block px-3 py-2 rounded-md text-sm font-bold text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-300" +
          (currentPage === "history"
            ? " bg-pink-400 text-white hover:bg-pink-300"
            : "")
        }
        onClick={handleMenuItemClick}
      >
        ประวัติการบันทึก
      </Link>
      <Link
        href="/profile"
        className={
          "block px-3 py-2 rounded-md text-sm font-bold text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-300" +
          (currentPage === "profile"
            ? " bg-pink-400 text-white hover:bg-pink-300"
            : "")
        }
        onClick={handleMenuItemClick}
      >
        โปรไฟล์
      </Link>
    </>
  );
  console.log("CurrentPage: ", currentPage);

  return (
    <header className="bg-white shadow-md border-b-2 font-[Noto_Serif_Thai] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-bold">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/home" className="flex-shrink-0 flex items-center">
              <Image src={logo} width={48} height={48} alt="logo" />
              <span className="ml-2 text-lg md:text-xl font-bold text-gray-900">
                สมุดบันทึก
              </span>
              <span className="text-lg md:text-xl font-bold text-[#FB6F92]">
                สุขภาพ
              </span>
            </Link>
          </div>

          {/* Desktop menu */}
          <nav className="hidden md:flex md:items-center md:space-x-2 lg:space-x-4">
            {menuItems}
          </nav>

          {/* Profile or Login (desktop only) */}
          <div className="relative flex items-center">
            <div className="hidden md:flex">
              {profile ? (
                <div
                  ref={dropdownRef}
                  className="flex items-center cursor-pointer select-none"
                >
                  <div
                    onClick={toggleDropdown}
                    className="flex items-center gap-2 focus:outline-none"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") toggleDropdown();
                    }}
                  >
                    <Image
                      src={profile.pictureUrl}
                      alt={profile.displayName}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <span className="text-sm text-gray-800 hidden sm:inline">
                      {profile.displayName}
                    </span>
                    <svg
                      className={`w-4 h-4 text-gray-600 transition-transform ${
                        isDropdownOpen ? "rotate-180" : "rotate-0"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                      <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
                      >
                        ออกจากระบบ
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/api/login">
                  <button className="bg-[#FB6F92] hover:bg-[#FC87A4] text-white px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-pink-300">
                    เข้าสู่ระบบ
                  </button>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-300"
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {menuItems}
          {profile ? (
            <div className="flex items-center justify-between gap-2 px-3 py-2 border-t mt-2">
              <div className="flex items-center gap-2 mt-4">
                <Image
                  src={profile.pictureUrl}
                  alt={profile.displayName}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span className="text-sm text-black">
                  {profile.displayName}
                </span>
              </div>
              <button
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className="bg-red-600 px-3 py-1 rounded text-sm focus:outline-none text-white mt-4"
              >
                ออกจากระบบ
              </button>
            </div>
          ) : (
            <Link href="/api/login">
              <button
                className="w-full bg-[#FB6F92] text-white px-4 py-2 rounded-md text-base hover:cursor-pointer focus:outline-none"
                onClick={handleMenuItemClick}
              >
                เข้าสู่ระบบ
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
